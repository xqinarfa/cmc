"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CoachItem } from "@/lib/dashboardData";

interface DashboardCoachFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  coaches: CoachItem[];
}

export function DashboardCoachFinderModal({
  isOpen,
  onClose,
  coaches,
}: DashboardCoachFinderModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="coach-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="relative w-full max-w-[560px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col gap-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 id="coach-modal-title" className="font-bold text-slate-900 text-sm">
                  Direktori Coach &amp; Mentor Terakreditasi BPSDM
                </h3>
                <span className="text-[11px] text-slate-500">Pilih pembimbing yang sesuai dengan kebutuhan pengembangan Anda</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="size-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {coaches.map((c) => (
                <div key={c.id} className="p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-xs block">{c.name}</span>
                      <span className="text-[11px] text-slate-600 font-medium">{c.role}</span>
                      <span className="text-[10.5px] text-slate-400 block">{c.unit}</span>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      ★ {c.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {c.specialties.map((spec, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <span className={`text-[11px] font-semibold ${c.available ? "text-emerald-700" : "text-slate-400"}`}>
                      {c.available ? "● Tersedia untuk Sesi Baru" : "● Jadwal Penuh"}
                    </span>
                    {c.available && (
                      <Link
                        href="/sesi/baru"
                        onClick={onClose}
                        className="px-3 py-1.5 rounded-lg bg-[#0a2244] hover:bg-[#13396b] text-white text-xs font-semibold cursor-pointer shadow-xs no-underline"
                      >
                        Ajukan Sesi
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
              >
                Tutup Direktori
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
