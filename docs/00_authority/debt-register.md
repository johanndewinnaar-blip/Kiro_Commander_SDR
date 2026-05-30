# Debt Register — Commander SDR

**Authority:** This is the single source of truth for tracked conformance debt in Commander SDR.

**Purpose:** Every structural debt item and any quick debt that failed to auto-fix is recorded here with full scope, scheduled resolution, and status. The core testing pipeline maintains this register automatically.

**Status:** ACTIVE — updated on every pipeline run

---

## Summary

| Status | Count |
|--------|-------|
| Open | 0 |
| Scheduled | 4 |
| Resolved | 0 |
| **Total** | **4** |

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

### DEBT-002: Gold Usage Outside Logo

**File:** Multiple files (war-room/p0/page.tsx, cases/[id]/page.tsx, operational-sidebar.tsx, operational-top-bar.tsx, expandable-case-row.tsx)  
**Violated Assertion:** DSC-005 (Gold Restriction)  
**Debt Type:** Structural  
**Description:** Gold color (primitiveBrand.gold, #ffd21f) used for surface attribution badges, lifecycle indicators, navigation elements, and UI chrome outside of COMMANDER logo wordmark.  
**Scope of Fix:** Design system token migration — replace gold usage with appropriate semantic tokens for data visualization (--data-* tokens for charts/status), neutral tokens for chrome, and preserve gold only in COMMANDER logo. Requires design review of surface attribution visual treatment.  
**Scheduled Resolution:** Design System Token Migration spec (Spec 02 follow-up)  
**Status:** Scheduled  
**Date Logged:** 2026-05-30  
**Last Checked:** 2026-05-30  

### DEBT-003: Hardcoded Color Values

**File:** Multiple files (sidebar/index.tsx, operational-sidebar.tsx, operational-top-bar.tsx, header/index.tsx, tenant-admin/layout.tsx, control-plane/layout.tsx)  
**Violated Assertion:** DSC-004 (Vivid Semantic Colour), DSC-012 (Mode Support)  
**Debt Type:** Structural  
**Description:** Hardcoded hex colors (#ffffff, #8ca6c2, #040a11, etc.) in chrome elements instead of Tabler CSS variables. Breaks dark/light mode compatibility and violates semantic color doctrine.  
**Scope of Fix:** Chrome token migration — replace all hardcoded colors with Tabler CSS variables (var(--tblr-body-color), var(--tblr-border-color), etc.). Ensure light/dark mode compatibility. Part of shell Tabler conversion.  
**Scheduled Resolution:** Shell Tabler Conversion spec (includes sidebar, header, layout components)  
**Status:** Scheduled  
**Date Logged:** 2026-05-30  
**Last Checked:** 2026-05-30  

### DEBT-004: Custom CSS Classes in Components

**File:** Multiple files (sidebar/index.tsx, operational-sidebar.tsx, page-container.tsx)  
**Violated Assertion:** DSC-003 (Tabler Classes Only)  
**Debt Type:** Structural  
**Description:** Custom CSS classes (cmdr-sidebar, cmdr-brand, cmdr-rail-item, etc.) instead of Tabler structural classes. Part of v3 shell system that predates Tabler adoption.  
**Scope of Fix:** Component Tabler migration — convert custom CSS classes to Tabler equivalents (navbar, nav-link, card, etc.), remove custom stylesheets, use Tabler component patterns. Preserve visual design through Tabler customization.  
**Scheduled Resolution:** Shell Tabler Conversion spec (comprehensive component migration)  
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
