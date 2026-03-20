# CLAUDE.md — Claude-specific context for ksp-delta-v

## Quick Reference

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build (verify before pushing)
npm run lint     # ESLint
```

There are no tests. The project deploys as a static export to GitHub Pages.

## What This Is

An interactive KSP 1 delta-v mission planner. A single-page Next.js 15 / React 19 / TypeScript app with Tailwind CSS and a CSS-variable-based multi-theme system. Users pick a destination, configure mission options, and see a leg-by-leg delta-v breakdown.

Planet packs: Stock, OPM (Outer Planets Mod), RSS (Real Solar System), KSRSS (1/4 Scale).

## Architecture at a Glance

```
app/page.tsx          ← All state lives here, passed as props
app/layout.tsx        ← Fonts, metadata, anti-flash theme script
app/globals.css       ← All theme CSS variables and animations
components/*.tsx      ← Client components ("use client")
lib/deltav-data.ts    ← Destination data, routing, types
lib/destination-tips.ts ← Per-body field notes
```

State flows one way: `page.tsx` → components. No state library. URL query params and localStorage for persistence.

## Conventions to Follow

### TypeScript

- Strict mode is on. Do not add `@ts-ignore` or `any` unless truly unavoidable.
- Export types/interfaces from `lib/` files. Import with `import type { ... }` where possible.
- Constants: `UPPER_SNAKE_CASE`. Variables/functions: `camelCase`. Types: `PascalCase`.

### React

- All components are client components (`"use client"`).
- Default exports for components. Named exports for data/utilities.
- Props via `interface Props` defined above the component.
- No class components.

### Styling

- Tailwind for layout, spacing, typography.
- CSS variables (`var(--c-*)`) for all theme-dependent colors — either through Tailwind tokens (`text-void-text`, `bg-void-surface`) or inline `style` attributes.
- Never hardcode colors for UI chrome. Body accent colors in `BODY_COLORS` are the one exception.
- New UI must look correct across all themes (Void, Interstellar, SpaceX, Blade Runner, Hitchhiker) in both light and dark modes.

### File Organization

- Components go in `components/` as PascalCase `.tsx` files.
- Data and pure logic go in `lib/` as kebab-case `.ts` files.
- Section dividers in long files: `// ── Section ────────────────────────`

### Comments

- JSDoc on exported functions and interfaces.
- No narration comments. Only explain non-obvious logic, domain knowledge, or trade-offs.
- Inline `eslint-disable-line` is acceptable where deps are intentionally omitted from hooks.

## Domain Knowledge

### Delta-v Data Model

Each `Destination` has an ordered `legs` array representing the one-way trip from Kerbin (or Earth) surface to the destination. Each `Leg` has `from`, `to`, `deltaV` (m/s), and optional `canAerobrake`.

Routing between arbitrary bodies uses three strategies:
1. **Same-system**: Direct lookup in `INTRA_SYSTEM_DV` (key: sorted IDs joined with `|`)
2. **Cross-system moons**: `INTER_SYSTEM_DV` for planet-to-planet + `getMoonToParentDV` for each moon's local cost
3. **Fallback**: Common-prefix algorithm on the legs arrays

### Important Constraints

- `INTRA_SYSTEM_DV` and `INTER_SYSTEM_DV` keys MUST be alphabetically sorted: `"bop|laythe"`, not `"laythe|bop"`.
- Gas giants have no `surfaceGravity` — this is the signal that "orbit-only" is the only option.
- Eeloo has two entries (`eeloo` for Stock, `eeloo-opm` for OPM as a Sarnus moon). The page auto-swaps between them on scale mode change.
- RSS and KSRSS destinations use `rssOnly` and `quarterScaleOnly` flags — they are filtered by `scaleMode`.
- All delta-v values are propulsive-only. `canAerobrake` is informational metadata.

### Theming

5 themes × 2 modes = 10 visual configurations. All controlled by CSS classes on `:root`:
- Theme: none (Void default), `.theme-interstellar`, `.theme-spacex`, `.theme-bladerunner`, `.theme-hitchhiker`
- Mode: none (dark default), `.light`

Token variables: `--c-bg`, `--c-surface`, `--c-border`, `--c-input`, `--c-text`, `--c-text2`, `--c-text3`, `--c-hal`, `--c-hal-dim`.

Each theme also overrides font families via CSS (e.g. Blade Runner uses Cinzel + Playfair Display).

## Common Tasks

### Adding a new celestial body

1. Add the `Destination` entry to `DESTINATIONS` in `lib/deltav-data.ts` with accurate legs data.
2. Add a color entry to `BODY_COLORS`.
3. If the body is a moon, add it to `MOON_PARENT_PLANET`.
4. If same-system transfers exist, add entries to `INTRA_SYSTEM_DV` (alphabetically sorted keys).
5. Optionally add tips to `lib/destination-tips.ts`.
6. The SVG map in `DeltaVMap.tsx` may need a new node and connecting edges.

### Adding a new theme

1. Add dark and light CSS variable blocks in `globals.css`.
2. Add the theme name to the `THEMES` array in `ThemeToggle.tsx`.
3. If the theme uses custom fonts, load them in `layout.tsx` and set font-family overrides in `globals.css`.
4. Update the anti-flash script in `layout.tsx` to include the new theme name in the validation array.

### Adding a new planet pack / scale mode

1. Add the mode to the `ScaleMode` type in `lib/deltav-data.ts`.
2. Add destinations with the appropriate `*Only` flag.
3. Update the filter logic in `page.tsx` (`activeDestinations`).
4. Update `SettingsToggle.tsx` with the new option.
5. Add any new `DestinationGroup` entries.

## Gotchas

- The anti-flash `<script>` in `layout.tsx` is an inline IIFE that must stay synchronous and small. It runs before React hydrates.
- `DeltaVMap.tsx` is a large hand-crafted SVG component. Node positions are hardcoded pixel values for each planet pack layout.
- The Jool→Laythe route bypasses Low Jool Orbit via a direct SOI-entry aerocapture. This breaks the common-prefix algorithm, so `jool|laythe` is hardcoded in `INTRA_SYSTEM_DV`.
- `next.config.ts` conditionally sets `basePath: "/ksp-delta-v"` when `GITHUB_PAGES=true`. Dev always uses root path.
- No API routes — everything is client-side. The `output: "export"` config enforces this.
