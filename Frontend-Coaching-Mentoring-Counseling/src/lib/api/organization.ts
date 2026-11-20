/**
 * Organization API Client
 * Modul Master Organisasi Kemenhub (Satuan Kerja, Unit Kerja & Sub Unit Kerja)
 * Terintegrasi langsung dengan Master Data SIK
 * Semua data secara konsisten diurutkan berdasarkan kode ASC
 */

import { SIKPegawai } from "./sik";

export interface SatuanKerjaItem {
  id: string;
  kode: string;
  nama: string;
  singkatan?: string;
  instansi_induk?: string;
  alamat?: string;
  telepon?: string;
  total_unit_kerja?: number;
  total_pegawai?: number;
}

export interface UnitKerjaItem {
  id: string;
  kode: string;
  nama: string;
  satuan_kerja_id: string;
  satuan_kerja_nama: string;
  eselon?: string;
  lokasi?: string;
  alamat?: string;
  total_sub_unit_kerja?: number;
  total_pegawai?: number;
}

export interface SubUnitKerjaItem {
  id: string;
  kode: string;
  nama: string;
  unit_kerja_id: string;
  unit_kerja_nama: string;
  satuan_kerja_id?: string;
  satuan_kerja_nama?: string;
  deskripsi?: string;
  total_pegawai?: number;
}

export interface SIKReferenceItem {
  nama: string;
  kode?: string;
  satuan_kerja?: string;
  unit_kerja?: string;
  total: number;
}

export interface SIKReferences {
  satuan_kerja: SIKReferenceItem[];
  unit_kerja: SIKReferenceItem[];
  sub_unit_kerja: SIKReferenceItem[];
}

function getApiUrl(endpoint: string): string {
  const envUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:8080/api/v1";

  const cleanBase = envUrl.replace(/\/$/, "");
  const base = cleanBase.endsWith("/api/v1") ? cleanBase : `${cleanBase}/api/v1`;
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${cleanEndpoint}`;
}

function getAuthHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token =
    localStorage.getItem("auth_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("cmc_token");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

// ─── SATUAN KERJA APIS ───────────────────────────────────────────────────────

/**
 * Mengambil daftar satuan kerja, diurutkan berdasarkan kode ASC
 */
export async function fetchSatuanKerjaList(query = ""): Promise<SatuanKerjaItem[]> {
  try {
    const params = query ? `?q=${encodeURIComponent(query)}` : "";
    const res = await fetch(getApiUrl(`/satuan-kerja${params}`), {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    if (!res.ok) return [];
    const body = await res.json();
    const items: SatuanKerjaItem[] = body.data || [];
    return items.sort((a, b) => (a.kode || "").localeCompare(b.kode || ""));
  } catch (err) {
    console.error("Gagal memuat daftar satuan kerja:", err);
    return [];
  }
}

export async function fetchPegawaiBySatuanKerja(
  satkerId: string,
  query = "",
  limit = 20,
  offset = 0
): Promise<{ items: SIKPegawai[]; total: number }> {
  try {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      offset: offset.toString(),
    });
    const res = await fetch(
      getApiUrl(`/satuan-kerja/${encodeURIComponent(satkerId)}/pegawai?${params.toString()}`),
      {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      }
    );
    if (!res.ok) return { items: [], total: 0 };
    const body = await res.json();
    return {
      items: body.data?.items || [],
      total: body.data?.total || 0,
    };
  } catch (err) {
    console.error("Gagal memuat pegawai satuan kerja:", err);
    return { items: [], total: 0 };
  }
}

// ─── UNIT KERJA APIS ─────────────────────────────────────────────────────────

/**
 * Mengambil daftar unit kerja, diurutkan berdasarkan kode ASC
 */
export async function fetchUnitKerjaList(
  satuanKerjaId = "",
  query = ""
): Promise<UnitKerjaItem[]> {
  try {
    const params = new URLSearchParams();
    if (satuanKerjaId && satuanKerjaId !== "all") {
      params.append("satuan_kerja_id", satuanKerjaId);
    }
    if (query) {
      params.append("q", query);
    }
    const qs = params.toString() ? `?${params.toString()}` : "";
    const res = await fetch(getApiUrl(`/unit-kerja${qs}`), {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    if (!res.ok) return [];
    const body = await res.json();
    const items: UnitKerjaItem[] = body.data || [];
    return items.sort((a, b) => (a.kode || "").localeCompare(b.kode || ""));
  } catch (err) {
    console.error("Gagal memuat daftar unit kerja:", err);
    return [];
  }
}

export async function fetchPegawaiByUnitKerja(
  unitKerjaId: string,
  query = "",
  limit = 20,
  offset = 0
): Promise<{ items: SIKPegawai[]; total: number }> {
  try {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      offset: offset.toString(),
    });
    const res = await fetch(
      getApiUrl(`/unit-kerja/${encodeURIComponent(unitKerjaId)}/pegawai?${params.toString()}`),
      {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      }
    );
    if (!res.ok) return { items: [], total: 0 };
    const body = await res.json();
    return {
      items: body.data?.items || [],
      total: body.data?.total || 0,
    };
  } catch (err) {
    console.error("Gagal memuat pegawai unit kerja:", err);
    return { items: [], total: 0 };
  }
}

// ─── SUB UNIT KERJA APIS ─────────────────────────────────────────────────────

/**
 * Mengambil daftar sub unit kerja, diurutkan berdasarkan kode ASC
 */
export async function fetchSubUnitKerjaList(
  unitKerjaId = "",
  satuanKerjaId = "",
  query = ""
): Promise<SubUnitKerjaItem[]> {
  try {
    const params = new URLSearchParams();
    if (unitKerjaId && unitKerjaId !== "all") {
      params.append("unit_kerja_id", unitKerjaId);
    }
    if (satuanKerjaId && satuanKerjaId !== "all") {
      params.append("satuan_kerja_id", satuanKerjaId);
    }
    if (query) {
      params.append("q", query);
    }
    const qs = params.toString() ? `?${params.toString()}` : "";
    const res = await fetch(getApiUrl(`/sub-unit-kerja${qs}`), {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    if (!res.ok) return [];
    const body = await res.json();
    const items: SubUnitKerjaItem[] = body.data || [];
    return items.sort((a, b) => (a.kode || "").localeCompare(b.kode || ""));
  } catch (err) {
    console.error("Gagal memuat daftar sub unit kerja:", err);
    return [];
  }
}

export async function fetchSubUnitKerjaById(id: string): Promise<SubUnitKerjaItem | null> {
  try {
    const res = await fetch(getApiUrl(`/sub-unit-kerja/${encodeURIComponent(id)}`), {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    if (!res.ok) return null;
    const body = await res.json();
    return body.data || null;
  } catch (err) {
    console.error("Gagal memuat detail sub unit kerja:", err);
    return null;
  }
}

export async function fetchPegawaiBySubUnitKerja(
  subUnitId: string,
  query = "",
  limit = 20,
  offset = 0
): Promise<{ items: SIKPegawai[]; total: number }> {
  try {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      offset: offset.toString(),
    });
    const res = await fetch(
      getApiUrl(`/sub-unit-kerja/${encodeURIComponent(subUnitId)}/pegawai?${params.toString()}`),
      {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      }
    );
    if (!res.ok) return { items: [], total: 0 };
    const body = await res.json();
    return {
      items: body.data?.items || [],
      total: body.data?.total || 0,
    };
  } catch (err) {
    console.error("Gagal memuat pegawai sub unit kerja:", err);
    return { items: [], total: 0 };
  }
}

// ─── SIK SYNCHRONIZATION APIS ────────────────────────────────────────────────

export async function syncSatuanKerjaFromSIK(): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(getApiUrl("/satuan-kerja/sync-sik"), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    const body = await res.json().catch(() => ({}));
    return {
      success: res.ok,
      message: body.message || (res.ok ? "Sinkronisasi Satuan Kerja berhasil" : "Gagal sinkronisasi Satuan Kerja"),
    };
  } catch (err) {
    return { success: false, message: (err as Error).message || "Koneksi ke server gagal" };
  }
}

export async function syncUnitKerjaFromSIK(): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(getApiUrl("/unit-kerja/sync-sik"), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    const body = await res.json().catch(() => ({}));
    return {
      success: res.ok,
      message: body.message || (res.ok ? "Sinkronisasi Unit Kerja berhasil" : "Gagal sinkronisasi Unit Kerja"),
    };
  } catch (err) {
    return { success: false, message: (err as Error).message || "Koneksi ke server gagal" };
  }
}

export async function syncSubUnitKerjaFromSIK(): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(getApiUrl("/sub-unit-kerja/sync-sik"), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    const body = await res.json().catch(() => ({}));
    return {
      success: res.ok,
      message: body.message || (res.ok ? "Sinkronisasi Sub Unit Kerja berhasil" : "Gagal sinkronisasi Sub Unit Kerja"),
    };
  } catch (err) {
    return { success: false, message: (err as Error).message || "Koneksi ke server gagal" };
  }
}

// ─── DIRECT SIK REFERENCES ───────────────────────────────────────────────────

export async function fetchSIKReferences(): Promise<SIKReferences> {
  try {
    const res = await fetch(getApiUrl("/sik/referensi"), {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    if (!res.ok) {
      return { satuan_kerja: [], unit_kerja: [], sub_unit_kerja: [] };
    }
    const body = await res.json();
    const satker: SIKReferenceItem[] = body.data?.satuan_kerja || [];
    const unit: SIKReferenceItem[] = body.data?.unit_kerja || [];
    const subUnit: SIKReferenceItem[] = body.data?.sub_unit_kerja || [];

    return {
      satuan_kerja: satker.sort((a, b) => (a.kode || a.nama || "").localeCompare(b.kode || b.nama || "")),
      unit_kerja: unit.sort((a, b) => (a.kode || a.nama || "").localeCompare(b.kode || b.nama || "")),
      sub_unit_kerja: subUnit.sort((a, b) => (a.kode || a.nama || "").localeCompare(b.kode || b.nama || "")),
    };
  } catch (err) {
    console.error("Gagal memuat referensi SIK:", err);
    return { satuan_kerja: [], unit_kerja: [], sub_unit_kerja: [] };
  }
}
