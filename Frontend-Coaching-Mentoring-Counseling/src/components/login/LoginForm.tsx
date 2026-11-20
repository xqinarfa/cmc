"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ASSETS } from "@/lib/assets";
import { DemoAccount, DEMO_ACCOUNTS } from "@/lib/loginData";

interface LoginFormProps {
  authMode: "sso" | "manual";
  setAuthMode: (mode: "sso" | "manual") => void;
  isAuthenticating: boolean;
  authStep?: number;
  authStepLabel?: string;
  loginSuccess?: boolean;
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
  ssoAuthUrl?: string;
  googleAuthUrl?: string;
  onGoogleLoginClick?: (e: React.MouseEvent) => void;
  errorMessage?: string | null;
}

export function LoginForm({
  authMode,
  setAuthMode,
  isAuthenticating,
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
  ssoAuthUrl,
  googleAuthUrl,
  onGoogleLoginClick,
  errorMessage,
}: LoginFormProps) {
  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center my-auto">
      {/* Center Auth Container */}
      <main
        id="login-form-main"
        className="w-full max-w-[420px] mx-auto py-6 sm:py-8 flex flex-col gap-6"
      >
        {/* Concise Heading */}
        <div className="flex flex-col gap-1.5 text-center">
          <h1 className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight">
            Masuk ke Portal
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 leading-normal">
            Layanan Coaching, Mentoring &amp; Konseling ASN Kemenhub
          </p>
        </div>

        {/* Error Alert from URL/OAuth */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start gap-2.5">
            <svg
              className="w-4 h-4 text-rose-600 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* Animated Segmented Tab Switcher */}
        <div className="p-1 rounded-xl bg-slate-100/90 border border-slate-200/70 flex items-center gap-1">
          <button
            type="button"
            onClick={() => setAuthMode("sso")}
            className={`relative flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer select-none text-center ${
              authMode === "sso"
                ? "text-slate-900"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {authMode === "sso" && (
              <motion.div
                layoutId="activeAuthMode"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
                className="absolute inset-0 rounded-lg bg-white shadow-xs border border-slate-200/60"
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-sky-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span>SSO Kemenhub</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setAuthMode("manual")}
            className={`relative flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer select-none text-center ${
              authMode === "manual"
                ? "text-slate-900"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {authMode === "manual" && (
              <motion.div
                layoutId="activeAuthMode"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
                className="absolute inset-0 rounded-lg bg-white shadow-xs border border-slate-200/60"
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
              <span>NIP &amp; Sandi</span>
            </span>
          </button>
        </div>

        {/* Tab 1: SSO Gateway */}
        <AnimatePresence mode="wait">
          {authMode === "sso" && (
            <motion.div
              key="sso-pane"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3.5"
            >
              {/* Option 1: Login SSO Kemenhub HubNet */}
              <a
                href={ssoAuthUrl || "#"}
                onClick={(e) => {
                  if (!ssoAuthUrl) {
                    e.preventDefault();
                    onExecuteLogin("sso");
                  }
                }}
                className="w-full p-4 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50/90 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="size-10 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-sky-950 transition-colors">
                      Masuk dengan Akun SSO Kemenhub
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Otentikasi HubNet &amp; Sinkronisasi SIASN BKN
                    </span>
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>

              {/* Option 2: Login Google */}
              <a
                href={googleAuthUrl || "#"}
                onClick={onGoogleLoginClick}
                className="w-full p-4 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50/90 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="size-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://www.google.com/favicon.ico"
                      alt="Google"
                      className="size-5 object-contain"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-sky-950 transition-colors">
                      Masuk dengan Akun Google
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      G Suite Kemenhub (@dephub.go.id)
                    </span>
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </motion.div>
          )}

          {/* Tab 2: Manual Credentials */}
          {authMode === "manual" && (
            <motion.form
              key="manual-pane"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              onSubmit={(e) => {
                e.preventDefault();
                onExecuteLogin("manual");
              }}
              className="flex flex-col gap-4"
            >
              {/* NIP Input */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <label htmlFor="nip-input">NIP Pegawai / Username</label>
                  <span
                    className={`text-[11px] font-mono ${nipInput.length === 18 ? "text-emerald-600 font-bold" : "text-slate-400"}`}
                  >
                    {nipInput.length}/18
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="nip-input"
                    type="text"
                    inputMode="numeric"
                    autoComplete="username"
                    required
                    value={nipInput}
                    onChange={(e) => onNipChange(e.target.value)}
                    placeholder="18 Digit NIP Anda"
                    className={`w-full px-3.5 py-2.5 pl-10 rounded-xl border text-sm font-medium transition-all outline-none bg-white ${
                      nipError
                        ? "border-rose-400 focus:border-rose-600 focus:ring-2 focus:ring-rose-500/15"
                        : "border-slate-200 focus:border-sky-600 focus:ring-2 focus:ring-sky-500/15"
                    }`}
                  />
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
                {nipError && (
                  <span
                    role="alert"
                    className="text-[11px] font-semibold text-rose-600"
                  >
                    {nipError}
                  </span>
                )}
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="password-input"
                    className="font-semibold text-slate-700"
                  >
                    Kata Sandi SIK
                  </label>
                  <button
                    type="button"
                    onClick={onOpenHelp}
                    className="text-[11px] font-semibold text-sky-700 hover:text-sky-900 cursor-pointer"
                  >
                    Lupa sandi?
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
                    onKeyUp={(e) =>
                      setCapsLockActive(e.getModifierState("CapsLock"))
                    }
                    placeholder="Kata sandi akun Anda"
                    className="w-full px-3.5 py-2.5 pl-10 pr-10 rounded-xl border border-slate-200 focus:border-sky-600 focus:ring-2 focus:ring-sky-500/15 outline-none text-sm font-medium transition-all bg-white"
                  />
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword
                        ? "Sembunyikan kata sandi"
                        : "Lihat kata sandi"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  >
                    {showPassword ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {capsLockActive && (
                  <span
                    role="alert"
                    className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200"
                  >
                    Peringatan: Caps Lock aktif
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
                  className="size-4 rounded border-slate-300 text-sky-700 focus:ring-sky-500 cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="text-xs text-slate-600 cursor-pointer select-none"
                >
                  Ingat NIP di peramban ini
                </label>
              </div>

              {/* Submit CTA */}
              <motion.button
                type="submit"
                disabled={isAuthenticating || loginSuccess}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full min-h-[48px] rounded-xl bg-gradient-to-r from-[#081830] to-[#12284c] hover:from-[#0b2040] hover:to-[#17325e] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-slate-900/10 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-sky-500 mt-1"
              >
                <span>Masuk ke Akun</span>
                <svg
                  className="w-4 h-4 text-sky-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.button>

              {/* Quick Demo Fillers */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-400 pt-1">
                <span>Uji coba:</span>
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.label}
                    type="button"
                    onClick={() => onApplyDemoAccount(acc)}
                    className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer transition-colors"
                  >
                    {acc.label}
                  </button>
                ))}
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Minimal Support Link */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onOpenHelp}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer inline-flex items-center gap-1.5"
          >
            <svg
              className="w-3.5 h-3.5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Butuh bantuan akses akun?</span>
          </button>
        </div>
      </main>
    </div>
  );
}
