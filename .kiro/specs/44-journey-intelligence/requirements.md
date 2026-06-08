# Requirements Document

> Journey Intelligence (Spec 44)

## Introduction

Journey Intelligence is Commander's capability for understanding how security work travels through the organisation from first signal to validated outcome. It is the measurement, attribution, optimisation and AI-grounding spine for Commander's security operating model, and a **peer capability** to the Security OODA Loop (baseline Spec #58) — OODA provides the vocabulary, Journey Intelligence provides the measurement.

This spec translates the **JI-1.0 authority document** (`docs/00_authority/JOURNEY_INTELLIGENCE.md`) into executable requirements. JI-1.0 is the binding authority; where this spec is silent or conflicts, JI-1.0 governs. This is the Kiro translation layer (Tier 5) and is NOT source authority.

**Domain:** D-47 Journey Intelligence (cross-cutting + analytics).
**Build unit:** Unit 51 (REBASELINED_BUILD_SEQUENCE.md).
**Entities:** Journey, JourneyTemplate (DATA_DICTIONARY.md #88, #89).
**Use cases:** UC-213 … UC-220 (USE_CASE_REGISTER.md).
**Delivery mode:** SYSTEM (deterministic measurement; AI consumes outputs but never owns them — system-first-doctrine.md).

### Scope boundaries (non-negotiable, from JI-1.0 §1, §12)

- Journey Intelligence measures **workflow** intelligence, NOT human performance.
- No per-analyst performance comparison; no click/navigation/view tracking.
- The SOC boundary is preserved — only aggregate metrics from SOC sources; no SOC-internal journey reconstruction.
- Commander is not a duplicate SIEM or raw telemetry warehouse.
- Dashboards consume read models only (aggregation before presentation).
- Journey data cannot be exported at individual-analyst granularity.

### Out of scope for this spec (deferred per JI-1.0 §8, §14)

- `automation_maturity_trend`, full `journey_economics`, `journey_convergence_map`, `journey_predictability` read models.
- Observed Automation Opportunity and Journey Predictability engines.
- Control plane formula-management UI and dashboard surfaces (after BP-19).
- Active AI Analyst consumption (after AI Phase 2).
- No application code, live AWS resources, real vendor integrations, or billing — foundation (data + pure engines + fixtures) only, pending owner authorisation.

---

## Glossary

| Term | Definition |
|---|---|
| Journey | A complete lifecycle from first signal to validated outcome, anchor-agnostic (JI-1.0 §4). |
| Journey Anchor | The primary entity a journey is bound to (case, finding, ioc_match, mission, strategy_policy, inbound_signal, push_action, war_room, exposure_programme). |
| OODA Stage | Observe / Orient / Decide / Act phase attribution. |
| Delivery Mode | manual / system_driven / ai_enhanced / human_confirmed_automation / autonomous. |
| Lifecycle Checkpoint | A meaningful state transition within a journey (bounded enum, ~35 values, capped at 50). |
| Journey Template | Expected shape of a journey type — descriptive, not prescriptive (~33 templates). |
| Journey Status | active / completed / stalled / abandoned / reworking. |
| Journey Outcome | successful / partially_successful / failed / accepted_risk / cancelled / abandoned / merged / superseded / pending. |
| Tagger Engine | A pure function computing OODA stage, delivery mode, lifecycle checkpoint, or journey ID from an audit event. |
| Formula Family | One of 10 tunable analytic families hosted as strategy policies of surface type `journey-intelligence-formula`. |
| Read Model | An analytics-read aggregation surface; dashboards query these exclusively. |
| Journey Leakage | Work that enters the lifecycle but never reaches a valid terminal outcome. |

---

## Requirements

### Requirement 1: Journey Intelligence enumerations

**User Story:** As a platform engineer, I want the Journey Intelligence enumerations defined as canonical types, so that journeys, templates, and audit-event extensions share one bounded vocabulary.

#### Acceptance Criteria

1. THE SYSTEM SHALL define the `OodaStage` enumeration with exactly the values `observe`, `orient`, `decide`, `act`.
2. THE SYSTEM SHALL define the `DeliveryMode` enumeration with exactly the values `manual`, `system_driven`, `ai_enhanced`, `human_confirmed_automation`, `autonomous`.
3. THE SYSTEM SHALL define the `JourneyStatus` enumeration with exactly the values `active`, `completed`, `stalled`, `abandoned`, `reworking`.
4. THE SYSTEM SHALL define the `JourneyOutcome` enumeration with exactly the values `successful`, `partially_successful`, `failed`, `accepted_risk`, `cancelled`, `abandoned`, `merged`, `superseded`, `pending`.
5. THE SYSTEM SHALL define the `JourneyAnchorType` enumeration with exactly the values `case`, `finding`, `ioc_match`, `mission`, `strategy_policy`, `inbound_signal`, `push_action`, `war_room`, `exposure_programme`.
6. THE SYSTEM SHALL define the `LifecycleCheckpoint` enumeration grouped by OODA stage per JI-1.0 §5.1.
7. WHERE the `LifecycleCheckpoint` enumeration is defined, THE SYSTEM SHALL NOT exceed 50 values (conformance rule ARCH-JI-002).

### Requirement 2: Journey entity

**User Story:** As an analytics consumer, I want a Journey entity that carries the workflow state from first signal to validated outcome, so that tempo, leakage, quality, and automation maturity can be measured per piece of security work. (UC-213, UC-214)

#### Acceptance Criteria

1. THE SYSTEM SHALL define a `Journey` entity with the fields `journeyId`, `templateRef`, `anchorType`, `anchorId`, `parentJourneyId`, `currentPhase`, `currentCheckpoint`, `status`, `outcome`, `startedAt`, `completedAt`, `deliveryMode`, `reworkCount`, `childCount` plus the common fields (`id`, `tenant`, `source`, `createdAt`, `updatedAt`).
2. WHEN a Journey is created, THE SYSTEM SHALL set its `outcome` to `pending`.
3. WHEN a Journey reaches a terminal status, THE SYSTEM SHALL set its `outcome` to a non-`pending` value (conformance rule ARCH-JI-007).
4. WHILE a Journey `outcome` holds a non-`pending` value, THE SYSTEM SHALL reject any change to that `outcome` (conformance rule ARCH-JI-008 — immutability once terminal).
5. THE SYSTEM SHALL derive `journeyId` deterministically from the anchor per the JI-1.0 §5.6 mapping (e.g. `journey-case-{caseId}`).
6. THE SYSTEM SHALL update Journey `status`, `currentPhase`, `currentCheckpoint`, and `outcome` ONLY via Journey Intelligence engines (conformance rule ARCH-JI-006).
7. WHERE a Journey declares a `parentJourneyId`, THE SYSTEM SHALL support a hierarchy depth of 2 in v1 AND SHALL emit a conformance warning when depth 3 or greater is created (conformance rule ARCH-JI-005).

### Requirement 3: JourneyTemplate entity and catalogue

**User Story:** As a security operating model owner, I want journey templates describing the expected shape of each journey type, so that deviations and leakage can be detected against a baseline. (UC-216)

#### Acceptance Criteria

1. THE SYSTEM SHALL define a `JourneyTemplate` entity with the fields `templateId`, `name`, `anchorType`, `parentAnchorType`, `applicability`, `expectedCheckpoints`, `expectedPhases`, `expectedDeliveryModes`, `expectedOutcomeDistribution`, `tempoThresholds`, `leakageThresholdHours`, `formulaRefs`, `version`, `status` plus common fields.
2. THE SYSTEM SHALL provide seed fixtures for the 33 journey templates catalogued in JI-1.0 §6 (4 signal-intake, 3 enrichment, 12 case-lifecycle, 6 action/execution, 5 strategic/operational, 3 control/posture).
3. THE SYSTEM SHALL treat templates as descriptive: WHEN a journey deviates from its template, THE SYSTEM SHALL flag the deviation AND SHALL NOT prevent the journey from proceeding.
4. THE SYSTEM SHALL support a template `status` lifecycle of `active`, `draft`, `retired`.
5. WHERE a tenant customises `tempoThresholds`, THE SYSTEM SHALL honour the tenant value over the platform default.

### Requirement 4: Audit event extension

**User Story:** As a platform engineer, I want journey attribution carried on audit events, so that journeys can be reconstructed from the existing audit chain without a new telemetry store.

#### Acceptance Criteria

1. THE SYSTEM SHALL extend the AuditEvent entity with the nullable fields `oodaStage`, `deliveryMode`, `lifecycleCheckpoint`, `journeyId`, `parentJourneyId`.
2. WHEN an audit event is created, THE SYSTEM SHALL compute and write the journey-attribution fields exactly once via the tagger engines.
3. WHILE an audit event exists, THE SYSTEM SHALL treat its journey-attribution fields as immutable.
4. THE SYSTEM SHALL keep the journey-attribution fields nullable for backward compatibility with audit events written before this capability.
5. THE SYSTEM SHALL NOT require dashboards to query audit events directly for journey metrics (conformance rule ARCH-JI-003 — read models only).

### Requirement 5: Tagger engines

**User Story:** As a platform engineer, I want pure-function tagger engines, so that journey attribution is deterministic, side-effect-free, and testable in isolation. (UC-213)

#### Acceptance Criteria

1. THE SYSTEM SHALL provide an OODA Stage Tagger that maps an audit-event action string to an `OodaStage`.
2. THE SYSTEM SHALL provide a Delivery Mode Tagger that maps audit-event actor type, action, and approval context to a `DeliveryMode`.
3. THE SYSTEM SHALL provide a Lifecycle Checkpoint Resolver that maps entity reference type and action to a `LifecycleCheckpoint`.
4. THE SYSTEM SHALL provide a Journey ID Resolver that derives `journeyId` and `parentJourneyId` deterministically from an entity reference chain.
5. THE SYSTEM SHALL implement every tagger as a pure function with no side effects and no external API calls.

### Requirement 6: Formula framework and default pack

**User Story:** As a security operating model owner, I want formula-driven analytics hosted as governed strategy policies, so that measurement weights and thresholds are tunable per tenant without code change. (UC-217, UC-218)

#### Acceptance Criteria

1. THE SYSTEM SHALL host formulas as strategy policies of surface type `journey-intelligence-formula`, inheriting versioning, tenant scope, approval lifecycle, audit trail, simulation, and override behaviour from the strategy layer.
2. THE SYSTEM SHALL define the 10 formula families from JI-1.0 §7: Journey Quality, Journey Complexity, Journey Economics, Lifecycle Savings, Automation Opportunity, Automation Friction, Automation Maturity, Journey Confidence, Leakage Risk, Rework Risk.
3. THE SYSTEM SHALL provide a default formula pack (one seed strategy policy per family) carrying the default weights and thresholds specified in JI-1.0 §7.
4. WHEN a formula's weights or thresholds change, THE SYSTEM SHALL require strategy-policy governance (conformance rule ARCH-JI-004).
5. THE SYSTEM SHALL evaluate every formula as a pure computation over its declared inputs, returning a banded result (e.g. green/amber/red) per the family's thresholds.
6. WHERE the strategy surface enumeration is migrated from 13 to 20 values, THE SYSTEM SHALL resolve the pre-existing strategy-surface enum debt as part of the foundation pass (JI-1.0 §14 step 1).

### Requirement 7: Read model architecture

**User Story:** As an analytics consumer, I want the seven foundation read models, so that journey tempo, friction, leakage, mode distribution, quality, rework, and outcomes are available to dashboards and AI without touching raw events. (UC-214, UC-215, UC-219, UC-220)

#### Acceptance Criteria

1. THE SYSTEM SHALL define the seven foundation read models from JI-1.0 §8: `journey_lifecycle_tempo`, `automation_friction_metrics`, `journey_leakage_report`, `delivery_mode_distribution`, `journey_quality_scores`, `journey_rework_analysis`, `journey_outcome_analysis`.
2. THE SYSTEM SHALL place every read model in the analytics workload class (`analytics-read`).
3. WHEN the `journey_leakage_report` refreshes, THE SYSTEM SHALL identify journeys stalled past their template `leakageThresholdHours`.
4. THE SYSTEM SHALL bound read-model size by journey/template count rather than raw event volume.
5. THE SYSTEM SHALL NOT expose any read model at individual-analyst granularity.

### Requirement 8: Journey leakage detection

**User Story:** As an SOM, I want stalled journeys surfaced before they silently leak, so that work reaches a valid terminal outcome. (UC-215)

#### Acceptance Criteria

1. WHEN a journey remains at its current checkpoint longer than the template-expected duration, THE SYSTEM SHALL classify the journey as at risk of leakage per the Leakage Risk formula (JI-1.0 §7.9).
2. THE SYSTEM SHALL re-evaluate active-journey leakage on the cadence defined for `journey_leakage_report` (every 15 minutes per JI-1.0 §8).
3. WHERE a journey reaches `stalled` status, THE SYSTEM SHALL record the stall without forcing a terminal outcome.

### Requirement 9: Automation intelligence measurement

**User Story:** As an SOM, I want automation friction and maturity measured from the audit chain, so that automation opportunities and bottlenecks are visible. (UC-218, UC-219, UC-220)

#### Acceptance Criteria

1. THE SYSTEM SHALL derive automation friction metrics (drag, failure rate, rescue rate, retries, recovery) from temporal gaps between audit events, not from entity-level status fields (JI-1.0 §11).
2. THE SYSTEM SHALL score automation opportunity per journey type using the Automation Opportunity formula (JI-1.0 §7.5).
3. THE SYSTEM SHALL track delivery-mode progression per journey type using the Automation Maturity formula (JI-1.0 §7.7).
4. THE SYSTEM SHALL treat the automation chain (Decision → Queue → Dispatch → … → Close) as descriptive: THE SYSTEM SHALL observe whichever transitions occurred AND SHALL NOT require all transitions.

### Requirement 10: AI grounding and guardrails

**User Story:** As a governance owner, I want AI consumption of journey data bounded by explicit guardrails, so that AI augments but never owns security decisions or human oversight. (system-first-doctrine.md, ai-grounding.md)

#### Acceptance Criteria

1. THE SYSTEM SHALL mark `Journey` and `JourneyTemplate` as eligible for future knowledge export (knowledge-export registry), without per-record export wiring in this phase.
2. WHERE AI surfaces a recommendation from journey data, THE SYSTEM SHALL require traceable journey evidence (`journeyId`, checkpoint, metric) to accompany it.
3. THE SYSTEM SHALL NOT permit AI to recommend reducing human oversight based solely on automation-maturity metrics.
4. THE SYSTEM SHALL NOT permit reconstruction of individual analyst behaviour from journey data.

### Requirement 11: Performance and workload discipline

**User Story:** As a performance owner, I want journey workloads correctly classified, so that the capability honours Performance Doctrine PD-1.0 and remains tier-portable. (performance-discipline.md)

#### Acceptance Criteria

1. THE SYSTEM SHALL declare a workload class on every journey database operation: Journey create/update as `operational-write`, Journey/template query as `operational-read`, audit-event writes as `ingestion-write`, read-model refresh source as `analytics-read`.
2. THE SYSTEM SHALL NOT create cross-workload foreign keys between tables that may live in different physical databases (no FK from analytics read models to operational tables).
3. THE SYSTEM SHALL index journey and audit-extension tables with tenant-leading composite indexes per JI-1.0 §13.
4. THE SYSTEM SHALL route all analytical and reporting reads through read-model abstractions, even when those are views at T1.

### Requirement 12: Governance traceability and authority

**User Story:** As a governance owner, I want this capability fully traced through the knowledge-graph chain, so that no artefact floats without lineage. (traceability-chain.md)

#### Acceptance Criteria

1. THE SYSTEM SHALL trace every Journey Intelligence artefact back to domain D-47 and authority JI-1.0.
2. WHERE a new entity or engine is introduced, THE SYSTEM SHALL declare its Journey Intelligence adoption path (conformance rule ARCH-JI-001).
3. THE SYSTEM SHALL register Journey and JourneyTemplate in DATA_DICTIONARY.md before any entity code is written (DATA_DICTIONARY hard gate).
4. THE SYSTEM SHALL keep this Kiro spec consistent with JI-1.0; WHEN the two conflict on Journey Intelligence specifics, JI-1.0 governs and this spec is updated.
