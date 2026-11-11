"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import type { Stat } from "@/lib/types";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: [0.2, 0.8, 0.2, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{n.toLocaleString("en-US")}{suffix}</span>;
}

export default function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section id="stats" className="stats">
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <strong><Counter to={s.value} suffix={s.suffix} /></strong>
          <span>{s.label}</span>
        </div>
      ))}
    </section>
  );
}
