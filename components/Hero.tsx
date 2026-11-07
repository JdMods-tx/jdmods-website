"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform,
} from "framer-motion";
import Gauge from "./Gauge";
import SpeedLines from "./SpeedLines";
import { useEngineSound } from "@/lib/useEngineSound";

const LINES = ["Feel it", "before you", "see it."];

export default function Hero({ tagline }: { tagline?: string }) {
  const rpm = useMotionValue(1);
  const spring = useSpring(rpm, { stiffness: 70, damping: 12, mass: 0.8 });
  const held = useRef(false);
  const [pressed, setPressed] = useState(false);
  const [red, setRed] = useState(false);
  const sound = useEngineSound(spring);

  const root = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // idle flutter
  useEffect(() => {
    const id = setInterval(() => {
      if (!held.current) rpm.set(1 + Math.random() * 0.25);
    }, 140);
    return () => clearInterval(id);
  }, [rpm]);

  useEffect(
    () => spring.on("change", (v) => setRed((r) => (v > 7.4 === r ? r : v > 7.4))),
    [spring],
  );

  const press = () => { held.current = true; setPressed(true); rpm.set(9); };
  const release = () => { held.current = false; setPressed(false); rpm.set(1.2); };

  return (
    <section ref={root} className={`hero ${red ? "is-red" : ""}`}>
      <SpeedLines rpm={spring} />
      <div className="hero-flash" />

      <motion.div className="hero-copy" style={{ y, opacity: fade }}>
        <p className="eyebrow"><span>01</span> JDMods · Japanese Domestic Market</p>
        <h1 className="hero-title" aria-label="Feel it before you see it.">
          {LINES.map((l, i) => (
            <span className="line" key={l}>
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          {tagline}
        </motion.p>
        <motion.div className="hero-cta" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          <Link href="/inventory" className="btn btn-red" data-cursor="Garage">Enter the garage →</Link>
          <Link href="/import" className="btn btn-ghost" data-cursor="Import">How importing works</Link>
        </motion.div>
      </motion.div>

      <div className="hero-stage">
        <button
          className={`gauge-btn ${pressed ? "down" : ""}`}
          onPointerDown={press}
          onPointerUp={release}
          onPointerLeave={() => held.current && release()}
          onPointerCancel={release}
          onKeyDown={(e) => { if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); press(); } }}
          onKeyUp={(e) => { if (e.key === " " || e.key === "Enter") release(); }}
          onContextMenu={(e) => e.preventDefault()}
          data-cursor="Hold"
          aria-label="Hold to rev the engine"
        >
          <Gauge rpm={spring} />
        </button>
        <p className="hold-hint">{pressed ? "Keep holding…" : "Press & hold to rev"}</p>
        <AnimatePresence>
          {red && (
            <motion.div className="redline" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              REDLINE
            </motion.div>
          )}
        </AnimatePresence>
        <button className="sound-btn" onClick={sound.toggle} aria-pressed={sound.on}>
          Sound {sound.on ? "on" : "off"}
        </button>
      </div>

      <div className="scroll-cue" aria-hidden><span />Scroll</div>
    </section>
  );
}
