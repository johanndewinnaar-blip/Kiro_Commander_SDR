# Requirements — Observability and Tool Health

**Spec ID:** `33-observability-tool-health`  
**Target version:** v1.3.1  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #06 Worker and Scheduling, Spec #16 Performance/Scaling/Operational, Spec #23 Security Tool Intelligence, Spec #49 Admin Control Surface Information Architecture, Spec #61 Universal Security Signal Connector Contract
**v1.3 depth:** full content-depth translation applied to this spec during v1.3 remediation.

## Purpose

Application telemetry, connector health, job status, dashboard freshness and operational metrics.

## Scope in

- Provide a versioned implementation plan for Observability and Tool Health.
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

WHEN a connector runs THE SYSTEM SHALL record freshness, success, failure, latency and last successful ingestion state.

### Domain Requirement 2 — Baseline rule

WHEN a worker job executes THE SYSTEM SHALL record queue state, duration, result and retry count.

### Domain Requirement 3 — Baseline rule

WHEN a tool becomes unhealthy THE SYSTEM SHALL surface the impact on coverage, intelligence quality and dashboard confidence.

### Domain Requirement 4 — Baseline rule

WHEN observability data is displayed THE SYSTEM SHALL preserve tenant scope and source system identity.

### Domain Requirement 5 — Baseline rule

WHEN alerts are generated THE SYSTEM SHALL distinguish platform health from security findings.

### Domain Requirement 6 — Baseline rule

WHEN telemetry is incomplete THE SYSTEM SHALL show unknown state rather than assuming healthy state.

## v1.3 baseline-depth requirements

### v1.3 Requirement 1 — Worker observability

WHEN a worker job starts, succeeds, retries or fails THE SYSTEM SHALL emit metrics, structured logs and audit correlation for the job lifecycle. [Source: Spec #06 §14 Observability]

### v1.3 Requirement 2 — Worker security monitoring

WHEN worker execution touches tenant or connector data THE SYSTEM SHALL log tenant, connector, job type and correlation identifiers without exposing secrets. [Source: Spec #06 §16 Worker Security]

### v1.3 Requirement 3 — Health check

WHEN a service or worker is deployed THE SYSTEM SHALL provide health/readiness status consumable by operational dashboards. [Source: Spec #16 §Operational Specification]

### v1.3 Requirement 4 — Performance metric

WHEN API, worker or database performance is measured THE SYSTEM SHALL record latency, throughput, queue depth, error rate and saturation metrics. [Source: Spec #16 §Performance Requirements]

### v1.3 Requirement 5 — Tool entity model

WHEN a security tool is represented THE SYSTEM SHALL store tool identity, capability, owner, connector status, data contribution and control relevance. [Source: Spec #23 §Tool Entity Model]

### v1.3 Requirement 6 — Tool value score

WHEN tool value is calculated THE SYSTEM SHALL use tenant-configurable weights and retain the score factors. [Source: Spec #23 §Tool Value Score]

### v1.3 Requirement 7 — Data contribution analysis

WHEN a tool contributes data THE SYSTEM SHALL measure unique fields, overlap, freshness, coverage and downstream use. [Source: Spec #23 §Data Contribution Analysis]

### v1.3 Requirement 8 — Automation value

WHEN a tool supports automation or push THE SYSTEM SHALL model intent and preview value without live push in Phase 0. [Source: Spec #23 §Automation and Push Value]

### v1.3 Requirement 9 — Overlap matrix

WHEN tool coverage overlaps THE SYSTEM SHALL maintain overlap matrix by asset, identity, control, signal, domain and data contribution. [Source: Spec #23 §Overlap Matrix]

### v1.3 Requirement 10 — Removal impact simulation

WHEN a tool removal is simulated THE SYSTEM SHALL estimate impact on coverage, detection, posture, cases, reporting and connectors. [Source: Spec #23 §Removal Impact Simulation]

### v1.3 Requirement 11 — Console utilisation

WHEN console utilisation is tracked THE SYSTEM SHALL respect privacy and tenant policy while measuring operational usage. [Source: Spec #23 §Console Utilisation Tracking]

### v1.3 Requirement 12 — Dashboard output

WHEN tool health dashboards are rendered THE SYSTEM SHALL show connector state, data freshness, error trends, contribution and coverage gaps. [Source: Spec #23 §Dashboard Outputs]

### v1.3 Requirement 13 — Admin control surface

WHEN tool health configuration is exposed THE SYSTEM SHALL place connector/data-source and notification controls in Tenant Admin information architecture. [Source: Spec #49 §Connectors & Data Sources]

### v1.3 Requirement 14 — Notification adapter

WHEN tool health crosses alert thresholds THE SYSTEM SHALL send notification through configured adapter and audit the event. [Source: Spec #49 §Notification and Alert Adapter Framework]

### v1.3 Requirement 15 — Connector status signal

WHEN a connector emits state signal THE SYSTEM SHALL route State Signal to platform-health and coverage engines. [Source: Spec #61 §Eight Signal Purposes]

### v1.3 Requirement 16 — Configuration signal health

WHEN a connector emits configuration signal THE SYSTEM SHALL route Configuration Signal to drift engine and tool-health context. [Source: Spec #61 §Eight Signal Purposes]

### v1.3 Requirement 17 — Conformance monitoring

WHEN a connector is active THE SYSTEM SHALL monitor class, tier, purpose, mapping errors, run status and data freshness. [Source: Spec #61 §Conformance Rules]

### v1.3 Requirement 18 — Dead-letter visibility

WHEN a connector or worker job lands in dead letter THE SYSTEM SHALL surface it in tool health with owner, retry state and remediation action. [Source: Spec #06 §Dead-letter Handling]

### v1.3 Requirement 19 — Audit event for health changes

WHEN tool health state changes THE SYSTEM SHALL emit audit events for degraded, failed, recovered, disabled and retired states. [Source: Spec #23 §Audit Events]

### v1.3 Requirement 20 — Asset rationalisation signal

WHEN tool data shows duplicate, stale, orphaned, conflicting or anomalous assets THE SYSTEM SHALL create tool-health intelligence and route it to asset rationalisation outputs. [Source: Spec #23 CHANGE-ARCH-002 Asset Rationalisation & Anomaly Check]

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.
