"use client";

import { motion } from "framer-motion";

interface Step3TindakLanjutProps {
  rencanaTindakLanjut: string;
  onRencanaTindakLanjutChange: (val: string) => void;
  targetWaktu: string;
  onTargetWaktuChange: (val: string) => void;
  actionLearningFiles: string[];
  onAddActionLearningFile: (fileName: string) => void;
  onRemoveActionLearningFile: (index: number) => void;
  buktiFotoFiles: string[];
  onAddBuktiFotoFiles: (fileNames: string[]) => void;
  onRemoveBuktiFotoFile: (index: number) => void;
  pernyataanSetuju: boolean;
  onPernyataanSetujuChange: (val: boolean) => void;
}

export default function Step3TindakLanjut({
  rencanaTindakLanjut,
  onRencanaTindakLanjutChange,
  targetWaktu,
  onTargetWaktuChange,
  actionLearningFiles,
  onAddActionLearningFile,
  onRemoveActionLearningFile,
  buktiFotoFiles,
  onAddBuktiFotoFiles,
  onRemoveBuktiFotoFile,
  pernyataanSetuju,
  onPernyataanSetujuChange,
}: Step3TindakLanjutProps) {
  return (
    <motion.div
      key="step-3"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="flex flex-col gap-[15px]"
    >
      {/* Field 1: Rencana Tindak Lanjut * (Figma Node 842:743) */}
      <div className="flex flex-col gap-[6px] pb-[5px]">
        <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1">
          <span>Rencana Tindak Lanjut</span>
          <span className="text-[#b42318]">*</span>
        </label>
        <textarea
          rows={3}
          required
          value={rencanaTindakLanjut}
          onChange={(e) => onRencanaTindakLanjutChange(e.target.value)}
          placeholder="Apa langkah nyata yang akan dilakukan setelah pertemuan ini?"
          className="w-full min-h-[72px] px-3 py-2.5 bg-white rounded-[6px] border border-[#e2e6eb] text-[13.5px] text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] outline-none transition-colors resize-none leading-relaxed"
        />
      </div>

      {/* Field 2: Target Waktu (opsional) (Figma Node 842:750) */}
      <div className="flex flex-col gap-[6px] pt-px">
        <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1">
          <span>Target Waktu</span>
          <span className="text-[#64748b] text-[11.5px] font-normal">(opsional)</span>
        </label>
        <input
          type="date"
          value={targetWaktu}
          onChange={(e) => onTargetWaktuChange(e.target.value)}
          className="w-full h-[40px] px-3 py-2 bg-white rounded-[6px] border border-[#e2e6eb] text-[13.5px] text-[#0f172a] focus:border-[#0a2540] focus:ring-1 focus:ring-[#0a2540] outline-none transition-colors"
        />
      </div>

      {/* Field 3: Unggah Action Learning (opsional) (Figma Node 842:767) */}
      <div className="flex flex-col gap-[6px] pt-px">
        <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1">
          <span>Unggah Action Learning</span>
          <span className="text-[#64748b] text-[11.5px] font-normal">(opsional)</span>
        </label>
        <label className="w-full bg-[#f7f9fb] border border-[#e2e6eb] border-dashed rounded-[8px] p-6 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#0a2540] hover:bg-slate-100/60 transition-colors group">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                onAddActionLearningFile(e.target.files[0].name);
              }
            }}
          />
          <div className="size-6 text-[#64748b] group-hover:text-[#0a2540] transition-colors mb-1">
            <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <span className="font-medium text-[#334155] text-[13px] leading-[19.5px]">
            Klik untuk unggah dokumen
          </span>
          <span className="font-normal text-[#94a3b8] text-[11.5px] leading-[17.25px]">
            PDF, Word · maks. 10 MB
          </span>
        </label>

        {actionLearningFiles.length > 0 && (
          <div className="flex flex-col gap-1.5 pt-1">
            {actionLearningFiles.map((file, idx) => (
              <div
                key={idx}
                className="px-3 py-2 rounded-[6px] bg-[#f1f4f8] border border-[#e2e6eb] flex items-center justify-between text-xs"
              >
                <span className="font-medium text-slate-800 truncate">{file}</span>
                <button
                  type="button"
                  onClick={() => onRemoveActionLearningFile(idx)}
                  className="text-slate-400 hover:text-red-600 text-xs px-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Field 4: Bukti Dokumentasi (opsional) (Figma Node 842:780) */}
      <div className="flex flex-col gap-[6px] pt-px">
        <label className="text-[12.5px] font-semibold text-[#334155] flex items-center gap-1">
          <span>Bukti Dokumentasi</span>
          <span className="text-[#64748b] text-[11.5px] font-normal">(opsional)</span>
        </label>
        <label className="w-full bg-[#f7f9fb] border border-[#e2e6eb] border-dashed rounded-[8px] p-6 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#0a2540] hover:bg-slate-100/60 transition-colors group">
          <input
            type="file"
            accept="image/png,image/jpeg"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const names = Array.from(e.target.files).map((f) => f.name);
                onAddBuktiFotoFiles(names);
              }
            }}
          />
          <div className="size-6 text-[#64748b] group-hover:text-[#0a2540] transition-colors mb-1">
            <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <span className="font-medium text-[#334155] text-[13px] leading-[19.5px]">
            Klik untuk unggah foto
          </span>
          <span className="font-normal text-[#94a3b8] text-[11.5px] leading-[17.25px]">
            JPG, PNG · maks. 5 file
          </span>
        </label>

        {buktiFotoFiles.length > 0 && (
          <div className="flex flex-col gap-1.5 pt-1">
            {buktiFotoFiles.map((file, idx) => (
              <div
                key={idx}
                className="px-3 py-2 rounded-[6px] bg-[#f1f4f8] border border-[#e2e6eb] flex items-center justify-between text-xs"
              >
                <span className="font-medium text-slate-800 truncate">{file}</span>
                <button
                  type="button"
                  onClick={() => onRemoveBuktiFotoFile(idx)}
                  className="text-slate-400 hover:text-red-600 text-xs px-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Field 5: Pernyataan (Figma Node 842:793) */}
      <div className="flex flex-col gap-[6px]">
        <label className="text-[12.5px] font-semibold text-[#334155]">
          Pernyataan
        </label>
        <div
          onClick={() => onPernyataanSetujuChange(!pernyataanSetuju)}
          className="bg-[#f7f9fb] border border-[#e2e6eb] border-solid rounded-[8px] px-4 py-3.5 flex gap-3 items-start cursor-pointer hover:bg-slate-100/70 transition-colors select-none"
        >
          <div className="pt-0.5 shrink-0">
            <div
              className={`size-[18px] rounded-[4px] border flex items-center justify-center transition-colors ${
                pernyataanSetuju
                  ? "bg-[#0a2540] border-[#0a2540] text-white"
                  : "bg-white border-[#cbd5e1] text-transparent"
              }`}
            >
              <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <p className="text-[12.5px] text-[#334155] leading-[19.38px]">
            Saya menyatakan bahwa seluruh data yang diisi pada pertemuan ini benar dan sesuai dengan pelaksanaan sesi yang sebenarnya.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
