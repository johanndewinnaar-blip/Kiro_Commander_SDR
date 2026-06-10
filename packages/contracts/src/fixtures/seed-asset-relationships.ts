/**
 * Seed Asset Relationships — Commander SDR Test Fixtures
 *
 * Synthetic asset relationship data conforming to AssetRelationship entity shape.
 * Source: AAI-1.0 §6 Relationships
 * Requirements: 10.2, 10.6
 *
 * 8 relationships across owned_by, contains, deployed_by, depends_on types.
 */

import type { AssetRelationship } from '../entities/asset-relationship';
import { SEED_TENANT, SEED_SOURCE, seedId } from './seed-tenant';

export const seedAssetRelationships: AssetRelationship[] = [
  // owned_by: PROD-WEB-01 owned by Platform Engineering (estate node Cloud Control Plane)
  {
    id: seedId('asset-rel', 1),
    entityType: 'asset_relationship',
    tenant: SEED_TENANT,
    createdAt: '2026-01-03T10:00:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-rel-001', sourceSystem: 'commander-seed-generator' },
    sourceEntityId: seedId('asset', 1),
    sourceEntityType: 'asset',
    targetEntityId: seedId('estate-node', 2),
    targetEntityType: 'estate_node',
    relationshipType: 'owned_by',
    confidence: 95,
    discoveredBy: 'connector',
    status: 'active',
  },
  // owned_by: FW-EDGE-01 owned by Perimeter Security node
  {
    id: seedId('asset-rel', 2),
    entityType: 'asset_relationship',
    tenant: SEED_TENANT,
    createdAt: '2026-01-03T10:05:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-rel-002', sourceSystem: 'commander-seed-generator' },
    sourceEntityId: seedId('asset', 8),
    sourceEntityType: 'asset',
    targetEntityId: seedId('estate-node', 1),
    targetEntityType: 'estate_node',
    relationshipType: 'owned_by',
    confidence: 100,
    discoveredBy: 'connector',
    status: 'active',
  },
  // contains: Cloud Control Plane contains ec2-prod-api-03
  {
    id: seedId('asset-rel', 3),
    entityType: 'asset_relationship',
    tenant: SEED_TENANT,
    createdAt: '2026-01-03T10:10:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-rel-003', sourceSystem: 'commander-seed-generator' },
    sourceEntityId: seedId('estate-node', 2),
    sourceEntityType: 'estate_node',
    targetEntityId: seedId('asset', 17),
    targetEntityType: 'asset',
    relationshipType: 'contains',
    confidence: 90,
    discoveredBy: 'connector',
    status: 'active',
  },
  // contains: Identity Infrastructure contains PROD-AUTH-01
  {
    id: seedId('asset-rel', 4),
    entityType: 'asset_relationship',
    tenant: SEED_TENANT,
    createdAt: '2026-01-03T10:15:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-rel-004', sourceSystem: 'commander-seed-generator' },
    sourceEntityId: seedId('estate-node', 3),
    sourceEntityType: 'estate_node',
    targetEntityId: seedId('asset', 14),
    targetEntityType: 'asset',
    relationshipType: 'contains',
    confidence: 95,
    discoveredBy: 'connector',
    status: 'active',
  },
  // deployed_by: app-payment-gateway deployed by PROD-CICD-01
  {
    id: seedId('asset-rel', 5),
    entityType: 'asset_relationship',
    tenant: SEED_TENANT,
    createdAt: '2026-01-04T09:00:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-rel-005', sourceSystem: 'commander-seed-generator' },
    sourceEntityId: seedId('asset', 33),
    sourceEntityType: 'asset',
    targetEntityId: seedId('asset', 32),
    targetEntityType: 'asset',
    relationshipType: 'deployed_by',
    confidence: 85,
    discoveredBy: 'connector',
    status: 'active',
  },
  // deployed_by: k8s-worker-01 deployed by Build & Deploy node
  {
    id: seedId('asset-rel', 6),
    entityType: 'asset_relationship',
    tenant: SEED_TENANT,
    createdAt: '2026-01-04T09:05:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-rel-006', sourceSystem: 'commander-seed-generator' },
    sourceEntityId: seedId('asset', 5),
    sourceEntityType: 'asset',
    targetEntityId: seedId('estate-node', 4),
    targetEntityType: 'estate_node',
    relationshipType: 'deployed_by',
    confidence: 80,
    discoveredBy: 'inference',
    status: 'active',
  },
  // depends_on: PROD-WEB-01 depends on rds-prod-primary
  {
    id: seedId('asset-rel', 7),
    entityType: 'asset_relationship',
    tenant: SEED_TENANT,
    createdAt: '2026-01-05T08:00:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-rel-007', sourceSystem: 'commander-seed-generator' },
    sourceEntityId: seedId('asset', 1),
    sourceEntityType: 'asset',
    targetEntityId: seedId('asset', 3),
    targetEntityType: 'asset',
    relationshipType: 'depends_on',
    confidence: 70,
    discoveredBy: 'inference',
    status: 'active',
  },
  // depends_on: app-payment-gateway depends on PROD-AUTH-01
  {
    id: seedId('asset-rel', 8),
    entityType: 'asset_relationship',
    tenant: SEED_TENANT,
    createdAt: '2026-01-05T08:05:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-rel-008', sourceSystem: 'commander-seed-generator' },
    sourceEntityId: seedId('asset', 33),
    sourceEntityType: 'asset',
    targetEntityId: seedId('asset', 14),
    targetEntityType: 'asset',
    relationshipType: 'depends_on',
    confidence: 65,
    discoveredBy: 'inference',
    status: 'active',
  },
];
