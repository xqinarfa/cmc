import { describe, it, expect } from "vitest";
import {
  mapApiSessionToSessionItem,
  mapApiMeetingToMeeting,
} from "./sessionAdapter";
import type { ApiSession, ApiMeeting } from "./sessions";

describe("sessionAdapter", () => {
  describe("mapApiSessionToSessionItem", () => {
    it("should correctly map a pending mentoring session", () => {
      const apiSession: ApiSession = {
        id: "sesi-uuid-1",
        client_id: "client-1",
        type: "mentoring",
        status: "pending",
        title: "Pengembangan Karier ASN",
        topic: "Pengembangan Karier ASN",
        token: "CMC-4821-7X9A",
        current_jp: 0,
        target_jp: 6,
        alert_type: "amber",
        alert_text: "Sudah 3 hari menunggu respon",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        practitioner: {
          id: "practitioner-1",
          nip: "198203152005012001",
          email: "sari@dephub.go.id",
          full_name: "Dr. Sari Wulandari",
          role: "mentor",
        },
      };

      const result = mapApiSessionToSessionItem(apiSession);

      expect(result.id).toBe("sesi-uuid-1");
      expect(result.category).toBe("Mentoring");
      expect(result.status).toBe("menunggu_konfirmasi");
      expect(result.section).toBe("perlu_tindakan");
      expect(result.mentorOrCoachLabel).toBe("Mentor:");
      expect(result.mentorOrCoachName).toBe("Dr. Sari Wulandari");
      expect(result.mentorInitials).toBe("DS");
      expect(result.token).toBe("CMC-4821-7X9A");
      expect(result.alertType).toBe("amber");
      expect(result.targetJp).toBe(6);
    });

    it("should correctly map a rejected coaching session", () => {
      const apiSession: ApiSession = {
        id: "sesi-uuid-2",
        client_id: "client-1",
        type: "coaching",
        status: "rejected",
        title: "Analisis Kebijakan",
        current_jp: 6,
        target_jp: 6,
        alert_type: "red",
        alert_author: "Dr. Budi Hartono:",
        alert_text: "Dokumentasi belum lengkap",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        practitioner: {
          id: "practitioner-2",
          nip: "197506182001121002",
          email: "ahmad@dephub.go.id",
          full_name: "Ir. Ahmad Hidayat",
          role: "coach",
        },
      };

      const result = mapApiSessionToSessionItem(apiSession);

      expect(result.category).toBe("Coaching");
      expect(result.status).toBe("dikembalikan");
      expect(result.section).toBe("perlu_tindakan");
      expect(result.mentorOrCoachLabel).toBe("Coach:");
      expect(result.mentorOrCoachName).toBe("Ir. Ahmad Hidayat");
      expect(result.mentorInitials).toBe("IA");
      expect(result.alertType).toBe("red");
    });

    it("should correctly map a confirmed ongoing session", () => {
      const apiSession: ApiSession = {
        id: "sesi-uuid-3",
        client_id: "client-1",
        type: "coaching",
        status: "confirmed",
        title: "Kepemimpinan Pelayanan Publik",
        current_jp: 3,
        target_jp: 6,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        practitioner: {
          id: "practitioner-3",
          nip: "198009222006041001",
          email: "rudi@dephub.go.id",
          full_name: "Rudi Santoso",
          role: "coach",
        },
      };

      const result = mapApiSessionToSessionItem(apiSession);

      expect(result.status).toBe("berlangsung");
      expect(result.section).toBe("berlangsung");
      expect(result.currentJp).toBe(3);
    });

    it("should correctly map a completed session", () => {
      const apiSession: ApiSession = {
        id: "sesi-uuid-4",
        client_id: "client-1",
        type: "counseling",
        status: "completed",
        title: "Konseling Kinerja",
        current_jp: 4,
        target_jp: 4,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const result = mapApiSessionToSessionItem(apiSession);

      expect(result.status).toBe("selesai");
      expect(result.section).toBe("selesai");
      expect(result.mentorOrCoachLabel).toBe("Konselor:");
    });
  });

  describe("mapApiMeetingToMeeting", () => {
    it("should map completed meeting with formatted date and type", () => {
      const apiMeeting: ApiMeeting = {
        id: "meeting-1",
        session_id: "sesi-1",
        meeting_number: 1,
        title: "Refleksi Diri",
        scheduled_date: "2025-01-10T09:00:00Z",
        meeting_type: "offline",
        location: "Ruang Rapat A",
        summary: "Eksplorasi gaya kepemimpinan",
        jp_collected: 2,
        status: "completed",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const meeting = mapApiMeetingToMeeting(apiMeeting);

      expect(meeting.id).toBe("meeting-1");
      expect(meeting.number).toBe(1);
      expect(meeting.title).toBe("Refleksi Diri");
      expect(meeting.status).toBe("lengkap");
      expect(meeting.statusLabel).toBe("Lengkap");
      expect(meeting.jpCollected).toBe(2);
      expect(meeting.type).toBe("Luring");
      expect(meeting.location).toBe("Ruang Rapat A");
    });

    it("should map draft meeting", () => {
      const apiMeeting: ApiMeeting = {
        id: "meeting-2",
        session_id: "sesi-1",
        meeting_number: 2,
        title: "Penyusunan Rencana Aksi",
        meeting_type: "online",
        status: "draft",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const meeting = mapApiMeetingToMeeting(apiMeeting);

      expect(meeting.number).toBe(2);
      expect(meeting.status).toBe("draft");
      expect(meeting.statusLabel).toBe("Draft — belum lengkap");
      expect(meeting.type).toBe("Daring");
    });
  });
});

