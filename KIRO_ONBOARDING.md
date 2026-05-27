# Kiro Onboarding — Commander SDR

## Objective

Open this repository in Kiro and use it as a controlled Commander SDR build programme workspace.

## What Kiro should do first

1. Read `AGENTS.md`.
2. Read `.kiro/steering/product.md`, `.kiro/steering/tech.md`, `.kiro/steering/structure.md`.
3. Read `docs/00_authority/AUTHORITY_MODEL.md`.
4. Read `BUILD_SEQUENCE.md`.
5. Read `.kiro/specs/00-programme-foundation/requirements.md`, `design.md` and `tasks.md`.
6. Validate that all required directories exist.
7. Confirm no application code has been generated.

## Kiro execution model

Use Kiro specs for structured implementation planning. Each domain is represented under `.kiro/specs/<domain>/` using:

- `requirements.md`
- `design.md`
- `tasks.md`

Use build packs under `docs/04_build_packs/` as the work-package layer that tells Kiro which specs and source docs to consume for a versioned slice.

## Initial Kiro mode

For the initial conversion review, use **planning and validation only**. Do not click Run All Tasks on code-producing specs until the owner approves the pack.

## Recommended first action in Kiro

Paste the prompt from `docs/07_prompt_library/00_FIRST_KIRO_EXECUTION_PROMPT.md`.

## What success looks like

Kiro should be able to explain:

- Commander doctrine and boundaries.
- Why this is not an MVP.
- Which specs exist and what each owns.
- Which build packs start v1.1.
- Which files may change during validation.
- Which actions are prohibited until Phase 2 or Phase 3.
