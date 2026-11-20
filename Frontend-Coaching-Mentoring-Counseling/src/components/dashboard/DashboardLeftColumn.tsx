"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { JpProgressSummary, calculateJpSummary } from "@/lib/jpCalculations";
import { fetchSessions } from "@/lib/api";

interface DashboardLeftColumnProps {
  onOpenBreakdownModal: () => void;
  onOpenTokenModal: () => void;
  onCopyToken: () => void;
  copiedToken: boolean;
  pairingToken: string;
  onOpenCoachFinderModal: () => void;
  sessions?: any[];
  jpSummary?: JpProgressSummary;
}

export function DashboardLeftColumn({
  onOpenBreakdownModal,
  onOpenTokenModal,
  onCopyToken,
  copiedToken,
  pairingToken,
  onOpenCoachFinderModal,
  sessions: initialSessions,
  jpSummary: initialSummary,
}: DashboardLeftColumnProps) {
  const router = useRouter();
  const [loadedSessions, setLoadedSessions] = useState<any[]>(initialSessions || []);

  useEffect(() => {
    if (initialSessions && initialSessions.length > 0) {
      setLoadedSessions(initialSessions);
      return;
    }

    let isMounted = true;
    async function loadData() {
      try {
        const data = await fetchSessions();
        if (isMounted && data && Array.isArray(data)) {
          setLoadedSessions(data);
        }
      } catch {}
    }
    loadData();

    return () => {
      isMounted = false;
    };
  }, [initialSessions]);

  const summary = initialSummary || calculateJpSummary(loadedSessions);

  // Find active pending session with token from real sessions
  const pendingSessionWithToken = loadedSessions.find(
    (s: any) =>
      s.token &&
      (s.status === "pending" ||
        s.status === "menunggu_konfirmasi" ||
        s.status === "dikembalikan" ||
        s.status === "active" ||
        s.status === "berlangsung"),
  );

  const displayToken =
    pendingSessionWithToken?.token || pairingToken || "CMC-4821-7X9A";

  const sessionTypeLabel =
    pendingSessionWithToken?.type === "mentoring" ||
    pendingSessionWithToken?.category === "Mentoring"
      ? "Mentoring"
      : pendingSessionWithToken?.type === "counseling" ||
        pendingSessionWithToken?.category === "Counseling"
      ? "Konseling"
      : "Coaching";

  const mentorName =
    pendingSessionWithToken?.mentor ||
    pendingSessionWithToken?.mentorOrCoachName ||
    pendingSessionWithToken?.practitioner?.full_name ||
    "Coach/Mentor";

  const hasPending = Boolean(pendingSessionWithToken);

  return (
    <div className="flex flex-col gap-5">
      {/* 1. Donut Progress Card with Real JP Data */}
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
            aria-label={`Progres Pembelajaran: ${summary.totalJp} dari ${summary.targetJp} JP (${summary.percentage} persen)`}
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
                animate={{
                  strokeDashoffset: 201 * (1 - summary.percentage / 100),
                }}
                transition={{ duration: 1.2, delay: 0.25, ease: "easeOut" }}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-extrabold text-[17px] text-white leading-none tabular-nums">
                {summary.percentage}%
              </span>
              <span className="text-[9px] text-cyan-200 mt-0.5 font-bold tracking-wider">
                {summary.percentage >= 100 ? "LENGKAP" : "TERCAPAI"}
              </span>
            </div>
          </div>

          <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-300 bg-white/10 px-2.5 py-1 rounded-md border border-white/15">
            Target {summary.targetJp} JP
          </span>
        </div>

        <div className="flex flex-col gap-1 pt-4">
          <h3 className="font-extrabold text-[16.5px] text-white tracking-tight">
            Progres Pengembangan Pegawai
          </h3>
          <p className="text-[12.5px] text-white/80 leading-relaxed">
            {summary.sisaJp > 0 ? (
              <>
                Tambahkan{" "}
                <strong className="text-cyan-300 font-semibold">
                  {summary.sisaJp} JP
                </strong>{" "}
                lagi sebelum akhir periode untuk mempertahankan indeks kompetensi
                predikat <em>Sangat Baik</em>.
              </>
            ) : (
              <>
                Target tahunan{" "}
                <strong className="text-cyan-300 font-semibold">
                  {summary.targetJp} JP
                </strong>{" "}
                telah terpenuhi! Indeks kompetensi pegawai mencapai predikat{" "}
                <em>Sangat Baik</em>.
              </>
            )}
          </p>
        </div>

        <motion.button
          type="button"
          whileHover={{ x: 2 }}
          onClick={onOpenBreakdownModal}
          className="inline-flex items-center gap-2 text-[12.5px] font-bold text-white hover:text-cyan-200 transition-colors pt-3 cursor-pointer group focus-visible:ring-2 focus-visible:ring-cyan-300 outline-none w-fit"
        >
          <span>Lihat rincian per kategori ({summary.totalJp}/{summary.targetJp} JP)</span>
          <div className="size-5 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center border border-white/20 transition-all">
            <svg
              className="w-2.5 h-2.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </motion.button>
      </motion.div>

      {/* 2. Token Pairing Card with Real Session Token */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
        whileHover={{ y: -2 }}
        className="bg-white border border-[#e2e6eb] rounded-[14px] p-5 shadow-xs flex flex-col gap-3 relative transition-shadow hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`size-2 rounded-full ${
                hasPending ? "bg-emerald-500 animate-pulse" : "bg-blue-500"
              }`}
            />
            <h4 className="font-bold text-[#0a2244] text-[13.5px]">
              {hasPending ? "Token Pairing Aktif" : "Token Pairing"}
            </h4>
          </div>
          <span
            className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full border ${
              hasPending
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-slate-100 text-slate-600 border-slate-200"
            }`}
          >
            {hasPending
              ? summary.countPerluTindakan > 0
                ? `${summary.countPerluTindakan} Menunggu`
                : "1 Aktif"
              : "Siap Digunakan"}
          </span>
        </div>

        <p className="text-[12.5px] text-slate-600 leading-snug">
          {hasPending ? (
            <>
              Sesi{" "}
              <strong className="font-semibold text-slate-900">
                {sessionTypeLabel}
              </strong>{" "}
              menunggu konfirmasi token dari{" "}
              {sessionTypeLabel.toLowerCase() === "mentoring" ? "mentor" : "coach"}{" "}
              <strong className="font-semibold text-slate-900">
                {mentorName}
              </strong>
              .
            </>
          ) : (
            <>
              Token pairing digunakan untuk mencatatkan dan memvalidasi sesi Coaching atau Mentoring ke pangkalan data SIASN.
            </>
          )}
        </p>

        {/* Dashed Monospace Token Box */}
        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-lg py-2.5 px-3 flex items-center justify-between">
          <span className="font-mono font-bold text-[#0a2244] text-[14px] tracking-[1.5px] tabular-nums">
            {displayToken}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            {hasPending ? "Aktif" : "Kode Sesi"}
          </span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (pendingSessionWithToken?.id) {
                router.push(`/sesi/detail/${pendingSessionWithToken.id}`);
              } else {
                onOpenTokenModal();
              }
            }}
            className="h-8.5 rounded-lg bg-[#0a2244] hover:bg-[#13396b] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
          >
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>Lihat Detail</span>
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (
                typeof window !== "undefined" &&
                typeof navigator !== "undefined" &&
                navigator.clipboard?.writeText &&
                displayToken
              ) {
                navigator.clipboard.writeText(displayToken);
              }
              onCopyToken();
            }}
            className="h-8.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
          >
            <svg
              className="w-3.5 h-3.5 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>{copiedToken ? "Tersalin!" : "Salin Kode"}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* 3. Program Rekomendasi BPSDM */}
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
            onClick={() => router.push("/sesi/baru?tipe=coaching")}
            className="p-2.5 rounded-lg hover:bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-left transition-colors cursor-pointer group"
          >
            <span className="size-2 rounded-full bg-blue-600 mt-1.5 shrink-0 group-hover:scale-125 transition-transform" />
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                Coaching: Kepemimpinan &amp; Transformasi Layanan
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                1 Pertemuan = 2 JP · Maks. 2/bulan
              </span>
            </div>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ x: 3 }}
            onClick={() => router.push("/sesi/baru?tipe=mentoring")}
            className="p-2.5 rounded-lg hover:bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-left transition-colors cursor-pointer group"
          >
            <span className="size-2 rounded-full bg-emerald-600 mt-1.5 shrink-0 group-hover:scale-125 transition-transform" />
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Mentoring: Pengembangan Karier &amp; Talenta ASN
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                1 Pertemuan = 2 JP · Maks. 2/bulan
              </span>
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
          Lihat Semua Mentor &amp; Coach →
        </motion.button>
      </motion.div>
    </div>
  );
}
