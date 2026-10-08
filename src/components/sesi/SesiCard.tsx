"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SessionItem } from "@/lib/sessionData";

interface SesiCardProps {
  session: SessionItem;
  index: number;
  copiedTokenId?: string | null;
  sendingNotifId?: string | null;
  onCopyToken?: (sessionId: string, token: string) => void;
  onResendNotif?: (sessionId: string, title: string) => void;
  onOpenFixModal?: (session: SessionItem) => void;
  onOpenCertModal?: (session: SessionItem) => void;
}

export default function SesiCard({
  session,
  index,
  copiedTokenId,
  sendingNotifId,
  onCopyToken,
  onResendNotif,
  onOpenFixModal,
  onOpenCertModal,
}: SesiCardProps) {
  const isMentoring = session.category === "Mentoring";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="bg-white border border-[#e2e8f0] hover:border-slate-300 rounded-[14px] overflow-hidden relative shadow-xs hover:shadow-md transition-shadow duration-200"
    >
      {/* Card Main Content */}
      <div className="p-5 sm:p-5.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Information */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {/* Type & Status Badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Category Badge */}
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-[0.5px] ${
                isMentoring
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-slate-100 text-[#0a2540] border border-slate-200"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  isMentoring ? "bg-[#10b981]" : "bg-[#0a2540]"
                }`}
              />
              <span>{session.category}</span>
            </div>

            {/* Status Badges */}
            {session.status === "menunggu_konfirmasi" && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#fef6e7] text-[#92400e] border border-amber-200/80">
                <span className="size-1.5 rounded-full bg-[#92400e]" />
                <span className="text-[11.5px] font-semibold">Menunggu konfirmasi</span>
              </div>
            )}

            {session.status === "dikembalikan" && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#fef3f2] text-[#b42318] border border-red-200/80">
                <span className="size-1.5 rounded-full bg-[#b42318]" />
                <span className="text-[11.5px] font-semibold">Perlu Revisi</span>
              </div>
            )}

            {session.status === "berlangsung" && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ecfdf3] text-[#067647] border border-emerald-200/80">
                <span className="size-1.5 rounded-full bg-[#067647]" />
                <span className="text-[11.5px] font-semibold">Berlangsung</span>
              </div>
            )}

            {session.status === "selesai" && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#eef1f5] text-[#64748b]">
                <span className="size-1.5 rounded-full bg-[#64748b]" />
                <span className="text-[11.5px] font-semibold">Selesai</span>
              </div>
            )}
          </div>

          {/* Title: Clickable link */}
          <Link
            href="/sesi/detail"
            className="text-[16px] font-semibold text-[#0f172a] hover:text-[#1e5fa8] tracking-[-0.2px] leading-snug transition-colors no-underline block hover:underline"
          >
            {session.title}
          </Link>

          {/* Meta Info */}
          <div className="flex items-center gap-5 flex-wrap text-[12.5px] text-[#64748b] pt-0.5">
            <div className="flex items-center gap-2">
              <span className="size-6 rounded-full bg-slate-100 text-[#0a2540] font-bold text-[10px] flex items-center justify-center border border-slate-200">
                {session.mentorInitials}
              </span>
              <span>{session.mentorOrCoachLabel}</span>
              <span className="font-semibold text-[#334155]">{session.mentorOrCoachName}</span>
            </div>

            {session.section === "berlangsung" && session.targetJp && (
              <div className="flex items-center gap-1.5">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Target:</span>
                <span className="font-semibold text-[#334155]">{session.targetJp} JP</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{session.timeLabel}</span>
              <span className="font-medium text-[#334155]">{session.timeValue}</span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex flex-col items-start md:items-end gap-2.5 shrink-0 min-w-[220px]">
          {/* Token Box for waiting confirmation */}
          {session.token && (
            <button
              type="button"
              onClick={() => onCopyToken && onCopyToken(session.id, session.token!)}
              className="bg-[#f7f9fb] hover:bg-slate-100 border border-[#e2e6eb] border-dashed rounded-[6px] px-2.5 py-1 flex items-center gap-2 cursor-pointer transition-colors group/btn"
              title="Klik untuk menyalin token pairing"
            >
              <span className="text-[11.5px] text-[#64748b]">Token</span>
              <span className="font-bold text-[12px] text-[#0a2540] tracking-wider font-mono">
                {session.token}
              </span>
              <span className="size-5 rounded bg-white border border-slate-200 flex items-center justify-center text-[#64748b] group-hover/btn:text-[#0a2540] transition-colors">
                {copiedTokenId === session.id ? (
                  <svg
                    className="size-3.5 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg
                    className="size-3 text-[#64748b]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                )}
              </span>
            </button>
          )}

          {/* Progress Bar for Dikembalikan */}
          {session.status === "dikembalikan" && (
            <div className="flex items-center gap-2.5 w-full md:w-44">
              <div className="flex-1 h-1.5 bg-[#eef1f5] rounded-full overflow-hidden">
                <div className="h-full bg-[#10b981] rounded-full w-full" />
              </div>
              <span className="text-[12px] font-semibold text-[#334155] whitespace-nowrap">
                6 / 6 JP
              </span>
            </div>
          )}

          {/* Progress Bar for Berlangsung */}
          {session.status === "berlangsung" && (
            <div className="flex flex-col gap-1 w-full md:w-48 items-start md:items-end">
              <div className="flex items-center gap-2.5 w-full">
                <div className="flex-1 h-1.5 bg-[#eef1f5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#10b981] rounded-full w-1/2" />
                </div>
                <span className="text-[12px] font-semibold text-[#334155] whitespace-nowrap">
                  3 / 6 JP
                </span>
              </div>
              {session.progressNote && (
                <span className="text-[11px] text-[#64748b]">{session.progressNote}</span>
              )}
            </div>
          )}

          {/* Progress Bar for Selesai */}
          {session.status === "selesai" && (
            <div className="flex items-center gap-2.5 w-full md:w-44">
              <div className="flex-1 h-1.5 bg-[#eef1f5] rounded-full overflow-hidden">
                <div className="h-full bg-[#10b981] rounded-full w-full" />
              </div>
              <span className="text-[12px] font-semibold text-[#334155] whitespace-nowrap">
                {session.currentJp} / {session.targetJp} JP
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/sesi/detail"
              className="h-[34px] px-3.5 rounded-[8px] bg-white border border-[#e2e6eb] hover:bg-[#f8fafc] text-[#334155] text-[12.5px] font-medium inline-flex items-center justify-center transition-colors cursor-pointer shadow-2xs no-underline"
            >
              Detail
            </Link>

            {/* Waiting Confirmation Resend Notif */}
            {session.status === "menunggu_konfirmasi" && (
              <button
                type="button"
                disabled={sendingNotifId === session.id}
                onClick={() => onResendNotif && onResendNotif(session.id, session.title)}
                className="h-[34px] px-3.5 rounded-[8px] bg-[#0a2540] hover:bg-[#13396b] text-white text-[12.5px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs disabled:opacity-70"
              >
                {sendingNotifId === session.id ? (
                  <>
                    <svg className="size-3 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <span>Kirim Ulang Notifikasi</span>
                )}
              </button>
            )}

            {/* Dikembalikan: Perbaiki & Ajukan */}
            {session.status === "dikembalikan" && (
              <button
                type="button"
                onClick={() => onOpenFixModal && onOpenFixModal(session)}
                className="h-[34px] px-4 rounded-[8px] bg-[#b42318] hover:bg-[#912018] text-white text-[12.5px] font-semibold transition-colors cursor-pointer shadow-2xs"
              >
                Perbaiki &amp; Ajukan
              </button>
            )}

            {/* Berlangsung: Lanjutkan */}
            {session.status === "berlangsung" && (
              <Link
                href="/sesi/detail"
                className="h-[34px] px-4 rounded-[8px] bg-[#0a2540] hover:bg-[#13396b] text-white text-[12.5px] font-semibold inline-flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-xs no-underline group/link"
              >
                <span>Lanjutkan</span>
                <svg
                  className="size-3 text-white group-hover/link:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            )}

            {/* Selesai: Sertifikat */}
            {session.status === "selesai" && (
              <button
                type="button"
                onClick={() => onOpenCertModal && onOpenCertModal(session)}
                className="h-[34px] px-3.5 rounded-[8px] bg-white border border-[#e2e6eb] hover:bg-slate-50 text-[#334155] hover:text-[#0a2540] text-[12.5px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <svg
                  className="size-3.5 text-[#334155]"
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
                <span>Sertifikat</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Alert Banner (if alertText exists) */}
      {session.alertText && (
        <div
          className={`border-t px-5 sm:px-5.5 py-3 flex items-start gap-2.5 text-[12.5px] ${
            session.alertType === "amber"
              ? "bg-[#fef9ee] border-amber-100 text-[#92400e]"
              : "bg-[#fef3f2] border-red-100 text-[#b42318]"
          }`}
        >
          <svg
            className="size-4 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p>
            {session.alertAuthor && (
              <strong className="font-semibold mr-1">{session.alertAuthor}</strong>
            )}
            <span>{session.alertText}</span>
          </p>
        </div>
      )}
    </motion.div>
  );
}
