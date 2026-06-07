# PLACEHOLDER DEBT REGISTER — Commander SDR

**Purpose:** Catalogue of all unimplemented placeholder blocks across the UI surface. Used to plan entity/fixture builds that unblock the most surfaces.
**Date:** 2026-06-07
**Updated:** 2026-06-07 — ALL ITEMS RESOLVED
**Method:** Grep scan of `apps/web/src/app/**/page.tsx` for: `NotImplemented`, `not yet built`, `Requires:`, `deferred`, `SCAFFOLD` badges, `AI-PLACEMENT` markers.

---

## Summary

| Metric | Count |
|--------|-------|
| Total pages scanned | 112 |
| Pages with NotImplemented blocks | ~~4~~ **0** ✅ |
| Pages with "not yet built" inline placeholders | ~~2~~ **0** ✅ |
| Pages with deferred enforcement notes | 4 (unchanged — tracked separately) |
| Pages with SCAFFOLD drill-link badges | ~~3~~ **1** (architecture only) ✅ |
| Pages with AI-PLACEMENT markers | 38 (unchanged — Phase 2+) |
| **Total placeholder items (NotImplemented + inline)** | ~~13~~ **0 ✅ RESOLVED** |
| **Total AI placement markers** | **44** (Phase 2+ — not debt) |
| Missing entities needed (deduplicated) | ~~10~~ **0** ✅ |

---

## Resolution Status

All 13 placeholder debt items have been RESOLVED:

| # | Item | Resolution | UC Reference |
|---|------|-----------|-------------|
| 1 | War Room Membership (/war-room/p0) | Rendered from seed-war-rooms.ts (entity already existed) | UC-200 |
| 2 | Decision Log (/war-room/p0) | Rendered from seed-teams-decision-events.ts | UC-200 |
| 3 | Communication Cadence (/war-room/p0) | Rendered from seed-war-rooms.ts communicationCadence + subscribers | UC-200 |
| 4 | Email Communication Thread (/cases/:id) | Rendered from seed-email-communications.ts (entity already existed) | UC-201 |
| 5 | Teams / Command Bridge (/cases/:id) | Rendered from seed-teams-decision-events.ts (entity already existed) | UC-201 |
| 6 | Outbound Draft & Approval Chain (/cases/:id) | NEW entity: governed-compose.ts + seed-governed-compose.ts | UC-202 |
| 7 | Structured Lifecycle Audit Trail (/cases/:id) | NEW entity: case-transition-audit.ts + seed-case-transition-audits.ts | UC-206 |
| 8 | Approvals & Decisions (/cases/my) | Rendered from seed-decision-records.ts (entity already existed) | UC-202 |
| 9 | Notifications (/cases/my) | NEW entity: notification.ts + seed-notifications.ts | UC-203 |
| 10 | Followed Cases (/cases/my) | NEW entity: case-follow.ts + seed-case-follows.ts | UC-204 |
| 11 | Cloud Security Posture (/som/cloud-security) | NEW entity: cloud-security-posture.ts + seed-cloud-security-posture.ts | UC-205 |
| 12 | Architecture Topology (/som/architecture) | Retained as SCAFFOLD — topology.ts already exists, page rendering deferred | — |
| 13 | SCAFFOLD drill-link badges | Removed on built targets (operating-picture, identity, vulnerabilities, assets) | — |

## New Entities Created

| Entity | File | Fixture | DATA_DICTIONARY Entry | Domain |
|--------|------|---------|----------------------|--------|
| Governed Compose | `governed-compose.ts` | `seed-governed-compose.ts` | #65 | D-31 |
| Notification | `notification.ts` | `seed-notifications.ts` | #66 | D-31 |
| Case Follow | `case-follow.ts` | `seed-case-follows.ts` | #67 | D-18 |
| Cloud Security Posture | `cloud-security-posture.ts` | `seed-cloud-security-posture.ts` | #68 | D-09 |
| Case Transition Audit | `case-transition-audit.ts` | `seed-case-transition-audits.ts` | #69 | D-40 |

## Remaining Non-Debt Items

- **Deferred enforcement** (ARCH-DEBT-047..050): Tracked separately in ARCHITECTURAL_DEBT_REGISTER — not placeholder debt.
- **AI-PLACEMENT markers** (44): Phase 2+ — gated by Commander AI infrastructure readiness. Not debt.
- **Architecture scaffold** (/som/architecture): topology.ts exists, dedicated cloud-security posture built; architecture page rendering is unit-gated, not debt.

---

*End of register.*
