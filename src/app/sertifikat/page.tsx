"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import AppNavbar from "@/components/AppNavbar";
import {
  CERTIFICATES_DATA,
  CertificateItem,
  verifyCertificateCode,
  VerificationAuditLog,
} from "@/lib/certificateData";
import {
  SertifikatHero,
  SertifikatMetrics,
  SertifikatFilterBar,
  SertifikatCard,
  SertifikatEmptyState,
  SertifikatToast,
  SertifikatFooter,
  CertificateModal,
  VerifierModal,
  SiasnSyncModal,
  ExportPortfolioModal,
  CategoryFilter,
  SortOption,
  ViewMode,
} from "@/components/sertifikat";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 6,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

export default function SertifikatPage() {
  // Filter & Search states
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("terbaru");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Modals state
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [modalTab, setModalTab] = useState<"certificate" | "transcript">("certificate");
  const [showVerifierModal, setShowVerifierModal] = useState(false);
  const [verifyInputCode, setVerifyInputCode] = useState("");
  const [verificationResult, setVerificationResult] = useState<VerificationAuditLog | null>(null);
  const [hasVerified, setHasVerified] = useState(false);
  const [showSiasnModal, setShowSiasnModal] = useState<CertificateItem | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);

  // Action feedback states
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    desc: string;
  } | null>(null);

  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (title: string, desc: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage({ title, desc });
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Keyboard shortcut Esc to dismiss any open modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
        setShowVerifierModal(false);
        setShowSiasnModal(null);
        setShowExportModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter & sort logic memoized
  const filteredCertificates = useMemo(() => {
    return CERTIFICATES_DATA.filter((cert) => {
      if (activeCategory !== "semua" && cert.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = cert.title.toLowerCase().includes(q);
        const matchNumber = cert.certNumber.toLowerCase().includes(q);
        const matchCoach = cert.coachOrMentor.name.toLowerCase().includes(q);
        const matchTags = cert.competencyTags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchNumber && !matchCoach && !matchTags) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "terbaru") {
        return new Date(b.issueDateISO).getTime() - new Date(a.issueDateISO).getTime();
      }
      if (sortBy === "terlama") {
        return new Date(a.issueDateISO).getTime() - new Date(b.issueDateISO).getTime();
      }
      if (sortBy === "jp_tertinggi") {
        return b.jp - a.jp;
      }
      return 0;
    });
  }, [activeCategory, searchQuery, sortBy]);

  // Aggregate stats
  const totalCertificates = CERTIFICATES_DATA.length;
  const totalJp = CERTIFICATES_DATA.reduce(
    (acc, curr) => acc + (curr.category !== "kumulatif" ? curr.jp : 0),
    0
  );

  // Action handlers
  const handleCopyLink = (cert: CertificateItem) => {
    const url = `https://cmc.dephub.go.id/verify/${cert.certNumber.replace(/\//g, "-")}`;
    navigator.clipboard.writeText(url);
    setCopiedId(cert.id);
    showToast("Tautan Disalin", `Tautan verifikasi resmi untuk ${cert.certNumber} disalin ke clipboard.`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadPdf = (cert: CertificateItem) => {
    setDownloadingId(cert.id);
    setTimeout(() => {
      setDownloadingId(null);
      showToast(
        "Sertifikat Berhasil Diunduh",
        `Berkas ${cert.certNumber.replace(/\//g, "_")}.pdf telah tersimpan di perangkat Anda.`
      );
    }, 1000);
  };

  const handleRunVerification = (codeToVerify?: string) => {
    const targetCode = codeToVerify || verifyInputCode;
    if (!targetCode.trim()) return;
    const res = verifyCertificateCode(targetCode);
    setVerificationResult(res);
    setHasVerified(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col font-sans selection:bg-[#0a2540] selection:text-white">
      {/* 1. Global Navigation Bar */}
      <AppNavbar />

      {/* 2. Toast Feedback Notification */}
      <SertifikatToast
        toastMessage={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* 3. Hero Header Section */}
      <SertifikatHero
        onOpenVerifier={() => {
          setVerifyInputCode("");
          setVerificationResult(null);
          setHasVerified(false);
          setShowVerifierModal(true);
        }}
        onOpenExport={() => setShowExportModal(true)}
      />

      {/* 4. Main Body Container (-mt-10 overlap) */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20 flex-1 w-full flex flex-col gap-6">
        {/* Executive Metrics & Assurance Banner */}
        <SertifikatMetrics
          totalCertificates={totalCertificates}
          totalJp={totalJp}
          onRunSampleVerification={() => {
            setVerifyInputCode("SER/CMC-KEMENHUB/2024/0942");
            handleRunVerification("SER/CMC-KEMENHUB/2024/0942");
            setShowVerifierModal(true);
          }}
        />

        {/* Filter, Search & View Controls */}
        <SertifikatFilterBar
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalCount={CERTIFICATES_DATA.length}
        />

        {/* Certificate Listing: Empty or Grid/List */}
        {filteredCertificates.length === 0 ? (
          <SertifikatEmptyState
            searchQuery={searchQuery}
            onReset={() => {
              setSearchQuery("");
              setActiveCategory("semua");
            }}
          />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "bg-white rounded-2xl border border-[#e2e6eb] shadow-xs overflow-hidden divide-y divide-slate-100"
            }
          >
            {filteredCertificates.map((cert) => (
              <SertifikatCard
                key={cert.id}
                cert={cert}
                viewMode={viewMode}
                variants={cardVariants}
                isDownloading={downloadingId === cert.id}
                isCopied={copiedId === cert.id}
                onSelect={(c) => {
                  setSelectedCert(c);
                  setModalTab("certificate");
                }}
                onDownload={handleDownloadPdf}
                onCopyLink={handleCopyLink}
              />
            ))}
          </motion.div>
        )}
      </main>

      {/* 5. Modals & Dialogs */}
      <AnimatePresence>
        {selectedCert && (
          <CertificateModal
            cert={selectedCert}
            modalTab={modalTab}
            onTabChange={setModalTab}
            onClose={() => setSelectedCert(null)}
            onCopyLink={handleCopyLink}
            onDownload={handleDownloadPdf}
            isCopied={copiedId === selectedCert.id}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showVerifierModal && (
          <VerifierModal
            isOpen={showVerifierModal}
            onClose={() => setShowVerifierModal(false)}
            inputCode={verifyInputCode}
            onInputChange={setVerifyInputCode}
            onVerify={handleRunVerification}
            hasVerified={hasVerified}
            result={verificationResult}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSiasnModal && (
          <SiasnSyncModal
            cert={showSiasnModal}
            onClose={() => setShowSiasnModal(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExportModal && (
          <ExportPortfolioModal
            isOpen={showExportModal}
            onClose={() => setShowExportModal(false)}
            onDownload={() => {
              setShowExportModal(false);
              showToast(
                "Portofolio Berhasil Diunduh",
                "Berkas Portofolio_Sertifikat_CMC_Andi_Pratama.zip sedang diunduh."
              );
            }}
          />
        )}
      </AnimatePresence>

      {/* 6. Footer (Consistent with Dashboard & Sesi) */}
      <SertifikatFooter
        onShowPrivacyToast={() =>
          showToast(
            "Kebijakan Privasi",
            "Data kredensial dilindungi sesuai UU No. 27/2022 tentang Pelindungan Data Pribadi."
          )
        }
        onShowTermsToast={() =>
          showToast(
            "Dasar Regulasi",
            "Mengacu pada Peraturan Menteri Perhubungan No. PM 47 Tahun 2021."
          )
        }
      />
    </div>
  );
}
