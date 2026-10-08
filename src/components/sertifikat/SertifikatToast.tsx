"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SertifikatToastProps {
  toastMessage: {
    title: string;
    desc: string;
  } | null;
  onClose: () => void;
}

export default function SertifikatToast({
  toastMessage,
  onClose,
}: SertifikatToastProps) {
  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed top-20 right-4 sm:right-8 z-50 max-w-md bg-white border border-slate-200 rounded-xl shadow-xl p-3.5 flex items-start gap-3 backdrop-blur-md"
        >
          <div className="size-7 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
            <svg
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0 pr-2">
            <h4 className="text-[13px] font-bold text-slate-900 leading-tight">
              {toastMessage.title}
            </h4>
            <p className="text-[12px] text-slate-600 mt-0.5 leading-snug">
              {toastMessage.desc}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 size-6 rounded flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
