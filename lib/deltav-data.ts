export interface Leg {
  from: string;
  to: string;
  /** Delta-v in m/s (propulsive, no aerobraking) */
  deltaV: number;
  /** Whether an atmosphere is available to aerobrake at the destination */
  canAerobrake?: boolean;
}

export type DestinationGroup =
  | "Kerbin System"
  | "Inner Planets"
  | "Middle System"
  | "Jool System"
  | "Outer System";

export interface Destination {
  id: string;
  name: string;
  group: DestinationGroup;
  description: string;
  /** Legs from Kerbin Surface to destination surface (one-way) */
  legs: Leg[];
}

/**
 * Standard KSP1 delta-v values based on the community delta-v map.
 * All values in m/s. Aerobrake savings are not applied by default.
 */
export const DESTINATIONS: Destination[] = [
  // ── Kerbin System ────────────────────────────────────────────────────────
  {
    id: "mun",
    name: "Mun",
    group: "Kerbin System",
    description: "Kerbin's primary moon. No atmosphere, moderate gravity.",
    legs: [
      { from: "Kerbin Surface", to: "Low Kerbin Orbit", deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Mun Transfer", deltaV: 860 },
      { from: "Mun Transfer", to: "Low Mun Orbit", deltaV: 310 },
      { from: "Low Mun Orbit", to: "Mun Surface", deltaV: 580 },
    ],
  },
  {
    id: "minmus",
    name: "Minmus",
    group: "Kerbin System",
    description: "Kerbin's small outer moon. Very low gravity, great for fuel depots.",
    legs: [
      { from: "Kerbin Surface", to: "Low Kerbin Orbit", deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Minmus Transfer", deltaV: 930 },
      { from: "Minmus Transfer", to: "Low Minmus Orbit", deltaV: 160 },
      { from: "Low Minmus Orbit", to: "Minmus Surface", deltaV: 180 },
    ],
  },

  // ── Inner Planets ─────────────────────────────────────────────────────────
  {
    id: "moho",
    name: "Moho",
    group: "Inner Planets",
    description: "Innermost planet. No atmosphere — expensive capture burn required.",
    legs: [
      { from: "Kerbin Surface", to: "Low Kerbin Orbit", deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Moho Transfer", deltaV: 760 },
      { from: "Moho Transfer", to: "Low Moho Orbit", deltaV: 2410 },
      { from: "Low Moho Orbit", to: "Moho Surface", deltaV: 870 },
    ],
  },
  {
    id: "eve",
    name: "Eve",
    group: "Inner Planets",
    description:
      "Purple planet with a crushing atmosphere. Returning from the surface is the hardest challenge in KSP.",
    legs: [
      { from: "Kerbin Surface", to: "Low Kerbin Orbit", deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Eve Transfer", deltaV: 1030 },
      {
        from: "Eve Transfer",
        to: "Low Eve Orbit",
        deltaV: 1350,
        canAerobrake: true,
      },
      {
        from: "Low Eve Orbit",
        to: "Eve Surface",
        deltaV: 8000,
        canAerobrake: true,
      },
    ],
  },
  {
    id: "gilly",
    name: "Gilly",
    group: "Inner Planets",
    description:
      "Tiny irregular moon of Eve. Almost no gravity — walking speed can exceed escape velocity.",
    legs: [
      { from: "Kerbin Surface", to: "Low Kerbin Orbit", deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Eve Transfer", deltaV: 1030 },
      {
        from: "Eve Transfer",
        to: "Low Eve Orbit",
        deltaV: 1350,
        canAerobrake: true,
      },
      { from: "Low Eve Orbit", to: "Gilly Transfer", deltaV: 60 },
      { from: "Gilly Transfer", to: "Low Gilly Orbit", deltaV: 30 },
      { from: "Low Gilly Orbit", to: "Gilly Surface", deltaV: 30 },
    ],
  },

  // ── Middle System ─────────────────────────────────────────────────────────
  {
    id: "duna",
    name: "Duna",
    group: "Middle System",
    description:
      "Mars-like red planet with a thin atmosphere. Parachutes work here.",
    legs: [
      { from: "Kerbin Surface", to: "Low Kerbin Orbit", deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Duna Transfer", deltaV: 1060 },
      {
        from: "Duna Transfer",
        to: "Low Duna Orbit",
        deltaV: 380,
        canAerobrake: true,
      },
      {
        from: "Low Duna Orbit",
        to: "Duna Surface",
        deltaV: 1450,
        canAerobrake: true,
      },
    ],
  },
  {
    id: "ike",
    name: "Ike",
    group: "Middle System",
    description: "Duna's large moon. Very close to Duna — easy side trip.",
    legs: [
      { from: "Kerbin Surface", to: "Low Kerbin Orbit", deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Duna Transfer", deltaV: 1060 },
      {
        from: "Duna Transfer",
        to: "Low Duna Orbit",
        deltaV: 380,
        canAerobrake: true,
      },
      { from: "Low Duna Orbit", to: "Ike Transfer", deltaV: 30 },
      { from: "Ike Transfer", to: "Low Ike Orbit", deltaV: 180 },
      { from: "Low Ike Orbit", to: "Ike Surface", deltaV: 390 },
    ],
  },
  {
    id: "dres",
    name: "Dres",
    group: "Middle System",
    description:
      "Lonely asteroid-like dwarf planet in an inclined orbit. No moons, no atmosphere.",
    legs: [
      { from: "Kerbin Surface", to: "Low Kerbin Orbit", deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Dres Transfer", deltaV: 1290 },
      { from: "Dres Transfer", to: "Low Dres Orbit", deltaV: 610 },
      { from: "Low Dres Orbit", to: "Dres Surface", deltaV: 430 },
    ],
  },

  // ── Jool System ───────────────────────────────────────────────────────────
  {
    id: "laythe",
    name: "Laythe",
    group: "Jool System",
    description:
      "Ocean moon of Jool with a breathable atmosphere. Jet engines work here.",
    legs: [
      { from: "Kerbin Surface", to: "Low Kerbin Orbit", deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Jool Transfer", deltaV: 1915 },
      {
        from: "Jool SOI Entry",
        to: "Laythe Transfer",
        deltaV: 160,
        canAerobrake: true,
      },
      {
        from: "Laythe Transfer",
        to: "Low Laythe Orbit",
        deltaV: 1350,
        canAerobrake: true,
      },
      {
        from: "Low Laythe Orbit",
        to: "Laythe Surface",
        deltaV: 2900,
        canAerobrake: true,
      },
    ],
  },
  {
    id: "tylo",
    name: "Tylo",
    group: "Jool System",
    description:
      "Largest Jool moon. No atmosphere and strong gravity — hardest landing in Jool system.",
    legs: [
      { from: "Kerbin Surface", to: "Low Kerbin Orbit", deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Jool Transfer", deltaV: 1915 },
      { from: "Jool SOI Entry", to: "Low Jool Orbit", deltaV: 2820 },
      { from: "Low Jool Orbit", to: "Tylo Transfer", deltaV: 400 },
      { from: "Tylo Transfer", to: "Low Tylo Orbit", deltaV: 1100 },
      { from: "Low Tylo Orbit", to: "Tylo Surface", deltaV: 2270 },
    ],
  },
  {
    id: "vall",
    name: "Vall",
    group: "Jool System",
    description: "Icy moon of Jool. No atmosphere, medium gravity.",
    legs: [
      { from: "Kerbin Surface", to: "Low Kerbin Orbit", deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Jool Transfer", deltaV: 1915 },
      { from: "Jool SOI Entry", to: "Low Jool Orbit", deltaV: 2820 },
      { from: "Low Jool Orbit", to: "Vall Transfer", deltaV: 620 },
      { from: "Vall Transfer", to: "Low Vall Orbit", deltaV: 760 },
      { from: "Low Vall Orbit", to: "Vall Surface", deltaV: 860 },
    ],
  },
  {
    id: "bop",
    name: "Bop",
    group: "Jool System",
    description:
      "Captured asteroid moon of Jool in a highly inclined orbit. Very low gravity.",
    legs: [
      { from: "Kerbin Surface", to: "Low Kerbin Orbit", deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Jool Transfer", deltaV: 1915 },
      { from: "Jool SOI Entry", to: "Low Jool Orbit", deltaV: 2820 },
      { from: "Low Jool Orbit", to: "Bop Transfer", deltaV: 2200 },
      { from: "Bop Transfer", to: "Low Bop Orbit", deltaV: 900 },
      { from: "Low Bop Orbit", to: "Bop Surface", deltaV: 220 },
    ],
  },
  {
    id: "pol",
    name: "Pol",
    group: "Jool System",
    description:
      "Outermost and smallest moon of Jool. Lumpy surface, negligible gravity.",
    legs: [
      { from: "Kerbin Surface", to: "Low Kerbin Orbit", deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Jool Transfer", deltaV: 1915 },
      { from: "Jool SOI Entry", to: "Low Jool Orbit", deltaV: 2820 },
      { from: "Low Jool Orbit", to: "Pol Transfer", deltaV: 2820 },
      { from: "Pol Transfer", to: "Low Pol Orbit", deltaV: 820 },
      { from: "Low Pol Orbit", to: "Pol Surface", deltaV: 160 },
    ],
  },

  // ── Outer System ──────────────────────────────────────────────────────────
  {
    id: "eeloo",
    name: "Eeloo",
    group: "Outer System",
    description:
      "Icy dwarf planet at the edge of the solar system. No atmosphere.",
    legs: [
      { from: "Kerbin Surface", to: "Low Kerbin Orbit", deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Eeloo Transfer", deltaV: 1960 },
      { from: "Eeloo Transfer", to: "Low Eeloo Orbit", deltaV: 1140 },
      { from: "Low Eeloo Orbit", to: "Eeloo Surface", deltaV: 620 },
    ],
  },
];

export const DESTINATION_GROUPS: DestinationGroup[] = [
  "Kerbin System",
  "Inner Planets",
  "Middle System",
  "Jool System",
  "Outer System",
];

/** Group color accents for the UI */
export const GROUP_COLORS: Record<DestinationGroup, string> = {
  "Kerbin System": "text-green-400 border-green-400",
  "Inner Planets": "text-orange-400 border-orange-400",
  "Middle System": "text-red-400 border-red-400",
  "Jool System": "text-purple-400 border-purple-400",
  "Outer System": "text-blue-400 border-blue-400",
};

/**
 * Build the return legs: same path in reverse.
 * The final leg (landing on Kerbin after aerobraking) costs ~80 m/s.
 */
export function buildReturnLegs(legs: Leg[]): Leg[] {
  const reversed = [...legs].reverse().map((leg) => ({
    from: leg.to,
    to: leg.from,
    deltaV: leg.deltaV,
    canAerobrake: leg.canAerobrake,
  }));
  // Override the last leg: arriving at Kerbin only costs a deorbit burn;
  // the atmosphere handles the rest.
  const last = reversed[reversed.length - 1];
  if (last.to === "Kerbin Surface") {
    reversed[reversed.length - 1] = { ...last, deltaV: 80, canAerobrake: true };
  }
  return reversed;
}
