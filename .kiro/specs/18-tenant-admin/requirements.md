# Requirements — Tenant Admin

**Spec ID:** `18-tenant-admin`  
**Target version:** v1.3.1  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #02 Multi-Tenancy and SSO Implementation, Spec #03 Tenant Onboarding Workflow, Spec #44 Tenant Configuration Registry, Spec #49 Notification and Alert Adapter Framework, Spec #50 RBAC Entitlement Feature Flag Menu Visibility, Spec #55 Baseline Configuration Framework Model and Defaults

## Purpose

Tenant settings, feature flags, baselines, persona controls, integration status and safe configuration.

## Scope in

- Provide a versioned implementation plan for Tenant Admin.
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

WHEN a tenant is configured THE SYSTEM SHALL capture tenant identity, tenancy mode, domain, owner, baseline profile and feature entitlement context.

### Domain Requirement 2 — Baseline rule

WHEN tenant settings change THE SYSTEM SHALL emit an audit event and preserve previous state.

### Domain Requirement 3 — Baseline rule

WHEN tenant admin manages notifications THE SYSTEM SHALL preserve adapter configuration without sending real messages before approval.

### Domain Requirement 4 — Baseline rule

WHEN tenant admin manages baselines THE SYSTEM SHALL distinguish defaults, tenant overrides and effective runtime state.

### Domain Requirement 5 — Baseline rule

WHEN tenant admin manages users THE SYSTEM SHALL enforce RBAC and SSO boundaries.

### Domain Requirement 6 — Baseline rule

WHEN tenant setup is incomplete THE SYSTEM SHALL show setup state and required next actions.

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.2 application boundary enumeration — Tenant Admin

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Tenant Admin

WHEN Commander application boundaries are evaluated THE SYSTEM SHALL preserve the Tenant Admin as a distinct application at admin.commander-sdr.com and SHALL NOT collapse it into another boundary. [Source: Master Technical Specification §8.3; Spec #39; Spec #45; Spec #38]

## v1.2 lifecycle and configuration governance

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Tenant lifecycle provisioning

WHEN a tenant lifecycle is managed THE SYSTEM SHALL support provisioning, baseline profile assignment, initial configuration, connector onboarding, pilot operation, production cutover, renewal, expansion and termination. [Source: Master Technical Specification §13.1]

### v1.2 Requirement 2 — Tenant configuration governance

WHEN v2.6 configurable parameters are changed THE SYSTEM SHALL use Tenant Configuration Registry defaults, tenant customisation, versioning, audit and Commercial Control Plane baseline profile authority. [Source: Master Technical Specification §10.4; Master Proposition §21.1; Spec #55]

## v1.3.1 lineage closure requirements

### Tenant Production Cutover

WHEN a tenant moves through production cutover THE SYSTEM SHALL apply the cutover gate, residency validation and connector handover steps before live operation. [Source: Master Technical Specification §13.1]

### Tenant Renewal Expansion Termination

WHEN a tenant enters renewal, expansion or termination THE SYSTEM SHALL apply the governed lifecycle transition with audit and data handling per tenant policy. [Source: Master Technical Specification §13.1]

### Tenant Lifecycle Context Preservation

WHEN tenant lifecycle changes THE SYSTEM SHALL preserve residency, RBAC, entitlement and audit context throughout the transition. [Source: Master Technical Specification §13.1]

