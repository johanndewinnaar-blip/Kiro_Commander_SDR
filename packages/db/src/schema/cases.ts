/**
 * Cases Table — Commander SDR
 *
 * Canonical case persistence with system-owned lifecycle.
 * CRITICAL: No manual case creation (Doctrinal Assertion 1).
 *
 * Source: Spec #08 Case Management, Spec #17 Closed-Loop Control
 * Data classification: Case
 */

import { pgTable, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';
import { surfaceAttributionEnum, caseStatusEnum, priorityEnum, dataClassificationEnum } from './common';
import { tenants } from './tenants';

export const cases = pgTable('cases', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull().references(() => tenants.id),
  dataClassification: dataClassificationEnum('data_classification').notNull().default('case'),
  caseRef: text('case_ref').notNull().unique(),
  caseType: text('case_type').notNull(),
  title: text('title').notNull(),
  /** System-owned lifecycle state */
  status: caseStatusEnum('status').notNull().default('detected'),
  priority: priorityEnum('priority').notNull(),
  /** Assigned via routing engine (not manual) */
  owner: text('owner').notNull(),
  team: text('team').notNull(),
  /** SLA metadata */
  slaTargetHours: integer('sla_target_hours').notNull(),
  slaBreached: boolean('sla_breached').notNull().default(false),
  surfaceAttribution: surfaceAttributionEnum('surface_attribution').notNull(),
  /** Related entity IDs */
  relatedEntities: jsonb('related_entities').$type<string[]>().notNull().default([]),
  /** Audit trail reference */
  auditTrailRef: text('audit_trail_ref').notNull(),
  /** Routing rationale from routing engine */
  routingRationale: text('routing_rationale').notNull(),
  /** Source provenance */
  sourceConnectorId: text('source_connector_id').notNull(),
  sourceImportRunId: text('source_import_run_id').notNull(),
  sourceSystem: text('source_system').notNull(),
  sourceTimestamp: timestamp('source_timestamp', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
