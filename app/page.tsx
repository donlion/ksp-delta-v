"use client";

import { useState } from "react";
import DestinationList from "@/components/DestinationList";
import MissionPanel from "@/components/MissionPanel";

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  const [isReturn, setIsReturn] = useState(false);

  return (
    <main className="min-h-screen p-6 md:p-10">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          KSP <span className="text-ksp-orange">Δv</span> Planner
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Kerbal Space Program 1 · Mission Delta-V Calculator
        </p>
      </header>

      {/* Main layout */}
      <div className="flex gap-8">
        <DestinationList selected={selected} onSelect={setSelected} />
        <MissionPanel
          destinationId={selected}
          isReturn={isReturn}
          onToggleReturn={() => setIsReturn((v) => !v)}
        />
      </div>
    </main>
  );
}
