/**
 * Journey ID Resolver Engine — Journey Intelligence
 *
 * Pure function: input = entity reference chain (anchorType + anchorId),
 * output = journeyId + parentJourneyId
 *
 * Deterministic pattern: journey-{anchorSlug}-{anchorId}
 * parentJourneyId resolved from entity hierarchy (action → case, sub-action → action)
 *
 * Source: docs/00_authority/JOURNEY_INTELLIGENCE.md (JI-1.0) §5.6, §9
 * Domain: D-47 Journey Intelligence
 * Build unit: Unit 51
 */

import type { JourneyAnchorType } from '../../entities/journey-enums';

export interface JourneyIdResolverInput {
  /** Entity type from the audit event entityRef */
  entityType: string;
  /** Entity ID from the audit event entityRef */
  entityId: string;
  /** Parent entity type (if available from context) */
  parentEntityType?: string;
  /** Parent entity ID (if available from context) */
  parentEntityId?: string;
}

export interface JourneyIdResolverResult {
  /** The resolved journey ID */
  journeyId: string;
  /** The parent journey ID (null if top-level journey) */
  parentJourneyId: string | null;
  /** The derived anchor type */
  anchorType: JourneyAnchorType;
  /** The anchor ID */
  anchorId: string;
}

/**
 * Maps entity types to journey anchor types.
 * Exported for testability.
 */
export const ENTITY_TO_ANCHOR_MAP: Record<string, JourneyAnchorType> = {
  'case': 'case',
  'finding': 'finding',
  'ioc': 'ioc_match',
  'ioc-match': 'ioc_match',
  'tenant-ioc-match': 'ioc_match',
  'mission': 'mission',
  'mission-binding': 'mission',
  'strategy-policy': 'strategy_policy',
  'strategy': 'strategy_policy',
  'signal': 'inbound_signal',
  'inbound-signal': 'inbound_signal',
  'feed': 'inbound_signal',
  'push-action': 'push_action',
  'push-action-intent': 'push_action',
  'sub-action': 'push_action',
  'action': 'push_action',
  'war-room': 'war_room',
  'exposure-programme': 'exposure_programme',
};

/**
 * Maps anchor types to URL-safe slug for journey ID derivation.
 * Per JI-1.0 §5.6 identity strategy.
 */
const ANCHOR_SLUG_MAP: Record<JourneyAnchorType, string> = {
  case: 'case',
  finding: 'finding',
  ioc_match: 'ioc',
  mission: 'mission',
  strategy_policy: 'strategy',
  inbound_signal: 'signal',
  push_action: 'push',
  war_room: 'warroom',
  exposure_programme: 'programme',
};

/**
 * Entity types that represent child journeys (action under case, sub-action under action).
 * Maps to the parent entity type for hierarchy resolution.
 */
const CHILD_ENTITY_MAP: Record<string, string> = {
  'action': 'case',
  'sub-action': 'action',
  'push-action': 'case',
  'push-action-intent': 'case',
};

/**
 * Resolves journey ID and parent journey ID from entity reference chain.
 *
 * Pure function — no I/O, no side effects.
 * Deterministic: same inputs always produce same outputs.
 *
 * @param input - Entity type and ID, optionally with parent context
 * @returns JourneyIdResolverResult or null if entity type unmapped
 */
export function resolveJourneyId(input: JourneyIdResolverInput): JourneyIdResolverResult | null {
  const anchorType = ENTITY_TO_ANCHOR_MAP[input.entityType];
  if (!anchorType) {
    return null;
  }

  const slug = ANCHOR_SLUG_MAP[anchorType];
  const journeyId = `journey-${slug}-${input.entityId}`;

  // Resolve parent journey ID
  let parentJourneyId: string | null = null;

  if (input.parentEntityType && input.parentEntityId) {
    // Explicit parent provided
    const parentAnchorType = ENTITY_TO_ANCHOR_MAP[input.parentEntityType];
    if (parentAnchorType) {
      const parentSlug = ANCHOR_SLUG_MAP[parentAnchorType];
      parentJourneyId = `journey-${parentSlug}-${input.parentEntityId}`;
    }
  } else if (CHILD_ENTITY_MAP[input.entityType]) {
    // Entity type is inherently a child — parent would need to be resolved
    // from context. Return null for parentJourneyId (caller must supply parent).
    parentJourneyId = null;
  }

  return {
    journeyId,
    parentJourneyId,
    anchorType,
    anchorId: input.entityId,
  };
}
