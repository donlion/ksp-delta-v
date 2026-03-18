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
        style={{ background: active ? color : "#1e2d4a" }}
      >
        <div
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
          style={{ transform: active ? "translateX(22px)" : "translateX(2px)" }}
        />
      </div>
      <span
        className="text-xs font-medium tracking-wide transition-colors"
        style={{ color: active ? color : "#607080" }}
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
        <span className="text-xs text-gray-500 truncate">
          {leg.from}
          <span className="mx-1.5 text-gray-700">→</span>
          {leg.to}
          {leg.canAerobrake && (
            <span className="ml-1.5 text-green-600 text-xs">[atm]</span>
          )}
        </span>
        <span className="text-sm font-mono font-bold text-white flex-shrink-0">
          {leg.deltaV.toLocaleString()}
        </span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: "#0d1628" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${Math.max(1, fraction * 100).toFixed(1)}%`,
            background: color,
            opacity: 0.85,
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
      <div className="flex flex-col items-center justify-center h-64 gap-3 rounded-xl border border-ksp-border bg-ksp-panel p-8 text-center">
        <span className="text-4xl">🛸</span>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
          Select a destination
        </p>
        <p className="text-xs text-gray-700">
          Click any body on the map to plan your mission
        </p>
      </div>
    );
  }

  const dest = DESTINATIONS.find((d) => d.id === destinationId)!;
  const color = BODY_COLORS[dest.id] ?? "#e8760a";

  const outboundLegs = dest.legs.slice(fromLKO ? 1 : 0, orbitOnly ? -1 : undefined);
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
      className="rounded-xl overflow-hidden border border-ksp-border bg-ksp-panel flex flex-col"
      style={{ "--body-color": color } as React.CSSProperties}
    >
      {/* Colored top accent bar */}
      <div className="h-1 w-full flex-shrink-0" style={{ background: color }} />

      <div className="p-5 flex flex-col gap-5">
        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color }}>
            {dest.group}
          </p>
          <h2 className="text-4xl font-black text-white leading-none tracking-tight">
            {dest.name}
          </h2>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            {dest.description}
          </p>
        </div>

        {/* Toggle switches */}
        <div className="flex gap-6">
          <ToggleSwitch active={isReturn}   onClick={onToggleReturn}     label="Return"     color={color} />
          <ToggleSwitch active={fromLKO}    onClick={onToggleFromLKO}    label="From LKO"   color={color} />
          <ToggleSwitch active={orbitOnly}  onClick={onToggleOrbitOnly}  label="Orbit only" color={color} />
        </div>

        {/* Redundancy slider */}
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-gray-600 w-14 flex-shrink-0">
            Margin
          </span>
          <input
            type="range"
            min={0} max={50} step={5}
            value={redundancy}
            onChange={(e) => onRedundancyChange(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${color} ${redundancy * 2}%, #1e2d4a ${redundancy * 2}%)`,
            }}
          />
          <span
            className="text-sm font-mono font-bold w-8 text-right flex-shrink-0"
            style={{ color: redundancy > 0 ? color : "#607080" }}
          >
            {redundancy}%
          </span>
        </div>

        {/* Leg sections */}
        {allLegs.map(({ label, legs }) => (
          <div key={label || "oneway"}>
            {label && (
              <p className="text-xs uppercase tracking-widest text-gray-600 mb-3 pb-2 border-b border-ksp-border">
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
          style={{ background: color + "12", border: `1px solid ${color}30` }}
        >
          {redundancy > 0 && (
            <p className="text-xs text-gray-600 mb-1 font-mono">
              {baseDV.toLocaleString()} × {(1 + redundancy / 100).toFixed(2)}
            </p>
          )}
          <div
            className="text-5xl font-black font-mono leading-none"
            style={{ color }}
          >
            {totalDV.toLocaleString()}
          </div>
          <p className="text-xs uppercase tracking-widest text-gray-600 mt-1.5">
            m/s total Δv
          </p>
        </div>

        <p className="text-xs text-gray-700 leading-relaxed">
          Community estimates · actual values vary by window &amp; trajectory ·
          aerobrake opportunities noted but not deducted
        </p>
      </div>
    </div>
  );
}
