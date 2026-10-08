"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardNewSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function DashboardNewSessionModal({
  isOpen,
  onClose,
  onSubmit,
}: DashboardNewSessionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-session-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 id="new-session-modal-title" className="font-bold text-slate-900 text-sm">
                Catat Sesi Pembelajaran Baru
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup"
                className="size-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-800">Jenis Layanan Pengembangan</label>
                <select name="type" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 outline-none">
                  <option value="coaching">Coaching Eksekutif</option>
                  <option value="mentoring">Mentoring Karier &amp; Fungsional</option>
                  <option value="konseling">Konseling Psikologi Kerja</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-800">Topik / Agenda Utama Pembelajaran</label>
                <input
                  type="text"
                  name="topic"
                  required
                  placeholder="Misal: Manajemen Mutu Layanan Angkutan Sungai dan Danau"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-800">Nama Pembimbing / Mentor / Coach</label>
                <input
                  type="text"
                  name="mentor"
                  defaultValue="Rudi Santoso, M.M."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-800">Tanggal Rencana</label>
                  <input
                    type="date"
                    name="date"
                    required
                    defaultValue="2026-10-18"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-800">Alokasi Jam Pelajaran (JP)</label>
                  <select name="jp" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 outline-none">
                    <option value="2">2 JP (Standar Sesi)</option>
                    <option value="3">3 JP (Komprehensif)</option>
                    <option value="4">4 JP (Intensif)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0a2244] hover:bg-[#13396b] text-white font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  Ajukan Sesi
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
