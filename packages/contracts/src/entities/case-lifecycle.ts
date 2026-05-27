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
