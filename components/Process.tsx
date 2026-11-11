"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const STAGES = [
  { k: "Source", t: "We find it", d: "Auction sheets, inspection grades and chassis history, read by people who actually know the platform." },
  { k: "Import", t: "We bring it home", d: "Shipping, customs and compliance handled end to end, with updates at every checkpoint." },
  { k: "Prep", t: "We make it right", d: "Inspection, servicing and the mods you want, done in-house before the keys change hands." },
  { k: "Deliver", t: "You drive it", d: "Titled, ready and waiting. The only thing left is the first pull." },
];

function Stage({ s, i }: { s: (typeof STAGES)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { margin: "-45% 0px -45% 0px" });
  return (
    <div ref={ref} className={`stage ${on ? "on" : ""}`}>
      <span className="stage-n">Stage {String(i + 1).padStart(2, "0")} / 04</span>
      <h3><small>{s.k}</small>{s.t}</h3>
      <p>{s.d}</p>
    </div>
  );
}

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const pct = useTransform(scrollYProgress, (v) => `${Math.round(Math.min(1, Math.max(0, v)) * 100)}%`);

  return (
    <section id="process" ref={ref} className="process">
      <div className="process-side">
        <p className="eyebrow"><span>03</span> The process</p>
        <h2>From Japan to <em>your driveway.</em></h2>
        <div className="process-meter">
          <motion.i style={{ scaleY: scrollYProgress }} />
          <motion.span>{pct}</motion.span>
        </div>
      </div>
      <div className="process-list">
        {STAGES.map((s, i) => <Stage key={s.k} s={s} i={i} />)}
      </div>
    </section>
  );
}
