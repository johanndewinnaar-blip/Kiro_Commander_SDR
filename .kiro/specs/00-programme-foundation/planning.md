# Planning — Programme Foundation

**Spec ID:** `00-programme-foundation`  
**Target version:** v1.3.1  
**Status:** Planning complete  
**Source authority:** Commander SDR baseline v2.6.2; BP-00; Spec #01, #18, #56

## Task 2.1 — Domain Routes, Pages, Panels and APIs

This domain does not own user-facing routes or UI pages. It governs the **authority layer** that all other domains read before execution.

### Artefacts governed by this domain (mapped to `docs/00_authority/`)

| Artefact | Path | Purpose |
|----------|------|---------|
| Authority Model | `docs/00_authority/AUTHORITY_MODEL.md` | Kiro execution precedence stack |
| Authority & Precedence (source) | `docs/00_authority/source_00_AUTHORITY_AND_PRECEDENCE_v2_6.md` | v2.6 baseline authority hierarchy |
| Specification Register (source) | `docs/00_authority/source_00_SPECIFICATION_REGISTER_v2_6.md` | Inventory of all binding specs |
| Baseline Manifest (source) | `docs/00_authority/source_CURRENT_BASELINE_MANIFEST_v2_6.md` | File inventory of the baseline |
| AGENTS (source) | `docs/00_authority/source_AGENTS_v2_6_2.md` | Agent rules and doctrinal constraints |
| Feature Registry (source) | `docs/00_authority/source_SDR_Feature_Registry_FR001_v1_0.md` | Feature presence and flags |
| Memory (source) | `docs/00_authority/source_MEMORY_v2_6_1.md` | Context shortcut (non-authoritative) |
| Glossary | `docs/00_authority/GLOSSARY.md` | Canonical terminology |
| Spec Coverage Matrix | `docs/00_authority/SPEC_COVERAGE_MATRIX.md` | Spec-to-build-pack mapping |
| Conversion Plan | `docs/00_authority/CONVERSION_PLAN.md` | Baseline-to-Kiro conversion plan |
| Conversion Findings | `docs/00_authority/CONVERSION_FINDINGS.md` | Issues found during conversion |
| v1.2 Completeness Audit | `docs/00_authority/V1_2_COMPLETENESS_AUDIT.md` | Audit of v1.2 pack completeness |
| Index | `docs/00_authority/INDEX.md` | This folder's index |

### Root programme controls governed by this domain

| Artefact | Path | Purpose |
|----------|------|---------|
| AGENTS.md | `AGENTS.md` | Prime directive and hard stops |
| BUILD_SEQUENCE.md | `BUILD_SEQUENCE.md` | Ordered build execution plan |
| BUILD_VERSION_ROADMAP.md | `BUILD_VERSION_ROADMAP.md` | Version-staged commitment model |
| CHANGE_CONTROL.md | `CHANGE_CONTROL.md` | Change classification and tracking |
| DECISIONS.md | `DECISIONS.md` | Material decision log |

### Future API surface (blocked until validation)

No APIs are defined for this domain. Authority is consumed as file reads, not API calls.

---

## Task 2.2 — Seed/Mock Data for Local-First Development

This domain does not consume runtime data. It consumes **source documents** as its "data."

| Data type | Source | Mock/seed approach |
|-----------|--------|-------------------|
| Authority documents | `docs/00_authority/` | Already present as markdown files — no mock needed |
| Baseline source archive | `docs/99_source_archive/` | Already present — immutable reference |
| Build packs | `docs/04_build_packs/` | Already present — derived from specs |
| Steering files | `.kiro/steering/` | Already present — active guidance |
| Spec files | `.kiro/specs/` | Already present — execution specs |

**Conclusion:** No synthetic data fixtures are required for this domain. The domain's "data" is the document set itself.

---

## Task 2.3 — Canonical Entities Touched by This Domain

This domain does not directly create or mutate canonical entities. It **defines the governance rules** that other domains must follow when creating entities.

Entities whose governance rules are defined here:

| Entity | Governance rule from this domain |
|--------|--------------------------------|
| All entities | Must be created under authority read order (Req 1, Domain Req 1) |
| All entities | Must attach tenant context (v1.3 Req 11) |
| Case | Must follow closed-loop lifecycle (v1.3 Req 13) |
| Case | Must use routing engine for ownership (v1.3 Req 14) |
| Audit Event | Must be emitted for material decisions (v1.3 Req 15, Req 4) |
| Commander AI Execution Record | Must be grounded in Commander data (Req 5, v1.3 Req 12) |
| Route/Page | Must be registry-driven (v1.3 Req 7, 8, 9) |
| All entities | Frontend visibility is not security (v1.3 Req 10) |

---

## Task 2.4 — Audit Events and Commander AI Grounding Rules

### Audit events for this domain

| Event | Trigger | Payload |
|-------|---------|---------|
| `authority.read_order.executed` | Agent starts work | Agent ID, timestamp, documents read, authority tier used |
| `authority.conflict.detected` | Two sources conflict | Conflicting sources, resolution applied, precedence rule cited |
| `authority.baseline_gap.flagged` | Scope item has no baseline authority | Item description, [BASELINE GAP] marker, owner notification |
| `authority.decision.recorded` | Material decision made | Decision ID, rationale, authority cited, timestamp |
| `authority.validation.refused` | Code generation requested before validation | Request description, refusal reason, hard stop cited |

### Commander AI grounding rules for this domain

Commander AI in this domain may:
- Explain authority precedence and conflict resolution
- Summarise baseline document content
- Recommend which authority source applies to a given question
- Draft decision records for owner review

Commander AI in this domain must NOT:
- Override baseline authority with generated output
- Invent product doctrine not present in the baseline
- Execute external writes without explicit approval
- Determine lifecycle state (deterministic system decisions only)

---

## Task 2.5 — Tests Required for This Domain

| Test category | What it validates | Location |
|---------------|-------------------|----------|
| Authority read-order test | Agent reads documents in correct precedence order | `tests/00-programme-foundation/` |
| Baseline conflict resolution test | Higher-precedence source wins; conflict is recorded | `tests/00-programme-foundation/` |
| No-code-before-validation test | Code generation is refused when pack is unvalidated | `tests/00-programme-foundation/` |
| Scope-out enforcement test | Live AWS, real connectors, billing, n8n are blocked | `tests/00-programme-foundation/` |
| Baseline immutability test | Source archive files are not modified | `tests/00-programme-foundation/` |
| Audit event emission test | Material decisions emit audit records | `tests/00-programme-foundation/` |
| Tenant context test | Cross-tenant ambiguity is rejected | `tests/00-programme-foundation/` |
| Shell-not-inventory test | Shell omission does not remove committed features | `tests/00-programme-foundation/` |
| Registry-driven runtime test | Routes derive from registry, not shell HTML | `tests/00-programme-foundation/` |

**Note:** These tests are defined but not implemented. Implementation is blocked until pack validation is approved by the owner.

---

## Completion summary

All planning tasks (2.1–2.5) are complete. No application code has been generated. No live resources have been created. All outputs are traceable to source authority.
