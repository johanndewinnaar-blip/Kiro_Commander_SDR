import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { seedCases } from '../../packages/contracts/src/fixtures/seed-cases';
import { seedAssets } from '../../packages/contracts/src/fixtures/seed-assets';
import { seedConnectors } from '../../packages/contracts/src/fixtures/seed-connectors';
import { allRoutes } from '../../apps/web/src/registry/index';
import { componentTokens } from '../../packages/ui/src/tokens/components';

const ROOT = resolve(import.meta.dirname, '../..');
const PAGE_PATH = resolve(ROOT, 'apps/web/src/app/page.tsx');
const pageContent = readFileSync(PAGE_PATH, 'utf-8');

/**
 * Command Centre Tests — DS-1.0 Phase 3
 *
 * Validates:
 * - Route registration
 * - DS-1.0 workspace structure (Header → KPI strip → Insight Row → Content Grid)
 * - Both Standard and Mission modes supported (useMode)
 * - KPI strip with 8 tiles (carries posture/SLA/coverage metrics)
 * - P0 banner with emergency styling
 * - Live activity feed
 * - Seed data consumption only
 * - Zero hardcoded values (uses token imports)
 * - No manual case creation paths
 */

describe('Command Centre — Route Registration', () => {
  it('/ is registered in the route registry', () => {
    const route = allRoutes.find((r) => r.path === '/');
    expect(route).toBeDefined();
    expect(route!.label).toBe('Command Centre');
    expect(route!.boundary).toBe('operational');
  });
});

describe('Command Centre — DS-1.0 Mode Support', () => {
  it('page uses useMode hook for mode-aware rendering', () => {
    expect(pageContent).toContain('useMode');
  });

  it('page imports semantic tokens via mode context', () => {
    expect(pageContent).toContain('tokens.surface');
    expect(pageContent).toContain('tokens.text');
    expect(pageContent).toContain('tokens.border');
  });
});

describe('Command Centre — KPI Strip (DS-1.0 §21 Req 26)', () => {
  it('renders 8 KPI tiles', () => {
    expect(pageContent).toContain('Open Cases');
    expect(pageContent).toContain('Total Assets');
    expect(pageContent).toContain('Identities');
    expect(pageContent).toContain('Active Connectors');
    expect(pageContent).toContain('Connector Errors');
    expect(pageContent).toContain('Posture Score');
    expect(pageContent).toContain('SLA Compliance');
    expect(pageContent).toContain('Coverage');
  });

  it('uses KPI tile styles from component library', () => {
    expect(pageContent).toContain('getKpiTileStyles');
    expect(pageContent).toContain('getTrendIndicator');
  });
});

describe('Command Centre — KPI Strip carries posture metrics (gauges removed)', () => {
  it('KPI strip includes Posture Score metric', () => {
    expect(pageContent).toContain('Posture Score');
  });

  it('KPI strip includes SLA Compliance metric', () => {
    expect(pageContent).toContain('SLA Compliance');
  });

  it('KPI strip includes Coverage metric', () => {
    expect(pageContent).toContain('Coverage');
  });
});

describe('Command Centre — P0 Banner', () => {
  it('seed data contains P0 case', () => {
    expect(seedCases.filter((c) => c.priority === 'P0').length).toBeGreaterThan(0);
  });

  it('page renders P0 banner with role="alert"', () => {
    expect(pageContent).toContain('role="alert"');
    expect(pageContent).toContain('P0 ACTIVE');
  });

  it('P0 banner uses signal.critical colour from tokens', () => {
    expect(pageContent).toContain('primitiveSignal.critical');
  });
});

describe('Command Centre — Live Activity Feed (DS-1.0 §21 Req 33)', () => {
  it('renders live feed with severity dots', () => {
    expect(pageContent).toContain('getLiveFeedStyles');
    expect(pageContent).toContain('getSeverityColor');
    expect(pageContent).toContain('Live Activity');
  });
});

describe('Command Centre — Token Consumption (Zero Hardcoded)', () => {
  it('uses componentTokens for layout dimensions', () => {
    expect(pageContent).toContain('componentTokens.contentPadding');
    expect(pageContent).toContain('componentTokens.cardPadding');
    expect(pageContent).toContain('componentTokens.gridGap');
    expect(pageContent).toContain('componentTokens.cardRadius');
  });

  it('uses primitiveTypeScale for font sizes', () => {
    expect(pageContent).toContain('primitiveTypeScale.h1');
    expect(pageContent).toContain('primitiveTypeScale.body');
    expect(pageContent).toContain('primitiveTypeScale.micro');
  });

  it('uses primitiveFonts for font families', () => {
    expect(pageContent).toContain('primitiveFonts.body');
  });

  it('does not contain hardcoded pixel values for layout', () => {
    // Should not have raw px values for padding/gap (except 76px page header which is a known component dimension)
    expect(pageContent).not.toContain("padding: '14px'");
    expect(pageContent).not.toContain("padding: '18px'");
    expect(pageContent).not.toContain("padding: '26px'");
    expect(pageContent).not.toContain("padding: '28px'");
  });
});

describe('Command Centre — Seed Data Only', () => {
  it('consumes seed cases', () => {
    expect(pageContent).toContain('seedCases');
  });

  it('consumes seed assets', () => {
    expect(pageContent).toContain('seedAssets');
  });

  it('consumes seed connectors', () => {
    expect(pageContent).toContain('seedConnectors');
  });

  it('does not define new entity types', () => {
    expect(existsSync(resolve(ROOT, 'apps/web/src/app/entities.ts'))).toBe(false);
  });
});

describe('Command Centre — No Manual Case Creation', () => {
  it('page does not contain manual case creation UI', () => {
    expect(pageContent).not.toContain('Create Case');
    expect(pageContent).not.toContain('createCase');
    expect(pageContent).not.toContain('manual');
  });
});
