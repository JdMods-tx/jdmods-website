import type { SiteSettings, Vehicle } from "./types";

/**
 * PLACEHOLDER CONTENT. Shown only until real documents exist in Sanity
 * (or until NEXT_PUBLIC_SANITY_PROJECT_ID is set). Replace everything here
 * by creating content in the Studio at /studio.
 */
export const fallbackVehicles: Vehicle[] = [
  { _id: "f1", title: "Nissan Silvia Spec-R", slug: "silvia-s15", chassis: "S15", year: 2000, make: "Nissan", engine: "SR20DET", power: "250 PS", drivetrain: "FR", status: "available", price: null },
  { _id: "f2", title: "Toyota Supra RZ", slug: "supra-a80", chassis: "JZA80", year: 1997, make: "Toyota", engine: "2JZ-GTE", power: "280 PS", drivetrain: "FR", status: "incoming", price: null },
  { _id: "f3", title: "Nissan Skyline GT-R", slug: "skyline-r34", chassis: "BNR34", year: 1999, make: "Nissan", engine: "RB26DETT", power: "280 PS", drivetrain: "AWD", status: "available", price: null },
  { _id: "f4", title: "Mazda RX-7 Type RS", slug: "rx7-fd3s", chassis: "FD3S", year: 1998, make: "Mazda", engine: "13B-REW", power: "255 PS", drivetrain: "FR", status: "incoming", price: null },
  { _id: "f5", title: "Honda NSX", slug: "nsx-na1", chassis: "NA1", year: 1996, make: "Honda", engine: "C30A", power: "280 PS", drivetrain: "MR", status: "available", price: null },
  { _id: "f6", title: "Toyota Sprinter Trueno", slug: "trueno-ae86", chassis: "AE86", year: 1985, make: "Toyota", engine: "4A-GE", power: "130 PS", drivetrain: "FR", status: "sold", price: null },
];

export const fallbackSettings: SiteSettings = {
  tagline: "Japanese legends. Imported, built, delivered.",
  stats: [
    { label: "Chassis imported", value: 120, suffix: "+" },
    { label: "Builds completed", value: 45, suffix: "" },
    { label: "Auction houses sourced", value: 8, suffix: "" },
    { label: "Horsepower we can't shut up about", value: 1000, suffix: "+" },
  ],
  marquee: ["S15", "JZA80", "BNR34", "FD3S", "NA1", "AE86", "EK9", "CT9A", "Z33", "GC8", "R32", "DC2"],
  contact: { email: "jdmods.tx@gmail.com" },
  socials: [],
};
