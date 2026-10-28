export type ProjectCategory =
  | 'Sistemas & Produto'
  | 'Arquitetura Digital'
  | 'Hardware & Áudio'
  | 'Editorial & Tipografia';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  year: string;
  client: string;
  role: string;
  featured: boolean;
  bentoSpan: 'wide' | 'standard';
  imageUrl: string;
  summary: string;
  challenge: string;
  outcome: string;
  metrics: string;
  technologies: string[];
  liveUrl: string;
  repositoryUrl?: string;
}

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  context: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  impact: string;
}

export interface ServicePillar {
  id: string;
  index: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  behance: string;
  instagram: string;
}

export interface BioProfile {
  brandName: string;
  fullName: string;
  roleTitle: string;
  kicker: string;
  headline: string;
  leadParagraph: string;
  ExtendedBio: string;
  philosophyQuote: string;
  location: string;
  availabilityText: string;
  email: string;
  heroImageUrl: string;
  socials: SocialLinks;
}

export interface CursorCloudSettings {
  enabled: boolean;
  intensity: number; // 0.15 to 0.65
  radius: number; // 240 to 520 px
  smoothing: number; // 0.04 to 0.2
}

export interface PortfolioData {
  bio: BioProfile;
  metrics: MetricItem[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  services: ServicePillar[];
  cursorSettings: CursorCloudSettings;
  lastUpdated: string;
}
