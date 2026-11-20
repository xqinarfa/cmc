"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Meeting } from "@/lib/sessionData";

interface MeetingListSectionProps {
  sessionId?: string;
  meetings: Meeting[];
  filledMeetings: number;
  totalMeetings: number;
  onViewDetail: (meeting: Meeting) => void;
  onDeleteDraft: (id: number | string) => void;
  onOpenAddMeeting: () => void;
  onOpenFinishModal: () => void;
  isVerified?: boolean;
  sessionStatus?: string;
  verifikatorName?: string;
}

export default function MeetingListSection({
  sessionId,
  meetings,
  filledMeetings,
  totalMeetings,
  onViewDetail,
  onDeleteDraft,
  onOpenAddMeeting,
  onOpenFinishModal,
  isVerified = true,
  sessionStatus,
  verifikatorName,
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

      {/* Ketentuan JP & Pertemuan Info Banner */}
      <div className="px-5 py-2.5 bg-blue-50/70 border-b border-blue-100 flex items-center gap-2 text-[12px] text-blue-900">
        <svg
          className="size-4 text-blue-600 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>
          <strong>Ketentuan Pelaksanaan:</strong> 1 pertemuan = 2 JP. Maksimal 2 pertemuan per bulan per jenis kegiatan.
        </span>
      </div>

      {/* Warning Banner if Session is NOT yet verified */}
      {!isVerified && (
        <div className="px-5 py-3 bg-amber-50/90 border-b border-amber-200 flex items-start gap-3 text-[12.5px] text-amber-900">
          <svg
            className="size-4.5 text-amber-600 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-amber-950">
              Menunggu Verifikasi Atasan Langsung / Pejabat Penilai
            </span>
            <p className="text-amber-800 leading-relaxed text-[12px]">
              Sesi berstatus <strong>{sessionStatus === "rejected" ? "Perlu Perbaikan" : "Menunggu Verifikasi"}</strong>. Pertemuan baru dapat ditambahkan dan dicatat setelah sesi ini diverifikasi dan disetujui oleh Atasan Langsung / Pejabat Penilai {verifikatorName ? `(${verifikatorName})` : ""}.
            </p>
          </div>
        </div>
      )}

      {/* List of Meetings or Empty State */}
      {meetings.length === 0 ? (
        <div className="p-8 text-center flex flex-col items-center justify-center">
          <div
            className={`size-12 rounded-full ${
              isVerified ? "bg-slate-100 text-slate-400" : "bg-amber-100 text-amber-600"
            } flex items-center justify-center mb-3`}
          >
            {isVerified ? (
              <svg
                className="size-6 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            ) : (
              <svg
                className="size-6 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
          <h4 className="text-[14px] font-semibold text-slate-800 mb-1">
            {isVerified ? "Belum Ada Pertemuan" : "Menunggu Verifikasi Sesi"}
          </h4>
          <p className="text-[12.5px] text-slate-500 max-w-md mb-4 leading-relaxed">
            {isVerified
              ? "Pertemuan tidak dibuat secara otomatis. Peserta atau coach/mentor dapat menambahkan pertemuan sesuai jadwal pelaksanaan yang disepakati."
              : "Sesi ini belum diverifikasi oleh Atasan Langsung / Pejabat Penilai. Pertemuan baru dapat ditambahkan setelah sesi disetujui."}
          </p>
          <motion.button
            type="button"
            whileHover={isVerified ? { scale: 1.02 } : undefined}
            whileTap={isVerified ? { scale: 0.98 } : undefined}
            onClick={isVerified ? onOpenAddMeeting : undefined}
            disabled={!isVerified}
            className={`h-[36px] px-4 rounded-[8px] font-medium text-[13px] inline-flex items-center gap-2 transition-colors shadow-xs ${
              isVerified
                ? "bg-[#0a2540] hover:bg-[#13396b] text-white cursor-pointer"
                : "bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300/60"
            }`}
            title={!isVerified ? "Pertemuan baru dapat ditambahkan setelah sesi diverifikasi oleh atasan" : undefined}
          >
            {isVerified ? (
              <svg
                className="size-3.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            ) : (
              <svg
                className="size-3.5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            )}
            <span>
              {isVerified ? "Tambah Pertemuan Pertama" : "Tambah Pertemuan (Terkunci)"}
            </span>
          </motion.button>
        </div>
      ) : (
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
                    {meeting.statusLabel || "Lengkap"}
                  </span>
                )}
                {meeting.status === "draft" && (
                  <span className="self-start sm:self-auto px-2 py-0.5 rounded-[4px] bg-[#fef6e7] text-[#92400e] font-semibold text-[11px] whitespace-nowrap">
                    {meeting.statusLabel || "Draft — belum lengkap"}
                  </span>
                )}
                {meeting.status === "pending" && (
                  <span className="self-start sm:self-auto px-2 py-0.5 rounded-[4px] bg-[#f1f4f8] text-[#64748b] font-semibold text-[11px] whitespace-nowrap">
                    {meeting.statusLabel || "Belum diisi"}
                  </span>
                )}
              </div>

              {/* Group Participant Notes Status (if multiple participants) */}
              {meeting.participantNotes && meeting.totalParticipants && meeting.totalParticipants > 1 && (
                <div className="flex flex-col gap-1.5 pt-1 pb-0.5">
                  <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#475569]">
                    <span>Status Catatan Peserta ({meeting.completedCount || 0}/{meeting.totalParticipants}):</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {meeting.participantNotes.map((pn) => (
                      <span
                        key={pn.nip}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                          pn.isCompleted
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {pn.isCompleted ? (
                          <svg
                            className="size-3 text-emerald-600 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="size-1.5 rounded-full bg-amber-500 shrink-0" />
                        )}
                        <span className="font-semibold">{pn.nama.split(" ")[0]}</span>
                        <span className="text-[10px] opacity-80">
                          {pn.isCompleted ? "(+2 JP)" : "(Belum)"}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

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
              <div className="pt-1 flex items-center gap-2.5 flex-wrap">
                {/* 1. If Current User has already completed note or meeting status is lengkap */}
                {(meeting.currentUserCompleted || meeting.status === "lengkap") ? (
                  <>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onViewDetail(meeting)}
                      className="h-[30px] px-3.5 rounded-[8px] bg-white border border-[#e2e6eb] hover:bg-[#f8fafc] text-[#334155] font-medium text-[12.5px] inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <svg className="size-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Lihat Detail</span>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        router.push(
                          sessionId
                            ? `/sesi/detail/catat?sessionId=${sessionId}&pertemuan=${meeting.number}&meetingId=${meeting.id}`
                            : `/sesi/detail/catat?pertemuan=${meeting.number}&meetingId=${meeting.id}`
                        )
                      }
                      className="h-[30px] px-3.5 rounded-[8px] bg-[#f8fafc] border border-[#cbd5e1] hover:bg-[#f1f5f9] text-[#0a2540] font-medium text-[12.5px] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Ubah Catatan Anda</span>
                    </motion.button>
                  </>
                ) : (
                  /* 2. If Current User has NOT yet completed note for this meeting */
                  <>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        router.push(
                          sessionId
                            ? `/sesi/detail/catat?sessionId=${sessionId}&pertemuan=${meeting.number}&meetingId=${meeting.id}`
                            : `/sesi/detail/catat?pertemuan=${meeting.number}&meetingId=${meeting.id}`
                        )
                      }
                      className="h-[30px] px-3.5 rounded-[8px] bg-[#0a2540] hover:bg-[#13396b] text-white font-medium text-[12.5px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      <span>
                        {meeting.totalParticipants && meeting.totalParticipants > 1
                          ? "Isi Catatan Anda (+2 JP)"
                          : "Isi Pertemuan (+2 JP)"}
                      </span>
                    </motion.button>

                    {meeting.completedCount && meeting.completedCount > 0 && (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => onViewDetail(meeting)}
                        className="h-[30px] px-3 rounded-[8px] bg-white border border-[#e2e6eb] hover:bg-[#f8fafc] text-[#475569] font-medium text-[12.5px] inline-flex items-center justify-center transition-colors cursor-pointer"
                      >
                        Lihat Catatan ({meeting.completedCount})
                      </motion.button>
                    )}
                  </>
                )}

                {/* Optional delete draft if allowed */}
                {meeting.status === "draft" && !meeting.currentUserCompleted && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onDeleteDraft(meeting.id)}
                    className="h-[30px] px-2.5 rounded-[8px] hover:bg-red-50 text-[#64748b] hover:text-[#b42318] font-medium text-[12px] inline-flex items-center justify-center transition-colors cursor-pointer ml-auto"
                  >
                    Hapus
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      )}

      {/* Bottom Action Banner (Figma Node 835:188) */}
      <div className="bg-[#f7f9fb] border-t border-[#eef1f5] px-5 py-4 flex flex-col gap-3">
        <p className="text-[13px] text-[#334155]">
          {isVerified ? (
            <>
              <strong className="font-semibold text-[#0f172a]">
                Tambahkan pertemuan berikutnya
              </strong>{" "}
              atau tandai sesi selesai jika semua pertemuan sudah diisi.
            </>
          ) : (
            <span className="text-amber-800 font-medium">
              Pertemuan baru dapat ditambahkan dan dicatat setelah sesi ini diverifikasi dan disetujui oleh Atasan Langsung / Pejabat Penilai.
            </span>
          )}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <motion.button
            type="button"
            whileHover={isVerified ? { scale: 1.02 } : undefined}
            whileTap={isVerified ? { scale: 0.97 } : undefined}
            onClick={isVerified ? onOpenAddMeeting : undefined}
            disabled={!isVerified}
            className={`h-[38px] sm:h-[36px] px-4 rounded-[8px] border font-medium text-[13px] inline-flex items-center justify-center gap-2 transition-colors shadow-2xs ${
              isVerified
                ? "bg-white border-[#e2e6eb] hover:bg-[#f8fafc] text-[#334155] cursor-pointer"
                : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
            }`}
            title={!isVerified ? "Pertemuan baru dapat ditambahkan setelah sesi diverifikasi oleh atasan" : undefined}
          >
            <svg
              className={`size-3.5 ${isVerified ? "text-[#334155]" : "text-slate-400"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Tambah Pertemuan {!isVerified && "(Terkunci)"}</span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={isVerified ? { scale: 1.02 } : undefined}
            whileTap={isVerified ? { scale: 0.97 } : undefined}
            onClick={() => {
              if (!isVerified) return;
              router.push(
                sessionId
                  ? `/sesi/detail/catat?sessionId=${sessionId}&pertemuan=${meetings.length + 1}`
                  : "/sesi/detail/catat"
              );
            }}
            disabled={!isVerified}
            className={`h-[38px] sm:h-[36px] px-3.5 rounded-[8px] font-medium text-[13px] inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs ${
              isVerified
                ? "bg-[#0a2540] hover:bg-[#13396b] text-white cursor-pointer"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
            title={!isVerified ? "Pertemuan baru dapat dicatat setelah sesi diverifikasi oleh atasan" : undefined}
          >
            <span>Catat Lengkap (Wizard) {!isVerified && "(Terkunci)"}</span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenFinishModal}
            className="h-[38px] sm:h-[36px] px-4 rounded-[8px] bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-[13px] inline-flex items-center justify-center transition-colors cursor-pointer shadow-2xs sm:ml-auto"
          >
            Tandai Sesi Selesai
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
