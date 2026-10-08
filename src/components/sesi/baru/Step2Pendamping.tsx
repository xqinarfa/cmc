"use client";

import { motion } from "framer-motion";

interface Step2PendampingProps {
  selectedCoach: string;
  onSelectCoach: (coach: string) => void;
  onOpenCoachModal: () => void;
  atasanLangsung: string;
  jabatanAtasan: string;
}

export default function Step2Pendamping({
  selectedCoach,
  onSelectCoach,
  onOpenCoachModal,
  atasanLangsung,
  jabatanAtasan,
}: Step2PendampingProps) {
  return (
    <motion.div
      key="step-2"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="flex flex-col gap-4"
    >
      {/* 1. DATA DIRI (Figma Node 832:798) */}
      <div className="bg-white border border-[#e2e6eb] rounded-[10px] shadow-2xs">
        <div className="border-b border-[#eef1f5] px-[22px] py-[15.5px] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-[15px] text-[#0f172a]">
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="font-bold text-[#0f172a] text-[13.5px] leading-[20.25px]">
              Data Diri
            </h2>
          </div>
          <span className="text-[#64748b] text-[12px] leading-[18px]">
            Dari SIK
          </span>
        </div>

        <div className="p-[22px] flex flex-col gap-[15px]">
          {/* Nama */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-[#334155] leading-[18.75px]">
              Nama
            </label>
            <div className="bg-[#f7f9fb] border border-[#eef1f5] rounded-[6px] px-[12px] py-[9px] flex items-center justify-between gap-2.5">
              <span className="text-[13.5px] text-[#334155] font-normal leading-[20.25px]">
                Andi Pratama, S.Sos.
              </span>
              <span className="bg-white border border-[#e2e6eb] rounded-[4px] px-[7px] py-[2px] text-[#64748b] text-[10.5px] font-semibold leading-[15.75px] shrink-0">
                dari SIK
              </span>
            </div>
          </div>

          {/* NIP */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-[#334155] leading-[18.75px]">
              NIP
            </label>
            <div className="bg-[#f7f9fb] border border-[#eef1f5] rounded-[6px] px-[12px] py-[9px] flex items-center justify-between gap-2.5">
              <span className="text-[13.5px] text-[#334155] font-normal leading-[20.25px]">
                19750101 200012 1 001
              </span>
              <span className="bg-white border border-[#e2e6eb] rounded-[4px] px-[7px] py-[2px] text-[#64748b] text-[10.5px] font-semibold leading-[15.75px] shrink-0">
                dari SIK
              </span>
            </div>
          </div>

          {/* Jabatan & Unit Kerja */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-[#334155] leading-[18.75px]">
              Jabatan &amp; Unit Kerja
            </label>
            <div className="bg-[#f7f9fb] border border-[#eef1f5] rounded-[6px] px-[12px] py-[9px] flex items-center">
              <span className="text-[13.5px] text-[#334155] font-normal leading-[20.25px]">
                Analis SDM Aparatur · Sekretariat Badan Kebijakan Transportasi
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PENDAMPING (Figma Node 832:830) */}
      <div className="bg-white border border-[#e2e6eb] rounded-[10px] shadow-2xs">
        <div className="border-b border-[#eef1f5] px-[22px] py-[15.5px] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-[15px] text-[#0f172a]">
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h2 className="font-bold text-[#0f172a] text-[13.5px] leading-[20.25px]">
              Pendamping
            </h2>
          </div>
          <span className="text-[#64748b] text-[12px] leading-[18px]">
            Wajib
          </span>
        </div>

        <div className="p-[22px] py-[20px] flex flex-col gap-[16px]">
          {/* Coach Selection */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1 leading-[18.75px]">
              <span>Coach</span>
              <span className="text-[#b42318]">*</span>
            </label>

            {selectedCoach ? (
              <div className="bg-[#f7f9fb] border border-[#e2e6eb] rounded-[8px] p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-8 rounded-full bg-[#0a2540] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {selectedCoach.charAt(0)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-[13px] text-[#0f172a] truncate">
                      {selectedCoach}
                    </span>
                    <span className="text-[11.5px] text-[#64748b] truncate">
                      Widyaiswara Ahli / Coach Terakreditasi BPSDM
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={onOpenCoachModal}
                    className="px-2.5 py-1 text-xs font-semibold text-blue-700 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                  >
                    Ganti Coach
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectCoach("")}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors cursor-pointer"
                    title="Hapus pilihan"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenCoachModal}
                className="w-full h-[36px] bg-white border border-[#e2e6eb] hover:bg-slate-50 rounded-[8px] flex items-center justify-center gap-[6px] text-[13px] font-medium text-[#334155] transition-colors cursor-pointer shadow-2xs"
              >
                <svg className="size-[12px] text-[#334155]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="leading-[19.5px]">Cari Coach atau Mentor</span>
              </button>
            )}
            <span className="text-[#94a3b8] text-[11.5px] leading-[17.25px]">
              Sistem merekomendasikan atasan langsung Anda sesuai struktur jabatan di SIK.
            </span>
          </div>

          {/* Atasan Langsung sebagai Verifikator */}
          <div className="flex flex-col gap-[5px]">
            <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1 leading-[18.75px]">
              <span>Atasan Langsung sebagai Verifikator</span>
              <span className="text-[#b42318]">*</span>
            </label>
            <div className="bg-[#f7f9fb] border border-[#eef1f5] rounded-[6px] pb-[9px] pt-[10px] px-[12px] flex items-center justify-between gap-[10px]">
              <div className="flex items-center gap-[10px] min-w-0">
                <div
                  className="overflow-clip relative rounded-[14px] shrink-0 size-[28px]"
                  style={{
                    backgroundImage: "linear-gradient(135deg, rgb(148, 163, 184) 0%, rgb(71, 85, 105) 100%)",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2.4544 0 0 2.4544 14 7.84)'><stop stop-color='rgba(254,202,202,1)' offset='0'/><stop stop-color='rgba(254,202,202,0)' offset='0.34'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2.2302 0 0 2.2302 14 17.36)'><stop stop-color='rgba(51,65,85,1)' offset='0'/><stop stop-color='rgba(51,65,85,0)' offset='0.44'/></radialGradient></defs></svg>\")",
                    }}
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-[#0f172a] text-[13.5px] leading-[20.25px] truncate">
                    {atasanLangsung}
                  </span>
                  <span className="text-[#64748b] text-[11.5px] leading-[17.25px] truncate">
                    {jabatanAtasan}
                  </span>
                </div>
              </div>
              <span className="bg-white border border-[#e2e6eb] rounded-[4px] px-[7px] py-[2px] text-[#64748b] text-[10.5px] font-semibold leading-[15.75px] shrink-0">
                dari SIK
              </span>
            </div>
            <span className="text-[#94a3b8] text-[11.5px] leading-[17.25px]">
              Atasan Langsung menerima notifikasi &quot;Mengetahui&quot; dan memverifikasi hasil akhir sesi.
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
