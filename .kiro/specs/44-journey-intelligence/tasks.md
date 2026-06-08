# Tasks

> Journey Intelligence (Spec 44) — Implementation Task List

## Task Group 1: Enumerations and Strategy Surface Migration

### Task 1.1: Create Journey Intelligence enumerations module
- **Requirement:** Req 1 (all ACs)
- **File:** `packages/contracts/src/entities/journey-enums.ts`
- **Deliverables:**
  - Define `OodaStage` enum (4 values)
  - Define `DeliveryMode` enum (5 values)
  - Define `JourneyStatus` enum (5 values)
  - Define `JourneyOutcome` enum (9 values) with `TERMINAL_OUTCOMES` constant
  - Define `JourneyAnchorType` enum (9 values)
  - Define `LifecycleCheckpoint` enum grouped by OODA stage (~35 values, max 50)
  - Export all enums from barrel (`packages/contracts/src/entities/index.ts`)
- **Acceptance:** All enums export correctly. LifecycleCheckpoint ≤ 50 values. TypeScript compiles clean.

### Task 1.2: Migrate strategy surface type enum (13 → 20)
- **Requirement:** Req 5 AC-1
- **Files:**
  - `packages/contracts/src/entities/strategy.ts` — add values 14–20 to `StrategySurfaceType`
  - `packages/db/src/schema/strategies.ts` — add values to `strategySurfaceTypeEnum`
  - DB migration: `packages/db/drizzle/0012_strategy_surface_expansion.sql`
- **Deliverables:**
  - Add: `sla-modifier`, `correlation-policy`, `effectiveness-targets`, `ssvc-decision-tree`, `communication-playbook`, `war-room-cadence`, `journey-intelligence-formula`
  - Update `STRATEGY_SURFACE_TYPES` constant array
  - Update `STRATEGY_SURFACE_LABELS` record
- **Acceptance:** Contract and DB enum both have 20 values. Existing fixtures remain valid. TypeScript compiles clean.

---

## Task Group 2: Journey Entity

### Task 2.1: Create Journey entity contract
- **Requirement:** Req 2 (all ACs)
- **File:** `packages/contracts/src/entities/journey.ts`
- **Deliverables:**
  - Define `Journey` interface extending `CommonFields`
  - Define `validateJourney()` function (structural validation)
  - Enforce: outcome starts as `pending`, immutable once terminal
  - Enforce: journeyId derivation pattern per anchor type
  - Export from barrel
- **Acceptance:** Interface matches JI-1.0 §5.2 exactly. Validator catches invalid outcome transitions. TypeScript compiles clean.

### Task 2.2: Create Journey DB schema
- **Requirement:** Req 2
- **File:** `packages/db/src/schema/journeys.ts`
- **Deliverables:**
  - Create `journey` schema
  - Create `journeys` table with all fields from contract
  - Add enums: `journeyStatusEnum`, `journeyOutcomeEnum`, `oodaStageEnum`, `deliveryModeEnum`, `journeyAnchorTypeEnum`, `lifecycleCheckpointEnum`
  - Add indexes per JI-1.0 §13 (tenant_id + journey_id, tenant_id + status + current_phase, tenant_id + anchor_type + anchor_id)
  - DB migration: `packages/db/drizzle/0013_journey_entity.sql`
- **Acceptance:** Schema matches contract. Indexes present. Migration valid SQL. No FK to audit or other workload-boundary tables.

### Task 2.3: Create Journey seed fixture
- **Requirement:** Req 2
- **File:** `packages/contracts/src/fixtures/seed-journeys.ts`
- **Deliverables:**
  - Create 5–8 seed journeys covering multiple anchor types, statuses, and outcomes
  - At least 1 active, 1 completed (successful), 1 stalled, 1 with parentJourneyId (child)
  - All pass `validateJourney()`
  - Use deterministic IDs (`seedId()` pattern)
- **Acceptance:** All fixtures pass validator. At least 4 anchor types represented. Parent/child relationship demonstrated.

---

## Task Group 3: JourneyTemplate Entity

### Task 3.1: Create JourneyTemplate entity contract
- **Requirement:** Req 3 (all ACs)
- **File:** `packages/contracts/src/entities/journey-template.ts`
- **Deliverables:**
  - Define `JourneyTemplate` interface extending `CommonFields`
  - Define `validateJourneyTemplate()` function
  - Export from barrel
- **Acceptance:** Interface matches JI-1.0 §5.3 exactly. Validator checks required fields. TypeScript compiles clean.

### Task 3.2: Create JourneyTemplate DB schema
- **Requirement:** Req 3
- **File:** `packages/db/src/schema/journey-templates.ts`
- **Deliverables:**
  - Create `journey_templates` table in `journey` schema
  - All fields from contract including JSONB for arrays (expectedCheckpoints, expectedPhases, etc.)
  - Unique index on `(tenant_id, template_id)`
  - DB migration: `packages/db/drizzle/0014_journey_template_entity.sql`
- **Acceptance:** Schema matches contract. Migration valid SQL.

### Task 3.3: Create JourneyTemplate seed fixtures (33 templates)
- **Requirement:** Req 3 AC-2
- **File:** `packages/contracts/src/fixtures/seed-journey-templates.ts`
- **Deliverables:**
  - 4 signal-intake templates (JT-SIG-001..004)
  - 3 enrichment templates (JT-ENR-001..003)
  - 12 case-lifecycle templates (JT-CASE-001..012)
  - 6 action/execution templates (JT-ACT-001..006)
  - 5 strategic/operational templates (JT-MIS-001, JT-WAR-001, JT-STR-001..002, JT-GOV-001)
  - 3 control/posture templates (JT-CTL-001..002, JT-AUT-001)
  - Each with: expectedCheckpoints, expectedPhases, expectedDeliveryModes, tempoThresholds, leakageThresholdHours, formulaRefs
  - All pass `validateJourneyTemplate()`
- **Acceptance:** 33 templates total. All pass validator. All anchor types and template categories represented.

---

## Task Group 4: Audit Event Extension

### Task 4.1: Extend AuditEvent contract with Journey Intelligence fields
- **Requirement:** Req 4 (all ACs)
- **File:** `packages/contracts/src/entities/audit-event.ts`
- **Deliverables:**
  - Add 5 nullable fields: `oodaStage?`, `deliveryMode?`, `lifecycleCheckpoint?`, `journeyId?`, `parentJourneyId?`
  - Fields are optional (backward-compatible with all existing audit events)
  - Update `validateAuditEvent()` if it exists (validate enum membership when present)
- **Acceptance:** Existing audit event fixtures still pass validation. New fields accepted when present. TypeScript compiles clean.

### Task 4.2: Extend audit event DB schema
- **Requirement:** Req 4
- **File:** `packages/db/src/schema/audit-events.ts`
- **Deliverables:**
  - Add 5 nullable columns to audit_events table
  - Add indexes: `(tenant_id, ooda_stage, created_at DESC)`, `(tenant_id, delivery_mode, created_at DESC)`, `(tenant_id, lifecycle_checkpoint, created_at DESC)`, partial index on `parent_journey_id IS NOT NULL`
  - DB migration: `packages/db/drizzle/0015_audit_event_journey_extension.sql`
- **Acceptance:** Migration adds nullable columns only. Existing data unaffected. Indexes created.

### Task 4.3: Update audit event seed fixtures with Journey Intelligence fields
- **Requirement:** Req 4
- **File:** `packages/contracts/src/fixtures/seed-events.ts`
- **Deliverables:**
  - Populate `oodaStage`, `deliveryMode`, `lifecycleCheckpoint`, `journeyId` on ~60% of existing seed events
  - Leave ~40% without (demonstrates backward compatibility)
  - Populate `parentJourneyId` on events related to action/sub-action fixtures
- **Acceptance:** Existing audit event validation still passes. New fields populated where appropriate.

---

## Task Group 5: Tagger Engines

### Task 5.1: Create OODA Stage Tagger engine
- **Requirement:** Req 5 AC-2
- **File:** `packages/contracts/src/engines/journey-intelligence/ooda-stage-tagger.ts`
- **Deliverables:**
  - Pure function: input = audit event `action` string, output = `OodaStage`
  - ~40 action-to-stage mapping rules
  - Confidence: `deterministic` for known actions, `inferred` for partial matches
  - Export tagged rule set for testability
- **Acceptance:** All known audit event actions in seed-events.ts map to correct OODA stage. Pure function (no I/O, no side effects). 100% test coverage on rule set.

### Task 5.2: Create Delivery Mode Tagger engine
- **Requirement:** Req 5 AC-3
- **File:** `packages/contracts/src/engines/journey-intelligence/delivery-mode-tagger.ts`
- **Deliverables:**
  - Pure function: input = actor.type + action + approval context, output = `DeliveryMode`
  - Rules: system → system_driven, user → manual, commander-ai → ai_enhanced, system + approval gate → human_confirmed_automation, system + policy-authorised no approval → autonomous
  - Export rule set for testability
- **Acceptance:** All seed audit events produce correct delivery mode. Pure function. Tested.

### Task 5.3: Create Lifecycle Checkpoint Resolver engine
- **Requirement:** Req 5 AC-4
- **File:** `packages/contracts/src/engines/journey-intelligence/lifecycle-checkpoint-resolver.ts`
- **Deliverables:**
  - Pure function: input = entityRef.entityType + action, output = `LifecycleCheckpoint`
  - Mapping: entity-state transitions to canonical checkpoints
  - Returns `null` when action doesn't map to a meaningful checkpoint (not all audit events are checkpoints)
- **Acceptance:** Produces correct checkpoint for all checkpoint-worthy actions. Returns null for non-checkpoint actions. Pure function. Tested.

### Task 5.4: Create Journey ID Resolver engine
- **Requirement:** Req 5 AC-5
- **File:** `packages/contracts/src/engines/journey-intelligence/journey-id-resolver.ts`
- **Deliverables:**
  - Pure function: input = entity reference chain (anchorType + anchorId), output = journeyId + parentJourneyId
  - Deterministic pattern: `journey-{anchorType}-{anchorId}`
  - parentJourneyId resolved from entity hierarchy (action → case, sub-action → action)
- **Acceptance:** Produces deterministic, reproducible journey IDs. Parent/child correctly resolved. Pure function. Tested.

### Task 5.5: Create tagger barrel export and engine index
- **Requirement:** Req 5
- **File:** `packages/contracts/src/engines/journey-intelligence/index.ts`
- **Deliverables:**
  - Barrel export for all 4 tagger engines
  - Export from main engines index (`packages/contracts/src/engines/index.ts`)
- **Acceptance:** All engines importable from barrel. No circular dependencies.

---

## Task Group 6: Formula Engines

### Task 6.1: Create formula engine framework (shared interface)
- **Requirement:** Req 6 AC-1
- **File:** `packages/contracts/src/engines/journey-intelligence/formulas/formula-engine.ts`
- **Deliverables:**
  - Define `FormulaInput`, `FormulaOutput`, `FormulaThresholds` types
  - Define `computeFormula()` generic function signature
  - Define `FormulaFamily` type (10 family names)
  - Band calculation: score → green/amber/red based on thresholds
- **Acceptance:** Types compile clean. Band calculation tested.

### Task 6.2: Create Journey Quality formula engine
- **Requirement:** Req 6 AC-2
- **File:** `packages/contracts/src/engines/journey-intelligence/formulas/journey-quality.ts`
- **Deliverables:** Pure function implementing quality formula per JI-1.0 §7.1 (5 inputs, default weights, thresholds)
- **Acceptance:** Produces correct score from seed data. Respects inverted inputs. Band classification correct.

### Task 6.3: Create Journey Complexity formula engine
- **Requirement:** Req 6 AC-2
- **File:** `packages/contracts/src/engines/journey-intelligence/formulas/journey-complexity.ts`
- **Deliverables:** Pure function implementing complexity formula per JI-1.0 §7.2 (8 inputs)
- **Acceptance:** Produces correct score. Normalisation against template expectations.

### Task 6.4: Create Journey Economics formula engine
- **Requirement:** Req 6 AC-2
- **File:** `packages/contracts/src/engines/journey-intelligence/formulas/journey-economics.ts`
- **Deliverables:** Pure function implementing economics formula per JI-1.0 §7.3 (8 inputs, outcome-weighted)
- **Acceptance:** Failed outcomes produce low scores regardless of speed. Time saved calculated from baseline.

### Task 6.5: Create Lifecycle Savings formula engine
- **Requirement:** Req 6 AC-2
- **File:** `packages/contracts/src/engines/journey-intelligence/formulas/lifecycle-savings.ts`
- **Deliverables:** Pure function per JI-1.0 §7.4 (per-phase savings vs baseline)
- **Acceptance:** Negative savings (slower than baseline) correctly reported. Phase weights applied.

### Task 6.6: Create Automation Opportunity formula engine
- **Requirement:** Req 6 AC-2
- **File:** `packages/contracts/src/engines/journey-intelligence/formulas/automation-opportunity.ts`
- **Deliverables:** Pure function per JI-1.0 §7.5 (7 inputs, approval_required has negative weight)
- **Acceptance:** Approval gates reduce score. High determinism + connector available = high score.

### Task 6.7: Create Automation Friction formula engine
- **Requirement:** Req 6 AC-2
- **File:** `packages/contracts/src/engines/journey-intelligence/formulas/automation-friction.ts`
- **Deliverables:** Pure function per JI-1.0 §7.6 (6 inputs, lower is better)
- **Acceptance:** High failure rate produces high friction score. Thresholds inverted (low = green).

### Task 6.8: Create Automation Maturity formula engine
- **Requirement:** Req 6 AC-2
- **File:** `packages/contracts/src/engines/journey-intelligence/formulas/automation-maturity.ts`
- **Deliverables:** Pure function per JI-1.0 §7.7 (manual fraction negative, autonomous positive, success rate moderating)
- **Acceptance:** 100% autonomous with 50% failure rate ≠ mature. Trend direction contributes.

### Task 6.9: Create Journey Confidence formula engine
- **Requirement:** Req 6 AC-2
- **File:** `packages/contracts/src/engines/journey-intelligence/formulas/journey-confidence.ts`
- **Deliverables:** Pure function per JI-1.0 §7.8 (6 inputs, rework/deviation reduce confidence)
- **Acceptance:** Active journey with rework and deviation scores low confidence.

### Task 6.10: Create Leakage Risk formula engine
- **Requirement:** Req 6 AC-2
- **File:** `packages/contracts/src/engines/journey-intelligence/formulas/leakage-risk.ts`
- **Deliverables:** Pure function per JI-1.0 §7.9 (6 inputs, time overshoot dominant)
- **Acceptance:** Journey at 2x expected duration = high leakage risk.

### Task 6.11: Create Rework Risk formula engine
- **Requirement:** Req 6 AC-2
- **File:** `packages/contracts/src/engines/journey-intelligence/formulas/rework-risk.ts`
- **Deliverables:** Pure function per JI-1.0 §7.10 (5 inputs, evidence sufficiency dominant)
- **Acceptance:** Low evidence sufficiency = high rework risk.

### Task 6.12: Create formula barrel export
- **Requirement:** Req 6
- **File:** `packages/contracts/src/engines/journey-intelligence/formulas/index.ts`
- **Deliverables:** Barrel export for all 10 formula engines + shared types
- **Acceptance:** All formulas importable from barrel. No circular dependencies.

---

## Task Group 7: Formula Seed Fixtures (Default Pack)

### Task 7.1: Create default formula pack seed fixtures
- **Requirement:** Req 6 AC-3
- **File:** `packages/contracts/src/fixtures/seed-journey-formulas.ts`
- **Deliverables:**
  - 10 strategy policy fixtures (one per formula family)
  - Surface type: `journey-intelligence-formula`
  - Each carries: formulaFamily, formulaVersion (1.0.0), weights, thresholds, applicability, scope (platform_default)
  - Status: `active`
  - Default weights and thresholds per JI-1.0 §7.1–§7.10
- **Acceptance:** All 10 fixtures validate as valid strategy policies. Weights sum correctly. Thresholds ordered correctly.

---

## Task Group 8: Read Model Schemas

### Task 8.1: Create read model table schemas (7 models)
- **Requirement:** Req 7 (all ACs)
- **File:** `packages/db/src/schema/analytics/journey-read-models.ts`
- **Deliverables:**
  - Create `analytics` schema (if not exists)
  - Create 7 tables: `journey_lifecycle_tempo`, `automation_friction_metrics`, `journey_leakage_report`, `delivery_mode_distribution`, `journey_quality_scores`, `journey_rework_analysis`, `journey_outcome_analysis`
  - Each with tenant_id, computed_at, and model-specific fields
  - DB migration: `packages/db/drizzle/0016_journey_read_models.sql`
- **Acceptance:** All 7 tables created in analytics schema. Migration valid SQL. No FK to operational tables.

---

## Task Group 9: Testing

### Task 9.1: Create tagger engine unit tests
- **Requirement:** Req 5
- **File:** `tests/journey-intelligence/tagger-engines.test.ts`
- **Deliverables:**
  - Test OODA Stage Tagger against all known action strings
  - Test Delivery Mode Tagger against all actor type combinations
  - Test Lifecycle Checkpoint Resolver against entity/action combinations
  - Test Journey ID Resolver for deterministic output
  - Test null/unknown handling
- **Acceptance:** All taggers produce correct output for seed data. Unknown inputs handled gracefully.

### Task 9.2: Create formula engine unit tests
- **Requirement:** Req 6
- **File:** `tests/journey-intelligence/formula-engines.test.ts`
- **Deliverables:**
  - Test each of 10 formula families with known inputs
  - Test band classification boundaries (edge cases at threshold)
  - Test inverted inputs (friction, complexity where lower is better)
  - Test outcome-weighted economics formula
- **Acceptance:** All formulas produce expected scores. Band boundaries correct. Inverted metrics handled.

### Task 9.3: Create entity validation tests
- **Requirement:** Req 2, Req 3
- **File:** `tests/journey-intelligence/entity-validation.test.ts`
- **Deliverables:**
  - Test Journey validator (outcome immutability, required fields, enum membership)
  - Test JourneyTemplate validator (required fields, status lifecycle)
  - Test all seed fixtures pass validation
- **Acceptance:** Invalid state transitions rejected. Valid fixtures pass. Edge cases covered.

---

## Task Group 10: Governance Chain Updates

### Task 10.1: Register entities in DATA_DICTIONARY.md
- **Requirement:** Traceability chain hard gate
- **File:** `docs/knowledge/DATA_DICTIONARY.md`
- **Deliverables:**
  - Add Journey entity entry (all fields, status, relationships)
  - Add JourneyTemplate entity entry (all fields, status, relationships)
  - Update Data Layer As-Built Snapshot count
- **Acceptance:** Both entities registered before code (hard gate). All fields documented.

### Task 10.2: Register use cases in USE_CASE_REGISTER.md
- **Requirement:** Traceability chain
- **File:** `docs/00_authority/USE_CASE_REGISTER.md`
- **Deliverables:**
  - UC-213: Measure journey lifecycle tempo
  - UC-214: Detect journey leakage
  - UC-215: Detect journey rework patterns
  - UC-216: Evaluate automation opportunity
  - UC-217: Measure automation friction
  - UC-218: Classify delivery mode
  - UC-219: Evaluate journey quality
  - UC-220: Compute journey confidence
- **Acceptance:** All use cases registered with data source, delivery mode (SYSTEM), status (NOT BUILT).

### Task 10.3: Register domain and build unit
- **Requirement:** Traceability chain
- **Files:**
  - `docs/knowledge/DOMAIN_REGISTER.md` — add D-47
  - `docs/knowledge/SYSTEM_KNOWLEDGE_GRAPH.md` — add §21
  - `docs/knowledge/REBASELINED_BUILD_SEQUENCE.md` — add Unit 51 (READY)
- **Acceptance:** Domain registered. Build unit registered with READY status.

### Task 10.4: Update DECISIONS.md and PROPOSITION_EVOLUTION.md
- **Requirement:** Traceability chain
- **Files:**
  - `DECISIONS.md` — add DEC-journey-intelligence-foundation
  - `docs/00_authority/PROPOSITION_EVOLUTION.md` — add EVO-011
  - `docs/00_authority/GLOSSARY.md` — add Journey Intelligence terms
- **Acceptance:** Decision recorded. Evolution entry added. Glossary terms present.
