/**
 * Connector Entity — Commander SDR Canonical Model
 *
 * Source: Spec #05 §6.4.4 Connector, Spec #61 Universal Security Signal Connector Contract
 * v1.3 Requirement 5: Connector fixture completeness
 * v1.3 Requirement 14: Signal connector class fixture (A/B/C/D only)
 */

import type { CommonFields, ConnectorClass } from './common';

export interface Connector extends CommonFields {
  entityType: 'connector';
  /** Connector display name */
  name: string;
  /** Connector class(es) per Spec #61 — A/B/C/D only */
  classes: ConnectorClass[];
  /** Source type (vendor platform name) */
  sourceType: string;
  /** Connector tier */
  tier: 'core' | 'extended' | 'community';
  /** Current state */
  state: ConnectorState;
  /** Last successful run */
  lastRunAt: string | null;
  /** Last run status */
  lastRunStatus: 'success' | 'partial' | 'failed' | 'never-run';
  /** Mapping pack version (v1.3 Req 9) */
  mappingPackVersion: string;
}

export type ConnectorState =
  | 'active'
  | 'paused'
  | 'error'
  | 'pending-approval'
  | 'decommissioned';
