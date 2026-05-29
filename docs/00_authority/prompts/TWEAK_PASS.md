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

## Performance scorecard reporting

Every tweak pass MUST report its scorecard impact at close. Tweak passes are particularly performance-sensitive because they often touch tokens, components, and styling that affect many surfaces at once.

### Pre-pass capture

Before the pass begins, capture the current scorecard state on the layers the pass will touch:
- Most tweak passes affect the Application Layer (tokens, components, styling).
- Some affect Data Layer (cache or read model patterns).
- Few affect Database Layer or Infrastructure Layer.

Identify the affected layer(s) and capture pre-pass baseline.

### Token-level discipline

Per the existing TWEAK_PASS rules and reinforced by performance doctrine:
- Token changes propagate everywhere — verify they do not introduce regressions to any surface.
- Bundle weight changes from new dependencies require explicit acknowledgement.
- Component-level changes that affect render times must be measured.

### Pass closing report

Include the scorecard impact block in the pass closing report:

```
Scorecard impact (Tweak Pass):
  Application Layer: {band} ({delta}) — {flags}
  {Other layers only if affected}

Per-surface impact (sample):
  /                — LCP {pre} → {post} ({delta})
  /cases           — LCP {pre} → {post} ({delta})
  /cases/[id]      — LCP {pre} → {post} ({delta})
  /cases/analytics — LCP {pre} → {post} ({delta})

Bundle impact:
  Per-route delta: {summary}
  New dependencies: {list or "none"}
```

### Hard refusal

If the tweak pass introduces a new Red unit (e.g. a route's LCP regresses below tolerance, or a route's bundle now exceeds its class cap), do NOT close the pass. Investigate and revert or rework the offending change.

### Authority

This section operates under the same authority chain as the equivalent section in PHASE_RUNNER.md.
