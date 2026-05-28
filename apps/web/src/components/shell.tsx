'use client';

import { OperationalSidebar } from './operational-sidebar';
import { OperationalTopBar } from './operational-top-bar';
import { useMode } from '@/context/mode-context';
import { useSidebarCollapsed } from '@/context/sidebar-context';
import { componentTokens } from '../../../../packages/ui/src/tokens/components';
import { primitiveMotion } from '../../../../packages/ui/src/tokens/primitives';

/**
 * Operational App Shell — Commander SDR (DS-1.0)
 *
 * DS-1.0 §5 Global Layout:
 * - TopBar: fixed, 56px, navy chrome both modes
 * - Sidebar: fixed, 248px / 68px rail, navy chrome both modes
 * - Workspace: scrollable, mode-driven surface, reflows on sidebar collapse
 *
 * Shell chrome is ALWAYS navy/dark regardless of workspace mode (DS-1.0 §3).
 * Mode toggle changes the workspace, not the shell.
 *
 * Source: DESIGN_SYSTEM.md §5, §3
 */
export function Shell({ children }: { children: React.ReactNode }) {
  const { tokens } = useMode();
  const { collapsed } = useSidebarCollapsed();
  const currentSidebarWidth = collapsed ? componentTokens.sidebarRail : componentTokens.sidebarWidth;

  return (
    <div style={{ display: 'flex', height: '100vh', background: tokens.surface.primary }}>
      <OperationalSidebar />
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: currentSidebarWidth,
        transition: `margin-left ${primitiveMotion.standard} ${primitiveMotion.easeDefault}`,
      }}>
        <OperationalTopBar />
        <main
          style={{
            flex: 1,
            overflow: 'auto',
            padding: componentTokens.contentPadding,
            marginTop: componentTokens.topbarHeight,
            background: tokens.surface.secondary,
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
