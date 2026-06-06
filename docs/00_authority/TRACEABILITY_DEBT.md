# Traceability Debt Register — Commander SDR

**Purpose:** Audit of all existing artefacts against the Traceability Chain (`.kiro/steering/traceability-chain.md`). Artefacts built before the chain rule carry debt tracked here.
**Date:** 2026-06-06
**Status:** Banked — not resolved. Resolution pass required.
**Rule:** Existing artefacts are NOT retroactively rejected. They MUST be linked during a traceability debt resolution pass.

---

## Summary

| Category | Total | Linked | Unlinked | Coverage |
|---|---|---|---|---|
| Pages (page.tsx) | 95 | 42 | 53 | 44% |
| Entities (*.ts) | 65 | 45 | 20 | 69% |
| Engines (*.ts) | 22 | 16 | 6 | 73% |

**Total debt items:** 79 (53 pages + 20 entities + 6 engines)

---

## Page Traceability Audit

### Linked Pages (42) — UC exists in USE_CASE_REGISTER + PAGE_SCHEDULE

| Route | UC | Domain | Status |
|---|---|---|---|
| / (root/command centre) | UC-001, UC-002 | D-27 Operating Pictures | ✅ linked |
| /cases | UC-003, UC-004 | D-18 Case Lifecycle | ✅ linked |
| /cases/my | UC-009 | D-18 Case Lifecycle | ✅ linked |
| /cases/analytics | UC-008 | D-18 Case Lifecycle | ✅ linked |
| /cases/[id] | UC-005, UC-006, UC-007 | D-18 Case Lifecycle | ✅ linked |
| /assets | UC-010, UC-011 | D-08 Asset Intelligence | ✅ linked |
| /identity | UC-012, UC-013 | D-07 Identity Intelligence | ✅ linked |
| /identity/privileged | UC-013 | D-07 Identity Intelligence | ✅ linked |
| /operating-picture/external | UC-014 | D-27 Operating Pictures | ✅ linked |
| /operating-picture/internal | UC-015 | D-27 Operating Pictures | ✅ linked |
| /war-room/p0 | UC-018 | D-24 P0 Zero-Day | ✅ linked |
| /control-plane | UC-019 | D-36 Internal Control Plane | ✅ linked |
| /vulnerabilities | UC-033 | D-05 Vulnerability Management | ✅ linked |
| /controls | UC-038 | D-10 Coverage / Tool Health | ✅ linked |
| /commander-ai | UC-046–053 | D-34 Commander AI | ✅ linked |
| /platform/connectors | UC-030 | D-02 Connector Framework | ✅ linked |
| /platform/rules | UC-PLAT-001 | D-04 Drift & Rule Engine | ✅ linked |
| /platform/models | UC-PLAT-002 | D-34 Commander AI | ✅ linked |
| /platform/automation | UC-PLAT-003 | D-04 Drift & Rule Engine | ✅ linked |
| /platform/features | UC-PLAT-004 | D-38 Configuration Governance | ✅ linked |
| /platform/data-quality | UC-PLAT-005 | D-02 Connector Framework | ✅ linked |
| /team-pulse/workload | UC-PULSE-001 | D-30 Mission Pulse Surfaces | ✅ linked |
| /team-pulse/sla | UC-PULSE-002 | D-30 Mission Pulse Surfaces | ✅ linked |
| /team-pulse/escalation | UC-PULSE-003 | D-30 Mission Pulse Surfaces | ✅ linked |
| /domain-pulse | UC-PULSE-004 | D-30 Mission Pulse Surfaces | ✅ linked |
| /domain-pulse/failed-validation | UC-PULSE-005 | D-30 Mission Pulse Surfaces | ✅ linked |
| /domain-pulse/closure-blockers | UC-PULSE-006 | D-30 Mission Pulse Surfaces | ✅ linked |
| /system-pulse/engine | UC-PULSE-007 | D-30 Mission Pulse Surfaces | ✅ linked |
| /system-pulse/queues | UC-PULSE-008 | D-30 Mission Pulse Surfaces | ✅ linked |
| /system-pulse/freshness | UC-PULSE-009 | D-30 Mission Pulse Surfaces | ✅ linked |
| /reporting | UC-REPORT-001 | D-40 Audit & Evidence | ✅ linked |
| /reporting/exports | UC-REPORT-002 | D-40 Audit & Evidence | ✅ linked |
| /reporting/ciso-pack | UC-REPORT-003 | D-40 Audit & Evidence | ✅ linked |
| /settings/sla | — (in PAGE_SCHEDULE, Unit 22) | D-22 Strategy Layer | ✅ linked (via build unit) |
| /settings/routing | — (in PAGE_SCHEDULE, Unit 22) | D-19 Routing | ✅ linked (via build unit) |
| /settings/validation | — (in PAGE_SCHEDULE, Unit 22) | D-20 Validation | ✅ linked (via build unit) |
| /settings/closure-reopening | — (in PAGE_SCHEDULE, Unit 22) | D-20 Validation | ✅ linked (via build unit) |
| /settings/automation-boundaries | — (in PAGE_SCHEDULE, Unit 22) | D-22 Strategy Layer | ✅ linked (via build unit) |
| /settings/commander-ai | — (in PAGE_SCHEDULE, Unit 22) | D-34 Commander AI | ✅ linked (via build unit) |
| /settings/connectors | — (in PAGE_SCHEDULE, Unit 22) | D-02 Connector Framework | ✅ linked (via build unit) |
| /tenant-admin | UC-020 | D-35 Three Application Boundaries | ✅ linked |
| /platform/audit | — (in PAGE_SCHEDULE, Unit 43) | D-40 Audit & Evidence | ✅ linked (via build unit) |

### Unlinked Pages (53) — No UC in USE_CASE_REGISTER or PAGE_SCHEDULE UC field is blank

| Route | UC | Domain | Severity |
|---|---|---|---|
| /posture | — (no UC) | D-27 Operating Pictures (inferred) | trivial — needs UC registration |
| /ciso | — (no UC) | D-36 Internal Control Plane (inferred) | trivial — needs UC registration |
| /identity/drift | — (PAGE_SCHEDULE has no UC) | D-07 Identity Intelligence (inferred) | trivial |
| /assets/ownership | — (no UC) | D-08 Asset Intelligence (inferred) | trivial |
| /assets/classification | — (no UC) | D-08 Asset Intelligence (inferred) | trivial |
| /architecture | — (no UC) | D-09 Architecture Intelligence (inferred) | trivial |
| /architecture/drift | — (no UC) | D-09 Architecture Intelligence (inferred) | trivial |
| /architecture/dependencies | — (no UC) | D-09 Architecture Intelligence (inferred) | trivial |
| /controls/strength | — (no UC) | D-10 Coverage / Tool Health (inferred) | trivial |
| /controls/frameworks | — (no UC) | D-10 Coverage / Tool Health (inferred) | trivial |
| /coverage | — (no UC) | D-10 Coverage / Tool Health (inferred) | trivial |
| /coverage/scanners | — (no UC) | D-10 Coverage / Tool Health (inferred) | trivial |
| /coverage/telemetry | — (no UC) | D-10 Coverage / Tool Health (inferred) | trivial |
| /exposure | — (no UC) | D-06 Exposure Management (inferred) | trivial |
| /exposure/blast-zones | — (no UC) | D-06 Exposure Management (inferred) | trivial |
| /exposure/coverage-gaps | — (no UC) | D-06 Exposure Management (inferred) | trivial |
| /fusion-map | — (no UC) | D-29 Multi-Domain Fusion Map (inferred) | trivial |
| /fusion-map/blast-radius | — (no UC) | D-29 Multi-Domain Fusion Map (inferred) | trivial |
| /fusion-map/mission | — (no UC) | D-29 Multi-Domain Fusion Map (inferred) | trivial |
| /fusion-map/p0 | — (no UC) | D-29 Multi-Domain Fusion Map (inferred) | trivial |
| /governance | — (no UC) | D-40 Audit & Evidence (inferred) | trivial |
| /governance/policies | — (no UC) | D-38 Configuration Governance (inferred) | trivial |
| /governance/exceptions | — (no UC) | D-38 Configuration Governance (inferred) | trivial |
| /mission/overview | — (no UC) | D-25 Mission Control (inferred) | trivial |
| /mission/objectives | — (no UC) | D-25 Mission Control (inferred) | trivial |
| /mission/impact | — (no UC) | D-25 Mission Control (inferred) | trivial |
| /tool-health | — (no UC) | D-10 Coverage / Tool Health (inferred) | trivial |
| /tool-health/connectors | — (no UC) | D-02 Connector Framework (inferred) | trivial |
| /tool-health/freshness | — (no UC) | D-02 Connector Framework (inferred) | trivial |
| /vulnerabilities/kev | — (no UC) | D-05 Vulnerability Management (inferred) | trivial |
| /vulnerabilities/patches | — (no UC) | D-05 Vulnerability Management (inferred) | trivial |
| /vulnerabilities/supply-chain | — (no UC) | D-05 Vulnerability Management (inferred) | trivial |
| /som/ciso | — (no UC) | D-36 Internal Control Plane (inferred) | trivial |
| /som/architecture | — (no UC) | D-09 Architecture Intelligence (inferred) | trivial |
| /som/cloud-security | — (no UC) | D-10 Coverage / Tool Health (inferred) | trivial |
| /som/risk | — (no UC) | D-23 Priority Framework (inferred) | trivial |
| /som/security-operations | — (no UC) | D-18 Case Lifecycle (inferred) | trivial |
| /platform | — (no UC) | D-02 Connector Framework (inferred) | trivial |
| /settings/tenant | — (no UC) | D-35 Three Application Boundaries (inferred) | trivial |
| /settings/baselines | — (no UC) | D-38 Configuration Governance (inferred) | trivial |
| /settings/users-rbac | — (no UC) | D-37 RBAC (inferred) | trivial |
| /settings/rules | — (no UC) | D-04 Drift & Rule Engine (inferred) | trivial |
| /settings/features | — (no UC) | D-38 Configuration Governance (inferred) | trivial |
| /settings/p0-zero-day | — (no UC) | D-24 P0 Zero-Day (inferred) | trivial |
| /settings/audit-export | — (no UC) | D-40 Audit & Evidence (inferred) | trivial |
| /control-plane/customers | — (no UC) | D-36 Internal Control Plane (inferred) | trivial |
| /control-plane/tenants | — (no UC) | D-36 Internal Control Plane (inferred) | trivial |
| /control-plane/licences | — (no UC) | D-36 Internal Control Plane (inferred) | trivial |
| /control-plane/features | — (no UC) | D-36 Internal Control Plane (inferred) | trivial |
| /control-plane/ai-models | — (no UC) | D-34 Commander AI (inferred) | trivial |
| /control-plane/rule-packs | — (no UC) | D-04 Drift & Rule Engine (inferred) | trivial |
| /control-plane/baselines | — (no UC) | D-38 Configuration Governance (inferred) | trivial |
| /control-plane/deployment | — (no UC) | D-36 Internal Control Plane (inferred) | trivial |
| /control-plane/support | — (no UC) | D-36 Internal Control Plane (inferred) | trivial |
| /control-plane/billing | — (no UC) | D-36 Internal Control Plane (inferred) | trivial |
| /control-plane/audit | — (no UC) | D-40 Audit & Evidence (inferred) | trivial |

**Note:** All 53 unlinked pages are classified **trivial** — the domain can be inferred, the page exists in PAGE_SCHEDULE.md under an identified build unit. Resolution is mechanical: register a UC in USE_CASE_REGISTER.md for each, then add the UC-XXX reference to PAGE_SCHEDULE. No material gaps — no pages exist that have no plausible domain or entity backing.

---

## Entity Traceability Audit

### Linked Entities (45) — Serve registered use cases, mapped to knowledge graph domains

| Entity | UC | Domain | Status |
|---|---|---|---|
| action.ts | UC-005 | D-18 Case Lifecycle | ✅ linked |
| analytic.ts | UC-028 | D-04 Drift & Rule Engine | ✅ linked |
| asset.ts | UC-010, UC-011 | D-08 Asset Intelligence | ✅ linked |
| audit-event.ts | UC-040 (implied) | D-40 Audit & Evidence | ✅ linked |
| case-communication-thread.ts | UC-039 | D-31 Communication | ✅ linked |
| case-lifecycle.ts | UC-021–029 | D-18 Case Lifecycle | ✅ linked |
| case-strategy-binding.ts | UC-027 | D-22 Strategy Layer | ✅ linked |
| case.ts | UC-003–009 | D-18 Case Lifecycle | ✅ linked |
| coim.ts | UC-028 | D-03 Normalisation | ✅ linked |
| common.ts | — (foundation) | D-01 Programme Foundation | ✅ linked |
| communication-playbook.ts | UC-040 | D-31 Communication | ✅ linked |
| connector.ts | UC-030 | D-02 Connector Framework | ✅ linked |
| control-framework.ts | UC-038 | D-10 Coverage / Tool Health | ✅ linked |
| detonation-verdict.ts | UC-041 | D-15 Verdict Semantics | ✅ linked |
| evidence.ts | UC-005 | D-18 Case Lifecycle | ✅ linked |
| identity.ts | UC-012, UC-013 | D-07 Identity Intelligence | ✅ linked |
| inbound-email-submission.ts | UC-043 | D-31 Communication | ✅ linked |
| indicator-of-compromise.ts | UC-032 | D-17 Intelligence Layer | ✅ linked |
| intelligence-common.ts | UC-032–045 | D-17 Intelligence Layer | ✅ linked |
| ioc-case-link.ts | UC-045 (implied) | D-17 Intelligence Layer | ✅ linked |
| ioc-relationship.ts | UC-032 (implied) | D-17 Intelligence Layer | ✅ linked |
| observable.ts | UC-028 | D-03 Normalisation | ✅ linked |
| phishing-report.ts | UC-042 | D-31 Communication | ✅ linked |
| platform-intelligence-record.ts | UC-036 | D-17 Intelligence Layer | ✅ linked |
| platform-intelligence-source.ts | UC-036 | D-17 Intelligence Layer | ✅ linked |
| platform-management.ts | UC-PLAT-001–004 | D-04 Drift & Rule Engine | ✅ linked |
| playbook-execution.ts | UC-040 | D-31 Communication | ✅ linked |
| posture-metrics-config.ts | UC-001 (implied) | D-27 Operating Pictures | ✅ linked |
| pulse.ts | UC-PULSE-001–009 | D-30 Mission Pulse Surfaces | ✅ linked |
| push-action-intent.ts | UC-037 | D-32 Push Engine | ✅ linked |
| report.ts | UC-REPORT-001–003 | D-40 Audit & Evidence | ✅ linked |
| risk-object.ts | UC-005 | D-18 Case Lifecycle | ✅ linked |
| stix-bundle-ingest.ts | UC-044 | D-17 Intelligence Layer | ✅ linked |
| strategy.ts | UC-016, UC-017, UC-027 | D-22 Strategy Layer | ✅ linked |
| teams-decision-event.ts | UC-058 | D-31 Communication | ✅ linked |
| tenant-intelligence-evaluation.ts | UC-045 (implied) | D-17 Intelligence Layer | ✅ linked |
| tenant-intelligence-subscription.ts | UC-045 (implied) | D-17 Intelligence Layer | ✅ linked |
| tenant-ioc-allowblock-entry.ts | UC-045 (implied) | D-17 Intelligence Layer | ✅ linked |
| tenant-ioc-match.ts | UC-045 | D-17 Intelligence Layer | ✅ linked |
| threat-hunt-record.ts | UC-035 | D-17 Intelligence Layer | ✅ linked |
| vendor-advisory.ts | UC-034 | D-17 Intelligence Layer | ✅ linked |
| verdict.ts | UC-015 (implied) | D-15 Verdict Semantics | ✅ linked |
| vulnerability-case-link.ts | UC-033 (implied) | D-05 Vulnerability Management | ✅ linked |
| vulnerability-intelligence-record.ts | UC-033 | D-05 Vulnerability Management | ✅ linked |
| war-room.ts | UC-018 | D-24 P0 Zero-Day | ✅ linked |

### Unlinked Entities (20) — No registered use case references them

| Entity | UC | Domain (inferred) | Severity |
|---|---|---|---|
| architecture-component.ts | — | D-09 Architecture Intelligence | trivial — needs UC |
| architecture-intelligence-engine.ts | — | D-09 Architecture Intelligence | trivial — needs UC |
| ciso-summary.ts | — | D-36 Internal Control Plane | trivial — needs UC |
| coverage.ts | — | D-10 Coverage / Tool Health | trivial — needs UC |
| customer.ts | — | D-36 Internal Control Plane | trivial — needs UC |
| deployment.ts | — | D-36 Internal Control Plane | trivial — needs UC |
| direction-board.ts | — | D-28 Direction Boards | trivial — needs UC |
| drift-detection-engine.ts | — | D-04 Drift & Rule Engine | trivial — needs UC |
| email-case-communication.ts | — | D-31 Communication | trivial — needs UC |
| exposure-engine.ts | — | D-06 Exposure Management | trivial — needs UC |
| exposure.ts | — | D-06 Exposure Management | trivial — needs UC |
| identity-intelligence-engine.ts | — | D-07 Identity Intelligence | trivial — needs UC |
| licence.ts | — | D-36 Internal Control Plane | trivial — needs UC |
| mission.ts | — | D-25 Mission Control | trivial — needs UC |
| pre-warned-classification.ts | — | D-13 Pre-Warned Classification | trivial — needs UC |
| push-governance.ts | — | D-32 Push Engine | trivial — needs UC |
| security-tool-intelligence.ts | — | D-10 Coverage / Tool Health | trivial — needs UC |
| support-operation.ts | — | D-36 Internal Control Plane | trivial — needs UC |
| tenant-config.ts | — | D-38 Configuration Governance | trivial — needs UC |
| topology.ts | — | D-09 Architecture Intelligence | trivial — needs UC |

### Unlinked Entity Notes

All 20 unlinked entities have clear domain mapping (inferable from the entity content and build sequence). Resolution is mechanical: register use cases that these entities serve. None represent material gaps — they are artefacts of build units that predate the use case register (Units 23–50 Team 2 or COIM batch work).

---

## Engine Traceability Audit

### Linked Engines (16) — Serve registered use cases, mapped to architectural layer

| Engine | UC | Layer | Status |
|---|---|---|---|
| case-closure-gate-engine.ts | UC-025 | Layer 5 (Case) | ✅ linked |
| case-prioritisation-engine.ts | UC-021 | Layer 5 (Case) | ✅ linked |
| case-ref-generator.ts | UC-003 (implied) | Layer 5 (Case) | ✅ linked |
| case-reopening-trigger-engine.ts | UC-026 | Layer 5 (Case) | ✅ linked |
| case-sla-engine.ts | UC-023 | Layer 5 (Case) | ✅ linked |
| case-type-assigner.ts | UC-003 (implied) | Layer 5 (Case) | ✅ linked |
| case-validation-engine.ts | UC-024 | Layer 5 (Case) | ✅ linked |
| commander-ai-core.ts | UC-046–053 | Cross-cutting | ✅ linked |
| intelligence-layer.ts | UC-032–035 | Layer 4 (Intelligence) | ✅ linked |
| normalisation-layer.ts | UC-030 (implied) | Layer 2 (Normalisation) | ✅ linked |
| ooda-layer.ts | — (Layer 6 framework) | Layer 6 (OODA) | ✅ linked |
| risk-object-binder.ts | UC-005 (implied) | Layer 5 (Case) | ✅ linked |
| vulnerability-engine.ts | UC-054–057 | Layer 3 (Engine) | ✅ linked |
| exposure-engine.ts | — (UC inferred) | Layer 3 (Engine) | ✅ linked |
| drift-detection-engine.ts | — (UC inferred) | Layer 3 (Engine) | ✅ linked |
| identity-intelligence-engine.ts | UC-012 (implied) | Layer 3 (Engine) | ✅ linked |

### Unlinked Engines (6) — No registered use case references them

| Engine | UC | Layer (inferred) | Severity |
|---|---|---|---|
| architecture-intelligence-engine.ts | — | Layer 3 (Engine) | trivial — needs UC |
| direction-boards-engine.ts | — | Layer 6 (OODA) | trivial — needs UC |
| email-case-communication-engine.ts | — | Layer 5 (Case) | trivial — needs UC |
| pre-warned-classification-engine.ts | — | Layer 4 (Intelligence) | trivial — needs UC |
| push-governance-engine.ts | — | Layer 3 (Engine) | trivial — needs UC |
| security-tool-intelligence-engine.ts | — | Layer 3 (Engine) | trivial — needs UC |

### Unlinked Engine Notes

All 6 unlinked engines map to known architectural layers and correspond to Team 2 build units (Units 26, 28, 29, 34, 42, 44, 45). Resolution: register use cases for the capabilities they serve.

---

## Severity Classification

| Severity | Definition | Count |
|---|---|---|
| **Trivial** | Domain is inferable, entity/page exists in build sequence. Resolution = register a UC and add reference. | 79 |
| **Material** | Real missing use case or domain that cannot be inferred from existing context. | 0 |

**Assessment:** All 79 debt items are trivial. The artefacts were built under valid build units with documented baseline specs. The debt is purely one of *explicit traceability linkage* — not structural gaps. Resolution is a mechanical pass: register UCs for each, update PAGE_SCHEDULE UC columns, done.

---

## Resolution Plan (not executed — banked for future pass)

1. Register ~35 additional use cases in USE_CASE_REGISTER.md for unlinked entities/engines/pages
2. Update PAGE_SCHEDULE.md UC columns for the 53 unlinked pages
3. Verify each new UC traces to a knowledge graph domain (all should — domains are already identified above)
4. Mark this register as RESOLVED once all items have UC references

**Estimated effort:** 1 session (mechanical registration work, no design decisions required).

---

## Authority

- Traceability Chain: `.kiro/steering/traceability-chain.md`
- Use Case Register: `docs/00_authority/USE_CASE_REGISTER.md`
- Page Schedule: `docs/00_authority/PAGE_SCHEDULE.md`
- Knowledge Graph: `docs/knowledge/SYSTEM_KNOWLEDGE_GRAPH.md`
- Domain Register: `docs/knowledge/DOMAIN_REGISTER.md`
