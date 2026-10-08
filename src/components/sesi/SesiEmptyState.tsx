"use client";

interface SesiEmptyStateProps {
  searchQuery: string;
  onResetFilter: () => void;
}

export default function SesiEmptyState({ searchQuery, onResetFilter }: SesiEmptyStateProps) {
  return (
    <div className="bg-white border border-[#e2e6eb] rounded-[14px] p-12 text-center flex flex-col items-center justify-center shadow-xs">
      <div className="size-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3.5">
        <svg
          className="size-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h4 className="font-bold text-slate-900 text-base">Tidak ada sesi yang cocok</h4>
      <p className="text-xs text-slate-500 mt-1.5 max-w-sm leading-relaxed">
        Tidak ada sesi yang cocok dengan kriteria pencarian{" "}
        {searchQuery ? `"${searchQuery}"` : "pada filter saat ini"}. Coba periksa kembali ejaan atau reset filter.
      </p>
      <button
        type="button"
        onClick={onResetFilter}
        className="mt-4 px-4.5 py-2.5 rounded-lg bg-[#0a2540] hover:bg-[#13396b] text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors"
      >
        Reset Semua Filter &amp; Tampilkan Semua Sesi
      </button>
    </div>
  );
}
