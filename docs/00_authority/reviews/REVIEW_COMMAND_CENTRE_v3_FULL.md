# PAGE REVIEW: / (Command Centre) — UIAA-3.0 + Cognitive Workspace Behaviour

**Assessment Authority:** UIAA-3.0 + Cognitive Workspace Behaviour Standards
**Reviewer:** Commander Assessment Framework (automated)
**Date:** 2026-06-09
**Review Version:** 3.0 (complete assessment including workspace behaviour)

---

## PRE-ASSESSMENT: Surface Classification

| Field | Value |
|-------|-------|
| Route | `/` |
| **Primary Surface Type** | **Command** |
| **Secondary Surface Type** | Intelligence |
| **OODA Stage** | All four (hub) |
| **C2 Role** | Command + Coordination |
| **Cognitive Ceiling** | 4–6 primary attention items |
| **Primary Persona** | CISO, SOM |
| **Secondary Persona** | All authenticated |
| **Recommended Pattern** | **D (Command Workspace)** |
| Build Unit | Unit 16a |
| Use Cases | UC-001, UC-002 |
| Domains | D-18 Case, D-02 Connector, D-26 OODA, D-22 Strategy |
| Intensity Ceiling | Level 3 (Emergency Command) |
| Weight Adjustments Applied | DSQ +3%, SAQ +3%, OODU +2% (Command Surface) |

---

## PART 1: UIAA-3.0 Dimensional Assessment

### Core Dimension Scores (14 dimensions)

| # | Dimension | Code | Score | Band | Weight (adjusted) | Weighted |
|---|-----------|------|:-----:|:----:|:-----------------:|:--------:|
| 1 | Data Dictionary Conformity | DDC | 18 | RED | 12% | 2.16 |
| 2 | Proposition & Technical Realisation | PTR | 62 | AMBER | 12% (+2) | 7.44 |
| 3 | Use Case Realisation | UCR | 55 | RED | 8% | 4.40 |
| 4 | Decision Support Quality | DSQ | 25 | RED | 11% (+3) | 2.75 |
| 5 | Situational Awareness Quality | SAQ | 34 | RED | 11% (+3) | 3.74 |
| 6 | OODA Usability & Telemetry | OODU | 45 | RED | 10% (+2) | 4.50 |
| 7 | Design System Conformity | DSC | 28 | RED | 6% (-2) | 1.68 |
| 8 | Cognitive Usability | CU | 30 | RED | 5% (-2) | 1.50 |
| 9 | System-First Adherence | SFA | 72 | AMBER | 5% (-2) | 3.60 |
| 10 | RBAC & Boundary | RBAC | 90 | GREEN | 4% | 3.60 |
| 11 | Cross-Domain Relationships | CDRR | 10 | RED | 5% (-2) | 0.50 |
| 12 | Navigation & Continuity | NC | 62 | AMBER | 3% (-2) | 1.86 |
| 13 | Role Experience | RE | 35 | RED | 4% | 1.40 |
| 14 | Closed-Loop Contribution | CLC | 30 | RED | 4% | 1.20 |

**COMPOSITE SCORE: 40.3 / 100 (RED — FAIL)**

*(Lower than v2.1 assessment (46.1) because weight adjustments for Command Surface elevate DSQ/SAQ/OODU which all score RED, and reduce DSC/CU/NC which scored relatively better)*

---

### Decision Support Quality (DSQ) — NEW in v3.0

| Criterion | Required (Command Surface) | Present? | Deduction |
|-----------|:-:|:-:|:-:|
| Decision readiness (can a decision be made?) | MANDATORY | ❌ No — user must navigate to /cases to decide anything | -15 |
| Evidence availability (evidence visible, not hidden?) | MANDATORY | ⚠️ PARTIAL — case counts visible, but no evidence detail | -8 |
| Confidence indicators (source, freshness, derivation?) | MANDATORY | ❌ No data provenance or confidence shown | -15 |
| Supporting context (cross-domain, history, trajectory?) | EXPECTED | ❌ No relationships, no history, no trajectory | -8 |
| Recommended actions (next steps presented?) | EXPECTED | ⚠️ Only "Open War Room" for P0 | -4 |
| Dependency visibility (downstream impact?) | EXPECTED | ❌ No blast radius, no dependency context | -8 |
| Justifiability (audit trail, evidence chain?) | EXPECTED | ❌ No provenance, no reasoning visible | -8 |
| Defendability (exportable, traceable?) | OPTIONAL | ❌ No | 0 |

**DSQ Score: 100 - 66 = 25 / 100 (RED)**

**Critique:** The Command Centre currently presents STATUS but not DECISION CONTEXT. A CISO looking at "2 P0, 5 P1, 10 P2" cannot make a decision — they need to know WHY, WHAT DEPENDS ON IT, and WHAT TO DO NEXT. The page is a summary display, not a decision surface.

---

## PART 2: Cognitive Workspace Behaviour Assessment

### Current State

The Command Centre currently implements **Pattern A (Traditional Page)** — a single-column vertical scroll with:
- PageContainer header
- P0 banner (conditional)
- 4x OODA gauge cards (row)
- 3x Overview cards (row)
- Operating Pictures drill card
- Scope note card

**This is fundamentally wrong for a Command Surface.** Pattern D (Command Workspace) is MANDATORY per UIAA-3.0 Surface Taxonomy.

---

### 2.1 Scroll Model Assessment

| Check | Current State | Recommended | Justification |
|-------|-------------|-------------|---------------|
| **Model** | Single vertical scroll (entire page) | **Independent vertical scroll regions (3 columns)** | A command surface MUST keep situation awareness (left), analysis (centre), and activity feed (right) independently scrollable. If the activity feed pushes OODA gauges out of view, situational awareness is destroyed |
| P0 banner scrolls away? | YES (scrolls with content) | **NO — FIXED at top (emergency context must never leave viewport)** | P0 is mission-critical information. Scrolling it away is a C2 failure |
| KPI strip scrolls away? | No KPI strip exists | **NO — FIXED below P0 banner** | OODA tempo and critical metrics must remain visible at all times |
| Left column scrolls | N/A (no columns) | **Independent scroll** — mission objectives and operations can be long; scroll within their column without affecting centre or right | Left column content (missions, priorities, current ops) may exceed viewport |
| Centre column scrolls | N/A | **Independent scroll** — estate picture, threat picture, risk picture scroll within centre without affecting left or right | Centre analysis content is the deepest; independent scroll is critical |
| Right column scrolls | N/A | **Independent scroll** — activity feed is inherently unbounded (events accumulate). Must scroll without displacing any other content | Activity feed is temporal and grows. Independent scroll prevents displacement |

**Scroll Model Recommendation:**

```
FIXED: Emergency Banner (P0) — never scrolls
FIXED: KPI Strip — never scrolls
+------------------+-----------------------------+--------------------------+
| LEFT             | CENTRE                      | RIGHT                    |
| (independent     | (independent                | (independent             |
|  vertical scroll)|  vertical scroll)           |  vertical scroll)        |
|                  |                             |                          |
| overflow-y: auto | overflow-y: auto            | overflow-y: auto         |
| max-height:      | max-height:                 | max-height:              |
| calc(100vh -     | calc(100vh -                | calc(100vh -             |
| fixed-elements)  | fixed-elements)             | fixed-elements)          |
+------------------+-----------------------------+--------------------------+
```

---

### 2.2 Split Orientation Assessment

| Option | Assessment | Suitable for Command Centre? |
|--------|-----------|:---:|
| **Horizontal (Left / Centre / Right)** | Three-column layout supports simultaneous Situation + Analysis + Action. Natural cognitive flow: left-to-right = context-to-analysis-to-decision | YES — PRIMARY |
| Vertical (Top / Bottom) | Two-layer layout. Top summary, bottom detail. Loses simultaneous multi-perspective view that C2 requires | NO — not suitable for Command |
| **Hybrid (Fixed top + 3-column below)** | P0 banner + KPI strip fixed at top. Three columns fill remaining viewport. Best of both: persistent summary + multi-perspective workspace | YES — RECOMMENDED |

**Recommendation: Hybrid Split**
- FIXED horizontal band: P0 Banner + KPI Strip (top)
- BELOW fixed band: Three-column horizontal split (left 25% / centre 50% / right 25%)

**Alternative:** On viewports below 1400px, collapse to vertical: KPI strip then centre (full width) then left and right become expandable panels below. Maintains all content on narrow screens while optimising for wide/ultrawide.

---

### 2.3 Resizable Workspace Behaviour

| Panel | Default | Min | Max | Resize Behaviour | Session Persist |
|-------|:-------:|:---:|:---:|:----------------:|:---------------:|
| Left column | 25% | 15% | 35% | **Limited resize** — draggable divider between left and centre | YES |
| Centre column | 50% | 40% | 65% | Adjusts automatically when left/right resize | N/A (fills) |
| Right column | 25% | 15% | 35% | **Limited resize** — draggable divider between centre and right | YES |
| KPI Strip | 56px height | Fixed | Fixed | **Not resizable** | N/A |
| P0 Banner | 48px height | Fixed | Fixed (conditional render) | **Not resizable** | N/A |

**Justification:**
- **Limited** (not fully resizable) because: Command surfaces serve CISOs and SOMs who should NOT spend time configuring layout. Default should be optimal. But analysts who occasionally visit may want more centre (analysis) space.
- **Session persistence** because: returning to Command Centre should restore the user's preferred layout without re-adjustment.

---

### 2.4 Sticky Context Requirements

| Element | Sticky? | Justification |
|---------|:-------:|---------------|
| P0 Emergency Banner | **YES — viewport-fixed** | Mission-critical. Must never scroll away. P0 condition awareness is permanent during crisis |
| KPI Strip (OODA tempo + critical metrics) | **YES — viewport-fixed** | Programme health indicators must always be visible |
| Left column header ("Current Operations") | **YES — column-sticky** | Anchors the left column's identity |
| Centre column header ("Estate Picture") | **YES — column-sticky** | Same rationale |
| Right column header ("Activity Feed") | **YES — column-sticky** | Same rationale |
| Individual cards within columns | NO | Cards scroll within their column. They are content, not anchors |
| Operating Pictures drill links | NO | Navigation shortcuts, not persistent context |

**Current page: ZERO sticky elements.** P0 banner, OODA gauges, and all content scroll as a single surface.

---

### 2.5 Focus Mode Assessment

| Question | Assessment |
|----------|-----------|
| Should Command Centre support Focus Mode? | **NO** |
| Justification | Command Centre's PURPOSE is estate-wide awareness. Hiding panels defeats the purpose. If a user wants focus, they navigate to the domain's surface (/cases, /identity). Command Centre IS the "zoomed out" view |

---

### 2.6 Compare Mode Assessment

| Question | Assessment |
|----------|-----------|
| Should Command Centre support Compare Mode? | **NO** |
| Justification | Programme-level aggregates — nothing to compare side-by-side at Command level. Temporal comparison (this week vs last) is served by trend indicators, not side-by-side panels |

---

### 2.7 Context Expansion Assessment

| Question | Assessment |
|----------|-----------|
| Should Command Centre support Context Expansion? | **YES — within columns** |
| Behaviour | Clicking a case count in left column — right column updates to show those cases. Clicking a risk type in centre — right column shows affected entities. This is INTRA-PAGE context expansion |
| Pattern | Click item in left/centre — Right column RESPONDS (not navigates). If user wants full investigation, THEN they navigate |
| Recommendation | **RECOMMENDED** — transforms Command Centre from static dashboard into interactive command surface |

---

### 2.8 Cognitive Load Assessment

| Criterion | Current | With Pattern D | Rating |
|-----------|:-------:|:--------------:|:------:|
| **Context Retention** | LOW (single scroll, no anchors, P0 scrolls away) | HIGH (sticky KPI + fixed P0 + column anchors + independent scroll) | LOW → HIGH |
| **Navigation Efficiency** | MEDIUM (drill links exist but 8 missing) | HIGH (context expansion means less navigation) | MEDIUM → HIGH |
| **Orientation Support** | LOW (no "what am I looking at" beyond page title) | HIGH (column headers + KPI strip + P0 banner always answer orientation) | LOW → HIGH |
| **Decision Support** | LOW (no evidence, no confidence, no recommendations) | HIGH (left=context, centre=evidence, right=recommendations+actions) | LOW → HIGH |
| **Investigation Efficiency** | LOW (must navigate away for any investigation) | MEDIUM (context expansion helps, but full investigation requires /cases/:id) | LOW → MEDIUM |

---

## PART 3: Workspace Behaviour Specification (Target State)

```
PAGE: / (Command Centre)
PATTERN: D (Command Workspace)
CLASSIFICATION: Command Surface

SCROLL MODEL: Independent vertical scroll (3 regions)
  Fixed elements: P0 banner (conditional) + KPI strip
  Left column: independent scroll
  Centre column: independent scroll
  Right column: independent scroll

SPLIT ORIENTATION: Hybrid
  Top band: Fixed (P0 + KPI strip)
  Below: Horizontal three-column (25% / 50% / 25%)

DEFAULT LAYOUT RATIO: 25 / 50 / 25
  Left minimum: 15%
  Left maximum: 35%
  Right minimum: 15%
  Right maximum: 35%
  Centre: fills remaining

RESIZABLE: Limited
  Left/Centre divider: draggable
  Centre/Right divider: draggable
  Session persistence: YES

STICKY ELEMENTS:
  - P0 banner (viewport-fixed, top)
  - KPI strip (viewport-fixed, below P0)
  - Column headers (column-sticky, top of each scroll region)

FOCUS MODE: Not Supported (Command = wide view)
COMPARE MODE: Not Supported (programme-level)

CONTEXT EXPANSION: Supported (intra-page)
  Behaviour: Click item in left/centre — right column responds with context
  Does NOT navigate away

RESPONSIVE BEHAVIOUR:
  >=1920px: Three columns (25/50/25)
  1400-1919px: Three columns (20/55/25) — left compresses
  <1400px: Stack vertically (KPI — Centre — Left — Right)

MISSION MODE BEHAVIOUR:
  Standard: Light workspace, full information
  Mission: Dark workspace, suppressed non-critical, elevated alerts, mono metrics
  P0 Active: Forced Level 3 intensity regardless of mode toggle

COGNITIVE LOAD TARGET:
  Context Retention: HIGH
  Navigation Efficiency: HIGH
  Orientation Support: HIGH
  Decision Support: HIGH
  Investigation Efficiency: MEDIUM
```

---

## PART 4: Gap Analysis (Current vs Target)

| Aspect | Current State | Target State | Gap Severity |
|--------|-------------|-------------|:------------:|
| Layout pattern | Pattern A (single column) | Pattern D (three-column command) | **CRITICAL** |
| Scroll model | Single vertical scroll | Independent 3-region scroll | **HIGH** |
| Split orientation | None | Hybrid (fixed top + 3-col horizontal) | **HIGH** |
| Resizable panels | None | Limited resize with session persistence | **MEDIUM** |
| P0 banner sticky | NO (scrolls with content) | YES (viewport-fixed) | **HIGH** |
| KPI strip | Absent | Viewport-fixed, always visible | **HIGH** |
| Column headers | None (no columns) | Column-sticky | **MEDIUM** |
| Focus mode | N/A | Correctly not needed | NONE |
| Compare mode | N/A | Correctly not needed | NONE |
| Context expansion | None (click then navigate) | Intra-page (right column responds) | **HIGH** |
| Responsive collapse | N/A (single col) | Stack below 1400px | **MEDIUM** |
| Mission mode | None (identical rendering) | Full posture shift | **CRITICAL** |
| Decision support | Absent | Right column: recommendations + actions | **HIGH** |
| Temporal awareness | Zero | Activity feed + KPI trends + freshness | **CRITICAL** |

---

## PART 5: Combined Score Summary

### UIAA-3.0 Core Score

| Metric | Value |
|--------|-------|
| **Composite Score** | **40.3 / 100** |
| **Band** | **RED** |
| **Review Status** | **FAIL** |

### Cognitive Workspace Behaviour Score

| Criterion | Score |
|-----------|:-----:|
| Scroll Model Correctness | 0% (wrong model) |
| Split Orientation Correctness | 0% (no split) |
| Resize Implementation | 0% |
| Sticky Elements | 0% (nothing sticky) |
| Focus/Compare Suitability | 100% (correctly N/A) |
| Context Expansion | 0% |
| Responsive Design | 0% |

**Workspace Behaviour Score: 14 / 100 (RED)**

### Combined

| Assessment | Score | Band |
|-----------|:-----:|:----:|
| UIAA-3.0 Dimensional | 40.3 | RED |
| Workspace Behaviour | 14 | RED |
| Commander-Specific (from v2.1) | 25.3 | RED |
| **Overall** | **~33** | **RED — FAIL** |

---

## PART 6: Remediation Path

| Priority | What | Score Impact |
|----------|------|:----------:|
| **P0** | Convert to Pattern D (3-column layout with independent scroll regions) | Scroll +100%, Split +100% |
| **P1** | Fix P0 banner viewport-fixed + add KPI strip viewport-fixed | Sticky +100%, SAQ improvement |
| **P2** | Populate columns (left: mission/priorities/ops, centre: estate/threat/risk/OODA, right: activity feed + actions) | DSQ +50, OODU +40, DDC +30, CDRR +40 |
| **P3** | Context expansion (right responds to selection in left/centre) | CU +30, Navigation +20 |
| **P4** | Tokens + Mission mode posture shift | DSC +50, MMR +70 |
| **P5** | Resize + responsive + session persistence | CU +10, final polish |

**Estimated post P0-P4: ~82 (CONDITIONAL PASS)**
**Estimated post P0-P5: ~90 (approaching PASS)**

---

**This document is an assessment and recommendation only. It does not authorise implementation. Implementation requires owner approval and integration into the build sequence.**

---

**End of Review.**
