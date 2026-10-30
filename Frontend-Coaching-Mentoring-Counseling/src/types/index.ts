export type PillarId = "coaching" | "mentoring" | "counselling";

export interface PillarInfo {
  id: PillarId;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  accentColor: string;
  iconBg: string;
  focusAreas: string[];
  targetAudience: string;
  jpValue: string;
  icon?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: "umum" | "jp" | "teknis";
}

export interface LegalRegistryItem {
  act: string;
  number: string;
  article: string;
  title: string;
  description: string;
  category: string;
}

export interface WorkflowStepItem {
  step: string;
  title: string;
  role: string;
  desc: string;
}

export interface SectorApplication {
  matra: string;
  sub: string;
  badge: string;
  roles: string[];
  focusProgram: string;
  accent: string;
}
