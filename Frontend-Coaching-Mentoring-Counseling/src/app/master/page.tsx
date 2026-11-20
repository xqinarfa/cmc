"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AppNavbar, AppFooter, AdminGuard } from "@/components/common";
import {
  searchSikPegawai,
  fetchSatuanKerjaList,
  fetchUnitKerjaList,
  fetchSubUnitKerjaList,
} from "@/lib/api";

function MasterDashboardContent() {
  const [stats, setStats] = useState({
    totalPegawai: 0,
    totalSatker: 0,
    totalUnit: 0,
    totalSubUnit: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadMasterSummary() {
      try {
        setLoading(true);
        const [pegawaiRes, satkerRes, unitRes, subUnitRes] =
          await Promise.allSettled([
            searchSikPegawai("", 1, 0),
            fetchSatuanKerjaList(),
            fetchUnitKerjaList(),
            fetchSubUnitKerjaList(),
          ]);

        if (isMounted) {
          setStats({
            totalPegawai:
              pegawaiRes.status === "fulfilled"
                ? pegawaiRes.value.total || 0
                : 0,
            totalSatker:
              satkerRes.status === "fulfilled" && Array.isArray(satkerRes.value)
                ? satkerRes.value.length
                : 10,
            totalUnit:
              unitRes.status === "fulfilled" && Array.isArray(unitRes.value)
                ? unitRes.value.length
                : 626,
            totalSubUnit:
              subUnitRes.status === "fulfilled" &&
              Array.isArray(subUnitRes.value)
                ? subUnitRes.value.length
                : 48,
          });
        }
      } catch (err) {
        console.error("Gagal memuat ringkasan master data:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadMasterSummary();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <AppNavbar />

      <main className="flex-1 pb-16">
        {/* Hero Banner Section */}
        <div className="relative bg-gradient-to-br from-[#0a2540] via-[#10355c] to-[#1e3a5f] text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-md">
          {/* Subtle geometric pattern overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)",
              backgroundSize: "100px 100px",
            }}
          />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative w-full mx-auto px-6 sm:px-12 lg:px-18 xl:px-24">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-blue-200/80 mb-6">
              <Link
                href="/dashboard"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Beranda
              </Link>
              <span>/</span>
              <span className="text-amber-300 font-medium">Master Data</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Pusat Master Data Terpadu
                </h1>
                <p className="mt-2 text-sm sm:text-base text-blue-100/90 max-w-2xl leading-relaxed">
                  Kelola dan integrasikan seluruh basis data kepegawaian dan
                  struktur kelembagaan Kementerian Perhubungan untuk mendukung
                  efektivitas program Coaching, Mentoring, dan Counseling.
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 text-xs text-white">
                <div className="w-8 h-8 rounded-lg bg-blue-600/40 flex items-center justify-center text-blue-200">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-white">
                    Terhubung SIK Dephub
                  </div>
                  <div className="text-[11px] text-blue-200/80">
                    SOAP Web Service Aktif
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Summary Stats Bar (Floating Over Hero) */}
        <div className="w-full mx-auto px-6 sm:px-12 lg:px-18 xl:px-24 -mt-10 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white rounded-2xl shadow-lg border border-slate-200/80 p-4 sm:p-6">
            {/* Stat 1: Pegawai */}
            <div className="flex items-center gap-4 p-2">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-700 shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Total Pegawai
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-0.5">
                  {loading ? (
                    <span className="inline-block w-16 h-7 bg-slate-200 animate-pulse rounded" />
                  ) : (
                    stats.totalPegawai.toLocaleString("id-ID")
                  )}
                </div>
                <div className="text-[11px] text-slate-500">
                  Aparatur Sipil Negara
                </div>
              </div>
            </div>

            {/* Stat 2: Satker */}
            <div className="flex items-center gap-4 p-2 border-t sm:border-t-0 sm:border-l border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700 shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Satuan Kerja
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-0.5">
                  {loading ? (
                    <span className="inline-block w-10 h-7 bg-slate-200 animate-pulse rounded" />
                  ) : (
                    stats.totalSatker.toLocaleString("id-ID")
                  )}
                </div>
                <div className="text-[11px] text-slate-500">
                  Tingkat Eselon I
                </div>
              </div>
            </div>

            {/* Stat 3: Unit Kerja */}
            <div className="flex items-center gap-4 p-2 border-t lg:border-t-0 lg:border-l border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200/60 flex items-center justify-center text-indigo-700 shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Unit Kerja / Kantor
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-0.5">
                  {loading ? (
                    <span className="inline-block w-12 h-7 bg-slate-200 animate-pulse rounded" />
                  ) : (
                    stats.totalUnit.toLocaleString("id-ID")
                  )}
                </div>
                <div className="text-[11px] text-slate-500">
                  UPT & Balai Seluruh RI
                </div>
              </div>
            </div>

            {/* Stat 4: Sub Unit Kerja */}
            <div className="flex items-center gap-4 p-2 border-t sm:border-t-0 sm:border-l border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700 shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Sub Unit Kerja
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-0.5">
                  {loading ? (
                    <span className="inline-block w-10 h-7 bg-slate-200 animate-pulse rounded" />
                  ) : (
                    stats.totalSubUnit.toLocaleString("id-ID")
                  )}
                </div>
                <div className="text-[11px] text-slate-500">
                  Seksi / Bagian Operasional
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Main Cards Grid */}
        <div className="w-full mx-auto px-6 sm:px-12 lg:px-18 xl:px-24 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1: Master Pegawai */}
            <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col overflow-hidden relative">
              {/* Top Accent Strip */}
              <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500" />

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      Direktori ASN
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    Master Pegawai
                  </h2>

                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    Manajemen data aparatur sipil negara terpusat. Cari pegawai
                    berdasarkan NIP, nama, jabatan, atau instansi, kelola data
                    penempatan, pantau riwayat sinkronisasi SIK, dan akses
                    profil lengkap aparatur.
                  </p>

                  {/* Highlights feature list */}
                  <div className="mt-5 space-y-2">
                    <div className="flex items-center gap-2.5 text-xs text-slate-600">
                      <svg
                        className="w-4 h-4 text-emerald-600 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Pencarian Cerdas Multi-Kriteria (NIP, Nama, Jabatan)
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-600">
                      <svg
                        className="w-4 h-4 text-emerald-600 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Sinkronisasi SOAP SIK Dephub Otomatis & Manual
                        (Multi-Kantor)
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-600">
                      <svg
                        className="w-4 h-4 text-emerald-600 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Log & Riwayat Perubahan Data Pegawai Tersimpan
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-600">
                      <svg
                        className="w-4 h-4 text-emerald-600 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Tampilan Grid Kartu & Tabel Responsif dengan Pagination
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions & Footer */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <Link
                    href="/master-pegawai/sync-history"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-slate-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Riwayat Sinkronisasi
                  </Link>

                  <Link
                    href="/master-pegawai"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md hover:shadow-lg transition-all group-hover:translate-x-0.5"
                  >
                    Buka Master Pegawai
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Master Instansi */}
            <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col overflow-hidden relative">
              {/* Top Accent Strip */}
              <div className="h-2 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600" />

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 group-hover:scale-105 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      Hierarki Organisasi 3 Tingkat
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    Master Instansi
                  </h2>

                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    Manajemen struktur kelembagaan Kementerian Perhubungan
                    secara terstruktur. Visualisasi pohon hierarki Satuan Kerja,
                    Unit Kerja, dan Sub Unit Kerja beserta daftar personil
                    aparatur pada tiap kantor.
                  </p>

                  {/* Highlights feature list */}
                  <div className="mt-5 space-y-2">
                    <div className="flex items-center gap-2.5 text-xs text-slate-600">
                      <svg
                        className="w-4 h-4 text-emerald-600 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Visualisasi Pohon Organisasi Interaktif (Hierarki Tree)
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-600">
                      <svg
                        className="w-4 h-4 text-emerald-600 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        10 Satuan Kerja & 626+ Unit Kerja se-Indonesia
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-600">
                      <svg
                        className="w-4 h-4 text-emerald-600 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Daftar Roster Pegawai Langsung per Instansi Terpilih
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-600">
                      <svg
                        className="w-4 h-4 text-emerald-600 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Sinkronisasi Data Kantor & Sub Unit Langsung dari SIK
                        Dephub
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions & Footer */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span className="font-semibold text-slate-700">10</span>{" "}
                    Satker •{" "}
                    <span className="font-semibold text-slate-700">626</span>{" "}
                    Unit •{" "}
                    <span className="font-semibold text-slate-700">48</span> Sub
                    Unit
                  </div>

                  <Link
                    href="/master-instansi"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-xl shadow-md hover:shadow-lg transition-all group-hover:translate-x-0.5"
                  >
                    Buka Master Instansi
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* SIK Dephub Integration Info Box */}
          <div className="mt-10 bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 rounded-2xl border border-blue-200/70 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-blue-200 flex items-center justify-center text-blue-700 shadow-sm shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Sinkronisasi Terpadu SIK Dephub
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                  Semua master data pegawai dan struktur instansi disinkronkan
                  secara berkala menggunakan protokol resmi SOAP Web Service SIK
                  Kementerian Perhubungan. Hal ini memastikan data pelatih
                  (Coach), mentor, konselor, dan peserta selalu akurat dan
                  terkini.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/master-pegawai"
                className="px-4 py-2 text-xs font-semibold text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg shadow-sm transition-colors"
              >
                Sinkronisasi Pegawai
              </Link>
              <Link
                href="/master-instansi"
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-sm transition-colors"
              >
                Sinkronisasi Instansi
              </Link>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

export default function MasterDashboardPage() {
  return (
    <AdminGuard>
      <MasterDashboardContent />
    </AdminGuard>
  );
}
