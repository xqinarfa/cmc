"use client";

import { type Variants } from "framer-motion";
import { CertificateItem } from "@/lib/certificateData";
import SertifikatGridCard from "./SertifikatGridCard";
import SertifikatListCard from "./SertifikatListCard";

export interface SertifikatCardProps {
  cert: CertificateItem;
  viewMode: "grid" | "list";
  onSelect: (cert: CertificateItem) => void;
  onDownload: (cert: CertificateItem) => void;
  onCopyLink: (cert: CertificateItem) => void;
  isDownloading: boolean;
  isCopied: boolean;
  variants?: Variants;
}

export default function SertifikatCard({
  cert,
  viewMode,
  onSelect,
  onDownload,
  onCopyLink,
  isDownloading,
  isCopied,
  variants,
}: SertifikatCardProps) {
  if (viewMode === "list") {
    return (
      <SertifikatListCard
        cert={cert}
        variants={variants}
        onSelect={onSelect}
        onDownload={onDownload}
        onCopyLink={onCopyLink}
        isCopied={isCopied}
      />
    );
  }

  return (
    <SertifikatGridCard
      cert={cert}
      variants={variants}
      onSelect={onSelect}
      onDownload={onDownload}
      onCopyLink={onCopyLink}
      isDownloading={isDownloading}
      isCopied={isCopied}
    />
  );
}
