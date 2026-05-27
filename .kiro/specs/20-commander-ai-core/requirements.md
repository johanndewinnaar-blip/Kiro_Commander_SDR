# Requirements — Commander AI Core

**Spec ID:** `20-commander-ai-core`  
**Target version:** v1.3.1  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #13 Commander AI Architecture & Grounding Rules, Spec #26a Closed-Loop Email & Case Communication Lifecycle, Spec #34 Mission Control / Pulse source-file mismatch noted, Spec #59 Intelligence Layer Architecture, Spec #62 Verdict Semantics
**v1.3 depth:** full content-depth translation applied to this spec during v1.3 remediation.

## Purpose

Grounded AI assistant, prompt governance, execution records, case/report drafting and UI entry points.

## Scope in

- Provide a versioned implementation plan for Commander AI Core.
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

WHEN Commander AI answers THE SYSTEM SHALL ground the answer in tenant-scoped Commander data, baseline doctrine or visible UI context.

### Domain Requirement 2 — Baseline rule

WHEN Commander AI is uncertain THE SYSTEM SHALL label uncertainty and identify missing evidence.

### Domain Requirement 3 — Baseline rule

WHEN Commander AI drafts communication THE SYSTEM SHALL produce a reviewable draft and SHALL NOT send without explicit approval.

### Domain Requirement 4 — Baseline rule

WHEN Commander AI recommends action THE SYSTEM SHALL distinguish recommendation from approval or execution.

### Domain Requirement 5 — Baseline rule

WHEN Commander AI uses verdict data THE SYSTEM SHALL preserve verdict semantics and disposition context.

### Domain Requirement 6 — Baseline rule

WHEN Commander AI output is material THE SYSTEM SHALL record prompt context, data sources, output and reviewer state.

## v1.3 baseline-depth requirements

### v1.3 Requirement 1 — AI grounding

WHEN Commander AI answers a user THE SYSTEM SHALL ground the answer in Commander data, source doctrine or explicitly labelled uncertainty. [Source: Spec #13 §Grounding Rules]

### v1.3 Requirement 2 — No autonomous lifecycle decision

WHEN Commander AI recommends action THE SYSTEM SHALL prevent the AI from directly creating, closing, reopening, routing or mutating lifecycle state. [Source: Spec #13 §Commander AI Architecture]

### v1.3 Requirement 3 — Evidence citation

WHEN Commander AI explains risk, priority or verdict THE SYSTEM SHALL include the underlying source signals, cases, entities or baseline doctrine used. [Source: Spec #13 §Grounding and Explainability]

### v1.3 Requirement 4 — Uncertainty labelling

WHEN Commander AI lacks evidence for an answer THE SYSTEM SHALL label the uncertainty and propose data needed rather than inventing facts. [Source: Spec #13 §Grounding Rules]

### v1.3 Requirement 5 — Draft-only communication

WHEN Commander AI drafts email or case communication THE SYSTEM SHALL produce draft content only and route it through approval and mailbox controls. [Source: Spec #26a §Closed-Loop Email Case Communication Lifecycle]

### v1.3 Requirement 6 — Communication binding

WHEN Commander AI drafts or summarises communication THE SYSTEM SHALL bind the output to the relevant case, sub-action, risk object, external notification or queue object. [Source: Spec #26a §Automatic communication binding]

### v1.3 Requirement 7 — No external write

WHEN Commander AI proposes a push, notification or external action THE SYSTEM SHALL require deterministic approval and dry-run governance before any external mutation path. [Source: Spec #13 §Boundary Controls]

### v1.3 Requirement 8 — Four-stream context

WHEN Commander AI summarises intelligence THE SYSTEM SHALL preserve External Threat, External Attack, Internal Behavioural and Posture stream attribution. [Source: Spec #59 §Four Intelligence Streams]

### v1.3 Requirement 9 — Stream-to-surface lineage

WHEN Commander AI explains a signal THE SYSTEM SHALL show the stream-to-surface lineage and affected attack surface where available. [Source: Spec #59 §Stream-to-Surface Lineage]

### v1.3 Requirement 10 — Verdict semantics preservation

WHEN Commander AI interprets a verdict THE SYSTEM SHALL preserve disposition semantics and source context rather than reducing the verdict to pass/fail. [Source: Spec #62 §Verdict Semantics]

### v1.3 Requirement 11 — AI audit

WHEN Commander AI produces a material recommendation or draft THE SYSTEM SHALL emit an audit event with prompt context, sources used, output type and reviewer path. [Source: Spec #13 §Audit and Governance]

### v1.3 Requirement 12 — Mission pulse explanation

WHEN Commander AI explains mission, system, team or domain pulse THE SYSTEM SHALL use the pulse source data and avoid changing the underlying pulse score. [Source: Spec #34 §Mission Control, System Pulse, Team Pulse and Domain Pulse]

### v1.3 Requirement 13 — Next best action

WHEN Commander AI proposes a next best action THE SYSTEM SHALL label it as recommendation and include case/risk/priority evidence and required approvals. [Source: Spec #13 §Commander AI Use Cases]

### v1.3 Requirement 14 — Permission-aware AI

WHEN a user requests AI assistance on restricted data THE SYSTEM SHALL enforce the same RBAC and entitlement visibility limits as the underlying UI/API. [Source: Spec #13 §Access Control]

### v1.3 Requirement 15 — Prompt injection boundary

WHEN AI input includes external or user-supplied text THE SYSTEM SHALL treat it as untrusted content and prevent it from overriding Commander authority. [Source: Spec #13 §Grounding Rules]

### v1.3 Requirement 16 — AI configuration baseline

WHEN tenant AI settings are applied THE SYSTEM SHALL use tenant configuration and baseline defaults for model enablement, grounding and output controls. [Source: Spec #13 §AI Configuration]

### v1.3 Requirement 17 — Internal risk boundary

WHEN Commander AI summarises internal behavioural intelligence THE SYSTEM SHALL avoid HR, forensic, disciplinary or investigation-grade conclusions. [Source: Spec #75 §Boundary Statements; Spec #59 §Internal Behavioural Stream]

### v1.3 Requirement 18 — Silent defence support

WHEN Commander AI drafts a silent defence report narrative THE SYSTEM SHALL ground it in daily tool activity, cases, control actions and audit evidence. [Source: Spec #73 §Silent Defence Reporting]

### v1.3 Requirement 19 — Model output classification

WHEN Commander AI returns an answer THE SYSTEM SHALL classify the output as explanation, draft, recommendation, summary or decision-support and not as system decision. [Source: Spec #13 §Output Classes]

### v1.3 Requirement 20 — AI refusal

WHEN a user asks Commander AI to bypass policy, authority or SOC boundaries THE SYSTEM SHALL refuse the request and log the refusal as a governance event. [Source: Spec #13 §Boundary Controls]

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.3.1 lineage closure requirements

### Commander AI Mode 1 — Estate Mode

WHEN Commander AI operates in Estate Mode THE SYSTEM SHALL ground outputs in estate intelligence, asset cartography, identity intelligence and posture state. [Source: Master Proposition §18]

### Commander AI Mode 2 — Engineering Mode

WHEN Commander AI operates in Engineering Mode THE SYSTEM SHALL scope output to engineering and build-time assistance and SHALL NOT mutate runtime case state. [Source: Master Proposition §18]

### Commander AI Mode 3 — Triage Mode

WHEN Commander AI operates in Triage Mode THE SYSTEM SHALL scope output to case triage assistance and SHALL preserve all closed-loop lifecycle invariants. [Source: Master Proposition §18]

### Commander AI Mode 4 — Reporting Mode

WHEN Commander AI operates in Reporting Mode THE SYSTEM SHALL scope output to summary, report drafting and reviewer-presented narrative. [Source: Master Proposition §18]

### Commander AI Mode Transition

WHEN Commander AI mode is selected or switched THE SYSTEM SHALL audit the mode transition and ground each mode against only its permitted source surfaces. [Source: Master Proposition §18]

### Commander AI BYOM

WHEN Commander AI uses Bring-Your-Own-Model THE SYSTEM SHALL preserve prompt template intellectual property, admin dashboard surfaces, health monitoring, output validation and the tiered-intelligence three-level model. [Source: Master Proposition §18]

