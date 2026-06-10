/**
 * Architectural Tier Classification — Commander SDR Canonical Model
 *
 * Source: AAI-1.0 §5 Architectural Tier Enumeration
 * Defines the 12 bounded architectural tier values that classify where an
 * asset sits within an estate's architecture.
 *
 * Requirements: 1.1, 1.2, 1.3, 1.4
 */

import type { AssetClassification } from './asset';

/**
 * The 12 architectural tier values per AAI-1.0 §5.
 * Uses `as const` array pattern with derived type.
 */
export const ARCHITECTURAL_TIERS = [
  'perimeter',
  'cloud_control',
  'cloud_infrastructure',
  'compute',
  'application',
  'data',
  'identity',
  'network',
  'build_deploy',
  'iot_ot',
  'physical',
  'third_party',
] as const;

/** Derived architectural tier type from the bounded const array */
export type ArchitecturalTier = (typeof ARCHITECTURAL_TIERS)[number];

/** Human-readable labels for each architectural tier */
export const ARCHITECTURAL_TIER_LABELS: Record<ArchitecturalTier, string> = {
  perimeter: 'Perimeter',
  cloud_control: 'Cloud Control Plane',
  cloud_infrastructure: 'Cloud Infrastructure',
  compute: 'Compute',
  application: 'Application',
  data: 'Data',
  identity: 'Identity',
  network: 'Network',
  build_deploy: 'Build & Deploy',
  iot_ot: 'IoT / OT',
  physical: 'Physical',
  third_party: 'Third Party',
};

/**
 * Default tier inference from AssetClassification.
 * Maps each existing classification value to its default architectural tier.
 */
export const CLASSIFICATION_TO_TIER: Record<AssetClassification, ArchitecturalTier> = {
  endpoint: 'compute',
  server: 'compute',
  'cloud-instance': 'cloud_infrastructure',
  container: 'compute',
  'network-device': 'network',
  application: 'application',
  database: 'data',
  'iot-device': 'iot_ot',
  'mobile-device': 'compute',
};
