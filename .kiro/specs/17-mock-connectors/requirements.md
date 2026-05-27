# Requirements — Mock Connectors

**Spec ID:** `17-mock-connectors`  
**Target version:** v1.3.1  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #05 Data Connector Normalisation, Spec #09 Connector Architecture, Spec #24 Connector API Reference Framework, Spec #61 Universal Security Signal Connector Contract, Spec #62 Verdict Semantics
**v1.3 depth:** full content-depth translation applied to this spec during v1.3 remediation.

## Purpose

Read-only mock connectors for AWS, Tenable, CrowdStrike, Darktrace, Zscaler, Graph/Intune and Armis-like signals.

## Scope in

- Provide a versioned implementation plan for Mock Connectors.
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

WHEN a mock connector is declared THE SYSTEM SHALL use the same connector class contract expected of the future real connector.

### Domain Requirement 2 — Baseline rule

WHEN mock data is emitted THE SYSTEM SHALL include source, timestamp, tenant, signal purpose and validation state.

### Domain Requirement 3 — Baseline rule

WHEN a mock connector simulates failure THE SYSTEM SHALL emit failure state and freshness impact.

### Domain Requirement 4 — Baseline rule

WHEN a mock connector produces verdicts THE SYSTEM SHALL include canonical disposition semantics.

### Domain Requirement 5 — Baseline rule

WHEN mock connector output feeds cases THE SYSTEM SHALL preserve signal-to-case lineage.

### Domain Requirement 6 — Baseline rule

WHEN Phase 2 begins THE SYSTEM SHALL compare mock connector coverage against real vendor API readiness.

## v1.3 baseline-depth requirements

### v1.3 Requirement 1 — Mock connector contract

WHEN a mock connector is declared THE SYSTEM SHALL implement the same connector metadata, tenant scope, class and status contract expected of real connectors. [Source: Spec #09 §Connector Architecture; Spec #61 §Connector Contract]

### v1.3 Requirement 2 — Class A mock

WHEN a SOC Telemetry mock connector emits data THE SYSTEM SHALL declare class A and mark it read-only for SOC platform interaction. [Source: Spec #61 §Class A SOC Telemetry]

### v1.3 Requirement 3 — Class B mock

WHEN an Operational Verdict mock connector emits data THE SYSTEM SHALL declare class B and include disposition semantics. [Source: Spec #61 §Class B Operational Verdict; Spec #62 §Verdict Semantics]

### v1.3 Requirement 4 — Class C mock

WHEN a Configuration State mock connector emits data THE SYSTEM SHALL declare class C and include configuration posture fields for drift evaluation. [Source: Spec #61 §Class C Configuration State]

### v1.3 Requirement 5 — Class D mock

WHEN a Threat Intelligence mock connector emits data THE SYSTEM SHALL declare class D and include source, confidence, indicator and relevance fields. [Source: Spec #61 §Class D Threat Intelligence]

### v1.3 Requirement 6 — Signal purpose support

WHEN a mock connector emits a signal THE SYSTEM SHALL assign one of the eight signal purposes and route it to the correct stream or engine. [Source: Spec #61 §Eight Signal Purposes]

### v1.3 Requirement 7 — Connector API reference

WHEN a mock connector implements an API-like contract THE SYSTEM SHALL document request, response, error, pagination and rate-limit behaviours in the API reference pattern. [Source: Spec #24 §Connector API Reference Framework]

### v1.3 Requirement 8 — Normalisation mapping

WHEN mock connector payloads are transformed THE SYSTEM SHALL apply explicit source-to-canonical mapping rules and preserve unsupported fields as non-authoritative metadata. [Source: Spec #05 §8 API Layer Model; Spec #12 §Connector Mapping Packs]

### v1.3 Requirement 9 — Run metadata

WHEN a mock connector run completes THE SYSTEM SHALL record run ID, status, started/ended timestamps, counts and error summary. [Source: Spec #05 §Connector Technical Support Records]

### v1.3 Requirement 10 — Error simulation

WHEN a mock connector fails THE SYSTEM SHALL emit deterministic error states for authentication failure, rate limit, malformed payload and source unavailable. [Source: Spec #09 §Connector Architecture]

### v1.3 Requirement 11 — No real credential use

WHEN a mock connector needs credentials for testing THE SYSTEM SHALL use synthetic placeholders and never require live vendor secrets. [Source: Spec #05 §2.3 Out of Scope]

### v1.3 Requirement 12 — Read-only SOC mock

WHEN a mock connector represents a SOC platform THE SYSTEM SHALL prevent write methods and expose only read/fixture flows. [Source: Spec #57 §SOC Boundary; Spec #61 §Class A]

### v1.3 Requirement 13 — Verdict disposition fixture

WHEN a mock verdict is emitted THE SYSTEM SHALL include disposition fields, confidence, evidence and semantic context. [Source: Spec #62 §Disposition Semantics]

### v1.3 Requirement 14 — Verdict interpretation fixture

WHEN a mock verdict is consumed THE SYSTEM SHALL preserve verdict context rather than converting it to binary pass/fail. [Source: Spec #62 §Interpretation Rules]

### v1.3 Requirement 15 — Conformance fixture

WHEN connector conformance is tested THE SYSTEM SHALL provide mock examples for tier, class, purpose, mapping, provenance, errors and audit behaviour. [Source: Spec #61 §Conformance Rules]

### v1.3 Requirement 16 — Pagination fixture

WHEN mock source data spans multiple pages THE SYSTEM SHALL simulate pagination deterministically and audit page traversal. [Source: Spec #24 §API Reference Framework]

### v1.3 Requirement 17 — Rate-limit fixture

WHEN a mock source returns a rate-limit response THE SYSTEM SHALL exercise retry/backoff logic without external API calls. [Source: Spec #24 §Error and Rate-Limit Patterns]

### v1.3 Requirement 18 — Raw payload fixture

WHEN a mock connector emits raw payloads THE SYSTEM SHALL retain redacted raw examples for explainability and normalisation testing. [Source: Spec #05 §Provenance and Audit]

### v1.3 Requirement 19 — Tenant isolation mock

WHEN two tenants use the same mock connector type THE SYSTEM SHALL keep configuration, payloads and run histories separated by tenant. [Source: Spec #05 §7.2 Tenant Isolation Rules]

### v1.3 Requirement 20 — Connector retirement mock

WHEN a mock connector is retired THE SYSTEM SHALL mark it retired, preserve audit history and prevent new runs. [Source: Spec #09 §Connector Lifecycle]

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.
