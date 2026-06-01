# Commander Operational Intelligence Model (COIM) v1.0

**Document ID:** COIM_v1_0  
**Status:** ARCHITECTURE DEFINITION — Accepted  
**Date:** 2026-06-01  
**Authority:** DEC-coim-ocsf-source-classification-architecture (DECISIONS.md)  
**Scope:** Formal definition of Commander's operational intelligence architecture layer  
**Source Authority:**
- DECISIONS.md (DEC-coim-ocsf-source-classification-architecture)
- docs/knowledge/ocsf_assessment/COMMANDER_DATA_OCSF_OPERATIONAL_INTELLIGENCE_PROPOSAL.md
- docs/03_api_specs/ocsf/OCSF_REFERENCE_NOTE.md
- docs/99_source_archive/baseline_v2_6_2/ (Specs #12, #29, #61, #62)
- Commander doctrine assertion #6 (reference-input boundary)

---

## 1. Executive Summary

### What COIM Is

The Commander Operational Intelligence Model (COIM) is a formal architecture layer that defines how Commander SDR structures, preserves, and reasons over operational intelligence metadata throughout the security drift response lifecycle.

COIM answers: **"What is this data, where did it come from, how confident are we, and what technique does it represent?"**

Commander's governance layer answers: **"What should we do with this?"**

These are distinct concerns. COIM provides the intelligence foundation that enables governance to be *informed* rather than *blind*.

### Why COIM Exists

Commander SDR has a strong governance architecture (lifecycle, routing, validation, closure, strategy) but previously had an under-specified operational intelligence architecture. The platform knew *what to do* with data but didn't structurally know *what the data is* at a granular, filterable, queryable level.

Without COIM:
- Reporting requires custom computation rather than structured queries
- ATT&CK is referenced in doctrine but not queryable as structured data
- Source confidence is consumed into priority and permanently lost
- Evidence has no dedicated entity despite doctrine requiring evidence-driven governance
- AI reasoning lacks structured source intelligence for grounding and explanation
- Data lake exports are opaque without Commander-specific runtime knowledge

### What COIM Provides

1. **Source Classification Model** — Structured record of what the source reported (severity, confidence, finding class, product identity, source UID)
2. **ATT&CK Binding Model** — Queryable MITRE ATT&CK tactic/technique/sub-technique references
3. **D3FEND Classification Model** — Remediation tactic classification (Isolate/Evict/Restore/Harden/Detect)
4. **Evidence Model** — First-class typed evidence artifacts bound to cases and validation decisions
5. **Observable Model** — Typed indicator extraction (IP, domain, hash, URL, email, certificate, process, file)
6. **Confidence Model** — Source-assessed confidence preserved independently of Commander priority
7. **Analytic Reference Model** — Structured reference to detection rules, ML models, UEBA models, vendor models, security control analytics
8. **Compliance Binding Model** — Framework + control + requirement references on findings
9. **Multi-Timestamp Model** — Distinct timestamps with clear semantics (firstDetectedAt, lastConfirmedAt, ingestedAt, normalisedAt)
10. **Self-Describing Archive Model** — Records remain queryable through hot, warm, and cold storage


### What COIM Is NOT

1. **Not a replacement for Commander's canonical model** — Asset, Identity, Risk Object, Case, Verdict, Action remain authoritative
2. **Not a governance model** — Lifecycle, routing, validation, closure, reopening remain Commander-owned
3. **Not a priority model** — Commander's strategy-driven priority computation is unchanged
4. **Not OCSF adoption** — OCSF is a schema engineering reference, not Commander authority
5. **Not a data lake replacement** — COIM enables self-describing exports; it doesn't replace the data lake

### Architecture Position

> Commander adopts an OCSF-informed source classification model for all ingestion pipelines regardless of source format. OCSF is the primary schema engineering and source classification reference framework, but remains reference input only and does not replace Commander's canonical model, governance model, lifecycle model, Risk Object, Case, Verdict, Action, OODA, routing, validation, closure, reopening or Control Plane. Source intelligence, including source classifications, source confidence, source severity, source product identity, source finding identifiers, ATT&CK mappings, D3FEND mappings, observables, evidence references, enrichments and analytic references, persists through the Commander lifecycle as immutable source intelligence where applicable. Source intelligence informs filtering, validation, evidence, reporting, dashboarding, search, analytics, AI reasoning, audit, data lake export and archive. Source intelligence never governs Commander lifecycle, priority, routing, validation, closure or reopening. Commander AI may reason over source intelligence for grounding and explanation, but Commander AI confidence and outputs are Commander-owned and distinct from source metadata. Every operational record must remain self-describing through hot, warm and cold storage.

---

## 2. Architecture Layers

COIM operates across nine architecture layers. Each layer has distinct ownership, efficiency characteristics, and data retention policies.

### Layer 1: Raw Source Layer

**Purpose:** Preserve original vendor payloads as evidence and debugging material.

**What lives here:** Full vendor API responses, raw JSON/XML payloads, scan reports.

**What must NOT live here:** Commander canonical entities, computed fields, governance state.

**Data ownership:** Connector framework. Retention-governed per tenant policy.

**Efficiency:** Object store (S3/equivalent). Pointer from entity. Cold after 30 days. Never queried for operational decisions.

**Rationale:** Raw payloads are evidence artifacts, not operational data. Storing them inline would bloat entities and degrade query performance.


### Layer 2: Source Classification Layer

**Purpose:** Structured classification of what the source reported. Immutable after write.

**What lives here:** SourceClassification object (findingClass, sourceSeverity, sourceConfidence, sourceProduct, sourceFindingUid, sourceActivity, attacks[], observables[]).

**What must NOT live here:** Commander governance decisions, computed priority, lifecycle state.

**Data ownership:** Normalisation pipeline writes once. Never mutated.

**Efficiency:** JSONB on entity (~160 bytes). High-frequency query fields extracted to dedicated columns. GIN-indexed.

**Rationale:** Source classification must persist through the lifecycle but is not queried at the same frequency as governance state. JSONB provides structured storage without schema bloat.

### Layer 3: Commander Normalisation Layer

**Purpose:** Transform source data into Commander canonical entities. Apply source authority, entity matching, conflict resolution.

**What lives here:** Normalisation pipeline logic, mapping packs, authority resolution.

**What must NOT live here:** Persistent data (this is a processing layer, not a storage layer).

**Data ownership:** Normalisation engine per Spec #12.

**Efficiency:** Stateless processing. No persistent storage strain.

**Rationale:** Normalisation is a transformation layer, not a storage layer. Keeping it stateless prevents data duplication and drift.

### Layer 4: Commander Operational Intelligence Layer (COIM)

**Purpose:** Structured operational intelligence metadata that enables filtering, reporting, analytics, AI reasoning.

**What lives here:** ATT&CK bindings, D3FEND classifications, confidence, evidence references, observable references, compliance bindings, analytic references.

**What must NOT live here:** Raw payloads, full evidence content, full verdict streams.

**Data ownership:** Commander-owned. Populated during normalisation and enriched during lifecycle.

**Efficiency:** Structured fields on entities. Bounded arrays. Materialised aggregates for dashboards.

**Rationale:** Operational intelligence must be queryable and filterable. Structured fields enable dimensional reporting and AI reasoning.


### Layer 5: Commander Canonical Entity Layer

**Purpose:** Authoritative operational entities with governance state.

**What lives here:** Asset, Identity, Risk Object, Case, Verdict, Action, Connector, Strategy, Audit Event — with lifecycle state, routing, priority, validation, closure.

**What must NOT live here:** Raw payloads, unbounded historical data, full communication threads.

**Data ownership:** Commander governance model. System-owned lifecycle.

**Efficiency:** Relational columns. Indexed. Hot storage. Tenant-partitioned.

**Rationale:** Canonical entities are the operational source of truth. They must be queryable, indexed, and optimised for governance decisions.

### Layer 6: Risk/Case/Verdict/Action Layer

**Purpose:** Operational case management with full governance lifecycle.

**What lives here:** Case binding, sub-actions, validation state, closure gates, reopening triggers, routing decisions, strategy bindings.

**What must NOT live here:** Source classification (lives on Layer 2/4, referenced from here).

**Data ownership:** Case management engine, routing engine, validation engine.

**Efficiency:** Relational. Indexed by tenant + status + priority. Hot.

**Rationale:** Case management is the operational heart of Commander. It must be fast, indexed, and optimised for lifecycle queries.

### Layer 7: Reporting/Dashboard/Search Layer

**Purpose:** Pre-computed, denormalised data optimised for query performance.

**What lives here:** Materialised views, dashboard aggregates, search indexes, read models.

**What must NOT live here:** Authoritative state (this is derived, not source-of-truth).

**Data ownership:** Derived from Layers 4-6. Refreshed on schedule or event.

**Efficiency:** Materialised views in PostgreSQL. OpenSearch for full-text and faceted search. Refresh hourly or on-change.

**Rationale:** Dashboards and reports require denormalised data. Materialised views prevent query-time joins and aggregations.


### Layer 8: Archive/Data Lake Layer

**Purpose:** Long-term retention, compliance, historical analytics, export.

**What lives here:** Self-describing records (Commander governance fields + source classification metadata). Partitioned by time + tenant + classification.

**What must NOT live here:** Mutable state. Active governance decisions.

**Data ownership:** Archive policy per tenant. Immutable after write.

**Efficiency:** Columnar format (Parquet). Partitioned by tenant + year + month + findingClass. Compressed.

**Rationale:** Archives must be self-describing. Source classification metadata enables queries without Commander runtime knowledge.

### Layer 9: Commander AI Layer

**Purpose:** AI reasoning, explanation, grounding, recommendation.

**What lives here:** RAG indexes, AI context construction, Commander Execution Records.

**What must NOT live here:** Authoritative governance state (AI recommends, system decides).

**Data ownership:** Commander AI engine per Spec #13.

**Efficiency:** Vector indexes for semantic search. Structured indexes for precise retrieval. Source classification enables precise RAG queries.

**Rationale:** AI must be grounded in structured intelligence. Source classification provides the grounding context.

---

## 3. Data Flow

```
Vendor API
  ↓
Raw Source Payload (Layer 1 — object store)
  ↓
Source Adapter Parsing
  ↓
OCSF/Source Classification (Layer 2 — structured metadata captured)
  ↓
Commander Normalisation (Layer 3 — entity matching, authority resolution, conflict resolution)
  ↓
Operational Intelligence Preservation (Layer 4 — ATT&CK, confidence, observables, evidence refs)
  ↓
Canonical Entity Write (Layer 5 — Asset/Identity/Risk Object with governance + intelligence)
  ↓
Risk Object Binding → Case Creation (Layer 6 — closed-loop lifecycle begins)
  ↓
Routing → Priority → Sub-Action Generation (Layer 6 — governance engine)
  ↓
Validation → Evidence Collection (Layer 6 + Evidence entity)
  ↓
Closure Gates / Reopening Triggers (Layer 6 — system-owned)
  ↓
Dashboard/Reporting/Search (Layer 7 — materialised, denormalised)
  ↓
Archive/Data Lake Export (Layer 8 — self-describing, partitioned)
  ↓
Commander AI Reasoning (Layer 9 — grounded in source intelligence + governance context)
```

At every stage, source classification metadata travels with the entity. It is never stripped, never mutated, never consumed-and-discarded.


---

## 4. COIM Components

### 4.1 SourceClassification

**Purpose:** Structured record of what the source reported about a finding.

**Why needed:** Without it, Commander knows what it decided but not what it received. Reporting, analytics, AI reasoning, and audit all require source context.

**Entities:** Risk Object (required), Asset (recommended for discovery signals), Identity (recommended for IAM signals).

**Requirement:** Required on Risk Object.

**Storage:** JSONB on entity. High-frequency fields (severityId, confidenceScore, findingClass) extracted to columns.

**Fields:**
- `findingClass` — OCSF-informed classification (vulnerability/detection/compliance/incident/data_security/iam_analysis/application_security)
- `sourceSeverity` — Source-assessed severity (informational/low/medium/high/critical)
- `sourceConfidence` — Source-assessed confidence (enum + numeric score 0-100)
- `sourceProduct` — Structured source tool identification (vendor, name, version, uid, connectorClass)
- `sourceFindingUid` — Source-provided unique identifier for the finding
- `sourceActivity` — Source-provided activity classification (optional)
- `attacks[]` — ATT&CK bindings (bounded array, max 20)
- `observables[]` — Observable references (bounded array, max 50)

**Immutability:** Written once during normalisation. Never mutated.

**OCSF influence:** finding_info.json, vulnerability.json, compliance.json, detection_finding.json inform structure.

**Commander-owned:** Risk Object lifecycle, priority computation, routing, validation, closure remain Commander-governed.


### 4.2 Attack / ATT&CK

**Purpose:** Structured MITRE ATT&CK binding (tactic + technique + sub-technique + version).

**Why needed:** ATT&CK heat maps, campaign correlation, technique-based routing, AI reasoning. Currently referenced in doctrine but not queryable.

**Entities:** Risk Object (recommended), Case (computed/aggregated), Detection Rule (recommended).

**Requirement:** Recommended on Risk Object (populated where source provides it).

**Storage:** JSONB array on entity. Bounded (max 20 entries). Indexed for filtering.

**Fields:**
- `tactic` — ATT&CK tactic (e.g., "Initial Access", "Persistence")
- `technique` — ATT&CK technique ID (e.g., "T1566")
- `techniqueName` — Human-readable technique name
- `subTechnique` — Sub-technique ID (optional, e.g., "T1566.001")
- `subTechniqueName` — Human-readable sub-technique name (optional)
- `version` — ATT&CK framework version (e.g., "v13.1")

**OCSF influence:** attack.json object informs structure.

**Commander-owned:** ATT&CK does not drive routing or priority. It informs analytics and reporting only.

### 4.3 Remediation / D3FEND

**Purpose:** D3FEND tactic classification on remediation actions (Isolate/Evict/Restore/Harden/Detect).

**Why needed:** Remediation posture analytics, D3FEND coverage measurement, defence effectiveness reporting.

**Entities:** Sub-Action (required), Remediation Template (required).

**Requirement:** Required on Sub-Action.

**Storage:** Enum column. Optional countermeasures[] JSONB array (bounded, max 10).

**Fields:**
- `tacticType` — D3FEND tactic enum (isolate/evict/restore/harden/detect)
- `countermeasures[]` — D3FEND countermeasure IDs (optional, bounded array)

**OCSF influence:** remediation_activity.json (D3FEND activity_id), d3fend.json object inform tactic structure.

**Commander-owned:** Sub-action lifecycle, approval chains, push governance, rollback-first design.


### 4.4 Evidence

**Purpose:** Typed, timestamped, confidence-weighted evidence artifacts bound to cases and validation decisions.

**Why needed:** Closed-loop doctrine requires evidence-driven validation, evidence-gated closure, evidence-triggered reopening. No queryable home exists today.

**Entities:** Evidence (new first-class entity). Bound to Case, Sub-Action, Validation Decision.

**Requirement:** Required as entity. Type classification required on every evidence record.

**Storage:** Separate table. Content in object store. Metadata queryable. Bounded per case.

**Fields:**
- `evidenceType` — Type classification (log/scan/verdict/screenshot/config/network_capture/file_hash/process_dump)
- `source` — Evidence source (connector, analyst, system)
- `confidence` — Confidence in evidence validity (0-100)
- `collectedAt` — Timestamp when evidence was collected
- `expiresAt` — Timestamp when evidence becomes stale (optional)
- `contentRef` — Pointer to evidence content in object store
- `immutabilityHash` — SHA-256 hash of evidence content
- `caseId` — Bound case (required)
- `subActionId` — Bound sub-action (optional)
- `validationDecisionId` — Bound validation decision (optional)

**OCSF influence:** evidences.json object informs structure.

**Commander-owned:** Evidence binding to cases/sub-actions/validation, freshness evaluation, gate satisfaction.

### 4.5 Observable

**Purpose:** Typed indicator extraction (IP, domain, hash, URL, email, certificate, process, file).

**Why needed:** Threat intelligence correlation, cross-case matching, indicator-based search.

**Entities:** Risk Object (recommended), Case (aggregated).

**Requirement:** Recommended on Risk Object.

**Storage:** Separate table with many-to-many binding (deduplication). Or bounded JSONB array (max 50) on entity with overflow to table.

**Fields:**
- `observableType` — Type enum (ip/domain/hash/url/email/certificate/process/file)
- `value` — Observable value
- `firstSeen` — First observation timestamp
- `lastSeen` — Last observation timestamp
- `reputation` — Reputation score (optional, enrichment-derived)

**OCSF influence:** observable.json object informs structure. type_id enum informs type taxonomy.

**Commander-owned:** Observable-to-entity binding, threat intelligence matching, cross-case correlation.


### 4.6 ComplianceBinding

**Purpose:** Framework + control + requirement reference on findings.

**Why needed:** Compliance posture reporting without reverse-engineering source data.

**Entities:** Risk Object (optional), Case (aggregated).

**Requirement:** Optional on Risk Object.

**Storage:** JSONB array on entity. Bounded (max 20).

**Fields:**
- `framework` — Compliance framework (e.g., "CIS", "NIST", "PCI-DSS", "ISO 27001")
- `control` — Control identifier (e.g., "CIS 1.1", "NIST AC-2")
- `requirement` — Requirement text (optional)
- `status` — Compliance status (pass/fail/not_applicable)

**OCSF influence:** compliance.json object informs structure.

**Commander-owned:** Compliance posture aggregation, compliance case routing.

### 4.7 SourceProduct

**Purpose:** Structured identification of the source tool (name, vendor, version, uid, connectorClass).

**Why needed:** Source quality analytics, connector ROI, multi-source deduplication.

**Entities:** Risk Object (required — part of SourceClassification), Verdict (required).

**Requirement:** Required.

**Storage:** Part of SourceClassification JSONB. Vendor + name extracted to columns for indexing.

**Fields:**
- `vendor` — Vendor name (e.g., "CrowdStrike", "Microsoft", "Tenable")
- `name` — Product name (e.g., "Falcon", "Defender", "Nessus")
- `version` — Product version (optional)
- `uid` — Product unique identifier (optional)
- `connectorClass` — Commander connector class (A/B/C/D)

**OCSF influence:** product.json object informs structure.

**Commander-owned:** Connector class conformance, source quality measurement.


### 4.8 Analytic (Reusable Concept — Broader Than DetectionRule)

**Purpose:** Reference to the analytic that produced a finding or verdict. Analytic is the broad reusable COIM concept; DetectionRule is one narrower specialisation of it.

**Analytic types (the reusable concept spans all of these):**
- detection rule (correlation/signature rule that produces detections)
- analytic rule (generic analytic logic, e.g. scheduled query analytics)
- Sigma rule (open detection rule format)
- YARA rule (pattern-matching rule for files/memory)
- ML model (machine-learning detection or scoring model)
- UEBA model (user and entity behavioural analytics model)
- vendor model (proprietary vendor risk/detection model)
- security control analytic (analytic embedded in a security control, e.g. policy evaluation logic)

**Why needed:** Detection engineering metrics, false positive tracking, analytic/rule effectiveness, analytic-to-ATT&CK binding, model-vs-rule attribution, and source-quality analysis by analytic type. Treating Analytic as the broad concept (rather than only "detection rule") prevents Commander from under-modelling ML/UEBA/vendor-model provenance.

**Entities:** Risk Object (recommended), Verdict (recommended where a model/analytic produced the verdict).

**Requirement:** Recommended.

**Storage:** Reference field (analyticId + analyticType) on the entity. Full analytic metadata (name, version, state, type, falsePositiveRate, ATT&CK bindings) in a separate Analytic reference entity/table. DetectionRule is represented as `analyticType = detection_rule` within this model, not as a separate competing concept.

**Fields:**
- `analyticId` — Unique identifier for the analytic
- `analyticName` — Human-readable name
- `analyticType` — Type enum (detection_rule/analytic_rule/sigma_rule/yara_rule/ml_model/ueba_model/vendor_model/security_control_analytic)
- `version` — Analytic version
- `state` — Analytic state (active/deprecated/testing)
- `falsePositiveRate` — False positive rate (optional, 0-100)
- `attacks[]` — ATT&CK bindings (optional, bounded array)

**OCSF influence:** analytic.json object (type_id: Rule/Behavioral/Statistical/ML) informs structure.

**Commander-owned:** Analytic lifecycle, effectiveness measurement, drift rule engine, model attribution.


### 4.9 Enrichment

**Purpose:** Display-time context (geo, reputation, threat intel) that doesn't pollute the core record.

**Why needed:** Context for dashboards and AI without storing volatile data on immutable entities.

**Entities:** Not stored on entity. Queried at display time from enrichment cache.

**Requirement:** Optional (display-time only).

**Storage:** Enrichment cache. Not on entity. Timestamped. Refreshable.

**Fields:**
- `enrichmentType` — Type enum (geo/reputation/threat_intel/whois)
- `value` — Enrichment value (JSON)
- `source` — Enrichment source
- `timestamp` — When enrichment was retrieved
- `ttl` — Time-to-live (seconds)

**OCSF influence:** enrichment.json object informs structure.

**Commander-owned:** Enrichment cache management, refresh policy.

### 4.10 Confidence

**Purpose:** Source-assessed confidence in the finding (enum + numeric score).

**Why needed:** Trust calibration, source quality analytics, AI reasoning, confidence-weighted triage.

**Entities:** Risk Object (required — part of SourceClassification), Verdict (required).

**Requirement:** Required.

**Storage:** Part of SourceClassification JSONB. Score extracted to column for indexing.

**Fields:**
- `confidenceLevel` — Enum (unknown/low/medium/high)
- `confidenceScore` — Numeric score (0-100)

**OCSF influence:** confidence_id enum informs structure.

**Commander-owned:** Confidence does not drive priority. It informs analytics and AI reasoning only.


### 4.11 Severity

**Purpose:** Source-assessed severity (enum: informational/low/medium/high/critical).

**Why needed:** Source calibration, audit, analyst trust, reporting. Preserved independently of Commander priority.

**Entities:** Risk Object (required — part of SourceClassification).

**Requirement:** Required.

**Storage:** Part of SourceClassification JSONB. Extracted to column for indexing.

**Fields:**
- `severityLevel` — Enum (informational/low/medium/high/critical)
- `severityId` — Numeric ID (1-5)

**OCSF influence:** severity_id enum informs structure.

**Commander-owned:** Severity does not drive priority. Commander priority is strategy-driven and multi-factor.

### 4.12 Timestamp Model

**Purpose:** Multiple timestamps with distinct semantics.

**Why needed:** Dwell time, staleness, freshness, SLA accuracy.

**Fields:**
- `firstDetectedAt` — When source first detected (source timestamp). Required on Risk Object.
- `lastConfirmedAt` — When source last confirmed (source timestamp). Recommended on Risk Object, Asset, Identity.
- `ingestedAt` — When Commander received (system timestamp). Required on all entities.
- `normalisedAt` — When normalisation completed (system timestamp). Required on Risk Object.

**Storage:** Timestamp columns. Indexed.

**OCSF influence:** time, start_time, end_time, modified_time inform structure.

**Commander-owned:** Timestamp semantics are Commander-defined. OCSF provides reference patterns only.

---

## 5. OCSF Role

### What OCSF Is Used For

1. **Schema engineering reference.** Before designing a new classification field, check whether OCSF has a well-designed equivalent.
2. **Ingestion model.** All ingestion pipelines normalise source data into Commander's OCSF-informed source classification structures regardless of source format.
3. **Enum reference.** OCSF's severity levels, confidence levels, disposition types, and observable types inform Commander's own enum design.
4. **Object composition reference.** OCSF's attack, vulnerability, compliance, analytic, and observable objects demonstrate good compositional design.
5. **Validation reference.** OCSF's requirement levels (required/recommended/optional) inform Commander's field contract design.


### What OCSF Is NOT Used For

1. **Not Commander authority.** Commander's canonical model, governance model, and operational lifecycle are not derived from OCSF.
2. **Not a lifecycle model.** OCSF's analyst-driven status (New/In Progress/Resolved) is irrelevant to Commander's system-owned lifecycle.
3. **Not a priority model.** OCSF's risk_score/risk_level are source-provided values that Commander does not adopt.
4. **Not a binding standard.** Commander is not required to conform to OCSF. Commander defines its own fields informed by OCSF.
5. **Not an extension architecture.** Commander does not adopt OCSF's vendor-specific extension model.

### What "Check OCSF First" Means

> Before introducing a new source classification field, composed object, enum, taxonomy, observable type, evidence structure, or metadata attribute, architects must first determine whether an equivalent concept exists within OCSF. Where OCSF provides a well-designed equivalent, Commander's design should be informed by it. This principle applies to classification and taxonomy structures only. It does not apply to governance, lifecycle, strategy, routing, or operational decision-making structures, which are Commander's exclusive domain.

### Where OCSF Remains Reference-Only

- OCSF categories (System/Findings/IAM/Network/Discovery/Application/Remediation) — informational, not Commander's operational taxonomy
- OCSF status model — informational metadata only
- OCSF risk scoring — not preserved
- OCSF disposition model — informs Commander's extended verdict enum but does not replace it
- OCSF extension architecture — not adopted

### Where Commander Must Define Its Own Model

- Case lifecycle states
- Priority computation
- Routing factors
- Validation states
- Closure gates
- Reopening triggers
- Strategy surfaces
- Intelligence streams
- Signal purposes
- Connector classes
- Attack surface attribution
- Verdict temporal semantics
- OODA phases
- Mission impact

---

## 6. Entity Impact

COIM introduces new fields and metadata to existing Commander entities. This section defines the impact on each canonical entity.


### 6.1 Asset

**Current weakness:** No lifecycle state, no platform structure, no network position, no data classification, no temporal confirmation tracking.

**Required improvement:** Add lifecycleState, platform (structured), networkPosition, dataClassification, lastConfirmedAt, firstDiscoveredBy.

**Metadata to preserve:** Source discovery classification (recommended).

**OCSF influence:** device.json object informs platform structure. discovery category informs classification.

**Commander-owned:** Lifecycle state, criticality, coverage model, attack surface attribution, ownership.

**Downstream impact:** Enables vulnerability correlation, blast radius, compliance reporting, AI reasoning about asset context.

### 6.2 Identity

**Current weakness:** No privilege level, no authentication strength, no entitlement summary, no risk factors, no last authenticated timestamp.

**Required improvement:** Add privilegeLevel, authenticationStrength, lastAuthenticatedAt, entitlementSummary, riskFactors[].

**Metadata to preserve:** Source IAM classification (recommended).

**OCSF influence:** user.json, iam_analysis_finding, identity_activity_metrics inform structure.

**Commander-owned:** Risk score computation, verdict pattern detection, identity lifecycle, trust calibration.

**Downstream impact:** Enables IAM finding routing, privilege drift detection, P0 triggers, identity intelligence surface.

### 6.3 Risk Object

**Current weakness:** No source classification, no ATT&CK, no confidence, no severity, singular affectedEntityId, no firstDetectedAt, no detectionRuleRef.

**Required improvement:** Add sourceClassification (JSONB), attacks[] (JSONB array), affectedEntities[] (plural), firstDetectedAt, lastConfirmedAt, sourceFindingUid, analyticRef.

**Metadata to preserve:** Full SourceClassification object (required).

**OCSF influence:** finding_info, vulnerability, compliance, attack, analytic objects inform structure.

**Commander-owned:** risk_object_type, case_binding_status, validation_state, routing_state, priority_score, closure_gate_state, reopen_trigger_state.

**Downstream impact:** Enables dimensional reporting, ATT&CK analytics, confidence-weighted triage, AI reasoning, data lake exports.


### 6.4 Case

**Current weakness:** No ATT&CK aggregation, no affected entity count, no blast radius score, no dwell time, no confidence aggregate, no resolution duration.

**Required improvement:** Add attacks[] (aggregated), affectedEntityCount, blastRadiusScore, dwellTimeHours, confidenceAggregate, resolutionDurationHours, findingClassBreakdown.

**Metadata to preserve:** Aggregated from bound risk objects (computed).

**OCSF influence:** incident profile informs case-level metadata. finding_info informs aggregation.

**Commander-owned:** Case lifecycle, priority, routing, validation, closure, reopening, strategy binding.

**Downstream impact:** Enables CISO metrics, campaign correlation, case complexity assessment, AI case summaries.

### 6.5 Verdict

**Current weakness:** Identity-focused (8 dispositions). No targetEntityType. No structured policyRef. No confidence field.

**Required improvement:** Add targetEntityType, extended disposition enum (15+), policyType, structured policyRef, confidence, observedAt, sourceProductId.

**Metadata to preserve:** Source verdict classification.

**OCSF influence:** security_control profile (disposition_id, action_id) informs extended disposition. product.json informs source identification.

**Commander-owned:** Verdict temporal semantics, trust calibration, density aggregation, verdict pattern detection.

**Downstream impact:** Enables non-identity verdict analytics, policy effectiveness cases, multi-tool verdict analysis.

### 6.6 Action / Sub-Action

**Current weakness:** No tactic classification, no target entity, no execution method, no outcome classification, no effort tracking, no approval reference.

**Required improvement:** Add tacticType (D3FEND), targetEntity, executionMethod, outcomeClassification, estimatedEffortHours, actualEffortHours, approvalRef.

**Metadata to preserve:** D3FEND tactic and countermeasures.

**OCSF influence:** remediation_activity (D3FEND activity_id), d3fend.json object inform tactic structure.

**Commander-owned:** Sub-action lifecycle, approval chains, push governance, rollback-first design.

**Downstream impact:** Enables remediation posture analytics, D3FEND coverage, automation metrics, value reporting.


### 6.7 Evidence (New Entity)

**Current weakness:** Does not exist. Evidence is scattered across audit events and provenance JSONB.

**Required improvement:** Create as first-class entity with type, source, confidence, temporal bounds, content reference, immutability hash, bindings.

**Metadata to preserve:** Evidence type classification, source attribution, confidence.

**OCSF influence:** evidences.json object informs structure. verdict_id on evidence informs verdict binding.

**Commander-owned:** Evidence binding to cases/sub-actions/validation, freshness evaluation, gate satisfaction.

**Downstream impact:** Enables evidence-gated closure, evidence-triggered reopening, AI evidence-grounded reasoning, audit integrity.

### 6.8 Observable (New Entity or Composed Object)

**Current weakness:** Does not exist. No typed indicator extraction model.

**Required improvement:** Create as entity or composed object with type, value, firstSeen, lastSeen, source bindings.

**Metadata to preserve:** Observable type and value.

**OCSF influence:** observable.json object informs structure. type_id enum informs type taxonomy.

**Commander-owned:** Observable-to-entity binding, threat intelligence matching, cross-case correlation.

**Downstream impact:** Enables threat correlation, indicator-based search, intelligence stream feeding.

### 6.9 Connector

**Current weakness:** No signalPurposesCovered[], no findingClassesProduced[].

**Required improvement:** Add signalPurposesCovered[], findingClassesProduced[], lastHealthCheckAt.

**OCSF influence:** Minimal — connector management is Commander's domain.

**Commander-owned:** Connector lifecycle, class conformance, pull orchestration, health monitoring.

**Downstream impact:** Enables connector coverage analytics, source quality reporting.

### 6.10 Analytic (New Entity or Reference)

**Current weakness:** Does not exist. No structured analytic/rule reference.

**Required improvement:** Create as entity or reference using the broad Analytic concept (analyticId, analyticName, analyticType, attacks[], state, version, falsePositiveRate), where analyticType spans detection rule, analytic rule, Sigma rule, YARA rule, ML model, UEBA model, vendor model, and security control analytic.

**OCSF influence:** analytic.json object (type_id: Rule/Behavioral/Statistical/ML) informs structure.

**Commander-owned:** Analytic lifecycle, effectiveness measurement, drift rule engine, model attribution.

**Downstream impact:** Enables detection engineering metrics, false positive tracking, analytic-to-ATT&CK binding, model-vs-rule attribution.


---

## 7. Implementation Status

**Status:** ARCHITECTURE DEFINITION — Accepted

**Decision Authority:** DEC-coim-ocsf-source-classification-architecture (DECISIONS.md, 2026-06-01)

**Implementation Status:** Deferred to later controlled architecture/specification work.

**What This Document Authorises:**
- COIM as a formal Commander architecture layer
- OCSF as schema engineering reference (not authority)
- Source classification metadata preservation through lifecycle
- Evidence, Observable, and Analytic as first-class concepts
- ATT&CK and D3FEND as structured queryable fields
- Multi-timestamp model with distinct semantics
- Self-describing archive principle

**What This Document Does NOT Authorise:**
- Schema changes to existing entities
- New database tables or columns
- Code generation or implementation tasks
- Build schedule changes
- Spec modifications

**Next Steps:**
1. Create follow-on architecture artefacts:
   - 02_SOURCE_CLASSIFICATION_MODEL.md — Detailed source classification taxonomy
   - 03_REUSABLE_OBJECT_CATALOGUE.md — Composed object patterns
   - 04_EVIDENCE_MODEL.md — Evidence entity specification
   - 05_ATTRIBUTE_DICTIONARY_AMENDMENTS.md — Field-level definitions
   - 06_DATA_EFFICIENCY_MODEL.md — Storage and query optimization
2. Update baseline specs (Spec #12 Normalisation, Spec #29 Risk Object, Spec #61 Connector Contract, Spec #62 Verdict Semantics) to incorporate COIM principles
3. Create implementation specs when build schedule reaches data model work

**Constraints:**
- No application code changes authorised by this document
- No live AWS resources
- No real vendor API integrations
- No production billing implementation
- SOC / Insider-Risk / C2-SDR-Commander boundaries unaffected

---

## 8. References

### Source Authority

- **DECISIONS.md** — DEC-coim-ocsf-source-classification-architecture
- **docs/knowledge/ocsf_assessment/COMMANDER_DATA_OCSF_OPERATIONAL_INTELLIGENCE_PROPOSAL.md** — Full proposal document
- **docs/03_api_specs/ocsf/OCSF_REFERENCE_NOTE.md** — OCSF reference status
- **docs/99_source_archive/baseline_v2_6_2/** — Baseline specs #12, #29, #61, #62
- **Commander doctrine assertion #6** — Reference-input boundary (`.kiro/steering/commander-doctrine.md`)


### OCSF Reference

- **OCSF v1.8.0** — Local clone at `docs/03_api_specs/ocsf/ocsf-schema/`
- **OCSF GitHub** — https://github.com/ocsf/ocsf-schema
- **OCSF Documentation** — https://schema.ocsf.io/

### Related Commander Specs

- **Spec #12** — SDR Normalisation Strategy
- **Spec #29** — Universal Risk Object
- **Spec #61** — Universal Security Signal Connector Contract
- **Spec #62** — Verdict Semantics
- **Spec #59** — Intelligence Layer Architecture (four-stream model)
- **Spec #60** — Internal and External Attack Surface Framework

### Follow-On Architecture Artefacts

1. **02_SOURCE_CLASSIFICATION_MODEL.md** — Detailed source classification taxonomy and enum definitions
2. **03_REUSABLE_OBJECT_CATALOGUE.md** — Composed object patterns (Attack, Observable, Evidence, Analytic, ComplianceBinding)
3. **04_EVIDENCE_MODEL.md** — Evidence entity specification with type taxonomy and binding rules
4. **05_ATTRIBUTE_DICTIONARY_AMENDMENTS.md** — Field-level definitions for all COIM fields
5. **06_DATA_EFFICIENCY_MODEL.md** — Storage optimization, indexing strategy, query patterns, archive partitioning

---

## 9. Glossary

**COIM** — Commander Operational Intelligence Model. Formal architecture layer defining how Commander structures, preserves, and reasons over operational intelligence metadata.

**Source Classification** — Structured record of what the source reported about a finding (severity, confidence, finding class, product identity, source UID).

**Source Intelligence** — Immutable metadata captured at ingestion time that persists through the Commander lifecycle (source classification, ATT&CK, observables, confidence, severity, analytic references).

**OCSF** — Open Cybersecurity Schema Framework. Schema engineering reference for Commander's source classification model. Not Commander authority.

**Analytic** — Broad reusable concept spanning detection rules, analytic rules, Sigma rules, YARA rules, ML models, UEBA models, vendor models, and security control analytics.

**Evidence** — Typed, timestamped, confidence-weighted artifact bound to cases and validation decisions.

**Observable** — Typed indicator (IP, domain, hash, URL, email, certificate, process, file) extracted from findings.

**ATT&CK** — MITRE ATT&CK framework. Structured tactic/technique/sub-technique references on findings.

**D3FEND** — MITRE D3FEND framework. Remediation tactic classification (Isolate/Evict/Restore/Harden/Detect).

**Self-Describing Archive** — Records that remain queryable through hot, warm, and cold storage without Commander runtime knowledge.

---

**End of Document**
