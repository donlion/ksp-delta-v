import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ksp-orange": "#e8760a",
        "ksp-dark": "#0a0e1a",
        "ksp-panel": "#0f1629",
        "ksp-border": "#1e2d4a",
      },
    },
  },
  plugins: [],
};

export default config;
