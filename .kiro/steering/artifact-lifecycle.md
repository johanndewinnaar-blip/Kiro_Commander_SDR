---
inclusion: always
name: artifact-lifecycle
description: Artifact lifecycle policy — retirement, supersession, and archival procedures.
---

# Artifact Lifecycle Policy — Commander SDR

**Purpose:** Defines how governance artifacts transition between states and how superseded documents are retired.

## States

| State | Meaning |
|---|---|
| ACTIVE | Current authority, referenced by chain |
| SUPERSEDED | Replaced by newer version — moved to _superseded/ with pointer |
| ARCHIVED | Retained for lineage (immutable, docs/99_source_archive/) |
| RETIRED | No longer referenced, decision recorded |

## Retirement Procedure

1. Record decision in DECISIONS.md (DEC-retire-{name})
2. Add "SUPERSEDED" header with pointer to replacement document
3. Move to _superseded/ subdirectory of its parent folder
4. Remove from any active index files
5. Update GOVERNANCE_KNOWLEDGE_SOURCE.md if listed

## Rules

- Never delete — retire and move
- Always record the decision in DECISIONS.md
- Always point to the replacement
- Immutable archive files (docs/99_source_archive/) are NEVER moved or modified
- Steering files that are superseded: add `inclusion: never` to frontmatter before moving

## Trigger Conditions

A document should be retired when:
- A newer document explicitly replaces it (e.g. REBASELINED_BUILD_SEQUENCE replaces BUILD_SEQUENCE)
- The document's subject is no longer relevant to the current build phase
- The document's authority has been fully absorbed into another document
- Owner decision (DEC-retire-*) declares retirement
