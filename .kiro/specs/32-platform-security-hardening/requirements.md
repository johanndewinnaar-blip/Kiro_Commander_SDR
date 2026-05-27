# Requirements — Platform Security and Hardening

**Spec ID:** `32-platform-security-hardening`  
**Target version:** v1.3.1  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #02 DevOps/Environments/CI-CD, Spec #19 Full RBAC Permission Matrix, Spec #25 Trust Boundary & Third-Party Intelligence, Spec #27 Shared Responsibility Profile & Configuration Governance, Spec #48 Audit Event Framework, Spec #50 RBAC/Entitlement/Feature Flag/Menu Visibility
**v1.3 depth:** full content-depth translation applied to this spec during v1.3 remediation.

## Purpose

Authentication, tenancy, secrets, data protection, secure coding and abuse prevention.

## Scope in

- Provide a versioned implementation plan for Platform Security and Hardening.
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

WHEN platform security controls are planned THE SYSTEM SHALL include tenant isolation, RBAC, audit, secret handling and data retention.

### Domain Requirement 2 — Baseline rule

WHEN external input is accepted THE SYSTEM SHALL validate schema, tenant scope and source authority.

### Domain Requirement 3 — Baseline rule

WHEN secrets are required THE SYSTEM SHALL use placeholder references only until approved secret management exists.

### Domain Requirement 4 — Baseline rule

WHEN third-party intelligence is consumed THE SYSTEM SHALL preserve trust boundary and confidence state.

### Domain Requirement 5 — Baseline rule

WHEN privileged admin actions occur THE SYSTEM SHALL emit audit events and review triggers.

### Domain Requirement 6 — Baseline rule

WHEN a security control is incomplete THE SYSTEM SHALL mark the deployment state as not production-ready.

## v1.3 baseline-depth requirements

### v1.3 Requirement 1 — Environment separation

WHEN environments are configured THE SYSTEM SHALL separate local, test, staging and production settings with no credential reuse. [Source: Spec #02 §Environment Model]

### v1.3 Requirement 2 — Secret handling

WHEN a secret or token is required THE SYSTEM SHALL store it through approved secret mechanisms and prevent logging or fixture inclusion. [Source: Spec #02 §Environment Variables and Secrets]

### v1.3 Requirement 3 — RBAC enforcement

WHEN a user attempts a sensitive read or mutation THE SYSTEM SHALL evaluate role, permission, tenant scope, entitlement and feature flag before access. [Source: Spec #19 §RBAC Model; Spec #50 §Backend Enforcement Rule]

### v1.3 Requirement 4 — Permission naming

WHEN new permissions are defined THE SYSTEM SHALL use the baseline permission naming standard and domain/action structure. [Source: Spec #19 §Permission Naming Standard]

### v1.3 Requirement 5 — Data scoping

WHEN a query reads tenant or restricted data THE SYSTEM SHALL apply tenant, role, case relationship and authority scoping. [Source: Spec #19 §Data Scoping Rules]

### v1.3 Requirement 6 — Break-glass control

WHEN break-glass access is invoked THE SYSTEM SHALL require explicit permission, justification, expiry and audit event. [Source: Spec #19 §Break-Glass Permissioning]

### v1.3 Requirement 7 — Push permissioning

WHEN a push or dry-run action is requested THE SYSTEM SHALL enforce push permissions, approval chain and feature entitlement. [Source: Spec #19 §Push Permissioning]

### v1.3 Requirement 8 — Trust boundary entity

WHEN third-party or shared-boundary intelligence is created THE SYSTEM SHALL model it as a TrustBoundary entity with owner, evidence and relationship context. [Source: Spec #25 §TrustBoundary Entity]

### v1.3 Requirement 9 — Third-party enrichment

WHEN trust-boundary data is enriched THE SYSTEM SHALL record source, confidence, refresh state and resulting cases or risks. [Source: Spec #25 §Enrichment Workflow]

### v1.3 Requirement 10 — Blind spot detection

WHEN third-party or trust-boundary evidence indicates missing visibility THE SYSTEM SHALL create blind spot evidence and route through case/communication integration. [Source: Spec #25 §Blind Spot Detection]

### v1.3 Requirement 11 — Shared responsibility profile

WHEN a shared responsibility profile is configured THE SYSTEM SHALL record responsibility boundary, owner, evidence and review cadence. [Source: Spec #27 §Shared Responsibility Profile]

### v1.3 Requirement 12 — Configuration governance

WHEN governed configuration changes THE SYSTEM SHALL require rationale, approval, versioning, effective date and rollback path. [Source: Spec #27 §Configuration Governance]

### v1.3 Requirement 13 — Audit immutability

WHEN security-sensitive events occur THE SYSTEM SHALL write append-only audit events that cannot be silently modified. [Source: Spec #48 §Audit Event Framework]

### v1.3 Requirement 14 — Menu visibility

WHEN a menu item is rendered THE SYSTEM SHALL evaluate registered visibility metadata instead of hardcoding display rules. [Source: Spec #50 §Visibility Decision Rule]

### v1.3 Requirement 15 — Build mode restriction

WHEN build mode is enabled THE SYSTEM SHALL prevent it from being used for tenant production access. [Source: Spec #50 §Build Mode]

### v1.3 Requirement 16 — Runtime mode restriction

WHEN runtime mode is enabled THE SYSTEM SHALL show only what the current user, tenant, environment and policy may access. [Source: Spec #50 §Runtime Mode]

### v1.3 Requirement 17 — Action metadata

WHEN a sensitive action is registered THE SYSTEM SHALL include route, permission, entitlement, feature flag, policy and audit metadata. [Source: Spec #50 §Action Metadata Schema]

### v1.3 Requirement 18 — Frontend hiding limitation

WHEN a frontend element is hidden THE SYSTEM SHALL still enforce the same permission and entitlement server-side. [Source: Spec #50 §Backend Enforcement Rule]

### v1.3 Requirement 19 — CI security gate

WHEN code or configuration is promoted THE SYSTEM SHALL require CI gates for tests, scanning and human review before release. [Source: Spec #02 §Required Gates]

### v1.3 Requirement 20 — Tenant isolation event

WHEN a cross-tenant access attempt occurs THE SYSTEM SHALL deny it and create a high-severity security audit event. [Source: Spec #19 §Data Scoping Rules; Spec #48 Audit]

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.
