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

interface CoachSelectionModalProps {
  isOpen: boolean;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  selectedCoach: string;
  selectedCoachId?: string;
  onSelectCoach: (
    coachName: string,
    coachId?: string,
    coachNip?: string,
  ) => void;
  onClose: () => void;
  roleFilter?: "coaching" | "mentoring";
  unitKerjaNama?: string;
  unitKerjaKode?: string;
  unitKerjaId?: string;
}

export default function CoachSelectionModal({
  isOpen,
  searchTerm,
  onSearchTermChange,
  selectedCoach,
  selectedCoachId,
  onSelectCoach,
  onClose,
  roleFilter = "coaching",
  unitKerjaNama: propUnitKerjaNama,
  unitKerjaKode: propUnitKerjaKode,
  unitKerjaId: propUnitKerjaId,
}: CoachSelectionModalProps) {
  const [pegawaiList, setPegawaiList] = useState<SIKPegawai[]>([]);
  const [unitKerjaRefList, setUnitKerjaRefList] = useState<UnitKerjaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "certified">("all");
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

  // Load user data dari localStorage jika prop tidak tersedia
  const [localUserUnit, setLocalUserUnit] = useState<string>("");
  useEffect(() => {
    try {
      const stored =
        localStorage.getItem("user") || localStorage.getItem("cmc_user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u.unit_kerja || u.unit) {
          setLocalUserUnit(u.unit_kerja || u.unit);
        }
      }
    } catch {}
  }, []);

  // Load referensi Unit Kerja untuk mencocokkan kode unit kerja (lazy load saat modal dibuka)
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

  // Selesaikan nama, kode, dan ID unit kerja yang sama dari user login
  const { resolvedUnitNama, resolvedUnitKode, resolvedUnitId } = useMemo(() => {
    const rawUnit = (localUserUnit || propUnitKerjaNama || "").trim();
    const matched = unitKerjaRefList.find(
      (u) =>
        u.nama.toLowerCase() === rawUnit.toLowerCase() ||
        u.nama.toLowerCase().includes(rawUnit.toLowerCase()) ||
        rawUnit.toLowerCase().includes(u.nama.toLowerCase()) ||
        (u.kode && u.kode.toLowerCase() === rawUnit.toLowerCase()) ||
        u.id.toLowerCase() === rawUnit.toLowerCase(),
    );

    return {
      resolvedUnitNama: matched?.nama || rawUnit || propUnitKerjaNama || "",
      resolvedUnitKode:
        propUnitKerjaKode ||
        matched?.kode ||
        (rawUnit
          ? "UK-" +
            rawUnit
              .replace(/[^A-Za-z0-9]/g, "")
              .slice(0, 4)
              .toUpperCase()
          : "-"),
      resolvedUnitId: propUnitKerjaId || matched?.id || "",
    };
  }, [
    localUserUnit,
    propUnitKerjaNama,
    propUnitKerjaKode,
    propUnitKerjaId,
    unitKerjaRefList,
  ]);

  // Load data pegawai dari Unit Kerja yang sama
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    const loadUnitPegawai = async () => {
      try {
        let items: SIKPegawai[] = [];

        // 1. Prioritaskan pengambilan via API unit-kerja/:id/pegawai
        if (resolvedUnitId) {
          const res = await fetchPegawaiByUnitKerja(
            resolvedUnitId,
            searchTerm,
            100,
            0,
          );
          items = res.items || [];
        }

        // 2. Fallback via searchSikPegawai dengan filter unit_kerja
        if (items.length === 0 && resolvedUnitNama) {
          const res = await searchSikPegawai(
            searchTerm,
            100,
            0,
            resolvedUnitNama,
          );
          items = res.items || [];
        }

        if (isMounted) {
          setPegawaiList(items);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || "Gagal memuat data pegawai unit kerja");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const timer = setTimeout(loadUnitPegawai, searchTerm ? 250 : 0);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [isOpen, resolvedUnitId, resolvedUnitNama, searchTerm]);

  // Freeze background scroll & handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Filter pegawai berdasarkan pencarian dan kesamaan unit kerja
  const filteredPegawai = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const targetRole = roleFilter === "mentoring" ? "mentor" : "coach";

    return pegawaiList.filter((p) => {
      // Pastikan unit kerja cocok
      if (resolvedUnitNama && p.unit_kerja) {
        const pUnit = p.unit_kerja.toLowerCase();
        const tUnit = resolvedUnitNama.toLowerCase();
        if (!pUnit.includes(tUnit) && !tUnit.includes(pUnit)) {
          return false;
        }
      }

      // Filter tab jika memilih certified (coach/mentor)
      if (activeTab === "certified") {
        if (p.system_role !== targetRole) {
          return false;
        }
      }

      if (!term) return true;
      const nip = (p.nip || "").toLowerCase();
      const nama = (p.nama || "").toLowerCase();
      const jabatan = (p.jabatan || "").toLowerCase();
      return (
        nip.includes(term) || nama.includes(term) || jabatan.includes(term)
      );
    });
  }, [pegawaiList, searchTerm, resolvedUnitNama, activeTab, roleFilter]);

  // Hitung jumlah coach / mentor di unit kerja ini
  const certifiedCount = useMemo(() => {
    const targetRole = roleFilter === "mentoring" ? "mentor" : "coach";
    return pegawaiList.filter((p) => p.system_role === targetRole).length;
  }, [pegawaiList, roleFilter]);

  const getInitials = (nama: string) => {
    if (!nama) return "PG";
    const parts = nama
      .replace(/,\s*.*$/, "")
      .trim()
      .split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const formatFullName = (p: SIKPegawai) => {
    const depan = p.gelar_depan ? `${p.gelar_depan} ` : "";
    const belakang = p.gelar_belakang ? `, ${p.gelar_belakang}` : "";
    return `${depan}${p.nama}${belakang}`;
  };

  const roleLabel = roleFilter === "mentoring" ? "Mentor" : "Coach";

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overscroll-none"
        >
          {/* Backdrop click to close */}
          <div
            className="fixed inset-0 bg-transparent cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10 max-h-[90vh] overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0a2540] via-[#13396b] to-[#1e3a5f] p-6 text-white relative">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Tutup Modal"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-2">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                    Sistem Kepegawaian SIK Kemenhub
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    Pilih {roleLabel} dari Unit Kerja
                  </h3>
                </div>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed max-w-md">
                Pilih pegawai dari unit kerja yang sama untuk bertindak sebagai{" "}
                {roleLabel} pendamping sesi Anda.
              </p>
            </div>

            {/* Search Input & Filter Tabs */}
            <div className="p-6 pb-2 space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => onSearchTermChange(e.target.value)}
                  placeholder={`Cari nama ${roleLabel.toLowerCase()}, NIP, atau jabatan...`}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a2540] focus:bg-white transition-all"
                  autoFocus
                />
                <svg
                  className="size-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
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
                {searchTerm && (
                  <button
                    onClick={() => onSearchTermChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer p-1"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Coach / Pegawai List (Lines 206-276) */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-2.5 min-h-[260px] max-h-[50vh]">
              {loading && (
                <div className="py-12 text-center text-slate-500">
                  <div className="inline-block size-8 border-3 border-[#0a2540] border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="text-xs font-medium">
                    Memuat data pegawai unit kerja...
                  </p>
                </div>
              )}

              {error && (
                <div className="py-8 text-center text-red-600 bg-red-50 rounded-2xl border border-red-200 p-4">
                  <p className="text-xs font-semibold">{error}</p>
                </div>
              )}

              {!loading && !error && filteredPegawai.length === 0 && (
                <div className="py-12 text-center text-slate-400">
                  <div className="size-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-2 text-xl">
                    🔍
                  </div>
                  <p className="text-xs font-medium text-slate-600">
                    Tidak ada pegawai yang sesuai di unit kerja ini
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Unit: {resolvedUnitNama} (Kode: {resolvedUnitKode})
                  </p>
                </div>
              )}

              {!loading &&
                !error &&
                filteredPegawai.map((p) => {
                  const fullName = formatFullName(p);
                  const isSelected =
                    (p.nip && p.nip === selectedCoachId) ||
                    fullName === selectedCoach ||
                    p.nama === selectedCoach;

                  const isRoleCertified =
                    (roleFilter === "mentoring" &&
                      p.system_role === "mentor") ||
                    (roleFilter === "coaching" && p.system_role === "coach");

                  return (
                    <div
                      key={p.nip}
                      onClick={() => {
                        onSelectCoach(fullName, p.nip, p.nip);
                        onClose();
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                        isSelected
                          ? "bg-blue-50/70 border-blue-600 ring-1 ring-blue-600"
                          : "bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/70 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="size-11 rounded-full bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs border border-white">
                          {getInitials(p.nama)}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 transition-colors truncate">
                              {fullName}
                            </span>
                            {isRoleCertified ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 shrink-0">
                                {roleFilter === "mentoring"
                                  ? "🤝 Mentor Unit"
                                  : "🧭 Coach Unit"}
                              </span>
                            ) : p.system_role === "admin" ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 shrink-0">
                                👑 Admin Unit
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                                {p.status_kepegawaian || "PNS"}
                              </span>
                            )}
                          </div>
                          <span className="text-[11.5px] text-slate-600 truncate mt-0.5">
                            {p.jabatan || "Pejabat / Staf ASN"} ·{" "}
                            {p.pangkat
                              ? `${p.pangkat} (${p.golongan_ruang || "-"})`
                              : "Kemenhub"}
                          </span>
                          <div className="flex items-center gap-1.5 text-[10.5px] text-slate-400 mt-1 font-mono">
                            <span>NIP: {p.nip}</span>
                            <span>•</span>
                            <span className="font-sans text-blue-600 truncate">
                              {p.sub_unit_kerja ||
                                p.unit_kerja ||
                                resolvedUnitNama}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        {isSelected && (
                          <span className="text-xs font-bold text-blue-700 hidden sm:inline">
                            Terpilih
                          </span>
                        )}
                        <div
                          className={`size-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-blue-600 border-blue-600"
                              : "border-slate-300 group-hover:border-blue-400"
                          }`}
                        >
                          {isSelected && (
                            <div className="size-2 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Pencocokan berdasarkan Kode Unit Kerja:{" "}
                <strong className="font-mono text-slate-800">
                  {resolvedUnitKode}
                </strong>
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors cursor-pointer"
              >
                Selesai
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
