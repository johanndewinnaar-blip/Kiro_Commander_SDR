/**
 * Compliance Scope Binding Entity — Commander SDR Canonical Model
 *
 * Source: docs/00_authority/ASSET_ARCHITECTURE_INTELLIGENCE.md (AAI-1.0) §6
 * Domain: D-48 Asset Architecture Intelligence
 * Build unit: Unit 52
 *
 * Compliance framework scope binding for an asset.
 */

import type { CommonFields } from './common';
import type { ScopeStatus } from './asset-architecture-enums';
import { SCOPE_STATUSES } from './asset-architecture-enums';

export interface ComplianceScopeBinding extends CommonFields {
  entityType: 'compliance-scope-binding';
  /** Asset in scope */
  assetId: string;
  /** Framework ID */
  frameworkId: string;
  /** Scope status */
  scopeStatus: ScopeStatus;
  /** Justification for scope decision */
  justification: string;
  /** When last reviewed */
  reviewedAt: string;
  /** If inherited from estate node (null if directly assigned) */
  inheritedFrom: string | null;
}

export interface ComplianceScopeBindingValidation {
  valid: boolean;
  errors: string[];
}

export function validateComplianceScopeBinding(binding: ComplianceScopeBinding): ComplianceScopeBindingValidation {
  const errors: string[] = [];
  if (!binding.id) errors.push('id is required');
  if (!binding.assetId) errors.push('assetId is required');
  if (!binding.frameworkId) errors.push('frameworkId is required');
  if (!binding.scopeStatus) errors.push('scopeStatus is required');
  if (binding.scopeStatus && !SCOPE_STATUSES.includes(binding.scopeStatus)) {
    errors.push(`scopeStatus '${binding.scopeStatus}' is not valid`);
  }
  if (!binding.justification) errors.push('justification is required');
  if (!binding.reviewedAt) errors.push('reviewedAt is required');
  if (!binding.tenant) errors.push('tenant is required');
  if (!binding.source) errors.push('source is required');
  return { valid: errors.length === 0, errors };
}
