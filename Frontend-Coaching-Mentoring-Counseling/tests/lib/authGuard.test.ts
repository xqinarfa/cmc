import { describe, it, expect } from "vitest";
import { isSuperAdminOrAdmin, isSuperAdmin } from "@/lib/authGuard";

describe("isSuperAdminOrAdmin RBAC Authorization Helper", () => {
  it("returns true for superadmin and variants", () => {
    expect(isSuperAdminOrAdmin("superadmin")).toBe(true);
    expect(isSuperAdminOrAdmin("SUPERADMIN")).toBe(true);
    expect(isSuperAdminOrAdmin("super_admin")).toBe(true);
    expect(isSuperAdminOrAdmin("super-admin")).toBe(true);
    expect(isSuperAdminOrAdmin("Super Admin")).toBe(true);
  });

  it("returns true for admin and variants", () => {
    expect(isSuperAdminOrAdmin("admin")).toBe(true);
    expect(isSuperAdminOrAdmin("ADMIN")).toBe(true);
    expect(isSuperAdminOrAdmin("Admin")).toBe(true);
  });

  it("returns false for non-admin roles", () => {
    expect(isSuperAdminOrAdmin("pegawai")).toBe(false);
    expect(isSuperAdminOrAdmin("PEGAWAI")).toBe(false);
    expect(isSuperAdminOrAdmin("coach")).toBe(false);
    expect(isSuperAdminOrAdmin("mentor")).toBe(false);
    expect(isSuperAdminOrAdmin("counselor")).toBe(false);
    expect(isSuperAdminOrAdmin("client")).toBe(false);
    expect(isSuperAdminOrAdmin("user")).toBe(false);
  });

  it("returns false for empty or falsy inputs", () => {
    expect(isSuperAdminOrAdmin("")).toBe(false);
    expect(isSuperAdminOrAdmin(null)).toBe(false);
    expect(isSuperAdminOrAdmin(undefined)).toBe(false);
  });
});

describe("isSuperAdmin RBAC Authorization Helper", () => {
  it("returns true only for superadmin and its variants", () => {
    expect(isSuperAdmin("superadmin")).toBe(true);
    expect(isSuperAdmin("SUPERADMIN")).toBe(true);
    expect(isSuperAdmin("super_admin")).toBe(true);
    expect(isSuperAdmin("super-admin")).toBe(true);
    expect(isSuperAdmin("Super Admin")).toBe(true);
  });

  it("returns false for regular admin", () => {
    expect(isSuperAdmin("admin")).toBe(false);
    expect(isSuperAdmin("ADMIN")).toBe(false);
    expect(isSuperAdmin("Admin")).toBe(false);
  });

  it("returns false for other roles or falsy inputs", () => {
    expect(isSuperAdmin("pegawai")).toBe(false);
    expect(isSuperAdmin("coach")).toBe(false);
    expect(isSuperAdmin("client")).toBe(false);
    expect(isSuperAdmin("")).toBe(false);
    expect(isSuperAdmin(null)).toBe(false);
    expect(isSuperAdmin(undefined)).toBe(false);
  });
});
