"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ASSETS } from "@/lib/assets";
import { syncMyProfileWithSIK } from "@/lib/api/sik";

export interface AppNavbarNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: "success" | "info" | "warning";
}

export interface LoggedInUser {
  id?: string;
  full_name: string;
  nama_lengkap_gelar?: string;
  nip?: string;
  email?: string;
  role?: string;
  jabatan?: string;
  pangkat_golongan?: string;
  unit?: string;
  unit_kerja?: string;
  agency?: string;
  satker?: string;
  satuan_kerja?: string;
  avatar_url?: string;
  total_jp?: number;
}

interface AppNavbarProps {
  onOpenCertModal?: () => void;
  onOpenCoachFinder?: () => void;
  onOpenBreakdownModal?: () => void;
}

const DEFAULT_NOTIFICATIONS: AppNavbarNotification[] = [
  {
    id: "notif-1",
    title: "Token Pairing Aktif",
    message:
      "Dr. Sari Wulandari menunggu konfirmasi token Anda (CMC-4821-7X9A).",
    time: "10 menit yang lalu",
    unread: true,
    type: "info",
  },
  {
    id: "notif-2",
    title: "Verifikasi Sesi Coaching",
    message:
      "Sesi Coaching ke-1 bersama Rudi Santoso, M.M. telah diverifikasi 3 JP di SIASN.",
    time: "2 jam yang lalu",
    unread: true,
    type: "success",
  },
  {
    id: "notif-3",
    title: "Pengingat Target Tahunan",
    message:
      "Sisa 6 JP lagi untuk memenuhi kewajiban 20 JP tahun anggaran 2026.",
    time: "Kemarin",
    unread: false,
    type: "warning",
  },
];

export default function AppNavbar({
  onOpenCertModal,
  onOpenCoachFinder,
  onOpenBreakdownModal,
}: AppNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Mobile menu drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dropdown menus
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // User profile state based on authentication
  const [currentUser, setCurrentUser] = useState<LoggedInUser>({
    full_name: "Andi Pratama, S.Si.T.",
    nip: "198904122014031002",
    unit: "Balai Pengelola Transportasi Darat",
    role: "client",
    total_jp: 14,
  });

  const [avatarImgError, setAvatarImgError] = useState(false);

  // Sync logged in user from localStorage and backend API
  useEffect(() => {
    try {
      const stored =
        localStorage.getItem("user") || localStorage.getItem("cmc_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.full_name || parsed.name)) {
          setCurrentUser((prev) => ({
            ...prev,
            id: parsed.id || prev.id,
            full_name: parsed.full_name || parsed.name || prev.full_name,
            nip: parsed.nip || prev.nip,
            email: parsed.email || prev.email,
            role: parsed.role || prev.role,
            unit: parsed.unit || parsed.agency || parsed.satker || prev.unit,
            avatar_url: parsed.avatar_url || prev.avatar_url,
            total_jp: parsed.total_jp ?? prev.total_jp,
          }));
        }
      }
    } catch (e) {
      console.warn("Gagal membaca profil dari penyimpanan lokal:", e);
    }

    const token =
      localStorage.getItem("auth_token") ||
      localStorage.getItem("token") ||
      localStorage.getItem("cmc_token");

    if (token) {
      const apiBase =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
      const cleanBase = apiBase.replace(/\/$/, "");

      fetch(`${cleanBase}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 401) {
            // Token kadaluarsa / tidak valid: bersihkan token lokal secara aman
            try {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("token");
              localStorage.removeItem("cmc_token");
            } catch {}
            return null;
          }
          if (!res.ok) throw new Error("Gagal mengambil data profil");
          return res.json();
        })
        .then((data) => {
          if (!data) return;
          const u = data.data || data.user || data;
          if (u && (u.full_name || u.name)) {
            const updated: LoggedInUser = {
              id: u.id,
              full_name: u.nama_lengkap_gelar || u.full_name || u.name,
              nama_lengkap_gelar: u.nama_lengkap_gelar,
              nip: u.nip,
              email: u.email,
              role: u.role,
              jabatan: u.jabatan,
              pangkat_golongan: u.pangkat_golongan,
              unit: u.unit_kerja || u.unit || u.agency || u.satker,
              unit_kerja: u.unit_kerja,
              satuan_kerja: u.satuan_kerja,
              avatar_url: u.avatar_url,
              total_jp: u.total_jp ?? 14,
            };
            setCurrentUser(updated);
            try {
              localStorage.setItem(
                "user",
                JSON.stringify({ ...u, ...updated }),
              );
              localStorage.setItem(
                "cmc_user",
                JSON.stringify({ ...u, ...updated }),
              );
            } catch {}
          }
        })
        .catch(() => {
          // Fallback to cached profile if backend is unreachable
        });
    }
  }, []);

  const getRoleBadge = (role?: string) => {
    switch (role?.toLowerCase()) {
      case "coach":
        return {
          label: "Coach",
          color: "bg-blue-100 text-blue-700 border-blue-200",
        };
      case "mentor":
        return {
          label: "Mentor",
          color: "bg-indigo-100 text-indigo-700 border-indigo-200",
        };
      case "counselor":
        return {
          label: "Konselor",
          color: "bg-purple-100 text-purple-700 border-purple-200",
        };
      case "super_admin":
      case "superadmin":
        return {
          label: "Super Admin",
          color: "bg-rose-100 text-rose-800 border-rose-300 font-extrabold",
        };
      case "admin":
        return {
          label: "Admin BPSDM",
          color: "bg-amber-100 text-amber-800 border-amber-300 font-bold",
        };
      case "client":
      default:
        return {
          label: "ASN",
          color: "bg-emerald-100 text-emerald-700 border-emerald-200",
        };
    }
  };

  const getDisplayUnit = (user: LoggedInUser) => {
    if (user.unit) return user.unit;
    switch (user.role?.toLowerCase()) {
      case "coach":
        return "Pusbang SDM Aparatur Perhubungan";
      case "mentor":
        return "Biro Kepegawaian & Organisasi";
      case "counselor":
        return "Layanan Psikologi & Konseling BPSDM";
      case "admin":
        return "Pusdatin Kemenhub";
      default:
        return "Balai Pengelola Transportasi Darat";
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "AP";
    const cleaned = name.replace(/,\s*.*$/, "").trim();
    const parts = cleaned.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    setShowProfileMenu(false);
    try {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("token");
      localStorage.removeItem("cmc_token");
      localStorage.removeItem("user");
      localStorage.removeItem("cmc_user");
      document.cookie = "auth_token=; path=/; max-age=0; SameSite=Lax";
    } catch (e) {
      console.warn("Gagal membersihkan data sesi:", e);
    }
    router.push("/login");
  };

  const [isSyncingSIK, setIsSyncingSIK] = useState(false);

  const handleSyncSIK = async () => {
    setIsSyncingSIK(true);
    try {
      const data = await syncMyProfileWithSIK();
      if (data) {
        setCurrentUser((prev) => ({
          ...prev,
          full_name:
            data.nama_lengkap_gelar || data.full_name || prev.full_name,
          nama_lengkap_gelar: data.nama_lengkap_gelar,
          nip: data.nip || prev.nip,
          unit: data.unit_kerja || data.unit || prev.unit,
          unit_kerja: data.unit_kerja,
          satuan_kerja: data.satuan_kerja,
          jabatan: data.jabatan || prev.jabatan,
          pangkat_golongan: data.pangkat_golongan || prev.pangkat_golongan,
        }));
      }
    } finally {
      setIsSyncingSIK(false);
    }
  };

  // Notifications state
  const [notifications, setNotifications] = useState<AppNavbarNotification[]>(
    DEFAULT_NOTIFICATIONS,
  );
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Refs for outside click dismissal
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Determine active item based on current pathname
  const getActiveTab = () => {
    if (
      pathname.startsWith("/master") ||
      pathname.startsWith("/pegawai") ||
      pathname.startsWith("/instansi")
    )
      return "Master";
    if (pathname.startsWith("/sesi")) return "Sesi";
    if (pathname.startsWith("/program")) return "Program";
    if (pathname.startsWith("/pengembangan")) return "Pengembangan";
    if (pathname.startsWith("/sertifikat")) return "Sertifikat";
    if (pathname.startsWith("/pengaturan")) return "Pengaturan";
    return "Beranda";
  };

  const activeTab = getActiveTab();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationMenuRef.current &&
        !notificationMenuRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle menu item actions
  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === "Beranda") {
      router.push("/dashboard");
    } else if (id === "Sesi") {
      router.push("/sesi");
    } else if (id === "Master") {
      router.push("/master");
    } else if (id === "Program") {
      if (onOpenCoachFinder) {
        onOpenCoachFinder();
      } else {
        router.push("/dashboard?open=coach-finder");
      }
    } else if (id === "Sertifikat") {
      router.push("/sertifikat");
    } else if (id === "Pengembangan") {
      router.push("/dashboard#pengembangan");
    } else if (id === "Pengaturan") {
      router.push("/dashboard#pengaturan");
    }
  };

  const navItems = [
    { id: "Beranda", label: "Beranda" },
    { id: "Sesi", label: "Sesi" },
    { id: "Sertifikat", label: "Sertifikat" },
    { id: "Master", label: "Master" },
    // { id: "Pengembangan", label: "Pengembangan" },
    // { id: "Pengaturan", label: "Pengaturan" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e2e6eb] transition-all">
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 h-[60px] flex items-center justify-between gap-4">
        {/* Left: Mobile Trigger & Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden size-9 rounded-lg hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
            aria-label="Buka Menu Navigasi"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <Link
            href="/"
            className="flex items-center gap-3 group"
            title="Kembali ke Landing Page Utama"
            aria-label="Kembali ke Landing Page Utama"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.corpuLogo}
              alt="Logo Kemenhub Corporate University"
              className="h-8 w-auto object-contain shrink-0 group-hover:scale-[1.02] transition-transform"
            />
            <div className="hidden sm:block w-px h-6 bg-[#e2e8f0]" />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-bold text-[#0f172a] text-[13px] leading-tight tracking-[-0.2px] group-hover:text-blue-700 transition-colors">
                CMC
              </span>
              <span className="text-[#64748b] text-[10px] leading-tight tracking-[-0.2px]">
                Kemenhub
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Items */}
        <LayoutGroup id="navbar-tabs">
          <nav
            className="hidden md:flex items-center gap-1 flex-1 h-[37px] ml-4"
            aria-label="Menu Utama"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-[12px] py-[8px] rounded-[6px] text-[13.5px] leading-[20.25px] transition-colors cursor-pointer outline-none ${
                    isActive
                      ? "text-[#0f172a] font-semibold"
                      : "text-[#64748b] font-medium hover:text-[#0f172a]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavbarIndicator"
                      className="absolute -bottom-[8px] left-[12px] right-[12px] h-[2px] bg-[#0f172a] rounded-[1px]"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 32,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </LayoutGroup>

        {/* Right: Actions Controls */}
        <div className="flex items-center gap-1">
          {/* Notification Bell with Dropdown */}
          <div className="relative" ref={notificationMenuRef}>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label={`Notifikasi (${unreadCount} belum dibaca)`}
              aria-expanded={showNotifications}
              className="relative size-[34px] rounded-[6px] hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer outline-none"
            >
              <svg
                className="size-[17px] text-[#334155]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <div className="absolute bg-[#b42318] border border-solid border-white right-[7px] top-[7px] rounded-[3.5px] size-[7px]" />
            </motion.button>

            {/* Notification Popover with AnimatePresence */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ type: "spring", duration: 0.22, bounce: 0 }}
                  className="absolute right-0 top-full mt-2 w-[calc(100vw-32px)] max-w-sm sm:w-92 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 origin-top-right"
                >
                  <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs">
                        Pemberitahuan
                      </span>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                          {unreadCount} Baru
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setNotifications(
                            notifications.map((n) => ({ ...n, unread: false })),
                          );
                        }}
                        className="text-[11px] font-semibold text-blue-700 hover:text-blue-800 cursor-pointer"
                      >
                        Tandai semua dibaca
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3.5 flex items-start gap-3 transition-colors ${
                          notif.unread
                            ? "bg-blue-50/40 hover:bg-blue-50/70"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className={`size-2 rounded-full mt-1.5 shrink-0 ${
                            notif.type === "success"
                              ? "bg-emerald-500"
                              : notif.type === "warning"
                                ? "bg-amber-500"
                                : "bg-blue-600"
                          }`}
                        />
                        <div className="flex-1 flex flex-col gap-0.5">
                          <span className="font-semibold text-xs text-slate-900 leading-snug">
                            {notif.title}
                          </span>
                          <span className="text-[11.5px] text-slate-600 leading-relaxed">
                            {notif.message}
                          </span>
                          <span className="text-[10px] text-slate-400 mt-1">
                            {notif.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-3.5 pt-2 border-t border-slate-100 text-center">
                    <button
                      type="button"
                      onClick={() => setShowNotifications(false)}
                      className="text-[11.5px] font-semibold text-slate-600 hover:text-slate-900 py-1 cursor-pointer"
                    >
                      Tutup
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative pl-[6px]" ref={profileMenuRef}>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              aria-expanded={showProfileMenu}
              aria-haspopup="true"
              className="flex items-center gap-[6px] pl-[3px] pr-[6px] py-[3px] rounded-[6px] hover:bg-slate-100 transition-colors cursor-pointer outline-none"
            >
              <div className="relative rounded-full shrink-0 size-[32px] overflow-hidden bg-gradient-to-br from-[#0a2540] to-blue-800 text-white font-bold text-xs flex items-center justify-center border border-slate-200 shadow-2xs">
                {currentUser.avatar_url && !avatarImgError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentUser.avatar_url}
                    alt={currentUser.full_name}
                    className="size-full object-cover"
                    onError={() => setAvatarImgError(true)}
                  />
                ) : (
                  <span>{getInitials(currentUser.full_name)}</span>
                )}
              </div>
              <svg
                className={`w-[10px] h-[10px] text-slate-500 transition-transform duration-200 ${
                  showProfileMenu ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.button>

            {/* Profile Menu Dropdown with AnimatePresence */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ type: "spring", duration: 0.22, bounce: 0 }}
                  className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-32px)] bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs origin-top-right"
                >
                  <div className="px-4 py-3 border-b border-slate-100 flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-900 text-[13px] truncate">
                        {currentUser.full_name}
                      </span>
                      <span
                        className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${
                          getRoleBadge(currentUser.role).color
                        }`}
                      >
                        {getRoleBadge(currentUser.role).label}
                      </span>
                    </div>
                    {currentUser.nip && (
                      <span className="text-[11px] font-mono text-slate-500">
                        NIP: {currentUser.nip}
                      </span>
                    )}
                    <span className="text-[11px] text-blue-700 font-medium">
                      {getDisplayUnit(currentUser)}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      type="button"
                      disabled={isSyncingSIK}
                      onClick={handleSyncSIK}
                      className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer disabled:opacity-60"
                    >
                      <div className="flex items-center gap-2">
                        <svg
                          className={`size-3.5 text-emerald-600 ${
                            isSyncingSIK ? "animate-spin" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        <span>
                          {isSyncingSIK
                            ? "Menyinkronkan SIK..."
                            : "Sinkronkan Data SIK"}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        SIK
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        if (onOpenBreakdownModal) {
                          onOpenBreakdownModal();
                        } else {
                          router.push("/dashboard?open=breakdown");
                        }
                      }}
                      className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>Riwayat Capaian 20 JP</span>
                      <span className="text-[11px] font-bold text-blue-700">
                        {currentUser.total_jp ?? 14} JP
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        router.push("/master-pegawai");
                      }}
                      className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>Direktori Master Pegawai</span>
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                        SIK
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        router.push("/sertifikat");
                      }}
                      className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Sertifikat Kompetensi
                    </button>
                    <Link
                      href="/#faq"
                      onClick={() => setShowProfileMenu(false)}
                      className="block px-4 py-2 text-slate-700 hover:bg-slate-50"
                    >
                      Bantuan &amp; Panduan Pengguna
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 font-semibold cursor-pointer flex items-center gap-2 transition-colors"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Keluar dari Akun (Logout)</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden border-t border-slate-200 px-4 py-3 bg-white flex flex-col gap-2 shadow-lg overflow-hidden"
          >
            {/* Mobile User Info Card */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-8 rounded-full bg-[#0a2540] text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                  {currentUser.avatar_url && !avatarImgError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={currentUser.avatar_url}
                      alt={currentUser.full_name}
                      className="size-full object-cover rounded-full"
                      onError={() => setAvatarImgError(true)}
                    />
                  ) : (
                    <span>{getInitials(currentUser.full_name)}</span>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {currentUser.full_name}
                  </span>
                  <span className="text-[10px] text-slate-500 truncate">
                    {currentUser.nip
                      ? `NIP: ${currentUser.nip}`
                      : getDisplayUnit(currentUser)}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 px-2 py-1 rounded hover:bg-rose-50 cursor-pointer"
              >
                Logout
              </button>
            </div>

            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-800 font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
