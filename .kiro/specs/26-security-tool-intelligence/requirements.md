# Requirements — Security Tool Intelligence

**Spec ID:** `26-security-tool-intelligence`  
**Target version:** v1.2  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #23 Security Tool Intelligence, Spec #59 Intelligence Layer Architecture, Spec #61 Universal Security Signal Connector Contract, Spec #62 Verdict Semantics Specification

## Purpose

Tool health, utilisation, coverage, overlapping controls, rationalisation and telemetry posture.

## Scope in

- Provide a versioned implementation plan for Security Tool Intelligence.
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

WHEN intelligence is ingested THE SYSTEM SHALL attribute it to exactly one of four streams: External Threat, External Attack, Internal Behavioural, Posture; no fifth stream may be invented.

### Domain Requirement 2 — Baseline rule

WHEN intelligence streams are referenced THE SYSTEM SHALL NOT collapse, merge or alias two streams into one.

### Domain Requirement 3 — Baseline rule

WHEN an intelligence record is created THE SYSTEM SHALL carry stream-to-surface lineage tagging linking it to one or more attack surfaces.

### Domain Requirement 4 — Baseline rule

WHEN a verdict signal arrives THE SYSTEM SHALL NOT promote it into the Internal Behavioural stream without explicit operator opt-in per Spec #55 V2.6-11.

### Domain Requirement 5 — Baseline rule

WHEN any signal, case or intelligence record is created THE SYSTEM SHALL carry an internal_attack_surface or external_attack_surface attribution per Spec #60.

### Domain Requirement 6 — Baseline rule

WHEN security tool intelligence is displayed THE SYSTEM SHALL preserve source tool, connector class, signal purpose and confidence lineage.

### Domain Requirement 7 — Baseline rule

WHEN tool health affects intelligence quality THE SYSTEM SHALL expose freshness, coverage and ingestion health as part of the intelligence record.

### Domain Requirement 8 — Baseline rule

WHEN intelligence is promoted to a case THE SYSTEM SHALL preserve the originating stream and attack-surface attribution on the case.

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

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

## v1.2 Master Proposition §7 deliverables

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Estate-relevant threats

WHEN threat intelligence is consumed THE SYSTEM SHALL identify what active threats are relevant to the tenant estate. [Source: Master Proposition §7]

## v1.2 Estate Intelligence Picture and stream governance

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Estate Intelligence Picture

WHEN four-stream intelligence is integrated THE SYSTEM SHALL expose a unified Estate Intelligence Picture queried by surface-layer consumers. [Source: Master Proposition §4.2; Master Technical Specification §5]

### v1.2 Requirement 2 — Stream governance

WHEN intelligence streams are processed THE SYSTEM SHALL preserve stream ownership, stream-to-surface lineage and no cross-stream collapse. [Source: Master Proposition §4.3; Spec #59]

### v1.2 Requirement 3 — Stream-to-surface lineage

WHEN an intelligence record contributes to a surface THE SYSTEM SHALL retain lineage from stream to attack surface to rendered surface. [Source: Spec #59; Spec #60]
