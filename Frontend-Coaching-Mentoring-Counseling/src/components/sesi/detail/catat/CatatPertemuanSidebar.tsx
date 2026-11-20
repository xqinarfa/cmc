"use client";

import React from "react";
import type { ApiSession } from "@/lib/api";

interface CatatPertemuanSidebarProps {
  currentStep: 1 | 2 | 3;
  session?: ApiSession | null;
  sessionTitle?: string;
  practitionerRole?: string;
  practitionerName?: string;
  practitionerJabatan?: string;
  practitionerUnit?: string;
  clientName?: string;
  clientNip?: string;
  clientJabatan?: string;
  atasanName?: string;
  atasanNip?: string;
  atasanJabatan?: string;
  token?: string;
  targetJp?: number;
  currentJp?: number;
}

function getInitials(name?: string): string {
  if (!name) return "??";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function CatatPertemuanSidebar({
  currentStep,
  session,
  sessionTitle,
  practitionerRole,
  practitionerName,
  practitionerJabatan,
  practitionerUnit,
  clientName,
  clientNip,
  clientJabatan,
  atasanName,
  atasanNip,
  atasanJabatan,
  token,
  targetJp,
  currentJp,
}: CatatPertemuanSidebarProps) {
  // Resolve values dynamically from session DB model with fallback to props
  const title = session?.title || session?.topic || sessionTitle || "Coaching & Mentoring Sesi";
  const role =
    session?.type === "mentoring"
      ? "Mentor"
      : session?.type === "counseling"
      ? "Konselor"
      : practitionerRole || "Coach";

  const pName = session?.practitioner?.full_name || practitionerName || "Praktisi BPSDM";
  const pJabatan =
    session?.practitioner?.jabatan ||
    practitionerJabatan ||
    "Praktisi Terakreditasi BPSDM Perhubungan";
  const pUnit = session?.practitioner?.unit_kerja || practitionerUnit;

  const cName = clientName || session?.client?.full_name;
  const cNip = clientNip || session?.client?.nip;
  const cJabatan = clientJabatan || session?.client?.jabatan;

  const aName =
    session?.atasan_nama ||
    session?.client?.atasan_langsung_nama ||
    atasanName ||
    "Atasan Langsung";
  const aNip = session?.atasan_nip || session?.client?.atasan_langsung_nip || atasanNip;
  const aJabatan =
    session?.atasan_jabatan ||
    session?.client?.atasan_langsung_jabatan ||
    atasanJabatan ||
    "Pejabat Penilai / Verifikator";

  const tokenPairing = session?.token || token;
  const target = session?.target_jp ?? targetJp ?? 6;
  const current = session?.current_jp ?? currentJp ?? 0;
  const progressPercent = Math.min(Math.round((current / (target || 6)) * 100), 100);

  return (
    <aside className="w-full shrink-0 flex flex-col gap-4 sticky top-20">
      {/* CARD 1: INFORMASI SESI TERKAIT DARI DATABASE */}
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
          <h3 className="text-[13.5px] font-bold text-[#0f172a]">Informasi Sesi Terkait</h3>
        </div>

        {/* Judul & Tipe Sesi */}
        <div className="flex flex-col gap-1 pb-1">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.3px] text-[#64748b]">
            Judul Sesi
          </span>
          <h4 className="text-[13.5px] font-bold text-[#0f172a] leading-snug">
            {title}
          </h4>
          <div className="flex items-center justify-between gap-2 pt-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-slate-100 text-slate-700">
              {session?.session_format === "1-on-group" ? "👥 1-on-Group (Kelompok)" : "👤 1-on-1 (Individu)"}
            </span>
            <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              + 2 JP / Pertemuan
            </span>
          </div>
        </div>

        {/* Coach/Mentor Profile */}
        <div className="flex items-start gap-3 pt-2 border-t border-[#f1f4f8]">
          <div
            className="size-8 rounded-full flex items-center justify-center text-white font-bold text-[11px] shrink-0"
            style={{
              background: "linear-gradient(135deg, rgb(148, 163, 184) 0%, rgb(71, 85, 105) 100%)",
            }}
          >
            {getInitials(pName)}
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.3px] text-[#64748b]">
              {role}
            </span>
            <span className="text-[13px] font-medium text-[#0f172a] truncate">
              {pName}
            </span>
            <span className="text-[11.5px] text-[#64748b] line-clamp-1">
              {pJabatan}
            </span>
            {pUnit && (
              <span className="text-[10.5px] text-[#94a3b8] line-clamp-1">
                {pUnit}
              </span>
            )}
          </div>
        </div>

        {/* Peserta (Client) Profile */}
        {cName && (
          <div className="flex items-start gap-3 pt-2 border-t border-[#f1f4f8]">
            <div className="size-8 rounded-full flex items-center justify-center text-white font-bold text-[11px] shrink-0 bg-[#0a2540]">
              {getInitials(cName)}
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.3px] text-[#64748b]">
                {session?.session_format === "1-on-group" ? "Peserta Pelapor (Kelompok)" : "Peserta / Coachee"}
              </span>
              <span className="text-[13px] font-medium text-[#0f172a] truncate">
                {cName}
              </span>
              <span className="text-[11.5px] text-[#64748b] line-clamp-1">
                {cNip ? `NIP. ${cNip}` : cJabatan || "Pegawai Kemenhub"}
              </span>
              {session?.session_format === "1-on-group" && (
                <span className="text-[10px] text-blue-700 font-medium mt-0.5">
                  Setiap peserta melaporkan catatan untuk memperoleh JP
                </span>
              )}
            </div>
          </div>
        )}

        {/* Verifikator (Atasan Langsung) Profile */}
        <div className="flex items-start gap-3 pt-2 border-t border-[#f1f4f8]">
          <div
            className="size-8 rounded-full flex items-center justify-center text-white font-bold text-[11px] shrink-0"
            style={{
              background: "linear-gradient(135deg, rgb(148, 163, 184) 0%, rgb(71, 85, 105) 100%)",
            }}
          >
            {getInitials(aName)}
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.3px] text-[#64748b]">
              Verifikator (Atasan Langsung)
            </span>
            <span className="text-[13px] font-medium text-[#0f172a] truncate">
              {aName}
            </span>
            <span className="text-[11.5px] text-[#64748b] line-clamp-2">
              {aJabatan}
            </span>
            {aNip && (
              <span className="text-[10.5px] text-[#94a3b8]">
                NIP. {aNip}
              </span>
            )}
          </div>
        </div>

        {/* Token Pairing Dashed Box */}
        {tokenPairing && (
          <div className="flex flex-col gap-1.5 pt-2 border-t border-[#f1f4f8]">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.3px] text-[#64748b]">
              Token Pairing
            </span>
            <div className="bg-[#f7f9fb] border border-[#0a2540] border-dashed rounded-[6px] py-2 px-3 flex items-center justify-center">
              <span className="font-mono font-bold text-[13.5px] text-[#0a2540] tracking-[2px]">
                {tokenPairing}
              </span>
            </div>
          </div>
        )}

        {/* Target & Capaian JP Progress */}
        <div className="flex flex-col gap-1.5 pt-2 border-t border-[#f1f4f8]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#64748b] font-medium">Progres Jam Pelajaran</span>
            <span className="font-bold text-[#0a2540]">
              {current} / {target} JP
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#10b981] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[11px] text-[#1e5fa8] font-medium pt-0.5">
            + 2 JP setelah pertemuan ini diverifikasi Atasan
          </span>
        </div>
      </div>

      {/* CARD 2: PANDUAN PENGISIAN */}
      <div className="bg-white border border-[#e2e6eb] rounded-[10px] pb-4 shadow-xs">
        <div className="border-b border-[#eef1f5] px-5 py-[15px] flex items-center gap-2.5">
          <div className="size-[15px] text-[#0f172a]">
            <svg
              className="w-full h-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <h3 className="font-bold text-[#0f172a] text-[13.5px] leading-[20.25px]">
            Panduan Pengisian Langkah {currentStep}
          </h3>
        </div>

        {currentStep === 3 ? (
          <div className="px-5 pt-4 flex flex-col gap-3 text-[12.5px] text-[#334155] leading-[20px]">
            <p>
              Rencana tindak lanjut <strong className="font-bold text-[#0f172a]">wajib</strong> diisi, minimal satu langkah konkret perbaikan.
            </p>
            <p>
              Bukti dokumentasi foto &amp; file action learning bersifat <strong className="font-bold text-[#0f172a]">pendukung</strong> untuk mempercepat proses verifikasi.
            </p>
            <p>
              Setelah disimpan, penambahan 2 JP resmi akan dicatat setelah Atasan Langsung (<strong className="font-semibold text-[#0f172a]">{aName}</strong>) memverifikasi hasil sesi.
            </p>
          </div>
        ) : currentStep === 2 ? (
          <div className="px-5 pt-4 flex flex-col gap-3 text-[12.5px] text-[#334155] leading-[20px]">
            <p>
              Tuliskan <strong className="font-bold text-[#0f172a]">substansi nyata</strong> yang dibahas selama pertemuan berlangsung.
            </p>
            <p>
              Fokus pada identifikasi kebutuhan pengembangan kompetensi dan umpan balik konstruktif dari praktisi.
            </p>
            <p>
              Kesepakatan solusi akan menjadi acuan pelaksanaan tugas dan rencana tindak lanjut di Langkah 3.
            </p>
          </div>
        ) : (
          <div className="px-5 pt-4 flex flex-col gap-3 text-[12.5px] text-[#334155] leading-[20px]">
            <p>
              Isi pertemuan <strong className="font-bold text-[#0f172a]">setelah sesi dilaksanakan</strong>, bukan sebagai estimasi atau janji.
            </p>
            <p>
              Semua kolom bertanda <span className="text-[#b42318] font-bold">*</span> wajib diisi dengan data pelaksanaan riil.
            </p>
            <p>
              Pilih moda pelaksanaan yang sesuai (Luring, Daring, atau Hybrid) dan cantumkan lokasi atau tautan pertemuan.
            </p>
          </div>
        )}
      </div>

      {/* CARD 3: ATURAN JP */}
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
          <h3 className="text-[13.5px] font-bold text-[#0f172a]">Ketentuan Akumulasi JP</h3>
        </div>
        <div className="flex flex-col gap-2 text-[12.5px] text-[#334155] leading-relaxed">
          <p>
            1 pertemuan = <strong className="font-bold text-[#0f172a]">2 Jam Pelajaran (JP)</strong>.
          </p>
          <p>
            Maksimal <strong className="font-bold text-[#0f172a]">2 pertemuan</strong> per bulan per jenis kegiatan.
          </p>
          <p>
            JP otomatis disinkronkan ke rekam kompetensi setelah diverifikasi oleh Atasan.
          </p>
        </div>
      </div>
    </aside>
  );
}
