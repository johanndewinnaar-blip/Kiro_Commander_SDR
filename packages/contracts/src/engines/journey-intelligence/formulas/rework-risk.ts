/**
 * Rework Risk Formula Engine — JI-1.0 §7.10
 *
 * Predicts which journeys are likely to require rework.
 * 5 inputs. Evidence sufficiency is dominant factor.
 * Low evidence sufficiency = high rework risk.
 */

import type { FormulaOutput, InvertedFormulaThresholds } from './formula-engine';
import { computeWeightedScore, classifyBandInverted } from './formula-engine';

export interface ReworkRiskInput {
  /** Evidence sufficiency (0–100, INVERTED: low sufficiency = high risk) */
  evidenceSufficiency: number;
  /** Historical override rate for this type (0–100, higher = more risk) */
  historicalOverrideRate: number;
  /** Connector reliability for this action type (0–100, INVERTED) */
  connectorReliability: number;
  /** Validation readiness score (0–100, INVERTED: low readiness = high risk) */
  validationReadiness: number;
  /** Template historical rework rate (0–100, higher = more risk) */
  templateHistoricalReworkRate: number;
}

export const REWORK_RISK_DEFAULT_WEIGHTS: Record<string, number> = {
  lowEvidenceSufficiency: 0.25,
  historicalOverrideRate: 0.20,
  lowConnectorReliability: 0.20,
  lowValidationReadiness: 0.15,
  templateHistoricalReworkRate: 0.20,
};

export const REWORK_RISK_DEFAULT_THRESHOLDS: InvertedFormulaThresholds = {
  green: 30,
  amber: 60,
};

/**
 * Computes rework risk score.
 * Higher score = higher risk. Bands inverted (low = green).
 */
export function computeReworkRisk(
  input: ReworkRiskInput,
  weights: Record<string, number> = REWORK_RISK_DEFAULT_WEIGHTS,
  thresholds: InvertedFormulaThresholds = REWORK_RISK_DEFAULT_THRESHOLDS,
): FormulaOutput {
  const values: Record<string, number> = {
    lowEvidenceSufficiency: 100 - input.evidenceSufficiency,
    historicalOverrideRate: input.historicalOverrideRate,
    lowConnectorReliability: 100 - input.connectorReliability,
    lowValidationReadiness: 100 - input.validationReadiness,
    templateHistoricalReworkRate: input.templateHistoricalReworkRate,
  };

  const { score, breakdown } = computeWeightedScore(values, weights);
  const band = classifyBandInverted(score, thresholds);

  return { score, band, formulaFamily: 'rework-risk', formulaVersion: '1.0.0', breakdown };
}
