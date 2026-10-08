"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function DashboardActionModal({
  isOpen,
  onClose,
  onSubmit,
}: DashboardActionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="action-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 id="action-modal-title" className="font-bold text-slate-900 text-sm">
                Lengkapi Catatan Komitmen Coaching
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="size-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed">
              Catatan hasil sesi bersama <strong>Rudi Santoso, M.M.</strong> akan tersinkronisasi langsung ke Portofolio Kinerja ASN pada modul SIASN BPSDM Perhubungan.
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-800">Komitmen Rencana Aksi Kerja</label>
                <textarea
                  rows={3}
                  defaultValue="Menerapkan SOP evaluasi pelayanan terpadu dan koordinasi lintas unit kerja transportasi darat."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs leading-relaxed focus:ring-2 focus:ring-blue-600 outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-800">Tenggat Waktu Implementasi</label>
                <input
                  type="date"
                  defaultValue="2026-11-01"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0a2244] hover:bg-[#13396b] text-white font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  Simpan &amp; Verifikasi ke SIASN
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
