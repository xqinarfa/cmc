export interface SlideData {
  id: number;
  tag: string;
  categoryCode: string;
  title: string;
  description: string;
  statusBadge: string;
  coach: {
    initial: string;
    bg: string;
    name: string;
    role: string;
    agency: string;
  };
  coachee: {
    initial: string;
    bg: string;
    name: string;
    role: string;
    agency: string;
  };
  agenda: string;
  jpMetric: {
    label: string;
    value: string;
    percent: number;
  };
  satisfactionScore: string;
}

export const SLIDES: SlideData[] = [
  {
    id: 0,
    tag: "Coaching Eksekutif",
    categoryCode: "BPSDM-COACH-01",
    title: "Akselerasi Kepemimpinan & Kinerja",
    description:
      "Pendampingan terstruktur bersama Coach tersertifikasi untuk mempertajam sasaran strategis ASN.",
    statusBadge: "Sesi Aktif",
    coach: {
      initial: "RS",
      bg: "from-blue-600 to-indigo-700",
      name: "Rudi Setiawan, S.T., M.T.",
      role: "Coach Eksekutif",
      agency: "Pusbang SDM Aparatur",
    },
    coachee: {
      initial: "SW",
      bg: "from-teal-600 to-emerald-700",
      name: "Siti Wahyuni, S.E.",
      role: "Kepala Seksi Pelayanan",
      agency: "Ditjen Perhubungan Laut",
    },
    agenda: "Penyusunan Rencana Aksi Perubahan Organisasi",
    jpMetric: {
      label: "Akumulasi Jam Pelajaran",
      value: "14 / 20 JP",
      percent: 70,
    },
    satisfactionScore: "4.9 / 5.0 Kepuasan",
  },
  {
    id: 1,
    tag: "Mentoring Fungsional",
    categoryCode: "BPSDM-MENTOR-02",
    title: "Transfer Keahlian Teknis Operasional",
    description:
      "Penyaluran kompetensi teknis dari praktisi senior kepada aparatur di unit pelaksana teknis.",
    statusBadge: "Tahap Berjalan",
    coach: {
      initial: "BA",
      bg: "from-indigo-600 to-violet-700",
      name: "Dr. Budi Aryadi, M.Sc.",
      role: "Mentor Senior",
      agency: "Biro Kepegawaian",
    },
    coachee: {
      initial: "DP",
      bg: "from-sky-600 to-cyan-700",
      name: "Dian Pratama, S.Si.T.",
      role: "Inspektur Keselamatan",
      agency: "BPTD Wilayah",
    },
    agenda: "Manajemen Audit Keselamatan Transportasi Terpadu",
    jpMetric: {
      label: "Progres Pendampingan",
      value: "Modul 4 dari 5",
      percent: 80,
    },
    satisfactionScore: "94% Pemahaman",
  },
  {
    id: 2,
    tag: "Konseling ASN",
    categoryCode: "BPSDM-COUNSEL-03",
    title: "Konseling Kesejahteraan & Ketahanan Kerja",
    description:
      "Dukungan psikologis profesional dan konfidensial untuk menjaga produktivitas kerja pegawai.",
    statusBadge: "100% Rahasia",
    coach: {
      initial: "PK",
      bg: "from-purple-600 to-pink-700",
      name: "Tim Psikolog Kerja ASN",
      role: "Konselor Klinis",
      agency: "Layanan SDM Kemenhub",
    },
    coachee: {
      initial: "AP",
      bg: "from-rose-600 to-amber-700",
      name: "Aparatur Sipil Negara",
      role: "Konsultasi Terjadwal",
      agency: "Seluruh Satuan Kerja",
    },
    agenda: "Manajemen Beban Kerja & Resolusi Dinamika Tim",
    jpMetric: {
      label: "Kesiapan Mental Kerja",
      value: "Tingkat Prima",
      percent: 92,
    },
    satisfactionScore: "Kerahasiaan Terjamin",
  },
  {
    id: 3,
    tag: "Integrasi SIASN",
    categoryCode: "BPSDM-SIASN-04",
    title: "Satu Pintu SSO & Rekonsiliasi Otomatis",
    description:
      "Login tunggal akun SIK. Catatan 20 JP dan sertifikat langsung tercatat di pangkalan data BKN.",
    statusBadge: "SIASN Terhubung",
    coach: {
      initial: "SIK",
      bg: "from-slate-700 to-slate-900",
      name: "Gateway Identitas SIK",
      role: "Single Sign-On Pusat",
      agency: "Pusdatin Kemenhub",
    },
    coachee: {
      initial: "20JP",
      bg: "from-emerald-600 to-teal-800",
      name: "Corporate University",
      role: "Mandat UU ASN 20/2023",
      agency: "BPSDM Perhubungan",
    },
    agenda: "Sinkronisasi Capaian Pembelajaran Tahunan",
    jpMetric: {
      label: "Capaian Jam Pelajaran",
      value: "20 / 20 JP Lengkap",
      percent: 100,
    },
    satisfactionScore: "Sinkronisasi Real-Time",
  },
];

export interface DemoAccount {
  label: string;
  nip: string;
  password: string;
  roleName: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    label: "Pegawai",
    nip: "198904122014031002",
    password: "RahasiaKemenhub2026!",
    roleName: "Siti Wahyuni (Coachee)",
  },
  {
    label: "Coach",
    nip: "197805152003121001",
    password: "RahasiaKemenhub2026!",
    roleName: "Rudi Setiawan (Coach)",
  },
];

