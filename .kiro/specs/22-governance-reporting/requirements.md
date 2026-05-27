# Requirements — Governance and Reporting

**Spec ID:** `22-governance-reporting`  
**Target version:** v1.2  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #35 Compliance and Standards Module, Spec #36 Evidence Pack Model, Spec #37 Security Debt Register, Spec #42 Domain Security Dashboards, Spec #48 Audit Event Framework, Spec #73 Silent Defence Reporting

## Purpose

Governance dashboards, compliance mappings, silent defence reporting, board-ready exports and audit.

## Scope in

- Provide a versioned implementation plan for Governance and Reporting.
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

WHEN governance reporting is generated THE SYSTEM SHALL preserve evidence, source lineage, timeframe and tenant scope.

### Domain Requirement 2 — Baseline rule

WHEN a compliance mapping is displayed THE SYSTEM SHALL identify Commander control, framework reference and evidence state.

### Domain Requirement 3 — Baseline rule

WHEN security debt is reported THE SYSTEM SHALL distinguish debt from risk acceptance.

### Domain Requirement 4 — Baseline rule

WHEN silent defence reporting is generated THE SYSTEM SHALL aggregate defence evidence without overstating unvalidated control effectiveness.

### Domain Requirement 5 — Baseline rule

WHEN reports are exported THE SYSTEM SHALL include generation timestamp, scope and data freshness.

### Domain Requirement 6 — Baseline rule

WHEN data is missing THE SYSTEM SHALL show reporting gaps rather than fabricating completeness.

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.2 Master Proposition §7 deliverables

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Governability trend

WHEN governance reporting is generated THE SYSTEM SHALL show whether the estate is becoming more or less governable over time. [Source: Master Proposition §7]

### v1.2 Requirement 2 — Silent defence

WHEN defensive controls operate without visible incidents THE SYSTEM SHALL support silent defence reporting that explains what the security stack did. [Source: Master Proposition §7; Spec #73]
