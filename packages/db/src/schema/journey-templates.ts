/**
 * Journey Template Table — Commander SDR Persistence Layer
 *
 * Source: docs/00_authority/JOURNEY_INTELLIGENCE.md (JI-1.0) §5.3
 * Domain: D-47 Journey Intelligence
 * Build unit: Unit 51
 * Schema: journey
 * Workload: operational-read (consumed by taggers)
 *
 * Migration: 0014_journey_template_entity.sql
 */

import { text, timestamp, jsonb, index, pgEnum, integer } from 'drizzle-orm/pg-core';
import { dataClassificationEnum } from './common';
import { tenants } from './tenants';
import { journeySchema, journeyAnchorTypeEnum } from './journeys';

/** Journey template status enum */
export const journeyTemplateStatusEnum = pgEnum('journey_template_status', [
  'active',
  'draft',
  'retired',
]);

export const journeyTemplates = journeySchema.table('journey_templates', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull().references(() => tenants.id),
  dataClassification: dataClassificationEnum('data_classification').notNull().default('configuration'),
  /** Unique template identifier (e.g., JT-CASE-001) */
  templateId: text('template_id').notNull(),
  /** Human-readable name */
  name: text('name').notNull(),
  /** What entity type anchors journeys of this template */
  anchorType: journeyAnchorTypeEnum('anchor_type').notNull(),
  /** Parent anchor type (for child journeys) */
  parentAnchorType: journeyAnchorTypeEnum('parent_anchor_type'),
  /** Applicability filter (JSONB) */
  applicability: jsonb('applicability').$type<{
    caseTypes?: string[];
    domains?: string[];
    d3fendTactics?: string[];
    anchorSubtype?: string;
  }>().notNull(),
  /** Expected lifecycle checkpoints in order (JSONB array) */
  expectedCheckpoints: jsonb('expected_checkpoints').$type<string[]>().notNull(),
  /** Expected OODA phases traversed (JSONB array) */
  expectedPhases: jsonb('expected_phases').$type<string[]>().notNull(),
  /** Expected delivery modes (JSONB array) */
  expectedDeliveryModes: jsonb('expected_delivery_modes').$type<string[]>().notNull(),
  /** Expected outcome distribution (JSONB record) */
  expectedOutcomeDistribution: jsonb('expected_outcome_distribution').$type<Record<string, number>>().notNull(),
  /** Maximum hours per OODA phase (JSONB record) */
  tempoThresholds: jsonb('tempo_thresholds').$type<Record<string, number>>().notNull(),
  /** Hours after which a journey is flagged as leaking */
  leakageThresholdHours: integer('leakage_threshold_hours').notNull(),
  /** References to formula families (JSONB array) */
  formulaRefs: jsonb('formula_refs').$type<string[]>().notNull(),
  /** Template version (semantic) */
  version: text('version').notNull(),
  /** Template status */
  status: journeyTemplateStatusEnum('status').notNull().default('active'),
  /** Source provenance */
  sourceConnectorId: text('source_connector_id').notNull(),
  sourceImportRunId: text('source_import_run_id').notNull(),
  sourceSystem: text('source_system').notNull(),
  sourceTimestamp: timestamp('source_timestamp', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  /** Unique lookup: tenant + template_id */
  tenantTemplateIdx: index('idx_journey_templates_tenant_template_id').on(table.tenantId, table.templateId).where('1=1'),
}));
