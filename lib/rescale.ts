/** Linear system scale factor: Δv multiplies by √factor (see Settings). */
export const RESCALE_MIN = 0.1;
export const RESCALE_MAX = 100;

const DEFAULT_EPS = 1e-6;

/**
 * Whether the factor is effectively 1× (no rescale in URL, storage, or UI).
 */
export function isDefaultRescale(v: number): boolean {
  return Math.abs(v - 1) < DEFAULT_EPS;
}

/**
 * Clamps a finite user input to the allowed rescale range.
 */
export function clampRescale(v: number): number {
  if (!Number.isFinite(v)) return 1;
  return Math.min(RESCALE_MAX, Math.max(RESCALE_MIN, v));
}
