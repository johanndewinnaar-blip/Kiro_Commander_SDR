# Requirements — Application Shell, Navigation and Route Registry

**Spec ID:** `01-application-shell-navigation-route-registry`  
**Target version:** v1.2  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #01 Application Boundary and Routing Doctrine, Spec #35 Shell UI Functional Surface, Spec #45 Application Shell Boundary, Spec #47 Application Route and Navigation Register, Spec #48 Active Shell UI Authority, Spec #54 Pre-Build UI Navigation and Route Baseline, Spec #56 Shell Reference vs Build Authority Doctrine

## Purpose

Persistent shell, top navigation, left navigation, route registry, page schedule and build-mode visibility.

## Scope in

- Provide a versioned implementation plan for Application Shell, Navigation and Route Registry.
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

WHEN a page or route is added THE SYSTEM SHALL register it in the route registry before implementation.

### Domain Requirement 2 — Baseline rule

WHEN a navigation item is rendered THE SYSTEM SHALL preserve operational app, tenant admin and commercial control plane boundaries.

### Domain Requirement 3 — Baseline rule

WHEN a shell reference omits a committed feature THE SYSTEM SHALL retain the feature as scaffold or stub rather than deleting it.

### Domain Requirement 4 — Baseline rule

WHEN the shell layout changes THE SYSTEM SHALL preserve sidebar, top navigation, search, Commander AI and notification regions unless changed by authority.

### Domain Requirement 5 — Baseline rule

WHEN a route is gated by RBAC THE SYSTEM SHALL reflect visibility state in the route registry.

### Domain Requirement 6 — Baseline rule

WHEN a page is not yet implemented THE SYSTEM SHALL show its build status rather than hiding the journey.

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.2 master inventory enumeration — six workspaces

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Executive Posture

WHEN the workspace navigation model is rendered THE SYSTEM SHALL include the Executive Posture workspace in the baseline route registry and page schedule. [Source: Master Technical Specification §8.1; Master Proposition §24]

### v1.2 Requirement 2 — Drift Operations

WHEN the workspace navigation model is rendered THE SYSTEM SHALL include the Drift Operations workspace in the baseline route registry and page schedule. [Source: Master Technical Specification §8.1; Master Proposition §24]

### v1.2 Requirement 3 — Control & Architecture

WHEN the workspace navigation model is rendered THE SYSTEM SHALL include the Control & Architecture workspace in the baseline route registry and page schedule. [Source: Master Technical Specification §8.1; Master Proposition §24]

### v1.2 Requirement 4 — Identity & Asset Intelligence

WHEN the workspace navigation model is rendered THE SYSTEM SHALL include the Identity & Asset Intelligence workspace in the baseline route registry and page schedule. [Source: Master Technical Specification §8.1; Master Proposition §24]

### v1.2 Requirement 5 — Assurance & Audit

WHEN the workspace navigation model is rendered THE SYSTEM SHALL include the Assurance & Audit workspace in the baseline route registry and page schedule. [Source: Master Technical Specification §8.1; Master Proposition §24]

### v1.2 Requirement 6 — Transformation & M&A

WHEN the workspace navigation model is rendered THE SYSTEM SHALL include the Transformation & M&A workspace in the baseline route registry and page schedule. [Source: Master Technical Specification §8.1; Master Proposition §24]
