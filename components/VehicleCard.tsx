"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { Vehicle } from "@/lib/types";

export default function VehicleCard({ v, i }: { v: Vehicle; i: number }) {
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