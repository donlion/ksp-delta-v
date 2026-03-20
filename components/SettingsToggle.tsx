"use client";

import { useEffect, useRef, useState } from "react";
import type { ScaleMode } from "@/lib/deltav-data";

interface Props {
  scaleMode: ScaleMode;
  onScaleChange: (mode: ScaleMode) => void;
}

interface ToggleOptionProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  description: string;
}

function ToggleOption({ checked, onChange, label, description }: ToggleOptionProps) {
  return (
    <label
      className="flex items-start gap-3 cursor-pointer"
      style={{ padding: "10px 12px" }}
    >
      <div style={{ position: "relative", flexShrink: 0, marginTop: 1 }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        />
        <div
          style={{
            width: 14,
            height: 14,
            border: `1.5px solid ${checked ? "var(--c-hal)" : "var(--c-border)"}`,
            background: checked ? "var(--c-hal)" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease",
          }}
        >
          {checked && (
            <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
              <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--c-text)" }}>
          {label}
        </span>
        <span className="font-mono leading-snug" style={{ fontSize: 9, color: "var(--c-text3)" }}>
          {description}
        </span>
      </div>
    </label>
  );
}

export default function SettingsToggle({ scaleMode, onScaleChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  function toggle(mode: Exclude<ScaleMode, "stock">) {
    onScaleChange(scaleMode === mode ? "stock" : mode);
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Settings"
        aria-expanded={isOpen}
        className="flex items-center justify-center cursor-pointer"
        style={{
          width: 34,
          height: 34,
          background: "var(--c-surface)",
          border: "1px solid var(--c-border)",
          color: isOpen ? "var(--c-text)" : "var(--c-text3)",
          transition: "color 0.15s ease",
        }}
      >
        {/* Gear icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isOpen ? "rotate(30deg)" : "none",
            transition: "transform 0.2s ease",
          }}
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 2px)",
            right: 0,
            zIndex: 100,
            minWidth: 240,
            background: "var(--c-surface)",
            border: "1px solid var(--c-border)",
            boxShadow: "0 12px 32px rgba(0,0,0,0.45)",
          }}
        >
          {/* Header */}
          <div
            className="px-3 py-2"
            style={{ borderBottom: "1px solid var(--c-border)" }}
          >
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--c-text3)" }}>
              Planet Pack
            </span>
          </div>

          <ToggleOption
            checked={scaleMode === "opm"}
            onChange={() => toggle("opm")}
            label="Outer Planets Mod"
            description="Adds Sarnus, Urlum, Neidon &amp; Plock systems"
          />
          <div style={{ height: 1, background: "var(--c-border)", margin: "0 12px" }} />
          <ToggleOption
            checked={scaleMode === "quarter"}
            onChange={() => toggle("quarter")}
            label="1/4 Scale (KSRSS)"
            description="Real Solar System at 1/4 size · ~4 750 m/s to orbit"
          />
          <ToggleOption
            checked={scaleMode === "rss"}
            onChange={() => toggle("rss")}
            label="Real Solar System"
            description="Full-scale RSS · ~9 400 m/s to orbit"
          />
        </div>
      )}
    </div>
  );
}
