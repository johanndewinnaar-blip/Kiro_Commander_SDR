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
