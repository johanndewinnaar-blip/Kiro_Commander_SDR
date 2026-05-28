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
