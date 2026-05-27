/**
 * Case Entity — Commander SDR Canonical Model
 *
 * Source: Spec #08 Case Management, Spec #17 Closed-Loop Control Architecture
 * Domain Requirement 3: Cases include lifecycle, owner, SLA, surface attribution, audit
 *
 * CRITICAL: Cases are system-owned. No manual creation, manual closure,
 * manual reopening or manual lifecycle progression (Doctrinal Assertion 1).
 */

import type { CommonFields, SurfaceAttribution } from './common';

export interface Case extends CommonFields {
  entityType: 'case';
  /** Case reference number */
  caseRef: string;
  /** Case type (supports canonical 12 + legacy aliases for seed data) */
  caseType: CaseTypeExtended;
  /** Case title */
  title: string;
  /** Current lifecycle state — system-owned transitions only */
  status: CaseStatus;
  /** Priority level */
  priority: 'P0' | 'P1' | 'P2' | 'P3' | 'P4';
  /** Assigned owner (via routing engine, not manual) */
  owner: string;
  /** Assigned team */
  team: string;
  /** SLA target */
  sla: {
    targetResolutionHours: number;
    breached: boolean;
  };
  /** Surface attribution */
  surfaceAttribution: SurfaceAttribution;
  /** Related entity IDs */
  relatedEntities: string[];
  /** Audit trail reference */
  auditTrailRef: string;
  /** Routing rationale (from routing engine) */
  routingRationale: string;
}

/**
 * Twelve named case types per v1.2 requirements.
 * Source: Master Technical Specification §6.2; Spec #08 v2.6 addendum
 */
export type CaseType =
  | 'drift'
  | 'vulnerability'
  | 'identity'
  | 'exposure'
  | 'coverage'
  | 'tool-health'
  | 'threat-intelligence-estate-match'
  | 'external-attack-correlation'
  | 'verdict-pattern'
  | 'inverse-discovery-coverage-blindspot'
  | 'policy-effectiveness'
  | 'ooda-tempo-degradation';

/** All twelve case types as a constant array */
export const CASE_TYPES: CaseType[] = [
  'drift',
  'vulnerability',
  'identity',
  'exposure',
  'coverage',
  'tool-health',
  'threat-intelligence-estate-match',
  'external-attack-correlation',
  'verdict-pattern',
  'inverse-discovery-coverage-blindspot',
  'policy-effectiveness',
  'ooda-tempo-degradation',
];

/**
 * Legacy case type aliases for backward compatibility with seed data.
 * These map older specific types to the canonical 12.
 */
export type LegacyCaseType =
  | 'vulnerability-drift'
  | 'exposure-drift'
  | 'control-gap'
  | 'configuration-drift'
  | 'coverage-blindspot';

/** Extended case type union including legacy aliases used in seed data */
export type CaseTypeExtended = CaseType | LegacyCaseType;

export type CaseStatus =
  | 'open'
  | 'in-progress'
  | 'awaiting-validation'
  | 'awaiting-closure'
  | 'closed'
  | 'reopened';
