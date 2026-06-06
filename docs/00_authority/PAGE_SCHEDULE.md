# Page Schedule — Commander SDR

**Purpose:** Complete page inventory derived from use case register + route registry + actual pages on disk. Validated against canonical data model.
**Status:** Active — update after each build.
**Date baselined:** 2026-06-06

**Validation method:** A page has Status: BUILT only if a `page.tsx` file physically exists on disk at the corresponding route path under `apps/web/src/app/`.

---

## OPERATIONAL APP (boundary: operational)

### Existing Pages (page.tsx physically exists)

---

### PAGE-001: Command Centre
- **Route:** /
- **Boundary:** operational
- **RBAC:** All authenticated
- **Status:** BUILT
- **Owning Spec:** 05-command-centre
- **Build Unit:** Unit 16a (Operational Command Centre) — DONE
- **Feature Backlog Ref:** BL-001 (data-point-to-metric mapping blocks Unit 16b aggregate metrics)
- **Arch Debt:** —
- **Use Cases Served:** UC-001, UC-002

**Available Data Points:**
- Entities: case.ts, asset.ts, identity.ts, connector.ts, risk-object.ts
- Fixtures: seed-cases, seed-assets, seed-identities, seed-connectors, seed-risk-objects
- Resolvers: case-aggregation-resolver

**System-Generated Outputs:**
| Output | Data Source | Validated? | UC-ID |
|---|---|---|---|
| Case count by priority | case.ts (priority field), seed-cases | YES | UC-001 |
| P0 active banner | case.ts (priority: P0, status: active), seed-cases | YES | UC-002 |
| Asset count | asset.ts, seed-assets | YES | UC-001 |
| Identity count | identity.ts, seed-identities | YES | UC-001 |
| Connector status summary | connector.ts (state field), seed-connectors | YES | UC-001 |
| Surface attribution breakdown | case.ts (surfaceAttribution), seed-cases | YES | UC-001 |

**AI-Generated Outputs:**
| AICAP ID | Output | Data Required | UC-ID |
|---|---|---|---|
| — | None currently | — | — |

**Data Gaps:** None — all rendered outputs sourced from existing entities/fixtures.

---

### PAGE-002: Case Queue
- **Route:** /cases
- **Boundary:** operational
- **RBAC:** All authenticated
- **Status:** BUILT
- **Owning Spec:** 06-case-management
- **Build Unit:** Unit 17 (Case Management UI) — DONE
- **Feature Backlog Ref:** —
- **Arch Debt:** —
- **Use Cases Served:** UC-003, UC-004

**Available Data Points:**
- Entities: case.ts
- Fixtures: seed-cases
- Resolvers: —

**System-Generated Outputs:**
| Output | Data Source | Validated? | UC-ID |
|---|---|---|---|
| Case list with type/priority/status/owner | case.ts (all fields), seed-cases | YES | UC-003 |
| Filter by case type | case.ts (caseType), CASE_TYPES constant | YES | UC-004 |
| Filter by priority | case.ts (priority) | YES | UC-004 |
| Filter by status | case.ts (status) | YES | UC-004 |

**Data Gaps:** None.

---

### PAGE-003: Case Detail
- **Route:** /cases/:id
- **Boundary:** operational
- **RBAC:** All authenticated
- **Status:** BUILT
- **Owning Spec:** 06-case-management
- **Build Unit:** Unit 17 (Case Management UI) — DONE
- **Feature Backlog Ref:** —
- **Arch Debt:** —
- **Use Cases Served:** UC-005, UC-006, UC-007

**Available Data Points:**
- Entities: case.ts, risk-object.ts, evidence.ts, action.ts, observable.ts
- Fixtures: seed-cases, seed-risk-objects, seed-evidence, seed-actions, seed-observables
- Resolvers: case-router, case-sla-calculator, case-prioritiser, case-aggregation-resolver

**System-Generated Outputs:**
| Output | Data Source | Validated? | UC-ID |
|---|---|---|---|
| Case header (ref, title, type, priority) | case.ts fields | YES | UC-005 |
| Routing rationale | case.ts (routingRationale), case-router resolver | YES | UC-006 |
| SLA target + breach status | case.ts (sla field), case-sla-calculator | YES | UC-007 |
| Related entities list | case.ts (relatedEntities) | YES | UC-005 |
| Bound risk objects | risk-object.ts, seed-risk-objects | YES | UC-005 |
| Evidence items | evidence.ts, seed-evidence | YES | UC-005 |
| Actions/sub-actions | action.ts, seed-actions | YES | UC-005 |
| ATT&CK bindings (COIM-G) | case.ts (attacks field) | YES | UC-005 |
| Blast radius score (COIM-G) | case.ts (blastRadiusScore) | YES | UC-005 |

**AI-Generated Outputs:**
| AICAP ID | Output | Data Required | UC-ID |
|---|---|---|---|
| AICAP-001 | Summarise case context | case + risk objects + evidence + actions | UC-046 |
| AICAP-002 | Recommend next best action | case + actions + strategy | UC-047 |
| AICAP-006 | Draft case communication | case + threads + playbook | UC-051 |

**Data Gaps:** None for system outputs. AICAP items require Commander AI integration (Phase 2).

---

### PAGE-004: Case Analytics
- **Route:** /cases/analytics
- **Boundary:** operational
- **RBAC:** CISO, SOM, Security Analyst
- **Status:** BUILT
- **Owning Spec:** 06-case-management
- **Build Unit:** Unit 17 (Case Management UI) — DONE
- **Feature Backlog Ref:** —
- **Arch Debt:** —
- **Use Cases Served:** UC-008

**Available Data Points:**
- Entities: case.ts
- Fixtures: seed-cases
- Resolvers: case-aggregation-resolver

**System-Generated Outputs:**
| Output | Data Source | Validated? | UC-ID |
|---|---|---|---|
| Case volume by type (chart) | case.ts (caseType), seed-cases | YES | UC-008 |
| Case volume by priority (chart) | case.ts (priority), seed-cases | YES | UC-008 |
| SLA breach rate | case.ts (sla.breached), seed-cases | YES | UC-008 |
| Mean resolution time | case.ts (createdAt, updatedAt) | YES | UC-008 |
| Team workload distribution | case.ts (team, owner), seed-cases | YES | UC-008 |

**Data Gaps:** None.

---

### PAGE-005: My Cases
- **Route:** /cases/my
- **Boundary:** operational
- **RBAC:** All authenticated
- **Status:** BUILT
- **Owning Spec:** 06-case-management
- **Build Unit:** Unit 17 (Case Management UI) — DONE
- **Feature Backlog Ref:** —
- **Arch Debt:** —
- **Use Cases Served:** UC-009

**Available Data Points:**
- Entities: case.ts
- Fixtures: seed-cases

**System-Generated Outputs:**
| Output | Data Source | Validated? | UC-ID |
|---|---|---|---|
| Assigned cases filtered by current user | case.ts (owner field), seed-cases | YES | UC-009 |

**Data Gaps:** None.

---

### PAGE-006: Asset Intelligence
- **Route:** /assets
- **Boundary:** operational
- **RBAC:** All authenticated
- **Status:** BUILT
- **Owning Spec:** 19-asset-intelligence-surface
- **Build Unit:** Unit 19 (Asset Intelligence Surface) — DONE
- **Feature Backlog Ref:** —
- **Arch Debt:** —
- **Use Cases Served:** UC-010, UC-011

**Available Data Points:**
- Entities: asset.ts
- Fixtures: seed-assets

**System-Generated Outputs:**
| Output | Data Source | Validated? | UC-ID |
|---|---|---|---|
| Asset inventory table | asset.ts, seed-assets | YES | UC-010 |
| Coverage posture (EDR/vuln/patch/backup) | asset.ts (coverage field) | YES | UC-011 |
| Criticality breakdown | asset.ts (criticality) | YES | UC-010 |
| Surface attribution | asset.ts (surfaceAttribution) | YES | UC-010 |
| Classification breakdown | asset.ts (classification) | YES | UC-010 |

**AI-Generated Outputs:**
| AICAP ID | Output | Data Required | UC-ID |
|---|---|---|---|
| AICAP-003 | Explain asset risk posture | asset + risk objects + verdicts | UC-048 |

**Data Gaps:** None for system outputs.

---

### PAGE-007: Identity Intelligence
- **Route:** /identity
- **Boundary:** operational
- **RBAC:** CISO, SOM, Security Analyst, Identity/Access Specialist, Security Architect, Risk Analyst, Risk/Compliance/Audit
- **Status:** BUILT
- **Owning Spec:** 18-identity-intelligence-surface
- **Build Unit:** Unit 18 (Identity Intelligence Surface) — DONE
- **Feature Backlog Ref:** —
- **Arch Debt:** —
- **Use Cases Served:** UC-012, UC-013

**Available Data Points:**
- Entities: identity.ts
- Fixtures: seed-identities

**System-Generated Outputs:**
| Output | Data Source | Validated? | UC-ID |
|---|---|---|---|
| Identity inventory | identity.ts, seed-identities | YES | UC-012 |
| Risk score distribution | identity.ts (riskScore) | YES | UC-012 |
| Privilege level breakdown | identity.ts (privilegeLevel) | YES | UC-013 |
| Risk factors detail | identity.ts (riskFactors) | YES | UC-013 |
| Authentication strength | identity.ts (authenticationStrength) | YES | UC-012 |
| Status breakdown | identity.ts (status) | YES | UC-012 |

**AI-Generated Outputs:**
| AICAP ID | Output | Data Required | UC-ID |
|---|---|---|---|
| AICAP-004 | Explain identity risk factors | identity + risk factors + verdicts | UC-049 |

**Data Gaps:** None for system outputs.

---

### PAGE-008: External Operating Picture
- **Route:** /operating-picture/external
- **Boundary:** operational
- **RBAC:** All authenticated
- **Status:** BUILT
- **Owning Spec:** 20-external-operating-picture
- **Build Unit:** Unit 20 (External Operating Picture) — DONE
- **Feature Backlog Ref:** —
- **Arch Debt:** —
- **Use Cases Served:** UC-014

**Available Data Points:**
- Entities: case.ts, risk-object.ts
- Fixtures: seed-cases, seed-risk-objects

**System-Generated Outputs:**
| Output | Data Source | Validated? | UC-ID |
|---|---|---|---|
| External cases (surfaceAttribution: external) | case.ts, seed-cases | YES | UC-014 |
| External risk objects | risk-object.ts, seed-risk-objects | YES | UC-014 |

**Data Gaps:** None.

---

### PAGE-009: Internal Operating Picture
- **Route:** /operating-picture/internal
- **Boundary:** operational
- **RBAC:** CISO, SOM, Security Analyst, Identity/Access Specialist, Security Architect, Risk Analyst, Risk/Compliance/Audit
- **Status:** BUILT
- **Owning Spec:** 21-internal-operating-picture
- **Build Unit:** Unit 21 (Internal Operating Picture) — DONE
- **Feature Backlog Ref:** —
- **Arch Debt:** —
- **Use Cases Served:** UC-015

**Available Data Points:**
- Entities: case.ts, identity.ts, verdict.ts
- Fixtures: seed-cases, seed-identities, seed-verdicts

**System-Generated Outputs:**
| Output | Data Source | Validated? | UC-ID |
|---|---|---|---|
| Internal cases (surfaceAttribution: internal) | case.ts, seed-cases | YES | UC-015 |
| Identity risk overview | identity.ts, seed-identities | YES | UC-015 |
| Verdict patterns (internal) | verdict.ts, seed-verdicts | YES | UC-015 |

**Data Gaps:** None.

---

### PAGE-010: War Room P0
- **Route:** /war-room/p0
- **Boundary:** operational
- **RBAC:** All authenticated
- **Status:** BUILT
- **Owning Spec:** 24-security-c2-p0-war-room
- **Build Unit:** Unit 37 (Security C2 / War Room) — Team 2, BLOCKED
- **Feature Backlog Ref:** —
- **Arch Debt:** —
- **Use Cases Served:** UC-018

**Available Data Points:**
- Entities: war-room.ts, case.ts
- Fixtures: seed-war-rooms, seed-cases

**System-Generated Outputs:**
| Output | Data Source | Validated? | UC-ID |
|---|---|---|---|
| Active war rooms | war-room.ts (status: activated/monitoring), seed-war-rooms | YES | UC-018 |
| Bound P0 cases | case.ts (priority: P0), seed-cases | YES | UC-018 |
| War room members | war-room.ts (members field), seed-war-rooms | YES | UC-018 |

**Data Gaps:** None.

---

### Scaffolded Routes (registered in routes.ts, no page.tsx on disk)

| Route | Label | Owning Spec | Entities Available | Status |
|---|---|---|---|---|
| /vulnerabilities | Vulnerability Management | 07-vulnerability-management | vulnerability-intelligence-record.ts, seed-vulnerability-intelligence | SCAFFOLD |
| /exposure | Exposure Management | 08-exposure-management | risk-object.ts (exposure_drift type) | SCAFFOLD |
| /controls | Control Coverage | 11-control-coverage-editable-baselines | control-framework.ts, seed-control-frameworks | SCAFFOLD |
| /architecture | Architecture / Topology | 12-architecture-topology | — (no dedicated entity) | SCAFFOLD |
| /governance | Governance Reporting | 22-governance-reporting | control-framework.ts, audit-event.ts | SCAFFOLD |
| /ciso | CISO Dashboard | 23-ciso-dashboard | case.ts, risk-object.ts, asset.ts, identity.ts | SCAFFOLD |
| /security-c2 | Security Command and Control | 13-security-c2 | — (future domain) | SCAFFOLD |
| /ooda | OODA Views | 14-ooda-views | ooda-layer engine | SCAFFOLD |
| /direction-boards | Direction Boards | 15-direction-boards | — (future domain) | SCAFFOLD |
| /commander-ai | Commander AI | 20-commander-ai-core | commander-ai-core engine | SCAFFOLD |
| /strategy | Strategy Centre | 43-strategy-layer-runtime-surface | strategy.ts, seed-strategies | SCAFFOLD (route registered as BUILD but page renders strategy data — no dedicated strategy page.tsx found beyond / which renders it) |
| /transformation | Transformation & M&A | 01-application-shell | — (future domain) | SCAFFOLD |

---

## TENANT ADMIN (boundary: tenant-admin)

### Existing Pages

### PAGE-011: Tenant Admin Overview
- **Route:** /tenant-admin
- **Boundary:** tenant-admin
- **RBAC:** Tenant Admin
- **Status:** SCAFFOLD (page.tsx exists but renders placeholder content)
- **Owning Spec:** 18-tenant-admin
- **Build Unit:** Unit 22 (Tenant Admin Surface) — DONE (v1 display)
- **Feature Backlog Ref:** —
- **Arch Debt:** ARCH-DEBT-047..050 (live enforcement deferred), ARCH-DEBT-019
- **Use Cases Served:** UC-020

**Available Data Points:**
- Entities: strategy.ts (tenant-configurable surfaces), connector.ts
- Fixtures: seed-strategies, seed-connectors

**System-Generated Outputs:**
| Output | Data Source | Validated? | UC-ID |
|---|---|---|---|
| Placeholder admin overview | Static content | YES | UC-020 |

**Data Gaps:**
| Output Needed | Missing | Blocks |
|---|---|---|
| Tenant configuration state | No tenant-config entity/fixture | Live tenant admin functionality |
| User/RBAC management | No user entity/fixture | User management UI |

---

### Scaffolded Routes (registered, no page.tsx)

| Route | Label | RBAC | Owning Spec | Status |
|---|---|---|---|---|
| /settings/tenant | Tenant Overview | Tenant Admin | 18-tenant-admin | SCAFFOLD |
| /settings/users-rbac | Users & RBAC | Tenant Admin | 19-rbac-entitlement-feature-flags | SCAFFOLD |
| /settings/connectors | Connectors & Data Sources | Tenant Admin | 16-connector-framework | SCAFFOLD |
| /settings/features | Feature Availability | Tenant Admin | 19-rbac-entitlement-feature-flags | SCAFFOLD |
| /settings/sla | SLA Configuration | Tenant Admin | 18-tenant-admin | SCAFFOLD |
| /settings/routing | Routing Configuration | Tenant Admin | 18-tenant-admin | SCAFFOLD |
| /settings/validation | Validation Rules | Tenant Admin | 18-tenant-admin | SCAFFOLD |
| /settings/closure-reopening | Closure & Reopening | Tenant Admin | 18-tenant-admin | SCAFFOLD |
| /settings/p0-zero-day | P0 / Zero-Day Config | Tenant Admin | 18-tenant-admin | SCAFFOLD |
| /settings/automation-boundaries | Automation Boundaries | Tenant Admin | 18-tenant-admin | SCAFFOLD |
| /settings/commander-ai | Commander AI Config | Tenant Admin | 20-commander-ai-core | SCAFFOLD |
| /settings/audit-export | Audit & Export | Tenant Admin | 18-tenant-admin | SCAFFOLD |

---

## CONTROL PLANE (boundary: control-plane)

### Existing Pages

### PAGE-012: Control Plane Overview
- **Route:** /control-plane
- **Boundary:** control-plane
- **RBAC:** Seiertech Operator
- **Status:** BUILT
- **Owning Spec:** 18-tenant-admin (Control Plane section)
- **Build Unit:** Unit 23 (Commercial Control Plane) — Team 2, BLOCKED
- **Feature Backlog Ref:** BL-003 (USE_CASE_SCHEDULE.md + PAGE_INVENTORY.md gate artifacts unblock Unit 23)
- **Arch Debt:** —
- **Use Cases Served:** UC-019

**Available Data Points:**
- Static content (commercial authority, rule packs, deployment rings descriptions)

**System-Generated Outputs:**
| Output | Data Source | Validated? | UC-ID |
|---|---|---|---|
| Commercial authority overview | Static content | YES | UC-019 |
| Rule/Model packs overview | Static content | YES | UC-019 |
| Deployment rings overview | Static content | YES | UC-019 |

**Data Gaps:**
| Output Needed | Missing | Blocks |
|---|---|---|
| Live tenant list | No commercial-tenant entity/fixture | Customer management |
| Live entitlement state | No entitlement-profile entity/fixture | Entitlement management |
| Live deployment ring state | No deployment-ring entity/fixture | Ring management |

---

### Scaffolded Routes (registered, no page.tsx)

| Route | Label | RBAC | Status |
|---|---|---|---|
| /control-plane/customers | Customers | Seiertech Operator | SCAFFOLD |
| /control-plane/tenants | Tenants | Seiertech Operator | SCAFFOLD |
| /control-plane/licences | Licences & Entitlements | Seiertech Operator | SCAFFOLD |
| /control-plane/features | Product & Feature Control | Seiertech Operator | SCAFFOLD |
| /control-plane/ai-models | AI & Model Control | Seiertech Operator | SCAFFOLD |
| /control-plane/rule-packs | Rule & Policy Packs | Seiertech Operator | SCAFFOLD |
| /control-plane/baselines | Baseline Profile Management | Seiertech Operator | SCAFFOLD |
| /control-plane/deployment | Deployment & Release | Seiertech Operator | SCAFFOLD |
| /control-plane/support | Support Operations | Seiertech Operator | SCAFFOLD |
| /control-plane/billing | Billing / Usage Evidence | Seiertech Operator | SCAFFOLD |
| /control-plane/audit | Operator Audit | Seiertech Operator | SCAFFOLD |

---

## Summary Statistics

| Metric | Count |
|---|---|
| Total pages built (page.tsx on disk) | 12 |
| Total routes registered | 48 |
| Scaffolded routes (no page.tsx) | 36 |
| Use cases: BUILT | 20 |
| Use cases: NOT BUILT (data exists, no page) | 27 |
| Use cases: SCAFFOLD | 1 |
| Use cases: PROPOSED (AICAP) | 8 |
| AICAP placements identified | 8 |
| Data gaps identified | 5 |
