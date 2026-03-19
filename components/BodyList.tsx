"use client";

import { BODY_COLORS } from "@/lib/deltav-data";

type SubMoonEntry = { id: string; name: string };
type MoonEntry = { id: string; name: string; subsatellites?: SubMoonEntry[] };
type BodyEntry = { id: string; name: string; moons?: MoonEntry[] };

const STOCK_SOLAR_SYSTEM: BodyEntry[] = [
  { id: "kerbol", name: "Sol (Kerbol)" },
  { id: "moho",   name: "Moho" },
  { id: "eve",    name: "Eve",   moons: [{ id: "gilly",  name: "Gilly" }] },
  { id: "kerbin", name: "Kerbin", moons: [{ id: "mun",    name: "Mun"    },
                                           { id: "minmus", name: "Minmus" }] },
  { id: "duna",   name: "Duna",  moons: [{ id: "ike",    name: "Ike" }] },
  { id: "dres",   name: "Dres" },
  { id: "jool",   name: "Jool",  moons: [{ id: "laythe", name: "Laythe" },
                                           { id: "vall",   name: "Vall"   },
                                           { id: "tylo",   name: "Tylo"   },
                                           { id: "bop",    name: "Bop"    },
                                           { id: "pol",    name: "Pol"    }] },
  { id: "eeloo",  name: "Eeloo" },
];

const OPM_SOLAR_SYSTEM: BodyEntry[] = [
  { id: "kerbol", name: "Sol (Kerbol)" },
  { id: "moho",   name: "Moho" },
  { id: "eve",    name: "Eve",   moons: [{ id: "gilly",  name: "Gilly" }] },
  { id: "kerbin", name: "Kerbin", moons: [{ id: "mun",    name: "Mun"    },
                                           { id: "minmus", name: "Minmus" }] },
  { id: "duna",   name: "Duna",  moons: [{ id: "ike",    name: "Ike" }] },
  { id: "dres",   name: "Dres" },
  { id: "jool",   name: "Jool",  moons: [{ id: "laythe", name: "Laythe" },
                                           { id: "vall",   name: "Vall"   },
                                           { id: "tylo",   name: "Tylo"   },
                                           { id: "bop",    name: "Bop"    },
                                           { id: "pol",    name: "Pol"    }] },
  { id: "sarnus", name: "Sarnus", moons: [{ id: "hale",      name: "Hale"  },
                                           { id: "ovok",      name: "Ovok"  },
                                           { id: "eeloo-opm", name: "Eeloo" },
                                           { id: "slate",     name: "Slate" },
                                           { id: "tekto",     name: "Tekto" }] },
  { id: "urlum",  name: "Urlum",  moons: [{ id: "polta",  name: "Polta" },
                                           { id: "priax",  name: "Priax" },
                                           { id: "wal",    name: "Wal", subsatellites: [{ id: "tal", name: "Tal" }] }] },
  { id: "neidon", name: "Neidon", moons: [{ id: "thatmo", name: "Thatmo" },
                                           { id: "nissee", name: "Nissee" }] },
  { id: "plock",  name: "Plock",  moons: [{ id: "karen",  name: "Karen" }] },
];

// Non-selectable bodies (no mission data)
const NON_DEST = new Set(["kerbol", "kerbin"]);

interface Props {
  selected: string | null;
  onSelect: (id: string) => void;
  opmEnabled: boolean;
}

export default function BodyList({ selected, onSelect, opmEnabled }: Props) {
  const SOLAR_SYSTEM = opmEnabled ? OPM_SOLAR_SYSTEM : STOCK_SOLAR_SYSTEM;

  return (
    <div className="font-mono text-sm select-none" style={{ color: "var(--c-text2)" }}>
      {SOLAR_SYSTEM.map((body) => {
        const isSelectable = !NON_DEST.has(body.id);
        const isSelected = selected === body.id;
        const color = BODY_COLORS[body.id];

        return (
          <div key={body.id}>
            <div
              className={isSelectable ? "cursor-pointer" : ""}
              style={{ padding: "3px 0" }}
              onClick={isSelectable ? () => onSelect(body.id) : undefined}
            >
              <span
                className="uppercase tracking-widest text-xs transition-colors"
                style={{
                  color: isSelected
                    ? color ?? "var(--c-hal)"
                    : isSelectable
                    ? "var(--c-text)"
                    : "var(--c-text3)",
                  textShadow: isSelected && color ? `0 0 8px ${color}88` : undefined,
                }}
              >
                {isSelected && "› "}{body.name}
              </span>
            </div>

            {body.moons?.map((moon) => {
              const moonSelected = selected === moon.id;
              const moonColor = BODY_COLORS[moon.id];
              return (
                <div key={moon.id}>
                  <div
                    className="cursor-pointer"
                    style={{ padding: "3px 0", paddingLeft: "1.25rem" }}
                    onClick={() => onSelect(moon.id)}
                  >
                    <span
                      className="uppercase tracking-widest text-xs transition-colors"
                      style={{
                        color: moonSelected
                          ? moonColor ?? "var(--c-hal)"
                          : "var(--c-text2)",
                        textShadow: moonSelected && moonColor ? `0 0 8px ${moonColor}88` : undefined,
                      }}
                    >
                      {moonSelected && "› "}{moon.name}
                    </span>
                  </div>

                  {moon.subsatellites?.map((sub) => {
                    const subSelected = selected === sub.id;
                    const subColor = BODY_COLORS[sub.id];
                    return (
                      <div
                        key={sub.id}
                        className="cursor-pointer"
                        style={{ padding: "3px 0", paddingLeft: "2.5rem" }}
                        onClick={() => onSelect(sub.id)}
                      >
                        <span
                          className="uppercase tracking-widest text-xs transition-colors"
                          style={{
                            color: subSelected
                              ? subColor ?? "var(--c-hal)"
                              : "var(--c-text3)",
                            textShadow: subSelected && subColor ? `0 0 8px ${subColor}88` : undefined,
                          }}
                        >
                          {subSelected && "› "}{sub.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
