/**
 * Commander SDR — Primitive Tokens (Layer 1)
 *
 * Raw values. NO component references these directly.
 * All values pinned from DESIGN_SYSTEM.md §2.
 *
 * Source: docs/06_ui_build_reference/DESIGN_SYSTEM.md §2
 */

// === §2.1 Spacing scale (8px base grid) ===
export const primitiveSpacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '24px',
  6: '32px',
  7: '48px',
  8: '64px',
} as const;

// === §2.2 Radius ===
export const primitiveRadii = {
  sm: '0px',
  md: '2px',
  lg: '2px',
  full: '9999px',
} as const;

// === §2.3 Brand anchors ===
export const primitiveBrand = {
  navy: '#061936',
  navy2: '#071f43',
  gold: '#ffd21f',
  cream: '#f4f1eb',
} as const;

// === §2.4 Neutral ramp — Standard (light) mode ===
export const primitiveNeutral = {
  0: '#ffffff',
  50: '#f2f5f9',
  100: '#e7ecf3',
  200: '#dbe3ef',
  300: '#c2cede',
  400: '#9aa9be',
  500: '#68758b',
  600: '#4a5667',
  700: '#2e3848',
  800: '#1a2433',
  900: '#0e1d32',
} as const;

// === §2.5 Neutral ramp — Mission (dark/HUD) mode ===
export const primitiveHud = {
  bg0: '#050b16',
  bg1: '#08111f',
  bg2: '#0c1828',
  bg3: '#122236',
  line: 'rgba(255,255,255,0.10)',
  line2: 'rgba(255,255,255,0.16)',
  text0: '#e8f0fb',
  text1: '#aebfd4',
  text2: '#6f8198',
  gridOpacity: '0.05',
} as const;

// === §2.6 Signal colours ===
export const primitiveSignal = {
  critical: '#d92d20',
  warning: '#e8a317',
  success: '#1a7a3f',
  info: '#2563aa',
  neutral: '#68758b',
} as const;

// === §2.7 Data palette (charts, n=8, colour-blind safe) ===
export const primitiveData = {
  1: '#2563aa',
  2: '#e8a317',
  3: '#1a7a3f',
  4: '#b5446e',
  5: '#4ba3c3',
  6: '#c2611f',
  7: '#7a5cc2',
  8: '#8a8f98',
} as const;

// === §2.8 Glow (Mission mode only) ===
export const primitiveGlow = {
  radius: '8px',
  intensity: '0.35',
} as const;

// === §2.9 Motion ===
export const primitiveMotion = {
  micro: '100ms',
  standard: '180ms',
  complex: '250ms',
  easeDefault: 'ease-out',
  easeInteraction: 'ease-in-out',
  easeData: 'linear',
} as const;

// === §2.10 Fonts ===
export const primitiveFonts = {
  display: "'Bebas Neue', Impact, sans-serif",
  body: "'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
} as const;

// === §2.11 Type scale ===
export const primitiveTypeScale = {
  displayLg: '24px',
  display: '22px',
  h1: '24px',
  h2: '20px',
  h3: '16px',
  h4: '14px',
  h5: '12px',
  h6: '10px',
  large: '18px',
  body: '14px',
  caption: '12px',
  micro: '11px',
  kpiValue: '24px',
} as const;

export const primitiveLetterSpacing = {
  display: '0.09em',
  displayWide: '0.11em',
  eyebrow: '0.06em',
} as const;

export const primitiveLineHeight = {
  body: '1.43',
  heading: '1.2',
  denseTable: '1.3',
} as const;

// === §14.1 Priority scale ===
export const primitivePriority = {
  p0: { color: '#d92d20', shape: '◆', label: 'P0' },
  p1: { color: '#e8531f', shape: '▲', label: 'P1' },
  p2: { color: '#e8a317', shape: '●', label: 'P2' },
  p3: { color: '#2563aa', shape: '○', label: 'P3' },
  p4: { color: '#68758b', shape: '□', label: 'P4' },
} as const;

// === §14.2 OODA phase colours ===
export const primitiveOoda = {
  observe: '#2563aa',
  orient: '#4ba3c3',
  decide: '#e8a317',
  act: '#1a7a3f',
} as const;

// === §14.3 Connector class colours ===
export const primitiveConnectorClass = {
  A: '#2563aa',
  B: '#4ba3c3',
  C: '#7a5cc2',
  D: '#e8a317',
} as const;
