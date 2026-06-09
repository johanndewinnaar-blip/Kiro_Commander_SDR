# Commander SDR — UI/UX Assessment Authority

**Version:** UIAA-3.0
**Status:** Authoritative. Supersedes all prior versions (UIAA-1.0, UIAA-2.0, UIAA-2.1).
**Date:** 2026-06-09
**Authority chain:** Subordinate to AUTHORITY_MODEL.md (Tier 5). References Tiers 1–4 as assessment inputs.
**Scope:** Desktop only (per DS-1.0). Three application boundaries. All architectural layers where they surface to UI.

---

## 0. Enhancement Review — Disposition of 10 Proposed Enhancements

### Enhancement Decisions

| # | Enhancement | Decision | Rationale |
|---|------------|----------|-----------|
| 1 | Data Dictionary Conformity | **AGREE — REPLACE** | Replaces the v2.1 "Data Completeness" 6-layer model with a dedicated DATA_DICTIONARY-driven assessment. The dictionary IS the truth; the assessment should mirror its structure |
| 2 | Technical Specification Realisation | **AGREE — MERGE** | Merged into Proposition Lineage (PL). PL now explicitly validates both proposition AND technical specification realisation as a single chain dimension |
| 3 | Use Case Realisation | **AGREE — REPLACE** | Replaces simple "Use Case Coverage" (UCC). Coverage is necessary but insufficient; REALISATION asks whether the use case can be COMPLETED, not just referenced |
| 4 | Decision Support Quality | **AGREE — NEW CORE** | Commander is a decision platform. This is a missing first-class dimension. Added as core weighted |
| 5 | AI Analyst Lifecycle | **AGREE — REPLACE** | Replaces v2.1 AICL. Expanded from entry-point to 8-stage lifecycle with grounding, guardrail, and evidence assessment |
| 6 | OODA Telemetry Readiness | **AGREE — MERGE** | Merged into OODA Usability (OODU). Telemetry readiness is the measurement spine of OODA; it belongs within the OODA dimension, not beside it |
| 7 | Workflow & Automation Readiness | **AGREE — PROMOTE** | Promoted from v2.1 advisory (AO) to a formally assessed commander-specific dimension with structured scoring |
| 8 | Commander Surface Taxonomy | **AGREE — FORMALISE** | v2.1 had informal classification. Now formalised as a mandatory pre-assessment classification that influences ALL dimension weights |
| 9 | Mission & Outcome Alignment | **AGREE — NEW COMMANDER-SPECIFIC** | Expands beyond "mission readiness" to outcome attribution and strategic alignment measurement |
| 10 | Commander C2 Assessment | **MODIFY — MERGE INTO SURFACE TAXONOMY** | Rather than a separate dimension, C2 contribution (Command, Control, Coordination, Communication, Outcome) becomes the ASSESSMENT LENS for Command Surfaces. Avoid dimension inflation |

---

## 1. Commander Surface Taxonomy (Mandatory Pre-Assessment)

### 1.1 Classification

Before ANY dimension is scored, the page MUST be classified. Classification is not a dimension — it is a **structural prerequisite** that determines which dimensions apply and at what weight.

| Surface Type | Definition | Primary OODA Stage | C2 Role |
|-------------|-----------|-------------------|---------|
| **Command** | Programme-level operational awareness and tempo | All four (hub) | Command + Coordination |
| **Intelligence** | Multi-source correlation, pattern recognition, estate picture | Observe + Orient | Communication (intelligence reporting) |
| **Investigation** | Drill-into-detail, evidence, root-cause | Orient + Decide | Control (information control) |
| **Decision** | Decision presentation, approval, strategy selection | Decide | Command + Control |
| **Execution** | Action initiation, remediation, push governance | Act | Control + Coordination |
| **Governance** | Compliance, audit, reporting, accountability | All (measurement) | Outcome Measurement |
| **Strategy** | Strategic planning, mission, policy, simulation | Decide | Command |
| **Configuration** | Settings, tenant admin, baseline setup | N/A (operational support) | N/A |
| **Control Plane** | Internal Seiertech operator console | N/A (platform operations) | N/A |

### 1.2 Classification Rules

1. Every page MUST have exactly ONE primary classification
2. A page MAY have ONE secondary classification
3. Classification determines dimension weight adjustments (§1.3)
4. Classification determines cognitive ceilings, disclosure requirements, and action proximity expectations
5. Classification is recorded in the assessment BEFORE scoring begins

### 1.3 Weight Adjustments by Classification

| Dimension | Command | Intelligence | Investigation | Decision | Execution | Governance | Strategy | Config |
|-----------|:-------:|:------------:|:-------------:|:--------:|:---------:|:----------:|:--------:|:------:|
| DDC (Data Dict) | standard | +2% | +2% | standard | standard | standard | standard | standard |
| PL (Lineage) | +2% | standard | standard | standard | standard | +2% | +2% | -2% |
| UCR (Use Case) | standard | standard | standard | standard | standard | standard | standard | +2% |
| DSQ (Decision) | +3% | +2% | +2% | +3% | standard | standard | +2% | -3% |
| SAQ (Situational) | +3% | +2% | standard | +2% | standard | standard | standard | -3% |
| OODU (OODA) | +2% | +2% | standard | +2% | +2% | standard | standard | -4% |
| WAR (Workflow) | standard | standard | standard | standard | +3% | standard | standard | -3% |

(Adjustments redistribute within 100% — increases in one dimension reduce others proportionally)

---

## 2. Core Assessment Dimensions (v3.0)

### 2.1 Dimension 1: Data Dictionary Conformity (DDC) — 12%

**Replaces:** v2.1 "Data Completeness" (DC)

**Doctrine:** Commander is DATA_DICTIONARY-driven. The dictionary is truth. Every page assessment validates the dictionary chain:

```
DATA_DICTIONARY.md
    ↓ (declares entity + fields + availability + blockers)
Entity contract (packages/contracts/src/entities/*.ts)
    ↓ (implements typed fields)
Resolver (packages/contracts/src/resolvers/*.ts)
    ↓ (computes derived values)
Engine (packages/contracts/src/engines/*.ts)
    ↓ (produces intelligence outputs)
Fixture (packages/contracts/src/fixtures/seed-*.ts)
    ↓ (provides seed data)
Page (apps/web/src/app/**/page.tsx)
    ↓ (renders to user)
```

**Assessment Structure:**

| Layer | Question | Source of Truth | Score Method |
|-------|----------|----------------|-------------|
| Entity presence | Which DATA_DICTIONARY entities should appear on this page? | DOMAIN_REGISTER (page domain ownership) | entities consumed / entities expected |
| Field rendering | For each consumed entity, which AVAILABLE fields are rendered? | DATA_DICTIONARY (field-level availability) | fields rendered / fields AVAILABLE |
| Resolver surfacing | Which resolvers produce outputs this page should display? | packages/contracts/src/resolvers/ (resolver index) | resolver outputs shown / resolver outputs applicable |
| Engine surfacing | Which engine outputs should this page render? | packages/contracts/src/engines/ (engine index) | engine outputs shown / engine outputs applicable |
| Relationship rendering | Which DATA_DICTIONARY-documented relationships between entities are visible? | RELATIONSHIP_MAP.md cross-entity edges | relationships shown / relationships documented |
| Derived metrics | Which computable aggregate metrics should appear? | Posture metrics, pulse data, aggregation resolvers | metrics shown / metrics computable |
| Dictionary-to-page debt | Which DATA_DICTIONARY AVAILABLE fields have no page surface ANYWHERE in the estate? | PAGE_DATA_COVERAGE_AUDIT.md | Programme-level debt register |

**Scoring:** Weighted average of 6 layers (entity 20%, field 25%, resolver 15%, engine 15%, relationship 15%, metrics 10%)

---

### 2.2 Dimension 2: Proposition & Technical Realisation (PTR) — 10%

**Replaces:** v2.1 "Proposition Lineage" (PL) + addresses Enhancement 2

**Doctrine:** Every page must trace to BOTH the Master Proposition AND the Master Technical Specification. The assessment validates the full realisation chain:

```
Master Proposition (product category + objectives)
    ↓
Master Technical Specification (architectural capabilities)
    ↓
Baseline Child Spec(s) (domain requirements)
    ↓
Authority Documents (doctrine constraints)
    ↓
Use Case(s) (user-facing outcomes)
    ↓
Page (surface realisation)
```

**Assessment Structure:**

| Question | Source | Finding Type |
|----------|--------|-------------|
| Which proposition objectives does this page support? | Master Proposition sections | Required |
| Which MTS capabilities does this page implement? | MTS v7.0 capability list | Required |
| Is the full chain traceable without gaps? | Chain analysis | Required |
| Which proposition objectives RELEVANT to this domain are NOT surfaced? | Cross-reference prop objectives vs page content | Gap finding |
| Which MTS capabilities RELEVANT to this domain are NOT surfaced? | Cross-reference MTS vs page content | Gap finding |
| Does the page correctly represent Commander's altitude (C2, above operational tools)? | Spec #57 §4 boundary rule | CRITICAL if violated |

**Scoring:** 100 = full chain traceable + all relevant capabilities surfaced. Deductions per gap.

---

### 2.3 Dimension 3: Use Case Realisation (UCR) — 8%

**Replaces:** v2.1 "Use Case Coverage" (UCC)

**Doctrine:** Coverage asks "is the use case referenced?" Realisation asks "can the user COMPLETE the use case?"

**Assessment Structure:**

| Criterion | Assessment | Finding if NO |
|-----------|-----------|---------------|
| Can the user complete the entire use case on this page (or via clear progression)? | Workflow completeness | HIGH if fragmented without clear path |
| Are all DECISION POINTS present? | Points where user must choose/assess | HIGH if decision must be made elsewhere |
| Are all ACTION POINTS present? | Points where user must act/initiate | MEDIUM if action requires navigation |
| Is the intended OUTCOME achievable? | Can the UC's stated outcome be reached? | HIGH if outcome unreachable |
| Is the use case fragmented across multiple pages without progression? | Flow analysis | MEDIUM per fragmentation point |
| Is the delivery mode correct? (SYSTEM vs AI-ENHANCED vs AI-ONLY) | USE_CASE_REGISTER delivery mode column | CRITICAL if mode violated |

**Scoring:**

| Score | Meaning |
|-------|---------|
| 100 | All mapped use cases fully realisable from this page |
| 75 | Use cases realisable with clear 1-click progression |
| 50 | Use cases partially realisable — some decision/action points require navigation |
| 25 | Use cases referenced but not completable — fragmented |
| 0 | Use cases mapped but not implementable from this page |

---

### 2.4 Dimension 4: Decision Support Quality (DSQ) — 8%

**NEW — Enhancement 4**

**Doctrine:** Commander is a decision platform. Every operational surface either supports a decision, presents evidence for a decision, or executes the outcome of a decision. The assessment measures how well the page supports decision-making.

**Assessment Structure:**

| Criterion | Assessment Question | Command | Intelligence | Investigation | Decision | Other |
|-----------|-------------------|:-------:|:------------:|:-------------:|:--------:|:-----:|
| Decision readiness | Can a decision be made from the information on this page? | MANDATORY | MANDATORY | EXPECTED | MANDATORY | OPTIONAL |
| Evidence availability | Is the evidence required for the decision VISIBLE (not hidden behind navigation)? | MANDATORY | MANDATORY | MANDATORY | MANDATORY | N/A |
| Confidence indicators | Does the page show confidence/certainty of the data? (source, freshness, derivation) | EXPECTED | EXPECTED | MANDATORY | MANDATORY | OPTIONAL |
| Supporting context | Is relevant cross-domain context visible? (relationships, history, trajectory) | EXPECTED | MANDATORY | MANDATORY | EXPECTED | OPTIONAL |
| Recommended actions | Does the page present or enable recommended actions? | EXPECTED | OPTIONAL | EXPECTED | MANDATORY | OPTIONAL |
| Dependency visibility | Can the user see what depends on this decision? (downstream impact, blast radius) | EXPECTED | EXPECTED | EXPECTED | MANDATORY | OPTIONAL |
| Justifiability | Can the decision be justified (audit trail, evidence chain, reasoning visible)? | EXPECTED | N/A | MANDATORY | MANDATORY | OPTIONAL |
| Defendability | Can the decision be defended to a third party? (exportable, traceable) | OPTIONAL | N/A | EXPECTED | EXPECTED | OPTIONAL |

**Scoring:**

- MANDATORY criterion absent = -15 per criterion
- EXPECTED criterion absent = -8 per criterion
- OPTIONAL criterion absent = no deduction
- Base score: 100, deductions applied

---

### 2.5 Dimension 5: Situational Awareness Quality (SAQ) — 8%

**Retained from v2.1 §18.** No changes.

Assessment criteria: Glanceability, Delta Visibility, Attention Direction, Trajectory Awareness, Anomaly Salience, Spatial Priority.

---

### 2.6 Dimension 6: OODA Usability & Telemetry (OODU) — 8%

**Expanded from v2.1 — incorporates Enhancement 6 (OODA Telemetry)**

**Assessment Structure (two sub-sections):**

#### 6A — OODA Usability (retained from v2.1 §6)

| Check | Assessment |
|-------|-----------|
| Stages supported (Observe/Orient/Decide/Act) | Which stages are accessible from this page? |
| Stages blocked | Where must the user navigate away? |
| Progression enabled | Can user move between stages? |
| Loop representation | Is OODA visually a LOOP (not 4 independent items)? |
| Friction points | Where does OODA flow break? |

#### 6B — OODA Telemetry Readiness (NEW — Enhancement 6)

| Check | Assessment |
|-------|-----------|
| Can this page emit Observe checkpoint? | "User observed estate state at [timestamp]" |
| Can this page emit Orient checkpoint? | "User oriented on [entity/domain] at [timestamp]" |
| Can this page emit Decide checkpoint? | "Decision made: [action] at [timestamp]" |
| Can this page emit Act checkpoint? | "Action initiated: [type] at [timestamp]" |
| Can this page emit Validation checkpoint? | "Outcome validated at [timestamp]" |
| Can this page contribute to Tempo measurement? | Time between checkpoints = tempo |
| Can this page identify Delay? | Time spent without progression |
| Can this page identify Drag? | Repeated visits without advancement |
| Can this page identify Rework? | Return to earlier phase |
| Can this page identify Automation opportunity? | Steps that follow deterministic patterns |

**Scoring:** OODA Usability (60% weight) + Telemetry Readiness (40% weight)

---

### 2.7 Dimension 7: Design System Conformity (DSC) — 8%

**Retained from v2.1.** Includes token governance, component usage, typography, spacing, mode support. No changes.

---

### 2.8 Dimension 8: Cognitive Usability (CU) — 7%

**Retained from v2.1 (expanded).** Includes cognitive load ceiling, progressive disclosure (4 levels), action proximity (0-5), temporal awareness. No structural changes.

---

### 2.9 Dimension 9: System-First Adherence (SFA) — 7%

**Retained from v2.1 §3.** Includes SFD-1.0 delivery mode, data-first/function-first/UI-last, Build-Readiness Gate (Spec #41 §11). No changes.

---

### 2.10 Dimension 10: RBAC & Boundary (RBAC) — 4%

**Retained from v2.1.** Role access, cross-boundary isolation, tenant isolation. No changes.

---

### 2.11 Dimension 11: Cross-Domain Relationships (CDRR) — 7%

**Retained from v2.1.** Relationship rendering vs RELATIONSHIP_MAP.md documented flows. No changes.

---

### 2.12 Dimension 12: Navigation & Continuity (NC) — 5%

**Retained from v2.1.** Includes spatial consistency, state continuity, drill-path completeness. No changes.

---

### 2.13 Dimension 13: Role Experience (RE) — 4%

**Retained from v2.1 §11.** Role-specific cognitive needs, audience-appropriate content. No changes.

---

### 2.14 Dimension 14: Closed-Loop Contribution (CLC) — 4%

**Retained from v2.1 §8.** Loop position, progression enablement. No changes.

---

### Core Dimension Summary (v3.0)

| # | Dimension | Code | Base Weight |
|---|-----------|------|-------------|
| 1 | Data Dictionary Conformity | DDC | 12% |
| 2 | Proposition & Technical Realisation | PTR | 10% |
| 3 | Use Case Realisation | UCR | 8% |
| 4 | Decision Support Quality | DSQ | 8% |
| 5 | Situational Awareness Quality | SAQ | 8% |
| 6 | OODA Usability & Telemetry | OODU | 8% |
| 7 | Design System Conformity | DSC | 8% |
| 8 | Cognitive Usability | CU | 7% |
| 9 | System-First Adherence | SFA | 7% |
| 10 | RBAC & Boundary | RBAC | 4% |
| 11 | Cross-Domain Relationships | CDRR | 7% |
| 12 | Navigation & Continuity | NC | 5% |
| 13 | Role Experience | RE | 4% |
| 14 | Closed-Loop Contribution | CLC | 4% |
| | | | **100%** |

---

## 3. Commander-Specific Dimensions (v3.0)

### 3.1 AI Analyst Lifecycle (AIAL) — REPLACED (Enhancement 5)

**Replaces v2.1 AICL.** Full 8-stage lifecycle assessment:

| Stage | Assessment | Evidence Required |
|-------|-----------|------------------|
| 1. AI Orientation | Can Commander AI orient the user on this page's content? | AICAP marker or natural entry point |
| 2. AI Correlation | Can Commander AI correlate entities/events visible on this page? | Cross-entity data available in grounding corpus |
| 3. AI Investigation | Can Commander AI help investigate anomalies shown? | Entity detail accessible + relevant context |
| 4. AI Recommendation | Can Commander AI recommend next actions based on page state? | Decision context + action options identifiable |
| 5. AI Decision Support | Can Commander AI provide decision rationale/confidence? | Strategy context + evidence chain available |
| 6. AI Action Preparation | Can Commander AI draft communications/remediation from here? | Templates + entity references + recipient context |
| 7. AI Outcome Validation | Can Commander AI assess whether actions succeeded? | Before/after state measurable |
| 8. AI Learning | Does this page generate data that improves Commander AI? | Knowledge export eligibility + telemetry emission |

**Additional checks:**

| Check | Source |
|-------|--------|
| Entities on page in GroundingCorpus? | commander-ai-core.ts |
| Refusal scenarios identified? | Ungrounded references |
| AI output traceable (groundedIn visible)? | Spec #13 |
| Guardrails appropriate? | SFD-1.0 delivery mode |
| AWS Bedrock invisible to customer? | Hard rule #7 |

**Scoring:** Stages ready / stages applicable × 100

---

### 3.2 Workflow & Automation Readiness (WAR) — PROMOTED (Enhancement 7)

**Promoted from v2.1 advisory (AO).** Now formally assessed with structured scoring:

| Level | Assessment |
|-------|-----------|
| L0 — No automation | Page is purely informational (read-only display) |
| L1 — Manual actions present | User performs actions that COULD be automated |
| L2 — Workflow candidates identified | Repeatable multi-step patterns exist |
| L3 — Approval integration | Human-confirms automation possible (strategy-governed) |
| L4 — Push governance ready | Actions could trigger governed pushes to external systems |
| L5 — Autonomous candidate | Strategy-governed actions requiring no human intervention |
| L6 — Orchestration ready | Multi-entity, multi-step workflows spanning systems |

**Additional assessment:**

| Check | Question |
|-------|----------|
| Remediation hopper readiness | Could this page contribute to a batch remediation workflow? |
| Bundle readiness | Could multiple actions from this page be bundled? |
| Connector-driven execution | Could actions trigger connector-level operations? |
| Rollback capability | If automated action fails, is undo/rollback structurally possible? |

---

### 3.3 Mission & Outcome Alignment (MOA) — NEW (Enhancement 9)

| Assessment | Question |
|-----------|----------|
| Mission alignment | Does this page show which mission(s) the displayed work supports? |
| Objective alignment | Are specific mission objectives linked to entities on this page? |
| Strategic priority alignment | Does content reflect strategic priority ordering? |
| Outcome attribution | Can work shown here be attributed to a measurable outcome? |
| Exposure reduction attribution | Can security posture improvement be measured from actions here? |
| Lifecycle savings | Can time/effort savings be quantified from automation on this page? |
| Contribution measurability | Is the contribution of this page to programme outcomes measurable? |

**Scoring:**

| Score | Meaning |
|-------|---------|
| 0 | No mission/outcome connection (admin/config surface) |
| 25 | Entities exist that COULD be mission-aligned but alignment not shown |
| 50 | Mission context available, partially rendered |
| 75 | Mission alignment visible, outcome attribution partially measurable |
| 100 | Full mission alignment with measurable contribution to strategic objectives |

---

### 3.4 Visual Intensity & Mission Mode (VIM)

**Merges v2.1 VIC + MMR into single dimension.**

Assesses BOTH intensity ceiling adherence AND Mission mode operational posture differentiation as a single concern (they are the same axis: operational intensity).

---

### 3.5 Edge State Resilience (ESR)

**Retained from v2.1 §23.** 7 mandatory edge scenarios. No changes.

---

### 3.6 Strategy Consumption (SCC)

**Retained from v2.1.** Strategy-sourced values, policy attribution, no hardcoded fallbacks. No changes.

---

### 3.7 Journey Intelligence (JI)

**Retained from v2.1 §7.** Entry/exit flows, checkpoints, measurements. Now incorporates OODA telemetry emission points as part of JI checkpoint definition.

---

### 3.8 Posture Classification Rendering (PCR) — NEW (Secure by Design)

**Doctrine:** Commander classifies every entity in the estate as one of three posture states. This is a CORE Commander concept — not future capability. The engines and data model are BUILT:

| Posture State | Commander Term | Meaning | Engine Logic |
|--------------|---------------|---------|--------------|
| **Secure by Design** | PROTECTED | Configured correctly, controls in place, validated, no known weaknesses, posture data current | `classifyPostureState()` → no drift, no gaps, no exposure, entity resolved, data fresh |
| **Drift** | PRE_WARNED | Was secure, has drifted — known unaddressed weaknesses exist | `classifyPostureState()` → `totalWeaknesses > 0` |
| **Not Secure by Design** | NOVEL | Never configured to standard — entity unresolved, posture data stale, no baseline | `classifyPostureState()` → entity unresolved OR posture not current |

**Available infrastructure:**
- Engine: `posture-accountability-engine.ts` (full classification, transitions, escalation, time-in-state)
- Engine: `temporal-posture-lookup-engine.ts` (evaluatePreWarned, evaluateProtected, evaluateNovel)
- Entity: `posture-accountability.ts`
- Entity: `architecture-component.ts` (driftState: compliant / minor_drift / major_drift / unknown)
- Fixtures: `seed-posture-accountability.ts`, `seed-attack-classification-audits.ts`

**Assessment Structure:**

| Criterion | Assessment Question | Finding if absent |
|-----------|-------------------|-------------------|
| Posture classification visible | Does this page show PROTECTED / PRE_WARNED / NOVEL status for displayed entities? | HIGH — fundamental Commander concept missing |
| Classification sourced from engine | Is the classification from `posture-accountability-engine`, not hardcoded? | MEDIUM |
| Time-in-state visible | Can the user see how long an entity has been in its current posture state? | MEDIUM (escalation awareness) |
| Transition visibility | Can the user see WHEN and WHY classification changed? | LOW |
| Escalation flagging | Are entities exceeding escalation threshold highlighted? | MEDIUM |
| Estate posture distribution | Does the page show % PROTECTED / % PRE_WARNED / % NOVEL for the domain? | HIGH for Command surfaces, MEDIUM for Intelligence |

**Scoring:**

| Score | Meaning |
|-------|---------|
| 0 | No posture classification on page (entities shown without posture context) |
| 25 | driftState field rendered but not mapped to PROTECTED/PRE_WARNED/NOVEL taxonomy |
| 50 | Classification visible for some entities but not all; no distribution summary |
| 75 | Classification visible for all entities + estate distribution shown |
| 100 | Full posture accountability: classification + time-in-state + transitions + escalation |

**Applicability:** ALL pages rendering assets, identities, architecture components, or estate-level summaries. MANDATORY for Command and Intelligence surfaces. Advisory for Configuration/Control Plane.

---

### 3.9 Future Capability Readiness (FCR)

**Retained from v2.1 §12.** 7 intelligence domain readiness scores (Secure by Design elevated to PCR above; removed from FCR advisory list). Advisory.

---

### Commander-Specific Dimension Summary (v3.0)

| # | Dimension | Code | Status |
|---|-----------|------|--------|
| 15 | AI Analyst Lifecycle | AIAL | Assessed (scored) |
| 16 | Workflow & Automation Readiness | WAR | Assessed (scored) |
| 17 | Mission & Outcome Alignment | MOA | Assessed (scored) |
| 18 | Visual Intensity & Mission Mode | VIM | Assessed (scored) |
| 19 | Edge State Resilience | ESR | Assessed (scored) |
| 20 | Strategy Consumption | SCC | Assessed (scored) |
| 21 | Journey Intelligence | JI | Assessed (scored) |
| 22 | **Posture Classification Rendering** | **PCR** | **Assessed (scored)** |
| 23 | Future Capability Readiness | FCR | Advisory |

---

## 4. Programme-Level Dimensions (v3.0)

| # | Dimension | Code |
|---|-----------|------|
| 23 | Proposition Coverage | PC |
| 24 | Technical Specification Coverage | TSC |
| 25 | DATA_DICTIONARY Estate Coverage | DDEC |
| 26 | Estate OODA Completeness | EOC |
| 27 | Cross-Domain Flow Completeness | CDFC |
| 28 | AI Surface Readiness | ASR |
| 29 | Navigation Estate Coherence | NEC |
| 30 | Spatial Consistency | SC |
| 31 | Rationalisation Register | RR |
| 32 | Assessment Health | AH |
| 33 | C2 Capability Coverage | C2C |

---

## 5. Updated Review Output Template (v3.0 Additions)

Every page review SHALL include the following sections (in addition to v2.1 retained outputs):

```
SURFACE CLASSIFICATION (mandatory — before any scoring)
────────────────────────────────────────────────────────
Primary: [Command | Intelligence | Investigation | Decision | Execution | Governance | Strategy | Configuration | Control Plane]
Secondary: [optional]
C2 Role: [Command | Control | Coordination | Communication | Outcome Measurement | N/A]
Weight Adjustments Applied: [list]

DATA DICTIONARY CONFORMITY (DDC)
────────────────────────────────
Dictionary entities applicable: [count]
Dictionary entities consumed: [count / coverage %]
Dictionary fields applicable: [count across consumed entities]
Dictionary fields rendered: [count / coverage %]
Resolvers applicable: [count]
Resolvers surfaced: [count / coverage %]
Engines applicable: [count]
Engines surfaced: [count / coverage %]
Relationships documented: [count]
Relationships rendered: [count / coverage %]
Derived metrics computable: [count]
Derived metrics shown: [count / coverage %]
DDC Score: [0-100]

PROPOSITION & TECHNICAL REALISATION (PTR)
─────────────────────────────────────────
Proposition objectives supported: [list]
MTS capabilities implemented: [list]
Chain fully traceable: [YES/NO]
Relevant proposition gaps: [list]
Relevant MTS gaps: [list]
Altitude violation: [YES/NO]
PTR Score: [0-100]

USE CASE REALISATION (UCR)
──────────────────────────
Use cases mapped: [UC-XXX list]
Fully realisable: [count / %]
Decision points present: [count present / count required]
Action points present: [count present / count required]
Fragmentation: [none | partial | severe]
Delivery mode correct: [YES/NO per UC]
UCR Score: [0-100]

DECISION SUPPORT QUALITY (DSQ)
──────────────────────────────
Decision readiness: [YES / PARTIAL / NO]
Evidence available: [YES / PARTIAL / NO]
Confidence indicators: [YES / PARTIAL / NO]
Supporting context: [YES / PARTIAL / NO]
Recommended actions: [YES / PARTIAL / NO]
Dependency visibility: [YES / PARTIAL / NO]
Justifiability: [YES / PARTIAL / NO]
Defendability: [YES / PARTIAL / NO]
DSQ Score: [0-100]

OODA TELEMETRY READINESS (within OODU)
──────────────────────────────────────
Observe checkpoint emittable: [YES/NO]
Orient checkpoint emittable: [YES/NO]
Decide checkpoint emittable: [YES/NO]
Act checkpoint emittable: [YES/NO]
Tempo measurable: [YES/NO]
Delay detectable: [YES/NO]
Drag detectable: [YES/NO]
Rework detectable: [YES/NO]
Telemetry readiness: [X/8 checkpoints possible]

AI ANALYST LIFECYCLE (AIAL)
───────────────────────────
Stage 1 — Orientation: [ready / not ready / N/A]
Stage 2 — Correlation: [ready / not ready / N/A]
Stage 3 — Investigation: [ready / not ready / N/A]
Stage 4 — Recommendation: [ready / not ready / N/A]
Stage 5 — Decision Support: [ready / not ready / N/A]
Stage 6 — Action Preparation: [ready / not ready / N/A]
Stage 7 — Outcome Validation: [ready / not ready / N/A]
Stage 8 — Learning: [ready / not ready / N/A]
Grounding corpus coverage: [entities on page in corpus / total]
Guardrails appropriate: [YES/NO]
AIAL Score: [0-100]

WORKFLOW & AUTOMATION READINESS (WAR)
─────────────────────────────────────
Automation level: [L0-L6]
Remediation hopper candidate: [YES/NO]
Bundle candidate: [YES/NO]
Connector execution candidate: [YES/NO]
Rollback structurally possible: [YES/NO]
WAR Score: [0-100]

MISSION & OUTCOME ALIGNMENT (MOA)
─────────────────────────────────
Mission alignment shown: [YES / PARTIAL / NO]
Objective linking: [YES / PARTIAL / NO]
Outcome attribution possible: [YES / PARTIAL / NO]
Contribution measurable: [YES / PARTIAL / NO]
MOA Score: [0-100]

POSTURE CLASSIFICATION RENDERING (PCR)
──────────────────────────────────────
Entities on page with posture applicability: [count]
Entities showing PROTECTED/PRE_WARNED/NOVEL classification: [count / %]
Classification sourced from engine (not hardcoded): [YES/NO]
Time-in-state visible: [YES/NO]
Transition visibility: [YES/NO]
Escalation flagging: [YES/NO]
Estate posture distribution shown: [YES/NO]
PCR Score: [0-100]

COMMANDER C2 CONTRIBUTION
─────────────────────────
Command contribution: [how this page supports command decisions]
Control contribution: [how this page enables control actions]
Coordination contribution: [how this page supports multi-party coordination]
Communication contribution: [how this page facilitates communication]
Outcome contribution: [how this page measures outcomes]
```

---

## 6. Scoring Summary (v3.0)

### Final Dimension Count

| Category | v2.1 | v3.0 | Change |
|----------|------|------|--------|
| Core (weighted) | 15 | **14** | Consolidated (merged PL+TSR→PTR, UCC→UCR, added DSQ, merged TA into CU) |
| Commander-Specific | 12 | **9** | Consolidated + PCR elevated from FCR advisory |
| Programme-Level | 9 | **11** | Added DDEC, C2C |
| **Total** | **36** | **34** | Fewer but deeper — PCR elevated from advisory to scored |

### Design Philosophy (v3.0 vs v2.1)

| Principle | Implementation |
|-----------|---------------|
| Fewer dimensions, deeper assessment | 33 vs 36 — but each dimension is more rigorous |
| REALISATION over COVERAGE | UCR replaces UCC — completability, not just presence |
| DICTIONARY as primary truth | DDC centres the entire data assessment on DATA_DICTIONARY lineage |
| DECISION as first-class concern | DSQ added as core — Commander's reason for existing |
| TELEMETRY embedded, not separate | OODA telemetry merged into OODU rather than standalone |
| CLASSIFICATION drives weighting | Surface taxonomy adjusts all dimension weights contextually |
| C2 as lens, not dimension | C2 contribution assessed as context within Command Surface reviews |

---

## 7. UIAA Self-Governance (retained from v2.1)

### Version Triggers for v4.0

| Trigger | Action |
|---------|--------|
| Journey Intelligence fully activated | Promote JI to core weighted |
| Commander AI Phase 2 launches | Promote AIAL to core weighted |
| 20+ pages reviewed under v3.0 | Recalibrate all band thresholds |
| Automation Phase 2 launches | Promote WAR to core weighted |
| New baseline spec #76+ | Review PTR and DDC for gaps |
| Assessment produces no differentiation on any dimension | Retire or recalibrate that dimension |

---

## 8. Migration from v2.1 → v3.0

| v2.1 Dimension | v3.0 Disposition |
|---------------|-----------------|
| DC (Data Completeness) | → **DDC (Data Dictionary Conformity)** — dictionary-driven, not generic |
| PL (Proposition Lineage) | → **PTR (Proposition & Technical Realisation)** — merged with Enhancement 2 |
| UCC (Use Case Coverage) | → **UCR (Use Case Realisation)** — completability, not just coverage |
| SAQ (Situational Awareness) | Retained |
| DSC (Design System) | Retained |
| CU (Cognitive Usability) | Retained (absorbs TA from v2.1) |
| SFA (System-First) | Retained |
| OODU (OODA Usability) | Retained + expanded with telemetry readiness |
| RBAC | Retained |
| CDRR (Cross-Domain) | Retained |
| NC (Navigation) | Retained |
| RE (Role Experience) | Retained |
| CLC (Closed-Loop) | Retained |
| TA (Temporal Awareness) | Merged into CU (sub-criterion) |
| AA (Authority Alignment) | Merged into PTR (authority is part of realisation chain) |
| AICL (AI Lifecycle) | → **AIAL (AI Analyst Lifecycle)** — 8-stage replacement |
| AO (Automation) | → **WAR (Workflow & Automation Readiness)** — promoted, structured |
| VIC + MMR | → **VIM (Visual Intensity & Mission Mode)** — merged single dimension |
| — | **NEW: DSQ (Decision Support Quality)** |
| — | **NEW: MOA (Mission & Outcome Alignment)** |

---

## Appendix A — Complete Assessment Execution Checklist (v3.0)

```
PRE-ASSESSMENT
□ Classify page (Surface Taxonomy §1)
□ Apply weight adjustments (§1.3)
□ Identify applicable Commander-specific dimensions

CORE ASSESSMENT (14 dimensions)
□ DDC — Data Dictionary Conformity (6-layer chain)
□ PTR — Proposition & Technical Realisation (full chain)
□ UCR — Use Case Realisation (completability)
□ DSQ — Decision Support Quality (8 criteria)
□ SAQ — Situational Awareness Quality (6 criteria)
□ OODU — OODA Usability + Telemetry (5+10 checks)
□ DSC — Design System Conformity (tokens, components, layout)
□ CU — Cognitive Usability (ceiling + disclosure + proximity + temporal)
□ SFA — System-First Adherence (delivery mode + gate)
□ RBAC — Role & Boundary (access + isolation)
□ CDRR — Cross-Domain Relationships (documented vs rendered)
□ NC — Navigation & Continuity (spatial + state)
□ RE — Role Experience (audience-specific quality)
□ CLC — Closed-Loop Contribution (loop position + progression)

COMMANDER-SPECIFIC (9 dimensions, where applicable)
□ AIAL — AI Analyst Lifecycle (8 stages + grounding)
□ WAR — Workflow & Automation Readiness (L0-L6)
□ MOA — Mission & Outcome Alignment (7 criteria)
□ VIM — Visual Intensity & Mission Mode (ceiling + posture)
□ ESR — Edge State Resilience (7 scenarios)
□ SCC — Strategy Consumption (sourcing + attribution)
□ JI — Journey Intelligence (entry/exit/checkpoints)
□ PCR — Posture Classification Rendering (PROTECTED/PRE_WARNED/NOVEL)
□ FCR — Future Capability Readiness (7 domains, advisory)

POST-ASSESSMENT
□ Compute weighted composite
□ Compute commander-specific average
□ Assign band and review status
□ Document findings by severity
□ Produce remediation priority
□ Record C2 contribution assessment
```

---

**End of Document.**
