-- Seed Sessions for Wahid Mahmudi
WITH user_data AS (
    SELECT id AS wahid_id FROM users WHERE nip = '198903072010121008' OR email = 'wahid_mahmudi@kemenhub.go.id' LIMIT 1
)
INSERT INTO sessions (id, client_id, practitioner_id, type, status, title, topic, objective, token, current_jp, target_jp, alert_type, alert_text, scheduled_at, duration_minutes)
SELECT
    'c0000000-0000-0000-0000-000000000001'::uuid,
    user_data.wahid_id,
    'b0000000-0000-0000-0000-000000000001'::uuid,
    'mentoring',
    'pending',
    'Pengembangan Karier dan Talenta ASN',
    'Pengembangan Karier dan Talenta ASN',
    'Penyelarasan rencana karier ASN dengan Corporate University Kemenhub',
    'CMC-4821-7X9A',
    0,
    6,
    'amber',
    'Sudah 3 hari menunggu respon. Anda dapat mengirimkan pengingat notifikasi ke Mentor.',
    NOW() + INTERVAL '2 days',
    60
FROM user_data
ON CONFLICT (id) DO NOTHING;

WITH user_data AS (
    SELECT id AS wahid_id FROM users WHERE nip = '198903072010121008' OR email = 'wahid_mahmudi@kemenhub.go.id' LIMIT 1
)
INSERT INTO sessions (id, client_id, practitioner_id, type, status, title, topic, objective, token, current_jp, target_jp, alert_type, alert_author, alert_text, scheduled_at, duration_minutes)
SELECT
    'c0000000-0000-0000-0000-000000000002'::uuid,
    user_data.wahid_id,
    'b0000000-0000-0000-0000-000000000002'::uuid,
    'coaching',
    'rejected',
    'Peningkatan Kemampuan Analisis Kebijakan',
    'Peningkatan Kemampuan Analisis Kebijakan',
    'Penguatan analytical thinking untuk penyusunan regulasi transportasi',
    'CMC-7712-3K8P',
    6,
    6,
    'red',
    'Dr. Budi Hartono:',
    'Pertemuan #2 dan #3 belum memiliki bukti dokumentasi. Mohon unggah bukti kehadiran sebelum diajukan ulang.',
    NOW() - INTERVAL '1 day',
    60
FROM user_data
ON CONFLICT (id) DO NOTHING;

WITH user_data AS (
    SELECT id AS wahid_id FROM users WHERE nip = '198903072010121008' OR email = 'wahid_mahmudi@kemenhub.go.id' LIMIT 1
)
INSERT INTO sessions (id, client_id, practitioner_id, type, status, title, topic, objective, token, current_jp, target_jp, progress_note, scheduled_at, duration_minutes)
SELECT
    'c0000000-0000-0000-0000-000000000003'::uuid,
    user_data.wahid_id,
    'b0000000-0000-0000-0000-000000000003'::uuid,
    'coaching',
    'confirmed',
    'Penguatan Kepemimpinan Pelayanan Publik',
    'Penguatan Kepemimpinan Pelayanan Publik',
    'Optimalisasi supervisi dan kepemimpinan adaptif di unit kerja',
    'CMC-5923-8B2K',
    3,
    6,
    '1 dari 3 pertemuan terverifikasi',
    NOW() + INTERVAL '3 days',
    60
FROM user_data
ON CONFLICT (id) DO NOTHING;

WITH user_data AS (
    SELECT id AS wahid_id FROM users WHERE nip = '198903072010121008' OR email = 'wahid_mahmudi@kemenhub.go.id' LIMIT 1
)
INSERT INTO sessions (id, client_id, practitioner_id, type, status, title, topic, objective, token, current_jp, target_jp, scheduled_at, duration_minutes)
SELECT
    'c0000000-0000-0000-0000-000000000004'::uuid,
    user_data.wahid_id,
    'b0000000-0000-0000-0000-000000000003'::uuid,
    'coaching',
    'completed',
    'Manajemen Prioritas dan Waktu Kerja',
    'Manajemen Prioritas dan Waktu Kerja',
    'Peningkatan efisiensi waktu kerja dan delegasi tugas operasional',
    'CMC-1039-4L1V',
    4,
    4,
    NOW() - INTERVAL '10 days',
    60
FROM user_data
ON CONFLICT (id) DO NOTHING;

-- Meetings
INSERT INTO meetings (id, session_id, meeting_number, title, scheduled_date, meeting_type, location, summary, jp_collected, status)
VALUES
('d0000000-0000-0000-0000-000000000001'::uuid, 'c0000000-0000-0000-0000-000000000003'::uuid, 1, 'Refleksi Diri & Identifikasi Hambatan Komunikasi', '10 Jan 2025 · Luring', 'Luring', 'Gedung Karsa Lt. 4, Ruang Rapat BPSDM', 'Eksplorasi gaya kepemimpinan dan identifikasi blind spots dalam komunikasi tim.', 2, 'lengkap'),
('d0000000-0000-0000-0000-000000000002'::uuid, 'c0000000-0000-0000-0000-000000000003'::uuid, 2, 'Penyusunan Rencana Aksi Perubahan (RAP)', '16 Jan 2025 · Daring', 'Daring', 'Zoom Meeting ID: 892-120-4491', 'Pembahasan target implementasi rencana aksi kepemimpinan unit kerja.', 2, 'draft'),
('d0000000-0000-0000-0000-000000000003'::uuid, 'c0000000-0000-0000-0000-000000000004'::uuid, 1, 'Pemetaan Beban Kerja & Eisenhower Matrix', '12 Des 2024 · Luring', 'Luring', 'Ruang Coach Ditjen Hubla Lt. 3', 'Analisis prioritas mingguan dan pemilahan tugas mendesak vs penting.', 2, 'lengkap'),
('d0000000-0000-0000-0000-000000000004'::uuid, 'c0000000-0000-0000-0000-000000000004'::uuid, 2, 'Evaluasi Implementasi & Rekomendasi JP', '20 Des 2024 · Daring', 'Daring', 'Google Meet', 'Evaluasi peningkatan produktivitas kerja dan penutupan program sesi.', 2, 'lengkap')
ON CONFLICT (id) DO NOTHING;

