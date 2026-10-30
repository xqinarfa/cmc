# Project Folder Structure Blueprint: CMC (Coaching, Mentoring & Counseling)
**Badan Pengembangan Sumber Daya Manusia Perhubungan (BPSDM Perhubungan) — Kementerian Perhubungan Republik Indonesia**

> **Dokumen Resmi Arsitektur & Struktur Direktori**  
> Dihasilkan berdasarkan analisis komprehensif menggunakan standar *folder-structure-blueprint-generator*.  
> Terakhir diperbarui: 8 Oktober 2026.

---

## 1. Structural Overview

Platform **CMC Corporate University Kemenhub** dibangun menggunakan arsitektur modern berbasis **Next.js 16+ (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, dan **Framer Motion**.

### Prinsip Utama Organisasi Proyek
1. **Feature-Driven Modular Co-location**:
   Setiap modul atau pilar layanan memiliki direktori komponen dan pustaka data masing-masing (`dashboard/`, `sesi/`, `sertifikat/`, `login/`, `tentang/`).
2. **Kepatuhan Batas Baris Maksimal (`< 350 Lines Rule`)**:
   Seluruh file halaman utama (`page.tsx`) di dalam `src/app/` dibatasi tidak boleh melebihi 350 baris kode. Seluruh logika tampilan, formulir bertahap (stepper), kartu, sidebar, dan modal wajib didekomposisi ke dalam subkomponen modular di `@/components/[feature]/`.
3. **Pemisahan Data State & Mock (`src/lib/*Data.ts`)**:
   Tipe data antarmuka, konstanta regulasi (Permenhub PM 47/2021, UU ASN No. 20/2023), mock data coaching/mentoring, dan audit log disimpan terpisah di `src/lib/` agar komponen tetap murni fokus pada presentasi dan interaksi pengguna.
4. **Sentralisasi Komponen Global (`src/components/common/`)**:
   Elemen navigasi utama (`AppNavbar`, `Navbar`) dan footer institusional (`AppFooter`, `Footer`) dikonsolidasikan dalam `common/` untuk mencegah duplikasi kode di seluruh rute.
5. **Barrel Exports Bersih (`index.ts`)**:
   Setiap subfolder di `src/components/` menyediakan satu titik entri `index.ts` sehingga pemanggilan impor di halaman rapi dan konsisten (contoh: `import { SesiCard, SesiHero } from "@/components/sesi"`).

---

## 2. Directory Visualization

### 2.1 ASCII Tree Representation

```text
cmc/
├── .gitignore                          # Git ignore rules (node_modules, .next, dll.)
├── AGENTS.md                           # Konvensi agen & rules Next.js
├── CLAUDE.md                           # Referensi developer
├── eslint.config.mjs                   # Konfigurasi ESLint 9+
├── next.config.ts                      # Konfigurasi Next.js 16+ (Turbopack)
├── package.json                        # Definisi dependensi & skrip npm
├── package-lock.json                   # Lockfile dependensi
├── postcss.config.mjs                  # Konfigurasi PostCSS Tailwind
├── tsconfig.json                       # Konfigurasi TypeScript & path aliases (@/*)
├── Project_Folders_Structure_Blueprint.md # [DOKUMEN INI] Blueprint arsitektur folder
│
├── public/                             # Static public assets (terakses langsung di web)
│   ├── assets/                         # Aset branding, logo, dan SVG ikon institusional
│   │   ├── kemenhub_hero.png           # Banner resmi Kemenhub
│   │   ├── kemenhub-corpu-logo.png     # Logo Corpu Kemenhub
│   │   └── *.svg / *.png               # Ikon & grafis vektor
│   ├── favicon.ico                     # Favicon portal
│   └── *.svg                           # Template vektor Next.js bawaan
│
└── src/                                # Source code utama aplikasi
    ├── app/                            # Next.js App Router (File-based Routing)
    │   ├── layout.tsx                  # Root HTML layout & font Outfit/Plus Jakarta Sans
    │   ├── globals.css                 # Global CSS tokens & Tailwind imports
    │   ├── page.tsx                    # Landing Page Publik (24 baris)
    │   ├── dashboard/                  # Rute /dashboard
    │   │   └── page.tsx                # Dashboard Eksekutif ASN (233 baris)
    │   ├── login/                      # Rute /login
    │   │   └── page.tsx                # Gateway SSO SIK & Login Mandiri (217 baris)
    │   ├── sertifikat/                 # Rute /sertifikat
    │   │   └── page.tsx                # Portofolio 20 JP & Verifikasi Sertifikat (330 baris)
    │   ├── sesi/                       # Rute /sesi
    │   │   ├── page.tsx                # Manajemen Sesi Aktif, Riwayat, & Filter (327 baris)
    │   │   ├── baru/                   # Rute /sesi/baru
    │   │   │   └── page.tsx            # Form Stepper Catat Sesi Baru 3 Langkah (214 baris)
    │   │   └── detail/                 # Rute /sesi/detail
    │   │       ├── page.tsx            # Detail Sesi, Rincian Pertemuan & Token (184 baris)
    │   │       └── catat/              # Rute /sesi/detail/catat
    │   │           └── page.tsx        # Form Stepper Pelaksanaan Pertemuan (203 baris)
    │   └── tentang/                    # Rute /tentang
    │       └── page.tsx                # Visi, Misi, 3 Pilar, Regulasi, FAQ (29 baris)
    │
    ├── components/                     # Komponen UI Terstruktur per Fitur
    │   ├── index.ts                    # Root Barrel Export untuk seluruh komponen
    │   ├── common/                     # Komponen Bersama Lintas Halaman
    │   │   ├── AppNavbar.tsx           # Navbar terautentikasi (profil, notif, quick search)
    │   │   ├── AppFooter.tsx           # Footer institusional terstandarisasi untuk app
    │   │   ├── Navbar.tsx              # Navbar publik landing page & tentang
    │   │   ├── Footer.tsx              # Footer publik landing page
    │   │   └── index.ts                # Barrel export common
    │   ├── landing/                    # Komponen Landing Page Publik
    │   │   ├── HeroSection.tsx         # Hero banner landing page
    │   │   ├── ServicesSection.tsx     # 3 Pilar: Coaching, Mentoring, Konseling
    │   │   ├── DashboardShowcase.tsx   # Pratinjau interaktif dashboard
    │   │   ├── CaraKerjaSection.tsx    # Diagram alur 4 langkah CMC
    │   │   ├── CtaBanner.tsx           # Call-to-action masuk ke portal
    │   │   └── index.ts                # Barrel export landing
    │   ├── dashboard/                  # Komponen Dashboard Pegawai
    │   │   ├── DashboardHero.tsx       # Hero dashboard & salam personalisasi
    │   │   ├── DashboardAnnouncement.tsx # Pengumuman dismissible
    │   │   ├── DashboardExecutiveJpCard.tsx # Capaian 20 JP & akordeon rincian
    │   │   ├── DashboardLeftColumn.tsx # Donut progress 70%, token pairing, rekomendasi
    │   │   ├── DashboardRightColumn.tsx# Sesi aktif, tindakan diperlukan, akses cepat
    │   │   ├── DashboardTokenModal.tsx # Modal detail token pairing
    │   │   ├── DashboardNewSessionModal.tsx # Modal quick new session
    │   │   ├── DashboardActionModal.tsx# Modal lengkapi catatan komitmen
    │   │   ├── DashboardBreakdownModal.tsx # Modal rincian target 20 JP BKN
    │   │   ├── DashboardCoachFinderModal.tsx # Direktori Coach terakreditasi BPSDM
    │   │   ├── DashboardCertModal.tsx  # Modal pratinjau sertifikat digital
    │   │   ├── DashboardToast.tsx      # Toast feedback interaktif
    │   │   └── index.ts                # Barrel export dashboard
    │   ├── login/                      # Komponen Halaman Otentikasi
    │   │   ├── LoginLeftPanel.tsx      # Showcase dossier & carousel layanan BPSDM
    │   │   ├── LoginForm.tsx           # Form login tabbed (SSO SIK vs NIP/Sandi)
    │   │   ├── LoginFooter.tsx         # Footer halaman login
    │   │   ├── LoginHelpModal.tsx      # Dialog bantuan admin kepegawaian
    │   │   ├── LoginPrivacyModal.tsx   # Dialog kebijakan privasi UU No. 27/2022
    │   │   └── index.ts                # Barrel export login
    │   ├── sesi/                       # Komponen Manajemen Sesi Coaching/Mentoring
    │   │   ├── SesiHero.tsx            # Hero header halaman sesi
    │   │   ├── SesiJpProgressCard.tsx  # Kartu progres JP & batas waktu
    │   │   ├── SesiFilterBar.tsx       # Tab navigasi, pencarian, & filter kategori
    │   │   ├── SesiCard.tsx            # Kartu sesi interaktif (jadwal, status, aksi)
    │   │   ├── SesiEmptyState.tsx      # Tampilan jika pencarian kosong
    │   │   ├── SesiCertModal.tsx       # Modal unduh e-sertifikat sesi
    │   │   ├── SesiFixModal.tsx        # Modal revisi/perbaikan catatan
    │   │   ├── SesiToast.tsx           # Toast notifikasi sesi
    │   │   ├── SesiFooter.tsx          # Wrapper footer sesi (re-export AppFooter)
    │   │   ├── baru/                   # Komponen Form Sesi Baru (/sesi/baru)
    │   │   │   ├── SesiBaruHero.tsx    # Hero header form
    │   │   │   ├── SesiBaruStepper.tsx # Indikator langkah 1-2-3
    │   │   │   ├── Step1DataSesi.tsx   # Form data & kategori sesi
    │   │   │   ├── Step2Pendamping.tsx # Form penugasan Coach & Verifikator
    │   │   │   ├── Step3Konfirmasi.tsx # Ringkasan pra-submit
    │   │   │   ├── SesiBaruSidebar.tsx # Sidebar informasi regulasi JP
    │   │   │   ├── CoachSelectionModal.tsx # Modal pemilih coach
    │   │   │   ├── TokenSuccessModal.tsx # Dialog sukses token pairing
    │   │   │   └── index.ts            # Barrel export sesi/baru
    │   │   ├── detail/                 # Komponen Detail Sesi (/sesi/detail)
    │   │   │   ├── SesiDetailHero.tsx  # Hero detail sesi
    │   │   │   ├── SesiHeaderCard.tsx  # Ringkasan JP & status sesi berjalan
    │   │   │   ├── MeetingListSection.tsx # Daftar pertemuan 1, 2, 3...
    │   │   │   ├── SesiDetailSidebar.tsx # Sidebar info Coach, Verifikator, Token
    │   │   │   ├── MeetingDetailModal.tsx # Modal detail pertemuan
    │   │   │   ├── AddMeetingModal.tsx # Modal tambah pertemuan baru
    │   │   │   ├── FinishSessionModal.tsx # Konfirmasi penutupan sesi
    │   │   │   ├── CancelSessionModal.tsx # Konfirmasi pembatalan sesi
    │   │   │   ├── catat/              # Komponen Catat Pelaksanaan (/sesi/detail/catat)
    │   │   │   │   ├── CatatPertemuanHero.tsx    # Hero header form catat
    │   │   │   │   ├── CatatPertemuanStepper.tsx # Stepper 3 tahap
    │   │   │   │   ├── Step1DataDanTujuan.tsx    # Data waktu, moda, tujuan
    │   │   │   │   ├── Step2Pembahasan.tsx       # Ringkasan diskusi & umpan balik
    │   │   │   │   ├── Step3TindakLanjut.tsx     # Rencana aksi & unggah berkas
    │   │   │   │   ├── CatatPertemuanSidebar.tsx # Sidebar panduan penilaian
    │   │   │   │   ├── CatatSuccessModal.tsx     # Dialog sukses simpan klaim JP
    │   │   │   │   └── index.ts                  # Barrel export sesi/detail/catat
    │   │   │   └── index.ts            # Barrel export sesi/detail
    │   │   └── index.ts                # Barrel export sesi
    │   ├── sertifikat/                 # Komponen Portofolio & Sertifikat
    │   │   ├── SertifikatHero.tsx      # Hero portofolio & sinkronisasi SIASN
    │   │   ├── SertifikatMetrics.tsx   # 4 Kartu statistik JP & jam belajar
    │   │   ├── SertifikatFilterBar.tsx # Filter kategori & dropdown sorting
    │   │   ├── SertifikatGridCard.tsx  # Tampilan kartu grid sertifikat
    │   │   ├── SertifikatListCard.tsx  # Tampilan tabel baris sertifikat
    │   │   ├── SertifikatEmptyState.tsx# Tampilan kosong
    │   │   ├── CertificateModal.tsx    # Modal pratinjau sertifikat ber-barcode
    │   │   ├── CertificateDocument.tsx # Dokumen visual sertifikat resmi
    │   │   ├── CertificateTranscript.tsx # Lampiran transkrip silabus
    │   │   ├── VerifierModal.tsx       # Modal validator keaslian tanda tangan BSrE
    │   │   ├── SiasnSyncModal.tsx      # Modal status sinkronisasi SIASN BKN
    │   │   ├── ExportPortfolioModal.tsx# Modal ekspor PDF portofolio tahunan
    │   │   ├── SertifikatToast.tsx     # Notifikasi toast sertifikat
    │   │   └── index.ts                # Barrel export sertifikat
    │   └── tentang/                    # Komponen Halaman Tentang CMC
    │       ├── TentangHero.tsx         # Hero institutional BPSDM
    │       ├── VisiMisiSection.tsx     # Visi dan Misi Corpu Kemenhub
    │       ├── TigaPilarSection.tsx    # Tab 3 Pilar Layanan
    │       ├── DasarHukumSection.tsx   # Dasar regulasi (PM 47/2021, UU ASN)
    │       ├── AlurPesertaSection.tsx  # 4 Tahap alur peserta
    │       ├── FaqSection.tsx          # Tanya Jawab & akordeon interaktif
    │       └── index.ts                # Barrel export tentang
    │
    ├── lib/                            # Pangkalan Data, Mock States, & Utility
    │   ├── assets.ts                   # Kamus konstanta jalur aset gambar/ikon
    │   ├── dashboardData.ts            # Tipe & mock data sesi dashboard & coach
    │   ├── sessionData.ts              # Tipe & mock data sesi, pertemuan, token
    │   ├── certificateData.ts          # Tipe & mock data sertifikat, validator
    │   ├── loginData.ts                # Slide carousel dossier & akun demo
    │   └── tentangData.ts              # Data FAQ, dasar hukum, alur peserta
    │
    └── types/                          # Definisi Tipe Global TypeScript
        └── index.ts                    # Shared types lintas modul
```

---

## 3. Key Directory Analysis

| Path Direktori | Tujuan & Peran | Konvensi Penamaan | Komponen Kunci |
|---|---|---|---|
| `src/app/` | Routing aplikasi Next.js App Router | Direktori `kebab-case`/lowercase, file `page.tsx` | Seluruh halaman publik & internal (`< 350` baris) |
| `src/components/common/` | UI Bersama (Navigasi & Footer Global) | PascalCase (`AppNavbar.tsx`, `AppFooter.tsx`) | `AppNavbar`, `AppFooter`, `Navbar`, `Footer` |
| `src/components/landing/` | Tampilan publik Landing Page CMC | PascalCase (`HeroSection.tsx`) | 5 Section landing page |
| `src/components/dashboard/` | Komponen halaman dashboard pegawai | PascalCase + prefix `Dashboard*` | Executive JP Card, 2 Kolom, 6 Modal |
| `src/components/login/` | Komponen portal login & SSO | PascalCase + prefix `Login*` | Panel Kiri (Carousel), Form Tabbed, Modals |
| `src/components/sesi/` | Komponen daftar sesi coaching/mentoring | PascalCase + prefix `Sesi*` | Filter bar, JP bar, Session Card, Modals |
| `src/components/sesi/baru/` | Stepper pendaftaran sesi baru | PascalCase (`Step1DataSesi.tsx`) | Form 3 tahap, Stepper, Sidebar info |
| `src/components/sesi/detail/` | Detail sesi dan daftar pertemuan | PascalCase (`MeetingListSection.tsx`) | List pertemuan, Header card, Modals |
| `src/components/sesi/detail/catat/` | Stepper pelaksanaan pertemuan sesi | PascalCase (`Step1DataDanTujuan.tsx`) | Stepper 3 tahap, Form catatan, Dokumen |
| `src/components/sertifikat/` | Portofolio JP & dokumen sertifikat | PascalCase + prefix `Sertifikat*` | Grid/List card, Validator modal, PDF view |
| `src/components/tentang/` | Komponen profil Corpu & FAQ | PascalCase (`TentangHero.tsx`) | Pilar, Regulasi, Alur, FAQ accordion |
| `src/lib/` | Data source, mock state, & utilities | camelCase + suffix `*Data.ts` | `sessionData.ts`, `certificateData.ts`, dll. |
| `public/assets/` | Berkas statis gambar & vektor resmi | snake_case / hash / kebab-case | Logo Corpu, emblem Kemenhub, banner hero |

---

## 4. File Placement Patterns

Untuk menjaga keteraturan repositori dan mempermudah kolaborasi tim:

1. **Routing (`src/app/**/page.tsx`)**:
   - Hanya memuat manajemen state tingkat halaman, routing hook (`useRouter`, `useSearchParams`), inisialisasi query/filter, dan perakitan layout utama.
   - **Dilarang keras**: Menuliskan JSX berulang ratusan baris di dalam `page.tsx`. Wajib memecahnya ke `@/components/[feature]`.
2. **Feature Components (`src/components/[feature]/`)**:
   - Setiap komponen UI yang hanya digunakan pada fitur tertentu harus berada di dalam folder fitur tersebut.
   - Menggunakan direktif `"use client"` di baris paling atas jika menggunakan event handler, state, atau animasi Framer Motion.
3. **Common UI (`src/components/common/`)**:
   - Komponen yang digunakan oleh minimal 2 fitur berbeda dan bersifat layout-level diletakkan di `common/` (`AppNavbar`, `AppFooter`).
4. **Data & Schema (`src/lib/`)**:
   - Seluruh interface data model yang berpasangan dengan dataset default ditempatkan di `src/lib/[feature]Data.ts`.
5. **Assets (`public/assets/`)**:
   - Seluruh aset PNG/SVG/WebP yang diakses melalui URL `/assets/*` harus ditaruh di folder ini dan direferensikan melalui `@/lib/assets.ts`.

---

## 5. Naming and Organization Conventions

* **File Komponen React**: `PascalCase.tsx`  
  Contoh: `DashboardExecutiveJpCard.tsx`, `Step1DataSesi.tsx`, `MeetingListSection.tsx`.
* **File Data / Logic / Helper**: `camelCase.ts`  
  Contoh: `sessionData.ts`, `dashboardData.ts`, `assets.ts`.
* **Direktori Rute**: `kebab-case` atau `lowercase` satu kata  
  Contoh: `sesi/detail/catat/`, `sertifikat/`, `dashboard/`.
* **Export Pattern**:
  - Komponen menggunakan `export function ComponentName(...)` atau `export default function ComponentName(...)`.
  - Folder komponen menyediakan `index.ts` yang mengekspor modul secara publik.
* **Path Aliases**:
  Menggunakan alias absolut bawaan TypeScript `@/*` yang merujuk langsung ke `src/*`:
  - `@/components/common`
  - `@/components/dashboard`
  - `@/components/sesi`
  - `@/components/sertifikat`
  - `@/components/login`
  - `@/components/tentang`
  - `@/lib/*`
  - `@/types/*`

---

## 6. Audit & Status Kepatuhan Garis Kode (`page.tsx`)

Semua halaman berhasil memenuhi aturan `< 350 baris`:

| Halaman | Lokasi Berkas | Baris Saat Ini | Status |
|---|---|:---:|:---:|
| **Landing Page** | [src/app/page.tsx](file:///d:/Webdev/cmc/src/app/page.tsx) | 24 | ✅ Lulus |
| **Tentang CMC** | [src/app/tentang/page.tsx](file:///d:/Webdev/cmc/src/app/tentang/page.tsx) | 29 | ✅ Lulus |
| **Login Gateway** | [src/app/login/page.tsx](file:///d:/Webdev/cmc/src/app/login/page.tsx) | 217 | ✅ Lulus |
| **Catat Sesi Baru** | [src/app/sesi/baru/page.tsx](file:///d:/Webdev/cmc/src/app/sesi/baru/page.tsx) | 214 | ✅ Lulus |
| **Catat Pertemuan** | [src/app/sesi/detail/catat/page.tsx](file:///d:/Webdev/cmc/src/app/sesi/detail/catat/page.tsx) | 203 | ✅ Lulus |
| **Detail Sesi** | [src/app/sesi/detail/page.tsx](file:///d:/Webdev/cmc/src/app/sesi/detail/page.tsx) | 184 | ✅ Lulus |
| **Dashboard** | [src/app/dashboard/page.tsx](file:///d:/Webdev/cmc/src/app/dashboard/page.tsx) | 232 | ✅ Lulus |
| **Daftar Sesi** | [src/app/sesi/page.tsx](file:///d:/Webdev/cmc/src/app/sesi/page.tsx) | 326 | ✅ Lulus |
| **Portofolio Sertifikat** | [src/app/sertifikat/page.tsx](file:///d:/Webdev/cmc/src/app/sertifikat/page.tsx) | 329 | ✅ Lulus |

---

## 7. Structure Templates

### Template 1: Halaman Rute Baru (`src/app/[fitur]/page.tsx`)
```tsx
"use client";

import { useState } from "react";
import { AppNavbar, AppFooter } from "@/components/common";
import { FiturHero, FiturMainSection } from "@/components/[fitur]";

export default function FiturPage() {
  const [data, setData] = useState([]);

  return (
    <div className="min-h-dvh w-full bg-[#f7f9fb] text-[#0f172a] font-sans flex flex-col justify-between">
      <AppNavbar />
      <FiturHero />
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-16 flex-1 w-full">
        <FiturMainSection data={data} />
      </main>
      <AppFooter />
    </div>
  );
}
```

### Template 2: Subkomponen Presentasi Baru (`src/components/[fitur]/[NamaKomponen].tsx`)
```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface NamaKomponenProps {
  title: string;
  onAction?: () => void;
}

export function NamaKomponen({ title, onAction }: NamaKomponenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-[#e2e6eb] rounded-[10px] p-5 shadow-xs"
    >
      <h3 className="font-bold text-[#0f172a] text-[15px]">{title}</h3>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-3 px-4 py-2 rounded-lg bg-[#0a2540] text-white text-xs font-semibold"
        >
          Aksi
        </button>
      )}
    </motion.div>
  );
}
```

### Template 3: Modal Interaktif Baru (`src/components/[fitur]/[NamaModal].tsx`)
```tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NamaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function NamaModal({ isOpen, onClose, onConfirm }: NamaModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header & Body */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-[#0f172a] text-sm">Judul Modal</h3>
              <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">Deskripsi interaksi modal...</p>
            {/* Footer Buttons */}
            <div className="flex gap-2.5 mt-5">
              <button type="button" onClick={onConfirm} className="flex-1 py-2 rounded-lg bg-[#0a2540] text-white text-xs font-bold">
                Konfirmasi
              </button>
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                Batal
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## 8. Structure Enforcement & Verification

1. **Type Checking Otomatis**:
   ```bash
   npx tsc --noEmit
   # Menghasilkan exit code 0 tanpa satupun error tipe.
   ```
2. **Production Build Verification**:
   ```bash
   npm run build
   # Menghasilkan berkas optimasi Next.js Turbopack 12/12 rute statis secara sempurna.
   ```
3. **Skrip Pengecekan Baris Kode Otomatis**:
   ```bash
   node -e "const fs = require('fs'); const glob = (dir) => { let res = []; for(const f of fs.readdirSync(dir, {withFileTypes: true})) { const p = dir + '/' + f.name; if(f.isDirectory()) res = res.concat(glob(p)); else if(f.name === 'page.tsx') res.push(p); } return res; }; const files = glob('src/app'); files.sort(); files.forEach(f => { const lines = fs.readFileSync(f, 'utf8').split('\n').length; console.log(String(lines).padStart(4), (lines <= 350 ? '✓ PASS' : '✗ FAIL (>350)'), f); });"
   ```

---
*CMC Corporate University Kementerian Perhubungan RI — Blueprint Arsitektur Folder v1.0*
