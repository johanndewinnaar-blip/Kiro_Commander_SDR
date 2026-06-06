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
