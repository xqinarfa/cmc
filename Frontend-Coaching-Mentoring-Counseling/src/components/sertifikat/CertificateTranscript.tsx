"use client";

import { CertificateItem } from "@/lib/certificateData";

interface CertificateTranscriptProps {
  cert: CertificateItem;
}

export default function CertificateTranscript({ cert }: CertificateTranscriptProps) {
  return (
    <div className="w-full max-w-[780px] bg-white rounded-xl shadow-lg border border-slate-200 p-6 sm:p-8">
      <div className="border-b border-slate-200 pb-4 mb-4 flex items-center justify-between">
        <div>
          <h4 className="font-extrabold text-base text-slate-900">
            Transkrip Kompetensi &amp; Jam Pelajaran (JP)
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Lampiran resmi sertifikat nomor <strong>{cert.certNumber}</strong>
          </p>
        </div>
        <div className="text-right">
          <span className="text-sm font-extrabold text-[#0a2540] block">
            {cert.jp} Jam Pelajaran (JP)
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold">
            Terakreditasi BPSDMP
          </span>
        </div>
      </div>

      {cert.modules && cert.modules.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-2.5 px-3">No.</th>
                <th className="py-2.5 px-3">Materi / Topik Sesi</th>
                <th className="py-2.5 px-3">Domain Kompetensi</th>
                <th className="py-2.5 px-3">Pembimbing</th>
                <th className="py-2.5 px-3 text-right">Bobot JP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cert.modules.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-3 font-semibold text-slate-500">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">
                    {m.name}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {m.competencyDomain}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {m.instructor}
                  </td>
                  <td className="py-2.5 px-3 text-right font-extrabold text-blue-800">
                    {m.jp} JP
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-200 font-extrabold bg-slate-50">
                <td colSpan={4} className="py-2.5 px-3 text-right text-slate-700">
                  TOTAL JAM PELAJARAN DIAKUI:
                </td>
                <td className="py-2.5 px-3 text-right text-sm text-[#0a2540]">
                  {cert.jp} JP
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="space-y-3 text-xs text-slate-600">
          <p>
            Sertifikat ini diterbitkan atas penyelesaian sesi mandiri dengan
            rincian berikut:
          </p>
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg">
            <div>
              <span className="text-slate-400 block text-[11px]">
                Judul Pembelajaran:
              </span>
              <span className="font-bold text-slate-800">{cert.title}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">
                Pembimbing Resmi:
              </span>
              <span className="font-bold text-slate-800">
                {cert.coachOrMentor.name}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">
                Bobot Kredit:
              </span>
              <span className="font-bold text-slate-800">
                {cert.jp} Jam Pelajaran (JP)
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Metode:</span>
              <span className="font-bold text-slate-800">
                Coaching Satu-Satu &amp; Action Learning
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SIASN Sync Verification Log */}
      <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold text-slate-700">
            ID Transaksi SIASN BKN:
          </span>
          <span className="font-mono text-slate-800 font-semibold">
            {cert.siasnTransactionId}
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold text-slate-700">
            Sidik Jari Kriptografi (BSrE SHA-256):
          </span>
          <span className="font-mono text-slate-500 truncate max-w-[280px] sm:max-w-md">
            {cert.bsreHash}
          </span>
        </div>
      </div>
    </div>
  );
}
