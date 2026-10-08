"use client";

import { motion } from "framer-motion";

interface SesiHeaderCardProps {
  collectedJp: number;
  targetJp: number;
  completedMeetings: number;
  totalMeetings: number;
  progressPercent: number;
}

export default function SesiHeaderCard({
  collectedJp,
  targetJp,
  completedMeetings,
  totalMeetings,
  progressPercent,
}: SesiHeaderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
      className="bg-white border border-[#e2e6eb] rounded-[10px] shadow-[0px_12px_16px_rgba(0,0,0,0.06)] p-5 w-full"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Info Details */}
        <div className="flex flex-col gap-2 min-w-0">
          {/* Category & Status Badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#0a2540]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#64748b]">
                Coaching
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ecfdf3] text-[#067647]">
              <span className="size-1.5 rounded-full bg-[#067647]" />
              <span className="text-[11.5px] font-semibold">Berlangsung</span>
            </div>
          </div>

          {/* Session Title */}
          <h2 className="text-[18px] font-bold text-[#0f172a] tracking-[-0.3px] leading-[24px]">
            Penguatan Kepemimpinan Pelayanan Publik
          </h2>

          {/* Metadata Row */}
          <div className="flex items-center gap-5 sm:gap-6 flex-wrap text-[12.5px] text-[#64748b] pt-0.5">
            {/* Coach */}
            <div className="flex items-center gap-1.5">
              <svg
                className="size-3.5 text-[#64748b] shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Coach:</span>
              <span className="font-medium text-[#334155]">Rudi Santoso, M.M.</span>
            </div>

            {/* Mulai */}
            <div className="flex items-center gap-1.5">
              <svg
                className="size-3.5 text-[#64748b] shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Mulai:</span>
              <span className="font-medium text-[#334155]">6 Jan 2025</span>
            </div>

            {/* Target JP */}
            <div className="flex items-center gap-1.5">
              <svg
                className="size-3.5 text-[#64748b] shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Target:</span>
              <span className="font-medium text-[#334155]">6 JP</span>
            </div>
          </div>
        </div>

        {/* Right Progress Details */}
        <div className="flex flex-col items-start sm:items-end gap-2 shrink-0 sm:min-w-[190px]">
          <div className="flex items-center gap-2.5 w-full sm:w-44">
            <div className="flex-1 h-1.5 bg-[#eef1f5] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#10b981] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              />
            </div>
            <span className="text-[12px] font-semibold text-[#334155] whitespace-nowrap">
              {collectedJp} / {targetJp} JP
            </span>
          </div>
          <span className="text-[11.5px] text-[#64748b] whitespace-nowrap">
            {completedMeetings} dari {totalMeetings} pertemuan terverifikasi
          </span>
        </div>
      </div>
    </motion.div>
  );
}
