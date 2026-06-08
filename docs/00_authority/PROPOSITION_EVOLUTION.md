# Proposition Evolution Register — Commander SDR

**Purpose:** Track how the implemented product evolves against or beyond the original baseline proposition (Master Proposition v5.0, Master Technical Specification v7.0). Every entry records a capability that has been added, redirected, superseded, or deferred relative to baseline authority.

**Status:** Active — append-only.
**Authority:** Baseline v2.6.2 (docs/99_source_archive/baseline_v2_6_2/).
**Sourcing rule:** Citations from baseline only (per docs/knowledge/SOURCING_RULE.md).

---

## Register

### EVO-001 — Strategy Layer promoted to build-blocking prerequisite

- **Baseline position:** Spec #32 Strategy Layer Runtime Surface is one of 75 child specs; no explicit build-blocking mandate in the spec register.
- **Evolution:** BUILD_SEQUENCE.md doctrine #7 elevates Strategy Layer to build-blocking prerequisite for case management, routing, validation/closure, reopening, and Fusion Map.
- **Rationale:** Prevents hardcoded SLA/routing/priority values; enforces strategy consumption pattern from day one.
- **Decision record:** DEC-spec43-build-blocking (DECISIONS.md)
- **Status:** IMPLEMENTED (Unit 6 DONE)

---

### EVO-002 — COIM/OCSF source-classification architecture added

- **Baseline position:** Spec #05 and Spec #12 define normalisation and connector contracts without explicit source-classification metadata on Risk Objects, Observables, Evidence.
- **Evolution:** COIM v1.0 adds SourceClassification, AttackMapping, SourceProduct, ObservableRef, and timeline fields to Risk Object, Asset, Identity, Case, Verdict, Evidence, Observable, Action entities.
- **Rationale:** Enables structured provenance, ATT&CK binding, severity normalisation, and dwell-time computation without departing from Commander authority.
- **Decision record:** DEC-coim-ocsf-source-classification-architecture (DECISIONS.md)
- **Status:** IMPLEMENTED (COIM-A through COIM-H all DONE)

---

### EVO-003 — Communications Excellence capability added

- **Baseline position:** Spec #32 Case Communication Adapters defines communication at the adapter level; Spec #26a defines closed-loop email lifecycle. No explicit Communication Playbook, Thread, or Detonation Verdict entity in the spec register.
- **Evolution:** Communications Excellence Phase 1 adds CaseCommunicationThread, CommunicationPlaybook, PlaybookExecution, DetonationVerdict, PhishingReport, StixBundleIngest, TeamsDecisionEvent entities.
- **Rationale:** Implements governed, auditable case communication with playbook automation and phishing/detonation analysis.
- **Decision record:** Communications Excellence Proposal (CMEP-1.0) accepted by owner.
- **Status:** IMPLEMENTED (entities, fixtures, strategy surfaces delivered)

---

### EVO-004 — War Room Communication Excellence overlay added

- **Baseline position:** No explicit "War Room" concept in baseline specs. P0 zero-day handling is addressed in priority framework (Spec #28) and case management (Spec #08).
- **Evolution:** WRCEP-1.0 adds WarRoom as an overlay entity for crisis coordination across P0 cases. Does not modify case lifecycle. Adds war-room-cadence strategy surface.
- **Rationale:** Provides structured multi-stakeholder coordination during critical incidents without altering the 12-state closed-loop model.
- **Decision record:** WRCEP-1.0 accepted by owner.
- **Status:** IMPLEMENTED (entity, fixture, strategy surface delivered)

---

### EVO-005 — Platform Intelligence and IOC Distribution capability added

- **Baseline position:** Spec #61 §4.4 names Class D (Threat Intelligence) connectors. No explicit first-class IOC entity, tenant subscription model, or platform-wide intelligence distribution in the spec register.
- **Evolution:** Platform Intelligence and IOC Distribution adds PlatformIntelligenceSource, PlatformIntelligenceRecord, IndicatorOfCompromise, VulnerabilityIntelligenceRecord, VendorAdvisory, IocRelationship, TenantIntelligenceSubscription, TenantIntelligenceEvaluation, TenantIocMatch, TenantIocAllowBlockEntry, IocCaseLink, VulnerabilityCaseLink, ThreatHuntRecord, PushActionIntent entities.
- **Rationale:** Implements the Class D signal distribution pipeline with tenant-scoped evaluation, matching, and case linking.
- **Decision record:** Platform Intelligence spec accepted by owner.
- **Status:** IMPLEMENTED (Unit 50 DONE)

---

### EVO-006 — Vulnerability Management domain profile added

- **Baseline position:** Spec #16 Vulnerability Management Implementation defines the domain. No explicit "profile" pattern for domain-specific strategy binding in the baseline.
- **Evolution:** Vulnerability domain profile (packages/contracts/src/profiles/vulnerability/) adds domain-specific closure gates, reopening triggers, signal resolution, SLA modifiers, SSVC evaluation, and validation rules.
- **Rationale:** Implements strategy layer consumption for the vulnerability domain — a concrete example of how each domain binds to the 19 strategy surfaces.
- **Decision record:** Part of vulnerability management domain build.
- **Status:** IMPLEMENTED (profile code exists)

---

### EVO-007 — Case Analytics surface added

- **Baseline position:** Spec #08 Case Management Workflow focuses on lifecycle, not analytics/reporting surfaces. No explicit "Case Analytics" page in spec register.
- **Evolution:** /cases/analytics page delivers case workload, SLA adherence, case type distribution, and team performance metrics from seed data.
- **Rationale:** Provides operational visibility into case management effectiveness without requiring separate reporting infrastructure.
- **Decision record:** Built as part of Unit 17 (Case Management UI).
- **Status:** IMPLEMENTED (page.tsx exists, renders from fixtures)

---

### EVO-008 — Knowledge Export Registry (dormant foundation)

- **Baseline position:** Spec #13 defines Commander AI grounding rules (§5) and Execution Records (§8). No explicit "knowledge export registry" concept in baseline.
- **Evolution:** packages/contracts/src/knowledge/ adds a static type-only registry declaring which entities are eligible for future AI/RAG export, with infrastructure-neutral derivation rules. No per-record storage. No AWS fields.
- **Rationale:** Documents intent and eligibility for future Commander AI knowledge consumption without coupling canonical model to infrastructure.
- **Decision record:** Owner-approved in this session.
- **Status:** IMPLEMENTED (type definitions only, dormant)

---

### EVO-009 — Development Mode governance optimisation

- **Baseline position:** All governance hooks fire on every action (11 hooks active simultaneously).
- **Evolution:** Two-mode system: Development Mode (fast, 1 hook + pre-commit gate) and Governance Mode (full, all hooks, invoked at branch completion).
- **Rationale:** Reduces per-prompt latency during active feature development while retaining full governance for merge readiness.
- **Decision record:** Owner-approved in this session.
- **Status:** IMPLEMENTED (.kiro/steering/development-mode.md + hooks disabled)

---

### EVO-010 — Inbound Email Submission entity added

- **Baseline position:** Spec #26a Closed-Loop Email Case Communication Lifecycle covers outbound email. No explicit inbound email submission/phishing report entity in baseline.
- **Evolution:** InboundEmailSubmission entity added for user-reported phishing and suspicious email processing.
- **Rationale:** Closes the inbound leg of the email lifecycle — enables phishing triage, IOC extraction, and case creation from user submissions.
- **Decision record:** Part of Communications Excellence (CMEP-1.0).
- **Status:** IMPLEMENTED (entity + fixture exist)


---

### EVO-011 — Journey Intelligence capability domain added

- **Baseline position:** Spec #58 (Security OODA Loop) defines programme-level OODA tempo, phase health scoring, and OODA Tempo Degradation case type. Spec #67 defines OODA Dashboard Family surfaces. No explicit individual-journey measurement, delivery mode attribution, automation friction measurement, formula-driven lifecycle analytics, or AI-grounding journey context in the baseline.
- **Evolution:** Journey Intelligence introduced as a peer capability domain providing: individual journey lifecycle measurement, OODA stage attribution on audit events, 5-level delivery mode taxonomy, 33 journey templates, 10 configurable formula families (as strategy policy surface #20), 7 analytics read models, lightweight Journey entity with status + outcome, AI Analyst reasoning substrate, and mandatory future-feature adoption rule.
- **Rationale:** Commander can measure programme-level OODA health (Spec #58) but cannot answer: how does individual work travel from signal to outcome? Where does it leak, stall, or repeat? Where does automation fail? What is the operational maturity progression? Journey Intelligence fills this gap as the measurement, attribution, optimisation and AI-grounding spine for the entire operating model.
- **Decision record:** DEC-journey-intelligence-foundation (DECISIONS.md)
- **Authority:** docs/00_authority/JOURNEY_INTELLIGENCE.md (JI-1.0)
- **Status:** APPROVED — pending implementation
