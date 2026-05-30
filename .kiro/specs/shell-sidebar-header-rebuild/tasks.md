# Implementation Plan: Shell, Sidebar & Header Rebuild

## Overview

Replace the current single overloaded top bar with a clean three-zone layout: a persistent vertical
sidebar (primary navigation authority), a dedicated horizontal header (section navigation, search,
utility actions), and an unchanged main workspace content area.

This is a **shell and navigation refactoring only**. No routes, page content, data models, dashboard
logic, charting, case logic or table data logic may change. All layout dimensions, colours and spacing
are driven exclusively through the three-layer token system (primitive → semantic → component). Zero
hardcoded values are permitted in component code.

**Owning spec:** `shell-sidebar-header-rebuild`
**Compliance:** DS-1.0, Spec #56 (registry-driven navigation), Commander v2.6 authority hierarchy
**PBT library:** `fast-check` (TypeScript-native, Vitest-compatible)
**Language:** TypeScript / React (Next.js App Router)

---

## Tasks

- [x] 1. Token Layer — Component Token Updates
  - [x] 1.1 Update `sidebarWidth` and `sidebarRail` in `packages/ui/src/tokens/components.ts`
    - Change `sidebarWidth` from `'248px'` to `'264px'` (Requirement 3.1 — replaces out-of-range 248px)
    - Change `sidebarRail` from `'68px'` to `'72px'` (Requirement 3.2 — replaces out-of-range 68px)
    - Verify both values satisfy their specified ranges (264px ≥ 256px minimum; 72px within 72–80px)
    - _Requirements: 3.1, 3.2, 6.2_

  - [x] 1.2 Add navigation sizing tokens to `packages/ui/src/tokens/components.ts`
    - Add `topNavTextSize: '14px'`, `topNavTextWeight: 500`, `topNavLineHeight: 1.2`
    - Add `topNavItemHeight: '44px'`, `topNavUnderline: '2px'`
    - Add `sidebarNavTextSize: '14px'`, `sidebarNavTextWeight: 500`, `sidebarNavLineHeight: 1.2`
    - Add `sidebarSubNavTextSize: '12px'`, `sidebarSubNavTextWeight: 500`, `sidebarSubNavLineHeight: 1.2`
    - Add `sidebarGroupHeaderTextSize: '12px'`, `sidebarGroupHeaderTextWeight: 700`, `sidebarGroupHeaderLineHeight: 1.2`
    - Add `sidebarRowHeight: '40px'`, `sidebarSubRowHeight: '36px'`
    - Confirm `searchWidth` remains `'440px'` (already within 360–480px range — no change needed)
    - _Requirements: 18.1_

  - [ ]* 1.3 Write smoke tests for component token values
    - Assert `componentTokens.sidebarWidth === '264px'`
    - Assert `componentTokens.sidebarRail === '72px'`
    - Assert all seven navigation sizing tokens are defined with exact specified values
    - Assert `componentTokens.searchWidth` is within `'360px'`–`'480px'` range
    - Assert `componentTokens.topNavItemHeight === '44px'`
    - Assert `componentTokens.sidebarRowHeight === '40px'`
    - Assert `componentTokens.sidebarSubRowHeight === '36px'`
    - _Requirements: 3.1, 3.2, 18.1_

- [x] 2. Token Layer — Semantic Token Updates
  - [x] 2.1 Add sidebar semantic tokens to `packages/ui/src/tokens/semantic.ts`
    - Add `sidebar.background: '#040a11'` as mode-invariant (resolves to near-black navy in both standard and mission modes)
    - Add `sidebar.scrollbarThumb: 'rgba(255,255,255,0.18)'`
    - Add `sidebar.scrollbarThumbHover: 'rgba(255,255,255,0.32)'`
    - Add `sidebar.scrollbarTrack: 'transparent'`
    - Add `sidebar.activeBackground: 'rgba(255,255,255,0.08)'` (non-Gold, ≥10% luminance delta against sidebar bg)
    - Add `sidebar.activeIndicator: '#4a90d9'` (non-Gold blue accent)
    - _Requirements: 8.4, 8.5, 8.6, 19.3_

  - [x] 2.2 Add chrome and brand semantic tokens to `packages/ui/src/tokens/semantic.ts`
    - Add `chrome.separator: 'rgba(255,255,255,0.12)'` to the existing `chrome` block
    - Add `brand.gold: primitiveBrand.gold` (for Top_Nav underline use only)
    - Preserve existing `chrome.navText` and `chrome.navTextActive` values unchanged
    - _Requirements: 10.3, 11.4_

  - [x] 2.3 Add input and shell surface semantic tokens to `packages/ui/src/tokens/semantic.ts`
    - Add mode-conditional `input.border`, `input.background`, `input.text` tokens
    - Add dark (mission) mode shell surface tokens: header background `#0d1b2a`, page background `#040a11`, card/panel background `#0e1722`, border `#25384f`, body text `#dce1e7`, secondary text `rgba(220,225,231,0.75)`
    - Add light (standard) mode shell surface tokens: page background `#f6f8fb`, card/panel background `#ffffff`, card border `#dce1e7`, body text `#182433`, secondary text `rgba(24,36,51,0.75)`, header background `#ffffff`
    - _Requirements: 12.3, 17.1, 17.2_

  - [ ]* 2.4 Write smoke tests for semantic token definitions
    - Assert all six sidebar semantic tokens are defined and non-empty strings
    - Assert `semanticTokens.sidebar.background === '#040a11'` in both standard and mission modes
    - Assert `semanticTokens.chrome.separator` is defined and non-empty
    - Assert `semanticTokens.brand.gold === primitiveBrand.gold`
    - Assert all required dark and light mode shell surface tokens are defined
    - _Requirements: 8.4, 8.5, 17.1, 17.2_

- [x] 3. Checkpoint — Token layer complete
  - Ensure all smoke tests in tasks 1.3 and 2.4 pass before proceeding
  - Confirm zero hardcoded values remain in token files (all values trace to primitive imports or literal token definitions)
  - Ask the user if questions arise before proceeding to component work

- [x] 4. Icon_Map Module
  - [x] 4.1 Create `packages/ui/src/icons/index.ts` with typed `getIcon()` accessor
    - Define `IconSize` type: `'nav' | 'utility' | 'inline'`
    - Define `IconProps` interface with `size`, `className`, `aria-hidden` fields
    - Implement `getIcon(key: string, props?: IconProps): React.ReactElement`
    - Enforce default render attributes: `fill="none"`, `stroke="currentColor"`, `strokeWidth={1.75}`
    - Resolve sizes: `nav` and `utility` → 20px; `inline` → 16px
    - Return Lucide `Circle` fallback for any key not present in `ICON_MAP` (no throw, no null)
    - _Requirements: 9.1, 9.4, 9.5, 9.6, 9.7, 9.8, 20.1, 20.7_

  - [x] 4.2 Register all 15 operational navigation module icons in `ICON_MAP`
    - `command-centre` → `LayoutDashboard`; `case-management` → `FolderKanban`; `mission-control` → `Radar`
    - `fusion-map` → `Network`; `vulnerability-management` → `ShieldAlert`; `exposure-management` → `ScanSearch`
    - `identity-access` → `Users`; `architecture` → `Blocks`; `assets` → `Server`
    - `controls` → `ShieldCheck`; `coverage` → `Radar`; `tool-health` → `Activity`
    - `team-pulse` → `UsersRound`; `domain-pulse` → `Globe`; `system-pulse` → `Activity`
    - Also register: `platform` → `Settings`; `tenant-admin` → `Building`; `governance` → `Scale`; `reporting` → `FileText`
    - _Requirements: 9.2, 9.3_

  - [x] 4.3 Register all header utility icons in `ICON_MAP`
    - `search` → `Search`; `theme-light` → `Sun`; `theme-dark` → `Moon`
    - `notification-bell` → `Bell`; `commander-ai` → `Sparkles`; `collapse-footer` → `ChevronLeft`
    - _Requirements: 20.3_

  - [ ]* 4.4 Write property test for Icon_Map completeness, attributes, and fallback (Property 4)
    - **Property 4: Icon_Map completeness, attributes, and fallback**
    - Generator: `fc.oneof(fc.constantFrom(...ICON_MAP_KEYS), fc.string())` (known and unknown keys)
    - Verify: known keys return element with `fill="none"`, `stroke="currentColor"`, `strokeWidth={1.75}`; unknown keys return `Circle` fallback without throwing
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.8, 20.4, 20.6, 20.7**
    - Tag: `Feature: shell-sidebar-header-rebuild, Property 4: Icon_Map completeness, attributes, and fallback`

  - [ ]* 4.5 Write property test for no direct lucide-react imports in shell components (Property 16)
    - **Property 16: No direct lucide-react imports in Shell, Sidebar, or Header**
    - Generator: static analysis (no random input — source is fixed)
    - Verify: zero `import ... from 'lucide-react'` statements in Shell, Sidebar, Header source files
    - **Validates: Requirements 20.1, 20.2**
    - Tag: `Feature: shell-sidebar-header-rebuild, Property 16: No direct lucide-react imports in Shell, Sidebar, or Header`

- [x] 5. Shell Component Rebuild
  - [x] 5.1 Rewrite `apps/web/src/components/shell.tsx` with three-zone CSS fixed layout
    - Replace current flex-margin layout with CSS fixed positioning throughout
    - Sidebar: `position: fixed; left: 0; top: 0; bottom: 0; width: <sidebarWidth token>`
    - Header: `position: fixed; top: 0; left: <sidebarWidth>; right: 0; height: <topbarHeight token>`
    - Workspace `<main>`: `position: fixed; top: <topbarHeight>; left: <sidebarWidth>; right: 0; bottom: 0; overflow-y: auto`
    - Read `collapsed` from `useSidebarCollapsed()`; resolve `sidebarWidth` as `componentTokens.sidebarRail` (collapsed) or `componentTokens.sidebarWidth` (expanded)
    - Apply `transition` using `primitiveMotion.standard` on `left` and `width` offsets
    - Pass `{children}` directly to `<main>` with no intermediate wrapper elements
    - Import `Sidebar` from `./sidebar` and `Header` from `./header` (new components — created in tasks 6 and 7)
    - Remove all imports of `OperationalSidebar` and `OperationalTopBar`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.8, 21.4_

  - [x] 5.2 Implement Shell fallback layout for non-positive/non-numeric token values
    - If `sidebarWidth` resolves to a non-positive or non-numeric value, apply safe fallback: sidebar `width: 264px`, header `left: 264px`, workspace `left: 264px`
    - No zone may have zero width, zero height, or overlap another zone in the fallback state
    - _Requirements: 1.7_

  - [ ]* 5.3 Write property test for sidebar width token driving all layout offsets (Property 1)
    - **Property 1: Sidebar width token drives all layout offsets**
    - Generator: `fc.boolean()` (collapsed state)
    - Verify: Header left offset === sidebar width token; Workspace left offset === same; sidebar rendered width === same token value
    - **Validates: Requirements 1.5, 1.6, 3.3, 3.4, 3.5**
    - Tag: `Feature: shell-sidebar-header-rebuild, Property 1: Sidebar width token drives all layout offsets`

  - [ ]* 5.4 Write property test for no hardcoded values in shell component source (Property 2)
    - **Property 2: No hardcoded values in shell component source**
    - Generator: static analysis (source is fixed)
    - Verify: zero matches for hex literals, `rgba()`, `hsl()`, named CSS colours, pixel dimension literals (other than `0` or `0px`) in Shell, Sidebar, Header source files
    - **Validates: Requirements 1.8, 3.3, 3.4, 3.5, 8.6, 17.4, 17.5**
    - Tag: `Feature: shell-sidebar-header-rebuild, Property 2: No hardcoded values in shell component source`

  - [ ]* 5.5 Write property test for workspace children pass-through (Property 15)
    - **Property 15: Workspace children pass-through — no intermediate wrappers**
    - Generator: `fc.anything()` (arbitrary React-compatible children)
    - Verify: children passed directly to `<main>` with no additional wrapper elements inserted between `<main>` and `{children}`
    - **Validates: Requirements 21.4**
    - Tag: `Feature: shell-sidebar-header-rebuild, Property 15: Workspace children pass-through`

  - [ ]* 5.6 Write Shell snapshot tests
    - Snapshot: Shell layout in expanded sidebar state
    - Snapshot: Shell layout in collapsed sidebar state
    - _Requirements: 1.1, 1.5, 1.6_

- [x] 6. Sidebar Component Rebuild
  - [x] 6.1 Create `apps/web/src/components/sidebar/index.tsx` with three-section structure
    - `<aside>` with `position: fixed; top: 0; bottom: 0; left: 0` (full viewport height — NOT offset by topbarHeight)
    - Background: `semanticTokens.sidebar.background` (mode-invariant near-black navy)
    - Three vertically stacked sections: `brand-block` (flex-shrink: 0), `scrollable-menu` (flex: 1, overflow-y: auto), `collapse-footer` (flex-shrink: 0)
    - Width driven by `componentTokens.sidebarWidth` (expanded) or `componentTokens.sidebarRail` (collapsed)
    - Transition: `width` with `primitiveMotion.standard`
    - Read `collapsed` from `useSidebarCollapsed()`
    - No props accepted — all state from context
    - Zero hardcoded hex, rgba, hsl, or pixel values in component code
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 8.1, 8.6, 3.4_

  - [x] 6.2 Implement Brand_Block sub-component within Sidebar
    - Expanded state: two-line wordmark — Line 1: `COMMANDER` (Gold via `primitiveBrand.gold`, `typography.role.logoText` = 22px/700/`primitiveLetterSpacing.display`) + `SDR` (white, same size); Line 2: `Seiertech ®` (`typography.fontSize.sm` = 12px/400)
    - Collapsed state: single Gold `C` glyph at `typography.role.logoText` size
    - If collapsed `C` produces zero visible pixels or render error: hide Brand_Block completely (no broken state)
    - Font: `primitiveFonts.body` (Inter) exclusively — no Lucide icon, no image asset
    - Gold applied to `COMMANDER` text only — no other Brand_Block element
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [x] 6.3 Implement Scrollable_Menu sub-component — expanded state
    - Render all 18 `OPERATIONAL_NAV_GROUPS` entries from registry (no modification to registry data)
    - Nav_Group header: icon (from `getIcon()`, 18–20px, `strokeWidth` 1.75) + label + Build_Status_Badge + chevron
    - Labels: `white-space: nowrap; overflow: visible` — no truncation for any label including 25+ char names
    - Row heights: `componentTokens.sidebarRowHeight` (40px) for groups, `componentTokens.sidebarSubRowHeight` (36px) for sub-items
    - Text: `componentTokens.sidebarNavTextSize`/`sidebarNavTextWeight` for groups; `componentTokens.sidebarSubNavTextSize`/`sidebarSubNavTextWeight` for sub-items
    - Group header text: `componentTokens.sidebarGroupHeaderTextSize`/`sidebarGroupHeaderTextWeight`
    - Active group: `semanticTokens.sidebar.activeBackground` + increased label contrast
    - Active item: `semanticTokens.sidebar.activeBackground` + 2px left border `semanticTokens.sidebar.activeIndicator`
    - Active detection: `usePathname()` — group active when current path starts with group base path; item active on exact match
    - Group expansion: toggled by pointer click or keyboard Enter/Space; persisted in `localStorage` under `commander-sdr.sidebar.<groupId>.expanded`; default collapsed except `case-management` defaults expanded
    - Scrollbar: `semanticTokens.sidebar.scrollbarThumb`, `semanticTokens.sidebar.scrollbarThumbHover`, transparent track — no literal colour values
    - Icons sourced exclusively from `getIcon()` — no direct `lucide-react` imports
    - _Requirements: 2.3, 2.5, 2.6, 2.8, 5.1, 5.2, 5.3, 5.4, 5.5, 5.7, 5.8, 6.1, 6.2, 9.3, 18.2_

  - [x] 6.4 Implement Scrollable_Menu sub-component — collapsed (icon rail) state
    - Render Nav_Group icons only — no labels, no sub-items, no Build_Status_Badges
    - Icons sourced from `getIcon()`, 18–20px, `strokeWidth` 1.75
    - Icon placeholder renders within 200ms of Scrollable_Menu becoming visible
    - _Requirements: 2.6, 2.7, 5.9, 6.3_

  - [x] 6.5 Implement Collapse_Footer sub-component
    - Expanded: `ChevronLeft` icon (20px, from `getIcon('collapse-footer')`) + "Collapse" label
    - Collapsed: `ChevronLeft` rotated 180° (points right) — no label
    - Transition: `transform` with `primitiveMotion.standard`
    - Colour: `standardTokens.chrome.navText` — no Gold
    - Default state when localStorage unreadable: expanded (shows "Collapse" label)
    - Fixed at bottom of Sidebar regardless of Scrollable_Menu scroll position
    - `aria-label` updates to reflect current state
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

  - [ ]* 6.6 Write property test for sidebar collapsed state renders icons only (Property 5)
    - **Property 5: Sidebar collapsed state renders icons only — no labels, badges, or sub-items**
    - Generator: `fc.constantFrom(...OPERATIONAL_NAV_GROUPS)` with `collapsed=true`
    - Verify: icon element present; no text node for group label; no Build_Status_Badge element; no sub-item element
    - **Validates: Requirements 2.7, 5.9, 6.3**
    - Tag: `Feature: shell-sidebar-header-rebuild, Property 5: Sidebar collapsed state renders icons only`

  - [ ]* 6.7 Write property test for sidebar registry fidelity (Property 6)
    - **Property 6: Sidebar registry fidelity — all groups rendered with correct data**
    - Generator: `fc.constantFrom(...OPERATIONAL_NAV_GROUPS)` (each group)
    - Verify: rendered label exactly matches registry `label`; sub-items exactly match registry `subItems` (same paths and labels); Build_Status_Badge exactly matches registry `badge` when present; no group omitted, reordered, or data modified
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.7**
    - Tag: `Feature: shell-sidebar-header-rebuild, Property 6: Sidebar registry fidelity`

  - [ ]* 6.8 Write property test for active route styling (Property 7)
    - **Property 7: Active route styling applied to correct group and item**
    - Generator: `fc.constantFrom(...all_nav_paths)` (all paths from registry)
    - Verify: `semanticTokens.sidebar.activeBackground` applied to correct group; `semanticTokens.sidebar.activeBackground` + 2px left border `semanticTokens.sidebar.activeIndicator` applied to correct item; no other group or item receives active styling
    - **Validates: Requirements 5.4, 5.5**
    - Tag: `Feature: shell-sidebar-header-rebuild, Property 7: Active route styling applied to correct group and item`

  - [ ]* 6.9 Write property test for sidebar always dark regardless of workspace mode (Property 11)
    - **Property 11: Sidebar always dark regardless of workspace mode**
    - Generator: `fc.constantFrom('standard', 'mission')`
    - Verify: sidebar background resolves to `semanticTokens.sidebar.background` (`#040a11`); HSL lightness ≥ 10 percentage points lower than workspace background and header background in that mode
    - **Validates: Requirements 8.1, 8.2, 8.3, 17.3**
    - Tag: `Feature: shell-sidebar-header-rebuild, Property 11: Sidebar always dark regardless of workspace mode`

  - [ ]* 6.10 Write Sidebar snapshot tests
    - Snapshot: Sidebar expanded state
    - Snapshot: Sidebar collapsed state
    - Snapshot: Brand_Block expanded
    - Snapshot: Brand_Block collapsed
    - _Requirements: 2.1, 4.1, 4.5_

- [x] 7. Checkpoint — Shell and Sidebar complete
  - Ensure all tests in tasks 5.3–5.6 and 6.6–6.10 pass
  - Confirm sidebar starts at `top: 0` (full viewport height — not offset by topbarHeight)
  - Confirm zero hardcoded values in shell.tsx and sidebar/index.tsx
  - Ask the user if questions arise before proceeding to Header work

- [x] 8. Header Component Rebuild
  - [x] 8.1 Create `apps/web/src/components/header/index.tsx` with five-group structure
    - Fixed horizontal bar: `position: fixed; top: 0; left: <sidebarWidth>; right: 0; height: componentTokens.topbarHeight`
    - Background: `semanticTokens.surface.secondary` (header background token, mode-conditional)
    - Five groups left-to-right: Top_Nav, Search, Commander_AI_Action + Theme_Toggle, Notification_Bell, User_Profile_Block
    - Exactly four 1px vertical separators between adjacent groups using `semanticTokens.chrome.separator`
    - Read `collapsed` from `useSidebarCollapsed()` to compute `left` offset
    - Read `mode`/`toggleMode` from `useMode()`
    - No props accepted — all state from context
    - Zero hardcoded hex, rgba, hsl, or pixel values in component code
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.6_

  - [x] 8.2 Implement Top_Nav sub-component within Header
    - Exactly six items in order: Command Centre (`/`), Fusion Map (`/fusion-map`), Vulnerabilities (`/vulnerabilities`), Identity (`/identity`), Architecture (`/architecture`), CISO (`/ciso`)
    - No "Cases" item; CISO item labelled "CISO" (not "CISO Dashboard")
    - Active item detection: exact route path match via `usePathname()`
    - Active item: Gold underline using `semanticTokens.brand.gold` at `componentTokens.topNavUnderline` (2px) thickness
    - Inactive items: no Gold in any state (default, hover, focus)
    - When no item matches current route: no Gold underline on any item
    - Text: `componentTokens.topNavTextSize` (14px) / `componentTokens.topNavTextWeight` (500)
    - Item height: `componentTokens.topNavItemHeight` (44px)
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8_

  - [x] 8.3 Implement Search sub-component within Header
    - Width: `componentTokens.searchWidth` (440px) — no adjacent element may reduce below this value
    - Leading icon: `getIcon('search')`, 18–20px, `fill="none"`, `stroke="currentColor"`, `strokeWidth` 1.75
    - Trailing hint: static `⌘K` text at trailing edge of field interior
    - Border: `semanticTokens.input.border`; Background: `semanticTokens.input.background`; Text: `semanticTokens.input.text`
    - Fallback on token resolution failure: dark mode token values
    - `aria-label="Global search"` on input element
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

  - [x] 8.4 Implement Commander_AI_Action sub-component within Header
    - One Lucide icon from permitted set via `getIcon('commander-ai')` (Sparkles) + visible text label "Commander AI"
    - Horizontal padding: ≤ 12px per side
    - No emoji, no Gold on background/border/icon in any state, no multi-line wrap
    - Icon: monochrome `currentColor`, 18–20px
    - Accessible name derived from visible text label "Commander AI" (no separate aria-label needed)
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6_

  - [x] 8.5 Implement Theme_Toggle sub-component within Header
    - Single icon: `getIcon('theme-dark')` (Moon) in mission mode; `getIcon('theme-light')` (Sun) in standard mode
    - Never render both icons simultaneously
    - No label, no bordered box, no background fill (remove previous Mission-mode toggle box styling)
    - Icon: `currentColor`, 18–20px
    - `aria-label` reflects the mode that will be activated on next click (e.g. "Switch to Standard mode")
    - Calls `toggleMode()` from `useMode()` on pointer click or keyboard Enter/Space
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7_

  - [x] 8.6 Implement Notification_Bell sub-component within Header
    - `getIcon('notification-bell')` (Bell), monochrome `currentColor`
    - `aria-label="Notifications"` on button element
    - Badge: red, shows unread count (capped at 99; displays "99+" for counts above 99); hidden when count is 0
    - Count source: user-routed notifications only (direct assignment, team, role, permission group, asset/case/control/tool ownership, escalation, mention)
    - No backend yet: use `mockNotificationService` with static count of 3
    - Define `NotificationService` interface: `getUnreadCount(): Promise<number>` and `subscribe(callback): () => void`
    - Component accepts `NotificationService` prop defaulting to mock — real backend wired later without component changes
    - Re-renders badge on data source update without full page reload
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7_

  - [x] 8.7 Implement User_Profile_Block sub-component within Header
    - Display name: max 30 characters, truncated with ellipsis if longer
    - Initials block: max 3 characters derived from display name
    - Avatar image replaces initials if available
    - No multi-line wrap
    - Minimum width: 120px; minimum height: `componentTokens.topbarHeight`
    - Role line: shown if available; hidden (no placeholder) if not available
    - 1px left separator using `semanticTokens.chrome.separator` immediately to the left of this block
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6_

  - [ ]* 8.8 Write property test for Top_Nav item set is exactly the specified six (Property 8)
    - **Property 8: Top_Nav item set is exactly the specified six, in order**
    - Generator: `fc.record({ route: fc.string(), collapsed: fc.boolean(), mode: fc.constantFrom('standard', 'mission') })`
    - Verify: exactly six items with labels `["Command Centre", "Fusion Map", "Vulnerabilities", "Identity", "Architecture", "CISO"]` in that exact order; no "Cases" item; no "CISO Dashboard" item; no fewer or more than six items
    - **Validates: Requirements 11.1, 11.2, 11.3**
    - Tag: `Feature: shell-sidebar-header-rebuild, Property 8: Top_Nav item set is exactly the specified six`

  - [ ]* 8.9 Write property test for active Top_Nav underline is route-exact (Property 9)
    - **Property 9: Active Top_Nav underline is route-exact — Gold on matching item only**
    - Generator: `fc.oneof(fc.constantFrom('/', '/fusion-map', '/vulnerabilities', '/identity', '/architecture', '/ciso'), fc.string())`
    - Verify: Gold underline on at most one item — the item whose path exactly matches current route; no Gold underline on any other item in any state; no Gold underline when no item path matches
    - **Validates: Requirements 11.4, 11.5, 11.8**
    - Tag: `Feature: shell-sidebar-header-rebuild, Property 9: Active Top_Nav underline is route-exact`

  - [ ]* 8.10 Write property test for notification badge count display rule (Property 10)
    - **Property 10: Notification badge count display rule**
    - Generator: `fc.nat()` (non-negative integers including 0, 1–99, >99)
    - Verify: no badge element when `n = 0`; badge displays string representation of `n` when `1 ≤ n ≤ 99`; badge displays `"99+"` when `n > 99`
    - **Validates: Requirements 15.2, 15.3**
    - Tag: `Feature: shell-sidebar-header-rebuild, Property 10: Notification badge count display rule`

  - [ ]* 8.11 Write property test for Header structure — exactly five groups and four separators (Property 12)
    - **Property 12: Header structure — exactly five groups and four separators**
    - Generator: `fc.record({ route: fc.string(), collapsed: fc.boolean(), mode: fc.constantFrom('standard', 'mission') })`
    - Verify: exactly five functional groups in correct order; exactly four 1px separator elements using `semanticTokens.chrome.separator`; one separator between each adjacent pair of groups
    - **Validates: Requirements 10.2, 10.3**
    - Tag: `Feature: shell-sidebar-header-rebuild, Property 12: Header structure — exactly five groups and four separators`

  - [ ]* 8.12 Write property test for Theme_Toggle renders exactly one icon (Property 13)
    - **Property 13: Theme_Toggle renders exactly one icon — never both Sun and Moon**
    - Generator: `fc.constantFrom('standard', 'mission')`
    - Verify: exactly one icon rendered — Moon in mission mode, Sun in standard mode; never both simultaneously
    - **Validates: Requirements 13.1, 13.2, 13.3, 13.4**
    - Tag: `Feature: shell-sidebar-header-rebuild, Property 13: Theme_Toggle renders exactly one icon`

  - [ ]* 8.13 Write property test for User_Profile_Block display name truncation (Property 14)
    - **Property 14: User_Profile_Block display name truncation and initials derivation**
    - Generator: `fc.string({ minLength: 0, maxLength: 60 })` (arbitrary display names)
    - Verify: names ≤ 30 chars rendered in full; names > 30 chars truncated with ellipsis appended; initials block contains at most 3 characters
    - **Validates: Requirements 16.1**
    - Tag: `Feature: shell-sidebar-header-rebuild, Property 14: User_Profile_Block display name truncation and initials derivation`

  - [ ]* 8.14 Write Header snapshot tests
    - Snapshot: Header in standard (light) mode
    - Snapshot: Header in mission (dark) mode
    - _Requirements: 10.2, 10.3_

- [ ] 9. Gold Restriction and Cross-Cutting Property Tests
  - [ ]* 9.1 Write property test for Gold restriction invariant (Property 3)
    - **Property 3: Gold restriction invariant**
    - Generator: `fc.record({ route: fc.string(), collapsed: fc.boolean(), mode: fc.constantFrom('standard', 'mission') })`
    - Verify: Gold (`primitiveBrand.gold` / `#ffd21f`) appears in exactly two locations — (1) `COMMANDER` text in Brand_Block wordmark, (2) underline of currently active Top_Nav item; Gold does NOT appear on sidebar active items, collapse footer, Commander AI button, theme toggle, notification bell, nav icons, badges, or hover states
    - **Validates: Requirements 4.6, 5.4, 5.5, 7.6, 11.4, 11.5, 14.4, 19.1, 19.2, 19.3**
    - Tag: `Feature: shell-sidebar-header-rebuild, Property 3: Gold restriction invariant`

- [ ] 10. layout.tsx Wiring Update
  - [x] 10.1 Update `apps/web/src/app/layout.tsx` to wire new Shell, Sidebar and Header
    - Preserve `SidebarProvider` wrapping `ModeProvider` wrapping `Shell` nesting order exactly
    - Update `Shell` import to point to new `@/components/shell` (which now imports `Sidebar` and `Header` internally)
    - Remove any direct imports of `OperationalSidebar` or `OperationalTopBar` from layout.tsx
    - Changes limited to: `SidebarProvider` wiring, `ModeProvider` wiring, `Shell` composition, font declarations, `metadata` export — no other modifications
    - Confirm `OPERATIONAL_NAV_GROUPS`, `TOP_NAV_WORKSPACES`, `CONTROL_PLANE_NAV_ITEMS`, `controlPlaneRoutes`, `tenantAdminRoutes` are all unchanged
    - _Requirements: 21.1, 21.2, 21.5, 21.6_

  - [ ]* 10.2 Write integration test for layout.tsx provider nesting preservation
    - Verify `SidebarProvider > ModeProvider > Shell` nesting order is preserved after rebuild
    - Verify `OPERATIONAL_NAV_GROUPS`, `TOP_NAV_WORKSPACES`, `CONTROL_PLANE_NAV_ITEMS` are unchanged after rebuild
    - _Requirements: 21.1, 21.6_

- [ ] 11. Accessibility Checks
  - [ ]* 11.1 Write accessibility unit tests for all interactive shell elements
    - Sidebar collapse trigger: `aria-label` updates on state change (expanded → "Collapse sidebar"; collapsed → "Expand sidebar")
    - Theme_Toggle: `aria-label` reflects next action (e.g. "Switch to Standard mode" / "Switch to Mission mode")
    - Notification_Bell: `aria-label="Notifications"` present
    - Nav_Group buttons: `aria-expanded` attribute reflects expansion state
    - Commander_AI_Action: accessible name derived from visible text "Commander AI"
    - All interactive elements have accessible names (aria-label or visible text)
    - Keyboard navigation: Enter/Space activates Nav_Group toggle and collapse trigger
    - No focus traps introduced by shell chrome
    - _Requirements: 13.5, 14.6, 15.1_

- [ ] 12. localStorage Persistence Integration Tests
  - [ ]* 12.1 Write integration tests for localStorage persistence
    - Collapse state survives simulated page reload (read from `commander-sdr.sidebar.collapsed`)
    - Group expansion state survives simulated page reload (read from `commander-sdr.sidebar.<groupId>.expanded`)
    - Workspace mode persists in localStorage (read from `commander-sdr.workspace-mode`)
    - Default state when localStorage unavailable: sidebar expanded, `case-management` group expanded
    - _Requirements: 7.2, 5.8_

- [ ] 13. Route Navigation Integration Tests
  - [ ]* 13.1 Write integration tests for route-driven active state
    - Active Top_Nav item updates when route changes
    - Active Sidebar item updates when route changes
    - Route registry entries (`OPERATIONAL_NAV_GROUPS`, `TOP_NAV_WORKSPACES`, `CONTROL_PLANE_NAV_ITEMS`) are unchanged after rebuild
    - _Requirements: 11.4, 5.4, 5.5, 21.1_

- [x] 14. Final Checkpoint — All tests pass
  - Ensure all property-based tests (Properties 1–16) pass with minimum 100 iterations each
  - Ensure all smoke tests, unit tests, snapshot tests, integration tests and accessibility checks pass
  - Confirm zero hardcoded values in Shell, Sidebar, Header component source (Property 2 and Property 16 pass)
  - Confirm `OperationalSidebar` and `OperationalTopBar` are no longer imported anywhere in the shell chain
  - Confirm no files under `apps/web/src/app/` were modified (except layout.tsx within permitted scope)
  - Confirm no registry files were modified
  - Ask the user if questions arise before closing


---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP pass, but all 16 property tests are strongly recommended before promotion
- Each task references specific requirements for traceability back to `requirements.md`
- Checkpoints (tasks 3, 7, 14) ensure incremental validation at natural break points
- **Build-pack discipline**: token tasks (1–2) are prerequisites for all component tasks (4–10); Icon_Map (task 4) is a prerequisite for Sidebar (task 6) and Header (task 8)
- **No application code authorised during initial Kiro pack validation** — tasks are structured as spec/scaffold tasks only
- **Registry immutability**: `OPERATIONAL_NAV_GROUPS`, `TOP_NAV_WORKSPACES`, `CONTROL_PLANE_NAV_ITEMS`, `controlPlaneRoutes`, `tenantAdminRoutes` must not be modified by any task in this spec
- **Gold restriction**: Gold (`#ffd21f`) is authorised in exactly two locations — `COMMANDER` wordmark text and active Top_Nav underline. All other uses are prohibited
- **Sidebar top offset**: the new Sidebar starts at `top: 0` (full viewport height), not `top: topbarHeight` as in the current implementation
- **Hardcoded value removal**: the current `operational-sidebar.tsx` and `operational-top-bar.tsx` contain hardcoded `rgba()`, hex and pixel values — these files are replaced entirely by the new components; they are not patched
- Property tests use `fast-check` (already a dev dependency or to be added to `packages/ui` or `apps/web` test setup)
- Snapshot tests use Vitest + `@testing-library/react`

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "2.1", "2.2", "2.3"] },
    { "id": 2, "tasks": ["2.4", "4.1"] },
    { "id": 3, "tasks": ["4.2", "4.3"] },
    { "id": 4, "tasks": ["4.4", "4.5", "5.1"] },
    { "id": 5, "tasks": ["5.2", "6.1"] },
    { "id": 6, "tasks": ["5.3", "5.4", "5.5", "5.6", "6.2", "6.3"] },
    { "id": 7, "tasks": ["6.4", "6.5"] },
    { "id": 8, "tasks": ["6.6", "6.7", "6.8", "6.9", "6.10", "8.1"] },
    { "id": 9, "tasks": ["8.2", "8.3", "8.4", "8.5", "8.6", "8.7"] },
    { "id": 10, "tasks": ["8.8", "8.9", "8.10", "8.11", "8.12", "8.13", "8.14", "9.1"] },
    { "id": 11, "tasks": ["10.1"] },
    { "id": 12, "tasks": ["10.2", "11.1", "12.1", "13.1"] }
  ]
}
```
