"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ASSETS } from "@/lib/assets";
import { SLIDES } from "@/lib/loginData";

interface LoginLeftPanelProps {
  currentSlide: number;
  isPaused: boolean;
  onTogglePause: () => void;
  onSelectSlide: (idx: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function LoginLeftPanel({
  currentSlide,
  isPaused,
  onTogglePause,
  onSelectSlide,
  onPrev,
  onNext,
  onMouseEnter,
  onMouseLeave,
}: LoginLeftPanelProps) {
  const slide = SLIDES[currentSlide];

  return (
    <section
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseEnter}
      onBlur={onMouseLeave}
      aria-label="Informasi Layanan CMC BPSDM Perhubungan"
      className="relative w-full lg:w-[48%] xl:w-[600px] 2xl:w-[660px] lg:min-h-dvh flex flex-col justify-between p-6 sm:p-8 lg:p-12 bg-[#060e1d] text-white overflow-hidden shrink-0 border-r border-slate-800/80 order-2 lg:order-1"
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
      <header className="relative z-10 flex items-center justify-between">
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

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white text-xs font-semibold transition-all border border-white/10 active:scale-95"
        >
          <span>Beranda</span>
          <svg
            className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </header>

      {/* Center Showcase: Refined Glass Widget */}
      <div className="relative z-10 my-auto py-8 sm:py-10 flex flex-col items-center">
        <div className="w-full max-w-[480px] flex flex-col gap-5">
          {/* Quick Segmented Pillar Tabs */}
          <div className="w-full p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md flex items-center gap-1">
            {SLIDES.map((s, idx) => {
              const isActive = currentSlide === idx;
              const shortName = s.tag.split(" ")[0]; // "Coaching", "Mentoring", "Konseling", "Integrasi"
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSelectSlide(idx)}
                  className={`relative flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer select-none text-center ${
                    isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePillarTab"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-600/80 to-blue-700/80 border border-sky-400/30 shadow-md"
                    />
                  )}
                  <span className="relative z-10 block truncate">{shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Frosted Glass Dossier */}
          <div className="relative rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/[0.1] backdrop-blur-xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col gap-5"
              >
                {/* Dossier Header: Tag & Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-sky-400 tracking-wide uppercase">
                      {slide.tag}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {slide.categoryCode}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {slide.statusBadge}
                  </span>
                </div>

                {/* Title & Short Tagline (Ruthlessly concise, NO text walls) */}
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                    {slide.title}
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {slide.description}
                  </p>
                </div>

                {/* Compact Participant Pair */}
                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  {/* Primary: Coach / Mentor */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`size-8 rounded-lg bg-gradient-to-br ${slide.coach.bg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm`}
                    >
                      {slide.coach.initial}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[12px] font-bold text-slate-100 truncate">
                        {slide.coach.name}
                      </span>
                      <span className="text-[10.5px] text-sky-300 truncate">
                        {slide.coach.role}
                      </span>
                    </div>
                  </div>

                  {/* Secondary: Coachee / ASN */}
                  <div className="flex items-center gap-2.5 min-w-0 border-l border-white/[0.06] pl-3">
                    <div
                      className={`size-8 rounded-lg bg-gradient-to-br ${slide.coachee.bg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm`}
                    >
                      {slide.coachee.initial}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[12px] font-bold text-slate-100 truncate">
                        {slide.coachee.name}
                      </span>
                      <span className="text-[10.5px] text-teal-300 truncate">
                        {slide.coachee.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Metric Bar */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">
                      {slide.jpMetric.label}
                    </span>
                    <span className="font-bold text-white tracking-tight">
                      {slide.jpMetric.value}
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${slide.jpMetric.percent}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-500 shadow-sm"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                    <span>Target 20 JP Tahunan</span>
                    <span className="text-emerald-400 font-medium">
                      {slide.satisfactionScore}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Carousel Bottom Controls */}
      <footer className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onTogglePause}
            aria-label={isPaused ? "Lanjutkan perputaran" : "Jeda perputaran"}
            className="size-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 text-slate-300 flex items-center justify-center transition-all border border-white/10 cursor-pointer"
          >
            {isPaused ? (
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Indikator slide">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx
                    ? "w-6 bg-sky-400"
                    : "w-1.5 bg-slate-700 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Slide sebelumnya"
            className="size-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 text-slate-300 flex items-center justify-center transition-all border border-white/10 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Slide berikutnya"
            className="size-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 text-slate-300 flex items-center justify-center transition-all border border-white/10 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </footer>
    </section>
  );
}
