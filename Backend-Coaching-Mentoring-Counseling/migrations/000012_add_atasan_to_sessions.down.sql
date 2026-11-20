-- Migration 000012 Down
DROP INDEX IF EXISTS idx_sessions_atasan_nip;
ALTER TABLE sessions DROP COLUMN IF EXISTS atasan_jabatan;
ALTER TABLE sessions DROP COLUMN IF EXISTS atasan_nama;
ALTER TABLE sessions DROP COLUMN IF EXISTS atasan_nip;
