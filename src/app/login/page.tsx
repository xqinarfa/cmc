"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SLIDES, DemoAccount } from "@/lib/loginData";
import {
  LoginLeftPanel,
  LoginForm,
  LoginFooter,
  LoginHelpModal,
  LoginPrivacyModal,
} from "@/components/login";

export default function LoginPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Authentication Mode: 'sso' (SSO SIK) or 'manual' (NIP & Kata Sandi)
  const [authMode, setAuthMode] = useState<"sso" | "manual">("sso");

  // Form Inputs
  const [nipInput, setNipInput] = useState("198904122014031002");
  const [passwordInput, setPasswordInput] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [nipError, setNipError] = useState<string | null>(null);

  // Async Multi-Step Authentication State
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState(0);
  const [authStepLabel, setAuthStepLabel] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Modals
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Auto-advance slides with pause on hover / focus
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Keyboard navigation for carousel and modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showHelpModal || showPrivacyModal) {
        if (e.key === "Escape") {
          setShowHelpModal(false);
          setShowPrivacyModal(false);
        }
        return;
      }
      if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
      } else if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showHelpModal, showPrivacyModal]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const applyDemoAccount = (acc: DemoAccount) => {
    setAuthMode("manual");
    setNipInput(acc.nip);
    setPasswordInput(acc.password);
    setNipError(null);
  };

  const handleNipChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 18);
    setNipInput(cleaned);
    if (cleaned.length > 0 && cleaned.length < 18) {
      setNipError(`NIP harus 18 digit angka (saat ini ${cleaned.length} digit)`);
    } else {
      setNipError(null);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("layanan.cmc@dephub.go.id");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const executeLogin = (mode: "sso" | "manual") => {
    if (mode === "manual" && nipInput.length < 18) {
      setNipError("Mohon masukkan 18 digit NIP yang valid");
      return;
    }

    setIsAuthenticating(true);
    setLoginSuccess(false);
    setAuthStep(1);

    if (mode === "sso") {
      setAuthStepLabel("Menghubungkan ke Gateway SSO SIK (sso.dephub.go.id)...");
      setTimeout(() => {
        setAuthStep(2);
        setAuthStepLabel("Verifikasi identitas ASN & sertifikat digital TLS 1.3...");
      }, 700);
      setTimeout(() => {
        setAuthStep(3);
        setAuthStepLabel("Sinkronisasi riwayat 20 JP dengan SIASN BKN...");
      }, 1400);
      setTimeout(() => {
        setAuthStep(4);
        setAuthStepLabel("Otentikasi berhasil. Membuka Dashboard CMC...");
        setLoginSuccess(true);
      }, 2100);
      setTimeout(() => {
        setIsAuthenticating(false);
        router.push("/dashboard");
      }, 2700);
    } else {
      setAuthStepLabel("Memvalidasi NIP & Kata Sandi di pangkalan data SIK...");
      setTimeout(() => {
        setAuthStep(2);
        setAuthStepLabel("Memeriksa status aktif ASN Kementerian Perhubungan...");
      }, 700);
      setTimeout(() => {
        setAuthStep(3);
        setAuthStepLabel("Menyiapkan hak akses coaching & mentoring...");
      }, 1400);
      setTimeout(() => {
        setAuthStep(4);
        setAuthStepLabel("Kredensial terverifikasi. Masuk ke sistem...");
        setLoginSuccess(true);
      }, 2000);
      setTimeout(() => {
        setIsAuthenticating(false);
        router.push("/dashboard");
      }, 2600);
    }
  };

  return (
    <div className="relative min-h-dvh w-full flex flex-col lg:flex-row bg-slate-50 text-slate-900 font-sans antialiased overflow-x-hidden">
      {/* Skip Link */}
      <a
        href="#login-form-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#0a1e38] text-white rounded-lg shadow-xl text-xs font-semibold focus-visible:outline-none"
      >
        Lewati ke Formulir Masuk
      </a>

      {/* LEFT PANEL */}
      <LoginLeftPanel
        currentSlide={currentSlide}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused(!isPaused)}
        onSelectSlide={setCurrentSlide}
        onPrev={handlePrev}
        onNext={handleNext}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      />

      {/* RIGHT PANEL */}
      <section className="flex-1 bg-white flex flex-col justify-between p-5 sm:p-8 lg:p-12 xl:px-16 overflow-y-auto order-1 lg:order-2 min-h-dvh lg:min-h-0">
        <LoginForm
          authMode={authMode}
          setAuthMode={setAuthMode}
          isAuthenticating={isAuthenticating}
          authStep={authStep}
          authStepLabel={authStepLabel}
          loginSuccess={loginSuccess}
          onExecuteLogin={executeLogin}
          nipInput={nipInput}
          onNipChange={handleNipChange}
          nipError={nipError}
          passwordInput={passwordInput}
          setPasswordInput={setPasswordInput}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          capsLockActive={capsLockActive}
          setCapsLockActive={setCapsLockActive}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          onApplyDemoAccount={applyDemoAccount}
          onOpenHelp={() => setShowHelpModal(true)}
        />

        <LoginFooter onOpenPrivacy={() => setShowPrivacyModal(true)} />
      </section>

      {/* MODALS */}
      <LoginHelpModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        copiedEmail={copiedEmail}
        onCopyEmail={handleCopyEmail}
      />

      <LoginPrivacyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
    </div>
  );
}
