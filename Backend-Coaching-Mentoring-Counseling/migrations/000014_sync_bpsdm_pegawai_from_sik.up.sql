-- Migration 000014: Sync all BPSDM offices (Aparatur, Darat, Laut, Udara) to match SIK sync history

-- Office: Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan (008006000000000) - 146 items
INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197806182002121006', 'Dr. ALI FIKRI, SH. M.Kn', 'Brebes', '1978-06-18', 'L',
    'ali_fikri@kemenhub.go.id', '085216075917', 'PNS', 'Pembina Utama Muda', 'IV/c', 'Kepala Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Struktural', 'II.a',
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-3', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197209081998032002', 'DELIS DEWIYANTI, S SOS', 'MAGELANG', '1972-09-08', 'P',
    'delis_dewiyanti@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina', 'IV/a', 'Kepala Bidang Pendidikan dan Pelatihan Manajerial', 'Struktural', 'III.a',
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198303012009122005', 'PUTI HANDAYANI, S.E., M.M.Tr.', 'MEDAN', '1983-03-01', 'P',
    'puti_handayani@kemenhub.go.id', '082177077719', 'PNS', 'Pembina', 'IV/a', 'Kepala Bidang Pendidikan dan Pelatihan Struktural dan Fungsional', 'Struktural', 'III.a',
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Struktural dan Fungsional', '008006003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198406202006041004', 'IBNU ROMADHONA, ST, M.Sc', 'BEKASI', '1984-06-20', 'L',
    'ibnu_romadhona@kemenhub.go.id', '082133033084', 'PNS', 'Pembina', 'IV/a', 'Kepala Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', 'Struktural', 'III.a',
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198510282007121001', 'ANDHI KURNIAWAN, S.H., M.H', 'Yogyakarta', '1985-10-28', 'L',
    'andhi_kurniawan@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina', 'IV/a', 'Kepala Bagian Umum', 'Struktural', 'III.a',
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198608312023211001', 'GUNAWAN, S.Kep., Ners', 'KANDOA', '1986-08-31', 'L',
    'gunawan31@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan X', 'X', 'Perawat Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'Profesi', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199606072023211008', 'KHAIRURIZKI PRABOWO, S.Stat.', 'Bandung', '1996-06-07', 'L',
    'khairurizki_prabowo@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan IX', 'IX', 'Statistisi Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199103022023211027', 'ANGGI PRATAMA, S.Kom', 'Bogor', '1991-03-02', 'L',
    'anggi_pratama@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan IX', 'IX', 'Pranata Komputer Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199112222023212034', 'SANTI ANALISKA, S.I.Kom', 'Bogor', '1991-12-22', 'P',
    'santi_analiska@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan IX', 'IX', 'Pranata Hubungan Masyarakat Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198201052025211015', 'YANUAR SETYADJI, S.Kom', 'JAKARTA', '1982-01-05', 'L',
    'yanuar_setyadji@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198601012025212044', 'DINI RATNA MULIA, S.Psi', 'BANDUNG', '1986-01-01', 'P',
    'dini_mulia@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Struktural dan Fungsional', '008006003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199007202025211033', 'JENI ANDANI, S.E', 'JAKARTA', '1990-07-20', 'L',
    'jeni_andani@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199402042025211022', 'DHIKA ARDIANSYAH, S.E.', 'SUMEDANG', '1994-02-04', 'L',
    'dhika_ardiansyah@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Struktural dan Fungsional', '008006003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199610232025211013', 'ARI IQBAL ALFIAN, S.Kom', 'BOGOR', '1996-10-23', 'L',
    'ari_alfian@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199704082025212015', 'INDAH CITRA, S.AP', 'BOGOR', '1997-04-08', 'P',
    'indah_citra@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Struktural dan Fungsional', '008006003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199711122025211017', 'RIO ANDREASTO, S.E.', 'JAKARTA', '1997-11-12', 'L',
    'rio_andreasto@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198911102023212063', 'SYIFA FAUZIAH, A.md', 'Bogor', '1989-11-10', 'P',
    'syifa_fauziah@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan VII', 'VII', 'Arsiparis Terampil', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199105042023211029', 'INDRA ARDIANSYAH, A. Md', 'Pandeglang', '1991-05-04', 'L',
    'indra_ardiansyah@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan VII', 'VII', 'Pranata Komputer Terampil', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198607212024212010', 'UCEU YULIAWATI, AMKG', 'KUNINGAN', '1986-07-21', 'P',
    'uceu_yuliawati@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan VII', 'VII', 'Terapis Gigi dan Mulut Terampil', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198306212025212013', 'RISMAWATI', 'BOGOR', '1983-06-21', 'P',
    'rismawati2106@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA Kejuruan', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198509082025211022', 'SURYONO', 'NGAWI', '1985-09-08', 'L',
    'suryono0809@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198809132025211022', 'KEVIEN ARLAN', 'BOGOR', '1988-09-13', 'L',
    'kevien_arlan@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198812202025211020', 'DEWANDA PRAJA LEKSANA', 'JAKARTA', '1988-12-20', 'L',
    'dewanda_leksana@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199205212025212021', 'RESTI NOUR DIANAH', 'BOGOR', '1992-05-21', 'P',
    'resti_dianah@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198903232025211029', 'ARDI', 'BOGOR', '1989-03-23', 'L',
    'ardi2303@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan III', 'III', 'Pengelola Umum Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTP', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197808062025211031', 'SANDY RAHADI AGUSTIAN', 'Jakarta', '1978-08-06', 'L',
    'sandy_agustian@kemenhub.go.id', '0251-7540094', 'PPPK', 'Golongan I', 'I', 'Pengelola Umum Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'Sekolah Dasar', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '196203051988031002', 'SUGENG WIBOWO, MM', 'TULUNGAGUNG', '1962-03-05', 'L',
    'sugeng_wibowo@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina Utama Madya', 'IV/d', 'Widyaiswara Ahli Utama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197402161996021001', 'Dr PUNGKAS HENDRATMOKO, S.SIT, M. Mtr', 'JAKARTA', '1974-02-16', 'L',
    'pungkas_hendratmoko@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina Utama Muda', 'IV/c', 'Widyaiswara Ahli Madya', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-3', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '196804291991121001', 'DANI ARDANI, ST, M.Si', 'BOGOR', '1968-04-29', 'L',
    'dani_ardani@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina Utama Muda', 'IV/c', 'Widyaiswara Ahli Madya', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198010152006042002', 'dr SOFI ADHANI RAHMAWATI', 'SEMARANG', '1980-10-15', 'P',
    'sofi_adhani@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina Utama Muda', 'IV/c', 'Dokter Ahli Madya', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'Profesi', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197505282005022001', 'EKO YUNI SUSANTI, S.Sos,.M.M.Tr.', 'KARANGANYAR', '1975-05-28', 'P',
    'eko_yuni@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina Utama Muda', 'IV/c', 'Widyaiswara Ahli Madya', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '196701131993032001', 'BANDIAH, S.Pd., M.Si.', 'JAKARTA', '1967-01-13', 'P',
    'bandiah@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina Utama Muda', 'IV/c', 'Widyaiswara Ahli Madya', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '196710221990031001', 'OCTADIAN PRATIWANGGONO, ATD,.M.T', 'BANDUNG', '1967-10-22', 'L',
    'octadian_pratiwanggono@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina Utama Muda', 'IV/c', 'Widyaiswara Ahli Madya', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198409162008121001', 'YOHANES NUGRAHA, S.Or.,M.MTr', 'GUNUNG KIDUL', '1984-09-16', 'L',
    'yohanes_nugraha@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina Utama Muda', 'IV/c', 'Widyaiswara Ahli Madya', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198201192005021001', 'ADE DARMAWAN PELLO, M.Pd, S.SI.T', 'KUPANG', '1982-01-19', 'L',
    'ade_darmawan@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina Utama Muda', 'IV/c', 'Widyaiswara Ahli Madya', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197511221999031002', 'SYAMSUDDIN, S.SiT,MT', 'LAMONGAN', '1975-11-22', 'L',
    'syamsuddin2211@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina Utama Muda', 'IV/c', 'Widyaiswara Ahli Madya', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198601222008121001', 'Dr. YANUAR WIJAYANTO, S.Pd. M.T', 'BOGOR', '1986-01-22', 'L',
    'yanuar_wijayanto@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina Utama Muda', 'IV/c', 'Widyaiswara Ahli Madya', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-3', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197010161993011001', 'YOHANES DARSONO, S.Si.T., M.M.Tr.', 'KLATEN', '1970-10-16', 'L',
    'yohanes_darsono@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina Tingkat I', 'IV/b', 'Widyaiswara Ahli Madya', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '196907221992021001', 'GAGUK YULIYANTO, M.Eng.', 'RENGEL', '1969-07-22', 'L',
    'gaguk_yuliyanto@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina Tingkat I', 'IV/b', 'Widyaiswara Ahli Madya', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '196803101996031001', 'Dr. MOH NURUL IMAN, S.E., M.T.', 'MAGETAN', '1968-03-10', 'L',
    'moh_nurul@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina Tingkat I', 'IV/b', 'Widyaiswara Ahli Madya', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-3', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197111091997032002', 'SULISTIYORINI, SE, M.Si', 'PATI', '1971-11-09', 'P',
    'sulistiyorini@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina', 'IV/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Struktural dan Fungsional', '008006003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197709212002122005', 'RIZKI ARYANTI, SE, M.M.', 'Palembang', '1977-09-21', 'P',
    'rizky_aryanti@kemenhub.go.id', '08127193246', 'PNS', 'Pembina', 'IV/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197103141993011002', 'GANDA RUSMANA, S.SiT, MM', 'TANGERANG', '1971-03-14', 'L',
    'ganda_rusmana@dephub.go.id', '081317015287', 'PNS', 'Pembina', 'IV/a', 'Analis Sumber Daya Manusia Aparatur Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197710292006041001', 'SYAMSUL RIZAL, S.Kom, M.AP', 'JAKARTA', '1977-10-29', 'L',
    'syamsul_rizal@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina', 'IV/a', 'Widyaiswara Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197705152002122001', 'EVA SRI RAHAYUNINGSIH, ST. MM.', 'JAKARTA', '1977-05-15', 'P',
    'eva_sri@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina', 'IV/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198101032005022001', 'INDRIANINGTYAS PANCAWARDHANY, SH M.H.', 'SURABAYA', '1981-01-03', 'P',
    'indrianingtyas_pancawardhany@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina', 'IV/a', 'Widyaiswara Ahli Madya', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197902252008121002', 'WAHYU HENDRO WICAKSONO, S.Pd, M.Pd', 'JAKARTA', '1979-02-25', 'L',
    'wahyu_hendro@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina', 'IV/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197705122008122001', 'R DEWI SANTIN S. HADJI DJAFAR, SE, M.Si', 'BITUNG', '1977-05-12', 'P',
    'r_dewi@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina', 'IV/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198307082009121006', 'HARRY MURWANTO, ST, M.M.', 'JAKARTA', '1983-07-08', 'L',
    'harry_murwanto@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina', 'IV/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Struktural dan Fungsional', '008006003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197010082003121001', 'SUWARMAN, S.Mn., M.Si.', 'SUMEDANG', '1970-10-08', 'L',
    'suwarman@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina', 'IV/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '196903191989031004', 'SURYADI, S.SiT, S. Si.T', 'JAKARTA', '1969-03-19', 'L',
    'suryadi@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Struktural dan Fungsional', '008006003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197202012005021001', 'ANGGORO MUKTI BAHINI, S.PD', 'JAKARTA', '1972-02-01', 'L',
    'anggoro_mukti@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197211122005021001', 'IMAM TRI MINDARYANTO, S.Pd', 'JAKARTA', '1972-11-12', 'L',
    'imam_tri@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198211242005021001', 'HARIS ALFENDI, S.SI.T', 'KULON PROGO', '1982-11-24', 'L',
    'haris_alfendi@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Struktural dan Fungsional', '008006003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198305132005022001', 'MARTHA WINANTI, S.AP', 'JAKARTA', '1983-05-13', 'P',
    'martha_winanti@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198002212009121001', 'TITOK TISKIANTO, SE', 'JAKARTA', '1980-02-21', 'L',
    'titok_tiskianto@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198608052009121004', 'WAJIH DWIHADI, S.S.', 'SURAKARTA', '1986-08-05', 'L',
    'wajih_dwihadi@kemenhub.go.id', '082138705580', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198201072003121004', 'DWI SAPTO ERISTYO, SE', 'JAKARTA', '1982-01-07', 'L',
    'dwi_sapto@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197505101998031002', 'HASANUDIN, SE', 'BOGOR', '1975-05-10', 'L',
    'hasanudin@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198406302010122001', 'IDA FITRIANA, SE, M.Si', 'SURABAYA', '1984-06-30', 'P',
    'ida_fitriana@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198604262010122004', 'LUSI FIBRIANI MANIK, S.Si.T, M.Si', 'Medan', '1986-04-26', 'P',
    'lusi_fibriani@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198604292015031004', 'KASYFUL HADI, S.T., M.Sc.', 'CIANJUR', '1986-04-29', 'L',
    'kasyful_hadi@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Arsiparis Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198612282010121001', 'ARDIAN HIDAYAT, S.Pd, M.Pd.', 'KUDUS', '1986-12-28', 'L',
    'ardian_hidayat@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Pengembang Teknologi Pembelajaran Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Struktural dan Fungsional', '008006003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198704022010122003', 'RACHMAWATI NURCAHYANI, S.Psi M.T. M.T.', 'Purworejo', '1987-04-02', 'P',
    'rachmawati_nurcahyani@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Widyaiswara Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198710182010122004', 'IRENA FATYA, SE, M.Si', 'JAKARTA', '1987-10-18', 'P',
    'irena_fatya@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Struktural dan Fungsional', '008006003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197301062003121001', 'DODI SAPUTRA, SE', 'JAKARTA', '1973-01-06', 'L',
    'dodi_saputra@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198105172015032001', 'dr AMITIA PUTRI', 'BUKITTINGGI', '1981-05-17', 'P',
    'amitia_putri@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Dokter Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198304072005022001', 'PUSPA ERDIANA, A.Md', 'JAKARTA', '1983-04-07', 'P',
    'puspa_erdiana@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Perawat Penyelia', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198408252010122006', 'ADHANI EKOWATI, S.Psi, M.Si.Psi', 'SEMARANG', '1984-08-25', 'P',
    'adhani_ekowati@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Widyaiswara Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198610202010122007', 'INDAH IMAYANTI, S.T., M.T', 'SEMARANG', '1986-10-20', 'P',
    'indah_imayanti@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Pranata Hubungan Masyarakat Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198105102005021001', 'ISWANDI, S.AP, M.Si', 'MARIANA', '1981-05-10', 'L',
    'iswandi@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197810052009121001', 'SUMARNO, SE', 'JAKARTA', '1978-10-05', 'L',
    'sumarno0510@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Struktural dan Fungsional', '008006003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198407142006042001', 'NUR HIDAYATI, A.Md', 'Pekalongan', '1984-07-14', 'P',
    'nur_hidayati@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Pranata Komputer Penyelia', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198703192006042001', 'USWATUN HASANAH, S.Sos', 'Tangerang', '1987-03-19', 'P',
    'uswatun_hasanah@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Pranata Hubungan Masyarakat Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199012152019021001', 'ALVIAN GUNTUR PERDANA KUSUMA, S.T., MM', 'PACITAN', '1990-12-15', 'L',
    'alvian_kusuma@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Tingkat I', 'III/d', 'Widyaiswara Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197508231996022001', 'LINDAWATI', 'BOGOR', '1975-08-23', 'P',
    'lindawati@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Struktural dan Fungsional', '008006003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-II', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197911142005022001', 'RUMONDANG LUMBANTORUAN, A.Mk', 'MANDUAMAS', '1979-11-14', 'P',
    'rumondang_lumban@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata', 'III/c', 'Perawat Mahir', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197707071998031003', 'MUHAMAD IHSAN', 'JAKARTA', '1977-07-07', 'L',
    'muhamad_ihsan@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197607312006042001', 'MARMIYATI KUNTARI, A.Md', 'KULON PROGO', '1976-07-31', 'P',
    'marmiyati_kuntari@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198402162006042001', 'LETDI SETYONINGSIH SUROSO, A.Md', 'KENDAL', '1984-02-16', 'P',
    'letdi_setyoningsih@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198610062015032001', 'RIZKY NADIARTI, S.Psi, M.Sc.', 'JAKARTA', '1986-10-06', 'P',
    'rizky_nadiartiI@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198006262009122001', 'HERNA JUNETTE HELENA, S.AP, M.Si', 'MEDAN', '1980-06-26', 'P',
    'herna_junette@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198903072010121008', 'WAHID MAHMUDI, SE, MS ASM', 'BOGOR', '1989-03-07', 'L',
    'wahid_mahmudi@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199102042019022004', 'RIMA FEBRINA, S.Si., M.S.M.', 'BANDUNG', '1991-02-04', 'P',
    'rima_febrina@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata', 'III/c', 'Widyaiswara Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198505292008121001', 'ADITYA RAHADI, A.Md', 'DENPASAR', '1985-05-29', 'L',
    'aditya_rahadi@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198901172019022001', 'SHALLY ALPRIANY AISYAH, M.M.', 'SUKABUMI', '1989-01-17', 'P',
    'shally_aisyah@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata', 'III/c', 'Widyaiswara Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198611302006041002', 'TIGOR MUKRIANTA, S.E. M.Si', 'KEDIRI', '1986-11-30', 'L',
    'tigor_mukrianta@kemenhub.go.id', '081111111166', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198611112009121003', 'ABRAHAM N.B PADEDA', 'SIKKA', '1986-11-11', 'L',
    'abraham_nongflory@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199509262018011003', 'AHMAD FAJAR ZUBAIDI, S.S.T (TD)', 'TULUNGAGUNG', '1995-09-26', 'L',
    'ahmad_zubaidi@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198512082020121002', 'ATAR KOSWARA R., S.T., M.Sc.', 'UJUNG PANDANG', '1985-12-08', 'L',
    'atar_r@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata', 'III/c', 'Widyaiswara Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', '008006000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197106011992032001', 'EVY ANDRIANY', 'JAKARTA', '1971-06-01', 'P',
    'evy_andriany@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197104131995011001', 'SJACHRUDIN', 'Tangerang', '1971-04-13', 'L',
    'sjachrudin@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-II', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197911051998032001', 'NOVIA WIDYASTUTY', 'JAKARTA', '1979-11-05', 'P',
    'novia_widyastuti@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198507012019022003', 'drg HILMA ZIDNIA', 'JAKARTA', '1985-07-01', 'P',
    'hilma_zidnia@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Dokter Gigi Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'Profesi', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197503251997031001', 'ACU RUDI HARYONO', 'SUMEDANG', '1975-03-25', 'L',
    'acu_rudi@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198806112009122003', 'RAHMAWATI, A.Md, S.Kom.', 'BOGOR', '1988-06-11', 'P',
    'rahmawati1106@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Pranata Keuangan APBN Mahir', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198508032010121004', 'WAHYU MAHENDRA, A.Md', 'Karanganyar', '1985-08-03', 'L',
    'wahyu_mahendra@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198603302010121003', 'KURNIAWAN SOFIANTO, A.Md', 'PURWOREJO', '1986-03-30', 'L',
    'kurniawan_sofianto@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197209031992031002', 'MUHAMMAD NURHADIS', 'Jakarta', '1972-09-03', 'L',
    'muhamad_nurhadis@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199503082019021002', 'BAYU SUARDIKA, S.S.T (TD), M.Sc.', 'DEPOK', '1995-03-08', 'L',
    'bayu_suardika@kemenhub.go.id', '081338383065', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197012021998031001', 'ASEP SUPARMAN', 'BOGOR', '1970-12-02', 'L',
    'asep_suparman@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Struktural dan Fungsional', '008006003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199602122019021002', 'FRANS HALEN TODO SITUNGKIR, S.S.T (TD).', 'PEMATANG SIANTAR', '1996-02-12', 'L',
    'frans_situngkir@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199403302025052001', 'DESY YANTY COBENA MANURUNG, M.Pd', 'SIMALUNGUN', '1994-03-30', 'P',
    'desy_manurung@kemenhub.go.id', '089602761798', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Widyaiswara Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199405212025051001', 'MATTHIAS PAMOSO DIWANGKORO, S.Psi., M.A', 'YOGYAKARTA', '1994-05-21', 'L',
    'matthias_diwangkoro@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Widyaiswara Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199508222025052001', 'NURUL LAILATUL BADRIYAH, S.Pd., M.Pd.', 'SUKOHARJO', '1995-08-22', 'P',
    'nurul_badriyah@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Widyaiswara Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199509072025051001', 'AGUNG BAYU DEWO BROTO, S.Kel., M.H.', 'CIREBON', '1995-09-07', 'L',
    'agung_broto@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Widyaiswara Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199703262025051005', 'ERIQ DWI YULIANTO, M.Eng', 'SAMARINDA', '1997-03-26', 'L',
    'eriq_yulianto@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Widyaiswara Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Struktural dan Fungsional', '008006003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198205022005021001', 'KATENU, S.E.', 'PONOROGO', '1982-05-02', 'L',
    'katenu@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198206122005021001', 'HARI SUSANTO', 'GUNUNG KIDUL', '1982-06-12', 'L',
    'hari_susanto@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA Kejuruan', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199508302020122006', 'RIZKA PUSPITASARI, S.M', 'SURABAYA', '1995-08-30', 'P',
    'rizka_puspitasari@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198010012005022001', 'MUKTI AMBARWATY', 'MEDAN', '1980-10-01', 'P',
    'mukti_ambarwaty@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199506192016122001', 'YUNITA GUNAWAN, S.Ak', 'BOGOR', '1995-06-19', 'P',
    'yunita_gunawan@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198808312009121004', 'FAISAL FAKHRUDDIN, A.Ma, S.Kom', 'Cirebon', '1988-08-31', 'L',
    'faisal_fakhruddin@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Struktural dan Fungsional', '008006003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199806102022101001', 'RIYAN ALDIANSYAH PRATAMA, S.Tr.T.', 'Tasikmalaya', '1998-06-10', 'L',
    'RIYAN_PRATMA@kemenhub.go.id', '081324545400', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200002182022102001', 'KHALDA SAMI HISANAH, S.Tr.Tra', 'Rumah Sakit Tugu Ibu', '2000-02-18', 'P',
    'khalda_hisanah@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199409222016122001', 'YENI NURMALA SARI, A.Md., S.E.', 'JAKARTA', '1994-09-22', 'P',
    'yeni_sari@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Analis Pengelolaan Keuangan APBN Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198807102020122008', 'YULIANA GUNARTIN, SIP', 'PURBALINGGA', '1988-07-10', 'P',
    'yuliana_gunartin@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda', 'III/a', 'Pustakawan Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199307292015031001', 'BUDI DWI PURNOMO, A.Md. LLASDP', 'Cilacap', '1993-07-29', 'L',
    'budi_purnomo0729@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda', 'III/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198805132010121006', 'DENI FIQRI RAMADHAN', 'JAKARTA', '1988-05-13', 'L',
    'deni_fiqri@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda', 'III/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199803202023101001', 'ILHAM FATHA RISQY, S.Tr.Tra.', 'JEMBER', '1998-03-20', 'L',
    'Ilham0320_Fatha@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda', 'III/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200008112023101002', 'MUHAMMAD IS''ADURROFIQ, S.Tr.T.', 'PEKALONGAN', '2000-08-11', 'L',
    'Muhammad0811_is_adurrofiq@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda', 'III/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200008032023102001', 'CINTHYA MARIA AGUSTINA, S.Tr.Tra', 'SINGKAWANG', '2000-08-03', 'P',
    'Cinthya0803_Maria@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda', 'III/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199611092025051001', 'DANA KURNIAWAN, S.Pd.', 'SURABAYA', '1996-11-09', 'L',
    'dana_kurniawan@kemenhub.go.id', '085848712333', 'PNS', 'Penata Muda', 'III/a', 'Pengembang Teknologi Pembelajaran Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199804262025051001', 'CANDRA PUTRA NUSWANTORO, S.A.', 'POSO', '1998-04-26', 'L',
    'candra_nuswantoro@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda', 'III/a', 'Perencana Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200005012025051002', 'AKHMAD SAEAJI ABDILLAH, S.Ds.', 'MOJOKERTO', '2000-05-01', 'L',
    'akhmad_abdillah@kemenhub.go.id', '085859578520', 'PNS', 'Penata Muda', 'III/a', 'Pengembang Teknologi Pembelajaran Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198309172008122001', 'TRIA SEPTI ADHANIA', 'Jakarta', '1983-09-17', 'P',
    'tria_septi@kemenhub.go.id', '0251-7540094', 'PNS', 'Penata Muda', 'III/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA Kejuruan', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198002252006041007', 'YUDI SUPRIATNA', 'Bogor', '1980-02-25', 'L',
    'yudi_supriatna@dephub.go.id', '081254547043', 'PNS', 'Penata Muda', 'III/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199005142010122001', 'SARTIKA PRIDIANTARA', 'PARIGI MOUTONG', '1990-05-14', 'P',
    'sartika_pridiantara@kemenhub.go.id', '0251-7540094', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA Kejuruan', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199103232019022001', 'DAYANK CEMPAKA S', 'UJUNG PANDANG', '1991-03-23', 'P',
    'dayank_s@kemenhub.go.id', '0251-7540094', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Terapis Gigi dan Mulut Mahir', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199304022020122009', 'SITI GIA HAFIIZHA', 'PALEMBANG', '1993-04-02', 'P',
    'siti_hafiizha@dephub.go.id', '082214088802', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199702192020121008', 'NANDA ANUNG ANINDHITA, A.Md. PKB', 'BATANG', '1997-02-19', 'L',
    'nanda_anindhita@dephub.go.id', '085600372505', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Struktural dan Fungsional', '008006003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199605152020122009', 'NURCAHYANI UTAMI DEWI', 'BEKASI', '1996-05-15', 'P',
    'nurcahyani_dewi@kemenhub.go.id', '0251-7540094', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Perawat Terampil', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200003102022101001', 'SATRIA ARYA PUTRA SUBIANTORO, A.Md.Tra', 'Surabaya', '2000-03-10', 'L',
    'satria0310_arya@kemenhub.go.id', '0251-7540094', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200007102022102001', 'SARLITA INKA SAPUTRI YULIANI, A.Md.T', 'PURWOREJO', '2000-07-10', 'P',
    'sarlita0710_inka@kemenhub.go.id', '0251-7540094', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200008092022101001', 'ADE CHANDRA, A.Md.T.', 'KOTA BENGKULU', '2000-08-09', 'L',
    'ade0809_chandra@kemenhub.go.id', '0251-7540094', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200011212022101002', 'HILMI WIKO FAISAL, A.Md.T', 'TEGAL', '2000-11-21', 'L',
    'hilmi1121_Wiko@kemenhub.go.id', '0251-7540094', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200105052022101002', 'MUHAMMAD SULTHAN ABRAR, A.Md. T', 'BEKASI', '2001-05-05', 'L',
    'muhammad_abrar@kemenhub.go.id', '0251-7540094', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200106102022101001', 'M. NU''MANUS SHOBRI, A.Md.Tra', 'BOJONEGORO', '2001-06-10', 'L',
    'm_shobri@kemenhub.go.id', '0251-7540094', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Manajerial', '008006002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200108082022101001', 'AGUS KURNIAWAN, A.Md. Tra', 'BEKASI', '2001-08-08', 'L',
    'agus_kurniawan0808@kemenhub.go.id', '0251-7540094', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Pendidikan dan Pelatihan Struktural dan Fungsional', '008006003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199909182023101001', 'RIZAL KHOLIL ROHMAN, A.Md.Tra', 'CIAMIS', '1999-09-18', 'L',
    'Rizal0918_Kholil@kemenhub.go.id', '0251-7540094', 'PNS', 'Pengatur', 'II/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bidang Perencanaan Pengembangan Kompetensi Sumber Daya Manusia Aparatur', '008006005000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200003082022031003', 'RIZKY MAULANA', 'Bogor', '2000-03-08', 'L',
    'rizky_maulana@kemenhub.go.id', '082113126503', 'PNS', 'Pengatur Muda Tingkat I', 'II/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA Kejuruan', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197705102025212029', 'RINA SUPRIATIN', 'JAKARTA', '1977-05-10', 'P',
    'RINA_SUPRIATIN@kemenhub.go.id', '0251-7540094', 'PPPK', NULL, NULL, 'Operator Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198504262025211051', 'ERWIN', 'BOGOR', '1985-04-26', 'L',
    'ERWIN26@kemenhub.go.id', '0251-7540094', 'PPPK', NULL, NULL, 'Operator Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA Kejuruan', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199302122025211067', 'DEVI MATAHARI', 'BOGOR', '1993-02-12', 'L',
    'DEVI_MATAHARI@kemenhub.go.id', '0251-7540094', 'PPPK', NULL, NULL, 'Operator Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA Kejuruan', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199306162025212084', 'YUNI FARIDA', 'BOGOR', '1993-06-16', 'P',
    'YUNI_FARIDA@kemenhub.go.id', '0251-7540094', 'PPPK', NULL, NULL, 'Operator Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA Kejuruan', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200310272025211003', 'RAMADAN', 'Bogor', '2003-10-27', 'L',
    'RAMADAN2710@kemenhub.go.id', '0251-7540094', 'PPPK', NULL, NULL, 'Operator Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan', 'Bagian Umum', '008006004000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTP', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

-- Office: Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat (008002000000000) - 84 items
INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197108091997031002', 'BAMBANG SISWOYO, S.T., M.T.', 'Bojonegoro', '1971-08-09', 'L',
    'bambang_siswoyo@dephub.go.id', '085881404263', 'PNS', 'Pembina Utama Muda', 'IV/c', 'Kepala Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Struktural', 'II.a',
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', '008002000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197508152005022002', 'Dr. NILA MUTIA, S.Pd., M.T.', 'JAKARTA', '1975-08-15', 'P',
    'nila_mutia@dephub.go.id', '0214756335', 'PNS', 'Pembina Tingkat I', 'IV/b', 'Kepala Bidang Pelatihan', 'Struktural', 'III.a',
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-3', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197311041997032001', 'Dr. RR GLORIANI NOVITA CHRISTIN, S.T., M.T.', 'BOJONEGORO', '1973-11-04', 'P',
    'r_r0411@dephub.go.id', '02185504763', 'PNS', 'Pembina Tingkat I', 'IV/b', 'Kepala Bidang Pendidikan', 'Struktural', 'III.a',
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pendidikan', '008002001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-3', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198403292008121002', 'ANUGERAH DANNY KUMALA, SE', 'JAKARTA', '1984-03-29', 'L',
    'anugerah_danny@kemenhub.go.id', '087883690707', 'PNS', 'Pembina', 'IV/a', 'Kepala Bagian Umum', 'Struktural', 'III.a',
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198007032023211007', 'WILLY JULIANSYAH PRADITYA, S.Ikom', 'Jakarta', '1980-07-03', 'L',
    'willy_praditya@kemenhub.go.id', '-', 'PPPK', 'Golongan IX', 'IX', 'Pranata Hubungan Masyarakat Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198506122023211023', 'AGUS SUGIARTA, ST', 'Gunung Kidul', '1985-06-12', 'L',
    'agus_sugiarta@kemenhub.go.id', '081380351044', 'PPPK', 'Golongan IX', 'IX', 'Perencana Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199601012023212051', 'PRADINKA TIARA UTAMI, S.M.', 'Gunung Kidul', '1996-01-01', 'P',
    'pradinka_utami@kemenhub.go.id', '081212256830', 'PPPK', 'Golongan IX', 'IX', 'Analis Sumber Daya Manusia Aparatur Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198512022025211020', 'M SHAHREZA MENDALO, S.E', 'Jambi', '1985-12-02', 'L',
    NULL, '081318856468', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199006162025212028', 'TRI YUNIATI, S.IKOM', 'Jl. H. Lamin rt. 003/005 No. 11', '1990-06-16', 'P',
    NULL, '081318816690', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199601102025212021', 'ANNY NURDIANI, S.E.', 'Bandung', '1996-01-10', 'P',
    NULL, '082299931006', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199602222025212028', 'NURUL IS HAMI, S.Pd', 'Bekasi', '1996-02-22', 'P',
    NULL, '081296697084', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198406072025211061', 'MOHAMMAD JAIS, S.Pd.SD', 'Sumenep', '1984-06-07', 'L',
    NULL, '085222119920', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198901112023211018', 'FAJAR NUGRAHA, A.md.kom', 'Bogor', '1989-01-11', 'L',
    'fajar_nugraha@kemenhub.go.id', '085893094181', 'PPPK', 'Golongan VII', 'VII', 'Pranata Komputer Terampil', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199511232025212030', 'SHERLIE NOVIANI IRAWAN', 'Trenggalek', '1995-11-23', 'P',
    NULL, '082214743243', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA Kejuruan', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198301152006041001', 'Dr. SATYA PRANATA ASMARA, S.Sos. MBA', 'BEKASI', '1983-01-15', 'L',
    'satya_pranata@dephub.go.id', '08127620022', 'PNS', 'Pembina Utama Muda', 'IV/c', 'Arsiparis Ahli Madya', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-3', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197312272002122001', 'JUHARIYAH, S.E., M.M.', 'BANGKALAN', '1973-12-27', 'P',
    'juhariyah@kemenhub.go.id', '085920545366', 'PNS', 'Pembina Tingkat I', 'IV/b', 'Analis Sumber Daya Manusia Aparatur Ahli Madya', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197007271997032002', 'RIMMA JULIANA SIDAURUK, SS, M.M.Tr', 'TEBING TINGGI', '1970-07-27', 'P',
    'rimma_juliana@kemenhub.go.id', '0818477976', 'PNS', 'Pembina', 'IV/a', 'Statistisi Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197107281998032001', 'SUSI SULISTYOWATI, S.S., M.M.', 'MAGETAN', '1971-07-28', 'P',
    'susi_sulistyowati@dephub.go.id', '-', 'PNS', 'Pembina', 'IV/a', 'Pengembang Teknologi Pembelajaran Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pendidikan', '008002001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198003222005022001', 'LAURA STEVANA SIHOMBING, S.E, M.MTr.', 'JAKARTA', '1980-03-22', 'P',
    'laura_stevana@kemenhub.go.id', '08111892525', 'PNS', 'Pembina', 'IV/a', 'Pengembang Teknologi Pembelajaran Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197509122009122001', 'DIAN ANGGRAINI, ST,  MT', 'BANYUWANGI', '1975-09-12', 'P',
    'dian_anggraini1209@dephub.go.id', '0213847404', 'PNS', 'Pembina', 'IV/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198404052009122001', 'Dr. THERESIA ENDAH DWI ASTUTI ANANTISARI, , M.Sc, S.T.', 'Jakarta', '1984-04-05', 'P',
    'theresia_endah@kemenhub.go.id', '081212383693', 'PNS', 'Pembina', 'IV/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pendidikan', '008002001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-3', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197005131991022001', 'LINNA RUSWITA, SE', 'JAKARTA', '1970-05-13', 'P',
    'linna_ruswita@dephub.go.id', '081310307531', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198507202008121003', ',  RIDWAN GUNAWAN, M.M, S..Si.T', 'JAKARTA', '1985-07-20', 'L',
    'ridwan_gunawan@kemenhub.go.id', '08979375444', 'PNS', 'Penata Tingkat I', 'III/d', 'Pengembang Teknologi Pembelajaran Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197605032009122001', 'IMELDA SIMANUNGKALIT, S.Psi', 'JAKARTA', '1976-05-03', 'P',
    'imelda_simanungkalit@dephub.go.id', '081255078910', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pendidikan', '008002001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198309142009122003', 'NI MADE ANANTA DEWI, S.Pd', 'SURABAYA', '1983-09-14', 'P',
    'ni_made1409@dephub.go.id', '081310828183', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198106262010122002', 'RENI AMELIA EKAWATI, SE', 'SURABAYA', '1981-06-26', 'P',
    'reni_amelia@dephub.go.id', '085730890178', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198505142015032005', 'URI HERMARIZA, S.T., M.T.', 'TARAKAN', '1985-05-14', 'P',
    'uri_hermariza@kemenhub.go.id', '0818860187', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198608262010121004', 'JHON RINDU. N, SE', 'JAKARTA', '1986-08-26', 'L',
    'jhon_rindu@dephub.go.id', '082124252689', 'PNS', 'Penata Tingkat I', 'III/d', 'Penyusun Kerjasama Pelatihan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198701132010122006', 'PARAMITA PANCA WIJAYA, M.M., SE', 'JAKARTA', '1987-01-13', 'P',
    'paramita_wijaya@dephub.go.id', '021-3483 0763', 'PNS', 'Penata Tingkat I', 'III/d', 'Analis Pengelolaan Keuangan APBN Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198602052008122002', 'MARULIN FEBRITA LUKITA, SST, M.M.Tr.', 'MALANG', '1986-02-05', 'P',
    'marulin_febrita@kemenhub.go.id', '081334663257', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pendidikan', '008002001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198604052008122002', 'YUANNITA ASTRITTIANTI, A.Md. S.T, M.M.Tr.', 'Bekasi', '1986-04-05', 'P',
    'yuannita_astrittianti@dephub.go.id', '081399329224', 'PNS', 'Penata Tingkat I', 'III/d', 'Analis Sumber Daya Manusia Aparatur Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197309061992031001', 'NGATMIN, SE', 'GUNUNG KIDUL', '1973-09-06', 'L',
    'ngatmin@dephub.go.id', '081287775773', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pendidikan', '008002001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198510082010121002', 'JUJUR SAUT MARTUA, ST, M.M.', 'JAKARTA', '1985-10-08', 'L',
    'jujur_saut@dephub.go.id', '081234352541', 'PNS', 'Penata Tingkat I', 'III/d', 'Arsiparis Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197808171998032001', 'EMILDA, SAP', 'JAKARTA', '1978-08-17', 'P',
    'emilda@dephub.go.id', '081210051156', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198507012008122001', 'PEGI WULANDARI, S.E., M.Ak.', 'Palembang', '1985-07-01', 'P',
    'pegi_wulandari@dephub.go.id', '085273896364', 'PNS', 'Penata Tingkat I', 'III/d', 'Analis Sumber Daya Manusia Aparatur Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197807182007011001', 'SUYANTO, SE', 'GUNUNG KIDUL', '1978-07-18', 'L',
    'suyanto1807@dephub.go.id', '081387047838', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198905152009122003', 'GALUH INDRI KUSUMAWATI, SE, M.Pd.', 'PATI', '1989-05-15', 'P',
    'galuh_indri@dephub.go.id', '081213326767', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197309141998032001', 'SURYANI, A.Md', 'PURWOREJO', '1973-09-14', 'P',
    'suryani@dephub.go.id', '8351915', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pendidikan', '008002001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197508151998032001', 'SUPATMI HANDAYANI, A.Md', 'JAKARTA', '1975-08-15', 'P',
    'supatmi_handayani@dephub.go.id', '081283011779', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197809091998031001', 'MUHAMAD AWALUDIN', 'JAKARTA', '1978-09-09', 'L',
    'muhammad_awaludin@dephub.go.id', '087882525317', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198208152003122002', 'DIAN AGUSTINA, A.Md', 'SIDIKALANG', '1982-08-15', 'P',
    'dian_agustina@dephub.go.id', '081385852957', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197602022005021001', 'NUR HUSODO, A.Md', 'PATI', '1976-02-02', 'L',
    'nur_husodo@dephub.go.id', '087878059095', 'PNS', 'Penata', 'III/c', 'Pranata Sumber Daya Manusia Aparatur Penyelia', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198001102006042001', 'MIRANI PUSPITA VERBASARI, A Md', 'JAKARTA', '1980-01-10', 'P',
    'mirani_puspita@dephub.go.id', '081213271689', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198706162009122003', 'MERI YUNITA, ST', 'KARANG ANYAR', '1987-06-16', 'P',
    'meri_yunita@dephub.go.id', '081247814745', 'PNS', 'Penata', 'III/c', 'Arsiparis Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198710222009121002', 'YOHANES PIERE SUHARTO DA SILVA, ST', 'Surabaya', '1987-10-22', 'L',
    'yohanes_p@dephub.go.id', '081388653068', 'PNS', 'Penata', 'III/c', 'Arsiparis Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199104212015031004', 'ARIF ARDIANTO, S.S.T (TD), M.Sc.', 'BATANG', '1991-04-21', 'L',
    NULL, '081296765476', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pendidikan', '008002001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199107272015031003', 'IBNU ARYA NUGRAHA, S.S.T.(TD)., M.Sc.', 'BEKASI', '1991-07-27', 'L',
    'ibnu_nugraha@dephub.go.id', '081315756321', 'PNS', 'Penata', 'III/c', 'Analis Kebijakan Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199101292010122002', 'LINA KOMALASARI, S.S.T, M.Pd', 'JAKARTA', '1991-01-29', 'P',
    'lina_komalasari@dephub.go.id', '081314766839', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pendidikan', '008002001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197004271991031003', 'ALEKS REFDY TASAR', 'BUKIT TINGGI', '1970-04-27', 'L',
    'aleks_refdy@dephub.go.id', '081319028631', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197410191998032001', 'NANI', 'JAKARTA', '1974-10-19', 'P',
    'nani@dephub.go.id', '08121368411', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198810112010122002', 'MIRA SURYANI, S.T.', 'Suayan Tinggi, Lima Puluh Kota', '1988-10-11', 'P',
    'mira_suryani@kemenhub.go.id', '081806507529', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199309212019022005', 'THETA FISHERANIKA PERMADI, S.Si.', 'MALANG', '1993-09-21', 'P',
    'theta_permadi@dephub.go.id', '081333415606', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Statistisi Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199607012019021002', 'ALIF MULYA PRATAMA, S.S.T.(TD)., M.Sc.', 'JAKARTA', '1996-07-01', 'L',
    'alif_pratama@dephub.go.id', '087787916112', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', '008002000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199611262019021002', 'FADHLI MUNADI IMAN, S.Kom., M.Sc', 'TULANG BAWANG', '1996-11-26', 'L',
    'fadhli_iman@dephub.go.id', '082279256330', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', '008002000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199606182019021002', 'CHURATIO ILOTE GOLDY SALIM, S.S.T (TD), M.Sc', 'BANYUMAS', '1996-06-18', 'L',
    'churatio_salim@kemenhub.go.id', '08562641620', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pendidikan', '008002001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198801042009122002', 'NUR ALVINA FUJI RAHAYU, S.AP', 'TEGAL', '1988-01-04', 'P',
    'nur_alvina@dephub.go.id', '081287964141', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Analis Sumber Daya Manusia Aparatur Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199504042019022004', 'NIRWANDANI ADITYA MARTHA IRNANDA, S.I.P.', 'YOGYAKARTA', '1995-04-04', 'P',
    'nirwandani_irnanda@dephub.go.id', '081228245761', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198208022006041002', 'MOCH  ISNAENI, S.M', 'BANDUNG', '1982-08-02', 'L',
    'moch_isnaeni@dephub.go.id', '081333393718', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199401272020121004', 'LANANG PERMATA, S.ST', 'KENDAL', '1994-01-27', 'L',
    'lanang_permata@kemenhub.go.id', '089679178299', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pendidikan', '008002001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199503012020121010', 'GAYUH SYAHRI RAMADHAN, S.ST', 'BANYUMAS', '1995-03-01', 'L',
    'gayuh_ramadhan@dephub.go.id', '085256691231', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198202092005021001', 'MOCHAMAD SAHID, S.E.', 'PURWOREJO', '1982-02-09', 'L',
    'mochamad_sahid@dephub.go.id', '0813 8333 9379', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Arsiparis Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199303062022031009', 'ALEX TRICK SETIAWAN, S.ST.', 'BANYUMAS', '1993-03-06', 'L',
    'alex_setiawan@kemenhub.go.id', NULL, 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Statistisi Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199708312022031008', 'ILHAM DWI NUR RAHMAT, S.S.T.(TD).', 'TEMANGGUNG', '1997-08-31', 'L',
    'ilham_rahmat@kemenhub.go.id', '081283996047', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pendidikan', '008002001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197803222006041001', 'MARGONO', 'GUNUNG KIDUL', '1978-03-22', 'L',
    'margono2203@dephub.go.id', '081295935533', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200005302022102001', 'SEPTI MELLIANA SARI, S.Tr.Tra', 'PEMALANG', '2000-05-30', 'P',
    'Septi0530_Melliana@kemenhub.go.id', '0895339161100', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200002172022102001', 'ALFI NUR AMALIA, S.Tr.T', 'BREBES', '2000-02-17', 'P',
    'Alfi0217_Nur@kemenhub.go.id', '083175332081', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198008062005021002', 'SUGENG PUJIANTO', 'JAKARTA', '1980-08-06', 'L',
    'sugeng_pujianto@dephub.go.id', '085771190961', 'PNS', 'Penata Muda', 'III/a', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199602292016121001', 'AHMAD NAUFAL BUDIHARJO, A.Md.', 'TASIKMALAYA', '1996-02-29', 'L',
    'ahmad_budiharjo@dephub.go.id', '081289750166', 'PNS', 'Penata Muda', 'III/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199710272025051002', 'GANI GUNADI, S.Pd.', 'BOGOR', '1997-10-27', 'L',
    NULL, '089636466872', 'PNS', 'Penata Muda', 'III/a', 'Pengembang Teknologi Pembelajaran Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pendidikan', '008002001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199812252025052001', 'AULIA ASMARANI, S.Tr.Tra.', 'TEGAL', '1998-12-25', 'P',
    'aulia_asmarani@kemenhub.go.id', '0895360957713', 'PNS', 'Penata Muda', 'III/a', 'Perencana Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198708192010121002', 'ADIMAS SISWAHYO', 'SEMARANG', '1987-08-19', 'L',
    'adimas_siswahyo@dephub.go.id', '081225776222', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pendidikan', '008002001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198408192009101001', 'NGATIFAN', 'Purworejo', '1984-08-19', 'L',
    'ngatifan@kemenhub.go.id', '0856-9499-9152', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198102122012121004', 'ANDI SUKANDAR', 'JAKARTA', '1981-02-12', 'L',
    'andi_sukandar@dephub.go.id', '082299643204', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199805182020122003', 'IMELDA RAHMADANTI, A.Md', 'JAKARTA', '1998-05-18', 'P',
    'imelda_rahmadanti@dephub.go.id', '085775557717', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200011212021122001', 'REIKA FIDIA ROSITA, A.Md.T.', 'KUDUS', '2000-11-21', 'P',
    'reika_rosita@kemenhub.go.id', '081225799763', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200102182021121001', 'DAFFA NURY PUTRA, A.Md.T.', 'WONOGIRI', '2001-02-18', 'L',
    'daffa_putra@kemenhub.go.id', '089667922577', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199209172022032011', 'RACHMI, S.E.', 'JAKARTA', '1992-09-17', 'P',
    'rachmi1709@kemenhub.go.id', NULL, 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200009092022102001', 'ARTIKA DEWI NUR ANISHA, A.Md.Tra.', 'Kota Yogyakarta', '2000-09-09', 'P',
    NULL, '081231117990', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pendidikan', '008002001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200009222022101001', 'RENDY PRAYUDA RUSLANANDA, A.Md.T', 'SURABAYA', '2000-09-22', 'L',
    'rendy_ruslananda@kemenhub.go.id', '085738553343', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200102092022101001', 'FERDINAND SURANTA SIBURIAN, A.Md. Tra', 'Tanjung Leidong', '2001-02-09', 'L',
    NULL, '085275020904', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bagian Umum', '008002003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200105102022101001', 'ABID ABYAN PRASETYO, A.Md. T', 'PATI', '2001-05-10', 'L',
    'Abid0510_Abyan@kemenhub.go.id', '0213107879', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200012032022101003', 'WAHID SUWANTORO NURYANTO, A.Md. T', 'GUNUNG KIDUL', '2000-12-03', 'L',
    'Wahid1203_Suwantoro@kemenhub.go.id', '0877 7161 3183', 'PNS', 'Pengatur', 'II/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200109152023101001', 'MUHAMMAD RAFI SATRIA PRABASWARA, A.Md.Tra', 'SIDOARJO', '2001-09-15', 'L',
    NULL, '087701689810', 'PNS', 'Pengatur', 'II/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199806122022032017', 'KADEK LILA WIKANDARI, A.Ma.PKB.', 'TABANAN', '1998-06-12', 'P',
    'lila_wikandari@kemenhub.go.id', '082146267501', 'PNS', 'Pengatur', 'II/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat', 'Bidang Pelatihan', '008002002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-II', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

-- Office: Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut (008003000000000) - 82 items
INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197011061997031001', 'BUDI RAHARDJO, S.Sos., M.Si.', 'PEKALONGAN', '1970-11-06', 'L',
    'budi_rahardjo@kemenhub.go.id', '5363537', 'PNS', 'Pembina Utama Muda', 'IV/c', 'Kepala Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Struktural', 'II.a',
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', '008003000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197911292005021001', 'Dr. ILHAM ASHARI, S.Si.T,.MM', 'POLMAS', '1979-11-29', 'L',
    'ilham_ashari@kemenhub.go.id', '04118216996', 'PNS', 'Pembina Tingkat I', 'IV/b', 'Kepala Bidang Pelatihan', 'Struktural', 'III.a',
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-3', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197505021998081001', 'SLAMET RIYADI, S.Si.T., M.Si.', 'KARANGANYAR', '1975-05-02', 'L',
    'slamet_riyadi@kemenhub.go.id', '081234599807', 'PNS', 'Pembina Tingkat I', 'IV/b', 'Kepala Bidang Pendidikan', 'Struktural', 'III.a',
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197901072002121002', 'DAVIQ WIRATNO, S.Si.T, MT', 'KUDUS', '1979-01-07', 'L',
    'daviq_wiratno@kemenhub.go.id', '0217870223', 'PNS', 'Pembina Tingkat I', 'IV/b', 'Kepala Bagian Umum', 'Struktural', 'III.a',
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199203252023211016', 'CHRISTANTO AGUNG TRI WIBOWO, S.Ds.', 'Jakarta Timur', '1992-03-25', 'L',
    'christanto_agung@kemenhub.go.id', '081390000047', 'PPPK', 'Golongan IX', 'IX', 'Pranata Hubungan Masyarakat Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199406252023211018', 'RIVALDI SAPUTRA', 'Jakarta', '1994-06-25', 'L',
    'RIVALDI_SAPUTRA@kemenhub.go.id', '087877120710', 'PPPK', 'Golongan IX', 'IX', 'Pranata Hubungan Masyarakat Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198312092023212020', 'DESTARINA PRIMA YURISDHINA, S.Sos.', 'Jakarta', '1983-12-09', 'P',
    'DESTARINA_YURISDHINA@kemenhub.go.id', '021-8465509', 'PPPK', 'Golongan IX', 'IX', 'Arsiparis Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199006022023211031', 'MUHAMAD ASYIF BARKHIYA, S.Kom', 'Jakarta', '1990-06-02', 'L',
    'MUHAMAD_BARKHIYA@kemenhub.go.id', '081299096401', 'PPPK', 'Golongan IX', 'IX', 'Pranata Komputer Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199208182023211028', 'GENTAGARDA ERAJAYA, S.E', 'Jakarta Selatan', '1992-08-18', 'L',
    'GENTAGARDA_ERAJAYA@kemenhub.go.id', '081283169254', 'PPPK', 'Golongan IX', 'IX', 'Analis Kebijakan Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199406092023212044', 'YUNITA ANGGRAENI, S.E', 'Tangerang', '1994-06-09', 'P',
    'YUNITA_ANGGRAENI@kemenhub.go.id', '0895324872246', 'PPPK', 'Golongan IX', 'IX', 'Analis Sumber Daya Manusia Aparatur Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199603162023211011', 'DEDEK TRI MARDIANTA, S.Pd', 'Ponorogo', '1996-03-16', 'L',
    'DEDEK_MARDIANTA@kemenhub.go.id', '081294421349', 'PPPK', 'Golongan IX', 'IX', 'Pengembang Teknologi Pembelajaran Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199003062025211021', 'RIKO RAHMADIYANTO, S.Kom', 'JAKARTA', '1990-03-06', 'L',
    'RIKO_RAHMADIYANTO@kemenhub.go.id', '081292926036', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199104102025211026', 'ANGGA APRILLIANA, S.ST (TD)', 'BEKASI', '1991-04-10', 'L',
    'ANGGA_APRILLIANA@kemenhub.go.id', '081212234535', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199503022025212015', 'ILLFI MUSTIKASARI, S.T.', 'TANGERANG', '1995-03-02', 'P',
    'ILLFI_MUSTIKASARI@kemenhub.go.id', '02134830763', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199604152025211025', 'ALDHI MARWANTO, S.Kom', 'TUBAN', '1996-04-15', 'L',
    'ALDHI_MARWANTO@kemenhub.go.id', '081333526622', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199609012025212022', 'AYU SEPTIYANTI, S.Pd', 'JAKARTA', '1996-09-01', 'P',
    'AYU_SEPTIYANTI@kemenhub.go.id', '089608273793', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199704082025212014', 'ZAKIATUL MILLAH, S.Tr.Pel', 'PEKALONGAN', '1997-04-08', 'P',
    'ZAKIATUL_MILLAH@kemenhub.go.id', '02134830763', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199710202025211009', 'M. FAUZI, S.E.', 'BIMA', '1997-10-20', 'L',
    'M_FAUZI2010@kemenhub.go.id', '082339872568', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199211152025211022', 'NOFENDY NUGROHO, A.Md', 'JAKARTA', '1992-11-15', 'L',
    'NOFENDY_NUGROHO@kemenhub.go.id', '089615726570', 'PPPK', 'Golongan VII', 'VII', 'Pengelola Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197510132025211007', 'RISKI, -', 'JAKARTA', '1975-10-13', 'L',
    'RISKI1310@kemenhub.go.id', '082298077287', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198008212025212008', 'SITI SABARIAH, -', 'JAKARTA', '1980-08-21', 'P',
    'SITI_SABARIAH@kemenhub.go.id', '02134830763', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198701302025211012', 'MUHAMMAD JAMALUDIN, -', 'BOGOR', '1987-01-30', 'L',
    'MUHAMMAD_JAMALUDIN@kemenhub.go.id', '08999013000', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198909202025211023', 'AAT SUTARLAN', 'SUMEDANG', '1989-09-20', 'L',
    'AAT_SUTARLAN@kemenhub.go.id', '082123455447', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA Kejuruan', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197608132002122001', 'ERNI BASRI, ST, M. ENG', 'Belopa', '1976-08-13', 'P',
    'erni_basri@dephub.go.id', '081213343097', 'PNS', 'Pembina Utama Muda', 'IV/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197011221992032002', 'ENENG RUKIAH ARYANI, S.Sos. MM', 'JAKARTA', '1970-11-22', 'P',
    'eneng_rukiah@kemenhub.go.id', '087782630397', 'PNS', 'Pembina', 'IV/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197902092009121003', 'TEDDY NUGROHO, MM', 'RIAU', '1979-02-09', 'L',
    'teddy_nugroho@kemenhub.go.id', '0251-7540094', 'PNS', 'Pembina', 'IV/a', 'Pengembang Teknologi Pembelajaran Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '196901011989031002', 'MOH SAHRI, S.Sos,  MM', 'Bangkalan', '1969-01-01', 'L',
    'moh_sahri@kemenhub.go.id', '313013735', 'PNS', 'Pembina', 'IV/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197506161998031004', 'ZAKI MULYONO, S.Sos, M.M.Tr', 'JAKARTA', '1975-06-16', 'L',
    'zaki_mulyono@kemenhub.go.id', '021-80882887', 'PNS', 'Pembina', 'IV/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198007062008122001', 'MARTHA JULIANA PURBA, S.E, M.Pd', 'PEMATANG SIANTAR', '1980-07-06', 'P',
    'martha_juliana@kemenhub.go.id', '081219200924', 'PNS', 'Pembina', 'IV/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197911032009122003', 'ERIKA DWI SULISTYORINI, S.SiT, M.Tr.T.', 'Blora', '1979-11-03', 'P',
    'erika_dwi@kemenhub.go.id', '081388679757', 'PNS', 'Pembina', 'IV/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197812062009121001', 'RIZKI NURUL ARSY, SE, M.A.', 'JAKARTA', '1978-12-06', 'L',
    'rizki_nurul@kemenhub.go.id', '082112347078', 'PNS', 'Pembina', 'IV/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197003051990082001', 'RINA ROSTIANA LESTINA, S.AP', 'JAKARTA', '1970-03-05', 'P',
    'rina_rostiana@kemenhub.go.id', '082122406860', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198306232009122002', 'YUNI DWI ASTUTI, ST, MMSI', 'JAKARTA', '1983-06-23', 'P',
    'yuni_dwi@kemenhub.go.id', '081311161850', 'PNS', 'Penata Tingkat I', 'III/d', 'Analis Sumber Daya Manusia Aparatur Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197306191998031001', 'AHMAD ZAINNI, S.Kom', 'JAKARTA', '1973-06-19', 'L',
    'ahmad_zainni@kemenhub.go.id', '08158842937', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197111301997031001', 'RIYADI, S.SOS', 'Madiun', '1971-11-30', 'L',
    'riyadi3011@kemenhub.go.id', '08129773431', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198111082010122002', 'SANTI NOVIALIRA, M.M., SE', 'AGAM', '1981-11-08', 'P',
    'santi_novialira@kemenhub.go.id', '081295748616', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198605032010121005', 'WISNU AJI PRAWOTO, ST', 'MAGELANG', '1986-05-03', 'L',
    'wisnu_aji@kemenhub.go.id', '081328203775', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197903172006041001', 'LALU YUSUF KURNIAWAN, SE, M.Si', 'JAKARTA', '1979-03-17', 'L',
    'lalu_yusuf@kemenhub.go.id', '02132511983', 'PNS', 'Penata Tingkat I', 'III/d', 'Analis Pengelolaan Keuangan APBN Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198312262003121004', 'ACHMAD DWI JAYANTO, S.E., M.Si', 'DEPOK', '1983-12-26', 'L',
    'achmad_dwi@kemenhub.go.id', '081315992524', 'PNS', 'Penata Tingkat I', 'III/d', 'Analis Pengelolaan Keuangan APBN Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198404082009121007', 'AFANDY KURNIAWAN, Amd, S.Kom', 'CILACAP', '1984-04-08', 'L',
    'afandy_kurniawan@kemenhub.go.id', '081398088868', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197403011998032001', 'ARIFAH, SE', NULL, '1974-03-01', 'P',
    'arifah@kemenhub.go.id', '08121836390', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198607102014022002', 'MARIA AUDREY GITA KEMALA ARIE PUTRI MAMAHIT, ST', 'JAKARTA', '1986-07-10', 'P',
    'maria_audrey@kemenhub.go.id', '081291139988', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198808092014021004', 'ADI CASMUDI, S.S.T.Pel, M.Tr.T.', 'Pemalang', '1988-08-09', 'L',
    'adi_casmudi@kemenhub.go.id', '082112548258', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198911082014021002', 'DANYAKA PUTRA AJI, S.S.T.Pel, M.M', 'Karanganyar', '1989-11-08', 'L',
    'danyaka_putra@kemenhub.go.id', '08111876911', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199007022014021004', 'KUSUMA DHIPANUSA, S.S.T.Pel, MSc, M.T', 'JAKARTA', '1990-07-02', 'L',
    'kusuma_dhipanusa@kemenhub.go.id', '085290026566', 'PNS', 'Penata Tingkat I', 'III/d', 'Pengembang Teknologi Pembelajaran Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198711082015031002', 'AHMAD MAULANA YUSUP, S.Kom, M.Pd', 'JAKARTA', '1987-11-08', 'L',
    'ahmad_yusup@kemenhub.go.id', '085888456972', 'PNS', 'Penata Tingkat I', 'III/d', 'Pranata Komputer Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197007091995011001', 'RIDAR', 'JAKARTA', '1970-07-09', 'L',
    'ridar@kemenhub.go.id', '081311995123', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198910102015031002', 'RIO ALMANDOIL, S.T.', 'JAKARTA', '1989-10-10', 'L',
    'rio_almandoil@kemenhub.go.id', '082111226455', 'PNS', 'Penata', 'III/c', 'Perencana Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199010242015031005', 'I KOMANG HEDI PRAMANA ADIPUTRA, S.S. T.Pel M.Sc', 'JEMBRANA', '1990-10-24', 'L',
    'ikomang_adiputra@kemenhub.go.id', '081298838912', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199111222015031004', 'NOVIANTO NUGROHO PUTRA, S.S. T.Pel, M.Pd.', 'JAKARTA', '1991-11-22', 'L',
    'novianto_putra@kemenhub.go.id', '081349593732', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198002162003121001', 'AHMAD YANI, S.Kom, M.M.Tr', 'SURABAYA', '1980-02-16', 'L',
    'ahmad_yani@kemenhub.go.id', '081585358345', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198012142003121001', 'BAYU ARDIANTO', 'JAKARTA', '1980-12-14', 'L',
    'bayu_ardianto@kemenhub.go.id', '08561412144', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198002272009011013', 'AHMAD TALHIS, M.A., S. Sos', 'BREBES', '1980-02-27', 'L',
    'ahmad_talhis@dephub.go.id', '081806447938', 'PNS', 'Penata', 'III/c', 'Analis Pengelolaan Keuangan APBN Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199212182019021001', 'DONY FERDINAL FRENGKI SIMARMATA, S.S.T.Pel, M.Tr.T.', 'PURWAKARTA', '1992-12-18', 'L',
    'dony_simarmata@kemenhub.go.id', '085215606616', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199506292019021004', 'ANDI AULIA ARIKHA SETYO, S.Tr.Pel., M.T., M.Sc.', 'JAKARTA', '1995-06-29', 'L',
    'andi_setyo@kemenhub.go.id', '081288708242', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199509072019021001', 'MUHAMMAD AKBAR, M.Sc., M.T.', 'MAKASSAR', '1995-09-07', 'L',
    'muhammad_akbar0709@kemenhub.go.id', '082187137133', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199405122019021004', 'AFDOLLUDIN AFTA TAZANI, S.Tr.Pel., M.Tr.T', 'SEMARANG', '1994-05-12', 'L',
    'afdolludin_tazani@kemenhub.go.id', '085727879100', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198403202010121003', 'BUDI ARIF, A.Md. S.AP', 'JAKARTA', '1984-03-20', 'L',
    'budi_arif@kemenhub.go.id', '081215877574', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199611292020121004', 'TEGUH SUTANTO, S.M', 'BOYOLALI', '1996-11-29', 'L',
    'teguh_sutanto@kemenhub.go.id', '-', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199610122020122015', 'NUR ASIYAH S, S.ST.', 'UJUNG PANDANG', '1996-10-12', 'P',
    'nur_aisyah1210@kemenhub.go.id', '-', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Pranata Komputer Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199805112022101001', 'REZA UBAIDILLAH, S.Tr.Pel', 'Demak', '1998-05-11', 'L',
    'REZA_UBADILLAH@kemenhub.go.id', '0895422872797', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200004052022101001', 'RANO PRIAMBUDI, S.Tr.Pel', 'Cirebon', '2000-04-05', 'L',
    NULL, '085327326484', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200004242022102001', 'ADELINA ROTUA PROLIHEN SIBURIAN, S.Tr.Pel', 'Medan', '2000-04-24', 'P',
    'adelina_siburian@kemenhub.go.id', '085761094135', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200007072022101001', 'ISA KRISTIAN BESU, S.Tr.Pel', 'Surabaya', '2000-07-07', 'L',
    NULL, '082302052074', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200110282022101001', 'M. ANDHIKA REZKI UTOMO. S, S.Tr.Pel', 'Maros', '2001-10-28', 'L',
    'andhika1028_rezki@kemenhub.go.id', '081210965142', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199703142020122004', 'SRI RAHAYU, S.I.Kom.', 'Sukoharjo', '1997-03-14', 'P',
    'sri_rahayu0314@kemenhub.go.id', '087835186331', 'PNS', 'Penata Muda', 'III/a', 'Pranata Hubungan Masyarakat Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197502281998032001', 'RISMA ANDRIANY PURBA', 'PEMATANG SIANTAR', '1975-02-28', 'P',
    'risma_andriany@kemenhub.go.id', '082124848429', 'PNS', 'Penata Muda', 'III/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198212032005021001', 'SUBHAN', 'JAKARTA', '1982-12-03', 'L',
    'subhan@kemenhub.go.id', '085215359910', 'PNS', 'Penata Muda', 'III/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA Kejuruan', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198206092005021002', 'ADE TRI NUGRAHA, S.H.', 'JAKARTA', '1982-06-09', 'L',
    'ade_tri@kemenhub.go.id', '082112342244', 'PNS', 'Penata Muda', 'III/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199911172025052002', 'NURDIANOV AQMA, S.Tr.Tra.', 'Banyumas', '1999-11-17', 'P',
    'NURDIANOV_AQMA@kemenhub.go.id', '089531604676', 'PNS', 'Penata Muda', 'III/a', 'Analis Kebijakan Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200201242025051001', 'ARIADANI DWI FATHURAHMAN, S.Kom.', 'KULON PROGO', '2002-01-24', 'L',
    'ARIADANI_FATHURAHMAN@kemenhub.go.id', '087700344213', 'PNS', 'Penata Muda', 'III/a', 'Penata Kelola Sistem dan Teknologi Informasi', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198009172006041002', 'STEVANUS PERSEKUTUAN', 'JAKARTA', '1980-09-17', 'L',
    'stevanus_persekutuan@kemenhub.go.id', '0811945455', 'PNS', 'Penata Muda', 'III/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197905062012121003', 'JUPITER SITANGGANG', 'MEDAN', '1979-05-06', 'L',
    'jupiter_sitanggang@kemenhub.go.id', '081387043790', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198106242012121004', 'SUNARTO', 'TEGAL', '1981-06-24', 'L',
    'sunarto2406@kemenhub.go.id', '081344037786', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198107082012121007', 'SOIMUN KHOLID', 'PURBALINGGA', '1981-07-08', 'L',
    'soimun_kholid@kemenhub.go.id', '081284874453', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200005032021121001', 'RAKA PUTRA HANAFI, A.Md.T.', 'JEMBER', '2000-05-03', 'L',
    'raka_hanafi@kemenhub.go.id', '082301466503', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199809172022022003', 'MONICA DEVI SEBTIWI, A.Md.Ak.', 'NGAWI', '1998-09-17', 'P',
    'monica_sebtiwi@kemenhub.go.id', '0251-7540094', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200001052022022005', 'VITRI ADITASARI, A.Md.Ak.', 'KULON PROGO', '2000-01-05', 'P',
    'vitri_aditasari@kemenhub.go.id', '085939811776', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199807162022101001', 'MOKH KAFILIO AL AZHAR, A.Md.Tra', 'Malang', '1998-07-16', 'L',
    'Mokh0716_Kafilio@kemenhub.go.id', '082232250875', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200006182022101003', 'HAFIZH BURHANUDDIN ZAKI, A.Md.Tra', 'SURABAYA', '2000-06-18', 'L',
    'Hafizh0618_Burhanuddin@kemenhub.go.id', '081330548322', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pendidikan', '008003001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200012072022101002', 'DWIKI PASSA WINDYARTO, A.Md.Tra', 'BANJARNEGARA', '2000-12-07', 'L',
    'dwiki1207_passa@kemenhub.go.id', '089616403601', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bagian Umum', '008003003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200107272022101001', 'M. RAMA SATRIO MULYO, A.Md.Tra', 'Bojonegoro', '2001-07-27', 'L',
    'rama_satriomulyo@kemenhub.go.id', '082131981460', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut', 'Bidang Pelatihan', '008003002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

-- Office: Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara (008004000000000) - 89 items
INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '70030467', 'M. ABRAR TUNTALANAI, SIK. SH. MH', 'Jambi', '1970-03-10', 'L',
    'ABRAR_TUNTALANAI@kemenhub.go.id', '081110045511', 'PNS', 'Pembina Utama Madya', 'IV/d', 'Kepala Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Struktural', 'II.a',
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', '008004000000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198105272005022002', 'RATRI, S.SI.T, M.Sc', 'PALEMBANG', '1981-05-27', 'P',
    'ratri@kemenhub.go.id', '-08179112835', 'PNS', 'Pembina', 'IV/a', 'Kepala Bidang Pelatihan', 'Struktural', 'III.a',
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197804272008121001', 'KURNIA DJUPRIANTO, SE, M.Ak.', 'BELITUNG', '1978-04-27', 'L',
    'kurnia_djuprianto@dephub.go.id', '08158734316', 'PNS', 'Penata Tingkat I', 'III/d', 'Kepala Bagian Umum', 'Struktural', 'III.a',
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199307282023211016', 'ADAM QURTUBI, S.Kom', 'Tangerang', '1993-07-28', 'L',
    'ADAM_QURTUBI@kemenhub.go.id', '081383344957', 'PPPK', 'Golongan IX', 'IX', 'Pranata Hubungan Masyarakat Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198706222023211021', 'RICKYANSYAH ANSORI ROJAK, S.M.', 'Tangerang', '1987-06-22', 'L',
    'rickyansyah_rojak@kemenhub.go.id', '088295188181', 'PPPK', 'Golongan IX', 'IX', 'Arsiparis Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199006072023211028', 'HABIB JAMALUDIN, S.AP', 'Tangerang', '1990-06-07', 'L',
    'habib_jamaludin@kemenhub.go.id', '085778193122', 'PPPK', 'Golongan IX', 'IX', 'Analis Sumber Daya Manusia Aparatur Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199707242023212020', 'SETIANI YULLIA SARI, S.Ak', 'Batubara', '1997-07-24', 'P',
    'setiani_sari@kemenhub.go.id', '081314019691', 'PPPK', 'Golongan IX', 'IX', 'Perencana Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198504042025211022', 'SYARIF HIDAYAT, S.Pd', 'tangerang', '1985-04-04', 'L',
    'SYARIF_HIDAYAT0404@kemenhub.go.id', '089506950393', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199010172025211023', 'HAERUL IBAD, S.E', 'tangerang', '1990-10-17', 'L',
    'HAERUL_IBAD@kemenhub.go.id', '0895359589949', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199207182025211019', 'MUHAMAD HOLILUROHMAN, S.E', 'Tangerang', '1992-07-18', 'L',
    'MUHAMAD_HOLILUROHMAN@kemenhub.go.id', '082213221151', 'PPPK', 'Golongan IX', 'IX', 'Penata Layanan Operasional', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199308192023212031', 'AGGIE PUSPITASARI, A.md', 'Cilacap', '1993-08-19', 'P',
    'aggie_puspitasari@kemenhub.go.id', '081575420152', 'PPPK', 'Golongan VII', 'VII', 'Arsiparis Terampil', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200004272023212002', 'NADIRA WAHYU ARIYANTI, A.Md', 'Sidoarjo', '2000-04-27', 'P',
    'Nadira_ariyanti@kemenhub.go.id', '082252296406', 'PPPK', 'Golongan VII', 'VII', 'Arsiparis Terampil', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197510032025211008', 'ENDANG SUBANDI', 'tangerang', '1975-10-03', 'L',
    'ENDANG_SUBANDI@kemenhub.go.id', '089635805051', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA Kejuruan', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198501182025211019', 'ADI KARUNIADI MUQTADIR HABIBI NURSAL', 'Tangerang', '1985-01-18', 'L',
    'ADI_NURSAL@kemenhub.go.id', '081717796562', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA Kejuruan', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198912252025211025', 'DEPI ANDRIANA SAPUTRA', 'Tangerang', '1989-12-25', 'L',
    'DEPI_SAPUTRA@kemenhub.go.id', '081226242624', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199111102025212043', 'AI NOVI NURMALA', 'cianjur', '1991-11-10', 'P',
    'AI_NURMALA@kemenhub.go.id', '087878070713', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pendidikan', '008004001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199211202025211024', 'NOVPRATAMA', 'Kp. Meranti', '1992-11-20', 'L',
    'NOVPRATAMA@kemenhub.go.id', '082246265616', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-II', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199310092025211017', 'ENDI SUBIYANDI FADHILAH', 'tangerang', '1993-10-09', 'L',
    'ENDI_FADHILAH@kemenhub.go.id', '082122774207', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA Kejuruan', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199405292025212021', 'MIFTAHUL JANAH', 'tangerang', '1994-05-29', 'P',
    'MIFTAHUL_JANAH@kemenhub.go.id', '081574766344', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA Kejuruan', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199408152025212018', 'NOVITA SARI', 'Batang Hari', '1994-08-15', 'P',
    'novita_sari1508@kemenhub.go.id', '081311736765', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199504032025211019', 'EKO APRILIYANTO', 'tangerang', '1995-04-03', 'L',
    'EKO_APRILIYANTO@kemenhub.go.id', '0822 9726 2136', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA Kejuruan', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199507242025211019', 'MUHAMMAD YULIANDA REYNALDO AKBAR', 'Padang', '1995-07-24', 'L',
    'YULIANDA_AKBAR@kemenhub.go.id', '082186750333', 'PPPK', 'Golongan V', 'V', 'Pengadministrasi Perkantoran', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198211072005021001', 'WAHYUDI SAPUTRA, S.SI.T., MT', 'BATURAJA', '1982-11-07', 'L',
    'wahyudi_saputra@dephub.go.id', '085267026742', 'PNS', 'Pembina', 'IV/a', 'Pengembang Teknologi Pembelajaran Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pendidikan', '008004001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198505262009122004', 'AJENG MIRANTI PUTRI, M.Sc', 'JAMBI', '1985-05-26', 'P',
    'ajeng_miranti@kemenhub.go.id', '081328014905', 'PNS', 'Pembina', 'IV/a', 'Pengembang Teknologi Pembelajaran Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pendidikan', '008004001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197808232000031002', 'SUGENG LEONALDY, S.SiT, M.Sc', 'Jakarta', '1978-08-23', 'L',
    'sugeng_leonaldi@kemenhub.go.id', '081331820209', 'PNS', 'Pembina', 'IV/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197909292006041001', 'IRWAN  DHARMAWAN, ST M.T.', 'Tangerang', '1979-09-29', 'L',
    'irwan_dharmawan@kemenhub.go.id', '081932956929', 'PNS', 'Pembina', 'IV/a', 'Perencana Ahli Madya', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197412022002121001', 'DESMAN SAMBODO, SH', 'PEKALONGAN', '1974-12-02', 'L',
    'desman_sambodo@kemenhub.go.id', '081311931925', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '196910031989031001', 'TEGUH PURWANTO, S.Sos', 'TANGERANG', '1969-10-03', 'L',
    'teguh_purwanto@kemenhub.go.id', '08129934640', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197001121989032001', 'PENY PUSPIYANI, S.AP', 'UJUNG PANDANG', '1970-01-12', 'P',
    'peny_puspiyani@kemenhub.go.id', '082112893669', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pendidikan', '008004001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197912282005022001', 'ROMAULI SIPAHUTAR, SE', 'JAKARTA', '1979-12-28', 'P',
    'romauli_sipahutar@kemenhub.go.id', '081347560084', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197301211995012001', 'YULIANTI, SE', 'JAKARTA', '1973-01-21', 'P',
    'yulianti2101@kemenhub.go.id', '081210750701', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', NULL, '008004001001000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197311061997031001', 'NURDIN, S.SiT', 'Mura', '1973-11-06', 'L',
    'nurdin@kemenhub.go.id', '085810177947', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197708042000122001', 'SRI KUNTARI, SE', 'KULON PROGO', '1977-08-04', 'P',
    'sri_kuntari@kemenhub.go.id', '08121967788', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '196905241990031001', 'SUKARNA, S.Sos', 'TANGERANG', '1969-05-24', 'L',
    'sukarna@kemenhub.go.id', '081317886932', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197302041997032001', 'KARMILAWATY, SE', 'PADANG', '1973-02-04', 'P',
    'karmilawaty@dephub.go.id', '081380211886', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197004121990082002', 'INEU SUSANA, A.Md.,S.A.P.', 'TANGERANG', '1970-04-12', 'P',
    'ineu_susana@kemenhub.go.id', '087771784557', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198502122008122001', 'RAHRIANTI, S.SI.T', 'TANGERANG', '1985-02-12', 'P',
    'rahrianti@dephub.go.id', '081210646952', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pendidikan', '008004001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197712142002121003', 'KHOIRUL ANAM, S.Si.T.', 'SIDOARJO', '1977-12-14', 'L',
    'khoirul_anam@kemenhub.go.id', '-', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pendidikan', '008004001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197704022006041001', 'LESTIAWAN, S.AP', 'JAKARTA', '1977-04-02', 'L',
    'lestiawan@kemenhub.go.id', '081398264841', 'PNS', 'Penata Tingkat I', 'III/d', 'Analis Sumber Daya Manusia Aparatur Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198307032010122002', 'NGESTIANA WIJAYANTI, SE', 'Blora', '1983-07-03', 'P',
    'ngestiana_wijayanti@kemenhub.go.id', '085642446721', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198503042010122001', 'DIAN ANGGRAINI PUSPANINGRUM, SE, M.T.', 'SURABAYA', '1985-03-04', 'P',
    'dian_anggraini0403@kemenhub.go.id', '081386585810', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pendidikan', '008004001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198604272005022001', 'EKA HASTAWATI, SE, M.E.', 'Boyolali', '1986-04-27', 'P',
    'eka_hastawati@dephub.go.id', '08568136265', 'PNS', 'Penata Tingkat I', 'III/d', 'Statistisi Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197612192006042001', 'TITA NOPIYANTI, SKM., M.M.', 'Ciamis', '1976-12-19', 'P',
    'tita_nopiyanti@kemenhub.go.id', '081319100837', 'PNS', 'Penata Tingkat I', 'III/d', 'Analis Pengelolaan Keuangan APBN Ahli Muda', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197704151998031001', 'TOPIK HIDAYAT, S.S.T', 'TANGERANG', '1977-04-15', 'L',
    'topik_hidayat@kemenhub.go.id', '085219582496', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197302221998031003', 'RADEN KURNIAWAN, A.Md M.A.', 'CURUG', '1973-02-22', 'L',
    'raden_kurniawan@kemenhub.go.id', '085776033750', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197903252006041001', 'ATOK NUGROHO, S.Kom', 'JAKARTA', '1979-03-25', 'L',
    'atok_nugroho@kemenhub.go.id', '02129014921', 'PNS', 'Penata Tingkat I', 'III/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '196905191990081001', 'DEDE SUHENDRAN, A.Md', 'TANGERANG', '1969-05-19', 'L',
    'dede_suhendran@kemenhub.go.id', '082110445677', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pendidikan', '008004001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197006041992032001', 'YULIS KUSDININGSIH, A.Md', 'TANGERANG', '1970-06-04', 'P',
    'yulis_kusdiningsih@kemenhub.go.id', '081387155549', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198912082010122002', 'EKA JUSTICIANA KUSUMAWATI, S.ST., MS.ASM', 'Mataram', '1989-12-08', 'P',
    'eka_justiciana@kemenhub.go.id', '081513670221', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199006212010122003', 'DHIAYU HANDAYANTRI, S.S.T., M.A, MS.ASM.', 'SUMEDANG', '1990-06-21', 'P',
    'dhiayu_handayantri@kemenhub.go.id', '081212930033', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pendidikan', '008004001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199103202010122004', 'GINA MARINA BRIGITHA, S.ST.(TD)', 'BANDUNG', '1991-03-20', 'P',
    'gina_marina@kemenhub.go.id', '-', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198807072010121005', 'HENDRIAN TIRTA DHARMA, A.Md,  S.ST.', 'TANGERANG', '1988-07-07', 'L',
    'hendrian_tirta@dephub.go.id', '081383370991', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199001092010122001', 'OCTA NURUL AKBARI, S.S.T, M.T, MS.AM', 'Jakarta', '1990-01-09', 'P',
    'octa_nurul@kemenhub.go.id', '081218482820', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199008122010122002', 'AGISTINISA AINI, S.S.T', 'Tangerang', '1990-08-12', 'P',
    'agistiana_aini@kemenhub.go.id', '087871173818', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pendidikan', '008004001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199011172010122001', 'BELLA NOER ACHADDIAH, S.S.T., M.Si.', 'JAKARTA', '1990-11-17', 'P',
    'bella_noer@kemenhub.go.id', '085261392534', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199109122010122001', 'ANISSAH AFIANDINI, S.ST', 'PALEMBANG', '1991-09-12', 'P',
    'anissah_afiandini@kemenhub.go.id', '082293946601', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pendidikan', '008004001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197509071998031002', 'DAMHURI, S.Pd.', 'TANGERANG', '1975-09-07', 'L',
    'damhuri@kemenhub.go.id', '085813156912', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197903222008121002', 'MARGANDA BUTARBUTAR, A.Md', 'Toba', '1979-03-22', 'L',
    'marganda_butarbutar@kemenhub.go.id', '081315125952', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198707282009121001', 'AHMAD FURQON BADRUTTAMAMI, A.Md', 'TANGERANG', '1987-07-28', 'L',
    'ahmad_furqon@dephub.go.id', '081906078622', 'PNS', 'Penata', 'III/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pendidikan', '008004001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198108202008122001', 'RIKA FUJI LESTARI, S.E.', 'Ciamis', '1981-08-20', 'P',
    'rika_lestari@kemenhub.go.id', '081703081716', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197410192003121001', 'ASANUDIN, A.Md', 'TANGERANG', '1974-10-19', 'L',
    'asanudin@kemenhub.go.id', '082210446634', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197504061998031001', 'DEDI HARTONO', 'TANGERANG', '1975-04-06', 'L',
    'dedi_hartono@kemenhub.go.id', '0881022990695', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '197707292010121001', 'YANTO SOEPARMAN, S.Kom', 'Jakarta', '1977-07-29', 'L',
    'yanto_soeparman@kemenhub.go.id', '087886542657', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Statistisi Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198905132010121009', 'EKO SUSATYO, S.AP, M.M.', 'TANGERANG', '1989-05-13', 'L',
    'eko_susatyo@kemenhub.go.id', '-', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198905182010121003', 'ACHMAD ALI MUNIF, A.Md', 'TEGAL', '1989-05-18', 'L',
    'achmad_ali1805@kemenhub.go.id', '085254489318', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pendidikan', '008004001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198908072009121001', 'RANGGA HANDHIKA PUTRA, S.AP, M.M.', 'BEKASI', '1989-08-07', 'L',
    'rangga_handhika@kemenhub.go.id', '085692918072', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-2', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199006202019022001', 'FIFI SHOFIYAH, S.E.', 'KUNINGAN', '1990-06-20', 'P',
    'fifi_shofiyah@kemenhub.go.id', '-', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199205282019022002', 'QURROTA AYUN MAJID, S.Kom.', 'DEMAK', '1992-05-28', 'P',
    'qurrotaayun_majid@kemenhub.go.id', '082134751216', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198209172003121002', 'GITA ARYADI', 'YOGYAKARTA', '1982-09-17', 'L',
    'gita_aryadi@kemenhub.go.id', '-', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pendidikan', '008004001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'SLTA', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199510262020122008', 'OCTAVIA BERLIANA DOLOKSARIBU, S.E.', 'BEKASI', '1995-10-26', 'P',
    'octavia_doloksaribu@kemenhub.go.id', '083814765099', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Analis Pengelolaan Keuangan APBN Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199709212020121003', 'KUKUH IMAM ADINEGARA, S.Tr.Tra.', 'TANGERANG', '1997-09-21', 'L',
    'kukuh_adinegara@dephub.go.id', '085888859421', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199706172022032017', 'LARAS PATIMAH PUTRI, S.Ak.', 'MAJALENGKA', '1997-06-17', 'P',
    'laras_putri@kemenhub.go.id', '089696653076', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199801292022032019', 'NURUL ALIF, S.Tr.Tra.', 'JAKARTA UTARA', '1998-01-29', 'P',
    'nurul_alif@kemenhub.go.id', '085172094205', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199804262022031012', 'I MADE BAYU ASTIKA WIJAYA, S.Tr.T.', 'DENPASAR', '1998-04-26', 'L',
    'imade_wijaya@kemenhub.go.id', '-', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199907242022032007', 'RIZKY RAHMAWATI, S.Tr.Tra.', 'TANGERANG', '1999-07-24', 'P',
    'rizky_rahmawati2309@kemenhub.go.id', '085813682342', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pendidikan', '008004001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200005172022101002', 'STEFANUS GERALDI, S.Tr.Tra', 'Jakarta', '2000-05-17', 'L',
    'stefanus_geraldi@kemenhub.go.id', '-+628170081002', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199912092022102001', 'HANIFAH FADHILLAH, S.Tr.Tra', 'Probolinggo', '1999-12-09', 'P',
    'hanifah_fadhillah@kemenhub.go.id', '-', 'PNS', 'Penata Muda Tingkat I', 'III/b', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-IV', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '198112092010121001', 'WIDI WIDAYAT, S.Kom.', 'JAKARTA', '1981-12-09', 'L',
    'widi_widayat@kemenhub.go.id', '081316089881', 'PNS', 'Penata Muda', 'III/a', 'Pranata Komputer Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199012172010122001', 'NI KETUT ADRYANTI DEWI UTARI, S.I.Kom.', 'Ujung Pandang', '1990-12-17', 'P',
    'ni_ketut1712@kemenhub.go.id', '087842137184', 'PNS', 'Penata Muda', 'III/a', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199503232016122001', 'NARISSA PURWANDARI, S.Ak', 'KULON PROGO', '1995-03-23', 'P',
    'narissa_purwandari2303@kemenhub.go.id', '087839617523', 'PNS', 'Penata Muda', 'III/a', 'Analis Pengelolaan Keuangan APBN Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199804262025052001', 'FRILY LIES NURFAUZIA, S.T', 'JAKARTA TIMUR', '1998-04-26', 'P',
    'FRILY_NURFAUZIA@kemenhub.go.id', '082110722540', 'PNS', 'Penata Muda', 'III/a', 'Perencana Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200206252025052006', 'HELEN SELARISMA ADMAJA, S.H', 'Wonorejo', '2002-06-25', 'P',
    'HELEN_ADMAJA@kemenhub.go.id', '082255136002', 'PNS', 'Penata Muda', 'III/a', 'Analis Hukum Ahli Pertama', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'S-1', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199901152021121001', 'THOMAS AMRATA FITRAH NUR CANDRA KIRANA, A.Md.T.', 'LUMAJANG', '1999-01-15', 'L',
    'thomas_kirana@kemenhub.go.id', '081413255550', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pendidikan', '008004001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199907312021121002', 'QAIS ZULFIKAR, A.Md.T.', 'UJUNG PANDANG', '1999-07-31', 'L',
    'qais_zulfikar@kemenhub.go.id', '082349152750', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199907312022021001', 'MUHAMMAD ARSSYA D SABAR, A.Md.Ak.', 'JAKARTA', '1999-07-31', 'L',
    'muhammad_sabar@kemenhub.go.id', '087728883145', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199912062021121002', 'VEGAR ZIGMAL ALFANZA, A.Md.', 'GROBOGAN', '1999-12-06', 'L',
    'vegar_alfanza@kemenhub.go.id', '081328285212', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bagian Umum', '008004003000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200009042021122001', 'BERLIAN SETYO CAHYANINGTYAS, A.Md.', 'BLITAR', '2000-09-04', 'P',
    'berlian_cahyaningtyas@kemenhub.go.id', '081933934643', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '200009292022101006', 'SAMUEL WALTER SIMANIHURUK, A. Md. Tra.', 'SAMOSIR', '2000-09-29', 'L',
    'samuel0929_walter@kemenhub.go.id', '082272339377', 'PNS', 'Pengatur Tingkat I', 'II/d', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pelatihan', '008004002000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-III', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO sik_pegawai (
    nip, nama, tempat_lahir, tanggal_lahir, jenis_kelamin,
    email_dinas, no_hp, status_kepegawaian, pangkat, golongan_ruang, jabatan, jenis_jabatan, eselon,
    unit_kerja, sub_unit_kerja, sub_unit_kerja_kode, satuan_kerja, instansi_induk, pendidikan_terakhir, foto_url,
    created_at, updated_at
) VALUES (
    '199605272019022004', 'AJENG HARJUTRI, A..Ma.', 'SRAGEN', '1996-05-27', 'P',
    'ajeng_harjutri@dephub.go.id', '082194725197', 'PNS', 'Pengatur', 'II/c', 'Penelaah Teknis Kebijakan', 'Fungsional', NULL,
    'Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara', 'Bidang Pendidikan', '008004001000000', 'Badan Pengembangan Sumber Daya Manusia Perhubungan', 'Kementerian Perhubungan', 'D-II', NULL,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
) ON CONFLICT (nip) DO UPDATE SET
    nama = EXCLUDED.nama,
    jabatan = EXCLUDED.jabatan,
    jenis_jabatan = EXCLUDED.jenis_jabatan,
    pangkat = EXCLUDED.pangkat,
    golongan_ruang = EXCLUDED.golongan_ruang,
    eselon = EXCLUDED.eselon,
    unit_kerja = EXCLUDED.unit_kerja,
    sub_unit_kerja = EXCLUDED.sub_unit_kerja,
    sub_unit_kerja_kode = EXCLUDED.sub_unit_kerja_kode,
    satuan_kerja = EXCLUDED.satuan_kerja,
    status_kepegawaian = EXCLUDED.status_kepegawaian,
    email_dinas = EXCLUDED.email_dinas,
    no_hp = EXCLUDED.no_hp,
    updated_at = CURRENT_TIMESTAMP;

