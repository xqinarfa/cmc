-- Migration 000007: Create reference tables for Eselon, Satuan Kerja, and Unit Kerja

-- 1. Table: ref_eselon
CREATE TABLE IF NOT EXISTS ref_eselon (
    id VARCHAR(50) PRIMARY KEY,
    kode VARCHAR(50) NOT NULL UNIQUE,
    nama VARCHAR(100) NOT NULL,
    level INT NOT NULL,
    deskripsi TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ref_eselon_level ON ref_eselon(level);

-- 2. Table: ref_satuan_kerja
CREATE TABLE IF NOT EXISTS ref_satuan_kerja (
    id VARCHAR(50) PRIMARY KEY,
    kode VARCHAR(50) NOT NULL UNIQUE,
    nama VARCHAR(255) NOT NULL,
    singkatan VARCHAR(50),
    instansi_induk VARCHAR(255) DEFAULT 'Kementerian Perhubungan',
    alamat TEXT,
    telepon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ref_satker_nama ON ref_satuan_kerja(nama);

-- 3. Table: ref_unit_kerja
CREATE TABLE IF NOT EXISTS ref_unit_kerja (
    id VARCHAR(100) PRIMARY KEY,
    kode VARCHAR(50) NOT NULL UNIQUE,
    nama VARCHAR(255) NOT NULL,
    satuan_kerja_id VARCHAR(50) REFERENCES ref_satuan_kerja(id) ON DELETE CASCADE,
    satuan_kerja_nama VARCHAR(255) NOT NULL,
    eselon VARCHAR(50),
    lokasi VARCHAR(255),
    alamat TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ref_unit_kerja_satker ON ref_unit_kerja(satuan_kerja_id);
CREATE INDEX IF NOT EXISTS idx_ref_unit_kerja_nama ON ref_unit_kerja(nama);

-- 4. Seed initial Eselon data
INSERT INTO ref_eselon (id, kode, nama, level, deskripsi) VALUES
('eselon_1', 'I', 'Eselon I', 1, 'Jabatan Pimpinan Tinggi Madya (Sekretaris Jenderal, Direktur Jenderal, Kepala Badan, Inspektur Jenderal)'),
('eselon_2', 'II', 'Eselon II', 2, 'Jabatan Pimpinan Tinggi Pratama (Kepala Pusat, Direktur, Kepala Biro, Sekretaris Badan, Kepala Balai Besar)'),
('eselon_3', 'III', 'Eselon III', 3, 'Jabatan Administrator (Kepala Bagian, Kepala Bidang, Kepala Balai)'),
('eselon_4', 'IV', 'Eselon IV', 4, 'Jabatan Pengawas (Kepala Subbagian, Kepala Seksi)'),
('non_eselon', 'NON', 'Non-Eselon', 99, 'Jabatan Fungsional Tertentu (Widyaiswara, Dosen, Analis SDM, Inspektur), Fungsional Umum, Pelaksana, dan Staf Teknis')
ON CONFLICT (id) DO UPDATE SET
    nama = EXCLUDED.nama,
    level = EXCLUDED.level,
    deskripsi = EXCLUDED.deskripsi,
    updated_at = CURRENT_TIMESTAMP;

-- 5. Seed initial Satuan Kerja data
INSERT INTO ref_satuan_kerja (id, kode, nama, singkatan, instansi_induk, alamat, telepon) VALUES
('bpsdm', 'BPSDM', 'BPSDM Perhubungan', 'BPSDM', 'Kementerian Perhubungan', 'Jl. Medan Merdeka Timur No. 5, Jakarta Pusat', '(021) 3456585'),
('setjen', 'SETJEN', 'Sekretariat Jenderal', 'SETJEN', 'Kementerian Perhubungan', 'Jl. Medan Merdeka Barat No. 8, Jakarta Pusat', '(021) 3811308'),
('itjen', 'ITJEN', 'Inspektorat Jenderal', 'ITJEN', 'Kementerian Perhubungan', 'Jl. Medan Merdeka Barat No. 8, Jakarta Pusat', '(021) 3811308'),
('hubdat', 'HUBDAT', 'Ditjen Perhubungan Darat', 'DITJEN HUBDAT', 'Kementerian Perhubungan', 'Gedung Karya Kemenhub, Jl. Medan Merdeka Barat No. 8, Jakarta Pusat', '(021) 3506138'),
('hubla', 'HUBLA', 'Ditjen Perhubungan Laut', 'DITJEN HUBLA', 'Kementerian Perhubungan', 'Jl. Medan Merdeka Timur No. 5, Jakarta Pusat', '(021) 3813269'),
('hubud', 'HUBUD', 'Ditjen Perhubungan Udara', 'DITJEN HUBUD', 'Kementerian Perhubungan', 'Gedung Karya Kemenhub, Jl. Medan Merdeka Barat No. 8, Jakarta Pusat', '(021) 3505550'),
('djka', 'DJKA', 'Ditjen Perkeretaapian', 'DJKA', 'Kementerian Perhubungan', 'Gedung Karya Kemenhub, Jl. Medan Merdeka Barat No. 8, Jakarta Pusat', '(021) 3505550'),
('bkt', 'BKT', 'Badan Kebijakan Transportasi', 'BKT', 'Kementerian Perhubungan', 'Jl. Medan Merdeka Timur No. 5, Jakarta Pusat', '(021) 34832960'),
('bptj', 'BPTJ', 'Badan Pengelola Transportasi Jabodetabek', 'BPTJ', 'Kementerian Perhubungan', 'Jl. MT Haryono Kav. 45-46, Jakarta Selatan', '(021) 80878100')
ON CONFLICT (id) DO UPDATE SET
    nama = EXCLUDED.nama,
    singkatan = EXCLUDED.singkatan,
    updated_at = CURRENT_TIMESTAMP;

-- 6. Seed initial Unit Kerja data
INSERT INTO ref_unit_kerja (id, kode, nama, satuan_kerja_id, satuan_kerja_nama, eselon, lokasi, alamat) VALUES
('pusbang-aparatur', 'BPSDM-PUSBANG-APARATUR', 'Pusbang SDM Aparatur Perhubungan', 'bpsdm', 'BPSDM Perhubungan', 'Eselon II', 'Bogor', 'Jl. Raya Parung-Bogor KM. 26, Kemang, Bogor, Jawa Barat'),
('pusbang-darat', 'BPSDM-PUSBANG-DARAT', 'Pusbang SDM Perhubungan Darat', 'bpsdm', 'BPSDM Perhubungan', 'Eselon II', 'Salatiga', 'Jl. Soekarno-Hatta No. 25, Salatiga, Jawa Tengah'),
('pusbang-laut', 'BPSDM-PUSBANG-LAUT', 'Pusbang SDM Perhubungan Laut', 'bpsdm', 'BPSDM Perhubungan', 'Eselon II', 'Jakarta Utara', 'Jl. Gunung Sahari No. 79, Jakarta Pusat'),
('pusbang-udara', 'BPSDM-PUSBANG-UDARA', 'Pusbang SDM Perhubungan Udara', 'bpsdm', 'BPSDM Perhubungan', 'Eselon II', 'Tangerang', 'Jl. Raya Curug, Legok, Tangerang, Banten'),
('pusdatin-bpsdm', 'BPSDM-PUSDATIN', 'Pusat Data dan Informasi & BPSDM Perhubungan', 'bpsdm', 'BPSDM Perhubungan', 'Eselon II', 'Jakarta Pusat', 'Jl. Medan Merdeka Timur No. 5, Jakarta Pusat'),
('kepegawaian-tu-bpsdm', 'BPSDM-BAG-KEPEGAWAIAN', 'Bagian Kepegawaian & Tata Usaha BPSDM', 'bpsdm', 'BPSDM Perhubungan', 'Eselon III', 'Jakarta Pusat', 'Jl. Medan Merdeka Timur No. 5, Jakarta Pusat'),
('biro-kepegawaian', 'SETJEN-ROPEG', 'Biro Kepegawaian dan Organisasi', 'setjen', 'Sekretariat Jenderal', 'Eselon II', 'Jakarta Pusat', 'Jl. Medan Merdeka Barat No. 8, Jakarta Pusat'),
('biro-hukum', 'SETJEN-ROKUM', 'Biro Hukum', 'setjen', 'Sekretariat Jenderal', 'Eselon II', 'Jakarta Pusat', 'Jl. Medan Merdeka Barat No. 8, Jakarta Pusat'),
('biro-kip', 'SETJEN-ROKIP', 'Biro Komunikasi dan Informasi Publik', 'setjen', 'Sekretariat Jenderal', 'Eselon II', 'Jakarta Pusat', 'Jl. Medan Merdeka Barat No. 8, Jakarta Pusat'),
('bptd-jabar', 'HUBDAT-BPTD-JABAR', 'Balai Pengelola Transportasi Darat Kelas II Jawa Barat', 'hubdat', 'Ditjen Perhubungan Darat', 'Eselon III', 'Bandung', 'Jl. Soekarno-Hatta No. 560, Bandung, Jawa Barat'),
('bptd-jateng', 'HUBDAT-BPTD-JATENG', 'Balai Pengelola Transportasi Darat Kelas II Jawa Tengah', 'hubdat', 'Ditjen Perhubungan Darat', 'Eselon III', 'Semarang', 'Jl. Siliwangi No. 504, Semarang, Jawa Tengah'),
('kplp', 'HUBLA-DIR-KPLP', 'Direktorat Kesatuan Penjagaan Laut dan Pantai', 'hubla', 'Ditjen Perhubungan Laut', 'Eselon II', 'Jakarta Utara', 'Jl. Medan Merdeka Timur No. 5, Jakarta Pusat'),
('sekretariat-bkt', 'BKT-SEKRETARIAT', 'Sekretariat Badan Kebijakan Transportasi', 'bkt', 'Badan Kebijakan Transportasi', 'Eselon II', 'Jakarta Pusat', 'Jl. Medan Merdeka Timur No. 5, Jakarta Pusat')
ON CONFLICT (id) DO UPDATE SET
    nama = EXCLUDED.nama,
    satuan_kerja_id = EXCLUDED.satuan_kerja_id,
    satuan_kerja_nama = EXCLUDED.satuan_kerja_nama,
    eselon = EXCLUDED.eselon,
    lokasi = EXCLUDED.lokasi,
    updated_at = CURRENT_TIMESTAMP;

