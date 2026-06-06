# Page Schedule — Commander SDR

**Purpose:** Complete page inventory structured to mirror the sidebar navigation hierarchy (apps/web/src/registry/nav-groups.ts). Validated against canonical data model.
**Status:** Active — update after each build.
**Date baselined:** 2026-06-06
**Structure:** Mirrors nav-groups.ts. Each sidebar GROUP = section header. Child pages indented below. Detail views (reached by item click, not sidebar) listed separately.

---

## OPERATIONAL APP

### Group 1: Case Management

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| My Cases | /cases/my | BUILT | Unit 17 | UC-009 |
| All Cases | /cases | BUILT | Unit 17 | UC-003, UC-004 |
| P0 Zero-Day | /war-room/p0 | BUILT | Unit 37 (Team 2) | UC-018 |
| Case Analytics | /cases/analytics | BUILT | Unit 17 | UC-008 |

**Detail views (reached by item click):**

| Page | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Case Detail | /cases/:id | BUILT | Unit 17 | UC-005, UC-006, UC-007 |

---

### Group 2: Mission Control

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Mission Overview | /mission/overview | SCAFFOLD | — | — |
| Mission Objectives | /mission/objectives | SCAFFOLD | — | — |
| Mission Impact | /mission/impact | SCAFFOLD | — | — |

---

### Group 3: Fusion Map

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Relationship Graph | /fusion-map | SCAFFOLD | — | — |
| Blast Radius | /fusion-map/blast-radius | SCAFFOLD | — | — |
| Mission Overlay | /fusion-map/mission | SCAFFOLD | — | — |
| P0 Overlay | /fusion-map/p0 | SCAFFOLD | — | — |

---

### Group 4: Vulnerability Management

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Overview | /vulnerabilities | BUILT | Unit 30 (Team 2) | UC-033 |
| KEV & Critical | /vulnerabilities/kev | SCAFFOLD | Unit 30 (Team 2) | — |
| Patch Intelligence | /vulnerabilities/patches | SCAFFOLD | Unit 30 (Team 2) | — |
| Code & Supply Chain | /vulnerabilities/supply-chain | SCAFFOLD | Unit 30 (Team 2) | — |

---

### Group 5: Exposure Management

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Attack Surface | /exposure | SCAFFOLD | Unit 31 (Team 2) | — |
| Blast Zones | /exposure/blast-zones | SCAFFOLD | Unit 31 (Team 2) | — |
| Coverage Gaps | /exposure/coverage-gaps | SCAFFOLD | Unit 31 (Team 2) | — |

---

### Group 6: Identity & Access

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Identity Overview | /identity | BUILT | Unit 18 | UC-012, UC-013 |
| Privileged Access | /identity/privileged | BUILT | Unit 18 | UC-013 |
| Access Drift | /identity/drift | BUILT | Unit 18 | — |

---

### Group 7: Architecture

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Architecture Overview | /architecture | SCAFFOLD | Unit 32 (Team 2) | — |
| Architecture Drift | /architecture/drift | SCAFFOLD | Unit 32 (Team 2) | — |
| Dependency Map | /architecture/dependencies | SCAFFOLD | Unit 32 (Team 2) | — |

---

### Group 8: Assets

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Inventory | /assets | BUILT | Unit 19 | UC-010, UC-011 |
| Ownership | /assets/ownership | BUILT | Unit 19 | — |
| Classification | /assets/classification | BUILT | Unit 19 | — |

---

### Group 9: Controls

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Control Coverage | /controls | BUILT | Unit 33 (Team 2) | UC-038 |
| Control Strength | /controls/strength | SCAFFOLD | Unit 33 (Team 2) | — |
| Framework Mapping | /controls/frameworks | SCAFFOLD | Unit 33 (Team 2) | — |

---

### Group 10: Coverage

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Coverage Overview | /coverage | SCAFFOLD | — | — |
| Scanner Coverage | /coverage/scanners | SCAFFOLD | — | — |
| Telemetry Coverage | /coverage/telemetry | SCAFFOLD | — | — |

---

### Group 11: Tool Health

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Tool Health | /tool-health | BUILT | Unit 46 (Team 2) | — |
| Connectors | /tool-health/connectors | BUILT | Unit 46 (Team 2) | — |
| Source Freshness | /tool-health/freshness | BUILT | Unit 46 (Team 2) | — |

---

### Group 12: Team Pulse

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Workload | /team-pulse/workload | SCAFFOLD | — | — |
| SLA Pressure | /team-pulse/sla | SCAFFOLD | — | — |
| Escalation Queue | /team-pulse/escalation | SCAFFOLD | — | — |

---

### Group 13: Domain Pulse

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Domain Overview | /domain-pulse | SCAFFOLD | — | — |
| Failed Validation | /domain-pulse/failed-validation | SCAFFOLD | — | — |
| Closure Blockers | /domain-pulse/closure-blockers | SCAFFOLD | — | — |

---

### Group 14: System Pulse

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Engine Health | /system-pulse/engine | SCAFFOLD | — | — |
| Queue Backlog | /system-pulse/queues | SCAFFOLD | — | — |
| Data Freshness | /system-pulse/freshness | SCAFFOLD | — | — |

---

### Group 15: Platform

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Platform Overview | /platform | SCAFFOLD | — | — |
| Connectors & Data Sources | /platform/connectors | BUILT | Unit 4, Unit 38 | UC-030 |
| Data Quality | /platform/data-quality | SCAFFOLD | — | — |
| Rule Engine | /platform/rules | SCAFFOLD | — | — |
| Model Management | /platform/models | SCAFFOLD | — | — |
| Commander AI | /commander-ai | BUILT | Unit 40 | UC-046–053 (AICAP) |
| Automation | /platform/automation | SCAFFOLD | — | — |
| Feature Availability | /platform/features | SCAFFOLD | — | — |
| Audit & Logs | /platform/audit | BUILT | Unit 43 | — |

---

### Group 16: Tenant Admin (sidebar shortcut)

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Overview | /settings/tenant | SCAFFOLD | Unit 22 | — |
| Baseline Configuration | /settings/baselines | SCAFFOLD | Unit 22 | — |
| Users & Access | /settings/users-rbac | SCAFFOLD | Unit 22 | — |
| Rules & Models | /settings/rules | SCAFFOLD | Unit 22 | — |
| AI Configuration | /settings/commander-ai | SCAFFOLD | Unit 22 | — |
| Audit | /settings/audit-export | SCAFFOLD | Unit 22 | — |

---

### Group 17: Governance

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Compliance | /governance | BUILT | Unit 35 (Team 2) | — |
| Policies & Standards | /governance/policies | SCAFFOLD | Unit 35 (Team 2) | — |
| Exceptions | /governance/exceptions | SCAFFOLD | Unit 35 (Team 2) | — |

---

### Group 18: Reporting

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Reports | /reporting | SCAFFOLD | Unit 35 (Team 2) | — |
| Exports | /reporting/exports | SCAFFOLD | Unit 35 (Team 2) | — |
| CISO Pack | /reporting/ciso-pack | SCAFFOLD | Unit 36 (Team 2) | UC-050 (AICAP) |

---

### Top Nav Workspaces (direct access)

| Tab | Route | Status | Notes |
|---|---|---|---|
| Command Centre | / | BUILT | Landing page (Unit 16a) |
| Fusion Map | /fusion-map | SCAFFOLD | Group 3 entry |
| Vulnerabilities | /vulnerabilities | SCAFFOLD | Group 4 entry |
| Identity | /identity | BUILT | Group 6 entry |
| Architecture | /architecture | SCAFFOLD | Group 7 entry |
| CISO | /ciso | SCAFFOLD | Route registered, no nav group match |

---

### Operating Pictures (detail drill-paths from Command Centre)

| Page | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| External Operating Picture | /operating-picture/external | BUILT | Unit 20 | UC-014 |
| Internal Operating Picture | /operating-picture/internal | BUILT | Unit 21 | UC-015 |

---

## TENANT ADMIN

### Tenant Admin Panel (full route set from tenant-admin-routes.ts)

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Tenant Admin Overview | /tenant-admin | SCAFFOLD | Unit 22 | UC-020 |
| Tenant Overview | /settings/tenant | SCAFFOLD | Unit 22 | — |
| Users & RBAC | /settings/users-rbac | SCAFFOLD | Unit 22 | — |
| Connectors & Data Sources | /settings/connectors | BUILT | Unit 22 | — |
| Feature Availability | /settings/features | SCAFFOLD | Unit 22 | — |
| SLA Configuration | /settings/sla | BUILT | Unit 22 | — |
| Routing Configuration | /settings/routing | BUILT | Unit 22 | — |
| Validation Rules | /settings/validation | BUILT | Unit 22 | — |
| Closure & Reopening | /settings/closure-reopening | BUILT | Unit 22 | — |
| P0 / Zero-Day Config | /settings/p0-zero-day | SCAFFOLD | Unit 22 | — |
| Automation Boundaries | /settings/automation-boundaries | BUILT | Unit 22 | — |
| Commander AI Config | /settings/commander-ai | BUILT | Unit 22 | — |
| Audit & Export | /settings/audit-export | SCAFFOLD | Unit 22 | — |

**Arch Debt:** ARCH-DEBT-047..050 (live enforcement deferred), ARCH-DEBT-019

---

## CONTROL PLANE

### Control Plane Sidebar (from CONTROL_PLANE_NAV_ITEMS)

| Nav Item | Route | Status | Build Unit | Use Cases |
|---|---|---|---|---|
| Command Overview | /control-plane | BUILT | Unit 23 (Team 2) | UC-019 |
| Customers | /control-plane/customers | SCAFFOLD | Unit 23 (Team 2) | — |
| Tenants | /control-plane/tenants | SCAFFOLD | Unit 23 (Team 2) | — |
| Licences & Entitlements | /control-plane/licences | SCAFFOLD | Unit 23 (Team 2) | — |
| Product & Feature Control | /control-plane/features | SCAFFOLD | Unit 23 (Team 2) | — |
| AI & Model Control | /control-plane/ai-models | SCAFFOLD | Unit 23 (Team 2) | — |
| Rule & Policy Packs | /control-plane/rule-packs | SCAFFOLD | Unit 23 (Team 2) | — |
| Baseline Profile Management | /control-plane/baselines | SCAFFOLD | Unit 23 (Team 2) | — |
| Deployment & Release | /control-plane/deployment | SCAFFOLD | Unit 23 (Team 2) | — |
| Support Operations | /control-plane/support | SCAFFOLD | Unit 23 (Team 2) | — |
| Billing / Usage Evidence | /control-plane/billing | SCAFFOLD | Unit 23 (Team 2) | — |
| Operator Audit | /control-plane/audit | SCAFFOLD | Unit 23 (Team 2) | — |

**Feature Backlog Ref:** BL-003 (USE_CASE_SCHEDULE.md + PAGE_INVENTORY.md gate artifacts unblock Unit 23)

---

## DETAIL VIEWS (no sidebar nav item — reached by item interaction)

| Page | Route | Status | Build Unit | Reached From | Use Cases |
|---|---|---|---|---|---|
| Case Detail | /cases/:id | BUILT | Unit 17 | /cases, /cases/my | UC-005, UC-006, UC-007 |

---

## RECONCILIATION

### Nav Items Without Pages (SCAFFOLD — need building)

These are registered in nav-groups.ts sidebar but have no page.tsx on disk:

| Group | Nav Item | Route |
|---|---|---|
| Mission Control | Mission Overview | /mission/overview |
| Mission Control | Mission Objectives | /mission/objectives |
| Mission Control | Mission Impact | /mission/impact |
| Fusion Map | Relationship Graph | /fusion-map |
| Fusion Map | Blast Radius | /fusion-map/blast-radius |
| Fusion Map | Mission Overlay | /fusion-map/mission |
| Fusion Map | P0 Overlay | /fusion-map/p0 |
| Vulnerability Mgmt | Overview | /vulnerabilities |
| Vulnerability Mgmt | KEV & Critical | /vulnerabilities/kev |
| Vulnerability Mgmt | Patch Intelligence | /vulnerabilities/patches |
| Vulnerability Mgmt | Code & Supply Chain | /vulnerabilities/supply-chain |
| Exposure Mgmt | Attack Surface | /exposure |
| Exposure Mgmt | Blast Zones | /exposure/blast-zones |
| Exposure Mgmt | Coverage Gaps | /exposure/coverage-gaps |
| Identity & Access | Privileged Access | /identity/privileged |
| Identity & Access | Access Drift | /identity/drift |
| Architecture | Architecture Overview | /architecture |
| Architecture | Architecture Drift | /architecture/drift |
| Architecture | Dependency Map | /architecture/dependencies |
| Assets | Ownership | /assets/ownership |
| Assets | Classification | /assets/classification |
| Controls | Control Coverage | /controls |
| Controls | Control Strength | /controls/strength |
| Controls | Framework Mapping | /controls/frameworks |
| Coverage | Coverage Overview | /coverage |
| Coverage | Scanner Coverage | /coverage/scanners |
| Coverage | Telemetry Coverage | /coverage/telemetry |
| Tool Health | Tool Health | /tool-health |
| Tool Health | Connectors | /tool-health/connectors |
| Tool Health | Source Freshness | /tool-health/freshness |
| Team Pulse | Workload | /team-pulse/workload |
| Team Pulse | SLA Pressure | /team-pulse/sla |
| Team Pulse | Escalation Queue | /team-pulse/escalation |
| Domain Pulse | Domain Overview | /domain-pulse |
| Domain Pulse | Failed Validation | /domain-pulse/failed-validation |
| Domain Pulse | Closure Blockers | /domain-pulse/closure-blockers |
| System Pulse | Engine Health | /system-pulse/engine |
| System Pulse | Queue Backlog | /system-pulse/queues |
| System Pulse | Data Freshness | /system-pulse/freshness |
| Platform | Platform Overview | /platform |
| Platform | Connectors & Data Sources | /platform/connectors |
| Platform | Data Quality | /platform/data-quality |
| Platform | Rule Engine | /platform/rules |
| Platform | Model Management | /platform/models |
| Platform | Commander AI | /commander-ai |
| Platform | Automation | /platform/automation |
| Platform | Feature Availability | /platform/features |
| Platform | Audit & Logs | /platform/audit |
| Governance | Compliance | /governance |
| Governance | Policies & Standards | /governance/policies |
| Governance | Exceptions | /governance/exceptions |
| Reporting | Reports | /reporting |
| Reporting | Exports | /reporting/exports |
| Reporting | CISO Pack | /reporting/ciso-pack |

**Total scaffold nav items without pages: 52**

---

### Pages Without Nav Items (ORPHAN — need nav placement)

These pages exist on disk (page.tsx) but are NOT in nav-groups.ts sidebar:

| Page | Route | Status | Notes |
|---|---|---|---|
| External Operating Picture | /operating-picture/external | BUILT | Drill-path from Command Centre; not in sidebar (intentional — detail view) |
| Internal Operating Picture | /operating-picture/internal | BUILT | Drill-path from Command Centre; not in sidebar (intentional — detail view) |
| Tenant Admin Overview | /tenant-admin | SCAFFOLD | Separate boundary — has own sidebar in layout.tsx |
| Control Plane Overview | /control-plane | BUILT | Separate boundary — has own sidebar in layout.tsx |

**Note:** Operating Picture pages are intentionally orphaned from the sidebar (they're drill-paths). Tenant Admin and Control Plane are separate boundaries with their own navigation. No true orphans detected.

---

## Summary Statistics

| Metric | Count |
|---|---|
| Total BUILT pages (page.tsx on disk) | 34 |
| Total SCAFFOLD nav items (no page.tsx) | 30 |
| Sidebar nav groups (operational) | 19 |
| Top nav workspace tabs | 5 |
| Detail views (no nav item) | 3 |
| True orphan pages | 0 |
