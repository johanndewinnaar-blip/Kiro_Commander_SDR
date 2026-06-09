'use client';

import { useState, useEffect } from 'react';
import { componentTokens } from '../../../../packages/ui/src/tokens/components';
import { primitiveBrand, primitiveFonts, primitiveTypeScale, primitiveLetterSpacing, primitiveMotion } from '../../../../packages/ui/src/tokens/primitives';
import { standardTokens } from '../../../../packages/ui/src/tokens/semantic';
import { useSidebarCollapsed } from '@/context/sidebar-context';
import { OPERATIONAL_NAV_GROUPS } from '@/registry/nav-groups';

/**
 * Operational App Sidebar — Commander SDR (DS-1.0)
 *
 * THREE-LEVEL HIERARCHY:
 *   Level 1: Group (e.g. Platform, Tenant Admin, Cases) — collapsible
 *   Level 2: Section (e.g. DATA & CONNECTORS, RULES & MODELS) — collapsible sub-node
 *   Level 3: Item (individual page link) — left-aligned, clickable
 *
 * DS-1.0 §7: 248px expanded / 68px icon rail. Collapsible via hamburger.
 * Source: DESIGN_SYSTEM.md §7, UIAA-3.0 Navigation Rationalisation
 */

const STORAGE_PREFIX = 'commander-sdr.sidebar.';
const DEFAULT_EXPANDED_GROUP = 'case-management';

/** Group nav items by their section field */
function groupBySection(items: { label: string; path: string; status: string; section?: string }[]) {
  const sections: { name: string; items: typeof items }[] = [];
  let currentSection = '';

  for (const item of items) {
    const sectionName = item.section || '';
    if (sectionName !== currentSection) {
      currentSection = sectionName;
      sections.push({ name: sectionName, items: [] });
    }
    sections[sections.length - 1].items.push(item);
  }

  return sections;
}

export function OperationalSidebar() {
  const { collapsed, toggleCollapsed } = useSidebarCollapsed();
  const [expansionState, setExpansionState] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {};
    for (const group of OPERATIONAL_NAV_GROUPS) {
      state[group.id] = group.id === DEFAULT_EXPANDED_GROUP;
    }
    return state;
  });

  // Section-level expansion (independent of parent group)
  const [sectionState, setSectionState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored: Record<string, boolean> = {};
    for (const group of OPERATIONAL_NAV_GROUPS) {
      const val = localStorage.getItem(`${STORAGE_PREFIX}${group.id}.expanded`);
      if (val !== null) stored[group.id] = val === 'true';
    }
    if (Object.keys(stored).length > 0) setExpansionState((prev) => ({ ...prev, ...stored }));
  }, []);

  function toggleGroup(groupId: string) {
    setExpansionState((prev) => {
      const next = { ...prev, [groupId]: !prev[groupId] };
      localStorage.setItem(`${STORAGE_PREFIX}${groupId}.expanded`, String(next[groupId]));
      return next;
    });
  }

  function toggleSection(sectionKey: string) {
    setSectionState((prev) => {
      const next = { ...prev, [sectionKey]: !(prev[sectionKey] ?? true) };
      localStorage.setItem(`${STORAGE_PREFIX}section.${sectionKey}`, String(next[sectionKey]));
      return next;
    });
  }

  const sidebarWidth = collapsed ? componentTokens.sidebarRail : componentTokens.sidebarWidth;

  return (
    <aside
      style={{
        position: 'fixed',
        top: componentTokens.topbarHeight,
        bottom: 0,
        left: 0,
        width: sidebarWidth,
        background: `linear-gradient(180deg, ${primitiveBrand.navy2}, var(--tblr-bg-surface-dark))`,
        borderRight: '1px solid rgba(255,255,255,0.10)',
        color: standardTokens.chrome.navText,
        display: 'flex',
        flexDirection: 'column',
        transition: `width ${primitiveMotion.standard} ${primitiveMotion.easeDefault}`,
        overflow: 'hidden',
      }}
      aria-label="Primary navigation"
    >
      {/* Hamburger toggle */}
      <button
        type="button"
        onClick={toggleCollapsed}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        style={{
          height: componentTokens.itemHeight,
          width: '100%',
          border: 'none',
          background: 'transparent',
          color: standardTokens.chrome.navTextActive,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '0' : '0 12px',
          fontSize: '20px',
          fontFamily: primitiveFonts.body,
        }}
      >
        ☰
      </button>

      {/* Home link — visible in collapsed rail */}
      {collapsed && (
        <a
          href="/"
          aria-label="Command Centre (Home)"
          style={{
            height: componentTokens.itemHeight,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: standardTokens.chrome.navTextActive,
            textDecoration: 'none',
            fontSize: primitiveTypeScale.large,
          }}
        >
          ⌂
        </a>
      )}

      {/* Nav groups — 3-level hierarchy */}
      <div style={{ padding: collapsed ? '4px' : '12px', overflowY: 'auto', flex: 1 }} className="sidebar-scroll">
        {OPERATIONAL_NAV_GROUPS.map((group) => {
          const isExpanded = expansionState[group.id] ?? false;
          const hasSections = group.subItems.some((item) => item.section);
          const sections = hasSections ? groupBySection(group.subItems) : null;

          return (
            <div key={group.id} style={{ marginBottom: '4px' }}>
              {/* LEVEL 1: Group header (collapsible) */}
              <button
                type="button"
                onClick={() => !collapsed && toggleGroup(group.id)}
                onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !collapsed) { e.preventDefault(); toggleGroup(group.id); } }}
                aria-expanded={collapsed ? undefined : isExpanded}
                title={collapsed ? group.label : undefined}
                style={{
                  width: '100%',
                  height: componentTokens.itemHeight,
                  border: 'none',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: collapsed ? '0 0 0 24px' : '8px 12px',
                  fontWeight: 700,
                  color: standardTokens.chrome.navText,
                  cursor: 'pointer',
                  fontFamily: primitiveFonts.body,
                  fontSize: primitiveTypeScale.caption,
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                {!collapsed && (
                  <>
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{group.label}</span>
                    {group.badge && (
                      <span style={{ fontSize: primitiveTypeScale.micro, letterSpacing: primitiveLetterSpacing.eyebrow, border: '1px solid rgba(255,255,255,0.24)', color: standardTokens.chrome.navTextActive, padding: '2px 4px' }}>{group.badge}</span>
                    )}
                    <span style={{ color: standardTokens.chrome.navTextActive, transition: `transform ${primitiveMotion.standard} ${primitiveMotion.easeDefault}`, transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)', display: 'inline-block' }}>⌄</span>
                  </>
                )}
              </button>

              {/* Expanded content */}
              {!collapsed && isExpanded && (
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.14)', marginLeft: '12px', marginTop: '2px' }}>

                  {/* Groups WITH sections → 3-level rendering */}
                  {sections ? sections.map((section) => {
                    const sectionKey = `${group.id}.${section.name}`;
                    const isSectionExpanded = sectionState[sectionKey] ?? true;

                    return (
                      <div key={sectionKey} style={{ marginBottom: '2px' }}>
                        {/* LEVEL 2: Section node (collapsible sub-group) */}
                        {section.name && (
                          <button
                            type="button"
                            onClick={() => toggleSection(sectionKey)}
                            aria-expanded={isSectionExpanded}
                            style={{
                              width: '100%',
                              border: 'none',
                              background: 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '6px 8px 6px 12px',
                              cursor: 'pointer',
                              fontFamily: primitiveFonts.body,
                              fontSize: '9px',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              color: 'rgba(255,255,255,0.50)',
                              textAlign: 'left',
                            }}
                          >
                            <span style={{
                              color: 'rgba(255,255,255,0.35)',
                              transition: `transform ${primitiveMotion.standard} ${primitiveMotion.easeDefault}`,
                              transform: isSectionExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                              display: 'inline-block',
                              fontSize: '8px',
                            }}>▸</span>
                            <span style={{ flex: 1 }}>{section.name}</span>
                          </button>
                        )}

                        {/* LEVEL 3: Child links (left-aligned, under section) */}
                        {(isSectionExpanded || !section.name) && section.items.map((item) => (
                          <a
                            key={item.path}
                            href={item.path}
                            style={{
                              height: '30px',
                              display: 'flex',
                              alignItems: 'center',
                              padding: section.name ? '4px 12px 4px 28px' : '4px 12px 4px 12px',
                              color: standardTokens.chrome.navText,
                              fontSize: '11px',
                              textDecoration: 'none',
                              textAlign: 'left',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    );
                  }) : (
                    /* Groups WITHOUT sections → 2-level rendering (flat child items) */
                    group.subItems.map((item) => (
                      <a
                        key={item.path}
                        href={item.path}
                        style={{
                          height: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '4px 12px 4px 12px',
                          color: standardTokens.chrome.navText,
                          fontSize: '11px',
                          textDecoration: 'none',
                          textAlign: 'left',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.label}
                      </a>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
