/**
 * Seed Identities — Commander SDR Test Fixtures
 *
 * Synthetic identity data conforming to canonical entity shape.
 * Source: Spec #05 §6.4.3 Identity, Spec #18 Unified Identity Architecture
 * v1.3 Requirement 4: Identity fixture completeness
 */

import type { Identity } from '../entities/identity';
import { SEED_TENANT, SEED_SOURCE, seedId } from './seed-tenant';

export const seedIdentities: Identity[] = [
  {
    id: seedId('identity', 1),
    entityType: 'identity',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T09:00:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, sourceSystem: 'entra-id-mock' },
    displayName: 'Alice Security-Analyst',
    classification: 'human',
    sourceSystemLineage: ['entra-id-mock', 'crowdstrike-mock'],
    email: 'alice.analyst@acme-demo.example',
    department: 'Security Operations',
    role: 'Security Analyst',
    riskScore: 12,
    surfaceAttribution: 'internal_attack_surface',
    associatedAssets: [seedId('asset', 2)],
    status: 'active',
  },
  {
    id: seedId('identity', 2),
    entityType: 'identity',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T09:00:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, sourceSystem: 'entra-id-mock' },
    displayName: 'svc-backup-agent',
    classification: 'service-account',
    sourceSystemLineage: ['entra-id-mock', 'aws-iam-mock'],
    email: 'svc-backup@acme-demo.example',
    department: 'Platform Engineering',
    role: 'Service Account',
    riskScore: 45,
    surfaceAttribution: 'internal_attack_surface',
    associatedAssets: [seedId('asset', 3)],
    status: 'active',
  },
  {
    id: seedId('identity', 3),
    entityType: 'identity',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T09:00:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, sourceSystem: 'okta-mock' },
    displayName: 'ext-contractor-bob',
    classification: 'third-party',
    sourceSystemLineage: ['okta-mock'],
    email: 'bob.contractor@partner-demo.example',
    department: 'External',
    role: 'Contractor',
    riskScore: 68,
    surfaceAttribution: 'external_attack_surface',
    associatedAssets: [],
    status: 'active',
  },
];
