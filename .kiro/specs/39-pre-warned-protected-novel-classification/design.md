# Design — Pre-Warned / Protected / Novel Classification

**Spec ID:** `39-pre-warned-protected-novel-classification`  
**Target version:** v1.2

## Design intent

This design is a planning artefact only. It translates baseline architecture into Kiro execution language without creating application code.

## Baseline-derived architecture

### Temporal foresight model

The capability answers what Commander knew before the attack landed and turns that temporal posture knowledge into audit-grade classification.

### Classification engine

Entity resolution, historical posture retrieval, decision, confidence and immutable audit record are separate phases.

### Operating Picture integration

Classification drives External Operating Picture rendering, priority escalation and board/regulatory reporting narrative.

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