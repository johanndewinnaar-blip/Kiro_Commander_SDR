/**
 * Asset Relationship Entity — Commander SDR Canonical Model
 *
 * Source: docs/00_authority/ASSET_ARCHITECTURE_INTELLIGENCE.md (AAI-1.0) §6
 * Domain: D-48 Asset Architecture Intelligence
 * Build unit: Unit 52
 *
 * Typed bindings between assets: dependencies, coverage, compliance scope,
 * ownership, supply chain, network topology, third-party access.
 */

import type { CommonFields } from './common';
import type { RelationshipType, RelationshipStatus, ConfirmedBy } from './asset-architecture-enums';
import { RELATIONSHIP_TYPES, RELATIONSHIP_STATUSES, CONFIRMED_BY_OPTIONS } from './asset-architecture-enums';

export interface AssetRelationship extends CommonFields {
  entityType: 'asset-relationship';
  /** Source asset ID */
  sourceAssetId: string;
  /** Target asset ID */
  targetAssetId: string;
  /** Relationship type from bounded enum */
  relationshipType: RelationshipType;
  /** Type-specific metadata (port, protocol, access level, etc.) */
  metadata: Record<string, unknown>;
  /** When this relationship was last confirmed */
  confirmedAt: string;
  /** How this relationship was confirmed */
  confirmedBy: ConfirmedBy;
  /** Relationship status */
  status: RelationshipStatus;
}

export interface AssetRelationshipValidation {
  valid: boolean;
  errors: string[];
}

export function validateAssetRelationship(rel: AssetRelationship): AssetRelationshipValidation {
  const errors: string[] = [];
  if (!rel.id) errors.push('id is required');
  if (!rel.sourceAssetId) errors.push('sourceAssetId is required');
  if (!rel.targetAssetId) errors.push('targetAssetId is required');
  if (!rel.relationshipType) errors.push('relationshipType is required');
  if (rel.relationshipType && !RELATIONSHIP_TYPES.includes(rel.relationshipType)) {
    errors.push(`relationshipType '${rel.relationshipType}' is not valid`);
  }
  if (!rel.confirmedAt) errors.push('confirmedAt is required');
  if (!rel.confirmedBy) errors.push('confirmedBy is required');
  if (rel.confirmedBy && !CONFIRMED_BY_OPTIONS.includes(rel.confirmedBy)) {
    errors.push(`confirmedBy '${rel.confirmedBy}' is not valid`);
  }
  if (!rel.status) errors.push('status is required');
  if (rel.status && !RELATIONSHIP_STATUSES.includes(rel.status)) {
    errors.push(`status '${rel.status}' is not valid`);
  }
  if (!rel.tenant) errors.push('tenant is required');
  if (!rel.source) errors.push('source is required');
  if (rel.sourceAssetId === rel.targetAssetId) errors.push('sourceAssetId and targetAssetId must differ');
  return { valid: errors.length === 0, errors };
}
