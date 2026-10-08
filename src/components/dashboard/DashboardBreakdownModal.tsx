"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DashboardBreakdownModal({
  isOpen,
  onClose,
}: DashboardBreakdownModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="breakdown-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="relative w-full max-w-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 id="breakdown-modal-title" className="font-bold text-slate-900 text-sm">
                  Rincian Capaian 20 Jam Pelajaran (JP)
                </h3>
                <span className="text-[11px] text-slate-500">Tahun Anggaran 2026 · Standar BKN</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="size-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Total Target</span>
                  <span className="text-base font-extrabold text-slate-900">20 JP</span>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <span className="text-[11px] text-blue-700 block">Tercapai</span>
                  <span className="text-base font-extrabold text-blue-800">14 JP</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="text-[11px] text-amber-700 block">Sisa Kewajiban</span>
                  <span className="text-base font-extrabold text-amber-800">6 JP</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <span className="font-bold text-slate-800">Daftar Komponen Pengembangan:</span>
                {[
                  { name: "Coaching Kepemimpinan (Rudi Santoso)", jp: 3, date: "10 Jan 2026", status: "Terverifikasi" },
                  { name: "Pelatihan Mandiri: Transformasi Digital", jp: 5, date: "14 Feb 2026", status: "Terverifikasi" },
                  { name: "Seminar Nasional Transportasi Cerdas", jp: 2, date: "22 Mar 2026", status: "Terverifikasi" },
                  { name: "Workshop SOP Pelayanan Terpadu BPTD", jp: 4, date: "08 Mei 2026", status: "Terverifikasi" },
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/60 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{item.name}</span>
                      <span className="text-[10.5px] text-slate-500">{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-blue-700 text-xs">{item.jp} JP</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
              >
                Tutup Rincian
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
