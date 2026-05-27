# Requirements — Programme Foundation

**Spec ID:** `00-programme-foundation`  
**Target version:** v1.3.1  
**Status:** Validated — planning and tests complete  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #01 AI Build Agent Workflow, Spec #18 Unified Identity Architecture / register mismatch noted, Spec #56 Shell Reference vs Build Authority Doctrine
**v1.3 depth:** full content-depth translation applied to this spec during v1.3 remediation.

## Purpose

Authority, repository skeleton, Kiro steering, no-code validation, source archive and change control.

## Scope in

- Provide a versioned implementation plan for Programme Foundation.
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

WHEN a build agent starts work THE SYSTEM SHALL read the authority sequence before any feature spec or build pack.

### Domain Requirement 2 — Baseline rule

WHEN a baseline conflict is detected THE SYSTEM SHALL defer to the highest-precedence baseline authority and record the conflict.

### Domain Requirement 3 — Baseline rule

WHEN a new build stage is proposed THE SYSTEM SHALL map it to the approved version roadmap before execution.

### Domain Requirement 4 — Baseline rule

WHEN source doctrine is ambiguous THE SYSTEM SHALL mark it for owner review rather than inventing scope.

### Domain Requirement 5 — Baseline rule

WHEN a Kiro task is completed THE SYSTEM SHALL update the relevant build pack and decision log if material assumptions changed.

### Domain Requirement 6 — Baseline rule

WHEN implementation is requested before validation THE SYSTEM SHALL refuse code generation and require pack validation first.

## v1.3 baseline-depth requirements

### v1.3 Requirement 1 — Mandatory read order

WHEN a build, review or documentation agent starts Commander SDR work THE SYSTEM SHALL read the mandatory authority sequence before opening feature, shell, task or generated pack files. [Source: Spec #01 §Mandatory Read Order]

### v1.3 Requirement 2 — Baseline-first artefact generation

WHEN an agent generates any Kiro artefact THE SYSTEM SHALL declare the source baseline files consumed and the authority level used for each artefact. [Source: Spec #01 §Required Agent Output Checks]

### v1.3 Requirement 3 — No independent scope creation

WHEN an agent cannot locate baseline authority for a requested scope item THE SYSTEM SHALL mark the item [BASELINE GAP — owner decision required] rather than inventing product doctrine. [Source: Spec #01 §Agent Constraints]

### v1.3 Requirement 4 — Build pack derivation

WHEN a build pack is generated or revised THE SYSTEM SHALL derive the build pack from baseline doctrine and not from the HTML shell alone. [Source: Spec #01 §Build-Pack Transition; Spec #56 §1]

### v1.3 Requirement 5 — Shell absence handling

WHEN a feature is present in specification or build-pack authority but absent from an HTML shell THE SYSTEM SHALL preserve the feature as committed scope and expose it through registry/build-mode visibility. [Source: Spec #56 §4 Build Pack Supersedes Shell]

### v1.3 Requirement 6 — Shell reference boundary

WHEN an HTML shell is used during planning THE SYSTEM SHALL treat it as visual and structural reference only and not as a feature inventory. [Source: Spec #56 §1 The HTML Shell is Reference, Not Inventory]

### v1.3 Requirement 7 — Runtime registry source

WHEN menus, routes, panels or admin surfaces are rendered THE SYSTEM SHALL derive them from registry, build-pack, RBAC, entitlement and feature-flag metadata rather than scraping shell HTML. [Source: Spec #56 §5 Registry-Driven Runtime]

### v1.3 Requirement 8 — Build-mode surface visibility

WHEN a committed route or surface is not implemented yet THE SYSTEM SHALL display it in build/developer mode with scaffold, planned, build, stub or new status metadata. [Source: Spec #56 §6 Build-Mode Visibility]

### v1.3 Requirement 9 — Runtime suppression

WHEN a user accesses runtime mode THE SYSTEM SHALL suppress routes and menu items by RBAC, entitlement, feature flag, environment and policy state. [Source: Spec #56 §7 Runtime Suppression]

### v1.3 Requirement 10 — Frontend is not security

WHEN a route or action is hidden in the frontend THE SYSTEM SHALL enforce the same permission and entitlement decision server-side. [Source: Spec #56 §8 Frontend Visibility Is Not Security]

### v1.3 Requirement 11 — Tenant context rule

WHEN tenant-scoped data, jobs, APIs, UI routes or audit entries are created THE SYSTEM SHALL attach tenant context and reject cross-tenant ambiguity. [Source: Spec #18 opening build boundary]

### v1.3 Requirement 12 — Identity determinism rule

WHEN Commander AI explains identity or programme state THE SYSTEM SHALL preserve deterministic system decisions as authority and prevent AI from deciding lifecycle state. [Source: Spec #18 §2 Identity Architecture Principles]

### v1.3 Requirement 13 — Closed-loop programme doctrine

WHEN a feature enters implementation planning THE SYSTEM SHALL define case binding, sub-action binding, validation, closure, reopening, routing, UI surface and Fusion Map binding before implementation. [Source: Spec #18 §Mandatory Build Interpretation]

### v1.3 Requirement 14 — Automatic routing doctrine

WHEN a case, blocking sub-action or programme work item requires ownership THE SYSTEM SHALL use the routing engine to produce route, owner, team, approval path, escalation path and rationale. [Source: Spec #18 §2 Non-Negotiable Closed-Loop Doctrine]

### v1.3 Requirement 15 — Audit-first operation

WHEN a programme or lifecycle decision is made THE SYSTEM SHALL emit a machine-readable rationale and immutable audit event. [Source: Spec #18 §2 Non-Negotiable Closed-Loop Doctrine]

### v1.3 Requirement 16 — Commercial control-plane separation

WHEN internal Commander/Seiertech platform scope is evaluated THE SYSTEM SHALL keep Commercial Control Plane runtime authority separate from tenant and operational application authority. [Source: Spec #56 §Commercial Control Plane Scope Clarification]

### v1.3 Requirement 17 — Tenant Admin scope preservation

WHEN tenant administration scope is evaluated THE SYSTEM SHALL preserve the full Tenant Admin menu tree from build authority even where shell drawings omit items. [Source: Spec #56 §Tenant Admin Scope Clarification]

### v1.3 Requirement 18 — Spec conflict handling

WHEN a register title and source file title conflict THE SYSTEM SHALL record the mismatch in DECISIONS.md and continue from actual source-file content. [Source: Spec #01 §Required Agent Output Checks]

### v1.3 Requirement 19 — No premature code

WHEN the Kiro pack has not passed validation THE SYSTEM SHALL refuse implementation code generation and continue pack remediation or validation only. [Source: Spec #01 §Agent Constraints]

### v1.3 Requirement 20 — No manual lifecycle authority

WHEN an operator provides manual evidence, acknowledgement, approval or challenge THE SYSTEM SHALL accept it only as an audited input to deterministic system decisions. [Source: Spec #18 §Mandatory Build Interpretation]

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.
