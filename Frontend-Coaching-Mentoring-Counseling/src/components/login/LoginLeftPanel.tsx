"use client";

import React from "react";
import Link from "next/link";
import { ASSETS } from "@/lib/assets";

interface LoginLeftPanelProps {
  currentSlide?: number;
  isPaused?: boolean;
  onTogglePause?: () => void;
  onSelectSlide?: (idx: number) => void;
  onPrev?: () => void;
  onNext?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function LoginLeftPanel({
  onMouseEnter,
  onMouseLeave,
}: LoginLeftPanelProps) {
  return (
    <section
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseEnter}
      onBlur={onMouseLeave}
      aria-label="Informasi Layanan CMC BPSDM Perhubungan"
      className="relative w-full lg:w-[48%] xl:w-[600px] 2xl:w-[60vw] lg:min-h-dvh flex flex-col justify-between p-6 sm:p-8 lg:p-12 bg-[#060e1d] text-white overflow-hidden shrink-0 border-r border-slate-800/80 order-2 lg:order-1"
    >
      {/* Background Video / Cinematic ASN Coaching Atmosphere Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={ASSETS.asnCoachingBg}
          className="w-full h-full object-cover scale-105 opacity-30 mix-blend-luminosity filter brightness-90 contrast-125 transition-transform duration-1000 ease-out"
        >
          <source src={ASSETS.asnCoachingVideo} type="video/mp4" />
        </video>
        {/* Cinematic gradient vignette for high contrast and executive readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060e1d]/85 via-[#060e1d]/70 to-[#060e1d]/95 backdrop-blur-[1px]" />
      </div>

      {/* Ambient Radial Lights */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sky-500/15 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/8 blur-[100px] pointer-events-none"
      />

      {/* Subtle Matrix/Grid Lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top Header Branding */}
      <header className="relative z-10 flex items-center gap-8">
        <div className="size-12 rounded-xl bg-slate-50 border border-slate-200/80 p-1.5 flex items-center justify-center shadow-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.bpsdmpLogo}
            alt="Logo BPSDM Perhubungan"
            className="size-12 object-contain"
          />
        </div>
        <Link
          href="/"
          className="group inline-flex items-center gap-3 transition-all hover:opacity-95 focus-visible:ring-2 focus-visible:ring-sky-400 rounded-xl cursor-pointer"
          title="Beranda CMC Kementerian Perhubungan"
          aria-label="Beranda CMC Kementerian Perhubungan"
        >
          <div className="bg-white px-2.5 py-1.5 rounded-xl border border-white/20 shadow-md shadow-black/20 flex items-center group-hover:scale-[1.02] transition-transform">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.corpuLogo}
              alt="Logo Kemenhub Corporate University"
              className="h-7 sm:h-8 w-auto object-contain shrink-0"
            />
          </div>

          <div className="w-px h-7 bg-white/20" />

          <div className="flex flex-col">
            <span className="font-extrabold text-white text-[14px] tracking-tight leading-tight group-hover:text-sky-300 transition-colors">
              CMC
            </span>
            <span className="text-[10px] text-slate-400 font-medium leading-tight">
              Coaching, Mentoring &amp; Counselling
            </span>
          </div>
        </Link>
      </header>
    </section>
  );
}
