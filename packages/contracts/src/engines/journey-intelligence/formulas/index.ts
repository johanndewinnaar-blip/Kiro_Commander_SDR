/**
 * Journey Intelligence Formula Engines — Barrel Export
 *
 * 10 formula families + shared framework types.
 *
 * Source: docs/00_authority/JOURNEY_INTELLIGENCE.md (JI-1.0) §7
 * Domain: D-47 Journey Intelligence
 * Build unit: Unit 51
 */

// ─── Shared Framework ────────────────────────────────────────────────────────
export type {
  FormulaFamily,
  Band,
  FormulaThresholds,
  InvertedFormulaThresholds,
  FormulaInput,
  FormulaOutput,
} from './formula-engine';
export {
  FORMULA_FAMILIES,
  computeWeightedScore,
  classifyBand,
  classifyBandInverted,
} from './formula-engine';

// ─── §7.1 Journey Quality ────────────────────────────────────────────────────
export type { JourneyQualityInput } from './journey-quality';
export { JOURNEY_QUALITY_DEFAULT_WEIGHTS, JOURNEY_QUALITY_DEFAULT_THRESHOLDS, computeJourneyQuality } from './journey-quality';

// ─── §7.2 Journey Complexity ─────────────────────────────────────────────────
export type { JourneyComplexityInput } from './journey-complexity';
export { JOURNEY_COMPLEXITY_DEFAULT_WEIGHTS, JOURNEY_COMPLEXITY_DEFAULT_THRESHOLDS, computeJourneyComplexity } from './journey-complexity';

// ─── §7.3 Journey Economics ──────────────────────────────────────────────────
export type { JourneyEconomicsInput } from './journey-economics';
export { JOURNEY_ECONOMICS_DEFAULT_WEIGHTS, JOURNEY_ECONOMICS_DEFAULT_THRESHOLDS, computeJourneyEconomics } from './journey-economics';

// ─── §7.4 Lifecycle Savings ──────────────────────────────────────────────────
export type { LifecycleSavingsInput } from './lifecycle-savings';
export { LIFECYCLE_SAVINGS_DEFAULT_WEIGHTS, LIFECYCLE_SAVINGS_DEFAULT_THRESHOLDS, computeLifecycleSavings } from './lifecycle-savings';

// ─── §7.5 Automation Opportunity ─────────────────────────────────────────────
export type { AutomationOpportunityInput } from './automation-opportunity';
export { AUTOMATION_OPPORTUNITY_DEFAULT_WEIGHTS, AUTOMATION_OPPORTUNITY_DEFAULT_THRESHOLDS, computeAutomationOpportunity } from './automation-opportunity';

// ─── §7.6 Automation Friction ────────────────────────────────────────────────
export type { AutomationFrictionInput } from './automation-friction';
export { AUTOMATION_FRICTION_DEFAULT_WEIGHTS, AUTOMATION_FRICTION_DEFAULT_THRESHOLDS, computeAutomationFriction } from './automation-friction';

// ─── §7.7 Automation Maturity ────────────────────────────────────────────────
export type { AutomationMaturityInput } from './automation-maturity';
export { AUTOMATION_MATURITY_DEFAULT_WEIGHTS, AUTOMATION_MATURITY_DEFAULT_THRESHOLDS, computeAutomationMaturity } from './automation-maturity';

// ─── §7.8 Journey Confidence ─────────────────────────────────────────────────
export type { JourneyConfidenceInput } from './journey-confidence';
export { JOURNEY_CONFIDENCE_DEFAULT_WEIGHTS, JOURNEY_CONFIDENCE_DEFAULT_THRESHOLDS, computeJourneyConfidence } from './journey-confidence';

// ─── §7.9 Leakage Risk ──────────────────────────────────────────────────────
export type { LeakageRiskInput } from './leakage-risk';
export { LEAKAGE_RISK_DEFAULT_WEIGHTS, LEAKAGE_RISK_DEFAULT_THRESHOLDS, computeLeakageRisk } from './leakage-risk';

// ─── §7.10 Rework Risk ──────────────────────────────────────────────────────
export type { ReworkRiskInput } from './rework-risk';
export { REWORK_RISK_DEFAULT_WEIGHTS, REWORK_RISK_DEFAULT_THRESHOLDS, computeReworkRisk } from './rework-risk';
