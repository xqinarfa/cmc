"use client";

import React from "react";

interface SesiDetailSidebarProps {
  copiedToken: boolean;
  onCopyToken: () => void;
  onResendNotification: () => void;
  onCancelSession: () => void;
  onApproveSession?: () => void;
  onRejectSession?: () => void;
  isPending?: boolean;
  token?: string;
  practitionerName?: string;
  practitionerRole?: string;
  practitionerInitials?: string;
  clientName?: string;
  clientNip?: string;
  clientJabatan?: string;
  sessionFormat?: string;
  verifikatorName?: string;
  verifikatorJabatan?: string;
}

export function SesiDetailSidebar({
  copiedToken,
  onCopyToken,
  onResendNotification,
  onCancelSession,
  onApproveSession,
  onRejectSession,
  isPending = false,
  token = "CMC-4821-7X9A",
  practitionerName = "Rudi Santoso, M.M.",
  practitionerRole = "Coach",
  practitionerInitials = "RS",
  clientName,
  clientNip,
  clientJabatan,
  sessionFormat,
  verifikatorName = "Dr. Budi Hartono, M.Si.",
  verifikatorJabatan,
}: SesiDetailSidebarProps) {
  const verifikatorInitials = verifikatorName
    ? verifikatorName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("")
    : "AT";

  const clientInitials = clientName
    ? clientName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("")
    : "PS";
  return (
    <aside className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4">
      {/* CARD 1: INFORMASI SESI */}
      <div className="bg-white border border-[#e2e6eb] rounded-[10px] p-5 flex flex-col gap-4 shadow-xs">
        <div className="flex items-center gap-2 pb-3.5 border-b border-[#eef1f5] -mx-5 px-5">
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-[13.5px] font-bold text-[#0f172a]">Informasi Sesi</h3>
        </div>

        {/* Coach/Mentor Profile */}
        <div className="flex items-start gap-3">
          <div
            className="size-8 rounded-full flex items-center justify-center text-white font-bold text-[11px] shrink-0"
            style={{
              background: "linear-gradient(135deg, rgb(148, 163, 184) 0%, rgb(71, 85, 105) 100%)",
            }}
          >
            {practitionerInitials}
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3px] text-[#64748b]">
              {practitionerRole}
            </span>
            <span className="text-[13px] font-medium text-[#0f172a] truncate">
              {practitionerName}
            </span>
            <span className="text-[11.5px] text-[#64748b]">
              Praktisi Terakreditasi BPSDM Perhubungan
            </span>
          </div>
        </div>

        {/* Peserta (Client) Profile */}
        {clientName && (
          <div className="flex items-start gap-3">
            <div className="size-8 rounded-full flex items-center justify-center text-white font-bold text-[11px] shrink-0 bg-[#0a2540]">
              {clientInitials}
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-[0.3px] text-[#64748b]">
                {sessionFormat === "1-on-group" ? "Peserta Pelapor (Kelompok)" : "Peserta / Coachee"}
              </span>
              <span className="text-[13px] font-medium text-[#0f172a] truncate">
                {clientName}
              </span>
              <span className="text-[11.5px] text-[#64748b] line-clamp-1">
                {clientNip ? `NIP. ${clientNip}` : clientJabatan || "Pegawai Kemenhub"}
              </span>
            </div>
          </div>
        )}

        {/* Verifikator Profile */}
        <div className="flex items-start gap-3">
          <div
            className="size-8 rounded-full flex items-center justify-center text-white font-bold text-[11px] shrink-0"
            style={{
              background: "linear-gradient(135deg, rgb(148, 163, 184) 0%, rgb(71, 85, 105) 100%)",
            }}
          >
            {verifikatorInitials}
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3px] text-[#64748b]">
              Verifikator (Atasan Langsung)
            </span>
            <span className="text-[13px] font-medium text-[#0f172a] truncate">
              {verifikatorName}
            </span>
            <span className="text-[11.5px] text-[#64748b] line-clamp-2">
              {verifikatorJabatan || "Atasan Langsung / Pejabat Penilai"}
            </span>
          </div>
        </div>

        {/* Token Pairing Dashed Box */}
        {token && (
          <div className="flex flex-col gap-1.5 pt-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3px] text-[#64748b]">
              Token Pairing
            </span>
            <div className="bg-[#f7f9fb] border border-[#0a2540] border-dashed rounded-[6px] py-2.5 px-3 flex items-center justify-center">
              <span className="font-mono font-bold text-[14px] text-[#0a2540] tracking-[2px]">
                {token}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* CARD 2: ATURAN JP */}
      <div className="bg-white border border-[#e2e6eb] rounded-[10px] p-5 flex flex-col gap-3 shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-[#eef1f5] -mx-5 px-5">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-[13.5px] font-bold text-[#0f172a]">Aturan JP</h3>
        </div>

        <div className="flex flex-col gap-2 text-[12.5px] text-[#334155] leading-relaxed">
          <p>
            1 pertemuan = <strong className="font-bold text-[#0f172a]">2 JP</strong>.
          </p>
          <p>
            Maks. <strong className="font-bold text-[#0f172a]">2 pertemuan</strong> per bulan
            per jenis kegiatan.
          </p>
          <p>JP tercatat setelah verifikasi atasan.</p>
        </div>
      </div>

      {/* CARD 3: AKSI SESI */}
      <div className="bg-white border border-[#e2e6eb] rounded-[10px] p-5 flex flex-col gap-3 shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-[#eef1f5] -mx-5 px-5">
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <h3 className="text-[13.5px] font-bold text-[#0f172a]">Aksi Sesi</h3>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          {/* Info Status Menunggu Verifikasi untuk Pegawai Biasa */}
          {isPending && !onApproveSession && (
            <div className="p-3 bg-amber-50/80 border border-amber-200/90 rounded-[8px] flex items-start gap-2.5 mb-1">
              <svg className="size-4 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] font-semibold text-amber-900">Menunggu Verifikasi</span>
                <span className="text-[11.5px] text-amber-700 leading-snug">
                  Sesi menunggu verifikasi dan persetujuan dari Atasan Langsung ({verifikatorName}).
                </span>
              </div>
            </div>
          )}

          {/* Tombol Verifikasi Khusus Atasan / Verifikator saat Sesi Menunggu Konfirmasi */}
          {isPending && onApproveSession && (
            <button
              type="button"
              onClick={onApproveSession}
              className="h-[36px] px-3 rounded-[8px] bg-[#067647] hover:bg-[#05603a] text-white font-semibold text-[12.5px] inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <svg
                className="size-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Verifikasi & Setujui Sesi</span>
            </button>
          )}

          {isPending && onRejectSession && (
            <button
              type="button"
              onClick={onRejectSession}
              className="h-[32px] px-3 rounded-[8px] bg-red-50 hover:bg-red-100 border border-red-200 text-[#b42318] font-medium text-[12.5px] inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              Kembalikan untuk Perbaikan
            </button>
          )}

          {token && (
            <button
              type="button"
              onClick={onCopyToken}
              className="h-[32px] px-3 rounded-[8px] bg-white border border-[#e2e6eb] hover:bg-[#f8fafc] text-[#334155] font-medium text-[12.5px] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
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
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              <span>{copiedToken ? "Tersalin!" : "Salin Token"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onResendNotification}
            className="h-[32px] px-3 rounded-[8px] bg-white border border-[#e2e6eb] hover:bg-[#f8fafc] text-[#334155] font-medium text-[12.5px] inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            Kirim Ulang Notifikasi
          </button>

          <button
            type="button"
            onClick={onCancelSession}
            className="h-[32px] px-3 rounded-[8px] bg-white border border-[#e2e6eb] hover:bg-red-50 text-[#b42318] font-medium text-[12.5px] inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            Batalkan Sesi
          </button>
        </div>
      </div>
    </aside>
  );
}
