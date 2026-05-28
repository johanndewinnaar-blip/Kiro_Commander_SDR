import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { seedCases } from '../../packages/contracts/src/fixtures/seed-cases';
import { LIFECYCLE_STAGES } from '../../packages/ui/src/components/lifecycle-pipeline';

const ROOT = resolve(import.meta.dirname, '../..');
const PAGE_PATH = resolve(ROOT, 'apps/web/src/app/cases/page.tsx');
const pageContent = readFileSync(PAGE_PATH, 'utf-8');

/**
 * Spec 06 Phase C1 — Case Queue Tests
 *
 * Validates:
 * - Case Queue page exists
 * - Uses mode context (Standard + Mission)
 * - Lifecycle pipeline present with 7 stages
 * - Table renders priority with shape+colour+label (never colour alone)
 * - Surface attribution visible on every row
 * - SLA from strategy resolvers (not hardcoded)
 * - No manual case creation button
 * - Consumes seed cases only
 */

describe('Case Queue — Page Exists', () => {
  it('cases/page.tsx exists', () => {
    expect(existsSync(PAGE_PATH)).toBe(true);
  });
});

describe('Case Queue — Mode Support', () => {
  it('uses useMode hook', () => {
    expect(pageContent).toContain('useMode');
  });

  it('uses semantic tokens from mode context', () => {
    expect(pageContent).toContain('tokens.surface');
    expect(pageContent).toContain('tokens.text');
    expect(pageContent).toContain('tokens.border');
  });
});

describe('Case Queue — Lifecycle Pipeline (DS-1.0 §21 Req 29)', () => {
  it('renders LIFECYCLE_STAGES', () => {
    expect(pageContent).toContain('LIFECYCLE_STAGES');
  });

  it('lifecycle has 7 stages', () => {
    expect(LIFECYCLE_STAGES.length).toBe(7);
  });

  it('active stages get gold border', () => {
    expect(pageContent).toContain('primitiveBrand.gold');
  });
});

describe('Case Queue — Priority (DS-1.0 §14.1 — never colour alone)', () => {
  it('uses primitivePriority for shape+colour+label', () => {
    expect(pageContent).toContain('primitivePriority');
    expect(pageContent).toContain('p.shape');
    expect(pageContent).toContain('p.label');
    expect(pageContent).toContain('p.color');
  });
});

describe('Case Queue — Surface Attribution (Assertion 10)', () => {
  it('displays surface attribution on every row', () => {
    expect(pageContent).toContain('surfaceAttribution');
    expect(pageContent).toContain('External');
    expect(pageContent).toContain('Internal');
  });
});

describe('Case Queue — Strategy Consumption (Constraint 9)', () => {
  it('uses resolveAllStrategies from Phase B resolvers', () => {
    expect(pageContent).toContain('resolveAllStrategies');
    expect(pageContent).toContain('seedStrategies');
  });

  it('SLA hours come from strategy resolution (not hardcoded)', () => {
    expect(pageContent).toContain("c.strategy.sla.status === 'resolved'");
    expect(pageContent).toContain('c.strategy.sla.responseHours');
  });
});

describe('Case Queue — No Manual Case Creation (Assertion 1)', () => {
  it('no Create Case button', () => {
    expect(pageContent).not.toContain('Create Case');
    expect(pageContent).not.toContain('createCase');
    expect(pageContent).not.toContain('New Case');
  });
});

describe('Case Queue — Token Consumption', () => {
  it('uses componentTokens for dimensions', () => {
    expect(pageContent).toContain('componentTokens.contentPadding');
    expect(pageContent).toContain('componentTokens.tableRowHeight');
    expect(pageContent).toContain('componentTokens.tableHeaderHeight');
  });

  it('uses primitiveTypeScale for font sizes', () => {
    expect(pageContent).toContain('primitiveTypeScale.h1');
    expect(pageContent).toContain('primitiveTypeScale.body');
    expect(pageContent).toContain('primitiveTypeScale.caption');
  });
});

describe('Case Queue — Seed Data Only', () => {
  it('consumes seedCases', () => {
    expect(pageContent).toContain('seedCases');
  });

  it('seed cases exist', () => {
    expect(seedCases.length).toBeGreaterThan(0);
  });
});
