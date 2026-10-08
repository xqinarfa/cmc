"use client";

import Link from "next/link";

interface AppFooterProps {
  onShowToast?: (msg: string) => void;
}

export default function AppFooter({ onShowToast }: AppFooterProps) {
  return (
    <footer className="w-full bg-[#0a2244] text-white py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10 mt-auto">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white tracking-wider">CMC</span>
          <span>·</span>
          <span>Corporate University Kementerian Perhubungan Republik Indonesia</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() =>
              onShowToast?.("Data dilindungi sesuai UU No. 27/2022 tentang Pelindungan Data Pribadi.")
            }
            className="hover:text-white transition-colors cursor-pointer"
          >
            Kebijakan Privasi
          </button>
          <button
            type="button"
            onClick={() =>
              onShowToast?.("Mengacu pada Peraturan Menteri Perhubungan No. PM 47 Tahun 2021.")
            }
            className="hover:text-white transition-colors cursor-pointer"
          >
            Syarat &amp; Ketentuan
          </button>
          <Link href="/#faq" className="hover:text-white transition-colors">
            Pusat Bantuan
          </Link>
        </div>
        <p>© 2026 Kementerian Perhubungan. Hak cipta dilindungi undang-undang.</p>
      </div>
    </footer>
  );
}
