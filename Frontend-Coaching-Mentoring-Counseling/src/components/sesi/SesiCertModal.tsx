"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SessionItem } from "@/lib/sessionData";

interface SesiCertModalProps {
  session: SessionItem | null;
  onClose: () => void;
  onDownload: () => void;
}

export default function SesiCertModal({ session, onClose, onDownload }: SesiCertModalProps) {
  return (
    <AnimatePresence>
      {session && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" />
                <h3 className="font-bold text-[#0f172a] text-sm">
                  Sertifikat Kelulusan Sesi CMC
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 size-7 rounded-md flex items-center justify-center cursor-pointer transition-colors"
                title="Tutup (Esc)"
              >
                ✕
              </button>
            </div>

            {/* Certificate Preview Frame */}
            <div className="p-6 space-y-4">
              <div className="border-2 border-[#0a2540]/15 rounded-xl p-6 bg-linear-to-b from-[#f8fafc] to-[#ffffff] text-center relative overflow-hidden shadow-inner">
                {/* Decorative border line */}
                <div className="absolute inset-1.5 border border-dashed border-[#0a2540]/20 rounded-lg pointer-events-none" />

                <div className="text-[10.5px] font-bold tracking-[1.5px] uppercase text-[#0a2540]/70 mb-1">
                  Kementerian Perhubungan Republik Indonesia
                </div>
                <div className="text-[9.5px] font-medium tracking-[0.5px] uppercase text-slate-500 mb-3">
                  Badan Pengembangan Sumber Daya Manusia Perhubungan
                </div>

                <div className="w-12 h-0.5 bg-[#0a2540] mx-auto mb-3" />

                <div className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
                  Sertifikat Penyelesaian Sesi
                </div>
                <h4 className="font-extrabold text-base text-[#0a2540] mt-1 px-4 leading-snug">
                  {session.title}
                </h4>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed max-w-sm mx-auto">
                  Diberikan secara sah kepada <strong>Andi Pratama, S.T.</strong> atas komitmen menyelesaikan program{" "}
                  <strong>{session.category}</strong> dengan bobot total{" "}
                  <strong>{session.targetJp} Jam Pelajaran (JP)</strong>.
                </p>

                <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-600">
                  <div className="text-left">
                    <span className="block text-[10px] text-slate-400">Pembimbing:</span>
                    <span className="font-bold text-[#0a2540]">{session.mentorOrCoachName}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] text-slate-400">Tanggal Tuntas:</span>
                    <span className="font-medium text-slate-700">{session.timeValue}</span>
                  </div>
                </div>
              </div>

              {/* SIASN Sync Verification Badge */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900 flex items-center gap-2.5">
                <svg
                  className="size-4.5 text-emerald-600 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <div>
                  <span className="font-bold block">Tervalidasi Resmi SIASN</span>
                  <span className="text-[11px] text-emerald-700">
                    Telah tersinkronisasi dengan database BPSDM Perhubungan dan BKN.
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="h-9 px-4 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 cursor-pointer transition-colors"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={onDownload}
                className="h-9 px-4.5 rounded-lg bg-[#0a2540] hover:bg-[#13396b] text-white text-xs font-semibold cursor-pointer shadow-xs inline-flex items-center gap-2 transition-all hover:shadow-md active:scale-95"
              >
                <svg
                  className="size-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span>Unduh Sertifikat PDF</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
