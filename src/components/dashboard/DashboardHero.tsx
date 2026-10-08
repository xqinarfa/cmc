"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function DashboardHero() {
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
      {/* Radial Glow Gradient */}
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

      {/* Content Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-white/70 font-medium mb-2.5">
          <span className="text-white/60">Beranda</span>
          <span className="text-white/40">/</span>
          <span className="text-white font-semibold">Dashboard Utama</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1 pb-1">
          {/* Left Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-1.5 max-w-2xl"
          >
            <h1 className="text-[26px] sm:text-[28px] font-bold leading-tight text-white tracking-[-0.4px]">
              Selamat Datang, Andi Pratama
            </h1>
            <p className="text-[13.5px] font-normal leading-[21px] text-white/90">
              Terus melangkah dalam perjalanan pengembangan kompetensi Anda untuk mendukung transportasi maju Indonesia.
            </p>
          </motion.div>

          {/* Right Action Button: Catat Sesi Baru */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="shrink-0 self-start sm:self-auto"
          >
            <Link
              href="/sesi/baru"
              className="h-[40px] px-5 rounded-[8px] bg-white text-[#0a2540] hover:bg-slate-50 border border-white/20 text-[13.5px] font-bold inline-flex items-center gap-2 transition-all hover:shadow-lg cursor-pointer shadow-md group"
            >
              <svg
                className="size-4 text-[#0a2540] group-hover:rotate-90 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Catat Sesi Baru</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
