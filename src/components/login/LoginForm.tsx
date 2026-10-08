"use client";

import React from "react";
import { ASSETS } from "@/lib/assets";
import { DemoAccount, DEMO_ACCOUNTS } from "@/lib/loginData";

interface LoginFormProps {
  authMode: "sso" | "manual";
  setAuthMode: (mode: "sso" | "manual") => void;
  isAuthenticating: boolean;
  authStep: number;
  authStepLabel: string;
  loginSuccess: boolean;
  onExecuteLogin: (mode: "sso" | "manual") => void;
  nipInput: string;
  onNipChange: (val: string) => void;
  nipError: string | null;
  passwordInput: string;
  setPasswordInput: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  capsLockActive: boolean;
  setCapsLockActive: (val: boolean) => void;
  rememberMe: boolean;
  setRememberMe: (val: boolean) => void;
  onApplyDemoAccount: (acc: DemoAccount) => void;
  onOpenHelp: () => void;
}

export function LoginForm({
  authMode,
  setAuthMode,
  isAuthenticating,
  authStep,
  authStepLabel,
  loginSuccess,
  onExecuteLogin,
  nipInput,
  onNipChange,
  nipError,
  passwordInput,
  setPasswordInput,
  showPassword,
  setShowPassword,
  capsLockActive,
  setCapsLockActive,
  rememberMe,
  setRememberMe,
  onApplyDemoAccount,
  onOpenHelp,
}: LoginFormProps) {
  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* Top Header Navigation */}
      <header className="w-full flex items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shadow-2xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.kemenhubEmblem}
              alt="Emblem Kementerian Perhubungan"
              className="size-7 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-[13px] tracking-tight leading-tight">
              Kementerian Perhubungan RI
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              Badan Pengembangan SDM Perhubungan
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
          <span className="inline-block size-2 rounded-full bg-emerald-500" />
          <span className="hidden sm:inline">SSO SIK Terhubung</span>
        </div>
      </header>

      {/* Center Login Container */}
      <main
        id="login-form-main"
        className="w-full max-w-[420px] mx-auto py-8 lg:py-10 flex flex-col items-start gap-6"
      >
        {/* Main Title & Subtitle */}
        <div className="w-full flex flex-col gap-1.5">
          <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
            Masuk ke Portal CMC
          </h1>
          <p className="text-[13.5px] text-slate-600 leading-normal">
            Gunakan akun resmi kepegawaian Anda untuk mengakses layanan Coaching, Mentoring, dan Konseling ASN.
          </p>
        </div>

        {/* Dual Mode Switcher */}
        <div className="w-full p-1 rounded-lg bg-slate-100 flex items-center gap-1 border border-slate-200">
          <button
            type="button"
            onClick={() => setAuthMode("sso")}
            className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors cursor-pointer ${
              authMode === "sso"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            SSO SIK Kemenhub
          </button>
          <button
            type="button"
            onClick={() => setAuthMode("manual")}
            className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors cursor-pointer ${
              authMode === "manual"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            NIP &amp; Kata Sandi
          </button>
        </div>

        {/* Multi-Step Status Bar */}
        {isAuthenticating && (
          <div
            role="status"
            aria-live="polite"
            className="w-full p-3.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold flex items-center gap-2">
                <span className="size-3.5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin inline-block" />
                Verifikasi Identitas Kepegawaian
              </span>
              <span className="text-[11px] font-semibold text-blue-700">
                Tahap {authStep} dari 4
              </span>
            </div>
            <div className="w-full h-1.5 bg-blue-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${(authStep / 4) * 100}%` }}
              />
            </div>
            <span className="text-xs text-blue-800 font-medium">
              {authStepLabel}
            </span>
          </div>
        )}

        {/* Success Banner */}
        {loginSuccess && (
          <div
            role="status"
            aria-live="polite"
            className="w-full p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2.5"
          >
            <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <div className="flex flex-col text-xs">
              <span className="font-bold">Otentikasi Berhasil</span>
              <span className="text-emerald-700">Mengarahkan ke Dashboard Layanan CMC...</span>
            </div>
          </div>
        )}

        {/* MODE 1: Single Sign-On SIK */}
        {authMode === "sso" && (
          <div className="w-full flex flex-col gap-4">
            <div className="text-xs text-slate-600 leading-relaxed">
              Portal CMC terintegrasi penuh dengan <strong className="font-semibold text-slate-900">Sistem Informasi Kepegawaian (SIK)</strong> dan <strong className="font-semibold text-slate-900">SIASN BKN</strong>. Anda akan diarahkan ke gateway terpusat tanpa perlu membuat akun baru.
            </div>

            <button
              type="button"
              onClick={() => onExecuteLogin("sso")}
              disabled={isAuthenticating || loginSuccess}
              className="w-full min-h-[48px] rounded-lg bg-[#0a1e38] hover:bg-[#142d54] text-white font-bold text-[14px] flex items-center justify-center gap-2.5 shadow-xs transition-colors active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <svg
                className="w-4 h-4 text-sky-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>Masuk melalui SSO SIK</span>
            </button>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Gateway Resmi: sso.dephub.go.id</span>
              <span>Enkripsi TLS 1.3 Aktif</span>
            </div>
          </div>
        )}

        {/* MODE 2: Manual Credentials Form */}
        {authMode === "manual" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onExecuteLogin("manual");
            }}
            className="w-full flex flex-col gap-4"
          >
            {/* NIP Input */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="nip-input"
                className="text-xs font-bold text-slate-800 flex items-center justify-between"
              >
                <span>Nomor Induk Pegawai (NIP)</span>
                <span className={`text-[11px] font-semibold ${nipInput.length === 18 ? "text-emerald-600" : "text-slate-400"}`}>
                  {nipInput.length}/18 Digit
                </span>
              </label>
              <div className="relative">
                <input
                  id="nip-input"
                  type="text"
                  inputMode="numeric"
                  autoComplete="username"
                  required
                  value={nipInput}
                  onChange={(e) => onNipChange(e.target.value)}
                  placeholder="Contoh: 198904122014031002"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium transition-colors outline-none ${
                    nipError
                      ? "border-rose-400 focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
                      : "border-slate-300 focus:border-[#0a1e38] focus:ring-1 focus:ring-[#0a1e38]"
                  }`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              {nipError && (
                <span role="alert" className="text-[11px] font-semibold text-rose-600">
                  {nipError}
                </span>
              )}
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password-input" className="text-xs font-bold text-slate-800">
                  Kata Sandi SIK
                </label>
                <button
                  type="button"
                  onClick={onOpenHelp}
                  className="text-[11px] font-semibold text-blue-700 hover:underline cursor-pointer"
                >
                  Lupa Kata Sandi?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyUp={(e) => setCapsLockActive(e.getModifierState("CapsLock"))}
                  placeholder="Masukkan kata sandi SIK"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#0a1e38] focus:ring-1 focus:ring-[#0a1e38] outline-none text-sm font-medium transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {capsLockActive && (
                <span role="alert" className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Peringatan: Caps Lock sedang aktif
                </span>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="size-4 rounded text-[#0a1e38] focus:ring-blue-500 border-slate-300 cursor-pointer"
              />
              <label htmlFor="remember-me" className="text-xs text-slate-600 cursor-pointer select-none">
                Ingat NIP di perangkat kerja ini
              </label>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isAuthenticating || loginSuccess}
              className="w-full min-h-[48px] rounded-lg bg-[#0a1e38] hover:bg-[#142d54] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-xs transition-colors active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-blue-600 mt-1"
            >
              <span>Masuk ke Akun</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            {/* Quick Demo Accounts */}
            <div className="pt-2 text-center text-xs text-slate-500">
              <span>Akun pengujian: </span>
              <button
                type="button"
                onClick={() => onApplyDemoAccount(DEMO_ACCOUNTS[0])}
                className="text-blue-700 hover:underline font-semibold cursor-pointer"
              >
                Pegawai
              </button>
              <span className="mx-1 text-slate-300">•</span>
              <button
                type="button"
                onClick={() => onApplyDemoAccount(DEMO_ACCOUNTS[1])}
                className="text-blue-700 hover:underline font-semibold cursor-pointer"
              >
                Coach
              </button>
            </div>
          </form>
        )}

        {/* Divider */}
        <div className="w-full flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
            Bantuan
          </span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Helpdesk Action Link */}
        <button
          type="button"
          onClick={onOpenHelp}
          className="w-full min-h-[42px] rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-[13px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Kendala akses akun? Hubungi Admin BPSDM</span>
        </button>

        {/* Trust & Compliance Seals */}
        <div className="w-full pt-4 flex items-center justify-center gap-6 text-[11px] text-slate-500 border-t border-slate-100">
          <span className="flex items-center gap-1.5 font-medium">
            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Enkripsi TLS 1.3
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Pusdatin Kemenhub
          </span>
          <span className="flex items-center gap-1.5 font-medium hidden sm:flex">
            <svg className="w-3.5 h-3.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Sinkronisasi BKN
          </span>
        </div>
      </main>
    </div>
  );
}
