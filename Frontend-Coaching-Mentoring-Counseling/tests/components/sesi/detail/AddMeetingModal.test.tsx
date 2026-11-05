import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AddMeetingModal } from "@/components/sesi/detail/AddMeetingModal";

describe("AddMeetingModal Component", () => {
  it("renders correctly when open and handles form changes and submission", () => {
    const handleClose = vi.fn();
    const handleSubmit = vi.fn((e) => e.preventDefault());
    const handleSetTitle = vi.fn();
    const handleSetDate = vi.fn();
    const handleSetType = vi.fn();
    const handleSetLocation = vi.fn();
    const handleSetSummary = vi.fn();

    render(
      <AddMeetingModal
        isOpen={true}
        meetingCount={2}
        onClose={handleClose}
        onSubmit={handleSubmit}
        title="Evaluasi Capaian"
        setTitle={handleSetTitle}
        date="2026-11-10"
        setDate={handleSetDate}
        type="Luring"
        setType={handleSetType}
        location="Ruang Rapat 1"
        setLocation={handleSetLocation}
        summary="Ringkasan evaluasi"
        setSummary={handleSetSummary}
      />
    );

    expect(screen.getByText("Tambah Pertemuan #3")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Evaluasi Capaian")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Ruang Rapat 1")).toBeInTheDocument();

    const titleInput = screen.getByPlaceholderText(
      /Evaluasi hasil aksi perubahan/i
    );
    fireEvent.change(titleInput, { target: { value: "Topik Baru" } });
    expect(handleSetTitle).toHaveBeenCalledWith("Topik Baru");

    const typeSelect = screen.getByDisplayValue("Luring");
    fireEvent.change(typeSelect, { target: { value: "Daring" } });
    expect(handleSetType).toHaveBeenCalledWith("Daring");

    const submitBtn = screen.getByRole("button", {
      name: /Simpan Sebagai Draf/i,
    });
    fireEvent.click(submitBtn);
    expect(handleSubmit).toHaveBeenCalled();

    const cancelBtn = screen.getByRole("button", { name: /Batal/i });
    fireEvent.click(cancelBtn);
    expect(handleClose).toHaveBeenCalled();
  });

  it("does not render modal when isOpen is false", () => {
    const { container } = render(
      <AddMeetingModal
        isOpen={false}
        meetingCount={0}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        title=""
        setTitle={vi.fn()}
        date=""
        setDate={vi.fn()}
        type="Luring"
        setType={vi.fn()}
        location=""
        setLocation={vi.fn()}
        summary=""
        setSummary={vi.fn()}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});

