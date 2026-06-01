# Commander Evidence Model

**Document ID:** EVIDENCE_MODEL  
**Status:** ARCHITECTURE DEFINITION — Accepted  
**Date:** 2026-06-01  
**Authority:** DEC-coim-ocsf-source-classification-architecture (DECISIONS.md)  
**Parent:** COIM v1.0 (01_COIM_v1_0.md)  
**Scope:** Formal definition of Commander's evidence architecture  
**Source Authority:**
- DEC-coim-ocsf-source-classification-architecture (DECISIONS.md)
- docs/knowledge/ocsf_assessment/COMMANDER_DATA_OCSF_OPERATIONAL_INTELLIGENCE_PROPOSAL.md
- docs/knowledge/ocsf_assessment/01_COIM_v1_0.md (COIM Component 4.4 Evidence)
- docs/knowledge/ocsf_assessment/02_SOURCE_CLASSIFICATION_MODEL.md
- docs/knowledge/ocsf_assessment/03_REUSABLE_OBJECT_CATALOGUE.md (Section 2.4 EvidenceRef)
- docs/03_api_specs/ocsf/OCSF_REFERENCE_NOTE.md (evidences.json)
- Commander doctrine assertion #1 (closed-loop case model requires evidence-driven validation)

---

## 1. Purpose

The Commander Evidence Model defines how Commander structures, preserves, and reasons over evidence artifacts throughout the security drift response lifecycle.

**What it answers:**
- What evidence exists for this case?
- What type of evidence is it?
- How confident are we in this evidence?
- When was this evidence collected?
- Is this evidence still fresh or has it expired?
- What validation decisions does this evidence support?

**What it does NOT answer:**
- What should Commander do with this evidence? (Governance layer)
- Does this evidence satisfy closure gates? (Closure gate evaluation)
- Should this case reopen based on evidence? (Reopening trigger evaluation)

Evidence is **typed, timestamped, confidence-weighted provenance**. It informs but never governs.

---

## 2. Relationship to COIM

The Evidence Model is **COIM Component 4.4** and operates across multiple COIM architecture layers:

**Layer 1 (Raw Source Layer):** Evidence content stored in object store (S3/equivalent).

**Layer 4 (Commander Operational Intelligence Layer):** Evidence metadata (type, source, confidence, timestamps) structured and queryable.

**Layer 5 (Commander Canonical Entity Layer):** Evidence entity as first-class operational entity.

**Layer 6 (Risk/Case/Verdict/Action Layer):** Evidence binding to cases, sub-actions, validation decisions.

**Layer 7 (Reporting/Dashboard/Search Layer):** Evidence aggregates for case evidence coverage reporting.

**Layer 8 (Archive/Data Lake Layer):** Evidence metadata preserved; content retention-governed per tenant policy.

**Layer 9 (Commander AI Layer):** Evidence consumed for AI reasoning, grounding, and explanation.

---

## 3. Relationship to OCSF

### OCSF as Schema Engineering Reference

OCSF evidences.json object informs:
- Evidence type taxonomy (log/scan/verdict/screenshot/config/network_capture/file_hash/process_dump)
- Evidence structure (type, source, timestamp, content reference)
- Evidence confidence pattern (numeric score 0-100)
- Evidence immutability pattern (hash-based integrity)

### What OCSF Is NOT

- NOT Commander authority for evidence lifecycle
- NOT a replacement for Commander's evidence-gated validation model
- NOT a replacement for Commander's evidence-triggered reopening model
- NOT a binding standard for evidence retention policy

### "Check OCSF First" Principle

Before introducing a new evidence type, evidence attribute, or evidence structure, architects must first determine whether an equivalent concept exists within OCSF evidences.json. Where OCSF provides a well-designed equivalent, Commander's design should be informed by it.

---

## 4. Evidence Lifecycle

Evidence flows through five lifecycle phases:

### 4.1 Collection

**What happens:** Evidence is collected from sources (connectors, analysts, system).

**Who collects:** Ingestion pipeline (connector-sourced), analyst (manual upload), system (automated capture).

**When:** During case investigation, validation, or reopening evaluation.

**Output:** Raw evidence content + metadata (type, source, timestamp).

---

### 4.2 Normalisation

**What happens:** Evidence metadata is structured into Commander's evidence model.

**Who normalises:** Normalisation pipeline.

**When:** Immediately after collection.

**Output:** Evidence entity with structured metadata (type, source, confidence, timestamps, immutabilityHash).

---

### 4.3 Binding

**What happens:** Evidence is bound to cases, sub-actions, or validation decisions.

**Who binds:** Case management engine, validation engine.

**When:** During case creation, validation, or reopening evaluation.

**Output:** Evidence-to-case binding, evidence-to-sub-action binding, evidence-to-validation-decision binding.

---

### 4.4 Evaluation

**What happens:** Evidence freshness, confidence, and relevance are evaluated.

**Who evaluates:** Validation engine, closure gate engine, reopening trigger engine.

**When:** During validation, closure gate evaluation, reopening trigger evaluation.

**Output:** Evidence freshness status (fresh/stale/expired), evidence confidence assessment, evidence relevance score.

---

### 4.5 Retention

**What happens:** Evidence content is retained or purged per tenant policy.

**Who retains:** Retention policy engine.

**When:** Per tenant retention schedule (e.g., 90 days hot, 1 year warm, 7 years cold).

**Output:** Evidence content moved to cold storage or purged; metadata preserved.

---

## 5. Evidence Ownership Model

### 5.1 Source-Owned Fields (Immutable)

**Definition:** Fields written once during collection, never mutated.

**Fields:**
- `evidenceType` — Type classification (log/scan/verdict/screenshot/config/network_capture/file_hash/process_dump)
- `source` — Evidence source (connector, analyst, system)
- `collectedAt` — Timestamp when evidence was collected
- `contentRef` — Pointer to evidence content in object store
- `immutabilityHash` — SHA-256 hash of evidence content

**Rationale:** Evidence provenance is immutable. Mutating it destroys audit integrity.

---

### 5.2 Commander-Owned Fields (Mutable)

**Definition:** Fields computed, managed, or updated by Commander governance/strategy layers.

**Fields:**
- `confidence` — Confidence in evidence validity (0-100) — may be updated based on validation
- `expiresAt` — Timestamp when evidence becomes stale (computed from collectedAt + freshness policy)
- `caseId` — Bound case (required)
- `subActionId` — Bound sub-action (optional)
- `validationDecisionId` — Bound validation decision (optional)
- `freshnessStatus` — Freshness evaluation (fresh/stale/expired) — computed at evaluation time

**Rationale:** Commander evaluates evidence freshness, confidence, and relevance. These are Commander-owned assessments, not source-provided.

---

## 6. Evidence Provenance Model

### 6.1 Immutable Content

**Rule:** Evidence content is immutable after write.

**Enforcement:** SHA-256 hash (`immutabilityHash`) computed at collection time. Any content modification invalidates the hash.

**Rationale:** Evidence integrity is mandatory for audit, compliance, and legal defensibility.

---

### 6.2 Immutable Metadata

**Rule:** Source-owned metadata (evidenceType, source, collectedAt, contentRef, immutabilityHash) is immutable after write.

**Enforcement:** Application layer. Source-owned fields are read-only after write.

**Rationale:** Evidence provenance is immutable. Mutating it destroys audit integrity.

---

### 6.3 Mutable Assessment

**Rule:** Commander-owned assessment fields (confidence, expiresAt, freshnessStatus) may be updated.

**Enforcement:** Application layer. Commander-owned fields are mutable by validation engine, closure gate engine, reopening trigger engine.

**Rationale:** Evidence freshness and confidence are time-dependent and context-dependent. Commander must be able to re-evaluate them.

---

## 7. Immutable Evidence Rules

### Rule 1: Evidence Content Is Immutable

Evidence content stored in object store is immutable after write. Any modification invalidates the immutabilityHash.

**Rationale:** Evidence integrity is mandatory for audit, compliance, and legal defensibility.

**Enforcement:** Object store write-once policy. SHA-256 hash verification on read.

---

### Rule 2: Evidence Provenance Is Immutable

Source-owned metadata (evidenceType, source, collectedAt, contentRef, immutabilityHash) is immutable after write.

**Rationale:** Evidence provenance is immutable. Mutating it destroys audit integrity.

**Enforcement:** Application layer. Source-owned fields are read-only after write.

---

### Rule 3: Evidence Assessment Is Mutable

Commander-owned assessment fields (confidence, expiresAt, freshnessStatus) may be updated by validation engine, closure gate engine, reopening trigger engine.

**Rationale:** Evidence freshness and confidence are time-dependent and context-dependent. Commander must be able to re-evaluate them.

**Enforcement:** Application layer. Commander-owned fields are mutable by governance engines only.

---

### Rule 4: Evidence Binding Is Immutable

Evidence-to-case, evidence-to-sub-action, evidence-to-validation-decision bindings are immutable after write.

**Rationale:** Evidence binding is provenance. Mutating it destroys audit trail.

**Enforcement:** Application layer. Binding fields are read-only after write.

---

## 8. Evidence Confidence Principles

### 8.1 Source Confidence vs Evidence Confidence

**Source Confidence:** How confident the source tool was in the finding (part of SourceClassification).

**Evidence Confidence:** How confident Commander is in the evidence validity (part of Evidence entity).

**Distinction:** Source confidence and evidence confidence are distinct and independent. A high-confidence finding may have low-confidence evidence (e.g., stale scan result). A low-confidence finding may have high-confidence evidence (e.g., fresh network capture).

---

### 8.2 Confidence Factors

Evidence confidence is influenced by:
- **Freshness:** Fresh evidence has higher confidence than stale evidence
- **Source quality:** High-quality sources (Class A connectors) have higher confidence than low-quality sources
- **Evidence type:** Direct evidence (network capture, process dump) has higher confidence than indirect evidence (log entry)
- **Validation:** Evidence validated by multiple sources has higher confidence than single-source evidence

---

### 8.3 Confidence Decay

Evidence confidence decays over time based on freshness policy:
- **Fresh (0-24 hours):** Confidence = 100% of initial confidence
- **Aging (24-72 hours):** Confidence = 80% of initial confidence
- **Stale (72 hours - 7 days):** Confidence = 50% of initial confidence
- **Expired (>7 days):** Confidence = 0% (evidence no longer valid for validation)

**Note:** Freshness thresholds are strategy-driven and may vary by evidence type and tenant policy.

---

## 9. Evidence Retention Principles

### 9.1 Metadata Retention

Evidence metadata (type, source, confidence, timestamps, bindings) is retained indefinitely for audit and compliance.

**Rationale:** Audit trail must be complete. Metadata is small (~200 bytes per evidence record).

**Storage:** Hot storage (PostgreSQL) for active cases, warm storage (data lake) for closed cases, cold storage (archive) for long-term retention.

---

### 9.2 Content Retention

Evidence content is retention-governed per tenant policy.

**Rationale:** Evidence content is large (MB-GB per artifact). Indefinite retention is cost-prohibitive.

**Storage:** Hot storage (S3 standard) for active cases (0-90 days), warm storage (S3 infrequent access) for closed cases (90 days - 1 year), cold storage (S3 Glacier) for long-term retention (1-7 years), purged after retention period.

---

### 9.3 Retention Policy

**Default retention:**
- **Hot (0-90 days):** Evidence content in S3 standard, metadata in PostgreSQL
- **Warm (90 days - 1 year):** Evidence content in S3 infrequent access, metadata in data lake
- **Cold (1-7 years):** Evidence content in S3 Glacier, metadata in archive
- **Purged (>7 years):** Evidence content deleted, metadata preserved

**Tenant override:** Tenants may configure custom retention policies (e.g., 30 days hot, 6 months warm, 3 years cold).

---

## 10. Evidence Consumers

Evidence is consumed by: Ingestion (capture from connectors), Normalisation (structure metadata), Correlation (cross-reference across cases), Risk Objects (finding validation), Case Management (validation and closure gates), Investigation (analyst access), Verdicts (verdict evidence binding), Actions (sub-action validation), Remediation (before/after config), Audit (compliance trail), Reporting (coverage aggregates), AI Reasoning (grounding and explanation), Long-Term Retention (compliance and historical analytics).

**Key bindings:**
- Evidence → Case (caseId, required)
- Evidence → Sub-Action (subActionId, optional)
- Evidence → Validation Decision (validationDecisionId, optional)
- Evidence → Risk Object (riskObjectId, optional)

**Freshness evaluation:** Evidence freshness evaluated during validation, closure gate evaluation, AI reasoning, and reporting. Stale evidence flagged, expired evidence excluded from validation.

---

## 11. Evidence Storage Posture

### 11.1 Metadata Storage

**What:** Evidence metadata (type, source, confidence, timestamps, bindings, immutabilityHash).

**Where:** PostgreSQL (hot), data lake (warm), archive (cold).

**Why:** Metadata must be queryable for case management, validation, reporting, AI reasoning.

**Efficiency:** ~200 bytes per evidence record. Indexed by caseId, subActionId, validationDecisionId, evidenceType, freshnessStatus.

---

### 11.2 Content Storage

**What:** Evidence content (log files, scan reports, screenshots, config files, network captures, process dumps).

**Where:** S3 standard (hot), S3 infrequent access (warm), S3 Glacier (cold).

**Why:** Evidence content is large (MB-GB per artifact). Object store is cost-effective for large binary data.

**Efficiency:** Pointer from metadata (contentRef). Content retrieved on-demand. Retention-governed per tenant policy.

---

### 11.3 Indexed Fields

**Indexed for querying:**
- `caseId` — Evidence-to-case binding
- `subActionId` — Evidence-to-sub-action binding
- `validationDecisionId` — Evidence-to-validation-decision binding
- `evidenceType` — Evidence type filtering
- `freshnessStatus` — Evidence freshness filtering
- `collectedAt` — Evidence timeline queries
- `expiresAt` — Evidence expiry queries

---

## 12. Evidence and Case Management

### 12.1 Evidence-Driven Validation

**Principle:** Cases must be validated with evidence before closure.

**Enforcement:** Closure gates require minimum evidence coverage (e.g., at least 1 fresh evidence artifact per case).

**Rationale:** Commander doctrine assertion #1 (closed-loop case model requires evidence-driven validation).

---

### 12.2 Evidence-Gated Closure

**Principle:** Cases cannot close without satisfying evidence-based closure gates.

**Enforcement:** Closure gate engine evaluates evidence coverage, freshness, and confidence before allowing case closure.

**Rationale:** Evidence-gated closure prevents premature case closure without validation.

---

### 12.3 Evidence-Triggered Reopening

**Principle:** Cases may reopen if new evidence contradicts closure decision.

**Enforcement:** Reopening trigger engine evaluates new evidence against closed cases. If new evidence contradicts closure rationale, case reopens automatically.

**Rationale:** Evidence-triggered reopening ensures cases remain accurate as new evidence emerges.

---

### 12.4 Evidence Coverage Reporting

**Principle:** Case evidence coverage must be visible to analysts and reported to governance.

**Enforcement:** Case dashboard displays evidence coverage (count, types, freshness). Governance reports include evidence coverage metrics.

**Rationale:** Evidence coverage visibility enables informed validation and closure decisions.

---

## 13. Evidence and AI

Commander AI reasons over evidence for grounding and explanation. AI context construction includes evidence metadata (type, source, confidence, freshness) and content where relevant. AI reasoning must account for evidence freshness (stale evidence flagged, expired evidence excluded) and confidence (low-confidence evidence should not drive high-confidence AI recommendations). AI-generated evidence is typed as `evidenceType = ai_analysis` with source = `commander_ai` to distinguish it from source-provided evidence.

---

## 14. Evidence and Audit

All evidence collection, binding, evaluation, and retention actions must be auditable. Audit events created for: evidence collection (who collected, when, from where), evidence binding (bound to which case/sub-action/validation decision), evidence evaluation (freshness status, confidence assessment), evidence retention (moved to warm/cold storage, purged). Evidence immutability is auditable via immutabilityHash stored in metadata; hash verification on read triggers audit event on mismatch. Evidence access is auditable (who accessed, when, which evidence) for compliance and legal defensibility.

---

## 15. What Evidence Must Never Do

### 15.1 Never Govern Lifecycle

Evidence does NOT determine:
- Case lifecycle state (New/Routed/Validated/Closed/Reopened)
- Lifecycle transitions (when to route, validate, close, reopen)
- Lifecycle gates (what conditions must be met to transition)

**Why:** Commander's lifecycle is system-owned and closed-loop. Evidence informs but does not govern.

---

### 15.2 Never Set Priority

Evidence does NOT determine:
- Commander priority (P0/P1/P2/P3/P4)
- Priority computation factors (evidence is ONE input, not the only input)
- Priority overrides (P0 overlay is strategy-driven, not evidence-driven)

**Why:** Commander priority is strategy-driven and multi-factor. Evidence informs but does not govern.

---

### 15.3 Never Route Cases

Evidence does NOT determine:
- Case routing (which team, which workspace, which analyst)
- Routing factors (22-factor model with rationale)
- Routing overrides (strategy-driven)

**Why:** Commander routing is multi-factor and strategy-driven. Evidence informs but does not govern.

---

### 15.4 Never Override Commander Decisions

Evidence does NOT override:
- Commander governance decisions (lifecycle, priority, routing, validation, closure)
- Commander strategy decisions (SLA, threshold, automation boundary, posture)
- Commander AI decisions (recommendations, predictions, explanations)

**Why:** Commander is authoritative. Evidence is provenance, not authority.

---

### 15.5 Never Replace Validation

Evidence does NOT replace:
- Analyst validation (evidence supports validation, does not replace it)
- Closure gate evaluation (evidence informs gates, does not satisfy them automatically)
- Reopening trigger evaluation (evidence triggers evaluation, does not reopen automatically)

**Why:** Commander validation is system-owned and evidence-gated. Evidence is input, not decision.

---

## End of Document
