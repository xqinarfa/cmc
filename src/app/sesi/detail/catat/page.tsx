"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AppNavbar, AppFooter } from "@/components/common";
import {
  CatatPertemuanHero,
  CatatPertemuanStepper,
  Step1DataDanTujuan,
  Step2Pembahasan,
  Step3TindakLanjut,
  CatatPertemuanSidebar,
  CatatSuccessModal,
} from "@/components/sesi/detail/catat";

export default function CatatPertemuanPage() {
  const router = useRouter();

  // Wizard Step (1: Data & Tujuan, 2: Pembahasan, 3: Tindak Lanjut)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State - Step 1: Data & Tujuan (Figma Node 840:276)
  const [tanggal, setTanggal] = useState("2026-09-23");
  const [waktu, setWaktu] = useState("09:00");
  const [moda, setModa] = useState<"Luring" | "Daring" | "Hybrid">("Luring");
  const [lokasi, setLokasi] = useState("");
  const [pertemuanKe] = useState(2);
  const [tujuan, setTujuan] = useState("");

  // Form State - Step 2: Pembahasan (Figma Node 841:482)
  const [identifikasiKebutuhan, setIdentifikasiKebutuhan] = useState("");
  const [areaPengembangan, setAreaPengembangan] = useState("");
  const [pembahasan, setPembahasan] = useState("");
  const [umpanBalikCoach, setUmpanBalikCoach] = useState("");
  const [kesepakatanSolusi, setKesepakatanSolusi] = useState("");

  // Form State - Step 3: Tindak Lanjut (Figma Node 842:650)
  const [rencanaTindakLanjut, setRencanaTindakLanjut] = useState("");
  const [targetWaktu, setTargetWaktu] = useState("");
  const [actionLearningFiles, setActionLearningFiles] = useState<string[]>([]);
  const [buktiFotoFiles, setBuktiFotoFiles] = useState<string[]>([]);
  const [pernyataanSetuju, setPernyataanSetuju] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowSuccessModal(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/sesi/detail");
    }
  };

  return (
    <div className="min-h-dvh w-full bg-[#f7f9fb] text-[#0f172a] font-sans antialiased selection:bg-[#0a2540] selection:text-white flex flex-col justify-between">
      {/* 1. App Navbar */}
      <AppNavbar />

      {/* 2. Hero Section */}
      <CatatPertemuanHero pertemuanKe={pertemuanKe} currentStep={currentStep} />

      {/* 3. Main Two-Column Layout */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 items-start">
          {/* Left Column: Form Card */}
          <div className="flex flex-col gap-4 min-w-0">
            <div className="bg-white border border-[#e2e6eb] rounded-[10px] shadow-xs overflow-hidden">
              <CatatPertemuanStepper currentStep={currentStep} onStepClick={setCurrentStep} />

              <div className="p-5 sm:p-[22px]">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <Step1DataDanTujuan
                      tanggal={tanggal}
                      onTanggalChange={setTanggal}
                      waktu={waktu}
                      onWaktuChange={setWaktu}
                      moda={moda}
                      onModaChange={setModa}
                      lokasi={lokasi}
                      onLokasiChange={setLokasi}
                      pertemuanKe={pertemuanKe}
                      tujuan={tujuan}
                      onTujuanChange={setTujuan}
                    />
                  )}

                  {currentStep === 2 && (
                    <Step2Pembahasan
                      identifikasiKebutuhan={identifikasiKebutuhan}
                      onIdentifikasiKebutuhanChange={setIdentifikasiKebutuhan}
                      areaPengembangan={areaPengembangan}
                      onAreaPengembanganChange={setAreaPengembangan}
                      pembahasan={pembahasan}
                      onPembahasanChange={setPembahasan}
                      umpanBalikCoach={umpanBalikCoach}
                      onUmpanBalikCoachChange={setUmpanBalikCoach}
                      kesepakatanSolusi={kesepakatanSolusi}
                      onKesepakatanSolusiChange={setKesepakatanSolusi}
                    />
                  )}

                  {currentStep === 3 && (
                    <Step3TindakLanjut
                      rencanaTindakLanjut={rencanaTindakLanjut}
                      onRencanaTindakLanjutChange={setRencanaTindakLanjut}
                      targetWaktu={targetWaktu}
                      onTargetWaktuChange={setTargetWaktu}
                      actionLearningFiles={actionLearningFiles}
                      onAddActionLearningFile={(f) => setActionLearningFiles((prev) => [...prev, f])}
                      onRemoveActionLearningFile={(idx) => setActionLearningFiles((prev) => prev.filter((_, i) => i !== idx))}
                      buktiFotoFiles={buktiFotoFiles}
                      onAddBuktiFotoFiles={(files) => setBuktiFotoFiles((prev) => [...prev, ...files])}
                      onRemoveBuktiFotoFile={(idx) => setBuktiFotoFiles((prev) => prev.filter((_, i) => i !== idx))}
                      pernyataanSetuju={pernyataanSetuju}
                      onPernyataanSetujuChange={setPernyataanSetuju}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Action Buttons Bar */}
              <div className="border-t border-[#eef1f5] bg-white px-4 sm:px-[22px] py-[14px] sm:py-[16px] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <span className="size-[6px] rounded-full bg-[#10b981]" />
                  <span className="text-[11.5px] leading-[17.25px] text-[#64748b]">
                    Draft tersimpan otomatis
                  </span>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-2.5">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push("/sesi/detail")}
                    className="h-[36px] px-3 sm:px-[16px] rounded-[8px] border border-transparent text-[#64748b] hover:text-[#0f172a] hover:bg-slate-50 text-[13px] font-medium transition-colors cursor-pointer"
                  >
                    Batal
                  </motion.button>

                  <div className="flex items-center gap-2">
                    {currentStep > 1 && (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handlePrevStep}
                        className="h-[36px] px-3.5 sm:px-[16px] rounded-[8px] bg-white border border-[#e2e6eb] hover:bg-slate-50 text-[#334155] text-[13px] font-medium transition-colors cursor-pointer shadow-2xs"
                      >
                        Kembali
                      </motion.button>
                    )}

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleNextStep}
                      className="h-[36px] px-4 sm:px-[16px] rounded-[8px] bg-[#0a2540] hover:bg-[#13396b] text-white text-[13px] font-medium inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <span>{currentStep === 3 ? "Simpan Pertemuan" : "Lanjut"}</span>
                      {currentStep < 3 && (
                        <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <CatatPertemuanSidebar currentStep={currentStep} />
        </div>
      </main>

      {/* Modal: Sukses Catat Pertemuan */}
      <CatatSuccessModal
        isOpen={showSuccessModal}
        pertemuanKe={pertemuanKe}
        onClose={() => setShowSuccessModal(false)}
        onBackToDetail={() => router.push("/sesi/detail")}
      />

      {/* Footer */}
      <AppFooter onShowToast={() => {}} />
    </div>
  );
}
