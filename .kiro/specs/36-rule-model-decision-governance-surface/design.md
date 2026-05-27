# Design — Rule, Model and Decision Governance Surface

**Spec ID:** `36-rule-model-decision-governance-surface`  
**Target version:** v1.2

## Design intent

This design is a planning artefact only. It translates baseline architecture into Kiro execution language without creating application code.

## Baseline-derived architecture

### Governance surfaces

Operational App is read-only/explainability; Tenant Admin configures within entitlement; Commercial Control Plane owns product packs and tenant allocation.

### Explainability model

Every material decision must carry rationale fields tying rules/models/evidence/source freshness/confidence to audit.

### Simulation and rollback

Simulation is mandatory before material changes, and rollback state is first-class metadata.

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