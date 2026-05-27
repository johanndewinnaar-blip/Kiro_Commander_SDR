# Requirements — RBAC, Entitlement and Feature Flags

**Spec ID:** `19-rbac-entitlement-feature-flags`  
**Target version:** v1.3.1  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #19 Full RBAC Permission Matrix, Spec #47 Application Route and Navigation Register, Spec #50 RBAC Entitlement Feature Flag Menu Visibility, Spec #54 Pre-Build UI Navigation and Route Baseline

## Purpose

Persona access, entitlement gates, route/menu visibility, policy state and audit.

## Scope in

- Provide a versioned implementation plan for RBAC, Entitlement and Feature Flags.
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

WHEN a route is rendered THE SYSTEM SHALL evaluate role, entitlement and feature flag visibility before display.

### Domain Requirement 2 — Baseline rule

WHEN a user lacks permission THE SYSTEM SHALL hide or disable restricted actions without exposing unauthorised data.

### Domain Requirement 3 — Baseline rule

WHEN a feature flag is changed THE SYSTEM SHALL record actor, scope, prior state, new state and effective time.

### Domain Requirement 4 — Baseline rule

WHEN tenant admin configures menu visibility THE SYSTEM SHALL preserve operational app, tenant admin and commercial control plane boundaries.

### Domain Requirement 5 — Baseline rule

WHEN Commander AI is invoked THE SYSTEM SHALL enforce the invoking user's RBAC and tenant context.

### Domain Requirement 6 — Baseline rule

WHEN permission inheritance is applied THE SYSTEM SHALL make explicit whether access comes from role, team, tenant or feature entitlement.

### Domain Requirement 7 — Baseline rule

WHEN an admin override is applied THE SYSTEM SHALL emit an audit event and review trigger.

### Domain Requirement 8 — Baseline rule

WHEN a route is not authorised THE SYSTEM SHALL not leak panel data via API or fixture shortcuts.

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.2 master inventory enumeration — eleven personas

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Security Operations Analyst (SOA)

WHEN RBAC personas are configured THE SYSTEM SHALL support the Security Operations Analyst (SOA) persona and its entitled route, feature and authority overlay visibility. [Source: Master Technical Specification §9.1; Spec #17 v2.6 addendum]

### v1.2 Requirement 2 — Security Operations Manager (SOM)

WHEN RBAC personas are configured THE SYSTEM SHALL support the Security Operations Manager (SOM) persona and its entitled route, feature and authority overlay visibility. [Source: Master Technical Specification §9.1; Spec #17 v2.6 addendum]

### v1.2 Requirement 3 — Vulnerability Analyst

WHEN RBAC personas are configured THE SYSTEM SHALL support the Vulnerability Analyst persona and its entitled route, feature and authority overlay visibility. [Source: Master Technical Specification §9.1; Spec #17 v2.6 addendum]

### v1.2 Requirement 4 — Security Architect

WHEN RBAC personas are configured THE SYSTEM SHALL support the Security Architect persona and its entitled route, feature and authority overlay visibility. [Source: Master Technical Specification §9.1; Spec #17 v2.6 addendum]

### v1.2 Requirement 5 — Identity/Access Specialist

WHEN RBAC personas are configured THE SYSTEM SHALL support the Identity/Access Specialist persona and its entitled route, feature and authority overlay visibility. [Source: Master Technical Specification §9.1; Spec #17 v2.6 addendum]

### v1.2 Requirement 6 — Risk/Compliance/Audit User

WHEN RBAC personas are configured THE SYSTEM SHALL support the Risk/Compliance/Audit User persona and its entitled route, feature and authority overlay visibility. [Source: Master Technical Specification §9.1; Spec #17 v2.6 addendum]

### v1.2 Requirement 7 — M&A/Transformation Analyst

WHEN RBAC personas are configured THE SYSTEM SHALL support the M&A/Transformation Analyst persona and its entitled route, feature and authority overlay visibility. [Source: Master Technical Specification §9.1; Spec #17 v2.6 addendum]

### v1.2 Requirement 8 — CISO

WHEN RBAC personas are configured THE SYSTEM SHALL support the CISO persona and its entitled route, feature and authority overlay visibility. [Source: Master Technical Specification §9.1; Spec #17 v2.6 addendum]

### v1.2 Requirement 9 — Control Owner

WHEN RBAC personas are configured THE SYSTEM SHALL support the Control Owner persona and its entitled route, feature and authority overlay visibility. [Source: Master Technical Specification §9.1; Spec #17 v2.6 addendum]

### v1.2 Requirement 10 — Security Analyst

WHEN RBAC personas are configured THE SYSTEM SHALL support the Security Analyst persona and its entitled route, feature and authority overlay visibility. [Source: Master Technical Specification §9.1; Spec #17 v2.6 addendum]

### v1.2 Requirement 11 — Risk Analyst

WHEN RBAC personas are configured THE SYSTEM SHALL support the Risk Analyst persona and its entitled route, feature and authority overlay visibility. [Source: Master Technical Specification §9.1; Spec #17 v2.6 addendum]

## v1.2 master inventory enumeration — five authority overlays

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Administrative authority

WHEN authority overlays are evaluated THE SYSTEM SHALL support Administrative authority and propagate it through route visibility, action permission and audit semantics. [Source: Master Technical Specification §9.2; Spec #19 v2.6]

### v1.2 Requirement 2 — Investigation authority

WHEN authority overlays are evaluated THE SYSTEM SHALL support Investigation authority and propagate it through route visibility, action permission and audit semantics. [Source: Master Technical Specification §9.2; Spec #19 v2.6]

### v1.2 Requirement 3 — Approval authority

WHEN authority overlays are evaluated THE SYSTEM SHALL support Approval authority and propagate it through route visibility, action permission and audit semantics. [Source: Master Technical Specification §9.2; Spec #19 v2.6]

### v1.2 Requirement 4 — Reporting authority

WHEN authority overlays are evaluated THE SYSTEM SHALL support Reporting authority and propagate it through route visibility, action permission and audit semantics. [Source: Master Technical Specification §9.2; Spec #19 v2.6]

### v1.2 Requirement 5 — Internal Risk authority

WHEN authority overlays are evaluated THE SYSTEM SHALL support Internal Risk authority and propagate it through route visibility, action permission and audit semantics. [Source: Master Technical Specification §9.2; Spec #19 v2.6]
