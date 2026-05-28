'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

/**
 * Sidebar Collapse Context — Commander SDR
 *
 * Shared state for sidebar collapsed/expanded so that:
 * - Shell can adjust marginLeft dynamically
 * - TopBar brand zone can match sidebar width
 * - No black gap on collapse at any screen size
 *
 * State persisted in localStorage.
 */

interface SidebarContextValue {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

const COLLAPSE_KEY = 'commander-sdr.sidebar.collapsed';

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COLLAPSE_KEY);
    if (stored !== null) setCollapsed(stored === 'true');
  }, []);

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(COLLAPSE_KEY, String(next));
      return next;
    });
  }

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarCollapsed(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebarCollapsed must be used within SidebarProvider');
  return ctx;
}
