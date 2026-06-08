/**
 * Journey Quality Formula Engine — JI-1.0 §7.1
 *
 * Measures whether journeys end well, not just quickly.
 * 5 inputs, inverted where noted. Higher score = better quality.
 */

import type { FormulaOutput, FormulaThresholds } from './formula-engine';
import { computeWeightedScore, classifyBand } from './formula-engine';

export interface JourneyQualityInput {
  /** Validation pass rate (0–100, higher = better) */
  validationPassRate: number;
  /** Outcome success rate (0–100, higher = better) */
  outcomeSuccessRate: number;
  /** Rework rate (0–100, INVERTED: higher = worse) */
  reworkRate: number;
  /** Override rate (0–100, INVERTED: higher = worse) */
  overrideRate: number;
  /** Reopening rate (0–100, INVERTED: higher = worse) */
  reopeningRate: number;
}

export const JOURNEY_QUALITY_DEFAULT_WEIGHTS: Record<string, number> = {
  validationPassRate: 0.25,
  outcomeSuccessRate: 0.30,
  reworkRate: 0.20,
  overrideRate: 0.10,
  reopeningRate: 0.15,
};

export const JOURNEY_QUALITY_DEFAULT_THRESHOLDS: FormulaThresholds = {
  green: 80,
  amber: 60,
};

/**
 * Computes journey quality score.
 * Inverted inputs are flipped: score = 100 - value.
 */
export function computeJourneyQuality(
  input: JourneyQualityInput,
  weights: Record<string, number> = JOURNEY_QUALITY_DEFAULT_WEIGHTS,
  thresholds: FormulaThresholds = JOURNEY_QUALITY_DEFAULT_THRESHOLDS,
): FormulaOutput {
  // Invert negative indicators
  const values: Record<string, number> = {
    validationPassRate: input.validationPassRate,
    outcomeSuccessRate: input.outcomeSuccessRate,
    reworkRate: 100 - input.reworkRate,
    overrideRate: 100 - input.overrideRate,
    reopeningRate: 100 - input.reopeningRate,
  };

  const { score, breakdown } = computeWeightedScore(values, weights);
  const band = classifyBand(score, thresholds);

  return { score, band, formulaFamily: 'journey-quality', formulaVersion: '1.0.0', breakdown };
}
