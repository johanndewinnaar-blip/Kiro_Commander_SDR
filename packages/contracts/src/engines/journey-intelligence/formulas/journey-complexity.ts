/**
 * Journey Complexity Formula Engine — JI-1.0 §7.2
 *
 * Measures structural complexity of journeys.
 * 8 inputs normalised against template expectations.
 * Higher score = more complex.
 */

import type { FormulaOutput, InvertedFormulaThresholds } from './formula-engine';
import { computeWeightedScore, classifyBandInverted } from './formula-engine';

export interface JourneyComplexityInput {
  /** Number of checkpoints traversed (normalised 0–100) */
  checkpointCount: number;
  /** Number of distinct actors involved (normalised 0–100) */
  actorCount: number;
  /** Number of OODA phases traversed (normalised 0–100) */
  phaseCount: number;
  /** Number of approval gates encountered (normalised 0–100) */
  approvalGateCount: number;
  /** Number of rework cycles (normalised 0–100) */
  reworkCount: number;
  /** Number of child journeys spawned (normalised 0–100) */
  childJourneyCount: number;
  /** Number of escalations triggered (normalised 0–100) */
  escalationCount: number;
  /** Number of delivery mode changes (normalised 0–100) */
  deliveryModeChangeCount: number;
}

export const JOURNEY_COMPLEXITY_DEFAULT_WEIGHTS: Record<string, number> = {
  checkpointCount: 0.15,
  actorCount: 0.20,
  phaseCount: 0.10,
  approvalGateCount: 0.20,
  reworkCount: 0.15,
  childJourneyCount: 0.05,
  escalationCount: 0.10,
  deliveryModeChangeCount: 0.05,
};

export const JOURNEY_COMPLEXITY_DEFAULT_THRESHOLDS: InvertedFormulaThresholds = {
  green: 30,
  amber: 60,
};

/**
 * Computes journey complexity score.
 * Higher = more complex. Bands inverted (low = green).
 */
export function computeJourneyComplexity(
  input: JourneyComplexityInput,
  weights: Record<string, number> = JOURNEY_COMPLEXITY_DEFAULT_WEIGHTS,
  thresholds: InvertedFormulaThresholds = JOURNEY_COMPLEXITY_DEFAULT_THRESHOLDS,
): FormulaOutput {
  const values: Record<string, number> = {
    checkpointCount: input.checkpointCount,
    actorCount: input.actorCount,
    phaseCount: input.phaseCount,
    approvalGateCount: input.approvalGateCount,
    reworkCount: input.reworkCount,
    childJourneyCount: input.childJourneyCount,
    escalationCount: input.escalationCount,
    deliveryModeChangeCount: input.deliveryModeChangeCount,
  };

  const { score, breakdown } = computeWeightedScore(values, weights);
  const band = classifyBandInverted(score, thresholds);

  return { score, band, formulaFamily: 'journey-complexity', formulaVersion: '1.0.0', breakdown };
}
