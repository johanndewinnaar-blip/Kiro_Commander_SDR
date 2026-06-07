# DATA DICTIONARY — Commander SDR

**Purpose:** This documents the BUILT fields of entities AGAINST the canonical entity model (Spec #29 Universal Risk Object + Spec #46 Canonical Glossary). It is NOT a rival or second entity model. It is truth-not-plan: it records what is built and cannot drift from code. It is the handoff artifact for the future derivation stream (Team 2).

**Authority:** This artifact is mechanically derived from:
- `packages/contracts/src/entities/` (TypeScript contract definitions)
- `packages/db/src/schema/` (Drizzle ORM schema definitions)
- `packages/contracts/src/fixtures/` (seed data availability)
- `packages/contracts/src/resolvers/` (system-calculated field resolvers)

**Availability determination:** AVAILABLE vs FUTURE is derived mechanically:
- Entity has fixture → seeded data points are AVAILABLE
- integration-derived fields → FUTURE (blocker: Phase 2 connector integration)
- system-calculated fields → AVAILABLE if resolver exists; else FUTURE (blocker: missing resolver)

**Source citations:** All entity definitions cite baseline specs from `docs/99_source_archive/baseline_v2_6_2/`, never the translation layer (per SOURCING_RULE.md).

**Coverage read-state:** Entity entries marked "provisional" when source spec is partially read per `docs/knowledge/COVERAGE.md`.

---

## Entity Catalogue

### 1. Asset

**Source:** Spec #05 §6.4.2 Asset, Spec #46 Canonical Terminology  
**Coverage:** Partial (Spec #05 initial portion read)  
**Contract:** `packages/contracts/src/entities/asset.ts`  
**DB Schema:** `packages/db/src/schema/assets.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-assets.ts` ✅  
**Status:** AVAILABLE (fixture exists)

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | Deterministic ID from fixture |
| `entityType` | `'asset'` | seeded | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope (tenantId, tenantName) |
| `name` | string | seeded | AVAILABLE | — | Asset display name |
| `classification` | AssetClassification | seeded | AVAILABLE | — | 9 types: endpoint, server, cloud-instance, container, network-device, application, database, iot-device, mobile-device |
| `owner` | string | seeded | AVAILABLE | — | Ownership |
| `environment` | string | seeded | AVAILABLE | — | production, staging, development, etc. |
| `sourceRefs` | string[] | integration-derived | FUTURE | Phase 2 connector integration | Source system references |
| `surfaceAttribution` | SurfaceAttribution | seeded | AVAILABLE | — | internal_attack_surface or external_attack_surface (Spec #60) |
| `coverage.hasEdr` | boolean | integration-derived | FUTURE | Phase 2 connector integration | EDR coverage |
| `coverage.hasVulnScan` | boolean | integration-derived | FUTURE | Phase 2 connector integration | Vulnerability scan coverage |
| `coverage.hasPatchManagement` | boolean | integration-derived | FUTURE | Phase 2 connector integration | Patch management coverage |
| `coverage.hasBackup` | boolean | integration-derived | FUTURE | Phase 2 connector integration | Backup coverage |
| `criticality` | number (1-5) | seeded | AVAILABLE | — | Business criticality |
| `tags` | string[] | seeded | AVAILABLE | — | Tags for grouping |
| `source` | SourceMetadata | seeded | AVAILABLE | — | Provenance (connectorId, importRunId, sourceSystem, sourceTimestamp). Contract↔schema aligned per Spec #05 §11.3. |
| `createdAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record update timestamp |

**DB Schema Reconciliation:** ✅ Contract and schema aligned. DB schema flattens `tenant` to `tenantId` reference and `source` to individual columns (standard pattern).

---

### 2. Case

**Source:** Spec #08 Case Management, Spec #17 Closed-Loop Control Architecture  
**Coverage:** Partial (Spec #08 §§1–15 read, Spec #17 partial)  
**Contract:** `packages/contracts/src/entities/case.ts`  
**DB Schema:** `packages/db/src/schema/cases.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-cases.ts` ✅  
**Status:** AVAILABLE (fixture exists)  
**Doctrine:** Cases are system-owned. No manual creation, manual closure, or manual lifecycle progression (Doctrinal Assertion 1).

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | system-calculated | AVAILABLE | — | Deterministic ID |
| `entityType` | `'case'` | system-calculated | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope |
| `caseRef` | string | system-calculated | AVAILABLE | — | Case reference number (unique) |
| `caseType` | CaseTypeExtended | system-calculated | AVAILABLE | — | 12 canonical types + 5 legacy aliases |
| `title` | string | system-calculated | AVAILABLE | — | Case title |
| `status` | CaseStatusExtended | workflow-derived | AVAILABLE | — | 12-state closed-loop lifecycle (detected, bound, routed, prioritised, action_decomposed, in_progress, pending_validation, validation_running, validated_pass, validated_fail, pending_closure_gates, closed_by_system, reopened_by_system) + 6 legacy aliases for seed data backward compatibility — system-owned transitions only. DB enum enforces canonical 12 states; legacy aliases mapped before persistence via `LEGACY_STATUS_MAP`. |
| `priority` | Priority | system-calculated | AVAILABLE | — | P0, P1, P2, P3, P4 (resolver: case-prioritiser.ts) |
| `owner` | string | system-calculated | AVAILABLE | — | Assigned owner via routing engine (resolver: case-router.ts) |
| `team` | string | system-calculated | AVAILABLE | — | Assigned team via routing engine |
| `sla.targetResolutionHours` | number | system-calculated | AVAILABLE | — | SLA target (resolver: case-sla-calculator.ts) |
| `sla.breached` | boolean | system-calculated | AVAILABLE | — | SLA breach status |
| `surfaceAttribution` | SurfaceAttribution | system-calculated | AVAILABLE | — | internal_attack_surface or external_attack_surface |
| `relatedEntities` | string[] | system-calculated | AVAILABLE | — | Related entity IDs |
| `auditTrailRef` | string | system-calculated | AVAILABLE | — | Audit trail reference |
| `routingRationale` | string | system-calculated | AVAILABLE | — | Routing rationale from routing engine |
| `source` | SourceMetadata | system-calculated | AVAILABLE | — | Provenance. Contract↔schema aligned per Spec #05 §11.3 (rawPayloadRef removed). |
| `createdAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record update timestamp |

**DB Schema Reconciliation:** ✅ Contract and schema aligned. DB schema flattens nested `sla` object to `slaTargetHours` and `slaBreached` columns.

**Resolvers:**
- `case-prioritiser.ts` — priority calculation
- `case-router.ts` — owner/team assignment
- `case-sla-calculator.ts` — SLA target calculation
- `case-closure-evaluator.ts` — closure gate evaluation
- `case-reopening-evaluator.ts` — reopening trigger evaluation
- `case-validation-evaluator.ts` — validation window evaluation
- `case-strategy-resolver.ts` — strategy policy binding
- `assignment-engine.ts` — assignment logic
- `closure-gate-enforcer.ts` — closure gate enforcement
- `reopening-trigger-enforcer.ts` — reopening trigger enforcement
- `validation-window-enforcer.ts` — validation window enforcement

---

### 3. Identity

**Source:** Spec #05 §6.4.3 Identity, Spec #18 Unified Identity Architecture  
**Coverage:** Partial (Spec #05 initial portion, Spec #18 initial portion read)  
**Contract:** `packages/contracts/src/entities/identity.ts`  
**DB Schema:** `packages/db/src/schema/identities.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-identities.ts` ✅  
**Status:** AVAILABLE (fixture exists)

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | Deterministic ID |
| `entityType` | `'identity'` | seeded | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope |
| `displayName` | string | seeded | AVAILABLE | — | Display name |
| `classification` | IdentityClassification | seeded | AVAILABLE | — | human, service-account, workload-identity, third-party (per Spec #18) |
| `sourceSystemLineage` | string[] | integration-derived | FUTURE | Phase 2 connector integration | Source system lineage |
| `email` | string | seeded | AVAILABLE | — | Email (synthetic — never real) |
| `department` | string | seeded | AVAILABLE | — | Department or team |
| `role` | string | seeded | AVAILABLE | — | Role title |
| `riskScore` | number (0-100) | system-calculated | FUTURE | Missing resolver: identity-risk-scorer.ts | Risk score |
| `surfaceAttribution` | SurfaceAttribution | seeded | AVAILABLE | — | internal_attack_surface or external_attack_surface |
| `associatedAssets` | string[] | integration-derived | FUTURE | Phase 2 connector integration | Associated asset IDs |
| `status` | string | seeded | AVAILABLE | — | active, suspended, disabled, orphaned |
| `source` | SourceMetadata | seeded | AVAILABLE | — | Provenance. Contract↔schema aligned per Spec #05 §11.3 (rawPayloadRef removed). |
| `createdAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record update timestamp |

**DB Schema Reconciliation:** ✅ Contract and schema aligned.

---

### 4. Risk Object

**Source:** Spec #29 Universal Risk Object and Case Binding (base entity); COIM-A source-classification + timeline augmentation per `DECISIONS.md` `DEC-coim-ocsf-source-classification-architecture` (accepted COIM artefacts at `docs/knowledge/ocsf_assessment/`, OCSF as schema-engineering reference only)  
**Coverage:** Partial (Spec #29 base spec read; COIM v1.0 §4 + `02_SOURCE_CLASSIFICATION_MODEL.md` §4–§5 accepted)  
**Contract:** `packages/contracts/src/entities/risk-object.ts` + `packages/contracts/src/entities/coim.ts`  
**DB Schema:** `packages/db/src/schema/risk-objects.ts` ✅ (migration `0005_risk_object_coim_a.sql`)  
**Fixture:** `packages/contracts/src/fixtures/seed-risk-objects.ts` ✅ (all 3 seed objects populate `sourceClassification`)  
**Status:** AVAILABLE (fixture exists, db schema created, COIM-A delivered)

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | Deterministic ID |
| `entityType` | `'risk-object'` | seeded | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope |
| `type` | RiskObjectType | seeded | AVAILABLE | — | 8 types: coverage_blindspot, ooda_phase_degradation, vulnerability_drift, configuration_drift, exposure_drift, control_gap, identity_risk, policy_gap |
| `affectedEntityId` | string | seeded | AVAILABLE | — | ID of affected entity |
| `affectedEntityType` | string | seeded | AVAILABLE | — | Type of affected entity |
| `justification` | string | seeded | AVAILABLE | — | Justification for risk object creation |
| `owner` | string | seeded | AVAILABLE | — | Owner responsible for treatment |
| `treatmentState` | TreatmentState | seeded | AVAILABLE | — | open, mitigated, accepted, transferred |
| `expiryOrReviewTrigger` | string | seeded | AVAILABLE | — | Expiry or review trigger condition |
| `source` | SourceMetadata | seeded | AVAILABLE | — | Provenance. Contract↔schema aligned per Spec #05 §11.3 (rawPayloadRef removed). |
| `sourceClassification` | SourceClassification (JSONB) | integration-derived (immutable); seeded in fixtures | AVAILABLE | — | COIM-A composed object (`coim.ts`). Immutable source provenance: findingClass, sourceSeverity, sourceConfidence, sourceProduct, sourceFindingUid, sourceActivity, attacks[]≤20, observables[]≤50. Optional at type level for back-compat; populated by normalisation at ingestion. Informs but never governs lifecycle/priority/routing/closure. |
| `sourceClassification.findingClass` (extracted) | FindingClass enum | integration-derived; seeded | AVAILABLE | — | vulnerability/detection/compliance/incident/data_security/iam_analysis/application_security — indexed column `finding_class` |
| `sourceClassification.severityId` (extracted) | integer (1-5) | integration-derived; seeded | AVAILABLE | — | indexed column `severity_id` |
| `sourceClassification.confidenceScore` (extracted) | integer (0-100) | integration-derived; seeded | AVAILABLE | — | column `confidence_score` |
| `sourceFindingUid` (extracted) | string | integration-derived; seeded | AVAILABLE | — | source-system finding ID for deduplication; indexed column `source_finding_uid` |
| `affectedEntities` | string[] (JSONB) | system-calculated; seeded | AVAILABLE | — | COIM-aligned plural form; singular `affectedEntityId` retained above for back-compat |
| `firstDetectedAt` | string (ISO 8601) / timestamptz | integration-derived (source); seeded | AVAILABLE | — | Timeline model (COIM-A); resolves ARCH-DEBT-045 (Risk Object portion) |
| `lastConfirmedAt` | string (ISO 8601) / timestamptz | integration-derived (source); seeded | AVAILABLE | — | Timeline model (COIM-A); resolves ARCH-DEBT-045 (Risk Object portion) |
| `normalisedAt` | string (ISO 8601) / timestamptz | system-calculated; seeded | AVAILABLE | — | Timeline model (COIM-A); resolves ARCH-DEBT-045 (Risk Object portion) |
| `createdAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record update timestamp |

**COIM-A composed objects** (`packages/contracts/src/entities/coim.ts`, consumed by Risk Object — not standalone canonical entities, no own table): `FindingClass`, `SourceSeverityLevel`/`SourceSeverity` (+ `SEVERITY_ID` 1-5), `SourceConfidenceLevel`/`SourceConfidence` (score 0-100), `SourceProduct` (vendor/name/version/uid/connectorClass), `AttackMapping` (tactic/technique/subTechnique/version, max `MAX_ATTACK_BINDINGS`=20), `ObservableType`/`ObservableRef` (max `MAX_OBSERVABLES`=50), `SourceClassification`, and validation helper `validateSourceClassification()` → `SourceClassificationValidation` (structural provenance-shape validation only; does NOT participate in governance/lifecycle/priority/routing). OCSF is a schema-engineering reference only (finding_info, attack, observable, product, severity_id, confidence_id) — NOT Commander authority. Source: `DEC-coim-ocsf-source-classification-architecture`; `02_SOURCE_CLASSIFICATION_MODEL.md` §4–§5; COIM v1.0 §4.

**DB Schema Reconciliation:** ✅ Contract and schema aligned. DB schema flattens `tenant` to `tenantId` reference and `source` to individual columns (standard pattern). COIM-A adds `sourceClassification` JSONB + extracted indexed columns (`finding_class` enum, `severity_id`, `confidence_score`, `source_finding_uid`), `affected_entities` JSONB, and `first_detected_at`/`last_confirmed_at`/`normalised_at` timestamptz columns (migration `0005_risk_object_coim_a.sql`). Resolves ARCH-DEBT-039; ARCH-DEBT-045 (Risk Object portion).

---

### 5. Connector

**Source:** Spec #05 §6.4.4 Connector, Spec #61 Universal Security Signal Connector Contract  
**Coverage:** Partial (Spec #05 initial portion, Spec #61 §§1–7 read)  
**Contract:** `packages/contracts/src/entities/connector.ts`  
**DB Schema:** `packages/db/src/schema/connectors.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-connectors.ts` ✅  
**Status:** AVAILABLE (fixture exists)

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | Deterministic ID |
| `entityType` | `'connector'` | seeded | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope |
| `name` | string | seeded | AVAILABLE | — | Connector display name |
| `classes` | ConnectorClass[] | seeded | AVAILABLE | — | A/B/C/D only (Spec #61): A=SOC Telemetry, B=Operational Verdict, C=Configuration State, D=Threat Intelligence |
| `sourceType` | string | seeded | AVAILABLE | — | Vendor platform name |
| `tier` | string | seeded | AVAILABLE | — | core, extended, community |
| `state` | ConnectorState | seeded | AVAILABLE | — | active, paused, error, pending-approval, decommissioned. State machine enforced by `connector-pull-orchestrator.ts` (valid transitions only). |
| `lastRunAt` | string \| null | workflow-derived | AVAILABLE | — | Last successful run timestamp |
| `lastRunStatus` | string | workflow-derived | AVAILABLE | — | success, partial, failed, never-run (enum in DB schema) |
| `mappingPackVersion` | string | seeded | AVAILABLE | — | Mapping pack version |
| `classConformance` | ClassConformance[] \| null | system-calculated | AVAILABLE | — | Per-class conformance tier tracking (Certified/Full/Baseline/Planned per Spec #61 §7). JSONB array of {class, tier, certifiedAt, lastAssessedAt}. |
| `source` | SourceMetadata | seeded | AVAILABLE | — | Provenance. Contract↔schema aligned per Spec #05 §11.3 (rawPayloadRef removed). |
| `createdAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record update timestamp |

**Runtime Functions (Unit 4):**
- `connector-pull-orchestrator.ts` — pull orchestration (read-only), signal purpose resolution, state machine enforcement, conformance tier assessment, multi-class validation. Source: Spec #61.

**DB Schema Reconciliation:** ✅ Contract and schema aligned. DB schema adds `conformanceTierEnum`, `connectorStateEnum`, `lastRunStatusEnum` (typed enums replacing text columns), and `classConformance` JSONB column for per-class conformance tracking.

---

### 6. Strategy Policy

**Source:** Spec #32 Strategy Layer Runtime Surface Specification  
**Coverage:** Partial (Spec #32 base spec read)  
**Contract:** `packages/contracts/src/entities/strategy.ts`  
**DB Schema:** `packages/db/src/schema/strategies.ts` ✅  
**Fixture:** `packages/contracts/src/fixtures/seed-strategies.ts` ✅  
**Status:** AVAILABLE (fixture exists, db schema created)

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | Deterministic ID |
| `entityType` | `'strategy-policy'` | seeded | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope |
| `surfaceType` | StrategySurfaceType | seeded | AVAILABLE | — | 17 types: sla, threshold, automation-boundary, routing, posture, mission-objective, operational-tempo, domain-specific, prioritisation-weight, validation-window, closure-gate, reopening-trigger, evidence-sufficiency, sla-modifier, correlation-policy, effectiveness-targets, ssvc-decision-tree. Original 13 seeded; 4 CMEP-1.0 types (sla-modifier, correlation-policy, effectiveness-targets, ssvc-decision-tree) contract-defined but NOT yet seeded in fixture and NOT yet in DB enum — see divergence note below. |
| `policyVersion` | string | seeded | AVAILABLE | — | Policy version (semantic) |
| `status` | StrategyPolicyStatus | seeded | AVAILABLE | — | draft, pending-approval, approved, active, superseded, rejected |
| `configuration` | Record<string, unknown> | seeded | AVAILABLE | — | Policy configuration (JSON — shape varies by surface type) |
| `proposedBy` | string | seeded | AVAILABLE | — | Who proposed this policy |
| `proposedAt` | string | seeded | AVAILABLE | — | When it was proposed |
| `approval` | StrategyApproval \| null | workflow-derived | AVAILABLE | — | Approval metadata (approvedBy, approvedAt, condition, rationale) |
| `effectiveFrom` | string \| null | workflow-derived | AVAILABLE | — | Effective from timestamp |
| `effectiveUntil` | string \| null | workflow-derived | AVAILABLE | — | Effective until timestamp |
| `simulationRef` | string \| null | workflow-derived | AVAILABLE | — | Simulation result reference. Resolver: `strategy-policy-lifecycle.ts` `simulatePolicy()`. |
| `source` | SourceMetadata | seeded | AVAILABLE | — | Provenance. Contract↔schema aligned per Spec #05 §11.3 (rawPayloadRef removed). |
| `createdAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record update timestamp |

**DB Schema Reconciliation:** ⚠️ DIVERGENT — Contract declares 17 `StrategySurfaceType` values (CMEP-1.0 extension adds `sla-modifier`, `correlation-policy`, `effectiveness-targets`, `ssvc-decision-tree`). DB schema `strategySurfaceTypeEnum` still declares only 13 values. A migration is required to add the 4 new enum values. DB flattens `tenant` to `tenantId` reference, `source` to individual columns, `approval` to JSONB, `proposedAt`/`effectiveFrom`/`effectiveUntil` to timestamptz.

**Fixture gap:** `seed-strategies.ts` seeds 13 policies (one per original surface). The 4 CMEP-1.0 surface types (`sla-modifier`, `correlation-policy`, `effectiveness-targets`, `ssvc-decision-tree`) have NO seed fixture entries yet.

---

### 7. Audit Event

**Source:** Spec #05 §6.4.5 AuditEntry  
**Coverage:** Partial (Spec #05 initial portion read)  
**Contract:** `packages/contracts/src/entities/audit-event.ts`  
**DB Schema:** `packages/db/src/schema/audit-events.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-events.ts` ✅  
**Status:** AVAILABLE (fixture exists)

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | system-calculated | AVAILABLE | — | Deterministic ID |
| `entityType` | `'audit-event'` | system-calculated | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope |
| `actor.type` | string | system-calculated | AVAILABLE | — | system, user, connector, commander-ai |
| `actor.id` | string | system-calculated | AVAILABLE | — | Actor ID |
| `actor.name` | string | system-calculated | AVAILABLE | — | Actor name |
| `action` | string | system-calculated | AVAILABLE | — | Action performed |
| `entityRef.entityType` | string | system-calculated | AVAILABLE | — | Entity type acted upon |
| `entityRef.entityId` | string | system-calculated | AVAILABLE | — | Entity ID acted upon |
| `sourceSignal` | string \| null | system-calculated | AVAILABLE | — | Source signal that triggered this event |
| `priorState` | Record<string, unknown> \| null | system-calculated | AVAILABLE | — | Prior state (if applicable) |
| `newState` | Record<string, unknown> \| null | system-calculated | AVAILABLE | — | New state (if applicable) |
| `rationale` | string | system-calculated | AVAILABLE | — | Machine-readable rationale |
| `immutable` | true | system-calculated | AVAILABLE | — | Immutable audit record flag |
| `source` | SourceMetadata | system-calculated | AVAILABLE | — | Provenance. Contract↔schema aligned per Spec #05 §11.3 (rawPayloadRef removed). |
| `createdAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record creation timestamp |

**DB Schema Reconciliation:** ✅ Contract and schema aligned. DB schema flattens `actor` and `entityRef` to individual columns.

---

### 8. Case Lifecycle (State Machine)

**Source:** Spec #08 Case Management, Spec #30 Universal Validation, Closure and Reopening Lifecycle  
**Coverage:** Partial (Spec #08 §§1–15 read, Spec #30 base spec read)  
**Contract:** `packages/contracts/src/entities/case-lifecycle.ts`  
**DB Schema:** ❌ NOT FOUND (lifecycle transitions stored in audit events, not separate table)  
**Fixture:** ❌ NOT APPLICABLE (state machine logic, not data)  
**Status:** AVAILABLE (resolvers exist)

**LifecycleActor type union (11 members):**
- `system` — general system transitions
- `routing-engine` — routing transitions
- `binding-engine` — binding transitions
- `prioritisation-engine` — prioritisation transitions
- `validation-engine` — validation transitions
- `closure-engine` — closure transitions
- `reopening-engine` — reopening transitions
- `reassessment-engine` — ⚠️ type-declared only; NOT in `LIFECYCLE_ACTORS` runtime constant; no transitions wired; no resolver
- `correlation-engine` — ⚠️ type-declared only; NOT in `LIFECYCLE_ACTORS` runtime constant; no transitions wired; no resolver
- `enrichment-engine` — ⚠️ type-declared only; NOT in `LIFECYCLE_ACTORS` runtime constant; no transitions wired; no resolver
- `effectiveness-engine` — ⚠️ type-declared only; NOT in `LIFECYCLE_ACTORS` runtime constant; no transitions wired; no resolver

**⚠️ DIVERGENCE: `LifecycleActor` type (11 members) vs `LIFECYCLE_ACTORS` runtime constant (7 members).** The runtime constant does not include the 4 new engine actors. `executeTransition()` validates against `LIFECYCLE_ACTORS` (the constant), so transitions by new actors will be rejected at runtime until the constant is updated and corresponding `ALLOWED_TRANSITIONS` entries are added. PROPOSED: register in ARCHITECTURAL_DEBT_REGISTER.md as divergence requiring resolution.

**12-State Lifecycle (canonical — Unit 7 rebaseline):**
- `detected → bound → routed → prioritised → action_decomposed → in_progress`
- `in_progress → pending_validation → validation_running → validated_pass / validated_fail`
- `validated_pass → pending_closure_gates → closed_by_system → reopened_by_system → in_progress`
- `validated_fail → in_progress` (remediation loop)

**Legacy 6-State Aliases (seed data backward compatibility):**
- `open` → `detected`
- `in-progress` → `in_progress`
- `awaiting-validation` → `pending_validation`
- `awaiting-closure` → `pending_closure_gates`
- `closed` → `closed_by_system`
- `reopened` → `reopened_by_system`

**Doctrine:** Cases are system-owned. No manual creation, manual closure, or manual status edit. Actor MUST be in the permitted actor set for the specific transition.

**Resolvers:**
- `case-closure-evaluator.ts` — closure gate evaluation
- `case-reopening-evaluator.ts` — reopening trigger evaluation
- `case-validation-evaluator.ts` — validation window evaluation
- `closure-gate-enforcer.ts` — closure gate enforcement
- `reopening-trigger-enforcer.ts` — reopening trigger enforcement
- `validation-window-enforcer.ts` — validation window enforcement
- ❌ No resolver for `reassessment-engine` (FUTURE)
- ❌ No resolver for `correlation-engine` (FUTURE)
- ❌ No resolver for `enrichment-engine` (FUTURE)
- ❌ No resolver for `effectiveness-engine` (FUTURE)

**DB Schema Reconciliation:** ✅ Lifecycle transitions recorded in audit events (standard pattern).

---

### 9. Case Strategy Binding

**Source:** Spec #32 Strategy Layer Runtime Surface, Spec #08 Case Management  
**Coverage:** Partial (Spec #32 base spec read, Spec #08 §§1–15 read)  
**Contract:** `packages/contracts/src/entities/case-strategy-binding.ts`  
**DB Schema:** `packages/db/src/schema/case-strategy-bindings.ts` ✅  
**Fixture:** `packages/contracts/src/fixtures/seed-case-strategy-bindings.ts` ✅  
**Status:** AVAILABLE (fixture exists, db schema created)

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `caseId` | string | seeded | AVAILABLE | — | Case ID — primary key (one binding row per case) |
| `tenantId` | string | seeded | AVAILABLE | — | Tenant scope (DB infrastructure column) |
| `dataClassification` | DataClassification | seeded | AVAILABLE | — | Default: 'configuration' (DB infrastructure column) |
| `routingStrategy` | StrategyPolicyRef (JSONB) | seeded | AVAILABLE | — | Routing strategy — determines owner/team. Shape: {surfaceType, policyId, policyVersion, evaluatedAt} |
| `slaStrategy` | StrategyPolicyRef (JSONB) | seeded | AVAILABLE | — | SLA strategy — determines SLA target hours |
| `prioritisationWeightStrategy` | StrategyPolicyRef (JSONB) | seeded | AVAILABLE | — | Prioritisation weight strategy — determines priority calculation |
| `closureGateStrategy` | StrategyPolicyRef (JSONB) | seeded | AVAILABLE | — | Closure gate strategy — determines closure gates |
| `reopeningTriggerStrategy` | StrategyPolicyRef (JSONB) | seeded | AVAILABLE | — | Reopening trigger strategy — determines reopening triggers |
| `validationWindowStrategy` | StrategyPolicyRef (JSONB) | seeded | AVAILABLE | — | Validation window strategy — determines validation freshness |
| `createdAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record update timestamp |

**Six Strategy Surfaces Consumed by Case Management:**
1. Routing Strategy — determines owner/team
2. SLA Strategy — determines SLA target hours
3. Prioritisation Weight Strategy — determines priority calculation
4. Closure Gate Strategy — determines closure gates
5. Reopening Trigger Strategy — determines reopening triggers
6. Validation Window Strategy — determines validation freshness

**Doctrine:** All case values are derived from strategy layer; none are hardcoded.

**DB Schema Reconciliation:** ✅ Contract and schema aligned. DB schema stores each StrategyPolicyRef as JSONB column (preserving the {surfaceType, policyId, policyVersion, evaluatedAt} shape). DB adds standard infrastructure columns (tenantId, dataClassification, createdAt, updatedAt) — same pattern as other entities.

---

### 10. Common Fields (Shared)

**Source:** Spec #05 §6.4.1 Common Fields, §11.3 Provenance  
**Coverage:** Partial (Spec #05 initial portion read)  
**Contract:** `packages/contracts/src/entities/common.ts`  
**DB Schema:** `packages/db/src/schema/common.ts` (enums only)  
**Fixture:** ✅ Embedded in all entity fixtures  
**Status:** AVAILABLE

**Common Fields Present on All Entities:**

| Field | Type | Source Classification | Availability | Notes |
|-------|------|----------------------|--------------|-------|
| `id` | string | seeded or system-calculated | AVAILABLE | Deterministic unique identifier |
| `tenant.tenantId` | string | seeded | AVAILABLE | Tenant scope — required, never ambiguous |
| `tenant.tenantName` | string | seeded | AVAILABLE | Tenant name |
| `source.connectorId` | string | seeded or system-calculated | AVAILABLE | Connector that produced this record |
| `source.importRunId` | string | seeded or system-calculated | AVAILABLE | Import run identifier |
| `source.sourceSystem` | string | seeded or system-calculated | AVAILABLE | Source system identifier |
| `source.sourceTimestamp` | string (ISO 8601) | seeded or system-calculated | AVAILABLE | Timestamp of source extraction |
| `createdAt` | string (ISO 8601) | system-calculated | AVAILABLE | When this record was created in Commander |
| `updatedAt` | string (ISO 8601) | system-calculated | AVAILABLE | When this record was last updated |

**Raw Payload Reference — Resolved (Unit 0, 2026-05-31):**

`rawPayloadRef` has been **removed from `SourceMetadata`** in `packages/contracts/src/entities/common.ts` (ARCH-DEBT-033 resolved). Per Spec #05 §11.3, the canonical provenance set does not include `raw_payload_ref` — it belongs to the raw-ingestion store (§11.2). The contract now matches the DB schemas (which never carried the field) and Spec #05 §11.3. Lineage to raw vendor payloads is preserved at the architecture level via the raw-ingestion store's `normalised_entity_refs` (Phase 2 deliverable).

---

### 11. Evidence

**Source:** COIM v1.0 §4.4; 04_EVIDENCE_MODEL.md; Spec #08 Case Management (Evidence Packs §12); Commander doctrine assertion #1  
**Coverage:** Full (04_EVIDENCE_MODEL.md read in entirety per COVERAGE.md)  
**Contract:** `packages/contracts/src/entities/evidence.ts`  
**DB Schema:** `packages/db/src/schema/evidence.ts` ✅  
**Fixture:** `packages/contracts/src/fixtures/seed-evidence.ts` ✅ (5 seed artifacts)  
**Status:** AVAILABLE (fixture exists)  
**Build unit:** COIM-B (Evidence Entity). Resolves ARCH-DEBT-040.  
**Doctrine:** Evidence informs but never governs lifecycle, priority, routing, validation or closure. Source-owned fields are immutable after write. Bindings are immutable after write.

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | system-calculated | AVAILABLE | — | Deterministic ID (from CommonFields) |
| `entityType` | `'evidence'` | system-calculated | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope (tenantId, tenantName) |
| `evidenceType` | EvidenceType (enum) | integration-derived; seeded in fixtures | AVAILABLE | — | 9 types: log, scan, verdict, screenshot, config, network_capture, file_hash, process_dump, ai_analysis |
| `evidenceSource` | EvidenceSource (enum) | integration-derived; seeded in fixtures | AVAILABLE | — | 3 sources: connector, analyst, system. Source-owned (immutable after write). |
| `collectedAt` | string (ISO 8601) / timestamptz | integration-derived; seeded in fixtures | AVAILABLE | — | When evidence was collected (source timestamp). Source-owned (immutable after write). |
| `contentRef` | string | integration-derived; seeded in fixtures | AVAILABLE | — | Object-store pointer (S3 URI or equivalent). Source-owned (immutable after write). |
| `immutabilityHash` | string (SHA-256, 64 hex chars) | system-calculated; seeded in fixtures | AVAILABLE | — | SHA-256 hash of evidence content. Integrity verification. Source-owned (immutable after write). |
| `confidence` | number (0-100) / integer | system-calculated; seeded in fixtures | AVAILABLE | — | Commander-owned. Mutable — may be updated based on validation. |
| `expiresAt` | string (ISO 8601) / timestamptz | system-calculated | AVAILABLE | — | Optional. Computed from collectedAt + freshness policy. Commander-owned, mutable. |
| `freshnessStatus` | FreshnessStatus (enum) | system-calculated; seeded in fixtures | AVAILABLE | — | 4 statuses: fresh, aging, stale, expired. Computed at evaluation time. Commander-owned, mutable. |
| `caseId` | string | system-calculated; seeded in fixtures | AVAILABLE | — | Required binding. FK → cases.id. Immutable after write. |
| `subActionId` | string (optional) | system-calculated | AVAILABLE | — | Optional binding. Immutable after write. |
| `validationDecisionId` | string (optional) | system-calculated | AVAILABLE | — | Optional binding. Immutable after write. |
| `riskObjectId` | string (optional) | system-calculated; seeded in fixtures | AVAILABLE | — | Optional binding. Immutable after write. |
| `source` | SourceMetadata | seeded | AVAILABLE | — | Provenance (connectorId, importRunId, sourceSystem, sourceTimestamp). Contract↔schema aligned. |
| `createdAt` | string (ISO 8601) / timestamptz | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string (ISO 8601) / timestamptz | system-calculated | AVAILABLE | — | Record update timestamp |

**Ownership model:**
- Source-owned (immutable after write): evidenceType, evidenceSource, collectedAt, contentRef, immutabilityHash
- Commander-owned (mutable): confidence, expiresAt, freshnessStatus
- Immutable bindings: caseId, subActionId, validationDecisionId, riskObjectId

**Validation:** `validateEvidence()` in `evidence.ts` — structural correctness checking (type/source/confidence range/hash format/required bindings/freshness/temporal ordering). No engine-logic dependency.

**DB Schema Reconciliation:** ✅ Contract and schema aligned. DB schema flattens `tenant` to `tenantId` reference (FK → tenants.id) and `source` to individual columns (`source_connector_id`, `source_import_run_id`, `source_system`, `source_timestamp`) — standard pattern. Enum columns: `evidence_type` (9 values), `evidence_source` (3 values), `freshness_status` (4 values). FK binding: `case_id` → cases.id. Additional DB-only column: `data_classification` (default 'case'). No divergences.

**Resolvers:** None (no evidence-specific resolver in `packages/contracts/src/resolvers/`). `freshnessStatus` is computed at evaluation time — no dedicated resolver file yet. `validateEvidence()` is a structural validator, not a resolver.

---

### 12. Verdict

**Source:** COIM v1.0 §6 (Verdict impact); Spec #62 Verdict Semantics  
**Coverage:** Partial (Spec #62 §1–§6 read; §7+ truncated — entry provisional per COVERAGE.md)  
**Contract:** `packages/contracts/src/entities/verdict.ts`  
**DB Schema:** `packages/db/src/schema/verdicts.ts` ✅  
**Fixture:** `packages/contracts/src/fixtures/seed-verdicts.ts` ✅ (5 seed verdicts)  
**Status:** AVAILABLE (fixture exists)  
**Build unit:** COIM-C (Verdict Entity Promotion). Resolves ARCH-DEBT-043.  
**Doctrine:** Verdicts are time-bound, confidence-weighted claims made by tools. They preserve semantic disposition — NOT binary pass/fail (Doctrinal Assertion 11). Verdicts are immutable source provenance. Commander processes but does not mutate them. Expired verdicts fall back to ALLOW per Spec #62.

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | system-calculated | AVAILABLE | — | Deterministic ID (from CommonFields) |
| `entityType` | `'verdict'` | system-calculated | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope (tenantId, tenantName) |
| `disposition` | VerdictDisposition (enum) | integration-derived; seeded in fixtures | AVAILABLE | — | 8 semantic dispositions: BLOCK, QUARANTINE, REQUIRE_MFA, REQUIRE_COMPLIANT, COACH, MONITOR, AUDIT, ALLOW. Severity ordering preserved (Spec #62). NOT binary pass/fail. |
| `sourceProduct` | SourceProduct (JSONB) | integration-derived; seeded in fixtures | AVAILABLE | — | Structured: vendor, name, version, uid, connectorClass. Source-owned (immutable after write). |
| `confidence` | number (0-100) / integer | integration-derived; seeded in fixtures | AVAILABLE | — | Source confidence in this verdict. Source-owned (immutable after write). |
| `observedAt` | string (ISO 8601) / timestamptz | integration-derived; seeded in fixtures | AVAILABLE | — | When verdict was observed/issued (source timestamp). Source-owned (immutable after write). |
| `targetEntityId` | string | integration-derived; seeded in fixtures | AVAILABLE | — | Target entity ID (asset, identity, etc.). Source-owned (immutable after write). |
| `targetEntityType` | string | integration-derived; seeded in fixtures | AVAILABLE | — | Target entity type. Supports non-identity verdicts per COIM v1.0 §6. Source-owned (immutable after write). |
| `policyRef` | VerdictPolicyRef (JSONB) | integration-derived; seeded in fixtures | AVAILABLE | — | Structured: policyId (required), policyName, policyVersion, policySource. Source-owned (immutable after write). |
| `timeBound` | boolean | integration-derived; seeded in fixtures | AVAILABLE | — | Whether this verdict is time-bound (expires). Source-owned (immutable after write). |
| `expiresAt` | string (ISO 8601) / timestamptz / null | integration-derived; seeded in fixtures | AVAILABLE | — | Expiry timestamp (null if not time-bound). Expired verdicts fall back to ALLOW (Spec #62). Source-owned (immutable after write). |
| `source` | SourceMetadata | seeded | AVAILABLE | — | Provenance (connectorId, importRunId, sourceSystem, sourceTimestamp). Contract↔schema aligned. |
| `createdAt` | string (ISO 8601) / timestamptz | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string (ISO 8601) / timestamptz | system-calculated | AVAILABLE | — | Record update timestamp |

**Ownership model:** All entity-specific fields are source-owned (immutable after write). Commander processes verdicts (expiry evaluation, conflict resolution) but does not mutate them. No Commander-owned fields.

**Validation:** `validateVerdict()` in `verdict.ts` — structural correctness checking (disposition validity, confidence range, required fields, timeBound/expiresAt consistency). No engine-logic dependency.

**Exported constants:**
- `DISPOSITION_SEVERITY` — Record mapping each VerdictDisposition to numeric severity (BLOCK=8 … ALLOW=1)
- `DISPOSITIONS_BY_SEVERITY` — Array ordered highest-to-lowest

**DB Schema Reconciliation:** ✅ Contract and schema aligned. DB schema flattens `tenant` to `tenantId` reference (FK → tenants.id) and `source` to individual columns (`source_connector_id`, `source_import_run_id`, `source_system`, `source_timestamp`) — standard pattern. `sourceProduct` and `policyRef` stored as JSONB. Enum column: `verdict_disposition` (8 values). Additional DB-only columns: `data_classification` (default 'verdict'). `observedAt` and `expiresAt` as timestamptz with timezone. No divergences.

**Resolvers:** None (no verdict-specific resolver in `packages/contracts/src/resolvers/`). Verdict expiry processing and conflict resolution are engine functions (not canonical resolvers).

**Relationship to engine VerdictRecord:** The canonical `Verdict` entity supersedes the engine-internal `VerdictRecord` type (in `normalisation-layer.ts`) for persistence. Engine functions (`processVerdict`, `resolveVerdictConflict`) continue to operate on the same semantic model — no logic change.

---

### 13. Observable

**Source:** COIM v1.0 §4.5; 03_REUSABLE_OBJECT_CATALOGUE.md §2.5  
**Coverage:** provisional (COIM v1.0 §4.5 not explicitly tracked in COVERAGE.md — source partially read)  
**Contract:** `packages/contracts/src/entities/observable.ts`  
**DB Schema:** `packages/db/src/schema/observables.ts` ✅  
**Fixture:** `packages/contracts/src/fixtures/seed-observables.ts` ✅  
**Status:** AVAILABLE (fixture exists)  
**Build unit:** COIM-D (Observable Entity). Resolves ARCH-DEBT-041.  
**Doctrine:** Observables are typed indicators (IP, domain, hash, URL, email, certificate, process, file) extracted from findings. They enable threat-intelligence correlation, cross-case matching, and indicator-based search. Deduplicated per tenant+type+value.

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | system-calculated | AVAILABLE | — | Deterministic ID (from CommonFields) |
| `entityType` | `'observable'` | system-calculated | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope (tenantId, tenantName) |
| `observableType` | ObservableType (enum) | integration-derived; seeded in fixtures | AVAILABLE | — | 8 types: ip, domain, hash, url, email, certificate, process, file. OCSF-informed type_id taxonomy. |
| `value` | string / text | integration-derived; seeded in fixtures | AVAILABLE | — | Indicator value (deduplicated per tenant+type+value). |
| `firstSeen` | string (ISO 8601) / timestamptz | integration-derived; seeded in fixtures | AVAILABLE | — | First observation timestamp. Source-owned (immutable after write). |
| `lastSeen` | string (ISO 8601) / timestamptz | integration-derived; seeded in fixtures | AVAILABLE | — | Last observation timestamp (updated on re-observation). |
| `reputation` | number (0-100) / integer | system-calculated | FUTURE | Missing resolver: no observable-reputation resolver | Enrichment-derived; Commander-owned. Optional. |
| `source` | SourceMetadata | seeded | AVAILABLE | — | Provenance (connectorId, importRunId, sourceSystem, sourceTimestamp). Contract↔schema aligned. |
| `createdAt` | string (ISO 8601) / timestamptz | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string (ISO 8601) / timestamptz | system-calculated | AVAILABLE | — | Record update timestamp |

**Binding table:** `observable_risk_object_bindings` (observableId, riskObjectId, boundAt) — many-to-many deduplication. One observable can be referenced by multiple risk objects.

**Indexes:**
- Deduplication unique index: `tenant_id` + `observable_type` + `value`
- Value search index: `value`
- Type filter index: `observable_type`
- Tenant scope index: `tenant_id`
- Binding indexes: `observable_id`, `risk_object_id`

**Ownership model:**
- Source-owned (immutable after write): observableType, value, firstSeen, lastSeen
- Commander-owned (mutable): reputation (enrichment-derived)
- Bindings: many-to-many with Risk Objects (deduplication)

**Validation:** `validateObservable()` in `observable.ts` — structural correctness checking (type validity, non-empty value, timestamp ordering, reputation range). No engine-logic dependency.

**DB Schema Reconciliation:** ✅ Contract and schema aligned. DB schema flattens `tenant` to `tenantId` reference (FK → tenants.id) and `source` to individual columns (`source_connector_id`, `source_import_run_id`, `source_system`, `source_timestamp`) — standard pattern. Enum column: `observable_type` (8 values). Additional DB-only column: `data_classification` (default 'threat_intelligence'). Separate binding table `observable_risk_object_bindings` for many-to-many. No divergences.

**Resolvers:** None (no observable-specific resolver in `packages/contracts/src/resolvers/`). `reputation` is enrichment-derived — no dedicated resolver file yet.

---

---

### 14. Analytic

**Source:** COIM v1.0 §4.8; 03_REUSABLE_OBJECT_CATALOGUE.md §2.7  
**Coverage:** provisional (COIM v1.0 §4.8; 03_REUSABLE_OBJECT_CATALOGUE.md §2.7 — source partially read)  
**Contract:** `packages/contracts/src/entities/analytic.ts`  
**DB Schema:** `packages/db/src/schema/analytics.ts` ✅  
**Migration:** `packages/db/drizzle/0007_analytic_entity_coim_e.sql` ✅  
**Fixture:** `packages/contracts/src/fixtures/seed-analytics.ts` ✅ (8 seed analytics — all 8 analytic types covered)  
**Test:** `tests/coim-e-analytic-entity/coim-e-analytic.test.ts` ✅  
**Status:** AVAILABLE (fixture exists, DB schema created, COIM-E delivered)  
**Build unit:** COIM-E (Analytic Entity). Resolves ARCH-DEBT-042.  
**Doctrine:** Analytic is the broad reusable COIM concept spanning detection rules, ML models, UEBA models, vendor models, Sigma rules, YARA rules, and security control analytics. Enables detection-engineering metrics, false-positive tracking, analytic-to-ATT&CK binding, and model-vs-rule attribution. Source-owned fields are immutable after write; Commander-owned fields (state, falsePositiveRate, attacks[]) are mutable. OCSF is a schema-engineering reference only (analytic.json type_id enum informs AnalyticType taxonomy) — NOT Commander authority.

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | system-calculated | AVAILABLE | — | Deterministic ID (from CommonFields) |
| `entityType` | `'analytic'` | system-calculated | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope (tenantId, tenantName) |
| `analyticId` | string / text | integration-derived; seeded in fixtures | AVAILABLE | — | Source-provided or Commander-generated unique identifier. Deduplicated per tenant (unique index: tenant_id + analytic_id). Source-owned (immutable after write). |
| `analyticName` | string / text | integration-derived; seeded in fixtures | AVAILABLE | — | Human-readable analytic name. Source-owned (immutable after write). |
| `analyticType` | AnalyticType (enum) | integration-derived; seeded in fixtures | AVAILABLE | — | 8 types: detection_rule, analytic_rule, sigma_rule, yara_rule, ml_model, ueba_model, vendor_model, security_control_analytic. OCSF-informed taxonomy. Source-owned (immutable after write). |
| `version` | string / text | integration-derived; seeded in fixtures | AVAILABLE | — | Analytic version (semantic versioning recommended). Source-owned (immutable after write). |
| `state` | AnalyticState (enum) | system-tracked; seeded in fixtures | AVAILABLE | — | 3 states: active, deprecated, testing. Commander-owned (mutable). DB default: active. |
| `falsePositiveRate` | number (0-100) / integer | system-tracked; seeded in fixtures | AVAILABLE | — | Optional. Commander-owned (mutable). Populated where source provides or Commander measures. Range 0-100 enforced by validateAnalytic(). Seeded with real values for 6 of 8 fixtures; undefined for 2 (vendor_model, security_control_analytic — unscored at ingestion). |
| `attacks` | AttackMapping[] (JSONB, bounded ≤20) | integration-derived; seeded in fixtures | AVAILABLE | — | Optional. ATT&CK bindings for this analytic. Commander-owned (mutable). Bounded by MAX_ANALYTIC_ATTACK_BINDINGS=20. Seeded for 5 of 8 fixtures; undefined for 3. |
| `source.connectorId` | string / text | seeded | AVAILABLE | — | Connector that produced this record |
| `source.importRunId` | string / text | seeded | AVAILABLE | — | Import run identifier |
| `source.sourceSystem` | string / text | seeded | AVAILABLE | — | Source system identifier |
| `source.sourceTimestamp` | string (ISO 8601) / timestamptz | seeded | AVAILABLE | — | Timestamp of source extraction |
| `createdAt` | string (ISO 8601) / timestamptz | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string (ISO 8601) / timestamptz | system-calculated | AVAILABLE | — | Record update timestamp |

**Ownership model:**
- Source-owned (immutable after write): analyticId, analyticName, analyticType, version
- Commander-owned (mutable): state, falsePositiveRate, attacks[]

**Reference shape (AnalyticRef):** Risk Object and Verdict reference Analytic by the lightweight key pair `(analyticId, analyticType)` only. Full metadata lives in the Analytic reference table. Shape: `{ analyticId: string; analyticType: AnalyticType }`.

**Validation:** `validateAnalytic()` in `analytic.ts` — structural correctness checking (non-empty required fields, analyticType validity, state validity, falsePositiveRate 0-100 range, attacks[] max-20 bound). No engine-logic dependency.

**Indexes:**
- Deduplication unique index: `tenant_id` + `analytic_id`
- Type filter index: `analytic_type`
- State filter index: `state`
- Tenant scope index: `tenant_id`

**DB Schema Reconciliation:** ✅ Contract and schema aligned. DB schema flattens `tenant` to `tenantId` reference (FK → tenants.id) and `source` to individual columns (`source_connector_id`, `source_import_run_id`, `source_system`, `source_timestamp`) — standard pattern. `attacks` stored as JSONB (bounded). Enum columns: `analytic_type` (8 values), `analytic_state` (3 values). Additional DB-only column: `data_classification` (default 'configuration'). No divergences.

**Resolvers:** None. No analytic-specific resolver in `packages/contracts/src/resolvers/`. `state`, `falsePositiveRate`, and `attacks[]` are directly written Commander-owned fields requiring no computed resolver. `validateAnalytic()` is a structural validator, not a resolver.

---

**Authority citation (updated 2026-05-31):** `SourceMetadata` interface doc comment now cites both `v1.3 Req 12` and `Spec #05 §11.3` (previously only `v1.3 Req 12`).

**Stale test reference (flagged 2026-05-31):** Two test files still reference `rawPayloadRef` in source objects — these are stale after the contract removal:
- `tests/06-case-management/phase-d2-validation-window.test.ts` (line ~163)
- `tests/06-case-management/phase-d3-closure-reopening.test.ts` (lines ~181, ~377)

These are code-conformance debt items (contract field removed, test fixtures not updated). Route to `docs/00_authority/debt-register.md` per core-testing-commands.md pipeline.

### 15. Action / Sub-Action

**Source:** COIM v1.0 §4.3, §6 (Action/Sub-Action impact); 03_REUSABLE_OBJECT_CATALOGUE §2.3; Spec #08 Case Management (sub-actions)  
**Coverage:** Partial (Spec #08 §§1–15 read; COIM v1.0 §4.3 partially read — entry provisional per COVERAGE.md)  
**Contract:** `packages/contracts/src/entities/action.ts`  
**DB Schema:** `packages/db/src/schema/actions.ts` ✅  
**Fixture:** `packages/contracts/src/fixtures/seed-actions.ts` ✅ (3 actions, 5 sub-actions covering all 5 D3FEND tactics)  
**Status:** AVAILABLE (fixture exists)  
**Build unit:** COIM-H (Action/Sub-Action + D3FEND). Resolves ARCH-DEBT-044, ARCH-DEBT-046.  
**Doctrine:** Actions are system-created when a case transitions to `action_decomposed`. No manual Action/Sub-Action creation or lifecycle edit — doctrinal assertion 1 (closed-loop case model). This entity records what was decomposed, not how the lifecycle transitions. Case lifecycle engine logic unchanged.

#### Action Fields

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | system-calculated | AVAILABLE | — | Deterministic ID (from CommonFields) |
| `entityType` | `'action'` | system-calculated | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope (tenantId, tenantName) |
| `caseId` | string | system-calculated | AVAILABLE | — | Reference to owning case (application-layer enforced, no FK — cross-workload boundary per performance doctrine §5) |
| `title` | string | system-calculated | AVAILABLE | — | Human-readable action title |
| `description` | string | system-calculated | AVAILABLE | — | Action description / remediation objective |
| `estimatedEffortHours` | number (real) | system-calculated | AVAILABLE | — | Total estimated effort for all sub-actions (hours) |
| `actualEffortHours` | number (real) | system-calculated | AVAILABLE | — | Total actual effort recorded across sub-actions (hours) |
| `status` | ActionStatus (enum) | system-calculated | AVAILABLE | — | planned, in_progress, completed, cancelled — derived from sub-action outcomes |
| `approvalRef` | string | system-calculated | AVAILABLE | — | Approval reference (system-generated or routing-engine ref) |
| `owner` | string | system-calculated | AVAILABLE | — | Owner assigned via routing engine |
| `source` | SourceMetadata | seeded | AVAILABLE | — | Provenance (connectorId, importRunId, sourceSystem, sourceTimestamp). Contract↔schema aligned. |
| `createdAt` | string (ISO 8601) / timestamptz | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string (ISO 8601) / timestamptz | system-calculated | AVAILABLE | — | Record update timestamp |

#### Sub-Action Fields

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | system-calculated | AVAILABLE | — | Deterministic ID (from CommonFields) |
| `entityType` | `'sub_action'` | system-calculated | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope (tenantId, tenantName) |
| `actionId` | string | system-calculated | AVAILABLE | — | Reference to parent Action (FK → actions.id) |
| `caseId` | string | system-calculated | AVAILABLE | — | Denormalised case reference (application-layer enforced, no FK — cross-workload boundary) |
| `targetEntity` | string | system-calculated | AVAILABLE | — | Entity targeted by this sub-action (asset ID, identity ID, analytic ref, etc.) |
| `targetEntityType` | string | system-calculated | AVAILABLE | — | Type of the target entity (asset, identity, analytic, etc.) |
| `executionMethod` | string | system-calculated | AVAILABLE | — | How the remediation is executed (patch, isolate, revoke, detection-rule-creation, etc.) |
| `outcomeClassification` | OutcomeClassification (enum) | system-calculated | AVAILABLE | — | successful, partial, failed, cancelled, pending |
| `estimatedEffortHours` | number (real) | system-calculated | AVAILABLE | — | Estimated effort for this sub-action (hours) |
| `actualEffortHours` | number (real) | system-calculated | AVAILABLE | — | Actual effort recorded (hours) |
| `approvalRef` | string | system-calculated | AVAILABLE | — | Approval reference for this specific sub-action |
| `owner` | string | system-calculated | AVAILABLE | — | Assigned owner |
| `sequenceOrder` | integer | system-calculated | AVAILABLE | — | Ordering within the parent Action |
| `tacticType` | D3FENDTacticType (enum) | integration-derived | AVAILABLE | — | D3FEND tactic classification: isolate, evict, restore, harden, detect (ARCH-DEBT-046) |
| `countermeasures` | D3FENDCountermeasure[] (JSONB, bounded ≤10) | integration-derived | AVAILABLE | — | D3FEND countermeasures. Each: {techniqueId, techniqueName, artifactRef?}. Max MAX_COUNTERMEASURES=10 (ARCH-DEBT-046) |
| `source` | SourceMetadata | seeded | AVAILABLE | — | Provenance (connectorId, importRunId, sourceSystem, sourceTimestamp). Contract↔schema aligned. |
| `createdAt` | string (ISO 8601) / timestamptz | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string (ISO 8601) / timestamptz | system-calculated | AVAILABLE | — | Record update timestamp |

**Validation:**
- `validateAction()` in `action.ts` — structural correctness: required fields (caseId, title), effort ≥ 0, valid status enum.
- `validateSubAction()` in `action.ts` — structural correctness: required fields (actionId, caseId, targetEntity, executionMethod), effort ≥ 0, valid outcomeClassification, valid D3FEND tacticType, countermeasures[] ≤ MAX_COUNTERMEASURES, each countermeasure has techniqueId + techniqueName.

**Exported constants:**
- `OUTCOME_CLASSIFICATIONS` — array of 5 outcome values
- `D3FEND_TACTIC_TYPES` — array of 5 tactic types
- `ACTION_STATUSES` — array of 4 action statuses
- `MAX_COUNTERMEASURES` — 10 (bounded array limit)

**DB Schema Reconciliation:** ✅ Contract and schema aligned. DB schema flattens `tenant` to `tenantId` reference (FK → tenants.id) and `source` to individual columns (`source_connector_id`, `source_import_run_id`, `source_system`, `source_timestamp`) — standard pattern. Enum columns: `action_status` (4 values), `outcome_classification` (5 values), `d3fend_tactic_type` (5 values). `countermeasures` stored as JSONB (bounded array). Additional DB-only column: `data_classification` (default 'case'). `caseId` — application-layer enforced, no FK (cross-workload boundary per performance doctrine §5). `actionId` on sub_actions — FK → actions.id (same workload, within-table FK permitted). Effort columns use `real` type. No divergences.

**Resolvers:** None. No action-specific resolver in `packages/contracts/src/resolvers/`. Action/Sub-Action creation is lifecycle-engine driven (triggered by `action_decomposed` transition). `validateAction()` and `validateSubAction()` are structural validators, not resolvers.

---

**Enums Defined:**

| Enum | Values | Source |
|------|--------|--------|
| `ConnectorClass` | A, B, C, D | Spec #61 |
| `SignalPurpose` | case-creation, case-enrichment, verdict-pattern, drift-evaluation, coverage-assessment, threat-correlation, identity-behaviour, posture-measurement | Spec #61 §Eight Signal Purposes |
| `VerdictDisposition` | BLOCK, QUARANTINE, COACH, REQUIRE_MFA, REQUIRE_COMPLIANT, MONITOR, ALLOW, AUDIT | Spec #62 |
| `SurfaceAttribution` | internal_attack_surface, external_attack_surface | Spec #60 |
| `BuildStatus` | LIVE, BUILD, SCAFFOLD, STUB, PLANNED | Registry-driven visibility |
| `DataClassification` | configuration, state, verdict, detection, case, threat_intelligence, audit | Master Technical Specification §11.1 |
| `DataResidency` | uk, us, eu | Master Technical Specification §11.2 |
| `CaseStatus` | detected, bound, routed, prioritised, action_decomposed, in_progress, pending_validation, validation_running, validated_pass, validated_fail, pending_closure_gates, closed_by_system, reopened_by_system | Spec #08, Spec #30, Unit 7 rebaseline |
| `LegacyCaseStatus` | open, in-progress, awaiting-validation, awaiting-closure, closed, reopened | Seed data backward compatibility |
| `CaseStatusExtended` | CaseStatus \| LegacyCaseStatus | Union type for contract-level acceptance |
| `Priority` | P0, P1, P2, P3, P4 | Spec #08 |
| `EvidenceType` | log, scan, verdict, screenshot, config, network_capture, file_hash, process_dump, ai_analysis | COIM v1.0 §4.4; OCSF evidences.json type taxonomy + Commander ai_analysis extension |
| `EvidenceSource` | connector, analyst, system | COIM v1.0 §4.4 |
| `FreshnessStatus` | fresh, aging, stale, expired | COIM v1.0 §4.4; 04_EVIDENCE_MODEL.md (strategy-driven thresholds) |
| `ObservableType` | ip, domain, hash, url, email, certificate, process, file | COIM v1.0 §4.5; OCSF observable.json type_id taxonomy |
| `AnalyticType` | detection_rule, analytic_rule, sigma_rule, yara_rule, ml_model, ueba_model, vendor_model, security_control_analytic | COIM v1.0 §4.8; OCSF analytic.json type_id (Rule/Behavioral/Statistical/ML) + Commander extensions (sigma_rule, yara_rule, ueba_model, security_control_analytic) |
| `AnalyticState` | active, deprecated, testing | COIM v1.0 §4.8; Commander-owned lifecycle tracking |
| `ActionStatus` | planned, in_progress, completed, cancelled | COIM v1.0 §4.3; Spec #08 Case Management |
| `OutcomeClassification` | successful, partial, failed, cancelled, pending | COIM v1.0 §4.3; 03_REUSABLE_OBJECT_CATALOGUE §2.3 |
| `D3FENDTacticType` | isolate, evict, restore, harden, detect | COIM v1.0 §4.3; MITRE D3FEND framework — five canonical defensive tactics |
| `FrameworkCategory` | regulatory, industry, vendor, maturity_model, internal | Spec #55; CFM |
| `LicenceStatus` | open, restricted, licensed, internal_only | Spec #55; CFM |
| `ControlTier` | mandatory, recommended, optional | Spec #55; CFM |
| `EvaluationOperator` | equals, not_equals, less_than, less_than_or_equal, greater_than, greater_than_or_equal, contains, not_contains, exists, not_exists, within_days | Spec #55; CFM |
| `ComplianceVerdict` | compliant, non_compliant, partial, unknown, not_applicable | Spec #55; CFM |
| `ExceptionState` | none, accepted_risk, compensating_control, waiver, deferred | Spec #55; CFM |
| `MappingSource` | system, manual, ai_suggested | Spec #55; CFM |
| `CoverageContribution` | full, partial, evidence_only | Spec #55; CFM |
| `PlaybookStatus` | draft, active, superseded | Spec #26a; Communications Excellence Phase 1 |
| `PlaybookStepAction` | send_acknowledgement, send_remediation_request, send_escalation, send_closure_notice, post_command_bridge, send_adaptive_card | Spec #26a; Communications Excellence Phase 1 |
| `PlaybookExecutionStatus` | running, completed, aborted | Spec #26a; Communications Excellence Phase 1 |
| `PlaybookStepExecutionStatus` | pending, executed, skipped, failed | Spec #26a; Communications Excellence Phase 1 |
| `DetonationSource` | microsoft_defender, other | Spec #26a; Communications Excellence Phase 1 |
| `DetonationOverallVerdict` | clean, suspicious, malicious | Spec #26a; Communications Excellence Phase 1 |
| `DetonationCheckType` | url_detonation, attachment_sandboxing, header_anomaly, impersonation_scoring, reply_chain_hijacking | Spec #26a; Communications Excellence Phase 1 |
| `DetonationCheckResult` | pass, fail, suspicious | Spec #26a; Communications Excellence Phase 1 |
| `PhishingTriageVerdict` | malicious, suspicious, clean | Spec #26a; Communications Excellence Phase 1 |
| `PhishingNotificationStatus` | pending, sent | Spec #26a; Communications Excellence Phase 1 |
| `PhishingReportStatus` | received, triaging, verdicted, closed | Spec #26a; Communications Excellence Phase 1 |
| `StixObjectType` | indicator, attack-pattern, malware, campaign, threat-actor, tool, vulnerability | Spec #26a; Communications Excellence Phase 1 |
| `StixIngestStatus` | received, parsing, mapped, evaluated, complete | Spec #26a; Communications Excellence Phase 1 |
| `TeamsRequestType` | approval, validation_confirmation, action_override, resource_assignment, escalation | Spec #26, Spec #44; Communications Excellence Phase 1 |
| `TeamsDecision` | approved, denied, delegated, confirmed, disputed, need_more_time | Spec #26, Spec #44; Communications Excellence Phase 1 |

---

## Data Layer As-Built Snapshot

**Purpose:** Complete surfacing of the data layer built to date. Existing work is explicitly accounted for, not silently assumed complete.

### Entities Catalogued: 48 (+15 intelligence entities, +2 value objects, +7 communications entities, +1 overlay entity, +2 Commander AI entities, +1 posture entity, +3 drift-rule-engine entities, +5 governance-security-search entities, +2 mission entities, +5 drift-rule-governance entities)

1. Asset ✅
2. Case ✅
3. Identity ✅
4. Risk Object ✅ (incl. COIM-A source-classification + timeline augmentation)
5. Connector ✅
6. Strategy Policy ⚠️ (contract↔schema divergent — CMEP-1.0 enum gap)
7. Audit Event ✅
8. Case Lifecycle (state machine) ✅
9. Case Strategy Binding ✅
10. Common Fields ✅
11. Evidence ✅ (COIM-B — evidence entity)
12. Verdict ✅ (COIM-C — verdict entity promotion)
13. Observable ✅ (COIM-D — observable entity)
14. Analytic ✅ (COIM-E — analytic entity)
15. Action / Sub-Action ✅ (COIM-H — action + D3FEND)
16. ControlFramework ✅ (CFM — control framework mapping)
17. FrameworkControl ✅ (CFM — individual controls)
18. ControlRequirement ✅ (CFM — testable requirements)
19. ControlEvaluation ✅ (CFM — evaluation results)
20. ControlMapping ✅ (CFM — entity-to-control bindings)
21. Platform_Intelligence_Source ✅ (Intelligence)
22. Platform_Intelligence_Record ✅ (Intelligence)
23. Vulnerability_Intelligence_Record ✅ (Intelligence)
24. Vendor_Advisory ✅ (Intelligence)
25. Indicator_Of_Compromise ✅ (Intelligence — first-class)
26. IOC_Relationship ✅ (Intelligence — stateful)
27. Tenant_Intelligence_Subscription ✅ (Intelligence — evaluation plane)
28. Tenant_Intelligence_Evaluation ✅ (Intelligence — evaluation plane)
29. Tenant_IOC_Match ✅ (Intelligence — evaluation plane)
30. Tenant_IOC_AllowBlock_Entry ✅ (Intelligence — evaluation plane)
31. IOC_Case_Link ✅ (Intelligence — evaluation plane)
32. Vulnerability_Case_Link ✅ (Intelligence — evaluation plane)
33. Threat_Hunt_Record ✅ (Intelligence — evaluation plane)
34. Push_Action_Intent ✅ (Intelligence — evaluation plane)
35. Inbound_Email_Submission ✅ (Intelligence — value object)
36. Case Communication Thread ⚠️ (Communications — contract + fixture, DB schema absent)
37. War Room ⚠️ (Overlay — contract + fixture, DB schema absent)
38. Commander AI Provider ⚠️ (AI — contract + fixture + resolver, DB schema absent)
39. Commander AI Execution Audit ⚠️ (AI — contract interface only, DB schema + fixture absent)
40. Communication Playbook ⚠️ (Communications — contract + fixture, DB schema absent)
41. Playbook Execution ⚠️ (Communications — contract only, DB schema + fixture absent)
42. Detonation Verdict ⚠️ (Communications — contract + fixture, DB schema absent)
43. Phishing Report ⚠️ (Communications — contract + fixture, DB schema absent)
44. STIX Bundle Ingest ⚠️ (Communications — contract + fixture, DB schema absent)
45. Teams Decision Event ⚠️ (Communications — contract + fixture, DB schema absent)
46. Posture Metric Config ⚠️ (Posture — contract only, DB schema + fixture absent)
47. Finding ⚠️ (Drift & Rule Engine — contract + fixture, DB schema absent)
48. Risk Score ⚠️ (Drift & Rule Engine — contract + fixture, DB schema absent)
49. Blast Radius ⚠️ (Drift & Rule Engine — contract + fixture, DB schema absent)
50. Auth Session ⚠️ (Security — contract + fixture, DB schema absent)
51. Break-Glass Request ⚠️ (Security — contract + fixture, DB schema absent)
52. RBAC Policy ⚠️ (Security — contract + fixture, DB schema absent)
53. Search Index Config ⚠️ (Universal Search — contract + fixture, DB schema absent)
54. Entitlement Manifest ⚠️ (Control Plane — contract + fixture, DB schema absent)
55. Mission ⚠️ (Mission Impact — contract + fixture, DB schema absent)
56. Mission Binding ⚠️ (Mission Impact — contract + fixture, DB schema absent)
57. Finding ⚠️ (Drift & Rule Engine — contract + fixture, DB schema absent)
58. Risk Score ⚠️ (Drift & Rule Engine — contract + fixture, DB schema absent)
59. Blast Radius ⚠️ (Drift & Rule Engine — contract + fixture, DB schema absent)
60. Decision Record ⚠️ (Drift & Rule Engine — contract + fixture, DB schema absent)
61. Simulation Result ⚠️ (Drift & Rule Engine — contract + fixture, DB schema absent)
62. Inverse Discovery Event ⚠️ (Inverse Discovery — contract + fixture, DB schema absent)
63. Attack Classification Audit ⚠️ (Pre-Warned Classification — contract + fixture, DB schema absent)
64. Verdict Pattern Case ⚠️ (Identity Intelligence — contract + fixture, DB schema absent)

**Composed-object modules (catalogued under their consuming entity, no own table):**
- `coim.ts` — COIM-A source-classification composed objects (FindingClass, SourceSeverity, SourceConfidence, SourceProduct, AttackMapping, ObservableRef, SourceClassification + `validateSourceClassification`). Catalogued under Risk Object (§4). Also consumed by Verdict entity (§12) for `SourceProduct` type. Satisfies the completeness gate for `packages/contracts/src/entities/coim.ts`.
- `intelligence-common.ts` — Platform Intelligence shared type constants and value objects. Defines 16 array-form type constants (PlatformIntelligenceSourceType, PlatformRecordType, IocCategory [26 values], IocRelationshipState, TlpMarking, CveState, SourceFreshnessState, TenantSubscriptionState, EvaluationType, TenantExposureState, IocMatchType, IocCaseLinkType, ThreatHuntStatus, PushActionType, PushIntentStatus, AllowBlockListType) and 2 shared value objects (SourceAttributionEntry, RelationshipStateTransition). Consumed by: indicator-of-compromise.ts, ioc-case-link.ts, ioc-relationship.ts, platform-intelligence-record.ts, platform-intelligence-source.ts, push-action-intent.ts, tenant-intelligence-evaluation.ts, tenant-intelligence-subscription.ts, tenant-ioc-allowblock-entry.ts, tenant-ioc-match.ts, threat-hunt-record.ts, vulnerability-intelligence-record.ts. Referenced by fixtures: seed-iocs.ts, seed-platform-intelligence-sources.ts. Reuses existing COIM SourceSeverity (1–5) and SourceConfidence from coim.ts. Source: Spec #59 Intelligence Layer Architecture; Spec #61 Universal Security Signal Connector Contract (baseline v2.6.2). Coverage: provisional (source specs partially read per COVERAGE.md). No DB schema counterpart (type constants only — no own table). No fixture of its own (consumed by entity-level fixtures). No resolver. Satisfies the completeness gate for `packages/contracts/src/entities/intelligence-common.ts`.

### Fixtures Found: 40

1. `seed-assets.ts` ✅
2. `seed-cases.ts` ✅
3. `seed-identities.ts` ✅
4. `seed-risk-objects.ts` ✅
5. `seed-connectors.ts` ✅
6. `seed-strategies.ts` ✅
7. `seed-events.ts` ✅
8. `seed-tenant.ts` ✅
9. `seed-case-strategy-bindings.ts` ✅
10. `seed-evidence.ts` ✅
11. `seed-verdicts.ts` ✅
12. `seed-observables.ts` ✅
13. `seed-analytics.ts` ✅
14. `seed-actions.ts` ✅
15. `seed-control-frameworks.ts` ✅ (5 frameworks, 15 controls, 5 requirements, 5 evaluations, 5 mappings)
16. `seed-platform-intelligence-sources.ts` ✅ (8 sources, all source types)
17. `seed-iocs.ts` ✅ (26 IOCs, all categories)
18. `seed-vulnerability-intelligence.ts` ✅ (5 records, KEV/EPSS variants)
19. `seed-vendor-advisories.ts` ✅ (3 advisories, multi-CVE, containing IOCs)
20. `seed-ioc-relationships.ts` ✅ (8 relationships, all states)
21. `seed-tenant-intelligence-subscriptions.ts` ✅ (3 subscriptions, all states)
22. `seed-tenant-intelligence-evaluations.ts` ✅ (5 evaluations, exposure states)
23. `seed-tenant-ioc-matches.ts` ✅ (5 matches, all match types)
24. `seed-tenant-allowblock-entries.ts` ✅ (4 entries, allow + block, with/without expiry)
25. `seed-ioc-case-links.ts` ✅ (3 links, all link types)
26. `seed-vulnerability-case-links.ts` ✅ (2 vulnerability case links)
27. `seed-communication-threads.ts` ✅ (4 threads: 2 email, 2 teams; statuses: responded, awaiting_response, stale, closed)
28. `seed-war-rooms.ts` ✅ (3 war rooms: activated, monitoring, closed)
29. `seed-commander-ai-provider.ts` ✅ (1 platform-level provider: AWS Bedrock, NOT_CONNECTED, Phase 1 stub)
30. `seed-communication-playbooks.ts` ✅ (Communications Excellence Phase 1 — structured playbooks with bounded conditions)
31. `seed-detonation-verdicts.ts` ✅ (Communications Excellence Phase 1 — SOC detonation verdicts consumed read-only)
32. `seed-phishing-reports.ts` ✅ (Communications Excellence Phase 1 — employee phishing reports lifecycle)
33. `seed-stix-bundles.ts` ✅ (Communications Excellence Phase 1 — STIX bundle ingest records)
34. `seed-teams-decision-events.ts` ✅ (Communications Excellence Phase 1 — Teams decision request/response events)
35. `seed-inbound-email-submissions.ts` ✅ (Intelligence — inbound email submission value objects)
36. `seed-push-action-intents.ts` ✅ (Intelligence — push action intents, mock statuses)
37. `seed-findings.ts` ✅ (Drift & Rule Engine — 5 findings spanning lifecycle states)
38. `seed-risk-scores.ts` ✅ (Drift & Rule Engine — 4 risk score computations)
39. `seed-blast-radius.ts` ✅ (Drift & Rule Engine — 3 blast radius computations)
40. `seed-decision-records.ts` ✅ (Drift & Rule Engine — 5 decision records: rule_hit, engine_output, ai_recommendation, suppression, escalation)

### Resolvers Found: 16

1. `assignment-engine.ts` — case assignment logic
2. `case-closure-evaluator.ts` — closure gate evaluation
3. `case-prioritiser.ts` — priority calculation
4. `case-reopening-evaluator.ts` — reopening trigger evaluation
5. `case-router.ts` — owner/team assignment
6. `case-sla-calculator.ts` — SLA target calculation
7. `case-strategy-resolver.ts` — strategy policy binding
8. `case-validation-evaluator.ts` — validation window evaluation
9. `closure-gate-enforcer.ts` — closure gate enforcement
10. `reopening-trigger-enforcer.ts` — reopening trigger enforcement
11. `validation-window-enforcer.ts` — validation window enforcement
12. `executeTransition()` — lifecycle state machine (in case-lifecycle.ts)
13. `case-aggregation-resolver.ts` — COIM-G case aggregate computation (`computeCaseAggregation`); computed/cached, non-governing
14. `connector-pull-orchestrator.ts` — connector pull orchestration, state machine enforcement, conformance tier assessment
15. `strategy-policy-lifecycle.ts` — strategy policy lifecycle management (`simulatePolicy()`)
16. ❌ `commander-ai-provider-resolver.ts` — **MISSING FROM DISK** (referenced in entity #40 documentation but file does not exist in `packages/contracts/src/resolvers/`). PROPOSED: flag as ARCH-DEBT or remove from catalogue.

### Contract vs DB Schema Reconciliation

**Aligned (19):**
- Asset ✅
- Case ✅
- Identity ✅
- Risk Object ✅
- Connector ✅
- Audit Event ✅
- Common Fields ✅
- Case Lifecycle (transitions in audit events) ✅
- Case Strategy Binding ✅
- Evidence ✅
- Verdict ✅
- Observable ✅
- Analytic ✅
- Action / Sub-Action ✅
- ControlFramework ✅ (CFM)
- FrameworkControl ✅ (CFM)
- ControlRequirement ✅ (CFM)
- ControlEvaluation ✅ (CFM)
- ControlMapping ✅ (CFM)

**Divergences (16):**
- Strategy Policy ⚠️ — Contract `StrategySurfaceType` has 17 values (CMEP-1.0 extension); DB `strategySurfaceTypeEnum` has 13. Migration required to add: `sla-modifier`, `correlation-policy`, `effectiveness-targets`, `ssvc-decision-tree`.
- Case Communication Thread ⚠️ — Contract + fixture exist; DB schema ABSENT. ARCH-DEBT-052 proposed.
- War Room ⚠️ — Contract + fixture exist; DB schema ABSENT. ARCH-DEBT-053 proposed.
- Commander AI Provider ⚠️ — Contract + fixture exist; resolver MISSING FROM DISK. DB schema ABSENT. ARCH-DEBT-054 proposed.
- Commander AI Execution Audit ⚠️ — Contract interface defined; DB schema + fixture ABSENT. ARCH-DEBT-055 proposed.
- Communication Playbook ⚠️ — Contract + fixture exist; DB schema ABSENT. ARCH-DEBT-056 proposed.
- Playbook Execution ⚠️ — Contract exists; DB schema + fixture ABSENT. ARCH-DEBT-057 proposed.
- Detonation Verdict ⚠️ — Contract + fixture exist; DB schema ABSENT. ARCH-DEBT-058 proposed.
- Phishing Report ⚠️ — Contract + fixture exist; DB schema ABSENT. ARCH-DEBT-059 proposed.
- STIX Bundle Ingest ⚠️ — Contract + fixture exist; DB schema ABSENT. ARCH-DEBT-060 proposed.
- Teams Decision Event ⚠️ — Contract + fixture exist; DB schema ABSENT. ARCH-DEBT-061 proposed.
- Posture Metric Config ⚠️ — Contract exists; DB schema + fixture ABSENT. ARCH-DEBT-062 proposed.
- Finding ⚠️ — Contract + fixture exist; DB schema ABSENT. ARCH-DEBT-063 proposed.
- Risk Score ⚠️ — Contract + fixture exist; DB schema ABSENT. ARCH-DEBT-064 proposed.
- Blast Radius ⚠️ — Contract + fixture exist; DB schema ABSENT. ARCH-DEBT-065 proposed.
- Decision Record ⚠️ — Contract + fixture (5 records) exist; DB schema ABSENT. ARCH-DEBT-066 proposed.

**Proposed Architectural Debt Entries:**
- ARCH-DEBT-NEW: Strategy Policy DB enum out of sync with contract (17 vs 13 surface types). Blocker: DB migration required before CMEP-1.0 surface policies can be persisted. Additionally, `seed-strategies.ts` lacks fixture entries for the 4 new surface types.
- ARCH-DEBT-054: Commander AI Provider DB schema absent — contract + fixture exist but resolver MISSING FROM DISK and no persistence layer. Blocker: DB migration required before AI provider configuration can be persisted. Resolver needs recreation.
- ARCH-DEBT-055: Commander AI Execution Audit DB schema + fixture absent — contract interface defined but no persistence layer or seed data. Blocker: DB migration + fixture required before AI execution audit records can be persisted.
- ARCH-DEBT-056: Communication Playbook DB schema absent — contract + fixture exist. Blocker: DB migration required before playbooks can be persisted.
- ARCH-DEBT-057: Playbook Execution DB schema + fixture absent — contract defined but no persistence layer or seed data. Blocker: DB migration + fixture required.
- ARCH-DEBT-058: Detonation Verdict DB schema absent — contract + fixture exist. Blocker: DB migration required.
- ARCH-DEBT-059: Phishing Report DB schema absent — contract + fixture exist. Blocker: DB migration required.
- ARCH-DEBT-060: STIX Bundle Ingest DB schema absent — contract + fixture exist. Blocker: DB migration required.
- ARCH-DEBT-061: Teams Decision Event DB schema absent — contract + fixture exist. Blocker: DB migration required.
- ARCH-DEBT-062: Posture Metric Config DB schema + fixture absent — contract exists. Blocker: DB migration + fixture required before posture metric rollups can be persisted or seeded.
- ARCH-DEBT-063: Finding DB schema absent — contract + fixture (5 records) exist. Blocker: DB migration required before drift findings can be persisted. Entity: `finding.ts`, domain D-04.
- ARCH-DEBT-064: Risk Score DB schema absent — contract + fixture (4 records) exist. Blocker: DB migration required before computed risk scores can be persisted. Entity: `risk-scoring-engine.ts`, domain D-04.
- ARCH-DEBT-065: Blast Radius DB schema absent — contract + fixture (3 records) exist. Blocker: DB migration required before blast-radius computations can be persisted. Entity: `blast-radius-engine.ts`, domain D-04.
- ARCH-DEBT-066: Decision Record DB schema absent — contract + fixture (5 records) exist. Blocker: DB migration required before decision records (explainability artefacts) can be persisted. Entity: `decision-record.ts`, domain D-04. Use Cases: UC-175, UC-178.

**Resolved Architectural Debt:**
- ARCH-DEBT-030: Risk Object DB schema missing (contract + fixture exist) — ✅ RESOLVED (Unit 1)
- ARCH-DEBT-031: Strategy Policy DB schema missing (contract + fixture exist) — ✅ RESOLVED (Unit 2)
- ARCH-DEBT-032: Case Strategy Binding incomplete (contract exists, db schema + fixture missing) — ✅ RESOLVED (Unit 3)
- ARCH-DEBT-042: Analytic entity absence — ✅ RESOLVED (COIM-E)
- ARCH-DEBT-051: Control Framework Mapping entity absent — ✅ RESOLVED (CFM)

---

## COIM / OCSF Planned Entities & Fields (FUTURE)

> **Status:** Governance registration only (added 2026-06-01). These entries are **manually maintained planning placeholders**, NOT mechanically-derived catalogue entries — the contracts/schemas do not exist yet. Each becomes a mechanically-derived entity entry (above) when its COIM build unit lands, at which point `data-dictionary-generation.kiro.hook` takes over maintenance and the placeholder is replaced.
>
> **Authority:** `DECISIONS.md` `DEC-coim-ocsf-source-classification-architecture`; accepted COIM artefacts at `docs/knowledge/ocsf_assessment/`.
>
> **Availability:** All items below are **FUTURE**. Blocker = the named COIM build unit. No code or schema exists yet (no application code authorised in this registration).

### Risk Object — COIM augmentation (AVAILABLE — delivered by COIM-A)

> **Delivered 2026-06-01 by build unit COIM-A.** Placeholder retired per maintenance rule (a COIM unit's planning placeholder is replaced by its mechanically-derived entry once the unit lands). The COIM-A source-classification and timeline fields are now catalogued in the mechanically-derived **Risk Object** entry (§4 above) — see `sourceClassification`, extracted columns (`finding_class`/`severity_id`/`confidence_score`/`source_finding_uid`), `affectedEntities[]`, and `firstDetectedAt`/`lastConfirmedAt`/`normalisedAt`, plus the COIM-A composed-objects note. Contract: `risk-object.ts` + `coim.ts`. Schema: `risk-objects.ts` (migration `0005_risk_object_coim_a.sql`). Fixture: all 3 seed risk objects populated. Resolves ARCH-DEBT-039; partially resolves ARCH-DEBT-045 (Risk Object portion).

### Evidence (AVAILABLE — delivered by COIM-B)

> **Delivered 2026-06-01 by build unit COIM-B.** Placeholder retired per maintenance rule (a COIM unit's planning placeholder is replaced by its mechanically-derived entry once the unit lands). Evidence is a first-class typed evidence artifact supporting evidence-driven validation, evidence-gated closure, and evidence-triggered reopening per Commander doctrine assertion #1. Content stored in object store (S3/equivalent); this entity holds metadata only. Immutability enforced at application layer for source-owned fields. Resolves ARCH-DEBT-040.

**Source:** COIM v1.0 §4.4; 04_EVIDENCE_MODEL.md; Spec #08 Case Management (Evidence Packs); Commander doctrine assertion #1  
**Coverage:** Full (04_EVIDENCE_MODEL.md read in entirety)  
**Contract:** `packages/contracts/src/entities/evidence.ts`  
**DB Schema:** `packages/db/src/schema/evidence.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-evidence.ts` ✅ (5 seed artifacts)  
**Status:** AVAILABLE (fixture exists)  
**Doctrine:** Evidence informs but never governs lifecycle, priority, routing, validation or closure. Source-owned fields are immutable after write. Bindings are immutable after write.

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | system-calculated | AVAILABLE | — | Deterministic ID |
| `entityType` | `'evidence'` | system-calculated | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope (tenantId, tenantName) |
| `evidenceType` | EvidenceType (enum) | integration-derived | AVAILABLE | — | 9 types: log, scan, verdict, screenshot, config, network_capture, file_hash, process_dump, ai_analysis |
| `evidenceSource` | EvidenceSource (enum) | integration-derived | AVAILABLE | — | 3 sources: connector, analyst, system. Immutable after write. |
| `collectedAt` | string (ISO 8601) | integration-derived | AVAILABLE | — | When evidence was collected (source timestamp). Immutable after write. |
| `contentRef` | string | integration-derived | AVAILABLE | — | Object-store pointer (S3 URI). Immutable after write. |
| `immutabilityHash` | string (SHA-256) | system-calculated | AVAILABLE | — | SHA-256 hash of evidence content. Integrity verification. Immutable after write. |
| `confidence` | number (0-100) | system-calculated | AVAILABLE | — | Commander-owned. Mutable on validation. |
| `expiresAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Optional. Computed from collectedAt + freshness policy. Commander-owned, mutable. |
| `freshnessStatus` | FreshnessStatus (enum) | system-calculated | AVAILABLE | — | 4 statuses: fresh, aging, stale, expired. Computed at evaluation time. |
| `caseId` | string | system-calculated | AVAILABLE | — | Required binding. Immutable after write. |
| `subActionId` | string | system-calculated | AVAILABLE | — | Optional binding. Immutable after write. |
| `validationDecisionId` | string | system-calculated | AVAILABLE | — | Optional binding. Immutable after write. |
| `riskObjectId` | string | system-calculated | AVAILABLE | — | Optional binding. Immutable after write. |
| `source` | SourceMetadata | seeded | AVAILABLE | — | Provenance (connectorId, importRunId, sourceSystem, sourceTimestamp). Contract↔schema aligned. |
| `createdAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record update timestamp |

**DB Schema Reconciliation:** ✅ Contract and schema aligned. DB schema flattens `tenant` to `tenantId` reference and `source` to individual columns (standard pattern). Indexed bindings: `case_id`, `sub_action_id`, `validation_decision_id`. Enum columns: `evidence_type`, `evidence_source`, `freshness_status`.

**Ownership model:**
- Source-owned (immutable): evidenceType, evidenceSource, collectedAt, contentRef, immutabilityHash
- Commander-owned (mutable): confidence, expiresAt, freshnessStatus
- Immutable bindings: caseId, subActionId, validationDecisionId, riskObjectId

**COIM-B composed-objects note:** Evidence entity is COIM Component 4.4, operating across Layers 4 (operational intelligence metadata), 5 (canonical entity), 6 (case/validation binding), 7 (reporting aggregates), 8 (archive/retention), and 9 (AI grounding). Content stored at Layer 1 (raw source / object store). Validation function `validateEvidence()` provides structural correctness checking without engine-logic dependency.

### Verdict (AVAILABLE — delivered by COIM-C)

> **Delivered 2026-06-01 by build unit COIM-C.** Placeholder retired per maintenance rule. Verdict promoted from engine-internal `VerdictRecord` (normalisation-layer.ts) to first-class canonical entity with durable provenance. Disposition semantics and severity ordering unchanged (Spec #62 authority). Resolves ARCH-DEBT-043.

**Source:** COIM v1.0 §6; Spec #62 Verdict Semantics  
**Coverage:** Full (Spec #62 semantics preserved)  
**Contract:** `packages/contracts/src/entities/verdict.ts`  
**DB Schema:** `packages/db/src/schema/verdicts.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-verdicts.ts` ✅ (5 seed verdicts)  
**Status:** AVAILABLE (fixture exists)  
**Doctrine:** Verdicts are time-bound, confidence-weighted claims. They preserve semantic disposition — NOT binary pass/fail (Doctrinal Assertion 11). Verdicts are immutable source provenance.

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | system-calculated | AVAILABLE | — | Deterministic ID |
| `entityType` | `'verdict'` | system-calculated | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope |
| `disposition` | VerdictDisposition | integration-derived | AVAILABLE | — | 8 semantic dispositions: BLOCK, QUARANTINE, REQUIRE_MFA, REQUIRE_COMPLIANT, COACH, MONITOR, AUDIT, ALLOW. Severity ordering preserved (Spec #62). |
| `sourceProduct` | SourceProduct (JSONB) | integration-derived | AVAILABLE | — | vendor/name/version/uid/connectorClass. Immutable. |
| `confidence` | number (0-100) | integration-derived | AVAILABLE | — | Source confidence in verdict. Immutable. |
| `observedAt` | string (ISO 8601) | integration-derived | AVAILABLE | — | When verdict was observed/issued. Immutable. |
| `targetEntityId` | string | integration-derived | AVAILABLE | — | Target entity (asset, identity, etc.). Immutable. |
| `targetEntityType` | string | integration-derived | AVAILABLE | — | Supports non-identity verdicts per COIM v1.0 §6. |
| `policyRef` | VerdictPolicyRef (JSONB) | integration-derived | AVAILABLE | — | Structured: policyId, policyName, policyVersion, policySource. Immutable. |
| `timeBound` | boolean | integration-derived | AVAILABLE | — | Whether verdict expires. |
| `expiresAt` | string (ISO 8601) / null | integration-derived | AVAILABLE | — | Expiry timestamp (null if not time-bound). Expired verdicts fall back to ALLOW (Spec #62). |
| `source` | SourceMetadata | seeded | AVAILABLE | — | Provenance. Contract↔schema aligned. |
| `createdAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record update timestamp |

**DB Schema Reconciliation:** ✅ Contract and schema aligned. DB schema flattens `tenant` to `tenantId` reference and `source` to individual columns. `sourceProduct` and `policyRef` stored as JSONB. Enum column: `verdict_disposition`.

**Ownership model:** All fields are source-owned (immutable). Commander processes verdicts (expiry, conflict resolution) but does not mutate them.

**Relationship to engine VerdictRecord:** The canonical `Verdict` entity supersedes the engine-internal `VerdictRecord` type for persistence. The engine functions (`processVerdict`, `resolveVerdictConflict`) continue to operate on the same semantic model — no logic change.

### Observable (AVAILABLE — delivered by COIM-D)

> **Delivered 2026-06-02 by build unit COIM-D.** Placeholder retired per maintenance rule (a COIM unit's planning placeholder is replaced by its mechanically-derived entry once the unit lands). Observable is now catalogued as mechanically-derived **Observable** entry (§13 above) — see observableType, value, firstSeen, lastSeen, reputation, deduplication index, many-to-many binding table, and `validateObservable()`. Contract: `observable.ts`. Schema: `observables.ts`. Fixture: `seed-observables.ts`. Resolves ARCH-DEBT-041.

### Analytic (AVAILABLE — delivered by COIM-E)

> **Delivered 2026-06-02 by build unit COIM-E.** Placeholder retired per maintenance rule (a COIM unit's planning placeholder is replaced by its mechanically-derived entry once the unit lands). The Analytic entity is now catalogued in the mechanically-derived **Analytic** entry (§14 above). Contract: `analytic.ts`. Schema: `analytics.ts` (migration `0007_analytic_entity_coim_e.sql`). Fixture: 8 seed analytics (all types covered). Test: `tests/coim-e-analytic-entity/coim-e-analytic.test.ts`. Resolves ARCH-DEBT-042.

### Asset / Identity — COIM augmentation (AVAILABLE — delivered by COIM-F)

**Asset — COIM-F additive fields (all optional, backward-compatible):**

| Field | Type | Source Classification | Availability | Notes |
|-------|------|----------------------|--------------|-------|
| `lifecycleState` | enum | system-tracked | AVAILABLE | active / decommissioned / maintenance / unknown. Commander-tracked. |
| `platform` | JSONB (AssetPlatform) | integration-derived | AVAILABLE | Structured: os, version, cloudProvider, architecture. OCSF: device.json. |
| `networkPosition` | enum | integration-derived | AVAILABLE | internet-facing / dmz / internal / isolated / unknown. |
| `assetDataClassification` | enum | integration-derived | AVAILABLE | public / internal / confidential / restricted. Distinct from DB infra column. |
| `lastConfirmedAt` | timestamptz | integration-derived | AVAILABLE | Timeline: when asset last confirmed active by a source. |
| `firstDiscoveredBy` | text | system-tracked | AVAILABLE | Which connector first discovered this asset. |
| `sourceClassification` | JSONB (SourceClassification) | integration-derived | AVAILABLE | Optional; recommended for discovery signals. Immutable. |

**Identity — COIM-F additive fields (all optional, backward-compatible):**

| Field | Type | Source Classification | Availability | Notes |
|-------|------|----------------------|--------------|-------|
| `privilegeLevel` | enum | integration-derived | AVAILABLE | standard / elevated / privileged / super-privileged. |
| `authenticationStrength` | enum | integration-derived | AVAILABLE | password-only / mfa-enabled / phishing-resistant-mfa / certificate-based / unknown. |
| `lastAuthenticatedAt` | timestamptz | integration-derived | AVAILABLE | Timeline: last authentication timestamp from IAM source. |
| `entitlementSummary` | JSONB (IdentityEntitlementSummary) | system-calculated | AVAILABLE | totalEntitlements, privilegedEntitlements, staleEntitlements, hasAdminAccess. |
| `riskFactors` | JSONB array (IdentityRiskFactor[]) | system-calculated | AVAILABLE | Explains riskScore: type, contribution (0-100), description. |
| `sourceClassification` | JSONB (SourceClassification) | integration-derived | AVAILABLE | Optional; recommended for IAM signals. Immutable. |

**Migration:** `packages/db/drizzle/0008_asset_identity_coim_f.sql` (additive — nullable columns only)
**Test:** `tests/coim-f-asset-identity-augmentation/coim-f-asset-identity.test.ts` (29 assertions)

**DB Schema Reconciliation:** ✅ Additive augmentation. All new columns nullable. Existing tests intact. ARCH-DEBT-045 (Asset/Identity portion) RESOLVED.

### Case — COIM aggregation (COIM-G — AVAILABLE)

**Source:** COIM v1.0 §6 (Case impact); 02_SOURCE_CLASSIFICATION_MODEL §10.4; Spec #08 Case Management
**Contract:** `packages/contracts/src/entities/case.ts` (additive optional fields)
**DB Schema:** `packages/db/src/schema/cases.ts` ✅
**Migration:** `packages/db/drizzle/0009_case_coim_g.sql` ✅ (additive — nullable columns only)
**Resolver:** `packages/contracts/src/resolvers/case-aggregation-resolver.ts` (`computeCaseAggregation`) ✅
**Fixture:** `seed-cases.ts` — case-0001 carries cached aggregates self-consistent with the resolver ✅
**Test:** `tests/coim-g-case-aggregation/coim-g-case-aggregation.test.ts` ✅ (29 assertions)
**Build unit:** COIM-G (Case Aggregation). Resolves ARCH-DEBT-045 (Case dwell time portion).
**Doctrine:** These are Commander-computed, cached aggregate values derived from bound Risk Objects. They INFORM reporting, search and AI grounding but never GOVERN case lifecycle, priority, routing, validation or closure (Doctrinal Assertion 1 preserved — governance logic untouched). All fields additive and optional for back-compatibility.

| Field | Type | Source Classification | Availability | Blocker | Notes |
|-------|------|----------------------|--------------|---------|-------|
| `attacks[]` (aggregated) | JSONB (AttackMapping[], ≤50) | system-calculated | AVAILABLE | — | Deduplicated union of ATT&CK bindings across bound Risk Objects |
| `affectedEntityCount` | int | system-calculated | AVAILABLE | — | Distinct affected entities across bound Risk Objects (plural `affectedEntities[]` with singular fallback) |
| `blastRadiusScore` | int (0-100) | system-calculated | AVAILABLE | — | 10 points per affected entity, saturating at 100 |
| `dwellTimeHours` | number | system-calculated | AVAILABLE | — | Earliest `firstDetectedAt` → case `createdAt`; clamps negatives to 0; undefined when no source detection time (ARCH-DEBT-045) |
| `confidenceAggregate` | int (0-100) | system-calculated | AVAILABLE | — | Rounded average of source confidence across bound Risk Objects; undefined when none carry a score |
| `findingClassBreakdown` | JSONB (Record<string,number>) | system-calculated | AVAILABLE | — | Count of bound Risk Objects per FindingClass |

### Action / Sub-Action (COIM-H — AVAILABLE — promoted to §15)

> **Delivered 2026-06-02 by build unit COIM-H.** Placeholder retired per maintenance rule (a COIM unit's planning placeholder is replaced by its mechanically-derived entry once the unit lands). Action/Sub-Action with D3FEND classification is now catalogued in the mechanically-derived **Action / Sub-Action** entry (§15 above). Contract: `action.ts` (Action + SubAction interfaces, D3FENDTacticType, D3FENDCountermeasure, validation). Schema: `actions.ts` (actions + sub_actions tables, D3FEND enums, countermeasures JSONB). Migration: `0010_action_sub_action_coim_h.sql`. Fixture: `seed-actions.ts` (3 actions, 5 sub-actions, all 5 D3FEND tactics). Resolves ARCH-DEBT-044 (entity absence), ARCH-DEBT-046 (D3FEND gap).

---

### Control Framework Mapping (CFM — 5 entities — AVAILABLE)

**Source:** Spec #55 Baseline Configuration Framework; Spec #10 §8; Feature Registry FR-FRAME-001; Kiro Spec 11  
**Coverage:** provisional (Spec #55 partially read — base binding doctrine, baseline layers, baseline templates, risk + control framework baselines)  
**Contract:** `packages/contracts/src/entities/control-framework.ts`  
**Schema:** `packages/db/src/schema/control-frameworks.ts`  
**Migration:** `packages/db/drizzle/0011_control_framework_mapping_cfm.sql`  
**Fixture:** `packages/contracts/src/fixtures/seed-control-frameworks.ts` ✅ (5 frameworks, 15 controls, 5 requirements, 5 evaluations, 5 mappings)  
**Build unit:** CFM (Control Framework Mapping — Foundational)  
**Resolves:** ARCH-DEBT-051 (Control Framework Mapping entity absent)  
**Status:** AVAILABLE (fixture exists)  
**Doctrine:** Commander identity is primary — controls are mapped TO framework controls, not derived FROM them. Ingestion is the first classification layer, NOT the compliance decision layer. Evaluation compares entity state against defined requirements to produce a verdict. Restricted frameworks store control IDs and short internal summaries only — no reproduced standard text.

Five entities forming the compliance/control-framework mapping layer:

**1. ControlFramework** — the compliance standard itself (ISO 27001, NIST CSF, CIS, etc.)

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `frameworkId` | string | AVAILABLE | Short code (iso-27001, nist-csf-2.0, cis-v8, etc.) |
| `frameworkName` | string | AVAILABLE | Display name |
| `version` | string | AVAILABLE | Framework version |
| `category` | FrameworkCategory | AVAILABLE | regulatory/industry/vendor/maturity_model/internal |
| `publisher` | string | AVAILABLE | Framework owner |
| `totalControls` | number | AVAILABLE | Total controls in framework |
| `origin` | 'prebuilt'\|'custom' | AVAILABLE | Commander-shipped or tenant-provided |
| `active` | boolean | AVAILABLE | Enabled for tenant |
| `licenceStatus` | LicenceStatus | AVAILABLE | open/restricted/licensed/internal_only |
| `sourceRef` | string | AVAILABLE | Source URL or document ref |
| `mappingCompleteness` | number (0-100) | AVAILABLE | % of controls with mappings |
| `lastReviewedAt` | string | AVAILABLE | Last review date |
| `licenceNotes` | string? | AVAILABLE | Licence constraint description |

**2. FrameworkControl** — individual control within a framework

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `frameworkId` | string | AVAILABLE | Parent framework |
| `controlId` | string | AVAILABLE | Control ID (A.8.1, PR.AC-1, 1.1, etc.) |
| `controlName` | string | AVAILABLE | Display name |
| `domain` | string | AVAILABLE | Domain/category |
| `subDomain` | string? | AVAILABLE | Sub-domain if applicable |
| `objective` | string | AVAILABLE | Objective / internal summary |
| `tier` | ControlTier | AVAILABLE | mandatory/recommended/optional |
| `parentControlId` | string? | AVAILABLE | Hierarchical parent |

**3. ControlRequirement** — testable requirement bound to a control

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `frameworkId` | string | AVAILABLE | Parent framework |
| `controlId` | string | AVAILABLE | Parent control |
| `requirementId` | string | AVAILABLE | Requirement identifier |
| `description` | string | AVAILABLE | What is being tested |
| `targetType` | RequirementTargetType | AVAILABLE | asset/identity/case/risk_object/etc. |
| `evaluationRule` | EvaluationRule (JSONB) | AVAILABLE | Structured rule definition |
| `active` | boolean | AVAILABLE | Whether active for evaluation |

**4. ControlEvaluation** — result of evaluating entity state against a requirement

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `frameworkId` | string | AVAILABLE | Framework evaluated |
| `controlId` | string | AVAILABLE | Control evaluated |
| `requirementId` | string | AVAILABLE | Requirement evaluated |
| `evaluatedEntityType` | RequirementTargetType | AVAILABLE | Entity type evaluated |
| `evaluatedEntityId` | string | AVAILABLE | Entity ID evaluated |
| `verdict` | ComplianceVerdict | AVAILABLE | compliant/non_compliant/partial/unknown/not_applicable |
| `evidenceRef` | string? | AVAILABLE | Evidence entity reference |
| `riskObjectRef` | string? | AVAILABLE | Linked Risk Object if non-compliant |
| `exceptionState` | ExceptionState | AVAILABLE | none/accepted_risk/compensating_control/waiver/deferred |
| `evaluatedAt` | string | AVAILABLE | Evaluation timestamp |
| `nextEvaluationDue` | string? | AVAILABLE | Next scheduled evaluation |
| `confidence` | number (0-100) | AVAILABLE | Evaluation confidence |

**5. ControlMapping** — relationship binding Commander entities to framework controls

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `frameworkId` | string | AVAILABLE | Target framework |
| `controlId` | string | AVAILABLE | Target control |
| `mappedEntityType` | MappedEntityType | AVAILABLE | 10 types: risk_object/case/action/sub_action/analytic/evidence/strategy_policy/asset/identity/connector |
| `mappedEntityId` | string | AVAILABLE | Mapped entity ID |
| `confidence` | number (0-100) | AVAILABLE | Mapping confidence |
| `mappingSource` | MappingSource | AVAILABLE | system/manual/ai_suggested |
| `rationale` | string | AVAILABLE | Why this mapping exists |
| `coverageContribution` | CoverageContribution | AVAILABLE | full/partial/evidence_only |

---

## Platform Intelligence and IOC Distribution Entities (Spec: platform-intelligence-ioc-distribution)

> **Registered 2026-06-03 by Platform Intelligence Closure Conveyor.** 16 entities from the platform-intelligence-ioc-distribution spec. Phase 1 data-layer only — no UI, no live API, seed/mock data only.

### 21. Platform_Intelligence_Source

**Source:** Platform Intelligence and IOC Distribution spec; Requirements 1.1, 1.3, 1.4, 2.1  
**Contract:** `packages/contracts/src/entities/platform-intelligence-source.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-platform-intelligence-sources.ts` ✅  
**Ownership:** Admin_Tenant (platform catalogue plane)  
**Workload class:** ingestion-write (sync), operational-read (resolution)  
**Status:** AVAILABLE  
**Relationships:** Parent of Platform_Intelligence_Record; referenced by Tenant_Intelligence_Subscription (cross-plane, no FK)

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `name` | string | AVAILABLE | Source name (required) |
| `vendor` | string | AVAILABLE | Feed vendor/origin |
| `sourceType` | PlatformIntelligenceSourceType | AVAILABLE | 8 types (cisa_kev, nvd_cve, etc.) |
| `connectorClass` | `'D'` | AVAILABLE | Fixed to class D — Threat Intelligence |
| `feedReference` | string | AVAILABLE | Feed URL/reference (no live fetch) |
| `refreshCadenceMinutes` | number | AVAILABLE | Schedule cadence |
| `lastSuccessfulSync` | string \| null | AVAILABLE | Updated by applySyncResult |
| `nextScheduledSync` | string \| null | AVAILABLE | Computed from cadence |
| `failureState` | object \| null | AVAILABLE | Failure tracking |
| `sourceFreshness` | SourceFreshnessState | AVAILABLE | fresh/aging/stale/expired |
| `catalogueVersionHash` | string | AVAILABLE | Catalogue version marker |
| `licenceStatus` | string | AVAILABLE | Licence/use status |
| `healthState` | string | AVAILABLE | Derived health |
| `sourceMetadataExtra` | record | AVAILABLE | Additional metadata |

---

### 22. Platform_Intelligence_Record

**Source:** Platform Intelligence and IOC Distribution spec; Requirements 3.1, 3.3, 3.4  
**Contract:** `packages/contracts/src/entities/platform-intelligence-record.ts`  
**Fixture:** (Specialised into Vulnerability_Intelligence_Record and IOC fixtures)  
**Ownership:** Admin_Tenant (platform catalogue plane)  
**Workload class:** ingestion-write, operational-read  
**Status:** AVAILABLE  
**Relationships:** Child of Platform_Intelligence_Source; parent of Vulnerability_Intelligence_Record; referenced by Tenant_Intelligence_Evaluation (cross-plane, no FK)

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `sourceId` | string | AVAILABLE | Ref → Platform_Intelligence_Source |
| `recordType` | PlatformRecordType | AVAILABLE | 5 types (cve, kev_entry, etc.) |
| `severity` | number (1–5) | AVAILABLE | SourceSeverity model |
| `confidence` | number (0–100) | AVAILABLE | Source-reported confidence |
| `publishedAt` | string | AVAILABLE | Publication timestamp |
| `lastModifiedAt` | string | AVAILABLE | Last modification |
| `catalogueVersion` | string | AVAILABLE | Catalogue version |
| `rawReference` | string | AVAILABLE | Raw store pointer |

---

### 23. Vulnerability_Intelligence_Record

**Source:** Platform Intelligence and IOC Distribution spec; Requirements 4.1, 4.2, 4.3  
**Contract:** `packages/contracts/src/entities/vulnerability-intelligence-record.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-vulnerability-intelligence.ts` ✅  
**Ownership:** Admin_Tenant (platform catalogue plane)  
**Workload class:** ingestion-write, operational-read  
**Status:** AVAILABLE  
**Relationships:** Extends Platform_Intelligence_Record; one-to-many from Vendor_Advisory; zero-to-many to IOC via IOC_Relationship

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `cveId` | string | AVAILABLE | CVE identifier |
| `cvssVector` | string | AVAILABLE | CVSS vector string |
| `cvssScore` | number | AVAILABLE | CVSS numeric score |
| `cveState` | CveState | AVAILABLE | published/rejected/reserved/disputed |
| `cisaKevStatus` | boolean | AVAILABLE | KEV enrichment — never creates risk alone |
| `kevDateAdded` | string \| null | AVAILABLE | KEV addition date |
| `kevDueDate` | string \| null | AVAILABLE | KEV due date |
| `epssScore` | number \| null | AVAILABLE | EPSS probability |
| `epssPercentile` | number \| null | AVAILABLE | EPSS percentile |
| `affectedProducts` | string[] | AVAILABLE | Affected product IDs |
| `references` | string[] | AVAILABLE | External references |

---

### 24. Vendor_Advisory

**Source:** Platform Intelligence and IOC Distribution spec; Requirements 5.1, 5.2, 5.3, 5.4  
**Contract:** `packages/contracts/src/entities/vendor-advisory.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-vendor-advisories.ts` ✅  
**Ownership:** Admin_Tenant (platform catalogue plane)  
**Workload class:** ingestion-write, operational-read  
**Status:** AVAILABLE  
**Relationships:** One-to-many to CVEs; contains IOCs (extracted as first-class)

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `advisoryId` | string | AVAILABLE | Vendor-assigned ID (required) |
| `vendor` | string | AVAILABLE | Vendor name (required) |
| `title` | string | AVAILABLE | Advisory title |
| `publishedAt` | string | AVAILABLE | Publication timestamp |
| `lastModifiedAt` | string | AVAILABLE | Last modification |
| `severity` | number (1–5) | AVAILABLE | SourceSeverity model |
| `affectedProducts` | string[] | AVAILABLE | Affected products |
| `remediationGuidance` | string | AVAILABLE | Remediation text |
| `relatedCveIds` | string[] | AVAILABLE | Related CVE IDs (array) |
| `containedIocIds` | string[] | AVAILABLE | Extracted IOC IDs |

---

### 25. Indicator_Of_Compromise

**Source:** Platform Intelligence and IOC Distribution spec; Requirements 6.1–6.5, 22.1–22.5  
**Contract:** `packages/contracts/src/entities/indicator-of-compromise.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-iocs.ts` ✅  
**Ownership:** Admin_Tenant (platform catalogue plane)  
**Workload class:** ingestion-write, operational-read  
**Status:** AVAILABLE  
**Relationships:** First-class; IOC_Relationship links to CVE/advisory/campaign/etc.; referenced by Tenant_IOC_Match (cross-plane, no FK)

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `iocCategory` | IocCategory (26 values) | AVAILABLE | Exhaustive taxonomy |
| `value` | string | AVAILABLE | Raw indicator |
| `normalisedValue` | string | AVAILABLE | Normalised form |
| `originalRawValue` | string | AVAILABLE | Preserved original (immutable) |
| `confidence` | number (0–100) | AVAILABLE | Aggregate confidence |
| `severity` | number (1–5) | AVAILABLE | SourceSeverity model |
| `tlpMarking` | TlpMarking | AVAILABLE | white/green/amber/amber_strict/red |
| `expiresAt` | string \| null | AVAILABLE | Optional time-bound expiry |
| `sourceAttribution` | SourceAttributionEntry[] | AVAILABLE | Per-source attributions |
| `firstSeenAt` | string | AVAILABLE | Min across attributions |
| `lastSeenAt` | string | AVAILABLE | Max across attributions |
| `active` | boolean | AVAILABLE | Active status |

---

### 26. IOC_Relationship

**Source:** Platform Intelligence and IOC Distribution spec; Requirements 7.1–7.5  
**Contract:** `packages/contracts/src/entities/ioc-relationship.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-ioc-relationships.ts` ✅  
**Ownership:** Admin_Tenant (platform catalogue plane)  
**Workload class:** ingestion-write, operational-read  
**Status:** AVAILABLE  
**Relationships:** Links IOC to any entity (CVE, advisory, campaign, malware, actor, case, risk object, action); CVE binding optional

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `iocId` | string | AVAILABLE | Ref → IOC |
| `relatedEntityId` | string | AVAILABLE | Related entity |
| `relatedEntityType` | string | AVAILABLE | Entity type classifier |
| `relationshipState` | IocRelationshipState (11 values) | AVAILABLE | Stateful classification |
| `confidence` | number (0–100) | AVAILABLE | Confidence in relationship |
| `establishedAt` | string | AVAILABLE | When established |
| `lastUpdatedAt` | string | AVAILABLE | Last update |
| `evidenceRef` | string | AVAILABLE | Evidence reference |
| `stateHistory` | RelationshipStateTransition[] | AVAILABLE | Audit trail of state changes |

---

### 27. Tenant_Intelligence_Subscription

**Source:** Platform Intelligence and IOC Distribution spec; Requirements 10.1, 10.3, 10.4  
**Contract:** `packages/contracts/src/entities/tenant-intelligence-subscription.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-tenant-intelligence-subscriptions.ts` ✅  
**Ownership:** Customer_Tenant (evaluation plane)  
**Workload class:** operational-write, operational-read  
**Status:** AVAILABLE  
**Relationships:** References Platform_Intelligence_Source (cross-plane, no FK)

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `tenantId` | string | AVAILABLE | Customer tenant |
| `sourceId` | string | AVAILABLE | Ref → Platform_Intelligence_Source |
| `subscriptionState` | TenantSubscriptionState | AVAILABLE | active/paused/cancelled |
| `applicabilityFilters` | Record[] | AVAILABLE | Filter criteria array |
| `evaluationPreferences` | Record | AVAILABLE | Evaluation preferences |
| `subscribedAt` | string | AVAILABLE | Subscription timestamp |

---

### 28. Tenant_Intelligence_Evaluation

**Source:** Platform Intelligence and IOC Distribution spec; Requirements 11.1–11.5  
**Contract:** `packages/contracts/src/entities/tenant-intelligence-evaluation.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-tenant-intelligence-evaluations.ts` ✅  
**Ownership:** Customer_Tenant (evaluation plane)  
**Workload class:** operational-write, operational-read  
**Status:** AVAILABLE  
**Relationships:** References Platform_Intelligence_Record or IOC (cross-plane, no FK); links to Vulnerability_Case_Link

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `tenantId` | string | AVAILABLE | Customer tenant |
| `platformRecordId` | string | AVAILABLE | Ref → platform record or IOC |
| `evaluationType` | EvaluationType | AVAILABLE | 3 types |
| `evaluationState` | TenantExposureState (8 values) | AVAILABLE | Evaluation outcome |
| `matchedAssets` | string[] | AVAILABLE | Matched asset refs |
| `matchedIdentities` | string[] | AVAILABLE | Matched identity refs |
| `matchedObservables` | string[] | AVAILABLE | Matched COIM-D observable refs |
| `evidenceReferences` | string[] | AVAILABLE | Evidence/provenance |
| `evaluatedAt` | string | AVAILABLE | Evaluation timestamp |

---

### 29. Tenant_IOC_Match

**Source:** Platform Intelligence and IOC Distribution spec; Requirements 12.1–12.3  
**Contract:** `packages/contracts/src/entities/tenant-ioc-match.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-tenant-ioc-matches.ts` ✅  
**Ownership:** Customer_Tenant (evaluation plane)  
**Workload class:** operational-write, operational-read  
**Status:** AVAILABLE  
**Relationships:** References IOC (cross-plane, no FK); references Observable (COIM-D); links to IOC_Case_Link

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `tenantId` | string | AVAILABLE | Customer tenant |
| `iocId` | string | AVAILABLE | Ref → IOC |
| `matchedObservableId` | string | AVAILABLE | Ref → Observable COIM-D |
| `matchType` | IocMatchType | AVAILABLE | exact/partial/heuristic |
| `matchConfidence` | number (0–100) | AVAILABLE | Match confidence |
| `matchedAt` | string | AVAILABLE | Match timestamp |
| `matchSource` | string | AVAILABLE | Match source identifier |
| `evidenceReferences` | string[] | AVAILABLE | Evidence refs |

---

### 30. Tenant_IOC_AllowBlock_Entry

**Source:** Platform Intelligence and IOC Distribution spec; Requirements 23.1–23.5  
**Contract:** `packages/contracts/src/entities/tenant-ioc-allowblock-entry.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-tenant-allowblock-entries.ts` ✅  
**Ownership:** Customer_Tenant (evaluation plane)  
**Workload class:** operational-write, operational-read  
**Status:** AVAILABLE  
**Relationships:** Consumed by evaluateAllowBlock engine

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `tenantId` | string | AVAILABLE | Customer tenant |
| `iocCategory` | IocCategory | AVAILABLE | IOC category taxonomy |
| `value` | string | AVAILABLE | Indicator value |
| `listType` | AllowBlockListType | AVAILABLE | allow/block |
| `addedBy` | string | AVAILABLE | Who added |
| `addedAt` | string | AVAILABLE | When added |
| `reason` | string | AVAILABLE | Reason |
| `expiresAt` | string \| null | AVAILABLE | Optional expiry |

---

### 31. IOC_Case_Link

**Source:** Platform Intelligence and IOC Distribution spec; Requirements 13.5  
**Contract:** `packages/contracts/src/entities/ioc-case-link.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-ioc-case-links.ts` ✅  
**Ownership:** Customer_Tenant (evaluation plane)  
**Workload class:** operational-write, operational-read  
**Status:** AVAILABLE  
**Relationships:** Links Tenant_IOC_Match to Case (application-layer, no FK)

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `tenantId` | string | AVAILABLE | Customer tenant |
| `iocMatchId` | string | AVAILABLE | Ref → Tenant_IOC_Match |
| `caseId` | string | AVAILABLE | Ref → Case (no cross-workload FK) |
| `linkType` | IocCaseLinkType | AVAILABLE | created_by/enriched_by/triggered_by |
| `linkedAt` | string | AVAILABLE | Link timestamp |
| `status` | string | AVAILABLE | Link status |

---

### 32. Vulnerability_Case_Link

**Source:** Platform Intelligence and IOC Distribution spec; Requirements 13.4  
**Contract:** `packages/contracts/src/entities/vulnerability-case-link.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-vulnerability-case-links.ts` ✅  
**Ownership:** Customer_Tenant (evaluation plane)  
**Workload class:** operational-write, operational-read  
**Status:** AVAILABLE  
**Relationships:** Links Tenant_Intelligence_Evaluation to Case (application-layer, no FK)

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `tenantId` | string | AVAILABLE | Customer tenant |
| `evaluationId` | string | AVAILABLE | Ref → Tenant_Intelligence_Evaluation |
| `caseId` | string | AVAILABLE | Ref → Case (no cross-workload FK) |
| `linkType` | string | AVAILABLE | Link type (vulnerability) |
| `linkedAt` | string | AVAILABLE | Link timestamp |
| `status` | string | AVAILABLE | Link status |

---

### 33. Threat_Hunt_Record

**Source:** Platform Intelligence and IOC Distribution spec; Requirements 14.1, 14.2  
**Contract:** `packages/contracts/src/entities/threat-hunt-record.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-threat-hunts.ts` ✅  
**Ownership:** Customer_Tenant (evaluation plane)  
**Workload class:** operational-write, operational-read  
**Status:** AVAILABLE  
**Relationships:** Triggered by IOC match; links to Case via case-outcome-mappers

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `tenantId` | string | AVAILABLE | Customer tenant |
| `triggeringIocId` | string | AVAILABLE | Triggering IOC |
| `triggeringMatchId` | string | AVAILABLE | Triggering match |
| `huntType` | string | AVAILABLE | Hunt classification |
| `huntScope` | string | AVAILABLE | Hunt scope |
| `status` | ThreatHuntStatus (7 values) | AVAILABLE | Lifecycle status |
| `assignedTo` | string | AVAILABLE | Assigned analyst |
| `proposedAt` | string | AVAILABLE | Proposal timestamp |
| `startedAt` | string \| null | AVAILABLE | Start timestamp |
| `completedAt` | string \| null | AVAILABLE | Completion timestamp |
| `findingsRef` | string | AVAILABLE | Findings reference |

---

### 34. Push_Action_Intent

**Source:** Platform Intelligence and IOC Distribution spec; Requirements 15.1, 15.2, 15.4  
**Contract:** `packages/contracts/src/entities/push-action-intent.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-push-action-intents.ts` ✅  
**Ownership:** Customer_Tenant (evaluation plane)  
**Workload class:** operational-write, operational-read  
**Status:** AVAILABLE  
**Relationships:** References IOC; intent/status only in Phase 1 (no live push)

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `tenantId` | string | AVAILABLE | Customer tenant |
| `iocId` | string | AVAILABLE | Ref → IOC |
| `iocCategory` | IocCategory | AVAILABLE | For push mapping |
| `targetSystemType` | string | AVAILABLE | Target system |
| `actionType` | PushActionType | AVAILABLE | block/allow/alert/quarantine |
| `intentStatus` | PushIntentStatus (7 values) | AVAILABLE | Mock statuses only |
| `requestedBy` | string | AVAILABLE | Requester |
| `requestedAt` | string | AVAILABLE | Request timestamp |
| `approvedBy` | string \| null | AVAILABLE | Approver |
| `approvedAt` | string \| null | AVAILABLE | Approval timestamp |
| `executionReference` | string | AVAILABLE | Mock execution ref |

---

### 35. Inbound_Email_Submission (Value Object)

**Source:** Platform Intelligence and IOC Distribution spec; Requirements 9.3, 24.1, 24.3  
**Contract:** `packages/contracts/src/entities/inbound-email-submission.ts`  
**Fixture:** `packages/contracts/src/fixtures/seed-inbound-email-submissions.ts` ✅  
**Ownership:** Admin_Tenant (ingestion path — modelled only, no mailbox client)  
**Workload class:** ingestion-write  
**Status:** AVAILABLE  
**Relationships:** Feeds into normalisation/dedup pipeline

| Field | Type | Availability | Notes |
|-------|------|--------------|-------|
| `senderAddress` | string | AVAILABLE | Sender email |
| `sourceOrganisation` | string | AVAILABLE | Source org |
| `receivedTimestamp` | string | AVAILABLE | Received time |
| `attachmentReferences` | string[] | AVAILABLE | Attachment refs |
| `parsedIocValues` | ParsedEmailIoc[] | AVAILABLE | Parsed IOCs with parser confidence |
| `rawBodyReference` | string | AVAILABLE | Raw body pointer |
| `submissionMetadata` | Record | AVAILABLE | Additional metadata |

---

### Shared Value Objects (intelligence-common.ts)

**36. SourceAttributionEntry** — Per-source attribution entry preserving what each reporting source claimed (Req 6.5, 8.4, 22.5). Fields: sourceId, reportedConfidence, reportedSeverity, originalRawValue, firstSeenAt, lastSeenAt.

**37. RelationshipStateTransition** — State change audit record appended to IOC_Relationship stateHistory (Req 7.3). Fields: previousState, newState, changedAt, reason.

---

### 38. Case Communication Thread

**Source:** Spec #26 Case Communication and Broadcast Channel, Spec #26a Closed-Loop Email Case Communication Lifecycle v1.2, Spec #08 §14A  
**Coverage:** Partial (Spec #26 initial portion, Spec #26a initial portion read) — **provisional (source partially read)**  
**Contract:** `packages/contracts/src/entities/case-communication-thread.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-communication-threads.ts` ✅ (4 threads: 2 email, 2 teams; statuses: responded, awaiting_response, stale, closed)  
**Resolver:** ❌ NOT FOUND  
**Status:** AVAILABLE (fixture exists)  
**Doctrine:** Teams decisions flow through Commander (never direct state mutation). SOC read-only boundary preserved. War Room is Phase 3 UI scope. All actions modelled as intent/status — no live email/Teams sends (Phase 1).

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string (CommonFields) | seeded | AVAILABLE | — | Deterministic ID from fixture |
| `tenant` | TenantContext (CommonFields) | seeded | AVAILABLE | — | Tenant scope (tenantId, tenantName) |
| `createdAt` | string ISO 8601 (CommonFields) | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string ISO 8601 (CommonFields) | system-calculated | AVAILABLE | — | Record update timestamp |
| `source` | SourceMetadata (CommonFields) | seeded | AVAILABLE | — | Provenance (connectorId, importRunId, sourceSystem, sourceTimestamp) |
| `threadId` | string | seeded | AVAILABLE | — | Thread identifier |
| `caseId` | string | seeded | AVAILABLE | — | Bound case ID |
| `tenantId` | string | seeded | AVAILABLE | — | Tenant ID (denormalised for query convenience) |
| `channel` | CommunicationChannel | seeded | AVAILABLE | — | `email` \| `teams` \| `war_room`. War Room is Phase 3 UI scope. |
| `participants` | ThreadParticipant[] | seeded | AVAILABLE | — | Array of {participantId, displayName, role: sender\|recipient\|cc\|observer} |
| `status` | CommunicationThreadStatus | seeded | AVAILABLE | — | `initiated` \| `awaiting_response` \| `responded` \| `stale` \| `escalated` \| `closed` |
| `communicationSla` | CommunicationSla | seeded | AVAILABLE | — | {targetResponseHours: number, breached: boolean} |
| `sentAt` | string ISO 8601 | seeded | AVAILABLE | — | When initial message was sent |
| `lastResponseAt` | string \| null | seeded | AVAILABLE | — | When last response was received (null if no response) |
| `messageCount` | number | seeded | AVAILABLE | — | Total messages in thread (non-negative) |
| `escalationCount` | number | seeded | AVAILABLE | — | Times escalated (non-negative) |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.** No file at `packages/db/src/schema/` for case-communication-thread. Proposed ARCH-DEBT entry: ARCH-DEBT-052.

**Validation:** `validateCaseCommunicationThread()` — structural correctness (id, tenant.tenantId, threadId, caseId, tenantId, channel enum, participants non-empty, status enum, communicationSla.targetResponseHours, sentAt, messageCount ≥ 0, escalationCount ≥ 0).

---

### 39. War Room

**Source:** Spec #44 P0 Zero-Day War Room UI Spec (baseline v2.6.2)  
**Coverage:** Partial (Spec #44 initial portion, prior session) — **provisional (source partially read)**  
**Contract:** `packages/contracts/src/entities/war-room.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-war-rooms.ts` ✅ (3 war rooms: activated, monitoring, closed)  
**Resolver:** ❌ NOT FOUND  
**Status:** AVAILABLE (fixture exists)  
**Doctrine:** War Room is an OVERLAY entity — does NOT modify the 12-state case lifecycle, does NOT add a case type, does NOT alter ALLOWED_TRANSITIONS. Activated on P0 conditions (system rule or senior decision). All delivery actions modelled as intent/status (no live Graph, Teams, email, WebSocket — Phase 1). Reuses TeamsDecisionEvent for approval flows.

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string (CommonFields) | seeded | AVAILABLE | — | Deterministic ID from fixture |
| `entityType` | `'war-room'` | seeded | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext (CommonFields) | seeded | AVAILABLE | — | Tenant scope (tenantId, tenantName) |
| `createdAt` | string ISO 8601 (CommonFields) | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string ISO 8601 (CommonFields) | system-calculated | AVAILABLE | — | Record update timestamp |
| `source` | SourceMetadata (CommonFields) | seeded | AVAILABLE | — | Provenance (connectorId, importRunId, sourceSystem, sourceTimestamp) |
| `warRoomRef` | string | seeded | AVAILABLE | — | Unique War Room reference identifier |
| `status` | WarRoomStatus | seeded | AVAILABLE | — | `activated` \| `monitoring` \| `winding_down` \| `closed` |
| `activationReason` | string | seeded | AVAILABLE | — | Human-readable activation reason |
| `activationSource` | WarRoomActivationSource | seeded | AVAILABLE | — | `system_rule` \| `senior_decision` |
| `boundCaseIds` | string[] | seeded | AVAILABLE | — | Case IDs bound to this War Room (≥1 required) |
| `membership` | WarRoomMember[] | seeded | AVAILABLE | — | Roster: {userId, role, joinedAt, acknowledgedAt, leftAt} |
| `membership[].role` | WarRoomMemberRole | seeded | AVAILABLE | — | `senior_owner` \| `coordinator` \| `analyst` \| `observer` |
| `subscribers` | WarRoomSubscriber[] | seeded | AVAILABLE | — | Update subscribers: {userId, channels[], cadence, subscribedAt, unsubscribedAt} |
| `subscribers[].channels` | SubscriptionChannel[] | seeded | AVAILABLE | — | `teams_adaptive_card` \| `email_structured` \| `email_summary` \| `in_app` |
| `subscribers[].cadence` | SubscriptionCadence | seeded | AVAILABLE | — | `live` \| `hourly` \| `four_hourly` \| `end_of_day` \| `on_state_change` |
| `communicationCadence` | CommunicationCadenceProfile | seeded | AVAILABLE | — | {activatedCadenceMinutes, monitoringCadenceMinutes, windingDownCadenceMinutes, execUpdateCadenceMinutes} |
| `seniorOwnerId` | string | seeded | AVAILABLE | — | Senior owner responsible (must match a senior_owner in membership) |
| `aiOrientationState` | WarRoomAiOrientationState | seeded | AVAILABLE | — | `active` \| `paused` \| `complete` |
| `closeOutReportRef` | string \| null | seeded | AVAILABLE | — | Reference to close-out report (null until closed) |
| `auditTrailRef` | string | seeded | AVAILABLE | — | Reference to audit trail |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.** No file at `packages/db/src/schema/` for war-room. Proposed ARCH-DEBT entry: ARCH-DEBT-053.

**Validation:** `validateWarRoom()` — structural correctness (id, tenant.tenantId, warRoomRef, status enum, activationReason, activationSource enum, boundCaseIds non-empty, membership non-empty with ≥1 senior_owner, subscribers channel/cadence enums, communicationCadence positive numbers, seniorOwnerId, aiOrientationState enum, auditTrailRef).

---

### 40. Commander AI Provider

**Source:** Spec #13 Commander AI Architecture & Grounding Rules §3 (BYOM Provider Model)  
**Baseline:** `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/13_Commander_AI_Architecture_and_Grounding_Rules.md`  
**Coverage:** Partial (Spec #13 initial portion, prior session) — **provisional (source partially read)**  
**Contract:** `packages/contracts/src/entities/commander-ai-provider.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-commander-ai-provider.ts` ✅ (1 platform-level provider)  
**Resolver:** ❌ **MISSING FROM DISK** — `commander-ai-provider-resolver.ts` referenced in prior documentation but file does not exist in `packages/contracts/src/resolvers/`  
**Status:** AVAILABLE (fixture exists)  
**Doctrine:** Platform-level entity — NOT tenant-scoped. Owned by the Commercial Control Plane. Customers consume Commander AI capabilities; they do NOT configure providers directly. Phase 1: Stubbed foundation only. No live AWS calls. No credentials stored.

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `providerId` | string | seeded | AVAILABLE | — | Unique provider configuration ID |
| `providerName` | string | seeded | AVAILABLE | — | Display name |
| `providerType` | AiProviderType (`'AWS_BEDROCK'`) | seeded | AVAILABLE | — | Provider type (only AWS_BEDROCK in Phase 1) |
| `enabled` | boolean | seeded | AVAILABLE | — | Whether provider is enabled (false in Phase 1) |
| `awsRegion` | string | seeded | AVAILABLE | — | AWS region for Bedrock deployment |
| `interfaceType` | AiInterfaceType | seeded | AVAILABLE | — | `BEDROCK_AGENT` \| `BEDROCK_CONVERSE` |
| `modelId` | string | seeded | AVAILABLE | — | Bedrock model ID (e.g. anthropic.claude-3-5-sonnet-20241022-v2:0) |
| `agentId` | string | seeded | AVAILABLE | — | Bedrock Agent ID (placeholder in Phase 1) |
| `agentAliasId` | string | seeded | AVAILABLE | — | Bedrock Agent Alias ID (placeholder in Phase 1) |
| `connectionStatus` | AiConnectionStatus | seeded | AVAILABLE | — | `NOT_CONNECTED` \| `CONFIGURED_STUB` \| `READY_FOR_PHASE_2` |
| `ragStatus` | AiRagStatus | seeded | AVAILABLE | — | `DORMANT` \| `ACTIVE` \| `DISABLED` |
| `byokStatus` | AiByokStatus | seeded | AVAILABLE | — | `DEFERRED` \| `AVAILABLE` \| `DISABLED` |
| `stsStatus` | AiStsStatus | seeded | AVAILABLE | — | `DEFERRED` \| `AVAILABLE` \| `DISABLED` |
| `lastUpdated` | string (ISO 8601) | seeded | AVAILABLE | — | Last updated timestamp |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture + resolver exist, DB schema ABSENT.** No file at `packages/db/src/schema/` for commander-ai-provider. Proposed ARCH-DEBT entry: ARCH-DEBT-054.

**Resolver detail:**
- `resolveAiProviderStatus()` — returns `AiProviderResolution` (provider config, isOperational, statusSummary, phase, availableCapabilities, deferredCapabilities). Phase 1: always returns `isOperational: false`.
- `canExecuteLive()` — returns boolean (true only when `enabled && connectionStatus === 'READY_FOR_PHASE_2'`). Phase 1: always returns false.

---

### 41. Commander AI Execution Audit

**Source:** Spec #13 Commander AI Architecture & Grounding Rules §8 (Commander Execution Record)  
**Baseline:** `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/13_Commander_AI_Architecture_and_Grounding_Rules.md`  
**Coverage:** Partial (Spec #13 initial portion, prior session) — **provisional (source partially read)**  
**Contract:** `packages/contracts/src/entities/commander-ai-provider.ts` (co-located with CommanderAiProvider)  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** ❌ NOT FOUND  
**Resolver:** ❌ NOT FOUND  
**Status:** FUTURE (no fixture, no DB schema)  
**Doctrine:** Per Spec #13 §8: "Every AI invocation must create a Commander Execution Record." Phase 1: All records are STUBBED_PHASE_1. No live execution.

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `executionId` | string | system-calculated | FUTURE | Missing fixture + DB schema | Unique execution ID |
| `providerId` | string | system-calculated | FUTURE | Missing fixture + DB schema | Provider ID reference |
| `providerType` | AiProviderType | system-calculated | FUTURE | Missing fixture + DB schema | Provider type at time of execution |
| `interfaceType` | AiInterfaceType | system-calculated | FUTURE | Missing fixture + DB schema | Interface type used |
| `requestTimestamp` | string (ISO 8601) | system-calculated | FUTURE | Missing fixture + DB schema | Request timestamp |
| `status` | `'pending'` \| `'success'` \| `'failed'` \| `'stubbed'` | system-calculated | FUTURE | Missing fixture + DB schema | Execution status |
| `inputTokens` | number | system-calculated | FUTURE | Missing fixture + DB schema | Input token count (0 in Phase 1) |
| `outputTokens` | number | system-calculated | FUTURE | Missing fixture + DB schema | Output token count (0 in Phase 1) |
| `modelId` | string | system-calculated | FUTURE | Missing fixture + DB schema | Model ID invoked |
| `agentId` | string | system-calculated | FUTURE | Missing fixture + DB schema | Agent ID (if agent interface) |
| `agentAliasId` | string | system-calculated | FUTURE | Missing fixture + DB schema | Agent Alias ID (if agent interface) |
| `executionMode` | AiExecutionMode | system-calculated | FUTURE | Missing fixture + DB schema | `STUBBED_PHASE_1` \| `LIVE` |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract interface defined, DB schema + fixture ABSENT.** Proposed ARCH-DEBT entry: ARCH-DEBT-055.

---

### 42. Communication Playbook

**Source:** Spec #26 Case Communication and Broadcast Channel, Spec #26a Closed-Loop Email Case Communication Lifecycle v1.2  
**Coverage:** Partial (Spec #26 initial portion, Spec #26a initial portion read) — **provisional (source partially read)**  
**Contract:** `packages/contracts/src/entities/communication-playbook.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-communication-playbooks.ts` ✅  
**Resolver:** ❌ NOT FOUND  
**Status:** AVAILABLE (fixture exists)  
**Doctrine:** Playbook conditions are BOUNDED (6 grammar patterns only — no unbounded DSL). All actions modelled as intent/status (no live execution in Phase 1).

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string (CommonFields) | seeded | AVAILABLE | — | Deterministic ID from fixture |
| `tenant` | TenantContext (CommonFields) | seeded | AVAILABLE | — | Tenant scope (tenantId, tenantName) |
| `createdAt` | string ISO 8601 (CommonFields) | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string ISO 8601 (CommonFields) | system-calculated | AVAILABLE | — | Record update timestamp |
| `source` | SourceMetadata (CommonFields) | seeded | AVAILABLE | — | Provenance (connectorId, importRunId, sourceSystem, sourceTimestamp) |
| `playbookId` | string | seeded | AVAILABLE | — | Playbook identifier |
| `name` | string | seeded | AVAILABLE | — | Human-readable playbook name |
| `trigger` | PlaybookTrigger (JSONB) | seeded | AVAILABLE | — | {caseType: CaseType, conditions: PlaybookCondition[]} |
| `steps` | PlaybookStep[] (JSONB) | seeded | AVAILABLE | — | Ordered steps: {stepNumber, channel, action, template, recipients[], delay, condition} |
| `version` | string | seeded | AVAILABLE | — | Playbook version (semantic) |
| `status` | PlaybookStatus | seeded | AVAILABLE | — | `draft` \| `active` \| `superseded` |

**Enums:**
- `PlaybookStatus`: draft, active, superseded
- `PlaybookStepAction`: send_acknowledgement, send_remediation_request, send_escalation, send_closure_notice, post_command_bridge, send_adaptive_card

**Bounded Condition Grammar (6 patterns):**
1. `always`
2. `never`
3. `case.{field} == '{value}'`
4. `case.{field} IN ['{v1}', '{v2}']`
5. `no_response_to_step_{N}`
6. `time_since_step_{N} > {duration}`

**Validation:** `validateCommunicationPlaybook()` — structural correctness (id, tenant.tenantId, playbookId, name, trigger.caseType, steps non-empty with valid actions and bounded conditions, version, status enum).

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.** Proposed ARCH-DEBT entry: ARCH-DEBT-056.

---

### 43. Playbook Execution

**Source:** Spec #26 Case Communication and Broadcast Channel, Spec #26a Closed-Loop Email Case Communication Lifecycle v1.2  
**Coverage:** Partial (Spec #26 initial portion, Spec #26a initial portion read) — **provisional (source partially read)**  
**Contract:** `packages/contracts/src/entities/playbook-execution.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** ❌ NOT FOUND (no dedicated fixture file)  
**Resolver:** ❌ NOT FOUND  
**Status:** AVAILABLE (contract defined, no fixture — tracks runtime state of playbook instances)  
**Doctrine:** All actions modelled as intent/status (no live execution in Phase 1).

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string (CommonFields) | system-calculated | AVAILABLE | — | Deterministic ID |
| `tenant` | TenantContext (CommonFields) | system-calculated | AVAILABLE | — | Tenant scope (tenantId, tenantName) |
| `createdAt` | string ISO 8601 (CommonFields) | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string ISO 8601 (CommonFields) | system-calculated | AVAILABLE | — | Record update timestamp |
| `source` | SourceMetadata (CommonFields) | system-calculated | AVAILABLE | — | Provenance |
| `executionId` | string | system-calculated | AVAILABLE | — | Execution identifier |
| `playbookId` | string | system-calculated | AVAILABLE | — | Ref → CommunicationPlaybook |
| `caseId` | string | system-calculated | AVAILABLE | — | Case this execution is bound to |
| `tenantId` | string | system-calculated | AVAILABLE | — | Tenant ID (denormalised) |
| `currentStep` | number | system-calculated | AVAILABLE | — | Current step number being executed |
| `stepStatuses` | StepExecutionStatus[] (JSONB) | system-calculated | AVAILABLE | — | Per-step: {stepNumber, status, executedAt, reason} |
| `startedAt` | string ISO 8601 | system-calculated | AVAILABLE | — | When execution started |
| `completedAt` | string ISO 8601 \| null | system-calculated | AVAILABLE | — | When execution completed (null if running) |
| `status` | PlaybookExecutionStatus | system-calculated | AVAILABLE | — | `running` \| `completed` \| `aborted` |

**Enums:**
- `PlaybookExecutionStatus`: running, completed, aborted
- `PlaybookStepExecutionStatus`: pending, executed, skipped, failed

**Validation:** `validatePlaybookExecution()` — structural correctness (id, tenant.tenantId, executionId, playbookId, caseId, tenantId, currentStep ≥ 0, stepStatuses array with valid statuses, startedAt, status enum).

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract exists, DB schema + fixture ABSENT.** Proposed ARCH-DEBT entry: ARCH-DEBT-057.

---

### 44. Detonation Verdict

**Source:** Spec #26a Closed-Loop Email Case Communication Lifecycle v1.2 (detonation verdict binding)  
**Coverage:** Partial (Spec #26a initial portion read) — **provisional (source partially read)**  
**Contract:** `packages/contracts/src/entities/detonation-verdict.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-detonation-verdicts.ts` ✅  
**Resolver:** ❌ NOT FOUND  
**Status:** AVAILABLE (fixture exists)  
**Doctrine:** Connector class A (read-only SOC verdict consumption). SOC read-only boundary: consumed NOT produced by Commander. No live Graph API (Phase 1).

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string (CommonFields) | seeded | AVAILABLE | — | Deterministic ID from fixture |
| `tenant` | TenantContext (CommonFields) | seeded | AVAILABLE | — | Tenant scope (tenantId, tenantName) |
| `createdAt` | string ISO 8601 (CommonFields) | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string ISO 8601 (CommonFields) | system-calculated | AVAILABLE | — | Record update timestamp |
| `source` | SourceMetadata (CommonFields) | seeded | AVAILABLE | — | Provenance |
| `verdictId` | string | seeded | AVAILABLE | — | Verdict identifier |
| `tenantId` | string | seeded | AVAILABLE | — | Tenant ID (denormalised) |
| `emailMessageId` | string | seeded | AVAILABLE | — | Reference to the original email message |
| `detonationSource` | DetonationSource | seeded | AVAILABLE | — | `microsoft_defender` \| `other` |
| `overallVerdict` | DetonationOverallVerdict | seeded | AVAILABLE | — | `clean` \| `suspicious` \| `malicious` |
| `checks` | DetonationCheck[] (JSONB) | seeded | AVAILABLE | — | Individual checks: {checkType, result, confidence (0-100), detail} |
| `receivedAt` | string ISO 8601 | seeded | AVAILABLE | — | When verdict received from source |
| `processedAt` | string ISO 8601 | seeded | AVAILABLE | — | When Commander processed the verdict |

**Enums:**
- `DetonationSource`: microsoft_defender, other
- `DetonationOverallVerdict`: clean, suspicious, malicious
- `DetonationCheckType`: url_detonation, attachment_sandboxing, header_anomaly, impersonation_scoring, reply_chain_hijacking
- `DetonationCheckResult`: pass, fail, suspicious

**Validation:** `validateDetonationVerdict()` — structural correctness (id, tenant.tenantId, verdictId, tenantId, emailMessageId, detonationSource enum, overallVerdict enum, checks array with valid checkType/result/confidence 0-100, receivedAt, processedAt).

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.** Proposed ARCH-DEBT entry: ARCH-DEBT-058.

---

### 45. Phishing Report

**Source:** Spec #26a Closed-Loop Email Case Communication Lifecycle v1.2 (phishing lifecycle)  
**Coverage:** Partial (Spec #26a initial portion read) — **provisional (source partially read)**  
**Contract:** `packages/contracts/src/entities/phishing-report.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-phishing-reports.ts` ✅  
**Resolver:** ❌ NOT FOUND  
**Status:** AVAILABLE (fixture exists)  
**Doctrine:** SOC read-only boundary: verdicts consumed, not produced. All notifications modelled as intent/status (Phase 1).

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string (CommonFields) | seeded | AVAILABLE | — | Deterministic ID from fixture |
| `tenant` | TenantContext (CommonFields) | seeded | AVAILABLE | — | Tenant scope (tenantId, tenantName) |
| `createdAt` | string ISO 8601 (CommonFields) | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string ISO 8601 (CommonFields) | system-calculated | AVAILABLE | — | Record update timestamp |
| `source` | SourceMetadata (CommonFields) | seeded | AVAILABLE | — | Provenance |
| `reportId` | string | seeded | AVAILABLE | — | Report identifier |
| `tenantId` | string | seeded | AVAILABLE | — | Tenant ID (denormalised) |
| `reportedBy` | string | seeded | AVAILABLE | — | Employee who reported (ID or email) |
| `reportedAt` | string ISO 8601 | seeded | AVAILABLE | — | When report was submitted |
| `originalEmailRef` | string | seeded | AVAILABLE | — | Reference to the original email |
| `detonationVerdictId` | string \| null | seeded | AVAILABLE | — | Ref → DetonationVerdict (null if not yet available) |
| `triageVerdict` | PhishingTriageVerdict \| null | seeded | AVAILABLE | — | `malicious` \| `suspicious` \| `clean` \| null |
| `observablesEmitted` | string[] | seeded | AVAILABLE | — | Observable IDs emitted from this report |
| `riskObjectId` | string \| null | seeded | AVAILABLE | — | Risk Object ID (if malicious) |
| `caseId` | string \| null | seeded | AVAILABLE | — | Case ID (if case was created) |
| `employeeNotificationStatus` | PhishingNotificationStatus | seeded | AVAILABLE | — | `pending` \| `sent` |
| `status` | PhishingReportStatus | seeded | AVAILABLE | — | `received` \| `triaging` \| `verdicted` \| `closed` |

**Enums:**
- `PhishingTriageVerdict`: malicious, suspicious, clean
- `PhishingNotificationStatus`: pending, sent
- `PhishingReportStatus`: received, triaging, verdicted, closed

**Validation:** `validatePhishingReport()` — structural correctness (id, tenant.tenantId, reportId, tenantId, reportedBy, reportedAt, originalEmailRef, triageVerdict valid or null, observablesEmitted array, employeeNotificationStatus enum, status enum).

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.** Proposed ARCH-DEBT entry: ARCH-DEBT-059.

---

### 46. STIX Bundle Ingest

**Source:** Spec #26a Closed-Loop Email Case Communication Lifecycle v1.2 (STIX bundle ingestion path)  
**Coverage:** Partial (Spec #26a initial portion read) — **provisional (source partially read)**  
**Contract:** `packages/contracts/src/entities/stix-bundle-ingest.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-stix-bundles.ts` ✅  
**Resolver:** ❌ NOT FOUND  
**Status:** AVAILABLE (fixture exists)  
**Doctrine:** No live STIX/TAXII feed consumption (Phase 1). All processing modelled as status progression.

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string (CommonFields) | seeded | AVAILABLE | — | Deterministic ID from fixture |
| `tenant` | TenantContext (CommonFields) | seeded | AVAILABLE | — | Tenant scope (tenantId, tenantName) |
| `createdAt` | string ISO 8601 (CommonFields) | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string ISO 8601 (CommonFields) | system-calculated | AVAILABLE | — | Record update timestamp |
| `source` | SourceMetadata (CommonFields) | seeded | AVAILABLE | — | Provenance |
| `ingestId` | string | seeded | AVAILABLE | — | Ingest record identifier |
| `tenantId` | string | seeded | AVAILABLE | — | Tenant ID (denormalised) |
| `sourceEmailId` | string | seeded | AVAILABLE | — | Ref → InboundEmailSubmission |
| `bundleVersion` | string | seeded | AVAILABLE | — | STIX bundle version (e.g. "2.1") |
| `objectsParsed` | number | seeded | AVAILABLE | — | Count of objects parsed from bundle |
| `objectTypes` | StixObjectType[] (JSONB) | seeded | AVAILABLE | — | Types of STIX objects found |
| `mappedObservableIds` | string[] | seeded | AVAILABLE | — | Observable IDs mapped from bundle |
| `mappedIocIds` | string[] | seeded | AVAILABLE | — | IOC IDs mapped from bundle |
| `relevanceScore` | number (0-100) | seeded | AVAILABLE | — | Computed from estate matching |
| `caseCreated` | boolean | seeded | AVAILABLE | — | Whether a case was created |
| `caseId` | string \| null | seeded | AVAILABLE | — | Case ID if case created |
| `ingestedAt` | string ISO 8601 | seeded | AVAILABLE | — | When bundle was ingested |
| `status` | StixIngestStatus | seeded | AVAILABLE | — | `received` \| `parsing` \| `mapped` \| `evaluated` \| `complete` |

**Enums:**
- `StixObjectType`: indicator, attack-pattern, malware, campaign, threat-actor, tool, vulnerability
- `StixIngestStatus`: received, parsing, mapped, evaluated, complete

**Validation:** `validateStixBundleIngest()` — structural correctness (id, tenant.tenantId, ingestId, tenantId, sourceEmailId, bundleVersion, objectsParsed ≥ 0, objectTypes valid, relevanceScore 0-100, ingestedAt, status enum).

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.** Proposed ARCH-DEBT entry: ARCH-DEBT-060.

---

### 47. Teams Decision Event

**Source:** Spec #26 Case Communication and Broadcast Channel, Spec #44 P0 Zero-Day War Room (Teams integration)  
**Coverage:** Partial (Spec #26 initial portion, Spec #44 initial portion read) — **provisional (source partially read)**  
**Contract:** `packages/contracts/src/entities/teams-decision-event.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-teams-decision-events.ts` ✅  
**Resolver:** ❌ NOT FOUND  
**Status:** AVAILABLE (fixture exists)  
**Doctrine:** Teams decisions flow through Commander (never direct state mutation). Teams bot NEVER directly mutates case state. Commander validates actor authority → Commander executes transition. No live Teams bot (Phase 1). SOC read-only boundary preserved. Reused by War Room (§39) for approval flows.

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string (CommonFields) | seeded | AVAILABLE | — | Deterministic ID from fixture |
| `tenant` | TenantContext (CommonFields) | seeded | AVAILABLE | — | Tenant scope (tenantId, tenantName) |
| `createdAt` | string ISO 8601 (CommonFields) | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string ISO 8601 (CommonFields) | system-calculated | AVAILABLE | — | Record update timestamp |
| `source` | SourceMetadata (CommonFields) | seeded | AVAILABLE | — | Provenance |
| `eventId` | string | seeded | AVAILABLE | — | Event identifier |
| `tenantId` | string | seeded | AVAILABLE | — | Tenant ID (denormalised) |
| `caseId` | string | seeded | AVAILABLE | — | Case this decision relates to |
| `requestType` | TeamsRequestType | seeded | AVAILABLE | — | `approval` \| `validation_confirmation` \| `action_override` \| `resource_assignment` \| `escalation` |
| `cardId` | string | seeded | AVAILABLE | — | Reference to the posted Adaptive Card |
| `requestedAt` | string ISO 8601 | seeded | AVAILABLE | — | When request was posted |
| `respondedAt` | string ISO 8601 \| null | seeded | AVAILABLE | — | When response received (null if pending) |
| `respondedBy` | string \| null | seeded | AVAILABLE | — | Who responded (null if pending) |
| `decision` | TeamsDecision \| null | seeded | AVAILABLE | — | `approved` \| `denied` \| `delegated` \| `confirmed` \| `disputed` \| `need_more_time` \| null |
| `validatedByCommander` | boolean | seeded | AVAILABLE | — | Whether Commander validated actor's authority |
| `executedByCommander` | boolean | seeded | AVAILABLE | — | Whether Commander executed resulting action |
| `auditEventRef` | string | seeded | AVAILABLE | — | Ref → Audit Event recording this decision |

**Enums:**
- `TeamsRequestType`: approval, validation_confirmation, action_override, resource_assignment, escalation
- `TeamsDecision`: approved, denied, delegated, confirmed, disputed, need_more_time

**Validation:** `validateTeamsDecisionEvent()` — structural correctness (id, tenant.tenantId, eventId, tenantId, caseId, requestType enum, cardId, requestedAt, decision valid or null, validatedByCommander boolean, executedByCommander boolean, auditEventRef).

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.** Proposed ARCH-DEBT entry: ARCH-DEBT-061.

---

### 48. Posture Metric Config

**Source:** Spec #65 External Operating Picture Surface Specification, Spec #66 Internal Operating Picture Surface Specification, MP §24 (Workspace Model — posture rollups)  
**Coverage:** Partial (Spec #65 §1–§3.6 read, Spec #66 §1–§5 read) — **provisional (source partially read)**  
**Contract:** `packages/contracts/src/entities/posture-metrics-config.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** ❌ NOT FOUND  
**Resolver:** ❌ NOT FOUND  
**Status:** FUTURE (no fixture, no DB schema)  
**Doctrine:** Strategy values sourced from the Strategy Layer (Spec #32 — posture, threshold, effectiveness-targets surfaces). No hardcoded threshold literals in page code.

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string (CommonFields) | system-calculated | FUTURE | Missing fixture: seed-posture-metrics-config.ts | Deterministic ID |
| `tenant` | TenantContext (CommonFields) | system-calculated | FUTURE | Missing fixture | Tenant scope (tenantId, tenantName) |
| `createdAt` | string ISO 8601 (CommonFields) | system-calculated | FUTURE | Missing fixture | Record creation timestamp |
| `updatedAt` | string ISO 8601 (CommonFields) | system-calculated | FUTURE | Missing fixture | Record update timestamp |
| `source` | SourceMetadata (CommonFields) | system-calculated | FUTURE | Missing fixture | Provenance |
| `entityType` | `'posture-metric-config'` | system-calculated | FUTURE | Missing fixture | Discriminator |
| `label` | string | system-calculated | FUTURE | Missing fixture | Human-readable metric label |
| `metricKey` | string | system-calculated | FUTURE | Missing fixture | Short metric key (slug) for programmatic reference |
| `domain` | PostureMetricDomain | system-calculated | FUTURE | Missing fixture | Security domain: vulnerability, exposure, identity, coverage, sla, posture, configuration, threat-intelligence |
| `unit` | string | system-calculated | FUTURE | Missing fixture | Unit of measurement (e.g., '%', 'count', 'hours', 'score') |
| `higherIsBetter` | boolean | system-calculated | FUTURE | Missing fixture | Whether higher values are better |
| `thresholds` | StrategyThresholdRef | strategy-derived | FUTURE | Missing fixture + strategy layer resolver | Strategy-sourced thresholds: strategySurface, policyId, green, amber |
| `periods` | PostureMetricPeriodSnapshot[] | system-calculated | FUTURE | Missing fixture + missing resolver | Per-period snapshots (one per time period: 24h, 7d, 30d, ytd). Each: period, currentValue, previousValue, trend, history[], band |
| `displayOrder` | number (1-based) | system-calculated | FUTURE | Missing fixture | Display order in the posture grid |

**Supporting Types (contract-defined, no own table):**
- `PostureTimePeriod`: '24h' | '7d' | '30d' | 'ytd'
- `TrendDirection`: 'up' | 'down' | 'flat'
- `ThresholdBand`: 'green' | 'amber' | 'red'
- `PostureMetricDomain`: vulnerability | exposure | identity | coverage | sla | posture | configuration | threat-intelligence
- `PostureMetricDataPoint`: { timestamp: string; value: number }
- `StrategyThresholdRef`: { strategySurface: string; policyId: string; green: number; amber: number }
- `PostureMetricPeriodSnapshot`: { period, currentValue, previousValue, trend, history[], band }

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract exists, DB schema + fixture ABSENT.** Proposed ARCH-DEBT entry: ARCH-DEBT-062.

---

### 49. Posture Accountability

**Source:** Spec #71 Pre-Warned/Protected/Novel Classification (baseline `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/71_Pre_Warned_Protected_Novel_Classification_Spec.md`)  
**Coverage:** Partial (Spec #71 §1–§5 read) — **provisional (source partially read)**  
**Contract:** `packages/contracts/src/entities/posture-accountability.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-posture-accountability.ts` ✅ (5 records)  
**Resolver:** ❌ NOT FOUND (engine exists at `packages/contracts/src/engines/posture-accountability-engine.ts` — classification logic; NOT a resolver per convention)  
**Status:** AVAILABLE (fixture exists — seeded fields available; system-calculated fields requiring resolver are FUTURE)  
**Decision:** DEC-spec39-dual-model — temporal posture accountability model, SEPARATE from severity escalation in pre-warned-classification.ts. Both can reference the same entity simultaneously.  
**Doctrine:** Posture classification is system-owned. PRE_WARNED / PROTECTED / NOVEL determined by engine from posture signals. Strategy values (escalation thresholds) sourced from Strategy Layer (Spec #32).

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | Deterministic ID (CommonFields) |
| `entityType` | `'posture-accountability'` | seeded | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope (tenantId, tenantName) |
| `createdAt` | string (ISO 8601) | seeded | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string (ISO 8601) | seeded | AVAILABLE | — | Record update timestamp |
| `source` | SourceMetadata | seeded | AVAILABLE | — | Provenance (connectorId, importRunId, sourceSystem, sourceTimestamp) |
| `accountabilityId` | string | seeded | AVAILABLE | — | Unique accountability record identifier |
| `accountableEntityType` | AccountableEntityType | seeded | AVAILABLE | — | 4 types: asset, identity, connector, component |
| `entityRef` | string | seeded | AVAILABLE | — | Reference to canonical entity (asset ID, identity ID, etc.) |
| `classification` | PostureAccountabilityClassification | seeded | AVAILABLE | — | PRE_WARNED, PROTECTED, NOVEL |
| `previousClassification` | PostureAccountabilityClassification \| null | seeded | AVAILABLE | — | Previous classification (null if first) |
| `classifiedAt` | string (ISO 8601) | seeded | AVAILABLE | — | When classification was determined |
| `classifiedBy` | ClassifierSource | seeded | AVAILABLE | — | system, analyst |
| `reason` | string | seeded | AVAILABLE | — | Human-readable reason for classification |
| `evidenceRefs` | string[] | seeded | AVAILABLE | — | References to drift IDs, coverage gap IDs, etc. |
| `durationInState` | number | system-calculated | AVAILABLE | — | Days in current classification state (engine function `computeTimeInState` exists) |
| `escalationThreshold` | number | strategy-derived | AVAILABLE | — | Days threshold before escalation (strategy-sourced; seeded with static values in fixture) |
| `status` | AccountabilityStatus | seeded | AVAILABLE | — | active, overridden, expired |
| `linkedRiskObjectRef` | string \| null | seeded | AVAILABLE | — | Linked risk object reference (if classification generated from risk object) |
| `linkedCaseRef` | string \| null | seeded | AVAILABLE | — | Linked case reference (if classification triggered case creation) |

**Supporting Types (contract-defined, no own table):**
- `PostureAccountabilityClassification`: 'PRE_WARNED' | 'PROTECTED' | 'NOVEL'
- `AccountableEntityType`: 'asset' | 'identity' | 'connector' | 'component'
- `AccountabilityStatus`: 'active' | 'overridden' | 'expired'
- `ClassifierSource`: 'system' | 'analyst'

**Validation:** `validatePostureAccountability()` — structural validation of all required fields, enum membership, and numeric constraints.

**Engine (classification logic):** `posture-accountability-engine.ts` provides:
- `classifyPostureState()` — determines PRE_WARNED / PROTECTED / NOVEL from signals
- `evaluateTransition()` — determines if classification transition warranted
- `computeTimeInState()` — calculates days in current classification
- `checkEscalationThreshold()` — determines if escalation is due
- `generateAccountabilityReport()` — summarises entity accountability states

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.** Proposed ARCH-DEBT entry: ARCH-DEBT-063.

---

### 50. Auth Session

**Source:** Spec #35 Platform Security and Hardening  
**Coverage:** Full (Spec #35 requirements read)  
**Contract:** `packages/contracts/src/entities/auth-session.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-auth-sessions.ts` ✅ (4 records)  
**Status:** AVAILABLE (fixture exists)

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'auth-session'` | seeded | AVAILABLE | — | Discriminator |
| `sessionId` | string | system-calculated | AVAILABLE | — | Unique session identifier (UUID) |
| `userId` | string | seeded | AVAILABLE | — | Authenticated user reference |
| `tenantId` | string | seeded | AVAILABLE | — | Tenant scope |
| `createdAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Session creation time |
| `expiresAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Session expiry time |
| `mfaVerified` | boolean | system-calculated | AVAILABLE | — | Whether MFA was completed |
| `ipAddress` | string | system-calculated | AVAILABLE | — | Client IP address |
| `userAgent` | string | system-calculated | AVAILABLE | — | Client user agent |
| `status` | AuthSessionStatus | system-calculated | AVAILABLE | — | active, expired, revoked |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

### 51. Break-Glass Request

**Source:** Spec #35 Platform Security and Hardening  
**Coverage:** Full (Spec #35 requirements read)  
**Contract:** `packages/contracts/src/entities/break-glass-request.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-break-glass.ts` ✅ (3 records)  
**Status:** AVAILABLE (fixture exists)

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'break-glass-request'` | seeded | AVAILABLE | — | Discriminator |
| `requestId` | string | system-calculated | AVAILABLE | — | Unique request identifier |
| `requestorId` | string | seeded | AVAILABLE | — | User requesting break-glass |
| `tenantId` | string | seeded | AVAILABLE | — | Tenant scope |
| `reason` | string | seeded | AVAILABLE | — | Justification for elevated access |
| `scope` | string | seeded | AVAILABLE | — | Scope of access requested |
| `status` | BreakGlassStatus | system-calculated | AVAILABLE | — | pending, approved, denied, expired |
| `approvedBy` | string \| null | system-calculated | AVAILABLE | — | Approver user ID |
| `approvedAt` | string \| null | system-calculated | AVAILABLE | — | Approval timestamp |
| `expiresAt` | string | system-calculated | AVAILABLE | — | When elevated access expires |
| `auditRef` | string | system-calculated | AVAILABLE | — | Reference to audit trail entry |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

### 52. RBAC Policy

**Source:** Spec #35 Platform Security and Hardening  
**Coverage:** Full (Spec #35 requirements read)  
**Contract:** `packages/contracts/src/entities/rbac-policy.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-rbac-policies.ts` ✅ (5 records — one per major role)  
**Status:** AVAILABLE (fixture exists)

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'rbac-policy'` | seeded | AVAILABLE | — | Discriminator |
| `policyId` | string | seeded | AVAILABLE | — | Unique policy identifier |
| `tenantId` | string | seeded | AVAILABLE | — | Tenant scope |
| `role` | string | seeded | AVAILABLE | — | Role name (CISO, SOM, Security Analyst, Tenant Admin, Read-Only Observer) |
| `permissions` | string[] | seeded | AVAILABLE | — | Permission strings (resource:action format) |
| `resourceScope` | string | seeded | AVAILABLE | — | tenant-wide, team-scoped |
| `condition` | string \| null | seeded | AVAILABLE | — | Optional condition expression |
| `active` | boolean | seeded | AVAILABLE | — | Whether policy is currently active |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

### 53. Search Index Config

**Source:** Spec #42 Universal Search  
**Coverage:** Full (Spec #42 requirements read)  
**Contract:** `packages/contracts/src/entities/search-index-config.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-search-config.ts` ✅ (1 record)  
**Status:** AVAILABLE (fixture exists)

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'search-index-config'` | seeded | AVAILABLE | — | Discriminator |
| `indexId` | string | seeded | AVAILABLE | — | Index identifier |
| `entityTypes` | string[] | seeded | AVAILABLE | — | Which entity types are indexed (12 types) |
| `tenantScoped` | boolean | seeded | AVAILABLE | — | Whether results are tenant-scoped |
| `rbacFiltered` | boolean | seeded | AVAILABLE | — | Whether RBAC filtering applies |
| `sensitiveFields` | string[] | seeded | AVAILABLE | — | Fields requiring audit on search |
| `auditEnabled` | boolean | seeded | AVAILABLE | — | Whether queries are audit-logged |
| `lastReindexedAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Last reindex timestamp |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

### 54. Entitlement Manifest

**Source:** Spec #38 Commercial Control Plane UI  
**Coverage:** Full (Spec #38 requirements read)  
**Contract:** `packages/contracts/src/entities/entitlement-manifest.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-entitlements.ts` ✅  
**Status:** AVAILABLE (fixture exists)  
**Use Cases:** Spec 38, UC-157, UC-158, UC-160, UC-161

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'entitlement-manifest'` | seeded | AVAILABLE | — | Discriminator |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

### 55. Mission

**Source:** Spec #37 Mission Impact Model  
**Coverage:** Full (Spec #37 requirements read)  
**Contract:** `packages/contracts/src/entities/mission.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-missions.ts` ✅  
**Status:** AVAILABLE (fixture exists)  
**Use Cases:** Spec 37, UC-162, UC-164, UC-166

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'mission'` | seeded | AVAILABLE | — | Discriminator |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

### 56. Mission Binding

**Source:** Spec #37 Mission Impact Model  
**Coverage:** Full (Spec #37 requirements read)  
**Contract:** `packages/contracts/src/entities/mission-binding.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-mission-bindings.ts` ✅  
**Status:** AVAILABLE (fixture exists)  
**Use Cases:** Spec 37, UC-162, UC-163

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'mission-binding'` | seeded | AVAILABLE | — | Discriminator |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

## Maintenance Rules

1. **This artifact is mechanically derived.** Do NOT manually edit entity entries. Use the data-dictionary-generation.kiro.hook to update.
2. **Availability is file-existence based.** Fixture exists → AVAILABLE. Integration-derived → FUTURE. System-calculated → check resolver exists.
3. **Source citations from baseline only.** Never cite the translation layer (per SOURCING_RULE.md).
4. **Coverage read-state from COVERAGE.md.** Mark entries "provisional" when source spec is partially read.
5. **Completion gate enforced.** An entity in `packages/contracts/src/entities` or `packages/db/src/schema` with no corresponding DATA_DICTIONARY.md entry = INCOMPLETE (conformance assertion in `.kiro/testing/conformance-registry.md`).

---

**Last Updated:** 2026-06-07 (Finding entity updated — field table expanded with CommonFields (tenant, source, createdAt, updatedAt), use cases corrected to UC-167/170/171/174, validator documented, doctrine noted, coverage flagged provisional. Snapshot: +3 drift-rule-engine entities to enumeration, +3 fixtures. Divergences: 12→15, ARCH-DEBT-063/064/065 proposed for D-04 DB schema gaps.)  
**Snapshot Commit:** (to be recorded after commit)

### 57. Finding

**Source:** Spec #34 Mission Control / System Pulse (rule evaluation model — Drift and Rule Engine)  
**Coverage:** provisional (baseline Spec #34 partially read per COVERAGE.md)  
**Contract:** `packages/contracts/src/entities/finding.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-findings.ts` ✅ (5 records)  
**Status:** AVAILABLE (fixture exists)  
**Domain:** D-04 (Drift & Rule Engine)  
**Use Cases:** Spec 34, UC-167 (author rule), UC-170 (execute rules → emit findings), UC-171 (suppress/dedupe), UC-174 (manage finding lifecycle)  
**Validator:** `validateFinding()` — structural validation (required fields, range checks, enum membership, suppression reason enforcement)  
**Doctrine:** Findings are system-emitted. Commander does not write SOC detections; it evaluates drift rules over canonical signal and records Findings (SOC boundary, Assertion 8). `proposedActions` are recommendations only — never executed by the engine (AI/automation grounding; Assertion 11 verdict semantics preserved).

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'finding'` | seeded | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope (tenantId, tenantName) |
| `findingId` | string | seeded | AVAILABLE | — | Unique finding identifier |
| `ruleRef` | string | seeded | AVAILABLE | — | Reference to emitting RuleDefinition |
| `tenantId` | string | seeded | AVAILABLE | — | Tenant ID (explicit field, v1.3 Req 7) |
| `severity` | number (1–5) | seeded | AVAILABLE | — | Validated range via `validateFinding()` |
| `confidence` | number (0–100) | seeded | AVAILABLE | — | Validated range via `validateFinding()` |
| `dedupeKey` | string | seeded | AVAILABLE | — | Identical keys collapse to single active finding |
| `affectedEntityType` | AffectedEntityType enum | seeded | AVAILABLE | — | 7 values: asset, identity, control, vulnerability, exposure, connector, tenant |
| `affectedEntityRef` | string | seeded | AVAILABLE | — | Canonical reference to affected entity |
| `proposedActions` | ProposedAction[] | seeded | AVAILABLE | — | Recommendations only (never auto-executed). Shape: {actionId, actionType, description, automated, targetRef?}. 7 action types: create-case, enrich-case, notify, raise-priority, open-investigation, request-verdict, recommend-remediation. |
| `status` | FindingStatus enum | seeded | AVAILABLE | — | 5 values: new, acknowledged, suppressed, resolved, false_positive (system-owned lifecycle) |
| `detectedAt` | string (ISO 8601) | seeded | AVAILABLE | — | When the finding was detected |
| `resolvedAt` | string (ISO 8601) \| undefined | seeded | AVAILABLE | — | Optional — when finding was resolved |
| `suppressionReason` | string \| undefined | seeded | AVAILABLE | — | Required when status is "suppressed" (enforced by validator) |
| `source` | SourceMetadata | seeded | AVAILABLE | — | Provenance (CommonFields) |
| `createdAt` | string (ISO 8601) | seeded | AVAILABLE | — | Record creation timestamp (CommonFields) |
| `updatedAt` | string (ISO 8601) | seeded | AVAILABLE | — | Record update timestamp (CommonFields) |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.** ARCH-DEBT proposed (see Divergences section below).

---

### 58. Risk Score

**Source:** Spec #34 Drift and Rule Engine  
**Coverage:** Full (Spec #34 requirements read)  
**Contract:** `packages/contracts/src/entities/risk-scoring-engine.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-risk-scores.ts` ✅ (4 records)  
**Status:** AVAILABLE (fixture exists)  
**Domain:** D-04 (Drift & Rule Engine)  
**Use Cases:** Spec 34, UC-169, UC-172

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'risk-score'` | seeded | AVAILABLE | — | Discriminator |
| `scoringId` | string | seeded | AVAILABLE | — | Unique scoring id |
| `scoredEntityType` | enum | seeded | AVAILABLE | — | Spec field `entityType` renamed to avoid discriminant clash |
| `scoredEntityRef` | string | seeded | AVAILABLE | — | Spec field `entityRef` renamed for the same reason |
| `riskScore` | number (0–100) | seeded | AVAILABLE | — | Validated range |
| `factors` | RiskFactor[] | seeded | AVAILABLE | — | Contributions sum ≤ 100 |
| `computedAt` | string | seeded | AVAILABLE | — | Computation time |
| `model` | string | seeded | AVAILABLE | — | Model id |
| `version` | string | seeded | AVAILABLE | — | Model version |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

### 59. Blast Radius

**Source:** Spec #34 Drift and Rule Engine  
**Coverage:** Full (Spec #34 requirements read)  
**Contract:** `packages/contracts/src/entities/blast-radius-engine.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-blast-radius.ts` ✅ (3 records)  
**Status:** AVAILABLE (fixture exists)  
**Domain:** D-04 (Drift & Rule Engine)  
**Use Cases:** Spec 34, UC-171

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'blast-radius'` | seeded | AVAILABLE | — | Discriminator |
| `computationId` | string | seeded | AVAILABLE | — | Unique computation id |
| `originEntityRef` | string | seeded | AVAILABLE | — | Origin reference |
| `originEntityType` | enum | seeded | AVAILABLE | — | asset/identity/rule/… |
| `affectedEntities` | AffectedEntity[] | seeded | AVAILABLE | — | Reachable impact set |
| `totalImpactScore` | number (0–100) | seeded | AVAILABLE | — | Validated range |
| `depth` | number | seeded | AVAILABLE | — | Max traversal depth |
| `computedAt` | string | seeded | AVAILABLE | — | Computation time |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

### 60. Decision Record

**Source:** Spec #36 Rule/Model/Decision Governance Surface  
**Coverage:** Full (Spec #36 requirements read)  
**Contract:** `packages/contracts/src/entities/decision-record.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-decision-records.ts` ✅ (5 records)  
**Status:** AVAILABLE (fixture exists)  
**Domain:** D-04 (Drift & Rule Engine)  
**Use Cases:** Spec 36, UC-175, UC-178

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'decision-record'` | seeded | AVAILABLE | — | Discriminator |
| `recordId` | string | seeded | AVAILABLE | — | Unique decision id |
| `caseRef` | string | seeded | AVAILABLE | — | Associated case |
| `ruleRef?` | string | seeded | AVAILABLE | — | Triggering rule |
| `engineRef?` | string | seeded | AVAILABLE | — | Producing engine |
| `decisionType` | enum | seeded | AVAILABLE | — | rule_hit/engine_output/ai_recommendation/strategy_application/suppression/escalation |
| `rationale` | string | seeded | AVAILABLE | — | Human-readable explanation |
| `inputFactors` | DecisionFactor[] | seeded | AVAILABLE | — | Weighted input factors |
| `outputAction` | string | seeded | AVAILABLE | — | Resulting action |
| `confidence` | number (0–100) | seeded | AVAILABLE | — | Validated range |
| `decidedAt` | string | seeded | AVAILABLE | — | Decision timestamp |
| `decidedBy` | enum | seeded | AVAILABLE | — | system/analyst |
| `overridden` | boolean | seeded | AVAILABLE | — | Whether overridden |
| `overrideReason?` | string | seeded | AVAILABLE | — | Required when overridden |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

### 61. Simulation Result

**Source:** Spec #36 Rule/Model/Decision Governance Surface  
**Coverage:** Full (Spec #36 requirements read)  
**Contract:** `packages/contracts/src/entities/simulation-result.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-simulation-results.ts` ✅ (3 records)  
**Status:** AVAILABLE (fixture exists)  
**Domain:** D-04 (Drift & Rule Engine)  
**Use Cases:** Spec 36, UC-176

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'simulation-result'` | seeded | AVAILABLE | — | Discriminator |
| `simulationId` | string | seeded | AVAILABLE | — | Unique simulation id |
| `ruleRef` | string | seeded | AVAILABLE | — | Rule being simulated |
| `scope` | enum | seeded | AVAILABLE | — | tenant/role/asset_group |
| `blastRadius` | number (0–100) | seeded | AVAILABLE | — | Validated range |
| `conflicts` | SimulationConflict[] | seeded | AVAILABLE | — | Detected conflicts |
| `status` | enum | seeded | AVAILABLE | — | completed/failed |
| `approvedForLive` | boolean | seeded | AVAILABLE | — | Promotion approval |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

### 62. Inverse Discovery Event

**Source:** Spec #40 Inverse Discovery Loop  
**Coverage:** Full (Spec #40 requirements read)  
**Contract:** `packages/contracts/src/entities/inverse-discovery-event.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-inverse-discovery.ts` ✅ (5 records)  
**Status:** AVAILABLE (fixture exists)  
**Domain:** D-10 (Coverage / Tool Health)  
**Use Cases:** Spec 40, UC-181, UC-182, UC-183, UC-184, UC-185

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'inverse-discovery-event'` | seeded | AVAILABLE | — | Discriminator |
| `eventId` | string | seeded | AVAILABLE | — | Unique event id |
| `lookupEntityType` | enum | seeded | AVAILABLE | — | asset/identity/component |
| `lookupKey` | string | seeded | AVAILABLE | — | Lookup identifier |
| `lookupResult` | enum | seeded | AVAILABLE | — | resolved/unresolved/partial |
| `secondaryAttempted` | boolean | seeded | AVAILABLE | — | Whether secondary resolution tried |
| `rootCause` | enum/null | seeded | AVAILABLE | — | discovery_gap/staleness/shadow_it/naming_mismatch/decommissioned |
| `onboardingTriggered` | boolean | seeded | AVAILABLE | — | Whether onboarding fired |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

### 63. Attack Classification Audit

**Source:** Spec #39 Pre-Warned/Protected/Novel Classification  
**Coverage:** Full (Spec #39 requirements read)  
**Contract:** `packages/contracts/src/entities/attack-classification-audit.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-attack-classification-audits.ts` ✅ (4 records)  
**Status:** AVAILABLE (fixture exists)  
**Domain:** D-13 (Pre-Warned Classification)  
**Use Cases:** Spec 39, UC-186, UC-187, UC-188, UC-189, UC-190

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'attack-classification-audit'` | seeded | AVAILABLE | — | Discriminator |
| `auditId` | string | seeded | AVAILABLE | — | Unique audit id |
| `classification` | enum | seeded | AVAILABLE | — | PRE_WARNED/PROTECTED/NOVEL |
| `postureSnapshot` | PostureSnapshot | seeded | AVAILABLE | — | Point-in-time snapshot |
| `priorityImpact` | number (-100 to +100) | seeded | AVAILABLE | — | Priority adjustment |
| `inversePaused` | boolean | seeded | AVAILABLE | — | Paused due to inverse failure |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

### 64. Verdict Pattern Case

**Source:** Spec #41 Internal Risk Investigation Sub-Lifecycle  
**Coverage:** Full (Spec #41 requirements read)  
**Contract:** `packages/contracts/src/entities/verdict-pattern-case.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-verdict-patterns.ts` ✅ (4 records)  
**Status:** AVAILABLE (fixture exists)  
**Domain:** D-07 (Identity Intelligence)  
**Use Cases:** Spec 41, UC-192, UC-193, UC-194, UC-195, UC-196, UC-197, UC-198, UC-199

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'verdict-pattern-case'` | seeded | AVAILABLE | — | Discriminator |
| `patternId` | string | seeded | AVAILABLE | — | Unique pattern id |
| `patternType` | enum | seeded | AVAILABLE | — | access_anomaly/privilege_misuse/data_exfiltration/policy_violation/behavioural_deviation |
| `phase` | enum | seeded | AVAILABLE | — | surface/triage/routing/customer_investigation/outcome/closure |
| `evidenceGrade` | enum | seeded | AVAILABLE | — | intelligence/investigation (boundary enforcement) |
| `outcomeCategory` | enum/null | seeded | AVAILABLE | — | no_issue/issue_addressed/ongoing_concern/privileged_outcome |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

### 65. Governed Compose

**Source:** Spec #25 Case Communication, Spec #26 Broadcast Channel  
**Coverage:** Full  
**Contract:** `packages/contracts/src/entities/governed-compose.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-governed-compose.ts` ✅  
**Status:** AVAILABLE (fixture exists)  
**Domain:** D-31 (Communication & Broadcast)  
**Use Cases:** Spec 25 Req 3/5, UC-202

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'governed-compose'` | seeded | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope |
| `caseRef` | string | seeded | AVAILABLE | — | Bound case reference |
| `draftSubject` | string | seeded | AVAILABLE | — | Outbound draft subject line |
| `draftBody` | string | seeded | AVAILABLE | — | Draft body content |
| `recipients` | string[] | seeded | AVAILABLE | — | Recipient addresses |
| `channel` | enum | seeded | AVAILABLE | — | email/teams |
| `approvalStatus` | enum | seeded | AVAILABLE | — | pending/approved/rejected/expired |
| `approverRef` | string | seeded | AVAILABLE | — | Approver user reference |
| `approvedAt` | string/null | seeded | AVAILABLE | — | Approval timestamp |
| `expiresAt` | string | seeded | AVAILABLE | — | Approval expiry |
| `playbookRef` | string/null | seeded | AVAILABLE | — | Communication playbook reference |
| `source` | SourceMetadata | seeded | AVAILABLE | — | CommonFields |
| `createdAt` | string | seeded | AVAILABLE | — | CommonFields |
| `updatedAt` | string | seeded | AVAILABLE | — | CommonFields |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

### 66. Notification

**Source:** Spec #26 Case Communication and Broadcast Channel  
**Coverage:** Full  
**Contract:** `packages/contracts/src/entities/notification.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-notifications.ts` ✅  
**Status:** AVAILABLE (fixture exists)  
**Domain:** D-31 (Communication & Broadcast)  
**Use Cases:** Spec 26, UC-203

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'notification'` | seeded | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope |
| `recipientUserId` | string | seeded | AVAILABLE | — | Target user |
| `notificationType` | enum | seeded | AVAILABLE | — | sla_warning/case_update/escalation/assignment/approval_required/system_alert |
| `severity` | enum | seeded | AVAILABLE | — | critical/warning/info |
| `title` | string | seeded | AVAILABLE | — | Notification title |
| `message` | string | seeded | AVAILABLE | — | Notification body |
| `entityRef` | string | seeded | AVAILABLE | — | Related entity ID |
| `entityType` | string | seeded | AVAILABLE | — | Related entity type (case/war-room/etc) |
| `read` | boolean | seeded | AVAILABLE | — | Read state |
| `readAt` | string/null | seeded | AVAILABLE | — | When read |
| `actionUrl` | string/null | seeded | AVAILABLE | — | Deep link URL |
| `source` | SourceMetadata | seeded | AVAILABLE | — | CommonFields |
| `createdAt` | string | seeded | AVAILABLE | — | CommonFields |
| `updatedAt` | string | seeded | AVAILABLE | — | CommonFields |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

### 67. Case Follow

**Source:** — (Analyst convenience feature)  
**Coverage:** Full  
**Contract:** `packages/contracts/src/entities/case-follow.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-case-follows.ts` ✅  
**Status:** AVAILABLE (fixture exists)  
**Domain:** D-18 (Case Lifecycle)  
**Use Cases:** UC-204

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'case-follow'` | seeded | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope |
| `userId` | string | seeded | AVAILABLE | — | Subscribing user |
| `caseRef` | string | seeded | AVAILABLE | — | Followed case |
| `followedAt` | string | seeded | AVAILABLE | — | Subscription start |
| `unfollowedAt` | string/null | seeded | AVAILABLE | — | Subscription end |
| `notifyOn` | string[] | seeded | AVAILABLE | — | Event types: status_change/sla_breach/escalation/new_evidence |
| `source` | SourceMetadata | seeded | AVAILABLE | — | CommonFields |
| `createdAt` | string | seeded | AVAILABLE | — | CommonFields |
| `updatedAt` | string | seeded | AVAILABLE | — | CommonFields |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

### 68. Cloud Security Posture

**Source:** Spec #22 Architecture Intelligence  
**Coverage:** Full  
**Contract:** `packages/contracts/src/entities/cloud-security-posture.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-cloud-security-posture.ts` ✅  
**Status:** AVAILABLE (fixture exists)  
**Domain:** D-09 (Architecture Intelligence)  
**Use Cases:** Spec 22, UC-205

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'cloud-security-posture'` | seeded | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope |
| `cloudProvider` | enum | seeded | AVAILABLE | — | aws/azure/gcp |
| `accountId` | string | seeded | AVAILABLE | — | Cloud account identifier |
| `region` | string | seeded | AVAILABLE | — | Cloud region |
| `complianceScore` | number (0-100) | seeded | AVAILABLE | — | Overall compliance percentage |
| `driftCount` | number | seeded | AVAILABLE | — | Active drift findings |
| `criticalFindings` | number | seeded | AVAILABLE | — | Critical-severity findings |
| `lastScanAt` | string | seeded | AVAILABLE | — | Last posture scan |
| `frameworks` | string[] | seeded | AVAILABLE | — | Applicable frameworks (CIS, SOC2, etc) |
| `driftDetails` | DriftDetail[] | seeded | AVAILABLE | — | Specific drift items |
| `source` | SourceMetadata | seeded | AVAILABLE | — | CommonFields |
| `createdAt` | string | seeded | AVAILABLE | — | CommonFields |
| `updatedAt` | string | seeded | AVAILABLE | — | CommonFields |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

### 69. Case Transition Audit

**Source:** Spec #06 Domain Requirements Req 6  
**Coverage:** Full  
**Contract:** `packages/contracts/src/entities/case-transition-audit.ts`  
**DB Schema:** ❌ NOT FOUND  
**Fixture:** `packages/contracts/src/fixtures/seed-case-transition-audits.ts` ✅  
**Status:** AVAILABLE (fixture exists)  
**Domain:** D-40 (Audit & Evidence)  
**Use Cases:** Spec 06 Req 6, UC-206

| Field | Type | Source Classification | Availability | Blocker (if FUTURE) | Notes |
|-------|------|----------------------|--------------|---------------------|-------|
| `id` | string | seeded | AVAILABLE | — | CommonFields |
| `entityType` | `'case-transition-audit'` | seeded | AVAILABLE | — | Discriminator |
| `tenant` | TenantContext | seeded | AVAILABLE | — | Tenant scope |
| `caseRef` | string | seeded | AVAILABLE | — | Case being transitioned |
| `fromState` | CaseStatus | seeded | AVAILABLE | — | Source lifecycle state |
| `toState` | CaseStatus | seeded | AVAILABLE | — | Target lifecycle state |
| `actor` | AuditActor | seeded | AVAILABLE | — | Who/what triggered transition |
| `reason` | string | seeded | AVAILABLE | — | Machine-readable rationale |
| `triggeredBy` | enum | seeded | AVAILABLE | — | engine/rule/strategy/escalation |
| `gatesPassed` | string[] | seeded | AVAILABLE | — | Gates verified before transition |
| `transitionedAt` | string | seeded | AVAILABLE | — | Transition timestamp |
| `immutable` | true | seeded | AVAILABLE | — | Immutable audit record |
| `source` | SourceMetadata | seeded | AVAILABLE | — | CommonFields |
| `createdAt` | string | seeded | AVAILABLE | — | CommonFields |
| `updatedAt` | string | seeded | AVAILABLE | — | CommonFields |

**DB Schema Reconciliation:** ⚠️ **DIVERGENT — Contract + fixture exist, DB schema ABSENT.**

---

### 70. Architecture Component

**Source:** Master Technical Specification §Architecture Management, Spec #57 Security Command and Control Doctrine  
**Contract:** `packages/contracts/src/entities/architecture-component.ts`  
**Interface:** `ArchitectureComponent`  
**Key Fields:** name, componentType, environment, owner, status, baselineVersion, currentVersion, driftState, lastScannedAt, dependencies, criticality, tags  
**Status:** AVAILABLE

---

### 71. Architecture Intelligence Engine

**Source:** Spec #59 Intelligence Layer Architecture §Posture Stream, Master Technical Specification §Architecture Intelligence  
**Contract:** `packages/contracts/src/entities/architecture-intelligence-engine.ts`  
**Interface:** `ArchitectureIntelligence`  
**Key Fields:** engineId, componentRef, analysisType, severity, confidence, detectedAt, description, affectedComponents, recommendedAction, resolvedAt, status  
**Status:** AVAILABLE

---

### 72. CISO Summary

**Source:** Master Technical Specification §Executive Surface, Spec #57 Security Command and Control Doctrine  
**Contract:** `packages/contracts/src/entities/ciso-summary.ts`  
**Interface:** `CisoSummary`  
**Key Fields:** generatedAt, posture (PostureScore), riskSummary (RiskSummary), exposureSummary (ExposureSummary), debtSummary (DebtSummary), controlSummary (ControlSummary), caseSummary (CaseSummary), strategicBlockers, trend  
**Status:** AVAILABLE

---

### 73. Direction Board

**Source:** Spec #58 Security OODA Loop §Decide Phase, Master Technical Specification §Direction Boards  
**Contract:** `packages/contracts/src/entities/direction-board.ts`  
**Interface:** `DirectionBoard`  
**Key Fields:** boardId, title, category, status, priority, owner, dueDate, description, impactAssessment, linkedCaseRefs, linkedRiskObjectRefs, resolution  
**Status:** AVAILABLE

---

### 74. Drift Detection Engine

**Source:** Spec #58 Security OODA Loop, Master Technical Specification §Drift Detection  
**Contract:** `packages/contracts/src/entities/drift-detection-engine.ts`  
**Interface:** `DriftDetection`  
**Key Fields:** engineId, name, driftType, sourceConnectorRef, baselineRef, currentState, driftSeverity, detectedAt, resolvedAt, status, affectedEntityType, affectedEntityRef, remediationSuggestion  
**Status:** AVAILABLE

---

### 75. Email Case Communication

**Source:** Master Technical Specification §Case Communication, Spec #57 Security Command and Control Doctrine  
**Contract:** `packages/contracts/src/entities/email-case-communication.ts`  
**Interface:** `EmailCaseCommunication`  
**Key Fields:** communicationId, caseRef, direction, senderAddress, recipientAddresses, subject, bodyPreview, receivedAt, processedAt, bindingConfidence, status, threadId, attachmentCount  
**Status:** AVAILABLE

---

### 76. Exposure Engine

**Source:** Spec #60 Internal and External Attack Surface Framework, Master Technical Specification §Exposure Management  
**Contract:** `packages/contracts/src/entities/exposure-engine.ts`  
**Interface:** `ExposureComputation`  
**Key Fields:** engineId, surfaceType, exposureVector, assetRefs, identityRefs, blastZoneId, exposureScore, attackPathCount, coverageGapCount, computedAt, trend, mitigationRefs  
**Status:** AVAILABLE

---

### 77. Identity Intelligence Engine

**Source:** Spec #59 Intelligence Layer Architecture §Internal Behavioural Stream, Master Technical Specification §Identity Intelligence  
**Contract:** `packages/contracts/src/entities/identity-intelligence-engine.ts`  
**Interface:** `IdentityIntelligence`  
**Key Fields:** engineId, identityRef, signalType, riskScore, confidence, detectedAt, context, baselineBehaviour, observedBehaviour, recommendedAction  
**Status:** AVAILABLE

---

### 78. Platform Management

**Source:** Spec #10 Detection Model Library, Spec #51 Rule Model and Decision Governance Surface, Master Technical Specification §Engine Layer  
**Contract:** `packages/contracts/src/entities/platform-management.ts`  
**Interfaces:** `RuleDefinition`, `ModelDefinition`, `AutomationRule`, `FeatureRegistryEntry`  
**Key Fields (RuleDefinition):** name, ruleType, status, version, domain, severity, origin, lastTriggeredAt, triggerCount, description  
**Key Fields (ModelDefinition):** name, modelType, status, version, domain, accuracy, falsePositiveRate, lastEvaluatedAt  
**Key Fields (AutomationRule):** name, trigger, status, action, executionCount, lastExecutedAt, requiresApproval  
**Key Fields (FeatureRegistryEntry):** featureKey, displayName, state, module, controlScope  
**Status:** AVAILABLE

---

### 79. Push Governance

**Source:** Master Technical Specification §Push Governance, Build Pack Discipline §Push governance dry-run  
**Contract:** `packages/contracts/src/entities/push-governance.ts`  
**Interface:** `PushGovernanceRun`  
**Key Fields:** runId, ruleRef, targetScope, simulatedAt, impactedEntities, wouldBlock, wouldAllow, wouldEscalate, conflicts, status, approvedForLive  
**Status:** AVAILABLE

---

### 80. Security Tool Intelligence

**Source:** Spec #61 Universal Security Signal Connector Contract, Master Technical Specification §Tool Effectiveness  
**Contract:** `packages/contracts/src/entities/security-tool-intelligence.ts`  
**Interface:** `SecurityToolIntelligence`  
**Key Fields:** engineId, connectorRef, toolCategory, effectivenessScore, coverageContribution, detectionCapabilities, knownBlindSpots, lastAssessedAt, trend, recommendedActions  
**Status:** AVAILABLE

---

### 81. Support Operation

**Source:** Master Technical Specification §Commercial Control Plane  
**Contract:** `packages/contracts/src/entities/support-operation.ts`  
**Interface:** `SupportOperation`  
**Key Fields:** customerId, tenantId, title, description, category, priority, status, assignedTo, openedAt, resolvedAt, resolutionNotes  
**Status:** AVAILABLE

---

### 82. Tenant Config

**Source:** Master Technical Specification §Commercial Control Plane  
**Contract:** `packages/contracts/src/entities/tenant-config.ts`  
**Interface:** `TenantConfig`  
**Key Fields:** tenantDisplayName, customerId, status, deploymentRegion, maxUsers, currentUsers, maxAssets, currentAssets, featuresEnabled, provisionedAt, lastActivityAt  
**Status:** AVAILABLE

---

### 83. Topology

**Source:** Master Technical Specification §Fusion Map, Spec #60 Internal and External Attack Surface Framework  
**Contract:** `packages/contracts/src/entities/topology.ts`  
**Interfaces:** `TopologySnapshot`, `TopologyNode`, `TopologyEdge`, `BlastRadiusResult`  
**Key Fields (TopologySnapshot):** nodes, edges, blastRadiusResults, computedAt  
**Key Fields (TopologyNode):** nodeId, entityType, entityRef, label, domain, criticality  
**Key Fields (TopologyEdge):** edgeId, sourceNodeId, targetNodeId, relationshipType, weight, bidirectional  
**Status:** AVAILABLE

---

### 84. Vulnerability Engine

**Source:** Spec #60 Internal and External Attack Surface Framework, Master Technical Specification §Vulnerability Management  
**Contract:** `packages/contracts/src/entities/vulnerability-engine.ts`  
**Interface:** `VulnerabilityCorrelation`  
**Key Fields:** engineId, cveRef, assetRef, exploitabilityScore, estateExposure, remediationPriority, patchAvailable, compensatingControlRef, assessedAt, status, contextFactors  
**Status:** AVAILABLE

---
