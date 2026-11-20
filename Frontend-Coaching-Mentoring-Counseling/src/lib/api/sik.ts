/**
 * SIK (Sistem Informasi Kepegawaian) API Client
 * Terintegrasi langsung dengan Master Data Kepegawaian Kementerian Perhubungan RI
 */

export interface SIKPegawai {
  nip: string;
  nama: string;
  gelar_depan?: string;
  gelar_belakang?: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  jenis_kelamin?: string;
  agama?: string;
  status_perkawinan?: string;
  email_dinas?: string;
  email_pribadi?: string;
  no_hp?: string;
  status_kepegawaian?: string;
  pangkat?: string;
  golongan_ruang?: string;
  jabatan?: string;
  jenis_jabatan?: string;
  eselon?: string;
  unit_kerja?: string;
  sub_unit_kerja?: string;
  sub_unit_kerja_kode?: string;
  satuan_kerja?: string;
  instansi_induk?: string;
  lokasi_kerja?: string;
  pendidikan_terakhir?: string;
  jurusan?: string;
  nama_sekolah?: string;
  tahun_lulus?: number;
  foto_url?: string;
  atasan_langsung_nip?: string;
  atasan_langsung_nama?: string;
  atasan_langsung_jabatan?: string;
  masa_kerja_tahun?: number;
  masa_kerja_bulan?: number;
  system_role?: string;
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

/**
 * Mengambil data pegawai SIK berdasarkan NIP
 */
export async function fetchSikPegawai(nip: string): Promise<SIKPegawai | null> {
  if (!nip) return null;
  try {
    const res = await fetch(getApiUrl(`/sik/pegawai/${encodeURIComponent(nip)}`), {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    if (!res.ok) return null;
    const body = await res.json();
    return body.data || null;
  } catch (err) {
    console.error("Gagal memuat data pegawai SIK:", err);
    return null;
  }
}

/**
 * Mengambil profil SIK dari user yang sedang login
 */
export async function fetchMySikProfile(): Promise<SIKPegawai | null> {
  try {
    const res = await fetch(getApiUrl("/sik/me"), {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    if (!res.ok) return null;
    const body = await res.json();
    return body.data || null;
  } catch (err) {
    console.error("Gagal memuat profil SIK user:", err);
    return null;
  }
}

/**
 * Memaksa sinkronisasi profil user atau master data dengan SIK Kemenhub
 */
export async function syncMyProfileWithSIK(): Promise<any | null> {
  const authHeader = getAuthHeader();
  if (!authHeader.Authorization) {
    return null;
  }
  try {
    const res = await fetch(getApiUrl("/users/sync-sik"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
      },
    });
    if (!res.ok) return null;
    const body = await res.json();
    if (body.data && typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(body.data));
      localStorage.setItem("cmc_user", JSON.stringify(body.data));
    }
    return body.data || null;
  } catch (err) {
    console.error("Gagal sinkronisasi data user dengan SIK:", err);
    return null;
  }
}

export interface UnitSyncResult {
  unit_kerja_id: string;
  unit_kerja_nama: string;
  total_pegawai: number;
  success: boolean;
  message: string;
}

export interface SIKSyncData {
  total_pegawai: number;
  source: string;
  synced_at: string;
  message?: string;
  units?: UnitSyncResult[];
}

/**
 * Sinkronisasi Master Data Pegawai SIK Kemenhub (System Master Sync)
 * Mendukung sinkronisasi berdasarkan 1 hingga maksimal 5 kantor/unit kerja secara bersamaan
 */
export async function syncMasterSIK(
  unitKerjaIds?: string[],
  unitKerjaNames?: string[]
): Promise<{
  success: boolean;
  message: string;
  data?: SIKSyncData;
}> {
  if (unitKerjaIds && unitKerjaIds.length > 5) {
    return {
      success: false,
      message: "Maksimal 5 kantor untuk disinkronkan secara bersamaan",
    };
  }

  try {
    const payload: { unit_kerja_ids?: string[]; unit_kerja_names?: string[] } = {};
    if (unitKerjaIds && unitKerjaIds.length > 0) {
      payload.unit_kerja_ids = unitKerjaIds;
    }
    if (unitKerjaNames && unitKerjaNames.length > 0) {
      payload.unit_kerja_names = unitKerjaNames;
    }

    const res = await fetch(getApiUrl("/sik/sync"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: Object.keys(payload).length > 0 ? JSON.stringify(payload) : undefined,
    });
    const body = await res.json().catch(() => null);
    if (!res.ok) {
      return {
        success: false,
        message: body?.message || `Gagal sinkronisasi master SIK (${res.status})`,
      };
    }
    return {
      success: true,
      message: body?.message || "Master data SIK Kemenhub berhasil disinkronkan",
      data: body?.data,
    };
  } catch (err: any) {
    console.error("Gagal sinkronisasi master data SIK:", err);
    return {
      success: false,
      message: "Gagal menghubungi server SIK. Pastikan server backend sedang aktif.",
    };
  }
}

/**
 * Pencarian pegawai di SIK berdasarkan nama, NIP, jabatan, unit kerja, atau sub unit kerja
 */
export async function searchSikPegawai(
  query: string,
  limit = 20,
  offset = 0,
  unitKerja = "",
  subUnitKerja = "",
  satuanKerja = "",
  status = ""
): Promise<{ items: SIKPegawai[]; total: number }> {
  try {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      offset: offset.toString(),
    });
    if (unitKerja && unitKerja !== "all") params.append("unit_kerja", unitKerja);
    if (subUnitKerja && subUnitKerja !== "all") params.append("sub_unit_kerja", subUnitKerja);
    if (satuanKerja && satuanKerja !== "all") params.append("satuan_kerja", satuanKerja);
    if (status && status !== "all") params.append("status", status);

    const res = await fetch(getApiUrl(`/sik/pegawai?${params.toString()}`), {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    if (!res.ok) return { items: [], total: 0 };
    const body = await res.json();
    return {
      items: body.data?.items || [],
      total: body.data?.total || 0,
    };
  } catch (err) {
    console.error("Gagal melakukan pencarian pegawai SIK:", err);
    return { items: [], total: 0 };
  }
}

export interface SIKSyncChangeItem {
  nip: string;
  nama: string;
  unit_kerja: string;
  action: "INSERT" | "UPDATE" | string;
  changed_fields?: string[];
  details: string;
}

export interface SIKUnitSyncSummary {
  unit_kerja_id: string;
  unit_kerja_nama: string;
  total_pegawai: number;
  inserted: number;
  updated: number;
  unchanged: number;
  failed: number;
  success: boolean;
  message: string;
}

export interface SIKSyncHistoryItem {
  id: string;
  sync_type: string;
  status: "SUCCESS" | "PARTIAL" | "FAILED" | string;
  triggered_by_nip?: string;
  triggered_by_name: string;
  source: string;
  target_units: string[];
  total_fetched: number;
  total_inserted: number;
  total_updated: number;
  total_unchanged: number;
  total_failed: number;
  duration_ms: number;
  message?: string;
  error_message?: string;
  unit_summaries?: SIKUnitSyncSummary[];
  changes_log?: SIKSyncChangeItem[];
  created_at: string;
}

/**
 * Mengambil riwayat sinkronisasi data SIK
 */
export async function fetchSikSyncHistories(
  limit = 20,
  offset = 0,
  status = ""
): Promise<{ items: SIKSyncHistoryItem[]; total: number }> {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });
    if (status && status !== "all") params.append("status", status);

    const res = await fetch(getApiUrl(`/sik/sync-history?${params.toString()}`), {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    if (!res.ok) return { items: [], total: 0 };
    const body = await res.json();
    return {
      items: body.data?.items || [],
      total: body.data?.total || 0,
    };
  } catch (err) {
    console.error("Gagal memuat riwayat sinkronisasi SIK:", err);
    return { items: [], total: 0 };
  }
}

/**
 * Mengambil detail riwayat sinkronisasi SIK beserta log perubahan
 */
export async function fetchSikSyncHistoryDetail(
  id: string
): Promise<SIKSyncHistoryItem | null> {
  if (!id) return null;
  try {
    const res = await fetch(getApiUrl(`/sik/sync-history/${encodeURIComponent(id)}`), {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    if (!res.ok) return null;
    const body = await res.json();
    return body.data || null;
  } catch (err) {
    console.error("Gagal memuat detail riwayat sinkronisasi SIK:", err);
    return null;
  }
}

export interface ResetPasswordResult {
  nip: string;
  nama: string;
  password_default: string;
  role?: string;
  email?: string;
}

/**
 * Mereset kata sandi pegawai menjadi NIP agar dapat login langsung
 */
export async function resetPegawaiPassword(
  nip: string
): Promise<{ success: boolean; message: string; data?: ResetPasswordResult }> {
  const cleanNIP = nip.trim();
  if (!cleanNIP) {
    throw new Error("NIP pegawai wajib diisi");
  }

  try {
    const res = await fetch(getApiUrl(`/sik/pegawai/${encodeURIComponent(cleanNIP)}/reset-password`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    const body = await res.json();
    if (!res.ok || body.success === false) {
      throw new Error(body.message || body.errors || "Gagal mereset kata sandi pegawai");
    }

    return {
      success: true,
      message: body.message || "Kata sandi pegawai berhasil di-reset menjadi NIP",
      data: body.data,
    };
  } catch (err: any) {
    console.error("Error mereset kata sandi pegawai:", err);
    throw err;
  }
}

export interface PegawaiRoleInfo {
  nip: string;
  nama: string;
  unit_kerja: string;
  role: string;
  role_label?: string;
  is_registered: boolean;
  unit_admins_count: number;
  target_admin_quota: number;
}

/**
 * Mengambil informasi peran aktif sistem dan statistik kuota admin unit kerja
 */
export async function fetchPegawaiRoleInfo(
  nip: string
): Promise<PegawaiRoleInfo | null> {
  const cleanNIP = nip.trim();
  if (!cleanNIP) return null;

  try {
    const res = await fetch(getApiUrl(`/sik/pegawai/${encodeURIComponent(cleanNIP)}/role`), {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    if (!res.ok) return null;
    const body = await res.json();
    return body.data || null;
  } catch (err) {
    console.error("Gagal memuat peran pegawai:", err);
    return null;
  }
}

/**
 * Memperbarui peran sistem pegawai (misalnya menjadikan Admin Unit Kerja)
 */
export async function updatePegawaiRole(
  nip: string,
  role: string
): Promise<{ success: boolean; message: string; data?: PegawaiRoleInfo }> {
  const cleanNIP = nip.trim();
  if (!cleanNIP) {
    throw new Error("NIP pegawai wajib diisi");
  }

  try {
    const res = await fetch(getApiUrl(`/sik/pegawai/${encodeURIComponent(cleanNIP)}/role`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({ role }),
    });

    const body = await res.json();
    if (!res.ok || body.success === false) {
      throw new Error(body.message || body.errors || "Gagal memperbarui peran pegawai");
    }

    return {
      success: true,
      message: body.message || "Peran pegawai berhasil diperbarui",
      data: body.data,
    };
  } catch (err: any) {
    console.error("Error memperbarui peran pegawai:", err);
    throw err;
  }
}




