"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AddMeetingModalProps {
  isOpen: boolean;
  meetingCount: number;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  setTitle: (v: string) => void;
  date: string;
  setDate: (v: string) => void;
  type: "Luring" | "Daring" | "Hybrid";
  setType: (v: "Luring" | "Daring" | "Hybrid") => void;
  location: string;
  setLocation: (v: string) => void;
  summary: string;
  setSummary: (v: string) => void;
}

export function AddMeetingModal({
  isOpen,
  meetingCount,
  onClose,
  onSubmit,
  title,
  setTitle,
  date,
  setDate,
  type,
  setType,
  location,
  setLocation,
  summary,
  setSummary,
}: AddMeetingModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <div className="fixed inset-0" onClick={onClose} />
          <motion.form
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            onSubmit={onSubmit}
            className="relative z-10 bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200"
          >
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-[#0f172a] text-base">
                Tambah Pertemuan #{meetingCount + 1}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 size-7 rounded-md flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Topik / Fokus Pertemuan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Evaluasi hasil aksi perubahan & mentoring penutup"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0a2540]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tanggal Pertemuan
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0a2540]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Moda Pelaksanaan
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as "Luring" | "Daring" | "Hybrid")}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0a2540] bg-white"
                  >
                    <option value="Luring">Luring</option>
                    <option value="Daring">Daring</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lokasi / Tautan Pertemuan
                </label>
                <input
                  type="text"
                  placeholder="Misal: Ruang Rapat B atau link Zoom"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0a2540]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tujuan / Ringkasan (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Catatan singkat tujuan pertemuan..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0a2540]"
                />
              </div>
            </div>

            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="h-9 px-4 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="h-9 px-4 rounded-lg bg-[#0a2540] text-white text-xs font-semibold hover:bg-[#13396b] cursor-pointer"
              >
                Simpan Sebagai Draf
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
