import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MeetingListSection from "./MeetingListSection";
import { Meeting } from "@/lib/sessionData";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("MeetingListSection Component", () => {
  const mockMeetings: Meeting[] = [
    {
      id: 1,
      number: 1,
      title: "Refleksi Diri & Pemetaan Awal",
      dateStr: "10 Jan 2026",
      type: "Luring",
      location: "Ruang Rapat 1",
      topicSummary: "Eksplorasi gaya kepemimpinan",
      jpCollected: 2,
      status: "lengkap",
      statusLabel: "Lengkap",
    },
    {
      id: 2,
      number: 2,
      title: "Rencana Aksi Perubahan",
      dateStr: "16 Jan 2026",
      type: "Daring",
      location: "Zoom Meeting",
      topicSummary: "Target implementasi rencana aksi",
      jpCollected: 2,
      status: "draft",
      statusLabel: "Draft",
    },
  ];

  it("renders meetings list, status badges, and trigger actions", () => {
    const handleViewDetail = vi.fn();
    const handleDeleteDraft = vi.fn();
    const handleOpenAddMeeting = vi.fn();
    const handleOpenFinishModal = vi.fn();

    render(
      <MeetingListSection
        meetings={mockMeetings}
        filledMeetings={1}
        totalMeetings={3}
        onViewDetail={handleViewDetail}
        onDeleteDraft={handleDeleteDraft}
        onOpenAddMeeting={handleOpenAddMeeting}
        onOpenFinishModal={handleOpenFinishModal}
      />
    );

    expect(screen.getByText("Pertemuan")).toBeInTheDocument();
    expect(screen.getByText("1 dari 3 diisi")).toBeInTheDocument();
    expect(
      screen.getByText("Refleksi Diri & Pemetaan Awal")
    ).toBeInTheDocument();
    expect(screen.getByText("Rencana Aksi Perubahan")).toBeInTheDocument();

    const addBtn = screen.getByText(/Tambah Pertemuan/i);
    fireEvent.click(addBtn);
    expect(handleOpenAddMeeting).toHaveBeenCalled();

    const detailButtons = screen.getAllByText(/Lihat Detail/i);
    expect(detailButtons.length).toBeGreaterThan(0);
    fireEvent.click(detailButtons[0]);
    expect(handleViewDetail).toHaveBeenCalledWith(mockMeetings[0]);
  });
});

