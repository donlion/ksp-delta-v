"use client";

import { useEffect, useState } from "react";
import DeltaVMap from "@/components/DeltaVMap";
import BodyList from "@/components/BodyList";
import MissionPanel from "@/components/MissionPanel";
import ThemeToggle from "@/components/ThemeToggle";
import { DESTINATIONS } from "@/lib/deltav-data";

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
  const [mapView, setMapView] = useState<"map" | "list">("map");
  const [isReturn, setIsReturn] = useState(false);
  const [fromLKO, setFromLKO] = useState(false);
  const [orbitOnly, setOrbitOnly] = useState(false);
  const [redundancy, setRedundancy] = useState(0);

  // ── Read URL params on mount ───────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const d = params.get("d");
    if (d && DESTINATIONS.find((dest) => dest.id === d)) setSelected(d);
    if (params.get("r") === "1") setIsReturn(true);
    if (params.get("lko") === "1") setFromLKO(true);
    if (params.get("orb") === "1") setOrbitOnly(true);
    const margin = params.get("margin");
    if (margin) setRedundancy(Math.min(50, Math.max(0, Number(margin))));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Sync state → URL ──────────────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams();
    if (selected) params.set("d", selected);
    if (isReturn) params.set("r", "1");
    if (fromLKO) params.set("lko", "1");
    if (orbitOnly) params.set("orb", "1");
    if (redundancy > 0) params.set("margin", String(redundancy));
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [selected, isReturn, fromLKO, orbitOnly, redundancy]);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    const ids = DESTINATIONS.map((d) => d.id);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((prev) => {
          const idx = prev ? ids.indexOf(prev) : -1;
          return ids[(idx + 1) % ids.length];
        });
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((prev) => {
          const idx = prev ? ids.indexOf(prev) : 0;
          return ids[(idx - 1 + ids.length) % ids.length];
        });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

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
              <span className="flex items-center gap-3">
                {/* View toggle */}
                <span className="flex items-center gap-0" style={{ border: "1px solid var(--c-border)", borderRadius: 3, overflow: "hidden" }}>
                  {(["map", "list"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setMapView(v)}
                      className="text-xs font-mono uppercase tracking-widest px-2 py-0.5 transition-colors cursor-pointer"
                      style={{
                        background: mapView === v ? "var(--c-border)" : "transparent",
                        color: mapView === v ? "var(--c-text)" : "var(--c-text3)",
                        border: "none",
                      }}
                    >
                      {v}
                    </button>
                  ))}
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
              </span>
            </div>

            {/* Map / List area */}
            <div
              className="p-4 overflow-x-auto"
              style={{
                position: "relative",
                background: "var(--c-surface)",
                borderLeft:   "1px solid var(--c-border)",
                borderRight:  "1px solid var(--c-border)",
                borderBottom: "1px solid var(--c-border)",
              }}
            >
              {mapView === "map" ? (
                <>
                  <DeltaVMap selected={selected} onSelect={setSelected} />
                  {/* CRT vignette */}
                  <div
                    className="map-vignette"
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      background: "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.72) 100%)",
                      zIndex: 5,
                    }}
                  />
                  <p className="text-xs mt-2 text-center font-mono uppercase tracking-widest" style={{ color: "var(--c-text3)" }}>
                    [ Δv to reach orbit · click body to select · ← → to navigate ]
                  </p>
                  <p className="text-xs mt-1 text-center font-mono xl:hidden" style={{ color: "var(--c-text3)" }}>
                    [ Scroll to explore system ]
                  </p>
                </>
              ) : (
                <BodyList selected={selected} onSelect={setSelected} />
              )}
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
