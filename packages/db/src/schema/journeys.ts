/**
 * Journey Entity Table — Commander SDR Persistence Layer
 *
 * Source: docs/00_authority/JOURNEY_INTELLIGENCE.md (JI-1.0) §5.2, §5.8, §13
 * Domain: D-47 Journey Intelligence
 * Build unit: Unit 51
 * Schema: journey
 * Workload: operational-write (create/update), operational-read (status queries)
 *
 * Migration: 0013_journey_entity.sql
 */

import { pgTable, pgSchema, text, timestamp, integer, index, pgEnum } from 'drizzle-orm/pg-core';
import { dataClassificationEnum } from './common';
import { tenants } from './tenants';

/** Journey database schema — dedicated workload boundary */
export const journeySchema = pgSchema('journey');

// ─── Journey Intelligence Enums ──────────────────────────────────────────────

/** OODA stage enum (4 values) per JI-1.0 §5.1 */
export const journeyOodaStageEnum = pgEnum('journey_ooda_stage', [
  'observe',
  'orient',
  'decide',
  'act',
]);

/** Delivery mode enum (5 values) per JI-1.0 §5.1 */
export const journeyDeliveryModeEnum = pgEnum('journey_delivery_mode', [
  'manual',
  'system_driven',
  'ai_enhanced',
  'human_confirmed_automation',
  'autonomous',
]);

/** Journey status enum (5 values) per JI-1.0 §5.1 */
export const journeyStatusEnum = pgEnum('journey_status', [
  'active',
  'completed',
  'stalled',
  'abandoned',
  'reworking',
]);

/** Journey outcome enum (9 values) per JI-1.0 §5.1 */
export const journeyOutcomeEnum = pgEnum('journey_outcome', [
  'successful',
  'partially_successful',
  'failed',
  'accepted_risk',
  'cancelled',
  'abandoned',
  'merged',
  'superseded',
  'pending',
]);

/** Journey anchor type enum (9 values) per JI-1.0 §5.1 */
export const journeyAnchorTypeEnum = pgEnum('journey_anchor_type', [
  'case',
  'finding',
  'ioc_match',
  'mission',
  'strategy_policy',
  'inbound_signal',
  'push_action',
  'war_room',
  'exposure_programme',
]);

/** Lifecycle checkpoint enum (~34 values) per JI-1.0 §5.1 */
export const lifecycleCheckpointEnum = pgEnum('lifecycle_checkpoint', [
  // Observe
  'signal_received',
  'signal_normalised',
  'signal_enriched',
  'coverage_assessed',
  'connector_pulled',
  // Orient
  'context_established',
  'drift_detected',
  'risk_scored',
  'blast_computed',
  'classification_assigned',
  'anomaly_detected',
  'correlation_completed',
  'entity_resolved',
  // Decide
  'case_created',
  'case_bound',
  'case_routed',
  'case_prioritised',
  'action_decomposed',
  'approval_requested',
  'approval_granted',
  'approval_denied',
  'escalation_triggered',
  // Act
  'action_started',
  'action_dispatched',
  'action_accepted',
  'action_executed',
  'action_failed',
  'action_retried',
  'human_rescue_initiated',
  'recovery_completed',
  'validation_started',
  'validation_passed',
  'validation_failed',
  'journey_completed',
  'journey_abandoned',
  'journey_reopened',
]);

// ─── Journey Table ───────────────────────────────────────────────────────────

export const journeys = journeySchema.table('journeys', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull().references(() => tenants.id),
  dataClassification: dataClassificationEnum('data_classification').notNull().default('state'),
  /** Deterministic journey identifier: journey-{anchorType}-{anchorId} */
  journeyId: text('journey_id').notNull(),
  /** Reference to a JourneyTemplate */
  templateRef: text('template_ref'),
  /** What entity anchors this journey */
  anchorType: journeyAnchorTypeEnum('anchor_type').notNull(),
  /** ID of the anchor entity */
  anchorId: text('anchor_id').notNull(),
  /** Parent journey ID (hierarchy) */
  parentJourneyId: text('parent_journey_id'),
  /** Current OODA phase */
  currentPhase: journeyOodaStageEnum('current_phase').notNull(),
  /** Current lifecycle checkpoint */
  currentCheckpoint: lifecycleCheckpointEnum('current_checkpoint').notNull(),
  /** Journey lifecycle status */
  status: journeyStatusEnum('status').notNull().default('active'),
  /** How the journey ended */
  outcome: journeyOutcomeEnum('outcome').notNull().default('pending'),
  /** When the journey started */
  startedAt: timestamp('started_at', { withTimezone: true }).notNull(),
  /** When the journey completed */
  completedAt: timestamp('completed_at', { withTimezone: true }),
  /** Current delivery mode */
  deliveryMode: journeyDeliveryModeEnum('delivery_mode').notNull(),
  /** Number of rework cycles */
  reworkCount: integer('rework_count').notNull().default(0),
  /** Number of child journeys */
  childCount: integer('child_count').notNull().default(0),
  /** Source provenance */
  sourceConnectorId: text('source_connector_id').notNull(),
  sourceImportRunId: text('source_import_run_id').notNull(),
  sourceSystem: text('source_system').notNull(),
  sourceTimestamp: timestamp('source_timestamp', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  /** Primary lookup: tenant + journey_id */
  tenantJourneyIdx: index('idx_journeys_tenant_journey_id').on(table.tenantId, table.journeyId),
  /** Status queries: tenant + status + current_phase */
  tenantStatusPhaseIdx: index('idx_journeys_tenant_status_phase').on(table.tenantId, table.status, table.currentPhase),
  /** Anchor lookup: tenant + anchor_type + anchor_id */
  tenantAnchorIdx: index('idx_journeys_tenant_anchor').on(table.tenantId, table.anchorType, table.anchorId),
}));
