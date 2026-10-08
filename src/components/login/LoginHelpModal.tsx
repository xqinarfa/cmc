"use client";

import React from "react";

interface LoginHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  copiedEmail: boolean;
  onCopyEmail: () => void;
}

export function LoginHelpModal({
  isOpen,
  onClose,
  copiedEmail,
  onCopyEmail,
}: LoginHelpModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="helpdesk-title"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-[460px] bg-white rounded-xl shadow-2xl border border-slate-200 p-6 sm:p-7 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 id="helpdesk-title" className="text-base font-bold text-slate-900">
            Bantuan Administrasi Akun CMC
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela bantuan"
            className="size-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Jika akun SIK Anda belum terdaftar atau mengalami kendala sinkronisasi hak akses CMC, silakan hubungi tim administrasi Biro Kepegawaian melalui kontak resmi berikut:
        </p>

        <div className="flex flex-col gap-2.5">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-900">Email Helpdesk CMC</div>
              <div className="text-slate-500 font-mono text-[11px]">layanan.cmc@dephub.go.id</div>
            </div>
            <button
              type="button"
              onClick={onCopyEmail}
              className="px-2.5 py-1 rounded bg-[#0a1e38] text-white font-semibold text-[11px] hover:bg-blue-900 transition-colors cursor-pointer"
            >
              {copiedEmail ? "Tersalin!" : "Salin Email"}
            </button>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-900">Biro Kepegawaian &amp; Organisasi</div>
              <div className="text-slate-500">Gedung Karsa Lt. 6 Kemenhub Pusat</div>
            </div>
            <span className="text-[11px] text-slate-600 font-medium">Ext. 1422 / 1425</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-900">Jam Layanan Konsultasi</div>
              <div className="text-slate-500">Senin – Jumat, 08.00 – 16.00 WIB</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Buka
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer mt-1"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
