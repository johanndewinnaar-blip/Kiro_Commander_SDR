---
inclusion: always
---

# Traceability Chain Enforcement — Commander SDR

**Purpose:** Every build artefact must trace through the knowledge graph chain. Enforced on every commit — not audited after the fact.

**Authority:** This steering rule is binding on all future builds. Existing artefacts built before this rule carry traceability debt (tracked in TRACEABILITY_DEBT.md) and are exempt from rejection until triaged.

## The Chain (mandatory linkage)

Knowledge Graph Domain → Use Case → Entity → Engine (if applicable) → Page

Every new artefact must link BACK through this chain to a knowledge graph domain.

## Rules

### Rule 1 — New Page

Before building any new page:
- A use case MUST exist in USE_CASE_REGISTER.md that the page serves
- That use case MUST map to a knowledge graph domain in SYSTEM_KNOWLEDGE_GRAPH.md
- The backing entity MUST be listed in DATA_DICTIONARY.md
- PAGE_SCHEDULE.md MUST be updated with the route + use case reference

### Rule 2 — New Entity

Before creating any new entity:
- It MUST serve at least one registered use case (UC-XXX)
- It MUST map to a knowledge graph domain
- If the domain does not exist in SYSTEM_KNOWLEDGE_GRAPH.md, add it FIRST
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
| 2 | DOMAIN_REGISTER.md | Domain index (40 domains) | docs/knowledge/ |
| 3 | RELATIONSHIP_MAP.md | Cross-domain entity relationships | docs/knowledge/ |
| 4 | USE_CASE_REGISTER.md | What users DO — mapped to domains | docs/00_authority/ |
| 5 | DATA_DICTIONARY.md | What data supports it — entity registry | docs/knowledge/ |
| 6 | REBASELINED_BUILD_SEQUENCE.md | Build order — units mapped to entities/engines | docs/knowledge/ |
| 7 | PAGE_SCHEDULE.md | What surfaces expose it — pages mapped to use cases | docs/00_authority/ |

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
4. THEN build the artefact

This ensures the chain is never broken going forward.
