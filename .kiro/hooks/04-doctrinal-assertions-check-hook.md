
# Hook Recipe — Doctrinal Assertions Check

**Status:** Hook recipe / guardrail prompt. Enable in Kiro only after review.  
**Purpose:** Verify that implementation-task completion does not violate Commander SDR doctrine.

## Trigger event

Run after any implementation task, spec task or build-pack task is marked complete.

## Checklist

The task must not violate any of the eleven doctrinal assertions:

1. Closed-loop case model — cases are system-owned, routed, closed and reopened through defined lifecycle rules.
2. P0 priority overlay — priority overlays must propagate with reason, scope, expiry/review and evidence.
3. Three-application boundary — Operational App, Tenant Admin and Commercial Control Plane remain distinct.
4. Shell as reference, not inventory — HTML shells are visual references and cannot delete committed routes/features.
5. Registry-driven runtime — routes, menus, pages and feature visibility must be registry-driven.
6. Reference-input boundary — external inputs are reference material until converted through authority and change control.
7. Baseline immutability — archived baseline material is retained for lineage and not silently rewritten.
8. SOC boundary — Commander reads SOC platform signal only and does not push SOC rules, detections, SOAR playbooks or SOC case triage.
9. Four-stream intelligence integrity — External Threat, External Attack, Internal Behavioural and Posture streams remain distinct.
10. Surface attribution — records preserve internal_attack_surface or external_attack_surface attribution where applicable.
11. Connector and verdict doctrine — connector classes are A/B/C/D only, and verdict semantics/disposition are preserved.

## Failure behaviour

If a task violates or may violate any assertion, Kiro must refuse to mark the task complete, create a clarification entry in the relevant spec or `DECISIONS.md`, and require owner review before continuing.

## References

- `.kiro/steering/commander-v2-6-doctrine.md`
- `.kiro/steering/commander-doctrine.md`
- `.kiro/steering/authority-and-precedence.md`
- `.kiro/hooks/01-authority-preflight-hook.md`
- `.kiro/hooks/02-post-task-review-hook.md`
- `.kiro/hooks/03-docs-change-control-hook.md`
