import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  fetchSikPegawai,
  fetchMySikProfile,
  syncMyProfileWithSIK,
  syncMasterSIK,
  searchSikPegawai,
  fetchSikSyncHistories,
  fetchSikSyncHistoryDetail,
} from "@/lib/api/sik";

describe("SIK API Client", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("auth_token", "test-token-xyz");
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("fetchSikPegawai should fetch pegawai by NIP", async () => {
    const mockPegawai = {
      nip: "198904122014031002",
      nama: "Siti Wahyuni",
      jabatan: "Analis SDM Aparatur Ahli Pertama",
      unit_kerja: "Balai Pengelola Transportasi Darat Kelas II Jawa Barat",
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true, data: mockPegawai }),
    });

    const result = await fetchSikPegawai("198904122014031002");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url, options] = vi.mocked(global.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/api/v1/sik/pegawai/198904122014031002");
    expect((options.headers as Record<string, string>).Authorization).toBe("Bearer test-token-xyz");
    expect(result).toEqual(mockPegawai);
  });

  it("fetchMySikProfile should call /api/v1/sik/me with auth header", async () => {
    const mockProfile = {
      nip: "198904122014031002",
      nama: "Siti Wahyuni",
      pangkat: "Penata Muda Tk. I",
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true, data: mockProfile }),
    });

    const result = await fetchMySikProfile();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url] = vi.mocked(global.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/api/v1/sik/me");
    expect(result).toEqual(mockProfile);
  });

  it("syncMyProfileWithSIK should call /api/v1/users/sync-sik and update localStorage", async () => {
    const syncedUser = {
      id: "u-1",
      nip: "198904122014031002",
      nama_lengkap_gelar: "Siti Wahyuni, S.E.",
      jabatan: "Analis SDM Aparatur Ahli Pertama",
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true, data: syncedUser }),
    });

    const result = await syncMyProfileWithSIK();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url, options] = vi.mocked(global.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/api/v1/users/sync-sik");
    expect(options.method).toBe("POST");
    expect(result).toEqual(syncedUser);
    expect(localStorage.getItem("user")).toBe(JSON.stringify(syncedUser));
  });

  it("syncMyProfileWithSIK should return null and not call fetch when not logged in", async () => {
    localStorage.clear();
    global.fetch = vi.fn();

    const result = await syncMyProfileWithSIK();

    expect(global.fetch).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it("syncMasterSIK should call /api/v1/sik/sync and return response", async () => {
    const mockSyncResult = {
      total_pegawai: 15,
      source: "SIK Kemenhub (N3wPres3nsiApp5)",
      synced_at: new Date().toISOString(),
      message: "Master data pegawai berhasil disinkronkan",
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        success: true,
        message: "Master data SIK Kemenhub berhasil disinkronkan",
        data: mockSyncResult,
      }),
    });

    const result = await syncMasterSIK();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url, options] = vi.mocked(global.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/api/v1/sik/sync");
    expect(options.method).toBe("POST");
    expect(result.success).toBe(true);
    expect(result.data?.total_pegawai).toBe(15);
  });

  it("syncMasterSIK should support multiple offices up to 5", async () => {
    const mockMultiResult = {
      total_pegawai: 3,
      source: "SIK Kemenhub (N3wPres3nsiApp5)",
      synced_at: new Date().toISOString(),
      units: [
        {
          unit_kerja_id: "pusbang-aparatur",
          unit_kerja_nama: "Pusbang SDM Aparatur Perhubungan",
          total_pegawai: 2,
          success: true,
          message: "2 pegawai terverifikasi di unit ini",
        },
        {
          unit_kerja_id: "pusbang-darat",
          unit_kerja_nama: "Pusbang SDM Perhubungan Darat",
          total_pegawai: 1,
          success: true,
          message: "1 pegawai terverifikasi di unit ini",
        },
      ],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        success: true,
        message: "Master data SIK Kemenhub berhasil disinkronkan",
        data: mockMultiResult,
      }),
    });

    const result = await syncMasterSIK(["pusbang-aparatur", "pusbang-darat"]);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url, options] = vi.mocked(global.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/api/v1/sik/sync");
    expect(options.body).toBe(JSON.stringify({ unit_kerja_ids: ["pusbang-aparatur", "pusbang-darat"] }));
    expect(result.success).toBe(true);
    expect(result.data?.units).toHaveLength(2);
  });

  it("syncMasterSIK should reject more than 5 offices", async () => {
    global.fetch = vi.fn();
    const result = await syncMasterSIK(["1", "2", "3", "4", "5", "6"]);

    expect(global.fetch).not.toHaveBeenCalled();
    expect(result.success).toBe(false);
    expect(result.message).toContain("Maksimal 5 kantor");
  });

  it("searchSikPegawai should send query params correctly", async () => {
    const mockResult = {
      items: [
        { nip: "198904122014031002", nama: "Siti Wahyuni" },
      ],
      total: 1,
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true, data: mockResult }),
    });

    const result = await searchSikPegawai("Siti", 10, 0);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url] = vi.mocked(global.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toContain("q=Siti");
    expect(url).toContain("limit=10");
    expect(result.items).toHaveLength(1);
    expect(result.total).toBe(1);
  });

  it("fetchSikSyncHistories should fetch list of sync audit runs", async () => {
    const mockHistories = {
      items: [
        {
          id: "sync-20261117-001",
          sync_type: "MULTI_UNIT",
          status: "SUCCESS",
          total_fetched: 230,
          total_inserted: 0,
          total_updated: 3,
        },
      ],
      total: 1,
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true, data: mockHistories }),
    });

    const result = await fetchSikSyncHistories(20, 0, "SUCCESS");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url] = vi.mocked(global.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/api/v1/sik/sync-history");
    expect(url).toContain("status=SUCCESS");
    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toBe("sync-20261117-001");
  });

  it("fetchSikSyncHistoryDetail should fetch single sync run detail with changes log", async () => {
    const mockDetail = {
      id: "sync-20261117-001",
      sync_type: "MULTI_UNIT",
      status: "SUCCESS",
      changes_log: [
        {
          nip: "198507202008121003",
          nama: "RIDWAN GUNAWAN",
          action: "UPDATE",
          details: "Sub Unit Kerja diperbarui",
        },
      ],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true, data: mockDetail }),
    });

    const result = await fetchSikSyncHistoryDetail("sync-20261117-001");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url] = vi.mocked(global.fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/api/v1/sik/sync-history/sync-20261117-001");
    expect(result).not.toBeNull();
    expect(result?.changes_log).toHaveLength(1);
  });
});

