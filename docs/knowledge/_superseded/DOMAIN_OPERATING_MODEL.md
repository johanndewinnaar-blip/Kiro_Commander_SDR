# Commander SDR Domain Operating Model

**Authority:** System Rationalisation Phase 3  
**Date:** 30 May 2026  
**Status:** ACTIVE - Operating Model Complete

---

## Executive Summary

This document defines how the 15 operational domains work together as a unified Security Command and Control platform. It establishes the operating contracts, data flows, and integration patterns that govern domain interactions.

**Key Finding:** Commander SDR operates as a **closed-loop control system** with the Security OODA Loop as the central orchestrator and the Intelligence Layer as the primary integration hub.

---

## Operating Model Architecture

### Control System Pattern
Commander SDR implements a **closed-loop control system** pattern:

```
External Environment (Security Tools, Threats, Estate)
                    ↓
            [OBSERVE] ← Connector Framework
                    ↓
            [ORIENT] ← Intelligence Layer + Analytics Engines  
                    ↓
            [DECIDE] ← Case Management + Risk Scoring
                    ↓
            [ACT] ← Push Actions + Validation
                    ↓
            Feedback Loop → External Environment
```

### Integration Hub Pattern
The **Intelligence Layer** serves as the primary integration hub:

```
                    Intelligence Layer (DOM-02)
                           ↑    ↓
    ┌─────────────────────────────────────────────────────┐
    ↑                                                     ↓
Analytical Domains                                Surface Domains
(DOM-05, DOM-07, DOM-08, DOM-09)                (DOM-10, DOM-11, DOM-12, DOM-13)
    ↑                                                     
Foundation Domains                                
(DOM-03, DOM-06)                                  
```

---

## Domain Operating Contracts

### DOM-01: Security OODA Loop (Orchestrator)
**Operating Contract:**
- **Observe Phase:** Monitor connector health, signal freshness, coverage completeness
- **Orient Phase:** Coordinate drift detection, risk scoring, intelligence correlation
- **Decide Phase:** Orchestrate case routing, priority assignment, remediation generation
- **Act Phase:** Coordinate push execution, validation, closure gates

**SLA Commitments:**
- Observe cycle: ≤ 15 minutes
- Orient cycle: ≤ 30 minutes  
- Decide cycle: ≤ 60 minutes
- Act cycle: Variable (depends on remediation complexity)

**Failure Modes:**
- Phase stall (>2x baseline time) → OODA Tempo Degradation case
- Phase failure → P0 escalation to Security Leadership

### DOM-02: Intelligence Layer (Integration Hub)
**Operating Contract:**
- **Stream Integration:** Maintain 4 intelligence streams with cross-correlation
- **Estate Intelligence Picture:** Provide unified estate view to all consumers
- **Correlation Engine:** Detect cross-stream patterns and anomalies
- **Data Freshness:** Maintain ≤5 minute latency for critical intelligence

**SLA Commitments:**
- Stream correlation latency: ≤ 5 minutes
- Cross-stream query response: ≤ 2 seconds
- Intelligence freshness: ≤ 5 minutes for critical, ≤ 30 minutes for standard

**Failure Modes:**
- Stream disconnection → Intelligence degradation alert
- Correlation failure → Manual investigation required
- Latency breach → Performance degradation case

### DOM-03: Connector Framework (Signal Ingestion)
**Operating Contract:**
- **Multi-Class Ingestion:** Support Class A/B/C/D connectors with conformance tiers
- **Signal Normalisation:** Transform all signals to canonical format
- **Health Monitoring:** Continuous connector health and signal freshness tracking
- **Backpressure Handling:** Graceful degradation under high signal volume

**SLA Commitments:**
- Signal ingestion latency: ≤ 30 seconds for real-time, ≤ 5 minutes for batch
- Connector health check: Every 60 seconds
- Signal processing throughput: 10,000 signals/minute baseline

**Failure Modes:**
- Connector failure → Tool Health case generation
- Signal backlog → Ingestion degradation alert
- Normalisation failure → Data quality case

### DOM-04: Case Management (Operational Spine)
**Operating Contract:**
- **Closed-Loop Lifecycle:** Enforce system-owned case progression (no manual overrides)
- **Routing Engine:** Route cases based on type, priority, team affinity, workload
- **SLA Enforcement:** Track and escalate SLA breaches automatically
- **Validation Gates:** Enforce validation before closure, reopening triggers

**SLA Commitments:**
- Case routing: ≤ 5 minutes from risk object creation
- SLA tracking: Real-time with 15-minute breach alerts
- Validation execution: ≤ 30 minutes for automated, variable for manual

**Failure Modes:**
- Routing failure → Manual assignment required
- SLA breach → Escalation to team lead
- Validation failure → Case remains open, investigation required

### DOM-05: Drift Detection Engine (Core Analytics)
**Operating Contract:**
- **Model Execution:** Run ~240 detection models across 13 domains continuously
- **Risk Object Generation:** Create risk objects for all findings with severity scoring
- **Model Health:** Monitor model performance and accuracy continuously
- **Baseline Management:** Maintain and update detection baselines

**SLA Commitments:**
- Model execution cycle: ≤ 15 minutes for critical models, ≤ 60 minutes for standard
- Risk object generation: ≤ 2 minutes from signal receipt
- False positive rate: ≤ 5% for critical models, ≤ 10% for standard

**Failure Modes:**
- Model failure → Model health degradation alert
- High false positive rate → Model tuning required
- Baseline drift → Baseline review case

### DOM-06: Entity Management (Foundation)
**Operating Contract:**
- **Canonical Truth:** Maintain single source of truth for all entities
- **Relationship Mapping:** Track and update entity relationships continuously
- **Data Quality:** Ensure entity accuracy, completeness, and freshness
- **Schema Evolution:** Support schema changes without breaking consumers

**SLA Commitments:**
- Entity update latency: ≤ 30 seconds from source signal
- Relationship accuracy: ≥ 95% for critical relationships
- Data freshness: ≤ 5 minutes for critical entities, ≤ 30 minutes for standard

**Failure Modes:**
- Entity conflict → Data quality case
- Relationship inconsistency → Manual resolution required
- Schema change impact → Consumer compatibility check required

### DOM-07: Risk Scoring & Blast Radius (Impact Analysis)
**Operating Contract:**
- **Risk Quantification:** Calculate risk scores for all entities using standardised methodology
- **Blast Radius Computation:** Map potential impact chains across entity relationships
- **Attack Path Analysis:** Identify privilege escalation and lateral movement paths
- **Score Calibration:** Continuously calibrate risk scores against actual outcomes

**SLA Commitments:**
- Risk score calculation: ≤ 5 minutes from entity update
- Blast radius computation: ≤ 10 minutes for complex chains
- Attack path analysis: ≤ 15 minutes for critical paths

**Failure Modes:**
- Score calculation failure → Manual risk assessment required
- Blast radius timeout → Simplified analysis used
- Path analysis failure → Conservative risk assumption applied

### DOM-08: Verdict Semantics (Behavioural Intelligence)
**Operating Contract:**
- **Verdict Processing:** Process all Class B connector verdicts as time-bound claims
- **Trust Calibration:** Maintain per-tool trust weights based on historical accuracy
- **Disagreement Detection:** Identify and flag contradictory verdicts from multiple tools
- **Density Aggregation:** Aggregate verdict patterns for behavioural analysis

**SLA Commitments:**
- Verdict processing: ≤ 30 seconds from receipt
- Trust calibration update: Daily batch process
- Disagreement detection: ≤ 2 minutes from conflicting verdict

**Failure Modes:**
- Verdict processing failure → Manual verdict review required
- Trust calibration drift → Recalibration process triggered
- High disagreement rate → Tool configuration review required

### DOM-09: Pre-Warned Classification (Attack Context)
**Operating Contract:**
- **Attack Classification:** Classify all external attacks as Pre-warned/Protected/Novel
- **Context Correlation:** Correlate attack signals with prior Commander knowledge
- **Classification Accuracy:** Maintain high accuracy through continuous learning
- **Audit Trail:** Maintain complete audit trail of classification decisions

**SLA Commitments:**
- Classification latency: ≤ 2 minutes from attack signal receipt
- Classification accuracy: ≥ 90% for Pre-warned, ≥ 85% for Protected
- Audit trail completeness: 100% for all classifications

**Failure Modes:**
- Classification failure → Default to Novel classification
- Low accuracy → Classification model retraining required
- Audit trail gap → Manual audit required

### DOM-10: Operating Pictures (Situational Awareness)
**Operating Contract:**
- **Real-Time Visualization:** Provide real-time estate intelligence visualization
- **Multi-Stream Integration:** Integrate all 4 intelligence streams in unified view
- **User Personalization:** Adapt views based on user role and authority level
- **Performance Optimization:** Maintain responsive performance under high data volume

**SLA Commitments:**
- Data refresh rate: ≤ 30 seconds for critical views
- Query response time: ≤ 2 seconds for standard queries
- View rendering: ≤ 5 seconds for complex visualizations

**Failure Modes:**
- Data staleness → Stale data warning displayed
- Performance degradation → Simplified view mode activated
- Rendering failure → Fallback to tabular view

### DOM-11: Identity Intelligence (Identity Analysis)
**Operating Contract:**
- **Comprehensive Intelligence:** Provide complete per-identity intelligence picture
- **Access Chain Analysis:** Map and analyze complete access chains for each identity
- **Behavioural Pattern Detection:** Identify anomalous behavioural patterns
- **Risk Trajectory Tracking:** Track identity risk evolution over time

**SLA Commitments:**
- Intelligence compilation: ≤ 10 minutes for identity lookup
- Access chain analysis: ≤ 5 minutes for standard chains
- Behavioural analysis: ≤ 15 minutes for pattern detection

**Failure Modes:**
- Intelligence compilation timeout → Partial view provided
- Access chain complexity → Simplified chain displayed
- Behavioural analysis failure → Manual analysis required

### DOM-12: Asset Intelligence (Asset Analysis)
**Operating Contract:**
- **Comprehensive Intelligence:** Provide complete per-asset intelligence picture
- **Configuration State Tracking:** Track asset configuration against baselines
- **Verdict History Analysis:** Analyze verdict patterns for each asset
- **Vulnerability State Management:** Maintain current vulnerability state

**SLA Commitments:**
- Intelligence compilation: ≤ 10 minutes for asset lookup
- Configuration analysis: ≤ 5 minutes for standard assets
- Vulnerability state update: ≤ 30 minutes from scan completion

**Failure Modes:**
- Intelligence compilation timeout → Partial view provided
- Configuration analysis failure → Manual review required
- Vulnerability state staleness → Stale data warning displayed

### DOM-13: Direction Boards (Strategic Guidance)
**Operating Contract:**
- **Strategic Priority Surfaces:** Provide strategic guidance for security leadership
- **Pattern Analysis:** Identify strategic patterns across operational data
- **Executive Reporting:** Generate executive-level insights and recommendations
- **Trend Analysis:** Track strategic trends over time

**SLA Commitments:**
- Board data refresh: ≤ 60 minutes for strategic views
- Pattern analysis: ≤ 30 minutes for trend detection
- Executive report generation: ≤ 15 minutes for standard reports

**Failure Modes:**
- Data refresh failure → Manual data collection required
- Pattern analysis timeout → Simplified analysis provided
- Report generation failure → Manual report creation required

### DOM-14: Compliance & Governance (Regulatory Alignment)
**Operating Contract:**
- **Continuous Compliance Measurement:** Track compliance across all frameworks continuously
- **Evidence Generation:** Generate audit-ready evidence automatically
- **Framework Mapping:** Maintain mappings between controls and framework requirements
- **Regulatory Reporting:** Generate regulatory reports on demand

**SLA Commitments:**
- Compliance score update: ≤ 60 minutes from control state change
- Evidence generation: ≤ 30 minutes for standard evidence packs
- Regulatory report generation: ≤ 24 hours for complex reports

**Failure Modes:**
- Compliance calculation failure → Manual assessment required
- Evidence generation timeout → Partial evidence pack provided
- Report generation failure → Manual report creation required

### DOM-15: Commander AI (Augmented Intelligence)
**Operating Contract:**
- **Grounded Responses:** Provide AI responses grounded in estate data and authority
- **Multi-Mode Operation:** Support Estate, Engineering, Triage, and Reporting modes
- **Response Quality:** Maintain high accuracy and relevance in all responses
- **Audit Trail:** Maintain complete audit trail of AI interactions

**SLA Commitments:**
- Response latency: ≤ 10 seconds for standard queries
- Response accuracy: ≥ 90% for grounded responses
- Grounding verification: 100% for action-impacting responses

**Failure Modes:**
- Response timeout → Fallback to manual analysis
- Low accuracy → Human verification required
- Grounding failure → Response marked as unverified

---

## Data Flow Patterns

### Primary Data Flows

**1. Signal-to-Case Flow:**
```
External Tools → DOM-03 (Connectors) → DOM-06 (Entities) → DOM-05 (Drift Detection) → DOM-04 (Cases) → DOM-01 (OODA Act)
```

**2. Intelligence Integration Flow:**
```
DOM-05/07/08/09 (Analytics) → DOM-02 (Intelligence Layer) → DOM-10/11/12/13 (Surfaces)
```

**3. OODA Orchestration Flow:**
```
DOM-01 (OODA) ↔ All Domains (bidirectional orchestration and status reporting)
```

### Critical Data Contracts

**Entity State Contract (DOM-06 → All):**
- **Format:** Canonical entity JSON schema
- **Freshness:** ≤ 30 seconds for critical entities
- **Completeness:** All mandatory fields populated
- **Consistency:** ACID properties maintained

**Intelligence Stream Contract (DOM-02 → Surfaces):**
- **Format:** Intelligence API with stream-specific schemas
- **Latency:** ≤ 5 minutes for critical intelligence
- **Correlation:** Cross-stream relationships maintained
- **Quality:** Confidence scores for all correlations

**Case Lifecycle Contract (DOM-04 → All):**
- **Format:** Case state machine with defined transitions
- **Routing:** Deterministic routing based on case type and priority
- **SLA:** Time-bound with automatic escalation
- **Validation:** Required validation before closure

---

## Integration Patterns

### Hub-and-Spoke Pattern (Intelligence Layer)
- **Hub:** DOM-02 (Intelligence Layer)
- **Spokes:** All analytical domains feed intelligence, all surface domains consume
- **Benefits:** Centralized correlation, consistent intelligence view
- **Risks:** Single point of failure, potential bottleneck

### Event-Driven Pattern (Case Management)
- **Events:** Risk object creation, case state transitions, SLA breaches
- **Consumers:** OODA orchestrator, surface layers, notification systems
- **Benefits:** Loose coupling, scalable, real-time responsiveness
- **Risks:** Event ordering, duplicate processing, event loss

### Pipeline Pattern (Signal Processing)
- **Stages:** Ingestion → Normalisation → Analysis → Intelligence → Cases → Surfaces
- **Benefits:** Clear data flow, parallel processing, fault isolation
- **Risks:** Pipeline stalls, backpressure, stage failures

---

## Failure Handling Strategy

### Graceful Degradation Principles
1. **Core Functions First:** Prioritize case management and OODA orchestration
2. **Partial Service:** Provide reduced functionality rather than complete failure
3. **Clear Communication:** Inform users of degraded capabilities
4. **Automatic Recovery:** Self-healing where possible, manual intervention when required

### Circuit Breaker Pattern
- **Implementation:** All inter-domain calls use circuit breakers
- **Thresholds:** 50% failure rate over 5 minutes triggers circuit open
- **Recovery:** Gradual recovery with health checks

### Backup Strategies
- **Critical Data:** Real-time replication for entity state and case data
- **Intelligence:** Cached intelligence with staleness warnings
- **Surfaces:** Static snapshots for emergency operation

---

## Performance Characteristics

### Throughput Requirements
- **Signal Ingestion:** 10,000 signals/minute baseline, 50,000 signals/minute peak
- **Case Processing:** 1,000 cases/hour baseline, 5,000 cases/hour peak
- **Intelligence Queries:** 10,000 queries/minute baseline
- **Surface Rendering:** 1,000 concurrent users baseline

### Latency Requirements
- **Critical Path:** Signal → Case creation ≤ 5 minutes
- **Intelligence Path:** Analysis → Surface update ≤ 10 minutes
- **User Interaction:** Query → Response ≤ 2 seconds
- **OODA Cycle:** Complete cycle ≤ 2 hours baseline

### Scalability Patterns
- **Horizontal Scaling:** All analytical domains support horizontal scaling
- **Vertical Scaling:** Intelligence Layer and Entity Management support vertical scaling
- **Caching:** Multi-layer caching for intelligence and surface data
- **Load Balancing:** Round-robin for stateless operations, sticky sessions for stateful

---

## Status

**Phase 3 Complete:** ✅ Domain Operating Model Created  
**Operating Contracts:** 15 domain contracts defined with SLAs and failure modes  
**Integration Patterns:** 3 primary patterns established (Hub-and-Spoke, Event-Driven, Pipeline)  
**Performance Framework:** Throughput and latency requirements defined  

**Next Phase:** Entity Architecture (Phase 4)

---

**Last Updated:** 2026-05-30  
**Next Milestone:** Phase 4 - Entity Architecture