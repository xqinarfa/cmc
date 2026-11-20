import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SesiJpProgressCard from "@/components/sesi/SesiJpProgressCard";
import { SessionItem } from "@/lib/sessionData";

describe("SesiJpProgressCard Component", () => {
  it("renders real session JP, percentage, and triggers filter clicks", () => {
    const handleFilterClick = vi.fn();
    const mockSessions: SessionItem[] = [
      {
        id: "s1",
        category: "Coaching",
        status: "berlangsung",
        statusLabel: "Berlangsung",
        title: "Coaching Sesi 1",
        mentorOrCoachLabel: "Coach:",
        mentorOrCoachName: "Budi",
        mentorInitials: "B",
        timeLabel: "Waktu:",
        timeValue: "Hari ini",
        currentJp: 10,
        targetJp: 10,
        section: "berlangsung",
      },
      {
        id: "s2",
        category: "Mentoring",
        status: "menunggu_konfirmasi",
        statusLabel: "Menunggu Konfirmasi",
        title: "Mentoring Sesi 2",
        mentorOrCoachLabel: "Mentor:",
        mentorOrCoachName: "Sari",
        mentorInitials: "S",
        timeLabel: "Waktu:",
        timeValue: "Kemarin",
        currentJp: 4,
        targetJp: 6,
        section: "perlu_tindakan",
      },
    ];

    render(
      <SesiJpProgressCard
        activeTab="semua"
        onFilterClick={handleFilterClick}
        sessions={mockSessions}
      />
    );

    // 10 + 4 = 14 JP / 20 JP (70%)
    expect(screen.getByText("14")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("70% Tercapai")).toBeInTheDocument();
    expect(screen.getByText(/Butuh 6 JP lagi/i)).toBeInTheDocument();

    // Trigger filter buttons
    const filterPerluTindakan = screen.getByTitle(
      /Klik untuk memfilter sesi yang perlu tindakan/i
    );
    fireEvent.click(filterPerluTindakan);
    expect(handleFilterClick).toHaveBeenCalledWith("perlu_tindakan");

    const filterBerlangsung = screen.getByTitle(
      /Klik untuk memfilter sesi yang sedang berlangsung/i
    );
    fireEvent.click(filterBerlangsung);
    expect(handleFilterClick).toHaveBeenCalledWith("berlangsung");
  });
});
