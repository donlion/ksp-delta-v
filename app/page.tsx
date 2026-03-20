"use client";

import { useEffect, useState } from "react";
import DeltaVMap from "@/components/DeltaVMap";
import BodyList from "@/components/BodyList";
import MissionPanel from "@/components/MissionPanel";
import ThemeToggle from "@/components/ThemeToggle";
import SettingsToggle from "@/components/SettingsToggle";
import { DESTINATIONS } from "@/lib/deltav-data";
import type { ScaleMode } from "@/lib/deltav-data";

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
  const [originId, setOriginId] = useState<string | null>(null);
  const [mapView, setMapView] = useState<"map" | "list">("map");
  const [isReturn, setIsReturn] = useState(false);
  const [fromLKO, setFromLKO] = useState(false);
  const [orbitOnly, setOrbitOnly] = useState(false);
  const [redundancy, setRedundancy] = useState(0);
  const [scaleMode, setScaleMode] = useState<ScaleMode>("stock");
  const [rescale, setRescale] = useState(1);

  const activeDestinations = DESTINATIONS.filter((d) => {
    if (scaleMode === "stock")   return !d.opmOnly && !d.rssOnly && !d.quarterScaleOnly;
    if (scaleMode === "opm")     return !d.stockOnly && !d.rssOnly && !d.quarterScaleOnly;
    if (scaleMode === "rss")     return d.rssOnly === true;
    if (scaleMode === "quarter") return d.quarterScaleOnly === true;
    return false;
  });

  function handleRescaleChange(v: number) {
    setRescale(v);
    if (v === 1) localStorage.removeItem("ksp-rescale");
    else localStorage.setItem("ksp-rescale", String(v));
  }

  function handleScaleChange(mode: ScaleMode) {
    const prev = scaleMode;
    setScaleMode(mode);
    localStorage.setItem("ksp-scale", mode);

    // Swap Eeloo between stock and OPM versions seamlessly
    if (mode === "opm" && selected === "eeloo") setSelected("eeloo-opm");
    if (mode !== "opm" && selected === "eeloo-opm") setSelected("eeloo");
    if (mode === "opm" && originId === "eeloo") setOriginId("eeloo-opm");
    if (mode !== "opm" && originId === "eeloo-opm") setOriginId("eeloo");

    // Clear selection when switching away from a mode-specific destination
    if (mode !== prev) {
      const dest = DESTINATIONS.find((d) => d.id === selected);
      if (dest && (dest.opmOnly || dest.rssOnly || dest.quarterScaleOnly)) setSelected(null);
      const orig = DESTINATIONS.find((d) => d.id === originId);
      if (orig && (orig.opmOnly || orig.rssOnly || orig.quarterScaleOnly)) setOriginId(null);
    }
  }

  // ── Read URL params + localStorage on mount ────────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem("ksp-scale") as ScaleMode | null;
    const mode: ScaleMode = stored && ["stock", "opm", "quarter", "rss"].includes(stored) ? stored : "stock";
    if (mode !== "stock") setScaleMode(mode);

    const storedRescale = localStorage.getItem("ksp-rescale");
    if (storedRescale) {
      const r = parseFloat(storedRescale);
      if (!isNaN(r) && r >= 1) setRescale(r);
    }

    const params = new URLSearchParams(window.location.search);
    const d = params.get("d");
    if (d && DESTINATIONS.find((dest) => dest.id === d)) {
      setSelected(d);
    }
    const o = params.get("o");
    if (o && o !== "kerbin" && DESTINATIONS.find((dest) => dest.id === o)) {
      setOriginId(o);
    }
    if (params.get("r") === "1") setIsReturn(true);
    if (params.get("lko") === "1") setFromLKO(true);
    if (params.get("orb") === "1") setOrbitOnly(true);
    const margin = params.get("margin");
    if (margin) setRedundancy(Math.min(50, Math.max(0, Number(margin))));
    const scaleParam = params.get("scale");
    if (scaleParam) {
      const r = parseFloat(scaleParam);
      if (!isNaN(r) && r >= 1) setRescale(r);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Sync state → URL ──────────────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams();
    if (selected) params.set("d", selected);
    if (originId) params.set("o", originId);
    if (isReturn) params.set("r", "1");
    if (fromLKO) params.set("lko", "1");
    if (orbitOnly) params.set("orb", "1");
    if (redundancy > 0) params.set("margin", String(redundancy));
    if (rescale !== 1) params.set("scale", String(rescale));
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [selected, originId, isReturn, fromLKO, orbitOnly, redundancy, rescale]);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    const ids = activeDestinations.map((d) => d.id);
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
  }, [activeDestinations]); // eslint-disable-line react-hooks/exhaustive-deps

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
              <span className="sm:hidden">Δv Planner · KSP 1</span>
              <span className="hidden sm:inline">Mission Delta‑V Planner · Kerbal Space Program 1</span>
            </p>
          </div>
          <div className="flex items-start gap-2">
            <SettingsToggle scaleMode={scaleMode} onScaleChange={handleScaleChange} rescale={rescale} onRescaleChange={handleRescaleChange} />
            <ThemeToggle />
          </div>
        </header>

        {/* Separator */}
        <div className="h-px w-full" style={{ background: "var(--c-border)" }} />

        {/* Main layout */}
        <div className="flex flex-col xl:flex-row gap-6 items-start">
          {/* Delta-V map — terminal bezel */}
          <div data-panel="map" className="w-full xl:flex-1 relative" style={{ position: "relative" }}>
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
                  <DeltaVMap selected={selected} onSelect={setSelected} scaleMode={scaleMode} rescale={rescale} />
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
                <BodyList selected={selected} onSelect={setSelected} scaleMode={scaleMode} />
              )}
            </div>
          </div>

          {/* Mission panel */}
          <div className="w-full xl:w-96 flex-shrink-0">
            <MissionPanel
              destinationId={selected}
              originId={originId}
              onSetOrigin={setOriginId}
              isReturn={isReturn}
              onToggleReturn={() => setIsReturn((v) => !v)}
              fromLKO={fromLKO}
              onToggleFromLKO={() => setFromLKO((v) => !v)}
              orbitOnly={orbitOnly}
              onToggleOrbitOnly={() => setOrbitOnly((v) => !v)}
              redundancy={redundancy}
              onRedundancyChange={setRedundancy}
              rescale={rescale}
            />
          </div>
        </div>
      </main>
      <footer className="text-center py-4 flex items-center justify-center gap-4 font-mono text-xs uppercase tracking-widest" style={{ color: "var(--c-text3)" }}>
        <a
          href="https://github.com/donlion/ksp-delta-v"
          target="_blank"
          rel="noopener noreferrer"
          title="View source on GitHub"
          className="transition-colors hover:text-[var(--c-text)]"
          style={{ color: "var(--c-text3)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-label="GitHub">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
        <span>MORE BOOSTERS.</span>
      </footer>
    </>
  );
}
