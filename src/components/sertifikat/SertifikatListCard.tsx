"use client";

import { motion, type Variants } from "framer-motion";
import { CertificateItem } from "@/lib/certificateData";

interface SertifikatListCardProps {
  cert: CertificateItem;
  variants?: Variants;
  onSelect: (cert: CertificateItem) => void;
  onDownload: (cert: CertificateItem) => void;
  onCopyLink: (cert: CertificateItem) => void;
  isCopied: boolean;
}

export default function SertifikatListCard({
  cert,
  variants,
  onSelect,
  onDownload,
  onCopyLink,
  isCopied,
}: SertifikatListCardProps) {
  const isKumulatif = cert.category === "kumulatif";
  const isCoaching = cert.category === "coaching";

  return (
    <motion.div
      layout
      variants={variants}
      className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div
          className={`size-12 rounded-xl flex flex-col items-center justify-center font-black text-xs shrink-0 shadow-2xs border ${
            isKumulatif
              ? "bg-amber-100 text-amber-900 border-amber-300"
              : isCoaching
              ? "bg-blue-50 text-blue-700 border-blue-200"
              : "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}
        >
          <span>{cert.jp}</span>
          <span className="text-[9px] font-bold">JP</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="font-mono text-[11.5px] text-slate-600 font-medium">
              {cert.certNumber}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500">{cert.issueDate}</span>
            <span className="text-slate-300">·</span>
            <span className="font-semibold text-emerald-700 inline-flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              <span>BSrE Valid</span>
            </span>
          </div>

          <h3
            onClick={() => onSelect(cert)}
            className="font-bold text-slate-900 text-sm sm:text-base hover:text-blue-700 cursor-pointer transition-colors"
          >
            {cert.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>
              {cert.coachOrMentor.role}:{" "}
              <strong className="text-slate-700">
                {cert.coachOrMentor.name}
              </strong>
            </span>
            <span>·</span>
            <span className="text-slate-500 font-medium">
              {cert.categoryLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end md:self-center shrink-0">
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(cert)}
          className="h-8.5 px-3.5 rounded-lg bg-[#0a2540] hover:bg-[#13396b] text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          Lihat
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => onDownload(cert)}
          className="h-8.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
        >
          PDF
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => onCopyLink(cert)}
          className="size-8.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
          title="Salin Tautan"
        >
          {isCopied ? "✓" : "🔗"}
        </motion.button>
      </div>
    </motion.div>
  );
}
