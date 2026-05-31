---
inclusion: always
---

# Execution Discipline Steering

Standing rules for all build execution in this programme. These apply regardless of whether a prompt template is used.

## Token architecture

- All UI work uses the three-layer token system: primitive → semantic → component.
- Zero hardcoded colour, spacing, radius, or typography values in component or page code. Ever.
- Tweak passes propagate at the token/semantic level. If a value should be global, change the token — never patch individual pages with the same literal.
- Charts use `--data-*` semantic tokens exclusively. No literal hex values in chart specifications.

## Testing

- Tests before commit. Run the full suite from repo root. Zero regressions tolerated.
- New logic requires new tests. Untested logic does not ship.

## Context-limit behaviour

- On context-limit approach: commit all complete, tested work and stop cleanly with a status report.
- Never leave half-built or uncommitted work. Partial progress that passes tests is acceptable; broken state is not.

## UI verification

- At the end of any phase or pass that changes a UI surface: run the dev server and provide the local URL (typically `http://localhost:3000`).

## Agent mode

- Main-agent execution by default. Sub-agents only when explicitly requested by the owner.
- Follow the authority read order in AGENTS.md before any change.
- If a hook or guardrail refuses an action, stop and report. Do not work around it.

## Commit discipline

- Commit messages are descriptive and reference the spec/phase/pass.
- One logical change per commit where practical.
- Push at session end or when a coherent unit of work is complete.

## Data-layer completion

- Data-layer build units are not "done" until their DATA_DICTIONARY.md entry exists.
- An entity in `packages/contracts/src/entities` or `packages/db/src/schema` with no corresponding DATA_DICTIONARY.md entry = INCOMPLETE.
- The `data-dictionary-generation.kiro.hook` fires on contract/schema edits to maintain the dictionary mechanically.
- ARCH-005 conformance assertion enforces this via the core testing pipeline.

## Build-stream sequencing (Foundational vs Team 2)

- A unit tagged **'Team 2'** in `REBASELINED_BUILD_SEQUENCE.md` MUST NOT be built until `USE_CASE_SCHEDULE.md` and `PAGE_INVENTORY.md` exist AND `PAGE_INVENTORY.md` contains an entry for that unit.
- Only **'Foundational'** units are buildable now.
- Building a Team 2 unit early is a sequencing violation.
- ARCH-006 conformance assertion enforces this via the core testing pipeline (mechanical file-existence + grep check).

## Build-readiness state machine

`REBASELINED_BUILD_SEQUENCE.md` is a **queryable readiness state machine**, not a static list. Every unit carries a computed `Status`:

- **BLOCKED** — has unresolved OPEN ARCH-DEBT in its chain, or dependency units not yet DONE. Not buildable.
- **READY** — all chain debt RESOLVED and all dependency units DONE. Buildable now.
- **DONE** — built and committed.

**Build only from READY.** Building a BLOCKED unit is a sequencing violation, backstopped mechanically by ARCH-007 (Blocking-Debt Prerequisite) in the conformance registry.

**Status computation (mechanical):** a unit is READY iff every dependency unit is DONE and every ARCH-DEBT mapped to the unit or its dependencies is RESOLVED. Otherwise BLOCKED. A unit's own resolving debt (the debt it exists to close) does not self-block it. Team 2 units are additionally gated by ARCH-006.

**Recompute-on-resolution rule:** when an ARCH-DEBT flips to RESOLVED, or a unit flips to DONE, recompute the status of all dependent units (re-read dependency statuses + mapped debt statuses). Any dependent whose dependencies are now all DONE and chain debt now all RESOLVED flips BLOCKED→READY. The recompute is mechanical — never a guess.

### "What's next" query behaviour

When the owner asks **"what's next"** / **"what can I build"**, compute from the live `Status` values in `REBASELINED_BUILD_SEQUENCE.md` (never guess):

- **If the READY set is non-empty** → report:
  `Build packages READY: [units]. Blocked: [unit ← what blocks it].`
- **If the READY set is empty** → route to the debt:
  `No packages ready. N units BLOCKED by open debt [ARCH-DEBT-xxx]. Next action: resolve debt. Debt-resolution unit that unblocks the most: [unit].`

The query reads dependency-chain status + mapped ARCH-DEBT status; it does not infer readiness from anything else.

Authority: `DEC-build-readiness-state-machine` (DECISIONS.md); extends `DEC-build-stream-sequencing-enforced` (ARCH-006). Backstop: ARCH-007 in `.kiro/testing/conformance-registry.md`, auto-run via post-task-review.

