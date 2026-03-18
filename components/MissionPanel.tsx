"use client";

import { DESTINATIONS, BODY_COLORS, buildReturnLegs, type Leg } from "@/lib/deltav-data";

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
}: {
  leg: Leg;
  fraction: number;
  color: string;
}) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-baseline mb-1.5 gap-2">
        <span className="text-xs truncate" style={{ color: "var(--c-text3)" }}>
          {leg.from}
          <span className="mx-1.5" style={{ color: "var(--c-border)" }}>→</span>
          {leg.to}
          {leg.canAerobrake && (
            <span className="ml-1.5 text-xs" style={{ color: "#4a9a60" }}>[atm]</span>
          )}
        </span>
        <span className="text-sm font-mono font-bold flex-shrink-0" style={{ color: "var(--c-text)" }}>
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
  if (!destinationId) {
    return (
      <div
        className="flex flex-col items-center justify-center h-64 gap-4 rounded-xl p-8 text-center"
        style={{
          background: "var(--c-surface)",
          border: "1px solid var(--c-border)",
        }}
      >
        {/* HAL-style eye placeholder */}
        <div
          className="hal-glow w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at 40% 38%, #3a0a08 0%, #0a0204 70%)",
            border: "1.5px solid rgba(191,45,28,0.35)",
          }}
        >
          <div
            className="w-5 h-5 rounded-full"
            style={{
              background: "radial-gradient(circle at 38% 35%, #e84030 0%, #8a1a10 55%, #3a0a06 100%)",
              boxShadow: "0 0 8px 3px rgba(191,45,28,0.4)",
            }}
          />
        </div>
        <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--c-text2)" }}>
          Select a destination
        </p>
        <p className="text-xs font-mono" style={{ color: "var(--c-text3)" }}>
          Click any body on the map
        </p>
      </div>
    );
  }

  const dest = DESTINATIONS.find((d) => d.id === destinationId)!;
  const color = BODY_COLORS[dest.id] ?? "var(--c-hal)";

  // Gas giants have no surface — orbit is as far as you can go
  const hasNoSurface = dest.id === "jool";

  const outboundLegs = dest.legs.slice(fromLKO ? 1 : 0, (!hasNoSurface && orbitOnly) ? -1 : undefined);
  const returnLegs   = buildReturnLegs(dest.legs).slice(
    orbitOnly ? 1 : 0,
    fromLKO   ? -1 : undefined
  );

  const allLegs: { label: string; legs: Leg[] }[] = isReturn
    ? [
        { label: "Outbound", legs: outboundLegs },
        { label: "Return",   legs: returnLegs },
      ]
    : [{ label: "", legs: outboundLegs }];

  const baseDV  = allLegs.flatMap((s) => s.legs).reduce((s, l) => s + l.deltaV, 0);
  const totalDV = Math.round(baseDV * (1 + redundancy / 100));

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{
        background: "var(--c-surface)",
        border: "1px solid var(--c-border)",
        "--body-color": color,
      } as React.CSSProperties}
    >
      {/* Colored top accent bar */}
      <div className="h-0.5 w-full flex-shrink-0" style={{ background: color }} />

      <div className="p-5 flex flex-col gap-5">
        {/* Header */}
        <div>
          <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color }}>
            {dest.group}
          </p>
          <h2 className="text-4xl font-black leading-none tracking-tight" style={{ color: "var(--c-text)" }}>
            {dest.name}
          </h2>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--c-text2)" }}>
            {dest.description}
          </p>
        </div>

        {/* Toggle switches */}
        <div className="flex gap-6">
          <ToggleSwitch active={isReturn}   onClick={onToggleReturn}     label="Return"     color={color} />
          <ToggleSwitch active={fromLKO}    onClick={onToggleFromLKO}    label="From LKO"   color={color} />
          {!hasNoSurface && (
            <ToggleSwitch active={orbitOnly}  onClick={onToggleOrbitOnly}  label="Orbit only" color={color} />
          )}
        </div>

        {/* Redundancy slider */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-widest w-14 flex-shrink-0" style={{ color: "var(--c-text3)" }}>
            Margin
          </span>
          <input
            type="range"
            min={0} max={50} step={5}
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

        {/* Leg sections */}
        {allLegs.map(({ label, legs }) => (
          <div key={label || "oneway"}>
            {label && (
              <p
                className="text-xs font-mono uppercase tracking-widest mb-3 pb-2"
                style={{ color: "var(--c-text3)", borderBottom: "1px solid var(--c-border)" }}
              >
                {label}
              </p>
            )}
            {legs.map((leg, i) => (
              <LegBar
                key={i}
                leg={leg}
                fraction={leg.deltaV / baseDV}
                color={color}
              />
            ))}
          </div>
        ))}

        {/* Total */}
        <div
          className="rounded-lg p-4 text-center"
          style={{ background: color + "12", border: `1px solid ${color}28` }}
        >
          {redundancy > 0 && (
            <p className="text-xs font-mono mb-1" style={{ color: "var(--c-text3)" }}>
              {baseDV.toLocaleString()} × {(1 + redundancy / 100).toFixed(2)}
            </p>
          )}
          <div
            className="text-5xl font-black font-mono leading-none"
            style={{ color }}
          >
            {totalDV.toLocaleString()}
          </div>
          <p className="text-xs font-mono uppercase tracking-widest mt-1.5" style={{ color: "var(--c-text3)" }}>
            m/s total Δv
          </p>
        </div>

        <p className="text-xs font-mono leading-relaxed" style={{ color: "var(--c-text3)" }}>
          Community estimates · actual values vary by window &amp; trajectory ·
          aerobrake opportunities noted but not deducted
        </p>
      </div>
    </div>
  );
}
