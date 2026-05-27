# Requirements — Seed Data and Test Fixtures

**Spec ID:** `03-seed-data-and-test-fixtures`  
**Target version:** v1.3.1  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #05 Data Connector Normalisation, Spec #12 SDR Normalisation Strategy, Spec #46 Canonical Terminology, Spec #61 Universal Security Signal Connector Contract
**v1.3 depth:** full content-depth translation applied to this spec during v1.3 remediation.

## Purpose

Synthetic estate, users, assets, identities, vulnerabilities, controls, cases, connectors and dashboards.

## Scope in

- Provide a versioned implementation plan for Seed Data and Test Fixtures.
- Preserve Commander authority and no-MVP doctrine.
- Support local-first development.
- Align with AWS target architecture where relevant.
- Use seed/mock data until Phase 2 approves real connectors.
- Keep Commander AI present where the user journey requires assistance, explanation, drafting or prioritisation.

## Scope out

- Live AWS resource creation.
- Real vendor API credentials or production integrations.
- Production billing.
- n8n orchestration.
- Custom Kiro powers during initial conversion.
- Any behaviour that violates SOC or Insider Risk boundaries.

## User stories and EARS requirements

### Requirement 1 — Authority compliance

WHEN Kiro works on this domain  
THE SYSTEM SHALL read Commander authority, relevant Kiro steering, this spec and its owning build pack before proposing changes.

### Requirement 2 — Build visibility

WHEN this domain is not fully implemented  
THE SYSTEM SHALL still represent committed routes, pages, panels or data objects as scaffold, build or stub states rather than omitting them.

### Requirement 3 — Mock-first data

WHEN data is needed before Phase 2 real connector approval  
THE SYSTEM SHALL use seed/mock fixtures that preserve the canonical entity shape and avoid real customer secrets or vendor credentials.

### Requirement 4 — Auditability

WHEN this domain creates, changes, closes, suppresses, routes, scores, recommends or drafts anything material  
THE SYSTEM SHALL emit an auditable record design and define review points.

### Requirement 5 — Commander AI grounding

WHEN Commander AI is used in this domain  
THE SYSTEM SHALL ground outputs in available Commander data, label uncertainty, and avoid external writes without explicit approval.

### Requirement 6 — AWS alignment

WHEN this domain has backend, runtime, storage, queueing, AI or deployment implications  
THE SYSTEM SHALL record the local-first behaviour and the future AWS-aligned option without provisioning infrastructure.

## Domain requirements translated from baseline

### Domain Requirement 1 — Baseline rule

WHEN seed data is created THE SYSTEM SHALL use synthetic values and SHALL NOT include real customer, vendor or secret data.

### Domain Requirement 2 — Baseline rule

WHEN fixtures represent connector output THE SYSTEM SHALL conform to the relevant connector class and canonical contract.

### Domain Requirement 3 — Baseline rule

WHEN fixture data represents cases THE SYSTEM SHALL include lifecycle, owner, SLA, surface attribution and audit references.

### Domain Requirement 4 — Baseline rule

WHEN fixture data represents assets or identities THE SYSTEM SHALL include source lineage, tenant scope and relationship edges.

### Domain Requirement 5 — Baseline rule

WHEN fixtures are used in UI demos THE SYSTEM SHALL preserve realistic domain shape without implying live integration.

### Domain Requirement 6 — Baseline rule

WHEN fixture schema changes THE SYSTEM SHALL update tests and affected specs.

## v1.3 baseline-depth requirements

### v1.3 Requirement 1 — Canonical entity fixture scope

WHEN seed or mock data is created for Phase 0 THE SYSTEM SHALL include canonical Asset, Identity, Connector and AuditEntry shapes with minimum fields. [Source: Spec #05 §6.2 Phase 0 Canonical Entities]

### v1.3 Requirement 2 — Common field preservation

WHEN a seed entity is generated THE SYSTEM SHALL include common fields such as tenant context, source metadata, timestamps and deterministic identifiers. [Source: Spec #05 §6.4.1 Common Fields]

### v1.3 Requirement 3 — Asset fixture completeness

WHEN an asset fixture is generated THE SYSTEM SHALL include asset identity, source references, classification, ownership, environment and coverage-relevant fields. [Source: Spec #05 §6.4.2 Asset]

### v1.3 Requirement 4 — Identity fixture completeness

WHEN an identity fixture is generated THE SYSTEM SHALL include human, service, workload or third-party classification and source-system lineage. [Source: Spec #05 §6.4.3 Identity]

### v1.3 Requirement 5 — Connector fixture completeness

WHEN a connector fixture is generated THE SYSTEM SHALL include connector state, source type, tier, class, tenant scope and last-run metadata. [Source: Spec #05 §6.4.4 Connector]

### v1.3 Requirement 6 — Audit fixture completeness

WHEN an audit fixture is generated THE SYSTEM SHALL include actor, action, timestamp, entity reference, source signal and prior/new state where applicable. [Source: Spec #05 §6.4.5 AuditEntry]

### v1.3 Requirement 7 — Tenant isolation fixture

WHEN fixtures are loaded for local tests THE SYSTEM SHALL ensure every seeded record is tenant-scoped and cannot be resolved without tenant context. [Source: Spec #05 §7.2 Tenant Isolation Rules]

### v1.3 Requirement 8 — Matching metadata storage

WHEN mock normalisation matches two or more source records THE SYSTEM SHALL store matching confidence, source evidence and merge rationale in fixture metadata. [Source: Spec #05 §7.3 Matching Metadata Storage]

### v1.3 Requirement 9 — Connector mapping pack fixture

WHEN a connector mapping pack is represented in tests THE SYSTEM SHALL include mapping version, source fields, canonical fields, transform rules and unsupported-field notes. [Source: Spec #12 §8 Connector Mapping Packs]

### v1.3 Requirement 10 — Source authority fixture

WHEN conflicting source values are seeded THE SYSTEM SHALL include source authority ranking so conflict resolution can be tested deterministically. [Source: Spec #12 §4 Source Authority]

### v1.3 Requirement 11 — Manual review band fixture

WHEN a mock asset or identity match falls into manual review confidence THE SYSTEM SHALL flag it as manual-review-required rather than silently merging. [Source: Spec #12 §5.3 Manual Review Bands]

### v1.3 Requirement 12 — Provenance fixture

WHEN normalised fixture data is created THE SYSTEM SHALL retain provenance links back to raw source payload, connector and import run. [Source: Spec #12 §9 Provenance and Audit]

### v1.3 Requirement 13 — Canonical terminology fixture

WHEN fixture labels use Commander domain terms THE SYSTEM SHALL use canonical object names from the terminology glossary rather than ad hoc synonyms. [Source: Spec #46 §Canonical Terminology and Object Glossary]

### v1.3 Requirement 14 — Signal connector class fixture

WHEN a mock signal connector is declared THE SYSTEM SHALL assign only class A SOC Telemetry, class B Operational Verdict, class C Configuration State or class D Threat Intelligence. [Source: Spec #61 §Connector Class Declaration]

### v1.3 Requirement 15 — Signal purpose fixture

WHEN a mock signal is emitted THE SYSTEM SHALL assign one of the eight recognised signal purposes and route it to the expected engine or stream. [Source: Spec #61 §Eight Signal Purposes]

### v1.3 Requirement 16 — Verdict signal fixture

WHEN a mock verdict signal is emitted THE SYSTEM SHALL include disposition semantics and avoid reducing the verdict to binary pass/fail. [Source: Spec #61 §Operational Verdict Signals; Spec #62 §Disposition Semantics]

### v1.3 Requirement 17 — Configuration signal fixture

WHEN a mock configuration signal is emitted THE SYSTEM SHALL include enough state to drive drift evaluation without connecting to a real vendor API. [Source: Spec #61 §Class C Configuration State]

### v1.3 Requirement 18 — Threat signal fixture

WHEN a mock threat signal is emitted THE SYSTEM SHALL include threat intelligence lineage, relevance fields and estate-matching inputs. [Source: Spec #61 §Class D Threat Intelligence]

### v1.3 Requirement 19 — No credential fixture

WHEN seed data requires vendor-like examples THE SYSTEM SHALL use synthetic payloads and never include real credentials, secrets, tokens or customer identifiers. [Source: Spec #05 §2.3 Out of Scope]

### v1.3 Requirement 20 — Repeatable fixture run

WHEN fixtures are regenerated THE SYSTEM SHALL produce deterministic IDs and stable relationships so tests are repeatable. [Source: Spec #05 §7 Database and Schema Requirements]

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.
