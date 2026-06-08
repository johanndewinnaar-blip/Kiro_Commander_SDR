/**
 * Delivery Mode Tagger Engine — Journey Intelligence
 *
 * Pure function: input = actor.type + action + approval context, output = DeliveryMode
 *
 * Rules:
 * - system → system_driven
 * - user → manual
 * - commander-ai → ai_enhanced
 * - system + approval gate → human_confirmed_automation
 * - system + policy-authorised (no approval) → autonomous
 *
 * Source: docs/00_authority/JOURNEY_INTELLIGENCE.md (JI-1.0) §9
 * Domain: D-47 Journey Intelligence
 * Build unit: Unit 51
 */

import type { DeliveryMode } from '../../entities/journey-enums';

export type ActorType = 'system' | 'user' | 'connector' | 'commander-ai';

export interface DeliveryModeTagInput {
  /** Actor type from the audit event */
  actorType: ActorType;
  /** Action string from the audit event */
  action: string;
  /** Whether an approval gate was present/required for this action */
  approvalRequired: boolean;
  /** Whether the action was policy-authorised (automation boundary permits) */
  policyAuthorised: boolean;
}

export interface DeliveryModeTagResult {
  mode: DeliveryMode;
  confidence: 'deterministic' | 'inferred';
}

/**
 * Delivery mode classification rules.
 * Exported for testability.
 */
export const DELIVERY_MODE_RULES: Array<{
  condition: (input: DeliveryModeTagInput) => boolean;
  mode: DeliveryMode;
  confidence: 'deterministic' | 'inferred';
}> = [
  // Rule 1: User actor → manual (highest priority)
  {
    condition: (input) => input.actorType === 'user',
    mode: 'manual',
    confidence: 'deterministic',
  },
  // Rule 2: Commander AI actor → ai_enhanced
  {
    condition: (input) => input.actorType === 'commander-ai',
    mode: 'ai_enhanced',
    confidence: 'deterministic',
  },
  // Rule 3: System/connector + approval gate required → human_confirmed_automation
  {
    condition: (input) =>
      (input.actorType === 'system' || input.actorType === 'connector') &&
      input.approvalRequired,
    mode: 'human_confirmed_automation',
    confidence: 'deterministic',
  },
  // Rule 4: System/connector + policy-authorised (no approval) → autonomous
  {
    condition: (input) =>
      (input.actorType === 'system' || input.actorType === 'connector') &&
      !input.approvalRequired &&
      input.policyAuthorised,
    mode: 'autonomous',
    confidence: 'deterministic',
  },
  // Rule 5: System/connector (default, no approval context) → system_driven
  {
    condition: (input) =>
      input.actorType === 'system' || input.actorType === 'connector',
    mode: 'system_driven',
    confidence: 'deterministic',
  },
];

/**
 * Tags an audit event with the corresponding delivery mode.
 *
 * Pure function — no I/O, no side effects.
 *
 * @param input - Actor type, action, and approval context
 * @returns DeliveryModeTagResult with mode and confidence, or null if unmapped
 */
export function tagDeliveryMode(input: DeliveryModeTagInput): DeliveryModeTagResult | null {
  for (const rule of DELIVERY_MODE_RULES) {
    if (rule.condition(input)) {
      return { mode: rule.mode, confidence: rule.confidence };
    }
  }

  // Fallback: inferred from action patterns
  if (input.action.includes('approval') || input.action.includes('human')) {
    return { mode: 'human_confirmed_automation', confidence: 'inferred' };
  }

  return null;
}
