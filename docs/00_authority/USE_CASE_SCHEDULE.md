# Use Case Schedule — Control Plane

**Purpose:** Register all Control Plane use cases required by BL-003 gate.
**Status:** Active
**Date created:** 2026-06-06
**Gate:** BL-003 (USE_CASE_SCHEDULE.md + PAGE_INVENTORY.md required before Team 2 / Control Plane build)

---

## Control Plane Use Cases

| UC-ID | Use Case | RBAC Role | Boundary | Page | Data Source | Status |
|---|---|---|---|---|---|---|
| UC-CP-001 | View command overview dashboard | Seiertech Operator | control-plane | /control-plane | Aggregate (customers, tenants, licences) | BUILT |
| UC-CP-002 | View customer list | Seiertech Operator | control-plane | /control-plane/customers | customer.ts, seed-customers | PROPOSED |
| UC-CP-003 | View tenant list and configuration | Seiertech Operator | control-plane | /control-plane/tenants | tenant-config.ts, seed-tenant-configs | PROPOSED |
| UC-CP-004 | View licences and entitlements | Seiertech Operator | control-plane | /control-plane/licences | licence.ts, seed-licences | PROPOSED |
| UC-CP-005 | View product and feature control | Seiertech Operator | control-plane | /control-plane/features | platform-management.ts (FeatureRegistryEntry), seed-platform | PROPOSED |
| UC-CP-006 | View AI and model control | Seiertech Operator | control-plane | /control-plane/ai-models | platform-management.ts (ModelDefinition), seed-platform | PROPOSED |
| UC-CP-007 | View rule and policy packs | Seiertech Operator | control-plane | /control-plane/rule-packs | platform-management.ts (RuleDefinition), seed-platform | PROPOSED |
| UC-CP-008 | View baseline profile management | Seiertech Operator | control-plane | /control-plane/baselines | control-framework.ts, seed-control-frameworks | PROPOSED |
| UC-CP-009 | View deployment and release status | Seiertech Operator | control-plane | /control-plane/deployment | deployment.ts, seed-deployments | PROPOSED |
| UC-CP-010 | View support operations | Seiertech Operator | control-plane | /control-plane/support | support-operation.ts, seed-support-operations | PROPOSED |
| UC-CP-011 | View billing and usage evidence | Seiertech Operator | control-plane | /control-plane/billing | licence.ts (usage fields), seed-licences | PROPOSED |
| UC-CP-012 | View operator audit trail | Seiertech Operator | control-plane | /control-plane/audit | audit-event.ts, seed-events | PROPOSED |

---

## Notes

- All Control Plane pages are restricted to Seiertech Operator role
- No tenant data is exposed cross-tenant in this boundary
- Billing implementation is Phase 1 read-only (display usage evidence, no live billing)
- Push governance remains dry-run only
