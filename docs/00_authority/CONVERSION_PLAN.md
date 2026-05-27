# Conversion Plan — Commander SDR Baseline to Kiro Programme Pack

## Objective

Convert Commander SDR baseline v2.6.2 into a Kiro-ready, AWS-aligned, no-MVP, versioned product build repository.

## Conversion model

1. Preserve original baseline under `docs/99_source_archive/`.
2. Promote source authority copies into `docs/00_authority/`, `docs/01_product/`, `docs/02_architecture/`, `docs/03_data_model/`, `docs/05_design_reference/`, `docs/06_ui_build_reference/`.
3. Create root programme controls.
4. Create Kiro steering files.
5. Create Kiro specs per major product/build domain.
6. Create build packs mapped to Kiro specs and versions.
7. Create prompt library.
8. Create Phase 2 testing/readiness schedule.
9. Leave application folders empty except READMEs.
10. Zip the pack for import into a repo/Kiro workspace.

## Validation gate

The first Kiro run must validate this pack. Code generation starts only after owner approval.
