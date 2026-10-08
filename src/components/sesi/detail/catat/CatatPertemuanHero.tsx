"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface CatatPertemuanHeroProps {
  pertemuanKe: number;
  currentStep: 1 | 2 | 3;
}

export default function CatatPertemuanHero({ pertemuanKe, currentStep }: CatatPertemuanHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden pt-6 pb-20 px-4 sm:px-6 lg:px-8 text-white shadow-[0px_12px_28px_0px_rgba(15,23,42,0.08)]"
      style={{
        backgroundImage:
          "linear-gradient(134.65deg, rgb(10, 34, 68) 0%, rgb(13, 44, 84) 45%, rgb(11, 58, 107) 100%)",
        borderBottomLeftRadius: "24px",
        borderBottomRightRadius: "24px",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
      }}
    >
      {/* Radial Flare in top right corner (Figma Node 840:480) */}
      <div
        aria-hidden="true"
        className="absolute opacity-90 -right-[100px] -top-[100px] size-[500px] rounded-full pointer-events-none"
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

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-3"
      >
        {/* Breadcrumb (Figma Node 840:318) */}
        <nav className="flex items-center gap-2 text-[12.5px] leading-[18.75px]">
          <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors">
            Beranda
          </Link>
          <span className="text-white/40">/</span>
          <Link href="/sesi" className="text-white/70 hover:text-white transition-colors">
            Sesi
          </Link>
          <span className="text-white/40">/</span>
          <Link href="/sesi/detail" className="text-white/70 hover:text-white transition-colors">
            Detail Sesi
          </Link>
          <span className="text-white/40">/</span>
          <span className="font-medium text-white">Catat Pertemuan</span>
        </nav>

        {/* Page Head Title (Figma Node 840:333) */}
        <div className="flex flex-col gap-1 pt-2 pb-1">
          <h1 className="text-[22px] font-bold leading-[33px] text-white tracking-[-0.4px]">
            Catat Pertemuan <span className="font-medium text-white/70">#{pertemuanKe}</span>
          </h1>
          <p className="text-[13.5px] font-normal leading-[20.25px] text-white/90">
            {currentStep === 1
              ? "Langkah 1 dari 3 — isi data pelaksanaan dan tujuan pertemuan."
              : currentStep === 2
              ? "Langkah 2 dari 3 — tuliskan pembahasan dan umpan balik."
              : "Langkah 3 dari 3 — tindak lanjut, bukti, dan pernyataan."}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
