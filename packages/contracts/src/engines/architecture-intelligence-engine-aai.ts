/**
 * Architecture Intelligence Engine — AAI-1.0 Extension
 * Commander SDR Canonical Model
 *
 * Source: AAI-1.0 §7–§9 Resolution & Coverage Evaluation
 * Pure functions for resolving architectural tier, estate node membership,
 * and evaluating coverage completeness for assets.
 *
 * Requirements: 7.1–7.4, 8.1–8.4, 9.1–9.5
 */

import type { Asset } from '../entities/asset';
import type { ArchitecturalTier } from '../entities/architectural-tier';
import { CLASSIFICATION_TO_TIER } from '../entities/architectural-tier';
import type { EstateNode } from '../entities/estate-node';
import type { AssetCoverageBinding } from '../entities/asset-coverage-binding';

// ─── Result Interfaces ───────────────────────────────────────────────────────

/** Result of resolving an asset's architectural tier */
export interface TierResolutionResult {
  tier: ArchitecturalTier;
  confidence: number; // 0-100
  reason: string;
}

/** Result of resolving an asset's estate node membership */
export interface EstateNodeResolutionResult {
  nodeId: string | null;
  confidence: number; // 0-100
  reason: string;
}

/** Result of evaluating coverage completeness for an asset */
export interface CoverageCompletenessResult {
  assetId: string;
  coveredTypes: string[];
  gapTypes: string[];
  completenessScore: number; // 0-100
  staleBindings: string[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

/** Core expected coverage types for all assets */
const EXPECTED_COVERAGE_TYPES = ['edr', 'vuln_scan', 'patch_management'] as const;

// ─── Engine Functions ────────────────────────────────────────────────────────

/**
 * Resolve the architectural tier for an asset.
 *
 * Resolution precedence:
 * 1. Explicit assignment (confidence 100)
 * 2. Inference from asset classification via CLASSIFICATION_TO_TIER (confidence 75)
 * 3. Default fallback to 'compute' (confidence 25)
 *
 * @param asset - The asset to resolve tier for
 * @param _estateNodes - Estate nodes (reserved for future context-based inference)
 * @returns TierResolutionResult with tier, confidence, and reason
 *
 * @pure No side effects, no I/O, no mutations.
 */
export function resolveArchitecturalTier(
  asset: Asset,
  _estateNodes: EstateNode[],
): TierResolutionResult {
  // 1. Explicit assignment takes priority
  if (asset.architecturalTier) {
    return {
      tier: asset.architecturalTier,
      confidence: 100,
      reason: 'explicit_assignment',
    };
  }

  // 2. Infer from classification mapping
  if (asset.classification && asset.classification in CLASSIFICATION_TO_TIER) {
    return {
      tier: CLASSIFICATION_TO_TIER[asset.classification],
      confidence: 75,
      reason: 'classification_inference',
    };
  }

  // 3. Default fallback
  return {
    tier: 'compute',
    confidence: 25,
    reason: 'default_fallback',
  };
}

/**
 * Resolve which estate node an asset belongs to.
 *
 * Resolution precedence:
 * 1. Explicit assignment via asset.estateNodeId (confidence 100)
 * 2. Tag-based inference: match estate node name keywords against asset tags (confidence 50)
 * 3. No match (confidence 0, nodeId null)
 *
 * @param asset - The asset to resolve membership for
 * @param estateNodes - Available estate nodes to match against
 * @returns EstateNodeResolutionResult with nodeId, confidence, and reason
 *
 * @pure No side effects, no I/O, no mutations.
 */
export function resolveEstateNodeMembership(
  asset: Asset,
  estateNodes: EstateNode[],
): EstateNodeResolutionResult {
  // 1. Explicit assignment takes priority
  if (asset.estateNodeId) {
    return {
      nodeId: asset.estateNodeId,
      confidence: 100,
      reason: 'explicit_assignment',
    };
  }

  // 2. Tag-based inference: check if any estate node name keywords appear in asset tags
  const assetTagsLower = asset.tags.map((t) => t.toLowerCase());

  for (const node of estateNodes) {
    const nodeKeywords = node.name.toLowerCase().split(/\s+/);
    const hasMatch = nodeKeywords.some((keyword) =>
      assetTagsLower.some((tag) => tag.includes(keyword)),
    );

    if (hasMatch) {
      return {
        nodeId: node.nodeId,
        confidence: 50,
        reason: 'tag_inference',
      };
    }
  }

  // 3. No match
  return {
    nodeId: null,
    confidence: 0,
    reason: 'no_match',
  };
}

/**
 * Evaluate coverage completeness for an asset based on its bindings.
 *
 * Determines which expected coverage types are present and active,
 * identifies gaps, and reports stale bindings.
 *
 * @param asset - The asset to evaluate coverage for
 * @param bindings - All coverage bindings (will be filtered to this asset)
 * @returns CoverageCompletenessResult with coverage analysis
 *
 * @pure No side effects, no I/O, no mutations.
 */
export function evaluateCoverageCompleteness(
  asset: Asset,
  bindings: AssetCoverageBinding[],
): CoverageCompletenessResult {
  // Filter bindings for this asset
  const assetBindings = bindings.filter((b) => b.assetId === asset.id);

  // Determine covered types (bindings with status 'covered')
  const coveredTypes = assetBindings
    .filter((b) => b.status === 'covered')
    .map((b) => b.coverageType);

  // Determine gap types (expected types not present in covered bindings)
  const gapTypes = EXPECTED_COVERAGE_TYPES.filter(
    (expected) => !coveredTypes.includes(expected),
  );

  // Determine stale bindings
  const staleBindings = assetBindings
    .filter((b) => b.status === 'stale')
    .map((b) => b.coverageType);

  // Compute completeness score (clamped 0-100)
  const completenessScore = Math.min(
    100,
    Math.max(0, Math.round((coveredTypes.length / EXPECTED_COVERAGE_TYPES.length) * 100)),
  );

  return {
    assetId: asset.id,
    coveredTypes: [...coveredTypes],
    gapTypes: [...gapTypes],
    completenessScore,
    staleBindings: [...staleBindings],
  };
}
