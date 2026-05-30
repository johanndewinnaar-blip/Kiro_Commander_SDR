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

### Command 3: "show debt register [scope]"

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

```
You: show debt register DSC-006
Kiro: Debt Register (filtered: DSC-006)
      [lists all font inheritance violations]
```

**Use Case:** Check what debt exists, what work will resolve it, and what's scheduled vs. unscheduled. Use before planning new work to see if it will close existing debt items.

---

## Pipeline Execution (Commands 1 & 2)

Commands 1 and 2 invoke the IDENTICAL pipeline:

1. **Debt Closure Loop** — re-check open/scheduled debt items, mark resolved if clear
2. **Functional Checks** — build, tests, types, lint
3. **Conformance Checks** — all assertions in conformance registry
4. **Debt Typing** — classify failures as Regression / Quick Debt / Structural Debt
5. **Auto-Fix** — attempt to resolve regressions and quick debt (up to 4 attempts)
6. **Register Debt** — log structural debt and failed quick debt to register
7. **Re-Check** — re-run after each fix
8. **Commit** — when functional and conformance are green (or debt is registered)
9. **Halt** — after 4 failed fix attempts for regressions/functional failures

**Rules:**
- Never commit red functional or regression conformance failures
- Debt never blocks commit — it's tracked in the register
- Auto-fix respects 4-attempt halt for regressions and functional failures
- Quick debt that fails to auto-fix in 4 attempts is downgraded to structural and registered (not halted)
- Structural debt goes straight to register (never auto-fixed)
- Pre-existing debt resolved ONE SPEC AT A TIME
- Regressions vs debt distinguished in reporting
- Missing scorecards created mid-run
- Debt closure loop runs on every invocation

**Full Pipeline Documentation:** `.kiro/testing/core-testing-pipeline.md`  
**Debt Register:** `docs/00_authority/debt-register.md`

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
**Scorecards:** TEMPLATE READY — `.kiro/testing/scorecard-template.md`

**Commands Available:**
1. `run core testing [scope]` — Run pipeline on specified scope
2. `test my last build` — Run pipeline on last commit's changes
3. `show debt register [scope]` — Query tracked debt

**Next Step:** When you're ready to test, invoke one of the trigger commands above. Recommended first use: `test my last build`.

---

## DO NOT RUN NOW

This file registers the capability. **Do NOT execute the pipeline now.** You will decide what to test and when, separately.

When you're ready, simply type one of the trigger commands and Kiro will execute the full pipeline automatically.
