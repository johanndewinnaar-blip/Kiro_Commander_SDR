/**
 * OODA Stage Tagger Engine — Journey Intelligence
 *
 * Pure function: input = audit event action string, output = OodaStage
 * ~40 action-to-stage mapping rules.
 *
 * Source: docs/00_authority/JOURNEY_INTELLIGENCE.md (JI-1.0) §9
 * Domain: D-47 Journey Intelligence
 * Build unit: Unit 51
 */

import type { OodaStage } from '../../entities/journey-enums';

export interface OodaStageTagResult {
  stage: OodaStage;
  confidence: 'deterministic' | 'inferred';
}

/**
 * Rule set mapping action strings to OODA stages.
 * Exported for testability.
 */
export const OODA_STAGE_RULES: Array<{ pattern: string | RegExp; stage: OodaStage }> = [
  // ─── Observe Stage Actions ─────────────────────────────────────────────────
  { pattern: 'signal.received', stage: 'observe' },
  { pattern: 'signal.normalised', stage: 'observe' },
  { pattern: 'signal.enriched', stage: 'observe' },
  { pattern: 'signal.ingested', stage: 'observe' },
  { pattern: 'connector.sync', stage: 'observe' },
  { pattern: 'connector.pulled', stage: 'observe' },
  { pattern: 'connector.heartbeat', stage: 'observe' },
  { pattern: 'scan.completed', stage: 'observe' },
  { pattern: 'scan.initiated', stage: 'observe' },
  { pattern: 'coverage.assessed', stage: 'observe' },
  { pattern: 'feed.ingested', stage: 'observe' },
  { pattern: 'discovery.completed', stage: 'observe' },
  { pattern: /^signal\./, stage: 'observe' },
  { pattern: /^connector\./, stage: 'observe' },
  { pattern: /^scan\./, stage: 'observe' },

  // ─── Orient Stage Actions ──────────────────────────────────────────────────
  { pattern: 'context.established', stage: 'orient' },
  { pattern: 'drift.detected', stage: 'orient' },
  { pattern: 'risk.scored', stage: 'orient' },
  { pattern: 'risk.recalculated', stage: 'orient' },
  { pattern: 'blast.computed', stage: 'orient' },
  { pattern: 'classification.assigned', stage: 'orient' },
  { pattern: 'anomaly.detected', stage: 'orient' },
  { pattern: 'correlation.completed', stage: 'orient' },
  { pattern: 'entity.resolved', stage: 'orient' },
  { pattern: 'enrichment.completed', stage: 'orient' },
  { pattern: 'posture.recalculated', stage: 'orient' },
  { pattern: 'ioc.matched', stage: 'orient' },
  { pattern: /^drift\./, stage: 'orient' },
  { pattern: /^risk\./, stage: 'orient' },
  { pattern: /^correlation\./, stage: 'orient' },

  // ─── Decide Stage Actions ──────────────────────────────────────────────────
  { pattern: 'case.created', stage: 'decide' },
  { pattern: 'case.bound', stage: 'decide' },
  { pattern: 'case.routed', stage: 'decide' },
  { pattern: 'case.prioritised', stage: 'decide' },
  { pattern: 'action.decomposed', stage: 'decide' },
  { pattern: 'approval.requested', stage: 'decide' },
  { pattern: 'approval.granted', stage: 'decide' },
  { pattern: 'approval.denied', stage: 'decide' },
  { pattern: 'escalation.triggered', stage: 'decide' },
  { pattern: 'strategy.proposed', stage: 'decide' },
  { pattern: 'strategy.approved', stage: 'decide' },
  { pattern: /^case\.(created|bound|routed|prioritised)/, stage: 'decide' },
  { pattern: /^approval\./, stage: 'decide' },
  { pattern: /^escalation\./, stage: 'decide' },

  // ─── Act Stage Actions ─────────────────────────────────────────────────────
  { pattern: 'action.started', stage: 'act' },
  { pattern: 'action.dispatched', stage: 'act' },
  { pattern: 'action.accepted', stage: 'act' },
  { pattern: 'action.executed', stage: 'act' },
  { pattern: 'action.failed', stage: 'act' },
  { pattern: 'action.retried', stage: 'act' },
  { pattern: 'human.rescue', stage: 'act' },
  { pattern: 'recovery.completed', stage: 'act' },
  { pattern: 'validation.started', stage: 'act' },
  { pattern: 'validation.passed', stage: 'act' },
  { pattern: 'validation.failed', stage: 'act' },
  { pattern: 'case.closed', stage: 'act' },
  { pattern: 'case.reopened', stage: 'act' },
  { pattern: 'journey.completed', stage: 'act' },
  { pattern: 'journey.abandoned', stage: 'act' },
  { pattern: 'push.dispatched', stage: 'act' },
  { pattern: 'push.executed', stage: 'act' },
  { pattern: 'push.failed', stage: 'act' },
  { pattern: /^action\./, stage: 'act' },
  { pattern: /^validation\./, stage: 'act' },
  { pattern: /^push\./, stage: 'act' },
  { pattern: /^recovery\./, stage: 'act' },
];

/**
 * Tags an audit event action with the corresponding OODA stage.
 *
 * Pure function — no I/O, no side effects.
 *
 * @param action - The action string from an audit event
 * @returns OodaStageTagResult with stage and confidence, or null if unmapped
 */
export function tagOodaStage(action: string): OodaStageTagResult | null {
  // First pass: exact string match (deterministic)
  for (const rule of OODA_STAGE_RULES) {
    if (typeof rule.pattern === 'string' && rule.pattern === action) {
      return { stage: rule.stage, confidence: 'deterministic' };
    }
  }

  // Second pass: regex match (inferred)
  for (const rule of OODA_STAGE_RULES) {
    if (rule.pattern instanceof RegExp && rule.pattern.test(action)) {
      return { stage: rule.stage, confidence: 'inferred' };
    }
  }

  return null;
}
