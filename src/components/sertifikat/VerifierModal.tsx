"use client";

import { motion } from "framer-motion";
import { VerificationAuditLog } from "@/lib/certificateData";

interface VerifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputCode: string;
  onInputChange: (code: string) => void;
  onVerify: (code?: string) => void;
  hasVerified: boolean;
  result: VerificationAuditLog | null;
}

export default function VerifierModal({
  isOpen,
  onClose,
  inputCode,
  onInputChange,
  onVerify,
  hasVerified,
  result,
}: VerifierModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="verifier-modal-title"
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col gap-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <svg
                className="size-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h3
                id="verifier-modal-title"
                className="font-extrabold text-slate-900 text-sm"
              >
                Pemeriksa Keaslian Sertifikat Digital
              </h3>
              <p className="text-[11px] text-slate-500">
                Basis data terintegrasi BPSDMP Kemenhub, BSrE BSSN &amp; SIASN BKN
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-7 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Input Form */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-700">
            Masukkan Nomor Registrasi Sertifikat atau Kode Verifikasi:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Contoh: SER/CMC-KEMENHUB/2024/0942"
              className="flex-1 h-10 px-3 rounded-lg border border-slate-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent uppercase"
            />
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => onVerify()}
              className="h-10 px-4 rounded-lg bg-[#0a2540] hover:bg-[#13396b] text-white text-xs font-bold cursor-pointer transition-colors shrink-0 shadow-xs"
            >
              Verifikasi
            </motion.button>
          </div>

          {/* Sample quick buttons */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[11px] text-slate-500">
            <span>Pilih sampel cepat:</span>
            <button
              type="button"
              onClick={() => {
                onInputChange("SER/CMC-KEMENHUB/2024/0942");
                onVerify("SER/CMC-KEMENHUB/2024/0942");
              }}
              className="text-blue-700 font-mono underline hover:text-blue-900 cursor-pointer"
            >
              .../2024/0942 (14 JP)
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                onInputChange("SER/CMC-COACH/2024/0821");
                onVerify("SER/CMC-COACH/2024/0821");
              }}
              className="text-blue-700 font-mono underline hover:text-blue-900 cursor-pointer"
            >
              .../2024/0821 (4 JP)
            </button>
          </div>
        </div>

        {/* Verification Result Display */}
        {hasVerified && (
          <div className="pt-2">
            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/70 flex flex-col gap-3 text-xs"
              >
                <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <span className="size-2 rounded-full bg-emerald-600" />
                    <span>DOKUMEN VALID &amp; TERDAFTAR SECARA SAH</span>
                  </div>
                  <span className="text-[10.5px] font-mono text-emerald-700 font-semibold">
                    BSrE STATUS: ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-[10.5px] text-slate-500 block">
                      Nama Pemilik:
                    </span>
                    <strong className="text-slate-900">
                      {result.recipientName}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10.5px] text-slate-500 block">
                      NIP ASN:
                    </span>
                    <span className="font-mono">{result.recipientNip}</span>
                  </div>
                  <div>
                    <span className="text-[10.5px] text-slate-500 block">
                      Program:
                    </span>
                    <span className="font-semibold text-slate-900">
                      {result.programTitle}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10.5px] text-slate-500 block">
                      Bobot Pembelajaran:
                    </span>
                    <span className="font-bold text-emerald-800">
                      {result.jp} Jam Pelajaran (JP)
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-emerald-200/60 text-[11px] text-slate-600 flex flex-col gap-1">
                  <div>
                    <strong>Otoritas Sertifikasi:</strong>{" "}
                    {result.digitalSignature.authority}
                  </div>
                  <div>
                    <strong>Ref. Sinkronisasi BKN:</strong>{" "}
                    {result.siasnLog.transactionId}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border border-rose-200 bg-rose-50/70 text-xs text-rose-800 flex items-start gap-3"
              >
                <span className="text-rose-600 text-lg">⚠️</span>
                <div>
                  <strong className="block font-bold">
                    Nomor Sertifikat Tidak Terdaftar
                  </strong>
                  <p className="text-[11.5px] text-rose-700 mt-0.5">
                    Nomor registrasi yang Anda masukkan tidak cocok dengan sertifikat
                    manapun di database BPSDMP Kemenhub. Mohon periksa kembali
                    penulisan huruf besar dan garis miring.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
