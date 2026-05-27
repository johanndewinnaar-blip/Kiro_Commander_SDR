import { colors } from '../../../../packages/ui/src/tokens/colors';
import { chrome } from '../../../../packages/ui/src/tokens/spacing';
import { typography } from '../../../../packages/ui/src/tokens/typography';
import { TOP_NAV_WORKSPACES } from '@/registry/nav-groups';

/**
 * Operational App Top Bar — Commander SDR (v1.3.2 Remediated)
 *
 * v1.3.2 Requirements 8, 10, 11, 12, 18:
 * - 68px tall (Req 8)
 * - BrandWordmark: SEIERTECH | COMMANDER SDR (Req 10)
 * - TopNavTabs: 7 workspaces with gold active (Req 11)
 * - GlobalSearch: 440px translucent (Req 12)
 * - UserAvatar: 34px gold initials (Req 18)
 *
 * Source: shell reference v11
 */
export function OperationalTopBar() {
  return (
    <header
      style={{
        position: 'fixed',
        zIndex: 10,
        top: 0,
        left: 0,
        right: 0,
        height: chrome.topBarHeight,
        background: colors.navy.primary,
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        borderBottom: `1px solid ${colors.gold.subtle}`,
      }}
    >
      {/* Brand area — v1.3.2 Req 10 */}
      <div
        style={{
          width: chrome.sidebarWidth,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 18px',
          borderRight: `1px solid ${colors.chrome.lineDark}`,
          gap: '10px',
          background: `linear-gradient(155deg, ${colors.navy.variant}, ${colors.navy.primary})`,
        }}
      >
        <span style={{ fontFamily: typography.fontFamily.display, fontSize: typography.fontSize.brandSm, letterSpacing: typography.letterSpacing.displayWide, color: colors.brand.seiertech }}>
          SEIERTECH
        </span>
        <span style={{ height: '23px', width: '1px', background: colors.brand.pipe }} />
        <span style={{ fontFamily: typography.fontFamily.display, fontSize: typography.fontSize.brandLg, letterSpacing: typography.letterSpacing.display, color: colors.brand.commander }}>
          COMMANDER
        </span>
        <span style={{ fontFamily: typography.fontFamily.display, fontSize: typography.fontSize.brandLg, letterSpacing: typography.letterSpacing.display, color: colors.brand.sdr }}>
          SDR
        </span>
      </div>

      {/* Top nav tabs — v1.3.2 Req 11 */}
      <nav style={{ display: 'flex', height: '100%', alignItems: 'stretch' }}>
        {TOP_NAV_WORKSPACES.map((ws, i) => (
          <a
            key={ws.path}
            href={ws.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              borderBottom: i === 0 ? `3px solid ${colors.gold.primary}` : '3px solid transparent',
              color: i === 0 ? '#fff' : colors.chrome.textMuted,
              background: i === 0 ? colors.gold.tint : 'transparent',
              fontWeight: 600,
              fontSize: typography.fontSize.base,
              textDecoration: 'none',
            }}
          >
            {ws.label}
          </a>
        ))}
      </nav>

      {/* Tools area */}
      <div style={{ marginLeft: 'auto', height: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 16px', borderLeft: `1px solid ${colors.chrome.lineDark}` }}>
        {/* Global search — v1.3.2 Req 12 */}
        <label style={{ width: chrome.searchWidth, height: chrome.iconSize, border: `1px solid ${colors.chrome.searchBorder}`, display: 'flex', alignItems: 'center', padding: '0 12px', background: colors.chrome.searchBg }}>
          <input
            placeholder="Search cases, assets, CVEs, identities, rules…"
            aria-label="Global search"
            style={{ width: '100%', border: 0, background: 'transparent', color: '#fff', outline: 'none', fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base }}
          />
        </label>
        {/* Commander AI button */}
        <a style={{ height: chrome.iconSize, border: `1px solid ${colors.gold.border}`, color: colors.navy.primary, background: '#fff', fontWeight: 800, padding: '0 14px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          Commander AI
        </a>
        {/* Icons */}
        <span style={{ height: chrome.iconSize, width: chrome.iconSize, border: `1px solid rgba(255,255,255,.16)`, display: 'grid', placeItems: 'center', color: '#9ab0c8' }}>●</span>
        <span style={{ height: chrome.iconSize, width: chrome.iconSize, border: `1px solid rgba(255,255,255,.16)`, display: 'grid', placeItems: 'center', color: '#9ab0c8' }}>⚙</span>
        {/* User avatar — v1.3.2 Req 18 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px', borderLeft: `1px solid ${colors.chrome.lineDark}`, paddingLeft: '12px' }}>
          <div style={{ width: chrome.avatarSize, height: chrome.avatarSize, border: '1px solid rgba(255,255,255,.2)', display: 'grid', placeItems: 'center', color: colors.gold.primary, fontFamily: typography.fontFamily.display }}>JS</div>
          <div>
            <b style={{ display: 'block', fontSize: typography.fontSize.sm }}>Jane Smith</b>
            <span style={{ display: 'block', fontSize: typography.fontSize.xs, color: '#8ca6c2' }}>Analyst</span>
          </div>
        </div>
      </div>
    </header>
  );
}
