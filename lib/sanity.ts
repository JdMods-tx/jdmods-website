import { createClient } from "next-sanity";
import { cache } from "react";
import { fallbackSettings, fallbackVehicles } from "./fallback";
import type { SiteSettings, Vehicle } from "./types";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const client = projectId
  ? createClient({ projectId, dataset, apiVersion: "2025-01-01", useCdn: true })
  : null;

async function load<T>(query: string, fallback: T): Promise<T> {
  if (!client) return fallback;
  try {
    const res = await client.fetch<T>(query, {}, { next: { revalidate: 60 } });
    if (res == null || (Array.isArray(res) && res.length === 0)) return fallback;
    return res;
  } catch {
    return fallback;
  }
}

const VEHICLE_FIELDS = `
  _id, title, "slug": slug.current, chassis, year, make, engine, power,
  drivetrain, status, price,
  "image": gallery[0].asset->url + "?w=1400&auto=format"`;

export const getFeaturedVehicles = cache(() =>
  load<Vehicle[]>(
    `*[_type == "vehicle" && featured == true] | order(_createdAt desc)[0...8]{${VEHICLE_FIELDS}}`,
    fallbackVehicles,
  ),
);

export const getSettings = cache(async () => {
  const s = await load<Partial<SiteSettings> | null>(
    `*[_type == "siteSettings"][0]{
      tagline, stats[]{label, value, suffix}, marquee,
      contact, socials[]{label, url}
    }`,
    null,
  );
  return {
    ...fallbackSettings,
    ...(s ?? {}),
    stats: s?.stats?.length ? s.stats : fallbackSettings.stats,
    marquee: s?.marquee?.length ? s.marquee : fallbackSettings.marquee,
    contact: { ...fallbackSettings.contact, ...(s?.contact ?? {}) },
    socials: s?.socials ?? [],
  } as SiteSettings;
});
