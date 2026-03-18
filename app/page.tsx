"use client";

import { useState } from "react";
import DeltaVMap from "@/components/DeltaVMap";
import MissionPanel from "@/components/MissionPanel";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  const [isReturn, setIsReturn] = useState(false);
  const [fromLKO, setFromLKO] = useState(false);
  const [orbitOnly, setOrbitOnly] = useState(false);
  const [redundancy, setRedundancy] = useState(0);

  return (
    <main className="min-h-screen p-5 md:p-8 flex flex-col gap-6">
      {/* Header */}
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-6xl md:text-7xl font-black text-void-text tracking-tight leading-none">
            KSP <span style={{ color: "var(--c-hal)" }}>Δv</span>
          </h1>
          <p className="text-void-text3 text-xs mt-2 uppercase tracking-widest font-mono">
            Mission Delta‑V Planner · Kerbal Space Program 1
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* Separator */}
      <div className="h-px w-full" style={{ background: "var(--c-border)" }} />

      {/* Main layout */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* Delta-V map */}
        <div
          className="w-full xl:flex-1 rounded-xl p-4 overflow-x-auto"
          style={{
            background: "var(--c-surface)",
            border: "1px solid var(--c-border)",
          }}
        >
          <DeltaVMap selected={selected} onSelect={setSelected} />
          <p className="text-xs text-void-text3 mt-2 text-center uppercase tracking-wide font-mono">
            Δv to reach orbit · click to select
          </p>
          <p className="text-xs text-void-text3 mt-1 text-center xl:hidden font-mono">
            ← scroll to explore →
          </p>
        </div>

        {/* Mission panel */}
        <div className="w-full xl:w-96 flex-shrink-0">
          <MissionPanel
            destinationId={selected}
            isReturn={isReturn}
            onToggleReturn={() => setIsReturn((v) => !v)}
            fromLKO={fromLKO}
            onToggleFromLKO={() => setFromLKO((v) => !v)}
            orbitOnly={orbitOnly}
            onToggleOrbitOnly={() => setOrbitOnly((v) => !v)}
            redundancy={redundancy}
            onRedundancyChange={setRedundancy}
          />
        </div>
      </div>
    </main>
  );
}
