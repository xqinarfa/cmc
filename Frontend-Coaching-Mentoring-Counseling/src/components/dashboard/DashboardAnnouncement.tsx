"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardAnnouncementProps {
  show: boolean;
  onClose: () => void;
}

export function DashboardAnnouncement({ show, onClose }: DashboardAnnouncementProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full bg-linear-to-r from-[#1d4ed8] via-[#2563eb] to-[#0ea5a4] text-white shadow-xs overflow-hidden"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3 text-xs sm:text-[13px]">
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <span className="size-6 rounded-md bg-white/20 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </span>
              <div className="truncate">
                <strong className="font-bold text-white">Sosialisasi CMC 2026</strong>: Panduan pelaksanaan Coaching &amp; Mentoring Kemenhub telah diterbitkan.
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/#faq"
                className="px-2.5 py-1 rounded bg-[#0a2244] hover:bg-[#06162c] text-white font-semibold text-[11.5px] transition-colors"
              >
                Pelajari →
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup Pengumuman"
                className="size-6 rounded hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
