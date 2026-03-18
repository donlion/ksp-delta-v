"use client";

import { useState } from "react";

interface NodeDef {
  x: number;
  y: number;
  label: string;
  r: number;
  stroke: string;
  fill: string;
  /** Where to place the label relative to the circle */
  labelDir?: "above" | "below" | "left" | "right";
  isWaypoint?: boolean;
}

interface EdgeDef {
  from: string;
  to: string;
  color: string;
  width?: number;
  dvLabel?: string;
  /** 0–1 fraction along the edge where the label sits (default 0.5) */
  labelAt?: number;
}

// ── Node positions ────────────────────────────────────────────────────────────
// SVG viewBox: 0 0 920 570
const NODES: Record<string, NodeDef> = {
  // Spine
  kerbin:   { x: 460, y: 538, label: "Kerbin",  r: 18, stroke: "#4070d0", fill: "#0a1230", labelDir: "below" },
  lko:      { x: 460, y: 453, label: "LKO",     r: 7,  stroke: "#6070a0", fill: "#0d1028", labelDir: "right", isWaypoint: true },
  transfer: { x: 460, y: 353, label: "",         r: 5,  stroke: "#404060", fill: "#0d1028", isWaypoint: true },

  // Kerbin system
  mun:      { x: 278, y: 410, label: "Mun",     r: 14, stroke: "#909090", fill: "#111118" },
  minmus:   { x: 618, y: 410, label: "Minmus",  r: 12, stroke: "#50a060", fill: "#0a1810" },

  // Inner planets
  moho:     { x:  88, y: 263, label: "Moho",    r: 13, stroke: "#c8a050", fill: "#18100a", labelDir: "above" },
  eve:      { x: 203, y: 263, label: "Eve",     r: 15, stroke: "#8050c0", fill: "#12082a", labelDir: "above" },
  gilly:    { x: 128, y: 148, label: "Gilly",   r: 10, stroke: "#a070d0", fill: "#12082a", labelDir: "above" },

  // Middle system
  duna:     { x: 358, y: 253, label: "Duna",    r: 14, stroke: "#c04040", fill: "#180808", labelDir: "above" },
  ike:      { x: 293, y: 143, label: "Ike",     r: 11, stroke: "#808080", fill: "#111118", labelDir: "above" },
  dres:     { x: 450, y: 193, label: "Dres",    r: 11, stroke: "#a0a0a0", fill: "#111118", labelDir: "above" },

  // Jool system
  jool:     { x: 653, y: 248, label: "Jool",    r: 16, stroke: "#40a030", fill: "#081808", labelDir: "above" },
  laythe:   { x: 788, y:  83, label: "Laythe",  r: 13, stroke: "#4080c0", fill: "#0a1220", labelDir: "above" },
  tylo:     { x: 838, y: 148, label: "Tylo",    r: 13, stroke: "#c0c080", fill: "#181808", labelDir: "right" },
  vall:     { x: 843, y: 223, label: "Vall",    r: 12, stroke: "#60b0b0", fill: "#081818", labelDir: "right" },
  bop:      { x: 838, y: 303, label: "Bop",     r: 11, stroke: "#806040", fill: "#100800", labelDir: "right" },
  pol:      { x: 818, y: 383, label: "Pol",     r: 10, stroke: "#c0a060", fill: "#181000", labelDir: "right" },

  // Outer system
  eeloo:    { x: 718, y: 428, label: "Eeloo",   r: 12, stroke: "#a0c0e0", fill: "#0a1220" },
};

// ── Edge connections ──────────────────────────────────────────────────────────
// dvLabel = delta-v (m/s) to get from parent orbit to this body's orbit
const EDGES: EdgeDef[] = [
  // Spine
  { from: "kerbin",   to: "lko",      color: "#4070d0", width: 3,   dvLabel: "3,400" },
  { from: "lko",      to: "transfer", color: "#5060a0", width: 2 },

  // Kerbin system
  { from: "lko",      to: "mun",      color: "#808080", width: 2,   dvLabel: "1,170", labelAt: 0.55 },
  { from: "lko",      to: "minmus",   color: "#50a060", width: 2,   dvLabel: "1,090", labelAt: 0.55 },

  // Inner planets
  { from: "transfer", to: "moho",     color: "#c8a050", width: 2,   dvLabel: "3,170", labelAt: 0.42 },
  { from: "transfer", to: "eve",      color: "#8050c0", width: 2,   dvLabel: "2,380", labelAt: 0.42 },
  { from: "eve",      to: "gilly",    color: "#a070d0", width: 1.5, dvLabel: "90" },

  // Middle system
  { from: "transfer", to: "duna",     color: "#c04040", width: 2,   dvLabel: "1,440", labelAt: 0.42 },
  { from: "duna",     to: "ike",      color: "#808080", width: 1.5, dvLabel: "210" },
  { from: "transfer", to: "dres",     color: "#a0a0a0", width: 2,   dvLabel: "1,900", labelAt: 0.42 },

  // Jool system
  { from: "transfer", to: "jool",     color: "#40a030", width: 2.5, dvLabel: "4,735", labelAt: 0.45 },
  { from: "jool",     to: "laythe",   color: "#4080c0", width: 1.5, dvLabel: "1,510", labelAt: 0.45 },
  { from: "jool",     to: "tylo",     color: "#c0c080", width: 1.5, dvLabel: "1,500", labelAt: 0.45 },
  { from: "jool",     to: "vall",     color: "#60b0b0", width: 1.5, dvLabel: "1,380", labelAt: 0.45 },
  { from: "jool",     to: "bop",      color: "#806040", width: 1.5, dvLabel: "3,100", labelAt: 0.45 },
  { from: "jool",     to: "pol",      color: "#c0a060", width: 1.5, dvLabel: "3,640", labelAt: 0.45 },

  // Outer system
  { from: "transfer", to: "eeloo",    color: "#a0c0e0", width: 2,   dvLabel: "3,100", labelAt: 0.4 },
];

// These IDs must match destination ids in deltav-data.ts
// Jool is a gas giant (parent node only) — not a selectable destination
const DESTINATIONS = new Set([
  "mun", "minmus", "moho", "eve", "gilly", "duna", "ike",
  "dres", "laythe", "tylo", "vall", "bop", "pol", "eeloo",
]);

function labelPos(node: NodeDef): { x: number; y: number; anchor: "middle" | "start" | "end" } {
  const pad = node.r + 12;
  switch (node.labelDir) {
    case "above": return { x: node.x,       y: node.y - node.r - 5, anchor: "middle" };
    case "left":  return { x: node.x - pad, y: node.y + 4,          anchor: "end" };
    case "right": return { x: node.x + pad, y: node.y + 4,          anchor: "start" };
    default:      return { x: node.x,       y: node.y + pad,         anchor: "middle" };
  }
}

interface Props {
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function DeltaVMap({ selected, onSelect }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <svg
      viewBox="0 0 920 570"
      className="select-none"
      style={{ width: "100%", minWidth: 760 }}
      aria-label="KSP Delta-V map"
    >
      {/* ── Edges ── */}
      {EDGES.map((edge, i) => {
        const f = NODES[edge.from];
        const t = NODES[edge.to];
        if (!f || !t) return null;

        const p = edge.labelAt ?? 0.5;
        const lx = f.x + p * (t.x - f.x);
        const ly = f.y + p * (t.y - f.y);
        const labelW = edge.dvLabel ? Math.max(28, edge.dvLabel.length * 6 + 10) : 0;

        return (
          <g key={i}>
            <line
              x1={f.x} y1={f.y} x2={t.x} y2={t.y}
              stroke={edge.color}
              strokeWidth={edge.width ?? 2}
              strokeLinecap="round"
              opacity={0.85}
            />
            {edge.dvLabel && (
              <>
                <rect
                  x={lx - labelW / 2} y={ly - 9}
                  width={labelW} height={13}
                  rx={3}
                  fill="rgba(8,12,24,0.9)"
                />
                <text
                  x={lx} y={ly}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={edge.color}
                  fontSize={10}
                  fontFamily="'Courier New', monospace"
                >
                  {edge.dvLabel}
                </text>
              </>
            )}
          </g>
        );
      })}

      {/* ── Nodes ── */}
      {Object.entries(NODES).map(([id, node]) => {
        const isDest    = DESTINATIONS.has(id);
        const isSel     = selected === id;
        const isHov     = hovered  === id;
        const lp        = labelPos(node);

        return (
          <g
            key={id}
            onClick={() => isDest && onSelect(id)}
            onMouseEnter={() => isDest && setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: isDest ? "pointer" : "default" }}
          >
            {/* Selection glow */}
            {isSel && (
              <>
                <circle cx={node.x} cy={node.y} r={node.r + 12} fill="none" stroke={node.stroke} strokeWidth={1} opacity={0.15} />
                <circle cx={node.x} cy={node.y} r={node.r + 7}  fill="none" stroke={node.stroke} strokeWidth={2} opacity={0.45} />
              </>
            )}

            {/* Hover ring */}
            {isHov && !isSel && (
              <circle
                cx={node.x} cy={node.y} r={node.r + 4}
                fill="none"
                stroke={node.stroke}
                strokeWidth={1.5}
                opacity={0.5}
              />
            )}

            {/* Body circle */}
            <circle
              cx={node.x} cy={node.y} r={node.r}
              fill={isSel ? node.stroke + "28" : node.fill}
              stroke={node.stroke}
              strokeWidth={isSel ? 2.5 : 1.5}
              opacity={node.isWaypoint ? 0.55 : 1}
            />

            {/* Inner dot (mimics the delta-v map icon style) */}
            {!node.isWaypoint && (
              <circle
                cx={node.x} cy={node.y}
                r={node.r * 0.32}
                fill={isSel ? "#fff" : node.stroke}
                opacity={0.75}
              />
            )}

            {/* Label */}
            {node.label && (
              <text
                x={lp.x} y={lp.y}
                textAnchor={lp.anchor}
                dominantBaseline="middle"
                fill={isSel ? "#ffffff" : isHov ? "#ffffff" : node.isWaypoint ? "#6070a0" : "#b8c8d8"}
                fontSize={isSel ? 12 : 11}
                fontWeight={isSel ? "700" : "400"}
                fontFamily="system-ui, sans-serif"
              >
                {node.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
