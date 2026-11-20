"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface SertifikatEmptyStateProps {
  searchQuery: string;
  onReset: () => void;
}

export default function SertifikatEmptyState({
  searchQuery,
  onReset,
}: SertifikatEmptyStateProps) {
  const hasQuery = searchQuery.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto shadow-xs"
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="font-bold text-slate-800 text-base">
        {hasQuery ? "Tidak Ditemukan Sertifikat" : "Belum Ada Sertifikat Diterbitkan"}
      </h3>
      <p className="text-xs text-slate-500 mt-1.5 max-w-sm leading-relaxed">
        {hasQuery ? (
          <>
            Tidak ada sertifikat yang cocok dengan pencarian &quot;{searchQuery}&quot; pada kategori yang dipilih.
          </>
        ) : (
          <>
            Sertifikat resmi ber-barcode BPSDMP dan terakreditasi SIASN BKN akan diterbitkan setelah Anda menyelesaikan siklus pembelajaran coaching, mentoring, atau konseling.
          </>
        )}
      </p>
      {hasQuery ? (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 px-4 py-2 rounded-lg bg-[#0a2244] text-white text-xs font-semibold hover:bg-[#13396b] transition-colors cursor-pointer"
        >
          Reset Filter Pencarian
        </button>
      ) : (
        <Link
          href="/sesi/baru"
          className="mt-5 px-4 py-2 rounded-lg bg-[#0a2244] text-white text-xs font-semibold hover:bg-[#13396b] transition-colors cursor-pointer inline-flex items-center gap-1.5"
        >
          <span>Mulai Jadwalkan Sesi</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </motion.div>
  );
}
