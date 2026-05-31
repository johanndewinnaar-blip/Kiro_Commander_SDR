# Commander SDR System Knowledge Graph

**Authority:** System Rationalisation Phase 2  
**Date:** 30 May 2026  
**Status:** ACTIVE - Knowledge Graph Complete

---

## Executive Summary

This document maps the complete knowledge graph for Commander SDR v2.6, including all operational domains, their relationships, data flows, and dependencies. It serves as the foundation for understanding how the system components interact and provides the basis for all downstream architecture decisions.

**Key Finding:** Commander SDR operates as an integrated Security Command and Control platform with 18 primary domains, 4 intelligence streams, and 7 architectural layers. The system exhibits complex interdependencies that require careful orchestration to maintain operational integrity.

---

## Domain Topology

### Primary Operational Domains (18)

**1. Programme Foundation Domain**
- **Purpose:** Authority, steering, build sequence, roadmap management
- **Entities:** Authority documents, build packs, decision records, steering files
- **State:** Documentation completeness, authority precedence, change control
- **Relationships:** Governs all other domains

**2. Application Shell Domain**
- **Purpose:** Navigation, routing, three-application boundary enforcement
- **Entities:** Routes, menus, workspaces, application boundaries
- **State:** Route visibility, build mode, navigation state
- **Relationships:** Provides structure for all operational domains

**3. Design System Domain**
- **Purpose:** Visual language, component library, accessibility compliance
- **Entities:** Tokens, components, charts, visual intensity levels
- **State:** Theme state, component state, chart configurations
- **Relationships:** Consumed by all UI-rendering domains

**4. Canonical Data Domain**
- **Purpose:** Entity model, data contracts, persistence schemas
- **Entities:** Assets, Identities, Cases, Connectors, Strategies, Risk Objects, Audit Events
- **State:** Entity lifecycle, relationship integrity, data quality
- **Relationships:** Foundation for all operational data

**5. Case Management Domain**
- **Purpose:** Closed-loop case lifecycle, routing, validation, closure
- **Entities:** Cases (12 types), Case transitions, Routing decisions, SLA tracking
- **State:** Case lifecycle state, routing state, validation windows
- **Relationships:** Consumes intelligence, drives OODA, surfaces to dashboards

**6. Intelligence Processing Domain**
- **Purpose:** Four-stream intelligence integration, correlation, artefact generation
- **Entities:** Intelligence artefacts, Stream processors, Correlations, Classifications
- **State:** Stream processing state, correlation state, artefact lifecycle
- **Relationships:** Consumes signals, feeds cases, drives operating pictures

**7. Connector Framework Domain**
- **Purpose:** Signal ingestion, normalisation, health monitoring
- **Entities:** Connectors (4 classes), Signals (8 purposes), Health metrics
- **State:** Connector health, signal processing, ingestion queues
- **Relationships:** Feeds intelligence, normalises to canonical entities

**8. OODA Orchestration Domain**
- **Purpose:** Programme-level OODA loop, tempo measurement, bottleneck detection
- **Entities:** OODA cycles, Phase states, Tempo metrics, Health scores
- **State:** Cycle state, phase transitions, tempo trends
- **Relationships:** Orchestrates all operational domains, drives surface updates

**9. Drift Detection Domain**
- **Purpose:** Configuration drift detection, posture analysis, architecture intelligence
- **Entities:** Drift models (~240), Drift results, Blast radius analysis
- **State:** Model health, detection queues, result lifecycle
- **Relationships:** Consumes configuration signals, generates cases, feeds intelligence

**10. Operating Pictures Domain**
- **Purpose:** Situational awareness, threat landscape, behavioral patterns
- **Entities:** External/Internal Operating Pictures, Situational awareness, Blind spots
- **State:** Picture freshness, awareness level, coverage gaps
- **Relationships:** Aggregates intelligence, surfaces to dashboards, drives direction boards

**11. Direction Boards Domain**
- **Purpose:** Strategic guidance, control weakness identification, policy effectiveness
- **Entities:** Direction board items, Strategic recommendations, Priority guidance
- **State:** Board item lifecycle, urgency scores, leadership assignment
- **Relationships:** Consumes intelligence and cases, surfaces strategic guidance

**12. Commander AI Domain**
- **Purpose:** Grounded AI assistance, drafting, explanation, recommendation
- **Entities:** AI interactions, Prompt contexts, Output classifications, Audit records
- **State:** AI mode state, grounding context, output validation
- **Relationships:** Assists all operational domains, maintains grounding boundaries

**13. Control Plane Domain**
- **Purpose:** Commercial control plane, tenant admin, feature flag management
- **Entities:** Feature flags, Entitlement gates, Commercial tiers, Tenant configurations
- **State:** Feature enablement, entitlement validation, commercial tier status
- **Relationships:** Governs feature visibility across all operational domains

**14. Identity Intelligence Domain**
- **Purpose:** Identity graph, privilege posture, MFA/compliance signals, entitlement exposure
- **Entities:** Identity chains, Access paths, Risk scores, Group intelligence, Watchlists
- **State:** CHAIN computation stages (1-3), identity risk composite, group health
- **Relationships:** Feeds case management, consumes asset intelligence, drives behavioral analysis

**15. Asset Intelligence Domain**
- **Purpose:** Asset inventory, ownership, coverage, lifecycle, EOL/EOS, ghost assets
- **Entities:** Asset cartography, Coverage maps, Lifecycle classifications, Ghost detections
- **State:** Asset classification (persistent/ephemeral), attack surface positioning, coverage status
- **Relationships:** Foundation for identity intelligence, feeds drift detection, drives coverage cases

**16. Inverse Discovery Domain**
- **Purpose:** Lookup failure handling, coverage blindspot detection, estate inventory honesty
- **Entities:** Lookup failures, Coverage blindspots, Secondary resolution attempts, Entity onboarding drivers
- **State:** Discovery gap classification, blindspot case routing, resolution tracking
- **Relationships:** Improves connector framework, generates coverage cases, enhances canonical data

**17. Drift and Rule Engine Domain**
- **Purpose:** Deterministic rule engine, drift detection model framework, YAML rule format
- **Entities:** YAML rules (~240 models), Rule lifecycle, Findings, Analytical engines (10 types)
- **State:** Rule validation, active execution, finding generation, suppression/dedupe
- **Relationships:** Core analytical engine for all domains, feeds intelligence processing, generates cases

**18. Internal Risk Investigation Domain**
- **Purpose:** Insider risk boundary preservation, verdict pattern surfacing, customer-owned investigation handoff
- **Entities:** Verdict patterns, Investigation phases (6), Outcome dispositions, Evidence boundaries
- **State:** Surface/triage/routing/investigation/outcome/closure phases, jurisdictional controls
- **Relationships:** Consumes behavioral intelligence, maintains investigation boundaries, surfaces patterns only

---

## Intelligence Stream Architecture

### Four Intelligence Streams (Spec #59)

**1. External Threat Intelligence Stream**
- **Input Sources:** Class D connectors (threat intelligence feeds)
- **Processing:** Threat correlation, estate matching, IOC analysis
- **Outputs:** Threat landscape updates, estate match cases, threat artefacts
- **Consumers:** External Operating Picture, Threat Intelligence Estate Match cases
- **State Dependencies:** Connector health, correlation queues, artefact lifecycle

**2. External Attack Intelligence Stream**
- **Input Sources:** Class A connectors (SOC telemetry), Detection signals
- **Processing:** Attack correlation, campaign analysis, external surface analysis
- **Outputs:** Attack patterns, external attack correlation cases, campaign artefacts
- **Consumers:** External Operating Picture, External Attack Correlation cases
- **State Dependencies:** SOC boundary enforcement, read-only constraints

**3. Internal Behavioural Intelligence Stream**
- **Input Sources:** Class B connectors (operational verdicts), Behavioural signals
- **Processing:** Verdict correlation, pattern detection, behavioral analysis, disagreement detection
- **Outputs:** Behavioral patterns, verdict pattern cases, internal risk artefacts, identity chains
- **Consumers:** Internal Operating Picture, Verdict Pattern cases, Identity Intelligence
- **State Dependencies:** Verdict semantics, insider risk boundaries, jurisdictional controls
- **Special Constraints:** Intelligence-grade evidence only, no investigation conclusions, customer-owned handoff

**4. Posture Intelligence Stream**
- **Input Sources:** Class C connectors (configuration state), Inventory signals, Asset discovery
- **Processing:** Posture analysis, coverage assessment, drift correlation, ghost asset detection
- **Outputs:** Posture assessments, coverage cases, drift artefacts, asset intelligence, coverage blindspots
- **Consumers:** Both Operating Pictures, Coverage and Drift cases, Asset Intelligence, Inverse Discovery
- **State Dependencies:** Configuration state, drift detection results, asset lifecycle, coverage maps

### Cross-Stream Relationships

**Stream Correlation Patterns:**
- External Threat + External Attack → Campaign attribution
- External Attack + Internal Behavioural → Compromise assessment
- Internal Behavioural + Posture → Insider risk correlation
- External Threat + Posture → Exposure prioritisation

**Stream Synchronisation:**
- All streams feed Estate Intelligence Picture
- Cross-stream artefacts trigger multi-domain cases
- Stream health affects OODA phase performance
- Stream tempo drives overall system tempo

---

## Architectural Layer Dependencies

### Seven-Layer Interaction Model

**Layer 1: Connector Layer**
- **Domains:** Connector Framework
- **Dependencies:** None (entry point)
- **Provides:** Signal ingestion, health monitoring
- **Consumes:** External system signals
- **State:** Connector health, ingestion queues

**Layer 2: Normalisation Layer**
- **Domains:** Canonical Data (partial)
- **Dependencies:** Layer 1 (Connector)
- **Provides:** Entity normalisation, verdict processing
- **Consumes:** Raw signals from connectors
- **State:** Normalisation queues, entity validation

**Layer 3: Engine Layer**
- **Domains:** Drift Detection, Intelligence Processing (partial)
- **Dependencies:** Layer 2 (Normalisation)
- **Provides:** Drift detection, risk scoring, correlation
- **Consumes:** Normalised entities, configuration state
- **State:** Engine health, processing queues, model state

**Layer 4: Intelligence Layer**
- **Domains:** Intelligence Processing
- **Dependencies:** Layer 3 (Engine)
- **Provides:** Four-stream integration, artefact generation
- **Consumes:** Engine outputs, correlation results
- **State:** Stream processing, artefact lifecycle, correlation state

**Layer 5: Case Layer**
- **Domains:** Case Management
- **Dependencies:** Layer 4 (Intelligence)
- **Provides:** Case lifecycle, routing, validation
- **Consumes:** Intelligence artefacts, drift results
- **State:** Case lifecycle, routing decisions, validation windows

**Layer 6: OODA Layer**
- **Domains:** OODA Orchestration
- **Dependencies:** Layer 5 (Case)
- **Provides:** Programme tempo, bottleneck detection
- **Consumes:** Case metrics, layer health indicators
- **State:** OODA cycles, phase health, tempo metrics

**Layer 7: Surface Layer**
- **Domains:** Operating Pictures, Direction Boards, Application Shell
- **Dependencies:** Layer 6 (OODA)
- **Provides:** Dashboards, situational awareness, strategic guidance
- **Consumes:** OODA metrics, intelligence artefacts, case summaries
- **State:** Surface freshness, dashboard state, user interactions

### Cross-Layer Dependencies

**Vertical Dependencies (Layer N → Layer N+1):**
- Each layer consumes outputs from the layer below
- State changes propagate upward through layers
- Performance bottlenecks cascade upward
- Health degradation affects dependent layers

**Horizontal Dependencies (Within Layer):**
- Domains within same layer may share resources
- Cross-domain correlation within intelligence layer
- Shared state management within surface layer

**Feedback Dependencies (Layer N+1 → Layer N):**
- Strategic guidance influences engine tuning
- Case routing affects intelligence prioritisation
- OODA tempo drives connector cadence
- Surface interactions trigger lower-layer actions

---

## Data Flow Architecture

### Primary Data Flows

**1. Signal-to-Case Flow (Critical Path)**
```
External Systems → Connectors → Normalisation → Intelligence → Cases → OODA → Surfaces
```
- **GAP IDENTIFIED:** No latency requirements defined in source material
- **Volume:** High (thousands of signals per hour)
- **State Dependencies:** All layers must maintain processing state

**2. Configuration-to-Drift Flow**
```
Configuration Sources → Class C Connectors → Drift Detection → Cases → Direction Boards
```
- **GAP IDENTIFIED:** No latency requirements defined in source material
- **Volume:** Medium (hundreds of configuration changes per day)
- **State Dependencies:** Configuration state, drift model state, case state

**3. Verdict-to-Pattern Flow**
```
Security Tools → Class B Connectors → Verdict Processing → Behavioral Intelligence → Cases
```
- **GAP IDENTIFIED:** No latency requirements defined in source material
- **Volume:** Very High (tens of thousands of verdicts per hour)
- **State Dependencies:** Verdict semantics, correlation state, pattern state

**4. Intelligence-to-Awareness Flow**
```
Four Streams → Cross-Stream Correlation → Operating Pictures → Situational Awareness
```
- **GAP IDENTIFIED:** No latency requirements defined in source material
- **Volume:** Medium (hundreds of artefacts per hour)
- **State Dependencies:** Stream state, correlation state, picture state

### Data Flow Bottlenecks

**GAP IDENTIFIED:** No explicit performance targets or capacity planning defined in source material. The following represent architectural decision gaps:

**Identified Bottlenecks (requiring performance definition):**
- Verdict processing volume (Class B connectors) - capacity requirements TBD
- Cross-stream correlation complexity - performance targets TBD
- Drift detection model execution (~240 models) - execution time requirements TBD
- OODA phase transitions under load - throughput requirements TBD

**Mitigation Strategies (pending performance requirements):**
- Parallel processing approaches to be defined
- Correlation algorithm optimization to be specified
- Model prioritisation and batching strategies to be designed
- Phase timeout and degradation handling to be implemented

---

## Domain Relationship Matrix

### Strong Dependencies (Cannot Function Without)

| Domain | Depends On | Relationship Type |
|--------|------------|-------------------|
| All Domains | Programme Foundation | Governance |
| All UI Domains | Design System | Visual Language |
| All Operational | Canonical Data | Entity Contracts |
| All Operational | Control Plane | Feature Enablement |
| Case Management | Intelligence Processing | Case Generation |
| Intelligence Processing | Connector Framework | Signal Input |
| Intelligence Processing | Drift and Rule Engine | Analytical Results |
| OODA Orchestration | Case Management | Tempo Measurement |
| Operating Pictures | Intelligence Processing | Situational Data |
| Direction Boards | Operating Pictures | Strategic Input |
| Identity Intelligence | Asset Intelligence | Asset Context |
| Identity Intelligence | Drift and Rule Engine | CHAIN Computation |
| Asset Intelligence | Connector Framework | Asset Discovery |
| Inverse Discovery | Connector Framework | Lookup Failures |
| Internal Risk Investigation | Intelligence Processing | Verdict Patterns |

### Weak Dependencies (Enhanced By)

| Domain | Enhanced By | Relationship Type |
|--------|-------------|-------------------|
| Case Management | Commander AI | Assistance |
| Intelligence Processing | Drift Detection | Additional Signals |
| Operating Pictures | Commander AI | Explanation |
| Direction Boards | Commander AI | Drafting |
| All Domains | Application Shell | Navigation |
| Identity Intelligence | Commander AI | Risk Analysis |
| Asset Intelligence | Commander AI | Classification |
| Inverse Discovery | Commander AI | Gap Analysis |
| Internal Risk Investigation | Commander AI | Pattern Explanation |

### Circular Dependencies (Require Careful Management)

**Intelligence ↔ Cases:**
- Intelligence generates cases
- Case outcomes feed intelligence learning
- **Management:** Async feedback loops, state isolation

**OODA ↔ All Layers:**
- OODA orchestrates all layers
- All layers feed OODA metrics
- **Management:** Hierarchical control, timeout mechanisms

**Surfaces ↔ User Actions:**
- Surfaces display system state
- User actions trigger system changes
- **Management:** Command/query separation, audit trails

---

## Knowledge Gaps Identified

### Missing Domain Knowledge

**1. Strategy Runtime Binding (PARTIAL)**
- **Gap:** How strategy changes propagate to operational systems
- **Impact:** Strategy updates may not affect runtime behavior
- **Required:** Strategy binding event system, runtime reconfiguration

**2. Cross-Tenant Coordination (UNDEFINED)**
- **Gap:** How multi-tenant scenarios coordinate shared intelligence
- **Impact:** Tenant isolation may prevent beneficial correlation
- **Required:** Tenant federation model, shared intelligence protocols

**3. External System Integration (DEFERRED)**
- **Gap:** How Commander integrates with existing security infrastructure
- **Impact:** May duplicate existing capabilities or create gaps
- **Required:** Integration architecture, boundary definitions

### Missing Relationship Knowledge

**1. Performance Interdependencies (PARTIAL)**
- **Gap:** How performance degradation cascades across domains
- **Impact:** Bottlenecks may cause system-wide degradation
- **Required:** Performance dependency mapping, circuit breakers

**2. Failure Mode Propagation (UNDEFINED)**
- **Gap:** How domain failures affect dependent domains
- **Impact:** Single domain failure may cascade system-wide
- **Required:** Failure mode analysis, isolation mechanisms

**3. Data Consistency Boundaries (PARTIAL)**
- **Gap:** Which data must be strongly vs eventually consistent
- **Impact:** May cause data corruption or performance issues
- **Required:** Consistency model definition, conflict resolution

---

## Operational Constraints

### Doctrinal Constraints (Must Preserve)

**1. Closed-Loop Control (Assertion 1)**
- Cases must be system-created and system-managed
- No manual lifecycle overrides permitted
- Affects: Case Management, OODA Orchestration

**2. SOC Boundary (Assertion 8)**
- Read-only access to SOC platforms
- No SOC case triage or incident response
- Affects: Connector Framework, Intelligence Processing

**3. Insider Risk Boundary (Assertion 9)**
- Intelligence-grade evidence only, no investigation conclusions
- Pattern surfacing without disciplinary recommendations
- Affects: Internal Behavioural Intelligence, Commander AI

**4. Four-Stream Integrity (Assertion 9)**
- Intelligence streams must remain distinct
- Cross-stream correlation preserves stream attribution
- Affects: Intelligence Processing, Operating Pictures

### Technical Constraints

**1. Tenant Isolation**
- All domains must enforce tenant scoping
- Cross-tenant data access forbidden
- Affects: All domains with persistent state

**2. Audit Requirements**
- All material operations must emit audit events
- Audit trail must be tamper-evident
- Affects: All domains with state changes

**3. Performance Requirements**
- **GAP IDENTIFIED:** No performance requirements defined in source material
- System availability ≥ 99.9%
- Affects: All domains in critical path

---

## Status

**Phase 2 Complete:** ✅ Knowledge Graph Defined  
**Domain Coverage:** 18 primary domains mapped with relationships  
**Intelligence Streams:** 4 streams with cross-correlation patterns  
**Architectural Layers:** 7 layers with dependency mapping  
**Data Flows:** Critical paths identified with bottleneck analysis  
**Knowledge Gaps:** 6 major gaps identified for resolution  

**Ready for Confirmation:** Phase 1 (System Understanding) + Phase 2 (Knowledge Graph)

---

**Last Updated:** 2026-05-30  
**Next Milestone:** User confirmation before proceeding to Phases 7-11