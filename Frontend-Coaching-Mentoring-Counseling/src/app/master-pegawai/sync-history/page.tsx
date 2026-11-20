"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { AppNavbar, AppFooter } from "@/components/common";
import {
  fetchSikSyncHistories,
  fetchSikSyncHistoryDetail,
  SIKSyncHistoryItem,
  SIKSyncChangeItem,
  SIKUnitSyncSummary,
} from "@/lib/api";

export default function SikSyncHistoryPage() {
  const [historyList, setHistoryList] = useState<SIKSyncHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  // Detail Modal State
  const [selectedHistory, setSelectedHistory] = useState<SIKSyncHistoryItem | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [modalSearch, setModalSearch] = useState("");
  const [modalActionFilter, setModalActionFilter] = useState<string>("all");

  // Load history from API
  const loadHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchSikSyncHistories(100, 0, selectedStatus !== "all" ? selectedStatus : "");
      setHistoryList(res.items || []);
    } catch (err: any) {
      console.error("Gagal memuat riwayat sinkronisasi SIK:", err);
      setError("Gagal menghubungi layanan backend untuk memuat riwayat sinkronisasi.");
    } finally {
      setLoading(false);
    }
  }, [selectedStatus]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // Open detail modal with full changes log
  const handleOpenDetail = async (item: SIKSyncHistoryItem) => {
    setSelectedHistory(item);
    setModalSearch("");
    setModalActionFilter("all");
    setLoadingDetail(true);
    try {
      const detail = await fetchSikSyncHistoryDetail(item.id);
      if (detail) {
        setSelectedHistory(detail);
      }
    } catch (err) {
      console.warn("Gagal memuat detail log riwayat:", err);
    } finally {
      setLoadingDetail(false);
    }
  };

  // Filtered history list
  const filteredHistory = useMemo(() => {
    return historyList.filter((item) => {
      // Status filter
      if (selectedStatus !== "all" && item.status !== selectedStatus) {
        return false;
      }

      // Type filter
      if (selectedType !== "all" && item.sync_type !== selectedType) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const idMatch = item.id.toLowerCase().includes(q);
        const nameMatch = (item.triggered_by_name || "").toLowerCase().includes(q);
        const msgMatch = (item.message || "").toLowerCase().includes(q);
        const unitsMatch = (item.target_units || []).some((u) => u.toLowerCase().includes(q));
        return idMatch || nameMatch || msgMatch || unitsMatch;
      }

      return true;
    });
  }, [historyList, selectedStatus, selectedType, searchQuery]);

  // Global aggregate statistics
  const summaryStats = useMemo(() => {
    let totalRuns = historyList.length;
    let totalFetched = 0;
    let totalInserted = 0;
    let totalUpdated = 0;
    let successfulRuns = 0;

    historyList.forEach((h) => {
      totalFetched += h.total_fetched || 0;
      totalInserted += h.total_inserted || 0;
      totalUpdated += h.total_updated || 0;
      if (h.status === "SUCCESS") successfulRuns++;
    });

    return { totalRuns, totalFetched, totalInserted, totalUpdated, successfulRuns };
  }, [historyList]);

  // Filtered change logs inside modal
  const modalFilteredChanges = useMemo(() => {
    if (!selectedHistory?.changes_log) return [];
    return selectedHistory.changes_log.filter((c) => {
      if (modalActionFilter !== "all" && c.action !== modalActionFilter) return false;
      if (modalSearch.trim()) {
        const q = modalSearch.toLowerCase().trim();
        const nipMatch = c.nip.toLowerCase().includes(q);
        const nameMatch = c.nama.toLowerCase().includes(q);
        const unitMatch = (c.unit_kerja || "").toLowerCase().includes(q);
        const detailMatch = (c.details || "").toLowerCase().includes(q);
        return nipMatch || nameMatch || unitMatch || detailMatch;
      }
      return true;
    });
  }, [selectedHistory, modalActionFilter, modalSearch]);

  const formatDate = (isoString: string) => {
    if (!isoString) return "-";
    try {
      const d = new Date(isoString);
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      }).format(d);
    } catch {
      return isoString;
    }
  };

  const formatDuration = (ms: number) => {
    if (!ms) return "0s";
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col font-sans text-slate-800">
      <AppNavbar />

      <main className="flex-1 w-full mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/master-pegawai" className="hover:text-blue-600 transition-colors">
            Master Data Pegawai
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Riwayat Sinkronisasi SIK</span>
        </nav>

        {/* Hero Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 bg-gradient-to-r from-[#0a2540] to-[#1e3a5f] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 pointer-events-none">
            <svg className="w-80 h-80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              <span className="inline-block size-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Audit Trail & Riwayat Sinkronisasi SIK Kemenhub
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Riwayat Sinkronisasi & Perubahan Data SIK
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Catatan historis pembaruan data master pegawai dari Sistem Informasi Kepegawaian (SIK) Kementerian Perhubungan.
              Memantau penambahan data baru, perubahan jabatan/unit kerja, serta log audit sinkronisasi.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3 pt-2 md:pt-0">
            <Link
              href="/master-pegawai"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white text-sm font-medium transition-all backdrop-blur-sm cursor-pointer"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Master Pegawai</span>
            </Link>

            <button
              onClick={loadHistory}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-900 font-semibold text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <svg
                className={`size-4 ${loading ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Segarkan Riwayat</span>
            </button>
          </div>
        </div>

        {/* Summary Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Total Eksekusi Sync</span>
              <div className="size-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">{summaryStats.totalRuns} Sesi</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">{summaryStats.successfulRuns} Berhasil 100%</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Total Data Diproses</span>
              <div className="size-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">{summaryStats.totalFetched} Pegawai</div>
            <p className="text-xs text-slate-500 mt-1">Kumulatif dari seluruh sesi</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Pegawai Baru Ditambahkan</span>
              <div className="size-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-emerald-700">+{summaryStats.totalInserted}</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">Registrasi awal ke database</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Perubahan / Pembaruan Data</span>
              <div className="size-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-amber-600">~{summaryStats.totalUpdated}</div>
            <p className="text-xs text-slate-500 mt-1">Jabatan, pangkat, & unit kerja</p>
          </div>
        </div>

        {/* Toolbar Filter & Search */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-6">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan ID Sync, nama kantor, pelaksana, atau keterangan..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-700 cursor-pointer"
              >
                <option value="all">Semua Status</option>
                <option value="SUCCESS">Berhasil (Success)</option>
                <option value="PARTIAL">Sebagian (Partial)</option>
                <option value="FAILED">Gagal (Failed)</option>
              </select>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-700 cursor-pointer"
              >
                <option value="all">Semua Tipe Sync</option>
                <option value="MULTI_UNIT">Multi-Kantor</option>
                <option value="MASTER">Master SIK Utama</option>
                <option value="SINGLE_UNIT">Kantor Tunggal</option>
              </select>

              {(searchQuery || selectedStatus !== "all" || selectedType !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedStatus("all");
                    setSelectedType("all");
                  }}
                  className="px-3 py-2 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content: Loading / Error / Empty / History List Table */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
            <div className="inline-block size-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 className="text-base font-semibold text-slate-800">Memuat Riwayat Sinkronisasi SIK...</h3>
            <p className="text-sm text-slate-500 mt-1">Mengambil log audit historis dari basis data</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <h3 className="text-base font-bold text-red-900 mb-1">Gagal Memuat Riwayat</h3>
            <p className="text-sm text-red-700 mb-4 max-w-md mx-auto">{error}</p>
            <button
              onClick={loadHistory}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Coba Lagi
            </button>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
            <div className="inline-flex size-14 rounded-2xl bg-slate-100 text-slate-400 items-center justify-center mb-3">
              <svg className="size-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-800">Tidak Ada Riwayat Sinkronisasi Ditemukan</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Tidak ada catatan yang cocok dengan filter atau kriteria pencarian yang Anda masukkan.
            </p>
          </div>
        ) : (
          /* Table of History Runs */
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 pl-6 pr-4">Sesi & Waktu</th>
                    <th className="py-3.5 px-4">Tipe & Sumber</th>
                    <th className="py-3.5 px-4">Kantor Sasaran</th>
                    <th className="py-3.5 px-4">Dampak Perubahan</th>
                    <th className="py-3.5 px-4">Durasi</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 pr-6 pl-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredHistory.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => handleOpenDetail(item)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    >
                      {/* Sesi & Waktu */}
                      <td className="py-4 pl-6 pr-4">
                        <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {formatDate(item.created_at)}
                        </div>
                        <div className="font-mono text-xs text-slate-400 mt-0.5">
                          ID: {item.id}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          Oleh: <span className="font-medium text-slate-700">{item.triggered_by_name || "Administrator"}</span>
                        </div>
                      </td>

                      {/* Tipe & Sumber */}
                      <td className="py-4 px-4 text-xs">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {item.sync_type === "MULTI_UNIT"
                            ? "Multi-Kantor"
                            : item.sync_type === "MASTER"
                            ? "Master SIK Utama"
                            : item.sync_type}
                        </span>
                        <div className="text-[11px] text-slate-400 mt-1 max-w-[180px] truncate" title={item.source}>
                          {item.source}
                        </div>
                      </td>

                      {/* Kantor Sasaran */}
                      <td className="py-4 px-4 text-xs">
                        <div className="space-y-1 max-w-[240px]">
                          {(item.target_units || []).slice(0, 2).map((u, i) => (
                            <div key={i} className="truncate font-medium text-slate-800" title={u}>
                              • {u}
                            </div>
                          ))}
                          {(item.target_units || []).length > 2 && (
                            <div className="text-[11px] text-blue-600 font-semibold">
                              +{(item.target_units || []).length - 2} kantor lainnya
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Dampak Perubahan */}
                      <td className="py-4 px-4 text-xs">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {item.total_inserted > 0 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              +{item.total_inserted} Baru
                            </span>
                          )}
                          {item.total_updated > 0 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              ~{item.total_updated} Diperbarui
                            </span>
                          )}
                          {item.total_unchanged > 0 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200">
                              ={item.total_unchanged} Tetap
                            </span>
                          )}
                          {item.total_failed > 0 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
                              !{item.total_failed} Gagal
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1">
                          Total: <span className="font-semibold text-slate-700">{item.total_fetched} pegawai</span>
                        </div>
                      </td>

                      {/* Durasi */}
                      <td className="py-4 px-4 text-xs font-mono text-slate-600">
                        {formatDuration(item.duration_ms)}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            item.status === "SUCCESS"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : item.status === "PARTIAL"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              item.status === "SUCCESS"
                                ? "bg-emerald-500"
                                : item.status === "PARTIAL"
                                ? "bg-amber-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                          <span>
                            {item.status === "SUCCESS"
                              ? "Berhasil"
                              : item.status === "PARTIAL"
                              ? "Sebagian"
                              : "Gagal"}
                          </span>
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-4 pr-6 pl-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDetail(item);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <span>Detail Log</span>
                          <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div>
                Menampilkan <span className="font-semibold text-slate-800">{filteredHistory.length}</span> sesi sinkronisasi
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block size-2 rounded-full bg-emerald-500"></span>
                <span>Audit Trail Terverifikasi</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* DETAIL MODAL: LOG AUDIT PERUBAHAN */}
      {selectedHistory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedHistory(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0a2540] to-[#1e3a5f] p-6 text-white relative">
              <button
                onClick={() => setSelectedHistory(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Tutup"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                  {selectedHistory.status === "SUCCESS" ? "Sinkronisasi Berhasil" : selectedHistory.status}
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  ID: {selectedHistory.id}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
                Log Detail Sinkronisasi & Perubahan
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm">
                Dieksekusi pada {formatDate(selectedHistory.created_at)} oleh{" "}
                <span className="font-semibold text-white">{selectedHistory.triggered_by_name}</span> dalam{" "}
                {formatDuration(selectedHistory.duration_ms)}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm flex-1">
              {loadingDetail && (
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2">
                  <div className="size-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Memuat rincian lengkap log audit...</span>
                </div>
              )}

              {/* SECTION: RINGKASAN METRIK PERUBAHAN */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <span className="text-xs text-slate-500 block">Total Diproses</span>
                  <span className="text-xl font-bold text-slate-900">{selectedHistory.total_fetched}</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Pegawai terdata</span>
                </div>

                <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-200/80">
                  <span className="text-xs text-emerald-700 block font-medium">Pegawai Baru</span>
                  <span className="text-xl font-bold text-emerald-700">+{selectedHistory.total_inserted}</span>
                  <span className="text-[11px] text-emerald-600 block mt-0.5">Ditambahkan ke DB</span>
                </div>

                <div className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/80">
                  <span className="text-xs text-amber-700 block font-medium">Data Diperbarui</span>
                  <span className="text-xl font-bold text-amber-700">~{selectedHistory.total_updated}</span>
                  <span className="text-[11px] text-amber-600 block mt-0.5">Ada pembaruan field</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <span className="text-xs text-slate-500 block">Data Tetap / Mutakhir</span>
                  <span className="text-xl font-bold text-slate-800">={selectedHistory.total_unchanged}</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Identik dengan SIK</span>
                </div>
              </div>

              {/* SECTION: RINGKASAN PER-KANTOR / UNIT KERJA */}
              {selectedHistory.unit_summaries && selectedHistory.unit_summaries.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <svg className="size-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Ringkasan Hasil per-Unit Kerja
                  </h4>

                  <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100/80 text-slate-600 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-4">Nama Unit Kerja / Kantor</th>
                          <th className="py-2.5 px-3 text-center">Total</th>
                          <th className="py-2.5 px-3 text-center text-emerald-700">Baru</th>
                          <th className="py-2.5 px-3 text-center text-amber-700">Diperbarui</th>
                          <th className="py-2.5 px-3 text-center text-slate-500">Tetap</th>
                          <th className="py-2.5 px-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/60">
                        {selectedHistory.unit_summaries.map((u, idx) => (
                          <tr key={idx} className="hover:bg-white/80 transition-colors">
                            <td className="py-2.5 px-4 font-medium text-slate-800">
                              {u.unit_kerja_nama}
                            </td>
                            <td className="py-2.5 px-3 text-center font-bold text-slate-900">
                              {u.total_pegawai}
                            </td>
                            <td className="py-2.5 px-3 text-center font-semibold text-emerald-700">
                              +{u.inserted || 0}
                            </td>
                            <td className="py-2.5 px-3 text-center font-semibold text-amber-700">
                              ~{u.updated || 0}
                            </td>
                            <td className="py-2.5 px-3 text-center text-slate-500">
                              ={u.unchanged || 0}
                            </td>
                            <td className="py-2.5 px-4 text-right">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                Berhasil
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SECTION: LOG AUDIT PERUBAHAN PEGAWAI */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <svg className="size-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Catatan Rincian Perubahan Pegawai ({modalFilteredChanges.length} Item)
                  </h4>

                  {/* Filter inside modal */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Cari NIP / nama..."
                      value={modalSearch}
                      onChange={(e) => setModalSearch(e.target.value)}
                      className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 w-36 sm:w-44"
                    />
                    <select
                      value={modalActionFilter}
                      onChange={(e) => setModalActionFilter(e.target.value)}
                      className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="all">Semua Aksi</option>
                      <option value="INSERT">Baru (+)</option>
                      <option value="UPDATE">Diperbarui (~)</option>
                    </select>
                  </div>
                </div>

                {modalFilteredChanges.length === 0 ? (
                  <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-200 text-xs text-slate-500">
                    <p className="font-semibold text-slate-700 mb-1">Tidak ada catatan perubahan yang sesuai</p>
                    <p>
                      {selectedHistory.total_inserted === 0 && selectedHistory.total_updated === 0
                        ? `Semua ${selectedHistory.total_fetched} data pegawai pada sesi ini sudah identik / mutakhir.`
                        : "Coba sesuaikan kata kunci atau filter aksi di atas."}
                    </p>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 text-xs">
                      {modalFilteredChanges.map((change, idx) => (
                        <div key={idx} className="p-3.5 hover:bg-slate-50/70 transition-colors flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  change.action === "INSERT"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {change.action === "INSERT" ? "Pegawai Baru" : "Diperbarui"}
                              </span>
                              <span className="font-semibold text-slate-900">{change.nama}</span>
                              <span className="font-mono text-slate-400">({change.nip})</span>
                            </div>
                            <p className="text-slate-600">{change.details}</p>
                            <p className="text-[11px] text-slate-400 truncate max-w-lg">{change.unit_kerja}</p>
                          </div>

                          {change.changed_fields && change.changed_fields.length > 0 && (
                            <div className="shrink-0 flex flex-wrap gap-1">
                              {change.changed_fields.map((field, fIdx) => (
                                <span key={fIdx} className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-mono border border-blue-200">
                                  {field}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Pesan Sistem: <span className="font-medium text-slate-700">{selectedHistory.message || "Sinkronisasi selesai"}</span>
              </span>
              <button
                onClick={() => setSelectedHistory(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <AppFooter />
    </div>
  );
}

