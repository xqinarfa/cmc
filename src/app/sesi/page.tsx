"use client";

import { useState, useRef, useEffect } from "react";
import { AppNavbar, AppFooter } from "@/components/common";
import {
  SESSIONS_DATA,
  SessionItem,
  FilterTab,
  CategoryFilter,
  SortOrder,
} from "@/lib/sessionData";
import {
  SesiHero,
  SesiJpProgressCard,
  SesiFilterBar,
  SesiCard,
  SesiEmptyState,
  SesiCertModal,
  SesiFixModal,
  SesiToast,
} from "@/components/sesi";

export default function SesiHomePage() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listTopRef = useRef<HTMLDivElement>(null);

  // Filters state
  const [activeTab, setActiveTab] = useState<FilterTab>("semua");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("terbaru");

  // Accordion for completed sessions
  const [showAllCompleted, setShowAllCompleted] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Interactive inline feedback states
  const [copiedTokenId, setCopiedTokenId] = useState<string | null>(null);
  const [sendingNotifId, setSendingNotifId] = useState<string | null>(null);

  // Modals state
  const [certModalSession, setCertModalSession] = useState<SessionItem | null>(null);
  const [fixModalSession, setFixModalSession] = useState<SessionItem | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [fixClarificationNote, setFixClarificationNote] = useState("");

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "/" || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }

      if (e.key === "Escape") {
        if (certModalSession) setCertModalSession(null);
        if (fixModalSession) setFixModalSession(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [certModalSession, fixModalSession]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleCopyToken = (sessionId: string, token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedTokenId(sessionId);
    showToast(`Token (${token}) berhasil disalin ke clipboard!`);
    setTimeout(() => setCopiedTokenId(null), 2500);
  };

  const handleResendNotif = (sessionId: string, sessionTitle: string) => {
    setSendingNotifId(sessionId);
    setTimeout(() => {
      setSendingNotifId(null);
      showToast(`Notifikasi pengingat untuk "${sessionTitle}" berhasil dikirim ulang ke Coach/Mentor.`);
    }, 450);
  };

  const handleFilterClick = (tab: FilterTab) => {
    setActiveTab(tab);
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleResetFilter = () => {
    setSearchQuery("");
    setCategoryFilter("semua");
    setActiveTab("semua");
  };

  // Filter & Search logic
  const matchesSearch = (item: SessionItem) => {
    if (categoryFilter !== "semua" && item.category !== categoryFilter) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.mentorOrCoachName.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.token && item.token.toLowerCase().includes(q))
    );
  };

  const filteredSessionsRaw = SESSIONS_DATA.filter((item) => {
    if (!matchesSearch(item)) return false;
    if (activeTab === "semua") return true;
    if (activeTab === "perlu_tindakan") return item.section === "perlu_tindakan";
    if (activeTab === "berlangsung") return item.section === "berlangsung";
    if (activeTab === "selesai") return item.section === "selesai";
    return true;
  });

  const filteredSessions =
    sortOrder === "terlama" ? [...filteredSessionsRaw].reverse() : filteredSessionsRaw;

  const perluTindakanList = filteredSessions.filter((s) => s.section === "perlu_tindakan");
  const berlangsungList = filteredSessions.filter((s) => s.section === "berlangsung");
  const selesaiListAll = filteredSessions.filter((s) => s.section === "selesai");
  const selesaiListDisplayed = showAllCompleted ? selesaiListAll : selesaiListAll.slice(0, 3);
  const hiddenSelesaiCount = Math.max(0, selesaiListAll.length - 3);

  // Dynamic counts
  const counts = {
    total: SESSIONS_DATA.length,
    perluTindakan: SESSIONS_DATA.filter((s) => s.section === "perlu_tindakan").length,
    berlangsung: SESSIONS_DATA.filter((s) => s.section === "berlangsung").length,
    selesai: SESSIONS_DATA.filter((s) => s.section === "selesai").length,
  };

  return (
    <div className="min-h-dvh w-full bg-[#f7f9fb] text-[#0f172a] font-sans antialiased selection:bg-[#0a2540] selection:text-white flex flex-col justify-between">
      {/* 1. App Navbar */}
      <AppNavbar />

      {/* 2. Hero Section */}
      <SesiHero />

      {/* 3. Main Content Container */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-16 flex-1 w-full flex flex-col gap-5">
        {/* Capaian JP Progress Card */}
        <SesiJpProgressCard
          activeTab={activeTab}
          onFilterClick={handleFilterClick}
          countPerluTindakan={counts.perluTindakan}
          countBerlangsung={counts.berlangsung}
        />

        {/* Scroll anchor */}
        <div ref={listTopRef} />

        {/* Toolbar: Tabs + Search + Category + Sort */}
        <SesiFilterBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          searchInputRef={searchInputRef}
          onResetFilter={handleResetFilter}
        />

        {/* Section 1: Perlu Tindakan Anda */}
        {(activeTab === "semua" || activeTab === "perlu_tindakan") &&
          perluTindakanList.length > 0 && (
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-[11.5px] font-bold tracking-[0.6px] uppercase text-[#64748b]">
                  Perlu Tindakan Anda
                </span>
                <span className="text-[12px] font-semibold text-[#92400e] bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-amber-500" />
                  <span>{perluTindakanList.length} sesi butuh respons</span>
                </span>
                <div className="flex-1 h-px bg-[#e2e6eb]" />
              </div>

              <div className="flex flex-col gap-3">
                {perluTindakanList.map((session, idx) => (
                  <SesiCard
                    key={session.id}
                    session={session}
                    index={idx}
                    copiedTokenId={copiedTokenId}
                    sendingNotifId={sendingNotifId}
                    onCopyToken={handleCopyToken}
                    onResendNotif={handleResendNotif}
                    onOpenFixModal={setFixModalSession}
                  />
                ))}
              </div>
            </div>
          )}

        {/* Section 2: Sedang Berlangsung */}
        {(activeTab === "semua" || activeTab === "berlangsung") && berlangsungList.length > 0 && (
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-[11.5px] font-bold tracking-[0.6px] uppercase text-[#64748b]">
                Sedang Berlangsung
              </span>
              <span className="text-[12px] font-semibold text-[#067647] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-600" />
                <span>{berlangsungList.length} sesi aktif</span>
              </span>
              <div className="flex-1 h-px bg-[#e2e6eb]" />
            </div>

            <div className="flex flex-col gap-3">
              {berlangsungList.map((session, idx) => (
                <SesiCard key={session.id} session={session} index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Selesai */}
        {(activeTab === "semua" || activeTab === "selesai") && selesaiListAll.length > 0 && (
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-[11.5px] font-bold tracking-[0.6px] uppercase text-[#64748b]">
                Selesai
              </span>
              <span className="text-[12px] font-semibold text-[#64748b] bg-slate-100 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-slate-400" />
                <span>{selesaiListAll.length} sesi terselesaikan</span>
              </span>
              <div className="flex-1 h-px bg-[#e2e6eb]" />
            </div>

            <div className="flex flex-col gap-3">
              {selesaiListDisplayed.map((session, idx) => (
                <SesiCard
                  key={session.id}
                  session={session}
                  index={idx}
                  onOpenCertModal={setCertModalSession}
                />
              ))}
            </div>

            {/* Accordion Toggle */}
            {hiddenSelesaiCount > 0 && (
              <button
                type="button"
                onClick={() => setShowAllCompleted(!showAllCompleted)}
                className="w-full h-[49px] rounded-[10px] border border-[#e2e6eb] border-dashed bg-white hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs group"
              >
                <svg
                  className={`size-3.5 text-[#1e5fa8] transition-transform duration-300 ${
                    showAllCompleted ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                <span className="text-[13px] font-semibold text-[#1e5fa8]">
                  {showAllCompleted
                    ? "Sembunyikan 2 sesi selesai"
                    : `Lihat ${hiddenSelesaiCount} sesi selesai lainnya`}
                </span>
              </button>
            )}
          </div>
        )}

        {/* Empty State */}
        {filteredSessions.length === 0 && (
          <SesiEmptyState searchQuery={searchQuery} onResetFilter={handleResetFilter} />
        )}
      </main>

      {/* Toast Notification */}
      <SesiToast message={toastMessage} />

      {/* Modal: Sertifikat */}
      <SesiCertModal
        session={certModalSession}
        onClose={() => setCertModalSession(null)}
        onDownload={() => {
          setCertModalSession(null);
          showToast("Mengunduh sertifikat resmi PDF...");
        }}
      />

      {/* Modal: Perbaiki & Ajukan Ulang */}
      <SesiFixModal
        session={fixModalSession}
        uploadedFileName={uploadedFileName}
        onFileSelect={setUploadedFileName}
        clarificationNote={fixClarificationNote}
        onClarificationNoteChange={setFixClarificationNote}
        onClose={() => setFixModalSession(null)}
        onSubmit={() => {
          setFixModalSession(null);
          showToast("Sesi berhasil diajukan ulang ke Atasan untuk verifikasi!");
        }}
      />

      {/* Footer */}
      <AppFooter onShowToast={showToast} />
    </div>
  );
}
