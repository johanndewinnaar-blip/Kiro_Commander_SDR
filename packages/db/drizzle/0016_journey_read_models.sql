-- Journey Intelligence: Read Model Schemas (JI-1.0 §8)
-- Domain: D-47 Journey Intelligence
-- Build unit: Unit 51
-- Schema: analytics
-- Workload: analytics-read
-- No FK to operational tables (workload boundary isolation)

CREATE SCHEMA IF NOT EXISTS "analytics";--> statement-breakpoint

-- 1. Journey Lifecycle Tempo (hourly refresh)
CREATE TABLE "analytics"."journey_lifecycle_tempo" (
	"id" text PRIMARY KEY NOT NULL,
	"tenant_id" text NOT NULL,
	"computed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"journey_id" text NOT NULL,
	"template_ref" text,
	"anchor_type" text NOT NULL,
	"status" text NOT NULL,
	"phase_durations" jsonb NOT NULL,
	"total_duration_hours" real NOT NULL,
	"checkpoint_chain" jsonb NOT NULL,
	"checkpoint_count" integer NOT NULL,
	"current_phase" text NOT NULL,
	"delivery_mode" text NOT NULL
);
--> statement-breakpoint

-- 2. Automation Friction Metrics (hourly refresh)
CREATE TABLE "analytics"."automation_friction_metrics" (
	"id" text PRIMARY KEY NOT NULL,
	"tenant_id" text NOT NULL,
	"computed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"group_key" text NOT NULL,
	"group_type" text NOT NULL,
	"avg_drag_hours" real NOT NULL,
	"failure_rate" real NOT NULL,
	"rescue_rate" real NOT NULL,
	"avg_retry_count" real NOT NULL,
	"avg_recovery_hours" real NOT NULL,
	"connector_reliability" real NOT NULL,
	"friction_score" real NOT NULL,
	"band" text NOT NULL,
	"sample_size" integer NOT NULL
);
--> statement-breakpoint

-- 3. Journey Leakage Report (15-minute refresh)
CREATE TABLE "analytics"."journey_leakage_report" (
	"id" text PRIMARY KEY NOT NULL,
	"tenant_id" text NOT NULL,
	"computed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"journey_id" text NOT NULL,
	"template_ref" text,
	"anchor_type" text NOT NULL,
	"stalled_phase" text NOT NULL,
	"stalled_checkpoint" text NOT NULL,
	"hours_at_checkpoint" real NOT NULL,
	"threshold_hours" real NOT NULL,
	"overshoot_ratio" real NOT NULL,
	"leakage_risk_score" real NOT NULL,
	"band" text NOT NULL,
	"delivery_mode" text NOT NULL
);
--> statement-breakpoint

-- 4. Delivery Mode Distribution (daily refresh)
CREATE TABLE "analytics"."delivery_mode_distribution" (
	"id" text PRIMARY KEY NOT NULL,
	"tenant_id" text NOT NULL,
	"computed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"group_key" text NOT NULL,
	"period_start" timestamp with time zone NOT NULL,
	"period_end" timestamp with time zone NOT NULL,
	"distribution" jsonb NOT NULL,
	"distribution_pct" jsonb NOT NULL,
	"total_journeys" integer NOT NULL,
	"maturity_score" real,
	"band" text
);
--> statement-breakpoint

-- 5. Journey Quality Scores (daily refresh)
CREATE TABLE "analytics"."journey_quality_scores" (
	"id" text PRIMARY KEY NOT NULL,
	"tenant_id" text NOT NULL,
	"computed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"group_key" text NOT NULL,
	"period_start" timestamp with time zone NOT NULL,
	"period_end" timestamp with time zone NOT NULL,
	"quality_score" real NOT NULL,
	"band" text NOT NULL,
	"breakdown" jsonb NOT NULL,
	"validation_pass_rate" real NOT NULL,
	"outcome_success_rate" real NOT NULL,
	"rework_rate" real NOT NULL,
	"sample_size" integer NOT NULL
);
--> statement-breakpoint

-- 6. Journey Rework Analysis (daily refresh)
CREATE TABLE "analytics"."journey_rework_analysis" (
	"id" text PRIMARY KEY NOT NULL,
	"tenant_id" text NOT NULL,
	"computed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"group_key" text NOT NULL,
	"period_start" timestamp with time zone NOT NULL,
	"period_end" timestamp with time zone NOT NULL,
	"rework_count" integer NOT NULL,
	"rework_rate" real NOT NULL,
	"avg_rework_cost_hours" real NOT NULL,
	"total_rework_cost_hours" real NOT NULL,
	"causes_breakdown" jsonb NOT NULL,
	"rework_risk_score" real NOT NULL,
	"band" text NOT NULL,
	"sample_size" integer NOT NULL
);
--> statement-breakpoint

-- 7. Journey Outcome Analysis (daily refresh)
CREATE TABLE "analytics"."journey_outcome_analysis" (
	"id" text PRIMARY KEY NOT NULL,
	"tenant_id" text NOT NULL,
	"computed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"group_key" text NOT NULL,
	"period_start" timestamp with time zone NOT NULL,
	"period_end" timestamp with time zone NOT NULL,
	"outcome_distribution" jsonb NOT NULL,
	"outcome_distribution_pct" jsonb NOT NULL,
	"success_rate" real NOT NULL,
	"failure_rate" real NOT NULL,
	"abandonment_rate" real NOT NULL,
	"trend_direction" text NOT NULL,
	"economics_score" real,
	"total_journeys" integer NOT NULL
);
--> statement-breakpoint

-- Indexes
CREATE INDEX "idx_jlt_tenant_journey" ON "analytics"."journey_lifecycle_tempo" ("tenant_id", "journey_id");--> statement-breakpoint
CREATE INDEX "idx_jlt_tenant_computed" ON "analytics"."journey_lifecycle_tempo" ("tenant_id", "computed_at");--> statement-breakpoint
CREATE INDEX "idx_afm_tenant_group" ON "analytics"."automation_friction_metrics" ("tenant_id", "group_key");--> statement-breakpoint
CREATE INDEX "idx_afm_tenant_computed" ON "analytics"."automation_friction_metrics" ("tenant_id", "computed_at");--> statement-breakpoint
CREATE INDEX "idx_jlr_tenant_journey" ON "analytics"."journey_leakage_report" ("tenant_id", "journey_id");--> statement-breakpoint
CREATE INDEX "idx_jlr_tenant_computed" ON "analytics"."journey_leakage_report" ("tenant_id", "computed_at");--> statement-breakpoint
CREATE INDEX "idx_jlr_tenant_band" ON "analytics"."journey_leakage_report" ("tenant_id", "band");--> statement-breakpoint
CREATE INDEX "idx_dmd_tenant_group" ON "analytics"."delivery_mode_distribution" ("tenant_id", "group_key");--> statement-breakpoint
CREATE INDEX "idx_dmd_tenant_computed" ON "analytics"."delivery_mode_distribution" ("tenant_id", "computed_at");--> statement-breakpoint
CREATE INDEX "idx_jqs_tenant_group" ON "analytics"."journey_quality_scores" ("tenant_id", "group_key");--> statement-breakpoint
CREATE INDEX "idx_jqs_tenant_computed" ON "analytics"."journey_quality_scores" ("tenant_id", "computed_at");--> statement-breakpoint
CREATE INDEX "idx_jra_tenant_group" ON "analytics"."journey_rework_analysis" ("tenant_id", "group_key");--> statement-breakpoint
CREATE INDEX "idx_jra_tenant_computed" ON "analytics"."journey_rework_analysis" ("tenant_id", "computed_at");--> statement-breakpoint
CREATE INDEX "idx_joa_tenant_group" ON "analytics"."journey_outcome_analysis" ("tenant_id", "group_key");--> statement-breakpoint
CREATE INDEX "idx_joa_tenant_computed" ON "analytics"."journey_outcome_analysis" ("tenant_id", "computed_at");
