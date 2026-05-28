import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { primitiveData } from '../../packages/ui/src/tokens/primitives';

const ROOT = resolve(import.meta.dirname, '../..');
const PAGE_PATH = resolve(ROOT, 'apps/web/src/app/cases/analytics/page.tsx');
const pageContent = readFileSync(PAGE_PATH, 'utf-8');

/**
 * Spec 06 Phase C3b — Case Analytics Tests
 *
 * Validates:
 * - Page exists at cases/analytics/page.tsx
 * - Uses mode context (Standard + Mission)
 * - 4 Vega-Lite chart specs: line (trend), donut (distribution), gauge (SLA), bar (priority)
 * - Charts use --data-* tokens (primitiveData) — never literal hex (DS-1.0 §13)
 * - SLA compliance from strategy resolver (not hardcoded)
 * - Each chart has title
 * - Empty state defined
 * - Mission mode: mono font for numeric summaries
 */

describe('Case Analytics — Page Exists', () => {
  it('cases/analytics/page.tsx exists', () => {
    expect(existsSync(PAGE_PATH)).toBe(true);
  });
});

describe('Case Analytics — Mode Support', () => {
  it('uses useMode hook', () => {
    expect(pageContent).toContain('useMode');
  });

  it('passes mode to chart spec generators', () => {
    expect(pageContent).toContain('getCaseVolumeTrendSpec(mode');
    expect(pageContent).toContain('getCaseTypeDistributionSpec(mode');
    expect(pageContent).toContain('getPriorityDistributionSpec(mode');
  });
});

describe('Case Analytics — Four Chart Types (DS-1.0 §13)', () => {
  it('has Case Volume Trend (line chart)', () => {
    expect(pageContent).toContain('Case Volume Trend');
    expect(pageContent).toContain("type: 'line'");
  });

  it('has Case Type Distribution (donut/arc chart)', () => {
    expect(pageContent).toContain('Case Type Distribution');
    expect(pageContent).toContain("type: 'arc'");
  });

  it('has SLA Compliance (gauge — numeric display)', () => {
    expect(pageContent).toContain('SLA Compliance');
    expect(pageContent).toContain('slaCompliancePct');
  });

  it('has Priority Distribution (bar chart)', () => {
    expect(pageContent).toContain('Priority Distribution');
    expect(pageContent).toContain("type: 'bar'");
  });
});

describe('Case Analytics — Data Tokens Only (DS-1.0 §13 — never literal hex)', () => {
  it('uses primitiveData tokens for chart colours', () => {
    expect(pageContent).toContain('primitiveData[1]');
    expect(pageContent).toContain('primitiveData[2]');
    expect(pageContent).toContain('primitiveData[3]');
  });

  it('does not contain literal hex in chart colour definitions', () => {
    // Chart colour arrays should reference primitiveData, not literal hex
    // The only hex values should be in token imports, not in chart specs
    const chartSpecSections = pageContent.split('function get')[1]; // after first spec function
    if (chartSpecSections) {
      // Verify no standalone hex in range arrays (they should all be primitiveData refs)
      expect(chartSpecSections).not.toMatch(/range:\s*\[\s*'#[0-9a-f]{6}'/i);
    }
  });
});

describe('Case Analytics — SLA from Strategy Resolver (Constraint 9)', () => {
  it('uses resolveAllStrategies for SLA data', () => {
    expect(pageContent).toContain('resolveAllStrategies');
    expect(pageContent).toContain('seedStrategies');
  });

  it('SLA compliance derived from resolver output', () => {
    expect(pageContent).toContain('slaResolutions');
    expect(pageContent).toContain("s.status === 'resolved'");
  });

  it('notes strategy source in subtitle', () => {
    expect(pageContent).toContain('From strategy resolver');
    expect(pageContent).toContain('not hardcoded');
  });
});

describe('Case Analytics — Chart Requirements (DS-1.0 §13)', () => {
  it('every chart has a title', () => {
    expect(pageContent).toContain("title: { text: 'Case Volume Trend'");
    expect(pageContent).toContain("title: { text: 'Case Type Distribution'");
    expect(pageContent).toContain("title: { text: 'Priority Distribution'");
  });

  it('charts include tooltip encoding', () => {
    expect(pageContent).toContain('tooltip:');
  });

  it('trend chart has temporal x-axis (time context)', () => {
    expect(pageContent).toContain("type: 'temporal'");
  });

  it('empty state is defined', () => {
    expect(pageContent).toContain('EmptyState');
    expect(pageContent).toContain('No data available');
  });
});

describe('Case Analytics — Mission Mode Adaptations (DS-1.0 §13.4)', () => {
  it('Mission mode uses mono font for chart config', () => {
    expect(pageContent).toContain("mode === 'mission' ? primitiveFonts.mono : primitiveFonts.body");
  });

  it('SLA value uses mono font', () => {
    expect(pageContent).toContain('primitiveFonts.mono');
    expect(pageContent).toContain('slaCompliancePct');
  });
});

describe('Case Analytics — Token Consumption', () => {
  it('uses componentTokens for layout', () => {
    expect(pageContent).toContain('componentTokens.contentPadding');
    expect(pageContent).toContain('componentTokens.cardPadding');
    expect(pageContent).toContain('componentTokens.gridGap');
  });

  it('uses primitiveTypeScale for font sizes', () => {
    expect(pageContent).toContain('primitiveTypeScale.h1');
    expect(pageContent).toContain('primitiveTypeScale.h3');
    expect(pageContent).toContain('primitiveTypeScale.micro');
  });
});
