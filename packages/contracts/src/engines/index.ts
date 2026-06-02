/**
 * Commander SDR Engines — Central Export
 *
 * System-owned engines for case lifecycle operations.
 * Source: Unit 7 — Case Lifecycle Engine (Core State Machine)
 * Source: Unit 9 — Case Prioritisation Engine
 */

export type { BindingOutcome, BindingRequest, BindingResult } from './risk-object-binder';
export { BINDING_OUTCOMES, bindRiskObject } from './risk-object-binder';

export type { CaseRefRequest, CaseRefResult } from './case-ref-generator';
export { CASE_TYPE_ABBREVIATIONS, generateCaseRef, parseCaseRef } from './case-ref-generator';

export type { AssignmentContext, CaseTypeAssignmentRequest, CaseTypeAssignmentResult } from './case-type-assigner';
export { DEFAULT_RISK_TO_CASE_MAP, SIGNAL_CONTEXT_CASE_TYPES, assignCaseType, getReachableCaseTypes } from './case-type-assigner';

// Unit 9: Case Prioritisation Engine
export type {
  CaseEvidenceScores,
  MissionFactors,
  PrioritisationScores,
  NextBestAction,
  PushPreference,
  Priority,
  PriorityThresholds,
  AutomationConfig,
  PrioritisationRequest,
  PrioritisationResult,
} from './case-prioritisation-engine';
export {
  calculateCRS,
  calculateMS,
  calculateWCS,
  determinePriority,
  generateNBA,
  determinePushPreference,
  prioritiseCase,
} from './case-prioritisation-engine';

// Unit 10: Case SLA Engine
export type {
  CaseSlaState,
  SlaEvaluationRequest,
  SlaEvaluationResult,
  SlaNotification,
  SlaEscalation,
} from './case-sla-engine';
export {
  calculateSlaState,
  detectBreach,
  generateNotifications,
  calculateEscalation,
  evaluateSla,
} from './case-sla-engine';

// Unit 11: Case Validation Engine
export type {
  ValidationState,
  ValidationTriggerType,
  ValidationTransition,
  EvidenceRecord,
  CaseValidationState,
  ValidationEvaluationRequest,
  ValidationEvaluationResult,
} from './case-validation-engine';
export {
  VALIDATION_STATES,
  VALIDATION_TRIGGER_TYPES,
  VALIDATION_TRANSITIONS,
  isValidationTransitionAllowed,
  getNextValidationStates,
  executeValidationTransition,
  checkEvidenceFreshness,
  checkWindowExpiry,
  shouldTriggerRevalidation,
  evaluateValidation,
} from './case-validation-engine';

// Unit 12: Case Closure Gate Engine
export type {
  ClosureGateType,
  GateStatus,
  GateInput,
  GateResult,
  CaseClosureGateState,
  ClosureGateEvaluationRequest,
  ClosureGateEvaluationResult,
} from './case-closure-gate-engine';
export {
  CLOSURE_GATE_TYPES,
  evaluateGate,
  evaluateAllGates,
  extractClosureGateConfig,
  evaluateClosureReadiness,
  isManualClosureBlocked,
} from './case-closure-gate-engine';

// Unit 13: Case Reopening Trigger Engine
export type {
  ReopeningTriggerType,
  ReopeningTriggerInput,
  TriggerResult,
  CaseReopeningTriggerState,
  ReopeningTriggerEvaluationRequest,
  ReopeningTriggerEvaluationResult,
} from './case-reopening-trigger-engine';
export {
  REOPENING_TRIGGER_TYPES,
  evaluateTrigger,
  evaluateAllTriggers,
  extractReopeningTriggerConfig,
  evaluateReopeningReadiness,
  isManualReopeningBlocked,
} from './case-reopening-trigger-engine';

// Unit 5: Normalisation Layer (Canonical Entity Model)
export type {
  EntityMatchCandidate,
  EntityMatchResult,
  AuthorityClaim,
  AuthorityResolutionResult,
  VerdictRecord,
  VerdictProcessingResult,
  ThreatIndicator,
  EstateEntity,
  InverseDiscoveryMatch,
  SurfaceAttributionInput,
} from './normalisation-layer';
export {
  matchEntities,
  resolveAuthority,
  processVerdict,
  resolveVerdictConflict,
  routeInverseDiscovery,
  assignSurfaceAttribution,
} from './normalisation-layer';

// Unit 14: Intelligence Layer (Four Streams + Estate Intelligence Picture)
export type {
  IntelligenceStream,
  StreamSignal,
  StreamSummary,
  EstateIntelligencePicture,
  PreWarnedClassification,
  PriorPostureKnowledge,
  PreWarnedResult,
  ToolVerdict,
  VerdictDisagreementResult,
  InverseDiscoveryRootCause,
  InverseDiscoveryFinding,
  BehaviouralProfile,
  BehaviouralAnomalyResult,
  ThreatRelevanceInput,
  ThreatRelevanceResult,
  DefensiveAction,
  SilentDefenceAggregate,
} from './intelligence-layer';
export {
  INTELLIGENCE_STREAMS,
  STREAM_LABELS,
  CLASS_TO_STREAM,
  STREAM_SURFACE_AFFINITY,
  resolveStreamForClass,
  routeClassesToStreams,
  composeEstateIntelligencePicture,
  classifyPreWarned,
  detectVerdictDisagreement,
  evaluateInverseDiscovery,
  detectBehaviouralAnomaly,
  scoreThreatRelevance,
  aggregateSilentDefence,
} from './intelligence-layer';

// Unit 15: OODA Layer (Programme-Level OODA Tempo)
export type {
  OodaPhase,
  ObservePhaseMetrics,
  OrientPhaseMetrics,
  DecidePhaseMetrics,
  ActPhaseMetrics,
  PhaseHealthScore,
  HealthThresholds,
  PhaseDegradation,
  DegradationCaseRequest,
  DegradationRiskObjectTemplate,
  CommandTempo,
} from './ooda-layer';
export {
  OODA_PHASES,
  OODA_PHASE_LABELS,
  calculateObserveHealth,
  calculateOrientHealth,
  calculateDecideHealth,
  calculateActHealth,
  detectPhaseDegradation,
  createDegradationRiskObject,
  composeCommandTempo,
} from './ooda-layer';

// Unit 40: Commander AI Core (Grounding & Refusal)
export type {
  GroundingCorpus,
  GroundingRef,
  GroundingResult,
  RefusalReason,
  AiActionRequest,
  RefusalCheck,
  AiOutput,
} from './commander-ai-core';
export {
  groundReferences,
  REFUSAL_REASONS,
  REFUSAL_LABELS,
  checkRefusal,
  draftCaseSummary,
  explainCaseRouting,
  summarizeRiskTreatment,
  navigateToEntity,
  logAiExecution,
} from './commander-ai-core';
