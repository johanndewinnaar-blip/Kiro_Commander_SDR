/**
 * Automation Maturity Formula Engine — JI-1.0 §7.7
 *
 * Tracks delivery mode progression toward autonomous.
 * manual_fraction negative, autonomous_fraction positive, success rate moderating.
 * 100% autonomous with 50% failure rate ≠ mature.
 */

import type { FormulaOutput, FormulaThresholds } from './formula-engine';
import { computeWeightedScore, classifyBand } from './formula-engine';

export interface AutomationMaturityInput {
  /** Fraction of work done manually (0–100, NEGATIVE: higher = less mature) */
  manualFraction: number;
  /** Fraction of work done autonomously (0–100) */
  autonomousFraction: number;
  /** Fraction of work done system-driven (0–100) */
  systemDrivenFraction: number;
  /** Fraction of work done AI-enhanced (0–100) */
  aiEnhancedFraction: number;
  /** Trend direction: improving = 100, stable = 50, declining = 0 */
  trendImprovement: number;
  /** Success rate of autonomous actions (0–100) */
  autonomousSuccessRate: number;
}

export const AUTOMATION_MATURITY_DEFAULT_WEIGHTS: Record<string, number> = {
  inverseManual: 0.30,
  autonomousFraction: 0.30,
  systemDrivenFraction: 0.15,
  aiEnhancedFraction: 0.10,
  trendImprovement: 0.10,
  autonomousSuccess: 0.05,
};

export const AUTOMATION_MATURITY_DEFAULT_THRESHOLDS: FormulaThresholds = {
  green: 70,
  amber: 40,
};

/**
 * Computes automation maturity score.
 * 100% autonomous with 50% failure ≠ mature (success rate moderates).
 */
export function computeAutomationMaturity(
  input: AutomationMaturityInput,
  weights: Record<string, number> = AUTOMATION_MATURITY_DEFAULT_WEIGHTS,
  thresholds: FormulaThresholds = AUTOMATION_MATURITY_DEFAULT_THRESHOLDS,
): FormulaOutput {
  // Success-moderated autonomous: autonomous * success_rate / 100
  const moderatedAutonomous = (input.autonomousFraction * input.autonomousSuccessRate) / 100;

  const values: Record<string, number> = {
    inverseManual: 100 - input.manualFraction,
    autonomousFraction: moderatedAutonomous,
    systemDrivenFraction: input.systemDrivenFraction,
    aiEnhancedFraction: input.aiEnhancedFraction,
    trendImprovement: input.trendImprovement,
    autonomousSuccess: input.autonomousSuccessRate,
  };

  const { score, breakdown } = computeWeightedScore(values, weights);
  const band = classifyBand(score, thresholds);

  return { score, band, formulaFamily: 'automation-maturity', formulaVersion: '1.0.0', breakdown };
}
