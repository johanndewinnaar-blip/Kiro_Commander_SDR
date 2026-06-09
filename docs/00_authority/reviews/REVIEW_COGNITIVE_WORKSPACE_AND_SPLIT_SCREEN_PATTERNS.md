# COMMANDER SDR — Cognitive Workspace & Split-Screen UI Audit

**Purpose:** Assessment and recommendation document evaluating cognitive workspace patterns for Commander SDR.
**Date:** 2026-06-09
**Status:** REVIEW — requires owner decision before implementation.
**Authority:** UIAA-3.0, DS-1.0, Spec #41, Spec #58, Hard Rules

---

## 1. Executive Summary

Commander SDR currently has **110 pages** across 3 application boundaries. Analysis of representative pages reveals:

- **2 pages** already implement split-screen cognitive workspace patterns (Cases Detail, Fusion Map)
- **1 page** implements a forced Mission-mode emergency command layout (War Room P0)
- **2 pages** implement list→multi-section-detail composition (Identity, Assets)
- **~105 pages** use single-column vertical scroll (KPI strip → cards/charts → table)

The platform is evolving from a traditional dashboard application into a Cyber Command & Control (C2) platform. The current single-column pattern creates:

- Excessive navigation between related contexts
- Context loss when drilling into detail
- Cognitive switching fatigue across the OODA cycle
- Limited relationship awareness
- Poor decision support (evidence separated from decisions)

**Recommendation:** Selective adoption of cognitive workspace patterns focused on:
1. **Command surfaces (9 pages) → Pattern D** (three-column command workspace) — IMMEDIATE
2. **Investigation surfaces (10 pages) → Pattern C** (split investigation workspace) — 2 already done, 8 MEDIUM-TERM
3. **Intelligence surfaces with selection → Pattern B→C** (browse with context expansion) — MEDIUM-TERM
4. **Configuration/Governance/Pulse → Pattern A** (remain as traditional pages) — NO CHANGE

---

## 2. Cognitive Workspace Principles

### 2.1 Context Retention

**Definition:** Users maintain awareness of the selected object while exploring related information — they never "lose their place."

**Commander Implementation:**
- Split-screen layouts keep the primary object visible while related context appears beside it
- Inline expansion preserves the list/queue context while revealing detail (per Hard Rule #3 for case lists)
- Sticky headers maintain case/entity identity as user scrolls through sections
- `/cases/[id]` already demonstrates this with its sticky right rail

### 2.2 Progressive Disclosure

**Definition:** Complexity reveals gradually through interaction rather than overwhelming the user on initial load.

**Commander Implementation:**
- Level 1 (Glance): KPI strip + band indicators visible immediately
- Level 2 (Scan): Summary cards and priority distribution visible without scrolling
- Level 3 (Explore): Expandable panels reveal detail on interaction
- Level 4 (Investigate): Drill-through to full detail surfaces
- Command surfaces must support ALL four levels simultaneously through column architecture

### 2.3 Relationship Awareness

**Definition:** Users can understand connections between entities (cases, assets, identities, risks, actions) without navigating away.

**Commander Implementation:**
- Right-rail panels showing related entities (already present on Cases Detail)
- Cross-entity drill-paths within the workspace (click identity → panel updates, don't navigate)
- Relationship indicators on list items (blast radius count, affected entities, case count)
- Fusion Map blast-radius panel as exemplar of relationship-aware layout

### 2.4 Orientation Support

**Definition:** The page continuously answers: What am I looking at? Why is it important? What does it affect? What should I do next?

**Commander Implementation:**
- Persistent headers with entity identity + priority + SLA + status
- "Routing rationale" and "strategy attribution" panels explaining WHY
- OODA phase indicators showing where this fits in the cycle
- Commander AI "orient this page" entry point (future)

### 2.5 Action Proximity

**Definition:** Decisions and actions are located close to the information that drives them.

**Commander Implementation:**
- Right-rail actions beside the evidence that justifies them
- Command workspace right column dedicated to decisions/actions
- Inline action buttons on sub-action rows (Cases Detail already does this)
- Proactive system-recommended actions based on page state

---

## 3. OODA Mapping Assessment

### Pattern-to-OODA Alignment

| Pattern | Observe | Orient | Decide | Act | Loop Traversal |
|---------|:-------:|:------:|:------:|:---:|:--------------:|
| **A — Traditional Page** | ⚠️ (data visible) | ❌ (no context) | ❌ (no actions) | ❌ | Cannot traverse OODA |
| **B — Browse Workspace** | ✅ (inventory visible) | ⚠️ (quick context) | ❌ | ❌ | Observe only |
| **C — Split Investigation** | ✅ | ✅ (relationships, context) | ✅ (evidence-beside-decision) | ⚠️ (limited action) | Observe → Orient → Decide |
| **D — Command Workspace** | ✅ (situation column) | ✅ (analysis centre) | ✅ (decision column) | ✅ (action column) | **Full OODA loop** |
| **E — Strategic Workspace** | ✅ (objectives) | ✅ (progress) | ✅ (strategy) | ⚠️ (indirect) | Decide → Act (strategic) |

### Implication for Commander

- **Command surfaces MUST use Pattern D** — they are the only pages expected to support full OODA loop traversal
- **Investigation surfaces SHOULD use Pattern C** — Orient + Decide is their primary function
- **Intelligence surfaces SHOULD use Pattern B→C** — Observe is primary, Orient on selection
- **All other surfaces** — Pattern A is acceptable (they serve a single OODA stage or are outside the loop)

---

## 4. Pattern Definitions

### Pattern A — Traditional Page

```
┌──────────────────────────────────────────────────┐
│ Header (pretitle + title + actions)              │
├──────────────────────────────────────────────────┤
│ KPI Strip (4-6 tiles)                           │
├──────────────────────────────────────────────────┤
│ Content (table / chart / form)                  │
├──────────────────────────────────────────────────┤
│ Detail Section (additional tables / drill links) │
└──────────────────────────────────────────────────┘
```

**Suitable for:** Settings, administration, configuration, reporting (read-only output), pulse dashboards, CRUD tables, simple governance views.

**Cognitive benefits:** Familiar, linear, low cognitive overhead for task-oriented work.

**Risks:** None for its intended purpose. Risk only when misapplied to investigation or command surfaces.

**Commander-specific:** 73 of 110 pages should remain Pattern A. This is correct — not every page needs workspace complexity.

---

### Pattern B — Browse Workspace

```
┌──────────────────────────────────────────────────────────┐
│ Header                                                    │
├─────────────────────┬────────────────────────────────────┤
│ LEFT (40%)          │ RIGHT (60%)                         │
│                     │                                     │
│ • Search            │ • Summary card                      │
│ • Filters           │ • Quick context                     │
│ • Inventory list    │ • Key relationships                 │
│ • Sort controls     │ • Actions available                 │
│                     │ • Drill links                       │
└─────────────────────┴────────────────────────────────────┘
```

**Suitable for:** Entity inventories (assets, identities, vulnerabilities, IOCs) where the user browses a list and needs quick context without full navigation.

**Cognitive benefits:** Maintains list context while providing summary. User never loses their place in the queue.

**Risks:** Viewport pressure on narrower screens. Right panel must collapse gracefully below 1400px.

**Commander-specific:** Transitions to Pattern C when a user clicks to investigate a specific entity.

---

### Pattern C — Split Investigation Workspace

```
┌──────────────────────────────────────────────────────────────────┐
│ Header (entity identity + priority + SLA + status)                │
├────────────────────────────────────┬─────────────────────────────┤
│ MAIN (minmax(0, 1fr))             │ RAIL (320px, sticky)         │
│                                    │                              │
│ • Lifecycle pipeline               │ • Details (owner, team,     │
│ • Actions / sub-actions            │   type, surface, dates)     │
│ • Evidence & risk objects          │ • Impact (blast radius,     │
│ • Activity timeline                │   affected, confidence)     │
│ • Communication                    │ • People & escalation       │
│ • Audit trail                      │ • Strategy summary          │
│                                    │ • Related entities          │
│                                    │ • Drill paths               │
└────────────────────────────────────┴─────────────────────────────┘
```

**Suitable for:** Cases (detail), assets (detail), identities (detail), vulnerabilities (detail), exposures (detail) — any surface where investigation, evidence review, and relationship awareness are primary.

**Cognitive benefits:** Primary content scrolls while context remains visible. Relationships always in view. Decision context never lost.

**Risks:** Right rail must not become a dumping ground. Keep to 5-7 rail panels maximum. Rail content must be scannable at a glance.

**Commander-specific:** `/cases/[id]` ALREADY implements this pattern. It is the exemplar. Extension to other investigation surfaces should follow the same structure.

---

### Pattern D — Command Workspace

```
┌───────────────────────────────────────────────────────────────────────────┐
│ Emergency Banner (conditional — P0 only)                                   │
├───────────────────────────────────────────────────────────────────────────┤
│ KPI Strip (OODA tempo + critical metrics)                                  │
├──────────────────┬─────────────────────────────┬──────────────────────────┤
│ LEFT (25%)       │ CENTRE (50%)                │ RIGHT (25%)              │
│                  │                              │                          │
│ • Mission        │ • Global Estate Picture      │ • Activity Feed          │
│   Objectives     │ • Threat Picture             │   (temporal, live)       │
│ • Strategic      │ • Risk Picture               │ • Recent decisions       │
│   Priorities     │ • OODA Health Gauges         │ • Pending approvals      │
│ • Current        │ • Blast Zone                 │ • Recommendations        │
│   Operations     │ • Relationship overview      │ • Quick actions          │
│                  │                              │                          │
└──────────────────┴─────────────────────────────┴──────────────────────────┘
```

**Suitable for:** Command Centre, War Room, Operating Pictures, SOM workspaces — any surface where programme-level situational awareness, multi-domain correlation, and decision-readiness are primary.

**Cognitive benefits:** Supports full OODA loop in a single view. Situation (left) → Analysis (centre) → Decision/Action (right) follows natural cognitive flow. Activity feed provides temporal awareness. Three columns keep cognitive ceiling at 4-6 items per column while providing estate-wide coverage.

**Risks:** Three-column layout requires wide viewport (≥1400px per DS-1.0). Must collapse gracefully. Centre column must not become overloaded. Each column has its own cognitive ceiling.

**Commander-specific:** This should become the MANDATORY standard for all Command surfaces. The War Room P0 already partially implements this (emergency banner + case panels + sub-action board + decision log + communication cadence). Command Centre (/) is the primary candidate for immediate conversion.

---

### Pattern E — Strategic Workspace

```
┌──────────────────────────────────────────────────────────────────┐
│ Header (mission/strategy identity + status)                       │
├──────────────────────────────────────────────────────────────────┤
│ Objectives Bar (horizontal progress indicators)                   │
├──────────────────────────────────┬───────────────────────────────┤
│ LEFT (50%)                       │ RIGHT (50%)                    │
│                                  │                                │
│ • Strategy/Policy detail         │ • Progress measurement         │
│ • Simulation parameters          │ • Exposure reduction tracking  │
│ • Approval workflow              │ • Mission alignment            │
│ • Effectiveness measurement      │ • Case contribution            │
│                                  │ • Outcome attribution          │
└──────────────────────────────────┴───────────────────────────────┘
```

**Suitable for:** Strategy Centre, Mission Management, Executive Oversight — surfaces focused on strategic planning, objective tracking, and outcome measurement.

**Cognitive benefits:** Strategic context and operational outcomes side by side. Progress always visible. Policy decisions adjacent to their measured impact.

**Risks:** Requires mature data (strategy effectiveness metrics, mission progress, outcome attribution). Should be deferred until Phase 2 measurement capabilities exist.

**Commander-specific:** `/strategy/centre` and `/mission/*` are future candidates. Current implementation is too data-sparse for this pattern (seed data doesn't include effectiveness measurements yet).

---

## 5. Page-by-Page Classification

### COMMAND Super-Group (9 pages)

| Route | Current Pattern | Recommended | Surface Type | OODA | C2 Role | Ceiling | Persona | Priority |
|-------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `/` | A (single-col) | **D (Command)** | Command | All | Command + Coordination | 4–6 | CISO, SOM | **IMMEDIATE** |
| `/posture` | A (single-col) | A (remain — KPI dashboard) | Command | Observe + Orient | Command | 4–6 | CISO, SOM | Not Recommended |
| `/operating-picture/external` | A (single-col) | **D (Command)** | Intelligence | Observe + Orient | Communication | 8–12 | Analyst, SOM | **MEDIUM** |
| `/operating-picture/internal` | A (single-col) | **D (Command)** | Intelligence | Observe + Orient | Communication | 8–12 | Identity, SOM | **MEDIUM** |
| `/war-room/p0` | Partial D (emergency) | **D (Command)** — enhance | Command | All | Command + Coordination | 4–6 | CISO, SOM | **IMMEDIATE** |
| `/ciso` | A (scaffold) | **D (Command)** | Command | Orient + Decide | Command | 4–6 | CISO | **FUTURE** |
| `/som/ciso` | A (scaffold) | **D (Command)** | Command | Orient + Decide | Command | 4–6 | CISO | **FUTURE** |
| `/som/security-operations` | A (scaffold) | **D (Command)** | Command | All | Command + Coordination | 6–10 | SOM | **FUTURE** |
| `/control-plane` | A (KPI grid) | A (remain) | Command | All | Command | 6–10 | Operator | Not Recommended |

---

### CASES & LIFECYCLE Super-Group (8 pages)

| Route | Current Pattern | Recommended | Surface Type | OODA | C2 Role | Ceiling | Persona | Priority |
|-------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `/cases` | A (table) | A (with inline expansion per Hard Rule #3) | Investigation | Orient + Decide | Control | 12–20 | Analyst | Not Recommended |
| `/cases/my` | A (table) | A (with inline expansion per Hard Rule #3) | Investigation | Decide | Control | 12–20 | Analyst | Not Recommended |
| `/cases/[id]` | **C (split — already)** | C ✅ (maintain + enhance) | Investigation | Orient + Decide + Act | Control | 12–20 | Analyst | ✅ DONE |
| `/cases/analytics` | A (KPI + charts) | A (remain) | Governance | All (measurement) | Outcome | 8–12 | SOM, CISO | Not Recommended |
| `/mission/overview` | A (scaffold) | **E (Strategic)** | Strategy | Decide | Command | 6–10 | CISO, SOM | **FUTURE** |
| `/mission/objectives` | A (scaffold) | **E (Strategic)** | Strategy | Decide | Command | 6–10 | CISO, SOM | **FUTURE** |
| `/mission/impact` | A (scaffold) | **E (Strategic)** | Strategy | Act (outcome) | Outcome | 6–10 | CISO, SOM | **FUTURE** |
| `/war-room/p0` | (see Command group) | — | — | — | — | — | — | — |

---

### INTELLIGENCE Super-Group (30 pages)

| Route | Current Pattern | Recommended | Surface Type | OODA | Ceiling | Persona | Priority |
|-------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| `/fusion-map` | **C (split — already)** | C ✅ (maintain) | Intelligence | Observe + Orient | 8–12 | Architect | ✅ DONE |
| `/fusion-map/blast-radius` | A (scaffold) | **C (graph + impact panel)** | Intelligence | Orient | 8–12 | Architect | **MEDIUM** |
| `/fusion-map/mission` | A (scaffold) | **C (graph + mission panel)** | Intelligence | Orient + Decide | 8–12 | CISO, SOM | **FUTURE** |
| `/fusion-map/p0` | A (scaffold) | **D (emergency graph)** | Intelligence | All | 8–12 | CISO, SOM | **FUTURE** |
| `/vulnerabilities` | A (KPI + table) | **B (browse → C on select)** | Intelligence | Observe + Orient | 8–12 | Vuln Analyst | **MEDIUM** |
| `/vulnerabilities/kev` | A (scaffold) | **B (browse → C on select)** | Intelligence | Orient + Decide | 8–12 | Vuln Analyst | **MEDIUM** |
| `/vulnerabilities/patches` | A (scaffold) | **B (browse → C on select)** | Intelligence | Decide + Act | 8–12 | Vuln Analyst | **MEDIUM** |
| `/vulnerabilities/supply-chain` | A (scaffold) | **B (browse)** | Intelligence | Observe + Orient | 8–12 | Vuln Analyst | **MEDIUM** |
| `/exposure` | A (scaffold) | **C (exposure + impact rail)** | Intelligence | Observe + Orient | 8–12 | Architect | **MEDIUM** |
| `/exposure/blast-zones` | A (scaffold) | **C (graph + blast panel)** | Intelligence | Orient | 8–12 | Architect | **MEDIUM** |
| `/exposure/coverage-gaps` | A (scaffold) | **C (gaps + remediation rail)** | Intelligence | Orient + Decide | 8–12 | Architect, SOM | **MEDIUM** |
| `/identity` | A (table → detail) | **B (browse → C on select)** | Intelligence | Observe + Orient | 8–12 | Identity Specialist | **MEDIUM** |
| `/identity/privileged` | A (list) | **C (split investigation)** | Investigation | Orient + Decide | 12–20 | Identity Specialist | **MEDIUM** |
| `/identity/drift` | A (list) | **C (split investigation)** | Investigation | Orient + Decide | 12–20 | Identity Specialist | **MEDIUM** |
| `/architecture` | A (scaffold) | **B (browse → C on select)** | Intelligence | Observe + Orient | 8–12 | Architect | **MEDIUM** |
| `/architecture/drift` | A (scaffold) | **C (drift + impact rail)** | Investigation | Orient + Decide | 12–20 | Architect | **MEDIUM** |
| `/architecture/dependencies` | A (scaffold) | **C (graph + dependency rail)** | Intelligence | Orient | 8–12 | Architect | **MEDIUM** |
| `/assets` | A (table → detail) | **B (browse → C on select)** | Intelligence | Observe | 8–12 | Analyst | **MEDIUM** |
| `/assets/ownership` | A (detail) | **C (split investigation)** | Investigation | Orient | 12–20 | Analyst | **MEDIUM** |
| `/assets/classification` | A (detail) | **C (split investigation)** | Investigation | Orient | 12–20 | Analyst | **MEDIUM** |
| `/coverage/*` (4 pages) | A (scaffold/built) | A (remain) | Intelligence | Observe | 8–12 | SOM, Architect | Not Recommended |
| `/tool-health/*` (3 pages) | A (built) | A (remain) | Intelligence | Observe | 8–12 | SOM | Not Recommended |
| `/search` | A (built) | **B (search → C on select)** | Intelligence | Observe + Orient | 8–12 | All | **MEDIUM** |

---

### OPERATIONS Super-Group (9 pages — Pulse)

| Route | Current Pattern | Recommended | Surface Type | Ceiling | Priority |
|-------|:-:|:-:|:-:|:-:|:-:|
| `/team-pulse/*` (3 pages) | A (KPI + chart + table) | A (remain — single-concern dashboards) | Governance | 6–10 | Not Recommended |
| `/domain-pulse/*` (3 pages) | A (KPI + chart + table) | A (remain) | Governance | 6–10 | Not Recommended |
| `/system-pulse/*` (3 pages) | A (KPI + chart + table) | A (remain) | Intelligence | 6–10 | Not Recommended |

---

### PLATFORM Super-Group (12 pages)

| Route | Current Pattern | Recommended | Surface Type | Ceiling | Priority |
|-------|:-:|:-:|:-:|:-:|:-:|
| `/platform` | A (scaffold) | A (remain) | Configuration | Unlimited | Not Recommended |
| `/platform/connectors` | A (built) | A (remain) | Configuration | Unlimited | Not Recommended |
| `/platform/data-quality` | A (built) | A (remain) | Intelligence | 8–12 | Not Recommended |
| `/platform/rules` | A (filter + table) | A (remain) | Configuration | Unlimited | Not Recommended |
| `/platform/rules/validation` | A (built) | A (remain) | Execution | 4–8 | Not Recommended |
| `/platform/rules/simulation` | A (built) | A (remain — could evolve to E) | Decision | 6–10 | **FUTURE** |
| `/platform/models` | A (built) | A (remain) | Configuration | Unlimited | Not Recommended |
| `/platform/models/lifecycle` | A (built) | A (remain) | Governance | 8–12 | Not Recommended |
| `/commander-ai` | A (built) | A (remain) | Configuration | Unlimited | Not Recommended |
| `/platform/automation` | A (built) | A (remain) | Configuration | Unlimited | Not Recommended |
| `/platform/features` | A (built) | A (remain) | Configuration | Unlimited | Not Recommended |
| `/platform/audit` | A (built) | A (remain) | Governance | 8–12 | Not Recommended |

---

### STRATEGY & GOVERNANCE Super-Group (16 pages)

| Route | Current Pattern | Recommended | Surface Type | Ceiling | Priority |
|-------|:-:|:-:|:-:|:-:|:-:|
| `/strategy/centre` | A (KPI + table) | **E (Strategic Workspace)** | Decision | 6–10 | **FUTURE** |
| `/strategy/simulation` | A (built) | **E (Strategic — simulation panel)** | Decision | 6–10 | **FUTURE** |
| `/strategy/audit-history` | A (built) | A (remain) | Governance | 8–12 | Not Recommended |
| `/governance` | A (KPI + table) | A (remain) | Governance | 8–12 | Not Recommended |
| `/governance/policies` | A (scaffold) | A (remain) | Governance | 8–12 | Not Recommended |
| `/governance/exceptions` | A (scaffold) | A (remain) | Governance | 8–12 | Not Recommended |
| `/governance/decisions` | A (built) | A (remain) | Governance | 8–12 | Not Recommended |
| `/reporting` | A (built) | A (remain) | Governance | 8–12 | Not Recommended |
| `/reporting/exports` | A (built) | A (remain) | Governance | 8–12 | Not Recommended |
| `/reporting/ciso-pack` | A (built) | A (remain) | Governance | 6–10 | Not Recommended |
| `/som/ciso` | A (scaffold) | **D (Command)** | Command | 4–6 | **FUTURE** |
| `/som/security-operations` | A (scaffold) | **D (Command)** | Command | 6–10 | **FUTURE** |
| `/som/architecture` | A (scaffold) | **C (investigation)** | Intelligence | 8–12 | **FUTURE** |
| `/som/risk` | A (scaffold) | A (remain) | Governance | 8–12 | Not Recommended |
| `/som/cloud-security` | A (scaffold) | **C (investigation)** | Intelligence | 8–12 | **FUTURE** |

---

### ADMINISTRATION Super-Group (17 pages)

| Route | Current Pattern | Recommended | Priority |
|-------|:-:|:-:|:-:|
| ALL `/settings/*` (17 pages) | A (strategy config delegate) | **A (remain)** — correct for Configuration surfaces | **Not Recommended** |

---

### CONTROL PLANE (13 pages)

| Route | Current Pattern | Recommended | Priority |
|-------|:-:|:-:|:-:|
| ALL `/control-plane/*` (13 pages) | A (KPI grid + tables) | **A (remain)** — correct for operator console | **Not Recommended** |

---

## 6. Context Expansion Workspace Assessment

### Pattern Evaluated

```
CURRENT: Click item → Navigate to new page → Context lost
PROPOSED: Click item → Right panel expands → User remains anchored in list
```

### Which Pages Should Adopt

| Page | Current Behaviour | Proposed | Benefit |
|------|------------------|----------|---------|
| `/cases` | Click → /cases/[id] (full navigation) | Inline expansion (per Hard Rule #3) | Context retention, reduced navigation |
| `/identity` | Click → /identity?id=X (query param detail) | Right panel expansion | List context maintained |
| `/assets` | Click → /assets?id=X (query param detail) | Right panel expansion | List context maintained |
| `/vulnerabilities` | Full page table only | Browse + right context panel on selection | Quick triage without navigation |

### Benefits

1. **Context retention** — user never loses queue position
2. **Reduced navigation** — 50% fewer page transitions for typical investigation workflow
3. **Mental model preservation** — queue/list awareness maintained during investigation
4. **OODA efficiency** — Orient and Decide can happen without returning to the queue

### Risks

1. **Viewport pressure** — right panel reduces list width. Mitigated by DS-1.0 wide/ultrawide support (1920px+)
2. **Complexity** — more complex layout component. Mitigated by reusable SplitInvestigation component
3. **Mobile** — not applicable (Commander is desktop-only per DS-1.0)
4. **Performance** — right panel loads detail data on selection. Mitigated by seed fixture pattern (client-side)

### Implementation Complexity

**Medium** — requires:
- A shared `SplitInvestigation` layout component (left list + right rail)
- Selection state management (which item is foregrounded)
- Right-rail collapse below 1400px breakpoint
- No new data requirements (same entities already consumed)

### Recommendation

**ADOPT** for Intelligence surfaces that have list→detail patterns (identity, assets, vulnerabilities). This is the natural intermediate between Pattern A (current) and Pattern C (full investigation workspace).

**EXCEPTION:** Case queue (`/cases`, `/cases/my`) uses inline expansion ONLY per Hard Rule #3 (no split screen for case list). The right panel approach is NOT applied here.

---

## 7. Command Centre Assessment

### Proposed Target State

```
┌───────────────────────────────────────────────────────────────────────────────┐
│ EMERGENCY BANNER (conditional — P0 active only)                                │
├───────────────────────────────────────────────────────────────────────────────┤
│ KPI STRIP: OODA Tempo │ P0 Count │ SLA Health │ Estate Size │ Coverage │ Tempo│
├──────────────────┬─────────────────────────────────┬──────────────────────────┤
│ LEFT (25%)       │ CENTRE (50%)                    │ RIGHT (25%)              │
│                  │                                  │                          │
│ Mission          │ Global Estate Picture            │ Operational Activity     │
│ Objectives       │ (OODA phase gauges + estate      │ Feed (temporal, live):   │
│ • Zero Trust 25% │  metrics + relationship summary) │                          │
│ • Supply Chain   │                                  │ • P0 War Room opened     │
│ • Cloud Sec      │ Threat Picture                   │ • Case CASE-0006 P1→P0   │
│                  │ (external attack state +          │ • SLA breach: CASE-003   │
│ Strategic        │  pre-warned classification)      │ • Connector restored     │
│ Priorities       │                                  │ • Mission obj completed  │
│ • P0 resolution  │ Risk Picture                     │ • Validation passed      │
│ • Drift closure  │ (risk object summary + treatment │ • Exposure reduced       │
│ • Coverage >95%  │  state + blast zones)            │ • Strategy approved      │
│                  │                                  │ • Audit event            │
│ Current Ops      │ Relationship Summary             │                          │
│ • 30 cases       │ (cross-domain binding counts)    │ Quick Actions:           │
│ • 2 P0 active    │                                  │ • Open War Room          │
│ • 3 SLA breached │                                  │ • View Case Queue        │
│ • 4 connectors   │                                  │ • Strategy Centre        │
│                  │                                  │ • Full Reporting         │
└──────────────────┴─────────────────────────────────┴──────────────────────────┘
```

### Assessment Against UIAA-3.0

| Dimension | Score Impact |
|-----------|-------------|
| **Situational Awareness (SAQ)** | All 6 criteria achievable: Glanceability (KPI strip), Delta (activity feed), Attention (priority ordering), Trajectory (trends in centre), Anomaly Salience (colour + position), Spatial Priority (left→centre→right flow) |
| **OODA Usability (OODU)** | Full loop: Observe (centre estate picture), Orient (centre threat/risk), Decide (left priorities + centre analysis), Act (right actions + feed confirmation) |
| **Cognitive Load (CU)** | 4-6 items per column × 3 columns = within ceiling. Progressive disclosure via column depth |
| **Temporal Awareness (TA)** | Activity feed IS temporal by nature. KPI strip shows current state. Centre shows trajectory |
| **Decision Support (DSQ)** | Evidence (centre) beside decisions (right). Context (left priorities) beside evidence. Full DSQ chain |
| **Action Proximity** | Score 5 — proactive contextual actions in right column, immediate to the decision context |

### C2 Alignment

| C2 Element | How It's Served |
|-----------|----------------|
| **Command** | Left column: mission objectives, strategic priorities, current operations |
| **Control** | Centre: estate picture, threat picture, risk picture — the control surface |
| **Coordination** | Right: activity feed shows multi-party activity, pending approvals |
| **Communication** | Right: activity feed IS the communication channel (events, milestones, decisions) |
| **Outcome Measurement** | Left: mission progress. Centre: exposure reduction. Right: confirmation events |

### Recommendation

**ADOPT** as the Commander Command Centre standard. This three-column Pattern D layout represents the most significant single improvement available to the platform.

**Estimated UIAA-3.0 score impact (Command Centre):**
- SAQ: 34 → 85 (+51)
- OODU: 45 → 90 (+45)
- CU: 38 → 82 (+44)
- DSQ: new dimension, would score ~80
- Overall composite: 46 → ~78 (from FAIL to REMEDIATION REQUIRED → approaching CONDITIONAL PASS)

---

## 8. Commander UI Standard Recommendations

| Pattern | Standard For | Mandatory? | Count |
|---------|-------------|:----------:|:-----:|
| **A — Traditional** | Configuration, Governance (simple), Pulse dashboards, CRUD tables, Reporting | Default | 73 pages |
| **B — Browse** | Intelligence inventories (transition to C on selection) | Recommended for Intelligence lists | 8 pages |
| **C — Split Investigation** | ALL Investigation surfaces | **Mandatory** for Investigation classification | 15 pages |
| **D — Command Workspace** | ALL Command surfaces | **Mandatory** for Command classification | 9 pages |
| **E — Strategic Workspace** | Strategy/Mission surfaces | Recommended (when data matures) | 5 pages |

### Governance

- Pattern D is MANDATORY for any page classified as "Command" in UIAA-3.0 surface taxonomy
- Pattern C is MANDATORY for any page classified as "Investigation" in UIAA-3.0 surface taxonomy
- Pattern A/B are ACCEPTABLE for all other classifications
- Pattern E is RECOMMENDED for Strategy/Decision classifications but NOT required until Phase 2

---

## 9. Proposed Future Commander Layout Standards

The following layout components should be added to the Commander design system (DS-1.0):

| Component | Purpose | Priority |
|-----------|---------|----------|
| `CommandWorkspace` | Three-column layout (25/50/25) with emergency banner, KPI strip, and column architecture | IMMEDIATE |
| `SplitInvestigation` | Two-column layout (main + 320px sticky right rail) — generalised from `/cases/[id]` | IMMEDIATE |
| `BrowseWorkspace` | Two-column layout (40% list + 60% context) with selection state | MEDIUM |
| `ContextExpansionPanel` | Right-panel expansion component for inline detail without navigation | MEDIUM |
| `StrategicWorkspace` | Two-column layout (50/50) with objectives bar and progress indicators | FUTURE |
| `ActivityFeed` | Temporal event feed component (timestamped, categorised, live-updating) | IMMEDIATE (needed for Pattern D) |

---

## 10. Implementation Priority Matrix

### IMMEDIATE CANDIDATE (implement in current phase)

| Page | Pattern | Rationale |
|------|---------|-----------|
| `/` (Command Centre) | A → **D** | Highest-impact single change. Transforms the platform entry point from a dashboard into a command surface |
| `/war-room/p0` | Partial D → **D** (enhance) | Already has emergency treatment. Add three-column structure for mission/analysis/action separation |
| `/operating-picture/external` | A → **D** | Operating Pictures ARE command surfaces. Three-column enables simultaneous situation + analysis + action |
| `/operating-picture/internal` | A → **D** | Same rationale as external |

**Estimated effort:** 4 pages × 1 session each = 4 sessions
**Estimated score impact:** +30-40 composite points on Command surfaces

### MEDIUM-TERM CANDIDATE (next build phase)

| Page | Pattern | Rationale |
|------|---------|-----------|
| `/identity` (detail) | A → **C** | Six-section composition already exists. Add right rail for relationships, case history, risk trajectory |
| `/assets` (detail) | A → **C** | Seven-section composition exists. Add right rail for identity exposure, vulnerability state, coverage |
| `/vulnerabilities` | A → **B→C** | Browse + context on selection. Enables triage without navigation |
| `/exposure/*` (3 pages) | A → **C** | Investigation surfaces need relationship context |
| `/architecture/drift` | A → **C** | Drift + impact rail needed |
| `/search` | A → **B** | Results + context panel on selection |
| `/fusion-map/blast-radius` | A → **C** | Graph + impact panel |

**Estimated effort:** 10 pages × 1 session each = 10 sessions

### FUTURE CANDIDATE (Phase 2+)

| Page | Pattern | Rationale |
|------|---------|-----------|
| `/strategy/centre` | A → **E** | Requires effectiveness measurement data |
| `/strategy/simulation` | A → **E** | Requires simulation output data |
| `/mission/*` (3 pages) | A → **E** | Requires mission progress measurement |
| `/som/ciso` | A → **D** | Requires CISO-specific aggregation |
| `/som/security-operations` | A → **D** | Requires SOM workload data |
| `/ciso` | A → **D** | Requires executive aggregation |

**Estimated effort:** 8 pages × 1 session each = 8 sessions

### NOT RECOMMENDED

| Pages | Count | Reason |
|-------|:-----:|--------|
| All `/settings/*` | 17 | Configuration surfaces — Pattern A is correct |
| All `/control-plane/*` | 13 | Operator console — Pattern A is correct |
| All Pulse pages | 9 | Single-concern health dashboards — Pattern A is correct |
| All Platform pages (non-simulation) | 10 | CRUD/management tables — Pattern A is correct |
| Reporting pages | 3 | Read-only output — Pattern A is correct |
| Governance pages (non-SOM) | 6 | Accountability surfaces — Pattern A is correct |
| `/cases` and `/cases/my` | 2 | **Hard Rule #3: inline expansion only, no split screen for case list** |
| `/cases/analytics` | 1 | Measurement surface — Pattern A is correct |
| Coverage/Tool Health | 7 | Monitoring dashboards — Pattern A is correct |

**Total NOT RECOMMENDED: 68 pages (62% of estate)**

---

## Summary

| Category | Pages | Action |
|----------|:-----:|--------|
| Already Pattern C/D | 2 | Maintain and enhance |
| IMMEDIATE conversion | 4 | Command Centre + War Room + Operating Pictures |
| MEDIUM-TERM conversion | 10 | Investigation surfaces |
| FUTURE conversion | 8 | Strategy/Mission + SOM/CISO workspaces |
| Remain Pattern A | 86 | No change needed — correct for their classification |

---

**This document is an assessment and recommendation only. It does not authorise implementation. Implementation requires owner approval and integration into the build sequence.**

---

**End of Document.**
