"use client";

interface CatatPertemuanSidebarProps {
  currentStep: 1 | 2 | 3;
}

export default function CatatPertemuanSidebar({ currentStep }: CatatPertemuanSidebarProps) {
  return (
    <aside className="w-full shrink-0 flex flex-col gap-4 sticky top-20">
      {/* Panduan Pengisian Card (Figma Node 840:461) */}
      <div className="bg-white border border-[#e2e6eb] rounded-[10px] pb-4 shadow-xs">
        <div className="border-b border-[#eef1f5] px-5 py-[15px] flex items-center gap-2.5">
          <div className="size-[15px] text-[#0f172a]">
            <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <h3 className="font-bold text-[#0f172a] text-[13.5px] leading-[20.25px]">
            Panduan Pengisian
          </h3>
        </div>

        {currentStep === 3 ? (
          /* Step 3 Sidebar Content (Figma Node 842:827) */
          <div className="px-5 pt-4 flex flex-col gap-3 text-[12.5px] text-[#334155] leading-[20px]">
            <p>
              Rencana tindak lanjut <strong className="font-bold text-[#0f172a]">wajib</strong>, minimal satu langkah konkret.
            </p>
            <p>
              Bukti dokumentasi &amp; action learning <strong className="font-bold text-[#0f172a]">opsional</strong> tapi disarankan.
            </p>
            <p>
              Setelah disimpan, JP <strong className="font-bold text-[#0f172a]">belum bertambah</strong>. JP dihitung setelah atasan verifikasi.
            </p>
          </div>
        ) : currentStep === 2 ? (
          /* Step 2 Sidebar Content (Figma Node 841:639) */
          <div className="px-5 pt-4 flex flex-col gap-3 text-[12.5px] text-[#334155] leading-[20px]">
            <p>
              Tuliskan <strong className="font-bold text-[#0f172a]">apa yang benar-benar terjadi</strong> selama pertemuan.
            </p>
            <p>
              Gunakan kalimat ringkas, fokus pada substansi.
            </p>
            <p>
              Draft tersimpan otomatis — Anda bisa lanjutkan kapan saja.
            </p>
          </div>
        ) : (
          /* Step 1 Sidebar Content (Figma Node 840:469) */
          <div className="px-5 pt-4 flex flex-col gap-3 text-[12.5px] text-[#334155] leading-[20px]">
            <p>
              Isi pertemuan <strong className="font-bold text-[#0f172a]">setelah sesi dilaksanakan</strong>, bukan sebagai janji.
            </p>
            <p>
              Semua field bertanda <span className="text-[#b42318] font-bold">*</span> wajib diisi.
            </p>
            <p>
              Draft tersimpan otomatis — Anda bisa lanjutkan kapan saja.
            </p>
            <p>
              Setelah disimpan, JP <strong className="font-bold text-[#0f172a]">belum bertambah</strong>. JP dihitung setelah Atasan Langsung memverifikasi hasil sesi.
            </p>
          </div>
        )}
      </div>

      {/* Quick Sesi Summary Card */}
      <div className="bg-[#f8fafc] border border-[#e2e6eb] rounded-[10px] p-4 flex flex-col gap-2.5 text-xs text-[#64748b]">
        <span className="font-bold text-slate-800 uppercase tracking-wider text-[10.5px]">
          Informasi Sesi Terkait
        </span>
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-slate-900 text-[12.5px]">
            Penguatan Kepemimpinan Pelayanan Publik
          </span>
          <span>Coach: Rudi Santoso, M.M.</span>
          <span>Atasan: Dr. Budi Hartono, M.Si.</span>
          <span className="font-medium text-[#1e5fa8] pt-1">
            Klaim: 2 JP / pertemuan
          </span>
        </div>
      </div>
    </aside>
  );
}
