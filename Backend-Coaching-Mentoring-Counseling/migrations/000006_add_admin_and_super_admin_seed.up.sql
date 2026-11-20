-- Migration 000006: Add seed accounts for Super Admin and Admin with SIK integration

-- 1. Insert into sik_pegawai master
INSERT INTO sik_pegawai (
    nip, nama, gelar_depan, gelar_belakang, tempat_lahir, tanggal_lahir, jenis_kelamin, agama, status_perkawinan,
    email_dinas, email_pribadi, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, satuan_kerja, instansi_induk, lokasi_kerja, pendidikan_terakhir, jurusan, nama_sekolah, tahun_lulus,
    foto_url, atasan_langsung_nip, atasan_langsung_nama, atasan_langsung_jabatan, masa_kerja_tahun, masa_kerja_bulan
) VALUES
(
    '197001011990031001', 'Super Administrator BPSDM', 'Dr. Ir.', 'M.Eng., IPU', 'Jakarta', '1970-01-01', 'Laki-laki', 'Islam', 'Menikah',
    'superadmin@dephub.go.id', 'superadmin@gmail.com', '081100000001', 'PNS', 'Pembina Utama', 'IV/e',
    'Administrator Utama Sistem CMC & SIK', 'Struktural / Administrator Sistem', 'Eselon I',
    'Pusat Data dan Informasi & BPSDM Perhubungan', 'BPSDM Perhubungan', 'Kementerian Perhubungan', 'Jakarta Pusat',
    'S3 Information Systems', 'Teknik Informatika & Sistem Komputer', 'Institut Teknologi Bandung', 2005,
    '/assets/avatars/superadmin.png', NULL, NULL, NULL, 34, 8
),
(
    '197502021995031002', 'Admin BPSDM Perhubungan', NULL, 'S.Sos., M.M.', 'Yogyakarta', '1975-02-02', 'Laki-laki', 'Islam', 'Menikah',
    'admin@dephub.go.id', 'admin.bpsdm@gmail.com', '081100000002', 'PNS', 'Pembina', 'IV/a',
    'Pengelola Program Coaching & Mentoring', 'Fungsional Umum / Admin Layanan', 'Non-Eselon',
    'Bagian Kepegawaian & Tata Usaha BPSDM', 'BPSDM Perhubungan', 'Kementerian Perhubungan', 'Jakarta Pusat',
    'S2 Manajemen SDM Aparatur', 'Manajemen Publik', 'Universitas Gadjah Mada', 2010,
    '/assets/avatars/admin.png', '197211051998031001', 'Budi Hartono, S.H., M.H.', 'Kepala Bagian Tata Usaha BPSDM', 29, 7
)
ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    unit_kerja = EXCLUDED.unit_kerja,
    satuan_kerja = EXCLUDED.satuan_kerja,
    updated_at = CURRENT_TIMESTAMP;

-- 2. Insert into users table
INSERT INTO users (
    id, nip, email, password_hash, full_name, role, phone, avatar_url, provider, is_active,
    gelar_depan, gelar_belakang, tempat_lahir, tanggal_lahir, jenis_kelamin, agama,
    jabatan, jenis_jabatan, pangkat_golongan, unit_kerja, satuan_kerja, instansi_induk,
    eselon, status_kepegawaian, pendidikan_terakhir, atasan_langsung_nip, atasan_langsung_nama, atasan_langsung_jabatan,
    masa_kerja_tahun, masa_kerja_bulan, sik_synced_at, sik_data
) VALUES
(
    'c0000000-0000-0000-0000-000000000001',
    '197001011990031001',
    'superadmin@dephub.go.id',
    '$2a$12$tVNAE0aRKR/.aLMjmPtTeO1adufzTy8FIKcByu0yvKNeuMTm0Eh0a', -- RahasiaKemenhub2026!
    'Super Administrator BPSDM',
    'super_admin',
    '081100000001',
    '/assets/avatars/superadmin.png',
    'LOCAL',
    true,
    'Dr. Ir.', 'M.Eng., IPU', 'Jakarta', '1970-01-01', 'Laki-laki', 'Islam',
    'Administrator Utama Sistem CMC & SIK', 'Struktural / Administrator Sistem', 'Pembina Utama (IV/e)',
    'Pusat Data dan Informasi & BPSDM Perhubungan', 'BPSDM Perhubungan', 'Kementerian Perhubungan',
    'Eselon I', 'PNS', 'S3 Information Systems', NULL, NULL, NULL,
    34, 8, CURRENT_TIMESTAMP,
    '{"nip":"197001011990031001","nama":"Super Administrator BPSDM","role":"super_admin","unit_kerja":"Pusat Data dan Informasi & BPSDM Perhubungan"}'::jsonb
),
(
    'c0000000-0000-0000-0000-000000000002',
    '197502021995031002',
    'admin@dephub.go.id',
    '$2a$12$tVNAE0aRKR/.aLMjmPtTeO1adufzTy8FIKcByu0yvKNeuMTm0Eh0a', -- RahasiaKemenhub2026!
    'Admin BPSDM Perhubungan',
    'admin',
    '081100000002',
    '/assets/avatars/admin.png',
    'LOCAL',
    true,
    NULL, 'S.Sos., M.M.', 'Yogyakarta', '1975-02-02', 'Laki-laki', 'Islam',
    'Pengelola Program Coaching & Mentoring', 'Fungsional Umum / Admin Layanan', 'Pembina (IV/a)',
    'Bagian Kepegawaian & Tata Usaha BPSDM', 'BPSDM Perhubungan', 'Kementerian Perhubungan',
    'Non-Eselon', 'PNS', 'S2 Manajemen SDM Aparatur', '197211051998031001', 'Budi Hartono, S.H., M.H.', 'Kepala Bagian Tata Usaha BPSDM',
    29, 7, CURRENT_TIMESTAMP,
    '{"nip":"197502021995031002","nama":"Admin BPSDM Perhubungan","role":"admin","unit_kerja":"Bagian Kepegawaian & Tata Usaha BPSDM"}'::jsonb
)
ON CONFLICT (email) DO UPDATE SET
    role = EXCLUDED.role,
    nip = EXCLUDED.nip,
    jabatan = EXCLUDED.jabatan,
    unit_kerja = EXCLUDED.unit_kerja,
    satuan_kerja = EXCLUDED.satuan_kerja,
    updated_at = CURRENT_TIMESTAMP;

