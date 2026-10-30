"use client";

import React from "react";

interface LoginFooterProps {
  onOpenPrivacy: () => void;
}

export function LoginFooter({ onOpenPrivacy }: LoginFooterProps) {
  return (
    <footer className="w-full pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11.5px] text-slate-400">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onOpenPrivacy}
          className="hover:text-slate-700 transition-colors cursor-pointer focus-visible:underline"
        >
          Kebijakan Privasi
        </button>
        <span className="text-slate-300">•</span>
        <button
          type="button"
          onClick={onOpenPrivacy}
          className="hover:text-slate-700 transition-colors cursor-pointer focus-visible:underline"
        >
          Ketentuan Layanan
        </button>
      </div>
      <div className="text-center sm:text-right">
        © 2026 BPSDM Kementerian Perhubungan RI
      </div>
    </footer>
  );
}
