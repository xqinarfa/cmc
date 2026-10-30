import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SesiCard from "./SesiCard";
import type { SessionItem } from "@/lib/sessionData";

describe("SesiCard Component", () => {
  const mockPendingSession: SessionItem = {
    id: "sesi-1",
    category: "Mentoring",
    status: "menunggu_konfirmasi",
    statusLabel: "Menunggu konfirmasi",
    title: "Pengembangan Karier dan Talenta ASN",
    mentorOrCoachLabel: "Mentor:",
    mentorOrCoachName: "Dr. Sari Wulandari",
    mentorInitials: "SW",
    timeLabel: "Dibuat:",
    timeValue: "3 hari lalu",
    token: "CMC-4821-7X9A",
    alertType: "amber",
    alertText: "Sudah 3 hari menunggu respon.",
    section: "perlu_tindakan",
  };

  const mockActiveSession: SessionItem = {
    id: "sesi-3",
    category: "Coaching",
    status: "berlangsung",
    statusLabel: "Berlangsung",
    title: "Penguatan Kepemimpinan Pelayanan Publik",
    mentorOrCoachLabel: "Coach:",
    mentorOrCoachName: "Rudi Santoso, M.M.",
    mentorInitials: "RS",
    timeLabel: "Berikutnya:",
    timeValue: "16 Jan 2025",
    currentJp: 3,
    targetJp: 6,
    progressNote: "1 dari 3 pertemuan terverifikasi",
    section: "berlangsung",
  };

  it("should render pending session card with token and action buttons", () => {
    const handleCopy = vi.fn();
    const handleResend = vi.fn();

    render(
      <SesiCard
        session={mockPendingSession}
        index={0}
        onCopyToken={handleCopy}
        onResendNotif={handleResend}
      />
    );

    expect(screen.getByText("Pengembangan Karier dan Talenta ASN")).toBeInTheDocument();
    expect(screen.getByText("Mentor:")).toBeInTheDocument();
    expect(screen.getByText("Dr. Sari Wulandari")).toBeInTheDocument();
    expect(screen.getByText("CMC-4821-7X9A")).toBeInTheDocument();

    const copyBtn = screen.getByTitle("Klik untuk menyalin token pairing");
    fireEvent.click(copyBtn);
    expect(handleCopy).toHaveBeenCalledWith("sesi-1", "CMC-4821-7X9A");

    const resendBtn = screen.getByRole("button", { name: /kirim ulang notifikasi/i });
    fireEvent.click(resendBtn);
    expect(handleResend).toHaveBeenCalledWith("sesi-1", "Pengembangan Karier dan Talenta ASN");
  });

  it("should render ongoing active session with progress bar and continue link", () => {
    render(<SesiCard session={mockActiveSession} index={1} />);

    expect(screen.getByText("Penguatan Kepemimpinan Pelayanan Publik")).toBeInTheDocument();
    expect(screen.getByText("3 / 6 JP")).toBeInTheDocument();
    expect(screen.getByText("1 dari 3 pertemuan terverifikasi")).toBeInTheDocument();

    const lanjutLink = screen.getByRole("link", { name: /lanjutkan/i });
    expect(lanjutLink).toHaveAttribute("href", "/sesi/detail/sesi-3");
  });
});
