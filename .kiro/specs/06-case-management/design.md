# Design — Case Management

**Spec ID:** `06-case-management`  
**Target version:** v1.2

## Design intent

This design replaces the generic v1.0 boilerplate with baseline-derived domain architecture. It remains planning-only until the owner approves implementation.

## Baseline-derived architecture

Case management is a closed-loop, system-owned lifecycle, not manual ticketing. Cases originate from signals, risk objects or governed intake paths; they transition through defined system state machines; they close only through validation closure; and reopening must follow the reopening lifecycle.

## Core components

| Component | Responsibility |
|---|---|
| Signal-to-case path | Converts governed signals into parent cases and sub-cases. |
| Case state machine | Owns allowed parent and sub-case transitions. |
| Risk binding | Binds cases to universal risk objects and affected entities. |
| Assignment engine | Applies team affinity, rank, specialism, workload mix and anti-hoarding rules. |
| Case Action Algorithm | Produces Next Best Action from deterministic inputs. |
| Evidence and closure | Requires evidence packs, validation and reopening history. |
| Communication lifecycle | Preserves case email and stakeholder communication threads. |

## Invariants

- Manual case creation, manual status editing and manual closure are forbidden.
- Every case must carry source signal, surface attribution, lifecycle state, owner context and audit lineage.
- Case risk scoring must be deterministic and evidence-based.
- Closure must be validation-driven; reopening must be auditable.
- Case communication is part of the lifecycle, not a detached note stream.

## Future implementation placement

- `packages/contracts/` — case, sub-case, risk object, SLA and action contracts.
- `packages/rules/` — lifecycle/routing/scoring decision rules.
- `packages/workers/` — async case intake, communication and validation jobs.
- `apps/api/` — future case APIs after validation.
- `apps/web/` and `packages/ui/` — future case surfaces after validation.

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
