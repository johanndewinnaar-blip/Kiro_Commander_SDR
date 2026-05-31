# Core Testing Pipeline — Commander SDR

**Purpose:** Automated conveyor-belt testing pipeline that validates functional correctness AND conformance to all Commander standards. Invoked via trigger commands in `.kiro/steering/core-testing-commands.md`.

**Authority:** This pipeline is the single enforcement mechanism for the conformance registry. It runs per unit (spec, file, or commit) in sequence with auto-fix and halt rules.

**Execution Mode:** CONTINUOUS RUN-THROUGH. Once invoked, processes entire scope start-to-finish without pausing. A HALT stops a unit, not the run. Fire-and-walk-away behavior.

**Durable Records:** Every run updates three records:
1. **Run Output Log** (`docs/00_authority/test-runs/[date]-[commit].md`) — Per-unit results, full detail
2. **Score Register** (`docs/00_authority/score-register.md`) — Audit scores per layer, deltas vs baseline
3. **Debt Register** (`docs/00_authority/debt-register.md`) — Outstanding debt with scope and schedule

---

## Pre-Run: Initialization

**Before processing any units:**

1. **Load Baseline Reference**
   - Baseline commit: 54e553d
   - Load baseline scores from score register

2. **Run Debt Closure Loop**
   - Load debt register
   - Re-check all Open/Scheduled debt items
   - Mark Resolved if violations cleared
   - Update Last Checked dates
   - Save updated register

3. **Initialize Run Log**
   - Create run log file: `docs/00_authority/test-runs/[YYYY-MM-DD]-[commit-short].md`
   - Record: date, commit, scope, start time

4. **Initialize Score Tracking**
   - Prepare score accumulators per layer
   - Prepare assertion pass/fail counters

---

## Pipeline Stages (Per Unit)

### Stage 1: Functional Checks

**What:** Build passes, tests pass, no runtime/type errors.

**Steps:**
1. Run TypeScript compilation: `pnpm tsc --noEmit`
2. Run linter: `pnpm lint`
3. Run test suite: `pnpm test` (if tests exist for unit)
4. Run build: `pnpm build` (for affected apps)

**Pass Criteria:** All commands exit 0, no errors.

**Fail Action:** Proceed to Stage 3 (Auto-Fix).

---

### Stage 2: Conformance Checks

**What:** Validate against every assertion in `.kiro/testing/conformance-registry.md`.

**Steps:**
1. Load conformance registry
2. For each assertion applicable to the unit:
   - Run the check method specified in the assertion
   - Record pass/fail
3. Aggregate results
4. **Classify any failures** (see Debt Typing below)

**Build-readiness / sequencing gate (ARCH-006 + ARCH-007):** Before building any unit, evaluate its readiness state:
- **ARCH-006** — if the unit is tagged `Team 2`, confirm `USE_CASE_SCHEDULE.md` and `PAGE_INVENTORY.md` exist and `PAGE_INVENTORY.md` lists the unit. FAIL (sequencing violation) otherwise.
- **ARCH-007** — read the unit's `Status` in `REBASELINED_BUILD_SEQUENCE.md`. FAIL if `Status` is `BLOCKED`. Mechanically verify both cases: every dependency unit is `DONE`, and every chain-mapped ARCH-DEBT in `ARCHITECTURAL_DEBT_REGISTER.md` is `RESOLVED` (a unit's own resolving debt is excluded). Allow build only when `Status` is `READY`.

These are mechanical file-existence + grep checks. Readiness/sequencing violations are Structural Debt (not auto-fixed).

**Pass Criteria:** All applicable assertions pass.

**Fail Action:** Classify failure type, then proceed to Stage 3 (Auto-Fix) or Stage 2b (Register Debt).

---

### Stage 2b: Debt Typing and Registration

**What:** Classify conformance failures to determine handling strategy.

**Debt Types:**

#### REGRESSION
Code that was conformant and a recent change broke it.

**Detection:** Compare current state to baseline (previous commit or known-good state). If assertion passed before and fails now, it's a regression.

**Action:** BLOCK and proceed to Stage 3 (Auto-Fix). Regressions MUST be fixed or halted. Never commit a regression.

#### QUICK DEBT
Pre-existing violation that's a low-risk in-place fix.

**Examples:**
- Hardcoded hex/rgba colour instead of semantic token
- Missing semantic token reference
- Rounded corner (border-radius > 0) instead of square
- Stray inline style on otherwise-converted component
- Wrong Tabler class (e.g., `btn` instead of `btn-primary`)
- Missing workload class annotation on database call

**Detection:** Violation is isolated, localized, and fixable without touching surrounding code structure.

**Action:** Proceed to Stage 3 (Auto-Fix) with 4-attempt limit. If fix succeeds, resolve and close. If 4 attempts fail, downgrade to STRUCTURAL DEBT and proceed to Stage 2c (Register).

#### STRUCTURAL DEBT
Pre-existing violation that's part of a larger unmigrated unit.

**Examples:**
- Whole shell or page still on old design system (v3 shell with Bebas Neue)
- Component using old token system (not migrated to DS-1.0)
- Page not using PageContainer because entire section unmigrated
- Database layer using old connection pattern (not workload-separated)

**Detection:** Violation is a symptom of "not migrated yet" rather than a stray error. Fixing one line is pointless when the whole unit is scheduled for rebuild.

**Action:** DO NOT auto-fix. Skip Stage 3 and proceed directly to Stage 2c (Register). Log to debt register with full scope and scheduled resolution.

**Classification Logic:**

```
IF violation exists in baseline (previous commit):
  IF violation is isolated and low-risk:
    → QUICK DEBT (auto-fix with 4-attempt limit)
  ELSE IF violation is part of unmigrated unit:
    → STRUCTURAL DEBT (register, do not auto-fix)
ELSE:
  → REGRESSION (block and auto-fix)
```

---

### Stage 2c: Register Debt

**What:** Record structural debt (and failed quick debt) in the tracked debt register.

**When:**
- Conformance failure classified as STRUCTURAL DEBT
- OR conformance failure classified as QUICK DEBT but failed to auto-fix in 4 attempts (downgraded)

**Actions:**
1. Load debt register: `docs/00_authority/debt-register.md`
2. Generate new debt ID (next sequential: DEBT-001, DEBT-002, etc.)
3. Create register entry with:
   - ID
   - File/unit affected
   - Violated assertion (from conformance registry)
   - Debt type (Quick → downgraded to Structural, or Structural)
   - Description of violation
   - **Scope of fix** (what work will resolve it — not just "fix the violation")
   - Scheduled resolution (which spec/work package, or "unscheduled")
   - Status: Open or Scheduled
   - Date logged
   - Last checked
4. Append entry to register
5. Update summary counts
6. Continue pipeline (do NOT halt — debt is tracked, not blocking)

**Scope of Fix Examples:**
- ❌ "Fix font override" (too vague)
- ✅ "Control Plane shell Tabler conversion — convert layout.tsx to Tabler, remove Bebas Neue font import and override, inherit Inter globally from root layout"
- ❌ "Use semantic tokens" (too vague)
- ✅ "Migrate chart component to DS-1.0 semantic tokens — replace literal hex values with --data-* tokens, update chart config to reference semantic layer"

**Register Location:** `docs/00_authority/debt-register.md`

---

### Stage 3: Auto-Fix

**What:** Attempt to resolve functional failures and REGRESSION/QUICK DEBT conformance failures automatically.

**Applies To:**
- All functional failures
- Conformance failures classified as REGRESSION
- Conformance failures classified as QUICK DEBT

**Does NOT Apply To:**
- Conformance failures classified as STRUCTURAL DEBT (these go to register, not auto-fix)

**Rules:**
- Maximum 4 fix attempts per unit
- After each fix, re-run Stages 1 and 2
- If both stages pass, proceed to Stage 5 (Commit)
- If 4 attempts exhausted and still failing:
  - Functional failures → Proceed to Stage 4 (Halt)
  - REGRESSION conformance failures → Proceed to Stage 4 (Halt)
  - QUICK DEBT conformance failures → Downgrade to STRUCTURAL DEBT, register in Stage 2c, continue pipeline (do not halt)

**Quick Debt Downgrade Rule:**
When QUICK DEBT fails to auto-fix in 4 attempts, it reveals the fix is not as simple as expected. Downgrade to STRUCTURAL DEBT, register with scope of fix, and continue. Do NOT halt on debt — only regressions and functional failures halt.

**Fix Strategies:**

#### Functional Fixes
- TypeScript errors → Add missing imports, fix type annotations
- Lint errors → Apply auto-fix where available
- Test failures → Analyze and fix test logic or implementation
- Build errors → Resolve module resolution, missing dependencies

#### Conformance Fixes
- Missing PageContainer → Wrap page in PageContainer
- Wrong Tabler classes → Replace with correct classes
- Hardcoded colours → Replace with Tabler variables or semantic tokens
- Missing workload class → Add workload class annotation to database calls
- Wrong badge colours → Map to correct semantic colour per DSC-004
- Font overrides → Remove font-family overrides
- Custom card markup → Replace with Card primitive or Tabler pattern

**Attempt Counter:** Track per unit. Reset when unit passes.

---

### Stage 4: Halt and Flag

**What:** Stop processing THIS UNIT when 4 fix attempts exhausted without success.

**CRITICAL:** A HALT stops the unit, NOT the run. The pipeline logs the halt, flags for review, and CONTINUES to the next unit. Never abort the sweep.

**Actions:**
1. Do NOT commit this unit
2. Log halt to run output log:
   - Unit identifier (spec, file, commit)
   - Functional failures remaining
   - Conformance failures remaining
   - Fix attempts made (what was tried)
   - Recommended human actions
3. Flag unit for human review
4. **CONTINUE to next unit** (do not stop the run)

**Halt Report Format (in run log):**
```
HALT: Unit [unit-id] failed after 4 fix attempts

Functional Failures:
- [error 1]
- [error 2]

Conformance Failures:
- [assertion ID]: [failure description]
- [assertion ID]: [failure description]

Fix Attempts:
1. [what was tried] → [result]
2. [what was tried] → [result]
3. [what was tried] → [result]
4. [what was tried] → [result]

Recommended Actions:
- [human action 1]
- [human action 2]

Status: HALTED — requires human review
```

**After Logging:** Proceed to next unit in scope. The run continues.

---

### Stage 5: Commit

**What:** Commit the unit when both functional and conformance checks are green (or conformance failures are all registered debt).

**Commit Criteria:**
- Functional checks: ✅ All pass
- Conformance checks: ✅ All pass OR all failures are registered as debt

**Actions:**
1. Stage changes: `git add [unit files]`
2. Commit with descriptive message:
   ```
   test: [unit-id] passes core testing pipeline
   
   Functional: ✅ Build, tests, types pass
   Conformance: ✅ All assertions pass (or debt registered)
   Fixes applied: [count]
   Debt resolved: [count]
   Debt registered: [count] ([DEBT-IDs])
   ```
3. Proceed to next unit

**Rule:** NEVER commit red functional or regression conformance failures. Debt is tracked and allowed to proceed.

**After Commit:** Log to run output, update score tracking, proceed to next unit.

---

## Post-Run: Consolidation

**After processing all units in scope:**

### 1. Finalize Run Output Log

Write to `docs/00_authority/test-runs/[date]-[commit].md`:

```markdown
# Test Run: [date] ([commit])

**Scope:** [scope description]  
**Start:** [timestamp]  
**End:** [timestamp]  
**Duration:** [duration]

## Summary

**Units Processed:** [total]  
**Passed:** [count]  
**Halted:** [count]  

**Fixes Applied:** [total]  
**Debt Resolved:** [count]  
**Debt Registered:** [count]  

**Commits Made:** [count]

## Per-Unit Results

[Full detail for each unit processed]

## Halted Units (Require Human Review)

[List of halted units with reasons]

## Debt Activity

**Resolved:**
- DEBT-XXX: [description]
- DEBT-YYY: [description]

**Registered:**
- DEBT-ZZZ: [file] - [assertion] - [scope of fix]

## Score Deltas

[Layer-by-layer score changes vs baseline and previous run]

---

**Records Updated:**
- Run Log: docs/00_authority/test-runs/[date]-[commit].md
- Score Register: docs/00_authority/score-register.md
- Debt Register: docs/00_authority/debt-register.md
```

### 2. Update Score Register

Calculate and write to `docs/00_authority/score-register.md`:

**Per-Layer Scores:**
- Pass rate (% of assertions passing)
- Band (Green/Amber/Red)
- Delta vs baseline (54e553d)
- Delta vs previous run

**Per-Assertion Pass Rates:**
- Each assertion: pass/fail/debt status
- Pass rate across all units

**Append to History:**
- New run entry with date, commit, scores, deltas

### 3. Save Updated Debt Register

Already updated during run (closure loop + new registrations). Final save with updated counts.

### 4. Output Consolidated Summary

**To console/chat:**
```
Core Testing Pipeline Complete

Scope: [scope description]
Duration: [duration]

Units: [total] | Passed: [count] | Halted: [count]
Fixes: [count] | Debt Resolved: [count] | Debt Registered: [count]
Commits: [count]

Score Deltas (vs Baseline):
- Application Layer: [band] ([delta])
- Token Conformance: [band] ([delta])
- Design Contract: [band] ([delta])
- [other layers as applicable]

Halted Units (require review):
- [unit 1]: [reason]
- [unit 2]: [reason]

Records Updated:
- Run Log: docs/00_authority/test-runs/[date]-[commit].md
- Score Register: docs/00_authority/score-register.md
- Debt Register: docs/00_authority/debt-register.md

Next: Review halted units or proceed to next package.
```

**No Interactive Prompts:** The summary is informational only. No pauses, no permission requests.

---

## Debt Closure Loop

**What:** Automatically re-check and close resolved debt items.

**When:** On every pipeline run, before processing units.

**Steps:**
1. Load debt register: `docs/00_authority/debt-register.md`
2. For each entry with Status = Open or Scheduled:
   - Re-run the conformance check for the violated assertion on the affected file
   - If check now passes:
     - Update Status → Resolved
     - Update Last Checked → current date
     - Add resolution note: "Resolved automatically by pipeline on [date]"
   - If check still fails:
     - Update Last Checked → current date
     - Keep Status unchanged
3. Update register summary counts
4. Save updated register

**Scheduled Work Completion:**
When a scheduled piece of work completes (e.g., "Control Plane Tabler conversion spec"), the pipeline run for that work will automatically re-check and close associated debt items if the violations are resolved.

**Audit Trail:**
Resolved items stay in the register marked Resolved, not deleted. This preserves history of what was fixed and when.

---

## Special Cases

### Debt vs. Regressions

**Regression:** New failure introduced by current change. Was passing, now failing.  
**Debt:** Failure that existed before current change. Was failing, still failing.

**Handling:**
- **Regressions:** BLOCK. Auto-fix with 4-attempt limit. If can't fix, HALT. Never commit a regression.
- **Debt:** TRACK. Quick debt gets auto-fix attempt; structural debt goes straight to register. Debt never blocks commit.

**Reporting:**
- Regressions: "REGRESSION: [assertion] failed (was passing in baseline)"
- Quick Debt: "QUICK DEBT: [assertion] failed (pre-existing, attempting auto-fix)"
- Structural Debt: "STRUCTURAL DEBT: [assertion] failed (pre-existing, registered as DEBT-XXX)"

---

### Pre-Existing Debt Resolution

**Strategy:** Resolve debt ONE SPEC AT A TIME.

**Process:**
1. Pipeline detects debt during conformance checks
2. Classify as Quick or Structural
3. Quick debt: Auto-fix with 4-attempt limit
   - Success → Debt resolved, continue
   - Failure → Downgrade to Structural, register, continue
4. Structural debt: Register immediately, continue (no auto-fix)

**Bounded by 4-Attempt Halt:**
Quick debt that can't clear in 4 attempts is downgraded and registered, not halted. Only functional failures and regressions halt.

---

### Missing Scorecards

**Problem:** Unit's layer has no scorecard/gate yet (data, database, infrastructure, auth).

**Solution:** CREATE scorecard mid-run before gating that layer.

**Steps:**
1. Detect missing scorecard for layer
2. Load scorecard template (`.kiro/testing/scorecard-template.md`)
3. Adapt template to layer using Application Layer scorecard as pattern
4. Create scorecard file in appropriate location
5. Run scorecard
6. Proceed with gating

**Locations:**
- Application Layer: `.kiro/testing/scorecards/application-layer.md`
- Database Layer: `.kiro/testing/scorecards/database-layer.md`
- Data Layer: `.kiro/testing/scorecards/data-layer.md`
- Infrastructure Layer: `.kiro/testing/scorecards/infrastructure-layer.md`
- Auth Layer: `.kiro/testing/scorecards/auth-layer.md`

---

## Scope Handling

### Full Scope: "run core testing [scope]"

**Scope Options:**
- Spec number: `00`, `01`, `02-05` (range), `00-latest` (all)
- File path: `apps/web/src/app/page.tsx`
- Directory: `apps/web/src/components/`
- "all" or omitted: Ask user for scope

**Processing:** Run pipeline on each unit in scope sequentially.

---

### Last Build Scope: "test my last build"

**Scope:** Files changed in most recent commit.

**Steps:**
1. Get last commit: `git log -1 --name-only --pretty=format:""`
2. Extract changed files
3. Run pipeline on each file

**Purpose:** Fast pre-commit gate. Validates recent changes only.

---

## Reporting (Per Unit)

**Format:**
```
Unit: [unit-id]
Status: [PASS | FAIL | HALT]

Functional Checks: [✅ | ❌]
- Build: [✅ | ❌]
- Tests: [✅ | ❌]
- Types: [✅ | ❌]
- Lint: [✅ | ❌]

Conformance Checks: [✅ | ❌ | ⚠️ DEBT]
- [assertion ID]: [✅ | ❌ | ⚠️ DEBT-XXX]
- [assertion ID]: [✅ | ❌ | ⚠️ DEBT-XXX]
...

Debt Classification:
- Regressions: [count]
- Quick Debt (auto-fixed): [count]
- Quick Debt (downgraded): [count]
- Structural Debt (registered): [count]

Fixes Applied: [count]
- [fix 1]
- [fix 2]

Debt Resolved: [count]
- [debt item 1]
- [debt item 2]

Debt Registered: [count]
- DEBT-XXX: [file] - [assertion] - [scope of fix]
- DEBT-YYY: [file] - [assertion] - [scope of fix]

Scorecards Created: [count]
- [scorecard 1]

Committed: [yes | no]
```

---

## Invocation

**DO NOT invoke this pipeline directly.** Use trigger commands in `.kiro/steering/core-testing-commands.md`:

- `run core testing [scope]`
- `test my last build`

---

## Rules Summary

1. ✅ CONTINUOUS RUN-THROUGH: Once invoked, processes entire scope without pausing. No interactive prompts mid-run.
2. ✅ HALT stops a unit, NOT the run. Log halt, flag for review, continue to next unit.
3. ✅ Never commit red functional or regression conformance failures — halt unit and continue run.
4. ✅ Debt never blocks commit — it's tracked in the register and allowed to proceed.
5. ✅ Auto-fix respects the 4-attempt halt for regressions and functional failures per unit.
6. ✅ Quick debt that fails to auto-fix in 4 attempts is downgraded to structural and registered (not halted).
7. ✅ Structural debt is never auto-fixed — it goes straight to the register with scope and scheduled resolution.
8. ✅ The conformance registry is the single source of what "conformant" means.
9. ✅ The debt register is the single source of tracked debt.
10. ✅ The score register is the single source of audit scores over time.
11. ✅ Debt closure loop runs on every pipeline invocation — resolved items are marked automatically.
12. ✅ Score register updated on every run — tracks deltas vs baseline (54e553d) and previous run.
13. ✅ Run output log created on every run — durable record of what happened.
14. ✅ Three records updated every run: run log, score register, debt register.
15. ✅ Fire-and-walk-away: invoke, come back to complete records and consolidated summary.
16. ✅ Adding a future standard means adding a registry assertion, not rewriting the pipeline.
17. ✅ Distinguish regressions from debt in reporting and handling.
18. ✅ Resolve pre-existing debt ONE SPEC AT A TIME, bounded by 4-attempt halt for quick debt only.
19. ✅ Create missing scorecards mid-run from Application Layer pattern.

---

**Status:** READY — awaiting trigger command invocation.

**Related Documents:**
- `.kiro/testing/conformance-registry.md` — What to check
- `docs/00_authority/debt-register.md` — Tracked debt
- `docs/00_authority/score-register.md` — Audit scores over time
- `docs/00_authority/test-runs/` — Run output logs
- `.kiro/steering/core-testing-commands.md` — How to invoke
