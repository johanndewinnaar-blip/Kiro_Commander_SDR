/**
 * Automation Opportunity Formula Engine — JI-1.0 §7.5
 *
 * Scores how automatable a journey type is.
 * 7 inputs. approval_required has NEGATIVE weight (reduces score).
 */

import type { FormulaOutput, FormulaThresholds } from './formula-engine';
import { computeWeightedScore, classifyBand } from './formula-engine';

export interface AutomationOpportunityInput {
  /** How deterministic/predictable is this journey (0–100) */
  determinismScore: number;
  /** Whether a connector is available for execution (0 or 100) */
  connectorAvailable: number;
  /** Whether evidence is pre-available before decision (0–100) */
  evidencePreAvailable: number;
  /** Whether approval is required (0 or 100, NEGATIVE weight) */
  approvalRequired: number;
  /** How repeatable is this journey pattern (0–100) */
  repeatabilityScore: number;
  /** Historical success rate for this type (0–100) */
  historicalSuccessRate: number;
  /** Variance score (low variance = high opportunity) (0–100, inverted) */
  varianceScore: number;
}

export const AUTOMATION_OPPORTUNITY_DEFAULT_WEIGHTS: Record<string, number> = {
  determinismScore: 0.25,
  connectorAvailable: 0.15,
  evidencePreAvailable: 0.15,
  approvalRequired: -0.15,
  repeatabilityScore: 0.15,
  historicalSuccessRate: 0.10,
  lowVariance: 0.05,
};

export const AUTOMATION_OPPORTUNITY_DEFAULT_THRESHOLDS: FormulaThresholds = {
  green: 70,
  amber: 40,
};

/**
 * Computes automation opportunity score.
 * Approval gates reduce score. High determinism + connector = high score.
 */
export function computeAutomationOpportunity(
  input: AutomationOpportunityInput,
  weights: Record<string, number> = AUTOMATION_OPPORTUNITY_DEFAULT_WEIGHTS,
  thresholds: FormulaThresholds = AUTOMATION_OPPORTUNITY_DEFAULT_THRESHOLDS,
): FormulaOutput {
  const values: Record<string, number> = {
    determinismScore: input.determinismScore,
    connectorAvailable: input.connectorAvailable,
    evidencePreAvailable: input.evidencePreAvailable,
    approvalRequired: input.approvalRequired,
    repeatabilityScore: input.repeatabilityScore,
    historicalSuccessRate: input.historicalSuccessRate,
    lowVariance: 100 - input.varianceScore, // Invert: low variance = high opportunity
  };

  const { score, breakdown } = computeWeightedScore(values, weights);
  const band = classifyBand(score, thresholds);

  return { score, band, formulaFamily: 'automation-opportunity', formulaVersion: '1.0.0', breakdown };
}
