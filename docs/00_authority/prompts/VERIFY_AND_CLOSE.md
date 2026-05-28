# Verify and Close

End-of-session verification. Perform all of the following:

1. **Run the full test suite** from repo root. Report total test count and confirm zero regressions.
2. **Confirm working copy is clean** (`git status` shows nothing to commit).
3. **Confirm HEAD matches origin/main** (or the working branch is pushed and synced).
4. **Update `docs/00_authority/CONVERSION_FINDINGS.md`** with a new dated entry containing:
   - Specs/phases completed this session.
   - Commit hashes for each significant change.
   - Total test count at close.
   - Decisions recorded (if any).
   - Open items for next session, in priority order.
5. **Commit the CONVERSION_FINDINGS update** with message: `Session close-out: <brief summary>`.
6. **Push** to origin.
7. **Report final status**: branch, HEAD, test count, clean confirmation.

Do not start new work after this template is invoked.
