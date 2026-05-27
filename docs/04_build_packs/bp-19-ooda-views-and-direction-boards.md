# BP-19 — OODA Views and Direction Boards

**Target version:** v1.4  
**Status:** Planned / Kiro-ready  
**Type:** Build pack, not application code.

## Purpose

Deliver the Commander SDR work slice for **OODA Views and Direction Boards** while preserving no-MVP full-journey doctrine.

## Source authority

- `AGENTS.md`
- `docs/00_authority/AUTHORITY_MODEL.md`
- `docs/00_authority/source_00_AUTHORITY_AND_PRECEDENCE_v2_6.md`
- `docs/00_authority/source_CURRENT_BASELINE_MANIFEST_v2_6.md`
- Relevant source docs in `docs/99_source_archive/baseline_v2_6_2/`

## Owning Kiro specs

- `.kiro/specs/14-ooda-views`
- `.kiro/specs/15-direction-boards`

## Scope in

- Validate source authority for this build slice.
- Confirm routes/pages/data objects/features governed by this slice.
- Define implementation sequence without writing code during pack validation.
- Define synthetic data and tests required.
- Preserve Commander AI, AWS alignment and local-first constraints where relevant.

## Scope out

- Live AWS resources.
- Real vendor API credentials or production integrations.
- Production billing.
- n8n.
- Custom Kiro powers during initial conversion.
- Undocumented authority changes.

## Execution steps

1. Read the owning Kiro specs.
2. Read relevant source baseline docs.
3. Confirm no authority conflict.
4. Produce or refine the implementation task breakdown.
5. Confirm fixture and test requirements.
6. Stop for owner approval before application code generation.

## Acceptance checks

- The build pack maps to at least one Kiro spec.
- The build pack declares its version target.
- The build pack preserves Commander no-MVP doctrine.
- The build pack has clear stop conditions.
- The build pack does not authorise live infrastructure or real connectors prematurely.

## Stop conditions

Stop if Kiro proposes to remove committed full-journey scope, create live AWS resources, create real connector calls, create billing functionality, or override source authority.
