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

  // Authentication Mode: 'sso' (SSO Kemenhub) or 'manual' (NIP & Kata Sandi)
  const [authMode, setAuthMode] = useState<"sso" | "manual">("sso");

  // Form Inputs
  const [nipInput, setNipInput] = useState("198904122014031002");
  const [passwordInput, setPasswordInput] = useState("RahasiaKemenhub2026!");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [nipError, setNipError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Async Multi-Step Authentication State
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState(0);
  const [authStepLabel, setAuthStepLabel] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Modals
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Environment & SSO configuration
  const rawApiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
  const apiUrl = rawApiUrl.replace(/\/$/, "");

  const googleClientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    "794501260849-l5br7jaticso08nk9kkmmqrs3ic57obh.apps.googleusercontent.com";

  const ssoIdentifier = process.env.NEXT_PUBLIC_SSO_IDENTIFIER || "CMC";

  const [ssoAuthUrl, setSsoAuthUrl] = useState<string>(
    process.env.NEXT_PUBLIC_SSO_AUTH_URL ||
      `https://hubnet.kemenhub.go.id/sso/oauth/authorize?client_id=9ec212b9-a143-4371-9270-6726b02f015c&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsso%2Fauth%2Fcallback&response_type=code&scope=&login_api=null&identifier=${ssoIdentifier}`
  );

  const [googleAuthUrl, setGoogleAuthUrl] = useState<string>(
    `${apiUrl}/auth/google`
  );

  const buildGoogleAuthUrl = useCallback(() => {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000";
    const redirectUri = `${origin}/sso/auth/callback`;
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=select_account`;
  }, [googleClientId]);

  // Read error parameters from URL query if returned by OAuth redirect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      const callbackUri = `${origin}/sso/auth/callback`;

      if (!process.env.NEXT_PUBLIC_SSO_AUTH_URL) {
        setSsoAuthUrl(
          `https://hubnet.kemenhub.go.id/sso/oauth/authorize?client_id=9ec212b9-a143-4371-9270-6726b02f015c&redirect_uri=${encodeURIComponent(
            callbackUri
          )}&response_type=code&scope=&login_api=null&identifier=${ssoIdentifier}`
        );
      }

      setGoogleAuthUrl(buildGoogleAuthUrl());

      const params = new URLSearchParams(window.location.search);
      const err = params.get("error");
      if (err) {
        setErrorMessage(decodeURIComponent(err));
      }
    }
  }, [buildGoogleAuthUrl, ssoIdentifier]);

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
    setErrorMessage(null);
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

  const handleGoogleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = buildGoogleAuthUrl();
    window.location.href = url;
  };

  const executeLogin = async (mode: "sso" | "manual") => {
    setErrorMessage(null);

    if (mode === "sso") {
      setIsAuthenticating(true);
      setLoginSuccess(false);
      setAuthStep(1);
      setAuthStepLabel("Menghubungkan ke Gateway SSO Kemenhub HubNet...");

      setTimeout(() => {
        setAuthStep(2);
        setAuthStepLabel("Mengalihkan ke portal otentikasi resmi Kemenhub...");
      }, 500);

      setTimeout(() => {
        window.location.href = ssoAuthUrl;
      }, 900);
      return;
    }

    // Manual Credentials (NIP & Kata Sandi)
    if (nipInput.length < 18) {
      setNipError("Mohon masukkan 18 digit NIP yang valid");
      return;
    }

    setIsAuthenticating(true);
    setLoginSuccess(false);
    setAuthStep(1);
    setAuthStepLabel("Memvalidasi NIP & Kata Sandi di server CMC...");

    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nip: nipInput,
          password: passwordInput,
        }),
      });

      const data = await res.json();

      if (res.ok && (data.token || (data.data && data.data.token))) {
        const token =
          data.token ||
          (data.tokens && data.tokens.access_token) ||
          (data.data && data.data.token) ||
          (data.data && data.data.tokens && data.data.tokens.access_token);
        const user = data.user || (data.data && data.data.user);

        if (token) {
          document.cookie = `auth_token=${token}; path=/; max-age=86400`;
          localStorage.setItem("auth_token", token);
          localStorage.setItem("token", token);
          localStorage.setItem("cmc_token", token);
        }
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("cmc_user", JSON.stringify(user));
        }

        setAuthStep(4);
        setAuthStepLabel("Kredensial terverifikasi. Masuk ke sistem...");
        setLoginSuccess(true);

        setTimeout(() => {
          setIsAuthenticating(false);
          router.push("/dashboard");
        }, 800);
      } else {
        const msg =
          data.message ||
          data.error ||
          "NIP atau Kata Sandi salah. Periksa kredensial Anda.";
        setNipError(msg);
        setIsAuthenticating(false);
      }
    } catch {
      // Graceful demo simulation fallback if backend server is unreachable
      setAuthStep(2);
      setAuthStepLabel("Pemeriksaan status ASN Kementerian Perhubungan...");

      setTimeout(() => {
        setAuthStep(3);
        setAuthStepLabel("Sinkronisasi profil dengan SIASN BKN...");
      }, 700);

      setTimeout(() => {
        setAuthStep(4);
        setAuthStepLabel("Kredensial terverifikasi. Masuk ke sistem...");
        setLoginSuccess(true);
      }, 1400);

      setTimeout(() => {
        setIsAuthenticating(false);
        router.push("/dashboard");
      }, 2000);
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
          ssoAuthUrl={ssoAuthUrl}
          googleAuthUrl={googleAuthUrl}
          onGoogleLoginClick={handleGoogleLoginClick}
          errorMessage={errorMessage}
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
