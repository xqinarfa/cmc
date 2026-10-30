"use client";

import { motion } from "framer-motion";

interface Step1DataDanTujuanProps {
  tanggal: string;
  onTanggalChange: (val: string) => void;
  waktu: string;
  onWaktuChange: (val: string) => void;
  moda: "Luring" | "Daring" | "Hybrid";
  onModaChange: (val: "Luring" | "Daring" | "Hybrid") => void;
  lokasi: string;
  onLokasiChange: (val: string) => void;
  pertemuanKe: number;
  tujuan: string;
  onTujuanChange: (val: string) => void;
}

export default function Step1DataDanTujuan({
  tanggal,
  onTanggalChange,
  waktu,
  onWaktuChange,
  moda,
  onModaChange,
  lokasi,
  onLokasiChange,
  pertemuanKe,
  tujuan,
  onTujuanChange,
}: Step1DataDanTujuanProps) {
  return (
    <motion.div
      key="step-1"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="flex flex-col gap-4"
    >
      {/* Grid: Tanggal & Waktu (Figma Node 840:371) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Tanggal Pertemuan */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1">
            <span>Tanggal Pertemuan</span>
            <span className="text-[#b42318]">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              required
              value={tanggal}
              onChange={(e) => onTanggalChange(e.target.value)}
              className="w-full h-[40px] px-3 py-2 bg-white rounded-[6px] border border-[#e2e6eb] text-[13.5px] text-[#0f172a] focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] outline-none transition-colors"
            />
          </div>
        </div>

        {/* Waktu */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1">
            <span>Waktu</span>
            <span className="text-[#b42318]">*</span>
          </label>
          <div className="relative">
            <input
              type="time"
              required
              value={waktu}
              onChange={(e) => onWaktuChange(e.target.value)}
              className="w-full h-[40px] px-3 py-2 bg-white rounded-[6px] border border-[#e2e6eb] text-[13.5px] text-[#0f172a] focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Moda Pelaksanaan (Figma Node 840:408) */}
      <div className="flex flex-col gap-1.5 pt-1">
        <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1">
          <span>Moda Pelaksanaan</span>
          <span className="text-[#b42318]">*</span>
        </label>
        <div className="flex items-center gap-2 flex-wrap">
          {(["Luring", "Daring", "Hybrid"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => onModaChange(mode)}
              className={`h-[38px] px-4 rounded-[8px] text-[13px] font-medium transition-all cursor-pointer ${
                moda === mode
                  ? "bg-[#f5f8fc] border border-[#0a2540] text-[#0a2540] font-semibold shadow-2xs"
                  : "bg-white border border-[#e2e6eb] hover:bg-slate-50 text-[#334155]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Tempat / Lokasi (Figma Node 840:419) */}
      <div className="flex flex-col gap-1.5 pt-1">
        <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1">
          <span>Tempat / Lokasi</span>
          <span className="text-[#64748b] text-[11.5px] font-normal">(opsional)</span>
        </label>
        <input
          type="text"
          value={lokasi}
          onChange={(e) => onLokasiChange(e.target.value)}
          placeholder="Misal: Ruang Rapat A, Lantai 3 · atau link Zoom"
          className="w-full h-[40px] px-3 py-2 bg-white rounded-[6px] border border-[#e2e6eb] text-[13.5px] text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] outline-none transition-colors"
        />
      </div>

      {/* Pertemuan ke- (Figma Node 840:426) */}
      <div className="flex flex-col gap-1.5 pt-1">
        <label className="text-[12.5px] font-semibold text-[#334155]">
          Pertemuan ke-
        </label>
        <div className="w-full h-[40px] px-3 py-2 bg-[#f7f9fb] rounded-[6px] border border-[#e2e6eb] text-[13.5px] text-[#64748b] flex items-center font-medium">
          {pertemuanKe}
        </div>
        <span className="text-[#94a3b8] text-[11.5px] leading-[17.25px]">
          Terisi otomatis dari urutan pertemuan.
        </span>
      </div>

      {/* Tujuan Pertemuan (Figma Node 840:434) */}
      <div className="flex flex-col gap-1.5 pt-1">
        <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1">
          <span>Tujuan Pertemuan</span>
          <span className="text-[#b42318]">*</span>
        </label>
        <textarea
          rows={3}
          required
          value={tujuan}
          onChange={(e) => onTujuanChange(e.target.value)}
          placeholder="Apa yang ingin dicapai dari pertemuan ini?"
          className="w-full px-3 py-2.5 bg-white rounded-[6px] border border-[#e2e6eb] text-[13.5px] text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] outline-none transition-colors resize-none leading-relaxed"
        />
        <span className="text-[#94a3b8] text-[11.5px] leading-[17.25px]">
          Ringkas, 1–2 kalimat. Contoh: &quot;Membahas solusi dari masalah yang diidentifikasi pada pertemuan sebelumnya.&quot;
        </span>
      </div>
    </motion.div>
  );
}
