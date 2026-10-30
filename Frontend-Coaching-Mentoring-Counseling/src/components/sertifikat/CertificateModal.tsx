"use client";

import { motion } from "framer-motion";
import { CertificateItem } from "@/lib/certificateData";
import CertificateDocument from "./CertificateDocument";
import CertificateTranscript from "./CertificateTranscript";

interface CertificateModalProps {
  cert: CertificateItem;
  modalTab: "certificate" | "transcript";
  onTabChange: (tab: "certificate" | "transcript") => void;
  onClose: () => void;
  onCopyLink: (cert: CertificateItem) => void;
  onDownload: (cert: CertificateItem) => void;
  isCopied: boolean;
}

export default function CertificateModal({
  cert,
  modalTab,
  onTabChange,
  onClose,
  onCopyLink,
  onDownload,
  isCopied,
}: CertificateModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-preview-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar with Tab Switcher */}
        <div className="px-5 sm:px-6 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-[#0a2244] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              CMC
            </div>
            <div>
              <h3
                id="cert-preview-title"
                className="font-extrabold text-slate-900 text-sm leading-tight"
              >
                Pratinjau Sertifikat Resmi BPSDMP
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                {cert.certNumber}
              </p>
            </div>
          </div>

          {/* Animated Tabs inside Modal */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center bg-slate-200/80 p-0.5 rounded-lg text-xs font-semibold relative">
              <button
                type="button"
                onClick={() => onTabChange("certificate")}
                className={`relative px-3 py-1 rounded-md transition-colors cursor-pointer z-10 ${
                  modalTab === "certificate"
                    ? "text-slate-950 font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {modalTab === "certificate" && (
                  <motion.div
                    layoutId="modal-tab-pill"
                    className="absolute inset-0 bg-white rounded-md shadow-2xs"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">Sertifikat Utama</span>
              </button>
              <button
                type="button"
                onClick={() => onTabChange("transcript")}
                className={`relative px-3 py-1 rounded-md transition-colors cursor-pointer z-10 ${
                  modalTab === "transcript"
                    ? "text-slate-950 font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {modalTab === "transcript" && (
                  <motion.div
                    layoutId="modal-tab-pill"
                    className="absolute inset-0 bg-white rounded-md shadow-2xs"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">Transkrip Materi &amp; JP</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup Pratinjau (Esc)"
              className="size-8 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable certificate surface */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#f1f5f9] flex flex-col items-center">
          {modalTab === "certificate" ? (
            <CertificateDocument cert={cert} />
          ) : (
            <CertificateTranscript cert={cert} />
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-[11.5px] text-slate-500 hidden sm:block">
            Tekan{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[10px]">
              Esc
            </kbd>{" "}
            untuk menutup
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
            {/* Cetak */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => window.print()}
              className="h-9 px-3.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
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
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              <span>Cetak</span>
            </motion.button>

            {/* Salin Tautan */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => onCopyLink(cert)}
              className="h-9 px-3.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            >
              <span>{isCopied ? "Tautan Disalin ✓" : "Salin Tautan"}</span>
            </motion.button>

            {/* Unduh PDF */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => onDownload(cert)}
              className="h-9 px-4.5 rounded-lg bg-[#0a2540] hover:bg-[#13396b] text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
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
              <span>Unduh PDF Resmi</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
