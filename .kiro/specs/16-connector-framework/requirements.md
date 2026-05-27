# Requirements — Connector Framework

**Spec ID:** `16-connector-framework`  
**Target version:** v1.3.1  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #05 Data Connector Normalisation Implementation, Spec #09 Connector Architecture, Spec #11 Coverage Control Model, Spec #19 Full RBAC Permission Matrix, Spec #20 Push Action Governance, Spec #21 Architecture Intelligence Engine, Spec #61 Universal Security Signal Connector Contract, Spec #62 Verdict Semantics Specification

## Purpose

Connector classes, signal purposes, conformance tiers, registration and scheduling.

## Scope in

- Provide a versioned implementation plan for Connector Framework.
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

WHEN a verdict signal is consumed THE SYSTEM SHALL declare its disposition semantics per Spec #62; verdict consumption without disposition declaration is forbidden.

### Domain Requirement 2 — Baseline rule

WHEN a verdict is interpreted THE SYSTEM SHALL NOT reduce it to a binary pass/fail without preserving the semantic context defined by Spec #62.

### Domain Requirement 3 — Baseline rule

WHEN a connector emits a verdict THE SYSTEM SHALL include disposition fields per the Spec #62 schema.

### Domain Requirement 4 — Baseline rule

WHEN a connector is declared THE SYSTEM SHALL declare against at least one of class A (SOC Telemetry), class B (Operational Verdict), class C (Configuration State), class D (Threat Intelligence) per Spec #61. Multi-class declarations are permitted. Classes outside A/B/C/D are forbidden.

### Domain Requirement 5 — Baseline rule

WHEN a connector is built THE SYSTEM SHALL NOT ship before BP-03 (canonical data model) and BP-13 (connector framework) have shipped.

### Domain Requirement 6 — Baseline rule

WHEN a connector consumes source data THE SYSTEM SHALL resolve each signal to one or more of the eight signal purposes defined by Spec #61.

### Domain Requirement 7 — Baseline rule

WHEN a connector normalises a record THE SYSTEM SHALL map it to canonical Commander contracts before feature consumption.

### Domain Requirement 8 — Baseline rule

WHEN a connector declares conformance THE SYSTEM SHALL identify its connector class, supported purposes, required fields, optional fields and unsupported behaviours.

### Domain Requirement 9 — Baseline rule

WHEN a connector is mocked THE SYSTEM SHALL preserve the same class declaration and contract shape as the future real connector.

### Domain Requirement 10 — Baseline rule

WHEN a connector record lacks mandatory fields THE SYSTEM SHALL reject or quarantine the record and emit a validation event.

### Domain Requirement 11 — Baseline rule

WHEN a connector classifies SOC telemetry THE SYSTEM SHALL preserve read-only boundaries and SHALL NOT write to SOC platforms.

### Domain Requirement 12 — Baseline rule

WHEN a connector ingests operational verdicts THE SYSTEM SHALL preserve identity, time, disposition, policy reference and source.

### Domain Requirement 13 — Baseline rule

WHEN a connector ingests configuration state THE SYSTEM SHALL bind it to a canonical control, asset, identity or policy object.

### Domain Requirement 14 — Baseline rule

WHEN a connector ingests threat intelligence THE SYSTEM SHALL preserve source, confidence, freshness and permitted use restrictions.

### Domain Requirement 15 — Baseline rule

WHEN a connector is promoted from mock to real THE SYSTEM SHALL pass conformance, security, tenancy, audit and rollback readiness checks first.

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.2 master inventory enumeration — eight signal purposes

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Configuration Signal

WHEN a connector emits a Configuration Signal THE SYSTEM SHALL route configuration state into the drift engine. [Source: Master Technical Specification §2.2; Spec #61]

### v1.2 Requirement 2 — State Signal

WHEN a connector emits a State Signal THE SYSTEM SHALL route operational state into platform-health and coverage engines. [Source: Master Technical Specification §2.2; Spec #61]

### v1.2 Requirement 3 — Verdict Signal

WHEN a connector emits a Verdict Signal THE SYSTEM SHALL route verdict events into Internal Behavioural Intelligence and verdict semantics processing. [Source: Master Technical Specification §2.2; Spec #61]

### v1.2 Requirement 4 — Detection Signal

WHEN a connector emits a Detection Signal THE SYSTEM SHALL route detection events into External Attack Intelligence. [Source: Master Technical Specification §2.2; Spec #61]

### v1.2 Requirement 5 — Case Signal

WHEN a connector emits a Case Signal THE SYSTEM SHALL route SOC case state into External Attack Intelligence and the External Operating Picture. [Source: Master Technical Specification §2.2; Spec #61]

### v1.2 Requirement 6 — Inventory Signal

WHEN a connector emits a Inventory Signal THE SYSTEM SHALL route inventory state into the canonical entity model. [Source: Master Technical Specification §2.2; Spec #61]

### v1.2 Requirement 7 — Behavioural Signal

WHEN a connector emits a Behavioural Signal THE SYSTEM SHALL route behavioural counters into risk scoring and summary metrics. [Source: Master Technical Specification §2.2; Spec #61]

### v1.2 Requirement 8 — Threat Signal

WHEN a connector emits a Threat Signal THE SYSTEM SHALL route threat intelligence into External Threat Intelligence and estate matching. [Source: Master Technical Specification §2.2; Spec #61]

## v1.2 master inventory enumeration — four connector classes

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Class A (SOC Telemetry)

WHEN a connector is declared THE SYSTEM SHALL support Class A (SOC Telemetry) as read-only SOC telemetry and SHALL NOT invent a class outside A/B/C/D. [Source: Spec #61; Master Proposition §12.1]

### v1.2 Requirement 2 — Class B (Operational Verdict)

WHEN a connector is declared THE SYSTEM SHALL support Class B (Operational Verdict) as operational verdict semantics and SHALL NOT invent a class outside A/B/C/D. [Source: Spec #61; Master Proposition §12.1]

### v1.2 Requirement 3 — Class C (Configuration State)

WHEN a connector is declared THE SYSTEM SHALL support Class C (Configuration State) as configuration and posture state and SHALL NOT invent a class outside A/B/C/D. [Source: Spec #61; Master Proposition §12.1]

### v1.2 Requirement 4 — Class D (Threat Intelligence)

WHEN a connector is declared THE SYSTEM SHALL support Class D (Threat Intelligence) as threat intelligence signals and SHALL NOT invent a class outside A/B/C/D. [Source: Spec #61; Master Proposition §12.1]

## v1.2 connector lifecycle model

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Connector lifecycle

WHEN a connector lifecycle is managed THE SYSTEM SHALL support onboarding, configuration, activation, health monitoring, tuning and retirement. [Source: Master Technical Specification §13.2]

## v1.3.1 lineage closure requirements

### Inbound Integration Routing

WHEN inbound integration is configured THE SYSTEM SHALL route by connector class: Class A to External Attack Intelligence stream, Class B to Internal Behavioural Intelligence stream, Class C to drift detection and posture intelligence, and Class D to External Threat Intelligence stream. [Source: Master Technical Specification §12.1; Spec #59; Spec #61]

### Outbound Integration Gating

WHEN outbound integration is requested THE SYSTEM SHALL apply gating so push actions are premium-gated, approval-required and reversible per Spec #14; SOAR dispatch is mediated via ITSM record per Spec #15; and ITSM uses the two-record dispatch model. [Source: Master Technical Specification §12.2; Spec #14; Spec #15]

### Detection Specification Dispatch

WHEN detection specifications are generated THE SYSTEM SHALL dispatch them via ITSM to SIEM/SOAR engineering teams rather than pushing directly. [Source: Master Technical Specification §12.2; Spec #15]

### Reporting Integration

WHEN reporting integration is configured THE SYSTEM SHALL produce reporting outputs only via approved evidence pack and export channels. [Source: Master Technical Specification §12.3]

### Ingestion Tier 1

WHEN ingestion at Tier 1 Critical posture / health is configured THE SYSTEM SHALL support 5–15 minute cadence for critical posture and health signals. [Source: Master Proposition §12.5; Spec #06 §Five-Tier Ingestion]

### Ingestion Tier 2

WHEN ingestion at Tier 2 Regular drift is configured THE SYSTEM SHALL support 1–4 hour cadence for regular drift signals. [Source: Master Proposition §12.5; Spec #06 §Five-Tier Ingestion]

### Ingestion Tier 3

WHEN ingestion at Tier 3 Heavy inventory/enrichment is configured THE SYSTEM SHALL schedule daily or maintenance-window processing for heavy inventory and enrichment signals. [Source: Master Proposition §12.5; Spec #06 §Five-Tier Ingestion]

### Ingestion Tier 4

WHEN ingestion at Tier 4 Deep analytics / sweep is configured THE SYSTEM SHALL schedule weekly or monthly deep analytics and sweep processing. [Source: Master Proposition §12.5; Spec #06 §Five-Tier Ingestion]

### Ingestion Tier 5

WHEN ingestion at Tier 5 Event/webhook-triggered is configured THE SYSTEM SHALL process event-triggered and webhook-triggered signals on event. [Source: Master Proposition §12.5; Spec #06 §Five-Tier Ingestion]

### Tenant Connector Onboarding

WHEN a connector is onboarded THE SYSTEM SHALL apply registration, configuration and activation gates per Spec #09. [Source: Master Technical Specification §13.2; Spec #09]

### Connector Health Monitoring

WHEN a connector is health-monitored THE SYSTEM SHALL track liveness, freshness, error rate, throughput and authority resolution state. [Source: Master Technical Specification §13.2]

### Connector Tuning

WHEN a connector is tuned THE SYSTEM SHALL allow configuration adjustments under change control without disrupting signal continuity. [Source: Master Technical Specification §13.2]

### Connector Retirement

WHEN a connector is retired THE SYSTEM SHALL preserve historical signal lineage and gate retirement against active dependencies. [Source: Master Technical Specification §13.2]

