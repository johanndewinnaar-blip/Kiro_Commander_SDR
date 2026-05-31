# Rebaselined Build Schedule — Standing Notes

**Purpose:** Capture foundational gaps, prerequisites, and sequencing constraints to be incorporated when `REBASELINED_BUILD_SEQUENCE.md` is built from the verified knowledge graph.

**Authority:** These notes feed into the build-sequence derivation (Step 2 / Task 8 completion). They do NOT override the knowledge graph — they inform it.

---

## Foundational Data-Layer Gaps (ARCH-DEBT-030/031/032)

**Status:** OPEN  
**Priority:** HIGH — foundational data-layer completeness  
**Source:** DATA_DICTIONARY.md contract-vs-schema reconciliation (2026-05-31)

### Gap 1: Risk Object DB Schema Missing (ARCH-DEBT-030)

- **Contract:** `packages/contracts/src/entities/risk-object.ts` ✅
- **Fixture:** `packages/contracts/src/fixtures/seed-risk-objects.ts` ✅
- **DB Schema:** ❌ MISSING
- **Blocker:** Risk objects cannot be persisted without db schema
- **Scope of fix:** Create `packages/db/src/schema/risk-objects.ts` with Drizzle schema matching contract (8 RiskObjectType values, 4 TreatmentState values)
- **Build-sequence note:** Risk Object schema MUST be built before any case-lifecycle work that creates or binds risk objects (Spec #29 Universal Risk Object and Case Binding)

### Gap 2: Strategy Policy DB Schema Missing (ARCH-DEBT-031)

- **Contract:** `packages/contracts/src/entities/strategy.ts` ✅
- **Fixture:** `packages/contracts/src/fixtures/seed-strategies.ts` ✅
- **DB Schema:** ❌ MISSING
- **Blocker:** Strategy policies cannot be persisted without db schema
- **Scope of fix:** Create `packages/db/src/schema/strategies.ts` with Drizzle schema matching contract (13 StrategySurfaceType values, 6 StrategyPolicyStatus values)
- **Build-sequence note:** Strategy Policy schema MUST be built before any strategy-layer runtime work (Spec #32 Strategy Layer Runtime Surface). Per BUILD_SEQUENCE.md doctrine #7, Strategy Layer is build-blocking and prerequisite to case management, routing, validation/closure, reopening, and Fusion Map.

### Gap 3: Case Strategy Binding Incomplete (ARCH-DEBT-032)

- **Contract:** `packages/contracts/src/entities/case-strategy-binding.ts` ✅
- **Fixture:** ❌ MISSING
- **DB Schema:** ❌ MISSING
- **Blocker:** Case strategy bindings cannot be persisted or seeded
- **Scope of fix:** Create both `packages/db/src/schema/case-strategy-bindings.ts` and `packages/contracts/src/fixtures/seed-case-strategy-bindings.ts`
- **Build-sequence note:** Case Strategy Binding schema + fixture MUST be built before case-lifecycle work that consumes strategy policies (routing, SLA, prioritisation-weight, closure-gate, reopening-trigger, validation-window). This is the binding layer between cases and strategy policies — without it, cases cannot consume strategy values (violates "no hardcoded values" doctrine).

---

## Sequencing Constraints for Rebaselined Build

When `REBASELINED_BUILD_SEQUENCE.md` is derived from the knowledge graph, these constraints MUST be honored:

1. **Data-layer-first discipline:**
   - Risk Object schema → before case-lifecycle work
   - Strategy Policy schema → before strategy-layer runtime work
   - Case Strategy Binding schema + fixture → before case-lifecycle work that consumes strategy

2. **Strategy Layer precedence (BUILD_SEQUENCE.md doctrine #7):**
   - Strategy Layer Runtime Surface (Spec #32) is build-blocking
   - MUST precede: Case Management, Routing, Validation/Closure, Reopening, Fusion Map
   - Current build plan violated this (BP-05 Case Management declared "Implemented" with no Strategy Layer BP)

3. **Canonical entity completeness:**
   - All 10 entities in DATA_DICTIONARY.md MUST have complete contract + schema + fixture before domain features that consume them
   - Current gaps (ARCH-DEBT-030/031/032) MUST be closed in early build units

4. **No hardcoded values doctrine:**
   - Case Strategy Binding is the mechanism that prevents hardcoded SLA/routing/priority values
   - Without it, case-lifecycle work would violate doctrine
   - MUST be built before any case-management features

---

## Build Unit Recommendations

When the rebaselined build sequence is created, consider these early build units:

### Build Unit: Data-Layer Completion (Foundational)

**Scope:** Close ARCH-DEBT-030/031/032

**Deliverables:**
1. `packages/db/src/schema/risk-objects.ts` (Drizzle schema for Risk Object)
2. `packages/db/src/schema/strategies.ts` (Drizzle schema for Strategy Policy)
3. `packages/db/src/schema/case-strategy-bindings.ts` (Drizzle schema for Case Strategy Binding)
4. `packages/contracts/src/fixtures/seed-case-strategy-bindings.ts` (fixture linking cases to strategy policies)
5. Update DATA_DICTIONARY.md to mark all 3 entities AVAILABLE
6. Update ARCHITECTURAL_DEBT_REGISTER.md to mark ARCH-DEBT-030/031/032 RESOLVED

**Prerequisites:** None (foundational)

**Blocks:** All case-lifecycle work, all strategy-layer work

**Authority:** Spec #29 (Risk Object), Spec #32 (Strategy Layer), Spec #08 (Case Management)

---

### Build Unit: Strategy Layer Runtime Surface (Build-Blocking)

**Scope:** Implement Spec #32 Strategy Layer Runtime Surface

**Prerequisites:** Data-Layer Completion (Strategy Policy schema must exist)

**Blocks:** Case Management, Routing, Validation/Closure, Reopening, Fusion Map (per BUILD_SEQUENCE.md doctrine #7)

**Authority:** Spec #32

---

### Build Unit: Case Lifecycle with Strategy Binding

**Scope:** Implement case-lifecycle work that consumes strategy policies

**Prerequisites:** 
- Data-Layer Completion (Risk Object, Strategy Policy, Case Strategy Binding schemas + fixtures)
- Strategy Layer Runtime Surface (strategy policies must be available)

**Authority:** Spec #08, Spec #29, Spec #30, Spec #31, Spec #32

---

## Notes for Knowledge-Graph Derivation

When the knowledge graph is used to derive the build sequence:

1. **Read ARCHITECTURAL_DEBT_REGISTER.md** — ARCH-DEBT-030/031/032 are structural gaps that affect build order
2. **Read DATA_DICTIONARY.md** — 3 entities have FUTURE availability due to missing schemas/fixtures
3. **Honor BUILD_SEQUENCE.md doctrine #7** — Strategy Layer is build-blocking (current plan violated this)
4. **Apply data-layer-first discipline** — schemas before features, fixtures before UI

---

**Last Updated:** 2026-05-31  
**Status:** ACTIVE — consumed by REBASELINED_BUILD_SEQUENCE.md (now an enforced readiness state machine)

---

## Readiness State Machine (incorporated 2026-05-31)

`REBASELINED_BUILD_SEQUENCE.md` is no longer a static ordered list — it is a **queryable readiness state machine**. The sequencing constraints captured in these notes are now expressed as computed per-unit `Status` (BLOCKED / READY / DONE) with explicit `Blocked by` lines.

- **BLOCKED** — unit has unresolved OPEN ARCH-DEBT in its chain, or dependency units not yet DONE. Not buildable.
- **READY** — all chain debt RESOLVED and all dependency units DONE. Buildable now. Build only from READY.
- **DONE** — built and committed.

The data-layer-first and Strategy-Layer-precedence constraints in these notes are preserved as dependency edges feeding that computation. The foundational data-layer gaps (ARCH-DEBT-030/031/032) and the canonical-contract correction (ARCH-DEBT-033, Unit 0) are the current chain blockers; Unit 0 is the single READY unit.

Recompute is mechanical: when an ARCH-DEBT flips RESOLVED or a unit flips DONE, dependent units are recomputed and any now-clear unit flips BLOCKED→READY. Enforced by ARCH-006 (stream sequencing) + ARCH-007 (blocking-debt prerequisite); "what's next" query behaviour is defined in `.kiro/steering/execution-discipline.md`. Authority: `DEC-build-readiness-state-machine` (DECISIONS.md).
