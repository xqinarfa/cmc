-- Rollback Migration 000005: Drop sik_pegawai table and remove SIK columns from users

DROP TABLE IF EXISTS sik_pegawai CASCADE;

ALTER TABLE users DROP COLUMN IF EXISTS gelar_depan;
ALTER TABLE users DROP COLUMN IF EXISTS gelar_belakang;
ALTER TABLE users DROP COLUMN IF EXISTS tempat_lahir;
ALTER TABLE users DROP COLUMN IF EXISTS tanggal_lahir;
ALTER TABLE users DROP COLUMN IF EXISTS jenis_kelamin;
ALTER TABLE users DROP COLUMN IF EXISTS agama;
ALTER TABLE users DROP COLUMN IF EXISTS jabatan;
ALTER TABLE users DROP COLUMN IF EXISTS jenis_jabatan;
ALTER TABLE users DROP COLUMN IF EXISTS pangkat_golongan;
ALTER TABLE users DROP COLUMN IF EXISTS unit_kerja;
ALTER TABLE users DROP COLUMN IF EXISTS satuan_kerja;
ALTER TABLE users DROP COLUMN IF EXISTS instansi_induk;
ALTER TABLE users DROP COLUMN IF EXISTS eselon;
ALTER TABLE users DROP COLUMN IF EXISTS status_kepegawaian;
ALTER TABLE users DROP COLUMN IF EXISTS pendidikan_terakhir;
ALTER TABLE users DROP COLUMN IF EXISTS atasan_langsung_nip;
ALTER TABLE users DROP COLUMN IF EXISTS atasan_langsung_nama;
ALTER TABLE users DROP COLUMN IF EXISTS atasan_langsung_jabatan;
ALTER TABLE users DROP COLUMN IF EXISTS masa_kerja_tahun;
ALTER TABLE users DROP COLUMN IF EXISTS masa_kerja_bulan;
ALTER TABLE users DROP COLUMN IF EXISTS sik_synced_at;
ALTER TABLE users DROP COLUMN IF EXISTS sik_data;

