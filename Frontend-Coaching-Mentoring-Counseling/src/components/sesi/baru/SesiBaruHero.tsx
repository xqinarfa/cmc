"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SesiBaruHero() {
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
      {/* Radial Flare in top right corner (Figma Node 832:264) */}
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

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-3">
        {/* Breadcrumb (Figma Node 832:44) */}
        <motion.nav
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-[12.5px] leading-[18.75px]"
        >
          <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors">
            Beranda
          </Link>
          <span className="text-white/40">/</span>
          <Link href="/sesi" className="text-white/70 hover:text-white transition-colors">
            Sesi
          </Link>
          <span className="text-white/40">/</span>
          <span className="text-white font-medium">Catat Sesi Baru</span>
        </motion.nav>

        {/* Page Heading (Figma Node 832:55) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col gap-1 max-w-[560px] pb-3"
        >
          <h1 className="text-[22px] font-bold text-white tracking-[-0.4px] leading-[33px]">
            Catat Sesi Baru
          </h1>
          <p className="text-[13.5px] text-white/85 leading-[20.25px]">
            Isi data sesi Coaching atau Mentoring yang akan atau sudah Anda laksanakan.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
