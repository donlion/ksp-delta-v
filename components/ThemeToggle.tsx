"use client";

import { useEffect, useState } from "react";

type ThemeName = "void" | "interstellar" | "spacex" | "bladerunner" | "hitchhiker";

const THEMES: {
  name: ThemeName;
  accent: string;
  darkLabel: string;
  lightLabel: string;
}[] = [
  { name: "void",         accent: "#bf2d1c", darkLabel: "Daylight",  lightLabel: "HAL Mode"   },
  { name: "interstellar", accent: "#c8a030", darkLabel: "Day Cycle", lightLabel: "Deep Space" },
  { name: "spacex",       accent: "#c0392b", darkLabel: "Day Mode",  lightLabel: "Starfield"  },
  { name: "bladerunner",  accent: "#00c8ff", darkLabel: "2049",      lightLabel: "Neon Rain"  },
  { name: "hitchhiker",   accent: "#30d878", darkLabel: "Earth",     lightLabel: "The Void"   },
];

const VALID_NAMES = THEMES.map((t) => t.name);

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [themeName, setThemeName] = useState<ThemeName>("void");

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
  }

  const theme = THEMES.find((t) => t.name === themeName)!;

  return (
    <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
      {/* HAL eye — toggles dark/light */}
      <button
        onClick={toggleMode}
        className="hal-glow relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        style={{
          background: "radial-gradient(circle at 40% 38%, #3a0a08 0%, #0a0204 70%)",
          border: `1.5px solid ${theme.accent}66`,
        }}
      >
        {/* Outer iris ring */}
        <div
          className="absolute w-6 h-6 rounded-full"
          style={{ border: `1px solid ${theme.accent}44` }}
        />
        {/* Inner pupil */}
        <div
          className="w-3.5 h-3.5 rounded-full"
          style={{
            background: `radial-gradient(circle at 38% 35%, ${theme.accent} 0%, color-mix(in srgb, ${theme.accent} 60%, black) 55%, #3a0a06 100%)`,
            boxShadow: `0 0 6px 2px ${theme.accent}80`,
          }}
        />
        {/* Specular highlight */}
        <div
          className="absolute rounded-full"
          style={{
            width: 5,
            height: 3,
            background: "rgba(255,200,180,0.55)",
            top: "26%",
            left: "30%",
            transform: "rotate(-15deg)",
            filter: "blur(0.5px)",
          }}
        />
      </button>

      {/* Mode label */}
      <span
        className="text-xs font-mono tracking-widest uppercase transition-colors"
        style={{ color: "var(--c-text3)" }}
      >
        {isDark ? theme.darkLabel : theme.lightLabel}
      </span>

      {/* Theme dot selector */}
      <div className="flex items-center gap-1.5">
        {THEMES.map((t) => {
          const sel = t.name === themeName;
          return (
            <button
              key={t.name}
              onClick={() => selectTheme(t.name)}
              aria-label={`${t.name} theme`}
              aria-pressed={sel}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: t.accent,
                border: "none",
                padding: 0,
                cursor: "pointer",
                flexShrink: 0,
                opacity: sel ? 1 : 0.38,
                boxShadow: sel
                  ? `0 0 0 2px ${t.accent}55, 0 0 6px ${t.accent}88`
                  : "none",
                transition: "opacity 0.2s ease, box-shadow 0.2s ease",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
