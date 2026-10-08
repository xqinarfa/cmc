export type FilterTab = "semua" | "perlu_tindakan" | "berlangsung" | "selesai";
export type CategoryFilter = "semua" | "Coaching" | "Mentoring";
export type SortOrder = "terbaru" | "terlama";

export interface SessionItem {
  id: string;
  category: "Coaching" | "Mentoring";
  status: "menunggu_konfirmasi" | "dikembalikan" | "berlangsung" | "selesai";
  statusLabel: string;
  title: string;
  mentorOrCoachLabel: string;
  mentorOrCoachName: string;
  mentorInitials: string;
  timeLabel: string;
  timeValue: string;
  token?: string;
  currentJp?: number;
  targetJp?: number;
  alertType?: "amber" | "red";
  alertText?: string;
  alertAuthor?: string;
  section: "perlu_tindakan" | "berlangsung" | "selesai";
  progressNote?: string;
}

export const SESSIONS_DATA: SessionItem[] = [
  // SECTION 1: PERLU TINDAKAN (2 sesi)
  {
    id: "sesi-1",
    category: "Mentoring",
    status: "menunggu_konfirmasi",
    statusLabel: "Menunggu konfirmasi",
    title: "Pengembangan Karier dan Talenta ASN",
    mentorOrCoachLabel: "Mentor:",
    mentorOrCoachName: "Dr. Sari Wulandari",
    mentorInitials: "SW",
    timeLabel: "Dibuat:",
    timeValue: "3 hari lalu",
    token: "CMC-4821-7X9A",
    alertType: "amber",
    alertText: "Sudah 3 hari menunggu respon. Anda dapat mengirimkan pengingat notifikasi ke Mentor.",
    section: "perlu_tindakan",
  },
  {
    id: "sesi-2",
    category: "Coaching",
    status: "dikembalikan",
    statusLabel: "Dikembalikan",
    title: "Peningkatan Kemampuan Analisis Kebijakan",
    mentorOrCoachLabel: "Coach:",
    mentorOrCoachName: "Ir. Ahmad Hidayat, M.T.",
    mentorInitials: "AH",
    timeLabel: "Dikembalikan:",
    timeValue: "Kemarin",
    currentJp: 6,
    targetJp: 6,
    alertType: "red",
    alertAuthor: "Dr. Budi Hartono:",
    alertText: "Pertemuan #2 dan #3 belum memiliki bukti dokumentasi. Mohon unggah bukti kehadiran sebelum diajukan ulang.",
    section: "perlu_tindakan",
  },

  // SECTION 2: SEDANG BERLANGSUNG (1 sesi)
  {
    id: "sesi-3",
    category: "Coaching",
    status: "berlangsung",
    statusLabel: "Berlangsung",
    title: "Penguatan Kepemimpinan Pelayanan Publik",
    mentorOrCoachLabel: "Coach:",
    mentorOrCoachName: "Rudi Santoso, M.M.",
    mentorInitials: "RS",
    timeLabel: "Berikutnya:",
    timeValue: "16 Jan 2025",
    currentJp: 3,
    targetJp: 6,
    progressNote: "1 dari 3 pertemuan terverifikasi",
    section: "berlangsung",
  },

  // SECTION 3: SELESAI (5 sesi)
  {
    id: "sesi-4",
    category: "Coaching",
    status: "selesai",
    statusLabel: "Selesai",
    title: "Manajemen Prioritas dan Waktu Kerja",
    mentorOrCoachLabel: "Coach:",
    mentorOrCoachName: "Rudi Santoso, M.M.",
    mentorInitials: "RS",
    timeLabel: "Selesai:",
    timeValue: "20 Des 2024",
    currentJp: 4,
    targetJp: 4,
    section: "selesai",
  },
  {
    id: "sesi-5",
    category: "Mentoring",
    status: "selesai",
    statusLabel: "Selesai",
    title: "Komunikasi Efektif untuk Kolaborasi Tim",
    mentorOrCoachLabel: "Mentor:",
    mentorOrCoachName: "Dr. Sari Wulandari",
    mentorInitials: "SW",
    timeLabel: "Selesai:",
    timeValue: "15 Des 2024",
    currentJp: 2,
    targetJp: 2,
    section: "selesai",
  },
  {
    id: "sesi-6",
    category: "Coaching",
    status: "selesai",
    statusLabel: "Selesai",
    title: "Pengambilan Keputusan Berbasis Data",
    mentorOrCoachLabel: "Coach:",
    mentorOrCoachName: "Ir. Ahmad Hidayat, M.T.",
    mentorInitials: "AH",
    timeLabel: "Selesai:",
    timeValue: "8 Des 2024",
    currentJp: 4,
    targetJp: 4,
    section: "selesai",
  },
  {
    id: "sesi-7",
    category: "Mentoring",
    status: "selesai",
    statusLabel: "Selesai",
    title: "Orientasi Budaya Kerja BerAKHLAK Kemenhub",
    mentorOrCoachLabel: "Mentor:",
    mentorOrCoachName: "Dr. Sari Wulandari",
    mentorInitials: "SW",
    timeLabel: "Selesai:",
    timeValue: "28 Nov 2024",
    currentJp: 2,
    targetJp: 2,
    section: "selesai",
  },
  {
    id: "sesi-8",
    category: "Coaching",
    status: "selesai",
    statusLabel: "Selesai",
    title: "Kepemimpinan Pelayanan Transportasi Berkelanjutan",
    mentorOrCoachLabel: "Coach:",
    mentorOrCoachName: "Rudi Santoso, M.M.",
    mentorInitials: "RS",
    timeLabel: "Selesai:",
    timeValue: "14 Nov 2024",
    currentJp: 4,
    targetJp: 4,
    section: "selesai",
  },
];

export interface CoachItem {
  name: string;
  role: string;
  unit: string;
  specialties: string[];
  rating: number;
}

export const ACCREDITED_COACHES: CoachItem[] = [
  {
    name: "Rudi Santoso, M.M.",
    role: "Widyaiswara Ahli Utama",
    unit: "Pusbang SDM Aparatur Perhubungan",
    specialties: ["Kepemimpinan Adaptif", "Transformasi Organisasi"],
    rating: 4.9,
  },
  {
    name: "Dr. Sari Wulandari, S.Si.T., M.T.",
    role: "Praktisi Manajemen & Fasilitator",
    unit: "BPTD Wilayah VI Bengkulu & Lampung",
    specialties: ["Manajemen Transportasi Darat", "Pelayanan Prima"],
    rating: 4.8,
  },
  {
    name: "Ir. Hendro Wicaksono, M.Sc.",
    role: "Widyaiswara Madya",
    unit: "Balai Besar Diklat Transportasi Darat",
    specialties: ["Manajemen Risiko", "Perencanaan Transportasi"],
    rating: 4.7,
  },
];

export interface Meeting {
  id: number | string;
  number: number;
  title: string;
  dateStr: string;
  status: "lengkap" | "draft" | "pending";
  statusLabel: string;
  metaText?: string;
  tags?: string[];
  jpCollected?: number;
  lastEdited?: string;
  hasActionLearning?: boolean;
  photoCount?: number;
  location?: string;
  type?: "Luring" | "Daring" | "Hybrid";
  topicSummary?: string;
  feedback?: string;
  nextSteps?: string;
}

export const INITIAL_MEETINGS: Meeting[] = [
  {
    id: 1,
    number: 1,
    title: "Pertemuan #1 — Identifikasi permasalahan dan tujuan coaching",
    dateStr: "Senin, 6 Jan 2025 · 09.00 WIB · Ruang Rapat A · Luring",
    status: "lengkap",
    statusLabel: "Lengkap",
    tags: ["Action learning terunggah", "2 foto dokumentasi"],
    jpCollected: 2,
    hasActionLearning: true,
    photoCount: 2,
    location: "Ruang Rapat A, Gd. Karsa Lt. 3",
    type: "Luring",
    topicSummary:
      "Diskusi pemetaan tantangan koordinasi lintas unit kerja serta perumusan tujuan strategis pengembangan kompetensi kepemimpinan adaptif.",
    feedback:
      "Tingkatkan delegasi terstruktur kepada staf pelaksana agar fokus dapat dialokasikan pada pengambilan keputusan berbasis data.",
    nextSteps:
      "Menyusun matriks prioritas kerja mingguan dan menerapkan daily standup 10 menit dengan tim.",
  },
  {
    id: 2,
    number: 2,
    title: "Pertemuan #2 — Pembahasan solusi dan rencana tindak lanjut",
    dateStr: "Kamis, 9 Jan 2025 · 14.00 WIB · Zoom Meeting · Daring",
    status: "draft",
    statusLabel: "Draft — belum lengkap",
    lastEdited: "Terakhir diubah 9 Jan, 14.45 WIB",
    location: "Zoom Meeting (Tautan terlampir)",
    type: "Daring",
    topicSummary:
      "Evaluasi implementasi matriks prioritas dan pembahasan kendala teknis pada pelaporan mingguan.",
    feedback: "Perlu penajaman pada indikator capaian mingguan agar lebih terukur.",
    nextSteps: "Finalisasi draf SOP koordinasi internal sebelum pertemuan ke-3.",
  },
  {
    id: 3,
    number: 3,
    title: "Pertemuan #3 — Belum diisi",
    dateStr: "Tambahkan catatan setelah pertemuan dilaksanakan.",
    status: "pending",
    statusLabel: "Belum diisi",
  },
];
