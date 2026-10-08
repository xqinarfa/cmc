"use client";

import { useState } from "react";
import { PillarId } from "@/types";

export default function TigaPilarSection() {
  const [activeTab, setActiveTab] = useState<PillarId>("coaching");

  return (
    <section id="tiga-pilar" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-[80px]">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0a2244]">
            METODOLOGI &amp; SPESIFIKASI OPERASIONAL
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081730] tracking-tight mt-1.5">
            Matriks Komparasi Tiga Pilar CMC
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Pilih tab di bawah untuk melihat rincian kualifikasi fasilitator, sasaran jabatan, dan mekanisme perolehan jam pelajaran.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center gap-2 mb-8">
          {[
            { id: "coaching" as PillarId, label: "Pilar 1: Coaching Kinerja" },
            { id: "mentoring" as PillarId, label: "Pilar 2: Mentoring Matra" },
            { id: "counselling" as PillarId, label: "Pilar 3: Counselling Kesejahteraan" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#0a2244] text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Detailed Spec Card */}
        <div className="bg-white rounded-xl border border-slate-300 p-8 shadow-xs">
          {activeTab === "coaching" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0a2244]">
                  <span className="w-2 h-2 rounded-full bg-[#0a2244]" />
                  <span>EKSPLORASI POTENSI &amp; KINERJA MANDIRI</span>
                </div>
                <h3 className="text-2xl font-bold text-[#081730]">
                  Coaching Kepemimpinan &amp; Efektivitas Organisasi
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Coaching adalah kemitraan terstruktur di mana Coach memandu Coachee menggali
                  solusi mandiri melalui teknik pertanyaan reflektif (<em>powerful questioning</em>).
                  Coach tidak memberikan instruksi teknis, melainkan menstimulasi pemikiran strategis
                  dan komitmen rencana aksi nyata bagi unit kerja.
                </p>

                <div className="space-y-2 pt-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#0a2244]">•</span>
                    <span><strong>Filosofi Interaksi:</strong> Kemitraan setara yang menempatkan Coachee sebagai pemilik solusi orisinal.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#0a2244]">•</span>
                    <span><strong>Sasaran Peserta:</strong> Pejabat Administrator, Pejabat Pengawas, dan Pejabat Fungsional Ahli.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#0a2244]">•</span>
                    <span><strong>Output Bukti:</strong> Lembar Komitmen Rencana Aksi (<em>Action Learning Commitment</em>) &amp; Evaluasi Capaian.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-50 rounded-lg p-5 border border-slate-200 flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Standar Kualifikasi Coach
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Wajib mengantongi sertifikat Coach dari BPSDMP Kemenhub, Lembaga Administrasi Negara (LAN), atau lisensi internasional (ICF/BNSP) dengan minimal 50 jam terbang pendampingan.
                </p>
                <div className="bg-white p-3 rounded border border-slate-200 text-xs flex justify-between items-center">
                  <span className="font-bold text-slate-700">Bobot Kredit JP</span>
                  <span className="font-bold text-[#0a2244]">2 JP / Sesi Pertemuan</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "mentoring" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-800">
                  <span className="w-2 h-2 rounded-full bg-teal-700" />
                  <span>TRANSFER PENGETAHUAN &amp; KEAHLIAN MATRA</span>
                </div>
                <h3 className="text-2xl font-bold text-[#081730]">
                  Mentoring Teknis Operasional &amp; Budaya Birokrasi
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Mentoring adalah proses bimbingan terarah di mana Mentor berpengalaman mentransfer
                  pengetahuan teknis spesifik, wawasan regulasi sektor transportasi, serta kiat
                  menavigasi birokrasi pemerintahan kepada aparatur yang lebih junior.
                </p>

                <div className="space-y-2 pt-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-teal-800">•</span>
                    <span><strong>Filosofi Interaksi:</strong> Keteladanan, pembimbingan teknis (<em>guidance</em>), dan transfer kebijaksanaan praktis.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-teal-800">•</span>
                    <span><strong>Sasaran Peserta:</strong> CPNS, Aparatur Pelaksana Teknis, dan Pegawai yang Mengalami Rotasi/Mutasi Tugas Baru.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-teal-800">•</span>
                    <span><strong>Output Bukti:</strong> Lembar Catatan Transfer Pengetahuan (<em>Knowledge Transfer Log</em>) dan Portofolio Lapangan.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-50 rounded-lg p-5 border border-slate-200 flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Standar Kualifikasi Mentor
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pejabat Fungsional Ahli Madya/Utama, Pejabat Struktural Eselon II/III, atau praktisi transportasi senior dengan penguasaan mendalam atas regulasi matra dan sistem kerja Kemenhub.
                </p>
                <div className="bg-white p-3 rounded border border-slate-200 text-xs flex justify-between items-center">
                  <span className="font-bold text-slate-700">Bobot Kredit JP</span>
                  <span className="font-bold text-teal-800">2 JP / Sesi Pertemuan</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "counselling" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-800">
                  <span className="w-2 h-2 rounded-full bg-purple-700" />
                  <span>KESEJAHTERAAN MENTAL &amp; 100% KONFIDENSIAL</span>
                </div>
                <h3 className="text-2xl font-bold text-[#081730]">
                  Counselling (Konseling) Psikologi Kerja ASN
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Layanan pendampingan psikologis profesional yang bertujuan membantu pegawai
                  mengurai kejenuhan kerja (<em>burnout</em>), dinamika konflik kerja, stres adaptasi,
                  dan menjaga keseimbangan emosional demi terciptanya produktivitas yang sehat.
                </p>

                <div className="space-y-2 pt-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-purple-800">•</span>
                    <span><strong>Jaminan Kerahasiaan Mutlak:</strong> Seluruh percakapan dilindungi kode etik HIMPSI. Catatan konseling tidak pernah dibagikan kepada atasan maupun unit kepegawaian.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-purple-800">•</span>
                    <span><strong>Sasaran Peserta:</strong> Seluruh Aparatur Sipil Negara di lingkungan Kementerian Perhubungan.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-purple-800">•</span>
                    <span><strong>Format Layanan:</strong> Tatap muka di ruang privat atau daring melalui tautan terenkripsi berkeamanan tinggi.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-50 rounded-lg p-5 border border-slate-200 flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Standar Kualifikasi Konselor
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Psikolog Klinis dan Konselor Organisasi berlisensi Surat Izin Praktik Psikologi (SIPP) dari Himpunan Psikologi Indonesia (HIMPSI).
                </p>
                <div className="bg-white p-3 rounded border border-slate-200 text-xs flex justify-between items-center">
                  <span className="font-bold text-slate-700">Status Pencatatan</span>
                  <span className="font-bold text-purple-800">Hak Kesejahteraan ASN</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
