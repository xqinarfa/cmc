import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  fetchSatuanKerjaList,
  fetchPegawaiBySatuanKerja,
  fetchUnitKerjaList,
  fetchPegawaiByUnitKerja,
  fetchSubUnitKerjaList,
  fetchSubUnitKerjaById,
  fetchPegawaiBySubUnitKerja,
  fetchSIKReferences,
} from "@/lib/api/organization";

describe("Organization & SIK Query API Client", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("auth_token", "org-test-token");
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("fetchSatuanKerjaList should call /api/v1/satuan-kerja with query and sort by kode ASC", async () => {
    const unsortedSatker = [
      { id: "setjen", kode: "SETJEN", nama: "Sekretariat Jenderal", total_pegawai: 10 },
      { id: "bpsdm", kode: "BPSDM", nama: "BPSDM Perhubungan", total_pegawai: 5 },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: unsortedSatker }),
    });

    const result = await fetchSatuanKerjaList("kemenhub");
    const [url] = vi.mocked(global.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/api/v1/satuan-kerja?q=kemenhub");
    // Should be sorted by kode ASC: BPSDM before SETJEN
    expect(result[0].kode).toBe("BPSDM");
    expect(result[1].kode).toBe("SETJEN");
  });

  it("fetchUnitKerjaList should call /api/v1/unit-kerja with satker filter and sort by kode ASC", async () => {
    const unsortedUnits = [
      {
        id: "pusbang-udara",
        kode: "BPSDM-PUSBANG-UDARA",
        nama: "Pusbang SDM Perhubungan Udara",
        satuan_kerja_id: "bpsdm",
        satuan_kerja_nama: "BPSDM Perhubungan",
      },
      {
        id: "pusbang-aparatur",
        kode: "BPSDM-PUSBANG-APARATUR",
        nama: "Pusbang SDM Aparatur Perhubungan",
        satuan_kerja_id: "bpsdm",
        satuan_kerja_nama: "BPSDM Perhubungan",
      },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: unsortedUnits }),
    });

    const result = await fetchUnitKerjaList("bpsdm");
    const [url] = vi.mocked(global.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/api/v1/unit-kerja?satuan_kerja_id=bpsdm");
    // Sorted by kode ASC: BPSDM-PUSBANG-APARATUR before BPSDM-PUSBANG-UDARA
    expect(result[0].kode).toBe("BPSDM-PUSBANG-APARATUR");
    expect(result[1].kode).toBe("BPSDM-PUSBANG-UDARA");
  });

  it("fetchSubUnitKerjaList should call /api/v1/sub-unit-kerja and sort by kode ASC", async () => {
    const mockSubUnits = [
      {
        id: "bpsdm-pusbang-aparatur-prog",
        kode: "BPSDM-PUSBANG-APARATUR-PROG",
        nama: "Bidang Program dan Kerjasama",
        unit_kerja_id: "pusbang-aparatur",
        unit_kerja_nama: "Pusbang SDM Aparatur Perhubungan",
      },
      {
        id: "bpsdm-pusbang-aparatur-lat",
        kode: "BPSDM-PUSBANG-APARATUR-LAT",
        nama: "Bidang Penyelenggaraan Pelatihan dan Asesmen",
        unit_kerja_id: "pusbang-aparatur",
        unit_kerja_nama: "Pusbang SDM Aparatur Perhubungan",
      },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: mockSubUnits }),
    });

    const result = await fetchSubUnitKerjaList("pusbang-aparatur");
    const [url] = vi.mocked(global.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/api/v1/sub-unit-kerja?unit_kerja_id=pusbang-aparatur");
    // Sorted by kode ASC: LAT before PROG
    expect(result[0].kode).toBe("BPSDM-PUSBANG-APARATUR-LAT");
    expect(result[1].kode).toBe("BPSDM-PUSBANG-APARATUR-PROG");
  });

  it("fetchSubUnitKerjaById should fetch a specific sub unit kerja", async () => {
    const mockDetail = {
      id: "bpsdm-pusbang-aparatur-tu",
      kode: "BPSDM-PUSBANG-APARATUR-TU",
      nama: "Subbagian Tata Usaha & Rumah Tangga",
      unit_kerja_id: "pusbang-aparatur",
      unit_kerja_nama: "Pusbang SDM Aparatur Perhubungan",
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: mockDetail }),
    });

    const result = await fetchSubUnitKerjaById("bpsdm-pusbang-aparatur-tu");
    const [url] = vi.mocked(global.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/api/v1/sub-unit-kerja/bpsdm-pusbang-aparatur-tu");
    expect(result?.kode).toBe("BPSDM-PUSBANG-APARATUR-TU");
  });

  it("fetchPegawaiBySubUnitKerja should query pegawai by sub unit", async () => {
    const mockPegawai = [
      { nip: "198501102008012003", nama: "Maya Kusuma", sub_unit_kerja: "Bidang Penyelenggaraan Pelatihan dan Asesmen" },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: { items: mockPegawai, total: 1, limit: 20, offset: 0 },
      }),
    });

    const result = await fetchPegawaiBySubUnitKerja("bpsdm-pusbang-aparatur-lat");
    const [url] = vi.mocked(global.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/api/v1/sub-unit-kerja/bpsdm-pusbang-aparatur-lat/pegawai");
    expect(result.items).toEqual(mockPegawai);
    expect(result.total).toBe(1);
  });

  it("fetchPegawaiByUnitKerja should query pegawai by unit", async () => {
    const mockPegawai = [
      { nip: "197805152003121001", nama: "Rudi Setiawan", unit_kerja: "Pusbang SDM Aparatur Perhubungan" },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: { items: mockPegawai, total: 1, limit: 20, offset: 0 },
      }),
    });

    const result = await fetchPegawaiByUnitKerja("pusbang-aparatur");
    const [url] = vi.mocked(global.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/api/v1/unit-kerja/pusbang-aparatur/pegawai");
    expect(result.items).toEqual(mockPegawai);
    expect(result.total).toBe(1);
  });

  it("fetchPegawaiBySatuanKerja should query pegawai by satker", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: { items: [], total: 0 },
      }),
    });

    await fetchPegawaiBySatuanKerja("hubdat");
    const [url] = vi.mocked(global.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/api/v1/satuan-kerja/hubdat/pegawai");
  });

  it("fetchSIKReferences should call /api/v1/sik/referensi", async () => {
    const mockRef = {
      satuan_kerja: [{ nama: "BPSDM Perhubungan", total: 5 }],
      unit_kerja: [{ nama: "Pusbang SDM Aparatur Perhubungan", total: 3 }],
      sub_unit_kerja: [{ nama: "Subbagian Tata Usaha", total: 2 }],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: mockRef }),
    });

    const result = await fetchSIKReferences();
    const [url] = vi.mocked(global.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/api/v1/sik/referensi");
    expect(result.satuan_kerja).toHaveLength(1);
    expect(result.sub_unit_kerja).toHaveLength(1);
  });
});
