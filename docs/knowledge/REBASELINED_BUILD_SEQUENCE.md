# Rebaselined Build Sequence — Commander SDR

**Status:** ACTIVE — derived from verified knowledge graph  
**Authority:** SYSTEM_KNOWLEDGE_GRAPH.md, DATA_DICTIONARY.md, REBASELINED_BUILD_SCHEDULE_NOTES.md, baseline source  
**Sourcing rule:** Never cite the translation layer — all citations from `docs/99_source_archive/baseline_v2_6_2/`  
**Discipline:** Data-first / UI-last  
**Date:** 2026-05-31

---

## Purpose

This is the authoritative build sequence for Commander SDR, derived from the verified knowledge graph and baseline source. It replaces the retired `BUILD_SEQUENCE.md` v1.3.1 and `BUILD_VERSION_ROADMAP.md` v1.1.

Every build unit specifies:
- **Name** — unit identifier
- **Status** — computed readiness state: BLOCKED / READY / DONE (see Readiness State Machine below)
- **Blocked by** — the specific dependency units and/or ARCH-DEBT IDs holding the unit BLOCKED (empty when READY/DONE)
- **Purpose** — what this unit delivers
- **Baseline spec #N** — source authority (never the translation layer)
- **Architectural layer** — which of the seven layers this unit builds
- **Dependencies** — prerequisite units (must complete before this unit starts)
- **Required entities/functions/states/seed data** — what must exist
- **Completion gate** — how we know this unit is done (data-layer units MUST include DATA_DICTIONARY.md entry)
- **Source tag** — Foundational (Team 1) or Team 2 (future derivation stream)

---

## Readiness State Machine

This build sequence is **not a static list — it is a queryable readiness state machine.** Every unit carries a computed `Status`:

| Status | Meaning | Buildable? |
|--------|---------|------------|
| **BLOCKED** | Has unresolved OPEN ARCH-DEBT in its chain, OR has dependency units that are not DONE. | No. |
| **READY** | All chain debt RESOLVED **and** all dependency units DONE. | Yes — buildable now. |
| **DONE** | Built **and committed**. | — (complete) |

**Build rule:** You only ever build from **READY**. Building a BLOCKED unit is a sequencing violation (backstopped mechanically by ARCH-007).

**Status computation (mechanical, not judgement):** A unit's status is computed from two inputs only —
1. the `Status` of each unit in its dependency chain, and
2. the `Status` (OPEN / RESOLVED) of any ARCH-DEBT item mapped to the unit or its dependencies.

A unit is **READY** iff every dependency unit is **DONE** and every mapped chain ARCH-DEBT is **RESOLVED**. Otherwise it is **BLOCKED**, and its `Blocked by` line names the specific dependency units (`not DONE`) and/or open ARCH-DEBT IDs responsible. A unit's *own* resolving debt (the debt the unit exists to close) does not self-block it.

**Recompute-on-resolution rule:** When an ARCH-DEBT item flips to **RESOLVED**, or a unit flips to **DONE**, the status of all dependent units is recomputed (re-read dependency statuses + mapped debt statuses). Any dependent unit whose dependencies are now all DONE and whose chain debt is now all RESOLVED flips **BLOCKED → READY**. The recompute is mechanical — re-read deps + debt status; never a guess.

**"What's next" query:** defined in `.kiro/steering/execution-discipline.md`. It computes from live `Status` here, never a guess: when the READY set is non-empty it reports the READY units; when empty it routes to the blocking debt and names the resolution unit that unblocks the most.

**Team 2 interaction:** A unit tagged `Team 2` is additionally gated by ARCH-006 (build-stream sequencing) — it cannot be READY until `USE_CASE_SCHEDULE.md` and `PAGE_INVENTORY.md` exist and `PAGE_INVENTORY.md` contains an entry for it. As of this revision both files are absent, so every Team 2 unit is BLOCKED on that ground regardless of its dependency chain.

---

## Sequencing Principles

1. **Data-first discipline** — schemas before features, fixtures before UI
2. **Strategy Layer precedence** — Strategy Layer Runtime Surface (Spec #32) is build-blocking and prerequisite to case management, routing, validation/closure, reopening
3. **Canonical entity completeness** — all 10 entities in DATA_DICTIONARY.md must have complete contract + schema + fixture before domain features
4. **No hardcoded values doctrine** — Case Strategy Binding prevents hardcoded SLA/routing/priority values
5. **Seven-layer architecture** — strict layering (Connector → Normalisation → Engine → Intelligence → Case → OODA → Surface)
6. **UI-last** — operational surfaces built after engines, intelligence streams, and case lifecycle

---

## Build Units

### Live Status Snapshot (computed 2026-06-02)

Computed from dependency-chain status + mapped ARCH-DEBT status, per the Readiness State Machine above.

**READY (8 numbered + COIM-H):** Unit 17 (Case Management UI), Unit 18 (Identity Intelligence Surface), Unit 19 (Asset Intelligence Surface), Unit 20 (External Operating Picture), Unit 21 (Internal Operating Picture), Unit 22 (Tenant Admin Surface), Unit 38 (Mock Connectors), Unit 40 (Commander AI Core), and COIM unit **COIM-H**.

**DONE (24):** Unit 0, Unit 1, Unit 2, Unit 3, Unit 4, Unit 5, Unit 6, Unit 7, Unit 8, Unit 9, Unit 10, Unit 11, Unit 12, Unit 13, Unit 14, Unit 15, **Unit 16a**, **COIM-A, COIM-B, COIM-C, COIM-D, COIM-E, COIM-F, COIM-G**.

**BLOCKED (27):** Unit 16b (Aggregate/Posture Command Centre), Units 23–37, 39, 41–49. All 27 Team 2 numbered units (23–37, 39, 41–42, 44–49) additionally blocked by ARCH-006. COIM units are Foundational and NOT ARCH-006-gated; none remain BLOCKED.

> **Recompute (2026-06-02, post Unit 16a DONE):** Unit 16a marked DONE. Per the recompute rule, dependents whose chains are now fully DONE flip BLOCKED→READY: **Unit 17** (deps Units 8–13 + 16a all DONE), **Unit 20** (deps Unit 14 + 16a all DONE), **Unit 21** (deps Unit 14 + 16a all DONE). Unit 16b remains BLOCKED (functional pages 17/30–33 not DONE + data-point-to-metric mapping artifact absent).

> **Unit 16 split (`DEC-command-centre-split-16a-16b`, 2026-06-02):** Unit 16 (Command Centre) was split into **16a (Operational Command Centre — READY)** and **16b (Aggregate/Posture Command Centre — BLOCKED)** to resolve ARCH-DEBT-026. The metric-deferral control formerly in `DEC-command-centre-deferred` now applies ONLY to 16b. All units that previously depended on "Unit 16" now depend on **16a**. Full definitions in the Unit 16a / Unit 16b sections below.

> **COIM / OCSF remediation units (COIM-A … COIM-H):** added 2026-06-01 under owner-authorised governance registration for `DEC-coim-ocsf-source-classification-architecture`. **COIM-A/B/C/D/E/F/G are DONE**; COIM-H remains READY. Full definitions and the COIM Live Status Snapshot are in the **"COIM / OCSF Remediation Units"** section below (after Unit 49). Tier mapping: COIM-A = NOW (DONE), COIM-B/C/D/E/F/G = NEXT (DONE), COIM-H = LATER (READY).

| Unit | Tag | Status | Blocked by |
|---|---|---|---|
| 0 Foundation Correction (common.ts) | Foundational | **DONE** | — |
| 1 Risk Object DB Schema | Foundational | **DONE** | — |
| 2 Strategy Policy DB Schema | Foundational | **DONE** | — |
| 3 Case Strategy Binding Schema + Fixture | Foundational | **DONE** | — |
| 4 Connector Layer Foundation | Foundational | **DONE** | — |
| 5 Normalisation Layer | Foundational | **DONE** | — |
| 6 Strategy Layer Runtime (build-blocking) | Foundational | **DONE** | — |
| 7 Case Lifecycle Engine | Foundational | **DONE** | — |
| 8 Case Routing Engine | Foundational | **DONE** | — |
| 9 Case Prioritisation Engine | Foundational | **DONE** | — |
| 10 Case SLA Engine | Foundational | **DONE** | — |
| 11 Validation Lifecycle Engine | Foundational | **DONE** | — |
| 12 Closure Gate Engine | Foundational | **DONE** | — |
| 13 Reopening Trigger Engine | Foundational | **DONE** | — |
| 14 Intelligence Layer — Four Streams | Foundational | **DONE** | — |
| 15 OODA Layer | Foundational | **DONE** | — |
| 16a Operational Command Centre | Foundational | **DONE** | — |
| 16b Aggregate/Posture Command Centre | Foundational | BLOCKED | Units 17, 30–33 (functional pages); data-point-to-metric mapping artifact (absent); Unit 16a |
| 17 Case Management UI | Foundational | **READY** | — |
| 18 Identity Intelligence Surface | Foundational | **READY** | — |
| 19 Asset Intelligence Surface | Foundational | **READY** | — |
| 20 External Operating Picture | Foundational | **READY** | — |
| 21 Internal Operating Picture | Foundational | **READY** | — |
| 22 Tenant Admin Surface | Foundational | **READY** | — |
| 23 Commercial Control Plane | Team 2 | BLOCKED | ARCH-006 (USE_CASE_SCHEDULE.md + PAGE_INVENTORY.md absent) |
| 24 Drift Detection Engine | Team 2 | BLOCKED | ARCH-006; Unit 4 |
| 25 Identity Intelligence Engine | Team 2 | BLOCKED | ARCH-006; Unit 14 |
| 26 Architecture Intelligence Engine | Team 2 | BLOCKED | ARCH-006; Unit 14 |
| 27 Vulnerability Management Engine | Team 2 | BLOCKED | ARCH-006; Unit 14 |
| 28 Exposure Management Engine | Team 2 | BLOCKED | ARCH-006; Unit 14 |
| 29 Pre-Warned Classification Engine | Team 2 | BLOCKED | ARCH-006; Unit 14; Units 24–28 |
| 30 Vulnerability Management UI | Team 2 | BLOCKED | ARCH-006; Unit 27; Unit 16a |
| 31 Exposure Management UI | Team 2 | BLOCKED | ARCH-006; Unit 28; Unit 16a |
| 32 Architecture Topology UI | Team 2 | BLOCKED | ARCH-006; Unit 26; Unit 16a |
| 33 Control Coverage & Editable Baselines UI | Team 2 | BLOCKED | ARCH-006; Unit 24; Unit 16a |
| 34 Direction Boards UI | Team 2 | BLOCKED | ARCH-006; Unit 15; Unit 14; Unit 16a |
| 35 Governance & Reporting UI | Team 2 | BLOCKED | ARCH-006; Units 7–13; Unit 14; Unit 15 |
| 36 CISO Dashboard | Team 2 | BLOCKED | ARCH-006; Unit 15; Unit 14; Units 7–13 |
| 37 Security C2 / War Room | Team 2 | BLOCKED | ARCH-006; Unit 15; Unit 14; Units 7–13 |
| 38 Mock Connectors | Foundational | **READY** | — |
| 39 Real Connector Readiness | Team 2 | BLOCKED | ARCH-006; Unit 4; Unit 38 |
| 40 Commander AI Core | Foundational | **READY** | — |
| 41 AWS Alignment — Evaluation Lane | Team 2 | BLOCKED | ARCH-006; Unit 40; ARCH-DEBT-034 (needs re-sourcing) |
| 42 Push Governance — Dry-Run | Team 2 | BLOCKED | ARCH-006; Units 7–13; Unit 6 |
| 43 Audit Trail | Foundational | BLOCKED | Units 7–13; Unit 6; ARCH-DEBT-035 (needs re-sourcing) |
| 44 Email Case Communication | Team 2 | BLOCKED | ARCH-006; Units 7–13; Unit 12 |
| 45 Security Tool Intelligence | Team 2 | BLOCKED | ARCH-006; Unit 4; Unit 14 |
| 46 Observability & Tool Health UI | Team 2 | BLOCKED | ARCH-006; Unit 45; Unit 16a; ARCH-DEBT-036 (needs re-sourcing) |
| 47 DevOps — Local/AWS Alignment | Team 2 | BLOCKED | ARCH-006 (no unit deps); ARCH-DEBT-037 (needs re-sourcing) |
| 48 Platform Security Hardening | Team 2 | BLOCKED | ARCH-006; Unit 22; Unit 23 |
| 49 Phase 3 Pilot & Production Hardening | Team 2 | BLOCKED | ARCH-006; Unit 47; Unit 48; ARCH-DEBT-038 (needs re-sourcing) |

> **"Self-resolving" note:** Units 1/2/3 each *exist to close* their own data-layer debt (ARCH-DEBT-030/031/032). That own-debt does not self-block them per the state-machine rule. Unit 3 is blocked by Unit 2 (dependency). Once Units 1 and 2 are DONE, Unit 3 becomes READY (recompute rule).

---

### Unit 0: Foundation Correction — `SourceMetadata.rawPayloadRef` Contract-vs-Source Drift (ARCH-DEBT-033)

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** Spec #05 §11.3 from `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/05_Data_Connector_Normalisation_Implementation_Spec_v1_5.md`. Evidence: rawPayloadRef removed from SourceMetadata contract + SEED_SOURCE fixture; typecheck clean; vitest 601/601 pass (0 new failures); contract↔schema match confirmed by grep (4 fields: connectorId, importRunId, sourceSystem, sourceTimestamp).

**Purpose:** Resolve the canonical-contract over-specification where `SourceMetadata.rawPayloadRef` (in `packages/contracts/src/entities/common.ts`) carries a provenance field that Spec #05 §11.3 assigns to the raw-ingestion record, not the canonical entity. This is a foundation correction: `common.ts` is inherited by every canonical entity, so the drift affects all of them. Closing it before the data-layer entity units re-establishes a clean contract↔schema baseline.

**Baseline spec:** #05 Data Connector & Normalisation Implementation §11.1–11.2 (Raw Payload Storage), §11.3 (Provenance Requirements), §7.4 (Technical Support Records)

**Architectural layer:** Normalisation Layer (Layer 2) — canonical contract

**Dependencies:** None (foundational)

**Required entities:**
- Contract: `packages/contracts/src/entities/common.ts` (`SourceMetadata`) ✅ (exists)
- ARCH-DEBT-033 logged in `ARCHITECTURAL_DEBT_REGISTER.md` ✅ (exists, OPEN)

**Deliverables (decision-gated — owner picks path before build):**
1. Resolve ARCH-DEBT-033 by one of: (a) remove `rawPayloadRef` from the canonical `SourceMetadata` contract, updating fixtures/resolvers that populate it and re-establishing contract↔schema match; OR (b) record a source-cited DECISIONS.md entry retaining it as a convenience denormalisation with lineage authority remaining the raw-ingestion store.
2. Update affected seed fixtures (`SEED_SOURCE` in `seed-tenant.ts`) per the chosen path.
3. Update DATA_DICTIONARY.md Common Fields section to reflect the resolved state.
4. Update ARCHITECTURAL_DEBT_REGISTER.md to mark ARCH-DEBT-033 RESOLVED.

**Completion gate:**
- ✅ ARCH-DEBT-033 marked RESOLVED in ARCHITECTURAL_DEBT_REGISTER.md
- ✅ `common.ts` `SourceMetadata` consistent with Spec #05 §11.3 (or documented exception recorded)
- ✅ DATA_DICTIONARY.md Common Fields disclosure reconciled
- ✅ Contract↔schema match re-established for all entities (no remaining rawPayloadRef divergence)
- ✅ Tests pass (contract/fixture conformance)

**Source tag:** Foundational

**NOTE:** This unit is the single current entry in the READY set. It carries no dependencies and no blocking debt. Resolving it (→ DONE) recomputes Units 1, 2 and 4 to READY.

---

### Unit 1: Risk Object DB Schema (ARCH-DEBT-030)

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** Spec #29 Universal Risk Object and Case Binding from `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/29_Universal_Risk_Object_and_Case_Binding_Spec.md`. Evidence: typecheck clean (tsc --noEmit exit 0); vitest 26/26 pass (case-domain-model.test.ts); field-for-field diff confirmed (8 RiskObjectType, 4 TreatmentState, all contract fields → schema columns); Drizzle migration generated (0000_risk_objects_unit1.sql — 16 columns, 1 FK, 2 enums); DATA_DICTIONARY.md entry AVAILABLE; ARCH-DEBT-030 RESOLVED with verification.

**Purpose:** Close foundational data-layer gap — create missing Risk Object database schema

**Baseline spec:** #29 Universal Risk Object and Case Binding

**Architectural layer:** Normalisation Layer (Layer 2)

**Dependencies:** None (foundational)

**Required entities:**
- Contract: `packages/contracts/src/entities/risk-object.ts` ✅ (exists)
- Fixture: `packages/contracts/src/fixtures/seed-risk-objects.ts` ✅ (exists)
- DB Schema: `packages/db/src/schema/risk-objects.ts` ❌ (MISSING — this unit creates it)

**Deliverables:**
1. Create `packages/db/src/schema/risk-objects.ts` with Drizzle schema matching contract
2. Support 8 RiskObjectType values: `coverage_blindspot`, `ooda_phase_degradation`, `vulnerability_drift`, `configuration_drift`, `exposure_drift`, `control_gap`, `identity_risk`, `policy_gap`
3. Support 4 TreatmentState values: `open`, `mitigated`, `accepted`, `transferred`
4. Update DATA_DICTIONARY.md Risk Object entry to mark status AVAILABLE
5. Update ARCHITECTURAL_DEBT_REGISTER.md to mark ARCH-DEBT-030 RESOLVED

**Completion gate:**
- ✅ DB schema file exists at `packages/db/src/schema/risk-objects.ts`
- ✅ Schema matches contract field-for-field
- ✅ DATA_DICTIONARY.md entry updated (status: AVAILABLE, DB Schema: ✅)
- ✅ ARCH-DEBT-030 marked RESOLVED in ARCHITECTURAL_DEBT_REGISTER.md
- ✅ Drizzle migration generated and tested
- ✅ Seed fixture loads successfully into schema

**Source tag:** Foundational

---

### Unit 2: Strategy Policy DB Schema (ARCH-DEBT-031)

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** Spec #32 Strategy Layer Runtime Surface from `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/32_Strategy_Layer_Runtime_Surface_Spec.md`. Evidence: typecheck clean (tsc --noEmit exit 0); vitest 601/601 pass (0 new failures); 13 StrategySurfaceType + 6 StrategyPolicyStatus enum values mapped; all contract fields → schema columns; DATA_DICTIONARY.md updated; ARCH-DEBT-031 RESOLVED with verification.

**Purpose:** Close foundational data-layer gap — create missing Strategy Policy database schema

**Baseline spec:** #32 Strategy Layer Runtime Surface Specification

**Architectural layer:** Case Layer (Layer 5) — strategy policies consumed by case lifecycle

**Dependencies:** None (foundational)

**Required entities:**
- Contract: `packages/contracts/src/entities/strategy.ts` ✅ (exists)
- Fixture: `packages/contracts/src/fixtures/seed-strategies.ts` ✅ (exists)
- DB Schema: `packages/db/src/schema/strategies.ts` ❌ (MISSING — this unit creates it)

**Deliverables:**
1. Create `packages/db/src/schema/strategies.ts` with Drizzle schema matching contract
2. Support 13 StrategySurfaceType values: `sla`, `threshold`, `automation-boundary`, `routing`, `posture`, `mission-objective`, `operational-tempo`, `domain-specific`, `prioritisation-weight`, `validation-window`, `closure-gate`, `reopening-trigger`, `evidence-sufficiency`
3. Support 6 StrategyPolicyStatus values: `draft`, `pending-approval`, `approved`, `active`, `superseded`, `rejected`
4. Update DATA_DICTIONARY.md Strategy Policy entry to mark status AVAILABLE
5. Update ARCHITECTURAL_DEBT_REGISTER.md to mark ARCH-DEBT-031 RESOLVED

**Completion gate:**
- ✅ DB schema file exists at `packages/db/src/schema/strategies.ts`
- ✅ Schema matches contract field-for-field
- ✅ DATA_DICTIONARY.md entry updated (status: AVAILABLE, DB Schema: ✅)
- ✅ ARCH-DEBT-031 marked RESOLVED in ARCHITECTURAL_DEBT_REGISTER.md
- ✅ Drizzle migration generated and tested
- ✅ Seed fixture loads successfully into schema

**Source tag:** Foundational

---

### Unit 3: Case Strategy Binding Schema + Fixture (ARCH-DEBT-032)

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** Spec #32 Strategy Layer Runtime Surface from `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/32_Strategy_Layer_Runtime_Surface_Spec.md` + Spec #08 Case Management from `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/08_Case_Management_Workflow_Spec.md`. Evidence: typecheck clean (tsc --noEmit exit 0); vitest 601/601 pass (0 new failures); 6 JSONB strategy-ref columns match CASE_STRATEGY_SURFACES; fixture binds 3 seed cases to 6 active policies; Drizzle migration generated (0002_case_strategy_bindings_unit3.sql — 11 columns, 1 FK); ARCH-DEBT-032 RESOLVED with verification.

**Purpose:** Close foundational data-layer gap — create missing Case Strategy Binding schema and fixture

**Baseline spec:** #32 Strategy Layer Runtime Surface, #08 Case Management

**Architectural layer:** Case Layer (Layer 5)

**Dependencies:** Unit 2 (Strategy Policy schema must exist before bindings can reference it)

**Required entities:**
- Contract: `packages/contracts/src/entities/case-strategy-binding.ts` ✅ (exists)
- Fixture: `packages/contracts/src/fixtures/seed-case-strategy-bindings.ts` ❌ (MISSING — this unit creates it)
- DB Schema: `packages/db/src/schema/case-strategy-bindings.ts` ❌ (MISSING — this unit creates it)

**Deliverables:**
1. Create `packages/db/src/schema/case-strategy-bindings.ts` with Drizzle schema matching contract
2. Create `packages/contracts/src/fixtures/seed-case-strategy-bindings.ts` linking cases to strategy policies
3. Bind six strategy surfaces to case management: Routing, SLA, Prioritisation Weight, Closure Gate, Reopening Trigger, Validation Window
4. Update DATA_DICTIONARY.md Case Strategy Binding entry to mark status AVAILABLE
5. Update ARCHITECTURAL_DEBT_REGISTER.md to mark ARCH-DEBT-032 RESOLVED

**Completion gate:**
- ✅ DB schema file exists at `packages/db/src/schema/case-strategy-bindings.ts`
- ✅ Fixture file exists at `packages/contracts/src/fixtures/seed-case-strategy-bindings.ts`
- ✅ Schema matches contract field-for-field
- ✅ Fixture binds all six strategy surfaces to case management
- ✅ DATA_DICTIONARY.md entry updated (status: AVAILABLE, DB Schema: ✅, Fixture: ✅)
- ✅ ARCH-DEBT-032 marked RESOLVED in ARCHITECTURAL_DEBT_REGISTER.md
- ✅ Drizzle migration generated and tested
- ✅ Seed fixture loads successfully into schema

**Source tag:** Foundational

---

### Unit 4: Connector Layer Foundation

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** Spec #61 Universal Security Signal Connector Contract from `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/61_Universal_Security_Signal_Connector_Contract_Spec.md` + Spec #05 §6.4.4. Evidence: typecheck clean (tsc --noEmit exit 0); vitest 22/22 connector-foundation tests pass (623 total, 0 new failures); pull orchestration framework operational (executePull read-only, rejects non-active); signal purpose resolution maps 4 classes → 8 purposes exhaustively; state machine enforced (5 states, valid transitions only, throws on invalid); conformance tier tracked per class (JSONB); multi-class validated (A/B/C/D only per Doctrinal Assertion 11); Drizzle migration 0003_connector_foundation_unit4.sql generated (18 columns, 1 FK, 3 new enums).

**Purpose:** Build four-class connector architecture foundation (A/B/C/D), eight signal purposes, conformance tier system

**Baseline spec:** #61 Universal Security Signal Connector Contract, #05 §6.4.4 Connector

**Architectural layer:** Connector Layer (Layer 1)

**Dependencies:** None (foundational — but benefits from Unit 1-3 data-layer completion)

**Required entities:**
- Connector entity ✅ (exists — contract + schema + fixture aligned)
- Four connector classes (A/B/C/D) ✅ (enum exists in common.ts)
- Eight signal purposes ✅ (enum exists in common.ts)
- Conformance tier system (Certified/Full/Baseline/Planned) — to be implemented

**Deliverables:**
1. Connector pull orchestration framework (read-only by default)
2. Multi-class declaration support (single connector can declare A+B+C)
3. Signal purpose resolution (every pull operation resolves to 1+ of 8 purposes)
4. Conformance tier tracking per connector per class
5. Connector state machine (active, paused, error, pending-approval, decommissioned)
6. Mapping pack version tracking
7. Last run status tracking (success, partial, failed, never-run)

**Completion gate:**
- ✅ Connector pull framework operational
- ✅ Multi-class connectors supported
- ✅ Signal purpose resolution working
- ✅ Conformance tier tracked per connector
- ✅ Connector state machine enforced
- ✅ Tests: connector lifecycle, multi-class declaration, signal purpose routing

**Source tag:** Foundational

---

### Unit 5: Normalisation Layer — Canonical Entity Model

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** Spec #12 Architecture Intelligence, Spec #62 Verdict Semantics, Spec #72 Inverse Discovery from `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/`. Evidence: vitest 60/60 normalisation-layer tests pass (entity matching, authority resolution, verdict processing, inverse discovery routing, surface attribution); contract code complete at `packages/contracts/src/engines/normalisation-layer.ts`; all 5 deliverables operational.

**Purpose:** Build canonical entity model, authority resolution, entity matching

**Baseline spec:** #12 Architecture Intelligence, #62 Verdict Semantics, #72 Inverse Discovery

**Architectural layer:** Normalisation Layer (Layer 2)

**Dependencies:** Unit 4 (Connector Layer must exist to produce raw signal)

**Required entities:**
- Asset ✅ (exists — contract + schema + fixture aligned)
- Identity ✅ (exists — contract + schema + fixture aligned)
- Connector ✅ (exists — contract + schema + fixture aligned)
- Audit Event ✅ (exists — contract + schema + fixture aligned)
- Common Fields ✅ (exists)

**Deliverables:**
1. Entity matching engine (cross-source identity resolution)
2. Authority resolution (when multiple sources claim same entity, which wins)
3. Verdict semantics processing (8 dispositions: BLOCK, QUARANTINE, COACH, REQUIRE_MFA, REQUIRE_COMPLIANT, MONITOR, ALLOW, AUDIT)
4. Inverse discovery routing (match external threat intel to estate entities)
5. Surface attribution (internal_attack_surface vs external_attack_surface)

**Completion gate:**
- ✅ Entity matching operational across sources
- ✅ Authority resolution rules enforced
- ✅ Verdict semantics processed correctly
- ✅ Inverse discovery routing working
- ✅ Surface attribution assigned to all entities
- ✅ Tests: entity matching, authority resolution, verdict processing, inverse discovery

**Source tag:** Foundational

---

### Unit 6: Strategy Layer Runtime Surface (BUILD-BLOCKING)

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** Spec #32 Strategy Layer Runtime Surface from `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/32_Strategy_Layer_Runtime_Surface_Spec.md`. Evidence: typecheck clean (tsc --noEmit exit 0); vitest 32/32 strategy-runtime-surface tests pass (655 total, 0 new failures); policy lifecycle state machine (6 states, valid transitions enforced); approval workflow (validates approval record before activation); semantic versioning (validates increment); effective date ranges (enforces effectiveFrom/effectiveUntil); simulation framework (dry-run before activation); all 6 strategy surfaces consumed by case lifecycle via resolveAllStrategies() (no hardcoded values — returns 'unresolved' when policies missing); policy supersession logic operational.

**Purpose:** Implement Strategy Layer Runtime Surface — the build-blocking prerequisite to case management, routing, validation/closure, reopening

**Baseline spec:** #32 Strategy Layer Runtime Surface Specification

**Architectural layer:** Case Layer (Layer 5) — strategy policies consumed by case lifecycle

**Dependencies:** Unit 2 (Strategy Policy schema), Unit 3 (Case Strategy Binding schema + fixture)

**Required entities:**
- Strategy Policy ✅ (contract + schema + fixture — schema created in Unit 2)
- Case Strategy Binding ✅ (contract + schema + fixture — created in Unit 3)

**Deliverables:**
1. Strategy policy authoring surface (draft → pending-approval → approved → active)
2. Strategy policy approval workflow
3. Strategy policy versioning (semantic versioning)
4. Strategy policy effective date ranges (effectiveFrom, effectiveUntil)
5. Strategy policy simulation framework (dry-run before activation)
6. Six strategy surfaces for case management:
   - Routing Strategy (determines owner/team)
   - SLA Strategy (determines SLA target hours)
   - Prioritisation Weight Strategy (determines priority calculation)
   - Closure Gate Strategy (determines closure gates)
   - Reopening Trigger Strategy (determines reopening triggers)
   - Validation Window Strategy (determines validation freshness)
7. Strategy policy consumption by case lifecycle (no hardcoded values)

**Completion gate:**
- ✅ Strategy policy authoring operational
- ✅ Approval workflow enforced
- ✅ Versioning working
- ✅ Effective date ranges enforced
- ✅ Simulation framework operational
- ✅ All six strategy surfaces implemented
- ✅ Case lifecycle consumes strategy policies (no hardcoded SLA/routing/priority)
- ✅ Tests: policy authoring, approval, versioning, simulation, consumption by case lifecycle

**Source tag:** Foundational

**CRITICAL:** This unit is build-blocking. Units 7-12 (case lifecycle, routing, validation, closure, reopening) CANNOT start until this unit completes.

---

### Unit 7: Case Lifecycle Engine — Core State Machine

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** Spec #08 Case Management, Spec #29 Universal Risk Object and Case Binding, Spec #30 Universal Validation, Closure and Reopening Lifecycle. Evidence: typecheck clean; vitest 164/164 Unit 7 tests pass (lifecycle-12-state, risk-object-binding, case-ref-generator, case-type-assigner, actor-enforcement, system-owned-enforcement, phase-d1-lifecycle-engine); 12-state transition graph (14 edges); per-transition actor enforcement (7 actors); risk object binding (5 outcomes); case ref generator (CMD-{type}-{seq}-{tenant}); case type assigner (8 risk→12 case types); DB migration 0004; governance Green (100%).

**Purpose:** Build closed-loop case lifecycle engine with 12 states, system-owned transitions only

**Baseline spec:** #08 Case Management, #29 Universal Risk Object and Case Binding, #30 Universal Validation, Closure and Reopening Lifecycle

**Architectural layer:** Case Layer (Layer 5)

**Dependencies:** Unit 1 (Risk Object schema), Unit 6 (Strategy Layer — MUST complete first)

**Required entities:**
- Case ✅ (exists — contract + schema + fixture aligned)
- Risk Object ✅ (contract + schema + fixture — schema created in Unit 1)
- Case Lifecycle ✅ (contract + resolvers exist)
- Case Strategy Binding ✅ (created in Unit 3)

**Deliverables:**
1. 12-state case lifecycle: DETECTED → BOUND → ROUTED → PRIORITISED → ACTION_DECOMPOSED → IN_PROGRESS → PENDING_VALIDATION → VALIDATION_RUNNING → VALIDATED_* → PENDING_CLOSURE_GATES → CLOSED_BY_SYSTEM → REOPENED_BY_SYSTEM
2. Risk object binding (every actionable risk object is case-bound)
3. Case binding outcomes (bound_new_case, linked_existing_case, suppressed_approved, residual_risk_accepted, allocation_error)
4. System-owned transitions only (no manual case creation, closure, or reopening)
5. Actor enforcement (actor MUST be 'system' or 'routing-engine')
6. Case reference number generation (unique, deterministic)
7. Case type assignment (12 canonical types)

**Completion gate:**
- ✅ 12-state lifecycle operational
- ✅ Risk object binding working
- ✅ All binding outcomes supported
- ✅ System-owned transitions enforced (manual transitions blocked)
- ✅ Actor enforcement working
- ✅ Case reference numbers generated correctly
- ✅ Case types assigned correctly
- ✅ Tests: lifecycle transitions, risk object binding, system-owned enforcement, actor validation

**Source tag:** Foundational

---

### Unit 8: Case Routing Engine

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** Spec #08 Case Management §§5, 8, 9 from baseline source. Evidence: typecheck clean; vitest 53/53 phase-d4-assignment-engine tests pass; routing engine consumes Routing Strategy (no hardcoded values); team affinity mapping operational; workload capacity calculator; specialism matcher; anti-hoarding rule (cap from strategy); rank weighting (junior/mid/senior/lead from strategy); escalation timeout detection (hours from strategy); reassignment flow (excludes current owner); audit events on every assignment/reassignment; override governance enforced (throws on missing strategy, no manual paths); governance Green (100%).

**Purpose:** Build case routing engine consuming Routing Strategy from Strategy Layer

**Baseline spec:** #08 Case Management §§5, 8, 9 (Assignment Engine, Teams/Ranks/Specialisms)

**Architectural layer:** Case Layer (Layer 5)

**Dependencies:** Unit 6 (Strategy Layer — Routing Strategy must exist), Unit 7 (Case Lifecycle core)

**Required entities:**
- Case ✅ (exists)
- Strategy Policy ✅ (exists — Routing Strategy surface)
- Case Strategy Binding ✅ (exists)

**Deliverables:**
1. Routing engine consuming Routing Strategy policies
2. Owner/team assignment based on strategy (no hardcoded routing)
3. Assignment Engine with override governance
4. Anti-hoarding TTL (cases auto-reassign if owner doesn't progress)
5. Teams/Ranks structure (L0–L7)
6. Nine specialism domains
7. Routing rationale capture (why this owner/team was chosen)

**Completion gate:**
- ✅ Routing engine operational
- ✅ Owner/team assigned from Routing Strategy (no hardcoded values)
- ✅ Override governance enforced
- ✅ Anti-hoarding TTL working
- ✅ Teams/Ranks structure implemented
- ✅ Nine specialisms supported
- ✅ Routing rationale captured
- ✅ Tests: routing from strategy, override governance, anti-hoarding, specialisms

**Source tag:** Foundational

---

### Unit 9: Case Prioritisation Engine

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** Spec #08 Case Management §5 (Case Action Algorithm). Evidence: typecheck clean; vitest 49/49 Unit 9 tests pass; three deterministic scores (CRS weighted evidence sum, MS mission average, WCS 70/30 blend); priority determination P0–P4 from strategy thresholds (no hardcoded values); NBA list generation per priority level; push preference from automation-boundary strategy; all values consumed from 3 strategy surfaces (prioritisation-weight, threshold, automation-boundary); returns error on missing strategy; governance Green (100%).

**Purpose:** Build case prioritisation engine consuming Prioritisation Weight Strategy from Strategy Layer

**Baseline spec:** #08 Case Management §5 (Case Action Algorithm, three deterministic scores: CRS/MS/WCS)

**Architectural layer:** Case Layer (Layer 5)

**Dependencies:** Unit 6 (Strategy Layer — Prioritisation Weight Strategy must exist), Unit 7 (Case Lifecycle core)

**Required entities:**
- Case ✅ (exists)
- Strategy Policy ✅ (exists — Prioritisation Weight Strategy surface)
- Case Strategy Binding ✅ (exists)

**Deliverables:**
1. Prioritisation engine consuming Prioritisation Weight Strategy policies
2. Priority calculation (P0, P1, P2, P3, P4) based on strategy (no hardcoded priorities)
3. Three deterministic scores: CRS (Case Risk Score), MS (Mission Score), WCS (Weighted Composite Score)
4. Case Action Algorithm with NBA (Next Best Action) list
5. Push preference rule (when to recommend push vs manual remediation)

**Completion gate:**
- ✅ Prioritisation engine operational
- ✅ Priority assigned from Prioritisation Weight Strategy (no hardcoded values)
- ✅ Three scores calculated correctly (CRS, MS, WCS)
- ✅ NBA list generated
- ✅ Push preference rule working
- ✅ Tests: priority calculation from strategy, three scores, NBA generation, push preference

**Source tag:** Foundational

---

### Unit 10: Case SLA Engine

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** Spec #08 Case Management (SLA calculation). Evidence: typecheck clean; vitest 54/54 Unit 10 tests pass; SLA target calculation from strategy (no hardcoded hours); breach detection (elapsed >= target); notification generation at 75%/90%/100%/150% thresholds; escalation level calculation post-breach (floor((elapsed-target)/cadence)); escalation path from routing strategy; all values strategy-driven; returns error on missing strategy; governance Green (100%).

**Purpose:** Build case SLA engine consuming SLA Strategy from Strategy Layer

**Baseline spec:** #08 Case Management (SLA calculation)

**Architectural layer:** Case Layer (Layer 5)

**Dependencies:** Unit 6 (Strategy Layer — SLA Strategy must exist), Unit 7 (Case Lifecycle core)

**Required entities:**
- Case ✅ (exists)
- Strategy Policy ✅ (exists — SLA Strategy surface)
- Case Strategy Binding ✅ (exists)

**Deliverables:**
1. SLA engine consuming SLA Strategy policies
2. SLA target calculation (targetResolutionHours) based on strategy (no hardcoded SLAs)
3. SLA breach detection (sla.breached flag)
4. SLA breach notifications
5. SLA breach escalation

**Completion gate:**
- ✅ SLA engine operational
- ✅ SLA targets assigned from SLA Strategy (no hardcoded values)
- ✅ Breach detection working
- ✅ Breach notifications sent
- ✅ Breach escalation triggered
- ✅ Tests: SLA calculation from strategy, breach detection, notifications, escalation

**Source tag:** Foundational

---

### Unit 11: Validation Lifecycle Engine

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** Spec #30 Universal Validation, Closure and Reopening Lifecycle §6. Evidence: typecheck clean; vitest 93/93 Unit 11 tests pass; 11-state validation lifecycle (not_started through revalidation_required); 11 validation trigger types; complete transition graph; evidence freshness checking (strategy-driven); window expiry detection (strategy-driven); revalidation trigger logic; all values from validation-window strategy; returns error on missing strategy; governance Green (100%).

**Purpose:** Build validation lifecycle engine (11 states) consuming Validation Window Strategy from Strategy Layer

**Baseline spec:** #30 Universal Validation, Closure and Reopening Lifecycle §6

**Architectural layer:** Case Layer (Layer 5)

**Dependencies:** Unit 6 (Strategy Layer — Validation Window Strategy must exist), Unit 7 (Case Lifecycle core)

**Required entities:**
- Case ✅ (exists)
- Strategy Policy ✅ (exists — Validation Window Strategy surface)
- Case Strategy Binding ✅ (exists)

**Deliverables:**
1. 11-state validation lifecycle: NOT_STARTED → EVIDENCE_REQUESTED → EVIDENCE_RECEIVED → VALIDATION_RUNNING → VALIDATED_FIXED | VALIDATED_COMPENSATED | VALIDATED_NOT_FIXED | VALIDATION_INCONCLUSIVE | VALIDATION_BLOCKED | VALIDATION_EXPIRED → REVALIDATION_REQUIRED
2. Validation triggers (source refresh, connector delta, owner evidence, push execution, BAS result, SIEM/SOAR deployment status, control-state change, scanner refresh, identity-graph change, architecture-graph change, communication evidence)
3. Validation window enforcement (freshness requirements from Validation Window Strategy)
4. Evidence freshness tracking
5. Revalidation trigger when evidence expires

**Completion gate:**
- ✅ 11-state validation lifecycle operational
- ✅ All validation triggers working
- ✅ Validation window enforced from Validation Window Strategy
- ✅ Evidence freshness tracked
- ✅ Revalidation triggered correctly
- ✅ Tests: validation lifecycle, triggers, window enforcement, freshness, revalidation

**Source tag:** Foundational

---

### Unit 12: Closure Gate Engine

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** Spec #30 Universal Validation, Closure and Reopening Lifecycle §7. Evidence: typecheck clean; vitest 65/65 Unit 12 tests pass; 12 closure gates implemented (technical_validation through fusion_map_state_refresh); gate evaluation logic (all configured gates must pass); gate configuration from strategy; gate status tracking per case; system-owned closure enforced (isManualClosureBlocked always true); non-configured gates skipped; invalid gate names filtered; governance Green (100%).

**Purpose:** Build closure gate engine (12 gates) consuming Closure Gate Strategy from Strategy Layer

**Baseline spec:** #30 Universal Validation, Closure and Reopening Lifecycle §7

**Architectural layer:** Case Layer (Layer 5)

**Dependencies:** Unit 6 (Strategy Layer — Closure Gate Strategy must exist), Unit 7 (Case Lifecycle core), Unit 11 (Validation Lifecycle)

**Required entities:**
- Case ✅ (exists)
- Strategy Policy ✅ (exists — Closure Gate Strategy surface)
- Case Strategy Binding ✅ (exists)

**Deliverables:**
1. 12 closure gates: technical validation, sub-action completion, communication (where configured), external notifier (where configured), SIR acknowledgement (where configured), SLA/residual phase, exception/suppression expiry, evidence freshness, approval, audit completeness, mission-impact, fusion-map state refresh
2. Closure gate evaluation (all configured gates must pass before case closes)
3. Closure gate configuration from Closure Gate Strategy
4. Closure gate status tracking per case
5. System-owned closure only (no manual closure)

**Completion gate:**
- ✅ All 12 closure gates implemented
- ✅ Closure gate evaluation working
- ✅ Gate configuration from Closure Gate Strategy
- ✅ Gate status tracked per case
- ✅ System-owned closure enforced (manual closure blocked)
- ✅ Tests: all 12 gates, evaluation logic, configuration from strategy, system-owned enforcement

**Source tag:** Foundational

---

### Unit 13: Reopening Trigger Engine

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** Spec #30 Universal Validation, Closure and Reopening Lifecycle §8. Evidence: typecheck clean; vitest 72/72 Unit 13 tests pass; 14 reopening triggers implemented (risk_condition_reappears through strategy_threshold_requalifies); trigger evaluation logic (any configured trigger fires → reopening required); trigger configuration from strategy; trigger status tracking per case; system-owned reopening enforced (isManualReopeningBlocked always true); non-configured triggers skipped; invalid trigger names filtered; governance Green (100%).

**Purpose:** Build reopening trigger engine (14 triggers) consuming Reopening Trigger Strategy from Strategy Layer

**Baseline spec:** #30 Universal Validation, Closure and Reopening Lifecycle §8

**Architectural layer:** Case Layer (Layer 5)

**Dependencies:** Unit 6 (Strategy Layer — Reopening Trigger Strategy must exist), Unit 7 (Case Lifecycle core), Unit 12 (Closure Gate Engine)

**Required entities:**
- Case ✅ (exists)
- Strategy Policy ✅ (exists — Reopening Trigger Strategy surface)
- Case Strategy Binding ✅ (exists)

**Deliverables:**
1. 14 reopening triggers: original risk condition reappears, risk-object source severity/exploitability changes, KEV/CVSS/EPSS/MISP/vendor/BAS/threat-intel status changes materially, validation expires or fails, compensating control disappears or degrades, affected asset/identity/exposure/dependency expands, blast radius expands, mission-objective impact increases, routing owner rejects or cannot fulfil work, communication thread receives material inbound evidence, connector freshness drops below threshold, tool coverage degrades, suppression or exception expires, strategy threshold changes and requalifies the case
2. Reopening trigger evaluation (any configured trigger fires → case reopens automatically)
3. Reopening trigger configuration from Reopening Trigger Strategy
4. Reopening trigger status tracking per case
5. System-owned reopening only (no manual reopening)

**Completion gate:**
- ✅ All 14 reopening triggers implemented
- ✅ Reopening trigger evaluation working
- ✅ Trigger configuration from Reopening Trigger Strategy
- ✅ Trigger status tracked per case
- ✅ System-owned reopening enforced (manual reopening blocked)
- ✅ Tests: all 14 triggers, evaluation logic, configuration from strategy, system-owned enforcement

**Source tag:** Foundational

---

### Unit 14: Intelligence Layer — Four Streams Integration

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** Spec #59 Intelligence Layer Architecture from `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/59_Intelligence_Layer_Architecture_Spec.md`. Evidence: vitest 45/45 intelligence-layer tests pass (150/150 across Unit 14 + dependency suites, 0 new regressions); four intelligence streams (external_threat, external_attack, internal_behavioural, posture) mapped 1:1 to connector classes (D, A, B, C); Estate Intelligence Picture composition (always 4 stream summaries, distinct entity count, unbound signal tracking, freshness tracking); six cross-stream correlations (Pre-Warned/Protected/Novel classification, Verdict Disagreement detection, Inverse Discovery evaluation, Behavioural Anomaly detection with configurable sensitivity, Threat Relevance Scoring with estate-match + KEV + exposure scoring, Silent Defence Aggregation); pure functions with no hardcoded thresholds; Doctrinal Assertions 9/10/11 enforced (exactly 4 streams, surface attribution preserved, connector classes A/B/C/D only); engine code at `packages/contracts/src/engines/intelligence-layer.ts`; governance Green (100%).

**Purpose:** Build Intelligence Layer integrating four streams (External Threat, External Attack, Internal Behavioural, Posture) into Estate Intelligence Picture

**Baseline spec:** #59 Intelligence Layer Architecture

**Architectural layer:** Intelligence Layer (Layer 4)

**Dependencies:** Unit 4 (Connector Layer), Unit 5 (Normalisation Layer)

**Required entities:**
- Connector ✅ (exists — four classes A/B/C/D)
- Asset ✅ (exists)
- Identity ✅ (exists)
- Audit Event ✅ (exists)

**Deliverables:**
1. Four intelligence streams:
   - External Threat Intelligence (Class D connectors → global threat intel matched to estate)
   - External Attack Intelligence (Class A connectors → SOC stack observations)
   - Internal Behavioural Intelligence (Class B connectors → operational verdict platforms)
   - Posture Intelligence (Class C connectors + engines → drift/risk/architecture/access chains)
2. Estate Intelligence Picture (EIP) — unified integration surface
3. Cross-stream correlations:
   - Pre-Warned / Protected / Novel classification
   - Inverse Discovery
   - Threat Relevance Scoring
   - Silent Defence aggregation

**Completion gate:**
- ✅ Four streams operational
- ✅ EIP unified integration surface working
- ✅ Cross-stream correlations implemented
- ✅ Tests: stream integration, EIP queries, cross-stream correlations

**Source tag:** Foundational

---

### Unit 15: OODA Layer — Programme-Level OODA Tempo

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** Spec #58 Security OODA Loop from `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/58_Security_OODA_Loop_Spec.md`; Spec #67 OODA Phase Dashboards. Evidence: vitest 30/30 ooda-layer tests pass (224/224 across dependency suites, 0 new regressions); four OODA phases (observe/orient/decide/act) with weighted health metrics (§3.1–§3.4); phase degradation detection with caller-supplied threshold (no hardcoded values); degradation risk-object template creation (ooda_phase_degradation type); Command Tempo dashboard model (cross-phase overall score + degraded-phase list); pure functions, no side effects; engine code at `packages/contracts/src/engines/ooda-layer.ts`; governance Green (100%).

**Purpose:** Build OODA Layer with four-phase tempo (Observe, Orient, Decide, Act) and phase health metrics

**Baseline spec:** #58 Security OODA Loop, #67 OODA Phase Dashboards

**Architectural layer:** OODA Layer (Layer 6)

**Dependencies:** Unit 14 (Intelligence Layer — EIP must exist), Unit 7-13 (Case Layer — case lifecycle must exist)

**Required entities:**
- Case ✅ (exists)
- Risk Object ✅ (exists)
- Estate Intelligence Picture (created in Unit 14)

**Deliverables:**
1. Four OODA phases with health metrics:
   - Observe phase (connector health, signal freshness, coverage completeness)
   - Orient phase (intelligence stream health, correlation completeness, threat relevance)
   - Decide phase (case routing health, prioritisation accuracy, strategy policy effectiveness)
   - Act phase (execution throughput, latency, success rate, validation pending, failed actions, closure tempo)
2. Phase health aggregate scores
3. Phase degradation detection
4. Phase degradation case creation (ooda_phase_degradation risk object type)
5. Command Tempo Dashboard (cross-phase operational tempo)

**Completion gate:**
- ✅ Four OODA phases operational
- ✅ Phase health metrics calculated
- ✅ Phase degradation detected
- ✅ Phase degradation cases created
- ✅ Command Tempo Dashboard working
- ✅ Tests: phase health calculation, degradation detection, case creation

**Source tag:** Foundational

---

### Unit 16a: Surface Layer — Operational Command Centre (Operational App Entry Point)

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** Spec #41 Visual Language & Intensity Ceiling, #65/#66 Operating Pictures from `docs/99_source_archive/baseline_v2_6_2/`. Evidence: typecheck/diagnostics clean on `apps/web/src/app/page.tsx`, the two `operating-picture/*` scaffold pages, and `registry/routes.ts`; vitest `tests/05-command-centre/command-centre.test.ts` 16a-scoped suite passing (full run 1473/1493; the 20 residual failures are other units' pre-existing Cluster B/C deferral flags, none from 16a); governance runner `--unit 16a` Green 100% (ARCH-005–009 pass). OODA gauges sourced from Unit 15 `composeCommandTempo`; thresholds strategy-sourced from the `operational-tempo` policy (no hardcoded thresholds); aggregate posture/SLA/coverage rollups deliberately excluded (Unit 16b scope); drill paths resolve to registered SCAFFOLD Operating Picture routes per `DEC-unit16a-gate-clarification`.

**Purpose:** Build the Command Centre operational entry-point surface for the Commander SDR Operational Application — the landing surface and drill hub. This is the surface that other operational surfaces depend on for navigation/drill-in. It presents *overviews* sourced from already-built engines and seed fixtures; it does NOT compute the cross-page aggregate posture rollup (that is Unit 16b).

**Baseline spec:** #41 Visual Language and Intensity Ceiling, #65 External Operating Picture, #66 Internal Operating Picture

**Architectural layer:** Surface Layer (Layer 7)

**Dependencies:** Unit 15 (OODA Layer — DONE), Unit 14 (Intelligence Layer — DONE), Units 7-13 (Case Layer — DONE)

**Required entities:**
- Case ✅ (exists)
- Risk Object ✅ (exists)
- OODA phase health metrics ✅ (created in Unit 15 — DONE)
- Estate Intelligence Picture ✅ (created in Unit 14 — DONE)

**Deliverables:**
1. Command Centre dashboard shell (operational entry point)
2. OODA phase health gauges (Observe, Orient, Decide, Act — from Unit 15 `composeCommandTempo`)
3. Case queue overview (by priority, by status, by surface attribution)
4. Risk object overview (by type, by treatment state)
5. Connector health overview
6. Mission-critical alerts
7. Visual intensity ceiling Level 3 (command/intelligence treatment)
8. Drill paths to External Operating Picture and Internal Operating Picture

**Completion gate:**
- ✅ Command Centre dashboard shell operational
- ✅ OODA phase health gauges working
- ✅ Case queue overview displayed
- ✅ Risk object overview displayed
- ✅ Connector health overview displayed
- ✅ Mission-critical alerts surfaced
- ✅ Visual intensity Level 3 applied
- ✅ Drill paths to Operating Pictures working (links resolve to registered SCAFFOLD Operating Picture routes — see gate clarification)
- ✅ Tests: dashboard rendering, drill paths, data accuracy

**Gate clarification (`DEC-unit16a-gate-clarification`, 2026-06-02):** The "drill paths to Operating Pictures working" gate item is satisfied when the drill links resolve to **registered SCAFFOLD** Operating Picture routes (`/operating-picture/external`, `/operating-picture/internal`) labelled as scaffold/deferred targets. Full Operating Picture implementation remains the responsibility of Units 20 and 21 and is NOT in 16a scope. 16a must NOT add aggregate posture/SLA/coverage KPI rollups from unmapped data points — those belong to Unit 16b.

**Source tag:** Foundational

**Split note:** Formerly the operational scope of Unit 16. Split from the aggregate/posture scope (Unit 16b) under `DEC-command-centre-split-16a-16b` (2026-06-02), resolving ARCH-DEBT-026. Units that previously depended on "Unit 16" (17, 20, 21, 30, 31, 32, 33, 34, 46) depend on **this unit (16a)**, not the deferred 16b.

---

### Unit 16b: Surface Layer — Aggregate/Posture Command Centre (Summary Rollup)

**Status:** BLOCKED

**Blocked by:** Functional pages that define confirmed data points (Units 17, 30, 31, 32, 33 — not yet DONE); AND the data-point-to-metric mapping artifact (does not yet exist — must be authored or the resume trigger redefined). Carries the metric-deferral control formerly held by `DEC-command-centre-deferred`.

**Purpose:** Build the Command Centre aggregate/posture rollup — the summary KPI layer (Posture Score, SLA Compliance, Coverage and other cross-page aggregates) that must map to *confirmed* data points produced by the functional pages, not seeded guesses.

**Baseline spec:** #41 Visual Language and Intensity Ceiling, #65 External Operating Picture, #66 Internal Operating Picture; MP §24 (Workspace Model — posture rollups)

**Architectural layer:** Surface Layer (Layer 7)

**Dependencies:** Unit 16a (Operational Command Centre — entry-point surface to host the rollup); the functional pages that define real data points (Units 17, 30, 31, 32, 33); the data-point-to-metric mapping artifact.

**Required entities:**
- Confirmed per-page data points (produced by the functional pages — pending)
- Data-point-to-metric mapping artifact (pending — see resume trigger)

**Deliverables:**
1. Aggregate posture rollup widgets (Posture Score, SLA Compliance, Coverage, and cross-page aggregates) — live-ready, sourced from confirmed data points
2. Data hook as a thin presentation-layer adapter over the established data-access pattern (NOT a new data layer)
3. Time-toggle controls per the banked design (`DEC-command-centre-design-banked`)

**Completion gate:**
- ✅ Aggregate posture rollups map to confirmed data points (no seeded/guessed metric values)
- ✅ Data-point-to-metric mapping artifact exists and is honoured
- ✅ Rollup widgets rendered within the 16a entry-point surface
- ✅ Tests: metric mapping accuracy, rollup rendering, no-hardcoded-metric assertion

**Resume trigger (metric-deferral control — preserved from `DEC-command-centre-deferred`, now scoped to 16b only):** functional pages built AND a data-point-to-metric mapping artifact authored. Until both hold, 16b remains BLOCKED.

**Source tag:** Foundational

**Split note:** Formerly the deferred/aggregate scope of Unit 16. Split under `DEC-command-centre-split-16a-16b` (2026-06-02), resolving ARCH-DEBT-026 and superseding `DEC-command-centre-deferred` (the deferral now applies ONLY to this unit).

---

### Unit 17: Surface Layer — Case Management UI

**Status:** READY

**Blocked by:** — (dependencies Units 8–13 and Unit 16a all DONE; recomputed 2026-06-02 on Unit 16a completion)

**Purpose:** Build Case Management UI for viewing and progressing cases (system-owned lifecycle only)

**Baseline spec:** #08 Case Management, #41 Visual Language

**Architectural layer:** Surface Layer (Layer 7)

**Dependencies:** Unit 7-13 (Case Layer — case lifecycle must be complete), Unit 16a (Operational Command Centre)

**Required entities:**
- Case ✅ (exists)
- Risk Object ✅ (exists)
- Case Lifecycle ✅ (exists)

**Deliverables:**
1. Case list view (filterable by priority, status, type, owner, surface attribution)
2. Case detail view (case header, risk object details, lifecycle state, sub-actions, validation state, closure gates, reopening triggers, audit trail)
3. Case progression UI (system-owned only — no manual state changes)
4. Evidence submission UI (owner can submit evidence for validation)
5. Case communication thread UI (closed-loop email communication binding)
6. Case analytics view (case metrics, SLA performance, routing effectiveness)

**Completion gate:**
- ✅ Case list view operational
- ✅ Case detail view operational
- ✅ Case progression UI enforces system-owned lifecycle (manual state changes blocked)
- ✅ Evidence submission working
- ✅ Communication thread displayed
- ✅ Case analytics view operational
- ✅ Tests: list view, detail view, system-owned enforcement, evidence submission, communication

**Source tag:** Foundational

---

### Unit 18: Surface Layer — Identity Intelligence Surface

**Status:** BLOCKED

**Blocked by:** Unit 14 (Intelligence Layer — Internal Behavioural stream); Unit 5 (Normalisation Layer — Identity)

**Purpose:** Build Identity Intelligence Surface (six-section composition)

**Baseline spec:** #68 Identity Intelligence Surface

**Architectural layer:** Surface Layer (Layer 7)

**Dependencies:** Unit 14 (Intelligence Layer — Internal Behavioural Intelligence stream), Unit 5 (Normalisation Layer — Identity entity)

**Required entities:**
- Identity ✅ (exists)
- Internal Behavioural Intelligence stream (created in Unit 14)

**Deliverables:**
1. Six-section composition:
   - Identity Overview (display name, classification, department, role, status, surface attribution)
   - Access Intelligence (associated assets, privilege level, access patterns)
   - Behavioural Intelligence (Internal Risk authority gated — risk score, anomaly counts, dormancy flags, privilege escalation patterns)
   - Threat Intelligence (external threat intel matched to this identity)
   - Case History (cases involving this identity)
   - Risk Trajectory (risk score over time)
2. RBAC integration (Behavioural Intelligence section gated by Internal Risk authority)
3. Drill paths to cases, assets, threat intel

**Completion gate:**
- ✅ Six sections operational
- ✅ RBAC gating enforced (Behavioural Intelligence requires Internal Risk authority)
- ✅ Drill paths working
- ✅ Tests: section rendering, RBAC gating, drill paths, data accuracy

**Source tag:** Foundational

---

### Unit 19: Surface Layer — Asset Intelligence Surface

**Status:** BLOCKED

**Blocked by:** Unit 14 (Intelligence Layer — Posture stream); Unit 5 (Normalisation Layer — Asset)

**Purpose:** Build Asset Intelligence Surface (seven-section composition)

**Baseline spec:** #69 Asset Intelligence Surface

**Architectural layer:** Surface Layer (Layer 7)

**Dependencies:** Unit 14 (Intelligence Layer — Posture Intelligence stream), Unit 5 (Normalisation Layer — Asset entity)

**Required entities:**
- Asset ✅ (exists)
- Posture Intelligence stream (created in Unit 14)

**Deliverables:**
1. Seven-section composition:
   - Asset Overview (name, classification, owner, environment, criticality, surface attribution)
   - Configuration State (intended vs actual configuration, drift status)
   - Verdict History (operational verdicts from Class B connectors)
   - Behavioural Pattern (behavioural risk from EDR, anomaly counters from NDR)
   - Case History (cases involving this asset)
   - Vulnerability State (vulnerabilities affecting this asset)
   - Identity Exposure (identities with access to this asset)
2. Drill paths to cases, identities, vulnerabilities, configuration drift

**Completion gate:**
- ✅ Seven sections operational
- ✅ Drill paths working
- ✅ Tests: section rendering, drill paths, data accuracy

**Source tag:** Foundational

---

### Unit 20: Surface Layer — External Operating Picture

**Status:** READY

**Blocked by:** — (dependencies Unit 14 and Unit 16a all DONE; recomputed 2026-06-02 on Unit 16a completion)

**Purpose:** Build External Operating Picture (external attack surface view)

**Baseline spec:** #65 External Operating Picture, #60 Internal and External Attack Surface Framework

**Architectural layer:** Surface Layer (Layer 7)

**Dependencies:** Unit 14 (Intelligence Layer — External Attack Intelligence stream), Unit 16a (Operational Command Centre)

**Required entities:**
- Asset ✅ (exists — with surfaceAttribution: external_attack_surface)
- Identity ✅ (exists — with surfaceAttribution: external_attack_surface)
- Case ✅ (exists — with surfaceAttribution: external_attack_surface)
- External Attack Intelligence stream (created in Unit 14)

**Deliverables:**
1. External attack surface inventory (internet-facing services, exposed APIs, public DNS, partner integrations, OAuth boundaries, cloud-exposed services, federated identity boundaries, supply chain dependencies)
2. External Attack Intelligence stream visualization (SOC stack observations)
3. External attack surface case queue (cases with surfaceAttribution: external_attack_surface)
4. External attack surface risk objects
5. Drill paths to cases, assets, identities, threat intel

**Completion gate:**
- ✅ External attack surface inventory displayed
- ✅ External Attack Intelligence stream visualized
- ✅ External attack surface case queue operational
- ✅ Risk objects displayed
- ✅ Drill paths working
- ✅ Tests: inventory accuracy, stream visualization, case queue, drill paths

**Source tag:** Foundational

---

### Unit 21: Surface Layer — Internal Operating Picture

**Status:** READY

**Blocked by:** — (dependencies Unit 14 and Unit 16a all DONE; recomputed 2026-06-02 on Unit 16a completion)

**Purpose:** Build Internal Operating Picture (internal attack surface view)

**Baseline spec:** #66 Internal Operating Picture, #60 Internal and External Attack Surface Framework

**Architectural layer:** Surface Layer (Layer 7)

**Dependencies:** Unit 14 (Intelligence Layer — Internal Behavioural Intelligence stream), Unit 16a (Operational Command Centre)

**Required entities:**
- Asset ✅ (exists — with surfaceAttribution: internal_attack_surface)
- Identity ✅ (exists — with surfaceAttribution: internal_attack_surface)
- Case ✅ (exists — with surfaceAttribution: internal_attack_surface)
- Internal Behavioural Intelligence stream (created in Unit 14)

**Deliverables:**
1. Internal attack surface inventory (files, applications, data, identities, configurations, devices, network resources, SaaS, email channels)
2. Internal Behavioural Intelligence stream visualization (operational verdict platforms)
3. Internal attack surface case queue (cases with surfaceAttribution: internal_attack_surface)
4. Internal attack surface risk objects
5. Verdict pattern visualization (patterns from Class B connectors)
6. Drill paths to cases, assets, identities, verdict patterns

**Completion gate:**
- ✅ Internal attack surface inventory displayed
- ✅ Internal Behavioural Intelligence stream visualized
- ✅ Internal attack surface case queue operational
- ✅ Risk objects displayed
- ✅ Verdict pattern visualization working
- ✅ Drill paths working
- ✅ Tests: inventory accuracy, stream visualization, case queue, verdict patterns, drill paths

**Source tag:** Foundational

---

### Unit 22: Tenant Admin Surface — Foundation

**Status:** READY

**Blocked by:** — (Unit 4 DONE, Unit 6 DONE; all dependencies satisfied)

**Purpose:** Build Tenant Admin Surface foundation (second application boundary)

**Baseline spec:** #39 Commander Application Boundary and Naming Model, SDR Commercial Control Plane Specification v1.1

**Architectural layer:** Surface Layer (Layer 7) — separate application boundary

**Dependencies:** Unit 4 (Connector Layer), Unit 6 (Strategy Layer)

**Required entities:**
- Connector ✅ (exists)
- Strategy Policy ✅ (exists)
- Tenant context ✅ (exists in common fields)

**Deliverables:**
1. Tenant Admin application shell (separate from Operational App)
2. Tenant users management
3. Tenant RBAC within entitlement boundaries
4. Tenant connectors management (add, configure, pause, decommission)
5. Tenant notification settings
6. Tenant policy settings (within entitlement boundaries)
7. Tenant audit/export
8. Tenant-visible feature configuration (where control_scope = tenant-admin)
9. Visual intensity ceiling Level 2 (controlled administrative console)

**Completion gate:**
- ✅ Tenant Admin shell operational (separate from Operational App)
- ✅ Tenant users management working
- ✅ Tenant RBAC enforced
- ✅ Tenant connectors management operational
- ✅ Notification settings configurable
- ✅ Policy settings configurable (within entitlement)
- ✅ Audit/export working
- ✅ Feature configuration respects control_scope
- ✅ Visual intensity Level 2 applied
- ✅ Tests: shell isolation, users, RBAC, connectors, settings, audit, feature control_scope

**Source tag:** Foundational

---

### Unit 23: Commercial Control Plane — Foundation (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate — `USE_CASE_SCHEDULE.md` + `PAGE_INVENTORY.md` absent)

**Purpose:** Build Commander Internal Control Plane foundation (third application boundary)

**Baseline spec:** SDR Commercial Control Plane Specification v1.1, #39 Commander Application Boundary and Naming Model

**Architectural layer:** Surface Layer (Layer 7) — separate application boundary (internal only)

**Dependencies:** None (separate application — but benefits from Units 1-22 for understanding entitlement model)

**Required entities:**
- Feature Registry FR-001 (to be created)
- Entitlement Manifest schema (to be created)
- Tenant register (to be created)

**Deliverables:**
1. Feature Registry FR-001 (authoritative list of all feature controls)
2. Entitlement Manifest schema and signing
3. Tenant register (customer register, tenant register, licence allocation)
4. Deployment ring management
5. Control Plane APIs (instance lifecycle, manifest, features, entitlements, rings, usage, offline licence files)
6. Operator RBAC and audit
7. Visual intensity ceiling Level 2 (secure operator console, Level 3 only for emergency controls)

**Completion gate:**
- ✅ Feature Registry FR-001 operational (all feature keys registered)
- ✅ Entitlement Manifest schema defined and signing working
- ✅ Tenant register operational
- ✅ Deployment ring management working
- ✅ Control Plane APIs operational
- ✅ Operator RBAC enforced
- ✅ Audit logging working
- ✅ Visual intensity Level 2 applied (Level 3 for emergency only)
- ✅ Tests: feature registry, manifest signing, tenant register, rings, APIs, RBAC, audit

**Source tag:** Team 2

---

### Unit 24: Engine Layer — Drift Detection (~240 Models) (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 5 (Normalisation Layer); Unit 4 (Connector Layer — Class C)

**Purpose:** Build drift detection engine with ~240 models

**Baseline spec:** Existing v2.5 drift detection models (carried forward)

**Architectural layer:** Engine Layer (Layer 3)

**Dependencies:** Unit 5 (Normalisation Layer — canonical entities), Unit 4 (Connector Layer — Class C Configuration State)

**Required entities:**
- Asset ✅ (exists)
- Identity ✅ (exists)
- Connector ✅ (exists — Class C Configuration State)

**Deliverables:**
1. ~240 drift detection models (existing v2.5 models carried forward)
2. Drift detection engine consuming Class C Configuration State signal
3. Drift risk object creation (configuration_drift risk object type)
4. Drift case creation (drift case type)

**Completion gate:**
- ✅ ~240 drift models operational
- ✅ Drift detection engine consuming Class C signal
- ✅ Drift risk objects created
- ✅ Drift cases created
- ✅ Tests: drift detection, risk object creation, case creation

**Source tag:** Team 2

---

### Unit 25: Engine Layer — Identity Intelligence Engine (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 5 (Normalisation Layer — Identity); Unit 14 (Internal Behavioural stream)

**Purpose:** Build identity intelligence engine (risk scoring, access chains, privilege analysis)

**Baseline spec:** Existing v2.5 identity intelligence (carried forward)

**Architectural layer:** Engine Layer (Layer 3)

**Dependencies:** Unit 5 (Normalisation Layer — Identity entity), Unit 14 (Intelligence Layer — Internal Behavioural Intelligence stream)

**Required entities:**
- Identity ✅ (exists)
- Internal Behavioural Intelligence stream (created in Unit 14)

**Deliverables:**
1. Identity risk scoring engine
2. Access chain analysis
3. Privilege escalation detection
4. Dormancy detection
5. Identity risk object creation (identity_risk risk object type)
6. Identity case creation (identity case type)

**Completion gate:**
- ✅ Identity risk scoring operational
- ✅ Access chain analysis working
- ✅ Privilege escalation detected
- ✅ Dormancy detected
- ✅ Identity risk objects created
- ✅ Identity cases created
- ✅ Tests: risk scoring, access chains, privilege escalation, dormancy, risk objects, cases

**Source tag:** Team 2

---

### Unit 26: Engine Layer — Architecture Intelligence Engine (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 5 (Normalisation Layer — Asset); Unit 14 (Posture stream)

**Purpose:** Build architecture intelligence engine (blast radius, attack-path likelihood, trust boundary analysis)

**Baseline spec:** #12 Architecture Intelligence, existing v2.5 architecture intelligence (carried forward)

**Architectural layer:** Engine Layer (Layer 3)

**Dependencies:** Unit 5 (Normalisation Layer — Asset entity), Unit 14 (Intelligence Layer — Posture Intelligence stream)

**Required entities:**
- Asset ✅ (exists)
- Identity ✅ (exists)
- Posture Intelligence stream (created in Unit 14)

**Deliverables:**
1. Blast radius calculation
2. Attack-path likelihood analysis
3. Trust boundary analysis
4. Architecture risk object creation (architecture risk object type)
5. Architecture case creation (architecture case type)

**Completion gate:**
- ✅ Blast radius calculation operational
- ✅ Attack-path likelihood analysis working
- ✅ Trust boundary analysis working
- ✅ Architecture risk objects created
- ✅ Architecture cases created
- ✅ Tests: blast radius, attack-path, trust boundary, risk objects, cases

**Source tag:** Team 2

---

### Unit 27: Engine Layer — Vulnerability Management Engine (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 5 (Normalisation Layer — Asset); Unit 14 (External Threat stream)

**Purpose:** Build vulnerability management engine (KEV/CVSS/EPSS integration, estate matching)

**Baseline spec:** Existing v2.5 vulnerability management (carried forward)

**Architectural layer:** Engine Layer (Layer 3)

**Dependencies:** Unit 5 (Normalisation Layer — Asset entity), Unit 14 (Intelligence Layer — External Threat Intelligence stream)

**Required entities:**
- Asset ✅ (exists)
- External Threat Intelligence stream (created in Unit 14)

**Deliverables:**
1. Vulnerability detection (CVE matching to estate assets)
2. KEV/CVSS/EPSS integration
3. Exploitability scoring
4. Vulnerability risk object creation (vulnerability_drift risk object type)
5. Vulnerability case creation (vulnerability case type)

**Completion gate:**
- ✅ Vulnerability detection operational
- ✅ KEV/CVSS/EPSS integrated
- ✅ Exploitability scoring working
- ✅ Vulnerability risk objects created
- ✅ Vulnerability cases created
- ✅ Tests: vulnerability detection, KEV/CVSS/EPSS, exploitability, risk objects, cases

**Source tag:** Team 2

---

### Unit 28: Engine Layer — Exposure Management Engine (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 5 (Normalisation Layer — Asset); Unit 14 (External Threat stream)

**Purpose:** Build exposure management engine (external attack surface exposure detection)

**Baseline spec:** Existing v2.5 exposure management (carried forward)

**Architectural layer:** Engine Layer (Layer 3)

**Dependencies:** Unit 5 (Normalisation Layer — Asset entity), Unit 14 (Intelligence Layer — External Threat Intelligence stream)

**Required entities:**
- Asset ✅ (exists — with surfaceAttribution: external_attack_surface)
- External Threat Intelligence stream (created in Unit 14)

**Deliverables:**
1. Exposure detection (internet-facing services, exposed APIs, public DNS, OAuth boundaries, cloud-exposed services)
2. Exposure risk scoring
3. Exposure risk object creation (exposure_drift risk object type)
4. Exposure case creation (exposure case type)

**Completion gate:**
- ✅ Exposure detection operational
- ✅ Exposure risk scoring working
- ✅ Exposure risk objects created
- ✅ Exposure cases created
- ✅ Tests: exposure detection, risk scoring, risk objects, cases

**Source tag:** Team 2

---

### Unit 29: Engine Layer — Pre-Warned Classification Engine (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 14 (all four streams); Units 24–28 (Engine Layer)

**Purpose:** Build Pre-Warned / Protected / Novel classification engine (cross-stream correlation)

**Baseline spec:** #71 Pre-Warned / Protected / Novel Classification

**Architectural layer:** Engine Layer (Layer 3) + Intelligence Layer (Layer 4) cross-stream correlation

**Dependencies:** Unit 14 (Intelligence Layer — all four streams), Unit 24-28 (Engine Layer — drift, identity, architecture, vulnerability, exposure engines)

**Required entities:**
- External Threat Intelligence stream (created in Unit 14)
- External Attack Intelligence stream (created in Unit 14)
- Internal Behavioural Intelligence stream (created in Unit 14)
- Posture Intelligence stream (created in Unit 14)

**Deliverables:**
1. Pre-Warned classification (threat intel matched to estate before attack observed)
2. Protected classification (control in place, attack blocked)
3. Novel classification (attack observed, no prior threat intel)
4. Classification assignment to cases and risk objects
5. Silent Defence aggregation (Protected outcomes aggregated for reporting)

**Completion gate:**
- ✅ Pre-Warned classification operational
- ✅ Protected classification operational
- ✅ Novel classification operational
- ✅ Classification assigned to cases/risk objects
- ✅ Silent Defence aggregation working
- ✅ Tests: Pre-Warned, Protected, Novel classification, Silent Defence aggregation

**Source tag:** Team 2

---

### Unit 30: Surface Layer — Vulnerability Management UI (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 27 (Vulnerability Management Engine); Unit 16a (Operational Command Centre)

**Purpose:** Build Vulnerability Management UI

**Baseline spec:** Existing v2.5 vulnerability management UI (carried forward)

**Architectural layer:** Surface Layer (Layer 7)

**Dependencies:** Unit 27 (Vulnerability Management Engine), Unit 16a (Operational Command Centre)

**Required entities:**
- Vulnerability risk objects (created in Unit 27)
- Vulnerability cases (created in Unit 27)

**Deliverables:**
1. Vulnerability list view (filterable by severity, exploitability, KEV status, CVSS score, EPSS score)
2. Vulnerability detail view (CVE details, affected assets, exploitability, remediation guidance)
3. Vulnerability case queue
4. Drill paths to cases, assets, threat intel

**Completion gate:**
- ✅ Vulnerability list view operational
- ✅ Vulnerability detail view operational
- ✅ Vulnerability case queue operational
- ✅ Drill paths working
- ✅ Tests: list view, detail view, case queue, drill paths

**Source tag:** Team 2

---

### Unit 31: Surface Layer — Exposure Management UI (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 28 (Exposure Management Engine); Unit 16a (Operational Command Centre)

**Purpose:** Build Exposure Management UI

**Baseline spec:** Existing v2.5 exposure management UI (carried forward)

**Architectural layer:** Surface Layer (Layer 7)

**Dependencies:** Unit 28 (Exposure Management Engine), Unit 16a (Operational Command Centre)

**Required entities:**
- Exposure risk objects (created in Unit 28)
- Exposure cases (created in Unit 28)

**Deliverables:**
1. Exposure list view (filterable by exposure type, risk score, surface attribution)
2. Exposure detail view (exposure details, affected assets, risk score, remediation guidance)
3. Exposure case queue
4. Drill paths to cases, assets

**Completion gate:**
- ✅ Exposure list view operational
- ✅ Exposure detail view operational
- ✅ Exposure case queue operational
- ✅ Drill paths working
- ✅ Tests: list view, detail view, case queue, drill paths

**Source tag:** Team 2

---

### Unit 32: Surface Layer — Architecture Topology UI (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 26 (Architecture Intelligence Engine); Unit 16a (Operational Command Centre)

**Purpose:** Build Architecture Topology UI

**Baseline spec:** #12 Architecture Intelligence, existing v2.5 architecture topology UI (carried forward)

**Architectural layer:** Surface Layer (Layer 7)

**Dependencies:** Unit 26 (Architecture Intelligence Engine), Unit 16a (Operational Command Centre)

**Required entities:**
- Architecture risk objects (created in Unit 26)
- Architecture cases (created in Unit 26)

**Deliverables:**
1. Architecture topology visualization (blast radius, attack paths, trust boundaries)
2. Architecture risk object list view
3. Architecture case queue
4. Drill paths to cases, assets, identities

**Completion gate:**
- ✅ Architecture topology visualization operational
- ✅ Architecture risk object list view operational
- ✅ Architecture case queue operational
- ✅ Drill paths working
- ✅ Tests: topology visualization, risk object list, case queue, drill paths

**Source tag:** Team 2

---

### Unit 33: Surface Layer — Control Coverage & Editable Baselines UI (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 24 (Drift Detection Engine); Unit 16a (Operational Command Centre)

**Purpose:** Build Control Coverage & Editable Baselines UI

**Baseline spec:** Existing v2.5 control coverage UI (carried forward)

**Architectural layer:** Surface Layer (Layer 7)

**Dependencies:** Unit 24 (Drift Detection Engine), Unit 16a (Operational Command Centre)

**Required entities:**
- Drift risk objects (created in Unit 24)
- Drift cases (created in Unit 24)

**Deliverables:**
1. Control coverage overview (coverage by control type, coverage gaps)
2. Editable baseline management (define intended state, approve deviations)
3. Drift detection visualization
4. Control gap risk object list view
5. Coverage case queue
6. Drill paths to cases, assets, controls

**Completion gate:**
- ✅ Control coverage overview operational
- ✅ Editable baseline management working
- ✅ Drift detection visualization operational
- ✅ Control gap risk object list view operational
- ✅ Coverage case queue operational
- ✅ Drill paths working
- ✅ Tests: coverage overview, baseline management, drift visualization, risk objects, case queue, drill paths

**Source tag:** Team 2

---

### Unit 34: Surface Layer — Direction Boards UI (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 15 (OODA Layer); Unit 14 (Intelligence Layer); Unit 16a (Operational Command Centre)

**Purpose:** Build Direction Boards UI (strategic guidance surfaces)

**Baseline spec:** Existing v2.5 Direction Boards (carried forward)

**Architectural layer:** Surface Layer (Layer 7)

**Dependencies:** Unit 15 (OODA Layer), Unit 14 (Intelligence Layer), Unit 16a (Operational Command Centre)

**Required entities:**
- OODA phase health metrics (created in Unit 15)
- Estate Intelligence Picture (created in Unit 14)

**Deliverables:**
1. Direction Board framework (strategic guidance surfaces)
2. Board composition (panels, metrics, drill paths)
3. Board RBAC (persona-based visibility)
4. Drill paths to cases, risk objects, Operating Pictures

**Completion gate:**
- ✅ Direction Board framework operational
- ✅ Board composition working
- ✅ Board RBAC enforced
- ✅ Drill paths working
- ✅ Tests: board framework, composition, RBAC, drill paths

**Source tag:** Team 2

---

### Unit 35: Surface Layer — Governance & Reporting UI (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Units 7–13 (Case Layer); Unit 14 (Intelligence Layer); Unit 15 (OODA Layer)

**Purpose:** Build Governance & Reporting UI

**Baseline spec:** Existing v2.5 governance & reporting (carried forward)

**Architectural layer:** Surface Layer (Layer 7)

**Dependencies:** Unit 7-13 (Case Layer), Unit 14 (Intelligence Layer), Unit 15 (OODA Layer)

**Required entities:**
- Case ✅ (exists)
- Risk Object ✅ (exists)
- OODA phase health metrics (created in Unit 15)
- Audit Event ✅ (exists)

**Deliverables:**
1. Governance dashboard (compliance posture, exception tracking, suppression tracking)
2. Reporting cadences (daily, weekly, monthly, quarterly)
3. Report templates (executive summary, operational detail, compliance evidence)
4. Report export (PDF, CSV, JSON)
5. Audit trail export

**Completion gate:**
- ✅ Governance dashboard operational
- ✅ Reporting cadences working
- ✅ Report templates operational
- ✅ Report export working
- ✅ Audit trail export working
- ✅ Tests: governance dashboard, reporting cadences, templates, export

**Source tag:** Team 2

---

### Unit 36: Surface Layer — CISO Dashboard (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 15 (OODA Layer); Unit 14 (Intelligence Layer); Units 7–13 (Case Layer)

**Purpose:** Build CISO Dashboard (executive-level operational overview)

**Baseline spec:** Existing v2.5 CISO Dashboard (carried forward)

**Architectural layer:** Surface Layer (Layer 7)

**Dependencies:** Unit 15 (OODA Layer), Unit 14 (Intelligence Layer), Unit 7-13 (Case Layer)

**Required entities:**
- OODA phase health metrics (created in Unit 15)
- Estate Intelligence Picture (created in Unit 14)
- Case ✅ (exists)
- Risk Object ✅ (exists)

**Deliverables:**
1. CISO Dashboard (executive-level overview)
2. OODA phase health summary
3. Case queue summary (by priority, by surface attribution)
4. Risk object summary (by type, by treatment state)
5. Connector health summary
6. Mission-critical alerts
7. Drill paths to Command Centre, Operating Pictures, Direction Boards

**Completion gate:**
- ✅ CISO Dashboard operational
- ✅ OODA phase health summary displayed
- ✅ Case queue summary displayed
- ✅ Risk object summary displayed
- ✅ Connector health summary displayed
- ✅ Mission-critical alerts surfaced
- ✅ Drill paths working
- ✅ Tests: dashboard rendering, drill paths, data accuracy

**Source tag:** Team 2

---

### Unit 37: Surface Layer — Security C2 / War Room (P0 Emergency Surface) (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 15 (OODA Layer); Unit 14 (Intelligence Layer); Units 7–13 (Case Layer)

**Purpose:** Build Security C2 / War Room (P0 emergency surface with Mission mode)

**Baseline spec:** Existing v2.5 Security C2 / War Room (carried forward), #41 Visual Language §9.3 (Mission mode)

**Architectural layer:** Surface Layer (Layer 7)

**Dependencies:** Unit 15 (OODA Layer), Unit 14 (Intelligence Layer), Unit 7-13 (Case Layer)

**Required entities:**
- Case ✅ (exists — P0 priority cases)
- Risk Object ✅ (exists — mission-critical risk objects)
- OODA phase health metrics (created in Unit 15)

**Deliverables:**
1. War Room surface (P0 emergency surface)
2. Mission mode visual treatment (dark emergency chrome, full-bleed, intensity ceiling Level 3)
3. P0 case queue (only P0 priority cases)
4. Mission-critical risk objects
5. OODA phase health (emergency degradation alerts)
6. Drill paths to cases, risk objects, Operating Pictures

**Completion gate:**
- ✅ War Room surface operational
- ✅ Mission mode visual treatment applied
- ✅ P0 case queue operational (only P0 cases)
- ✅ Mission-critical risk objects displayed
- ✅ OODA phase health emergency alerts working
- ✅ Drill paths working
- ✅ Tests: War Room rendering, Mission mode, P0 filtering, emergency alerts, drill paths

**Source tag:** Team 2

---

### Unit 38: Connector Layer — Mock Connectors (Foundational)

**Status:** READY

**Blocked by:** — (Unit 4 DONE; no other dependencies)

**Purpose:** Build mock connectors for all four classes (A/B/C/D) to support local-first development

**Baseline spec:** #61 Universal Security Signal Connector Contract

**Architectural layer:** Connector Layer (Layer 1)

**Dependencies:** Unit 4 (Connector Layer Foundation)

**Required entities:**
- Connector ✅ (exists)
- Four connector classes (A/B/C/D) ✅ (exists)
- Eight signal purposes ✅ (exists)

**Deliverables:**
1. Mock Class A connectors (SOC Telemetry — SIEM, XDR, NDR)
2. Mock Class B connectors (Operational Verdict — email security, endpoint compliance, web filtering, identity policy, DLP)
3. Mock Class C connectors (Configuration State — intended state of controls, assets, identities, policies)
4. Mock Class D connectors (Threat Intelligence — CVE, KEV, IOC streams)
5. Mock signal generation (deterministic, repeatable, covers all eight signal purposes)
6. Mock connector state machine (active, paused, error)

**Completion gate:**
- ✅ Mock connectors for all four classes operational
- ✅ Mock signal generation working (deterministic, repeatable)
- ✅ All eight signal purposes covered
- ✅ Mock connector state machine working
- ✅ Tests: mock connector lifecycle, signal generation, state machine

**Source tag:** Foundational

---

### Unit 39: Connector Layer — Real Connector Readiness (Phase 2) (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 4 (Connector Layer Foundation); Unit 38 (Mock Connectors)

**Purpose:** Prepare for Phase 2 real connector integration (no live connectors built yet — readiness only)

**Baseline spec:** #61 Universal Security Signal Connector Contract, Phase 2 testing readiness

**Architectural layer:** Connector Layer (Layer 1)

**Dependencies:** Unit 4 (Connector Layer Foundation), Unit 38 (Mock Connectors)

**Required entities:**
- Connector ✅ (exists)
- Conformance tier system (created in Unit 4)

**Deliverables:**
1. Connector conformance test suite (Certified/Full/Baseline/Planned tier validation)
2. Connector sandbox test framework (test against vendor sandbox before production)
3. Connector deployment validation framework
4. Connector mapping pack versioning
5. Phase 2 readiness checklist

**Completion gate:**
- ✅ Conformance test suite operational
- ✅ Sandbox test framework operational
- ✅ Deployment validation framework operational
- ✅ Mapping pack versioning working
- ✅ Phase 2 readiness checklist complete
- ✅ Tests: conformance test suite, sandbox testing, deployment validation

**Source tag:** Team 2

**CRITICAL:** No real vendor API integrations are built in this unit. This is readiness only. Real connectors require Phase 2 approval.

---

### Unit 40: Commander AI Core — Grounding & Refusal (Foundational)

**Status:** BLOCKED

**Blocked by:** Units 7–13 (Case Layer); Unit 14 (Intelligence Layer); Unit 5 (Normalisation Layer)

**Purpose:** Build Commander AI core with grounding in Commander data and refusal framework

**Baseline spec:** #13 Commander AI Architecture and Grounding Rules (`docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/13_Commander_AI_Architecture_and_Grounding_Rules.md`); plus existing v2.5 Commander AI core carried forward. [Re-sourced 2026-05-31: placeholder cited translation "#20", but baseline #20 is Coordinated Push Group Schema — corrected to baseline #13.]

**Architectural layer:** Cross-layer (AI consumes from all layers)

**Dependencies:** Unit 7-13 (Case Layer), Unit 14 (Intelligence Layer), Unit 5 (Normalisation Layer)

**Required entities:**
- Case ✅ (exists)
- Risk Object ✅ (exists)
- Asset ✅ (exists)
- Identity ✅ (exists)
- Estate Intelligence Picture (created in Unit 14)
- Audit Event ✅ (exists)

**Deliverables:**
1. Commander AI grounding framework (AI grounded in Commander data, source authority, cases, entities, baselines, audit records)
2. Refusal framework (AI must not invent estate facts, must not silently execute external writes, must not bypass approval chains, must not override baseline authority)
3. AI drafting capabilities (draft case summaries, draft remediation guidance, draft communication)
4. AI explanation capabilities (explain case routing, explain priority calculation, explain closure gate status)
5. AI summarization capabilities (summarize case history, summarize risk object treatment, summarize OODA phase health)
6. AI navigation assistance (help users find cases, risk objects, entities)
7. AI execution logging (all AI outputs logged as Commander execution records)

**Completion gate:**
- ✅ Commander AI grounding framework operational
- ✅ Refusal framework enforced (no estate fact invention, no silent external writes, no approval bypass, no authority override)
- ✅ AI drafting working
- ✅ AI explanation working
- ✅ AI summarization working
- ✅ AI navigation assistance working
- ✅ AI execution logging working
- ✅ Tests: grounding, refusal, drafting, explanation, summarization, navigation, logging

**Source tag:** Foundational

---

### Unit 41: AWS Alignment — Evaluation Lane (Phase 2) (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 40 (Commander AI Core); **ARCH-DEBT-034 (needs re-sourcing to baseline — no baseline child spec for AWS Bedrock/AgentCore evaluation)**

**Purpose:** Evaluate AWS Bedrock and AgentCore for Commander AI (evaluation only — no production deployment)

**Baseline spec:** ⚠️ UNRESOLVED — placeholder cited translation "#21 AWS Bedrock AgentCore Evaluation"; baseline #21 is BAS Connector Integration Contract. No baseline child spec covers AWS Bedrock/AgentCore evaluation (this is Kiro-pack evaluation-lane scope, per `aws-alignment.md` steering and `D-v1.1-AgentCore-evaluation-status`). Tracked as ARCH-DEBT-034.

**Architectural layer:** Infrastructure (not yet built)

**Dependencies:** Unit 40 (Commander AI Core)

**Required entities:**
- Commander AI grounding framework (created in Unit 40)

**Deliverables:**
1. AWS Bedrock evaluation (foundation model access for Commander AI)
2. AWS AgentCore evaluation (agent hosting runtime)
3. Evaluation report (performance, cost, latency, grounding fidelity, refusal effectiveness)
4. Recommendation (proceed with AWS Bedrock/AgentCore, or alternative)

**Completion gate:**
- ✅ AWS Bedrock evaluated
- ✅ AWS AgentCore evaluated
- ✅ Evaluation report complete
- ✅ Recommendation documented

**Source tag:** Team 2

**CRITICAL:** This is evaluation only. No live AWS resources are created. No production deployment. Evaluation lane until approved.

---

### Unit 42: Push Governance — Dry-Run Only (Phase 2) (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Units 7–13 (Case Layer); Unit 6 (Strategy Layer — automation-boundary)

**Purpose:** Build Push governance framework (dry-run only — no live push execution)

**Baseline spec:** #14 Push Execution, #20 SOAR Dispatch (from existing v2.5 — to be re-sourced from baseline)

**Architectural layer:** Case Layer (Layer 5) — push capability

**Dependencies:** Unit 7-13 (Case Layer), Unit 6 (Strategy Layer — automation-boundary strategy)

**Required entities:**
- Case ✅ (exists)
- Strategy Policy ✅ (exists — automation-boundary strategy surface)

**Deliverables:**
1. Push proposal framework (system proposes push actions, never executes without approval)
2. Push approval workflow (explicit approval required)
3. Push reversibility framework (all push actions must be reversible)
4. Push dry-run mode (simulate push without executing)
5. Push audit logging (all push proposals and approvals logged)
6. Automation-boundary strategy consumption (push proposals respect automation-boundary strategy)

**Completion gate:**
- ✅ Push proposal framework operational
- ✅ Push approval workflow enforced
- ✅ Push reversibility framework operational
- ✅ Push dry-run mode working
- ✅ Push audit logging working
- ✅ Automation-boundary strategy consumed
- ✅ Tests: push proposal, approval, reversibility, dry-run, audit, automation-boundary

**Source tag:** Team 2

**CRITICAL:** Push remains dry-run until separately approved. No live push execution in this unit.

---

### Unit 43: Audit Trail — Comprehensive Logging (Foundational)

**Status:** BLOCKED

**Blocked by:** Units 7–13 (Case Layer); Unit 6 (Strategy Layer); ARCH-DEBT-035 (needs re-sourcing)

**Purpose:** Build comprehensive audit trail (all Commander actions logged immutably)

**Baseline spec:** ⚠️ UNRESOLVED — placeholder cited translation "#28 Audit Trail"; baseline #28 is Strategic and Tactical Priority Framework. No dedicated baseline audit-trail spec exists; audit requirements are distributed across baseline #05 §6.4.5 (AuditEntry), #29 v2.0 patch §2 No.10 (audit-first), and RBAC specs. Needs consolidation/re-sourcing. Tracked as ARCH-DEBT-035.

**Architectural layer:** Cross-layer (audit events from all layers)

**Dependencies:** Unit 7-13 (Case Layer), Unit 6 (Strategy Layer), Unit 4 (Connector Layer)

**Required entities:**
- Audit Event ✅ (exists)

**Deliverables:**
1. Comprehensive audit logging (all Commander actions logged: case lifecycle transitions, strategy policy changes, connector state changes, user actions, Commander AI executions, push proposals/approvals, validation outcomes, closure gate evaluations, reopening trigger fires)
2. Immutable audit records (audit events cannot be edited or deleted)
3. Audit trail query interface (filter by actor, action, entity type, date range)
4. Audit trail export (CSV, JSON)
5. Audit retention policy (configurable retention period)

**Completion gate:**
- ✅ Comprehensive audit logging operational (all Commander actions logged)
- ✅ Immutable audit records enforced
- ✅ Audit trail query interface working
- ✅ Audit trail export working
- ✅ Audit retention policy configurable
- ✅ Tests: audit logging, immutability, query interface, export, retention

**Source tag:** Foundational

---

### Unit 44: Email Case Communication — Closed-Loop Binding (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Units 7–13 (Case Layer); Unit 12 (Closure Gate Engine — communication gate)

**Purpose:** Build email case communication with closed-loop binding (case communication thread)

**Baseline spec:** #26a Closed-Loop Email Case Communication Lifecycle (`docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/26a_Closed_Loop_Email_Case_Communication_Lifecycle_Spec_v1_2.md`); #26 Case Communication and Broadcast Channel; #08 §14A Case Management. [Re-sourced 2026-05-31: placeholder cited translation "#25", but baseline #25 is Trust Boundary and Third-Party Intelligence — corrected to baseline #26a/#26.]

**Architectural layer:** Case Layer (Layer 5) — communication binding

**Dependencies:** Unit 7-13 (Case Layer), Unit 12 (Closure Gate Engine — communication gate)

**Required entities:**
- Case ✅ (exists)
- Closure Gate (communication gate created in Unit 12)

**Deliverables:**
1. Email case communication framework (case communication thread)
2. Closed-loop binding (inbound email evidence binds to case, updates validation state)
3. Communication closure gate (case cannot close until communication thread resolved, where configured)
4. Email template framework (case creation notification, case assignment notification, case closure notification, evidence request)
5. Email audit logging (all email communication logged)

**Completion gate:**
- ✅ Email case communication framework operational
- ✅ Closed-loop binding working (inbound email updates case)
- ✅ Communication closure gate enforced
- ✅ Email templates operational
- ✅ Email audit logging working
- ✅ Tests: email communication, closed-loop binding, closure gate, templates, audit

**Source tag:** Team 2

---

### Unit 45: Security Tool Intelligence (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 4 (Connector Layer); Unit 14 (Posture stream)

**Purpose:** Build Security Tool Intelligence (tool health monitoring, coverage assessment)

**Baseline spec:** #23 Security Tool Intelligence Specification (`docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/23_Security_Tool_Intelligence_Specification.md`). [Re-sourced 2026-05-31: placeholder cited translation "#26", but baseline #26 is Case Communication and Broadcast Channel — corrected to baseline #23.]

**Architectural layer:** Intelligence Layer (Layer 4) — Posture Intelligence stream

**Dependencies:** Unit 4 (Connector Layer), Unit 14 (Intelligence Layer — Posture Intelligence stream)

**Required entities:**
- Connector ✅ (exists)
- Posture Intelligence stream (created in Unit 14)

**Deliverables:**
1. Tool health monitoring (connector health, signal freshness, coverage completeness)
2. Coverage assessment (which assets/identities are covered by which tools)
3. Coverage gap detection (assets/identities without EDR, without vulnerability scanning, without patch management, without backup)
4. Tool health risk object creation (tool_health risk object type)
5. Coverage gap risk object creation (coverage risk object type)
6. Tool health case creation (tool health case type)
7. Coverage case creation (coverage case type)

**Completion gate:**
- ✅ Tool health monitoring operational
- ✅ Coverage assessment working
- ✅ Coverage gap detection working
- ✅ Tool health risk objects created
- ✅ Coverage gap risk objects created
- ✅ Tool health cases created
- ✅ Coverage cases created
- ✅ Tests: tool health monitoring, coverage assessment, gap detection, risk objects, cases

**Source tag:** Team 2

---

### Unit 46: Observability & Tool Health UI (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 45 (Security Tool Intelligence); Unit 16a (Operational Command Centre); **ARCH-DEBT-036 (needs re-sourcing to baseline — no dedicated baseline observability/tool-health UI spec)**

**Purpose:** Build Observability & Tool Health UI

**Baseline spec:** ⚠️ UNRESOLVED — placeholder cited translation "#33 Observability Tool Health"; baseline #33 is Multi-Domain Fusion Map. No dedicated baseline spec for an observability/tool-health UI; it is a surface over baseline #23 Security Tool Intelligence. Needs re-sourcing. Tracked as ARCH-DEBT-036.

**Architectural layer:** Surface Layer (Layer 7)

**Dependencies:** Unit 45 (Security Tool Intelligence), Unit 16a (Operational Command Centre)

**Required entities:**
- Tool health risk objects (created in Unit 45)
- Coverage gap risk objects (created in Unit 45)
- Tool health cases (created in Unit 45)
- Coverage cases (created in Unit 45)

**Deliverables:**
1. Tool health dashboard (connector health, signal freshness, coverage completeness)
2. Coverage assessment visualization (which assets/identities are covered by which tools)
3. Coverage gap visualization (assets/identities without coverage)
4. Tool health risk object list view
5. Coverage gap risk object list view
6. Tool health case queue
7. Coverage case queue
8. Drill paths to cases, risk objects, connectors, assets, identities

**Completion gate:**
- ✅ Tool health dashboard operational
- ✅ Coverage assessment visualization working
- ✅ Coverage gap visualization working
- ✅ Tool health risk object list view operational
- ✅ Coverage gap risk object list view operational
- ✅ Tool health case queue operational
- ✅ Coverage case queue operational
- ✅ Drill paths working
- ✅ Tests: dashboard, coverage visualization, gap visualization, risk objects, case queues, drill paths

**Source tag:** Team 2

---

### Unit 47: DevOps — Local/AWS Alignment (Phase 3) (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate — `USE_CASE_SCHEDULE.md` + `PAGE_INVENTORY.md` absent). No unit dependencies. **ARCH-DEBT-037 (needs re-sourcing to baseline — partial baseline coverage only)**

**Purpose:** Align local-first development with AWS deployment (no live AWS resources yet — alignment only)

**Baseline spec:** ⚠️ UNRESOLVED — placeholder cited translation "#31 DevOps Local AWS Alignment"; baseline #31 is Routing Model and Team Affinity. Partial baseline coverage in #02 DevOps Environments & CI/CD; AWS-alignment scope is governed by `aws-alignment.md` steering and DECISIONS (DEC-004), not a single baseline child spec. Needs re-sourcing. Tracked as ARCH-DEBT-037.

**Architectural layer:** Infrastructure (not yet built)

**Dependencies:** None (infrastructure planning)

**Required entities:**
- None (infrastructure planning)

**Deliverables:**
1. Local-first development environment (Docker Compose, local Postgres, local Redis, local S3-compatible storage)
2. AWS deployment architecture (ECS/Fargate, Aurora, ElastiCache, S3, EventBridge, SQS, CloudWatch)
3. Infrastructure-as-code (Terraform modules for AWS resources)
4. Deployment pipeline (GitHub Actions CI/CD)
5. Environment parity (local dev environment matches AWS deployment as closely as possible)

**Completion gate:**
- ✅ Local-first development environment operational
- ✅ AWS deployment architecture documented
- ✅ Infrastructure-as-code written (Terraform modules)
- ✅ Deployment pipeline documented (GitHub Actions)
- ✅ Environment parity validated

**Source tag:** Team 2

**CRITICAL:** No live AWS resources are created in this unit. This is alignment and planning only. Live AWS deployment requires Phase 3 approval.

---

### Unit 48: Platform Security Hardening (Phase 3) (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 22 (Tenant Admin Surface); Unit 23 (Commercial Control Plane)

**Purpose:** Harden Commander platform security (authentication, authorization, secrets management, network security)

**Baseline spec:** #10 Platform Security and Hardening Spec (`docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/10_Platform_Security_and_Hardening_Spec.md`). [Re-sourced 2026-05-31: placeholder cited translation "#32"/"#35", but baseline #32 is Strategy Layer Runtime Surface and #35 is Shell UI Functional Surface — corrected to baseline #10.]

**Architectural layer:** Cross-layer (security hardening)

**Dependencies:** Unit 22 (Tenant Admin Surface), Unit 23 (Commercial Control Plane)

**Required entities:**
- Tenant context ✅ (exists)
- Audit Event ✅ (exists)

**Deliverables:**
1. Authentication hardening (MFA enforcement, session management, password policies)
2. Authorization hardening (RBAC enforcement, least privilege, separation of duties)
3. Secrets management (no secrets in repo, secrets rotation, secrets encryption)
4. Network security (TLS enforcement, API rate limiting, DDoS protection)
5. Security audit logging (all security events logged)
6. Security testing (penetration testing, vulnerability scanning, security code review)

**Completion gate:**
- ✅ Authentication hardening operational
- ✅ Authorization hardening operational
- ✅ Secrets management operational
- ✅ Network security operational
- ✅ Security audit logging working
- ✅ Security testing complete
- ✅ Tests: authentication, authorization, secrets, network security, audit

**Source tag:** Team 2

---

### Unit 49: Phase 3 Pilot & Production Hardening (Team 2)

**Status:** BLOCKED

**Blocked by:** ARCH-006 (Team 2 gate); Unit 47 (DevOps Local/AWS Alignment); Unit 48 (Platform Security Hardening); **ARCH-DEBT-038 (needs re-sourcing to baseline — programme phase, no single baseline child spec)**

**Purpose:** Prepare for Phase 3 pilot and production deployment (no live deployment yet — readiness only)

**Baseline spec:** ⚠️ UNRESOLVED — placeholder cited translation "#30 Phase 3 Pilot Production Hardening"; baseline #30 is Universal Validation, Closure and Reopening Lifecycle. No baseline child spec covers Phase 3 pilot/production hardening; it is a programme phase governed by the roadmap, not a child spec. Needs re-sourcing. Tracked as ARCH-DEBT-038.

**Architectural layer:** Cross-layer (deployment readiness)

**Dependencies:** Unit 47 (DevOps Local/AWS Alignment), Unit 48 (Platform Security Hardening)

**Required entities:**
- All foundational units (Units 1-22) must be complete

**Deliverables:**
1. Pilot deployment checklist (infrastructure, security, data migration, user onboarding, training)
2. Production deployment checklist (infrastructure, security, data migration, user onboarding, training, monitoring, incident response)
3. Deployment runbook (step-by-step deployment instructions)
4. Rollback plan (how to roll back deployment if issues arise)
5. Monitoring and alerting (CloudWatch dashboards, alerts, incident response)
6. Incident response plan (how to respond to security incidents, outages, data breaches)

**Completion gate:**
- ✅ Pilot deployment checklist complete
- ✅ Production deployment checklist complete
- ✅ Deployment runbook complete
- ✅ Rollback plan complete
- ✅ Monitoring and alerting operational
- ✅ Incident response plan complete

**Source tag:** Team 2

**CRITICAL:** No live deployment in this unit. This is readiness only. Live pilot and production deployment require Phase 3 approval.

---

---

## COIM / OCSF Remediation Units (COIM-A … COIM-H)

**Authority:** `DECISIONS.md` `DEC-coim-ocsf-source-classification-architecture`; accepted COIM artefacts at `docs/knowledge/ocsf_assessment/` (01_COIM_v1_0, 02_SOURCE_CLASSIFICATION_MODEL, 03_REUSABLE_OBJECT_CATALOGUE, 04_EVIDENCE_MODEL, 05_ATTRIBUTE_AND_DATA_EFFICIENCY_MODEL).

**Nature:** These units bring Commander into alignment with the accepted COIM / OCSF architecture. They are **additive** — they augment canonical entities and add new COIM entities. They do NOT modify governance/lifecycle/strategy engine logic, do NOT re-add `SourceMetadata.rawPayloadRef`, and do NOT change verdict disposition semantics or surface attribution rules. All schema changes are additive-only migrations (no drops). Every COIM unit's completion gate includes its `DATA_DICTIONARY.md` entry (ARCH-005).

**Source tag:** Foundational (Team 1) — these augment Foundational entities and are NOT gated by ARCH-006.

**Resolving debt:** COIM-A → ARCH-DEBT-039 (+ ARCH-DEBT-045 Risk Object timeline); COIM-B → ARCH-DEBT-040; COIM-C → ARCH-DEBT-043; COIM-D → ARCH-DEBT-041; COIM-E → ARCH-DEBT-042; COIM-F → ARCH-DEBT-045 (Asset/Identity timeline); COIM-G → ARCH-DEBT-045 (Case dwell time); COIM-H → ARCH-DEBT-044 + ARCH-DEBT-046.

### COIM Live Status Snapshot (recomputed 2026-06-02 — post COIM-G)

Computed from dependency-chain status + mapped ARCH-DEBT status. A COIM unit's own resolving debt does not self-block it.

**DONE (7):** COIM-A, COIM-B, COIM-C, COIM-D, COIM-E, COIM-F, COIM-G.

**READY (1):** COIM-H.

| Unit | Tag | Status | Blocked by | Resolves |
|---|---|---|---|---|
| COIM-A Risk Object Source Classification + Timeline | Foundational | **DONE** | — | ARCH-DEBT-039 ✅; 045 (Risk Object) ✅ partial |
| COIM-B Evidence Entity | Foundational | **DONE** | — | ARCH-DEBT-040 ✅ |
| COIM-C Verdict Entity Promotion | Foundational | **DONE** | — | ARCH-DEBT-043 ✅ |
| COIM-D Observable Entity | Foundational | **DONE** | — | ARCH-DEBT-041 ✅ |
| COIM-E Analytic Entity | Foundational | **DONE** | — | ARCH-DEBT-042 ✅ |
| COIM-F Asset / Identity Augmentation | Foundational | **DONE** | — | ARCH-DEBT-045 (Asset/Identity) ✅ |
| COIM-G Case Aggregation | Foundational | **DONE** | — | ARCH-DEBT-045 (Case dwell time) ✅ |
| COIM-H Action/Sub-Action + D3FEND | Foundational | **READY** | — | ARCH-DEBT-044, 046 |

> **Tier mapping (owner-authorised plan, 2026-06-01):** COIM-A = **NOW** (DONE); COIM-B/C/D/E/F/G = **NEXT** (DONE); COIM-H = **LATER** (READY — owner may still elect to defer per tier plan). The NOW and NEXT tiers are complete. The LATER unit awaits separate owner build authorisation.

---

### Unit COIM-A: Risk Object Source Classification + Timeline Augmentation

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** COIM v1.0 §4.1, §4.12; 02_SOURCE_CLASSIFICATION_MODEL §4; Spec #29 (entity authority). Evidence: `SourceClassification` composed object created at `packages/contracts/src/entities/coim.ts` (FindingClass, SourceSeverity, SourceConfidence, SourceProduct, AttackMapping≤20, ObservableRef≤50, `validateSourceClassification`); Risk Object contract augmented additively with `sourceClassification?`, `sourceFindingUid` (in SC), `affectedEntities[]` (singular `affectedEntityId` retained), `firstDetectedAt`/`lastConfirmedAt`/`normalisedAt`; schema augmented additively (migration `0005_risk_object_coim_a.sql` — new `finding_class` enum + nullable `source_classification` jsonb, extracted indexed columns `finding_class`/`severity_id`/`source_finding_uid`, `confidence_score`, `affected_entities` jsonb, three timestamptz columns; **no drops, no changes to existing columns**); all 3 seed risk-object fixtures enriched; new test `tests/coim-a-risk-object-source-classification/coim-a-source-classification.test.ts` (15 assertions) + Unit 7 risk-object tests pass (130/130 in scope); typecheck clean for COIM-A files (pre-existing unrelated tsconfig/UI/rawPayloadRef errors excluded); full suite regressions = 0 attributable to COIM-A (33 pre-existing UI/DS-1.0 failures confirmed present on clean baseline via stash); governance Green (100%, ARCH-005 PASS). Resolves ARCH-DEBT-039; partially resolves ARCH-DEBT-045 (Risk Object portion).

**Purpose:** Augment the Risk Object with COIM source-classification metadata and the multi-timestamp model, as immutable provenance captured at ingestion. This is the COIM spine — the highest-leverage augmentation, feeding case binding, reporting, search, and AI grounding.

**Baseline spec:** COIM v1.0 §4.1, §4.12, §6.3; 02_SOURCE_CLASSIFICATION_MODEL §4; Spec #29 Universal Risk Object and Case Binding (entity authority)

**Architectural layer:** Operational Intelligence Layer (COIM Layer 2/4) over Normalisation Layer

**Dependencies:** Unit 1 (Risk Object DB Schema — DONE), Unit 5 (Normalisation Layer — DONE)

**Required entities:**
- Risk Object contract + schema + fixture ✅ (exist — augmented here, additively)

**Deliverables (governance registration only — code/schema implementation pending separate owner authorisation):**
1. Add `sourceClassification` (JSONB) to Risk Object: findingClass, sourceSeverity, sourceConfidence, sourceProduct, sourceFindingUid, sourceActivity, attacks[] (≤20), observables[] (≤50)
2. Extract high-frequency fields to indexed columns (severityId, confidenceScore, findingClass)
3. Add timeline fields: `firstDetectedAt` (required), `normalisedAt` (required), `lastConfirmedAt` (recommended)
4. Add `sourceFindingUid`; pluralise to `affectedEntities[]` (retain `affectedEntityId` for back-compat)
5. Additive-only Drizzle migration (no drops); preserve all Unit 1 tests
6. Update DATA_DICTIONARY.md Risk Object entry (COIM fields, FUTURE → AVAILABLE on completion)

**Completion gate:**
- ✅ `sourceClassification`, timeline fields, `affectedEntities[]` present on contract + schema (additive)
- ✅ Existing Unit 1 migration/tests intact (no regression)
- ✅ Additive migration generated and tested
- ✅ DATA_DICTIONARY.md Risk Object entry updated
- ✅ ARCH-DEBT-039 marked RESOLVED; ARCH-DEBT-045 (Risk Object portion) marked RESOLVED
- ✅ Governance runner Green; no engine-logic change

**Source tag:** Foundational

---

### Unit COIM-B: Evidence Entity

**Status:** DONE

**Blocked by:** — (COIM-A DONE; Unit 7, Units 11–13 DONE)

**Purpose:** Create Evidence as a first-class entity so closed-loop doctrine (assertion #1) is structurally supported — evidence-driven validation, evidence-gated closure, evidence-triggered reopening. Retro-enriches the already-built validation/closure/reopening engines (Units 11–13) without changing their logic.

**Baseline spec:** COIM v1.0 §4.4; 04_EVIDENCE_MODEL (full); Spec #08 Case Management (Evidence Packs)

**Architectural layer:** COIM Layer 4/5 (first-class entity)

**Dependencies:** COIM-A; Unit 7 (Case Lifecycle — DONE); Units 11–13 (validation/closure/reopening — DONE)

**Required entities:**
- Case ✅; Validation/closure/reopening engines ✅ (consumers); Evidence ✅ (delivered)

**Deliverables (governance registration only):**
1. ✅ Create Evidence entity: evidenceType, source, confidence, collectedAt, expiresAt, contentRef, immutabilityHash, caseId, subActionId, validationDecisionId
2. ✅ Separate table; content in object store (pointer); metadata queryable; indexed bindings
3. ✅ Update DATA_DICTIONARY.md (new entity)

**Completion gate:**
- ✅ Evidence contract + schema + fixture exist
- ✅ Bindings (case/sub-action/validation) indexed
- ✅ DATA_DICTIONARY.md entry created; ARCH-DEBT-040 RESOLVED
- ✅ No change to validation/closure/reopening engine logic

**Source tag:** Foundational

---

### Unit COIM-C: Verdict Entity Promotion

**Status:** DONE

**Blocked by:** — (COIM-A DONE; Unit 5 DONE)

**Purpose:** Promote Verdict from an engine-internal `VerdictRecord` type to a canonical entity with durable provenance, preserving existing disposition semantics and severity ordering (Spec #62 unchanged).

**Baseline spec:** COIM v1.0 §6 (Verdict impact); Spec #62 Verdict Semantics (semantics authority — NOT changed)

**Architectural layer:** COIM Layer 4/5 (entity promotion)

**Dependencies:** COIM-A; Unit 5 (Normalisation — DONE, source of `VerdictRecord`)

**Required entities:**
- Verdict ✅ (promoted — delivered)

**Deliverables (governance registration only):**
1. ✅ Create canonical Verdict entity: sourceProduct, confidence, observedAt, targetEntityType, extended disposition set, structured policyRef
2. ✅ Point engine `VerdictRecord` at the canonical type (no logic change to disposition/severity/conflict resolution)
3. ✅ Update DATA_DICTIONARY.md (new entity)

**Completion gate:**
- ✅ Verdict contract + schema + fixture exist
- ✅ Disposition semantics and severity ordering unchanged (Spec #62 preserved)
- ✅ DATA_DICTIONARY.md entry created; ARCH-DEBT-043 RESOLVED

**Source tag:** Foundational

---

### Unit COIM-D: Observable Entity

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** COIM v1.0 §4.5; 03_REUSABLE_OBJECT_CATALOGUE.md §2.5. Evidence: Observable contract at `packages/contracts/src/entities/observable.ts` (8-type enum, validateObservable, ObservableRiskObjectBinding); DB schema at `packages/db/src/schema/observables.ts` (main table + many-to-many binding, deduplication unique index on tenant+type+value, value/type search indexes); fixture at `packages/contracts/src/fixtures/seed-observables.ts` (8 observables covering all types, 9 bindings demonstrating deduplication); migration `0006_observable_entity_coim_d.sql` (additive only); vitest 35/35 COIM-D tests pass (0 new regressions attributable to COIM-D); typecheck clean for COIM-D files (pre-existing tsconfig deprecation only); DATA_DICTIONARY.md updated; ARCH-DEBT-041 RESOLVED; governance Green.

**Purpose:** Create the Observable entity for typed indicator extraction (ip/domain/hash/url/email/certificate/process/file), enabling threat-intel correlation, cross-case matching, and indicator-based search. Feeds Intelligence Layer (Unit 14) and inverse-discovery (Unit 5).

**Baseline spec:** COIM v1.0 §4.5; 03_REUSABLE_OBJECT_CATALOGUE §2.5

**Architectural layer:** COIM Layer 4 (composed object / entity)

**Dependencies:** COIM-A (observables[] overflow on Risk Object); Unit 5 (Normalisation — DONE)

**Required entities:**
- Observable ❌ (created here)

**Deliverables (governance registration only):**
1. Create Observable: observableType, value, firstSeen, lastSeen, reputation (enrichment-derived)
2. Separate table with many-to-many binding (deduplication); bounded JSONB overflow on Risk Object
3. Update DATA_DICTIONARY.md (new entity)

**Completion gate:**
- ✅ Observable contract + schema + fixture exist
- ✅ Deduplication binding indexed
- ✅ DATA_DICTIONARY.md entry created; ARCH-DEBT-041 RESOLVED

**Source tag:** Foundational

---

### Unit COIM-E: Analytic Entity

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** COIM v1.0 §4.8; 03_REUSABLE_OBJECT_CATALOGUE.md §2.7. Evidence: Analytic contract at `packages/contracts/src/entities/analytic.ts` (8-type enum, 3-state enum, AnalyticRef, validateAnalytic); DB schema at `packages/db/src/schema/analytics.ts` (deduplication unique index on tenant+analyticId, type/state filter indexes); fixture at `packages/contracts/src/fixtures/seed-analytics.ts` (8 analytics covering all 8 types and all 3 states); migration `0007_analytic_entity_coim_e.sql` (additive only); vitest 41/41 COIM-E tests pass (0 new regressions attributable to COIM-E); typecheck clean for COIM-E files (pre-existing tsconfig deprecation only); DATA_DICTIONARY.md updated; ARCH-DEBT-042 RESOLVED; governance Green.

**Purpose:** Create the Analytic reference entity (broad concept spanning detection_rule / analytic_rule / sigma_rule / yara_rule / ml_model / ueba_model / vendor_model / security_control_analytic), enabling detection-engineering metrics, false-positive tracking, analytic-to-ATT&CK binding, and model-vs-rule attribution.

**Baseline spec:** COIM v1.0 §4.8; 03_REUSABLE_OBJECT_CATALOGUE §2.7

**Architectural layer:** COIM Layer 4 (reference entity)

**Dependencies:** COIM-A; Unit 5 (Normalisation — DONE)

**Required entities:**
- Analytic ❌ (created here)

**Deliverables (governance registration only):**
1. Create Analytic: analyticId, analyticName, analyticType, version, state, falsePositiveRate, attacks[]
2. Referenced from Risk Object/Verdict by analyticId + analyticType; full metadata in separate table
3. Update DATA_DICTIONARY.md (new entity)

**Completion gate:**
- ✅ Analytic contract + schema + fixture exist
- ✅ Reference fields wired on Risk Object/Verdict (additive)
- ✅ DATA_DICTIONARY.md entry created; ARCH-DEBT-042 RESOLVED

**Source tag:** Foundational

---

### Unit COIM-F: Asset / Identity Augmentation

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** COIM v1.0 §6.1, §6.2; 05_ATTRIBUTE_AND_DATA_EFFICIENCY_MODEL §13. Evidence: Asset contract augmented additively at `packages/contracts/src/entities/asset.ts` (7 optional fields: lifecycleState, platform, networkPosition, assetDataClassification, lastConfirmedAt, firstDiscoveredBy, sourceClassification; 4 new enum types + constants); Identity contract augmented additively at `packages/contracts/src/entities/identity.ts` (6 optional fields: privilegeLevel, authenticationStrength, lastAuthenticatedAt, entitlementSummary, riskFactors[], sourceClassification; 5 new types + constants); DB schemas augmented (assets: 7 nullable columns; identities: 6 nullable columns; migration `0008_asset_identity_coim_f.sql`); vitest 29/29 COIM-F tests pass; existing Asset/Identity fixtures all pass (40 assets, 25 identities, 0 regressions); typecheck clean; DATA_DICTIONARY.md updated; ARCH-DEBT-045 (Asset/Identity portion) RESOLVED.

**Purpose:** Augment Asset and Identity with COIM operational-intelligence fields and timeline semantics, additively.

**Baseline spec:** COIM v1.0 §6.1, §6.2; 05_ATTRIBUTE_AND_DATA_EFFICIENCY_MODEL §13; Spec #05 (Asset/Identity authority), Spec #18 (Identity)

**Architectural layer:** COIM Layer 4/5 (entity augmentation)

**Dependencies:** COIM-A; Unit 5 (Normalisation — DONE)

**Required entities:**
- Asset ✅, Identity ✅ (augmented here, additively)

**Deliverables (governance registration only):**
1. Asset: lifecycleState, platform (structured), networkPosition, dataClassification, lastConfirmedAt, firstDiscoveredBy
2. Identity: privilegeLevel, authenticationStrength, lastAuthenticatedAt, entitlementSummary, riskFactors[]
3. Optional sourceClassification on discovery/IAM signals
4. Additive-only migration; preserve existing Asset/Identity tests
5. Update DATA_DICTIONARY.md (Asset, Identity)

**Completion gate:**
- ✅ Asset/Identity augmented (additive); existing tests intact
- ✅ DATA_DICTIONARY.md entries updated; ARCH-DEBT-045 (Asset/Identity portion) RESOLVED

**Source tag:** Foundational

---

### Unit COIM-G: Case Aggregation

**Status:** DONE

**Blocked by:** — (complete)

**Verification:** COIM v1.0 §6 (Case impact); 02_SOURCE_CLASSIFICATION_MODEL §10.4; Spec #08 Case Management. Evidence: Case contract augmented additively at `packages/contracts/src/entities/case.ts` (6 optional fields: attacks[], affectedEntityCount, blastRadiusScore, dwellTimeHours, confidenceAggregate, findingClassBreakdown); DB schema augmented additively at `packages/db/src/schema/cases.ts` (6 nullable columns; migration `0009_case_coim_g.sql` — no drops, no changes to existing columns); pure aggregation resolver `packages/contracts/src/resolvers/case-aggregation-resolver.ts` (`computeCaseAggregation` — deduplicated ATT&CK union ≤50, distinct affected-entity count, saturating blast radius, earliest-`firstDetectedAt`→`createdAt` dwell time, averaged source confidence, finding-class breakdown; non-governing — no SLA/routing/priority/lifecycle change); seed case-0001 carries cached aggregates self-consistent with the resolver (dwell 79h from bound risk-object-0003); vitest 29/29 COIM-G tests pass; typecheck clean for COIM-G files (pre-existing tsconfig `baseUrl` deprecation only); 18 pre-existing UI/DS-1.0 failures confirmed present on clean baseline via stash (0 new regressions attributable to COIM-G); DATA_DICTIONARY.md Case COIM-aggregation section updated FUTURE→AVAILABLE; ARCH-DEBT-045 (Case dwell time portion) RESOLVED — debt now fully closed. Doctrinal Assertion 1 preserved (governance logic unchanged).

**Purpose:** Add computed/cached COIM aggregates to Case from bound Risk Objects, additively. Includes dwell time, blast radius, finding-class breakdown, confidence aggregate, ATT&CK aggregation.

**Baseline spec:** COIM v1.0 §6 (Case impact); 02_SOURCE_CLASSIFICATION_MODEL §10.4; Spec #08 Case Management

**Architectural layer:** COIM Layer 6/7 (computed aggregates)

**Dependencies:** COIM-A (Risk Object source classification to aggregate); Unit 7 (Case Lifecycle — DONE)

**Required entities:**
- Case ✅ (augmented here, additively); Risk Object (COIM-A augmented)

**Deliverables (governance registration only):**
1. Case computed fields: attacks[] (aggregated), affectedEntityCount, blastRadiusScore, dwellTimeHours, confidenceAggregate, findingClassBreakdown
2. Computed at case creation/update; cached on Case (no governance-logic change)
3. Update DATA_DICTIONARY.md (Case)

**Completion gate:**
- ✅ Case aggregates computed/cached (additive); case lifecycle logic unchanged
- ✅ DATA_DICTIONARY.md Case entry updated; ARCH-DEBT-045 (Case dwell time) RESOLVED

**Source tag:** Foundational

---

### Unit COIM-H: Action/Sub-Action + D3FEND

**Status:** READY

**Blocked by:** — (COIM-A DONE; Unit 7 DONE; own creating debt ARCH-DEBT-044 does not self-block). LATER tier — owner may elect to defer.

**Purpose:** Create the Action/Sub-Action canonical entity and add D3FEND tactic classification on remediation sub-actions. Enables remediation posture analytics, D3FEND coverage measurement, and value reporting. LATER tier.

**Baseline spec:** COIM v1.0 §4.3, §6 (Action/Sub-Action impact); 03_REUSABLE_OBJECT_CATALOGUE §2.3; Spec #08 Case Management (sub-actions)

**Architectural layer:** COIM Layer 5/6 (entity + classification)

**Dependencies:** COIM-A; Unit 7 (Case Lifecycle — DONE, references `action_decomposed`)

**Required entities:**
- Action/Sub-Action ❌ (created here); hosts D3FEND fields

**Deliverables (governance registration only):**
1. Create Action/Sub-Action: targetEntity, executionMethod, outcomeClassification, estimatedEffortHours, actualEffortHours, approvalRef
2. Add D3FEND `tacticType` (isolate/evict/restore/harden/detect) and `countermeasures[]` (≤10) to Sub-Action
3. Additive — does not modify case lifecycle engine logic
4. Update DATA_DICTIONARY.md (new entity)

**Completion gate:**
- ✅ Action/Sub-Action contract + schema + fixture exist
- ✅ D3FEND fields present on Sub-Action
- ✅ DATA_DICTIONARY.md entry created; ARCH-DEBT-044 + ARCH-DEBT-046 RESOLVED
- ✅ Case lifecycle engine logic unchanged

**Source tag:** Foundational

---

---

## Summary

**Total build units:** 51 (Unit 0 foundation-correction + Units 1–49, with Unit 16 split into 16a + 16b per `DEC-command-centre-split-16a-16b`)

**Readiness state (computed 2026-05-31):** READY = 3 (Units 1, 2, 4). DONE = 1 (Unit 0). BLOCKED = 46. See the Live Status Snapshot near the top for the full per-unit table.

**Foundation correction (Team 1):** Unit 0 (closed ARCH-DEBT-033, `common.ts` contract-vs-source drift) — DONE.

**Foundational units (Team 1):** 22 (Units 1-22, 38, 40, 43)

**Team 2 units (future derivation stream):** 27 (Units 23-37, 39, 41-42, 44-49)

**Data-layer completion (ARCH-DEBT-030/031/032):** Units 1-3 (FIRST — foundational)

**Strategy Layer (build-blocking):** Unit 6 (MUST complete before Units 7-13)

**Case Layer (core):** Units 7-13 (case lifecycle, routing, prioritisation, SLA, validation, closure gates, reopening triggers)

**Intelligence Layer:** Unit 14 (four streams + Estate Intelligence Picture)

**OODA Layer:** Unit 15 (programme-level OODA tempo)

**Surface Layer (Operational App):** Units 16a, 16b, 17-21 (Operational Command Centre [16a], Aggregate/Posture Command Centre [16b], Case Management, Identity Intelligence, Asset Intelligence, External Operating Picture, Internal Operating Picture)

**Tenant Admin Surface:** Unit 22

**Commercial Control Plane:** Unit 23 (Team 2)

**Engine Layer:** Units 24-29 (Team 2 — drift, identity, architecture, vulnerability, exposure, Pre-Warned classification)

**Surface Layer (additional):** Units 30-37 (Team 2 — vulnerability, exposure, architecture, control coverage, Direction Boards, governance/reporting, CISO Dashboard, War Room)

**Mock Connectors:** Unit 38 (Foundational)

**Real Connector Readiness:** Unit 39 (Team 2 — Phase 2)

**Commander AI:** Unit 40 (Foundational), Unit 41 (Team 2 — AWS evaluation)

**Push Governance:** Unit 42 (Team 2 — dry-run only)

**Audit Trail:** Unit 43 (Foundational)

**Email Communication:** Unit 44 (Team 2)

**Security Tool Intelligence:** Units 45-46 (Team 2)

**DevOps/Infrastructure:** Units 47-49 (Team 2 — Phase 3)

---

## Completion Criteria

A build unit is complete when:
1. All deliverables are implemented
2. All completion gates pass
3. All tests pass
4. For data-layer units: DATA_DICTIONARY.md entry updated to mark entity AVAILABLE
5. For foundational gap units (1-3): ARCHITECTURAL_DEBT_REGISTER.md entry marked RESOLVED
6. Code committed to repository
7. Documentation updated

---

## Next Steps

1. **Review this build sequence** — owner approval required before any unit starts
2. **Prioritize foundational units** — Units 1-22, 38, 40, 43 are Team 1 (immediate)
3. **Defer Team 2 units** — Units 23-37, 39, 41-42, 44-49 are future derivation stream
4. **Start with data-layer completion** — Units 1-3 close ARCH-DEBT-030/031/032 (foundational gaps)
5. **Build Strategy Layer next** — Unit 6 is build-blocking (prerequisite to case lifecycle)
6. **Follow strict sequencing** — respect dependencies, data-first/UI-last discipline

---

**Last Updated:** 2026-06-02  
**Status:** ACTIVE — readiness state machine. Build only from the READY set (currently Units 17, 18, 19, 20, 21, 22, 38, 40 and COIM-H; Units 0–15 + 16a + COIM-A…COIM-G DONE). Status recomputes on debt-resolution / unit-completion.  
**Enforcement:** ARCH-006 (build-stream sequencing) + ARCH-007 (blocking-debt prerequisite) in `.kiro/testing/conformance-registry.md`, auto-run via post-task-review. "What's next" query defined in `.kiro/steering/execution-discipline.md`.  
**Authority:** Derived from SYSTEM_KNOWLEDGE_GRAPH.md, DATA_DICTIONARY.md, REBASELINED_BUILD_SCHEDULE_NOTES.md, baseline source. Decision: `DEC-build-readiness-state-machine` (DECISIONS.md).  
**Sourcing rule:** Never cite the translation layer — all citations from `docs/99_source_archive/baseline_v2_6_2/`

