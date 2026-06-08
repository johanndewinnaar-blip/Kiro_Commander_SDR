# Commander SDR — Journey Intelligence Authority Document

**Version:** JI-1.0
**Status:** Authoritative. Peer capability to Spec #58 (Security OODA Loop). Not subordinate to any single child spec.
**Authority:** This document is the binding authority for the Journey Intelligence capability domain. Where any other document conflicts on Journey Intelligence specifics, this one wins; the other must be updated.

---

## 1. Definition

Journey Intelligence is Commander's capability for understanding how security work travels through the organisation from first signal to validated outcome.

It is the measurement, attribution, optimisation and AI-grounding spine for Commander's security operating model.

Journey Intelligence is NOT:
- A dashboard
- A reporting module
- An analyst productivity tool
- Click tracking
- User surveillance
- HR performance scoring
- A duplicate SIEM
- A raw telemetry warehouse

Journey Intelligence IS:
- Workflow intelligence
- Command intelligence
- Lifecycle measurement
- Attribution infrastructure
- Formula-driven analytics
- AI reasoning substrate

### Core Framing

```
Journey First
Case Aware
OODA Driven
Formula Tunable
AI Ready
Governance Enforced
```

The primary object being measured is the security workflow itself. The analyst is one possible participant. The system, the AI, the automation engine, the connector, the approval authority are all participants in the same journey.

---

## 2. Relationship to Spec #58 (Security OODA Loop)

Journey Intelligence is a PEER capability that references Spec #58 as the phase framework it operates within.

| | Spec #58 (OODA Tempo) | Journey Intelligence |
|---|---|---|
| Scope | Programme-level aggregate health | Individual workflow measurement |
| Granularity | Four phase health scores (0-100) | Per-checkpoint, per-journey, per-actor |
| Object measured | The security programme as a whole | Each piece of security work independently |
| Output | Phase health gauges, tempo metric, bottleneck identification | Tempo, leakage, rework, quality, friction, economics, maturity |
| Consumer | Command Tempo Dashboard (CISO) | All Commander analytics, AI Analyst, automation engines, strategy layer |
| Data substrate | Aggregate metrics from engines | Individual audit events with attribution + Journey entity state |

Spec #58 answers: "Is the security programme running?"
Journey Intelligence answers: "How well, how fast, where does it leak, where does it fail, where can it improve?"

OODA provides the VOCABULARY. Journey Intelligence provides the MEASUREMENT.

---

## 3. Scope

Journey Intelligence spans:

- **Pre-case activity:** signal receipt, normalisation, enrichment, matching, evaluation
- **Case activity:** the 12-state closed-loop lifecycle from detection through validated closure
- **Action activity:** decomposition, approval, execution, validation of remediation steps
- **Mission activity:** strategic objective progression, case alignment, outcome measurement
- **Strategy activity:** policy proposal, simulation, approval, activation, effect measurement
- **Automation activity:** push intent, dispatch, execution, failure, retry, rescue, recovery
- **Future autonomous activity:** end-to-end system-driven journeys with no human participation

---

## 4. Concepts In Scope

### Core Model

| Concept | Definition |
|---|---|
| Journey | A complete lifecycle from first signal to validated outcome, anchor-agnostic |
| Journey Anchor | The primary entity the journey is bound to (case, finding, mission, strategy, signal, push action, war room, IOC match, exposure programme) |
| OODA Stage | Observe / Orient / Decide / Act phase attribution |
| Delivery Mode | Manual / System Driven / AI Enhanced / Human Confirmed Automation / Autonomous |
| Lifecycle Checkpoint | A meaningful state transition within a journey (bounded enum, ~35 values) |
| Journey Template | Expected shape of a journey type (descriptive, not prescriptive) |
| Journey Status | active / completed / stalled / abandoned / reworking |
| Journey Outcome | successful / partially_successful / failed / accepted_risk / cancelled / abandoned / merged / superseded / pending |

### Measurement Concepts

| Concept | Definition |
|---|---|
| Journey Tempo | Duration across the journey or per-phase |
| Journey Leakage | Work enters the lifecycle but never reaches a valid terminal outcome |
| Journey Rework | The lifecycle repeats because an earlier outcome failed |
| Journey Abandonment | Work intentionally stopped (suppressed, risk-accepted, cancelled) |
| Journey Escalation | A journey moves to a higher authority level |
| Journey Convergence | Multiple journeys merge into one |
| Journey Divergence | One journey creates multiple child journeys |
| Journey Quality | Whether the journey ended well, not just quickly |
| Journey Density | Volume of activity, evidence, automation within the journey |
| Journey Complexity | Phases, actors, loops, approvals, handoffs, failures, retries, child journeys |
| Journey Economics | Cost, time, friction, effort, savings and value across the full lifecycle |
| Journey Impact | Formula-driven read-model output measuring risk/exposure/control delta |

### Automation Intelligence (Sub-Domain)

| Concept | Definition |
|---|---|
| Automation Opportunity | How automatable is this journey type (design-time + observed) |
| Automation Friction | Resistance between decision and successful execution |
| Automation Drag | Time between decision approved and action completed |
| Automation Failure | Percentage of actions failing automated execution |
| Automation Reliability | Execution success rate by connector and integration |
| Human Rescue Rate | Percentage of automation requiring human intervention |
| Recovery Burden | Effort required to recover failed automation |
| Autonomous Maturity | Delivery mode progression over time per workflow type |

### Deferred Concepts (Banked for Future)

| Concept | Trigger for Activation |
|---|---|
| Journey Predictability | 90+ days of journey data with attribution flowing |
| Observed Automation Opportunity | Sufficient journey volume for pattern detection |
| Cognitive OODA | Phase 3+ with ethical boundary enforcement |

### Explicitly Excluded

| Concept | Rationale |
|---|---|
| Per-analyst performance comparison | Violates ethical boundary |
| SOC-internal journey reconstruction | SOC boundary (Hard Rule #2) |
| Click/navigation telemetry | Not a lifecycle checkpoint |
| Raw SIEM log storage | Commander is not a telemetry warehouse |

---

## 5. Data Model

### 5.1 New Enums

```
OodaStage:
  observe, orient, decide, act

DeliveryMode:
  manual, system_driven, ai_enhanced, human_confirmed_automation, autonomous

LifecycleCheckpoint (~35 values):
  Observe: signal_received, signal_normalised, signal_enriched, coverage_assessed, connector_pulled
  Orient: context_established, drift_detected, risk_scored, blast_computed, classification_assigned, anomaly_detected, correlation_completed, entity_resolved
  Decide: case_created, case_bound, case_routed, case_prioritised, action_decomposed, approval_requested, approval_granted, approval_denied, escalation_triggered
  Act: action_started, action_dispatched, action_accepted, action_executed, action_failed, action_retried, human_rescue_initiated, recovery_completed, validation_started, validation_passed, validation_failed, journey_completed, journey_abandoned, journey_reopened

JourneyStatus:
  active, completed, stalled, abandoned, reworking

JourneyOutcome:
  successful, partially_successful, failed, accepted_risk, cancelled, abandoned, merged, superseded, pending

JourneyAnchorType:
  case, finding, ioc_match, mission, strategy_policy, inbound_signal, push_action, war_room, exposure_programme
```

### 5.2 Journey Entity

```
Journey:
  journeyId: string (deterministic)
  templateRef: string | null
  anchorType: JourneyAnchorType
  anchorId: string
  parentJourneyId: string | null
  currentPhase: OodaStage
  currentCheckpoint: LifecycleCheckpoint
  status: JourneyStatus
  outcome: JourneyOutcome
  startedAt: string (ISO 8601)
  completedAt: string | null
  deliveryMode: DeliveryMode
  reworkCount: number
  childCount: number
  + CommonFields (id, tenant, source, createdAt, updatedAt)
```

Properties:
- Lightweight state carrier
- Mutable (status, phase, checkpoint, outcome update on progression)
- Created when first lifecycle checkpoint occurs
- Outcome set to pending at creation, transitions to terminal value at completion
- Outcome immutable once terminal
- Lives in journey database schema
- Queried via operational-read (bounded by active journey count)
- Archived 90 days after completion

### 5.3 Journey Template

```
JourneyTemplate:
  templateId: string
  name: string
  anchorType: JourneyAnchorType
  parentAnchorType: JourneyAnchorType | null
  applicability: { caseTypes?, domains?, d3fendTactics?, anchorSubtype? }
  expectedCheckpoints: LifecycleCheckpoint[]
  expectedPhases: OodaStage[]
  expectedDeliveryModes: DeliveryMode[]
  expectedOutcomeDistribution: Record<JourneyOutcome, number>
  tempoThresholds: Record<OodaStage, number> (max hours per phase)
  leakageThresholdHours: number
  formulaRefs: string[]
  version: string
  status: active | draft | retired
  + CommonFields
```

Properties:
- Reference data (~33 templates)
- Descriptive, not prescriptive
- Deviation detected and flagged, not prevented
- Governed (version, status lifecycle)
- Tenant-customisable tempo thresholds
- Lives in journey schema

### 5.4 Audit Event Extension (5 Nullable Fields)

```
AuditEvent (additive, nullable):
  + oodaStage?: OodaStage
  + deliveryMode?: DeliveryMode
  + lifecycleCheckpoint?: LifecycleCheckpoint
  + journeyId?: string
  + parentJourneyId?: string
```

Properties:
- Written ONCE at event creation (immutable)
- Computed by tagger engines at write-time
- Nullable for backward compatibility
- Indexed (tenant-leading composites)
- Never queried directly by dashboards

### 5.5 Formula Hosting (Strategy Policy Surface #20)

Formulas are strategy policies of surface type journey-intelligence-formula.

Inherits: versioning, tenant scope, approval lifecycle, audit trail, simulation capability, override model.

Configuration payload per formula:
```
formulaFamily: FormulaFamily
formulaVersion: string
weights: Record<string, number>
thresholds: { green: number, amber: number, red?: number }
applicability: { anchorTypes?, caseTypes?, domains? }
scope: platform_default | tenant_default | tenant_override
```

### 5.6 Identity Strategy

Journey ID derivation (deterministic, write-time):

| Anchor Type | Journey ID |
|---|---|
| Case | journey-case-{caseId} |
| Finding | journey-finding-{findingId} |
| IOC Match | journey-ioc-{matchId} |
| Mission | journey-mission-{missionId} |
| Strategy Policy | journey-strategy-{policyId} |
| Inbound Signal | journey-signal-{signalBatchId} |
| Push Action | journey-push-{intentId} |
| War Room | journey-warroom-{warRoomId} |
| Exposure Programme | journey-programme-{missionId} |

When a pre-case journey becomes case-anchored: Journey entity updates anchorType and anchorId. Audit events already written retain original journeyId. Read model resolves both via Journey entity history.

### 5.7 Hierarchy Model

- Authority: Journey hierarchy depth is UNBOUNDED in the data model
- parentJourneyId creates a linked chain of arbitrary depth
- Implementation v1: depth 2 (parent + child)
- Depth 3+ requires explicit governance decision in DECISIONS.md
- Conformance pipeline warns on depth 3+ creation
- Schema supports deeper hierarchy without migration

### 5.8 Database Schema Placement

| Entity | DB Schema | Workload Classes |
|---|---|---|
| Journey | journey | operational-write (create/update), operational-read (status queries) |
| JourneyTemplate | journey | operational-read (consumed by taggers) |
| AuditEvent extension | audit (existing) | ingestion-write |
| Formula policies | core (existing strategy table) | operational-read |
| Read models | analytics | analytics-read |

---

## 6. Journey Template Catalogue (33 Templates)

### Signal Intake Journeys (4)

| ID | Name | Anchor | Phases | Typical Mode |
|---|---|---|---|---|
| JT-SIG-001 | IOC Email Intake | inbound_signal | O, Or, D | system_driven |
| JT-SIG-002 | IOC Feed Intake | inbound_signal | O, Or | system_driven |
| JT-SIG-003 | Vulnerability Intelligence Intake | inbound_signal | O, Or, D | system_driven |
| JT-SIG-004 | Connector Signal Intake (A/B/C) | inbound_signal | O | system_driven |

### Enrichment and Evaluation Journeys (3)

| ID | Name | Anchor | Phases | Typical Mode |
|---|---|---|---|---|
| JT-ENR-001 | IOC Enrichment and Matching | ioc_match | Or, D | system_driven |
| JT-ENR-002 | Vulnerability Estate Evaluation | ioc_match | Or, D | system_driven |
| JT-ENR-003 | Threat Relevance Scoring | inbound_signal | Or | system_driven |

### Case Lifecycle Journeys (12)

| ID | Name | Case Type | Phases | Typical Modes |
|---|---|---|---|---|
| JT-CASE-001 | Drift Case | drift | O, Or, D, A | system_driven, human_confirmed_automation |
| JT-CASE-002 | Vulnerability Case | vulnerability | O, Or, D, A | system_driven, human_confirmed_automation |
| JT-CASE-003 | Identity Case | identity | O, Or, D, A | human_confirmed_automation, manual |
| JT-CASE-004 | Exposure Case | exposure | O, Or, D, A | system_driven, human_confirmed_automation |
| JT-CASE-005 | Coverage Case | coverage | O, Or, D, A | system_driven |
| JT-CASE-006 | Tool Health Case | tool-health | O, Or, D, A | system_driven |
| JT-CASE-007 | Threat Intelligence Estate Match | threat-intelligence-estate-match | O, Or, D, A | system_driven, ai_enhanced |
| JT-CASE-008 | External Attack Correlation | external-attack-correlation | O, Or, D, A | human_confirmed_automation, manual |
| JT-CASE-009 | Verdict Pattern Case | verdict-pattern | O, Or, D, A | human_confirmed_automation, manual |
| JT-CASE-010 | Inverse Discovery Blindspot | inverse-discovery-coverage-blindspot | O, Or, D, A | system_driven |
| JT-CASE-011 | Policy Effectiveness Case | policy-effectiveness | O, Or, D, A | system_driven, ai_enhanced |
| JT-CASE-012 | OODA Tempo Degradation | ooda-tempo-degradation | O, Or, D, A | system_driven |

### Action and Execution Journeys (6)

| ID | Name | Anchor | Parent | Phases | Typical Modes |
|---|---|---|---|---|---|
| JT-ACT-001 | Remediation (Isolate) | action | case | D, A | human_confirmed_automation |
| JT-ACT-002 | Remediation (Evict) | action | case | D, A | human_confirmed_automation, manual |
| JT-ACT-003 | Remediation (Restore) | action | case | D, A | manual, human_confirmed_automation |
| JT-ACT-004 | Remediation (Harden) | action | case | D, A | system_driven, human_confirmed_automation |
| JT-ACT-005 | Remediation (Detect) | action | case | D, A | system_driven, ai_enhanced |
| JT-ACT-006 | Automated Push Action | push_action | case/ioc_match | D, A | human_confirmed_automation, autonomous |

### Strategic and Operational Journeys (5)

| ID | Name | Anchor | Phases | Typical Modes |
|---|---|---|---|---|
| JT-MIS-001 | Mission Lifecycle | mission | O, Or, D, A | manual, ai_enhanced |
| JT-WAR-001 | War Room Coordination | war_room | O, Or, D, A | manual, human_confirmed_automation |
| JT-STR-001 | Strategy Policy Lifecycle | strategy_policy | D, A | manual, system_driven |
| JT-STR-002 | Exposure Reduction Programme | mission (exposure) | O, Or, D, A | system_driven, human_confirmed_automation |
| JT-GOV-001 | Risk Acceptance Journey | case (accepted_risk) | Or, D | manual, human_confirmed_automation |

### Control and Posture Journeys (3)

| ID | Name | Anchor | Phases | Typical Modes |
|---|---|---|---|---|
| JT-CTL-001 | Control Validation | finding | O, Or, D | system_driven |
| JT-CTL-002 | Posture Classification | finding | O, Or | system_driven |
| JT-AUT-001 | Autonomous Operation | varies | O, Or, D, A | autonomous |

---

## 7. Formula Catalogue (10 Families)

### 7.1 Journey Quality

- **Purpose:** Measures whether journeys end well, not just quickly
- **Inputs:** validation_pass_rate, outcome_success_rate, rework_rate (inverted), override_rate (inverted), reopening_rate (inverted)
- **Default Weights:** validation_pass_rate: 0.25, outcome_success_rate: 0.30, rework_rate: 0.20, override_rate: 0.10, reopening_rate: 0.15
- **Thresholds:** green: >=80, amber: >=60, red: <60
- **Applies To:** All case templates, action templates
- **Tenant Tunable:** All weights, all thresholds, input inclusion/exclusion

### 7.2 Journey Complexity

- **Purpose:** Measures structural complexity of journeys
- **Inputs:** checkpoint_count, actor_count, phase_count, approval_gate_count, rework_count, child_journey_count, escalation_count, delivery_mode_change_count
- **Default Weights:** checkpoint_count: 0.15, actor_count: 0.20, phase_count: 0.10, approval_gate_count: 0.20, rework_count: 0.15, child_journey_count: 0.05, escalation_count: 0.10, delivery_mode_change_count: 0.05
- **Thresholds:** low: <=30, medium: 31-60, high: >60
- **Applies To:** All templates (normalised against template expectations)
- **Tenant Tunable:** Weights, baseline expectations per template

### 7.3 Journey Economics

- **Purpose:** Measures cost, effort, savings and value
- **Inputs:** total_duration_hours, estimated_effort_hours, actual_effort_hours, baseline_duration_hours, automation_drag_hours, human_rescue_hours, rework_cost_hours, outcome
- **Default Weights:** time_saved: 0.25, effort_efficiency: 0.25, automation_contribution: 0.20, outcome_value: 0.30
- **Thresholds:** high_value: >=70, moderate_value: 40-69, low_value: <40
- **Impact Output:** impactClassification, riskDelta, exposureDelta, controlImprovement, timeSavedHours, effortSavedHours
- **Applies To:** All case templates, action templates, mission templates
- **Tenant Tunable:** All weights, baseline durations, outcome value mapping

### 7.4 Lifecycle Savings

- **Purpose:** Measures time saved versus baseline per OODA phase
- **Inputs:** per_phase_baseline_hours (from template), per_phase_actual_hours (from checkpoints), delivery_mode_per_phase
- **Default Weights:** observe_savings: 0.20, orient_savings: 0.30, decide_savings: 0.25, act_savings: 0.25
- **Thresholds:** green: >=30% saved, amber: 10-29%, red: <10% or negative
- **Applies To:** All case templates, enrichment templates, action templates
- **Tenant Tunable:** Baseline hours per phase per template, phase weights

### 7.5 Automation Opportunity

- **Purpose:** Scores how automatable a journey type is
- **Inputs:** determinism_score, connector_available, evidence_pre_available, approval_required, repeatability_score, historical_success_rate, variance_score
- **Default Weights:** determinism: 0.25, connector_available: 0.15, evidence_pre_available: 0.15, approval_required: -0.15, repeatability: 0.15, historical_success: 0.10, low_variance: 0.05
- **Thresholds:** high: >=70, medium: 40-69, low: <40
- **Applies To:** All templates
- **Tenant Tunable:** All weights, approval gate impact

### 7.6 Automation Friction

- **Purpose:** Measures resistance between decision and execution
- **Inputs:** drag_hours, failure_rate, rescue_rate, retry_count, recovery_hours, connector_reliability
- **Default Weights:** drag: 0.20, failure_rate: 0.30, rescue_rate: 0.20, retry_count: 0.15, recovery_hours: 0.10, connector_reliability: 0.05
- **Thresholds:** low: <=20, medium: 21-50, high: >50 (lower is better)
- **Applies To:** Action templates, case templates where delivery_mode includes automation
- **Tenant Tunable:** All weights, acceptable drag threshold, connector targets

### 7.7 Automation Maturity

- **Purpose:** Tracks delivery mode progression toward autonomous
- **Inputs:** delivery_mode_distribution, trend_direction, autonomous_success_rate
- **Default Weights:** manual_fraction: -0.30, autonomous_fraction: 0.30, system_driven_fraction: 0.15, ai_enhanced_fraction: 0.10, trend_improvement: 0.10, autonomous_success: 0.05
- **Thresholds:** mature: >=70, developing: 40-69, immature: <40
- **Applies To:** All templates (grouped by type)
- **Tenant Tunable:** Target maturity per template, band thresholds

### 7.8 Journey Confidence

- **Purpose:** Estimates likelihood of successful outcome for active journeys
- **Inputs:** phase_progress_ratio, checkpoint_adherence, evidence_confidence_avg, decision_confidence_avg, rework_occurring, template_deviation
- **Default Weights:** phase_progress: 0.15, checkpoint_adherence: 0.20, evidence_confidence: 0.20, decision_confidence: 0.20, no_rework: 0.15, no_deviation: 0.10
- **Thresholds:** high: >=75, medium: 50-74, low: <50
- **Applies To:** All case templates, action templates, mission templates
- **Tenant Tunable:** All weights, confidence-driven alerting rules

### 7.9 Leakage Risk

- **Purpose:** Predicts which active journeys are at risk of leaking
- **Inputs:** time_at_current_checkpoint_hours, template_expected_hours, historical_leakage_rate, delivery_mode, phase, child_journey_stall
- **Default Weights:** time_overshoot_ratio: 0.35, historical_leakage_rate: 0.25, manual_delivery: 0.15, orient_decide_phase: 0.10, child_stall: 0.15
- **Thresholds:** high_risk: >=70, medium_risk: 40-69, low_risk: <40
- **Applies To:** All active journeys (15-minute detection cycle)
- **Tenant Tunable:** Expected checkpoint durations (via template), risk thresholds

### 7.10 Rework Risk

- **Purpose:** Predicts which journeys are likely to require rework
- **Inputs:** evidence_sufficiency, decision_override_history, connector_reliability_for_type, validation_readiness, template_historical_rework_rate
- **Default Weights:** evidence_sufficiency: 0.25, historical_override_rate: 0.20, connector_reliability: 0.20, validation_readiness: 0.15, template_historical_rate: 0.20
- **Thresholds:** high_risk: >=60, medium_risk: 30-59, low_risk: <30
- **Applies To:** Active journeys in Decide or Act phase
- **Tenant Tunable:** Evidence sufficiency definition, risk thresholds

---

## 8. Read Model Architecture (7 Foundation Models)

| # | Model | Purpose | Refresh | Workload |
|---|---|---|---|---|
| 1 | journey_lifecycle_tempo | Per-journey, per-phase durations, checkpoint chain | Hourly | analytics-read |
| 2 | automation_friction_metrics | Drag, failure rate, rescue rate per action type/connector | Hourly | analytics-read |
| 3 | journey_leakage_report | Stalled journeys past template thresholds | Every 15 min | analytics-read |
| 4 | delivery_mode_distribution | Mode split per journey type/time period | Daily | analytics-read |
| 5 | journey_quality_scores | Composite quality per journey type (formula-driven) | Daily | analytics-read |
| 6 | journey_rework_analysis | Rework count, causes, cost per journey type | Daily | analytics-read |
| 7 | journey_outcome_analysis | Outcome distribution per template, trends, correlations | Daily | analytics-read |

Deferred read models (Phase 2+):
- automation_maturity_trend (needs 30+ days data)
- journey_economics (needs formula calibration)
- journey_convergence_map (needs pattern maturity)
- journey_predictability (needs 90+ days data)

---

## 9. Tagger Engine Architecture (4 Engines)

| Engine | Input | Output | Logic |
|---|---|---|---|
| OODA Stage Tagger | audit event action string | OodaStage | Rule-based mapping (~40 action-to-stage rules) |
| Delivery Mode Tagger | audit event actor.type + action + approval context | DeliveryMode | Actor-type-based with context refinement |
| Lifecycle Checkpoint Resolver | entityRef.entityType + action | LifecycleCheckpoint | Entity-state-to-checkpoint mapping |
| Journey ID Resolver | entity reference chain | journeyId + parentJourneyId | Deterministic derivation from root entity |

All engines are pure functions. No side effects. No API calls. Testable in isolation.

---

## 10. AI Analyst Integration

### Consumption Levels

| Level | Source | AI Can Do |
|---|---|---|
| Journey State | Journey entity | "This journey is in Act phase, stalled at action_dispatched, rework count 2" |
| Journey Metrics | Read model outputs | "Automation drag is 4.2 hours, quality score 65, template deviation detected" |
| Formula Explanations | Formula inputs + weights | "Quality score 65 driven by: validation pass rate 70% (weight 0.3), rework count 2 (weight 0.25)" |

### Knowledge Export Eligibility

Journey and JourneyTemplate entities are eligible for future knowledge export (addition to KNOWLEDGE_ELIGIBLE_ENTITIES in knowledge-export-registry.ts).

### AI Guardrails

1. AI must never recommend REDUCING human oversight based solely on automation maturity metrics
2. AI must cite traceable journey evidence (journeyId, checkpoint, metric) for all recommendations
3. AI must not reconstruct analyst behaviour from journey data
4. AI may surface automation promotion OPPORTUNITY but must not execute it
5. AI must label uncertainty when journey data is incomplete

---

## 11. Automation Model

### Delivery Mode Taxonomy

```
Manual → System Driven → AI Enhanced → Human Confirmed Automation → Autonomous
```

### Automation Chain (DESCRIPTIVE, Not Prescriptive)

Commander measures observable checkpoint transitions. The following states MAY be observed:

```
Decision → Queue → Dispatch → Accept → Execute → Delay → Fail → Retry → Rescue → Recovery → Validate → Close
```

Not every workflow traverses all states. The framework observes what occurred rather than requiring all transitions.

### Automation Friction Derivation

Friction metrics are derived from temporal gaps between audit events with specific action values. No new entity states required. Friction is computed from the audit event temporal chain, not from entity-level status fields.

---

## 12. Governance Model

### Conformance Assertions

| Rule ID | Rule |
|---|---|
| ARCH-JI-001 | Every new entity/engine must declare Journey Intelligence adoption path |
| ARCH-JI-002 | Lifecycle checkpoint enum bounded at 50 values maximum |
| ARCH-JI-003 | No operational-read dependency on read models |
| ARCH-JI-004 | Formula changes require strategy policy governance |
| ARCH-JI-005 | Journey depth v1 limited to 2 (conformance warns at 3+) |
| ARCH-JI-006 | Journey entity status updates only via Journey Intelligence engines |
| ARCH-JI-007 | Terminal journeys must have outcome set to non-pending value |
| ARCH-JI-008 | Journey outcome is immutable once set to non-pending value |

### Future Feature Adoption Rule

Every new feature must declare:
- Creates journey? Joins journey? Child journey?
- Anchor type?
- Checkpoints emitted?
- Delivery modes possible?
- Affected formula families?
- Template required?

### Authority-Level Controls (Non-Negotiable)

1. Commander measures WORKFLOW intelligence, not HUMAN performance
2. No individual analyst comparison from journey data
3. No click/navigation/view tracking
4. SOC boundary preserved (aggregate metrics only from SOC)
5. No duplicate SIEM/telemetry warehouse
6. Aggregation before presentation (dashboards query read models only)
7. Journey data cannot be exported at individual-analyst granularity

---

## 13. Performance Constraints

### Storage

- Audit event extension: ~75 bytes per event additional
- Journey entity: ~1 KB per active journey
- Templates: ~500 bytes per template (reference data)
- Read models: bounded by journey/template count, not event volume

### Indexing

- (tenant_id, journey_id, created_at DESC)
- (tenant_id, ooda_stage, created_at DESC)
- (tenant_id, delivery_mode, created_at DESC)
- (tenant_id, lifecycle_checkpoint, created_at DESC)
- WHERE parent_journey_id IS NOT NULL (partial index)
- Journey: (tenant_id, status, current_phase), (tenant_id, anchor_type, anchor_id)

### Retention

- Audit events: hot 72h, warm 30d, cold archive (inherits existing)
- Journey entity: active indefinitely, completed archived after 90 days
- Read models: latest computation + 30-day trend history
- Templates: indefinite (reference data)

### Workload Separation

- Audit event writes: ingestion-write
- Journey entity create/update: operational-write
- Journey entity query: operational-read
- Read model refresh: analytics-read (source) + operational-write (target)
- Dashboard consumption: analytics-read ONLY
- Template/formula lookup: operational-read

---

## 14. Build Sequencing

### Foundation (Single Pass — Must Not Be Deferred)

1. Strategy surface enum migration (13 → 20, resolves existing debt)
2. New enums (OodaStage, DeliveryMode, LifecycleCheckpoint, JourneyStatus, JourneyOutcome, JourneyAnchorType)
3. Journey entity (contract + schema + fixture)
4. JourneyTemplate entity (contract + schema + 33 template fixtures)
5. Audit event extension (contract + migration + fixture update)
6. Tagger engines (4 pure functions)
7. Formula engine framework (10 family shells)
8. Default formula pack (10 strategy policy fixtures)
9. Read model schemas (7 tables in analytics schema)
10. Read model refresh logic (scheduled computation engines)

### Deferred (Phase 2+)

- automation_maturity_trend read model
- journey_economics read model (full)
- journey_convergence_map read model
- Observed Automation Opportunity engine
- Journey Predictability engine
- Control plane formula management UI
- Dashboard surfaces (after BP-19)
- AI Analyst active consumption (after AI Phase 2)

---

## 15. Authority and Lineage

This document is the deep authority for Journey Intelligence. It is referenced by:

- Baseline Spec #58 (Security OODA Loop) — phase framework consumed
- Baseline Spec #67 (OODA Dashboard Family) — future dashboard integration
- Baseline Spec #32 (Strategy Layer Runtime Surface) — formula hosting
- docs/00_authority/PERFORMANCE_DOCTRINE.md (workload class discipline)
- docs/00_authority/DATABASE_LAYER_STRATEGY.md (schema placement, indexing, partitioning)
- docs/00_authority/DATA_LAYER_STRATEGY.md (read model architecture)

Where any other document conflicts on Journey Intelligence specifics, this document wins.
