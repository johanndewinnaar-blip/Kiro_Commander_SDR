# Use Case Register — Commander SDR

**Purpose:** Every use case that EXISTS TODAY in Commander, validated against the canonical data model.
**Validation:** Every use case cites a verifiable data source (entity/fixture/resolver that physically exists) or is marked PROPOSED/NOT BUILT.
**Status:** Active — append after each build.
**Date baselined:** 2026-06-06

---

## Legend

- **Status:** BUILT (page + data source + output rendered) | SCAFFOLD (route registered, page exists but not fully rendered) | NOT BUILT (data source exists, no page renders it) | PROPOSED (neither page nor data source exists)
- **Output Type:** SYSTEM (entity/resolver can produce algorithmically) | AICAP (requires AI natural language synthesis)
- **Data Source:** entity.ts / fixture / resolver that physically exists in packages/contracts/src/

---

## Use Case Table

| UC-ID | Use Case | RBAC Role(s) | Boundary | Page | Data Source | Output Type | AICAP ID | Build Unit Ref | Status |
|---|---|---|---|---|---|---|---|---|---|
| UC-001 | View Command Centre posture summary | All authenticated | operational | / | case.ts, asset.ts, identity.ts, connector.ts, seed-cases, seed-assets, seed-identities, seed-connectors | SYSTEM | — | Unit 16a | BUILT |
| UC-002 | View P0/zero-day banner | All authenticated | operational | / | case.ts (priority: P0), seed-cases | SYSTEM | — | Unit 16a | BUILT |
| UC-003 | View case queue (all cases) | All authenticated | operational | /cases | case.ts, seed-cases | SYSTEM | — | Unit 17 | BUILT |
| UC-004 | Filter cases by type/priority/status | All authenticated | operational | /cases | case.ts, seed-cases | SYSTEM | — | Unit 17 | BUILT |
| UC-005 | View case detail | All authenticated | operational | /cases/:id | case.ts, risk-object.ts, evidence.ts, action.ts, seed-cases, seed-risk-objects, seed-evidence, seed-actions | SYSTEM | — | Unit 17 | BUILT |
| UC-006 | View case routing rationale | All authenticated | operational | /cases/:id | case.ts (routingRationale field), case-router resolver | SYSTEM | — | Unit 17, Unit 8 | BUILT |
| UC-007 | View case SLA status | All authenticated | operational | /cases/:id | case.ts (sla field), case-sla-calculator resolver | SYSTEM | — | Unit 17, Unit 10 | BUILT |
| UC-008 | View case analytics dashboard | CISO, SOM, Security Analyst | operational | /cases/analytics | case.ts, seed-cases, case-aggregation-resolver | SYSTEM | — | Unit 17 | BUILT |
| UC-009 | View my assigned cases | All authenticated | operational | /cases/my | case.ts, seed-cases (filtered by owner) | SYSTEM | — | Unit 17 | BUILT |
| UC-010 | View asset inventory | All authenticated | operational | /assets | asset.ts, seed-assets | SYSTEM | — | Unit 19 | BUILT |
| UC-011 | View asset coverage posture | All authenticated | operational | /assets | asset.ts (coverage field), seed-assets | SYSTEM | — | Unit 19 | BUILT |
| UC-012 | View identity intelligence | CISO, SOM, Security Analyst, Identity/Access Specialist, Security Architect, Risk Analyst, Risk/Compliance/Audit | operational | /identity | identity.ts, seed-identities | SYSTEM | — | Unit 18 | BUILT |
| UC-013 | View identity risk factors | CISO, SOM, Security Analyst, Identity/Access Specialist | operational | /identity | identity.ts (riskFactors, privilegeLevel), seed-identities | SYSTEM | — | Unit 18 | BUILT |
| UC-014 | View external operating picture | All authenticated | operational | /operating-picture/external | case.ts (surfaceAttribution: external), risk-object.ts, seed-cases, seed-risk-objects | SYSTEM | — | Unit 20 | BUILT |
| UC-015 | View internal operating picture | CISO, SOM, Security Analyst, Identity/Access Specialist, Security Architect, Risk Analyst, Risk/Compliance/Audit | operational | /operating-picture/internal | case.ts (surfaceAttribution: internal), identity.ts, verdict.ts, seed-cases, seed-identities, seed-verdicts | SYSTEM | — | Unit 21 | BUILT |
| UC-016 | View strategy centre | SOM, CISO, Tenant Admin | operational | /strategy | strategy.ts, seed-strategies | SYSTEM | — | Unit 6 | BUILT |
| UC-017 | View strategy policy configuration | SOM, CISO, Tenant Admin | operational | /strategy | strategy.ts (configuration field), seed-strategies | SYSTEM | — | Unit 6 | BUILT |
| UC-018 | View war room P0 coordination | All authenticated | operational | /war-room/p0 | war-room.ts, seed-war-rooms, case.ts (P0 cases) | SYSTEM | — | Unit 37  | BUILT |
| UC-019 | View control plane overview | Seiertech Operator | control-plane | /control-plane | — (static content) | SYSTEM | — | Unit 23  | BUILT |
| UC-020 | View tenant admin overview | Tenant Admin | tenant-admin | /tenant-admin | — (scaffold display) | SYSTEM | — | Unit 22 | SCAFFOLD |
| UC-021 | Resolve case priority | System | — | — | case-prioritiser resolver, strategy.ts (prioritisation-weight surface) | SYSTEM | — | Unit 9 | NOT BUILT (resolver exists, no direct UI) |
| UC-022 | Resolve case routing | System | — | — | case-router resolver, assignment-engine resolver, strategy.ts (routing surface) | SYSTEM | — | Unit 8 | NOT BUILT (resolver exists, no direct UI) |
| UC-023 | Resolve case SLA target | System | — | — | case-sla-calculator resolver, strategy.ts (sla surface) | SYSTEM | — | Unit 10 | NOT BUILT (resolver exists, no direct UI) |
| UC-024 | Evaluate validation window | System | — | — | case-validation-evaluator, validation-window-enforcer | SYSTEM | — | Unit 11 | NOT BUILT (resolver exists, no direct UI) |
| UC-025 | Evaluate closure gates | System | — | — | case-closure-evaluator, closure-gate-enforcer | SYSTEM | — | Unit 12 | NOT BUILT (resolver exists, no direct UI) |
| UC-026 | Evaluate reopening triggers | System | — | — | case-reopening-evaluator, reopening-trigger-enforcer | SYSTEM | — | Unit 13 | NOT BUILT (resolver exists, no direct UI) |
| UC-027 | Resolve all strategies for a case | System | — | — | case-strategy-resolver | SYSTEM | — | Unit 6 | NOT BUILT (resolver exists, no direct UI) |
| UC-028 | Compute case aggregation (blast radius, ATT&CK, dwell time) | System | — | — | case-aggregation-resolver, risk-object.ts (COIM fields) | SYSTEM | — | Unit 17 (COIM-G) | NOT BUILT (resolver exists, no direct UI) |
| UC-029 | Assign/reassign case to analyst | System | — | — | assignment-engine resolver | SYSTEM | — | Unit 8 | NOT BUILT (resolver exists, no direct UI) |
| UC-030 | Execute connector pull (mock) | System | — | — | connector-pull-orchestrator resolver, connector.ts | SYSTEM | — | Unit 4, Unit 38 | NOT BUILT (resolver exists, no direct UI) |
| UC-031 | Manage strategy policy lifecycle | SOM, CISO, Tenant Admin | operational | /strategy | strategy-policy-lifecycle resolver, strategy.ts | SYSTEM | — | Unit 6 | NOT BUILT (resolver exists, strategy page is scaffold for lifecycle management) |
| UC-032 | View IOC intelligence | All authenticated | operational | /vulnerabilities | indicator-of-compromise.ts, seed-iocs | SYSTEM | — | Unit 50 | BUILT |
| UC-033 | View vulnerability intelligence | All authenticated | operational | /vulnerabilities | vulnerability-intelligence-record.ts, seed-vulnerability-intelligence | SYSTEM | — | Unit 50 | BUILT |
| UC-034 | View vendor advisories | All authenticated | operational | — | vendor-advisory.ts, seed-vendor-advisories | SYSTEM | — | Unit 50 | NOT BUILT (entity/fixture exist, no page) |
| UC-035 | View threat hunt records | All authenticated | operational | — | threat-hunt-record.ts, seed-threat-hunts | SYSTEM | — | Unit 50 | NOT BUILT (entity/fixture exist, no page) |
| UC-036 | View platform intelligence sources | Seiertech Operator | operational | — | platform-intelligence-source.ts, seed-platform-intelligence-sources | SYSTEM | — | Unit 50 | NOT BUILT (entity/fixture exist, no page) |
| UC-037 | View push action intents | SOM | operational | — | push-action-intent.ts, seed-push-action-intents | SYSTEM | — | Unit 42  | NOT BUILT (entity/fixture exist, no page) |
| UC-038 | View control framework compliance | All authenticated | operational | /controls | control-framework.ts, seed-control-frameworks | SYSTEM | — | Unit 33  | BUILT |
| UC-039 | View case communication threads | All authenticated | operational | — | case-communication-thread.ts, seed-communication-threads | SYSTEM | — | Unit 44  | NOT BUILT (entity/fixture exist, no dedicated page) |
| UC-040 | View communication playbooks | SOM, Tenant Admin | operational | — | communication-playbook.ts, seed-communication-playbooks | SYSTEM | — | Unit 44  | NOT BUILT (entity/fixture exist, no page) |
| UC-041 | View detonation verdicts | Security Analyst | operational | — | detonation-verdict.ts, seed-detonation-verdicts | SYSTEM | — | — | NOT BUILT (entity/fixture exist, no page) |
| UC-042 | View phishing reports | Security Analyst | operational | — | phishing-report.ts, seed-phishing-reports | SYSTEM | — | — | NOT BUILT (entity/fixture exist, no page) |
| UC-043 | View inbound email submissions | Security Analyst | operational | — | inbound-email-submission.ts, seed-inbound-email-submissions | SYSTEM | — | — | NOT BUILT (entity/fixture exist, no page) |
| UC-044 | View STIX bundle ingests | Security Analyst | operational | — | stix-bundle-ingest.ts, seed-stix-bundles | SYSTEM | — | — | NOT BUILT (entity/fixture exist, no page) |
| UC-045 | View tenant IOC matches | All authenticated | operational | — | tenant-ioc-match.ts, seed-tenant-ioc-matches | SYSTEM | — | Unit 50 | NOT BUILT (entity/fixture exist, no page) |
| UC-046 | AI: Summarise case context for analyst | All authenticated | operational | /cases/:id | case.ts, risk-object.ts, evidence.ts, action.ts | AICAP | AICAP-001 | Unit 40 | PROPOSED |
| UC-047 | AI: Recommend next best action for case | All authenticated | operational | /cases/:id | case.ts, action.ts, strategy.ts | AICAP | AICAP-002 | Unit 40 | PROPOSED |
| UC-048 | AI: Explain asset risk posture | All authenticated | operational | /assets | asset.ts, risk-object.ts, verdict.ts | AICAP | AICAP-003 | Unit 40 | PROPOSED |
| UC-049 | AI: Explain identity risk factors | All authenticated | operational | /identity | identity.ts (riskFactors), verdict.ts | AICAP | AICAP-004 | Unit 40 | PROPOSED |
| UC-050 | AI: Generate executive risk briefing | CISO | operational | /ciso | case.ts, risk-object.ts, asset.ts, identity.ts | AICAP | AICAP-005 | Unit 40, Unit 36  | PROPOSED |
| UC-051 | AI: Draft case communication | All authenticated | operational | /cases/:id | case.ts, case-communication-thread.ts, communication-playbook.ts | AICAP | AICAP-006 | Unit 40, Unit 44  | PROPOSED |
| UC-052 | AI: Explain drift finding context | All authenticated | operational | — | risk-object.ts (configuration_drift), strategy.ts | AICAP | AICAP-007 | Unit 40 | PROPOSED |
| UC-053 | AI: Correlate IOC to estate exposure | All authenticated | operational | — | indicator-of-compromise.ts, tenant-ioc-match.ts, asset.ts | AICAP | AICAP-008 | Unit 40, Unit 50 | PROPOSED |
| UC-054 | Evaluate vulnerability SSVC decision | System | — | — | vuln-ssvc-evaluator (profiles/vulnerability/) | SYSTEM | — | Unit 27  | NOT BUILT (profile code exists, no UI) |
| UC-055 | Resolve vulnerability SLA modifiers | System | — | — | vuln-sla-modifiers (profiles/vulnerability/) | SYSTEM | — | Unit 27  | NOT BUILT (profile code exists, no UI) |
| UC-056 | Resolve vulnerability closure gates | System | — | — | vuln-closure-gates (profiles/vulnerability/) | SYSTEM | — | Unit 27  | NOT BUILT (profile code exists, no UI) |
| UC-057 | Resolve vulnerability reopening triggers | System | — | — | vuln-reopening-triggers (profiles/vulnerability/) | SYSTEM | — | Unit 27  | NOT BUILT (profile code exists, no UI) |
| UC-058 | View Teams decision events | SOM | operational | — | teams-decision-event.ts, seed-teams-decision-events | SYSTEM | — | — | NOT BUILT (entity/fixture exist, no page) |
| UC-PULSE-001 | View team workload distribution | SOM, Security Analyst | operational | /team-pulse/workload | pulse.ts (TeamPulseEntry), seed-pulse | SYSTEM | AICAP-PULSE-001 | Tier 3 batch | BUILT |
| UC-PULSE-002 | View SLA pressure by team | SOM, CISO | operational | /team-pulse/sla | pulse.ts (TeamPulseEntry), seed-pulse | SYSTEM | AICAP-PULSE-002 | Tier 3 batch | BUILT |
| UC-PULSE-003 | View escalation queue depth | SOM, CISO | operational | /team-pulse/escalation | pulse.ts (TeamPulseEntry), seed-pulse | SYSTEM | AICAP-PULSE-003 | Tier 3 batch | BUILT |
| UC-PULSE-004 | View domain health overview | All authenticated | operational | /domain-pulse | pulse.ts (DomainPulseEntry), seed-pulse | SYSTEM | AICAP-PULSE-004 | Tier 3 batch | BUILT |
| UC-PULSE-005 | View failed validation by domain | All authenticated | operational | /domain-pulse/failed-validation | pulse.ts (DomainPulseEntry), seed-pulse | SYSTEM | AICAP-PULSE-005 | Tier 3 batch | BUILT |
| UC-PULSE-006 | View closure blockers by domain | All authenticated | operational | /domain-pulse/closure-blockers | pulse.ts (DomainPulseEntry), seed-pulse | SYSTEM | AICAP-PULSE-006 | Tier 3 batch | BUILT |
| UC-PULSE-007 | View engine health status | SOM, Security Architect | operational | /system-pulse/engine | pulse.ts (SystemPulseEntry), seed-pulse | SYSTEM | AICAP-PULSE-007 | Tier 3 batch | BUILT |
| UC-PULSE-008 | View queue backlog depth | SOM, Security Architect | operational | /system-pulse/queues | pulse.ts (SystemPulseEntry), seed-pulse | SYSTEM | AICAP-PULSE-008 | Tier 3 batch | BUILT |
| UC-PULSE-009 | View data freshness by subsystem | SOM, Security Architect | operational | /system-pulse/freshness | pulse.ts (SystemPulseEntry), seed-pulse | SYSTEM | AICAP-PULSE-009 | Tier 3 batch | BUILT |
| UC-REPORT-001 | View report schedule | CISO, SOM | operational | /reporting | report.ts, seed-reports | SYSTEM | AICAP-REPORT-001 | Tier 3 batch | BUILT |
| UC-REPORT-002 | View completed report exports | CISO, SOM | operational | /reporting/exports | report.ts, seed-reports | SYSTEM | AICAP-REPORT-002 | Tier 3 batch | BUILT |
| UC-REPORT-003 | View CISO briefing pack | CISO | operational | /reporting/ciso-pack | report.ts (ciso-pack type), seed-reports | SYSTEM | AICAP-REPORT-003 | Tier 3 batch | BUILT |
| UC-PLAT-001 | View rule engine definitions | SOM, Tenant Admin | operational | /platform/rules | platform-management.ts (RuleDefinition), seed-platform | SYSTEM | AICAP-PLATFORM-001 | Tier 3 batch | BUILT |
| UC-PLAT-002 | View model management status | SOM, Tenant Admin | operational | /platform/models | platform-management.ts (ModelDefinition), seed-platform | SYSTEM | AICAP-PLATFORM-002 | Tier 3 batch | BUILT |
| UC-PLAT-003 | View automation rules | SOM, Tenant Admin | operational | /platform/automation | platform-management.ts (AutomationRule), seed-platform | SYSTEM | AICAP-PLATFORM-003 | Tier 3 batch | BUILT |
| UC-PLAT-004 | View feature availability registry | Tenant Admin | operational | /platform/features | platform-management.ts (FeatureRegistryEntry), seed-platform | SYSTEM | AICAP-PLATFORM-004 | Tier 3 batch | BUILT |
| UC-PLAT-005 | View platform data quality | SOM, Tenant Admin | operational | /platform/data-quality | platform-management.ts, pulse.ts, seed-platform, seed-pulse | SYSTEM | AICAP-PLATFORM-005 | Tier 3 batch | BUILT |
| UC-059 | View aggregate posture metrics | All authenticated | operational | /posture | posture-metrics-config.ts, seed-posture-metrics | SYSTEM | — | Unit 16b | BUILT |
| UC-060 | View CISO executive summary | CISO | operational | /ciso | case.ts, asset.ts, identity.ts, risk-object.ts | SYSTEM | — | Unit 36 | SCAFFOLD |
| UC-061 | View SOM architecture overview | SOM, CISO | operational | /som/architecture | architecture-component.ts | SYSTEM | — | — | SCAFFOLD |
| UC-062 | View SOM cloud security posture | SOM, CISO | operational | /som/cloud-security | coverage.ts, asset.ts | SYSTEM | — | — | SCAFFOLD |
| UC-063 | View SOM risk overview | SOM, CISO | operational | /som/risk | risk-object.ts, case.ts | SYSTEM | — | — | SCAFFOLD |
| UC-064 | View SOM security operations | SOM | operational | /som/security-operations | case.ts, pulse.ts | SYSTEM | — | — | SCAFFOLD |
| UC-065 | View identity access drift | All authenticated | operational | /identity/drift | identity.ts (riskFactors), seed-identities | SYSTEM | — | Unit 18 | BUILT |
| UC-066 | View asset ownership mapping | All authenticated | operational | /assets/ownership | asset.ts, seed-assets | SYSTEM | — | Unit 19 | BUILT |
| UC-067 | View asset classification | All authenticated | operational | /assets/classification | asset.ts (dataClassification), seed-assets | SYSTEM | — | Unit 19 | BUILT |
| UC-068 | View architecture overview | All authenticated | operational | /architecture | architecture-component.ts, topology.ts | SYSTEM | — | Unit 32 | SCAFFOLD |
| UC-069 | View architecture drift | All authenticated | operational | /architecture/drift | architecture-component.ts, drift-detection-engine.ts | SYSTEM | — | Unit 32 | SCAFFOLD |
| UC-070 | View architecture dependencies | All authenticated | operational | /architecture/dependencies | topology.ts | SYSTEM | — | Unit 32 | SCAFFOLD |
| UC-071 | View control strength analysis | All authenticated | operational | /controls/strength | control-framework.ts | SYSTEM | — | Unit 33 | SCAFFOLD |
| UC-072 | View control framework mapping | All authenticated | operational | /controls/frameworks | control-framework.ts | SYSTEM | — | Unit 33 | SCAFFOLD |
| UC-073 | View coverage overview | All authenticated | operational | /coverage | coverage.ts, control-framework.ts | SYSTEM | — | — | SCAFFOLD |
| UC-074 | View scanner coverage | All authenticated | operational | /coverage/scanners | coverage.ts, connector.ts | SYSTEM | — | — | SCAFFOLD |
| UC-075 | View telemetry coverage | All authenticated | operational | /coverage/telemetry | coverage.ts, connector.ts | SYSTEM | — | — | SCAFFOLD |
| UC-076 | View tool health overview | All authenticated | operational | /tool-health | connector.ts, seed-connectors | SYSTEM | — | Unit 46 | BUILT |
| UC-077 | View tool connector status | All authenticated | operational | /tool-health/connectors | connector.ts, seed-connectors | SYSTEM | — | Unit 46 | BUILT |
| UC-078 | View source data freshness | All authenticated | operational | /tool-health/freshness | connector.ts, pulse.ts | SYSTEM | — | Unit 46 | BUILT |
| UC-079 | View attack surface exposure | All authenticated | operational | /exposure | exposure.ts, risk-object.ts | SYSTEM | — | Unit 31 | SCAFFOLD |
| UC-080 | View blast zone analysis | All authenticated | operational | /exposure/blast-zones | exposure.ts, risk-object.ts | SYSTEM | — | Unit 31 | SCAFFOLD |
| UC-081 | View coverage gap analysis | All authenticated | operational | /exposure/coverage-gaps | exposure.ts, coverage.ts | SYSTEM | — | Unit 31 | SCAFFOLD |
| UC-082 | View relationship graph | All authenticated | operational | /fusion-map | topology.ts, risk-object.ts | SYSTEM | — | — | SCAFFOLD |
| UC-083 | View blast radius graph | All authenticated | operational | /fusion-map/blast-radius | risk-object.ts, case.ts | SYSTEM | — | — | SCAFFOLD |
| UC-084 | View mission overlay graph | All authenticated | operational | /fusion-map/mission | mission.ts, risk-object.ts | SYSTEM | — | — | SCAFFOLD |
| UC-085 | View P0 overlay graph | All authenticated | operational | /fusion-map/p0 | case.ts (P0), risk-object.ts | SYSTEM | — | — | SCAFFOLD |
| UC-086 | View governance compliance overview | All authenticated | operational | /governance | control-framework.ts, report.ts | SYSTEM | — | Unit 35 | BUILT |
| UC-087 | View governance policies | All authenticated | operational | /governance/policies | control-framework.ts | SYSTEM | — | Unit 35 | SCAFFOLD |
| UC-088 | View governance exceptions | All authenticated | operational | /governance/exceptions | control-framework.ts | SYSTEM | — | Unit 35 | SCAFFOLD |
| UC-089 | View mission overview | All authenticated | operational | /mission/overview | mission.ts | SYSTEM | — | — | SCAFFOLD |
| UC-090 | View mission objectives | All authenticated | operational | /mission/objectives | mission.ts | SYSTEM | — | — | SCAFFOLD |
| UC-091 | View mission impact | All authenticated | operational | /mission/impact | mission.ts, risk-object.ts | SYSTEM | — | — | SCAFFOLD |
| UC-092 | View KEV and critical vulnerabilities | All authenticated | operational | /vulnerabilities/kev | vulnerability-intelligence-record.ts, indicator-of-compromise.ts | SYSTEM | — | Unit 30 | SCAFFOLD |
| UC-093 | View patch intelligence | All authenticated | operational | /vulnerabilities/patches | vulnerability-intelligence-record.ts | SYSTEM | — | Unit 30 | SCAFFOLD |
| UC-094 | View code and supply chain vulns | All authenticated | operational | /vulnerabilities/supply-chain | vulnerability-intelligence-record.ts | SYSTEM | — | Unit 30 | SCAFFOLD |
| UC-095 | Configure P0/zero-day policy | Tenant Admin | tenant-admin | /settings/p0-zero-day | strategy.ts, case.ts | SYSTEM | — | Unit 22 | SCAFFOLD |
| UC-096 | Configure baseline settings | Tenant Admin | tenant-admin | /settings/baselines | strategy.ts, tenant-config.ts | SYSTEM | — | Unit 22 | SCAFFOLD |
| UC-097 | Configure feature availability | Tenant Admin | tenant-admin | /settings/features | platform-management.ts (FeatureRegistryEntry) | SYSTEM | — | Unit 22 | SCAFFOLD |
| UC-098 | Configure audit export | Tenant Admin | tenant-admin | /settings/audit-export | audit-event.ts, report.ts | SYSTEM | — | Unit 22 | SCAFFOLD |
| UC-099 | Manage users and RBAC | Tenant Admin | tenant-admin | /settings/users-rbac | — (scaffold) | SYSTEM | — | Unit 22 | SCAFFOLD |
| UC-100 | Configure tenant rules | Tenant Admin | tenant-admin | /settings/rules | platform-management.ts (RuleDefinition) | SYSTEM | — | Unit 22 | SCAFFOLD |
| UC-101 | View tenant overview | Tenant Admin | tenant-admin | /settings/tenant | tenant-config.ts | SYSTEM | — | Unit 22 | SCAFFOLD |
| UC-102 | View platform overview | All authenticated | operational | /platform | connector.ts, platform-management.ts | SYSTEM | — | — | SCAFFOLD |
| UC-103 | Manage customers | Seiertech Operator | control-plane | /control-plane/customers | customer.ts | SYSTEM | — | Unit 23 | SCAFFOLD |
| UC-104 | Manage tenants | Seiertech Operator | control-plane | /control-plane/tenants | tenant-config.ts | SYSTEM | — | Unit 23 | SCAFFOLD |
| UC-105 | Manage licences | Seiertech Operator | control-plane | /control-plane/licences | licence.ts | SYSTEM | — | Unit 23 | SCAFFOLD |
| UC-106 | Manage product features | Seiertech Operator | control-plane | /control-plane/features | platform-management.ts | SYSTEM | — | Unit 23 | SCAFFOLD |
| UC-107 | Manage AI models | Seiertech Operator | control-plane | /control-plane/ai-models | platform-management.ts (ModelDefinition) | SYSTEM | — | Unit 23 | SCAFFOLD |
| UC-108 | Manage rule packs | Seiertech Operator | control-plane | /control-plane/rule-packs | platform-management.ts (RuleDefinition) | SYSTEM | — | Unit 23 | SCAFFOLD |
| UC-109 | Manage baseline profiles | Seiertech Operator | control-plane | /control-plane/baselines | strategy.ts, tenant-config.ts | SYSTEM | — | Unit 23 | SCAFFOLD |
| UC-110 | Manage deployment and release | Seiertech Operator | control-plane | /control-plane/deployment | deployment.ts | SYSTEM | — | Unit 23 | SCAFFOLD |
| UC-111 | Manage support operations | Seiertech Operator | control-plane | /control-plane/support | support-operation.ts | SYSTEM | — | Unit 23 | SCAFFOLD |
| UC-112 | View billing and usage | Seiertech Operator | control-plane | /control-plane/billing | — (scaffold) | SYSTEM | — | Unit 23 | SCAFFOLD |
| UC-113 | View operator audit | Seiertech Operator | control-plane | /control-plane/audit | audit-event.ts | SYSTEM | — | Unit 23 | SCAFFOLD |
| UC-114 | Manage architecture components | System | — | — | architecture-component.ts | SYSTEM | — | Unit 32 | NOT BUILT |
| UC-115 | Compute architecture intelligence | System | — | — | architecture-intelligence-engine.ts | SYSTEM | — | Unit 26 | NOT BUILT |
| UC-116 | Generate CISO executive summary | CISO | operational | /som/ciso | ciso-summary.ts | SYSTEM | — | Unit 36 | NOT BUILT |
| UC-117 | Compute coverage metrics | System | — | — | coverage.ts | SYSTEM | — | — | NOT BUILT |
| UC-118 | Manage customers lifecycle | Seiertech Operator | control-plane | — | customer.ts | SYSTEM | — | Unit 23 | NOT BUILT |
| UC-119 | Manage deployment lifecycle | Seiertech Operator | control-plane | — | deployment.ts | SYSTEM | — | Unit 23 | NOT BUILT |
| UC-120 | Manage direction boards | All authenticated | operational | — | direction-board.ts | SYSTEM | — | Unit 34 | NOT BUILT |
| UC-121 | Compute drift detection | System | — | — | drift-detection-engine.ts | SYSTEM | — | Unit 24 | NOT BUILT |
| UC-122 | Manage email case communication | System | — | — | email-case-communication.ts | SYSTEM | — | Unit 44 | NOT BUILT |
| UC-123 | Compute exposure assessment | System | — | — | exposure-engine.ts, exposure.ts | SYSTEM | — | Unit 28 | NOT BUILT |
| UC-124 | Compute identity intelligence | System | — | — | identity-intelligence-engine.ts | SYSTEM | — | Unit 25 | NOT BUILT |
| UC-125 | Manage licence entitlements | Seiertech Operator | control-plane | — | licence.ts | SYSTEM | — | Unit 23 | NOT BUILT |
| UC-126 | Manage mission objectives | SOM, CISO | operational | — | mission.ts | SYSTEM | — | — | NOT BUILT |
| UC-127 | Compute pre-warned classification | System | — | — | pre-warned-classification.ts | SYSTEM | — | Unit 29 | NOT BUILT |
| UC-128 | Manage push governance | System | — | — | push-governance.ts | SYSTEM | — | Unit 42 | NOT BUILT |
| UC-129 | Compute security tool intelligence | System | — | — | security-tool-intelligence.ts | SYSTEM | — | Unit 45 | NOT BUILT |
| UC-130 | Manage support operations | Seiertech Operator | control-plane | — | support-operation.ts | SYSTEM | — | Unit 23 | NOT BUILT |
| UC-131 | Manage tenant configuration | Tenant Admin | tenant-admin | — | tenant-config.ts | SYSTEM | — | Unit 22 | NOT BUILT |
| UC-132 | Manage topology graph | System | — | — | topology.ts | SYSTEM | — | Unit 32 | NOT BUILT |
| UC-133 | Compute posture accountability | System | — | — | posture-accountability.ts | SYSTEM | — | Unit 29 | NOT BUILT |
| UC-134 | Compute architecture intelligence patterns | System | — | — | architecture-intelligence-engine.ts (engine) | SYSTEM | — | Unit 26 | NOT BUILT |
| UC-135 | Manage direction board lifecycle | System | — | — | direction-boards-engine.ts | SYSTEM | — | Unit 34 | NOT BUILT |
| UC-136 | Process email case communication | System | — | — | email-case-communication-engine.ts | SYSTEM | — | Unit 44 | NOT BUILT |
| UC-137 | Compute pre-warned classification pipeline | System | — | — | pre-warned-classification-engine.ts | SYSTEM | — | Unit 29 | NOT BUILT |
| UC-138 | Enforce push governance rules | System | — | — | push-governance-engine.ts | SYSTEM | — | Unit 42 | NOT BUILT |
| UC-139 | Compute security tool intelligence metrics | System | — | — | security-tool-intelligence-engine.ts | SYSTEM | — | Unit 45 | NOT BUILT |
| UC-140 | Configure strategy policy (any of 19 surface types) | SOM | operational | /strategy/centre | strategy.ts, seed-strategies | SYSTEM | — | Spec 43 | NOT BUILT |
| UC-141 | Simulate strategy policy change before activation | SOM | operational | /strategy/simulation | strategy.ts, seed-strategies, strategy-simulation-engine.ts | SYSTEM | — | Spec 43 | NOT BUILT |
| UC-142 | Approve strategy policy (approval workflow) | SOM | operational | /strategy/centre | strategy.ts, seed-strategies | SYSTEM | — | Spec 43 | NOT BUILT |
| UC-143 | View strategy policy audit history | SOM, CISO | operational | /strategy/audit-history | strategy.ts, seed-strategies, audit-event.ts | SYSTEM | — | Spec 43 | NOT BUILT |
| UC-144 | Preview effective policy state | SOM | operational | /strategy/centre | strategy.ts, seed-strategies | SYSTEM | — | Spec 43 | NOT BUILT |
| UC-145 | Trigger runtime binding recalculation | System | — | — | strategy-runtime-engine.ts | SYSTEM | — | Spec 43 | NOT BUILT |
| UC-146 | View Strategy Centre (unified config) | SOM | operational | /strategy/centre | strategy.ts, seed-strategies | SYSTEM | — | Spec 43 | NOT BUILT |
| UC-147 | Enforce build-blocking gate (no strategy-dependent feature ships without coverage) | System | — | — | strategy-runtime-engine.ts | SYSTEM | — | Spec 43 | NOT BUILT |
| UC-148 | Authenticate via SSO/OIDC | All users | operational | — | auth-session.ts, seed-auth-sessions | SYSTEM | — | Spec 35 | NOT BUILT |
| UC-149 | Manage server-side sessions | System | — | — | auth-session.ts, rbac-enforcement-engine.ts | SYSTEM | — | Spec 35 | NOT BUILT |
| UC-150 | Enforce tenant isolation | System | — | — | tenant-isolation-guard.ts | SYSTEM | — | Spec 35 | NOT BUILT |
| UC-151 | Request break-glass access | SOM, Admin | operational | /settings/security | break-glass-request.ts, seed-break-glass | SYSTEM | — | Spec 35 | NOT BUILT |
| UC-152 | Enforce RBAC at route/action level | System | — | — | rbac-enforcement-engine.ts, rbac-policy.ts | SYSTEM | — | Spec 35 | NOT BUILT |
| UC-153 | Audit sensitive access | System | — | — | rbac-enforcement-engine.ts, audit-event.ts | SYSTEM | — | Spec 35 | NOT BUILT |

| UC-154 | Search across all governed entities | All authenticated | operational | /search | search-index-config.ts, universal-search-engine.ts, seed-search-config | SYSTEM | — | Spec 42 | BUILT |
| UC-155 | Audit sensitive search queries | System | — | — | universal-search-engine.ts (auditSensitiveSearch), audit-event.ts | SYSTEM | — | Spec 42 | NOT BUILT (engine exists, audit trail deferred) |
| UC-156 | Configure search index | Admin | tenant-admin | /settings/search | search-index-config.ts, seed-search-config | SYSTEM | — | Spec 42 | NOT BUILT (entity exists, no dedicated config page) |

---

## AICAP Register (Commander AI Capability Placements)

| AICAP ID | Description | Required Data (system provides) | Commander AI Mode (Spec #13 §4) | Status |
|---|---|---|---|---|
| AICAP-001 | Summarise case context for analyst | case + bound risk objects + evidence + actions | Estate awareness | PROPOSED |
| AICAP-002 | Recommend next best action | case + actions + strategy policies | Engineering support | PROPOSED |
| AICAP-003 | Explain asset risk posture | asset + bound risk objects + verdicts | Estate awareness | PROPOSED |
| AICAP-004 | Explain identity risk factors | identity + risk factors + verdicts | Estate awareness | PROPOSED |
| AICAP-005 | Generate executive risk briefing | aggregated cases + risk objects + assets + identities | Architectural advisory | PROPOSED |
| AICAP-006 | Draft case communication | case + thread history + playbook template | Communication drafting | PROPOSED |
| AICAP-007 | Explain drift finding context | risk object (drift type) + strategy policy | Engineering support | PROPOSED |
| AICAP-008 | Correlate IOC to estate exposure | IOC + tenant matches + affected assets | Threat triage | PROPOSED |
