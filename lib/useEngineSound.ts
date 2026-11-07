"use client";

import { useEffect, useState } from "react";
import type { MotionValue } from "framer-motion";

/** Synthesised engine note (no audio files). Opt-in, tied to the rpm value. */
export function useEngineSound(rpm: MotionValue<number>) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!on) return;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const c = new AC();
    c.resume();
    const saw = c.createOscillator();
    const sub = c.createOscillator();
    saw.type = "sawtooth";
    sub.type = "square";
    const filter = c.createBiquadFilter();
    filter.type = "lowpass";
    const gain = c.createGain();
    gain.gain.value = 0;
    saw.connect(filter);
    sub.connect(filter);
    filter.connect(gain);
    gain.connect(c.destination);
    saw.start();
    sub.start();

    const update = (v: number) => {
      const t = c.currentTime;
      const hz = 35 + v * 24;
      saw.frequency.setTargetAtTime(hz, t, 0.05);
      sub.frequency.setTargetAtTime(hz * 0.5, t, 0.05);
      filter.frequency.setTargetAtTime(300 + v * 260, t, 0.05);
      gain.gain.setTargetAtTime(0.04 + v * 0.012, t, 0.08);
    };
    update(rpm.get());
    const unsub = rpm.on("change", update);

    return () => {
      unsub();
      gain.gain.setTargetAtTime(0, c.currentTime, 0.05);
      setTimeout(() => c.close(), 250);
    };
  }, [on, rpm]);

  return { on, toggle: () => setOn((o) => !o) };
}
