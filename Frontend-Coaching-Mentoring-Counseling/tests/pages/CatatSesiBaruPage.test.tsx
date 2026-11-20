import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CatatSesiBaruPage from "@/app/sesi/baru/page";

const mockPush = vi.fn();
const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
  usePathname: () => "/sesi/baru",
  useSearchParams: () => new URLSearchParams(),
}));

describe("CatatSesiBaruPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem("auth_token", "test-mock-token");
    localStorage.setItem(
      "user",
      JSON.stringify({
        full_name: "Test User",
        nip: "199001012015011001",
        unit_kerja: "Balai Pengujian",
        role: "admin",
      })
    );
  });

  it("renders and handles typing in inputs without freezing", () => {
    render(<CatatSesiBaruPage />);

    expect(screen.getAllByText("Catat Sesi Baru")[0]).toBeInTheDocument();
    expect(screen.getByText("Jenis Kegiatan")).toBeInTheDocument();

    const topikInput = screen.getByPlaceholderText(/Misal: Peningkatan kemampuan/i);
    fireEvent.change(topikInput, { target: { value: "Topik Baru Test" } });
    expect(topikInput).toHaveValue("Topik Baru Test");

    const tujuanInput = screen.getByPlaceholderText(/Apa yang ingin Anda capai/i);
    fireEvent.change(tujuanInput, { target: { value: "Tujuan Baru Test" } });
    expect(tujuanInput).toHaveValue("Tujuan Baru Test");

    // Click next to step 2
    const nextBtn = screen.getByText("Lanjut");
    fireEvent.click(nextBtn);

    expect(screen.getByText(/Data Diri Pegawai/i)).toBeInTheDocument();
  });
});
