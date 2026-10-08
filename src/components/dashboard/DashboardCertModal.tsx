"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardCertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export function DashboardCertModal({
  isOpen,
  onClose,
  onDownload,
}: DashboardCertModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="relative w-full max-w-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                  </svg>
                </div>
                <h3 id="cert-modal-title" className="font-bold text-slate-900 text-sm">
                  Sertifikat Pengembangan Kompetensi
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="size-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Certificate Preview Card */}
            <div className="p-5 rounded-xl border border-slate-200 bg-linear-to-br from-slate-50 to-blue-50/40 flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-[11px] font-bold text-[#0a2244] uppercase tracking-wider">
                  BPSDM Perhubungan RI
                </span>
                <span className="text-[10px] font-mono text-slate-400">SER/CMC/2026/0942</span>
              </div>

              <div className="text-center py-2 flex flex-col gap-1">
                <span className="text-[11px] text-slate-500 uppercase">Diberikan Kepada:</span>
                <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                  ANDI PRATAMA, S.Si.T.
                </span>
                <span className="text-xs text-slate-600">
                  Telah menyelesaikan 14 Jam Pelajaran Program Pengembangan Mandiri Siklus 2026
                </span>
              </div>

              <div className="flex items-center justify-between text-[10.5px] text-slate-500 pt-2 border-t border-slate-200/80">
                <span>Tanda Tangan Digital BSrE</span>
                <span className="font-bold text-emerald-700">✓ Tervalidasi</span>
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={onDownload}
                className="flex-1 py-2.5 rounded-xl bg-[#0a2244] hover:bg-[#13396b] text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Unduh Berkas PDF Resmi</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
