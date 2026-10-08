import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CMC — Corporate University Kementerian Perhubungan",
  description:
    "Platform Coaching, Mentoring, dan Counselling Kementerian Perhubungan Republik Indonesia untuk mendukung pengembangan kompetensi pegawai secara terstruktur, terukur, dan terintegrasi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${inter.variable} ${plusJakartaSans.className} h-full antialiased scroll-smooth`}
    >
      <body className={`${plusJakartaSans.className} font-sans min-h-full flex flex-col bg-[#FCFDFE] text-[#0f172a]`}>
        {children}
      </body>
    </html>
  );
}
