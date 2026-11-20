"use client";

import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SIKPegawai, searchSikPegawai } from "@/lib/api/sik";
import {
  fetchPegawaiByUnitKerja,
  fetchUnitKerjaList,
  UnitKerjaItem,
} from "@/lib/api/organization";

interface PejabatPenilaiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPejabat: (pejabat: {
    nama: string;
    jabatan: string;
    nip?: string;
    pangkat_golongan?: string;
    sub_unit_kerja?: string;
  }) => void;
  currentNip?: string;
  currentNama?: string;
  sikRecommendedNip?: string;
  unitKerjaNama?: string;
  unitKerjaKode?: string;
  unitKerjaId?: string;
}

export default function PejabatPenilaiModal({
  isOpen,
  onClose,
  onSelectPejabat,
  currentNip,
  currentNama,
  sikRecommendedNip,
  unitKerjaNama,
  unitKerjaKode,
  unitKerjaId,
}: PejabatPenilaiModalProps) {
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

  // 1. Ambil data user yang sedang login dari localStorage
  const loggedInUser = useMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored =
        localStorage.getItem("user") || localStorage.getItem("cmc_user");
      if (stored) return JSON.parse(stored);
    } catch {}
    return null;
  }, [isOpen]);

  // Load referensi Unit Kerja (lazy load saat modal dibuka)
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

  // 2. Tentukan nama & kode Unit Kerja
  const { activeUnitNama, activeUnitKode, activeUnitId } = useMemo(() => {
    const userUnitNama = (
      loggedInUser?.unit_kerja ||
      loggedInUser?.unit ||
      loggedInUser?.satuan_kerja ||
      loggedInUser?.satker ||
      loggedInUser?.agency ||
      ""
    ).trim();

    const targetNama = (userUnitNama || unitKerjaNama || "").trim();

    const matchedRef = unitKerjaRefList.find(
      (u) =>
        u.nama.toLowerCase() === targetNama.toLowerCase() ||
        u.nama.toLowerCase().includes(targetNama.toLowerCase()) ||
        targetNama.toLowerCase().includes(u.nama.toLowerCase()) ||
        (u.kode && u.kode.toLowerCase() === targetNama.toLowerCase()) ||
        u.id.toLowerCase() === targetNama.toLowerCase(),
    );

    const activeNama = matchedRef?.nama || targetNama;
    const activeKode =
      matchedRef?.kode ||
      unitKerjaKode ||
      (activeNama
        ? "UK-" +
          activeNama
            .replace(/[^A-Za-z0-9]/g, "")
            .slice(0, 4)
            .toUpperCase()
        : "-");
    const activeId = matchedRef?.id || unitKerjaId || "";

    return {
      activeUnitNama: activeNama,
      activeUnitKode: activeKode,
      activeUnitId: activeId,
    };
  }, [
    loggedInUser,
    unitKerjaNama,
    unitKerjaKode,
    unitKerjaId,
    unitKerjaRefList,
  ]);

  // 3. Load daftar pejabat/pegawai dari unit kerja
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    const loadData = async () => {
      try {
        let items: SIKPegawai[] = [];

        // Prioritas 1: Melalui ID Unit Kerja
        if (activeUnitId) {
          const res = await fetchPegawaiByUnitKerja(activeUnitId, "", 100, 0);
          if (res.items && res.items.length > 0) {
            items = res.items;
          }
        }

        // Prioritas 2: Melalui nama Unit Kerja via searchSikPegawai
        if (items.length === 0 && activeUnitNama) {
          const res = await searchSikPegawai("", 100, 0, activeUnitNama);
          if (res.items && res.items.length > 0) {
            items = res.items;
          }
        }

        // Prioritas 3: Fallback ke seluruh pegawai jika masih kosong
        if (items.length === 0) {
          const res = await searchSikPegawai("", 100, 0);
          if (res.items) {
            items = res.items;
          }
        }

        if (isMounted) {
          // Urutkan: Pimpinan/Kepala & Eselon terlebih dahulu, lalu nama
          const sorted = [...items].sort((a, b) => {
            const isKepalaA = (a.jabatan || "").toLowerCase().includes("kepala")
              ? 1
              : 0;
            const isKepalaB = (b.jabatan || "").toLowerCase().includes("kepala")
              ? 1
              : 0;
            if (isKepalaA !== isKepalaB) return isKepalaB - isKepalaA;
            return a.nama.localeCompare(b.nama);
          });
          setPegawaiList(sorted);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(
            "Gagal memuat data pejabat penilai dari SIK: " +
              (err.message || err),
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [isOpen, activeUnitId, activeUnitNama]);

  // Format display nama lengkap dengan gelar akademik
  const formatFullName = (p: SIKPegawai) => {
    const depan = p.gelar_depan ? `${p.gelar_depan} ` : "";
    const belakang = p.gelar_belakang ? `, ${p.gelar_belakang}` : "";
    return `${depan}${p.nama}${belakang}`;
  };

  const getInitials = (nama: string) => {
    return nama
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  };

  // Filter pencarian lokal
  const filteredList = useMemo(() => {
    if (!searchTerm.trim()) return pegawaiList;
    const term = searchTerm.toLowerCase().trim();
    return pegawaiList.filter(
      (p) =>
        p.nama.toLowerCase().includes(term) ||
        p.nip.toLowerCase().includes(term) ||
        (p.jabatan && p.jabatan.toLowerCase().includes(term)) ||
        (p.sub_unit_kerja && p.sub_unit_kerja.toLowerCase().includes(term)),
    );
  }, [pegawaiList, searchTerm]);

  const handleSelect = (p: SIKPegawai) => {
    onSelectPejabat({
      nama: formatFullName(p),
      jabatan: p.jabatan || "Pejabat Penilai / Pimpinan",
      nip: p.nip,
      pangkat_golongan: p.pangkat
        ? `${p.pangkat} (${p.golongan_ruang || "-"})`
        : p.golongan_ruang || "",
      sub_unit_kerja: p.sub_unit_kerja,
    });
    onClose();
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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh] border border-[#e2e6eb]"
          >
            {/* Header Banner */}
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
                    Sistem Kepegawaian SIK Kemenhub
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    Pilih Pejabat Penilai / Atasan SIK
                  </h3>
                </div>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed max-w-lg">
                Verifikator sesi pendampingan sesuai penetapan SKP di lingkungan
                Kementerian Perhubungan.
              </p>
            </div>

            {/* Search Input */}
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
                  placeholder="Cari nama, NIP, atau jabatan pejabat penilai di unit kerja ini..."
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

            {/* List Pejabat Body */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-2.5 min-h-[260px] max-h-[50vh]">
              {loading ? (
                <div className="py-12 text-center text-slate-500">
                  <div className="inline-block size-8 border-3 border-[#0a2540] border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="text-xs font-medium">
                    Memuat data pejabat penilai dari SIK {activeUnitNama}...
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
                    Tidak ada pejabat yang cocok di unit kerja ini
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-md mx-auto">
                    Pastikan nama atau jabatan yang dicari sesuai dengan data
                    SIK di{" "}
                    <strong>{activeUnitNama || "Unit Kerja Anda"}</strong>.
                  </p>
                </div>
              ) : (
                filteredList.map((p) => {
                  const isCurrent =
                    (currentNip && p.nip === currentNip) ||
                    (currentNama &&
                      p.nama.toLowerCase() === currentNama.toLowerCase());
                  const isRecommended =
                    sikRecommendedNip && p.nip === sikRecommendedNip;
                  const isPimpinan =
                    (p.jabatan || "").toLowerCase().includes("kepala") ||
                    (p.jabatan || "").toLowerCase().includes("direktur") ||
                    (p.jabatan || "").toLowerCase().includes("sekretaris");

                  return (
                    <div
                      key={p.nip}
                      onClick={() => handleSelect(p)}
                      className={`p-3.5 rounded-[10px] border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                        isCurrent
                          ? "bg-[#f5f8fc] border-[#0a2540] ring-1 ring-[#0a2540]"
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
                            {isRecommended && (
                              <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                                ★ Rekomendasi SIK
                              </span>
                            )}
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-semibold bg-[#f1f5f9] text-[#0a2540] border border-[#e2e6eb] shrink-0">
                                Terpilih
                              </span>
                            )}
                            {isPimpinan && (
                              <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-semibold bg-amber-50 text-amber-900 border border-amber-200 shrink-0">
                                Pimpinan
                              </span>
                            )}
                          </div>
                          <div className="text-[12px] text-[#334155] font-medium mt-0.5 truncate max-w-[400px]">
                            {p.jabatan || "Pejabat ASN"}
                          </div>
                          <div className="text-[11px] text-[#64748b] mt-0.5 flex items-center gap-2 font-mono">
                            <span>NIP: {p.nip}</span>
                            <span>•</span>
                            <span className="font-sans">
                              {p.pangkat
                                ? `${p.pangkat} (${p.golongan_ruang || "-"})`
                                : p.golongan_ruang || "-"}
                            </span>
                            {p.sub_unit_kerja && (
                              <>
                                <span>•</span>
                                <span className="font-sans text-[#0a2540] truncate max-w-[180px]">
                                  {p.sub_unit_kerja}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelect(p);
                          }}
                          className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                            isCurrent
                              ? "bg-[#0a2540] text-white"
                              : "bg-white hover:bg-[#0a2540] text-[#0a2540] hover:text-white border border-[#e2e6eb]"
                          }`}
                        >
                          {isCurrent ? "Terpilih" : "Pilih Pejabat"}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Pencarian akurat data Pejabat Penilai terhubung langsung dengan
                Master SIK Kemenhub.
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-[6px] text-xs font-semibold border border-[#e2e6eb] bg-white hover:bg-slate-100 text-[#334155] transition-colors cursor-pointer shadow-2xs"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
