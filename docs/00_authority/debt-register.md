# Debt Register — Commander SDR (SINGLE BACKLOG)

**Purpose:** SINGLE source of truth for ALL work owed. Every type of debt, scheduled fix, governance gap, and deferred build unit lives here. There is NO other backlog.

**Authority:** This register supersedes all other debt/backlog trackers as the active tracking location. Historical trackers (TRACEABILITY_DEBT.md, PLACEHOLDER_DEBT_REGISTER.md, CHAIN_COMPLIANCE_AUDIT.md) are retained for lineage only.

**Status:** ACTIVE — updated on every pipeline run and after every build commit.

**Debt Types:**
- **CONFORMANCE:** DSC/TOK/PERF/SEC/RBAC assertion violations
- **STRUCTURAL:** Shell/chrome conversion, large migration work
- **GOVERNANCE:** Chain maintenance gaps, missing doc updates
- **BUILD:** PARKED units, deferred features
- **IMPACT:** Post-build downstream requirements introduced by a fix

**Sequencing:**
1. Blocking (prevents other work) → fix first
2. Quick (doc update, one-line fix) → batch and clear
3. Scheduled (awaits dedicated work package) → planned
4. Deferred (Phase 2/3) → parked with clear trigger condition

**Dependencies:** Each entry states what it depends on and what it unblocks.

**Zero tolerance:** Any staleness or drift = immediate registration.

---

## Summary

| Status | Count |
|--------|-------|
| Resolved | 8 |
| Deferred | 5 |
| **Total** | **13** |

---

## Register Entries

### DEBT-001: Control Plane Font Override

**Type:** CONFORMANCE  
**File:** `apps/web/src/app/control-plane/layout.tsx`  
**Violated Assertion:** DSC-006 (Font Inheritance)  
**Description:** Bebas Neue display font override instead of inherited Inter. Removed fontFamily declarations; Inter inherits from root.  
**Status:** Resolved  
**Resolved:** 2026-06-08  
**Date Logged:** 2026-05-30  

### DEBT-002: Gold Usage Outside Logo

**Type:** CONFORMANCE  
**File:** Multiple files (war-room/p0, cases/[id], cases, control-plane, tenant-admin, operational-sidebar, operational-top-bar, case-card, expandable-case-row)  
**Violated Assertion:** DSC-005 (Gold Restriction)  
**Description:** Gold used for surface badges, lifecycle indicators, navigation. Replaced with semantic signal tokens. Gold now only in COMMANDER logo wordmark.  
**Status:** Resolved  
**Resolved:** 2026-06-08  
**Date Logged:** 2026-05-30  

### DEBT-003: Hardcoded Color Values

**Type:** STRUCTURAL  
**File:** Multiple files (sidebar/index.tsx, operational-sidebar.tsx, operational-top-bar.tsx, header/index.tsx, tenant-admin/layout.tsx, control-plane/layout.tsx)  
**Violated Assertion:** DSC-004 (Vivid Semantic Colour), DSC-012 (Mode Support)  
**Description:** Hardcoded hex colors replaced with Tabler CSS variables and semantic token references. Chrome now inherits from Tabler's theme system.  
**Status:** Resolved  
**Resolved:** 2026-06-08  
**Date Logged:** 2026-05-30  

### DEBT-004: Custom CSS Classes in Components

**Type:** STRUCTURAL  
**File:** Multiple files (sidebar/index.tsx, header/index.tsx)  
**Violated Assertion:** DSC-003 (Tabler Classes Only)  
**Description:** All cmdr-* custom CSS classes converted to Tabler equivalents (navbar, nav-link, badge, nav-link-toggle, navbar-brand, navbar-footer). Zero cmdr-* classes remaining.  
**Status:** Resolved  
**Resolved:** 2026-06-08  
**Date Logged:** 2026-05-30  

### DEBT-005: New Entities Missing from SYSTEM_KNOWLEDGE_GRAPH §19

**Type:** GOVERNANCE  
**File:** `docs/knowledge/SYSTEM_KNOWLEDGE_GRAPH.md`  
**Violated Assertion:** Chain Maintenance Rule  
**Description:** Five entities from placeholder debt resolution documented in knowledge graph.  
**Status:** Resolved  
**Resolved:** 2026-06-07  
**Date Logged:** 2026-06-07  

### DEBT-006: New Entities Missing from RELATIONSHIP_MAP

**Type:** GOVERNANCE  
**File:** `docs/knowledge/RELATIONSHIP_MAP.md`  
**Violated Assertion:** Chain Maintenance Rule  
**Description:** Cross-entity relationships for 5 new entities documented.  
**Status:** Resolved  
**Resolved:** 2026-06-07  
**Date Logged:** 2026-06-07  

### DEBT-007: New Entity Pages Missing AICAP Entries

**Type:** GOVERNANCE  
**File:** `docs/00_authority/AICAP_REGISTER.md`  
**Violated Assertion:** Chain Maintenance Rule  
**Description:** Audited — no AICAP markers referenced new entities. Closed as N/A.  
**Status:** Resolved  
**Resolved:** 2026-06-07  
**Date Logged:** 2026-06-07  

### DEBT-008: GOVERNANCE_KNOWLEDGE_SOURCE §7 Counts Conservative

**Type:** GOVERNANCE  
**File:** `docs/knowledge/GOVERNANCE_KNOWLEDGE_SOURCE.md`  
**Violated Assertion:** ARCH-011 (Governance Knowledge Source Staleness)  
**Description:** Section 7 counts updated to exact current numbers.  
**Status:** Resolved  
**Resolved:** 2026-06-07  
**Date Logged:** 2026-06-07  

### DEBT-009: Unit 39 — Real Connector Readiness

**Type:** BUILD  
**File:** `docs/knowledge/REBASELINED_BUILD_SEQUENCE.md` Unit 39  
**Description:** Real vendor connector integration, live API testing, connector health monitoring with real endpoints. Requires Phase 2 approval and real vendor API keys.  
**Depends on:** Phase 2 approval  
**Unblocks:** Production connector usage  
**Trigger:** Phase 2 approved by owner  
**Status:** Deferred (Phase 2)  
**Date Logged:** 2026-06-08  

### DEBT-010: Unit 41 — AWS Alignment

**Type:** BUILD  
**File:** `docs/knowledge/REBASELINED_BUILD_SEQUENCE.md` Unit 41  
**Description:** AWS service evaluation, Bedrock/AgentCore assessment, infrastructure planning. Requires Phase 2 approval.  
**Depends on:** Phase 2 approval  
**Unblocks:** Cloud deployment readiness  
**Trigger:** Phase 2 approved by owner  
**Status:** Deferred (Phase 2)  
**Date Logged:** 2026-06-08  

### DEBT-011: Unit 47 — DevOps Local/AWS

**Type:** BUILD  
**File:** `docs/knowledge/REBASELINED_BUILD_SEQUENCE.md` Unit 47  
**Description:** Local development environment + AWS deployment pipeline, CI/CD, infrastructure-as-code. Phase 3 scope.  
**Depends on:** Phase 3 approval, Unit 41 (AWS Alignment)  
**Unblocks:** Automated deployment  
**Trigger:** Phase 3 approved by owner  
**Status:** Deferred (Phase 3)  
**Date Logged:** 2026-06-08  

### DEBT-012: Unit 48 — Platform Security Hardening

**Type:** BUILD  
**File:** `docs/knowledge/REBASELINED_BUILD_SEQUENCE.md` Unit 48  
**Description:** Production security hardening, penetration testing, compliance validation, SOC2 readiness. Phase 3 scope.  
**Depends on:** Phase 3 approval, Unit 47 (DevOps)  
**Unblocks:** Production launch readiness  
**Trigger:** Phase 3 approved by owner  
**Status:** Deferred (Phase 3)  
**Date Logged:** 2026-06-08  

### DEBT-013: Unit 49 — Phase 3 Pilot

**Type:** BUILD  
**File:** `docs/knowledge/REBASELINED_BUILD_SEQUENCE.md` Unit 49  
**Description:** Pilot tenant onboarding, production monitoring, feedback loop, launch decision. Phase 3 scope.  
**Depends on:** Units 47 + 48  
**Unblocks:** General availability  
**Trigger:** Phase 3 approved by owner  
**Status:** Deferred (Phase 3)  
**Date Logged:** 2026-06-08  

---

### DEBT-014: Journey Intelligence — Pages Not Built

**Type:** IMPACT  
**Source:** JOURNEY_INTELLIGENCE.md (JI-1.0), Unit 51  
**Description:** Data layer complete (entities, engines, formulas, read models, 79 tests). UI pages rendering journey analytics to users NOT YET BUILT.  
**Severity:** MEDIUM (data layer complete, UI surface pending)  
**Status:** Active  
**Date Logged:** 2026-06-08  

**What exists:** journey.ts, journey-template.ts, 4 tagger engines, 10 formula engines, 7 analytics read-model tables, 33 template fixtures, 10 formula policy fixtures, 8 journey fixtures  
**What's missing:** UI pages rendering entity data

**Page debt (conveyor items):**
- [ ] Journey Lifecycle Dashboard — UC-213 — aggregate journey tempo, leakage, quality
- [ ] Journey Tempo Detail — UC-214 — per-phase duration breakdown
- [ ] Journey Leakage Monitor — UC-215 — stalled journeys past threshold
- [ ] Automation Friction Dashboard — UC-219 — drag, failure, rescue rates
- [ ] Automation Maturity Tracker — UC-220 — delivery mode progression
- [ ] Journey Template Configuration — UC-216 — template management
- [ ] Journey Quality Scores — UC-217 — composite quality per type
- [ ] Automation Opportunity Scores — UC-218 — automatable journey identification

**Resolution:** Build pages per PAGE_SCHEDULE when UI pass sequenced.

---

### DEBT-015: Asset Architecture Intelligence — Pages Not Built

**Type:** IMPACT  
**Source:** ASSET_ARCHITECTURE_INTELLIGENCE.md (AAI-1.0), Unit 52  
**Description:** Data layer complete (entities, schemas, fixtures, enums, 52-type taxonomy). UI pages for estate topology, architecture map, and coverage/compliance views NOT YET BUILT.  
**Severity:** MEDIUM (data layer complete, UI surface pending)  
**Status:** Active  
**Date Logged:** 2026-06-08  

**What exists:** estate-node.ts, asset-relationship.ts, asset-coverage-binding.ts, compliance-scope-binding.ts, asset-architecture-enums.ts (52 types, 12 tiers), estate DB schema (4 tables), asset extended (4 fields), seed fixtures  
**What's missing:** UI pages, Architecture Map visualisation, blast radius traversal engine (Phase 2)

**Page debt (conveyor items):**
- [ ] Estate Topology View — UC-221 — organisational hierarchy with compliance inheritance
- [ ] Asset Dependency Graph — UC-223 — relationship visualisation with staleness
- [ ] Blast Radius Computation — UC-224 — dependency graph traversal (Phase 2)
- [ ] Coverage Gap Matrix — UC-225 — explicit tool-to-asset binding gaps
- [ ] Compliance Scope Manager — UC-226 — framework scoping with inheritance
- [ ] Architecture Map — AAI-1.0 §8 — tier-organised visualisation with risk overlay (Phase 2)

**Resolution:** Build pages per PAGE_SCHEDULE. Architecture Map and blast radius are Phase 2 (graph engine dependency).

---

### DEBT-016: Inception Posture Intelligence — Pages & Integration Not Built

**Type:** IMPACT  
**Source:** INCEPTION_POSTURE_INTELLIGENCE.md (IPI-1.0), Unit 53  
**Description:** Data layer complete (enums, profile entity, evaluator engine, entity extensions). Case creation pipeline integration, profile management UI, systemic pattern detection, and onboarding activation UI NOT YET BUILT.  
**Severity:** MEDIUM (data layer complete, integration + UI pending)  
**Status:** Active  
**Date Logged:** 2026-06-08  

**What exists:** inception-posture-enums.ts, secure-design-profile.ts, inception-posture-evaluator.ts, asset.postureOrigin, finding.rootCauseClass, case type #13, risk object type, migration 0019  
**What's missing:** Evaluator integration into asset creation pipeline, profile management UI, case creation pipeline for inception failures, systemic pattern detection read model, onboarding activation config UI

**Page debt (conveyor items):**
- [ ] Secure Design Profile Manager — UC-227 — profile CRUD with strategy policy governance
- [ ] Inception Posture Dashboard — UC-228 — posture origin distribution, evaluation results
- [ ] Not-Secure-by-Design Case View — UC-229 — case type #13 routing to build team
- [ ] Systemic Pattern Surface — UC-230 — shared root cause identification (Phase 2)
- [ ] Onboarding Activation Manager — UC-231 — phased scope activation per node/tier

**Resolution:** Build pages per PAGE_SCHEDULE. Systemic pattern detection is Phase 2 (requires analytics read model).

---

## Debt Type Definitions

### CONFORMANCE
DSC/TOK/PERF/SEC/RBAC assertion violations detected by the core testing pipeline.  
**Action:** Auto-fix (4 attempts) or register with scheduled resolution.

### STRUCTURAL
Large migration work — whole shell/page/component still on old system.  
**Action:** Register with full scope. Do NOT auto-fix individual lines.

### GOVERNANCE
Chain maintenance gaps — missing doc updates, stale knowledge graph entries.  
**Action:** Quick fix (doc update) or batch in governance pass.

### BUILD
PARKED units deferred to Phase 2/3 — tracked with explicit trigger conditions.  
**Action:** Remains Deferred until trigger condition met. No work performed.

### IMPACT
Post-build downstream requirements — introduced when a fix invalidates downstream chain docs.  
**Action:** Auto-registered by ARCH-012. Fix in next governance pass or same commit.

---

## Closure Rules

1. **Automatic re-check:** On every pipeline run, re-check all non-Deferred items. If violation no longer exists, mark Resolved.
2. **Deferred items:** Only move to Active when trigger condition is met (owner approval).
3. **Audit trail:** Resolved items stay in register. Never deleted.
4. **IMPACT debt:** Auto-registered by ARCH-012. Fix is updating the stale downstream doc.

---

**Last Updated:** 2026-06-08  
**Next Pipeline Run:** TBD
