"use client";

import { DESTINATIONS, buildReturnLegs, type Leg } from "@/lib/deltav-data";

interface Props {
  destinationId: string | null;
  isReturn: boolean;
  onToggleReturn: () => void;
  fromLKO: boolean;
  onToggleFromLKO: () => void;
  orbitOnly: boolean;
  onToggleOrbitOnly: () => void;
  redundancy: number; // percentage, 0–50
  onRedundancyChange: (v: number) => void;
}

function Toggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
        active
          ? "bg-blue-700 border-blue-600 text-white"
          : "border-ksp-border text-gray-400 hover:border-gray-500 hover:text-gray-200"
      }`}
    >
      {children}
    </button>
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
      <div className="flex-1 flex items-center justify-center text-gray-600 text-sm">
        ← Select a destination to plan your mission
      </div>
    );
  }

  const dest = DESTINATIONS.find((d) => d.id === destinationId)!;

  // Slice outbound legs: skip launch leg (fromLKO) and/or landing leg (orbitOnly)
  const outboundLegs = dest.legs.slice(
    fromLKO ? 1 : 0,
    orbitOnly ? -1 : undefined
  );
  // Slice return legs: skip landing leg (orbitOnly) and/or deorbit leg (fromLKO)
  const returnLegs = buildReturnLegs(dest.legs).slice(
    orbitOnly ? 1 : 0,
    fromLKO ? -1 : undefined
  );

  const allLegs: { label: string; legs: Leg[] }[] = isReturn
    ? [
        { label: "Outbound", legs: outboundLegs },
        { label: "Return", legs: returnLegs },
      ]
    : [{ label: "", legs: outboundLegs }];

  const baseDV = allLegs.flatMap((s) => s.legs).reduce((sum, l) => sum + l.deltaV, 0);
  const totalDV = Math.round(baseDV * (1 + redundancy / 100));

  return (
    <div className="flex flex-col gap-5 min-w-0">
      {/* Destination name */}
      <div>
        <h2 className="text-2xl font-bold text-white">{dest.name}</h2>
        <p className="text-sm text-gray-400 mt-1">{dest.description}</p>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-2">
        <Toggle active={isReturn} onClick={onToggleReturn}>
          {isReturn ? "↩ Return" : "→ One-way"}
        </Toggle>
        <Toggle active={fromLKO} onClick={onToggleFromLKO}>
          ⬆ From LKO
        </Toggle>
        <Toggle active={orbitOnly} onClick={onToggleOrbitOnly}>
          ○ Orbit only
        </Toggle>
      </div>

      {/* Redundancy slider */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500 uppercase tracking-wide whitespace-nowrap">
          Margin
        </span>
        <input
          type="range"
          min={0}
          max={50}
          step={5}
          value={redundancy}
          onChange={(e) => onRedundancyChange(Number(e.target.value))}
          className="flex-1 accent-ksp-orange h-1.5 cursor-pointer"
        />
        <span className="text-sm font-mono text-ksp-orange w-8 text-right">
          {redundancy}%
        </span>
      </div>

      {/* Maneuver tables */}
      {allLegs.map(({ label, legs }) => (
        <div key={label || "oneway"}>
          {label && (
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              {label}
            </h3>
          )}
          <div className="rounded-lg overflow-hidden border border-ksp-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ksp-panel text-gray-500 text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-2">From</th>
                  <th className="text-left px-4 py-2">To</th>
                  <th className="text-right px-4 py-2">Δv (m/s)</th>
                </tr>
              </thead>
              <tbody>
                {legs.map((leg, i) => (
                  <tr
                    key={i}
                    className="border-t border-ksp-border hover:bg-ksp-panel/50 transition-colors"
                  >
                    <td className="px-4 py-2.5 text-gray-400">{leg.from}</td>
                    <td className="px-4 py-2.5 text-gray-200">
                      {leg.to}
                      {leg.canAerobrake && (
                        <span className="ml-2 text-xs text-green-500 font-medium">
                          [aerobrake]
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono font-semibold text-amber-400">
                      {leg.deltaV.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Total */}
      <div className="flex items-center justify-between px-4 py-4 rounded-lg bg-ksp-panel border border-ksp-border">
        <div>
          <span className="text-sm font-medium text-gray-400 uppercase tracking-wide">
            Total Delta-V
          </span>
          {redundancy > 0 && (
            <p className="text-xs text-gray-600 mt-0.5">
              {baseDV.toLocaleString()} × {(1 + redundancy / 100).toFixed(2)}
            </p>
          )}
        </div>
        <span className="text-3xl font-bold font-mono text-ksp-orange">
          {totalDV.toLocaleString()}{" "}
          <span className="text-base font-normal text-gray-500">m/s</span>
        </span>
      </div>

      <p className="text-xs text-gray-600">
        Values are community estimates from the standard KSP delta-v map.
        Actual requirements vary by launch window, trajectory, and piloting.
        Aerobraking opportunities are noted but not subtracted from the totals.
      </p>
    </div>
  );
}
