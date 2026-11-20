import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DashboardLeftColumn } from "@/components/dashboard/DashboardLeftColumn";

// Mock router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock fetchSessions
vi.mock("@/lib/api", () => ({
  fetchSessions: vi.fn().mockResolvedValue([]),
}));

describe("DashboardLeftColumn Component", () => {
  it("renders real JP progress and active session token from sessions prop", () => {
    const handleOpenBreakdown = vi.fn();
    const handleOpenToken = vi.fn();
    const handleCopy = vi.fn();
    const handleOpenCoachFinder = vi.fn();

    const mockSessions = [
      {
        id: "s1",
        category: "Coaching",
        currentJp: 10,
        status: "berlangsung",
      },
      {
        id: "s2",
        category: "Mentoring",
        currentJp: 4,
        status: "pending",
        token: "TOKEN-TEST-8888",
        mentorOrCoachName: "Dr. Sari Wulandari",
      },
    ];

    render(
      <DashboardLeftColumn
        onOpenBreakdownModal={handleOpenBreakdown}
        onOpenTokenModal={handleOpenToken}
        onCopyToken={handleCopy}
        copiedToken={false}
        pairingToken="DEFAULT-TOKEN"
        onOpenCoachFinderModal={handleOpenCoachFinder}
        sessions={mockSessions}
      />
    );

    // 10 + 4 = 14 JP (70%)
    expect(screen.getByText("70%")).toBeInTheDocument();
    expect(screen.getByText(/Target 20 JP/i)).toBeInTheDocument();
    expect(screen.getByText("6 JP")).toBeInTheDocument(); // 20 - 14 = 6 JP lagi

    // Token card uses real session token
    expect(screen.getByText("TOKEN-TEST-8888")).toBeInTheDocument();
    expect(screen.getByText(/Token Pairing Aktif/i)).toBeInTheDocument();

    // Trigger actions
    const copyBtn = screen.getByText(/Salin Kode/i);
    fireEvent.click(copyBtn);
    expect(handleCopy).toHaveBeenCalled();

    const breakdownBtn = screen.getByText(/Lihat rincian per kategori/i);
    fireEvent.click(breakdownBtn);
    expect(handleOpenBreakdown).toHaveBeenCalled();
  });
});
