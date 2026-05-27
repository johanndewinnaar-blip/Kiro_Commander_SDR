# Requirements — CISO Dashboard

**Spec ID:** `23-ciso-dashboard`  
**Target version:** v1.3.1  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #42 Domain Security Dashboards, Spec #65 External Operating Picture Surface, Spec #66 Internal Operating Picture Surface, Spec #67 OODA Dashboard Family, Spec #73 Silent Defence Reporting, Spec #74 Context-Aware Drift Prioritisation Matrix
**v1.3 depth:** full content-depth translation applied to this spec during v1.3 remediation.

## Purpose

Executive posture, blast radius, security debt, control coverage, OODA tempo and risk summaries.

## Scope in

- Provide a versioned implementation plan for CISO Dashboard.
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

WHEN the CISO Dashboard loads THE SYSTEM SHALL present executive posture, risk, exposure, debt, control coverage, cases and operating picture summaries.

### Domain Requirement 2 — Baseline rule

WHEN executive metrics are displayed THE SYSTEM SHALL preserve drill-down lineage to domain data.

### Domain Requirement 3 — Baseline rule

WHEN blast-zone summaries are shown THE SYSTEM SHALL include criticality, likelihood, affected surface and evidence.

### Domain Requirement 4 — Baseline rule

WHEN technical debt is shown THE SYSTEM SHALL distinguish unresolved remediation from accepted risk.

### Domain Requirement 5 — Baseline rule

WHEN CISO Dashboard uses mock data THE SYSTEM SHALL label mock or scaffold state.

### Domain Requirement 6 — Baseline rule

WHEN Commander AI summarises executive posture THE SYSTEM SHALL cite the visible Commander data used.

## v1.3 baseline-depth requirements

### v1.3 Requirement 1 — Executive posture summary

WHEN the CISO dashboard is rendered THE SYSTEM SHALL show posture, risk, trend, control coverage and strategic blocker summaries. [Source: Spec #42 §Domain Security Dashboards]

### v1.3 Requirement 2 — Domain dashboard rollup

WHEN a domain security dashboard contributes to CISO view THE SYSTEM SHALL roll up domain risk without losing domain ownership and source evidence. [Source: Spec #42 §Dashboard Outputs]

### v1.3 Requirement 3 — External operating summary

WHEN external threat or attack posture is displayed THE SYSTEM SHALL include External Operating Picture state, external signals, correlation cases and exposure trend. [Source: Spec #65 §External Operating Picture Surface]

### v1.3 Requirement 4 — Internal operating summary

WHEN internal posture or behavioural state is displayed THE SYSTEM SHALL include Internal Operating Picture state, internal behavioural signals, posture signals and tool health. [Source: Spec #66 §Internal Operating Picture Surface]

### v1.3 Requirement 5 — OODA tempo metric

WHEN CISO dashboard displays operating tempo THE SYSTEM SHALL show Observe, Orient, Decide and Act health plus Command Tempo Dashboard trend. [Source: Spec #67 §OODA Dashboard Family]

### v1.3 Requirement 6 — Observe phase rollup

WHEN OODA Observe health is summarised THE SYSTEM SHALL show signal ingestion, visibility and coverage indicators. [Source: Spec #67 §Observe Dashboard]

### v1.3 Requirement 7 — Orient phase rollup

WHEN OODA Orient health is summarised THE SYSTEM SHALL show correlation, classification, entity context and intelligence quality indicators. [Source: Spec #67 §Orient Dashboard]

### v1.3 Requirement 8 — Decide phase rollup

WHEN OODA Decide health is summarised THE SYSTEM SHALL show prioritisation, routing, approval and decision-latency indicators. [Source: Spec #67 §Decide Dashboard]

### v1.3 Requirement 9 — Act phase rollup

WHEN OODA Act health is summarised THE SYSTEM SHALL show execution, validation, closure and reopening indicators. [Source: Spec #67 §Act Dashboard]

### v1.3 Requirement 10 — Silent defence reporting

WHEN the CISO dashboard presents daily value THE SYSTEM SHALL include silent defence reporting for actions, detections, prevented issues and tool contributions. [Source: Spec #73 §Silent Defence Reporting]

### v1.3 Requirement 11 — Cost/value visibility

WHEN security tool or control value is summarised THE SYSTEM SHALL show tool contribution, overlap, rationalisation and silent defence evidence without financial overreach. [Source: Spec #73 §Reporting Outputs; Spec #23 §Tool Value]

### v1.3 Requirement 12 — Context-aware priority trend

WHEN high-priority drift or vulnerability trends are shown THE SYSTEM SHALL apply context-aware drift prioritisation factors before executive aggregation. [Source: Spec #74 §Context-Aware Drift Prioritisation Matrix]

### v1.3 Requirement 13 — Mission impact indicator

WHEN risk intersects mission or strategic objective THE SYSTEM SHALL show mission impact as executive context rather than hiding it in technical detail. [Source: Spec #74 §Context Factors]

### v1.3 Requirement 14 — Surface split

WHEN risk and exposure are summarised THE SYSTEM SHALL preserve internal versus external attack surface attribution in executive charts. [Source: Spec #65/66 Operating Pictures; Spec #60 Surface Framework]

### v1.3 Requirement 15 — Case health executive rollup

WHEN case status is summarised THE SYSTEM SHALL include SLA pressure, validation backlog, reopening trends and P0 state. [Source: Spec #42 §Domain Dashboards; Spec #67 Command Tempo]

### v1.3 Requirement 16 — CISO drilldown

WHEN an executive selects a dashboard card THE SYSTEM SHALL drill down to source domain, linked cases, entities and evidence without changing lifecycle state. [Source: Spec #42 §Dashboard Drilldown]

### v1.3 Requirement 17 — No analyst clutter

WHEN the CISO dashboard is displayed THE SYSTEM SHALL avoid exposing operational-only controls that belong in analyst or admin surfaces. [Source: Spec #42 §Audience Model]

### v1.3 Requirement 18 — Foreseeability reporting

WHEN pre-warned, protected or novel attack classification is summarised THE SYSTEM SHALL show classification counts and audit-grade evidence from the relevant case set. [Source: Spec #71 §Foreseeability Audit; Spec #65 External Operating Picture]

### v1.3 Requirement 19 — Strategic planning view

WHEN long-term posture is displayed THE SYSTEM SHALL show trend, technical debt, control weakness and transformation priorities. [Source: Spec #42 §Strategic Planning]

### v1.3 Requirement 20 — Dashboard audit

WHEN a CISO dashboard export or report is generated THE SYSTEM SHALL record report parameters, data cut, timestamp and requesting actor. [Source: Spec #73 §Reporting Governance]

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.
