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
  scheduled_at?: string;     // ISO 8601
  duration_minutes?: number;
  meetings?: ApiMeeting[];
  practitioner?: ApiUser;
  created_at: string;
  updated_at: string;
}

export interface BookSessionInput {
  practitioner_id: string;
  type: string;
  title?: string;
  topic?: string;
  objective?: string;
  session_format?: string;
  scheduled_at?: string;
  duration_minutes?: number;
}

export interface AddMeetingInput {
  title: string;
  scheduled_date?: string;
  meeting_type?: string;
  location?: string;
  summary?: string;
  jp_collected?: number;
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
