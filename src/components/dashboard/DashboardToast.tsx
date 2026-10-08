"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardToastProps {
  toast: { title: string; desc: string; type: "success" | "info" } | null;
  onClose: () => void;
}

export function DashboardToast({ toast, onClose }: DashboardToastProps) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#0a2244] text-white px-4 py-3 rounded-xl shadow-2xl border border-white/10 flex items-center gap-3 max-w-sm"
        >
          <div className="size-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white">{toast.title}</span>
            <span className="text-[11px] text-white/80">{toast.desc}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/60 hover:text-white text-xs ml-2 cursor-pointer"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
