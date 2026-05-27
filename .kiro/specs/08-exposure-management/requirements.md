# Requirements — Exposure Management

**Spec ID:** `08-exposure-management`  
**Target version:** v1.2  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #21 Architecture Intelligence Engine, Spec #22 Architecture Intelligence Spec, Spec #27 Third-Party Visibility and Trust Boundary Intelligence, Spec #60 Internal and External Attack Surface Framework, Spec #65 External Operating Picture Surface, Spec #74 Context-Aware Drift Prioritisation Matrix

## Purpose

Internal/external attack surface, exposure validation, attack path, blast radius and CTEM posture.

## Scope in

- Provide a versioned implementation plan for Exposure Management.
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

WHEN an exposure record is created THE SYSTEM SHALL attribute it to internal_attack_surface or external_attack_surface per Spec #60.

### Domain Requirement 2 — Baseline rule

WHEN exposure is identified THE SYSTEM SHALL bind it to affected entity, attack surface, source, evidence and priority rationale.

### Domain Requirement 3 — Baseline rule

WHEN external exposure is shown THE SYSTEM SHALL distinguish internet-facing, third-party and externally reported exposure contexts.

### Domain Requirement 4 — Baseline rule

WHEN internal exposure is shown THE SYSTEM SHALL distinguish internal blast radius, control gap and lateral movement relevance.

### Domain Requirement 5 — Baseline rule

WHEN exposure priority is calculated THE SYSTEM SHALL include context-aware drift prioritisation factors.

### Domain Requirement 6 — Baseline rule

WHEN exposure is mitigated THE SYSTEM SHALL require validation evidence before reducing state.

### Domain Requirement 7 — Baseline rule

WHEN exposure cannot be validated THE SYSTEM SHALL flag uncertainty and required data source.

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.2 Master Proposition §7 deliverables

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Cost to fix

WHEN remediation is recommended THE SYSTEM SHALL represent what it costs to fix in exposure/governance terms where data exists or mark the cost as unknown. [Source: Master Proposition §7]

### v1.2 Requirement 2 — Exploitability

WHEN an exposure is assessed THE SYSTEM SHALL indicate whether the identified exposure is actually exploitable or unknown. [Source: Master Proposition §7]
