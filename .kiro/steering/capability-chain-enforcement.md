---
inclusion: always
---

# Capability Chain Enforcement — New Authority Document Build Pattern

**Purpose:** Mandatory left-to-right chain walk when implementing any new authority document or capability domain. Prevents governance debt accumulation by ensuring all chain links are completed IN THE SAME BUILD SESSION.

**Authority:** Binding on all future capability domain builds. Supplements `traceability-chain.md`.

---

## When This Fires

This rule applies whenever:
- A new authority document is created in `docs/00_authority/`
- A new domain (D-XX) is being established
- A new build unit (Unit XX) is being created
- Entity code is being written for a domain that didn't previously have code

---

## BEFORE Writing Any Entity/Engine Code (Pre-Code Gates)

Complete these IN ORDER. Do not proceed to code until all are done:

| # | Document | Action Required |
|---|---|---|
| 1 | `docs/knowledge/SYSTEM_KNOWLEDGE_GRAPH.md` | Add section for new domain (entities, layer placement, relationships to other domains) |
| 2 | `docs/knowledge/DOMAIN_REGISTER.md` | Add row: D-XX, domain name, authority doc reference, architectural layer |
| 3 | `docs/knowledge/RELATIONSHIP_MAP.md` | Document ALL cross-entity relationships the new domain introduces |
| 4 | `docs/00_authority/USE_CASE_REGISTER.md` | Register ALL use cases (UC-XXX) the domain serves — with domain, delivery mode, status |
| 5 | `docs/knowledge/ARCHITECTURAL_DEBT_REGISTER.md` | GATE CHECK — verify no blocking open debt for this domain. If blocked, STOP. |
| 6 | `docs/knowledge/DATA_DICTIONARY.md` | HARD GATE — register ALL entities with full field list, status, domain, relationships BEFORE code |

**Violation:** If any of steps 1–6 are skipped, the entity code MUST NOT be written. Register the governance artefacts FIRST.

---

## AFTER Entity/Engine Code Is Committed (Post-Code Chain)

Complete these in the SAME session (same branch, before push or within same PR):

| # | Document | Action Required |
|---|---|---|
| 7 | `docs/knowledge/REBASELINED_BUILD_SEQUENCE.md` | Add/update build unit. Mark status (READY → DONE). Update summary counts. |
| 8 | `DECISIONS.md` | Add DEC-{domain}-foundation decision record |
| 9 | `docs/00_authority/debt-register.md` | Log IMPACT debt: "Entities built. Pages NOT YET BUILT. UI debt items listed." |

---

## Page Build Completeness Rule

When building any new page (`apps/web/src/app/**/page.tsx`), the SAME commit MUST also:

1. Register the route in `apps/web/src/registry/routes.ts` (RouteEntry)
2. Add the nav item to `apps/web/src/registry/nav-groups.ts` (NavGroup subItem or new NavGroup)
3. Update `docs/00_authority/PAGE_SCHEDULE.md` (route + UC + status BUILT)

A page that exists on disk but is NOT in the nav registry is INVISIBLE to users and counts as incomplete work. Pages without nav wiring are governance debt.

---

## IMPACT Debt Registration Format

For every new domain where entities are built but pages are NOT yet built, add to `debt-register.md`:

```markdown
### IMPACT-{domain-id}: {Domain Name} — Pages Not Built

**Source:** {authority-doc} (Unit XX)
**Type:** IMPACT (post-build downstream debt)
**Severity:** MEDIUM (data layer complete, UI surface pending)
**Status:** OPEN
**Registered:** {date}

**What exists:** Entities, engines, DB schemas, seed fixtures, tests
**What's missing:** UI pages rendering entity data to users

**Specific page debt:**
- [ ] /route/path — UC-XXX — {description}
- [ ] /route/path — UC-XXX — {description}

**Resolution:** Build pages per PAGE_SCHEDULE when build unit is sequenced for UI pass.
```

---

## Checklist (Copy Into Commit Message on Governance Commits)

```
Chain completion:
- [ ] SYSTEM_KNOWLEDGE_GRAPH updated
- [ ] DOMAIN_REGISTER updated
- [ ] RELATIONSHIP_MAP updated
- [ ] USE_CASE_REGISTER updated
- [ ] ARCH-DEBT gate checked (no blockers)
- [ ] DATA_DICTIONARY updated (hard gate)
- [ ] BUILD_SEQUENCE updated
- [ ] DECISIONS.md updated
- [ ] debt-register.md IMPACT debt logged
```

---

## Why This Exists

Session 2026-06-08: Three authority documents (JI-1.0, AAI-1.0, IPI-1.0) were built end-to-end but chain links were missed (SYSTEM_KNOWLEDGE_GRAPH, RELATIONSHIP_MAP, USE_CASE_REGISTER for AAI/IPI, DATA_DICTIONARY for IPI, BUILD_SEQUENCE for IPI, debt-register IMPACT entries). This rule prevents that recurrence.

The chain is documented in `traceability-chain.md`. This rule makes it EXECUTABLE — not just documented.
