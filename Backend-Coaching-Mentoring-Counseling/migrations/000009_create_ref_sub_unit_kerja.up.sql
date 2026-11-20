-- Migration 000009: Create ref_sub_unit_kerja table and add sub_unit_kerja to users and sik_pegawai

-- 1. Add sub_unit_kerja columns to users and sik_pegawai
ALTER TABLE users ADD COLUMN IF NOT EXISTS sub_unit_kerja VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS sub_unit_kerja_kode VARCHAR(100);

ALTER TABLE sik_pegawai ADD COLUMN IF NOT EXISTS sub_unit_kerja VARCHAR(255);
ALTER TABLE sik_pegawai ADD COLUMN IF NOT EXISTS sub_unit_kerja_kode VARCHAR(100);

CREATE INDEX IF NOT EXISTS idx_sik_pegawai_sub_unit ON sik_pegawai(sub_unit_kerja);
CREATE INDEX IF NOT EXISTS idx_sik_pegawai_sub_unit_kode ON sik_pegawai(sub_unit_kerja_kode);

-- 2. Create Table: ref_sub_unit_kerja
CREATE TABLE IF NOT EXISTS ref_sub_unit_kerja (
    id VARCHAR(100) PRIMARY KEY,
    kode VARCHAR(100) NOT NULL UNIQUE,
    nama VARCHAR(255) NOT NULL,
    unit_kerja_id VARCHAR(100) NOT NULL REFERENCES ref_unit_kerja(id) ON DELETE CASCADE,
    unit_kerja_nama VARCHAR(255) NOT NULL,
    satuan_kerja_id VARCHAR(50) REFERENCES ref_satuan_kerja(id) ON DELETE CASCADE,
    satuan_kerja_nama VARCHAR(255),
    deskripsi TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ref_sub_unit_kode ON ref_sub_unit_kerja(kode);
CREATE INDEX IF NOT EXISTS idx_ref_sub_unit_unit ON ref_sub_unit_kerja(unit_kerja_id);
CREATE INDEX IF NOT EXISTS idx_ref_sub_unit_satker ON ref_sub_unit_kerja(satuan_kerja_id);
CREATE INDEX IF NOT EXISTS idx_ref_sub_unit_nama ON ref_sub_unit_kerja(nama);

-- 3. Seed initial Sub Unit Kerja data under Unit Kerja
INSERT INTO ref_sub_unit_kerja (id, kode, nama, unit_kerja_id, unit_kerja_nama, satuan_kerja_id, satuan_kerja_nama, deskripsi) VALUES
-- Pusbang SDM Aparatur Perhubungan (BPSDM-PUSBANG-APARATUR)
('bpsdm-pusbang-aparatur-tu', 'BPSDM-PUSBANG-APARATUR-TU', 'Subbagian Tata Usaha & Rumah Tangga', 'pusbang-aparatur', 'Pusbang SDM Aparatur Perhubungan', 'bpsdm', 'BPSDM Perhubungan', 'Pengelolaan tata usaha, kepegawaian internal, keuangan, dan perlengkapan.'),
('bpsdm-pusbang-aparatur-prog', 'BPSDM-PUSBANG-APARATUR-PROG', 'Bidang Program dan Kerjasama', 'pusbang-aparatur', 'Pusbang SDM Aparatur Perhubungan', 'bpsdm', 'BPSDM Perhubungan', 'Penyusunan kurikulum, perencanaan program pengembangan kompetensi ASN, dan kemitraan.'),
('bpsdm-pusbang-aparatur-lat', 'BPSDM-PUSBANG-APARATUR-LAT', 'Bidang Penyelenggaraan Pelatihan dan Asesmen', 'pusbang-aparatur', 'Pusbang SDM Aparatur Perhubungan', 'bpsdm', 'BPSDM Perhubungan', 'Pelaksanaan diklat kepemimpinan, coaching, mentoring, counseling, serta uji kompetensi.'),

-- Pusbang SDM Perhubungan Darat (BPSDM-PUSBANG-DARAT)
('bpsdm-pusbang-darat-tu', 'BPSDM-PUSBANG-DARAT-TU', 'Subbagian Tata Usaha', 'pusbang-darat', 'Pusbang SDM Perhubungan Darat', 'bpsdm', 'BPSDM Perhubungan', 'Tata kelola administrasi dan operasional kantor.'),
('bpsdm-pusbang-darat-lat', 'BPSDM-PUSBANG-DARAT-LAT', 'Bidang Pelatihan Transportasi Darat', 'pusbang-darat', 'Pusbang SDM Perhubungan Darat', 'bpsdm', 'BPSDM Perhubungan', 'Pengembangan kompetensi teknis matra darat dan perkeretaapian.'),

-- Pusbang SDM Perhubungan Laut (BPSDM-PUSBANG-LAUT)
('bpsdm-pusbang-laut-tu', 'BPSDM-PUSBANG-LAUT-TU', 'Subbagian Tata Usaha', 'pusbang-laut', 'Pusbang SDM Perhubungan Laut', 'bpsdm', 'BPSDM Perhubungan', 'Administrasi kepegawaian dan perlengkapan matra laut.'),
('bpsdm-pusbang-laut-lat', 'BPSDM-PUSBANG-LAUT-LAT', 'Bidang Pelatihan Transportasi Laut', 'pusbang-laut', 'Pusbang SDM Perhubungan Laut', 'bpsdm', 'BPSDM Perhubungan', 'Pelatihan kepelautan, keselamatan pelayaran, dan sertifikasi IMO.'),

-- Pusbang SDM Perhubungan Udara (BPSDM-PUSBANG-UDARA)
('bpsdm-pusbang-udara-tu', 'BPSDM-PUSBANG-UDARA-TU', 'Subbagian Tata Usaha', 'pusbang-udara', 'Pusbang SDM Perhubungan Udara', 'bpsdm', 'BPSDM Perhubungan', 'Administrasi kantor dan tata usaha kedirgantaraan.'),
('bpsdm-pusbang-udara-lat', 'BPSDM-PUSBANG-UDARA-LAT', 'Bidang Pelatihan Penerbangan', 'pusbang-udara', 'Pusbang SDM Perhubungan Udara', 'bpsdm', 'BPSDM Perhubungan', 'Pelatihan navigasi, kebandarudaraan, dan kelaikudaraan ICAO.'),

-- Pusdatin BPSDM (BPSDM-PUSDATIN)
('bpsdm-pusdatin-tu', 'BPSDM-PUSDATIN-TU', 'Subbagian Tata Usaha Pusdatin', 'pusdatin-bpsdm', 'Pusat Data dan Informasi & BPSDM Perhubungan', 'bpsdm', 'BPSDM Perhubungan', 'Tata usaha pusat data dan layanan administrasi.'),
('bpsdm-pusdatin-ti', 'BPSDM-PUSDATIN-TI', 'Subbidang Infrastruktur & Tata Kelola IT', 'pusdatin-bpsdm', 'Pusat Data dan Informasi & BPSDM Perhubungan', 'bpsdm', 'BPSDM Perhubungan', 'Manajemen server, jaringan komunikasi data, dan keamanan siber.'),
('bpsdm-pusdatin-app', 'BPSDM-PUSDATIN-APP', 'Subbidang Aplikasi & Integrasi Sistem', 'pusdatin-bpsdm', 'Pusat Data dan Informasi & BPSDM Perhubungan', 'bpsdm', 'BPSDM Perhubungan', 'Pengembangan aplikasi portal, SSO HubNet, dan integrasi API kepegawaian.'),

-- Bagian Kepegawaian & Tata Usaha BPSDM (BPSDM-BAG-KEPEGAWAIAN)
('bpsdm-bag-peg-subbag-peg', 'BPSDM-BAG-KEP-SUBBAG-PEG', 'Subbagian Mutasi dan Pengembangan Karir', 'kepegawaian-tu-bpsdm', 'Bagian Kepegawaian & Tata Usaha BPSDM', 'bpsdm', 'BPSDM Perhubungan', 'Pelayanan mutasi, kenaikan pangkat, dan pengembangan talenta internal BPSDM.'),
('bpsdm-bag-peg-subbag-tu', 'BPSDM-BAG-KEP-SUBBAG-TU', 'Subbagian Tata Usaha Pimpinan & Protokoler', 'kepegawaian-tu-bpsdm', 'Bagian Kepegawaian & Tata Usaha BPSDM', 'bpsdm', 'BPSDM Perhubungan', 'Tata usaha pimpinan dan urusan rumah tangga kantor pusat BPSDM.'),

-- Biro Kepegawaian dan Organisasi Setjen (SETJEN-ROPEG)
('setjen-ropeg-bag-perencanaan', 'SETJEN-ROPEG-BAG-PERENCANAAN', 'Bagian Perencanaan dan Formasi Pegawai', 'biro-kepegawaian', 'Biro Kepegawaian dan Organisasi', 'setjen', 'Sekretariat Jenderal', 'Penyusunan peta kebutuhan formasi ASN Kementerian Perhubungan.'),
('setjen-ropeg-bag-pengembangan', 'SETJEN-ROPEG-BAG-PENGEMBANGAN', 'Bagian Pengembangan Karir dan Kinerja Pegawai', 'biro-kepegawaian', 'Biro Kepegawaian dan Organisasi', 'setjen', 'Sekretariat Jenderal', 'Manajemen talenta, asesmen kinerja ASN, pembinaan profesi, dan program CMC.'),
('setjen-ropeg-bag-mutasi', 'SETJEN-ROPEG-BAG-MUTASI', 'Bagian Mutasi, Kepangkatan, dan Disiplin', 'biro-kepegawaian', 'Biro Kepegawaian dan Organisasi', 'setjen', 'Sekretariat Jenderal', 'Layanan SK mutasi nasional, kepangkatan terpadu, dan penegakan kode etik ASN.'),
('setjen-ropeg-bag-tu', 'SETJEN-ROPEG-BAG-TU', 'Subbagian Tata Usaha Biro Kepegawaian', 'biro-kepegawaian', 'Biro Kepegawaian dan Organisasi', 'setjen', 'Sekretariat Jenderal', 'Administrasi surat menyurat dan tata kelola internal biro.'),

-- Biro Hukum Setjen (SETJEN-ROKUM)
('setjen-rokum-bag-peraturan', 'SETJEN-ROKUM-BAG-PERATURAN', 'Bagian Rancangan Peraturan Perundang-undangan', 'biro-hukum', 'Biro Hukum', 'setjen', 'Sekretariat Jenderal', 'Harmonisasi regulasi transportasi nasional.'),
('setjen-rokum-bag-advokasi', 'SETJEN-ROKUM-BAG-ADVOKASI', 'Bagian Advokasi dan Bantuan Hukum', 'biro-hukum', 'Biro Hukum', 'setjen', 'Sekretariat Jenderal', 'Pendampingan hukum dan konsultasi perkara perhubungan.'),

-- Biro Komunikasi dan Informasi Publik (SETJEN-ROKIP)
('setjen-rokip-bag-berita', 'SETJEN-ROKIP-BAG-BERITA', 'Bagian Pemberitaan dan Media Komunikasi', 'biro-kip', 'Biro Komunikasi dan Informasi Publik', 'setjen', 'Sekretariat Jenderal', 'Publikasi kebijakan perhubungan dan manajemen media massa.'),
('setjen-rokip-bag-lembaga', 'SETJEN-ROKIP-BAG-LEMBAGA', 'Bagian Hubungan Antar Lembaga', 'biro-kip', 'Biro Komunikasi dan Informasi Publik', 'setjen', 'Sekretariat Jenderal', 'Kemitraan strategis instansi pemerintah dan stakeholder publik.'),

-- BPTD Kelas II Jawa Barat (HUBDAT-BPTD-JABAR)
('hubdat-bptd-jabar-tu', 'HUBDAT-BPTD-JABAR-TU', 'Subbagian Tata Usaha BPTD Jabar', 'bptd-jabar', 'Balai Pengelola Transportasi Darat Kelas II Jawa Barat', 'hubdat', 'Ditjen Perhubungan Darat', 'Administrasi kepegawaian dan umum BPTD Jawa Barat.'),
('hubdat-bptd-jabar-sarana', 'HUBDAT-BPTD-JABAR-SARANA', 'Seksi Sarana dan Prasarana Transportasi Jalan', 'bptd-jabar', 'Balai Pengelola Transportasi Darat Kelas II Jawa Barat', 'hubdat', 'Ditjen Perhubungan Darat', 'Pengawasan terminal, jembatan timbang, dan fasilitas keselamatan jalan.'),
('hubdat-bptd-jabar-lalin', 'HUBDAT-BPTD-JABAR-LALIN', 'Seksi Lalu Lintas Jalan, Sungai, Danau dan Penyeberangan', 'bptd-jabar', 'Balai Pengelola Transportasi Darat Kelas II Jawa Barat', 'hubdat', 'Ditjen Perhubungan Darat', 'Manajemen operasional transportasi penyeberangan dan rekayasa lalin.'),

-- BPTD Kelas II Jawa Tengah (HUBDAT-BPTD-JATENG)
('hubdat-bptd-jateng-tu', 'HUBDAT-BPTD-JATENG-TU', 'Subbagian Tata Usaha BPTD Jateng', 'bptd-jateng', 'Balai Pengelola Transportasi Darat Kelas II Jawa Tengah', 'hubdat', 'Ditjen Perhubungan Darat', 'Administrasi tata usaha BPTD Jawa Tengah.'),
('hubdat-bptd-jateng-sarana', 'HUBDAT-BPTD-JATENG-SARANA', 'Seksi Sarana dan Prasarana Transportasi Jalan', 'bptd-jateng', 'Balai Pengelola Transportasi Darat Kelas II Jawa Tengah', 'hubdat', 'Ditjen Perhubungan Darat', 'Penyelenggaraan inspeksi sarana dan prasarana transportasi darat.'),

-- KPLP Hubla (HUBLA-DIR-KPLP)
('hubla-dir-kplp-patroli', 'HUBLA-DIR-KPLP-PATROLI', 'Subdirektorat Patroli dan Pengamanan', 'kplp', 'Direktorat Kesatuan Penjagaan Laut dan Pantai', 'hubla', 'Ditjen Perhubungan Laut', 'Patroli kedaulatan laut dan penertiban kapal berlayar.'),
('hubla-dir-kplp-gakkum', 'HUBLA-DIR-KPLP-GAKKUM', 'Subdirektorat Penegakan Hukum dan Advokasi Pelayaran', 'kplp', 'Direktorat Kesatuan Penjagaan Laut dan Pantai', 'hubla', 'Ditjen Perhubungan Laut', 'Penyidikan kecelakaan kapal dan pelanggaran maritim.'),

-- Sekretariat BKT (BKT-SEKRETARIAT)
('bkt-sekretariat-tu', 'BKT-SEKRETARIAT-TU', 'Subbagian Tata Usaha dan Kepegawaian', 'sekretariat-bkt', 'Sekretariat Badan Kebijakan Transportasi', 'bkt', 'Badan Kebijakan Transportasi', 'Tata usaha dan manajemen SDM Badan Kebijakan Transportasi.'),
('bkt-sekretariat-prog', 'BKT-SEKRETARIAT-PROG', 'Bagian Program, Anggaran dan Evaluasi Kebijakan', 'sekretariat-bkt', 'Sekretariat Badan Kebijakan Transportasi', 'bkt', 'Badan Kebijakan Transportasi', 'Penyusunan rekomendasi dan analisis dampak kebijakan transportasi.')
ON CONFLICT (id) DO UPDATE SET
    kode = EXCLUDED.kode,
    nama = EXCLUDED.nama,
    unit_kerja_id = EXCLUDED.unit_kerja_id,
    unit_kerja_nama = EXCLUDED.unit_kerja_nama,
    satuan_kerja_id = EXCLUDED.satuan_kerja_id,
    satuan_kerja_nama = EXCLUDED.satuan_kerja_nama,
    deskripsi = EXCLUDED.deskripsi,
    updated_at = CURRENT_TIMESTAMP;

-- 4. Map existing seed employees to realistic sub_unit_kerja
UPDATE sik_pegawai SET 
    sub_unit_kerja = 'Bidang Penyelenggaraan Pelatihan dan Asesmen',
    sub_unit_kerja_kode = 'BPSDM-PUSBANG-APARATUR-LAT'
WHERE nip IN ('198501102008012003', '197805152003121001');

UPDATE sik_pegawai SET 
    sub_unit_kerja = 'Bidang Pelatihan Transportasi Darat',
    sub_unit_kerja_kode = 'BPSDM-PUSBANG-DARAT-LAT'
WHERE nip = '198009222006041001';

UPDATE sik_pegawai SET 
    sub_unit_kerja = 'Subbagian Tata Usaha BPTD Jabar',
    sub_unit_kerja_kode = 'HUBDAT-BPTD-JABAR-TU'
WHERE nip = '198904122014031002';

UPDATE sik_pegawai SET 
    sub_unit_kerja = 'Bagian Pengembangan Karir dan Kinerja Pegawai',
    sub_unit_kerja_kode = 'SETJEN-ROPEG-BAG-PENGEMBANGAN'
WHERE nip = '197506182001121002';

UPDATE sik_pegawai SET 
    sub_unit_kerja = 'Seksi Sarana dan Prasarana Transportasi Jalan',
    sub_unit_kerja_kode = 'HUBDAT-BPTD-JABAR-SARANA'
WHERE nip = '199208202016021001';

-- Update matching users
UPDATE users u SET 
    sub_unit_kerja = sp.sub_unit_kerja,
    sub_unit_kerja_kode = sp.sub_unit_kerja_kode
FROM sik_pegawai sp
WHERE u.nip = sp.nip AND sp.sub_unit_kerja IS NOT NULL;

