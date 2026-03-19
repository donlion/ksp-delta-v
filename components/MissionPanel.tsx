"use client";

import { useEffect, useRef, useState } from "react";
import {
  DESTINATIONS,
  BODY_COLORS,
  DIFFICULTY_COLORS,
  buildReturnLegs,
  KERBIN_GRAVITY,
  type Leg,
} from "@/lib/deltav-data";
import {
  DESTINATION_TIPS,
  TIP_CATEGORY_LABELS,
  type TipCategory,
} from "@/lib/destination-tips";

interface Props {
  destinationId: string | null;
  isReturn: boolean;
  onToggleReturn: () => void;
  fromLKO: boolean;
  onToggleFromLKO: () => void;
  orbitOnly: boolean;
  onToggleOrbitOnly: () => void;
  redundancy: number;
  onRedundancyChange: (v: number) => void;
}

function ToggleSwitch({
  active,
  onClick,
  label,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 cursor-pointer group"
    >
      <div
        className="relative w-10 h-5 rounded-full transition-all duration-200"
        style={{ background: active ? color : "var(--c-input)" }}
      >
        <div
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
          style={{ transform: active ? "translateX(22px)" : "translateX(2px)" }}
        />
      </div>
      <span
        className="text-xs font-mono tracking-wide transition-colors uppercase"
        style={{ color: active ? color : "var(--c-text3)" }}
      >
        {label}
      </span>
    </button>
  );
}

function LegBar({
  leg,
  fraction,
  color,
  index,
}: {
  leg: Leg;
  fraction: number;
  color: string;
  index: number;
}) {
  return (
    <div
      className="mb-4 last:mb-0 leg-animate"
      style={{ animationDelay: `${index * 110}ms` }}
    >
      <div className="flex justify-between items-baseline mb-1.5 gap-2">
        <span className="text-xs truncate" style={{ color: "var(--c-text3)" }}>
          {leg.from}
          <span className="mx-1.5" style={{ color: "var(--c-border)" }}>
            →
          </span>
          {leg.to}
          {leg.canAerobrake && (
            <span className="ml-1.5 text-xs" style={{ color: "#4a9a60" }}>
              [atm]
            </span>
          )}
        </span>
        <span
          className="text-sm font-mono font-bold flex-shrink-0"
          style={{ color: "var(--c-text)" }}
        >
          {leg.deltaV.toLocaleString()}
        </span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: "var(--c-bg)" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${Math.max(1, fraction * 100).toFixed(1)}%`,
            background: color,
            opacity: 0.82,
          }}
        />
      </div>
    </div>
  );
}

const CATEGORY_ORDER: TipCategory[] = ["vessel", "terrain", "lore", "egg"];

export default function MissionPanel({
  destinationId,
  isReturn,
  onToggleReturn,
  fromLKO,
  onToggleFromLKO,
  orbitOnly,
  onToggleOrbitOnly,
  redundancy,
  onRedundancyChange,
}: Props) {
  // ── Field notes toggle ────────────────────────────────────────────────────
  const [showNotes, setShowNotes] = useState(false);

  // ── Copy link ─────────────────────────────────────────────────────────────
  const [copied, setCopied] = useState(false);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // ── Typewriter for destination name ──────────────────────────────────────
  const [displayedName, setDisplayedName] = useState("");
  useEffect(() => {
    setDisplayedName("");
    if (!destinationId) return;
    const dest = DESTINATIONS.find((d) => d.id === destinationId);
    if (!dest) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayedName(dest.name.slice(0, i));
      if (i >= dest.name.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [destinationId]);

  // ── Δv count-up ──────────────────────────────────────────────────────────
  const animRef = useRef<number>(0);
  const currentDisplayed = useRef(0);
  const [displayedDV, setDisplayedDV] = useState(0);

  useEffect(() => {
    currentDisplayed.current = 0;
    setDisplayedDV(0);
  }, [destinationId]);

  // Compute totalDV for animation — must be before early return so hooks run in same order
  const dest = destinationId
    ? (DESTINATIONS.find((d) => d.id === destinationId) ?? null)
    : null;
  const hasNoSurface = dest?.id === "jool";
  const outboundLegs = dest
    ? dest.legs.slice(
        fromLKO ? 1 : 0,
        !hasNoSurface && orbitOnly ? -1 : undefined,
      )
    : [];
  const returnLegs = dest
    ? buildReturnLegs(dest.legs).slice(
        orbitOnly ? 1 : 0,
        fromLKO ? -1 : undefined,
      )
    : [];
  const allLegs: { label: string; legs: Leg[] }[] = dest
    ? isReturn
      ? [
          { label: "Outbound", legs: outboundLegs },
          { label: "Return", legs: returnLegs },
        ]
      : [{ label: "", legs: outboundLegs }]
    : [];
  const baseDV = allLegs
    .flatMap((s) => s.legs)
    .reduce((s, l) => s + l.deltaV, 0);
  const totalDV = Math.round(baseDV * (1 + redundancy / 100));

  // Δv count-up animation — must run every render (before early return) to satisfy rules of hooks
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    cancelAnimationFrame(animRef.current);
    const start = currentDisplayed.current;
    const end = totalDV;
    const duration = 900;
    const t0 = performance.now();
    function tick(now: number) {
      const t = Math.min((now - t0) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      const val = Math.round(start + (end - start) * eased);
      currentDisplayed.current = val;
      setDisplayedDV(val);
      if (t < 1) animRef.current = requestAnimationFrame(tick);
    }
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [totalDV]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!destinationId) {
    return (
      <div
        className="flex flex-col items-center justify-center h-64 gap-4 p-8 text-center"
        style={{
          background: "var(--c-surface)",
          border: "1px solid var(--c-border)",
        }}
      >
        {/* HAL-style eye placeholder */}
        <div
          className="hal-glow w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 40% 38%, #3a0a08 0%, #0a0204 70%)",
            border: "1.5px solid rgba(191,45,28,0.35)",
          }}
        >
          <div
            className="w-6 h-6 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 38% 35%, #e84030 0%, #8a1a10 55%, #3a0a06 100%)",
              boxShadow: "0 0 8px 3px rgba(191,45,28,0.4)",
            }}
          />
        </div>
        <p
          className="text-xs font-mono uppercase tracking-widest"
          style={{ color: "var(--c-text2)" }}
        >
          Select a destination
        </p>
        <p className="text-xs font-mono" style={{ color: "var(--c-text3)" }}>
          Click any body on the map
        </p>
      </div>
    );
  }

  const d = dest!;
  const color = BODY_COLORS[d.id] ?? "var(--c-hal)";

  return (
    <div
      className="overflow-hidden flex flex-col"
      style={
        {
          background: "var(--c-surface)",
          border: "1px solid var(--c-border)",
          "--body-color": color,
        } as React.CSSProperties
      }
    >
      {/* Colored terminal header strip */}
      <div
        className="px-4 py-2.5 flex items-center justify-between flex-shrink-0"
        style={{
          background: color + "22",
          borderBottom: `1px solid ${color}40`,
        }}
      >
        <span
          className="text-xs font-mono uppercase tracking-widest"
          style={{ color: color }}
        >
          {d.group}
        </span>
        <span className="flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="text-xs font-mono uppercase tracking-widest cursor-pointer transition-colors"
            style={{ color: copied ? color : "var(--c-text3)" }}
            title="Copy shareable link"
          >
            {copied ? "✓ Copied" : "Share ↗"}
          </button>
          <span
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: color, opacity: 0.55 }}
          >
            Mission Computer
          </span>
        </span>
      </div>

      <div className="p-5 flex flex-col gap-5">
        {/* Header */}
        <div>
          <h2
            className="text-4xl font-black leading-none tracking-tight font-mono"
            style={{ color: "var(--c-text)" }}
          >
            {displayedName}
            {displayedName.length < d.name.length && (
              <span style={{ color: "var(--c-hal)", opacity: 0.8 }}>▌</span>
            )}
          </h2>
          <p
            className="text-sm mt-2 leading-relaxed"
            style={{ color: "var(--c-text2)" }}
          >
            {d.description}
          </p>
          {d.surfaceGravity != null && (
            <p
              className="text-xs font-mono mt-2"
              style={{ color: "var(--c-text3)" }}
            >
              {d.surfaceGravity.toFixed(2)} m/s² (
              {(d.surfaceGravity / KERBIN_GRAVITY).toFixed(2)} g)
            </p>
          )}
          <p className="flex items-center gap-1.5 mt-2">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: DIFFICULTY_COLORS[d.difficulty] }}
            />
            <span
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: DIFFICULTY_COLORS[d.difficulty] }}
            >
              {d.difficulty}
            </span>
          </p>
        </div>

        {/* Toggle switches */}
        <div className="flex gap-6">
          <ToggleSwitch
            active={isReturn}
            onClick={onToggleReturn}
            label="Return"
            color={color}
          />
          <ToggleSwitch
            active={fromLKO}
            onClick={onToggleFromLKO}
            label="From LKO"
            color={color}
          />
          {!hasNoSurface && (
            <ToggleSwitch
              active={orbitOnly}
              onClick={onToggleOrbitOnly}
              label="Orbit only"
              color={color}
            />
          )}
        </div>

        {/* Redundancy slider */}
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-mono uppercase tracking-widest w-14 flex-shrink-0"
            style={{ color: "var(--c-text3)" }}
          >
            Margin
          </span>
          <input
            type="range"
            min={0}
            max={50}
            step={5}
            value={redundancy}
            onChange={(e) => onRedundancyChange(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${color} ${redundancy * 2}%, var(--c-input) ${redundancy * 2}%)`,
            }}
          />
          <span
            className="text-sm font-mono font-bold w-8 text-right flex-shrink-0"
            style={{ color: redundancy > 0 ? color : "var(--c-text3)" }}
          >
            {redundancy}%
          </span>
        </div>

        {/* Leg sections — keyed on destinationId so CSS animations replay on body change */}
        <div key={destinationId}>
          {allLegs.map(({ label, legs }) => (
            <div key={label || "oneway"} className="mb-2 last:mb-0">
              {label && (
                <div
                  className="flex items-center gap-2 mb-3 pb-2"
                  style={{ borderBottom: "1px solid var(--c-border)" }}
                >
                  <span
                    className="text-xs font-mono"
                    style={{ color: "var(--c-text3)", letterSpacing: "0.15em" }}
                  >
                    · · ·
                  </span>
                  <p
                    className="text-xs font-mono uppercase tracking-widest"
                    style={{ color: "var(--c-text3)" }}
                  >
                    {label}
                  </p>
                  <span
                    className="text-xs font-mono"
                    style={{ color: "var(--c-text3)", letterSpacing: "0.15em" }}
                  >
                    · · ·
                  </span>
                </div>
              )}
              {legs.map((leg, i) => (
                <LegBar
                  key={i}
                  index={i}
                  leg={leg}
                  fraction={leg.deltaV / baseDV}
                  color={color}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Total */}
        <div
          className="p-4 text-center"
          style={{ background: color + "12", border: `1px solid ${color}30` }}
        >
          <p
            className="text-xs font-mono uppercase tracking-widest mb-2"
            style={{ color: color, opacity: 0.7 }}
          >
            Total Mission Δv
          </p>
          <div
            className="h-px w-16 mx-auto mb-3"
            style={{ background: color, opacity: 0.35 }}
          />
          {redundancy > 0 && (
            <p
              className="text-xs font-mono mb-1"
              style={{ color: "var(--c-text3)" }}
            >
              {baseDV.toLocaleString()} × {(1 + redundancy / 100).toFixed(2)}
            </p>
          )}
          <div
            className="text-5xl font-black font-mono leading-none"
            style={{ color }}
          >
            {displayedDV.toLocaleString()}
          </div>
          <p
            className="text-xs font-mono uppercase tracking-widest mt-1.5"
            style={{ color: "var(--c-text3)" }}
          >
            m/s
          </p>
        </div>

        {/* Field Notes */}
        {DESTINATION_TIPS[d.id] && (
          <div style={{ borderTop: `1px solid ${color}30` }}>
            <button
              onClick={() => setShowNotes((v) => !v)}
              className="flex items-center justify-between w-full pt-4 pb-1 cursor-pointer"
            >
              <span
                className="text-xs font-mono uppercase tracking-widest"
                style={{ color: showNotes ? color : "var(--c-text3)" }}
              >
                Field Notes
              </span>
              <span
                className="text-xs font-mono"
                style={{ color: showNotes ? color : "var(--c-text3)" }}
              >
                {showNotes ? "▲" : "▼"}
              </span>
            </button>

            {showNotes && (
              <div className="flex flex-col gap-4 pt-3">
                {CATEGORY_ORDER.map((cat) => {
                  const tips = DESTINATION_TIPS[d.id].filter((t) => t.category === cat);
                  if (!tips.length) return null;
                  return (
                    <div key={cat}>
                      <p
                        className="text-xs font-mono uppercase tracking-widest mb-2"
                        style={{ color: color, opacity: 0.6 }}
                      >
                        {TIP_CATEGORY_LABELS[cat]}
                      </p>
                      <ul className="flex flex-col gap-2">
                        {tips.map((tip, i) => (
                          <li key={i} className="flex gap-2">
                            <span
                              className="text-xs font-mono flex-shrink-0 mt-0.5"
                              style={{ color: color, opacity: 0.5 }}
                            >
                              ›
                            </span>
                            <span
                              className="text-xs font-mono leading-relaxed"
                              style={{ color: "var(--c-text2)" }}
                            >
                              {tip.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <p
          className="text-xs font-mono leading-relaxed"
          style={{ color: "var(--c-text3)" }}
        >
          Community estimates · actual values vary by window &amp; trajectory ·
          aerobrake opportunities noted but not deducted
        </p>
        <p
          className="text-xs font-mono mt-1"
          style={{ color: "var(--c-text3)", opacity: 0.8 }}
        >
          Kerbin surface: {KERBIN_GRAVITY} m/s² (1 g) — reference
        </p>
      </div>
    </div>
  );
}
