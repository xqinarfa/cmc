"use client";

import { motion } from "framer-motion";

interface SertifikatEmptyStateProps {
  searchQuery: string;
  onReset: () => void;
}

export default function SertifikatEmptyState({
  searchQuery,
  onReset,
}: SertifikatEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto"
    >
      <div className="size-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
        <svg
          className="size-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="font-bold text-slate-800 text-base">
        Tidak Ditemukan Sertifikat
      </h3>
      <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
        Tidak ada sertifikat yang cocok dengan pencarian &quot;{searchQuery}&quot; pada
        kategori yang dipilih.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 px-4 py-2 rounded-lg bg-[#0a2540] text-white text-xs font-semibold hover:bg-[#13396b] transition-colors cursor-pointer"
      >
        Reset Filter Pencarian
      </button>
    </motion.div>
  );
}
