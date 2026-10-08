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
    title: "Coaching Kepemimpinan & Kinerja",
    description:
      "Sesi terstruktur bersama Coach tersertifikasi BPSDM Perhubungan untuk akselerasi pencapaian target kinerja organisasi dan kepemimpinan strategis.",
    statusBadge: "Sesi Aktif",
    coach: {
      initial: "RS",
      bg: "#1d4ed8",
      name: "Rudi Setiawan, S.T., M.T.",
      role: "Coach Eksekutif Tersertifikasi",
      agency: "Pusbang SDM Aparatur Perhubungan",
    },
    coachee: {
      initial: "SW",
      bg: "#0f766e",
      name: "Siti Wahyuni, S.E.",
      role: "Kepala Seksi Pelayanan Kapal",
      agency: "Ditjen Perhubungan Laut",
    },
    agenda: "Penyusunan Rencana Aksi Perubahan & Manajemen Kinerja",
    jpMetric: {
      label: "Akumulasi Jam Pembelajaran",
      value: "14 dari 20 JP Wajib",
      percent: 70,
    },
    satisfactionScore: "4.9 / 5.0 Indeks Kepuasan",
  },
  {
    id: 1,
    tag: "Mentoring Fungsional",
    categoryCode: "BPSDM-MENTOR-02",
    title: "Mentoring Profesional Berkelanjutan",
    description:
      "Transfer pengetahuan teknis operasional perhubungan dari pejabat fungsional senior kepada aparatur sipil negara di seluruh unit kerja pelaksana teknis.",
    statusBadge: "Tahap 4 Berjalan",
    coach: {
      initial: "BA",
      bg: "#4338ca",
      name: "Dr. Budi Aryadi, M.Sc.",
      role: "Mentor Senior",
      agency: "Biro Kepegawaian & Organisasi",
    },
    coachee: {
      initial: "DP",
      bg: "#0369a1",
      name: "Dian Pratama, S.Si.T.",
      role: "Inspektur Keselamatan Transportasi",
      agency: "Balai Pengelola Transportasi Darat",
    },
    agenda: "Manajemen Audit Keselamatan Angkutan & Infrastruktur Terpadu",
    jpMetric: {
      label: "Fase Pendampingan Modul",
      value: "Tahap 4 dari 5 Modul",
      percent: 80,
    },
    satisfactionScore: "94% Retensi Materi",
  },
  {
    id: 2,
    tag: "Konseling ASN",
    categoryCode: "BPSDM-COUNSEL-03",
    title: "Konseling Psikologi Kerja Konfidensial",
    description:
      "Layanan pendampingan psikologis profesional yang aman dan terjaga kerahasiaannya untuk mendukung ketahanan mental dan keharmonisan lingkungan kerja.",
    statusBadge: "100% Konfidensial",
    coach: {
      initial: "PK",
      bg: "#6d28d9",
      name: "Tim Konselor & Psikolog Kerja",
      role: "Konselor Psikologi Klinis ASN",
      agency: "Layanan Dukungan SDM Kemenhub",
    },
    coachee: {
      initial: "AP",
      bg: "#be185d",
      name: "Pegawai Kementerian Perhubungan",
      role: "Peserta Sesi Privat Terjadwal",
      agency: "Seluruh Unit Kerja Eselon I",
    },
    agenda: "Adaptasi Beban Kerja, Resolusi Dinamika Tim, & Work-Life Balance",
    jpMetric: {
      label: "Indeks Kesiapan Kerja ASN",
      value: "Skor Evaluasi Prima",
      percent: 92,
    },
    satisfactionScore: "Kerahasiaan Terjamin",
  },
  {
    id: 3,
    tag: "Integrasi SIK & SIASN",
    categoryCode: "BPSDM-SIASN-04",
    title: "Satu Pintu SSO Kepegawaian",
    description:
      "Akses tunggal menggunakan akun Sistem Informasi Kepegawaian (SIK). Catatan sertifikasi dan jam pelajaran secara otomatis tercatat pada riwayat SIASN BKN.",
    statusBadge: "Sinkronisasi BKN",
    coach: {
      initial: "SIK",
      bg: "#0f172a",
      name: "Sistem Informasi Kepegawaian (SIK)",
      role: "Gateway Identitas Terpusat",
      agency: "Pusdatin Kemenhub & BKN",
    },
    coachee: {
      initial: "20JP",
      bg: "#065f46",
      name: "Corporate University Kemenhub",
      role: "Pemenuhan Mandat UU No. 20/2023",
      agency: "Badan Pengembangan SDM Perhubungan",
    },
    agenda: "Rekonsiliasi Otomatis Jam Pembelajaran Tahunan Pegawai",
    jpMetric: {
      label: "Capaian Jam Pelajaran ASN",
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
    label: "Pegawai (Coachee)",
    nip: "198904122014031002",
    password: "RahasiaKemenhub2026!",
    roleName: "Siti Wahyuni, S.E. (Ditjen Hubla)",
  },
  {
    label: "Coach Tersertifikasi",
    nip: "197805152003121001",
    password: "RahasiaKemenhub2026!",
    roleName: "Rudi Setiawan, S.T., M.T. (BPSDM)",
  },
];
