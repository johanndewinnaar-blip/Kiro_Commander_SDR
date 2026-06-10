/**
 * Seed Asset Coverage Bindings — Commander SDR Test Fixtures
 *
 * Synthetic coverage binding data conforming to AssetCoverageBinding entity shape.
 * Source: AAI-1.0 §6 AssetCoverageBinding
 * Requirements: 10.3, 10.6
 *
 * 5 bindings covering EDR, vuln-scan, CSPM, SAST, patch-management.
 */

import type { AssetCoverageBinding } from '../entities/asset-coverage-binding';
import { SEED_TENANT, SEED_SOURCE, seedId } from './seed-tenant';

export const seedAssetCoverageBindings: AssetCoverageBinding[] = [
  // EDR coverage on PROD-WEB-01 (covered)
  {
    id: seedId('cov-bind', 1),
    entityType: 'asset_coverage_binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-05T10:00:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-cov-001', sourceSystem: 'crowdstrike-mock' },
    assetId: seedId('asset', 1),
    coverageType: 'edr',
    connectorId: 'connector-crowdstrike-001',
    boundAt: '2026-01-05T10:00:00.000Z',
    status: 'covered',
    lastVerifiedAt: '2026-01-15T08:00:00.000Z',
  },
  // vuln_scan coverage on rds-prod-primary (covered)
  {
    id: seedId('cov-bind', 2),
    entityType: 'asset_coverage_binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-05T10:05:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-cov-002', sourceSystem: 'qualys-mock' },
    assetId: seedId('asset', 3),
    coverageType: 'vuln_scan',
    connectorId: 'connector-qualys-001',
    boundAt: '2026-01-05T10:05:00.000Z',
    status: 'covered',
    lastVerifiedAt: '2026-01-14T22:00:00.000Z',
  },
  // CSPM coverage on ec2-prod-api-03 (covered)
  {
    id: seedId('cov-bind', 3),
    entityType: 'asset_coverage_binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-05T10:10:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-cov-003', sourceSystem: 'aws-config-mock' },
    assetId: seedId('asset', 17),
    coverageType: 'cspm',
    connectorId: 'connector-aws-config-001',
    boundAt: '2026-01-05T10:10:00.000Z',
    status: 'covered',
    lastVerifiedAt: '2026-01-15T06:00:00.000Z',
  },
  // SAST coverage on app-payment-gateway (stale)
  {
    id: seedId('cov-bind', 4),
    entityType: 'asset_coverage_binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-06T09:00:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-cov-004', sourceSystem: 'snyk-mock' },
    assetId: seedId('asset', 33),
    coverageType: 'sast',
    connectorId: 'connector-snyk-001',
    boundAt: '2026-01-06T09:00:00.000Z',
    status: 'stale',
    lastVerifiedAt: '2026-01-08T12:00:00.000Z',
  },
  // patch_management coverage on FW-EDGE-01 (covered)
  {
    id: seedId('cov-bind', 5),
    entityType: 'asset_coverage_binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-06T09:05:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-cov-005', sourceSystem: 'palo-alto-mock' },
    assetId: seedId('asset', 8),
    coverageType: 'patch_management',
    connectorId: 'connector-patch-mgmt-001',
    boundAt: '2026-01-06T09:05:00.000Z',
    status: 'covered',
    lastVerifiedAt: '2026-01-14T18:00:00.000Z',
  },
];
