# Phase Runner

Execute **{{PHASE_NAME}}** of **{{SPEC_NAME}}**.

## Scope

{{SCOPE_BULLETS}}

## Governing mockup

{{GOVERNING_MOCKUP}}

## Doctrinal constraints

{{DOCTRINAL_CONSTRAINTS}}

## Execution discipline

- Main agent execution. No sub-agents unless explicitly requested.
- Before starting: read the spec's `requirements.md`, `design.md`, and `tasks.md`.
- Follow the authority read order in AGENTS.md.
- Respect all `.kiro/steering/` rules, especially `execution-discipline.md`.
- If a hook or guardrail refuses an action, stop and report — do not work around it.
- Write tests for all new logic. Run the full test suite before committing. Zero regressions.
- Self-verify against the governing mockup (if provided). Report any deviations.
- Commit cleanly with a descriptive message: `Spec {{SPEC_NAME}} {{PHASE_NAME}}: <summary>`.
- If approaching context limit: commit all complete tested work, stop cleanly, and report status. Never leave half-built uncommitted work.
- At the end: report phase outcome — tests added, total test count, surfaces changed, decisions recorded, and any new open items.
- If a UI surface changed: run the dev server and provide the local URL.

## Performance scorecard reporting

Every phase MUST report its performance scorecard impact in the closing report. This is non-negotiable per `.kiro/steering/performance-discipline.md`.

### Pre-phase capture

Before phase work begins, capture the current scorecard state:
- If the scorecard runner is implemented and runnable, invoke it to record the pre-phase baseline.
- If the runner is not yet implemented, reason against the relevant layer strategy documents to identify the current state of any units the phase is likely to affect.

### During the phase

Apply the standing rules from `.kiro/steering/performance-discipline.md` to every change:
- No new Red units may be introduced.
- No regression of Green units past tolerance.
- Workload class must be declared on every database / data call.
- No cross-workload foreign keys.
- Tier discipline cuts both ways (no T2/T3 patterns at T1 deployment, no T1 shortcuts that block T2/T3).
- Performance contracts are non-negotiable; if a target cannot be met, the requirement is re-examined, not the target.

### Phase closing report

The phase report MUST include a scorecard impact block in this format:

```
Scorecard impact:
  Application Layer: {band} ({delta from pre-phase}) — {flags}
  Database Layer:    {band} ({delta from pre-phase}) — {flags}
  Data Layer:        {band} ({delta from pre-phase}) — {flags}
  Infrastructure:    {band} ({delta from pre-phase}) — {flags}

Affected units (this phase):
  + {N} new Green units
  - {N} units regressed (list each)
  ~ {N} units unchanged but newly relevant

Red units (must address before commit):
  {unit name} — {measurement}, score, reference

Amber units (queue for remediation):
  {unit name} — {measurement}, score, reference
```

Where `{band}` is one of Green / Yellow / Amber / Red / N/A.
Where `{delta}` is one of "no change", "improved", "regressed", "new measurement".
Where `{flags}` includes "new Red unit", "regression past tolerance", or "no change".

### Hard refusal

If the phase introduces a new Red unit on any layer, do NOT commit. Surface the Red unit, the relevant strategy document section, and the suggested remediation. The phase is incomplete until the Red unit is addressed.

If a unit regresses from Green to Amber or Red, the same refusal applies.

### Interim handling

During the build-out of the scorecard runner itself, manual scorecard reasoning is acceptable. The discipline still applies — phase reports must still include the scorecard impact block, populated from manual reasoning against the strategy documents.

### Authority

This section operates under:
- `docs/00_authority/PERFORMANCE_DOCTRINE.md` (PD-1.0)
- `docs/00_authority/TEST_AND_TOLERANCE_FRAMEWORK.md` (TTF-1.0)
- `.kiro/steering/performance-discipline.md` (always-on steering)
- `.kiro/hooks/05-performance-compliance.kiro.hook` (enforcement)
