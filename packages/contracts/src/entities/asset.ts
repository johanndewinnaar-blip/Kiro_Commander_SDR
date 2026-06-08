/**
 * Asset Entity — Commander SDR Canonical Model
 *
 * Source: Spec #05 §6.4.2 Asset, Spec #46 Canonical Terminology
 * v1.3 Requirement 3: Asset fixture completeness
 * COIM-F: COIM operational-intelligence augmentation (additive optional fields)
 * Source: COIM v1.0 §6.1; 05_ATTRIBUTE_AND_DATA_EFFICIENCY_MODEL §13
 */

import type { CommonFields, SurfaceAttribution } from './common';
import type { SourceClassification } from './coim';
import type { ArchitecturalTier, LifecycleModel, ServiceClassification } from './asset-architecture-enums';

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

  // ─── COIM-F: Operational Intelligence Augmentation (additive optional) ───
  // Source: COIM v1.0 §6.1; 05_ATTRIBUTE_AND_DATA_EFFICIENCY_MODEL §13.
  // These fields are recommended where sources provide them. Optional at type
  // level for full backward-compatibility with existing fixtures and tests.

  /** Asset lifecycle state (COIM-F). Commander-tracked. */
  lifecycleState?: AssetLifecycleState;

  /** Structured platform information (COIM-F). Source-provided. */
  platform?: AssetPlatform;

  /** Network position classification (COIM-F). Source-provided. */
  networkPosition?: AssetNetworkPosition;

  /**
   * Data classification for the asset (COIM-F).
   * Note: field name `assetDataClassification` to avoid collision with
   * the DB infrastructure `dataClassification` enum column.
   */
  assetDataClassification?: AssetDataClassification;

  /** When this asset was last confirmed active by a source (COIM-F timeline). */
  lastConfirmedAt?: string;

  /** Which connector/source first discovered this asset (COIM-F timeline). */
  firstDiscoveredBy?: string;

  /**
   * Optional source classification for discovery signals (COIM-F).
   * Recommended where source provides structured discovery metadata.
   * Immutable after write; informs but never governs lifecycle/priority.
   */
  sourceClassification?: SourceClassification;

  // ─── AAI-1.0: Asset Architecture Intelligence Extension (additive, nullable) ─
  /** Architectural tier — where this asset sits in the estate (AAI-1.0 §5) */
  architecturalTier?: ArchitecturalTier;
  /** Lifecycle model — how long this asset exists (AAI-1.0 §5) */
  assetLifecycleModel?: LifecycleModel;
  /** Service classification for managed-service type only (AAI-1.0 §5) */
  serviceClassification?: ServiceClassification;
  /** Estate node ID — which organisational unit this belongs to (AAI-1.0 §4) */
  estateNodeId?: string;
}

// ─── COIM-F: Asset Lifecycle State ──────────────────────────────────────────

/**
 * Asset lifecycle state — Commander-tracked.
 * COIM-F operational-intelligence field.
 */
export type AssetLifecycleState =
  | 'active'
  | 'decommissioned'
  | 'maintenance'
  | 'unknown';

export const ASSET_LIFECYCLE_STATES: AssetLifecycleState[] = [
  'active',
  'decommissioned',
  'maintenance',
  'unknown',
];

// ─── COIM-F: Asset Platform ──────────────────────────────────────────────────

/**
 * Structured platform information — source-provided.
 * COIM-F operational-intelligence field. OCSF influence: device.json.
 */
export interface AssetPlatform {
  /** Operating system or platform name (e.g. "Windows Server 2022", "Ubuntu 22.04") */
  os?: string;
  /** Platform version */
  version?: string;
  /** Cloud provider if applicable (e.g. "aws", "azure", "gcp") */
  cloudProvider?: string;
  /** Architecture (e.g. "x86_64", "arm64") */
  architecture?: string;
}

// ─── COIM-F: Asset Network Position ─────────────────────────────────────────

/**
 * Network position classification.
 * COIM-F operational-intelligence field.
 */
export type AssetNetworkPosition =
  | 'internet-facing'
  | 'dmz'
  | 'internal'
  | 'isolated'
  | 'unknown';

export const ASSET_NETWORK_POSITIONS: AssetNetworkPosition[] = [
  'internet-facing',
  'dmz',
  'internal',
  'isolated',
  'unknown',
];

// ─── COIM-F: Asset Data Classification ───────────────────────────────────────

/**
 * Data classification for data held by or processed by this asset.
 * Distinct from the DB infrastructure data_classification column.
 * COIM-F operational-intelligence field.
 */
export type AssetDataClassification =
  | 'public'
  | 'internal'
  | 'confidential'
  | 'restricted';

export const ASSET_DATA_CLASSIFICATIONS: AssetDataClassification[] = [
  'public',
  'internal',
  'confidential',
  'restricted',
];

// ─── Existing type (unchanged) ───────────────────────────────────────────────

/**
 * Asset classification — expanded from 9 to 52 values per AAI-1.0 §5.
 * All original 9 values remain valid (backward-compatible).
 * Full expanded type available via AssetClassificationExpanded in asset-architecture-enums.ts.
 */
export type AssetClassification =
  | 'endpoint'
  | 'server'
  | 'cloud-instance'
  | 'container'
  | 'network-device'
  | 'application'
  | 'database'
  | 'iot-device'
  | 'mobile-device'
  // AAI-1.0 expansion (43 additional types)
  | 'web-domain'
  | 'api-endpoint'
  | 'load-balancer'
  | 'cdn-edge'
  | 'vpn-gateway'
  | 'dns-zone'
  | 'tls-certificate'
  | 'cloud-account'
  | 'managed-service'
  | 'cloud-storage'
  | 'cloud-network'
  | 'serverless-function'
  | 'container-image'
  | 'kubernetes-cluster'
  | 'kubernetes-namespace'
  | 'microservice'
  | 'message-queue'
  | 'data-pipeline'
  | 'data-warehouse'
  | 'backup-system'
  | 'identity-provider'
  | 'directory-service'
  | 'federation-trust'
  | 'pam-vault'
  | 'certificate-authority'
  | 'sso-integration'
  | 'mfa-deployment'
  | 'kms-hsm'
  | 'network-segment'
  | 'code-repository'
  | 'ci-cd-pipeline'
  | 'artifact-repository'
  | 'container-registry'
  | 'iac-template'
  | 'package-dependency'
  | 'ot-device'
  | 'ot-network'
  | 'building'
  | 'data-centre'
  | 'server-room'
  | 'physical-access-system'
  | 'saas-platform'
  | 'third-party-integration'
  | 'partner-connection'
  | 'security-tool'
  | 'storage-appliance';
