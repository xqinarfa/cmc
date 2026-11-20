"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import AppNavbar from "./AppNavbar";
import AppFooter from "./AppFooter";
import { fetchCurrentUser, ApiUser } from "@/lib/api";
import { isSuperAdminOrAdmin } from "@/lib/authGuard";

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState<ApiUser | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function checkAccess() {
      if (typeof window === "undefined") return;

      const token =
        localStorage.getItem("auth_token") ||
        localStorage.getItem("token") ||
        localStorage.getItem("cmc_token");

      if (!token) {
        router.push(
          `/login?redirect=${encodeURIComponent(pathname || "/master")}`,
        );
        return;
      }

      // Check cached user first for faster initial feedback
      const cached =
        localStorage.getItem("user") || localStorage.getItem("cmc_user");
      let cachedRole: string | null = null;
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed === "object") {
            cachedRole = parsed.role || null;
            setCurrentUser(parsed);
            if (isSuperAdminOrAdmin(parsed.role)) {
              setIsAuthorized(true);
            }
          }
        } catch {}
      }

      try {
        const user = await fetchCurrentUser();
        if (!isMounted) return;
        if (user) {
          setCurrentUser(user);
          const authorized = isSuperAdminOrAdmin(user.role);
          setIsAuthorized(authorized);
        } else if (cachedRole) {
          setIsAuthorized(isSuperAdminOrAdmin(cachedRole));
        } else {
          setIsAuthorized(false);
        }
      } catch {
        if (!isMounted) return;
        if (cachedRole && isSuperAdminOrAdmin(cachedRole)) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } finally {
        if (isMounted) {
          setChecking(false);
        }
      }
    }

    checkAccess();

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  if (checking) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
        <AppNavbar />
        <main className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 max-w-md w-full text-center">
            <div className="size-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto mb-4" />
            <h2 className="text-base font-bold text-slate-800">
              Memverifikasi Hak Akses Administrator
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Mohon tunggu sebentar, sistem sedang memvalidasi izin akses akun
              Anda...
            </p>
          </div>
        </main>
        <AppFooter />
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8fafc] font-sans">
        <AppNavbar />
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-rose-200/80 p-8 max-w-lg w-full text-center">
            <div className="size-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-4 text-rose-600">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200 mb-3">
              Akses Dibatasi (403 Forbidden)
            </span>
            <h1 className="text-xl font-black text-slate-900 tracking-tight mb-2">
              Halaman Khusus Super Admin & Admin
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Halaman Master Data (Pengaturan Instansi & Pegawai) hanya dapat
              diakses oleh{" "}
              <strong className="text-slate-800">Super Admin</strong> atau{" "}
              <strong className="text-slate-800">Admin BPSDM</strong>. Akun
              Anda saat ini terdaftar dengan peran{" "}
              <span className="font-semibold text-rose-700 underline decoration-rose-300">
                {currentUser?.role || "Pegawai / Bukan Admin"}
              </span>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                Kembali ke Beranda
              </button>
              <button
                type="button"
                onClick={() =>
                  router.push(
                    `/login?redirect=${encodeURIComponent(pathname || "/master")}`,
                  )
                }
                className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Login Sebagai Admin
              </button>
            </div>
          </div>
        </main>
        <AppFooter />
      </div>
    );
  }

  return <>{children}</>;
}
