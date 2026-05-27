# Requirements — Inverse Discovery Loop

**Spec ID:** `40-inverse-discovery-loop`  
**Target version:** v1.2  
**Status:** Planned / Kiro-ready — v1.2 no-loss remediation  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.  
**Translated from baseline:** Spec #72 Inverse Discovery Loop, Master Technical Specification §3.3

## Purpose

Treat lookup failure and unknown external signal references as findings that create Coverage Blindspot cases and improve estate inventory honesty over time.

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

### Requirement 1 — Lookup failure trigger

WHEN a normalisation or external signal lookup cannot resolve an entity THE SYSTEM SHALL trigger the Inverse Discovery Loop rather than silently dropping the signal. [Source: Spec #72 §3.1; Master Technical Specification §3.3]

### Requirement 2 — Secondary resolution

WHEN inverse discovery triggers THE SYSTEM SHALL attempt secondary resolution using fuzzy match, identifier translation and recent change checks. [Source: Spec #72 §3.2]

### Requirement 3 — Coverage Blindspot case

WHEN secondary resolution fails THE SYSTEM SHALL generate an Inverse Discovery Coverage Blindspot case. [Source: Spec #72 §3.3]

### Requirement 4 — Root cause classification

WHEN a Coverage Blindspot case is generated THE SYSTEM SHALL classify root cause as discovery gap, staleness, shadow IT or naming mismatch where evidence permits. [Source: Spec #72 §3.3; Master Technical Specification §3.3]

### Requirement 5 — Routing

WHEN a Coverage Blindspot case is routed THE SYSTEM SHALL route it to the platform or architecture team using registry-driven routing. [Source: Spec #72 §3.4; Master Technical Specification §3.3]

### Requirement 6 — Entity onboarding driver

WHEN a blindspot is confirmed THE SYSTEM SHALL drive canonical entity onboarding or connector tuning rather than treating the event as noise. [Source: Spec #72 §§3.5,5]

### Requirement 7 — Pre-warned relationship

WHEN inverse discovery intersects with external attack classification THE SYSTEM SHALL preserve the relationship with Pre-Warned/Protected/Novel classification. [Source: Spec #72 §10; Spec #71]

### Requirement 8 — Audit events

WHEN inverse discovery triggers, resolves, routes or closes THE SYSTEM SHALL emit the baseline inverse-discovery audit events. [Source: Spec #72 §9]

## Acceptance criteria

- Every requirement is traceable to a baseline source.
- No baseline capability in scope is silently dropped.
- Any baseline ambiguity is flagged in `DECISIONS.md` before implementation.
- No code implementation begins until Kiro validation passes.