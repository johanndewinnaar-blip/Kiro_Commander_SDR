/**
 * Commander SDR Design Tokens — Spacing
 *
 * Sharp alignment and symmetry per UI Design System steering.
 * Dense but legible per v1.3 Requirement 2.
 *
 * Source: Spec #11a §3.3 Spacing and Layout
 */

export const spacing = {
  /** 2px — micro spacing */
  '0.5': '0.125rem',
  /** 4px — tight internal padding */
  '1': '0.25rem',
  /** 6px — badge padding */
  '1.5': '0.375rem',
  /** 8px — compact spacing */
  '2': '0.5rem',
  /** 12px — standard internal padding */
  '3': '0.75rem',
  /** 16px — card padding, section gaps */
  '4': '1rem',
  /** 20px — panel padding */
  '5': '1.25rem',
  /** 24px — section spacing */
  '6': '1.5rem',
  /** 32px — major section gaps */
  '8': '2rem',
  /** 48px — page-level spacing */
  '12': '3rem',
} as const;

export const radii = {
  none: '0',
  sm: '2px',
  md: '4px',
  lg: '6px',
  xl: '8px',
} as const;

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  md: '0 2px 4px rgba(0, 0, 0, 0.4)',
  lg: '0 4px 8px rgba(0, 0, 0, 0.5)',
  glow: {
    gold: '0 0 8px rgba(184, 134, 11, 0.3)',
    critical: '0 0 8px rgba(239, 68, 68, 0.3)',
    info: '0 0 8px rgba(59, 130, 246, 0.3)',
  },
} as const;

export type SpacingToken = typeof spacing;
