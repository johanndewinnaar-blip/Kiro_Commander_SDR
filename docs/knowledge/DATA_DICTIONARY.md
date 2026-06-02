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

---

## Data Layer As-Built Snapshot

**Purpose:** Complete surfacing of the data layer built to date. Existing work is explicitly accounted for, not silently assumed complete.

### Entities Catalogued: 35 (+15 intelligence entities, +2 value objects)

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

**Composed-object modules (catalogued under their consuming entity, no own table):**
- `coim.ts` — COIM-A source-classification composed objects (FindingClass, SourceSeverity, SourceConfidence, SourceProduct, AttackMapping, ObservableRef, SourceClassification + `validateSourceClassification`). Catalogued under Risk Object (§4). Also consumed by Verdict entity (§12) for `SourceProduct` type. Satisfies the completeness gate for `packages/contracts/src/entities/coim.ts`.
- `intelligence-common.ts` — Platform Intelligence shared type constants and value objects. Defines 16 array-form type constants (PlatformIntelligenceSourceType, PlatformRecordType, IocCategory [26 values], IocRelationshipState, TlpMarking, CveState, SourceFreshnessState, TenantSubscriptionState, EvaluationType, TenantExposureState, IocMatchType, IocCaseLinkType, ThreatHuntStatus, PushActionType, PushIntentStatus, AllowBlockListType) and 2 shared value objects (SourceAttributionEntry, RelationshipStateTransition). Consumed by: indicator-of-compromise.ts, ioc-case-link.ts, ioc-relationship.ts, platform-intelligence-record.ts, platform-intelligence-source.ts, push-action-intent.ts, tenant-intelligence-evaluation.ts, tenant-intelligence-subscription.ts, tenant-ioc-allowblock-entry.ts, tenant-ioc-match.ts, threat-hunt-record.ts, vulnerability-intelligence-record.ts. Referenced by fixtures: seed-iocs.ts, seed-platform-intelligence-sources.ts. Reuses existing COIM SourceSeverity (1–5) and SourceConfidence from coim.ts. Source: Spec #59 Intelligence Layer Architecture; Spec #61 Universal Security Signal Connector Contract (baseline v2.6.2). Coverage: provisional (source specs partially read per COVERAGE.md). No DB schema counterpart (type constants only — no own table). No fixture of its own (consumed by entity-level fixtures). No resolver. Satisfies the completeness gate for `packages/contracts/src/entities/intelligence-common.ts`.

### Fixtures Found: 26

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

### Resolvers Found: 13

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

### Contract vs DB Schema Reconciliation

**Aligned (20):**
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
- Verdict ✅
- Observable ✅
- Analytic ✅
- Action / Sub-Action ✅
- ControlFramework ✅ (CFM)
- FrameworkControl ✅ (CFM)
- ControlRequirement ✅ (CFM)
- ControlEvaluation ✅ (CFM)
- ControlMapping ✅ (CFM)

**Divergences (0):**
None.

**Proposed Architectural Debt Entries:**
None.

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

## Maintenance Rules

1. **This artifact is mechanically derived.** Do NOT manually edit entity entries. Use the data-dictionary-generation.kiro.hook to update.
2. **Availability is file-existence based.** Fixture exists → AVAILABLE. Integration-derived → FUTURE. System-calculated → check resolver exists.
3. **Source citations from baseline only.** Never cite the translation layer (per SOURCING_RULE.md).
4. **Coverage read-state from COVERAGE.md.** Mark entries "provisional" when source spec is partially read.
5. **Completion gate enforced.** An entity in `packages/contracts/src/entities` or `packages/db/src/schema` with no corresponding DATA_DICTIONARY.md entry = INCOMPLETE (conformance assertion in `.kiro/testing/conformance-registry.md`).

---

**Last Updated:** 2026-06-03 (Platform Intelligence Closure Conveyor: 16 intelligence entities + 2 shared value objects registered. Entity count 20→35. Fixture count 15→26. Composed-object module count unchanged at 2. Intelligence domain fully catalogued — evaluation engine + priority signal engine added to packages/rules/.)  
**Snapshot Commit:** (to be recorded after commit)
