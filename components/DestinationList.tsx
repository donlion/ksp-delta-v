"use client";

import {
  DESTINATIONS,
  DESTINATION_GROUPS,
  GROUP_COLORS,
  type Destination,
  type DestinationGroup,
} from "@/lib/deltav-data";

interface Props {
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function DestinationList({ selected, onSelect }: Props) {
  const byGroup = DESTINATION_GROUPS.reduce<
    Record<DestinationGroup, Destination[]>
  >((acc, group) => {
    acc[group] = DESTINATIONS.filter((d) => d.group === group);
    return acc;
  }, {} as Record<DestinationGroup, Destination[]>);

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col gap-5">
      {DESTINATION_GROUPS.map((group) => (
        <div key={group}>
          <h2
            className={`text-xs font-bold uppercase tracking-widest mb-2 border-b pb-1 ${GROUP_COLORS[group]}`}
          >
            {group}
          </h2>
          <ul className="flex flex-col gap-1">
            {byGroup[group].map((dest) => (
              <li key={dest.id}>
                <button
                  onClick={() => onSelect(dest.id)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    selected === dest.id
                      ? "bg-ksp-orange text-white font-semibold"
                      : "text-gray-300 hover:bg-ksp-border hover:text-white"
                  }`}
                >
                  {dest.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
