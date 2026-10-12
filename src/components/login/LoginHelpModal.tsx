"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoginHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  copiedEmail: boolean;
  onCopyEmail: () => void;
}

export function LoginHelpModal({
  isOpen,
  onClose,
  copiedEmail,
  onCopyEmail,
}: LoginHelpModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="helpdesk-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative w-full max-w-[440px] bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 flex flex-col gap-4.5 z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 id="helpdesk-title" className="text-sm font-bold text-slate-900">
                  Bantuan Akses Akun CMC
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup jendela"
                className="size-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Jika akun SIK belum aktif atau terjadi kendala sinkronisasi SIASN BKN, hubungi tim administrasi BPSDM:
            </p>

            <div className="flex flex-col gap-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-800">Email Helpdesk</div>
                  <div className="text-slate-500 font-mono text-[11px]">layanan.cmc@dephub.go.id</div>
                </div>
                <button
                  type="button"
                  onClick={onCopyEmail}
                  className="px-2.5 py-1 rounded-md bg-[#081830] text-white font-semibold text-[11px] hover:bg-sky-950 transition-colors cursor-pointer"
                >
                  {copiedEmail ? "Tersalin!" : "Salin"}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-800">Biro Kepegawaian Kemenhub</div>
                  <div className="text-slate-500 text-[11px]">Gedung Karsa Lt. 6 Jakarta Pusat</div>
                </div>
                <span className="text-[11px] text-slate-600 font-mono">Ext. 1422</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer mt-1"
            >
              Tutup
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
