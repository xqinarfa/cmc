import Link from "next/link";
import { ASSETS } from "@/lib/assets";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#f8fafc]/70 via-white to-white border-b border-[#f1f5f9] pt-[56px] pb-[80px] overflow-hidden">
      {/* 
        Full-bleed Photo Banner: strictly 1329px wide × 468px high anchored to the right edge.
        This reproduces Figma's exact 1:1 image crop (hiding the top RUANG PELATIHAN banner 
        and the bottom notebooks) and matches the exact SVG radial gradient coordinates.
      */}
      <div
        aria-hidden
        className="absolute top-[56px] right-0 h-[468px] w-[1329px] pointer-events-none select-none overflow-hidden z-0"
      >
        <img
          src={ASSETS.heroBanner}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
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

      {/* Main Container aligned to 1440px Grid */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-[80px]">
        {/* Hero Banner Area: strictly 468px high on desktop */}
        <div className="relative w-full min-h-[468px] lg:h-[468px] flex items-center">
          {/* Left Hero Content (Figma 748:3482) */}
          <div className="relative z-10 flex flex-col gap-[24px] items-start max-w-[560px] pl-2 sm:pl-4 lg:pl-[32px] py-10 lg:py-0">
            {/* Tagline */}
            <div className="text-[11px] font-extrabold text-[#64748b] tracking-[1.1px] uppercase whitespace-nowrap">
              BERSAMA MEMBANGUN SDM UNGGUL
            </div>

            {/* Heading 2 */}
            <div className="w-full">
              <h1 className="text-[36px] sm:text-[44px] lg:text-[48px] font-extrabold text-[#0b1c38] tracking-[-1.2px] leading-[44px] sm:leading-[48px]">
                <span className="block">Kembangkan</span>
                <span className="block">Kompetensi.</span>
                <span className="block">Bertumbuh Bersama.</span>
              </h1>
            </div>

            {/* Subtitle / Description */}
            <div className="max-w-[512px]">
              <p className="text-[15px] sm:text-[16px] text-[#475569] leading-[24px]">
                Platform Coaching, Mentoring, dan Counselling Kementerian
                Perhubungan untuk mendukung pengembangan kompetensi pegawai
                secara terstruktur, terukur, dan terintegrasi.
              </p>
            </div>

            {/* Buttons CTA */}
            <div className="flex flex-wrap items-center gap-[12px] pt-[8px] w-full">
              {/* Masuk dengan SIK */}
              <Link
                href="/login"
                className="relative inline-flex items-center gap-[8px] px-[24px] py-[12px] rounded-[8px] bg-[#0b1c38] hover:bg-[#142d54] text-white text-[14px] font-semibold transition-all shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.1),0px_2px_4px_-2px_rgba(15,23,42,0.1)] active:scale-95"
              >
                <span>Masuk dengan SIK</span>
                <img
                  src={ASSETS.arrowRightWhite}
                  alt=""
                  className="w-[16px] h-[16px] shrink-0"
                  aria-hidden="true"
                />
              </Link>

              {/* Pelajari CMC */}
              <Link
                href="/tentang"
                className="inline-flex items-center gap-[6px] px-[20px] py-[12px] rounded-[8px] bg-white border border-[#cbd5e1] hover:bg-slate-50 text-[#334155] text-[14px] font-semibold transition-all active:scale-95 shadow-sm"
              >
                <span>Pelajari CMC</span>
                <img
                  src={ASSETS.arrowDownSlate}
                  alt=""
                  className="w-[16px] h-[16px] shrink-0"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* Floating White Glass Card at Bottom (Figma 748:3502) */}
          <div className="relative lg:absolute z-20 mt-4 lg:mt-0 lg:-bottom-[37px] lg:right-6 xl:right-[32px] w-full sm:w-[480px] lg:w-[532px] backdrop-blur-[6px] bg-white/95 border border-white/60 border-solid rounded-[12px] p-[16px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] flex items-center gap-[14px]">
            <div className="w-[40px] h-[40px] rounded-[8px] bg-[#eff6ff] flex items-center justify-center shrink-0">
              <img
                src={ASSETS.sparkleBlue}
                alt=""
                className="w-[24px] h-[24px] shrink-0"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="text-[12px] font-bold text-[#0f172a] leading-[16px]">
                Pengembangan hari ini
              </h4>
              <p className="text-[11px] text-[#64748b] leading-[16.5px]">
                untuk pelayanan yang lebih baik di masa depan.
              </p>
            </div>
          </div>
        </div>

        {/* Gap before Trust Features Bar: 56px */}
        <div className="h-[56px] w-full" />

        {/* Trust Features Bar (Figma 748:3512) - strictly isolated on clean white background */}
        <div className="w-full pt-[32px] border-t border-[rgba(226,232,240,0.8)] border-solid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {/* Item 1 */}
          <div className="flex items-start gap-[12px]">
            <div className="w-[36px] h-[36px] rounded-[8px] bg-[#eff6ff] flex items-center justify-center shrink-0">
              <img
                src={ASSETS.shieldKey}
                alt=""
                className="w-[20px] h-[20px] shrink-0"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col">
              <h5 className="text-[12px] font-bold text-[#0f172a] leading-[16px]">
                Terintegrasi dengan SIK
              </h5>
              <p className="text-[11px] text-[#64748b] leading-[16.5px]">
                Akses mudah dan aman
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-[12px]">
            <div className="w-[36px] h-[36px] rounded-[8px] bg-[#f0f9ff] flex items-center justify-center shrink-0">
              <img
                src={ASSETS.lockShield}
                alt=""
                className="w-[20px] h-[20px] shrink-0"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col">
              <h5 className="text-[12px] font-bold text-[#0f172a] leading-[16px]">
                Data terlindungi
              </h5>
              <p className="text-[11px] text-[#64748b] leading-[16.5px]">
                Sesuai standar keamanan pemerintah
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-[12px]">
            <div className="w-[36px] h-[36px] rounded-[8px] bg-[#eef2ff] flex items-center justify-center shrink-0">
              <img
                src={ASSETS.clockRewind}
                alt=""
                className="w-[20px] h-[20px] shrink-0"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col">
              <h5 className="text-[12px] font-bold text-[#0f172a] leading-[16px]">
                Mendukung 20 JP/tahun
              </h5>
              <p className="text-[11px] text-[#64748b] leading-[16.5px]">
                Pengembangan kompetensi berkelanjutan
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-start gap-[12px]">
            <div className="w-[36px] h-[36px] rounded-[8px] bg-[#ecfdf5] flex items-center justify-center shrink-0">
              <img
                src={ASSETS.usersCheck}
                alt=""
                className="w-[20px] h-[20px] shrink-0"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col">
              <h5 className="text-[12px] font-bold text-[#0f172a] leading-[16px]">
                Untuk seluruh pegawai
              </h5>
              <p className="text-[11px] text-[#64748b] leading-[16.5px]">
                Kementerian Perhubungan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
