# Requirements — Universal Search

**Spec ID:** `42-universal-search`  
**Target version:** v1.2  
**Status:** Planned / Kiro-ready — v1.2 no-loss remediation  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.  
**Translated from baseline:** Master Proposition §12.8, Feature Registry feat.search.universal, Specification Register row #07 naming inconsistency decision

## Purpose

Preserve the Commander Universal Search capability despite the baseline register/file-name inconsistency around Spec #07.

## Scope in

- Preserve full baseline capability intent without implementation code.
- Translate baseline doctrine into Kiro-ready requirements, design and tasks.
- Use local-first mock/seed execution until Phase 2 approves real connectors or AWS evaluation.
- Emit audit, traceability and decision records for material state or governance changes.

## Scope out

- Application code generation.
- Live AWS resource creation.
- Real vendor API credentials or production integrations.
- n8n orchestration.
- Custom Kiro powers.

## User stories and EARS requirements

### Requirement 1 — Search capability

WHEN an operator searches Commander THE SYSTEM SHALL provide universal search across governed Commander entities, cases, signals, controls, exposures, identities, assets and reports subject to RBAC. [Source: Master Proposition §12.8; Feature Registry feat.search.universal]

### Requirement 2 — Tenant scope

WHEN universal search executes THE SYSTEM SHALL apply tenant scope and RBAC filtering before returning any result. [Source: Spec #10 §5; Feature Registry feat.search.universal]

### Requirement 3 — Canonical results

WHEN search results are returned THE SYSTEM SHALL resolve results to canonical Commander objects rather than raw vendor-only payloads. [Source: Master Proposition §12.7-§12.8]

### Requirement 4 — Auditability

WHEN sensitive search is performed THE SYSTEM SHALL emit audit events where required by persona, authority overlay or Internal Risk access rules. [Source: Spec #19; Spec #75]

### Requirement 5 — Register inconsistency

WHEN Spec #07 is referenced for Universal Search THE SYSTEM SHALL flag the baseline inconsistency and preserve both Universal Search and Drift/Rule Engine coverage rather than choosing one silently. [Source: Specification Register #07; Spec #07 file content]

## Acceptance criteria

- Every requirement is traceable to a baseline source.
- No baseline capability in scope is silently dropped.
- Any baseline ambiguity is flagged in `DECISIONS.md` before implementation.
- No code implementation begins until Kiro validation passes.

## v1.2 Master Proposition §7 deliverables

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Universal search

WHEN a user needs cross-domain discovery THE SYSTEM SHALL provide universal search across authorised Commander objects. [Source: Master Proposition §7; §12.8]
