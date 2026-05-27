# Requirements — Case Management

**Spec ID:** `06-case-management`  
**Target version:** v1.2  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #08 Case Management Workflow, Spec #17 Target Users and Persona Model, Spec #28 Strategic and Tactical Priority Framework, Spec #29 Universal Risk Object and Case Binding, Spec #30 Case Validation and Closure, Spec #42 Domain Security Dashboards, Spec #60 Internal and External Attack Surface Framework

## Purpose

Case lifecycle, queues, detail panes, SLA, routing, closure gates, reopening and audit.

## Scope in

- Provide a versioned implementation plan for Case Management.
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

WHEN a case is created in the system THE SYSTEM SHALL create it through a system-owned signal-to-case path; manual case creation is forbidden.

### Domain Requirement 2 — Baseline rule

WHEN a case status transition is proposed THE SYSTEM SHALL apply only system-owned transitions defined by Spec #08; manual status edits are forbidden.

### Domain Requirement 3 — Baseline rule

WHEN a case is closed THE SYSTEM SHALL close it only through the validation-closure pathway defined by Spec #30; manual case closure is forbidden.

### Domain Requirement 4 — Baseline rule

WHEN a closed case is reopened THE SYSTEM SHALL apply the reopening lifecycle defined by Spec #30 and emit a reopening audit event.

### Domain Requirement 5 — Baseline rule

WHEN a routing decision is made THE SYSTEM SHALL apply registry-driven routing rules; operator-bypass routing is forbidden.

### Domain Requirement 6 — Baseline rule

WHEN any case lifecycle change occurs THE SYSTEM SHALL emit a structured audit event with actor, action, prior state, new state, timestamp and source signal reference.

### Domain Requirement 7 — Baseline rule

WHEN a case is created THE SYSTEM SHALL attribute it to exactly one of internal_attack_surface or external_attack_surface per Spec #60; cases without surface attribution are forbidden.

### Domain Requirement 8 — Baseline rule

WHEN a parent case is created THE SYSTEM SHALL bind it to one or more canonical risk objects per Spec #29 before operational assignment.

### Domain Requirement 9 — Baseline rule

WHEN a sub-case is created THE SYSTEM SHALL preserve its parent-case relationship, risk-object binding and owning team context.

### Domain Requirement 10 — Baseline rule

WHEN Case Risk Score is calculated THE SYSTEM SHALL use the deterministic scoring inputs defined by Spec #08 rather than free-text judgement.

### Domain Requirement 11 — Baseline rule

WHEN Momentum Score is calculated THE SYSTEM SHALL derive it from lifecycle movement, ageing and response dynamics defined by Spec #08.

### Domain Requirement 12 — Baseline rule

WHEN Workload Capacity Score is evaluated THE SYSTEM SHALL include analyst workload, rank, specialism and current allocation constraints.

### Domain Requirement 13 — Baseline rule

WHEN a Next Best Action is proposed THE SYSTEM SHALL produce the action through the Case Action Algorithm contract and label the input evidence used.

### Domain Requirement 14 — Baseline rule

WHEN an analyst assignment is made THE SYSTEM SHALL enforce workload mix, rank, specialism, team affinity and anti-hoarding rules.

### Domain Requirement 15 — Baseline rule

WHEN an override is requested THE SYSTEM SHALL record override mode, approver, reason, expiry and rollback condition.

### Domain Requirement 16 — Baseline rule

WHEN evidence is attached to a case THE SYSTEM SHALL bind the evidence pack to the case, source signal and affected entity.

### Domain Requirement 17 — Baseline rule

WHEN an auto-healing condition is detected THE SYSTEM SHALL validate upstream state before reducing case risk or proposing closure.

### Domain Requirement 18 — Baseline rule

WHEN a case communicates with stakeholders THE SYSTEM SHALL preserve the communication thread as part of the case lifecycle.

### Domain Requirement 19 — Baseline rule

WHEN a case is displayed on dashboards THE SYSTEM SHALL surface severity, risk score, SLA state, owner, age and attack-surface attribution.

### Domain Requirement 20 — Baseline rule

WHEN a case lifecycle event is generated THE SYSTEM SHALL make it available to the audit trail and operating picture surfaces.

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.2 master inventory enumeration — twelve case types

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Drift case

WHEN a Drift case is generated THE SYSTEM SHALL support the named v2.6 case type with its baseline lifecycle, routing, priority and audit treatment. [Source: Master Technical Specification §6.2; Spec #08 v2.6 addendum]

### v1.2 Requirement 2 — Vulnerability case

WHEN a Vulnerability case is generated THE SYSTEM SHALL support the named v2.6 case type with its baseline lifecycle, routing, priority and audit treatment. [Source: Master Technical Specification §6.2; Spec #08 v2.6 addendum]

### v1.2 Requirement 3 — Identity case

WHEN a Identity case is generated THE SYSTEM SHALL support the named v2.6 case type with its baseline lifecycle, routing, priority and audit treatment. [Source: Master Technical Specification §6.2; Spec #08 v2.6 addendum]

### v1.2 Requirement 4 — Exposure case

WHEN a Exposure case is generated THE SYSTEM SHALL support the named v2.6 case type with its baseline lifecycle, routing, priority and audit treatment. [Source: Master Technical Specification §6.2; Spec #08 v2.6 addendum]

### v1.2 Requirement 5 — Coverage case

WHEN a Coverage case is generated THE SYSTEM SHALL support the named v2.6 case type with its baseline lifecycle, routing, priority and audit treatment. [Source: Master Technical Specification §6.2; Spec #08 v2.6 addendum]

### v1.2 Requirement 6 — Tool Health case

WHEN a Tool Health case is generated THE SYSTEM SHALL support the named v2.6 case type with its baseline lifecycle, routing, priority and audit treatment. [Source: Master Technical Specification §6.2; Spec #08 v2.6 addendum]

### v1.2 Requirement 7 — Threat Intelligence Estate Match case

WHEN a Threat Intelligence Estate Match case is generated THE SYSTEM SHALL support the named v2.6 case type with its baseline lifecycle, routing, priority and audit treatment. [Source: Master Technical Specification §6.2; Spec #08 v2.6 addendum]

### v1.2 Requirement 8 — External Attack Correlation case

WHEN a External Attack Correlation case is generated THE SYSTEM SHALL support the named v2.6 case type with its baseline lifecycle, routing, priority and audit treatment. [Source: Master Technical Specification §6.2; Spec #08 v2.6 addendum]

### v1.2 Requirement 9 — Verdict Pattern case

WHEN a Verdict Pattern case is generated THE SYSTEM SHALL support the named v2.6 case type with its baseline lifecycle, routing, priority and audit treatment. [Source: Master Technical Specification §6.2; Spec #08 v2.6 addendum]

### v1.2 Requirement 10 — Inverse Discovery (Coverage Blindspot) case

WHEN a Inverse Discovery (Coverage Blindspot) case is generated THE SYSTEM SHALL support the named v2.6 case type with its baseline lifecycle, routing, priority and audit treatment. [Source: Master Technical Specification §6.2; Spec #08 v2.6 addendum]

### v1.2 Requirement 11 — Policy Effectiveness case

WHEN a Policy Effectiveness case is generated THE SYSTEM SHALL support the named v2.6 case type with its baseline lifecycle, routing, priority and audit treatment. [Source: Master Technical Specification §6.2; Spec #08 v2.6 addendum]

### v1.2 Requirement 12 — OODA Tempo Degradation case

WHEN a OODA Tempo Degradation case is generated THE SYSTEM SHALL support the named v2.6 case type with its baseline lifecycle, routing, priority and audit treatment. [Source: Master Technical Specification §6.2; Spec #08 v2.6 addendum]

## v1.2 Master Proposition §7 deliverables

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Severity statement

WHEN a Commander case is presented THE SYSTEM SHALL explain what is wrong and how severe it is using case evidence and Operating Picture context. [Source: Master Proposition §7]

### v1.2 Requirement 2 — Ownership

WHEN a case or remediation item is generated THE SYSTEM SHALL identify who owns it using routing, RBAC and ownership registry data. [Source: Master Proposition §7]

### v1.2 Requirement 3 — Next Best Action

WHEN Commander recommends remediation THE SYSTEM SHALL produce Next Best Action and auto-resolution eligibility without bypassing governance. [Source: Master Proposition §7]

## v1.3.1 lineage closure requirements

### Risk Object — Coverage Blindspot

WHEN a Coverage Blindspot is detected via Inverse Discovery Loop THE SYSTEM SHALL create a `coverage_blindspot` risk object and bind it to the affected case. [Source: Master Technical Specification §6.3; Spec #72]

### Risk Object — OODA Phase Degradation

WHEN OODA phase health degrades below threshold THE SYSTEM SHALL create an `ooda_phase_degradation` risk object and bind it to the OODA Tempo Degradation case. [Source: Master Technical Specification §6.3; Spec #58]

