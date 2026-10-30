"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * SSO Callback Handler
 *
 * Menangani 3 skenario redirect dari EduHub / HubNet:
 *
 * Skenario A — EduHub callback (format aktual dari kms.hulunautika.com):
 *   /sso/auth/callback?token={JWT_EDUHUB}&user={JSON_USER}
 *   → Kirim token + user ke backend GET /api/v1/auth/sso?token=...&user=...
 *   → Backend ekstrak NIP dari JWT payload atau user JSON
 *   → Backend return CMC JWT → simpan → redirect /dashboard
 *
 * Skenario B — HubNet OAuth code flow:
 *   /sso/auth/callback?code={OAUTH_CODE}
 *   → POST /api/v1/auth/sso {code, redirect_uri}
 *   → Backend exchange code → return CMC JWT → simpan → redirect /dashboard
 *
 * Skenario C — Backend sudah memproses dan redirect dengan CMC token:
 *   /sso/auth/callback?token={CMC_JWT}&user={JSON} (dari GoogleCallback atau LoginEduhub redirect)
 *   → Token sudah berupa CMC JWT, simpan langsung
 */

function SSOCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState("Memproses otentikasi SSO...");
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const tokenParam = searchParams.get("token");
    const userParam = searchParams.get("user");
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError(decodeURIComponent(errorParam));
      return;
    }

    // Skenario A & C: Ada ?token= parameter
    if (tokenParam) {
      handleTokenCallback(tokenParam, userParam);
      return;
    }

    // Skenario B: OAuth code flow
    if (code) {
      setStatusMsg("Memverifikasi kode OAuth HubNet...");
      handleCodeCallback(code);
      return;
    }

    setError("Parameter otentikasi tidak ditemukan. Silakan login kembali melalui portal EduHub.");
  }, [searchParams, router]);

  /**
   * Menangani callback dengan ?token= dan opsional ?user=
   * Selalu exchange ke backend untuk mendapatkan CMC JWT yang valid.
   */
  const handleTokenCallback = async (token: string, userParam: string | null) => {
    const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
    const apiUrl = rawApiUrl.replace(/\/$/, "");

    try {
      setStatusMsg("Memvalidasi token EduHub ke server CMC...");

      // Kirim token (dan user JSON jika ada) ke backend
      // Backend akan: decode JWT payload → cari/daftarkan user → return CMC JWT
      let exchangeUrl = `${apiUrl}/auth/sso?token=${encodeURIComponent(token)}`;
      if (userParam) {
        exchangeUrl += `&user=${encodeURIComponent(userParam)}`;
      }

      const response = await fetch(exchangeUrl, {
        method: "GET",
        headers: { "Accept": "application/json" },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.error || "Gagal memvalidasi sesi SSO");
      }

      // Extract CMC JWT dari response backend
      const cmcToken =
        result.token ||
        (result.tokens && result.tokens.access_token) ||
        (result.data && result.data.token) ||
        (result.data && result.data.tokens && result.data.tokens.access_token);

      const cmcUser = result.user || (result.data && result.data.user);

      if (!cmcToken) {
        throw new Error("Server tidak mengembalikan token autentikasi");
      }

      saveSession(cmcToken, cmcUser);
      setStatusMsg("Berhasil! Mengalihkan ke dashboard...");
      setTimeout(() => router.push("/dashboard"), 500);

    } catch (err: any) {
      // Fallback: jika backend tidak bisa diakses, coba parse JWT payload lokal
      // HANYA untuk development/offline mode
      if (process.env.NODE_ENV === "development") {
        try {
          const localUser = parseLocalFallback(token, userParam);
          if (localUser && localUser.nip) {
            console.warn("[SSO] Backend tidak tersedia, menggunakan token EduHub langsung (dev only)");
            saveSession(token, localUser);
            setStatusMsg("Berhasil (dev mode)! Mengalihkan...");
            setTimeout(() => router.push("/dashboard"), 500);
            return;
          }
        } catch {}
      }
      setError(err.message || "Terjadi kesalahan saat memvalidasi token SSO");
    }
  };

  /**
   * Menangani OAuth code flow dari HubNet
   */
  const handleCodeCallback = async (code: string) => {
    const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
    const apiUrl = rawApiUrl.replace(/\/$/, "");

    try {
      const redirectUri =
        typeof window !== "undefined"
          ? `${window.location.origin}/sso/auth/callback`
          : "http://localhost:3000/sso/auth/callback";

      const response = await fetch(`${apiUrl}/auth/sso`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, redirect_uri: redirectUri }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.error || "Gagal terhubung dengan server SSO Kemenhub");
      }

      const token =
        result.token ||
        (result.tokens && result.tokens.access_token) ||
        (result.data && result.data.token) ||
        (result.data && result.data.tokens && result.data.tokens.access_token);

      const user = result.user || (result.data && result.data.user);

      if (!token) {
        throw new Error("Server tidak mengembalikan token autentikasi");
      }

      saveSession(token, user);
      setStatusMsg("Berhasil! Mengalihkan ke dashboard...");
      setTimeout(() => router.push("/dashboard"), 500);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat otentikasi SSO Kemenhub");
    }
  };

  /**
   * Simpan CMC JWT dan user ke cookie + localStorage
   */
  const saveSession = (token: string, user: any) => {
    document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Lax`;
    localStorage.setItem("auth_token", token);
    localStorage.setItem("token", token);
    localStorage.setItem("cmc_token", token);
    if (user) {
      const userStr = JSON.stringify(user);
      localStorage.setItem("user", userStr);
      localStorage.setItem("cmc_user", userStr);
    }
  };

  /**
   * Parse JWT payload lokal (HANYA dev fallback - tidak aman untuk production)
   */
  const parseLocalFallback = (token: string, userParam: string | null): any => {
    // Coba dari ?user= param dulu
    if (userParam) {
      try {
        return JSON.parse(decodeURIComponent(userParam));
      } catch {}
      try {
        return JSON.parse(userParam);
      } catch {}
    }
    // Decode JWT payload
    const parts = token.split(".");
    if (parts.length === 3) {
      const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const json = decodeURIComponent(
        atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
      );
      return JSON.parse(json);
    }
    return null;
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
            <div className="flex justify-center mb-5">
              <div className="size-12 bg-[#081830] rounded-full flex items-center justify-center">
                <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div className="size-10 rounded-full border-4 border-[#081830] border-t-transparent animate-spin mx-auto mb-5" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">SSO Kemenhub</h2>
            <p className="text-sm text-slate-500 leading-relaxed">{statusMsg}</p>
            <p className="text-xs text-slate-400 mt-3">EduHub BPSDM Kemenhub RI</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SSOCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 font-sans">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200/80 max-w-md w-full text-center">
            <div className="size-12 rounded-full border-4 border-[#081830] border-t-transparent animate-spin mx-auto mb-6" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Memuat...</h2>
          </div>
        </div>
      }
    >
      <SSOCallbackContent />
    </Suspense>
  );
}

