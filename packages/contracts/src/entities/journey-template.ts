/**
 * Journey Template Entity — Commander SDR Canonical Model
 *
 * Source: docs/00_authority/JOURNEY_INTELLIGENCE.md (JI-1.0) §5.3
 * Domain: D-47 Journey Intelligence
 * Build unit: Unit 51
 *
 * A JourneyTemplate is a reference data record describing the expected shape
 * of a journey type. It is descriptive, not prescriptive — deviation is
 * detected and flagged, never prevented.
 *
 * Properties:
 * - Reference data (~33 templates)
 * - Descriptive, not prescriptive
 * - Governed (version, status lifecycle)
 * - Tenant-customisable tempo thresholds
 * - Lives in journey schema
 */

import type { CommonFields } from './common';
import type {
  OodaStage,
  DeliveryMode,
  JourneyAnchorType,
  JourneyOutcome,
  LifecycleCheckpoint,
} from './journey-enums';

/** Template status lifecycle */
export const JOURNEY_TEMPLATE_STATUSES = ['active', 'draft', 'retired'] as const;
export type JourneyTemplateStatus = typeof JOURNEY_TEMPLATE_STATUSES[number];

/** Applicability filter for templates */
export interface JourneyTemplateApplicability {
  caseTypes?: string[];
  domains?: string[];
  d3fendTactics?: string[];
  anchorSubtype?: string;
}

/**
 * Journey Template entity — expected shape of a journey type.
 * Extends CommonFields (id, tenant, source, createdAt, updatedAt).
 */
export interface JourneyTemplate extends CommonFields {
  entityType: 'journey-template';
  /** Unique template identifier (e.g., JT-CASE-001) */
  templateId: string;
  /** Human-readable name */
  name: string;
  /** What entity type anchors journeys of this template */
  anchorType: JourneyAnchorType;
  /** Parent anchor type (for child journeys, e.g., action under case) */
  parentAnchorType: JourneyAnchorType | null;
  /** Applicability filter */
  applicability: JourneyTemplateApplicability;
  /** Expected lifecycle checkpoints in order */
  expectedCheckpoints: LifecycleCheckpoint[];
  /** Expected OODA phases traversed */
  expectedPhases: OodaStage[];
  /** Expected delivery modes */
  expectedDeliveryModes: DeliveryMode[];
  /** Expected outcome distribution (sum should ≈ 1.0) */
  expectedOutcomeDistribution: Partial<Record<JourneyOutcome, number>>;
  /** Maximum hours per OODA phase before considered stalled */
  tempoThresholds: Partial<Record<OodaStage, number>>;
  /** Hours after which a journey is flagged as leaking */
  leakageThresholdHours: number;
  /** References to formula families applicable to this template */
  formulaRefs: string[];
  /** Template version (semantic) */
  version: string;
  /** Template status */
  status: JourneyTemplateStatus;
}

/**
 * Validation result for JourneyTemplate entity.
 */
export interface JourneyTemplateValidation {
  valid: boolean;
  errors: string[];
}

/**
 * Validates a JourneyTemplate entity for structural correctness.
 *
 * Rules:
 * - All required fields present
 * - templateId is non-empty
 * - name is non-empty
 * - expectedCheckpoints is non-empty array
 * - expectedPhases is non-empty array
 * - expectedDeliveryModes is non-empty array
 * - leakageThresholdHours > 0
 * - status is a valid lifecycle state
 * - version is non-empty
 */
export function validateJourneyTemplate(template: JourneyTemplate): JourneyTemplateValidation {
  const errors: string[] = [];

  // Required fields
  if (!template.id) errors.push('id is required');
  if (!template.templateId) errors.push('templateId is required');
  if (!template.name) errors.push('name is required');
  if (!template.anchorType) errors.push('anchorType is required');
  if (!template.version) errors.push('version is required');
  if (!template.status) errors.push('status is required');
  if (!template.tenant) errors.push('tenant is required');
  if (!template.source) errors.push('source is required');

  // Status membership
  if (template.status && !JOURNEY_TEMPLATE_STATUSES.includes(template.status)) {
    errors.push(`status '${template.status}' is not a valid JourneyTemplateStatus`);
  }

  // Non-empty arrays
  if (!template.expectedCheckpoints || template.expectedCheckpoints.length === 0) {
    errors.push('expectedCheckpoints must be a non-empty array');
  }
  if (!template.expectedPhases || template.expectedPhases.length === 0) {
    errors.push('expectedPhases must be a non-empty array');
  }
  if (!template.expectedDeliveryModes || template.expectedDeliveryModes.length === 0) {
    errors.push('expectedDeliveryModes must be a non-empty array');
  }

  // Leakage threshold positive
  if (template.leakageThresholdHours <= 0) {
    errors.push('leakageThresholdHours must be greater than 0');
  }

  // Formula refs is an array (can be empty)
  if (!Array.isArray(template.formulaRefs)) {
    errors.push('formulaRefs must be an array');
  }

  return { valid: errors.length === 0, errors };
}
