"use client";

interface SesiBaruSidebarProps {
  currentStep: 1 | 2 | 3;
}

export default function SesiBaruSidebar({ currentStep }: SesiBaruSidebarProps) {
  return (
    <aside className="flex flex-col gap-4 sticky top-20">
      {/* 1. KETENTUAN JP (Figma Node 832:203) */}
      <div className="bg-white border border-[#e2e6eb] rounded-[10px] pb-4 shadow-2xs">
        <div className="border-b border-[#eef1f5] px-[22px] py-[15px] flex items-center gap-2.5">
          <div className="size-[15px] text-[#0f172a]">
            <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <h3 className="font-bold text-[#0f172a] text-[13.5px] leading-[20.25px]">
            Ketentuan JP
          </h3>
        </div>

        <div className="px-[22px] pt-4 flex flex-col gap-3 text-[12.5px] text-[#334155]">
          <div className="flex items-start gap-2.5">
            <span className="size-[5px] rounded-full bg-[#1e5fa8] mt-2 shrink-0" />
            <p className="leading-[19.38px]">
              1 pertemuan = <strong className="font-semibold text-[#0f172a]">2 JP</strong> (jalur nasional).
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="size-[5px] rounded-full bg-[#1e5fa8] mt-2 shrink-0" />
            <p className="leading-[19.38px]">
              Maks. <strong className="font-semibold text-[#0f172a]">2 pertemuan</strong> dapat diklaim per bulan per jenis kegiatan.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="size-[5px] rounded-full bg-[#1e5fa8] mt-2 shrink-0" />
            <p className="leading-[19.38px]">
              JP dihitung otomatis setelah Atasan Langsung memverifikasi.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="size-[5px] rounded-full bg-[#1e5fa8] mt-2 shrink-0" />
            <p className="leading-[19.38px]">
              Target tahunan: <strong className="font-semibold text-[#0f172a]">20 JP</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 2. ALUR SESI (Figma Node 832:234) */}
      <div className="bg-white border border-[#e2e6eb] rounded-[10px] pb-4 shadow-2xs">
        <div className="border-b border-[#eef1f5] px-[22px] py-[15px] flex items-center gap-2.5">
          <div className="size-[15px] text-[#0f172a]">
            <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3 className="font-bold text-[#0f172a] text-[13.5px] leading-[20.25px]">
            Alur Sesi
          </h3>
        </div>

        <div className="px-[22px] pt-4 flex flex-col gap-3.5">
          {/* Step Item 1 */}
          <div className="flex items-start gap-3">
            <div
              className={`size-[22px] rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-colors ${
                currentStep < 3
                  ? "bg-[#0a2540] text-white"
                  : "bg-[#f1f4f8] text-[#64748b]"
              }`}
            >
              1
            </div>
            <span
              className={`text-[12.5px] leading-[18.75px] transition-colors ${
                currentStep < 3
                  ? "font-medium text-[#0f172a]"
                  : "text-[#334155]"
              }`}
            >
              Isi data sesi &amp; pilih pendamping
            </span>
          </div>

          {/* Step Item 2 */}
          <div className="flex items-start gap-3">
            <div
              className={`size-[22px] rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-colors ${
                currentStep === 3
                  ? "bg-[#0a2540] text-white"
                  : "bg-[#f1f4f8] text-[#64748b]"
              }`}
            >
              2
            </div>
            <span
              className={`text-[12.5px] leading-[18.75px] transition-colors ${
                currentStep === 3
                  ? "font-medium text-[#0f172a]"
                  : "text-[#334155]"
              }`}
            >
              Coach konfirmasi via token pairing
            </span>
          </div>

          {/* Step Item 3 */}
          <div className="flex items-start gap-3">
            <div className="size-[22px] rounded-full bg-[#f1f4f8] text-[#64748b] flex items-center justify-center text-[11px] font-bold shrink-0">
              3
            </div>
            <span className="text-[12.5px] text-[#334155] leading-[18.75px]">
              Catat setiap pertemuan yang dilaksanakan
            </span>
          </div>

          {/* Step Item 4 */}
          <div className="flex items-start gap-3">
            <div className="size-[22px] rounded-full bg-[#f1f4f8] text-[#64748b] flex items-center justify-center text-[11px] font-bold shrink-0">
              4
            </div>
            <span className="text-[12.5px] text-[#334155] leading-[18.75px]">
              Atasan verifikasi hasil &amp; JP tercatat
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
