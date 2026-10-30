import { FaqItem, LegalRegistryItem, WorkflowStepItem } from "@/types";

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: "umum",
    question: "Apa perbedaan mendasar antara Coaching, Mentoring, dan Counselling?",
    answer:
      "Coaching berfokus pada eksplorasi potensi kepemimpinan dan pemecahan masalah mandiri melalui dialog kemitraan terarah (tanpa instruksi searah). Mentoring berfokus pada transfer keahlian teknis matra perhubungan dan kultur birokrasi dari pejabat senior ke junior. Counselling berfokus pada dukungan kesehatan mental, manajemen stres kerja, dan resiliensi psikologis yang bersifat 100% rahasia di bawah kode etik HIMPSI.",
  },
  {
    category: "jp",
    question: "Berapa Jam Pelajaran (JP) yang diperoleh dan bagaimana perhitungannya?",
    answer:
      "Setiap pertemuan sesi Coaching atau Mentoring yang disahkan oleh Pejabat Penilai Kinerja (Atasan Langsung) bernilai 2 JP (Jam Pelajaran). Dalam satu siklus program (2-3 sesi pertemuan terstruktur), aparatur dapat mengumpulkan 4 hingga 6 JP yang langsung terakumulasi ke pemenuhan target 20 JP tahunan sesuai amanat UU No. 20 Tahun 2023.",
  },
  {
    category: "teknis",
    question: "Bagaimana cara kerja Token Pairing dalam menjamin keabsahan sesi?",
    answer:
      "Token Pairing adalah kode unik berstandar kriptografi (contoh: CMC-2026-X89) yang diterbitkan sistem saat sesi diajukan. Token ini wajib divalidasi oleh Fasilitator (Coach/Mentor) terdaftar sebelum sesi dimulai. Tanpa konfirmasi dua arah, status sesi tidak akan aktif dan jam pelajaran tidak dapat diajukan ke Atasan Langsung.",
  },
  {
    category: "jp",
    question: "Kapan JP resmi tercatat di Pangkalan Data Kepegawaian Nasional SIASN BKN?",
    answer:
      "Setelah sesi selesai dan peserta mengunggah lembar aksi kerja (action learning/notulensi), notifikasi dikirimkan ke akun SIK Atasan Langsung. Begitu Atasan Langsung menyetujui, gateway CMC secara otomatis mengirimkan webhook sinkronisasi ke SIASN BKN dalam waktu nyata tanpa perlu penginputan manual.",
  },
  {
    category: "umum",
    question: "Siapa saja yang memenuhi kualifikasi menjadi Coach dan Mentor di Kemenhub?",
    answer:
      "Coach adalah Widyaiswara atau Pejabat Fungsional yang telah mengantongi sertifikasi Coaching resmi dari BPSDMP, Lembaga Administrasi Negara (LAN), atau BNSP. Mentor adalah Pejabat Struktural Eselon II/III, Widyaiswara Ahli Madya/Utama, atau praktisi senior dengan rekam jejak kepemimpinan prima di bidang teknis transportasi.",
  },
  {
    category: "teknis",
    question: "Apakah layanan Counselling (Konseling) terjamin kerahasiaannya?",
    answer:
      "Ya, 100% konfidensial. Layanan konseling diampu oleh Psikolog Klinis dan Konselor SDM berlisensi Himpunan Psikologi Indonesia (HIMPSI). Catatan substansi masalah tidak pernah dapat diakses oleh atasan, biro kepegawaian, maupun pihak mana pun. Sistem CMC hanya mencatat kehadiran administratif sebagai hak pemeliharaan kesejahteraan pegawai.",
  },
];

export const LEGAL_REGISTRY: LegalRegistryItem[] = [
  {
    act: "Undang-Undang Republik Indonesia",
    number: "UU No. 20 Tahun 2023",
    article: "Pasal 49 Ayat (1) & (2)",
    title: "Amanat Pengembangan Kompetensi Berkelanjutan ASN",
    description:
      "Menetapkan kewajiban instansi pemerintah untuk memfasilitasi dan hak setiap pegawai ASN untuk memperoleh pengembangan kompetensi terencana minimal 20 Jam Pelajaran (JP) per tahun melalui sistem terpadu Corporate University.",
    category: "Hukum Nasional",
  },
  {
    act: "Peraturan Menteri PAN-RB",
    number: "PermenPAN-RB No. 3 Tahun 2020",
    article: "Manajemen Talenta Nasional",
    title: "Akselerasi Karier Berbasis Sistem Merit",
    description:
      "Mengatur pembinaan karier ASN berbasis kualifikasi, kompetensi, dan kinerja melalui percepatan pendampingan manajerial (coaching dan mentoring) guna mengisi kotak talenta instansi.",
    category: "Kebijakan MenPAN-RB",
  },
  {
    act: "Peraturan Lembaga Administrasi Negara",
    number: "Perlan LAN RI No. 10 Tahun 2018",
    article: "Jalur Pembelajaran Non-Klasikal",
    title: "Pengakuan Angka Kredit Jam Pelajaran Non-Klasikal",
    description:
      "Menetapkan metode bimbingan di tempat kerja (coaching, mentoring, konseling, magang, dan penugasan khusus) sebagai metode sah pemerolehan angka JP yang diakui secara nasional.",
    category: "Standar Akreditasi LAN",
  },
  {
    act: "Keputusan Kepala BPSDMP",
    number: "SK Kepala BPSDMP No. 12/2024",
    article: "SOP Kemenhub CorpU",
    title: "Petunjuk Teknis Tata Kelola CMC Kementerian Perhubungan",
    description:
      "Pedoman operasional baku penyelenggaraan, kualifikasi fasilitator, validasi token pairing, dan mekanisme integrasi API SIASN di seluruh unit kerja matra darat, laut, udara, dan perkeretaapian.",
    category: "Regulasi Instansional",
  },
];

export const WORKFLOW_STEPS: WorkflowStepItem[] = [
  {
    step: "01",
    title: "Single Sign-On SIK",
    role: "Pegawai / Coachee",
    desc: "Autentikasi terpusat menggunakan NIP dan akun resmi Sistem Informasi Kepegawaian (SIK) Kemenhub.",
  },
  {
    step: "02",
    title: "Token Pairing Sesi",
    role: "Pegawai & Fasilitator",
    desc: "Penerbitan kode token unik terenkripsi guna mengunci komitmen jadwal dan substansi pendampingan.",
  },
  {
    step: "03",
    title: "Pelaksanaan Sesi",
    role: "Sesi Luring / Daring",
    desc: "Interaksi pendampingan terstruktur, dialog reflektif, dan perumusan matriks rencana aksi tindak lanjut.",
  },
  {
    step: "04",
    title: "Verifikasi Atasan",
    role: "Pejabat Penilai SKP",
    desc: "Atasan langsung menelaah bukti tindakan (action learning) dan menandatangani persetujuan JP.",
  },
  {
    step: "05",
    title: "Sinkronisasi SIASN",
    role: "Gateway BKN",
    desc: "Penambahan 2 JP resmi tercatat pada riwayat kompetensi SIASN BKN dan e-sertifikat diterbitkan.",
  },
];
