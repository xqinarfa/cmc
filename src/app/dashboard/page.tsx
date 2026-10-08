"use client";

import { useState, useEffect } from "react";
import AppNavbar from "@/components/AppNavbar";
import { SesiFooter } from "@/components/sesi";
import {
  SessionItem,
  INITIAL_DASHBOARD_SESSIONS,
  INITIAL_COACHES,
} from "@/lib/dashboardData";
import {
  DashboardAnnouncement,
  DashboardHero,
  DashboardExecutiveJpCard,
  DashboardLeftColumn,
  DashboardRightColumn,
  DashboardTokenModal,
  DashboardNewSessionModal,
  DashboardActionModal,
  DashboardBreakdownModal,
  DashboardCoachFinderModal,
  DashboardCertModal,
  DashboardToast,
} from "@/components/dashboard";

export default function DashboardPage() {
  // Filter & Search states
  const [sessionFilter, setSessionFilter] = useState<"all" | "coaching" | "mentoring">("all");
  const [sessionSearch, setSessionSearch] = useState("");

  // Dismissible announcement
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  // Interactive dialogs & modals
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showBreakdownModal, setShowBreakdownModal] = useState(false);
  const [showCoachFinderModal, setShowCoachFinderModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [showJpBreakdown, setShowJpBreakdown] = useState(false);

  // Clipboard copy state
  const [copiedToken, setCopiedToken] = useState(false);

  // Toast feedback state
  const [toast, setToast] = useState<{ title: string; desc: string; type: "success" | "info" } | null>(null);

  // Active Pairing Token
  const pairingToken = "CMC-4821-7X9A";

  // Data states
  const [sessions, setSessions] = useState<SessionItem[]>(INITIAL_DASHBOARD_SESSIONS);

  // Trigger toast helper
  const triggerToast = (title: string, desc: string, type: "success" | "info" = "success") => {
    setToast({ title, desc, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Copy token with clipboard feedback
  const handleCopyToken = () => {
    navigator.clipboard.writeText(pairingToken);
    setCopiedToken(true);
    triggerToast("Token Berhasil Disalin", `Kode ${pairingToken} siap dibagikan kepada Mentor/Coach.`);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowTokenModal(false);
        setShowNewSessionModal(false);
        setShowActionModal(false);
        setShowBreakdownModal(false);
        setShowCoachFinderModal(false);
        setShowCertModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Filtered sessions
  const filteredSessions = sessions.filter((s) => {
    const matchesType = sessionFilter === "all" || s.type === sessionFilter;
    const matchesSearch =
      s.title.toLowerCase().includes(sessionSearch.toLowerCase()) ||
      s.mentor.toLowerCase().includes(sessionSearch.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleCreateNewSession = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("topic") as string;
    const type = (formData.get("type") as string).toLowerCase().includes("coaching") ? "coaching" : "mentoring";
    const jp = Number(formData.get("jp") || 2);

    const newSession: SessionItem = {
      id: `ses-${Date.now()}`,
      type,
      title: title || "Sesi Pengembangan Kompetensi Mandiri",
      mentor: (formData.get("mentor") as string) || "Rudi Santoso, M.M.",
      status: "active",
      jpCurrent: 0,
      jpTotal: jp,
      date: `${formData.get("date")} · 10:00 WIB`,
      location: "Ruang Virtual BPSDM",
    };

    setSessions([newSession, ...sessions]);
    setShowNewSessionModal(false);
    triggerToast("Sesi Berhasil Didaftarkan", `${newSession.title} (${jp} JP) berhasil ditambahkan.`);
  };

  const handleSaveAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowActionModal(false);
    triggerToast("Catatan Tersimpan", "Komitmen aksi berhasil divalidasi dan dicatat di SIASN.");
  };

  return (
    <div className="min-h-dvh w-full bg-[#f7f9fb] text-[#0f172a] font-sans antialiased selection:bg-[#0a2540] selection:text-white flex flex-col justify-between">
      {/* 1. TOP HEADER NAVBAR */}
      <AppNavbar
        onOpenCertModal={() => setShowCertModal(true)}
        onOpenCoachFinder={() => setShowCoachFinderModal(true)}
        onOpenBreakdownModal={() => setShowBreakdownModal(true)}
      />

      {/* 2. ANNOUNCEMENT BANNER */}
      <DashboardAnnouncement
        show={showAnnouncement}
        onClose={() => setShowAnnouncement(false)}
      />

      {/* 3. HERO SECTION */}
      <DashboardHero />

      {/* 4. MAIN CONTENT CONTAINER */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-16 flex-1 w-full flex flex-col gap-5">
        {/* EXECUTIVE CAPAIAN JP CARD */}
        <DashboardExecutiveJpCard
          showJpBreakdown={showJpBreakdown}
          onToggleJpBreakdown={() => setShowJpBreakdown(!showJpBreakdown)}
        />

        {/* MAIN TWO-COLUMN DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start">
          {/* LEFT COLUMN */}
          <DashboardLeftColumn
            onOpenBreakdownModal={() => setShowBreakdownModal(true)}
            onOpenTokenModal={() => setShowTokenModal(true)}
            onCopyToken={handleCopyToken}
            copiedToken={copiedToken}
            pairingToken={pairingToken}
            onOpenCoachFinderModal={() => setShowCoachFinderModal(true)}
          />

          {/* RIGHT COLUMN */}
          <DashboardRightColumn
            filteredSessions={filteredSessions}
            sessionFilter={sessionFilter}
            setSessionFilter={setSessionFilter}
            sessionSearch={sessionSearch}
            setSessionSearch={setSessionSearch}
            onOpenTokenModal={() => setShowTokenModal(true)}
            onOpenActionModal={() => setShowActionModal(true)}
            onOpenCoachFinderModal={() => setShowCoachFinderModal(true)}
          />
        </div>
      </main>

      {/* 5. INSTITUTIONAL FOOTER */}
      <SesiFooter
        onShowToast={(msg) => triggerToast("Informasi Layanan", msg, "info")}
      />

      {/* 6. MODALS */}
      <DashboardTokenModal
        isOpen={showTokenModal}
        onClose={() => setShowTokenModal(false)}
        pairingToken={pairingToken}
        copiedToken={copiedToken}
        onCopyToken={handleCopyToken}
      />

      <DashboardNewSessionModal
        isOpen={showNewSessionModal}
        onClose={() => setShowNewSessionModal(false)}
        onSubmit={handleCreateNewSession}
      />

      <DashboardActionModal
        isOpen={showActionModal}
        onClose={() => setShowActionModal(false)}
        onSubmit={handleSaveAction}
      />

      <DashboardBreakdownModal
        isOpen={showBreakdownModal}
        onClose={() => setShowBreakdownModal(false)}
      />

      <DashboardCoachFinderModal
        isOpen={showCoachFinderModal}
        onClose={() => setShowCoachFinderModal(false)}
        coaches={INITIAL_COACHES}
      />

      <DashboardCertModal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        onDownload={() => {
          triggerToast("Sertifikat Diunduh", "Berkas Sertifikat_CMC_Andi_Pratama.pdf berhasil disimpan.");
          setShowCertModal(false);
        }}
      />

      {/* 7. TOAST NOTIFICATION */}
      <DashboardToast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
