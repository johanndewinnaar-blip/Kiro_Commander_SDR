# Requirements — OODA Views

**Spec ID:** `14-ooda-views`  
**Target version:** v1.4  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #58 Security OODA Loop Specification, Spec #59 Intelligence Layer Architecture, Spec #67 OODA Dashboard Family, Spec #70 Direction Boards

## Purpose

Observe, Orient, Decide, Act views, OODA tempo and programme-level loop health.

## Scope in

- Provide a versioned implementation plan for OODA Views.
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

WHEN an OODA view aggregates intelligence THE SYSTEM SHALL preserve the four-stream attribution of every contributing record.

### Domain Requirement 2 — Baseline rule

WHEN an Observe panel renders signals THE SYSTEM SHALL preserve source, freshness, stream and surface lineage.

### Domain Requirement 3 — Baseline rule

WHEN an Orient panel renders context THE SYSTEM SHALL show affected entities, operating picture, priority overlay and relevant baseline state.

### Domain Requirement 4 — Baseline rule

WHEN a Decide panel presents options THE SYSTEM SHALL present recommended actions, constraints, owners and approval gates without mutating systems.

### Domain Requirement 5 — Baseline rule

WHEN an Act panel records action state THE SYSTEM SHALL show whether the action is recommendation, dry-run, approved, executed or blocked.

### Domain Requirement 6 — Baseline rule

WHEN an OODA loop closes THE SYSTEM SHALL capture validation evidence and route unresolved drift back into Observe.

### Domain Requirement 7 — Baseline rule

WHEN Direction Boards consume OODA outputs THE SYSTEM SHALL preserve the source loop, objective, risk and owner context.

### Domain Requirement 8 — Baseline rule

WHEN OODA data is incomplete THE SYSTEM SHALL label uncertainty rather than generating unsupported certainty.

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.2 master inventory enumeration — OODA dashboard family

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Observe Phase Dashboard

WHEN the OODA Dashboard Family is rendered THE SYSTEM SHALL include the Observe Phase Dashboard with its baseline phase or tempo composition. [Source: Spec #67; Master Technical Specification §8.2]

### v1.2 Requirement 2 — Orient Phase Dashboard

WHEN the OODA Dashboard Family is rendered THE SYSTEM SHALL include the Orient Phase Dashboard with its baseline phase or tempo composition. [Source: Spec #67; Master Technical Specification §8.2]

### v1.2 Requirement 3 — Decide Phase Dashboard

WHEN the OODA Dashboard Family is rendered THE SYSTEM SHALL include the Decide Phase Dashboard with its baseline phase or tempo composition. [Source: Spec #67; Master Technical Specification §8.2]

### v1.2 Requirement 4 — Act Phase Dashboard

WHEN the OODA Dashboard Family is rendered THE SYSTEM SHALL include the Act Phase Dashboard with its baseline phase or tempo composition. [Source: Spec #67; Master Technical Specification §8.2]

### v1.2 Requirement 5 — Command Tempo Dashboard

WHEN the OODA Dashboard Family is rendered THE SYSTEM SHALL include the Command Tempo Dashboard with its baseline phase or tempo composition. [Source: Spec #67; Master Technical Specification §8.2]

## v1.2 Master Proposition §7 deliverables

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — OODA tempo

WHEN programme performance is reported THE SYSTEM SHALL expose current OODA tempo across Observe, Orient, Decide and Act. [Source: Master Proposition §7; Spec #58]

## v1.2 named surface enumeration

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Observe dashboard

WHEN Observe dashboard renders THE SYSTEM SHALL include signal intake, connector freshness, coverage completeness and observation throughput widgets. [Source: Spec #67 §§3,7]

### v1.2 Requirement 2 — Orient dashboard

WHEN Orient dashboard renders THE SYSTEM SHALL include drift, risk, blast radius, classification and orientation bottleneck widgets. [Source: Spec #67 §4]

### v1.2 Requirement 3 — Decide dashboard

WHEN Decide dashboard renders THE SYSTEM SHALL include remediation, routing, prioritisation and approval decision widgets. [Source: Spec #67 §5]

### v1.2 Requirement 4 — Act dashboard

WHEN Act dashboard renders THE SYSTEM SHALL include execution, validation, closure and action completion widgets. [Source: Spec #67 §6]

### v1.2 Requirement 5 — Command Tempo composition

WHEN Command Tempo Dashboard renders THE SYSTEM SHALL aggregate phase health, bottlenecks, ageing, throughput and cadence reporting. [Source: Spec #67 §7]
