-- Migration 000013: Create session children tables
-- 1. session_peserta
-- 2. session_pertemuan
-- 3. session_pertemuan_peserta_catatan

CREATE TABLE IF NOT EXISTS session_peserta (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    nip VARCHAR(50) NOT NULL,
    nama VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    jabatan VARCHAR(255),
    unit_kerja VARCHAR(255),
    satuan_kerja VARCHAR(255),
    role_in_session VARCHAR(50) DEFAULT 'peserta', -- 'utama', 'anggota'
    current_jp INT DEFAULT 0,
    target_jp INT DEFAULT 6,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_session_peserta_session_id ON session_peserta(session_id);
CREATE INDEX IF NOT EXISTS idx_session_peserta_nip ON session_peserta(nip);
CREATE INDEX IF NOT EXISTS idx_session_peserta_user_id ON session_peserta(user_id);

CREATE TABLE IF NOT EXISTS session_pertemuan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    meeting_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    scheduled_date VARCHAR(100),
    meeting_type VARCHAR(50) DEFAULT 'Luring',
    location VARCHAR(255),
    status VARCHAR(50) DEFAULT 'scheduled', -- 'scheduled', 'ongoing', 'completed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_session_pertemuan_session_id ON session_pertemuan(session_id);
CREATE INDEX IF NOT EXISTS idx_session_pertemuan_number ON session_pertemuan(session_id, meeting_number);

CREATE TABLE IF NOT EXISTS session_pertemuan_peserta_catatan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    session_pertemuan_id UUID NOT NULL REFERENCES session_pertemuan(id) ON DELETE CASCADE,
    session_peserta_id UUID REFERENCES session_peserta(id) ON DELETE SET NULL,
    nip VARCHAR(50) NOT NULL,
    nama VARCHAR(255) NOT NULL,
    tujuan TEXT,
    identifikasi_kebutuhan TEXT,
    area_pengembangan TEXT,
    pembahasan TEXT,
    kesepakatan_solusi TEXT,
    umpan_balik TEXT,
    rencana_tindak_lanjut TEXT,
    target_waktu VARCHAR(100),
    action_learning_files TEXT,
    bukti_foto_files TEXT,
    jp_collected INT DEFAULT 2,
    status VARCHAR(50) DEFAULT 'completed', -- 'draft', 'pending', 'completed', 'verified'
    verified_by_nip VARCHAR(50),
    verified_by_nama VARCHAR(255),
    verified_at TIMESTAMP WITH TIME ZONE,
    catatan_verifikasi TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sppc_session_id ON session_pertemuan_peserta_catatan(session_id);
CREATE INDEX IF NOT EXISTS idx_sppc_pertemuan_id ON session_pertemuan_peserta_catatan(session_pertemuan_id);
CREATE INDEX IF NOT EXISTS idx_sppc_peserta_id ON session_pertemuan_peserta_catatan(session_peserta_id);
CREATE INDEX IF NOT EXISTS idx_sppc_peserta_nip ON session_pertemuan_peserta_catatan(nip);

-- Seed / Migrate existing data
-- 1. Insert session_peserta from existing sessions
INSERT INTO session_peserta (session_id, user_id, nip, nama, email, jabatan, unit_kerja, role_in_session, current_jp, target_jp)
SELECT 
    s.id, 
    s.client_id, 
    COALESCE(u.nip, '198501012010121001'), 
    COALESCE(u.full_name, 'Pegawai CMC'), 
    u.email, 
    u.jabatan, 
    u.unit_kerja, 
    'utama', 
    COALESCE(s.current_jp, 0), 
    COALESCE(s.target_jp, 6)
FROM sessions s
LEFT JOIN users u ON s.client_id = u.id
ON CONFLICT DO NOTHING;

-- 2. Insert session_pertemuan from existing meetings table if exists
INSERT INTO session_pertemuan (id, session_id, meeting_number, title, scheduled_date, meeting_type, location, status, created_at, updated_at)
SELECT id, session_id, meeting_number, title, scheduled_date, meeting_type, location, status, created_at, updated_at
FROM meetings
ON CONFLICT (id) DO NOTHING;

-- 3. Insert session_pertemuan_peserta_catatan from existing meetings with summary
INSERT INTO session_pertemuan_peserta_catatan (
    session_id, session_pertemuan_id, session_peserta_id, nip, nama, tujuan, pembahasan, jp_collected, status, created_at, updated_at
)
SELECT 
    m.session_id,
    m.id,
    sp.id,
    sp.nip,
    sp.nama,
    m.title,
    m.summary,
    COALESCE(m.jp_collected, 2),
    m.status,
    m.created_at,
    m.updated_at
FROM meetings m
JOIN session_peserta sp ON sp.session_id = m.session_id AND sp.role_in_session = 'utama'
WHERE m.summary IS NOT NULL AND m.summary != ''
ON CONFLICT DO NOTHING;
