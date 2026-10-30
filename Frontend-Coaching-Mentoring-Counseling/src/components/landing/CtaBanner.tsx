import Link from "next/link";
import { ASSETS } from "@/lib/assets";

export default function CtaBanner() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-[80px]">
        <div className="relative bg-[#08182f] rounded-3xl overflow-hidden px-8 py-14 sm:px-14 sm:py-16 shadow-2xl">
          {/* Airport Silhouette Overlay */}
          <div className="absolute inset-0 mix-blend-luminosity opacity-20 pointer-events-none">
            <img
              src={ASSETS.airportSilhouette}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Gradient Tint */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07172e] via-[#07172e]/90 to-transparent pointer-events-none" />

          {/* Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Siap memulai perjalanan <br /> pengembangan Anda?
              </h2>
              <p className="text-base text-slate-300 max-w-lg leading-relaxed">
                Bersama CMC, wujudkan SDM unggul untuk transportasi yang lebih
                maju.
              </p>
              <div className="pt-4">
                <Link
                  href="#masuk"
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#0a1d37] font-bold text-sm shadow-xl transition-all active:scale-95"
                >
                  <img
                    src={ASSETS.ctaKeyIcon}
                    alt=""
                    className="w-4 h-4"
                    aria-hidden="true"
                  />
                  <span>Masuk dengan SIK</span>
                  <img
                    src={ASSETS.ctaArrowIcon}
                    alt=""
                    className="w-4 h-4"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            {/* Right Quote */}
            <div className="lg:col-span-5 flex flex-col lg:items-end justify-center">
              <blockquote className="text-xl sm:text-2xl font-bold italic text-slate-100 lg:text-right leading-snug">
                &ldquo;Melangkah bersama untuk <br className="hidden sm:inline" />
                transportasi yang lebih baik&rdquo;
              </blockquote>
              <div className="w-20 h-1.5 rounded-full bg-[#facc15] mt-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
