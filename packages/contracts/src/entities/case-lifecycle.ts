/**
 * Case Lifecycle State Machine — Commander SDR
 *
 * Source: Spec #08 Case Management, Spec #30 Case Validation and Closure
 * Doctrinal Assertion 1: Cases are system-owned. No manual creation, closure, or status edit.
 *
 * Allowed transitions:
 *   open → in_progress → awaiting_validation → awaiting_closure → closed
 *   closed → reopened → in_progress
 *
 * NO manual creation path.
 * NO manual closure path.
 * Each transition requires: actor (must be 'system' or 'routing-engine'), reason, auditEventRef.
 */

import type { CaseStatus } from './case';

/** Actors permitted to perform lifecycle transitions */
export type LifecycleActor = 'system' | 'routing-engine';

/** A single allowed state transition */
export interface CaseTransition {
  from: CaseStatus;
  to: CaseStatus;
}

/** Transition request — required for every lifecycle change */
export interface TransitionRequest {
  /** The transition being requested */
  transition: CaseTransition;
  /** Actor performing the transition — must be system or routing-engine */
  actor: LifecycleActor;
  /** Reason for the transition */
  reason: string;
  /** Reference to the audit event recording this transition */
  auditEventRef: string;
}

/**
 * ALLOWED_TRANSITIONS — the complete set of valid case lifecycle transitions.
 * No other transitions are permitted. Manual creation and manual closure are forbidden.
 */
export const ALLOWED_TRANSITIONS: readonly CaseTransition[] = [
  { from: 'open', to: 'in-progress' },
  { from: 'in-progress', to: 'awaiting-validation' },
  { from: 'awaiting-validation', to: 'awaiting-closure' },
  { from: 'awaiting-closure', to: 'closed' },
  { from: 'closed', to: 'reopened' },
  { from: 'reopened', to: 'in-progress' },
] as const;

/**
 * Check if a transition is allowed by the lifecycle state machine.
 */
export function isTransitionAllowed(from: CaseStatus, to: CaseStatus): boolean {
  return ALLOWED_TRANSITIONS.some((t) => t.from === from && t.to === to);
}

/**
 * Get all valid next states from a given status.
 */
export function getNextStates(from: CaseStatus): CaseStatus[] {
  return ALLOWED_TRANSITIONS.filter((t) => t.from === from).map((t) => t.to);
}

// ─── Phase D1: Lifecycle Transition Engine ───────────────────────────────────

/** Immutable record of a case lifecycle transition */
export interface CaseTransitionRecord {
  id: string;
  caseId: string;
  from: CaseStatus;
  to: CaseStatus;
  actor: LifecycleActor;
  reason: string;
  auditEventRef: string;
  timestamp: string; // ISO 8601
}

/** Result of executing a lifecycle transition */
export interface TransitionResult {
  success: boolean;
  newStatus: CaseStatus | null;
  previousStatus: CaseStatus;
  auditEvent: CaseTransitionRecord | null;
  error: string | null;
}

/** Full lifecycle history for a case */
export interface CaseLifecycleHistory {
  caseId: string;
  records: CaseTransitionRecord[];
}

/**
 * Execute a lifecycle transition against the case state machine.
 *
 * Rules (Doctrinal Assertion 1):
 * - Actor MUST be 'system' or 'routing-engine'
 * - Transition MUST be in ALLOWED_TRANSITIONS
 * - request.transition.from MUST match currentStatus
 */
export function executeTransition(
  caseId: string,
  currentStatus: CaseStatus,
  request: TransitionRequest,
): TransitionResult {
  const VALID_ACTORS: readonly string[] = ['system', 'routing-engine'];

  // 1. Validate actor
  if (!VALID_ACTORS.includes(request.actor)) {
    return {
      success: false,
      newStatus: null,
      previousStatus: currentStatus,
      auditEvent: null,
      error: `Invalid actor '${request.actor}'. Must be 'system' or 'routing-engine'.`,
    };
  }

  // 2. Validate request.transition.from matches currentStatus
  if (request.transition.from !== currentStatus) {
    return {
      success: false,
      newStatus: null,
      previousStatus: currentStatus,
      auditEvent: null,
      error: `Transition 'from' state '${request.transition.from}' does not match current status '${currentStatus}'.`,
    };
  }

  // 3. Validate transition is allowed
  if (!isTransitionAllowed(request.transition.from, request.transition.to)) {
    return {
      success: false,
      newStatus: null,
      previousStatus: currentStatus,
      auditEvent: null,
      error: `Transition from '${request.transition.from}' to '${request.transition.to}' is not allowed.`,
    };
  }

  // 4. Success — produce transition record
  const record: CaseTransitionRecord = {
    id: `txn-${caseId}-${Date.now()}`,
    caseId,
    from: currentStatus,
    to: request.transition.to,
    actor: request.actor,
    reason: request.reason,
    auditEventRef: request.auditEventRef,
    timestamp: new Date().toISOString(),
  };

  return {
    success: true,
    newStatus: request.transition.to,
    previousStatus: currentStatus,
    auditEvent: record,
    error: null,
  };
}

/** Append a transition record to history (immutable) */
export function appendTransitionRecord(
  history: CaseLifecycleHistory,
  record: CaseTransitionRecord,
): CaseLifecycleHistory {
  return { ...history, records: [...history.records, record] };
}

/** Get the current status from history (last transition's 'to' state, or 'open' if empty) */
export function getCurrentStatusFromHistory(history: CaseLifecycleHistory): CaseStatus {
  if (history.records.length === 0) return 'open';
  return history.records[history.records.length - 1].to;
}
