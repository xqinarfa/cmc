// API Client untuk modul Sesi — menghubungkan ke backend Go REST API

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

// ─── Types (sesuai response JSON dari backend Go) ───────────────────────────

export interface ApiUser {
  id: string;
  nip: string;
  email: string;
  full_name: string;
  role: string;
  avatar_url?: string;
  jabatan?: string;
  unit_kerja?: string;
  satuan_kerja?: string;
  pangkat_golongan?: string;
  atasan_langsung_nip?: string;
  atasan_langsung_nama?: string;
  atasan_langsung_jabatan?: string;
}

export interface ApiSessionPeserta {
  id: string;
  session_id: string;
  user_id?: string;
  nip: string;
  nama: string;
  email?: string;
  jabatan?: string;
  unit_kerja?: string;
  satuan_kerja?: string;
  role_in_session?: string; // 'utama' | 'anggota'
  current_jp?: number;
  target_jp?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiSessionPertemuanPesertaCatatan {
  id: string;
  session_id: string;
  session_pertemuan_id: string;
  session_peserta_id?: string;
  nip: string;
  nama: string;
  tujuan?: string;
  identifikasi_kebutuhan?: string;
  area_pengembangan?: string;
  pembahasan?: string;
  kesepakatan_solusi?: string;
  umpan_balik?: string;
  rencana_tindak_lanjut?: string;
  target_waktu?: string;
  action_learning_files?: string;
  bukti_foto_files?: string;
  jp_collected?: number;
  status: string; // 'draft' | 'pending' | 'completed' | 'verified'
  verified_by_nip?: string;
  verified_by_nama?: string;
  verified_at?: string;
  catatan_verifikasi?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiSessionPertemuan {
  id: string;
  session_id: string;
  meeting_number: number;
  title: string;
  scheduled_date?: string;
  meeting_type?: string;
  location?: string;
  status: string;
  catatan_list?: ApiSessionPertemuanPesertaCatatan[];
  created_at?: string;
  updated_at?: string;
}

export interface ApiMeeting {
  id: string;
  session_id: string;
  meeting_number: number;
  title: string;
  scheduled_date?: string;   // ISO 8601
  meeting_type?: string;     // "online" | "offline" | "hybrid"
  location?: string;
  summary?: string;
  jp_collected?: number;
  status: string;            // "draft" | "completed" | "pending"
  created_at: string;
  updated_at: string;
}

export interface ApiSession {
  id: string;
  client_id: string;
  practitioner_id?: string;
  type: string;              // "coaching" | "mentoring" | "counseling"
  status: string;            // "pending" | "rejected" | "confirmed" | "completed" | "cancelled"
  title?: string;
  topic?: string;
  objective?: string;
  session_format?: string;   // "1-on-1" | "1-on-group"
  token?: string;
  current_jp?: number;
  target_jp?: number;
  progress_note?: string;
  alert_type?: string;       // "amber" | "red"
  alert_text?: string;
  alert_author?: string;
  notes?: string;
  atasan_nip?: string;
  atasan_nama?: string;
  atasan_jabatan?: string;
  scheduled_at?: string;     // ISO 8601
  duration_minutes?: number;
  peserta_list?: ApiSessionPeserta[];
  pertemuan_list?: ApiSessionPertemuan[];
  meetings?: ApiMeeting[];
  practitioner?: ApiUser;
  client?: ApiUser & {
    atasan_langsung_nip?: string;
    atasan_langsung_nama?: string;
    atasan_langsung_jabatan?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface PesertaInput {
  nip: string;
  nama: string;
  email?: string;
  jabatan?: string;
  unit_kerja?: string;
  satuan_kerja?: string;
  role_in_session?: string;
}

export interface BookSessionInput {
  practitioner_id: string;
  practitioner_nip?: string;
  type: string;
  title?: string;
  topic?: string;
  objective?: string;
  session_format?: string;
  client_nip?: string;
  atasan_nip?: string;
  atasan_nama?: string;
  atasan_jabatan?: string;
  notes?: string;
  scheduled_at?: string;
  duration_minutes?: number;
  peserta?: PesertaInput[];
}

export interface CatatPertemuanPesertaInput {
  session_pertemuan_id?: string;
  pertemuan_ke?: number;
  nip: string;
  nama: string;
  tanggal?: string;
  waktu?: string;
  moda?: string;
  lokasi?: string;
  tujuan?: string;
  identifikasi_kebutuhan?: string;
  area_pengembangan?: string;
  pembahasan: string;
  kesepakatan_solusi?: string;
  umpan_balik?: string;
  rencana_tindak_lanjut?: string;
  target_waktu?: string;
  action_learning_files?: string;
  bukti_foto_files?: string;
  jp_collected?: number;
  status?: string;
}

export interface AddMeetingInput {
  meeting_number?: number;
  title: string;
  scheduled_date?: string;
  meeting_type?: string;
  location?: string;
  summary?: string;
  jp_collected?: number;
  status?: string;
}

// ─── Auth Helper ─────────────────────────────────────────────────────────────

function getAuthToken(): string {
  if (typeof window === "undefined") return "";
  return (
    localStorage.getItem("auth_token") ||
    localStorage.getItem("cmc_token") ||
    ""
  );
}

function authHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAuthToken()}`,
  };
}

// ─── Generic Fetcher ─────────────────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...authHeaders(),
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      message = body.error || body.message || message;
    } catch {
      // ignore JSON parse error
    }

    // Handle token expired (401)
    if (
      res.status === 401 &&
      (message.toLowerCase().includes("token has expired") ||
        message.toLowerCase().includes("expired") ||
        message.toLowerCase().includes("unauthorized"))
    ) {
      const refreshToken =
        typeof window !== "undefined"
          ? localStorage.getItem("refresh_token") ||
            localStorage.getItem("cmc_refresh_token")
          : null;

      if (refreshToken) {
        try {
          const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: refreshToken }),
          });

          if (refreshRes.ok) {
            const refreshData = await refreshRes.json();
            const newAccess =
              refreshData.token ||
              refreshData.tokens?.access_token ||
              refreshData.data?.tokens?.access_token ||
              refreshData.data?.token;

            if (newAccess && typeof window !== "undefined") {
              localStorage.setItem("auth_token", newAccess);
              localStorage.setItem("cmc_token", newAccess);
              localStorage.setItem("token", newAccess);
              document.cookie = `auth_token=${newAccess}; path=/; max-age=86400; SameSite=Lax`;

              if (refreshData.tokens?.refresh_token) {
                localStorage.setItem("refresh_token", refreshData.tokens.refresh_token);
                localStorage.setItem("cmc_refresh_token", refreshData.tokens.refresh_token);
              }

              // Retry original request with newly issued token
              const retryRes = await fetch(`${API_BASE}${path}`, {
                ...options,
                headers: {
                  ...authHeaders(),
                  Authorization: `Bearer ${newAccess}`,
                  ...(options?.headers || {}),
                },
              });

              if (retryRes.ok) {
                if (retryRes.status === 204) return undefined as unknown as T;
                const retryJson = await retryRes.json();
                return (retryJson.data !== undefined ? retryJson.data : retryJson) as T;
              }
            }
          }
        } catch {
          // Refresh failed
        }
      }

      // If refresh failed or unavailable: clear invalid token and redirect to login
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("cmc_token");
        localStorage.removeItem("token");
        window.location.href = `/login?error=session_expired&redirect=${encodeURIComponent(
          window.location.pathname + window.location.search
        )}`;
      }
    }

    throw new Error(message);
  }

  // 204 No Content
  if (res.status === 204) return undefined as unknown as T;

  const json = await res.json();
  // Backend wraps response in { data: ... } or returns direct
  return (json.data !== undefined ? json.data : json) as T;
}

// ─── Session Endpoints ────────────────────────────────────────────────────────

export async function fetchSessions(filters?: {
  status?: string;
  type?: string;
  search?: string;
}): Promise<ApiSession[]> {
  const params = new URLSearchParams();
  if (filters?.status) params.set("status", filters.status);
  if (filters?.type) params.set("type", filters.type);
  if (filters?.search) params.set("search", filters.search);
  const qs = params.toString() ? `?${params.toString()}` : "";
  const result = await apiFetch<ApiSession[] | { sessions: ApiSession[] }>(
    `/sessions${qs}`
  );
  // Handle both array and { sessions: [] }
  if (Array.isArray(result)) return result;
  if (result && typeof result === "object" && "sessions" in result)
    return (result as { sessions: ApiSession[] }).sessions ?? [];
  return [];
}

export async function fetchSession(id: string): Promise<ApiSession> {
  return apiFetch<ApiSession>(`/sessions/${id}`);
}

export async function bookSession(
  input: BookSessionInput
): Promise<ApiSession> {
  return apiFetch<ApiSession>("/sessions", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateSessionStatus(
  id: string,
  status: string,
  notes?: string
): Promise<void> {
  await apiFetch<void>(`/sessions/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status, notes }),
  });
}

export async function addMeeting(
  sessionId: string,
  input: AddMeetingInput
): Promise<ApiMeeting> {
  return apiFetch<ApiMeeting>(`/sessions/${sessionId}/meetings`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateMeeting(
  sessionId: string,
  meetingId: string,
  input: Partial<AddMeetingInput>
): Promise<ApiMeeting> {
  return apiFetch<ApiMeeting>(`/sessions/${sessionId}/meetings/${meetingId}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function deleteMeeting(
  sessionId: string,
  meetingId: string
): Promise<void> {
  await apiFetch<void>(`/sessions/${sessionId}/meetings/${meetingId}`, {
    method: "DELETE",
  });
}

export async function resendNotification(sessionId: string): Promise<void> {
  await apiFetch<void>(`/sessions/${sessionId}/resend-notification`, {
    method: "POST",
  });
}

// ─── Child: session_peserta Endpoints ────────────────────────────────────────

export async function fetchSessionPeserta(sessionId: string): Promise<ApiSessionPeserta[]> {
  const result = await apiFetch<ApiSessionPeserta[] | { data: ApiSessionPeserta[] }>(`/sessions/${sessionId}/peserta`);
  if (Array.isArray(result)) return result;
  if (result && typeof result === "object" && "data" in result) return (result as { data: ApiSessionPeserta[] }).data;
  return [];
}

export async function addSessionPeserta(sessionId: string, input: PesertaInput): Promise<ApiSessionPeserta> {
  return apiFetch<ApiSessionPeserta>(`/sessions/${sessionId}/peserta`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

// ─── Child: session_pertemuan Endpoints ──────────────────────────────────────

export async function fetchSessionPertemuan(sessionId: string): Promise<ApiSessionPertemuan[]> {
  const result = await apiFetch<ApiSessionPertemuan[] | { data: ApiSessionPertemuan[] }>(`/sessions/${sessionId}/pertemuan`);
  if (Array.isArray(result)) return result;
  if (result && typeof result === "object" && "data" in result) return (result as { data: ApiSessionPertemuan[] }).data;
  return [];
}

// ─── Child: session_pertemuan_peserta_catatan Endpoints ──────────────────────

export async function saveCatatanPertemuan(
  sessionId: string,
  input: CatatPertemuanPesertaInput
): Promise<ApiSessionPertemuanPesertaCatatan> {
  return apiFetch<ApiSessionPertemuanPesertaCatatan>(`/sessions/${sessionId}/catatan`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function fetchCatatanPertemuan(
  sessionId: string,
  pertemuanId: string
): Promise<ApiSessionPertemuanPesertaCatatan[]> {
  const result = await apiFetch<ApiSessionPertemuanPesertaCatatan[] | { data: ApiSessionPertemuanPesertaCatatan[] }>(
    `/sessions/${sessionId}/pertemuan/${pertemuanId}/catatan`
  );
  if (Array.isArray(result)) return result;
  if (result && typeof result === "object" && "data" in result) return (result as { data: ApiSessionPertemuanPesertaCatatan[] }).data;
  return [];
}

// ─── User / Practitioners Endpoints ──────────────────────────────────────────

export async function fetchPractitioners(role?: string): Promise<ApiUser[]> {
  const qs = role ? `?role=${encodeURIComponent(role)}` : "";
  const result = await apiFetch<ApiUser[] | { practitioners: ApiUser[] }>(
    `/users/practitioners${qs}`
  );
  if (Array.isArray(result)) return result;
  if (result && typeof result === "object" && "practitioners" in result)
    return (result as { practitioners: ApiUser[] }).practitioners ?? [];
  return [];
}

export async function fetchCurrentUser(): Promise<ApiUser> {
  return apiFetch<ApiUser>("/users/me");
}
