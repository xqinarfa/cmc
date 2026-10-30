"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoginPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginPrivacyModal({ isOpen, onClose }: LoginPrivacyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-title"
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
            className="relative w-full max-w-[460px] bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 flex flex-col gap-4.5 z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 id="privacy-title" className="text-sm font-bold text-slate-900">
                  Kerahasiaan &amp; Privasi Data ASN
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

            <div className="text-xs text-slate-600 leading-relaxed flex flex-col gap-3">
              <p>
                Platform CMC mematuhi standar perlindungan data aparatur sesuai <strong className="text-slate-800">UU No. 27/2022 (PDP)</strong> dan pedoman pembinaan ASN Kementerian Perhubungan.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-700">
                <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-600" />
                  Konfidensialitas Sesi Konseling
                </div>
                <p className="text-[11.5px] leading-relaxed text-slate-500">
                  Seluruh percakapan dan catatan sesi konseling bersifat rahasia profesional antara pegawai dan psikolog klinis tersertifikasi.
                </p>
              </div>

              <p className="text-[11.5px] text-slate-500">
                Data jam pelajaran (JP) disinkronkan secara aman ke Sistem Informasi Kepegawaian (SIK) dan SIASN BKN untuk pemenuhan hak 20 JP per tahun.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-[#081830] hover:bg-[#12284c] text-white text-xs font-bold transition-colors cursor-pointer mt-1"
            >
              Saya Mengerti
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
