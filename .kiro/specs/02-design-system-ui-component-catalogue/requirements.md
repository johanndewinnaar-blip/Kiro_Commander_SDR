# Requirements — Design System and UI Component Catalogue

**Spec ID:** `02-design-system-ui-component-catalogue`  
**Target version:** v1.3.1  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #11a UI/UX Design System, Spec #11b Workspace & Dashboard Composition, Spec #41 Military-Intelligence UI Doctrine, Spec #43 Graph/Gauge/Overlay System, Spec #53 Shell UI Usability Correction
**v1.3 depth:** full content-depth translation applied to this spec during v1.3 remediation.

## Purpose

Commander visual language, UI tokens, card/panel patterns, status badges and responsive shell behaviours.

## Scope in

- Provide a versioned implementation plan for Design System and UI Component Catalogue.
- Preserve Commander authority and no-MVP doctrine.
- Support local-first development.
- Align with AWS target architecture where relevant.
- Use seed/mock data until Phase 2 approves real connectors.
- Keep Commander AI present where the user journey requires assistance, explanation, drafting or prioritisation.

## Scope out

- Live AWS resource creation.
- Real vendor API credentials or production integrations.
- Production billing.
- n8n orchestration.
- Custom Kiro powers during initial conversion.
- Any behaviour that violates SOC or Insider Risk boundaries.

## User stories and EARS requirements

### Requirement 1 — Authority compliance

WHEN Kiro works on this domain  
THE SYSTEM SHALL read Commander authority, relevant Kiro steering, this spec and its owning build pack before proposing changes.

### Requirement 2 — Build visibility

WHEN this domain is not fully implemented  
THE SYSTEM SHALL still represent committed routes, pages, panels or data objects as scaffold, build or stub states rather than omitting them.

### Requirement 3 — Mock-first data

WHEN data is needed before Phase 2 real connector approval  
THE SYSTEM SHALL use seed/mock fixtures that preserve the canonical entity shape and avoid real customer secrets or vendor credentials.

### Requirement 4 — Auditability

WHEN this domain creates, changes, closes, suppresses, routes, scores, recommends or drafts anything material  
THE SYSTEM SHALL emit an auditable record design and define review points.

### Requirement 5 — Commander AI grounding

WHEN Commander AI is used in this domain  
THE SYSTEM SHALL ground outputs in available Commander data, label uncertainty, and avoid external writes without explicit approval.

### Requirement 6 — AWS alignment

WHEN this domain has backend, runtime, storage, queueing, AI or deployment implications  
THE SYSTEM SHALL record the local-first behaviour and the future AWS-aligned option without provisioning infrastructure.

## Domain requirements translated from baseline

### Domain Requirement 1 — Baseline rule

WHEN a component is created THE SYSTEM SHALL use the Commander design tokens for colour, typography, spacing and interaction state.

### Domain Requirement 2 — Baseline rule

WHEN a dashboard card is rendered THE SYSTEM SHALL preserve squared alignment, visual symmetry and information hierarchy.

### Domain Requirement 3 — Baseline rule

WHEN a military-intelligence visual metaphor is used THE SYSTEM SHALL keep it professional, restrained and functional.

### Domain Requirement 4 — Baseline rule

WHEN light and dark themes are represented THE SYSTEM SHALL preserve equivalent information density and route coverage.

### Domain Requirement 5 — Baseline rule

WHEN a component enters the catalogue THE SYSTEM SHALL document state, usage, accessibility and data expectations.

### Domain Requirement 6 — Baseline rule

WHEN a UI reference conflicts with feature authority THE SYSTEM SHALL treat the UI reference as layout inspiration only.

## v1.3 baseline-depth requirements

### v1.3 Requirement 1 — Command clarity

WHEN a dashboard, case page or admin surface is rendered THE SYSTEM SHALL show risk, ownership, status, next action and blockers without requiring the user to hunt across screens. [Source: Spec #11a §2 Design Principles]

### v1.3 Requirement 2 — Dense but legible layout

WHEN a table, dashboard or operational view is information-rich THE SYSTEM SHALL preserve readable spacing, hierarchy, labels and grouping. [Source: Spec #11a §2 Design Principles]

### v1.3 Requirement 3 — Disabled action explanation

WHEN an action is disabled THE SYSTEM SHALL display why it is disabled and what approval, permission, data or state is required. [Source: Spec #11a §2 Design Principles]

### v1.3 Requirement 4 — Governed action modal

WHEN a destructive, push, closure, suppression or approval action is presented THE SYSTEM SHALL show risk, approval, audit and rollback impact before submission. [Source: Spec #11a §4 Component Catalogue]

### v1.3 Requirement 5 — Sticky case header

WHEN a long case page or lifecycle page is rendered THE SYSTEM SHALL keep the case identity, status, owner, priority and key actions available in a sticky header. [Source: Spec #11a §3.3 Spacing and Layout]

### v1.3 Requirement 6 — Communication entry point

WHEN a case, sub-case, action or swarm workstream is displayed THE SYSTEM SHALL provide a permission-aware communication entry point. [Source: Spec #11a §5 Case and Communication UI Patterns]

### v1.3 Requirement 7 — Workspace composition

WHEN the workspace model is rendered THE SYSTEM SHALL preserve Command Centre, Case Management, Vulnerability Management, Admin, CISO and SOM dashboard composition responsibilities. [Source: Spec #11b §2-§8]

### v1.3 Requirement 8 — Case queue composition

WHEN the Case Management screen is rendered THE SYSTEM SHALL include queue, case detail and sub-case/action panel structures. [Source: Spec #11b §4 Case Management Screen]

### v1.3 Requirement 9 — CISO dashboard composition

WHEN the CISO dashboard is rendered THE SYSTEM SHALL show executive posture, major risk, control coverage, trend and strategic planning views without operational clutter. [Source: Spec #11b §7 CISO Dashboard]

### v1.3 Requirement 10 — SOM dashboard composition

WHEN the SOM dashboard is rendered THE SYSTEM SHALL show operational load, routing, SLA, validation and team-affinity information for the security operations manager persona. [Source: Spec #11b §8 SOM Dashboard]

### v1.3 Requirement 11 — Military-intelligence surface treatment

WHEN an operational surface is implemented THE SYSTEM SHALL apply the Commander military-intelligence interface doctrine without turning the product into decorative or game-like UI. [Source: Spec #41 §2 Doctrine Statement]

### v1.3 Requirement 12 — Visual intensity selection

WHEN a surface enters Operational Standard, Tactical Analysis or Emergency Command mode THE SYSTEM SHALL apply the corresponding visual intensity level and avoid overusing emergency styling. [Source: Spec #41 §5 Visual Intensity Levels]

### v1.3 Requirement 13 — P0 visual rule

WHEN a P0 zero-day condition is active THE SYSTEM SHALL apply the P0 visual rule consistently to priority indicators, war-room surfaces and operating picture alerts. [Source: Spec #41 §P0 Zero-Day UI Rule]

### v1.3 Requirement 14 — OODA visual convention

WHEN an OODA surface is displayed THE SYSTEM SHALL use Observe, Orient, Decide and Act conventions consistently across widgets and dashboard families. [Source: Spec #41 §V2.6-2 OODA Visualisation Conventions]

### v1.3 Requirement 15 — Dual operating picture convention

WHEN internal or external operating pictures are displayed THE SYSTEM SHALL preserve the distinct visual convention for each picture and do not merge them into a single generic dashboard. [Source: Spec #41 §V2.6-3 Dual Operating Picture Conventions]

### v1.3 Requirement 16 — Approved graph use

WHEN a chart or graph is added to a Commander surface THE SYSTEM SHALL use an approved graph type and assign it to an explicit operational purpose. [Source: Spec #43 §3 Approved Graph Types]

### v1.3 Requirement 17 — Overlay preservation

WHEN a graph, Fusion Map or operating picture supports contextual overlays THE SYSTEM SHALL render required overlays without hiding the base signal, entity or relationship meaning. [Source: Spec #43 §4 Required Overlays]

### v1.3 Requirement 18 — Fusion Map node encoding

WHEN a Fusion Map node is displayed THE SYSTEM SHALL encode node type, state, priority and surface relevance according to the graph/gauge/overlay system. [Source: Spec #43 §6 Fusion Map Visual Encoding]

### v1.3 Requirement 19 — Gauge rule

WHEN a gauge is used THE SYSTEM SHALL show thresholds, labels and meaning so the user can interpret the gauge without colour alone. [Source: Spec #43 §7 Gauge Rules]

### v1.3 Requirement 20 — Global search placement

WHEN the application shell includes global search or command search THE SYSTEM SHALL place it prominently in the horizontal shell without crowding Commander AI or notification controls. [Source: Spec #53 §Global Search / Command Search]

### v1.3 Requirement 21 — Commander AI placement

WHEN Commander AI is present in the shell THE SYSTEM SHALL place it consistently as an action entry point and not as an optional hidden later-scope item. [Source: Spec #53 §Commander AI Placement]

### v1.3 Requirement 22 — Sidebar scroll

WHEN the vertical menu contains expandable groups THE SYSTEM SHALL preserve scrolling so expanded sections remain reachable. [Source: Spec #53 §Sidebar Scroll]

### v1.3 Requirement 23 — Menu expand collapse

WHEN menu groups are expanded or collapsed THE SYSTEM SHALL preserve predictable state, visible hierarchy and user orientation. [Source: Spec #53 §Menu Expand/Collapse]

### v1.3 Requirement 24 — Colour accessibility

WHEN status, priority or risk is indicated by colour THE SYSTEM SHALL pair colour with text, iconography or shape so critical workflows do not rely on colour alone. [Source: Spec #11a §3.2 Typography]

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.


## v1.3.2 design language remediation requirements

> These requirements capture the authoritative visual language from the v2.6 baseline shell references. They correct the design token and component implementation to match the actual baseline visual treatment.

### Typography

### v1.3.2 Requirement 1 — Bebas Neue display font

WHEN the design system is initialised THE SYSTEM SHALL load Bebas Neue as the display font family for brand wordmark and page headings. [Source: both shell references]

### v1.3.2 Requirement 2 — Inter body font

WHEN the design system is initialised THE SYSTEM SHALL load Inter (weights 400, 500, 600, 700, 800) as the body font family for all UI text. [Source: both shell references]

### v1.3.2 Requirement 3 — Dense base font size

WHEN body text is rendered THE SYSTEM SHALL use a 13px base font size to honour the dense-but-legible discipline. [Source: both shell references]

### Colour palette

### v1.3.2 Requirement 4 — Navy chrome colour

WHEN navy is applied to chrome surfaces THE SYSTEM SHALL use the exact hex #061936 for primary navy and #071f43 for navy variant. [Source: shell reference v11]

### v1.3.2 Requirement 5 — Gold accent colour

WHEN gold is applied as accent THE SYSTEM SHALL use the exact hex #ffd21f and never substitute amber, brass, or muted gold variants. [Source: both shell references]

### v1.3.2 Requirement 6 — Operational App content background

WHEN the Operational App content area is rendered THE SYSTEM SHALL use a light background (#fff page, #f2f5f9 panel) with ink text (#0e1d32). [Source: shell reference v11]

### v1.3.2 Requirement 7 — Commercial Control Plane content background

WHEN the Commercial Control Plane content area is rendered THE SYSTEM SHALL use a dark background (#0d0d0d) with light text (#f4f4f4). [Source: commercial control plane shell v3]

### Chrome dimensions

### v1.3.2 Requirement 8 — Top bar height

WHEN the top bar is rendered THE SYSTEM SHALL be exactly 68px tall. [Source: both shell references]

### v1.3.2 Requirement 9 — Sidebar width

WHEN the sidebar is rendered THE SYSTEM SHALL be exactly 306px wide on standard viewports, reducing to 286px below 1450px viewport width. [Source: shell reference v11]

### Top bar composition

### v1.3.2 Requirement 10 — Brand wordmark

WHEN the brand wordmark is rendered THE SYSTEM SHALL compose it as three Bebas Neue elements separated by a thin gold vertical pipe: SEIERTECH (cream/off-white #f4f1eb), pipe (gold #ffd21f), COMMANDER (gold), SDR (white). [Source: shell reference v11]

### v1.3.2 Requirement 11 — Top navigation tabs

WHEN top navigation tabs are rendered THE SYSTEM SHALL display them as horizontal tabs with a 3px gold border-bottom on the active tab and rgba(255,210,31,.055) tint background. [Source: shell reference v11]

### v1.3.2 Requirement 12 — Global search input

WHEN the global search input is rendered THE SYSTEM SHALL be 440px wide on standard viewports with a translucent white background (rgba(255,255,255,.075)) and 1px translucent border. [Source: shell reference v11]

### Sidebar composition

### v1.3.2 Requirement 13 — Sidebar gradient

WHEN the sidebar is rendered THE SYSTEM SHALL display a vertical gradient from #06152d to #030e1e. [Source: shell reference v11]

### v1.3.2 Requirement 14 — Sidebar navigation structure

WHEN sidebar navigation is rendered THE SYSTEM SHALL present a two-level structure of expandable group headers with sub-items, sub-items indented with a vertical gold-tinted divider (rgba(255,210,31,.16)). [Source: shell reference v11]

### v1.3.2 Requirement 15 — Sidebar scrollbar

WHEN the sidebar scrollbar is rendered THE SYSTEM SHALL use a 6px width with a gold thumb (rgba(255,210,31,.55)) on a translucent track. [Source: shell reference v11]

### Component patterns

### v1.3.2 Requirement 16 — Page header

WHEN the page header for an Operational App route is rendered THE SYSTEM SHALL include an uppercase grey breadcrumb eyebrow, a 22px h1 page title, and a right-aligned status tile with a green dot and "Last updated X" text on a white background with bottom border #dbe3ef. [Source: shell reference v11]

### v1.3.2 Requirement 17 — Card component (Operational App)

WHEN a card is rendered in the Operational App content area THE SYSTEM SHALL use a white background with 1px border #dbe3ef, 18px padding, uppercase 13px h3 titles with 0.06em letter-spacing, and mid-grey body text #68758b. [Source: shell reference v11]

### v1.3.2 Requirement 18 — User identity display

WHEN a user identity is displayed THE SYSTEM SHALL show a 34px avatar tile with gold-bordered initials in Bebas Neue, alongside the user's name (12px bold) and role (10px muted). [Source: shell reference v11]


## DS-1.0 design system requirements (authoritative — supersedes v1.3.2 where conflicts exist)

> These requirements capture the full authoritative DESIGN_SYSTEM.md (DS-1.0). Where a value here conflicts with the earlier v1.3.2 remediation section, DS-1.0 wins. Source: docs/06_ui_build_reference/DESIGN_SYSTEM.md and docs/06_ui_build_reference/MOCKUP_INDEX.md.

### Token architecture

### DS-1.0 Requirement 1 — Three-layer token architecture

WHEN the design system is structured THE SYSTEM SHALL implement a three-layer token architecture: primitive tokens (raw values), semantic tokens (mapped to meaning, mode-overridable), and component tokens (per-component dimensions). No component may reference a primitive value directly. [Source: DESIGN_SYSTEM.md §1]

### DS-1.0 Requirement 2 — No hardcoded values

WHEN any UI element is styled THE SYSTEM SHALL reference semantic or component tokens only. No hardcoded pixel values, hex colours, or font sizes may appear in component or page code. [Source: DESIGN_SYSTEM.md §1.3 Governance]

### Spacing

### DS-1.0 Requirement 3 — 8px base grid

WHEN spacing is applied THE SYSTEM SHALL use the 8px base grid scale: 0, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px. No arbitrary pixel values (prior 14px snaps to 12 or 16; 18px snaps to 16; 26px snaps to 24; 28px snaps to 24 or 32). [Source: DESIGN_SYSTEM.md §2.1]

### DS-1.0 Requirement 4 — Radius scale

WHEN border radius is applied THE SYSTEM SHALL use: sm=4px, md=8px, lg=12px, full=9999px. [Source: DESIGN_SYSTEM.md §2.2]

### Colours

### DS-1.0 Requirement 5 — Brand anchors

WHEN brand colours are applied THE SYSTEM SHALL use: navy #061936, navy-2 #071f43, gold #ffd21f (exact, never substituted), cream #f4f1eb. [Source: DESIGN_SYSTEM.md §2.3]

### DS-1.0 Requirement 6 — Standard mode neutral ramp

WHEN Standard (Light) mode surfaces are rendered THE SYSTEM SHALL use the neutral ramp: #ffffff, #f2f5f9, #e7ecf3, #dbe3ef, #c2cede, #9aa9be, #68758b, #4a5667, #2e3848, #1a2433, #0e1d32. [Source: DESIGN_SYSTEM.md §2.4]

### DS-1.0 Requirement 7 — Mission mode HUD ramp

WHEN Mission (HUD/Dark) mode surfaces are rendered THE SYSTEM SHALL use: bg-0 #050b16, bg-1 #08111f, bg-2 #0c1828, bg-3 #122236, line rgba(255,255,255,0.10), line-2 rgba(255,255,255,0.16), text-0 #e8f0fb, text-1 #aebfd4, text-2 #6f8198, grid-opacity 0.05. [Source: DESIGN_SYSTEM.md §2.5]

### DS-1.0 Requirement 8 — Signal colours

WHEN status is indicated THE SYSTEM SHALL use: critical #d92d20, warning #e8a317, success #1a7a3f, info #2563aa, neutral #68758b. These work in both modes. [Source: DESIGN_SYSTEM.md §2.6]

### DS-1.0 Requirement 9 — Data palette (charts)

WHEN chart data series are coloured THE SYSTEM SHALL use the 8-colour data palette: #2563aa, #e8a317, #1a7a3f, #b5446e, #4ba3c3, #c2611f, #7a5cc2, #8a8f98. Beyond 8 series, charts aggregate rather than add colours. [Source: DESIGN_SYSTEM.md §2.7]

### DS-1.0 Requirement 10 — Glow (Mission mode only)

WHEN glow effects are applied in Mission mode THE SYSTEM SHALL use radius 8px, intensity 0.35 alpha, maximum 2 glow elements per card, only on active/signalled data, never decorative. [Source: DESIGN_SYSTEM.md §2.8]

### Motion

### DS-1.0 Requirement 11 — Motion scale

WHEN animations are applied THE SYSTEM SHALL use: micro 100ms, standard 180ms, complex 250ms. Easing: default ease-out, interaction ease-in-out, data linear. Respect prefers-reduced-motion globally. [Source: DESIGN_SYSTEM.md §2.9]

### Typography

### DS-1.0 Requirement 12 — Font families

WHEN fonts are applied THE SYSTEM SHALL use: display Bebas Neue, body Inter, mono JetBrains Mono. Mono is mandatory for numeric values in Mission mode. [Source: DESIGN_SYSTEM.md §2.10]

### DS-1.0 Requirement 13 — Type scale

WHEN text is sized THE SYSTEM SHALL use: display-lg 24px, display 22px, h1 22px, h2 18px, h3 14px, body 13px, caption 12px, micro 10px. Letter spacing: display 0.09-0.11em, uppercase eyebrows 0.06em. Line heights: body 1.45, heading 1.2, dense-table 1.3. [Source: DESIGN_SYSTEM.md §2.11]

### Semantic tokens

### DS-1.0 Requirement 14 — Mode-overridable semantic tokens

WHEN semantic tokens are resolved THE SYSTEM SHALL map: surface-primary (Standard: neutral-50, Mission: hud-bg-1), surface-secondary (Standard: neutral-0, Mission: hud-bg-2), surface-elevated (Standard: neutral-0, Mission: hud-bg-3), text-primary (Standard: neutral-900, Mission: hud-text-0), text-secondary (Standard: neutral-500, Mission: hud-text-1), text-muted (Standard: neutral-400, Mission: hud-text-2), border-default (Standard: neutral-200, Mission: hud-line-2), border-subtle (Standard: neutral-100, Mission: hud-line). [Source: DESIGN_SYSTEM.md §3]

### DS-1.0 Requirement 15 — Shell chrome invariant

WHEN the shell chrome (top bar, sidebar) is rendered THE SYSTEM SHALL always use navy/dark regardless of workspace mode. The mode toggle changes the workspace, not the shell. [Source: DESIGN_SYSTEM.md §3]

### Component tokens

### DS-1.0 Requirement 16 — Pinned component dimensions

WHEN component dimensions are applied THE SYSTEM SHALL use: topbar-height 56px, sidebar-width 248px, sidebar-rail 68px, card-padding 16px, card-radius 8px, grid-gap 16px, content-padding 24px, pageheader-padding 24px, table-row-height 36px, table-header-height 40px, button-height 32px (36px emphasis), input-height 34px, item-height 36px, search-width 440px, avatar-size 32px. [Source: DESIGN_SYSTEM.md §4]

### Workspace modes

### DS-1.0 Requirement 17 — Standard mode

WHEN Standard (Light) mode is active THE SYSTEM SHALL render neutral surfaces, white cards, minimal emphasis, light content on navy chrome. Used for management, configuration, reporting. [Source: DESIGN_SYSTEM.md §9.1]

### DS-1.0 Requirement 18 — Mission mode

WHEN Mission (HUD/Dark) mode is active THE SYSTEM SHALL render layered dark surfaces (no shadows — contrast difference only), colour only for status/alert (under 20% screen area), controlled glow (≤2 per card, low intensity, active/signalled data only), optional faint gridlines (0.05 opacity), numeric values in mono font. No decorative colour, gradients, or neon. [Source: DESIGN_SYSTEM.md §9.2]

### DS-1.0 Requirement 19 — Three intensity levels

WHEN intensity levels are applied THE SYSTEM SHALL map: Operational Standard = Standard mode, Tactical Analysis = Mission mode standard intensity, Emergency Command = Mission mode elevated intensity (P0 War Room forces Mission regardless of toggle). [Source: DESIGN_SYSTEM.md §9.3]

### DS-1.0 Requirement 20 — Mode toggle

WHEN the mode toggle is activated THE SYSTEM SHALL switch the workspace between Standard and Mission. The shell chrome remains navy/dark in both modes. [Source: DESIGN_SYSTEM.md §6]

### Layout

### DS-1.0 Requirement 21 — Top bar composition

WHEN the top bar is rendered THE SYSTEM SHALL be 56px tall with structure: Left (Hamburger + Logo), Centre (Search/context), Right (AI action, Mode toggle, Notifications, User profile). Hit areas ≥40×40px. Brand wordmark: SEIERTECH (cream) | gold pipe | COMMANDER (gold) | SDR (white) in Bebas Neue. [Source: DESIGN_SYSTEM.md §6]

### DS-1.0 Requirement 22 — Sidebar composition

WHEN the sidebar is rendered THE SYSTEM SHALL be 248px expanded or 68px icon rail (collapsible via hamburger, 180ms transition, state persisted). Item height 36px, padding 8px 12px, icon 20px. Active item: gold-tinted background rgba(255,210,31,0.08) + gold left border. Custom gold scrollbar (6px, rgba(255,210,31,0.55) thumb). Icons required (Lucide). Labels in expanded mode; tooltips in rail mode (200ms delay). [Source: DESIGN_SYSTEM.md §7]

### DS-1.0 Requirement 23 — Workspace structure

WHEN a workspace page is rendered THE SYSTEM SHALL follow: Header (page title, primary actions), Insight Row (summary KPIs + primary chart/gauge), Content Grid (12-column internal grid, default 3-col cards, 2-col wide, 16px gutters), Detail Section (extended lists, tables, drill-down). Padding 24px. Panel max-width ~1320px; multi-panel on wide screens. [Source: DESIGN_SYSTEM.md §8]

### DS-1.0 Requirement 24 — Multi-panel fill

WHEN wide/ultrawide viewports are used THE SYSTEM SHALL add panels/columns rather than stretching one panel. Master-detail surfaces render side-by-side on wide screens, collapsing to full-page navigation below ~1400px. [Source: DESIGN_SYSTEM.md §5, §8]

### Iconography

### DS-1.0 Requirement 25 — Lucide icons

WHEN icons are used THE SYSTEM SHALL use Lucide exclusively (outline, monochrome). Sizes: 16px inline, 20px nav/default, 24px feature. Hit area ≥32px (40px primary). Always paired with label or tooltip; never meaning by icon alone. Required on: sidebar groups/items, top-nav, status indicators, action buttons, empty states, domain workspaces. [Source: DESIGN_SYSTEM.md §11]

### Signature components

### DS-1.0 Requirement 26 — KPI strip

WHEN a dashboard page is rendered THE SYSTEM SHALL include a horizontal KPI strip of 8-10 metric tiles directly under the page header. Each tile: small label, large value, delta/trend with up/down arrow, optional sparkline. [Source: DESIGN_SYSTEM.md §21; mockup: command-centre-standard.png, command-centre-mission.png]

### DS-1.0 Requirement 27 — Instrument gauge

WHEN a scored metric is displayed THE SYSTEM SHALL render a circular instrument gauge. Standard mode: clean arc with value, /scale, label, threshold colour. Mission mode: dark instrument-cluster with tick marks, needle, glow on active range. Meaning never by colour alone (always value + label + position). [Source: DESIGN_SYSTEM.md §21; mockup: command-centre-mission.png, case-handling-dashboard.png]

### DS-1.0 Requirement 28 — Strategic Heading compass

WHEN strategic/operational direction is displayed THE SYSTEM SHALL render a bespoke compass-rose instrument (N/S/E/W) with needle pointing to heading (degrees + cardinal). Mission mode signature element. [Source: DESIGN_SYSTEM.md §21; mockup: command-centre-mission.png]

### DS-1.0 Requirement 29 — Closed-loop lifecycle pipeline

WHEN case lifecycle is visualised THE SYSTEM SHALL render a horizontal stepper: New → Triage → Investigating → Awaiting Feedback → Actioning → Validation → Closure, with per-stage counts and active-stage gold ring. [Source: DESIGN_SYSTEM.md §21; mockup: case-handling-dashboard.png]

### DS-1.0 Requirement 30 — Network topology / blast graph

WHEN network topology or blast radius is visualised THE SYSTEM SHALL render origin→spread across zones (Internet→DMZ→Core→Restricted→Crown Jewel), risk-coloured nodes, exposed/contained/blocked edges. Bespoke graph library (not Vega-Lite). [Source: DESIGN_SYSTEM.md §21; mockup: blast-radius-command-mission.png, blast-radius-command-detailed.png]

### DS-1.0 Requirement 31 — Ranked table with inline bar+trend

WHEN tabular metrics are displayed THE SYSTEM SHALL pair value with inline horizontal bar and trend arrow per row. [Source: DESIGN_SYSTEM.md §21; mockup: command-centre-standard.png, ciso-dashboard.png]

### DS-1.0 Requirement 32 — Right-rail insight/action column

WHEN detail surfaces are rendered THE SYSTEM SHALL include a persistent right rail for Path Explorer, Recommended Actions, Case & Action Center beside main visuals. [Source: DESIGN_SYSTEM.md §21; mockup: blast-radius-command-detailed.png]

### DS-1.0 Requirement 33 — Live activity feed

WHEN real-time events are displayed THE SYSTEM SHALL render a timestamped live activity feed with severity dots and entity references. [Source: DESIGN_SYSTEM.md §21; mockup: command-centre-mission.png, case-handling-dashboard.png]

### Commander-specific semantic layers

### DS-1.0 Requirement 34 — Priority scale

WHEN priority is indicated THE SYSTEM SHALL use: P0 #d92d20 + filled diamond + "P0" (Emergency Command treatment), P1 #e8531f + filled triangle + "P1", P2 #e8a317 + filled circle + "P2", P3 #2563aa + outline circle + "P3", P4 #68758b + outline square + "P4". Never colour alone. [Source: DESIGN_SYSTEM.md §14.1]

### DS-1.0 Requirement 35 — OODA phase colours

WHEN OODA phases are indicated THE SYSTEM SHALL use: Observe #2563aa, Orient #4ba3c3, Decide #e8a317, Act #1a7a3f. Always paired with phase label. [Source: DESIGN_SYSTEM.md §14.2]

### DS-1.0 Requirement 36 — Connector class treatment

WHEN connector classes are displayed THE SYSTEM SHALL use: A (blue #2563aa + "A"), B (cyan #4ba3c3 + "B"), C (violet #7a5cc2 + "C"), D (amber #e8a317 + "D"). Class always shown as letter + chip, never colour alone. [Source: DESIGN_SYSTEM.md §14.3]

### DS-1.0 Requirement 37 — Surface attribution treatment

WHEN surface attribution is displayed THE SYSTEM SHALL use: internal_attack_surface (neutral fill chip + shield-half icon + "Internal"), external_attack_surface (gold outline chip + globe icon + "External"). [Source: DESIGN_SYSTEM.md §14.4]

### DS-1.0 Requirement 38 — Data freshness treatment

WHEN data freshness is indicated THE SYSTEM SHALL use: Live (green dot + "Live"), Stale (amber dot + "Stale Xm"), No data (grey dash + "No data"). [Source: DESIGN_SYSTEM.md §14.5]

### Data visualisation

### DS-1.0 Requirement 39 — Vega-Lite charts

WHEN charts are rendered THE SYSTEM SHALL use Vega-Lite as the primary charting library. Charts reference --data-* semantic tokens only (never literal hex). Every chart includes: title, legend (if discrete colour), tooltip, time context (if time series), empty state. [Source: DESIGN_SYSTEM.md §13]

### DS-1.0 Requirement 40 — Approved chart types

WHEN a chart type is selected THE SYSTEM SHALL use only approved types: line (trend), bar (comparison), area (cumulative trend), donut (composition — sparingly), gauge (single metric vs thresholds), sparkline (inline trend), scatter (correlation), histogram (distribution). Each instance must have an explicit operational purpose. [Source: DESIGN_SYSTEM.md §13]

### DS-1.0 Requirement 41 — Gauge component

WHEN a gauge is rendered THE SYSTEM SHALL show value, threshold bands (red→amber→green), numeric label, and meaning without colour alone (label + position). Mission mode: instrument styling with controlled glow. [Source: DESIGN_SYSTEM.md §13, §21]

### Accessibility and governance

### DS-1.0 Requirement 42 — Accessibility baseline

WHEN UI is rendered THE SYSTEM SHALL meet WCAG AA minimum (AAA where feasible): full keyboard operability, visible gold focus ring, ARIA labels + landmarks + live regions for real-time updates, colour-blind safe, no colour-alone, text-resize safe, high-DPI safe. [Source: DESIGN_SYSTEM.md §16]

### DS-1.0 Requirement 43 — Hit targets

WHEN interactive elements are rendered THE SYSTEM SHALL ensure hit targets ≥32px (40px primary). Hit area includes padding beyond visible asset. [Source: DESIGN_SYSTEM.md §16]

### DS-1.0 Requirement 44 — Component states

WHEN components are implemented THE SYSTEM SHALL define states for: default, hover, active, focus, disabled, loading, error. [Source: DESIGN_SYSTEM.md §12]

### Application boundaries

### DS-1.0 Requirement 45 — Operational App visual language

WHEN the Operational App is rendered THE SYSTEM SHALL use light Standard workspace on navy chrome, brand SEIERTECH | COMMANDER SDR, Mission toggle available. [Source: DESIGN_SYSTEM.md §15]

### DS-1.0 Requirement 46 — Commercial Control Plane visual language

WHEN the Commercial Control Plane is rendered THE SYSTEM SHALL use dark chrome (#050505 bar, #080808 sidebar, #0d0d0d content), "INTERNAL" badge, "PROD ACTIONS REQUIRE APPROVAL" header tile, brand COMMANDER COMMERCIAL CONTROL, flat single-level sidebar. [Source: DESIGN_SYSTEM.md §15]

### DS-1.0 Requirement 47 — Tenant Admin visual language

WHEN the Tenant Admin is rendered THE SYSTEM SHALL inherit Operational App visual language with a "TENANT ADMIN" brand marker, until a dedicated reference is produced. [Source: DESIGN_SYSTEM.md §15]
