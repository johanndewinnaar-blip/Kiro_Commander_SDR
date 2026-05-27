# Design — Canonical Data Model

**Spec ID:** `04-data-model-canonical-entities`  
**Target version:** v1.2

## Design intent

This design replaces the generic v1.0 boilerplate with baseline-derived domain architecture. It remains planning-only until the owner approves implementation.

## Baseline-derived architecture

This spec is the canonical contract layer for Commander. It is implemented through `packages/contracts/` for DTOs, schema contracts and shared type definitions, with persistence planning under `packages/db/`. It does not introduce app code during this remediation. Future implementation must keep data contracts separate from storage, connector adapters and UI state.

## Core entity families

| Family | Purpose |
|---|---|
| Tenant and user context | Tenant scope, persona, RBAC and feature entitlement context. |
| Estate entities | Asset, identity, service, application, cloud resource and ownership context. |
| Security state | Control, coverage, exposure, vulnerability, verdict, drift finding and baseline state. |
| Operational workflow | Case, sub-case, risk object, security debt, SLA state, action proposal and audit event. |
| Intelligence lineage | Connector signal, stream attribution, surface attribution, source confidence and freshness. |

## Invariants

- Tenant scope is mandatory for runtime data.
- Canonical identifiers must be stable across connector pulls.
- Source lineage must never be discarded during normalisation.
- Security debt and accepted risk are separate object families.
- Mock fixtures must conform to the same contracts as future real connector data.
- Framework mappings are overlays on Commander canonical controls, not the primary data authority.

## Future implementation placement

- `packages/contracts/` — canonical schemas, DTOs, validation contracts and fixture contracts.
- `packages/db/` — persistence models and migrations after validation.
- `tests/fixtures/` — synthetic seed data shaped to the same contracts.
- `apps/api/` — future API boundary only after pack validation.

## Testing strategy

- Validate source authority and translated baseline lineage.
- Validate canonical contracts and fixture shape before implementation.
- Validate tenant scope, RBAC and audit expectations.
- Validate no live AWS/resource/API side effects during initial stages.
- Validate that unresolved doctrine conflicts are recorded before implementation.

## Risks

- Generic scaffolding could conceal baseline violations.
- Kiro could treat a recommendation as implementation permission.
- Mock data could drift from real connector contracts if not tested.
- External tools could override Commander authority unless steering is read first.
