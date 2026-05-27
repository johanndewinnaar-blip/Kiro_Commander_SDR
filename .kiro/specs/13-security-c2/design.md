# Design — Security C2

**Spec ID:** `13-security-c2`  
**Target version:** v1.2

## Design intent

This design replaces the generic v1.0 boilerplate with baseline-derived domain architecture. It remains planning-only until the owner approves implementation.

## Baseline-derived architecture

Security C2 is Commander SDR's category position. It sits above operational security tools and integrates intelligence, defence, engineering and active response into an auditable operational framework. It does not replace SOC triage, SIEM, EDR, SOAR or incident response tooling.

## Three-layer model

| Layer | Meaning | Product implication |
|---|---|---|
| Security C2 | Category | Market and operating category for Commander. |
| Security Drift Response | Discipline | Closed-loop detect, analyse, control, validate and adjust process. |
| Commander | Platform | SaaS product delivering Security C2 and running SDR. |

## Boundary rules

- Commander can read SOC platform signal where permitted.
- Commander must not write detections, rules, SOAR playbooks or incident actions to SOC platforms in this build lane.
- Commander presents recommendations, evidence, dry-runs and governance decisions rather than bypassing operational authority.
- Security C2 surfaces must preserve OODA, operating picture, intelligence stream and attack-surface lineage.

## Future implementation placement

- `apps/web/` and `packages/ui/` — Security C2 surfaces after validation.
- `packages/contracts/` — Security C2 operating picture and OODA contracts.
- `packages/rules/` — priority overlay and decision-state rules.
- `tests/fixtures/` — synthetic Security C2 operating picture inputs.

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
