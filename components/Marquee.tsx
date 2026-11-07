"use client";

import { useRef } from "react";
import {
  motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** Chassis-code ticker. Speeds up (and reverses) with scroll velocity. */
export default function Marquee({ items }: { items: string[] }) {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    const b = boost.get();
    if (b < -0.05) dir.current = -1;
    else if (b > 0.05) dir.current = 1;
    const move = dir.current * -3 * (delta / 1000) * (1 + Math.abs(b));
    base.set(wrap(-50, 0, base.get() + move));
  });
  const x = useTransform(base, (v) => `${v}%`);

  const row = (k: string) => (
    <div className="marquee-row" key={k} aria-hidden={k === "b"}>
      {items.map((t, i) => (
        <span key={t + i}>
          {t}<i>✦</i>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" aria-label={items.join(", ")}>
      <motion.div className="marquee-track" style={{ x }}>
        {row("a")}
        {row("b")}
      </motion.div>
    </div>
  );
}
