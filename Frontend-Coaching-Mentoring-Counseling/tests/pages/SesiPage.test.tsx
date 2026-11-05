import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import SesiHomePage from "@/app/sesi/page";
import * as api from "@/lib/api";

const mockPush = vi.fn();
const mockReplace = vi.fn();

// Mock next/navigation completely
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
  usePathname: () => "/sesi",
  useSearchParams: () => new URLSearchParams(),
}));

describe("SesiHomePage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem("auth_token", "test-mock-token");
  });

  it("redirects to /login when user is unauthenticated", async () => {
    localStorage.clear();

    render(<SesiHomePage />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  it("fetches sessions from API and renders session list", async () => {
    const mockApiSessions: api.ApiSession[] = [
      {
        id: "sess-123",
        client_id: "client-1",
        title: "Mentoring Penguatan ASN",
        type: "mentoring",
        status: "pending",
        token: "CMC-1234-5678",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        practitioner: {
          id: "p-1",
          nip: "198203152005012001",
          email: "mentor@dephub.go.id",
          full_name: "Dr. Sari Wulandari",
          role: "mentor",
        },
      },
    ];

    vi.spyOn(api, "fetchSessions").mockResolvedValue(mockApiSessions);

    render(<SesiHomePage />);

    await waitFor(() => {
      expect(screen.getByText("Mentoring Penguatan ASN")).toBeInTheDocument();
      expect(screen.getByText("Dr. Sari Wulandari")).toBeInTheDocument();
      expect(screen.getByText("CMC-1234-5678")).toBeInTheDocument();
    });
  });

  it("renders empty state when no sessions are found", async () => {
    vi.spyOn(api, "fetchSessions").mockResolvedValue([]);

    render(<SesiHomePage />);

    await waitFor(() => {
      expect(screen.getByText("Tidak ada sesi yang cocok")).toBeInTheDocument();
    });
  });
});
