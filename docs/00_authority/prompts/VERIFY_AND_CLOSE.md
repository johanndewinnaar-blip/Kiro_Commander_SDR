# Verify and Close

End-of-session verification. Perform all of the following:

1. **Run the full test suite** from repo root. Report total test count and confirm zero regressions.
2. **Confirm working copy is clean** (`git status` shows nothing to commit).
3. **Confirm HEAD matches origin/main** (or the working branch is pushed and synced).
4. **Run full performance scorecard**

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

```
Session scorecard:
  Application Layer: {band}
  Database Layer:    {band}
  Data Layer:        {band}
  Infrastructure:    {band}

Overall product band: {weakest layer band}
Red units: {count} ({list})
Net change from previous session: {summary}
```

### Refusal condition

If the scorecard reveals new Red units that were not addressed during the session, do NOT close cleanly. Surface the Red units and recommend a remediation phase before the next session begins.

The session may close with Amber units present (these go to the remediation queue), but Red units must either be remediated within the session or explicitly accepted via a documented decision in DECISIONS.md.

### Authority

This step operates under the same authority chain as the equivalent sections in PHASE_RUNNER.md and TWEAK_PASS.md.

5. **Update `docs/00_authority/CONVERSION_FINDINGS.md`** with a new dated entry containing:
   - Specs/phases completed this session.
   - Commit hashes for each significant change.
   - Total test count at close.
   - Decisions recorded (if any).
   - Open items for next session, in priority order.
6. **Commit the CONVERSION_FINDINGS update** with message: `Session close-out: <brief summary>`.
7. **Push** to origin.
8. **Report final status**: branch, HEAD, test count, clean confirmation.

Do not start new work after this template is invoked.
