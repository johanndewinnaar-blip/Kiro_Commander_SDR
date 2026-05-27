import { OperationalSidebar } from './operational-sidebar';
import { OperationalTopBar } from './operational-top-bar';
import { colors } from '../../../../packages/ui/src/tokens/colors';
import { chrome } from '../../../../packages/ui/src/tokens/spacing';

/**
 * Operational App Shell — Commander SDR (v1.3.2 Remediated)
 *
 * v11 shell reference visual language:
 * - Navy chrome (#061936 top bar, gradient sidebar)
 * - 68px top bar with gold underline
 * - 306px sidebar with gradient and gold scrollbar
 * - Light content area (#f2f5f9 page background)
 *
 * Source: docs/06_ui_build_reference/commander-sdr-shell-v11-admin-navigation.html
 */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', height: '100vh', background: colors.operational.page }}>
      <OperationalSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: chrome.sidebarWidth }}>
        <OperationalTopBar />
        <main
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '26px',
            background: colors.operational.panel,
            marginTop: chrome.topBarHeight,
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
