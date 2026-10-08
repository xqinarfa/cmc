"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { USER_RECIPIENT } from "@/lib/certificateData";

interface SertifikatHeroProps {
  onOpenVerifier: () => void;
  onOpenExport: () => void;
}

export default function SertifikatHero({
  onOpenVerifier,
  onOpenExport,
}: SertifikatHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden pt-7 pb-20 px-4 sm:px-6 lg:px-8 text-white shadow-[0px_12px_28px_0px_rgba(15,23,42,0.08)]"
      style={{
        backgroundImage:
          "linear-gradient(134.65deg, rgb(10, 34, 68) 0%, rgb(13, 44, 84) 45%, rgb(11, 58, 107) 100%)",
        borderBottomLeftRadius: "24px",
        borderBottomRightRadius: "24px",
      }}
    >
      {/* Radial Glow Gradient */}
      <div
        aria-hidden="true"
        className="absolute opacity-90 -right-[100px] -top-[100px] size-[520px] rounded-full pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0) 65%)",
        }}
      />

      {/* Kemenhub Hero Image Blend */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 w-[55%] pointer-events-none overflow-hidden hidden md:block opacity-45 mix-blend-luminosity"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/kemenhub_hero.png"
          alt="Kementerian Perhubungan"
          className="w-full h-full object-cover object-left"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,1) 85%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,1) 85%)",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Context */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[12px] text-white/70 font-medium mb-3"
        >
          <Link
            href="/dashboard"
            className="text-white/60 hover:text-white transition-colors"
          >
            Beranda
          </Link>
          <span className="text-white/40">/</span>
          <span className="text-white/60">Kredensial Digital</span>
          <span className="text-white/40">/</span>
          <span className="text-white font-semibold">Sertifikat Kompetensi</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pt-1 pb-1">
          {/* Left Title & Description */}
          <div className="flex flex-col gap-2 max-w-2xl">
            <h1 className="text-[26px] sm:text-[32px] font-extrabold leading-tight text-white tracking-[-0.5px]">
              Sertifikat Pengembangan Kompetensi
            </h1>
            <p className="text-[13.5px] font-normal leading-[22px] text-white/90">
              Portofolio sertifikat digital resmi untuk{" "}
              <strong>{USER_RECIPIENT.name}</strong> (NIP: {USER_RECIPIENT.nip}).
              Ditandatangani secara elektronik (BSrE BSSN) dan terintegrasi
              langsung dengan database kompetensi SIASN BKN.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Button: Cek Validitas Eksternal */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={onOpenVerifier}
              className="h-[40px] px-4 rounded-[9px] bg-white/15 hover:bg-white/25 text-white border border-white/20 text-[13px] font-bold inline-flex items-center gap-2 transition-colors cursor-pointer backdrop-blur-md shadow-xs"
            >
              <svg
                className="size-4"
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
              <span>Verifikasi Sertifikat</span>
            </motion.button>

            {/* Button: Unduh Seluruh Dokumen */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={onOpenExport}
              className="h-[40px] px-4.5 rounded-[9px] bg-white text-[#0a2540] hover:bg-slate-50 border border-white/30 text-[13px] font-bold inline-flex items-center gap-2 transition-colors hover:shadow-md cursor-pointer shadow-sm group"
            >
              <svg
                className="size-4 text-[#0a2540]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span>Unduh Berkas Portofolio</span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
