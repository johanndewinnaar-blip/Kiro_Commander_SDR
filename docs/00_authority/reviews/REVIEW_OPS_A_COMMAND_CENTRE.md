# PAGE REVIEW: / (Command Centre)

**Assessment Authority:** UIAA-1.0
**Reviewer:** Commander Assessment Framework (automated)
**Date:** 2026-06-09
**Review Version:** 1.0

---

## Metadata

| Field | Value |
|-------|-------|
| Route | `/` |
| Group | OPS-A (Command & Control Surfaces) |
| Boundary | Operational App |
| Build Unit | Unit 16a |
| Pattern | PAT-01 (Command Centre) |
| Use Cases Served | UC-001, UC-002 |
| Domains Touched | D-18 Case Lifecycle, D-02 Connector Framework, D-26 OODA, D-22 Strategy Layer |
| Intensity Ceiling | Level 3 (Emergency Command) |
| AICAP Markers | 0 on this page (nearest: AICAP-CISO-001 on `/ciso`) |
| Status | BUILT (v1.1) |

---

## Step 1: IDENTIFY

- **Route:** `/` — Command Centre operational entry point
- **Pattern:** PAT-01 (Command Centre) — required composition: OODA gauges + multi-domain summary cards + alert banner + drill links
- **Applicable Dimensions:** AA, UCC, DC, DSC, CU, NC, OODA, RBAC, PA, CDRR, OPHE, JIR, AIR, SCC, VIC, MMR, RO (17 of 20)

---

## Step 2: ASSESS AUTHORITY ALIGNMENT

### Governing Authorities
- Spec #58 (Security OODA Loop) — OODA phase health display
- Spec #67 (OODA Phase Dashboard Family) — Command Tempo model
- Spec #65/#66 (Operating Pictures) — drill paths to external/internal
- Spec #41 (Military Intelligence UI Doctrine) — Level 3 intensity ceiling
- Spec #17 (Closed-Loop Control Architecture) — no manual case creation
- DEC-command-centre-split-16a-16b — 16a scope (operational), 16b scope (posture aggregates)

### Authority Conformity
| Authority | Conformity | Notes |
|-----------|-----------|-------|
| Spec #58 (OODA phases) | ✅ CONFORMS | All 4 phases rendered with health scores from engine |
| Spec #67 (Command Tempo) | ✅ CONFORMS | Tempo composite badge in header |
| Spec #41 (Level 3 ceiling) | ⚠️ PARTIAL | Page content is Level 1 density; does NOT exhibit Level 3 characteristics (no glow, no persistent crisis treatment, no HUD intensity) despite claiming Level 3 scope |
| Spec #17 (no manual creation) | ✅ CONFORMS | No create-case button anywhere |
| DEC-command-centre-split | ✅ CONFORMS | Unit 16b content explicitly excluded |
| Doctrinal Assertion 1 | ✅ CONFORMS | No manual lifecycle progression |

---

## Step 3: ASSESS DATA

### 3.1 Entities Consumed

| Entity | Fixture Used | Fields Rendered | Fields AVAILABLE (DATA_DICTIONARY) | Coverage |
|--------|-------------|-----------------|---------------------------------------|----------|
| Case | `seed-cases` (30 cases) | priority, status, surfaceAttribution | 40+ fields available | **Low** (3 of 40+) |
| Connector | `seed-connectors` (4 connectors) | name, classes, tier, state, lastRunStatus | 11 fields available | **Good** (6 of 11) |
| RiskObject | `seed-risk-objects` (3 objects) | type, treatmentState | 20+ fields available | **Low** (2 of 20+) |
| Strategy | `seed-strategies` (19 policies) | surfaceType=operational-tempo, configuration.tempoThresholds | Full strategy entity available | **Adequate** (consumes thresholds correctly) |

### 3.2 Entities AVAILABLE but NOT Consumed

| Entity | Fixture | Available Data Points | Why It Should Appear | Severity |
|--------|---------|----------------------|---------------------|----------|
| **Asset** | `seed-assets` (40 assets) | classification, criticality, coverage, environment, surfaceAttribution | Command Centre should show estate size, critical asset count, coverage posture | HIGH |
| **Identity** | `seed-identities` (25 identities) | classification, riskScore, privilegeLevel, status | Command Centre should show identity count, high-risk identity count, privileged account summary | HIGH |
| **Mission** | `seed-missions` (3 missions) | status, progressPercent, priority, alignedCases | Command Centre should show active mission count, mission health, case-to-mission alignment | MEDIUM |
| **PostureMetrics** | `seed-posture-metrics` (12 metrics) | current values, bands, trends | Note: Explicitly deferred to Unit 16b (/posture). However, a summary KPI (overall posture score) on Command Centre would be expected at programme level | NOTE |
| **Pulse** (Team/Domain/System) | `seed-pulse` | teamPulse, domainPulse, systemPulse | Command Centre should show pulse summary — at minimum a "system health" indicator | MEDIUM |
| **Intelligence Layer** | `intelligence-layer.ts` engine | EstateIntelligencePicture (4 streams, signal count, entity count, unbound count) | Command Centre OBSERVE/ORIENT gauges compute health but don't render the Estate Intelligence Picture summary | MEDIUM |

### 3.3 Cross-Entity Relationships NOT Rendered

| Relationship (from RELATIONSHIP_MAP.md) | Current State | Expected | Finding |
|------------------------------------------|--------------|----------|---------|
| Case → RiskObject binding (load-bearing trio) | Cases counted; risk objects counted separately | Should show: "X cases binding Y risk objects" — the RELATIONSHIP | HIGH |
| Case → Asset (relatedEntities field) | Not rendered | Command Centre should show: cases affecting N critical assets | HIGH |
| Case → Identity (relatedEntities field) | Not rendered | "N cases involving privileged identities" | MEDIUM |
| Connector → Signal freshness → OODA Observe | Computed internally for gauge | Relationship not VISIBLE to user — user sees gauge but not WHY | MEDIUM |
| Strategy → Case (strategy binding) | Tempo thresholds consumed but not attributed | User cannot see which strategy policy governs the tempo thresholds | LOW |
| Mission → Case alignment | Not rendered | Active missions with case alignment count | MEDIUM |
| RiskObject → Case → OODA phase position | Not rendered | Which OODA phase each risk object is currently in | LOW |

### 3.4 Engine Outputs AVAILABLE but NOT Surfaced

| Engine | Output Available | Currently Surfaced | Gap |
|--------|-----------------|-------------------|-----|
| `ooda-layer.ts` | Phase health, degradation detection, degradation case creation | Phase health ✅, tempo ✅ | Degradation detection result NOT shown (which phases are degraded and why) |
| `intelligence-layer.ts` | EstateIntelligencePicture (4 streams with signal counts) | Not rendered | Estate intelligence summary missing |
| `case-prioritisation-engine.ts` | Priority distribution rationale | Priority counts shown, rationale absent | Why this priority distribution exists |
| `case-sla-engine.ts` | SLA breach count, SLA pressure | Computed in Act phase only | No explicit SLA health indicator on page |
| `exposure-engine.ts` | Exposure assessment summary | Not rendered | No exposure posture summary |
| `drift-detection-engine.ts` | Drift state summary | Not rendered | No configuration drift indicator |

---

## Step 4: ASSESS DESIGN

### 4.1 Token Usage

| Check | Result | Finding |
|-------|--------|---------|
| Semantic tokens used (not primitives) | ❌ FAIL | Page directly imports `primitiveTypeScale` and `primitiveSignal` from primitives.ts and uses them inline. DS-1.0 §1 governance: "No component uses a primitive value directly. All styling references semantic or component tokens." |
| Mode-aware rendering | ⚠️ PARTIAL | `useMode()` is called and `tokens` is destructured but tokens are NOT used for styling. Page uses `primitiveSignal` colours directly which are mode-invariant. |
| Component tokens | ❌ FAIL | No `componentTokens` references. Layout uses inline styles and Tabler CSS classes |

**Primitive token violations found:**
- `primitiveTypeScale.h3` — line 130
- `primitiveTypeScale.body` — lines 131, 168, 206
- `primitiveTypeScale.caption` — lines 207, 213
- `primitiveTypeScale.micro` — line 211
- `primitiveSignal.success` — lines 125, 199
- `primitiveSignal.critical` — lines 125, 129, 199, 220
- `primitiveSignal.neutral` — line 199
- `primitiveSignal.warning` — line 125

### 4.2 Component Conformity (DS-1.0 §4 Component Catalogue)

| Expected Component | Present | Notes |
|-------------------|---------|-------|
| PageContainer | ✅ | Used correctly with pretitle, title, headerActions |
| KPI Strip (Insight Row) | ❌ ABSENT | DS-1.0 §8 mandates "Insight Row — mandatory: summary KPIs + primary chart/gauge" — not present as a component |
| Instrument Gauge | ❌ ABSENT | OODA gauges use progress bars not the instrument-gauge component from packages/ui |
| Operational Card | ❌ ABSENT | Cards use bare Tabler `.card` class, not the `getOperationalCardStyles()` from packages/ui |
| Status Badge | ⚠️ PARTIAL | Uses Tabler `.badge` class, not the Commander-specific status-badge component |
| KPI Tile | ❌ ABSENT | No KPI tiles — data rendered as inline text |

### 4.3 Layout Structure (DS-1.0 §8)

| Expected Structure | Present | Notes |
|-------------------|---------|-------|
| Header (page title, primary actions) | ✅ | Via PageContainer |
| Insight Row (mandatory KPIs + primary chart/gauge) | ❌ ABSENT | No dedicated insight row — OODA gauges are first but no KPI summary strip |
| Content Grid (12-column, 3-col cards, 16px gutters) | ⚠️ PARTIAL | Uses Tabler `row-deck row-cards` which is 12-col, but gutters are Tabler default not DS-1.0 `--grid-gap: 16px` |
| Detail Section (extended lists, drill-down) | ✅ | Operating Pictures drill section at bottom |

### 4.4 Mode Support

| Check | Result |
|-------|--------|
| Standard mode rendering | ✅ Renders (but uses Tabler defaults, not Commander semantic tokens) |
| Mission mode rendering | ⚠️ UNTESTED — `tokens` from `useMode()` destructured but never applied to JSX |
| Shell chrome invariant | ✅ (handled by Shell component, not page) |

---

## Step 5: ASSESS OPERATIONS

### 5.1 OODA Phase Contribution

| Assessment | Result |
|-----------|--------|
| Does this page serve an OODA phase? | ✅ ALL FOUR — this is the programme-level OODA tempo surface |
| Does it contribute to phase health metrics? | ✅ Computes and renders all 4 phase scores |
| Does it link to related phase surfaces? | ⚠️ PARTIAL — links to Operating Pictures (Observe/Orient), but no links to Case Queue (Decide/Act) or Strategy Centre (Decide) |

### 5.2 Strategy Consumption (no hardcoded values)

| Check | Result | Finding |
|-------|--------|---------|
| OODA thresholds strategy-sourced | ✅ | Looks up `operational-tempo` strategy policy. Fallback values exist (90/70) but are clearly defensive defaults. |
| SLA values strategy-sourced | N/A | SLA not displayed on this page |
| Priority thresholds strategy-sourced | N/A | Priority distribution is count-based, not threshold-based |
| Strategy policy attribution visible | ❌ | User cannot see WHICH strategy policy governs the thresholds |

### 5.3 RBAC & Boundary

| Check | Result |
|-------|--------|
| Page accessible to correct roles | ✅ UC-001 says "All authenticated" |
| No cross-boundary data leak | ✅ Operational data only; no control-plane data |
| No manual lifecycle actions exposed | ✅ |

### 5.4 Navigation Coherence

| Check | Result | Finding |
|-------|--------|---------|
| Page reachable from sidebar | ✅ Top nav "Command Centre" tab |
| Drill-paths functional | ✅ Links to /cases, /war-room/p0, /operating-picture/external, /operating-picture/internal |
| Return path clear | ✅ (always accessible via top nav) |
| Missing drill-paths | ⚠️ | No drill to: /posture (Unit 16b), /assets, /identity, /mission, /strategy, /fusion-map — all of which have data relevant to command overview |

### 5.5 AICAP Marker Conformity

| Check | Result |
|-------|--------|
| Expected AICAP markers per register | None assigned to `/` in AICAP_REGISTER.md |
| Markers present in source | None |
| Assessment | ✅ CONFORMS — no markers expected, none present |

---

## Step 6: ASSESS COMMANDER-SPECIFIC

### 6.1 OODA Phase Health Expression (OPHE)

| Criterion | Score | Notes |
|-----------|-------|-------|
| All 4 phases rendered | ✅ 100 | Observe, Orient, Decide, Act — all present |
| Phase scores computed from engine | ✅ 100 | Uses `calculateObserveHealth` etc. from ooda-layer.ts |
| Degradation awareness | ⚠️ 60 | Tempo shows degraded phases exist (via band colour) but does NOT surface `detectPhaseDegradation()` results — user cannot see WHY a phase is degraded |
| Command Tempo composite | ✅ 95 | Header badge shows overall tempo score and band |
| Phase-to-phase linkage | ❌ 40 | No visual indication that phases are a LOOP, not four independent gauges. Spec #58 doctrine: "Commander must NOT flatten OODA into a static dashboard" |

**OPHE Score: 79 (AMBER)**

### 6.2 Visual Intensity Ceiling (VIC)

| Criterion | Score | Notes |
|-----------|-------|-------|
| Ceiling declared as Level 3 | ✅ | Per page docblock and Unit 16a spec |
| Level 3 characteristics present | ❌ 50 | Level 3 per Spec #41 §5 requires: persistent P0 banner ✅, BUT also: "high-contrast where urgency requires", "visually escalated only when operational urgency escalates". The page renders at consistent Level 1 density whether P0 exists or not — the P0 banner is present but the REST of the page does not escalate visually |
| Mission mode treatment at Level 3 | ❌ 40 | Level 3 in Mission mode should exhibit HUD intensity, glow elements on critical data. Page does not differentiate mission mode rendering |

**VIC Score: 63 (AMBER)**

### 6.3 Mission Mode Readiness (MMR)

| Criterion | Score | Notes |
|-----------|-------|-------|
| useMode() called | ✅ | Destructures `mode` and `tokens` |
| Tokens applied to styling | ❌ 30 | `tokens` object is never referenced in JSX. All colours are primitive signal tokens (mode-invariant). Background, text, border colours all come from Tabler CSS classes |
| Both modes functional | ⚠️ 50 | Page renders in both modes but looks identical — Mission mode provides no operational advantage |
| Semantic token usage | ❌ 20 | Zero semantic token references in inline styles |

**MMR Score: 33 (RED)**

### 6.4 Strategy Consumption Conformity (SCC)

| Criterion | Score | Notes |
|-----------|-------|-------|
| Strategy-sourced thresholds | ✅ 90 | OODA thresholds from `operational-tempo` policy |
| Strategy provenance visible | ❌ 40 | User cannot see "Governed by: operational-tempo policy v1.0.0 (approved 2026-01-10)" |
| No hardcoded operational values | ✅ 95 | Fallback defaults (90/70) are clearly defensive, not business logic |

**SCC Score: 75 (AMBER)**

### 6.5 Journey Intelligence Readiness (JIR)

| Criterion | Score | Notes |
|-----------|-------|-------|
| Page participates in measurable workflow | ⚠️ 50 | It's the entry point — users ARRIVE here. It should emit "session-start" / "command-centre-viewed" journey event |
| Journey checkpoints identifiable | ❌ 30 | No journey instrumentation hooks visible |
| Ready for JI-1.0 tagger integration | ⚠️ 50 | Page structure allows insertion but no infrastructure exists |

**JIR Score: 43 (RED)**

### 6.6 Commander AI Readiness (AIR)

| Criterion | Score | Notes |
|-----------|-------|-------|
| AICAP markers correctly placed | N/A | None assigned to this route |
| "Orient This Page" interaction point | ❌ 0 | DS-1.0/Spec #13 defines 3 AI interaction points. The Command Centre — of ALL pages — should have the "orient-this-page" capability marker for future AI grounding |
| Commander AI button visible | ✅ (in shell) | Global AI button is in header (shell-level) |

**AIR Score: 50 (RED)** — The Command Centre is the most logical page for AI-enhanced orientation and currently has no AICAP marker.

---

## Step 7: SCORE

### Dimension Scores

| # | Dimension | Score | Band | Weight | Weighted |
|---|-----------|-------|------|--------|----------|
| 1 | Authority Alignment (AA) | 82 | AMBER | 15% | 12.3 |
| 2 | Use Case Coverage (UCC) | 85 | YELLOW | 12% | 10.2 |
| 3 | Data Completeness (DC) | 38 | RED | 12% | 4.6 |
| 4 | Design System Conformity (DSC) | 42 | RED | 12% | 5.0 |
| 5 | Cognitive Usability (CU) | 78 | AMBER | 10% | 7.8 |
| 6 | Navigation Coherence (NC) | 72 | AMBER | 8% | 5.8 |
| 7 | OODA Contribution (OODA) | 79 | AMBER | 8% | 6.3 |
| 8 | RBAC & Boundary (RBAC) | 100 | GREEN | 8% | 8.0 |
| 9 | Performance Adherence (PA) | 85 | YELLOW | 8% | 6.8 |
| 10 | Cross-Domain Relationship (CDRR) | 30 | RED | 7% | 2.1 |
| 11 | OODA Phase Health Expression (OPHE) | 79 | AMBER | — | — |
| 12 | Visual Intensity Ceiling (VIC) | 63 | AMBER | — | — |
| 13 | Mission Mode Readiness (MMR) | 33 | RED | — | — |
| 14 | Strategy Consumption (SCC) | 75 | AMBER | — | — |
| 15 | Journey Intelligence Readiness (JIR) | 43 | RED | — | — |
| 16 | Commander AI Readiness (AIR) | 50 | RED | — | — |

### Composite Score (Core Dimensions Only)

**Weighted composite: 68.9 / 100**

### Commander-Specific Average (Dimensions 11–16)

**Commander-specific average: 57.2 / 100**

---

## Step 8: RATIONALISE

| Question | Answer |
|----------|--------|
| Is this the ONLY surface for UC-001? | YES — keep |
| Does it render fewer than 3 entity fields? | NO — renders multiple data points |
| Is it reachable within 2 clicks? | YES — it IS the landing page |
| Nav group > 5 sub-items? | N/A — top nav entry |

**Rationalisation Score: 0** (No rationalisation needed — this is the programme entry point)

**However:** Relationship to `/posture` (Unit 16b) should be assessed. Currently `/posture` is a separate drill-path page. Consider whether posture summary KPIs should be INLINED into Command Centre rather than requiring a separate navigation.

---

## Step 9: DOCUMENT — Conformity Findings

### CRITICAL Findings

| # | Finding | Authority Violated | Remediation |
|---|---------|-------------------|-------------|
| F-001 | Page uses primitive tokens directly (`primitiveSignal.*`, `primitiveTypeScale.*`) for all inline styling — 12+ direct primitive references | DS-1.0 §1.3: "No component uses a primitive value directly. All styling references semantic or component tokens." | Replace ALL `primitiveSignal.*` with `tokens.status.*` and `primitiveTypeScale.*` with semantic type tokens. Mode-awareness becomes automatic. |

### HIGH Findings

| # | Finding | Authority Violated | Remediation |
|---|---------|-------------------|-------------|
| F-002 | Asset entity (40 assets available) not rendered. Command Centre shows no estate size, critical asset count, or coverage summary | RELATIONSHIP_MAP.md §1: Asset is shared entity appearing in D-08, D-09, D-10, D-18, D-27 — Command Centre (D-27) should surface asset posture | Add asset summary card: total assets, critical assets, coverage ratio |
| F-003 | Identity entity (25 identities available) not rendered. No identity posture indicator | RELATIONSHIP_MAP.md §1: Identity appears in D-07, D-13, D-15, D-18, D-27 — Command Centre should surface identity risk | Add identity summary: total identities, privileged count, high-risk count |
| F-004 | Case→RiskObject relationship not expressed. Cases and risk objects counted separately with no visible BINDING | RELATIONSHIP_MAP.md §2 Flow 1: "RiskObject emitted → D-18 Case Lifecycle binds" — this binding is the load-bearing connection | Show: "X cases binding Y risk objects across Z affected entities" |
| F-005 | Case→Asset relationship (relatedEntities field) not rendered. User cannot see which assets are under active case management | DATA_DICTIONARY.md Case entity: `relatedEntities` field is AVAILABLE | Add: "N critical assets under active investigation" |
| F-006 | Mission mode (`useMode()` → `tokens`) destructured but NEVER applied. Page renders identically in Standard and Mission modes | DS-1.0 §0: "Standard (Light) for management; Mission (HUD/Dark) for monitoring/analysis/live ops" — Command Centre is THE live ops surface | Apply `tokens.surface.*`, `tokens.text.*`, `tokens.border.*` to all styled elements |
| F-007 | OODA gauges use Tabler progress bars, not Commander `instrument-gauge` component from packages/ui | DS-1.0 §4 Component tokens / Spec #67 OODA Phase Dashboard: phase health should use purpose-built gauge components | Replace with InstrumentGauge component for OODA phases |

### MEDIUM Findings

| # | Finding | Authority Violated | Remediation |
|---|---------|-------------------|-------------|
| F-008 | Mission entity (3 active missions available) not rendered. Command Centre shows no mission alignment | Spec #34 / RELATIONSHIP_MAP.md: Mission Objective appears in D-19, D-23, D-24, D-29 | Add mission summary card or KPI |
| F-009 | Intelligence Layer EstateIntelligencePicture not surfaced. User cannot see 4-stream health | Spec #59 §5: Estate Intelligence Picture is the unified integration surface | Add intelligence stream summary panel |
| F-010 | No Insight Row per DS-1.0 §8. First content is OODA gauges without a KPI summary strip | DS-1.0 §8: "Insight Row — mandatory: summary KPIs + primary chart/gauge" | Add KPI strip above OODA gauges: total cases, SLA health, estate coverage, tempo |
| F-011 | Degradation detection results from `detectPhaseDegradation()` not surfaced. User sees amber/red gauge but not the CAUSE | Spec #58 §4: Phase degradation must preserve source evidence and operating context | Show degradation rationale beneath degraded phase gauges |
| F-012 | Drill-paths incomplete. No links to: /posture, /assets, /identity, /mission, /strategy, /fusion-map | Spec #41: "Action proximity — the user must see next action without hunting" | Add contextual drill-paths from each summary card to its detail surface |
| F-013 | Phase-to-phase loop not visually expressed. OODA appears as 4 independent gauges, not a continuous loop | Spec #58 doctrine: "Commander must NOT flatten OODA into a static dashboard" | Add visual loop indicator or circular gauge arrangement showing phase flow |
| F-014 | Strategy policy attribution absent. User cannot see which policy governs the displayed thresholds | Spec #32: Strategy consumption must be transparent and attributable | Add small attribution: "Tempo policy: operational-tempo v1.0.0" |
| F-015 | Pulse data (team/domain/system health) not surfaced. System health summary absent from command surface | Spec #34 / seed-pulse: SystemPulseEntry engine health exists | Add system health indicator card |

### LOW Findings

| # | Finding | Authority Violated | Remediation |
|---|---------|-------------------|-------------|
| F-016 | Cards use bare Tabler `.card` class, not `getOperationalCardStyles()` from packages/ui | DS-1.0: "shadcn/ui primitives restyled with these tokens" — operational card component exists | Adopt operational-card component for consistency |
| F-017 | No time context shown. User cannot see "as of" timestamp or data freshness | Performance/data freshness doctrine | Add "Last updated: [timestamp]" indicator |
| F-018 | Connector table renders ALL connectors in a flat list (4 items). At scale (50+ connectors) this pattern breaks | Scalability consideration | Switch to summary + drill pattern at threshold |
| F-019 | Risk object "by type" renders as raw internal type names (e.g. "coverage_blindspot"). Not user-friendly labels | Spec #46 Canonical Terminology | Map to human-readable labels |

### NOTE Findings

| # | Finding | Notes |
|---|---------|-------|
| F-020 | Command Centre should have an AICAP marker — "Orient this page for me" is the most natural AI enhancement point | Register in AICAP_REGISTER.md for Phase 2 |
| F-021 | Unit 16b (/posture) contains 12 posture metrics. At minimum, the overall posture score should surface on Command Centre as a KPI | Consider inlining top-level posture KPI |
| F-022 | Journey Intelligence entry point — Command Centre should emit a JI checkpoint when rendered (session start, orientation complete) | Plan for JI-1.0 instrumentation |
| F-023 | Level 3 intensity should dynamically ESCALATE only when P0 conditions exist. Currently the page never reaches true Level 3 visual treatment — it's always Level 1 with a P0 banner overlay | Implement dynamic intensity escalation |

---

## Score Summary

| Metric | Value |
|--------|-------|
| **Composite Score (core)** | **68.9 / 100** |
| **Band** | **AMBER** |
| **Commander-Specific Average** | **57.2 / 100** |
| **Commander-Specific Band** | **RED** |
| **Findings** | 1 CRITICAL, 6 HIGH, 8 MEDIUM, 4 LOW, 4 NOTE |
| **Review Status** | **REMEDIATION REQUIRED** |

---

## Remediation Priority

| Priority | Findings | Impact |
|----------|----------|--------|
| 1 (Immediate) | F-001 (primitives), F-006 (Mission mode) | Fixes DSC from 42→80+, MMR from 33→80+ |
| 2 (Next sprint) | F-002, F-003, F-004, F-005 (missing entities/relationships) | Fixes DC from 38→75+, CDRR from 30→70+ |
| 3 (Near term) | F-007, F-010, F-011, F-013 (component/layout) | Fixes OPHE from 79→90+, CU improvement |
| 4 (Planned) | F-008, F-009, F-012, F-014, F-015 | Comprehensive command surface |
| 5 (Phase 2) | F-020, F-022, F-023 (AI, JI, intensity) | Future capability readiness |

---

## What This Review Demonstrates

This review assessed the Command Centre page against **the full knowledge of what exists in the system**:

| System Knowledge Used | What It Revealed |
|----------------------|-----------------|
| `DATA_DICTIONARY.md` — 40+ Case fields, 11 Connector fields, 20+ RiskObject fields | Page renders only 3 Case fields, 6 Connector fields, 2 RiskObject fields |
| `seed-assets.ts` — 40 assets with coverage, criticality | Zero asset data on Command Centre |
| `seed-identities.ts` — 25 identities with risk scores | Zero identity data on Command Centre |
| `seed-missions.ts` — 3 missions with progress, aligned cases | Zero mission data on Command Centre |
| `seed-posture-metrics.ts` — 12 posture metrics with trends | Zero posture summary on Command Centre |
| `RELATIONSHIP_MAP.md` — 6 principal data flows, 12 shared entities | Only 1 relationship partially expressed (connector→OODA gauge internal computation) |
| `intelligence-layer.ts` — EstateIntelligencePicture with 4 streams | Not rendered |
| `ooda-layer.ts` — degradation detection, rationale | Only scores shown, not degradation cause |
| `AICAP_REGISTER.md` — 77 markers across estate | Command Centre has zero (should have "orient-this-page") |
| `DS-1.0` — semantic tokens, component tokens, layout doctrine | Page violates by using primitives directly |

**The page renders ~15% of the data that EXISTS and is RELEVANT to its purpose as the Command Centre.**

---

**End of Review.**
