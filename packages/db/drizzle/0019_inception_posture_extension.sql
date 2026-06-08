-- Inception Posture Intelligence: Entity Extensions (IPI-1.0 §4)
-- Domain: D-49 Inception Posture Intelligence
-- Build unit: Unit 53
-- All additive, nullable — zero breaking changes

ALTER TABLE "assets" ADD COLUMN "posture_origin" text;--> statement-breakpoint
ALTER TABLE "assets" ADD COLUMN "discovery_context" text;--> statement-breakpoint
CREATE INDEX "idx_assets_tenant_posture_origin" ON "assets" ("tenant_id", "posture_origin");--> statement-breakpoint
CREATE INDEX "idx_assets_tenant_discovery_context" ON "assets" ("tenant_id", "discovery_context");
