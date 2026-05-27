/**
 * Identity Entity — Commander SDR Canonical Model
 *
 * Source: Spec #05 §6.4.3 Identity, Spec #18 Unified Identity Architecture
 * v1.3 Requirement 4: Identity fixture completeness
 */

import type { CommonFields, SurfaceAttribution } from './common';

export interface Identity extends CommonFields {
  entityType: 'identity';
  /** Display name */
  displayName: string;
  /** Identity classification per Spec #18 */
  classification: IdentityClassification;
  /** Source system lineage */
  sourceSystemLineage: string[];
  /** Email (synthetic — never real) */
  email: string;
  /** Department or team */
  department: string;
  /** Role title */
  role: string;
  /** Risk score (0-100) */
  riskScore: number;
  /** Surface attribution */
  surfaceAttribution: SurfaceAttribution;
  /** Associated asset IDs */
  associatedAssets: string[];
  /** Account status */
  status: 'active' | 'suspended' | 'disabled' | 'orphaned';
}

export type IdentityClassification =
  | 'human'
  | 'service-account'
  | 'workload-identity'
  | 'third-party';
