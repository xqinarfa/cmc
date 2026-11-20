import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CatatSuccessModal from "@/components/sesi/detail/catat/CatatSuccessModal";

describe("CatatSuccessModal Component", () => {
  it("renders the exact notification text requested by the user", () => {
    const handleClose = vi.fn();
    const handleBack = vi.fn();

    render(
      <CatatSuccessModal
        isOpen={true}
        pertemuanKe={2}
        onClose={handleClose}
        onBackToDetail={handleBack}
        practitionerName="Coach Rudi Santoso, M.M."
        atasanName="Atasan Langsung"
      />
    );

    // Title: Pertemuan #2 Berhasil Dicatat!
    expect(screen.getByText("Pertemuan #2 Berhasil Dicatat!")).toBeDefined();

    // Body: Catatan pertemuan telah disimpan dan notifikasi verifikasi telah dikirimkan ke Coach Rudi Santoso, M.M. serta Atasan Langsung.
    expect(
      screen.getByText(
        "Catatan pertemuan telah disimpan dan notifikasi verifikasi telah dikirimkan ke Coach Rudi Santoso, M.M. serta Atasan Langsung."
      )
    ).toBeDefined();

    // Box: Potensi Penambahan Jam Pelajaran
    expect(screen.getByText("Potensi Penambahan Jam Pelajaran")).toBeDefined();
    expect(screen.getByText("+ 2 JP")).toBeDefined();
    expect(
      screen.getByText("Akan tercatat resmi setelah Atasan Langsung memverifikasi")
    ).toBeDefined();
  });
});
