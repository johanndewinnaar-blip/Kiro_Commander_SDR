# Command Centre Build Prompt — DEFERRED

**Status:** DEFERRED until after functional pages are built  
**Decision:** DEC-command-centre-deferred (DECISIONS.md)  
**Resume trigger:** After functional pages built and data-point-to-metric schedule complete

---

## Kiro Prompt — Build the Command Centre (live-ready, Tabler-styled)

Build the Command Centre page as live-ready, reusable components styled with Tabler, populated with seeded data today and swappable to live data later. Use PageContainer for alignment and follow the page-layout-standard steering file.

Produce a BUILD PLAN FIRST — a table: Widget | Zone | Data Status (Available / Mock / Future) | Data Source | Component Type | Scroll Behaviour. Show it, then build.

### CRITICAL: LIVE-READY COMPONENTS, NOT STATIC MOCKUPS

Every widget is a real reusable component with a clean data interface, fed by seed data now and swappable to live data WITHOUT rebuilding.

- NO hardcoded values in any component — every value comes via typed prop or data hook.
- TYPED DATA CONTRACT per widget — a TypeScript interface defining its data shape. Seed and future live data both conform.
- CENTRAL DATA LAYER — create a useCommandCentreData hook returning all data from seed sources today. Components read from this hook only, never seed files directly. Live wiring later changes ONLY this hook.
- LOADING, EMPTY, ERROR states built into every data-driven component.
- Seed data isolated in command-centre-seed.ts — obvious and trivially replaceable.

**Test of success:** wiring live data later means changing only the hook's source, zero component changes.

### REUSABLE COMPONENT LIBRARY (build these as SHARED components, not one-offs)

These will be used across every future page. Build them in the shared UI components location, not inside the Command Centre page:

- **MetricCard** — subheader label + h1 value + trend indicator + optional sparkline
- **TrendArrow** — data-driven: each metric declares direction: 'higherIsBetter' | 'lowerIsBetter' in its interface; the component colours itself green (favourable) or red (unfavourable) automatically. Posture score = higherIsBetter; attack surface, open cases, mean-time metrics = lowerIsBetter.
- **ScrollableCard** — fixed card-header, card-body with max-height + overflow-y:auto, consistent card height on the grid
- **TimeToggle** — segmented control, presets 7D/14D/30D/60D/90D/12M, default 30D
- **StatusBadge** — maps severity/status to vivid colour
- **DataTable** — table table-vcenter wrapper
- **ProgressMeter** — labelled Tabler progress bar with value
- **Gauge** — ApexCharts radialBar wrapper with band label

The Command Centre is the birthplace of the component library. Future pages import these.

---

## PAGE STRUCTURE (top to bottom)

### TOP CONTROL BAR

**TIME TOGGLE** (segmented control): 7D 14D 30D 60D 90D 12M, default 30D. Controls ONLY the trend/sparkline lookback in ROW 1 KPI strip. Does NOT change headline values, does NOT affect other widgets except Remediation Performance (own toggle).

**DROPDOWNS** (visible, mock/non-functional): Business Unit, Severity, Domain, Environment — form-select, default "All".

Square corners on all controls.

**PAGE TOP-RIGHT ACTIONS** (btn)
Commander AI · Create Case · Export · View Live Feed

---

### ROW 1 — KPI STRIP

MetricCard each: subheader label + h1 current value + TrendArrow ("vs last [window]") + ApexCharts sparkline. Current value always present-state; only sparkline + comparison react to time toggle. row row-deck row-cards, equal height.

**Tiles:**
- Estate Posture Score (/100)
- Critical Unresolved Cases
- Fully Covered %
- Framework Compliance %
- Tool Health Status %
- KEV Exposure Count
- Internal Attack Surface
- External Attack Surface
- Open P0 Cases
- Analysts Online

---

### ROW 2 — PRIMARY ANALYSIS

- **Estate Risk Posture** — Gauge (ApexCharts radialBar, /100) + band label, red→amber→green sweep by score
- **Risk by Domain** — ProgressMeter bars (NOT chart): Operations, Identity, Architecture, Governance, Tool Health
- **Cases by Severity (30d)** — ApexCharts line, one line per severity
- **Critical Exposure Trend (30d)** — ApexCharts line
- **Business Unit Posture** — DataTable: BU, posture score, inline trend, trend value

---

### ROW 3

- **All Cases Trend** — ApexCharts line, total case volume over time

---

### ROW 4 — OPERATIONAL DETAIL (row-deck)

- **Exposure & Coverage Summary** — MetricCards: Internet-facing Exposure, Unmanaged External Assets, BAS-confirmed Exploitable, Assets Not Fully Covered
- **Blast Zone Summary** — DataTable: Zone, Affected Assets, Criticality (badge), Likelihood (progress), Zone Score
- **Attack Path & Lateral Movement** — signal list with horizontal indicators: Likelihood of Compromise, Reachability, Trust Zones Crossed, Exposed Entry Points
- **Tool Health & Resilience** — status counts (Healthy/Warning/Degraded, status-dot) + top connectors list with status

---

### ROW 5 — DETAIL (row-deck)

- **Asset Overview** — MetricCards (Total, Critical, Managed, Unmanaged) + ProgressMeter by domain (Cloud, On Prem, SaaS, OT/IoT) % + count
- **Governance & Compliance** — DataTable: Framework, Compliance %, trend, maturity badge
- **Identity / High Risk Access Signals** — list with horizontal indicators + value: Privileged Accounts At Risk, Dormant Admins, Access Anomalies, MFA Gaps
- **Remediation Performance** — OWN TIME TOGGLE (default 30D). MetricCards: SLA Compliance %, Mean Time to Triage, Mean Time to Validate, Automation Success Rate

---

### ROW 6 — BOTTOM

- **Strategic Priorities / Executive Summary** — numbered list-group, short, no scroll
- **Hot Cases / Priority Queue** — ScrollableCard. DataTable: Case ID, Title, Domain, Severity (badge), Status, SLA Status (badge At Risk/Breached). Covers P1–P3, sorted by SLA risk.
- **Architecture Hotspots** — ScrollableCard: Service/Zone, Drift, Exposure, Criticality, Trend
- **Live Activity Feed** — ScrollableCard: list-group-flush, timestamp + severity badge + message + source

---

## STYLING RULES

- Tabler classes throughout: card, card-header, card-body, card-title, card-actions, subheader, table table-vcenter, list-group list-group-flush, badge, status-dot, progress, progress-bar, form-select, btn, btn-ghost-secondary.
- Square corners everywhere (border-radius 0), no exceptions — including charts, buttons, inputs, badges, dropdowns.
- Inter inherited globally — never override font-family.
- ApexCharts via react-apexcharts. Chart colours use DS-1.0 §13 semantic --data-* tokens, NO literal hex. Charts square, no drop shadows, subtle gridlines, fonts inherit.
- row row-deck row-cards for equal-height card rows.
- Works in both light and dark mode via Tabler data-bs-theme.
- Use existing Lucide icon map (getIcon) — no new icon libraries.

---

## COLOUR RULES

### VIVID SEMANTIC COLOUR for all DATA elements — severity, status, health, trend, charts, gauges, progress bars:

- Critical / breached / P0 → red
- High / warning / at-risk / P1 → amber/orange
- Healthy / pass / resolved / favourable → green
- Informational / medium / P2 → blue/azure
- Low / P3 → grey/muted

Use Tabler badge colours (bg-red, bg-orange, bg-yellow, bg-green, bg-azure, bg-blue, bg-purple) and --data-* tokens for charts.

### RESTRAINED CHROME

Sidebar, header, cards, borders, body text stay Tabler default neutral. No colour on furniture.

Gold remains ONLY in the COMMANDER logo wordmark. Nowhere else.

Gauge uses red→amber→green sweep matching score band.

TrendArrow colours by FAVOURABILITY not direction — driven by each metric's direction flag. A rising attack surface is red (unfavourable up); a rising posture score is green (favourable up).

**Colour must carry meaning. Never colour for decoration. Calm chrome makes data colour read instantly.**

---

## SCOPE

Do NOT change routes, hooks, data logic, or business logic outside the Command Centre page and its new seed/data-hook/shared-component modules.

Build the BUILD PLAN first and show it, then build the shared components, then assemble the page.

---

## EXECUTION SEQUENCE

1. Present BUILD PLAN table
2. Build shared reusable components (apps/web/src/components/)
3. Create command-centre-seed.ts (packages/contracts/src/fixtures/)
4. Create useCommandCentreData hook (apps/web/src/hooks/)
5. Assemble Command Centre page (apps/web/src/app/page.tsx)
6. Verify loading/empty/error states
7. Verify light/dark mode
8. Verify time toggle affects only ROW 1 sparklines + Remediation Performance

---

## DATA ARCHITECTURE CONSTRAINT

**CRITICAL:** When this prompt is resumed, the data hook (`useCommandCentreData`) must be a thin presentation-layer adapter over the established data-access pattern, not a new data layer. By the time this is built, the functional pages will have established the canonical data-access pattern. The Command Centre hook must follow that pattern, not invent a parallel one.
