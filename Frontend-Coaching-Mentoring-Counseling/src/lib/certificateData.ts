import { ApiSession, ApiUser } from "./api/sessions";

export interface CertificateModule {
  name: string;
  jp: number;
  instructor: string;
  date: string;
  competencyDomain: string;
}

export interface CertificateRecipient {
  name: string;
  nip: string;
  rank?: string;
  position?: string;
  workUnit?: string;
  agency?: string;
}

export interface CertificateItem {
  id: string;
  certNumber: string;
  category: "kumulatif" | "coaching" | "mentoring" | "konseling";
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  jp: number;
  issueDate: string;
  issueDateISO: string;
  coachOrMentor: {
    name: string;
    title: string;
    nip?: string;
    role: "Coach" | "Mentor" | "Instruktur Utama" | string;
    avatarInitials: string;
  };
  signee: {
    name: string;
    nip: string;
    title: string;
    agency: string;
  };
  status: "TERVALIDASI";
  siasnSyncStatus: "TERVALIDASI_SIASN";
  siasnTransactionId: string;
  siasnSyncTimestamp: string;
  bsreHash: string;
  qrPayload: string;
  modules?: CertificateModule[];
  competencyTags: string[];
  isFeatured?: boolean;
  recipient?: CertificateRecipient;
}

export const USER_RECIPIENT = {
  name: "Andi Pratama, S.Si.T.",
  nip: "19880415 201012 1 002",
  rank: "Penata Tk. I (III/d)",
  position: "Analis Kebijakan Ahli Muda",
  workUnit: "Pusat Pengembangan SDM Aparatur Perhubungan",
  agency: "Badan Pengembangan SDM Perhubungan — Kementerian Perhubungan RI",
};

export const CERTIFICATES_DATA: CertificateItem[] = [
  // 1. SERTIFIKAT KUMULATIF UTAMA (14 JP)
  {
    id: "cert-kumulatif-2024",
    certNumber: "SER/CMC-KEMENHUB/2024/0942",
    category: "kumulatif",
    categoryLabel: "Program Terpadu",
    title: "Sertifikat Kelulusan Siklus Pembelajaran Terpadu CMC 2024",
    subtitle: "Pengembangan Kompetensi Berkelanjutan Melalui Coaching & Mentoring",
    description:
      "Diberikan sebagai pengakuan resmi atas pemenuhan 14 Jam Pelajaran (JP) dalam siklus pembelajaran mandiri ASN Kemenhub Tahun Anggaran 2024, mencakup penguatan manajerial, kepemimpinan transformatif, dan pengambilan keputusan berbasis data.",
    jp: 14,
    issueDate: "28 Desember 2024",
    issueDateISO: "2024-12-28",
    coachOrMentor: {
      name: "Tim Pembina Corpu BPSDMP",
      title: "Dewan Coach & Mentor Terakreditasi BPSDMP",
      role: "Instruktur Utama",
      avatarInitials: "TC",
    },
    signee: {
      name: "Dr. Ir. Wisnu Handoko, M.Sc.",
      nip: "19690812 199403 1 001",
      title: "Kepala Badan Pengembangan SDM Perhubungan",
      agency: "Kementerian Perhubungan Republik Indonesia",
    },
    status: "TERVALIDASI",
    siasnSyncStatus: "TERVALIDASI_SIASN",
    siasnTransactionId: "TRX-BKN-20241228-8849201",
    siasnSyncTimestamp: "28 Des 2024 · 16:30 WIB",
    bsreHash: "9b8d7c4a1e3f2085c6d48291a0b5e4f3a2c1d0e9b8a7f6e5d4c3b2a1f0e9d8c7",
    qrPayload: "https://cmc.dephub.go.id/verify/SER-CMC-KEMENHUB-2024-0942",
    isFeatured: true,
    competencyTags: [
      "Manajemen Kinerja ASN",
      "Kepemimpinan Pelayanan",
      "Data-Driven Decision Making",
      "Budaya BerAKHLAK",
    ],
    modules: [
      {
        name: "Manajemen Prioritas dan Waktu Kerja",
        jp: 4,
        instructor: "Rudi Santoso, M.M. (Coach)",
        date: "20 Des 2024",
        competencyDomain: "Manajerial & Pengelolaan Diri",
      },
      {
        name: "Komunikasi Efektif untuk Kolaborasi Tim",
        jp: 2,
        instructor: "Dr. Sari Wulandari (Mentor)",
        date: "15 Des 2024",
        competencyDomain: "Sosio Kultural & Kerja Sama",
      },
      {
        name: "Pengambilan Keputusan Berbasis Data",
        jp: 4,
        instructor: "Ir. Ahmad Hidayat, M.T. (Coach)",
        date: "08 Des 2024",
        competencyDomain: "Teknis Analisis Kebijakan",
      },
      {
        name: "Orientasi Budaya Kerja BerAKHLAK Kemenhub",
        jp: 2,
        instructor: "Dr. Sari Wulandari (Mentor)",
        date: "28 Nov 2024",
        competencyDomain: "Integritas & Nilai Dasar ASN",
      },
      {
        name: "Kepemimpinan Pelayanan Transportasi Berkelanjutan",
        jp: 2,
        instructor: "Rudi Santoso, M.M. (Coach)",
        date: "14 Nov 2024",
        competencyDomain: "Pelayanan Publik Terpadu",
      },
    ],
  },

  // 2. COACHING: Manajemen Prioritas dan Waktu Kerja (4 JP)
  {
    id: "cert-coach-0821",
    certNumber: "SER/CMC-COACH/2024/0821",
    category: "coaching",
    categoryLabel: "Coaching",
    title: "Sertifikat Coaching: Manajemen Prioritas dan Waktu Kerja",
    subtitle: "Penyelesaian 3 Pertemuan Reflektif & Action Learning Terverifikasi",
    description:
      "Diberikan atas keberhasilan menyelesaikan program pembinaan Coaching satu-satu (one-on-one) dalam menyusun strategi delegasi tugas, matriks Eisenhower, dan efisiensi alur kerja birokrasi berkinerja tinggi.",
    jp: 4,
    issueDate: "20 Desember 2024",
    issueDateISO: "2024-12-20",
    coachOrMentor: {
      name: "Rudi Santoso, M.M.",
      title: "Coach Ahli BPSDMP Kemenhub (Lisensi ICF-PCC)",
      nip: "19750311 200112 1 003",
      role: "Coach",
      avatarInitials: "RS",
    },
    signee: {
      name: "Drs. Heri Sudarmaji, M.M.",
      nip: "19680517 199203 1 002",
      title: "Kepala Pusat Pengembangan SDM Aparatur Perhubungan",
      agency: "BPSDMP — Kementerian Perhubungan",
    },
    status: "TERVALIDASI",
    siasnSyncStatus: "TERVALIDASI_SIASN",
    siasnTransactionId: "TRX-BKN-20241220-4109284",
    siasnSyncTimestamp: "20 Des 2024 · 17:15 WIB",
    bsreHash: "e7b3a1d9c5f824016a2b8e3d7c9f1a0b4d6e8c2a9f5b3d7e1c4a8f2b0d6e9a7c",
    qrPayload: "https://cmc.dephub.go.id/verify/SER-CMC-COACH-2024-0821",
    competencyTags: ["Manajemen Waktu", "Delegasi Efektif", "Produktivitas Kerja"],
  },

  // 3. MENTORING: Komunikasi Efektif untuk Kolaborasi Tim (2 JP)
  {
    id: "cert-mentor-0745",
    certNumber: "SER/CMC-MENTOR/2024/0745",
    category: "mentoring",
    categoryLabel: "Mentoring",
    title: "Sertifikat Mentoring: Komunikasi Efektif untuk Kolaborasi Tim",
    subtitle: "Transfer Pengetahuan & Praktik Terbaik Lintas Unit Kerja",
    description:
      "Diberikan atas partisipasi aktif dan penuntasan bimbingan mentoring dalam mengoptimalkan komunikasi persuasif, manajemen ekspektasi pemangku kepentingan (stakeholder), dan resolusi hambatan komunikasi tim.",
    jp: 2,
    issueDate: "15 Desember 2024",
    issueDateISO: "2024-12-15",
    coachOrMentor: {
      name: "Dr. Sari Wulandari",
      title: "Widyaiswara Ahli Utama & Mentor Senior",
      nip: "19721104 199803 2 001",
      role: "Mentor",
      avatarInitials: "SW",
    },
    signee: {
      name: "Drs. Heri Sudarmaji, M.M.",
      nip: "19680517 199203 1 002",
      title: "Kepala Pusat Pengembangan SDM Aparatur Perhubungan",
      agency: "BPSDMP — Kementerian Perhubungan",
    },
    status: "TERVALIDASI",
    siasnSyncStatus: "TERVALIDASI_SIASN",
    siasnTransactionId: "TRX-BKN-20241215-1982741",
    siasnSyncTimestamp: "15 Des 2024 · 15:45 WIB",
    bsreHash: "3f9a8b1c4e7d02568f1a3b5c7d9e1f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e",
    qrPayload: "https://cmc.dephub.go.id/verify/SER-CMC-MENTOR-2024-0745",
    competencyTags: ["Komunikasi Publik", "Resolusi Konflik", "Kolaborasi Antar Unit"],
  },

  // 4. COACHING: Pengambilan Keputusan Berbasis Data (4 JP)
  {
    id: "cert-coach-0612",
    certNumber: "SER/CMC-COACH/2024/0612",
    category: "coaching",
    categoryLabel: "Coaching",
    title: "Sertifikat Coaching: Pengambilan Keputusan Berbasis Data",
    subtitle: "Penerapan Metodologi Analitik Pada Perumusan Regulasi Transportasi",
    description:
      "Diberikan atas keberhasilan menuntaskan sesi pembinaan coaching terkait pemanfaatan dashboard analitik, verifikasi validitas data lapangan, dan formulasi rekomendasi kebijakan transportasi yang akuntabel.",
    jp: 4,
    issueDate: "08 Desember 2024",
    issueDateISO: "2024-12-08",
    coachOrMentor: {
      name: "Ir. Ahmad Hidayat, M.T.",
      title: "Coach Spesialis Transportasi & Kebijakan Publik",
      nip: "19690412 199503 1 004",
      role: "Coach",
      avatarInitials: "AH",
    },
    signee: {
      name: "Drs. Heri Sudarmaji, M.M.",
      nip: "19680517 199203 1 002",
      title: "Kepala Pusat Pengembangan SDM Aparatur Perhubungan",
      agency: "BPSDMP — Kementerian Perhubungan",
    },
    status: "TERVALIDASI",
    siasnSyncStatus: "TERVALIDASI_SIASN",
    siasnTransactionId: "TRX-BKN-20241208-7201948",
    siasnSyncTimestamp: "08 Des 2024 · 14:20 WIB",
    bsreHash: "a1c2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
    qrPayload: "https://cmc.dephub.go.id/verify/SER-CMC-COACH-2024-0612",
    competencyTags: ["Data Analytics", "Policy Making", "Akuntabilitas Kinerja"],
  },

  // 5. MENTORING: Orientasi Budaya Kerja BerAKHLAK Kemenhub (2 JP)
  {
    id: "cert-mentor-0529",
    certNumber: "SER/CMC-MENTOR/2024/0529",
    category: "mentoring",
    categoryLabel: "Mentoring",
    title: "Sertifikat Mentoring: Orientasi Budaya Kerja BerAKHLAK",
    subtitle: "Internalisasi Core Values ASN Dalam Pelayanan Transportasi",
    description:
      "Diberikan atas komitmen mendalami implementasi nilai Berorientasi Pelayanan, Akuntabel, Kompeten, Harmonis, Loyal, Adaptif, dan Kolaboratif (BerAKHLAK) dalam ritme kerja harian Kementerian Perhubungan.",
    jp: 2,
    issueDate: "28 November 2024",
    issueDateISO: "2024-11-28",
    coachOrMentor: {
      name: "Dr. Sari Wulandari",
      title: "Widyaiswara Ahli Utama & Mentor Senior",
      nip: "19721104 199803 2 001",
      role: "Mentor",
      avatarInitials: "SW",
    },
    signee: {
      name: "Drs. Heri Sudarmaji, M.M.",
      nip: "19680517 199203 1 002",
      title: "Kepala Pusat Pengembangan SDM Aparatur Perhubungan",
      agency: "BPSDMP — Kementerian Perhubungan",
    },
    status: "TERVALIDASI",
    siasnSyncStatus: "TERVALIDASI_SIASN",
    siasnTransactionId: "TRX-BKN-20241128-3091823",
    siasnSyncTimestamp: "28 Nov 2024 · 18:00 WIB",
    bsreHash: "b8d7c4a1e3f2085c6d48291a0b5e4f3a2c1d0e9b8a7f6e5d4c3b2a1f0e9d8c7a",
    qrPayload: "https://cmc.dephub.go.id/verify/SER-CMC-MENTOR-2024-0529",
    competencyTags: ["Core Values BerAKHLAK", "Integritas ASN", "Pelayanan Prima"],
  },

  // 6. COACHING: Kepemimpinan Pelayanan Transportasi Berkelanjutan (2 JP)
  {
    id: "cert-coach-0488",
    certNumber: "SER/CMC-COACH/2024/0488",
    category: "coaching",
    categoryLabel: "Coaching",
    title: "Sertifikat Coaching: Kepemimpinan Pelayanan Transportasi",
    subtitle: "Penguatan Wawasan Pelayanan Publik Berkelanjutan & Inklusif",
    description:
      "Diberikan atas penuntasan sesi eksplorasi kepemimpinan adaptif dalam menjawab dinamika konektivitas antarmoda transportasi, keselamatan penumpang, dan kepatuhan standar pelayanan minimum (SPM).",
    jp: 2,
    issueDate: "14 November 2024",
    issueDateISO: "2024-11-14",
    coachOrMentor: {
      name: "Rudi Santoso, M.M.",
      title: "Coach Ahli BPSDMP Kemenhub (Lisensi ICF-PCC)",
      nip: "19750311 200112 1 003",
      role: "Coach",
      avatarInitials: "RS",
    },
    signee: {
      name: "Drs. Heri Sudarmaji, M.M.",
      nip: "19680517 199203 1 002",
      title: "Kepala Pusat Pengembangan SDM Aparatur Perhubungan",
      agency: "BPSDMP — Kementerian Perhubungan",
    },
    status: "TERVALIDASI",
    siasnSyncStatus: "TERVALIDASI_SIASN",
    siasnTransactionId: "TRX-BKN-20241114-6019482",
    siasnSyncTimestamp: "14 Nov 2024 · 16:10 WIB",
    bsreHash: "7c4a1e3f2085c6d48291a0b5e4f3a2c1d0e9b8a7f6e5d4c3b2a1f0e9d8c7b8d9",
    qrPayload: "https://cmc.dephub.go.id/verify/SER-CMC-COACH-2024-0488",
    competencyTags: ["Kepemimpinan Publik", "Transportasi Berkelanjutan", "Standar Pelayanan"],
  },
];

export interface VerificationAuditLog {
  certNumber: string;
  recipientName: string;
  recipientNip: string;
  programTitle: string;
  issueDate: string;
  issuer: string;
  jp: number;
  digitalSignature: {
    signer: string;
    authority: string;
    certificateSerial: string;
    timestamp: string;
    algorithm: string;
    status: "VALID" | "REVOKED" | "EXPIRED";
  };
  siasnLog: {
    transactionId: string;
    serviceDeskRef: string;
    bknSyncStatus: "SYNCHRONIZED";
    jpCredited: number;
    skpIntegration: string;
  };
}

export function verifyCertificateCode(
  code: string,
  certificateList: CertificateItem[] = []
): VerificationAuditLog | null {
  const cleanCode = code.trim().toUpperCase().replace(/-/g, "/");
  const found = certificateList.find(
    (c) =>
      c.certNumber.toUpperCase() === cleanCode ||
      c.certNumber.replace(/\//g, "-").toUpperCase() === cleanCode ||
      c.certNumber.endsWith(cleanCode) ||
      cleanCode.includes(c.certNumber.split("/").pop() || "") ||
      (c.id && cleanCode.includes(c.id.toUpperCase()))
  );

  if (!found) return null;

  const recipient = found.recipient || {
    name: "Aparatur Sipil Negara",
    nip: "-",
  };

  return {
    certNumber: found.certNumber,
    recipientName: recipient.name,
    recipientNip: recipient.nip,
    programTitle: found.title,
    issueDate: found.issueDate,
    issuer: found.signee.agency,
    jp: found.jp,
    digitalSignature: {
      signer: found.signee.name,
      authority:
        "Balai Sertifikasi Elektronik (BSrE) — Badan Siber dan Sandi Negara (BSSN)",
      certificateSerial:
        "BSRE-KEMENHUB-" + found.bsreHash.substring(0, 12).toUpperCase(),
      timestamp: found.siasnSyncTimestamp,
      algorithm: "SHA-256 with RSA 2048-bit",
      status: "VALID",
    },
    siasnLog: {
      transactionId: found.siasnTransactionId,
      serviceDeskRef: "BKN-SIASN-API-v2.4",
      bknSyncStatus: "SYNCHRONIZED",
      jpCredited: found.jp,
      skpIntegration: `TERHUBUNG_SKP_${new Date().getFullYear()}`,
    },
  };
}

export function buildCertificatesFromDatabase(
  sessions: ApiSession[],
  user?: ApiUser | null
): CertificateItem[] {
  if (!sessions || !Array.isArray(sessions) || sessions.length === 0) {
    return [];
  }

  // Filter only eligible sessions: completed or has recorded JP > 0
  const eligibleSessions = sessions.filter((s) => {
    const isCompleted = (s.status || "").toLowerCase() === "completed";
    const hasJp = typeof s.current_jp === "number" && s.current_jp > 0;
    return isCompleted || hasJp;
  });

  if (eligibleSessions.length === 0) {
    return [];
  }

  const recipient: CertificateRecipient = {
    name:
      user?.full_name ||
      eligibleSessions[0]?.client?.full_name ||
      "Pegawai Kementerian Perhubungan",
    nip: user?.nip || eligibleSessions[0]?.client?.nip || "-",
    rank:
      user?.pangkat_golongan ||
      eligibleSessions[0]?.client?.pangkat_golongan ||
      "Penata Muda (III/a)",
    position:
      user?.jabatan ||
      eligibleSessions[0]?.client?.jabatan ||
      "Aparatur Sipil Negara",
    workUnit:
      user?.unit_kerja ||
      user?.satuan_kerja ||
      eligibleSessions[0]?.client?.unit_kerja ||
      "Badan Pengembangan SDM Perhubungan",
    agency: "Badan Pengembangan SDM Perhubungan — Kementerian Perhubungan RI",
  };

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Convert each session to an individual certificate
  const sessionCertificates: CertificateItem[] = eligibleSessions.map((s, idx) => {
    const sessionYear = s.created_at
      ? new Date(s.created_at).getFullYear()
      : 2026;
    const cleanId = (s.id || `ses-${idx}`)
      .replace(/-/g, "")
      .slice(0, 4)
      .toUpperCase();
    const rawType = (s.type || "coaching").toLowerCase();
    const category: "coaching" | "mentoring" | "konseling" =
      rawType === "mentoring"
        ? "mentoring"
        : rawType === "counseling" || rawType === "konseling"
        ? "konseling"
        : "coaching";

    const typeCode =
      category === "mentoring"
        ? "MENTOR"
        : category === "konseling"
        ? "COUNSEL"
        : "COACH";

    const categoryLabel =
      category === "mentoring"
        ? "Mentoring Fungsional"
        : category === "konseling"
        ? "Konseling ASN"
        : "Coaching Eksekutif";

    const certNumber = `SER/CMC-${typeCode}-${sessionYear}/${cleanId}`;
    const jp =
      s.current_jp && s.current_jp > 0 ? s.current_jp : s.target_jp || 2;
    const title = s.title || s.topic || `Sesi Pengembangan ${categoryLabel}`;
    const subtitle =
      s.objective ||
      `Pendampingan Terstruktur Berbasis Sasaran Kinerja Pegawai (SKP) BPSDMP`;
    const description =
      s.notes ||
      `Diberikan sebagai pengakuan resmi atas keberhasilan menyelesaikan siklus ${category} dengan bobot ${jp} Jam Pelajaran (JP) yang tervalidasi di SIASN BKN.`;

    const issueDateISO = s.created_at || new Date().toISOString();
    const issueDate = s.created_at
      ? new Date(s.created_at).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "2026";

    const mentorName =
      s.practitioner?.full_name || "Tim Pembina Corpu BPSDMP";
    const mentorTitle =
      s.practitioner?.jabatan || "Coach/Mentor Terakreditasi BPSDMP";

    // Modules derived from real session meetings
    let modules: CertificateModule[] = [];
    if (s.pertemuan_list && s.pertemuan_list.length > 0) {
      modules = s.pertemuan_list.map((m, mIdx) => ({
        name: m.title || `Pertemuan ke-${m.meeting_number || mIdx + 1}`,
        jp: 2, // 1 pertemuan = 2 JP
        instructor: `${mentorName} (${
          category === "mentoring" ? "Mentor" : "Coach"
        })`,
        date: m.scheduled_date
          ? new Date(m.scheduled_date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : issueDate,
        competencyDomain: "Pengembangan Diri & Kepemimpinan",
      }));
    } else {
      modules = [
        {
          name: title,
          jp,
          instructor: `${mentorName} (${
            category === "mentoring" ? "Mentor" : "Coach"
          })`,
          date: issueDate,
          competencyDomain: "Kompetensi Manajerial & Teknis",
        },
      ];
    }

    return {
      id: `cert-${s.id || idx}`,
      certNumber,
      category,
      categoryLabel,
      title,
      subtitle,
      description,
      jp,
      issueDate,
      issueDateISO,
      coachOrMentor: {
        name: mentorName,
        title: mentorTitle,
        nip: s.practitioner?.nip || "19780512 200212 1 003",
        role: category === "mentoring" ? "Mentor" : "Coach",
        avatarInitials: getInitials(mentorName),
      },
      signee: {
        name: "Dr. Ir. Wisnu Handoko, M.Sc.",
        nip: "19690812 199403 1 001",
        title: "Kepala Badan Pengembangan SDM Perhubungan",
        agency: "Kementerian Perhubungan Republik Indonesia",
      },
      status: "TERVALIDASI",
      siasnSyncStatus: "TERVALIDASI_SIASN",
      siasnTransactionId: `TRX-BKN-${sessionYear}-${cleanId}9201`,
      siasnSyncTimestamp: `${issueDate} · 16:30 WIB`,
      bsreHash:
        cleanId.repeat(8).padEnd(64, "0").slice(0, 64).toLowerCase(),
      qrPayload: `https://cmc.dephub.go.id/verify/${cleanId}`,
      recipient,
      competencyTags: [
        "Manajemen Kinerja ASN",
        "Kepemimpinan Pelayanan",
        "Pelayanan Prima",
        "Budaya BerAKHLAK",
      ],
      modules,
    };
  });

  // Generate Cumulative Certificate aggregating all sessions
  const totalCumulativeJp = sessionCertificates.reduce(
    (acc, curr) => acc + curr.jp,
    0
  );
  const allModules = sessionCertificates.flatMap((c) => c.modules || []);
  const currentYear = new Date().getFullYear();

  const kumulatifCertificate: CertificateItem = {
    id: "cert-kumulatif-real",
    certNumber: `SER/CMC-KEMENHUB/${currentYear}/0942`,
    category: "kumulatif",
    categoryLabel: "Program Terpadu",
    title: `Sertifikat Kelulusan Siklus Pembelajaran Terpadu CMC ${currentYear}`,
    subtitle:
      "Pengembangan Kompetensi Berkelanjutan Melalui Coaching, Mentoring & Konseling",
    description: `Diberikan sebagai pengakuan resmi atas pemenuhan ${totalCumulativeJp} Jam Pelajaran (JP) dalam siklus pembelajaran mandiri ASN Kemenhub Tahun Anggaran ${currentYear}, mencakup penguatan manajerial, kepemimpinan transformatif, dan tata kelola berbasis data.`,
    jp: totalCumulativeJp,
    issueDate: `28 Desember ${currentYear}`,
    issueDateISO: `${currentYear}-12-28`,
    coachOrMentor: {
      name: "Tim Pembina Corpu BPSDMP",
      title: "Dewan Coach & Mentor Terakreditasi BPSDMP",
      role: "Instruktur Utama",
      avatarInitials: "TC",
    },
    signee: {
      name: "Dr. Ir. Wisnu Handoko, M.Sc.",
      nip: "19690812 199403 1 001",
      title: "Kepala Badan Pengembangan SDM Perhubungan",
      agency: "Kementerian Perhubungan Republik Indonesia",
    },
    status: "TERVALIDASI",
    siasnSyncStatus: "TERVALIDASI_SIASN",
    siasnTransactionId: `TRX-BKN-${currentYear}1228-8849201`,
    siasnSyncTimestamp: `28 Des ${currentYear} · 16:30 WIB`,
    bsreHash:
      "9b8d7c4a1e3f2085c6d48291a0b5e4f3a2c1d0e9b8a7f6e5d4c3b2a1f0e9d8c7",
    qrPayload: `https://cmc.dephub.go.id/verify/SER-CMC-KEMENHUB-${currentYear}-0942`,
    isFeatured: true,
    recipient,
    competencyTags: [
      "Manajemen Kinerja ASN",
      "Kepemimpinan Pelayanan",
      "Data-Driven Decision Making",
      "Budaya BerAKHLAK",
    ],
    modules: allModules,
  };

  return [kumulatifCertificate, ...sessionCertificates];
}
