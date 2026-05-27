/**
 * Asset Entity — Commander SDR Canonical Model
 *
 * Source: Spec #05 §6.4.2 Asset, Spec #46 Canonical Terminology
 * v1.3 Requirement 3: Asset fixture completeness
 */

import type { CommonFields, SurfaceAttribution } from './common';

export interface Asset extends CommonFields {
  /** Canonical entity type discriminator */
  entityType: 'asset';
  /** Asset display name */
  name: string;
  /** Asset classification */
  classification: AssetClassification;
  /** Ownership */
  owner: string;
  /** Environment (production, staging, development, etc.) */
  environment: string;
  /** Source system references */
  sourceRefs: string[];
  /** Attack surface attribution (Spec #60) */
  surfaceAttribution: SurfaceAttribution;
  /** Coverage-relevant fields */
  coverage: {
    hasEdr: boolean;
    hasVulnScan: boolean;
    hasPatchManagement: boolean;
    hasBackup: boolean;
  };
  /** Business criticality (1-5) */
  criticality: number;
  /** Tags for grouping */
  tags: string[];
}

export type AssetClassification =
  | 'endpoint'
  | 'server'
  | 'cloud-instance'
  | 'container'
  | 'network-device'
  | 'application'
  | 'database'
  | 'iot-device'
  | 'mobile-device';
