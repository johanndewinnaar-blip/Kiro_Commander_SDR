# CHANGELOG v1.3.1 — Lineage Closure Patch
**Date:** 2026-05-27
**Execution model:** Kiro + Git only. No app code, live AWS resources, real vendor integrations, n8n, external orchestration layer or custom Kiro powers were added.

## Summary

v1.3.1 closes the remaining lineage gaps identified by the v1.3.1 brief. It adds one new Kiro spec for baseline Spec #32 and appends source-cited EARS requirements to the affected existing specs.

## Work items

| Work item | Affected file(s) | Source | New EARS requirements |
|---:|---|---|---:|
| 1 | 43-strategy-layer-runtime-surface | Spec #32 | 24 |
| 2 | 20-commander-ai-core | Master Proposition §18 | 6 |
| 3 | 10-identity-intelligence | Master Proposition §17.1; Spec #18 | 7 |
| 4 | 11-control-coverage-editable-baselines | Master Proposition §11; Spec #70; Spec #71 | 5 |
| 5 | 04-data-model-canonical-entities | Master Technical Specification §11.1–§11.2 | 10 |
| 6 | 16-connector-framework | Master Technical Specification §12 | 4 |
| 7 | 09-asset-intelligence | Master Proposition §9 | 3 |
| 8 | 11-control-coverage-editable-baselines | Master Proposition §14 | 2 |
| 9 | 13-security-c2 | Master Proposition §6 | 6 |
| 10 | 29-phase2-testing-real-connectors | Master Technical Specification §2.5 | 11 |
| 11 | 13-security-c2 | Master Technical Specification §14 | 4 |
| 12 | 16-connector-framework | Master Proposition §12.5; Spec #06 | 5 |
| 13 | 27-push-governance-dry-run | Master Proposition §16.1 | 3 |
| 14 | 06-case-management | Master Technical Specification §6.3; Specs #58/#72 | 2 |
| 15 | 18-tenant-admin; 16-connector-framework; 36-rule-model-decision-governance-surface | Master Technical Specification §13 | 11 |
| 16 | 41-internal-risk-investigation-sub-lifecycle | Master Technical Specification §10.3; Master Proposition §26.3 | 3 |
| 17 | 41-internal-risk-investigation-sub-lifecycle | Master Proposition §26.1–§26.2 | 4 |

## Companion updates

- Updated `docs/00_authority/SPEC_COVERAGE_MATRIX.md`.
- Updated `docs/00_authority/CONVERSION_FINDINGS.md`.
- Updated `DECISIONS.md`.
- Updated `BUILD_SEQUENCE.md`.
- Updated version markers in `README.md`, `CONVERSION_REPORT.md` and `PACK_MANIFEST.md`.


## v1.3.2 amendment — Design Language Remediation

**Date:** 2026-05-27  
**Scope:** Spec 02 requirements amendment only. No implementation changes in this patch.

Diagnostic comparison of the current Spec 02 implementation against the authoritative baseline shell references (`commander-sdr-shell-v11-admin-navigation.html` and `commander-commercial-control-plane-shell-v3-admin-navigation.html`) revealed significant visual language divergence.

18 new EARS requirements appended to `.kiro/specs/02-design-system-ui-component-catalogue/requirements.md` covering:
- Typography (Bebas Neue display, Inter body, 13px base)
- Colour palette (exact navy #061936, gold #ffd21f, light content background for Operational App, dark for Control Plane)
- Chrome dimensions (68px top bar, 306px sidebar)
- Top bar composition (brand wordmark, navigation tabs, search input)
- Sidebar composition (gradient, expandable groups, gold scrollbar)
- Component patterns (page header, card, user identity)

Phase 2 implementation will follow separately.
