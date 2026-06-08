/**
 * Lifecycle Savings Formula Engine — JI-1.0 §7.4
 *
 * Measures time saved versus baseline per OODA phase.
 * Negative savings (slower than baseline) correctly reported.
 * Phase weights applied.
 */

import type { FormulaOutput, FormulaThresholds } from './formula-engine';
import { computeWeightedScore, classifyBand } from './formula-engine';
import type { OodaStage } from '../../../entities/journey-enums';

export interface LifecycleSavingsInput {
  /** Baseline hours per phase (from template) */
  perPhaseBaselineHours: Record<OodaStage, number>;
  /** Actual hours per phase (from checkpoints) */
  perPhaseActualHours: Record<OodaStage, number>;
}

export const LIFECYCLE_SAVINGS_DEFAULT_WEIGHTS: Record<string, number> = {
  observe_savings: 0.20,
  orient_savings: 0.30,
  decide_savings: 0.25,
  act_savings: 0.25,
};

export const LIFECYCLE_SAVINGS_DEFAULT_THRESHOLDS: FormulaThresholds = {
  green: 30,
  amber: 10,
};

/**
 * Computes lifecycle savings score.
 * Per-phase: savings% = (baseline - actual) / baseline * 100
 * Normalised to 0–100 scale where 50 = break even, >50 = savings, <50 = overshoot.
 */
export function computeLifecycleSavings(
  input: LifecycleSavingsInput,
  weights: Record<string, number> = LIFECYCLE_SAVINGS_DEFAULT_WEIGHTS,
  thresholds: FormulaThresholds = LIFECYCLE_SAVINGS_DEFAULT_THRESHOLDS,
): FormulaOutput {
  const phases: OodaStage[] = ['observe', 'orient', 'decide', 'act'];
  const values: Record<string, number> = {};

  for (const phase of phases) {
    const baseline = input.perPhaseBaselineHours[phase] ?? 0;
    const actual = input.perPhaseActualHours[phase] ?? 0;

    if (baseline > 0) {
      // Savings as percentage: positive = saved time, negative = exceeded
      const savingsPercent = ((baseline - actual) / baseline) * 100;
      // Normalise: -100% → 0, 0% → 50, +100% → 100
      values[`${phase}_savings`] = Math.max(0, Math.min(100, savingsPercent + 50));
    } else {
      values[`${phase}_savings`] = 50; // No baseline = neutral
    }
  }

  const { score: rawScore, breakdown } = computeWeightedScore(values, weights);
  // Re-scale: the weighted score is on 0-100 where 50 = break even
  // Convert to savings percentage: (score - 50) * 2 maps to -100% to +100%
  const savingsPercent = (rawScore - 50) * 2;

  // Band classification uses savings percentage directly
  const band = classifyBand(savingsPercent, thresholds);

  return { score: rawScore, band, formulaFamily: 'lifecycle-savings', formulaVersion: '1.0.0', breakdown };
}
