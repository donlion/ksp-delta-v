"use client";

import { useState } from "react";
import DeltaVMap from "@/components/DeltaVMap";
import MissionPanel from "@/components/MissionPanel";

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  const [isReturn, setIsReturn] = useState(false);
  const [fromLKO, setFromLKO] = useState(false);

  return (
    <main className="min-h-screen p-5 md:p-8 flex flex-col gap-6">
      {/* Header */}
      <header>
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          KSP <span className="text-ksp-orange">Δv</span> Planner
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Kerbal Space Program 1 · Click a body to plan your mission
        </p>
      </header>

      {/* Main layout: map + panel */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* Delta-V map */}
        <div className="w-full xl:flex-1 bg-ksp-panel border border-ksp-border rounded-xl p-4">
          <DeltaVMap selected={selected} onSelect={setSelected} />
          <p className="text-xs text-gray-600 mt-2 text-center">
            Numbers show Δv (m/s) to reach orbit at each body · Click to select
          </p>
        </div>

        {/* Mission panel */}
        <div className="w-full xl:w-80 flex-shrink-0">
          <MissionPanel
            destinationId={selected}
            isReturn={isReturn}
            onToggleReturn={() => setIsReturn((v) => !v)}
            fromLKO={fromLKO}
            onToggleFromLKO={() => setFromLKO((v) => !v)}
          />
        </div>
      </div>
    </main>
  );
}
