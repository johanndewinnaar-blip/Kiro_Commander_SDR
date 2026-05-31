# Unit Closure Review — Pre-Commit Checklist

**Purpose:** Mandatory pre-commit operating step for any build unit. Run this checklist before staging and committing a unit. Report each item factually.

**When to use:** Before every unit commit. This is not optional — it is a standing execution requirement per `.kiro/steering/execution-discipline.md`.

---

## Checklist

Report each item with ✅ (satisfied), ❌ (not satisfied — block commit), or N/A (not applicable to this unit):

### 1. Implementation Completion
- [ ] All deliverables listed in the unit's definition in `REBASELINED_BUILD_SEQUENCE.md` are implemented.
- [ ] No deliverable is deferred, stubbed, or marked "Phase 2" unless the unit definition explicitly permits it.

### 2. Migration Status
- [ ] If the unit adds or modifies a DB schema file, a Drizzle migration has been generated.
- [ ] Migration file name follows the convention: `NNNN_<description>_unitN.sql`.
- [ ] If no schema change, state "N/A — no schema change."

### 3. DATA_DICTIONARY.md Status
- [ ] If the unit adds a new entity, field, or resolver that changes availability status, `DATA_DICTIONARY.md` is updated.
- [ ] If no dictionary-relevant change, state "N/A — no new entity/field/availability change."

### 4. ARCH-DEBT Status
- [ ] If the unit resolves a listed ARCH-DEBT item, the item is marked RESOLVED with an ARCH-009 verification line.
- [ ] If the unit creates source-proven new debt, it is logged.
- [ ] If neither applies, state "N/A — no debt resolved or created."

### 5. ARCH-009 Verification
- [ ] The unit's entry in `REBASELINED_BUILD_SEQUENCE.md` has a `**Verification:**` line citing:
  - (a) Baseline spec #N from `docs/99_source_archive/baseline_v2_6_2/`
  - (b) Evidence type (typecheck / test / grep / diff / migration / review)
- [ ] Any resolved ARCH-DEBT item also has a verification line.

### 6. REBASELINED_BUILD_SEQUENCE.md Status
- [ ] Unit status updated to DONE.
- [ ] Dependent units recomputed (BLOCKED → READY where dependency chain is now satisfied).
- [ ] Snapshot table updated.
- [ ] Summary/footer READY set updated.

### 7. Tests / Conformance / Pipeline
- [ ] **Core Testing Pipeline was run** (scoped to this unit's files). State method: automated runner OR manual grep.
- [ ] Pipeline outcome: ARCH-005 (data-dictionary completeness) — PASS / FAIL / N/A.
- [ ] Pipeline outcome: ARCH-006 (build-stream sequencing) — PASS / FAIL / N/A.
- [ ] Pipeline outcome: ARCH-007 (blocking-debt prerequisite) — PASS / FAIL / N/A.
- [ ] Pipeline outcome: ARCH-008 (readiness-machine integrity) — PASS / FAIL / N/A.
- [ ] Pipeline outcome: ARCH-009 (verification-before-done) — PASS / FAIL / N/A.
- [ ] Typecheck passes (tsc --noEmit exit 0).
- [ ] Full test suite run — report pass count and confirm 0 new failures.
- [ ] Pre-existing failures are unchanged (same count, same tests).
- [ ] If pipeline produced a run log, state its location.

### 8. Exact Stage List
- [ ] List every file to be staged for this commit.
- [ ] Confirm no files from other units are included.
- [ ] Confirm no Unit 4 stash, Unit 5, or other in-progress work is accidentally staged.

### 9. Commit Readiness
- [ ] All items above are ✅ or N/A.
- [ ] Commit message prepared (format: "Complete Unit N <description>").
- [ ] Owner approval received before committing.

---

## Usage

Before committing any unit, run this checklist and report the results. If any item is ❌, do not commit — resolve the issue first and re-run.

**Authority:** `.kiro/steering/execution-discipline.md` §Unit closure review.
