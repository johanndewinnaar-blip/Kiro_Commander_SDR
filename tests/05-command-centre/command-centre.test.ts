import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { seedCases } from '../../packages/contracts/src/fixtures/seed-cases';
import { seedAssets } from '../../packages/contracts/src/fixtures/seed-assets';
import { seedIdentities } from '../../packages/contracts/src/fixtures/seed-identities';
import { seedConnectors } from '../../packages/contracts/src/fixtures/seed-connectors';
import { allRoutes } from '../../apps/web/src/registry/index';
import { colors } from '../../packages/ui/src/tokens/colors';
import { typography } from '../../packages/ui/src/tokens/typography';
import { chrome } from '../../packages/ui/src/tokens/spacing';

/**
 * Command Centre Tests — Commander SDR (Phase 4 — v1.3.2 Remediated)
 *
 * Validates:
 * - PageHeader renders with correct eyebrow, h1, and status tile
 * - 8 metric cards render (4-column grid, 2 rows)
 * - P0 banner fires when seed data contains a P0 case
 * - Each metric card uses OperationalCard style (white bg, correct border)
 * - Card titles link to registered routes via the registry
 * - Page consumes only seed data from Spec 03 (no new entities)
 * - v1.3.2 visual compliance
 */

const ROOT = resolve(import.meta.dirname, '../..');
const PAGE_PATH = resolve(ROOT, 'apps/web/src/app/page.tsx');

describe('Command Centre — Route Registration', () => {
  it('/ is registered in the route registry', () => {
    const route = allRoutes.find((r) => r.path === '/');
    expect(route).toBeDefined();
    expect(route!.label).toBe('Command Centre');
  });

  it('/ is in the operational boundary', () => {
    const route = allRoutes.find((r) => r.path === '/');
    expect(route!.boundary).toBe('operational');
  });

  it('/ has BUILD status', () => {
    const route = allRoutes.find((r) => r.path === '/');
    expect(route!.status).toBe('BUILD');
  });
});

describe('Command Centre — PageHeader (v1.3.2 Req 16)', () => {
  const pageContent = readFileSync(PAGE_PATH, 'utf-8');

  it('renders uppercase grey eyebrow', () => {
    expect(pageContent).toContain('textTransform');
    expect(pageContent).toContain('Command Centre');
  });

  it('renders 22px h1 page title via typography token', () => {
    expect(pageContent).toContain('typography.fontSize.h1');
  });

  it('renders StatusTile with green dot via status.live token', () => {
    expect(pageContent).toContain('colors.status.live');
    expect(pageContent).toContain('Last updated');
  });

  it('page header uses chrome.pageHeaderHeight token', () => {
    expect(pageContent).toContain('chrome.pageHeaderHeight');
  });
});

describe('Command Centre — 8 Metric Cards (4-column grid)', () => {
  const pageContent = readFileSync(PAGE_PATH, 'utf-8');

  it('uses 4-column grid layout', () => {
    expect(pageContent).toContain('repeat(4');
  });

  it('defines 8 metric cards', () => {
    // The getMetricCards function returns 8 items
    expect(pageContent).toContain('Open Cases');
    expect(pageContent).toContain('Total Assets');
    expect(pageContent).toContain('Identities');
    expect(pageContent).toContain('Active Connectors');
    expect(pageContent).toContain('Connector Errors');
    expect(pageContent).toContain('Vulnerabilities');
    expect(pageContent).toContain('Exposures');
    expect(pageContent).toContain('Control Coverage');
  });

  it('uses OperationalCard visual (white bg, #dbe3ef border, 18px padding)', () => {
    expect(pageContent).toContain('colors.operational.panel');
    expect(pageContent).toContain('colors.operational.line');
    expect(pageContent).toContain("'18px'");
  });

  it('card titles use uppercase 13px with 0.06em tracking', () => {
    expect(pageContent).toContain('typography.letterSpacing.eyebrow');
    expect(pageContent).toContain("'uppercase'");
  });
});

describe('Command Centre — P0 Banner', () => {
  it('seed data contains at least one P0 case', () => {
    const p0Cases = seedCases.filter((c) => c.priority === 'P0');
    expect(p0Cases.length).toBeGreaterThan(0);
  });

  it('page renders P0 banner with emergency styling', () => {
    const pageContent = readFileSync(PAGE_PATH, 'utf-8');
    expect(pageContent).toContain('P0 ACTIVE');
    expect(pageContent).toContain('colors.priority.p0');
    expect(pageContent).toContain('colors.intensity.emergency.background');
  });

  it('P0 banner uses role="alert" for accessibility', () => {
    const pageContent = readFileSync(PAGE_PATH, 'utf-8');
    expect(pageContent).toContain('role="alert"');
  });
});

describe('Command Centre — Card Links to Registered Routes', () => {
  it('all metric card route paths exist in the registry or nav groups', () => {
    const registeredPaths = allRoutes.map((r) => r.path);
    // Core routes that must be registered
    const requiredPaths = ['/cases', '/assets', '/identity', '/vulnerabilities', '/exposure', '/controls'];
    for (const path of requiredPaths) {
      expect(registeredPaths, `${path} not in route registry`).toContain(path);
    }
  });
});

describe('Command Centre — No Entity Invention', () => {
  it('page.tsx exists', () => {
    expect(existsSync(PAGE_PATH)).toBe(true);
  });

  it('does not create new entity types (display surface only)', () => {
    const commandCentreDir = resolve(ROOT, 'apps/web/src/app');
    expect(existsSync(resolve(commandCentreDir, 'entities.ts'))).toBe(false);
    expect(existsSync(resolve(commandCentreDir, 'models.ts'))).toBe(false);
  });
});

describe('Command Centre — Seed Data Consumption', () => {
  it('has seed cases available', () => {
    expect(seedCases.length).toBeGreaterThan(0);
  });

  it('has seed assets available', () => {
    expect(seedAssets.length).toBeGreaterThan(0);
  });

  it('has seed identities available', () => {
    expect(seedIdentities.length).toBeGreaterThan(0);
  });

  it('has seed connectors available', () => {
    expect(seedConnectors.length).toBeGreaterThan(0);
  });
});
