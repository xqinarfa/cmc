"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ASSETS } from "@/lib/assets";

export interface AppNavbarNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: "success" | "info" | "warning";
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
    message: "Dr. Sari Wulandari menunggu konfirmasi token Anda (CMC-4821-7X9A).",
    time: "10 menit yang lalu",
    unread: true,
    type: "info",
  },
  {
    id: "notif-2",
    title: "Verifikasi Sesi Coaching",
    message: "Sesi Coaching ke-1 bersama Rudi Santoso, M.M. telah diverifikasi 3 JP di SIASN.",
    time: "2 jam yang lalu",
    unread: true,
    type: "success",
  },
  {
    id: "notif-3",
    title: "Pengingat Target Tahunan",
    message: "Sisa 6 JP lagi untuk memenuhi kewajiban 20 JP tahun anggaran 2026.",
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

  // Notifications state
  const [notifications, setNotifications] = useState<AppNavbarNotification[]>(DEFAULT_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Refs for outside click dismissal
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Determine active item based on current pathname
  const getActiveTab = () => {
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
    { id: "Pengembangan", label: "Pengembangan" },
    { id: "Sertifikat", label: "Sertifikat" },
    { id: "Pengaturan", label: "Pengaturan" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e2e6eb] transition-all">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between gap-4">
        {/* Left: Mobile Trigger & Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden size-9 rounded-lg hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
            aria-label="Buka Menu Navigasi"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
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
          <nav className="hidden md:flex items-center gap-1 flex-1 h-[37px] ml-4" aria-label="Menu Utama">
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
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
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
              <svg className="size-[17px] text-[#334155]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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
                      <span className="font-bold text-slate-900 text-xs">Pemberitahuan</span>
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
                          setNotifications(notifications.map((n) => ({ ...n, unread: false })));
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
                          notif.unread ? "bg-blue-50/40 hover:bg-blue-50/70" : "hover:bg-slate-50"
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
                          <span className="text-[10px] text-slate-400 mt-1">{notif.time}</span>
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
              <div
                className="overflow-clip relative rounded-[15px] shrink-0 size-[30px]"
                style={{
                  backgroundImage: "linear-gradient(135deg, rgb(148, 163, 184) 0%, rgb(71, 85, 105) 100%)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2.5807 0 0 2.5807 15 9)'><stop stop-color='rgba(254,202,202,1)' offset='0'/><stop stop-color='rgba(254,202,202,0)' offset='0.34'/></radialGradient></defs></svg>\"), url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2.3895 0 0 2.3895 15 18.6)'><stop stop-color='rgba(51,65,85,1)' offset='0'/><stop stop-color='rgba(51,65,85,0)' offset='0.44'/></radialGradient></defs></svg>\")",
                  }}
                />
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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
                  className="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-32px)] bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs origin-top-right"
                >
                  <div className="px-4 py-3 border-b border-slate-100 flex flex-col gap-0.5">
                    <span className="font-bold text-slate-900 text-[13px]">Andi Pratama, S.Si.T.</span>
                    <span className="text-[11px] font-mono text-slate-500">NIP: 198904122014031002</span>
                    <span className="text-[11px] text-blue-700 font-medium pt-0.5">
                      Balai Pengelola Transportasi Darat
                    </span>
                  </div>

                  <div className="py-1">
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
                      <span className="text-[11px] font-bold text-blue-700">14 JP</span>
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
                      onClick={() => {
                        router.push("/login");
                      }}
                      className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 font-semibold cursor-pointer flex items-center gap-2"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
            className="md:hidden border-t border-slate-200 px-4 py-3 bg-white flex flex-col gap-1 shadow-lg overflow-hidden"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-blue-50 text-blue-800 font-bold" : "text-slate-700 hover:bg-slate-50"
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
