# Prompt Library — Commander SDR

These templates are **paste-and-go**. They encode the execution discipline, authority checks, and reporting expectations so that session prompts can be short and consistent.

## How to use

1. Copy the relevant template into the Kiro chat.
2. Fill in any `{{PLACEHOLDER}}` values (spec name, phase, scope bullets, etc.).
3. Send. The agent will follow the encoded discipline without needing ad-hoc instructions.

## Templates

| Template | Purpose |
|----------|---------|
| `SESSION_START.md` | Begin-of-session orientation and status report |
| `PHASE_RUNNER.md` | Execute a specific phase of a spec |
| `TWEAK_PASS.md` | Token/layout/component polish pass |
| `SUB_PHASING.md` | Propose sub-phase split for a large spec |
| `VERIFY_AND_CLOSE.md` | End-of-session verification and close-out |

## Principles

- Templates reference `.kiro/steering/` and `AGENTS.md` — they do not replace them.
- Owner only fills placeholders; discipline is baked in.
- If a template conflicts with steering or AGENTS.md, steering wins.
- Templates evolve as the programme matures. Changes require a commit message referencing the update.
