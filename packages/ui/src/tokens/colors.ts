/**
 * Commander SDR Design Tokens — Colours
 *
 * Visual direction: military-intelligence, brutalist, precise, executive-grade.
 *
 * Source: Spec #11a UI/UX Design System, Spec #41 Military-Intelligence UI Doctrine
 * Steering: .kiro/steering/ui-design-system.md
 *
 * Palette:
 * - Navy/ink backgrounds
 * - Gold primary accent
 * - Steel/silver supporting tones
 * - Status colours paired with text/shape (never colour alone per v1.3 Req 24)
 */

export const colors = {
  // === Background hierarchy ===
  background: {
    base: '#0a0e1a',       // Deepest navy — app background
    surface: '#0f1629',    // Surface panels, sidebar
    elevated: '#1a2035',   // Cards, elevated panels
    overlay: '#1e293b',    // Modals, dropdowns
  },

  // === Border hierarchy ===
  border: {
    subtle: '#1e293b',     // Dividers, card edges
    default: '#334155',    // Input borders, separators
    strong: '#475569',     // Active borders, focus rings
    accent: '#b8860b',     // Gold accent borders
  },

  // === Text hierarchy ===
  text: {
    primary: '#f1f5f9',    // Headings, primary content
    secondary: '#cbd5e1',  // Body text, descriptions
    muted: '#94a3b8',      // Labels, metadata
    disabled: '#475569',   // Disabled states
    inverse: '#0a0e1a',    // Text on light backgrounds
  },

  // === Accent — Gold (primary brand) ===
  accent: {
    gold: '#b8860b',       // Primary accent
    goldLight: '#d4a017',  // Hover state
    goldDim: '#8b6508',    // Pressed state
    goldSubtle: '#2d2006', // Subtle background tint
  },

  // === Steel/Silver (supporting) ===
  steel: {
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  // === Status colours (always paired with text/icon per Req 24) ===
  status: {
    live: '#22c55e',       // Active, healthy, resolved
    build: '#b8860b',      // In progress, building
    scaffold: '#64748b',   // Planned, scaffold
    stub: '#475569',       // Stub, placeholder
    critical: '#ef4444',   // P0, critical, emergency
    warning: '#f59e0b',    // Warning, attention needed
    info: '#3b82f6',       // Informational
  },

  // === Priority colours ===
  priority: {
    p0: '#ef4444',         // Zero-day, critical emergency
    p1: '#f97316',         // High priority
    p2: '#f59e0b',         // Medium priority
    p3: '#3b82f6',         // Standard
    p4: '#64748b',         // Low priority
  },

  // === Visual intensity levels (Spec #41 §5) ===
  intensity: {
    /** Operational Standard — default working state */
    standard: {
      background: '#0f1629',
      accent: '#b8860b',
      text: '#cbd5e1',
    },
    /** Tactical Analysis — focused investigation */
    tactical: {
      background: '#0a1628',
      accent: '#3b82f6',
      text: '#e2e8f0',
    },
    /** Emergency Command — P0/zero-day active */
    emergency: {
      background: '#1a0a0a',
      accent: '#ef4444',
      text: '#fef2f2',
    },
  },

  // === OODA phase colours (Spec #41 §V2.6-2) ===
  ooda: {
    observe: '#3b82f6',    // Blue — gathering signal
    orient: '#8b5cf6',     // Purple — contextualising
    decide: '#f59e0b',     // Amber — choosing action
    act: '#22c55e',        // Green — executing
  },
} as const;

export type ColorToken = typeof colors;
