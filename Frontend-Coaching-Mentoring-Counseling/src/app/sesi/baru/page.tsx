"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AppNavbar, AppFooter } from "@/components/common";
import {
  SesiBaruHero,
  SesiBaruStepper,
  Step1DataSesi,
  Step2Pendamping,
  Step3Konfirmasi,
  SesiBaruSidebar,
  CoachSelectionModal,
  TokenSuccessModal,
} from "@/components/sesi/baru";
import { bookSession } from "@/lib/api";
import { SesiToast } from "@/components/sesi";

export default function CatatSesiBaruPage() {
  const router = useRouter();

  // Multi-step form state (1: Data Sesi, 2: Pendamping, 3: Konfirmasi)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form fields
  const [jenisKegiatan, setJenisKegiatan] = useState<"coaching" | "mentoring">("coaching");
  const [tipeSesi, setTipeSesi] = useState<"1-on-1" | "1-on-group">("1-on-1");
  const [topik, setTopik] = useState("");
  const [tujuan, setTujuan] = useState("");

  // Step 2 fields
  const [selectedCoach, setSelectedCoach] = useState<string>("");
  const [selectedCoachId, setSelectedCoachId] = useState<string>("");
  const [showCoachModal, setShowCoachModal] = useState(false);
  const [coachSearchTerm, setCoachSearchTerm] = useState("");
  const atasanLangsung = "Dr. Budi Hartono, M.Si.";
  const jabatanAtasan = "Kepala Bagian · Sekretariat BKT";

  // Submission & Token State
  const [generatedToken, setGeneratedToken] = useState("");
  const [copiedToken, setCopiedToken] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleSelectCoach = (coachName: string, coachId?: string) => {
    setSelectedCoach(coachName);
    if (coachId) {
      setSelectedCoachId(coachId);
    }
  };

  // Navigation handlers
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!topik.trim()) {
        setTopik("Peningkatan kemampuan analisis kebijakan transportasi publik");
      }
      setCurrentStep(2);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (currentStep === 2) {
      if (!selectedCoach) {
        showToast("Silakan pilih Coach atau Mentor terlebih dahulu.");
        setShowCoachModal(true);
        return;
      }
      setCurrentStep(3);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      router.push("/sesi");
    }
  };

  const handleStepClick = (step: 1 | 2 | 3) => {
    if (step === 1) {
      setCurrentStep(1);
    } else if (step === 2 && currentStep >= 1) {
      if (!topik.trim()) {
        setTopik("Peningkatan kemampuan analisis kebijakan transportasi publik");
      }
      setCurrentStep(2);
    } else if (step === 3 && currentStep >= 2) {
      if (!selectedCoach) {
        showToast("Silakan pilih Coach atau Mentor terlebih dahulu.");
        setShowCoachModal(true);
        return;
      }
      setCurrentStep(3);
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Submit form ke Backend Go API
  const handleSubmitSession = async () => {
    try {
      setIsSubmitting(true);

      const practitionerId =
        selectedCoachId ||
        (jenisKegiatan === "mentoring"
          ? "b0000000-0000-0000-0000-000000000001"
          : "b0000000-0000-0000-0000-000000000002");

      const session = await bookSession({
        practitioner_id: practitionerId,
        type: jenisKegiatan,
        title: topik.trim() || `Sesi ${jenisKegiatan === "coaching" ? "Coaching" : "Mentoring"}`,
        topic: topik.trim(),
        objective: tujuan.trim() || undefined,
        session_format: tipeSesi,
      });

      const tokenResult = session.token || "CMC-" + Math.random().toString(36).substring(2, 6).toUpperCase();
      setGeneratedToken(tokenResult);
      setShowSuccessModal(true);
      showToast("Sesi berhasil dibuat! Token pairing siap digunakan.");
    } catch (err) {
      showToast(
        err instanceof Error
          ? `Gagal membuat sesi: ${err.message}`
          : "Terjadi kesalahan saat membuat sesi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyToken = () => {
    if (!generatedToken) return;
    navigator.clipboard.writeText(generatedToken);
    setCopiedToken(true);
    showToast("Token berhasil disalin ke clipboard!");
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="min-h-dvh w-full bg-[#f7f9fb] text-[#0f172a] font-sans antialiased selection:bg-[#0a2540] selection:text-white flex flex-col justify-between">
      {/* 1. Top Navigation Bar */}
      <AppNavbar />

      {/* 2. Hero Section */}
      <SesiBaruHero />

      {/* 3. Main Content: Stepper & 2-Column Layout */}
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 flex flex-col gap-4 pb-16 flex-1 w-full">
        {/* Stepper Card */}
        <SesiBaruStepper currentStep={currentStep} onStepClick={handleStepClick} />

        {/* Two-Column Layout: Form & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 items-start pt-1">
          {/* Left Column: Form Steps */}
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <Step1DataSesi
                  jenisKegiatan={jenisKegiatan}
                  onJenisKegiatanChange={setJenisKegiatan}
                  tipeSesi={tipeSesi}
                  onTipeSesiChange={setTipeSesi}
                  topik={topik}
                  onTopikChange={setTopik}
                  tujuan={tujuan}
                  onTujuanChange={setTujuan}
                />
              )}

              {currentStep === 2 && (
                <Step2Pendamping
                  selectedCoach={selectedCoach}
                  onSelectCoach={handleSelectCoach}
                  onOpenCoachModal={() => setShowCoachModal(true)}
                  atasanLangsung={atasanLangsung}
                  jabatanAtasan={jabatanAtasan}
                />
              )}

              {currentStep === 3 && (
                <Step3Konfirmasi
                  jenisKegiatan={jenisKegiatan}
                  tipeSesi={tipeSesi}
                  topik={topik}
                  selectedCoach={selectedCoach}
                  atasanLangsung={atasanLangsung}
                />
              )}
            </AnimatePresence>

            {/* Action Buttons Bar */}
            <div className="bg-white border border-[#e2e6eb] rounded-[10px] px-4 sm:px-[22px] py-[14px] sm:py-[16px] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4 shadow-2xs">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handlePrevStep}
                disabled={isSubmitting}
                className="h-[38px] sm:h-[36px] px-[16px] rounded-[8px] bg-white border border-[#e2e6eb] hover:bg-slate-50 text-[13px] font-medium text-[#334155] flex items-center justify-center gap-[6px] transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
              >
                {currentStep > 1 && (
                  <svg className="size-[12px] text-[#334155]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                )}
                <span className="leading-[19.5px]">{currentStep === 1 ? "Batal" : "Kembali"}</span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={currentStep === 3 ? handleSubmitSession : handleNextStep}
                disabled={isSubmitting}
                className="h-[38px] sm:h-[36px] px-[18px] rounded-[8px] bg-[#0a2540] hover:bg-[#13396b] text-white text-[13px] font-medium flex items-center justify-center gap-[6px] transition-colors cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="leading-[19.5px]">Menyimpan Sesi...</span>
                ) : (
                  <>
                    <span className="leading-[19.5px]">
                      {currentStep === 1
                        ? "Lanjut"
                        : currentStep === 2
                        ? "Lanjut ke Konfirmasi"
                        : "Buat Sesi & Token Pairing"}
                    </span>
                    {currentStep < 3 && (
                      <svg className="size-[12px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <SesiBaruSidebar currentStep={currentStep} />
        </div>
      </main>

      {/* Modals */}
      <CoachSelectionModal
        isOpen={showCoachModal}
        searchTerm={coachSearchTerm}
        onSearchTermChange={setCoachSearchTerm}
        selectedCoach={selectedCoach}
        selectedCoachId={selectedCoachId}
        onSelectCoach={handleSelectCoach}
        onClose={() => setShowCoachModal(false)}
        roleFilter={jenisKegiatan}
      />

      <TokenSuccessModal
        isOpen={showSuccessModal}
        token={generatedToken}
        copied={copiedToken}
        onCopyToken={handleCopyToken}
        onClose={() => setShowSuccessModal(false)}
        onBackToHome={() => router.push("/sesi")}
      />

      {/* Toast Notification */}
      <SesiToast message={toastMessage} />

      {/* Footer */}
      <AppFooter onShowToast={showToast} />
    </div>
  );
}
