"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CancelSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function CancelSessionModal({ isOpen, onClose, onConfirm }: CancelSessionModalProps) {
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
            className="relative z-10 bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-200"
          >
            <div className="p-6 text-center">
              <div className="size-12 rounded-full bg-red-100 text-[#b42318] flex items-center justify-center mx-auto mb-4">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-[#0f172a] text-base">Batalkan Sesi Ini?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Tindakan ini akan membatalkan sesi coaching dan menonaktifkan token pairing. Seluruh
                data pertemuan yang belum diverifikasi tidak akan diproses.
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
                className="h-9 px-4 rounded-lg bg-[#b42318] text-white text-xs font-semibold hover:bg-red-700 cursor-pointer"
              >
                Batalkan Sesi
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
