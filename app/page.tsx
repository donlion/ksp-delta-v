"use client";

import { useState } from "react";
import DeltaVMap from "@/components/DeltaVMap";
import MissionPanel from "@/components/MissionPanel";
import ThemeToggle from "@/components/ThemeToggle";

/** Four L-shaped corner brackets in HAL red */
function CornerBrackets() {
  const size = 10;
  const thick = 1.5;
  const color = "var(--c-hal)";
  const opacity = 0.5;
  const corners = [
    { top: 0, left: 0,  borderTop: thick, borderLeft:  thick },
    { top: 0, right: 0, borderTop: thick, borderRight: thick },
    { bottom: 0, left: 0,  borderBottom: thick, borderLeft:  thick },
    { bottom: 0, right: 0, borderBottom: thick, borderRight: thick },
  ] as const;

  return (
    <>
      {corners.map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: size,
            height: size,
            opacity,
            borderColor: color,
            borderStyle: "solid",
            borderTopWidth:    "top"    in pos ? pos.borderTop    : 0,
            borderBottomWidth: "bottom" in pos ? pos.borderBottom : 0,
            borderLeftWidth:   "left"   in pos ? pos.borderLeft   : 0,
            borderRightWidth:  "right"  in pos ? pos.borderRight  : 0,
            ...(("top"    in pos) ? { top:    -1 } : {}),
            ...(("bottom" in pos) ? { bottom: -1 } : {}),
            ...(("left"   in pos) ? { left:   -1 } : {}),
            ...(("right"  in pos) ? { right:  -1 } : {}),
          }}
        />
      ))}
    </>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  const [isReturn, setIsReturn] = useState(false);
  const [fromLKO, setFromLKO] = useState(false);
  const [orbitOnly, setOrbitOnly] = useState(false);
  const [redundancy, setRedundancy] = useState(0);

  return (
    <>
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
          {/* Delta-V map — terminal bezel */}
          <div className="w-full xl:flex-1 relative" style={{ position: "relative" }}>
            <CornerBrackets />

            {/* Terminal header strip */}
            <div
              className="flex items-center justify-between px-3 py-1.5"
              style={{
                background: "var(--c-surface)",
                borderLeft:  "1px solid var(--c-border)",
                borderRight: "1px solid var(--c-border)",
                borderTop:   "1px solid var(--c-border)",
              }}
            >
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--c-text3)" }}>
                Navigation Computer · Kerbol System
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: "#3a9a50", boxShadow: "0 0 4px 1px rgba(58,154,80,0.5)" }}
                />
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "#3a9a50" }}>
                  Online
                </span>
              </span>
            </div>

            {/* Map area */}
            <div
              className="p-4 overflow-x-auto"
              style={{
                background: "var(--c-surface)",
                borderLeft:   "1px solid var(--c-border)",
                borderRight:  "1px solid var(--c-border)",
                borderBottom: "1px solid var(--c-border)",
              }}
            >
              <DeltaVMap selected={selected} onSelect={setSelected} />
              <p className="text-xs mt-2 text-center font-mono uppercase tracking-widest" style={{ color: "var(--c-text3)" }}>
                [ Δv to reach orbit · click body to select ]
              </p>
              <p className="text-xs mt-1 text-center font-mono xl:hidden" style={{ color: "var(--c-text3)" }}>
                [ Scroll to explore system ]
              </p>
            </div>
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
    </>
  );
}
