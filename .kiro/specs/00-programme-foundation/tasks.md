# Tasks — Programme Foundation

**Spec ID:** `00-programme-foundation`  
**Target version:** v1.2

> Do not execute code-generating tasks until the owner validates the pack.

## 1. Validation tasks

- [x] 1.1 Read `AGENTS.md` and `docs/00_authority/AUTHORITY_MODEL.md`.
- [x] 1.2 Identify source baseline documents governing this domain.
- [x] 1.3 Confirm scope-in and scope-out with the owning build pack.
- [x] 1.4 Confirm no live AWS, real connector, production billing or n8n dependency is introduced.

## 2. Planning tasks

- [x] 2.1 Map domain routes, pages, panels or APIs to future folders: `docs/00_authority`.
- [x] 2.2 Define seed/mock data needed for local-first development.
- [x] 2.3 Define canonical entities touched by this domain.
- [x] 2.4 Define audit events and Commander AI grounding rules where applicable.
- [x] 2.5 Define tests required for this domain.

## 3. Future implementation tasks — blocked until validation

- [x] 3.1 Create implementation files only after owner approval. **[Test infrastructure and 5 validation tests created]**
- [x] 3.2 Add tests before or with implementation. **[36/36 tests passing via Vitest]**
- [x] 3.3 Update route registry, feature flags and build status. **[No routes/flags for this domain; BP-00 and spec status updated to Validated]**
- [x] 3.4 Update `DECISIONS.md` for material decisions.
- [x] 3.5 Run acceptance checks and produce review notes.

## 4. Completion gate

- [x] 4.1 This spec has matching build-pack coverage.
- [x] 4.2 Source authority remains traceable.
- [x] 4.3 Tests are defined and executable locally when code exists.
- [x] 4.4 Any Phase 2 or Phase 3 activity remains blocked unless separately approved.
