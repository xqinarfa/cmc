"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { ApiSession, ApiSessionPeserta } from "@/lib/api";

interface PesertaSesiCardProps {
  session?: ApiSession | null;
}

interface ParsedGroupPeserta {
  no: number;
  name: string;
  nip?: string;
  current_jp?: number;
  target_jp?: number;
  role?: string;
}

function parseGroupPesertaFromNotes(notes?: string): ParsedGroupPeserta[] {
  if (!notes) return [];
  const lines = notes.split("\n");
  const list: ParsedGroupPeserta[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    const match = trimmed.match(/^(\d+)[\.\)]\s*(.+?)(?:\s*\((?:NIP:?\s*)?(\d+)\))?$/i);
    if (match) {
      list.push({
        no: parseInt(match[1], 10),
        name: match[2].trim(),
        nip: match[3]?.trim(),
      });
    }
  }

  return list;
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

export default function PesertaSesiCard({ session }: PesertaSesiCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isGroup = session?.session_format === "1-on-group";
  
  // Child session_peserta support from API
  const dbPesertaList: ApiSessionPeserta[] = session?.peserta_list || [];
  
  // Consolidated participants list
  let participantList: ParsedGroupPeserta[] = [];
  if (dbPesertaList.length > 0) {
    participantList = dbPesertaList.map((p, idx) => ({
      no: idx + 1,
      name: p.nama,
      nip: p.nip,
      current_jp: p.current_jp,
      target_jp: p.target_jp,
      role: p.role_in_session,
    }));
  } else if (isGroup) {
    participantList = parseGroupPesertaFromNotes(session?.notes);
  }

  // Determine main participant (Peserta Utama / Client)
  const primaryDbPeserta = dbPesertaList.find((p) => p.role_in_session === "utama") || dbPesertaList[0];
  const mainClient = session?.client;

  const clientName = primaryDbPeserta?.nama || mainClient?.full_name || "Peserta Sesi";
  const clientNip = primaryDbPeserta?.nip || mainClient?.nip;
  const clientJabatan = primaryDbPeserta?.jabatan || mainClient?.jabatan || "Pegawai BPSDM / Kemenhub";
  const clientUnit = primaryDbPeserta?.unit_kerja || mainClient?.unit_kerja || mainClient?.satuan_kerja;
  const clientGolongan = mainClient?.pangkat_golongan;

  const currentJp = primaryDbPeserta?.current_jp ?? session?.current_jp ?? 0;
  const targetJp = primaryDbPeserta?.target_jp ?? session?.target_jp ?? 6;
  const progressPercent = Math.min(Math.round((currentJp / targetJp) * 100), 100);

  const totalParticipantsCount = participantList.length > 0 ? participantList.length : (isGroup ? 2 : 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white border border-[#e2e6eb] rounded-[10px] shadow-[0px_4px_12px_rgba(0,0,0,0.03)] p-5 w-full flex flex-col gap-4"
    >
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#eef1f5]">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-[#0a2540]/5 text-[#0a2540] flex items-center justify-center shrink-0">
            {isGroup ? (
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            ) : (
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>
          <div>
            <h3 className="text-[14.5px] font-bold text-[#0f172a] leading-tight">
              Informasi Peserta Sesi
            </h3>
            <p className="text-[11.5px] text-[#64748b] mt-0.5">
              {isGroup
                ? `Format Sesi Kelompok (1-on-Group) — Setiap peserta melaporkan catatan untuk memperoleh JP`
                : "Format Sesi Individu (1-on-1) — Pelaporan catatan pertemuan resmi untuk penambahan JP"}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#eef4ff] text-[#1d2939] border border-blue-100">
            {isGroup ? `👥 1-on-Group (${totalParticipantsCount} Peserta)` : "👤 1-on-1 (Individu)"}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#ecfdf3] text-[#067647] border border-emerald-200">
            + 2 JP / Pertemuan
          </span>
        </div>
      </div>

      {/* Main Participant Card */}
      <div className="bg-[#f8fafc] border border-[#e2e6eb] rounded-[8px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div className="size-11 rounded-full bg-[#0a2540] text-white font-bold text-[13px] flex items-center justify-center shrink-0 shadow-xs">
            {getInitials(clientName)}
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[14px] font-bold text-[#0f172a] truncate">
                {clientName}
              </span>
              <span className="px-2 py-0.5 rounded-[4px] bg-[#0a2540]/10 text-[#0a2540] text-[10.5px] font-semibold">
                {isGroup ? "Peserta Utama / Koordinator" : "Peserta Sesi"}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-[12px] text-[#64748b]">
              {clientNip && <span>NIP. {clientNip}</span>}
              {clientGolongan && (
                <>
                  <span>•</span>
                  <span>{clientGolongan}</span>
                </>
              )}
            </div>
            <div className="text-[11.5px] text-[#475569] line-clamp-1 mt-0.5">
              <span>{clientJabatan}</span>
              {clientUnit && <span> — {clientUnit}</span>}
            </div>
          </div>
        </div>

        {/* JP Progress Box */}
        <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0 pl-0 sm:pl-4 border-t sm:border-t-0 sm:border-l border-[#e2e6eb] pt-3 sm:pt-0">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3px] text-[#64748b]">
            Perolehan Jam Pelajaran
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[18px] font-extrabold text-[#067647]">
              {currentJp}
            </span>
            <span className="text-[12px] font-semibold text-[#64748b]">
              / {targetJp} JP
            </span>
          </div>
          <div className="w-28 sm:w-32 h-1.5 rounded-full bg-[#e2e8f0] overflow-hidden">
            <div
              className="h-full bg-[#10b981] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Group Participants Section (if 1-on-group and has multiple participants) */}
      {isGroup && participantList.length > 0 && (
        <div className="flex flex-col gap-2.5 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[12.5px] font-bold text-[#0f172a] flex items-center gap-1.5">
              <span>Daftar Seluruh Anggota Kelompok</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {participantList.length} Pegawai
              </span>
            </span>
            {participantList.length > 2 && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[12px] font-semibold text-[#0a2540] hover:underline cursor-pointer"
              >
                {isExpanded ? "Sembunyikan" : `Lihat Semua (${participantList.length})`}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {(isExpanded ? participantList : participantList.slice(0, 4)).map((p) => (
              <div
                key={p.no}
                className="bg-white border border-[#e2e6eb] rounded-[6px] p-2.5 flex items-center justify-between gap-2.5"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="size-7 rounded-full bg-slate-100 text-[#334155] font-bold text-[11px] flex items-center justify-center shrink-0">
                    {p.no}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[12.5px] font-semibold text-[#0f172a] truncate">
                      {p.name}
                    </span>
                    <span className="text-[11px] text-[#64748b]">
                      {p.nip ? `NIP. ${p.nip}` : "Peserta Sesi"}
                    </span>
                    {session?.pertemuan_list && session.pertemuan_list.length > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        {session.pertemuan_list.map((m) => {
                          const hasNote = m.catatan_list?.some(
                            (c) => p.nip && c.nip.trim().toLowerCase() === p.nip.trim().toLowerCase(),
                          );
                          return (
                            <span
                              key={m.id}
                              title={`Pertemuan #${m.meeting_number}: ${
                                hasNote ? "Catatan Terisi (+2 JP)" : "Belum Mengisi"
                              }`}
                              className={`text-[9.5px] px-1.5 py-0.2 rounded font-medium ${
                                hasNote
                                  ? "bg-emerald-100 text-emerald-800 font-bold"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              P{m.meeting_number} {hasNote ? "✓" : "—"}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                {p.current_jp !== undefined && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 shrink-0">
                    {p.current_jp} / {p.target_jp || 6} JP
                  </span>
                )}
              </div>
            ))}
          </div>

          <p className="text-[11px] text-[#64748b] bg-[#f8fafc] p-2.5 rounded-[6px] border border-[#eef1f5] leading-relaxed">
            💡 <strong>Ketentuan Sesi Kelompok:</strong> Setiap peserta dalam sesi berhak atas perolehan 2 JP per pertemuan setelah mengisi dan mengirimkan laporan catatan pertemuan yang diverifikasi oleh Atasan Langsung.
          </p>
        </div>
      )}
    </motion.div>
  );
}
