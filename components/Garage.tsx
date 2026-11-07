"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import type { Vehicle } from "@/lib/types";

function Card({ v, i }: { v: Vehicle; i: number }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  return (
    <motion.div style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }} className="card-wrap"
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

/** Pinned section: vertical scroll drives a horizontal ride through the garage. */
export default function Garage({ vehicles }: { vehicles: Vehicle[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [vehicles.length]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={section} className="garage" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="garage-pin">
        <header className="garage-head">
          <p className="eyebrow"><span>02</span> The garage</p>
          <h2>Pick your <em>weapon.</em></h2>
        </header>
        <motion.div ref={track} className="garage-track" style={{ x }}>
          {vehicles.map((v, i) => <Card key={v._id} v={v} i={i} />)}
          <Link href="/inventory" className="garage-all" data-cursor="All">
            <span>See the full inventory</span><b>→</b>
          </Link>
        </motion.div>
        <div className="garage-progress"><motion.i style={{ scaleX: bar }} /></div>
      </div>
    </section>
  );
}
