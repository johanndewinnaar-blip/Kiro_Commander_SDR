# Design — Inverse Discovery Loop

**Spec ID:** `40-inverse-discovery-loop`  
**Target version:** v1.2

## Design intent

This design is a planning artefact only. It translates baseline architecture into Kiro execution language without creating application code.

## Baseline-derived architecture

### Honesty over silent failure

Unknown entities are evidence of coverage gaps, not errors to discard.

### Closed loop

Trigger, secondary resolution, case generation, routing and resolution improve inventory and connector quality.

### Classification dependency

Pre-Warned classification depends on successful entity resolution and must pause or mark novel when resolution fails.

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