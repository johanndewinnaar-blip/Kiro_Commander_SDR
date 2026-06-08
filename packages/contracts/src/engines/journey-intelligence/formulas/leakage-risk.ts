/**
 * Leakage Risk Formula Engine — JI-1.0 §7.9
 *
 * Predicts which active journeys are at risk of leaking.
 * 6 inputs. Time overshoot is dominant factor.
 * Journey at 2x expected duration = high leakage risk.
 */

import type { FormulaOutput, InvertedFormulaThresholds } from './formula-engine';
import { computeWeightedScore, classifyBandInverted } from './formula-engine';

export interface LeakageRiskInput {
  /** Time at current checkpoint vs expected (ratio * 50, so 100 = 2x expected) */
  timeOvershootRatio: number;
  /** Historical leakage rate for this journey type (0–100) */
  historicalLeakageRate: number;
  /** Manual delivery mode penalty (100 if manual, 0 otherwise) */
  manualDelivery: number;
  /** In orient/decide phase penalty (100 if in those phases, 0 otherwise) */
  orientDecidePhase: number;
  /** Child journey stall indicator (0–100) */
  childStall: number;
}

export const LEAKAGE_RISK_DEFAULT_WEIGHTS: Record<string, number> = {
  timeOvershootRatio: 0.35,
  historicalLeakageRate: 0.25,
  manualDelivery: 0.15,
  orientDecidePhase: 0.10,
  childStall: 0.15,
};

export const LEAKAGE_RISK_DEFAULT_THRESHOLDS: InvertedFormulaThresholds = {
  green: 40,
  amber: 70,
};

/**
 * Computes leakage risk score.
 * Higher score = higher risk of leaking. Bands inverted (low = green).
 */
export function computeLeakageRisk(
  input: LeakageRiskInput,
  weights: Record<string, number> = LEAKAGE_RISK_DEFAULT_WEIGHTS,
  thresholds: InvertedFormulaThresholds = LEAKAGE_RISK_DEFAULT_THRESHOLDS,
): FormulaOutput {
  const values: Record<string, number> = {
    timeOvershootRatio: input.timeOvershootRatio,
    historicalLeakageRate: input.historicalLeakageRate,
    manualDelivery: input.manualDelivery,
    orientDecidePhase: input.orientDecidePhase,
    childStall: input.childStall,
  };

  const { score, breakdown } = computeWeightedScore(values, weights);
  const band = classifyBandInverted(score, thresholds);

  return { score, band, formulaFamily: 'leakage-risk', formulaVersion: '1.0.0', breakdown };
}
