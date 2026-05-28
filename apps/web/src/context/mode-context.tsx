'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getSemanticTokens, type WorkspaceMode } from '../../../../packages/ui/src/tokens/semantic';

/**
 * Workspace Mode Context — Commander SDR
 *
 * Standard/Mission mode system per DS-1.0 §9.
 * - Standard (Light): management, configuration, reporting
 * - Mission (HUD/Dark): monitoring, analysis, live ops
 * - Shell chrome is ALWAYS navy/dark regardless of mode (DS-1.0 §3)
 * - Mode toggle is functional, not cosmetic (DS-1.0 §0)
 * - State persisted per user in localStorage
 *
 * Source: DESIGN_SYSTEM.md §9, §3
 */

interface ModeContextValue {
  mode: WorkspaceMode;
  toggleMode: () => void;
  tokens: ReturnType<typeof getSemanticTokens>;
}

const ModeContext = createContext<ModeContextValue | null>(null);

const STORAGE_KEY = 'commander-sdr.workspace-mode';

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<WorkspaceMode>('standard');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'mission' || stored === 'standard') {
      setMode(stored);
    }
  }, []);

  function toggleMode() {
    setMode((prev) => {
      const next = prev === 'standard' ? 'mission' : 'standard';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }

  const tokens = getSemanticTokens(mode);

  return (
    <ModeContext.Provider value={{ mode, toggleMode, tokens }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode(): ModeContextValue {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error('useMode must be used within ModeProvider');
  return ctx;
}
