# Requirements — Audit Trail

**Spec ID:** `28-audit-trail`  
**Target version:** v1.3.1  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #27 Shared Responsibility Profile & Configuration Governance, Spec #30 Universal Validation / Closure / Reopening, Spec #48 Audit Event Framework source-file mismatch noted, Spec #62 Verdict Semantics
**v1.3 depth:** full content-depth translation applied to this spec during v1.3 remediation.

## Purpose

Immutable audit events for cases, baselines, AI, connectors, RBAC, route visibility and governance actions.

## Scope in

- Provide a versioned implementation plan for Audit Trail.
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

WHEN a material system event occurs THE SYSTEM SHALL emit an audit event with actor, action, target, prior state, new state, timestamp and source.

### Domain Requirement 2 — Baseline rule

WHEN the actor is a system process THE SYSTEM SHALL identify the process, trigger and source signal.

### Domain Requirement 3 — Baseline rule

WHEN an audit event references vendor data THE SYSTEM SHALL preserve source system and connector lineage.

### Domain Requirement 4 — Baseline rule

WHEN an audit record is queried THE SYSTEM SHALL enforce tenant scope and RBAC.

### Domain Requirement 5 — Baseline rule

WHEN a case closes or reopens THE SYSTEM SHALL preserve validation and reopening evidence in the audit trail.

### Domain Requirement 6 — Baseline rule

WHEN a dry-run push is refused or blocked THE SYSTEM SHALL record refusal reason and target system.

### Domain Requirement 7 — Baseline rule

WHEN audit export is requested THE SYSTEM SHALL preserve immutable event identity and ordering.

### Domain Requirement 8 — Baseline rule

WHEN audit data is incomplete THE SYSTEM SHALL flag the gap rather than fabricating missing context.

## v1.3 baseline-depth requirements

### v1.3 Requirement 1 — Audit event schema

WHEN an audit event is emitted THE SYSTEM SHALL include actor, action, timestamp, tenant, entity reference, source signal, prior state and new state where applicable. [Source: Spec #48 §Audit Event Framework; Spec #05 §AuditEntry]

### v1.3 Requirement 2 — Configuration governance audit

WHEN tenant configuration, baseline, threshold or parameter values change THE SYSTEM SHALL emit an audit event recording old value, new value, approver and effective time. [Source: Spec #27 §Configuration Governance]

### v1.3 Requirement 3 — Shared responsibility profile audit

WHEN a shared responsibility profile is created or changed THE SYSTEM SHALL record owner, boundary, evidence, acknowledgement and configuration source. [Source: Spec #27 §Shared Responsibility Profile]

### v1.3 Requirement 4 — Validation audit

WHEN a validation check runs THE SYSTEM SHALL record validation target, evidence, result, source system, confidence and timestamp. [Source: Spec #30 §Universal Validation Lifecycle]

### v1.3 Requirement 5 — Closure gate audit

WHEN a closure gate is evaluated THE SYSTEM SHALL record gate result, required evidence, missing evidence and closure decision. [Source: Spec #30 §Universal Closure Gates]

### v1.3 Requirement 6 — Reopening audit

WHEN a closed case is reopened THE SYSTEM SHALL record trigger, previous closure evidence, new evidence and system-owned reopening rationale. [Source: Spec #30 §Universal Reopening Triggers]

### v1.3 Requirement 7 — Verdict audit

WHEN a verdict signal is consumed or interpreted THE SYSTEM SHALL record disposition, semantic context, source, confidence and downstream effect. [Source: Spec #62 §Verdict Semantics]

### v1.3 Requirement 8 — Decision audit

WHEN a rule, model or priority decision is made THE SYSTEM SHALL record input factors, output, rationale and versioned rule/model reference. [Source: Spec #48 §Audit Event Framework]

### v1.3 Requirement 9 — Communication audit

WHEN a case message is drafted, approved, sent, received or bound THE SYSTEM SHALL record message event type, mailbox, case binding and approval state. [Source: Spec #26a §Audit Requirements]

### v1.3 Requirement 10 — Push dry-run audit

WHEN a push dry-run is executed THE SYSTEM SHALL record target, proposed diff, approver, refusal or approval and non-mutation guarantee. [Source: Spec #20 §Push Governance; Spec #48 Audit]

### v1.3 Requirement 11 — SOC refusal audit

WHEN a write is proposed against a SOC platform THE SYSTEM SHALL refuse it and record the refusal as governance audit evidence. [Source: Spec #57 §SOC Boundary]

### v1.3 Requirement 12 — RBAC audit

WHEN a sensitive read or action is allowed or denied THE SYSTEM SHALL record permission, entitlement, feature flag and policy decision inputs. [Source: Spec #50 §Backend Enforcement Rule]

### v1.3 Requirement 13 — Tenant isolation audit

WHEN cross-tenant access is attempted THE SYSTEM SHALL deny access and record tenant context, actor and target reference. [Source: Spec #27 §Governance; Spec #19 §Data Scoping Rules]

### v1.3 Requirement 14 — Immutable audit storage

WHEN an audit event is written THE SYSTEM SHALL preserve it as append-only evidence and prevent silent alteration. [Source: Spec #48 §Audit Event Framework]

### v1.3 Requirement 15 — Audit export

WHEN audit data is exported for reporting or review THE SYSTEM SHALL record export parameters, requester, scope, timestamp and redaction state. [Source: Spec #48 §Audit Exports]

### v1.3 Requirement 16 — Audit search

WHEN audit records are queried THE SYSTEM SHALL enforce tenant, role and purpose restrictions before returning results. [Source: Spec #48 §Audit Access]

### v1.3 Requirement 17 — Verdict disposition change

WHEN a verdict disposition is corrected or challenged THE SYSTEM SHALL append a new audit event rather than overwriting the original interpretation. [Source: Spec #62 §Disposition Semantics]

### v1.3 Requirement 18 — Case lifecycle audit

WHEN case status, owner, route, priority or SLA changes THE SYSTEM SHALL record prior state, new state, source signal and deterministic rule rationale. [Source: Spec #30 §Lifecycle Audit]

### v1.3 Requirement 19 — Configuration baseline drift audit

WHEN active configuration diverges from baseline THE SYSTEM SHALL record the baseline version, active value, drift classification and owner. [Source: Spec #27 §Configuration Governance]

### v1.3 Requirement 20 — Evidence retention

WHEN audit evidence links to raw or normalised source data THE SYSTEM SHALL retain provenance references without exposing secrets or restricted payloads. [Source: Spec #48 §Audit Event Framework]

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.
