"use client";

import React from "react";
import Link from "next/link";
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
      aria-label="Pusat Informasi Layanan BPSDM Perhubungan"
      className="relative w-full lg:w-[48%] xl:w-[660px] 2xl:w-[720px] lg:min-h-dvh flex flex-col justify-between p-5 sm:p-8 lg:p-12 bg-[#081730] text-white overflow-hidden shrink-0 border-r border-slate-800 order-2 lg:order-1"
    >
      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top Header Branding */}
      <header className="relative z-10 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-3 transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-0.5"
        >
          <div className="size-10 rounded-lg bg-[#0f244a] border border-slate-700/80 p-1 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.kemenhubEmblem}
              alt="Emblem Resmi Kementerian Perhubungan"
              className="size-7 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-[13.5px] tracking-tight leading-tight">
              CMC Corporate University
            </span>
            <span className="text-[11px] text-slate-400 leading-tight">
              Kementerian Perhubungan RI
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium transition-colors border border-white/10 focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <span>Kembali ke Beranda</span>
          <svg
            className="w-3.5 h-3.5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </header>

      {/* Center: Institutional Dossier Showcase Card */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-6 sm:py-8">
        <div className="w-full max-w-[480px] flex flex-col items-center gap-6">
          <div
            id={`pillar-panel-${currentSlide}`}
            role="region"
            aria-label={`Layanan ${slide.tag}`}
            className="w-full bg-white text-slate-900 rounded-xl p-6 shadow-xl border border-slate-200"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-slate-900">
                  {slide.tag}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[11.5px] font-medium text-slate-500">
                  BPSDM Perhubungan
                </span>
              </div>
              <span className="text-[11.5px] font-semibold text-emerald-700 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-600 inline-block" />
                {slide.statusBadge}
              </span>
            </div>

            {/* Participants Section */}
            <div className="divide-y divide-slate-100 py-2">
              <div className="flex items-start gap-3 py-2.5">
                <div
                  className="size-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-xs mt-0.5"
                  style={{ backgroundColor: slide.coach.bg }}
                >
                  {slide.coach.initial}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[12.5px] font-bold text-slate-900 truncate">
                    {slide.coach.name}
                  </span>
                  <span className="text-[11px] text-blue-700 font-medium truncate">
                    {slide.coach.role}
                  </span>
                  <span className="text-[10.5px] text-slate-500 truncate">
                    {slide.coach.agency}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2.5">
                <div
                  className="size-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-xs mt-0.5"
                  style={{ backgroundColor: slide.coachee.bg }}
                >
                  {slide.coachee.initial}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[12.5px] font-bold text-slate-900 truncate">
                    {slide.coachee.name}
                  </span>
                  <span className="text-[11px] text-teal-700 font-medium truncate">
                    {slide.coachee.role}
                  </span>
                  <span className="text-[10.5px] text-slate-500 truncate">
                    {slide.coachee.agency}
                  </span>
                </div>
              </div>
            </div>

            {/* Agenda Detail Row */}
            <div className="py-2.5 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-700">
              <span className="font-bold text-slate-900 shrink-0">Fokus Sesi:</span>
              <span className="text-slate-600 leading-snug">{slide.agenda}</span>
            </div>

            {/* Progress & Compliance Bar */}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-600">
                  {slide.jpMetric.label}
                </span>
                <span className="font-bold text-slate-900">
                  {slide.jpMetric.value}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${slide.jpMetric.percent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                <span>Mandat Permenhub PM 47/2021</span>
                <span className="font-medium text-emerald-700">
                  {slide.satisfactionScore}
                </span>
              </div>
            </div>
          </div>

          {/* Slide Title & Description */}
          <div className="flex flex-col items-center text-center gap-1.5 px-2">
            <h2 className="text-xl sm:text-[22px] font-bold text-white tracking-tight leading-snug">
              {slide.title}
            </h2>
            <p className="text-[13px] text-slate-300 max-w-[440px] leading-relaxed">
              {slide.description}
            </p>
          </div>
        </div>
      </div>

      {/* Carousel Bottom Controls */}
      <footer className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onTogglePause}
            aria-label={isPaused ? "Lanjutkan perputaran otomatis" : "Jeda perputaran"}
            className="size-8 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 text-slate-300 flex items-center justify-center transition-colors border border-slate-700 cursor-pointer"
          >
            {isPaused ? (
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
          </button>

          <div className="flex items-center gap-1.5" role="tablist" aria-label="Indikator slide">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => onSelectSlide(idx)}
                aria-label={`Pindah ke slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? "w-6 bg-blue-500" : "w-1.5 bg-slate-700 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>

          <span className="text-[11px] text-slate-400">
            Layanan {currentSlide + 1} dari {SLIDES.length}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Slide sebelumnya"
            className="size-9 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 text-slate-300 flex items-center justify-center transition-colors border border-slate-700 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Slide berikutnya"
            className="size-9 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 text-slate-300 flex items-center justify-center transition-colors border border-slate-700 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </footer>
    </section>
  );
}
