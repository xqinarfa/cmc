"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterTab, SessionItem } from "@/lib/sessionData";
import { JpProgressSummary, calculateJpSummary } from "@/lib/jpCalculations";

interface SesiJpProgressCardProps {
  activeTab: FilterTab;
  onFilterClick: (tab: FilterTab) => void;
  countPerluTindakan?: number;
  countBerlangsung?: number;
  sessions?: SessionItem[];
  jpSummary?: JpProgressSummary;
}

export default function SesiJpProgressCard({
  activeTab,
  onFilterClick,
  countPerluTindakan,
  countBerlangsung,
  sessions = [],
  jpSummary,
}: SesiJpProgressCardProps) {
  const [showJpBreakdown, setShowJpBreakdown] = useState(false);

  const summary = jpSummary || calculateJpSummary(sessions);

  const displayCountPerluTindakan =
    countPerluTindakan !== undefined ? countPerluTindakan : summary.countPerluTindakan;
  const displayCountBerlangsung =
    countBerlangsung !== undefined ? countBerlangsung : summary.countBerlangsung;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white border border-[#e2e6eb] rounded-[14px] p-5.5 shadow-[0px_12px_24px_rgba(0,0,0,0.06)] flex flex-col md:flex-row items-center gap-6 w-full relative transition-all"
    >
      {/* Left Progress Section (Goal-Gradient Effect) */}
      <div className="flex-1 w-full min-w-0 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11.5px] font-bold tracking-[0.6px] uppercase text-[#64748b]">
              Capaian Jam Pelajaran (JP) 2026
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold text-[10.5px]">
              Target SKP
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowJpBreakdown(!showJpBreakdown)}
            className="text-[12px] text-[#1e5fa8] hover:text-[#0a2540] font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
            title="Lihat rincian kontribusi JP"
          >
            <span>{showJpBreakdown ? "Sembunyikan Rincian" : "Lihat Rincian JP"}</span>
            <svg
              className={`size-3 transition-transform ${showJpBreakdown ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Real Numbers: Capaian / Target JP with Percentage Badge */}
        <div className="flex items-baseline gap-2">
          <span className="text-[34px] font-extrabold text-[#0f172a] leading-none tracking-[-1px]">
            {summary.totalJp}
          </span>
          <span className="text-[22px] text-[#94a3b8] font-light">/</span>
          <span className="text-[20px] font-semibold text-[#64748b]">{summary.targetJp}</span>
          <span className="text-[13.5px] font-semibold text-[#64748b] ml-0.5">JP</span>
          <span
            className={`ml-2 px-2.5 py-0.5 rounded-full font-bold text-[11.5px] border inline-flex items-center gap-1 ${
              summary.percentage >= 100
                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                : summary.percentage > 0
                ? "bg-blue-50 text-blue-800 border-blue-200/80"
                : "bg-slate-50 text-slate-600 border-slate-200"
            }`}
          >
            {summary.percentage > 0 ? (
              <svg className="size-3 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : null}
            <span>{summary.percentage}% Tercapai</span>
          </span>
        </div>

        {/* Dynamic Segments Progress Bar with Legend */}
        <div
          className="h-2.5 w-full bg-[#eef1f5] rounded-full overflow-hidden flex cursor-pointer group"
          onClick={() => setShowJpBreakdown(!showJpBreakdown)}
          title="Klik untuk melihat rincian Coaching dan Mentoring"
        >
          {summary.coachingWidth > 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${summary.coachingWidth}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="h-full bg-[#0a2540] group-hover:brightness-110 transition-all"
              title={`Coaching: ${summary.coachingJp} JP`}
            />
          )}
          {summary.mentoringWidth > 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${summary.mentoringWidth}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="h-full bg-[#10b981] group-hover:brightness-110 transition-all"
              title={`Mentoring: ${summary.mentoringJp} JP`}
            />
          )}
          {summary.counselingWidth > 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${summary.counselingWidth}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              className="h-full bg-[#6366f1] group-hover:brightness-110 transition-all"
              title={`Konseling: ${summary.counselingJp} JP`}
            />
          )}
        </div>

        {/* Interactive Breakdown Accordion */}
        <AnimatePresence>
          {showJpBreakdown ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11.5px] mt-1">
                <div className="flex items-center gap-2.5 bg-white p-2 rounded-md border border-slate-200/80 shadow-2xs">
                  <span className="size-3 rounded-full bg-[#0a2540] shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[11px]">Coaching:</span>
                    <strong className="text-slate-900 font-bold text-[13px]">{summary.coachingJp} JP</strong>
                    <span className="text-slate-400 text-[10px] ml-1">(target {summary.coachingTarget} JP)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-2 rounded-md border border-slate-200/80 shadow-2xs">
                  <span className="size-3 rounded-full bg-[#10b981] shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[11px]">Mentoring:</span>
                    <strong className="text-slate-900 font-bold text-[13px]">{summary.mentoringJp} JP</strong>
                    <span className="text-slate-400 text-[10px] ml-1">(target {summary.mentoringTarget} JP)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-emerald-50/60 p-2 rounded-md border border-emerald-200/80 shadow-2xs">
                  <span
                    className={`size-3 rounded-full shrink-0 ${
                      summary.sisaJp === 0 ? "bg-emerald-600" : "bg-emerald-500"
                    }`}
                  />
                  <div>
                    <span className="text-emerald-800 block text-[11px] font-medium">Sisa Target:</span>
                    {summary.sisaJp > 0 ? (
                      <>
                        <strong className="text-emerald-900 font-bold text-[13px]">{summary.sisaJp} JP lagi</strong>
                        <span className="text-emerald-700 text-[10px] ml-1">(menuju 100%)</span>
                      </>
                    ) : (
                      <strong className="text-emerald-900 font-bold text-[13px]">Target Terpenuhi!</strong>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Context Helper with Real Data */
            <div className="flex items-center gap-1.5 text-[12.5px]">
              <svg
                className="size-3.5 text-[#067647] shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {summary.sisaJp > 0 ? (
                <>
                  <span className="font-semibold text-[#067647]">Butuh {summary.sisaJp} JP lagi</span>
                  <span className="text-[#64748b]">untuk memenuhi target pengembangan kompetensi tahunan ({summary.targetJp} JP).</span>
                </>
              ) : (
                <>
                  <span className="font-semibold text-[#067647]">Target {summary.targetJp} JP Telah Terpenuhi!</span>
                  <span className="text-[#64748b]">Seluruh target pengembangan kompetensi tahunan telah tercapai.</span>
                </>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Middle Vertical Divider */}
      <div className="w-px bg-[#eef1f5] self-stretch hidden md:block" />

      {/* Right Action Counters with Real Counts */}
      <div className="w-full md:w-[290px] shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5">
        {/* Quick Filter: Perlu Tindakan */}
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => onFilterClick("perlu_tindakan")}
          className={`flex-1 flex items-center gap-3 p-3 rounded-[11px] border transition-all text-left cursor-pointer group ${
            activeTab === "perlu_tindakan"
              ? "bg-[#fef6e7] border-amber-300 ring-2 ring-amber-400/40 shadow-xs"
              : "bg-white hover:bg-slate-50 border-[#e2e6eb] hover:border-slate-300"
          }`}
          title="Klik untuk memfilter sesi yang perlu tindakan Anda"
        >
          <div className="size-9 rounded-[8px] bg-[#fef6e7] text-[#92400e] border border-amber-200/80 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <svg
              className="size-4.5"
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
          </div>
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[16px] font-bold text-[#0f172a] leading-none">
                {displayCountPerluTindakan}
              </span>
              <span className="text-[12px] font-bold text-[#92400e]">Perlu tindakan</span>
            </div>
            <span className="text-[11.5px] text-[#64748b] mt-0.5 truncate">
              {summary.perluTindakanSubtitle}
            </span>
          </div>
          <span className="text-[11.5px] text-[#92400e] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            Filter →
          </span>
        </motion.button>

        {/* Quick Filter: Sedang Berlangsung */}
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => onFilterClick("berlangsung")}
          className={`flex-1 flex items-center gap-3 p-3 rounded-[11px] border transition-all text-left cursor-pointer group ${
            activeTab === "berlangsung"
              ? "bg-[#ecfdf3] border-emerald-300 ring-2 ring-emerald-400/40 shadow-xs"
              : "bg-white hover:bg-slate-50 border-[#e2e6eb] hover:border-slate-300"
          }`}
          title="Klik untuk memfilter sesi yang sedang berlangsung"
        >
          <div className="size-9 rounded-[8px] bg-[#ecfdf3] text-[#067647] border border-emerald-200/80 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <svg
              className="size-4.5"
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
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[16px] font-bold text-[#0f172a] leading-none">
                {displayCountBerlangsung}
              </span>
              <span className="text-[12px] font-bold text-[#067647]">Sedang berlangsung</span>
            </div>
            <span className="text-[11.5px] text-[#64748b] mt-0.5 truncate">
              {summary.berlangsungSubtitle}
            </span>
          </div>
          <span className="text-[11.5px] text-[#067647] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            Filter →
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
