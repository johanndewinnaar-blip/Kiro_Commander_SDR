/**
 * Commander SDR — Semantic Tokens (Layer 2)
 *
 * Mapped to meaning. Mode-overridable.
 * Components reference THESE, not primitives.
 *
 * Source: docs/06_ui_build_reference/DESIGN_SYSTEM.md §3
 */

import { primitiveNeutral, primitiveHud, primitiveBrand, primitiveSignal, primitiveData } from './primitives';

export type WorkspaceMode = 'standard' | 'mission';

/** Resolve semantic tokens for a given workspace mode */
export function getSemanticTokens(mode: WorkspaceMode) {
  return {
    surface: {
      primary: mode === 'standard' ? primitiveNeutral[50] : primitiveHud.bg1,
      secondary: mode === 'standard' ? primitiveNeutral[0] : primitiveHud.bg2,
      elevated: mode === 'standard' ? primitiveNeutral[0] : primitiveHud.bg3,
      overlay: mode === 'standard' ? 'rgba(14,29,50,0.45)' : 'rgba(0,0,0,0.6)',
    },
    text: {
      primary: mode === 'standard' ? primitiveNeutral[900] : primitiveHud.text0,
      secondary: mode === 'standard' ? primitiveNeutral[500] : primitiveHud.text1,
      muted: mode === 'standard' ? primitiveNeutral[400] : primitiveHud.text2,
    },
    border: {
      default: mode === 'standard' ? primitiveNeutral[300] : primitiveHud.line2,
      subtle: mode === 'standard' ? primitiveNeutral[200] : primitiveHud.line,
    },
    action: {
      primary: primitiveBrand.gold,
      secondary: mode === 'standard' ? primitiveNeutral[700] : primitiveHud.text1,
    },
    status: {
      critical: primitiveSignal.critical,
      warning: primitiveSignal.warning,
      success: primitiveSignal.success,
      info: primitiveSignal.info,
      neutral: primitiveSignal.neutral,
    },
    data: primitiveData,
    chrome: {
      navText: '#ffffff',
      navTextActive: primitiveBrand.gold,
    },
  } as const;
}

/** Standard mode tokens (convenience export) */
export const standardTokens = getSemanticTokens('standard');

/** Mission mode tokens (convenience export) */
export const missionTokens = getSemanticTokens('mission');
