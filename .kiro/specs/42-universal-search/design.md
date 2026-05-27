# Design — Universal Search

**Spec ID:** `42-universal-search`  
**Target version:** v1.2

## Design intent

This design is a planning artefact only. It translates baseline architecture into Kiro execution language without creating application code.

## Baseline-derived architecture

### Inconsistency handling

The register names Spec #07 as Universal Search but the file content is Drift and Rule Engine. v1.2 preserves both with separate Kiro specs and records the decision.

### Search boundaries

Universal Search is an operator-only governed capability filtered by tenant, RBAC and authority overlays.

### Canonical search

Search indexes represent canonical Commander objects and governed references, not raw vendor records.

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