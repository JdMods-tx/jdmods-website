"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Vehicle } from "@/lib/types";
import VehicleCard from "./VehicleCard";

type Status = "all" | Vehicle["status"];

const STATUSES: { key: Status; label: string }[] = [
  { key: "all", label: "All" },
  { key: "available", label: "Available" },
  { key: "incoming", label: "Incoming" },
  { key: "sold", label: "Sold" },
];

export default function InventoryGrid({ vehicles }: { vehicles: Vehicle[] }) {
  const [status, setStatus] = useState<Status>("all");
  const [make, setMake] = useState("all");
  const [query, setQuery] = useState("");

  const makes = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.make).filter((m): m is string => Boolean(m)))).sort(),
    [vehicles],
  );

  const counts = useMemo(() => {
    const c: Record<Status, number> = { all: vehicles.length, available: 0, incoming: 0, sold: 0 };
    for (const v of vehicles) c[v.status] += 1;
    return c;
  }, [vehicles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vehicles.filter((v) => {
      if (status !== "all" && v.status !== status) return false;
      if (make !== "all" && v.make !== make) return false;
      if (!q) return true;
      return [v.title, v.chassis, v.make, v.engine].some((f) => f?.toLowerCase().includes(q));
    });
  }, [vehicles, status, make, query]);

  const reset = () => {
    setStatus("all");
    setMake("all");
    setQuery("");
  };

  return (
    <section className="inv">
      <div className="inv-bar">
        <div className="inv-tabs">
          {STATUSES.map((s) => (
            <button key={s.key} onClick={() => setStatus(s.key)} aria-pressed={status === s.key} data-cursor="Filter">
              {s.label}
              <small>{counts[s.key]}</small>
            </button>
          ))}
        </div>
        <input
          className="inv-search"
          type="search"
          placeholder="Search chassis, model, engine"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search inventory"
        />
      </div>

      {makes.length > 1 && (
        <div className="inv-chips">
          <button onClick={() => setMake("all")} aria-pressed={make === "all"} data-cursor="Filter">All makes</button>
          {makes.map((m) => (
            <button key={m} onClick={() => setMake(m)} aria-pressed={make === m} data-cursor="Filter">{m}</button>
          ))}
        </div>
      )}

      <p className="inv-count" aria-live="polite">
        Showing {filtered.length} of {vehicles.length}
      </p>

      <div className="inv-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((v, i) => (
            <motion.div
              key={v._id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <VehicleCard v={v} i={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="inv-empty">
          <p>No vehicles match those filters.</p>
          <button onClick={reset}>Clear filters</button>
        </div>
      )}
    </section>
  );
}