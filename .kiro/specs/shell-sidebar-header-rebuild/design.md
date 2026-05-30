# Design Document — Shell, Sidebar & Header Rebuild

## Overview

This document describes the technical design for the Commander SDR shell, sidebar and header rebuild. The goal is to replace the current single overloaded top bar with a clean three-zone layout: a persistent vertical sidebar (primary navigation authority), a dedicated horizontal header (section navigation, search, utility actions), and an unchanged main workspace content area.

The rebuild is a **shell and navigation refactoring only**. No routes, page content, data models, dashboard logic, charting, case logic or table data logic change. All layout dimensions, colours and spacing are driven exclusively through the three-layer token system (primitive → semantic → component). Zero hardcoded values are permitted in component code.

### Current Problems Being Solved

| Problem | Root Cause | Fix |
|---|---|---|
| Logo clipping | Brand block in top bar, no dedicated space | Move brand to sidebar Brand_Block |
| Navigation wrapping | Top bar owns both brand + nav + tools | Sidebar owns primary nav; header owns section nav |
| Search compression | Search competes with nav items in top bar | Header dedicates a fixed-width zone to search |
| Header overcrowding | All utilities crammed into one bar | Five-group header with explicit separators |
| Hardcoded widths | `248px`/`68px` literals in shell and sidebar | Token-driven: `sidebarWidth: 264px`, `sidebarRail: 72px` |
| Gold overuse | Gold on active sidebar items, hamburger, badges | Gold restricted to COMMANDER wordmark + active Top_Nav underline |
| Emoji icons | `☰` hamburger, `⌂` home, `⌄` chevron | All icons via Lucide through central Icon_Map |
| Sidebar starts at 56px top | `top: topbarHeight` offset | Sidebar starts at `top: 0`, owns full viewport height |

---

## Architecture

### Three-Zone Layout Model

```
┌─────────────────────────────────────────────────────────────┐
│  SIDEBAR (fixed, full height)  │  HEADER (fixed, top-right) │
│  ┌──────────────────────────┐  │  ┌─────────────────────────┤
│  │  Brand_Block (fixed top) │  │  │ TopNav│Search│AI+Toggle │
│  ├──────────────────────────┤  │  │       │      │Bell│User  │
│  │  Scrollable_Menu         │  ├──┴─────────────────────────┤
│  │  (overflows independently)│  │  WORKSPACE (scrollable)    │
│  │                          │  │  {children}                │
│  ├──────────────────────────┤  │                            │
│  │  Collapse_Footer (fixed) │  │                            │
│  └──────────────────────────┘  └────────────────────────────┘
└─────────────────────────────────────────────────────────────┘
```

The layout uses CSS fixed positioning throughout:

- **Sidebar**: `position: fixed; left: 0; top: 0; bottom: 0; width: <token>`
- **Header**: `position: fixed; top: 0; left: <sidebarWidth>; right: 0; height: <topbarHeight>`
- **Workspace**: `position: fixed; top: <topbarHeight>; left: <sidebarWidth>; right: 0; bottom: 0; overflow-y: auto`

The Shell component manages the `left` offset and `width` of the Header and Workspace by reading `collapsed` from `SidebarContext` and resolving the appropriate token (`sidebarWidth` or `sidebarRail`). Transitions use `primitiveMotion.standard` (180ms ease-out).

### Token Layer Architecture

```
primitives.ts  (Layer 1 — raw values, no component references)
     ↓
semantic.ts    (Layer 2 — mode-overridable meaning mappings)
     ↓
components.ts  (Layer 3 — per-component pinned dimensions)
     ↓
Shell / Sidebar / Header components (consume tokens only)
```

No component or page file may reference a primitive token directly. All colour, spacing, sizing and motion values flow through this chain.

### Context Dependency Graph

```
SidebarProvider (collapse state, localStorage)
  └── ModeProvider (standard/mission mode, localStorage)
        └── Shell
              ├── Sidebar (reads: collapsed, sidebarWidth, sidebarRail, semantic tokens)
              └── Header  (reads: collapsed, sidebarWidth, sidebarRail, mode, semantic tokens)
                    └── Workspace {children}
```

The nesting order `SidebarProvider > ModeProvider > Shell` is preserved exactly as in the current `layout.tsx`.

---

## Components and Interfaces

### Shell (`apps/web/src/components/shell.tsx`)

**Responsibility**: Compose the three zones. Compute sidebar-width-dependent offsets. Pass no props to children beyond `{children}` for the workspace.

```typescript
interface ShellProps {
  children: React.ReactNode;
}
```

**Layout logic**:
```typescript
const sidebarWidth = collapsed
  ? componentTokens.sidebarRail   // "72px"
  : componentTokens.sidebarWidth; // "264px"
```

The Shell renders:
1. `<Sidebar />` — fixed, full height, left edge
2. `<Header />` — fixed, top, offset left by `sidebarWidth`
3. `<main>` — fixed, below header, offset left by `sidebarWidth`, `overflow-y: auto`

The `<main>` element receives `{children}` directly with no additional wrapper elements between `<main>` and `{children}`.

**Fallback**: If `sidebarWidth` resolves to a non-positive or non-numeric value, the Shell applies a safe fallback: sidebar `width: 264px`, header `left: 264px`, workspace `left: 264px`. This prevents any zone from having zero width or overlapping another.

---

### Sidebar (`apps/web/src/components/sidebar/index.tsx`)

**Responsibility**: Brand identity, primary navigation, collapse control. Full viewport height. Always dark/navy regardless of workspace mode.

**Internal structure** (three vertically stacked sections):

```
<aside> (position: fixed, top: 0, bottom: 0, left: 0)
  ├── <div class="brand-block">     (flex-shrink: 0, not scrollable)
  ├── <div class="scrollable-menu"> (flex: 1, overflow-y: auto)
  └── <div class="collapse-footer"> (flex-shrink: 0, not scrollable)
```

**Props**: None. Reads `collapsed` from `useSidebarCollapsed()`.

**Brand_Block sub-component**:
- Expanded: Two-line wordmark. Line 1: `COMMANDER` (Gold, `typography.role.logoText` = 22px/700/`primitiveLetterSpacing.display`) + `SDR` (white, same size). Line 2: `Seiertech ®` (`typography.fontSize.sm` = 12px/400).
- Collapsed: Single Gold `C` glyph at `typography.role.logoText` size. If render produces zero pixels, hide completely.
- No Lucide icon, no image asset.
- Font: `primitiveFonts.body` (Inter) exclusively.

**Scrollable_Menu sub-component**:
- Renders all 18 `OPERATIONAL_NAV_GROUPS` entries.
- Expanded: Nav_Group header (icon + label + badge + chevron), expandable sub-items.
- Collapsed: Nav_Group icons only (no labels, no sub-items, no badges).
- Active group: `semanticTokens.sidebar.activeBackground` + increased label contrast.
- Active item: `semanticTokens.sidebar.activeBackground` + 2px left border `semanticTokens.sidebar.activeIndicator`.
- Labels: `white-space: nowrap; overflow: visible` — no truncation.
- Row heights: `componentTokens.sidebarRowHeight` (40px) for groups, `componentTokens.sidebarSubRowHeight` (36px) for sub-items.
- Text: `componentTokens.sidebarNavTextSize` (14px/500) for groups, `componentTokens.sidebarSubNavTextSize` (12px/500) for sub-items.
- Group headers: `componentTokens.sidebarGroupHeaderTextSize` (12px/700).
- Icons: sourced from `Icon_Map`, 18–20px, `strokeWidth` 1.75, `fill="none"`, `stroke="currentColor"`.
- Scrollbar: `semanticTokens.sidebar.scrollbarThumb`, `semanticTokens.sidebar.scrollbarThumbHover`, transparent track. No literal colour values.
- Group expansion state: persisted in `localStorage` per session under `commander-sdr.sidebar.<groupId>.expanded`.

**Collapse_Footer sub-component**:
- Expanded: `ChevronLeft` icon (20px, from Icon_Map) + "Collapse" label. Icon points left.
- Collapsed: `ChevronLeft` icon rotated 180° (points right). No label.
- Transition: `transform` with `primitiveMotion.standard`.
- Colour: `standardTokens.chrome.navText`. No Gold.
- Default state (storage unreadable): expanded.

---

### Header (`apps/web/src/components/header/index.tsx`)

**Responsibility**: Section navigation, search, utility actions. Fixed, top-right of viewport. Always dark/navy regardless of workspace mode.

**Props**: None. Reads `collapsed` from `useSidebarCollapsed()`, `mode`/`toggleMode` from `useMode()`.

**Five-group structure** (left to right):

```
[ Top_Nav ] | [ Search ] | [ Commander_AI + Theme_Toggle ] | [ Bell ] | [ User_Profile ]
```

Four 1px vertical separators between groups, using `semanticTokens.chrome.separator`.

**Top_Nav sub-component**:
- Items (in order): Command Centre (`/`), Fusion Map (`/fusion-map`), Vulnerabilities (`/vulnerabilities`), Identity (`/identity`), Architecture (`/architecture`), CISO (`/ciso`).
- No "Cases" item.
- Active item: Gold underline (`semanticTokens.brand.gold`) at `componentTokens.topNavUnderline` thickness.
- Inactive items: no Gold in any state (default, hover, focus).
- Text: `componentTokens.topNavTextSize` (14px/500).
- Item height: `componentTokens.topNavItemHeight` (44px).
- Active detection: exact route path match via `usePathname()`.

**Search sub-component**:
- Width: `componentTokens.searchWidth` (440px). No adjacent element may reduce this below the token value.
- Leading icon: `Search` from Icon_Map, 18–20px, `fill="none"`, `stroke="currentColor"`, `strokeWidth` 1.75.
- Trailing hint: static `⌘K` text.
- Border: `semanticTokens.input.border`.
- Background: `semanticTokens.input.background`.
- Text: `semanticTokens.input.text`.
- Fallback on token resolution failure: dark mode token values.

**Commander_AI_Action sub-component**:
- One Lucide icon (from permitted set: Sparkles, Bot, BrainCircuit, Command, WandSparkles) + visible text "Commander AI".
- No emoji, no Gold, no multi-line wrap.
- Horizontal padding: ≤ 12px per side.
- Icon: monochrome `currentColor`, 18–20px.
- Accessible name derived from visible text label.

**Theme_Toggle sub-component**:
- Single icon: `Moon` (mission/dark mode) or `Sun` (standard/light mode). Never both simultaneously.
- No label, no bordered box, no background fill.
- Icon: `currentColor`, 18–20px.
- `aria-label` updates to reflect the mode that will be activated on next click.
- Calls `toggleMode()` from `useMode()`.

**Notification_Bell sub-component**:
- `Bell` icon from Icon_Map, monochrome `currentColor`.
- Accessible label: "Notifications".
- Badge: red, shows unread count (capped at 99, displays "99+" above 99). Hidden when count is 0.
- Count source: user-routed notifications only (direct assignment, team, role, permission group, asset/case/control/tool ownership, escalation, mention).
- No backend yet: mock interface with static/seed data. Interface contract defined so real backend can be wired later without component changes.
- Re-renders on data source update without full page reload.

**User_Profile_Block sub-component**:
- Display name (max 30 chars, ellipsis if longer) + initials block (max 3 chars).
- Avatar image replaces initials if available.
- No multi-line wrap.
- Minimum width: 120px. Minimum height: `componentTokens.topbarHeight`.
- Role line: shown if available, hidden (no placeholder) if not.
- Separator: 1px left border using `semanticTokens.chrome.separator`.

---

### Icon_Map (`packages/ui/src/icons/index.ts`)

**Responsibility**: Single source of truth for all Lucide icon assignments. Shell, Sidebar and Header import icons exclusively from here. No direct `lucide-react` imports in those components.

**Interface**:

```typescript
type IconSize = 'nav' | 'utility' | 'inline';
type IconKey = keyof typeof ICON_MAP;

interface IconProps {
  size?: IconSize;       // 'nav' = 20px, 'utility' = 20px, 'inline' = 16px
  className?: string;
  'aria-hidden'?: boolean;
}

function getIcon(key: string, props?: IconProps): React.ReactElement;
```

The typed accessor enforces size and stroke constraints. Consumers cannot bypass these via raw Lucide props.

**Fallback**: If `key` is not in `ICON_MAP`, returns `<Circle />` (Lucide fallback) rather than throwing or rendering nothing.

**Default render attributes** for all icons:
- `fill="none"`
- `stroke="currentColor"`
- `strokeWidth={1.75}`
- Size: resolved from `IconSize` enum (nav/utility = 20px, inline = 16px)

**Navigation module assignments**:

| Module | Primary Icon | Alternatives |
|---|---|---|
| Command Centre | `LayoutDashboard` | Home, Gauge |
| Case Management | `FolderKanban` | Briefcase, Inbox |
| Mission Control | `Radar` | Crosshair, Goal |
| Fusion Map | `Network` | GitBranch, Map |
| Vulnerability Management | `ShieldAlert` | Bug, TriangleAlert |
| Exposure Management | `ScanSearch` | Radar, Globe2 |
| Identity & Access | `Users` | UserCog, KeyRound |
| Architecture | `Blocks` | Network, Building2 |
| Assets | `Server` | Boxes, HardDrive |
| Controls | `ShieldCheck` | ListChecks, ClipboardCheck |
| Coverage | `Radar` | Scan, CircleDot |
| Tool Health | `Activity` | PlugZap, HeartPulse |
| Team Pulse | `UsersRound` | Activity, HeartPulse |
| Domain Pulse | `Globe` | Building2, Network |
| System Pulse | `Activity` | ServerCog, Cpu |
| Platform | `Settings` | — |
| Tenant Admin | `Building` | — |
| Governance | `Scale` | — |
| Reporting | `FileText` | — |

**Header utility icons**:

| Usage | Icon |
|---|---|
| Search | `Search` |
| Theme (light mode) | `Sun` |
| Theme (dark mode) | `Moon` |
| Notification Bell | `Bell` |
| Commander AI Action | `Sparkles` |
| Collapse Footer | `ChevronLeft` |

---

## Data Models

### Token Additions — `packages/ui/src/tokens/components.ts`

The following tokens are added or updated:

```typescript
// Updated values
sidebarWidth: '264px',   // was 248px
sidebarRail: '72px',     // was 68px

// New navigation sizing tokens
topNavTextSize: '14px',
topNavTextWeight: 500,
topNavLineHeight: 1.2,
topNavItemHeight: '44px',
topNavUnderline: '2px',

sidebarNavTextSize: '14px',
sidebarNavTextWeight: 500,
sidebarNavLineHeight: 1.2,
sidebarSubNavTextSize: '12px',
sidebarSubNavTextWeight: 500,
sidebarSubNavLineHeight: 1.2,
sidebarGroupHeaderTextSize: '12px',
sidebarGroupHeaderTextWeight: 700,
sidebarGroupHeaderLineHeight: 1.2,
sidebarRowHeight: '40px',
sidebarSubRowHeight: '36px',

// searchWidth already exists at 440px — within 360–480px range, no change needed
```

### Token Additions — `packages/ui/src/tokens/semantic.ts`

New semantic tokens added to `getSemanticTokens()`:

```typescript
sidebar: {
  background: '#040a11',                          // near-black navy, both modes (mode-invariant)
  scrollbarThumb: 'rgba(255,255,255,0.18)',
  scrollbarThumbHover: 'rgba(255,255,255,0.32)',
  scrollbarTrack: 'transparent',
  activeBackground: 'rgba(255,255,255,0.08)',     // non-Gold, min 10% luminance delta
  activeIndicator: '#4a90d9',                     // non-Gold, blue accent
},
chrome: {
  navText: '#ffffff',                             // existing
  navTextActive: primitiveBrand.gold,             // existing
  separator: 'rgba(255,255,255,0.12)',            // new
},
brand: {
  gold: primitiveBrand.gold,                      // '#ffd21f' — for Top_Nav underline only
},
input: {
  border: mode === 'standard'
    ? 'rgba(24,36,51,0.20)'
    : 'rgba(255,255,255,0.18)',
  background: mode === 'standard'
    ? 'rgba(24,36,51,0.06)'
    : 'rgba(255,255,255,0.07)',
  text: mode === 'standard'
    ? '#182433'
    : '#dce1e7',
},
```

**Light mode sidebar token**: `semanticTokens.sidebar.background` resolves to `#040a11` in **both** standard and mission modes. The sidebar is always dark/navy regardless of workspace mode. This is achieved by making the sidebar background token mode-invariant.

### Shell Surface Tokens (dark/mission mode)

| Token | Value |
|---|---|
| Sidebar background | `#040a11` |
| Header background | `#0d1b2a` |
| Page background | `#040a11` |
| Card/panel background | `#0e1722` |
| Border | `#25384f` |
| Body text | `#dce1e7` |
| Secondary text | `rgba(220,225,231,0.75)` |

### Shell Surface Tokens (light/standard mode)

| Token | Value |
|---|---|
| Page background | `#f6f8fb` |
| Card/panel background | `#ffffff` |
| Card border | `#dce1e7` |
| Body text | `#182433` |
| Secondary text | `rgba(24,36,51,0.75)` |
| Header background | `#ffffff` |
| Sidebar background | `#040a11` (near-black navy — mode-invariant) |

### Notification Mock Interface

```typescript
interface NotificationService {
  getUnreadCount(): Promise<number>;
  subscribe(callback: (count: number) => void): () => void; // returns unsubscribe fn
}

// Mock implementation (used until backend is configured)
const mockNotificationService: NotificationService = {
  getUnreadCount: async () => 3,
  subscribe: (_cb) => () => {},
};
```

The `Notification_Bell` component accepts a `NotificationService` interface, defaulting to the mock. When a real backend is wired, only the service implementation changes — the component is unchanged.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Sidebar width token drives all layout offsets

*For any* sidebar collapsed state (expanded or collapsed), the Shell SHALL compute the Header left offset and Workspace left offset as exactly the value of the corresponding sidebar width token (`componentTokens.sidebarRail` when collapsed, `componentTokens.sidebarWidth` when expanded), and the sidebar rendered width SHALL equal that same token value.

**Validates: Requirements 1.5, 1.6, 3.3, 3.4, 3.5**

---

### Property 2: No hardcoded values in shell component source

*For any* component in the set {Shell, Sidebar, Header}, scanning the component source for literal hex colour values, `rgba()` literals, `hsl()` literals, named CSS colour literals, or pixel dimension literals (other than `0` or `0px`) SHALL return zero matches. All values SHALL be traceable to a token import.

**Validates: Requirements 1.8, 3.3, 3.4, 3.5, 8.6, 17.4, 17.5**

---

### Property 3: Gold restriction invariant

*For any* render state of the Shell (any route path, any sidebar collapsed state, any workspace mode, any nav item active/inactive/hover/focus state), the Gold colour (`primitiveBrand.gold` / `#ffd21f`) SHALL appear in exactly two locations: (1) the "COMMANDER" text in the Brand_Block wordmark, and (2) the underline of the currently active Top_Nav item. In all other elements — including sidebar active items, collapse footer, Commander AI button, theme toggle, notification bell, nav icons, badges, and hover states — Gold SHALL NOT appear.

**Validates: Requirements 4.6, 5.4, 5.5, 7.6, 11.4, 11.5, 14.4, 19.1, 19.2, 19.3**

---

### Property 4: Icon_Map completeness, attributes, and fallback

*For any* navigation module identifier registered in `OPERATIONAL_NAV_GROUPS` or header utility key (Search, Sun, Moon, Bell, Sparkles, ChevronLeft), calling `getIcon(key)` SHALL return a valid React element with `fill="none"`, `stroke="currentColor"`, and `strokeWidth={1.75}`. *For any* string key not present in the Icon_Map, `getIcon(key)` SHALL return the fallback `Circle` icon element rather than throwing an error or returning null/undefined.

**Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.8, 20.4, 20.6, 20.7**

---

### Property 5: Sidebar collapsed state renders icons only — no labels, badges, or sub-items

*For any* Nav_Group in `OPERATIONAL_NAV_GROUPS` when the sidebar is in the collapsed state, the rendered output SHALL contain the group's icon element and SHALL NOT contain any text node for the group label, any Build_Status_Badge element, or any sub-item element.

**Validates: Requirements 2.7, 5.9, 6.3**

---

### Property 6: Sidebar registry fidelity — all groups rendered with correct data

*For any* Nav_Group entry in `OPERATIONAL_NAV_GROUPS`, the expanded sidebar SHALL render that group with a label exactly matching the registry `label` field, sub-items exactly matching the registry `subItems` array (same paths and labels), and a Build_Status_Badge exactly matching the registry `badge` field when present. No group SHALL be omitted, reordered, or have its data modified.

**Validates: Requirements 5.1, 5.2, 5.3, 5.7**

---

### Property 7: Active route styling applied to correct group and item

*For any* current route path, the sidebar SHALL apply `semanticTokens.sidebar.activeBackground` to the Nav_Group whose base path is a prefix of the current route, and SHALL apply `semanticTokens.sidebar.activeBackground` plus a 2px left border using `semanticTokens.sidebar.activeIndicator` to the Nav_Item whose path exactly matches the current route. No other group or item SHALL receive active styling.

**Validates: Requirements 5.4, 5.5**

---

### Property 8: Top_Nav item set is exactly the specified six, in order

*For any* render state of the Header, the Top_Nav SHALL contain exactly six items with labels ["Command Centre", "Fusion Map", "Vulnerabilities", "Identity", "Architecture", "CISO"] in that exact order. The Top_Nav SHALL NOT contain an item with label "Cases" or "CISO Dashboard", and SHALL NOT contain fewer or more than six items.

**Validates: Requirements 11.1, 11.2, 11.3**

---

### Property 9: Active Top_Nav underline is route-exact — Gold on matching item only

*For any* current route path, the Top_Nav SHALL render a Gold underline (using `semanticTokens.brand.gold` at `componentTokens.topNavUnderline` thickness) on at most one item — the item whose path exactly matches the current route — and SHALL render no Gold underline on any other item regardless of hover, focus, or active state. When no item path matches the current route, no Gold underline SHALL appear on any item.

**Validates: Requirements 11.4, 11.5, 11.8**

---

### Property 10: Notification badge count display rule

*For any* non-negative integer `n` representing the user's unread notification count, the Notification_Bell SHALL render: no badge element when `n = 0`; a badge displaying the string representation of `n` when `1 ≤ n ≤ 99`; a badge displaying the string `"99+"` when `n > 99`.

**Validates: Requirements 15.2, 15.3**

---

### Property 11: Sidebar always dark regardless of workspace mode

*For any* workspace mode (standard or mission), the Sidebar background colour SHALL resolve to `semanticTokens.sidebar.background` (near-black navy, `#040a11`), which SHALL have an HSL lightness value at least 10 percentage points lower than the Workspace background and at least 10 percentage points lower than the Header background in that same mode.

**Validates: Requirements 8.1, 8.2, 8.3, 17.3**

---

### Property 12: Header structure — exactly five groups and four separators

*For any* render state of the Header (any route, any collapsed state, any workspace mode), the Header SHALL contain exactly five functional groups in order (Top_Nav, Search, Commander_AI + Theme_Toggle, Notification_Bell, User_Profile_Block) and exactly four 1px vertical separator elements using `semanticTokens.chrome.separator`, one between each adjacent pair of groups.

**Validates: Requirements 10.2, 10.3**

---

### Property 13: Theme_Toggle renders exactly one icon — never both Sun and Moon

*For any* workspace mode, the Theme_Toggle SHALL render exactly one icon: the Lucide Moon icon when the workspace is in mission (dark) mode, and the Lucide Sun icon when the workspace is in standard (light) mode. The Theme_Toggle SHALL NOT render both icons simultaneously under any condition.

**Validates: Requirements 13.1, 13.2, 13.3, 13.4**

---

### Property 14: User_Profile_Block display name truncation and initials derivation

*For any* display name string of length `n`, the User_Profile_Block SHALL render: the full display name when `n ≤ 30`; the display name truncated to 30 characters with an ellipsis appended when `n > 30`. The initials block SHALL contain at most 3 characters derived from the display name.

**Validates: Requirements 16.1**

---

### Property 15: Workspace children pass-through — no intermediate wrappers

*For any* React node passed as `{children}` to the Shell, the Workspace `<main>` element SHALL receive those children directly with no additional wrapper elements inserted between `<main>` and `{children}`.

**Validates: Requirements 21.4**

---

### Property 16: No direct lucide-react imports in Shell, Sidebar, or Header

*For any* component in the set {Shell, Sidebar, Header}, scanning the component source for import statements from `"lucide-react"` SHALL return zero matches. All Lucide icon usage SHALL be imported exclusively from the Icon_Map module at `packages/ui/src/icons/index.ts`.

**Validates: Requirements 20.1, 20.2**

---

## Error Handling

### Token Resolution Failures

**Missing token value**: If a component token resolves to `undefined` or an empty string, the component falls back to the next-most-specific token in the hierarchy. If no fallback exists, the component applies a safe default (e.g., sidebar width falls back to `264px`, colours fall back to dark mode values).

**Non-numeric dimension**: If `sidebarWidth` or `sidebarRail` resolves to a non-positive or non-numeric value, the Shell applies the fallback layout: sidebar `width: 264px`, header `left: 264px`, workspace `left: 264px`. No zone is hidden or overlapping.

### Icon Load Failures

**Missing Icon_Map key**: `getIcon()` returns the Lucide `Circle` fallback icon. No error is thrown. The sidebar renders the fallback icon within the same 200ms window as other icons.

**Lucide component render error**: Wrapped in an error boundary at the Icon_Map level. The fallback renders a `Circle` icon.

### Sidebar State Initialisation

**localStorage unavailable or corrupt**: `SidebarContext` defaults to `collapsed: false` (expanded). The Collapse_Footer displays "Collapse" label. No error is surfaced to the user.

**Group expansion state unreadable**: Individual group defaults to collapsed. The `DEFAULT_EXPANDED_GROUP` (`case-management`) defaults to expanded.

### Notification Service

**Mock service**: Always returns a static count. No network errors possible.

**Future real service**: If the service call fails, the bell renders without a badge (count treated as 0). The error is logged but not surfaced to the user.

### Brand_Block Compact Representation

If the collapsed `C` glyph produces zero visible pixels or a render error, the Brand_Block is hidden completely rather than showing a broken state (per Requirement 4.5).

---

## Testing Strategy

### PBT Applicability Assessment

This feature involves UI shell components (React, CSS layout, token resolution) with significant pure logic layers: token resolution, icon map lookups, notification count formatting, route-active detection, and layout offset computation. These pure logic layers are well-suited to property-based testing. UI rendering and layout concerns are better served by snapshot and example-based tests.

**PBT IS applicable** for:
- Token resolution and offset computation (pure functions)
- Icon_Map lookup and fallback logic (pure function)
- Notification badge count formatting (pure function)
- Route-active detection (pure function)
- Gold restriction audit (static analysis / property scan)
- Registry fidelity (data integrity across all registry entries)

**PBT IS NOT applicable** for:
- CSS layout rendering (use snapshot tests)
- React component tree structure (use snapshot tests)
- localStorage persistence (use example-based integration tests)
- Token value definitions (use smoke tests — single assertion)

**PBT library**: [fast-check](https://github.com/dubzzz/fast-check) (TypeScript-native, compatible with Vitest/Jest).

### Smoke Tests

Single-execution checks for token value definitions:

- `componentTokens.sidebarWidth === '264px'`
- `componentTokens.sidebarRail === '72px'`
- `componentTokens.sidebarWidth >= '256px'` (minimum for label accommodation)
- All six sidebar semantic tokens are defined and non-empty
- All seven navigation sizing tokens are defined with exact specified values
- All required dark and light mode shell surface tokens are defined
- Icon_Map module exists and exports `getIcon` function

### Unit Tests (Example-Based)

Focus on specific examples, edge cases and integration points:

- Shell renders three zones with correct CSS properties for both collapsed states
- Sidebar Brand_Block renders correct wordmark in expanded state (COMMANDER Gold, SDR white, Seiertech ®)
- Sidebar Brand_Block renders single Gold "C" in collapsed state
- Sidebar Brand_Block hides completely on render error
- Sidebar Collapse_Footer renders ChevronLeft pointing left when expanded, rotated 180° when collapsed
- Sidebar Collapse_Footer shows "Collapse" label when expanded, no label when collapsed
- Header renders exactly five groups with four separators
- Top_Nav renders exactly six items in correct order
- Top_Nav does not render "Cases" or "CISO Dashboard"
- Theme_Toggle renders Moon in mission mode, Sun in standard mode
- Theme_Toggle does not render both icons simultaneously
- Theme_Toggle aria-label updates on mode change
- Commander_AI_Action renders one icon + "Commander AI" text, no wrap
- User_Profile_Block truncates display names longer than 30 characters
- User_Profile_Block renders initials when no avatar is available
- User_Profile_Block renders avatar when available
- User_Profile_Block shows role when available, hides role line when not
- Notification_Bell renders no badge when count is 0
- Notification_Bell renders "99+" when count exceeds 99
- Icon_Map returns Circle fallback for unknown keys without throwing
- layout.tsx preserves SidebarProvider > ModeProvider > Shell nesting
- Nav_Group toggle: click expands, click again collapses, localStorage updated
- Search field renders Search icon, ⌘K hint, correct width

### Property-Based Tests

Each property test runs a minimum of 100 iterations. Tag format: `Feature: shell-sidebar-header-rebuild, Property {N}: {property_text}`

**Property 1** — Sidebar width token drives all layout offsets
- Generator: `fc.boolean()` (collapsed state)
- Verify: Header left offset === sidebar width token; Workspace left offset === same; sidebar rendered width === same
- Tag: `Feature: shell-sidebar-header-rebuild, Property 1: Sidebar width token drives all layout offsets`

**Property 2** — No hardcoded values in shell component source
- Generator: static analysis (no random input needed — source is fixed)
- Verify: zero matches for hex literals, rgba(), hsl(), named colours, pixel literals in Shell/Sidebar/Header source
- Tag: `Feature: shell-sidebar-header-rebuild, Property 2: No hardcoded values in shell component source`

**Property 3** — Gold restriction invariant
- Generator: `fc.record({ route: fc.string(), collapsed: fc.boolean(), mode: fc.constantFrom('standard', 'mission') })`
- Verify: Gold appears in exactly {COMMANDER text, active Top_Nav underline} and nowhere else
- Tag: `Feature: shell-sidebar-header-rebuild, Property 3: Gold restriction invariant`

**Property 4** — Icon_Map completeness, attributes, and fallback
- Generator: `fc.oneof(fc.constantFrom(...ICON_MAP_KEYS), fc.string())` (known and unknown keys)
- Verify: known keys return element with fill="none", stroke="currentColor", strokeWidth=1.75; unknown keys return Circle
- Tag: `Feature: shell-sidebar-header-rebuild, Property 4: Icon_Map completeness, attributes, and fallback`

**Property 5** — Sidebar collapsed state renders icons only
- Generator: `fc.constantFrom(...OPERATIONAL_NAV_GROUPS)` with collapsed=true
- Verify: icon present, no label text node, no badge, no sub-items
- Tag: `Feature: shell-sidebar-header-rebuild, Property 5: Sidebar collapsed state renders icons only`

**Property 6** — Sidebar registry fidelity
- Generator: `fc.constantFrom(...OPERATIONAL_NAV_GROUPS)` (each group)
- Verify: rendered label, sub-items, badge match registry exactly
- Tag: `Feature: shell-sidebar-header-rebuild, Property 6: Sidebar registry fidelity`

**Property 7** — Active route styling applied to correct group and item
- Generator: `fc.constantFrom(...all_nav_paths)` (all paths from registry)
- Verify: active styling on correct group/item, no active styling on others
- Tag: `Feature: shell-sidebar-header-rebuild, Property 7: Active route styling applied to correct group and item`

**Property 8** — Top_Nav item set is exactly the specified six
- Generator: `fc.record({ route: fc.string(), collapsed: fc.boolean(), mode: fc.constantFrom('standard', 'mission') })`
- Verify: exactly six items, correct labels in correct order, no "Cases", no "CISO Dashboard"
- Tag: `Feature: shell-sidebar-header-rebuild, Property 8: Top_Nav item set is exactly the specified six`

**Property 9** — Active Top_Nav underline is route-exact
- Generator: `fc.oneof(fc.constantFrom('/', '/fusion-map', '/vulnerabilities', '/identity', '/architecture', '/ciso'), fc.string())`
- Verify: Gold underline on matching item only; no Gold when no match
- Tag: `Feature: shell-sidebar-header-rebuild, Property 9: Active Top_Nav underline is route-exact`

**Property 10** — Notification badge count display rule
- Generator: `fc.nat()` (non-negative integers including 0, 1–99, >99)
- Verify: no badge for 0; badge shows n for 1–99; badge shows "99+" for n>99
- Tag: `Feature: shell-sidebar-header-rebuild, Property 10: Notification badge count display rule`

**Property 11** — Sidebar always dark regardless of workspace mode
- Generator: `fc.constantFrom('standard', 'mission')`
- Verify: sidebar background HSL lightness ≥ 10pp lower than workspace and header backgrounds
- Tag: `Feature: shell-sidebar-header-rebuild, Property 11: Sidebar always dark regardless of workspace mode`

**Property 12** — Header structure — exactly five groups and four separators
- Generator: `fc.record({ route: fc.string(), collapsed: fc.boolean(), mode: fc.constantFrom('standard', 'mission') })`
- Verify: exactly five groups in correct order, exactly four separator elements
- Tag: `Feature: shell-sidebar-header-rebuild, Property 12: Header structure — exactly five groups and four separators`

**Property 13** — Theme_Toggle renders exactly one icon
- Generator: `fc.constantFrom('standard', 'mission')`
- Verify: exactly one of Sun/Moon rendered, never both
- Tag: `Feature: shell-sidebar-header-rebuild, Property 13: Theme_Toggle renders exactly one icon`

**Property 14** — User_Profile_Block display name truncation and initials derivation
- Generator: `fc.string({ minLength: 0, maxLength: 60 })` (arbitrary display names)
- Verify: names ≤ 30 chars rendered in full; names > 30 chars truncated with ellipsis; initials ≤ 3 chars
- Tag: `Feature: shell-sidebar-header-rebuild, Property 14: User_Profile_Block display name truncation and initials derivation`

**Property 15** — Workspace children pass-through
- Generator: `fc.anything()` (arbitrary React-compatible children)
- Verify: children passed directly to `<main>` with no intermediate wrapper elements
- Tag: `Feature: shell-sidebar-header-rebuild, Property 15: Workspace children pass-through`

**Property 16** — No direct lucide-react imports in Shell, Sidebar, or Header
- Generator: static analysis (no random input needed)
- Verify: zero `import ... from 'lucide-react'` statements in Shell/Sidebar/Header source files
- Tag: `Feature: shell-sidebar-header-rebuild, Property 16: No direct lucide-react imports in Shell, Sidebar, or Header`

### Snapshot Tests

- Shell layout snapshot (expanded state)
- Shell layout snapshot (collapsed state)
- Sidebar expanded snapshot
- Sidebar collapsed snapshot
- Header snapshot (standard mode)
- Header snapshot (mission mode)
- Brand_Block expanded snapshot
- Brand_Block collapsed snapshot

### Integration Tests

- localStorage persistence: collapse state survives simulated page reload
- localStorage persistence: group expansion state survives simulated page reload
- Mode toggle: workspace mode persists in localStorage
- Route navigation: active Top_Nav item updates on route change
- Route navigation: active Sidebar item updates on route change
- Route registry: OPERATIONAL_NAV_GROUPS, TOP_NAV_WORKSPACES, CONTROL_PLANE_NAV_ITEMS unchanged after rebuild

### Accessibility Checks

- All interactive elements have accessible names (aria-label or visible text)
- Sidebar collapse trigger: `aria-label` updates on state change
- Theme_Toggle: `aria-label` reflects next action
- Notification_Bell: `aria-label` identifies as notification bell
- Nav_Group buttons: `aria-expanded` reflects expansion state
- Keyboard navigation: Enter/Space activates Nav_Group toggle and collapse trigger
- Focus management: no focus traps introduced by shell chrome
