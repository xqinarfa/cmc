import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchableSelect from "@/components/common/SearchableSelect";

describe("SearchableSelect component", () => {
  const options = [
    { value: "BPPTL", label: "Balai Pendidikan Pelatihan Transportasi Laut", code: "1101" },
    { value: "BP3IP", label: "Balai Besar Pendidikan Penyegaran Pelayaran", code: "1102" },
    { value: "PUSBANG", label: "Pusbang SDM Aparatur Perhubungan", code: "1201" },
  ];

  it("renders default label when value is 'all'", () => {
    render(
      <SearchableSelect
        value="all"
        onChange={vi.fn()}
        options={options}
        allOptionLabel="Semua Satuan Kerja"
      />
    );

    expect(screen.getByText("Semua Satuan Kerja")).toBeInTheDocument();
  });

  it("renders selected option label and code when a value is selected", () => {
    render(
      <SearchableSelect
        value="BPPTL"
        onChange={vi.fn()}
        options={options}
        allOptionLabel="Semua Satuan Kerja"
      />
    );

    expect(
      screen.getByText("[1101] Balai Pendidikan Pelatihan Transportasi Laut")
    ).toBeInTheDocument();
  });

  it("opens dropdown and filters options when searching", () => {
    render(
      <SearchableSelect
        value="all"
        onChange={vi.fn()}
        options={options}
        allOptionLabel="Semua Satuan Kerja"
        searchPlaceholder="Cari Satuan Kerja..."
      />
    );

    // Open dropdown
    const trigger = screen.getByText("Semua Satuan Kerja");
    fireEvent.click(trigger);

    // Search input should be rendered
    const input = screen.getByPlaceholderText("Cari Satuan Kerja...");
    expect(input).toBeInTheDocument();

    // Type search query
    fireEvent.change(input, { target: { value: "Aparatur" } });

    // Should display matching item
    expect(
      screen.getByText("Pusbang SDM Aparatur Perhubungan")
    ).toBeInTheDocument();

    // Non-matching items should not appear
    expect(
      screen.queryByText("Balai Pendidikan Pelatihan Transportasi Laut")
    ).not.toBeInTheDocument();
  });

  it("calls onChange when an option is selected", () => {
    const handleChange = vi.fn();
    render(
      <SearchableSelect
        value="all"
        onChange={handleChange}
        options={options}
        allOptionLabel="Semua Satuan Kerja"
      />
    );

    // Open dropdown
    fireEvent.click(screen.getByText("Semua Satuan Kerja"));

    // Click on option
    fireEvent.click(
      screen.getByText("Balai Pendidikan Pelatihan Transportasi Laut")
    );

    expect(handleChange).toHaveBeenCalledWith("BPPTL");
  });

  it("clears selection back to 'all' when clear button is clicked", () => {
    const handleChange = vi.fn();
    render(
      <SearchableSelect
        value="BPPTL"
        onChange={handleChange}
        options={options}
        allOptionLabel="Semua Satuan Kerja"
      />
    );

    const clearBtn = screen.getByTitle("Reset pilihan");
    fireEvent.click(clearBtn);

    expect(handleChange).toHaveBeenCalledWith("all");
  });
});
