"use client";

import { motion } from "framer-motion";

interface Step1DataSesiProps {
  jenisKegiatan: "coaching" | "mentoring";
  onJenisKegiatanChange: (val: "coaching" | "mentoring") => void;
  tipeSesi: "1-on-1" | "1-on-group";
  onTipeSesiChange: (val: "1-on-1" | "1-on-group") => void;
  topik: string;
  onTopikChange: (val: string) => void;
  tujuan: string;
  onTujuanChange: (val: string) => void;
}

export default function Step1DataSesi({
  jenisKegiatan,
  onJenisKegiatanChange,
  tipeSesi,
  onTipeSesiChange,
  topik,
  onTopikChange,
  tujuan,
  onTujuanChange,
}: Step1DataSesiProps) {
  return (
    <motion.div
      key="step-1"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="flex flex-col gap-4"
    >
      {/* 1. JENIS KEGIATAN (Figma Node 832:92) */}
      <div className="bg-white border border-[#e2e6eb] rounded-[10px] pb-5 shadow-2xs">
        <div className="border-b border-[#eef1f5] px-[22px] py-[15px] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-[15px] text-[#0f172a]">
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
            </div>
            <h2 className="font-bold text-[#0f172a] text-[13.5px] leading-[20.25px]">
              Jenis Kegiatan
            </h2>
          </div>
          <span className="text-[#64748b] text-[12px] leading-[18px]">
            Pilih satu
          </span>
        </div>

        {/* Selectable Options */}
        <div className="p-[22px] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Coaching Option */}
          <div
            role="radio"
            aria-checked={jenisKegiatan === "coaching"}
            tabIndex={0}
            onClick={() => onJenisKegiatanChange("coaching")}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") onJenisKegiatanChange("coaching");
            }}
            className={`p-4 rounded-[8px] flex items-start gap-3 transition-all cursor-pointer border ${
              jenisKegiatan === "coaching"
                ? "bg-[#f5f8fc] border-[#0a2540] ring-1 ring-[#0a2540]"
                : "bg-white border-[#e2e6eb] hover:border-slate-300"
            }`}
          >
            <div
              className={`size-9 rounded-[8px] flex items-center justify-center shrink-0 transition-colors ${
                jenisKegiatan === "coaching"
                  ? "bg-[#0a2540] text-white"
                  : "bg-[#f1f4f8] text-[#64748b]"
              }`}
            >
              <svg className="w-[17px] h-[17px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col">
              <span className="font-semibold text-[#0f172a] text-[13.5px] leading-[17.55px]">
                Coaching
              </span>
              <span className="text-[#64748b] text-[11.5px] leading-[16.68px] mt-1">
                Pembimbingan untuk peningkatan kinerja dan pemecahan masalah.
              </span>
            </div>
            <div className="pt-0.5 shrink-0">
              <div
                className={`size-[18px] rounded-full border flex items-center justify-center transition-colors ${
                  jenisKegiatan === "coaching"
                    ? "bg-[#0a2540] border-[#0a2540]"
                    : "border-[#e2e6eb]"
                }`}
              >
                {jenisKegiatan === "coaching" && (
                  <div className="size-2 rounded-full bg-white" />
                )}
              </div>
            </div>
          </div>

          {/* Mentoring Option */}
          <div
            role="radio"
            aria-checked={jenisKegiatan === "mentoring"}
            tabIndex={0}
            onClick={() => onJenisKegiatanChange("mentoring")}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") onJenisKegiatanChange("mentoring");
            }}
            className={`p-4 rounded-[8px] flex items-start gap-3 transition-all cursor-pointer border ${
              jenisKegiatan === "mentoring"
                ? "bg-[#f5f8fc] border-[#0a2540] ring-1 ring-[#0a2540]"
                : "bg-white border-[#e2e6eb] hover:border-slate-300"
            }`}
          >
            <div
              className={`size-9 rounded-[8px] flex items-center justify-center shrink-0 transition-colors ${
                jenisKegiatan === "mentoring"
                  ? "bg-[#0a2540] text-white"
                  : "bg-[#f1f4f8] text-[#64748b]"
              }`}
            >
              <svg className="w-[17px] h-[17px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col">
              <span className="font-semibold text-[#0f172a] text-[13.5px] leading-[17.55px]">
                Mentoring
              </span>
              <span className="text-[#64748b] text-[11.5px] leading-[16.68px] mt-1">
                Transfer pengetahuan dan pengalaman dari senior ke junior.
              </span>
            </div>
            <div className="pt-0.5 shrink-0">
              <div
                className={`size-[18px] rounded-full border flex items-center justify-center transition-colors ${
                  jenisKegiatan === "mentoring"
                    ? "bg-[#0a2540] border-[#0a2540]"
                    : "border-[#e2e6eb]"
                }`}
              >
                {jenisKegiatan === "mentoring" && (
                  <div className="size-2 rounded-full bg-white" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TIPE SESI (Figma Node 832:128) */}
      <div className="bg-white border border-[#e2e6eb] rounded-[10px] pb-5 shadow-2xs">
        <div className="border-b border-[#eef1f5] px-[22px] py-[15px] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-[15px] text-[#0f172a]">
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="font-bold text-[#0f172a] text-[13.5px] leading-[20.25px]">
              Tipe Sesi
            </h2>
          </div>
          <span className="text-[#64748b] text-[12px] leading-[18px]">
            Menentukan jumlah peserta
          </span>
        </div>

        {/* Selectable Options */}
        <div className="p-[22px] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* 1-on-1 Option */}
          <div
            role="radio"
            aria-checked={tipeSesi === "1-on-1"}
            tabIndex={0}
            onClick={() => onTipeSesiChange("1-on-1")}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") onTipeSesiChange("1-on-1");
            }}
            className={`p-4 rounded-[8px] flex items-start gap-3 transition-all cursor-pointer border ${
              tipeSesi === "1-on-1"
                ? "bg-[#f5f8fc] border-[#0a2540] ring-1 ring-[#0a2540]"
                : "bg-white border-[#e2e6eb] hover:border-slate-300"
            }`}
          >
            <div
              className={`size-9 rounded-[8px] flex items-center justify-center shrink-0 transition-colors ${
                tipeSesi === "1-on-1"
                  ? "bg-[#0a2540] text-white"
                  : "bg-[#f1f4f8] text-[#64748b]"
              }`}
            >
              <svg className="w-[17px] h-[17px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col">
              <span className="font-semibold text-[#0f172a] text-[13.5px] leading-[17.55px]">
                1-on-1
              </span>
              <span className="text-[#64748b] text-[11.5px] leading-[16.68px] mt-1">
                Satu pendamping dengan satu peserta.
              </span>
            </div>
            <div className="pt-0.5 shrink-0">
              <div
                className={`size-[18px] rounded-full border flex items-center justify-center transition-colors ${
                  tipeSesi === "1-on-1"
                    ? "bg-[#0a2540] border-[#0a2540]"
                    : "border-[#e2e6eb]"
                }`}
              >
                {tipeSesi === "1-on-1" && (
                  <div className="size-2 rounded-full bg-white" />
                )}
              </div>
            </div>
          </div>

          {/* 1-on-Group Option */}
          <div
            role="radio"
            aria-checked={tipeSesi === "1-on-group"}
            tabIndex={0}
            onClick={() => onTipeSesiChange("1-on-group")}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") onTipeSesiChange("1-on-group");
            }}
            className={`p-4 rounded-[8px] flex items-start gap-3 transition-all cursor-pointer border ${
              tipeSesi === "1-on-group"
                ? "bg-[#f5f8fc] border-[#0a2540] ring-1 ring-[#0a2540]"
                : "bg-white border-[#e2e6eb] hover:border-slate-300"
            }`}
          >
            <div
              className={`size-9 rounded-[8px] flex items-center justify-center shrink-0 transition-colors ${
                tipeSesi === "1-on-group"
                  ? "bg-[#0a2540] text-white"
                  : "bg-[#f1f4f8] text-[#64748b]"
              }`}
            >
              <svg className="w-[17px] h-[17px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col">
              <span className="font-semibold text-[#0f172a] text-[13.5px] leading-[17.55px]">
                1-on-Group
              </span>
              <span className="text-[#64748b] text-[11.5px] leading-[16.68px] mt-1">
                Satu pendamping dengan beberapa peserta.
              </span>
            </div>
            <div className="pt-0.5 shrink-0">
              <div
                className={`size-[18px] rounded-full border flex items-center justify-center transition-colors ${
                  tipeSesi === "1-on-group"
                    ? "bg-[#0a2540] border-[#0a2540]"
                    : "border-[#e2e6eb]"
                }`}
              >
                {tipeSesi === "1-on-group" && (
                  <div className="size-2 rounded-full bg-white" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TOPIK PENGEMBANGAN (Figma Node 832:164) */}
      <div className="bg-white border border-[#e2e6eb] rounded-[10px] shadow-2xs">
        <div className="border-b border-[#eef1f5] px-[22px] py-[15px] flex items-center gap-2.5">
          <div className="size-[15px] text-[#0f172a]">
            <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="font-bold text-[#0f172a] text-[13.5px] leading-[20.25px]">
            Topik Pengembangan
          </h2>
        </div>

        <div className="p-[22px] flex flex-col gap-4">
          {/* Topik Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1">
              <span>Topik / Area Pengembangan</span>
              <span className="text-[#b42318]">*</span>
            </label>
            <input
              type="text"
              value={topik}
              onChange={(e) => onTopikChange(e.target.value)}
              placeholder="Misal: Peningkatan kemampuan analisis kebijakan"
              maxLength={120}
              className="w-full px-3 py-2.5 rounded-[6px] border border-[#e2e6eb] text-[13.5px] text-slate-800 placeholder:text-[#94a3b8] focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] outline-none transition-colors"
            />
            <span className="text-[#94a3b8] text-[11.5px] leading-[17.25px]">
              Maks. 120 karakter. Bisa diperbarui saat mengisi pertemuan.
            </span>
          </div>

          {/* Tujuan Textarea */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1">
              <span>Tujuan Sesi</span>
              <span className="text-[#64748b] text-[11.5px] font-normal">(opsional)</span>
            </label>
            <textarea
              rows={3}
              value={tujuan}
              onChange={(e) => onTujuanChange(e.target.value)}
              placeholder="Apa yang ingin Anda capai dari sesi ini? Bisa dilengkapi nanti."
              className="w-full px-3 py-2.5 rounded-[6px] border border-[#e2e6eb] text-[13.5px] text-slate-800 placeholder:text-[#94a3b8] focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] outline-none transition-colors resize-none"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
