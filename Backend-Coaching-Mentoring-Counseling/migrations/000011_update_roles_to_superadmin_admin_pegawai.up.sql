-- Migration 000011: Standardize user roles to super_admin, admin, and pegawai
UPDATE users 
SET role = 'pegawai' 
WHERE role NOT IN ('super_admin', 'admin', 'pegawai');

CREATE INDEX IF NOT EXISTS idx_users_role_standard ON users(role);

