import Link from "next/link";
import { ASSETS } from "@/lib/assets";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] min-h-[calc(100dvh-80px)] flex flex-col justify-between pb-8 lg:pb-12 overflow-hidden">
      {/* 
        Full-bleed Photo Banner: strictly 1329px wide × 468px high anchored to the right edge.
        This reproduces Figma's exact 1:1 image crop (hiding the top RUANG PELATIHAN banner 
        and the bottom notebooks) and matches the exact SVG radial gradient coordinates.
      */}
      <div
        aria-hidden
        className="absolute right-0 top-0 h-full w-[60vw] pointer-events-none select-none overflow-hidden z-0"
      >
        <img
          src={ASSETS.heroBanner}
          alt=""
          className="absolute inset-0 w-full h-[74vh] object-cover object-center"
        />
        {/* Exact SVG Radial Gradient Mask from Figma (designed for 1329x468) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 1329 468"
          aria-hidden="true"
        >
          <defs>
            <radialGradient
              id="heroMaskGrad"
              gradientUnits="userSpaceOnUse"
              cx="0"
              cy="0"
              r="10"
              gradientTransform="matrix(133.67 -3.6613e-9 0.0000042412 317.77 0.0000031231 234)"
            >
              <stop stopColor="#ffffff" stopOpacity="1" offset="0.36056" />
              <stop stopColor="#ffffff" stopOpacity="0" offset="0.6144" />
            </radialGradient>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#heroMaskGrad)"
          />
        </svg>
        {/* Mobile text contrast overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70 lg:hidden" />
      </div>

      {/* Main Container aligned to 1440px / 1680px Grid */}
      <div className="relative z-10 w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20 flex-1 flex flex-col justify-between">
        {/* Hero Banner Area: flex-1 ensures balanced vertical centering on full-height viewports */}
        <div className="relative w-full flex-1 min-h-[420px] sm:min-h-[468px] 2xl:min-h-[520px] flex items-center py-6 lg:py-4">
          {/* Left Hero Content (Figma 748:3482) */}
          <div className="relative z-10 flex flex-col gap-3.5 sm:gap-5 lg:gap-6 2xl:gap-8 items-start max-w-[560px] lg:max-w-[620px] xl:max-w-[700px] 2xl:max-w-[800px] py-6 sm:py-8 lg:py-0">
            {/* Tagline */}
            <div className="text-[10px] xs:text-[11px] sm:text-xs md:text-[13px] 2xl:text-[15px] font-extrabold text-[#64748b] tracking-[1px] sm:tracking-[1.2px] 2xl:tracking-[1.5px] uppercase whitespace-nowrap">
              BERSAMA MEMBANGUN SDM UNGGUL
            </div>

            {/* Heading 1 - Fluid Responsive Typography across all screen resolutions */}
            <div className="w-full">
              <h1 className="text-[clamp(1.75rem,3.2vw+0.75rem,3.75rem)] 2xl:text-[4.25rem] font-extrabold text-[#0b1c38] tracking-[-0.03em] leading-[1.12]">
                <span className="block">Kembangkan</span>
                <span className="block">Kompetensi.</span>
                <span className="block">Bertumbuh Bersama.</span>
              </h1>
            </div>

            {/* Subtitle / Description */}
            <div className="max-w-[480px] sm:max-w-[520px] lg:max-w-[580px] xl:max-w-[640px] 2xl:max-w-[720px]">
              <p className="text-[clamp(0.875rem,0.65vw+0.65rem,1.15rem)] 2xl:text-[1.25rem] text-[#475569] leading-relaxed">
                Platform Coaching, Mentoring, dan Counselling Kementerian
                Perhubungan untuk mendukung pengembangan kompetensi pegawai
                secara terstruktur, terukur, dan terintegrasi.
              </p>
            </div>

            {/* Buttons CTA */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 2xl:gap-4 pt-1 sm:pt-2 w-full">
              {/* Masuk dengan SIK */}
              <Link
                href="/login"
                className="relative inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 lg:px-6 lg:py-3.5 2xl:px-7 2xl:py-4 rounded-lg bg-[#0b1c38] hover:bg-[#142d54] text-white text-xs sm:text-sm lg:text-[15px] 2xl:text-base font-semibold transition-all shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.1),0px_2px_4px_-2px_rgba(15,23,42,0.1)] active:scale-95"
              >
                <span>Masuk dengan SIK</span>
                <img
                  src={ASSETS.arrowRightWhite}
                  alt=""
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5 shrink-0"
                  aria-hidden="true"
                />
              </Link>

              {/* Pelajari CMC */}
              <Link
                href="/tentang"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3 lg:px-6 lg:py-3.5 2xl:px-7 2xl:py-4 rounded-lg bg-white border border-[#cbd5e1] hover:bg-slate-50 text-[#334155] text-xs sm:text-sm lg:text-[15px] 2xl:text-base font-semibold transition-all active:scale-95 shadow-sm"
              >
                <span>Pelajari CMC</span>
                <img
                  src={ASSETS.arrowDownSlate}
                  alt=""
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5 shrink-0"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* Floating White Glass Card at Bottom (Figma 748:3502) */}
          <div className="relative lg:absolute z-20 mt-6 lg:mt-0 lg:-bottom-[28px] lg:right-4 xl:right-[32px] w-full sm:w-[420px] md:w-[460px] lg:w-[500px] xl:w-[532px] 2xl:w-[600px] backdrop-blur-[6px] bg-white/95 border border-white/60 border-solid rounded-xl p-3.5 sm:p-4 2xl:p-5 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] flex items-center gap-3 sm:gap-3.5 2xl:gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 2xl:w-12 2xl:h-12 rounded-lg bg-[#eff6ff] flex items-center justify-center shrink-0">
              <img
                src={ASSETS.sparkleBlue}
                alt=""
                className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7 shrink-0"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="text-xs sm:text-[13px] lg:text-sm 2xl:text-base font-bold text-[#0f172a] leading-tight">
                Pengembangan hari ini
              </h4>
              <p className="text-[10.5px] sm:text-xs lg:text-[13px] 2xl:text-sm text-[#64748b] leading-normal">
                untuk pelayanan yang lebih baik di masa depan.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Gap + Trust Features Bar pinned cleanly to bottom of viewport */}
        <div className="w-full mt-auto">
          {/* Gap before Trust Features Bar */}
          <div className="h-6 sm:h-8 lg:h-12 2xl:h-14 w-full shrink-0" />

          {/* Trust Features Bar (Figma 748:3512) - strictly isolated on clean white background */}
          <div className="w-full pt-5 sm:pt-6 lg:pt-7 2xl:pt-8 border-t border-[rgba(226,232,240,0.8)] border-solid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 2xl:gap-8">
            {/* Item 1 */}
            <div className="flex items-start gap-2.5 sm:gap-3 2xl:gap-3.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 rounded-lg bg-[#eff6ff] flex items-center justify-center shrink-0">
                <img
                  src={ASSETS.shieldKey}
                  alt=""
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px] lg:w-5 lg:h-5 2xl:w-6 2xl:h-6 shrink-0"
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col">
                <h5 className="text-xs sm:text-[13px] lg:text-sm 2xl:text-base font-bold text-[#0f172a] leading-tight">
                  Terintegrasi dengan SIK
                </h5>
                <p className="text-[10.5px] sm:text-[11.5px] lg:text-xs 2xl:text-sm text-[#64748b] leading-normal">
                  Akses mudah dan aman
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-2.5 sm:gap-3 2xl:gap-3.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 rounded-lg bg-[#f0f9ff] flex items-center justify-center shrink-0">
                <img
                  src={ASSETS.lockShield}
                  alt=""
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px] lg:w-5 lg:h-5 2xl:w-6 2xl:h-6 shrink-0"
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col">
                <h5 className="text-xs sm:text-[13px] lg:text-sm 2xl:text-base font-bold text-[#0f172a] leading-tight">
                  Data terlindungi
                </h5>
                <p className="text-[10.5px] sm:text-[11.5px] lg:text-xs 2xl:text-sm text-[#64748b] leading-normal">
                  Sesuai standar keamanan pemerintah
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-2.5 sm:gap-3 2xl:gap-3.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 rounded-lg bg-[#eef2ff] flex items-center justify-center shrink-0">
                <img
                  src={ASSETS.clockRewind}
                  alt=""
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px] lg:w-5 lg:h-5 2xl:w-6 2xl:h-6 shrink-0"
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col">
                <h5 className="text-xs sm:text-[13px] lg:text-sm 2xl:text-base font-bold text-[#0f172a] leading-tight">
                  Mendukung 20 JP/tahun
                </h5>
                <p className="text-[10.5px] sm:text-[11.5px] lg:text-xs 2xl:text-sm text-[#64748b] leading-normal">
                  Pengembangan kompetensi berkelanjutan
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-start gap-2.5 sm:gap-3 2xl:gap-3.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 rounded-lg bg-[#ecfdf5] flex items-center justify-center shrink-0">
                <img
                  src={ASSETS.usersCheck}
                  alt=""
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px] lg:w-5 lg:h-5 2xl:w-6 2xl:h-6 shrink-0"
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col">
                <h5 className="text-xs sm:text-[13px] lg:text-sm 2xl:text-base font-bold text-[#0f172a] leading-tight">
                  Untuk seluruh pegawai
                </h5>
                <p className="text-[10.5px] sm:text-[11.5px] lg:text-xs 2xl:text-sm text-[#64748b] leading-normal">
                  Kementerian Perhubungan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
