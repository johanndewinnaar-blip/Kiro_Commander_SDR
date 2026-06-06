/**
 * Posture Accountability Engine — Commander SDR (Spec 39)
 *
 * Source: Spec #71 Pre-Warned/Protected/Novel Classification
 * Decision: DEC-spec39-dual-model — temporal posture accountability model
 *
 * Functions:
 * - classifyPostureState: Determine PRE_WARNED / PROTECTED / NOVEL from signals
 * - evaluateTransition: Determine if a classification transition is warranted
 * - computeTimeInState: Calculate days in current classification
 * - checkEscalationThreshold: Determine if escalation is due
 * - generateAccountabilityReport: Summarise how long entities sat in PRE_WARNED
 */

import type { PostureAccountabilityClassification } from '../entities/posture-accountability';

// ─── Input Types ─────────────────────────────────────────────────────────────

/** Signals from drift, coverage, exposure, and control engines */
export interface PostureSignals {
  /** Active drift findings affecting this entity */
  activeDriftFindings: number;
  /** Active coverage gaps (missing controls) */
  activeCoverageGaps: number;
  /** Active exposure findings */
  activeExposureFindings: number;
  /** Whether posture data is current (last refresh within freshness window) */
  postureDataCurrent: boolean;
  /** Whether the entity is resolved to canonical register */
  entityResolved: boolean;
  /** Known control weaknesses at time of assessment */
  knownControlWeaknesses: number;
}

/** An entity reference with its current state */
export interface EntityReference {
  entityId: string;
  entityType: 'asset' | 'identity' | 'connector' | 'component';
}

// ─── Output Types ────────────────────────────────────────────────────────────

export interface PostureClassificationResult {
  classification: PostureAccountabilityClassification;
  reason: string;
  evidenceRefs: string[];
  confidence: number; // 0-100
}

export interface TransitionResult {
  shouldTransition: boolean;
  from: PostureAccountabilityClassification;
  to: PostureAccountabilityClassification;
  reason: string;
  triggeringEvidence: string[];
}

export interface AccountabilityReportEntry {
  entityRef: string;
  entityType: string;
  classification: PostureAccountabilityClassification;
  daysInState: number;
  escalationDue: boolean;
  reason: string;
}

export interface AccountabilityReport {
  generatedAt: string;
  totalEntities: number;
  preWarnedCount: number;
  protectedCount: number;
  novelCount: number;
  averageDaysPreWarned: number;
  escalationsDue: number;
  entries: AccountabilityReportEntry[];
}

// ─── Engine Functions ────────────────────────────────────────────────────────

/**
 * Classify an entity's posture state based on current signals.
 *
 * Logic (per Spec #71 §3.3):
 * - If entity is unresolved OR posture data is stale → NOVEL
 * - If active drift, coverage gaps, exposure, or control weakness exists → PRE_WARNED
 * - If no warnings and posture data is current → PROTECTED
 */
export function classifyPostureState(
  entity: EntityReference,
  signals: PostureSignals,
): PostureClassificationResult {
  // NOVEL: unresolved entity or stale posture data
  if (!signals.entityResolved) {
    return {
      classification: 'NOVEL',
      reason: `Entity ${entity.entityId} cannot be resolved to canonical register. No baseline established.`,
      evidenceRefs: [],
      confidence: 90,
    };
  }

  if (!signals.postureDataCurrent) {
    return {
      classification: 'NOVEL',
      reason: `Posture data for ${entity.entityId} is stale (beyond freshness window). Cannot assess protection status.`,
      evidenceRefs: [],
      confidence: 70,
    };
  }

  // PRE_WARNED: known weakness exists
  const totalWeaknesses = signals.activeDriftFindings + signals.activeCoverageGaps
    + signals.activeExposureFindings + signals.knownControlWeaknesses;

  if (totalWeaknesses > 0) {
    const evidenceRefs: string[] = [];
    const reasons: string[] = [];

    if (signals.activeDriftFindings > 0) {
      reasons.push(`${signals.activeDriftFindings} active drift finding(s)`);
    }
    if (signals.activeCoverageGaps > 0) {
      reasons.push(`${signals.activeCoverageGaps} coverage gap(s)`);
    }
    if (signals.activeExposureFindings > 0) {
      reasons.push(`${signals.activeExposureFindings} exposure finding(s)`);
    }
    if (signals.knownControlWeaknesses > 0) {
      reasons.push(`${signals.knownControlWeaknesses} known control weakness(es)`);
    }

    return {
      classification: 'PRE_WARNED',
      reason: `Entity ${entity.entityId} has known unaddressed weaknesses: ${reasons.join(', ')}.`,
      evidenceRefs,
      confidence: 85 + Math.min(10, totalWeaknesses * 2),
    };
  }

  // PROTECTED: no warnings, data current, entity resolved
  return {
    classification: 'PROTECTED',
    reason: `Entity ${entity.entityId} has no known unaddressed weaknesses. Posture data current. Controls confirmed.`,
    evidenceRefs: [],
    confidence: 95,
  };
}

/**
 * Evaluate whether a classification transition should occur based on new evidence.
 *
 * Valid transitions:
 * - NOVEL → PRE_WARNED: entity resolved + threat intel matches
 * - NOVEL → PROTECTED: entity resolved + no known weaknesses
 * - PRE_WARNED → PROTECTED: control applied, weakness remediated
 * - PROTECTED → PRE_WARNED: new weakness discovered
 * - PROTECTED → NOVEL: posture data goes stale
 */
export function evaluateTransition(
  currentClassification: PostureAccountabilityClassification,
  signals: PostureSignals,
): TransitionResult {
  const newClassification = classifyPostureState(
    { entityId: 'eval', entityType: 'asset' },
    signals,
  ).classification;

  if (newClassification === currentClassification) {
    return {
      shouldTransition: false,
      from: currentClassification,
      to: currentClassification,
      reason: 'No change in posture state.',
      triggeringEvidence: [],
    };
  }

  const reasons: Record<string, string> = {
    'NOVEL→PRE_WARNED': 'Entity resolved; known weaknesses identified.',
    'NOVEL→PROTECTED': 'Entity resolved; no known weaknesses. Baseline established.',
    'PRE_WARNED→PROTECTED': 'All known weaknesses remediated. Controls confirmed active.',
    'PROTECTED→PRE_WARNED': 'New weakness discovered. Entity now in known-unprotected state.',
    'PROTECTED→NOVEL': 'Posture data stale. Cannot confirm protection status.',
    'PRE_WARNED→NOVEL': 'Entity resolution lost or posture data expired.',
  };

  const key = `${currentClassification}→${newClassification}`;

  return {
    shouldTransition: true,
    from: currentClassification,
    to: newClassification,
    reason: reasons[key] ?? `Transition ${key} triggered by signal change.`,
    triggeringEvidence: [],
  };
}

/**
 * Compute time in current classification state (days).
 */
export function computeTimeInState(classifiedAt: string, now?: string): number {
  const classified = new Date(classifiedAt).getTime();
  const current = now ? new Date(now).getTime() : Date.now();
  const diffMs = current - classified;
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

/**
 * Check whether escalation threshold has been exceeded.
 * Returns true if the entity has been in its current state longer than allowed.
 */
export function checkEscalationThreshold(durationInState: number, escalationThreshold: number): boolean {
  return durationInState >= escalationThreshold;
}

/**
 * Generate an accountability report summarising posture classification states.
 */
export function generateAccountabilityReport(
  entries: Array<{
    entityRef: string;
    entityType: string;
    classification: PostureAccountabilityClassification;
    daysInState: number;
    escalationThreshold: number;
    reason: string;
  }>,
): AccountabilityReport {
  const preWarned = entries.filter((e) => e.classification === 'PRE_WARNED');
  const protectedEntries = entries.filter((e) => e.classification === 'PROTECTED');
  const novel = entries.filter((e) => e.classification === 'NOVEL');

  const avgDaysPreWarned = preWarned.length > 0
    ? Math.round(preWarned.reduce((sum, e) => sum + e.daysInState, 0) / preWarned.length)
    : 0;

  const escalationsDue = entries.filter((e) => e.daysInState >= e.escalationThreshold).length;

  return {
    generatedAt: new Date().toISOString(),
    totalEntities: entries.length,
    preWarnedCount: preWarned.length,
    protectedCount: protectedEntries.length,
    novelCount: novel.length,
    averageDaysPreWarned: avgDaysPreWarned,
    escalationsDue,
    entries: entries.map((e) => ({
      entityRef: e.entityRef,
      entityType: e.entityType,
      classification: e.classification,
      daysInState: e.daysInState,
      escalationDue: e.daysInState >= e.escalationThreshold,
      reason: e.reason,
    })),
  };
}
