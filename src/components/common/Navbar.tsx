"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ASSETS } from "@/lib/assets";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";
  const isAbout = pathname === "/tentang";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-[#f1f5f9] shadow-xs">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-[80px] h-20 flex items-center justify-between gap-4">
        {/* Left: Mobile Trigger & Branding */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden size-10 rounded-xl hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label="Buka Menu Navigasi"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <Link
            href="/"
            className="flex items-center gap-3.5 cursor-pointer group"
            title="Beranda CMC Kementerian Perhubungan"
            aria-label="Beranda CMC Kementerian Perhubungan"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.corpuLogo}
              alt="Logo Kemenhub Corporate University"
              className="h-10 sm:h-11 w-auto object-contain drop-shadow-xs group-hover:scale-[1.02] transition-transform shrink-0"
            />

            <div className="hidden md:block w-px h-8 bg-[#e2e8f0]" />

            <div className="hidden md:flex flex-col">
              <span className="font-black text-[#0a1d37] text-base tracking-tight leading-tight group-hover:text-blue-700 transition-colors">
                CMC
              </span>
              <span className="text-[#64748b] text-[9.5px] uppercase font-semibold tracking-tight">
                Coaching, Mentoring &amp; Counselling
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Nav links */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Navigasi Utama">
          <Link
            href="/"
            className={`relative py-2 text-sm font-semibold transition-colors ${
              isHome ? "text-[#2563eb]" : "text-[#475569] hover:text-[#0f172a]"
            }`}
          >
            Beranda
            {isHome && (
              <motion.span
                layoutId="navIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563eb] rounded-full"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
          </Link>
          <Link
            href="/tentang"
            className={`relative py-2 text-sm font-semibold transition-colors ${
              isAbout ? "text-[#2563eb]" : "text-[#475569] hover:text-[#0f172a]"
            }`}
          >
            Tentang CMC
            {isAbout && (
              <motion.span
                layoutId="navIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563eb] rounded-full"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
          </Link>
          <Link
            href={isHome ? "#cara-kerja" : "/#cara-kerja"}
            className="text-sm font-medium text-[#475569] hover:text-[#0f172a] transition-colors"
          >
            Cara Kerja
          </Link>
          <Link
            href={isAbout ? "#faq" : "/tentang#faq"}
            className="text-sm font-medium text-[#475569] hover:text-[#0f172a] transition-colors"
          >
            FAQ
          </Link>
        </nav>

        {/* Right: SIK Login */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0a1d37] hover:bg-[#142d54] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
          >
            <span>Masuk dengan SIK</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.navArrowWhite}
              alt=""
              className="w-4 h-4 shrink-0"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden border-t border-slate-200 px-6 py-4 bg-white flex flex-col gap-2 shadow-lg overflow-hidden"
          >
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                isHome ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Beranda
            </Link>
            <Link
              href="/tentang"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                isAbout ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Tentang CMC
            </Link>
            <Link
              href={isHome ? "#cara-kerja" : "/#cara-kerja"}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cara Kerja
            </Link>
            <Link
              href={isAbout ? "#faq" : "/tentang#faq"}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              FAQ
            </Link>
            <div className="pt-2 border-t border-slate-100 mt-1">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0a1d37] text-white text-sm font-bold"
              >
                <span>Masuk dengan SIK</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
