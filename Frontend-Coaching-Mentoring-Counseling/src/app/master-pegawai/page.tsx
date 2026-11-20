"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import { AppNavbar, AppFooter } from "@/components/common";
import {
  searchSikPegawai,
  fetchSikPegawai,
  syncMyProfileWithSIK,
  syncMasterSIK,
  resetPegawaiPassword,
  ResetPasswordResult,
  fetchPegawaiRoleInfo,
  updatePegawaiRole,
  PegawaiRoleInfo,
  SIKPegawai,
  SIKSyncData,
  UnitSyncResult,
  fetchSatuanKerjaList,
  fetchUnitKerjaList,
  fetchSubUnitKerjaList,
  SatuanKerjaItem,
  UnitKerjaItem,
  SubUnitKerjaItem,
} from "@/lib/api";

export default function MasterPegawaiPage() {
  const [pegawaiList, setPegawaiList] = useState<SIKPegawai[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingPegawai, setIsFetchingPegawai] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination & Server-side filtering
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [jumpPageInput, setJumpPageInput] = useState<string>("");

  // Master Organization References (Hierarki: Satker -> Unit Kerja -> Sub Unit Kerja)
  const [satuanKerjaList, setSatuanKerjaList] = useState<SatuanKerjaItem[]>([]);
  const [unitKerjaList, setUnitKerjaList] = useState<UnitKerjaItem[]>([]);
  const [subUnitKerjaList, setSubUnitKerjaList] = useState<SubUnitKerjaItem[]>(
    [],
  );

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSatker, setSelectedSatker] = useState<string>("all");
  const [selectedUnit, setSelectedUnit] = useState<string>("all");
  const [selectedSubUnit, setSelectedSubUnit] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Global Statistics (Overview Cards)
  const [globalStats, setGlobalStats] = useState<{
    total: number;
    pnsCount: number;
    pppkCount: number;
    unitsCount: number;
  }>({
    total: 0,
    pnsCount: 0,
    pppkCount: 0,
    unitsCount: 0,
  });

  // Detail Modal
  const [selectedPegawai, setSelectedPegawai] = useState<SIKPegawai | null>(
    null,
  );
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Reset Password Modal states
  const [pegawaiToReset, setPegawaiToReset] = useState<SIKPegawai | null>(null);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [resetSuccessResult, setResetSuccessResult] =
    useState<ResetPasswordResult | null>(null);

  // Set Role Modal states
  const [pegawaiToSetRole, setPegawaiToSetRole] = useState<SIKPegawai | null>(
    null,
  );
  const [roleInfoLoading, setRoleInfoLoading] = useState(false);
  const [roleInfo, setRoleInfo] = useState<PegawaiRoleInfo | null>(null);
  const [targetRole, setTargetRole] = useState<string>("admin");
  const [isSavingRole, setIsSavingRole] = useState(false);

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [selectedUnitsToSync, setSelectedUnitsToSync] = useState<string[]>([]);
  const [syncSearchQuery, setSyncSearchQuery] = useState("");
  const [syncResultData, setSyncResultData] = useState<SIKSyncData | null>(
    null,
  );

  // Toast state
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

  // Initial Load: employee list, master organization references, and global counts
  const loadInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [empRes, satkerData, unitData, subUnitData, pnsRes, pppkRes] =
        await Promise.all([
          searchSikPegawai("", pageSize, 0),
          fetchSatuanKerjaList().catch(() => []),
          fetchUnitKerjaList().catch(() => []),
          fetchSubUnitKerjaList().catch(() => []),
          searchSikPegawai("", 1, 0, "", "", "", "PNS").catch(() => ({
            total: 0,
          })),
          searchSikPegawai("", 1, 0, "", "", "", "PPPK").catch(() => ({
            total: 0,
          })),
        ]);

      setPegawaiList(empRes.items || []);
      setTotalCount(empRes.total || 0);
      setSatuanKerjaList(satkerData || []);
      setUnitKerjaList(unitData || []);
      setSubUnitKerjaList(subUnitData || []);

      setGlobalStats({
        total: empRes.total || 0,
        pnsCount: pnsRes.total || 0,
        pppkCount: pppkRes.total || 0,
        unitsCount: unitData && unitData.length > 0 ? unitData.length : 0,
      });
    } catch (err: any) {
      console.error("Gagal memuat master data pegawai:", err);
      setError(
        "Gagal menghubungi layanan SIK. Pastikan server backend sedang berjalan.",
      );
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Debounce search query input (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Reset to page 1 whenever any filter or search query changes
  const isInitialFilterMount = useRef(true);
  useEffect(() => {
    if (isInitialFilterMount.current) {
      isInitialFilterMount.current = false;
      return;
    }
    setCurrentPage(1);
  }, [
    debouncedSearch,
    selectedSatker,
    selectedUnit,
    selectedSubUnit,
    selectedStatus,
    pageSize,
  ]);

  // Fetch paginated employee data from backend on page change or filter update
  useEffect(() => {
    if (loading) return;

    let isCancelled = false;
    const fetchPage = async () => {
      setIsFetchingPegawai(true);
      try {
        const offset = (currentPage - 1) * pageSize;
        const res = await searchSikPegawai(
          debouncedSearch,
          pageSize,
          offset,
          selectedUnit !== "all" ? selectedUnit : "",
          selectedSubUnit !== "all" ? selectedSubUnit : "",
          selectedSatker !== "all" ? selectedSatker : "",
          selectedStatus !== "all" ? selectedStatus : "",
        );
        if (!isCancelled) {
          setPegawaiList(res.items || []);
          setTotalCount(res.total || 0);
        }
      } catch (err) {
        console.error("Gagal memuat pegawai halaman ini:", err);
      } finally {
        if (!isCancelled) {
          setIsFetchingPegawai(false);
        }
      }
    };

    fetchPage();

    return () => {
      isCancelled = true;
    };
  }, [
    currentPage,
    pageSize,
    debouncedSearch,
    selectedSatker,
    selectedUnit,
    selectedSubUnit,
    selectedStatus,
    loading,
  ]);

  // Open Multi-Office Sync Modal with optional initial unit pre-selection
  const handleOpenSyncModal = (initialUnitNama?: string) => {
    setSyncResultData(null);
    setSyncSearchQuery("");

    let targets: string[] = [];
    if (initialUnitNama && initialUnitNama !== "all") {
      targets = [initialUnitNama];
    } else if (selectedUnit && selectedUnit !== "all") {
      targets = [selectedUnit];
    } else if (selectedUnitsToSync.length > 0) {
      targets = selectedUnitsToSync.slice(0, 5);
    } else {
      // Default to Pusbang SDM Aparatur if available
      const defaultUnit = unitKerjaList.find(
        (u) =>
          u.nama.toLowerCase().includes("aparatur") ||
          (u.id && u.id.includes("aparatur")),
      );
      if (defaultUnit) {
        targets = [defaultUnit.nama];
      }
    }
    setSelectedUnitsToSync(targets);
    setIsSyncModalOpen(true);
  };

  // Toggle selection with max 5 offices constraint
  const handleToggleUnitToSync = (unitNama: string) => {
    setSelectedUnitsToSync((prev) => {
      if (prev.includes(unitNama)) {
        return prev.filter((item) => item !== unitNama);
      }
      if (prev.length >= 5) {
        showToast(
          "Batas Maksimal Tercapai",
          "Maksimal 5 kantor untuk disinkronkan secara bersamaan.",
          "info",
        );
        return prev;
      }
      return [...prev, unitNama];
    });
  };

  // Execute Multiple Office Sync
  const handleExecuteMultiSync = async () => {
    if (selectedUnitsToSync.length === 0) {
      showToast(
        "Pilih Kantor",
        "Silakan pilih minimal 1 kantor untuk disinkronkan.",
        "info",
      );
      return;
    }
    if (selectedUnitsToSync.length > 5) {
      showToast(
        "Batas Maksimal",
        "Maksimal 5 kantor untuk disinkronkan secara bersamaan.",
        "error",
      );
      return;
    }

    setIsSyncing(true);
    setSyncResultData(null);
    try {
      const res = await syncMasterSIK(selectedUnitsToSync, selectedUnitsToSync);
      if (res.success && res.data) {
        setSyncResultData(res.data);
        showToast(
          "Sinkronisasi Berhasil",
          res.message ||
            `Sinkronisasi ${selectedUnitsToSync.length} kantor berhasil diselesaikan.`,
          "success",
        );
        // Refresh local user profile if logged in
        await syncMyProfileWithSIK().catch(() => null);
        await loadInitialData();
      } else {
        showToast("Gagal Sinkronisasi", res.message, "error");
      }
    } catch (err: any) {
      showToast(
        "Sinkronisasi Gagal",
        "Gagal memperbarui data dari SIK.",
        "error",
      );
    } finally {
      setIsSyncing(false);
    }
  };

  // Open detail modal with full SIK attributes
  const handleOpenDetail = async (pegawai: SIKPegawai) => {
    setSelectedPegawai(pegawai);
    setLoadingDetail(true);
    try {
      const fullData = await fetchSikPegawai(pegawai.nip);
      if (fullData) {
        setSelectedPegawai(fullData);
      }
    } catch (err) {
      console.warn("Gagal mengambil detail mendalam pegawai:", err);
    } finally {
      setLoadingDetail(false);
    }
  };

  // Copy NIP helper
  const handleCopyNip = (nip: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(nip);
    showToast("NIP Disalin", `NIP ${nip} telah disalin ke clipboard.`);
  };

  // Reset Password handlers
  const handleRequestResetPassword = (p: SIKPegawai, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPegawaiToReset(p);
    setResetSuccessResult(null);
  };

  const handleConfirmResetPassword = async () => {
    if (!pegawaiToReset) return;
    setIsResettingPassword(true);
    try {
      const res = await resetPegawaiPassword(pegawaiToReset.nip);
      setResetSuccessResult(
        res.data || {
          nip: pegawaiToReset.nip,
          nama: formatFullName(pegawaiToReset),
          password_default: pegawaiToReset.nip,
          role: "pegawai",
          email: pegawaiToReset.email_dinas,
        },
      );
      showToast(
        "Kata Sandi Direset",
        `Kata sandi untuk NIP ${pegawaiToReset.nip} berhasil diatur menjadi NIP.`,
        "success",
      );
    } catch (err: any) {
      showToast(
        "Gagal Reset Kata Sandi",
        err.message ||
          "Terjadi kesalahan saat mengatur ulang kata sandi pegawai.",
        "error",
      );
    } finally {
      setIsResettingPassword(false);
    }
  };

  // Set Role handlers
  const handleOpenSetRoleModal = async (
    p: SIKPegawai,
    e?: React.MouseEvent,
  ) => {
    if (e) e.stopPropagation();
    setPegawaiToSetRole(p);
    setRoleInfo(null);
    setRoleInfoLoading(true);
    setTargetRole(p.system_role || "admin");
    try {
      const data = await fetchPegawaiRoleInfo(p.nip);
      if (data) {
        setRoleInfo(data);
        setTargetRole(data.role || "admin");
      }
    } catch (err) {
      console.error("Gagal mengambil info role:", err);
    } finally {
      setRoleInfoLoading(false);
    }
  };

  const handleSaveRole = async () => {
    if (!pegawaiToSetRole) return;
    setIsSavingRole(true);
    try {
      const res = await updatePegawaiRole(pegawaiToSetRole.nip, targetRole);
      // Update local pegawaiList item to reflect change immediately
      setPegawaiList((prev) =>
        prev.map((item) =>
          item.nip === pegawaiToSetRole.nip
            ? { ...item, system_role: targetRole }
            : item,
        ),
      );
      if (selectedPegawai && selectedPegawai.nip === pegawaiToSetRole.nip) {
        setSelectedPegawai({ ...selectedPegawai, system_role: targetRole });
      }
      showToast(
        "Peran Berhasil Diperbarui",
        res.message || `Peran untuk ${pegawaiToSetRole.nama} berhasil diubah.`,
        "success",
      );
      setPegawaiToSetRole(null);
    } catch (err: any) {
      showToast(
        "Gagal Mengubah Peran",
        err.message || "Terjadi kesalahan saat menyimpan peran.",
        "error",
      );
    } finally {
      setIsSavingRole(false);
    }
  };

  // Role Badge Helper
  const renderRoleBadge = (role?: string) => {
    switch (role) {
      case "admin":
        return (
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200 shadow-xs"
            title="Admin Unit Kerja"
          >
            <span>👑</span>
            <span>Admin Unit</span>
          </span>
        );
      case "coach":
        return (
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200 shadow-xs"
            title="Pelatih Coaching"
          >
            <span>🧭</span>
            <span>Coach</span>
          </span>
        );
      case "mentor":
        return (
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800 border border-teal-200 shadow-xs"
            title="Pembimbing Mentoring"
          >
            <span>🤝</span>
            <span>Mentor</span>
          </span>
        );
      case "counselor":
        return (
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200 shadow-xs"
            title="Konselor Bimbingan"
          >
            <span>💬</span>
            <span>Konselor</span>
          </span>
        );
      case "super_admin":
        return (
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-800 border border-red-200 shadow-xs"
            title="Super Administrator"
          >
            <span>⭐</span>
            <span>Super Admin</span>
          </span>
        );
      default:
        return (
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200"
            title="Pegawai / Klien"
          >
            <span>Pegawai</span>
          </span>
        );
    }
  };

  // Dynamic list of Satuan Kerja (diurutkan berdasarkan kode ASC)
  const availableSatkers = useMemo(() => {
    if (satuanKerjaList.length > 0) {
      return [...satuanKerjaList].sort((a, b) =>
        (a.kode || "").localeCompare(b.kode || ""),
      );
    }
    const map = new Map<string, { id: string; kode: string; nama: string }>();
    pegawaiList.forEach((p) => {
      if (p.satuan_kerja && !map.has(p.satuan_kerja)) {
        map.set(p.satuan_kerja, {
          id: p.satuan_kerja,
          kode: p.satuan_kerja,
          nama: p.satuan_kerja,
        });
      }
    });
    return Array.from(map.values()).sort((a, b) =>
      a.kode.localeCompare(b.kode),
    );
  }, [satuanKerjaList, pegawaiList]);

  // Dynamic list of Unit Kerja (diurutkan berdasarkan kode ASC, difilter jika satker dipilih)
  const availableUnits = useMemo(() => {
    if (unitKerjaList.length > 0) {
      return [...unitKerjaList]
        .filter((u) => {
          if (selectedSatker === "all") return true;
          return (
            u.satuan_kerja_nama === selectedSatker ||
            u.satuan_kerja_id === selectedSatker
          );
        })
        .sort((a, b) => (a.kode || "").localeCompare(b.kode || ""));
    }
    const map = new Map<string, { id: string; kode: string; nama: string }>();
    pegawaiList.forEach((p) => {
      if (
        p.unit_kerja &&
        (selectedSatker === "all" || p.satuan_kerja === selectedSatker)
      ) {
        if (!map.has(p.unit_kerja)) {
          map.set(p.unit_kerja, {
            id: p.unit_kerja,
            kode: p.unit_kerja,
            nama: p.unit_kerja,
          });
        }
      }
    });
    return Array.from(map.values()).sort((a, b) =>
      a.kode.localeCompare(b.kode),
    );
  }, [unitKerjaList, pegawaiList, selectedSatker]);

  // Dynamic list of Sub Unit Kerja (diurutkan berdasarkan kode ASC, difilter jika unit/satker dipilih)
  const availableSubUnits = useMemo(() => {
    if (subUnitKerjaList.length > 0) {
      return [...subUnitKerjaList]
        .filter((s) => {
          if (
            selectedUnit !== "all" &&
            s.unit_kerja_nama !== selectedUnit &&
            s.unit_kerja_id !== selectedUnit
          ) {
            return false;
          }
          if (
            selectedSatker !== "all" &&
            s.satuan_kerja_nama &&
            s.satuan_kerja_nama !== selectedSatker &&
            s.satuan_kerja_id !== selectedSatker
          ) {
            return false;
          }
          return true;
        })
        .sort((a, b) => (a.kode || "").localeCompare(b.kode || ""));
    }
    const map = new Map<string, { id: string; kode: string; nama: string }>();
    pegawaiList.forEach((p) => {
      if (p.sub_unit_kerja) {
        if (selectedSatker !== "all" && p.satuan_kerja !== selectedSatker)
          return;
        if (selectedUnit !== "all" && p.unit_kerja !== selectedUnit) return;
        if (!map.has(p.sub_unit_kerja)) {
          map.set(p.sub_unit_kerja, {
            id: p.sub_unit_kerja,
            kode: p.sub_unit_kerja_kode || p.sub_unit_kerja,
            nama: p.sub_unit_kerja,
          });
        }
      }
    });
    return Array.from(map.values()).sort((a, b) =>
      a.kode.localeCompare(b.kode),
    );
  }, [subUnitKerjaList, pegawaiList, selectedSatker, selectedUnit]);

  // Units filtered for sync modal search
  const filteredUnitsForSync = useMemo(() => {
    const q = syncSearchQuery.toLowerCase().trim();
    return unitKerjaList.filter((u) => {
      if (!q) return true;
      return (
        (u.nama && u.nama.toLowerCase().includes(q)) ||
        (u.kode && u.kode.toLowerCase().includes(q)) ||
        (u.satuan_kerja_nama && u.satuan_kerja_nama.toLowerCase().includes(q))
      );
    });
  }, [unitKerjaList, syncSearchQuery]);

  // Active employee list for the current page (server-side filtered & paginated)
  const filteredList = pegawaiList;

  // Overview statistics calculation (reflects verified global database counts)
  const stats = useMemo(() => {
    return {
      total: globalStats.total,
      pnsCount: globalStats.pnsCount,
      pppkCount: globalStats.pppkCount,
      unitsCount: globalStats.unitsCount || availableUnits.length,
    };
  }, [globalStats, availableUnits]);

  // Render Pagination Controls Bar
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
        {/* Left: Summary & Per Page Dropdown */}
        <div className="flex flex-wrap items-center gap-3">
          <div>
            Menampilkan{" "}
            <span className="font-bold text-slate-900">{startItem}</span> –{" "}
            <span className="font-bold text-slate-900">{endItem}</span> dari{" "}
            <span className="font-bold text-slate-900">{totalCount}</span>{" "}
            pegawai
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

        {/* Right: Page Navigation Buttons & Jump Input */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1">
            {/* First Page */}
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1 || isFetchingPegawai}
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

            {/* Prev Page */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1 || isFetchingPegawai}
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

            {/* Page numbers */}
            {pages.map((p, idx) =>
              typeof p === "number" ? (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentPage(p)}
                  disabled={isFetchingPegawai}
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

            {/* Next Page */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || isFetchingPegawai}
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

            {/* Last Page */}
            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || isFetchingPegawai}
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

          {/* Jump Form */}
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

  // Formatting helpers
  const formatFullName = (p: SIKPegawai) => {
    const depan = p.gelar_depan ? `${p.gelar_depan} ` : "";
    const belakang = p.gelar_belakang ? `, ${p.gelar_belakang}` : "";
    return `${depan}${p.nama}${belakang}`;
  };

  const getInitials = (nama: string) => {
    if (!nama) return "PG";
    const parts = nama
      .replace(/,\s*.*$/, "")
      .trim()
      .split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col font-sans text-slate-800">
      {/* Navbar with active tab 'Master Pegawai' */}
      <AppNavbar />

      <main className="flex-1 w-full mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
        {/* Header Hero Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 bg-gradient-to-r from-[#0a2540] to-[#1e3a5f] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 pointer-events-none">
            <svg className="w-80 h-80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Master Data Pegawai
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Direktori resmi data aparatur sipil negara di lingkungan
              Kementerian Perhubungan. Terhubung langsung dengan basis data
              kepegawaian untuk verifikasi jabatan, pangkat, dan unit kerja.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3 pt-2 md:pt-0">
            <Link
              href="/master-pegawai/sync-history"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white text-sm font-medium transition-all backdrop-blur-sm cursor-pointer"
              title="Lihat riwayat sinkronisasi dan catatan perubahan data pegawai dari SIK"
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Riwayat Sync</span>
            </Link>

            <button
              onClick={() => handleOpenSyncModal()}
              disabled={isSyncing}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 text-white text-sm font-medium transition-all backdrop-blur-sm cursor-pointer disabled:opacity-50"
              title="Sinkronkan data pegawai SIK berdasarkan unit kerja / kantor (Maksimal 5 kantor bersamaan)"
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
                {isSyncing
                  ? "Menyinkronkan..."
                  : "Sinkronkan SIK (Pilih Kantor)"}
              </span>
            </button>

            <button
              onClick={() => {
                setCurrentPage(1);
                loadInitialData();
              }}
              disabled={loading || isFetchingPegawai}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-900 font-semibold text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <svg
                className={`size-4 ${loading || isFetchingPegawai ? "animate-spin" : ""}`}
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

        {/* Metric Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">
                Total Pegawai
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {stats.total}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Pegawai terdata di SIK
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">
                PNS
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {stats.pnsCount}
            </div>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              Aparatur Sipil Tetap
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">
                PPPK / Kontrak
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {stats.pppkCount}
            </div>
            <p className="text-xs text-indigo-600 font-medium mt-1">
              Perjanjian Kerja
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">
                Unit Kerja
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {stats.unitsCount}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Satuan & Satker terdaftar
            </p>
          </div>
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
                placeholder="Cari berdasarkan NIP, Nama Pegawai, Jabatan, atau Unit Kerja..."
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

            {/* Filters & View Toggles */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Satuan Kerja (Kantor Induk) */}
              <select
                value={selectedSatker}
                onChange={(e) => {
                  setSelectedSatker(e.target.value);
                  setSelectedUnit("all");
                  setSelectedSubUnit("all");
                }}
                className="max-w-[210px] truncate px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 cursor-pointer"
                title="Pilih Satuan Kerja / Kantor Induk (Diurutkan berdasarkan Kode)"
              >
                <option value="all">Semua Satuan Kerja</option>
                {availableSatkers.map((satker) => (
                  <option key={satker.id || satker.kode} value={satker.nama}>
                    {satker.kode
                      ? `[${satker.kode}] ${satker.nama}`
                      : satker.nama}
                  </option>
                ))}
              </select>

              {/* Unit Kerja (Kantor / Balai) */}
              <div className="flex items-center gap-1.5">
                <select
                  value={selectedUnit}
                  onChange={(e) => {
                    setSelectedUnit(e.target.value);
                    setSelectedSubUnit("all");
                  }}
                  className="max-w-[220px] truncate px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 cursor-pointer"
                  title="Pilih Unit Kerja / Kantor / Balai (Diurutkan berdasarkan Kode)"
                >
                  <option value="all">Semua Unit Kerja</option>
                  {availableUnits.map((unit) => (
                    <option key={unit.id || unit.kode} value={unit.nama}>
                      {unit.kode ? `[${unit.kode}] ${unit.nama}` : unit.nama}
                    </option>
                  ))}
                </select>
                {selectedUnit !== "all" && (
                  <button
                    type="button"
                    onClick={() => handleOpenSyncModal(selectedUnit)}
                    className="p-2 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors shrink-0 cursor-pointer"
                    title={`Sinkronkan SIK kantor ${selectedUnit}`}
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Sub Unit Kerja (di bawah Unit Kerja) */}
              <select
                value={selectedSubUnit}
                onChange={(e) => setSelectedSubUnit(e.target.value)}
                className="max-w-[230px] truncate px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 cursor-pointer"
                title="Pilih Sub Unit Kerja (Diurutkan berdasarkan Kode)"
              >
                <option value="all">Semua Sub Unit Kerja</option>
                {availableSubUnits.map((sub) => (
                  <option key={sub.id || sub.kode} value={sub.nama}>
                    {sub.kode ? `[${sub.kode}] ${sub.nama}` : sub.nama}
                  </option>
                ))}
              </select>

              {/* Status Kepegawaian */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 cursor-pointer"
                title="Pilih Status Kepegawaian"
              >
                <option value="all">Semua Status</option>
                <option value="PNS">PNS (Tetap)</option>
                <option value="PPPK">PPPK</option>
                <option value="NON_PNS">Lainnya</option>
              </select>

              {/* Tools: Quick Copy Filtered NIPs */}
              <button
                type="button"
                onClick={() => {
                  const nips = filteredList.map((p) => p.nip).join(", ");
                  navigator.clipboard.writeText(nips);
                  showToast(
                    "Daftar NIP Disalin",
                    `${filteredList.length} NIP pegawai terfilter berhasil disalin untuk tools Anda.`,
                  );
                }}
                className="px-3 py-2 text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                title="Salin semua NIP hasil filter untuk tools"
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
                <span>Salin NIP ({filteredList.length})</span>
              </button>

              {/* View Switcher */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === "table"
                      ? "bg-white text-slate-900 shadow-xs font-semibold"
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
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-white text-slate-900 shadow-xs font-semibold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  title="Tampilan Grid Kartu"
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
            </div>
          </div>

          {/* Active Filter Chips */}
          {(selectedStatus !== "all" ||
            selectedSatker !== "all" ||
            selectedUnit !== "all" ||
            selectedSubUnit !== "all" ||
            searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 pt-3 mt-3 border-t border-slate-100 text-xs text-slate-600">
              <span className="font-semibold text-slate-500">
                Filter Aktif:
              </span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-medium border border-blue-200">
                  Pencarian: &quot;{searchQuery}&quot;
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-blue-900 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedSatker !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-medium border border-indigo-200">
                  Satker: {selectedSatker}
                  <button
                    onClick={() => setSelectedSatker("all")}
                    className="hover:text-indigo-900 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedUnit !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-medium border border-purple-200">
                  Unit: {selectedUnit}
                  <button
                    onClick={() => setSelectedUnit("all")}
                    className="hover:text-purple-900 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedSubUnit !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-700 font-medium border border-cyan-200">
                  Sub Unit: {selectedSubUnit}
                  <button
                    onClick={() => setSelectedSubUnit("all")}
                    className="hover:text-cyan-900 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedStatus !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
                  Status: {selectedStatus}
                  <button
                    onClick={() => setSelectedStatus("all")}
                    className="hover:text-emerald-900 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedStatus("all");
                  setSelectedSatker("all");
                  setSelectedUnit("all");
                  setSelectedSubUnit("all");
                }}
                className="text-blue-600 hover:text-blue-800 font-medium underline cursor-pointer ml-1"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </div>

        {/* Content Section: Loading / Error / Empty / Table / Grid */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
            <div className="inline-block size-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 className="text-base font-semibold text-slate-800">
              Memuat Master Data Pegawai...
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Mengambil informasi resmi langsung dari SIK Kemenhub
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="inline-flex size-12 rounded-full bg-red-100 text-red-600 items-center justify-center mb-3">
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
            <h3 className="text-base font-bold text-red-900 mb-1">
              Gagal Memuat Data
            </h3>
            <p className="text-sm text-red-700 mb-4 max-w-md mx-auto">
              {error}
            </p>
            <button
              onClick={() => {
                setCurrentPage(1);
                loadInitialData();
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Coba Lagi
            </button>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
            <div className="inline-flex size-14 rounded-2xl bg-slate-100 text-slate-400 items-center justify-center mb-3">
              <svg
                className="size-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-800">
              Tidak Ada Pegawai Ditemukan
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Tidak ditemukan data pegawai yang cocok dengan kriteria pencarian
              atau filter yang dipilih.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedStatus("all");
                setSelectedSatker("all");
                setSelectedUnit("all");
                setSelectedSubUnit("all");
                setCurrentPage(1);
              }}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : viewMode === "table" ? (
          /* TABLE VIEW */
          <div className="relative bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            {isFetchingPegawai && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-20 transition-all">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/90 text-white rounded-full text-xs font-semibold shadow-lg">
                  <div className="size-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Memuat data pegawai...</span>
                </div>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 pl-6 pr-4">Pegawai</th>
                    <th className="py-3.5 px-4">NIP</th>
                    <th className="py-3.5 px-4">Pangkat / Gol.</th>
                    <th className="py-3.5 px-4">Jabatan</th>
                    <th className="py-3.5 px-4">Unit & Sub Unit Kerja</th>
                    <th className="py-3.5 px-4">Status & Peran</th>
                    <th className="py-3.5 pr-6 pl-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredList.map((p) => (
                    <tr
                      key={p.nip}
                      onClick={() => handleOpenDetail(p)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    >
                      {/* Avatar & Nama */}
                      <td className="py-4 pl-6 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs border border-white">
                            {getInitials(p.nama)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {formatFullName(p)}
                            </div>
                            <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                              <span>
                                {p.jenis_kelamin === "L"
                                  ? "Laki-laki"
                                  : p.jenis_kelamin === "P"
                                    ? "Perempuan"
                                    : "ASN"}
                              </span>
                              {p.pendidikan_terakhir && (
                                <>
                                  <span>•</span>
                                  <span>
                                    {p.pendidikan_terakhir}{" "}
                                    {p.jurusan ? `(${p.jurusan})` : ""}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* NIP */}
                      <td className="py-4 px-4 font-mono text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <span>{p.nip}</span>
                          <button
                            onClick={(e) => handleCopyNip(p.nip, e)}
                            className="text-slate-400 hover:text-blue-600 p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Salin NIP"
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
                          </button>
                        </div>
                      </td>

                      {/* Pangkat & Golongan */}
                      <td className="py-4 px-4 text-xs">
                        <div className="font-medium text-slate-800">
                          {p.pangkat || "-"}
                        </div>
                        <div className="text-slate-400">
                          {p.golongan_ruang ? `Gol. ${p.golongan_ruang}` : "-"}
                        </div>
                      </td>

                      {/* Jabatan */}
                      <td className="py-4 px-4 text-xs">
                        <div
                          className="font-medium text-slate-800 max-w-[220px] truncate"
                          title={p.jabatan}
                        >
                          {p.jabatan || "-"}
                        </div>
                        <div className="text-slate-400 mt-0.5">
                          {p.jenis_jabatan || "Struktural / Fungsional"}
                        </div>
                      </td>

                      {/* Unit & Sub Unit Kerja */}
                      <td className="py-4 px-4 text-xs">
                        <div
                          className="font-medium text-slate-800 max-w-[220px] truncate"
                          title={p.unit_kerja}
                        >
                          {p.unit_kerja || "-"}
                        </div>
                        {p.sub_unit_kerja && (
                          <div
                            className="text-blue-600 max-w-[220px] truncate text-[11px] font-medium mt-0.5"
                            title={p.sub_unit_kerja}
                          >
                            ↳ {p.sub_unit_kerja}
                          </div>
                        )}
                        <div
                          className="text-slate-400 max-w-[220px] truncate text-[11px]"
                          title={p.satuan_kerja}
                        >
                          {p.satuan_kerja || "Kementerian Perhubungan"}
                        </div>
                      </td>

                      {/* Status & Peran */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col items-start gap-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              p.status_kepegawaian === "PNS"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : p.status_kepegawaian === "PPPK"
                                  ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                                  : "bg-slate-100 text-slate-700 border border-slate-200"
                            }`}
                          >
                            {p.status_kepegawaian || "PNS"}
                          </span>
                          {renderRoleBadge(p.system_role)}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 pr-6 pl-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => handleOpenSetRoleModal(p, e)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 active:bg-purple-200 text-purple-800 text-xs font-semibold border border-purple-200/80 transition-colors cursor-pointer"
                            title="Atur Peran Sistem Pegawai (Admin Unit, Coach, Mentor, Konselor, Pegawai)"
                          >
                            <span>👑</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleRequestResetPassword(p, e)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 active:bg-amber-200 text-amber-800 text-xs font-semibold border border-amber-200/80 transition-colors cursor-pointer"
                            title="Reset Kata Sandi pegawai menjadi NIP untuk login"
                          >
                            <svg
                              className="size-3.5 text-amber-700"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDetail(p);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            <span>Detail</span>
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
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls for Table View */}
            {renderPaginationControls()}
          </div>
        ) : (
          /* GRID CARD VIEW */
          <div className="relative space-y-6">
            {isFetchingPegawai && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-20 transition-all min-h-[300px] rounded-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/90 text-white rounded-full text-xs font-semibold shadow-lg">
                  <div className="size-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Memuat data pegawai...</span>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredList.map((p) => (
                <div
                  key={p.nip}
                  onClick={() => handleOpenDetail(p)}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    {/* Top card header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="size-12 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                          {getInitials(p.nama)}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm line-clamp-1">
                            {formatFullName(p)}
                          </h4>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                            <span className="font-mono">{p.nip}</span>
                            <button
                              onClick={(e) => handleCopyNip(p.nip, e)}
                              className="text-slate-400 hover:text-blue-600 p-0.5 rounded cursor-pointer"
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
                                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold shrink-0 ${
                            p.status_kepegawaian === "PNS"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                          }`}
                        >
                          {p.status_kepegawaian || "PNS"}
                        </span>
                        {renderRoleBadge(p.system_role)}
                      </div>
                    </div>

                    {/* Body Info */}
                    <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-slate-400 shrink-0">
                          Jabatan:
                        </span>
                        <span
                          className="font-medium text-slate-800 text-right line-clamp-1"
                          title={p.jabatan}
                        >
                          {p.jabatan || "-"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-slate-400">Pangkat/Gol:</span>
                        <span className="font-medium text-slate-800">
                          {p.pangkat
                            ? `${p.pangkat} (${p.golongan_ruang || "-"})`
                            : "-"}
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-slate-400 shrink-0">
                          Unit Kerja:
                        </span>
                        <span
                          className="font-medium text-slate-800 text-right line-clamp-1"
                          title={p.unit_kerja}
                        >
                          {p.unit_kerja || "-"}
                        </span>
                      </div>
                      {p.sub_unit_kerja && (
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-slate-400 shrink-0">
                            Sub Unit:
                          </span>
                          <span
                            className="font-medium text-blue-600 text-right line-clamp-1 text-[11px]"
                            title={p.sub_unit_kerja}
                          >
                            {p.sub_unit_kerja}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer card action */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5 text-xs flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => handleOpenSetRoleModal(p, e)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 active:bg-purple-200 text-purple-800 font-semibold border border-purple-200/80 transition-colors cursor-pointer"
                        title="Atur Peran Sistem Pegawai"
                      >
                        <span>👑</span>
                        <span>Role</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleRequestResetPassword(p, e)}
                        className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 active:bg-amber-200 text-amber-800 font-semibold border border-amber-200/80 transition-colors cursor-pointer"
                        title="Reset Kata Sandi ke NIP"
                      >
                        <svg
                          className="size-3.5 text-amber-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                          />
                        </svg>
                        <span>Reset PW</span>
                      </button>
                    </div>
                    <span className="text-blue-600 font-semibold group-hover:text-blue-700 flex items-center gap-1">
                      <span>Detail</span>
                      <svg
                        className="size-3.5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls for Grid View */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              {renderPaginationControls()}
            </div>
          </div>
        )}
      </main>

      {/* DETAIL MODAL PEGAWAI SIK */}
      {selectedPegawai && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedPegawai(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0a2540] to-[#1e3a5f] p-6 text-white relative">
              <button
                onClick={() => setSelectedPegawai(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Tutup"
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

              <div className="flex items-center gap-4 pr-12">
                <div className="size-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                  {getInitials(selectedPegawai.nama)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                      {selectedPegawai.status_kepegawaian || "PNS"}
                    </span>
                    {selectedPegawai.eselon && (
                      <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-400/20 text-blue-300 border border-blue-400/30">
                        Eselon {selectedPegawai.eselon}
                      </span>
                    )}
                    {renderRoleBadge(selectedPegawai.system_role)}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {formatFullName(selectedPegawai)}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-300 text-sm mt-1">
                    <span className="font-mono">
                      NIP: {selectedPegawai.nip}
                    </span>
                    <button
                      onClick={() => handleCopyNip(selectedPegawai.nip)}
                      className="p-1 hover:text-white transition-colors cursor-pointer"
                      title="Salin NIP"
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
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body: Tabs / Sections */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm">
              {loadingDetail && (
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2">
                  <div className="size-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>
                    Memverifikasi kelengkapan profil dengan SIK Kemenhub...
                  </span>
                </div>
              )}

              {/* SECTION: DATA JABATAN & KEPEGAWAIAN */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <svg
                    className="size-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Jabatan & Kepegawaian
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Jabatan
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedPegawai.jabatan || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Jenis Jabatan
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedPegawai.jenis_jabatan || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Pangkat / Golongan Ruang
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedPegawai.pangkat || "-"} (
                      {selectedPegawai.golongan_ruang || "-"})
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Masa Kerja
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedPegawai.masa_kerja_tahun ?? 0} Tahun{" "}
                      {selectedPegawai.masa_kerja_bulan ?? 0} Bulan
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Unit Kerja
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedPegawai.unit_kerja || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Sub Unit Kerja
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedPegawai.sub_unit_kerja || "-"}
                      {selectedPegawai.sub_unit_kerja_kode && (
                        <span className="ml-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-blue-100 text-blue-700">
                          {selectedPegawai.sub_unit_kerja_kode}
                        </span>
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Satuan Kerja
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedPegawai.satuan_kerja || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Instansi Induk
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedPegawai.instansi_induk ||
                        "Kementerian Perhubungan"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Lokasi Kerja
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedPegawai.lokasi_kerja || "-"}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION: DATA PRIBADI & KONTAK */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <svg
                    className="size-4 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Informasi Pribadi & Kontak
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Tempat, Tanggal Lahir
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedPegawai.tempat_lahir || "-"},{" "}
                      {selectedPegawai.tanggal_lahir || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Jenis Kelamin / Agama
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedPegawai.jenis_kelamin === "L"
                        ? "Laki-laki"
                        : selectedPegawai.jenis_kelamin === "P"
                          ? "Perempuan"
                          : "-"}{" "}
                      / {selectedPegawai.agama || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Email Dinas Kemenhub
                    </span>
                    <span className="font-semibold text-slate-800 font-mono text-xs">
                      {selectedPegawai.email_dinas || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Email Pribadi
                    </span>
                    <span className="font-semibold text-slate-800 font-mono text-xs">
                      {selectedPegawai.email_pribadi || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">
                      No. Handphone / WhatsApp
                    </span>
                    <span className="font-semibold text-slate-800 font-mono text-xs">
                      {selectedPegawai.no_hp || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Status Perkawinan
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedPegawai.status_perkawinan || "-"}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION: PENDIDIKAN & ATASAN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pendidikan */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <svg
                      className="size-4 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                    </svg>
                    Pendidikan Terakhir
                  </h4>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                    <div>
                      <span className="text-xs text-slate-400 block">
                        Jenjang & Jurusan
                      </span>
                      <span className="font-semibold text-slate-800">
                        {selectedPegawai.pendidikan_terakhir || "-"}{" "}
                        {selectedPegawai.jurusan
                          ? `• ${selectedPegawai.jurusan}`
                          : ""}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">
                        Perguruan Tinggi / Sekolah
                      </span>
                      <span className="font-semibold text-slate-800">
                        {selectedPegawai.nama_sekolah || "-"}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">
                        Tahun Kelulusan
                      </span>
                      <span className="font-semibold text-slate-800">
                        {selectedPegawai.tahun_lulus || "-"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Atasan Langsung */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <svg
                      className="size-4 text-amber-600"
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
                    Atasan Langsung
                  </h4>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                    <div>
                      <span className="text-xs text-slate-400 block">
                        Nama Atasan
                      </span>
                      <span className="font-semibold text-slate-800">
                        {selectedPegawai.atasan_langsung_nama || "-"}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">
                        NIP Atasan
                      </span>
                      <span className="font-semibold text-slate-800 font-mono text-xs">
                        {selectedPegawai.atasan_langsung_nip || "-"}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">
                        Jabatan Atasan
                      </span>
                      <span className="font-semibold text-slate-800">
                        {selectedPegawai.atasan_langsung_jabatan || "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Terverifikasi secara elektronik oleh BPSDM Kemenhub
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                <button
                  type="button"
                  onClick={() => handleOpenSetRoleModal(selectedPegawai)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                  title="Atur Peran Sistem Pegawai (Admin Unit, Coach, Mentor, Konselor, Pegawai)"
                >
                  <span>👑</span>
                  <span>Atur Role Pegawai</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRequestResetPassword(selectedPegawai)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 text-xs font-bold transition-all shadow-sm cursor-pointer"
                  title="Reset kata sandi pegawai ini menjadi NIP"
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
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                  <span>Reset Password ke NIP</span>
                </button>
                <button
                  onClick={() => handleCopyNip(selectedPegawai.nip)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Salin NIP
                </button>
                <button
                  onClick={() => setSelectedPegawai(null)}
                  className="px-4 py-2 rounded-xl bg-[#0a2540] hover:bg-[#1e3a5f] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESET PASSWORD CONFIRMATION & SUCCESS MODAL */}
      {pegawaiToReset && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => {
            if (!isResettingPassword) {
              setPegawaiToReset(null);
              setResetSuccessResult(null);
            }
          }}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0a2540] to-[#1e3a5f] p-6 text-white relative">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-inner">
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
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {resetSuccessResult
                        ? "Kata Sandi Berhasil Direset"
                        : "Reset Kata Sandi Pegawai"}
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {resetSuccessResult
                        ? "Kredensial login aktif untuk sistem CMC"
                        : "Gunakan NIP sebagai kata sandi login default"}
                    </p>
                  </div>
                </div>
                {!isResettingPassword && (
                  <button
                    onClick={() => {
                      setPegawaiToReset(null);
                      setResetSuccessResult(null);
                    }}
                    className="size-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Tutup"
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
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-sm">
              {!resetSuccessResult ? (
                <>
                  {/* Pegawai Info Card */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200/60">
                      <span>Profil Pegawai SIK</span>
                      <span className="font-mono text-slate-700 font-semibold">
                        {pegawaiToReset.nip}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-base">
                        {formatFullName(pegawaiToReset)}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {pegawaiToReset.jabatan || "-"}
                      </div>
                      <div className="text-xs text-slate-500">
                        {pegawaiToReset.unit_kerja || "-"}
                      </div>
                    </div>
                  </div>

                  {/* Warning / Informational Box */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-900 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-amber-800">
                      <svg
                        className="size-4 text-amber-600 shrink-0"
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
                      <span>Konfirmasi Kata Sandi Default</span>
                    </div>
                    <p className="leading-relaxed">
                      Kata sandi pegawai ini akan diatur ulang menjadi nomor
                      NIP-nya:
                    </p>
                    <div className="bg-white/80 border border-amber-300 rounded-xl p-2.5 font-mono text-center font-bold text-amber-950 text-sm select-all">
                      {pegawaiToReset.nip}
                    </div>
                    <p className="text-[11px] text-amber-700 leading-normal">
                      Pegawai atau administrator dapat langsung login ke
                      aplikasi menggunakan NIP ini sebagai username dan
                      password.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Success View */}
                  <div className="text-center py-2">
                    <div className="size-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                      <svg
                        className="size-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h4 className="text-base font-bold text-slate-900">
                      Kata Sandi Berhasil Diatur
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      Akun pegawai telah terdaftar dan aktif di sistem. Gunakan
                      kredensial di bawah untuk login.
                    </p>
                  </div>

                  {/* Credential Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Nama Pegawai:</span>
                      <span className="font-semibold text-slate-800 text-right">
                        {resetSuccessResult.nama}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                      <span className="text-slate-500">NIP (Username):</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-blue-700">
                          {resetSuccessResult.nip}
                        </span>
                        <button
                          onClick={() => handleCopyNip(resetSuccessResult.nip)}
                          className="p-1 hover:bg-slate-200 rounded text-slate-500 cursor-pointer"
                          title="Salin NIP"
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
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                      <span className="text-slate-500">Kata Sandi Baru:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-emerald-700">
                          {resetSuccessResult.password_default}
                        </span>
                        <button
                          onClick={() =>
                            handleCopyNip(resetSuccessResult.password_default)
                          }
                          className="p-1 hover:bg-slate-200 rounded text-slate-500 cursor-pointer"
                          title="Salin Kata Sandi"
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
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                      <span className="text-slate-500">Peran Akses:</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">
                        {resetSuccessResult.role || "pegawai"}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
              {!resetSuccessResult ? (
                <>
                  <button
                    type="button"
                    onClick={() => setPegawaiToReset(null)}
                    disabled={isResettingPassword}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmResetPassword}
                    disabled={isResettingPassword}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {isResettingPassword ? (
                      <>
                        <div className="size-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                        <span>Mereset Kata Sandi...</span>
                      </>
                    ) : (
                      <>
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
                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                          />
                        </svg>
                        <span>Ya, Reset Kata Sandi Sekarang</span>
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold transition-colors cursor-pointer"
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
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Ke Halaman Login</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setPegawaiToReset(null);
                      setResetSuccessResult(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Selesai
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SET ROLE MODAL (ATUR PERAN PEGAWAI & KUOTA ADMIN UNIT KERJA) */}
      {pegawaiToSetRole && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => {
            if (!isSavingRole) setPegawaiToSetRole(null);
          }}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-[#0a2540] p-6 text-white relative">
              <button
                type="button"
                onClick={() => {
                  if (!isSavingRole) setPegawaiToSetRole(null);
                }}
                disabled={isSavingRole}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer disabled:opacity-50"
                title="Tutup"
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

              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl shadow-inner">
                  👑
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-purple-300">
                    Manajemen Hak Akses CMC
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    Atur Peran Sistem Pegawai
                  </h3>
                </div>
              </div>
              <p className="text-purple-200 text-xs leading-relaxed max-w-md">
                Tentukan hak akses untuk pegawai ini dalam platform Coaching,
                Mentoring & Counseling BPSDM Perhubungan.
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
              {/* Pegawai Info Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3.5">
                <div className="size-11 rounded-full bg-gradient-to-br from-purple-700 to-indigo-800 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs border border-white">
                  {getInitials(pegawaiToSetRole.nama)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate">
                    {formatFullName(pegawaiToSetRole)}
                  </h4>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    NIP: {pegawaiToSetRole.nip}
                  </div>
                  <div
                    className="text-xs text-slate-600 mt-1 truncate"
                    title={pegawaiToSetRole.unit_kerja}
                  >
                    🏢{" "}
                    <span className="font-semibold text-slate-800">Unit:</span>{" "}
                    {pegawaiToSetRole.unit_kerja || "-"}
                  </div>
                  {pegawaiToSetRole.sub_unit_kerja && (
                    <div className="text-[11px] text-blue-600 mt-0.5 truncate">
                      ↳ {pegawaiToSetRole.sub_unit_kerja}
                    </div>
                  )}
                </div>
              </div>

              {/* Admin Unit Quota Guideline Banner */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 text-base font-bold">
                    ⚖️
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-amber-950 uppercase tracking-wider text-[11px]">
                        Pedoman Alokasi Admin Unit Kerja
                      </span>
                      {roleInfoLoading ? (
                        <span className="text-slate-400 text-[11px] animate-pulse">
                          Menghitung kuota...
                        </span>
                      ) : roleInfo ? (
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                            roleInfo.unit_admins_count >= 2
                              ? "bg-amber-200 text-amber-900 border border-amber-300"
                              : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          }`}
                        >
                          {roleInfo.unit_admins_count} /{" "}
                          {roleInfo.target_admin_quota || 2} Admin Aktif
                        </span>
                      ) : null}
                    </div>
                    <p className="text-amber-900 leading-relaxed text-[11px]">
                      Dalam 1 Unit Kerja, disarankan terdapat{" "}
                      <strong>1 sampai 2 Admin Unit</strong> untuk mengelola
                      penugasan coach/mentor/konselor dan memantau sesi pegawai
                      di unit kerja bersangkutan.
                    </p>
                    {roleInfo &&
                      roleInfo.unit_admins_count >= 2 &&
                      targetRole === "admin" &&
                      roleInfo.role !== "admin" && (
                        <div className="mt-2.5 p-2 bg-amber-100/80 border border-amber-300/80 rounded-xl text-amber-950 font-medium text-[11px] flex items-center gap-1.5">
                          <span>⚠️</span>
                          <span>
                            Unit kerja ini sudah memiliki{" "}
                            {roleInfo.unit_admins_count} admin aktif. Anda tetap
                            dapat menambahkan admin jika diperlukan.
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              </div>

              {/* Role Selection Options */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Pilih Peran Sistem Pegawai
                </label>
                <div className="space-y-2.5">
                  {/* SUPER ADMIN */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      targetRole === "super_admin"
                        ? "border-red-600 bg-red-50/50 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="systemRoleOption"
                      value="super_admin"
                      checked={targetRole === "super_admin"}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="mt-1 text-red-600 focus:ring-red-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🛡️</span>
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                          Super Admin
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
                          BPSDM Pusat
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                        Akses administrator penuh ke seluruh modul, konfigurasi sistem, dan manajemen data lintas instansi se-Kemenhub.
                      </p>
                    </div>
                  </label>

                  {/* ADMIN UNIT KERJA */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      targetRole === "admin"
                        ? "border-purple-600 bg-purple-50/50 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="systemRoleOption"
                      value="admin"
                      checked={targetRole === "admin"}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="mt-1 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base">👑</span>
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                          Admin Unit Kerja
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                          Disarankan 1-2 per Unit
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                        Mengelola data kepegawaian, verifikasi pendaftaran sesi,
                        dan memantau kegiatan coaching/mentoring di unit kerja
                        ini.
                      </p>
                    </div>
                  </label>

                  {/* PEGAWAI */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      targetRole === "pegawai" || targetRole === "client"
                        ? "border-slate-800 bg-slate-50 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="systemRoleOption"
                      value="pegawai"
                      checked={targetRole === "pegawai" || targetRole === "client"}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="mt-1 text-slate-800 focus:ring-slate-700"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base">👤</span>
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                          Pegawai
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-200 text-slate-700">
                          Peran Standar (Bawaan)
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                        Peran dasar seluruh ASN di lingkungan Kementerian Perhubungan untuk mengikuti maupun mendampingi sesi pembelajaran.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Password default:{" "}
                <span className="font-mono font-semibold text-slate-700">
                  NIP Pegawai
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setPegawaiToSetRole(null)}
                  disabled={isSavingRole}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSaveRole}
                  disabled={isSavingRole}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isSavingRole ? (
                    <>
                      <div className="size-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Menyimpan Peran...</span>
                    </>
                  ) : (
                    <>
                      <span>👑</span>
                      <span>Simpan Peran Pegawai</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MULTI-UNIT SYNC MODAL (PILIH 1 HINGGA MAKSIMAL 5 KANTOR) */}
      {isSyncModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200/80 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0a2540] to-[#1e3a5f] p-6 text-white relative">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-400 shadow-inner">
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      Sinkronisasi Kantor / Unit Kerja SIK
                    </h2>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Pilih 1 hingga maksimal 5 kantor untuk disinkronkan
                      bersamaan dari Master SIK Kemenhub
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSyncModalOpen(false)}
                  disabled={isSyncing}
                  className="size-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Tutup"
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

              {/* Status & Counter Pill */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-300">Status Pilihan:</span>
                  <span
                    className={`px-3 py-1 rounded-full font-semibold ${
                      selectedUnitsToSync.length === 0
                        ? "bg-slate-800/80 text-slate-300"
                        : selectedUnitsToSync.length === 5
                          ? "bg-amber-500/20 text-amber-300 border border-amber-400/40"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                    }`}
                  >
                    Terpilih: {selectedUnitsToSync.length} / 5 Kantor
                  </span>
                </div>
                {selectedUnitsToSync.length === 5 && (
                  <span className="text-amber-300 font-medium text-[11px] flex items-center gap-1">
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
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Batas maksimal 5 kantor tercapai
                  </span>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              {/* Quick Actions & Presets */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Aksi Cepat:</span>
                {selectedUnit !== "all" && (
                  <button
                    type="button"
                    onClick={() => {
                      if (!selectedUnitsToSync.includes(selectedUnit)) {
                        if (selectedUnitsToSync.length >= 5) {
                          showToast(
                            "Batas Maksimal",
                            "Maksimal 5 kantor untuk disinkronkan secara bersamaan.",
                            "info",
                          );
                          return;
                        }
                        setSelectedUnitsToSync([
                          ...selectedUnitsToSync,
                          selectedUnit,
                        ]);
                      }
                    }}
                    className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium border border-blue-200 transition-colors"
                  >
                    + Kantor Aktif: {selectedUnit}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const pusbang = unitKerjaList.find((u) =>
                      u.nama.toLowerCase().includes("aparatur"),
                    );
                    if (
                      pusbang &&
                      !selectedUnitsToSync.includes(pusbang.nama)
                    ) {
                      if (selectedUnitsToSync.length >= 5) {
                        showToast(
                          "Batas Maksimal",
                          "Maksimal 5 kantor untuk disinkronkan secara bersamaan.",
                          "info",
                        );
                        return;
                      }
                      setSelectedUnitsToSync([
                        ...selectedUnitsToSync,
                        pusbang.nama,
                      ]);
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium transition-colors"
                >
                  + Pusbang Aparatur
                </button>
                {selectedUnitsToSync.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedUnitsToSync([])}
                    className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium transition-colors ml-auto"
                  >
                    Kosongkan ({selectedUnitsToSync.length})
                  </button>
                )}
              </div>

              {/* Selected Offices Chips */}
              {selectedUnitsToSync.length > 0 && (
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="text-xs font-semibold text-slate-600 mb-2">
                    Daftar Kantor yang Akan Disinkronkan (
                    {selectedUnitsToSync.length}):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedUnitsToSync.map((unitNama, idx) => {
                      const unitObj = unitKerjaList.find(
                        (u) => u.nama === unitNama,
                      );
                      return (
                        <span
                          key={unitNama}
                          className="inline-flex items-center gap-1.5 pl-2.5 pr-2 py-1 rounded-xl bg-blue-100/70 border border-blue-200 text-blue-900 text-xs font-medium"
                        >
                          <span className="font-bold text-blue-700">
                            #{idx + 1}
                          </span>
                          <span className="truncate max-w-[260px]">
                            {unitObj?.kode ? `[${unitObj.kode}] ` : ""}
                            {unitNama}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleToggleUnitToSync(unitNama)}
                            className="size-4 rounded-full hover:bg-blue-200 text-blue-700 flex items-center justify-center cursor-pointer ml-1"
                            title="Hapus pilihan"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Search Box in Modal */}
              <div className="relative">
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
                  value={syncSearchQuery}
                  onChange={(e) => setSyncSearchQuery(e.target.value)}
                  placeholder="Cari nama kantor atau kode unit kerja..."
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 focus:bg-white rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              {/* List of Available Offices with Checkboxes */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 max-h-60 overflow-y-auto">
                {filteredUnitsForSync.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400">
                    Tidak ditemukan unit kerja yang cocok dengan pencarian.
                  </div>
                ) : (
                  filteredUnitsForSync.map((unit) => {
                    const isSelected = selectedUnitsToSync.includes(unit.nama);
                    const isMaxReached =
                      selectedUnitsToSync.length >= 5 && !isSelected;

                    return (
                      <div
                        key={unit.id || unit.kode}
                        onClick={() => {
                          if (!isMaxReached) {
                            handleToggleUnitToSync(unit.nama);
                          }
                        }}
                        className={`flex items-center justify-between p-3.5 transition-colors text-xs ${
                          isSelected
                            ? "bg-blue-50/70 hover:bg-blue-50 cursor-pointer"
                            : isMaxReached
                              ? "bg-slate-50/50 opacity-50 cursor-not-allowed"
                              : "hover:bg-slate-50 cursor-pointer"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            disabled={isMaxReached}
                            onChange={() => {}}
                            className="size-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              {unit.kode && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-200 text-slate-800">
                                  {unit.kode}
                                </span>
                              )}
                              <span className="font-semibold text-slate-900 truncate">
                                {unit.nama}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 truncate mt-0.5">
                              {unit.satuan_kerja_nama ||
                                "Kementerian Perhubungan"}
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                            {unit.total_pegawai || 0} Pegawai
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Sync Results Card (if sync has run) */}
              {syncResultData && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl animate-in fade-in duration-200">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-emerald-200/60">
                    <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                      <svg
                        className="size-4 text-emerald-600"
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
                      Hasil Sinkronisasi SIK Terkini
                    </div>
                    <span className="text-[11px] text-emerald-700 font-mono">
                      {new Date(syncResultData.synced_at).toLocaleTimeString(
                        "id-ID",
                      )}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-emerald-800 font-medium">
                      {syncResultData.message ||
                        `Total ${syncResultData.total_pegawai} pegawai terverifikasi di master SIK.`}
                    </p>

                    {syncResultData.units &&
                      syncResultData.units.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {syncResultData.units.map((uResult) => (
                            <div
                              key={uResult.unit_kerja_id}
                              className="p-2.5 rounded-xl bg-white/80 border border-emerald-200/70 text-xs shadow-2xs"
                            >
                              <div className="font-semibold text-slate-900 truncate">
                                {uResult.unit_kerja_nama}
                              </div>
                              <div className="flex items-center justify-between text-[11px] text-emerald-700 mt-1">
                                <span>{uResult.message}</span>
                                <span className="font-bold">
                                  {uResult.total_pegawai} Pegawai
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                    <div className="pt-2 flex justify-end">
                      <Link
                        href="/master-pegawai/sync-history"
                        onClick={() => setIsSyncModalOpen(false)}
                        className="inline-flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-900 font-semibold"
                      >
                        <span>Lihat Log Audit & Catatan Perubahan</span>
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
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsSyncModalOpen(false)}
                disabled={isSyncing}
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Tutup
              </button>

              <button
                type="button"
                onClick={handleExecuteMultiSync}
                disabled={isSyncing || selectedUnitsToSync.length === 0}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-md disabled:opacity-50 cursor-pointer"
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
                  {isSyncing
                    ? `Menyinkronkan ${selectedUnitsToSync.length} Kantor...`
                    : `Mulai Sinkronisasi (${selectedUnitsToSync.length} Kantor)`}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div
            className={`flex items-start gap-3 p-4 rounded-2xl shadow-xl border text-sm max-w-sm ${
              toast.type === "success"
                ? "bg-emerald-950 border-emerald-800 text-emerald-100"
                : toast.type === "error"
                  ? "bg-red-950 border-red-800 text-red-100"
                  : "bg-slate-900 border-slate-800 text-slate-100"
            }`}
          >
            <div className="size-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              {toast.type === "success" ? (
                <svg
                  className="size-5 text-emerald-400"
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
                  className="size-5 text-red-400"
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
                  className="size-5 text-blue-400"
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
            <div>
              <div className="font-bold text-white text-xs">{toast.title}</div>
              <div className="text-xs opacity-90 mt-0.5">{toast.message}</div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <AppFooter />
    </div>
  );
}
