/**
 * Secure Design Profile Entity — Commander SDR Canonical Model
 *
 * Source: docs/00_authority/INCEPTION_POSTURE_INTELLIGENCE.md (IPI-1.0) §5
 * Domain: D-49 Inception Posture Intelligence
 * Build unit: Unit 53
 *
 * Defines what "Secure by Design" MEANS for a given asset type +
 * architectural tier + compliance scope combination.
 */

import type { CommonFields } from './common';
import type { SecureDesignProfileStatus } from './inception-posture-enums';
import { SECURE_DESIGN_PROFILE_STATUSES } from './inception-posture-enums';

export interface SecureDesignProfile extends CommonFields {
  entityType: 'secure-design-profile';
  /** Profile identifier */
  profileId: string;
  /** Display name */
  name: string;
  /** Asset type this profile applies to (or '*' for tier-wide) */
  assetType: string;
  /** Architectural tier this profile applies to (or '*' for all) */
  architecturalTier: string;
  /** Additional requirements when in these compliance scopes */
  complianceScopes: string[];
  /** Control IDs that must be in place at inception */
  requiredControls: string[];
  /** Coverage types that must be bound at inception */
  requiredCoverage: string[];
  /** Asset fields that must be populated */
  requiredFields: string[];
  /** Relationship types that must exist */
  requiredRelationships: string[];
  /** Baseline configuration profile that must pass (null if control-based only) */
  requiredBaselineProfile: string | null;
  /** Profile version */
  version: string;
  /** Profile status */
  status: SecureDesignProfileStatus;
}

export interface SecureDesignProfileValidation {
  valid: boolean;
  errors: string[];
}

export function validateSecureDesignProfile(profile: SecureDesignProfile): SecureDesignProfileValidation {
  const errors: string[] = [];
  if (!profile.id) errors.push('id is required');
  if (!profile.profileId) errors.push('profileId is required');
  if (!profile.name) errors.push('name is required');
  if (!profile.assetType) errors.push('assetType is required');
  if (!profile.architecturalTier) errors.push('architecturalTier is required');
  if (!profile.version) errors.push('version is required');
  if (!profile.status) errors.push('status is required');
  if (profile.status && !SECURE_DESIGN_PROFILE_STATUSES.includes(profile.status)) {
    errors.push(`status '${profile.status}' is not valid`);
  }
  if (!profile.tenant) errors.push('tenant is required');
  if (!profile.source) errors.push('source is required');
  if (!Array.isArray(profile.requiredControls)) errors.push('requiredControls must be an array');
  if (!Array.isArray(profile.requiredCoverage)) errors.push('requiredCoverage must be an array');
  if (!Array.isArray(profile.requiredFields)) errors.push('requiredFields must be an array');
  if (!Array.isArray(profile.requiredRelationships)) errors.push('requiredRelationships must be an array');
  return { valid: errors.length === 0, errors };
}
