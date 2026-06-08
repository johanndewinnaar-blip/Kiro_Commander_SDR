/**
 * Journey Confidence Formula Engine — JI-1.0 §7.8
 *
 * Estimates likelihood of successful outcome for active journeys.
 * 6 inputs. Rework/deviation reduce confidence.
 */

import type { FormulaOutput, FormulaThresholds } from './formula-engine';
import { computeWeightedScore, classifyBand } from './formula-engine';

export interface JourneyConfidenceInput {
  /** Phase progress ratio (how far through expected phases, 0–100) */
  phaseProgressRatio: number;
  /** Checkpoint adherence (following expected order, 0–100) */
  checkpointAdherence: number;
  /** Average evidence confidence (0–100) */
  evidenceConfidenceAvg: number;
  /** Average decision confidence (0–100) */
  decisionConfidenceAvg: number;
  /** Whether rework is occurring (0 = reworking, 100 = no rework) */
  noRework: number;
  /** Whether deviating from template (0 = major deviation, 100 = on track) */
  noDeviation: number;
}

export const JOURNEY_CONFIDENCE_DEFAULT_WEIGHTS: Record<string, number> = {
  phaseProgressRatio: 0.15,
  checkpointAdherence: 0.20,
  evidenceConfidenceAvg: 0.20,
  decisionConfidenceAvg: 0.20,
  noRework: 0.15,
  noDeviation: 0.10,
};

export const JOURNEY_CONFIDENCE_DEFAULT_THRESHOLDS: FormulaThresholds = {
  green: 75,
  amber: 50,
};

/**
 * Computes journey confidence score.
 * Active journey with rework and deviation scores low confidence.
 */
export function computeJourneyConfidence(
  input: JourneyConfidenceInput,
  weights: Record<string, number> = JOURNEY_CONFIDENCE_DEFAULT_WEIGHTS,
  thresholds: FormulaThresholds = JOURNEY_CONFIDENCE_DEFAULT_THRESHOLDS,
): FormulaOutput {
  const values: Record<string, number> = {
    phaseProgressRatio: input.phaseProgressRatio,
    checkpointAdherence: input.checkpointAdherence,
    evidenceConfidenceAvg: input.evidenceConfidenceAvg,
    decisionConfidenceAvg: input.decisionConfidenceAvg,
    noRework: input.noRework,
    noDeviation: input.noDeviation,
  };

  const { score, breakdown } = computeWeightedScore(values, weights);
  const band = classifyBand(score, thresholds);

  return { score, band, formulaFamily: 'journey-confidence', formulaVersion: '1.0.0', breakdown };
}
