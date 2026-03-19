"use client";

import { useEffect, useState } from "react";

interface NodeDef {
  x: number;
  y: number;
  label: string;
  r: number;
  stroke: string;
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
  kerbin:   { x: 460, y: 538, label: "Kerbin",  r: 18, stroke: "#4070d0", labelDir: "below" },
  lko:      { x: 460, y: 453, label: "LKO",     r: 7,  stroke: "#4060a0", labelDir: "right", isWaypoint: true },
  transfer: { x: 460, y: 353, label: "",         r: 5,  stroke: "#303858", isWaypoint: true },

  // Kerbin system
  mun:      { x: 278, y: 410, label: "Mun",     r: 14, stroke: "#909090" },
  minmus:   { x: 618, y: 410, label: "Minmus",  r: 12, stroke: "#50a060" },

  // Inner planets
  moho:     { x:  88, y: 263, label: "Moho",    r: 13, stroke: "#c8a050", labelDir: "above" },
  eve:      { x: 203, y: 263, label: "Eve",     r: 15, stroke: "#8050c0", labelDir: "above" },
  gilly:    { x: 128, y: 148, label: "Gilly",   r: 10, stroke: "#a070d0", labelDir: "above" },

  // Middle system
  duna:     { x: 358, y: 253, label: "Duna",    r: 14, stroke: "#c04040", labelDir: "above" },
  ike:      { x: 293, y: 143, label: "Ike",     r: 11, stroke: "#808080", labelDir: "above" },
  dres:     { x: 450, y: 193, label: "Dres",    r: 11, stroke: "#a0a0a0", labelDir: "above" },

  // Jool system
  jool:     { x: 653, y: 248, label: "Jool",    r: 16, stroke: "#40a030", labelDir: "above" },
  laythe:   { x: 788, y:  83, label: "Laythe",  r: 13, stroke: "#4080c0", labelDir: "above" },
  tylo:     { x: 838, y: 148, label: "Tylo",    r: 13, stroke: "#c0c080", labelDir: "right" },
  vall:     { x: 843, y: 223, label: "Vall",    r: 12, stroke: "#60b0b0", labelDir: "right" },
  bop:      { x: 838, y: 303, label: "Bop",     r: 11, stroke: "#806040", labelDir: "right" },
  pol:      { x: 818, y: 383, label: "Pol",     r: 10, stroke: "#c0a060", labelDir: "right" },

  // Outer system
  eeloo:    { x: 718, y: 428, label: "Eeloo",   r: 12, stroke: "#a0c0e0" },
};

// ── Edge connections ──────────────────────────────────────────────────────────
const EDGES: EdgeDef[] = [
  // Spine
  { from: "kerbin",   to: "lko",      color: "#4070d0", width: 3,   dvLabel: "3,400" },
  { from: "lko",      to: "transfer", color: "#4060a0", width: 2 },

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

// Selectable destinations
const DESTINATIONS = new Set([
  "mun", "minmus", "moho", "eve", "gilly", "duna", "ike",
  "dres", "jool", "laythe", "tylo", "vall", "bop", "pol", "eeloo",
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
  const [bloomed, setBloomed] = useState<Set<string>>(new Set());

  // Staggered colour bloom on mount — systems coming online
  useEffect(() => {
    const ids = Object.keys(NODES);
    ids.forEach((id, i) => {
      setTimeout(() => setBloomed((prev) => new Set([...prev, id])), i * 110);
    });
  }, []);

  return (
    <svg
      viewBox="0 0 920 570"
      className="select-none"
      style={{ width: "100%", minWidth: 760 }}
      aria-label="KSP Delta-V map"
    >
      <defs>
        <pattern id="dot-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="0.8" fill="var(--c-text3)" opacity="0.35" />
        </pattern>
      </defs>

      {/* Dot grid background */}
      <rect width="100%" height="100%" fill="url(#dot-grid)" />

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
              opacity={0.75}
            />
            {edge.dvLabel && (
              <>
                <rect
                  x={lx - labelW / 2} y={ly - 9}
                  width={labelW} height={13}
                  rx={2}
                  style={{ fill: "var(--c-surface)" }}
                  opacity={0.95}
                />
                <text
                  x={lx} y={ly}
                  textAnchor="middle" dominantBaseline="middle"
                  style={{ fill: edge.color }}
                  fontSize={11}
                  fontFamily="var(--font-space-mono), 'Courier New', monospace"
                  opacity={0.9}
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
        const isBloomed = bloomed.has(id);
        const nodeColor = isBloomed ? node.stroke : "#3a3d46";

        // Label color
        const labelFill = isSel
          ? "var(--c-text)"
          : isHov
          ? "var(--c-text)"
          : node.isWaypoint
          ? "var(--c-text3)"
          : "var(--c-text2)";

        return (
          <g
            key={id}
            onClick={() => isDest && onSelect(id)}
            onMouseEnter={() => isDest && setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: isDest ? "pointer" : "default" }}
          >
            {/* Selection glow rings */}
            {isSel && (
              <>
                <circle cx={node.x} cy={node.y} r={node.r + 12} fill="none" stroke={nodeColor} strokeWidth={1} opacity={0.12} />
                <circle cx={node.x} cy={node.y} r={node.r + 7}  fill="none" stroke={nodeColor} strokeWidth={1.5} opacity={0.4} />
              </>
            )}

            {/* Hover ring */}
            {isHov && !isSel && (
              <circle
                cx={node.x} cy={node.y} r={node.r + 4}
                fill="none"
                stroke={nodeColor}
                strokeWidth={1.5}
                opacity={0.45}
              />
            )}

            {/* Body circle */}
            <circle
              cx={node.x} cy={node.y} r={node.r}
              style={{
                fill: isSel ? nodeColor + "28" : "var(--c-bg)",
                stroke: nodeColor,
                transition: "stroke 0.6s ease",
              }}
              strokeWidth={isSel ? 2.5 : 1.5}
              opacity={node.isWaypoint ? 0.45 : 1}
            />

            {/* Inner dot */}
            {!node.isWaypoint && (
              <circle
                cx={node.x} cy={node.y}
                r={node.r * 0.32}
                style={{ fill: isSel ? "#fff" : nodeColor, transition: "fill 0.6s ease" }}
                opacity={0.7}
              />
            )}

            {/* Label */}
            {node.label && (
              <text
                x={lp.x} y={lp.y}
                textAnchor={lp.anchor}
                dominantBaseline="middle"
                style={{ fill: labelFill }}
                fontSize={isSel ? 13 : 12}
                fontWeight={isSel ? "700" : "400"}
                fontFamily="var(--font-space-grotesk), system-ui, sans-serif"
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
