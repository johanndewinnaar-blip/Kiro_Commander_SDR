/**
 * Estate Node Entity — Commander SDR Canonical Model
 *
 * Source: AAI-1.0 §4 Estate Topology
 * Models the customer's organisational hierarchy (business units, environments,
 * regions) for scoping assets, compliance, and risk.
 *
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6
 */

import type { CommonFields } from './common';
import type { ArchitecturalTier } from './architectural-tier';

/**
 * The bounded set of estate node statuses per AAI-1.0 §4.
 * Uses `as const` array pattern with derived type.
 */
export const ESTATE_NODE_STATUSES = [
  'active',
  'integrating',
  'decommissioning',
  'isolated',
] as const;

/** Derived estate node status type from the bounded const array */
export type EstateNodeStatus = (typeof ESTATE_NODE_STATUSES)[number];

/**
 * Estate Node — models a node in the customer's organisational hierarchy.
 *
 * Supports hierarchical structure via parentNodeRef (null for root nodes)
 * and carries compliance scopes for inheritance modelling.
 */
export interface EstateNode extends CommonFields {
  /** Entity type discriminator */
  entityType: 'estate_node';
  /** Unique node identifier */
  nodeId: string;
  /** Human-readable node name */
  name: string;
  /** Parent node reference — null for root nodes */
  parentNodeRef: string | null;
  /** Architectural tier classification (optional) */
  tier: ArchitecturalTier | null;
  /** Compliance scopes inherited downward through the hierarchy */
  complianceScopes: string[];
  /** Node owner (team or individual) */
  owner: string;
  /** Current lifecycle status */
  status: EstateNodeStatus;
}

/** Validation result for EstateNode entities */
export interface EstateNodeValidation {
  valid: boolean;
  errors: string[];
}

/**
 * Validates an unknown input against the EstateNode schema.
 *
 * Checks:
 * - id is non-empty string
 * - tenant.tenantId is non-empty string
 * - nodeId is non-empty string
 * - name is non-empty string
 * - owner is non-empty string
 * - status is one of ESTATE_NODE_STATUSES
 * - complianceScopes is an array
 */
export function validateEstateNode(node: unknown): EstateNodeValidation {
  const errors: string[] = [];

  if (node === null || node === undefined || typeof node !== 'object') {
    return { valid: false, errors: ['node must be a non-null object'] };
  }

  const n = node as Record<string, unknown>;

  // Check id
  if (typeof n.id !== 'string' || n.id.trim() === '') {
    errors.push('id must be a non-empty string');
  }

  // Check tenant.tenantId
  if (
    n.tenant === null ||
    n.tenant === undefined ||
    typeof n.tenant !== 'object'
  ) {
    errors.push('tenant must be a non-null object');
  } else {
    const tenant = n.tenant as Record<string, unknown>;
    if (typeof tenant.tenantId !== 'string' || tenant.tenantId.trim() === '') {
      errors.push('tenant.tenantId must be a non-empty string');
    }
  }

  // Check nodeId
  if (typeof n.nodeId !== 'string' || n.nodeId.trim() === '') {
    errors.push('nodeId must be a non-empty string');
  }

  // Check name
  if (typeof n.name !== 'string' || n.name.trim() === '') {
    errors.push('name must be a non-empty string');
  }

  // Check owner
  if (typeof n.owner !== 'string' || n.owner.trim() === '') {
    errors.push('owner must be a non-empty string');
  }

  // Check status
  if (
    typeof n.status !== 'string' ||
    !(ESTATE_NODE_STATUSES as readonly string[]).includes(n.status)
  ) {
    errors.push(
      `status must be one of: ${ESTATE_NODE_STATUSES.join(', ')} (received type: ${typeof n.status})`,
    );
  }

  // Check complianceScopes
  if (!Array.isArray(n.complianceScopes)) {
    errors.push('complianceScopes must be an array');
  }

  return { valid: errors.length === 0, errors };
}
