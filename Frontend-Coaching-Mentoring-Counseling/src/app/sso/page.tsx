"use client";

/**
 * Halaman /sso - Entry point EduHub SSO
 *
 * Sesuai Panduan SSO BPSDM Kemenhub hal. 3:
 * EduHub akan redirect pengguna ke: https://domain-mitra.go.id/sso?token={TOKEN}
 * atau: https://domain-mitra.go.id/api/sso?token={TOKEN}
 *
 * Halaman ini meneruskan token tersebut ke /api/sso backend untuk divalidasi,
 * atau langsung ke /sso/auth/callback jika token sudah cukup.
 */

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SSOEntryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Meneruskan ke sistem SSO Kemenhub...");
  const [error, setError] = useState<string | null>(null);
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const token = searchParams.get("token");
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError(decodeURIComponent(errorParam));
      return;
    }

    // Jika ada token dari EduHub, validasi ke backend
    if (token) {
      setStatus("Memvalidasi token EduHub ke server...");
      authenticateWithEduhub(token);
      return;
    }

    // Jika ada OAuth code (dari HubNet), teruskan ke callback page
    if (code) {
      setStatus("Memproses kode OAuth HubNet...");
      router.replace(`/sso/auth/callback?code=${encodeURIComponent(code)}`);
      return;
    }

    // Tidak ada parameter yang dikenali
    setError(
      "Parameter otentikasi tidak ditemukan. Pastikan Anda mengakses halaman ini melalui portal EduHub Kemenhub."
    );
  }, [searchParams, router]);

  const authenticateWithEduhub = async (token: string) => {
    try {
      const rawApiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
      const apiUrl = rawApiUrl.replace(/\/$/, "");

      // Kirim token ke endpoint /api/v1/auth/sso (GET dengan ?token=...)
      // Backend akan memvalidasi ke POST https://bpsdm.kemenhub.go.id/api/portal/auth/sso
      const response = await fetch(`${apiUrl}/auth/sso?token=${encodeURIComponent(token)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Gagal memvalidasi token EduHub"
        );
      }

      const accessToken =
        result.token ||
        (result.tokens && result.tokens.access_token) ||
        (result.data && result.data.token) ||
        (result.data && result.data.tokens && result.data.tokens.access_token);

      const user = result.user || (result.data && result.data.user);

      if (accessToken) {
        document.cookie = `auth_token=${accessToken}; path=/; max-age=86400`;
        localStorage.setItem("auth_token", accessToken);
        localStorage.setItem("token", accessToken);
        localStorage.setItem("cmc_token", accessToken);
      }
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("cmc_user", JSON.stringify(user));
      }

      setStatus("Otentikasi berhasil! Mengalihkan ke dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 600);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat memvalidasi token EduHub");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200/80 max-w-md w-full text-center">
        {error ? (
          <div>
            <div className="size-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-200">
              <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Otentikasi Gagal</h2>
            <p className="text-sm text-slate-600 mb-6">{error}</p>
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full bg-[#081830] hover:bg-[#12284c] text-white py-3 rounded-xl font-semibold transition-colors cursor-pointer"
            >
              Kembali ke Halaman Login
            </button>
          </div>
        ) : (
          <div>
            {/* Logo Kemenhub */}
            <div className="flex justify-center mb-6">
              <div className="size-14 bg-[#081830] rounded-full flex items-center justify-center">
                <svg className="size-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <div className="size-10 rounded-full border-4 border-[#081830] border-t-transparent animate-spin mx-auto mb-5" />
            <h2 className="text-lg font-bold text-slate-900 mb-2">SSO Kemenhub</h2>
            <p className="text-sm text-slate-500 leading-relaxed">{status}</p>
            <p className="text-xs text-slate-400 mt-3">
              EduHub BPSDM Kemenhub RI
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SSOPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 font-sans">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200/80 max-w-md w-full text-center">
            <div className="size-10 rounded-full border-4 border-[#081830] border-t-transparent animate-spin mx-auto mb-4" />
            <h2 className="text-lg font-bold text-slate-900">Memuat SSO...</h2>
          </div>
        </div>
      }
    >
      <SSOEntryContent />
    </Suspense>
  );
}

