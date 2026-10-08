import Link from "next/link";
import { ASSETS } from "@/lib/assets";

export default function Footer() {
  return (
    <footer className="bg-[#0e1937] text-white pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-[80px]">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Col 1: Logos & Description */}
          <div className="flex flex-col gap-5">
            {/* Logos */}
            <div className="flex items-center gap-3">
              <img
                src={ASSETS.kemenhubFullLogo}
                alt="Logo Kemenhub"
                className="h-11 w-auto object-contain"
              />
              <img
                src={ASSETS.bpsdmpLogo}
                alt="Logo BPSDMP"
                className="h-11 w-auto object-contain"
              />
              <img
                src={ASSETS.ppsdmapLogo}
                alt="Logo PPSDMAP"
                className="h-11 w-auto object-contain"
              />
              <img
                src={ASSETS.corpusLogo}
                alt="Logo Corpus"
                className="h-11 w-auto object-contain"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-wide">Kemenhub</span>
              <span className="text-xs uppercase tracking-wider text-[#8ec5ff] font-medium">
                Pusat Pengetahuan Terpadu
              </span>
            </div>

            <p className="text-sm text-blue-100/70 leading-relaxed">
              Platform Knowledge Management System (KMS) Kementerian Perhubungan
              Republik Indonesia untuk mewujudkan budaya berbagi pengetahuan dan
              kolaborasi antar pegawai.
            </p>
          </div>

          {/* Col 2: Tautan Cepat */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold border-b border-white/10 pb-2">
              Tautan Cepat
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-blue-100/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang"
                  className="hover:text-white transition-colors"
                >
                  Tentang CMC
                </Link>
              </li>
              <li>
                <Link
                  href="#repositori"
                  className="hover:text-white transition-colors"
                >
                  Modul Repositori
                </Link>
              </li>
              <li>
                <Link
                  href="#forum"
                  className="hover:text-white transition-colors"
                >
                  Forum Diskusi
                </Link>
              </li>
              <li>
                <Link
                  href="#panduan"
                  className="hover:text-white transition-colors"
                >
                  Panduan Pengguna
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hubungi Kami */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold border-b border-white/10 pb-2">
              Hubungi Kami
            </h4>
            <div className="flex flex-col gap-3.5 text-sm text-blue-100/70">
              <div className="flex items-start gap-3">
                <img
                  src={ASSETS.locationIcon}
                  alt=""
                  className="w-5 h-5 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>
                  Jl. Medan Merdeka Barat No. 8 <br />
                  Jakarta Pusat, DKI Jakarta 10110
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={ASSETS.phoneIcon}
                  alt=""
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                />
                <span>151 (Contact Center)</span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={ASSETS.emailIcon}
                  alt=""
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                />
                <span>info151@dephub.go.id</span>
              </div>
            </div>
          </div>

          {/* Col 4: Ikuti Kami */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold border-b border-white/10 pb-2">
              Ikuti Kami
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://dephub.go.id"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
                aria-label="Website Kemenhub"
              >
                <img src={ASSETS.socialWeb} alt="" className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/kemenhub151"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
                aria-label="Instagram Kemenhub"
              >
                <img src={ASSETS.socialInstagram} alt="" className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@kemenhub151"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
                aria-label="YouTube Kemenhub"
              >
                <img src={ASSETS.socialYoutube} alt="" className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/kemenhub151"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
                aria-label="Facebook Kemenhub"
              >
                <img src={ASSETS.socialFacebook} alt="" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/50">
          <p>© 2026 Kementerian Perhubungan RI. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6">
            <Link
              href="#syarat"
              className="hover:text-blue-100 transition-colors"
            >
              Syarat &amp; Ketentuan
            </Link>
            <Link
              href="#privasi"
              className="hover:text-blue-100 transition-colors"
            >
              Kebijakan Privasi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
