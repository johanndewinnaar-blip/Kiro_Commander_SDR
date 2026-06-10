/**
 * Compliance Scope Binding Entity — Commander SDR Canonical Model
 *
 * Source: AAI-1.0 §6 ComplianceScopeBinding
 * Binds a compliance framework scope to a specific entity (asset or estate node),
 * supporting inheritance from estate nodes.
 *
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5
 */

import type { CommonFields } from './common';

/**
 * The bounded set of compliance scope binding statuses per AAI-1.0 §6.
 * Uses `as const` array pattern with derived type.
 */
export const COMPLIANCE_SCOPE_STATUSES = [
  'active',
  'expired',
  'under_review',
] as const;

/** Derived compliance scope status type from the bounded const array */
export type ComplianceScopeStatus = (typeof COMPLIANCE_SCOPE_STATUSES)[number];

/**
 * Compliance Scope Binding — binds a compliance framework scope to an entity.
 *
 * Supports scope inheritance from estate nodes via inheritedFrom field
 * (null for direct assignment, estate node ID for inherited).
 */
export interface ComplianceScopeBinding extends CommonFields {
  /** Entity type discriminator */
  entityType: 'compliance_scope_binding';
  /** ID of the entity this scope is bound to */
  entityId: string;
  /** Type of the target entity (e.g. 'asset', 'estate_node') */
  entityType_target: string;
  /** Name of the compliance scope */
  scopeName: string;
  /** Reference to the compliance framework (e.g. 'PCI-DSS', 'SOC2') */
  frameworkRef: string;
  /** Estate node ID if inherited, null for direct assignment */
  inheritedFrom: string | null;
  /** When this binding was created (ISO 8601) */
  boundAt: string;
  /** Current lifecycle status */
  status: ComplianceScopeStatus;
}

/** Validation result for ComplianceScopeBinding entities */
export interface ComplianceScopeBindingValidation {
  valid: boolean;
  errors: string[];
}

/**
 * Validates an unknown input against the ComplianceScopeBinding schema.
 *
 * Checks:
 * - id is non-empty string
 * - tenant.tenantId is non-empty string
 * - entityId is non-empty string
 * - entityType_target is non-empty string
 * - scopeName is non-empty string
 * - frameworkRef is non-empty string
 * - boundAt is non-empty string
 * - status is one of COMPLIANCE_SCOPE_STATUSES
 */
export function validateComplianceScopeBinding(
  binding: unknown,
): ComplianceScopeBindingValidation {
  const errors: string[] = [];

  if (binding === null || binding === undefined || typeof binding !== 'object') {
    return { valid: false, errors: ['binding must be a non-null object'] };
  }

  const b = binding as Record<string, unknown>;

  // Check id
  if (typeof b.id !== 'string' || b.id.trim() === '') {
    errors.push('id must be a non-empty string');
  }

  // Check tenant.tenantId
  if (
    b.tenant === null ||
    b.tenant === undefined ||
    typeof b.tenant !== 'object'
  ) {
    errors.push('tenant must be a non-null object');
  } else {
    const tenant = b.tenant as Record<string, unknown>;
    if (typeof tenant.tenantId !== 'string' || tenant.tenantId.trim() === '') {
      errors.push('tenant.tenantId must be a non-empty string');
    }
  }

  // Check entityId
  if (typeof b.entityId !== 'string' || b.entityId.trim() === '') {
    errors.push('entityId must be a non-empty string');
  }

  // Check entityType_target
  if (typeof b.entityType_target !== 'string' || b.entityType_target.trim() === '') {
    errors.push('entityType_target must be a non-empty string');
  }

  // Check scopeName
  if (typeof b.scopeName !== 'string' || b.scopeName.trim() === '') {
    errors.push('scopeName must be a non-empty string');
  }

  // Check frameworkRef
  if (typeof b.frameworkRef !== 'string' || b.frameworkRef.trim() === '') {
    errors.push('frameworkRef must be a non-empty string');
  }

  // Check boundAt
  if (typeof b.boundAt !== 'string' || b.boundAt.trim() === '') {
    errors.push('boundAt must be a non-empty string');
  }

  // Check status
  if (
    typeof b.status !== 'string' ||
    !(COMPLIANCE_SCOPE_STATUSES as readonly string[]).includes(b.status)
  ) {
    errors.push(
      `status must be one of: ${COMPLIANCE_SCOPE_STATUSES.join(', ')} (received type: ${typeof b.status})`,
    );
  }

  return { valid: errors.length === 0, errors };
}
