# Commander SDR — UI/UX Assessment Authority

**Version:** UIAA-2.0
**Status:** Authoritative. Supersedes UIAA-1.0. Governs all future page-level, group-level, and programme-level UI/UX and operational conformity reviews.
**Date:** 2026-06-09
**Supersedes:** UI_UX_ASSESSMENT_AUTHORITY.md (UIAA-1.0)
**Authority chain:** Subordinate to AUTHORITY_MODEL.md (Tier 5). References Tiers 1–4 as assessment inputs.
**Scope:** Desktop only (per DS-1.0). Three application boundaries. All architectural layers where they surface to UI.

---

## 0. Version 2.0 — Expansion Rationale

UIAA-1.0 was application-centric: it assessed pages against components, data, and layout.

UIAA-2.0 expands the framework to assess Commander as a **Cyber Command Platform**. The assessment now validates:

- Proposition-to-page lineage (not just use-case alignment)
- System-First Doctrine adherence (not just rendered data)
- Full data dictionary depth (entities + fields + resolvers + engines + relationships + derived metrics)
- AI Analyst opportunity across the full AI lifecycle (not just AICAP markers)
- OODA usability and actionability (not just data rendering)
- Journey Intelligence checkpoint and flow assessment
- Closed-loop operational contribution
- Automation and orchestration opportunity
- Command Platform surface classification
- Role-specific cognitive experience
- Future capability readiness across 8 intelligence domains

---

## 1. Authority Chain (Complete)

### 1.1 Mandatory Assessment Inputs

Every page review SHALL reference the following authority artefacts. UIAA-1.0 referenced a subset; UIAA-2.0 mandates the complete chain.

#### Tier 1 — Baseline Authority

| Artefact | Assessment Role |
|----------|----------------|
| Master Proposition (v5.0) | Validates page supports proposition objectives |
| Master Technical Specification (v7.0) | Validates page implements technical capabilities |
| Baseline Child Specs #01–#75 | Domain-specific requirement validation |

#### Tier 2 — Knowledge & Domain Authorities

| Artefact | Assessment Role |
|----------|----------------|
| SYSTEM_KNOWLEDGE_GRAPH.md | Architectural layer validation — does the page consume from the correct layer? |
| DOMAIN_REGISTER.md (47 domains) | Domain ownership — is the page rendering the correct domain's data? |
| RELATIONSHIP_MAP.md | Cross-domain relationship rendering — are documented flows visible? |
| DATA_DICTIONARY.md | Field-level coverage — every AVAILABLE field assessed |
| GOVERNANCE_KNOWLEDGE_SOURCE.md | Build governance chain adherence |
| JOURNEY_INTELLIGENCE.md (JI-1.0) | Journey checkpoint and flow measurement |

#### Tier 3 — Operational Authorities

| Artefact | Assessment Role |
|----------|----------------|
| PAGE_SCHEDULE.md | Route registration, status, use case linkage |
| USE_CASE_REGISTER.md | Use case coverage and delivery mode verification |
| AICAP_REGISTER.md | AI enhancement marker conformity |
| PAGE_DATA_COVERAGE_AUDIT.md | Field-level rendering verification (mechanical) |
| CHAIN_COMPLIANCE_AUDIT.md | Relationship rendering debt identification |
| SPEC_GAP_AUDIT.md | Spec requirement coverage verification |
| SPEC_COVERAGE_MATRIX.md | Baseline-to-Kiro spec traceability |

#### Tier 4 — Design & Doctrine Authorities

| Artefact | Assessment Role |
|----------|----------------|
| DESIGN_SYSTEM.md (DS-1.0) | Token, component, layout conformity |
| Spec #41 (Military Intelligence UI Doctrine) | Intensity ceiling, geometry, colour doctrine, build-readiness gate |
| PERFORMANCE_DOCTRINE.md (PD-1.0) | Performance scorecard |
| TEST_AND_TOLERANCE_FRAMEWORK.md (TTF-1.0) | Scoring methodology |
| System-First Doctrine (SFD-1.0) | Delivery mode adherence |
| AI Grounding Rules (commander-ai-core.ts) | AI boundary enforcement |

#### Tier 5 — Technical Authorities

| Artefact | Assessment Role |
|----------|----------------|
| packages/contracts/src/entities/ | Entity availability verification |
| packages/contracts/src/engines/ | Engine output surfacing verification |
| packages/contracts/src/resolvers/ | Resolver output surfacing verification |
| packages/contracts/src/fixtures/ | Seed data availability |
| packages/contracts/src/knowledge/ | Knowledge export eligibility |
| packages/ui/src/components/ | Component usage verification |
| packages/ui/src/tokens/ | Token layer governance |
| apps/web/src/registry/nav-groups.ts | Navigation truth |

### 1.2 Authority Chain Gaps Identified (vs UIAA-1.0)

| Missing from v1.0 | Now Included in v2.0 | Challenge Addressed |
|-------------------|---------------------|---------------------|
| Master Proposition | Tier 1 | Challenge 2 |
| Master Technical Specification | Tier 1 | Challenge 2 |
| PAGE_DATA_COVERAGE_AUDIT | Tier 3 | Challenge 4 |
| CHAIN_COMPLIANCE_AUDIT | Tier 3 | Challenge 1 |
| SPEC_GAP_AUDIT | Tier 3 | Challenge 1 |
| SPEC_COVERAGE_MATRIX | Tier 3 | Challenge 2 |
| System-First Doctrine (SFD-1.0) | Tier 4 | Challenge 3 |
| AI Grounding Rules | Tier 4 | Challenge 5 |
| Spec #41 §11 Build-Readiness Gate | Tier 4 | Challenge 3 |
| packages/contracts/src/engines/ | Tier 5 | Challenge 3, 4 |
| packages/contracts/src/resolvers/ | Tier 5 | Challenge 4 |
| packages/contracts/src/knowledge/ | Tier 5 | Challenge 5 |

---

## 2. Proposition-to-Page Lineage (NEW — Challenge 2)

### 2.1 Mandatory Lineage Validation

Every page review SHALL now validate the complete lineage chain:

```
Master Proposition (category position, product boundaries)
    ↓
Master Technical Specification (architectural capability)
    ↓
Baseline Child Spec(s) (domain requirements)
    ↓
Authority Documents (doctrine, design system, governance)
    ↓
Use Case(s) (UC-XXX with delivery mode)
    ↓
Domain(s) (D-XX from DOMAIN_REGISTER)
    ↓
Entity/Engine/Resolver (data layer)
    ↓
Page (surface layer)
```

### 2.2 Proposition Assessment Questions

For every BUILT page, the review SHALL answer:

| Question | Source | Finding if absent |
|----------|--------|-------------------|
| Which proposition objective(s) does this page support? | Master Proposition | HIGH — page may be unjustified |
| Which technical-spec capability(ies) does this page implement? | MTS v7.0 | HIGH — capability not surfaced |
| Which proposition capabilities are NOT surfaced anywhere in the estate? | Cross-page analysis | PROGRAMME-LEVEL finding |
| Which technical-spec capabilities have no page surface? | SPEC_GAP_AUDIT | PROGRAMME-LEVEL finding |
| Does the page correctly represent Commander's category position (Security C2, above operational tools)? | Spec #57 | CRITICAL — altitude violation if page behaves like an operational tool |

### 2.3 Lineage Dimension (new assessment dimension)

**Dimension: Proposition Lineage (PL)**
- Weight: 10% (core dimension)
- Scoring: % of lineage chain nodes that can be traced from page back to proposition
- Green: Full chain traceable (proposition → spec → authority → UC → domain → entity → page)
- Red: Page exists without traceable proposition justification

---

## 3. System-First Doctrine Assessment (NEW — Challenge 3)

### 3.1 SFD-1.0 Review Requirements

Every page review SHALL now assess System-First Doctrine adherence:

| Check | Expected | Finding if violated |
|-------|----------|---------------------|
| Does the page display SYSTEM-delivered outputs as primary content? | ~87% of rendered information should be deterministic, rule-driven, system-owned | HIGH — AI or manual content dominates |
| Does the page explain system decisions rather than replace them? | UI explains routing rationale, SLA computation, priority assignment — it doesn't override them | CRITICAL — manual override of system decision |
| Are AI-ENHANCED elements clearly marked as enhancement (not replacement)? | AI adds explanation on top of system output; system output visible without AI | MEDIUM — AI output presented as primary |
| Are AI-ONLY capabilities correctly limited to NL generation? | Only "explain this", summarise, draft — never security decisions | CRITICAL — AI making security decisions |
| Does the page consume from the correct architectural layer? | 7-layer strict hierarchy: Connector→Normalisation→Engine→Intelligence→Case→OODA→Surface | HIGH — cross-layer shortcut |

### 3.2 Data-First / Function-First / UI-Last Assessment

Reviews SHALL validate the build discipline manifests in the page:

| Principle | Assessment Question | Authority |
|-----------|--------------------|-----------| 
| Data-first | Does an entity/fixture exist for every data point rendered? | REBASELINED_BUILD_SEQUENCE §1 |
| Function-first | Does an engine/resolver exist for every computed value shown? | Build Sequence §5 |
| UI-last | Does the page only render data that has been through the full pipeline (entity → engine → fixture)? | Build Sequence §6 |
| No-hardcoded-values | Are ALL thresholds, targets, and configuration values sourced from strategy? | Build Sequence §4 |

### 3.3 Build-Readiness Gate Assessment (Spec #41 §11)

Every page SHALL be assessed against the Spec #41 §11 Build-Readiness Gate:

| Gate Item | Assessment | Finding if absent |
|-----------|-----------|-------------------|
| Application surface declared | Which of the 3 boundaries? | MEDIUM |
| User role declared | Which RBAC role(s)? | MEDIUM |
| Intensity level declared | Level 1/2/3? | MEDIUM |
| Data objects declared | Which entities consumed? | HIGH |
| Lifecycle state bindings | Which case lifecycle states are relevant? | MEDIUM |
| Routing bindings | Does the page show routing context? | LOW |
| Validation bindings | Does the page show validation state? | LOW |
| Strategy bindings | Which strategy surfaces are consumed? | HIGH |
| Fusion Map bindings | Can entities on this page appear in Fusion Map? | LOW |
| P0 behaviour | What happens to this page under P0 conditions? | MEDIUM |
| Accessibility constraints | Are accessibility requirements met? | MEDIUM |

### 3.4 SFD Dimension (new assessment dimension)

**Dimension: System-First Adherence (SFA)**
- Weight: 10% (core dimension)
- Scoring: Composite of SFD checks from §3.1 + §3.2 + §3.3
- Green: Full SFD adherence — all system outputs rendered, no hardcoded values, build-readiness gate satisfied
- Red: Manual overrides, hardcoded values, cross-layer shortcuts, or AI presented as primary

---

## 4. Data Dictionary Assessment — Deep (EXPANDED — Challenge 4)

### 4.1 Six-Layer Data Assessment

UIAA-1.0 assessed "data completeness" (fields rendered vs available). UIAA-2.0 expands to **six layers**:

| Layer | What is assessed | Source |
|-------|-----------------|--------|
| 1. Entity coverage | Which entities does the page consume vs which SHOULD it consume (per domain ownership)? | DOMAIN_REGISTER.md |
| 2. Field coverage | Which fields are rendered vs AVAILABLE per DATA_DICTIONARY.md? | DATA_DICTIONARY.md, PAGE_DATA_COVERAGE_AUDIT.md |
| 3. Resolver coverage | Which system-computed values exist (resolvers) that this page should surface? | packages/contracts/src/resolvers/ |
| 4. Engine coverage | Which engine outputs exist that this page should display? | packages/contracts/src/engines/ |
| 5. Relationship coverage | Which cross-entity relationships are documented that this page should render? | RELATIONSHIP_MAP.md, CHAIN_COMPLIANCE_AUDIT.md |
| 6. Derived metric coverage | Which posture/aggregate metrics exist that should appear here? | seed-posture-metrics.ts, pulse fixtures |

### 4.2 Data Depth Scoring

| Layer | Weight in DC dimension | Assessment |
|-------|----------------------|------------|
| Entity coverage | 25% | Entities consumed / entities that SHOULD be consumed (per domain) |
| Field coverage | 25% | Fields rendered / fields AVAILABLE (per DATA_DICTIONARY) |
| Resolver coverage | 15% | Resolver outputs surfaced / resolver outputs available |
| Engine coverage | 15% | Engine outputs rendered / engine outputs available |
| Relationship coverage | 10% | Relationships rendered / relationships documented |
| Derived metric coverage | 10% | Metrics shown / metrics available |

### 4.3 Future-Readiness Assessment (within data layer)

| Question | Assessment |
|----------|-----------|
| Are dormant fields (FUTURE in DATA_DICTIONARY) acknowledged in the page's data model? | Does the page import the entity interface correctly (allowing future fields)? |
| Are connector-derived fields handled gracefully when absent? | Does the page show "awaiting connector integration" or silently omit? |
| Are integration-derived fields structurally ready? | Is there a slot/placeholder for Phase 2 data? |

---

## 5. Commander AI Assessment — Full Lifecycle (EXPANDED — Challenge 5)

### 5.1 AI Lifecycle Assessment Dimensions

UIAA-1.0 assessed AICAP markers only. UIAA-2.0 assesses the **full Commander AI lifecycle** per page:

| AI Lifecycle Stage | Assessment Question | Source |
|-------------------|--------------------|---------| 
| AI Orientation | Can the user ask "orient me" on this page? Is there a natural AI entry point for contextual explanation? | AICAP_REGISTER.md, Spec #13 §4 |
| AI Investigation | Can Commander AI help investigate what's shown? (drill deeper, explain anomaly, correlate) | commander-ai-core.ts capabilities |
| AI Recommendation | Can Commander AI recommend next actions based on page context? | Spec #13, AICAP types |
| AI Decision Support | Does the page present enough system data that AI can provide decision context? | SFD-1.0 (AI-ENHANCED mode) |
| AI Action Support | Can Commander AI draft communications, suggest remediation, or compose reports from this page? | commander-ai-core.ts draft/explain/summarize |
| AI Outcome Validation | Can AI help validate that actions taken from this page achieved their goal? | Closed-loop model + validation engines |
| AI Learning Opportunity | Does this page generate data that improves AI grounding over time? | Knowledge export registry |

### 5.2 AI Grounding Assessment

| Check | Source | Finding |
|-------|--------|---------|
| Are all entities on this page in the GroundingCorpus type? | commander-ai-core.ts | If entity is NOT in corpus, AI cannot ground in it — finding |
| Could Commander AI refuse on this page? (ungrounded references) | Refusal framework | Identify refusal risk scenarios |
| Is AI output traceable on this page? (groundedIn refs visible) | Spec #13 | AI must show what it's grounded in |
| Are AI execution records auditable from this page? | Audit event logging | AI actions must be auditable |

### 5.3 AI Opportunity Scoring

| Score | Meaning |
|-------|---------|
| 0 | No AI opportunity on this page |
| 1 | Single AI entry point (orient-this-page only) |
| 2 | Orient + investigate |
| 3 | Orient + investigate + recommend |
| 4 | Full lifecycle (orient + investigate + recommend + action support + validation) |
| 5 | Full lifecycle + learning opportunity (AI gets smarter from this page's data) |

**Dimension: Commander AI Lifecycle (AICL)**
- Replaces the narrow "AIR" dimension from v1.0
- Scoring: AI opportunity score (0-5) mapped to 0-100 scale

---

## 6. OODA Usability Assessment (EXPANDED — Challenge 6)

### 6.1 OODA Progression Assessment

UIAA-1.0 assessed whether OODA data was rendered. UIAA-2.0 assesses whether a user can **naturally progress through OODA** from this page:

| OODA Stage | Usability Question | What to Assess |
|-----------|-------------------|----------------|
| Observe | Can the user SEE what's happening from this page? | Signal freshness, connector health, new events visible |
| Orient | Can the user UNDERSTAND what it means from this page? | Context, correlation, relationship rendering, intelligence summary |
| Decide | Can the user DETERMINE what to do from this page? | Priority clarity, strategy context, routing rationale, next actions visible |
| Act | Can the user INITIATE action from this page? | Action buttons, drill-to-action paths, workflow entry points |

### 6.2 OODA Flow Assessment

| Check | Assessment |
|-------|-----------|
| Which OODA stages does this page SUPPORT? | List supported stages |
| Which OODA stages are BLOCKED from this page? | User cannot progress without navigating away |
| Which OODA stages require navigation to another page? | Acceptable if drill-path exists; finding if not |
| Where does OODA friction exist? | Points where the user must stop, think, navigate, or guess |
| Is the OODA loop visually/cognitively represented? | User should know where they are in the loop |

### 6.3 OODA Actionability Score

| Score | Meaning |
|-------|---------|
| 0 | Page does not contribute to any OODA stage |
| 25 | Page contributes to 1 stage only |
| 50 | Page contributes to 2 stages |
| 75 | Page contributes to 3 stages with clear progression |
| 100 | Page supports full OODA loop traversal (all 4 stages accessible) |

**Dimension: OODA Usability (OODU)** — replaces the narrower "OODA" dimension from v1.0.

---

## 7. Journey Intelligence Assessment (EXPANDED — Challenge 7)

### 7.1 Journey Flow Assessment

| Question | Assessment |
|----------|-----------|
| Which journeys ENTER this page? | What workflow brings a user here? (case triage → case detail; alert → investigation) |
| Which journeys EXIT this page? | Where does the user go next? (case detail → action execution; dashboard → drill-down) |
| Which journey CHECKPOINTS occur on this page? | What measurable events happen? (case viewed, action initiated, validation confirmed) |
| Which lifecycle MEASUREMENTS can be taken here? | Time-to-view, time-to-decide, time-to-act |
| Which automation opportunities exist? | Which manual steps on this page could become automated journeys? |
| Which OODA telemetry can be generated? | Phase duration, transition quality, bottleneck detection |

### 7.2 Journey Instrumentation Readiness

| Check | Score |
|-------|-------|
| Page has identifiable entry points (where users arrive from) | +20 |
| Page has identifiable exit points (where users navigate to) | +20 |
| Page has at least one measurable checkpoint event | +20 |
| Page structure supports time-based measurement | +20 |
| Page supports attribution (who did what, when) | +20 |

**Dimension: Journey Intelligence (JI)** — expanded from v1.0 "JIR" readiness-only assessment.

---

## 8. Closed-Loop Operations Assessment (NEW — Challenge 8)

### 8.1 Operational Loop Position

Every page SHALL be assessed for its position in the Commander closed-loop:

```
Detection → Investigation → Decision → Remediation → Validation → Closure
```

| Assessment | Question |
|-----------|----------|
| Loop Position | Where does this page sit in the operational loop? (may be multiple) |
| Detection Contribution | Does this page show new detections or contribute to detection quality? |
| Investigation Contribution | Does this page support investigation workflows? |
| Decision Contribution | Does this page help users or systems make decisions? |
| Remediation Contribution | Does this page enable or track remediation actions? |
| Validation Contribution | Does this page support validation of remediation effectiveness? |
| Closure Contribution | Does this page contribute to case/action closure? |

### 8.2 Loop Completeness Score

| Score | Meaning |
|-------|---------|
| 0 | Page is outside the operational loop (admin, config) |
| 1 | Page contributes to 1 loop stage |
| 2 | Page contributes to 2 loop stages |
| 3 | Page contributes to 3+ loop stages |
| 4 | Page enables progression between loop stages (user can move from investigation → decision from this page) |
| 5 | Page is a closed-loop hub (multiple stages accessible, progression visible, outcome traceable) |

**Dimension: Closed-Loop Contribution (CLC)** — new mandatory dimension for operational pages.

---

## 9. Automation Opportunity Assessment (NEW — Challenge 9)

### 9.1 Automation Assessment Questions

| Question | Assessment |
|----------|-----------|
| Which manual actions on this page could be automated? | Identify repetitive, rule-based, or policy-driven actions |
| Which workflow execution opportunities exist? | Actions that follow predictable patterns |
| Which human-confirmed automation candidates exist? | System proposes, human confirms (approval workflow) |
| Which autonomous operation candidates exist? | System acts without human intervention (strategy-governed) |
| Which orchestration opportunities exist? | Multi-step workflows spanning multiple entities |
| Is push governance relevant to actions on this page? | Can actions here trigger governed pushes to external systems? |

### 9.2 Automation Readiness Score

| Score | Meaning |
|-------|---------|
| 0 | No automation opportunity (pure information display) |
| 1 | Manual actions that could be system-assisted |
| 2 | Workflow candidates identified (human-confirmed automation possible) |
| 3 | Push governance integration opportunity (dry-run actions possible) |
| 4 | Full orchestration opportunity (multi-step automated workflow) |
| 5 | Autonomous operation candidate (strategy-governed, no human required) |

**Dimension: Automation Opportunity (AO)** — new dimension, advisory (not scored in composite until Phase 2).

---

## 10. Command Platform Surface Classification (NEW — Challenge 10)

### 10.1 Surface Classification Taxonomy

Every page SHALL be classified by its **command platform role**:

| Classification | Definition | Examples |
|---------------|-----------|----------|
| **Command Surface** | Programme-level operational awareness and tempo | Command Centre, Operating Pictures, OODA gauges |
| **Control Surface** | Configuration, governance, strategy, policy management | Strategy Centre, Tenant Admin, Settings |
| **Investigation Surface** | Drill-into-detail, evidence examination, root-cause analysis | Case Detail, Identity Detail, Asset Detail |
| **Execution Surface** | Action initiation, remediation tracking, push governance | (Future: remediation workspace, push management) |
| **Intelligence Surface** | Multi-source correlation, estate intelligence, pattern recognition | Fusion Map, Operating Pictures, Vulnerability Intelligence |
| **Governance Surface** | Compliance, audit, reporting, accountability | Governance pages, Reporting, Audit |
| **Strategy Surface** | Strategic planning, mission alignment, objective tracking | Mission Control, Strategy Centre |
| **Administration Surface** | System configuration, user management, platform operations | Control Plane, Platform Management |

### 10.2 Classification Rules

1. Every page MUST have exactly ONE primary classification
2. A page MAY have up to TWO secondary classifications
3. Classification determines which assessment dimensions receive elevated weight
4. Classification feeds the pattern catalogue (PAT-01 through PAT-17) alignment

### 10.3 Classification-Driven Assessment Weights

| Classification | Elevated Dimensions | Reduced Dimensions |
|---------------|--------------------|--------------------|
| Command | OODU, CLC, PL | DSC (cosmetic tolerance higher) |
| Control | SFA, SCC, RBAC | OODU (not OODA-primary) |
| Investigation | DC, CDRR, AICL | NC (depth acceptable) |
| Execution | AO, CLC, SFA | — |
| Intelligence | DC, CDRR, OODU | — |
| Governance | PL, RBAC, SFA | OODU |
| Strategy | SCC, SFA, PL | — |
| Administration | RBAC, SFA | OODU, CLC |

---

## 11. Role-Specific Experience Assessment (NEW — Challenge 11)

### 11.1 RBAC Role Personas

| Role | Cognitive Need | Primary Surfaces | Assessment Focus |
|------|---------------|-----------------|-----------------|
| Security Analyst | Speed, clarity, next-action | Cases, Identity, Assets, Operating Pictures | Time-to-triage, action proximity, evidence access |
| Security Operations Manager (SOM) | Breadth, team health, bottlenecks | Pulse surfaces, Strategy, Governance | Team awareness, SLA visibility, approval efficiency |
| Security Architect | Depth, relationships, architecture context | Architecture, Fusion Map, Exposure, Controls | Relationship visibility, dependency awareness |
| Vulnerability Analyst | Prioritisation, patch context, estate impact | Vulnerabilities, Exposure, Coverage | CVSS context, estate matching, remediation path |
| Identity/Access Specialist | Privilege awareness, anomaly detection, drift | Identity, Access Drift, Verdicts | Risk factor visibility, drift indicators |
| CISO / Executive | Strategic, aggregate, mission-aligned | Command Centre, CISO Dashboard, Reporting | KPI clarity, trend visibility, strategic alignment |
| Tenant Administrator | Configuration, policy, governance | Settings, Tenant Admin | Audit visibility, configuration confidence |
| Seiertech Operator | Cross-tenant, operational health, entitlements | Control Plane | Multi-tenant awareness, emergency controls |

### 11.2 Role Assessment Questions

| Question | Assessment |
|----------|-----------|
| Does this page serve its primary RBAC role(s) effectively? | Content matches cognitive need |
| Is information density appropriate for the role? | Analyst = dense; Executive = summarised |
| Are actions appropriate for the role? | Only role-appropriate actions visible |
| Is AI support appropriate for the role? | Analyst = investigate; Executive = brief |
| Is the cognitive path efficient? | Can the role achieve their goal in minimal steps? |

### 11.3 Role Experience Score

Each page is scored for its PRIMARY role audience (not all roles):

| Score | Meaning |
|-------|---------|
| 0-25 | Page does not serve the declared audience effectively |
| 26-50 | Serves audience but with friction |
| 51-75 | Adequate role-specific experience |
| 76-90 | Good — role-specific optimisation evident |
| 91-100 | Excellent — page is clearly designed for this role |

**Dimension: Role Experience (RE)** — new dimension, assessed for primary audience only.

---

## 12. Future Capability Readiness (NEW — Challenge 12)

### 12.1 Eight Intelligence Domains

Future Commander capabilities span eight intelligence domains. Every operational page SHALL be assessed for readiness:

| Domain | Readiness Question | What to Look For |
|--------|-------------------|------------------|
| Journey Intelligence (JI-1.0) | Can this page emit journey events? Are checkpoints identifiable? | Event emission points, measurable transitions |
| Asset Architecture Intelligence | Does this page show architecture context where relevant? | topology.ts consumption, dependency rendering |
| Secure by Design | Does this page surface security posture alongside function? | Coverage indicators, control status |
| Mission Intelligence | Does this page show mission alignment where relevant? | Mission binding, objective tracking |
| Strategy Intelligence | Does this page consume strategy and show policy effectiveness? | Strategy consumption, outcome measurement |
| OODA Lifecycle Intelligence | Does this page contribute to OODA health measurement? | Phase contribution, tempo data |
| Commander AI Analyst | Is this page ready for AI enhancement? (corpus, grounding, entry points) | AICAP markers, grounding corpus availability |
| Automation Intelligence | Is this page ready for workflow automation? | Action candidates, push governance hooks |

### 12.2 Readiness Scoring

Each domain is scored 0–3 per page:

| Score | Meaning |
|-------|---------|
| 0 | No readiness — domain not applicable or completely absent |
| 1 | Structural readiness — data model supports it but page doesn't surface it |
| 2 | Partial readiness — some elements present, gaps remain |
| 3 | Full readiness — page is ready for capability activation |

**Dimension: Future Capability Readiness (FCR)**
- Score = average of applicable domain scores × 33.3 (maps 0–3 to 0–100)
- Advisory in v2.0 (not weighted into composite until capabilities activate)

---

## 13. Complete Assessment Dimension Framework (v2.0)

### 13.1 Core Dimensions (mandatory, weighted — contribute to composite score)

| # | Dimension | Code | Weight | Source | v1.0 Status |
|---|-----------|------|--------|--------|-------------|
| 1 | Proposition Lineage | PL | 8% | §2 | **NEW** |
| 2 | Authority Alignment | AA | 10% | §1.1 | Retained (weight adjusted) |
| 3 | System-First Adherence | SFA | 8% | §3 | **NEW** |
| 4 | Use Case Coverage | UCC | 8% | USE_CASE_REGISTER | Retained |
| 5 | Data Completeness (6-layer) | DC | 12% | §4 | **EXPANDED** |
| 6 | Design System Conformity | DSC | 10% | DS-1.0 | Retained |
| 7 | Cognitive Usability | CU | 8% | Spec #41 | Retained |
| 8 | Navigation Coherence | NC | 5% | Spec #47, nav-groups.ts | Retained (weight reduced) |
| 9 | OODA Usability | OODU | 8% | §6 | **EXPANDED** |
| 10 | RBAC & Boundary | RBAC | 5% | Spec #19, Spec #39 | Retained (weight reduced) |
| 11 | Cross-Domain Relationships | CDRR | 8% | RELATIONSHIP_MAP | Retained (weight increased) |
| 12 | Closed-Loop Contribution | CLC | 5% | §8 | **NEW** |
| 13 | Role Experience | RE | 5% | §11 | **NEW** |

**Total core weight: 100%**

### 13.2 Commander-Specific Dimensions (assessed where applicable — contribute to Commander-Specific Score)

| # | Dimension | Code | Applies To | v1.0 Status |
|---|-----------|------|-----------|-------------|
| 14 | Commander AI Lifecycle | AICL | All operational pages | **EXPANDED** (was AIR) |
| 15 | Strategy Consumption | SCC | Strategy-bound pages | Retained |
| 16 | Closed-Loop Integrity | CLI | Case lifecycle pages | Retained |
| 17 | Visual Intensity Ceiling | VIC | All pages | Retained |
| 18 | Mission Mode Readiness | MMR | Operational pages | Retained |
| 19 | Journey Intelligence | JI | All workflow pages | **EXPANDED** (was JIR) |
| 20 | Automation Opportunity | AO | Operational pages | **NEW** |
| 21 | Future Capability Readiness | FCR | All operational pages | **NEW** |
| 22 | Command Platform Classification | CPC | All pages | **NEW** |

### 13.3 Programme-Level Dimensions (assessed at group/programme level only)

| # | Dimension | Code | Assessment Level |
|---|-----------|------|-----------------|
| 23 | Proposition Coverage | PC | Programme |
| 24 | Technical Spec Coverage | TSC | Programme |
| 25 | Estate OODA Completeness | EOC | Programme |
| 26 | Cross-Domain Flow Completeness | CDFC | Programme |
| 27 | AI Surface Readiness | ASR | Programme |
| 28 | Navigation Estate Coherence | NEC | Programme |
| 29 | Rationalisation Register | RR | Programme |

---

## 14. Updated Review Outputs

### 14.1 Individual Page Review (v2.0 template additions)

In addition to UIAA-1.0 outputs, every page review SHALL now include:

```
PROPOSITION LINEAGE
───────────────────
Proposition Objectives Served: [list]
Technical Spec Capabilities Implemented: [list]
Full Chain Traceable: [YES/NO — with gap identification]

COMMAND PLATFORM CLASSIFICATION
───────────────────────────────
Primary: [Command | Control | Investigation | Execution | Intelligence | Governance | Strategy | Administration]
Secondary: [optional, max 2]

SYSTEM-FIRST ASSESSMENT
───────────────────────
Delivery Mode: [SYSTEM / AI-ENHANCED / AI-ONLY per USE_CASE_REGISTER]
SFD Adherence: [score]
Build-Readiness Gate (Spec #41 §11): [11 items assessed]

DATA DEPTH ASSESSMENT (6-layer)
───────────────────────────────
Layer 1 — Entity Coverage: [X/Y entities consumed vs should-consume]
Layer 2 — Field Coverage: [X/Y fields rendered vs available]
Layer 3 — Resolver Coverage: [X/Y resolver outputs surfaced]
Layer 4 — Engine Coverage: [X/Y engine outputs rendered]
Layer 5 — Relationship Coverage: [X/Y relationships shown vs documented]
Layer 6 — Derived Metrics: [X/Y metrics displayed vs available]

COMMANDER AI LIFECYCLE
──────────────────────
AI Lifecycle Score: [0-5]
Orientation: [ready/not ready]
Investigation: [ready/not ready]
Recommendation: [ready/not ready]
Decision Support: [ready/not ready]
Action Support: [ready/not ready]
Outcome Validation: [ready/not ready]
Learning Opportunity: [ready/not ready]
Grounding Corpus Coverage: [entities available in GroundingCorpus vs on page]

OODA USABILITY
──────────────
Stages Supported: [Observe | Orient | Decide | Act]
Stages Blocked: [list]
Friction Points: [list]
Actionability Score: [0-100]

JOURNEY INTELLIGENCE
────────────────────
Entry Journeys: [list workflows that arrive here]
Exit Journeys: [list workflows that leave here]
Checkpoints: [list measurable events]
Measurement Opportunities: [list metrics capturable]
Automation Candidates: [list manual steps that could automate]

CLOSED-LOOP POSITION
─────────────────────
Loop Stages: [Detection | Investigation | Decision | Remediation | Validation | Closure]
Loop Contribution Score: [0-5]
Progression Enabled: [can user move to next stage from here?]

AUTOMATION OPPORTUNITY
──────────────────────
Score: [0-5]
Candidates: [list automatable actions/workflows]
Push Governance Relevance: [yes/no]

ROLE EXPERIENCE
───────────────
Primary Audience: [role name]
Role Experience Score: [0-100]
Cognitive Path Efficiency: [assessment]

FUTURE CAPABILITY READINESS
────────────────────────────
[8 domains scored 0-3 each]
Overall FCR: [average mapped to 0-100]
```

---

## 15. Updated Review Schedule (v2.0)

### 15.1 Phase 0 now includes

- Proposition-to-page lineage mapping (programme-wide)
- Command Platform classification of all pages
- System-First Doctrine baseline awareness

### 15.2 New Phase: Phase 0.5 — System Audit

Before any page review, execute:

| Step | What | Output |
|------|------|--------|
| 0.5.1 | Verify PAGE_DATA_COVERAGE_AUDIT is current | Identifies field gaps mechanically |
| 0.5.2 | Verify CHAIN_COMPLIANCE_AUDIT is current | Identifies relationship debt |
| 0.5.3 | Verify SPEC_GAP_AUDIT is current | Identifies unmet spec requirements |
| 0.5.4 | Map all pages to Command Platform classifications | Classification register |
| 0.5.5 | Map all pages to OODA stages | OODA coverage map |
| 0.5.6 | Map all pages to closed-loop positions | Loop coverage map |

---

## 16. Answers to the 12 Challenges

### Challenge 1 — Authority Chain Coverage
**Answer:** Authority chain expanded from 10 to 28 mandatory artefacts across 5 tiers. All artefacts listed in §1.1.

### Challenge 2 — Proposition-to-Page Lineage
**Answer:** YES — proposition lineage is now a mandatory dimension (PL, 8% weight). Full chain validation required per §2.

### Challenge 3 — System-First Doctrine Assessment
**Answer:** YES — reviews now validate underlying engines, available system capabilities, and UI-last adherence BEFORE assessing visual presentation. SFA dimension (8% weight) plus Build-Readiness Gate assessment. See §3.

### Challenge 4 — Data Dictionary Assessment Depth
**Answer:** Expanded from single-layer to 6-layer assessment (entity + field + resolver + engine + relationship + derived metric). See §4.

### Challenge 5 — AI Analyst Assessment
**Answer:** Expanded from marker-only to full 7-stage AI lifecycle assessment (orientation → investigation → recommendation → decision support → action support → outcome validation → learning). AI grounding assessment added. See §5.

### Challenge 6 — OODA Assessment
**Answer:** Expanded from data-rendering to usability/progression/actionability assessment. OODA flow assessment identifies friction, blocked stages, and progression capability. See §6.

### Challenge 7 — Journey Intelligence Assessment
**Answer:** Expanded from readiness-only to full flow assessment (entry/exit journeys, checkpoints, measurements, automation candidates, OODA telemetry). See §7.

### Challenge 8 — Closed-Loop Operations Assessment
**Answer:** YES — new mandatory dimension (CLC, 5% weight). Every page assessed for its position in Detection→Investigation→Decision→Remediation→Validation→Closure loop. See §8.

### Challenge 9 — Automation Opportunity Assessment
**Answer:** YES — new dimension (AO, advisory). Assesses manual actions, workflow candidates, push governance integration, orchestration, and autonomous operation readiness. See §9.

### Challenge 10 — Command Platform Classification
**Answer:** YES — 8 surface classifications (Command, Control, Investigation, Execution, Intelligence, Governance, Strategy, Administration). Classification drives weight adjustments. See §10.

### Challenge 11 — Role-Specific Experience Assessment
**Answer:** YES — new dimension (RE, 5% weight). 8 role personas defined with cognitive needs, primary surfaces, and assessment focus. See §11.

### Challenge 12 — Future Capability Readiness
**Answer:** YES — new dimension (FCR, advisory). 8 intelligence domains assessed (0-3 per page) for activation readiness. See §12.

---

## 17. Migration from v1.0

| v1.0 Dimension | v2.0 Disposition |
|---------------|-----------------|
| AA (Authority Alignment) | Retained, weight adjusted 15%→10% |
| UCC (Use Case Coverage) | Retained, weight adjusted 12%→8% |
| DC (Data Completeness) | **EXPANDED** to 6-layer, weight retained 12% |
| DSC (Design System Conformity) | Retained, weight adjusted 12%→10% |
| CU (Cognitive Usability) | Retained, weight adjusted 10%→8% |
| NC (Navigation Coherence) | Retained, weight reduced 8%→5% |
| OODA (OODA Contribution) | **REPLACED** by OODU (OODA Usability), weight retained 8% |
| RBAC (RBAC & Boundary) | Retained, weight reduced 8%→5% |
| PA (Performance Adherence) | **REMOVED** from core (moved to programme-level only — performance is infrastructure, not page-level) |
| CDRR (Cross-Domain Relationships) | Retained, weight increased 7%→8% |
| **NEW: PL** | Proposition Lineage, 8% |
| **NEW: SFA** | System-First Adherence, 8% |
| **NEW: CLC** | Closed-Loop Contribution, 5% |
| **NEW: RE** | Role Experience, 5% |

---

## Appendix A — Terminology Additions (v2.0)

| Term | Definition |
|------|-----------|
| Closed-loop contribution | A page's role in the Detection→Closure operational cycle |
| Command Platform | Commander's evolved identity as a Cyber Command Platform, not a traditional SaaS application |
| Delivery mode | SYSTEM / AI-ENHANCED / AI-ONLY per SFD-1.0 |
| Grounding corpus | The set of Commander-owned data AI is permitted to reference |
| Journey checkpoint | A measurable event occurring during a user's workflow on a page |
| Loop position | Where a page sits in the operational closed-loop cycle |
| Proposition lineage | The traceable chain from Master Proposition through to page implementation |
| Surface classification | A page's role category within the Command Platform taxonomy |

---

## Appendix B — Existing UIAA-1.0 Content Retained

The following sections from UIAA-1.0 remain valid and are incorporated by reference:

- §3 Page Grouping Strategy (hybrid domain-boundary model)
- §6 Review Deliverables (templates — now extended by §14)
- §7 Review Schedule (phases — now extended by §15)
- §8 Commander Pattern Catalogue (17 patterns)
- §9 Rationalisation Framework (7 categories, decision tree)
- §10 Review Execution Process (9-step, now expanded)

These are not repeated here. Refer to UI_UX_ASSESSMENT_AUTHORITY.md (v1.0) for the retained sections. In case of conflict, v2.0 prevails.

---

**End of Document.**
