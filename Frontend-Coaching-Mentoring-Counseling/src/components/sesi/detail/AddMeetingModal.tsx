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
  existingDates?: string[];
  isVerified?: boolean;
  isCompleted?: boolean;
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
  existingDates = [],
  isVerified = true,
  isCompleted = false,
}: AddMeetingModalProps) {
  // Check if selected date exceeds max 2 meetings per month
  const parseYearMonth = (dStr?: string): string => {
    if (!dStr) return "";
    const match = dStr.match(/^(\d{4})-(\d{2})/);
    if (match) return `${match[1]}-${match[2]}`;
    const dt = new Date(dStr);
    if (!isNaN(dt.getTime())) {
      const y = dt.getFullYear();
      const m = String(dt.getMonth() + 1).padStart(2, "0");
      return `${y}-${m}`;
    }
    return "";
  };

  const selectedMonth = parseYearMonth(date) || new Date().toISOString().slice(0, 7);
  const meetingsInSelectedMonth = existingDates.filter(
    (d) => parseYearMonth(d) === selectedMonth,
  ).length;
  const isMonthLimitExceeded = Boolean(date && meetingsInSelectedMonth >= 2);

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
              {/* Rules Notice */}
              <div className="bg-[#f0f9ff] border border-[#b9e6fe] rounded-lg p-3 text-xs text-[#026aa2] flex items-start gap-2">
                <svg className="size-4 shrink-0 text-[#0284c7] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-[#0369a1]">Ketentuan Pelaksanaan:</span>
                  <span>• 1 pertemuan = <strong>2 JP</strong>.</span>
                  <span>• Maksimal <strong>2 pertemuan per bulan</strong> per jenis kegiatan.</span>
                </div>
              </div>

              {isCompleted && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-800 flex items-start gap-2">
                  <svg className="size-4 shrink-0 text-emerald-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    Sesi ini sudah ditandai selesai. Penambahan pertemuan baru tidak diperbolehkan.
                  </span>
                </div>
              )}

              {!isCompleted && !isVerified && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 flex items-start gap-2">
                  <svg className="size-4 shrink-0 text-amber-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>
                    Sesi ini masih menunggu verifikasi dari Atasan Langsung / Pejabat Penilai. Pertemuan baru dapat ditambahkan setelah sesi disetujui.
                  </span>
                </div>
              )}

              {isMonthLimitExceeded && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-800 flex items-start gap-2">
                  <svg className="size-4 shrink-0 text-red-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>
                    Sudah terdapat {meetingsInSelectedMonth} pertemuan pada bulan <strong>{selectedMonth}</strong>. Maksimal adalah 2 pertemuan per bulan. Silakan pilih bulan lain.
                  </span>
                </div>
              )}

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
                disabled={isMonthLimitExceeded || !isVerified || isCompleted}
                className="h-9 px-4 rounded-lg bg-[#0a2540] text-white text-xs font-semibold hover:bg-[#13396b] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                title={
                  isCompleted
                    ? "Sesi ini telah selesai sehingga tidak dapat menambah pertemuan baru"
                    : !isVerified
                      ? "Sesi harus diverifikasi terlebih dahulu oleh Atasan"
                      : undefined
                }
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
