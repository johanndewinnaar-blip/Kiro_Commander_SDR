# Design — Drift and Rule Engine

**Spec ID:** `34-drift-and-rule-engine`  
**Target version:** v1.2

## Design intent

This design is a planning artefact only. It translates baseline architecture into Kiro execution language without creating application code.

## Baseline-derived architecture

### Rule runtime

The rule runtime is deterministic, canonical-only, tenant-scoped and safe. It creates findings and case-intake jobs; it does not execute external push actions.

### Rule governance

Rules require validation, approval, versioning, simulation, rollback planning and auditability before activation.

### Finding-to-case boundary

Findings are not cases. The Case Engine remains responsible for authoritative case creation, SLA computation and owner assignment.

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