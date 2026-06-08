/**
 * Journey Economics Formula Engine — JI-1.0 §7.3
 *
 * Measures cost, effort, savings and value across the full lifecycle.
 * 8 inputs, outcome-weighted. Failed outcomes produce low scores regardless of speed.
 */

import type { FormulaOutput, FormulaThresholds } from './formula-engine';
import { computeWeightedScore, classifyBand } from './formula-engine';

export interface JourneyEconomicsInput {
  /** Total duration in hours */
  totalDurationHours: number;
  /** Estimated effort hours (baseline) */
  estimatedEffortHours: number;
  /** Actual effort hours */
  actualEffortHours: number;
  /** Baseline duration hours (from template) */
  baselineDurationHours: number;
  /** Automation drag hours */
  automationDragHours: number;
  /** Human rescue intervention hours */
  humanRescueHours: number;
  /** Rework cost hours */
  reworkCostHours: number;
  /** Outcome classification (0 = failed, 50 = partial, 100 = successful) */
  outcomeValue: number;
}

export const JOURNEY_ECONOMICS_DEFAULT_WEIGHTS: Record<string, number> = {
  timeSaved: 0.25,
  effortEfficiency: 0.25,
  automationContribution: 0.20,
  outcomeValue: 0.30,
};

export const JOURNEY_ECONOMICS_DEFAULT_THRESHOLDS: FormulaThresholds = {
  green: 70,
  amber: 40,
};

/**
 * Computes journey economics score.
 * Failed outcomes dominate — a fast failure still scores poorly.
 */
export function computeJourneyEconomics(
  input: JourneyEconomicsInput,
  weights: Record<string, number> = JOURNEY_ECONOMICS_DEFAULT_WEIGHTS,
  thresholds: FormulaThresholds = JOURNEY_ECONOMICS_DEFAULT_THRESHOLDS,
): FormulaOutput {
  // Time saved: (baseline - actual) / baseline * 100, clamped 0-100
  const timeSaved = input.baselineDurationHours > 0
    ? Math.max(0, Math.min(100, ((input.baselineDurationHours - input.totalDurationHours) / input.baselineDurationHours) * 100))
    : 50;

  // Effort efficiency: (estimated - actual) / estimated * 100, clamped
  const effortEfficiency = input.estimatedEffortHours > 0
    ? Math.max(0, Math.min(100, ((input.estimatedEffortHours - input.actualEffortHours) / input.estimatedEffortHours) * 100 + 50))
    : 50;

  // Automation contribution: inverse of drag + rescue as fraction of total
  const totalFriction = input.automationDragHours + input.humanRescueHours + input.reworkCostHours;
  const automationContribution = input.totalDurationHours > 0
    ? Math.max(0, Math.min(100, (1 - totalFriction / input.totalDurationHours) * 100))
    : 50;

  const values: Record<string, number> = {
    timeSaved,
    effortEfficiency,
    automationContribution,
    outcomeValue: input.outcomeValue,
  };

  const { score, breakdown } = computeWeightedScore(values, weights);
  const band = classifyBand(score, thresholds);

  return { score, band, formulaFamily: 'journey-economics', formulaVersion: '1.0.0', breakdown };
}
