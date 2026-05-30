# Score Register — Commander SDR

**Authority:** This is the audit score register tracking build quality against all determination strategies over time.

**Purpose:** Every pipeline run records scores per strategy/layer, measured against the baseline (commit 54e553d) and the previous run. This is the persistent trend line of conformance quality.

**Status:** ACTIVE — updated on every pipeline run

---

## Current Scores

**Last Run:** Not yet executed  
**Commit:** N/A  
**Date:** N/A  
**Scope:** N/A  

### Layer Scores

| Layer | Band | Pass Rate | Delta vs Baseline | Delta vs Previous |
|-------|------|-----------|-------------------|-------------------|
| Application Layer | N/A | N/A | N/A | N/A |
| Token Conformance | N/A | N/A | N/A | N/A |
| Design Contract | N/A | N/A | N/A | N/A |
| Data Layer | N/A | N/A | N/A | N/A |
| Database Layer | N/A | N/A | N/A | N/A |
| Infrastructure Layer | N/A | N/A | N/A | N/A |
| Auth Layer | N/A | N/A | N/A | N/A |

### Assertion Pass Rates

| Assertion ID | Description | Pass Rate | Status |
|--------------|-------------|-----------|--------|
| DSC-001 | PageContainer Usage | N/A | N/A |
| DSC-002 | Square Corners | N/A | N/A |
| DSC-003 | Tabler Classes Only | N/A | N/A |
| DSC-004 | Vivid Semantic Colour | N/A | N/A |
| DSC-005 | Gold Restriction | N/A | N/A |
| DSC-006 | Font Inheritance | N/A | N/A |
| DSC-007 | Text Hierarchy | N/A | N/A |
| DSC-008 | Card Structure | N/A | N/A |
| DSC-009 | Button Variants | N/A | N/A |
| DSC-010 | Table Classes | N/A | N/A |
| DSC-011 | Status Badges | N/A | N/A |
| DSC-012 | Mode Support | N/A | N/A |
| TOK-001 | Three-Layer Token System | N/A | N/A |
| TOK-002 | No Literal Hex in Charts | N/A | N/A |
| TOK-003 | Primitive Token Immutability | N/A | N/A |
| PERF-001 | No Red Units | N/A | N/A |
| PERF-002 | Regression Tolerance | N/A | N/A |
| PERF-003 | Workload Class Declaration | N/A | N/A |
| PERF-004 | No Cross-Workload Foreign Keys | N/A | N/A |
| PERF-005 | Tier Discipline | N/A | N/A |
| DOC-001 | Closed-Loop Case Model | N/A | N/A |
| DOC-002 | P0 Priority Overlay | N/A | N/A |
| DOC-003 | Three-Application Boundary | N/A | N/A |
| DOC-004 | Registry-Driven Runtime | N/A | N/A |
| DOC-005 | Four-Stream Intelligence | N/A | N/A |
| DOC-006 | Surface Attribution | N/A | N/A |
| DOC-007 | Connector Classes A/B/C/D | N/A | N/A |
| DOC-008 | Verdict Semantics | N/A | N/A |
| ARCH-001 | Local-First Development | N/A | N/A |
| ARCH-002 | No Real Vendor APIs | N/A | N/A |
| ARCH-003 | No n8n/Custom Powers | N/A | N/A |
| ARCH-004 | Postgres Family Portability | N/A | N/A |
| DEC-001 | PageContainer Exceptions | N/A | N/A |
| DEC-002 | Command Centre Deferred | N/A | N/A |

---

## Baseline Reference

**Commit:** 54e553d  
**Date:** 2026-05-29  
**Description:** Original scorecard baseline established in CONVERSION_FINDINGS.md  

All subsequent runs are measured against this baseline to track improvement or regression over time.

---

## Score History

### Run 1: Baseline (54e553d)

**Date:** 2026-05-29  
**Commit:** 54e553d  
**Scope:** Initial conversion baseline  

**Layer Scores:**
- Application Layer: Amber (baseline established)
- Token Conformance: Green (baseline established)
- Design Contract: Amber (baseline established)
- Data Layer: Not yet measured
- Database Layer: Not yet measured
- Infrastructure Layer: Not yet measured
- Auth Layer: Not yet measured

**Notes:** Baseline scorecard established. All subsequent runs measured against this.

---

## Band Definitions

**Green:** All assertions pass, no violations, no debt  
**Amber:** Some violations present, tracked as debt, scheduled for resolution  
**Red:** Critical violations present, regressions detected, or unscheduled debt accumulating  

---

## Scoring Methodology

### Per-Layer Scoring

Each layer is scored based on:
1. **Pass rate** of applicable assertions (% passing)
2. **Debt count** (open + scheduled structural debt)
3. **Regression count** (new failures vs baseline)

**Band Assignment:**
- **Green:** 100% pass rate, 0 regressions, debt ≤ 2 items
- **Amber:** 80-99% pass rate, 0 regressions, debt ≤ 5 items
- **Red:** <80% pass rate, OR any regressions, OR debt > 5 items

### Per-Assertion Scoring

Each assertion is scored as:
- **Pass:** All units comply
- **Fail (Debt):** Some units violate, tracked as debt
- **Fail (Regression):** New violations introduced

### Delta Calculation

**vs Baseline:**
- Compare current pass rate to baseline pass rate
- Show improvement (+) or regression (-)
- Example: 85% → 92% = +7%

**vs Previous:**
- Compare current pass rate to previous run pass rate
- Show improvement (+) or regression (-)
- Example: 90% → 92% = +2%

---

## Query Commands

**Show current scores:**
```
show audit scores
```
Outputs current layer scores, bands, and deltas vs baseline and previous run.

**Show score history:**
```
show score history
```
Outputs trend over time per layer, all runs since baseline.

**Show specific layer:**
```
show audit scores application
show audit scores design-contract
```

---

## Update Protocol

**When:** On every pipeline run (triggered by `run core testing` or `test my last build`)

**What:**
1. Calculate pass rates per assertion
2. Aggregate to layer scores
3. Assign bands per layer
4. Calculate deltas (vs baseline, vs previous)
5. Append new run to history
6. Update current scores table
7. Save register

**Automated:** The pipeline updates this register automatically. Manual edits are not permitted.

---

## Maintenance

- **Baseline immutable:** Commit 54e553d remains the baseline reference
- **History preserved:** All runs recorded, never deleted
- **Trend analysis:** Use score history to identify quality trajectory
- **Regression alerts:** Red band or negative delta vs baseline triggers review

---

**Last Updated:** 2026-05-30  
**Next Pipeline Run:** TBD  
**Baseline Commit:** 54e553d
