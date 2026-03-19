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
  | "Outer System"
  | "Sarnus System"
  | "Urlum System"
  | "Neidon System"
  | "Plock System";

export type DifficultyRating = "Beginner" | "Intermediate" | "Advanced" | "Expert";
export type IsruViability = "prime" | "viable";

/** Color for each difficulty tier */
export const DIFFICULTY_COLORS: Record<DifficultyRating, string> = {
  Beginner:     "#3a9a50",
  Intermediate: "#c0a030",
  Advanced:     "#c07030",
  Expert:       "#bf2d1c",
};

export const ISRU_COLORS: Record<IsruViability, string> = {
  prime:  "#3a9a50",
  viable: "#7a8898",
};

export interface Destination {
  id: string;
  name: string;
  group: DestinationGroup;
  description: string;
  /** Only shown when OPM is disabled (replaced by OPM equivalent) */
  stockOnly?: boolean;
  /** Only shown when OPM is enabled */
  opmOnly?: boolean;
  /** Rough mission difficulty based on delta-v, atmosphere, and landing complexity */
  difficulty: DifficultyRating;
  /** Surface gravity in m/s². Omit for Jool (gas giant, no surface). */
  surfaceGravity?: number;
  /**
   * KSP1 science reward multiplier for experiments performed here.
   * Higher = more science per experiment.
   */
  scienceMultiplier: number;
  /**
   * ISRU mining viability. "prime" = very low gravity, easy depot candidate.
   * "viable" = possible but heavier gravity penalty. Omit for gas giants.
   */
  isruViability?: IsruViability;
  /** Legs from Kerbin Surface to destination surface (one-way) */
  legs: Leg[];
}

/** Kerbin surface gravity (m/s²) — reference for "g" comparisons */
export const KERBIN_GRAVITY = 9.81;

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
    difficulty: "Beginner",
    description: "Kerbin's primary moon. No atmosphere, moderate gravity.",
    surfaceGravity: 1.63,
    scienceMultiplier: 4,
    isruViability: "viable",
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
    difficulty: "Beginner",
    description: "Kerbin's small outer moon. Very low gravity, great for fuel depots.",
    surfaceGravity: 0.491,
    scienceMultiplier: 5,
    isruViability: "prime",
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
    difficulty: "Expert",
    description: "Innermost planet. No atmosphere — expensive capture burn required.",
    surfaceGravity: 2.7,
    scienceMultiplier: 8,
    isruViability: "viable",
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
    difficulty: "Expert",
    description:
      "Purple planet with a crushing atmosphere. Returning from the surface is the hardest challenge in KSP.",
    surfaceGravity: 16.7,
    scienceMultiplier: 8,
    isruViability: "viable",
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
    difficulty: "Intermediate",
    description:
      "Tiny irregular moon of Eve. Almost no gravity — walking speed can exceed escape velocity.",
    surfaceGravity: 0.049,
    scienceMultiplier: 9,
    isruViability: "prime",
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
    difficulty: "Intermediate",
    description:
      "Mars-like red planet with a thin atmosphere. Parachutes work here.",
    surfaceGravity: 2.94,
    scienceMultiplier: 8,
    isruViability: "viable",
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
    difficulty: "Intermediate",
    description: "Duna's large moon. Very close to Duna — easy side trip.",
    surfaceGravity: 1.1,
    scienceMultiplier: 8,
    isruViability: "viable",
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
    difficulty: "Advanced",
    description:
      "Lonely asteroid-like dwarf planet in an inclined orbit. No moons, no atmosphere.",
    surfaceGravity: 1.13,
    scienceMultiplier: 8,
    isruViability: "viable",
    legs: [
      { from: "Kerbin Surface", to: "Low Kerbin Orbit", deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Dres Transfer", deltaV: 1290 },
      { from: "Dres Transfer", to: "Low Dres Orbit", deltaV: 610 },
      { from: "Low Dres Orbit", to: "Dres Surface", deltaV: 430 },
    ],
  },

  // ── Jool System ───────────────────────────────────────────────────────────
  {
    id: "jool",
    name: "Jool",
    group: "Jool System",
    difficulty: "Advanced",
    description:
      "Gas giant — no surface. Thick atmosphere; aerobraking into Jool orbit is possible but risky.",
    scienceMultiplier: 6,
    legs: [
      { from: "Kerbin Surface",   to: "Low Kerbin Orbit", deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Jool Transfer",    deltaV: 1915 },
      { from: "Jool SOI Entry",   to: "Low Jool Orbit",   deltaV: 2820, canAerobrake: true },
    ],
  },
  {
    id: "laythe",
    name: "Laythe",
    group: "Jool System",
    difficulty: "Advanced",
    description:
      "Ocean moon of Jool with a breathable atmosphere. Jet engines work here.",
    surfaceGravity: 1.96,
    scienceMultiplier: 6,
    isruViability: "viable",
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
    difficulty: "Expert",
    description:
      "Largest Jool moon. No atmosphere and strong gravity — hardest landing in Jool system.",
    surfaceGravity: 7.85,
    scienceMultiplier: 10,
    isruViability: "viable",
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
    difficulty: "Advanced",
    description: "Icy moon of Jool. No atmosphere, medium gravity.",
    surfaceGravity: 2.31,
    scienceMultiplier: 10,
    isruViability: "viable",
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
    difficulty: "Advanced",
    description:
      "Captured asteroid moon of Jool in a highly inclined orbit. Very low gravity.",
    surfaceGravity: 0.589,
    scienceMultiplier: 12,
    isruViability: "prime",
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
    difficulty: "Advanced",
    description:
      "Outermost and smallest moon of Jool. Lumpy surface, negligible gravity.",
    surfaceGravity: 0.373,
    scienceMultiplier: 12,
    isruViability: "prime",
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
    stockOnly: true,
    difficulty: "Advanced",
    description:
      "Icy dwarf planet at the edge of the solar system. No atmosphere.",
    surfaceGravity: 1.69,
    scienceMultiplier: 10,
    isruViability: "viable",
    legs: [
      { from: "Kerbin Surface", to: "Low Kerbin Orbit", deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Eeloo Transfer", deltaV: 1960 },
      { from: "Eeloo Transfer", to: "Low Eeloo Orbit", deltaV: 1140 },
      { from: "Low Eeloo Orbit", to: "Eeloo Surface", deltaV: 620 },
    ],
  },

  // ── Outer Planets Mod ─────────────────────────────────────────────────────
  // Sarnus System
  {
    id: "sarnus",
    name: "Sarnus",
    group: "Sarnus System",
    opmOnly: true,
    difficulty: "Expert",
    description:
      "Ringed gas giant beyond Jool. No surface — thick atmosphere allows aerobraking into orbit.",
    scienceMultiplier: 12,
    legs: [
      { from: "Kerbin Surface",   to: "Low Kerbin Orbit",  deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Sarnus Transfer",   deltaV: 1020 },
      { from: "Sarnus SOI Entry", to: "Low Sarnus Orbit",  deltaV: 1400, canAerobrake: true },
    ],
  },
  {
    id: "slate",
    name: "Slate",
    group: "Sarnus System",
    opmOnly: true,
    difficulty: "Expert",
    description:
      "Large rocky moon of Sarnus with no atmosphere and strong gravity — the Tylo of the outer system.",
    surfaceGravity: 5.5,
    scienceMultiplier: 15,
    isruViability: "viable",
    legs: [
      { from: "Kerbin Surface",   to: "Low Kerbin Orbit",  deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Sarnus Transfer",   deltaV: 1020 },
      { from: "Sarnus SOI Entry", to: "Low Sarnus Orbit",  deltaV: 1400, canAerobrake: true },
      { from: "Low Sarnus Orbit", to: "Slate Transfer",    deltaV: 480 },
      { from: "Slate Transfer",   to: "Low Slate Orbit",   deltaV: 520 },
      { from: "Low Slate Orbit",  to: "Slate Surface",     deltaV: 810 },
    ],
  },
  {
    id: "tekto",
    name: "Tekto",
    group: "Sarnus System",
    opmOnly: true,
    difficulty: "Expert",
    description:
      "Outermost moon of Sarnus with a thick hazy atmosphere. Jet engines won't work, but parachutes will.",
    surfaceGravity: 2.94,
    scienceMultiplier: 12,
    isruViability: "viable",
    legs: [
      { from: "Kerbin Surface",   to: "Low Kerbin Orbit",  deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Sarnus Transfer",   deltaV: 1020 },
      { from: "Sarnus SOI Entry", to: "Low Sarnus Orbit",  deltaV: 1400, canAerobrake: true },
      { from: "Low Sarnus Orbit", to: "Tekto Transfer",    deltaV: 620 },
      { from: "Tekto Transfer",   to: "Low Tekto Orbit",   deltaV: 200, canAerobrake: true },
      { from: "Low Tekto Orbit",  to: "Tekto Surface",     deltaV: 1400, canAerobrake: true },
    ],
  },
  {
    id: "ovok",
    name: "Ovok",
    group: "Sarnus System",
    opmOnly: true,
    difficulty: "Advanced",
    description:
      "Small egg-shaped moon of Sarnus. Low gravity makes landing trivial but staying on the surface tricky.",
    surfaceGravity: 0.49,
    scienceMultiplier: 18,
    isruViability: "prime",
    legs: [
      { from: "Kerbin Surface",   to: "Low Kerbin Orbit",  deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Sarnus Transfer",   deltaV: 1020 },
      { from: "Sarnus SOI Entry", to: "Low Sarnus Orbit",  deltaV: 1400, canAerobrake: true },
      { from: "Low Sarnus Orbit", to: "Ovok Transfer",     deltaV: 1060 },
      { from: "Ovok Transfer",    to: "Low Ovok Orbit",    deltaV: 100 },
      { from: "Low Ovok Orbit",   to: "Ovok Surface",      deltaV: 50 },
    ],
  },
  {
    id: "hale",
    name: "Hale",
    group: "Sarnus System",
    opmOnly: true,
    difficulty: "Advanced",
    description:
      "Tiny innermost moon of Sarnus. Negligible gravity — a gentle push can reach orbit from the surface.",
    surfaceGravity: 0.1,
    scienceMultiplier: 18,
    isruViability: "prime",
    legs: [
      { from: "Kerbin Surface",   to: "Low Kerbin Orbit",  deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Sarnus Transfer",   deltaV: 1020 },
      { from: "Sarnus SOI Entry", to: "Low Sarnus Orbit",  deltaV: 1400, canAerobrake: true },
      { from: "Low Sarnus Orbit", to: "Hale Transfer",     deltaV: 1500 },
      { from: "Hale Transfer",    to: "Low Hale Orbit",    deltaV: 20 },
      { from: "Low Hale Orbit",   to: "Hale Surface",      deltaV: 10 },
    ],
  },
  {
    id: "eeloo-opm",
    name: "Eeloo",
    group: "Sarnus System",
    opmOnly: true,
    difficulty: "Expert",
    description:
      "Former outer planet, now a captured icy moon of Sarnus. No atmosphere — efficient ISRU candidate.",
    surfaceGravity: 1.69,
    scienceMultiplier: 10,
    isruViability: "viable",
    legs: [
      { from: "Kerbin Surface",   to: "Low Kerbin Orbit",  deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Sarnus Transfer",   deltaV: 1020 },
      { from: "Sarnus SOI Entry", to: "Low Sarnus Orbit",  deltaV: 1400, canAerobrake: true },
      { from: "Low Sarnus Orbit", to: "Eeloo Transfer",    deltaV: 650 },
      { from: "Eeloo Transfer",   to: "Low Eeloo Orbit",   deltaV: 830 },
      { from: "Low Eeloo Orbit",  to: "Eeloo Surface",     deltaV: 620 },
    ],
  },

  // Urlum System
  {
    id: "urlum",
    name: "Urlum",
    group: "Urlum System",
    opmOnly: true,
    difficulty: "Expert",
    description:
      "Tilted ice giant with a ring system. Its extreme axial tilt makes polar orbits unusual.",
    scienceMultiplier: 14,
    legs: [
      { from: "Kerbin Surface",   to: "Low Kerbin Orbit",  deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Urlum Transfer",    deltaV: 2310 },
      { from: "Urlum SOI Entry",  to: "Low Urlum Orbit",   deltaV: 2050, canAerobrake: true },
    ],
  },
  {
    id: "polta",
    name: "Polta",
    group: "Urlum System",
    opmOnly: true,
    difficulty: "Expert",
    description:
      "Innermost moon of Urlum. Rocky, airless, and very far from home.",
    surfaceGravity: 2.0,
    scienceMultiplier: 16,
    isruViability: "viable",
    legs: [
      { from: "Kerbin Surface",   to: "Low Kerbin Orbit",  deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Urlum Transfer",    deltaV: 2310 },
      { from: "Urlum SOI Entry",  to: "Low Urlum Orbit",   deltaV: 2050, canAerobrake: true },
      { from: "Low Urlum Orbit",  to: "Polta Transfer",    deltaV: 520 },
      { from: "Polta Transfer",   to: "Low Polta Orbit",   deltaV: 260 },
      { from: "Low Polta Orbit",  to: "Polta Surface",     deltaV: 200 },
    ],
  },
  {
    id: "priax",
    name: "Priax",
    group: "Urlum System",
    opmOnly: true,
    difficulty: "Expert",
    description:
      "Small companion moon to Polta, sharing a similar orbit around Urlum.",
    surfaceGravity: 1.5,
    scienceMultiplier: 16,
    isruViability: "viable",
    legs: [
      { from: "Kerbin Surface",   to: "Low Kerbin Orbit",  deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Urlum Transfer",    deltaV: 2310 },
      { from: "Urlum SOI Entry",  to: "Low Urlum Orbit",   deltaV: 2050, canAerobrake: true },
      { from: "Low Urlum Orbit",  to: "Priax Transfer",    deltaV: 590 },
      { from: "Priax Transfer",   to: "Low Priax Orbit",   deltaV: 200 },
      { from: "Low Priax Orbit",  to: "Priax Surface",     deltaV: 140 },
    ],
  },
  {
    id: "wal",
    name: "Wal",
    group: "Urlum System",
    opmOnly: true,
    difficulty: "Expert",
    description:
      "Largest moon of Urlum. Significant gravity and no atmosphere — and hosts its own subsatellite, Tal.",
    surfaceGravity: 4.9,
    scienceMultiplier: 15,
    isruViability: "viable",
    legs: [
      { from: "Kerbin Surface",   to: "Low Kerbin Orbit",  deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Urlum Transfer",    deltaV: 2310 },
      { from: "Urlum SOI Entry",  to: "Low Urlum Orbit",   deltaV: 2050, canAerobrake: true },
      { from: "Low Urlum Orbit",  to: "Wal Transfer",      deltaV: 980 },
      { from: "Wal Transfer",     to: "Low Wal Orbit",     deltaV: 500 },
      { from: "Low Wal Orbit",    to: "Wal Surface",       deltaV: 1100 },
    ],
  },
  {
    id: "tal",
    name: "Tal",
    group: "Urlum System",
    opmOnly: true,
    difficulty: "Expert",
    description:
      "Tiny moon of Wal — a moon of a moon. Exceptionally rare; one of very few subsatellites in the Kerbol system.",
    surfaceGravity: 0.2,
    scienceMultiplier: 20,
    isruViability: "prime",
    legs: [
      { from: "Kerbin Surface",   to: "Low Kerbin Orbit",  deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Urlum Transfer",    deltaV: 2310 },
      { from: "Urlum SOI Entry",  to: "Low Urlum Orbit",   deltaV: 2050, canAerobrake: true },
      { from: "Low Urlum Orbit",  to: "Wal Transfer",      deltaV: 980 },
      { from: "Wal Transfer",     to: "Low Wal Orbit",     deltaV: 500 },
      { from: "Low Wal Orbit",    to: "Tal Transfer",      deltaV: 300 },
      { from: "Tal Transfer",     to: "Tal Surface",       deltaV: 30 },
    ],
  },

  // Neidon System
  {
    id: "neidon",
    name: "Neidon",
    group: "Neidon System",
    opmOnly: true,
    difficulty: "Expert",
    description:
      "Deep-blue ice giant at the far edge of the Kerbol system. Capturing into orbit is extremely expensive.",
    scienceMultiplier: 16,
    legs: [
      { from: "Kerbin Surface",   to: "Low Kerbin Orbit",  deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Neidon Transfer",   deltaV: 2040 },
      { from: "Neidon SOI Entry", to: "Low Neidon Orbit",  deltaV: 2860, canAerobrake: true },
    ],
  },
  {
    id: "thatmo",
    name: "Thatmo",
    group: "Neidon System",
    opmOnly: true,
    difficulty: "Expert",
    description:
      "Large retrograde moon of Neidon with a thick nitrogen atmosphere. Parachutes work, ascent is costly.",
    surfaceGravity: 6.87,
    scienceMultiplier: 18,
    isruViability: "viable",
    legs: [
      { from: "Kerbin Surface",    to: "Low Kerbin Orbit",   deltaV: 3400 },
      { from: "Low Kerbin Orbit",  to: "Neidon Transfer",    deltaV: 2040 },
      { from: "Neidon SOI Entry",  to: "Low Neidon Orbit",   deltaV: 2860, canAerobrake: true },
      { from: "Low Neidon Orbit",  to: "Thatmo Transfer",    deltaV: 650 },
      { from: "Thatmo Transfer",   to: "Low Thatmo Orbit",   deltaV: 660, canAerobrake: true },
      { from: "Low Thatmo Orbit",  to: "Thatmo Surface",     deltaV: 1600, canAerobrake: true },
    ],
  },
  {
    id: "nissee",
    name: "Nissee",
    group: "Neidon System",
    opmOnly: true,
    difficulty: "Expert",
    description:
      "Tiny captured irregular moon of Neidon in a highly inclined orbit. Negligible gravity.",
    surfaceGravity: 0.1,
    scienceMultiplier: 20,
    isruViability: "prime",
    legs: [
      { from: "Kerbin Surface",   to: "Low Kerbin Orbit",   deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Neidon Transfer",    deltaV: 2040 },
      { from: "Neidon SOI Entry", to: "Low Neidon Orbit",   deltaV: 2860, canAerobrake: true },
      { from: "Low Neidon Orbit", to: "Nissee Transfer",    deltaV: 1380 },
      { from: "Nissee Transfer",  to: "Nissee Surface",     deltaV: 30 },
    ],
  },

  // Plock System
  {
    id: "plock",
    name: "Plock",
    group: "Plock System",
    opmOnly: true,
    difficulty: "Expert",
    description:
      "Icy dwarf planet in an eccentric outer orbit, locked in a binary dance with its companion Karen.",
    surfaceGravity: 2.2,
    scienceMultiplier: 18,
    isruViability: "viable",
    legs: [
      { from: "Kerbin Surface",   to: "Low Kerbin Orbit",  deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Plock Transfer",    deltaV: 2180 },
      { from: "Plock Transfer",   to: "Low Plock Orbit",   deltaV: 1160 },
      { from: "Low Plock Orbit",  to: "Plock Surface",     deltaV: 220 },
    ],
  },
  {
    id: "karen",
    name: "Karen",
    group: "Plock System",
    opmOnly: true,
    difficulty: "Expert",
    description:
      "Binary companion to Plock, nearly half its size. The two are tidally locked, always facing each other.",
    surfaceGravity: 0.3,
    scienceMultiplier: 20,
    isruViability: "prime",
    legs: [
      { from: "Kerbin Surface",   to: "Low Kerbin Orbit",  deltaV: 3400 },
      { from: "Low Kerbin Orbit", to: "Plock Transfer",    deltaV: 2180 },
      { from: "Plock Transfer",   to: "Low Plock Orbit",   deltaV: 1160 },
      { from: "Low Plock Orbit",  to: "Karen Transfer",    deltaV: 100 },
      { from: "Karen Transfer",   to: "Karen Surface",     deltaV: 30 },
    ],
  },
];

export const DESTINATION_GROUPS: DestinationGroup[] = [
  "Kerbin System",
  "Inner Planets",
  "Middle System",
  "Jool System",
  "Outer System",
  "Sarnus System",
  "Urlum System",
  "Neidon System",
  "Plock System",
];

/** Per-body accent colors (matches DeltaVMap node strokes) */
export const BODY_COLORS: Record<string, string> = {
  mun:        "#909090",
  minmus:     "#50a060",
  moho:       "#c8a050",
  eve:        "#8050c0",
  gilly:      "#a070d0",
  duna:       "#c04040",
  ike:        "#808080",
  dres:       "#a0a0a0",
  jool:       "#40a030",
  laythe:     "#4080c0",
  tylo:       "#c0c080",
  vall:       "#60b0b0",
  bop:        "#806040",
  pol:        "#c0a060",
  eeloo:      "#a0c0e0",
  // OPM
  sarnus:     "#c8b470",
  slate:      "#708090",
  tekto:      "#5090a8",
  ovok:       "#c8b080",
  hale:       "#a08060",
  "eeloo-opm": "#a0c0e0",
  plock:      "#c8c0d8",
  karen:      "#d0c0b8",
  urlum:      "#60a8c0",
  polta:      "#90a8b8",
  priax:      "#a0b0c0",
  wal:        "#7090a8",
  tal:        "#98b0c0",
  neidon:     "#4060c0",
  thatmo:     "#607888",
  nissee:     "#b0b8c8",
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
