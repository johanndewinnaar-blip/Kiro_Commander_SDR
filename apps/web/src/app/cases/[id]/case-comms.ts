/**
 * Case Communication (MOCKED) — Commander SDR
 *
 * Static, deterministic communication structures that show what the email +
 * Teams integration WILL look like bound to a case. No live mail/Teams calls —
 * this is review scaffolding (Spec #25 Email-Case Communication shape).
 *
 * The flow is derived from the case's own fields (team, owner, priority,
 * status, SLA) so each case shows a coherent, case-specific thread.
 */

import type { Case } from '../../../../../../packages/contracts/src/entities/case';

export type CommState = 'not_started' | 'awaiting_response' | 'in_discussion' | 'stale' | 'escalated';

export interface MockEmail {
  direction: 'outbound' | 'inbound' | 'reminder' | 'escalation';
  subject: string;
  body: string;
  timestamp: string;
  meta?: string;
}

export interface MockTeamsPost {
  title: string;
  body: string;
  timestamp: string;
  actions?: string[];
}

export interface CaseComms {
  state: CommState;
  mailbox: string;
  emails: MockEmail[];
  teams: MockTeamsPost[];
}

function fmt(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' });
}

function addHours(iso: string, h: number): string {
  return new Date(new Date(iso).getTime() + h * 3_600_000).toISOString();
}

/** Determine a plausible communication state from case status + SLA. */
function deriveState(c: Case): CommState {
  if (c.status === 'closed' || c.status === 'closed_by_system') return 'in_discussion';
  if (c.sla.breached) return 'escalated';
  if (c.priority === 'P0' || c.priority === 'P1') return 'awaiting_response';
  if (c.status === 'open' || c.status === 'detected') return 'not_started';
  return 'in_discussion';
}

export function buildCaseComms(c: Case): CaseComms {
  const state = deriveState(c);
  const t0 = c.createdAt;
  const mailbox = `cases+${c.caseRef.toLowerCase()}@commander-sdr.demo`;

  const emails: MockEmail[] = [
    {
      direction: 'outbound',
      subject: `[${c.caseRef}] Remediation request — ${c.title}`,
      body: `Remediation request raised with ${c.team}. Owner ${c.owner} actioned via routing engine. Priority ${c.priority}, SLA target ${c.sla.targetResolutionHours}h.`,
      timestamp: fmt(addHours(t0, 0.5)),
      meta: `Template: remediation-request-v2 · Mailbox: ${mailbox}`,
    },
  ];

  if (state !== 'not_started') {
    emails.push({
      direction: 'inbound',
      subject: `RE: [${c.caseRef}] Remediation request`,
      body: `${c.team} acknowledged. Patch/mitigation scheduled. Awaiting change window confirmation.`,
      timestamp: fmt(addHours(t0, 6)),
      meta: 'Correlated to thread via In-Reply-To header · parsed by inbound correlator',
    });
  }

  if (state === 'stale' || state === 'escalated') {
    emails.push({
      direction: 'reminder',
      subject: `[${c.caseRef}] SLA reminder — no response in 48h`,
      body: `System-generated reminder. No confirmed remediation within 48h of last inbound. Approaching SLA threshold.`,
      timestamp: fmt(addHours(t0, 48)),
      meta: 'System-generated · cadence from SLA strategy',
    });
  }

  if (state === 'escalated') {
    emails.push({
      direction: 'escalation',
      subject: `[${c.caseRef}] Escalation — response threshold breached`,
      body: `Escalated to ${c.team} lead and SOM. SLA breached; case promoted for command attention.`,
      timestamp: fmt(addHours(t0, 50)),
      meta: 'Escalation engine · audit-logged',
    });
  }

  const teams: MockTeamsPost[] = [
    {
      title: 'Command Bridge → #security-management',
      body: `${c.priority} ${c.caseRef} opened: ${c.title}. Owner ${c.owner} (${c.team}).`,
      timestamp: fmt(addHours(t0, 0.6)),
    },
    {
      title: `Adaptive Card → ${c.owner}`,
      body: 'Confirm remediation status for this case.',
      timestamp: fmt(addHours(t0, 6.2)),
      actions: ['Confirm applied', 'Blocked', 'Need info'],
    },
  ];

  if (state === 'in_discussion' || c.status === 'closed' || c.status === 'closed_by_system') {
    teams.push({
      title: `Response received ← ${c.owner}`,
      body: 'Confirmed — remediation applied; awaiting validation.',
      timestamp: fmt(addHours(t0, 7)),
    });
  }

  return { state, mailbox, emails, teams };
}
