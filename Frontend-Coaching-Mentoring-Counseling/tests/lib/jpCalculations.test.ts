import { describe, it, expect } from "vitest";
import { calculateJpSummary } from "@/lib/jpCalculations";

describe("calculateJpSummary", () => {
  it("calculates real JP and breakdown correctly from a list of sessions", () => {
    const mockSessions = [
      {
        category: "Coaching",
        currentJp: 4,
        targetJp: 6,
        status: "berlangsung",
        section: "berlangsung",
      },
      {
        category: "Mentoring",
        currentJp: 6,
        targetJp: 6,
        status: "selesai",
        section: "selesai",
      },
      {
        category: "Coaching",
        currentJp: 2,
        targetJp: 4,
        status: "menunggu_konfirmasi",
        section: "perlu_tindakan",
      },
      {
        category: "Mentoring",
        currentJp: 0,
        targetJp: 4,
        status: "dikembalikan",
        section: "perlu_tindakan",
      },
    ];

    const summary = calculateJpSummary(mockSessions, 20);

    expect(summary.totalJp).toBe(12); // 4 + 6 + 2 = 12
    expect(summary.targetJp).toBe(20);
    expect(summary.sisaJp).toBe(8); // 20 - 12 = 8
    expect(summary.percentage).toBe(60); // 12 / 20 * 100 = 60%
    expect(summary.coachingJp).toBe(6); // 4 + 2
    expect(summary.mentoringJp).toBe(6); // 6 + 0
    expect(summary.countPerluTindakan).toBe(2);
    expect(summary.countKonfirmasi).toBe(1);
    expect(summary.countRevisi).toBe(1);
    expect(summary.countBerlangsung).toBe(1);
    expect(summary.countSelesai).toBe(1);
    expect(summary.perluTindakanSubtitle).toBe("1 konfirmasi · 1 revisi");
    expect(summary.berlangsungSubtitle).toBe("1 sesi aktif berjalan");
  });

  it("handles zero sessions cleanly without NaN", () => {
    const summary = calculateJpSummary([]);
    expect(summary.totalJp).toBe(0);
    expect(summary.targetJp).toBe(20);
    expect(summary.sisaJp).toBe(20);
    expect(summary.percentage).toBe(0);
    expect(summary.coachingJp).toBe(0);
    expect(summary.mentoringJp).toBe(0);
    expect(summary.countPerluTindakan).toBe(0);
    expect(summary.countBerlangsung).toBe(0);
    expect(summary.perluTindakanSubtitle).toBe("Semua sesi terkonfirmasi");
    expect(summary.berlangsungSubtitle).toBe("Belum ada sesi berjalan");
  });
});
