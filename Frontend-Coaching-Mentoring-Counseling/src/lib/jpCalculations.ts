export interface JpProgressSummary {
  totalJp: number;
  targetJp: number;
  percentage: number;
  coachingJp: number;
  coachingTarget: number;
  mentoringJp: number;
  mentoringTarget: number;
  counselingJp: number;
  sisaJp: number;
  coachingWidth: number;
  mentoringWidth: number;
  counselingWidth: number;
  countPerluTindakan: number;
  countBerlangsung: number;
  countSelesai: number;
  countKonfirmasi: number;
  countRevisi: number;
  perluTindakanSubtitle: string;
  berlangsungSubtitle: string;
}

export function calculateJpSummary(
  sessions: Array<{
    category?: string;
    type?: string;
    status?: string;
    section?: string;
    currentJp?: number;
    current_jp?: number;
    targetJp?: number;
    target_jp?: number;
  }> = [],
  customTargetJp = 20,
): JpProgressSummary {
  const targetJp = customTargetJp;

  let coachingJp = 0;
  let mentoringJp = 0;
  let counselingJp = 0;
  let countKonfirmasi = 0;
  let countRevisi = 0;
  let countBerlangsung = 0;
  let countSelesai = 0;
  let countPerluTindakan = 0;

  for (const s of sessions) {
    const rawType = (s.category || s.type || "").toLowerCase();
    const jp = Number(s.currentJp ?? s.current_jp ?? 0);

    if (rawType.includes("coach")) {
      coachingJp += jp;
    } else if (rawType.includes("mentor")) {
      mentoringJp += jp;
    } else if (rawType.includes("counsel") || rawType.includes("konsel")) {
      counselingJp += jp;
    }

    const sec = s.section;
    const stat = (s.status || "").toLowerCase();

    if (
      sec === "perlu_tindakan" ||
      stat === "pending" ||
      stat === "menunggu_konfirmasi" ||
      stat === "rejected" ||
      stat === "dikembalikan"
    ) {
      countPerluTindakan++;
      if (stat === "rejected" || stat === "dikembalikan") {
        countRevisi++;
      } else {
        countKonfirmasi++;
      }
    } else if (
      sec === "berlangsung" ||
      stat === "confirmed" ||
      stat === "active" ||
      stat === "berlangsung"
    ) {
      countBerlangsung++;
    } else if (sec === "selesai" || stat === "completed" || stat === "selesai") {
      countSelesai++;
    }
  }

  const totalJp = coachingJp + mentoringJp + counselingJp;
  const sisaJp = Math.max(0, targetJp - totalJp);
  const percentage = Math.min(100, Math.round((totalJp / targetJp) * 100));

  // Visual widths for the dual/triple segment progress bar (max 100% combined)
  const coachingWidth = Math.min(100, (coachingJp / targetJp) * 100);
  const mentoringWidth = Math.min(
    Math.max(0, 100 - coachingWidth),
    (mentoringJp / targetJp) * 100,
  );
  const counselingWidth = Math.min(
    Math.max(0, 100 - coachingWidth - mentoringWidth),
    (counselingJp / targetJp) * 100,
  );

  // Dynamic subtitles
  let perluTindakanSubtitle = "Semua sesi terkonfirmasi";
  if (countKonfirmasi > 0 && countRevisi > 0) {
    perluTindakanSubtitle = `${countKonfirmasi} konfirmasi · ${countRevisi} revisi`;
  } else if (countKonfirmasi > 0) {
    perluTindakanSubtitle = `${countKonfirmasi} menunggu konfirmasi`;
  } else if (countRevisi > 0) {
    perluTindakanSubtitle = `${countRevisi} perlu perbaikan`;
  } else if (countPerluTindakan > 0) {
    perluTindakanSubtitle = `${countPerluTindakan} perlu tindakan`;
  }

  let berlangsungSubtitle = "Belum ada sesi berjalan";
  if (countBerlangsung > 0) {
    berlangsungSubtitle = `${countBerlangsung} sesi aktif berjalan`;
  }

  return {
    totalJp,
    targetJp,
    percentage,
    coachingJp,
    coachingTarget: 10,
    mentoringJp,
    mentoringTarget: 10,
    counselingJp,
    sisaJp,
    coachingWidth,
    mentoringWidth,
    counselingWidth,
    countPerluTindakan,
    countBerlangsung,
    countSelesai,
    countKonfirmasi,
    countRevisi,
    perluTindakanSubtitle,
    berlangsungSubtitle,
  };
}
