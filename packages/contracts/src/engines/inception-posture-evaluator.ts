/**
 * Inception Posture Evaluator Engine — Commander SDR
 *
 * Source: docs/00_authority/INCEPTION_POSTURE_INTELLIGENCE.md (IPI-1.0) §6
 * Domain: D-49 Inception Posture Intelligence
 * Build unit: Unit 53
 *
 * Pure-function engine that runs ONCE per asset at discovery/creation time.
 * Evaluates the asset against its applicable Secure Design Profile.
 */

import type { PostureOrigin } from '../entities/inception-posture-enums';
import type { SecureDesignProfile } from '../entities/secure-design-profile';

export interface InceptionEvaluationInput {
  /** Asset type */
  assetType: string;
  /** Architectural tier */
  architecturalTier: string;
  /** Compliance scopes applicable to this asset */
  complianceScopes: string[];
  /** Controls currently in place on this asset */
  activeControls: string[];
  /** Coverage types currently bound (from AssetCoverageBinding) */
  boundCoverageTypes: string[];
  /** Asset fields that are populated (field names) */
  populatedFields: string[];
  /** Relationship types that exist for this asset */
  existingRelationships: string[];
  /** Whether required baseline profile passes (null if no baseline required) */
  baselineProfilePasses: boolean | null;
}

export interface InceptionEvaluationResult {
  /** Resulting posture origin classification */
  postureOrigin: PostureOrigin;
  /** Whether the asset passed inception evaluation */
  passed: boolean;
  /** Profile that was evaluated against */
  profileId: string;
  /** Specific requirements that failed (empty if passed) */
  failedRequirements: InceptionFailedRequirement[];
  /** Total requirements checked */
  totalRequirements: number;
  /** Requirements that passed */
  passedRequirements: number;
}

export interface InceptionFailedRequirement {
  /** Category of requirement that failed */
  category: 'control' | 'coverage' | 'field' | 'relationship' | 'baseline';
  /** Specific requirement value that was missing */
  requirement: string;
  /** Human-readable description */
  description: string;
}

/**
 * Finds the applicable Secure Design Profile for an asset.
 * Matches on assetType + architecturalTier, with wildcard support.
 *
 * @param profiles - Available active profiles
 * @param assetType - Asset type to match
 * @param architecturalTier - Tier to match
 * @returns Best matching profile or null
 */
export function findApplicableProfile(
  profiles: SecureDesignProfile[],
  assetType: string,
  architecturalTier: string,
): SecureDesignProfile | null {
  // Exact match first
  const exact = profiles.find(
    p => p.status === 'active' && p.assetType === assetType && p.architecturalTier === architecturalTier,
  );
  if (exact) return exact;

  // Tier-wide wildcard
  const tierWide = profiles.find(
    p => p.status === 'active' && p.assetType === '*' && p.architecturalTier === architecturalTier,
  );
  if (tierWide) return tierWide;

  // Type-wide wildcard
  const typeWide = profiles.find(
    p => p.status === 'active' && p.assetType === assetType && p.architecturalTier === '*',
  );
  if (typeWide) return typeWide;

  // Universal wildcard
  const universal = profiles.find(
    p => p.status === 'active' && p.assetType === '*' && p.architecturalTier === '*',
  );
  return universal ?? null;
}

/**
 * Evaluates an asset against its applicable Secure Design Profile.
 *
 * Pure function — no I/O, no side effects.
 * Runs ONCE per asset at discovery/creation time (ARCH-IPI-001).
 *
 * @param input - Asset context for evaluation
 * @param profile - The applicable Secure Design Profile
 * @returns InceptionEvaluationResult
 */
export function evaluateInceptionPosture(
  input: InceptionEvaluationInput,
  profile: SecureDesignProfile,
): InceptionEvaluationResult {
  const failedRequirements: InceptionFailedRequirement[] = [];
  let totalRequirements = 0;

  // Check required controls
  for (const control of profile.requiredControls) {
    totalRequirements++;
    if (!input.activeControls.includes(control)) {
      failedRequirements.push({
        category: 'control',
        requirement: control,
        description: `Required control '${control}' not present at inception`,
      });
    }
  }

  // Check required coverage
  for (const coverage of profile.requiredCoverage) {
    totalRequirements++;
    if (!input.boundCoverageTypes.includes(coverage)) {
      failedRequirements.push({
        category: 'coverage',
        requirement: coverage,
        description: `Required coverage '${coverage}' not bound at inception`,
      });
    }
  }

  // Check required fields
  for (const field of profile.requiredFields) {
    totalRequirements++;
    if (!input.populatedFields.includes(field)) {
      failedRequirements.push({
        category: 'field',
        requirement: field,
        description: `Required field '${field}' not populated at inception`,
      });
    }
  }

  // Check required relationships
  for (const rel of profile.requiredRelationships) {
    totalRequirements++;
    if (!input.existingRelationships.includes(rel)) {
      failedRequirements.push({
        category: 'relationship',
        requirement: rel,
        description: `Required relationship '${rel}' not established at inception`,
      });
    }
  }

  // Check baseline profile
  if (profile.requiredBaselineProfile !== null) {
    totalRequirements++;
    if (input.baselineProfilePasses !== true) {
      failedRequirements.push({
        category: 'baseline',
        requirement: profile.requiredBaselineProfile,
        description: `Required baseline profile '${profile.requiredBaselineProfile}' did not pass`,
      });
    }
  }

  const passed = failedRequirements.length === 0;
  const postureOrigin: PostureOrigin = passed ? 'secure_by_design' : 'not_secure_by_design';

  return {
    postureOrigin,
    passed,
    profileId: profile.profileId,
    failedRequirements,
    totalRequirements,
    passedRequirements: totalRequirements - failedRequirements.length,
  };
}
