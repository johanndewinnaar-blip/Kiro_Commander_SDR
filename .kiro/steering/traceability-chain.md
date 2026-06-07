---
inclusion: always
---

# Traceability Chain Enforcement — Commander SDR

**Purpose:** Every build artefact must trace through the knowledge graph chain. Enforced on every commit — not audited after the fact.

**Authority:** This steering rule is binding on all future builds. Existing artefacts built before this rule carry traceability debt (tracked in TRACEABILITY_DEBT.md) and are exempt from rejection until triaged.

## The Chain (complete, in order)

```
Baseline Source Specs (75 child specs — ultimate authority)
  ↓
SYSTEM_KNOWLEDGE_GRAPH.md (what Commander IS — domains, layers, relationships)
  ↓
DOMAIN_REGISTER.md (46+ domains indexed)
  ↓
RELATIONSHIP_MAP.md (cross-domain flows — drives cross-entity rendering on pages)
  ↓
USE_CASE_REGISTER.md (what users DO — UC-XXX, mapped to domains)
  ↓
ARCHITECTURAL_DEBT_REGISTER.md [GATE — blocks if open ARCH-DEBT exists for this entity/domain]
  ↓
DATA_DICTIONARY.md [HARD GATE — entity fully registered before code]
  ↓
Entity code (packages/contracts/src/entities/)
  ↓
Engine code (packages/contracts/src/engines/)
  ↓
Page code (apps/web/src/app/) — renders ALL entity fields relevant to use case
  + cross-entity relationships from RELATIONSHIP_MAP
  ↓
PAGE_SCHEDULE.md (route registered, UC linked, status BUILT)
  ↓
AICAP_REGISTER.md (AI enhancement markers catalogued — Phase 2+)
```

Every new artefact must link BACK through this chain to a knowledge graph domain.

## Parallel Authorities

- **DECISIONS.md** — design decisions, authority overrides
- **REBASELINED_BUILD_SEQUENCE.md** — build order, sequencing control

## Gate Rules

### RELATIONSHIP_MAP Gate

Before building any page that shows data from multiple entities:
- The cross-entity relationship MUST be documented in RELATIONSHIP_MAP.md
- The page MUST render drill paths / linked-data panels for documented relationships
- If a relationship is not yet documented, add it to RELATIONSHIP_MAP.md FIRST

### ARCH-DEBT Gate

Before any entity/engine can proceed from DATA_DICTIONARY to code:
- Check ARCHITECTURAL_DEBT_REGISTER.md for open debt against this entity/domain
- If open debt exists: **BLOCKED** until resolved
- Self-resolving debt (the debt the entity exists to close) does NOT self-block
- Record the check in the unit closure review

### DATA_DICTIONARY Hard Gate

Before creating any entity code file:
- Entity MUST be registered with: status, all fields, owning domain, use cases, relationships, architectural layer
- **Violation of this gate results in commit rejection**

Before creating any page:
- DATA_DICTIONARY entry must list ALL fields the page will render
- If fields are missing from the dictionary, add them FIRST

## Rules

### Rule 1 — New Page

Before building any new page:
- A use case MUST exist in USE_CASE_REGISTER.md that the page serves
- That use case MUST map to a knowledge graph domain in SYSTEM_KNOWLEDGE_GRAPH.md
- The backing entity MUST be listed in DATA_DICTIONARY.md
- The DATA_DICTIONARY entry for the backing entity must list ALL fields the page will render
- Cross-entity data must be documented in RELATIONSHIP_MAP.md
- PAGE_SCHEDULE.md MUST be updated with the route + use case reference

### Rule 2 — New Entity

Before creating any entity code file:
- It MUST serve at least one registered use case (UC-XXX)
- It MUST map to a knowledge graph domain
- If the domain does not exist in SYSTEM_KNOWLEDGE_GRAPH.md, add it FIRST
- **ARCH-DEBT Gate**: Check for blocking debt — if open, STOP
- **DATA_DICTIONARY Hard Gate**: Entity fully registered before code
- DATA_DICTIONARY.md MUST be updated on creation

### Rule 3 — New Use Case

Before registering a new use case:
- It MUST trace to a knowledge graph domain
- If it implies a new domain, update SYSTEM_KNOWLEDGE_GRAPH.md FIRST
- USE_CASE_REGISTER.md MUST contain: UC ID, description, actor, domain, page route, entity, delivery mode (SYSTEM/AI-ENHANCED)

### Rule 4 — New Engine

Before creating any engine:
- It MUST consume at least one existing entity
- It MUST serve at least one registered use case
- It MUST belong to an identified architectural layer (1-7 per SYSTEM_KNOWLEDGE_GRAPH.md §2)
- REBASELINED_BUILD_SEQUENCE.md MUST have a unit for it
- **ARCH-DEBT Gate** applies

### Rule 5 — Commit Message Format

Every commit that adds a new page, entity, or engine MUST include:
- UC-XXX reference (use case ID)
- Knowledge graph domain reference

Format: "feat(domain-name): description — UC-XXX"

Example: "feat(vulnerability): KEV sub-page — UC-033"

### Rule 6 — Exemptions

- Governance-only commits (docs updates, steering, debt register) are exempt
- Refactoring existing code (no new artefacts) is exempt
- Artefacts built BEFORE this rule carry debt tracked in TRACEABILITY_DEBT.md — they are NOT retroactively rejected, but MUST be linked during the traceability debt resolution pass

## Governance Documents (the chain, in authority order)

| # | Document | Role | Location |
|---|---|---|---|
| 1 | SYSTEM_KNOWLEDGE_GRAPH.md | What Commander IS — domains, layers, relationships | docs/knowledge/ |
| 2 | DOMAIN_REGISTER.md | Domain index (46+ domains) | docs/knowledge/ |
| 3 | RELATIONSHIP_MAP.md | Cross-domain entity relationships | docs/knowledge/ |
| 4 | USE_CASE_REGISTER.md | What users DO — mapped to domains | docs/00_authority/ |
| 5 | ARCHITECTURAL_DEBT_REGISTER.md | Open structural/governance debt — GATE | docs/knowledge/ |
| 6 | DATA_DICTIONARY.md | What data supports it — entity registry — HARD GATE | docs/knowledge/ |
| 7 | REBASELINED_BUILD_SEQUENCE.md | Build order — units mapped to entities/engines | docs/knowledge/ |
| 8 | PAGE_SCHEDULE.md | What surfaces expose it — pages mapped to use cases | docs/00_authority/ |
| 9 | AICAP_REGISTER.md | AI enhancement markers — Phase 2+ | docs/00_authority/ (USE_CASE_REGISTER §AICAP) |

## Chain Maintenance Rules (prevent staleness)

These rules ensure governance documents stay synchronized with code. Failure to update in the same commit = governance debt (tracked in ARCHITECTURAL_DEBT_REGISTER.md).

### Same-commit enforcement

| Document | Trigger | Rule |
|----------|---------|------|
| SYSTEM_KNOWLEDGE_GRAPH.md | New entity introduces a new domain or cross-domain relationship | MUST be updated in the SAME commit |
| DOMAIN_REGISTER.md | New domain added to SYSTEM_KNOWLEDGE_GRAPH | MUST be updated in the SAME commit |
| RELATIONSHIP_MAP.md | New entity creates a cross-entity relationship not already documented | MUST be updated in the SAME commit |
| PAGE_SCHEDULE.md | New page.tsx created | MUST be updated in the SAME commit |
| AICAP_REGISTER.md | New page.tsx includes an AI-PLACEMENT marker | MUST be updated in the SAME commit |

### Pre-code gates (unchanged — restated for completeness)

| Document | Trigger | Rule |
|----------|---------|------|
| DATA_DICTIONARY.md | Before entity code is written | MUST be updated BEFORE entity code (hard gate) |
| USE_CASE_REGISTER.md | Before entity/page code is written | MUST be updated BEFORE code |

### Governance debt on violation

If a commit lands without the required same-commit update:
1. The omission is logged as governance debt in ARCHITECTURAL_DEBT_REGISTER.md
2. The next commit to the same file MUST include the missing update
3. The debt is not retroactively blocking — it does not require a revert

## Validation (pre-commit enforcement)

On every commit that touches:
- packages/contracts/src/entities/ (new entity)
- packages/contracts/src/engines/ (new engine)
- apps/web/src/app/**/page.tsx (new page)

The pre-commit hook SHALL:
1. Check commit message contains UC-XXX pattern
2. Verify UC-XXX exists in docs/00_authority/USE_CASE_REGISTER.md
3. If validation fails: reject with message "TRACEABILITY CHAIN: commit must reference a registered use case (UC-XXX). Register the use case first."

## Chain Breaks (how to handle)

If you discover a needed page/entity but no use case exists:
1. STOP — do not build the artefact
2. Register the use case in USE_CASE_REGISTER.md (with domain mapping)
3. If the domain is new, update SYSTEM_KNOWLEDGE_GRAPH.md
4. Check ARCH-DEBT gate
5. Register in DATA_DICTIONARY (hard gate)
6. THEN build the artefact

This ensures the chain is never broken going forward.
