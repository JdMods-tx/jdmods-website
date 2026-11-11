export type Vehicle = {
  _id: string;
  title: string;
  slug: string;
  chassis: string;
  year?: number;
  make?: string;
  engine?: string;
  power?: string;
  drivetrain?: string;
  status: "available" | "incoming" | "sold";
  price?: number | null;
  image?: string | null;
};

export type Stat = { label: string; value: number; suffix?: string };

export type SiteSettings = {
  tagline?: string;
  heroImage?: string | null;
  stats: Stat[];
  marquee: string[];
  contact: { email?: string; phone?: string; address?: string };
  socials: { label: string; url: string }[];
};