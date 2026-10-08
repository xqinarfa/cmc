"use client";

import { CertificateItem, USER_RECIPIENT } from "@/lib/certificateData";
import { ASSETS } from "@/lib/assets";

interface CertificateDocumentProps {
  cert: CertificateItem;
}

export default function CertificateDocument({ cert }: CertificateDocumentProps) {
  return (
    <div
      id="printable-certificate"
      className="w-full max-w-[780px] bg-white rounded-xl shadow-lg border-[3px] border-[#0a2540]/30 p-6 sm:p-10 md:p-12 relative overflow-hidden text-center text-slate-900"
      style={{
        backgroundImage: "radial-gradient(#0a2540 0.4px, transparent 0.4px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Guilloche Inner Border */}
      <div className="absolute inset-2 border-2 border-[#b45309]/40 rounded-lg pointer-events-none" />
      <div className="absolute inset-3 border border-dashed border-[#0a2540]/25 rounded-md pointer-events-none" />

      {/* Watermark Emblem */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/febee0dc3de182eb1dae3bdcc158fb031a384cb9.svg"
          alt=""
          className="w-[380px] h-[380px] object-contain"
        />
      </div>

      {/* Header Logos & Titles */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center justify-center gap-4 mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.bpsdmpLogo}
            alt="BPSDMP Logo"
            className="h-10 sm:h-12 w-auto object-contain"
          />
          <div className="w-px h-8 bg-slate-300" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.corpuLogo}
            alt="Kemenhub Corpu"
            className="h-9 sm:h-11 w-auto object-contain"
          />
        </div>

        <span className="text-[10px] sm:text-[11.5px] font-black uppercase tracking-[2px] text-[#0a2540]">
          Kementerian Perhubungan Republik Indonesia
        </span>
        <span className="text-[9.5px] sm:text-[11px] font-bold uppercase tracking-[1px] text-slate-600 mt-0.5">
          Badan Pengembangan Sumber Daya Manusia Perhubungan
        </span>
        <span className="text-[8.5px] sm:text-[9.5px] font-medium uppercase tracking-[0.5px] text-slate-500">
          Pusat Pengembangan SDM Aparatur Perhubungan
        </span>

        <div className="w-24 sm:w-36 h-[2px] bg-gradient-to-r from-transparent via-[#b45309] to-transparent my-4" />

        <span className="text-[11px] sm:text-[12px] font-bold tracking-[2.5px] uppercase text-[#b45309]">
          Sertifikat Pengembangan Kompetensi
        </span>
        <span className="font-mono text-[10.5px] text-slate-500 font-semibold mt-0.5">
          Nomor: {cert.certNumber}
        </span>

        <p className="text-[11px] sm:text-[12px] text-slate-500 uppercase tracking-widest mt-6 font-medium">
          Diberikan Secara Sah Kepada:
        </p>

        <h2 className="font-extrabold text-[20px] sm:text-[26px] text-[#0a2540] tracking-tight mt-1.5 font-serif">
          {USER_RECIPIENT.name}
        </h2>
        <div className="text-[11px] sm:text-[12px] text-slate-600 font-mono mt-0.5">
          NIP: {USER_RECIPIENT.nip} · {USER_RECIPIENT.rank}
        </div>
        <div className="text-[10.5px] sm:text-[11.5px] text-slate-500 mt-0.5 max-w-md">
          {USER_RECIPIENT.position} — {USER_RECIPIENT.workUnit}
        </div>

        <p className="text-[11.5px] sm:text-[13px] text-slate-700 leading-relaxed max-w-xl mt-5 px-4 font-normal">
          Atas komitmen dan keberhasilan dalam menyelesaikan seluruh tahapan
          pembelajaran <strong>{cert.title}</strong> melalui Coaching and
          Mentoring Center (CMC) dengan bobot pengakuan kompetensi sebesar:
        </p>

        <div className="my-4 px-5 py-2 rounded-xl bg-gradient-to-r from-[#0a2540] to-[#13396b] text-white shadow-md inline-flex items-center gap-2">
          <span className="text-[18px] sm:text-[22px] font-black">
            {cert.jp}
          </span>
          <span className="text-xs sm:text-sm font-bold tracking-wider">
            JAM PELAJARAN (JP)
          </span>
        </div>

        <p className="text-[10.5px] sm:text-[11px] text-slate-500 max-w-lg italic">
          &quot;Tercatat pada Sistem Informasi ASN (SIASN BKN) sebagai pemenuhan
          target pengembangan kompetensi tahunan.&quot;
        </p>

        {/* Signees & Official Seal */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-5 border-t border-slate-200/80 items-end text-left">
          {/* Left: QR Code */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5">
            <div className="size-20 p-1.5 bg-white border border-slate-300 rounded-lg shadow-2xs flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="size-full">
                <rect width="100" height="100" fill="white" />
                <rect x="10" y="10" width="25" height="25" fill="#0a2540" />
                <rect x="15" y="15" width="15" height="15" fill="white" />
                <rect x="18" y="18" width="9" height="9" fill="#0a2540" />
                <rect x="65" y="10" width="25" height="25" fill="#0a2540" />
                <rect x="70" y="15" width="15" height="15" fill="white" />
                <rect x="73" y="18" width="9" height="9" fill="#0a2540" />
                <rect x="10" y="65" width="25" height="25" fill="#0a2540" />
                <rect x="15" y="70" width="15" height="15" fill="white" />
                <rect x="18" y="73" width="9" height="9" fill="#0a2540" />
                <rect x="42" y="15" width="8" height="8" fill="#0a2540" />
                <rect x="52" y="25" width="8" height="8" fill="#0a2540" />
                <rect x="45" y="45" width="12" height="12" fill="#0a2540" />
                <rect x="65" y="55" width="8" height="8" fill="#0a2540" />
                <rect x="75" y="45" width="8" height="8" fill="#0a2540" />
                <rect x="75" y="65" width="15" height="15" fill="#0a2540" />
                <rect x="45" y="75" width="8" height="8" fill="#0a2540" />
              </svg>
            </div>
            <span className="text-[9.5px] font-mono text-slate-500">
              Scan verifikasi keaslian di cmc.dephub.go.id
            </span>
          </div>

          {/* Center: BSrE Seal */}
          <div className="flex flex-col items-center text-center py-2">
            <div className="size-14 rounded-full border-2 border-emerald-600 bg-emerald-50 text-emerald-800 flex flex-col items-center justify-center p-1 shadow-xs">
              <span className="text-[8px] font-extrabold tracking-wider uppercase">
                BSrE
              </span>
              <span className="text-[14px]">🛡️</span>
            </div>
            <span className="text-[9.5px] font-bold text-slate-700 mt-1">
              Sertifikat Elektronik BSrE
            </span>
            <span className="text-[8.5px] text-slate-500">
              BSSN RI Tersertifikasi
            </span>
          </div>

          {/* Right: Pejabat Penandatangan */}
          <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
            <span className="text-[10px] text-slate-500">
              Jakarta, {cert.issueDate}
            </span>
            <span className="text-[10.5px] font-bold text-slate-800 mt-0.5">
              {cert.signee.title}
            </span>
            <span className="text-[9.5px] text-slate-500 mb-6">
              {cert.signee.agency}
            </span>

            <div className="flex flex-col items-center sm:items-end">
              <strong className="text-[11.5px] font-extrabold text-[#0a2540] underline decoration-slate-400">
                {cert.signee.name}
              </strong>
              <span className="text-[10px] text-slate-600 font-mono">
                NIP. {cert.signee.nip}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
