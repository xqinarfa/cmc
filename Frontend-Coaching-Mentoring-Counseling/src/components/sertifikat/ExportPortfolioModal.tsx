"use client";

import { motion } from "framer-motion";
import { USER_RECIPIENT } from "@/lib/certificateData";

interface ExportPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export default function ExportPortfolioModal({
  isOpen,
  onClose,
  onDownload,
}: ExportPortfolioModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-sm">
            Unduh Berkas Portofolio Lengkap
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="size-7 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Anda akan mengunduh seluruh dokumen kredensial digital resmi atas nama{" "}
          <strong>{USER_RECIPIENT.name}</strong>, mencakup 1 Sertifikat Siklus
          Kumulatif, 5 Sertifikat Sesi, serta Buku Transkrip Capaian 14 JP.
        </p>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Sertifikat Siklus Pembelajaran Terpadu 2024 (PDF)</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>5 Berkas Sertifikat Sesi Coaching &amp; Mentoring (PDF)</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Transkrip Resmi Rekapitulasi Capaian JP SIASN (PDF)</span>
          </label>
        </div>

        <div className="flex gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
          >
            Batal
          </button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={onDownload}
            className="flex-1 py-2.5 rounded-xl bg-[#0a2540] hover:bg-[#13396b] text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
          >
            Unduh Paket (.ZIP)
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
