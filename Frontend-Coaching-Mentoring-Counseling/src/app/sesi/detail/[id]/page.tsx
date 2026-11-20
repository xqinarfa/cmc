"use client";

import React, { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { Meeting } from "@/lib/sessionData";
import { AppNavbar, AppFooter } from "@/components/common";
import { SesiToast } from "@/components/sesi";
import {
  SesiDetailHero,
  SesiHeaderCard,
  PesertaSesiCard,
  MeetingListSection,
  SesiDetailSidebar,
  MeetingDetailModal,
  AddMeetingModal,
  FinishSessionModal,
  CancelSessionModal,
} from "@/components/sesi/detail";
import {
  fetchSession,
  addMeeting,
  deleteMeeting,
  resendNotification,
  updateSessionStatus,
  mapApiMeetingToMeeting,
  ApiSession,
} from "@/lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SesiDetailDynamicPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const sessionId = resolvedParams.id;

  // Current logged in user from localStorage
  const [currentUser, setCurrentUser] = useState<{
    id?: string;
    nip?: string;
    role?: string;
    full_name?: string;
  } | null>(null);

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem("user") || localStorage.getItem("cmc_user");
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch {}
  }, []);

  // Session & meetings state
  const [session, setSession] = useState<ApiSession | null>(null);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [copiedToken, setCopiedToken] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal controls
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showAddMeetingModal, setShowAddMeetingModal] = useState(false);
  const [selectedMeetingDetail, setSelectedMeetingDetail] =
    useState<Meeting | null>(null);
  const [isSubmittingMeeting, setIsSubmittingMeeting] = useState(false);

  // New meeting form state
  const [newMeetingTitle, setNewMeetingTitle] = useState("");
  const [newMeetingDate, setNewMeetingDate] = useState("");
  const [newMeetingType, setNewMeetingType] = useState<
    "Luring" | "Daring" | "Hybrid"
  >("Luring");
  const [newMeetingLocation, setNewMeetingLocation] = useState("");
  const [newMeetingSummary, setNewMeetingSummary] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const loadSessionData = useCallback(async () => {
    if (!sessionId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await fetchSession(sessionId);
      setSession(data);
      if (typeof window !== "undefined") {
        localStorage.setItem("current_session_id", sessionId);
      }
      if (data.pertemuan_list && data.pertemuan_list.length > 0) {
        const pesertas = data.peserta_list || [];
        const totalPesertaCount = pesertas.length > 0 ? pesertas.length : 1;

        setMeetings(
          data.pertemuan_list.map((p) => {
            const catatanList = p.catatan_list || [];

            // Build list of all participant notes
            const participantNotes = pesertas.map((peserta) => {
              const note = catatanList.find(
                (c) =>
                  c.nip &&
                  peserta.nip &&
                  c.nip.trim().toLowerCase() ===
                    peserta.nip.trim().toLowerCase(),
              );
              return {
                pesertaId: peserta.id,
                nip: peserta.nip,
                nama: peserta.nama,
                role: peserta.role_in_session,
                isCompleted: Boolean(note),
                noteId: note?.id,
                jpCollected: note?.jp_collected || (note ? 2 : 0),
                pembahasan: note?.pembahasan,
                tujuan: note?.tujuan,
                rencanaTindakLanjut: note?.rencana_tindak_lanjut,
                umpanBalik: note?.umpan_balik,
              };
            });

            const completedCount = participantNotes.filter(
              (pn) => pn.isCompleted,
            ).length;

            // Check if current user has completed their note
            const userNote = catatanList.find(
              (c) =>
                currentUser?.nip &&
                c.nip.trim().toLowerCase() ===
                  currentUser.nip.trim().toLowerCase(),
            );
            const currentUserCompleted = Boolean(userNote);

            // Determine status
            let status: "lengkap" | "draft" | "pending" = "pending";
            let statusLabel = "Belum diisi";

            if (completedCount >= totalPesertaCount && totalPesertaCount > 0) {
              status = "lengkap";
              statusLabel =
                totalPesertaCount > 1
                  ? `Lengkap (${completedCount}/${totalPesertaCount} Peserta)`
                  : "Lengkap";
            } else if (completedCount > 0) {
              status = "draft";
              statusLabel = `${completedCount}/${totalPesertaCount} Peserta Mencatat`;
            } else if (p.status === "completed" || p.status === "lengkap") {
              status = "lengkap";
              statusLabel = "Lengkap";
            }

            const primaryNote = userNote || catatanList[0];

            return {
              id: p.id,
              number: p.meeting_number,
              title: p.title,
              dateStr: p.scheduled_date || "Belum dijadwalkan",
              status,
              statusLabel,
              type:
                (p.meeting_type as "Luring" | "Daring" | "Hybrid") || "Luring",
              location: p.location || "",
              jpCollected:
                userNote?.jp_collected || (completedCount > 0 ? 2 : undefined),
              topicSummary: primaryNote?.pembahasan || undefined,
              feedback: primaryNote?.umpan_balik || undefined,
              nextSteps: primaryNote?.rencana_tindak_lanjut || undefined,
              participantNotes,
              completedCount,
              totalParticipants: totalPesertaCount,
              currentUserCompleted,
            };
          }),
        );
      } else if (data.meetings && data.meetings.length > 0) {
        setMeetings(data.meetings.map(mapApiMeetingToMeeting));
      } else {
        setMeetings([]);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal memuat detail sesi.",
      );
    } finally {
      setLoading(false);
    }
  }, [sessionId, currentUser?.nip]);

  useEffect(() => {
    loadSessionData();
  }, [loadSessionData]);

  const handleCopyToken = () => {
    if (!session?.token) return;
    navigator.clipboard.writeText(session.token);
    setCopiedToken(true);
    showToast(`Token ${session.token} berhasil disalin ke clipboard!`);
    setTimeout(() => setCopiedToken(false), 2500);
  };

  const handleResendNotification = async () => {
    if (!sessionId) return;
    try {
      await resendNotification(sessionId);
      showToast(
        "Notifikasi pengingat sesi berhasil dikirimkan ke Coach/Mentor!",
      );
    } catch {
      showToast("Gagal mengirim notifikasi. Silakan coba lagi.");
    }
  };

  const isSessionVerified =
    session?.status === "confirmed" || session?.status === "completed";

  const isSessionCompleted =
    session?.status === "completed" || session?.status === "selesai";

  const handleDeleteDraft = async (meetingId: number | string) => {
    if (!sessionId) return;
    try {
      await deleteMeeting(sessionId, String(meetingId));
      setMeetings((prev) =>
        prev.filter((m) => String(m.id) !== String(meetingId)),
      );
      showToast("Draf pertemuan berhasil dihapus.");
    } catch (err) {
      showToast(
        err instanceof Error
          ? `Gagal menghapus: ${err.message}`
          : "Gagal menghapus draf.",
      );
    }
  };

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeetingTitle.trim() || !sessionId) return;

    if (isSessionCompleted) {
      showToast(
        "Sesi ini sudah ditandai selesai sehingga tidak dapat menambah pertemuan baru.",
      );
      return;
    }

    if (!isSessionVerified) {
      showToast(
        "Pertemuan baru dapat ditambahkan setelah sesi diverifikasi dan disetujui oleh Atasan Langsung / Pejabat Penilai.",
      );
      return;
    }

    try {
      setIsSubmittingMeeting(true);
      const created = await addMeeting(sessionId, {
        title: newMeetingTitle.trim(),
        scheduled_date: newMeetingDate || undefined,
        meeting_type: newMeetingType,
        location: newMeetingLocation.trim() || undefined,
        summary: newMeetingSummary.trim() || undefined,
        jp_collected: 2,
      });

      const newEntry = mapApiMeetingToMeeting(created);
      setMeetings((prev) => [...prev, newEntry]);

      setShowAddMeetingModal(false);
      setNewMeetingTitle("");
      setNewMeetingDate("");
      setNewMeetingLocation("");
      setNewMeetingSummary("");
      showToast(`Pertemuan #${newEntry.number} berhasil ditambahkan!`);

      // Refresh session for current JP
      loadSessionData();
    } catch (err) {
      showToast(
        err instanceof Error
          ? `Gagal menambah pertemuan: ${err.message}`
          : "Gagal menyimpan pertemuan.",
      );
    } finally {
      setIsSubmittingMeeting(false);
    }
  };

  const handleFinishSession = async () => {
    if (!sessionId) return;
    try {
      await updateSessionStatus(
        sessionId,
        "completed",
        "Sesi diselesaikan oleh peserta",
      );
      setShowFinishModal(false);
      showToast("Sesi berhasil ditandai selesai! Terima kasih.");
      loadSessionData();
    } catch {
      showToast("Gagal menyelesaikan sesi. Silakan coba lagi.");
    }
  };

  const handleApproveSession = async () => {
    if (!sessionId) return;
    try {
      await updateSessionStatus(
        sessionId,
        "confirmed",
        "Sesi disetujui dan diverifikasi oleh Atasan Langsung",
      );
      showToast("Sesi berhasil diverifikasi dan disetujui!");
      loadSessionData();
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Gagal memverifikasi sesi.",
      );
    }
  };

  const handleRejectSession = async () => {
    if (!sessionId) return;
    try {
      await updateSessionStatus(
        sessionId,
        "rejected",
        "Sesi dikembalikan oleh Atasan untuk perbaikan",
      );
      showToast("Sesi telah dikembalikan ke peserta untuk perbaikan.");
      loadSessionData();
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Gagal mengembalikan sesi.",
      );
    }
  };

  const handleCancelSession = async () => {
    if (!sessionId) return;
    try {
      await updateSessionStatus(sessionId, "cancelled", "Sesi dibatalkan");
      setShowCancelModal(false);
      showToast("Sesi telah dibatalkan.");
      setTimeout(() => router.push("/sesi"), 1500);
    } catch {
      showToast("Gagal membatalkan sesi. Silakan coba lagi.");
    }
  };

  // Metrics
  const completedMeetings = meetings.filter(
    (m) => m.status === "lengkap",
  ).length;
  const totalMeetings = meetings.length;
  const collectedJp = session?.current_jp ?? completedMeetings * 2;
  const targetJp = session?.target_jp ?? 6;
  const progressPercent = Math.min(
    Math.round((collectedJp / targetJp) * 100),
    100,
  );

  const practitionerName =
    session?.practitioner?.full_name || "Rudi Santoso, M.M.";
  const practitionerRole =
    session?.type === "mentoring"
      ? "Mentor"
      : session?.type === "counseling"
        ? "Konselor"
        : "Coach";
  const practitionerInitials = practitionerName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  const startDateFormatted = session?.created_at
    ? new Date(session.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "6 Jan 2025";

  // Check if current logged in user is the designated verifikator for this session or an admin
  const userNipClean = currentUser?.nip
    ? String(currentUser.nip).trim().replace(/\s+/g, "")
    : "";
  const atasanNipClean = session?.atasan_nip
    ? String(session.atasan_nip).trim().replace(/\s+/g, "")
    : "";
  const clientAtasanNipClean = session?.client?.atasan_langsung_nip
    ? String(session.client.atasan_langsung_nip).trim().replace(/\s+/g, "")
    : "";

  const isVerifikator = Boolean(
    (userNipClean && atasanNipClean && userNipClean === atasanNipClean) ||
    (userNipClean &&
      clientAtasanNipClean &&
      userNipClean === clientAtasanNipClean) ||
    currentUser?.role === "admin" ||
    currentUser?.role === "super_admin",
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans flex flex-col selection:bg-[#0a2540] selection:text-white">
      {/* 0. NAVBAR */}
      <AppNavbar />

      {/* 1. HERO HEADER */}
      <SesiDetailHero />

      {/* 2. MAIN CONTENT */}
      <main className="flex-1 w-full mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
        {loading && (
          <div className="flex flex-col gap-4 animate-pulse">
            <div className="h-28 bg-white border border-[#e2e6eb] rounded-[10px]" />
            <div className="h-64 bg-white border border-[#e2e6eb] rounded-[10px]" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-[10px] p-4 flex items-start gap-3 mb-6">
            <svg
              className="size-5 text-red-500 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-red-700">
                Gagal memuat detail sesi
              </p>
              <p className="text-xs text-red-600">{error}</p>
              <button
                type="button"
                onClick={loadSessionData}
                className="mt-1 text-xs font-semibold text-red-700 underline underline-offset-2 cursor-pointer w-fit"
              >
                Coba lagi
              </button>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* LEFT CONTENT COLUMN */}
            <div className="flex-1 w-full min-w-0 flex flex-col gap-6">
              <SesiHeaderCard
                collectedJp={collectedJp}
                targetJp={targetJp}
                completedMeetings={completedMeetings}
                totalMeetings={totalMeetings}
                progressPercent={progressPercent}
                title={
                  session?.title ||
                  session?.topic ||
                  "Penguatan Kepemimpinan Pelayanan Publik"
                }
                category={
                  session?.type === "mentoring" ? "Mentoring" : "Coaching"
                }
                status={session?.status || "confirmed"}
                statusLabel={
                  session?.status === "completed"
                    ? "Selesai"
                    : session?.status === "rejected"
                      ? "Dikembalikan"
                      : session?.status === "pending"
                        ? "Menunggu Konfirmasi"
                        : "Berlangsung"
                }
                practitionerName={practitionerName}
                practitionerRole={practitionerRole}
                startDate={startDateFormatted}
                sessionFormat={session?.session_format}
              />
              <PesertaSesiCard session={session} />
              <MeetingListSection
                sessionId={sessionId}
                meetings={meetings}
                filledMeetings={completedMeetings}
                totalMeetings={totalMeetings}
                isVerified={isSessionVerified}
                isCompleted={isSessionCompleted}
                sessionStatus={session?.status}
                verifikatorName={session?.atasan_nama || "Atasan Langsung"}
                onViewDetail={(m) => setSelectedMeetingDetail(m)}
                onDeleteDraft={handleDeleteDraft}
                onOpenAddMeeting={() => {
                  if (isSessionCompleted) {
                    showToast(
                      "Sesi ini sudah ditandai selesai sehingga tidak dapat menambah pertemuan baru.",
                    );
                    return;
                  }
                  if (!isSessionVerified) {
                    showToast(
                      "Pertemuan baru dapat ditambahkan setelah sesi diverifikasi dan disetujui oleh Atasan Langsung / Pejabat Penilai.",
                    );
                    return;
                  }
                  setShowAddMeetingModal(true);
                }}
                onOpenFinishModal={() => setShowFinishModal(true)}
              />
            </div>

            {/* RIGHT SIDEBAR */}
            <SesiDetailSidebar
              copiedToken={copiedToken}
              onCopyToken={handleCopyToken}
              onResendNotification={handleResendNotification}
              onCancelSession={() => setShowCancelModal(true)}
              onApproveSession={
                isVerifikator ? handleApproveSession : undefined
              }
              onRejectSession={isVerifikator ? handleRejectSession : undefined}
              isPending={session?.status === "pending"}
              token={session?.token}
              practitionerName={practitionerName}
              practitionerRole={practitionerRole}
              practitionerInitials={practitionerInitials}
              clientName={session?.client?.full_name}
              clientNip={session?.client?.nip}
              clientJabatan={session?.client?.jabatan}
              sessionFormat={session?.session_format}
              verifikatorName={
                session?.atasan_nama || "Dr. Budi Hartono, M.Si."
              }
              verifikatorJabatan={session?.atasan_jabatan}
            />
          </div>
        )}
      </main>

      {/* 3. MODALS */}
      <MeetingDetailModal
        meeting={selectedMeetingDetail}
        onClose={() => setSelectedMeetingDetail(null)}
        sessionId={sessionId}
      />

      <AddMeetingModal
        isOpen={showAddMeetingModal}
        meetingCount={meetings.length}
        existingDates={meetings.map((m) => m.dateStr)}
        isVerified={isSessionVerified}
        isCompleted={isSessionCompleted}
        onClose={() => setShowAddMeetingModal(false)}
        onSubmit={handleCreateMeeting}
        title={newMeetingTitle}
        setTitle={setNewMeetingTitle}
        date={newMeetingDate}
        setDate={setNewMeetingDate}
        type={newMeetingType}
        setType={setNewMeetingType}
        location={newMeetingLocation}
        setLocation={setNewMeetingLocation}
        summary={newMeetingSummary}
        setSummary={setNewMeetingSummary}
      />

      <FinishSessionModal
        isOpen={showFinishModal}
        onClose={() => setShowFinishModal(false)}
        onConfirm={handleFinishSession}
      />

      <CancelSessionModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelSession}
      />

      {/* 4. TOAST NOTIFICATION */}
      <SesiToast message={toastMessage} />

      {/* 5. FOOTER */}
      <AppFooter onShowToast={showToast} />
    </div>
  );
}
