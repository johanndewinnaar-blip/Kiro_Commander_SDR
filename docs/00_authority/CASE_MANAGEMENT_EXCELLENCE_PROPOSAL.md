# Commander SDR — Case Management Excellence Proposal

**Version:** CMEP-1.0  
**Status:** REVIEW — Pending owner decision.  
**Date:** 2026-06-02  
**Scope:** Architectural improvement of Case Management (Spec #08, Spec #17, Spec #29, Spec #30, Spec #32) to world-class posture.  
**Authority:** This document proposes extensions to Commander Case Management. It does not override existing authority until approved and recorded in DECISIONS.md.

---

## 1. Executive Summary

Commander's case management architecture has strong structural foundations: system-ownership, 12-state lifecycle, strategy-driven resolution, surface attribution, and COIM provenance. This proposal elevates it to world-class by:

1. **Formalising the Case Kernel / Domain Profile separation** — naming and structuring the type-agnostic machinery vs type-specific intelligence.
2. **Activating the intelligence already collected** — COIM-G aggregates, ATT&CK bindings, blast radius, dwell time, and confidence currently sit as cached decoration; they should drive decisions.
3. **Introducing domain-aware divergence** — at precisely defined lifecycle points, domain profiles inject type-specific logic without breaking the universal contract.
4. **Adding 4 new strategy surfaces** — extending the existing 13-surface model to 17, all following the same governance/approval/simulation pattern.

---

## 2. Architectural Model: Case Kernel + Domain Profiles

### 2.1 Case Kernel (Type-Agnostic)

The **Case Kernel** is the closed-loop control machinery that every case traverses regardless of its type. It is the invariant contract.

**Kernel responsibilities:**

| Responsibility | Current State | Notes |
|---|---|---|
| 12-state lifecycle state machine | Implemented (`case-lifecycle.ts`) | Complete |
| System-ownership enforcement | Implemented (actor validation) | Complete |
| SLA clock management (start/breach/pause) | Implemented (`case-sla-calculator.ts`) | Resolves from strategy, type-agnostic |
| Base routing (case → team) | Implemented (`case-router.ts`) | Currently the only routing dimension |
| Base priority assignment | Implemented (`case-prioritiser.ts`) | Resolves weights from strategy |
| Closure gate evaluation | Implemented (`case-closure-evaluator.ts`) | Generic gates only |
| Reopening trigger evaluation | Implemented (`case-reopening-evaluator.ts`) | Generic triggers only |
| Audit trail emission | Implemented (auditTrailRef) | Per-transition logging |
| Surface attribution | Implemented (entity field) | Invariant on every case |
| COIM-G aggregate caching | Implemented (optional fields on Case) | Computed at creation/update |

**Kernel invariants (assertions that hold for ALL case types):**

1. Every case is system-born (from risk-object binding via binding-engine).
2. Every case traverses the same 12 states in permitted order.
3. Every transition is performed by a named actor with audit.
4. Every case has exactly one priority (P0–P4), one owner, one team, one SLA.
5. No case can be manually created, closed, edited, or transitioned.
6. Every case carries surface attribution.
7. Closure requires all gates to pass.

### 2.2 Domain Profiles (Type-Specific)

A **Domain Profile** is the type-specific intelligence extension that activates at defined divergence points within the Kernel lifecycle. Profiles do not replace Kernel states — they provide domain-aware *inputs* to Kernel decisions.

**Proposed profile families:**

| Profile | Applies To Case Types | Domain |
|---|---|---|
| Vulnerability Profile | `vulnerability`, `vulnerability-drift`, `exposure`, `exposure-drift` | CVE/patch/exploit lifecycle |
| Identity Profile | `identity` | Privilege/access/entitlement lifecycle |
| Architecture Profile | `drift`, `configuration-drift`, `coverage`, `coverage-blindspot`, `tool-health`, `control-gap` | Baseline/control state lifecycle |
| Threat Intelligence Profile | `threat-intelligence-estate-match`, `external-attack-correlation` | IOC/campaign lifecycle |
| Governance Profile | `policy-effectiveness`, `verdict-pattern` | Policy/compliance lifecycle |
| Operational Profile | `ooda-tempo-degradation`, `inverse-discovery-coverage-blindspot` | Operational tempo lifecycle |

### 2.3 Divergence Points

The precise lifecycle states where Domain Profiles activate:

| Lifecycle State | Kernel-Only or Kernel+Profile | Profile Responsibility |
|---|---|---|
| `detected` | Kernel-only | — |
| `bound` | Kernel-only | — |
| `routed` | Kernel + Profile | Profile provides **specialism-matching signals** (vuln analyst vs identity analyst vs platform engineer) |
| `prioritised` | Kernel + Profile | Profile provides **domain-specific priority signals** (CVSS/EPSS for vuln, privilege-scope for identity, drift-magnitude for architecture) |
| `action_decomposed` | Profile-dominant | Profile defines **what "actions" mean** for this domain (patch, revoke, remediate, contain) |
| `in_progress` | Kernel-only | — |
| `pending_validation` | Kernel-only | — |
| `validation_running` | Profile-dominant | Profile defines **how validation works** (rescan, privilege-check, baseline-measure, IOC re-hunt) |
| `validated_pass/fail` | Profile → Kernel | Profile determines pass/fail criteria; Kernel enforces transition |
| `pending_closure_gates` | Kernel + Profile | Kernel checks generic gates; Profile checks **domain-specific gates** |
| `closed_by_system` | Kernel-only | — |
| `reopened_by_system` | Profile → Kernel | Profile defines **domain-specific reopening triggers**; Kernel executes transition |

---

## 3. Case Kernel Improvements (Type-Agnostic)

These improvements benefit ALL case types equally.

### 3.1 Multi-Factor Routing Engine

**Current state:** `resolveRouting()` reads `teamAffinity[caseType]` and returns a team name. The routing strategy policy already contains `workloadMax`, `antiHoardingCap`, `rankWeighting`, `escalationTimeoutHours`, and `specialismTags` — but none are consumed by the resolver.

**Improvement:** Replace single-dimension routing with scored multi-factor assignment:

```
routingScore(analyst, case) =
    specialismMatch(case.caseType, analyst.specialisms)     × w₁
  + workloadAvailability(analyst.activeCases / workloadMax) × w₂
  + assetOwnership(case.affectedEntity.owner == analyst)    × w₃
  + rankWeighting(analyst.rank)                             × w₄
```

Weights (w₁–w₄) live in the routing strategy policy configuration. Top-scoring analyst receives the case. If no analyst scores above `routingThresholds.autoRoute`, escalation triggers.

**Strategy surface:** Existing `routing` (no new surface needed — configuration shape extends).

**Doctrinal compliance:**
- ✅ System-owned (no manual assignment override)
- ✅ Strategy-driven (weights and thresholds in policy, not hardcoded)
- ✅ Already partially specified in seed data

### 3.2 Temporal Priority Reassessment Loop

**Current state:** Priority is assigned once at case creation and never re-evaluated. A case that was P3 yesterday stays P3 even if threat conditions change.

**Improvement:** Introduce a **Priority Reassessment Actor** — a periodic system actor (`reassessment-engine`) that:

1. Runs on a configurable cadence (from `operational-tempo` strategy surface).
2. Re-evaluates prioritisation weights against current case evidence.
3. If computed priority differs from current priority → triggers `prioritisation-engine` transition with full audit.
4. Records before/after priority in audit trail.

**New lifecycle transition required:**

```
in_progress → prioritised (reassessment-engine) [priority reassessment loop]
```

This adds one permitted transition to the state machine. The case does not leave `in_progress` externally — priority changes while work continues.

**Strategy surface:** Existing `prioritisation-weight` + existing `operational-tempo` (cadence). No new surface.

**Doctrinal compliance:**
- ✅ System-owned (reassessment-engine, not human)
- ✅ Strategy-driven (cadence and thresholds from strategy)
- ✅ Audit-trailed (every reassessment logged)

### 3.3 Adaptive SLA Modifiers

**Current state:** SLA is a static lookup: `priority → profile → responseHours`. P1 always = 24h.

**Improvement:** SLA calculation becomes multi-factor:

```
effectiveSLA = baseSLA(priority)
  × surfaceModifier(surfaceAttribution)
  × enrichmentModifiers(domain-specific signals from Profile)
```

Base SLA remains strategy-driven (existing `sla` surface). Modifiers live in a new strategy surface.

**New strategy surface: `sla-modifier`** (surface #14)

```typescript
surfaceType: 'sla-modifier'
configuration: {
  surfaceModifiers: {
    external_attack_surface: 0.7,    // compress SLA 30%
    internal_attack_surface: 1.0,    // baseline
    identity_plane: 0.85,            // slight compression
    engineering_surface: 1.2,        // slight extension
  },
  // Domain profiles inject additional modifiers at runtime
  domainModifierCap: 0.3,           // domain modifiers cannot compress below 30% of base
}
```

**Doctrinal compliance:**
- ✅ Strategy-driven (modifier values in policy, not hardcoded)
- ✅ Auditable (effective SLA recorded with computation trace)
- ✅ Governed (cap prevents runaway compression)

### 3.4 Intelligent Binding: Correlation Engine

**Current state:** `bindRiskObject()` is a simple decision tree: suppress → accept → link-existing → create-new. It does not consider whether 50 identical CVE findings should produce 1 case or 50.

**Improvement:** Introduce a **Correlation Engine** (new system actor) between risk-object creation and case binding:

| Correlation Rule | Logic | Outcome |
|---|---|---|
| CVE Deduplication | Same CVE + same tenant + open case exists for that CVE → link, don't create | `linked_existing_case` |
| Temporal Clustering | N risk objects within T minutes from same source, same technique → single case | `bound_new_case` (campaign-level) |
| Blast-Radius Aggregation | Same CVE across M hosts → 1 campaign case with M affected entities | `bound_new_case` with aggregated `affectedEntities[]` |
| Attack-Chain Detection | Risk objects whose ATT&CK techniques form a known kill-chain sequence → escalate to `external-attack-correlation` type | `bound_new_case` (elevated type) |

**Correlation parameters live in a new strategy surface: `correlation-policy`** (surface #15)

```typescript
surfaceType: 'correlation-policy'
configuration: {
  cveDeduplication: true,
  temporalWindowMinutes: 30,
  blastRadiusGrouping: true,
  attackChainDetection: true,
  maxAffectedEntitiesPerCase: 500,
}
```

**Doctrinal compliance:**
- ✅ System-owned (correlation-engine actor)
- ✅ Strategy-driven (thresholds in policy)
- ✅ Does not violate binding-engine actor authority — correlation runs *before* binding, filtering what reaches the binder

### 3.5 Outcome Effectiveness Metrics (Self-Correcting Loop)

**Current state:** No case-handling effectiveness metrics exist. The system has no way to know if its own performance is degrading.

**Improvement:** Introduce an **Effectiveness Metrics Surface** (surface #16) that defines targets Commander measures itself against:

| Metric | Definition | World-Class Target |
|---|---|---|
| MTTR (P0/P1) | `createdAt` → `closed_by_system` timestamp delta | < 14 days |
| MTTR (P2/P3) | Same | < 30 days |
| SLA Compliance Rate | % of cases closed within their effective SLA window | > 85% |
| Case Reopen Rate | `reopened_by_system` count / total closed (rolling 90d) | < 10% |
| Noise Ratio | Cases that should have been correlated/suppressed (post-hoc analysis) | < 20% |
| Mean Dwell Time | `firstDetectedAt` (earliest bound RO) → case `createdAt` | < 48h |
| Routing Accuracy | Cases that required reassignment within 24h of initial routing | < 5% |

When metrics breach their thresholds, Commander generates an `ooda-tempo-degradation` case against itself — the platform literally creates a case about its own degradation. This is the **self-correcting loop**.

**New strategy surface: `effectiveness-targets`** (surface #16)

**Doctrinal compliance:**
- ✅ Strategy-driven (targets in policy, tunable per tenant)
- ✅ Consistent with existing case type taxonomy (`ooda-tempo-degradation` already exists)
- ✅ System-owned (metrics engine generates cases, no human intervention)

---

## 4. Vulnerability Domain Profile (Type-Specific Extension)

The Vulnerability Profile is the first Domain Profile to be fully specified, serving as the reference implementation for all other profiles.

### 4.1 Vulnerability Priority Signals

**Current state:** The prioritisation-weight strategy has generic weights (`severity: 0.2, exploitability: 0.15, blastRadius: 0.15...`) but no mechanism to populate these signal values from vulnerability-specific data.

**Improvement:** The Vulnerability Profile provides a **Signal Resolver** that populates domain-specific scores consumed by the Kernel's prioritisation engine:

| Signal | Source | Score Range | Weight (from strategy) |
|---|---|---|---|
| `severity` | CVSS base score (from source classification `sourceSeverity`) | 0–100 | 0.20 |
| `exploitability` | EPSS probability × 100 (live enrichment feed) | 0–100 | 0.15 |
| `blastRadius` | COIM-G `blastRadiusScore` (already computed) | 0–100 | 0.15 |
| `businessContext` | Asset criticality × mission-function mapping | 0–100 | 0.15 |
| `coverageScore` | Compensating control presence (WAF, network segmentation, EDR) | 0–100 (inverse: lower = worse coverage = higher risk) | 0.10 |
| `threatRelevance` | CISA KEV match (100 if listed, 0 if not) + active exploitation intelligence | 0–100 | 0.10 |
| `attackContext` | ATT&CK technique severity + automatable assessment | 0–100 | 0.05 |
| `identityExposure` | Service account / privileged credential exposure on affected asset | 0–100 | 0.10 |

**Weighted score:** `Σ(signal × weight) = composite priority score 0–100`

**Priority mapping (from `threshold` strategy surface):**
- Score ≥ 95 → P0 (with strategy overlay confirmation)
- Score ≥ 80 → P1
- Score ≥ 60 → P2
- Score ≥ 40 → P3
- Score < 40 → P4

### 4.2 SSVC Decision-Tree Integration

**Proposal:** Adopt CISA's SSVC (Stakeholder-Specific Vulnerability Categorization) framework as an *additional* decision lens for vulnerability cases. SSVC does not replace the weighted priority model — it provides a **parallel classification** that maps to Commander action outcomes.

**SSVC Decision Points (mapped to Commander data):**

| SSVC Decision Point | Commander Data Source |
|---|---|
| **Exploitation** (none / PoC / active) | EPSS score threshold + CISA KEV lookup + threat intel feed |
| **Automatable** (yes / no) | ATT&CK technique analysis (T1190 = automatable; T1078 = not) |
| **Technical Impact** (partial / total) | CVSS Impact subscale or sourceSeverity level |
| **Mission Impact** (none / degraded / MEF failure) | Asset criticality × business-function mapping |

**SSVC Outcomes → Commander Actions:**

| SSVC Outcome | Commander Mapping |
|---|---|
| **Act** | P0/P1 + SLA compression + war-room consideration |
| **Attend** | P2 + normal SLA + elevated monitoring |
| **Track*** | P3 + extended SLA + include in next patch cycle |
| **Track** | P4 + standard update timeline |

**New strategy surface: `ssvc-decision-tree`** (surface #17)

```typescript
surfaceType: 'ssvc-decision-tree'
configuration: {
  exploitationThresholds: { active: 'kev_listed OR epss > 0.7', poc: 'epss > 0.3', none: 'default' },
  automatableMapping: { automatable_techniques: ['T1190', 'T1210', 'T1133'], not_automatable: 'default' },
  technicalImpactMapping: { total: ['critical'], partial: ['high', 'medium', 'low', 'informational'] },
  missionImpactMapping: { mef_failure: 'asset_criticality >= 5', degraded: 'asset_criticality >= 3', none: 'default' },
  outcomeMapping: { act: 'P0-P1', attend: 'P2', track_star: 'P3', track: 'P4' },
}
```

**Doctrinal compliance:**
- ✅ Strategy-driven (entire decision tree is configurable per tenant)
- ✅ Informs but does not unilaterally govern (parallel to weighted model, not replacement)
- ✅ Audit-trailed (SSVC evaluation recorded per case)

### 4.3 EPSS + KEV Live Enrichment

**Proposal:** Vulnerability cases receive continuous enrichment from two authoritative external feeds:

| Feed | Update Cadence | Action on Case |
|---|---|---|
| **EPSS** (Exploit Prediction Scoring System) | Daily | Updates `exploitability` signal → triggers priority reassessment if score crosses threshold |
| **CISA KEV** (Known Exploited Vulnerabilities catalog) | On publication | Immediately sets `Exploitation = Active` → triggers SSVC re-evaluation → likely priority escalation |

**Implementation:**

1. **Enrichment Connector** (connector class A — read-only, Commander-initiated):
   - Pulls EPSS scores daily for all CVEs referenced by open vulnerability cases.
   - Monitors KEV catalog for new additions matching open case CVEs.

2. **Enrichment → Reassessment Pipeline:**
   - New EPSS score available → stored on risk object as Commander-owned enrichment (not COIM source classification — distinct).
   - If EPSS delta crosses threshold (configurable in strategy) → triggers `reassessment-engine` actor.
   - KEV match → immediate `Exploitation = Active` → SSVC re-evaluation → priority/SLA cascade.

**Doctrinal note:** EPSS/KEV are **Commander-owned intelligence enrichment**, not source provenance. They do NOT mutate the immutable `SourceClassification` (COIM-A). They live in a new enrichment layer on the risk object:

```typescript
// Proposed addition to RiskObject entity (additive, optional)
commanderEnrichment?: {
  epssScore?: number;           // 0-1, updated daily
  epssPercentile?: number;      // 0-100
  epssLastUpdated?: string;     // ISO timestamp
  kevListed?: boolean;          // true if CVE appears on CISA KEV
  kevDateAdded?: string;        // when added to KEV
  exploitMaturity?: 'none' | 'poc' | 'weaponized' | 'active';
};
```

### 4.4 Vulnerability-Specific SLA Modifiers

These are injected by the Vulnerability Profile into the Kernel's adaptive SLA calculation (§3.3):

| Modifier | Condition | Effect |
|---|---|---|
| Exploit Maturity | `active` exploitation confirmed | × 0.5 (halve SLA) |
| Exploit Maturity | PoC available | × 0.75 |
| Exploit Maturity | None known | × 1.0 (no change) |
| KEV Listed | CVE on CISA KEV | × 0.5 (mandatory per BOD 22-01 alignment) |
| Compensating Control | WAF rule active for this CVE | × 1.3 (extend — partial mitigation) |
| Compensating Control | Network segmentation isolates asset | × 1.2 |
| Asset Internet-Facing | `external_attack_surface` | × 0.7 |
| Asset Air-Gapped | Internal-only, no lateral path | × 1.5 |

**Combined example:** P2 vulnerability (base 48h) + KEV listed (×0.5) + external-facing (×0.7) = **16.8h effective SLA** — automatically compressed without human intervention.

### 4.5 Vulnerability-Specific Validation Profile

**What "validation" means for a vulnerability case:**

| Validation Gate | Evidence Required | Automated? |
|---|---|---|
| Patch verification | Re-scan of affected asset confirms CVE absent | Yes (connector re-import) |
| Build verification | If software vuln — CI/CD pipeline confirms patched dependency deployed | Yes (connector class B) |
| Compensating control verification | If patch deferred — WAF/IPS rule confirmed active | Yes (connector class A) |
| Stability period | No regression for N hours post-remediation | Yes (time-based) |

**Validation failure → remediation loop:** If re-scan still detects CVE → `validated_fail` → `in_progress` (system-initiated remediation loop).

### 4.6 Vulnerability-Specific Closure Gates

Beyond the Kernel's generic gates (`remediation-verified`, `validation-passed`, `no-active-drift`, `sla-not-breached`), the Vulnerability Profile adds:

| Domain Gate | Condition |
|---|---|
| `vuln-absent-on-rescan` | Latest scan data confirms CVE not present on any affected entity |
| `vuln-stability-period` | N days (configurable, default 7) elapsed since patch with no recurrence |
| `vuln-no-new-exploit-intel` | No new exploitation intelligence arrived during stability period |
| `vuln-related-cases-clear` | If campaign-grouped — all sibling cases also passing or closed |

### 4.7 Vulnerability-Specific Reopening Triggers

| Trigger | Condition | Action |
|---|---|---|
| CVE reappears on scan | Connector re-import detects same CVE on same asset | `reopened_by_system` |
| New exploit published | EPSS spikes above 0.7 OR KEV addition for this CVE | `reopened_by_system` (if closed < 90d) |
| Patch rollback detected | Connector reports software version regressed | `reopened_by_system` |
| Related campaign escalation | Sibling campaign case escalated to P0/P1 | `reopened_by_system` for review |

---

## 5. New Strategy Surfaces Summary

| # | Surface Type | Purpose | Consumed By |
|---|---|---|---|
| 14 | `sla-modifier` | Adaptive SLA compression/extension modifiers | Kernel SLA calculator |
| 15 | `correlation-policy` | Binding correlation rules (dedup, clustering, chaining) | Correlation engine (pre-binding) |
| 16 | `effectiveness-targets` | Case-handling outcome metric targets | Effectiveness metrics engine |
| 17 | `ssvc-decision-tree` | SSVC decision configuration for vulnerability cases | Vulnerability Domain Profile |

All four follow the existing strategy policy lifecycle: `draft → pending-approval → approved → active → superseded`. All require tenant-admin approval. All support simulation before activation.

---

## 6. New System Actors Summary

| Actor | Responsibility | Triggers |
|---|---|---|
| `correlation-engine` | Pre-binding correlation, dedup, campaign grouping | Risk object created (before binding) |
| `reassessment-engine` | Periodic priority re-evaluation | Cadence from `operational-tempo` + enrichment threshold breach |
| `enrichment-engine` | EPSS/KEV feed ingestion and case signal update | Daily cadence + KEV publication event |
| `effectiveness-engine` | Outcome metric computation and self-corrective case generation | Daily cadence |

---

## 7. Proposed Code Structure

```
packages/contracts/src/
  kernel/                                    ← Case Kernel (type-agnostic)
    case-lifecycle.ts                        ← 12-state machine (move from entities/)
    case-kernel-resolver.ts                  ← orchestrates Kernel-only surfaces
    case-sla-clock.ts                        ← SLA start/breach/adaptive computation
    case-transition-enforcer.ts              ← actor validation per transition
    case-priority-reassessment.ts            ← reassessment loop logic

  profiles/                                  ← Domain Profiles (type-specific)
    types.ts                                 ← DomainProfile interface contract
    vulnerability/
      vuln-signal-resolver.ts                ← CVSS/EPSS/KEV/blast-radius → priority signals
      vuln-ssvc-evaluator.ts                 ← SSVC decision-tree evaluation
      vuln-sla-modifiers.ts                  ← exploit-maturity/surface/control modifiers
      vuln-validation-profile.ts             ← rescan/patch/stability verification
      vuln-closure-gates.ts                  ← domain-specific closure conditions
      vuln-reopening-triggers.ts             ← CVE-reappears, exploit-published, rollback
    identity/
      identity-signal-resolver.ts
      identity-validation-profile.ts
      identity-closure-gates.ts
      identity-reopening-triggers.ts
    architecture/
      arch-signal-resolver.ts
      arch-validation-profile.ts
      arch-closure-gates.ts
      arch-reopening-triggers.ts
    threat-intel/
      ...
    governance/
      ...
    operational/
      ...

  engines/                                   ← System Actors
    risk-object-binder.ts                    ← existing (unchanged)
    correlation-engine.ts                    ← NEW: pre-binding correlation
    reassessment-engine.ts                   ← NEW: periodic priority re-eval
    enrichment-engine.ts                     ← NEW: EPSS/KEV feed processing
    effectiveness-engine.ts                  ← NEW: outcome metrics + self-correction

  entities/
    case.ts                                  ← existing (add commanderEnrichment to RiskObject)
    strategy.ts                              ← extend StrategySurfaceType with 4 new surfaces
```

---

## 8. Implementation Phases

Aligned with Commander build version roadmap.

### Phase 1 — Kernel Hardening (v1.4 scope)

| Task | Effort | Dependencies |
|---|---|---|
| Extract `kernel/` package from existing resolvers | Medium | None |
| Implement multi-factor routing (consume existing strategy data) | Medium | None — data already in seed |
| Define `DomainProfile` interface contract | Small | None |
| Implement priority reassessment loop | Medium | `operational-tempo` surface (exists) |

### Phase 2 — Vulnerability Profile (v1.4–v1.5 scope)

| Task | Effort | Dependencies |
|---|---|---|
| Implement `vuln-signal-resolver.ts` | Medium | Kernel priority interface |
| Implement `vuln-ssvc-evaluator.ts` | Medium | New `ssvc-decision-tree` strategy surface |
| Add `commanderEnrichment` to RiskObject entity | Small | None (additive optional) |
| Implement `vuln-validation-profile.ts` | Medium | Connector framework (v1.3) |
| Implement `vuln-closure-gates.ts` + `vuln-reopening-triggers.ts` | Medium | Validation profile |

### Phase 3 — Enrichment & Correlation (v1.5–v1.6 scope)

| Task | Effort | Dependencies |
|---|---|---|
| Implement `correlation-engine.ts` | Large | New `correlation-policy` surface |
| Implement `enrichment-engine.ts` (EPSS/KEV) | Large | Connector framework + external API access |
| Implement adaptive SLA modifiers | Medium | New `sla-modifier` surface |
| Wire enrichment → reassessment pipeline | Medium | Reassessment engine (Phase 1) |

### Phase 4 — Self-Correction & Remaining Profiles (v1.6+ scope)

| Task | Effort | Dependencies |
|---|---|---|
| Implement `effectiveness-engine.ts` | Medium | Case closure data availability |
| Implement Identity Profile | Medium | Kernel + DomainProfile interface |
| Implement Architecture Profile | Medium | Same |
| Implement remaining profiles | Medium each | Same |

---

## 9. Doctrinal Compliance Checklist

Every improvement in this proposal has been verified against Commander doctrine:

| Doctrinal Assertion | Compliance |
|---|---|
| Assertion 1: Cases are system-owned. No manual creation/closure/override. | ✅ All new actors are system actors. No manual intervention introduced. |
| Assertion 10: Surface attribution visible on every entity. | ✅ No change to attribution model. |
| Constraint #1: Closed-loop case model — no manual override. | ✅ New loops (reassessment, enrichment, correlation) are all system-initiated. |
| Constraint #2: P0 priority overlay must come from strategy. | ✅ SSVC outcome mapping lives in strategy policy. |
| Constraint #9: Strategy-layer consumption — no hardcoded values. | ✅ All thresholds, weights, modifiers, and decision trees live in strategy policies. |
| COIM immutability: Source classification is write-once provenance. | ✅ `commanderEnrichment` is a separate field. `SourceClassification` is never mutated. |
| Performance Doctrine: No regression past tolerance. | ✅ Correlation engine reduces case volume. Enrichment runs async. No UI latency impact. |

---

## 10. Decision Required

This proposal requires the following owner decision before execution:

**DEC-CMEP-001:** Approve the Case Kernel / Domain Profile architectural separation and the 4 new strategy surfaces (`sla-modifier`, `correlation-policy`, `effectiveness-targets`, `ssvc-decision-tree`).

**DEC-CMEP-002:** Approve the introduction of `commanderEnrichment` as a Commander-owned intelligence layer on RiskObject, distinct from COIM source provenance.

**DEC-CMEP-003:** Approve the priority reassessment loop (new lifecycle transition: `in_progress → reprioritised → in_progress` via `reassessment-engine` actor).

**DEC-CMEP-004:** Confirm phasing alignment (Phase 1 targets v1.4, Phase 2–3 targets v1.5–v1.6).

---

## 11. References

- [CISA SSVC Framework](https://www.cisa.gov/stakeholder-specific-vulnerability-categorization-ssvc)
- [FIRST EPSS Model](https://www.first.org/epss/)
- [CISA KEV Catalog](https://www.cisa.gov/known-exploited-vulnerabilities)
- Commander Spec #08 (Case Management)
- Commander Spec #17 (Closed-Loop Control Architecture)
- Commander Spec #29 (Universal Risk Object and Case Binding)
- Commander Spec #30 (Case Validation and Closure)
- Commander Spec #32 (Strategy Layer Runtime Surface)

Content was rephrased for compliance with licensing restrictions.
