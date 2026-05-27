/**
 * Commander SDR Design Tokens — Typography
 *
 * Dense but legible layout per v1.3 Requirement 2.
 * Sharp alignment and symmetry per UI Design System steering.
 *
 * Source: Spec #11a §3.2 Typography
 */

export const typography = {
  fontFamily: {
    sans: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
  },

  fontSize: {
    xs: '0.6875rem',     // 11px — badges, metadata
    sm: '0.75rem',       // 12px — labels, secondary
    base: '0.8125rem',   // 13px — body text (dense)
    md: '0.875rem',      // 14px — primary content
    lg: '1rem',          // 16px — section headings
    xl: '1.25rem',       // 20px — page headings
    '2xl': '1.5rem',     // 24px — dashboard titles
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },

  letterSpacing: {
    tight: '-0.01em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',     // Used for labels, badges
  },
} as const;

export type TypographyToken = typeof typography;
