# Score Register — Commander SDR

**Authority:** This is the single source of truth for conformance scores across all layers in Commander SDR.

**Purpose:** Track conformance quality over time, measure improvement, and identify regression patterns. Updated automatically by the core testing pipeline.

**Status:** ACTIVE — updated on every pipeline run

---

## Current Scores (Latest Run)

**Run:** 2026-05-30 (78c6c04)  
**Scope:** apps/web/src  
**Baseline:** 54e553d  

| Layer | Band | Pass Rate | vs Baseline | vs Previous |
|-------|------|-----------|-------------|-------------|
| **Design System Contract** | **Amber** | **75%** | **+75%** | **N/A** |
| Token System | Green | 100% | +0% | N/A |
| Performance Doctrine | N/A | N/A | N/A | N/A |
| Commander Doctrine | N/A | N/A | N/A | N/A |
| Architecture | Green | 100% | +0% | N/A |
| Decision Records | Green | 100% | +0% | N/A |

---

## Design System Contract Detail

**Assertions Checked:** 12  
**Assertions Passed:** 9  
**Assertions Failed:** 3  

### Passed Assertions ✅
- DSC-001: PageContainer Usage (100%)
- DSC-002: Square Corners (100%) — Fixed in run 78c6c04
- DSC-007: Text Hierarchy (100%)
- DSC-008: Card Structure (100%)
- DSC-009: Button Variants (100%)
- DSC-010: Table Classes (100%)
- DSC-011: Status Badges (100%)
- DSC-012: Mode Support (95%) — Minor violations in shell components
- DEC-001: PageContainer Exceptions (100%)

### Failed Assertions ❌
- DSC-003: Tabler Classes Only (60%) — Custom CSS classes in shell components → DEBT-004
- DSC-004: Vivid Semantic Colour (40%) — Hardcoded colors in chrome → DEBT-003
- DSC-005: Gold Restriction (30%) — Gold usage outside logo → DEBT-002

### Debt Summary
- **Structural Debt:** 3 items (DEBT-002, DEBT-003, DEBT-004)
- **Quick Debt:** 0 items
- **All debt scheduled for resolution**

---

## Token System Detail

**Assertions Checked:** 3  
**Assertions Passed:** 3  
**Assertions Failed:** 0  

### Passed Assertions ✅
- TOK-001: Three-Layer Token System (100%)
- TOK-002: No Literal Hex in Charts (100%)
- TOK-003: Primitive Token Immutability (100%)

---

## Architecture Detail

**Assertions Checked:** 4  
**Assertions Passed:** 4  
**Assertions Failed:** 0  

### Passed Assertions ✅
- ARCH-001: Local-First Development (100%)
- ARCH-002: No Real Vendor APIs Before Phase 2 (100%)
- ARCH-003: No n8n, No Custom Kiro Powers (100%)
- ARCH-004: Postgres Family Portability (100%)

---

## Decision Records Detail

**Assertions Checked:** 2  
**Assertions Passed:** 2  
**Assertions Failed:** 0  

### Passed Assertions ✅
- DEC-001: PageContainer Exceptions (100%)
- DEC-002: Command Centre Deferred (100%)

---

## Score History

### Run 1: 2026-05-30 (78c6c04) — Current
**Scope:** apps/web/src  
**Duration:** 45 minutes  
**Trigger:** `run core testing apps/web/src`  

**Scores:**
- Design System Contract: Amber (75%) [Baseline]
- Token System: Green (100%) [Baseline]
- Architecture: Green (100%) [Baseline]
- Decision Records: Green (100%) [Baseline]

**Changes:**
- Fixed TypeScript configuration (REGRESSION → resolved)
- Fixed DSC-002 Square Corners (QUICK DEBT → resolved)
- Registered 3 structural debt items (DEBT-002, DEBT-003, DEBT-004)

**Trajectory:** Establishing baseline

---

### Run: 2026-05-31 (ac1ee27) — Governance Runner
**Scope:** Unit 7
**Method:** Automated (scripts/governance-check.cjs)

**Scores:**
- Architecture (ARCH-005–009): Green (100%)

**Band:** Green
**Pass Rate:** 100% (5/5)

---

### Run: 2026-05-31 (478adbc) — Governance Runner
**Scope:** Unit 8
**Method:** Automated (scripts/governance-check.cjs)

**Scores:**
- Architecture (ARCH-005–009): Amber (80%)

**Band:** Amber
**Pass Rate:** 80% (4/5)

---

### Run: 2026-05-31 (478adbc) — Governance Runner
**Scope:** Unit 8
**Method:** Automated (scripts/governance-check.cjs)

**Scores:**
- Architecture (ARCH-005–009): Green (100%)

**Band:** Green
**Pass Rate:** 100% (5/5)

---

### Run: 2026-05-31 (478adbc) — Governance Runner
**Scope:** Unit 8
**Method:** Automated (scripts/governance-check.cjs)

**Scores:**
- Architecture (ARCH-005–009): Green (100%)

**Band:** Green
**Pass Rate:** 100% (5/5)

---

### Run: 2026-05-31 (2411106) — Governance Runner
**Scope:** Unit 9
**Method:** Automated (scripts/governance-check.cjs)

**Scores:**
- Architecture (ARCH-005–009): Green (100%)

**Band:** Green
**Pass Rate:** 100% (5/5)

---

### Run: 2026-05-31 (2411106) — Governance Runner
**Scope:** Unit 9
**Method:** Automated (scripts/governance-check.cjs)

**Scores:**
- Architecture (ARCH-005–009): Green (100%)

**Band:** Green
**Pass Rate:** 100% (5/5)

---

### Run: 2026-05-31 (d822968) — Governance Runner
**Scope:** Unit 10
**Method:** Automated (scripts/governance-check.cjs)

**Scores:**
- Architecture (ARCH-005–009): Green (100%)

**Band:** Green
**Pass Rate:** 100% (5/5)

---

### Run: 2026-05-31 (82ae470) — Governance Runner
**Scope:** Unit 11
**Method:** Automated (scripts/governance-check.cjs)

**Scores:**
- Architecture (ARCH-005–009): Green (100%)

**Band:** Green
**Pass Rate:** 100% (5/5)

---

### Run: 2026-05-31 (ebd844b) — Governance Runner
**Scope:** Unit 12
**Method:** Automated (scripts/governance-check.cjs)

**Scores:**
- Architecture (ARCH-005–009): Green (100%)

**Band:** Green
**Pass Rate:** 100% (5/5)

---

### Run: 2026-05-31 (61c2cf1) — Governance Runner
**Scope:** Unit 13
**Method:** Automated (scripts/governance-check.cjs)

**Scores:**
- Architecture (ARCH-005–009): Green (100%)

**Band:** Green
**Pass Rate:** 100% (5/5)

---

### Run: 2026-06-01 (3f5f046) — Governance Runner
**Scope:** Unit NaN
**Method:** Automated (scripts/governance-check.cjs)

**Scores:**
- Architecture (ARCH-005–009): Red (60%)

**Band:** Red
**Pass Rate:** 60% (3/5)

---

### Run: 2026-06-01 (3f5f046) — Governance Runner
**Scope:** Full sweep
**Method:** Automated (scripts/governance-check.cjs)

**Scores:**
- Architecture (ARCH-005–009): Green (100%)

**Band:** Green
**Pass Rate:** 100% (5/5)

---

### Run: 2026-06-01 (3f5f046) — Governance Runner
**Scope:** Full sweep
**Method:** Automated (scripts/governance-check.cjs)

**Scores:**
- Architecture (ARCH-005–009): Green (100%)

**Band:** Green
**Pass Rate:** 100% (5/5)

---

### Run: 2026-06-02 (9069ee6) — Governance Runner
**Scope:** Full sweep
**Method:** Automated (scripts/governance-check.cjs)

**Scores:**
- Architecture (ARCH-005–009): Green (100%)

**Band:** Green
**Pass Rate:** 100% (5/5)

---

## Band Definitions

| Band | Pass Rate | Description |
|------|-----------|-------------|
| **Green** | 95-100% | Excellent conformance |
| **Yellow** | 85-94% | Good conformance, minor issues |
| **Amber** | 70-84% | Acceptable conformance, improvement needed |
| **Red** | <70% | Poor conformance, immediate attention required |

---

## Scoring Rules

1. **Layer scores** are calculated as (passed assertions / total assertions) × 100%
2. **Band assignment** follows the table above
3. **Baseline comparison** shows delta from first recorded run (54e553d)
4. **Previous comparison** shows delta from immediately prior run
5. **N/A scores** indicate no measurable units affected in current scope

---

## Regression Tracking

**Tolerance Levels:**
- Green → Yellow: Flagged, requires acknowledgment
- Yellow → Amber: Flagged, requires acknowledgment  
- Amber → Red: **BLOCKED**, must be resolved before commit
- Any new Red unit: **BLOCKED**, must be resolved before commit

**Current Status:** No regressions detected (establishing baseline)

---

**Last Updated:** 2026-05-30  
**Next Pipeline Run:** TBD
**Last Governance Runner:** 2026-06-02 (9069ee6) — Green (100%)
**Last Governance Runner:** 2026-06-01 (3f5f046) — Green (100%)
**Last Governance Runner:** 2026-06-01 (3f5f046) — Green (100%)
**Last Governance Runner:** 2026-06-01 (3f5f046) — Red (60%)
**Last Governance Runner:** 2026-05-31 (61c2cf1) — Green (100%)
**Last Governance Runner:** 2026-05-31 (ebd844b) — Green (100%)
**Last Governance Runner:** 2026-05-31 (82ae470) — Green (100%)
**Last Governance Runner:** 2026-05-31 (d822968) — Green (100%)
**Last Governance Runner:** 2026-05-31 (2411106) — Green (100%)
**Last Governance Runner:** 2026-05-31 (2411106) — Green (100%)
**Last Governance Runner:** 2026-05-31 (478adbc) — Green (100%)
**Last Governance Runner:** 2026-05-31 (478adbc) — Green (100%)
**Last Governance Runner:** 2026-05-31 (478adbc) — Amber (80%)
**Last Governance Runner:** 2026-05-31 (ac1ee27) — Green (100%)
