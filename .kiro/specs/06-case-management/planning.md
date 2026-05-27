# Planning — Case Management (Phase A: Data Layer)

**Spec ID:** `06-case-management`  
**Phase:** A (data layer only — no UI, no routes, no strategy consumption logic)  
**Status:** In progress

## Twelve Case Types (Master Technical Specification §6.2)

### v2.5 original 8 types:
1. `drift` — Configuration or security drift detected
2. `vulnerability` — Vulnerability requiring remediation
3. `identity` — Identity risk condition
4. `exposure` — Exposure requiring mitigation
5. `coverage` — Coverage gap detected
6. `tool-health` — Security tool health degradation
7. `threat-intelligence-estate-match` — Threat intelligence matched to estate
8. `external-attack-correlation` — External attack correlated to estate

### v2.6 new 4 types:
9. `verdict-pattern` — Verdict pattern crossing threshold (Internal Risk governance)
10. `inverse-discovery-coverage-blindspot` — Coverage blindspot via Inverse Discovery Loop (Spec #72)
11. `policy-effectiveness` — Policy effectiveness degradation
12. `ooda-tempo-degradation` — OODA phase health degradation (Spec #58)

## Closed-Loop Lifecycle States

Per Spec #08 and Spec #30, cases progress through system-owned states only:

| State | Description | Transition authority |
|-------|-------------|---------------------|
| `open` | Case created by system via signal-to-case path | System only |
| `in-progress` | Assigned to owner via routing engine | System only |
| `awaiting-validation` | Remediation claimed; awaiting validation | System only |
| `awaiting-closure` | Validation passed; closure gates being evaluated | System only |
| `closed` | All closure gates satisfied | System only |
| `reopened` | Reopening trigger fired on a closed case | System only |

**FORBIDDEN:** Manual case creation, manual status edit, manual closure, operator-bypass routing.

## Strategy Consumption Surfaces (from Spec 43)

| Strategy Surface | What Case Management consumes |
|-----------------|-------------------------------|
| SLA Strategy | Response time expectations, escalation cadence |
| Threshold Strategy | Priority thresholds, routing thresholds |
| Routing Strategy | Team affinity, escalation path |
| Validation Window Strategy | When validation runs, evidence freshness |
| Closure Gate Strategy | Gates that must pass before closure |
| Reopening Trigger Strategy | Triggers that cause reopening evaluation |

**NOTE:** Strategy consumption logic is deferred to Phase B. Phase A defines the type-level contracts only.

## Surface Attribution Rules

Per Spec #60 and Doctrinal Assertion 10:
- Every case MUST have `surfaceAttribution: 'internal_attack_surface' | 'external_attack_surface'`
- Cases without surface attribution are forbidden
- Attribution is determined at case creation time based on the source signal and affected entity

## New Risk Object Types (v1.3.1 Lineage Closure)

### `coverage_blindspot`
- Created when Inverse Discovery Loop detects a coverage blindspot (Spec #72)
- Bound to the affected asset/entity
- Generates an `inverse-discovery-coverage-blindspot` case

### `ooda_phase_degradation`
- Created when OODA phase health degrades below threshold (Spec #58)
- Bound to the OODA Tempo Degradation case
- Generates an `ooda-tempo-degradation` case

## Deferred to Later Phases

- Phase B: Strategy consumption logic, routing engine integration
- Phase C: Case queue UI, case detail UI, P0 zero-day UI, case analytics UI
- Phase D: Full lifecycle state machine, validation/closure/reopening logic
- Phase E: Communication lifecycle, evidence packs, auto-healing
