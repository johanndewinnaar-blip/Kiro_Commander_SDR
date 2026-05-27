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
export type { Case, CaseType, CaseStatus } from './case';
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
