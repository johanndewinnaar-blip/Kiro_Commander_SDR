# Commander SDR — Data, OCSF & Operational Intelligence Proposal

**Document ID:** COMMANDER_DATA_OCSF_OPERATIONAL_INTELLIGENCE_PROPOSAL  
**Status:** PROPOSAL — Pending Owner Acceptance  
**Date:** 2026-06-01  
**Author:** Architecture Authority (Kiro-assisted)  
**Authority:** This document is a proposal only. It does not become binding until accepted via DECISIONS.md.  
**Scope:** Architecture position on data strategy, source classification, operational intelligence, and OCSF reference usage.

---

## 1. Executive Summary

### What Problem We Are Solving

Commander SDR has a strong governance architecture (lifecycle, routing, validation, closure, strategy) but an under-specified operational intelligence architecture. The platform knows *what to do* with data but doesn't structurally know *what the data is* at a granular, filterable, queryable level.

At 100+ connectors and 10+ years of operational history, this gap means:
- Reporting requires custom computation rather than structured queries
- ATT&CK is referenced in doctrine but not queryable as structured data
- Source confidence is consumed into priority and permanently lost
- Evidence has no dedicated entity despite doctrine requiring evidence-driven governance
- AI reasoning lacks structured source intelligence for grounding and explanation
- Data lake exports are opaque without Commander-specific runtime knowledge

### Why This Matters Now

Source intelligence metadata can only be captured at ingestion time. If not captured, it is permanently lost.
The architecture position costs nothing to accept now (it is a design principle, not an implementation task) but prevents permanent regret later. Deferring the decision does not defer the cost — every finding ingested without source classification metadata is a finding that can never be retrospectively classified.

### Recommended Decision

Accept the Commander Operational Intelligence Architecture Position:

> Commander adopts an OCSF-informed source classification model for all ingestion pipelines regardless of source format, and uses OCSF as the primary schema engineering reference for Commander's own source classification model. OCSF does not replace Commander's canonical model or operational intelligence model, which remain authoritative. Source metadata, classifications, observables and enrichments persist through the Commander lifecycle as immutable source intelligence, available for filtering, validation, evidence, reporting, dashboarding, search, analytics, AI reasoning, audit and data lake export. Source intelligence informs but never governs Commander lifecycle, priority, routing, validation, closure or reopening. Commander AI may reason over source intelligence for explanation and grounding, but Commander AI confidence and outputs are Commander-owned fields distinct from source metadata. Every operational record must remain self-describing through hot, warm and cold storage.

### What Should Be Accepted

- Model B: metadata survivability (source classification persists through lifecycle)
- OCSF as schema engineering reference (not authority)
- Commander Operational Intelligence Model (COIM) as a new architectural layer
- Evidence as a first-class entity
- ATT&CK as structured queryable fields
- D3FEND tactic classification on remediation actions
- Source confidence and severity preserved independently of Commander priority
- Multi-timestamp model with distinct semantics
- Reusable composed objects as a design pattern
- Records self-describing through archive

### What Should Be Rejected

- OCSF as Commander authority or canonical model replacement
- OCSF lifecycle model influencing Commander governance
- Source risk_score/risk_level as priority input
- Vendor-specific schema extensions
- Wholesale adoption of OCSF's 800+ attributes
- Source classification participating in governance decisions

---

## 2. Strategic Position

### Commander Remains Authoritative

Commander retains exclusive ownership of:
- Canonical entity model (Asset, Identity, Risk Object, Case, Verdict, Action, Connector, Strategy, Audit Event)
- Case lifecycle (12-state closed-loop, system-owned)
- Priority computation (strategy-driven, multi-factor)
- Routing (22-factor model with rationale)
- Validation (system-owned, evidence-gated)
- Closure gates and reopening triggers
- Strategy layer (13 surface types)
- Verdict semantics (time-bound, trust-calibrated, density-aggregated)
- Intelligence streams (four-stream model)
- Attack surface attribution (internal/external)
- Connector class model (A/B/C/D)
- Signal purpose taxonomy (8 purposes)
- OODA operational tempo
- Control Plane governance

### OCSF Becomes Primary Schema Engineering Reference

OCSF is used as:
- The primary schema engineering reference for field design (what fields are worth having)
- A reference for object composition (how to structure reusable objects)
- A reference for enum design (how to normalise classifications)
- A reference for observable typing (how to type indicators)
- A reference for evidence structure (how to model evidence artifacts)
- The basis for an OCSF-informed source classification model applied to all ingestion pipelines regardless of source format (OCSF-native and non-OCSF sources alike normalise into Commander's OCSF-informed source classification structures)

OCSF is NOT used as:
- Commander authority
- A replacement for Commander's canonical model
- A lifecycle model
- A priority/risk computation model
- A routing or governance model
- A binding standard that Commander must conform to

### Source Intelligence Persists Through the Lifecycle

When source data is normalised into Commander's canonical model:
- Commander's computed fields (priority, route, validation state) are produced
- Source inputs (severity, confidence, ATT&CK, finding class, product identity) are preserved as immutable provenance metadata
- Both coexist on the entity
- Source fields are read-only after write
- Source fields are available for filtering, reporting, analytics, AI reasoning, and export
- Source fields never drive governance decisions

### Commander Operational Intelligence Model (COIM) Is Required

A new architectural layer — the Commander Operational Intelligence Model — provides structured classification, evidence, ATT&CK, D3FEND, observables, and confidence metadata that enables the governance layer to be *informed* rather than *blind*.

Governance answers: "What should we do with this?"
Intelligence answers: "What is this, where did it come from, how confident are we, and what technique does it represent?"

---

## 3. Architecture Layers

### Layer 1: Raw Source Layer

**Purpose:** Preserve original vendor payloads as evidence and debugging material.
**What lives here:** Full vendor API responses, raw JSON/XML payloads, scan reports.
**What must NOT live here:** Commander canonical entities, computed fields, governance state.
**Data ownership:** Connector framework. Retention-governed per tenant policy.
**Efficiency:** Object store (S3/equivalent). Pointer from entity. Cold after 30 days. Never queried for operational decisions.

### Layer 2: Source Classification Layer

**Purpose:** Structured classification of what the source reported. Immutable after write.
**What lives here:** SourceClassification object (findingClass, sourceSeverity, sourceConfidence, sourceProduct, sourceFindingUid, sourceActivity, attacks[], observables[]).
**What must NOT live here:** Commander governance decisions, computed priority, lifecycle state.
**Data ownership:** Normalisation pipeline writes once. Never mutated.
**Efficiency:** JSONB on entity (~160 bytes). High-frequency query fields extracted to dedicated columns. GIN-indexed.

### Layer 3: Commander Normalisation Layer

**Purpose:** Transform source data into Commander canonical entities. Apply source authority, entity matching, conflict resolution.
**What lives here:** Normalisation pipeline logic, mapping packs, authority resolution.
**What must NOT live here:** Persistent data (this is a processing layer, not a storage layer).
**Data ownership:** Normalisation engine per Spec #12.
**Efficiency:** Stateless processing. No persistent storage strain.

### Layer 4: Commander Operational Intelligence Layer (COIM)

**Purpose:** Structured operational intelligence metadata that enables filtering, reporting, analytics, AI reasoning.
**What lives here:** ATT&CK bindings, D3FEND classifications, confidence, evidence references, observable references, compliance bindings, analytic references.
**What must NOT live here:** Raw payloads, full evidence content, full verdict streams.
**Data ownership:** Commander-owned. Populated during normalisation and enriched during lifecycle.
**Efficiency:** Structured fields on entities. Bounded arrays. Materialised aggregates for dashboards.

### Layer 5: Commander Canonical Entity Layer

**Purpose:** Authoritative operational entities with governance state.
**What lives here:** Asset, Identity, Risk Object, Case, Verdict, Action, Connector, Strategy, Audit Event — with lifecycle state, routing, priority, validation, closure.
**What must NOT live here:** Raw payloads, unbounded historical data, full communication threads.
**Data ownership:** Commander governance model. System-owned lifecycle.
**Efficiency:** Relational columns. Indexed. Hot storage. Tenant-partitioned.

### Layer 6: Risk/Case/Verdict/Action Layer

**Purpose:** Operational case management with full governance lifecycle.
**What lives here:** Case binding, sub-actions, validation state, closure gates, reopening triggers, routing decisions, strategy bindings.
**What must NOT live here:** Source classification (lives on Layer 2/4, referenced from here).
**Data ownership:** Case management engine, routing engine, validation engine.
**Efficiency:** Relational. Indexed by tenant + status + priority. Hot.

### Layer 7: Reporting/Dashboard/Search Layer

**Purpose:** Pre-computed, denormalised data optimised for query performance.
**What lives here:** Materialised views, dashboard aggregates, search indexes, read models.
**What must NOT live here:** Authoritative state (this is derived, not source-of-truth).
**Data ownership:** Derived from Layers 4-6. Refreshed on schedule or event.
**Efficiency:** Materialised views in PostgreSQL. OpenSearch for full-text and faceted search. Refresh hourly or on-change.

### Layer 8: Archive/Data Lake Layer

**Purpose:** Long-term retention, compliance, historical analytics, export.
**What lives here:** Self-describing records (Commander governance fields + source classification metadata). Partitioned by time + tenant + classification.
**What must NOT live here:** Mutable state. Active governance decisions.
**Data ownership:** Archive policy per tenant. Immutable after write.
**Efficiency:** Columnar format (Parquet). Partitioned by tenant + year + month + findingClass. Compressed.

### Layer 9: Commander AI Layer

**Purpose:** AI reasoning, explanation, grounding, recommendation.
**What lives here:** RAG indexes, AI context construction, Commander Execution Records.
**What must NOT live here:** Authoritative governance state (AI recommends, system decides).
**Data ownership:** Commander AI engine per Spec #13.
**Efficiency:** Vector indexes for semantic search. Structured indexes for precise retrieval. Source classification enables precise RAG queries.

---

## 4. Data Flow

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

## 5. OCSF Role

### What OCSF Is Used For

1. **Schema engineering reference.** Before designing a new classification field, check whether OCSF has a well-designed equivalent.
2. **Ingestion model.** All ingestion pipelines normalise source data into Commander's OCSF-informed source classification structures regardless of source format. Where vendors emit OCSF natively (AWS Security Hub, CrowdStrike, Splunk), the mapping is more direct; non-OCSF sources are mapped into the same OCSF-informed structures.
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

## 6. Commander Operational Intelligence Model (COIM)

### 6.1 SourceClassification

**Purpose:** Structured record of what the source reported about a finding.
**Why needed:** Without it, Commander knows what it decided but not what it received. Reporting, analytics, AI reasoning, and audit all require source context.
**Entities:** Risk Object (required), Asset (recommended for discovery signals), Identity (recommended for IAM signals).
**Requirement:** Required on Risk Object.
**Storage:** JSONB on entity. High-frequency fields (severityId, confidenceScore, findingClass) extracted to columns.

### 6.2 Attack / ATT&CK

**Purpose:** Structured MITRE ATT&CK binding (tactic + technique + sub-technique + version).
**Why needed:** ATT&CK heat maps, campaign correlation, technique-based routing, AI reasoning. Currently referenced in doctrine but not queryable.
**Entities:** Risk Object (recommended), Case (computed/aggregated), Detection Rule (recommended).
**Requirement:** Recommended on Risk Object (populated where source provides it).
**Storage:** JSONB array on entity. Bounded (max 20 entries). Indexed for filtering.

### 6.3 Remediation / D3FEND

**Purpose:** D3FEND tactic classification on remediation actions (Isolate/Evict/Restore/Harden/Detect).
**Why needed:** Remediation posture analytics, D3FEND coverage measurement, defence effectiveness reporting.
**Entities:** Sub-Action (required), Remediation Template (required).
**Requirement:** Required on Sub-Action.
**Storage:** Enum column. Optional countermeasures[] JSONB array (bounded, max 10).

### 6.4 Evidence

**Purpose:** Typed, timestamped, confidence-weighted evidence artifacts bound to cases and validation decisions.
**Why needed:** Closed-loop doctrine requires evidence-driven validation, evidence-gated closure, evidence-triggered reopening. No queryable home exists today.
**Entities:** Evidence (new first-class entity). Bound to Case, Sub-Action, Validation Decision.
**Requirement:** Required as entity. Type classification required on every evidence record.
**Storage:** Separate table. Content in object store. Metadata queryable. Bounded per case.

### 6.5 Observable

**Purpose:** Typed indicator extraction (IP, domain, hash, URL, email, certificate, process, file).
**Why needed:** Threat intelligence correlation, cross-case matching, indicator-based search.
**Entities:** Risk Object (recommended), Case (aggregated).
**Requirement:** Recommended on Risk Object.
**Storage:** Separate table with many-to-many binding (deduplication). Or bounded JSONB array (max 50) on entity with overflow to table.

### 6.6 ComplianceBinding

**Purpose:** Framework + control + requirement reference on findings.
**Why needed:** Compliance posture reporting without reverse-engineering source data.
**Entities:** Risk Object (optional), Case (aggregated).
**Requirement:** Optional on Risk Object.
**Storage:** JSONB array on entity. Bounded (max 20).

### 6.7 SourceProduct

**Purpose:** Structured identification of the source tool (name, vendor, version, uid, connectorClass).
**Why needed:** Source quality analytics, connector ROI, multi-source deduplication.
**Entities:** Risk Object (required — part of SourceClassification), Verdict (required).
**Requirement:** Required.
**Storage:** Part of SourceClassification JSONB. Vendor + name extracted to columns for indexing.

### 6.8 Analytic (Reusable Concept — Broader Than DetectionRule)

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

### 6.9 Enrichment

**Purpose:** Display-time context (geo, reputation, threat intel) that doesn't pollute the core record.
**Why needed:** Context for dashboards and AI without storing volatile data on immutable entities.
**Entities:** Not stored on entity. Queried at display time from enrichment cache.
**Requirement:** Optional (display-time only).
**Storage:** Enrichment cache. Not on entity. Timestamped. Refreshable.

### 6.10 Confidence

**Purpose:** Source-assessed confidence in the finding (enum + numeric score).
**Why needed:** Trust calibration, source quality analytics, AI reasoning, confidence-weighted triage.
**Entities:** Risk Object (required — part of SourceClassification), Verdict (required).
**Requirement:** Required.
**Storage:** Part of SourceClassification JSONB. Score extracted to column for indexing.

### 6.11 Severity

**Purpose:** Source-assessed severity (enum: informational/low/medium/high/critical).
**Why needed:** Source calibration, audit, analyst trust, reporting. Preserved independently of Commander priority.
**Entities:** Risk Object (required — part of SourceClassification).
**Requirement:** Required.
**Storage:** Part of SourceClassification JSONB. Extracted to column for indexing.

### 6.12 Timestamp Model

**Purpose:** Multiple timestamps with distinct semantics.
**Why needed:** Dwell time, staleness, freshness, SLA accuracy.
**Fields:**
- `firstDetectedAt` — when source first detected (source timestamp). Required on Risk Object.
- `lastConfirmedAt` — when source last confirmed (source timestamp). Recommended on Risk Object, Asset, Identity.
- `ingestedAt` — when Commander received (system timestamp). Required on all entities.
- `normalisedAt` — when normalisation completed (system timestamp). Required on Risk Object.
**Storage:** Timestamp columns. Indexed.

---

## 7. Entity Impact

### Asset

**Current weakness:** No lifecycle state, no platform structure, no network position, no data classification, no temporal confirmation tracking.
**Required improvement:** Add lifecycleState, platform (structured), networkPosition, dataClassification, lastConfirmedAt, firstDiscoveredBy.
**Metadata to preserve:** Source discovery classification (recommended).
**OCSF influence:** device.json object informs platform structure. discovery category informs classification.
**Commander-owned:** Lifecycle state, criticality, coverage model, attack surface attribution, ownership.
**Downstream impact:** Enables vulnerability correlation, blast radius, compliance reporting, AI reasoning about asset context.

### Identity

**Current weakness:** No privilege level, no authentication strength, no entitlement summary, no risk factors, no last authenticated timestamp.
**Required improvement:** Add privilegeLevel, authenticationStrength, lastAuthenticatedAt, entitlementSummary, riskFactors[].
**Metadata to preserve:** Source IAM classification (recommended).
**OCSF influence:** user.json, iam_analysis_finding, identity_activity_metrics inform structure.
**Commander-owned:** Risk score computation, verdict pattern detection, identity lifecycle, trust calibration.
**Downstream impact:** Enables IAM finding routing, privilege drift detection, P0 triggers, identity intelligence surface.

### Risk Object

**Current weakness:** No source classification, no ATT&CK, no confidence, no severity, singular affectedEntityId, no firstDetectedAt, no detectionRuleRef.
**Required improvement:** Add sourceClassification (JSONB), attacks[] (JSONB array), affectedEntities[] (plural), firstDetectedAt, lastConfirmedAt, sourceFindingUid, detectionRuleRef.
**Metadata to preserve:** Full SourceClassification object (required).
**OCSF influence:** finding_info, vulnerability, compliance, attack, analytic objects inform structure.
**Commander-owned:** risk_object_type, case_binding_status, validation_state, routing_state, priority_score, closure_gate_state, reopen_trigger_state.
**Downstream impact:** Enables dimensional reporting, ATT&CK analytics, confidence-weighted triage, AI reasoning, data lake exports.

### Case

**Current weakness:** No ATT&CK aggregation, no affected entity count, no blast radius score, no dwell time, no confidence aggregate, no resolution duration.
**Required improvement:** Add attacks[] (aggregated), affectedEntityCount, blastRadiusScore, dwellTimeHours, confidenceAggregate, resolutionDurationHours, findingClassBreakdown.
**Metadata to preserve:** Aggregated from bound risk objects (computed).
**OCSF influence:** incident profile informs case-level metadata. finding_info informs aggregation.
**Commander-owned:** Case lifecycle, priority, routing, validation, closure, reopening, strategy binding.
**Downstream impact:** Enables CISO metrics, campaign correlation, case complexity assessment, AI case summaries.

### Verdict

**Current weakness:** Identity-focused (8 dispositions). No targetEntityType. No structured policyRef. No confidence field.
**Required improvement:** Add targetEntityType, extended disposition enum (15+), policyType, structured policyRef, confidence, observedAt, sourceProductId.
**Metadata to preserve:** Source verdict classification.
**OCSF influence:** security_control profile (disposition_id, action_id) informs extended disposition. product.json informs source identification.
**Commander-owned:** Verdict temporal semantics, trust calibration, density aggregation, verdict pattern detection.
**Downstream impact:** Enables non-identity verdict analytics, policy effectiveness cases, multi-tool verdict analysis.

### Action / Sub-Action

**Current weakness:** No tactic classification, no target entity, no execution method, no outcome classification, no effort tracking, no approval reference.
**Required improvement:** Add tacticType (D3FEND), targetEntity, executionMethod, outcomeClassification, estimatedEffortHours, actualEffortHours, approvalRef.
**Metadata to preserve:** D3FEND tactic and countermeasures.
**OCSF influence:** remediation_activity (D3FEND activity_id), d3fend.json object inform tactic structure.
**Commander-owned:** Sub-action lifecycle, approval chains, push governance, rollback-first design.
**Downstream impact:** Enables remediation posture analytics, D3FEND coverage, automation metrics, value reporting.

### Evidence (New Entity)

**Current weakness:** Does not exist. Evidence is scattered across audit events and provenance JSONB.
**Required improvement:** Create as first-class entity with type, source, confidence, temporal bounds, content reference, immutability hash, bindings.
**Metadata to preserve:** Evidence type classification, source attribution, confidence.
**OCSF influence:** evidences.json object informs structure. verdict_id on evidence informs verdict binding.
**Commander-owned:** Evidence binding to cases/sub-actions/validation, freshness evaluation, gate satisfaction.
**Downstream impact:** Enables evidence-gated closure, evidence-triggered reopening, AI evidence-grounded reasoning, audit integrity.

### Observable (New Entity or Composed Object)

**Current weakness:** Does not exist. No typed indicator extraction model.
**Required improvement:** Create as entity or composed object with type, value, firstSeen, lastSeen, source bindings.
**Metadata to preserve:** Observable type and value.
**OCSF influence:** observable.json object informs structure. type_id enum informs type taxonomy.
**Commander-owned:** Observable-to-entity binding, threat intelligence matching, cross-case correlation.
**Downstream impact:** Enables threat correlation, indicator-based search, intelligence stream feeding.

### Connector

**Current weakness:** No signalPurposesCovered[], no findingClassesProduced[].
**Required improvement:** Add signalPurposesCovered[], findingClassesProduced[], lastHealthCheckAt.
**OCSF influence:** Minimal — connector management is Commander's domain.
**Commander-owned:** Connector lifecycle, class conformance, pull orchestration, health monitoring.
**Downstream impact:** Enables connector coverage analytics, source quality reporting.

### DetectionRule / Analytic (New Entity or Reference)

**Current weakness:** Does not exist. No structured analytic/rule reference.
**Required improvement:** Create as entity or reference using the broad Analytic concept (analyticId, analyticName, analyticType, attacks[], state, version, falsePositiveRate), where analyticType spans detection rule, analytic rule, Sigma rule, YARA rule, ML model, UEBA model, vendor model, and security control analytic.
**OCSF influence:** analytic.json object (type_id: Rule/Behavioral/Statistical/ML) informs structure.
**Commander-owned:** Analytic lifecycle, effectiveness measurement, drift rule engine, model attribution.
**Downstream impact:** Enables detection engineering metrics, false positive tracking, analytic-to-ATT&CK binding, model-vs-rule attribution.

---

## 8. Field / Metadata Design Candidates

### Source Classification Fields

| Name | Purpose | Entity | Req Level | Storage | Risk if Omitted |
|---|---|---|---|---|---|
| `sourceClassification.findingClass` | What kind of finding the source reported | Risk Object | Required | JSONB + extracted column | Cannot report by finding type |
| `sourceClassification.sourceSeverityId` | Source-assessed severity | Risk Object | Required | JSONB + extracted column | Cannot calibrate sources or audit priority decisions |
| `sourceClassification.sourceConfidenceId` | Source confidence level (enum) | Risk Object | Required | JSONB | Cannot filter by confidence band |
| `sourceClassification.sourceConfidenceScore` | Source confidence (numeric 0.0-1.0) | Risk Object | Required | JSONB + extracted column | Cannot weight findings or calibrate trust |
| `sourceClassification.sourceProductId` | Source tool identifier | Risk Object | Required | JSONB + extracted column | Cannot measure source quality |
| `sourceClassification.sourceProductVendor` | Source vendor name | Risk Object | Required | JSONB | Cannot report by vendor |
| `sourceClassification.sourceProductVersion` | Source tool version | Risk Object | Recommended | JSONB | Minor — version-specific analytics lost |
| `sourceClassification.sourceFindingUid` | Source finding identifier | Risk Object | Required | JSONB + extracted column | Cannot deduplicate or drill through to source |
| `sourceClassification.sourceActivityId` | Create/Update/Close | Risk Object | Recommended | JSONB | Cannot distinguish new from updated findings |

### ATT&CK Fields

| Name | Purpose | Entity | Req Level | Storage | Risk if Omitted |
|---|---|---|---|---|---|
| `attacks[]` | ATT&CK tactic/technique/sub-technique array | Risk Object | Recommended | JSONB array (max 20) | ATT&CK heat maps impossible |
| `attacks[]` (aggregated) | Case-level ATT&CK view | Case | Computed | JSONB array | Campaign correlation impossible |

### D3FEND / Remediation Fields

| Name | Purpose | Entity | Req Level | Storage | Risk if Omitted |
|---|---|---|---|---|---|
| `tacticType` | D3FEND tactic (Isolate/Evict/Restore/Harden/Detect) | Sub-Action | Required | Enum column | Remediation posture analytics impossible |
| `countermeasures[]` | D3FEND technique references | Sub-Action | Optional | JSONB array (max 10) | D3FEND technique-level mapping unavailable |
| `outcomeClassification` | How the action ended | Sub-Action | Required | Enum column | Effectiveness measurement impossible |

### Timestamp Fields

| Name | Purpose | Entity | Req Level | Storage | Risk if Omitted |
|---|---|---|---|---|---|
| `firstDetectedAt` | When source first detected | Risk Object | Required | Timestamp column | Dwell time permanently unknowable |
| `lastConfirmedAt` | When source last confirmed | Risk Object, Asset, Identity | Recommended | Timestamp column | Staleness detection impossible |
| `ingestedAt` | When Commander received | All entities | Required | Timestamp column (existing createdAt) | N/A — already exists |
| `normalisedAt` | When normalisation completed | Risk Object | Required | Timestamp column | Processing latency unmeasurable |

### Evidence Fields (on Evidence entity)

| Name | Purpose | Entity | Req Level | Storage | Risk if Omitted |
|---|---|---|---|---|---|
| `evidenceType` | Type classification | Evidence | Required | Enum column | Cannot specify required evidence types in gates |
| `sourceType` | Who provided (connector/system/analyst/external) | Evidence | Required | Enum column | Cannot distinguish system from human evidence |
| `confidence` | Evidence weight (0.0-1.0) | Evidence | Recommended | Float column | Cannot weight evidence |
| `observedAt` | When evidence was true | Evidence | Required | Timestamp column | Cannot assess freshness |
| `capturedAt` | When Commander captured | Evidence | Required | Timestamp column | Cannot measure capture latency |
| `expiresAt` | When evidence becomes stale | Evidence | Optional | Timestamp column | Cannot trigger revalidation |
| `contentRef` | Pointer to content store | Evidence | Required | String column | Cannot retrieve evidence content |
| `contentHash` | Immutability proof | Evidence | Required | String column | Cannot verify tamper-free |

### Observable Fields

| Name | Purpose | Entity | Req Level | Storage | Risk if Omitted |
|---|---|---|---|---|---|
| `observables[]` | Typed indicators | Risk Object | Recommended | JSONB array (max 50) or separate table | Threat correlation impossible |
| Observable `type` | Indicator type (ip/domain/hash/url/email/certificate/process/file) | Observable | Required | Enum | Cannot type indicators |
| Observable `value` | Indicator value | Observable | Required | String | N/A |
| Observable `firstSeen` / `lastSeen` | Temporal bounds | Observable | Recommended | Timestamps | Cannot track indicator lifespan |

### Case Aggregate Fields

| Name | Purpose | Entity | Req Level | Storage | Risk if Omitted |
|---|---|---|---|---|---|
| `affectedEntityCount` | Number of affected entities | Case | Computed | Integer column | Dashboard sort requires joins |
| `blastRadiusScore` | Scope of impact | Case | Computed | Float column | Priority blind to scope |
| `dwellTimeHours` | Detection-to-response gap | Case | Computed | Float column | CISO metric unavailable |
| `confidenceAggregate` | Min/max/mean confidence | Case | Computed | JSONB | Triage quality signal missing |
| `resolutionDurationHours` | Time to resolve | Case | Computed at closure | Float column | MTTR unavailable |
| `findingClassBreakdown` | Count by finding class | Case | Computed | JSONB | Case composition invisible |
| `sourceFindingCount` | Number of source findings | Case | Computed | Integer column | Case complexity invisible |

### Plural Entity Binding

| Name | Purpose | Entity | Req Level | Storage | Risk if Omitted |
|---|---|---|---|---|---|
| `affectedEntities[]` | Plural affected entity references | Risk Object | Required | JSONB array (max 500) or junction table | Data explosion at scale |

---

## 9. Data Efficiency / Database Strategy

### Design Principles

**What goes on entity (direct storage):**
- SourceClassification JSONB (~160 bytes)
- Extracted high-frequency query columns (sourceSeverityId, sourceConfidenceScore, findingClass)
- Bounded JSONB arrays (attacks[] max 20, observables[] max 50, affectedEntities[] max 500)
- Enum columns (tacticType, outcomeClassification, evidenceType)
- Timestamp columns (firstDetectedAt, lastConfirmedAt)

**What goes in separate table:**
- Evidence entity (high volume, separate lifecycle, content externalised)
- Observables (deduplicated, many-to-many binding for correlation)
- DetectionRule (reference data, lower volume)
- Verdict stream (time-series, entity carries summary)

**What goes to object store:**
- Raw source payloads
- Evidence content (scan reports, config snapshots, email bodies)
- Full communication threads
- Software inventory detail

**What is computed:**
- Case aggregates (attacks[], affectedEntityCount, blastRadiusScore, dwellTimeHours, confidenceAggregate, resolutionDurationHours)
- Identity verdictSummary
- Connector signalPurposesCovered

**What is materialised:**
- ATT&CK technique distribution (per tenant, hourly)
- Finding class breakdown (per tenant, hourly)
- Source severity distribution (per tenant, hourly)
- Confidence histogram (per tenant, hourly)
- Source product contribution (per tenant, daily)
- Remediation tactic distribution (per tenant, daily)

**What is archived:**
- Risk objects older than retention window (with all metadata intact)
- Closed cases older than retention window
- Evidence older than retention window
- Verdict stream older than retention window
- Raw payloads older than retention window

### Architecture Principle — Self-Describing Records

> **Every operational record must remain self-describing through hot, warm and cold storage.**

A record's structured classification metadata (source classification, ATT&CK, D3FEND, confidence, severity, observables, evidence references, analytic references) travels with it through every storage tier — hot operational storage, warm reporting/search storage, and cold archive/data lake storage. Metadata is never stripped during tiering, archival, or export. A record retrieved from the cold archive in year 10 must be interpretable — filterable, groupable, and reportable — without requiring Commander-specific runtime context or a live lookup against operational tables. This principle governs tiering, archival, and data lake export design.

### Efficiency Controls

- **Bounded arrays:** All JSONB arrays have documented maximums. Overflow routes to junction tables.
- **Extracted columns:** High-frequency query fields extracted from JSONB to dedicated indexed columns.
- **Tenant-first indexes:** Every index leads with tenant_id. Every query includes tenant context.
- **Hot/cold separation:** Active data in hot partition. Historical data in archive partition. Source classification travels with entity through all tiers.
- **Materialised views:** Dashboard aggregates pre-computed. Dashboards never query hot operational tables directly for analytics.
- **Write amplification control:** GIN indexes only on fields that are actually queried. Not all JSONB fields need GIN.
- **Observable deduplication:** Observable table with (type, value) natural key. Many-to-many binding. No duplication across risk objects.
- **Evidence content externalisation:** Metadata in relational table. Content in object store. Never store large content in PostgreSQL.

### Storage Estimates (per year at scale)

| Data | Volume | Storage |
|---|---|---|
| Risk Object source classification JSONB | 1M records × 160 bytes | ~160 MB |
| Risk Object attacks[] JSONB | 1M records × 100 bytes avg | ~100 MB |
| Extracted columns (severity, confidence, findingClass) | 1M records × 20 bytes | ~20 MB |
| GIN indexes on JSONB | ~2x JSONB size | ~520 MB |
| Evidence metadata | 5M records × 200 bytes | ~1 GB |
| Observable table | 2M unique × 100 bytes | ~200 MB |
| Materialised views | ~50 MB per tenant | Varies |
| **Total additional per year** | | **~2-3 GB** |

For context: raw source payloads at the same scale are 2-50 TB/year. The operational intelligence metadata is 0.01-0.15% of raw payload volume. Negligible.

---

## 10. Commander AI Considerations

### How the Proposal Supports Commander AI

| AI Capability | How Source Intelligence Helps |
|---|---|
| **Grounding** | AI cites specific source data (severity 4, confidence 0.92, ATT&CK T1078, product CrowdStrike) rather than inferring. Reduces hallucination. |
| **Explainability** | AI explains delta: "Source assessed High severity, Commander computed P3 because blast radius is 1 asset in non-production." |
| **Confidence handling** | Two distinct dimensions: source confidence (input) and Commander AI confidence (output). Never conflated. |
| **Hallucination resistance** | Structured fields provide ground truth. AI doesn't need to infer or fabricate source context. |
| **Evidence-based reasoning** | Typed evidence with confidence and freshness enables AI to assess sufficiency and recommend next steps. |
| **Retrieval quality** | Structured classification enables precise RAG: "Find high-confidence T1078 findings from CrowdStrike" — structured query, not semantic search. |
| **RAG performance** | Smaller, more precise retrieval sets. Less noise. Better context windows. |
| **Case summaries** | Pre-computed aggregates enable instant summaries without joining through risk objects. |
| **Recommendations** | D3FEND tactic history enables "For T1078, Isolate has 94% success rate" recommendations. |
| **Auditability** | AI audit records reference specific source intelligence. Verifiable. Reproducible. |
| **Future model tuning** | Structured classification = labelled training data. Source confidence + outcome = calibration signal. |

### Key AI Architecture Principle

> Source confidence and Commander AI confidence are distinct fields with distinct semantics. Source confidence is an input to AI reasoning; Commander AI confidence is an output of AI reasoning. They must not be conflated in schema, UI, or AI logic.

---

## 11. Reporting / Dashboard / Search Implications

### Enabled Capabilities

| Capability | How Enabled |
|---|---|
| Filter by source finding class | `sourceClassification.findingClass` column/index |
| Filter by ATT&CK technique | `attacks[]` JSONB with GIN index or materialised view |
| Filter by D3FEND tactic | `tacticType` enum column on Sub-Action |
| Confidence trends over time | `sourceConfidenceScore` column + time-series query |
| Source quality reporting | `sourceProductId` + `sourceConfidenceScore` aggregation |
| Case breakdowns | `findingClassBreakdown` computed field on Case |
| Remediation posture analytics | `tacticType` distribution materialised view |
| Compliance reporting | `complianceRefs[]` on Risk Object (where populated) |
| Detection engineering metrics | `detectionRuleRef` + false positive rate tracking |
| Source-vs-Commander delta analysis | `sourceSeverityId` vs `priority` comparison |

### Dashboard Architecture

- **Operational dashboards** use Commander governance fields (priority, status, owner, SLA). Hot queries against canonical tables.
- **Intelligence dashboards** use classification fields (ATT&CK, finding class, confidence, source product). Queries against materialised views.
- **Both coexist.** Same entity carries both dimensions. No separate data store required.

---

## 12. Risks and Controls

### Architecture Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Governance boundary erosion (source fields influencing lifecycle) | Medium | High | Technical enforcement: source fields are read-only, never inputs to resolvers. Cultural enforcement: training. |
| OCSF evolution divergence | Low | Low | Commander owns its enums. Annual review of OCSF changes. No automatic coupling. |
| Analyst cognitive load (two severity fields) | Medium | Medium | UI clearly distinguishes provenance context from operational authority. Commander priority is prominent; source severity is contextual. |
| Observable volume at scale | Medium | Medium | Deduplication table. Bounded arrays. Retention policy. |
| Evidence entity becoming dumping ground | Medium | Medium | Strict type taxonomy. Bounded per case. Retention policy. |

### Data Bloat Risks

| Risk | Mitigation |
|---|---|
| JSONB overuse on high-volume tables | Extract high-frequency fields to columns. Bound arrays. Monitor row size. |
| Unbounded arrays | Document maximums in attribute dictionary. Enforce at write time. Overflow to junction tables. |
| GIN index bloat | Index only queried fields. Monitor index size. Consider partial indexes. |
| Write amplification | Batch writes where possible. Async index updates for non-critical paths. |

### OCSF-Specific Risks

| Risk | Mitigation |
|---|---|
| Over-adoption (creeping toward OCSF as authority) | Scoped "check first" principle. Governance structures explicitly excluded. Annual review. |
| Under-adoption (ignoring useful OCSF patterns) | "Check first" principle ensures architects consider OCSF before inventing. |
| Schema coupling to OCSF versions | Commander owns its enums. OCSF informs, doesn't bind. |

---

## 13. Decisions to Accept

| # | Decision | Rationale |
|---|---|---|
| 1 | Model B: source classification metadata survives normalisation | Irreversibility. Storage negligible. Value permanent. |
| 2 | OCSF "check first" principle for classification/taxonomy structures | Prevents reinvention. Ensures industry alignment. Scoped to classification only. |
| 3 | OCSF as source classification reference (not authority) | Doctrine assertion #6 preserved. Commander owns its model. |
| 4 | Commander Operational Intelligence Model (COIM) as new architectural layer | Fills the gap between governance (strong) and intelligence (under-specified). |
| 5 | Source intelligence persists through lifecycle | Immutable after write. Available for all downstream uses. Never governs. |
| 6 | Source intelligence informs but never governs | Technical and cultural boundary. Source fields are read-only provenance. |
| 7 | Evidence as first-class entity | Doctrine requires it. No queryable home exists today. |
| 8 | ATT&CK as structured queryable fields | Enables heat maps, correlation, technique-based analytics. |
| 9 | D3FEND tactic classification on Sub-Actions | Enables remediation posture analytics. |
| 10 | Every operational record must remain self-describing through hot, warm and cold storage | Data lake exports and archives carry both governance and intelligence metadata; records remain interpretable at every storage tier without Commander-specific runtime context. |
| 11 | Multi-timestamp model | Distinct semantics for source detection, source confirmation, Commander ingestion, Commander processing. |
| 12 | Bounded arrays as design principle | All JSONB arrays have documented maximums. |
| 13 | Source confidence and Commander AI confidence are distinct | Prevents conflation in schema, UI, and AI logic. |
| 14 | Risk Object carries plural affected entities | Prevents data explosion at scale. |
| 15 | Reusable composed objects as design pattern | Attack, Evidence, Observable, SourceProduct, Analytic defined once, composed into entities. |

---

## 14. Decisions to Reject

| # | Decision | Rationale |
|---|---|---|
| 1 | OCSF as Commander canonical model | Doctrine assertion #6. Commander is authoritative. |
| 2 | OCSF lifecycle model (New/In Progress/Resolved) | Conflicts with closed-loop doctrine. |
| 3 | OCSF risk_score/risk_level as priority input | Commander computes priority through strategy layer. |
| 4 | Source status driving Commander lifecycle transitions | Source status is informational metadata only. |
| 5 | Vendor-specific schema extensions | Commander has one universal model. No fragmentation. |
| 6 | Wholesale OCSF attribute adoption (800+) | Commander needs 50-80 well-chosen attributes. Selectivity essential. |
| 7 | Unbounded metadata arrays | All arrays bounded. Documented maximums. Overflow to junction tables. |
| 8 | OCSF disposition replacing Commander verdict model | Commander's verdict semantics are richer. Extend, don't replace. |
| 9 | Source risk_score preservation | Severity is preserved (classification). Risk_score is not (computation that conflicts with Commander priority). |
| 10 | OCSF schema versioning model (deprecation-heavy) | Commander evolves through addition. No deprecation. |

---

## 15. Proposed Follow-On Architecture Work

These are architecture artefacts to produce, not build tasks to execute:

| # | Artefact | Purpose |
|---|---|---|
| 1 | COIM v1.0 Specification | Define the Commander Operational Intelligence Model formally. Composed objects, requirement levels, storage patterns, boundary rules. |
| 2 | Commander Attribute Dictionary | Single authoritative definition of every field across all entities. Type, requirement level, semantic description, source authority. |
| 3 | Reusable Object Catalogue | Define Attack, Evidence, Observable, SourceProduct, SourceClassification, Analytic (broad — spanning detection rule, analytic rule, Sigma, YARA, ML model, UEBA model, vendor model, security control analytic), and ComplianceBinding as reusable composed objects with clear contracts. |
| 4 | Evidence Model Specification | Type taxonomy, source attribution, confidence model, temporal model, immutability model, binding model, retention model. |
| 5 | Source Classification Model | Define SourceClassification object shape, enum values, requirement levels, storage pattern, extraction rules. |
| 6 | Data Efficiency Model | Define what goes on entity vs separate table vs object store vs computed vs materialised vs archived. Bounded array limits. Index strategy. |
| 7 | Data Lake Export Schema | Define self-describing export record shape. Partitioning strategy. Columnar format. Tenant isolation in exports. |
| 8 | AI Grounding Model | Define how Commander AI accesses source intelligence. Confidence separation. Audit record shape. RAG index strategy. |

---

## 16. Final Recommendation

### Status: ACCEPTED (Owner-Approved 2026-06-01)

The architecture position is accepted as a binding architecture decision. It is a design principle, not an implementation commitment. Acceptance:
- Costs nothing to accept (no code changes, no schema changes, no build schedule changes)
- Prevents permanent regret (source intelligence captured at ingestion is preserved; not captured is permanently lost)
- Provides clear guidance for all future schema design work
- Aligns Commander AI, reporting, dashboarding, and data lake strategy

### What Was Committed as Decision

Recorded in DECISIONS.md as **DEC-coim-ocsf-source-classification-architecture** — "Accept COIM and OCSF-informed source classification architecture." See that entry for the full decision text. In summary: Commander accepts COIM as a formal architecture layer; adopts an OCSF-informed source classification model for all ingestion pipelines regardless of source format; preserves source intelligence as immutable metadata through the lifecycle; source intelligence informs but never governs; Commander AI may reason over source intelligence but AI confidence/outputs are Commander-owned; every operational record remains self-describing through hot, warm and cold storage. Implementation deferred to later controlled architecture/specification work.

### What NOT to Implement Yet

- No schema changes during pack validation
- No code changes during pack validation
- No new entities created during pack validation
- No build schedule changes
- Follow-on architecture artefacts (COIM v1.0, Attribute Dictionary, etc.) are produced as architecture documents, not build tasks

### Owner Approval Required

This decision requires explicit owner approval because it:
- Establishes a new architectural layer (COIM)
- Introduces new design principles that affect all future schema work
- Commits to metadata survivability as a permanent principle
- References OCSF as a schema engineering input (per doctrine assertion #6, external material requires controlled acceptance)

---

## References

### Commander Authority Documents

- `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/29_Universal_Risk_Object_and_Case_Binding_Spec.md`
- `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/12_SDR_Normalisation_Strategy.md`
- `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/62_Verdict_Semantics_Specification.md`
- `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/61_Universal_Security_Signal_Connector_Contract_Spec.md`
- `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/05_Data_Connector_Normalisation_Implementation_Spec_v1_5.md`
- `docs/knowledge/DATA_DICTIONARY.md`

### OCSF Reference Documents

- `docs/03_api_specs/ocsf/OCSF_REFERENCE_NOTE.md`
- `docs/03_api_specs/ocsf/ocsf-schema/` (local clone, v1.8.0)
- Key objects reviewed: `base_event.json`, `metadata.json`, `product.json`, `attack.json`, `vulnerability.json`, `compliance.json`, `analytic.json`, `observable.json`, `enrichment.json`, `evidences.json`, `d3fend.json`, `finding_info.json`
- Key events reviewed: `vulnerability_finding.json`, `iam_analysis_finding.json`, `detection_finding.json`, `compliance_finding.json`, `remediation_activity.json`
- Key profiles reviewed: `security_control.json`, `incident.json`, `data_classification.json`

---

*End of proposal. Pending owner review and acceptance.*
