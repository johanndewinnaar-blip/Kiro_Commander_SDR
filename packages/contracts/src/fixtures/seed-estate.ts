/**
 * Seed Estate Fixtures — Commander SDR Test Fixtures
 *
 * Source: docs/00_authority/ASSET_ARCHITECTURE_INTELLIGENCE.md (AAI-1.0) §4, §6
 * Domain: D-48 Asset Architecture Intelligence
 * Build unit: Unit 52
 *
 * - 6 estate nodes (enterprise → business units → environments)
 * - 10 asset relationships (dependencies, hosting, coverage, supply chain)
 * - 6 asset coverage bindings
 * - 4 compliance scope bindings
 */

import type { EstateNode } from '../entities/estate-node';
import type { AssetRelationship } from '../entities/asset-relationship';
import type { AssetCoverageBinding } from '../entities/asset-coverage-binding';
import type { ComplianceScopeBinding } from '../entities/compliance-scope-binding';
import { SEED_TENANT, SEED_SOURCE, seedId } from './seed-tenant';

const BASE_SOURCE = { ...SEED_SOURCE, sourceSystem: 'commander-estate-engine' };

// ─── Estate Nodes (6) ────────────────────────────────────────────────────────

export const seedEstateNodes: EstateNode[] = [
  {
    id: seedId('estate', 1),
    entityType: 'estate-node',
    tenant: SEED_TENANT,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z',
    source: BASE_SOURCE,
    nodeId: 'acme-enterprise',
    name: 'Acme Corporation',
    nodeType: 'enterprise',
    parentNodeId: null,
    status: 'active',
    geography: 'Global',
    complianceScopes: ['SOC2', 'ISO27001'],
    ownerTeam: 'CISO Office',
    tags: ['root'],
  },
  {
    id: seedId('estate', 2),
    entityType: 'estate-node',
    tenant: SEED_TENANT,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z',
    source: BASE_SOURCE,
    nodeId: 'acme-pharma-uk',
    name: 'UK Pharma Division',
    nodeType: 'business_unit',
    parentNodeId: 'acme-enterprise',
    status: 'active',
    geography: 'UK',
    complianceScopes: ['PCI-DSS', 'GDPR'],
    ownerTeam: 'UK Pharma IT',
    tags: ['pharma', 'uk'],
  },
  {
    id: seedId('estate', 3),
    entityType: 'estate-node',
    tenant: SEED_TENANT,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z',
    source: BASE_SOURCE,
    nodeId: 'acme-fintech-us',
    name: 'US Fintech Division',
    nodeType: 'business_unit',
    parentNodeId: 'acme-enterprise',
    status: 'active',
    geography: 'US',
    complianceScopes: ['PCI-DSS', 'SOX'],
    ownerTeam: 'US Fintech Security',
    tags: ['fintech', 'us'],
  },
  {
    id: seedId('estate', 4),
    entityType: 'estate-node',
    tenant: SEED_TENANT,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z',
    source: BASE_SOURCE,
    nodeId: 'acme-pharma-uk-prod',
    name: 'UK Pharma Production',
    nodeType: 'environment',
    parentNodeId: 'acme-pharma-uk',
    status: 'active',
    geography: 'UK',
    complianceScopes: [],
    ownerTeam: 'Platform Engineering',
    tags: ['production', 'pharma', 'uk'],
  },
  {
    id: seedId('estate', 5),
    entityType: 'estate-node',
    tenant: SEED_TENANT,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z',
    source: BASE_SOURCE,
    nodeId: 'acme-shared-services',
    name: 'Shared Services',
    nodeType: 'shared_service',
    parentNodeId: 'acme-enterprise',
    status: 'active',
    geography: null,
    complianceScopes: ['SOC2'],
    ownerTeam: 'Shared Infrastructure',
    tags: ['shared', 'identity', 'network'],
  },
  {
    id: seedId('estate', 6),
    entityType: 'estate-node',
    tenant: SEED_TENANT,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z',
    source: BASE_SOURCE,
    nodeId: 'acme-acquisition-2025',
    name: 'HealthTech Acquisition (2025)',
    nodeType: 'acquisition',
    parentNodeId: 'acme-enterprise',
    status: 'integrating',
    geography: 'EU',
    complianceScopes: ['GDPR'],
    ownerTeam: 'M&A Integration',
    tags: ['acquisition', 'integration'],
  },
];

// ─── Asset Relationships (10) ────────────────────────────────────────────────

export const seedAssetRelationships: AssetRelationship[] = [
  {
    id: seedId('arel', 1),
    entityType: 'asset-relationship',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
    source: BASE_SOURCE,
    sourceAssetId: seedId('asset', 4), // PROD-API-02
    targetAssetId: seedId('asset', 3), // rds-prod-primary
    relationshipType: 'depends_on',
    metadata: { port: 5432, protocol: 'postgresql' },
    confirmedAt: '2026-01-15T00:00:00.000Z',
    confirmedBy: 'connector',
    status: 'active',
  },
  {
    id: seedId('arel', 2),
    entityType: 'asset-relationship',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
    source: BASE_SOURCE,
    sourceAssetId: seedId('asset', 1), // PROD-WEB-01
    targetAssetId: seedId('asset', 4), // PROD-API-02
    relationshipType: 'depends_on',
    metadata: { port: 443, protocol: 'https' },
    confirmedAt: '2026-01-15T00:00:00.000Z',
    confirmedBy: 'connector',
    status: 'active',
  },
  {
    id: seedId('arel', 3),
    entityType: 'asset-relationship',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
    source: BASE_SOURCE,
    sourceAssetId: seedId('asset', 1), // PROD-WEB-01
    targetAssetId: seedId('asset', 5), // (identity reference)
    relationshipType: 'authenticates_via',
    metadata: { provider: 'Entra ID', protocol: 'SAML' },
    confirmedAt: '2026-01-15T00:00:00.000Z',
    confirmedBy: 'connector',
    status: 'active',
  },
  {
    id: seedId('arel', 4),
    entityType: 'asset-relationship',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
    source: BASE_SOURCE,
    sourceAssetId: seedId('asset', 8), // FW-EDGE-01
    targetAssetId: seedId('asset', 1), // PROD-WEB-01
    relationshipType: 'secures',
    metadata: { ruleCount: 47 },
    confirmedAt: '2026-01-15T00:00:00.000Z',
    confirmedBy: 'connector',
    status: 'active',
  },
  {
    id: seedId('arel', 5),
    entityType: 'asset-relationship',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
    source: BASE_SOURCE,
    sourceAssetId: seedId('asset', 3), // rds-prod-primary
    targetAssetId: seedId('asset', 1), // PROD-WEB-01
    relationshipType: 'stores_data_for',
    metadata: { dataType: 'customer-transactions' },
    confirmedAt: '2026-01-15T00:00:00.000Z',
    confirmedBy: 'manual',
    status: 'active',
  },
  {
    id: seedId('arel', 6),
    entityType: 'asset-relationship',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
    source: BASE_SOURCE,
    sourceAssetId: seedId('asset', 13), // PROD-BATCH-01
    targetAssetId: seedId('asset', 3), // rds-prod-primary
    relationshipType: 'depends_on',
    metadata: { port: 5432 },
    confirmedAt: '2026-01-15T00:00:00.000Z',
    confirmedBy: 'inference',
    status: 'active',
  },
  {
    id: seedId('arel', 7),
    entityType: 'asset-relationship',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
    source: BASE_SOURCE,
    sourceAssetId: seedId('asset', 26), // k8s-ingress-controller
    targetAssetId: seedId('asset', 4), // PROD-API-02
    relationshipType: 'routes_through',
    metadata: { protocol: 'https', port: 443 },
    confirmedAt: '2026-01-15T00:00:00.000Z',
    confirmedBy: 'connector',
    status: 'active',
  },
  {
    id: seedId('arel', 8),
    entityType: 'asset-relationship',
    tenant: SEED_TENANT,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z',
    source: BASE_SOURCE,
    sourceAssetId: seedId('asset', 14), // PROD-AUTH-01
    targetAssetId: seedId('asset', 1), // PROD-WEB-01
    relationshipType: 'hosts',
    metadata: {},
    confirmedAt: '2026-01-10T00:00:00.000Z',
    confirmedBy: 'connector',
    status: 'active',
  },
  {
    id: seedId('arel', 9),
    entityType: 'asset-relationship',
    tenant: SEED_TENANT,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
    source: BASE_SOURCE,
    sourceAssetId: seedId('asset', 36), // VPN-CONCENTRATOR-01
    targetAssetId: seedId('asset', 8), // FW-EDGE-01
    relationshipType: 'routes_through',
    metadata: { vpnType: 'site-to-site' },
    confirmedAt: '2026-01-15T00:00:00.000Z',
    confirmedBy: 'connector',
    status: 'stale',
  },
  {
    id: seedId('arel', 10),
    entityType: 'asset-relationship',
    tenant: SEED_TENANT,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z',
    source: BASE_SOURCE,
    sourceAssetId: seedId('asset', 1), // PROD-WEB-01
    targetAssetId: seedId('asset', 3), // rds-prod-primary
    relationshipType: 'contains',
    metadata: { level: 'vpc-subnet' },
    confirmedAt: '2026-01-10T00:00:00.000Z',
    confirmedBy: 'connector',
    status: 'active',
  },
];

// ─── Asset Coverage Bindings (6) ─────────────────────────────────────────────

export const seedAssetCoverageBindings: AssetCoverageBinding[] = [
  {
    id: seedId('acov', 1),
    entityType: 'asset-coverage-binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
    source: BASE_SOURCE,
    assetId: seedId('asset', 1),
    connectorId: seedId('connector', 1),
    coverageType: 'edr',
    confirmedAt: '2026-01-15T09:00:00.000Z',
    status: 'covered',
  },
  {
    id: seedId('acov', 2),
    entityType: 'asset-coverage-binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
    source: BASE_SOURCE,
    assetId: seedId('asset', 1),
    connectorId: seedId('connector', 7),
    coverageType: 'vuln-scan',
    confirmedAt: '2026-01-15T09:00:00.000Z',
    status: 'covered',
  },
  {
    id: seedId('acov', 3),
    entityType: 'asset-coverage-binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
    source: BASE_SOURCE,
    assetId: seedId('asset', 3),
    connectorId: seedId('connector', 7),
    coverageType: 'vuln-scan',
    confirmedAt: '2026-01-15T09:00:00.000Z',
    status: 'covered',
  },
  {
    id: seedId('acov', 4),
    entityType: 'asset-coverage-binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
    source: BASE_SOURCE,
    assetId: seedId('asset', 13),
    connectorId: seedId('connector', 1),
    coverageType: 'edr',
    confirmedAt: '2026-01-12T09:00:00.000Z',
    status: 'stale',
  },
  {
    id: seedId('acov', 5),
    entityType: 'asset-coverage-binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
    source: BASE_SOURCE,
    assetId: seedId('asset', 26),
    connectorId: seedId('connector', 1),
    coverageType: 'edr',
    confirmedAt: '2026-01-15T09:00:00.000Z',
    status: 'gap',
  },
  {
    id: seedId('acov', 6),
    entityType: 'asset-coverage-binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
    source: BASE_SOURCE,
    assetId: seedId('asset', 2),
    connectorId: seedId('connector', 2),
    coverageType: 'endpoint-management',
    confirmedAt: '2026-01-15T09:00:00.000Z',
    status: 'covered',
  },
];

// ─── Compliance Scope Bindings (4) ───────────────────────────────────────────

export const seedComplianceScopeBindings: ComplianceScopeBinding[] = [
  {
    id: seedId('cscope', 1),
    entityType: 'compliance-scope-binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z',
    source: BASE_SOURCE,
    assetId: seedId('asset', 1),
    frameworkId: seedId('framework', 1),
    scopeStatus: 'in_scope',
    justification: 'Processes cardholder data — PCI-DSS applies',
    reviewedAt: '2026-01-10T00:00:00.000Z',
    inheritedFrom: 'acme-pharma-uk',
  },
  {
    id: seedId('cscope', 2),
    entityType: 'compliance-scope-binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z',
    source: BASE_SOURCE,
    assetId: seedId('asset', 3),
    frameworkId: seedId('framework', 1),
    scopeStatus: 'in_scope',
    justification: 'Stores cardholder transaction data — PCI-DSS applies',
    reviewedAt: '2026-01-10T00:00:00.000Z',
    inheritedFrom: 'acme-pharma-uk',
  },
  {
    id: seedId('cscope', 3),
    entityType: 'compliance-scope-binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z',
    source: BASE_SOURCE,
    assetId: seedId('asset', 2),
    frameworkId: seedId('framework', 1),
    scopeStatus: 'out_of_scope',
    justification: 'Endpoint does not process or store cardholder data',
    reviewedAt: '2026-01-10T00:00:00.000Z',
    inheritedFrom: null,
  },
  {
    id: seedId('cscope', 4),
    entityType: 'compliance-scope-binding',
    tenant: SEED_TENANT,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z',
    source: BASE_SOURCE,
    assetId: seedId('asset', 8),
    frameworkId: seedId('framework', 1),
    scopeStatus: 'conditional',
    justification: 'In scope if routing PCI traffic — under review',
    reviewedAt: '2026-01-10T00:00:00.000Z',
    inheritedFrom: null,
  },
];
