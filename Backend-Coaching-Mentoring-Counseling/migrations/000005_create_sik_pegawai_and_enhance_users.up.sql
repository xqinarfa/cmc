-- Migration: Create SIK Pegawai table and enhance Users table with SIK attributes

-- 1. Enhance users table with comprehensive SIK employee attributes
ALTER TABLE users ADD COLUMN IF NOT EXISTS gelar_depan VARCHAR(50);
ALTER TABLE users ADD COLUMN IF NOT EXISTS gelar_belakang VARCHAR(50);
ALTER TABLE users ADD COLUMN IF NOT EXISTS tempat_lahir VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS tanggal_lahir VARCHAR(50);
ALTER TABLE users ADD COLUMN IF NOT EXISTS jenis_kelamin VARCHAR(20);
ALTER TABLE users ADD COLUMN IF NOT EXISTS agama VARCHAR(50);
ALTER TABLE users ADD COLUMN IF NOT EXISTS jabatan VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS jenis_jabatan VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS pangkat_golongan VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS unit_kerja VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS satuan_kerja VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS instansi_induk VARCHAR(255) DEFAULT 'Kementerian Perhubungan';
ALTER TABLE users ADD COLUMN IF NOT EXISTS eselon VARCHAR(50);
ALTER TABLE users ADD COLUMN IF NOT EXISTS status_kepegawaian VARCHAR(50) DEFAULT 'PNS';
ALTER TABLE users ADD COLUMN IF NOT EXISTS pendidikan_terakhir VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS atasan_langsung_nip VARCHAR(50);
ALTER TABLE users ADD COLUMN IF NOT EXISTS atasan_langsung_nama VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS atasan_langsung_jabatan VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS masa_kerja_tahun INT DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS masa_kerja_bulan INT DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS sik_synced_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS sik_data JSONB;

-- 2. Create SIK Pegawai (HRIS Master Registry) table
CREATE TABLE IF NOT EXISTS sik_pegawai (
    nip VARCHAR(50) PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    gelar_depan VARCHAR(50),
    gelar_belakang VARCHAR(50),
    tempat_lahir VARCHAR(100),
    tanggal_lahir VARCHAR(50),
    jenis_kelamin VARCHAR(20),
    agama VARCHAR(50),
    status_perkawinan VARCHAR(50),
    email_dinas VARCHAR(255),
    email_pribadi VARCHAR(255),
    no_hp VARCHAR(50),
    status_kepegawaian VARCHAR(50) DEFAULT 'PNS',
    pangkat VARCHAR(100),
    golongan_ruang VARCHAR(20),
    jabatan VARCHAR(255),
    jenis_jabatan VARCHAR(100),
    eselon VARCHAR(50),
    unit_kerja VARCHAR(255),
    satuan_kerja VARCHAR(255),
    instansi_induk VARCHAR(255) DEFAULT 'Kementerian Perhubungan',
    lokasi_kerja VARCHAR(255),
    pendidikan_terakhir VARCHAR(255),
    jurusan VARCHAR(255),
    nama_sekolah VARCHAR(255),
    tahun_lulus INT,
    foto_url VARCHAR(512),
    atasan_langsung_nip VARCHAR(50),
    atasan_langsung_nama VARCHAR(255),
    atasan_langsung_jabatan VARCHAR(255),
    masa_kerja_tahun INT DEFAULT 0,
    masa_kerja_bulan INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sik_pegawai_nama ON sik_pegawai(nama);
CREATE INDEX IF NOT EXISTS idx_sik_pegawai_unit_kerja ON sik_pegawai(unit_kerja);
CREATE INDEX IF NOT EXISTS idx_sik_pegawai_satuan_kerja ON sik_pegawai(satuan_kerja);

-- 3. Seed initial official SIK Kemenhub employee registry
INSERT INTO sik_pegawai (
    nip, nama, gelar_depan, gelar_belakang, tempat_lahir, tanggal_lahir, jenis_kelamin, agama, status_perkawinan,
    email_dinas, email_pribadi, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, satuan_kerja, instansi_induk, lokasi_kerja, pendidikan_terakhir, jurusan, nama_sekolah, tahun_lulus,
    foto_url, atasan_langsung_nip, atasan_langsung_nama, atasan_langsung_jabatan, masa_kerja_tahun, masa_kerja_bulan
) VALUES 
(
    '198903072010121008', 'Wahid Mahmudi', NULL, 'S.Kom., M.T.I.', 'Jakarta', '1989-03-07', 'Laki-laki', 'Islam', 'Menikah',
    'wahid_mahmudi@kemenhub.go.id', 'wahid.mahmudi@gmail.com', '081234567890', 'PNS', 'Penata Tk. I', 'III/d',
    'Analis SDM Aparatur Ahli Muda', 'Fungsional Tertentu', 'Non-Eselon',
    'Sekretariat Badan Kebijakan Transportasi', 'Badan Kebijakan Transportasi', 'Kementerian Perhubungan', 'Jakarta Pusat',
    'S2 Teknologi Informasi', 'Sistem Informasi', 'Universitas Indonesia', 2016,
    '/assets/avatars/wahid.png', '197508201999031002', 'Drs. Bambang Sudarsono, M.M.', 'Kepala Bagian Kepegawaian & Umum', 14, 2
),
(
    '198904122014031002', 'Siti Wahyuni', NULL, 'S.E.', 'Semarang', '1989-04-12', 'Perempuan', 'Islam', 'Menikah',
    'siti.wahyuni@dephub.go.id', 'siti.wahyuni89@gmail.com', '081388992211', 'PNS', 'Penata Muda Tk. I', 'III/b',
    'Analis SDM Aparatur Ahli Pertama', 'Fungsional Tertentu', 'Non-Eselon',
    'Balai Pengelola Transportasi Darat Kelas II Jawa Barat', 'Ditjen Perhubungan Darat', 'Kementerian Perhubungan', 'Bandung',
    'S1 Ekonomi Manajemen', 'Manajemen SDM', 'Universitas Diponegoro', 2012,
    '/assets/avatars/siti.png', '197805152003121001', 'Rudi Setiawan, S.T., M.T.', 'Koordinator Subtansi Pengembangan SDM', 10, 8
),
(
    '197805152003121001', 'Rudi Setiawan', NULL, 'S.T., M.T.', 'Surabaya', '1978-05-15', 'Laki-laki', 'Islam', 'Menikah',
    'rudi.setiawan@dephub.go.id', 'rudi.setiawan@gmail.com', '081122334455', 'PNS', 'Pembina Tk. I', 'IV/b',
    'Widyaiswara Ahli Madya (Coach Eksekutif)', 'Fungsional Tertentu', 'Non-Eselon',
    'Pusbang SDM Aparatur Perhubungan', 'BPSDM Perhubungan', 'Kementerian Perhubungan', 'Bogor',
    'S2 Teknik Transportasi', 'Perencanaan Transportasi', 'Institut Teknologi Bandung', 2008,
    '/assets/avatars/rudi.png', '196803121994031001', 'Ir. Hendra Gunawan, M.Sc.', 'Kepala Pusat Pengembangan SDM Aparatur', 21, 5
),
(
    '198203152005012001', 'Sari Wulandari', 'Dr.', 'M.Sc.', 'Yogyakarta', '1982-03-15', 'Perempuan', 'Islam', 'Menikah',
    'sari.wulandari@dephub.go.id', 'sari.wulandari@yahoo.com', '081299887766', 'PNS', 'Pembina', 'IV/a',
    'Analis Kebijakan Ahli Madya (Mentor Senior)', 'Fungsional Tertentu', 'Non-Eselon',
    'Biro Kepegawaian dan Organisasi', 'Sekretariat Jenderal', 'Kementerian Perhubungan', 'Jakarta Pusat',
    'S3 Kebijakan Publik', 'Manajemen Kebijakan Transportasi', 'Universitas Gadjah Mada', 2018,
    '/assets/avatars/sari.png', '196912011995031002', 'Dr. Ir. Wahyu Triatmo, M.M.', 'Kepala Biro Kepegawaian & Organisasi', 19, 10
),
(
    '197506182001121002', 'Ahmad Hidayat', 'Ir.', 'M.T.', 'Makassar', '1975-06-18', 'Laki-laki', 'Islam', 'Menikah',
    'ahmad.hidayat@dephub.go.id', 'ahmad.hidayat@gmail.com', '081377889900', 'PNS', 'Pembina Utama Muda', 'IV/c',
    'Inspektur Kelautan Ahli Utama (Coach Maritim)', 'Fungsional Tertentu', 'Non-Eselon',
    'Direktorat Kesatuan Penjagaan Laut dan Pantai', 'Ditjen Perhubungan Laut', 'Kementerian Perhubungan', 'Jakarta Utara',
    'S2 Teknik Kelautan', 'Keselamatan Maritim', 'Institut Teknologi Sepuluh Nopember', 2006,
    '/assets/avatars/ahmad.png', '196705101992031001', 'Capt. Tri Handoko, M.Mar.', 'Direktur KPLP', 23, 11
),
(
    '198009222006041001', 'Rudi Santoso', NULL, 'M.M.', 'Malang', '1980-09-22', 'Laki-laki', 'Islam', 'Menikah',
    'rudi.santoso@dephub.go.id', 'rudi.santoso@gmail.com', '081233445566', 'PNS', 'Pembina', 'IV/a',
    'Widyaiswara Ahli Muda (Coach Kepemimpinan)', 'Fungsional Tertentu', 'Non-Eselon',
    'Pusbang SDM Perhubungan Darat', 'BPSDM Perhubungan', 'Kementerian Perhubungan', 'Salatiga',
    'S2 Magister Manajemen', 'Manajemen Strategis SDM', 'Universitas Brawijaya', 2011,
    '/assets/avatars/rudi_s.png', '197304151998031003', 'Dr. Ir. Subagyo, M.T.', 'Kepala Pusbang SDM Perhubungan Darat', 18, 7
),
(
    '197211051998031001', 'Budi Hartono', 'Dr.', 'M.Si.', 'Solo', '1972-11-05', 'Laki-laki', 'Islam', 'Menikah',
    'budi.hartono@dephub.go.id', 'budi.hartono@gmail.com', '081155667788', 'PNS', 'Pembina Tk. I', 'IV/b',
    'Kepala Bagian Tata Usaha (Mentor Organisasi)', 'Struktural', 'III.a',
    'Sekretariat Badan Pengembangan SDM Perhubungan', 'BPSDM Perhubungan', 'Kementerian Perhubungan', 'Jakarta Pusat',
    'S3 Ilmu Administrasi', 'Administrasi Publik', 'Universitas Indonesia', 2015,
    '/assets/avatars/budi_h.png', '196602141991031001', 'Dr. Ir. Anton Sukmono, M.Sc.', 'Sekretaris BPSDM Perhubungan', 26, 8
),
(
    '198501102008012003', 'Maya Kusuma', 'Dra.', 'M.Psi.', 'Bandung', '1985-01-10', 'Perempuan', 'Islam', 'Menikah',
    'maya.kusuma@dephub.go.id', 'maya.kusuma@gmail.com', '081244556677', 'PNS', 'Penata Tk. I', 'III/d',
    'Psikolog Klinis Ahli Muda (Konselor Pegawai)', 'Fungsional Tertentu', 'Non-Eselon',
    'Pusbang SDM Aparatur Perhubungan', 'BPSDM Perhubungan', 'Kementerian Perhubungan', 'Bogor',
    'S2 Profesi Psikologi Klinis', 'Psikologi Industri & Organisasi', 'Universitas Padjadjaran', 2010,
    '/assets/avatars/maya.png', '197805152003121001', 'Rudi Setiawan, S.T., M.T.', 'Koordinator Konseling & Assessment', 16, 10
),
(
    '199105202015031003', 'Andi Pratama', NULL, 'S.Si.T.', 'Palembang', '1991-05-20', 'Laki-laki', 'Islam', 'Belum Menikah',
    'andi.pratama@dephub.go.id', 'andi.pratama91@gmail.com', '081355443322', 'PNS', 'Penata Muda', 'III/a',
    'Pengelola Keselamatan Transportasi Darat', 'Fungsional Umum / Pelaksana', 'Non-Eselon',
    'Balai Pengelola Transportasi Darat Kelas II Jawa Barat', 'Ditjen Perhubungan Darat', 'Kementerian Perhubungan', 'Bandung',
    'D-IV Transportasi Darat', 'Lalu Lintas Angkutan Jalan', 'Politeknik Transportasi Darat Indonesia (STTD)', 2014,
    '/assets/avatars/andi.png', '198904122014031002', 'Siti Wahyuni, S.E.', 'Kepala Seksi Sarana & Prasarana BPTD', 9, 8
)
ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    unit_kerja = EXCLUDED.unit_kerja,
    satuan_kerja = EXCLUDED.satuan_kerja,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    atasan_langsung_nip = EXCLUDED.atasan_langsung_nip,
    atasan_langsung_nama = EXCLUDED.atasan_langsung_nama,
    atasan_langsung_jabatan = EXCLUDED.atasan_langsung_jabatan,
    updated_at = CURRENT_TIMESTAMP;

-- 4. Sync SIK attributes directly into existing users in users table
UPDATE users u
SET 
    full_name = sp.nama,
    gelar_depan = sp.gelar_depan,
    gelar_belakang = sp.gelar_belakang,
    tempat_lahir = sp.tempat_lahir,
    tanggal_lahir = sp.tanggal_lahir,
    jenis_kelamin = sp.jenis_kelamin,
    agama = sp.agama,
    jabatan = sp.jabatan,
    jenis_jabatan = sp.jenis_jabatan,
    pangkat_golongan = CONCAT(sp.pangkat, ' (', sp.golongan_ruang, ')'),
    unit_kerja = sp.unit_kerja,
    satuan_kerja = sp.satuan_kerja,
    instansi_induk = sp.instansi_induk,
    eselon = sp.eselon,
    status_kepegawaian = sp.status_kepegawaian,
    pendidikan_terakhir = sp.pendidikan_terakhir,
    phone = COALESCE(sp.no_hp, u.phone),
    atasan_langsung_nip = sp.atasan_langsung_nip,
    atasan_langsung_nama = sp.atasan_langsung_nama,
    atasan_langsung_jabatan = sp.atasan_langsung_jabatan,
    masa_kerja_tahun = sp.masa_kerja_tahun,
    masa_kerja_bulan = sp.masa_kerja_bulan,
    sik_synced_at = CURRENT_TIMESTAMP,
    sik_data = to_jsonb(sp)
FROM sik_pegawai sp
WHERE u.nip = sp.nip;

