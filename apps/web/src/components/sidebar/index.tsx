'use client';

/**
 * Sidebar — Commander SDR (DS-1.0 Tabler reskin)
 *
 * Tabler navbar-vertical combo layout pattern.
 * Always dark (data-bs-theme="dark" on <aside>).
 * Three-section layout: BrandBlock (top), ScrollableMenu (flex: 1), CollapseFooter (bottom).
 *
 * All data logic, collapse state, localStorage, and nav group structure unchanged.
 * This file contains visual/structural changes only.
 *
 * Source: shell-sidebar-header-rebuild spec tasks 6.1–6.5
 * Tabler reference: navbar-vertical combo layout
 */

import { useState, useEffect, Component, type ReactNode, type ErrorInfo } from 'react';
import { usePathname } from 'next/navigation';
import { getIcon } from '../../../../../packages/ui/src/icons';
import { componentTokens } from '../../../../../packages/ui/src/tokens/components';
import { useSidebarCollapsed } from '@/context/sidebar-context';
import { OPERATIONAL_NAV_GROUPS } from '@/registry/nav-groups';

// ---------------------------------------------------------------------------
// Constants — unchanged
// ---------------------------------------------------------------------------

const STORAGE_PREFIX = 'commander-sdr.sidebar.';
const DEFAULT_EXPANDED_GROUP = 'case-management';

// ---------------------------------------------------------------------------
// Scoped CSS — injected once, covers all sidebar elements
// Keeps inline styles minimal; pseudo-elements and state variants live here.
// ---------------------------------------------------------------------------

const SIDEBAR_STYLES = `
  /* ── Scrollbar — visible at rest, brighter on hover ── */
  .navbar-vertical .navbar-nav {
    scrollbar-width: thin;
    scrollbar-color: var(--tblr-border-color) transparent;
  }
  .navbar-vertical .navbar-nav::-webkit-scrollbar { width: 4px; }
  .navbar-vertical .navbar-nav::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); }
  .navbar-vertical .navbar-nav::-webkit-scrollbar-thumb {
    background: var(--tblr-border-color);
  }
  .navbar-vertical .navbar-nav::-webkit-scrollbar-thumb:hover {
    background: var(--tblr-border-color-active);
  }

  /* ── Nav link base ── */
  .navbar-vertical.commander-nav .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 0.75rem;
    height: 40px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--tblr-nav-link-color) !important;
    background: transparent !important;
    border: none;
    border-radius: 0 !important;
    white-space: nowrap;
    cursor: pointer;
    width: 100%;
    text-align: left;
    text-decoration: none;
  }

  .navbar-vertical.commander-nav .nav-link:hover {
    color: var(--tblr-light) !important;
    background: rgba(255,255,255,0.07) !important;
  }

  .navbar-vertical.commander-nav .nav-link.active {
    color: var(--tblr-light) !important;
    background: rgba(255,255,255,0.10) !important;
  }

  /* ── Sub-item nav links ── */
  .navbar-vertical.commander-nav .nav-item-nested .nav-link {
    height: 34px;
    font-size: 0.8125rem;
    font-weight: 400;
    padding-left: 2.75rem;
    color: var(--tblr-secondary-color) !important;
  }

  .navbar-vertical.commander-nav .nav-item-nested .nav-link:hover {
    color: var(--tblr-nav-link-color) !important;
    background: rgba(255,255,255,0.05) !important;
  }

  .navbar-vertical.commander-nav .nav-item-nested .nav-link.active {
    color: var(--tblr-light) !important;
    background: rgba(255,255,255,0.08) !important;
    border-left: 2px solid var(--tblr-border-color-active);
    padding-left: calc(2.75rem - 2px);
  }

  /* ── Nav link icon — 14px to match text ── */
  .navbar-vertical.commander-nav .nav-link-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    opacity: 0.80;
  }

  .navbar-vertical.commander-nav .nav-link-icon svg {
    width: 14px !important;
    height: 14px !important;
  }

  .navbar-vertical.commander-nav .nav-link:hover .nav-link-icon,
  .navbar-vertical.commander-nav .nav-link.active .nav-link-icon {
    opacity: 1;
  }

  /* ── Nav link title ── */
  .navbar-vertical.commander-nav .nav-link-title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ── Build status badge ── */
  .navbar-vertical.commander-nav .badge {
    flex-shrink: 0;
    font-size: 0.5625rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--tblr-secondary-color);
    border: 1px solid var(--tblr-border-color);
    padding: 1px 4px;
    line-height: 1.4;
    background: transparent;
    border-radius: 0;
  }

  /* ── Chevron — small, subtle, right-aligned ── */
  .navbar-vertical.commander-nav .nav-link-toggle {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    opacity: 0.30;
    transition: transform 200ms ease, opacity 200ms ease;
  }

  .navbar-vertical.commander-nav .nav-link-toggle svg {
    width: 12px !important;
    height: 12px !important;
  }

  .navbar-vertical.commander-nav .nav-link:hover .nav-link-toggle,
  .navbar-vertical.commander-nav .nav-link.active .nav-link-toggle {
    opacity: 0.55;
  }

  /* ── Footer border ── */
  .navbar-vertical.commander-nav .navbar-footer {
    border-top: 1px solid var(--tblr-border-color);
  }

  /* ── Brand block (expanded) ── */
  .navbar-vertical.commander-nav .navbar-brand {
    flex-shrink: 0;
    padding: 1.125rem 0.875rem 1rem;
    border-bottom: 1px solid var(--tblr-border-color);
    min-height: 72px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .navbar-vertical.commander-nav .navbar-brand-text {
    display: flex;
    align-items: baseline;
    gap: 0.3rem;
    font-weight: 700;
    font-size: 1.0625rem;
    letter-spacing: 0.07em;
    line-height: 1.2;
    white-space: nowrap;
  }

  .navbar-vertical.commander-nav .brand-commander { color: #ffd21f; }
  .navbar-vertical.commander-nav .brand-sdr { color: var(--tblr-light); }

  .navbar-vertical.commander-nav .navbar-brand-sub {
    font-size: 0.6875rem;
    font-weight: 400;
    color: var(--tblr-secondary-color);
    margin-top: 4px;
    line-height: 1;
    white-space: nowrap;
  }

  /* ── Brand block (collapsed) ── */
  .navbar-vertical.commander-nav .navbar-brand-icon {
    flex-shrink: 0;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--tblr-border-color);
    text-decoration: none;
    color: var(--tblr-nav-link-color);
    transition: color 150ms ease;
  }

  .navbar-vertical.commander-nav .navbar-brand-icon:hover {
    color: var(--tblr-light);
    background: rgba(255,255,255,0.06);
  }

  .navbar-vertical.commander-nav .navbar-brand-icon svg {
    width: 20px !important;
    height: 20px !important;
  }

  /* ── Collapsed icon rail ── */
  .navbar-vertical.commander-nav .nav-icon-rail {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--tblr-secondary-color);
    cursor: pointer;
    position: relative;
    transition: background 150ms ease, color 150ms ease;
  }

  .navbar-vertical.commander-nav .nav-icon-rail:hover {
    color: var(--tblr-light);
    background: rgba(255,255,255,0.07);
  }

  .navbar-vertical.commander-nav .nav-icon-rail svg {
    width: 16px !important;
    height: 16px !important;
  }

  /* ── CSS tooltip on collapsed rail items ── */
  .navbar-vertical.commander-nav .nav-icon-rail::after {
    content: attr(data-tooltip);
    position: absolute;
    left: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
    background: var(--tblr-bg-surface-dark);
    color: var(--tblr-nav-link-color);
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
    padding: 4px 8px;
    border: 1px solid var(--tblr-border-color);
    pointer-events: none;
    opacity: 0;
    transition: opacity 120ms ease;
    z-index: 200;
  }

  .navbar-vertical.commander-nav .nav-icon-rail:hover::after {
    opacity: 1;
  }

  /* ── Collapsed footer button ── */
  .navbar-vertical.commander-nav .nav-link-collapse {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--tblr-secondary-color);
    transition: color 150ms ease, background 150ms ease;
  }

  .navbar-vertical.commander-nav .nav-link-collapse:hover {
    color: var(--tblr-nav-link-color);
    background: rgba(255,255,255,0.06);
  }

  .navbar-vertical.commander-nav .nav-link-collapse svg {
    width: 14px !important;
    height: 14px !important;
  }
`;

// ---------------------------------------------------------------------------
// Error boundary for BrandBlock — unchanged
// ---------------------------------------------------------------------------

interface BrandErrorBoundaryState { hasError: boolean }

class BrandErrorBoundary extends Component<{ children: ReactNode }, BrandErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): BrandErrorBoundaryState { return { hasError: true }; }
  componentDidCatch(_e: Error, _i: ErrorInfo) {}
  render() { return this.state.hasError ? null : this.props.children; }
}

// ---------------------------------------------------------------------------
// BrandBlock
// Issues 3 & 4: two-line layout, no clipping, correct padding
// ---------------------------------------------------------------------------

function BrandBlock({ collapsed }: { collapsed: boolean }) {
  if (collapsed) {
    return (
      <BrandErrorBoundary>
        {/* Issue 2: LayoutDashboard icon, links to Command Centre */}
        <a href="/" className="navbar-brand-icon" aria-label="Command Centre">
          {getIcon('command-centre', { size: 'nav', 'aria-hidden': true })}
        </a>
      </BrandErrorBoundary>
    );
  }

  return (
    <div className="navbar-brand">
      {/* Line 1: COMMANDER (gold) SDR (white) */}
      <div className="navbar-brand-text">
        <span className="brand-commander">COMMANDER</span>
        <span className="brand-sdr">SDR</span>
      </div>
      {/* Line 2: Seiertech ® — below, muted */}
      <div className="navbar-brand-sub">Seiertech ®</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// NavGroupRow — Issues 2, 4, 5, 6
// ---------------------------------------------------------------------------

interface NavGroupRowProps {
  group: (typeof OPERATIONAL_NAV_GROUPS)[number];
  isExpanded: boolean;
  isActive: boolean;
  activeItemPath: string | null;
  onToggle: () => void;
  pathname: string;
}

function NavGroupRow({ group, isExpanded, isActive, activeItemPath, onToggle }: NavGroupRowProps) {
  return (
    <li className="nav-item">
      {/* Group header */}
      <button
        type="button"
        className={`nav-link${isActive ? ' active' : ''}`}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); }
        }}
        aria-expanded={isExpanded}
      >
        {/* Icon */}
        <span className="nav-link-icon">
          {getIcon(group.id, { size: 'nav', 'aria-hidden': true })}
        </span>

        {/* Label */}
        <span className="nav-link-title">{group.label}</span>

        {/* Build status badge */}
        {group.badge && (
          <span className="badge">{group.badge}</span>
        )}

        {/* Chevron */}
        <span
          className="nav-link-toggle"
          style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
        >
          {getIcon('collapse-footer', { size: 'nav', 'aria-hidden': true })}
        </span>
      </button>

      {/* Sub-items */}
      {isExpanded && (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {group.subItems.map((item) => {
            const itemActive = activeItemPath === item.path;
            return (
              <li key={item.path} className="nav-item nav-item-nested">
                <a
                  href={item.path}
                  className={`nav-link${itemActive ? ' active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

// ---------------------------------------------------------------------------
// ScrollableMenu — Issues 2 & 4: correct padding, fills available space
// ---------------------------------------------------------------------------

function ScrollableMenu({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  const safePath = pathname ?? '/';

  const [expansionState, setExpansionState] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {};
    for (const group of OPERATIONAL_NAV_GROUPS) {
      state[group.id] = group.id === DEFAULT_EXPANDED_GROUP;
    }
    return state;
  });

  useEffect(() => {
    const stored: Record<string, boolean> = {};
    try {
      for (const group of OPERATIONAL_NAV_GROUPS) {
        const val = localStorage.getItem(`${STORAGE_PREFIX}${group.id}.expanded`);
        if (val !== null) stored[group.id] = val === 'true';
      }
    } catch { /* localStorage unavailable */ }
    if (Object.keys(stored).length > 0) {
      setExpansionState((prev) => ({ ...prev, ...stored }));
    }
  }, []);

  function toggleGroup(groupId: string) {
    setExpansionState((prev) => {
      const next = { ...prev, [groupId]: !prev[groupId] };
      try {
        localStorage.setItem(`${STORAGE_PREFIX}${groupId}.expanded`, String(next[groupId]));
      } catch { /* localStorage unavailable */ }
      return next;
    });
  }

  function getActiveItemPath(): string | null {
    for (const group of OPERATIONAL_NAV_GROUPS) {
      for (const item of group.subItems) {
        if (safePath === item.path) return item.path;
      }
    }
    return null;
  }

  function isGroupActive(group: (typeof OPERATIONAL_NAV_GROUPS)[number]): boolean {
    return group.subItems.some((item) => safePath.startsWith(item.path) || safePath === item.path);
  }

  const activeItemPath = getActiveItemPath();

  // Collapsed — icon rail only (Issues 1, 3, 4, 6)
  if (collapsed) {
    return (
      <div
        className="navbar-nav"
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '0.25rem',
          paddingBottom: '0.25rem',
        }}
      >
        {OPERATIONAL_NAV_GROUPS.map((group) => (
          // Issue 3: full-width row, icon centred, hover covers full width
          // Issue 4: no badges, no chevrons — icon only
          // Issue 6: data-tooltip drives CSS ::after tooltip
          <div
            key={group.id}
            className="nav-icon-rail"
            data-tooltip={group.label}
            role="button"
            tabIndex={0}
            aria-label={group.label}
            onClick={() => toggleGroup(group.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleGroup(group.id); }
            }}
          >
            {getIcon(group.id, { size: 'nav', 'aria-hidden': true })}
          </div>
        ))}
      </div>
    );
  }

  // Expanded — full nav list
  return (
    <ul
      className="navbar-nav"
      style={{
        flex: 1,
        overflowY: 'auto',
        listStyle: 'none',
        margin: 0,
        padding: '0.25rem 0',
      }}
    >
      {OPERATIONAL_NAV_GROUPS.map((group) => (
        <NavGroupRow
          key={group.id}
          group={group}
          isExpanded={expansionState[group.id] ?? false}
          isActive={isGroupActive(group)}
          activeItemPath={activeItemPath}
          onToggle={() => toggleGroup(group.id)}
          pathname={safePath}
        />
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// CollapseFooter — Issue 5: no clipping, chevron-left expanded / chevron-right collapsed
// ---------------------------------------------------------------------------

function CollapseFooter({
  collapsed,
  toggleCollapsed,
}: {
  collapsed: boolean;
  toggleCollapsed: () => void;
}) {
  if (collapsed) {
    // Collapsed: centred chevron-right (rotate 180° of ChevronLeft = points right)
    return (
      <div className="navbar-footer">
        <button
          type="button"
          className="nav-link-collapse"
          onClick={toggleCollapsed}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCollapsed(); }
          }}
          aria-label="Expand sidebar"
        >
          <span style={{ display: 'flex', alignItems: 'center', transform: 'rotate(180deg)' }}>
            {getIcon('collapse-footer', { size: 'nav', 'aria-hidden': true })}
          </span>
        </button>
      </div>
    );
  }

  // Expanded: chevron-left icon + "Collapse" label
  return (
    <div className="navbar-footer">
      <button
        type="button"
        className="nav-link"
        onClick={toggleCollapsed}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCollapsed(); }
        }}
        aria-label="Collapse sidebar"
        style={{ justifyContent: 'flex-start' }}
      >
        <span className="nav-link-icon">
          {getIcon('collapse-footer', { size: 'nav', 'aria-hidden': true })}
        </span>
        <span className="nav-link-title">Collapse</span>
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar root
// ---------------------------------------------------------------------------

export function Sidebar() {
  const { collapsed, toggleCollapsed } = useSidebarCollapsed();

  const sidebarWidth = collapsed ? componentTokens.sidebarRail : componentTokens.sidebarWidth;

  return (
    <>
      {/* Scoped sidebar styles — injected once at root */}
      <style>{SIDEBAR_STYLES}</style>

      <aside
        className="commander-nav navbar navbar-vertical navbar-expand-lg"
        data-bs-theme="dark"
        aria-label="Primary navigation"
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          width: sidebarWidth,
          background: 'var(--tblr-bg-surface-dark)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'width 180ms ease-out',
          zIndex: 100,
          borderRight: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <BrandBlock collapsed={collapsed} />
        <ScrollableMenu collapsed={collapsed} />
        <CollapseFooter collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      </aside>
    </>
  );
}
