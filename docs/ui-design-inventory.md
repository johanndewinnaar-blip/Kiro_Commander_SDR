# Commander SDR — UI & Design System Inventory

**Generated:** Documentation-only audit of `apps/web/src/` and `packages/ui/src/tokens/`  
**Version:** v1.3.2 (DS-1.0)  
**Status:** READ-ONLY inventory — no source files modified

---

## 1. TYPOGRAPHY

### 1.1 Font Families

| Token | Value | Defined In |
|-------|-------|-----------|
| `body` | `'Inter', system-ui, sans-serif` (via `var(--font-body)`) | `tokens/typography.ts`, `tokens/primitives.ts` |
| `display` | `'Bebas Neue', Impact, sans-serif` (via `var(--font-display)`) | `tokens/typography.ts`, `tokens/primitives.ts` |
| `mono` | `'JetBrains Mono', ui-monospace, monospace` | `tokens/primitives.ts` |

**CSS Variables declared in `app/layout.tsx`:**
- `--font-body` → Inter (weights: 400, 500, 600, 700, 800)
- `--font-display` → Bebas Neue (weight: 400)

### 1.2 Font Sizes (Type Scale)

| Token | Value | Usage |
|-------|-------|-------|
| `displayLg` | 24px | Large display headings |
| `display` | 22px | Brand wordmark (SEIERTECH, COMMANDER, SDR) |
| `h1` | 24px | Page headings (note: actual usage is 22px via `primitiveTypeScale.h1`) |
| `h2` | 18px | Section headings, case detail title |
| `h3` | 14px | Card titles, section labels |
| `body` | 13px | Base body text (v1.3.2 Req 3) |
| `caption` | 12px | Secondary labels, metadata |
| `micro` | 11px | Eyebrows, badges, timestamps |
| `kpiValue` | 22px | KPI tile large value |

**Legacy typography tokens** (in `tokens/typography.ts`):

| Token | Value | Usage |
|-------|-------|-------|
| `fontSize.xs` | 10px | Role labels, muted metadata |
| `fontSize.sidebarSub` | 11.4px | Sidebar sub-items |
| `fontSize.sm` | 12px | User name, secondary labels |
| `fontSize.base` | 13px | Base body text |
| `fontSize.md` | 14px | Primary content |
| `fontSize.brandSm` | 21px | Brand wordmark SEIERTECH |
| `fontSize.h1` | 22px | Page heading h1 |
| `fontSize.brandLg` | 23px | Brand wordmark COMMANDER/SDR |

### 1.3 Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `normal` | 400 | Body text, standard labels |
| `medium` | 500 | MetaItem values, secondary emphasis |
| `semibold` | 600 | Card titles, section headers, nav tabs |
| `bold` | 700 | Page headings, sidebar group headers, priority indicators |
| `extrabold` | 800 | Commander AI button, control plane nav items |

### 1.4 Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `body` / `normal` | 1.45 | Body text, paragraphs, descriptions |
| `heading` / `tight` | 1.2 | Page headings (h1) |
| `denseTable` | 1.3 | Table rows |
| `relaxed` | 1.75 | Relaxed content |

### 1.5 Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `normal` | 0 | Standard body text |
| `eyebrow` | 0.06em | Uppercase eyebrows, card titles, section labels |
| `badge` | 0.08em | Badge text |
| `display` | 0.09em | Display font — brand wordmark |
| `displayWide` | 0.11em | Display font — brand large variant |

---

## 2. COLOURS

### 2.1 Brand / Navy Chrome

| Token | Hex | Usage |
|-------|-----|-------|
| `navy.primary` / `primitiveBrand.navy` | `#061936` | Top bar, primary chrome |
| `navy.variant` / `primitiveBrand.navy2` | `#071f43` | Brand area gradient start |
| `navy.sidebar` | `#06152d` | Sidebar gradient start |
| `navy.sidebarEnd` | `#030e1e` | Sidebar gradient terminus |
| `navy.ink` | `#0e1d32` | Ink text on light backgrounds |

### 2.2 Gold Accent

| Token | Value | Usage |
|-------|-------|-------|
| `gold.primary` / `primitiveBrand.gold` | `#ffd21f` | THE gold accent — never substitute |
| `gold.border` | `rgba(255,210,31,.75)` | Commander AI button border |
| `gold.subtle` | `rgba(255,210,31,.24)` | Tenant admin top bar border |
| `gold.tint` | `rgba(255,210,31,.055)` | Active tab background tint |
| `gold.divider` | `rgba(255,210,31,.16)` | Sidebar sub-item left border |
| `gold.badge` | `rgba(255,210,31,.4)` | Badge borders, sidebar badges |
| `gold.scrollThumb` | `rgba(255,210,31,.55)` | Custom scrollbar thumb |
| `gold.activeBorder` | `rgba(255,210,31,.45)` | Active nav item border |
| `gold.activeBackground` | `rgba(255,210,31,.08)` | Active nav item background |
| `gold.hoverBorder` | `rgba(255,210,31,.18)` | Hover state border |
| `gold.hoverBackground` | `rgba(255,210,31,.07)` | Hover state background |

### 2.3 Operational App Surfaces (Standard/Light Mode)

| Token | Hex | Usage |
|-------|-----|-------|
| `operational.page` / `primitiveNeutral[50]` | `#f2f5f9` | Page background |
| `operational.panel` / `primitiveNeutral[0]` | `#ffffff` | Card/panel background |
| `operational.ink` / `primitiveNeutral[900]` | `#0e1d32` | Primary text |
| `operational.line` / `primitiveNeutral[300]` | `#dbe3ef` | Borders, dividers |
| `operational.muted` / `primitiveNeutral[500]` | `#68758b` | Secondary/body text |
| `operational.eyebrow` | `#8498b0` | Breadcrumb, metadata |

### 2.4 Mission Mode (HUD/Dark) Surfaces

| Token | Value | Usage |
|-------|-------|-------|
| `primitiveHud.bg0` | `#050b16` | Deepest background (War Room) |
| `primitiveHud.bg1` | `#08111f` | Primary surface |
| `primitiveHud.bg2` | `#0c1828` | Secondary surface |
| `primitiveHud.bg3` | `#122236` | Elevated surface |
| `primitiveHud.line` | `rgba(255,255,255,0.10)` | Subtle border |
| `primitiveHud.line2` | `rgba(255,255,255,0.16)` | Default border |
| `primitiveHud.text0` | `#e8f0fb` | Primary text |
| `primitiveHud.text1` | `#aebfd4` | Secondary text |
| `primitiveHud.text2` | `#6f8198` | Muted text |

### 2.5 Commercial Control Plane Surfaces

| Token | Hex | Usage |
|-------|-----|-------|
| `controlPlane.background` | `#0d0d0d` | Page background |
| `controlPlane.panel` | `#111111` | Card/panel background |
| `controlPlane.text` | `#f4f4f4` | Primary text |
| `controlPlane.line` | `#2a2a2a` | Borders |
| `controlPlane.muted` | `#999999` | Secondary text |
| `controlPlane.black` | `#0a0a0a` | Deepest black |
| `controlPlane.topBar` | `#050505` | Top bar background |

### 2.6 Chrome Translucent Overlays

| Token | Value | Usage |
|-------|-------|-------|
| `chrome.lineDark` | `rgba(255,255,255,.14)` | Chrome dividers, border-right on brand area |
| `chrome.searchBg` | `rgba(255,255,255,.075)` | Search input background |
| `chrome.searchBorder` | `rgba(255,255,255,.24)` | Search input border |
| `chrome.textMuted` | `rgba(255,255,255,.7)` | Chrome muted text |
| `chrome.textSubtle` | `rgba(185,210,238,.72)` | Chrome subtle text |
| `chrome.textHeading` | `rgba(220,235,255,.82)` | Chrome heading text |

### 2.7 Status Colours

| Token | Hex | Usage |
|-------|-----|-------|
| `status.live` / `primitiveSignal.success` | `#1a7a3f` | Active, healthy, resolved |
| `status.build` | `#ffd21f` | In progress, building (gold) |
| `status.scaffold` | `#68758b` | Planned, scaffold (muted) |
| `status.stub` | `#475569` | Stub, placeholder |
| `status.critical` / `primitiveSignal.critical` | `#d92d20` | P0, critical, emergency |
| `status.warning` / `primitiveSignal.warning` | `#e8a317` | Warning, attention needed |
| `status.info` / `primitiveSignal.info` | `#2563aa` | Informational |
| `primitiveSignal.neutral` | `#68758b` | Neutral/flat trend |

### 2.8 Priority Colours

| Priority | Hex | Shape |
|----------|-----|-------|
| P0 | `#d92d20` | ◆ |
| P1 | `#e8531f` | ▲ |
| P2 | `#e8a317` | ● |
| P3 | `#2563aa` | ○ |
| P4 | `#68758b` | □ |

### 2.9 Data Palette (Charts — colour-blind safe, n=8)

| Token | Hex | Usage |
|-------|-----|-------|
| `primitiveData[1]` | `#2563aa` | Primary chart colour |
| `primitiveData[2]` | `#e8a317` | Secondary chart colour |
| `primitiveData[3]` | `#1a7a3f` | Tertiary chart colour |
| `primitiveData[4]` | `#b5446e` | Chart colour 4 |
| `primitiveData[5]` | `#4ba3c3` | Chart colour 5 |
| `primitiveData[6]` | `#c2611f` | Chart colour 6 |
| `primitiveData[7]` | `#7a5cc2` | Chart colour 7 |
| `primitiveData[8]` | `#8a8f98` | Chart colour 8 |

### 2.10 OODA Phase Colours

| Phase | Hex |
|-------|-----|
| Observe | `#2563aa` |
| Orient | `#4ba3c3` |
| Decide | `#e8a317` |
| Act | `#1a7a3f` |

### 2.11 Connector Class Colours

| Class | Hex |
|-------|-----|
| A (SOC Telemetry) | `#2563aa` |
| B (Operational Verdict) | `#4ba3c3` |
| C (Configuration State) | `#7a5cc2` |
| D (Threat Intelligence) | `#e8a317` |

### 2.12 Brand Wordmark Colours

| Element | Hex |
|---------|-----|
| SEIERTECH | `#f4f1eb` (cream) |
| COMMANDER | `#ffd21f` (gold) |
| SDR | `#ffffff` (white) |
| Pipe separator | `#ffd21f` (gold) |

---

## 3. COMPONENT LIBRARY

### 3.1 Custom Application Components (`apps/web/src/components/`)

| Component | File | Type | Used In |
|-----------|------|------|---------|
| `Shell` | `shell.tsx` | Layout wrapper | `app/layout.tsx` (wraps all pages) |
| `OperationalSidebar` | `operational-sidebar.tsx` | Navigation | `Shell` |
| `OperationalTopBar` | `operational-top-bar.tsx` | Navigation | `Shell` |
| `CaseList` | `case-list.tsx` | Data display | `/cases`, `/cases/my` |
| `ExpandableCaseRow` | `expandable-case-row.tsx` | Data display | `CaseList` |

### 3.2 Shared UI Style Components (`packages/ui/src/components/`)

These are style-factory functions (not React components) that return inline style objects:

| Component | File | Type | Used In |
|-----------|------|------|---------|
| `getKpiTileStyles` | `kpi-tile.ts` | Style factory | Command Centre (`/`) |
| `getTrendIndicator` | `kpi-tile.ts` | Utility | Command Centre (`/`) |
| `getLiveFeedStyles` | `live-feed.ts` | Style factory | Command Centre (`/`) |
| `getSeverityColor` | `live-feed.ts` | Utility | Command Centre (`/`) |
| `getPipelineStyles` | `lifecycle-pipeline.ts` | Style factory | (available, used via LIFECYCLE_STAGES) |
| `LIFECYCLE_STAGES` | `lifecycle-pipeline.ts` | Constant | `/cases`, `/cases/[id]` |
| `getRightRailStyles` | `right-rail.ts` | Style factory | `/cases/[id]` |
| `getStatusBadgeStyles` | `status-badge.ts` | Style factory | (exported, available) |
| `getPriorityConfig` | `priority-indicator.ts` | Style factory | (exported, available) |
| `getCardStyles` | `card.ts` | Style factory | (exported, available) |
| `getBrandWordmarkStyles` | `brand-wordmark.ts` | Style factory | (exported, available) |
| `getTopNavTabStyles` | `top-nav-tabs.ts` | Style factory | (exported, available) |
| `getGlobalSearchStyles` | `global-search.ts` | Style factory | (exported, available) |
| `getSidebarGroupStyles` | `sidebar-group.ts` | Style factory | (exported, available) |
| `getPageHeaderStyles` | `page-header.ts` | Style factory | (exported, available) |
| `getOperationalCardStyles` | `operational-card.ts` | Style factory | (exported, available) |
| `getUserAvatarStyles` | `user-avatar.ts` | Style factory | (exported, available) |
| `getCommanderAIButtonStyles` | `commander-ai-button.ts` | Style factory | (exported, available) |
| `getInstrumentGaugeStyles` | `instrument-gauge.ts` | Style factory | (exported, available) |
| `getKpiStripStyles` | `kpi-strip.ts` | Style factory | (exported, available) |
| `getRankedTableStyles` | `ranked-table.ts` | Style factory | (exported, available) |
| `getStrategicCompassStyles` | `strategic-compass.ts` | Style factory | (exported, available) |

### 3.3 Third-Party Libraries

| Library | Version | Usage |
|---------|---------|-------|
| `lucide-react` | ^1.16.0 | Icon library (declared in package.json, not yet imported in components) |
| `apexcharts` | ^5.13.0 | Chart rendering library (sole charting library per DEC-ds1-vega-removed) |
| `react-apexcharts` | ^2.1.0 | React wrapper for ApexCharts |
| `@xyflow/react` | ^12.11.0 | Node-based graph library (Fusion Map, blast radius, architecture maps) |
| `class-variance-authority` | ^0.7.1 | Variant management (declared, not yet used in source) |
| `clsx` | ^2.1.1 | Class merging utility |
| `tailwind-merge` | ^3.6.0 | Tailwind class merging |

---

## 4. LAYOUT PATTERNS

### 4.1 Global Shell Layout (Operational App)

```
┌─────────────────────────────────────────────────────────────┐
│ TopBar (fixed, 56px, navy chrome, z-index: 10)              │
├──────────┬──────────────────────────────────────────────────┤
│ Sidebar  │ Workspace (scrollable, mode-driven surface)      │
│ (fixed)  │                                                  │
│ 248px /  │  ┌─ main ─────────────────────────────────────┐  │
│ 68px rail│  │ padding: 24px                              │  │
│          │  │ marginTop: 56px (topbar)                   │  │
│ navy     │  │ background: tokens.surface.secondary       │  │
│ gradient │  │                                            │  │
│          │  └────────────────────────────────────────────┘  │
└──────────┴──────────────────────────────────────────────────┘
```

- **TopBar:** Fixed, 56px height, full-width, navy `#061936`
- **Sidebar:** Fixed, top offset by topbar height, 248px expanded / 68px collapsed
- **Workspace:** Flex 1, margin-left matches sidebar width, scrollable
- **Transition:** 180ms ease-out on sidebar collapse/expand

### 4.2 Control Plane Layout (Separate Shell)

```
┌─────────────────────────────────────────────────────────────┐
│ TopBar (fixed, 68px, #050505, gold bottom border)           │
├──────────────┬──────────────────────────────────────────────┤
│ Sidebar      │ Page Header (76px)                           │
│ (fixed)      ├──────────────────────────────────────────────┤
│ 330px        │ Content (padding: 26px, scrollable)          │
│ #080808      │                                              │
│ flat nav     │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

### 4.3 Tenant Admin Layout (Separate Shell)

```
┌─────────────────────────────────────────────────────────────┐
│ TopBar (fixed, 68px, navy, gold subtle border)              │
├──────────────┬──────────────────────────────────────────────┤
│ Sidebar      │ Content (padding: 26px, scrollable)          │
│ (fixed)      │ background: #ffffff                          │
│ 306px        │                                              │
│ navy gradient│                                              │
└──────────────┴──────────────────────────────────────────────┘
```

### 4.4 Page-Level Layout Patterns

**Standard Page Structure (DS-1.0 §8):**
1. Page Header (76px) — breadcrumb + h1 + status indicator
2. KPI Strip — horizontal scrollable row of metric tiles
3. Content Grid — 12-column grid, typically 2-col or 3-col cards
4. Detail sections — stacked cards with consistent padding

**Case Detail Layout:**
- Master-detail with right rail (320px) on wide viewports (>1400px)
- Stacks vertically on narrow viewports via `flexWrap: 'wrap'`

### 4.5 Grid System

| Token | Value | Usage |
|-------|-------|-------|
| `gridColumns` | 12 | 12-column grid system |
| `gridGap` | 16px | Standard grid gap |
| Content grid | `repeat(3, 1fr)` | Command Centre cards, Control Plane overview |
| Content grid | `repeat(2, 1fr)` | Case Analytics charts |
| Metadata grid | `repeat(3, 1fr)` | Case detail metadata cards |
| Metadata grid | `repeat(5, 1fr)` | Expandable row metadata |

### 4.6 Responsive Breakpoints

| Breakpoint | Usage | Defined In |
|-----------|-------|-----------|
| 1450px | Sidebar narrows from 306px to 286px (legacy tokens) | `tokens/spacing.ts` |
| 1400px | Case detail right-rail collapses (flexWrap) | `cases/[id]/page.tsx` |

---

## 5. ICONS

### 5.1 Icon Library

**Declared:** `lucide-react` ^1.16.0 (in `package.json`)  
**Actual usage:** Not yet imported in any component source file.

### 5.2 Current Icon Approach

Icons are currently rendered as Unicode characters / text symbols:

| Symbol | Usage | Location |
|--------|-------|----------|
| `☰` | Hamburger menu toggle | `operational-sidebar.tsx` |
| `⌂` | Home icon (collapsed rail) | `operational-sidebar.tsx`, `operational-top-bar.tsx` |
| `⌄` | Chevron (group expand/collapse) | `operational-sidebar.tsx` |
| `◆` | P0 priority shape | `expandable-case-row.tsx`, `war-room/p0/page.tsx`, `page.tsx` |
| `▲` | P1 priority shape | `primitives.ts` (primitivePriority) |
| `●` | P2 priority shape | `primitives.ts` |
| `○` | P3 priority shape | `primitives.ts` |
| `□` | P4 priority shape | `primitives.ts` |
| `⚠` | SLA breach warning | `expandable-case-row.tsx` |
| `↑` `↓` `→` | Trend arrows | `kpi-tile.ts` |
| `✓` | Gate pass indicator | `cases/[id]/page.tsx` |

### 5.3 Icon References in Route Registry

The route registry declares icon identifiers (string keys) for future Lucide integration:

`command-centre`, `cases`, `commander-ai`, `vulnerabilities`, `exposure`, `assets`, `identity`, `controls`, `architecture`, `governance`, `ciso`, `security-c2`, `ooda`, `direction-boards`, `war-room`, `transformation`, `strategy`, `customers`, `tenants`, `instances`, `licences`, `entitlements`, `modules`, `feature-flags`, `deployment`, `trials`, `support`, `licence-files`, `emergency`, `operator-audit`, `tenant`, `users`, `connectors`, `features`, `sla`, `routing`, `validation`, `closure`, `automation`, `commander-ai`, `audit`

---

## 6. SPACING AND SIZING

### 6.1 Primitive Spacing Scale (8px base grid)

| Token | Value | Usage |
|-------|-------|-------|
| `primitiveSpacing[0]` | 0px | Reset |
| `primitiveSpacing[1]` | 4px | Tight gaps, micro margins |
| `primitiveSpacing[2]` | 8px | Row padding, small gaps |
| `primitiveSpacing[3]` | 12px | Card header margin, medium gaps |
| `primitiveSpacing[4]` | 16px | Card padding, grid gap, standard spacing |
| `primitiveSpacing[5]` | 24px | Content padding, section spacing |
| `primitiveSpacing[6]` | 32px | Large spacing |
| `primitiveSpacing[7]` | 48px | Extra-large spacing |
| `primitiveSpacing[8]` | 64px | Maximum spacing |

### 6.2 Component Dimensions

| Token | Value | Usage |
|-------|-------|-------|
| `topbarHeight` | 56px | Operational App top bar |
| `sidebarWidth` | 248px | Operational sidebar expanded |
| `sidebarRail` | 68px | Operational sidebar collapsed |
| `cardPadding` | 16px | Card internal padding |
| `cardRadius` | 2px | Card border radius (sharp/brutalist) |
| `gridGap` | 16px | Grid gap between cards |
| `contentPadding` | 24px | Main content area padding |
| `pageheaderPadding` | 24px | Page header padding |
| `tableRowHeight` | 36px | Table row minimum height |
| `tableHeaderHeight` | 40px | Table header height |
| `buttonHeight` | 32px | Standard button height |
| `buttonHeightEmphasis` | 36px | Emphasis button height |
| `inputHeight` | 34px | Input field height |
| `itemHeight` | 36px | Sidebar item height |
| `searchWidth` | 440px | Global search input width |
| `avatarSize` | 32px | User avatar size |
| `cardHeaderMargin` | 12px | Card header bottom margin |
| `cardListMaxHeight` | 360px | Scrollable card list max-height |

### 6.3 Legacy Chrome Dimensions (in `tokens/spacing.ts`)

| Token | Value | Usage |
|-------|-------|-------|
| `chrome.topBarHeight` | 68px | Control Plane / Tenant Admin top bar |
| `chrome.sidebarWidth` | 306px | Tenant Admin sidebar |
| `chrome.sidebarWidthNarrow` | 286px | Below 1450px viewport |
| `chrome.pageHeaderHeight` | 76px | Page header section |
| `chrome.searchWidth` | 440px | Search input width |
| `chrome.searchWidthNarrow` | 360px | Narrow viewport search |
| `chrome.scrollbarWidth` | 6px | Custom scrollbar width |
| `chrome.groupHeaderHeight` | 38px | Sidebar group header |
| `chrome.subItemHeight` | 27px | Sidebar sub-item |
| `chrome.avatarSize` | 34px | Avatar size |
| `chrome.iconSize` | 38px | Icon button size |

### 6.4 Border Radii

| Token | Value | Usage |
|-------|-------|-------|
| `primitiveRadii.sm` | 0px | Sharp corners (brutalist) |
| `primitiveRadii.md` | 2px | Cards, badges, chips |
| `primitiveRadii.lg` | 2px | Larger elements (same as md — brutalist) |
| `primitiveRadii.full` | 9999px | Circles (status dots, avatar) |
| `radii.none` | 0 | No radius |
| `radii.sm` | 2px | Small radius |
| `radii.md` | 4px | Medium radius |
| `radii.lg` | 6px | Large radius |
| `radii.xl` | 8px | Extra-large radius |

### 6.5 Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadows.sm` | `0 1px 2px rgba(0,0,0,0.3)` | Subtle elevation |
| `shadows.md` | `0 2px 4px rgba(0,0,0,0.4)` | Medium elevation |
| `shadows.lg` | `0 4px 8px rgba(0,0,0,0.5)` | High elevation |
| `shadows.glow.gold` | `0 0 8px rgba(255,210,31,0.3)` | Gold glow (Mission mode active) |
| `shadows.glow.critical` | `0 0 8px rgba(217,45,32,0.3)` | Critical glow (P0/emergency) |
| `shadows.glow.info` | `0 0 8px rgba(59,130,246,0.3)` | Info glow |

### 6.6 Motion / Animation

| Token | Value | Usage |
|-------|-------|-------|
| `primitiveMotion.micro` | 100ms | Micro interactions |
| `primitiveMotion.standard` | 180ms | Standard transitions (sidebar, backgrounds) |
| `primitiveMotion.complex` | 250ms | Complex animations |
| `primitiveMotion.easeDefault` | ease-out | Default easing |
| `primitiveMotion.easeInteraction` | ease-in-out | Interactive elements |
| `primitiveMotion.easeData` | linear | Data/chart animations |

---

## 7. DESIGN TOKENS — Architecture

### 7.1 Three-Layer Token System

```
Layer 1: PRIMITIVES (raw values — never referenced by components directly)
  └── packages/ui/src/tokens/primitives.ts
  └── packages/ui/src/tokens/colors.ts (legacy)
  └── packages/ui/src/tokens/typography.ts (legacy)
  └── packages/ui/src/tokens/spacing.ts (legacy)

Layer 2: SEMANTIC (mode-overridable — components reference these)
  └── packages/ui/src/tokens/semantic.ts
  └── getSemanticTokens(mode: 'standard' | 'mission')

Layer 3: COMPONENT (pinned dimensions per component)
  └── packages/ui/src/tokens/components.ts
```

### 7.2 Semantic Token Map (Mode-Driven)

```typescript
tokens.surface.primary    // Standard: #f2f5f9 | Mission: #08111f
tokens.surface.secondary  // Standard: #ffffff | Mission: #0c1828
tokens.surface.elevated   // Standard: #ffffff | Mission: #122236
tokens.surface.overlay    // Standard: rgba(14,29,50,0.45) | Mission: rgba(0,0,0,0.6)
tokens.text.primary       // Standard: #0e1d32 | Mission: #e8f0fb
tokens.text.secondary     // Standard: #68758b | Mission: #aebfd4
tokens.text.muted         // Standard: #9aa9be | Mission: #6f8198
tokens.border.default     // Standard: #c2cede | Mission: rgba(255,255,255,0.16)
tokens.border.subtle      // Standard: #dbe3ef | Mission: rgba(255,255,255,0.10)
tokens.action.primary     // Both: #ffd21f (gold)
tokens.action.secondary   // Standard: #2e3848 | Mission: #aebfd4
tokens.status.*           // Same in both modes (signal colours)
tokens.data.*             // Same in both modes (chart palette)
tokens.chrome.navText     // #ffffff
tokens.chrome.navTextActive // #ffd21f (gold)
```

### 7.3 CSS Custom Properties

Only two CSS custom properties are declared (in `app/layout.tsx` via `next/font`):

| Property | Value | Purpose |
|----------|-------|---------|
| `--font-body` | Inter font-face | Body font family |
| `--font-display` | Bebas Neue font-face | Display font family |

All other styling is done via TypeScript token objects applied as inline styles. No CSS files, no Tailwind classes, no CSS modules are used.

### 7.4 Theme Extension Points

- **Mode system:** `getSemanticTokens('standard' | 'mission')` provides full theme switching
- **Visual intensity:** `primitives.ts` defines `standard`, `tactical`, `emergency` intensity levels
- **Glow system:** Mission mode uses `primitiveGlow.radius` (8px) and `primitiveGlow.intensity` (0.35) for emphasis
- **Grid opacity:** `primitiveHud.gridOpacity` (0.05) for Mission mode background grid

### 7.5 Context Providers

| Provider | File | Purpose |
|----------|------|---------|
| `ModeProvider` | `context/mode-context.tsx` | Standard/Mission mode toggle, exposes `tokens` |
| `SidebarProvider` | `context/sidebar-context.tsx` | Sidebar collapsed/expanded state |

Both persist state to `localStorage`:
- `commander-sdr.workspace-mode` → `'standard'` or `'mission'`
- `commander-sdr.sidebar.collapsed` → `'true'` or `'false'`
- `commander-sdr.sidebar.{groupId}.expanded` → per-group expansion state

---

## 8. INCONSISTENCIES

### 8.1 Token System Duplication (Legacy vs Primitive)

The codebase has **two parallel token systems** that partially overlap:

| Concern | Legacy (`tokens/spacing.ts`, `tokens/colors.ts`, `tokens/typography.ts`) | Primitive (`tokens/primitives.ts`) |
|---------|---------|-----------|
| Top bar height | `chrome.topBarHeight` = **68px** | `componentTokens.topbarHeight` = **56px** |
| Sidebar width | `chrome.sidebarWidth` = **306px** | `componentTokens.sidebarWidth` = **248px** |
| Avatar size | `chrome.avatarSize` = **34px** | `componentTokens.avatarSize` = **32px** |
| Border radii | `radii.md` = **4px** | `primitiveRadii.md` = **2px** |
| Border radii | `radii.lg` = **6px** | `primitiveRadii.lg` = **2px** |

**Impact:** The Operational App uses the primitive/component tokens (56px topbar, 248px sidebar). The Control Plane and Tenant Admin layouts use the legacy tokens (68px topbar, 306px/330px sidebar). This is intentional per the three-application boundary doctrine but creates confusion when both are exported from the same `tokens/index.ts`.

### 8.2 Hardcoded Values in Control Plane Layout

The Control Plane layout (`control-plane/layout.tsx`) uses several literal values not from any token:

| Value | Location | Should Be |
|-------|----------|-----------|
| `'330px'` sidebar width | `control-plane/layout.tsx` | Not in any token file |
| `'#080808'` sidebar background | `control-plane/layout.tsx` | Not in `colors.controlPlane` |
| `'#151515'` search background | `control-plane/layout.tsx` | Not in any token |
| `'#333'` search/divider border | `control-plane/layout.tsx` | Not in any token |
| `'#5c2626'` alert border | `control-plane/layout.tsx` | Not in any token |
| `'#ffb4b4'` alert text | `control-plane/layout.tsx` | Not in any token |
| `'#ddd'`, `'#bdbdbd'`, `'#ccc'` text colours | `control-plane/layout.tsx` | Not in any token |
| `'14px'` gap | `control-plane/page.tsx` | Should use `primitiveSpacing` |
| `'18px'` padding | `control-plane/page.tsx` | Should use `primitiveSpacing` |

### 8.3 Hardcoded Values in Tenant Admin Layout

| Value | Location | Should Be |
|-------|----------|-----------|
| `'#0b1e38'` border colour | `tenant-admin/layout.tsx` | Not in any token |
| `'#dcecff'` text colour | `tenant-admin/layout.tsx` | Should use `chrome.textHeading` |
| `'11px'` font size | `tenant-admin/layout.tsx` | Should use `primitiveTypeScale.micro` |
| `'#8ca6c2'` text colour | `tenant-admin/layout.tsx` | Not in any token |
| `'26px'` padding | `tenant-admin/layout.tsx` | Should use `primitiveSpacing[5]` (24px) or `[6]` (32px) |
| `'1rem'` margin | `tenant-admin/page.tsx` | Should use `primitiveSpacing` |
| `'2rem'` margin | `tenant-admin/page.tsx` | Should use `primitiveSpacing` |

### 8.4 Inconsistent Top Bar Heights

| Application | Height | Source |
|-------------|--------|--------|
| Operational App | **56px** | `componentTokens.topbarHeight` |
| Control Plane | **68px** | `chrome.topBarHeight` |
| Tenant Admin | **68px** | `chrome.topBarHeight` |

This may be intentional (different applications) but creates a visual inconsistency if users navigate between boundaries.

### 8.5 Inconsistent Sidebar Widths

| Application | Width | Source |
|-------------|-------|--------|
| Operational App (expanded) | **248px** | `componentTokens.sidebarWidth` |
| Operational App (collapsed) | **68px** | `componentTokens.sidebarRail` |
| Control Plane | **330px** | Hardcoded literal |
| Tenant Admin | **306px** | `chrome.sidebarWidth` |

### 8.6 Inconsistent Content Padding

| Application | Padding | Source |
|-------------|---------|--------|
| Operational App | **24px** | `componentTokens.contentPadding` |
| Control Plane | **26px** | Hardcoded literal |
| Tenant Admin | **26px** | Hardcoded literal |

### 8.7 Colour `#8ca6c2` Used Without Token

This colour appears in two locations without a corresponding token:
- `operational-top-bar.tsx` — user role label colour
- `tenant-admin/layout.tsx` — "Tenant Administration" label

### 8.8 Unused Dependencies

The following packages are declared in `package.json` but not imported in any source file:
- `lucide-react` — icon library (icons rendered as Unicode instead)
- `class-variance-authority` — variant management
- `clsx` — class merging
- `tailwind-merge` — Tailwind class merging

These suggest a planned migration to a class-based approach that hasn't been implemented.

### 8.9 Page Header Height Inconsistency

Page headers are rendered with `height: '76px'` as a hardcoded literal in multiple pages (`page.tsx`, `cases/page.tsx`, `cases/my/page.tsx`, `cases/analytics/page.tsx`). This value matches `chrome.pageHeaderHeight` but is not referenced from it — it's repeated as a string literal.

### 8.10 Font Size for SLA Gauge

In `cases/analytics/page.tsx`, the SLA compliance percentage uses `fontSize: '48px'` — a hardcoded literal not present in any type scale token.

### 8.11 War Room Bypasses Mode Context

The P0 War Room page (`war-room/p0/page.tsx`) calls `useMode()` but ignores its tokens, instead constructing its own `surface` object directly from `primitiveHud.*` values. This is documented as intentional (Emergency Command forces Mission mode per DS-1.0 §9.3) but bypasses the semantic token layer.

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total source files in `apps/web/src/` | 18 |
| Page/route files | 10 |
| Component files | 6 |
| Context providers | 2 |
| Registry files | 6 |
| Token files in `packages/ui/src/tokens/` | 7 |
| Shared UI component files in `packages/ui/src/components/` | 21 |
| Registered routes (all boundaries) | 39 |
| Sidebar nav groups | 18 |
| Unique colour values (all tokens) | ~65 |
| Font families | 3 |
| Type scale steps | 9 |
| Spacing scale steps | 9 |
| Hardcoded values flagged | ~20 |

---

*End of inventory.*
