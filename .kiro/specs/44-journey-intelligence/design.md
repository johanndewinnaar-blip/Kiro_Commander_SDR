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

*Sections 2–6 to follow in subsequent commits:*
- *§2: Entity definitions (Journey + JourneyTemplate + audit extension + all 6 enums)*
- *§3: Template catalogue (33 templates)*
- *§4: Formula catalogue (10 families)*
- *§5: Tagger engines + read models*
- *§6: AI Analyst integration + governance + testing strategy + risks*

## Correctness Properties

*(To be completed in Section 6)*

## Error Handling

*(To be completed in Section 6)*

## Testing Strategy

*(To be completed in Section 6)*
