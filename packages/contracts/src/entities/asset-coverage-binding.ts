/**
 * Asset Coverage Binding Entity — Commander SDR Canonical Model
 *
 * Source: AAI-1.0 §6 AssetCoverageBinding
 * Explicitly binds a security tool/connector to an asset, recording what
 * coverage type it provides and when it was last verified.
 *
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6
 */

import type { CommonFields } from './common';

/**
 * The bounded set of coverage types per AAI-1.0 §6.
 * Uses `as const` array pattern with derived type.
 */
export const COVERAGE_TYPES = [
  'edr',
  'vuln_scan',
  'cspm',
  'sast',
  'dast',
  'siem',
  'dlp',
  'backup',
  'patch_management',
] as const;

/** Derived coverage type from the bounded const array */
export type CoverageType = (typeof COVERAGE_TYPES)[number];

/**
 * The bounded set of coverage binding statuses per AAI-1.0 §6.
 * Uses `as const` array pattern with derived type.
 */
export const COVERAGE_BINDING_STATUSES = [
  'covered',
  'gap',
  'stale',
] as const;

/** Derived coverage binding status type from the bounded const array */
export type CoverageBindingStatus = (typeof COVERAGE_BINDING_STATUSES)[number];

/**
 * Asset Coverage Binding — models a security tool coverage binding for an asset.
 *
 * Tracks explicit tool-to-asset coverage bindings, supports coverage gap
 * detection, and tracks verification freshness.
 */
export interface AssetCoverageBinding extends CommonFields {
  /** Entity type discriminator */
  entityType: 'asset_coverage_binding';
  /** The asset this binding covers */
  assetId: string;
  /** Type of security coverage provided */
  coverageType: CoverageType;
  /** Connector providing this coverage */
  connectorId: string;
  /** When this binding was established (ISO 8601) */
  boundAt: string;
  /** Current binding status */
  status: CoverageBindingStatus;
  /** When coverage was last verified (ISO 8601) */
  lastVerifiedAt: string;
}

/** Validation result for AssetCoverageBinding entities */
export interface AssetCoverageBindingValidation {
  valid: boolean;
  errors: string[];
}

/**
 * Validates an unknown input against the AssetCoverageBinding schema.
 *
 * Checks:
 * - id is non-empty string
 * - tenant.tenantId is non-empty string
 * - assetId is non-empty string
 * - connectorId is non-empty string
 * - coverageType is one of COVERAGE_TYPES
 * - status is one of COVERAGE_BINDING_STATUSES
 * - boundAt is non-empty string
 * - lastVerifiedAt is non-empty string
 */
export function validateAssetCoverageBinding(
  binding: unknown,
): AssetCoverageBindingValidation {
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

  // Check assetId
  if (typeof b.assetId !== 'string' || b.assetId.trim() === '') {
    errors.push('assetId must be a non-empty string');
  }

  // Check connectorId
  if (typeof b.connectorId !== 'string' || b.connectorId.trim() === '') {
    errors.push('connectorId must be a non-empty string');
  }

  // Check coverageType
  if (
    typeof b.coverageType !== 'string' ||
    !(COVERAGE_TYPES as readonly string[]).includes(b.coverageType)
  ) {
    errors.push(
      `coverageType must be one of: ${COVERAGE_TYPES.join(', ')} (received type: ${typeof b.coverageType})`,
    );
  }

  // Check status
  if (
    typeof b.status !== 'string' ||
    !(COVERAGE_BINDING_STATUSES as readonly string[]).includes(b.status)
  ) {
    errors.push(
      `status must be one of: ${COVERAGE_BINDING_STATUSES.join(', ')} (received type: ${typeof b.status})`,
    );
  }

  // Check boundAt
  if (typeof b.boundAt !== 'string' || b.boundAt.trim() === '') {
    errors.push('boundAt must be a non-empty string');
  }

  // Check lastVerifiedAt
  if (typeof b.lastVerifiedAt !== 'string' || b.lastVerifiedAt.trim() === '') {
    errors.push('lastVerifiedAt must be a non-empty string');
  }

  return { valid: errors.length === 0, errors };
}
