# Sub-Phasing Proposal

Spec **{{SPEC_NAME}}** has approximately **{{TOTAL_TASK_COUNT}}** tasks and is too large for a single execution pass.

## Instructions

Propose a split into N sub-phases. For each sub-phase, provide:

1. **Name** — short descriptive label (e.g. "Phase C1 — Case Queue UI").
2. **Scope bullets** — what is built in this sub-phase.
3. **Governing mockup** — which DS-1.0 mockup or shell reference applies (if any).
4. **Doctrinal constraints** — any specific doctrine assertions that must hold.
5. **Prerequisites** — which earlier sub-phases or specs must be complete first.
6. **Expected test additions** — rough category (unit, fixture, UI route, integration).

## Rules

- Do not start execution until the owner approves the proposed split.
- Each sub-phase must be independently committable and testable.
- No sub-phase may leave the repo in a broken state.
- If a sub-phase depends on another, state the dependency explicitly.
- Prefer smaller sub-phases (5–15 tasks) over larger ones.
