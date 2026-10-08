"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { SessionItem } from "@/lib/dashboardData";

interface DashboardRightColumnProps {
  filteredSessions: SessionItem[];
  sessionFilter: "all" | "coaching" | "mentoring";
  setSessionFilter: (filter: "all" | "coaching" | "mentoring") => void;
  sessionSearch: string;
  setSessionSearch: (search: string) => void;
  onOpenTokenModal: () => void;
  onOpenActionModal: () => void;
  onOpenCoachFinderModal: () => void;
}

export function DashboardRightColumn({
  filteredSessions,
  sessionFilter,
  setSessionFilter,
  sessionSearch,
  setSessionSearch,
  onOpenTokenModal,
  onOpenActionModal,
  onOpenCoachFinderModal,
}: DashboardRightColumnProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5">
      {/* 1. Sesi Aktif dengan Filter Interaktif */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.18, ease: "easeOut" }}
        className="bg-white border border-[#e2e6eb] rounded-[14px] p-5 sm:p-6 shadow-xs flex flex-col gap-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-[#0a2244] text-[15px] leading-tight">
                Sesi Pembelajaran Aktif
              </h3>
              <span className="text-[11px] text-slate-500">
                {filteredSessions.length} sesi terdaftar dalam siklus berjalan
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Pills with LayoutGroup */}
            <LayoutGroup id="dashboard-filter">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start sm:self-auto">
                {[
                  { id: "all", label: "Semua" },
                  { id: "coaching", label: "Coaching" },
                  { id: "mentoring", label: "Mentoring" },
                ].map((filterTab) => (
                  <button
                    key={filterTab.id}
                    type="button"
                    onClick={() => setSessionFilter(filterTab.id as any)}
                    className={`relative px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
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
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </LayoutGroup>

            <Link
              href="/sesi"
              className="text-[12px] font-semibold text-[#1e5fa8] hover:text-[#0a2540] hidden sm:flex items-center gap-1 transition-colors"
            >
              <span>Lihat Semua</span>
              <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Sesi List Items */}
        <div className="flex flex-col rounded-xl border border-slate-200/80 divide-y divide-slate-100 overflow-hidden">
          {filteredSessions.length === 0 ? (
            <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-slate-500">
              <p className="text-xs">Tidak ada sesi yang sesuai dengan filter.</p>
              <button
                type="button"
                onClick={() => {
                  setSessionFilter("all");
                  setSessionSearch("");
                }}
                className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
              >
                Reset filter
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={sessionFilter + sessionSearch}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="divide-y divide-slate-100"
              >
                {filteredSessions.map((ses, idx) => (
                  <motion.div
                    key={ses.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="flex flex-col gap-1 max-w-[420px]">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10.5px] font-bold uppercase tracking-wide ${
                            ses.type === "coaching"
                              ? "bg-blue-50 text-blue-800 border border-blue-200"
                              : "bg-teal-50 text-teal-800 border border-teal-200"
                          }`}
                        >
                          {ses.type}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">{ses.date}</span>
                      </div>

                      <span className="font-bold text-slate-900 text-[14px] leading-snug">
                        {ses.title}
                      </span>

                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <span className="font-medium text-slate-500">
                          {ses.type === "coaching" ? "Coach:" : "Mentor:"}
                        </span>
                        <strong className="font-semibold text-slate-800">{ses.mentor}</strong>
                      </div>
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto shrink-0">
                      {ses.status === "active" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11.5px] font-semibold">
                          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Berlangsung
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11.5px] font-semibold">
                          <span className="size-1.5 rounded-full bg-amber-500" />
                          Menunggu Konfirmasi
                        </span>
                      )}

                      {ses.status === "active" ? (
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
                              style={{ width: `${(ses.jpCurrent / ses.jpTotal) * 100}%` }}
                            />
                          </div>
                          <span className="text-[11.5px] font-bold text-slate-700 shrink-0 tabular-nums">
                            {ses.jpCurrent} / {ses.jpTotal} JP
                          </span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={onOpenTokenModal}
                          className="h-7.5 px-3 rounded-md bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-[11.5px] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
                        >
                          <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                          </svg>
                          <span>Bagikan Token</span>
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

      {/* 2. Tindakan Diperlukan */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.22, ease: "easeOut" }}
        className="bg-white border border-[#e2e6eb] rounded-[14px] p-5 sm:p-6 shadow-xs flex flex-col gap-3"
      >
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="font-bold text-[#0a2244] text-[14.5px]">
            Tindakan Diperlukan
          </h3>
        </div>

        <div className="bg-amber-50/50 border border-amber-200/70 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-800 text-[10.5px] uppercase tracking-wide">
                Menunggu Input Anda
              </span>
              <span className="size-1 rounded-full bg-amber-400" />
              <span className="text-[11px] text-amber-700 font-medium">Batas Waktu: 3 Hari</span>
            </div>
            <span className="font-bold text-slate-900 text-[13.5px]">
              Catat Lembar Komitmen &amp; Hasil Coaching
            </span>
            <span className="text-xs text-slate-600">
              Sesi ke-1 bersama Rudi Santoso, M.M. memerlukan kesepakatan rencana aksi.
            </span>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenActionModal}
            className="h-8.5 px-4 rounded-lg bg-[#0a2244] hover:bg-[#13396b] text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
          >
            <span>Lengkapi Catatan</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
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
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
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
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
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
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
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
