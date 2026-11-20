"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import { AppNavbar, AppFooter, AdminGuard } from "@/components/common";
import {
  fetchSatuanKerjaList,
  fetchUnitKerjaList,
  fetchSubUnitKerjaList,
  fetchPegawaiBySatuanKerja,
  fetchPegawaiByUnitKerja,
  fetchPegawaiBySubUnitKerja,
  syncSatuanKerjaFromSIK,
  syncUnitKerjaFromSIK,
  syncSubUnitKerjaFromSIK,
  SatuanKerjaItem,
  UnitKerjaItem,
  SubUnitKerjaItem,
  SIKPegawai,
} from "@/lib/api";

type ActiveTab = "tree" | "satker" | "unit" | "subunit";
type SelectedEntityLevel = "satker" | "unit" | "subunit";

interface SelectedEntity {
  level: SelectedEntityLevel;
  id: string;
  kode: string;
  nama: string;
  data: SatuanKerjaItem | UnitKerjaItem | SubUnitKerjaItem;
}

function MasterInstansiContent() {
  // Master data states
  const [satuanKerjaList, setSatuanKerjaList] = useState<SatuanKerjaItem[]>([]);
  const [unitKerjaList, setUnitKerjaList] = useState<UnitKerjaItem[]>([]);
  const [subUnitKerjaList, setSubUnitKerjaList] = useState<SubUnitKerjaItem[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Tab & View Modes
  const [activeTab, setActiveTab] = useState<ActiveTab>("tree");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Search & Filter Toolbar
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterSatker, setFilterSatker] = useState<string>("all");
  const [filterUnit, setFilterUnit] = useState<string>("all");

  // Tree view expanded nodes map: { [satkerId]: boolean } and { [unitId]: boolean }
  const [expandedSatkers, setExpandedSatkers] = useState<
    Record<string, boolean>
  >({});
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>(
    {},
  );

  // Pagination for individual list tabs (satker, unit, subunit)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [jumpPageInput, setJumpPageInput] = useState<string>("");

  // Detail & Employee Roster Modal
  const [selectedEntity, setSelectedEntity] = useState<SelectedEntity | null>(
    null,
  );
  const [modalTab, setModalTab] = useState<"info" | "pegawai" | "children">(
    "info",
  );
  const [modalPegawaiList, setModalPegawaiList] = useState<SIKPegawai[]>([]);
  const [modalPegawaiTotal, setModalPegawaiTotal] = useState<number>(0);
  const [modalPegawaiLoading, setModalPegawaiLoading] =
    useState<boolean>(false);
  const [modalPegawaiSearch, setModalPegawaiSearch] = useState<string>("");
  const [modalPegawaiPage, setModalPegawaiPage] = useState<number>(1);
  const modalPageSize = 10;

  // Sync SIK Modal
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncTarget, setSyncTarget] = useState<
    "all" | "satker" | "unit" | "subunit"
  >("all");
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  // Toast Notification
  const [toast, setToast] = useState<{
    title: string;
    message: string;
    type: "success" | "info" | "error";
  } | null>(null);

  const showToast = (
    title: string,
    message: string,
    type: "success" | "info" | "error" = "success",
  ) => {
    setToast({ title, message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim().toLowerCase());
      setCurrentPage(1);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load all 3 levels of organization
  const loadMasterData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [satkerRes, unitRes, subUnitRes] = await Promise.all([
        fetchSatuanKerjaList().catch(() => []),
        fetchUnitKerjaList().catch(() => []),
        fetchSubUnitKerjaList().catch(() => []),
      ]);

      // Ensure sorted by kode ASC
      const sortedSatker = [...satkerRes].sort((a, b) =>
        (a.kode || "").localeCompare(b.kode || ""),
      );
      const sortedUnit = [...unitRes].sort((a, b) =>
        (a.kode || "").localeCompare(b.kode || ""),
      );
      const sortedSubUnit = [...subUnitRes].sort((a, b) =>
        (a.kode || "").localeCompare(b.kode || ""),
      );

      setSatuanKerjaList(sortedSatker);
      setUnitKerjaList(sortedUnit);
      setSubUnitKerjaList(sortedSubUnit);

      // Expand all satkers by default for tree view
      const defaultExpSatker: Record<string, boolean> = {};
      sortedSatker.forEach((s) => {
        defaultExpSatker[s.id || s.kode] = true;
      });
      setExpandedSatkers(defaultExpSatker);
    } catch (err: any) {
      console.error("Gagal memuat master instansi:", err);
      setError(
        "Gagal memuat struktur instansi. Pastikan server backend sedang aktif.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMasterData();
  }, [loadMasterData]);

  // Reset pagination when active tab changes
  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery("");
  }, [activeTab]);

  // Filtered Satuan Kerja List
  const filteredSatkers = useMemo(() => {
    return satuanKerjaList.filter((s) => {
      if (!debouncedSearch) return true;
      return (
        (s.nama && s.nama.toLowerCase().includes(debouncedSearch)) ||
        (s.kode && s.kode.toLowerCase().includes(debouncedSearch)) ||
        (s.singkatan && s.singkatan.toLowerCase().includes(debouncedSearch)) ||
        (s.instansi_induk &&
          s.instansi_induk.toLowerCase().includes(debouncedSearch))
      );
    });
  }, [satuanKerjaList, debouncedSearch]);

  // Filtered Unit Kerja List
  const filteredUnits = useMemo(() => {
    return unitKerjaList.filter((u) => {
      if (filterSatker !== "all") {
        if (
          u.satuan_kerja_id !== filterSatker &&
          u.satuan_kerja_nama !== filterSatker
        ) {
          return false;
        }
      }
      if (!debouncedSearch) return true;
      return (
        (u.nama && u.nama.toLowerCase().includes(debouncedSearch)) ||
        (u.kode && u.kode.toLowerCase().includes(debouncedSearch)) ||
        (u.satuan_kerja_nama &&
          u.satuan_kerja_nama.toLowerCase().includes(debouncedSearch)) ||
        (u.lokasi && u.lokasi.toLowerCase().includes(debouncedSearch)) ||
        (u.eselon && u.eselon.toLowerCase().includes(debouncedSearch))
      );
    });
  }, [unitKerjaList, filterSatker, debouncedSearch]);

  // Filtered Sub Unit Kerja List
  const filteredSubUnits = useMemo(() => {
    return subUnitKerjaList.filter((sub) => {
      if (filterSatker !== "all") {
        if (
          sub.satuan_kerja_id !== filterSatker &&
          sub.satuan_kerja_nama !== filterSatker
        ) {
          return false;
        }
      }
      if (filterUnit !== "all") {
        if (
          sub.unit_kerja_id !== filterUnit &&
          sub.unit_kerja_nama !== filterUnit
        ) {
          return false;
        }
      }
      if (!debouncedSearch) return true;
      return (
        (sub.nama && sub.nama.toLowerCase().includes(debouncedSearch)) ||
        (sub.kode && sub.kode.toLowerCase().includes(debouncedSearch)) ||
        (sub.unit_kerja_nama &&
          sub.unit_kerja_nama.toLowerCase().includes(debouncedSearch)) ||
        (sub.satuan_kerja_nama &&
          sub.satuan_kerja_nama.toLowerCase().includes(debouncedSearch)) ||
        (sub.deskripsi && sub.deskripsi.toLowerCase().includes(debouncedSearch))
      );
    });
  }, [subUnitKerjaList, filterSatker, filterUnit, debouncedSearch]);

  // Overview Statistics
  const stats = useMemo(() => {
    const totalSatker = satuanKerjaList.length;
    const totalUnit = unitKerjaList.length;
    const totalSubUnit = subUnitKerjaList.length;
    // Calculate total mapped employees across units
    const totalPegawai = unitKerjaList.reduce(
      (acc, u) => acc + (u.total_pegawai || 0),
      0,
    );
    return {
      totalSatker,
      totalUnit,
      totalSubUnit,
      totalPegawai,
    };
  }, [satuanKerjaList, unitKerjaList, subUnitKerjaList]);

  // Available Unit options for current filterSatker
  const unitsForFilterDropdown = useMemo(() => {
    if (filterSatker === "all") return unitKerjaList;
    return unitKerjaList.filter(
      (u) =>
        u.satuan_kerja_id === filterSatker ||
        u.satuan_kerja_nama === filterSatker,
    );
  }, [unitKerjaList, filterSatker]);

  // Active items and pagination calculation based on active tab
  const { currentItems, totalCount } = useMemo(() => {
    let list: any[] = [];
    if (activeTab === "satker") list = filteredSatkers;
    else if (activeTab === "unit") list = filteredUnits;
    else if (activeTab === "subunit") list = filteredSubUnits;

    const total = list.length;
    const startIdx = (currentPage - 1) * pageSize;
    const items = list.slice(startIdx, startIdx + pageSize);
    return { currentItems: items, totalCount: total };
  }, [
    activeTab,
    filteredSatkers,
    filteredUnits,
    filteredSubUnits,
    currentPage,
    pageSize,
  ]);

  // Load employee roster inside detail modal
  const loadModalPegawai = useCallback(
    async (entity: SelectedEntity, page: number, q: string) => {
      setModalPegawaiLoading(true);
      try {
        const offset = (page - 1) * modalPageSize;
        let res: { items: SIKPegawai[]; total: number } = {
          items: [],
          total: 0,
        };
        if (entity.level === "satker") {
          res = await fetchPegawaiBySatuanKerja(
            entity.id || entity.kode,
            q,
            modalPageSize,
            offset,
          );
        } else if (entity.level === "unit") {
          res = await fetchPegawaiByUnitKerja(
            entity.id || entity.kode,
            q,
            modalPageSize,
            offset,
          );
        } else if (entity.level === "subunit") {
          res = await fetchPegawaiBySubUnitKerja(
            entity.id || entity.kode,
            q,
            modalPageSize,
            offset,
          );
        }
        setModalPegawaiList(res.items || []);
        setModalPegawaiTotal(res.total || 0);
      } catch (err) {
        console.error("Gagal memuat pegawai unit:", err);
        setModalPegawaiList([]);
        setModalPegawaiTotal(0);
      } finally {
        setModalPegawaiLoading(false);
      }
    },
    [modalPageSize],
  );

  // Trigger modal open
  const handleOpenDetail = (
    entity: SelectedEntity,
    initialTab: "info" | "pegawai" | "children" = "info",
  ) => {
    setSelectedEntity(entity);
    setModalTab(initialTab);
    setModalPegawaiPage(1);
    setModalPegawaiSearch("");
    if (initialTab === "pegawai") {
      loadModalPegawai(entity, 1, "");
    }
  };

  // Re-fetch employee list when modal page or search changes
  useEffect(() => {
    if (selectedEntity && modalTab === "pegawai") {
      loadModalPegawai(selectedEntity, modalPegawaiPage, modalPegawaiSearch);
    }
  }, [
    selectedEntity,
    modalTab,
    modalPegawaiPage,
    modalPegawaiSearch,
    loadModalPegawai,
  ]);

  // Toggle tree expansion
  const toggleSatkerExpand = (id: string) => {
    setExpandedSatkers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleUnitExpand = (id: string) => {
    setExpandedUnits((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAllTree = () => {
    const satkerMap: Record<string, boolean> = {};
    const unitMap: Record<string, boolean> = {};
    satuanKerjaList.forEach((s) => {
      satkerMap[s.id || s.kode] = true;
    });
    unitKerjaList.forEach((u) => {
      unitMap[u.id || u.kode] = true;
    });
    setExpandedSatkers(satkerMap);
    setExpandedUnits(unitMap);
  };

  const collapseAllTree = () => {
    setExpandedSatkers({});
    setExpandedUnits({});
  };

  // Handle Sync SIK Action
  const handleRunSync = async () => {
    setIsSyncing(true);
    setSyncStatusMsg(
      "Menghubungkan ke basis data SIK dan memperbarui referensi...",
    );
    try {
      if (syncTarget === "satker" || syncTarget === "all") {
        setSyncStatusMsg("Sinkronisasi Satuan Kerja...");
        await syncSatuanKerjaFromSIK();
      }
      if (syncTarget === "unit" || syncTarget === "all") {
        setSyncStatusMsg("Sinkronisasi Unit Kerja...");
        await syncUnitKerjaFromSIK();
      }
      if (syncTarget === "subunit" || syncTarget === "all") {
        setSyncStatusMsg("Sinkronisasi Sub Unit Kerja...");
        await syncSubUnitKerjaFromSIK();
      }

      showToast(
        "Sinkronisasi Berhasil",
        "Data struktur instansi berhasil diperbarui langsung dari SIK.",
        "success",
      );
      setIsSyncModalOpen(false);
      await loadMasterData();
    } catch (err: any) {
      console.error("Gagal sinkronisasi SIK:", err);
      showToast(
        "Sinkronisasi Gagal",
        err.message || "Gagal menghubungi SIK.",
        "error",
      );
    } finally {
      setIsSyncing(false);
      setSyncStatusMsg(null);
    }
  };

  // Copy helper
  const handleCopyText = (
    text: string,
    label = "Teks",
    e?: React.MouseEvent,
  ) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    showToast(`${label} Disalin`, `${text} berhasil disalin ke clipboard.`);
  };

  // Copy all filtered codes
  const handleCopyFilteredCodes = () => {
    let codes: string[] = [];
    if (activeTab === "satker") {
      codes = filteredSatkers.map((s) => s.kode || s.nama);
    } else if (activeTab === "unit") {
      codes = filteredUnits.map((u) => u.kode || u.nama);
    } else if (activeTab === "subunit") {
      codes = filteredSubUnits.map((sub) => sub.kode || sub.nama);
    } else {
      codes = [
        ...filteredSatkers.map((s) => s.kode || s.nama),
        ...filteredUnits.map((u) => u.kode || u.nama),
        ...filteredSubUnits.map((sub) => sub.kode || sub.nama),
      ];
    }
    const cleanCodes = Array.from(new Set(codes.filter(Boolean))).join(", ");
    navigator.clipboard.writeText(cleanCodes);
    showToast(
      "Daftar Kode Disalin",
      `${codes.length} kode entitas instansi berhasil disalin ke clipboard.`,
    );
  };

  // Render Smart Pagination Controls
  const renderPaginationControls = () => {
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const startItem = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalCount);

    const getPageNumbers = (): (number | string)[] => {
      if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }
      if (currentPage <= 4) {
        return [1, 2, 3, 4, 5, "...", totalPages];
      }
      if (currentPage >= totalPages - 3) {
        return [
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      }
      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    };

    const pages = getPageNumbers();

    const handleJump = (e: React.FormEvent) => {
      e.preventDefault();
      const pageNum = parseInt(jumpPageInput, 10);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
        setCurrentPage(pageNum);
        setJumpPageInput("");
      } else {
        showToast(
          "Halaman Tidak Valid",
          `Masukkan nomor halaman antara 1 dan ${totalPages}`,
          "info",
        );
      }
    };

    return (
      <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        {/* Left: Summary & Page Size */}
        <div className="flex flex-wrap items-center gap-3">
          <div>
            Menampilkan{" "}
            <span className="font-bold text-slate-900">{startItem}</span> –{" "}
            <span className="font-bold text-slate-900">{endItem}</span> dari{" "}
            <span className="font-bold text-slate-900">{totalCount}</span>{" "}
            entitas
          </div>
          <div className="flex items-center gap-1.5 ml-2 border-l border-slate-200 pl-3">
            <span className="text-slate-500">Tampilkan:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold focus:border-blue-500 outline-none cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-slate-500">/ hal</span>
          </div>
        </div>

        {/* Right: Navigation Buttons & Jump Form */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white text-slate-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
              title="Halaman Pertama"
            >
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white text-slate-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
              title="Halaman Sebelumnya"
            >
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {pages.map((p, idx) =>
              typeof p === "number" ? (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentPage(p)}
                  className={`min-w-[32px] h-8 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentPage === p
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                  }`}
                >
                  {p}
                </button>
              ) : (
                <span key={idx} className="px-1 text-slate-400 select-none">
                  •••
                </span>
              ),
            )}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white text-slate-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
              title="Halaman Berikutnya"
            >
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white text-slate-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
              title="Halaman Terakhir"
            >
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <form
            onSubmit={handleJump}
            className="flex items-center gap-1.5 ml-2 border-l border-slate-200 pl-3"
          >
            <span className="text-slate-500">Ke:</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              placeholder={currentPage.toString()}
              value={jumpPageInput}
              onChange={(e) => setJumpPageInput(e.target.value)}
              className="w-12 px-2 py-1 text-center bg-white border border-slate-200 rounded-lg text-slate-800 text-xs font-medium focus:border-blue-500 outline-none"
            />
            <button
              type="submit"
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
            >
              Buka
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col font-sans text-slate-800">
      {/* App Navbar */}
      <AppNavbar />

      <main className="flex-1 w-full mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
        {/* Header Hero Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 bg-gradient-to-r from-[#0a2540] to-[#1e3a5f] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 pointer-events-none">
            <svg className="w-80 h-80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Master Data Instansi & Organisasi
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Direktori hierarki dan struktur organisasi resmi Kementerian
              Perhubungan mencakup Satuan Kerja (Kantor Induk), Unit Kerja
              (Kantor/Balai), dan Sub Unit Kerja (Bagian/Bidang). Seluruh unit
              kerja secara konsisten diurutkan berdasarkan Kode.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3 pt-2 md:pt-0">
            <Link
              href="/master-pegawai"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white text-sm font-medium transition-all backdrop-blur-sm cursor-pointer"
              title="Lihat master data pegawai di lingkungan Kemenhub"
            >
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span>Master Pegawai</span>
            </Link>

            <button
              onClick={() => setIsSyncModalOpen(true)}
              disabled={isSyncing}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white text-sm font-medium transition-all backdrop-blur-sm cursor-pointer disabled:opacity-50"
              title="Sinkronkan struktur organisasi dari master SIK"
            >
              <svg
                className={`size-4 ${isSyncing ? "animate-spin" : ""}`}
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
              <span>
                {isSyncing ? "Menyinkronkan..." : "Sinkronkan dari SIK"}
              </span>
            </button>

            <button
              onClick={() => loadMasterData()}
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
              <span>Segarkan</span>
            </button>
          </div>
        </div>

        {/* 4 Overview Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1: Satuan Kerja */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">
                Satuan Kerja
              </span>
              <div className="size-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <svg
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {stats.totalSatker}
            </div>
            <p className="text-xs text-blue-600 font-medium mt-1">
              Kantor Induk / Badan / Ditjen
            </p>
          </div>

          {/* Card 2: Unit Kerja */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">
                Unit Kerja
              </span>
              <div className="size-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <svg
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {stats.totalUnit}
            </div>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              Kantor / Balai / Pusat
            </p>
          </div>

          {/* Card 3: Sub Unit Kerja */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">
                Sub Unit Kerja
              </span>
              <div className="size-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <svg
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {stats.totalSubUnit}
            </div>
            <p className="text-xs text-indigo-600 font-medium mt-1">
              Bagian / Bidang / Subbag
            </p>
          </div>

          {/* Card 4: Total Pegawai Terpetakan */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">
                Total Pegawai
              </span>
              <div className="size-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <svg
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {stats.totalPegawai}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Pegawai aktif terpetakan
            </p>
          </div>
        </div>

        {/* Level & Hierarchy Tab Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-200 pb-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("tree")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "tree"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              <span>Pohon Hierarki Organisasi</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("satker")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "satker"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              <span>Satuan Kerja</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === "satker"
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {satuanKerjaList.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("unit")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "unit"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              <span>Unit Kerja</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === "unit"
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {unitKerjaList.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("subunit")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "subunit"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              <span>Sub Unit Kerja</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === "subunit"
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {subUnitKerjaList.length}
              </span>
            </button>
          </div>

          {/* Tree View Bulk Expand / Collapse */}
          {activeTab === "tree" && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={expandAllTree}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer"
              >
                Buka Semua
              </button>
              <button
                type="button"
                onClick={collapseAllTree}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer"
              >
                Tutup Semua
              </button>
            </div>
          )}
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-6">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan Kode, Nama Satker, Unit Kerja, atau Sub Unit..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <svg
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Dropdown Filters & Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Filter Satuan Kerja */}
              {(activeTab === "unit" ||
                activeTab === "subunit" ||
                activeTab === "tree") && (
                <select
                  value={filterSatker}
                  onChange={(e) => {
                    setFilterSatker(e.target.value);
                    setFilterUnit("all");
                    setCurrentPage(1);
                  }}
                  className="max-w-[220px] truncate px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 cursor-pointer"
                  title="Filter Satuan Kerja Induk (Diurutkan berdasarkan Kode ASC)"
                >
                  <option value="all">Semua Satuan Kerja</option>
                  {satuanKerjaList.map((satker) => (
                    <option
                      key={satker.id || satker.kode}
                      value={satker.id || satker.nama}
                    >
                      {satker.kode
                        ? `[${satker.kode}] ${satker.nama}`
                        : satker.nama}
                    </option>
                  ))}
                </select>
              )}

              {/* Filter Unit Kerja (Active on subunit tab) */}
              {activeTab === "subunit" && (
                <select
                  value={filterUnit}
                  onChange={(e) => {
                    setFilterUnit(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="max-w-[220px] truncate px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 cursor-pointer"
                  title="Filter Unit Kerja Induk (Diurutkan berdasarkan Kode ASC)"
                >
                  <option value="all">Semua Unit Kerja</option>
                  {unitsForFilterDropdown.map((u) => (
                    <option key={u.id || u.kode} value={u.id || u.nama}>
                      {u.kode ? `[${u.kode}] ${u.nama}` : u.nama}
                    </option>
                  ))}
                </select>
              )}

              {/* Quick Copy Filtered Codes */}
              <button
                type="button"
                onClick={handleCopyFilteredCodes}
                className="px-3 py-2 text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                title="Salin semua kode entitas yang ditampilkan"
              >
                <svg
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                <span>Salin Kode</span>
              </button>

              {/* View Switcher (For Tabular / Card Views) */}
              {activeTab !== "tree" && (
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
                  <button
                    onClick={() => setViewMode("table")}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewMode === "table"
                        ? "bg-white text-slate-800 shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                    title="Tampilan Tabel"
                  >
                    <svg
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-white text-slate-800 shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                    title="Tampilan Kartu Grid"
                  >
                    <svg
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
            <div className="inline-block size-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <h3 className="text-base font-semibold text-slate-800 mb-1">
              Memuat Master Data Instansi...
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Menghubungkan ke basis data struktur organisasi Kemenhub. Mohon
              tunggu sejenak.
            </p>
          </div>
        ) : error ? (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center">
            <div className="size-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <svg
                className="size-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-base font-bold text-rose-900 mb-1">
              Gagal Memuat Data
            </h3>
            <p className="text-sm text-rose-700 max-w-md mx-auto mb-4">
              {error}
            </p>
            <button
              onClick={() => loadMasterData()}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs rounded-xl shadow-xs cursor-pointer"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <>
            {/* ─── TAB 1: TREE VIEW (POHON HIERARKI) ─── */}
            {activeTab === "tree" && (
              <div className="space-y-4">
                {filteredSatkers.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80">
                    <p className="text-sm text-slate-500">
                      Tidak ada Satuan Kerja yang cocok dengan pencarian.
                    </p>
                  </div>
                ) : (
                  filteredSatkers.map((satker) => {
                    const satkerId = satker.id || satker.kode;
                    const isExpanded = !!expandedSatkers[satkerId];

                    // Find child unit kerja under this satker
                    const childUnits = unitKerjaList
                      .filter(
                        (u) =>
                          u.satuan_kerja_id === satker.id ||
                          u.satuan_kerja_nama === satker.nama ||
                          u.satuan_kerja_id === satker.kode,
                      )
                      .sort((a, b) =>
                        (a.kode || "").localeCompare(b.kode || ""),
                      );

                    return (
                      <div
                        key={satkerId}
                        className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
                      >
                        {/* Satker Level Card Header */}
                        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/70">
                          <div className="flex items-start sm:items-center gap-3">
                            <button
                              type="button"
                              onClick={() => toggleSatkerExpand(satkerId)}
                              className="mt-0.5 sm:mt-0 p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors cursor-pointer shrink-0"
                              title={
                                isExpanded
                                  ? "Tutup unit kerja"
                                  : "Buka unit kerja"
                              }
                            >
                              <svg
                                className={`size-4 transition-transform duration-200 ${
                                  isExpanded ? "rotate-90" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>

                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md font-mono text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                  {satker.kode || "KODE-SATKER"}
                                </span>
                                {satker.singkatan && (
                                  <span className="text-xs font-semibold text-slate-500">
                                    ({satker.singkatan})
                                  </span>
                                )}
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                  SATUAN KERJA
                                </span>
                              </div>
                              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                                {satker.nama}
                              </h3>
                              {satker.instansi_induk && (
                                <p className="text-xs text-slate-500 mt-0.5">
                                  Induk: {satker.instansi_induk}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 self-end sm:self-center">
                            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200">
                              {childUnits.length} Unit Kerja
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-xs border border-emerald-200">
                              {satker.total_pegawai || 0} Pegawai
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleOpenDetail(
                                  {
                                    level: "satker",
                                    id: satker.id,
                                    kode: satker.kode,
                                    nama: satker.nama,
                                    data: satker,
                                  },
                                  "pegawai",
                                )
                              }
                              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                            >
                              Lihat Pegawai
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleOpenDetail(
                                  {
                                    level: "satker",
                                    id: satker.id,
                                    kode: satker.kode,
                                    nama: satker.nama,
                                    data: satker,
                                  },
                                  "info",
                                )
                              }
                              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition-colors cursor-pointer"
                            >
                              Detail
                            </button>
                          </div>
                        </div>

                        {/* Child Units Accordion Content */}
                        {isExpanded && (
                          <div className="p-4 sm:p-6 bg-slate-50/50 space-y-3">
                            {childUnits.length === 0 ? (
                              <p className="text-xs text-slate-500 italic pl-6">
                                Belum ada Unit Kerja terdaftar di bawah Satuan
                                Kerja ini.
                              </p>
                            ) : (
                              childUnits.map((unit) => {
                                const unitId = unit.id || unit.kode;
                                const isUnitExpanded = !!expandedUnits[unitId];

                                // Find child sub-units under this unit
                                const childSubUnits = subUnitKerjaList
                                  .filter(
                                    (sub) =>
                                      sub.unit_kerja_id === unit.id ||
                                      sub.unit_kerja_nama === unit.nama ||
                                      sub.unit_kerja_id === unit.kode,
                                  )
                                  .sort((a, b) =>
                                    (a.kode || "").localeCompare(b.kode || ""),
                                  );

                                return (
                                  <div
                                    key={unitId}
                                    className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden ml-2 sm:ml-6"
                                  >
                                    {/* Unit Level Row Header */}
                                    <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white">
                                      <div className="flex items-start sm:items-center gap-2.5">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            toggleUnitExpand(unitId)
                                          }
                                          className="mt-0.5 sm:mt-0 p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer shrink-0"
                                          title={
                                            isUnitExpanded
                                              ? "Tutup sub unit"
                                              : "Buka sub unit"
                                          }
                                        >
                                          <svg
                                            className={`size-3.5 transition-transform duration-200 ${
                                              isUnitExpanded ? "rotate-90" : ""
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M9 5l7 7-7 7"
                                            />
                                          </svg>
                                        </button>

                                        <div>
                                          <div className="flex flex-wrap items-center gap-1.5">
                                            <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                                              {unit.kode || "KODE-UNIT"}
                                            </span>
                                            {unit.eselon && (
                                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                                                Eselon {unit.eselon}
                                              </span>
                                            )}
                                            {unit.lokasi && (
                                              <span className="text-[10px] text-slate-500">
                                                • {unit.lokasi}
                                              </span>
                                            )}
                                          </div>
                                          <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                                            {unit.nama}
                                          </h4>
                                        </div>
                                      </div>

                                      <div className="flex flex-wrap items-center gap-2 self-end sm:self-center">
                                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                                          {childSubUnits.length} Sub Unit
                                        </span>
                                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                          {unit.total_pegawai || 0} Pegawai
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleOpenDetail(
                                              {
                                                level: "unit",
                                                id: unit.id,
                                                kode: unit.kode,
                                                nama: unit.nama,
                                                data: unit,
                                              },
                                              "pegawai",
                                            )
                                          }
                                          className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 transition-colors cursor-pointer"
                                        >
                                          Pegawai
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleOpenDetail(
                                              {
                                                level: "unit",
                                                id: unit.id,
                                                kode: unit.kode,
                                                nama: unit.nama,
                                                data: unit,
                                              },
                                              "info",
                                            )
                                          }
                                          className="px-2 py-1 rounded text-slate-600 hover:text-slate-900 text-xs font-medium transition-colors cursor-pointer"
                                        >
                                          Detail
                                        </button>
                                      </div>
                                    </div>

                                    {/* Sub Unit Level Leaf Nodes */}
                                    {isUnitExpanded && (
                                      <div className="p-3 bg-slate-50/70 border-t border-slate-100 space-y-2">
                                        {childSubUnits.length === 0 ? (
                                          <p className="text-[11px] text-slate-500 italic pl-6">
                                            Belum ada data Sub Unit Kerja di
                                            bawah kantor ini.
                                          </p>
                                        ) : (
                                          childSubUnits.map((subUnit) => (
                                            <div
                                              key={subUnit.id || subUnit.kode}
                                              className="p-2.5 rounded-lg bg-white border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ml-4 sm:ml-8 hover:border-slate-300 transition-colors"
                                            >
                                              <div className="flex items-center gap-2">
                                                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
                                                  {subUnit.kode || "SUB-KODE"}
                                                </span>
                                                <span className="text-xs font-semibold text-slate-800">
                                                  {subUnit.nama}
                                                </span>
                                              </div>

                                              <div className="flex items-center gap-2 self-end sm:self-center">
                                                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                  {subUnit.total_pegawai || 0}{" "}
                                                  Pegawai
                                                </span>
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    handleOpenDetail(
                                                      {
                                                        level: "subunit",
                                                        id: subUnit.id,
                                                        kode: subUnit.kode,
                                                        nama: subUnit.nama,
                                                        data: subUnit,
                                                      },
                                                      "pegawai",
                                                    )
                                                  }
                                                  className="px-2 py-0.5 rounded text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                                                >
                                                  Pegawai
                                                </button>
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    handleOpenDetail(
                                                      {
                                                        level: "subunit",
                                                        id: subUnit.id,
                                                        kode: subUnit.kode,
                                                        nama: subUnit.nama,
                                                        data: subUnit,
                                                      },
                                                      "info",
                                                    )
                                                  }
                                                  className="px-2 py-0.5 rounded text-[11px] font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                                                >
                                                  Detail
                                                </button>
                                              </div>
                                            </div>
                                          ))
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* ─── TAB 2: SATUAN KERJA (TABLE & GRID) ─── */}
            {activeTab === "satker" && (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                {viewMode === "table" ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          <th className="py-3 px-4 w-12 text-center">No</th>
                          <th className="py-3 px-4 w-32">Kode</th>
                          <th className="py-3 px-4">Nama Satuan Kerja</th>
                          <th className="py-3 px-4">Singkatan</th>
                          <th className="py-3 px-4">Instansi Induk</th>
                          <th className="py-3 px-4 text-center">Total Unit</th>
                          <th className="py-3 px-4 text-center">
                            Total Pegawai
                          </th>
                          <th className="py-3 px-4 text-center w-36">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                        {currentItems.length === 0 ? (
                          <tr>
                            <td
                              colSpan={8}
                              className="py-8 text-center text-slate-400"
                            >
                              Tidak ada data Satuan Kerja ditemukan.
                            </td>
                          </tr>
                        ) : (
                          currentItems.map((satker: SatuanKerjaItem, idx) => (
                            <tr
                              key={satker.id || satker.kode}
                              className="hover:bg-slate-50/60 transition-colors"
                            >
                              <td className="py-3 px-4 text-center text-slate-400 font-mono">
                                {(currentPage - 1) * pageSize + idx + 1}
                              </td>
                              <td className="py-3 px-4">
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    handleCopyText(
                                      satker.kode,
                                      "Kode Satker",
                                      e,
                                    )
                                  }
                                  className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 hover:bg-blue-100 cursor-pointer flex items-center gap-1"
                                  title="Klik untuk salin kode"
                                >
                                  <span>{satker.kode || "-"}</span>
                                  <svg
                                    className="size-3 text-blue-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                  </svg>
                                </button>
                              </td>
                              <td className="py-3 px-4 font-semibold text-slate-900">
                                {satker.nama}
                              </td>
                              <td className="py-3 px-4 font-medium text-slate-600">
                                {satker.singkatan || "-"}
                              </td>
                              <td className="py-3 px-4 text-slate-500">
                                {satker.instansi_induk ||
                                  "Kementerian Perhubungan"}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className="px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-700">
                                  {satker.total_unit_kerja || 0} Unit
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  {satker.total_pegawai || 0}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <div className="inline-flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleOpenDetail(
                                        {
                                          level: "satker",
                                          id: satker.id,
                                          kode: satker.kode,
                                          nama: satker.nama,
                                          data: satker,
                                        },
                                        "pegawai",
                                      )
                                    }
                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                    title="Lihat Daftar Pegawai Satker"
                                  >
                                    <svg
                                      className="size-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleOpenDetail(
                                        {
                                          level: "satker",
                                          id: satker.id,
                                          kode: satker.kode,
                                          nama: satker.nama,
                                          data: satker,
                                        },
                                        "info",
                                      )
                                    }
                                    className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                    title="Detail Lengkap Satker"
                                  >
                                    <svg
                                      className="size-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentItems.map((satker: SatuanKerjaItem) => (
                      <div
                        key={satker.id || satker.kode}
                        className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                              {satker.kode}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              Satker
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 mb-1">
                            {satker.nama}
                          </h4>
                          {satker.singkatan && (
                            <p className="text-xs text-slate-500 mb-2 font-medium">
                              {satker.singkatan}
                            </p>
                          )}
                          <div className="text-xs text-slate-500 space-y-1 mb-4">
                            <p>Induk: {satker.instansi_induk || "Kemenhub"}</p>
                            {satker.alamat && (
                              <p className="truncate">
                                Alamat: {satker.alamat}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-600">
                            {satker.total_pegawai || 0} Pegawai
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenDetail(
                                {
                                  level: "satker",
                                  id: satker.id,
                                  kode: satker.kode,
                                  nama: satker.nama,
                                  data: satker,
                                },
                                "pegawai",
                              )
                            }
                            className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
                          >
                            Buka Pegawai
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {renderPaginationControls()}
              </div>
            )}

            {/* ─── TAB 3: UNIT KERJA (TABLE & GRID) ─── */}
            {activeTab === "unit" && (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                {viewMode === "table" ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          <th className="py-3 px-4 w-12 text-center">No</th>
                          <th className="py-3 px-4 w-32">Kode</th>
                          <th className="py-3 px-4">Nama Unit Kerja</th>
                          <th className="py-3 px-4">Satuan Kerja Induk</th>
                          <th className="py-3 px-4">Eselon / Lokasi</th>
                          <th className="py-3 px-4 text-center">Sub Unit</th>
                          <th className="py-3 px-4 text-center">
                            Total Pegawai
                          </th>
                          <th className="py-3 px-4 text-center w-36">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                        {currentItems.length === 0 ? (
                          <tr>
                            <td
                              colSpan={8}
                              className="py-8 text-center text-slate-400"
                            >
                              Tidak ada data Unit Kerja ditemukan.
                            </td>
                          </tr>
                        ) : (
                          currentItems.map((unit: UnitKerjaItem, idx) => (
                            <tr
                              key={unit.id || unit.kode}
                              className="hover:bg-slate-50/60 transition-colors"
                            >
                              <td className="py-3 px-4 text-center text-slate-400 font-mono">
                                {(currentPage - 1) * pageSize + idx + 1}
                              </td>
                              <td className="py-3 px-4">
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    handleCopyText(
                                      unit.kode,
                                      "Kode Unit Kerja",
                                      e,
                                    )
                                  }
                                  className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 hover:bg-emerald-100 cursor-pointer flex items-center gap-1"
                                  title="Klik untuk salin kode"
                                >
                                  <span>{unit.kode || "-"}</span>
                                  <svg
                                    className="size-3 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                  </svg>
                                </button>
                              </td>
                              <td className="py-3 px-4 font-semibold text-slate-900">
                                {unit.nama}
                              </td>
                              <td className="py-3 px-4 font-medium text-slate-600">
                                {unit.satuan_kerja_nama || "-"}
                              </td>
                              <td className="py-3 px-4 text-slate-500">
                                <div className="flex items-center gap-1.5">
                                  {unit.eselon && (
                                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                                      Eselon {unit.eselon}
                                    </span>
                                  )}
                                  <span>{unit.lokasi || "-"}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className="px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-700">
                                  {unit.total_sub_unit_kerja || 0} Sub Unit
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  {unit.total_pegawai || 0}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <div className="inline-flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleOpenDetail(
                                        {
                                          level: "unit",
                                          id: unit.id,
                                          kode: unit.kode,
                                          nama: unit.nama,
                                          data: unit,
                                        },
                                        "pegawai",
                                      )
                                    }
                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                    title="Lihat Daftar Pegawai Unit Kerja"
                                  >
                                    <svg
                                      className="size-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleOpenDetail(
                                        {
                                          level: "unit",
                                          id: unit.id,
                                          kode: unit.kode,
                                          nama: unit.nama,
                                          data: unit,
                                        },
                                        "info",
                                      )
                                    }
                                    className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                    title="Detail Lengkap Unit Kerja"
                                  >
                                    <svg
                                      className="size-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentItems.map((unit: UnitKerjaItem) => (
                      <div
                        key={unit.id || unit.kode}
                        className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                              {unit.kode}
                            </span>
                            {unit.eselon && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                                Eselon {unit.eselon}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 mb-1">
                            {unit.nama}
                          </h4>
                          <p className="text-xs text-slate-500 mb-2 font-medium">
                            Satker: {unit.satuan_kerja_nama || "-"}
                          </p>
                          {unit.lokasi && (
                            <p className="text-xs text-slate-500 mb-4">
                              Lokasi: {unit.lokasi}
                            </p>
                          )}
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-600">
                            {unit.total_pegawai || 0} Pegawai
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenDetail(
                                {
                                  level: "unit",
                                  id: unit.id,
                                  kode: unit.kode,
                                  nama: unit.nama,
                                  data: unit,
                                },
                                "pegawai",
                              )
                            }
                            className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
                          >
                            Buka Pegawai
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {renderPaginationControls()}
              </div>
            )}

            {/* ─── TAB 4: SUB UNIT KERJA (TABLE & GRID) ─── */}
            {activeTab === "subunit" && (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                {viewMode === "table" ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          <th className="py-3 px-4 w-12 text-center">No</th>
                          <th className="py-3 px-4 w-32">Kode</th>
                          <th className="py-3 px-4">Nama Sub Unit Kerja</th>
                          <th className="py-3 px-4">Unit Kerja Induk</th>
                          <th className="py-3 px-4">Satuan Kerja Induk</th>
                          <th className="py-3 px-4 text-center">
                            Total Pegawai
                          </th>
                          <th className="py-3 px-4 text-center w-36">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                        {currentItems.length === 0 ? (
                          <tr>
                            <td
                              colSpan={7}
                              className="py-8 text-center text-slate-400"
                            >
                              Tidak ada data Sub Unit Kerja ditemukan.
                            </td>
                          </tr>
                        ) : (
                          currentItems.map((sub: SubUnitKerjaItem, idx) => (
                            <tr
                              key={sub.id || sub.kode}
                              className="hover:bg-slate-50/60 transition-colors"
                            >
                              <td className="py-3 px-4 text-center text-slate-400 font-mono">
                                {(currentPage - 1) * pageSize + idx + 1}
                              </td>
                              <td className="py-3 px-4">
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    handleCopyText(sub.kode, "Kode Sub Unit", e)
                                  }
                                  className="font-mono font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 hover:bg-indigo-100 cursor-pointer flex items-center gap-1"
                                  title="Klik untuk salin kode"
                                >
                                  <span>{sub.kode || "-"}</span>
                                  <svg
                                    className="size-3 text-indigo-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                  </svg>
                                </button>
                              </td>
                              <td className="py-3 px-4 font-semibold text-slate-900">
                                {sub.nama}
                              </td>
                              <td className="py-3 px-4 font-medium text-slate-600">
                                {sub.unit_kerja_nama || "-"}
                              </td>
                              <td className="py-3 px-4 text-slate-500">
                                {sub.satuan_kerja_nama || "-"}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  {sub.total_pegawai || 0}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <div className="inline-flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleOpenDetail(
                                        {
                                          level: "subunit",
                                          id: sub.id,
                                          kode: sub.kode,
                                          nama: sub.nama,
                                          data: sub,
                                        },
                                        "pegawai",
                                      )
                                    }
                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                    title="Lihat Daftar Pegawai Sub Unit Kerja"
                                  >
                                    <svg
                                      className="size-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleOpenDetail(
                                        {
                                          level: "subunit",
                                          id: sub.id,
                                          kode: sub.kode,
                                          nama: sub.nama,
                                          data: sub,
                                        },
                                        "info",
                                      )
                                    }
                                    className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                    title="Detail Lengkap Sub Unit Kerja"
                                  >
                                    <svg
                                      className="size-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentItems.map((sub: SubUnitKerjaItem) => (
                      <div
                        key={sub.id || sub.kode}
                        className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                              {sub.kode}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              Sub Unit
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 mb-1">
                            {sub.nama}
                          </h4>
                          <p className="text-xs text-slate-600 mb-1 font-medium">
                            Unit: {sub.unit_kerja_nama || "-"}
                          </p>
                          <p className="text-xs text-slate-400 mb-4">
                            Satker: {sub.satuan_kerja_nama || "-"}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-600">
                            {sub.total_pegawai || 0} Pegawai
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenDetail(
                                {
                                  level: "subunit",
                                  id: sub.id,
                                  kode: sub.kode,
                                  nama: sub.nama,
                                  data: sub,
                                },
                                "pegawai",
                              )
                            }
                            className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 transition-colors cursor-pointer"
                          >
                            Buka Pegawai
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {renderPaginationControls()}
              </div>
            )}
          </>
        )}
      </main>

      {/* ─── MODAL: DETAIL INSTANSI & DAFTAR PEGAWAI ─── */}
      {selectedEntity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
          onClick={() => setSelectedEntity(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-[#0a2540] to-[#1e3a5f] text-white flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-900">
                    {selectedEntity.kode || "KODE"}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 uppercase tracking-wider">
                    {selectedEntity.level === "satker"
                      ? "Satuan Kerja"
                      : selectedEntity.level === "unit"
                        ? "Unit Kerja"
                        : "Sub Unit Kerja"}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {selectedEntity.nama}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEntity(null)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <svg
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Tab Switcher */}
            <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-200 bg-slate-50">
              <button
                type="button"
                onClick={() => setModalTab("info")}
                className={`px-4 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                  modalTab === "info"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                Informasi & Profil
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalTab("pegawai");
                  loadModalPegawai(selectedEntity, 1, modalPegawaiSearch);
                }}
                className={`px-4 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  modalTab === "pegawai"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                <span>Daftar Pegawai Bertugas</span>
                {modalPegawaiTotal > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-100 text-blue-700">
                    {modalPegawaiTotal}
                  </span>
                )}
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {modalTab === "info" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Kode Entitas
                      </span>
                      <span className="font-mono text-sm font-bold text-slate-900">
                        {selectedEntity.kode || "-"}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Tingkat / Hirarki
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {selectedEntity.level === "satker"
                          ? "Satuan Kerja (Tingkat 1 - Induk)"
                          : selectedEntity.level === "unit"
                            ? "Unit Kerja (Tingkat 2 - Kantor / Balai)"
                            : "Sub Unit Kerja (Tingkat 3 - Bagian / Bidang)"}
                      </span>
                    </div>

                    {/* Satker Specific Info */}
                    {selectedEntity.level === "satker" && (
                      <>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Singkatan
                          </span>
                          <span className="text-sm font-medium text-slate-900">
                            {(selectedEntity.data as SatuanKerjaItem)
                              .singkatan || "-"}
                          </span>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Instansi Induk
                          </span>
                          <span className="text-sm font-medium text-slate-900">
                            {(selectedEntity.data as SatuanKerjaItem)
                              .instansi_induk || "Kementerian Perhubungan"}
                          </span>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 sm:col-span-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Alamat / Kontak
                          </span>
                          <span className="text-sm text-slate-700">
                            {(selectedEntity.data as SatuanKerjaItem).alamat ||
                              "Alamat kantor belum terdata"}
                            {(selectedEntity.data as SatuanKerjaItem).telepon
                              ? ` • Telp: ${(selectedEntity.data as SatuanKerjaItem).telepon}`
                              : ""}
                          </span>
                        </div>
                      </>
                    )}

                    {/* Unit Kerja Specific Info */}
                    {selectedEntity.level === "unit" && (
                      <>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Satuan Kerja Induk
                          </span>
                          <span className="text-sm font-medium text-slate-900">
                            {(selectedEntity.data as UnitKerjaItem)
                              .satuan_kerja_nama || "-"}
                          </span>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Eselon / Level
                          </span>
                          <span className="text-sm font-medium text-slate-900">
                            {(selectedEntity.data as UnitKerjaItem).eselon
                              ? `Eselon ${(selectedEntity.data as UnitKerjaItem).eselon}`
                              : "-"}
                          </span>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 sm:col-span-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Lokasi / Wilayah Kerja
                          </span>
                          <span className="text-sm text-slate-700">
                            {(selectedEntity.data as UnitKerjaItem).lokasi ||
                              "-"}
                            {(selectedEntity.data as UnitKerjaItem).alamat
                              ? ` • ${(selectedEntity.data as UnitKerjaItem).alamat}`
                              : ""}
                          </span>
                        </div>
                      </>
                    )}

                    {/* Sub Unit Specific Info */}
                    {selectedEntity.level === "subunit" && (
                      <>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Unit Kerja Induk
                          </span>
                          <span className="text-sm font-medium text-slate-900">
                            {(selectedEntity.data as SubUnitKerjaItem)
                              .unit_kerja_nama || "-"}
                          </span>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Satuan Kerja Induk
                          </span>
                          <span className="text-sm font-medium text-slate-900">
                            {(selectedEntity.data as SubUnitKerjaItem)
                              .satuan_kerja_nama || "-"}
                          </span>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 sm:col-span-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Deskripsi / Tugas Fungsi
                          </span>
                          <span className="text-sm text-slate-700">
                            {(selectedEntity.data as SubUnitKerjaItem)
                              .deskripsi || "Tidak ada deskripsi tambahan"}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {modalTab === "pegawai" && (
                <div className="space-y-4">
                  {/* Search bar inside modal */}
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="text"
                      placeholder="Cari pegawai berdasarkan NIP atau nama..."
                      value={modalPegawaiSearch}
                      onChange={(e) => setModalPegawaiSearch(e.target.value)}
                      className="flex-1 px-3.5 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        loadModalPegawai(selectedEntity, 1, modalPegawaiSearch)
                      }
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl cursor-pointer"
                    >
                      Cari
                    </button>
                  </div>

                  {modalPegawaiLoading ? (
                    <div className="py-12 text-center">
                      <div className="inline-block size-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-2" />
                      <p className="text-xs text-slate-500">
                        Memuat pegawai bertugas...
                      </p>
                    </div>
                  ) : modalPegawaiList.length === 0 ? (
                    <div className="py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                      <p className="text-xs text-slate-500">
                        Tidak ada data pegawai yang terdaftar pada unit ini.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto border border-slate-200 rounded-xl">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                            <th className="py-2.5 px-3 w-10 text-center">No</th>
                            <th className="py-2.5 px-3">Pegawai / NIP</th>
                            <th className="py-2.5 px-3">Jabatan</th>
                            <th className="py-2.5 px-3">Pangkat / Gol</th>
                            <th className="py-2.5 px-3 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {modalPegawaiList.map((p, idx) => (
                            <tr key={p.nip} className="hover:bg-slate-50/70">
                              <td className="py-2.5 px-3 text-center text-slate-400 font-mono">
                                {(modalPegawaiPage - 1) * modalPageSize +
                                  idx +
                                  1}
                              </td>
                              <td className="py-2.5 px-3">
                                <div className="font-bold text-slate-900">
                                  {p.nama}
                                </div>
                                <div className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
                                  <span>{p.nip}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyText(p.nip, "NIP")}
                                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                    title="Salin NIP"
                                  >
                                    <svg
                                      className="size-3"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                              <td className="py-2.5 px-3 text-slate-700">
                                {p.jabatan || "-"}
                              </td>
                              <td className="py-2.5 px-3 text-slate-600">
                                {[p.pangkat, p.golongan_ruang]
                                  .filter(Boolean)
                                  .join(" / ") || "-"}
                              </td>
                              <td className="py-2.5 px-3 text-center">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    p.status_kepegawaian === "PNS"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-indigo-100 text-indigo-800"
                                  }`}
                                >
                                  {p.status_kepegawaian || "PNS"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Modal Pagination */}
                  {modalPegawaiTotal > modalPageSize && (
                    <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
                      <span>Total: {modalPegawaiTotal} pegawai</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={modalPegawaiPage === 1}
                          onClick={() =>
                            setModalPegawaiPage((p) => Math.max(1, p - 1))
                          }
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-40 cursor-pointer"
                        >
                          Sebelumnya
                        </button>
                        <span className="px-2 font-semibold">
                          Hal {modalPegawaiPage}
                        </span>
                        <button
                          type="button"
                          disabled={
                            modalPegawaiPage * modalPageSize >=
                            modalPegawaiTotal
                          }
                          onClick={() => setModalPegawaiPage((p) => p + 1)}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-40 cursor-pointer"
                        >
                          Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSelectedEntity(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-xl cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: SINKRONISASI SIK ─── */}
      {isSyncModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
          onClick={() => !isSyncing && setIsSyncModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <svg
                  className="size-5"
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
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Sinkronisasi Referensi SIK
                </h3>
                <p className="text-xs text-slate-500">
                  Perbarui master instansi dari database SIK Kemenhub
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Proses ini akan memindai seluruh unit organisasi resmi dan
              memperbarui tabel referensi Satuan Kerja, Unit Kerja, dan Sub Unit
              Kerja beserta kode unit terkait.
            </p>

            <div className="space-y-2 mb-6">
              <label className="text-xs font-semibold text-slate-700 block">
                Pilih Tingkat Sinkronisasi:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSyncTarget("all")}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer font-medium transition-colors ${
                    syncTarget === "all"
                      ? "border-blue-500 bg-blue-50 text-blue-800 font-bold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  Semua Tingkat (Direkomendasikan)
                </button>
                <button
                  type="button"
                  onClick={() => setSyncTarget("satker")}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer font-medium transition-colors ${
                    syncTarget === "satker"
                      ? "border-blue-500 bg-blue-50 text-blue-800 font-bold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  Hanya Satuan Kerja
                </button>
                <button
                  type="button"
                  onClick={() => setSyncTarget("unit")}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer font-medium transition-colors ${
                    syncTarget === "unit"
                      ? "border-blue-500 bg-blue-50 text-blue-800 font-bold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  Hanya Unit Kerja
                </button>
                <button
                  type="button"
                  onClick={() => setSyncTarget("subunit")}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer font-medium transition-colors ${
                    syncTarget === "subunit"
                      ? "border-blue-500 bg-blue-50 text-blue-800 font-bold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  Hanya Sub Unit Kerja
                </button>
              </div>
            </div>

            {syncStatusMsg && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl mb-4 text-xs text-blue-800 flex items-center gap-2">
                <div className="size-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0" />
                <span>{syncStatusMsg}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                disabled={isSyncing}
                onClick={() => setIsSyncModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isSyncing}
                onClick={handleRunSync}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-2"
              >
                {isSyncing ? (
                  <>
                    <div className="size-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menyinkronkan...</span>
                  </>
                ) : (
                  <span>Mulai Sinkronisasi</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce-in">
          <div
            className={`p-4 rounded-xl shadow-xl border flex items-start gap-3 ${
              toast.type === "success"
                ? "bg-emerald-900/90 text-white border-emerald-700"
                : toast.type === "error"
                  ? "bg-rose-900/90 text-white border-rose-700"
                  : "bg-slate-900/90 text-white border-slate-700"
            }`}
          >
            <div className="mt-0.5">
              {toast.type === "success" ? (
                <svg
                  className="size-5 text-emerald-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : toast.type === "error" ? (
                <svg
                  className="size-5 text-rose-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="size-5 text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold">{toast.title}</h4>
              <p className="text-[11px] opacity-90 mt-0.5">{toast.message}</p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <AppFooter />
    </div>
  );
}

export default function MasterInstansiPage() {
  return (
    <AdminGuard>
      <MasterInstansiContent />
    </AdminGuard>
  );
}
