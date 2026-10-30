"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  pairingToken: string;
  copiedToken: boolean;
  onCopyToken: () => void;
}

export function DashboardTokenModal({
  isOpen,
  onClose,
  pairingToken,
  copiedToken,
  onCopyToken,
}: DashboardTokenModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="token-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h3 id="token-modal-title" className="font-bold text-slate-900 text-sm">
                  Token Pairing Sesi Mentoring
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup Modal"
                className="size-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed">
              Berikan token unik ini kepada mentor Anda (<strong>Dr. Sari Wulandari</strong>) untuk memvalidasi dan mencatatkan jam pembelajaran (JP) secara resmi ke pangkalan data SIASN BKN.
            </div>

            {/* Token display box */}
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-4 text-center flex flex-col items-center gap-1.5">
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-widest">
                Kode Autentikasi Pairing
              </span>
              <span className="font-mono font-extrabold text-xl sm:text-2xl text-[#0a2244] tracking-[3px] tabular-nums">
                {pairingToken}
              </span>
              <span className="text-[11px] text-emerald-700 font-medium">
                ● Masa berlaku: 23 jam 45 menit
              </span>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={onCopyToken}
                className="flex-1 py-2.5 rounded-xl bg-[#0a2244] hover:bg-[#13396b] text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
              >
                {copiedToken ? "✓ Kode Tersalin!" : "Salin Kode Token"}
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
