import type { Metadata } from "next";
import "./globals.css";

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
      className="h-full antialiased scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans min-h-full flex flex-col bg-[#FCFDFE] text-[#0f172a]">
        {children}
      </body>
    </html>
  );
}
