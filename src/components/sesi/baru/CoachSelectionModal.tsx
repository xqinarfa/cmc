"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ACCREDITED_COACHES } from "@/lib/sessionData";

interface CoachSelectionModalProps {
  isOpen: boolean;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  selectedCoach: string;
  onSelectCoach: (coachName: string) => void;
  onClose: () => void;
}

export default function CoachSelectionModal({
  isOpen,
  searchTerm,
  onSearchTermChange,
  selectedCoach,
  onSelectCoach,
  onClose,
}: CoachSelectionModalProps) {
  const filteredCoaches = ACCREDITED_COACHES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
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
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col gap-4 z-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Pilih Coach atau Mentor Terakreditasi
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    BPSDM Kementerian Perhubungan Republik Indonesia
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="size-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
                placeholder="Cari nama coach, keahlian, atau unit kerja..."
                className="w-full px-3.5 py-2 pl-9 text-xs rounded-xl border border-slate-200 focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] outline-none"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Coach List */}
            <div className="max-h-72 overflow-y-auto flex flex-col gap-2 pr-1">
              {filteredCoaches.map((coach) => (
                <div
                  key={coach.name}
                  onClick={() => {
                    onSelectCoach(coach.name);
                    onClose();
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    selectedCoach === coach.name
                      ? "bg-[#f5f8fc] border-[#0a2540] ring-1 ring-[#0a2540]"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-9 rounded-full bg-[#0a2540] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {coach.name.charAt(0)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 truncate">
                          {coach.name}
                        </span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                          ★ {coach.rating}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-600 truncate">
                        {coach.role} · {coach.unit}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {coach.specialties.map((spec) => (
                          <span key={spec} className="text-[9.5px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <div
                      className={`size-4 rounded-full border flex items-center justify-center ${
                        selectedCoach === coach.name
                          ? "bg-[#0a2540] border-[#0a2540]"
                          : "border-slate-300"
                      }`}
                    >
                      {selectedCoach === coach.name && (
                        <div className="size-1.5 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
