---
inclusion: always
---
# Structure Steering — Commander SDR

Use this structure:

- Root programme controls: README, AGENTS, build sequence, roadmap, change control, decisions.
- `.kiro/steering/`: persistent Kiro instructions.
- `.kiro/specs/`: Kiro specs by product/build domain.
- `.kiro/hooks/`: hook prompts and guardrails.
- `docs/00_authority/`: source authority and conversion authority.
- `docs/01_product/`: proposition and product model.
- `docs/02_architecture/`: architecture and AWS alignment.
- `docs/03_data_model/`: canonical entity and schema planning.
- `docs/04_build_packs/`: executable build-pack layer.
- `docs/05_design_reference/`: passive visual/design references.
- `docs/06_ui_build_reference/`: active route/page/navigation authority.
- `docs/07_prompt_library/`: prompts for Kiro execution and review.
- `docs/08_phase_2_testing/`: Phase 2 testing and connector readiness.
- `docs/99_source_archive/`: immutable source archive.

Do not move source archive files into active authority without a decision record.
