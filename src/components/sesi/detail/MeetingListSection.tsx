"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Meeting } from "@/lib/sessionData";

interface MeetingListSectionProps {
  meetings: Meeting[];
  filledMeetings: number;
  totalMeetings: number;
  onViewDetail: (meeting: Meeting) => void;
  onDeleteDraft: (id: number | string) => void;
  onOpenAddMeeting: () => void;
  onOpenFinishModal: () => void;
}

export default function MeetingListSection({
  meetings,
  filledMeetings,
  totalMeetings,
  onViewDetail,
  onDeleteDraft,
  onOpenAddMeeting,
  onOpenFinishModal,
}: MeetingListSectionProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: "easeOut", delay: 0.1 }}
      className="bg-white border border-[#e2e6eb] rounded-[10px] overflow-hidden shadow-xs"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#eef1f5]">
        <div className="flex items-center gap-2">
          <svg
            className="size-4 text-[#0a2540]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          <h3 className="text-[13.5px] font-bold text-[#0f172a]">Pertemuan</h3>
        </div>
        <span className="text-[12px] text-[#64748b]">
          {filledMeetings} dari {totalMeetings} diisi
        </span>
      </div>

      {/* List of Meetings */}
      <div className="divide-y divide-[#eef1f5]">
        {meetings.map((meeting) => (
          <motion.div
            key={meeting.id}
            whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.8)" }}
            className="p-4 sm:p-5 flex items-start gap-3 sm:gap-4 transition-colors"
          >
            {/* Leading Status Icon Badge */}
            {meeting.status === "lengkap" && (
              <div className="size-8 rounded-full bg-[#ecfdf3] text-[#067647] flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}

            {meeting.status === "draft" && (
              <div className="size-8 rounded-full bg-[#fef6e7] text-[#92400e] flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
            )}

            {meeting.status === "pending" && (
              <div className="size-8 rounded-full bg-[#f1f4f8] border border-dashed border-[#cbd5e1] text-[#64748b] flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            )}

            {/* Meeting Content Details */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <h4 className="text-[14px] font-semibold text-[#0f172a] leading-tight">
                    {meeting.title}
                  </h4>
                  <p className="text-[12px] text-[#64748b] mt-0.5">{meeting.dateStr}</p>
                </div>

                {/* Status Badge */}
                {meeting.status === "lengkap" && (
                  <span className="self-start sm:self-auto px-2 py-0.5 rounded-[4px] bg-[#ecfdf3] text-[#067647] font-semibold text-[11px] whitespace-nowrap">
                    Lengkap
                  </span>
                )}
                {meeting.status === "draft" && (
                  <span className="self-start sm:self-auto px-2 py-0.5 rounded-[4px] bg-[#fef6e7] text-[#92400e] font-semibold text-[11px] whitespace-nowrap">
                    Draft — belum lengkap
                  </span>
                )}
                {meeting.status === "pending" && (
                  <span className="self-start sm:self-auto px-2 py-0.5 rounded-[4px] bg-[#f1f4f8] text-[#64748b] font-semibold text-[11px] whitespace-nowrap">
                    Belum diisi
                  </span>
                )}
              </div>

              {/* Meta Tags Row */}
              {meeting.status === "lengkap" && (
                <div className="flex items-center gap-3.5 flex-wrap pt-0.5 text-[12px] text-[#64748b]">
                  {meeting.hasActionLearning && (
                    <span className="inline-flex items-center gap-1.5">
                      <svg
                        className="size-3.5 text-[#64748b]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Action learning terunggah
                    </span>
                  )}

                  {meeting.photoCount && (
                    <span className="inline-flex items-center gap-1.5">
                      <svg
                        className="size-3.5 text-[#64748b]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {meeting.photoCount} foto dokumentasi
                    </span>
                  )}

                  {meeting.jpCollected && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[#f1f4f8] text-[#334155] text-[11px] font-medium">
                      <svg
                        className="size-3 text-[#10b981]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {meeting.jpCollected} JP terkumpul
                    </span>
                  )}
                </div>
              )}

              {meeting.status === "draft" && meeting.lastEdited && (
                <p className="text-[12px] text-[#64748b]">{meeting.lastEdited}</p>
              )}

              {/* Action Buttons Row */}
              <div className="pt-1 flex items-center gap-2.5">
                {meeting.status === "lengkap" && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onViewDetail(meeting)}
                    className="h-[30px] px-3.5 rounded-[8px] bg-white border border-[#e2e6eb] hover:bg-[#f8fafc] text-[#334155] font-medium text-[12.5px] inline-flex items-center justify-center transition-colors cursor-pointer"
                  >
                    Lihat Detail
                  </motion.button>
                )}

                {meeting.status === "draft" && (
                  <>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => router.push("/sesi/detail/catat")}
                      className="h-[30px] px-3.5 rounded-[8px] bg-[#0a2540] hover:bg-[#13396b] text-white font-medium text-[12.5px] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Lanjutkan Isi</span>
                      <svg
                        className="size-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onDeleteDraft(meeting.id)}
                      className="h-[30px] px-3 rounded-[8px] hover:bg-red-50 text-[#64748b] hover:text-[#b42318] font-medium text-[12.5px] inline-flex items-center justify-center transition-colors cursor-pointer"
                    >
                      Hapus Draft
                    </motion.button>
                  </>
                )}

                {meeting.status === "pending" && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push("/sesi/detail/catat")}
                    className="h-[30px] px-3.5 rounded-[8px] bg-white border border-[#e2e6eb] hover:bg-[#f8fafc] text-[#334155] font-medium text-[12.5px] inline-flex items-center justify-center transition-colors cursor-pointer"
                  >
                    Isi Pertemuan
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Action Banner (Figma Node 835:188) */}
      <div className="bg-[#f7f9fb] border-t border-[#eef1f5] px-5 py-4 flex flex-col gap-3">
        <p className="text-[13px] text-[#334155]">
          <strong className="font-semibold text-[#0f172a]">
            Tambahkan pertemuan berikutnya
          </strong>{" "}
          atau tandai sesi selesai jika semua pertemuan sudah diisi.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenAddMeeting}
            className="h-[38px] sm:h-[36px] px-4 rounded-[8px] bg-white border border-[#e2e6eb] hover:bg-[#f8fafc] text-[#334155] font-medium text-[13px] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
          >
            <svg
              className="size-3.5 text-[#334155]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Tambah Pertemuan</span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenFinishModal}
            className="h-[38px] sm:h-[36px] px-4 rounded-[8px] bg-[#0a2540] hover:bg-[#13396b] text-white font-medium text-[13px] inline-flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
          >
            Tandai Sesi Selesai
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
