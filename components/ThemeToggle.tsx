"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("ksp-theme");
    const dark = stored !== "light";
    setIsDark(dark);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("light", !next);
    localStorage.setItem("ksp-theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      className="flex flex-col items-center gap-1.5 cursor-pointer group flex-shrink-0"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* HAL 9000 eye */}
      <div
        className="hal-glow relative w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 40% 38%, #3a0a08 0%, #0a0204 70%)",
          border: "1.5px solid rgba(191,45,28,0.4)",
        }}
      >
        {/* Outer iris ring */}
        <div
          className="absolute w-6 h-6 rounded-full"
          style={{
            border: "1px solid rgba(191,45,28,0.3)",
          }}
        />
        {/* Inner pupil */}
        <div
          className="w-3.5 h-3.5 rounded-full"
          style={{
            background: "radial-gradient(circle at 38% 35%, #e84030 0%, #8a1a10 55%, #3a0a06 100%)",
            boxShadow: "0 0 6px 2px rgba(191,45,28,0.5)",
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
      </div>
      <span
        className="text-xs font-mono tracking-widest uppercase transition-colors"
        style={{ color: "var(--c-text3)" }}
      >
        {isDark ? "Daylight" : "HAL Mode"}
      </span>
    </button>
  );
}
