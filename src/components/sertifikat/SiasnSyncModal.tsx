"use client";

import { motion } from "framer-motion";
import { CertificateItem } from "@/lib/certificateData";

interface SiasnSyncModalProps {
  cert: CertificateItem | null;
  onClose: () => void;
}

export default function SiasnSyncModal({
  cert,
  onClose,
}: SiasnSyncModalProps) {
  if (!cert) return null;

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
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <svg
                className="size-4"
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
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Status Sinkronisasi SIASN BKN
              </h3>
              <p className="text-[11px] text-slate-500">{cert.certNumber}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="size-7 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center gap-2.5">
            <span className="text-emerald-600 text-base">✓</span>
            <div>
              <span className="font-bold block">Telah Tersinkronisasi Otomatis</span>
              <span className="text-[11px] text-emerald-700">
                Poin kompetensi telah tercatat pada Riwayat Diklat/Pengembangan
                Kompetensi SIASN.
              </span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Transaction ID:</span>
              <span className="text-slate-900 font-bold">
                {cert.siasnTransactionId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Waktu Sinkron:</span>
              <span className="text-slate-700">{cert.siasnSyncTimestamp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Bobot Terkredit:</span>
              <span className="text-blue-700 font-bold">
                {cert.jp} Jam Pelajaran (JP)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Kategori SKP:</span>
              <span className="text-slate-700">
                Pengembangan Non-Klasikal Mandiri
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#0a2540] text-white text-xs font-semibold cursor-pointer hover:bg-[#13396b] transition-colors"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
