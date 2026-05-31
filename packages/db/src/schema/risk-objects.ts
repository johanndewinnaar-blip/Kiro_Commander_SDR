/**
 * Risk Objects Table — Commander SDR
 *
 * Risk objects are discrete risk conditions bound to cases and entities.
 * System-created and tenant-scoped.
 *
 * Source: Spec #29 Universal Risk Object and Case Binding
 * Data classification: State
 */

import { pgTable, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { dataClassificationEnum } from './common';
import { tenants } from './tenants';

/** Risk object type enum — 8 canonical types */
export const riskObjectTypeEnum = pgEnum('risk_object_type', [
  'coverage_blindspot',
  'ooda_phase_degradation',
  'vulnerability_drift',
  'configuration_drift',
  'exposure_drift',
  'control_gap',
  'identity_risk',
  'policy_gap',
]);

/** Treatment state enum — 4 states */
export const treatmentStateEnum = pgEnum('treatment_state', [
  'open',
  'mitigated',
  'accepted',
  'transferred',
]);

export const riskObjects = pgTable('risk_objects', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull().references(() => tenants.id),
  dataClassification: dataClassificationEnum('data_classification').notNull().default('state'),
  /** Risk object type */
  type: riskObjectTypeEnum('type').notNull(),
  /** ID of the affected entity (asset, identity, case, etc.) */
  affectedEntityId: text('affected_entity_id').notNull(),
  /** Type of the affected entity */
  affectedEntityType: text('affected_entity_type').notNull(),
  /** Justification for this risk object's creation */
  justification: text('justification').notNull(),
  /** Owner responsible for treatment */
  owner: text('owner').notNull(),
  /** Current treatment state */
  treatmentState: treatmentStateEnum('treatment_state').notNull().default('open'),
  /** Expiry or review trigger condition */
  expiryOrReviewTrigger: text('expiry_or_review_trigger').notNull(),
  /** Source provenance */
  sourceConnectorId: text('source_connector_id').notNull(),
  sourceImportRunId: text('source_import_run_id').notNull(),
  sourceSystem: text('source_system').notNull(),
  sourceTimestamp: timestamp('source_timestamp', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
