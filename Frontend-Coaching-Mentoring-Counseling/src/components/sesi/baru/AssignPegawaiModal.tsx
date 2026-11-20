"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SIKPegawai, searchSikPegawai } from "@/lib/api/sik";
import {
  fetchPegawaiByUnitKerja,
  fetchUnitKerjaList,
  UnitKerjaItem,
} from "@/lib/api/organization";

interface AssignPegawaiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPegawai: (pegawai: SIKPegawai) => void;
  currentNip?: string;
  selectedNips?: string[];
  isGroupMode?: boolean;
  unitKerjaNama?: string;
  unitKerjaKode?: string;
  unitKerjaId?: string;
}

export default function AssignPegawaiModal({
  isOpen,
  onClose,
  onSelectPegawai,
  currentNip,
  selectedNips = [],
  isGroupMode = false,
  unitKerjaNama,
  unitKerjaKode,
  unitKerjaId,
}: AssignPegawaiModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [pegawaiList, setPegawaiList] = useState<SIKPegawai[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unitKerjaRefList, setUnitKerjaRefList] = useState<UnitKerjaItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Kunci scrolling latar belakang saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // 1. Ambil data user yang sedang login langsung dari localStorage
  const loggedInUser = useMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored =
        localStorage.getItem("user") || localStorage.getItem("cmc_user");
      if (stored) return JSON.parse(stored);
    } catch {}
    return null;
  }, [isOpen]);

  // Load referensi Unit Kerja untuk pencocokan kode unit kerja (lazy load saat modal dibuka)
  useEffect(() => {
    if (!isOpen) return;
    if (unitKerjaRefList.length > 0) return;
    fetchUnitKerjaList()
      .then((list) => {
        if (list && list.length > 0) {
          setUnitKerjaRefList(list);
        }
      })
      .catch(() => {});
  }, [isOpen, unitKerjaRefList.length]);

  // 2. Tentukan nama & kode Unit Kerja dari user yang sedang login
  const { activeUnitNama, activeUnitKode, activeUnitId } = useMemo(() => {
    // Prioritas 1: Unit kerja user yang sedang login
    const userUnitNama = (
      loggedInUser?.unit_kerja ||
      loggedInUser?.unit ||
      loggedInUser?.satuan_kerja ||
      loggedInUser?.satker ||
      loggedInUser?.agency ||
      ""
    ).trim();

    // Prioritas 2: Props yang diteruskan
    const targetNama = (userUnitNama || unitKerjaNama || "").trim();

    // Cari kode unit kerja dari referensi
    const matchedRef = unitKerjaRefList.find(
      (u) =>
        u.nama.toLowerCase() === targetNama.toLowerCase() ||
        u.nama.toLowerCase().includes(targetNama.toLowerCase()) ||
        targetNama.toLowerCase().includes(u.nama.toLowerCase()) ||
        (u.kode && u.kode.toLowerCase() === targetNama.toLowerCase()),
    );

    const targetKode =
      unitKerjaKode ||
      matchedRef?.kode ||
      (targetNama
        ? "UK-" +
          targetNama
            .replace(/[^A-Za-z0-9]/g, "")
            .slice(0, 4)
            .toUpperCase()
        : "-");

    const targetId = unitKerjaId || matchedRef?.id || "";

    return {
      activeUnitNama: matchedRef?.nama || targetNama,
      activeUnitKode: targetKode,
      activeUnitId: targetId,
    };
  }, [
    loggedInUser,
    unitKerjaNama,
    unitKerjaKode,
    unitKerjaId,
    unitKerjaRefList,
  ]);

  // 3. Load pegawai dari backend berdasarkan Unit Kerja user yang login
  const loadData = useCallback(async () => {
    if (!isOpen) return;
    setLoading(true);
    setError(null);

    try {
      let items: SIKPegawai[] = [];

      // Query utama: searchSikPegawai dengan filter unit_kerja resmi dari SIK
      if (activeUnitNama) {
        const res = await searchSikPegawai(searchTerm, 100, 0, activeUnitNama);
        items = res.items || [];
      }

      // Fallback 1: Jika belum ada hasil dan ada activeUnitId, coba via unit-kerja/:id/pegawai
      if (items.length === 0 && activeUnitId) {
        try {
          const res = await fetchPegawaiByUnitKerja(
            activeUnitId,
            searchTerm,
            100,
            0,
          );
          if (res.items && res.items.length > 0) {
            items = res.items;
          }
        } catch {}
      }

      // Fallback 2: Jika activeUnitNama berbeda dengan prop unitKerjaNama
      if (
        items.length === 0 &&
        unitKerjaNama &&
        unitKerjaNama !== activeUnitNama
      ) {
        const res = await searchSikPegawai(searchTerm, 100, 0, unitKerjaNama);
        items = res.items || [];
      }

      setPegawaiList(items);
    } catch (err: any) {
      setError(err?.message || "Gagal memuat data pegawai unit kerja");
    } finally {
      setLoading(false);
    }
  }, [isOpen, activeUnitNama, activeUnitId, unitKerjaNama, searchTerm]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(loadData, searchTerm ? 250 : 0);
    return () => clearTimeout(timer);
  }, [isOpen, loadData, searchTerm]);

  // 4. Client-side filtering ensures strict match terhadap unit kerja dan kata kunci
  const filteredList = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const targetUnit = activeUnitNama.toLowerCase();

    return pegawaiList.filter((p) => {
      // Pencocokan unit kerja
      if (targetUnit && p.unit_kerja) {
        const pUnit = p.unit_kerja.toLowerCase();
        if (!pUnit.includes(targetUnit) && !targetUnit.includes(pUnit)) {
          return false;
        }
      }
      if (!term) return true;
      const nip = (p.nip || "").toLowerCase();
      const nama = (p.nama || "").toLowerCase();
      const jabatan = (p.jabatan || "").toLowerCase();
      const subUnit = (p.sub_unit_kerja || "").toLowerCase();
      return (
        nip.includes(term) ||
        nama.includes(term) ||
        jabatan.includes(term) ||
        subUnit.includes(term)
      );
    });
  }, [pegawaiList, searchTerm, activeUnitNama]);

  const cleanNama = (nama: string) => {
    return (nama || "").replace(/^[,\s]+/, "").trim();
  };

  const getInitials = (nama: string) => {
    const cleaned = cleanNama(nama);
    if (!cleaned) return "PG";
    const parts = cleaned
      .replace(/,\s*.*$/, "")
      .trim()
      .split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const formatFullName = (p: SIKPegawai) => {
    const cleaned = cleanNama(p.nama);
    const depan = p.gelar_depan ? `${p.gelar_depan} ` : "";
    const belakang = p.gelar_belakang ? `, ${p.gelar_belakang}` : "";
    return `${depan}${cleaned}${belakang}`;
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 bg-white rounded-2xl shadow-2xl border border-[#e2e6eb] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0a2540] via-[#13396b] to-[#1e3a5f] p-6 text-white relative">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-5 right-5 size-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                title="Tutup Modal"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-2">
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-wider text-amber-300">
                    {isGroupMode
                      ? "Peserta Sesi Kelompok"
                      : "Penugasan Admin Unit Kerja"}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    {isGroupMode
                      ? "Tambah Peserta Kelompok (1-on-Group)"
                      : "Tugaskan Pegawai Unit Kerja"}
                  </h3>
                </div>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed max-w-lg">
                {isGroupMode
                  ? "Tambahkan pegawai dari unit kerja Anda ke dalam sesi kelompok ini. Anda dapat menambahkan beberapa pegawai sekaligus."
                  : "Pilih pegawai yang akan mengikuti sesi ini. Sesuai hak akses admin, penugasan dibatasi hanya untuk pegawai di unit kerja Anda."}
              </p>
            </div>

            {/* Search Input Bar */}
            <div className="p-6 pb-3">
              <div className="relative">
                <svg
                  className="size-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
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
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama, NIP, atau jabatan pegawai di unit kerja ini..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-[8px] text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] focus:bg-white transition-all"
                  autoFocus
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer p-1"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Pegawai List Body */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-2.5 min-h-[260px] max-h-[50vh]">
              {loading ? (
                <div className="py-12 text-center text-slate-500">
                  <div className="inline-block size-8 border-3 border-[#0a2540] border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="text-xs font-medium">
                    Memuat data pegawai {activeUnitNama}...
                  </p>
                </div>
              ) : error ? (
                <div className="py-8 text-center text-red-600 bg-red-50 rounded-xl border border-red-200 p-4">
                  <p className="text-xs font-semibold">{error}</p>
                </div>
              ) : filteredList.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <div className="size-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-2 text-xl">
                    🔍
                  </div>
                  <p className="text-xs font-medium text-slate-600">
                    Tidak ada pegawai yang cocok di unit kerja ini
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-md mx-auto">
                    Pencarian dibatasi hanya untuk pegawai resmi SIK di
                    lingkungan{" "}
                    <strong>{activeUnitNama || "Unit Kerja Anda"}</strong>.
                  </p>
                </div>
              ) : (
                filteredList.map((p) => {
                  const isCurrent = p.nip === currentNip;
                  const isInGroup = isGroupMode && selectedNips.includes(p.nip);
                  const isSelected = isGroupMode ? isInGroup : isCurrent;

                  return (
                    <div
                      key={p.nip}
                      onClick={() => onSelectPegawai(p)}
                      className={`p-3.5 rounded-[10px] border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                        isSelected
                          ? isGroupMode
                            ? "bg-[#f0fdf4] border-emerald-500 ring-1 ring-emerald-500"
                            : "bg-[#f5f8fc] border-[#0a2540] ring-1 ring-[#0a2540]"
                          : "bg-white border-[#e2e6eb] hover:border-[#0a2540]/40 hover:bg-slate-50/60 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="size-10 rounded-full bg-[#0a2540] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                          {getInitials(p.nama)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="font-semibold text-slate-900 group-hover:text-[#0a2540] text-xs sm:text-[13.5px] truncate">
                              {formatFullName(p)}
                            </h4>
                            {isCurrent && !isGroupMode && (
                              <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-semibold bg-[#f1f5f9] text-[#0a2540] border border-[#e2e6eb] shrink-0">
                                Saat Ini
                              </span>
                            )}
                            {isInGroup && (
                              <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                                ✓ Dalam Kelompok
                              </span>
                            )}
                            {p.system_role === "admin" && (
                              <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                                Admin
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-[#64748b] font-mono mt-0.5 flex items-center gap-2">
                            <span>NIP: {p.nip}</span>
                            <span>•</span>
                            <span className="font-sans font-medium text-[#334155] truncate max-w-[200px]">
                              {p.jabatan || "-"}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#94a3b8] mt-0.5 flex items-center gap-2 truncate">
                            <span>
                              {p.pangkat
                                ? `${p.pangkat} (${p.golongan_ruang || "-"})`
                                : "-"}
                            </span>
                            <span>•</span>
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-100 text-slate-600 font-medium">
                              {p.status_kepegawaian || "PNS"}
                            </span>
                            {p.sub_unit_kerja && (
                              <>
                                <span>•</span>
                                <span className="text-[#0a2540] font-medium truncate max-w-[150px]">
                                  {p.sub_unit_kerja}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isGroupMode ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectPegawai(p);
                            }}
                            className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                              isInGroup
                                ? "bg-emerald-600 hover:bg-red-600 text-white"
                                : "bg-[#0a2540] hover:bg-[#13396b] text-white"
                            }`}
                          >
                            {isInGroup ? "✓ Terdaftar" : "+ Tambah"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectPegawai(p);
                            }}
                            className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                              isCurrent
                                ? "bg-[#0a2540] text-white"
                                : "bg-white hover:bg-[#0a2540] text-[#0a2540] hover:text-white border border-[#e2e6eb]"
                            }`}
                          >
                            {isCurrent ? "Terpilih" : "Pilih Pegawai"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Pencocokan berbasis Kode Unit Kerja:{" "}
                <strong className="font-mono text-[#0f172a]">
                  {activeUnitKode || "-"}
                </strong>
              </span>
              <div className="flex items-center gap-2">
                {isGroupMode && selectedNips.length > 0 && (
                  <span className="text-[#0a2540] font-semibold text-xs bg-[#f1f5f9] px-2.5 py-1 rounded-[6px] border border-[#e2e6eb]">
                    {selectedNips.length} Peserta Terpilih
                  </span>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-4 py-2 rounded-[6px] text-xs font-semibold transition-colors cursor-pointer shadow-2xs ${
                    isGroupMode
                      ? "bg-[#0a2540] hover:bg-[#13396b] text-white"
                      : "border border-[#e2e6eb] bg-white hover:bg-slate-100 text-[#334155]"
                  }`}
                >
                  {isGroupMode ? "Selesai Memilih" : "Tutup"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
