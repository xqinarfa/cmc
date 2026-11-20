"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { SessionItem } from "@/lib/dashboardData";
import { ApiSession } from "@/lib/api";

export interface NormalizedDashboardSession {
  id: string;
  type: "coaching" | "mentoring" | "konseling";
  title: string;
  mentor: string;
  status: "active" | "pending" | "completed" | "rejected" | "cancelled";
  jpCurrent: number;
  jpTotal: number;
  date: string;
  token?: string;
}

export interface DashboardRightColumnProps {
  filteredSessions?: SessionItem[];
  sessions?: (SessionItem | ApiSession)[];
  sessionFilter: "all" | "coaching" | "mentoring" | "konseling";
  setSessionFilter: (
    filter: "all" | "coaching" | "mentoring" | "konseling"
  ) => void;
  sessionSearch: string;
  setSessionSearch: (search: string) => void;
  onOpenTokenModal?: (token?: string) => void;
  onOpenActionModal?: () => void;
  onOpenCoachFinderModal: () => void;
}

export function normalizeDashboardSession(
  s: SessionItem | ApiSession | any
): NormalizedDashboardSession {
  const id = s.id || "";

  // Type determination
  const rawType = (s.type || "").toLowerCase();
  const type: "coaching" | "mentoring" | "konseling" =
    rawType === "mentoring"
      ? "mentoring"
      : rawType === "counseling" || rawType === "konseling"
      ? "konseling"
      : "coaching";

  // Title
  const title = s.title || s.topic || `Sesi ${type}`;

  // Mentor / Practitioner
  let mentor = "Belum ditentukan";
  if (s.practitioner?.full_name) {
    mentor = s.practitioner.full_name;
  } else if (typeof s.mentor === "string" && s.mentor.trim()) {
    mentor = s.mentor;
  } else if (s.client?.full_name) {
    mentor = s.client.full_name;
  }

  // Status
  const rawStatus = (s.status || "").toLowerCase();
  let status: "active" | "pending" | "completed" | "rejected" | "cancelled" =
    "active";
  if (rawStatus === "completed" || rawStatus === "selesai") {
    status = "completed";
  } else if (
    rawStatus === "pending" ||
    rawStatus === "menunggu" ||
    rawStatus === "draft"
  ) {
    status = "pending";
  } else if (
    rawStatus === "rejected" ||
    rawStatus === "ditolak" ||
    rawStatus === "dikembalikan"
  ) {
    status = "rejected";
  } else if (rawStatus === "cancelled" || rawStatus === "dibatalkan") {
    status = "cancelled";
  } else {
    status = "active";
  }

  // JP counts
  const jpCurrent =
    typeof s.jpCurrent === "number" ? s.jpCurrent : s.current_jp || 0;
  const jpTotal =
    typeof s.jpTotal === "number" ? s.jpTotal : s.target_jp || 6;

  // Date
  let date = s.date;
  if (!date && (s.created_at || s.scheduled_at)) {
    const d = new Date(s.scheduled_at || s.created_at);
    if (!isNaN(d.getTime())) {
      date = d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  }
  if (!date) date = "2026";

  const token = s.token;

  return {
    id,
    type,
    title,
    mentor,
    status,
    jpCurrent,
    jpTotal,
    date,
    token,
  };
}

export function DashboardRightColumn({
  filteredSessions,
  sessions,
  sessionFilter,
  setSessionFilter,
  sessionSearch,
  setSessionSearch,
  onOpenTokenModal,
  onOpenActionModal,
  onOpenCoachFinderModal,
}: DashboardRightColumnProps) {
  const router = useRouter();

  // Normalize source sessions
  const allNormalizedSessions = useMemo(() => {
    if (sessions && Array.isArray(sessions)) {
      return sessions.map(normalizeDashboardSession);
    }
    if (filteredSessions && Array.isArray(filteredSessions)) {
      return filteredSessions.map(normalizeDashboardSession);
    }
    return [];
  }, [sessions, filteredSessions]);

  // Apply search & filter locally to ensure consistent responsiveness
  const displayedSessions = useMemo(() => {
    return allNormalizedSessions.filter((s) => {
      const matchesType = sessionFilter === "all" || s.type === sessionFilter;
      const q = sessionSearch.trim().toLowerCase();
      const matchesSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.mentor.toLowerCase().includes(q);
      return matchesType && matchesSearch;
    });
  }, [allNormalizedSessions, sessionFilter, sessionSearch]);

  // Determine real dynamic action required session
  const actionRequiredSession = useMemo(() => {
    if (allNormalizedSessions.length === 0) return null;
    // Priority 1: Rejected / Needs revision
    const rejected = allNormalizedSessions.find((s) => s.status === "rejected");
    if (rejected) return rejected;
    // Priority 2: Pending confirmation / pairing
    const pending = allNormalizedSessions.find((s) => s.status === "pending");
    if (pending) return pending;
    // Priority 3: Active session needing meetings/catatan
    const active = allNormalizedSessions.find((s) => s.status === "active");
    if (active) return active;

    return null;
  }, [allNormalizedSessions]);

  return (
    <div className="flex flex-col gap-5">
      {/* 1. Sesi Aktif dengan Filter Interaktif & Data Real */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.18, ease: "easeOut" }}
        className="bg-white border border-[#e2e6eb] rounded-[14px] p-5 sm:p-6 shadow-xs flex flex-col gap-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-[#0a2244] text-[15px] leading-tight">
                Sesi Pembelajaran Aktif
              </h3>
              <span className="text-[11px] text-slate-500">
                {displayedSessions.length} sesi terdaftar dalam siklus berjalan
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Filter Pills with LayoutGroup */}
            <LayoutGroup id="dashboard-filter">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start sm:self-auto overflow-x-auto max-w-full">
                {[
                  { id: "all", label: "Semua" },
                  { id: "coaching", label: "Coaching" },
                  { id: "mentoring", label: "Mentoring" },
                  { id: "konseling", label: "Konseling" },
                ].map((filterTab) => (
                  <button
                    key={filterTab.id}
                    type="button"
                    onClick={() =>
                      setSessionFilter(
                        filterTab.id as
                          | "all"
                          | "coaching"
                          | "mentoring"
                          | "konseling"
                      )
                    }
                    className={`relative px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                      sessionFilter === filterTab.id
                        ? "text-[#0a2244]"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span className="relative z-10">{filterTab.label}</span>
                    {sessionFilter === filterTab.id && (
                      <motion.span
                        layoutId="dashboardActiveFilter"
                        className="absolute inset-0 bg-white rounded-md shadow-xs"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 32,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </LayoutGroup>

            <Link
              href="/sesi"
              className="text-[12px] font-semibold text-[#1e5fa8] hover:text-[#0a2540] hidden sm:flex items-center gap-1 transition-colors ml-auto"
            >
              <span>Lihat Semua</span>
              <svg
                className="size-3"
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
            </Link>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Cari topik sesi atau nama pembimbing..."
            value={sessionSearch}
            onChange={(e) => setSessionSearch(e.target.value)}
            className="w-full h-8.5 pl-8.5 pr-8 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white transition-all"
          />
          <svg
            className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {sessionSearch && (
            <button
              type="button"
              onClick={() => setSessionSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              aria-label="Hapus pencarian"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Sesi List Items */}
        <div className="flex flex-col rounded-xl border border-slate-200/80 divide-y divide-slate-100 overflow-hidden">
          {allNormalizedSessions.length === 0 ? (
            <div className="p-8 text-center flex flex-col items-center justify-center gap-3 text-slate-500">
              <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-xs font-semibold text-slate-700">
                  Belum ada sesi pembelajaran
                </p>
                <p className="text-[11px] text-slate-400 max-w-xs">
                  Mulai siklus pengembangan kompetensi Anda dengan mendaftarkan
                  sesi baru.
                </p>
              </div>
              <Link
                href="/sesi/baru"
                className="mt-1 px-3.5 py-1.5 rounded-lg bg-[#0a2244] text-white text-xs font-semibold hover:bg-[#13396b] transition-colors"
              >
                + Jadwalkan Sesi Baru
              </Link>
            </div>
          ) : displayedSessions.length === 0 ? (
            <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-slate-500">
              <p className="text-xs">
                Tidak ada sesi yang sesuai dengan filter atau kata kunci &quot;
                {sessionSearch}&quot;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSessionFilter("all");
                  setSessionSearch("");
                }}
                className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
              >
                Reset filter &amp; pencarian
              </button>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                key={sessionFilter + sessionSearch}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="divide-y divide-slate-100"
              >
                {displayedSessions.map((ses, idx) => (
                  <motion.div
                    key={ses.id || idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.04 }}
                    onClick={() => {
                      if (ses.id) {
                        router.push(`/sesi/detail/${ses.id}`);
                      }
                    }}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white hover:bg-slate-50/90 transition-colors cursor-pointer group"
                  >
                    <div className="flex flex-col gap-1 max-w-[420px]">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10.5px] font-bold uppercase tracking-wide ${
                            ses.type === "coaching"
                              ? "bg-blue-50 text-blue-800 border border-blue-200"
                              : ses.type === "mentoring"
                              ? "bg-teal-50 text-teal-800 border border-teal-200"
                              : "bg-purple-50 text-purple-800 border border-purple-200"
                          }`}
                        >
                          {ses.type}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {ses.date}
                        </span>
                      </div>

                      <span className="font-bold text-slate-900 text-[14px] leading-snug group-hover:text-blue-700 transition-colors">
                        {ses.title}
                      </span>

                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <span className="font-medium text-slate-500">
                          {ses.type === "coaching"
                            ? "Coach:"
                            : ses.type === "mentoring"
                            ? "Mentor:"
                            : "Konselor:"}
                        </span>
                        <strong className="font-semibold text-slate-800">
                          {ses.mentor}
                        </strong>
                      </div>
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto shrink-0">
                      {ses.status === "active" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11.5px] font-semibold">
                          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Berlangsung
                        </span>
                      ) : ses.status === "pending" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11.5px] font-semibold">
                          <span className="size-1.5 rounded-full bg-amber-500" />
                          Menunggu Konfirmasi
                        </span>
                      ) : ses.status === "rejected" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11.5px] font-semibold">
                          <span className="size-1.5 rounded-full bg-rose-500" />
                          Perlu Revisi
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11.5px] font-semibold">
                          <svg
                            className="w-3 h-3 text-emerald-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Selesai
                        </span>
                      )}

                      {ses.status === "active" || ses.status === "completed" ? (
                        <div className="flex items-center gap-2.5 w-full sm:w-44">
                          <div
                            className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden"
                            role="progressbar"
                            aria-valuenow={ses.jpCurrent}
                            aria-valuemin={0}
                            aria-valuemax={ses.jpTotal}
                          >
                            <div
                              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.round(
                                    (ses.jpCurrent / (ses.jpTotal || 1)) * 100
                                  )
                                )}%`,
                              }}
                            />
                          </div>
                          <span className="text-[11.5px] font-bold text-slate-700 shrink-0 tabular-nums">
                            {ses.jpCurrent} / {ses.jpTotal} JP
                          </span>
                        </div>
                      ) : ses.status === "pending" ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onOpenTokenModal) {
                              onOpenTokenModal(ses.token);
                            }
                          }}
                          className="h-7.5 px-3 rounded-md bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-[11.5px] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
                        >
                          <svg
                            className="w-3 h-3 text-slate-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                            />
                          </svg>
                          <span>Bagikan Token</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (ses.id) {
                              router.push(`/sesi/detail/${ses.id}`);
                            }
                          }}
                          className="h-7.5 px-3 rounded-md bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-semibold text-[11.5px] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
                        >
                          <span>Perbaiki</span>
                          <svg
                            className="w-3 h-3 text-rose-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>

      {/* 2. Tindakan Diperlukan (Data Real Database) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.22, ease: "easeOut" }}
        className="bg-white border border-[#e2e6eb] rounded-[14px] p-5 sm:p-6 shadow-xs flex flex-col gap-3"
      >
        <div className="flex items-center gap-2">
          <div
            className={`size-6 rounded-md flex items-center justify-center shrink-0 ${
              actionRequiredSession?.status === "rejected"
                ? "bg-rose-50 text-rose-600"
                : actionRequiredSession
                ? "bg-amber-50 text-amber-600"
                : "bg-emerald-50 text-emerald-600"
            }`}
          >
            {actionRequiredSession?.status === "rejected" ? (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            ) : actionRequiredSession ? (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
          <h3 className="font-bold text-[#0a2244] text-[14.5px]">
            Tindakan Diperlukan
          </h3>
        </div>

        {actionRequiredSession ? (
          <div
            className={`border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              actionRequiredSession.status === "rejected"
                ? "bg-rose-50/50 border-rose-200/80"
                : "bg-amber-50/50 border-amber-200/70"
            }`}
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span
                  className={`font-bold text-[10.5px] uppercase tracking-wide ${
                    actionRequiredSession.status === "rejected"
                      ? "text-rose-800"
                      : "text-amber-800"
                  }`}
                >
                  {actionRequiredSession.status === "rejected"
                    ? "Perlu Revisi Catatan"
                    : actionRequiredSession.status === "pending"
                    ? "Menunggu Konfirmasi"
                    : "Menunggu Input Anda"}
                </span>
                <span
                  className={`size-1 rounded-full ${
                    actionRequiredSession.status === "rejected"
                      ? "bg-rose-400"
                      : "bg-amber-400"
                  }`}
                />
                <span
                  className={`text-[11px] font-medium ${
                    actionRequiredSession.status === "rejected"
                      ? "text-rose-700"
                      : "text-amber-700"
                  }`}
                >
                  {actionRequiredSession.status === "rejected"
                    ? "Perbaikan Lembar Komitmen"
                    : actionRequiredSession.status === "pending"
                    ? "Verifikasi Token Aktif"
                    : "Siklus Pembelajaran Berjalan"}
                </span>
              </div>
              <span className="font-bold text-slate-900 text-[13.5px]">
                {actionRequiredSession.title}
              </span>
              <span className="text-xs text-slate-600">
                Sesi {actionRequiredSession.type} bersama{" "}
                {actionRequiredSession.mentor} memerlukan kelengkapan catatan
                pertemuan untuk sinkronisasi SIASN.
              </span>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (actionRequiredSession.id) {
                  router.push(`/sesi/detail/${actionRequiredSession.id}`);
                } else if (onOpenActionModal) {
                  onOpenActionModal();
                } else {
                  router.push("/sesi");
                }
              }}
              className="h-8.5 px-4 rounded-lg bg-[#0a2244] hover:bg-[#13396b] text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
            >
              <span>
                {actionRequiredSession.status === "rejected"
                  ? "Perbaiki Sesi"
                  : actionRequiredSession.status === "pending"
                  ? "Lihat Detail Sesi"
                  : "Lengkapi Catatan"}
              </span>
              <svg
                className="w-3 h-3"
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
            </motion.button>
          </div>
        ) : (
          <div className="bg-emerald-50/50 border border-emerald-200/70 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-800 text-[10.5px] uppercase tracking-wide">
                  Semua Sesi Terverifikasi
                </span>
                <span className="size-1 rounded-full bg-emerald-400" />
                <span className="text-[11px] text-emerald-700 font-medium">
                  Status Terkini
                </span>
              </div>
              <span className="font-bold text-slate-900 text-[13.5px]">
                Tidak Ada Tindakan Tertunda
              </span>
              <span className="text-xs text-slate-600">
                Seluruh komitmen dan lembar catatan pertemuan telah tersinkronisasi
                dengan baik ke SIASN.
              </span>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/sesi/baru")}
              className="h-8.5 px-4 rounded-lg bg-[#0a2244] hover:bg-[#13396b] text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
            >
              <span>Jadwalkan Sesi Baru</span>
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* 3. Akses Cepat */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.26, ease: "easeOut" }}
        className="bg-white border border-[#e2e6eb] rounded-[14px] p-5 sm:p-6 shadow-xs flex flex-col gap-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-[#0a2244] text-[14.5px]">
              Akses Cepat Layanan CMC
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Pusat Mandiri</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Jadwalkan Sesi Mandiri */}
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/sesi/baru"
              className="bg-slate-50 hover:bg-slate-100/90 border border-[#e2e6eb] rounded-[11px] p-4 flex flex-col gap-2.5 items-start text-left transition-all cursor-pointer group focus-visible:ring-2 focus-visible:ring-blue-600 outline-none no-underline h-full"
            >
              <div className="size-8.5 rounded-lg bg-white border border-[#e2e6eb] flex items-center justify-center text-[#0a2244] group-hover:border-blue-400 group-hover:text-blue-700 transition-colors shadow-2xs">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <span className="font-bold text-slate-900 text-[13px] block group-hover:text-blue-700 transition-colors">
                  Jadwalkan Sesi Mandiri
                </span>
                <span className="text-[11.5px] text-slate-500 leading-snug">
                  Daftarkan topik coaching atau mentoring baru
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Cari Coach atau Mentor */}
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenCoachFinderModal}
            className="bg-slate-50 hover:bg-slate-100/90 border border-[#e2e6eb] rounded-[11px] p-4 flex flex-col gap-2.5 items-start text-left transition-all cursor-pointer group focus-visible:ring-2 focus-visible:ring-blue-600 outline-none h-full"
          >
            <div className="size-8.5 rounded-lg bg-white border border-[#e2e6eb] flex items-center justify-center text-[#0a2244] group-hover:border-blue-400 group-hover:text-blue-700 transition-colors shadow-2xs">
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <div>
              <span className="font-bold text-slate-900 text-[13px] block group-hover:text-blue-700 transition-colors">
                Direktori Coach &amp; Mentor
              </span>
              <span className="text-[11.5px] text-slate-500 leading-snug">
                Temukan pembimbing terakreditasi BPSDM
              </span>
            </div>
          </motion.button>

          {/* Unduh Sertifikat (Full Width) */}
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/sertifikat")}
            className="sm:col-span-2 bg-slate-50 hover:bg-slate-100/90 border border-[#e2e6eb] rounded-[11px] p-4 flex items-center justify-between text-left transition-all cursor-pointer group focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
          >
            <div className="flex items-center gap-3">
              <div className="size-8.5 rounded-lg bg-white border border-[#e2e6eb] flex items-center justify-center text-[#0a2244] group-hover:border-blue-400 group-hover:text-blue-700 transition-colors shadow-2xs shrink-0">
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
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
                  />
                </svg>
              </div>
              <div>
                <span className="font-bold text-slate-900 text-[13px] block group-hover:text-blue-700 transition-colors">
                  Unduh Sertifikat Pengembangan Kompetensi
                </span>
                <span className="text-[11.5px] text-slate-500 leading-snug">
                  Dokumen digital ber-barcode resmi tervalidasi SIASN BKN
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
              Buka →
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
