# Requirements — Security Command and Control

**Spec ID:** `13-security-c2`  
**Target version:** v1.4  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #57 Security Command and Control Doctrine, Spec #39 Behavioural Intelligence, Spec #45 Application Shell Boundary, Spec #58 Security OODA Loop Specification, Spec #59 Intelligence Layer Architecture, Spec #60 Internal and External Attack Surface Framework

## Purpose

Security C2 doctrine surfaces, internal/external operating pictures and command posture views.

## Scope in

- Provide a versioned implementation plan for Security Command and Control.
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

WHEN Commander interacts with any SOC platform THE SYSTEM SHALL operate as a read consumer only; writes to SOC platforms are forbidden.

### Domain Requirement 2 — Baseline rule

WHEN a detection or rule artefact is produced THE SYSTEM SHALL NOT push it to a SIEM, EDR or other SOC platform; outbound push is forbidden.

### Domain Requirement 3 — Baseline rule

WHEN a response playbook is encountered THE SYSTEM SHALL NOT author or push SOAR playbooks; SOAR authoring is forbidden.

### Domain Requirement 4 — Baseline rule

WHEN an individual SOC case or incident is referenced THE SYSTEM SHALL NOT perform case triage workflows on SOC content; SOC case triage is forbidden.

### Domain Requirement 5 — Baseline rule

WHEN Commander presents Security C2 THE SYSTEM SHALL distinguish Security C2 as category, SDR as discipline and Commander as platform.

### Domain Requirement 6 — Baseline rule

WHEN a Security C2 surface is created THE SYSTEM SHALL integrate intelligence, defence, engineering and active response views without replacing operational tools.

### Domain Requirement 7 — Baseline rule

WHEN SDR control-loop evidence is displayed THE SYSTEM SHALL show detect, analyse, control, validate and adjust states as auditable posture-control activity.

### Domain Requirement 8 — Baseline rule

WHEN a Security C2 decision is proposed THE SYSTEM SHALL preserve human authority for actions that mutate customer systems.

### Domain Requirement 9 — Baseline rule

WHEN SOC tool data is consumed THE SYSTEM SHALL treat it as upstream signal and preserve source attribution.

### Domain Requirement 10 — Baseline rule

WHEN Security C2 uses operating pictures THE SYSTEM SHALL separate internal, external and executive views while preserving shared canonical entities.

### Domain Requirement 11 — Baseline rule

WHEN Security C2 presents risk THE SYSTEM SHALL include attack-surface attribution, priority overlay and evidence lineage.

### Domain Requirement 12 — Baseline rule

WHEN any Security C2 workflow crosses into incident-response territory THE SYSTEM SHALL stop at recommendation, evidence and governance boundaries unless separately authorised.

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.2 application boundary enumeration — Operational App

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Operational App

WHEN Commander application boundaries are evaluated THE SYSTEM SHALL preserve the Operational App as a distinct application at app.commander-sdr.com and SHALL NOT collapse it into another boundary. [Source: Master Technical Specification §8.3; Spec #39; Spec #45; Spec #38]

## v1.2 master inventory enumeration — four intelligence streams

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — External Threat Intelligence

WHEN intelligence is ingested or rendered THE SYSTEM SHALL preserve the External Threat Intelligence stream as a distinct four-stream Intelligence Layer stream. [Source: Spec #59; Master Technical Specification §5]

### v1.2 Requirement 2 — External Attack Intelligence

WHEN intelligence is ingested or rendered THE SYSTEM SHALL preserve the External Attack Intelligence stream as a distinct four-stream Intelligence Layer stream. [Source: Spec #59; Master Technical Specification §5]

### v1.2 Requirement 3 — Internal Behavioural Intelligence

WHEN intelligence is ingested or rendered THE SYSTEM SHALL preserve the Internal Behavioural Intelligence stream as a distinct four-stream Intelligence Layer stream. [Source: Spec #59; Master Technical Specification §5]

### v1.2 Requirement 4 — Posture Intelligence

WHEN intelligence is ingested or rendered THE SYSTEM SHALL preserve the Posture Intelligence stream as a distinct four-stream Intelligence Layer stream. [Source: Spec #59; Master Technical Specification §5]

## v1.2 Estate Intelligence Picture and stream governance

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Estate Intelligence Picture

WHEN four-stream intelligence is integrated THE SYSTEM SHALL expose a unified Estate Intelligence Picture queried by surface-layer consumers. [Source: Master Proposition §4.2; Master Technical Specification §5]

### v1.2 Requirement 2 — Stream governance

WHEN intelligence streams are processed THE SYSTEM SHALL preserve stream ownership, stream-to-surface lineage and no cross-stream collapse. [Source: Master Proposition §4.3; Spec #59]

### v1.2 Requirement 3 — Stream-to-surface lineage

WHEN an intelligence record contributes to a surface THE SYSTEM SHALL retain lineage from stream to attack surface to rendered surface. [Source: Spec #59; Spec #60]

## v1.3.1 lineage closure requirements

### CTEM Stage 1

WHEN CTEM Stage 1 Scoping is performed THE SYSTEM SHALL provide complete enterprise scoping via asset registry, ownership hierarchy, connector coverage, coverage control model and compliance and standards module. [Source: Master Proposition §6 Stage 1]

### CTEM Stage 2

WHEN CTEM Stage 2 Discovery is performed THE SYSTEM SHALL provide continuous discovery via data ingestion framework, drift detection engine, identity intelligence, four-class connector architecture and Inverse Discovery Loop. [Source: Master Proposition §6 Stage 2]

### CTEM Stage 3

WHEN CTEM Stage 3 Prioritisation is performed THE SYSTEM SHALL prioritise findings via risk scoring, blast radius, attack path likelihood, Commander AI assessment, security debt register, context-aware drift prioritisation matrix and Pre-Warned classification. [Source: Master Proposition §6 Stage 3]

### CTEM Stage 4

WHEN CTEM Stage 4 Validation is performed THE SYSTEM SHALL validate exploitability via BAS integration, SIEM/SOAR rule generation and connected access chain revalidation. [Source: Master Proposition §6 Stage 4]

### CTEM Stage 5

WHEN CTEM Stage 5 Mobilisation is performed THE SYSTEM SHALL mobilise remediation via case management, ITSM integration, push capability, compensating controls and remediation dispatch with rollback. [Source: Master Proposition §6 Stage 5]

### CTEM Positioning

WHEN Commander positions against CTEM frameworks THE SYSTEM SHALL operate above the CTEM framework as Security Command and Control, not as a CTEM-adjacent tool. [Source: Master Proposition §6]

### Conformance — OODA

WHEN Commander is operated against the v2.6 conformance bar THE SYSTEM SHALL ensure the Security OODA Loop runs continuously per Spec #58. [Source: Master Technical Specification §14]

### Conformance — Inverse Discovery

WHEN Commander is operated against the v2.6 conformance bar THE SYSTEM SHALL ensure the Inverse Discovery Loop is operational per Spec #72. [Source: Master Technical Specification §14]

### Conformance — Twelve Case Types

WHEN Commander is operated against the v2.6 conformance bar THE SYSTEM SHALL ensure case taxonomy is extended to twelve types per Spec #08 v2.6 addendum. [Source: Master Technical Specification §14]

### Conformance — Configurable Parameters

WHEN Commander is operated against the v2.6 conformance bar THE SYSTEM SHALL expose all v2.6 configurable parameters per Spec #55 v2.6 addendum. [Source: Master Technical Specification §14]

