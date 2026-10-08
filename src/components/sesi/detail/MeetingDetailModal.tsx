"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Meeting } from "@/lib/sessionData";

interface MeetingDetailModalProps {
  meeting: Meeting | null;
  onClose: () => void;
}

export function MeetingDetailModal({ meeting, onClose }: MeetingDetailModalProps) {
  const router = useRouter();

  return (
    <AnimatePresence>
      {meeting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <div className="fixed inset-0" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="relative z-10 bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span
                  className={`size-2.5 rounded-full ${
                    meeting.status === "lengkap"
                      ? "bg-emerald-500"
                      : meeting.status === "draft"
                      ? "bg-amber-500"
                      : "bg-slate-400"
                  }`}
                />
                <h3 className="font-bold text-[#0f172a] text-base">
                  Detail Pertemuan #{meeting.number}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 size-7 rounded-md flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                  Topik &amp; Agenda
                </span>
                <p className="text-sm font-medium text-[#0f172a] mt-0.5">
                  {meeting.title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                <div>
                  <span className="text-slate-500">Waktu &amp; Moda:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {meeting.dateStr}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">Status Capaian:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {meeting.statusLabel}
                  </p>
                </div>
              </div>

              {meeting.topicSummary && (
                <div>
                  <span className="text-xs font-semibold text-slate-500">Ringkasan Diskusi</span>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed bg-white border border-slate-200 rounded-md p-2.5">
                    {meeting.topicSummary}
                  </p>
                </div>
              )}

              {meeting.feedback && (
                <div>
                  <span className="text-xs font-semibold text-slate-500">
                    Umpan Balik Coach
                  </span>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed bg-emerald-50/50 border border-emerald-200/60 rounded-md p-2.5">
                    {meeting.feedback}
                  </p>
                </div>
              )}

              {meeting.nextSteps && (
                <div>
                  <span className="text-xs font-semibold text-slate-500">
                    Rencana Tindak Lanjut
                  </span>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed bg-blue-50/50 border border-blue-200/60 rounded-md p-2.5">
                    {meeting.nextSteps}
                  </p>
                </div>
              )}

              {meeting.status === "pending" && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
                  Pertemuan ini belum memiliki catatan pelaksanaan. Anda dapat mengisi formulir
                  catat pertemuan untuk mengklaim JP.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="h-9 px-4 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
              >
                Tutup
              </button>
              {meeting.status !== "lengkap" && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    router.push("/sesi/detail/catat");
                  }}
                  className="h-9 px-4 rounded-lg bg-[#0a2540] text-white text-xs font-semibold hover:bg-[#13396b] cursor-pointer"
                >
                  Mulai Pengisian
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
