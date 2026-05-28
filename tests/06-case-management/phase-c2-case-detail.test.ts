import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');
const PAGE_PATH = resolve(ROOT, 'apps/web/src/app/cases/[id]/page.tsx');
const pageContent = readFileSync(PAGE_PATH, 'utf-8');

/**
 * Spec 06 Phase C2 — Case Detail Tests
 *
 * Validates:
 * - Case Detail page exists at cases/[id]/page.tsx
 * - Uses mode context (Standard + Mission)
 * - Sticky case header with priority, ref, surface attribution
 * - Strategy consumption: routing rationale, SLA, closure gates, reopening triggers
 * - Right-rail present (DS-1.0 §21 Req 32)
 * - No manual status edit or closure buttons (Assertion 1)
 * - Surface attribution displayed (Assertion 10)
 * - Audit trail reference shown
 * - Related entities section
 */

describe('Case Detail — Page Exists', () => {
  it('cases/[id]/page.tsx exists', () => {
    expect(existsSync(PAGE_PATH)).toBe(true);
  });
});

describe('Case Detail — Mode Support', () => {
  it('uses useMode hook', () => {
    expect(pageContent).toContain('useMode');
  });
});

describe('Case Detail — Sticky Header (Spec 02 v1.3 Req 5)', () => {
  it('has sticky positioning', () => {
    expect(pageContent).toContain("position: 'sticky'");
  });

  it('displays priority with shape+colour+label', () => {
    expect(pageContent).toContain('p.shape');
    expect(pageContent).toContain('p.label');
    expect(pageContent).toContain('p.color');
  });

  it('displays case reference', () => {
    expect(pageContent).toContain('caseRecord.caseRef');
  });

  it('displays surface attribution', () => {
    expect(pageContent).toContain('surfaceAttribution');
    expect(pageContent).toContain('External');
    expect(pageContent).toContain('Internal');
  });
});

describe('Case Detail — Strategy Consumption (Constraint 9)', () => {
  it('uses resolveAllStrategies', () => {
    expect(pageContent).toContain('resolveAllStrategies');
  });

  it('displays routing rationale from strategy', () => {
    expect(pageContent).toContain('routingRationale');
    expect(pageContent).toContain('strategy.routing');
  });

  it('displays SLA from strategy resolution', () => {
    expect(pageContent).toContain('strategy.sla');
  });

  it('displays closure gates from strategy', () => {
    expect(pageContent).toContain('strategy.closureGates');
  });

  it('displays reopening triggers from strategy', () => {
    expect(pageContent).toContain('strategy.reopening');
  });

  it('displays validation window from strategy', () => {
    expect(pageContent).toContain('strategy.validation');
  });
});

describe('Case Detail — Right Rail (DS-1.0 §21 Req 32)', () => {
  it('has a right rail aside element', () => {
    expect(pageContent).toContain('<aside');
    expect(pageContent).toContain("width: '320px'");
  });

  it('right rail contains Case Actions section', () => {
    expect(pageContent).toContain('Case Actions');
  });

  it('right rail contains Recommended Next section', () => {
    expect(pageContent).toContain('Recommended Next');
  });
});

describe('Case Detail — No Manual Actions (Assertion 1)', () => {
  it('no manual status edit button', () => {
    expect(pageContent).not.toContain('Change Status');
    expect(pageContent).not.toContain('Edit Status');
    expect(pageContent).not.toContain('manualStatus');
  });

  it('no manual closure button', () => {
    expect(pageContent).not.toContain('Close Case');
    expect(pageContent).not.toContain('Manual Close');
    expect(pageContent).not.toContain('manualClosure');
  });

  it('case actions note system-owned lifecycle', () => {
    expect(pageContent).toContain('System-owned lifecycle');
  });
});

describe('Case Detail — Token Consumption', () => {
  it('uses componentTokens', () => {
    expect(pageContent).toContain('componentTokens.contentPadding');
    expect(pageContent).toContain('componentTokens.cardPadding');
    expect(pageContent).toContain('componentTokens.cardRadius');
  });

  it('uses primitiveTypeScale', () => {
    expect(pageContent).toContain('primitiveTypeScale.h2');
    expect(pageContent).toContain('primitiveTypeScale.body');
  });
});

describe('Case Detail — Audit Trail', () => {
  it('displays audit trail reference', () => {
    expect(pageContent).toContain('auditTrailRef');
    expect(pageContent).toContain('Audit Trail');
  });
});
