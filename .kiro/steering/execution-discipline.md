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

