"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FinishSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function FinishSessionModal({ isOpen, onClose, onConfirm }: FinishSessionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
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
            className="relative z-10 bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200"
          >
            <div className="p-6 text-center">
              <div className="size-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-[#0f172a] text-lg">Tandai Sesi Selesai?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Setelah sesi ditandai selesai, status akan diperbarui menjadi <strong>Selesai</strong>.
                Seluruh catatan pertemuan yang terverifikasi akan direkapitulasi secara otomatis ke portofolio
                pengembangan kompetensi dan SIASN.
              </p>
            </div>

            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="h-9 px-4 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="h-9 px-4 rounded-lg bg-[#0a2540] text-white text-xs font-semibold hover:bg-[#13396b] cursor-pointer"
              >
                Ya, Selesaikan Sesi
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
