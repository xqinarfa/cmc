"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function TentangHero() {
  return (
    <section className="relative w-full bg-white border-b border-slate-200/90 pt-10 sm:pt-14 pb-14 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none"
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-[80px] relative z-10 flex flex-col gap-8">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-slate-500 font-medium"
        >
          <Link href="/" className="hover:text-[#0a2244] transition-colors">
            Beranda
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">Profil Lembaga</span>
          <span className="text-slate-300">/</span>
          <span className="text-[#0a2244] font-bold">Piagam &amp; Standar CMC</span>
        </motion.nav>

        {/* Document Header Metadata */}
        <div className="max-w-4xl flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded bg-[#0a2244] text-white text-[11px] font-bold tracking-wider uppercase">
              BPSDMP KEMENHUB RI
            </span>
            <span className="px-3 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-mono font-bold">
              REG: 04/BPSDMP/CMC/2026
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Status: Berlaku Nasional Lintas 4 Matra
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#081730] tracking-[-0.03em] leading-[1.14]"
          >
            Ekosistem Pembelajaran Terpadu &amp; Kinerja Insan Transportasi.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-base sm:text-[17px] text-slate-700 leading-relaxed font-normal"
          >
            Platform resmi Coaching, Mentoring, dan Counselling Badan Pengembangan Sumber
            Daya Manusia Perhubungan (BPSDMP) sebagai instrumen strategis percepatan meritokrasi
            dan pemenuhan hak minimal 20 Jam Pelajaran (JP) per tahun bagi aparatur sipil negara
            sesuai amanat Undang-Undang Nomor 20 Tahun 2023.
          </motion.p>

          {/* Sub-nav Anchor Links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-2 pt-2 flex-wrap text-xs font-semibold text-slate-700"
          >
            <a
              href="#visi-misi"
              className="px-3.5 py-2 rounded-md bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-colors"
            >
              § 1. Visi &amp; Misi Strategis
            </a>
            <a
              href="#tiga-pilar"
              className="px-3.5 py-2 rounded-md bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-colors"
            >
              § 2. Standar 3 Pilar Layanan
            </a>
            <a
              href="#dasar-hukum"
              className="px-3.5 py-2 rounded-md bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-colors"
            >
              § 3. Payung Hukum &amp; Kepatuhan
            </a>
            <a
              href="#alur-peserta"
              className="px-3.5 py-2 rounded-md bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-colors"
            >
              § 4. Protokol 5 Tahap Peserta
            </a>
            <a
              href="#faq"
              className="px-3.5 py-2 rounded-md bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-colors"
            >
              § 5. Tanya Jawab (FAQ)
            </a>
          </motion.div>
        </div>

        {/* 3 Mandate Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
          <div className="bg-slate-50/80 rounded-xl border border-slate-200 p-6 flex flex-col gap-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Mandat UU ASN 20/2023
            </span>
            <h3 className="font-bold text-[#081730] text-base leading-snug">
              Hak &amp; Kewajiban 20 JP per Tahun
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              Menjamin seluruh pegawai memperoleh pendampingan kompetensi terencana yang
              diakui resmi dalam rekam jejak kinerja kepegawaian nasional.
            </p>
          </div>

          <div className="bg-slate-50/80 rounded-xl border border-slate-200 p-6 flex flex-col gap-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Tata Kelola Akuntabel
            </span>
            <h3 className="font-bold text-[#081730] text-base leading-snug">
              Validasi Dua Arah &amp; Persetujuan Atasan
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              Setiap materi dan lembar rencana aksi divalidasi oleh Fasilitator berlisensi
              serta disahkan oleh Pejabat Penilai Kinerja (Atasan Langsung).
            </p>
          </div>

          <div className="bg-slate-50/80 rounded-xl border border-slate-200 p-6 flex flex-col gap-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Satu Data Kepegawaian
            </span>
            <h3 className="font-bold text-[#081730] text-base leading-snug">
              Integrasi Langsung Gateway SIASN BKN
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              Data akumulasi jam pelajaran otomatis tersinkronisasi ke basis data BKN
              secara terenkripsi tanpa perlu mekanisme rekapitulasi manual.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
