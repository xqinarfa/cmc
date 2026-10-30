"use client";

import { motion, LayoutGroup } from "framer-motion";

export type CategoryFilter = "semua" | "kumulatif" | "coaching" | "mentoring";
export type SortOption = "terbaru" | "terlama" | "jp_tertinggi";
export type ViewMode = "grid" | "list";

interface SertifikatFilterBarProps {
  activeCategory: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalCount: number;
}

export default function SertifikatFilterBar({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalCount,
}: SertifikatFilterBarProps) {
  const tabs = [
    { id: "semua" as const, label: `Semua (${totalCount})` },
    { id: "kumulatif" as const, label: "Program Terpadu (1)" },
    { id: "coaching" as const, label: "Coaching (3)" },
    { id: "mentoring" as const, label: "Mentoring (2)" },
  ];

  return (
    <div className="bg-white border border-[#e2e6eb] rounded-[14px] p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* Category Tabs with Animated Pill */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
        <LayoutGroup id="cert-category-tabs">
          {tabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectCategory(tab.id)}
                className={`relative px-3.5 py-1.5 rounded-[9px] text-[12.5px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-cert-pill"
                    className="absolute inset-0 bg-[#0a2540] rounded-[9px]"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </LayoutGroup>
      </div>

      {/* Right Tools: Search, Sort & View Mode */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Search Input */}
        <div className="relative min-w-[240px] flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari sertifikat, nomor, coach..."
            className="w-full h-9 pl-9 pr-8 rounded-[8px] border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            aria-label="Urutkan Sertifikat"
            className="h-9 px-3 rounded-[8px] border border-slate-200 text-xs font-medium bg-white text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
          >
            <option value="terbaru">Urutan: Terbaru</option>
            <option value="terlama">Urutan: Terlama</option>
            <option value="jp_tertinggi">Urutan: JP Tertinggi</option>
          </select>

          {/* View Switcher: Grid vs List */}
          <div className="flex items-center border border-slate-200 rounded-[8px] p-0.5 bg-slate-50">
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              className={`size-8 rounded-[6px] flex items-center justify-center cursor-pointer transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-[#0a2540] shadow-2xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Tampilan Grid"
            >
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("list")}
              className={`size-8 rounded-[6px] flex items-center justify-center cursor-pointer transition-colors ${
                viewMode === "list"
                  ? "bg-white text-[#0a2540] shadow-2xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Tampilan List"
            >
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
