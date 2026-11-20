import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import CatatPertemuanPage from "@/app/sesi/detail/catat/page";
import * as api from "@/lib/api";

const mockPush = vi.fn();

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === "sessionId") return "ses-100";
      if (key === "pertemuan") return "1";
      if (key === "meetingId") return "m-1";
      return null;
    },
  }),
  usePathname: () => "/sesi/detail/catat",
}));

// Mock API
vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual("@/lib/api");
  return {
    ...actual,
    fetchSession: vi.fn(),
    fetchSessions: vi.fn(),
    fetchCurrentUser: vi.fn(),
    addMeeting: vi.fn(),
    updateMeeting: vi.fn(),
    saveCatatanPertemuan: vi.fn(),
  };
});

describe("CatatPertemuanPage Component - Participant Isolation Rules", () => {
  const mockGroupSession: api.ApiSession = {
    id: "ses-100",
    client_id: "u-1",
    title: "Coaching Kepemimpinan Tim Pelayanan",
    type: "coaching",
    status: "confirmed",
    current_jp: 0,
    target_jp: 6,
    created_at: "2026-11-15T08:00:00Z",
    updated_at: "2026-11-15T08:00:00Z",
    practitioner: {
      id: "p-coach",
      full_name: "Coach Dr. Rudi Santoso, M.M.",
      nip: "197501011999031001",
      email: "rudi@dephub.go.id",
      role: "coach",
      jabatan: "Master Coach BPSDMP",
    },
    peserta_list: [
      {
        id: "peserta-1",
        session_id: "ses-100",
        nip: "198801012010121001",
        nama: "Ahmad Dahlan",
        role_in_session: "utama",
        jabatan: "Analis Kebijakan",
      },
      {
        id: "peserta-2",
        session_id: "ses-100",
        nip: "199203152015032002",
        nama: "Siti Rahmawati",
        role_in_session: "anggota",
        jabatan: "Pranata Komputer",
      },
      {
        id: "peserta-3",
        session_id: "ses-100",
        nip: "199407202018011003",
        nama: "Budi Kurniawan",
        role_in_session: "anggota",
        jabatan: "Pengadministrasi Umum",
      },
    ],
    pertemuan_list: [
      {
        id: "m-1",
        session_id: "ses-100",
        meeting_number: 1,
        title: "Pertemuan 1: Kickoff Coaching",
        scheduled_date: "2026-11-20 09:00",
        meeting_type: "Luring",
        status: "confirmed",
        catatan_list: [
          {
            id: "catatan-1",
            session_id: "ses-100",
            session_pertemuan_id: "m-1",
            nip: "198801012010121001",
            nama: "Ahmad Dahlan",
            tujuan: "Kickoff Coaching",
            pembahasan: "Pembahasan target kinerja",
            status: "completed",
            jp_collected: 2,
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("locks note reporting to the logged-in participant and forbids switching to other participants", async () => {
    // Current user is participant 2 (Siti Rahmawati)
    const loggedInUser: api.ApiUser = {
      id: "u-2",
      nip: "199203152015032002",
      email: "siti.rahmawati@dephub.go.id",
      full_name: "Siti Rahmawati",
      role: "pegawai",
      jabatan: "Pranata Komputer",
    };

    localStorage.setItem("user", JSON.stringify(loggedInUser));
    localStorage.setItem("auth_token", "valid-token");

    vi.mocked(api.fetchSession).mockResolvedValue(mockGroupSession);
    vi.mocked(api.fetchCurrentUser).mockResolvedValue(loggedInUser);

    render(<CatatPertemuanPage />);

    // Wait for session and participant data to load
    await waitFor(() => {
      expect(screen.getAllByText("Siti Rahmawati").length).toBeGreaterThan(0);
    });

    // Verify locked identity to Siti Rahmawati
    expect(screen.getByText("Terkunci ke Akun Anda")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Setiap peserta hanya dapat membuat catatan untuk dirinya sendiri\. Catatan tidak dapat dibuatkan atau diwakilkan oleh peserta lain\./i
      )
    ).toBeInTheDocument();

    // Verify the old switch participant dropdown is NOT present
    expect(screen.queryByLabelText("Ganti Peserta:")).not.toBeInTheDocument();
    expect(screen.queryByRole("combobox", { name: /Ganti Peserta/i })).not.toBeInTheDocument();

    // Verify group overview is read-only
    expect(screen.getByText(/Status Pengisian Peserta Kelompok/i)).toBeInTheDocument();
    expect(screen.getByText("(Anda)")).toBeInTheDocument();
  });

  it("blocks and warns users who are not registered participants in this session", async () => {
    // Logged in user is an outside employee not in peserta_list
    const outsiderUser: api.ApiUser = {
      id: "u-stranger",
      nip: "199999999999999999",
      email: "stranger@dephub.go.id",
      full_name: "Zulkifli Hasan",
      role: "pegawai",
      jabatan: "Staf Umum",
    };

    localStorage.setItem("user", JSON.stringify(outsiderUser));
    localStorage.setItem("auth_token", "valid-token");

    vi.mocked(api.fetchSession).mockResolvedValue(mockGroupSession);
    vi.mocked(api.fetchCurrentUser).mockResolvedValue(outsiderUser);

    render(<CatatPertemuanPage />);

    await waitFor(() => {
      expect(screen.getByText("Akses Pembuatan Catatan Dibatasi")).toBeInTheDocument();
    });

    expect(
      screen.getByText(
        /setiap peserta tidak dapat membuat catatan untuk peserta lain/i
      )
    ).toBeInTheDocument();

    // Button should be disabled
    const nextBtn = screen.getByRole("button", { name: /^Lanjut$/i });
    expect(nextBtn).toBeDisabled();
  });
});
