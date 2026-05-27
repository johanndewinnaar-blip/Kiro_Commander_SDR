# Design — Platform Security and Hardening

**Spec ID:** `35-platform-security-and-hardening`  
**Target version:** v1.2

## Design intent

This design is a planning artefact only. It translates baseline architecture into Kiro execution language without creating application code.

## Baseline-derived architecture

### Security as product feature

Platform security is treated as product functionality, not an operational afterthought.

### Tenant isolation

Tenant context is mandatory across API, repositories, jobs, connectors, normalisation, rules, cases, communications, audit, search and logs.

### Break-glass and audit immutability

Elevated access is time-limited, justified, audited and never permits bypass of audit or tenant isolation.

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