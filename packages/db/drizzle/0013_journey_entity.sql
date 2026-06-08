-- Journey Intelligence: Journey Entity (JI-1.0 §5.2)
-- Domain: D-47 Journey Intelligence
-- Build unit: Unit 51
-- Schema: journey

CREATE SCHEMA IF NOT EXISTS "journey";--> statement-breakpoint
CREATE TYPE "public"."journey_ooda_stage" AS ENUM('observe', 'orient', 'decide', 'act');--> statement-breakpoint
CREATE TYPE "public"."journey_delivery_mode" AS ENUM('manual', 'system_driven', 'ai_enhanced', 'human_confirmed_automation', 'autonomous');--> statement-breakpoint
CREATE TYPE "public"."journey_status" AS ENUM('active', 'completed', 'stalled', 'abandoned', 'reworking');--> statement-breakpoint
CREATE TYPE "public"."journey_outcome" AS ENUM('successful', 'partially_successful', 'failed', 'accepted_risk', 'cancelled', 'abandoned', 'merged', 'superseded', 'pending');--> statement-breakpoint
CREATE TYPE "public"."journey_anchor_type" AS ENUM('case', 'finding', 'ioc_match', 'mission', 'strategy_policy', 'inbound_signal', 'push_action', 'war_room', 'exposure_programme');--> statement-breakpoint
CREATE TYPE "public"."lifecycle_checkpoint" AS ENUM('signal_received', 'signal_normalised', 'signal_enriched', 'coverage_assessed', 'connector_pulled', 'context_established', 'drift_detected', 'risk_scored', 'blast_computed', 'classification_assigned', 'anomaly_detected', 'correlation_completed', 'entity_resolved', 'case_created', 'case_bound', 'case_routed', 'case_prioritised', 'action_decomposed', 'approval_requested', 'approval_granted', 'approval_denied', 'escalation_triggered', 'action_started', 'action_dispatched', 'action_accepted', 'action_executed', 'action_failed', 'action_retried', 'human_rescue_initiated', 'recovery_completed', 'validation_started', 'validation_passed', 'validation_failed', 'journey_completed', 'journey_abandoned', 'journey_reopened');--> statement-breakpoint
CREATE TABLE "journey"."journeys" (
	"id" text PRIMARY KEY NOT NULL,
	"tenant_id" text NOT NULL,
	"data_classification" "data_classification" DEFAULT 'state' NOT NULL,
	"journey_id" text NOT NULL,
	"template_ref" text,
	"anchor_type" "journey_anchor_type" NOT NULL,
	"anchor_id" text NOT NULL,
	"parent_journey_id" text,
	"current_phase" "journey_ooda_stage" NOT NULL,
	"current_checkpoint" "lifecycle_checkpoint" NOT NULL,
	"status" "journey_status" DEFAULT 'active' NOT NULL,
	"outcome" "journey_outcome" DEFAULT 'pending' NOT NULL,
	"started_at" timestamp with time zone NOT NULL,
	"completed_at" timestamp with time zone,
	"delivery_mode" "journey_delivery_mode" NOT NULL,
	"rework_count" integer DEFAULT 0 NOT NULL,
	"child_count" integer DEFAULT 0 NOT NULL,
	"source_connector_id" text NOT NULL,
	"source_import_run_id" text NOT NULL,
	"source_system" text NOT NULL,
	"source_timestamp" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "journey"."journeys" ADD CONSTRAINT "journeys_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_journeys_tenant_journey_id" ON "journey"."journeys" ("tenant_id", "journey_id");--> statement-breakpoint
CREATE INDEX "idx_journeys_tenant_status_phase" ON "journey"."journeys" ("tenant_id", "status", "current_phase");--> statement-breakpoint
CREATE INDEX "idx_journeys_tenant_anchor" ON "journey"."journeys" ("tenant_id", "anchor_type", "anchor_id");
