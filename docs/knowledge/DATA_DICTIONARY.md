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
| `status` | CaseStatus | workflow-derived | AVAILABLE | — | Lifecycle state (open, in-progress, awaiting-validation, awaiting-closure, closed, reopened) — system-owned transitions only |
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

**Source:** Spec #29 Universal Risk Object and Case Binding  
**Coverage:** Partial (Spec #29 base spec read)  
**Contract:** `packages/contracts/src/entities/risk-object.ts`  
**DB Schema:** `packages/db/src/schema/risk-objects.ts` ✅  
**Fixture:** `packages/contracts/src/fixtures/seed-risk-objects.ts` ✅  
**Status:** AVAILABLE (fixture exists, db schema created)

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
| `createdAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record creation timestamp |
| `updatedAt` | string (ISO 8601) | system-calculated | AVAILABLE | — | Record update timestamp |

**DB Schema Reconciliation:** ✅ Contract and schema aligned. DB schema flattens `tenant` to `tenantId` reference and `source` to individual columns (standard pattern).

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
| `simulationRef` | string \| null | workflow-derived | FUTURE | Missing resolver: strategy-simulator.ts | Simulation result reference |
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

**Allowed Transitions:**
- `open → in-progress`
- `in-progress → awaiting-validation`
- `awaiting-validation → awaiting-closure`
- `awaiting-closure → closed`
- `closed → reopened`
- `reopened → in-progress`

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
| `CaseStatus` | open, in_progress, awaiting_validation, awaiting_closure, closed, reopened | Spec #08 |
| `Priority` | P0, P1, P2, P3, P4 | Spec #08 |

---

## Data Layer As-Built Snapshot

**Purpose:** Complete surfacing of the data layer built to date. Existing work is explicitly accounted for, not silently assumed complete.

### Entities Catalogued: 10

1. Asset ✅
2. Case ✅
3. Identity ✅
4. Risk Object ✅
5. Connector ✅
6. Strategy Policy ✅
7. Audit Event ✅
8. Case Lifecycle (state machine) ✅
9. Case Strategy Binding ✅
10. Common Fields ✅

### Fixtures Found: 9

1. `seed-assets.ts` ✅
2. `seed-cases.ts` ✅
3. `seed-identities.ts` ✅
4. `seed-risk-objects.ts` ✅
5. `seed-connectors.ts` ✅
6. `seed-strategies.ts` ✅
7. `seed-events.ts` ✅
8. `seed-tenant.ts` ✅
9. `seed-case-strategy-bindings.ts` ✅

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

**Aligned (10):**
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

**Divergences (0):**
None.

**Proposed Architectural Debt Entries:**
None.

**Resolved Architectural Debt:**
- ARCH-DEBT-030: Risk Object DB schema missing (contract + fixture exist) — ✅ RESOLVED (Unit 1)
- ARCH-DEBT-031: Strategy Policy DB schema missing (contract + fixture exist) — ✅ RESOLVED (Unit 2)
- ARCH-DEBT-032: Case Strategy Binding incomplete (contract exists, db schema + fixture missing) — ✅ RESOLVED (Unit 3)

---

## Maintenance Rules

1. **This artifact is mechanically derived.** Do NOT manually edit entity entries. Use the data-dictionary-generation.kiro.hook to update.
2. **Availability is file-existence based.** Fixture exists → AVAILABLE. Integration-derived → FUTURE. System-calculated → check resolver exists.
3. **Source citations from baseline only.** Never cite the translation layer (per SOURCING_RULE.md).
4. **Coverage read-state from COVERAGE.md.** Mark entries "provisional" when source spec is partially read.
5. **Completion gate enforced.** An entity in `packages/contracts/src/entities` or `packages/db/src/schema` with no corresponding DATA_DICTIONARY.md entry = INCOMPLETE (conformance assertion in `.kiro/testing/conformance-registry.md`).

---

**Last Updated:** 2026-05-31 (Case Strategy Binding DB schema + fixture created — ARCH-DEBT-032 resolved)  
**Snapshot Commit:** (to be recorded after commit)
