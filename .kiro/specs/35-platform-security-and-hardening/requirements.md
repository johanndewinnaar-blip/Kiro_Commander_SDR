# Requirements — Platform Security and Hardening

**Spec ID:** `35-platform-security-and-hardening`  
**Target version:** v1.2  
**Status:** Planned / Kiro-ready — v1.2 no-loss remediation  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.  
**Translated from baseline:** Spec #10 Platform Security and Hardening, Master Technical Specification §§9-11

## Purpose

Own platform security, tenant isolation, authentication, authorisation, secrets, encryption, audit immutability, break-glass, connector security and Phase 0 push safety.

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

### Requirement 1 — SSO identity provider model

WHEN a user authenticates THE SYSTEM SHALL use tenant-configured OIDC/SAML-compatible SSO and SHALL NOT use local password authentication as product baseline. [Source: Spec #10 §4]

### Requirement 2 — Server-side sessions

WHEN a browser session is created THE SYSTEM SHALL store the session server-side, enforce idle and maximum lifetime, and invalidate on role or tenant revocation. [Source: Spec #10 §4.2]

### Requirement 3 — Mandatory tenant context

WHEN a tenant-scoped object, query, job, connector pull, normalisation write, rule evaluation, finding, case, audit entry or search index is processed THE SYSTEM SHALL include tenant context. [Source: Spec #10 §5]

### Requirement 4 — Tenant isolation tests

WHEN a tenant-scoped repository or API endpoint is planned THE SYSTEM SHALL include a test proving Tenant A cannot read, modify, list or infer Tenant B data. [Source: Spec #10 §5.2]

### Requirement 5 — RBAC enforcement points

WHEN access is evaluated THE SYSTEM SHALL enforce RBAC at API route, service operation, repository query, worker job and UI visibility boundaries. [Source: Spec #10 §6.1]

### Requirement 6 — Secrets never logged

WHEN secrets, tokens, API keys, passwords or email bodies are handled THE SYSTEM SHALL NOT log them. [Source: Spec #10 §3]

### Requirement 7 — Break-glass control

WHEN break-glass access is activated THE SYSTEM SHALL require justification, duration, activation/expiry audit, governance case creation and no audit or tenant-isolation bypass. [Source: Spec #10 §8]

### Requirement 8 — Encryption

WHEN data is transmitted or stored THE SYSTEM SHALL apply encryption in transit and at rest per baseline security architecture. [Source: Spec #10 §§1-3]

### Requirement 9 — Connector security

WHEN connector credentials or pulls are handled THE SYSTEM SHALL apply least privilege, tenant scoping, secret protection and auditability. [Source: Spec #10 §§2,5]

### Requirement 10 — Phase 0 push safety

WHEN any push-intent capability exists in Phase 0 THE SYSTEM SHALL prevent external push execution and preserve approval-only placeholder behaviour. [Source: Spec #10 §2; Spec #14]

## Acceptance criteria

- Every requirement is traceable to a baseline source.
- No baseline capability in scope is silently dropped.
- Any baseline ambiguity is flagged in `DECISIONS.md` before implementation.
- No code implementation begins until Kiro validation passes.