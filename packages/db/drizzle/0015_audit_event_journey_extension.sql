-- Journey Intelligence: Audit Event Extension (JI-1.0 §5.4)
-- Domain: D-47 Journey Intelligence
-- Build unit: Unit 51
-- 5 nullable columns added to audit_events table (backward-compatible)

ALTER TABLE "audit_events" ADD COLUMN "ooda_stage" text;--> statement-breakpoint
ALTER TABLE "audit_events" ADD COLUMN "delivery_mode" text;--> statement-breakpoint
ALTER TABLE "audit_events" ADD COLUMN "lifecycle_checkpoint" text;--> statement-breakpoint
ALTER TABLE "audit_events" ADD COLUMN "journey_id" text;--> statement-breakpoint
ALTER TABLE "audit_events" ADD COLUMN "parent_journey_id" text;--> statement-breakpoint
CREATE INDEX "idx_audit_events_tenant_ooda_stage" ON "audit_events" ("tenant_id", "ooda_stage", "created_at" DESC);--> statement-breakpoint
CREATE INDEX "idx_audit_events_tenant_delivery_mode" ON "audit_events" ("tenant_id", "delivery_mode", "created_at" DESC);--> statement-breakpoint
CREATE INDEX "idx_audit_events_tenant_lifecycle_checkpoint" ON "audit_events" ("tenant_id", "lifecycle_checkpoint", "created_at" DESC);--> statement-breakpoint
CREATE INDEX "idx_audit_events_parent_journey" ON "audit_events" ("parent_journey_id") WHERE "parent_journey_id" IS NOT NULL;
