-- Asset Architecture Intelligence: Asset Entity Extension (AAI-1.0 §9)
-- Domain: D-48 Asset Architecture Intelligence
-- Build unit: Unit 52
-- 4 nullable columns added to assets table (backward-compatible)

ALTER TABLE "assets" ADD COLUMN "architectural_tier" text;--> statement-breakpoint
ALTER TABLE "assets" ADD COLUMN "asset_lifecycle_model" text;--> statement-breakpoint
ALTER TABLE "assets" ADD COLUMN "service_classification" text;--> statement-breakpoint
ALTER TABLE "assets" ADD COLUMN "estate_node_id" text;--> statement-breakpoint
CREATE INDEX "idx_assets_tenant_tier" ON "assets" ("tenant_id", "architectural_tier");--> statement-breakpoint
CREATE INDEX "idx_assets_tenant_estate_node" ON "assets" ("tenant_id", "estate_node_id");
