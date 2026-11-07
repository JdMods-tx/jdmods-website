"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

/** Radial "warp" streaks behind the hero. Speed follows the rpm value. */
export default function SpeedLines({ rpm }: { rpm: MotionValue<number> }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const lines = Array.from({ length: 80 }, (_, i) => ({
      a: Math.random() * Math.PI * 2,
      r: Math.random(),
      s: 0.4 + Math.random() * 0.9,
      red: i % 4 === 0,
    }));

    const frame = () => {
      const v = rpm.get();
      ctx.clearRect(0, 0, w, h);
      const cx = w > 900 ? w * 0.7 : w * 0.5;
      const cy = h * 0.5;
      const max = Math.hypot(w, h) * 0.6;
      for (const l of lines) {
        l.r += (0.0015 + v * 0.0055) * l.s;
        if (l.r > 1) { l.r = 0.02; l.a = Math.random() * Math.PI * 2; }
        const len = 0.02 + v * 0.03;
        const r0 = Math.max(0, l.r - len) * max;
        const r1 = l.r * max;
        ctx.strokeStyle = l.red ? `rgba(214,11,30,${0.15 + l.r * 0.6})` : `rgba(255,255,255,${0.05 + l.r * 0.25})`;
        ctx.lineWidth = 1 + l.r * 1.5;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(l.a) * r0, cy + Math.sin(l.a) * r0);
        ctx.lineTo(cx + Math.cos(l.a) * r1, cy + Math.sin(l.a) * r1);
        ctx.stroke();
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [rpm]);

  return <canvas ref={ref} className="speedlines" aria-hidden />;
}
