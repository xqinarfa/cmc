import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  fetchSessions,
  fetchSession,
  bookSession,
  updateSessionStatus,
  addMeeting,
  deleteMeeting,
  resendNotification,
  fetchPractitioners,
  fetchCurrentUser,
} from "./sessions";

describe("sessions API client", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("auth_token", "fake-jwt-token-123");
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("fetchSessions should include bearer token and parse array response", async () => {
    const mockSessions = [
      { id: "s-1", title: "Sesi Coaching", type: "coaching", status: "pending" },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ data: mockSessions }),
    });

    const result = await fetchSessions({ status: "pending", type: "coaching" });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url, options] = (global.fetch as any).mock.calls[0];
    expect(url).toContain("/sessions?status=pending&type=coaching");
    expect(options.headers.Authorization).toBe("Bearer fake-jwt-token-123");
    expect(result).toEqual(mockSessions);
  });

  it("fetchSession should fetch single session by id", async () => {
    const mockSession = { id: "session-uuid", title: "Detail Sesi" };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ data: mockSession }),
    });

    const result = await fetchSession("session-uuid");
    expect(result).toEqual(mockSession);
    const [url] = (global.fetch as any).mock.calls[0];
    expect(url).toContain("/sessions/session-uuid");
  });

  it("bookSession should send POST request with JSON body", async () => {
    const input = {
      practitioner_id: "p-1",
      type: "coaching",
      title: "Target Kinerja 2026",
      session_format: "1-on-1",
    };
    const created = { id: "s-new", ...input, token: "CMC-1111-2222" };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ data: created }),
    });

    const result = await bookSession(input);
    expect(result).toEqual(created);
    const [, options] = (global.fetch as any).mock.calls[0];
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body)).toEqual(input);
  });

  it("updateSessionStatus should send PATCH with status and notes", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });

    await updateSessionStatus("s-1", "confirmed", "Catatan persetujuan");
    const [url, options] = (global.fetch as any).mock.calls[0];
    expect(url).toContain("/sessions/s-1/status");
    expect(options.method).toBe("PATCH");
    expect(JSON.parse(options.body)).toEqual({
      status: "confirmed",
      notes: "Catatan persetujuan",
    });
  });

  it("addMeeting should send POST with meeting payload", async () => {
    const meetingPayload = {
      title: "Pertemuan 1",
      meeting_type: "Luring",
      jp_collected: 2,
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ data: { id: "m-1", ...meetingPayload } }),
    });

    const result = await addMeeting("s-1", meetingPayload);
    expect(result.title).toBe("Pertemuan 1");
    const [url, options] = (global.fetch as any).mock.calls[0];
    expect(url).toContain("/sessions/s-1/meetings");
    expect(options.method).toBe("POST");
  });

  it("deleteMeeting should call DELETE endpoint", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });

    await deleteMeeting("s-1", "m-1");
    const [url, options] = (global.fetch as any).mock.calls[0];
    expect(url).toContain("/sessions/s-1/meetings/m-1");
    expect(options.method).toBe("DELETE");
  });

  it("resendNotification should call POST endpoint", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });

    await resendNotification("s-1");
    const [url, options] = (global.fetch as any).mock.calls[0];
    expect(url).toContain("/sessions/s-1/resend-notification");
    expect(options.method).toBe("POST");
  });

  it("fetchPractitioners should return list of practitioners", async () => {
    const mockPractitioners = [
      { id: "p-1", full_name: "Coach Budi", role: "coach" },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ data: mockPractitioners }),
    });

    const result = await fetchPractitioners("coach");
    expect(result).toEqual(mockPractitioners);
  });

  it("fetchCurrentUser should return user profile", async () => {
    const mockUser = {
      id: "u-1",
      nip: "198904122014031002",
      full_name: "Wahid Mahmudi",
      role: "client",
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ data: mockUser }),
    });

    const result = await fetchCurrentUser();
    expect(result).toEqual(mockUser);
  });

  it("should throw formatted error when HTTP request fails", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: "Authorization header is required" }),
    });

    await expect(fetchSessions()).rejects.toThrow("Authorization header is required");
  });
});

