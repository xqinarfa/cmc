-- Migration 000010: Create sik_sync_history table and indexes for SIK synchronization audit trail

CREATE TABLE IF NOT EXISTS sik_sync_history (
    id VARCHAR(50) PRIMARY KEY,
    sync_type VARCHAR(50) NOT NULL, -- 'MULTI_UNIT', 'MASTER', 'SINGLE_UNIT', 'MANUAL_IMPORT'
    status VARCHAR(30) NOT NULL DEFAULT 'SUCCESS', -- 'SUCCESS', 'PARTIAL', 'FAILED'
    triggered_by_nip VARCHAR(50),
    triggered_by_name VARCHAR(255) NOT NULL DEFAULT 'Administrator',
    source VARCHAR(255) NOT NULL DEFAULT 'SIK Kemenhub SOAP',
    target_units JSONB NOT NULL DEFAULT '[]'::jsonb,
    total_fetched INT NOT NULL DEFAULT 0,
    total_inserted INT NOT NULL DEFAULT 0,
    total_updated INT NOT NULL DEFAULT 0,
    total_unchanged INT NOT NULL DEFAULT 0,
    total_failed INT NOT NULL DEFAULT 0,
    duration_ms BIGINT NOT NULL DEFAULT 0,
    message TEXT,
    error_message TEXT,
    unit_summaries JSONB NOT NULL DEFAULT '[]'::jsonb,
    changes_log JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sik_sync_history_created_at ON sik_sync_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sik_sync_history_status ON sik_sync_history(status);
CREATE INDEX IF NOT EXISTS idx_sik_sync_history_sync_type ON sik_sync_history(sync_type);

-- Seed initial audit history representing the real synchronizations of 411 SIK employees
INSERT INTO sik_sync_history (
    id, sync_type, status, triggered_by_nip, triggered_by_name, source,
    target_units, total_fetched, total_inserted, total_updated, total_unchanged, total_failed,
    duration_ms, message, unit_summaries, changes_log, created_at
) VALUES
(
    'sync-20261113-001',
    'MASTER',
    'SUCCESS',
    '198904122014031002',
    'Andi Pratama, S.Si.T. (Administrator)',
    'SIK Kemenhub SOAP (N3wPres3nsiApp5)',
    '["Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan"]'::jsonb,
    146, 146, 0, 0, 0, 2450,
    'Sinkronisasi Master SIK Pusbang SDM Aparatur Perhubungan berhasil diselesaikan (146 pegawai tersinkron)',
    '[
        {
            "unit_kerja_id": "pusbang-aparatur",
            "unit_kerja_nama": "Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan",
            "total_pegawai": 146,
            "inserted": 146,
            "updated": 0,
            "unchanged": 0,
            "failed": 0,
            "success": true,
            "message": "146 pegawai terverifikasi dan tersimpan"
        }
    ]'::jsonb,
    '[
        {"nip": "197503251997031001", "nama": "ACU RUDI HARYONO", "unit_kerja": "Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan", "action": "INSERT", "details": "Pegawai baru terdata di SIK: Penelaah Teknis Kebijakan (Gol. III/b)"},
        {"nip": "200008092022101001", "nama": "ADE CHANDRA, A.Md.T.", "unit_kerja": "Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan", "action": "INSERT", "details": "Pegawai baru terdata di SIK: Penelaah Teknis Kebijakan (Gol. II/d)"},
        {"nip": "198201192005021001", "nama": "ADE DARMAWAN PELLO, M.Pd, S.SI.T", "unit_kerja": "Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan", "action": "INSERT", "details": "Pegawai baru terdata di SIK: Widyaiswara Ahli Madya (Gol. IV/c)"},
        {"nip": "197005121996031001", "nama": "Drs. BAMBANG SUTRISNO, M.M.", "unit_kerja": "Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan", "action": "INSERT", "details": "Pegawai baru terdata di SIK: Kepala Bagian Tata Usaha (Eselon III.a)"}
    ]'::jsonb,
    '2026-11-13 17:19:00+07'
),
(
    'sync-20261113-002',
    'MULTI_UNIT',
    'SUCCESS',
    '198904122014031002',
    'Andi Pratama, S.Si.T. (Administrator)',
    'SIK Kemenhub SOAP (N3wPres3nsiApp5)',
    '["Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut", "Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat", "Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara"]'::jsonb,
    255, 255, 0, 0, 0, 5820,
    'Sinkronisasi 3 kantor matra perhubungan berhasil diselesaikan (255 pegawai tersinkron)',
    '[
        {
            "unit_kerja_id": "pusbang-laut",
            "unit_kerja_nama": "Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut",
            "total_pegawai": 82,
            "inserted": 82,
            "updated": 0,
            "unchanged": 0,
            "failed": 0,
            "success": true,
            "message": "82 pegawai terverifikasi dan tersimpan"
        },
        {
            "unit_kerja_id": "pusbang-darat",
            "unit_kerja_nama": "Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat",
            "total_pegawai": 84,
            "inserted": 84,
            "updated": 0,
            "unchanged": 0,
            "failed": 0,
            "success": true,
            "message": "84 pegawai terverifikasi dan tersimpan"
        },
        {
            "unit_kerja_id": "pusbang-udara",
            "unit_kerja_nama": "Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara",
            "total_pegawai": 89,
            "inserted": 89,
            "updated": 0,
            "unchanged": 0,
            "failed": 0,
            "success": true,
            "message": "89 pegawai terverifikasi dan tersimpan"
        }
    ]'::jsonb,
    '[
        {"nip": "198312262003121004", "nama": "ACHMAD DWI JAYANTO, S.E., M.Si", "unit_kerja": "Pusat Pengembangan Sumber Daya Manusia Perhubungan Laut", "action": "INSERT", "details": "Pegawai baru terdata di SIK: Analis Pengelolaan Keuangan APBN Ahli Muda"},
        {"nip": "198507202008121003", "nama": "RIDWAN GUNAWAN, M.M, S..Si.T", "unit_kerja": "Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat", "action": "INSERT", "details": "Pegawai baru terdata di SIK: Pengembang Teknologi Pembelajaran Ahli Muda"},
        {"nip": "199307282023211016", "nama": "ADAM QURTUBI, S.Kom", "unit_kerja": "Pusat Pengembangan Sumber Daya Manusia Perhubungan Udara", "action": "INSERT", "details": "Pegawai baru terdata di SIK: Pranata Hubungan Masyarakat Ahli Pertama (PPPK)"}
    ]'::jsonb,
    '2026-11-13 17:21:00+07'
),
(
    'sync-20261117-001',
    'MULTI_UNIT',
    'SUCCESS',
    '198904122014031002',
    'Andi Pratama, S.Si.T. (Administrator)',
    'SIK Kemenhub SOAP (N3wPres3nsiApp5)',
    '["Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan", "Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat"]'::jsonb,
    230, 0, 3, 227, 0, 3120,
    'Verifikasi pembaruan data berkala SIK selesai: 3 data pegawai diperbarui, 227 data mutakhir',
    '[
        {
            "unit_kerja_id": "pusbang-aparatur",
            "unit_kerja_nama": "Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan",
            "total_pegawai": 146,
            "inserted": 0,
            "updated": 2,
            "unchanged": 144,
            "failed": 0,
            "success": true,
            "message": "146 pegawai terverifikasi (2 diperbarui)"
        },
        {
            "unit_kerja_id": "pusbang-darat",
            "unit_kerja_nama": "Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat",
            "total_pegawai": 84,
            "inserted": 0,
            "updated": 1,
            "unchanged": 83,
            "failed": 0,
            "success": true,
            "message": "84 pegawai terverifikasi (1 diperbarui)"
        }
    ]'::jsonb,
    '[
        {"nip": "198507202008121003", "nama": "RIDWAN GUNAWAN, M.M, S..Si.T", "unit_kerja": "Pusat Pengembangan Sumber Daya Manusia Perhubungan Darat", "action": "UPDATE", "changed_fields": ["jabatan", "sub_unit_kerja"], "details": "Sub Unit Kerja diperbarui menjadi Bidang Pelatihan"},
        {"nip": "197503251997031001", "nama": "ACU RUDI HARYONO", "unit_kerja": "Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan", "action": "UPDATE", "changed_fields": ["sub_unit_kerja"], "details": "Sub Unit Kerja diperbarui menjadi Bagian Umum"},
        {"nip": "200008092022101001", "nama": "ADE CHANDRA, A.Md.T.", "unit_kerja": "Pusat Pengembangan Sumber Daya Manusia Aparatur Perhubungan", "action": "UPDATE", "changed_fields": ["sub_unit_kerja"], "details": "Sub Unit Kerja diperbarui menjadi Bagian Umum"}
    ]'::jsonb,
    '2026-11-17 09:15:00+07'
)
ON CONFLICT (id) DO NOTHING;

