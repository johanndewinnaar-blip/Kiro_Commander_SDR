# Requirements — Identity Intelligence

**Spec ID:** `10-identity-intelligence`  
**Target version:** v1.2  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #37 Security Debt Register, Spec #59 Intelligence Layer Architecture, Spec #60 Internal and External Attack Surface Framework, Spec #68 Identity Intelligence Surface

## Purpose

Identity graph, privilege posture, MFA/compliance signals, entitlement exposure and identity cases.

## Scope in

- Provide a versioned implementation plan for Identity Intelligence.
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

WHEN an identity intelligence record is created THE SYSTEM SHALL attribute it to internal_attack_surface or external_attack_surface per Spec #60.

### Domain Requirement 2 — Baseline rule

WHEN identity intelligence is produced THE SYSTEM SHALL link identity, directory source, entitlement state, device context, control coverage and risk context.

### Domain Requirement 3 — Baseline rule

WHEN privileged access is detected THE SYSTEM SHALL preserve entitlement evidence, scope and review state.

### Domain Requirement 4 — Baseline rule

WHEN an identity is associated with an asset or service THE SYSTEM SHALL create a relationship edge with source lineage and confidence.

### Domain Requirement 5 — Baseline rule

WHEN identity context is incomplete THE SYSTEM SHALL flag missing owner, directory source or entitlement evidence.

### Domain Requirement 6 — Baseline rule

WHEN identity intelligence informs OODA or Security C2 THE SYSTEM SHALL preserve stream and surface attribution.

### Domain Requirement 7 — Baseline rule

WHEN an identity-related exposure is promoted THE SYSTEM SHALL bind it to a case or risk object rather than leaving it as unowned observation.

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.2 Master Proposition §7 deliverables

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Highest-risk identities

WHEN identity intelligence is rendered THE SYSTEM SHALL identify which identities represent the highest access risk. [Source: Master Proposition §7]

## v1.2 named surface enumeration

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Identity Overview

WHEN Identity Intelligence Surface renders THE SYSTEM SHALL include identity overview section from Spec #68. [Source: Spec #68 §3.1]

### v1.2 Requirement 2 — Access Intelligence

WHEN Identity Intelligence Surface renders THE SYSTEM SHALL include access intelligence section from Spec #68. [Source: Spec #68 §3.2]

### v1.2 Requirement 3 — Behavioural Intelligence

WHEN Identity Intelligence Surface renders THE SYSTEM SHALL include behavioural intelligence section gated by Internal Risk authority where required. [Source: Spec #68 §3.3; Spec #75]

### v1.2 Requirement 4 — Threat Intelligence

WHEN Identity Intelligence Surface renders THE SYSTEM SHALL include threat intelligence, case history and risk trajectory sections. [Source: Spec #68 §§3.4-3.6]

## v1.3.1 lineage closure requirements

### CHAIN Stage 1

WHEN CHAIN computation runs Stage 1 Continuous trigger rules THE SYSTEM SHALL apply cheap deterministic detection of risky identity patterns. [Source: Master Proposition §17.1; Spec #18 §5]

### CHAIN Stage 2

WHEN CHAIN computation runs Stage 2 Triggered chain computation THE SYSTEM SHALL compute access path and blast radius for the triggered identity. [Source: Master Proposition §17.1; Spec #18 §5]

### CHAIN Stage 3

WHEN CHAIN computation runs Stage 3 Scheduled sweep THE SYSTEM SHALL perform periodic wider analysis for privileged and high-risk identities. [Source: Master Proposition §17.1; Spec #18 §5]

### Identity Risk Composite

WHEN identity risk scoring is computed THE SYSTEM SHALL include privilege level, entitlement gaps, standing access, MFA/PIM enforcement, dormancy, group health, threat intelligence relevance and incident history. [Source: Master Proposition §17.1; Spec #18 §5]

### Group Intelligence

WHEN group intelligence is analysed THE SYSTEM SHALL assess group memberships for security health, redundancy and risk concentration. [Source: Master Proposition §17.1; Spec #18 §V2.6-1]

### User Investigation Profile

WHEN a per-identity investigation profile is displayed THE SYSTEM SHALL include access chain visualisation and the identity intelligence surface context. [Source: Master Proposition §17.1; Spec #18 §V2.6-1]

### High-Risk Watchlist

WHEN identities are ranked for watchlist inclusion THE SYSTEM SHALL maintain a continuously computed list of the highest-risk identities and display watchlist status on the Identity Intelligence Surface. [Source: Master Proposition §17.1; Spec #18 §V2.6-6]

