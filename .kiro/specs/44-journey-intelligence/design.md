# Design Document

> Journey Intelligence (Spec 44)

**Spec ID:** `44-journey-intelligence`
**Target version:** v1.5+ (foundation pass — data layer + engines only)
**Authority:** `docs/00_authority/JOURNEY_INTELLIGENCE.md` (JI-1.0)
**Domain:** D-47 Journey Intelligence
**Build unit:** Unit 51 (REBASELINED_BUILD_SEQUENCE.md)

## Overview

Journey Intelligence is Commander's capability for measuring how security work travels through the organisation from first signal to validated outcome. It is the measurement, attribution, optimisation and AI-grounding spine for Commander's security operating model, and a **peer capability** to Spec #58 (Security OODA Loop). OODA provides the vocabulary; Journey Intelligence provides the measurement.

**This foundation pass delivers:**
- Canonical entity contracts (Journey, JourneyTemplate)
- 6 new enumerations
- Audit event extension (5 nullable fields)
- 4 pure-function tagger engines
- 10 formula family shells (hosted as strategy policies)
- 7 read-model table schemas
- 33 journey template seed fixtures
- 10 default formula seed fixtures

**This foundation pass does NOT deliver:**
- UI surfaces or pages
- Live database provisioning
- Dashboard rendering
- Active AI Analyst consumption
- Real-time event streaming infrastructure

## Architecture

### Architecture Placement

| Layer | Placement | Workload Class |
|---|---|---|
| Contracts (entities) | `packages/contracts/src/entities/journey.ts`, `journey-template.ts` | — |
| Contracts (enums) | `packages/contracts/src/entities/journey-enums.ts` | — |
| Engines (taggers) | `packages/contracts/src/engines/journey-intelligence/` | — |
| Engines (formulas) | `packages/contracts/src/engines/journey-intelligence/formulas/` | — |
| DB Schema (journey) | `packages/db/src/schema/journeys.ts`, `journey-templates.ts` | operational-write, operational-read |
| DB Schema (audit ext) | `packages/db/src/schema/audit-events.ts` (additive columns) | ingestion-write |
| DB Schema (read models) | `packages/db/src/schema/analytics/journey-read-models.ts` | analytics-read |
| Fixtures (entities) | `packages/contracts/src/fixtures/seed-journeys.ts`, `seed-journey-templates.ts` | — |
| Fixtures (formulas) | `packages/contracts/src/fixtures/seed-journey-formulas.ts` | — |
| Strategy surface ext | `packages/contracts/src/entities/strategy.ts` (enum migration 13→20) | operational-read |
| Testing | `tests/journey-intelligence/` | — |
| AWS | Not applicable (no live infrastructure) | — |

### Source Inputs

| Source | Role |
|---|---|
| `docs/00_authority/JOURNEY_INTELLIGENCE.md` (JI-1.0) | **Binding authority** — data model, enums, templates, formulas, engines, governance |
| `docs/00_authority/PERFORMANCE_DOCTRINE.md` (PD-1.0) | Workload classification, tier discipline, indexing strategy |
| `docs/00_authority/DATABASE_LAYER_STRATEGY.md` | Schema placement, partitioning guidance, Postgres-family portability |
| `docs/00_authority/DATA_LAYER_STRATEGY.md` | Read-model architecture, refresh cadence, analytics workload |
| `packages/contracts/src/entities/strategy.ts` | Strategy surface type enum (existing — migrated from 13→20 values) |
| `packages/contracts/src/entities/audit-event.ts` | Existing AuditEvent contract (extended additively) |
| `packages/db/src/schema/audit-events.ts` | Existing audit DB schema (extended additively) |
| Baseline Spec #58 (Security OODA Loop) | OODA phase vocabulary consumed |
| Baseline Spec #32 (Strategy Layer Runtime Surface) | Formula hosting mechanism |

### Cross-Workload Boundary Rules (PD-1.0)

| Boundary | Rule |
|---|---|
| Journey → AuditEvent | No FK. Journey references audit events by journeyId written on audit events. Resolved at read-model computation time. |
| Read models → Journey | No FK. Read models computed from Journey + AuditEvent data via scheduled refresh. Analytics schema only. |
| Read models → Strategy | No FK. Formula weights/thresholds read at computation time via operational-read, not joined. |
| Journey → Case/Mission/etc | No FK. `anchorId` is a string reference resolved at application layer. |

### Data Flow

```
Audit Event (ingestion-write)
  │
  ├─── Tagger Engines (pure functions, write-time)
  │     ├── OODA Stage Tagger → oodaStage field
  │     ├── Delivery Mode Tagger → deliveryMode field
  │     ├── Lifecycle Checkpoint Resolver → lifecycleCheckpoint field
  │     └── Journey ID Resolver → journeyId + parentJourneyId fields
  │
  ├─── Journey Entity (operational-write: create/update)
  │     └── Status, phase, checkpoint, outcome progression
  │
  └─── Read Model Refresh (scheduled, analytics-read)
        ├── journey_lifecycle_tempo (hourly)
        ├── automation_friction_metrics (hourly)
        ├── journey_leakage_report (15 min)
        ├── delivery_mode_distribution (daily)
        ├── journey_quality_scores (daily)
        ├── journey_rework_analysis (daily)
        └── journey_outcome_analysis (daily)
```

## Components and Interfaces

### Component Registry

| Component | Type | Location | Consumes | Produces |
|---|---|---|---|---|
| Journey entity contract | Entity | `packages/contracts/src/entities/journey.ts` | CommonFields, journey-enums | Journey type |
| JourneyTemplate entity contract | Entity | `packages/contracts/src/entities/journey-template.ts` | CommonFields, journey-enums | JourneyTemplate type |
| Journey enumerations | Enum module | `packages/contracts/src/entities/journey-enums.ts` | — | OodaStage, DeliveryMode, LifecycleCheckpoint, JourneyStatus, JourneyOutcome, JourneyAnchorType |
| OODA Stage Tagger | Pure engine | `packages/contracts/src/engines/journey-intelligence/ooda-stage-tagger.ts` | AuditEvent.action | OodaStage |
| Delivery Mode Tagger | Pure engine | `packages/contracts/src/engines/journey-intelligence/delivery-mode-tagger.ts` | AuditEvent.actor, action, approval context | DeliveryMode |
| Lifecycle Checkpoint Resolver | Pure engine | `packages/contracts/src/engines/journey-intelligence/lifecycle-checkpoint-resolver.ts` | AuditEvent.entityRef, action | LifecycleCheckpoint |
| Journey ID Resolver | Pure engine | `packages/contracts/src/engines/journey-intelligence/journey-id-resolver.ts` | Entity reference chain | journeyId, parentJourneyId |
| Formula Engine (10 families) | Pure engine | `packages/contracts/src/engines/journey-intelligence/formulas/` | Formula policy config, journey/read-model inputs | Banded score (green/amber/red) |
| Journey DB schema | DB schema | `packages/db/src/schema/journeys.ts` | journey-enums | Journey table |
| JourneyTemplate DB schema | DB schema | `packages/db/src/schema/journey-templates.ts` | journey-enums | JourneyTemplate table |
| Read model schemas (7) | DB schema | `packages/db/src/schema/analytics/journey-read-models.ts` | — | 7 analytics tables |
| Seed journeys | Fixture | `packages/contracts/src/fixtures/seed-journeys.ts` | Journey type | Seed data |
| Seed templates (33) | Fixture | `packages/contracts/src/fixtures/seed-journey-templates.ts` | JourneyTemplate type | 33 template fixtures |
| Seed formulas (10) | Fixture | `packages/contracts/src/fixtures/seed-journey-formulas.ts` | Strategy type | 10 formula policy fixtures |

### Interface Contracts

**Tagger Engine Interface (all 4 taggers):**
```typescript
// Pure function — no side effects, no API calls
type TaggerInput = { auditEvent: AuditEvent; context?: TaggerContext }
type TaggerOutput<T> = { value: T; confidence: 'deterministic' | 'inferred'; rule: string }
```

**Formula Engine Interface (all 10 families):**
```typescript
type FormulaInput = { inputs: Record<string, number>; weights: Record<string, number>; thresholds: FormulaThresholds }
type FormulaOutput = { score: number; band: 'green' | 'amber' | 'red'; breakdown: Record<string, number> }
```

**Journey ID Derivation (deterministic):**
```typescript
type JourneyIdInput = { anchorType: JourneyAnchorType; anchorId: string }
type JourneyIdOutput = { journeyId: string; parentJourneyId: string | null }
// Pattern: journey-{anchorType}-{anchorId}
```

## Data Models

### State Machine

```
Journey Status Transitions:
  active → completed (terminal)
  active → stalled (non-terminal — leakage detection)
  active → abandoned (terminal)
  active → reworking → active (cycle)
  stalled → active (unstall)
  stalled → abandoned (terminal)
  reworking → completed (terminal)
```

**Outcome immutability:** Once `outcome` transitions from `pending` to any terminal value, it is immutable (ARCH-JI-008).

### Hierarchy Model

```
Parent Journey (depth 0)
  └── Child Journey (depth 1)
        └── [depth 2+ — conformance WARNING, not blocked]
```

- v1 implementation: depth 2 maximum (parent + child)
- Schema supports unbounded depth via `parentJourneyId`
- Conformance pipeline emits warning at depth 3+
- Depth 3+ requires explicit `DECISIONS.md` entry (ARCH-JI-005)

### Database Schema Placement

| Entity | DB Schema | Workload Classes |
|---|---|---|
| Journey | `journey` | operational-write (create/update), operational-read (status queries) |
| JourneyTemplate | `journey` | operational-read (consumed by taggers) |
| AuditEvent extension | `audit` (existing) | ingestion-write |
| Formula policies | `core` (existing strategy table) | operational-read |
| Read models (7) | `analytics` | analytics-read |

### Indexing Strategy (JI-1.0 §13)

| Table | Index | Purpose |
|---|---|---|
| journey | `(tenant_id, journey_id, created_at DESC)` | Primary lookup |
| journey | `(tenant_id, status, current_phase)` | Active journey queries |
| journey | `(tenant_id, anchor_type, anchor_id)` | Anchor-based lookup |
| audit_events | `(tenant_id, ooda_stage, created_at DESC)` | Phase-based event queries |
| audit_events | `(tenant_id, delivery_mode, created_at DESC)` | Mode-based event queries |
| audit_events | `(tenant_id, lifecycle_checkpoint, created_at DESC)` | Checkpoint-based queries |
| audit_events | `WHERE parent_journey_id IS NOT NULL` (partial) | Hierarchy queries |

### Retention

| Data | Retention |
|---|---|
| Active journeys | Indefinite |
| Completed journeys | Archived after 90 days |
| Journey templates | Indefinite (reference data) |
| Audit events (journey fields) | Inherits existing: hot 72h, warm 30d, cold archive |
| Read models | Latest computation + 30-day trend history |

---

## Entity Definitions

### Enumerations (6 new types)

#### OodaStage

```typescript
export const OODA_STAGES = ['observe', 'orient', 'decide', 'act'] as const;
export type OodaStage = typeof OODA_STAGES[number];
```

**Req 1 AC-1.** Exactly 4 values. Consumed by: Journey.currentPhase, JourneyTemplate.expectedPhases, AuditEvent.oodaStage, OODA Stage Tagger output.

#### DeliveryMode

```typescript
export const DELIVERY_MODES = [
  'manual',
  'system_driven',
  'ai_enhanced',
  'human_confirmed_automation',
  'autonomous'
] as const;
export type DeliveryMode = typeof DELIVERY_MODES[number];
```

**Req 1 AC-2.** Exactly 5 values. Taxonomy progression: Manual → System Driven → AI Enhanced → Human Confirmed Automation → Autonomous. Consumed by: Journey.deliveryMode, JourneyTemplate.expectedDeliveryModes, AuditEvent.deliveryMode, Delivery Mode Tagger output.

#### JourneyStatus

```typescript
export const JOURNEY_STATUSES = [
  'active',
  'completed',
  'stalled',
  'abandoned',
  'reworking'
] as const;
export type JourneyStatus = typeof JOURNEY_STATUSES[number];
```

**Req 1 AC-3.** Exactly 5 values. Terminal statuses: `completed`, `abandoned`. Non-terminal: `active`, `stalled`, `reworking`.

#### JourneyOutcome

```typescript
export const JOURNEY_OUTCOMES = [
  'successful',
  'partially_successful',
  'failed',
  'accepted_risk',
  'cancelled',
  'abandoned',
  'merged',
  'superseded',
  'pending'
] as const;
export type JourneyOutcome = typeof JOURNEY_OUTCOMES[number];

export const TERMINAL_OUTCOMES: JourneyOutcome[] = [
  'successful', 'partially_successful', 'failed',
  'accepted_risk', 'cancelled', 'abandoned', 'merged', 'superseded'
];
```

**Req 1 AC-4.** Exactly 9 values. `pending` is the only non-terminal outcome. Once set to any other value, outcome is immutable (ARCH-JI-008).

#### JourneyAnchorType

```typescript
export const JOURNEY_ANCHOR_TYPES = [
  'case',
  'finding',
  'ioc_match',
  'mission',
  'strategy_policy',
  'inbound_signal',
  'push_action',
  'war_room',
  'exposure_programme'
] as const;
export type JourneyAnchorType = typeof JOURNEY_ANCHOR_TYPES[number];
```

**Req 1 AC-5.** Exactly 9 values. Each maps to a deterministic journeyId pattern per JI-1.0 §5.6.

#### LifecycleCheckpoint

```typescript
export const LIFECYCLE_CHECKPOINTS = {
  observe: [
    'signal_received',
    'signal_normalised',
    'signal_enriched',
    'coverage_assessed',
    'connector_pulled'
  ],
  orient: [
    'context_established',
    'drift_detected',
    'risk_scored',
    'blast_computed',
    'classification_assigned',
    'anomaly_detected',
    'correlation_completed',
    'entity_resolved'
  ],
  decide: [
    'case_created',
    'case_bound',
    'case_routed',
    'case_prioritised',
    'action_decomposed',
    'approval_requested',
    'approval_granted',
    'approval_denied',
    'escalation_triggered'
  ],
  act: [
    'action_started',
    'action_dispatched',
    'action_accepted',
    'action_executed',
    'action_failed',
    'action_retried',
    'human_rescue_initiated',
    'recovery_completed',
    'validation_started',
    'validation_passed',
    'validation_failed',
    'journey_completed',
    'journey_abandoned',
    'journey_reopened'
  ]
} as const;

export const ALL_LIFECYCLE_CHECKPOINTS = [
  ...LIFECYCLE_CHECKPOINTS.observe,
  ...LIFECYCLE_CHECKPOINTS.orient,
  ...LIFECYCLE_CHECKPOINTS.decide,
  ...LIFECYCLE_CHECKPOINTS.act
] as const;
// Total: 36 values (under the 50-value cap per ARCH-JI-002)

export type LifecycleCheckpoint = typeof ALL_LIFECYCLE_CHECKPOINTS[number];
```

**Req 1 AC-6, AC-7.** 36 values grouped by OODA stage (5 + 8 + 9 + 14 = 36). Bounded at 50 max (ARCH-JI-002). Consumed by: Journey.currentCheckpoint, JourneyTemplate.expectedCheckpoints, AuditEvent.lifecycleCheckpoint, Lifecycle Checkpoint Resolver output.

---

### Journey Entity

```typescript
export interface Journey {
  // Identity
  id: string;                          // CommonFields — internal UUID
  journeyId: string;                   // Deterministic: journey-{anchorType}-{anchorId}
  tenant: TenantContext;               // CommonFields

  // Anchor binding
  anchorType: JourneyAnchorType;
  anchorId: string;
  templateRef: string | null;          // templateId of matching JourneyTemplate

  // Hierarchy
  parentJourneyId: string | null;      // null = root journey

  // Current state
  currentPhase: OodaStage;
  currentCheckpoint: LifecycleCheckpoint;
  status: JourneyStatus;
  outcome: JourneyOutcome;             // 'pending' at creation; immutable once terminal
  deliveryMode: DeliveryMode;

  // Metrics
  reworkCount: number;                 // Incremented on active→reworking transition
  childCount: number;                  // Count of child journeys

  // Timestamps
  startedAt: string;                   // ISO 8601 — set at creation
  completedAt: string | null;          // ISO 8601 — set when terminal

  // CommonFields
  source: SourceMetadata;
  createdAt: string;
  updatedAt: string;
}
```

**Traces to:** Req 2 AC-1 (all fields), AC-2 (outcome=pending at creation), AC-3 (terminal outcome), AC-4 (immutability), AC-5 (deterministic ID), AC-6 (engine-only updates), AC-7 (hierarchy depth).

**Journey ID derivation (Req 2 AC-5, JI-1.0 §5.6):**

| Anchor Type | Pattern |
|---|---|
| case | `journey-case-{caseId}` |
| finding | `journey-finding-{findingId}` |
| ioc_match | `journey-ioc-{matchId}` |
| mission | `journey-mission-{missionId}` |
| strategy_policy | `journey-strategy-{policyId}` |
| inbound_signal | `journey-signal-{signalBatchId}` |
| push_action | `journey-push-{intentId}` |
| war_room | `journey-warroom-{warRoomId}` |
| exposure_programme | `journey-programme-{missionId}` |

**Validation function:**
```typescript
export function validateJourney(journey: Journey): JourneyValidation {
  // 1. journeyId matches derivation pattern for anchorType
  // 2. outcome === 'pending' if status is non-terminal
  // 3. outcome !== 'pending' if status is terminal (completed/abandoned)
  // 4. completedAt is set iff status is terminal
  // 5. parentJourneyId depth check (warn at 3+)
  // 6. reworkCount >= 0, childCount >= 0
  // 7. currentCheckpoint belongs to currentPhase's checkpoint group
}
```

---

### JourneyTemplate Entity

```typescript
export interface JourneyTemplate {
  // Identity
  id: string;                          // CommonFields
  templateId: string;                  // e.g. 'JT-CASE-001'
  tenant: TenantContext;               // CommonFields
  name: string;                        // e.g. 'Drift Case'

  // Anchor classification
  anchorType: JourneyAnchorType;
  parentAnchorType: JourneyAnchorType | null;

  // Applicability filter
  applicability: TemplateApplicability;

  // Expected shape (descriptive, not prescriptive)
  expectedCheckpoints: LifecycleCheckpoint[];
  expectedPhases: OodaStage[];
  expectedDeliveryModes: DeliveryMode[];
  expectedOutcomeDistribution: Partial<Record<JourneyOutcome, number>>;

  // Thresholds
  tempoThresholds: Partial<Record<OodaStage, number>>;  // max hours per phase
  leakageThresholdHours: number;

  // Formula references
  formulaRefs: string[];               // strategy policy IDs

  // Lifecycle
  version: string;                     // semver
  status: 'active' | 'draft' | 'retired';

  // CommonFields
  source: SourceMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateApplicability {
  caseTypes?: string[];
  domains?: string[];
  d3fendTactics?: string[];
  anchorSubtype?: string;
}
```

**Traces to:** Req 3 AC-1 (all fields), AC-2 (33 seed fixtures), AC-3 (descriptive not prescriptive), AC-4 (status lifecycle), AC-5 (tenant-customisable thresholds).

**Validation function:**
```typescript
export function validateJourneyTemplate(template: JourneyTemplate): TemplateValidation {
  // 1. templateId matches pattern JT-{category}-{number}
  // 2. expectedCheckpoints are valid LifecycleCheckpoint values
  // 3. expectedPhases are valid OodaStage values
  // 4. expectedDeliveryModes are valid DeliveryMode values
  // 5. tempoThresholds values > 0
  // 6. leakageThresholdHours > 0
  // 7. status is one of active/draft/retired
  // 8. version matches semver pattern
}
```

---

### Audit Event Extension

```typescript
// Additive extension to existing AuditEvent interface
export interface AuditEventJourneyExtension {
  oodaStage?: OodaStage;               // Nullable — computed by OODA Stage Tagger
  deliveryMode?: DeliveryMode;         // Nullable — computed by Delivery Mode Tagger
  lifecycleCheckpoint?: LifecycleCheckpoint;  // Nullable — computed by Checkpoint Resolver
  journeyId?: string;                  // Nullable — computed by Journey ID Resolver
  parentJourneyId?: string;            // Nullable — computed by Journey ID Resolver
}
```

**Traces to:** Req 4 AC-1 (5 nullable fields), AC-2 (computed once at creation), AC-3 (immutable after write), AC-4 (nullable for backward compat), AC-5 (no direct dashboard queries).

**Properties:**
- All 5 fields are nullable (backward compatibility with pre-JI audit events)
- Written exactly ONCE at audit event creation time via tagger engines
- NEVER updated after initial write (immutability guarantee)
- Indexed with tenant-leading composites (see Indexing Strategy above)
- Dashboards query read models, never audit events directly (ARCH-JI-003)

**DB Migration (additive-only):**
```sql
-- Migration: add journey attribution fields to audit_events
ALTER TABLE audit_events ADD COLUMN ooda_stage text;
ALTER TABLE audit_events ADD COLUMN delivery_mode text;
ALTER TABLE audit_events ADD COLUMN lifecycle_checkpoint text;
ALTER TABLE audit_events ADD COLUMN journey_id text;
ALTER TABLE audit_events ADD COLUMN parent_journey_id text;

-- Indexes (tenant-leading composites)
CREATE INDEX idx_audit_events_ooda ON audit_events (tenant_id, ooda_stage, created_at DESC) WHERE ooda_stage IS NOT NULL;
CREATE INDEX idx_audit_events_delivery ON audit_events (tenant_id, delivery_mode, created_at DESC) WHERE delivery_mode IS NOT NULL;
CREATE INDEX idx_audit_events_checkpoint ON audit_events (tenant_id, lifecycle_checkpoint, created_at DESC) WHERE lifecycle_checkpoint IS NOT NULL;
CREATE INDEX idx_audit_events_journey ON audit_events (tenant_id, journey_id, created_at DESC) WHERE journey_id IS NOT NULL;
CREATE INDEX idx_audit_events_parent_journey ON audit_events (tenant_id, parent_journey_id) WHERE parent_journey_id IS NOT NULL;
```

---

### Strategy Surface Type Migration

The existing `StrategySurfaceType` enum (currently 13 values in contract, 13 in DB) must be migrated to include `journey-intelligence-formula` among the new surfaces. JI-1.0 §14 step 1 specifies this as the first foundation action.

```typescript
// Addition to existing StrategySurfaceType enum
// Current: 13 values (sla, threshold, automation-boundary, routing, posture,
//   mission-objective, operational-tempo, domain-specific, prioritisation-weight,
//   validation-window, closure-gate, reopening-trigger, evidence-sufficiency)
// + 4 CMEP-1.0 values (sla-modifier, correlation-policy, effectiveness-targets, ssvc-decision-tree)
// + 3 JI-1.0 values:
'journey-intelligence-formula'    // Hosts all 10 formula families
'journey-template-governance'     // Template version/status governance
'war-room-cadence'                // Already exists from WRCEP-1.0
// Target: 20 values total
```

**Traces to:** Req 6 AC-6 (strategy surface enum migration 13→20).

---

## Journey Template Catalogue (33 Templates)

**Traces to:** Req 3 AC-2. All 33 templates from JI-1.0 §6. Each becomes a seed fixture in `seed-journey-templates.ts`.

Templates are **descriptive, not prescriptive** (Req 3 AC-3). Deviation is flagged, never prevented.

### Signal Intake Journeys (4)

| ID | Name | Anchor Type | Expected Phases | Typical Mode | Tempo (O/Or/D/A hours) | Leakage Threshold |
|---|---|---|---|---|---|---|
| JT-SIG-001 | IOC Email Intake | inbound_signal | O, Or, D | system_driven | 1/2/1/— | 8h |
| JT-SIG-002 | IOC Feed Intake | inbound_signal | O, Or | system_driven | 0.5/1/—/— | 4h |
| JT-SIG-003 | Vulnerability Intelligence Intake | inbound_signal | O, Or, D | system_driven | 1/4/2/— | 12h |
| JT-SIG-004 | Connector Signal Intake (A/B/C) | inbound_signal | O | system_driven | 0.25/—/—/— | 2h |

### Enrichment and Evaluation Journeys (3)

| ID | Name | Anchor Type | Expected Phases | Typical Mode | Tempo (O/Or/D/A hours) | Leakage Threshold |
|---|---|---|---|---|---|---|
| JT-ENR-001 | IOC Enrichment and Matching | ioc_match | Or, D | system_driven | —/4/2/— | 12h |
| JT-ENR-002 | Vulnerability Estate Evaluation | ioc_match | Or, D | system_driven | —/8/4/— | 24h |
| JT-ENR-003 | Threat Relevance Scoring | inbound_signal | Or | system_driven | —/2/—/— | 6h |

### Case Lifecycle Journeys (12)

| ID | Name | Case Type | Expected Phases | Typical Modes | Tempo (O/Or/D/A hours) | Leakage Threshold |
|---|---|---|---|---|---|---|
| JT-CASE-001 | Drift Case | drift | O, Or, D, A | system_driven, human_confirmed_automation | 2/4/8/24 | 72h |
| JT-CASE-002 | Vulnerability Case | vulnerability | O, Or, D, A | system_driven, human_confirmed_automation | 2/8/12/48 | 120h |
| JT-CASE-003 | Identity Case | identity | O, Or, D, A | human_confirmed_automation, manual | 4/12/24/48 | 168h |
| JT-CASE-004 | Exposure Case | exposure | O, Or, D, A | system_driven, human_confirmed_automation | 2/8/12/36 | 96h |
| JT-CASE-005 | Coverage Case | coverage | O, Or, D, A | system_driven | 1/4/8/24 | 72h |
| JT-CASE-006 | Tool Health Case | tool-health | O, Or, D, A | system_driven | 1/2/4/12 | 48h |
| JT-CASE-007 | Threat Intelligence Estate Match | threat-intelligence-estate-match | O, Or, D, A | system_driven, ai_enhanced | 2/8/12/24 | 72h |
| JT-CASE-008 | External Attack Correlation | external-attack-correlation | O, Or, D, A | human_confirmed_automation, manual | 1/4/12/48 | 120h |
| JT-CASE-009 | Verdict Pattern Case | verdict-pattern | O, Or, D, A | human_confirmed_automation, manual | 4/12/24/72 | 168h |
| JT-CASE-010 | Inverse Discovery Blindspot | inverse-discovery-coverage-blindspot | O, Or, D, A | system_driven | 2/4/8/24 | 72h |
| JT-CASE-011 | Policy Effectiveness Case | policy-effectiveness | O, Or, D, A | system_driven, ai_enhanced | 2/8/12/36 | 96h |
| JT-CASE-012 | OODA Tempo Degradation | ooda-tempo-degradation | O, Or, D, A | system_driven | 1/4/8/24 | 72h |

### Action and Execution Journeys (6)

| ID | Name | Anchor Type | Parent Anchor | Expected Phases | Typical Modes | Tempo (D/A hours) | Leakage Threshold |
|---|---|---|---|---|---|---|---|
| JT-ACT-001 | Remediation (Isolate) | push_action | case | D, A | human_confirmed_automation | 2/4 | 12h |
| JT-ACT-002 | Remediation (Evict) | push_action | case | D, A | human_confirmed_automation, manual | 4/12 | 24h |
| JT-ACT-003 | Remediation (Restore) | push_action | case | D, A | manual, human_confirmed_automation | 4/24 | 48h |
| JT-ACT-004 | Remediation (Harden) | push_action | case | D, A | system_driven, human_confirmed_automation | 8/24 | 48h |
| JT-ACT-005 | Remediation (Detect) | push_action | case | D, A | system_driven, ai_enhanced | 4/12 | 24h |
| JT-ACT-006 | Automated Push Action | push_action | case/ioc_match | D, A | human_confirmed_automation, autonomous | 1/2 | 8h |

### Strategic and Operational Journeys (5)

| ID | Name | Anchor Type | Expected Phases | Typical Modes | Tempo (O/Or/D/A hours) | Leakage Threshold |
|---|---|---|---|---|---|---|
| JT-MIS-001 | Mission Lifecycle | mission | O, Or, D, A | manual, ai_enhanced | 24/48/72/168 | 720h |
| JT-WAR-001 | War Room Coordination | war_room | O, Or, D, A | manual, human_confirmed_automation | 0.5/1/2/4 | 12h |
| JT-STR-001 | Strategy Policy Lifecycle | strategy_policy | D, A | manual, system_driven | —/—/24/48 | 168h |
| JT-STR-002 | Exposure Reduction Programme | mission | O, Or, D, A | system_driven, human_confirmed_automation | 24/72/168/720 | 2160h |
| JT-GOV-001 | Risk Acceptance Journey | case | Or, D | manual, human_confirmed_automation | —/24/48/— | 168h |

### Control and Posture Journeys (3)

| ID | Name | Anchor Type | Expected Phases | Typical Modes | Tempo (O/Or/D hours) | Leakage Threshold |
|---|---|---|---|---|---|---|
| JT-CTL-001 | Control Validation | finding | O, Or, D | system_driven | 1/4/8 | 24h |
| JT-CTL-002 | Posture Classification | finding | O, Or | system_driven | 1/4/— | 12h |
| JT-AUT-001 | Autonomous Operation | varies | O, Or, D, A | autonomous | 0.25/0.5/0.5/1 | 4h |

### Template Fixture Design Notes

- Each template fixture includes: `templateId`, `name`, `anchorType`, `parentAnchorType` (null unless action/child), `applicability` (caseTypes for case templates, empty for others), `expectedCheckpoints` (subset of LifecycleCheckpoint relevant to the phases), `expectedPhases`, `expectedDeliveryModes`, `expectedOutcomeDistribution` (default: {successful: 0.7, partially_successful: 0.15, failed: 0.05, accepted_risk: 0.05, cancelled: 0.03, abandoned: 0.02}), `tempoThresholds`, `leakageThresholdHours`, `formulaRefs` (default formula pack IDs), `version` ('1.0.0'), `status` ('active').
- Tempo thresholds are platform defaults — tenants may override per Req 3 AC-5.
- `expectedCheckpoints` per template are derived from the phase list: each template includes all checkpoints that belong to its declared phases.
- Action templates (JT-ACT-*) set `parentAnchorType: 'case'` to declare child-journey relationship.

---

## Formula Catalogue (10 Families)

**Traces to:** Req 6 AC-1 (strategy policy hosting), AC-2 (10 families), AC-3 (default pack), AC-4 (governance), AC-5 (pure computation with banded output).

All formulas are hosted as strategy policies of surface type `journey-intelligence-formula`. Each inherits versioning, tenant scope, approval lifecycle, audit trail, simulation capability, and override model from the strategy layer (Spec #32). Changes require strategy-policy governance (ARCH-JI-004).

### Formula Engine Interface

```typescript
export interface FormulaPolicy {
  formulaFamily: FormulaFamily;
  formulaVersion: string;
  weights: Record<string, number>;
  thresholds: FormulaThresholds;
  applicability: FormulaApplicability;
  scope: 'platform_default' | 'tenant_default' | 'tenant_override';
}

export interface FormulaThresholds {
  green: number;
  amber: number;
  red?: number;
}

export interface FormulaApplicability {
  anchorTypes?: JourneyAnchorType[];
  caseTypes?: string[];
  domains?: string[];
}

export type FormulaFamily =
  | 'journey_quality'
  | 'journey_complexity'
  | 'journey_economics'
  | 'lifecycle_savings'
  | 'automation_opportunity'
  | 'automation_friction'
  | 'automation_maturity'
  | 'journey_confidence'
  | 'leakage_risk'
  | 'rework_risk';
```

### Family 1: Journey Quality

| Attribute | Value |
|---|---|
| **Purpose** | Measures whether journeys end well, not just quickly |
| **Inputs** | `validation_pass_rate`, `outcome_success_rate`, `rework_rate` (inverted), `override_rate` (inverted), `reopening_rate` (inverted) |
| **Default Weights** | validation_pass_rate: 0.25, outcome_success_rate: 0.30, rework_rate: 0.20, override_rate: 0.10, reopening_rate: 0.15 |
| **Thresholds** | green: ≥80, amber: ≥60, red: <60 |
| **Applies To** | All case templates, action templates |
| **Tenant Tunable** | All weights, all thresholds, input inclusion/exclusion |

### Family 2: Journey Complexity

| Attribute | Value |
|---|---|
| **Purpose** | Measures structural complexity of journeys |
| **Inputs** | `checkpoint_count`, `actor_count`, `phase_count`, `approval_gate_count`, `rework_count`, `child_journey_count`, `escalation_count`, `delivery_mode_change_count` |
| **Default Weights** | checkpoint_count: 0.15, actor_count: 0.20, phase_count: 0.10, approval_gate_count: 0.20, rework_count: 0.15, child_journey_count: 0.05, escalation_count: 0.10, delivery_mode_change_count: 0.05 |
| **Thresholds** | low: ≤30, medium: 31–60, high: >60 |
| **Applies To** | All templates (normalised against template expectations) |
| **Tenant Tunable** | Weights, baseline expectations per template |

### Family 3: Journey Economics

| Attribute | Value |
|---|---|
| **Purpose** | Measures cost, effort, savings and value |
| **Inputs** | `total_duration_hours`, `estimated_effort_hours`, `actual_effort_hours`, `baseline_duration_hours`, `automation_drag_hours`, `human_rescue_hours`, `rework_cost_hours`, `outcome` |
| **Default Weights** | time_saved: 0.25, effort_efficiency: 0.25, automation_contribution: 0.20, outcome_value: 0.30 |
| **Thresholds** | high_value: ≥70, moderate_value: 40–69, low_value: <40 |
| **Impact Output** | impactClassification, riskDelta, exposureDelta, controlImprovement, timeSavedHours, effortSavedHours |
| **Applies To** | All case templates, action templates, mission templates |
| **Tenant Tunable** | All weights, baseline durations, outcome value mapping |

### Family 4: Lifecycle Savings

| Attribute | Value |
|---|---|
| **Purpose** | Measures time saved versus baseline per OODA phase |
| **Inputs** | `per_phase_baseline_hours` (from template), `per_phase_actual_hours` (from checkpoints), `delivery_mode_per_phase` |
| **Default Weights** | observe_savings: 0.20, orient_savings: 0.30, decide_savings: 0.25, act_savings: 0.25 |
| **Thresholds** | green: ≥30% saved, amber: 10–29%, red: <10% or negative |
| **Applies To** | All case templates, enrichment templates, action templates |
| **Tenant Tunable** | Baseline hours per phase per template, phase weights |

### Family 5: Automation Opportunity

| Attribute | Value |
|---|---|
| **Purpose** | Scores how automatable a journey type is |
| **Inputs** | `determinism_score`, `connector_available`, `evidence_pre_available`, `approval_required`, `repeatability_score`, `historical_success_rate`, `variance_score` |
| **Default Weights** | determinism: 0.25, connector_available: 0.15, evidence_pre_available: 0.15, approval_required: −0.15, repeatability: 0.15, historical_success: 0.10, low_variance: 0.05 |
| **Thresholds** | high: ≥70, medium: 40–69, low: <40 |
| **Applies To** | All templates |
| **Tenant Tunable** | All weights, approval gate impact |

### Family 6: Automation Friction

| Attribute | Value |
|---|---|
| **Purpose** | Measures resistance between decision and execution |
| **Inputs** | `drag_hours`, `failure_rate`, `rescue_rate`, `retry_count`, `recovery_hours`, `connector_reliability` |
| **Default Weights** | drag: 0.20, failure_rate: 0.30, rescue_rate: 0.20, retry_count: 0.15, recovery_hours: 0.10, connector_reliability: 0.05 |
| **Thresholds** | low: ≤20, medium: 21–50, high: >50 (lower is better) |
| **Applies To** | Action templates, case templates where delivery_mode includes automation |
| **Tenant Tunable** | All weights, acceptable drag threshold, connector targets |

### Family 7: Automation Maturity

| Attribute | Value |
|---|---|
| **Purpose** | Tracks delivery mode progression toward autonomous |
| **Inputs** | `delivery_mode_distribution`, `trend_direction`, `autonomous_success_rate` |
| **Default Weights** | manual_fraction: −0.30, autonomous_fraction: 0.30, system_driven_fraction: 0.15, ai_enhanced_fraction: 0.10, trend_improvement: 0.10, autonomous_success: 0.05 |
| **Thresholds** | mature: ≥70, developing: 40–69, immature: <40 |
| **Applies To** | All templates (grouped by type) |
| **Tenant Tunable** | Target maturity per template, band thresholds |

### Family 8: Journey Confidence

| Attribute | Value |
|---|---|
| **Purpose** | Estimates likelihood of successful outcome for active journeys |
| **Inputs** | `phase_progress_ratio`, `checkpoint_adherence`, `evidence_confidence_avg`, `decision_confidence_avg`, `rework_occurring`, `template_deviation` |
| **Default Weights** | phase_progress: 0.15, checkpoint_adherence: 0.20, evidence_confidence: 0.20, decision_confidence: 0.20, no_rework: 0.15, no_deviation: 0.10 |
| **Thresholds** | high: ≥75, medium: 50–74, low: <50 |
| **Applies To** | All case templates, action templates, mission templates |
| **Tenant Tunable** | All weights, confidence-driven alerting rules |

### Family 9: Leakage Risk

| Attribute | Value |
|---|---|
| **Purpose** | Predicts which active journeys are at risk of leaking |
| **Inputs** | `time_at_current_checkpoint_hours`, `template_expected_hours`, `historical_leakage_rate`, `delivery_mode`, `phase`, `child_journey_stall` |
| **Default Weights** | time_overshoot_ratio: 0.35, historical_leakage_rate: 0.25, manual_delivery: 0.15, orient_decide_phase: 0.10, child_stall: 0.15 |
| **Thresholds** | high_risk: ≥70, medium_risk: 40–69, low_risk: <40 |
| **Applies To** | All active journeys (15-minute detection cycle) |
| **Tenant Tunable** | Expected checkpoint durations (via template), risk thresholds |

### Family 10: Rework Risk

| Attribute | Value |
|---|---|
| **Purpose** | Predicts which journeys are likely to require rework |
| **Inputs** | `evidence_sufficiency`, `decision_override_history`, `connector_reliability_for_type`, `validation_readiness`, `template_historical_rework_rate` |
| **Default Weights** | evidence_sufficiency: 0.25, historical_override_rate: 0.20, connector_reliability: 0.20, validation_readiness: 0.15, template_historical_rate: 0.20 |
| **Thresholds** | high_risk: ≥60, medium_risk: 30–59, low_risk: <30 |
| **Applies To** | Active journeys in Decide or Act phase |
| **Tenant Tunable** | Evidence sufficiency definition, risk thresholds |

### Formula Fixture Design Notes

- Each formula is seeded as a strategy policy with `surfaceType: 'journey-intelligence-formula'`.
- The `configuration` JSON payload carries: `formulaFamily`, `formulaVersion` ('1.0.0'), `weights`, `thresholds`, `applicability`, `scope` ('platform_default').
- Each seed formula has `status: 'active'`, `policyVersion: '1.0.0'`.
- Tenants override by creating a new policy with `scope: 'tenant_override'` for their tenant — the resolution hierarchy is: tenant_override > tenant_default > platform_default.
- Formula evaluation is a **pure function**: inputs + weights + thresholds → score + band + breakdown. No side effects, no state mutation, no API calls.

---

## Tagger Engines (4 Pure Functions)

**Traces to:** Req 5 AC-1 through AC-5. All engines are pure functions — no side effects, no API calls, testable in isolation (JI-1.0 §9).

### Engine 1: OODA Stage Tagger

| Attribute | Value |
|---|---|
| **Input** | `auditEvent.action` (string) |
| **Output** | `OodaStage` |
| **Logic** | Rule-based mapping (~40 action-to-stage rules) |
| **Location** | `packages/contracts/src/engines/journey-intelligence/ooda-stage-tagger.ts` |

```typescript
export function tagOodaStage(action: string): TaggerOutput<OodaStage> {
  // ~40 rules mapping action strings to OODA stages
  // Examples:
  //   'signal.received' → observe
  //   'signal.normalised' → observe
  //   'context.established' → orient
  //   'drift.detected' → orient
  //   'risk.scored' → orient
  //   'case.created' → decide
  //   'case.routed' → decide
  //   'approval.requested' → decide
  //   'action.dispatched' → act
  //   'action.executed' → act
  //   'validation.passed' → act
  // Returns { value, confidence: 'deterministic', rule: '<matched-rule-id>' }
  // Unmatched actions return null (field stays nullable on audit event)
}
```

**Rule structure:** Each rule is a pattern match (exact string or prefix) mapped to an OodaStage. Rules are ordered by specificity (exact match before prefix). The rule set is declarative data, not branching logic.

### Engine 2: Delivery Mode Tagger

| Attribute | Value |
|---|---|
| **Input** | `auditEvent.actor.type` + `auditEvent.action` + approval context |
| **Output** | `DeliveryMode` |
| **Logic** | Actor-type-based with context refinement |
| **Location** | `packages/contracts/src/engines/journey-intelligence/delivery-mode-tagger.ts` |

```typescript
export function tagDeliveryMode(
  actorType: string,
  action: string,
  approvalContext?: { approvalRequired: boolean; approvalGranted: boolean }
): TaggerOutput<DeliveryMode> {
  // Decision tree:
  // 1. actorType === 'system' && no approval required → 'system_driven'
  // 2. actorType === 'system' && approval required && granted → 'human_confirmed_automation'
  // 3. actorType === 'commander-ai' && no approval required → 'ai_enhanced'
  // 4. actorType === 'commander-ai' && approval required && granted → 'human_confirmed_automation'
  // 5. actorType === 'user' → 'manual'
  // 6. actorType === 'connector' && action matches autonomous pattern → 'autonomous'
  // 7. actorType === 'connector' && otherwise → 'system_driven'
  // Fallback: 'manual' (safest default)
}
```

### Engine 3: Lifecycle Checkpoint Resolver

| Attribute | Value |
|---|---|
| **Input** | `auditEvent.entityRef.entityType` + `auditEvent.action` |
| **Output** | `LifecycleCheckpoint` |
| **Logic** | Entity-state-to-checkpoint mapping |
| **Location** | `packages/contracts/src/engines/journey-intelligence/lifecycle-checkpoint-resolver.ts` |

```typescript
export function resolveLifecycleCheckpoint(
  entityType: string,
  action: string
): TaggerOutput<LifecycleCheckpoint> | null {
  // Maps (entityType, action) pairs to LifecycleCheckpoint values
  // Examples:
  //   ('inbound-signal', 'received') → signal_received
  //   ('inbound-signal', 'normalised') → signal_normalised
  //   ('risk-object', 'scored') → risk_scored
  //   ('case', 'created') → case_created
  //   ('case', 'bound') → case_bound
  //   ('case', 'routed') → case_routed
  //   ('action', 'dispatched') → action_dispatched
  //   ('action', 'executed') → action_executed
  //   ('action', 'failed') → action_failed
  //   ('validation', 'passed') → validation_passed
  //   ('journey', 'completed') → journey_completed
  // Returns null for entity/action pairs that are not lifecycle checkpoints
  // (not every audit event is a checkpoint — only meaningful state transitions)
}
```

### Engine 4: Journey ID Resolver

| Attribute | Value |
|---|---|
| **Input** | Entity reference chain (entityRef + parent entity chain) |
| **Output** | `{ journeyId: string; parentJourneyId: string | null }` |
| **Logic** | Deterministic derivation from root entity |
| **Location** | `packages/contracts/src/engines/journey-intelligence/journey-id-resolver.ts` |

```typescript
export function resolveJourneyId(
  entityRef: { entityType: string; entityId: string },
  parentEntityRef?: { entityType: string; entityId: string }
): { journeyId: string; parentJourneyId: string | null } {
  // Derivation per JI-1.0 §5.6:
  //   case → journey-case-{entityId}
  //   finding → journey-finding-{entityId}
  //   ioc_match → journey-ioc-{entityId}
  //   mission → journey-mission-{entityId}
  //   strategy_policy → journey-strategy-{entityId}
  //   inbound_signal → journey-signal-{entityId}
  //   push_action → journey-push-{entityId}
  //   war_room → journey-warroom-{entityId}
  //   exposure_programme → journey-programme-{entityId}
  //
  // parentJourneyId: derived from parentEntityRef if present
  // (e.g. action with parent case → parentJourneyId = journey-case-{parentId})
  //
  // Returns null for parentJourneyId if no parent relationship exists
}
```

### Tagger Execution Model

All 4 taggers are invoked at **audit event write-time** in a single synchronous pass:

```
AuditEvent creation →
  1. tagOodaStage(event.action)
  2. tagDeliveryMode(event.actor.type, event.action, approvalContext)
  3. resolveLifecycleCheckpoint(event.entityRef.entityType, event.action)
  4. resolveJourneyId(event.entityRef, event.parentEntityRef)
  → Write all 5 fields atomically with the audit event
```

No tagger depends on another tagger's output. All 4 run independently. If any tagger returns null, the corresponding field stays null on the audit event (nullable by design).

---

## Read Model Architecture (7 Foundation Models)

**Traces to:** Req 7 AC-1 through AC-5, Req 8 (leakage detection), Req 9 (automation metrics).

All read models live in the `analytics` database schema, workload class `analytics-read`. They are computed by scheduled refresh engines that read from Journey entities and audit events. Dashboards and AI consumers query read models exclusively (ARCH-JI-003).

### Read Model 1: journey_lifecycle_tempo

| Attribute | Value |
|---|---|
| **Purpose** | Per-journey, per-phase durations and checkpoint chain |
| **Refresh** | Hourly |
| **Source** | Journey entity + audit events (filtered by journeyId) |
| **Grain** | One row per journey per OODA phase |
| **Key columns** | tenant_id, journey_id, template_ref, ooda_stage, started_at, completed_at, duration_hours, checkpoint_count, delivery_mode |
| **Feeds** | Lifecycle Savings formula, tempo dashboards |

### Read Model 2: automation_friction_metrics

| Attribute | Value |
|---|---|
| **Purpose** | Drag, failure rate, rescue rate per action type/connector |
| **Refresh** | Hourly |
| **Source** | Audit events (action-phase temporal gaps) |
| **Grain** | One row per action type per connector per time period |
| **Key columns** | tenant_id, action_type, connector_ref, period, drag_hours_avg, failure_rate, rescue_rate, retry_count_avg, recovery_hours_avg, connector_reliability |
| **Feeds** | Automation Friction formula, Automation Opportunity formula |

### Read Model 3: journey_leakage_report

| Attribute | Value |
|---|---|
| **Purpose** | Stalled journeys past template thresholds |
| **Refresh** | Every 15 minutes |
| **Source** | Journey entity (status=active/stalled) + JourneyTemplate (leakageThresholdHours) |
| **Grain** | One row per at-risk journey |
| **Key columns** | tenant_id, journey_id, template_ref, current_checkpoint, hours_at_checkpoint, template_threshold_hours, overshoot_ratio, leakage_risk_score, delivery_mode, phase |
| **Feeds** | Leakage Risk formula, operational alerting |

### Read Model 4: delivery_mode_distribution

| Attribute | Value |
|---|---|
| **Purpose** | Mode split per journey type per time period |
| **Refresh** | Daily |
| **Source** | Journey entity (grouped by templateRef, deliveryMode) |
| **Grain** | One row per template per delivery mode per period |
| **Key columns** | tenant_id, template_ref, delivery_mode, period, journey_count, percentage, trend_direction |
| **Feeds** | Automation Maturity formula, maturity dashboards |

### Read Model 5: journey_quality_scores

| Attribute | Value |
|---|---|
| **Purpose** | Composite quality per journey type (formula-driven) |
| **Refresh** | Daily |
| **Source** | Journey entity (completed journeys) + validation outcomes + rework counts |
| **Grain** | One row per template per period |
| **Key columns** | tenant_id, template_ref, period, quality_score, band, validation_pass_rate, outcome_success_rate, rework_rate, override_rate, reopening_rate |
| **Feeds** | Journey Quality formula output, quality dashboards |

### Read Model 6: journey_rework_analysis

| Attribute | Value |
|---|---|
| **Purpose** | Rework count, causes, cost per journey type |
| **Refresh** | Daily |
| **Source** | Journey entity (reworkCount > 0) + audit events (rework triggers) |
| **Grain** | One row per template per period |
| **Key columns** | tenant_id, template_ref, period, rework_count, rework_rate, avg_rework_cycles, rework_cause_distribution, rework_cost_hours_avg |
| **Feeds** | Rework Risk formula, rework dashboards |

### Read Model 7: journey_outcome_analysis

| Attribute | Value |
|---|---|
| **Purpose** | Outcome distribution per template, trends, correlations |
| **Refresh** | Daily |
| **Source** | Journey entity (terminal journeys) |
| **Grain** | One row per template per outcome per period |
| **Key columns** | tenant_id, template_ref, outcome, period, count, percentage, trend_direction, avg_duration_hours, delivery_mode_distribution |
| **Feeds** | Journey Quality formula inputs, outcome dashboards, AI Analyst |

### Read Model Refresh Engine Design

```typescript
export interface ReadModelRefreshEngine {
  modelName: string;
  refreshCadence: '15min' | 'hourly' | 'daily';
  sourceWorkload: 'operational-read';  // reads from journey/audit
  targetWorkload: 'analytics-read';    // writes to analytics schema
  computeFn: (tenantId: string, period: DateRange) => ReadModelRow[];
}
```

- Each refresh engine is a **pure computation** over its declared sources.
- At T1, refresh is triggered by a scheduled job (cron/EventBridge placeholder).
- No cross-workload FKs — refresh engines read operationally, write analytically.
- Read models store latest computation + 30-day trend history.
- Read models are bounded by journey/template count, not raw event volume (Req 7 AC-4).
- No individual-analyst granularity in any read model (Req 7 AC-5).

---

*Section 6 to follow in the final commit:*
- *§6: AI Analyst integration + governance + testing strategy + risks*

## Correctness Properties

*(To be completed in Section 6)*

## Error Handling

*(To be completed in Section 6)*

## Testing Strategy

*(To be completed in Section 6)*
