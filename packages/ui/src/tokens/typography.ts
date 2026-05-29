/**
 * Commander SDR Design Tokens — Typography (v1.3.2 Remediated)
 *
 * v1.3.2 Requirement 1: Bebas Neue display font
 * v1.3.2 Requirement 2: Inter body font (400/500/600/700/800)
 * v1.3.2 Requirement 3: 13px base font size
 *
 * Source: both shell references
 */

export const typography = {
  fontFamily: {
    /** Body font — Inter via CSS variable */
    body: "var(--font-body, 'Inter', system-ui, sans-serif)",
    /** Display font — Bebas Neue via CSS variable */
    display: "var(--font-display, 'Bebas Neue', Impact, sans-serif)",
    /** Monospace for code/data */
    mono: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
  },

  fontSize: {
    /** 10px — role labels, muted metadata */
    xs: '10px',
    /** 11.4px — sidebar sub-items */
    sidebarSub: '11.4px',
    /** 12px — user name, secondary labels */
    sm: '12px',
    /** 14px — base body text (typography baseline update) */
    base: '14px',
    /** 16px — primary content / h3 */
    md: '16px',
    /** 18px — large text / h2 */
    lg: '18px',
    /** 21px — brand wordmark SEIERTECH */
    brandSm: '21px',
    /** 24px — page heading h1 (typography baseline update) */
    h1: '24px',
    /** 23px — brand wordmark COMMANDER/SDR */
    brandLg: '23px',
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  lineHeight: {
    tight: '1.25',
    normal: '1.43',
    relaxed: '1.75',
  },

  letterSpacing: {
    /** Standard body text */
    normal: '0',
    /** Uppercase eyebrows, card titles (v1.3.2 Req 16, 17) */
    eyebrow: '0.06em',
    /** Badge text */
    badge: '0.08em',
    /** Display font — brand wordmark (v1.3.2 Req 10) */
    display: '0.09em',
    /** Display font — brand large variant */
    displayWide: '0.11em',
  },
} as const;

export type TypographyToken = typeof typography;
