export interface SessionItem {
  id: string;
  type: "coaching" | "mentoring" | "konseling";
  title: string;
  mentor: string;
  status: "active" | "pending" | "completed";
  jpCurrent: number;
  jpTotal: number;
  date: string;
  location: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: "success" | "info" | "warning";
}

export interface CoachItem {
  id: string;
  name: string;
  role: string;
  unit: string;
  specialties: string[];
  rating: number;
  available: boolean;
}

export const INITIAL_DASHBOARD_SESSIONS: SessionItem[] = [
  {
    id: "ses-1",
    type: "coaching",
    title: "Optimalisasi Pelayanan Publik Terpadu",
    mentor: "Budi Santoso, S.Kom., M.M.",
    status: "active",
    jpCurrent: 3,
    jpTotal: 6,
    date: "10 Okt 2026 · 09:00 WIB",
    location: "Ruang Kolaborasi Virtual BPSDM",
  },
  {
    id: "ses-2",
    type: "mentoring",
    title: "Pengembangan Karier dan Talenta ASN",
    mentor: "Dr. Sari Wulandari",
    status: "pending",
    jpCurrent: 0,
    jpTotal: 4,
    date: "14 Okt 2026 · 14:00 WIB",
    location: "BPTD Wilayah VI Bengkulu & Lampung",
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Token Pairing Aktif",
    message: "Dr. Sari Wulandari menunggu konfirmasi token Anda (CMC-4821-7X9A).",
    time: "10 menit yang lalu",
    unread: true,
    type: "info",
  },
  {
    id: "notif-2",
    title: "Verifikasi Sesi Coaching",
    message: "Sesi Coaching ke-1 bersama Rudi Santoso, M.M. telah diverifikasi 3 JP di SIASN.",
    time: "2 jam yang lalu",
    unread: true,
    type: "success",
  },
  {
    id: "notif-3",
    title: "Pengingat Target Tahunan",
    message: "Sisa 6 JP lagi untuk memenuhi kewajiban 20 JP tahun anggaran 2026.",
    time: "Kemarin",
    unread: false,
    type: "warning",
  },
];

export const INITIAL_COACHES: CoachItem[] = [
  {
    id: "c-1",
    name: "Rudi Santoso, M.M.",
    role: "Widyaiswara Ahli Utama",
    unit: "Pusbang SDM Aparatur Perhubungan",
    specialties: ["Kepemimpinan", "Transformasi Budaya Kerja", "Pelayanan Prima"],
    rating: 4.9,
    available: true,
  },
  {
    id: "c-2",
    name: "Dr. Sari Wulandari, S.Si.T., M.T.",
    role: "Praktisi & Konsultan SDM",
    unit: "BPTD Wilayah VI Bengkulu-Lampung",
    specialties: ["Manajemen Talenta", "Karier ASN", "Logistik Transportasi"],
    rating: 5.0,
    available: true,
  },
  {
    id: "c-3",
    name: "Ir. Hendro Wicaksono, M.Sc.",
    role: "Widyaiswara Ahli Madya",
    unit: "Balai Besar Pendidikan & Pelatihan Transportasi",
    specialties: ["Keselamatan Transportasi", "Manajemen Risiko", "Konseling Kerja"],
    rating: 4.8,
    available: false,
  },
];
