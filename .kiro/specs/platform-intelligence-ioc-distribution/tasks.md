# Implementation Plan: Platform Intelligence and IOC Distribution

## Overview

This plan converts the Phase 1 data-layer design into incremental, test-driven coding tasks for TypeScript (the language fixed by the design: TS contract entities, `validateX` validators, array-form type constants, `seedId()` fixtures, Drizzle schema, and **fast-check** property tests).

Scope is strictly **Phase 1 data-layer-only**, per requirements and design:

- Canonical contract entities under `packages/contracts/src/entities/`.
- Shared enums / value objects under `packages/contracts/src/entities/intelligence-common.ts`.
- Pure logic (normalise / dedup / aggregate / freshness / sync / allow-block / relationship transition / builders / mappers) under `packages/rules/` and `packages/contracts/src/resolvers/`.
- Postgres-portable Drizzle schema under `packages/db/src/schema/` (tenant-leading keys, partition-ready, no cross-workload FKs).
- Deterministic seed/mock fixtures under `packages/contracts/src/fixtures/`.
- `DATA_DICTIONARY.md` entries + governance registration.
- Tests under `tests/platform-intelligence-ioc-distribution/`: unit + fixture-conformance + property-based (P1–P23, ≥100 iterations each).

**Explicitly out of scope (Phase 2-gated):** UI pages, API endpoints, live external sync, live mailbox integration, live push to enforcement systems, live AWS resources, real vendor APIs, real customer data. No task below creates any of these (Req 21.4, 21.5, 26.1–26.6).

**Property test tagging convention** (every property test, per design Testing Strategy):
`// Feature: platform-intelligence-ioc-distribution, Property {number}: {property_text}`
Each property test runs a **minimum of 100 generated cases** with fast-check and references the design property number and the requirements clause it validates.

## Tasks

- [ ] 1. Establish shared intelligence type-constant and value-object foundation
  - [ ] 1.1 Create `intelligence-common.ts` shared constants and value objects
    - Create `packages/contracts/src/entities/intelligence-common.ts`
    - Define array-form type constants: `PLATFORM_INTELLIGENCE_SOURCE_TYPES`, `PLATFORM_RECORD_TYPES`, `IOC_CATEGORIES` (all 26), `IOC_RELATIONSHIP_STATES`, `TLP_MARKINGS`, `CVE_STATES`, `SOURCE_FRESHNESS_STATES`, `TENANT_SUBSCRIPTION_STATES`, `EVALUATION_TYPES`, `TENANT_EXPOSURE_STATES`, `IOC_MATCH_TYPES`, `IOC_CASE_LINK_TYPES`, `THREAT_HUNT_STATUSES`, `PUSH_ACTION_TYPES`, `PUSH_INTENT_STATUSES`, `ALLOW_BLOCK_LIST_TYPES`
    - Reuse existing COIM `SourceSeverity` (1–5) and `SourceConfidence` rather than redefining
    - Define shared value objects: `SourceAttributionEntry`, `RelationshipStateTransition`
    - Export from `packages/contracts/src/entities/index.ts`
    - _Requirements: 20.6, 6.2, 7.2, 22.2, 22.3_

  - [ ]* 1.2 Write unit tests for type-constant completeness
    - Assert all 26 IOC categories present, all 8 source types, all record/relationship/evaluation/hunt/intent/match/link enum values present and unique
    - _Requirements: 1.3, 3.3, 6.2, 7.2, 11.2, 14.1, 15.2_

- [ ] 2. Implement Admin_Tenant catalogue-plane entities and validators
  - [ ] 2.1 Implement Platform_Intelligence_Source and Platform_Intelligence_Record
    - Create `platform-intelligence-source.ts` (identity, connectorClass fixed to `'D'`, feed schedule fields, freshness, health, source metadata) with `validatePlatformIntelligenceSource`
    - Create `platform-intelligence-record.ts` (abstract parent: `sourceId`, `recordType`, `severity`, `confidence`, `publishedAt`, `lastModifiedAt`, `catalogueVersion`, `rawReference`) with `validatePlatformIntelligenceRecord`
    - Apply CommonFields, TenantContext (Admin_Tenant), SourceMetadata
    - _Requirements: 1.1, 1.3, 1.4, 2.1, 3.1, 3.3, 3.4, 20.1, 20.2, 20.3_

  - [ ] 2.2 Implement Vulnerability_Intelligence_Record and Vendor_Advisory
    - Create `vulnerability-intelligence-record.ts` extending the parent (`cveId`, `cvssVector`, `cvssScore`, `cveState`, `cisaKevStatus`, `kevDateAdded`, `kevDueDate`, `epssScore`, `epssPercentile`, `affectedProducts`, `references`) with validator
    - Create `vendor-advisory.ts` (`advisoryId`, `vendor`, `title`, severity, `affectedProducts`, `remediationGuidance`, `relatedCveIds[]`, `containedIocIds[]`) with validator (non-empty `advisoryId`/`vendor`, `relatedCveIds` is array)
    - _Requirements: 4.1, 4.2, 4.3, 5.1, 5.4, 18.4_

  - [ ] 2.3 Implement Indicator_Of_Compromise (first-class)
    - Create `indicator-of-compromise.ts` (`iocCategory`, `value`, `normalisedValue`, `originalRawValue`, `confidence` 0–100, `severity`, `tlpMarking`, `expiresAt?`, `sourceAttribution[]`, `firstSeenAt`, `lastSeenAt`, `active`) with `validateIndicatorOfCompromise`
    - Validator checks taxonomy membership, non-empty value, confidence range, severity model, TLP membership
    - _Requirements: 6.1, 6.3, 6.4, 22.1, 22.2, 22.3, 22.4, 22.5_

  - [ ] 2.4 Implement IOC_Relationship (stateful, typed)
    - Create `ioc-relationship.ts` (`iocId`, `relatedEntityId`, `relatedEntityType`, `relationshipState`, `confidence`, `establishedAt`, `lastUpdatedAt`, `evidenceRef`, `stateHistory[]`) with validator (state membership, non-empty ids, confidence 0–100)
    - CVE binding optional; IOC independence preserved
    - _Requirements: 7.1, 7.2, 7.4, 7.5, 18.3_

  - [ ]* 2.5 Write property test for relationship cardinality and IOC independence
    - **Property 8: Relationship cardinality and IOC independence**
    - **Validates: Requirements 4.4, 5.2, 7.4, 18.1, 18.2, 18.3**

- [ ] 3. Implement Customer_Tenant evaluation-plane entities and validators
  - [ ] 3.1 Implement Tenant_Intelligence_Subscription and Tenant_IOC_AllowBlock_Entry
    - Create `tenant-intelligence-subscription.ts` (`tenantId`, `sourceId` ref, `subscriptionState`, `applicabilityFilters[]`, `evaluationPreferences`, `subscribedAt`) with validator
    - Create `tenant-ioc-allowblock-entry.ts` (`tenantId`, `iocCategory`, `value`, `listType`, `addedBy`, `addedAt`, `reason`, `expiresAt?`) with validator
    - _Requirements: 10.1, 10.3, 10.4, 23.5_

  - [ ] 3.2 Implement Tenant_Intelligence_Evaluation and Tenant_IOC_Match
    - Create `tenant-intelligence-evaluation.ts` (`tenantId`, `platformRecordId` ref, `evaluationType`, `evaluationState`, `matchedAssets[]`, `matchedIdentities[]`, `matchedObservables[]`, `evidenceReferences[]`, `evaluatedAt`) with validator
    - Create `tenant-ioc-match.ts` (`tenantId`, `iocId` ref, `matchedObservableId` ref → Observable COIM-D, `matchType`, `matchConfidence` 0–100, `matchedAt`, `matchSource`, `evidenceReferences[]`) with validator
    - _Requirements: 11.1, 11.2, 11.4, 12.1, 12.3_

  - [ ] 3.3 Implement case-link, threat-hunt, and push-intent entities
    - Create `ioc-case-link.ts` and `vulnerability-case-link.ts` (`caseId` as application-layer reference, no cross-workload FK; `linkType`, `linkedAt`, `status`) with validators
    - Create `threat-hunt-record.ts` (`triggeringIocId`, `triggeringMatchId`, `huntType`, `huntScope`, `status` lifecycle, `assignedTo`, timestamps, `findingsRef`) with validator
    - Create `push-action-intent.ts` (`iocId`, `iocCategory`, `targetSystemType`, `actionType`, `intentStatus`, requester/approver fields, `executionReference`) with validator (mock statuses only)
    - _Requirements: 13.5, 14.1, 14.2, 15.1, 15.2, 15.5_

  - [ ] 3.4 Implement inbound email IOC submission value object
    - Create `inbound-email-submission.ts` value object (sender address, source organisation, received timestamp, attachment references, parsed IOC values[], parser confidence per IOC, raw text/body reference, submission metadata) with validator
    - Modelled only; no mailbox client
    - _Requirements: 9.3, 24.1, 24.3_

- [ ] 4. Checkpoint - entities and validators
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Validate canonical-pattern and ownership invariants across all entities
  - [ ]* 5.1 Write property test for structural validation correctness
    - **Property 1: Structural validation correctness**
    - **Validates: Requirements 1.4, 3.4, 5.4, 6.4, 7.5, 10.4, 11.4, 12.3, 15.5, 22.1, 22.2, 22.3**

  - [ ]* 5.2 Write property test for canonical fields invariant
    - **Property 16: Canonical fields invariant** (CommonFields, TenantContext, SourceMetadata present on every entity)
    - **Validates: Requirements 20.1, 20.2, 20.3**

  - [ ]* 5.3 Write property test for COIM ownership immutability
    - **Property 18: COIM ownership immutability** (source-owned fields immutable after write; Commander-owned mutable)
    - **Validates: Requirements 20.7**

  - [ ]* 5.4 Write property test for admin/tenant ownership attribution
    - **Property 14: Admin/tenant ownership attribution** (catalogue entities → Admin_Tenant; evaluation entities → Customer_Tenant)
    - **Validates: Requirements 17.1, 17.2**

- [ ] 6. Implement IOC normalisation, deduplication, and confidence aggregation logic
  - [ ] 6.1 Implement `normaliseIoc` (C1)
    - Create pure function in `packages/rules/` (e.g. `ioc-normalisation.ts`): per-category normalisation (case folding, defang reversal `hxxp`→`http`/`[.]`→`.`, URL/scheme/host handling, IP/CIDR canonicalisation, hash lowercasing, NFC + whitespace trim), always preserving `originalRawValue`; total over non-empty strings, idempotent
    - _Requirements: 6.1, 6.3, 8.1, 8.3_

  - [ ]* 6.2 Write property test for normalisation idempotence and canonicalisation
    - **Property 2: IOC normalisation idempotence and canonicalisation**
    - **Validates: Requirements 8.1**

  - [ ] 6.3 Implement `dedupAndMerge` (C2)
    - Create pure function keyed on `(normalisedValue, iocCategory)`: create-vs-merge decision; merge unions `SourceAttributionEntry` by `sourceId`; `firstSeenAt` = min, `lastSeenAt` = max; commutative and idempotent at catalogue level; preserves every `originalRawValue`
    - _Requirements: 6.5, 8.2, 8.3_

  - [ ]* 6.4 Write property test for deduplication uniqueness, attribution union, and raw preservation
    - **Property 3: IOC deduplication uniqueness, attribution union, and raw preservation**
    - **Validates: Requirements 6.3, 6.5, 8.3**

  - [ ] 6.5 Implement `aggregateConfidence` (C3)
    - Create pure bounded, deterministic combiner satisfying DEC-confidence-aggregation-properties: (1) output 0–100, (2) higher-confidence corroborating sources never reduce confidence, (3) lower-confidence weak sources cannot inflate beyond configured ceiling, (4) source freshness affects weight, (5) direct tenant observation weighs more than generic feed presence, (6) manual analyst confirmation has explicit weighting boost, (7) deterministic output for same inputs; per-source confidence/severity retained on the record
    - _Requirements: 8.4, 22.1, 22.5_

  - [ ]* 6.6 Write property test for aggregate confidence bounded, monotonic, source-preserving
    - **Property 5: Aggregate confidence is bounded, monotonic, and source-preserving**
    - **Validates: Requirements 8.4**

- [ ] 7. Implement source-independent ingestion pipeline and advisory IOC extraction
  - [ ] 7.1 Implement modelled ingestion pipeline orchestrator
    - Create pure orchestrator that runs every ingestion path (direct feed, vendor advisory, CVE-embedded, inbound email, manual, commercial, MISP/STIX/TAXII) through the same `normaliseIoc` → `dedupAndMerge` → relationship-creation flow against seed/mock data; no live external call
    - _Requirements: 9.1, 9.2_

  - [ ] 7.2 Implement vendor advisory IOC extraction
    - Pure function extracting/normalising each contained IOC into a distinct first-class IOC and creating one `IOC_Relationship` per IOC with state `linked_to_vendor_advisory`; preserves advisory→CVE one-to-many
    - _Requirements: 5.2, 5.3_

  - [ ]* 7.3 Write property test for ingestion confluence and source-independence
    - **Property 4: Ingestion confluence and source-independence**
    - **Validates: Requirements 8.2, 9.2, 24.2**

  - [ ]* 7.4 Write property test for advisory IOC extraction yields distinct linked IOCs
    - **Property 10: Vendor advisory IOC extraction yields distinct linked IOCs**
    - **Validates: Requirements 5.3**

  - [ ] 7.5 Implement inbound email parse-to-pipeline modelled path
    - Wire the inbound email submission value object into the standard pipeline (parse → normalise → dedup → relationship → evaluation), carrying parser confidence into aggregation; seed/mock only, no mailbox client
    - _Requirements: 24.2, 24.4, 9.4_

  - [ ]* 7.6 Write unit tests for ingestion path examples
    - Cover representative examples for each of the seven ingestion paths and inbound-email preservation fields
    - _Requirements: 9.1, 9.3, 24.1_

- [ ] 8. Implement feed schedule and freshness logic
  - [ ] 8.1 Implement `evaluateFreshness` (C4)
    - Pure total function of `(lastSuccessfulSync, refreshCadenceMinutes, now)` → `fresh | aging | stale | expired`; null `lastSuccessfulSync` → `expired`
    - _Requirements: 2.4_

  - [ ]* 8.2 Write property test for feed freshness mapping
    - **Property 6: Feed freshness mapping is total and monotonic**
    - **Validates: Requirements 2.4**

  - [ ] 8.3 Implement `applySyncResult` (C5)
    - Pure reducer: on success set `lastSuccessfulSync`, compute `nextScheduledSync` = syncTime + cadence, clear `failureState`; on failure record timestamp, error class, and monotonic consecutive-failure count; never performs live sync
    - _Requirements: 2.2, 2.3, 2.5_

  - [ ]* 8.4 Write property test for feed schedule state transition
    - **Property 7: Feed schedule state transition is correct**
    - **Validates: Requirements 2.2, 2.3**

- [ ] 9. Implement IOC relationship state machine
  - [ ] 9.1 Implement `transitionRelationship` (C7)
    - Pure transition appending `{ previousState, newState, changedAt, reason }` to `stateHistory`; validates target state membership in `IOC_RELATIONSHIP_STATES`
    - _Requirements: 7.3_

  - [ ]* 9.2 Write property test for relationship state-history completeness and ordering
    - **Property 9: Relationship state-history completeness and ordering**
    - **Validates: Requirements 7.3**

- [ ] 10. Checkpoint - catalogue logic
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Implement tenant evaluation, matching, and allow/block logic
  - [ ] 11.1 Implement `evaluateAllowBlock` (C6)
    - Pure decision function → `suppress` (allow, with suppression reference) / `force_malicious` (block, ignoring platform confidence) / `proceed`; block-over-allow precedence is binding per DEC-allowblock-block-wins — an allow entry must not override a matching block entry
    - _Requirements: 23.1, 23.2, 23.3, 23.4_

  - [ ]* 11.2 Write property test for allow/block evaluation
    - **Property 13: Allow/block evaluation is decisive and confidence-independent for blocks**
    - **Validates: Requirements 23.1, 23.2, 23.3, 23.4**

  - [ ] 11.3 Implement tenant evaluation and IOC match builders (C9)
    - Pure constructors producing `Tenant_Intelligence_Evaluation` (with evidence references + provenance) and `Tenant_IOC_Match` referencing existing Observable (COIM-D) by ID, preserving `tenant + observableType + value` dedup; risk produced only after a confirming exposure state
    - _Requirements: 11.1, 11.3, 11.5, 12.1, 12.2_

  - [ ]* 11.4 Write property test for exposure evidence and provenance
    - **Property 12: Exposure evaluations carry evidence and provenance**
    - **Validates: Requirements 11.3**

  - [ ]* 11.5 Write property test for IOC matching referencing existing Observables
    - **Property 19: IOC matching references existing Observables without duplication**
    - **Validates: Requirements 12.2**

  - [ ]* 11.6 Write property test for no tenant risk without a confirming evaluation
    - **Property 11: No tenant risk without a confirming evaluation** (KEV/EPSS alone never create risk)
    - **Validates: Requirements 4.2, 11.5, 18.4**

- [ ] 12. Implement outcome mappers, push capability mapping, threat hunts, and compliance enrichment
  - [ ] 12.1 Implement case/action outcome mappers (C10)
    - Pure mappers producing `IOC_Case_Link` (type `threat-intelligence-estate-match`) and `Vulnerability_Case_Link` (type `vulnerability`) records plus action recommendations and follow-ups (`validate_block`, `verify_no_business_impact`, `rescan_requery`, `monitor_for_recurrence`, `close_or_reopen_case`, `capture_evidence`) with D3FEND alignment metadata where applicable; mappers emit bindings only and never create/transition cases directly (no lifecycle bypass)
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 16.1, 16.2, 16.3, 16.4_

  - [ ]* 12.2 Write property test for case-link types within the lifecycle
    - **Property 20: IOC and vulnerability case links use correct types within the lifecycle**
    - **Validates: Requirements 13.3, 13.4**

  - [ ] 12.3 Implement push capability mapping and Push_Action_Intent constructor
    - Pure total map from `iocCategory` family → target system types (file hashes → EDR/AV/SIEM/SOAR; domains/URLs → proxy/DNS/email_security/SOAR; IPs/CIDRs → firewall/NDR/SIEM/SOAR; email senders/subjects → email_security/SIEM/SOAR; detection rules → detection_engineering/SIEM/NDR/EDR; cloud resource IDs → cloud_security_tooling); intent constructor restricted to mock/intent statuses
    - _Requirements: 15.1, 15.3, 15.4_

  - [ ]* 12.4 Write property test for push capability mapping totality
    - **Property 21: Push capability mapping is total and correct**
    - **Validates: Requirements 15.3**

  - [ ]* 12.5 Write property test for push intents never live-executed
    - **Property 22: Push intents are never live-executed in Phase 1**
    - **Validates: Requirements 15.4**

  - [ ] 12.6 Implement threat hunt record constructor and status modelling
    - Pure constructor with status lifecycle (`proposed → queued → running → completed/no_match/match_found → escalated`); `match_found`/`escalated` emit case-link/enrichment bindings consumed by the existing lifecycle (no bypass)
    - _Requirements: 14.1, 14.2, 14.3, 14.4_

  - [ ] 12.7 Implement compliance enrichment-evidence mapper
    - Pure mapper exposing CVE/KEV/IOC results as enrichment evidence for `ControlEvaluation` via the existing evidence-binding model; never produces compliance state directly
    - _Requirements: 19.1, 19.2, 19.3_

  - [ ]* 12.8 Write property test for compliance state gating
    - **Property 23: Intelligence never creates compliance state directly**
    - **Validates: Requirements 19.1, 19.3**

- [ ] 13. Checkpoint - tenant evaluation and outcome logic
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 14. Implement admin/tenant separation and cross-plane reference resolution
  - [ ] 14.1 Implement cross-plane reference resolver
    - Pure application-layer resolver for `platformRecordId` / `iocId` / `sourceId`; returns Admin-owned record without materialising a tenant-side copy; dangling reference surfaces as a resolution error (no cross-workload FK)
    - _Requirements: 17.3, 17.4_

  - [ ]* 14.2 Write property test for non-duplication and reference resolution
    - **Property 15: Non-duplication and cross-plane reference resolution**
    - **Validates: Requirements 10.2, 17.3, 17.4**

- [ ] 15. Implement Postgres-portable Drizzle schemas
  - [ ] 15.1 Implement catalogue-plane schemas
    - Create schema modules under `packages/db/src/schema/` for `platform_intelligence_source`, `platform_intelligence_record`, `vulnerability_intelligence_record`, `vendor_advisory`, `indicator_of_compromise`, `ioc_relationship`; flatten `tenant`→`tenantId` and `source`→columns; tenant-leading keys; partition-ready high-volume catalogue tables; IOC dedup unique index on `(tenant_id, ioc_category, normalised_value)`; JSONB for bounded composed objects; enum columns for all type constants; `data_classification` default `threat_intelligence`
    - _Requirements: 17.1, 6.5_

  - [ ] 15.2 Implement evaluation-plane schemas
    - Create schema modules for `tenant_intelligence_subscription`, `tenant_intelligence_evaluation`, `tenant_ioc_match`, `tenant_ioc_allowblock_entry`, `ioc_case_link`, `vulnerability_case_link`, `threat_hunt_record`, `push_action_intent`; tenant-leading keys; cross-plane and `caseId` references as plain columns (no FK across the boundary); register in `packages/db/src/schema/index.ts`
    - _Requirements: 17.2, 17.3_

  - [ ]* 15.3 Write static schema-conformance tests
    - Assert Postgres-portability, tenant-leading keys, IOC dedup unique index, absence of cross-workload foreign keys between catalogue and evaluation planes, and workload-class declaration on modelled data access (per PD-1.0)
    - _Requirements: 17.3_

- [ ] 16. Create deterministic seed/mock fixtures and conformance coverage
  - [ ] 16.1 Create catalogue-plane fixtures
    - Create `seed-platform-intelligence-sources.ts`, `seed-vulnerability-intelligence.ts`, `seed-vendor-advisories.ts`, `seed-iocs.ts`, `seed-ioc-relationships.ts` using `seedId()`; synthetic `.example` domains and `(Mock)` markers; no real secrets/credentials; cover all 26 IOC categories and all source/record/relationship enum values
    - _Requirements: 20.4, 21.6, 26.5, 6.2_

  - [ ] 16.2 Create evaluation-plane fixtures
    - Create `seed-tenant-intelligence-subscriptions.ts`, `seed-tenant-intelligence-evaluations.ts`, `seed-tenant-ioc-matches.ts`, `seed-tenant-allowblock-entries.ts`, `seed-ioc-case-links.ts`, `seed-vulnerability-case-links.ts`, `seed-threat-hunts.ts`, `seed-push-action-intents.ts` with `seedId()`; cover all evaluation/hunt/intent/match/link enum values and push mock statuses; register in `packages/contracts/src/fixtures/index.ts`
    - _Requirements: 20.4, 21.6, 26.5, 11.2, 14.1, 15.2_

  - [ ] 16.3 Create inbound email submission fixtures
    - Create `seed-inbound-email-submissions.ts` with synthetic sender/source, parsed IOC values and parser confidence; seed/mock only
    - _Requirements: 24.1, 24.4_

  - [ ]* 16.4 Write property test for deterministic seedId stability
    - **Property 17: Deterministic seedId stability**
    - **Validates: Requirements 1.2, 20.4**

  - [ ]* 16.5 Write fixture-conformance tests
    - Assert every fixture passes its `validateX` and carries CommonFields, TenantContext and SourceMetadata with deterministic IDs
    - _Requirements: 20.1, 20.2, 20.3, 20.5, 21.6_

- [ ] 17. Governance registration and data dictionary
  - [ ] 17.1 Add DATA_DICTIONARY.md entries for every new entity
    - Add `### N. <Entity>` sections for all catalogue-plane and evaluation-plane entities plus shared value objects (required for data-layer completion / ARCH-005)
    - _Requirements: 21.3_

  - [ ] 17.2 Register the foundational augmentation unit and resolve mapped debt
    - Register this spec as a new Foundational augmentation unit in the build sequence and log/resolve any mapped ARCH-DEBT items for missing platform intelligence / IOC distribution model
    - _Requirements: 21.1, 21.2_

  - [ ]* 17.3 Write Phase 1 boundary and governance smoke/static tests
    - Assert absence of network/mailbox/push clients and UI/API artifacts, synthetic-only fixtures, presence of DATA_DICTIONARY entries per entity, and build-sequence registration
    - _Requirements: 21.4, 21.5, 26.1, 26.2, 26.3, 26.4, 26.6_

- [ ] 18. Final integration, wiring, and full verification
  - [ ] 18.1 Wire all entities, logic, schemas, and fixtures through package exports
    - Export all new entities, validators, type constants, pure functions, resolvers and fixtures from `packages/contracts`, `packages/rules` and `packages/db` barrels so downstream Commander consumers (Case Management, VM workflow, Operating Pictures, Tenant Admin, Unit 16b metrics, Commander AI) can resolve intelligence data without UI/API
    - _Requirements: 25.1, 25.2, 25.3_

  - [ ]* 18.2 Run full property, fixture-conformance, and unit suite
    - Execute the complete `tests/platform-intelligence-ioc-distribution/` suite from repo root; confirm all 23 property tests run at ≥100 fast-check iterations and pass with zero regressions
    - _Requirements: 20.5, 26.6_

- [ ] 19. Final checkpoint - full data layer
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP; they are unit, fixture-conformance, and property-based tests.
- The design uses TypeScript throughout; no language selection was required.
- Each property test is its own sub-task, tagged `// Feature: platform-intelligence-ioc-distribution, Property {number}: {property_text}`, runs ≥100 fast-check iterations, and cites the property number plus the requirements clause it validates.
- All 23 correctness properties (P1–P23) are covered exactly once across tasks 2.5, 5.1–5.4, 6.2, 6.4, 6.6, 7.3, 7.4, 8.2, 8.4, 9.2, 11.2, 11.4, 11.5, 11.6, 12.2, 12.4, 12.5, 12.8, 14.2, 16.4.
- Phase 1 boundary is enforced by construction: no task creates UI pages, API endpoints, live sync, live mailbox, live push, live AWS, real vendor APIs, or uses real customer data (Req 21.4, 21.5, 26.1–26.6).
- Checkpoints (tasks 4, 10, 13, 19) provide incremental validation breaks.
- Data-layer completion requires DATA_DICTIONARY.md entries (task 17.1) per execution-discipline steering and ARCH-005.
- Scorecard posture (data-layer-only): Application N/A, Database Green (no change), Data Green (no change), Infrastructure N/A — no Red units introduced.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "2.1", "2.2", "2.3", "2.4", "3.1", "3.2", "3.3", "3.4"] },
    { "id": 2, "tasks": ["2.5", "5.1", "5.2", "5.3", "5.4", "6.1", "6.5", "8.1", "8.3", "9.1", "15.1", "15.2"] },
    { "id": 3, "tasks": ["6.2", "6.3", "6.6", "8.2", "8.4", "9.2", "11.1", "15.3", "14.1"] },
    { "id": 4, "tasks": ["6.4", "7.1", "7.2", "11.2", "11.3", "12.1", "12.3", "12.6", "12.7", "14.2"] },
    { "id": 5, "tasks": ["7.3", "7.4", "7.5", "7.6", "11.4", "11.5", "11.6", "12.2", "12.4", "12.5", "12.8"] },
    { "id": 6, "tasks": ["16.1", "16.2", "16.3"] },
    { "id": 7, "tasks": ["16.4", "16.5", "17.1", "17.2"] },
    { "id": 8, "tasks": ["17.3", "18.1"] },
    { "id": 9, "tasks": ["18.2"] }
  ]
}
```
