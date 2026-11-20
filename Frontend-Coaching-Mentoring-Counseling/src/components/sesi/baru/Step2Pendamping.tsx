"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  fetchUnitKerjaList,
  fetchPegawaiByUnitKerja,
  UnitKerjaItem,
} from "@/lib/api/organization";
import { SIKPegawai, searchSikPegawai, fetchSikPegawai } from "@/lib/api/sik";
import AssignPegawaiModal from "./AssignPegawaiModal";
import PejabatPenilaiModal from "./PejabatPenilaiModal";

export interface LoggedInUserData {
  full_name?: string;
  name?: string;
  nip?: string;
  role?: string;
  unit?: string;
  unit_kerja?: string;
  sub_unit_kerja?: string;
  sub_unit_kerja_kode?: string;
  agency?: string;
  satuan_kerja?: string;
  satker?: string;
  jabatan?: string;
  gelar_depan?: string;
  gelar_belakang?: string;
  nama_lengkap_gelar?: string;
  pangkat_golongan?: string;
  status_kepegawaian?: string;
  pendidikan_terakhir?: string;
  atasan_langsung_nip?: string;
  atasan_langsung_nama?: string;
  atasan_langsung_jabatan?: string;
  sik_synced_at?: string;
}

interface Step2PendampingProps {
  selectedCoach: string;
  onSelectCoach: (coach: string, coachId?: string) => void;
  onOpenCoachModal: () => void;
  atasanLangsung: string;
  jabatanAtasan: string;
  userData?: LoggedInUserData;
  assignedPegawai?: LoggedInUserData | null;
  onAssignedPegawaiChange?: (pegawai: LoggedInUserData | null) => void;
  onAtasanChange?: (nama: string, jabatan: string, nip?: string) => void;
  tipeSesi?: "1-on-1" | "1-on-group";
  groupPesertaList?: LoggedInUserData[];
  onGroupPesertaListChange?: (pesertaList: LoggedInUserData[]) => void;
}

function formatDefaultJabatanKepala(unitNama: string): string {
  const trimmed = (unitNama || "").trim();
  if (!trimmed) return "Kepala Kantor";
  const lower = trimmed.toLowerCase();
  if (lower.startsWith("balai")) {
    return `Kepala ${trimmed}`;
  }
  if (lower.startsWith("kantor")) {
    return `Kepala ${trimmed}`;
  }
  if (lower.startsWith("pusat") || lower.startsWith("pusbang")) {
    return `Kepala ${trimmed}`;
  }
  if (lower.startsWith("biro")) {
    return `Kepala ${trimmed}`;
  }
  if (lower.startsWith("direktorat")) {
    return `Direktur ${trimmed.replace(/^direktorat\s+/i, "")}`;
  }
  if (lower.startsWith("sekretariat")) {
    return `Sekretaris ${trimmed.replace(/^sekretariat\s+/i, "")}`;
  }
  return `Kepala Kantor ${trimmed}`;
}

function findKepalaKantor(pegawaiList: SIKPegawai[], unitNama: string, subUnitNama?: string) {
  if (!pegawaiList || pegawaiList.length === 0) return null;

  // 0. Prioritas Spesifik: Kepala Sub-Unit Kerja / Kepala Bidang / Kepala Bagian langsung
  if (subUnitNama && subUnitNama.trim()) {
    const cleanSub = subUnitNama.toLowerCase().trim();
    for (const p of pegawaiList) {
      const j = (p.jabatan || "").toLowerCase().trim();
      if (
        (j.startsWith("kepala ") || j.startsWith("plt. kepala") || j.startsWith("pjs. kepala")) &&
        (j.includes(cleanSub) || cleanSub.includes(j.replace(/^(plt\.|pjs\.)?\s*kepala\s+/i, "").trim()))
      ) {
        const depan = p.gelar_depan ? `${p.gelar_depan} ` : "";
        const belakang = p.gelar_belakang ? `, ${p.gelar_belakang}` : "";
        return {
          nama: `${depan}${p.nama}${belakang}`,
          jabatan: p.jabatan || `Kepala ${subUnitNama}`,
          nip: p.nip,
        };
      }
    }
  }

  // 1. Prioritas Utama: Jabatan pimpinan utama definitif unit kerja
  const primaryKeywords = [
    "kepala balai",
    "kepala kantor",
    "kepala pusat",
    "kepala pusbang",
    "kepala biro",
    "kepala badan",
    "kepala sekretariat",
    "direktur",
    "inspektur",
    "sekretaris badan",
    "sekretaris direktorat",
  ];

  for (const p of pegawaiList) {
    const j = (p.jabatan || "").toLowerCase().trim();
    if (primaryKeywords.some((kw) => j.startsWith(kw) || j.includes(kw))) {
      if (
        !j.includes("wakil") &&
        !j.includes("subbagian") &&
        !j.includes("seksi")
      ) {
        const depan = p.gelar_depan ? `${p.gelar_depan} ` : "";
        const belakang = p.gelar_belakang ? `, ${p.gelar_belakang}` : "";
        return {
          nama: `${depan}${p.nama}${belakang}`,
          jabatan: p.jabatan || formatDefaultJabatanKepala(unitNama),
          nip: p.nip,
        };
      }
    }
  }

  // 2. Prioritas Kedua: Jabatan yang diawali "Kepala " (kecuali seksi/subseksi)
  for (const p of pegawaiList) {
    const j = (p.jabatan || "").toLowerCase().trim();
    if (
      (j.startsWith("kepala ") ||
        j.startsWith("plt. kepala") ||
        j.startsWith("pjs. kepala")) &&
      !j.includes("seksi") &&
      !j.includes("subseksi")
    ) {
      const depan = p.gelar_depan ? `${p.gelar_depan} ` : "";
      const belakang = p.gelar_belakang ? `, ${p.gelar_belakang}` : "";
      return {
        nama: `${depan}${p.nama}${belakang}`,
        jabatan: p.jabatan || formatDefaultJabatanKepala(unitNama),
        nip: p.nip,
      };
    }
  }

  // 3. Prioritas Ketiga: Pegawai dengan Eselon pimpinan tertinggi (Eselon I, II, III)
  const eselonOrder = ["I", "II.A", "II.B", "II", "III.A", "III.B", "III"];
  for (const eselon of eselonOrder) {
    const found = pegawaiList.find(
      (p) => (p.eselon || "").toUpperCase() === eselon,
    );
    if (found) {
      const depan = found.gelar_depan ? `${found.gelar_depan} ` : "";
      const belakang = found.gelar_belakang ? `, ${found.gelar_belakang}` : "";
      return {
        nama: `${depan}${found.nama}${belakang}`,
        jabatan: found.jabatan || formatDefaultJabatanKepala(unitNama),
        nip: found.nip,
      };
    }
  }

  // 4. Prioritas Keempat: Pangkat/Golongan tertinggi (IV/e s.d. IV/a)
  const rankOrder = ["IV/E", "IV/D", "IV/C", "IV/B", "IV/A"];
  for (const rank of rankOrder) {
    const found = pegawaiList.find(
      (p) => (p.golongan_ruang || "").toUpperCase() === rank,
    );
    if (found) {
      const depan = found.gelar_depan ? `${found.gelar_depan} ` : "";
      const belakang = found.gelar_belakang ? `, ${found.gelar_belakang}` : "";
      return {
        nama: `${depan}${found.nama}${belakang}`,
        jabatan: found.jabatan || formatDefaultJabatanKepala(unitNama),
        nip: found.nip,
      };
    }
  }

  return null;
}

export default function Step2Pendamping({
  selectedCoach,
  onSelectCoach,
  onOpenCoachModal,
  atasanLangsung,
  jabatanAtasan,
  userData,
  assignedPegawai: propAssignedPegawai,
  onAssignedPegawaiChange,
  onAtasanChange,
  tipeSesi = "1-on-1",
  groupPesertaList: propGroupPesertaList,
  onGroupPesertaListChange,
}: Step2PendampingProps) {
  // 1. Data User yang sedang login
  const [currentUser, setCurrentUser] = useState<LoggedInUserData>(() => {
    if (userData?.full_name || userData?.name) return userData;
    if (typeof window !== "undefined") {
      try {
        const stored =
          localStorage.getItem("user") || localStorage.getItem("cmc_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && (parsed.full_name || parsed.name || parsed.nip)) {
            return {
              full_name: parsed.full_name || parsed.nama || parsed.name,
              nama_lengkap_gelar:
                parsed.nama_lengkap_gelar ||
                parsed.full_name ||
                parsed.nama ||
                parsed.name,
              nip: parsed.nip,
              role: parsed.role || "client",
              unit:
                parsed.unit_kerja ||
                parsed.unit ||
                parsed.satker ||
                parsed.satuan_kerja ||
                parsed.agency,
              unit_kerja: parsed.unit_kerja || parsed.unit,
              sub_unit_kerja: parsed.sub_unit_kerja,
              sub_unit_kerja_kode: parsed.sub_unit_kerja_kode,
              satuan_kerja: parsed.satuan_kerja || parsed.satker,
              jabatan: parsed.jabatan,
              pangkat_golongan:
                parsed.pangkat_golongan ||
                (parsed.pangkat
                  ? `${parsed.pangkat} (${parsed.golongan_ruang || ""})`
                  : undefined),
              status_kepegawaian: parsed.status_kepegawaian,
              pendidikan_terakhir: parsed.pendidikan_terakhir,
              atasan_langsung_nip: parsed.atasan_langsung_nip,
              atasan_langsung_nama: parsed.atasan_langsung_nama,
              atasan_langsung_jabatan: parsed.atasan_langsung_jabatan,
              sik_synced_at: parsed.sik_synced_at,
            };
          }
        }
      } catch {}
    }
    return {
      full_name: "Siti Wahyuni, S.E.",
      nama_lengkap_gelar: "Siti Wahyuni, S.E.",
      nip: "198904122014031002",
      role: "client",
      pangkat_golongan: "Penata Muda Tk. I (III/b)",
      status_kepegawaian: "PNS",
      unit_kerja: "Balai Pengelola Transportasi Darat Kelas II Jawa Barat",
      jabatan: "Analis SDM Aparatur Ahli Pertama",
      atasan_langsung_nama: "Rudi Setiawan, S.T., M.T.",
      atasan_langsung_jabatan: "Koordinator Subtansi Pengembangan SDM",
      atasan_langsung_nip: "197805152003121001",
    };
  });

  // 2. Data Pegawai yang ditugaskan (jika role admin)
  const [localAssignedPegawai, setLocalAssignedPegawai] =
    useState<LoggedInUserData | null>(propAssignedPegawai || null);

  // Sync state if prop changes
  useEffect(() => {
    if (propAssignedPegawai !== undefined) {
      setLocalAssignedPegawai(propAssignedPegawai);
    }
  }, [propAssignedPegawai]);

  // 3. Data Peserta Kelompok (jika tipe sesi 1-on-group)
  const [localGroupPesertaList, setLocalGroupPesertaList] = useState<
    LoggedInUserData[]
  >(() => {
    if (propGroupPesertaList && propGroupPesertaList.length > 0) {
      return propGroupPesertaList;
    }
    return [currentUser];
  });

  const isInitialGroupSyncedRef = useRef(false);

  useEffect(() => {
    if (propGroupPesertaList && propGroupPesertaList.length > 0) {
      setLocalGroupPesertaList(propGroupPesertaList);
    } else if (currentUser?.nip && !isInitialGroupSyncedRef.current) {
      isInitialGroupSyncedRef.current = true;
      const init = [currentUser];
      setLocalGroupPesertaList(init);
      if (onGroupPesertaListChange) {
        onGroupPesertaListChange(init);
      }
    }
  }, [propGroupPesertaList, currentUser, onGroupPesertaListChange]);

  // Modal State untuk Assign Pegawai
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [unitKerjaRefList, setUnitKerjaRefList] = useState<UnitKerjaItem[]>([]);

  // Load user data dari localStorage jika prop tidak diberikan
  useEffect(() => {
    if (userData?.full_name || userData?.name) {
      setCurrentUser(userData);
      return;
    }

    try {
      const stored =
        localStorage.getItem("user") || localStorage.getItem("cmc_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.full_name || parsed.name)) {
          setCurrentUser({
            full_name: parsed.full_name || parsed.name,
            nama_lengkap_gelar:
              parsed.nama_lengkap_gelar || parsed.full_name || parsed.name,
            nip: parsed.nip,
            role: parsed.role,
            unit:
              parsed.unit_kerja ||
              parsed.unit ||
              parsed.agency ||
              parsed.satker,
            unit_kerja: parsed.unit_kerja || parsed.unit,
            sub_unit_kerja: parsed.sub_unit_kerja,
            sub_unit_kerja_kode: parsed.sub_unit_kerja_kode,
            satuan_kerja: parsed.satuan_kerja || parsed.satker,
            jabatan: parsed.jabatan,
            pangkat_golongan: parsed.pangkat_golongan,
            status_kepegawaian: parsed.status_kepegawaian,
            pendidikan_terakhir: parsed.pendidikan_terakhir,
            atasan_langsung_nip: parsed.atasan_langsung_nip,
            atasan_langsung_nama: parsed.atasan_langsung_nama,
            atasan_langsung_jabatan: parsed.atasan_langsung_jabatan,
            sik_synced_at: parsed.sik_synced_at,
          });
        }
      }
    } catch {}
  }, [userData]);

  // Load referensi Unit Kerja untuk mencocokkan kode unit kerja
  useEffect(() => {
    fetchUnitKerjaList()
      .then((list) => {
        if (list && list.length > 0) {
          setUnitKerjaRefList(list);
        }
      })
      .catch(() => {});
  }, []);

  // Periksa apakah user memiliki peran admin / super_admin
  const isAdmin =
    currentUser.role === "admin" || currentUser.role === "super_admin";

  // Cocokkan data unit kerja user dengan referensi untuk mendapatkan kode unit kerja
  const matchedUnitKerja = useMemo(() => {
    const userUnit = (currentUser.unit_kerja || currentUser.unit || "")
      .trim()
      .toLowerCase();
    if (!userUnit) return null;

    // Cari berdasarkan nama atau kode
    return (
      unitKerjaRefList.find(
        (u) =>
          u.nama.toLowerCase() === userUnit ||
          u.nama.toLowerCase().includes(userUnit) ||
          userUnit.includes(u.nama.toLowerCase()) ||
          (u.kode && u.kode.toLowerCase() === userUnit) ||
          u.id.toLowerCase() === userUnit,
      ) || null
    );
  }, [currentUser, unitKerjaRefList]);

  const unitKerjaNama =
    currentUser.unit_kerja || currentUser.unit || matchedUnitKerja?.nama || "";

  const unitKerjaKode =
    matchedUnitKerja?.kode ||
    (unitKerjaNama
      ? "UK-" +
        unitKerjaNama
          .replace(/[^A-Za-z0-9]/g, "")
          .slice(0, 4)
          .toUpperCase()
      : "-");

  const unitKerjaId = matchedUnitKerja?.id || "";

  // Pegawai aktif yang ditampilkan (mengikuti assignedPegawai jika admin memilih, atau currentUser)
  const activeUser = localAssignedPegawai || currentUser;
  const isAssigned = Boolean(
    localAssignedPegawai && localAssignedPegawai.nip !== currentUser.nip,
  );

  // Format Display Strings
  const displayName =
    activeUser.nama_lengkap_gelar ||
    activeUser.full_name ||
    activeUser.name ||
    "Siti Wahyuni, S.E.";
  const displayNip = activeUser.nip || "198904122014031002";
  const displayPangkatGolongan =
    activeUser.pangkat_golongan || "Penata Muda Tk. I (III/b)";
  const displayStatus = activeUser.status_kepegawaian || "PNS";
  const displayJabatan =
    activeUser.jabatan ||
    (activeUser.role === "coach"
      ? "Coach Fungsional"
      : activeUser.role === "mentor"
        ? "Mentor Senior"
        : activeUser.role === "counselor"
          ? "Konselor ASN"
          : "Analis SDM Aparatur Ahli Pertama");
  const displayUnit =
    activeUser.unit_kerja ||
    activeUser.unit ||
    activeUser.agency ||
    activeUser.satker ||
    unitKerjaNama;
  const displayJabatanUnit = `${displayJabatan} · ${displayUnit}`;

  // 4. Data Pejabat Penilai / Atasan Langsung dari SIK sebagai Verifikator
  const [detectedPejabat, setDetectedPejabat] = useState<{
    nama: string;
    jabatan: string;
    nip?: string;
    source: "sik_official" | "sik_unit_leader" | "fallback";
  } | null>(null);

  const [manualPejabat, setManualPejabat] = useState<{
    nama: string;
    jabatan: string;
    nip?: string;
  } | null>(null);

  const [showPejabatModal, setShowPejabatModal] = useState(false);
  const [, setIsLoadingPejabat] = useState(false);

  const effectiveUnitNama =
    activeUser.unit_kerja || activeUser.unit || unitKerjaNama || "";

  const resolvedTargetKeyRef = useRef("");

  useEffect(() => {
    let isMounted = true;
    if (!effectiveUnitNama && !activeUser.nip) return;

    const targetKey = `${activeUser.nip || ""}|${activeUser.atasan_langsung_nama || ""}|${activeUser.atasan_langsung_nip || ""}|${effectiveUnitNama}`;
    if (resolvedTargetKeyRef.current === targetKey) {
      return;
    }
    resolvedTargetKeyRef.current = targetKey;

    const resolvePejabatPenilai = async () => {
      try {
        setIsLoadingPejabat(true);

        // 1. Prioritas Utama: Periksa Profil Resmi SIK Pegawai berdasarkan NIP
        if (activeUser.nip) {
          try {
            const sikProfile = await fetchSikPegawai(activeUser.nip);
            if (
              sikProfile &&
              (sikProfile.atasan_langsung_nama ||
                activeUser.atasan_langsung_nama)
            ) {
              let atasanNama =
                sikProfile.atasan_langsung_nama ||
                activeUser.atasan_langsung_nama ||
                "";
              let atasanJabatan =
                sikProfile.atasan_langsung_jabatan ||
                activeUser.atasan_langsung_jabatan ||
                "Pejabat Penilai Kinerja";
              let atasanNip =
                sikProfile.atasan_langsung_nip ||
                activeUser.atasan_langsung_nip ||
                "";

              // Jika ada NIP atasan langsung, ambil profil lengkap atasan dari SIK
              if (atasanNip) {
                try {
                  const atasanProfile = await fetchSikPegawai(atasanNip);
                  if (atasanProfile) {
                    const depan = atasanProfile.gelar_depan
                      ? `${atasanProfile.gelar_depan} `
                      : "";
                    const belakang = atasanProfile.gelar_belakang
                      ? `, ${atasanProfile.gelar_belakang}`
                      : "";
                    atasanNama = `${depan}${atasanProfile.nama}${belakang}`;
                    if (atasanProfile.jabatan) {
                      atasanJabatan = atasanProfile.jabatan;
                    }
                  }
                } catch {}
              }

              if (!isMounted) return;

              const officialResult = {
                nama: atasanNama,
                jabatan: atasanJabatan,
                nip: atasanNip,
                source: "sik_official" as const,
              };
              setDetectedPejabat(officialResult);
              if (!manualPejabat && onAtasanChange) {
                onAtasanChange(
                  officialResult.nama,
                  officialResult.jabatan,
                  officialResult.nip,
                );
              }
              return;
            }
          } catch (err) {
            console.warn(
              "Gagal fetch data profil SIK untuk verifikasi atasan:",
              err,
            );
          }
        }

        // 2. Jika profil pegawai belum memiliki atasan_langsung terdaftar di SIK,
        // Cari pejabat pimpinan dari unit kerja / sub unit kerja di SIK
        let items: SIKPegawai[] = [];
        if (matchedUnitKerja?.id) {
          const res = await fetchPegawaiByUnitKerja(
            matchedUnitKerja.id,
            "",
            100,
            0,
          );
          items = res.items || [];
        }
        if (items.length === 0 && effectiveUnitNama) {
          const res = await searchSikPegawai("", 100, 0, effectiveUnitNama);
          items = res.items || [];
        }

        if (!isMounted) return;

        const detected = findKepalaKantor(
          items,
          effectiveUnitNama,
          activeUser.sub_unit_kerja,
        );
        if (detected) {
          const unitLeaderResult = {
            ...detected,
            source: "sik_unit_leader" as const,
          };
          setDetectedPejabat(unitLeaderResult);
          if (!manualPejabat && onAtasanChange) {
            onAtasanChange(
              unitLeaderResult.nama,
              unitLeaderResult.jabatan,
              unitLeaderResult.nip,
            );
          }
        } else {
          const defaultJabatan = formatDefaultJabatanKepala(effectiveUnitNama);
          const fallbackNama =
            activeUser.atasan_langsung_nama ||
            atasanLangsung ||
            "Drs. Bambang Sudarsono, M.M.";
          const fallbackData = {
            nama: fallbackNama,
            jabatan: defaultJabatan,
            nip: activeUser.atasan_langsung_nip,
            source: "fallback" as const,
          };
          setDetectedPejabat(fallbackData);
          if (!manualPejabat && onAtasanChange) {
            onAtasanChange(
              fallbackData.nama,
              fallbackData.jabatan,
              fallbackData.nip,
            );
          }
        }
      } catch {
        if (!isMounted) return;
        const defaultJabatan = formatDefaultJabatanKepala(effectiveUnitNama);
        const fallbackData = {
          nama: atasanLangsung || "Drs. Bambang Sudarsono, M.M.",
          jabatan: defaultJabatan,
          source: "fallback" as const,
        };
        setDetectedPejabat(fallbackData);
        if (!manualPejabat && onAtasanChange) {
          onAtasanChange(fallbackData.nama, fallbackData.jabatan);
        }
      } finally {
        if (isMounted) setIsLoadingPejabat(false);
      }
    };

    resolvePejabatPenilai();

    return () => {
      isMounted = false;
    };
  }, [
    activeUser.nip,
    activeUser.atasan_langsung_nama,
    activeUser.atasan_langsung_nip,
    matchedUnitKerja?.id,
    effectiveUnitNama,
  ]);

  // Pejabat yang aktif digunakan
  const activePejabat = manualPejabat || detectedPejabat;

  // Verifikator selalu mengikuti Pejabat Penilai / Atasan Langsung dari SIK
  const resolvedAtasanNama =
    activePejabat?.nama ||
    activeUser.atasan_langsung_nama ||
    atasanLangsung ||
    "Drs. Bambang Sudarsono, M.M.";

  const resolvedAtasanJabatan =
    activePejabat?.jabatan ||
    activeUser.atasan_langsung_jabatan ||
    formatDefaultJabatanKepala(effectiveUnitNama);

  const resolvedAtasanNip =
    activePejabat?.nip || activeUser.atasan_langsung_nip || "";

  const resolvedSource = manualPejabat
    ? "manual"
    : detectedPejabat?.source || "sik_official";

  // Handler saat Admin memilih pegawai dari unit kerja yang sama
  const handleSelectPegawaiFromUnit = (pegawai: SIKPegawai) => {
    const depan = pegawai.gelar_depan ? `${pegawai.gelar_depan} ` : "";
    const belakang = pegawai.gelar_belakang
      ? `, ${pegawai.gelar_belakang}`
      : "";
    const namaLengkapGelar = `${depan}${pegawai.nama}${belakang}`;

    const newAssigned: LoggedInUserData = {
      full_name: pegawai.nama,
      name: pegawai.nama,
      nama_lengkap_gelar: namaLengkapGelar,
      nip: pegawai.nip,
      role: pegawai.system_role || "client",
      pangkat_golongan: pegawai.pangkat
        ? `${pegawai.pangkat} (${pegawai.golongan_ruang || "-"})`
        : pegawai.golongan_ruang || "",
      status_kepegawaian: pegawai.status_kepegawaian || "PNS",
      unit_kerja: pegawai.unit_kerja || unitKerjaNama,
      unit: pegawai.unit_kerja || unitKerjaNama,
      satuan_kerja: pegawai.satuan_kerja,
      jabatan: pegawai.jabatan || "Pegawai ASN",
      pendidikan_terakhir: pegawai.pendidikan_terakhir,
      atasan_langsung_nip: pegawai.atasan_langsung_nip,
      atasan_langsung_nama: pegawai.atasan_langsung_nama || atasanLangsung,
      atasan_langsung_jabatan: pegawai.atasan_langsung_jabatan || jabatanAtasan,
    };

    setLocalAssignedPegawai(newAssigned);
    if (onAssignedPegawaiChange) {
      onAssignedPegawaiChange(newAssigned);
    }

    // Update atasan langsung jika tersedia
    if (pegawai.atasan_langsung_nama && onAtasanChange) {
      onAtasanChange(
        pegawai.atasan_langsung_nama,
        pegawai.atasan_langsung_jabatan || "Atasan Langsung",
        pegawai.atasan_langsung_nip,
      );
    }

    setShowAssignModal(false);
  };

  // Handler saat Admin membatalkan penugasan dan kembali ke data diri sendiri
  const handleResetToSelf = () => {
    setLocalAssignedPegawai(null);
    if (onAssignedPegawaiChange) {
      onAssignedPegawaiChange(null);
    }
    if (currentUser.atasan_langsung_nama && onAtasanChange) {
      onAtasanChange(
        currentUser.atasan_langsung_nama,
        currentUser.atasan_langsung_jabatan || "Atasan Langsung",
        currentUser.atasan_langsung_nip,
      );
    }
  };

  // Handler toggle anggota peserta kelompok (1-on-Group)
  const handleTogglePegawaiGroup = (pegawai: SIKPegawai) => {
    const isAlreadyInGroup = localGroupPesertaList.some(
      (p) => p.nip === pegawai.nip,
    );
    let updated: LoggedInUserData[];

    if (isAlreadyInGroup) {
      // Hanya hapus jika peserta lebih dari 1
      if (localGroupPesertaList.length > 1) {
        updated = localGroupPesertaList.filter((p) => p.nip !== pegawai.nip);
      } else {
        return;
      }
    } else {
      const depan = pegawai.gelar_depan ? `${pegawai.gelar_depan} ` : "";
      const belakang = pegawai.gelar_belakang
        ? `, ${pegawai.gelar_belakang}`
        : "";
      const namaLengkapGelar = `${depan}${pegawai.nama}${belakang}`;

      const newMember: LoggedInUserData = {
        full_name: pegawai.nama,
        name: pegawai.nama,
        nama_lengkap_gelar: namaLengkapGelar,
        nip: pegawai.nip,
        role: pegawai.system_role || "client",
        pangkat_golongan: pegawai.pangkat
          ? `${pegawai.pangkat} (${pegawai.golongan_ruang || "-"})`
          : pegawai.golongan_ruang || "",
        status_kepegawaian: pegawai.status_kepegawaian || "PNS",
        unit_kerja: pegawai.unit_kerja || unitKerjaNama,
        unit: pegawai.unit_kerja || unitKerjaNama,
        satuan_kerja: pegawai.satuan_kerja,
        jabatan: pegawai.jabatan || "Pegawai ASN",
        pendidikan_terakhir: pegawai.pendidikan_terakhir,
        atasan_langsung_nip: pegawai.atasan_langsung_nip,
        atasan_langsung_nama: pegawai.atasan_langsung_nama || atasanLangsung,
        atasan_langsung_jabatan:
          pegawai.atasan_langsung_jabatan || jabatanAtasan,
      };
      updated = [...localGroupPesertaList, newMember];
    }

    setLocalGroupPesertaList(updated);
    if (onGroupPesertaListChange) {
      onGroupPesertaListChange(updated);
    }
  };

  // Handler hapus satu peserta kelompok
  const handleRemoveGroupMember = (nipToRemove: string) => {
    if (localGroupPesertaList.length <= 1) return;
    const updated = localGroupPesertaList.filter((p) => p.nip !== nipToRemove);
    setLocalGroupPesertaList(updated);
    if (onGroupPesertaListChange) {
      onGroupPesertaListChange(updated);
    }
  };

  // Handler dispatcher untuk modal pemilihan pegawai
  const handleSelectPegawaiModal = (pegawai: SIKPegawai) => {
    if (tipeSesi === "1-on-group") {
      handleTogglePegawaiGroup(pegawai);
    } else {
      handleSelectPegawaiFromUnit(pegawai);
    }
  };

  return (
    <motion.div
      key="step-2"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="flex flex-col gap-4"
    >
      {/* 1. DATA PESERTA SESI (1-on-1 atau 1-on-Group) */}
      {tipeSesi === "1-on-group" ? (
        /* ==================== 1-ON-GROUP: BANYAK PESERTA ==================== */
        <div className="bg-white border border-[#e2e6eb] rounded-[10px] shadow-2xs overflow-hidden">
          {/* Header Bar */}
          <div className="border-b border-[#eef1f5] px-[22px] py-[15px] flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="size-[15px] text-[#0f172a]">
                <svg
                  className="w-full h-full"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="font-bold text-[#0f172a] text-[13.5px] leading-[20.25px]">
                Daftar Peserta Sesi Kelompok (1-on-Group)
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-[#f1f5f9] text-[#0a2540] border border-[#e2e6eb] rounded-[6px] px-2.5 py-1 text-[11.5px] font-semibold flex items-center gap-1.5">
                <svg
                  className="size-3.5 text-[#0a2540]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span>{localGroupPesertaList.length} Peserta Terdaftar</span>
              </span>
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(true)}
                  className="px-3.5 py-1.5 rounded-[6px] bg-[#0a2540] hover:bg-[#13396b] text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
                >
                  <svg
                    className="size-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Tambah Peserta</span>
                </button>
              </div>
            </div>
          </div>

          {/* Daftar Peserta */}
          <div className="p-[22px] flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {localGroupPesertaList.map((peserta, idx) => {
                const isSelf = peserta.nip === currentUser.nip;
                const canRemove = localGroupPesertaList.length > 1;

                return (
                  <div
                    key={peserta.nip || idx}
                    className="p-3.5 rounded-[8px] border border-[#eef1f5] bg-[#f7f9fb] hover:border-[#cbd5e1] hover:bg-white transition-all flex items-start justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="size-9 rounded-full bg-[#0a2540] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs mt-0.5">
                        {(
                          peserta.nama_lengkap_gelar ||
                          peserta.full_name ||
                          peserta.name ||
                          "P"
                        ).charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-semibold text-[#0f172a] text-xs sm:text-[13px] leading-snug truncate">
                            {peserta.nama_lengkap_gelar ||
                              peserta.full_name ||
                              peserta.name}
                          </h4>
                          {isSelf && (
                            <span className="bg-white border border-[#e2e6eb] rounded-[4px] px-[6px] py-[1.5px] text-[#0a2540] text-[10px] font-semibold shrink-0">
                              Akun Login
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#64748b] font-mono mt-0.5">
                          NIP: {peserta.nip || "-"}
                        </p>
                        <p className="text-[11.5px] text-[#334155] font-medium truncate mt-0.5">
                          {peserta.jabatan || "Pegawai ASN"}
                        </p>
                        <p className="text-[10.5px] text-[#94a3b8] truncate mt-0.5">
                          {peserta.pangkat_golongan || "-"} ·{" "}
                          {peserta.status_kepegawaian || "PNS"}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      {canRemove ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveGroupMember(peserta.nip || "")
                          }
                          className="px-2 py-1 rounded-[4px] text-[#64748b] hover:text-[#b42318] hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer"
                          title="Hapus peserta dari kelompok"
                        >
                          ✕ Hapus
                        </button>
                      ) : (
                        <span className="text-[10px] text-[#94a3b8] font-medium italic px-1">
                          Utama
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ==================== 1-ON-1: SATU PESERTA ==================== */
        <div className="bg-white border border-[#e2e6eb] rounded-[10px] shadow-2xs overflow-hidden">
          {/* Header Bar */}
          <div className="border-b border-[#eef1f5] px-[22px] py-[15px] flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="size-[15px] text-[#0f172a]">
                <svg
                  className="w-full h-full"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="font-bold text-[#0f172a] text-[13.5px] leading-[20.25px]">
                {isAdmin
                  ? "Data Diri Pegawai (Peserta Sesi)"
                  : "Data Diri Pegawai"}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                {isAssigned ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowAssignModal(true)}
                      className="px-3 py-1.5 rounded-[6px] bg-[#0a2540] hover:bg-[#13396b] text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
                    >
                      <svg
                        className="size-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <span>Ganti Pegawai</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetToSelf}
                      className="px-3 py-1.5 rounded-[6px] bg-white hover:bg-slate-50 border border-[#e2e6eb] text-[#334155] text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                      title="Kembalikan penugasan ke akun saya sendiri"
                    >
                      Kembali ke Saya
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAssignModal(true)}
                    className="px-3.5 py-1.5 rounded-[6px] bg-[#0a2540] hover:bg-[#13396b] text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
                  >
                    <svg
                      className="size-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    <span>Tugaskan Pegawai Lain</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* BODY DATA DIRI */}
          <div className="p-[22px] flex flex-col gap-4">
            {/* Nama */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-semibold text-[#334155] leading-[18.75px]">
                Nama Lengkap &amp; Gelar
              </label>
              <div className="bg-[#f7f9fb] border border-[#eef1f5] rounded-[6px] px-[12px] py-[9px] flex items-center justify-between gap-2.5">
                <span className="text-[13.5px] text-[#334155] font-semibold leading-[20.25px]">
                  {displayName}
                </span>
                <span className="bg-white border border-[#e2e6eb] rounded-[4px] px-[7px] py-[2px] text-[#64748b] text-[10.5px] font-semibold leading-[15.75px] shrink-0">
                  {isAssigned ? "Pegawai Ditugaskan" : "dari SIK"}
                </span>
              </div>
            </div>

            {/* NIP & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12.5px] font-semibold text-[#334155] leading-[18.75px]">
                  NIP
                </label>
                <div className="bg-[#f7f9fb] border border-[#eef1f5] rounded-[6px] px-[12px] py-[9px] flex items-center justify-between gap-2.5">
                  <span className="text-[13.5px] text-[#334155] font-normal leading-[20.25px] font-mono">
                    {displayNip}
                  </span>
                  <span className="bg-white border border-[#e2e6eb] rounded-[4px] px-[7px] py-[2px] text-[#64748b] text-[10.5px] font-semibold leading-[15.75px] shrink-0">
                    dari SIK
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12.5px] font-semibold text-[#334155] leading-[18.75px]">
                  Pangkat &amp; Golongan Ruang
                </label>
                <div className="bg-[#f7f9fb] border border-[#eef1f5] rounded-[6px] px-[12px] py-[9px] flex items-center justify-between gap-2.5">
                  <span className="text-[13.5px] text-[#334155] font-normal leading-[20.25px]">
                    {displayPangkatGolongan} · {displayStatus}
                  </span>
                  <span className="bg-white border border-[#e2e6eb] rounded-[4px] px-[7px] py-[2px] text-[#64748b] text-[10.5px] font-semibold leading-[15.75px] shrink-0">
                    dari SIK
                  </span>
                </div>
              </div>
            </div>

            {/* Jabatan & Unit Kerja */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-semibold text-[#334155] leading-[18.75px]">
                Jabatan &amp; Unit Kerja
              </label>
              <div className="bg-[#f7f9fb] border border-[#eef1f5] rounded-[6px] px-[12px] py-[9px] flex items-center justify-between gap-2.5">
                <span className="text-[13.5px] text-[#334155] font-normal leading-[20.25px]">
                  {displayJabatanUnit}
                </span>
                <span className="bg-white border border-[#e2e6eb] rounded-[4px] px-[7px] py-[2px] text-[#64748b] text-[10.5px] font-semibold leading-[15.75px] shrink-0">
                  dari SIK
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PENDAMPING (Figma Node 832:830) */}
      <div className="bg-white border border-[#e2e6eb] rounded-[10px] shadow-2xs">
        <div className="border-b border-[#eef1f5] px-[22px] py-[15px] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-[15px] text-[#0f172a]">
              <svg
                className="w-full h-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h2 className="font-bold text-[#0f172a] text-[13.5px] leading-[20.25px]">
              Pendamping
            </h2>
          </div>
          <span className="text-[#64748b] text-[12px] leading-[18px]">
            Wajib
          </span>
        </div>

        <div className="p-[22px] flex flex-col gap-4">
          {/* Coach Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1 leading-[18.75px]">
              <span>Coach / Mentor</span>
              <span className="text-[#b42318]">*</span>
            </label>

            {selectedCoach ? (
              <div className="bg-[#f7f9fb] border border-[#eef1f5] rounded-[6px] p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-8 rounded-full bg-[#0a2540] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {selectedCoach.charAt(0)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-[13.5px] text-[#0f172a] truncate">
                      {selectedCoach}
                    </span>
                    <span className="text-[11.5px] text-[#64748b] truncate">
                      Praktisi Terakreditasi BPSDM Perhubungan
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={onOpenCoachModal}
                    className="px-2.5 py-1 text-xs font-semibold text-[#0a2540] hover:underline rounded transition-colors cursor-pointer"
                  >
                    Ganti
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectCoach("", "")}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors cursor-pointer"
                    title="Hapus pilihan"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenCoachModal}
                className="w-full h-[38px] px-3 bg-white border border-[#e2e6eb] hover:bg-slate-50 hover:border-slate-300 rounded-[6px] flex items-center justify-start gap-2 text-[13px] font-medium text-[#64748b] transition-colors cursor-pointer shadow-2xs"
              >
                <svg
                  className="size-[13px] text-[#64748b]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="leading-[19.5px]">Cari Coach atau Mentor</span>
              </button>
            )}
            <span className="text-[#94a3b8] text-[11.5px] leading-[17.25px]">
              Pilih Coach atau Mentor terakreditasi BPSDM Kemenhub untuk
              mendampingi sesi Anda.
            </span>
          </div>

          {/* Pejabat Penilai / Atasan Langsung dari SIK sebagai Verifikator */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between flex-wrap gap-1">
              <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1.5 leading-[18.75px]">
                <span>
                  Pejabat Penilai / Atasan Langsung sebagai Verifikator
                </span>
                <span className="text-[#b42318]">*</span>
              </label>
              <div className="flex items-center gap-1.5 flex-wrap">
                {effectiveUnitNama && (
                  <span className="text-[11px] font-semibold text-[#475569] bg-[#f1f5f9] px-2 py-0.5 rounded-[4px] border border-[#e2e6eb]">
                    Unit: {effectiveUnitNama}
                  </span>
                )}
                <span
                  className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-[4px] border ${
                    resolvedSource === "sik_official"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : resolvedSource === "manual"
                        ? "bg-[#f1f5f9] text-[#0a2540] border-[#cbd5e1]"
                        : "bg-[#f0f9ff] text-[#0369a1] border-[#bae6fd]"
                  }`}
                >
                  {resolvedSource === "sik_official"
                    ? "✓ Pejabat Penilai SIK"
                    : resolvedSource === "manual"
                      ? "✓ Pejabat Dipilih"
                      : "✓ Pimpinan Unit SIK"}
                </span>
              </div>
            </div>

            <div className="bg-[#f7f9fb] border border-[#eef1f5] rounded-[6px] p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="size-9 rounded-[6px] bg-slate-100 text-[#0a2540] flex items-center justify-center shrink-0 border border-[#e2e6eb] mt-0.5">
                  <svg
                    className="size-[17px] text-[#0a2540]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-[#0f172a] text-[13.5px] leading-[20.25px] truncate">
                    {resolvedAtasanNama}
                  </span>
                  <span className="text-[#475569] text-[12px] font-medium leading-[17px] truncate mt-0.5">
                    {resolvedAtasanJabatan}
                  </span>
                  {resolvedAtasanNip && (
                    <span className="text-[11px] text-[#64748b] font-mono mt-0.5">
                      NIP: {resolvedAtasanNip}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                {manualPejabat && (
                  <button
                    type="button"
                    onClick={() => {
                      setManualPejabat(null);
                      if (detectedPejabat && onAtasanChange) {
                        onAtasanChange(
                          detectedPejabat.nama,
                          detectedPejabat.jabatan,
                          detectedPejabat.nip,
                        );
                      }
                    }}
                    className="px-2.5 py-1.5 rounded-[6px] text-xs font-semibold text-[#64748b] hover:text-[#0f172a] hover:bg-slate-200/60 transition-colors cursor-pointer"
                    title="Kembalikan ke data pejabat penilai bawaan SIK"
                  >
                    Reset ke SIK
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowPejabatModal(true)}
                  className="px-3 py-1.5 rounded-[6px] bg-white border border-[#e2e6eb] hover:bg-slate-50 hover:border-slate-300 text-[#334155] text-xs font-semibold transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
                >
                  <svg
                    className="size-3.5 text-[#64748b]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span>Ubah / Cari Pejabat SIK</span>
                </button>
              </div>
            </div>

            <span className="text-[#94a3b8] text-[11.5px] leading-[17.25px]">
              Pejabat Penilai / Atasan Langsung dari SIK menerima notifikasi
              &quot;Mengetahui&quot; dan memverifikasi hasil akhir sesi
              pendampingan sesuai penetapan SKP Kemenhub.
            </span>
          </div>
        </div>
      </div>

      {/* 3. ASSIGN PEGAWAI MODAL (Role Admin atau Penambahan Peserta Kelompok) */}
      <AssignPegawaiModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        onSelectPegawai={handleSelectPegawaiModal}
        currentNip={activeUser.nip}
        selectedNips={
          tipeSesi === "1-on-group"
            ? localGroupPesertaList.map((p) => p.nip || "")
            : undefined
        }
        isGroupMode={tipeSesi === "1-on-group"}
        unitKerjaNama={unitKerjaNama}
        unitKerjaKode={unitKerjaKode}
        unitKerjaId={unitKerjaId}
      />

      {/* 4. PEJABAT PENILAI MODAL (Cek & Pilih Pejabat Penilai dari SIK) */}
      <PejabatPenilaiModal
        isOpen={showPejabatModal}
        onClose={() => setShowPejabatModal(false)}
        onSelectPejabat={(pejabat) => {
          setManualPejabat(pejabat);
          if (onAtasanChange) {
            onAtasanChange(pejabat.nama, pejabat.jabatan, pejabat.nip);
          }
        }}
        currentNip={resolvedAtasanNip}
        currentNama={resolvedAtasanNama}
        sikRecommendedNip={detectedPejabat?.nip}
        unitKerjaNama={effectiveUnitNama}
        unitKerjaKode={unitKerjaKode}
        unitKerjaId={unitKerjaId}
      />
    </motion.div>
  );
}
