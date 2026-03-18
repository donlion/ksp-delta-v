"use client";

import { DESTINATIONS, buildReturnLegs, type Leg } from "@/lib/deltav-data";

interface Props {
  destinationId: string | null;
  isReturn: boolean;
  onToggleReturn: () => void;
}

export default function MissionPanel({
  destinationId,
  isReturn,
  onToggleReturn,
}: Props) {
  if (!destinationId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-600 text-sm">
        ← Select a destination to plan your mission
      </div>
    );
  }

  const dest = DESTINATIONS.find((d) => d.id === destinationId)!;

  const outboundLegs = dest.legs;
  const returnLegs = buildReturnLegs(dest.legs);
  const allLegs: { label: string; legs: Leg[] }[] = isReturn
    ? [
        { label: "Outbound", legs: outboundLegs },
        { label: "Return", legs: returnLegs },
      ]
    : [{ label: "", legs: outboundLegs }];

  const totalDV = allLegs
    .flatMap((s) => s.legs)
    .reduce((sum, l) => sum + l.deltaV, 0);

  return (
    <div className="flex-1 flex flex-col gap-6 min-w-0">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{dest.name}</h2>
          <p className="text-sm text-gray-400 mt-1">{dest.description}</p>
        </div>

        {/* One-way / Return toggle */}
        <button
          onClick={onToggleReturn}
          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
            isReturn
              ? "bg-ksp-orange border-ksp-orange text-white"
              : "border-ksp-border text-gray-400 hover:border-gray-500 hover:text-gray-200"
          }`}
        >
          <span>{isReturn ? "↩ Return trip" : "→ One-way"}</span>
        </button>
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
        <span className="text-sm font-medium text-gray-400 uppercase tracking-wide">
          Total Delta-V
        </span>
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
