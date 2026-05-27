import { colors } from '../../../../packages/ui/src/tokens/colors';
import { chrome } from '../../../../packages/ui/src/tokens/spacing';
import { typography } from '../../../../packages/ui/src/tokens/typography';
import { OPERATIONAL_NAV_GROUPS } from '@/registry/nav-groups';

/**
 * Operational App Sidebar — Commander SDR (v1.3.2 Remediated)
 *
 * v1.3.2 Requirements 9, 13, 14, 15:
 * - 306px wide (Req 9)
 * - Vertical gradient #06152d to #030e1e (Req 13)
 * - Two-level expandable groups with gold divider (Req 14)
 * - 6px gold scrollbar (Req 15)
 *
 * Source: shell reference v11
 * 19 navigation groups per v11 reference.
 */
export function OperationalSidebar() {
  return (
    <aside
      style={{
        position: 'fixed',
        top: chrome.topBarHeight,
        bottom: 0,
        left: 0,
        width: chrome.sidebarWidth,
        background: `linear-gradient(180deg, ${colors.navy.sidebar}, ${colors.navy.sidebarEnd})`,
        borderRight: '1px solid #0b1e38',
        color: '#dcecff',
        display: 'flex',
        flexDirection: 'column',
      }}
      aria-label="Primary navigation"
    >
      <div
        style={{
          padding: '12px',
          overflowY: 'auto',
          flex: 1,
        }}
        className="sidebar-scroll"
      >
        {OPERATIONAL_NAV_GROUPS.map((group) => (
          <div key={group.id} style={{ marginBottom: '7px' }}>
            {/* Group header */}
            <div
              style={{
                height: chrome.groupHeaderHeight,
                border: '1px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 10px',
                fontWeight: 700,
                color: colors.chrome.textHeading,
                cursor: 'pointer',
              }}
            >
              {group.label}
              {group.badge && (
                <span style={{ fontSize: '8px', letterSpacing: typography.letterSpacing.badge, border: `1px solid ${colors.gold.badge}`, color: colors.gold.primary, padding: '2px 4px', marginLeft: '6px' }}>
                  {group.badge}
                </span>
              )}
              <span style={{ marginLeft: 'auto', color: colors.gold.primary }}>⌄</span>
            </div>
            {/* Sub-items with gold divider — v1.3.2 Req 14 */}
            <div style={{ marginLeft: '13px', padding: '4px 0 7px 18px', borderLeft: `1px solid ${colors.gold.divider}` }}>
              {group.subItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  style={{
                    height: chrome.subItemHeight,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 8px',
                    color: colors.chrome.textSubtle,
                    fontSize: typography.fontSize.sidebarSub,
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
