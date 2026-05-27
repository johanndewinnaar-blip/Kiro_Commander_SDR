/**
 * Seed Risk Objects — Commander SDR Test Fixtures
 *
 * Synthetic risk object data conforming to canonical entity shape.
 * Source: Spec #29 Universal Risk Object and Case Binding
 * v1.3.1 lineage closure: coverage_blindspot (Spec #72), ooda_phase_degradation (Spec #58)
 *
 * Three seed risk objects:
 * 1. coverage_blindspot — linked to asset-0003, detected by inverse discovery
 * 2. ooda_phase_degradation — linked to case-0003 P0 case
 * 3. vulnerability_drift — linked to case-0001
 *
 * All tenant-scoped, deterministic IDs, source provenance.
 */

import type { RiskObject } from '../entities/risk-object';
import { SEED_TENANT, SEED_SOURCE, seedId } from './seed-tenant';

export const seedRiskObjects: RiskObject[] = [
  {
    id: seedId('risk-object', 1),
    entityType: 'risk-object',
    tenant: SEED_TENANT,
    createdAt: '2026-01-16T09:00:00.000Z',
    updatedAt: '2026-01-16T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-risk-001', sourceSystem: 'commander-inverse-discovery-loop' },
    type: 'coverage_blindspot',
    affectedEntityId: seedId('asset', 3),
    affectedEntityType: 'asset',
    justification: 'Inverse Discovery Loop detected asset-0003 has no scanner coverage for external attack surface. No vulnerability assessment has been performed in 90+ days.',
    owner: 'Security Operations',
    treatmentState: 'open',
    expiryOrReviewTrigger: 'Review when scanner coverage is confirmed active for asset-0003 or after 14 days.',
  },
  {
    id: seedId('risk-object', 2),
    entityType: 'risk-object',
    tenant: SEED_TENANT,
    createdAt: '2026-01-18T06:15:00.000Z',
    updatedAt: '2026-01-18T06:15:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-risk-002', sourceSystem: 'commander-ooda-health-monitor' },
    type: 'ooda_phase_degradation',
    affectedEntityId: seedId('case', 3),
    affectedEntityType: 'case',
    justification: 'OODA Observe phase health degraded below threshold (< 60%) due to P0 zero-day condition. Decision latency exceeds 4-hour SLA target.',
    owner: 'CISO',
    treatmentState: 'open',
    expiryOrReviewTrigger: 'Review when OODA phase health returns above 80% threshold or P0 condition is resolved.',
  },
  {
    id: seedId('risk-object', 3),
    entityType: 'risk-object',
    tenant: SEED_TENANT,
    createdAt: '2026-01-16T08:45:00.000Z',
    updatedAt: '2026-01-16T14:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-risk-003', sourceSystem: 'commander-drift-engine' },
    type: 'vulnerability_drift',
    affectedEntityId: seedId('case', 1),
    affectedEntityType: 'case',
    justification: 'Critical CVE-2026-1234 remains unpatched on PROD-WEB-01 beyond SLA window. Vulnerability drift detected between expected and actual patch state.',
    owner: 'Alice Security-Analyst',
    treatmentState: 'open',
    expiryOrReviewTrigger: 'Review when patch is confirmed applied or compensating control is validated.',
  },
];
