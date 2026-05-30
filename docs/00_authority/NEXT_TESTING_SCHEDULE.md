# Next Testing Schedule — Commander SDR

**Purpose:** Comprehensive schedule for testing all remaining code not yet covered by the core testing pipeline.

**Status:** READY — execute with `run core testing [scope]` commands

**Baseline Established:** 2026-05-30 (50cb26c) — apps/web/src tested and baseline scores recorded

---

## Testing Priority Order

### Phase 1: Core Infrastructure (High Priority)

#### 1.1 UI Package Components
**Scope:** `packages/ui/src`  
**Command:** `run core testing packages/ui/src`  
**Expected Issues:** Token system conformance, primitive/semantic/component layer violations  
**Estimated Duration:** 30-45 minutes  
**Priority:** HIGH — Foundation for all UI work

#### 1.2 Contracts Package
**Scope:** `packages/contracts/src`  
**Command:** `run core testing packages/contracts/src`  
**Expected Issues:** TypeScript configuration, entity model conformance  
**Estimated Duration:** 20-30 minutes  
**Priority:** HIGH — Data model foundation

#### 1.3 Root Configuration
**Scope:** Root config files  
**Command:** `run core testing tsconfig.json package.json pnpm-lock.yaml`  
**Expected Issues:** Workspace configuration, dependency management  
**Estimated Duration:** 10-15 minutes  
**Priority:** MEDIUM — Build system foundation

### Phase 2: Application Boundaries (Medium Priority)

#### 2.1 API Application
**Scope:** `apps/api`  
**Command:** `run core testing apps/api`  
**Expected Issues:** No code yet, placeholder structure only  
**Estimated Duration:** 5-10 minutes  
**Priority:** LOW — Placeholder only

#### 2.2 Web App Non-Source Files
**Scope:** `apps/web` (excluding src, already tested)  
**Command:** `run core testing apps/web --exclude src`  
**Expected Issues:** Next.js configuration, build setup  
**Estimated Duration:** 10-15 minutes  
**Priority:** MEDIUM — Build configuration

### Phase 3: Spec Documentation (Low Priority)

#### 3.1 Spec Files (Batch 1: Foundation)
**Scope:** Specs 00-05 (Foundation specs)  
**Command:** `run core testing .kiro/specs/00* .kiro/specs/01* .kiro/specs/02* .kiro/specs/03* .kiro/specs/04* .kiro/specs/05*`  
**Expected Issues:** Spec format violations, missing sections  
**Estimated Duration:** 15-20 minutes  
**Priority:** LOW — Documentation conformance

#### 3.2 Spec Files (Batch 2: Core Features)
**Scope:** Specs 06-15 (Core feature specs)  
**Command:** `run core testing .kiro/specs/06* .kiro/specs/07* .kiro/specs/08* .kiro/specs/09* .kiro/specs/10* .kiro/specs/11* .kiro/specs/12* .kiro/specs/13* .kiro/specs/14* .kiro/specs/15*`  
**Expected Issues:** Spec format violations, task dependencies  
**Estimated Duration:** 25-30 minutes  
**Priority:** LOW — Documentation conformance

#### 3.3 Spec Files (Batch 3: Advanced Features)
**Scope:** Specs 16-30 (Advanced feature specs)  
**Command:** `run core testing .kiro/specs/1[6-9]* .kiro/specs/2[0-9]* .kiro/specs/30*`  
**Expected Issues:** Spec format violations, complex dependencies  
**Estimated Duration:** 35-40 minutes  
**Priority:** LOW — Documentation conformance

#### 3.4 Spec Files (Batch 4: Platform & Infrastructure)
**Scope:** Specs 31-43 + shell spec  
**Command:** `run core testing .kiro/specs/3[1-9]* .kiro/specs/4[0-3]* .kiro/specs/shell*`  
**Expected Issues:** Spec format violations, infrastructure references  
**Estimated Duration:** 30-35 minutes  
**Priority:** LOW — Documentation conformance

### Phase 4: Supporting Files (Lowest Priority)

#### 4.1 Steering Files
**Scope:** `.kiro/steering`  
**Command:** `run core testing .kiro/steering`  
**Expected Issues:** Markdown format, authority references  
**Estimated Duration:** 10-15 minutes  
**Priority:** LOWEST — Guidance documents

#### 4.2 Authority Documents
**Scope:** `docs/00_authority` (excluding test outputs)  
**Command:** `run core testing docs/00_authority --exclude test-runs --exclude debt-register.md --exclude score-register.md`  
**Expected Issues:** Markdown format, reference consistency  
**Estimated Duration:** 15-20 minutes  
**Priority:** LOWEST — Reference documents

#### 4.3 Other Documentation
**Scope:** Remaining docs folders  
**Command:** `run core testing docs/01_product docs/02_architecture docs/03_data_model docs/04_build_packs docs/05_design_reference docs/06_ui_build_reference docs/07_prompt_library docs/08_phase_2_testing docs/99_source_archive`  
**Expected Issues:** Markdown format, broken references  
**Estimated Duration:** 20-25 minutes  
**Priority:** LOWEST — Reference documents

---

## Execution Strategy

### Recommended Execution Order
1. **Start with Phase 1** — Critical infrastructure that affects everything else
2. **Skip to Phase 2** — Application boundaries for build system validation  
3. **Phase 3 & 4 as needed** — Documentation conformance when time permits

### Batch Execution Commands
For efficiency, you can run multiple phases in sequence:

```bash
# Critical path (Phases 1-2)
run core testing packages/ui/src
run core testing packages/contracts/src  
run core testing apps/api
run core testing apps/web --exclude src

# Full documentation sweep (Phase 3-4, when time permits)
run core testing .kiro/specs/0*
run core testing .kiro/specs/1*
run core testing .kiro/specs/2*
run core testing .kiro/specs/3*
run core testing .kiro/specs/4*
run core testing .kiro/steering
run core testing docs/00_authority --exclude test-runs --exclude debt-register.md --exclude score-register.md
```

### Time Estimates
- **Critical Path (Phases 1-2):** 1.5-2 hours total
- **Full Documentation (Phases 3-4):** 2.5-3 hours additional
- **Complete Coverage:** 4-5 hours total

---

## Expected Outcomes

### High-Confidence Predictions
- **packages/ui/src:** Will find token system violations, need semantic token migration
- **packages/contracts/src:** Will find TypeScript config issues, entity model gaps
- **Spec files:** Will find format violations, missing task dependencies
- **Documentation:** Will find markdown format issues, broken cross-references

### Likely Debt Categories
1. **Token System Debt** — Primitive/semantic/component layer violations
2. **TypeScript Configuration Debt** — Package-level config inconsistencies  
3. **Spec Format Debt** — Missing sections, incorrect task structures
4. **Documentation Debt** — Format violations, broken references

### Success Criteria
- **Green/Yellow bands** for all critical infrastructure (Phases 1-2)
- **Amber acceptable** for documentation (Phases 3-4)
- **All debt registered** with scheduled resolution
- **No regressions** introduced during testing

---

## Integration with Existing Work

### Builds on Current Baseline
- **apps/web/src:** ✅ COMPLETED (Amber, 75% conformance)
- **Debt register:** 4 items scheduled for Shell Tabler Conversion
- **Score register:** Baseline established for comparison

### Feeds into Scheduled Work
- **Shell Tabler Conversion spec:** Will resolve DEBT-002, DEBT-003, DEBT-004
- **Design System Token Migration:** Will resolve token system violations
- **Case Management implementation:** Can proceed once critical path complete

---

## Usage Instructions

When ready to continue legacy testing:

1. **Check current status:** `show last test run`
2. **Start critical path:** `run core testing packages/ui/src`
3. **Continue in priority order** per schedule above
4. **Monitor debt register:** `show debt register` after each run
5. **Track progress:** `show audit scores` for trend analysis

**Next Command Ready:** `run core testing packages/ui/src`

---

**Created:** 2026-05-30  
**Baseline:** 50cb26c (apps/web/src complete)  
**Status:** READY FOR EXECUTION