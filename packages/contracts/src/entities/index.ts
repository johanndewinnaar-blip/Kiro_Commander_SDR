/**
 * Commander SDR Canonical Entities — Central Export
 *
 * Source: Spec #05, Spec #12, Spec #46, Spec #61, Spec #62
 */

export type {
  CommonFields,
  TenantContext,
  SourceMetadata,
  ConnectorClass,
  SignalPurpose,
  VerdictDisposition,
  SurfaceAttribution,
  BuildStatus,
} from './common';

export { CONNECTOR_CLASS_LABELS } from './common';

export type { Asset, AssetClassification } from './asset';
export type { Identity, IdentityClassification } from './identity';
export type { Connector, ConnectorState } from './connector';
export type { AuditEvent, AuditActor } from './audit-event';
export type { Case, CaseType, CaseTypeExtended, LegacyCaseType, CaseStatus, LegacyCaseStatus, CaseStatusExtended } from './case';
export { CASE_TYPES, LEGACY_STATUS_MAP } from './case';
export type { RiskObject, RiskObjectType, TreatmentState } from './risk-object';
export { RISK_OBJECT_TYPES } from './risk-object';
export type {
  FindingClass,
  SourceSeverityLevel,
  SourceSeverity,
  SourceConfidenceLevel,
  SourceConfidence,
  SourceProduct,
  AttackMapping,
  ObservableType,
  ObservableRef,
  SourceClassification,
  SourceClassificationValidation,
} from './coim';
export {
  FINDING_CLASSES,
  SEVERITY_ID,
  MAX_ATTACK_BINDINGS,
  MAX_OBSERVABLES,
  validateSourceClassification,
} from './coim';
export type { LifecycleActor, CaseTransition, TransitionRequest, TransitionResult, CaseTransitionRecord, CaseLifecycleHistory } from './case-lifecycle';
export { LIFECYCLE_ACTORS, ALLOWED_TRANSITIONS, isTransitionAllowed, getNextStates, getPermittedActors, executeTransition, appendTransitionRecord, getCurrentStatusFromHistory } from './case-lifecycle';
export type { CaseStrategyBinding, StrategyPolicyRef } from './case-strategy-binding';
export { CASE_STRATEGY_SURFACES } from './case-strategy-binding';
export type {
  StrategySurfaceType,
  StrategyPolicy,
  StrategyPolicyStatus,
  StrategyApproval,
  RuntimeBindingEvent,
  RuntimeBindingTrigger,
  StrategyCentreView,
} from './strategy';
export {
  STRATEGY_SURFACE_TYPES,
  STRATEGY_SURFACE_LABELS,
  RUNTIME_BINDING_EVENTS,
  STRATEGY_CENTRE_VIEWS,
  STRATEGY_CENTRE_VIEW_LABELS,
} from './strategy';
export type {
  Evidence,
  EvidenceType,
  EvidenceSource,
  FreshnessStatus,
  EvidenceValidation,
} from './evidence';
export {
  EVIDENCE_TYPES,
  EVIDENCE_SOURCES,
  FRESHNESS_STATUSES,
  MAX_CONFIDENCE,
  MIN_CONFIDENCE,
  validateEvidence,
} from './evidence';
export type {
  Verdict,
  VerdictPolicyRef,
  VerdictValidation,
} from './verdict';
export {
  DISPOSITION_SEVERITY,
  DISPOSITIONS_BY_SEVERITY,
  validateVerdict,
} from './verdict';
