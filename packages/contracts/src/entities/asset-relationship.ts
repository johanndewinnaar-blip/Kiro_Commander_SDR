/**
 * Asset Relationship Entity — Commander SDR Canonical Model
 *
 * Source: AAI-1.0 §6 Relationships
 * Models typed relationships between assets (dependencies, containment,
 * deployment, communication paths) with confidence and discovery provenance.
 *
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7
 */

import type { CommonFields } from './common';

/**
 * The 6 bounded relationship type values per AAI-1.0 §6.
 * Uses `as const` array pattern with derived type.
 */
export const RELATIONSHIP_TYPES = [
  'owned_by',
  'contains',
  'deployed_by',
  'communicates_with',
  'depends_on',
  'managed_by',
] as const;

/** Derived relationship type from the bounded const array */
export type RelationshipType = (typeof RELATIONSHIP_TYPES)[number];

/**
 * Discovery method values indicating how a relationship was established.
 */
export const DISCOVERY_METHODS = ['connector', 'manual', 'inference'] as const;

/** Derived discovery method type */
export type DiscoveryMethod = (typeof DISCOVERY_METHODS)[number];

/**
 * Relationship lifecycle status values.
 * Supports staleness lifecycle: active → stale → broken.
 */
export const RELATIONSHIP_STATUSES = ['active', 'stale', 'broken'] as const;

/** Derived relationship status type */
export type RelationshipStatus = (typeof RELATIONSHIP_STATUSES)[number];

/**
 * AssetRelationship — typed connection between two entities.
 *
 * Tracks confidence, discovery provenance, and staleness lifecycle.
 * Extends CommonFields for tenant scoping, audit trail, and provenance.
 */
export interface AssetRelationship extends CommonFields {
  /** Entity type discriminator */
  entityType: 'asset_relationship';
  /** Source entity identifier */
  sourceEntityId: string;
  /** Source entity type (e.g. 'asset', 'estate_node') */
  sourceEntityType: string;
  /** Target entity identifier */
  targetEntityId: string;
  /** Target entity type (e.g. 'asset', 'estate_node') */
  targetEntityType: string;
  /** Type of relationship between source and target */
  relationshipType: RelationshipType;
  /** Confidence score 0-100 indicating reliability of the relationship */
  confidence: number;
  /** How the relationship was discovered */
  discoveredBy: DiscoveryMethod;
  /** Lifecycle status of the relationship */
  status: RelationshipStatus;
}

/**
 * Validates an AssetRelationship instance.
 *
 * Checks all required fields, confidence bounds, and enum membership.
 * Returns `{ valid: true, errors: [] }` for valid entities, or
 * `{ valid: false, errors: [...] }` with specific field-level messages.
 */
export function validateAssetRelationship(rel: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (rel === null || rel === undefined || typeof rel !== 'object') {
    return { valid: false, errors: ['Input must be a non-null object'] };
  }

  const r = rel as Record<string, unknown>;

  // CommonFields: id
  if (typeof r.id !== 'string' || r.id.trim() === '') {
    errors.push('id must be a non-empty string');
  }

  // CommonFields: tenant.tenantId
  if (r.tenant === null || r.tenant === undefined || typeof r.tenant !== 'object') {
    errors.push('tenant must be a non-null object');
  } else {
    const tenant = r.tenant as Record<string, unknown>;
    if (typeof tenant.tenantId !== 'string' || tenant.tenantId.trim() === '') {
      errors.push('tenant.tenantId must be a non-empty string');
    }
  }

  // sourceEntityId
  if (typeof r.sourceEntityId !== 'string' || r.sourceEntityId.trim() === '') {
    errors.push('sourceEntityId must be a non-empty string');
  }

  // sourceEntityType
  if (typeof r.sourceEntityType !== 'string' || r.sourceEntityType.trim() === '') {
    errors.push('sourceEntityType must be a non-empty string');
  }

  // targetEntityId
  if (typeof r.targetEntityId !== 'string' || r.targetEntityId.trim() === '') {
    errors.push('targetEntityId must be a non-empty string');
  }

  // targetEntityType
  if (typeof r.targetEntityType !== 'string' || r.targetEntityType.trim() === '') {
    errors.push('targetEntityType must be a non-empty string');
  }

  // relationshipType
  if (
    typeof r.relationshipType !== 'string' ||
    !(RELATIONSHIP_TYPES as readonly string[]).includes(r.relationshipType)
  ) {
    errors.push(
      `relationshipType must be one of: ${RELATIONSHIP_TYPES.join(', ')} (received type: ${typeof r.relationshipType})`,
    );
  }

  // confidence: number between 0 and 100
  if (typeof r.confidence !== 'number' || !Number.isFinite(r.confidence)) {
    errors.push('confidence must be a finite number');
  } else if (r.confidence < 0 || r.confidence > 100) {
    errors.push('confidence must be between 0 and 100 inclusive');
  }

  // discoveredBy
  if (
    typeof r.discoveredBy !== 'string' ||
    !(DISCOVERY_METHODS as readonly string[]).includes(r.discoveredBy)
  ) {
    errors.push(
      `discoveredBy must be one of: ${DISCOVERY_METHODS.join(', ')} (received type: ${typeof r.discoveredBy})`,
    );
  }

  // status
  if (
    typeof r.status !== 'string' ||
    !(RELATIONSHIP_STATUSES as readonly string[]).includes(r.status)
  ) {
    errors.push(
      `status must be one of: ${RELATIONSHIP_STATUSES.join(', ')} (received type: ${typeof r.status})`,
    );
  }

  return { valid: errors.length === 0, errors };
}
