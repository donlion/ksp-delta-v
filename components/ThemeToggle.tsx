"use client";

import { useEffect, useRef, useState } from "react";

type ThemeName = "void" | "interstellar" | "spacex" | "bladerunner" | "hitchhiker";

const THEMES: {
  name: ThemeName;
  accent: string;
  label: string;
  tagline: string;
  darkLabel: string;
  lightLabel: string;
}[] = [
  { name: "void",         accent: "#bf2d1c", label: "HAL 9000",         tagline: "The void of space",          darkLabel: "Daylight",  lightLabel: "HAL Mode"  },
  { name: "interstellar", accent: "#c8a030", label: "Interstellar",     tagline: "Cold, clinical, precise",    darkLabel: "Day Cycle", lightLabel: "Deep Space" },
  { name: "spacex",       accent: "#3d8ef0", label: "SpaceX",           tagline: "Mission control telemetry",  darkLabel: "Day Mode",  lightLabel: "Starfield" },
  { name: "bladerunner",  accent: "#d4872a", label: "Blade Runner",     tagline: "Steampunk noir",             darkLabel: "1886",      lightLabel: "Daylight"  },
  { name: "hitchhiker",   accent: "#30d878", label: "Hitchhiker's Guide",tagline: "Don't Panic",               darkLabel: "Earth",     lightLabel: "The Void"  },
];

const VALID_NAMES = THEMES.map((t) => t.name);

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [themeName, setThemeName] = useState<ThemeName>("void");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("ksp-theme-name") as ThemeName | null;
    const storedMode = localStorage.getItem("ksp-theme-mode");
    const name: ThemeName =
      storedName && VALID_NAMES.includes(storedName) ? storedName : "void";
    const dark =
      storedMode === "dark" ||
      (storedMode !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setThemeName(name);
    setIsDark(dark);
  }, []);

  // Close on outside click
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  function toggleMode() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("light", !next);
    localStorage.setItem("ksp-theme-mode", next ? "dark" : "light");
  }

  function selectTheme(name: ThemeName) {
    const html = document.documentElement;
    THEMES.forEach((t) => html.classList.remove(`theme-${t.name}`));
    if (name !== "void") html.classList.add(`theme-${name}`);
    setThemeName(name);
    localStorage.setItem("ksp-theme-name", name);
    setIsOpen(false);
  }

  const theme = THEMES.find((t) => t.name === themeName)!;

  return (
    <div ref={containerRef} className="flex items-start gap-2 flex-shrink-0">

      {/* HAL eye — dark/light toggle */}
      <button
        onClick={toggleMode}
        className="hal-glow relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer flex-shrink-0 mt-0.5"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        style={{
          background: "radial-gradient(circle at 40% 38%, #3a0a08 0%, #0a0204 70%)",
          border: `1.5px solid ${theme.accent}66`,
        }}
      >
        <div className="absolute w-6 h-6 rounded-full"
          style={{ border: `1px solid ${theme.accent}44` }} />
        <div className="w-3.5 h-3.5 rounded-full"
          style={{
            background: `radial-gradient(circle at 38% 35%, ${theme.accent} 0%, color-mix(in srgb, ${theme.accent} 60%, black) 55%, #3a0a06 100%)`,
            boxShadow: `0 0 6px 2px ${theme.accent}80`,
          }} />
        <div className="absolute rounded-full"
          style={{ width: 5, height: 3, background: "rgba(255,200,180,0.55)",
            top: "26%", left: "30%", transform: "rotate(-15deg)", filter: "blur(0.5px)" }} />
      </button>

      {/* Theme dropdown */}
      <div style={{ position: "relative" }}>

        {/* Trigger */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className="flex items-center gap-2 cursor-pointer"
          style={{
            background: "var(--c-surface)",
            border: "1px solid var(--c-border)",
            padding: "6px 10px",
            minWidth: 172,
          }}
        >
          {/* Swatch */}
          <span
            className="inline-block rounded-full flex-shrink-0"
            style={{ width: 8, height: 8, background: theme.accent, boxShadow: `0 0 5px ${theme.accent}` }}
          />
          <span className="flex flex-col items-start flex-1 min-w-0 text-left">
            <span className="text-xs font-mono uppercase tracking-widest leading-tight"
              style={{ color: "var(--c-text)" }}>
              {theme.label}
            </span>
            <span className="font-mono leading-tight" style={{ fontSize: 9, color: "var(--c-text3)" }}>
              {isDark ? theme.darkLabel : theme.lightLabel}
            </span>
          </span>
          <span className="text-xs font-mono flex-shrink-0"
            style={{
              color: "var(--c-text3)",
              display: "inline-block",
              transform: isOpen ? "rotate(180deg)" : "none",
              transition: "transform 0.15s ease",
            }}>
            ▾
          </span>
        </button>

        {/* Dropdown list */}
        {isOpen && (
          <div
            role="listbox"
            style={{
              position: "absolute",
              top: "calc(100% + 2px)",
              right: 0,
              zIndex: 100,
              minWidth: "100%",
              background: "var(--c-surface)",
              border: "1px solid var(--c-border)",
              boxShadow: "0 12px 32px rgba(0,0,0,0.45)",
            }}
          >
            {THEMES.map((t) => {
              const sel = t.name === themeName;
              return (
                <button
                  key={t.name}
                  role="option"
                  aria-selected={sel}
                  onClick={() => selectTheme(t.name)}
                  className="flex items-center gap-2.5 w-full cursor-pointer text-left"
                  style={{
                    padding: "8px 10px",
                    background: sel ? `${t.accent}18` : "transparent",
                    borderBottom: "1px solid var(--c-border)",
                  }}
                >
                  <span
                    className="inline-block rounded-full flex-shrink-0"
                    style={{
                      width: 8, height: 8,
                      background: t.accent,
                      boxShadow: sel ? `0 0 5px ${t.accent}` : "none",
                    }}
                  />
                  <span className="flex flex-col flex-1 min-w-0">
                    <span className="text-xs font-mono uppercase tracking-widest leading-tight"
                      style={{ color: sel ? t.accent : "var(--c-text)" }}>
                      {t.label}
                    </span>
                    <span className="font-mono leading-tight" style={{ fontSize: 9, color: "var(--c-text3)" }}>
                      {t.tagline}
                    </span>
                  </span>
                  {sel && (
                    <span className="text-xs flex-shrink-0" style={{ color: t.accent }}>✓</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
