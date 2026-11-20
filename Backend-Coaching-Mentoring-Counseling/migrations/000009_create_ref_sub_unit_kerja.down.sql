-- Rollback 000009
DROP TABLE IF EXISTS ref_sub_unit_kerja CASCADE;

ALTER TABLE users DROP COLUMN IF EXISTS sub_unit_kerja;
ALTER TABLE users DROP COLUMN IF EXISTS sub_unit_kerja_kode;

ALTER TABLE sik_pegawai DROP COLUMN IF EXISTS sub_unit_kerja;
ALTER TABLE sik_pegawai DROP COLUMN IF EXISTS sub_unit_kerja_kode;

