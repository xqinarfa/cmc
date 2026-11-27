/**
 * Authorization Utilities for Role-Based Access Control (RBAC)
 */

export function isSuperAdminOrAdmin(role?: string | null): boolean {
  if (!role) return false;
  const normalized = role.toLowerCase().replace(/[-_\s]/g, "");
  return normalized === "superadmin" || normalized === "admin";
}

export function isSuperAdmin(role?: string | null): boolean {
  if (!role) return false;
  const normalized = role.toLowerCase().replace(/[-_\s]/g, "");
  return normalized === "superadmin";
}
