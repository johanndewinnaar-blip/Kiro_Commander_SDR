# Requirements — P0 Zero-Day War Room

**Spec ID:** `24-security-c2-p0-war-room`  
**Target version:** v1.4  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #40 P0 Zero-Day Priority Override, Spec #44 P0 Zero-Day War Room UI, Spec #58 Security OODA Loop, Spec #65 External Operating Picture Surface, Spec #66 Internal Operating Picture Surface, Spec #67 OODA Dashboard Family
**v1.3 depth:** full content-depth translation applied to this spec during v1.3 remediation.

## Purpose

P0 override, zero-day response view, priority routing, stakeholder summary and protected scope.

## Scope in

- Provide a versioned implementation plan for P0 Zero-Day War Room.
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

WHEN a P0 priority overlay is activated THE SYSTEM SHALL display priority reason, affected surfaces, active intelligence streams and decision owner.

### Domain Requirement 2 — Baseline rule

WHEN a zero-day condition is declared THE SYSTEM SHALL bind affected assets, vulnerabilities, controls, exposures and cases into a single war-room view.

### Domain Requirement 3 — Baseline rule

WHEN P0 status is applied THE SYSTEM SHALL record activation source, timestamp, scope and expiry or review cadence.

### Domain Requirement 4 — Baseline rule

WHEN P0 material changes THE SYSTEM SHALL propagate visible priority markers to Command Centre, cases, OODA and Direction Boards.

### Domain Requirement 5 — Baseline rule

WHEN war-room actions are proposed THE SYSTEM SHALL keep actions in recommendation or dry-run state until authorised.

### Domain Requirement 6 — Baseline rule

WHEN P0 evidence is incomplete THE SYSTEM SHALL label uncertainty and required validation steps.

### Domain Requirement 7 — Baseline rule

WHEN P0 status is removed THE SYSTEM SHALL preserve the event history and validation evidence.

### Domain Requirement 8 — Baseline rule

WHEN a war-room view displays data THE SYSTEM SHALL preserve internal/external surface attribution.

## v1.3 baseline-depth requirements

### v1.3 Requirement 1 — P0 trigger evaluation

WHEN a zero-day or emergency priority condition is detected THE SYSTEM SHALL evaluate P0 override criteria before ordinary priority ordering. [Source: Spec #40 §P0 Zero-Day Priority Override]

### v1.3 Requirement 2 — P0 overlay

WHEN P0 is active THE SYSTEM SHALL apply the P0 priority overlay across cases, operating pictures, OODA views and war-room surfaces. [Source: Spec #40 §P0 Overlay]

### v1.3 Requirement 3 — P0 audit

WHEN P0 priority is applied, modified or removed THE SYSTEM SHALL emit an audit event with trigger, approver or system rule, affected scope and expiry condition. [Source: Spec #40 §Audit Requirements]

### v1.3 Requirement 4 — P0 expiry

WHEN a P0 override has an expiry or exit criterion THE SYSTEM SHALL downgrade only through configured system rule or approved review path. [Source: Spec #40 §Exit Criteria]

### v1.3 Requirement 5 — War room composition

WHEN the P0 War Room UI is rendered THE SYSTEM SHALL include P0 case list, affected surfaces, active threats, decision log, actions and validation state. [Source: Spec #44 §P0 Zero-Day War Room UI]

### v1.3 Requirement 6 — War room visual mode

WHEN P0 emergency command mode is active THE SYSTEM SHALL apply Level 3 emergency visual intensity without obscuring core data. [Source: Spec #41 §Visual Intensity; Spec #44 §UI Rules]

### v1.3 Requirement 7 — Observe under P0

WHEN P0 condition enters OODA Observe THE SYSTEM SHALL show incoming signals, coverage gaps and relevant source confidence. [Source: Spec #58 §Observe; Spec #67 Observe Dashboard]

### v1.3 Requirement 8 — Orient under P0

WHEN P0 condition enters OODA Orient THE SYSTEM SHALL show correlation, impacted entities, pre-warned/protected/novel classification and surface context. [Source: Spec #58 §Orient; Spec #67 Orient Dashboard]

### v1.3 Requirement 9 — Decide under P0

WHEN P0 condition enters OODA Decide THE SYSTEM SHALL show priority rationale, route, owner, approvals and decision blockers. [Source: Spec #58 §Decide; Spec #67 Decide Dashboard]

### v1.3 Requirement 10 — Act under P0

WHEN P0 condition enters OODA Act THE SYSTEM SHALL show actions, validation, closure gates, push dry-runs and reopening triggers. [Source: Spec #58 §Act; Spec #67 Act Dashboard]

### v1.3 Requirement 11 — Command tempo under P0

WHEN P0 is active THE SYSTEM SHALL track command tempo, delay, blocked decisions and action throughput. [Source: Spec #67 §Command Tempo Dashboard]

### v1.3 Requirement 12 — External picture under P0

WHEN external signals relate to P0 THE SYSTEM SHALL highlight external operating picture panels and linked External Attack Correlation cases. [Source: Spec #65 §External Operating Picture Surface]

### v1.3 Requirement 13 — Internal picture under P0

WHEN internal posture or behaviour relates to P0 THE SYSTEM SHALL highlight internal operating picture panels and linked posture/control/behavioural evidence. [Source: Spec #66 §Internal Operating Picture Surface]

### v1.3 Requirement 14 — P0 case routing

WHEN a case is promoted to P0 THE SYSTEM SHALL route it using the P0 routing path and preserve the original case type. [Source: Spec #40 §Routing and Priority]

### v1.3 Requirement 15 — P0 communication

WHEN P0 work requires communication THE SYSTEM SHALL bind communication to case, action, decision and audit log. [Source: Spec #44 §War Room Communication]

### v1.3 Requirement 16 — P0 action boundary

WHEN a P0 user attempts live vendor mutation THE SYSTEM SHALL require the push-governance/dry-run pathway and explicit approval before any non-SOC write. [Source: Spec #40 §Governance Boundary]

### v1.3 Requirement 17 — P0 SOC boundary

WHEN a P0 signal references SOC tooling THE SYSTEM SHALL consume SOC data read-only and forbid SOC write, triage or playbook authoring. [Source: Spec #57 §SOC Boundary; Spec #40 §P0]

### v1.3 Requirement 18 — War room drilldown

WHEN a war-room item is selected THE SYSTEM SHALL open linked case, entity, operating picture and evidence without losing emergency context. [Source: Spec #44 §UI Composition]

### v1.3 Requirement 19 — P0 closure

WHEN P0 condition is resolved THE SYSTEM SHALL retain audit-grade timeline, actions, decision rationale and validation evidence. [Source: Spec #40 §Closure and Review]

### v1.3 Requirement 20 — P0 rehearsal

WHEN a P0 test or rehearsal is run THE SYSTEM SHALL mark it as simulation and prevent live resource mutation. [Source: Spec #44 §War Room Simulation]

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.
