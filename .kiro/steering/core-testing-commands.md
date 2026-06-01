---
inclusion: fileMatch
fileMatchPattern: ".kiro/testing/**,docs/00_authority/test-runs/**,docs/00_authority/score-register*,docs/00_authority/debt-register*"
---

# Core Testing Commands — Commander SDR

**Purpose:** Register trigger commands for invoking the core testing pipeline. When you type these phrases, Kiro runs the full conveyor-belt pipeline automatically with all rules baked in.

**Authority:** This file registers the commands. The pipeline itself is documented in `.kiro/testing/core-testing-pipeline.md`. The conformance standards are in `.kiro/testing/conformance-registry.md`.

---

## Trigger Commands

### Command 1: "run core testing [scope]"

**Purpose:** Run the full pipeline on the scope you specify.

**Scope Options:**
- **Spec number:** `run core testing 00` (single spec)
- **Spec range:** `run core testing 02-05` (specs 2 through 5)
- **All specs:** `run core testing 00-latest` or `run core testing all`
- **File path:** `run core testing apps/web/src/app/page.tsx`
- **Directory:** `run core testing apps/web/src/components/`
- **No scope:** `run core testing` (Kiro will ask which scope)

**What Happens:**
1. Kiro identifies all units in the specified scope
2. For each unit, runs the full pipeline:
   - Functional checks (build, tests, types, lint)
   - Conformance checks (all assertions in registry)
   - Auto-fix (up to 4 attempts)
   - Re-check after each fix
   - Commit when green, or halt and flag when 4 attempts exhausted
3. Reports per-unit results
4. Aggregates final summary

**Example:**
```
You: run core testing 00-05
Kiro: Running core testing pipeline on specs 00-05...
      [processes each spec]
      Summary: 6 specs, 5 passed, 1 halted (spec 03)
```

---

### Command 2: "test my last build"

**Purpose:** Run the same pipeline scoped only to the most recent commit's changes. Fast pre-commit gate.

**Scope:** Files changed in the last commit.

**What Happens:**
1. Kiro gets the last commit: `git log -1 --name-only`
2. Extracts changed files
3. Runs the full pipeline on each file
4. Reports results

**Example:**
```
You: test my last build
Kiro: Testing files from last commit (3 files)...
      [processes each file]
      Summary: 3 files, 3 passed, 0 halted
```

**Use Case:** Quick validation before pushing. Catches regressions in recent changes without running the full suite.

---

### Command 3: "show audit scores [scope]"

**Purpose:** Query the score register to see current audit scores per strategy/layer.

**Scope Options:**
- **No scope:** `show audit scores` (show all layers)
- **Layer:** `show audit scores application` (filter by layer: application/token/design-contract/data/database/infrastructure/auth)

**What Happens:**
1. Kiro loads the score register: `docs/00_authority/score-register.md`
2. Filters to requested layer (if specified)
3. Outputs formatted report with:
   - Current scores per layer
   - Band (Green/Amber/Red)
   - Pass rate
   - Delta vs baseline (54e553d)
   - Delta vs previous run
   - Per-assertion pass rates (if layer specified)

**Examples:**
```
You: show audit scores
Kiro: Audit Scores (Current)
      
      Application Layer: Amber (85% pass rate)
        vs Baseline: +5%
        vs Previous: +2%
      
      Token Conformance: Green (100% pass rate)
        vs Baseline: +0%
        vs Previous: +0%
      
      Design Contract: Amber (88% pass rate)
        vs Baseline: +8%
        vs Previous: +3%
      
      [other layers]
```

```
You: show audit scores design-contract
Kiro: Design Contract Conformance
      Band: Amber | Pass Rate: 88%
      Delta vs Baseline: +8% | Delta vs Previous: +3%
      
      Per-Assertion:
      - DSC-001 (PageContainer): 95% pass
      - DSC-002 (Square Corners): 100% pass
      - DSC-003 (Tabler Classes): 90% pass
      [...]
```

**Use Case:** Check current conformance quality, track improvement over time, identify weak areas.

---

### Command 4: "show score history [layer]"

**Purpose:** Query the score register to see trend over time.

**Scope Options:**
- **No scope:** `show score history` (show all layers over time)
- **Layer:** `show score history application` (filter by layer)

**What Happens:**
1. Kiro loads the score register history
2. Filters to requested layer (if specified)
3. Outputs chronological trend with:
   - Date, commit, scope for each run
   - Scores per layer per run
   - Deltas between runs
   - Overall trajectory (improving/stable/regressing)

**Example:**
```
You: show score history
Kiro: Score History (All Layers)
      
      Run 1: 2026-05-29 (54e553d) — Baseline
        Application: Amber (80%)
        Token: Green (100%)
        Design: Amber (80%)
      
      Run 2: 2026-05-30 (7d6ad7a)
        Application: Amber (85%) [+5%]
        Token: Green (100%) [+0%]
        Design: Amber (88%) [+8%]
      
      Trajectory: Improving (+4.3% average)
```

**Use Case:** Track quality trajectory, validate that conformance is improving, identify regression patterns.

---

### Command 5: "show last test run"

**Purpose:** Query the most recent run output log.

**What Happens:**
1. Kiro finds the most recent file in `docs/00_authority/test-runs/`
2. Outputs the run summary:
   - Date, commit, scope
   - Units passed/halted
   - Fixes applied, debt resolved/registered
   - Score deltas
   - Halted units requiring review

**Example:**
```
You: show last test run
Kiro: Last Test Run: 2026-05-30 (7d6ad7a)
      
      Scope: specs 00-05
      Duration: 12m 34s
      
      Units: 25 | Passed: 23 | Halted: 2
      Fixes: 8 | Debt Resolved: 3 | Debt Registered: 2
      
      Halted Units:
      - spec-03/task-5: TypeScript errors after 4 fix attempts
      - spec-04/task-2: Conformance regression (DSC-006)
      
      Full log: docs/00_authority/test-runs/2026-05-30-7d6ad7a.md
```

**Use Case:** Quick check of what happened in the last run, identify what needs human review.

---

### Command 6: "show debt register [scope]"

**Purpose:** Query the tracked debt register to see all open, scheduled, and resolved conformance debt.

**Scope Options:**
- **No scope:** `show debt register` (show all entries)
- **File/path:** `show debt register control-plane` (filter by file path substring)
- **Assertion:** `show debt register DSC-006` (filter by violated assertion)
- **Debt type:** `show debt register structural` (filter by debt type: quick/structural)
- **Status:** `show debt register open` (filter by status: open/scheduled/resolved)

**What Happens:**
1. Kiro loads the debt register: `docs/00_authority/debt-register.md`
2. Filters entries based on scope (if provided)
3. Outputs formatted report with:
   - Summary counts (open/scheduled/resolved)
   - Each matching entry with:
     - ID
     - File/unit affected
     - Violated assertion
     - Debt type
     - Description
     - **Scope of fix** (what work will resolve it)
     - Scheduled resolution (which spec/work package)
     - Status
     - Date logged
     - Last checked

**Examples:**
```
You: show debt register
Kiro: Debt Register Summary
      Open: 2 | Scheduled: 3 | Resolved: 5 | Total: 10
      
      [lists all entries]
```

```
You: show debt register control-plane
Kiro: Debt Register (filtered: control-plane)
      Open: 0 | Scheduled: 1 | Resolved: 0 | Total: 1
      
      DEBT-001: Control Plane Font Override
      File: apps/web/src/app/control-plane/layout.tsx
      Violated: DSC-006 (Font Inheritance)
      Type: Structural
      Scope of Fix: Control Plane shell Tabler conversion — convert layout.tsx to Tabler, remove Bebas Neue font import and override, inherit Inter globally from root layout
      Scheduled: Control Plane Tabler conversion spec (deferred)
      Status: Scheduled
      Logged: 2026-05-30 | Last Checked: 2026-05-30
```

**Use Case:** Check what debt exists, what work will resolve it, and what's scheduled vs. unscheduled. Use before planning new work to see if it will close existing debt items.

---

## Pipeline Execution (Commands 1 & 2)

Commands 1 and 2 invoke the IDENTICAL pipeline with CONTINUOUS RUN-THROUGH behavior:

**Pre-Run:**
1. **Load baseline** (commit 54e553d)
2. **Debt closure loop** — re-check open/scheduled debt, mark resolved if clear
3. **Initialize run log** — create `docs/00_authority/test-runs/[date]-[commit].md`
4. **Initialize score tracking** — prepare accumulators per layer

**Per-Unit Processing:**
5. **Functional checks** — build, tests, types, lint
6. **Conformance checks** — all assertions in conformance registry
7. **Debt typing** — classify failures as Regression / Quick Debt / Structural Debt
8. **Auto-fix** — attempt to resolve regressions and quick debt (up to 4 attempts per unit)
9. **Register debt** — log structural debt and failed quick debt to register
10. **Commit** — when functional and conformance are green (or debt is registered)
11. **Halt** — after 4 failed fix attempts for regressions/functional failures, log halt and **CONTINUE to next unit**

**Post-Run:**
12. **Finalize run log** — write full per-unit results, summary, halted units
13. **Update score register** — calculate scores per layer, deltas vs baseline and previous
14. **Save debt register** — final save with updated counts
15. **Output consolidated summary** — units passed/halted, fixes, debt, score deltas, record locations

**CRITICAL RULES:**
- **CONTINUOUS:** No pauses, no permission requests mid-run. Fire-and-walk-away.
- **HALT stops unit, NOT run:** Log halt, flag for review, continue to next unit.
- **Never abort sweep:** Process entire scope start-to-finish.
- **Three records updated:** Run log, score register, debt register.
- **Regressions block unit:** Never commit a regression. Halt unit and continue run.
- **Debt never blocks:** Tracked in register, allowed to proceed.
- **Quick debt gets 4 attempts:** If fails, downgrade to structural and register (not halt).
- **Structural debt never auto-fixed:** Goes straight to register with scope.

**Full Pipeline Documentation:** `.kiro/testing/core-testing-pipeline.md`  
**Debt Register:** `docs/00_authority/debt-register.md`  
**Score Register:** `docs/00_authority/score-register.md`  
**Run Logs:** `docs/00_authority/test-runs/`

---

## Validation Guidance

### First Real Use: "test my last build"

**Recommendation:** The first time you invoke this capability, use `test my last build` on a single commit to prove the pipeline behaves correctly before running a full `run core testing 00-latest` sweep.

**Why:**
- Single commit scope is bounded and fast
- Validates pipeline logic without long runtime
- Catches any pipeline bugs before full sweep
- Builds confidence in auto-fix behavior

**Steps:**
1. Make a small change (e.g., fix a typo)
2. Commit it
3. Run: `test my last build`
4. Observe: functional checks, conformance checks, auto-fix, reporting
5. If pipeline behaves correctly, proceed to larger scopes

---

### Full Sweep: "run core testing 00-latest"

**When to Use:** After validating pipeline on single commit, run full sweep to:
- Resolve all pre-existing debt
- Validate entire codebase against conformance registry
- Create missing scorecards
- Establish green baseline

**Warning:** Full sweep may take significant time. Pipeline processes each unit sequentially with up to 4 fix attempts per unit.

**Recommendation:** Run during low-activity period (e.g., end of day, weekend).

---

## Conformance Registry

**Location:** `.kiro/testing/conformance-registry.md`

**What It Contains:** Every enforceable assertion for Commander SDR:
- Design system contract (DSC-001 through DSC-012)
- Token system (TOK-001 through TOK-003)
- Performance doctrine (PERF-001 through PERF-005)
- Commander doctrine (DOC-001 through DOC-008)
- Architectural rules (ARCH-001 through ARCH-004)
- Decision records (DEC-001, DEC-002)

**Adding New Standards:** Add assertion to registry with unique ID, source authority, and check method. Pipeline automatically enforces on next run.

---

## Reporting

**Per-Unit Report:**
```
Unit: [unit-id]
Status: [PASS | FAIL | HALT]

Functional Checks: [✅ | ❌]
Conformance Checks: [✅ | ❌]
Fixes Applied: [count]
Debt Resolved: [count]
Scorecards Created: [count]
Committed: [yes | no]
```

**Aggregate Summary:**
```
Core Testing Pipeline Complete

Scope: [scope description]
Total Units: [count]
Passed: [count]
Halted: [count]

Fixes Applied: [total count]
Debt Resolved: [total count]
Scorecards Created: [total count]
Commits Made: [count]

Halted Units (require human review):
- [unit 1]: [reason]
- [unit 2]: [reason]
```

---

## Rules Summary

1. ✅ Build the command capability only. Do NOT run any testing now.
2. ✅ Never commit red functional or regression conformance failures — halt and flag instead.
3. ✅ Debt never blocks commit — it's tracked in the register and allowed to proceed.
4. ✅ Auto-fix respects the 4-attempt halt for regressions and functional failures.
5. ✅ Quick debt that fails to auto-fix in 4 attempts is downgraded to structural and registered (not halted).
6. ✅ Structural debt is never auto-fixed — it goes straight to the register with scope and scheduled resolution.
7. ✅ The conformance registry is the single source of what "conformant" means.
8. ✅ The debt register is the single source of tracked debt.
9. ✅ Debt closure loop runs on every pipeline invocation — resolved items are marked automatically.
10. ✅ Adding a future standard means adding a registry assertion, not rewriting the pipeline.
11. ✅ Distinguish regressions from debt in reporting and handling.
12. ✅ Resolve pre-existing debt ONE SPEC AT A TIME, bounded by 4-attempt halt for quick debt only.
13. ✅ Create missing scorecards mid-run from Application Layer pattern.

---

## Status

**Capability:** REGISTERED — ready for invocation  
**Pipeline:** READY — documented in `.kiro/testing/core-testing-pipeline.md`  
**Registry:** ACTIVE — documented in `.kiro/testing/conformance-registry.md`  
**Debt Register:** ACTIVE — documented in `docs/00_authority/debt-register.md`  
**Score Register:** ACTIVE — documented in `docs/00_authority/score-register.md`  
**Run Logs:** Directory created at `docs/00_authority/test-runs/`  
**Scorecards:** TEMPLATE READY — `.kiro/testing/scorecard-template.md`

**Commands Available:**
1. `run core testing [scope]` — Continuous run on specified scope
2. `test my last build` — Continuous run on last commit's changes
3. `show audit scores [layer]` — Current scores per layer with deltas
4. `show score history [layer]` — Trend over time per layer
5. `show last test run` — Most recent run output log
6. `show debt register [scope]` — Query tracked debt

**Execution Mode:** CONTINUOUS RUN-THROUGH. Fire-and-walk-away. No pauses mid-run.

**Durable Records:** Every run updates three records:
- Run log: `docs/00_authority/test-runs/[date]-[commit].md`
- Score register: `docs/00_authority/score-register.md`
- Debt register: `docs/00_authority/debt-register.md`

**Next Step:** When you're ready to test, invoke one of the trigger commands above. Recommended first use: `test my last build`.

---

## DO NOT RUN NOW

This file registers the capability. **Do NOT execute the pipeline now.** You will decide what to test and when, separately.

When you're ready, simply type one of the trigger commands and Kiro will execute the full pipeline automatically.
