# Requirements — Internal Risk Investigation Sub-Lifecycle

**Spec ID:** `41-internal-risk-investigation-sub-lifecycle`  
**Target version:** v1.2  
**Status:** Planned / Kiro-ready — v1.2 no-loss remediation  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.  
**Translated from baseline:** Spec #75 Internal Risk Investigation Sub-Lifecycle, Master Proposition §26, Master Technical Specification §10.2

## Purpose

Preserve the Insider Risk boundary: Commander surfaces verdict patterns and routes intelligence, while the customer owns investigation, HR, forensic and disciplinary processes.

## Scope in

- Preserve full baseline capability intent without implementation code.
- Translate baseline doctrine into Kiro-ready requirements, design and tasks.
- Use local-first mock/seed execution until Phase 2 approves real connectors or AWS evaluation.
- Emit audit, traceability and decision records for material state or governance changes.

## Scope out

- Application code generation.
- Live AWS resource creation.
- Real vendor API credentials or production integrations.
- n8n orchestration.
- Custom Kiro powers.

## User stories and EARS requirements

### Requirement 1 — Surface not investigate

WHEN a Verdict Pattern case is generated THE SYSTEM SHALL surface the pattern and SHALL NOT determine intent, run an investigation, interview anyone, initiate HR action or disciplinary action. [Source: Spec #75 §§2,3.4,6]

### Requirement 2 — Six-phase lifecycle

WHEN a Verdict Pattern case exists THE SYSTEM SHALL follow the Surface, Triage, Routing, Customer Investigation, Outcome and Closure phases. [Source: Spec #75 §3]

### Requirement 3 — Surface phase fields

WHEN the Surface phase renders THE SYSTEM SHALL include pattern description, affected identity reference, pattern severity, context, timestamps, dispositions and no determination of intent. [Source: Spec #75 §3.1]

### Requirement 4 — Triage scope

WHEN Internal Risk authority users triage a pattern THE SYSTEM SHALL allow significance confirmation, noise suppression and routing of confirmed patterns only. [Source: Spec #75 §3.2]

### Requirement 5 — Customer-owned investigation

WHEN the case enters Customer Investigation phase THE SYSTEM SHALL preserve handoff and intelligence support only, and SHALL NOT cross into investigation ownership. [Source: Spec #75 §3.4]

### Requirement 6 — Outcome categories

WHEN outcome disposition is received THE SYSTEM SHALL record no issue, issue addressed, ongoing concern or privileged outcome, with audit logging. [Source: Spec #75 §3.5]

### Requirement 7 — Identity access governance

WHEN identity-level detail is accessed THE SYSTEM SHALL require Internal Risk authority and audit-of-access logging. [Source: Spec #75 §4]

### Requirement 8 — Jurisdictional controls

WHEN Internal Behavioural Intelligence is configured THE SYSTEM SHALL support jurisdictional disablement, pattern restriction, thresholds, RBAC, transparency export and retention restriction. [Source: Spec #75 §5]

### Requirement 9 — Evidence boundary

WHEN evidence is handled THE SYSTEM SHALL mark Commander evidence as intelligence-grade and SHALL NOT represent it as investigation-grade forensic evidence. [Source: Spec #75 §6]

### Requirement 10 — Cross-boundary correlation

WHEN Verdict Pattern cases correlate with other case types THE SYSTEM SHALL surface the correlation without collapsing lifecycles or routing boundaries. [Source: Spec #75 §7]

## Acceptance criteria

- Every requirement is traceable to a baseline source.
- No baseline capability in scope is silently dropped.
- Any baseline ambiguity is flagged in `DECISIONS.md` before implementation.
- No code implementation begins until Kiro validation passes.

## v1.2 Master Proposition §7 deliverables

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Internal actor concentration

WHEN Internal Behavioural Intelligence identifies concentration of internal actor activity THE SYSTEM SHALL surface it through governed internal risk boundaries without running an investigation. [Source: Master Proposition §7; Spec #75]

## v1.3.1 lineage closure requirements

### Jurisdictional Configuration Application

WHEN a tenant configures jurisdiction THE SYSTEM SHALL apply the jurisdictional configuration to internal risk routing, evidence handling and customer-owned investigation handoff. [Source: Master Technical Specification §10.3; Master Proposition §26.3]

### Jurisdictional RBAC Restriction

WHEN jurisdictional configuration includes RBAC restriction THE SYSTEM SHALL enforce the restriction on internal risk surfaces and investigation-grade evidence boundaries. [Source: Master Technical Specification §10.3]

### Jurisdictional Re-evaluation

WHEN jurisdictional configuration changes THE SYSTEM SHALL re-evaluate active internal risk cases for routing or evidence-handling changes. [Source: Master Technical Specification §10.3; Master Proposition §26.3]

### Insider Risk Prohibition — Investigation

WHEN internal risk activity is detected THE SYSTEM SHALL NOT conduct insider risk investigations. [Source: Master Proposition §26.1]

### Insider Risk Prohibition — Intent

WHEN internal risk activity is detected THE SYSTEM SHALL NOT make determinations of intent. [Source: Master Proposition §26.1]

### Insider Risk Prohibition — Disciplinary or Legal Action

WHEN internal risk activity is detected THE SYSTEM SHALL NOT initiate disciplinary or legal action. [Source: Master Proposition §26.1]

### Insider Risk Customer-Owned Handoff

WHEN internal risk activity surfaces THE SYSTEM SHALL hand off to the customer's Internal Risk function which owns HR engagement, legal review, disciplinary action and law enforcement referral. [Source: Master Proposition §26.2]

