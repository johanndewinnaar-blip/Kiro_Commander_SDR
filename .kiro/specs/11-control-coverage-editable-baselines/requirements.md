# Requirements — Control Coverage and Editable Baselines

**Spec ID:** `11-control-coverage-editable-baselines`  
**Target version:** v1.2  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #11 Coverage Control Model, Spec #25 Cross-System Coordinated Push, Spec #46 Canonical Terminology and Object Glossary, Spec #48 Audit Event Framework, Spec #55 Baseline Configuration Framework Model and Defaults, Spec #60 Internal and External Attack Surface Framework

## Purpose

Coverage scoring, framework baselines, risk/SLA/model defaults and tenant-editable configuration.

## Scope in

- Provide a versioned implementation plan for Control Coverage and Editable Baselines.
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

WHEN a baseline is configured THE SYSTEM SHALL distinguish default baseline, tenant override and runtime observed state.

### Domain Requirement 2 — Baseline rule

WHEN a baseline is edited THE SYSTEM SHALL record editor, reason, previous value, new value, effective date and review trigger.

### Domain Requirement 3 — Baseline rule

WHEN control coverage is calculated THE SYSTEM SHALL bind coverage to assets, identities, control families and source evidence.

### Domain Requirement 4 — Baseline rule

WHEN a compensating control is claimed THE SYSTEM SHALL require evidence and SHALL NOT silently reduce risk without validation.

### Domain Requirement 5 — Baseline rule

WHEN baseline state conflicts with observed state THE SYSTEM SHALL create a drift finding or review item.

### Domain Requirement 6 — Baseline rule

WHEN editable baselines affect scoring THE SYSTEM SHALL expose the scoring impact and audit trail.

### Domain Requirement 7 — Baseline rule

WHEN a baseline is inherited THE SYSTEM SHALL preserve tenant, parent and override relationship.

### Domain Requirement 8 — Baseline rule

WHEN a baseline control maps to a framework THE SYSTEM SHALL preserve Commander canonical control identity as primary.

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.2 Master Proposition §7 deliverables

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Compensating controls

WHEN controls are assessed THE SYSTEM SHALL identify compensating or manual controls that affect risk interpretation. [Source: Master Proposition §7]

### v1.2 Requirement 2 — Coverage control score

WHEN control coverage is reported THE SYSTEM SHALL expose a coverage control score grounded in canonical coverage and baseline data. [Source: Master Proposition §7]

## v1.3.1 lineage closure requirements

### Coverage Score Output

WHEN coverage is computed for an entity THE SYSTEM SHALL produce a Coverage Score expressing the percentage of required controls present and active. [Source: Master Proposition §11]

### Fully Covered Metric Output

WHEN coverage is computed for an entity THE SYSTEM SHALL produce a Fully Covered Metric expressing boolean state of complete required-control coverage. [Source: Master Proposition §11]

### Gap List Output

WHEN coverage is computed for an entity THE SYSTEM SHALL produce a Gap List enumerating missing controls with severity. [Source: Master Proposition §11]

### Coverage Gap Correlation

WHEN coverage gaps are detected THE SYSTEM SHALL feed them into the Posture Intelligence stream, surface them in the Control Weakness Direction Board, and elevate priority when correlated with active attack signal per Pre-Warned classification. [Source: Master Proposition §11; Spec #70; Spec #71]

### Tag-Driven Coverage Requirements

WHEN tag-driven coverage requirements are configured THE SYSTEM SHALL allow customers to define coverage stacks per environment, business unit, application criticality or compliance scope without writing custom code. [Source: Master Proposition §11]

### Prebuilt Compliance Mapping

WHEN a compliance framework mapping is configured THE SYSTEM SHALL support pre-built mappings for CIS Controls v7/v8, NIST CSF, ISO 27001, SOC 2, PCI-DSS, DORA, NIS2 and Cyber Essentials at minimum. [Source: Master Proposition §14]

### Custom Compliance Mapping

WHEN a customer defines a custom framework mapping THE SYSTEM SHALL allow non-prebuilt frameworks to be mapped without losing the four-layer compliance model of tool configuration checks, baseline conditions, framework controls and posture score. [Source: Master Proposition §14]

