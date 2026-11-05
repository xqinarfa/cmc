import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cmc.hulunautika.com";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a2540" },
    { media: "(prefers-color-scheme: dark)", color: "#0a2540" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CMC — Corporate University Kementerian Perhubungan",
    template: "%s | CMC Kemenhub",
  },
  description:
    "Platform resmi Coaching, Mentoring, dan Counseling (CMC) Corporate University Kementerian Perhubungan Republik Indonesia untuk akselerasi kompetensi, kepemimpinan, dan performa ASN Kemenhub secara terukur dan terintegrasi.",
  applicationName: "CMC Kemenhub",
  authors: [
    {
      name: "Kementerian Perhubungan Republik Indonesia",
      url: "https://dephub.go.id",
    },
    {
      name: "BPSDM Perhubungan",
      url: "https://bpsdmp.dephub.go.id",
    },
  ],
  generator: "Next.js",
  keywords: [
    "CMC Kemenhub",
    "Coaching Mentoring Counseling",
    "Kemenhub Corporate University",
    "Corporate University Kemenhub",
    "BPSDM Perhubungan",
    "Pengembangan Kompetensi ASN",
    "Kementerian Perhubungan RI",
    "Pelatihan Pegawai Kemenhub",
    "Jam Pelajaran JP ASN",
    "Aparatur Sipil Negara",
    "Karier ASN Dephub",
  ],
  creator: "BPSDM Perhubungan",
  publisher: "Kementerian Perhubungan Republik Indonesia",
  category: "Pendidikan & Pengembangan ASN",
  classification: "Layanan Pemerintah & Pengembangan SDM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "id-ID": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "CMC Kemenhub Corporate University",
    title: "CMC — Corporate University Kementerian Perhubungan",
    description:
      "Platform terintegrasi Coaching, Mentoring, dan Counseling (CMC) Kemenhub Corpu untuk akselerasi kompetensi dan karier ASN Kementerian Perhubungan.",
    images: [
      {
        url: "/assets/kemenhub-corpu-logo.png",
        width: 1200,
        height: 630,
        alt: "Logo Kemenhub Corporate University — CMC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CMC — Corporate University Kementerian Perhubungan",
    description:
      "Platform resmi Coaching, Mentoring, dan Counseling Kemenhub Corpu untuk akselerasi kompetensi dan karier ASN.",
    site: "@kemenhub151",
    creator: "@kemenhub151",
    images: ["/assets/kemenhub-corpu-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/assets/kemenhub-corpu-cropped.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/kemenhub-corpu-logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/assets/kemenhub-corpu-logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/assets/kemenhub-corpu-cropped.png"],
  },
  manifest: "/manifest.json",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GovernmentOrganization",
      "@id": "https://dephub.go.id/#organization",
      name: "Kementerian Perhubungan Republik Indonesia",
      alternateName: ["Kemenhub RI", "Dephub"],
      url: "https://dephub.go.id",
      logo: `${siteUrl}/assets/kemenhub-corpu-logo.png`,
      sameAs: [
        "https://twitter.com/kemenhub151",
        "https://www.instagram.com/kemenhub151",
        "https://www.facebook.com/kemenhub151",
        "https://www.youtube.com/c/KementerianPerhubunganRI",
      ],
    },
    {
      "@type": "WebApplication",
      "@id": `${siteUrl}/#webapp`,
      name: "CMC Kemenhub",
      alternateName: "Platform Coaching Mentoring Counseling Kemenhub Corpu",
      url: siteUrl,
      applicationCategory: "EducationalApplication",
      operatingSystem: "All",
      description:
        "Platform resmi Coaching, Mentoring, dan Counseling (CMC) Corporate University Kementerian Perhubungan Republik Indonesia untuk pengembangan kompetensi pegawai.",
      provider: {
        "@id": "https://dephub.go.id/#organization",
      },
      inLanguage: "id-ID",
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans min-h-full flex flex-col bg-[#FCFDFE] text-[#0f172a]">
        {children}
      </body>
    </html>
  );
}
