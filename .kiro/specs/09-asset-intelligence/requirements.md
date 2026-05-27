# Requirements — Asset Intelligence

**Spec ID:** `09-asset-intelligence`  
**Target version:** v1.2  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #36 Evidence Pack Model, Spec #59 Intelligence Layer Architecture, Spec #60 Internal and External Attack Surface Framework, Spec #69 Asset Intelligence Surface

## Purpose

Asset inventory, ownership, coverage, lifecycle, EOL/EOS, ghost assets and context overlays.

## Scope in

- Provide a versioned implementation plan for Asset Intelligence.
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

WHEN an asset intelligence record is created THE SYSTEM SHALL attribute it to internal_attack_surface or external_attack_surface per Spec #60.

### Domain Requirement 2 — Baseline rule

WHEN asset intelligence is produced THE SYSTEM SHALL link asset, source evidence, ownership, business context, criticality and control coverage.

### Domain Requirement 3 — Baseline rule

WHEN an asset appears in multiple sources THE SYSTEM SHALL preserve source lineage and reconciliation status.

### Domain Requirement 4 — Baseline rule

WHEN asset posture is assessed THE SYSTEM SHALL include EDR, NDR, VM, identity, exposure and lifecycle coverage where available.

### Domain Requirement 5 — Baseline rule

WHEN asset context is incomplete THE SYSTEM SHALL flag missing ownership, classification or source confidence.

### Domain Requirement 6 — Baseline rule

WHEN an asset moves between surfaces THE SYSTEM SHALL update surface attribution with evidence and timestamp.

### Domain Requirement 7 — Baseline rule

WHEN asset intelligence contributes to a case THE SYSTEM SHALL preserve the source asset context on the case.

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.2 named surface enumeration

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Asset Overview

WHEN Asset Intelligence Surface renders THE SYSTEM SHALL include Asset Overview fields and widgets from Spec #69. [Source: Spec #69 §3.1]

### v1.2 Requirement 2 — Configuration State

WHEN Asset Intelligence Surface renders THE SYSTEM SHALL include configuration state section from Spec #69. [Source: Spec #69 §3.2]

### v1.2 Requirement 3 — Verdict History

WHEN Asset Intelligence Surface renders THE SYSTEM SHALL include verdict history section from Spec #69. [Source: Spec #69 §3.3]

### v1.2 Requirement 4 — Behavioural Pattern

WHEN Asset Intelligence Surface renders THE SYSTEM SHALL include behavioural pattern section from Spec #69. [Source: Spec #69 §3.4]

### v1.2 Requirement 5 — Vulnerability State

WHEN Asset Intelligence Surface renders THE SYSTEM SHALL include vulnerability state and identity exposure sections from Spec #69. [Source: Spec #69 §§3.6-3.7]

## v1.3.1 lineage closure requirements

### Ephemeral Asset Classification

WHEN an asset is registered THE SYSTEM SHALL classify it as persistent or ephemeral and apply lifecycle, scoring and coverage logic appropriate to the class. [Source: Master Proposition §9 Ephemeral Asset Classification]

### Attack Surface Auto-Positioning

WHEN an asset is assessed for attack surface THE SYSTEM SHALL auto-position it on internal or external attack surface using deterministic signals from connector data rather than manual classification. [Source: Master Proposition §9 Attack Surface Auto-Positioning]

### Extensible Asset Cartography

WHEN asset cartography is extended with new asset types THE SYSTEM SHALL preserve cartography model extensibility without breaking existing entities. [Source: Master Proposition §9 Extensible Asset Cartography]

