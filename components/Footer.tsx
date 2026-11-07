import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

export default function Footer({ settings }: { settings: SiteSettings }) {
  const { contact, socials } = settings;
  return (
    <footer className="footer">
      <div className="footer-big" aria-hidden>JDMODS</div>
      <div className="footer-cols">
        <div>
          <h4>Contact</h4>
          {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
          {contact.phone && <a href={`tel:${contact.phone}`}>{contact.phone}</a>}
          {contact.address && <p>{contact.address}</p>}
        </div>
        <div>
          <h4>Index</h4>
          <Link href="/inventory">Inventory</Link>
          <Link href="/import">Import</Link>
          <Link href="/parts">Parts</Link>
          <Link href="/builds">Builds</Link>
          <Link href="/about">About</Link>
        </div>
        {socials.length > 0 && (
          <div>
            <h4>Elsewhere</h4>
            {socials.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a>
            ))}
          </div>
        )}
      </div>
      <p className="footer-fine">© {new Date().getFullYear()} JDMods. All rights reserved.</p>
    </footer>
  );
}
