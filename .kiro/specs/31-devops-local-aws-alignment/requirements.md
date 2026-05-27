# Requirements — DevOps Local and AWS Alignment

**Spec ID:** `31-devops-local-aws-alignment`  
**Target version:** v1.3.1  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #03 Backend/API Architecture, Spec #04 Frontend Architecture, Spec #06 Worker and Scheduling, Spec #16 Performance/Scaling and Operational
**v1.3 depth:** full content-depth translation applied to this spec during v1.3 remediation.

## Purpose

Local-first workflow, CI/CD planning, environment strategy and AWS deployment runway.

## Scope in

- Provide a versioned implementation plan for DevOps Local and AWS Alignment.
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

WHEN local development is configured THE SYSTEM SHALL run without live AWS resources, real vendor credentials or production secrets.

### Domain Requirement 2 — Baseline rule

WHEN AWS alignment is documented THE SYSTEM SHALL keep it as future target architecture until explicitly approved.

### Domain Requirement 3 — Baseline rule

WHEN CI/CD planning is added THE SYSTEM SHALL preserve validation, tests and change-control gates before deployment.

### Domain Requirement 4 — Baseline rule

WHEN worker behaviour is planned THE SYSTEM SHALL separate asynchronous jobs from request-response API paths.

### Domain Requirement 5 — Baseline rule

WHEN deployment architecture is compared THE SYSTEM SHALL include local, container and AWS-aligned options.

### Domain Requirement 6 — Baseline rule

WHEN infrastructure code is introduced THE SYSTEM SHALL require owner approval and security review first.

## v1.3 baseline-depth requirements

### v1.3 Requirement 1 — TypeScript runtime

WHEN production runtime code is planned THE SYSTEM SHALL use the TypeScript-first runtime boundary and keep Python as support/analytics only. [Source: Spec #03 §Backend Architecture; Spec #04 §Frontend Architecture]

### v1.3 Requirement 2 — API framework alignment

WHEN backend API implementation is planned THE SYSTEM SHALL align to the Fastify/Node service model and typed request validation. [Source: Spec #03 §Backend/API Architecture]

### v1.3 Requirement 3 — Frontend framework alignment

WHEN frontend implementation is planned THE SYSTEM SHALL align to the Next.js application structure, route model and component standards. [Source: Spec #04 §Application Structure]

### v1.3 Requirement 4 — Permission-aware UI

WHEN a frontend route or action is rendered THE SYSTEM SHALL apply permission-aware UI while preserving backend enforcement. [Source: Spec #04 §Permission-aware UI]

### v1.3 Requirement 5 — API client pattern

WHEN frontend consumes backend APIs THE SYSTEM SHALL use typed API client patterns and avoid ad hoc cross-layer calls. [Source: Spec #04 §API Client Pattern]

### v1.3 Requirement 6 — Worker queue topology

WHEN background work is planned THE SYSTEM SHALL use the defined queue topology for ingestion, normalisation, evaluation, case update and notifications. [Source: Spec #06 §Queue Topology]

### v1.3 Requirement 7 — Standard job payload

WHEN a worker job is enqueued THE SYSTEM SHALL include job type, tenant, correlation ID, source, payload reference and idempotency key. [Source: Spec #06 §Standard Job Payload]

### v1.3 Requirement 8 — Idempotent worker

WHEN a worker retries a job THE SYSTEM SHALL use idempotency keys to prevent duplicate side effects. [Source: Spec #06 §Idempotency]

### v1.3 Requirement 9 — Retry backoff

WHEN a transient worker failure occurs THE SYSTEM SHALL apply configured retry and backoff policy before dead-lettering. [Source: Spec #06 §Retry and Backoff]

### v1.3 Requirement 10 — Dead-letter handling

WHEN a worker job exhausts retries THE SYSTEM SHALL move it to dead-letter handling with audit, alert and operator review metadata. [Source: Spec #06 §Dead-letter Handling]

### v1.3 Requirement 11 — Local-first boundary

WHEN development or validation is performed before cloud approval THE SYSTEM SHALL run locally using mocks, fixtures and local infrastructure equivalents. [Source: Spec #04 CHANGE-ARCH-002 §Local build boundary]

### v1.3 Requirement 12 — Terraform boundary

WHEN cloud infrastructure is represented THE SYSTEM SHALL keep Terraform as planning/alignment until live AWS creation is explicitly approved. [Source: Spec #02 §Terraform Architecture; Spec #04 CHANGE-ARCH-002]

### v1.3 Requirement 13 — GitHub Actions gate

WHEN CI/CD workflows are planned THE SYSTEM SHALL include lint, typecheck, test, security scan and build gates before merge. [Source: Spec #02 §GitHub Actions Workflows]

### v1.3 Requirement 14 — Database migration process

WHEN schema changes are planned THE SYSTEM SHALL use versioned migrations and require review before promotion. [Source: Spec #02 §Database Migration Process]

### v1.3 Requirement 15 — Health endpoints

WHEN services are planned THE SYSTEM SHALL define health endpoints and readiness/liveness signals for API and workers. [Source: Spec #02 §Observability and Health Checks]

### v1.3 Requirement 16 — Logging standard

WHEN services emit logs THE SYSTEM SHALL use structured logging with correlation, tenant and request/job IDs. [Source: Spec #02 §Logging; Spec #16 §Observability]

### v1.3 Requirement 17 — Performance requirement

WHEN a release candidate is evaluated THE SYSTEM SHALL measure API latency, worker throughput, database performance and UI responsiveness. [Source: Spec #16 §Performance Requirements]

### v1.3 Requirement 18 — Rate limiting

WHEN external integrations or APIs are planned THE SYSTEM SHALL define rate limits and backoff to protect source systems and Commander runtime. [Source: Spec #16 §Operational Requirements]

### v1.3 Requirement 19 — Environment variable governance

WHEN configuration is loaded THE SYSTEM SHALL use environment variable groups and secrets handling rules rather than hardcoding values. [Source: Spec #02 §Environment Variables and Secrets]

### v1.3 Requirement 20 — No live AWS in remediation

WHEN the Kiro pack is being remediated THE SYSTEM SHALL document AWS alignment only and create no live AWS resources. [Source: Spec #02 §AI Agent Instructions]

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.
