# PLACEHOLDER DEBT REGISTER — Commander SDR

**Purpose:** Catalogue of all unimplemented placeholder blocks across the UI surface. Used to plan entity/fixture builds that unblock the most surfaces.
**Date:** 2026-06-07
**Method:** Grep scan of `apps/web/src/app/**/page.tsx` for: `NotImplemented`, `not yet built`, `Requires:`, `deferred`, `SCAFFOLD` badges, `AI-PLACEMENT` markers.

---

## Summary

| Metric | Count |
|--------|-------|
| Total pages scanned | 112 |
| Pages with NotImplemented blocks | 4 |
| Pages with "not yet built" inline placeholders | 2 |
| Pages with deferred enforcement notes | 4 |
| Pages with SCAFFOLD drill-link badges | 3 |
| Pages with AI-PLACEMENT markers | 38 |
| **Total placeholder items (NotImplemented + inline)** | **13** |
| **Total AI placement markers** | **44** |
| Missing entities needed (deduplicated) | 10 |

---

## Per-Page Detail — NotImplemented Blocks

| Page Route | Placeholder Text | Missing Entity/Fixture | Spec Reference | Severity |
|------------|------------------|----------------------|----------------|----------|
| `/war-room/p0` | War Room Membership | WarRoom membership entity + seed fixture | Spec #24 | HIGH |
| `/war-room/p0` | Decision Log | war-room decision-event entity + seed fixture | Spec #24 | HIGH |
| `/war-room/p0` | Communication Cadence & Bridge Posts | war-room communication entity + seed fixture | Spec #24/25 | HIGH |
| `/cases/:id` | Email Communication Thread | CaseEmailThread / case-message entity + seed fixture | Spec #25 | HIGH |
| `/cases/:id` | Teams / Command Bridge Integration | Teams decision-event entity + seed fixture | Spec #25/26 | MEDIUM |
| `/cases/:id` | Outbound Draft & Approval Chain | governed-compose + approval entity | Spec #25 Req 3/5 | MEDIUM |
| `/cases/:id` | Structured Lifecycle Audit Trail | case-transition audit event store | Spec #06 Domain Req 6 | MEDIUM |
| `/cases/my` | Approvals & Decisions | approval/decision entity + fixture | Spec #08 §8.3 | MEDIUM |
| `/cases/my` | Notifications | notification entity + fixture | Spec #26 | LOW |
| `/cases/my` | Followed Cases | case-follow/subscription entity + fixture | — | LOW |

## Per-Page Detail — Inline "Not Yet Built" Placeholders

| Page Route | Placeholder Text | Missing Entity/Fixture | Spec Reference | Severity |
|------------|------------------|----------------------|----------------|----------|
| `/som/cloud-security` | Cloud Security Posture — entity not yet built | cloud-security-posture entity with multi-cloud drift detection | Spec #22 | MEDIUM |
| `/som/architecture` | Architecture Topology — entity not yet built | architecture-topology entity with dependency graph and trust boundaries | Spec #22 | MEDIUM |

## Per-Page Detail — Deferred Enforcement

| Page Route | Deferred Item | Reference | Severity |
|------------|--------------|-----------|----------|
| `/settings/connectors` | Connector edit capability deferred to Phase 2 | Phase 2 connector integration | LOW |
| `/settings/users-rbac` | User management/RBAC editing read-only, live enforcement deferred | ARCH-DEBT-047 | MEDIUM |
| `/tenant-admin` | All capabilities display/mock only, live enforcement deferred | ARCH-DEBT-047..050, DEC-unit22 | MEDIUM |
| `/commander-ai` | RAG / Knowledge Base deferred to Phase 2+ | Phase 2+ evaluation | LOW |
| `/` (Command Centre) | Aggregate posture/SLA/coverage KPI rollups deferred to Unit 16b | DEC-command-centre-deferred | LOW |

## Per-Page Detail — SCAFFOLD Drill-Link Badges

| Page Route | SCAFFOLD Link Target | Notes |
|------------|---------------------|-------|
| `/` (Command Centre) | /operating-picture/external, /operating-picture/internal | Drill links to built (Unit 20/21) pages — badge can be removed |
| `/assets` | /identity, /vulnerabilities, /architecture | Drill links to scaffold sub-pages |
| `/operating-picture/external` | /assets, /identity | Drill links labelled scaffold |

---

## Consolidated Missing Entities

| Entity Needed | Referenced By (pages) | Spec | Exists in Code? |
|---------------|----------------------|------|-----------------|
| **WarRoom** (membership, decisions, communication) | /war-room/p0 | Spec #24 | ❌ No |
| **CaseEmailThread / case-message** | /cases/:id | Spec #25 | ❌ No |
| **Teams decision-event** (Command Bridge) | /cases/:id, /war-room/p0 | Spec #25/26 | `teams-decision-event.ts` ✅ (entity exists, no page) |
| **governed-compose + approval entity** | /cases/:id | Spec #25 Req 3/5 | ❌ No |
| **case-transition audit event store** | /cases/:id | Spec #06 Req 6 | Partial (audit-event.ts exists, structured lifecycle trail missing) |
| **approval/decision entity** | /cases/my | Spec #08 §8.3 | `decision-record.ts` ✅ (exists, page link deferred) |
| **notification entity** | /cases/my | Spec #26 | ❌ No |
| **case-follow/subscription entity** | /cases/my | — | ❌ No |
| **cloud-security-posture entity** | /som/cloud-security | Spec #22 | ❌ No |
| **architecture-topology entity** (dependency graph + trust boundaries) | /som/architecture | Spec #22 | `topology.ts` ✅ (exists, page scaffold) |

---

## AI-PLACEMENT Marker Summary

44 AI placement markers across 38 pages. These are NOT missing entities — they are future Commander AI capability placements (AICAP items) that will be activated when the Commander AI grounding infrastructure is ready (Phase 2+). They are tracked in the AICAP Register in USE_CASE_REGISTER.md and do not block entity or page builds.

| Category | Count | Example |
|----------|-------|---------|
| Pulse surfaces (AICAP-PULSE-*) | 6 | Workload recommendation, SLA prediction |
| Platform surfaces (AICAP-PLATFORM-*) | 8 | Rule tuning, model insight, automation prediction |
| Admin settings (AICAP-ADMIN-*) | 7 | Tenant config, baseline drift, access anomaly |
| Strategy surfaces (AICAP) | 6 | Policy recommendation, conflict resolution, simulation |
| Vulnerability surfaces (AICAP-VULN-*) | 3 | KEV/patch/supply-chain prioritisation |
| Exposure surfaces (AICAP-EXPOSURE-*) | 3 | Attack surface correlation, blast zone, coverage gap |
| Case surfaces (AI-CASE-*) | 2 | Queue focus order, next best action |
| War Room (AI-WAR-ROOM-*) | 2 | Orientation briefing, exploit deep-dive |
| Reporting (AICAP-REPORT-*) | 1 | Report schedule optimisation |
| SOM/CISO (AICAP-005) | 1 | Executive risk briefing |
| Search (AICAP) | 2 | Intent disambiguation, results enrichment |
| Security settings (AICAP) | 2 | Posture recommendation, break-glass assessment |
| Platform overview (AICAP-PLAT-006) | 1 | Platform health summary |

---

## Recommended Build Order

Entities that unblock the most placeholders first:

| Priority | Entity to Build | Unblocks | Pages Affected | Spec |
|----------|----------------|----------|----------------|------|
| 1 | **WarRoom** (membership + decision-event + communication) | 3 NotImplemented blocks | /war-room/p0 | Spec #24 |
| 2 | **CaseEmailThread / case-message** | 1 NotImplemented + enables full case communication | /cases/:id | Spec #25 |
| 3 | **governed-compose + approval entity** | 1 NotImplemented + enables draft/approval workflow | /cases/:id | Spec #25 Req 3/5 |
| 4 | **notification entity** | 1 NotImplemented | /cases/my | Spec #26 |
| 5 | **case-follow/subscription entity** | 1 NotImplemented | /cases/my | — |
| 6 | **cloud-security-posture entity** | 1 inline placeholder | /som/cloud-security | Spec #22 |
| 7 | **case-transition structured audit** (extend audit-event) | 1 NotImplemented | /cases/:id | Spec #06 Req 6 |

**Notes:**
- Items 1–3 are HIGH priority — they serve the P0/zero-day war room and the case detail communication surface (the two most operationally critical surfaces after the Command Centre).
- Items 4–7 are MEDIUM/LOW — they serve analyst convenience features and SOM views.
- AI-PLACEMENT markers are NOT in this build order — they are Phase 2+ items gated by Commander AI infrastructure readiness.
- Deferred enforcement items (ARCH-DEBT-047..050) are tracked separately in the ARCHITECTURAL_DEBT_REGISTER and are not entity-build blockers.

---

*End of register.*
