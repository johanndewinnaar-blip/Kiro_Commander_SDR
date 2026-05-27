# Requirements — Pre-Warned / Protected / Novel Classification

**Spec ID:** `39-pre-warned-protected-novel-classification`  
**Target version:** v1.2  
**Status:** Planned / Kiro-ready — v1.2 no-loss remediation  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.  
**Translated from baseline:** Spec #71 Pre-Warned/Protected/Novel Classification, Master Technical Specification §4 and §14

## Purpose

Classify every external attack landing as pre-warned, protected or novel using prior Commander posture knowledge and immutable audit evidence.

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

### Requirement 1 — Classification values

WHEN an External Attack Correlation case lands on the estate THE SYSTEM SHALL classify it as exactly one of PRE_WARNED, PROTECTED or NOVEL. [Source: Spec #71 §§2-3]

### Requirement 2 — Entity resolution

WHEN a SOC case references entities THE SYSTEM SHALL resolve affected users, devices or resources to canonical entities before posture assessment. [Source: Spec #71 §3.1]

### Requirement 3 — Inverse discovery pause

WHEN entity resolution fails THE SYSTEM SHALL fire the Inverse Discovery Loop and pause classification pending resolution. [Source: Spec #71 §3.1; Spec #72]

### Requirement 4 — Historical posture lookup

WHEN posture is assessed THE SYSTEM SHALL retrieve drift findings, coverage gaps, exposure findings and control state as of the SOC case open timestamp. [Source: Spec #71 §3.2]

### Requirement 5 — Pre-warned decision

WHEN active drift, coverage gap, exposure or known control weakness existed at case open time THE SYSTEM SHALL classify the attack as PRE_WARNED and bind the warning item. [Source: Spec #71 §3.3]

### Requirement 6 — Protected decision

WHEN no warning item existed and posture data was current THE SYSTEM SHALL classify the attack as PROTECTED. [Source: Spec #71 §3.3]

### Requirement 7 — Novel decision

WHEN posture data is stale or entity resolution is unresolved THE SYSTEM SHALL classify the attack as NOVEL until configured reclassification criteria are met. [Source: Spec #71 §3.3]

### Requirement 8 — Immutable audit record

WHEN classification occurs THE SYSTEM SHALL write an immutable audit record including Commander case, SOC case, entity IDs, result, posture snapshot, engine version, timestamp and reclassifications. [Source: Spec #71 §3.4]

### Requirement 9 — Priority integration

WHEN a classification is generated THE SYSTEM SHALL feed the priority engine and OODA Decide phase according to pre-warned, protected or novel semantics. [Source: Spec #71 §6]

### Requirement 10 — Operating picture rings

WHEN the External Operating Picture renders classification THE SYSTEM SHALL use the baseline visual semantics for pre-warned, protected, novel and defence-worked overlay. [Source: Spec #71 §7; Spec #65]

## Acceptance criteria

- Every requirement is traceable to a baseline source.
- No baseline capability in scope is silently dropped.
- Any baseline ambiguity is flagged in `DECISIONS.md` before implementation.
- No code implementation begins until Kiro validation passes.

## v1.2 Master Proposition §7 deliverables

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Pre-warned/protected attacks

WHEN an external attack lands THE SYSTEM SHALL identify whether it landed on pre-warned, protected or novel assets. [Source: Master Proposition §7; Spec #71]
