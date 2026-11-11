"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { href: "/inventory", label: "Inventory" },
  { href: "/import", label: "Import" },
  { href: "/parts", label: "Parts" },
  { href: "/builds", label: "Builds" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`nav ${solid ? "solid" : ""}`}>
      <Link href="/" className="brand" data-cursor="Home" aria-label="JDMods home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/jdmods.svg" alt="" />
        <span>JD<b>Mods</b></span>
      </Link>
      <nav className="nav-links" aria-label="Primary">
        {LINKS.map((l, i) => (
          <Link key={l.href} href={l.href} className={path.startsWith(l.href) ? "active" : ""}>
            <small>{String(i + 1).padStart(2, "0")}</small>{l.label}
          </Link>
        ))}
        <Link href="/contact" className="nav-cta" data-cursor="Talk">Contact</Link>
      </nav>
      <button className="burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
        <i /><i />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="sheet" initial={{ clipPath: "circle(0% at 95% 5%)" }} animate={{ clipPath: "circle(150% at 95% 5%)" }} exit={{ clipPath: "circle(0% at 95% 5%)" }} transition={{ duration: 0.5 }}>
            {[...LINKS, { href: "/contact", label: "Contact" }].map((l, i) => (
              <Link key={l.href} href={l.href}><small>{String(i + 1).padStart(2, "0")}</small>{l.label}</Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
