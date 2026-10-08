"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SesiToastProps {
  message: string | null;
}

export default function SesiToast({ message }: SesiToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 bg-[#0a2540] text-white px-4 py-3 rounded-lg shadow-xl text-sm flex items-center gap-2.5 border border-white/10"
        >
          <svg
            className="size-4 text-emerald-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium text-[13px]">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
