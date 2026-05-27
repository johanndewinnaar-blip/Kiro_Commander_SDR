import { describe, it, expect } from 'vitest';
import {
  STRATEGY_SURFACE_TYPES,
  STRATEGY_SURFACE_LABELS,
  RUNTIME_BINDING_EVENTS,
  STRATEGY_CENTRE_VIEWS,
  STRATEGY_CENTRE_VIEW_LABELS,
} from '../../packages/contracts/src/entities/strategy';
import { seedStrategies } from '../../packages/contracts/src/fixtures/seed-strategies';
import { SEED_TENANT } from '../../packages/contracts/src/fixtures/seed-tenant';
import { allRoutes } from '../../apps/web/src/registry/index';

/**
 * Strategy Layer Runtime Surface Tests — Commander SDR
 *
 * Validates all 24 EARS requirements from Spec #32:
 * - 12 named strategy surfaces (Reqs 1-12)
 * - 5 Strategy Centre UI views (Reqs 13-17)
 * - 6 runtime binding events (Reqs 18-23)
 * - Build-blocking gate (Req 24)
 */

describe('Twelve Named Strategy Surfaces (Reqs 1-12)', () => {
  it('defines exactly 12 strategy surface types', () => {
    expect(STRATEGY_SURFACE_TYPES.length).toBe(12);
  });

  it('includes SLA Strategy (Req 1)', () => {
    expect(STRATEGY_SURFACE_TYPES).toContain('sla');
  });

  it('includes Threshold Strategy (Req 2)', () => {
    expect(STRATEGY_SURFACE_TYPES).toContain('threshold');
  });

  it('includes Automation Boundary Strategy (Req 3)', () => {
    expect(STRATEGY_SURFACE_TYPES).toContain('automation-boundary');
  });

  it('includes Routing Strategy (Req 4)', () => {
    expect(STRATEGY_SURFACE_TYPES).toContain('routing');
  });

  it('includes Posture Strategy (Req 5)', () => {
    expect(STRATEGY_SURFACE_TYPES).toContain('posture');
  });

  it('includes Mission Objective Strategy (Req 6)', () => {
    expect(STRATEGY_SURFACE_TYPES).toContain('mission-objective');
  });

  it('includes Operational Tempo Strategy (Req 7)', () => {
    expect(STRATEGY_SURFACE_TYPES).toContain('operational-tempo');
  });

  it('includes Domain-Specific Strategy (Req 8)', () => {
    expect(STRATEGY_SURFACE_TYPES).toContain('domain-specific');
  });

  it('includes Prioritisation Weight Strategy (Req 9)', () => {
    expect(STRATEGY_SURFACE_TYPES).toContain('prioritisation-weight');
  });

  it('includes Validation Window Strategy (Req 10)', () => {
    expect(STRATEGY_SURFACE_TYPES).toContain('validation-window');
  });

  it('includes Closure Gate Strategy (Req 11)', () => {
    expect(STRATEGY_SURFACE_TYPES).toContain('closure-gate');
  });

  it('includes Reopening Trigger Strategy (Req 12)', () => {
    expect(STRATEGY_SURFACE_TYPES).toContain('reopening-trigger');
  });

  it('all surfaces have labels', () => {
    for (const surface of STRATEGY_SURFACE_TYPES) {
      expect(STRATEGY_SURFACE_LABELS[surface]).toBeTruthy();
    }
  });
});

describe('Strategy Centre UI Views (Reqs 13-17)', () => {
  it('defines exactly 5 Strategy Centre views', () => {
    expect(STRATEGY_CENTRE_VIEWS.length).toBe(5);
  });

  it('includes Configuration (Req 13)', () => {
    expect(STRATEGY_CENTRE_VIEWS).toContain('configuration');
  });

  it('includes Simulation (Req 14)', () => {
    expect(STRATEGY_CENTRE_VIEWS).toContain('simulation');
  });

  it('includes Approval Workflow (Req 15)', () => {
    expect(STRATEGY_CENTRE_VIEWS).toContain('approval-workflow');
  });

  it('includes Audit History (Req 16)', () => {
    expect(STRATEGY_CENTRE_VIEWS).toContain('audit-history');
  });

  it('includes Effective-Policy Preview (Req 17)', () => {
    expect(STRATEGY_CENTRE_VIEWS).toContain('effective-policy-preview');
  });

  it('all views have labels', () => {
    for (const view of STRATEGY_CENTRE_VIEWS) {
      expect(STRATEGY_CENTRE_VIEW_LABELS[view]).toBeTruthy();
    }
  });
});

describe('Runtime Binding Events (Reqs 18-23)', () => {
  it('defines exactly 6 runtime binding events', () => {
    expect(RUNTIME_BINDING_EVENTS.length).toBe(6);
  });

  it('includes priority-recalculation (Req 18)', () => {
    expect(RUNTIME_BINDING_EVENTS).toContain('priority-recalculation');
  });

  it('includes route-recalculation (Req 19)', () => {
    expect(RUNTIME_BINDING_EVENTS).toContain('route-recalculation');
  });

  it('includes validation-recalculation (Req 20)', () => {
    expect(RUNTIME_BINDING_EVENTS).toContain('validation-recalculation');
  });

  it('includes closure-gate-recalculation (Req 21)', () => {
    expect(RUNTIME_BINDING_EVENTS).toContain('closure-gate-recalculation');
  });

  it('includes reopening-evaluation (Req 22)', () => {
    expect(RUNTIME_BINDING_EVENTS).toContain('reopening-evaluation');
  });

  it('includes fusion-map-refresh (Req 23)', () => {
    expect(RUNTIME_BINDING_EVENTS).toContain('fusion-map-refresh');
  });
});

describe('Seed Strategy Fixtures', () => {
  it('has exactly 12 seed strategy policies (one per surface)', () => {
    expect(seedStrategies.length).toBe(12);
  });

  it('covers all 12 surface types', () => {
    const coveredSurfaces = seedStrategies.map((s) => s.surfaceType);
    for (const surface of STRATEGY_SURFACE_TYPES) {
      expect(coveredSurfaces, `Missing fixture for: ${surface}`).toContain(surface);
    }
  });

  it('all fixtures are tenant-scoped', () => {
    for (const s of seedStrategies) {
      expect(s.tenant.tenantId).toBe(SEED_TENANT.tenantId);
    }
  });

  it('all fixtures have active status (baseline defaults)', () => {
    for (const s of seedStrategies) {
      expect(s.status).toBe('active');
    }
  });

  it('all fixtures have approval records', () => {
    for (const s of seedStrategies) {
      expect(s.approval).not.toBeNull();
    }
  });

  it('automation-boundary forbids manual-case-creation (Doctrinal Assertion 1)', () => {
    const ab = seedStrategies.find((s) => s.surfaceType === 'automation-boundary');
    expect(ab).toBeDefined();
    const config = ab!.configuration as { forbidden: string[] };
    expect(config.forbidden).toContain('manual-case-creation');
  });
});

describe('Route Registry — Strategy Centre', () => {
  it('/strategy is registered in the route registry', () => {
    const route = allRoutes.find((r) => r.path === '/strategy');
    expect(route).toBeDefined();
    expect(route!.label).toBe('Strategy Centre');
  });

  it('/strategy is in the operational boundary', () => {
    const route = allRoutes.find((r) => r.path === '/strategy');
    expect(route!.boundary).toBe('operational');
  });

  it('/strategy has BUILD status', () => {
    const route = allRoutes.find((r) => r.path === '/strategy');
    expect(route!.status).toBe('BUILD');
  });

  it('/strategy is owned by spec 43', () => {
    const route = allRoutes.find((r) => r.path === '/strategy');
    expect(route!.owningSpec).toBe('43-strategy-layer-runtime-surface');
  });
});

describe('Build-Blocking Gate (Req 24)', () => {
  it('strategy surfaces are defined before case management can ship', () => {
    // This test validates that the strategy layer exists as a prerequisite
    expect(STRATEGY_SURFACE_TYPES.length).toBe(12);
    expect(RUNTIME_BINDING_EVENTS.length).toBe(6);
    expect(seedStrategies.length).toBe(12);
  });
});
