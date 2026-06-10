/**
 * Seed Compliance Scope Bindings — Commander SDR Test Fixtures
 *
 * Synthetic compliance scope binding data conforming to ComplianceScopeBinding entity shape.
 * Source: AAI-1.0 §6 ComplianceScopeBinding
 * Requirements: 10.4, 10.6
 *
 * 4 bindings covering PCI-DSS, SOC2, ISO-27001, Cyber Essentials.
 */

import type { ComplianceScopeBinding } from '../entities/compliance-scope-binding';
import { SEED_TENANT, SEED_SOURCE, seedId } from './seed-tenant';

export const seedComplianceScopeBindings: ComplianceScopeBinding[] = [
  // PCI-DSS scoped to PROD-WEB-01 (active, inherited from Identity Infrastructure node)
  {
    id: seedId('comp-scope', 1),
    entityType: 'compliance_scope_binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-06T11:00:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-comp-001', sourceSystem: 'commander-seed-generator' },
    entityId: seedId('asset', 1),
    entityType_target: 'asset',
    scopeName: 'PCI-DSS Cardholder Data Environment',
    frameworkRef: 'PCI-DSS',
    inheritedFrom: seedId('estate-node', 3),
    boundAt: '2026-01-06T11:00:00.000Z',
    status: 'active',
  },
  // SOC2 scoped to rds-prod-primary (active, direct assignment)
  {
    id: seedId('comp-scope', 2),
    entityType: 'compliance_scope_binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-06T11:05:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-comp-002', sourceSystem: 'commander-seed-generator' },
    entityId: seedId('asset', 3),
    entityType_target: 'asset',
    scopeName: 'SOC2 Trust Services Criteria',
    frameworkRef: 'SOC2',
    inheritedFrom: null,
    boundAt: '2026-01-06T11:05:00.000Z',
    status: 'active',
  },
  // ISO-27001 scoped to Cloud Control Plane estate node (active, direct assignment)
  {
    id: seedId('comp-scope', 3),
    entityType: 'compliance_scope_binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-06T11:10:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-comp-003', sourceSystem: 'commander-seed-generator' },
    entityId: seedId('estate-node', 2),
    entityType_target: 'estate_node',
    scopeName: 'ISO 27001 Information Security Management',
    frameworkRef: 'ISO-27001',
    inheritedFrom: null,
    boundAt: '2026-01-06T11:10:00.000Z',
    status: 'active',
  },
  // Cyber-Essentials scoped to LAPTOP-JD-001 (active, inherited from Corporate Endpoints node)
  {
    id: seedId('comp-scope', 4),
    entityType: 'compliance_scope_binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-06T11:15:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    source: { ...SEED_SOURCE, importRunId: 'run-comp-004', sourceSystem: 'commander-seed-generator' },
    entityId: seedId('asset', 2),
    entityType_target: 'asset',
    scopeName: 'Cyber Essentials Certification Scope',
    frameworkRef: 'Cyber-Essentials',
    inheritedFrom: seedId('estate-node', 5),
    boundAt: '2026-01-06T11:15:00.000Z',
    status: 'active',
  },
];
