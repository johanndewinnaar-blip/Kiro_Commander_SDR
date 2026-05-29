# Template Update Specifications

This document specifies the additions to three existing prompt templates in `docs/00_authority/prompts/`. These additions integrate performance scorecard reporting into the standard prompt rhythm per `PERFORMANCE_DOCTRINE.md` (PD-1.0) §7.5 and `.kiro/steering/performance-discipline.md`.

Kiro should apply these as edits to the existing template files, preserving all existing content and adding the new sections in the locations specified.

---

## Update 1 — `docs/00_authority/prompts/PHASE_RUNNER.md`

### Add a new section at an appropriate place near the end of the template (before any authority/lineage closing section)

**Section title:** `## Performance scorecard reporting`

**Section content:**

```
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

\`\`\`
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
\`\`\`

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
```

---

## Update 2 — `docs/00_authority/prompts/TWEAK_PASS.md`

### Add a new section at an appropriate place near the end of the template

**Section title:** `## Performance scorecard reporting`

**Section content:**

```
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

\`\`\`
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
\`\`\`

### Hard refusal

If the tweak pass introduces a new Red unit (e.g. a route's LCP regresses below tolerance, or a route's bundle now exceeds its class cap), do NOT close the pass. Investigate and revert or rework the offending change.

### Authority

This section operates under the same authority chain as the equivalent section in PHASE_RUNNER.md.
```

---

## Update 3 — `docs/00_authority/prompts/VERIFY_AND_CLOSE.md`

### Add a new step in the close-out workflow

**Where to add:** as a step before the final commit and CONVERSION_FINDINGS update. The new step is "Run full scorecard" and it precedes the journal update so the scorecard results are recorded in the journal entry.

**New step content:**

```
### Run full performance scorecard

Before closing the session, run a full scorecard across all four layers. This is the session-level performance health check.

Steps:

1. Invoke `docs/00_authority/prompts/PERF_AUDIT.md` (full audit) OR perform the equivalent manual reasoning if the runner is not yet wired.
2. Capture the resulting scorecard.
3. Persist it to `docs/00_authority/scorecards/{timestamp}-{branch}-{sha}.{json,md}` and update `docs/00_authority/scorecards/LATEST.json`.
4. Include the scorecard summary in the session close-out report.
5. Compare to the previous session's scorecard. Note any deltas — improvements, regressions, no-change.

### Include in CONVERSION_FINDINGS entry

The CONVERSION_FINDINGS entry for this session MUST include a scorecard summary in the canonical format:

\`\`\`
Session scorecard:
  Application Layer: {band}
  Database Layer:    {band}
  Data Layer:        {band}
  Infrastructure:    {band}

Overall product band: {weakest layer band}
Red units: {count} ({list})
Net change from previous session: {summary}
\`\`\`

### Refusal condition

If the scorecard reveals new Red units that were not addressed during the session, do NOT close cleanly. Surface the Red units and recommend a remediation phase before the next session begins.

The session may close with Amber units present (these go to the remediation queue), but Red units must either be remediated within the session or explicitly accepted via a documented decision in DECISIONS.md.

### Authority

This step operates under the same authority chain as the equivalent sections in PHASE_RUNNER.md and TWEAK_PASS.md.
```

---

## How Kiro applies these updates

When the bundle is processed, for each of the three template files:

1. Read the existing template.
2. Identify an appropriate location near the end of the template, before any authority/lineage closing section.
3. Insert the new section verbatim.
4. Preserve all existing content.
5. Commit the updates alongside the rest of the bundle.

If any of the three template files have evolved since this bundle was authored and now have different structure, Kiro should integrate the new sections sensitively — preserving the new structure while adding the performance scorecard sections in the right conceptual place.

---

## Authority

These template updates operate under:
- `docs/00_authority/PERFORMANCE_DOCTRINE.md` (PD-1.0)
- `docs/00_authority/TEST_AND_TOLERANCE_FRAMEWORK.md` (TTF-1.0)
- `.kiro/steering/performance-discipline.md` (always-on steering)
- `.kiro/hooks/05-performance-compliance.kiro.hook` (enforcement)
