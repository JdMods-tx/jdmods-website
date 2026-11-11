"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { Vehicle } from "@/lib/types";

function Card({ v, i }: { v: Vehicle; i: number }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  return (
    <motion.div data-card style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }} className="card-wrap"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
    >
      <Link href={`/inventory/${v.slug}`} className={`vcard ${v.status}`} data-cursor="View">
        <div className="vcard-media">
          {v.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={v.image} alt={v.title} loading="lazy" />
          ) : (
            <div className="vcard-ph"><span>{v.chassis}</span></div>
          )}
          <em className="badge">{v.status === "incoming" ? "Incoming" : v.status === "sold" ? "Sold" : "Available"}</em>
          <b className="idx">{String(i + 1).padStart(2, "0")}</b>
        </div>
        <div className="vcard-body">
          <h3>{v.title}</h3>
          <dl>
            {v.engine && <div><dt>Engine</dt><dd>{v.engine}</dd></div>}
            {v.power && <div><dt>Power</dt><dd>{v.power}</dd></div>}
            {v.drivetrain && <div><dt>Drive</dt><dd>{v.drivetrain}</dd></div>}
            {v.year && <div><dt>Year</dt><dd>{v.year}</dd></div>}
          </dl>
          <span className="vcard-price">{v.price ? `$${v.price.toLocaleString("en-US")}` : "Inquire"} <i>→</i></span>
        </div>
      </Link>
    </motion.div>
  );
}

/** Horizontal showcase. Arrow buttons move through the vehicles. */
export default function Garage({ vehicles }: { vehicles: Vehicle[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [vehicles.length]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.getBoundingClientRect().width + 28 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="garage" className="garage">
      <header className="garage-head">
        <div>
          <p className="eyebrow"><span>02</span> The garage</p>
          <h2>Pick your <em>weapon.</em></h2>
        </div>
        <div className="garage-arrows">
          <button onClick={() => go(-1)} disabled={edge.start} aria-label="Previous vehicle" data-cursor="Prev">←</button>
          <button onClick={() => go(1)} disabled={edge.end} aria-label="Next vehicle" data-cursor="Next">→</button>
        </div>
      </header>
      <div ref={track} className="garage-track" onScroll={update}>
        {vehicles.map((v, i) => <Card key={v._id} v={v} i={i} />)}
        <Link href="/inventory" className="garage-all" data-cursor="All">
          <span>See the full inventory</span><b>→</b>
        </Link>
      </div>
    </section>
  );
}