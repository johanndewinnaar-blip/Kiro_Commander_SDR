# Requirements — Rule, Model and Decision Governance Surface

**Spec ID:** `36-rule-model-decision-governance-surface`  
**Target version:** v1.2  
**Status:** Planned / Kiro-ready — v1.2 no-loss remediation  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.  
**Translated from baseline:** Spec #51 Rule/Model/Decision Governance Surface, Spec #07 Drift and Rule Engine

## Purpose

Make rule engine management, model management, simulation, versioning, rollback and decision explainability first-class governed surfaces.

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

### Requirement 1 — No black box decisions

WHEN Commander makes an important automated decision THE SYSTEM SHALL expose decision rationale rather than treating the decision as an unexplained black box. [Source: Spec #51 Binding Doctrine]

### Requirement 2 — Operational explainability

WHEN an operational user opens a case or surface impacted by rules THE SYSTEM SHALL expose rule hits, decision rationale and evidence references appropriate to RBAC. [Source: Spec #51 Operational App]

### Requirement 3 — Tenant Admin rule surfaces

WHEN Tenant Admin manages rules THE SYSTEM SHALL provide governed surfaces for rule overview, packs, simulation, versioning, drift, exposure, vulnerability, identity, control, coverage, P0, validation, closure, reopening, suppression and rule audit. [Source: Spec #51 Tenant Admin]

### Requirement 4 — Commercial rule pack governance

WHEN product rule packs or baseline templates are governed THE SYSTEM SHALL keep ownership in the Commercial Control Plane. [Source: Spec #51 Commercial Control Plane]

### Requirement 5 — Model configuration

WHEN tenant-level models are configured THE SYSTEM SHALL support risk, prioritisation, routing, SLA, validation, closure, reopening, P0, Fusion Map, mission impact, source confidence and freshness models. [Source: Spec #51 Model Management]

### Requirement 6 — Decision rationale schema

WHEN an automated decision is recorded THE SYSTEM SHALL include decision_id, decision_type, affected objects, rule/model IDs, evidence refs, source freshness, confidence, prior/new state, effects and audit_event_id. [Source: Spec #51 Decision Explainability]

### Requirement 7 — Simulation blast radius

WHEN a rule or model is simulated THE SYSTEM SHALL compare current versus proposed impact across cases, P0, SLA, routing, closure gates, missions, tenant blast radius and rollback readiness. [Source: Spec #51 Simulation]

### Requirement 8 — Versioning fields

WHEN a rule or model version is managed THE SYSTEM SHALL track active, draft, previous, effective date, author, approver, rationale, simulation report, rollback state and tenant allocation. [Source: Spec #51 Versioning]

## Acceptance criteria

- Every requirement is traceable to a baseline source.
- No baseline capability in scope is silently dropped.
- Any baseline ambiguity is flagged in `DECISIONS.md` before implementation.
- No code implementation begins until Kiro validation passes.

## v1.2 Master Proposition §7 deliverables

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Rule generation surface

WHEN SIEM/SOAR rule guidance is generated THE SYSTEM SHALL present it as governed detection specification and explainability output, not uncontrolled SOC write. [Source: Master Proposition §7; §16]

## v1.2 detection model lifecycle model

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Detection model lifecycle

WHEN a detection model lifecycle is managed THE SYSTEM SHALL support authoring, testing, promotion, operation, tuning and retirement. [Source: Master Technical Specification §13.3]

## v1.3.1 lineage closure requirements

### Detection Model Authoring

WHEN a detection model is authored via the Rule Builder THE SYSTEM SHALL apply rule schema validation, simulation and reviewer approval before deployment. [Source: Master Technical Specification §13.3]

### Detection Model Tuning

WHEN a detection model is tuned THE SYSTEM SHALL preserve model lineage and version, and audit the tuning change. [Source: Master Technical Specification §13.3]

### Detection Model Retirement

WHEN a detection model is retired THE SYSTEM SHALL preserve historical findings lineage and gate retirement against active dependencies. [Source: Master Technical Specification §13.3]

### Detection Model Lifecycle Explainability

WHEN a detection model passes through its lifecycle THE SYSTEM SHALL maintain explainability and rollback capability across every state transition. [Source: Master Technical Specification §13.3; Spec #51]

