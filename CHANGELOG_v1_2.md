# CHANGELOG v1.2 — Commander SDR Kiro Pack

**Date:** 2026-05-27
**Source:** v1.1 remediation pack plus Commander SDR baseline v2.6.2 archive.

## Added

- `docs/00_authority/V1_2_COMPLETENESS_AUDIT.md`.
- `docs/00_authority/SPEC_COVERAGE_MATRIX.md`.
- `.kiro/specs/34-drift-and-rule-engine/`.
- `.kiro/specs/35-platform-security-and-hardening/`.
- `.kiro/specs/36-rule-model-decision-governance-surface/`.
- `.kiro/specs/37-mission-objective-binding-model/`.
- `.kiro/specs/38-commercial-control-plane-ui/`.
- `.kiro/specs/39-pre-warned-protected-novel-classification/`.
- `.kiro/specs/40-inverse-discovery-loop/`.
- `.kiro/specs/41-internal-risk-investigation-sub-lifecycle/`.
- `.kiro/specs/42-universal-search/`.

## Strengthened

- Master inventory enumerations added as EARS requirements.
- v2.6 surface specifications enumerated by named views/panels/widgets.
- Phase 2 vendor/API readiness scope enumerated from archived API specs.
- Tenant, connector and detection model lifecycle requirements added.
- AgentCore candidate-only wording reinforced.

## Decisions recorded

- Spec #07 register/file inconsistency: preserve both Drift/Rule Engine and Universal Search.
- AgentCore remains evaluation-only until owner decision.

## Constraints preserved

- No application code generated.
- No live AWS resources created.
- No real vendor integrations created.
- No n8n or custom Kiro powers introduced.