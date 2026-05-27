# Design — Commercial Control Plane UI

**Spec ID:** `38-commercial-control-plane-ui`  
**Target version:** v1.2

## Design intent

This design is a planning artefact only. It translates baseline architecture into Kiro execution language without creating application code.

## Baseline-derived architecture

### Three-application separation

The Commercial Control Plane is internal to Commander/Seiertech. It is not the Tenant Admin app and not the Operational App.

### Cross-tenant administration

The surface manages customer/tenant/licence/entitlement/deployment/support/audit operations without exposing customer operational case workflow as tenant users see it.

### Baseline profile authority

Commercial Control Plane owns product baseline profiles, entitlement manifests, deployment rings and product packs.

## Future implementation placement

- `packages/contracts/` for schemas, event contracts and DTOs.
- `packages/rules/` for deterministic policy/rule evaluation.
- `packages/workers/` for scheduled or asynchronous execution.
- `apps/api/` for future service APIs after validation.
- `apps/web/` and `packages/ui/` for future surfaces after validation.

## Testing strategy

- Use synthetic fixtures only before Phase 2 approval.
- Validate tenant isolation, RBAC and audit expectations.
- Validate that no external writes occur from planning artefacts.
- Validate source traceability against baseline child specs.