# Commander SDR Kiro Conversion Findings

**Pack version:** v1.1  
**Baseline inspected:** v2.6.2  
**Conversion date:** 2026-05-27  
**Status:** v1.1 remediation applied; no application code generated.

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


## v1.1 remediation applied

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

Bumped the corrected conversion pack to v1.1 and prepared the v1.1 zip output.

## v1.2 remediation applied

- Phase 1 completeness and validity audit created at `docs/00_authority/V1_2_COMPLETENESS_AUDIT.md`.
- Added first-class Kiro specs for missing or under-represented baseline capabilities: drift/rule engine, platform security, rule/model/decision governance, mission objective binding, Commercial Control Plane UI, Pre-Warned/Protected/Novel classification, Inverse Discovery Loop, Internal Risk Investigation Sub-Lifecycle and Universal Search.
- Added master inventory EARS enumerations for twelve case types, eight signal purposes, ten analytical engines, six workspaces, eleven personas, five authority overlays, three application boundaries, four intelligence streams, four connector classes and OODA dashboard family.
- Strengthened surface specs #65-#70 coverage with named surface/panel/view requirements.
- Added tenant, connector and detection model lifecycle requirements from Master Technical Specification §13.
- Added Phase 2 vendor/API enumeration from the archived API specification set.
- Preserved AgentCore as evaluation candidate only.
- Added `docs/00_authority/SPEC_COVERAGE_MATRIX.md` and root `CHANGELOG_v1_2.md`.
- Recorded Spec #07 register/file inconsistency in `DECISIONS.md` and preserved both Drift/Rule Engine and Universal Search coverage.

## v1.3 remediation applied

v1.3 addresses the narrow remediation brief finding that sixteen existing Kiro specs were marked `full` in v1.2 without substantive baseline-depth edits. No new Kiro specs were added and no repository restructuring was performed.

- `00-programme-foundation/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #01 AI Build Agent Workflow, Spec #18 Unified Identity Architecture / register mismatch noted, Spec #56 Shell Reference vs Build Authority Doctrine.
- `02-design-system-ui-component-catalogue/requirements.md` deepened with 24 v1.3 EARS requirements sourced from: Spec #11a UI/UX Design System, Spec #11b Workspace & Dashboard Composition, Spec #41 Military-Intelligence UI Doctrine, Spec #43 Graph/Gauge/Overlay System, Spec #53 Shell UI Usability Correction.
- `03-seed-data-and-test-fixtures/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #05 Data Connector Normalisation, Spec #12 SDR Normalisation Strategy, Spec #46 Canonical Terminology, Spec #61 Universal Security Signal Connector Contract.
- `04-data-model-canonical-entities/requirements.md` deepened with 22 v1.3 EARS requirements sourced from: Spec #03 Backend/API Architecture, Spec #05 Data Connector Normalisation, Spec #11b Workspace & Dashboard Composition, Spec #15 SIEM/SOAR Rule Generation, Spec #18 Unified Identity Architecture, Spec #20 Coordinated Push Group Schema.
- `07-vulnerability-management/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #16 Performance/Scaling source-file mismatch noted, Spec #28 Strategic and Tactical Priority Framework, Spec #29 Universal Risk Object and Case Binding, Spec #60 Internal/External Attack Surface Framework, Spec #74 Context-Aware Drift Prioritisation Matrix.
- `12-architecture-topology/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #21 BAS Connector Integration Contract, Spec #22 Architecture Intelligence Engine, Spec #33 Multi-Domain Fusion Map, Spec #43 Graph/Gauge/Overlay System, Spec #65 External Operating Picture Surface, Spec #66 Internal Operating Picture Surface.
- `17-mock-connectors/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #05 Data Connector Normalisation, Spec #09 Connector Architecture, Spec #24 Connector API Reference Framework, Spec #61 Universal Security Signal Connector Contract, Spec #62 Verdict Semantics.
- `20-commander-ai-core/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #13 Commander AI Architecture & Grounding Rules, Spec #26a Closed-Loop Email & Case Communication Lifecycle, Spec #34 Mission Control / Pulse source-file mismatch noted, Spec #59 Intelligence Layer Architecture, Spec #62 Verdict Semantics.
- `23-ciso-dashboard/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #42 Domain Security Dashboards, Spec #65 External Operating Picture Surface, Spec #66 Internal Operating Picture Surface, Spec #67 OODA Dashboard Family, Spec #73 Silent Defence Reporting, Spec #74 Context-Aware Drift Prioritisation Matrix.
- `24-security-c2-p0-war-room/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #40 P0 Zero-Day Priority Override, Spec #44 P0 Zero-Day War Room UI, Spec #58 Security OODA Loop, Spec #65 External Operating Picture Surface, Spec #66 Internal Operating Picture Surface, Spec #67 OODA Dashboard Family.
- `25-email-case-communication/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #08 Case Management Workflow, Spec #26 Case Communication and Broadcast Channel, Spec #26a Closed-Loop Email Case Communication Lifecycle, Spec #49 Admin Control Surface Information Architecture.
- `28-audit-trail/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #27 Shared Responsibility Profile & Configuration Governance, Spec #30 Universal Validation / Closure / Reopening, Spec #48 Audit Event Framework source-file mismatch noted, Spec #62 Verdict Semantics.
- `30-phase3-pilot-production-hardening/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #16 Performance/Scaling, Spec #31 Routing Model and Team Affinity, Spec #44 P0 War Room UI, Spec #55 Baseline Configuration Framework, Spec #61 Universal Security Signal Connector Contract, Spec #73 Silent Defence Reporting.
- `31-devops-local-aws-alignment/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #03 Backend/API Architecture, Spec #04 Frontend Architecture, Spec #06 Worker and Scheduling, Spec #16 Performance/Scaling and Operational.
- `32-platform-security-hardening/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #02 DevOps/Environments/CI-CD, Spec #19 Full RBAC Permission Matrix, Spec #25 Trust Boundary & Third-Party Intelligence, Spec #27 Shared Responsibility Profile & Configuration Governance, Spec #48 Audit Event Framework, Spec #50 RBAC/Entitlement/Feature Flag/Menu Visibility.
- `33-observability-tool-health/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #06 Worker and Scheduling, Spec #16 Performance/Scaling/Operational, Spec #23 Security Tool Intelligence, Spec #49 Admin Control Surface Information Architecture, Spec #61 Universal Security Signal Connector Contract.

## v1.3.1 lineage closure applied

- Work Item 1 — added `.kiro/specs/43-strategy-layer-runtime-surface/` for baseline Spec #32.
- Work Item 2 — deepened `20-commander-ai-core` with Commander AI four modes and BYOM requirements.
- Work Item 3 — deepened `10-identity-intelligence` with CHAIN model, group intelligence, investigation profile and watchlist requirements.
- Work Item 4 and 8 — deepened `11-control-coverage-editable-baselines` with coverage outputs and compliance mapping requirements.
- Work Item 5 — deepened `04-data-model-canonical-entities` with data classification and residency requirements.
- Work Item 6, 12 and connector lifecycle parts of 15 — deepened `16-connector-framework` with inbound/outbound integration, ingestion tiers and connector lifecycle requirements.
- Work Item 7 — deepened `09-asset-intelligence` with ephemeral asset, attack-surface auto-positioning and extensible cartography requirements.
- Work Item 9 and 11 — deepened `13-security-c2` with CTEM stage and conformance requirements.
- Work Item 10 — deepened `29-phase2-testing-real-connectors` with Tier 1 connector schedule requirements.
- Work Item 13 — deepened `27-push-governance-dry-run` with bidirectional SIEM/SOAR flow requirements.
- Work Item 14 — deepened `06-case-management` with v2.6 risk object type requirements.
- Work Item 15 — deepened `18-tenant-admin`, `16-connector-framework` and `36-rule-model-decision-governance-surface` with lifecycle requirements.
- Work Item 16 and 17 — deepened `41-internal-risk-investigation-sub-lifecycle` with jurisdictional configuration and insider-risk boundary prohibitions.
- Updated SPEC_COVERAGE_MATRIX, DECISIONS, BUILD_SEQUENCE and pack version markers to v1.3.1.
- Execution posture confirmed as Kiro + Git only; no external orchestration layer, custom Kiro powers, app code, live AWS resources or real vendor integrations were added.
