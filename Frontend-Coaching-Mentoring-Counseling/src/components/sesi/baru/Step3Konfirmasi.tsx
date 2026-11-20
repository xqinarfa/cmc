"use client";

import { motion } from "framer-motion";
import type { LoggedInUserData } from "./Step2Pendamping";

interface Step3KonfirmasiProps {
  jenisKegiatan: "coaching" | "mentoring";
  tipeSesi: "1-on-1" | "1-on-group";
  topik: string;
  selectedCoach: string;
  atasanLangsung: string;
  assignedPegawai?: LoggedInUserData | null;
  groupPesertaList?: LoggedInUserData[];
}

export default function Step3Konfirmasi({
  jenisKegiatan,
  tipeSesi,
  topik,
  selectedCoach,
  atasanLangsung,
  assignedPegawai,
  groupPesertaList = [],
}: Step3KonfirmasiProps) {
  return (
    <motion.div
      key="step-3"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="flex flex-col gap-4"
    >
      {/* 1. TINJAU DATA SESI (Figma Node 832:1036) */}
      <div className="bg-white border border-[#e2e6eb] rounded-[10px] shadow-2xs">
        <div className="border-b border-[#eef1f5] pb-[15.75px] pt-[15.5px] px-[22px] flex items-center gap-2.5">
          <div className="size-[15px] text-[#0f172a]">
            <svg
              className="w-full h-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>
          <h2 className="font-bold text-[#0f172a] text-[13.5px] leading-[20.25px]">
            Tinjau Data Sesi
          </h2>
        </div>

        <div className="px-[22px] py-[20px] flex flex-col">
          {/* Row Peserta Sesi Kelompok (1-on-Group) */}
          {tipeSesi === "1-on-group" && groupPesertaList.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-[12px] items-start pb-[14px] border-b border-[#eef1f5] mb-[14px]">
              <div className="w-[140px] text-[#64748b] text-[12.5px] font-medium leading-[18.75px] shrink-0">
                Peserta Kelompok
              </div>
              <div className="flex-1 flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-900 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                    👥 1-on-Group ({groupPesertaList.length} Peserta)
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                  {groupPesertaList.map((p, idx) => (
                    <div
                      key={p.nip || idx}
                      className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs flex flex-col"
                    >
                      <span className="font-bold text-[#0f172a] truncate">
                        {p.nama_lengkap_gelar || p.full_name || p.name}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 mt-0.5">
                        NIP: {p.nip || "-"}
                      </span>
                      <span className="text-[11px] text-slate-600 truncate mt-0.5">
                        {p.jabatan || "Pegawai ASN"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Row Peserta Pegawai Tunggal (1-on-1 jika ditugaskan oleh admin) */}
          {tipeSesi === "1-on-1" && assignedPegawai && (
            <div className="flex gap-[12px] items-start pb-[14px] border-b border-[#eef1f5] mb-[14px]">
              <div className="w-[140px] text-[#64748b] text-[12.5px] font-medium leading-[18.75px]">
                Peserta Sesi
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-[#0f172a] text-[13.5px] font-bold leading-[20.25px]">
                  {assignedPegawai.nama_lengkap_gelar ||
                    assignedPegawai.full_name}
                </span>
                <span className="text-[11.5px] text-[#64748b] font-mono">
                  NIP: {assignedPegawai.nip} · {assignedPegawai.jabatan}
                </span>
                <span className="inline-flex items-center gap-1 mt-1 text-[10.5px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full w-fit">
                  Ditugaskan oleh Admin Unit Kerja
                </span>
              </div>
            </div>
          )}

          {/* Row 1: Jenis kegiatan */}
          <div className="flex gap-[12px] items-end pb-[14px]">
            <div className="w-[140px] text-[#64748b] text-[12.5px] font-medium leading-[18.75px]">
              Jenis kegiatan
            </div>
            <div className="flex-1 text-[#0f172a] text-[13.5px] font-medium leading-[20.25px] capitalize">
              {jenisKegiatan === "coaching" ? "Coaching" : "Mentoring"}
            </div>
          </div>

          {/* Row 2: Tipe sesi */}
          <div className="border-t border-[#eef1f5] flex gap-[12px] items-end py-[14px]">
            <div className="w-[140px] text-[#64748b] text-[12.5px] font-medium leading-[18.75px]">
              Tipe sesi
            </div>
            <div className="flex-1 text-[#0f172a] text-[13.5px] font-medium leading-[20.25px]">
              {tipeSesi === "1-on-1" ? "1-on-1" : "1-on-Group"}
            </div>
          </div>

          {/* Row 3: Topik */}
          <div className="border-t border-[#eef1f5] flex gap-[12px] items-end py-[14px]">
            <div className="w-[140px] text-[#64748b] text-[12.5px] font-medium leading-[18.75px]">
              Topik
            </div>
            <div className="flex-1 text-[#0f172a] text-[13.5px] font-medium leading-[20.25px]">
              {topik.trim() ? topik : "—"}
            </div>
          </div>

          {/* Row 4: Coach / Mentor */}
          <div className="border-t border-[#eef1f5] flex gap-[12px] items-end py-[14px]">
            <div className="w-[140px] text-[#64748b] text-[12.5px] font-medium leading-[18.75px]">
              Coach / Mentor
            </div>
            <div className="flex-1 text-[#0f172a] text-[13.5px] font-medium leading-[20.25px]">
              {selectedCoach ? selectedCoach : "—"}
            </div>
          </div>

          {/* Row 5: Verifikator (Pejabat Penilai / Atasan Langsung) */}
          <div className="border-t border-[#eef1f5] flex gap-[12px] items-start pt-[14px]">
            <div className="w-[140px] text-[#64748b] text-[12.5px] font-medium leading-[18.75px]">
              Verifikator
            </div>
            <div className="flex-1 flex flex-col">
              <span className="text-[#0f172a] text-[13.5px] font-semibold leading-[20.25px]">
                {atasanLangsung}
              </span>
              <span className="text-[11.5px] text-[#64748b]">
                Pejabat Penilai / Atasan Langsung SIK
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SETELAH SESI DIBUAT (Figma Node 832:1069) */}
      <div className="bg-white border border-[#e2e6eb] rounded-[10px] pb-[20px] shadow-2xs flex flex-col gap-[20px]">
        <div className="border-b border-[#eef1f5] pb-[15.75px] pt-[15.5px] px-[22px] flex items-center gap-2.5">
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
          <h2 className="font-bold text-[#0f172a] text-[13.5px] leading-[20.25px]">
            Setelah Sesi Dibuat
          </h2>
        </div>

        <div className="px-[22px] flex flex-col gap-[14px]">
          {/* Item 1 */}
          <div className="flex items-start gap-[12px]">
            <div className="size-[22px] rounded-full bg-[#0a2540] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
              1
            </div>
            <p className="text-[12.5px] leading-[18.75px] text-[#0f172a] font-medium pt-0.5">
              Sistem membuat{" "}
              <strong className="font-bold text-[#0f172a]">
                token pairing
              </strong>{" "}
              untuk dihubungkan ke Coach/Mentor.
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-[12px]">
            <div className="size-[22px] rounded-full bg-[#f1f4f8] text-[#64748b] flex items-center justify-center font-bold text-[11px] shrink-0">
              2
            </div>
            <p className="text-[12.5px] leading-[18.75px] text-[#334155] font-normal pt-0.5">
              Notifikasi dikirim ke Coach/Mentor dan Atasan Langsung.
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-[12px]">
            <div className="size-[22px] rounded-full bg-[#f1f4f8] text-[#64748b] flex items-center justify-center font-bold text-[11px] shrink-0">
              3
            </div>
            <p className="text-[12.5px] leading-[18.75px] text-[#334155] font-normal pt-0.5">
              Setelah Coach konfirmasi, sesi berstatus{" "}
              <strong className="font-bold text-[#0f172a]">Aktif</strong> dan
              Anda dapat mulai mencatat pertemuan.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
