/**
 * Journey Intelligence Read Model Tables — Commander SDR Persistence Layer
 *
 * 7 analytics read-model tables for Journey Intelligence.
 * Schema: analytics
 * Workload: analytics-read
 * No FK to operational tables (workload boundary isolation).
 *
 * Source: docs/00_authority/JOURNEY_INTELLIGENCE.md (JI-1.0) §8
 * Domain: D-47 Journey Intelligence
 * Build unit: Unit 51
 *
 * Migration: 0016_journey_read_models.sql
 */

import { pgTable, pgSchema, text, timestamp, integer, real, jsonb, index } from 'drizzle-orm/pg-core';

/** Analytics database schema — dedicated read-model workload boundary */
export const analyticsSchema = pgSchema('analytics');

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Journey Lifecycle Tempo
// Per-journey, per-phase durations, checkpoint chain. Refreshed hourly.
// ═══════════════════════════════════════════════════════════════════════════════

export const journeyLifecycleTempo = analyticsSchema.table('journey_lifecycle_tempo', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull(),
  computedAt: timestamp('computed_at', { withTimezone: true }).notNull().defaultNow(),
  /** Journey ID reference */
  journeyId: text('journey_id').notNull(),
  /** Template reference (if matched) */
  templateRef: text('template_ref'),
  /** Anchor type */
  anchorType: text('anchor_type').notNull(),
  /** Current status */
  status: text('status').notNull(),
  /** Per-phase duration in hours (JSONB: { observe: n, orient: n, decide: n, act: n }) */
  phaseDurations: jsonb('phase_durations').$type<Record<string, number>>().notNull(),
  /** Total journey duration in hours */
  totalDurationHours: real('total_duration_hours').notNull(),
  /** Checkpoint chain in order (JSONB array of checkpoint strings) */
  checkpointChain: jsonb('checkpoint_chain').$type<string[]>().notNull(),
  /** Checkpoint count */
  checkpointCount: integer('checkpoint_count').notNull(),
  /** Current phase */
  currentPhase: text('current_phase').notNull(),
  /** Delivery mode */
  deliveryMode: text('delivery_mode').notNull(),
}, (table) => ({
  tenantJourneyIdx: index('idx_jlt_tenant_journey').on(table.tenantId, table.journeyId),
  tenantComputedIdx: index('idx_jlt_tenant_computed').on(table.tenantId, table.computedAt),
}));

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Automation Friction Metrics
// Drag, failure rate, rescue rate per action type/connector. Refreshed hourly.
// ═══════════════════════════════════════════════════════════════════════════════

export const automationFrictionMetrics = analyticsSchema.table('automation_friction_metrics', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull(),
  computedAt: timestamp('computed_at', { withTimezone: true }).notNull().defaultNow(),
  /** Action type or connector grouping key */
  groupKey: text('group_key').notNull(),
  /** Group type: 'action_type' | 'connector' | 'template' */
  groupType: text('group_type').notNull(),
  /** Average drag hours */
  avgDragHours: real('avg_drag_hours').notNull(),
  /** Failure rate (0–1) */
  failureRate: real('failure_rate').notNull(),
  /** Human rescue rate (0–1) */
  rescueRate: real('rescue_rate').notNull(),
  /** Average retry count */
  avgRetryCount: real('avg_retry_count').notNull(),
  /** Average recovery hours */
  avgRecoveryHours: real('avg_recovery_hours').notNull(),
  /** Connector reliability (0–1) */
  connectorReliability: real('connector_reliability').notNull(),
  /** Computed friction score (0–100) */
  frictionScore: real('friction_score').notNull(),
  /** Band classification */
  band: text('band').notNull(),
  /** Sample size (number of journeys in computation) */
  sampleSize: integer('sample_size').notNull(),
}, (table) => ({
  tenantGroupIdx: index('idx_afm_tenant_group').on(table.tenantId, table.groupKey),
  tenantComputedIdx: index('idx_afm_tenant_computed').on(table.tenantId, table.computedAt),
}));

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Journey Leakage Report
// Stalled journeys past template thresholds. Refreshed every 15 min.
// ═══════════════════════════════════════════════════════════════════════════════

export const journeyLeakageReport = analyticsSchema.table('journey_leakage_report', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull(),
  computedAt: timestamp('computed_at', { withTimezone: true }).notNull().defaultNow(),
  /** Journey ID at risk */
  journeyId: text('journey_id').notNull(),
  /** Template reference */
  templateRef: text('template_ref'),
  /** Anchor type */
  anchorType: text('anchor_type').notNull(),
  /** Current phase where stalled */
  stalledPhase: text('stalled_phase').notNull(),
  /** Current checkpoint where stalled */
  stalledCheckpoint: text('stalled_checkpoint').notNull(),
  /** Hours at current checkpoint */
  hoursAtCheckpoint: real('hours_at_checkpoint').notNull(),
  /** Template threshold hours for this phase */
  thresholdHours: real('threshold_hours').notNull(),
  /** Overshoot ratio (actual / threshold) */
  overshootRatio: real('overshoot_ratio').notNull(),
  /** Computed leakage risk score (0–100) */
  leakageRiskScore: real('leakage_risk_score').notNull(),
  /** Band classification */
  band: text('band').notNull(),
  /** Delivery mode */
  deliveryMode: text('delivery_mode').notNull(),
}, (table) => ({
  tenantJourneyIdx: index('idx_jlr_tenant_journey').on(table.tenantId, table.journeyId),
  tenantComputedIdx: index('idx_jlr_tenant_computed').on(table.tenantId, table.computedAt),
  tenantBandIdx: index('idx_jlr_tenant_band').on(table.tenantId, table.band),
}));

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Delivery Mode Distribution
// Mode split per journey type/time period. Refreshed daily.
// ═══════════════════════════════════════════════════════════════════════════════

export const deliveryModeDistribution = analyticsSchema.table('delivery_mode_distribution', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull(),
  computedAt: timestamp('computed_at', { withTimezone: true }).notNull().defaultNow(),
  /** Grouping key (template ID or anchor type) */
  groupKey: text('group_key').notNull(),
  /** Period start */
  periodStart: timestamp('period_start', { withTimezone: true }).notNull(),
  /** Period end */
  periodEnd: timestamp('period_end', { withTimezone: true }).notNull(),
  /** Distribution: { manual: n, system_driven: n, ai_enhanced: n, ... } (counts) */
  distribution: jsonb('distribution').$type<Record<string, number>>().notNull(),
  /** Distribution as percentages (0–1) */
  distributionPct: jsonb('distribution_pct').$type<Record<string, number>>().notNull(),
  /** Total journey count in period */
  totalJourneys: integer('total_journeys').notNull(),
  /** Maturity score (from automation-maturity formula) */
  maturityScore: real('maturity_score'),
  /** Band classification */
  band: text('band'),
}, (table) => ({
  tenantGroupIdx: index('idx_dmd_tenant_group').on(table.tenantId, table.groupKey),
  tenantComputedIdx: index('idx_dmd_tenant_computed').on(table.tenantId, table.computedAt),
}));

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Journey Quality Scores
// Composite quality per journey type (formula-driven). Refreshed daily.
// ═══════════════════════════════════════════════════════════════════════════════

export const journeyQualityScores = analyticsSchema.table('journey_quality_scores', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull(),
  computedAt: timestamp('computed_at', { withTimezone: true }).notNull().defaultNow(),
  /** Grouping key (template ID or anchor type) */
  groupKey: text('group_key').notNull(),
  /** Period start */
  periodStart: timestamp('period_start', { withTimezone: true }).notNull(),
  /** Period end */
  periodEnd: timestamp('period_end', { withTimezone: true }).notNull(),
  /** Quality score (0–100) */
  qualityScore: real('quality_score').notNull(),
  /** Band classification */
  band: text('band').notNull(),
  /** Input breakdown (JSONB) */
  breakdown: jsonb('breakdown').$type<Record<string, number>>().notNull(),
  /** Validation pass rate for period */
  validationPassRate: real('validation_pass_rate').notNull(),
  /** Outcome success rate for period */
  outcomeSuccessRate: real('outcome_success_rate').notNull(),
  /** Rework rate for period */
  reworkRate: real('rework_rate').notNull(),
  /** Sample size */
  sampleSize: integer('sample_size').notNull(),
}, (table) => ({
  tenantGroupIdx: index('idx_jqs_tenant_group').on(table.tenantId, table.groupKey),
  tenantComputedIdx: index('idx_jqs_tenant_computed').on(table.tenantId, table.computedAt),
}));

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Journey Rework Analysis
// Rework count, causes, cost per journey type. Refreshed daily.
// ═══════════════════════════════════════════════════════════════════════════════

export const journeyReworkAnalysis = analyticsSchema.table('journey_rework_analysis', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull(),
  computedAt: timestamp('computed_at', { withTimezone: true }).notNull().defaultNow(),
  /** Grouping key (template ID or anchor type) */
  groupKey: text('group_key').notNull(),
  /** Period start */
  periodStart: timestamp('period_start', { withTimezone: true }).notNull(),
  /** Period end */
  periodEnd: timestamp('period_end', { withTimezone: true }).notNull(),
  /** Total rework events in period */
  reworkCount: integer('rework_count').notNull(),
  /** Rework rate (fraction of journeys requiring rework) */
  reworkRate: real('rework_rate').notNull(),
  /** Average rework cost hours */
  avgReworkCostHours: real('avg_rework_cost_hours').notNull(),
  /** Total rework cost hours */
  totalReworkCostHours: real('total_rework_cost_hours').notNull(),
  /** Rework causes breakdown (JSONB: { validation_failure: n, evidence_gap: n, ... }) */
  causesBreakdown: jsonb('causes_breakdown').$type<Record<string, number>>().notNull(),
  /** Rework risk score (0–100) */
  reworkRiskScore: real('rework_risk_score').notNull(),
  /** Band classification */
  band: text('band').notNull(),
  /** Sample size */
  sampleSize: integer('sample_size').notNull(),
}, (table) => ({
  tenantGroupIdx: index('idx_jra_tenant_group').on(table.tenantId, table.groupKey),
  tenantComputedIdx: index('idx_jra_tenant_computed').on(table.tenantId, table.computedAt),
}));

// ═══════════════════════════════════════════════════════════════════════════════
// 7. Journey Outcome Analysis
// Outcome distribution per template, trends, correlations. Refreshed daily.
// ═══════════════════════════════════════════════════════════════════════════════

export const journeyOutcomeAnalysis = analyticsSchema.table('journey_outcome_analysis', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id').notNull(),
  computedAt: timestamp('computed_at', { withTimezone: true }).notNull().defaultNow(),
  /** Grouping key (template ID or anchor type) */
  groupKey: text('group_key').notNull(),
  /** Period start */
  periodStart: timestamp('period_start', { withTimezone: true }).notNull(),
  /** Period end */
  periodEnd: timestamp('period_end', { withTimezone: true }).notNull(),
  /** Outcome distribution (JSONB: { successful: n, failed: n, ... }) */
  outcomeDistribution: jsonb('outcome_distribution').$type<Record<string, number>>().notNull(),
  /** Outcome distribution as percentages */
  outcomeDistributionPct: jsonb('outcome_distribution_pct').$type<Record<string, number>>().notNull(),
  /** Success rate (successful + partially_successful) / total */
  successRate: real('success_rate').notNull(),
  /** Failure rate (failed / total) */
  failureRate: real('failure_rate').notNull(),
  /** Abandonment rate */
  abandonmentRate: real('abandonment_rate').notNull(),
  /** Trend direction: 'improving' | 'stable' | 'declining' */
  trendDirection: text('trend_direction').notNull(),
  /** Economics score for completed journeys */
  economicsScore: real('economics_score'),
  /** Total journeys in period */
  totalJourneys: integer('total_journeys').notNull(),
}, (table) => ({
  tenantGroupIdx: index('idx_joa_tenant_group').on(table.tenantId, table.groupKey),
  tenantComputedIdx: index('idx_joa_tenant_computed').on(table.tenantId, table.computedAt),
}));
