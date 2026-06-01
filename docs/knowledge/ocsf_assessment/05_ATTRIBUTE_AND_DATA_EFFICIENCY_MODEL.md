# Commander Attribute and Data Efficiency Model

**Document ID:** ATTRIBUTE_AND_DATA_EFFICIENCY_MODEL  
**Status:** ARCHITECTURE DEFINITION — Accepted  
**Date:** 2026-06-01  
**Authority:** DEC-coim-ocsf-source-classification-architecture (DECISIONS.md)  
**Parent:** COIM v1.0 (01_COIM_v1_0.md)  
**Scope:** Complete Commander attribute strategy and data efficiency strategy following COIM and OCSF-informed ingestion adoption  
**Source Authority:**
- DEC-coim-ocsf-source-classification-architecture (DECISIONS.md)
- docs/knowledge/ocsf_assessment/01_COIM_v1_0.md
- docs/knowledge/ocsf_assessment/02_SOURCE_CLASSIFICATION_MODEL.md
- docs/knowledge/ocsf_assessment/03_REUSABLE_OBJECT_CATALOGUE.md
- docs/knowledge/ocsf_assessment/04_EVIDENCE_MODEL.md
- docs/knowledge/DATA_DICTIONARY.md
- docs/knowledge/ocsf_assessment/COMMANDER_DATA_OCSF_OPERATIONAL_INTELLIGENCE_PROPOSAL.md
- docs/03_api_specs/ocsf/OCSF_REFERENCE_NOTE.md
- Commander doctrine assertions #1, #6

---

## 1. Guiding Principles

### 1.1 Hyper-Efficient Storage

**Principle:** Every byte stored must justify its existence through operational, reporting, AI, or compliance value.

**Enforcement:**
- Source classification metadata: JSONB (~160 bytes) with high-frequency fields extracted to indexed columns
- Bounded arrays: ATT&CK (max 20), observables (max 50), compliance bindings (max 20), D3FEND countermeasures (max 10)
- Raw payloads: Object store (S3), pointer from entity, cold after 30 days, never queried for operational decisions
- Enrichment: Display-time only, not stored on entity, cached separately with TTL
- Evidence content: Object store, metadata queryable, content on-demand retrieval

**Rationale:** At 100+ connectors and 10+ years of operational history, unbounded storage degrades query performance, increases costs, and complicates data lake exports.

---

### 1.2 Ingestion Performance

**Principle:** Normalisation pipeline must process 10,000 findings/minute without degradation.

**Enforcement:**
- Stateless normalisation (Layer 3): No persistent storage strain
- Write-once source classification (Layer 2): No mutation overhead
- Bounded arrays: Predictable memory footprint
- Extracted columns: High-frequency fields indexed for fast writes
- Deduplication: Observable and Analytic entities deduplicated via separate tables with many-to-many binding

**Rationale:** Ingestion is the operational bottleneck. Slow ingestion delays case creation, routing, and validation.

---

### 1.3 Operational Performance

**Principle:** Case management queries must complete in <100ms at P95.

**Enforcement:**
- Hot storage (PostgreSQL): Indexed by tenant + status + priority
- Relational columns: Governance state (lifecycle, priority, routing, validation, closure)
- JSONB: Source classification metadata (queried less frequently than governance state)
- Extracted columns: High-frequency query fields (severityId, confidenceScore, findingClass, vendor, name)
- Materialised views: Dashboard aggregates refreshed hourly or on-change

**Rationale:** Case management is the operational heart of Commander. Slow queries degrade analyst experience and SLA compliance.

---

### 1.4 Dashboard Performance

**Principle:** Dashboard queries must complete in <500ms at P95.

**Enforcement:**
- Materialised views (Layer 7): Pre-computed, denormalised data optimised for query performance
- Refresh policy: Hourly or on-change (event-driven)
- Partitioning: By tenant + time + classification
- Aggregates: ATT&CK heat maps, source quality analytics, compliance posture, D3FEND coverage

**Rationale:** Dashboards require denormalised data. Query-time joins and aggregations degrade performance.

---

### 1.5 Reporting Performance

**Principle:** Reporting queries must complete in <2s at P95.

**Enforcement:**
- Materialised views: Dimensional reporting (by finding class, severity, confidence, source product, ATT&CK tactic)
- Columnar format (Parquet): Data lake exports partitioned by tenant + year + month + findingClass
- Self-describing records: Commander governance fields + source classification metadata preserved

**Rationale:** Reporting requires historical data. Columnar format enables fast analytical queries.

---

### 1.6 AI Consumption Performance

**Principle:** AI context construction must complete in <1s at P95.

**Enforcement:**
- Vector indexes: Semantic search for RAG
- Structured indexes: Precise retrieval for grounding
- Source classification metadata: Enables precise RAG queries (filter by finding class, ATT&CK tactic, confidence)
- Evidence metadata: Queryable for evidence-grounded reasoning
- Freshness awareness: Stale evidence flagged, expired evidence excluded

**Rationale:** AI reasoning requires structured intelligence. Unstructured data degrades AI accuracy and increases hallucination risk.

---

### 1.7 Long-Term Archive Efficiency

**Principle:** Archive storage must be cost-effective and queryable without Commander runtime knowledge.

**Enforcement:**
- Columnar format (Parquet): Compressed, partitioned by tenant + year + month + findingClass
- Self-describing records: Commander governance fields + source classification metadata preserved
- Retention policy: Hot (0-90 days), warm (90 days - 1 year), cold (1-7 years), purged (>7 years)
- Metadata retention: Indefinite (audit trail)
- Content retention: Tenant-configurable (evidence content, raw payloads)

**Rationale:** Archives must be self-describing. Source classification metadata enables queries without Commander runtime knowledge.

---

## 2. Attribute Taxonomy

### 2.1 Source Attributes (Immutable)

**Definition:** Attributes written once during normalisation, never mutated.

**Examples:**
- `sourceClassification.findingClass`
- `sourceClassification.sourceSeverity`
- `sourceClassification.sourceConfidence`
- `sourceClassification.sourceProduct`
- `sourceClassification.sourceFindingUid`
- `sourceClassification.attacks[]`
- `sourceClassification.observables[]`
- `firstDetectedAt` (source timestamp)
- `lastConfirmedAt` (source timestamp)

**Storage:** JSONB on entity (~160 bytes). High-frequency fields extracted to indexed columns.

**Rationale:** Source attributes are provenance. Mutating them destroys audit integrity.

---

### 2.2 Commander Attributes (Mutable)

**Definition:** Attributes computed, managed, or updated by Commander governance/strategy layers.

**Examples:**
- `priority` — Strategy-driven, multi-factor
- `route` — Routing engine decision
- `lifecycleState` — System-owned lifecycle
- `validationState` — Validation engine state
- `closureGateState` — Closure gate evaluation
- `reopenTriggerState` — Reopening trigger evaluation
- `blastRadiusScore` — Commander-computed
- `dwellTimeHours` — Commander-computed
- `affectedEntityCount` — Commander-computed
- `ingestedAt` (system timestamp)
- `normalisedAt` (system timestamp)

**Storage:** Relational columns. Indexed.

**Rationale:** Commander attributes are operational state. They must be mutable, indexed, and optimised for governance queries.

---

### 2.3 Hybrid Attributes (Source + Commander)

**Definition:** Attributes with source-provided values enriched by Commander.

**Examples:**
- `observable.reputation` — Source provides value, Commander enriches with reputation score
- `analytic.falsePositiveRate` — Source may provide, Commander tracks and updates
- `evidence.confidence` — Source provides initial confidence, Commander may update based on validation

**Storage:** Mixed (source value in JSONB, Commander enrichment in column or computed field).

**Rationale:** Hybrid attributes preserve source provenance while enabling Commander enrichment.

---

## 3. Attribute Ownership Model

### 3.1 Source-Owned (Immutable After Write)

**Ownership:** Normalisation pipeline writes once. Never mutated.

**Enforcement:** Application layer. Source-owned fields are read-only after write.

**Examples:** All source attributes (Section 2.1).

---

### 3.2 Commander-Owned (Mutable)

**Ownership:** Commander governance/strategy layers compute, manage, or update.

**Enforcement:** Application layer. Commander-owned fields are mutable by governance engines only.

**Examples:** All Commander attributes (Section 2.2).

---

### 3.3 Hybrid-Owned (Source + Commander)

**Ownership:** Source provides initial value, Commander enriches or updates.

**Enforcement:** Application layer. Source value immutable, Commander enrichment mutable.

**Examples:** All hybrid attributes (Section 2.3).

---

## 4. Metadata Travel Principles

### 4.1 Source Classification Travels With Entity

**Principle:** Source classification metadata persists through the entire lifecycle (hot → warm → cold storage).

**Enforcement:** Architecture layer. Source classification travels with the entity through all COIM layers (1-9).

**Rationale:** Reporting, analytics, AI reasoning, and audit all require source context. If stripped, it is permanently lost.

---

### 4.2 Never Consumed-and-Discarded

**Principle:** Source classification metadata is never consumed into computed fields and discarded.

**Enforcement:** Architecture layer. Source severity and confidence preserved independently of Commander priority.

**Rationale:** Commander priority is strategy-driven and multi-factor. Source severity/confidence are provenance, not inputs to be consumed.

---

### 4.3 Never Mutated

**Principle:** Source classification metadata is never mutated after write.

**Enforcement:** Application layer. Source classification fields are read-only after write.

**Rationale:** Source classification is provenance. Mutating it destroys audit integrity.

---

## 5. Provenance Preservation Principles

### 5.1 Immutable Provenance

**Principle:** Provenance metadata (source, connector, import run, source timestamp) is immutable after write.

**Enforcement:** Application layer. Provenance fields are read-only after write.

**Rationale:** Provenance is audit trail. Mutating it destroys audit integrity.

---

### 5.2 Lineage to Raw Payloads

**Principle:** Lineage to raw vendor payloads is preserved at the architecture level.

**Enforcement:** Raw payloads stored in object store (Layer 1). Pointer from entity. Lineage via raw-ingestion store's `normalised_entity_refs`.

**Rationale:** Raw payloads are evidence artifacts. Storing them inline would bloat entities and degrade query performance.

---

### 5.3 Source UID Preservation

**Principle:** Source-provided unique identifiers are preserved for deduplication and correlation.

**Enforcement:** `sourceFindingUid` field on Risk Object (required). Indexed for lookup.

**Rationale:** Deduplication, source correlation, audit trail back to source system.

---

## 6. Source vs Commander Attributes

### 6.1 Source Attributes

**Purpose:** Preserve what the source reported.

**Examples:**
- `findingClass` — What type of finding the source reported
- `sourceSeverity` — What severity the source assigned
- `sourceConfidence` — How confident the source was
- `sourceProduct` — Which tool produced the finding
- `attacks[]` — What ATT&CK techniques the source reported
- `observables[]` — What indicators the source extracted

**Storage:** JSONB on entity. High-frequency fields extracted to indexed columns.

**Immutability:** Written once, never mutated.

---

### 6.2 Commander Attributes

**Purpose:** Preserve what Commander decided.

**Examples:**
- `priority` — What priority Commander assigned (strategy-driven, multi-factor)
- `route` — What team/owner Commander assigned (22-factor routing model)
- `lifecycleState` — What lifecycle state Commander transitioned to (system-owned)
- `validationState` — What validation state Commander evaluated
- `closureGateState` — What closure gates Commander evaluated
- `blastRadiusScore` — What blast radius Commander computed
- `dwellTimeHours` — What dwell time Commander computed

**Storage:** Relational columns. Indexed.

**Mutability:** Mutable by Commander governance/strategy layers.

---

### 6.3 Coexistence

**Principle:** Source attributes and Commander attributes coexist on the same entity.

**Enforcement:** Architecture layer. Both are preserved through the lifecycle.

**Rationale:** Source attributes inform but never govern. Commander attributes govern but require source context for reporting, analytics, AI reasoning, and audit.

---

## 7. Computed vs Materialised Attributes

### 7.1 Computed Attributes

**Definition:** Attributes aggregated or computed from other entities at query time or entity creation/update time.

**Examples:**
- `case.attacks[]` — Aggregated from bound Risk Objects
- `case.affectedEntityCount` — Computed from bound Risk Objects
- `case.blastRadiusScore` — Computed from affected entities
- `case.dwellTimeHours` — Computed from firstDetectedAt to case creation
- `case.confidenceAggregate` — Computed from bound Risk Objects

**Storage:** Cached on entity (computed at case creation or update).

**Refresh:** On-change (event-driven).

**Rationale:** Case-level analytics require aggregation. Caching avoids redundant computation.

---

### 7.2 Materialised Attributes

**Definition:** Attributes pre-computed and stored in a materialised view for query performance.

**Examples:**
- ATT&CK heat maps (dashboard aggregates)
- Source quality analytics (dashboard aggregates)
- Compliance posture (dashboard aggregates)
- D3FEND coverage (dashboard aggregates)
- Severity distribution (reporting aggregates)

**Storage:** Materialised views in PostgreSQL. Refreshed hourly or on-change.

**Refresh:** Scheduled (hourly) or event-driven (on-change).

**Rationale:** Dashboards and reports require denormalised data. Materialised views prevent query-time joins and aggregations.

---

## 8. Confidence Strategy

**Three confidence types (distinct and independent):**

1. **Source Confidence** — `sourceClassification.sourceConfidence` (enum + 0-100). Immutable. JSONB with extracted column. Usage: trust calibration, source quality analytics, AI reasoning input.

2. **Evidence Confidence** — `evidence.confidence` (0-100). Mutable (updated based on validation). Column on Evidence entity. Usage: evidence freshness evaluation, gate satisfaction, AI reasoning.

3. **Commander AI Confidence** — `aiConfidence` (0-100). Mutable (each AI execution produces its own score). Commander Execution Record or AI output entity. Usage: AI output trust calibration, explanation grounding.

**Principle:** Conflating confidence types destroys provenance and degrades trust calibration. Separate fields, separate semantics, separate lifecycle.

---

## 9. Severity Strategy

**Two severity types (distinct and independent):**

1. **Source Severity** — `sourceClassification.sourceSeverity` (informational/low/medium/high/critical + numeric 1-5). Immutable. JSONB with extracted column. Usage: source calibration, audit, analyst trust, reporting.

2. **Commander Priority** — `priority` (P0/P1/P2/P3/P4). Mutable (strategy-driven, multi-factor). Relational column, indexed. Usage: case routing, SLA calculation, analyst triage.

**Principle:** Commander priority is strategy-driven and multi-factor (severity + confidence + blast radius + mission impact + dwell time + attack surface + control coverage + verdict density + P0 overlay). Source severity is ONE input, not the only input. Separate fields, separate semantics, separate lifecycle.

---

## 10. ATT&CK and D3FEND Strategy

### 10.1 ATT&CK Bindings

**Purpose:** Structured MITRE ATT&CK tactic/technique/sub-technique references.

**Field:** `sourceClassification.attacks[]`

**Type:** JSONB array (bounded, max 20 entries)

**Immutability:** Written once, never mutated.

**Storage:** JSONB array on Risk Object. Indexed for filtering.

**Usage:** ATT&CK heat maps, campaign correlation, technique-based analytics, AI reasoning.

**Efficiency:** Bounded array (max 20) prevents unbounded growth. GIN index enables fast filtering.

---

### 10.2 D3FEND Tactic Classification

**Purpose:** D3FEND tactic classification on remediation actions.

**Field:** `tacticType` (on Sub-Action)

**Type:** Enum (isolate/evict/restore/harden/detect)

**Immutability:** Written once, never mutated.

**Storage:** Enum column on Sub-Action.

**Usage:** Remediation posture analytics, D3FEND coverage measurement, defence effectiveness reporting.

**Efficiency:** Enum column (4 bytes) is more efficient than text column.

---

### 10.3 D3FEND Countermeasures

**Purpose:** D3FEND countermeasure IDs on remediation actions.

**Field:** `countermeasures[]` (on Sub-Action)

**Type:** JSONB array (bounded, max 10 entries)

**Immutability:** Written once, never mutated.

**Storage:** JSONB array on Sub-Action.

**Usage:** D3FEND coverage measurement, defence effectiveness reporting.

**Efficiency:** Bounded array (max 10) prevents unbounded growth.

---

## 11. Evidence Attribute Strategy

**Five evidence attributes:**

1. **Evidence Type** — `evidenceType` (log/scan/verdict/screenshot/config/network_capture/file_hash/process_dump/ai_analysis). Immutable. Enum column (4 bytes). Usage: evidence filtering, coverage reporting, AI reasoning.

2. **Evidence Confidence** — `confidence` (0-100). Mutable (updated based on validation). Column. Usage: freshness evaluation, gate satisfaction, AI reasoning.

3. **Evidence Freshness** — `freshnessStatus` (fresh/stale/expired). Computed on-demand from collectedAt + expiresAt. Not stored. Usage: freshness evaluation, gate satisfaction, AI reasoning.

4. **Evidence Content Reference** — `contentRef` (S3 URI). Immutable. Column. Usage: on-demand content retrieval. Efficiency: pointer more efficient than inline storage.

5. **Evidence Immutability Hash** — `immutabilityHash` (SHA-256). Immutable. Column (32 bytes). Usage: integrity verification, audit trail.

---

## 12. Analytic Attribute Strategy

**Three analytic attributes:**

1. **Analytic Reference** — `analyticId` + `analyticType` (reference to Analytic entity). Immutable. Reference fields on Risk Object/Verdict. Full metadata in separate table. Usage: detection engineering metrics, false positive tracking, effectiveness, ATT&CK binding. Efficiency: deduplication (many findings reference same analytic).

2. **Analytic Type Taxonomy** — `analyticType` (detection_rule/analytic_rule/sigma_rule/yara_rule/ml_model/ueba_model/vendor_model/security_control_analytic). Immutable. Enum column (4 bytes). Usage: model-vs-rule attribution, source-quality analysis.

3. **Analytic False Positive Rate** — `falsePositiveRate` (0-100). Mutable (Commander tracks and updates). Column. Usage: detection engineering metrics, effectiveness.

---

## 13. Timeline Strategy

**Multi-timestamp model (four timestamps with distinct semantics):**

1. `firstDetectedAt` — When source first detected (source timestamp). Required on Risk Object. Immutable.
2. `lastConfirmedAt` — When source last confirmed (source timestamp). Recommended on Risk Object, Asset, Identity. Immutable.
3. `ingestedAt` — When Commander received (system timestamp). Required on all entities. Immutable.
4. `normalisedAt` — When normalisation completed (system timestamp). Required on Risk Object. Immutable.

**Storage:** Timestamp columns, indexed. **Usage:** Dwell time calculation, staleness detection, freshness evaluation, SLA accuracy. **Efficiency:** Indexed timestamp columns enable fast range queries.

**Dwell Time Calculation:** `dwellTimeHours` (computed on Case) = firstDetectedAt to case creation. Computed once at case creation, cached on entity.

---

## 14. Reporting Strategy

**Dimensional reporting** enabled by source classification metadata preserved through lifecycle. Materialised views for dashboard aggregates. Usage: CISO metrics, source quality analytics, compliance posture, ATT&CK heat maps. Efficiency: materialised views prevent query-time joins and aggregations.

**Self-describing archives** enabled by Commander governance fields + source classification metadata preserved in data lake exports. Usage: historical analytics, compliance reporting, data lake queries. Efficiency: columnar format (Parquet) enables fast analytical queries.

---

## 15. Search Strategy

**Faceted search** enabled by source classification metadata indexed in OpenSearch. Usage: analyst search, case discovery, threat hunting. Efficiency: OpenSearch full-text and faceted search optimised for search performance.

**Indicator-based search** enabled by Observable entity with type, value, firstSeen, lastSeen. Indexed for search. Usage: threat intelligence correlation, cross-case matching, indicator-based search. Efficiency: separate Observable table with many-to-many binding (deduplication), indexed for fast lookup.

---

## 16. AI Consumption Strategy

**Structured intelligence for RAG** enabled by source classification metadata structured and indexed. Vector indexes for semantic search. Structured indexes for precise retrieval. Usage: AI context construction, grounding, explanation. Efficiency: structured indexes enable fast precise retrieval, vector indexes enable fast semantic search.

**Evidence-grounded reasoning** enabled by evidence metadata queryable, content on-demand retrieval, freshness evaluation. Usage: AI evidence-grounded reasoning, AI explanations. Efficiency: evidence metadata queryable without retrieving content, content retrieved on-demand only.

**Freshness awareness** enabled by evidence freshness evaluated during AI reasoning. Stale evidence flagged, expired evidence excluded. Usage: AI reasoning, AI explanations. Efficiency: freshness computed on-demand from collectedAt + expiresAt, no storage overhead.

---

## 17. Audit Strategy

**Immutable audit trail** enabled by audit events immutable after write, provenance metadata immutable after write, evidence immutability hash verified on read. Usage: audit trail, compliance reporting, legal defensibility. Efficiency: immutable records enable append-only storage (no update overhead).

**Evidence integrity verification** enabled by immutabilityHash stored in evidence metadata, hash verification on read, hash mismatch triggers audit event. Usage: evidence integrity verification, audit trail. Efficiency: hash (32 bytes) more efficient than storing content inline.

---

## 18. Archive Strategy

**Self-describing records** enabled by Commander governance fields + source classification metadata preserved in data lake exports. Usage: historical analytics, compliance reporting, data lake queries. Efficiency: columnar format (Parquet) enables fast analytical queries.

**Retention policy** (cost-effective long-term retention):
- Hot (0-90 days): Evidence content in S3 standard, metadata in PostgreSQL
- Warm (90 days - 1 year): Evidence content in S3 infrequent access, metadata in data lake
- Cold (1-7 years): Evidence content in S3 Glacier, metadata in archive
- Purged (>7 years): Evidence content deleted, metadata preserved

Usage: compliance, historical analytics, cost optimization. Efficiency: tiered storage reduces costs, metadata preserved indefinitely for audit trail.

---

## 19. Storage Efficiency Principles

### 19.1 Bounded Arrays

**Principle:** Arrays must be bounded to prevent unbounded growth.

**Enforcement:**
- ATT&CK bindings: max 20 entries
- Observables: max 50 entries
- Compliance bindings: max 20 entries
- D3FEND countermeasures: max 10 entries

**Rationale:** Unbounded arrays degrade query performance and increase storage costs.

---

### 19.2 Extracted Columns

**Principle:** High-frequency query fields must be extracted to indexed columns.

**Enforcement:**
- `severityId` — Extracted from SourceClassification JSONB
- `confidenceScore` — Extracted from SourceClassification JSONB
- `findingClass` — Extracted from SourceClassification JSONB
- `vendor` — Extracted from SourceProduct JSONB
- `name` — Extracted from SourceProduct JSONB

**Rationale:** JSONB queries are slower than indexed column queries.

---

### 19.3 Deduplication

**Principle:** Entities with many-to-many relationships must be deduplicated.

**Enforcement:**
- Observable entity: Separate table with many-to-many binding
- Analytic entity: Separate table with many-to-many binding

**Rationale:** Deduplication avoids redundant storage and enables efficient updates.

---

### 19.4 Object Store for Large Content

**Principle:** Large content (raw payloads, evidence content) must be stored in object store.

**Enforcement:**
- Raw payloads: S3, pointer from entity
- Evidence content: S3, pointer from entity

**Rationale:** Storing large content inline bloats entities and degrades query performance.

---

### 19.5 Display-Time Enrichment

**Principle:** Volatile data (geo, reputation, threat intel) must not pollute immutable entities.

**Enforcement:**
- Enrichment: Display-time only, not stored on entity, cached separately with TTL

**Rationale:** Volatile data stored inline requires frequent updates and degrades query performance.

---

## 20. Data Lifecycle Principles

### 20.1 Hot Storage (0-90 days)

**Purpose:** Operational data for active cases.

**Storage:** PostgreSQL (relational columns + JSONB). S3 standard (raw payloads, evidence content).

**Performance:** Indexed for fast queries (<100ms at P95).

**Retention:** 90 days.

---

### 20.2 Warm Storage (90 days - 1 year)

**Purpose:** Historical data for closed cases.

**Storage:** Data lake (Parquet). S3 infrequent access (evidence content).

**Performance:** Analytical queries (<2s at P95).

**Retention:** 1 year.

---

### 20.3 Cold Storage (1-7 years)

**Purpose:** Long-term retention for compliance.

**Storage:** Archive (Parquet). S3 Glacier (evidence content).

**Performance:** Retrieval on-demand (minutes to hours).

**Retention:** 7 years (tenant-configurable).

---

### 20.4 Purged (>7 years)

**Purpose:** Cost optimization.

**Storage:** Evidence content deleted. Metadata preserved.

**Performance:** N/A (content deleted).

**Retention:** Metadata indefinite (audit trail).

---

## 21. OCSF Alignment Principles

### 21.1 Check OCSF First

**Principle:** Before introducing a new source classification field, composed object, enum, taxonomy, observable type, evidence structure, or metadata attribute, architects must first determine whether an equivalent concept exists within OCSF.

**Enforcement:** Architecture review. OCSF reference check mandatory.

**Rationale:** OCSF provides well-designed schema engineering patterns. Reinventing them wastes effort and degrades interoperability.

---

### 21.2 OCSF as Reference, Not Authority

**Principle:** OCSF is a schema engineering reference, not Commander authority.

**Enforcement:** Commander defines its own fields informed by OCSF. Commander is not required to conform to OCSF.

**Rationale:** Commander's canonical model, governance model, and operational lifecycle are Commander-owned. OCSF does not replace them.

---

### 21.3 OCSF-Informed Ingestion

**Principle:** All ingestion pipelines normalise source data into Commander's OCSF-informed source classification structures regardless of source format.

**Enforcement:** Normalisation pipeline (Layer 3). OCSF-native sources map more directly. Non-OCSF sources mapped into same structures.

**Rationale:** Consistent source classification enables consistent reporting, analytics, AI reasoning, and audit.

---

## 22. Future Data Dictionary Impacts

### 22.1 Source Classification Fields

**Impact:** DATA_DICTIONARY.md will add SourceClassification JSONB field to Risk Object, Asset, Identity entities.

**Fields:**
- `sourceClassification.findingClass` — Required on Risk Object
- `sourceClassification.sourceSeverity` — Required on Risk Object
- `sourceClassification.sourceConfidence` — Required on Risk Object
- `sourceClassification.sourceProduct` — Required on Risk Object
- `sourceClassification.sourceFindingUid` — Required on Risk Object
- `sourceClassification.attacks[]` — Recommended on Risk Object
- `sourceClassification.observables[]` — Recommended on Risk Object

**Availability:** FUTURE (blocker: COIM implementation)

---

### 22.2 Evidence Entity

**Impact:** DATA_DICTIONARY.md will add Evidence entity.

**Fields:**
- `evidenceType` — Required
- `source` — Required
- `confidence` — Required
- `collectedAt` — Required
- `expiresAt` — Optional
- `contentRef` — Required
- `immutabilityHash` — Required
- `caseId` — Required
- `subActionId` — Optional
- `validationDecisionId` — Optional

**Availability:** FUTURE (blocker: COIM implementation)

---

### 22.3 Observable Entity

**Impact:** DATA_DICTIONARY.md will add Observable entity.

**Fields:**
- `observableType` — Required
- `value` — Required
- `firstSeen` — Optional
- `lastSeen` — Optional
- `reputation` — Optional (enrichment-derived)

**Availability:** FUTURE (blocker: COIM implementation)

---

### 22.4 Analytic Entity

**Impact:** DATA_DICTIONARY.md will add Analytic entity.

**Fields:**
- `analyticId` — Required
- `analyticName` — Required
- `analyticType` — Required
- `version` — Optional
- `state` — Required
- `falsePositiveRate` — Optional
- `attacks[]` — Optional

**Availability:** FUTURE (blocker: COIM implementation)

---

### 22.5 Timeline Fields

**Impact:** DATA_DICTIONARY.md will add timeline fields to Risk Object, Asset, Identity entities.

**Fields:**
- `firstDetectedAt` — Required on Risk Object
- `lastConfirmedAt` — Recommended on Risk Object, Asset, Identity
- `normalisedAt` — Required on Risk Object

**Availability:** FUTURE (blocker: COIM implementation)

---

### 22.6 D3FEND Fields

**Impact:** DATA_DICTIONARY.md will add D3FEND fields to Sub-Action entity.

**Fields:**
- `tacticType` — Required on Sub-Action
- `countermeasures[]` — Optional on Sub-Action

**Availability:** FUTURE (blocker: COIM implementation)

---

## End of Document
