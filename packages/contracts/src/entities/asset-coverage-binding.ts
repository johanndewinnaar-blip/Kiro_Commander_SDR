/**
 * Asset Coverage Binding Entity — Commander SDR Canonical Model
 *
 * Source: docs/00_authority/ASSET_ARCHITECTURE_INTELLIGENCE.md (AAI-1.0) §6
 * Domain: D-48 Asset Architecture Intelligence
 * Build unit: Unit 52
 *
 * Explicit security tool coverage binding for an asset.
 */

import type { CommonFields } from './common';
import type { CoverageStatus } from './asset-architecture-enums';
import { COVERAGE_STATUSES } from './asset-architecture-enums';

export interface AssetCoverageBinding extends CommonFields {
  entityType: 'asset-coverage-binding';
  /** Asset being covered */
  assetId: string;
  /** Connector providing coverage */
  connectorId: string;
  /** Type of coverage provided */
  coverageType: string;
  /** When coverage was last confirmed */
  confirmedAt: string;
  /** Coverage status */
  status: CoverageStatus;
}

export interface AssetCoverageBindingValidation {
  valid: boolean;
  errors: string[];
}

export function validateAssetCoverageBinding(binding: AssetCoverageBinding): AssetCoverageBindingValidation {
  const errors: string[] = [];
  if (!binding.id) errors.push('id is required');
  if (!binding.assetId) errors.push('assetId is required');
  if (!binding.connectorId) errors.push('connectorId is required');
  if (!binding.coverageType) errors.push('coverageType is required');
  if (!binding.confirmedAt) errors.push('confirmedAt is required');
  if (!binding.status) errors.push('status is required');
  if (binding.status && !COVERAGE_STATUSES.includes(binding.status)) {
    errors.push(`status '${binding.status}' is not valid`);
  }
  if (!binding.tenant) errors.push('tenant is required');
  if (!binding.source) errors.push('source is required');
  return { valid: errors.length === 0, errors };
}
