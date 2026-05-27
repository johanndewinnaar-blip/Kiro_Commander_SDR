# Design — Internal Risk Investigation Sub-Lifecycle

**Spec ID:** `41-internal-risk-investigation-sub-lifecycle`  
**Target version:** v1.2

## Design intent

This design is a planning artefact only. It translates baseline architecture into Kiro execution language without creating application code.

## Baseline-derived architecture

### Boundary discipline

Commander provides surface-and-routing intelligence only; the customer investigates.

### Sub-lifecycle

Verdict Pattern cases have a separate lifecycle that does not collapse into technical remediation cases.

### Jurisdiction and access

Internal Behavioural Intelligence is sensitive and requires jurisdictional configuration, Internal Risk authority and access audit.

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