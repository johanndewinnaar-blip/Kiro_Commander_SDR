/**
 * Lifecycle Checkpoint Resolver Engine — Journey Intelligence
 *
 * Pure function: input = entityRef.entityType + action, output = LifecycleCheckpoint
 * Maps entity-state transitions to canonical checkpoints.
 * Returns null when action doesn't map to a meaningful checkpoint.
 *
 * Source: docs/00_authority/JOURNEY_INTELLIGENCE.md (JI-1.0) §9
 * Domain: D-47 Journey Intelligence
 * Build unit: Unit 51
 */

import type { LifecycleCheckpoint } from '../../entities/journey-enums';
import { ALL_LIFECYCLE_CHECKPOINTS } from '../../entities/journey-enums';

export interface CheckpointResolverInput {
  /** Entity type from the audit event entityRef */
  entityType: string;
  /** Action string from the audit event */
  action: string;
}

export interface CheckpointResolverResult {
  checkpoint: LifecycleCheckpoint;
  confidence: 'deterministic' | 'inferred';
}

/**
 * Checkpoint mapping rules — entity type + action → checkpoint.
 * Exported for testability.
 */
export const CHECKPOINT_RULES: Array<{
  entityType: string | RegExp;
  action: string | RegExp;
  checkpoint: LifecycleCheckpoint;
}> = [
  // ─── Observe Checkpoints ───────────────────────────────────────────────────
  { entityType: 'signal', action: 'signal.received', checkpoint: 'signal_received' },
  { entityType: 'signal', action: 'signal.normalised', checkpoint: 'signal_normalised' },
  { entityType: 'signal', action: 'signal.enriched', checkpoint: 'signal_enriched' },
  { entityType: 'asset', action: 'coverage.assessed', checkpoint: 'coverage_assessed' },
  { entityType: 'connector', action: 'connector.sync', checkpoint: 'connector_pulled' },
  { entityType: 'connector', action: 'connector.pulled', checkpoint: 'connector_pulled' },
  { entityType: /^(signal|feed|ioc)$/, action: /^signal\.(received|ingested)/, checkpoint: 'signal_received' },
  { entityType: /^(signal|asset|vulnerability)$/, action: /^signal\.enriched/, checkpoint: 'signal_enriched' },
  { entityType: /^(asset|connector)$/, action: /^scan\.completed/, checkpoint: 'signal_received' },

  // ─── Orient Checkpoints ────────────────────────────────────────────────────
  { entityType: 'case', action: 'context.established', checkpoint: 'context_established' },
  { entityType: 'finding', action: 'drift.detected', checkpoint: 'drift_detected' },
  { entityType: 'risk-object', action: 'risk.scored', checkpoint: 'risk_scored' },
  { entityType: 'risk-object', action: 'risk.recalculated', checkpoint: 'risk_scored' },
  { entityType: 'risk-object', action: 'blast.computed', checkpoint: 'blast_computed' },
  { entityType: 'case', action: 'classification.assigned', checkpoint: 'classification_assigned' },
  { entityType: 'identity', action: 'anomaly.detected', checkpoint: 'anomaly_detected' },
  { entityType: 'ioc', action: 'correlation.completed', checkpoint: 'correlation_completed' },
  { entityType: 'observable', action: 'entity.resolved', checkpoint: 'entity_resolved' },
  { entityType: /^(finding|asset|case)$/, action: /^drift\./, checkpoint: 'drift_detected' },
  { entityType: /^(risk-object|identity|asset)$/, action: /^risk\.(scored|recalculated)/, checkpoint: 'risk_scored' },

  // ─── Decide Checkpoints ────────────────────────────────────────────────────
  { entityType: 'case', action: 'case.created', checkpoint: 'case_created' },
  { entityType: 'case', action: 'case.bound', checkpoint: 'case_bound' },
  { entityType: 'case', action: 'case.routed', checkpoint: 'case_routed' },
  { entityType: 'case', action: 'case.prioritised', checkpoint: 'case_prioritised' },
  { entityType: 'action', action: 'action.decomposed', checkpoint: 'action_decomposed' },
  { entityType: 'action', action: 'approval.requested', checkpoint: 'approval_requested' },
  { entityType: 'action', action: 'approval.granted', checkpoint: 'approval_granted' },
  { entityType: 'action', action: 'approval.denied', checkpoint: 'approval_denied' },
  { entityType: 'case', action: 'escalation.triggered', checkpoint: 'escalation_triggered' },

  // ─── Act Checkpoints ───────────────────────────────────────────────────────
  { entityType: 'action', action: 'action.started', checkpoint: 'action_started' },
  { entityType: 'action', action: 'action.dispatched', checkpoint: 'action_dispatched' },
  { entityType: 'action', action: 'action.accepted', checkpoint: 'action_accepted' },
  { entityType: 'action', action: 'action.executed', checkpoint: 'action_executed' },
  { entityType: 'action', action: 'action.failed', checkpoint: 'action_failed' },
  { entityType: 'action', action: 'action.retried', checkpoint: 'action_retried' },
  { entityType: 'action', action: 'human.rescue', checkpoint: 'human_rescue_initiated' },
  { entityType: 'action', action: 'recovery.completed', checkpoint: 'recovery_completed' },
  { entityType: 'case', action: 'validation.started', checkpoint: 'validation_started' },
  { entityType: 'case', action: 'validation.passed', checkpoint: 'validation_passed' },
  { entityType: 'case', action: 'validation.failed', checkpoint: 'validation_failed' },
  { entityType: 'journey', action: 'journey.completed', checkpoint: 'journey_completed' },
  { entityType: 'journey', action: 'journey.abandoned', checkpoint: 'journey_abandoned' },
  { entityType: 'case', action: 'case.reopened', checkpoint: 'journey_reopened' },
  { entityType: /^(push-action|sub-action)$/, action: /^action\.dispatched/, checkpoint: 'action_dispatched' },
  { entityType: /^(push-action|sub-action)$/, action: /^action\.executed/, checkpoint: 'action_executed' },
  { entityType: /^(push-action|sub-action)$/, action: /^action\.failed/, checkpoint: 'action_failed' },
];

/**
 * Resolves a lifecycle checkpoint from an entity type + action combination.
 *
 * Pure function — no I/O, no side effects.
 * Returns null when the action doesn't represent a meaningful checkpoint.
 *
 * @param input - Entity type and action from audit event
 * @returns CheckpointResolverResult or null
 */
export function resolveLifecycleCheckpoint(input: CheckpointResolverInput): CheckpointResolverResult | null {
  // First pass: exact match on both entity type and action (deterministic)
  for (const rule of CHECKPOINT_RULES) {
    const entityMatch = typeof rule.entityType === 'string'
      ? rule.entityType === input.entityType
      : rule.entityType.test(input.entityType);
    const actionMatch = typeof rule.action === 'string'
      ? rule.action === input.action
      : rule.action.test(input.action);

    if (entityMatch && actionMatch) {
      const confidence = (typeof rule.entityType === 'string' && typeof rule.action === 'string')
        ? 'deterministic' as const
        : 'inferred' as const;
      return { checkpoint: rule.checkpoint, confidence };
    }
  }

  // Fallback: try to extract checkpoint from action string directly
  const actionSlug = input.action.replace(/\./g, '_');
  if ((ALL_LIFECYCLE_CHECKPOINTS as readonly string[]).includes(actionSlug)) {
    return { checkpoint: actionSlug as LifecycleCheckpoint, confidence: 'inferred' };
  }

  return null;
}
