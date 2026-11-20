import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SertifikatPage from "@/app/sertifikat/page";
import {
  buildCertificatesFromDatabase,
  verifyCertificateCode,
} from "@/lib/certificateData";
import { ApiSession, ApiUser } from "@/lib/api";

const mockPush = vi.fn();

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/sertifikat",
}));

// Mock API calls
const mockFetchSessions = vi.fn();
const mockFetchCurrentUser = vi.fn();

vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual("@/lib/api");
  return {
    ...actual,
    fetchSessions: () => mockFetchSessions(),
    fetchCurrentUser: () => mockFetchCurrentUser(),
  };
});

describe("buildCertificatesFromDatabase helper", () => {
  const mockUser: ApiUser = {
    id: "u-123",
    nip: "199001012015031001",
    email: "andi@kemenhub.go.id",
    full_name: "Andi Saputra, S.T.",
    role: "pegawai",
    jabatan: "Inspektur Keselamatan Penerbangan",
    unit_kerja: "Ditjen Perhubungan Udara",
    satuan_kerja: "Kantor Otoritas Bandara Wilayah I",
    pangkat_golongan: "Penata (III/c)",
  };

  const mockSessions: ApiSession[] = [
    {
      id: "ses-uuid-1",
      client_id: "u-123",
      type: "coaching",
      status: "completed",
      title: "Coaching Kepemimpinan Publik",
      current_jp: 4,
      target_jp: 4,
      created_at: "2026-10-15T09:00:00Z",
      updated_at: "2026-10-15T11:00:00Z",
      practitioner: {
        id: "p-1",
        nip: "197501011999031002",
        email: "coach@kemenhub.go.id",
        full_name: "Dr. Budi Utomo, M.M.",
        role: "coach",
      },
      pertemuan_list: [
        {
          id: "m-1",
          session_id: "ses-uuid-1",
          meeting_number: 1,
          title: "Pertemuan 1: Identifikasi Sasaran Kinerja",
          status: "completed",
        },
        {
          id: "m-2",
          session_id: "ses-uuid-1",
          meeting_number: 2,
          title: "Pertemuan 2: Evaluasi & Komitmen Aksi",
          status: "completed",
        },
      ],
    },
    {
      id: "ses-uuid-2",
      client_id: "u-123",
      type: "mentoring",
      status: "completed",
      title: "Mentoring Manajemen Audit Transportasi",
      current_jp: 6,
      target_jp: 6,
      created_at: "2026-11-01T10:00:00Z",
      updated_at: "2026-11-01T12:00:00Z",
      practitioner: {
        id: "p-2",
        nip: "197202021998031001",
        email: "mentor@kemenhub.go.id",
        full_name: "Ir. Hendra Kusuma",
        role: "mentor",
      },
    },
  ];

  it("returns empty array when sessions array is empty", () => {
    const certs = buildCertificatesFromDatabase([], mockUser);
    expect(certs).toEqual([]);
  });

  it("builds individual session certificates and a cumulative certificate", () => {
    const certs = buildCertificatesFromDatabase(mockSessions, mockUser);

    // Expect 1 cumulative certificate + 2 session certificates = 3
    expect(certs.length).toBe(3);

    // 1. Kumulatif certificate
    const kumulatif = certs[0];
    expect(kumulatif.category).toBe("kumulatif");
    expect(kumulatif.jp).toBe(10); // 4 + 6 JP
    expect(kumulatif.recipient?.name).toBe("Andi Saputra, S.T.");
    expect(kumulatif.recipient?.nip).toBe("199001012015031001");

    // 2. Coaching certificate
    const coachingCert = certs.find((c) => c.category === "coaching");
    expect(coachingCert).toBeDefined();
    expect(coachingCert?.title).toBe("Coaching Kepemimpinan Publik");
    expect(coachingCert?.jp).toBe(4);
    expect(coachingCert?.coachOrMentor.name).toBe("Dr. Budi Utomo, M.M.");
    expect(coachingCert?.modules?.length).toBe(2);

    // 3. Mentoring certificate
    const mentoringCert = certs.find((c) => c.category === "mentoring");
    expect(mentoringCert).toBeDefined();
    expect(mentoringCert?.title).toBe("Mentoring Manajemen Audit Transportasi");
    expect(mentoringCert?.jp).toBe(6);
    expect(mentoringCert?.coachOrMentor.name).toBe("Ir. Hendra Kusuma");
  });

  it("verifies real certificate code against database certificates", () => {
    const certs = buildCertificatesFromDatabase(mockSessions, mockUser);
    const coachingCert = certs.find((c) => c.category === "coaching")!;

    const result = verifyCertificateCode(coachingCert.certNumber, certs);
    expect(result).not.toBeNull();
    expect(result?.recipientName).toBe("Andi Saputra, S.T.");
    expect(result?.jp).toBe(4);
  });
});

describe("SertifikatPage Component", () => {
  const mockUser: ApiUser = {
    id: "u-123",
    nip: "199001012015031001",
    email: "andi@kemenhub.go.id",
    full_name: "Andi Saputra, S.T.",
    role: "pegawai",
    jabatan: "Inspektur Keselamatan Penerbangan",
    unit_kerja: "Ditjen Perhubungan Udara",
  };

  const mockSessions: ApiSession[] = [
    {
      id: "ses-101",
      client_id: "u-123",
      type: "coaching",
      status: "completed",
      title: "Coaching Kepemimpinan Transformasional",
      current_jp: 6,
      target_jp: 6,
      created_at: "2026-11-10T08:00:00Z",
      updated_at: "2026-11-10T10:00:00Z",
      practitioner: {
        id: "p-1",
        nip: "19780101",
        email: "coach@kemenhub.go.id",
        full_name: "Dr. Budi Utomo",
        role: "coach",
      },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem("auth_token", "test-mock-token");
  });

  it("redirects to /login when user is unauthenticated", async () => {
    localStorage.clear();

    render(<SertifikatPage />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login?redirect=/sertifikat");
    });
  });

  it("loads and renders real certificates from database", async () => {
    mockFetchCurrentUser.mockResolvedValue(mockUser);
    mockFetchSessions.mockResolvedValue(mockSessions);

    render(<SertifikatPage />);

    // Wait for data to load and render
    await waitFor(() => {
      expect(
        screen.getByText("Coaching Kepemimpinan Transformasional")
      ).toBeInTheDocument();
    });

    // Check Metrics & Titles
    expect(screen.getByText("Sertifikat Diterbitkan")).toBeInTheDocument();
    expect(screen.getByText("Jam Pelajaran (JP) Sah")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument(); // 6 JP
  });

  it("filters certificates by category and search", async () => {
    mockFetchCurrentUser.mockResolvedValue(mockUser);
    mockFetchSessions.mockResolvedValue(mockSessions);

    render(<SertifikatPage />);

    await waitFor(() => {
      expect(
        screen.getByText("Coaching Kepemimpinan Transformasional")
      ).toBeInTheDocument();
    });

    // Click category "Mentoring" (which has 0 items in this mock)
    const mentoringTab = screen.getByText(/Mentoring \(0\)/i);
    fireEvent.click(mentoringTab);

    // Empty state should be visible
    expect(
      screen.getByText("Belum Ada Sertifikat Diterbitkan")
    ).toBeInTheDocument();

    // Click "Semua" to restore
    const allTab = screen.getByText(/Semua \(2\)/i);
    fireEvent.click(allTab);

    expect(
      screen.getByText("Coaching Kepemimpinan Transformasional")
    ).toBeInTheDocument();
  });
});
