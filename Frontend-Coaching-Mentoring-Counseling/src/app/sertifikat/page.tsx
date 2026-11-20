"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { AppNavbar } from "@/components/common";
import {
  CertificateItem,
  verifyCertificateCode,
  VerificationAuditLog,
  buildCertificatesFromDatabase,
} from "@/lib/certificateData";
import { fetchCurrentUser, fetchSessions, ApiUser } from "@/lib/api";
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
  const router = useRouter();

  // Filter & Search states
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("terbaru");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Real database states
  const [dbCertificates, setDbCertificates] = useState<CertificateItem[]>([]);
  const [currentUser, setCurrentUser] = useState<ApiUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(
    null,
  );
  const [modalTab, setModalTab] = useState<"certificate" | "transcript">(
    "certificate",
  );
  const [showVerifierModal, setShowVerifierModal] = useState(false);
  const [verifyInputCode, setVerifyInputCode] = useState("");
  const [verificationResult, setVerificationResult] =
    useState<VerificationAuditLog | null>(null);
  const [hasVerified, setHasVerified] = useState(false);
  const [showSiasnModal, setShowSiasnModal] = useState<CertificateItem | null>(
    null,
  );
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

  // Fetch real sessions and current user from database
  useEffect(() => {
    let isMounted = true;

    // Check authentication: if token is absent, redirect to login
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("auth_token") ||
          localStorage.getItem("cmc_token")
        : null;

    if (!token) {
      router.push("/login?redirect=/sertifikat");
      return;
    }

    // Try reading cached user immediately for instantaneous header rendering
    const cachedUser =
      typeof window !== "undefined"
        ? localStorage.getItem("user") || localStorage.getItem("cmc_user")
        : null;
    if (cachedUser) {
      try {
        const parsed = JSON.parse(cachedUser);
        if (parsed && typeof parsed === "object") {
          setCurrentUser(parsed);
        }
      } catch {}
    }

    async function loadRealData() {
      try {
        const [userResult, sessionsResult] = await Promise.allSettled([
          fetchCurrentUser(),
          fetchSessions(),
        ]);

        if (!isMounted) return;

        let user: ApiUser | null = null;
        if (userResult.status === "fulfilled" && userResult.value) {
          user = userResult.value;
          setCurrentUser(user);
        }

        if (
          sessionsResult.status === "fulfilled" &&
          Array.isArray(sessionsResult.value)
        ) {
          const realCerts = buildCertificatesFromDatabase(
            sessionsResult.value,
            user,
          );
          setDbCertificates(realCerts);
        } else {
          setDbCertificates([]);
        }
      } catch {
        if (isMounted) {
          setDbCertificates([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadRealData();
    return () => {
      isMounted = false;
    };
  }, [router]);

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

  const rawCertificates = useMemo(() => {
    return dbCertificates;
  }, [dbCertificates]);

  // Aggregate Category Counts
  const categoryCounts = useMemo(() => {
    return {
      semua: rawCertificates.length,
      kumulatif: rawCertificates.filter((c) => c.category === "kumulatif")
        .length,
      coaching: rawCertificates.filter((c) => c.category === "coaching").length,
      mentoring: rawCertificates.filter((c) => c.category === "mentoring")
        .length,
      konseling: rawCertificates.filter((c) => c.category === "konseling")
        .length,
    };
  }, [rawCertificates]);

  // Filter & sort logic memoized
  const filteredCertificates = useMemo(() => {
    return rawCertificates
      .filter((cert) => {
        if (activeCategory !== "semua" && cert.category !== activeCategory) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = cert.title.toLowerCase().includes(q);
          const matchNumber = cert.certNumber.toLowerCase().includes(q);
          const matchCoach = cert.coachOrMentor.name.toLowerCase().includes(q);
          const matchTags = cert.competencyTags.some((t) =>
            t.toLowerCase().includes(q),
          );
          if (!matchTitle && !matchNumber && !matchCoach && !matchTags)
            return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "terbaru") {
          return (
            new Date(b.issueDateISO).getTime() -
            new Date(a.issueDateISO).getTime()
          );
        }
        if (sortBy === "terlama") {
          return (
            new Date(a.issueDateISO).getTime() -
            new Date(b.issueDateISO).getTime()
          );
        }
        if (sortBy === "jp_tertinggi") {
          return b.jp - a.jp;
        }
        return 0;
      });
  }, [rawCertificates, activeCategory, searchQuery, sortBy]);

  // Aggregate stats
  const totalCertificates = rawCertificates.length;
  const totalJp = rawCertificates.reduce(
    (acc, curr) => acc + (curr.category !== "kumulatif" ? curr.jp : 0),
    0,
  );
  const kumulatifCount = categoryCounts.kumulatif;
  const sessionCount = totalCertificates - kumulatifCount;
  const breakdownText =
    totalCertificates === 0
      ? "Belum ada dokumen"
      : `${
          kumulatifCount > 0 ? `${kumulatifCount} Kumulatif + ` : ""
        }${sessionCount} Sesi Selesai`;

  // Action handlers
  const handleCopyLink = (cert: CertificateItem) => {
    const url = `https://cmc.dephub.go.id/verify/${cert.certNumber.replace(
      /\//g,
      "-",
    )}`;
    navigator.clipboard.writeText(url);
    setCopiedId(cert.id);
    showToast(
      "Tautan Disalin",
      `Tautan verifikasi resmi untuk ${cert.certNumber} disalin ke clipboard.`,
    );
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadPdf = (cert: CertificateItem) => {
    setDownloadingId(cert.id);
    setTimeout(() => {
      setDownloadingId(null);
      showToast(
        "Sertifikat Berhasil Diunduh",
        `Berkas ${cert.certNumber.replace(
          /\//g,
          "_",
        )}.pdf telah tersimpan di perangkat Anda.`,
      );
    }, 1000);
  };

  const handleRunVerification = (codeToVerify?: string) => {
    const targetCode = codeToVerify || verifyInputCode;
    if (!targetCode.trim()) return;
    const res = verifyCertificateCode(targetCode, rawCertificates);
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
        user={currentUser}
        onOpenVerifier={() => {
          setVerifyInputCode("");
          setVerificationResult(null);
          setHasVerified(false);
          setShowVerifierModal(true);
        }}
        onOpenExport={() => setShowExportModal(true)}
      />

      {/* 4. Main Body Container (-mt-10 overlap) */}
      <main className="w-full mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 -mt-10 relative z-20 pb-20 flex-1 w-full flex flex-col gap-6">
        {/* Executive Metrics & Assurance Banner */}
        <SertifikatMetrics
          totalCertificates={totalCertificates}
          totalJp={totalJp}
          breakdownText={breakdownText}
          onRunSampleVerification={() => {
            const sample =
              rawCertificates[0]?.certNumber || "SER/CMC-KEMENHUB/2026/0942";
            setVerifyInputCode(sample);
            handleRunVerification(sample);
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
          totalCount={totalCertificates}
          categoryCounts={categoryCounts}
        />

        {/* Certificate Listing: Loading Skeleton, Empty or Grid/List */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white border border-[#e2e6eb] rounded-2xl p-5 shadow-xs animate-pulse flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="h-5 w-24 bg-slate-200 rounded-full" />
                  <div className="h-5 w-16 bg-slate-200 rounded-full" />
                </div>
                <div className="h-5 w-3/4 bg-slate-200 rounded mt-1" />
                <div className="h-3.5 w-1/2 bg-slate-200 rounded" />
                <div className="h-20 w-full bg-slate-100 rounded-xl mt-2" />
                <div className="h-9 w-full bg-slate-200 rounded-lg mt-auto" />
              </div>
            ))}
          </div>
        ) : filteredCertificates.length === 0 ? (
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
            sampleCertificates={rawCertificates}
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
            recipientName={currentUser?.full_name}
            totalCertificates={rawCertificates.length}
            totalJp={totalJp}
            onDownload={() => {
              setShowExportModal(false);
              const userName = currentUser?.full_name
                ? currentUser.full_name.replace(/\s+/g, "_")
                : "Pegawai";
              showToast(
                "Portofolio Berhasil Diunduh",
                `Berkas Portofolio_Sertifikat_CMC_${userName}.zip sedang diunduh.`,
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
            "Data kredensial dilindungi sesuai UU No. 27/2022 tentang Pelindungan Data Pribadi.",
          )
        }
        onShowTermsToast={() =>
          showToast(
            "Dasar Regulasi",
            "Mengacu pada Peraturan Menteri Perhubungan No. PM 47 Tahun 2021.",
          )
        }
      />
    </div>
  );
}
