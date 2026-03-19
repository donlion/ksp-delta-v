"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  opmEnabled: boolean;
  onToggleOpm: (enabled: boolean) => void;
}

export default function SettingsToggle({ opmEnabled, onToggleOpm }: Props) {
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
            minWidth: 220,
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
              Settings
            </span>
          </div>

          {/* OPM toggle */}
          <label
            className="flex items-start gap-3 cursor-pointer"
            style={{ padding: "10px 12px" }}
          >
            {/* Checkbox */}
            <div style={{ position: "relative", flexShrink: 0, marginTop: 1 }}>
              <input
                type="checkbox"
                checked={opmEnabled}
                onChange={(e) => {
                  onToggleOpm(e.target.checked);
                  setIsOpen(false);
                }}
                style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
              />
              <div
                style={{
                  width: 14,
                  height: 14,
                  border: `1.5px solid ${opmEnabled ? "var(--c-hal)" : "var(--c-border)"}`,
                  background: opmEnabled ? "var(--c-hal)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s ease",
                }}
              >
                {opmEnabled && (
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                    <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>

            {/* Label */}
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--c-text)" }}>
                Outer Planets Mod
              </span>
              <span className="font-mono leading-snug" style={{ fontSize: 9, color: "var(--c-text3)" }}>
                Adds Sarnus, Urlum, Neidon &amp; Plock systems
              </span>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}
