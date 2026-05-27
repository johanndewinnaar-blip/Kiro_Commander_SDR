# Requirements — Phase 3 Pilot and Production Hardening

**Spec ID:** `30-phase3-pilot-production-hardening`  
**Target version:** v2.0  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #16 Performance/Scaling, Spec #31 Routing Model and Team Affinity, Spec #44 P0 War Room UI, Spec #55 Baseline Configuration Framework, Spec #61 Universal Security Signal Connector Contract, Spec #73 Silent Defence Reporting
**v1.3 depth:** full content-depth translation applied to this spec during v1.3 remediation.

## Purpose

Pilot readiness, hardening, observability, support, deployment and production controls.

## Scope in

- Provide a versioned implementation plan for Phase 3 Pilot and Production Hardening.
- Preserve Commander authority and no-MVP doctrine.
- Support local-first development.
- Align with AWS target architecture where relevant.
- Use seed/mock data until Phase 2 approves real connectors.
- Keep Commander AI present where the user journey requires assistance, explanation, drafting or prioritisation.

## Scope out

- Live AWS resource creation.
- Real vendor API credentials or production integrations.
- Production billing.
- n8n orchestration.
- Custom Kiro powers during initial conversion.
- Any behaviour that violates SOC or Insider Risk boundaries.

## User stories and EARS requirements

### Requirement 1 — Authority compliance

WHEN Kiro works on this domain  
THE SYSTEM SHALL read Commander authority, relevant Kiro steering, this spec and its owning build pack before proposing changes.

### Requirement 2 — Build visibility

WHEN this domain is not fully implemented  
THE SYSTEM SHALL still represent committed routes, pages, panels or data objects as scaffold, build or stub states rather than omitting them.

### Requirement 3 — Mock-first data

WHEN data is needed before Phase 2 real connector approval  
THE SYSTEM SHALL use seed/mock fixtures that preserve the canonical entity shape and avoid real customer secrets or vendor credentials.

### Requirement 4 — Auditability

WHEN this domain creates, changes, closes, suppresses, routes, scores, recommends or drafts anything material  
THE SYSTEM SHALL emit an auditable record design and define review points.

### Requirement 5 — Commander AI grounding

WHEN Commander AI is used in this domain  
THE SYSTEM SHALL ground outputs in available Commander data, label uncertainty, and avoid external writes without explicit approval.

### Requirement 6 — AWS alignment

WHEN this domain has backend, runtime, storage, queueing, AI or deployment implications  
THE SYSTEM SHALL record the local-first behaviour and the future AWS-aligned option without provisioning infrastructure.

## Domain requirements translated from baseline

### Domain Requirement 1 — Baseline rule

WHEN Phase 3 pilot planning starts THE SYSTEM SHALL require Phase 2 connector, security, tenancy and audit gates to pass first.

### Domain Requirement 2 — Baseline rule

WHEN pilot tenants are selected THE SYSTEM SHALL define scope, data handling, support model, exit criteria and rollback plan.

### Domain Requirement 3 — Baseline rule

WHEN production hardening is planned THE SYSTEM SHALL include observability, resilience, retention, access control and operational runbooks.

### Domain Requirement 4 — Baseline rule

WHEN billing or marketplace work is proposed THE SYSTEM SHALL block implementation until product validation and owner approval.

### Domain Requirement 5 — Baseline rule

WHEN pilot feedback changes scope THE SYSTEM SHALL route the change through change control.

### Domain Requirement 6 — Baseline rule

WHEN production readiness is claimed THE SYSTEM SHALL require documented evidence and owner acceptance.

## v1.3 baseline-depth requirements

### v1.3 Requirement 1 — Pilot performance baseline

WHEN a pilot environment is prepared THE SYSTEM SHALL define throughput, latency, worker, database and UI performance targets. [Source: Spec #16 §Performance, Scaling & Operational Specification]

### v1.3 Requirement 2 — Scaling test

WHEN pilot data volume increases THE SYSTEM SHALL validate ingestion, normalisation, evaluation and case flows under expected scale. [Source: Spec #16 §Scaling Requirements]

### v1.3 Requirement 3 — Operational readiness

WHEN a pilot release is proposed THE SYSTEM SHALL verify health checks, observability, error handling, recovery and support runbooks. [Source: Spec #16 §Operational Specification]

### v1.3 Requirement 4 — Routing readiness

WHEN pilot routing is enabled THE SYSTEM SHALL configure team affinity, owner mapping, approval paths and escalation paths. [Source: Spec #31 §Routing Model and Team Affinity]

### v1.3 Requirement 5 — Internal Risk routing

WHEN internal-risk related signals appear in pilot THE SYSTEM SHALL route only to permitted Internal Risk authority and preserve boundary constraints. [Source: Spec #31 v2.6 Routing Model Addendum]

### v1.3 Requirement 6 — Policy Owner routing

WHEN policy effectiveness cases appear in pilot THE SYSTEM SHALL route to Policy Owner roles where configured. [Source: Spec #31 v2.6 Routing Model Addendum]

### v1.3 Requirement 7 — P0 rehearsal readiness

WHEN pilot includes P0 war-room validation THE SYSTEM SHALL run P0 exercises as simulation or governed test and preserve audit trail. [Source: Spec #44 §P0 Zero-Day War Room UI]

### v1.3 Requirement 8 — Baseline configuration readiness

WHEN tenant pilot configuration is activated THE SYSTEM SHALL derive active settings from baseline templates and tenant-approved overrides. [Source: Spec #55 §Tenant Active Configuration]

### v1.3 Requirement 9 — Configuration governance readiness

WHEN baseline defaults are changed for pilot THE SYSTEM SHALL record governance approval, rationale and rollback plan. [Source: Spec #55 §Configuration Governance]

### v1.3 Requirement 10 — Connector conformance readiness

WHEN a pilot connector is prepared THE SYSTEM SHALL validate connector class, signal purpose, conformance tier and mapping before activation. [Source: Spec #61 §Conformance Rules]

### v1.3 Requirement 11 — Signal purpose readiness

WHEN pilot connector signals are emitted THE SYSTEM SHALL route all eight signal purposes to their configured engines or streams. [Source: Spec #61 §Eight Signal Purposes]

### v1.3 Requirement 12 — Silent defence readiness

WHEN pilot reporting is enabled THE SYSTEM SHALL produce silent defence reports showing daily tool actions, prevented issues and value evidence. [Source: Spec #73 §Silent Defence Reporting]

### v1.3 Requirement 13 — Pilot report audit

WHEN a pilot report is generated THE SYSTEM SHALL record data window, tenant, included sources and generating actor. [Source: Spec #73 §Reporting Governance]

### v1.3 Requirement 14 — Production hardening gate

WHEN a pilot seeks production promotion THE SYSTEM SHALL require security, performance, tenancy, audit, backup and rollback checks. [Source: Spec #16 §Acceptance Criteria]

### v1.3 Requirement 15 — Deprovision plan

WHEN pilot tenant is suspended or deprovisioned THE SYSTEM SHALL apply data retention, connector retirement and audit preservation rules. [Source: Spec #55 §Tenant Active Configuration]

### v1.3 Requirement 16 — Error budget

WHEN pilot operations encounter repeated failures THE SYSTEM SHALL surface error trends through observability and block production promotion until addressed. [Source: Spec #16 §Operational Specification]

### v1.3 Requirement 17 — War-room exit readiness

WHEN a P0 pilot exercise completes THE SYSTEM SHALL retain decision timeline, validation results and lessons learned as pilot evidence. [Source: Spec #44 §War Room Review]

### v1.3 Requirement 18 — Routing audit

WHEN pilot routing decisions are made THE SYSTEM SHALL audit team affinity, owner, route reason and escalation path. [Source: Spec #31 §Routing Audit]

### v1.3 Requirement 19 — Configuration rollback

WHEN a pilot configuration causes adverse behaviour THE SYSTEM SHALL revert through versioned baseline rollback and audit the rollback. [Source: Spec #55 §Baseline Drift]

### v1.3 Requirement 20 — Connector retirement readiness

WHEN a pilot connector is retired or disabled THE SYSTEM SHALL preserve run history, mapping, audit and dependent case references. [Source: Spec #61 §Connector Lifecycle]

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.
