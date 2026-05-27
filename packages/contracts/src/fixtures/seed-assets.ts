/**
 * Seed Assets — Commander SDR Test Fixtures
 *
 * Synthetic asset data conforming to canonical entity shape.
 * Source: Spec #05 §6.4.2 Asset
 * v1.3 Requirement 3: Asset fixture completeness
 * v1.3 Requirement 20: Deterministic IDs
 */

import type { Asset } from '../entities/asset';
import { SEED_TENANT, SEED_SOURCE, seedId } from './seed-tenant';

export const seedAssets: Asset[] = [
  {
    id: seedId('asset', 1),
    entityType: 'asset',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T09:00:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, sourceSystem: 'crowdstrike-mock' },
    name: 'PROD-WEB-01',
    classification: 'server',
    owner: 'Platform Engineering',
    environment: 'production',
    sourceRefs: ['cs:host:abc123', 'azure:vm:prod-web-01'],
    surfaceAttribution: 'external_attack_surface',
    coverage: { hasEdr: true, hasVulnScan: true, hasPatchManagement: true, hasBackup: true },
    criticality: 5,
    tags: ['web-tier', 'public-facing', 'pci-scope'],
  },
  {
    id: seedId('asset', 2),
    entityType: 'asset',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T09:00:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, sourceSystem: 'intune-mock' },
    name: 'LAPTOP-JD-001',
    classification: 'endpoint',
    owner: 'Johann de Winnaar',
    environment: 'corporate',
    sourceRefs: ['intune:device:laptop-jd-001'],
    surfaceAttribution: 'internal_attack_surface',
    coverage: { hasEdr: true, hasVulnScan: true, hasPatchManagement: true, hasBackup: false },
    criticality: 3,
    tags: ['endpoint', 'corporate', 'executive'],
  },
  {
    id: seedId('asset', 3),
    entityType: 'asset',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T09:00:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, sourceSystem: 'aws-config-mock' },
    name: 'rds-prod-primary',
    classification: 'database',
    owner: 'Data Engineering',
    environment: 'production',
    sourceRefs: ['aws:rds:rds-prod-primary'],
    surfaceAttribution: 'internal_attack_surface',
    coverage: { hasEdr: false, hasVulnScan: true, hasPatchManagement: true, hasBackup: true },
    criticality: 5,
    tags: ['database', 'production', 'pci-scope', 'contains-pii'],
  },
];
