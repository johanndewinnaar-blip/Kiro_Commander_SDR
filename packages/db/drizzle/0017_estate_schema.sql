-- Asset Architecture Intelligence: Estate Schema (AAI-1.0 §4, §6)
-- Domain: D-48 Asset Architecture Intelligence
-- Build unit: Unit 52

CREATE SCHEMA IF NOT EXISTS "estate";--> statement-breakpoint
CREATE TYPE "public"."estate_node_type" AS ENUM('enterprise', 'business_unit', 'environment', 'region', 'acquisition', 'shared_service');--> statement-breakpoint
CREATE TYPE "public"."estate_node_status" AS ENUM('active', 'integrating', 'decommissioning', 'isolated');--> statement-breakpoint
CREATE TYPE "public"."relationship_type" AS ENUM('depends_on', 'hosts', 'routes_through', 'authenticates_via', 'stores_data_for', 'deployed_by', 'covered_by', 'in_scope_for', 'owned_by', 'accessed_by_vendor', 'secures', 'contains');--> statement-breakpoint
CREATE TYPE "public"."relationship_status" AS ENUM('active', 'stale', 'broken');--> statement-breakpoint
CREATE TYPE "public"."confirmed_by" AS ENUM('connector', 'manual', 'inference');--> statement-breakpoint
CREATE TYPE "public"."coverage_status" AS ENUM('covered', 'gap', 'stale');--> statement-breakpoint
CREATE TYPE "public"."scope_status" AS ENUM('in_scope', 'out_of_scope', 'conditional');--> statement-breakpoint
CREATE TABLE "estate"."estate_nodes" (
	"id" text PRIMARY KEY NOT NULL,
	"tenant_id" text NOT NULL,
	"data_classification" "data_classification" DEFAULT 'configuration' NOT NULL,
	"node_id" text NOT NULL,
	"name" text NOT NULL,
	"node_type" "estate_node_type" NOT NULL,
	"parent_node_id" text,
	"status" "estate_node_status" DEFAULT 'active' NOT NULL,
	"geography" text,
	"compliance_scopes" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"owner_team" text NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"source_connector_id" text NOT NULL,
	"source_import_run_id" text NOT NULL,
	"source_system" text NOT NULL,
	"source_timestamp" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "estate"."asset_relationships" (
	"id" text PRIMARY KEY NOT NULL,
	"tenant_id" text NOT NULL,
	"data_classification" "data_classification" DEFAULT 'state' NOT NULL,
	"source_asset_id" text NOT NULL,
	"target_asset_id" text NOT NULL,
	"relationship_type" "relationship_type" NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"confirmed_at" timestamp with time zone NOT NULL,
	"confirmed_by" "confirmed_by" NOT NULL,
	"status" "relationship_status" DEFAULT 'active' NOT NULL,
	"source_connector_id" text NOT NULL,
	"source_import_run_id" text NOT NULL,
	"source_system" text NOT NULL,
	"source_timestamp" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "estate"."asset_coverage_bindings" (
	"id" text PRIMARY KEY NOT NULL,
	"tenant_id" text NOT NULL,
	"data_classification" "data_classification" DEFAULT 'state' NOT NULL,
	"asset_id" text NOT NULL,
	"connector_id" text NOT NULL,
	"coverage_type" text NOT NULL,
	"confirmed_at" timestamp with time zone NOT NULL,
	"status" "coverage_status" DEFAULT 'covered' NOT NULL,
	"source_connector_id" text NOT NULL,
	"source_import_run_id" text NOT NULL,
	"source_system" text NOT NULL,
	"source_timestamp" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "estate"."compliance_scope_bindings" (
	"id" text PRIMARY KEY NOT NULL,
	"tenant_id" text NOT NULL,
	"data_classification" "data_classification" DEFAULT 'configuration' NOT NULL,
	"asset_id" text NOT NULL,
	"framework_id" text NOT NULL,
	"scope_status" "scope_status" NOT NULL,
	"justification" text NOT NULL,
	"reviewed_at" timestamp with time zone NOT NULL,
	"inherited_from" text,
	"source_connector_id" text NOT NULL,
	"source_import_run_id" text NOT NULL,
	"source_system" text NOT NULL,
	"source_timestamp" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "estate"."estate_nodes" ADD CONSTRAINT "estate_nodes_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "estate"."asset_relationships" ADD CONSTRAINT "asset_relationships_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "estate"."asset_coverage_bindings" ADD CONSTRAINT "asset_coverage_bindings_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "estate"."compliance_scope_bindings" ADD CONSTRAINT "compliance_scope_bindings_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_estate_nodes_tenant_node" ON "estate"."estate_nodes" ("tenant_id", "node_id");--> statement-breakpoint
CREATE INDEX "idx_estate_nodes_tenant_parent" ON "estate"."estate_nodes" ("tenant_id", "parent_node_id");--> statement-breakpoint
CREATE INDEX "idx_asset_rel_tenant_source" ON "estate"."asset_relationships" ("tenant_id", "source_asset_id");--> statement-breakpoint
CREATE INDEX "idx_asset_rel_tenant_target" ON "estate"."asset_relationships" ("tenant_id", "target_asset_id");--> statement-breakpoint
CREATE INDEX "idx_asset_rel_tenant_type" ON "estate"."asset_relationships" ("tenant_id", "relationship_type");--> statement-breakpoint
CREATE INDEX "idx_coverage_tenant_asset" ON "estate"."asset_coverage_bindings" ("tenant_id", "asset_id");--> statement-breakpoint
CREATE INDEX "idx_coverage_tenant_status" ON "estate"."asset_coverage_bindings" ("tenant_id", "status");--> statement-breakpoint
CREATE INDEX "idx_scope_tenant_asset" ON "estate"."compliance_scope_bindings" ("tenant_id", "asset_id");--> statement-breakpoint
CREATE INDEX "idx_scope_tenant_framework" ON "estate"."compliance_scope_bindings" ("tenant_id", "framework_id");
