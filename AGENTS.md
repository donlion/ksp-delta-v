# AGENTS.md — AI Agent Guidelines for ksp-delta-v

## Project Overview

KSP Delta-V Planner — an interactive web app for planning missions in Kerbal Space Program 1. Users select a destination body, optionally set an origin and mission options (return trip, orbit-only, safety margin), and get a leg-by-leg delta-v breakdown. Supports Stock, Outer Planets Mod (OPM), Real Solar System (RSS), and 1/4 Scale (KSRSS) planet packs.

Live site: GitHub Pages static export.

## Tech Stack

- **Framework**: Next.js 15 (App Router) with React 19
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 3.4 + CSS custom properties for theming
- **Build**: Next.js (Turbopack in dev, static export for production)
- **Deploy**: GitHub Pages via GitHub Actions (push to `main`)
- **Linting**: ESLint 9 with `eslint-config-next`
- **No test framework** — there are no tests currently

## Directory Structure

```
app/             → Next.js App Router (routes, layout, globals)
components/      → React components (PascalCase filenames)
lib/             → Data and pure logic (kebab-case filenames)
.github/         → CI/CD workflows
.claude/         → Claude Code dev server config
```

## Code Conventions

### Naming

| Kind | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `DeltaVMap`, `MissionPanel` |
| Component files | PascalCase `.tsx` | `DeltaVMap.tsx` |
| Lib files | kebab-case `.ts` | `deltav-data.ts` |
| Interfaces / Types | PascalCase | `Destination`, `Leg`, `ScaleMode` |
| Constants | UPPER_SNAKE_CASE | `DESTINATIONS`, `INTRA_SYSTEM_DV` |
| Variables / Functions | camelCase | `scaleMode`, `handleRescaleChange` |

### Imports

- Use the `@/*` path alias (maps to project root): `import Foo from "@/components/Foo"`
- Separate type imports: `import type { ScaleMode } from "@/lib/deltav-data"`

### Components

- Client components use `"use client"` directive at the top of the file
- Default exports for all components
- Props typed via `interface Props` (or inline for small components)
- Theme-dependent values use inline `style={{ color: "var(--c-hal)" }}` — Tailwind for layout

### Comments

- Section dividers: `// ── Section name ────────────────────────────────────────────`
- JSDoc for exported functions and interfaces
- No obvious/redundant comments — only explain non-obvious intent or domain logic

## Theming System

CSS custom properties in `globals.css` define all theme tokens (`--c-bg`, `--c-surface`, `--c-border`, `--c-input`, `--c-text`, `--c-text2`, `--c-text3`, `--c-hal`, `--c-hal-dim`). Themes are applied as classes on `:root` (e.g. `.theme-interstellar`, `.theme-spacex`, `.theme-bladerunner`, `.theme-hitchhiker`). Light/dark mode via `.light` class on `<html>`.

Available themes: Void (default/HAL 9000), Interstellar, SpaceX, Blade Runner, Hitchhiker's Guide.

An anti-flash script in `layout.tsx` reads `localStorage` and applies theme classes before first paint to prevent FOUC.

Tailwind tokens (e.g. `text-void-text`, `bg-void-surface`) are backed by these CSS variables in `tailwind.config.ts`.

## Domain Model

### Key Data Structures (`lib/deltav-data.ts`)

- **`Destination`**: A celestial body with id, name, group, description, difficulty, science multiplier, ISRU viability, surface gravity, and an ordered array of `Leg` entries from Kerbin/Earth surface to the body
- **`Leg`**: A single maneuver segment with `from`, `to`, `deltaV` (m/s), and optional `canAerobrake`
- **`ScaleMode`**: `"stock" | "opm" | "rss" | "quarter"`

### Routing Logic

1. **Same-system transfers**: Lookup in `INTRA_SYSTEM_DV` (keyed by sorted body IDs joined with `|`)
2. **Cross-system moon-to-moon**: `INTER_SYSTEM_DV` planet-to-planet cost + `getMoonToParentDV` for each moon
3. **Default**: Common-prefix algorithm — shared legs from Kerbin to a common waypoint are subtracted

### Delta-v Data Integrity

All delta-v values are sourced from the KSP community delta-v map and mod-specific references (Kowgan OPM SVG, blaarkies calculator). When modifying or adding destinations:

- Values are in **m/s**, propulsive only (no aerobraking savings in the default path)
- `canAerobrake: true` flags are informational — the planner shows both propulsive and aerobrake-capable legs
- `INTRA_SYSTEM_DV` keys must be alphabetically sorted: `"bop|laythe"` not `"laythe|bop"`
- Gas giants (Jool, Sarnus, Urlum, Neidon) have no `surfaceGravity` — this signals "no surface landing"

## State Management

All state lives in `app/page.tsx` via `useState` hooks and is passed down as props. No external state library.

- **URL sync**: `useEffect` writes state to URL query params via `history.replaceState` (`?d=`, `?o=`, `?r=`, `?lko=`, `?orb=`, `?margin=`, `?scale=`)
- **localStorage**: Theme name, theme mode, scale mode, and rescale factor persist across sessions
- **Keyboard**: Arrow keys cycle through destinations

## Build & Deploy

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |

Production deploys automatically on push to `main`. The GitHub Actions workflow sets `GITHUB_PAGES=true`, which triggers static export with `/ksp-delta-v` base path and unoptimized images.

## Guidelines for Changes

1. **Preserve theme compatibility** — any new UI must work across all 5 themes in both light and dark modes. Use the CSS variable tokens, not hardcoded colors (exception: body-specific accent colors in `BODY_COLORS`).
2. **Keep the single-page architecture** — this is a focused tool, not a multi-page app. All state flows from `page.tsx`.
3. **Delta-v accuracy matters** — this is a reference tool. Any changes to numerical data should cite a source (community map, mod documentation, or calculated from orbital parameters).
4. **Mobile-first** — the layout must remain usable on small screens. The map panel scrolls horizontally on mobile.
5. **No unnecessary dependencies** — the project has zero runtime dependencies beyond Next.js, React, and React DOM. Prefer vanilla solutions.
6. **Static export** — all features must work as a static site (no server-side APIs, no ISR, no dynamic routes).
