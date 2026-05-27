# Requirements — Phase 2 Testing and Real Connector Readiness

**Spec ID:** `29-phase2-testing-real-connectors`  
**Target version:** v1.6  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #61 Universal Security Signal Connector Contract, Spec #62 Verdict Semantics Specification, Spec #65 External Operating Picture Surface, Spec #66 Internal Operating Picture Surface, Spec #67 OODA Dashboard Family, Spec #68 Identity Intelligence Surface, Spec #69 Asset Intelligence Surface, Spec #70 Direction Boards

## Purpose

Readiness gates, real API sandbox planning, connector contract tests and security review.

## Scope in

- Provide a versioned implementation plan for Phase 2 Testing and Real Connector Readiness.
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

WHEN Phase 2 testing starts THE SYSTEM SHALL verify connector contract, data model, tenancy, audit and fixture parity before real API use.

### Domain Requirement 2 — Baseline rule

WHEN real connector readiness is assessed THE SYSTEM SHALL confirm credentials, scopes, rate limits, test tenant safety and rollback plan.

### Domain Requirement 3 — Baseline rule

WHEN a real connector is not ready THE SYSTEM SHALL keep the mock connector active and log the blocker.

### Domain Requirement 4 — Baseline rule

WHEN real data is introduced THE SYSTEM SHALL segregate it from synthetic fixtures and prevent secret exposure.

### Domain Requirement 5 — Baseline rule

WHEN Phase 2 results are reviewed THE SYSTEM SHALL produce pass, fail, risk and decision records.

### Domain Requirement 6 — Baseline rule

WHEN connector testing touches vendor APIs THE SYSTEM SHALL remain read-only unless separately approved.

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.2 Phase 2 vendor API enumeration

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

## v1.3.1 lineage closure requirements

### Tier 1 Connector — Microsoft Sentinel

WHEN Microsoft Sentinel is in scope for Phase 2 testing THE SYSTEM SHALL treat it as Class A SOC Telemetry with certified conformance per the v2.6 Tier 1 schedule. [Source: Master Technical Specification §2.5]

### Tier 1 Connector — Microsoft Defender for Endpoint

WHEN Microsoft Defender for Endpoint is in scope THE SYSTEM SHALL treat it as Class A SOC Telemetry and Class B Operational Verdict with certified conformance. [Source: Master Technical Specification §2.5]

### Tier 1 Connector — Google SecOps / Chronicle

WHEN Google SecOps / Chronicle is in scope THE SYSTEM SHALL treat it as Class A SOC Telemetry with certified conformance. [Source: Master Technical Specification §2.5]

### Tier 1 Connector — Splunk Enterprise Security

WHEN Splunk Enterprise Security is in scope THE SYSTEM SHALL treat it as Class A SOC Telemetry with full conformance. [Source: Master Technical Specification §2.5]

### Tier 1 Connector — Rapid7 InsightIDR

WHEN Rapid7 InsightIDR is in scope THE SYSTEM SHALL treat it as Class A SOC Telemetry with full conformance. [Source: Master Technical Specification §2.5]

### Tier 1 Connector — Darktrace

WHEN Darktrace is in scope THE SYSTEM SHALL treat it as Class A SOC Telemetry and Class B Operational Verdict with full conformance. [Source: Master Technical Specification §2.5]

### Tier 1 Connector — Microsoft Purview DLP

WHEN Microsoft Purview DLP is in scope THE SYSTEM SHALL treat it as Class B Operational Verdict and Class C Configuration State with full conformance. [Source: Master Technical Specification §2.5]

### Tier 1 Connector — Zscaler ZIA

WHEN Zscaler ZIA is in scope THE SYSTEM SHALL treat it as Class B Operational Verdict and Class C Configuration State with full conformance. [Source: Master Technical Specification §2.5]

### Tier 1 Connector — CISA KEV Feed

WHEN CISA KEV Feed is in scope THE SYSTEM SHALL treat it as Class D Threat Intelligence with certified conformance. [Source: Master Technical Specification §2.5]

### Existing v2.5.2 Connectors

WHEN existing v2.5.2 connectors are in scope THE SYSTEM SHALL carry them forward unchanged into v2.6. [Source: Master Technical Specification §2.5]

### Tier 1 Connector Conformance

WHEN any Tier 1 connector is implemented THE SYSTEM SHALL declare its class or classes per Spec #61 and pass the conformance tier checks per Master Technical Specification §2.3 before activation. [Source: Master Technical Specification §2.3, §2.5]

