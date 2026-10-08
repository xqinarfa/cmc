"use client";

import React from "react";

interface LoginFooterProps {
  onOpenPrivacy: () => void;
}

export function LoginFooter({ onOpenPrivacy }: LoginFooterProps) {
  return (
    <footer className="w-full pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11.5px] text-slate-500">
      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={onOpenPrivacy}
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          Kebijakan Privasi
        </button>
        <button
          type="button"
          onClick={() => alert("Syarat Penggunaan mengacu pada Peraturan Menteri Perhubungan No. PM 47 Tahun 2021.")}
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          Syarat Penggunaan
        </button>
      </div>
      <div>© 2026 Kementerian Perhubungan RI • BPSDM Perhubungan</div>
    </footer>
  );
}
