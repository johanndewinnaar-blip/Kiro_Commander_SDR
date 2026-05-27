/**
 * Common Fields — Commander SDR Canonical Entities
 *
 * Every canonical entity includes these common fields.
 * Source: Spec #05 §6.4.1 Common Fields
 *
 * Rules:
 * - Every record is tenant-scoped (v1.3 Req 7)
 * - Deterministic IDs for repeatable fixtures (v1.3 Req 20)
 * - Timestamps for audit trail
 * - Source metadata for provenance (v1.3 Req 12)
 */

/** Tenant context — required on every record (v1.3 Req 7) */
export interface TenantContext {
  tenantId: string;
  tenantName: string;
}

/** Source metadata — provenance tracking (v1.3 Req 12) */
export interface SourceMetadata {
  /** Connector that produced this record */
  connectorId: string;
  /** Import run identifier */
  importRunId: string;
  /** Raw source payload reference (not the payload itself) */
  rawPayloadRef: string;
  /** Source system identifier */
  sourceSystem: string;
  /** Timestamp of source extraction */
  sourceTimestamp: string;
}

/** Common fields present on all canonical entities */
export interface CommonFields {
  /** Deterministic unique identifier */
  id: string;
  /** Tenant scope — required, never ambiguous */
  tenant: TenantContext;
  /** When this record was created in Commander */
  createdAt: string;
  /** When this record was last updated */
  updatedAt: string;
  /** Source provenance */
  source: SourceMetadata;
}

/** Connector class per Spec #61 */
export type ConnectorClass = 'A' | 'B' | 'C' | 'D';

/** Connector class labels */
export const CONNECTOR_CLASS_LABELS: Record<ConnectorClass, string> = {
  A: 'SOC Telemetry',
  B: 'Operational Verdict',
  C: 'Configuration State',
  D: 'Threat Intelligence',
};

/** Signal purposes per Spec #61 §Eight Signal Purposes */
export type SignalPurpose =
  | 'case-creation'
  | 'case-enrichment'
  | 'verdict-pattern'
  | 'drift-evaluation'
  | 'coverage-assessment'
  | 'threat-correlation'
  | 'identity-behaviour'
  | 'posture-measurement';

/** Verdict dispositions per Spec #62 */
export type VerdictDisposition =
  | 'BLOCK'
  | 'QUARANTINE'
  | 'COACH'
  | 'REQUIRE_MFA'
  | 'REQUIRE_COMPLIANT'
  | 'MONITOR'
  | 'ALLOW'
  | 'AUDIT';

/** Attack surface attribution per Spec #60 */
export type SurfaceAttribution = 'internal_attack_surface' | 'external_attack_surface';

/** Build status for registry-driven visibility */
export type BuildStatus = 'LIVE' | 'BUILD' | 'SCAFFOLD' | 'STUB' | 'PLANNED';
