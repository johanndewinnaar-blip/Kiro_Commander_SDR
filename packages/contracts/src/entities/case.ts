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
  /** Case type */
  caseType: CaseType;
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

export type CaseType =
  | 'vulnerability-drift'
  | 'exposure-drift'
  | 'control-gap'
  | 'configuration-drift'
  | 'verdict-pattern'
  | 'policy-effectiveness'
  | 'external-attack-correlation'
  | 'coverage-blindspot';

export type CaseStatus =
  | 'open'
  | 'in-progress'
  | 'awaiting-validation'
  | 'awaiting-closure'
  | 'closed'
  | 'reopened';
