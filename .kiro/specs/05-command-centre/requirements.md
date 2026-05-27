# Requirements — Command Centre

**Spec ID:** `05-command-centre`  
**Target version:** v1.2  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #42 Domain Security Dashboards, Spec #43 Workspace Model Implementation, Spec #65 External Operating Picture Surface, Spec #66 Internal Operating Picture Surface, Spec #67 OODA Dashboard Family, Spec #70 Direction Boards

## Purpose

Primary landing surface with posture, coverage, VM, asset, case, exposure, identity, tool health and Commander AI signals.

## Scope in

- Provide a versioned implementation plan for Command Centre.
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

WHEN the Command Centre loads THE SYSTEM SHALL present posture, cases, vulnerabilities, exposures, assets, identity, control coverage and tool health at a glance.

### Domain Requirement 2 — Baseline rule

WHEN Command Centre cards are clicked THE SYSTEM SHALL route to registered domain pages rather than untracked ad hoc views.

### Domain Requirement 3 — Baseline rule

WHEN a metric is derived from mock data THE SYSTEM SHALL label mock or scaffold status.

### Domain Requirement 4 — Baseline rule

WHEN P0 or priority overlay exists THE SYSTEM SHALL surface it prominently without hiding normal posture context.

### Domain Requirement 5 — Baseline rule

WHEN Commander AI is available THE SYSTEM SHALL provide grounded explanation or drafting tied to visible dashboard data.

### Domain Requirement 6 — Baseline rule

WHEN Command Centre data is incomplete THE SYSTEM SHALL show source gaps and next validation steps.

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.2 named surface enumeration

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — External Operating Picture

WHEN Command Centre aggregates external security posture THE SYSTEM SHALL incorporate External Operating Picture composition including estate map, external attack overlay, classification rings, response board and tempo snapshot. [Source: Spec #65 §3]

### v1.2 Requirement 2 — Internal Operating Picture

WHEN Command Centre aggregates internal posture THE SYSTEM SHALL incorporate Internal Operating Picture composition including verdict density, identity risk, geographic anomaly, policy effectiveness and internal tempo. [Source: Spec #66 §3]

### v1.2 Requirement 3 — Direction Board aggregation

WHEN Command Centre aggregates decisions THE SYSTEM SHALL surface Direction Board signals without collapsing their source context. [Source: Spec #70]
