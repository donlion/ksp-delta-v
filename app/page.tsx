"use client";

import { useState } from "react";
import DeltaVMap from "@/components/DeltaVMap";
import MissionPanel from "@/components/MissionPanel";

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  const [isReturn, setIsReturn] = useState(false);
  const [fromLKO, setFromLKO] = useState(false);
  const [orbitOnly, setOrbitOnly] = useState(false);
  const [redundancy, setRedundancy] = useState(0);

  return (
    <main className="min-h-screen p-5 md:p-8 flex flex-col gap-8">
      {/* Header */}
      <header>
        <h1 className="text-6xl md:text-7xl font-black text-white tracking-tight leading-none">
          KSP <span className="text-ksp-orange">Δv</span>
        </h1>
        <p className="text-gray-600 text-xs mt-2 uppercase tracking-widest">
          Mission Delta‑V Planner · Kerbal Space Program 1
        </p>
      </header>

      {/* Main layout */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* Delta-V map */}
        <div className="w-full xl:flex-1 bg-ksp-panel border border-ksp-border rounded-xl p-4 overflow-x-auto">
          <DeltaVMap selected={selected} onSelect={setSelected} />
          <p className="text-xs text-gray-700 mt-2 text-center uppercase tracking-wide">
            Δv to reach orbit · click to select
          </p>
          <p className="text-xs text-gray-700 mt-1 text-center xl:hidden">
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
