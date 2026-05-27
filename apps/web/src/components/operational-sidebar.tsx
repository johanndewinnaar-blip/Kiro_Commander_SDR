'use client';

import { useState, useEffect } from 'react';
import { colors } from '../../../../packages/ui/src/tokens/colors';
import { chrome } from '../../../../packages/ui/src/tokens/spacing';
import { typography } from '../../../../packages/ui/src/tokens/typography';
import { OPERATIONAL_NAV_GROUPS } from '@/registry/nav-groups';

/**
 * Operational App Sidebar — Commander SDR (v1.3.2 Phase 5)
 *
 * v1.3.2 Requirements 9, 13, 14, 15:
 * - 306px wide (Req 9)
 * - Vertical gradient #06152d to #030e1e (Req 13)
 * - Two-level expandable groups with gold divider (Req 14)
 * - 6px gold scrollbar (Req 15)
 *
 * Phase 5 additions:
 * - Interactive expand/collapse per group
 * - localStorage persistence per group
 * - Default: only first group ("case-management") expanded
 * - Keyboard accessible (Enter/Space)
 * - ARIA: aria-expanded on group headers
 *
 * Source: shell reference v11
 * 18 navigation groups per v11 reference.
 */

const STORAGE_KEY_PREFIX = 'commander-sdr.sidebar.';
const DEFAULT_EXPANDED_GROUP = 'case-management';

function getStorageKey(groupId: string): string {
  return `${STORAGE_KEY_PREFIX}${groupId}.expanded`;
}

function getDefaultExpansionState(): Record<string, boolean> {
  const state: Record<string, boolean> = {};
  for (const group of OPERATIONAL_NAV_GROUPS) {
    state[group.id] = group.id === DEFAULT_EXPANDED_GROUP;
  }
  return state;
}

export function OperationalSidebar() {
  const [expansionState, setExpansionState] = useState<Record<string, boolean>>(getDefaultExpansionState);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage after mount to avoid SSR mismatch
  useEffect(() => {
    const stored: Record<string, boolean> = {};
    for (const group of OPERATIONAL_NAV_GROUPS) {
      const key = getStorageKey(group.id);
      const value = localStorage.getItem(key);
      if (value !== null) {
        stored[group.id] = value === 'true';
      }
    }
    if (Object.keys(stored).length > 0) {
      setExpansionState((prev) => ({ ...prev, ...stored }));
    }
    setHydrated(true);
  }, []);

  function toggleGroup(groupId: string) {
    setExpansionState((prev) => {
      const next = { ...prev, [groupId]: !prev[groupId] };
      localStorage.setItem(getStorageKey(groupId), String(next[groupId]));
      return next;
    });
  }

  function handleKeyDown(e: React.KeyboardEvent, groupId: string) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleGroup(groupId);
    }
  }

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
        {OPERATIONAL_NAV_GROUPS.map((group) => {
          const isExpanded = expansionState[group.id] ?? false;
          return (
            <div key={group.id} style={{ marginBottom: '7px' }}>
              {/* Group header — interactive */}
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                onKeyDown={(e) => handleKeyDown(e, group.id)}
                aria-expanded={isExpanded}
                style={{
                  width: '100%',
                  height: chrome.groupHeaderHeight,
                  border: '1px solid transparent',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0 10px',
                  fontWeight: 700,
                  color: colors.chrome.textHeading,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  textAlign: 'left',
                }}
              >
                {group.label}
                {group.badge && (
                  <span
                    style={{
                      fontSize: '8px',
                      letterSpacing: typography.letterSpacing.badge,
                      border: `1px solid ${colors.gold.badge}`,
                      color: colors.gold.primary,
                      padding: '2px 4px',
                      marginLeft: '6px',
                    }}
                  >
                    {group.badge}
                  </span>
                )}
                <span
                  style={{
                    marginLeft: 'auto',
                    color: colors.gold.primary,
                    transition: 'transform 150ms ease',
                    transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                    display: 'inline-block',
                  }}
                >
                  ⌄
                </span>
              </button>
              {/* Sub-items with gold divider — v1.3.2 Req 14 */}
              {isExpanded && (
                <div
                  style={{
                    marginLeft: '13px',
                    padding: '4px 0 7px 18px',
                    borderLeft: `1px solid ${colors.gold.divider}`,
                  }}
                >
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
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
