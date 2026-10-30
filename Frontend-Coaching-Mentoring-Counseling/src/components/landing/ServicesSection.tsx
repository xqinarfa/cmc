import Link from "next/link";
import { ASSETS } from "@/lib/assets";

export default function ServicesSection() {
  return (
    <section id="layanan" className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Section Header */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-xs font-black text-[#94a3b8] tracking-wider uppercase">
              DUA JALUR PENGEMBANGAN, SATU TUJUAN
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight tracking-tight">
              Coaching dan Mentoring untuk Potensi Terbaik Anda
            </h2>
            <p className="text-base text-[#475569] leading-relaxed pt-2">
              Temukan arahan, perluas wawasan, dan capai tujuan pengembangan
              karier bersama Coach atau Mentor yang berpengalaman.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Coaching */}
            <div className="group relative bg-[#eff6ff]/40 border border-[#dbeafe] rounded-3xl p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-h-[380px]">
              <div className="flex flex-col gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#2563eb] shadow-md shadow-blue-500/20 flex items-center justify-center">
                  <img
                    src={ASSETS.coachingIcon}
                    alt=""
                    className="w-6 h-6"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a]">Coaching</h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Temukan potensi dan tingkatkan performa melalui sesi coaching
                  yang terarah dan terstruktur.
                </p>
                <div className="pt-2">
                  <Link
                    href="#coaching"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#2563eb] group-hover:gap-3 transition-all"
                  >
                    <span>Pelajari Coaching</span>
                    <img
                      src={ASSETS.arrowRightBlue}
                      alt=""
                      className="w-4 h-4"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>

              {/* Illustration at bottom right */}
              <div className="self-end mt-4 w-28 h-28 opacity-90 group-hover:scale-105 transition-transform">
                <img
                  src={ASSETS.coWorkers}
                  alt="Coaching Illustration"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </div>
            </div>

            {/* Card 2: Mentoring */}
            <div className="group relative bg-[#ecfdf5]/40 border border-[#d1fae5] rounded-3xl p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-h-[380px]">
              <div className="flex flex-col gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#0d9488] shadow-md shadow-teal-500/20 flex items-center justify-center">
                  <img
                    src={ASSETS.mentoringIcon}
                    alt=""
                    className="w-6 h-6"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a]">Mentoring</h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Belajar dari pengalaman dan keahlian mentor untuk
                  mengembangkan karier Anda.
                </p>
                <div className="pt-2">
                  <Link
                    href="#mentoring"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0f766e] group-hover:gap-3 transition-all"
                  >
                    <span>Pelajari Mentoring</span>
                    <img
                      src={ASSETS.arrowRightTeal}
                      alt=""
                      className="w-4 h-4"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>

              {/* Illustration at bottom right */}
              <div className="self-end mt-4 w-28 h-28 opacity-90 group-hover:scale-105 transition-transform">
                <img
                  src={ASSETS.managerSupervisor}
                  alt="Mentoring Illustration"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </div>
            </div>

            {/* Card 3: Counseling */}
            <div className="group relative bg-[#fdecec]/40 border border-[#fedbe7] rounded-3xl p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-h-[380px]">
              <div className="flex flex-col gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#eb25b6] shadow-md shadow-pink-500/20 flex items-center justify-center">
                  <img
                    src={ASSETS.coachingIcon}
                    alt=""
                    className="w-6 h-6"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a]">Counseling</h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Temukan potensi dan tingkatkan performa melalui sesi
                  counseling yang terarah dan terstruktur.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center text-sm font-bold text-[#f26668] bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                    Coming Soon
                  </span>
                </div>
              </div>

              {/* Illustration at bottom right */}
              <div className="self-end mt-4 w-28 h-28 opacity-90 group-hover:scale-105 transition-transform">
                <img
                  src={ASSETS.coWorkers}
                  alt="Counseling Illustration"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
