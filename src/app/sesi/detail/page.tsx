"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Meeting, INITIAL_MEETINGS } from "@/lib/sessionData";
import { SesiFooter, SesiToast } from "@/components/sesi";
import {
  SesiDetailHero,
  SesiHeaderCard,
  MeetingListSection,
  SesiDetailSidebar,
  MeetingDetailModal,
  AddMeetingModal,
  FinishSessionModal,
  CancelSessionModal,
} from "@/components/sesi/detail";

export default function SesiDetailPage() {
  const router = useRouter();

  // State
  const [meetings, setMeetings] = useState<Meeting[]>(INITIAL_MEETINGS);
  const [copiedToken, setCopiedToken] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal controls
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showAddMeetingModal, setShowAddMeetingModal] = useState(false);
  const [selectedMeetingDetail, setSelectedMeetingDetail] = useState<Meeting | null>(null);

  // New meeting form state
  const [newMeetingTitle, setNewMeetingTitle] = useState("");
  const [newMeetingDate, setNewMeetingDate] = useState("");
  const [newMeetingType, setNewMeetingType] = useState<"Luring" | "Daring" | "Hybrid">("Luring");
  const [newMeetingLocation, setNewMeetingLocation] = useState("");
  const [newMeetingSummary, setNewMeetingSummary] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText("CMC-4821-7X9A");
    setCopiedToken(true);
    showToast("Token CMC-4821-7X9A berhasil disalin ke clipboard!");
    setTimeout(() => setCopiedToken(false), 2500);
  };

  const handleResendNotification = () => {
    showToast("Notifikasi pengingat sesi berhasil dikirimkan ke Coach!");
  };

  const handleDeleteDraft = (id: number | string) => {
    setMeetings((prev) => prev.filter((m) => m.id !== id));
    showToast("Draf pertemuan berhasil dihapus.");
  };

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeetingTitle.trim()) return;

    const newMeetingNumber = meetings.length + 1;
    const newEntry: Meeting = {
      id: Date.now(),
      number: newMeetingNumber,
      title: newMeetingTitle,
      dateStr: newMeetingDate
        ? `${newMeetingDate} · ${newMeetingType}`
        : `Dijadwalkan · ${newMeetingType}`,
      jpCollected: 2,
      status: "draft",
      statusLabel: "Draf Baru",
      location: newMeetingLocation || "Belum ditentukan",
      topicSummary: newMeetingSummary || "Topik telah diagendakan, menunggu pelaksanaan pertemuan.",
    };

    setMeetings((prev) => [...prev, newEntry]);
    setShowAddMeetingModal(false);
    setNewMeetingTitle("");
    setNewMeetingDate("");
    setNewMeetingLocation("");
    setNewMeetingSummary("");
    showToast(`Pertemuan #${newMeetingNumber} berhasil ditambahkan!`);
  };

  // Metrics
  const completedMeetings = meetings.filter((m) => m.status === "lengkap").length;
  const totalMeetings = meetings.length;
  const collectedJp = completedMeetings * 2;
  const targetJp = 6;
  const progressPercent = Math.min(Math.round((collectedJp / targetJp) * 100), 100);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans flex flex-col selection:bg-[#0a2540] selection:text-white">
      {/* 1. HERO HEADER */}
      <SesiDetailHero />

      {/* 2. MAIN CONTENT */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* LEFT CONTENT COLUMN */}
          <div className="flex-1 w-full min-w-0 flex flex-col gap-6">
            <SesiHeaderCard
              collectedJp={collectedJp}
              targetJp={targetJp}
              completedMeetings={completedMeetings}
              totalMeetings={totalMeetings}
              progressPercent={progressPercent}
            />
            <MeetingListSection
              meetings={meetings}
              filledMeetings={completedMeetings}
              totalMeetings={totalMeetings}
              onViewDetail={(m) => setSelectedMeetingDetail(m)}
              onDeleteDraft={handleDeleteDraft}
              onOpenAddMeeting={() => setShowAddMeetingModal(true)}
              onOpenFinishModal={() => setShowFinishModal(true)}
            />
          </div>

          {/* RIGHT SIDEBAR */}
          <SesiDetailSidebar
            copiedToken={copiedToken}
            onCopyToken={handleCopyToken}
            onResendNotification={handleResendNotification}
            onCancelSession={() => setShowCancelModal(true)}
          />
        </div>
      </main>

      {/* 3. MODALS */}
      <MeetingDetailModal
        meeting={selectedMeetingDetail}
        onClose={() => setSelectedMeetingDetail(null)}
      />

      <AddMeetingModal
        isOpen={showAddMeetingModal}
        meetingCount={meetings.length}
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
        onConfirm={() => {
          setShowFinishModal(false);
          showToast("Sesi berhasil ditandai selesai! Terima kasih.");
        }}
      />

      <CancelSessionModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={() => {
          setShowCancelModal(false);
          showToast("Sesi telah dibatalkan.");
          setTimeout(() => router.push("/dashboard"), 1500);
        }}
      />

      {/* 4. TOAST NOTIFICATION */}
      <SesiToast message={toastMessage} />

      {/* 5. FOOTER */}
      <SesiFooter onShowToast={showToast} />
    </div>
  );
}
