"use client";

interface SesiBaruStepperProps {
  currentStep: 1 | 2 | 3;
  onStepClick: (step: 1 | 2 | 3) => void;
}

export default function SesiBaruStepper({ currentStep, onStepClick }: SesiBaruStepperProps) {
  return (
    <div className="bg-white border border-[#e2e6eb] drop-shadow-[0px_12px_16px_rgba(10,34,68,0.1)] rounded-[10px] px-3.5 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
      {/* Step 1: Data Sesi */}
      <button
        type="button"
        onClick={() => onStepClick(1)}
        className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 text-left cursor-pointer group outline-none"
      >
        <div
          className={`size-7 rounded-full flex items-center justify-center text-[12.5px] font-semibold shrink-0 transition-colors ${
            currentStep > 1
              ? "bg-[#10b981] text-white"
              : currentStep === 1
              ? "bg-[#0a2540] text-white"
              : "bg-[#eef1f5] text-[#64748b]"
          }`}
        >
          1
        </div>
        <div className="flex flex-col truncate">
          <span
            className={`text-[12.5px] sm:text-[13px] leading-[16.9px] font-semibold transition-colors ${
              currentStep > 1
                ? "text-[#067647] group-hover:text-emerald-800"
                : currentStep === 1
                ? "text-[#0f172a]"
                : "text-[#64748b] group-hover:text-slate-900"
            }`}
          >
            Data Sesi
          </span>
          <span className="hidden sm:inline text-[#94a3b8] text-[11.5px] leading-[14.95px] truncate">
            Jenis, tipe, dan topik
          </span>
        </div>
      </button>

      {/* Divider 1-2 */}
      <div
        className={`w-6 sm:w-10 h-px shrink-0 transition-colors ${
          currentStep > 1 ? "bg-[#10b981]" : "bg-[#e2e6eb]"
        }`}
      />

      {/* Step 2: Pendamping */}
      <button
        type="button"
        onClick={() => onStepClick(2)}
        className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 text-left cursor-pointer group outline-none"
      >
        <div
          className={`size-7 rounded-full flex items-center justify-center text-[12.5px] font-semibold shrink-0 transition-colors ${
            currentStep === 2
              ? "bg-[#0a2540] text-white"
              : currentStep > 2
              ? "bg-[#10b981] text-white"
              : "bg-[#eef1f5] text-[#64748b]"
          }`}
        >
          2
        </div>
        <div className="flex flex-col truncate">
          <span
            className={`text-[12.5px] sm:text-[13px] leading-[16.9px] font-semibold transition-colors ${
              currentStep === 2
                ? "text-[#0f172a]"
                : currentStep > 2
                ? "text-[#067647] group-hover:text-emerald-800"
                : "text-[#64748b] group-hover:text-slate-900"
            }`}
          >
            Pendamping
          </span>
          <span className="hidden sm:inline text-[#94a3b8] text-[11.5px] leading-[14.95px] truncate">
            Coach/Mentor &amp; Atasan
          </span>
        </div>
      </button>

      {/* Divider 2-3 */}
      <div
        className={`w-6 sm:w-10 h-px shrink-0 transition-colors ${
          currentStep > 2 ? "bg-[#10b981]" : "bg-[#e2e6eb]"
        }`}
      />

      {/* Step 3: Konfirmasi */}
      <button
        type="button"
        onClick={() => onStepClick(3)}
        className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 text-left cursor-pointer group outline-none"
      >
        <div
          className={`size-7 rounded-full flex items-center justify-center text-[12.5px] font-semibold shrink-0 transition-colors ${
            currentStep === 3
              ? "bg-[#0a2540] text-white"
              : "bg-[#eef1f5] text-[#64748b]"
          }`}
        >
          3
        </div>
        <div className="flex flex-col truncate">
          <span
            className={`text-[12.5px] sm:text-[13px] leading-[16.9px] font-semibold transition-colors ${
              currentStep === 3 ? "text-[#0f172a]" : "text-[#64748b] group-hover:text-slate-900"
            }`}
          >
            Konfirmasi
          </span>
          <span className="hidden sm:inline text-[#94a3b8] text-[11.5px] leading-[14.95px] truncate">
            Tinjau &amp; buat token
          </span>
        </div>
      </button>
    </div>
  );
}
