"use client";

interface CatatPertemuanStepperProps {
  currentStep: 1 | 2 | 3;
  onStepClick: (step: 1 | 2 | 3) => void;
}

export default function CatatPertemuanStepper({
  currentStep,
  onStepClick,
}: CatatPertemuanStepperProps) {
  return (
    <div className="border-b border-[#eef1f5] px-3.5 sm:px-[22px] py-[12px] sm:py-[14px] flex items-center justify-between gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
      {/* Step 1: Data & Tujuan */}
      <button
        type="button"
        onClick={() => onStepClick(1)}
        className="flex items-center gap-2 sm:gap-2.5 shrink-0 text-left cursor-pointer outline-none group"
      >
        <div
          className={`size-[26px] rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0 transition-colors ${
            currentStep === 1
              ? "bg-[#0a2540] text-white"
              : "bg-[#10b981] text-white"
          }`}
        >
          1
        </div>
        <div className="flex flex-col">
          <span
            className={`text-[12.5px] leading-[16.25px] font-semibold transition-colors ${
              currentStep === 1 ? "text-[#0f172a]" : "text-[#067647]"
            }`}
          >
            Data &amp; Tujuan
          </span>
          <span className="hidden sm:inline text-[11px] leading-[14.3px] text-[#94a3b8]">
            Kapan dan di mana
          </span>
        </div>
      </button>

      {/* Divider 1-2 */}
      <div
        className={`w-4 sm:w-8 h-px shrink-0 transition-colors ${
          currentStep >= 2 ? "bg-[#10b981]" : "bg-[#e2e6eb]"
        }`}
      />

      {/* Step 2: Pembahasan */}
      <button
        type="button"
        onClick={() => onStepClick(2)}
        className="flex items-center gap-2 sm:gap-2.5 shrink-0 text-left cursor-pointer outline-none group"
      >
        <div
          className={`size-[26px] rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0 transition-colors ${
            currentStep === 2
              ? "bg-[#0a2540] text-white"
              : currentStep > 2
              ? "bg-[#10b981] text-white"
              : "bg-[#eef1f5] text-[#64748b]"
          }`}
        >
          2
        </div>
        <div className="flex flex-col">
          <span
            className={`text-[12.5px] leading-[16.25px] font-semibold transition-colors ${
              currentStep === 2
                ? "text-[#0f172a]"
                : currentStep > 2
                ? "text-[#067647]"
                : "text-[#64748b]"
            }`}
          >
            Pembahasan
          </span>
          <span className="hidden sm:inline text-[11px] leading-[14.3px] text-[#94a3b8]">
            Isi &amp; feedback
          </span>
        </div>
      </button>

      {/* Divider 2-3 */}
      <div
        className={`w-4 sm:w-8 h-px shrink-0 transition-colors ${
          currentStep >= 3 ? "bg-[#10b981]" : "bg-[#e2e6eb]"
        }`}
      />

      {/* Step 3: Tindak Lanjut */}
      <button
        type="button"
        onClick={() => onStepClick(3)}
        className="flex items-center gap-2 sm:gap-2.5 shrink-0 text-left cursor-pointer outline-none group"
      >
        <div
          className={`size-[26px] rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0 transition-colors ${
            currentStep === 3
              ? "bg-[#0a2540] text-white"
              : "bg-[#eef1f5] text-[#64748b]"
          }`}
        >
          3
        </div>
        <div className="flex flex-col">
          <span
            className={`text-[12.5px] leading-[16.25px] font-semibold transition-colors ${
              currentStep === 3 ? "text-[#0f172a]" : "text-[#64748b]"
            }`}
          >
            Tindak Lanjut
          </span>
          <span className="hidden sm:inline text-[11px] leading-[14.3px] text-[#94a3b8]">
            Upload &amp; tanda tangan
          </span>
        </div>
      </button>
    </div>
  );
}
