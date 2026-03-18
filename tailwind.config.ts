import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CSS-variable-backed theme tokens
        "void-bg":      "var(--c-bg)",
        "void-surface": "var(--c-surface)",
        "void-border":  "var(--c-border)",
        "void-input":   "var(--c-input)",
        "void-text":    "var(--c-text)",
        "void-text2":   "var(--c-text2)",
        "void-text3":   "var(--c-text3)",
        "hal-red":      "var(--c-hal)",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "'Courier New'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
