# Requirements — Commercial Control Plane UI

**Spec ID:** `38-commercial-control-plane-ui`  
**Target version:** v1.2  
**Status:** Planned / Kiro-ready — v1.2 no-loss remediation  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.  
**Translated from baseline:** Spec #38 Commander Internal Control Plane UI Surface, Spec #36 Commander Internal Control Plane Application Architecture, Spec #39 Application Boundary and Naming Model

## Purpose

Preserve the internal Commercial Control Plane as a distinct Commander/Seiertech application for cross-tenant operations, licensing, entitlements, deployment rings, support access, audit and baseline profile management.

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

### Requirement 1 — Distinct shell

WHEN internal Commander staff access the Commercial Control Plane THE SYSTEM SHALL present a distinct Commander Control Plane shell separate from Tenant Admin and the Operational App. [Source: Spec #38 §§1-2; Spec #39]

### Requirement 2 — Route boundary

WHEN the Commercial Control Plane is routed THE SYSTEM SHALL use the internal control boundary at control.commandersdr.com and SHALL NOT collapse it into tenant admin. [Source: Spec #38 §2; Master Technical Specification §8.3]

### Requirement 3 — Top navigation

WHEN the Control Plane shell renders top navigation THE SYSTEM SHALL include Operator Command, Customers, Tenants, Licences, Entitlements, Deployments, Support Access and Audit. [Source: Spec #38 §3.1]

### Requirement 4 — Operator Command panels

WHEN Operator Command Home renders THE SYSTEM SHALL include total customers, active tenants, suspended tenants, expiring licences, trial conversions, entitlement exceptions, failed syncs, support access, emergency controls and release ring health. [Source: Spec #38 §4.1]

### Requirement 5 — Customer register

WHEN the Customer Register renders THE SYSTEM SHALL include customer, customer ID, status, support tier, active tenants, licence plan, renewal state and commercial owner. [Source: Spec #38 §4.2]

### Requirement 6 — Tenant detail

WHEN Tenant Detail renders THE SYSTEM SHALL include tenant state, entitlements, licence summary, linked instances, tenant admins, enabled modules, feature flags, sync health and audit trail. [Source: Spec #38 §4.3]

### Requirement 7 — Entitlement editor

WHEN the Entitlement Manifest Editor is used THE SYSTEM SHALL support module, feature, connector, AI, automation, Fusion Map and reporting entitlement controls plus publish and impact preview. [Source: Spec #38 §4.5]

### Requirement 8 — Deployment rings

WHEN Deployment Ring Manager is used THE SYSTEM SHALL support ring assignment, tenant promotion/demotion, version pinning, dogfood/demo/beta marking and rollout notes. [Source: Spec #38 §4.6]

### Requirement 9 — Support access

WHEN support access is requested THE SYSTEM SHALL support request, approval, active grant, session audit and revocation queue controls. [Source: Spec #38 §4.7]

## Acceptance criteria

- Every requirement is traceable to a baseline source.
- No baseline capability in scope is silently dropped.
- Any baseline ambiguity is flagged in `DECISIONS.md` before implementation.
- No code implementation begins until Kiro validation passes.

## v1.2 application boundary enumeration — Commercial Control Plane

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Commercial Control Plane

WHEN Commander application boundaries are evaluated THE SYSTEM SHALL preserve the Commercial Control Plane as a distinct application at control.commandersdr.com and SHALL NOT collapse it into another boundary. [Source: Master Technical Specification §8.3; Spec #39; Spec #45; Spec #38]
