# Debt Register — Commander SDR

**Authority:** This is the single source of truth for tracked conformance debt in Commander SDR.

**Purpose:** Every structural debt item and any quick debt that failed to auto-fix is recorded here with full scope, scheduled resolution, and status. The core testing pipeline maintains this register automatically.

**Status:** ACTIVE — updated on every pipeline run

---

## Summary

| Status | Count |
|--------|-------|
| Open | 0 |
| Scheduled | 1 |
| Resolved | 0 |
| **Total** | **1** |

---

## Register Entries

### DEBT-001: Control Plane Font Override

**File:** `apps/web/src/app/control-plane/layout.tsx`  
**Violated Assertion:** DSC-006 (Font Inheritance)  
**Debt Type:** Structural  
**Description:** Bebas Neue display font override instead of inherited Inter. Control Plane v3 shell uses old font system.  
**Scope of Fix:** Control Plane shell Tabler conversion — convert layout.tsx to Tabler, remove Bebas Neue font import and override, inherit Inter globally from root layout. Part of larger v3 shell migration.  
**Scheduled Resolution:** Control Plane Tabler conversion spec (deferred until Operational App baseline complete)  
**Status:** Scheduled  
**Date Logged:** 2026-05-30  
**Last Checked:** 2026-05-30  

---

## Debt Type Definitions

### Regression
Code that was conformant and a recent change broke it.  
**Action:** BLOCK and fix now (subject to 4-attempt halt). Never commit a regression.

### Quick Debt
Pre-existing, but a low-risk in-place fix (e.g., hardcoded hex/rgba, missing semantic token, rounded corner, stray inline style on an otherwise-converted component).  
**Action:** AUTO-FIX in place, bounded by 4-attempt halt. If it clears, resolve and close. If it can't clear in 4 attempts, downgrade to Structural Debt and log to register.

### Structural Debt
Pre-existing and part of a larger unmigrated unit (e.g., a whole shell or page still on the old system, where the violation is a symptom of "not migrated yet" rather than a stray error). Fixing one line is pointless when the whole unit is scheduled for rebuild.  
**Action:** DO NOT auto-fix. Record in register with full scope and scheduled work that will resolve it.

---

## Register Format

Each entry must include:

- **ID:** Unique identifier (DEBT-001, DEBT-002, etc.)
- **File:** Path to affected file/unit
- **Violated Assertion:** Which conformance assertion from registry (e.g., DSC-006, TOK-002)
- **Debt Type:** Quick / Structural
- **Description:** What the violation is
- **Scope of Fix:** What actually needs to happen to resolve it (not just "fix the violation" — describe the work)
- **Scheduled Resolution:** Which spec/work package will clear it, or "unscheduled" if none yet
- **Status:** Open / Scheduled / Resolved
- **Date Logged:** When first recorded
- **Last Checked:** When pipeline last validated this item

---

## Closure Rules

1. **Automatic re-check:** On every pipeline run, re-check all Open and Scheduled items. If the underlying violation no longer exists, mark Resolved automatically.

2. **Scheduled work completion:** When a scheduled piece of work completes (e.g., Control Plane Tabler conversion), its associated register items are re-checked and closed if clear.

3. **Audit trail:** Resolved items stay in register marked Resolved, not deleted. This preserves the history of what was fixed and when.

4. **Manual closure forbidden:** Only the pipeline can mark items Resolved. Manual status changes are not permitted.

---

## Query Commands

**Show full register:**
```
show debt register
```
Outputs all entries with ID, file, violated assertion, debt type, scope of fix, scheduled resolution, status.

**Filter by scope:**
```
show debt register [file/spec/assertion]
```
Examples:
- `show debt register control-plane` — all Control Plane debt
- `show debt register DSC-006` — all font inheritance violations
- `show debt register structural` — all structural debt

---

## Adding New Entries

New entries are added automatically by the core testing pipeline when:
1. A conformance violation is detected
2. It's classified as Structural Debt (goes straight to register)
3. OR it's classified as Quick Debt but fails to auto-fix in 4 attempts (downgraded to Structural and registered)

Manual entry addition is not permitted. All debt must be detected and classified by the pipeline.

---

## Maintenance

- **Pipeline updates this file:** The core testing pipeline reads and writes this register automatically
- **Human review required:** When new Structural Debt is logged, human review determines scheduled resolution
- **Unscheduled debt:** Items marked "unscheduled" require owner decision on when/how to resolve
- **Stale debt:** Items open >90 days without scheduled resolution should be reviewed and prioritized

---

**Last Updated:** 2026-05-30  
**Next Pipeline Run:** TBD
