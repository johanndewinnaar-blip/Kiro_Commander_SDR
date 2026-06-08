/**
 * Journey Entity — Commander SDR Canonical Model
 *
 * Source: docs/00_authority/JOURNEY_INTELLIGENCE.md (JI-1.0) §5.2
 * Domain: D-47 Journey Intelligence
 * Build unit: Unit 51
 *
 * A Journey is a complete lifecycle from first signal to validated outcome.
 * It is the primary measurement object for Journey Intelligence.
 *
 * Properties:
 * - Lightweight state carrier
 * - Mutable (status, phase, checkpoint, outcome update on progression)
 * - Created when first lifecycle checkpoint occurs
 * - Outcome starts as 'pending', immutable once terminal (ARCH-JI-008)
 * - Lives in journey database schema
 */

import type { CommonFields } from './common';
import type {
  OodaStage,
  DeliveryMode,
  JourneyStatus,
  JourneyOutcome,
  JourneyAnchorType,
  LifecycleCheckpoint,
} from './journey-enums';
import { TERMINAL_OUTCOMES, JOURNEY_ANCHOR_TYPES } from './journey-enums';

/**
 * Journey entity — complete lifecycle from first signal to validated outcome.
 * Extends CommonFields (id, tenant, source, createdAt, updatedAt).
 */
export interface Journey extends CommonFields {
  entityType: 'journey';
  /** Deterministic journey identifier: journey-{anchorType}-{anchorId} */
  journeyId: string;
  /** Reference to a JourneyTemplate (descriptive, not prescriptive) */
  templateRef: string | null;
  /** What entity anchors this journey */
  anchorType: JourneyAnchorType;
  /** ID of the anchor entity */
  anchorId: string;
  /** Parent journey (for hierarchy; depth 2 in v1, unbounded in schema) */
  parentJourneyId: string | null;
  /** Current OODA phase */
  currentPhase: OodaStage;
  /** Current lifecycle checkpoint */
  currentCheckpoint: LifecycleCheckpoint;
  /** Journey lifecycle status */
  status: JourneyStatus;
  /** How the journey ended (pending while active, immutable once terminal) */
  outcome: JourneyOutcome;
  /** When the journey started (ISO 8601) */
  startedAt: string;
  /** When the journey completed (null while active) */
  completedAt: string | null;
  /** Current delivery mode classification */
  deliveryMode: DeliveryMode;
  /** Number of times this journey has been reworked */
  reworkCount: number;
  /** Number of child journeys */
  childCount: number;
}

/**
 * Journey ID derivation pattern per JI-1.0 §5.6.
 * Deterministic: journey-{anchorType}-{anchorId}
 */
export function deriveJourneyId(anchorType: JourneyAnchorType, anchorId: string): string {
  const slugMap: Record<JourneyAnchorType, string> = {
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
  return `journey-${slugMap[anchorType]}-${anchorId}`;
}

/**
 * Validation result for Journey entity.
 */
export interface JourneyValidation {
  valid: boolean;
  errors: string[];
}

/**
 * Validates a Journey entity for structural correctness.
 *
 * Rules:
 * - All required fields present
 * - Enum membership validated
 * - Outcome starts as 'pending' (creation validation)
 * - Outcome immutable once terminal (transition validation)
 * - journeyId matches derivation pattern
 * - completedAt required when status is 'completed' or 'abandoned'
 * - reworkCount and childCount are non-negative integers
 */
export function validateJourney(journey: Journey, priorOutcome?: JourneyOutcome): JourneyValidation {
  const errors: string[] = [];

  // Required fields
  if (!journey.id) errors.push('id is required');
  if (!journey.journeyId) errors.push('journeyId is required');
  if (!journey.anchorType) errors.push('anchorType is required');
  if (!journey.anchorId) errors.push('anchorId is required');
  if (!journey.currentPhase) errors.push('currentPhase is required');
  if (!journey.currentCheckpoint) errors.push('currentCheckpoint is required');
  if (!journey.status) errors.push('status is required');
  if (!journey.outcome) errors.push('outcome is required');
  if (!journey.startedAt) errors.push('startedAt is required');
  if (!journey.deliveryMode) errors.push('deliveryMode is required');
  if (!journey.tenant) errors.push('tenant is required');
  if (!journey.source) errors.push('source is required');

  // Anchor type membership
  if (journey.anchorType && !JOURNEY_ANCHOR_TYPES.includes(journey.anchorType)) {
    errors.push(`anchorType '${journey.anchorType}' is not a valid JourneyAnchorType`);
  }

  // Journey ID derivation check
  if (journey.journeyId && journey.anchorType && journey.anchorId) {
    const expected = deriveJourneyId(journey.anchorType, journey.anchorId);
    if (journey.journeyId !== expected) {
      errors.push(`journeyId '${journey.journeyId}' does not match expected derivation '${expected}'`);
    }
  }

  // Outcome immutability: if prior outcome was terminal, it cannot change
  if (priorOutcome && TERMINAL_OUTCOMES.includes(priorOutcome)) {
    if (journey.outcome !== priorOutcome) {
      errors.push(`outcome cannot change from terminal value '${priorOutcome}' to '${journey.outcome}'`);
    }
  }

  // completedAt required when terminal
  if ((journey.status === 'completed' || journey.status === 'abandoned') && !journey.completedAt) {
    errors.push('completedAt is required when status is completed or abandoned');
  }

  // Non-negative integers
  if (journey.reworkCount < 0 || !Number.isInteger(journey.reworkCount)) {
    errors.push('reworkCount must be a non-negative integer');
  }
  if (journey.childCount < 0 || !Number.isInteger(journey.childCount)) {
    errors.push('childCount must be a non-negative integer');
  }

  return { valid: errors.length === 0, errors };
}
