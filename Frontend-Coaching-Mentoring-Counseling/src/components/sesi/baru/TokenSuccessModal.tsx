"use client";

import { motion, AnimatePresence } from "framer-motion";

interface TokenSuccessModalProps {
  isOpen: boolean;
  token: string;
  copied: boolean;
  onCopyToken: () => void;
  onClose: () => void;
  onBackToHome: () => void;
}

export default function TokenSuccessModal({
  isOpen,
  token,
  copied,
  onCopyToken,
  onClose,
  onBackToHome,
}: TokenSuccessModalProps) {
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
            {/* Success Icon */}
            <div className="size-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="font-bold text-[#0f172a] text-lg">
                Sesi Berhasil Dibuat!
              </h3>
              <p className="text-xs text-[#64748b] leading-relaxed max-w-[340px]">
                Bagikan kode token pairing ini kepada Coach/Mentor Anda untuk mengonfirmasi dan memulai sesi pendampingan.
              </p>
            </div>

            {/* Token Card */}
            <div className="w-full p-4 rounded-xl border border-dashed border-[#0a2540] bg-[#f5f8fc] flex flex-col items-center gap-2.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Kode Token Pairing
              </span>
              <span className="font-mono text-2xl font-extrabold text-[#0a2540] tracking-widest select-all">
                {token}
              </span>
              <button
                type="button"
                onClick={onCopyToken}
                className="mt-1 px-4 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-emerald-700 font-bold">Kode Tersalin!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>Salin Kode Token</span>
                  </>
                )}
              </button>
            </div>

            {/* Info Box */}
            <div className="w-full bg-slate-50 border border-slate-100 rounded-lg p-3 text-left flex items-start gap-2.5 text-[11.5px] text-[#64748b]">
              <svg className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>
                Notifikasi otomatis telah dikirimkan ke <strong className="font-semibold text-slate-800">Dr. Budi Hartono, M.Si.</strong> (Atasan Langsung) dan Coach/Mentor terkait.
              </span>
            </div>

            {/* Actions */}
            <div className="w-full flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onBackToHome}
                className="w-full h-10 rounded-lg bg-[#0a2540] hover:bg-[#13396b] text-white text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95"
              >
                Kembali ke Beranda
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
