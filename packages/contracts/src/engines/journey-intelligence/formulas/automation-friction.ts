/**
 * Automation Friction Formula Engine — JI-1.0 §7.6
 *
 * Measures resistance between decision and successful execution.
 * 6 inputs. Lower score = less friction = better.
 * Thresholds inverted (low = green).
 */

import type { FormulaOutput, InvertedFormulaThresholds } from './formula-engine';
import { computeWeightedScore, classifyBandInverted } from './formula-engine';

export interface AutomationFrictionInput {
  /** Drag hours normalised (0–100, higher = more drag) */
  dragHours: number;
  /** Failure rate (0–100, higher = more failures) */
  failureRate: number;
  /** Human rescue rate (0–100, higher = more rescues) */
  rescueRate: number;
  /** Retry count normalised (0–100) */
  retryCount: number;
  /** Recovery hours normalised (0–100) */
  recoveryHours: number;
  /** Connector reliability (0–100, INVERTED: higher reliability = less friction) */
  connectorReliability: number;
}

export const AUTOMATION_FRICTION_DEFAULT_WEIGHTS: Record<string, number> = {
  dragHours: 0.20,
  failureRate: 0.30,
  rescueRate: 0.20,
  retryCount: 0.15,
  recoveryHours: 0.10,
  connectorUnreliability: 0.05,
};

export const AUTOMATION_FRICTION_DEFAULT_THRESHOLDS: InvertedFormulaThresholds = {
  green: 20,
  amber: 50,
};

/**
 * Computes automation friction score.
 * Higher score = more friction = worse. Bands inverted.
 */
export function computeAutomationFriction(
  input: AutomationFrictionInput,
  weights: Record<string, number> = AUTOMATION_FRICTION_DEFAULT_WEIGHTS,
  thresholds: InvertedFormulaThresholds = AUTOMATION_FRICTION_DEFAULT_THRESHOLDS,
): FormulaOutput {
  const values: Record<string, number> = {
    dragHours: input.dragHours,
    failureRate: input.failureRate,
    rescueRate: input.rescueRate,
    retryCount: input.retryCount,
    recoveryHours: input.recoveryHours,
    connectorUnreliability: 100 - input.connectorReliability, // Invert reliability
  };

  const { score, breakdown } = computeWeightedScore(values, weights);
  const band = classifyBandInverted(score, thresholds);

  return { score, band, formulaFamily: 'automation-friction', formulaVersion: '1.0.0', breakdown };
}
