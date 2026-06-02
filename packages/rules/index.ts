/**
 * Commander SDR Rules Package — Platform Intelligence & IOC Distribution
 *
 * Pure functions: normalisation, deduplication, confidence aggregation,
 * freshness evaluation, allow/block, relationship state, ingestion pipeline,
 * advisory extraction, tenant builders, push mapping, case mappers,
 * threat hunts, compliance enrichment, cross-plane resolution.
 */

export { normaliseIoc } from './ioc-normalisation';
export type { NormalisationResult } from './ioc-normalisation';

export { dedupAndMerge, buildDedupKey } from './ioc-dedup';
export type { DedupKey, DedupResult } from './ioc-dedup';

export { aggregateConfidence, WEAK_SOURCE_CEILING, WEAK_SOURCE_THRESHOLD, FRESHNESS_WEIGHTS, TENANT_OBSERVATION_BOOST, ANALYST_CONFIRMATION_BOOST } from './confidence-aggregation';
export type { ConfidenceSource } from './confidence-aggregation';

export { evaluateFreshness } from './feed-freshness';

export { applySyncResult } from './feed-sync';
export type { FeedScheduleState, SyncResult, SyncSuccess, SyncFailure } from './feed-sync';

export { transitionRelationship } from './relationship-state';
export type { TransitionResult } from './relationship-state';

export { evaluateAllowBlock } from './allow-block';
export type { AllowBlockDecision, AllowBlockSuppressDecision, AllowBlockForceDecision, AllowBlockProceedDecision } from './allow-block';

export { processIngestion } from './ingestion-pipeline';
export type { IngestionPath, IngestionInput, IngestionOutput } from './ingestion-pipeline';

export { extractAdvisoryIocs } from './advisory-ioc-extraction';
export type { ExtractionInput, ExtractionResult } from './advisory-ioc-extraction';

export { buildTenantEvaluation, buildTenantIocMatch } from './tenant-evaluation-builders';
export type { BuildEvaluationInput, BuildMatchInput } from './tenant-evaluation-builders';

export { getTargetSystems, buildPushActionIntent, PUSH_CAPABILITY_MAP, PHASE1_ALLOWED_STATUSES } from './push-capability-mapping';

export { buildIocCaseLink, buildVulnerabilityCaseLink, generateActionRecommendation, ACTION_FOLLOW_UPS } from './case-outcome-mappers';
export type { ActionRecommendation, ActionFollowUp } from './case-outcome-mappers';

export { buildThreatHuntRecord, transitionHuntStatus } from './threat-hunt-builder';
export type { BuildHuntInput } from './threat-hunt-builder';

export { mapCveToEnrichmentEvidence, mapIocMatchToEnrichmentEvidence, assertNeverCreatesComplianceState } from './compliance-enrichment';
export type { IntelligenceEnrichmentEvidence } from './compliance-enrichment';

export { resolveReference, batchResolveReferences } from './cross-plane-resolver';
export type { ResolutionResult } from './cross-plane-resolver';
