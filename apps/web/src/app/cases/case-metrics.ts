/**
 * Case Metrics (deterministic, derived) — Commander SDR
 *
 * Transparent, deterministic scoring + flow helpers computed from populated
 * case fields. These stand in for the Spec #08 scoring contracts (Case Risk
 * Score, Momentum Score, Workload Capacity, Next Best Action) until those
 * resolvers land — every value here is reproducible and labelled as derived.
 *
 * Source intent: Spec 06 Domain Requirements 10–14 + Master Proposition §7
 * (severity → ownership → next best action). No mock randomness.
 */

import type { Case } from '../../../../../packages/contracts/src/entities/case';

export const MS_PER_HOUR = 3_600_000;
export const MS_PER_DAY = 86_400_000;

export const CLOSED_STATES = new Set(['closed', 'closed_by_system']);
export const NEW_STATES = new Set(['detected', 'open']);
export const VALIDATION_STATES = new Set(['awaiting-validation', 'pending_validation', 'validation_running', 'validated_pass', 'validated_fail']);
export const CLOSURE_STATES = new Set(['awaiting-closure', 'pending_closure_gates']);
export const PROGRESS_STATES = new Set(['in_progress', 'in-progress', 'action_decomposed', 'prioritised']);
export const TRIAGE_STATES = new Set(['bound', 'routed', 'reopened', 'reopened_by_system']);

export const PRIORITIES = ['P0', 'P1', 'P2', 'P3', 'P4'] as const;

/** Flow lanes for the board — ordered left→right as work progresses. */
export type FlowLane = 'new' | 'triage' | 'in_progress' | 'validation' | 'closure' | 'closed';

export const FLOW_LANES: { id: FlowLane; label: string; hint: string }[] = [
  { id: 'new', label: 'New', hint: 'Detected · awaiting triage' },
  { id: 'triage', label: 'Triage', hint: 'Bound · routed' },
  { id: 'in_progress', label: 'In Progress', hint: 'Decomposed · remediating' },
  { id: 'validation', label: 'Validation', hint: 'Evidence · validation window' },
  { id: 'closure', label: 'Closure', hint: 'Closure gates' },
  { id: 'closed', label: 'Closed', hint: 'System-closed' },
];

export function laneOf(c: Case): FlowLane {
  if (CLOSED_STATES.has(c.status)) return 'closed';
  if (CLOSURE_STATES.has(c.status)) return 'closure';
  if (VALIDATION_STATES.has(c.status)) return 'validation';
  if (PROGRESS_STATES.has(c.status)) return 'in_progress';
  if (TRIAGE_STATES.has(c.status)) return 'triage';
  return 'new';
}

export const isNew = (c: Case) => NEW_STATES.has(c.status);
export const isClosed = (c: Case) => CLOSED_STATES.has(c.status);

export function ageHours(c: Case, now: number): number {
  return (now - new Date(c.createdAt).getTime()) / MS_PER_HOUR;
}

export function ageLabel(c: Case, now: number): string {
  const h = Math.floor(ageHours(c, now));
  return h >= 24 ? `${Math.floor(h / 24)}d` : `${h}h`;
}

// ─── SLA posture ────────────────────────────────────────────────────────────

export type SlaTone = 'critical' | 'warning' | 'success';
export interface SlaState { label: string; tone: SlaTone; pct: number; remainingHours: number; }

/** SLA posture + consumption percentage (0–100, clamped) for a progress bar. */
export function slaState(c: Case, now: number): SlaState {
  const consumed = ageHours(c, now);
  const target = c.sla.targetResolutionHours || 1;
  const pct = Math.max(0, Math.min(100, Math.round((consumed / target) * 100)));
  const remainingHours = target - consumed;
  if (c.sla.breached) return { label: 'Breached', tone: 'critical', pct: 100, remainingHours };
  if (isClosed(c)) return { label: 'Met', tone: 'success', pct, remainingHours };
  if (remainingHours <= 0) return { label: 'Overdue', tone: 'critical', pct: 100, remainingHours };
  if (remainingHours <= target * 0.25) return { label: 'At risk', tone: 'warning', pct, remainingHours };
  return { label: 'On track', tone: 'success', pct, remainingHours };
}

// ─── Case Risk Score (0–100, deterministic) ─────────────────────────────────

const PRIORITY_WEIGHT: Record<string, number> = { P0: 100, P1: 80, P2: 55, P3: 35, P4: 15 };

/**
 * Deterministic Case Risk Score: priority base, escalated by SLA breach/age
 * pressure and blast radius / affected-entity reach. Bounded 0–100.
 */
export function riskScore(c: Case, now: number): number {
  const base = PRIORITY_WEIGHT[c.priority] ?? 20;
  const sla = slaState(c, now);
  const slaPressure = sla.tone === 'critical' ? 15 : sla.tone === 'warning' ? 8 : 0;
  const blast = c.blastRadiusScore ?? c.relatedEntities.length * 3;
  const blastPressure = Math.min(15, blast / 5);
  const surfacePressure = c.surfaceAttribution === 'external_attack_surface' ? 5 : 0;
  return Math.max(0, Math.min(100, Math.round(base * 0.7 + slaPressure + blastPressure + surfacePressure)));
}

export function riskBand(score: number): SlaTone {
  if (score >= 75) return 'critical';
  if (score >= 50) return 'warning';
  return 'success';
}

// ─── Momentum (is the case moving?) ─────────────────────────────────────────

export type Momentum = 'advancing' | 'steady' | 'stalling';

/**
 * Momentum derived from lifecycle position vs age: a case deep in the
 * lifecycle quickly is advancing; an old case stuck early is stalling.
 */
export function momentum(c: Case, now: number): Momentum {
  if (isClosed(c)) return 'advancing';
  const laneIdx = FLOW_LANES.findIndex((l) => l.id === laneOf(c));
  const days = ageHours(c, now) / 24;
  const expectedLane = days <= 1 ? 1 : days <= 3 ? 2 : days <= 7 ? 3 : 4;
  if (laneIdx >= expectedLane) return 'advancing';
  if (laneIdx >= expectedLane - 1) return 'steady';
  return 'stalling';
}

// ─── Communication state (mirrors case-comms derivation) ────────────────────

export type CommState = 'not_started' | 'awaiting_response' | 'in_discussion' | 'stale' | 'escalated';

export function commState(c: Case): CommState {
  if (isClosed(c)) return 'in_discussion';
  if (c.sla.breached) return 'escalated';
  if (c.priority === 'P0' || c.priority === 'P1') return 'awaiting_response';
  if (NEW_STATES.has(c.status)) return 'not_started';
  return 'in_discussion';
}

// ─── Next Best Action (Master Proposition §7) ───────────────────────────────

/** Deterministic Next Best Action label from lifecycle + SLA + priority. */
export function nextBestAction(c: Case, now: number): string {
  const sla = slaState(c, now);
  if (c.priority === 'P0' && !isClosed(c)) return 'Join War Room — coordinate containment';
  if (sla.tone === 'critical' && !isClosed(c)) return 'Escalate — SLA breached, notify owner chain';
  switch (laneOf(c)) {
    case 'new': return 'Triage & bind risk objects';
    case 'triage': return 'Confirm routing & assign owner';
    case 'in_progress': return 'Drive remediation sub-actions';
    case 'validation': return 'Attach evidence & validate';
    case 'closure': return 'Clear closure gates';
    case 'closed': return 'Monitor reopening triggers';
  }
}

// ─── Workload capacity (per owner) ──────────────────────────────────────────

export const WORKLOAD_CEILING = 8;

export function workloadByOwner(cases: Case[]): Record<string, number> {
  const m: Record<string, number> = {};
  cases.filter((c) => !isClosed(c)).forEach((c) => { m[c.owner] = (m[c.owner] ?? 0) + 1; });
  return m;
}
