/**
 * Journey Intelligence Tagger Engines — Barrel Export
 *
 * 4 pure-function engines for audit event attribution:
 * 1. OODA Stage Tagger — action → OodaStage
 * 2. Delivery Mode Tagger — actor + context → DeliveryMode
 * 3. Lifecycle Checkpoint Resolver — entityType + action → LifecycleCheckpoint
 * 4. Journey ID Resolver — entity chain → journeyId + parentJourneyId
 *
 * Source: docs/00_authority/JOURNEY_INTELLIGENCE.md (JI-1.0) §9
 * Domain: D-47 Journey Intelligence
 * Build unit: Unit 51
 */

// ─── OODA Stage Tagger ───────────────────────────────────────────────────────
export type { OodaStageTagResult } from './ooda-stage-tagger';
export { OODA_STAGE_RULES, tagOodaStage } from './ooda-stage-tagger';

// ─── Delivery Mode Tagger ────────────────────────────────────────────────────
export type { ActorType, DeliveryModeTagInput, DeliveryModeTagResult } from './delivery-mode-tagger';
export { DELIVERY_MODE_RULES, tagDeliveryMode } from './delivery-mode-tagger';

// ─── Lifecycle Checkpoint Resolver ───────────────────────────────────────────
export type { CheckpointResolverInput, CheckpointResolverResult } from './lifecycle-checkpoint-resolver';
export { CHECKPOINT_RULES, resolveLifecycleCheckpoint } from './lifecycle-checkpoint-resolver';

// ─── Journey ID Resolver ─────────────────────────────────────────────────────
export type { JourneyIdResolverInput, JourneyIdResolverResult } from './journey-id-resolver';
export { ENTITY_TO_ANCHOR_MAP, resolveJourneyId } from './journey-id-resolver';
