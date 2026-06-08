/**
 * Asset Architecture Intelligence Enumerations — Commander SDR
 *
 * Source: docs/00_authority/ASSET_ARCHITECTURE_INTELLIGENCE.md (AAI-1.0) §4–§6
 * Domain: D-48 Asset Architecture Intelligence
 * Build unit: Unit 52
 */

// ─── Architectural Tier (AAI-1.0 §5) ────────────────────────────────────────

/** 12 architectural tiers — where an asset SITS in the estate */
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
export type ArchitecturalTier = typeof ARCHITECTURAL_TIERS[number];

export const ARCHITECTURAL_TIER_LABELS: Record<ArchitecturalTier, string> = {
  perimeter: 'Perimeter / External Surface',
  cloud_control: 'Cloud Control',
  cloud_infrastructure: 'Cloud Infrastructure',
  compute: 'Compute / Hosting',
  application: 'Application / Service',
  data: 'Data',
  identity: 'Identity Infrastructure',
  network: 'Network Architecture',
  build_deploy: 'Build / Deploy (Supply Chain)',
  iot_ot: 'IoT / OT',
  physical: 'Physical / Facilities',
  third_party: 'Third Party / External',
};

// ─── Lifecycle Model (AAI-1.0 §5) ───────────────────────────────────────────

/** 3 lifecycle models — how long an asset exists */
export const LIFECYCLE_MODELS = [
  'persistent',
  'ephemeral_defined',
  'ephemeral_discovered',
] as const;
export type LifecycleModel = typeof LIFECYCLE_MODELS[number];

export const LIFECYCLE_MODEL_LABELS: Record<LifecycleModel, string> = {
  persistent: 'Persistent (exists continuously)',
  ephemeral_defined: 'Ephemeral Defined (definition creates instances)',
  ephemeral_discovered: 'Ephemeral Discovered (connector-discovered, threshold-assessed)',
};

// ─── Service Classification (AAI-1.0 §5) ────────────────────────────────────

/** 14 managed service sub-classifications */
export const SERVICE_CLASSIFICATIONS = [
  'iam',
  'networking',
  'secrets_management',
  'encryption',
  'logging_monitoring',
  'dns',
  'certificate_management',
  'container_orchestration',
  'serverless_platform',
  'storage_service',
  'database_service',
  'messaging_service',
  'analytics_service',
  'security_service',
] as const;
export type ServiceClassification = typeof SERVICE_CLASSIFICATIONS[number];

// ─── Relationship Type (AAI-1.0 §6) ─────────────────────────────────────────

/** 12 typed relationship bindings between assets */
export const RELATIONSHIP_TYPES = [
  'depends_on',
  'hosts',
  'routes_through',
  'authenticates_via',
  'stores_data_for',
  'deployed_by',
  'covered_by',
  'in_scope_for',
  'owned_by',
  'accessed_by_vendor',
  'secures',
  'contains',
] as const;
export type RelationshipType = typeof RELATIONSHIP_TYPES[number];

// ─── Estate Node Type (AAI-1.0 §4) ──────────────────────────────────────────

/** 6 estate node types — organisational structure */
export const ESTATE_NODE_TYPES = [
  'enterprise',
  'business_unit',
  'environment',
  'region',
  'acquisition',
  'shared_service',
] as const;
export type EstateNodeType = typeof ESTATE_NODE_TYPES[number];

// ─── Estate Node Status (AAI-1.0 §4) ────────────────────────────────────────

/** 4 estate node statuses */
export const ESTATE_NODE_STATUSES = [
  'active',
  'integrating',
  'decommissioning',
  'isolated',
] as const;
export type EstateNodeStatus = typeof ESTATE_NODE_STATUSES[number];

// ─── Coverage Binding Status (AAI-1.0 §6) ───────────────────────────────────

/** Coverage binding status */
export const COVERAGE_STATUSES = [
  'covered',
  'gap',
  'stale',
] as const;
export type CoverageStatus = typeof COVERAGE_STATUSES[number];

// ─── Compliance Scope Status (AAI-1.0 §6) ───────────────────────────────────

/** Compliance scope binding status */
export const SCOPE_STATUSES = [
  'in_scope',
  'out_of_scope',
  'conditional',
] as const;
export type ScopeStatus = typeof SCOPE_STATUSES[number];

// ─── Relationship Status (AAI-1.0 §6) ───────────────────────────────────────

/** Relationship confirmation status */
export const RELATIONSHIP_STATUSES = [
  'active',
  'stale',
  'broken',
] as const;
export type RelationshipStatus = typeof RELATIONSHIP_STATUSES[number];

// ─── Confirmed By (AAI-1.0 §6) ──────────────────────────────────────────────

/** How a relationship was confirmed */
export const CONFIRMED_BY_OPTIONS = [
  'connector',
  'manual',
  'inference',
] as const;
export type ConfirmedBy = typeof CONFIRMED_BY_OPTIONS[number];

// ─── Expanded Asset Classification (~52 values, AAI-1.0 §5) ─────────────────

/** Expanded asset classification taxonomy — 52 asset types by tier */
export const ASSET_CLASSIFICATIONS_EXPANDED = [
  // Existing 9 (backward-compatible)
  'endpoint',
  'server',
  'cloud-instance',
  'container',
  'network-device',
  'application',
  'database',
  'iot-device',
  'mobile-device',
  // Perimeter / External Surface
  'web-domain',
  'api-endpoint',
  'load-balancer',
  'cdn-edge',
  'vpn-gateway',
  'dns-zone',
  'tls-certificate',
  // Cloud Control
  'cloud-account',
  'managed-service',
  // Cloud Infrastructure
  'cloud-storage',
  'cloud-network',
  'serverless-function',
  // Compute / Hosting
  'container-image',
  'kubernetes-cluster',
  'kubernetes-namespace',
  // Application / Service
  'microservice',
  'message-queue',
  'data-pipeline',
  // Data
  'data-warehouse',
  'backup-system',
  // Identity Infrastructure
  'identity-provider',
  'directory-service',
  'federation-trust',
  'pam-vault',
  'certificate-authority',
  'sso-integration',
  'mfa-deployment',
  'kms-hsm',
  // Network Architecture
  'network-segment',
  // Build / Deploy (Supply Chain)
  'code-repository',
  'ci-cd-pipeline',
  'artifact-repository',
  'container-registry',
  'iac-template',
  'package-dependency',
  // IoT / OT
  'ot-device',
  'ot-network',
  // Physical / Facilities
  'building',
  'data-centre',
  'server-room',
  'physical-access-system',
  // Third Party / External
  'saas-platform',
  'third-party-integration',
  'partner-connection',
  // Security Infrastructure
  'security-tool',
  'storage-appliance',
] as const;
export type AssetClassificationExpanded = typeof ASSET_CLASSIFICATIONS_EXPANDED[number];

/** Total classification count (ARCH-AAI-002: bounded at 60 max) */
export const ASSET_CLASSIFICATION_COUNT = ASSET_CLASSIFICATIONS_EXPANDED.length;

/**
 * Default tier inference from asset type.
 * Used when architecturalTier is not explicitly set.
 */
export const ASSET_TYPE_TO_TIER: Record<AssetClassificationExpanded, ArchitecturalTier> = {
  // Existing 9
  'endpoint': 'compute',
  'server': 'compute',
  'cloud-instance': 'cloud_infrastructure',
  'container': 'compute',
  'network-device': 'network',
  'application': 'application',
  'database': 'data',
  'iot-device': 'iot_ot',
  'mobile-device': 'compute',
  // Perimeter
  'web-domain': 'perimeter',
  'api-endpoint': 'perimeter',
  'load-balancer': 'perimeter',
  'cdn-edge': 'perimeter',
  'vpn-gateway': 'perimeter',
  'dns-zone': 'perimeter',
  'tls-certificate': 'perimeter',
  // Cloud Control
  'cloud-account': 'cloud_control',
  'managed-service': 'cloud_control',
  // Cloud Infrastructure
  'cloud-storage': 'cloud_infrastructure',
  'cloud-network': 'cloud_infrastructure',
  'serverless-function': 'cloud_infrastructure',
  // Compute
  'container-image': 'compute',
  'kubernetes-cluster': 'compute',
  'kubernetes-namespace': 'compute',
  // Application
  'microservice': 'application',
  'message-queue': 'application',
  'data-pipeline': 'application',
  // Data
  'data-warehouse': 'data',
  'backup-system': 'data',
  // Identity
  'identity-provider': 'identity',
  'directory-service': 'identity',
  'federation-trust': 'identity',
  'pam-vault': 'identity',
  'certificate-authority': 'identity',
  'sso-integration': 'identity',
  'mfa-deployment': 'identity',
  'kms-hsm': 'identity',
  // Network
  'network-segment': 'network',
  // Build / Deploy
  'code-repository': 'build_deploy',
  'ci-cd-pipeline': 'build_deploy',
  'artifact-repository': 'build_deploy',
  'container-registry': 'build_deploy',
  'iac-template': 'build_deploy',
  'package-dependency': 'build_deploy',
  // IoT / OT
  'ot-device': 'iot_ot',
  'ot-network': 'iot_ot',
  // Physical
  'building': 'physical',
  'data-centre': 'physical',
  'server-room': 'physical',
  'physical-access-system': 'physical',
  // Third Party
  'saas-platform': 'third_party',
  'third-party-integration': 'third_party',
  'partner-connection': 'third_party',
  // Security Infrastructure
  'security-tool': 'network',
  'storage-appliance': 'data',
};

/**
 * Default lifecycle model inference from asset type.
 */
export const ASSET_TYPE_TO_LIFECYCLE: Partial<Record<AssetClassificationExpanded, LifecycleModel>> = {
  'serverless-function': 'ephemeral_defined',
  'container': 'ephemeral_defined',
  'container-image': 'ephemeral_defined',
  'kubernetes-namespace': 'ephemeral_defined',
  'iac-template': 'ephemeral_defined',
};
