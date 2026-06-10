/**
 * Seed Estate Nodes — Commander SDR Test Fixtures
 *
 * Synthetic estate node data conforming to EstateNode entity shape.
 * Source: AAI-1.0 §4 Estate Topology
 * Requirements: 10.1, 10.6
 *
 * 5 root estate nodes representing key architectural zones.
 */

import type { EstateNode } from '../entities/estate-node';
import { SEED_TENANT, SEED_SOURCE, seedId } from './seed-tenant';

export const seedEstateNodes: EstateNode[] = [
  {
    id: seedId('estate-node', 1),
    entityType: 'estate_node',
    tenant: SEED_TENANT,
    createdAt: '2026-01-02T08:00:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-estate-001', sourceSystem: 'commander-seed-generator' },
    nodeId: seedId('estate-node', 1),
    name: 'Perimeter Security',
    parentNodeRef: null,
    tier: 'perimeter',
    complianceScopes: ['Cyber-Essentials'],
    owner: 'Network Operations',
    status: 'active',
  },
  {
    id: seedId('estate-node', 2),
    entityType: 'estate_node',
    tenant: SEED_TENANT,
    createdAt: '2026-01-02T08:05:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-estate-002', sourceSystem: 'commander-seed-generator' },
    nodeId: seedId('estate-node', 2),
    name: 'Cloud Control Plane',
    parentNodeRef: null,
    tier: 'cloud_control',
    complianceScopes: ['SOC2', 'ISO-27001'],
    owner: 'Platform Engineering',
    status: 'active',
  },
  {
    id: seedId('estate-node', 3),
    entityType: 'estate_node',
    tenant: SEED_TENANT,
    createdAt: '2026-01-02T08:10:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-estate-003', sourceSystem: 'commander-seed-generator' },
    nodeId: seedId('estate-node', 3),
    name: 'Identity Infrastructure',
    parentNodeRef: null,
    tier: 'identity',
    complianceScopes: ['PCI-DSS', 'SOC2'],
    owner: 'Identity & Access',
    status: 'active',
  },
  {
    id: seedId('estate-node', 4),
    entityType: 'estate_node',
    tenant: SEED_TENANT,
    createdAt: '2026-01-02T08:15:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-estate-004', sourceSystem: 'commander-seed-generator' },
    nodeId: seedId('estate-node', 4),
    name: 'Build & Deploy',
    parentNodeRef: null,
    tier: 'build_deploy',
    complianceScopes: ['SOC2'],
    owner: 'Platform Engineering',
    status: 'active',
  },
  {
    id: seedId('estate-node', 5),
    entityType: 'estate_node',
    tenant: SEED_TENANT,
    createdAt: '2026-01-02T08:20:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-estate-005', sourceSystem: 'commander-seed-generator' },
    nodeId: seedId('estate-node', 5),
    name: 'Corporate Endpoints',
    parentNodeRef: null,
    tier: 'compute',
    complianceScopes: ['Cyber-Essentials'],
    owner: 'IT Operations',
    status: 'active',
  },
];
