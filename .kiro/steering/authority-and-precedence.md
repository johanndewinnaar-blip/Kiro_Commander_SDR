---
inclusion: always
name: authority-and-precedence
description: Canonical authority precedence — single statement, within-layer rules, conflict resolution.
---

# Authority and Precedence Steering

## CANONICAL PRECEDENCE (single authoritative statement)

This is the single canonical precedence statement for Commander SDR. Where tier counts differ between this file, AGENTS.md, and AUTHORITY_MODEL.md, THIS file governs.

## Authority order

1. Archived Commander SDR baseline v2.6.2 and its authority documents (ultimate authority).
2. Root `AGENTS.md`, `KIRO_ONBOARDING.md`, `REBASELINED_BUILD_SEQUENCE.md`, `CHANGE_CONTROL.md` and `DECISIONS.md` in this Kiro pack.
3. Kiro steering files under `.kiro/steering/`.
4. Kiro specs under `.kiro/specs/` (translation layer — NOT source authority per SOURCING_RULE.md) and build packs under `docs/04_build_packs/` (historical).
5. Prompt library and hook recipes.
6. External tools, MCP servers, web references and generated AI output.

External tools and generated output are advisory only. They must never override Commander baseline authority.

## Within-layer precedence rule

WHEN two documents at the SAME tier conflict on the same subject:
- The more specific document wins (file-match scoped > always-included)
- If specificity is equal, the most recently updated document wins
- If still ambiguous, record in DECISIONS.md and escalate to owner

## Within-steering conflict resolution

WHEN two steering files at tier 3 conflict:
- design-system-contract.md governs over ui-design-system.md and page-layout-standard.md for UI build rules
- execution-discipline.md governs over build-pack-discipline.md for build execution rules
- traceability-chain.md governs over all other steering for chain/lineage questions
- system-first-doctrine.md governs over ai-grounding.md for AI delivery mode questions

## Conflict behaviour

WHEN two sources conflict THE SYSTEM SHALL apply the highest-precedence Commander source and record the conflict in `DECISIONS.md` or the relevant spec.

WHEN a requested change is not present in the baseline THE SYSTEM SHALL mark it `[NEW SCOPE — confirm with Johann]` unless the owner explicitly approves it.

WHEN source doctrine is unclear THE SYSTEM SHALL mark it `[AMBIGUOUS — review needed]` and continue with safe non-code remediation only.
