# SPEC_GAP_AUDIT — 10 Unprocessed Specs Audited Against Build State

**Date:** 2026-06-07  
**Auditor:** Kiro (read-only pass — no code written)  
**Build State:** Current `main` as at audit date  
**Method:** Read specs 34–43, compared WHEN…SHALL statements against existing entities, engines, pages, use cases and knowledge graph domains.

---

## 1. Summary Table

| Spec | Title | Requirements | Covered | Gaps | New Entities | New Pages | New Use Cases | Effort |
|---|---|---|---|---|---|---|---|---|
| 34 | Drift and Rule Engine | 25 | 8 partial | 17 | 3–4 | 2–3 | 5–8 | Large |
| 35 | Platform Security and Hardening | 10 | 2 partial | 8 | 2–3 | 1–2 | 4–6 | Large |
| 36 | Rule/Model/Decision Governance Surface | 12 | 4 partial | 8 | 2–3 | 3–4 | 4–6 | Large |
| 37 | Mission Objective Binding Model | 8 | 3 partial | 5 | 1–2 | 1–2 | 3–5 | Medium |
| 38 | Commercial Control Plane UI | 10 | 6 partial | 4 | 0–1 | 0 (pages exist) | 3–5 | Medium |
| 39 | Pre-Warned/Protected/Novel Classification | 11 | 3 partial | 8 | 1 (augment) | 1–2 | 4–6 | Large |
| 40 | Inverse Discovery Loop | 8 | 0 | 8 | 2–3 | 1–2 | 3–5 | Medium |
| 41 | Internal Risk Investigation Sub-Lifecycle | 17 | 1 partial | 16 | 3–4 | 2–3 | 5–8 | Large |
| 42 | Universal Search | 6 | 1 partial | 5 | 1 | 1 | 2–3 | Small |
| 43 | Strategy Layer Runtime Surface | 24 | 12 partial | 12 | 0 (entity exists) | 2–3 | 5–8 | Large |
| **TOTAL** | | **131** | **~40 partial** | **~91** | **15–24** | **14–22** | **38–60** | |

**Legend:**  
- "Covered" = an existing entity, engine, or page partially satisfies the requirement (scaffold/data-model level, not runtime implementation).  
- "Gaps" = requirements with NO satisfying artefact or only minimal placeholder.  
- Effort: Small (<1 session), Medium (1–2 sessions), Large (3+ sessions).

---

## 2. Per-Spec Detail

---

### Spec 34 — Drift and Rule Engine

**Requirements count:** 25 (14 core + 10 v1.2 engine enumeration + 1 v1.2 attack-path)

**Already covered (partial):**
| Artefact | Type | Satisfies |
|---|---|---|
| `drift-detection-engine.ts` (entity) | Entity | Req 1 (partial — drift model exists but no YAML format), Req 7 (partial — detection fields exist) |
| `drift-detection-engine.ts` (engine) | Engine | Req 4 (canonical comparison logic), basic severity classification |
| `platform-management.ts` (RuleDefinition) | Entity | Req 2 (partial — lifecycle statuses exist: active/draft/disabled/deprecated) |
| `/platform/rules` | Page | Req 2 (partial — views rule definitions) |
| `/settings/rules` | Page | Related governance surface |
| `pre-warned-classification-engine.ts` | Engine | v1.2 Req 9 (partial — classifies pre-warned state from engine signals) |
| `architecture-intelligence-engine.ts` | Engine | v1.2 Req 4 (partial — exists as contract) |
| `identity-intelligence-engine.ts` | Engine | v1.2 Req 5 (partial — exists as contract) |

**Gaps:**
1. YAML rule format (Req 1) — no YAML parser, no rule schema validator
2. Full rule lifecycle (Req 2) — only status enum; no authored→validated→loaded→evaluated→traced→suppressed→promoted→finding pathway
3. Active-only execution gating (Req 3) — no runtime execution guard
4. Tenant-safe evaluation context builder (Req 5) — no tenant-filtering evaluation context
5. Supported operators registry (Req 6) — no operator whitelist or code-execution rejection
6. Finding model (Req 7) — no `Finding` entity with full fields (finding_id, dedupe_key, proposed_actions etc.)
7. Suppression/dedupe engine (Req 8) — no deduplication logic
8. Initial 10-category rule library (Req 9) — no seed rules
9. Safe proposed-action types (Req 10) — no action-type whitelist
10. Rule validation engine (Req 11) — no YAML parse/field validation logic
11. Rule health telemetry (Req 12) — no telemetry emission
12. 240-model framework (Req 13) — only 5 drift types; 240-model catalogue not modelled
13. Simulation/version/rollback (Req 14) — no simulation contract
14. v1.2 Risk Scoring Engine — no risk-scoring-engine entity/contract
15. v1.2 Blast Radius Engine — no blast-radius-engine entity/contract
16. v1.2 Behavioural Anomaly Detection Engine — no contract
17. v1.2 Attack Path Likelihood Engine — no contract

**Net-new work needed:**
- Entities: `finding.ts`, `rule-library-seed.ts`, `risk-scoring-engine.ts`, `blast-radius-engine.ts`
- Engines: `rule-validation-engine.ts`, `rule-execution-engine.ts`, `suppression-engine.ts`
- Pages: `/platform/rules/simulation`, `/platform/rules/validation`, `/platform/rules/health`
- Augmentations: `platform-management.ts` (add versioning, rollback, simulation fields to RuleDefinition)

**Use cases implied:** UC-059 through UC-066 (rule lifecycle, validation, simulation, health telemetry, finding management)

**Knowledge graph domains touched:** D-04 Drift & Rule Engine (existing)

**Dependencies:** Spec 43 (Strategy Layer) for threshold and automation boundary; Spec 16 (Connector Framework) for normalised input

---

### Spec 35 — Platform Security and Hardening

**Requirements count:** 10

**Already covered (partial):**
| Artefact | Type | Satisfies |
|---|---|---|
| `tenant-config.ts` | Entity | Req 3 (partial — tenant context fields exist on all entities via CommonFields) |
| `audit-event.ts` | Entity | Req 6 (partial — audit events exist for logging) |

**Gaps:**
1. SSO/OIDC/SAML identity model (Req 1) — no auth entity, no SSO configuration schema
2. Server-side session model (Req 2) — no session entity or lifetime enforcement
3. Mandatory tenant context enforcement (Req 3) — CommonFields has tenant but no enforcement middleware/guard
4. Tenant isolation test suite (Req 4) — no isolation tests exist
5. RBAC enforcement points (Req 5) — no middleware, no role-guarding contracts
6. Secrets-never-logged contract (Req 6) — no log-sanitisation utility or contract
7. Break-glass control (Req 7) — no break-glass entity, workflow or audit
8. Encryption contract (Req 8) — no encryption specification/contract
9. Connector security contract (Req 9) — no least-privilege connector security model
10. Phase 0 push safety (Req 10) — `push-governance-engine.ts` exists but incomplete

**Net-new work needed:**
- Entities: `auth-session.ts`, `break-glass-request.ts`, `rbac-policy.ts`
- Engines: `tenant-isolation-guard.ts`, `secrets-sanitisation.ts`
- Pages: `/settings/security`, `/platform/break-glass`
- Test suites: Tenant isolation tests, RBAC enforcement tests

**Use cases implied:** UC-067 through UC-072 (SSO login, session management, break-glass, tenant isolation verification)

**Knowledge graph domains touched:** D-37 RBAC (existing), D-35 Three Application Boundaries (existing), D-38 Configuration Governance (existing) — potentially new: D-41 Platform Security

**Dependencies:** Foundation — blocks all other specs implicitly (security is cross-cutting)

---

### Spec 36 — Rule/Model/Decision Governance Surface

**Requirements count:** 12 (8 core + 1 v1.2 rule generation + 3 v1.3.1 detection lifecycle)

**Already covered (partial):**
| Artefact | Type | Satisfies |
|---|---|---|
| `platform-management.ts` (RuleDefinition, ModelDefinition) | Entity | Req 3 (partial), Req 5 (partial — model config fields exist) |
| `/platform/rules` | Page | Req 3 (partial — views rules) |
| `/platform/models` | Page | Req 5 (partial — views models) |
| `/control-plane/rule-packs` | Page | Req 4 (partial — Commercial rule pack surface exists) |

**Gaps:**
1. Decision explainability (Req 1) — no black-box prohibition enforcement; no decision-rationale schema
2. Operational explainability (Req 2) — no case-level rule-hit/evidence exposure
3. Tenant Admin full rule governance (Req 3) — only basic view; no simulation, versioning, drift, suppression surfaces
4. Decision rationale schema (Req 6) — no `DecisionRecord` entity
5. Simulation blast radius (Req 7) — no simulation contract
6. Versioning fields (Req 8) — partial (version field exists); no draft/previous/effective-date/approver/rollback metadata
7. v1.2 Detection model lifecycle (authoring, testing, promotion, tuning, retirement) — no lifecycle state machine
8. v1.3.1 Detection Model Authoring — no rule builder schema validation/approval workflow
9. v1.3.1 Detection Model Tuning — no tuning lineage preservation
10. v1.3.1 Detection Model Retirement — no retirement gates

**Net-new work needed:**
- Entities: `decision-record.ts`, `simulation-result.ts`
- Augmentations: `platform-management.ts` (add versioning metadata, rollback state, approver, effective-date, simulation-ref)
- Engines: `decision-explainability-engine.ts`
- Pages: `/platform/rules/simulation`, `/platform/rules/versioning`, `/platform/models/lifecycle`, `/governance/decisions`

**Use cases implied:** UC-073 through UC-078 (decision explainability, rule simulation, model lifecycle, detection authoring)

**Knowledge graph domains touched:** D-04 Drift & Rule Engine (existing), D-38 Configuration Governance (existing)

**Dependencies:** Spec 34 (Drift/Rule Engine for rule runtime); Spec 43 (Strategy Layer for configuration governance)

---

### Spec 37 — Mission Objective Binding Model

**Requirements count:** 8

**Already covered (partial):**
| Artefact | Type | Satisfies |
|---|---|---|
| `mission.ts` | Entity | Req 1 (partial — structured mission entity exists), Req 2 (partial — many fields present but missing criticality, scope, tag/matching rules, P0 policy, routing profile) |
| `/mission/overview`, `/mission/objectives`, `/mission/impact` | Pages | Req 5 (partial — scaffolded pages exist) |
| `strategy.ts` (mission-objective surface) | Entity | Req 4 (partial — mission-objective strategy surface type registered) |

**Gaps:**
1. Mission object fields (Req 2) — missing: criticality, scope, linked entities by binding type, tag/matching rules, priority weight, SLA profile, P0 policy, routing profile, review metadata
2. Binding methods (Req 3) — no binding-method engine (manual, tag-based, business-service, dependency-graph, rule-based, Commander-suggested)
3. Mission impact inheritance chain (Req 4) — no risk-object→entity→mission traversal engine
4. Case mission panel (Req 5) — no mission-impact rendering in case detail
5. Tenant Admin mission governance (Req 6) — no mission configuration surface in settings/tenant-admin
6. Fusion Map overlays (Req 7) — no mission-linked Fusion Map overlay contract
7. Mission approval for Tier 0/1 (Req 8) — no approval workflow entity/contract

**Net-new work needed:**
- Augmentations: `mission.ts` (add criticality, scope, binding rules, P0 policy, routing profile, review metadata)
- Entities: `mission-binding.ts`
- Engines: `mission-impact-engine.ts`
- Pages: `/settings/missions` (Tenant Admin config), augment `/cases/[id]` with mission panel
- Augment Fusion Map contract for mission overlays

**Use cases implied:** UC-079 through UC-083 (mission creation, binding, impact calculation, approval, Fusion Map overlay)

**Knowledge graph domains touched:** D-25 Mission Control (existing), D-29 Multi-Domain Fusion Map (existing), D-22 Strategy Layer (existing)

**Dependencies:** Spec 43 (Strategy Layer — mission-objective strategy surface); existing case and risk-object entities

---

### Spec 38 — Commercial Control Plane UI

**Requirements count:** 10 (9 core + 1 v1.2 boundary)

**Already covered (partial):**
| Artefact | Type | Satisfies |
|---|---|---|
| `/control-plane` (page + layout) | Page | Req 1 (distinct shell — layout.tsx exists), Req 3 (partial — sub-routes exist) |
| `/control-plane/customers` | Page | Req 5 (partial — customer register scaffold) |
| `/control-plane/tenants` | Page | Req 6 (partial — tenant detail scaffold) |
| `/control-plane/licences` | Page | Req 4 (partial — licence surface exists) |
| `/control-plane/deployment` | Page | Req 8 (partial — deployment surface) |
| `/control-plane/support` | Page | Req 9 (partial — support access surface) |
| `customer.ts`, `licence.ts`, `deployment.ts`, `tenant-config.ts`, `support-operation.ts` | Entities | Req 4–9 backing data |

**Gaps:**
1. Route boundary enforcement (Req 2) — no domain-level separation to `control.commandersdr.com`; currently under same app boundary
2. Top navigation completeness (Req 3) — missing "Entitlements" nav item; partial coverage of Operator Command panels
3. Operator Command panels (Req 4) — no operator-command-home with aggregate metrics (total customers, trial conversions, entitlement exceptions, failed syncs, emergency controls, release ring health)
4. Entitlement editor (Req 7) — no entitlement manifest entity or editor surface

**Net-new work needed:**
- Entities: `entitlement-manifest.ts` (module/feature/connector/AI/automation/Fusion Map/reporting entitlements)
- Augmentations: Operator Command Home aggregation (metrics entity or resolver)
- Pages: `/control-plane/entitlements` (editor surface); augment `/control-plane` home with operator command panels
- Configuration: Route boundary documentation/plan for domain separation

**Use cases implied:** UC-084 through UC-088 (operator command, entitlement management, deployment ring management)

**Knowledge graph domains touched:** D-36 Internal Control Plane (existing), D-35 Three Application Boundaries (existing)

**Dependencies:** Spec 35 (Platform Security — RBAC for operator access); existing control-plane entities

---

### Spec 39 — Pre-Warned/Protected/Novel Classification

**Requirements count:** 11 (10 core + 1 v1.2)

**Already covered (partial):**
| Artefact | Type | Satisfies |
|---|---|---|
| `pre-warned-classification.ts` (entity) | Entity | Req 1 (partial — entity exists but uses different classification scheme: pre_warned/elevated/critical/imminent instead of PRE_WARNED/PROTECTED/NOVEL) |
| `pre-warned-classification-engine.ts` | Engine | Req 5 (partial — classification logic exists but uses severity-based model, not temporal posture model) |
| `/operating-picture/external` | Page | Req 10 (partial — external operating picture page exists) |

**Gaps — CRITICAL SEMANTIC MISMATCH:**
The existing `pre-warned-classification.ts` entity and engine implement a **severity escalation model** (pre_warned → elevated → critical → imminent) based on combined engine signals. Spec 39 requires a **temporal posture accountability model** (PRE_WARNED / PROTECTED / NOVEL) that classifies based on what Commander *knew before* an attack landed. These are fundamentally different models.

1. Classification values (Req 1) — entity must support PRE_WARNED/PROTECTED/NOVEL (not pre_warned/elevated/critical/imminent)
2. Entity resolution (Req 2) — no canonical entity resolution phase
3. Inverse discovery pause (Req 3) — no integration with Spec 40
4. Historical posture lookup (Req 4) — no temporal posture snapshot retrieval
5. Pre-warned decision logic (Req 5) — no "active drift/coverage gap existed at case open time" logic
6. Protected decision logic (Req 6) — no "no warning and posture current" determination
7. Novel decision logic (Req 7) — no "posture stale or entity unresolved" classification
8. Immutable audit record (Req 8) — no classification audit with posture snapshot
9. Priority integration (Req 9) — no feed to priority engine from classification
10. Operating picture rings (Req 10) — no visual semantic rendering contract

**Net-new work needed:**
- Major augmentation or replacement: `pre-warned-classification.ts` must be restructured to support the PRE_WARNED/PROTECTED/NOVEL model (potentially alongside existing severity model, or the existing model reclassified as a separate concern)
- New entity: `attack-classification-audit.ts` (immutable audit record)
- New engine: `temporal-posture-lookup-engine.ts` (historical posture retrieval)
- Augment: `pre-warned-classification-engine.ts` (add temporal classification logic)
- Pages: augment `/operating-picture/external` with ring semantics

**Use cases implied:** UC-089 through UC-094 (attack classification, temporal posture lookup, entity resolution, classification audit)

**Knowledge graph domains touched:** D-13 Pre-Warned Classification (existing), D-27 Operating Pictures (existing)

**Dependencies:** Spec 40 (Inverse Discovery Loop — required for entity resolution failure); existing drift/exposure/coverage entities for posture lookup

---

### Spec 40 — Inverse Discovery Loop

**Requirements count:** 8

**Already covered:** NONE — no existing entity, engine or page addresses inverse discovery.

**Gaps:**
1. Lookup failure trigger (Req 1) — no mechanism to catch normalisation lookup failures
2. Secondary resolution (Req 2) — no fuzzy-match/identifier-translation/change-check engine
3. Coverage Blindspot case (Req 3) — no case type for coverage blindspot; no case-generation from lookup failure
4. Root cause classification (Req 4) — no root-cause taxonomy (discovery gap, staleness, shadow IT, naming mismatch)
5. Routing to platform/architecture team (Req 5) — no routing rule for blindspot cases
6. Entity onboarding driver (Req 6) — no onboarding workflow trigger
7. Pre-warned relationship (Req 7) — no integration with Spec 39 classification pause
8. Audit events (Req 8) — no inverse-discovery audit event types

**Net-new work needed:**
- Entities: `inverse-discovery-event.ts`, `coverage-blindspot-case.ts` (or augment case.ts with new case type)
- Engines: `inverse-discovery-engine.ts`, `secondary-resolution-engine.ts`
- Pages: `/coverage/blindspots` (or augment existing coverage surfaces)
- Augmentations: normalisation-layer.ts (add failure-trigger routing)

**Use cases implied:** UC-095 through UC-099 (lookup failure, secondary resolution, blindspot case, onboarding driver)

**Knowledge graph domains touched:** D-10 Coverage / Tool Health (existing), D-03 Normalisation (existing) — potentially new: D-41 Inverse Discovery

**Dependencies:** Normalisation Layer (existing); Spec 39 (Pre-Warned Classification — pauses on resolution failure)

---

### Spec 41 — Internal Risk Investigation Sub-Lifecycle

**Requirements count:** 17 (10 core + 1 v1.2 + 6 v1.3.1)

**Already covered (partial):**
| Artefact | Type | Satisfies |
|---|---|---|
| `identity.ts` (entity) | Entity | Req 7 (partial — identity entity exists for reference) |

**Gaps:**
1. Surface-not-investigate boundary (Req 1) — no enforcement boundary
2. Six-phase lifecycle (Req 2) — no Verdict Pattern case type with Surface→Triage→Routing→Customer Investigation→Outcome→Closure phases
3. Surface phase fields (Req 3) — no pattern description/affected identity/severity/dispositions contract
4. Triage scope controls (Req 4) — no significance/suppression/routing logic for Internal Risk
5. Customer-owned investigation handoff (Req 5) — no handoff contract
6. Outcome categories (Req 6) — no outcome disposition entity (no issue/issue addressed/ongoing concern/privileged outcome)
7. Identity access governance (Req 7) — no Internal Risk authority role; no access-audit-of-access logging
8. Jurisdictional controls (Req 8) — no jurisdictional disablement, pattern restriction, thresholds, RBAC, transparency export, retention
9. Evidence boundary (Req 9) — no intelligence-grade vs investigation-grade marking
10. Cross-boundary correlation (Req 10) — no correlation-without-collapse contract
11. v1.2 Internal actor concentration — no concentration surfacing
12. v1.3.1 Jurisdictional configuration application — no jurisdiction config application
13. v1.3.1 Jurisdictional RBAC restriction — no jurisdiction RBAC enforcement
14. v1.3.1 Jurisdictional re-evaluation — no re-evaluation trigger
15. v1.3.1 Investigation prohibition — no investigation prohibition enforcement
16. v1.3.1 Intent prohibition — no intent-determination prohibition
17. v1.3.1 Customer-owned handoff — no handoff contract

**Net-new work needed:**
- Entities: `verdict-pattern-case.ts` (or augment case-lifecycle.ts with Internal Risk case type), `internal-risk-jurisdiction.ts`, `internal-risk-outcome.ts`
- Engines: `internal-risk-lifecycle-engine.ts`, `jurisdiction-enforcement-engine.ts`
- Pages: `/identity/internal-risk` (or dedicated Internal Risk surface), `/settings/jurisdiction`
- Augmentations: case-lifecycle.ts (add Verdict Pattern lifecycle), identity.ts (add access-governance fields)

**Use cases implied:** UC-100 through UC-107 (verdict pattern surfacing, triage, routing, handoff, outcome recording, jurisdiction config, access audit)

**Knowledge graph domains touched:** D-07 Identity Intelligence (existing), D-18 Case Lifecycle (existing) — likely new: D-42 Internal Risk / Insider Risk Boundary

**Dependencies:** Spec 35 (Platform Security — RBAC/tenant isolation); existing identity and case entities

---

### Spec 42 — Universal Search

**Requirements count:** 6 (5 core + 1 v1.2)

**Already covered (partial):**
| Artefact | Type | Satisfies |
|---|---|---|
| `packages/ui/src/components/global-search.ts` | UI Component | Req 1 (partial — search component shell exists) |

**Gaps:**
1. Universal search across governed entities (Req 1) — no search index, no cross-entity query engine
2. Tenant-scoped RBAC filtering (Req 2) — no search-specific tenant filtering
3. Canonical result resolution (Req 3) — no search-result-to-canonical-object resolver
4. Audit events for sensitive search (Req 4) — no search audit emission
5. Register inconsistency preservation (Req 5) — documented in spec but no runtime artefact needed

**Net-new work needed:**
- Entities: `search-index-config.ts` (or augment platform-management.ts)
- Engines: `universal-search-engine.ts` (query planning, RBAC filter, canonical resolution)
- Pages: (global search overlay exists as UI component — may need `/search` results page)
- Augmentations: audit-event.ts (add search-audit event type)

**Use cases implied:** UC-108 through UC-110 (universal search, search audit, search configuration)

**Knowledge graph domains touched:** D-01 Programme Foundation (existing) — potentially new: D-43 Universal Search

**Dependencies:** All entities must be indexable; Spec 35 (Platform Security — RBAC filtering)

---

### Spec 43 — Strategy Layer Runtime Surface

**Requirements count:** 24

**Already covered (partial):**
| Artefact | Type | Satisfies |
|---|---|---|
| `strategy.ts` (entity) | Entity | Req 1–12 (partial — all 12 strategy surface types registered as `StrategySurfaceType`; StrategyPolicy with versioning, approval, simulation-ref exists) |
| `strategy.ts` (RuntimeBindingEvent, RuntimeBindingTrigger) | Entity | Req 18–23 (partial — all 6 runtime binding event types registered with trigger contract) |
| `strategy.ts` (StrategyCentreView) | Entity | Req 13–17 (partial — all 5 Strategy Centre view types registered) |
| `/settings/sla`, `/settings/routing`, `/settings/validation`, `/settings/closure-reopening`, `/settings/automation-boundaries` | Pages | Req 1, 3, 4, 10, 11, 12 (partial — settings pages exist for several strategy surfaces) |

**Gaps:**
1. Req 1–12 runtime policy enforcement — entity defines types but no runtime policy engine that evaluates/applies them
2. Req 13 Configuration surface — no dedicated Strategy Centre page (settings pages exist but not unified)
3. Req 14 Simulation surface — no simulation page or engine
4. Req 15 Approval workflow — StrategyApproval schema exists but no workflow engine
5. Req 16 Audit history — no strategy audit history view
6. Req 17 Effective-policy preview — no preview rendering
7. Req 18–23 Runtime binding trigger execution — RuntimeBindingTrigger defined but no execution engine that fires recalculation
8. Req 24 Build-blocking enforcement — no mechanical gate preventing strategy-dependent features from shipping without coverage

**Net-new work needed:**
- Engines: `strategy-runtime-engine.ts` (applies policy changes, fires RuntimeBindingTriggers), `strategy-simulation-engine.ts`
- Pages: `/strategy/centre` (unified Strategy Centre), `/strategy/simulation`, `/strategy/audit-history`, `/strategy/effective-preview`
- Augmentations: Wire existing settings pages into Strategy Centre navigation

**Use cases implied:** UC-111 through UC-118 (strategy configuration, simulation, approval, audit history, effective preview, runtime binding)

**Knowledge graph domains touched:** D-22 Strategy Layer (existing)

**Dependencies:** Foundation — this spec is build-blocking for case management, routing, validation, closure, reopening, Fusion Map. Must be completed early.

---

## 3. Consolidated New Work (Deduplicated)

### New Entities Required

| Entity | Spec(s) | Domain |
|---|---|---|
| `finding.ts` | 34 | D-04 |
| `rule-library-seed.ts` | 34 | D-04 |
| `decision-record.ts` | 36 | D-04/D-38 |
| `simulation-result.ts` | 36, 43 | D-04/D-22 |
| `mission-binding.ts` | 37 | D-25 |
| `entitlement-manifest.ts` | 38 | D-36 |
| `attack-classification-audit.ts` | 39 | D-13 |
| `inverse-discovery-event.ts` | 40 | D-10 |
| `verdict-pattern-case.ts` (or case augmentation) | 41 | D-07/D-18 |
| `internal-risk-jurisdiction.ts` | 41 | D-07 |
| `internal-risk-outcome.ts` | 41 | D-07 |
| `auth-session.ts` | 35 | D-37 |
| `break-glass-request.ts` | 35 | D-37 |
| `rbac-policy.ts` | 35 | D-37 |
| `search-index-config.ts` | 42 | D-01 |

**Total: 15 new entities**

### New Engines Required

| Engine | Spec(s) | Layer |
|---|---|---|
| `rule-validation-engine.ts` | 34 | Layer 3 |
| `rule-execution-engine.ts` | 34 | Layer 3 |
| `suppression-engine.ts` | 34 | Layer 3 |
| `decision-explainability-engine.ts` | 36 | Layer 3 |
| `mission-impact-engine.ts` | 37 | Layer 5 |
| `temporal-posture-lookup-engine.ts` | 39 | Layer 3 |
| `inverse-discovery-engine.ts` | 40 | Layer 2 |
| `secondary-resolution-engine.ts` | 40 | Layer 2 |
| `internal-risk-lifecycle-engine.ts` | 41 | Layer 5 |
| `jurisdiction-enforcement-engine.ts` | 41 | Layer 5 |
| `universal-search-engine.ts` | 42 | Cross-cutting |
| `strategy-runtime-engine.ts` | 43 | Cross-cutting |
| `strategy-simulation-engine.ts` | 43 | Cross-cutting |
| `tenant-isolation-guard.ts` | 35 | Cross-cutting |

**Total: 14 new engines**

### New Pages Required

| Page Route | Spec(s) | Nav Group |
|---|---|---|
| `/strategy/centre` | 43 | Settings/Strategy |
| `/strategy/simulation` | 43 | Settings/Strategy |
| `/strategy/audit-history` | 43 | Settings/Strategy |
| `/platform/rules/simulation` | 34, 36 | Platform |
| `/platform/rules/validation` | 34 | Platform |
| `/platform/models/lifecycle` | 36 | Platform |
| `/governance/decisions` | 36 | Governance |
| `/control-plane/entitlements` | 38 | Control Plane |
| `/coverage/blindspots` | 40 | Coverage |
| `/identity/internal-risk` | 41 | Identity |
| `/settings/jurisdiction` | 41 | Settings |
| `/settings/missions` | 37 | Settings |
| `/settings/security` | 35 | Settings |

**Total: ~13–15 new pages** (some may be sub-routes or augmentations)

### Major Entity Augmentations Required

| Entity | Changes | Spec(s) |
|---|---|---|
| `pre-warned-classification.ts` | Add PRE_WARNED/PROTECTED/NOVEL model (or create parallel entity) | 39 |
| `mission.ts` | Add criticality, scope, binding rules, P0 policy, routing profile, review metadata | 37 |
| `platform-management.ts` | Add versioning metadata, rollback state, effective-date, approver, simulation-ref | 34, 36 |
| `case-lifecycle.ts` | Add Verdict Pattern case type with 6-phase lifecycle | 41 |
| `normalisation-layer.ts` | Add failure-trigger routing to inverse discovery | 40 |
| `audit-event.ts` | Add search audit, classification audit, inverse-discovery audit event types | 39, 40, 42 |

### New Use Cases Required

Approximately **38–60 new use case registrations** needed (UC-059 through UC-118 estimated), covering:
- Drift/rule lifecycle operations (8)
- Platform security operations (6)
- Decision governance operations (6)
- Mission binding operations (5)
- Control Plane entitlements (5)
- Pre-warned classification (6)
- Inverse discovery (5)
- Internal risk lifecycle (8)
- Universal search (3)
- Strategy runtime (8)

---

## 4. Recommended Build Order

Order respects dependency chains, places shared infrastructure early, and sequences least-work-first within tiers.

| Priority | Spec | Rationale |
|---|---|---|
| **1** | 43 — Strategy Layer Runtime Surface | Build-blocking for case management, routing, validation, closure. Entity already exists (strategy.ts) — needs engines and pages. Foundation for Specs 34, 36, 37. |
| **2** | 35 — Platform Security and Hardening | Cross-cutting security contracts needed by all other specs. No entity backing yet. |
| **3** | 42 — Universal Search | Smallest scope (6 requirements). Self-contained. UI component shell exists. |
| **4** | 38 — Commercial Control Plane UI | Entities exist (customer, licence, deployment, tenant-config, support-operation). Pages exist. Gaps are limited to entitlements and operator home. |
| **5** | 37 — Mission Objective Binding Model | Entity partially exists. Medium scope. Depends on Spec 43 strategy surface. |
| **6** | 34 — Drift and Rule Engine | Large scope but entity/engine shells exist. Depends on Spec 43 (strategy) being available. |
| **7** | 36 — Rule/Model/Decision Governance Surface | Depends on Spec 34 (rule runtime). Adds governance layer on top. |
| **8** | 40 — Inverse Discovery Loop | Greenfield. No existing coverage. Required by Spec 39. |
| **9** | 39 — Pre-Warned/Protected/Novel Classification | Critical semantic mismatch to resolve. Depends on Spec 40. Entity exists but needs major restructuring. |
| **10** | 41 — Internal Risk Investigation Sub-Lifecycle | Largest gap count (16/17 requirements unmet). Most complex jurisdictional/boundary requirements. Depends on Specs 35, 39. |

---

## 5. Risk Notes

1. **Spec 39 semantic conflict:** The existing `pre-warned-classification.ts` implements a severity escalation model, NOT the temporal posture accountability model required by Spec 39. A design decision is needed: replace, parallel-entity, or restructure.

2. **Spec 43 is blocking:** The Strategy Layer Runtime Surface is explicitly build-blocking per its own Req 24. Many other specs depend on strategy surfaces. This should be prioritised.

3. **Spec 35 is foundational:** Platform Security requirements (RBAC, tenant isolation, break-glass) are prerequisites for every spec that mentions "RBAC," "tenant scope," or "audit" — which is all of them.

4. **Use case count explosion:** The 10 specs imply ~40–60 new use case registrations. USE_CASE_REGISTER.md will need a significant expansion pass.

5. **No application code yet:** All specs are "Planned / Kiro-ready" — they are planning artefacts. The work enumerated here is contract/entity/engine/page scaffold work, not runtime implementation.

---

*End of audit.*
