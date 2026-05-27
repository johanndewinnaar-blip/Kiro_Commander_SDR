# Requirements — Architecture and Topology

**Spec ID:** `12-architecture-topology`  
**Target version:** v1.3.1  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #21 BAS Connector Integration Contract, Spec #22 Architecture Intelligence Engine, Spec #33 Multi-Domain Fusion Map, Spec #43 Graph/Gauge/Overlay System, Spec #65 External Operating Picture Surface, Spec #66 Internal Operating Picture Surface
**v1.3 depth:** full content-depth translation applied to this spec during v1.3 remediation.

## Purpose

Estate topology, cloud/on-prem overlays, dependencies, trust boundaries and architecture drift.

## Scope in

- Provide a versioned implementation plan for Architecture and Topology.
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

WHEN topology is rendered THE SYSTEM SHALL preserve entities, relationships, controls, exposure, ownership and cloud/on-prem context.

### Domain Requirement 2 — Baseline rule

WHEN a dependency edge is created THE SYSTEM SHALL include direction, evidence source, confidence and timestamp.

### Domain Requirement 3 — Baseline rule

WHEN architecture drift is detected THE SYSTEM SHALL compare observed state against baseline design or configured architecture intent.

### Domain Requirement 4 — Baseline rule

WHEN a topology view includes posture overlays THE SYSTEM SHALL retain asset and identity relationships rather than flattening them.

### Domain Requirement 5 — Baseline rule

WHEN operating pictures consume topology THE SYSTEM SHALL preserve internal/external surface context.

### Domain Requirement 6 — Baseline rule

WHEN topology evidence is incomplete THE SYSTEM SHALL show unknown or unvalidated state.

## v1.3 baseline-depth requirements

### v1.3 Requirement 1 — BAS signal intake

WHEN a BAS result is ingested THE SYSTEM SHALL bind the result to attack path, control, asset, exposure and validation context. [Source: Spec #21 §BAS Connector Integration Contract]

### v1.3 Requirement 2 — BAS simulation boundary

WHEN a BAS connector is represented before real integration THE SYSTEM SHALL use simulation/mock evidence only and prevent live attack execution. [Source: Spec #21 §Integration Boundaries]

### v1.3 Requirement 3 — Architecture intelligence entity

WHEN architecture data is evaluated THE SYSTEM SHALL derive topology, dependency, trust-boundary and control-placement intelligence. [Source: Spec #22 §Architecture Intelligence Engine]

### v1.3 Requirement 4 — Architecture drift detection

WHEN architecture state differs from intended baseline THE SYSTEM SHALL emit architecture drift evidence linked to affected entities and controls. [Source: Spec #22 §Architecture Drift]

### v1.3 Requirement 5 — Attack path computation

WHEN topology and exposure data support path evaluation THE SYSTEM SHALL compute attack path likelihood and retain path evidence. [Source: Spec #22 §Attack Path Likelihood]

### v1.3 Requirement 6 — Fusion Map node inclusion

WHEN an asset, identity, control, connector or risk object has relationship relevance THE SYSTEM SHALL include it as a typed Fusion Map node. [Source: Spec #33 §Multi-Domain Fusion Map]

### v1.3 Requirement 7 — Fusion Map edge inclusion

WHEN two canonical entities have a meaningful dependency or risk relationship THE SYSTEM SHALL include a typed edge with direction, confidence and source provenance. [Source: Spec #33 §Relationship Model]

### v1.3 Requirement 8 — Operating picture relationship

WHEN an Internal or External Operating Picture references topology THE SYSTEM SHALL link the picture panel to the Fusion Map entities that explain it. [Source: Spec #33 v2.6 Operating Picture relationship]

### v1.3 Requirement 9 — Graph node encoding

WHEN a topology node is rendered THE SYSTEM SHALL encode node type, priority, surface attribution and state using approved visual rules. [Source: Spec #43 §6 Fusion Map Visual Encoding]

### v1.3 Requirement 10 — Graph edge encoding

WHEN a topology relationship is rendered THE SYSTEM SHALL encode relationship type, confidence, path direction and control relevance. [Source: Spec #43 §6 Fusion Map Visual Encoding]

### v1.3 Requirement 11 — Overlay application

WHEN topology overlays are selected THE SYSTEM SHALL apply overlays for exposure, control coverage, identity risk, attack path and mission impact without losing base topology. [Source: Spec #43 §4 Required Overlays]

### v1.3 Requirement 12 — External picture topology

WHEN External Operating Picture panels render exposed entities THE SYSTEM SHALL include external surface entities, external signals, correlation state and attack landing context. [Source: Spec #65 §External Operating Picture Surface]

### v1.3 Requirement 13 — External panel drilldown

WHEN an external operating picture panel is selected THE SYSTEM SHALL drill into affected topology, source signals and linked cases. [Source: Spec #65 §Named Panels]

### v1.3 Requirement 14 — Internal picture topology

WHEN Internal Operating Picture panels render internal state THE SYSTEM SHALL include internal behavioural, posture, identity, coverage and tool-health context. [Source: Spec #66 §Internal Operating Picture Surface]

### v1.3 Requirement 15 — Internal panel drilldown

WHEN an internal operating picture panel is selected THE SYSTEM SHALL drill into internal topology, control evidence, identity chain and linked cases. [Source: Spec #66 §Named Panels]

### v1.3 Requirement 16 — Topology provenance

WHEN a topology relationship is inferred THE SYSTEM SHALL store source connector, source field, confidence and normalisation run. [Source: Spec #22 §Architecture Intelligence Evidence]

### v1.3 Requirement 17 — Manual topology correction

WHEN an operator corrects topology metadata THE SYSTEM SHALL treat the correction as audited evidence and not as silent overwrite of source truth. [Source: Spec #33 §Fusion Map Governance]

### v1.3 Requirement 18 — Critical path surfacing

WHEN a topology path intersects critical mission or P0 context THE SYSTEM SHALL surface the path as priority context in architecture and operating picture views. [Source: Spec #22 §Architecture Intelligence Engine; Spec #65/66 Operating Pictures]

### v1.3 Requirement 19 — Performance guardrail

WHEN a topology graph exceeds practical render limits THE SYSTEM SHALL aggregate, filter or progressively load while preserving analytical correctness. [Source: Spec #43 §9 Performance Guardrails]

### v1.3 Requirement 20 — Architecture case linkage

WHEN architecture drift or attack path likelihood requires action THE SYSTEM SHALL link the topology evidence to the appropriate risk object and case lifecycle. [Source: Spec #22 §Case Generation]

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.
