# Requirements — Direction Boards

**Spec ID:** `15-direction-boards`  
**Target version:** v1.4  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #70 Direction Boards, Spec #28 Strategic and Tactical Priority Framework, Spec #58 Security OODA Loop Specification, Spec #59 Intelligence Layer Architecture, Spec #60 Internal and External Attack Surface Framework

## Purpose

Control Weakness and Policy Effectiveness Direction Boards with case-generation pathways.

## Scope in

- Provide a versioned implementation plan for Direction Boards.
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

WHEN a Direction Board displays cases or signals THE SYSTEM SHALL preserve and surface the internal/external attack surface attribution.

### Domain Requirement 2 — Baseline rule

WHEN a Direction Board is created THE SYSTEM SHALL bind it to objective, owner, decision context, cases, signals and evidence.

### Domain Requirement 3 — Baseline rule

WHEN a Direction Board shows priorities THE SYSTEM SHALL preserve P0 overlay, risk rationale and surface attribution.

### Domain Requirement 4 — Baseline rule

WHEN a Direction Board changes state THE SYSTEM SHALL record the change in the audit trail.

### Domain Requirement 5 — Baseline rule

WHEN Direction Board recommendations are shown THE SYSTEM SHALL distinguish decision, recommendation and action states.

### Domain Requirement 6 — Baseline rule

WHEN a Direction Board consumes OODA data THE SYSTEM SHALL preserve Observe, Orient, Decide and Act provenance.

### Domain Requirement 7 — Baseline rule

WHEN Direction Board data is incomplete THE SYSTEM SHALL highlight unresolved intelligence gaps.

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.2 named surface enumeration

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Control Weakness Direction Board

WHEN Control Weakness Direction Board renders THE SYSTEM SHALL include composition, data sources, interaction and configurability defined by Spec #70. [Source: Spec #70 §3]

### v1.2 Requirement 2 — Policy Effectiveness Direction Board

WHEN Policy Effectiveness Direction Board renders THE SYSTEM SHALL include composition, data sources, interaction and configurability defined by Spec #70. [Source: Spec #70 §4]

### v1.2 Requirement 3 — Board-generated cases

WHEN a Direction Board generates a case THE SYSTEM SHALL preserve the case generation semantics and audit linkage from Spec #70. [Source: Spec #70 §5]
