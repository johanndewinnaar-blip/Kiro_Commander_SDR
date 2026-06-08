/**
 * Estate Node Entity — Commander SDR Canonical Model
 *
 * Source: docs/00_authority/ASSET_ARCHITECTURE_INTELLIGENCE.md (AAI-1.0) §4
 * Domain: D-48 Asset Architecture Intelligence
 * Build unit: Unit 52
 *
 * Represents a node in the customer's organisational/environmental hierarchy.
 * NOT Commander's multi-tenancy — this is a CUSTOMER'S OWN internal structure.
 */

import type { CommonFields } from './common';
import type { EstateNodeType, EstateNodeStatus } from './asset-architecture-enums';
import { ESTATE_NODE_TYPES, ESTATE_NODE_STATUSES } from './asset-architecture-enums';

export interface EstateNode extends CommonFields {
  entityType: 'estate-node';
  /** Unique node identifier */
  nodeId: string;
  /** Display name */
  name: string;
  /** Organisational structure type */
  nodeType: EstateNodeType;
  /** Parent node ID (creates hierarchy) */
  parentNodeId: string | null;
  /** Node status */
  status: EstateNodeStatus;
  /** Geography (nullable) */
  geography: string | null;
  /** Compliance scopes inherited downward */
  complianceScopes: string[];
  /** Owning team */
  ownerTeam: string;
  /** Tags for grouping */
  tags: string[];
}

export interface EstateNodeValidation {
  valid: boolean;
  errors: string[];
}

export function validateEstateNode(node: EstateNode): EstateNodeValidation {
  const errors: string[] = [];
  if (!node.id) errors.push('id is required');
  if (!node.nodeId) errors.push('nodeId is required');
  if (!node.name) errors.push('name is required');
  if (!node.nodeType) errors.push('nodeType is required');
  if (node.nodeType && !ESTATE_NODE_TYPES.includes(node.nodeType)) {
    errors.push(`nodeType '${node.nodeType}' is not valid`);
  }
  if (!node.status) errors.push('status is required');
  if (node.status && !ESTATE_NODE_STATUSES.includes(node.status)) {
    errors.push(`status '${node.status}' is not valid`);
  }
  if (!node.ownerTeam) errors.push('ownerTeam is required');
  if (!node.tenant) errors.push('tenant is required');
  if (!node.source) errors.push('source is required');
  if (!Array.isArray(node.complianceScopes)) errors.push('complianceScopes must be an array');
  if (!Array.isArray(node.tags)) errors.push('tags must be an array');
  return { valid: errors.length === 0, errors };
}
