"use client";

import React from "react";

interface LoginPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginPrivacyModal({ isOpen, onClose }: LoginPrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-[500px] bg-white rounded-xl shadow-2xl border border-slate-200 p-6 sm:p-7 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 id="privacy-title" className="text-base font-bold text-slate-900">
            Kebijakan Privasi &amp; Kerahasiaan Data ASN
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup kebijakan privasi"
            className="size-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="text-xs text-slate-600 leading-relaxed flex flex-col gap-2.5 max-h-[300px] overflow-y-auto pr-1">
          <p>
            Platform Coaching, Mentoring, dan Konseling (CMC) Kementerian Perhubungan berkomitmen penuh melindungi kerahasiaan data pribadi serta catatan pengembangan kompetensi setiap Aparatur Sipil Negara (ASN) sesuai UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi.
          </p>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800">
            <strong className="block font-bold pb-1 text-slate-900">Kerahasiaan Sesi Konseling:</strong>
            Seluruh catatan dan hasil sesi konseling bersifat konfidensial antara konselor psikolog dan pegawai, dilindungi oleh kode etik profesi psikologi.
          </div>
          <p>
            Data NIP, riwayat coaching, dan jam pembelajaran (JP) hanya digunakan untuk sinkronisasi ke Sistem Informasi Kepegawaian (SIK) dan SIASN BKN demi pemenuhan hak pengembangan kompetensi minimal 20 JP per tahun sesuai UU ASN No. 20/2023.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-lg bg-[#0a1e38] hover:bg-[#142d54] text-white text-xs font-bold transition-colors cursor-pointer mt-1"
        >
          Saya Mengerti
        </button>
      </div>
    </div>
  );
}
