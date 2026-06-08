/**
 * Inception Posture Intelligence Enumerations — Commander SDR
 *
 * Source: docs/00_authority/INCEPTION_POSTURE_INTELLIGENCE.md (IPI-1.0) §4
 * Domain: D-49 Inception Posture Intelligence
 * Build unit: Unit 53
 */

// ─── Posture Origin (IPI-1.0 §4) ────────────────────────────────────────────

/** Posture origin classification — set ONCE at inception, immutable (ARCH-IPI-002) */
export const POSTURE_ORIGINS = [
  'secure_by_design',
  'not_secure_by_design',
  'unknown',
  'accepted_not_secure_by_design',
] as const;
export type PostureOrigin = typeof POSTURE_ORIGINS[number];

export const POSTURE_ORIGIN_LABELS: Record<PostureOrigin, string> = {
  secure_by_design: 'Secure by Design',
  not_secure_by_design: 'Not Secure by Design',
  unknown: 'Unknown (not yet evaluated)',
  accepted_not_secure_by_design: 'Accepted Not Secure by Design',
};

/** Terminal posture origins — once set, cannot change (except to accepted) */
export const TERMINAL_POSTURE_ORIGINS: PostureOrigin[] = [
  'secure_by_design',
  'not_secure_by_design',
  'accepted_not_secure_by_design',
];

// ─── Root Cause Class (IPI-1.0 §4) ──────────────────────────────────────────

/** Root cause classification for findings — enables routing and AI explanation */
export const ROOT_CAUSE_CLASSES = [
  'not_secure_by_design',
  'security_drift',
  'misconfiguration',
  'coverage_gap',
  'control_failure',
  'process_failure',
  'technical_debt',
  'third_party_dependency',
  'accepted_risk',
  'unknown',
] as const;
export type RootCauseClass = typeof ROOT_CAUSE_CLASSES[number];

export const ROOT_CAUSE_CLASS_LABELS: Record<RootCauseClass, string> = {
  not_secure_by_design: 'Not Secure by Design (inception failure)',
  security_drift: 'Security Drift (operational decay)',
  misconfiguration: 'Misconfiguration',
  coverage_gap: 'Coverage Gap',
  control_failure: 'Control Failure',
  process_failure: 'Process Failure',
  technical_debt: 'Technical Debt',
  third_party_dependency: 'Third-Party Dependency',
  accepted_risk: 'Accepted Risk',
  unknown: 'Unknown',
};

// ─── Secure Design Profile Status (IPI-1.0 §5) ──────────────────────────────

export const SECURE_DESIGN_PROFILE_STATUSES = [
  'active',
  'draft',
  'retired',
] as const;
export type SecureDesignProfileStatus = typeof SECURE_DESIGN_PROFILE_STATUSES[number];

// ─── Activation Scope Status (IPI-1.0 §17) ──────────────────────────────────

export const ACTIVATION_SCOPE_STATUSES = [
  'onboarding',
  'phased',
  'fully_active',
] as const;
export type ActivationScopeStatus = typeof ACTIVATION_SCOPE_STATUSES[number];

// ─── Discovery Context (IPI-1.0 §17) ────────────────────────────────────────

export const DISCOVERY_CONTEXTS = [
  'onboarding',
  'operational',
] as const;
export type DiscoveryContext = typeof DISCOVERY_CONTEXTS[number];
