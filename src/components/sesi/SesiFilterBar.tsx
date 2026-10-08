"use client";

import { RefObject } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { FilterTab, CategoryFilter, SortOrder } from "@/lib/sessionData";

interface SesiFilterBarProps {
  activeTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
  counts: {
    total: number;
    perluTindakan: number;
    berlangsung: number;
    selesai: number;
  };
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  sortOrder: SortOrder;
  onSortChange: (sort: SortOrder) => void;
  searchInputRef: RefObject<HTMLInputElement | null>;
  onResetFilter: () => void;
}

export default function SesiFilterBar({
  activeTab,
  onTabChange,
  counts,
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  sortOrder,
  onSortChange,
  searchInputRef,
  onResetFilter,
}: SesiFilterBarProps) {
  const tabs = [
    {
      id: "semua" as FilterTab,
      label: "Semua",
      count: counts.total,
      countBadge: "bg-white/20 text-white",
      inactiveBadge: "bg-[#eef1f5] text-[#64748b]",
    },
    {
      id: "perlu_tindakan" as FilterTab,
      label: "Perlu tindakan",
      count: counts.perluTindakan,
      countBadge: "bg-amber-400 text-[#0a2540]",
      inactiveBadge: "bg-[#fef6e7] text-[#92400e]",
    },
    {
      id: "berlangsung" as FilterTab,
      label: "Berlangsung",
      count: counts.berlangsung,
      countBadge: "bg-emerald-400 text-[#0a2540]",
      inactiveBadge: "bg-[#eef1f5] text-[#64748b]",
    },
    {
      id: "selesai" as FilterTab,
      label: "Selesai",
      count: counts.selesai,
      countBadge: "bg-white/20 text-white",
      inactiveBadge: "bg-[#eef1f5] text-[#64748b]",
    },
  ];

  return (
    <div className="flex flex-col gap-3 pt-1">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Tablist Pill Buttons */}
        <LayoutGroup id="sesi-tablist">
          <div
            role="tablist"
            aria-label="Filter status sesi"
            className="bg-white border border-[#e2e6eb] rounded-[10px] p-[3px] inline-flex items-center gap-1 shadow-2xs self-start overflow-x-auto max-w-full no-scrollbar"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onTabChange(tab.id)}
                  className={`relative h-[34px] px-3.5 rounded-[7px] text-[12.5px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-[#64748b] hover:text-[#0f172a] hover:bg-slate-50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSesiTabIndicator"
                      className="absolute inset-0 bg-[#0a2540] rounded-[7px] shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span
                    className={`relative z-10 text-[11px] font-bold px-1.5 py-0.2 rounded-full transition-colors ${
                      isActive ? tab.countBadge : tab.inactiveBadge
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* Right Tools: Category Filter + Search Box + Sort Dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
          {/* Search Input with Clear Button & Keyboard Shortcut Hint */}
          <div className="relative w-full sm:w-[240px] md:w-[260px]">
            <svg
              className="size-3.5 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
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
              ref={searchInputRef}
              type="text"
              placeholder="Cari topik, mentor, token..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-[36px] pl-9 pr-14 rounded-[8px] bg-white border border-[#e2e6eb] text-[13px] text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#0a2540] focus:ring-2 focus:ring-[#0a2540]/10 transition-all shadow-2xs"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 size-5 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                title="Hapus pencarian"
              >
                ✕
              </button>
            ) : (
              <kbd className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-400 pointer-events-none shadow-2xs">
                /
              </kbd>
            )}
          </div>

          {/* Category & Sort controls */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
            {/* Category Quick Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                value={categoryFilter}
                onChange={(e) => onCategoryChange(e.target.value as CategoryFilter)}
                aria-label="Filter kategori sesi"
                className="w-full h-[36px] pl-3 pr-8 rounded-[8px] bg-white border border-[#e2e6eb] text-[12.5px] font-medium text-[#334155] focus:outline-none focus:border-[#0a2540] transition-colors shadow-2xs appearance-none cursor-pointer"
              >
                <option value="semua">Semua Kategori</option>
                <option value="Coaching">Coaching</option>
                <option value="Mentoring">Mentoring</option>
              </select>
              <svg
                className="size-3 text-[#64748b] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Sort Button */}
            <div className="relative w-full sm:w-auto">
              <select
                value={sortOrder}
                onChange={(e) => onSortChange(e.target.value as SortOrder)}
                aria-label="Urutkan sesi"
                className="w-full h-[36px] pl-3 pr-8 rounded-[8px] bg-white border border-[#e2e6eb] text-[12.5px] font-medium text-[#334155] focus:outline-none focus:border-[#0a2540] transition-colors shadow-2xs appearance-none cursor-pointer"
              >
                <option value="terbaru">Terbaru</option>
                <option value="terlama">Terlama</option>
              </select>
              <svg
                className="size-3 text-[#64748b] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filter Indicator Tag if filtered */}
      {(searchQuery || categoryFilter !== "semua") && (
        <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200 self-start">
          <span>Menampilkan hasil filter:</span>
          {categoryFilter !== "semua" && (
            <span className="font-semibold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
              {categoryFilter}
            </span>
          )}
          {searchQuery && (
            <span className="font-semibold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
              &quot;{searchQuery}&quot;
            </span>
          )}
          <button
            type="button"
            onClick={onResetFilter}
            className="text-blue-700 hover:underline font-semibold ml-1 cursor-pointer"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}
