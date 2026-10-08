"use client";

interface SertifikatMetricsProps {
  totalCertificates: number;
  totalJp: number;
  onRunSampleVerification: () => void;
}

export default function SertifikatMetrics({
  totalCertificates,
  totalJp,
  onRunSampleVerification,
}: SertifikatMetricsProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* 
        ----------------------------------------------------------------------
        EXECUTIVE METRICS CARDS (4-Column Bento Grid - Clean & Grounded)
        ----------------------------------------------------------------------
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Dokumen Sertifikat */}
        <div className="bg-white border border-[#e2e6eb] hover:border-slate-300 transition-colors rounded-[14px] p-5 shadow-[0px_6px_16px_rgba(0,0,0,0.03)] flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Sertifikat Diterbitkan
            </span>
            <div className="flex items-baseline gap-1.5 mt-1.5">
              <span className="text-[28px] font-extrabold text-[#0f172a] leading-none tracking-tight">
                {totalCertificates}
              </span>
              <span className="text-[12px] font-semibold text-slate-500">Dokumen</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1">1 Kumulatif + 5 Sesi Selesai</span>
          </div>
          <div className="size-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center shrink-0">
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>

        {/* Metric 2: Total Akumulasi JP */}
        <div className="bg-white border border-[#e2e6eb] hover:border-slate-300 transition-colors rounded-[14px] p-5 shadow-[0px_6px_16px_rgba(0,0,0,0.03)] flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Jam Pelajaran (JP) Sah
            </span>
            <div className="flex items-baseline gap-1.5 mt-1.5">
              <span className="text-[28px] font-extrabold text-[#0f172a] leading-none tracking-tight">
                {totalJp}
              </span>
              <span className="text-[12px] font-semibold text-slate-500">/ 20 JP</span>
            </div>
            <span className="text-[11px] font-medium text-emerald-700 mt-1">
              70% Target Pengembangan Terpenuhi
            </span>
          </div>
          <div className="size-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Metric 3: Keabsahan BSrE BSSN */}
        <div className="bg-white border border-[#e2e6eb] hover:border-slate-300 transition-colors rounded-[14px] p-5 shadow-[0px_6px_16px_rgba(0,0,0,0.03)] flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Integritas Kriptografi
            </span>
            <div className="flex items-baseline gap-1.5 mt-1.5">
              <span className="text-[28px] font-extrabold text-emerald-700 leading-none tracking-tight">
                100%
              </span>
              <span className="text-[12px] font-bold text-emerald-700">BSrE</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1">Tanda Tangan Elektronik Sah UU ITE</span>
          </div>
          <div className="size-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center shrink-0">
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
        </div>

        {/* Metric 4: BKN SIASN Sync */}
        <div className="bg-white border border-[#e2e6eb] hover:border-slate-300 transition-colors rounded-[14px] p-5 shadow-[0px_6px_16px_rgba(0,0,0,0.03)] flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Sinkronisasi BKN SIASN
            </span>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span className="text-[18px] font-extrabold text-[#0f172a] leading-tight">
                Tersinkron
              </span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1.5">Terhubung otomatis ke SKP 2024</span>
          </div>
          <div className="size-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center shrink-0">
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 
        ----------------------------------------------------------------------
        INSTITUTIONAL ASSURANCE CALLOUT BAR
        ----------------------------------------------------------------------
      */}
      <div className="bg-gradient-to-r from-blue-50/70 via-slate-50 to-blue-50/50 border border-blue-200/70 rounded-[12px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-[#0a2244] text-white flex items-center justify-center shrink-0 font-bold text-[11px] tracking-wider shadow-2xs">
            CMC
          </div>
          <div>
            <span className="font-bold text-[#0a2244] block">
              Jaminan Autentisitas Dokumen Digital BPSDMP Kemenhub
            </span>
            <span className="text-slate-600 text-[11.5px]">
              Sertifikat dilengkapi QR Code verifikasi publik &amp; Tanda Tangan Elektronik Balai Sertifikasi Elektronik (BSrE) - BSSN.
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onRunSampleVerification}
          className="text-blue-700 hover:text-blue-800 font-bold inline-flex items-center gap-1.5 shrink-0 hover:underline cursor-pointer group"
        >
          <span>Uji Validitas Contoh</span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>
    </div>
  );
}
