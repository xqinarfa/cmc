import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SesiHeaderCard from "./SesiHeaderCard";

describe("SesiHeaderCard Component", () => {
  it("should render session details, JP progress, and practitioner info", () => {
    render(
      <SesiHeaderCard
        collectedJp={4}
        targetJp={6}
        completedMeetings={2}
        totalMeetings={3}
        progressPercent={67}
        title="Penguatan Kepemimpinan Pelayanan Publik"
        category="Coaching"
        status="confirmed"
        statusLabel="Berlangsung"
        practitionerName="Rudi Santoso, M.M."
        practitionerRole="Coach"
        startDate="6 Jan 2025"
      />
    );

    expect(screen.getByText("Penguatan Kepemimpinan Pelayanan Publik")).toBeInTheDocument();
    expect(screen.getByText("Coaching")).toBeInTheDocument();
    expect(screen.getByText("Berlangsung")).toBeInTheDocument();
    expect(screen.getByText("Coach:")).toBeInTheDocument();
    expect(screen.getByText("Rudi Santoso, M.M.")).toBeInTheDocument();
    expect(screen.getByText(/4\s*\/\s*6 JP/)).toBeInTheDocument();
    expect(screen.getByText(/2 dari 3 pertemuan terverifikasi/)).toBeInTheDocument();
  });

  it("should render completed status with correct badge style", () => {
    render(
      <SesiHeaderCard
        collectedJp={6}
        targetJp={6}
        completedMeetings={3}
        totalMeetings={3}
        progressPercent={100}
        title="Manajemen Prioritas"
        category="Mentoring"
        status="completed"
        statusLabel="Selesai"
        practitionerName="Dr. Sari Wulandari"
        practitionerRole="Mentor"
      />
    );

    expect(screen.getByText("Manajemen Prioritas")).toBeInTheDocument();
    expect(screen.getByText("Selesai")).toBeInTheDocument();
    expect(screen.getByText(/6\s*\/\s*6 JP/)).toBeInTheDocument();
  });
});
