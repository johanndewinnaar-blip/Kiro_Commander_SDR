# Commander SDR — UI/UX Assessment Authority

**Version:** UIAA-1.0
**Status:** Authoritative. Governs all future page-level, group-level, and programme-level UI/UX reviews.
**Date:** 2026-06-09
**Authority chain:** Subordinate to AUTHORITY_MODEL.md (Tier 5 — Kiro steering/execution layer). References Tiers 1–4 (baseline specs, master proposition, child specs, route/feature registries) as assessment inputs.
**Scope:** Desktop only (per DS-1.0). Three application boundaries: Operational App, Tenant Admin, Control Plane.

---

## 1. Purpose

This document establishes the authoritative framework for performing structured UI/UX and operational conformity reviews across the Commander SDR page estate.

Commander is not a traditional application. It is a Security Command and Control (Security C2) platform operating the Security Drift Response (SDR) discipline. Traditional UI review methodologies are therefore insufficient. This authority defines a Commander-specific review methodology that accounts for:

- The programme-level OODA loop
- Closed-loop case lifecycle
- 47 operational domains
- 7 strict architectural layers
- 3 application boundaries
- Military Intelligence UI Doctrine
- Strategy-driven (never hardcoded) values
- System-First Doctrine (~87% system-delivered)
- Journey Intelligence measurement spine
- Relationship Intelligence and cross-domain data flows
- Commander AI enhancement surface (77 AICAP placements)

---

## 2. Review Scope Design

### 2.1 What SHALL Be Reviewed

| Category | Scope |
|----------|-------|
| BUILT pages | All 36+ pages with `page.tsx` on disk |
| SCAFFOLD pages | Route registration, nav placement, data-readiness only (not implementation quality) |
| Shell chrome | TopBar, Sidebar, Mode toggle, global navigation |
| Layout structures | Per-page workspace composition |
| Data rendering | Entity field coverage, cross-entity relationship rendering |
| Engine surface expression | How engine outputs manifest in UI |
| AICAP readiness | Marker placement, dormancy conformity |
| Navigation coherence | Route-to-nav alignment, drill-path integrity |
| Design system adherence | Token usage, component conformity, intensity ceiling |
| RBAC surface expression | Role-based visibility, boundary enforcement |
| Performance adherence | Application layer scorecard (per PD-1.0) |

### 2.2 What SHALL NOT Be Reviewed

| Category | Reason |
|----------|--------|
| Backend API implementation | Separate architecture concern (Phase 2) |
| Database schema correctness | Covered by DATA_DICTIONARY.md gate |
| Connector integration logic | Engine layer, not surface layer |
| Build sequence correctness | Covered by REBASELINED_BUILD_SEQUENCE.md |
| Baseline spec accuracy | Tier 1 authority; reviews assess conformity TO specs, not OF specs |
| Phase 2+ AI implementation | Only marker readiness assessed |
| Mobile/tablet | Out of scope per DS-1.0 |

### 2.3 Depth Calibration

| Page status | Assessment depth |
|-------------|-----------------|
| BUILT (active use) | Full assessment (all dimensions) |
| BUILT (Tier 3 batch) | Standard assessment (exclude performance deep-dive) |
| SCAFFOLD (route only) | Placement audit only (nav coherence, use case coverage) |
| PROPOSED (no route) | Existence audit only (gap identification) |

---

## 3. Page Grouping Strategy

### 3.1 Recommended Grouping: Hybrid Domain-Boundary Model

Pages are grouped by **application boundary first**, then by **operational domain cluster** within each boundary. This mirrors the three-application-boundary doctrine (Spec #39) while respecting domain cohesion from `DOMAIN_REGISTER.md`.

### 3.2 Assessment Groups

#### BOUNDARY 1: Operational App

| Group ID | Group Name | Nav Groups | Domain Cluster | Pages |
|----------|-----------|------------|----------------|-------|
| OPS-A | Command & Control Surfaces | Command Centre, Operating Pictures, Posture | D-26 OODA, D-27 Op Pictures | /, /posture, /operating-picture/* |
| OPS-B | Case Management & Lifecycle | Case Management, P0/War Room | D-18 Case, D-20 Validation, D-24 P0 | /cases/*, /war-room/*, /cases/:id |
| OPS-C | Intelligence Surfaces | Identity & Access, Architecture, Assets | D-07 Identity, D-08 Asset, D-09 Architecture | /identity/*, /architecture/*, /assets/* |
| OPS-D | Risk & Exposure | Vulnerability Mgmt, Exposure Mgmt, Controls, Coverage | D-05 Vuln, D-06 Exposure, D-10 Coverage | /vulnerabilities/*, /exposure/*, /controls/*, /coverage/* |
| OPS-E | Fusion & Relationship | Fusion Map | D-29 Multi-Domain Fusion Map | /fusion-map/* |
| OPS-F | Mission & Strategy | Mission Control, Strategy | D-22 Strategy, D-25 Mission | /mission/*, /strategy/* |
| OPS-G | Operational Health | Tool Health, Team Pulse, Domain Pulse, System Pulse | D-10 Tool Health, D-30 Pulse | /tool-health/*, /team-pulse/*, /domain-pulse/*, /system-pulse/* |
| OPS-H | Platform & Infrastructure | Platform, Commander AI | D-34 AI, D-02 Connector | /platform/*, /commander-ai, /search |
| OPS-I | Governance & Reporting | Governance, Reporting, CISO/SOM | D-38 Config Governance, D-40 Audit | /governance/*, /reporting/*, /ciso, /som/* |

#### BOUNDARY 2: Tenant Admin

| Group ID | Group Name | Pages |
|----------|-----------|-------|
| ADM-A | Tenant Configuration | /settings/tenant, /settings/baselines, /settings/features |
| ADM-B | Access & Security | /settings/users-rbac, /settings/security |
| ADM-C | Operational Config | /settings/sla, /settings/routing, /settings/validation, /settings/closure-reopening, /settings/p0-zero-day, /settings/automation-boundaries |
| ADM-D | AI & Intelligence Config | /settings/commander-ai, /settings/rules, /settings/connectors, /settings/missions |
| ADM-E | Audit & Export | /settings/audit-export |

#### BOUNDARY 3: Control Plane

| Group ID | Group Name | Pages |
|----------|-----------|-------|
| CP-A | Command & Customer | /control-plane, /control-plane/customers, /control-plane/tenants |
| CP-B | Product & Entitlement | /control-plane/licences, /control-plane/features, /control-plane/entitlements |
| CP-C | Platform Governance | /control-plane/ai-models, /control-plane/rule-packs, /control-plane/baselines |
| CP-D | Operations | /control-plane/deployment, /control-plane/support, /control-plane/billing, /control-plane/audit |

---

## 4. Assessment Dimensions

### 4.1 Core Assessment Dimensions (apply to every BUILT page)

| # | Dimension | Code | Weight | Source Authority |
|---|-----------|------|--------|-----------------|
| 1 | Authority Alignment | AA | 15% | AUTHORITY_MODEL.md, baseline specs |
| 2 | Use Case Coverage | UCC | 12% | USE_CASE_REGISTER.md |
| 3 | Data Completeness | DC | 12% | DATA_DICTIONARY.md, entity field rendering |
| 4 | Design System Conformity | DSC | 12% | DESIGN_SYSTEM.md (DS-1.0) |
| 5 | Cognitive Usability | CU | 10% | Spec #41 Military Intelligence UI Doctrine |
| 6 | Navigation Coherence | NC | 8% | Spec #47, Spec #54, nav-groups.ts |
| 7 | OODA Contribution | OODA | 8% | Spec #58, Spec #17 |
| 8 | RBAC & Boundary Adherence | RBAC | 8% | Spec #19, Spec #39 |
| 9 | Performance Adherence | PA | 8% | PERFORMANCE_DOCTRINE.md (PD-1.0) |
| 10 | Cross-Domain Relationship Rendering | CDRR | 7% | RELATIONSHIP_MAP.md |

### 4.2 Commander-Specific Dimensions (apply where relevant)

| # | Dimension | Code | Applies To | Source Authority |
|---|-----------|------|-----------|-----------------|
| 11 | OODA Phase Health Expression | OPHE | Command Centre, Pulse surfaces | Spec #58, ooda-layer.ts |
| 12 | Blast Radius Awareness | BRA | Fusion Map, Case Detail, Exposure | Spec #33, blast-radius-engine.ts |
| 13 | Journey Intelligence Readiness | JIR | All workflow pages | JOURNEY_INTELLIGENCE.md (JI-1.0) |
| 14 | Commander AI Readiness | AIR | Pages with AICAP markers | AICAP_REGISTER.md, Spec #13 |
| 15 | Strategy Consumption Conformity | SCC | Pages rendering strategy-bound values | Spec #32, strategy-runtime-engine.ts |
| 16 | Closed-Loop Integrity | CLI | Case lifecycle pages | Spec #17, Spec #29, Spec #30 |
| 17 | Visual Intensity Ceiling | VIC | All pages | Spec #41 §5 (Levels 1/2/3) |
| 18 | Mission Mode Readiness | MMR | Operational pages | DS-1.0 §0 (Standard/Mission) |
| 19 | Secure by Design Surface | SbD | Architecture, Exposure, Controls | Spec #22, Spec #25 |
| 20 | Rationalisation Opportunity | RO | All pages | This document §9 |

### 4.3 Dimension Applicability Matrix

| Group | AA | UCC | DC | DSC | CU | NC | OODA | RBAC | PA | CDRR | OPHE | BRA | JIR | AIR | SCC | CLI | VIC | MMR | SbD | RO |
|-------|:--:|:---:|:--:|:---:|:--:|:--:|:----:|:----:|:--:|:----:|:----:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:--:|
| OPS-A | x | x | x | x | x | x | x | x | x | x | x | - | x | x | x | - | x | x | - | x |
| OPS-B | x | x | x | x | x | x | x | x | x | x | - | x | x | x | x | x | x | x | - | x |
| OPS-C | x | x | x | x | x | x | x | x | x | x | - | - | x | x | - | - | x | x | x | x |
| OPS-D | x | x | x | x | x | x | x | x | x | x | - | x | x | x | x | - | x | x | x | x |
| OPS-E | x | x | x | x | x | x | x | x | x | x | - | x | x | x | - | - | x | x | x | x |
| OPS-F | x | x | x | x | x | x | x | x | x | x | x | - | x | x | x | - | x | x | - | x |
| OPS-G | x | x | x | x | x | x | x | x | x | x | x | - | x | x | x | - | x | x | - | x |
| OPS-H | x | x | x | x | x | x | - | x | x | x | - | - | x | x | - | - | x | x | - | x |
| OPS-I | x | x | x | x | x | x | - | x | x | x | - | - | x | x | - | - | x | - | - | x |
| ADM-* | x | x | x | x | x | x | - | x | x | - | - | - | - | x | x | - | x | - | - | x |
| CP-* | x | x | x | x | x | x | - | x | x | - | - | - | - | - | - | - | x | - | - | x |

---

## 5. Commander-Specific Assessment Criteria

### 5.1 What Makes Commander Different

Commander is not a generic SaaS dashboard. The following characteristics require bespoke assessment criteria:

| Characteristic | Review Implication |
|---------------|-------------------|
| Security C2 platform (above the operational tool stack) | Pages must express command-level intelligence, not operational telemetry |
| Programme-level OODA loop | Every surface must demonstrate which OODA phase it serves |
| Closed-loop case lifecycle (12-state, system-owned) | No manual creation/closure/progression permitted in UI |
| Strategy-driven values (19 surfaces) | No hardcoded SLA/routing/priority anywhere |
| System-First Doctrine (~87% system-delivered) | UI explains system decisions, does not replace them |
| Multi-domain fusion architecture | Relationship rendering is mandatory where entities cross domains |
| Three visual intensity levels | Each page has a ceiling; exceeding it is a conformity failure |
| Standard/Mission mode duality | Workspace mode must function in both; chrome is invariant |
| Journey Intelligence measurement spine | Workflow pages must emit measurable checkpoints |
| 77 AI enhancement placements | Markers must be dormant, correctly positioned, and non-blocking |
| SOC boundary doctrine | Aggregate metrics from SOC only; no event correlation on Commander surface |

### 5.2 Assessment Criteria Unique to Commander

#### OODA Phase Contribution (OODA)
- Does this page clearly serve one or more OODA phases (Observe/Orient/Decide/Act)?
- Does it contribute to phase health metrics?
- Does it link to related phase surfaces?

#### Blast Radius Awareness (BRA)
- Does the page show impact propagation where risk objects cross entity boundaries?
- Are blast radius computations from `blast-radius-engine.ts` surfaced?
- Are cross-domain impact paths visible?

#### Closed-Loop Integrity (CLI)
- Does the case page respect the 12-state lifecycle?
- Are system-owned transitions clearly communicated?
- Is manual intervention explicitly prohibited (Doctrinal Assertion 1)?
- Are strategy-sourced values (SLA, priority, routing rationale) displayed with provenance?

#### Strategy Consumption Conformity (SCC)
- Are all rendered values that should be strategy-sourced actually consuming from strategy?
- Is the active strategy policy visible/attributable?
- Are no hardcoded fallbacks visible to the user without strategy-failure indication?

#### Journey Intelligence Readiness (JIR)
- Does the page participate in a measurable workflow?
- Are journey checkpoints identifiable (pre-case, case, action, mission, strategy, automation)?
- Is the page ready for JI-1.0 tagger engine instrumentation?

#### Mission Mode Readiness (MMR)
- Does the page render correctly in both Standard and Mission modes?
- Are semantic tokens used (not primitives)?
- Is the shell chrome invariant between modes?
- Is the visual intensity ceiling respected in both modes?

---

## 6. Review Deliverables

### 6.1 Individual Page Review Output

Every BUILT page review SHALL produce:

```
PAGE REVIEW: [Route]
══════════════════════════════════════════════

Metadata
─────────
Route:              [/path]
Group:              [OPS-A through CP-D]
Boundary:           [Operational | Tenant Admin | Control Plane]
Build Unit:         [Unit reference]
Use Cases Served:   [UC-XXX list]
Domains Touched:    [D-XX list]
Intensity Ceiling:  [Level 1 | 2 | 3]
AICAP Markers:      [Count and IDs]

Dimension Scores
─────────────────
[For each applicable dimension: score 0-100, band (Green/Yellow/Amber/Red), finding summary]

Conformity Findings
───────────────────
[Numbered findings with severity: CRITICAL / HIGH / MEDIUM / LOW / NOTE]
[Each finding cites the specific authority violated]

Data Coverage Assessment
────────────────────────
[Entities rendered, fields rendered vs available, cross-entity relationships shown]

Rationalisation Assessment
──────────────────────────
[Thin page? Merge candidate? Workspace conversion candidate? Navigation simplification?]

Recommendations
───────────────
[Prioritised list of improvements with authority citation]

Score Summary
─────────────
Composite Score:    [Weighted average]
Band:              [Green/Yellow/Amber/Red]
Review Status:     [PASS / CONDITIONAL PASS / REMEDIATION REQUIRED / FAIL]
```

### 6.2 Group Review Output

Every assessment group review SHALL produce:

```
GROUP REVIEW: [Group ID — Group Name]
══════════════════════════════════════════════

Group Metadata
──────────────
Boundary:           [Application boundary]
Pages in Group:     [Count BUILT / SCAFFOLD / PROPOSED]
Domains Covered:    [D-XX list]
Use Cases Covered:  [UC-XXX count and coverage %]

Group-Level Findings
────────────────────
[Cross-page patterns, consistency issues, navigation flow quality]

Domain Coverage Assessment
──────────────────────────
[Are all domain entities and relationships rendered across the group?]
[Are there entity orphans (entities with no page surface)?]

OODA Contribution Map
─────────────────────
[Which OODA phases does this group serve? Are there gaps?]

Rationalisation Opportunities
─────────────────────────────
[Merge candidates within group, thin pages, redundancies]

Group Composite Score
─────────────────────
[Average of page scores with consistency penalty/bonus]
```

### 6.3 Programme Review Output

The final Commander-wide review SHALL produce:

```
PROGRAMME REVIEW: Commander SDR UI/UX Assessment
══════════════════════════════════════════════════

Executive Summary
─────────────────
[2-paragraph executive overview]

Estate Statistics
─────────────────
[Total pages, BUILT/SCAFFOLD/PROPOSED counts, coverage percentages]

Dimension Heat Map
──────────────────
[Cross-page heat map showing every dimension score by page]

Authority Adherence Summary
───────────────────────────
[How well does the implementation conform to baseline specifications?]

OODA Completeness
─────────────────
[Does the full estate serve all four OODA phases with health metrics?]

Cross-Domain Relationship Coverage
──────────────────────────────────
[Are the 6 principal data flows (RELATIONSHIP_MAP.md) expressed in UI?]

Journey Intelligence Readiness
──────────────────────────────
[Estate-wide JI readiness assessment]

Commander AI Surface Readiness
──────────────────────────────
[77 AICAP placement conformity summary]

Rationalisation Register
────────────────────────
[Complete list of merge candidates, removals, workspace conversions]

Navigation Coherence Report
───────────────────────────
[Full nav-to-page reconciliation, orphans, dead ends, circular paths]

Performance Estate Report
─────────────────────────
[Application layer scorecard summary across all pages]

Strategic Recommendations
─────────────────────────
[Top 10 programme-level recommendations with priority and authority citation]

Maturity Assessment
───────────────────
[Commander UI maturity level against the pattern catalogue]
```

---

## 7. Review Schedule Design

### 7.1 Review Phases

| Phase | Name | Scope | Prerequisites |
|-------|------|-------|---------------|
| 0 | Authority Calibration | Review this document, confirm dimensions, validate groupings | Stakeholder sign-off |
| 1 | Shell & Navigation | Global shell, sidebar, top nav, mode system, routing integrity | Phase 0 |
| 2 | Command & Control Surfaces | OPS-A (Command Centre, Operating Pictures, Posture) | Phase 1 |
| 3 | Case Lifecycle Surfaces | OPS-B (Cases, War Room, Case Detail) | Phase 1 |
| 4 | Intelligence Surfaces | OPS-C (Identity, Architecture, Assets) | Phase 1 |
| 5 | Risk & Exposure Surfaces | OPS-D (Vulnerabilities, Exposure, Controls, Coverage) | Phase 1 |
| 6 | Fusion & Strategy | OPS-E + OPS-F (Fusion Map, Mission, Strategy) | Phases 2-5 |
| 7 | Operational Health | OPS-G (Tool Health, Pulse surfaces) | Phase 1 |
| 8 | Platform & Governance | OPS-H + OPS-I (Platform, AI, Governance, Reporting) | Phase 1 |
| 9 | Tenant Admin | ADM-A through ADM-E | Phase 1 |
| 10 | Control Plane | CP-A through CP-D | Phase 1 |
| 11 | Programme Synthesis | Cross-group analysis, rationalisation, programme report | Phases 1-10 |

### 7.2 Review Sequencing Rationale

1. **Shell first** — all pages inherit shell; shell issues propagate everywhere
2. **Command Centre second** — the entry point surface; validates OODA loop expression
3. **Case lifecycle third** — the load-bearing closed-loop; highest authority density
4. **Intelligence surfaces fourth** — validate entity rendering patterns
5. **Risk & Exposure fifth** — validate engine-to-surface expression
6. **Fusion & Strategy sixth** — depends on understanding of entities from prior phases
7. **Health & Platform seventh/eighth** — less authority-dense; benefit from prior patterns
8. **Admin boundaries last** — separate navigation context; isolated assessment
9. **Synthesis last** — requires all individual/group reviews as input

### 7.3 Review Cadence

| Cadence | Application |
|---------|-------------|
| Initial assessment | Full Phase 0–11 execution (one-time) |
| Post-build review | Individual page review after each build unit completes |
| Sprint review | Group-level review at end of each build sprint |
| Quarterly estate review | Programme-level synthesis (Phases 1-11 delta) |
| Authority change review | Triggered when baseline specs or DS-1.0 changes |

### 7.4 Dependencies

| Dependency | What it gates |
|-----------|--------------|
| DS-1.0 finalised | All DSC dimension assessments |
| RELATIONSHIP_MAP.md complete | All CDRR dimension assessments |
| USE_CASE_REGISTER.md complete | All UCC dimension assessments |
| AICAP_REGISTER.md complete | All AIR dimension assessments |
| JI-1.0 ratified | All JIR dimension assessments |
| Performance scorecard runner | All PA dimension assessments |
| RBAC policy definitions | All RBAC dimension assessments |

---

## 8. Commander Pattern Catalogue

### 8.1 Identified Page Patterns

Commander pages fall into a finite set of structural patterns. Each pattern has defined composition rules, expected components, and intensity ceiling.

| Pattern ID | Pattern Name | Composition | Intensity Ceiling | Examples |
|-----------|-------------|-------------|-------------------|----------|
| PAT-01 | Command Centre | OODA gauges + multi-domain summary cards + alert banner + drill links | Level 3 | / |
| PAT-02 | Operating Picture | Attributed surface rendering + real-time markers + drill-paths | Level 2–3 | /operating-picture/external, /internal |
| PAT-03 | Case Queue | Filterable table + priority/SLA indicators + bulk context + drill to detail | Level 1 | /cases, /cases/my |
| PAT-04 | Case Workspace | Case header + timeline + evidence + actions + routing rationale + SLA + communication | Level 1–2 | /cases/:id |
| PAT-05 | Entity Intelligence Surface | Entity list/grid + risk indicators + coverage status + drill to detail | Level 1 | /identity, /assets, /vulnerabilities |
| PAT-06 | Graph/Topology Workspace | Node-link graph (React Flow) + overlays + filters + node inspector | Level 2 | /fusion-map/*, /architecture/dependencies |
| PAT-07 | Health Dashboard | KPI strip + trend charts + threshold indicators + status table | Level 1 | /tool-health/*, /team-pulse/*, /system-pulse/* |
| PAT-08 | Pulse Surface | Domain/team/system metric cards + anomaly indicators + drill links | Level 1 | /domain-pulse/*, /team-pulse/* |
| PAT-09 | Strategy Workspace | Policy list + simulation panel + approval workflow + audit trail | Level 1 | /strategy/centre, /strategy/simulation |
| PAT-10 | Governance Surface | Framework mapping + compliance status + exception register | Level 1 | /governance/*, /controls/* |
| PAT-11 | Admin Configuration | Settings form + validation + save/cancel + audit indicator | Level 1 | /settings/* |
| PAT-12 | Operator Console | Cross-tenant overview + CRUD tables + operator actions + audit | Level 1–2 | /control-plane/* |
| PAT-13 | Reporting Surface | Report schedule + generation status + export actions | Level 1 | /reporting/* |
| PAT-14 | Search Workspace | Search input + results + facets + entity type tabs | Level 1 | /search |
| PAT-15 | Emergency Command (P0) | Crisis banner + case correlation + communication hub + blast radius | Level 3 | /war-room/p0 |
| PAT-16 | Mission Surface | Objective tracking + case alignment + impact measurement + progress | Level 1–2 | /mission/* |
| PAT-17 | Platform Management | CRUD table + status indicators + configuration panels + audit | Level 1 | /platform/rules, /platform/models |

### 8.2 Pattern Conformity Rules

1. Every page MUST map to exactly one pattern
2. Pattern composition is mandatory — missing elements are conformity findings
3. Intensity ceiling violations are CRITICAL findings
4. Pattern-specific components from `packages/ui/src/components/` are preferred
5. Cross-pattern elements (e.g., a health dashboard embedding a graph workspace) require explicit justification

### 8.3 Pattern-to-Group Mapping

| Group | Primary Patterns | Secondary Patterns |
|-------|-----------------|-------------------|
| OPS-A | PAT-01, PAT-02 | PAT-07 |
| OPS-B | PAT-03, PAT-04, PAT-15 | PAT-09 |
| OPS-C | PAT-05 | PAT-06 |
| OPS-D | PAT-05, PAT-10 | PAT-07 |
| OPS-E | PAT-06 | PAT-02 |
| OPS-F | PAT-09, PAT-16 | PAT-07 |
| OPS-G | PAT-07, PAT-08 | — |
| OPS-H | PAT-17, PAT-14 | PAT-07 |
| OPS-I | PAT-10, PAT-13 | — |
| ADM-* | PAT-11 | — |
| CP-* | PAT-12 | PAT-17 |

---

## 9. Rationalisation Framework

### 9.1 Rationalisation Categories

| Category | Definition | Action |
|----------|-----------|--------|
| DUPLICATE | Two or more pages render substantially the same data for the same audience | Merge into single page with view tabs |
| THIN | Page renders fewer than 3 meaningful data points or serves a single metric | Absorb into parent or adjacent page |
| MERGE CANDIDATE | Two pages serve the same domain and could be a single tabbed workspace | Consolidate with workspace tabs |
| REMOVAL CANDIDATE | Page has no use case, no nav entry, and no drill-path source | Remove route and page.tsx |
| WORKSPACE CONVERSION | Multiple related pages would be more effective as tabs within a single workspace | Convert to workspace pattern |
| NAV SIMPLIFICATION | Navigation group has more items than cognitive load warrants (>5 items) | Restructure sub-items or promote to workspace tabs |
| DEPTH REDUCTION | A page is only reachable via 3+ navigation clicks from the Command Centre | Add shortcut, drill-path, or top-nav entry |

### 9.2 Rationalisation Scoring

Each page receives a rationalisation score:

| Score | Meaning | Threshold |
|-------|---------|-----------|
| 0 | No rationalisation needed | Page is unique, substantial, well-placed |
| 1 | Minor opportunity | Could benefit from small structural change |
| 2 | Moderate opportunity | Should be considered in next planning cycle |
| 3 | Strong candidate | Should be actioned before next major release |
| 4 | Immediate action | Page is actively confusing or redundant |

### 9.3 Rationalisation Decision Framework

```
Is the page the ONLY surface for its primary use case?
  YES → Keep. Assess quality only.
  NO  → Does it serve a distinct RBAC audience from the other surface?
          YES → Keep both. Validate audience differentiation.
          NO  → Does it serve a distinct OODA phase from the other surface?
                  YES → Keep both. Document phase contribution.
                  NO  → MERGE CANDIDATE (score 3+)

Does the page render fewer than 3 entity fields?
  YES → THIN (score 2+). Can it be absorbed into a parent page?
          YES → Absorb.
          NO  → Promote to panel/card within adjacent page.

Is the page reachable only via 3+ clicks from Command Centre?
  YES → DEPTH REDUCTION needed. Add drill-path or shortcut.

Does the navigation group have >5 sub-items?
  YES → NAV SIMPLIFICATION candidate. Consider workspace tabs.
```

### 9.4 Initial Rationalisation Signals (from estate analysis)

| Signal | Groups Affected | Potential Action |
|--------|----------------|-----------------|
| Pulse surfaces (Team/Domain/System) have 3 pages each with single-metric focus | OPS-G | Consider workspace tabs within each Pulse category |
| Platform group has 11 sub-items | OPS-H | Workspace conversion with tabs |
| Coverage group overlaps with Tool Health on data sources | OPS-D / OPS-G | Assess merge of coverage/scanners with tool-health/connectors |
| /settings/* has 16 routes | ADM-* | Already grouped; validate cognitive load |
| SOM group has 5 pages with unclear differentiation from CISO | OPS-I | Assess audience differentiation vs merge |

---

## 10. Review Execution Process

### 10.1 Pre-Review Checklist

Before beginning any review phase:

- [ ] Confirm latest `PAGE_SCHEDULE.md` is current
- [ ] Confirm latest `USE_CASE_REGISTER.md` is current
- [ ] Confirm latest `AICAP_REGISTER.md` is current
- [ ] Confirm `DESIGN_SYSTEM.md` (DS-1.0) has not changed since last review
- [ ] Confirm `RELATIONSHIP_MAP.md` is current for the group under review
- [ ] Identify all BUILT pages in the target group
- [ ] Identify all SCAFFOLD pages in the target group
- [ ] Load relevant seed fixtures for data coverage assessment

### 10.2 Individual Page Review Process

```
1. IDENTIFY
   - Confirm route, group, boundary, build unit
   - Load page.tsx source
   - Identify pattern (from Pattern Catalogue §8)
   - List applicable dimensions (from §4.3)

2. ASSESS AUTHORITY
   - Identify governing baseline specs
   - Identify governing use cases
   - Identify governing domains
   - Confirm intensity ceiling

3. ASSESS DATA
   - List entities consumed
   - List fields rendered vs available (from DATA_DICTIONARY.md)
   - List cross-entity relationships rendered vs documented (from RELATIONSHIP_MAP.md)
   - Assess seed fixture coverage

4. ASSESS DESIGN
   - Token usage (semantic, not primitive)
   - Component conformity (DS-1.0 catalogue)
   - Layout structure (Header → Insight Row → Content Grid → Detail)
   - Mode support (Standard + Mission)
   - Intensity ceiling adherence

5. ASSESS OPERATIONS
   - OODA phase contribution
   - Strategy consumption (no hardcoded values)
   - RBAC visibility
   - Navigation coherence (reachability, drill-paths)
   - AICAP marker conformity

6. ASSESS COMMANDER-SPECIFIC
   - Apply all applicable Commander-specific dimensions from §4.2
   - Assess closed-loop integrity (case pages only)
   - Assess blast radius awareness (where applicable)
   - Assess Journey Intelligence readiness

7. SCORE
   - Score each applicable dimension 0–100
   - Apply band (Green/Yellow/Amber/Red per TTF-1.0 §2)
   - Compute weighted composite score
   - Determine review status (PASS/CONDITIONAL/REMEDIATION/FAIL)

8. RATIONALISE
   - Apply rationalisation decision framework (§9.3)
   - Assign rationalisation score (0–4)
   - Document opportunities

9. DOCUMENT
   - Produce page review output per §6.1 template
```

### 10.3 Review Status Thresholds

| Status | Composite Score | Condition |
|--------|----------------|-----------|
| PASS | ≥ 90 | No CRITICAL findings |
| CONDITIONAL PASS | 80–89 | No more than 1 CRITICAL finding; all HIGH findings have remediation plan |
| REMEDIATION REQUIRED | 60–79 | CRITICAL or multiple HIGH findings require action before release |
| FAIL | < 60 | Fundamental authority violations; page should not ship |

### 10.4 Finding Severity Definitions

| Severity | Definition | Examples |
|----------|-----------|----------|
| CRITICAL | Violates binding doctrine or Doctrinal Assertions | Manual case creation button; hardcoded SLA; intensity Level 3 on admin page; cross-tenant data exposure |
| HIGH | Violates baseline spec requirement | Missing entity field that spec mandates; wrong OODA phase attribution; broken drill-path |
| MEDIUM | Deviates from design system or pattern catalogue | Primitive token usage; wrong component; missing insight row |
| LOW | Sub-optimal but not spec-violating | Poor label wording; inconsistent spacing; missing tooltip |
| NOTE | Observation for future improvement | AICAP marker could be better positioned; rationalisation opportunity |

### 10.5 Review Governance

- Reviews are append-only to a review register
- Findings reference specific authority sources
- Remediation is tracked against the finding
- Re-review is triggered when remediation is committed
- Programme-level synthesis is produced after all group reviews complete
- Review authority is this document; no external methodology overrides it

---

## 11. Authority Artefacts Required Before Assessment

### 11.1 Mandatory Pre-Read (before any page review)

| Artefact | Purpose in Review |
|----------|------------------|
| This document (UIAA-1.0) | Methodology, dimensions, scoring |
| DESIGN_SYSTEM.md (DS-1.0) | Design conformity baseline |
| AUTHORITY_MODEL.md | Precedence stack awareness |
| Spec #41 (Military Intelligence UI Doctrine) | Visual intensity, shell doctrine |
| PAGE_SCHEDULE.md | Page status, use case mapping |
| USE_CASE_REGISTER.md | Use case coverage verification |
| nav-groups.ts | Navigation structure truth |

### 11.2 Per-Group Pre-Read

| Group | Additional Pre-Read |
|-------|-------------------|
| OPS-A | Spec #58 (OODA), Spec #67 (Dashboard Family), ooda-layer.ts |
| OPS-B | Spec #08 (Case Mgmt), Spec #17 (Closed-Loop), Spec #29, Spec #30, case.ts |
| OPS-C | Spec #18 (Identity), Spec #22 (Architecture), Spec #69 (Asset Surface) |
| OPS-D | Spec #16 (Vuln), Spec #06 (Exposure), Spec #09 (Coverage) |
| OPS-E | Spec #33 (Fusion Map), RELATIONSHIP_MAP.md |
| OPS-F | Spec #32 (Strategy), Spec #34 (Mission), Spec #52 (Mission Binding) |
| OPS-G | Spec #34 (Pulse), Spec #23 (Security Tool Intelligence) |
| OPS-H | Spec #13 (AI), Spec #42 (Search), Spec #61 (Connectors) |
| OPS-I | Spec #55 (Config Governance), GOVERNANCE_KNOWLEDGE_SOURCE.md |
| ADM-* | Spec #55, tenant-admin-routes.ts |
| CP-* | SDR Control Plane Specification v1.1, control-plane-routes.ts |

---

## 12. Final Assessment: Recommended Authority-Driven Approach

### 12.1 The Most Effective and Sustainable Approach

Based on comprehensive analysis of the Commander repository, the most effective approach for reviewing, rationalising and evolving the Commander page estate is:

**Authority-Driven Dimensional Assessment with Pattern-Based Rationalisation**

This approach is effective because:

1. **Authority-anchored** — every assessment dimension traces to a specific Commander authority (baseline spec, doctrine, design system), preventing subjective or taste-based review
2. **Pattern-catalogued** — the 17 identified page patterns provide structural templates against which conformity is measurable
3. **Domain-aware** — grouping by operational domain cluster ensures cross-entity relationships are assessed in context
4. **OODA-aligned** — the programme-level OODA loop provides a coherence framework that traditional UI reviews lack
5. **Rationalisation-integrated** — every page review simultaneously assesses quality AND necessity, preventing estate sprawl
6. **Scalable** — the phase-based schedule allows incremental review without requiring the entire estate to be assessed simultaneously
7. **Repeatable** — scoring formulas (per TTF-1.0) and finding severity definitions eliminate reviewer subjectivity
8. **Evolution-ready** — the cadence model ensures reviews remain current as Commander evolves

### 12.2 Key Differentiators from Traditional UI Review

| Traditional UI Review | Commander Assessment Authority |
|----------------------|-------------------------------|
| Subjective heuristics | Authority-cited dimensional scoring |
| Page-by-page isolation | Domain-clustered group assessment |
| Visual/aesthetic focus | Operational conformity + data completeness + authority alignment |
| One-time exercise | Continuous cadence with authority-change triggers |
| Designer opinion | Spec-driven findings with severity and remediation |
| No rationalisation | Integrated rationalisation framework |
| Generic usability | Commander-specific (OODA, blast radius, closed-loop, strategy consumption) |

### 12.3 Implementation Recommendation

1. **Immediate:** Ratify this document as the assessment authority
2. **Week 1:** Execute Phase 0 (Authority Calibration) — validate groupings with stakeholders
3. **Week 2:** Execute Phase 1 (Shell & Navigation) — validate global chrome
4. **Weeks 3–6:** Execute Phases 2–5 (core operational surfaces)
5. **Weeks 7–8:** Execute Phases 6–10 (remaining groups)
6. **Week 9:** Execute Phase 11 (Programme Synthesis)
7. **Ongoing:** Post-build reviews per cadence model

---

## Appendix A: Scoring Formula Reference

Per `TEST_AND_TOLERANCE_FRAMEWORK.md` (TTF-1.0):

| Band | Range | Meaning |
|------|-------|---------|
| Green | 95–100% | Above par |
| Yellow | 85–94% | Slight drift — watch |
| Amber | 60–84% | Below par — remediation required |
| Red | < 60% | Failing — urgent remediation |

Composite score = weighted average of all applicable dimension scores (weights from §4.1).

---

## Appendix B: Terminology

| Term | Definition |
|------|-----------|
| Adherence | Conformity to authority (not "compliance" — per Commander hard rule) |
| Assessment | Structured evaluation against defined dimensions |
| Authority | A governing document from the Commander precedence stack |
| Boundary | One of the three application boundaries (Operational, Tenant Admin, Control Plane) |
| Dimension | A measurable aspect of page quality |
| Finding | A specific identified deviation from authority |
| Group | A cluster of related pages assessed together |
| Pattern | A structural page template from the Pattern Catalogue |
| Rationalisation | The process of identifying redundancy, thinness, or consolidation opportunity |
| Surface | The UI rendering of domain intelligence |

---

## Appendix C: Document Cross-References

| Document | Role in This Framework |
|----------|----------------------|
| `AUTHORITY_MODEL.md` | Defines the precedence stack this framework operates within |
| `DESIGN_SYSTEM.md` (DS-1.0) | Design conformity baseline |
| `PERFORMANCE_DOCTRINE.md` (PD-1.0) | Performance assessment baseline |
| `TEST_AND_TOLERANCE_FRAMEWORK.md` (TTF-1.0) | Scoring methodology |
| `PAGE_SCHEDULE.md` | Page inventory and status |
| `USE_CASE_REGISTER.md` | Use case coverage baseline |
| `DOMAIN_REGISTER.md` | Domain classification |
| `RELATIONSHIP_MAP.md` | Cross-domain relationship authority |
| `SYSTEM_KNOWLEDGE_GRAPH.md` | Architectural layer authority |
| `GOVERNANCE_KNOWLEDGE_SOURCE.md` | Build governance reference |
| `AICAP_REGISTER.md` | AI enhancement marker authority |
| `JOURNEY_INTELLIGENCE.md` (JI-1.0) | Journey Intelligence authority |
| `REBASELINED_BUILD_SEQUENCE.md` | Build status reference |
| `nav-groups.ts` | Navigation structure truth |
| Spec #41 | Military Intelligence UI Doctrine |
| Spec #39 | Application Boundary Doctrine |
| Spec #58 | Security OODA Loop |
| Spec #17 | Closed-Loop Control Architecture |

---

**End of Document.**
