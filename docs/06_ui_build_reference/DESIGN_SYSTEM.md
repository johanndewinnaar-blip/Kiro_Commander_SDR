# Commander SDR — Unified Design System Specification (Authoritative)

**Version:** DS-1.0 (reconciled)
**Status:** Authoritative. Supersedes ad-hoc styling and the partial v1.3.2 design remediation values where they conflict. Equal in standing to the shell reference HTMLs in `docs/06_ui_build_reference/`.
**Scope:** Desktop only — laptops (1280–1600px), standard monitors (1920×1080), wide (2560×1440), ultrawide (3440×1440+). No phone/tablet.
**Governing principle:** *Enterprise clarity with mission-grade awareness. Stable navigation, instrumented workspace. Data drives design, not decoration.*

This document is complete. Every value is pinned. Nothing is left "to be defined in implementation." Where a value is given, it is the value — Kiro must not improvise alternatives.

---

## 0. Locked top-level decisions

| Decision | Resolution |
|---|---|
| Density | Dense-operational (information-rich, deliberate hierarchy, never cramped) |
| Charting library | **ApexCharts** primary (MIT licence, rich chart types for dashboard/analytical use). Sole charting library — no dual-library maintenance. |
| Fusion Map / network graph | **@xyflow/react (React Flow)** — sole node-based graph library for blast radius, architecture maps, attack paths, Fusion Maps. |
| Icon library | **Lucide** (outline, monochrome, token-coloured). Single library, no mixing. |
| Display/brand font | **Bebas Neue** (retained — established identity, in shell references) |
| Body font | **Inter** (weights 400/500/600/700/800) |
| Monospace font | **JetBrains Mono** (telemetry, IDs, hashes, metrics; mandatory for numeric values in Mission mode) |
| Component base | **shadcn/ui primitives restyled with these tokens.** Bespoke reserved for signature surfaces (Command Centre, Fusion Map, P0 War Room). |
| Workspace modes | **Standard (Light)** for management/config/reporting; **Mission (HUD/Dark)** for monitoring/analysis/live ops. Functional toggle in top bar. Some surfaces force Mission (P0 War Room). |
| Max content width | **Per-panel max-width with multi-panel fill.** No global hard cap. Wide/ultrawide space is used by adding panels/columns, never by lengthening text lines. |
| Top bar height | **56px** (new spec) |
| Sidebar | **248px expanded, collapsible to 68px icon rail.** 36px items. (New spec — supersedes the 306px static sidebar.) |
| Dark mode | Not a user cosmetic toggle. Light/Dark is the Standard/Mission functional mode switch plus boundary-driven schemes. |

---

## 1. Token architecture (three layers, strict)

### 1.1 Primitive tokens — raw values (defined in §2)
Raw colours, spacing, radii, fonts, motion. **No component references these directly.**

### 1.2 Semantic tokens — mapped to meaning (used in UI)
Surfaces, text, borders, actions, status, data. Modes override these.

### 1.3 Component tokens — per-component dimensions
Card padding, button height, input height, sidebar width, topbar height, table row height.

**Governance:** No component uses a primitive value directly. All styling references semantic or component tokens. Modes override semantic tokens only. No hardcoded values anywhere — ever. (This is the fix for the prior hardcoded-spacing failure.)

---

## 2. Pinned primitive values

### 2.1 Spacing scale (8px base grid, 12 retained)
```
--spacing-0:  0
--spacing-1:  4px
--spacing-2:  8px
--spacing-3:  12px
--spacing-4:  16px
--spacing-5:  24px
--spacing-6:  32px
--spacing-7:  48px
--spacing-8:  64px
```
All margins, padding, gutters reference this scale. No arbitrary px values. (Prior hardcoded 14px → snaps to 12 or 16; 18px → 16; 26px → 24; 28px → 24 or 32.)

### 2.2 Radius
```
--radius-sm:   4px
--radius-md:   8px
--radius-lg:   12px
--radius-full: 9999px
```

### 2.3 Brand anchors
```
--brand-navy:        #061936   (chrome primary)
--brand-navy-2:      #071f43   (chrome variant)
--brand-gold:        #ffd21f   (accent — exact, never substituted)
--brand-cream:       #f4f1eb   (brand wordmark "SEIERTECH")
```

### 2.4 Neutral ramp — Standard (light) mode
```
--neutral-0:   #ffffff
--neutral-50:  #f2f5f9
--neutral-100: #e7ecf3
--neutral-200: #dbe3ef
--neutral-300: #c2cede
--neutral-400: #9aa9be
--neutral-500: #68758b
--neutral-600: #4a5667
--neutral-700: #2e3848
--neutral-800: #1a2433
--neutral-900: #0e1d32
```

### 2.5 Neutral ramp — Mission (dark/HUD) mode
```
--hud-bg-0:    #050b16   (deepest surface)
--hud-bg-1:    #08111f   (primary surface)
--hud-bg-2:    #0c1828   (elevated surface)
--hud-bg-3:    #122236   (card / panel)
--hud-line:    rgba(255,255,255,0.10)
--hud-line-2:  rgba(255,255,255,0.16)
--hud-text-0:  #e8f0fb   (primary text)
--hud-text-1:  #aebfd4   (secondary text)
--hud-text-2:  #6f8198   (muted text)
--hud-grid-opacity: 0.05  (technical overlay gridlines)
```

### 2.6 Signal colours (status) — work in both modes
```
--signal-critical: #d92d20   (P0 / critical / error)
--signal-warning:  #e8a317   (warning / degraded)
--signal-success:  #1a7a3f   (healthy / success)
--signal-info:     #2563aa   (informational)
--signal-neutral:  #68758b   (inactive / unknown)
```

### 2.7 Data palette (charts) — n = 8, colour-blind safe, light+dark legible
```
--data-1: #2563aa   (blue)
--data-2: #e8a317   (amber)
--data-3: #1a7a3f   (green)
--data-4: #b5446e   (magenta)
--data-5: #4ba3c3   (cyan)
--data-6: #c2611f   (orange)
--data-7: #7a5cc2   (violet)
--data-8: #8a8f98   (grey)
```
Distinct from signal colours (so a data series is never confused with a status). Beyond 8 series, charts aggregate rather than add colours.

### 2.8 Glow (Mission mode only — restrained)
```
--glow-radius:    8px
--glow-intensity: 0.35   (alpha)
```
Maximum 2 glow elements per card. Glow only on active/signalled data. Never decorative.

### 2.9 Motion
```
--motion-micro:    100ms   (button press, micro-feedback)
--motion-standard: 180ms   (sidebar toggle, expand/collapse)
--motion-complex:  250ms   (route change, panel transitions)
--ease-default:    ease-out
--ease-interaction: ease-in-out
--ease-data:       linear   (chart transitions, for accurate reading)
```
Respect `prefers-reduced-motion` globally.

### 2.10 Fonts
```
--font-display: 'Bebas Neue', Impact, sans-serif
--font-body:    'Inter', system-ui, sans-serif
--font-mono:    'JetBrains Mono', ui-monospace, monospace
```

### 2.11 Type scale (exact)
```
--text-display-lg: 24px  (Bebas Neue — large brand)
--text-display:    22px  (Bebas Neue — brand wordmark)
--text-h1:         22px  (page title)
--text-h2:         18px  (section heading)
--text-h3:         14px  (card heading)
--text-body:       13px  (base)
--text-caption:    12px  (small / hints)
--text-micro:      10px  (badges / micro labels)
```
Letter spacing: display 0.09–0.11em; uppercase eyebrows 0.06em.
Line heights: body 1.45; heading 1.2; dense-table 1.3.
Number displays use `--font-mono` with tabular figures for alignment.

---

## 3. Semantic tokens (mode-overridable)

```
--surface-primary      Standard: --neutral-50   Mission: --hud-bg-1
--surface-secondary    Standard: --neutral-0    Mission: --hud-bg-2
--surface-elevated     Standard: --neutral-0    Mission: --hud-bg-3
--surface-overlay      Standard: rgba(14,29,50,0.45)  Mission: rgba(0,0,0,0.6)

--text-primary         Standard: --neutral-900  Mission: --hud-text-0
--text-secondary       Standard: --neutral-500  Mission: --hud-text-1
--text-muted           Standard: --neutral-400  Mission: --hud-text-2

--border-default       Standard: --neutral-200  Mission: --hud-line-2
--border-subtle        Standard: --neutral-100  Mission: --hud-line

--action-primary       --brand-gold (both modes)
--action-secondary     Standard: --neutral-700  Mission: --hud-text-1

--status-critical      --signal-critical
--status-warning       --signal-warning
--status-success       --signal-success
--status-info          --signal-info
--status-neutral       --signal-neutral

--data-1 … --data-8    (as primitive; charts reference these only)
```

The shell chrome (top bar, sidebar) is **always navy/dark in both modes** — the mode toggle changes the *workspace*, not the shell. This is the "stable navigation, instrumented workspace" principle.

---

## 4. Component tokens (pinned)

```
--topbar-height:      56px
--sidebar-width:      248px
--sidebar-rail:       68px
--card-padding:       16px   (--spacing-4)
--card-radius:        8px    (--radius-md)
--grid-gap:           16px   (--spacing-4)
--content-padding:    24px   (--spacing-5)
--pageheader-padding: 24px   (--spacing-5)
--table-row-height:   36px
--table-header-height:40px
--button-height:      32px   (36px emphasis)
--input-height:       34px
--item-height:        36px   (sidebar/list)
--search-width:       440px
--avatar-size:        32px
```

---

## 5. Global layout

```
AppShell
 ├── TopBar     (fixed, 56px, navy chrome both modes)
 ├── Sidebar    (fixed, 248px / 68px rail, navy chrome both modes)
 └── Workspace  (scrollable, mode-driven surface)
```

Rules:
- Desktop only.
- Workspace is the primary scroll container. Sidebar scrolls independently. No nested scroll except data tables.
- **Per-panel max-width, multi-panel fill.** A single panel caps at ~1320px for reading comfort. On wide/ultrawide, layouts add panels/columns rather than stretching one panel. Master-detail surfaces (Case Queue + Case Detail) render side-by-side on wide screens, collapsing to full-page navigation below ~1400px.

---

## 6. Top bar (new spec)

Structure — Left: Hamburger + Logo. Centre: Search / context. Right: AI action, Mode toggle, Notifications, User profile.

- Height 56px. Horizontal padding 16px.
- Spacing: hamburger→logo 8px; logo→search 24px; right-cluster items 12–16px.
- Hit areas ≥ 40×40px.
- Fixed; no layout shift; centre zone expands within available space.
- Brand wordmark (Bebas Neue): SEIERTECH (cream) | gold pipe | COMMANDER (gold) | SDR (white). Logo always light variant, unaffected by mode. Clickable → home.
- Search 440px, primary discovery, supports text + filters + contextual commands.
- AI button: secondary entry point, gold-bordered, does not dominate hierarchy.
- Mode toggle: switches workspace Standard ↔ Mission. No effect on shell chrome.
- Notifications: icon + optional badge.
- User profile: 32px avatar (gold-bordered Bebas Neue initials) + optional name/role → account menu.
- Boundary indicator: Control Plane shows "INTERNAL" + "PROD ACTIONS REQUIRE APPROVAL"; Tenant Admin shows a "TENANT ADMIN" marker.

---

## 7. Sidebar (new spec)

- Expanded 248px / collapsed rail 68px. Interior padding 12px.
- Item height 36px, padding 8px 12px, icon 20px, gap 4px. Structure: [Icon][Label].
- Toggle via hamburger; transition 180ms ease-out; state persists per user.
- Hierarchical groups, expand/collapse (state persisted per user; active-route group expands by default).
- Icons required (Lucide). Labels in expanded mode; tooltips in rail mode (200ms delay).
- Active item: gold-tinted background `rgba(255,210,31,0.08)` + gold left border + `--text-primary`.
- Custom gold scrollbar (6px, `rgba(255,210,31,0.55)` thumb).
- Chrome is navy gradient both modes.

---

## 8. Workspace structure

```
Header        — page title, primary actions, optional filters/time controls
Insight Row   — mandatory: summary KPIs + a primary chart/gauge
Content Grid  — 12-column internal grid; default 3-col cards; 2-col wide; 16px gutters
Detail Section— extended lists, tables, drill-down
```
Padding 24px. Panel max-width ~1320px; multi-panel on wide screens.

---

## 9. Workspace modes

### 9.1 Standard (Light) — management, configuration, reporting
Neutral surfaces, white cards, minimal emphasis, light content on navy chrome.

### 9.2 Mission (HUD/Dark) — monitoring, analysis, live ops
- Layered dark surfaces (no shadows — contrast difference only).
- Colour appears only to convey status/alert; under 20% of screen area.
- Glow controlled: ≤2 per card, low intensity, active/signalled data only.
- Optional faint gridlines (`--hud-grid-opacity` 0.05) for instrumentation feel; never reduce readability.
- No decorative colour, gradients, or neon.
- Numeric values use `--font-mono`.

### 9.3 Three intensity levels (baseline reconciliation)
The baseline's three levels map onto modes as:
- **Operational Standard** = Standard mode.
- **Tactical Analysis** = Mission mode, standard intensity.
- **Emergency Command** = Mission mode, elevated intensity — used by the P0 Zero-Day War Room. Larger alert prominence, P0 critical signalling foregrounded, denser real-time layout. Forces Mission regardless of toggle.

---

## 10. Typography usage
- Display (Bebas Neue): brand wordmark, large page titles.
- Body (Inter): all UI text.
- Mono (JetBrains Mono): telemetry, IDs (CVE, hashes, asset IDs), all numeric KPI values in Mission mode.
- Uppercase: eyebrows, badges, card-title eyebrows. Never body or long labels.
- Truncation: single-line strings truncate with ellipsis + tooltip on hover.
- Numbers: tabular figures, thousands separators, consistent decimal precision per metric.

---

## 11. Iconography (Lucide)
- One library: Lucide. Outline, monochrome.
- Sizes: 16px inline, 20px nav/default, 24px feature.
- Hit area ≥ 32px (40px primary).
- Colour from semantic tokens: default `--text-secondary`, active `--text-primary`, interactive `--action-primary`.
- Always paired with label or tooltip; never meaning by icon alone.
- In Mission mode may adopt a signal colour when indicating a status field.
- Required on: sidebar groups/items, top-nav, status indicators, action buttons, empty states, domain workspaces.

---

## 12. Components (states for all: default, hover, active, focus, disabled, loading, error)

- **Card** — header/body/optional footer; padding 16px; radius 8px; no nested scroll; grows vertically. Operational (light) and Control-Plane (dark) variants.
- **KPI/Metric tile** — 80–120px; [label small][value large][delta/trend small]; Mission: value mono, delta in signal colour; optional sparkline.
- **Table** — row 36px, header 40px, cell padding 8px 12px; sortable, filterable, sticky header; horizontal scroll allowed with clear scrollbars; virtualise beyond ~100 rows; loading=skeleton, empty=message+action, error=message+retry.
- **Status badge** — pill, semantic colour + label, never colour-alone.
- **Build-status badge** — LIVE / BUILD / SCAFFOLD / STUB / PLANNED, each a distinct treatment (LIVE=success, BUILD=gold, SCAFFOLD=neutral outline, STUB=muted, PLANNED=subtle) + text label.
- **Priority indicator** — P0–P4, each colour + shape + label (§14).
- **Button** — 32px (36 emphasis), padding 0 12px; Primary/Secondary/Danger/Ghost/Icon; all states tokenised.
- **Input** — 34px; text/select/date/autocomplete/slider/switch; states tokenised; consistent radius + icon placement.
- **Search** — 440px, results dropdown.
- **Tabs** — top-nav tabs (3px gold underline active) + in-page tabs.
- **Page header** — uppercase grey eyebrow + 22px h1 + right actions/status tile.
- **Status tile** — green dot + "Last updated X"; variants for stale/error.
- **Avatar** — 32px gold-bordered Bebas Neue initials; photo optional.
- **Modal** — centre, max 600–720px, overlay backdrop, focus trap, Esc to close.
- **Drawer** — slide from right, width defined, focus trap, optional backdrop.
- **Toast** — types success/error/info/warning, position + duration tokenised.
- **Tooltip** — 200ms delay, 8px offset, max 240px, mode-aware.
- **Banner/alert** — P0 banner (critical) + info/maintenance/warning variants.
- **Tag/chip** — surface attribution, connector class, labels.
- **Progress/loading** — skeleton preferred over spinner; maintain layout.
- **Empty state** — message + action; sparing icon.
- **Pagination** — tokenised, placed below tables.
- **Filter bar** — inline filters, filter chips, advanced panel.

---

## 13. Data visualisation (ApexCharts)

- **Library:** ApexCharts primary (MIT licence, rich interactive charts). Sole charting library. @xyflow/react for node-based graphs (Fusion Map, blast radius, architecture maps). No other charting libraries permitted.
- **Colour:** charts reference `--data-*` semantic tokens only. Never literal hex in specs.
- **Every chart includes:** title (if separate from card), legend (if discrete colour), tooltip, time context (if time series), empty state.
- **Approved types + purpose:** line (trend), bar (comparison, grouped/stacked), area (cumulative trend), donut (composition — use sparingly), gauge (single metric vs thresholds), sparkline (inline trend on tiles/rows), scatter (correlation), histogram (distribution). Each instance must have an explicit operational purpose.
- **Gauge spec:** shows value, threshold bands, numeric label, and meaning without colour alone (label + position).
- **Mission adaptations:** dark surface tokens; lighter axis text; thinner strokes; outlier emphasis via glow/opacity; mono fonts for numeric summaries.
- **Responsiveness:** charts adjust to container; min sizes (small/medium/large) tokenised.
- **Accessibility:** tooltips + data-table fallback; never colour-alone; pattern fills available.

---

## 14. Commander-specific semantic layers

### 14.1 Priority scale (colour + shape + label — never colour alone)
```
P0  --signal-critical  + filled diamond  + "P0"   (Emergency Command treatment)
P1  #e8531f (deep orange) + filled triangle + "P1"
P2  --signal-warning   + filled circle   + "P2"
P3  --signal-info      + outline circle  + "P3"
P4  --signal-neutral   + outline square  + "P4"
```
P0 propagates reason, scope, owner, expiry/review, evidence across all surfaces.

### 14.2 OODA phase colours
```
Observe  #2563aa (blue)
Orient   #4ba3c3 (cyan)
Decide   #e8a317 (amber)
Act      #1a7a3f (green)
```
Always paired with phase label.

### 14.3 Connector class treatment
```
Class A (SOC Telemetry)        chip: blue   --data-1 + "A"
Class B (Operational Verdict)  chip: cyan   --data-5 + "B"
Class C (Configuration State)  chip: violet --data-7 + "C"
Class D (Threat Intelligence)  chip: amber  --data-2 + "D"
```
Class always shown as letter + chip, never colour alone.

### 14.4 Surface attribution
```
internal_attack_surface  chip: neutral fill  + shield-half icon + "Internal"
external_attack_surface  chip: gold outline  + globe icon       + "External"
```

### 14.5 Data freshness
```
Live    green dot   + "Live"
Stale   amber dot   + "Stale Xm"
No data grey dash   + "No data"
```

---

## 15. Three application boundaries — visual distinction

- **Operational App** — light Standard workspace on navy chrome; brand SEIERTECH | COMMANDER SDR. Mission toggle available.
- **Tenant Admin** — inherits Operational visual language (per DEC-v1.3.2-tenant-admin-shell-pending-reference) with a "TENANT ADMIN" brand marker, until a dedicated reference is produced.
- **Commercial Control Plane** — dark chrome (`#050505` bar, `#080808` sidebar, `#0d0d0d` content), "INTERNAL" badge, "PROD ACTIONS REQUIRE APPROVAL" header tile, brand COMMANDER COMMERCIAL CONTROL, flat single-level sidebar.
- Boundary must be instantly obvious via brand + chrome + badge. Crossing boundaries is visually explicit.

---

## 16. Motion, accessibility, hit targets, forms, states
- Motion per §2.9; uniform; limit simultaneous animations; honour reduced-motion.
- Accessibility: WCAG AA minimum (AAA where feasible); full keyboard operability; visible gold focus ring; ARIA labels + landmarks + live regions for real-time updates; colour-blind safe; no colour-alone; text-resize safe; high-DPI safe.
- Hit targets ≥ 32px (40px primary); hit area includes padding beyond visible asset.
- Forms: 16px field separation; label/input 8px; hints muted below field; errors inline in critical colour + icon; focus to first invalid on submit; success dismissable.
- Empty: message + action. Loading: skeleton matching layout, subtle shimmer, no jump. Error: concise message + recovery.

---

## 17. Content and voice
- Terminology per existing glossary (Cases not Tickets; Identities not Users).
- Date/time: absolute (YYYY-MM-DD HH:MM UTC) with relative ("5 min ago") where helpful; explicit timezone.
- Capitalisation: Title Case headings; sentence case body; verb-first buttons (Acknowledge, Assign, Export).
- Microcopy: terse, operational. Errors: say what happened + how to recover, never blame the user.

---

## 18. Governance (must / must-not)

**Must:** use tokens consistently; honour the spacing scale; maintain hierarchy and alignment; write descriptive ARIA labels; reference semantic/component tokens only.

**Must not:** hardcode any value outside the token system; decorate without user need; break single-scroll (except tables); overuse colour/glow in Mission; hide core actions behind layers; substitute the gold (#ffd21f), navy (#061936), or fonts; mix icon libraries; embed literal colours in chart specs.

---

## 19. Reconciliation log (what changed and why)

- **Fonts:** Bebas Neue + Inter retained over the generic spec's "Inter or Segoe UI"; JetBrains Mono added for telemetry. *(Owner: old fonts stay.)*
- **Icons:** Lucide chosen over the generic spec's Fluent. *(Owner: Lucide yes.)*
- **Charts:** ApexCharts adopted as sole charting library; Vega-Lite removed (declared but never implemented). *(Owner: ApexCharts.)*
- **Max width:** generic spec's hard 1280px cap removed; replaced with per-panel max + multi-panel fill to honour wide/ultrawide requirement. *(Owner: as recommended.)*
- **Top bar:** new spec (56px) adopted. *(Owner: top bar as new spec.)*
- **Sidebar:** new spec (248px + 68px rail, collapsible) adopted; supersedes the 306px static sidebar. *(Owner: new sidebar stays.)*
- **Mode toggle:** functional Standard/Mission toggle adopted; supersedes earlier "no toggle" position. *(Owner: toggle stays.)*
- **All abstract primitives pinned** (colours, spacing numbers incl. 12, font sizes, radii, glow, data palette n=8). *(Owner: you resolve these.)*
- **Commander-specific layers added** (priority P0–P4, build-status badges, OODA phases, connector classes, surface attribution, freshness, three intensity levels). *(Owner: incorporate everything.)*

---

## 20. Implementation path

1. Place this file at `docs/06_ui_build_reference/DESIGN_SYSTEM.md` — authoritative, equal to the shell reference HTMLs.
2. Amend Spec 02 with EARS requirements capturing every section here. Record library decisions (ApexCharts, @xyflow/react, Lucide, shadcn base, JetBrains Mono) in DECISIONS.md.
3. Tokenise: build the three-layer token system with these exact primitive values. Remove all hardcoded values from existing components/pages.
4. Update the design system + the one existing page (Command Centre) to this standard. Verify against one page.
5. Build the collapsible sidebar, top-bar mode toggle, and Mission mode.
6. Then Phase C builds the Cases UI on this finalised system — built once, built right.

This is the single authoritative design source. Build to it exactly. Do not improvise values it has already pinned.

---

## 21. Visual references (mockups) — authoritative

Eight high-fidelity mockups in `docs/06_ui_build_reference/mockups/` are authoritative visual targets, mapped to surfaces in `MOCKUP_INDEX.md`. The written tokens above are the precise values; the mockups are the visual composition target. Token wins on any value conflict; mockup wins on composition/layout.

### Signature components established by the mockups (build these)
- **KPI strip** — horizontal row of 8–10 metric tiles under every page header (label, large value, delta+arrow, optional sparkline).
- **Instrument gauge** — circular scored-metric gauge. Standard: clean arc. Mission: dark instrument cluster with ticks, needle, glow. A Commander signature.
- **Strategic Heading compass** — bespoke compass-rose instrument (heading in degrees + cardinal). Mission mode signature element.
- **Closed-loop lifecycle pipeline** — horizontal stepper (New→Triage→Investigating→Awaiting Feedback→Actioning→Validation→Closure) with per-stage counts and active-stage gold ring. The visual form of the closed-loop case model (Spec 06).
- **Network topology / blast graph** — origin→spread visualisation across zones (Internet→DMZ→Core→Restricted→Crown Jewel), risk-coloured nodes, exposed/contained/blocked edges. Fusion Map — @xyflow/react (React Flow).
- **Ranked table with inline bar+trend** — value + inline horizontal bar + trend arrow per row.
- **Right-rail insight/action column** — persistent Path Explorer / Recommended Actions / Case & Action Center beside main visuals on detail surfaces.
- **Live activity feed** — timestamped events with severity dots, recurring bottom-right card.

### Gauges elevated
Gauges are a primary signature, not a minor chart type. Implement a dedicated gauge component (ApexCharts radialBar or bespoke) supporting: value, /scale, label, threshold bands (red→amber→green), needle, and Mission-mode instrument styling with controlled glow. Meaning never by colour alone (always value + label + position).
