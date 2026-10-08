"use client";

import { motion } from "framer-motion";

interface Step2PembahasanProps {
  identifikasiKebutuhan: string;
  onIdentifikasiKebutuhanChange: (val: string) => void;
  areaPengembangan: string;
  onAreaPengembanganChange: (val: string) => void;
  pembahasan: string;
  onPembahasanChange: (val: string) => void;
  umpanBalikCoach: string;
  onUmpanBalikCoachChange: (val: string) => void;
  kesepakatanSolusi: string;
  onKesepakatanSolusiChange: (val: string) => void;
}

export default function Step2Pembahasan({
  identifikasiKebutuhan,
  onIdentifikasiKebutuhanChange,
  areaPengembangan,
  onAreaPengembanganChange,
  pembahasan,
  onPembahasanChange,
  umpanBalikCoach,
  onUmpanBalikCoachChange,
  kesepakatanSolusi,
  onKesepakatanSolusiChange,
}: Step2PembahasanProps) {
  return (
    <motion.div
      key="step-2"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="flex flex-col gap-[15px]"
    >
      {/* Field 1: Identifikasi Kebutuhan / Permasalahan * (Figma Node 841:577) */}
      <div className="flex flex-col gap-[6px] pb-[5px]">
        <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1">
          <span>Identifikasi Kebutuhan / Permasalahan</span>
          <span className="text-[#b42318]">*</span>
        </label>
        <textarea
          rows={3}
          required
          value={identifikasiKebutuhan}
          onChange={(e) => onIdentifikasiKebutuhanChange(e.target.value)}
          placeholder="Apa masalah atau kebutuhan yang dihadapi? Bagaimana dampaknya terhadap pekerjaan?"
          className="w-full min-h-[96px] px-3 py-2.5 bg-white rounded-[6px] border border-[#e2e6eb] text-[13.5px] text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] outline-none transition-colors resize-none leading-relaxed"
        />
      </div>

      {/* Field 2: Area Pengembangan / Hubungan Tanggung Jawab Pekerjaan (Figma Node 841:584) */}
      <div className="flex flex-col gap-[6px] pb-[5px]">
        <label className="text-[12.5px] font-semibold text-[#334155]">
          Area Pengembangan / Hubungan Tanggung Jawab Pekerjaan
        </label>
        <textarea
          rows={3}
          value={areaPengembangan}
          onChange={(e) => onAreaPengembanganChange(e.target.value)}
          placeholder="Bagian mana dari pekerjaan Anda yang perlu dikembangkan? (opsional)"
          className="w-full min-h-[96px] px-3 py-2.5 bg-white rounded-[6px] border border-[#e2e6eb] text-[13.5px] text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] outline-none transition-colors resize-none leading-relaxed"
        />
      </div>

      {/* Field 3: Pembahasan * (Figma Node 841:590) */}
      <div className="flex flex-col gap-[6px] pb-[5px] pt-px">
        <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1">
          <span>Pembahasan</span>
          <span className="text-[#b42318]">*</span>
        </label>
        <textarea
          rows={3}
          required
          value={pembahasan}
          onChange={(e) => onPembahasanChange(e.target.value)}
          placeholder="Ringkasan diskusi yang terjadi selama pertemuan."
          className="w-full min-h-[96px] px-3 py-2.5 bg-white rounded-[6px] border border-[#e2e6eb] text-[13.5px] text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] outline-none transition-colors resize-none leading-relaxed"
        />
      </div>

      {/* Field 4: Umpan Balik (Feedback) dari Coach * (Figma Node 841:597) */}
      <div className="flex flex-col gap-[6px] pb-[5px] pt-px">
        <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1">
          <span>Umpan Balik (Feedback) dari Coach</span>
          <span className="text-[#b42318]">*</span>
        </label>
        <textarea
          rows={3}
          required
          value={umpanBalikCoach}
          onChange={(e) => onUmpanBalikCoachChange(e.target.value)}
          placeholder="Saran, pandangan, atau insight yang diberikan Coach/Mentor."
          className="w-full min-h-[96px] px-3 py-2.5 bg-white rounded-[6px] border border-[#e2e6eb] text-[13.5px] text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] outline-none transition-colors resize-none leading-relaxed"
        />
      </div>

      {/* Field 5: Kesepakatan Solusi / Kesimpulan * (Figma Node 841:604) */}
      <div className="flex flex-col gap-[6px] pb-[5px] pt-px">
        <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1">
          <span>Kesepakatan Solusi / Kesimpulan</span>
          <span className="text-[#b42318]">*</span>
        </label>
        <textarea
          rows={3}
          required
          value={kesepakatanSolusi}
          onChange={(e) => onKesepakatanSolusiChange(e.target.value)}
          placeholder="Kesepakatan atau solusi yang disepakati bersama."
          className="w-full min-h-[96px] px-3 py-2.5 bg-white rounded-[6px] border border-[#e2e6eb] text-[13.5px] text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] outline-none transition-colors resize-none leading-relaxed"
        />
      </div>
    </motion.div>
  );
}
