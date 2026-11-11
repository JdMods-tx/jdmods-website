import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Barlow_Condensed({ weight: ["500", "600", "700"], subsets: ["latin"], variable: "--font-display" });
const body = Barlow({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: { default: "JDMods — Japanese legends. Imported, built, delivered.", template: "%s · JDMods" },
  description: "JDMods is a JDM distributor: legendary Japanese cars and parts, imported and built.",
  icons: { icon: "/jdmods.svg" },
};

export const viewport: Viewport = { themeColor: "#07090d" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}