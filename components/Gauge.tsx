"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

const R = 150;
const pt = (v: number, r: number) => {
  const a = ((-120 + (v / 9) * 240) * Math.PI) / 180;
  return [200 + r * Math.sin(a), 200 - r * Math.cos(a)];
};
const arc = (v0: number, v1: number, r: number) => {
  const [x0, y0] = pt(v0, r);
  const [x1, y1] = pt(v1, r);
  const large = ((v1 - v0) / 9) * 240 > 180 ? 1 : 0;
  return `M${x0} ${y0} A${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
};

export default function Gauge({ rpm }: { rpm: MotionValue<number> }) {
  const rotate = useTransform(rpm, [0, 9], [-120, 120]);
  const fill = useTransform(rpm, [0, 9], [0, 1]);
  const readout = useTransform(rpm, (v) => v.toFixed(1));

  return (
    <div className="gauge" aria-hidden>
      <svg viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="192" className="gauge-bezel" />
        <path d={arc(0, 9, R)} className="gauge-track" />
        <path d={arc(7, 9, R)} className="gauge-redzone" />
        <motion.path d={arc(0, 9, R)} className="gauge-fill" style={{ pathLength: fill }} />
        {Array.from({ length: 19 }, (_, i) => {
          const v = i / 2;
          const major = i % 2 === 0;
          const [x0, y0] = pt(v, R - (major ? 22 : 12));
          const [x1, y1] = pt(v, R - 2);
          return (
            <line key={i} x1={x0} y1={y0} x2={x1} y2={y1}
              className={`tick ${major ? "major" : ""} ${v >= 7 ? "red" : ""}`} />
          );
        })}
        {Array.from({ length: 10 }, (_, v) => {
          const [x, y] = pt(v, R - 42);
          return (
            <text key={v} x={x} y={y} className={`tick-label ${v >= 7 ? "red" : ""}`}
              textAnchor="middle" dominantBaseline="central">{v}</text>
          );
        })}
      </svg>
      <motion.div className="needle" style={{ rotate }}>
        <svg viewBox="0 0 400 400">
          <polygon points="196,200 204,200 200,52" className="needle-blade" />
        </svg>
      </motion.div>
      <div className="gauge-hub" />
      <div className="gauge-readout">
        <motion.span>{readout}</motion.span>
        <small>×1000 r/min</small>
      </div>
    </div>
  );
}
