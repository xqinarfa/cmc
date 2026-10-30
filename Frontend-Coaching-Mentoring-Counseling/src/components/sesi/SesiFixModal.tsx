"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SessionItem } from "@/lib/sessionData";

interface SesiFixModalProps {
  session: SessionItem | null;
  uploadedFileName: string | null;
  onFileSelect: (fileName: string | null) => void;
  clarificationNote: string;
  onClarificationNoteChange: (note: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export default function SesiFixModal({
  session,
  uploadedFileName,
  onFileSelect,
  clarificationNote,
  onClarificationNoteChange,
  onClose,
  onSubmit,
}: SesiFixModalProps) {
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
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-[#0f172a] text-sm">
                  Perbaiki &amp; Ajukan Ulang Sesi
                </h3>
                <span className="text-[11px] text-slate-500 block truncate max-w-[280px]">
                  {session.title}
                </span>
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

            {/* Form Content */}
            <div className="p-6 space-y-4">
              {/* Alert Feedback from Verifier */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-3.5 text-xs text-red-900 leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold text-red-800 mb-1">
                  <svg
                    className="size-4 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>Catatan Atasan (Dr. Budi Hartono):</span>
                </div>
                <p className="text-red-700">
                  Pertemuan #2 dan #3 belum memiliki bukti dokumentasi. Mohon lampirkan bukti foto dan form absensi sebelum diajukan kembali.
                </p>
              </div>

              {/* Upload Dropzone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Unggah Dokumen Perbaikan / Bukti Kehadiran
                </label>
                {uploadedFileName ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg
                        className="size-4 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs font-semibold text-emerald-900">
                        {uploadedFileName}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onFileSelect(null)}
                      className="text-xs text-red-600 hover:underline cursor-pointer"
                    >
                      Ganti
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onFileSelect("Dokumentasi_Pertemuan_2_dan_3.pdf")}
                    className="w-full border-2 border-dashed border-slate-300 hover:border-[#0a2540] rounded-xl p-4 text-center hover:bg-slate-50 transition-colors cursor-pointer block group"
                  >
                    <svg
                      className="size-6 text-slate-400 group-hover:text-[#0a2540] mx-auto mb-1 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-xs font-semibold text-slate-700 block">
                      Klik untuk memilih file bukti dokumentasi
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Format PDF, JPG, PNG maks. 10 MB
                    </span>
                  </button>
                )}
              </div>

              {/* Textarea clarification */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Catatan Klarifikasi Pegawai (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={clarificationNote}
                  onChange={(e) => onClarificationNoteChange(e.target.value)}
                  placeholder="Misal: Bukti dokumentasi pertemuan 2 dan 3 telah dilampirkan lengkap..."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540]"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="h-9 px-4 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 cursor-pointer transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={onSubmit}
                className="h-9 px-4.5 rounded-lg bg-[#0a2540] hover:bg-[#13396b] text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors active:scale-95"
              >
                Kirim Pengajuan Ulang
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
