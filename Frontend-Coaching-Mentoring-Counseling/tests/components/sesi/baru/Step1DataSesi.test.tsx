import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Step1DataSesi from "@/components/sesi/baru/Step1DataSesi";

describe("Step1DataSesi Component", () => {
  it("renders form elements and triggers callback on change", () => {
    const handleJenisChange = vi.fn();
    const handleTipeChange = vi.fn();
    const handleTopikChange = vi.fn();
    const handleTujuanChange = vi.fn();

    render(
      <Step1DataSesi
        jenisKegiatan="coaching"
        onJenisKegiatanChange={handleJenisChange}
        tipeSesi="1-on-1"
        onTipeSesiChange={handleTipeChange}
        topik="Peningkatan Kinerja"
        onTopikChange={handleTopikChange}
        tujuan="Mencapai target output triwulan"
        onTujuanChange={handleTujuanChange}
      />
    );

    expect(screen.getByText("Jenis Kegiatan")).toBeInTheDocument();
    expect(screen.getByText("Coaching")).toBeInTheDocument();
    expect(screen.getByText("Mentoring")).toBeInTheDocument();

    const mentoringOption = screen.getByText("Mentoring");
    fireEvent.click(mentoringOption);
    expect(handleJenisChange).toHaveBeenCalledWith("mentoring");

    const topikInput = screen.getByDisplayValue("Peningkatan Kinerja");
    fireEvent.change(topikInput, { target: { value: "Topik Diubah" } });
    expect(handleTopikChange).toHaveBeenCalledWith("Topik Diubah");

    const tujuanInput = screen.getByDisplayValue("Mencapai target output triwulan");
    fireEvent.change(tujuanInput, { target: { value: "Tujuan Diubah" } });
    expect(handleTujuanChange).toHaveBeenCalledWith("Tujuan Diubah");
  });
});
