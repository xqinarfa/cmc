import Link from "next/link";
import { ASSETS } from "@/lib/assets";

export default function DashboardShowcase() {
  return (
    <section className="py-20 bg-[#f8fafc]/60 border-y border-[#f1f5f9]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Detailed Dashboard Mockup */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[460px]">
            {/* Dashboard Mini Sidebar */}
            <div className="w-full md:w-48 bg-[#f8fafc]/80 border-r border-[#f1f5f9] p-4 flex flex-col gap-4">
              <div className="flex items-center gap-2 p-2">
                <div className="w-6 h-6 rounded-md bg-[#2563eb] text-white font-black text-xs flex items-center justify-center">
                  C
                </div>
                <span className="font-extrabold text-[#1e293b] text-sm">CMC</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#eff6ff] text-[#2563eb] text-xs font-semibold">
                  <img src={ASSETS.homeNav} alt="" className="w-4 h-4" />
                  <span>Beranda</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#475569] text-xs font-semibold hover:bg-slate-100 transition-colors">
                  <img src={ASSETS.programNav} alt="" className="w-4 h-4" />
                  <span>Program Saya</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#475569] text-xs font-semibold hover:bg-slate-100 transition-colors">
                  <img src={ASSETS.sessionNav} alt="" className="w-4 h-4" />
                  <span>Sesi</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#475569] text-xs font-semibold hover:bg-slate-100 transition-colors">
                  <img src={ASSETS.devNav} alt="" className="w-4 h-4" />
                  <span>Pengembangan</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#475569] text-xs font-semibold hover:bg-slate-100 transition-colors">
                  <img src={ASSETS.certNav} alt="" className="w-4 h-4" />
                  <span>Sertifikat</span>
                </div>
              </div>
            </div>

            {/* Dashboard Main Area */}
            <div className="flex-1 p-6 flex flex-col gap-5">
              {/* Welcome Banner */}
              <div>
                <h3 className="text-lg font-bold text-[#0f172a]">
                  Halo, Andi Pratama 👋
                </h3>
                <p className="text-xs text-[#64748b]">
                  Teruslah belajar dan berkontribusi untuk transportasi yang
                  lebih baik.
                </p>
              </div>

              {/* 2 Top Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Donut Chart Card */}
                <div className="bg-[#f8fafc]/70 border border-[#f1f5f9] rounded-xl p-3.5 flex items-center gap-3">
                  <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                    <img
                      src={ASSETS.donutChart}
                      alt="70%"
                      className="w-16 h-16"
                    />
                    <span className="absolute font-black text-xs text-[#1e293b]">
                      70%
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-[#64748b]">
                      Progress JP Tahun Ini
                    </span>
                    <span className="text-base font-extrabold text-[#0f172a]">
                      14 / 20 JP
                    </span>
                    <Link
                      href="#jp-detail"
                      className="text-[10px] font-bold text-[#2563eb] hover:underline mt-1"
                    >
                      Lihat Detail →
                    </Link>
                  </div>
                </div>

                {/* Active Session Card */}
                <div className="bg-[#f8fafc]/70 border border-[#f1f5f9] rounded-xl p-3.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[#64748b]">
                      Sesi Aktif
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  </div>
                  <div className="flex items-center gap-2 my-2">
                    <img
                      src={ASSETS.coachAvatar}
                      alt="Avatar"
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#1e293b]">
                        Coaching Kepemimpinan
                      </span>
                      <span className="text-[10px] text-[#94a3b8]">
                        12 Sep 2025 • 10.00 WIB
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-[#0a1d37] hover:bg-[#142d54] text-white text-[10px] font-semibold px-3 py-1 rounded-md transition-colors">
                      {`Lanjutkan >`}
                    </button>
                  </div>
                </div>
              </div>

              {/* Recommendation Card */}
              <div className="bg-[#f8fafc]/60 border border-[#f1f5f9] rounded-xl p-4 flex flex-col gap-2.5">
                <span className="text-xs font-bold text-[#334155]">
                  Rekomendasi untuk Anda
                </span>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#ccfbf1] flex items-center justify-center shrink-0">
                      <img
                        src={ASSETS.bookOpenTeal}
                        alt=""
                        className="w-5 h-5"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#0f172a]">
                        Mentoring: Pengelolaan Proyek Transportasi
                      </span>
                      <span className="text-[10px] text-[#64748b]">
                        Coach Ir. Bambang S., M.Sc.
                      </span>
                    </div>
                  </div>
                  <button className="bg-white border border-[#e2e8f0] hover:bg-slate-50 text-[#2563eb] text-[10px] font-bold px-3 py-1.5 rounded shadow-sm transition-colors whitespace-nowrap">
                    {`Lihat Detail >`}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Value Proposition & Feature Points */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-black text-[#94a3b8] tracking-wider uppercase">
                PENGEMBANGAN YANG LEBIH TERUKUR
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight tracking-tight">
                Semua Perkembangan <br /> Anda dalam Satu Tempat
              </h2>
              <p className="text-base text-[#475569] leading-relaxed pt-1">
                Pantau sesi, catat hasil pertemuan, lihat akumulasi Jam Pelajaran
                (JP), hingga dapatkan sertifikat setelah verifikasi atasan.
              </p>
            </div>

            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] flex items-center justify-center shrink-0">
                  <img
                    src={ASSETS.featureSpeedometer}
                    alt=""
                    className="w-5 h-5"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold text-[#0f172a]">
                    Pelacakan JP otomatis
                  </h4>
                  <p className="text-xs text-[#64748b]">
                    Tidak perlu menghitung manual, setiap menit dihitung akurat.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] flex items-center justify-center shrink-0">
                  <img
                    src={ASSETS.featureHistory}
                    alt=""
                    className="w-5 h-5"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold text-[#0f172a]">
                    Riwayat aktivitas tersimpan
                  </h4>
                  <p className="text-xs text-[#64748b]">
                    Seluruh notulensi dan catatan sesi terdokumentasi dengan
                    rapi.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] flex items-center justify-center shrink-0">
                  <img
                    src={ASSETS.featureAward}
                    alt=""
                    className="w-5 h-5"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold text-[#0f172a]">
                    Sertifikat setelah verifikasi
                  </h4>
                  <p className="text-xs text-[#64748b]">
                    Dapatkan sertifikat resmi dan sah untuk setiap aktivitas
                    pengembangan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
