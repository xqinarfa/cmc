import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PesertaSesiCard from "@/components/sesi/detail/PesertaSesiCard";
import type { ApiSession } from "@/lib/api";

describe("PesertaSesiCard Component", () => {
  it("renders 1-on-1 participant information correctly", () => {
    const mockSession: ApiSession = {
      id: "test-session-1",
      client_id: "client-1",
      type: "coaching",
      status: "confirmed",
      title: "Coaching Kepemimpinan",
      session_format: "1-on-1",
      current_jp: 2,
      target_jp: 6,
      created_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-01-01T00:00:00Z",
      client: {
        id: "client-1",
        nip: "199403302025052001",
        email: "desy@kemenhub.go.id",
        full_name: "Desy Manurung, S.Tr.Pel.",
        role: "pegawai",
        jabatan: "Pengelola Kepegawaian",
        unit_kerja: "Biro Kepegawaian dan Organisasi",
      },
    };

    render(<PesertaSesiCard session={mockSession} />);

    expect(screen.getByText("Informasi Peserta Sesi")).toBeDefined();
    expect(screen.getByText("Desy Manurung, S.Tr.Pel.")).toBeDefined();
    expect(screen.getByText(/199403302025052001/)).toBeDefined();
    expect(screen.getByText(/Pengelola Kepegawaian/)).toBeDefined();
    expect(screen.getByText("👤 1-on-1 (Individu)")).toBeDefined();
  });

  it("renders 1-on-group participants information correctly", () => {
    const mockGroupSession: ApiSession = {
      id: "test-session-group",
      client_id: "client-1",
      type: "mentoring",
      status: "confirmed",
      title: "Mentoring Bersama",
      session_format: "1-on-group",
      current_jp: 4,
      target_jp: 6,
      notes:
        "Daftar Peserta Kelompok (Total 2 orang):\n1. Ahmad Fauzi (NIP: 198501012010121001)\n2. Siti Rahmawati (NIP: 199002022015032002)",
      created_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-01-01T00:00:00Z",
      client: {
        id: "client-1",
        nip: "198501012010121001",
        email: "ahmad@kemenhub.go.id",
        full_name: "Ahmad Fauzi",
        role: "pegawai",
      },
    };

    render(<PesertaSesiCard session={mockGroupSession} />);

    expect(screen.getByText("Informasi Peserta Sesi")).toBeDefined();
    expect(screen.getAllByText(/1-on-Group/).length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ahmad Fauzi").length).toBeGreaterThan(0);
    expect(screen.getByText("Siti Rahmawati")).toBeDefined();
    expect(screen.getByText(/199002022015032002/)).toBeDefined();
  });
});
