/**
 * Connectors Table — Commander SDR
 *
 * Canonical connector persistence with class A/B/C/D enforcement.
 *
 * Source: Spec #05 §6.4.4 Connector, Spec #61 Universal Security Signal Connector Contract
 * Data classification: Configuration
 */

import { pgTable, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { connectorClassEnum, dataClassificationEnum } from './common';
import { tenants } from './tenants';

export const connectors = pgTable('connectors', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull().references(() => tenants.id),
  dataClassification: dataClassificationEnum('data_classification').notNull().default('configuration'),
  name: text('name').notNull(),
  /** Connector classes — A/B/C/D only (Spec #61) */
  classes: jsonb('classes').$type<('A' | 'B' | 'C' | 'D')[]>().notNull(),
  sourceType: text('source_type').notNull(),
  tier: text('tier').notNull().default('core'),
  state: text('state').notNull().default('pending-approval'),
  lastRunAt: timestamp('last_run_at', { withTimezone: true }),
  lastRunStatus: text('last_run_status').default('never-run'),
  mappingPackVersion: text('mapping_pack_version').notNull(),
  /** Source provenance */
  sourceConnectorId: text('source_connector_id').notNull(),
  sourceImportRunId: text('source_import_run_id').notNull(),
  sourceSystem: text('source_system').notNull(),
  sourceTimestamp: timestamp('source_timestamp', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
