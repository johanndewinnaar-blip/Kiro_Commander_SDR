# Daily Operating Loop — Commander SDR

This document defines the standard session workflow. Each step references a reusable prompt template in `docs/00_authority/prompts/`.

## 1. Start

**Template:** [`SESSION_START.md`](prompts/SESSION_START.md)

Pull from origin, read the latest CONVERSION_FINDINGS entry, and report: branch, HEAD, clean status, test count, open items, planned first task. Do not start work.

## 2. Scope

**Template:** [`SUB_PHASING.md`](prompts/SUB_PHASING.md)

If the next task is large (>20 tasks or multiple surfaces), propose a sub-phase split. Owner approves before execution begins. If the task is small or already scoped, skip this step.

## 3. Execute

**Template:** [`PHASE_RUNNER.md`](prompts/PHASE_RUNNER.md) (for spec phases) or [`TWEAK_PASS.md`](prompts/TWEAK_PASS.md) (for polish/cosmetic passes)

Fill in the placeholders and send. The agent executes under full discipline: authority checks, tests, self-verification, clean commits, and progress reporting.

## 4. End

**Template:** [`VERIFY_AND_CLOSE.md`](prompts/VERIFY_AND_CLOSE.md)

Run the full test suite, confirm clean state, update CONVERSION_FINDINGS with a dated close-out entry, push, and report final status. No new work after this step.

---

## Notes

- Multiple Execute cycles may occur in a single session (e.g. Tweak Pass A then Phase Runner for Spec 06 Phase D).
- The loop is designed for single-session coherence. Multi-session work picks up from the CONVERSION_FINDINGS open-items list.
- All templates respect `.kiro/steering/execution-discipline.md` and `AGENTS.md`.
