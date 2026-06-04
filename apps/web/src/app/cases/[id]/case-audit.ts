/**
 * Case Audit Timeline (derived) — Commander SDR
 *
 * Builds a chronological, system-attributed audit timeline for a case from its
 * real fields plus its bound actions. Engine actors mirror the 12-state
 * lifecycle (case-lifecycle.ts). This is review scaffolding: the events are
 * synthesised from the case/action data that exists, not from a live audit log.
 */

import type { Case } from '../../../../../../packages/contracts/src/entities/case';
import type { Action } from '../../../../../../packages/contracts/src/entities/action';

export interface AuditEvent {
  timestamp: string;
  actor: string;
  action: string;
  detail: string;
}

export function buildAuditTimeline(c: Case, actions: Action[]): AuditEvent[] {
  const events: AuditEvent[] = [];

  events.push({
    timestamp: c.createdAt,
    actor: 'binding-engine',
    action: 'Case created',
    detail: `Bound from source ${c.source.sourceSystem} (import ${c.source.importRunId}).`,
  });
  events.push({
    timestamp: c.createdAt,
    actor: 'routing-engine',
    action: `Routed to ${c.team}`,
    detail: c.routingRationale,
  });
  events.push({
    timestamp: c.createdAt,
    actor: 'prioritisation-engine',
    action: `Priority ${c.priority} assigned`,
    detail: `SLA target ${c.sla.targetResolutionHours}h; surface ${c.surfaceAttribution === 'external_attack_surface' ? 'external' : 'internal'}.`,
  });

  // Action generation + sub-action progress
  for (const a of actions) {
    events.push({
      timestamp: a.createdAt,
      actor: 'system',
      action: `Action decomposed: ${a.title}`,
      detail: `${a.description} (owner ${a.owner}, est ${a.estimatedEffortHours}h).`,
    });
    if (a.status === 'completed' || a.status === 'in_progress') {
      events.push({
        timestamp: a.updatedAt,
        actor: a.owner,
        action: `Action ${a.status === 'completed' ? 'completed' : 'progressed'}: ${a.title}`,
        detail: `Actual effort ${a.actualEffortHours}h.`,
      });
    }
  }

  // Validation + closure signals derived from status
  if (['awaiting-validation', 'pending_validation', 'validation_running', 'awaiting-closure', 'pending_closure_gates', 'closed', 'closed_by_system'].includes(c.status)) {
    events.push({
      timestamp: c.updatedAt,
      actor: 'validation-engine',
      action: 'Validation requested',
      detail: 'Evidence sufficiency and validation window evaluated against strategy.',
    });
  }
  if (['closed', 'closed_by_system'].includes(c.status)) {
    events.push({
      timestamp: c.updatedAt,
      actor: 'closure-engine',
      action: 'Closed by system',
      detail: 'All closure gates passed. Reopening triggers armed.',
    });
  }

  // Communication events (mirrors the mocked comms flow)
  events.push({
    timestamp: c.createdAt,
    actor: c.owner,
    action: 'Communication sent',
    detail: `Remediation request emailed to ${c.team}.`,
  });
  if (c.sla.breached) {
    events.push({
      timestamp: c.updatedAt,
      actor: 'escalation-engine',
      action: 'Escalation triggered',
      detail: 'SLA breached — case escalated for command attention.',
    });
  }

  return events.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}
