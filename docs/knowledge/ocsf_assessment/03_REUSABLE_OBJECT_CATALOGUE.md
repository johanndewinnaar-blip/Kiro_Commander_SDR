# Commander Reusable Object Catalogue

**Document ID:** REUSABLE_OBJECT_CATALOGUE  
**Status:** ARCHITECTURE DEFINITION — Accepted  
**Date:** 2026-06-01  
**Authority:** DEC-coim-ocsf-source-classification-architecture (DECISIONS.md)  
**Parent:** COIM v1.0 (01_COIM_v1_0.md)  
**Scope:** Formal definition of reusable COIM composed objects  
**Source Authority:**
- DEC-coim-ocsf-source-classification-architecture (DECISIONS.md)
- docs/knowledge/ocsf_assessment/COMMANDER_DATA_OCSF_OPERATIONAL_INTELLIGENCE_PROPOSAL.md
- docs/knowledge/ocsf_assessment/01_COIM_v1_0.md
- docs/knowledge/ocsf_assessment/02_SOURCE_CLASSIFICATION_MODEL.md
- docs/03_api_specs/ocsf/OCSF_REFERENCE_NOTE.md
- Commander doctrine assertion #6 (reference-input boundary)

---

## 1. Purpose

This catalogue defines the reusable composed objects that form the Commander Operational Intelligence Model (COIM). These objects are designed for composition, reuse, and consistent application across Commander's canonical entities.

**What this catalogue provides:**
- Formal definition of each reusable object
- Ownership boundaries (source vs Commander)
- Entity consumption patterns
- OCSF influence and reference
- Requirement posture (required/recommended/optional)
- Storage posture (direct/referenced/computed/materialised/archived)

**What this catalogue does NOT provide:**
- Implementation code or schema definitions
- Build tasks or migration scripts
- Assessment or evaluation
- Options or alternatives

---

## 2. Object Catalogue

### 2.1 SourceClassification

**Purpose:**  
Structured record of what the source reported about a finding. Preserves source-provided metadata as immutable provenance.

**Ownership Boundary:**  
- **Source-owned fields:** findingClass, sourceSeverity, sourceConfidence, sourceProduct, sourceFindingUid, sourceActivity, attacks[], observables[]
- **Commander-owned:** Entity lifecycle, priority computation, routing, validation, closure

**Consumed By:**  
- Risk Object (required)
- Asset (recommended for discovery signals)
- Identity (recommended for IAM signals)

**OCSF Influence:**  
- finding_info.json — finding classification structure
- vulnerability.json — vulnerability-specific fields
- compliance.json — compliance-specific fields
- detection_finding.json — detection-specific fields

**Requirement Posture:**  
- Required on Risk Object
- Recommended on Asset (discovery signals)
- Recommended on Identity (IAM signals)

**Storage Posture:**  
- **Direct:** JSONB on entity (~160 bytes)
- **Extracted:** High-frequency fields (severityId, confidenceScore, findingClass) to dedicated columns for indexing
- **Archived:** Preserved in data lake exports (self-describing records)

---

### 2.2 AttackMapping

**Purpose:**  
Structured MITRE ATT&CK tactic/technique/sub-technique binding. Enables ATT&CK heat maps, campaign correlation, technique-based analytics.

**Ownership Boundary:**  
- **Source-owned fields:** tactic, technique, techniqueName, subTechnique, subTechniqueName, version
- **Commander-owned:** ATT&CK does not drive routing or priority; it informs analytics and reporting only

**Consumed By:**  
- Risk Object (recommended — populated where source provides it)
- Case (computed — aggregated from bound Risk Objects)
- Analytic entity (recommended — analytic-to-ATT&CK binding)

**OCSF Influence:**  
- attack.json object — tactic/technique structure
- ATT&CK framework version tracking

**Requirement Posture:**  
- Recommended on Risk Object (populated where source provides it)
- Computed on Case (aggregated from bound Risk Objects)
- Recommended on Analytic entity

**Storage Posture:**  
- **Direct:** JSONB array on Risk Object (bounded, max 20 entries)
- **Computed:** Aggregated on Case from bound Risk Objects
- **Materialised:** Dashboard aggregates for ATT&CK heat maps
- **Archived:** Preserved in data lake exports

---

### 2.3 D3FENDMapping

**Purpose:**  
D3FEND tactic classification on remediation actions. Enables remediation posture analytics, D3FEND coverage measurement, defence effectiveness reporting.

**Ownership Boundary:**  
- **Source-owned fields:** tacticType (isolate/evict/restore/harden/detect), countermeasures[]
- **Commander-owned:** Sub-action lifecycle, approval chains, push governance, rollback-first design

**Consumed By:**  
- Sub-Action (required)
- Remediation Template (required)

**OCSF Influence:**  
- remediation_activity.json — D3FEND activity_id field
- d3fend.json object — D3FEND tactic structure

**Requirement Posture:**  
- Required on Sub-Action
- Required on Remediation Template

**Storage Posture:**  
- **Direct:** Enum column for tacticType
- **Direct:** JSONB array for countermeasures[] (bounded, max 10)
- **Materialised:** Dashboard aggregates for D3FEND coverage
- **Archived:** Preserved in data lake exports

---

### 2.4 EvidenceRef

**Purpose:**  
Reference to typed, timestamped, confidence-weighted evidence artifacts. Enables evidence-driven validation, evidence-gated closure, evidence-triggered reopening.

**Ownership Boundary:**  
- **Source-owned fields:** evidenceType, source, collectedAt, contentRef, immutabilityHash
- **Commander-owned:** Evidence binding to cases/sub-actions/validation, freshness evaluation, gate satisfaction, confidence assessment

**Consumed By:**  
- Case (required — evidence binding)
- Sub-Action (optional — evidence binding)
- Validation Decision (required — evidence-gated validation)

**OCSF Influence:**  
- evidences.json object — evidence structure
- verdict_id on evidence — verdict binding pattern

**Requirement Posture:**  
- Required on Case (evidence binding)
- Optional on Sub-Action (evidence binding)
- Required on Validation Decision (evidence-gated validation)

**Storage Posture:**  
- **Referenced:** Evidence entity in separate table
- **Direct:** Evidence metadata (type, source, confidence, timestamps) queryable
- **Referenced:** Evidence content in object store (pointer from metadata)
- **Archived:** Evidence metadata preserved in data lake; content retention-governed

---

### 2.5 Observable

**Purpose:**  
Typed indicator extraction (IP, domain, hash, URL, email, certificate, process, file). Enables threat intelligence correlation, cross-case matching, indicator-based search.

**Ownership Boundary:**  
- **Source-owned fields:** observableType, value, firstSeen, lastSeen
- **Commander-owned:** Observable-to-entity binding, threat intelligence matching, cross-case correlation, reputation (enrichment-derived)

**Consumed By:**  
- Risk Object (recommended — bounded array or reference)
- Case (computed — aggregated from bound Risk Objects)
- Threat Intelligence stream (consumed for correlation)

**OCSF Influence:**  
- observable.json object — observable structure
- type_id enum — observable type taxonomy (ip/domain/hash/url/email/certificate/process/file)

**Requirement Posture:**  
- Recommended on Risk Object (populated where source provides it)
- Computed on Case (aggregated from bound Risk Objects)

**Storage Posture:**  
- **Direct:** Bounded JSONB array on Risk Object (max 50 entries) with overflow to separate table
- **Referenced:** Separate Observable table with many-to-many binding (deduplication)
- **Computed:** Aggregated on Case from bound Risk Objects
- **Materialised:** Search indexes for indicator-based search
- **Archived:** Preserved in data lake exports

---

### 2.6 SourceProduct

**Purpose:**  
Structured identification of the source tool (vendor, name, version, uid, connectorClass). Enables source quality analytics, connector ROI, multi-source deduplication.

**Ownership Boundary:**  
- **Source-owned fields:** vendor, name, version, uid
- **Commander-owned:** connectorClass (A/B/C/D), source quality measurement, connector ROI analytics

**Consumed By:**  
- Risk Object (required — part of SourceClassification)
- Verdict (required — source product identification)
- Connector entity (required — connector metadata)

**OCSF Influence:**  
- product.json object — product structure
- vendor/name/version/uid fields

**Requirement Posture:**  
- Required on Risk Object (part of SourceClassification)
- Required on Verdict (source product identification)
- Required on Connector entity

**Storage Posture:**  
- **Direct:** Part of SourceClassification JSONB on Risk Object
- **Extracted:** Vendor + name to dedicated columns for indexing
- **Referenced:** Connector entity for full connector metadata
- **Materialised:** Dashboard aggregates for source quality analytics
- **Archived:** Preserved in data lake exports

---

### 2.7 Analytic

**Purpose:**  
Reference to the analytic that produced a finding or verdict. Broad reusable concept spanning detection rules, ML models, UEBA models, vendor models, security control analytics.

**Ownership Boundary:**  
- **Source-owned fields:** analyticId, analyticName, analyticType, version, state
- **Commander-owned:** Analytic lifecycle, effectiveness measurement, drift rule engine, model attribution, falsePositiveRate, attacks[] (analytic-to-ATT&CK binding)

**Consumed By:**  
- Risk Object (recommended — reference to analytic that produced finding)
- Verdict (recommended — reference to analytic that produced verdict)
- Analytic entity (required — full analytic metadata)

**OCSF Influence:**  
- analytic.json object — analytic structure
- type_id enum — analytic type taxonomy (Rule/Behavioral/Statistical/ML)

**Requirement Posture:**  
- Recommended on Risk Object (populated where source provides it)
- Recommended on Verdict (populated where analytic produced verdict)
- Required as separate Analytic entity

**Storage Posture:**  
- **Referenced:** Reference fields (analyticId + analyticType) on Risk Object/Verdict
- **Referenced:** Full analytic metadata in separate Analytic entity/table
- **Materialised:** Dashboard aggregates for detection engineering metrics
- **Archived:** Analytic metadata preserved in data lake exports

---

### 2.8 ComplianceBinding

**Purpose:**  
Framework + control + requirement reference on findings. Enables compliance posture reporting without reverse-engineering source data.

**Ownership Boundary:**  
- **Source-owned fields:** framework, control, requirement, status
- **Commander-owned:** Compliance posture aggregation, compliance case routing

**Consumed By:**  
- Risk Object (optional — compliance findings)
- Case (computed — aggregated from bound Risk Objects)

**OCSF Influence:**  
- compliance.json object — compliance structure
- framework/control/requirement fields

**Requirement Posture:**  
- Optional on Risk Object (populated where source provides it)
- Computed on Case (aggregated from bound Risk Objects)

**Storage Posture:**  
- **Direct:** JSONB array on Risk Object (bounded, max 20 entries)
- **Computed:** Aggregated on Case from bound Risk Objects
- **Materialised:** Dashboard aggregates for compliance posture reporting
- **Archived:** Preserved in data lake exports

---

### 2.9 EnrichmentRef

**Purpose:**  
Display-time context (geo, reputation, threat intel, whois) that doesn't pollute the core record. Enables context for dashboards and AI without storing volatile data on immutable entities.

**Ownership Boundary:**  
- **Source-owned fields:** enrichmentType, value, source, timestamp
- **Commander-owned:** Enrichment cache management, refresh policy, ttl

**Consumed By:**  
- NOT stored on entity
- Queried at display time from enrichment cache
- Consumed by dashboards, AI reasoning, search results

**OCSF Influence:**  
- enrichment.json object — enrichment structure
- enrichmentType enum (geo/reputation/threat_intel/whois)

**Requirement Posture:**  
- Optional (display-time only)
- NOT required on any entity

**Storage Posture:**  
- **Referenced:** Enrichment cache (separate from entities)
- **NOT Direct:** NOT stored on entity
- **NOT Archived:** NOT preserved in data lake (volatile, refreshable)

---

### 2.10 Confidence

**Purpose:**  
Source-assessed confidence in the finding (enum + numeric score). Enables trust calibration, source quality analytics, AI reasoning, confidence-weighted triage.

**Ownership Boundary:**  
- **Source-owned fields:** confidenceLevel (unknown/low/medium/high), confidenceScore (0-100)
- **Commander-owned:** Confidence does not drive priority; it informs analytics and AI reasoning only

**Consumed By:**  
- Risk Object (required — part of SourceClassification)
- Verdict (required — source confidence in verdict)

**OCSF Influence:**  
- confidence_id enum — confidence level structure
- Numeric score (0-100) pattern

**Requirement Posture:**  
- Required on Risk Object (part of SourceClassification)
- Required on Verdict (source confidence in verdict)

**Storage Posture:**  
- **Direct:** Part of SourceClassification JSONB on Risk Object
- **Extracted:** confidenceScore to dedicated column for indexing
- **Materialised:** Dashboard aggregates for source quality analytics
- **Archived:** Preserved in data lake exports

---

### 2.11 Severity

**Purpose:**  
Source-assessed severity (enum: informational/low/medium/high/critical). Preserved independently of Commander priority. Enables source calibration, audit, analyst trust, reporting.

**Ownership Boundary:**  
- **Source-owned fields:** severityLevel (enum), severityId (numeric 1-5)
- **Commander-owned:** Severity does NOT drive Commander priority; Commander priority is strategy-driven and multi-factor

**Consumed By:**  
- Risk Object (required — part of SourceClassification)

**OCSF Influence:**  
- severity_id enum — severity level structure (informational/low/medium/high/critical)
- Numeric ID (1-5) pattern

**Requirement Posture:**  
- Required on Risk Object (part of SourceClassification)

**Storage Posture:**  
- **Direct:** Part of SourceClassification JSONB on Risk Object
- **Extracted:** severityId to dedicated column for indexing
- **Materialised:** Dashboard aggregates for severity distribution reporting
- **Archived:** Preserved in data lake exports

---

### 2.12 TimelineMarker

**Purpose:**  
Multiple timestamps with distinct semantics. Enables dwell time calculation, staleness detection, freshness evaluation, SLA accuracy.

**Ownership Boundary:**  
- **Source-owned fields:** firstDetectedAt (source timestamp), lastConfirmedAt (source timestamp)
- **Commander-owned fields:** ingestedAt (system timestamp), normalisedAt (system timestamp)

**Consumed By:**  
- Risk Object (required — firstDetectedAt, lastConfirmedAt, ingestedAt, normalisedAt)
- Asset (recommended — lastConfirmedAt)
- Identity (recommended — lastAuthenticatedAt)
- Case (computed — dwellTimeHours from firstDetectedAt to case creation)

**OCSF Influence:**  
- time, start_time, end_time, modified_time fields — timestamp structure patterns
- Timestamp semantics (source vs system)

**Requirement Posture:**  
- Required on Risk Object (firstDetectedAt, ingestedAt, normalisedAt)
- Recommended on Risk Object (lastConfirmedAt)
- Recommended on Asset (lastConfirmedAt)
- Recommended on Identity (lastAuthenticatedAt)

**Storage Posture:**  
- **Direct:** Timestamp columns on entities
- **Indexed:** All timestamp columns indexed for range queries
- **Computed:** dwellTimeHours on Case (computed from firstDetectedAt to case creation)
- **Materialised:** Dashboard aggregates for dwell time analytics
- **Archived:** Preserved in data lake exports

---

## 3. Composition Patterns

### 3.1 Nested Composition

**Pattern:** Objects contain other objects.

**Example:** SourceClassification contains SourceProduct, Confidence, Severity, AttackMapping[], Observable[].

**Rationale:** Reduces duplication, enables consistent structure, simplifies querying.

---

### 3.2 Reference Composition

**Pattern:** Objects reference other objects by ID.

**Example:** Risk Object references Analytic by analyticId + analyticType.

**Rationale:** Deduplication (many findings may reference the same analytic), separate lifecycle management.

---

### 3.3 Aggregated Composition

**Pattern:** Objects aggregate data from other objects.

**Example:** Case aggregates AttackMapping[] from bound Risk Objects.

**Rationale:** Case-level analytics require aggregation, avoids redundant storage.

---

### 3.4 Display-Time Composition

**Pattern:** Objects queried at display time, not stored on entity.

**Example:** EnrichmentRef queried from enrichment cache at display time.

**Rationale:** Volatile data (geo, reputation) should not pollute immutable entities.

---

## 4. Storage Posture Definitions

### 4.1 Direct

**Definition:** Object stored directly on the entity (JSONB or columns).

**When to use:** High-frequency access, must be queryable without joins, bounded size.

**Examples:** SourceClassification JSONB on Risk Object, Confidence/Severity extracted to columns.

---

### 4.2 Referenced

**Definition:** Object stored in a separate table, referenced by ID.

**When to use:** Deduplication, separate lifecycle management, unbounded size.

**Examples:** Analytic entity referenced by analyticId, Evidence entity referenced by evidenceId.

---

### 4.3 Computed

**Definition:** Object aggregated or computed from other entities.

**When to use:** Case-level analytics, derived metrics, aggregation from bound entities.

**Examples:** Case attacks[] aggregated from bound Risk Objects, dwellTimeHours computed from timestamps.

---

### 4.4 Materialised

**Definition:** Object pre-computed and stored in a materialised view.

**When to use:** Dashboard aggregates, reporting read models, query performance optimization.

**Examples:** ATT&CK heat maps, source quality analytics, compliance posture dashboards.

---

### 4.5 Archived

**Definition:** Object preserved in long-term storage (data lake).

**When to use:** Compliance, historical analytics, self-describing exports.

**Examples:** All source classification metadata preserved in Parquet format, partitioned by tenant + year + month + findingClass.

---

## 5. Requirement Posture Definitions

### 5.1 Required

**Definition:** Object MUST be present on the entity.

**When to use:** Core operational metadata, mandatory provenance, governance-critical fields.

**Examples:** SourceClassification on Risk Object, D3FENDMapping on Sub-Action, EvidenceRef on Validation Decision.

---

### 5.2 Recommended

**Definition:** Object SHOULD be present where the source provides it.

**When to use:** Valuable but not universally available, source-dependent, analytics-enhancing.

**Examples:** AttackMapping on Risk Object (populated where source provides it), Observable on Risk Object.

---

### 5.3 Optional

**Definition:** Object MAY be present where relevant.

**When to use:** Niche use cases, compliance-specific, enrichment-dependent.

**Examples:** ComplianceBinding on Risk Object (compliance findings only), EnrichmentRef (display-time only).

---

## 6. OCSF Influence Summary

### 6.1 Direct OCSF Object Mapping

| COIM Object | OCSF Object | Influence |
|---|---|---|
| SourceClassification | finding_info.json | Structure, field names, enum values |
| AttackMapping | attack.json | Tactic/technique structure |
| D3FENDMapping | remediation_activity.json, d3fend.json | D3FEND tactic structure |
| EvidenceRef | evidences.json | Evidence structure, type taxonomy |
| Observable | observable.json | Observable structure, type taxonomy |
| SourceProduct | product.json | Product structure, vendor/name/version |
| Analytic | analytic.json | Analytic structure, type taxonomy |
| ComplianceBinding | compliance.json | Compliance structure, framework/control |
| EnrichmentRef | enrichment.json | Enrichment structure, type taxonomy |
| Confidence | confidence_id enum | Confidence level structure |
| Severity | severity_id enum | Severity level structure |
| TimelineMarker | time, start_time, end_time | Timestamp structure patterns |

---

### 6.2 OCSF as Schema Engineering Reference

OCSF is used as:
- The primary schema engineering reference for field design
- A reference for object composition (how to structure reusable objects)
- A reference for enum design (how to normalise classifications)
- A reference for observable typing (how to type indicators)
- A reference for evidence structure (how to model evidence artifacts)

OCSF is NOT used as:
- Commander authority
- A replacement for Commander's canonical model
- A lifecycle model
- A priority/risk computation model
- A routing or governance model
- A binding standard that Commander must conform to

---

## 7. Ownership Boundary Summary

### 7.1 Source-Owned Fields (Immutable)

**Definition:** Fields written once during normalisation, never mutated.

**Examples:**
- SourceClassification: findingClass, sourceSeverity, sourceConfidence, sourceProduct, sourceFindingUid
- AttackMapping: tactic, technique, subTechnique, version
- Observable: observableType, value, firstSeen, lastSeen
- TimelineMarker: firstDetectedAt, lastConfirmedAt

---

### 7.2 Commander-Owned Fields (Mutable)

**Definition:** Fields computed, managed, or updated by Commander governance/strategy layers.

**Examples:**
- Risk Object: priority, route, lifecycleState, validationState, closureGateState
- Case: blastRadiusScore, dwellTimeHours, affectedEntityCount
- TimelineMarker: ingestedAt, normalisedAt

---

### 7.3 Hybrid Fields (Source + Commander)

**Definition:** Fields with source-provided values enriched by Commander.

**Examples:**
- Observable: reputation (source provides value, Commander enriches with reputation score)
- Analytic: falsePositiveRate (source may provide, Commander tracks and updates)

---

## End of Document

