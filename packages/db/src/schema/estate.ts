/**
 * Estate Schema — Asset Architecture Intelligence
 *
 * Source: docs/00_authority/ASSET_ARCHITECTURE_INTELLIGENCE.md (AAI-1.0) §4, §6, §11
 * Domain: D-48 Asset Architecture Intelligence
 * Build unit: Unit 52
 * Schema: estate
 * Workload: operational-read (EstateNode), analytics-read (relationships, coverage, scope)
 *
 * Migration: 0017_estate_schema.sql
 */

import { pgTable, pgSchema, text, timestamp, jsonb, index, pgEnum } from 'drizzle-orm/pg-core';
import { dataClassificationEnum } from './common';
import { tenants } from './tenants';

/** Estate database schema — dedicated workload boundary */
export const estateSchema = pgSchema('estate');

// ─── Enums ───────────────────────────────────────────────────────────────────

export const estateNodeTypeEnum = pgEnum('estate_node_type', [
  'enterprise', 'business_unit', 'environment', 'region', 'acquisition', 'shared_service',
]);

export const estateNodeStatusEnum = pgEnum('estate_node_status', [
  'active', 'integrating', 'decommissioning', 'isolated',
]);

export const relationshipTypeEnum = pgEnum('relationship_type', [
  'depends_on', 'hosts', 'routes_through', 'authenticates_via', 'stores_data_for',
  'deployed_by', 'covered_by', 'in_scope_for', 'owned_by', 'accessed_by_vendor', 'secures', 'contains',
]);

export const relationshipStatusEnum = pgEnum('relationship_status', [
  'active', 'stale', 'broken',
]);

export const confirmedByEnum = pgEnum('confirmed_by', [
  'connector', 'manual', 'inference',
]);

export const coverageStatusEnum = pgEnum('coverage_status', [
  'covered', 'gap', 'stale',
]);

export const scopeStatusEnum = pgEnum('scope_status', [
  'in_scope', 'out_of_scope', 'conditional',
]);

// ─── Estate Node Table ───────────────────────────────────────────────────────

export const estateNodes = estateSchema.table('estate_nodes', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull().references(() => tenants.id),
  dataClassification: dataClassificationEnum('data_classification').notNull().default('configuration'),
  nodeId: text('node_id').notNull(),
  name: text('name').notNull(),
  nodeType: estateNodeTypeEnum('node_type').notNull(),
  parentNodeId: text('parent_node_id'),
  status: estateNodeStatusEnum('status').notNull().default('active'),
  geography: text('geography'),
  complianceScopes: jsonb('compliance_scopes').$type<string[]>().notNull().default([]),
  ownerTeam: text('owner_team').notNull(),
  tags: jsonb('tags').$type<string[]>().notNull().default([]),
  sourceConnectorId: text('source_connector_id').notNull(),
  sourceImportRunId: text('source_import_run_id').notNull(),
  sourceSystem: text('source_system').notNull(),
  sourceTimestamp: timestamp('source_timestamp', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  tenantNodeIdx: index('idx_estate_nodes_tenant_node').on(table.tenantId, table.nodeId),
  tenantParentIdx: index('idx_estate_nodes_tenant_parent').on(table.tenantId, table.parentNodeId),
}));

// ─── Asset Relationship Table ────────────────────────────────────────────────

export const assetRelationships = estateSchema.table('asset_relationships', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull().references(() => tenants.id),
  dataClassification: dataClassificationEnum('data_classification').notNull().default('state'),
  sourceAssetId: text('source_asset_id').notNull(),
  targetAssetId: text('target_asset_id').notNull(),
  relationshipType: relationshipTypeEnum('relationship_type').notNull(),
  metadata: jsonb('metadata').$type<Record<string, unknown>>().notNull().default({}),
  confirmedAt: timestamp('confirmed_at', { withTimezone: true }).notNull(),
  confirmedBy: confirmedByEnum('confirmed_by').notNull(),
  status: relationshipStatusEnum('status').notNull().default('active'),
  sourceConnectorId: text('source_connector_id').notNull(),
  sourceImportRunId: text('source_import_run_id').notNull(),
  sourceSystem: text('source_system').notNull(),
  sourceTimestamp: timestamp('source_timestamp', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  tenantSourceIdx: index('idx_asset_rel_tenant_source').on(table.tenantId, table.sourceAssetId),
  tenantTargetIdx: index('idx_asset_rel_tenant_target').on(table.tenantId, table.targetAssetId),
  tenantTypeIdx: index('idx_asset_rel_tenant_type').on(table.tenantId, table.relationshipType),
}));

// ─── Asset Coverage Binding Table ────────────────────────────────────────────

export const assetCoverageBindings = estateSchema.table('asset_coverage_bindings', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull().references(() => tenants.id),
  dataClassification: dataClassificationEnum('data_classification').notNull().default('state'),
  assetId: text('asset_id').notNull(),
  connectorId: text('connector_id').notNull(),
  coverageType: text('coverage_type').notNull(),
  confirmedAt: timestamp('confirmed_at', { withTimezone: true }).notNull(),
  status: coverageStatusEnum('status').notNull().default('covered'),
  sourceConnectorId: text('source_connector_id').notNull(),
  sourceImportRunId: text('source_import_run_id').notNull(),
  sourceSystem: text('source_system').notNull(),
  sourceTimestamp: timestamp('source_timestamp', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  tenantAssetIdx: index('idx_coverage_tenant_asset').on(table.tenantId, table.assetId),
  tenantStatusIdx: index('idx_coverage_tenant_status').on(table.tenantId, table.status),
}));

// ─── Compliance Scope Binding Table ──────────────────────────────────────────

export const complianceScopeBindings = estateSchema.table('compliance_scope_bindings', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull().references(() => tenants.id),
  dataClassification: dataClassificationEnum('data_classification').notNull().default('configuration'),
  assetId: text('asset_id').notNull(),
  frameworkId: text('framework_id').notNull(),
  scopeStatus: scopeStatusEnum('scope_status').notNull(),
  justification: text('justification').notNull(),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }).notNull(),
  inheritedFrom: text('inherited_from'),
  sourceConnectorId: text('source_connector_id').notNull(),
  sourceImportRunId: text('source_import_run_id').notNull(),
  sourceSystem: text('source_system').notNull(),
  sourceTimestamp: timestamp('source_timestamp', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  tenantAssetIdx: index('idx_scope_tenant_asset').on(table.tenantId, table.assetId),
  tenantFrameworkIdx: index('idx_scope_tenant_framework').on(table.tenantId, table.frameworkId),
}));
