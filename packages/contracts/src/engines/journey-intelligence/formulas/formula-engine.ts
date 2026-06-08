/**
 * Formula Engine Framework — Journey Intelligence
 *
 * Shared types and utilities for the 10 formula families.
 *
 * Source: docs/00_authority/JOURNEY_INTELLIGENCE.md (JI-1.0) §7
 * Domain: D-47 Journey Intelligence
 * Build unit: Unit 51
 */

/** The 10 formula family names */
export const FORMULA_FAMILIES = [
  'journey-quality',
  'journey-complexity',
  'journey-economics',
  'lifecycle-savings',
  'automation-opportunity',
  'automation-friction',
  'automation-maturity',
  'journey-confidence',
  'leakage-risk',
  'rework-risk',
] as const;
export type FormulaFamily = typeof FORMULA_FAMILIES[number];

/** Traffic-light band classification */
export type Band = 'green' | 'amber' | 'red';

/** Threshold configuration for band classification */
export interface FormulaThresholds {
  /** Score at or above this = green */
  green: number;
  /** Score at or above this = amber (below green) */
  amber: number;
  /** Below amber = red (explicit red threshold optional) */
  red?: number;
}

/** Inverted thresholds: lower is better (e.g., friction, complexity) */
export interface InvertedFormulaThresholds {
  /** Score at or below this = green (low = good) */
  green: number;
  /** Score at or below this = amber */
  amber: number;
  /** Above amber = red */
  red?: number;
}

/** Generic formula input — weighted inputs */
export interface FormulaInput {
  /** Input values keyed by metric name (0–100 normalised) */
  values: Record<string, number>;
  /** Weights per input (must sum to ~1.0) */
  weights: Record<string, number>;
}

/** Generic formula output */
export interface FormulaOutput {
  /** Computed score (0–100) */
  score: number;
  /** Band classification */
  band: Band;
  /** Which formula family produced this */
  formulaFamily: FormulaFamily;
  /** Formula version */
  formulaVersion: string;
  /** Input breakdown for explainability */
  breakdown: Record<string, { value: number; weight: number; contribution: number }>;
}

/**
 * Computes a weighted score from normalised inputs.
 * All inputs should be 0–100. Weights should sum to ~1.0.
 *
 * @param values - Input values (0–100)
 * @param weights - Weights per input
 * @returns Weighted score (0–100)
 */
export function computeWeightedScore(
  values: Record<string, number>,
  weights: Record<string, number>,
): { score: number; breakdown: Record<string, { value: number; weight: number; contribution: number }> } {
  const breakdown: Record<string, { value: number; weight: number; contribution: number }> = {};
  let score = 0;

  for (const [key, weight] of Object.entries(weights)) {
    const value = values[key] ?? 0;
    const contribution = value * weight;
    score += contribution;
    breakdown[key] = { value, weight, contribution };
  }

  // Clamp to 0–100
  score = Math.max(0, Math.min(100, score));

  return { score, breakdown };
}

/**
 * Classifies a score into a band using standard thresholds.
 * Higher is better (green >= threshold, amber >= threshold, else red).
 */
export function classifyBand(score: number, thresholds: FormulaThresholds): Band {
  if (score >= thresholds.green) return 'green';
  if (score >= thresholds.amber) return 'amber';
  return 'red';
}

/**
 * Classifies a score into a band using inverted thresholds.
 * Lower is better (green <= threshold, amber <= threshold, else red).
 */
export function classifyBandInverted(score: number, thresholds: InvertedFormulaThresholds): Band {
  if (score <= thresholds.green) return 'green';
  if (score <= thresholds.amber) return 'amber';
  return 'red';
}
