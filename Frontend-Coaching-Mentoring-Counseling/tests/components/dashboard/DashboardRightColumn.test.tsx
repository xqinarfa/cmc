import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  DashboardRightColumn,
  normalizeDashboardSession,
} from "@/components/dashboard/DashboardRightColumn";
import { ApiSession } from "@/lib/api";

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("normalizeDashboardSession helper", () => {
  it("correctly normalizes an ApiSession with practitioner", () => {
    const raw: ApiSession = {
      id: "api-ses-1",
      client_id: "c-1",
      type: "mentoring",
      status: "confirmed",
      title: "Mentoring Karier ASN",
      current_jp: 4,
      target_jp: 6,
      created_at: "2026-11-19T08:00:00Z",
      updated_at: "2026-11-19T08:00:00Z",
      practitioner: {
        id: "p-1",
        nip: "19800101",
        email: "coach@kemenhub.go.id",
        full_name: "Dr. Budi Utomo",
        role: "coach",
      },
    };

    const normalized = normalizeDashboardSession(raw);
    expect(normalized.id).toBe("api-ses-1");
    expect(normalized.type).toBe("mentoring");
    expect(normalized.title).toBe("Mentoring Karier ASN");
    expect(normalized.mentor).toBe("Dr. Budi Utomo");
    expect(normalized.status).toBe("active");
    expect(normalized.jpCurrent).toBe(4);
    expect(normalized.jpTotal).toBe(6);
  });

  it("handles rejected status as 'rejected'", () => {
    const raw = {
      id: "api-ses-2",
      type: "counseling",
      status: "rejected",
      title: "Konseling Kinerja",
    };
    const normalized = normalizeDashboardSession(raw);
    expect(normalized.status).toBe("rejected");
    expect(normalized.type).toBe("konseling");
  });
});

describe("DashboardRightColumn Component", () => {
  const dummySessions = [
    {
      id: "ses-101",
      type: "coaching" as const,
      title: "Optimalisasi Pelayanan Tol Laut",
      mentor: "Ir. Bambang Tri",
      status: "active" as const,
      jpCurrent: 2,
      jpTotal: 6,
      date: "19 Nov 2026",
      location: "Virtual",
    },
    {
      id: "ses-102",
      type: "mentoring" as const,
      title: "Tata Kelola Perhubungan Darat",
      mentor: "Dra. Siti Rahma",
      status: "pending" as const,
      jpCurrent: 0,
      jpTotal: 4,
      date: "20 Nov 2026",
      token: "PAIR-1234",
      location: "Virtual",
    },
  ];

  it("renders real session list with status badges and JP progress", () => {
    render(
      <DashboardRightColumn
        sessions={dummySessions}
        sessionFilter="all"
        setSessionFilter={vi.fn()}
        sessionSearch=""
        setSessionSearch={vi.fn()}
        onOpenTokenModal={vi.fn()}
        onOpenActionModal={vi.fn()}
        onOpenCoachFinderModal={vi.fn()}
      />
    );

    expect(screen.getByText("Sesi Pembelajaran Aktif")).toBeInTheDocument();
    expect(screen.getByText("Optimalisasi Pelayanan Tol Laut")).toBeInTheDocument();
    expect(screen.getAllByText("Tata Kelola Perhubungan Darat").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ir. Bambang Tri").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Dra. Siti Rahma").length).toBeGreaterThan(0);

    // Check status badges
    expect(screen.getByText("Berlangsung")).toBeInTheDocument();
    expect(screen.getAllByText("Menunggu Konfirmasi").length).toBeGreaterThanOrEqual(1);

    // Check progress
    expect(screen.getByText("2 / 6 JP")).toBeInTheDocument();
    expect(screen.getByText("Bagikan Token")).toBeInTheDocument();
  });

  it("navigates to session detail when a session card is clicked", () => {
    render(
      <DashboardRightColumn
        sessions={dummySessions}
        sessionFilter="all"
        setSessionFilter={vi.fn()}
        sessionSearch=""
        setSessionSearch={vi.fn()}
        onOpenTokenModal={vi.fn()}
        onOpenActionModal={vi.fn()}
        onOpenCoachFinderModal={vi.fn()}
      />
    );

    const sessionCard = screen.getByText("Optimalisasi Pelayanan Tol Laut").closest("div[class*='p-4']");
    expect(sessionCard).toBeInTheDocument();
    if (sessionCard) {
      fireEvent.click(sessionCard);
      expect(mockPush).toHaveBeenCalledWith("/sesi/detail/ses-101");
    }
  });

  it("displays dynamic action required card for active or pending session", () => {
    render(
      <DashboardRightColumn
        sessions={dummySessions}
        sessionFilter="all"
        setSessionFilter={vi.fn()}
        sessionSearch=""
        setSessionSearch={vi.fn()}
        onOpenTokenModal={vi.fn()}
        onOpenActionModal={vi.fn()}
        onOpenCoachFinderModal={vi.fn()}
      />
    );

    expect(screen.getByText("Tindakan Diperlukan")).toBeInTheDocument();
    // Pending session takes priority in pending confirmation
    expect(screen.getAllByText("Menunggu Konfirmasi").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Lihat Detail Sesi")).toBeInTheDocument();
  });

  it("displays 'Semua Sesi Terverifikasi' when no sessions require action", () => {
    const completedSessions = [
      {
        id: "ses-201",
        type: "coaching" as const,
        title: "Pelatihan Selesai",
        mentor: "Coach Hendra",
        status: "completed" as const,
        jpCurrent: 6,
        jpTotal: 6,
        date: "10 Nov 2026",
        location: "Virtual",
      },
    ];

    render(
      <DashboardRightColumn
        sessions={completedSessions}
        sessionFilter="all"
        setSessionFilter={vi.fn()}
        sessionSearch=""
        setSessionSearch={vi.fn()}
        onOpenTokenModal={vi.fn()}
        onOpenActionModal={vi.fn()}
        onOpenCoachFinderModal={vi.fn()}
      />
    );

    expect(screen.getByText("Semua Sesi Terverifikasi")).toBeInTheDocument();
    expect(screen.getByText("Tidak Ada Tindakan Tertunda")).toBeInTheDocument();
  });

  it("displays empty state when sessions array is empty", () => {
    render(
      <DashboardRightColumn
        sessions={[]}
        sessionFilter="all"
        setSessionFilter={vi.fn()}
        sessionSearch=""
        setSessionSearch={vi.fn()}
        onOpenTokenModal={vi.fn()}
        onOpenActionModal={vi.fn()}
        onOpenCoachFinderModal={vi.fn()}
      />
    );

    expect(screen.getByText("Belum ada sesi pembelajaran")).toBeInTheDocument();
    expect(screen.getByText("+ Jadwalkan Sesi Baru")).toBeInTheDocument();
  });
});
