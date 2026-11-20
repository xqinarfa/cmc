-- Migration 000012: Add atasan / verifikator to sessions
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS atasan_nip VARCHAR(50);
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS atasan_nama VARCHAR(255);
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS atasan_jabatan VARCHAR(255);

CREATE INDEX IF NOT EXISTS idx_sessions_atasan_nip ON sessions(atasan_nip);
