"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { CertificateItem } from "@/lib/certificateData";

interface SertifikatGridCardProps {
  cert: CertificateItem;
  variants?: Variants;
  onSelect: (cert: CertificateItem) => void;
  onDownload: (cert: CertificateItem) => void;
  onCopyLink: (cert: CertificateItem) => void;
  isDownloading: boolean;
  isCopied: boolean;
}

export default function SertifikatGridCard({
  cert,
  variants,
  onSelect,
  onDownload,
  onCopyLink,
  isDownloading,
  isCopied,
}: SertifikatGridCardProps) {
  const isKumulatif = cert.category === "kumulatif";
  const isCoaching = cert.category === "coaching";

  return (
    <motion.article
      layout
      variants={variants}
      whileHover={{ y: -2, transition: { duration: 0.2, ease: "easeOut" } }}
      className={`group relative bg-white rounded-2xl border transition-shadow duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg ${
        isKumulatif
          ? "md:col-span-2 lg:col-span-3 border-amber-300/80 ring-1 ring-amber-300/30"
          : isCoaching
          ? "border-slate-200/90 hover:border-blue-300/80"
          : "border-slate-200/90 hover:border-emerald-300/80"
      }`}
    >
      {/* Plaque Header / Credential Folio Preview */}
      <div
        onClick={() => onSelect(cert)}
        className={`relative p-5 text-white cursor-pointer overflow-hidden transition-colors ${
          isKumulatif
            ? "bg-gradient-to-br from-[#071d37] via-[#0c2f58] to-[#124174] pb-6"
            : isCoaching
            ? "bg-gradient-to-br from-[#092244] via-[#0e325d] to-[#124275] pb-5"
            : "bg-gradient-to-br from-[#04281f] via-[#073c30] to-[#0a5241] pb-5"
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute right-2 -bottom-6 opacity-10 pointer-events-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/febee0dc3de182eb1dae3bdcc158fb031a384cb9.svg"
            alt=""
            className="w-36 h-36 object-contain"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute -top-10 -left-10 size-40 rounded-full opacity-30 pointer-events-none"
          style={{
            backgroundImage: isKumulatif
              ? "radial-gradient(circle, #f59e0b 0%, transparent 70%)"
              : isCoaching
              ? "radial-gradient(circle, #3b82f6 0%, transparent 70%)"
              : "radial-gradient(circle, #10b981 0%, transparent 70%)",
          }}
        />

        <div className="absolute inset-2 border border-white/10 rounded-xl pointer-events-none" />

        {/* Plaque Header: Seal, Clean Category Text, JP Badge */}
        <div className="relative z-10 flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <div
              className={`size-7 rounded-lg flex items-center justify-center font-bold text-[10px] tracking-widest shadow-2xs border ${
                isKumulatif
                  ? "bg-amber-400 text-[#0a2244] border-amber-300 font-extrabold"
                  : isCoaching
                  ? "bg-blue-600 text-white border-blue-400/40"
                  : "bg-emerald-600 text-white border-emerald-400/40"
              }`}
            >
              CMC
            </div>

            <span
              className={`text-[11px] font-bold tracking-wider uppercase ${
                isKumulatif
                  ? "text-amber-300"
                  : isCoaching
                  ? "text-blue-200"
                  : "text-emerald-200"
              }`}
            >
              {cert.categoryLabel}
            </span>
          </div>

          <div
            className={`px-2.5 py-1 rounded-md text-xs font-extrabold flex items-center gap-1 ${
              isKumulatif
                ? "bg-amber-400 text-slate-950 font-black"
                : "bg-white/20 text-white backdrop-blur-xs"
            }`}
          >
            <span>{cert.jp} JP</span>
          </div>
        </div>

        {/* Serial Number & BSrE Status */}
        <div className="relative z-10 flex items-center gap-2 mb-2 text-[11px]">
          <span className="font-mono text-white/75 font-medium tracking-wide">
            {cert.certNumber}
          </span>
          <span className="text-white/40">·</span>
          <span className="text-emerald-300 font-medium inline-flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span>BSrE Valid</span>
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="relative z-10">
          <h3 className="font-bold text-[16px] sm:text-[17px] text-white leading-snug group-hover:text-amber-200 transition-colors">
            {cert.title}
          </h3>
          <p className="text-[11.5px] text-white/75 mt-1 line-clamp-2 leading-relaxed">
            {cert.subtitle}
          </p>
        </div>
      </div>

      {/* Metadata Lower Half */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4 bg-white">
        {isKumulatif && cert.modules && (
          <div className="p-3.5 bg-amber-50/70 rounded-xl">
            <div className="text-[11.5px] font-bold text-amber-950 mb-2 flex items-center justify-between">
              <span>Akumulasi 5 Program Terakreditasi:</span>
              <span className="font-extrabold text-amber-900">14 JP Tuntas</span>
            </div>
            <div className="space-y-1.5 text-xs">
              {cert.modules.slice(0, 3).map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-[11.5px] text-slate-700"
                >
                  <span className="truncate pr-2">• {m.name}</span>
                  <span className="font-semibold text-slate-900 shrink-0">
                    {m.jp} JP
                  </span>
                </div>
              ))}
            </div>
            {cert.modules.length > 3 && (
              <div className="text-[11px] text-amber-800 font-semibold mt-2">
                + {cert.modules.length - 3} modul kompetensi lainnya tertera dalam transkrip →
              </div>
            )}
          </div>
        )}

        {/* Domain Kompetensi (Clean Typography instead of Pill Clutter) */}
        <div className="text-[12px] leading-relaxed text-slate-600">
          <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block mb-1">
            Fokus Kompetensi:
          </span>
          <span className="font-medium text-slate-700">
            {cert.competencyTags.join(" · ")}
          </span>
        </div>

        {/* Coach / Mentor & Issue Date */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="size-7 rounded-full bg-[#0a2540] text-white flex items-center justify-center font-bold text-[10px] shrink-0 shadow-2xs">
              {cert.coachOrMentor.avatarInitials}
            </div>
            <div className="truncate">
              <span className="text-[10px] text-slate-400 block leading-tight">
                {cert.coachOrMentor.role}:
              </span>
              <strong className="text-slate-900 text-[12px] truncate">
                {cert.coachOrMentor.name}
              </strong>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] text-slate-400 block leading-tight">
              Tanggal Terbit:
            </span>
            <span className="text-[11px] font-medium text-slate-700">
              {cert.issueDate}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons Dock */}
      <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2.5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(cert)}
          className="flex-1 h-9 px-3 rounded-lg bg-[#0a2540] hover:bg-[#13396b] text-white text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <svg
            className="size-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span>Lihat Sertifikat</span>
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => onDownload(cert)}
          disabled={isDownloading}
          className="size-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer transition-colors shrink-0 disabled:opacity-50 shadow-2xs"
          title="Unduh Berkas PDF Resmi"
        >
          {isDownloading ? (
            <div className="size-3.5 border-2 border-slate-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          )}
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => onCopyLink(cert)}
          className="size-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer transition-colors shrink-0 shadow-2xs"
          title="Salin Tautan Kredensial Resmi"
        >
          <AnimatePresence mode="wait">
            {isCopied ? (
              <motion.svg
                key="copied"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="size-4 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </motion.svg>
            ) : (
              <motion.svg
                key="link"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="size-4 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.article>
  );
}
