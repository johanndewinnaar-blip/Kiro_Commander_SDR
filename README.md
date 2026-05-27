# Commander SDR Kiro Programme Repository Pack

**Pack:** Commander SDR Kiro Programme Pack v1.3.1  
**Baseline source:** Commander SDR Final Baseline Document Pack v2.6.2  
**Status:** v1.3.1 lineage closure applied; no application code generated.
**Generated:** 2026-05-27

This repository pack converts the Commander SDR baseline into a Kiro-ready, AWS-aligned, full-journey product build programme.

This is **not** an MVP pack. Commander SDR is treated as a complete product programme from day one. The whole journey is committed into the repository structure, steering, Kiro specs, build packs, prompt library, roadmap and testing schedule. Implementation is staged through product v1.1, v1.2, v1.3 and onward.

## Non-negotiable constraints

- Do not write application code until this pack has been validated.
- Do not create live AWS resources from this pack.
- Do not create real vendor integrations yet.
- Do not use n8n.
- Do not create custom Kiro powers during initial conversion.
- Do not allow external powers, MCP servers or generated material to override Commander authority.
- Commander AI is core from product v1.1 onward.
- AWS is the preferred target cloud; local-first development remains mandatory.

## First read sequence

1. `AGENTS.md`
2. `KIRO_ONBOARDING.md`
3. `docs/00_authority/CONVERSION_FINDINGS.md`
4. `docs/00_authority/AUTHORITY_MODEL.md`
5. `BUILD_SEQUENCE.md`
6. `BUILD_VERSION_ROADMAP.md`
7. `.kiro/steering/product.md`
8. `.kiro/steering/tech.md`
9. `.kiro/steering/structure.md`
10. `.kiro/specs/00-programme-foundation/requirements.md`

## Repository map

| Path | Purpose |
|---|---|
| `.kiro/steering/` | Persistent Kiro workspace steering and Commander doctrine. |
| `.kiro/specs/` | Kiro feature specs, each with requirements, design and tasks. |
| `.kiro/hooks/` | Hook creation prompts and guardrail hook references. |
| `docs/00_authority/` | Authority, precedence, conversion findings and source copies. |
| `docs/01_product/` | Product proposition and product conversion notes. |
| `docs/02_architecture/` | Architecture source documents and AWS alignment. |
| `docs/03_data_model/` | Canonical entity and data model planning. |
| `docs/04_build_packs/` | Build-pack execution files generated from baseline domains. |
| `docs/05_design_reference/` | Design doctrine and passive inspiration. |
| `docs/06_ui_build_reference/` | Active UI shell, route registry and page schedule. |
| `docs/07_prompt_library/` | Copy-paste prompts for Kiro execution and review. |
| `docs/08_phase_2_testing/` | Testing schedule and real-connector readiness plan. |
| `docs/99_source_archive/` | Full source baseline archive. |
| `apps/`, `packages/`, `infra/`, `scripts/`, `analytics/`, `tests/` | Future implementation folders only; no app code is present yet. |

## Current status

This pack is ready for Kiro review and spec refinement. The first Kiro execution should validate authority, steering and build sequence before any code generation.


## v1.3 remediation summary

This v1.3 pack corrects repo scaffold drift, adds per-spec baseline traceability, strengthens domain-specific EARS requirements, adds v2.6 doctrine steering, adds a doctrinal-assertions hook recipe, adds a Commander glossary and treats AWS Bedrock/AgentCore as evaluation-only. It remains a preparation pack: no app code, live AWS resources, real vendor integrations, billing, n8n or custom Kiro powers are included.

## v1.3 remediation status

v1.3 applies no-loss remediation: completeness audit, missing spec coverage, master inventory EARS enumeration, surface detail enumeration, coverage matrix, changelog, and AgentCore candidate-only clarification. This remains a Kiro pack and does not author application code.


## v1.3.1 lineage closure summary

v1.3.1 adds the missing mandatory Strategy Layer Runtime Surface Kiro spec for baseline Spec #32 and appends lineage-closure EARS requirements across the affected existing Kiro specs. Execution is constrained to Kiro + Git only; no application code, live AWS resources, real vendor integrations, n8n, external orchestration layer or custom Kiro powers are included.
