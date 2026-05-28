# Tweak Pass

Execute **{{PASS_NAME}}**.

## Scope

{{SCOPE_BULLETS}}

## Governing mockup

{{GOVERNING_MOCKUP}}

## Execution discipline

- Main agent execution. No sub-agents unless explicitly requested.
- All changes use the three-layer token system (primitive → semantic → component). Zero hardcoded colour, spacing, radius, or typography values.
- Propagate at the token/semantic level. If a value should be global, change the token — never patch individual pages.
- Charts use `--data-*` semantic tokens exclusively. No literal hex in chart specs.
- Run the full test suite before committing. Zero regressions.
- Commit cleanly with message: `Tweak pass: {{PASS_NAME}}`.
- If approaching context limit: commit all complete tested work, stop cleanly, and report status.
- At the end:
  - Run the dev server and provide the local URL.
  - Update `docs/00_authority/CONVERSION_FINDINGS.md` with a dated "Design tweaks — resolved" entry listing what changed.
  - Report: tokens changed, surfaces affected, test count, any remaining items from the pass scope.
