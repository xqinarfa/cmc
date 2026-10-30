"use client";

import { motion, AnimatePresence } from "framer-motion";

interface CatatSuccessModalProps {
  isOpen: boolean;
  pertemuanKe: number;
  onClose: () => void;
  onBackToDetail: () => void;
}

export default function CatatSuccessModal({
  isOpen,
  pertemuanKe,
  onClose,
  onBackToDetail,
}: CatatSuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <div className="fixed inset-0" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col items-center text-center gap-5 z-10"
          >
            <div className="size-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="font-bold text-[#0f172a] text-lg">
                Pertemuan #{pertemuanKe} Berhasil Dicatat!
              </h3>
              <p className="text-xs text-[#64748b] leading-relaxed max-w-[340px]">
                Catatan pertemuan telah disimpan dan notifikasi verifikasi telah dikirimkan ke Coach Rudi Santoso, M.M. serta Atasan Langsung.
              </p>
            </div>

            <div className="w-full p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 flex flex-col items-center gap-1">
              <span className="text-xs text-emerald-800 font-semibold">
                Potensi Penambahan Jam Pelajaran
              </span>
              <span className="text-xl font-extrabold text-[#067647]">
                + 2 JP
              </span>
              <span className="text-[11px] text-emerald-700">
                Akan tercatat resmi setelah Atasan Langsung memverifikasi.
              </span>
            </div>

            <div className="w-full flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onBackToDetail}
                className="w-full h-10 rounded-lg bg-[#0a2540] hover:bg-[#13396b] text-white text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              >
                Kembali ke Detail Sesi
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
