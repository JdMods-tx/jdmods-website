"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cta() {
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 12 });
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 12 });

  return (
    <section className="cta">
      <p className="eyebrow"><span>04</span> Your move</p>
      <h2>Your chassis<br />is <em>waiting.</em></h2>
      <motion.div
        style={{ x, y }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
          y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className="magnet"
      >
        <Link href="/contact" className="cta-btn" data-cursor="Go">Start an inquiry</Link>
      </motion.div>
    </section>
  );
}
