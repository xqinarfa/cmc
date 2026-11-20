-- Rollback Migration 000006: Delete seed accounts for Super Admin and Admin

DELETE FROM users WHERE email IN ('superadmin@dephub.go.id', 'admin@dephub.go.id');
DELETE FROM sik_pegawai WHERE nip IN ('197001011990031001', '197502021995031002');

