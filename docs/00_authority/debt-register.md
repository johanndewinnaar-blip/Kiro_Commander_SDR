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
