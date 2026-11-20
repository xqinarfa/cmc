import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DashboardExecutiveJpCard } from "@/components/dashboard/DashboardExecutiveJpCard";

// Mock fetchSessions API
vi.mock("@/lib/api", () => ({
  fetchSessions: vi.fn().mockResolvedValue([]),
}));

describe("DashboardExecutiveJpCard Component", () => {
  it("renders real JP data from sessions prop and toggles breakdown", () => {
    const handleToggle = vi.fn();
    const mockSessions = [
      {
        category: "Coaching",
        currentJp: 8,
        status: "berlangsung",
        section: "berlangsung",
      },
      {
        category: "Mentoring",
        currentJp: 6,
        status: "pending",
        section: "perlu_tindakan",
      },
    ];

    const { rerender } = render(
      <DashboardExecutiveJpCard
        showJpBreakdown={false}
        onToggleJpBreakdown={handleToggle}
        sessions={mockSessions}
      />
    );

    // Total 14 JP / 20 JP (70%)
    expect(screen.getByText("14")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("70% Tercapai")).toBeInTheDocument();
    expect(screen.getByText(/Butuh 6 JP lagi/i)).toBeInTheDocument();

    // Right Action Counters
    expect(screen.getByText("Perlu tindakan")).toBeInTheDocument();
    expect(screen.getByText("Sedang berlangsung")).toBeInTheDocument();

    const toggleBtn = screen.getByText(/Lihat Rincian JP/i);
    fireEvent.click(toggleBtn);
    expect(handleToggle).toHaveBeenCalled();

    // Rerender with open breakdown
    rerender(
      <DashboardExecutiveJpCard
        showJpBreakdown={true}
        onToggleJpBreakdown={handleToggle}
        sessions={mockSessions}
      />
    );

    expect(screen.getByText("8 JP")).toBeInTheDocument(); // Coaching
    expect(screen.getByText("6 JP")).toBeInTheDocument(); // Mentoring
  });
});
