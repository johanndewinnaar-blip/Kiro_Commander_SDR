/**
 * Risk Object Entity — Commander SDR Canonical Model
 *
 * Source: Spec #29 Universal Risk Object and Case Binding
 * v1.3.1 lineage closure: coverage_blindspot (Spec #72), ooda_phase_degradation (Spec #58)
 *
 * Risk objects are bound to cases and represent discrete risk conditions
 * that require treatment. They are system-created and tenant-scoped.
 */

import type { CommonFields } from './common';

/**
 * Risk object types per v1.2 and v1.3.1 requirements.
 * - coverage_blindspot: v1.3.1 lineage closure — Spec #72
 * - ooda_phase_degradation: v1.3.1 lineage closure — Spec #58
 */
export type RiskObjectType =
  | 'coverage_blindspot'
  | 'ooda_phase_degradation'
  | 'vulnerability_drift'
  | 'configuration_drift'
  | 'exposure_drift'
  | 'control_gap'
  | 'identity_risk'
  | 'policy_gap';

/** All risk object types as a constant array */
export const RISK_OBJECT_TYPES: RiskObjectType[] = [
  'coverage_blindspot',
  'ooda_phase_degradation',
  'vulnerability_drift',
  'configuration_drift',
  'exposure_drift',
  'control_gap',
  'identity_risk',
  'policy_gap',
];

/** Treatment state for risk objects */
export type TreatmentState = 'open' | 'mitigated' | 'accepted' | 'transferred';

/** Risk Object — a discrete risk condition bound to cases and entities */
export interface RiskObject extends CommonFields {
  entityType: 'risk-object';
  /** Risk object type */
  type: RiskObjectType;
  /** ID of the affected entity (asset, identity, case, etc.) */
  affectedEntityId: string;
  /** Type of the affected entity */
  affectedEntityType: string;
  /** Justification for this risk object's creation */
  justification: string;
  /** Owner responsible for treatment */
  owner: string;
  /** Current treatment state */
  treatmentState: TreatmentState;
  /** Expiry or review trigger condition */
  expiryOrReviewTrigger: string;
}
