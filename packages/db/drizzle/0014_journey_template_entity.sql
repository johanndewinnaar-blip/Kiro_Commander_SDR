-- Journey Intelligence: JourneyTemplate Entity (JI-1.0 §5.3)
-- Domain: D-47 Journey Intelligence
-- Build unit: Unit 51
-- Schema: journey

CREATE TYPE "public"."journey_template_status" AS ENUM('active', 'draft', 'retired');--> statement-breakpoint
CREATE TABLE "journey"."journey_templates" (
	"id" text PRIMARY KEY NOT NULL,
	"tenant_id" text NOT NULL,
	"data_classification" "data_classification" DEFAULT 'configuration' NOT NULL,
	"template_id" text NOT NULL,
	"name" text NOT NULL,
	"anchor_type" "journey_anchor_type" NOT NULL,
	"parent_anchor_type" "journey_anchor_type",
	"applicability" jsonb NOT NULL,
	"expected_checkpoints" jsonb NOT NULL,
	"expected_phases" jsonb NOT NULL,
	"expected_delivery_modes" jsonb NOT NULL,
	"expected_outcome_distribution" jsonb NOT NULL,
	"tempo_thresholds" jsonb NOT NULL,
	"leakage_threshold_hours" integer NOT NULL,
	"formula_refs" jsonb NOT NULL,
	"version" text NOT NULL,
	"status" "journey_template_status" DEFAULT 'active' NOT NULL,
	"source_connector_id" text NOT NULL,
	"source_import_run_id" text NOT NULL,
	"source_system" text NOT NULL,
	"source_timestamp" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "journey"."journey_templates" ADD CONSTRAINT "journey_templates_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "idx_journey_templates_tenant_template_id" ON "journey"."journey_templates" ("tenant_id", "template_id");
