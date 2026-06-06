# Page Inventory — Control Plane

**Purpose:** Register all Control Plane routes required by BL-003 gate.
**Status:** Active
**Date created:** 2026-06-06
**Gate:** BL-003 (USE_CASE_SCHEDULE.md + PAGE_INVENTORY.md required before Team 2 / Control Plane build)

---

## Control Plane Routes

| # | Route | Page Title | Nav Item | Data Source | Use Case | Status |
|---|---|---|---|---|---|---|
| 1 | /control-plane | Command Overview | Command Overview | Aggregate | UC-CP-001 | BUILT |
| 2 | /control-plane/customers | Customers | Customers | customer.ts, seed-customers | UC-CP-002 | PROPOSED |
| 3 | /control-plane/tenants | Tenants | Tenants | tenant-config.ts, seed-tenant-configs | UC-CP-003 | PROPOSED |
| 4 | /control-plane/licences | Licences & Entitlements | Licences & Entitlements | licence.ts, seed-licences | UC-CP-004 | PROPOSED |
| 5 | /control-plane/features | Product & Feature Control | Product & Feature Control | platform-management.ts | UC-CP-005 | PROPOSED |
| 6 | /control-plane/ai-models | AI & Model Control | AI & Model Control | platform-management.ts | UC-CP-006 | PROPOSED |
| 7 | /control-plane/rule-packs | Rule & Policy Packs | Rule & Policy Packs | platform-management.ts | UC-CP-007 | PROPOSED |
| 8 | /control-plane/baselines | Baseline Profile Management | Baseline Profile Management | control-framework.ts | UC-CP-008 | PROPOSED |
| 9 | /control-plane/deployment | Deployment & Release | Deployment & Release | deployment.ts, seed-deployments | UC-CP-009 | PROPOSED |
| 10 | /control-plane/support | Support Operations | Support Operations | support-operation.ts, seed-support-operations | UC-CP-010 | PROPOSED |
| 11 | /control-plane/billing | Billing / Usage Evidence | Billing / Usage Evidence | licence.ts | UC-CP-011 | PROPOSED |
| 12 | /control-plane/audit | Operator Audit | Operator Audit | audit-event.ts | UC-CP-012 | PROPOSED |

---

## Boundary Rules

- Separate layout with own sidebar (CONTROL_PLANE_NAV_ITEMS in nav-groups.ts)
- Three-application boundary preserved (Doctrinal Assertion 3)
- Seiertech Operator role only — no tenant user access
- No live billing implementation (Phase 1 read-only)
- No real vendor API integrations

---

## Dependencies

| Dependency | Status | Notes |
|---|---|---|
| customer.ts entity | NEEDED | New entity required |
| tenant-config.ts entity | NEEDED | New entity required |
| licence.ts entity | NEEDED | New entity required |
| deployment.ts entity | NEEDED | New entity required |
| support-operation.ts entity | NEEDED | New entity required |
| platform-management.ts | EXISTS | Reuse for features/models/rules |
| control-framework.ts | EXISTS | Reuse for baselines |
| audit-event.ts | EXISTS | Reuse for operator audit |
