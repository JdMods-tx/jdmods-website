"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Vehicle } from "@/lib/types";
import VehicleCard from "./VehicleCard";

/** Horizontal showcase. Arrow buttons move through the vehicles. */
export default function Garage({ vehicles }: { vehicles: Vehicle[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [vehicles.length]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.getBoundingClientRect().width + 28 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="garage" className="garage">
      <header className="garage-head">
        <div>
          <p className="eyebrow"><span>02</span> The garage</p>
          <h2>Pick your <em>weapon.</em></h2>
        </div>
        <div className="garage-arrows">
          <button onClick={() => go(-1)} disabled={edge.start} aria-label="Previous vehicle" data-cursor="Prev">←</button>
          <button onClick={() => go(1)} disabled={edge.end} aria-label="Next vehicle" data-cursor="Next">→</button>
        </div>
      </header>
      <div ref={track} className="garage-track" onScroll={update}>
        {vehicles.map((v, i) => <VehicleCard key={v._id} v={v} i={i} />)}
        <Link href="/inventory" className="garage-all" data-cursor="All">
          <span>See the full inventory</span><b>→</b>
        </Link>
      </div>
    </section>
  );
}