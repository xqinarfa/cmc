// Adapter: memetakan ApiSession (backend JSON) → SessionItem (format frontend)

import type { ApiSession, ApiMeeting } from "./sessions";
import type { SessionItem, Meeting } from "@/lib/sessionData";

// ─── Status Mapping ────────────────────────────────────────────────────────

const STATUS_MAP: Record<string, SessionItem["status"]> = {
  pending: "menunggu_konfirmasi",
  rejected: "dikembalikan",
  confirmed: "berlangsung",
  completed: "selesai",
};

const STATUS_LABEL_MAP: Record<string, string> = {
  pending: "Menunggu konfirmasi",
  rejected: "Dikembalikan",
  confirmed: "Berlangsung",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

function getSection(status: string): SessionItem["section"] {
  if (status === "pending" || status === "rejected") return "perlu_tindakan";
  if (status === "confirmed") return "berlangsung";
  return "selesai";
}

function getCategory(type: string): SessionItem["category"] {
  if (type === "mentoring") return "Mentoring";
  return "Coaching";
}

function getMentorLabel(type: string): string {
  if (type === "mentoring") return "Mentor:";
  if (type === "counseling") return "Konselor:";
  return "Coach:";
}

function getInitials(name?: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function formatRelativeDate(isoString?: string): string {
  if (!isoString) return "-";
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hari ini";
  if (diffDays === 1) return "Kemarin";
  if (diffDays < 7) return `${diffDays} hari lalu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`;

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getTimeInfo(
  session: ApiSession
): { label: string; value: string } {
  const status = session.status;
  if (status === "pending") {
    return { label: "Dibuat:", value: formatRelativeDate(session.created_at) };
  }
  if (status === "rejected") {
    return { label: "Dikembalikan:", value: formatRelativeDate(session.updated_at) };
  }
  if (status === "confirmed") {
    if (session.scheduled_at) {
      const d = new Date(session.scheduled_at);
      return {
        label: "Berikutnya:",
        value: d.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };
    }
    return { label: "Dibuat:", value: formatRelativeDate(session.created_at) };
  }
  if (status === "completed") {
    return { label: "Selesai:", value: formatRelativeDate(session.updated_at) };
  }
  return { label: "Dibuat:", value: formatRelativeDate(session.created_at) };
}

// ─── Main Adapter ─────────────────────────────────────────────────────────

export function mapApiSessionToSessionItem(s: ApiSession): SessionItem {
  const practitionerName = s.practitioner?.full_name;
  const timeInfo = getTimeInfo(s);
  const frontendStatus = STATUS_MAP[s.status] ?? "menunggu_konfirmasi";

  return {
    id: s.id,
    category: getCategory(s.type),
    status: frontendStatus,
    statusLabel: STATUS_LABEL_MAP[s.status] ?? s.status,
    title: s.title || s.topic || `Sesi ${s.type}`,
    mentorOrCoachLabel: getMentorLabel(s.type),
    mentorOrCoachName: practitionerName || "Belum ditentukan",
    mentorInitials: getInitials(practitionerName),
    timeLabel: timeInfo.label,
    timeValue: timeInfo.value,
    token: s.token,
    currentJp: s.current_jp ?? 0,
    targetJp: s.target_jp ?? 0,
    alertType: (s.alert_type as "amber" | "red") ?? undefined,
    alertText: s.alert_text ?? undefined,
    alertAuthor: s.alert_author ?? undefined,
    section: getSection(s.status),
    progressNote: s.progress_note ?? undefined,
  };
}

// ─── Meeting Adapter ──────────────────────────────────────────────────────

const MEETING_TYPE_MAP: Record<string, "Luring" | "Daring" | "Hybrid"> = {
  offline: "Luring",
  online: "Daring",
  hybrid: "Hybrid",
};

export function mapApiMeetingToMeeting(m: ApiMeeting): Meeting {
  const isCompleted = m.status === "completed";
  const isDraft = m.status === "draft";

  let dateStr = "Belum dijadwalkan";
  if (m.scheduled_date) {
    const d = new Date(m.scheduled_date);
    const dateFormatted = d.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const typeLabel =
      MEETING_TYPE_MAP[m.meeting_type ?? ""] || m.meeting_type || "Luring";
    dateStr = `${dateFormatted} · ${typeLabel}`;
  }

  return {
    id: m.id,
    number: m.meeting_number,
    title: m.title || `Pertemuan #${m.meeting_number}`,
    dateStr,
    status: isCompleted ? "lengkap" : isDraft ? "draft" : "pending",
    statusLabel: isCompleted
      ? "Lengkap"
      : isDraft
      ? "Draft — belum lengkap"
      : "Belum diisi",
    jpCollected: m.jp_collected,
    location: m.location,
    type: MEETING_TYPE_MAP[m.meeting_type ?? ""],
    topicSummary: m.summary,
    lastEdited: isDraft
      ? `Terakhir diubah ${formatRelativeDate(m.updated_at)}`
      : undefined,
  };
}
