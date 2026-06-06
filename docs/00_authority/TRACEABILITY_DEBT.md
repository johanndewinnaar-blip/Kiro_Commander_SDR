# Traceability Debt Register — Commander SDR

**Purpose:** Audit of all existing artefacts against the Traceability Chain (`.kiro/steering/traceability-chain.md`). Artefacts built before the chain rule carry debt tracked here.
**Date:** 2026-06-06
**Status:** RESOLVED — all debt items linked.
**Rule:** Existing artefacts are NOT retroactively rejected. They MUST be linked during a traceability debt resolution pass.

---

## Resolution Status

**Status:** ALL RESOLVED (2026-06-06)
**Method:** Use cases registered (UC-059 through UC-139), PAGE_SCHEDULE.md UC columns updated, knowledge graph domains confirmed.
**Total items resolved:** 79 (53 pages + 20 entities + 6 engines)

---

## Summary

| Category | Total | Linked | Unlinked | Coverage |
|---|---|---|---|---|
| Pages (page.tsx) | 95 | 95 | 0 | 100% |
| Entities (*.ts) | 65 | 65 | 0 | 100% |
| Engines (*.ts) | 22 | 22 | 0 | 100% |

**Total debt items:** 0

---

## Page Traceability Audit

### Linked Pages (95) — UC exists in USE_CASE_REGISTER + PAGE_SCHEDULE

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
| /posture | UC-059 | D-27 Operating Pictures | ✅ linked |
| /ciso | UC-060 | D-36 CISO Executive | ✅ linked |
| /identity/drift | UC-065 | D-07 Identity Intelligence | ✅ linked |
| /assets/ownership | UC-066 | D-08 Asset Intelligence | ✅ linked |
| /assets/classification | UC-067 | D-08 Asset Intelligence | ✅ linked |
| /architecture | UC-068 | D-09 Architecture Intelligence | ✅ linked |
| /architecture/drift | UC-069 | D-09 Architecture Intelligence | ✅ linked |
| /architecture/dependencies | UC-070 | D-09 Architecture Intelligence | ✅ linked |
| /controls/strength | UC-071 | D-10 Coverage / Tool Health | ✅ linked |
| /controls/frameworks | UC-072 | D-10 Coverage / Tool Health | ✅ linked |
| /coverage | UC-073 | D-10 Coverage / Tool Health | ✅ linked |
| /coverage/scanners | UC-074 | D-10 Coverage / Tool Health | ✅ linked |
| /coverage/telemetry | UC-075 | D-10 Coverage / Tool Health | ✅ linked |
| /exposure | UC-079 | D-06 Exposure Management | ✅ linked |
| /exposure/blast-zones | UC-080 | D-06 Exposure Management | ✅ linked |
| /exposure/coverage-gaps | UC-081 | D-06 Exposure Management | ✅ linked |
| /fusion-map | UC-082 | D-29 Multi-Domain Fusion Map | ✅ linked |
| /fusion-map/blast-radius | UC-083 | D-29 Multi-Domain Fusion Map | ✅ linked |
| /fusion-map/mission | UC-084 | D-29 Multi-Domain Fusion Map | ✅ linked |
| /fusion-map/p0 | UC-085 | D-29 Multi-Domain Fusion Map | ✅ linked |
| /governance | UC-086 | D-40 Audit & Evidence | ✅ linked |
| /governance/policies | UC-087 | D-38 Configuration Governance | ✅ linked |
| /governance/exceptions | UC-088 | D-38 Configuration Governance | ✅ linked |
| /mission/overview | UC-089 | D-25 Mission Control | ✅ linked |
| /mission/objectives | UC-090 | D-25 Mission Control | ✅ linked |
| /mission/impact | UC-091 | D-25 Mission Control | ✅ linked |
| /tool-health | UC-076 | D-10 Coverage / Tool Health | ✅ linked |
| /tool-health/connectors | UC-077 | D-02 Connector Framework | ✅ linked |
| /tool-health/freshness | UC-078 | D-02 Connector Framework | ✅ linked |
| /vulnerabilities/kev | UC-092 | D-05 Vulnerability Management | ✅ linked |
| /vulnerabilities/patches | UC-093 | D-05 Vulnerability Management | ✅ linked |
| /vulnerabilities/supply-chain | UC-094 | D-05 Vulnerability Management | ✅ linked |
| /som/architecture | UC-061 | D-09 Architecture Intelligence | ✅ linked |
| /som/cloud-security | UC-062 | D-10 Coverage / Tool Health | ✅ linked |
| /som/risk | UC-063 | D-23 Priority Framework | ✅ linked |
| /som/security-operations | UC-064 | D-18 Case Lifecycle | ✅ linked |
| /platform | UC-102 | D-02 Connector Framework | ✅ linked |
| /settings/tenant | UC-101 | D-35 Three Application Boundaries | ✅ linked |
| /settings/baselines | UC-096 | D-38 Configuration Governance | ✅ linked |
| /settings/users-rbac | UC-099 | D-37 RBAC | ✅ linked |
| /settings/rules | UC-100 | D-04 Drift & Rule Engine | ✅ linked |
| /settings/features | UC-097 | D-38 Configuration Governance | ✅ linked |
| /settings/p0-zero-day | UC-095 | D-24 P0 Zero-Day | ✅ linked |
| /settings/audit-export | UC-098 | D-40 Audit & Evidence | ✅ linked |
| /control-plane/customers | UC-103 | D-36 Internal Control Plane | ✅ linked |
| /control-plane/tenants | UC-104 | D-36 Internal Control Plane | ✅ linked |
| /control-plane/licences | UC-105 | D-36 Internal Control Plane | ✅ linked |
| /control-plane/features | UC-106 | D-36 Internal Control Plane | ✅ linked |
| /control-plane/ai-models | UC-107 | D-34 Commander AI | ✅ linked |
| /control-plane/rule-packs | UC-108 | D-04 Drift & Rule Engine | ✅ linked |
| /control-plane/baselines | UC-109 | D-38 Configuration Governance | ✅ linked |
| /control-plane/deployment | UC-110 | D-36 Internal Control Plane | ✅ linked |
| /control-plane/support | UC-111 | D-36 Internal Control Plane | ✅ linked |
| /control-plane/billing | UC-112 | D-36 Internal Control Plane | ✅ linked |
| /control-plane/audit | UC-113 | D-40 Audit & Evidence | ✅ linked |

---

## Entity Traceability Audit

### Linked Entities (65) — Serve registered use cases, mapped to knowledge graph domains

| Entity | UC | Domain | Status |
|---|---|---|---|
| action.ts | UC-005 | D-18 Case Lifecycle | ✅ linked |
| analytic.ts | UC-028 | D-04 Drift & Rule Engine | ✅ linked |
| architecture-component.ts | UC-114 | D-09 Architecture Intelligence | ✅ linked |
| architecture-intelligence-engine.ts | UC-115 | D-09 Architecture Intelligence | ✅ linked |
| asset.ts | UC-010, UC-011 | D-08 Asset Intelligence | ✅ linked |
| audit-event.ts | UC-040 (implied) | D-40 Audit & Evidence | ✅ linked |
| case-communication-thread.ts | UC-039 | D-31 Communication | ✅ linked |
| case-lifecycle.ts | UC-021–029 | D-18 Case Lifecycle | ✅ linked |
| case-strategy-binding.ts | UC-027 | D-22 Strategy Layer | ✅ linked |
| case.ts | UC-003–009 | D-18 Case Lifecycle | ✅ linked |
| ciso-summary.ts | UC-116 | D-36 Internal Control Plane | ✅ linked |
| coim.ts | UC-028 | D-03 Normalisation | ✅ linked |
| common.ts | — (foundation) | D-01 Programme Foundation | ✅ linked |
| communication-playbook.ts | UC-040 | D-31 Communication | ✅ linked |
| connector.ts | UC-030 | D-02 Connector Framework | ✅ linked |
| control-framework.ts | UC-038 | D-10 Coverage / Tool Health | ✅ linked |
| coverage.ts | UC-117 | D-10 Coverage / Tool Health | ✅ linked |
| customer.ts | UC-118 | D-36 Internal Control Plane | ✅ linked |
| deployment.ts | UC-119 | D-36 Internal Control Plane | ✅ linked |
| detonation-verdict.ts | UC-041 | D-15 Verdict Semantics | ✅ linked |
| direction-board.ts | UC-120 | D-28 Direction Boards | ✅ linked |
| drift-detection-engine.ts | UC-121 | D-04 Drift & Rule Engine | ✅ linked |
| email-case-communication.ts | UC-122 | D-31 Communication | ✅ linked |
| evidence.ts | UC-005 | D-18 Case Lifecycle | ✅ linked |
| exposure-engine.ts | UC-123 | D-06 Exposure Management | ✅ linked |
| exposure.ts | UC-123 | D-06 Exposure Management | ✅ linked |
| identity-intelligence-engine.ts | UC-124 | D-07 Identity Intelligence | ✅ linked |
| identity.ts | UC-012, UC-013 | D-07 Identity Intelligence | ✅ linked |
| inbound-email-submission.ts | UC-043 | D-31 Communication | ✅ linked |
| indicator-of-compromise.ts | UC-032 | D-17 Intelligence Layer | ✅ linked |
| intelligence-common.ts | UC-032–045 | D-17 Intelligence Layer | ✅ linked |
| ioc-case-link.ts | UC-045 (implied) | D-17 Intelligence Layer | ✅ linked |
| ioc-relationship.ts | UC-032 (implied) | D-17 Intelligence Layer | ✅ linked |
| licence.ts | UC-125 | D-36 Internal Control Plane | ✅ linked |
| mission.ts | UC-126 | D-25 Mission Control | ✅ linked |
| observable.ts | UC-028 | D-03 Normalisation | ✅ linked |
| phishing-report.ts | UC-042 | D-31 Communication | ✅ linked |
| platform-intelligence-record.ts | UC-036 | D-17 Intelligence Layer | ✅ linked |
| platform-intelligence-source.ts | UC-036 | D-17 Intelligence Layer | ✅ linked |
| platform-management.ts | UC-PLAT-001–004 | D-04 Drift & Rule Engine | ✅ linked |
| playbook-execution.ts | UC-040 | D-31 Communication | ✅ linked |
| posture-accountability.ts | UC-133 | D-13 Pre-Warned Classification | ✅ linked |
| posture-metrics-config.ts | UC-001 (implied) | D-27 Operating Pictures | ✅ linked |
| pre-warned-classification.ts | UC-127 | D-13 Pre-Warned Classification | ✅ linked |
| pulse.ts | UC-PULSE-001–009 | D-30 Mission Pulse Surfaces | ✅ linked |
| push-action-intent.ts | UC-037 | D-32 Push Engine | ✅ linked |
| push-governance.ts | UC-128 | D-32 Push Engine | ✅ linked |
| report.ts | UC-REPORT-001–003 | D-40 Audit & Evidence | ✅ linked |
| risk-object.ts | UC-005 | D-18 Case Lifecycle | ✅ linked |
| security-tool-intelligence.ts | UC-129 | D-10 Coverage / Tool Health | ✅ linked |
| stix-bundle-ingest.ts | UC-044 | D-17 Intelligence Layer | ✅ linked |
| strategy.ts | UC-016, UC-017, UC-027 | D-22 Strategy Layer | ✅ linked |
| support-operation.ts | UC-130 | D-36 Internal Control Plane | ✅ linked |
| teams-decision-event.ts | UC-058 | D-31 Communication | ✅ linked |
| tenant-config.ts | UC-131 | D-38 Configuration Governance | ✅ linked |
| tenant-intelligence-evaluation.ts | UC-045 (implied) | D-17 Intelligence Layer | ✅ linked |
| tenant-intelligence-subscription.ts | UC-045 (implied) | D-17 Intelligence Layer | ✅ linked |
| tenant-ioc-allowblock-entry.ts | UC-045 (implied) | D-17 Intelligence Layer | ✅ linked |
| tenant-ioc-match.ts | UC-045 | D-17 Intelligence Layer | ✅ linked |
| threat-hunt-record.ts | UC-035 | D-17 Intelligence Layer | ✅ linked |
| topology.ts | UC-132 | D-09 Architecture Intelligence | ✅ linked |
| vendor-advisory.ts | UC-034 | D-17 Intelligence Layer | ✅ linked |
| verdict.ts | UC-015 (implied) | D-15 Verdict Semantics | ✅ linked |
| vulnerability-case-link.ts | UC-033 (implied) | D-05 Vulnerability Management | ✅ linked |
| vulnerability-intelligence-record.ts | UC-033 | D-05 Vulnerability Management | ✅ linked |
| war-room.ts | UC-018 | D-24 P0 Zero-Day | ✅ linked |

---

## Engine Traceability Audit

### Linked Engines (22) — Serve registered use cases, mapped to architectural layer

| Engine | UC | Layer | Status |
|---|---|---|---|
| architecture-intelligence-engine.ts | UC-134 | Layer 3 (Engine) | ✅ linked |
| case-closure-gate-engine.ts | UC-025 | Layer 5 (Case) | ✅ linked |
| case-prioritisation-engine.ts | UC-021 | Layer 5 (Case) | ✅ linked |
| case-ref-generator.ts | UC-003 (implied) | Layer 5 (Case) | ✅ linked |
| case-reopening-trigger-engine.ts | UC-026 | Layer 5 (Case) | ✅ linked |
| case-sla-engine.ts | UC-023 | Layer 5 (Case) | ✅ linked |
| case-type-assigner.ts | UC-003 (implied) | Layer 5 (Case) | ✅ linked |
| case-validation-engine.ts | UC-024 | Layer 5 (Case) | ✅ linked |
| commander-ai-core.ts | UC-046–053 | Cross-cutting | ✅ linked |
| direction-boards-engine.ts | UC-135 | Layer 6 (OODA) | ✅ linked |
| drift-detection-engine.ts | UC-121 | Layer 3 (Engine) | ✅ linked |
| email-case-communication-engine.ts | UC-136 | Layer 5 (Case) | ✅ linked |
| exposure-engine.ts | UC-123 | Layer 3 (Engine) | ✅ linked |
| identity-intelligence-engine.ts | UC-124 | Layer 3 (Engine) | ✅ linked |
| intelligence-layer.ts | UC-032–035 | Layer 4 (Intelligence) | ✅ linked |
| normalisation-layer.ts | UC-030 (implied) | Layer 2 (Normalisation) | ✅ linked |
| ooda-layer.ts | — (Layer 6 framework) | Layer 6 (OODA) | ✅ linked |
| pre-warned-classification-engine.ts | UC-137 | Layer 4 (Intelligence) | ✅ linked |
| push-governance-engine.ts | UC-138 | Layer 3 (Engine) | ✅ linked |
| risk-object-binder.ts | UC-005 (implied) | Layer 5 (Case) | ✅ linked |
| security-tool-intelligence-engine.ts | UC-139 | Layer 3 (Engine) | ✅ linked |
| vulnerability-engine.ts | UC-054–057 | Layer 3 (Engine) | ✅ linked |

---

## Severity Classification

| Severity | Definition | Count |
|---|---|---|
| **Trivial** | Domain is inferable, entity/page exists in build sequence. Resolution = register a UC and add reference. | 0 (all resolved) |
| **Material** | Real missing use case or domain that cannot be inferred from existing context. | 0 |

**Assessment:** All 79 former debt items have been resolved. Use cases UC-059 through UC-139 registered, PAGE_SCHEDULE UC columns populated, all entities and engines now trace through the full chain.

---

## Authority

- Traceability Chain: `.kiro/steering/traceability-chain.md`
- Use Case Register: `docs/00_authority/USE_CASE_REGISTER.md`
- Page Schedule: `docs/00_authority/PAGE_SCHEDULE.md`
- Knowledge Graph: `docs/knowledge/SYSTEM_KNOWLEDGE_GRAPH.md`
- Domain Register: `docs/knowledge/DOMAIN_REGISTER.md`
