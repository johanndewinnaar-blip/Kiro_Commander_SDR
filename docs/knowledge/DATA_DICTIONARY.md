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
| `surfaceType` | StrategySurfaceType | seeded | AVAILABLE | — | 13 types: sla, threshold, automation-boundary, routing, posture, mission-objective, operational-tempo, domain-specific, prioritisation-weight, validation-window, closure-gate, reopening-trigger, evidence-sufficiency |
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

**DB Schema Reconciliation:** ✅ Contract and schema aligned. DB schema flattens `tenant` to `tenantId` reference, `source` to individual columns, `approval` to JSONB, `proposedAt`/`effectiveFrom`/`effectiveUntil` to timestamptz.

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

**Doctrine:** Cases are system-owned. No manual creation, manual closure, or manual status edit. Actor MUST be 'system' or 'routing-engine'.

**Resolvers:**
- `case-closure-evaluator.ts` — closure gate evaluation
- `case-reopening-evaluator.ts` — reopening trigger evaluation
- `case-validation-evaluator.ts` — validation window evaluation
- `closure-gate-enforcer.ts` — closure gate enforcement
- `reopening-trigger-enforcer.ts` — reopening trigger enforcement
- `validation-window-enforcer.ts` — validation window enforcement

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

**Authority citation (updated 2026-05-31):** `SourceMetadata` interface doc comment now cites both `v1.3 Req 12` and `Spec #05 §11.3` (previously only `v1.3 Req 12`).

**Stale test reference (flagged 2026-05-31):** Two test files still reference `rawPayloadRef` in source objects — these are stale after the contract removal:
- `tests/06-case-management/phase-d2-validation-window.test.ts` (line ~163)
- `tests/06-case-management/phase-d3-closure-reopening.test.ts` (lines ~181, ~377)

These are code-conformance debt items (contract field removed, test fixtures not updated). Route to `docs/00_authority/debt-register.md` per core-testing-commands.md pipeline.

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

---

## Data Layer As-Built Snapshot

**Purpose:** Complete surfacing of the data layer built to date. Existing work is explicitly accounted for, not silently assumed complete.

### Entities Catalogued: 11

1. Asset ✅
2. Case ✅
3. Identity ✅
4. Risk Object ✅ (incl. COIM-A source-classification + timeline augmentation)
5. Connector ✅
6. Strategy Policy ✅
7. Audit Event ✅
8. Case Lifecycle (state machine) ✅
9. Case Strategy Binding ✅
10. Common Fields ✅
11. Evidence ✅ (COIM-B — evidence entity)

**Composed-object modules (catalogued under their consuming entity, no own table):**
- `coim.ts` — COIM-A source-classification composed objects (FindingClass, SourceSeverity, SourceConfidence, SourceProduct, AttackMapping, ObservableRef, SourceClassification + `validateSourceClassification`). Catalogued under Risk Object (§4). Satisfies the completeness gate for `packages/contracts/src/entities/coim.ts`.

### Fixtures Found: 10

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

### Resolvers Found: 12

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

### Contract vs DB Schema Reconciliation

**Aligned (11):**
- Asset ✅
- Case ✅
- Identity ✅
- Risk Object ✅
- Connector ✅
- Strategy Policy ✅
- Audit Event ✅
- Common Fields ✅
- Case Lifecycle (transitions in audit events) ✅
- Case Strategy Binding ✅
- Evidence ✅

**Divergences (0):**
None.

**Proposed Architectural Debt Entries:**
None.

**Resolved Architectural Debt:**
- ARCH-DEBT-030: Risk Object DB schema missing (contract + fixture exist) — ✅ RESOLVED (Unit 1)
- ARCH-DEBT-031: Strategy Policy DB schema missing (contract + fixture exist) — ✅ RESOLVED (Unit 2)
- ARCH-DEBT-032: Case Strategy Binding incomplete (contract exists, db schema + fixture missing) — ✅ RESOLVED (Unit 3)

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

### Observable (NEW ENTITY — FUTURE — blocker: COIM-D)

| Planned Field | Type | Source Classification | Availability | Blocker | Notes |
|-------|------|----------------------|--------------|---------|-------|
| `observableType` | enum | integration-derived | FUTURE | COIM-D | ip/domain/hash/url/email/certificate/process/file |
| `value` | string | integration-derived | FUTURE | COIM-D | indicator value |
| `firstSeen` / `lastSeen` | timestamptz | integration-derived | FUTURE | COIM-D | optional |
| `reputation` | int | system-calculated | FUTURE | COIM-D | enrichment-derived |

### Analytic (NEW ENTITY — FUTURE — blocker: COIM-E)

| Planned Field | Type | Source Classification | Availability | Blocker | Notes |
|-------|------|----------------------|--------------|---------|-------|
| `analyticId` | string | integration-derived | FUTURE | COIM-E | reference key |
| `analyticName` | string | integration-derived | FUTURE | COIM-E | — |
| `analyticType` | enum | integration-derived | FUTURE | COIM-E | detection_rule/analytic_rule/sigma_rule/yara_rule/ml_model/ueba_model/vendor_model/security_control_analytic |
| `version` / `state` | string | integration-derived | FUTURE | COIM-E | — |
| `falsePositiveRate` | int (0-100) | system-calculated | FUTURE | COIM-E | tracked by Commander |
| `attacks[]` | JSONB | system-calculated | FUTURE | COIM-E | analytic-to-ATT&CK binding |

### Asset / Identity — COIM augmentation (FUTURE — blocker: COIM-F)

| Entity | Planned Fields | Availability | Blocker |
|--------|----------------|--------------|---------|
| Asset | lifecycleState, platform (structured), networkPosition, dataClassification, lastConfirmedAt, firstDiscoveredBy; optional sourceClassification | FUTURE | COIM-F |
| Identity | privilegeLevel, authenticationStrength, lastAuthenticatedAt, entitlementSummary, riskFactors[]; optional sourceClassification | FUTURE | COIM-F |

### Case — COIM aggregation (FUTURE — blocker: COIM-G)

| Planned Field | Type | Source Classification | Availability | Blocker | Notes |
|-------|------|----------------------|--------------|---------|-------|
| `attacks[]` (aggregated) | JSONB | system-calculated | FUTURE | COIM-G | aggregated from bound Risk Objects |
| `affectedEntityCount` | int | system-calculated | FUTURE | COIM-G | computed |
| `blastRadiusScore` | int | system-calculated | FUTURE | COIM-G | computed |
| `dwellTimeHours` | number | system-calculated | FUTURE | COIM-G | firstDetectedAt → case creation (ARCH-DEBT-045) |
| `confidenceAggregate` | int | system-calculated | FUTURE | COIM-G | computed |
| `findingClassBreakdown` | JSONB | system-calculated | FUTURE | COIM-G | computed |

### Action / Sub-Action (NEW ENTITY + D3FEND — FUTURE — blocker: COIM-H)

| Planned Field | Type | Source Classification | Availability | Blocker | Notes |
|-------|------|----------------------|--------------|---------|-------|
| `targetEntity` | string | system-calculated | FUTURE | COIM-H | — |
| `executionMethod` | string | system-calculated | FUTURE | COIM-H | — |
| `outcomeClassification` | enum | system-calculated | FUTURE | COIM-H | — |
| `estimatedEffortHours` / `actualEffortHours` | number | system-calculated | FUTURE | COIM-H | effort tracking |
| `approvalRef` | string | system-calculated | FUTURE | COIM-H | — |
| `tacticType` (D3FEND) | enum | integration-derived | FUTURE | COIM-H | isolate/evict/restore/harden/detect (ARCH-DEBT-046) |
| `countermeasures[]` (D3FEND) | JSONB | integration-derived | FUTURE | COIM-H | bounded ≤10 (ARCH-DEBT-046) |

---

## Maintenance Rules

1. **This artifact is mechanically derived.** Do NOT manually edit entity entries. Use the data-dictionary-generation.kiro.hook to update.
2. **Availability is file-existence based.** Fixture exists → AVAILABLE. Integration-derived → FUTURE. System-calculated → check resolver exists.
3. **Source citations from baseline only.** Never cite the translation layer (per SOURCING_RULE.md).
4. **Coverage read-state from COVERAGE.md.** Mark entries "provisional" when source spec is partially read.
5. **Completion gate enforced.** An entity in `packages/contracts/src/entities` or `packages/db/src/schema` with no corresponding DATA_DICTIONARY.md entry = INCOMPLETE (conformance assertion in `.kiro/testing/conformance-registry.md`).

---

**Last Updated:** 2026-06-01 (COIM-B executed: Evidence Entity — contract + schema + fixtures (5 seed artifacts) + validateEvidence() structural validator. Evidence entity now AVAILABLE as entry #11. ARCH-DEBT-040 RESOLVED. Remaining COIM planned entities/fields stay FUTURE pending COIM-C…H.)  
**Snapshot Commit:** (to be recorded after commit)
