# Requirements — Drift and Rule Engine

**Spec ID:** `34-drift-and-rule-engine`  
**Target version:** v1.2  
**Status:** Planned / Kiro-ready — v1.2 no-loss remediation  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.  
**Translated from baseline:** Spec #07 Drift and Rule Engine, Master Technical Specification §4

## Purpose

Own the deterministic rule engine, drift detection model framework, YAML rule format, rule lifecycle, finding generation and safe finding-to-case handoff.

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

### Requirement 1 — YAML rule format

WHEN a Phase 0 rule is authored THE SYSTEM SHALL use the baseline YAML declarative rule format as the binding rule source format. [Source: Spec #07 §§1,5]

### Requirement 2 — Rule lifecycle

WHEN a rule progresses through its lifecycle THE SYSTEM SHALL preserve the authored to validated to loaded to evaluated to traced to suppressed to promoted to finding-or-case conversion pathway. [Source: Spec #07 §§4,8,12]

### Requirement 3 — Active-only execution

WHEN production evaluation runs THE SYSTEM SHALL execute only rules in ACTIVE state after validation, test data results and approval. [Source: Spec #07 §4]

### Requirement 4 — Canonical-only evaluation

WHEN a rule evaluates posture state THE SYSTEM SHALL evaluate canonical entities and canonical relationships rather than vendor raw payloads. [Source: Spec #07 §3]

### Requirement 5 — Tenant-safe context

WHEN an evaluation context is built THE SYSTEM SHALL include tenant filtering and SHALL NOT include cross-tenant data. [Source: Spec #07 §§7,18]

### Requirement 6 — Supported operators

WHEN a rule condition is evaluated THE SYSTEM SHALL use only the supported Phase 0 operators and SHALL reject arbitrary code execution. [Source: Spec #07 §§6,18]

### Requirement 7 — Finding model

WHEN a rule produces a finding THE SYSTEM SHALL include finding_id, tenant_id, rule_id, rule_version, affected entities, condition snapshot, severity, confidence, proposed actions, dedupe key and status. [Source: Spec #07 §9]

### Requirement 8 — Suppression and dedupe

WHEN a material condition repeats THE SYSTEM SHALL suppress duplicate open findings using tenant, rule, entity and material condition hash. [Source: Spec #07 §10]

### Requirement 9 — Initial rule library

WHEN Phase 0 drift rules are seeded THE SYSTEM SHALL include the ten initial rule categories named in Spec #07. [Source: Spec #07 §11]

### Requirement 10 — Safe proposed actions

WHEN a rule proposes an action THE SYSTEM SHALL propose only allowed action types and SHALL NOT execute push. [Source: Spec #07 §13]

### Requirement 11 — Rule validation

WHEN a rule is submitted for activation THE SYSTEM SHALL validate YAML parse, required fields, unique rule ID, version, allowed operators, schema fields, action type, case type and tenant safety. [Source: Spec #07 §14]

### Requirement 12 — Rule health telemetry

WHEN rule execution starts, completes, fails or times out THE SYSTEM SHALL emit rule-health telemetry events. [Source: Spec #07 §15]

### Requirement 13 — 240-model framework preservation

WHEN the drift detection capability is planned THE SYSTEM SHALL preserve the target drift detection engine framework of approximately 240 models across 13 domains while staging Phase 0 with an initial rule set. [Source: Master Technical Specification §4; Spec #07 §2.2]

### Requirement 14 — Simulation/version/rollback

WHEN a rule or model changes THE SYSTEM SHALL support simulation, versioning and rollback planning before activation. [Source: Spec #51 §§Simulation, Versioning]

## Acceptance criteria

- Every requirement is traceable to a baseline source.
- No baseline capability in scope is silently dropped.
- Any baseline ambiguity is flagged in `DECISIONS.md` before implementation.
- No code implementation begins until Kiro validation passes.

## v1.2 master inventory enumeration — ten analytical engines

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Drift detection engine

WHEN analytical processing requires the Drift detection engine THE SYSTEM SHALL detect drift across approximately 240 models and 13 domains. [Source: Master Technical Specification §4]

### v1.2 Requirement 2 — Risk scoring engine

WHEN analytical processing requires the Risk scoring engine THE SYSTEM SHALL compute risk scores from canonical evidence. [Source: Master Technical Specification §4]

### v1.2 Requirement 3 — Blast radius engine

WHEN analytical processing requires the Blast radius engine THE SYSTEM SHALL compute affected estate and dependency spread. [Source: Master Technical Specification §4]

### v1.2 Requirement 4 — Architecture intelligence engine

WHEN analytical processing requires the Architecture intelligence engine THE SYSTEM SHALL evaluate architecture relationships and drift. [Source: Master Technical Specification §4]

### v1.2 Requirement 5 — Identity chain computation engine

WHEN analytical processing requires the Identity chain computation engine THE SYSTEM SHALL compute identity access chains and privilege pathways. [Source: Master Technical Specification §4]

### v1.2 Requirement 6 — Behavioural anomaly detection engine

WHEN analytical processing requires the Behavioural anomaly detection engine THE SYSTEM SHALL surface behavioural deviations within configured governance boundaries. [Source: Master Technical Specification §4]

### v1.2 Requirement 7 — Attack path likelihood engine

WHEN analytical processing requires the Attack path likelihood engine THE SYSTEM SHALL compute likelihood of exploitable attack paths. [Source: Master Technical Specification §4]

### v1.2 Requirement 8 — BAS integration engine

WHEN analytical processing requires the BAS integration engine THE SYSTEM SHALL support Phase 2 BAS integration as a staged capability. [Source: Master Technical Specification §4]

### v1.2 Requirement 9 — Pre-Warned Classification Engine

WHEN analytical processing requires the Pre-Warned Classification Engine THE SYSTEM SHALL classify External Attack Correlation cases as pre-warned, protected or novel. [Source: Master Technical Specification §4]

### v1.2 Requirement 10 — Threat Relevance Scoring

WHEN analytical processing requires the Threat Relevance Scoring THE SYSTEM SHALL score threat relevance against estate context. [Source: Master Technical Specification §4]

## v1.2 Master Proposition §7 deliverables

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Attack path likelihood

WHEN analytical engines evaluate risk THE SYSTEM SHALL compute attack path likelihood where available or mark the result as not yet computed. [Source: Master Proposition §7; Master Technical Specification §4]
