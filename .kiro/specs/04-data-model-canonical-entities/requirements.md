# Requirements — Canonical Data Model

**Spec ID:** `04-data-model-canonical-entities`  
**Target version:** v1.3.1  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #03 Backend/API Architecture, Spec #05 Data Connector Normalisation, Spec #11b Workspace & Dashboard Composition, Spec #15 SIEM/SOAR Rule Generation, Spec #18 Unified Identity Architecture, Spec #20 Coordinated Push Group Schema
**v1.3 depth:** full content-depth translation applied to this spec during v1.3 remediation.

## Purpose

Asset, identity, exposure, control, coverage, case, risk object, debt, compliance mapping and relationships.

## Scope in

- Provide a versioned implementation plan for Canonical Data Model.
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

WHEN a canonical entity is defined THE SYSTEM SHALL declare identifier, tenant scope, source lineage, ownership, lifecycle state and audit fields.

### Domain Requirement 2 — Baseline rule

WHEN an asset record is created THE SYSTEM SHALL preserve source identifiers, normalised identity, ownership, criticality, environment, exposure state and control coverage references.

### Domain Requirement 3 — Baseline rule

WHEN an identity record is created THE SYSTEM SHALL preserve principal type, directory source, entitlement context, risk context and linked assets or services.

### Domain Requirement 4 — Baseline rule

WHEN a control record is created THE SYSTEM SHALL declare intended state, actual state, baseline source, enforcement point and evidence source.

### Domain Requirement 5 — Baseline rule

WHEN a coverage record is created THE SYSTEM SHALL bind it to asset, identity, control, connector source and timestamp.

### Domain Requirement 6 — Baseline rule

WHEN an exposure record is created THE SYSTEM SHALL bind vulnerability, misconfiguration, internet exposure, compensating control and attack-surface attribution where applicable.

### Domain Requirement 7 — Baseline rule

WHEN a vulnerability record is normalised THE SYSTEM SHALL preserve CVE, CVSS, KEV, affected asset, source scanner and remediation status fields where present.

### Domain Requirement 8 — Baseline rule

WHEN a case object is created THE SYSTEM SHALL bind it to risk object, source signal, owner, lifecycle state, SLA state and audit event references.

### Domain Requirement 9 — Baseline rule

WHEN a risk object is created THE SYSTEM SHALL declare risk type, affected entity, justification, owner, treatment state and expiry or review trigger.

### Domain Requirement 10 — Baseline rule

WHEN a security debt object is created THE SYSTEM SHALL distinguish unresolved remediation debt from accepted risk.

### Domain Requirement 11 — Baseline rule

WHEN a compliance mapping is created THE SYSTEM SHALL map canonical controls to framework references without making the framework the source of truth.

### Domain Requirement 12 — Baseline rule

WHEN an entity appears in multiple sources THE SYSTEM SHALL resolve authority using deterministic source-precedence and reconciliation rules.

### Domain Requirement 13 — Baseline rule

WHEN source data conflicts THE SYSTEM SHALL preserve conflict evidence and avoid overwriting higher-authority baseline state.

### Domain Requirement 14 — Baseline rule

WHEN relationship edges are created THE SYSTEM SHALL declare edge type, direction, evidence source, confidence and timestamp.

### Domain Requirement 15 — Baseline rule

WHEN seed data is generated THE SYSTEM SHALL conform to the same canonical contracts used by future real connectors.

### Domain Requirement 16 — Baseline rule

WHEN Commander AI consumes canonical data THE SYSTEM SHALL expose only grounded, tenant-scoped, permission-allowed fields.

### Domain Requirement 17 — Baseline rule

WHEN a canonical schema changes THE SYSTEM SHALL record version, migration impact, affected specs and acceptance tests.

### Domain Requirement 18 — Baseline rule

WHEN data is stored or queried THE SYSTEM SHALL enforce tenant context by default and reject unscoped access.

## v1.3 baseline-depth requirements

### v1.3 Requirement 1 — API tenant scope

WHEN an API endpoint reads or writes canonical data THE SYSTEM SHALL require tenant context and reject ambiguous tenant resolution. [Source: Spec #03 §API Layer and Tenant Scoping]

### v1.3 Requirement 2 — Backend validation

WHEN canonical data enters the API layer THE SYSTEM SHALL validate it against typed contracts before persistence or evaluation. [Source: Spec #03 §Request Validation]

### v1.3 Requirement 3 — Repository boundary

WHEN domain data is persisted THE SYSTEM SHALL use domain repositories rather than bypassing canonical data-access boundaries. [Source: Spec #03 §Backend Architecture Principles]

### v1.3 Requirement 4 — Canonical asset entity

WHEN an Asset is persisted THE SYSTEM SHALL store stable identity, source references, ownership, environment, classification and coverage metadata. [Source: Spec #05 §6.4.2 Asset]

### v1.3 Requirement 5 — Canonical identity entity

WHEN an Identity is persisted THE SYSTEM SHALL store identity class, provider lineage, privilege context and relationship references. [Source: Spec #18 §3 Identity Entity Classes]

### v1.3 Requirement 6 — Connector entity

WHEN a Connector is persisted THE SYSTEM SHALL store connector class, conformance tier, status, tenant scope, credential reference and run metadata. [Source: Spec #05 §6.4.4 Connector; Spec #61 §Connector Contract]

### v1.3 Requirement 7 — AuditEntry entity

WHEN an AuditEntry is persisted THE SYSTEM SHALL store actor, action, prior state, new state, timestamp, tenant and source signal reference. [Source: Spec #05 §6.4.5 AuditEntry]

### v1.3 Requirement 8 — Relationship normalisation

WHEN source data describes relationships between assets, identities, controls or tools THE SYSTEM SHALL normalise those relationships into canonical relationship records with provenance. [Source: Spec #12 §7 Relationship Normalisation]

### v1.3 Requirement 9 — Source conflict resolution

WHEN two sources disagree on a canonical field THE SYSTEM SHALL apply source authority and conflict rules rather than overwriting arbitrarily. [Source: Spec #12 §6 Conflict Resolution]

### v1.3 Requirement 10 — Identity graph relationship

WHEN identity data is normalised THE SYSTEM SHALL link human, service, workload and third-party identities into the identity graph rather than storing isolated records. [Source: Spec #18 §4 Identity Graph Model]

### v1.3 Requirement 11 — CHAIN computation data

WHEN identity-chain computation is requested THE SYSTEM SHALL provide the graph inputs required for CHAIN stages and store the resulting risk evidence. [Source: Spec #18 §5 CHAIN Computation Stages]

### v1.3 Requirement 12 — Identity blast radius data

WHEN identity blast radius is calculated THE SYSTEM SHALL store reachable assets, privileges, trust boundaries and criticality drivers. [Source: Spec #18 §7 Identity Blast Radius]

### v1.3 Requirement 13 — Workspace data contract

WHEN a workspace dashboard consumes canonical data THE SYSTEM SHALL use canonical entities and relationships rather than dashboard-specific duplicate models. [Source: Spec #11b §2 Workspace Model]

### v1.3 Requirement 14 — Case UI data contract

WHEN Case Queue or Case Detail data is served THE SYSTEM SHALL bind case data to risk object, affected entity, owner, priority, lifecycle and communication state. [Source: Spec #11b §4 Case Management Screen]

### v1.3 Requirement 15 — SIEM rule entity

WHEN a SIEM or SOAR rule artefact is modelled THE SYSTEM SHALL store source rule intent, generated template, target platform, status, approvals and audit linkage. [Source: Spec #15 §Rule Generation Templates]

### v1.3 Requirement 16 — Rule generation lineage

WHEN a detection or response rule is generated THE SYSTEM SHALL link it to source risk, detection model, test evidence and target platform contract. [Source: Spec #15 §Bidirectional Flow Extension]

### v1.3 Requirement 17 — Push group schema

WHEN a coordinated push group is modelled THE SYSTEM SHALL store group identity, member actions, dependency order, approval gates, rollback plan and dry-run result. [Source: Spec #20 §Coordinated Push Group Schema]

### v1.3 Requirement 18 — Push group audit

WHEN a coordinated push group state changes THE SYSTEM SHALL emit an audit event linked to each member action and approval state. [Source: Spec #20 §Audit and Governance]

### v1.3 Requirement 19 — Risk object binding

WHEN a domain object has risk relevance THE SYSTEM SHALL link it to a canonical RiskObject or explicitly record suppression by approved policy. [Source: Spec #18 §3 Universal Risk Object Contract]

### v1.3 Requirement 20 — Fusion Map binding

WHEN a canonical entity participates in topology or relationship views THE SYSTEM SHALL expose it with relationship metadata consumable by the Fusion Map. [Source: Spec #18 §11 Fusion Map Binding]

### v1.3 Requirement 21 — Tenant-scoped jobs

WHEN a worker job references canonical data THE SYSTEM SHALL carry tenant context and canonical entity IDs in the job payload. [Source: Spec #03 §Worker/API Boundary]

### v1.3 Requirement 22 — Raw payload retention

WHEN normalised data is produced from a source payload THE SYSTEM SHALL retain provenance sufficient to explain the transform without exposing secrets in UI. [Source: Spec #05 §7.3 Matching Metadata Storage]

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.3.1 lineage closure requirements

### Configuration Data Classification

WHEN Configuration data is stored or accessed THE SYSTEM SHALL apply intended-state handling and retain it per tenant policy. [Source: Master Technical Specification §11.1]

### State Data Classification

WHEN State data is stored or accessed THE SYSTEM SHALL apply operational-state handling and retain it per tenant policy. [Source: Master Technical Specification §11.1]

### Verdict Data Classification

WHEN Verdict data is stored or accessed THE SYSTEM SHALL apply high-volume tiered storage using hot, warm and cold storage classes. [Source: Master Technical Specification §11.1]

### Detection Data Classification

WHEN Detection data is stored or accessed THE SYSTEM SHALL preserve read-only SOC-platform provenance and retain it per SOC policy. [Source: Master Technical Specification §11.1]

### Case Data Classification

WHEN Case data is stored or accessed THE SYSTEM SHALL classify it as Commander case data and retain it per tenant policy. [Source: Master Technical Specification §11.1]

### Threat Intelligence Data Classification

WHEN Threat intelligence data is stored or accessed THE SYSTEM SHALL apply retention and use constraints per source licensing. [Source: Master Technical Specification §11.1]

### Audit Data Classification

WHEN Audit data is stored or accessed THE SYSTEM SHALL retain it per audit retention policy. [Source: Master Technical Specification §11.1]

### UK Residency

WHEN UK data residency is selected THE SYSTEM SHALL keep tenant data within the configured UK residency boundary unless an explicit cross-region decision is recorded. [Source: Master Technical Specification §11.2]

### US Residency

WHEN US data residency is selected THE SYSTEM SHALL keep tenant data within the configured US residency boundary unless an explicit cross-region decision is recorded. [Source: Master Technical Specification §11.2]

### Tenant Residency Boundary

WHEN tenant data is stored THE SYSTEM SHALL honour the tenant-selected residency region and not mix residency boundaries without explicit cross-region decision. [Source: Master Technical Specification §11.2]

