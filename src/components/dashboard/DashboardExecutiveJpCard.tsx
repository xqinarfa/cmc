"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardExecutiveJpCardProps {
  showJpBreakdown: boolean;
  onToggleJpBreakdown: () => void;
}

export function DashboardExecutiveJpCard({
  showJpBreakdown,
  onToggleJpBreakdown,
}: DashboardExecutiveJpCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="bg-white border border-[#e2e6eb] rounded-[14px] p-5.5 shadow-[0px_12px_24px_rgba(0,0,0,0.06)] flex flex-col md:flex-row items-center gap-6 w-full relative transition-all"
    >
      {/* Left Progress Section */}
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
            onClick={onToggleJpBreakdown}
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

        {/* Numbers: 14 / 20 JP with 70% Badge */}
        <div className="flex items-baseline gap-2">
          <span className="text-[34px] font-extrabold text-[#0f172a] leading-none tracking-[-1px]">
            14
          </span>
          <span className="text-[22px] text-[#94a3b8] font-light">/</span>
          <span className="text-[20px] font-semibold text-[#64748b]">20</span>
          <span className="text-[13.5px] font-semibold text-[#64748b] ml-0.5">JP</span>
          <span className="ml-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[11.5px] border border-emerald-200/80 inline-flex items-center gap-1">
            <svg className="size-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>70% Tercapai</span>
          </span>
        </div>

        {/* Dual Segments Progress Bar */}
        <div
          className="h-2.5 w-full bg-[#eef1f5] rounded-full overflow-hidden flex cursor-pointer group"
          onClick={onToggleJpBreakdown}
          title="Klik untuk melihat rincian Coaching dan Mentoring"
        >
          <motion.div
            className="h-full bg-[#0a2540] group-hover:brightness-110"
            initial={{ width: 0 }}
            animate={{ width: "30%" }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          />
          <motion.div
            className="h-full bg-[#10b981] group-hover:brightness-110"
            initial={{ width: 0 }}
            animate={{ width: "40%" }}
            transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
          />
        </div>

        {/* Interactive Breakdown Accordion */}
        <AnimatePresence mode="wait">
          {showJpBreakdown ? (
            <motion.div
              key="breakdown-open"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11.5px] overflow-hidden"
            >
              <div className="flex items-center gap-2.5 bg-white p-2 rounded-md border border-slate-200/80 shadow-2xs">
                <span className="size-3 rounded-full bg-[#0a2540] shrink-0" />
                <div>
                  <span className="text-slate-500 block text-[11px]">Coaching:</span>
                  <strong className="text-slate-900 font-bold text-[13px]">6 JP</strong>
                  <span className="text-slate-400 text-[10px] ml-1">(target 10 JP)</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 bg-white p-2 rounded-md border border-slate-200/80 shadow-2xs">
                <span className="size-3 rounded-full bg-[#10b981] shrink-0" />
                <div>
                  <span className="text-slate-500 block text-[11px]">Mentoring:</span>
                  <strong className="text-slate-900 font-bold text-[13px]">8 JP</strong>
                  <span className="text-slate-400 text-[10px] ml-1">(target 10 JP)</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 bg-emerald-50/60 p-2 rounded-md border border-emerald-200/80 shadow-2xs">
                <span className="size-3 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <span className="text-emerald-800 block text-[11px] font-medium">Sisa Target:</span>
                  <strong className="text-emerald-900 font-bold text-[13px]">6 JP lagi</strong>
                  <span className="text-emerald-700 text-[10px] ml-1">(menuju 100%)</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="breakdown-closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 text-[12.5px]"
            >
              <svg
                className="size-3.5 text-[#067647] shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold text-[#067647]">Butuh 6 JP lagi</span>
              <span className="text-[#64748b]">untuk memenuhi target pengembangan kompetensi tahunan.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Middle Vertical Divider */}
      <div className="w-px bg-[#eef1f5] self-stretch hidden md:block" />

      {/* Right Action Counters */}
      <div className="w-full md:w-[290px] shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5">
        {/* Link to Sesi Perlu Tindakan */}
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="flex-1">
          <Link
            href="/sesi"
            className="flex items-center gap-3 p-3 rounded-[11px] border border-[#e2e6eb] hover:border-slate-300 bg-white hover:bg-slate-50 transition-all text-left cursor-pointer group no-underline h-full"
            title="Lihat sesi yang perlu tindakan di halaman Sesi"
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
                  2
                </span>
                <span className="text-[12px] font-bold text-[#92400e]">Perlu tindakan</span>
              </div>
              <span className="text-[11.5px] text-[#64748b] mt-0.5">1 konfirmasi · 1 revisi</span>
            </div>
            <span className="text-[11.5px] text-[#92400e] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              Lihat →
            </span>
          </Link>
        </motion.div>

        {/* Link to Sesi Berlangsung */}
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="flex-1">
          <Link
            href="/sesi"
            className="flex items-center gap-3 p-3 rounded-[11px] border border-[#e2e6eb] hover:border-slate-300 bg-white hover:bg-slate-50 transition-all text-left cursor-pointer group no-underline h-full"
            title="Lihat sesi aktif di halaman Sesi"
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
                  1
                </span>
                <span className="text-[12px] font-bold text-[#067647]">Sedang berlangsung</span>
              </div>
              <span className="text-[11.5px] text-[#64748b] mt-0.5">Pertemuan 2 berikutnya</span>
            </div>
            <span className="text-[11.5px] text-[#067647] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              Lihat →
            </span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
