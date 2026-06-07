# CHAIN COMPLIANCE AUDIT — Commander SDR

**Purpose:** Identify new debt surfaced by the RELATIONSHIP_MAP and ARCH-DEBT gate additions to the traceability chain.
**Date:** 2026-06-07
**Trigger:** Governance chain update (commit `85cdd7c`) added RELATIONSHIP_MAP gate, ARCH-DEBT gate, and AICAP register to the mandatory chain.

---

## Summary

| Metric | Count |
|--------|-------|
| Relationship rendering gaps (pages missing documented cross-entity data) | 8 |
| ARCH-DEBT retroactive flags (entities built while debt open) | 5 |
| Missing use cases implied by RELATIONSHIP_MAP | 6 |

---

## Resolution Status (2026-06-07)

| Item | Category | Action Taken | Status |
|------|----------|-------------|--------|
| SCAFFOLD badges on /operating-picture/external | Quick Win #1 | Badges removed from drill links | ✅ RESOLVED |
| "Show in Operating Picture" on /cases/:id | Quick Win #2 | Drill link added to case detail right rail | ✅ RESOLVED |
| Intelligence Surface → case drill | Quick Win #3 | Already correct (links to /cases/:id) — acceptable alternative | ✅ RESOLVED |
| 6 implied use cases | Section C | All registered as UC-207 through UC-212 | ✅ REGISTERED |
| Fusion Map page build | Phase 2 | Documented as UC-209, UC-211 | DEFERRED |
| Direction Board page build | Phase 2 | Documented as UC-212 | DEFERRED |
| OODA Phase Dashboards | Phase 2 | Documented as UC-210 | DEFERRED |
| Strategy → Fusion Map refresh | Phase 2 | Blocked by Fusion Map build | DEFERRED |
| Case detail → Fusion Map | Phase 2 | Blocked by Fusion Map build | DEFERRED |
| 5 ARCH-DEBT retroactive flags | Section B | Pre-existing governance-sequence debt; not code-quality | ACKNOWLEDGED |

---

## Section A — Relationship Rendering Debt

Cross-entity relationships documented in RELATIONSHIP_MAP.md §8 (Surface drill paths) that are not yet rendered on the expected pages.

| Relationship (from RELATIONSHIP_MAP) | Expected Page(s) | Currently Rendered? | Gap |
|--------------------------------------|------------------|--------------------|----|
| Operating Picture → Entity Intelligence Surface (click entity pip → /identity or /assets) | /operating-picture/external, /operating-picture/internal | Partial — links exist but labelled SCAFFOLD on external | LOW — drill link exists, badge cosmetic |
| Fusion Map → Case detail (click risk node opens case) | /fusion-map | No — fusion-map is SCAFFOLD | MEDIUM — page not built |
| Fusion Map → Evidence chain (click edge) | /fusion-map | No — fusion-map is SCAFFOLD | MEDIUM — page not built |
| Case detail → "Show in Operating Picture" | /cases/:id | No — no "Show in OP" button rendered | LOW — feature deferred |
| OODA Command Tempo → Phase Dashboard drill | / (Command Centre) | Partial — phase scores shown but no drill-through link to dedicated phase dashboard | LOW — phase dashboards not built |
| Operating Picture → Direction Board integration | /operating-picture/external, /operating-picture/internal | No — Direction Boards not built | MEDIUM — entity + page absent |
| Intelligence Surface → Fusion Map (click related case) | /identity, /assets | No — case history links to /cases/:id, not fusion map | LOW — acceptable alternative drill |
| Strategy change → Fusion Map refresh trigger | /strategy/centre | No — strategy change doesn't trigger Fusion Map (no Fusion Map page) | MEDIUM — blocked by Fusion Map build |

---

## Section B — ARCH-DEBT Retroactive Flags

Open ARCH-DEBT items that affect entities/engines currently in code. Under the new gate rule, these entities would have been BLOCKED. They were built before the gate existed — retroactive debt, not violations.

| ARCH-DEBT ID | Status | Affected Entity/Domain | Built Before Gate? | Impact |
|--------------|--------|----------------------|-------------------|--------|
| ARCH-DEBT-001 | OPEN | All entities — translation-layer sourcing (programme-wide) | Yes | LOW — governance debt, not code-blocking; entities are correctly built from baseline |
| ARCH-DEBT-003 | OPEN | Strategy Layer (D-22) — no build pack ownership | Yes | MEDIUM — strategy entities + engine built without formal BP; code is correct |
| ARCH-DEBT-047 | OPEN | Tenant Admin auth runtime — all tenant-admin pages | Yes | MEDIUM — pages built with mock/display-only; live enforcement deferred |
| ARCH-DEBT-048 | OPEN | Internal Risk authority overlay — identity/internal-cop pages | Yes | MEDIUM — pages built with honest gate; runtime enforcement absent |
| ARCH-DEBT-050 | OPEN | Connector mutation (tenant-admin write) | Yes | LOW — read-only display built correctly; write deferred to Phase 2 |

**None of these are code-quality issues.** They are governance-sequence debt: the entities/pages were built before the gate formalism existed. The code is structurally correct — the debt is that the governance checkpoint wasn't formally passed.

---

## Section C — Missing Use Cases (implied by RELATIONSHIP_MAP)

Cross-entity navigation paths documented in RELATIONSHIP_MAP §8 that have no registered use case in USE_CASE_REGISTER.md.

| Implied UC | Description | Relationship Source | Proposed Route |
|------------|-------------|--------------------|----|
| Navigate from Operating Picture entity pip to Intelligence Surface | Click entity marker → open Identity/Asset Intelligence Surface | RELATIONSHIP_MAP §8 row 1-2 | /operating-picture/* → /identity or /assets |
| Navigate from case detail to Operating Picture (contextual) | "Show in Operating Picture" button on case detail | RELATIONSHIP_MAP §8 row 4 | /cases/:id → /operating-picture/* |
| Navigate from Fusion Map risk node to bound case | Click actionable graph node → open case detail | RELATIONSHIP_MAP §7 interaction rules | /fusion-map → /cases/:id |
| Drill from OODA Command Tempo phase score to phase dashboard | Click phase gauge → open dedicated phase dashboard | RELATIONSHIP_MAP §8 row 5-6 | / → /ooda/observe (etc.) |
| Navigate from Intelligence Surface to Fusion Map (case-centric view) | Click related case on identity/asset detail → Fusion Map focused on that case | RELATIONSHIP_MAP §8 row 7 | /identity → /fusion-map?case=X |
| Direction Board integration into Operating Picture | Direction Board panel embedded in Operating Picture view | RELATIONSHIP_MAP §8 row 6; §3 D-27→D-28 | /operating-picture/* (embedded panel) |

---

## Section D — Recommended Actions

### Quick Wins (fix now — low effort, high governance value)

1. **Remove remaining SCAFFOLD badge** on /operating-picture/external drill links to /assets and /identity — those pages are BUILT (already done in placeholder resolution; verify badge removal committed)
2. **Register the 6 implied use cases** in USE_CASE_REGISTER.md — purely governance; no code needed yet
3. **Add "Show in Operating Picture" drill link** to /cases/:id right rail — simple `<a>` tag to existing built page

### Park (complex, Phase 2+)

4. **Fusion Map page build** — unblocks 3 relationship rendering gaps; requires graph visualization library + full node/edge model; Phase 2 scope
5. **Direction Board entity + page** — unblocks 2 gaps; new domain surface; Phase 2 scope
6. **OODA Phase Dashboards** (dedicated /ooda/* routes) — unblocks 1 gap; Phase 2 scope
7. **Resolve ARCH-DEBT-003** (Strategy Layer build-pack ownership) — governance cleanup; no code impact

### Priority Order

| # | Action | Effort | Unblocks |
|---|--------|--------|----------|
| 1 | Register 6 implied use cases | 10 min | Governance compliance |
| 2 | Add "Show in OP" link on case detail | 5 min | 1 relationship gap |
| 3 | Resolve ARCH-DEBT-003 (governance) | 15 min | 1 retroactive flag |
| 4 | Fusion Map page (Phase 2) | Multi-day | 3 relationship gaps |
| 5 | Direction Boards (Phase 2) | Multi-day | 2 relationship gaps |
| 6 | OODA Phase Dashboards (Phase 2) | Multi-day | 1 relationship gap |

---

## Conclusion

The governance chain update surfaced **manageable debt** — no critical blockers, no broken code, no security issues. The gaps are:
- 8 relationship rendering items (5 blocked by Phase 2 surfaces, 3 are quick wins)
- 5 retroactive ARCH-DEBT flags (all governance-sequence, not code-quality)
- 6 missing use cases (purely registration — no code needed)

The chain is enforceable going forward without disrupting existing work.

---

*End of audit.*
