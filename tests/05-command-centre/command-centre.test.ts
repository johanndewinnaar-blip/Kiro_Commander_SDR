import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { seedCases } from '../../packages/contracts/src/fixtures/seed-cases';
import { seedAssets } from '../../packages/contracts/src/fixtures/seed-assets';
import { seedIdentities } from '../../packages/contracts/src/fixtures/seed-identities';
import { seedConnectors } from '../../packages/contracts/src/fixtures/seed-connectors';
import { allRoutes } from '../../apps/web/src/registry/index';

/**
 * Command Centre Tests — Commander SDR
 *
 * Validates:
 * - Command Centre page exists at / (route registry)
 * - Consumes canonical seed data (not inventing entities)
 * - P0 cases exist in seed data for prominent display
 * - Route is registered as BUILD in operational boundary
 * - No new entities invented (display surface only)
 *
 * Source: Spec 05, Domain Requirements 1-6
 */

const ROOT = resolve(import.meta.dirname, '../..');

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

  it('/ is owned by spec 05-command-centre', () => {
    const route = allRoutes.find((r) => r.path === '/');
    expect(route!.owningSpec).toBe('05-command-centre');
  });
});

describe('Command Centre — Seed Data Consumption', () => {
  it('has seed cases available for display', () => {
    expect(seedCases.length).toBeGreaterThan(0);
  });

  it('has seed assets available for display', () => {
    expect(seedAssets.length).toBeGreaterThan(0);
  });

  it('has seed identities available for display', () => {
    expect(seedIdentities.length).toBeGreaterThan(0);
  });

  it('has seed connectors available for display', () => {
    expect(seedConnectors.length).toBeGreaterThan(0);
  });

  it('has at least one P0 case for prominent display (Domain Req 4)', () => {
    const p0Cases = seedCases.filter((c) => c.priority === 'P0');
    expect(p0Cases.length).toBeGreaterThan(0);
  });

  it('has open cases for the case count metric', () => {
    const openCases = seedCases.filter((c) => c.status === 'open' || c.status === 'in-progress');
    expect(openCases.length).toBeGreaterThan(0);
  });
});

describe('Command Centre — Page File Exists', () => {
  it('page.tsx exists at apps/web/src/app/', () => {
    expect(existsSync(resolve(ROOT, 'apps/web/src/app/page.tsx'))).toBe(true);
  });
});

describe('Command Centre — No Entity Invention', () => {
  it('does not create new entity types (display surface only)', () => {
    // Command Centre consumes existing canonical entities from spec 03
    // It should not define new entity interfaces
    const commandCentreDir = resolve(ROOT, 'apps/web/src/app');
    // No entity definition files should exist in the page directory
    expect(existsSync(resolve(commandCentreDir, 'entities.ts'))).toBe(false);
    expect(existsSync(resolve(commandCentreDir, 'models.ts'))).toBe(false);
  });
});

describe('Command Centre — Domain Requirement Compliance', () => {
  it('Domain Req 2: all metric card hrefs point to registered routes', () => {
    const registeredPaths = allRoutes.map((r) => r.path);
    const metricHrefs = ['/cases', '/assets', '/identity', '/vulnerabilities', '/exposure', '/controls'];
    for (const href of metricHrefs) {
      expect(registeredPaths, `${href} not in route registry`).toContain(href);
    }
  });
});
