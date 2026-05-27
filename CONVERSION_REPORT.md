# Commander SDR Kiro Conversion Findings

**Pack version:** v1.3.1  
**Baseline inspected:** v2.6.2  
**Conversion date:** 2026-05-27
**Status:** v1.3.1 lineage closure applied; no application code generated.

## 1. Uploaded baseline inventory

The uploaded baseline pack contains:

| Area | Count / finding |
|---|---:|
| Total files inspected | 117 |
| Markdown documents | 96 |
| Child specification markdown files | 77 |
| Vendor/API DOCX drafts | 19 |
| HTML UI shell references | 2 |
| Feature registry | 1 |

## 2. Authoritative source findings

The baseline already contains a strong authority model:

1. `docs/00_master/00_AUTHORITY_AND_PRECEDENCE_v2_6.md` defines tiered precedence.
2. `CURRENT_BASELINE_MANIFEST_v2_6.md` declares the pack inventory and current baseline tag `v2.6.2`.
3. `AGENTS.md` gives binding agent read sequence, stale-document warnings and doctrinal constraints.
4. `MEMORY.md` is explicitly context only, not source of truth.
5. `docs/feature_registry/SDR_Feature_Registry_FR001_v1_0.md` is the feature inventory/control source.
6. The active HTML shell files are design references only, not feature-authority documents.

## 3. Product and doctrine findings

The product baseline is not a dashboard MVP. It is a full Security Command and Control programme containing:

- Security C2 category framing.
- Security Drift Response as the operational discipline.
- Commander as the platform brand.
- Security OODA loop surfaces.
- Internal and external operating pictures.
- Security signal connector contract.
- Verdict semantics.
- Direction Boards.
- Case management, email communication and lifecycle closure.
- Vulnerability and exposure management.
- Asset, identity, control coverage and architecture intelligence.
- Commander AI as a governed product capability.

## 4. Gap converted by this pack

The baseline is rich but not yet laid out as a Kiro execution repository. This conversion pack adds:

- Root Kiro onboarding, build sequence, change control and decisions files.
- Workspace steering files under `.kiro/steering/`.
- Multiple Kiro feature specs under `.kiro/specs/`, each with `requirements.md`, `design.md`, and `tasks.md`.
- Build packs under `docs/04_build_packs/`.
- Prompt library under `docs/07_prompt_library/`.
- Phase 2 testing schedule under `docs/08_phase_2_testing/`.
- Local-first / AWS-aligned skeleton folders for future code without writing code now.


## v1.3 remediation applied

### P0-0 — Repo scaffold drift corrected

Replaced v1.0 scaffold drift with baseline-aligned locations: `apps/api/`, `packages/contracts/`, `packages/db/`, `packages/rules/`, `packages/workers/`, `tests/fixtures/`, `infra/terraform/`, `infra/docker/`, `infra/github-actions/`, `scripts/python/` and `analytics/`. Removed `services/api/`, `packages/contracts and packages/db/`, `packages/rules/`, `tests/fixtures/` and `infra/terraform/`.

### P0-1 — Missing doctrinal assertions added

Added enforceable EARS requirements for closed-loop case model, SOC boundary, four-stream intelligence integrity, surface attribution and verdict semantics/disposition across relevant Kiro specs.

### P0-2 — Domain-specific requirements added

Supplemented generic process requirements with baseline-derived EARS requirements across all 34 Kiro specs. Critical-tier specs received deeper domain-specific coverage.

### P0-3 — Per-spec baseline cross-references added

Added `Translated from baseline` lineage to every Kiro `requirements.md` file.

### P1-1 — v2.6 doctrine steering added

Created `.kiro/steering/commander-v2-6-doctrine.md` covering Specs #56–#62 with `inclusion: always`.

### P1-2 — Build sequence and roadmap audited

Updated `BUILD_SEQUENCE.md` and `BUILD_VERSION_ROADMAP.md` to enforce prerequisite chains, Commander AI core status, Phase 2/Phase 3 sequencing and the distinction between pack version and product version.

### P1-3 — Critical-tier designs and tasks strengthened

Replaced generic boilerplate in the design and task files for data model, case management, connector framework and Security C2 with domain-specific architecture and planning tasks.

### P1-4 — Doctrinal assertions hook recipe added

Created `.kiro/hooks/04-doctrinal-assertions-check-hook.md` and updated the hooks README. The file is a hook recipe / guardrail prompt pending Kiro enablement.

### P1-5 — AgentCore reference softened

Updated the AWS/Bedrock/AgentCore spec to treat AgentCore as a candidate runtime only. Added a decision placeholder to `DECISIONS.md`.

### P2-1 — Glossary added

Created `docs/00_authority/GLOSSARY.md` with Commander-specific terms and baseline references.

### P2-2 — Steering files tightened

Strengthened doctrine, authority/preference and build-pack discipline steering files.

### P2-4 — Source archive integrity verified

Confirmed the archived baseline contains 117 files, includes the v2.6.2 stale document notice in `AGENTS.md`, includes `RELEASE_NOTES_v2_6_2.md`, and retains `docs/01_active_build/Commander_SDR_AI_Build_Playbooks_v1_7.md` for lineage.

### P2-5 — Pack version bumped

Bumped the corrected conversion pack to v1.3 and prepared the v1.3 zip output.

## v1.3 remediation status

v1.3 applies no-loss remediation: completeness audit, missing spec coverage, master inventory EARS enumeration, surface detail enumeration, coverage matrix, changelog, and AgentCore candidate-only clarification. This remains a Kiro pack and does not author application code.


## v1.3.1 lineage closure summary

v1.3.1 adds the missing mandatory Strategy Layer Runtime Surface Kiro spec for baseline Spec #32 and appends lineage-closure EARS requirements across the affected existing Kiro specs. Execution is constrained to Kiro + Git only; no application code, live AWS resources, real vendor integrations, n8n, external orchestration layer or custom Kiro powers are included.
