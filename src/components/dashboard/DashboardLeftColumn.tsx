"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface DashboardLeftColumnProps {
  onOpenBreakdownModal: () => void;
  onOpenTokenModal: () => void;
  onCopyToken: () => void;
  copiedToken: boolean;
  pairingToken: string;
  onOpenCoachFinderModal: () => void;
}

export function DashboardLeftColumn({
  onOpenBreakdownModal,
  onOpenTokenModal,
  onCopyToken,
  copiedToken,
  pairingToken,
  onOpenCoachFinderModal,
}: DashboardLeftColumnProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5">
      {/* 1. Donut Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
        className="rounded-[14px] p-6 text-white border border-white/10 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[260px]"
        style={{
          backgroundImage:
            "linear-gradient(160deg, rgb(10, 34, 68) 0%, rgb(14, 46, 88) 100%)",
        }}
      >
        <div className="flex items-start justify-between">
          {/* Circular Donut Progress SVG */}
          <div
            className="relative size-20 shrink-0"
            role="img"
            aria-label="Progres Pembelajaran: 14 dari 20 JP (70 persen)"
          >
            <svg className="size-full -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="32"
                className="text-white/15"
                strokeWidth="7"
                stroke="currentColor"
                fill="transparent"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="32"
                className="text-cyan-400"
                strokeWidth="7"
                strokeDasharray={201}
                initial={{ strokeDashoffset: 201 }}
                animate={{ strokeDashoffset: 201 * (1 - 0.7) }}
                transition={{ duration: 1.2, delay: 0.25, ease: "easeOut" }}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-extrabold text-[17px] text-white leading-none tabular-nums">70%</span>
              <span className="text-[9px] text-cyan-200 mt-0.5">TERCAPAI</span>
            </div>
          </div>

          <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-300 bg-white/10 px-2.5 py-1 rounded-md border border-white/15">
            Target 20 JP
          </span>
        </div>

        <div className="flex flex-col gap-1 pt-4">
          <h3 className="font-extrabold text-[16.5px] text-white tracking-tight">
            Progres Pengembangan Pegawai
          </h3>
          <p className="text-[12.5px] text-white/80 leading-relaxed">
            Tambahkan <strong className="text-cyan-300 font-semibold">6 JP</strong> lagi sebelum akhir periode untuk mempertahankan indeks kompetensi predikat <em>Sangat Baik</em>.
          </p>
        </div>

        <motion.button
          type="button"
          whileHover={{ x: 2 }}
          onClick={onOpenBreakdownModal}
          className="inline-flex items-center gap-2 text-[12.5px] font-bold text-white hover:text-cyan-200 transition-colors pt-3 cursor-pointer group focus-visible:ring-2 focus-visible:ring-cyan-300 outline-none w-fit"
        >
          <span>Lihat rincian per kategori</span>
          <div className="size-5 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center border border-white/20 transition-all">
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </motion.button>
      </motion.div>

      {/* 2. Token Pairing Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
        whileHover={{ y: -2 }}
        className="bg-white border border-[#e2e6eb] rounded-[14px] p-5 shadow-xs flex flex-col gap-3 relative transition-shadow hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <h4 className="font-bold text-[#0a2244] text-[13.5px]">
              Token Pairing Aktif
            </h4>
          </div>
          <span className="bg-amber-50 text-amber-700 text-[10.5px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
            1 Menunggu
          </span>
        </div>

        <p className="text-[12.5px] text-slate-600 leading-snug">
          Sesi <strong className="font-semibold text-slate-900">Mentoring</strong> menunggu konfirmasi token dari mentor <strong className="font-semibold text-slate-900">Dr. Sari Wulandari</strong>.
        </p>

        {/* Dashed Monospace Token Box */}
        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-lg py-2.5 px-3 flex items-center justify-between">
          <span className="font-mono font-bold text-[#0a2244] text-[14px] tracking-[1.5px] tabular-nums">
            {pairingToken}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Aktif 24 jam</span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenTokenModal}
            className="h-8.5 rounded-lg bg-[#0a2244] hover:bg-[#13396b] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Lihat Detail</span>
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onCopyToken}
            className="h-8.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
          >
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>{copiedToken ? "Tersalin!" : "Salin Kode"}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* 3. Program Rekomendasi */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
        className="bg-white border border-[#e2e6eb] rounded-[14px] p-5 shadow-xs flex flex-col gap-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h4 className="font-bold text-[#0a2244] text-[13.5px]">
              Program Rekomendasi
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">BPSDM 2026</span>
        </div>

        <div className="flex flex-col gap-2.5 py-1 text-[12.5px] text-slate-700">
          <motion.button
            type="button"
            whileHover={{ x: 3 }}
            onClick={() => router.push("/sesi/baru")}
            className="p-2.5 rounded-lg hover:bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-left transition-colors cursor-pointer group"
          >
            <span className="size-2 rounded-full bg-blue-600 mt-1.5 shrink-0 group-hover:scale-125 transition-transform" />
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                Kepemimpinan Adaptif di Era Transformasi
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Bobot: 4 JP · Fungsional</span>
            </div>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ x: 3 }}
            onClick={() => router.push("/sesi/baru")}
            className="p-2.5 rounded-lg hover:bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-left transition-colors cursor-pointer group"
          >
            <span className="size-2 rounded-full bg-blue-600 mt-1.5 shrink-0 group-hover:scale-125 transition-transform" />
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                Inovasi Layanan Transportasi Publik
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Bobot: 3 JP · Teknis</span>
            </div>
          </motion.button>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenCoachFinderModal}
          className="w-full h-9 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs transition-colors cursor-pointer shadow-2xs focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
        >
          Lihat Semua Program &amp; Modul →
        </motion.button>
      </motion.div>
    </div>
  );
}
