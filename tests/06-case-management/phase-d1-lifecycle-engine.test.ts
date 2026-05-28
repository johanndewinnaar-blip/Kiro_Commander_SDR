import { describe, it, expect } from 'vitest';
import {
  ALLOWED_TRANSITIONS,
  isTransitionAllowed,
  executeTransition,
  appendTransitionRecord,
  getCurrentStatusFromHistory,
} from '../../packages/contracts/src/entities/case-lifecycle';
import type {
  TransitionRequest,
  TransitionResult,
  CaseTransitionRecord,
  CaseLifecycleHistory,
} from '../../packages/contracts/src/entities/case-lifecycle';
import type { CaseStatus } from '../../packages/contracts/src/entities/case';

/**
 * Phase D1: Lifecycle Transition Engine Tests — Commander SDR
 *
 * Validates:
 * - executeTransition succeeds for all 6 allowed transitions
 * - executeTransition rejects invalid actors
 * - executeTransition rejects disallowed transitions
 * - executeTransition rejects from-state mismatch
 * - TransitionResult shape correctness
 * - appendTransitionRecord immutability
 * - getCurrentStatusFromHistory logic
 * - Full lifecycle walk and reopening path
 * - Manual creation/closure paths are impossible
 */

function makeRequest(from: CaseStatus, to: CaseStatus, actor: string = 'system'): TransitionRequest {
  return {
    transition: { from, to },
    actor: actor as any,
    reason: `Test transition from ${from} to ${to}`,
    auditEventRef: `audit-ref-${from}-${to}`,
  };
}

describe('executeTransition — allowed transitions', () => {
  it.each([
    ['open', 'in-progress'],
    ['in-progress', 'awaiting-validation'],
    ['awaiting-validation', 'awaiting-closure'],
    ['awaiting-closure', 'closed'],
    ['closed', 'reopened'],
    ['reopened', 'in-progress'],
  ] as [CaseStatus, CaseStatus][])('succeeds for %s → %s', (from, to) => {
    const request = makeRequest(from, to);
    const result = executeTransition('case-001', from, request);

    expect(result.success).toBe(true);
    expect(result.newStatus).toBe(to);
    expect(result.previousStatus).toBe(from);
    expect(result.auditEvent).not.toBeNull();
    expect(result.error).toBeNull();
  });
});

describe('executeTransition — actor validation', () => {
  it('rejects invalid actor (manual-user)', () => {
    const request = makeRequest('open', 'in-progress', 'manual-user');
    const result = executeTransition('case-001', 'open', request);

    expect(result.success).toBe(false);
    expect(result.newStatus).toBeNull();
    expect(result.previousStatus).toBe('open');
    expect(result.auditEvent).toBeNull();
    expect(result.error).toContain('Invalid actor');
  });

  it('rejects invalid actor (admin)', () => {
    const request = makeRequest('open', 'in-progress', 'admin');
    const result = executeTransition('case-001', 'open', request);

    expect(result.success).toBe(false);
    expect(result.error).toContain('Invalid actor');
  });

  it('accepts system actor', () => {
    const request = makeRequest('open', 'in-progress', 'system');
    const result = executeTransition('case-001', 'open', request);
    expect(result.success).toBe(true);
  });

  it('accepts routing-engine actor', () => {
    const request = makeRequest('open', 'in-progress', 'routing-engine');
    const result = executeTransition('case-001', 'open', request);
    expect(result.success).toBe(true);
  });
});

describe('executeTransition — disallowed transitions', () => {
  it('rejects open → closed (no direct closure)', () => {
    const request = makeRequest('open', 'closed' as CaseStatus);
    const result = executeTransition('case-001', 'open', request);

    expect(result.success).toBe(false);
    expect(result.error).toContain('not allowed');
  });

  it('rejects in-progress → closed (no direct closure)', () => {
    const request = makeRequest('in-progress', 'closed' as CaseStatus);
    const result = executeTransition('case-001', 'in-progress', request);

    expect(result.success).toBe(false);
    expect(result.error).toContain('not allowed');
  });

  it('rejects closed → open (must go through reopened)', () => {
    const request = makeRequest('closed', 'open' as CaseStatus);
    const result = executeTransition('case-001', 'closed', request);

    expect(result.success).toBe(false);
    expect(result.error).toContain('not allowed');
  });
});

describe('executeTransition — from-state mismatch', () => {
  it('rejects when request.transition.from does not match currentStatus', () => {
    const request = makeRequest('in-progress', 'awaiting-validation');
    // currentStatus is 'open' but request says from is 'in-progress'
    const result = executeTransition('case-001', 'open', request);

    expect(result.success).toBe(false);
    expect(result.error).toContain('does not match current status');
    expect(result.previousStatus).toBe('open');
  });
});

describe('executeTransition — TransitionResult shape', () => {
  it('returns correct shape on success', () => {
    const request = makeRequest('open', 'in-progress');
    const result: TransitionResult = executeTransition('case-001', 'open', request);

    expect(result).toHaveProperty('success', true);
    expect(result).toHaveProperty('newStatus', 'in-progress');
    expect(result).toHaveProperty('previousStatus', 'open');
    expect(result).toHaveProperty('error', null);
    expect(result.auditEvent).toBeDefined();
    expect(result.auditEvent!.caseId).toBe('case-001');
    expect(result.auditEvent!.from).toBe('open');
    expect(result.auditEvent!.to).toBe('in-progress');
    expect(result.auditEvent!.actor).toBe('system');
    expect(result.auditEvent!.reason).toBeTruthy();
    expect(result.auditEvent!.auditEventRef).toBeTruthy();
    expect(result.auditEvent!.timestamp).toBeTruthy();
    expect(result.auditEvent!.id).toBeTruthy();
  });

  it('returns correct shape on failure', () => {
    const request = makeRequest('open', 'closed' as CaseStatus);
    const result: TransitionResult = executeTransition('case-001', 'open', request);

    expect(result).toHaveProperty('success', false);
    expect(result).toHaveProperty('newStatus', null);
    expect(result).toHaveProperty('previousStatus', 'open');
    expect(result).toHaveProperty('auditEvent', null);
    expect(result.error).toBeTruthy();
  });
});

describe('appendTransitionRecord', () => {
  it('adds a record to history immutably', () => {
    const history: CaseLifecycleHistory = { caseId: 'case-001', records: [] };
    const record: CaseTransitionRecord = {
      id: 'txn-001',
      caseId: 'case-001',
      from: 'open',
      to: 'in-progress',
      actor: 'system',
      reason: 'Test',
      auditEventRef: 'audit-001',
      timestamp: '2026-01-18T10:00:00.000Z',
    };

    const updated = appendTransitionRecord(history, record);

    expect(updated.records).toHaveLength(1);
    expect(updated.records[0]).toEqual(record);
    // Original is unchanged (immutable)
    expect(history.records).toHaveLength(0);
  });

  it('appends to existing records', () => {
    const existing: CaseTransitionRecord = {
      id: 'txn-001',
      caseId: 'case-001',
      from: 'open',
      to: 'in-progress',
      actor: 'system',
      reason: 'First',
      auditEventRef: 'audit-001',
      timestamp: '2026-01-18T10:00:00.000Z',
    };
    const history: CaseLifecycleHistory = { caseId: 'case-001', records: [existing] };
    const newRecord: CaseTransitionRecord = {
      id: 'txn-002',
      caseId: 'case-001',
      from: 'in-progress',
      to: 'awaiting-validation',
      actor: 'routing-engine',
      reason: 'Second',
      auditEventRef: 'audit-002',
      timestamp: '2026-01-18T11:00:00.000Z',
    };

    const updated = appendTransitionRecord(history, newRecord);

    expect(updated.records).toHaveLength(2);
    expect(updated.records[0]).toEqual(existing);
    expect(updated.records[1]).toEqual(newRecord);
  });
});

describe('getCurrentStatusFromHistory', () => {
  it('returns open for empty history', () => {
    const history: CaseLifecycleHistory = { caseId: 'case-001', records: [] };
    expect(getCurrentStatusFromHistory(history)).toBe('open');
  });

  it('returns last transition to-state', () => {
    const history: CaseLifecycleHistory = {
      caseId: 'case-001',
      records: [
        {
          id: 'txn-001',
          caseId: 'case-001',
          from: 'open',
          to: 'in-progress',
          actor: 'system',
          reason: 'Start',
          auditEventRef: 'audit-001',
          timestamp: '2026-01-18T10:00:00.000Z',
        },
        {
          id: 'txn-002',
          caseId: 'case-001',
          from: 'in-progress',
          to: 'awaiting-validation',
          actor: 'system',
          reason: 'Validate',
          auditEventRef: 'audit-002',
          timestamp: '2026-01-18T11:00:00.000Z',
        },
      ],
    };
    expect(getCurrentStatusFromHistory(history)).toBe('awaiting-validation');
  });
});

describe('Full lifecycle walk', () => {
  it('open → in-progress → awaiting-validation → awaiting-closure → closed', () => {
    const caseId = 'case-lifecycle-walk';
    let history: CaseLifecycleHistory = { caseId, records: [] };
    let status: CaseStatus = 'open';

    const steps: [CaseStatus, CaseStatus][] = [
      ['open', 'in-progress'],
      ['in-progress', 'awaiting-validation'],
      ['awaiting-validation', 'awaiting-closure'],
      ['awaiting-closure', 'closed'],
    ];

    for (const [from, to] of steps) {
      const request = makeRequest(from, to);
      const result = executeTransition(caseId, status, request);
      expect(result.success).toBe(true);
      expect(result.newStatus).toBe(to);
      history = appendTransitionRecord(history, result.auditEvent!);
      status = result.newStatus!;
    }

    expect(getCurrentStatusFromHistory(history)).toBe('closed');
    expect(history.records).toHaveLength(4);
  });

  it('reopening: closed → reopened → in-progress', () => {
    const caseId = 'case-reopen';
    let history: CaseLifecycleHistory = { caseId, records: [] };
    let status: CaseStatus = 'closed';

    const steps: [CaseStatus, CaseStatus][] = [
      ['closed', 'reopened'],
      ['reopened', 'in-progress'],
    ];

    for (const [from, to] of steps) {
      const request = makeRequest(from, to);
      const result = executeTransition(caseId, status, request);
      expect(result.success).toBe(true);
      history = appendTransitionRecord(history, result.auditEvent!);
      status = result.newStatus!;
    }

    expect(getCurrentStatusFromHistory(history)).toBe('in-progress');
  });
});

describe('Doctrinal enforcement — no manual paths', () => {
  it('no transition TO open exists (manual creation impossible)', () => {
    const transitionsToOpen = ALLOWED_TRANSITIONS.filter((t) => t.to === 'open');
    expect(transitionsToOpen).toHaveLength(0);
  });

  it('no direct transition from open to closed (manual closure impossible)', () => {
    expect(isTransitionAllowed('open', 'closed')).toBe(false);
  });

  it('no direct transition from in-progress to closed (manual closure impossible)', () => {
    expect(isTransitionAllowed('in-progress', 'closed')).toBe(false);
  });
});
