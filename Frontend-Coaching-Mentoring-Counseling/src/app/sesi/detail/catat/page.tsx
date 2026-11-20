"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AppNavbar, AppFooter } from "@/components/common";
import { SesiToast } from "@/components/sesi";
import {
  CatatPertemuanHero,
  CatatPertemuanStepper,
  Step1DataDanTujuan,
  Step2Pembahasan,
  Step3TindakLanjut,
  CatatPertemuanSidebar,
  CatatSuccessModal,
} from "@/components/sesi/detail/catat";
import {
  fetchSession,
  fetchSessions,
  fetchCurrentUser,
  addMeeting,
  updateMeeting,
  saveCatatanPertemuan,
  ApiSession,
  ApiUser,
} from "@/lib/api";

function CatatPertemuanContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramSessionId = searchParams.get("sessionId");
  const paramPertemuan = searchParams.get("pertemuan");
  const paramMeetingId = searchParams.get("meetingId");

  // Track if we are editing an existing meeting or creating a new one
  const [targetMeetingId, setTargetMeetingId] = useState<string | null>(
    paramMeetingId,
  );
  const [selectedParticipantNip, setSelectedParticipantNip] =
    useState<string>("");

  // Participant strictly bound to current authenticated user
  const [currentParticipant, setCurrentParticipant] = useState<{
    id?: string;
    nip: string;
    nama: string;
    role_in_session?: string;
    jabatan?: string;
    unit_kerja?: string;
    current_jp?: number;
    target_jp?: number;
  } | null>(null);
  const [isParticipant, setIsParticipant] = useState<boolean>(true);

  // Logged in user from localStorage & API
  const [currentUser, setCurrentUser] = useState<ApiUser | null>(null);

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem("user") || localStorage.getItem("cmc_user");
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch {}
  }, []);

  // Session state
  const [session, setSession] = useState<ApiSession | null>(null);
  const isSessionCompleted =
    session?.status === "completed" || session?.status === "selesai";
  const [loadingSession, setLoadingSession] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Wizard Step (1: Data & Tujuan, 2: Pembahasan, 3: Tindak Lanjut)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State - Step 1: Data & Tujuan (Figma Node 840:276)
  const [tanggal, setTanggal] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [waktu, setWaktu] = useState("09:00");
  const [moda, setModa] = useState<"Luring" | "Daring" | "Hybrid">("Luring");
  const [lokasi, setLokasi] = useState("");
  const [pertemuanKe, setPertemuanKe] = useState<number>(() => {
    if (paramPertemuan) {
      const parsed = parseInt(paramPertemuan, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    return 1;
  });
  const [tujuan, setTujuan] = useState("");

  // Form State - Step 2: Pembahasan (Figma Node 841:482)
  const [identifikasiKebutuhan, setIdentifikasiKebutuhan] = useState("");
  const [areaPengembangan, setAreaPengembangan] = useState("");
  const [pembahasan, setPembahasan] = useState("");
  const [umpanBalikCoach, setUmpanBalikCoach] = useState("");
  const [kesepakatanSolusi, setKesepakatanSolusi] = useState("");

  // Form State - Step 3: Tindak Lanjut (Figma Node 842:650)
  const [rencanaTindakLanjut, setRencanaTindakLanjut] = useState("");
  const [targetWaktu, setTargetWaktu] = useState("");
  const [actionLearningFiles, setActionLearningFiles] = useState<string[]>([]);
  const [buktiFotoFiles, setBuktiFotoFiles] = useState<string[]>([]);
  const [pernyataanSetuju, setPernyataanSetuju] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Load session data from API
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoadingSession(true);
        let activeSession: ApiSession | null = null;

        const effectiveId =
          paramSessionId ||
          (typeof window !== "undefined"
            ? localStorage.getItem("current_session_id")
            : null) ||
          "69b298a8-9d56-45b8-bf65-207d53f75c6a";

        if (effectiveId) {
          activeSession = await fetchSession(effectiveId);
        } else {
          // Fallback: look up available sessions
          const all = await fetchSessions();
          if (all && all.length > 0) {
            activeSession = all[0];
          }
        }

        if (isMounted && activeSession) {
          setSession(activeSession);

          // 1. Resolve active user up front
          let activeUser = currentUser;
          if (!activeUser) {
            try {
              const stored =
                typeof window !== "undefined"
                  ? localStorage.getItem("user") ||
                    localStorage.getItem("cmc_user")
                  : null;
              if (stored) {
                activeUser = JSON.parse(stored);
                setCurrentUser(activeUser);
              }
            } catch {}
          }
          try {
            const fetched = await fetchCurrentUser();
            if (fetched) {
              activeUser = fetched;
              setCurrentUser(fetched);
            }
          } catch {}

          // 2. Determine current participant strictly tied to the logged-in user
          const pesertas = activeSession.peserta_list || [];
          const curNip = (activeUser?.nip || "").trim().toLowerCase();
          const curId = activeUser?.id || "";
          const curEmail = (activeUser?.email || "").trim().toLowerCase();

          let resolvedParticipant: {
            id?: string;
            nip: string;
            nama: string;
            role_in_session?: string;
            jabatan?: string;
            unit_kerja?: string;
            current_jp?: number;
            target_jp?: number;
          } | null = null;

          const matchedPeserta = pesertas.find((p) => {
            if (curNip && p.nip && p.nip.trim().toLowerCase() === curNip)
              return true;
            if (curId && p.user_id && p.user_id === curId) return true;
            if (curEmail && p.email && p.email.trim().toLowerCase() === curEmail)
              return true;
            return false;
          });

          if (matchedPeserta) {
            resolvedParticipant = {
              id: matchedPeserta.id,
              nip: matchedPeserta.nip.trim(),
              nama: matchedPeserta.nama,
              role_in_session: matchedPeserta.role_in_session || "anggota",
              jabatan: matchedPeserta.jabatan,
              unit_kerja: matchedPeserta.unit_kerja,
              current_jp: matchedPeserta.current_jp,
              target_jp: matchedPeserta.target_jp,
            };
          } else if (
            activeSession.client &&
            ((curNip &&
              activeSession.client.nip &&
              activeSession.client.nip.trim().toLowerCase() === curNip) ||
              (curId &&
                activeSession.client_id &&
                activeSession.client_id === curId) ||
              pesertas.length === 0)
          ) {
            resolvedParticipant = {
              id: activeSession.client_id || curId,
              nip: activeSession.client.nip || curNip,
              nama:
                activeSession.client.full_name ||
                activeUser?.full_name ||
                "Peserta Utama",
              role_in_session: "utama",
              jabatan: activeSession.client.jabatan,
              unit_kerja: activeSession.client.unit_kerja,
              current_jp: activeSession.current_jp,
              target_jp: activeSession.target_jp,
            };
          }

          if (resolvedParticipant) {
            setCurrentParticipant(resolvedParticipant);
            setSelectedParticipantNip(resolvedParticipant.nip);
            setIsParticipant(true);
          } else {
            setCurrentParticipant(null);
            setSelectedParticipantNip("");
            setIsParticipant(false);
          }

          const pPertemuanNum = paramPertemuan
            ? parseInt(paramPertemuan, 10)
            : undefined;

          // 1. Check in pertemuan_list (new child architecture) first, then fallback to meetings
          const existingPertemuan = activeSession.pertemuan_list?.find(
            (p) =>
              (paramMeetingId && p.id === paramMeetingId) ||
              (pPertemuanNum && p.meeting_number === pPertemuanNum),
          );

          const existingMeeting = activeSession.meetings?.find(
            (m) =>
              (paramMeetingId && m.id === paramMeetingId) ||
              (pPertemuanNum && m.meeting_number === pPertemuanNum),
          );

          const matchedMeetingId = existingPertemuan?.id || existingMeeting?.id;
          const matchedMeetingNumber =
            existingPertemuan?.meeting_number ||
            existingMeeting?.meeting_number ||
            pPertemuanNum ||
            1;
          const matchedTitle =
            existingPertemuan?.title || existingMeeting?.title;
          const matchedDate =
            existingPertemuan?.scheduled_date ||
            existingMeeting?.scheduled_date;
          const matchedType =
            existingPertemuan?.meeting_type || existingMeeting?.meeting_type;
          const matchedLocation =
            existingPertemuan?.location || existingMeeting?.location;

          // Check if the current participant already submitted a note for this meeting in session_pertemuan_peserta_catatan
          const existingNote = existingPertemuan?.catatan_list?.find(
            (c) =>
              resolvedParticipant?.nip &&
              c.nip &&
              c.nip.trim().toLowerCase() ===
                resolvedParticipant.nip.toLowerCase(),
          );

          if (matchedMeetingId) {
            setTargetMeetingId(matchedMeetingId);
            setPertemuanKe(matchedMeetingNumber);
            if (matchedTitle) {
              setTujuan(matchedTitle);
            }
            if (matchedDate) {
              const parts = matchedDate.split(" ");
              if (parts[0]) setTanggal(parts[0]);
              if (parts[1]) setWaktu(parts[1]);
            }
            if (matchedType) {
              const typeStr = matchedType.toLowerCase();
              if (typeStr.includes("online") || typeStr.includes("daring")) {
                setModa("Daring");
              } else if (typeStr.includes("hybrid")) {
                setModa("Hybrid");
              } else {
                setModa("Luring");
              }
            }
            if (matchedLocation) {
              setLokasi(matchedLocation);
            }

            // Populate form fields from existing note if present
            if (existingNote) {
              if (existingNote.tujuan) setTujuan(existingNote.tujuan);
              if (existingNote.identifikasi_kebutuhan)
                setIdentifikasiKebutuhan(existingNote.identifikasi_kebutuhan);
              if (existingNote.area_pengembangan)
                setAreaPengembangan(existingNote.area_pengembangan);
              if (existingNote.pembahasan)
                setPembahasan(existingNote.pembahasan);
              if (existingNote.kesepakatan_solusi)
                setKesepakatanSolusi(existingNote.kesepakatan_solusi);
              if (existingNote.umpan_balik)
                setUmpanBalikCoach(existingNote.umpan_balik);
              if (existingNote.rencana_tindak_lanjut)
                setRencanaTindakLanjut(existingNote.rencana_tindak_lanjut);
              if (existingNote.target_waktu)
                setTargetWaktu(existingNote.target_waktu);
            } else if (existingMeeting?.summary) {
              const sections = existingMeeting.summary.split("\n\n");
              for (const sec of sections) {
                if (sec.startsWith("Tujuan Pertemuan:")) {
                  setTujuan(sec.replace("Tujuan Pertemuan:", "").trim());
                } else if (sec.startsWith("Identifikasi Kebutuhan:")) {
                  setIdentifikasiKebutuhan(
                    sec.replace("Identifikasi Kebutuhan:", "").trim(),
                  );
                } else if (sec.startsWith("Area Pengembangan:")) {
                  setAreaPengembangan(
                    sec.replace("Area Pengembangan:", "").trim(),
                  );
                } else if (sec.startsWith("Pembahasan:")) {
                  setPembahasan(sec.replace("Pembahasan:", "").trim());
                } else if (sec.startsWith("Umpan Balik:")) {
                  setUmpanBalikCoach(sec.replace("Umpan Balik:", "").trim());
                } else if (sec.startsWith("Kesepakatan Solusi:")) {
                  setKesepakatanSolusi(
                    sec.replace("Kesepakatan Solusi:", "").trim(),
                  );
                } else if (sec.startsWith("Rencana Tindak Lanjut:")) {
                  const content = sec
                    .replace("Rencana Tindak Lanjut:", "")
                    .trim();
                  const match = content.match(/\(Target:\s*(.*?)\)$/);
                  if (match) {
                    setTargetWaktu(match[1]);
                    setRencanaTindakLanjut(
                      content.replace(/\(Target:\s*.*?\)$/, "").trim(),
                    );
                  } else {
                    setRencanaTindakLanjut(content);
                  }
                } else if (!pembahasan) {
                  setPembahasan(sec.trim());
                }
              }
            }
          } else if (!paramPertemuan) {
            const nextNum =
              (activeSession.pertemuan_list?.length ||
                activeSession.meetings?.length ||
                0) + 1;
            setPertemuanKe(nextNum);
          }
        }
      } catch (err: any) {
        console.error("Gagal memuat sesi:", err);
        if (err?.message && !err.message.toLowerCase().includes("token")) {
          showToast(`Gagal memuat sesi: ${err.message}`);
        }
      } finally {
        if (isMounted) setLoadingSession(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [paramSessionId, paramPertemuan, paramMeetingId]);

  const getTargetSessionId = () =>
    session?.id ||
    paramSessionId ||
    (typeof window !== "undefined"
      ? localStorage.getItem("current_session_id")
      : null) ||
    "69b298a8-9d56-45b8-bf65-207d53f75c6a";

  const handleReturnToDetail = () => {
    setShowSuccessModal(false);
    const targetSessionId = getTargetSessionId();
    router.push(`/sesi/detail/${targetSessionId}`);
  };

  const handleNextStep = async () => {
    if (!isParticipant || !currentParticipant) {
      showToast(
        "Akses Ditolak: Anda bukan peserta dalam sesi ini dan tidak dapat membuat catatan pertemuan.",
      );
      return;
    }

    if (isSessionCompleted) {
      showToast(
        "Sesi ini sudah ditandai selesai sehingga tidak dapat menambah pertemuan baru.",
      );
      return;
    }

    if (currentStep === 1) {
      if (!tanggal) {
        showToast("Silakan isi tanggal pertemuan terlebih dahulu.");
        return;
      }
      setCurrentStep(2);
      if (typeof window !== "undefined")
        window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentStep === 2) {
      setCurrentStep(3);
      if (typeof window !== "undefined")
        window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Step 3 -> submit to API
    await handleSubmitPertemuan();
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
      if (typeof window !== "undefined")
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleCancel();
    }
  };

  const handleCancel = () => {
    const targetSessionId = getTargetSessionId();
    router.push(`/sesi/detail/${targetSessionId}`);
  };

  const handleSubmitPertemuan = async () => {
    const targetSessionId = getTargetSessionId();

    if (!targetSessionId) {
      showToast("ID Sesi tidak ditemukan. Tidak dapat menyimpan.");
      return;
    }

    if (!isParticipant || !currentParticipant) {
      showToast(
        "Akses Ditolak: Anda bukan peserta dalam sesi ini. Catatan pertemuan hanya dapat dibuat secara mandiri oleh peserta yang bersangkutan.",
      );
      return;
    }

    const isSessionCompleted =
      session?.status === "completed" || session?.status === "selesai";
    if (isSessionCompleted) {
      showToast(
        "Sesi ini sudah ditandai selesai sehingga tidak dapat menambah atau mengubah pertemuan baru.",
      );
      return;
    }

    if (session && session.status !== "confirmed") {
      showToast(
        "Pertemuan baru dapat dicatat setelah sesi diverifikasi dan disetujui oleh Atasan Langsung / Pejabat Penilai.",
      );
      return;
    }

    // Build structured summary
    const summarySections: string[] = [];
    if (tujuan.trim())
      summarySections.push(`Tujuan Pertemuan: ${tujuan.trim()}`);
    if (identifikasiKebutuhan.trim())
      summarySections.push(
        `Identifikasi Kebutuhan: ${identifikasiKebutuhan.trim()}`,
      );
    if (areaPengembangan.trim())
      summarySections.push(`Area Pengembangan: ${areaPengembangan.trim()}`);
    if (pembahasan.trim())
      summarySections.push(`Pembahasan: ${pembahasan.trim()}`);
    if (umpanBalikCoach.trim())
      summarySections.push(`Umpan Balik: ${umpanBalikCoach.trim()}`);
    if (kesepakatanSolusi.trim())
      summarySections.push(`Kesepakatan Solusi: ${kesepakatanSolusi.trim()}`);
    if (rencanaTindakLanjut.trim()) {
      const targetStr = targetWaktu ? ` (Target: ${targetWaktu})` : "";
      summarySections.push(
        `Rencana Tindak Lanjut: ${rencanaTindakLanjut.trim()}${targetStr}`,
      );
    }

    const fullSummary = summarySections.join("\n\n");
    const meetingTitle = tujuan.trim() || `Pertemuan #${pertemuanKe}`;

    try {
      setIsSubmitting(true);

      const userNip = currentParticipant.nip;
      const userNama = currentParticipant.nama;

      // 1. Save participant note to session_pertemuan_peserta_catatan (Child entity)
      // Strictly bound to current logged in participant
      try {
        await saveCatatanPertemuan(targetSessionId, {
          session_pertemuan_id: targetMeetingId || undefined,
          pertemuan_ke: pertemuanKe,
          nip: userNip,
          nama: userNama,
          tanggal,
          waktu,
          moda,
          lokasi: lokasi.trim() || undefined,
          tujuan: tujuan.trim() || undefined,
          identifikasi_kebutuhan: identifikasiKebutuhan.trim() || undefined,
          area_pengembangan: areaPengembangan.trim() || undefined,
          pembahasan: pembahasan.trim() || fullSummary,
          kesepakatan_solusi: kesepakatanSolusi.trim() || undefined,
          umpan_balik: umpanBalikCoach.trim() || undefined,
          rencana_tindak_lanjut: rencanaTindakLanjut.trim() || undefined,
          target_waktu: targetWaktu || undefined,
          action_learning_files:
            actionLearningFiles.length > 0
              ? JSON.stringify(actionLearningFiles)
              : undefined,
          bukti_foto_files:
            buktiFotoFiles.length > 0
              ? JSON.stringify(buktiFotoFiles)
              : undefined,
          jp_collected: 2,
          status: "completed",
        });
      } catch (childErr) {
        console.warn("Child catatan save warning:", childErr);
      }

      // 2. Also save/update meetings table for compatibility
      const payload = {
        meeting_number: pertemuanKe,
        title: meetingTitle,
        scheduled_date: `${tanggal} ${waktu}`,
        meeting_type: moda,
        location: lokasi.trim() || undefined,
        summary: fullSummary || undefined,
        jp_collected: 2,
        status: "completed",
      };

      if (targetMeetingId) {
        // UPDATE existing meeting record
        await updateMeeting(targetSessionId, targetMeetingId, payload);
      } else {
        // CREATE new meeting record
        await addMeeting(targetSessionId, payload);
      }

      setShowSuccessModal(true);
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Gagal menyimpan pertemuan.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const practitionerRole =
    session?.type === "mentoring"
      ? "Mentor"
      : session?.type === "counseling"
        ? "Konselor"
        : "Coach";

  const rawPractitionerName =
    session?.practitioner?.full_name || "Rudi Santoso, M.M.";
  const practitionerName =
    rawPractitionerName.toLowerCase().startsWith("coach") ||
    rawPractitionerName.toLowerCase().startsWith("mentor") ||
    rawPractitionerName.toLowerCase().startsWith("konselor")
      ? rawPractitionerName
      : `${practitionerRole} ${rawPractitionerName}`;

  const atasanName = "Atasan Langsung";

  function getInitials(name?: string): string {
    if (!name) return "??";
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");
  }

  const targetPeserta = currentParticipant;

  const currentPertemuanObj = session?.pertemuan_list?.find(
    (p) =>
      (targetMeetingId && p.id === targetMeetingId) ||
      p.meeting_number === pertemuanKe,
  );

  const hasExistingNoteForTarget = Boolean(
    currentPertemuanObj?.catatan_list?.some(
      (c) =>
        c.nip &&
        targetPeserta?.nip &&
        c.nip.trim().toLowerCase() ===
          targetPeserta.nip.trim().toLowerCase(),
    ),
  );

  return (
    <div className="min-h-dvh w-full bg-[#f7f9fb] text-[#0f172a] font-sans antialiased selection:bg-[#0a2540] selection:text-white flex flex-col justify-between">
      {/* 1. App Navbar */}
      <AppNavbar />

      {/* 2. Hero Section */}
      <CatatPertemuanHero
        pertemuanKe={pertemuanKe}
        currentStep={currentStep}
        sessionId={session?.id || paramSessionId || undefined}
      />

      {/* 3. Main Two-Column Layout */}
      <main className="w-full mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 -mt-10 relative z-20 pb-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 items-start">
          {/* Left Column: Form Card */}
          <div className="flex flex-col gap-3 min-w-0">
            {/* Banner 1: Access Restricted if Logged In User is NOT a participant */}
            {!isParticipant && !loadingSession && (
              <div className="bg-amber-50 border border-amber-300 rounded-[10px] p-4 flex flex-col gap-3 text-amber-950 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="size-9 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="size-5"
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
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <h4 className="font-bold text-sm text-amber-950">
                      Akses Pembuatan Catatan Dibatasi
                    </h4>
                    <p className="text-xs text-amber-900 leading-relaxed">
                      Sesuai ketentuan, <strong>setiap peserta tidak dapat membuat catatan untuk peserta lain</strong>. Catatan pertemuan hanya bisa dilakukan secara mandiri oleh peserta yang bersangkutan.
                    </p>
                    <p className="text-[11.5px] text-amber-800">
                      Anda saat ini masuk sebagai <strong>{currentUser?.full_name || "Pengguna"}</strong> (NIP: {currentUser?.nip || "-"}), yang bukan merupakan peserta terdaftar dalam sesi ini.
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-amber-200 flex items-center justify-between">
                  <span className="text-[11px] text-amber-700">
                    Silakan kembali ke detail sesi untuk memantau progres.
                  </span>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="h-7 px-3 rounded-md bg-[#0a2540] text-white text-xs font-semibold hover:bg-[#13396b] transition-colors cursor-pointer"
                  >
                    Kembali ke Detail Sesi
                  </button>
                </div>
              </div>
            )}

            {/* Banner 2: Active Participant Card (Strictly Bound to Logged In User) */}
            {isParticipant && targetPeserta && (
              <div className="bg-white border border-[#e2e6eb] rounded-[10px] p-4 flex flex-col gap-3 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-10 rounded-full bg-[#0a2540] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {getInitials(targetPeserta?.nama)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">
                          Pelapor Catatan Pertemuan #{pertemuanKe}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#eef4ff] text-[#0a2540] border border-blue-100">
                          {targetPeserta?.role_in_session === "utama"
                            ? "Peserta Utama"
                            : "Anggota Kelompok"}
                        </span>
                        {hasExistingNoteForTarget ? (
                          <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                            <span className="size-1.5 rounded-full bg-emerald-600" />
                            Catatan Sudah Tersimpan (+2 JP)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                            <span className="size-1.5 rounded-full bg-amber-500" />
                            Belum Diisi (+2 JP)
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-bold text-[#0f172a] truncate">
                        {targetPeserta?.nama}
                      </span>
                      <span className="text-xs text-[#64748b]">
                        {targetPeserta?.nip ? `NIP. ${targetPeserta.nip}` : ""}
                        {targetPeserta?.jabatan
                          ? ` — ${targetPeserta.jabatan}`
                          : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600">
                    <svg
                      className="size-3.5 text-slate-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span className="font-semibold text-slate-700">Terkunci ke Akun Anda</span>
                  </div>
                </div>

                {/* Mandat Regulasi & Kebijakan CMC */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11.5px] text-[#475569]">
                  <svg
                    className="size-3.5 text-blue-600 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    <strong>Catatan Mandiri:</strong> Setiap peserta hanya dapat membuat catatan untuk dirinya sendiri. Catatan tidak dapat dibuatkan atau diwakilkan oleh peserta lain.
                  </span>
                </div>

                {/* Ringkasan Status Anggota Kelompok (Read-Only) */}
                {session?.peserta_list && session.peserta_list.length > 1 && (
                  <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5">
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Status Pengisian Peserta Kelompok ({currentPertemuanObj?.catatan_list?.length || 0}/{session.peserta_list.length}):
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {session.peserta_list.map((p) => {
                        const isMe =
                          targetPeserta?.nip &&
                          p.nip.trim().toLowerCase() ===
                            targetPeserta.nip.trim().toLowerCase();
                        const hasNote =
                          currentPertemuanObj?.catatan_list?.some(
                            (c) =>
                              c.nip.trim().toLowerCase() ===
                              p.nip.trim().toLowerCase(),
                          );
                        return (
                          <span
                            key={p.nip}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium border ${
                              isMe
                                ? "bg-blue-50 border-blue-300 text-blue-900 font-bold ring-1 ring-blue-300"
                                : hasNote
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                                  : "bg-slate-50 border-slate-200 text-slate-600"
                            }`}
                          >
                            {hasNote ? (
                              <svg
                                className="size-3 text-emerald-600 shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <span className="size-1.5 rounded-full bg-slate-400 shrink-0" />
                            )}
                            <span>{p.nama.split(" ")[0]}</span>
                            {isMe && (
                              <span className="text-[10px] text-blue-700 font-bold">
                                (Anda)
                              </span>
                            )}
                            <span className="text-[10px] opacity-75">
                              {hasNote ? "Sudah" : "Belum"}
                            </span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Note Status Notice */}
            {hasExistingNoteForTarget && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-[8px] p-3 flex items-center gap-2.5 text-xs text-emerald-800">
                <svg
                  className="size-4 text-emerald-600 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Memuat catatan pelaksanaan milik{" "}
                  <strong>{targetPeserta?.nama}</strong> yang telah disimpan.
                  Anda dapat memperbarui isian formulir di bawah.
                </span>
              </div>
            )}

            {/* Rule Banner: 1 pertemuan = 2 JP. Maks. 2 pertemuan per bulan per jenis kegiatan */}

            {session && isSessionCompleted && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-[8px] p-3.5 flex items-start gap-2.5 text-xs text-emerald-900">
                <svg
                  className="size-4.5 text-emerald-600 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-emerald-950">
                    Sesi Telah Ditandai Selesai
                  </span>
                  <span>
                    Sesi ini sudah ditandai selesai. Pertemuan baru tidak dapat ditambahkan atau dicatat kembali.
                  </span>
                </div>
              </div>
            )}

            {session &&
              !isSessionCompleted &&
              session.status !== "confirmed" && (
                <div className="bg-amber-50 border border-amber-200 rounded-[8px] p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
                  <svg
                    className="size-4.5 text-amber-600 shrink-0 mt-0.5"
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
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-amber-950">
                      Sesi Belum Diverifikasi Atasan Langsung
                    </span>
                    <span>
                      Sesi berstatus{" "}
                      <strong>
                        {session.status === "rejected"
                          ? "Perlu Perbaikan"
                          : "Menunggu Verifikasi"}
                      </strong>
                      . Catatan pertemuan baru dapat dicatat dan disimpan secara
                      resmi setelah sesi disetujui oleh Atasan Langsung /
                      Pejabat Penilai.
                    </span>
                  </div>
                </div>
              )}

            {/* Rule Banner: 1 pertemuan = 2 JP. Maks. 2 pertemuan per bulan per jenis kegiatan */}
            <div className="bg-blue-50/70 border border-blue-200/80 rounded-[8px] px-3.5 py-2.5 flex items-center gap-2.5 text-xs text-blue-950">
              <svg
                className="size-4 text-blue-600 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                <strong>Ketentuan JP:</strong> 1 pertemuan = 2 JP. Maksimal
                pelaksanaan adalah 2 pertemuan per bulan per jenis kegiatan.
              </span>
            </div>

            <div className="bg-white border border-[#e2e6eb] rounded-[10px] shadow-xs overflow-hidden">
              <CatatPertemuanStepper
                currentStep={currentStep}
                onStepClick={setCurrentStep}
              />

              <div className="p-5 sm:p-[22px]">
                {loadingSession && (
                  <div className="py-12 flex flex-col items-center justify-center gap-2 text-slate-400">
                    <div className="size-6 border-2 border-slate-300 border-t-[#0a2540] rounded-full animate-spin" />
                    <span className="text-xs">Memuat informasi sesi...</span>
                  </div>
                )}

                {!loadingSession && (
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <Step1DataDanTujuan
                        tanggal={tanggal}
                        onTanggalChange={setTanggal}
                        waktu={waktu}
                        onWaktuChange={setWaktu}
                        moda={moda}
                        onModaChange={setModa}
                        lokasi={lokasi}
                        onLokasiChange={setLokasi}
                        pertemuanKe={pertemuanKe}
                        tujuan={tujuan}
                        onTujuanChange={setTujuan}
                      />
                    )}

                    {currentStep === 2 && (
                      <Step2Pembahasan
                        identifikasiKebutuhan={identifikasiKebutuhan}
                        onIdentifikasiKebutuhanChange={setIdentifikasiKebutuhan}
                        areaPengembangan={areaPengembangan}
                        onAreaPengembanganChange={setAreaPengembangan}
                        pembahasan={pembahasan}
                        onPembahasanChange={setPembahasan}
                        umpanBalikCoach={umpanBalikCoach}
                        onUmpanBalikCoachChange={setUmpanBalikCoach}
                        kesepakatanSolusi={kesepakatanSolusi}
                        onKesepakatanSolusiChange={setKesepakatanSolusi}
                      />
                    )}

                    {currentStep === 3 && (
                      <Step3TindakLanjut
                        rencanaTindakLanjut={rencanaTindakLanjut}
                        onRencanaTindakLanjutChange={setRencanaTindakLanjut}
                        targetWaktu={targetWaktu}
                        onTargetWaktuChange={setTargetWaktu}
                        actionLearningFiles={actionLearningFiles}
                        onAddActionLearningFile={(f) =>
                          setActionLearningFiles((prev) => [...prev, f])
                        }
                        onRemoveActionLearningFile={(idx) =>
                          setActionLearningFiles((prev) =>
                            prev.filter((_, i) => i !== idx),
                          )
                        }
                        buktiFotoFiles={buktiFotoFiles}
                        onAddBuktiFotoFiles={(files) =>
                          setBuktiFotoFiles((prev) => [...prev, ...files])
                        }
                        onRemoveBuktiFotoFile={(idx) =>
                          setBuktiFotoFiles((prev) =>
                            prev.filter((_, i) => i !== idx),
                          )
                        }
                        pernyataanSetuju={pernyataanSetuju}
                        onPernyataanSetujuChange={setPernyataanSetuju}
                      />
                    )}
                  </AnimatePresence>
                )}
              </div>

              {/* Action Buttons Bar */}
              <div className="border-t border-[#eef1f5] bg-white px-4 sm:px-[22px] py-[14px] sm:py-[16px] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <span className="size-[6px] rounded-full bg-[#10b981]" />
                  <span className="text-[11.5px] leading-[17.25px] text-[#64748b]">
                    Pertemuan tercatat resmi dan klaim 2 JP setelah diverifikasi
                  </span>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-2.5">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    className="h-[36px] px-3 sm:px-[16px] rounded-[8px] border border-transparent text-[#64748b] hover:text-[#0f172a] hover:bg-slate-50 text-[13px] font-medium transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Batal
                  </motion.button>

                  <div className="flex items-center gap-2">
                    {currentStep > 1 && (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handlePrevStep}
                        disabled={isSubmitting}
                        className="h-[36px] px-3.5 sm:px-[16px] rounded-[8px] bg-white border border-[#e2e6eb] hover:bg-slate-50 text-[#334155] text-[13px] font-medium transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
                      >
                        Kembali
                      </motion.button>
                    )}

                    <motion.button
                      type="button"
                      whileHover={
                        !isParticipant || isSessionCompleted
                          ? undefined
                          : { scale: 1.02 }
                      }
                      whileTap={
                        !isParticipant || isSessionCompleted
                          ? undefined
                          : { scale: 0.97 }
                      }
                      onClick={handleNextStep}
                      disabled={
                        isSubmitting || !isParticipant || isSessionCompleted
                      }
                      title={
                        !isParticipant
                          ? "Hanya peserta terdaftar yang dapat menyimpan catatan"
                          : isSessionCompleted
                            ? "Sesi ini sudah selesai sehingga tidak dapat menambah catatan baru"
                            : undefined
                      }
                      className="h-[36px] px-4 sm:px-[16px] rounded-[8px] bg-[#0a2540] hover:bg-[#13396b] text-white text-[13px] font-medium inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>
                        {isSubmitting
                          ? "Menyimpan..."
                          : isSessionCompleted
                            ? "Sesi Selesai (Terkunci)"
                            : currentStep === 3
                              ? "Simpan Pertemuan"
                              : "Lanjut"}
                      </span>
                      {currentStep < 3 && !isSubmitting && (
                        <svg
                          className="size-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <CatatPertemuanSidebar
            currentStep={currentStep}
            session={session}
            sessionTitle={session?.title || session?.topic}
            practitionerRole={practitionerRole}
            practitionerName={practitionerName}
            clientName={targetPeserta?.nama || session?.client?.full_name}
            clientNip={targetPeserta?.nip || session?.client?.nip}
            clientJabatan={targetPeserta?.jabatan || session?.client?.jabatan}
            atasanName={atasanName}
            targetJp={targetPeserta?.target_jp || session?.target_jp}
            currentJp={targetPeserta?.current_jp || session?.current_jp}
          />
        </div>
      </main>

      {/* Modal: Sukses Catat Pertemuan */}
      <CatatSuccessModal
        isOpen={showSuccessModal}
        pertemuanKe={pertemuanKe}
        onClose={handleReturnToDetail}
        onBackToDetail={handleReturnToDetail}
        practitionerName={practitionerName}
        atasanName={atasanName}
        participantName={targetPeserta?.nama}
      />

      {/* Toast Notification */}
      <SesiToast message={toastMessage} />

      {/* Footer */}
      <AppFooter onShowToast={showToast} />
    </div>
  );
}

export default function CatatPertemuanPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center text-slate-500 text-sm">
          Memuat halaman catat pertemuan...
        </div>
      }
    >
      <CatatPertemuanContent />
    </Suspense>
  );
}
