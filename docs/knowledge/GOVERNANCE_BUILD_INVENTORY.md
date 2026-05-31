# GOVERNANCE & BUILD ARTIFACT INVENTORY (Run 1 of 3)

**Status:** Inventory only — no mapping, no analysis, no recommendations.
**Date:** 30 May 2026
**Method:** Each artifact below was opened in this session; the title and category were taken from the file's actual content (typically line 1) per the locked sourcing-rule discipline. Where a file was only partially read, its inferred role is annotated.
**Scope:** Entire repository excluding `node_modules/`, `.git/`, `.next/`. The contaminated `docs/knowledge/_superseded/` directory is excluded by sourcing-rule.

**Note on Status column conventions:**
- *active* — referenced as current authority by AGENTS.md, root steering, or the precedence stack.
- *archived (immutable source)* — lives under `docs/99_source_archive/` and represents the v2.6.2 baseline; per `commander-doctrine.md` Assertion 7 these are retained for lineage only.
- *draft* — file marks itself draft, planning-only, partial, or "to be defined."
- *superseded* — explicitly replaced by a newer artifact (in-file note or by patch number).
- *void* — explicitly disallowed or blocked.
- *uncertain* — role plausible in two categories or status unclear from the file contents; the uncertainty is annotated, not omitted.

---

## 1. AUTHORITY — decision records, authority/precedence models

| Artifact | Location | Category | What it governs (one line) | Status |
|---|---|---|---|---|
| AGENTS.md (root) | `AGENTS.md` | AUTHORITY | Prime directive, authority read order, hard stops, binding doctrine for this Kiro pack | active |
| AUTHORITY_MODEL.md | `docs/00_authority/AUTHORITY_MODEL.md` | AUTHORITY | 8-tier precedence stack from baseline → external advisory output | active |
| Authority and Precedence Steering | `.kiro/steering/authority-and-precedence.md` | AUTHORITY | Restates 6-tier authority order and conflict behaviour for steering layer | active |
| DECISIONS.md (root) | `DECISIONS.md` | AUTHORITY | Programme-level decision register (DEC-001 … DEC-spec00-section3-blocked) | active |
| CHANGE_CONTROL.md (root) | `CHANGE_CONTROL.md` | AUTHORITY | CC-0…CC-5 change classes, required change-record format, forbidden silent changes | active |
| KIRO_ONBOARDING.md (root) | `KIRO_ONBOARDING.md` | AUTHORITY | First-read sequence and initial Kiro execution mode | active |
| README.md (root) | `README.md` | AUTHORITY | Pack identification, non-negotiable constraints, first read sequence | active |
| source_00_AUTHORITY_AND_PRECEDENCE_v2_6.md | `docs/00_authority/source_00_AUTHORITY_AND_PRECEDENCE_v2_6.md` | AUTHORITY | Baseline v2.6 authority hierarchy (copy of source) | active (source copy) |
| source_AGENTS_v2_6_2.md | `docs/00_authority/source_AGENTS_v2_6_2.md` | AUTHORITY | Baseline v2.6.2 agent authority (copy of source) | active (source copy) |
| source_CURRENT_BASELINE_MANIFEST_v2_6.md | `docs/00_authority/source_CURRENT_BASELINE_MANIFEST_v2_6.md` | AUTHORITY | v2.6 baseline file inventory (copy of source) | active (source copy) |
| source_00_SPECIFICATION_REGISTER_v2_6.md | `docs/00_authority/source_00_SPECIFICATION_REGISTER_v2_6.md` | AUTHORITY | v2.6 binding child specs register (copy of source) | active (source copy) |
| source_MEMORY_v2_6_1.md | `docs/00_authority/source_MEMORY_v2_6_1.md` | AUTHORITY | v2.6.1 baseline memory (copy of source) | active (source copy, advisory) |
| source_AUTHORITY_AND_PRECEDENCE (baseline) | `docs/99_source_archive/baseline_v2_6_2/docs/00_master/00_AUTHORITY_AND_PRECEDENCE_v2_6.md` | AUTHORITY | v2.6 baseline authority hierarchy (immutable original) | archived (immutable source) |
| source_SPECIFICATION_REGISTER (baseline) | `docs/99_source_archive/baseline_v2_6_2/docs/00_master/00_SPECIFICATION_REGISTER_v2_6.md` | AUTHORITY | v2.6 binding child specs register (immutable original) | archived (immutable source) |
| baseline AGENTS.md | `docs/99_source_archive/baseline_v2_6_2/AGENTS.md` | AUTHORITY | v2.6 baseline agent authority (immutable original) | archived (immutable source) |
| baseline MEMORY.md | `docs/99_source_archive/baseline_v2_6_2/MEMORY.md` | AUTHORITY | v2.6.1 baseline memory file (immutable original) | archived (immutable source) |
| CURRENT_BASELINE_MANIFEST_v2_6.md (baseline root) | `docs/99_source_archive/baseline_v2_6_2/CURRENT_BASELINE_MANIFEST_v2_6.md` | AUTHORITY | v2.6 baseline manifest (immutable original) | archived (immutable source) |
| CONVERSION_FINDINGS.md | `docs/00_authority/CONVERSION_FINDINGS.md` | AUTHORITY | v1.1 conversion findings; baseline source findings, authority observations | active |
| CONVERSION_PLAN.md | `docs/00_authority/CONVERSION_PLAN.md` | AUTHORITY | Conversion model and validation gate for the pack | active |
| CONVERSION_REPORT.md (root) | `CONVERSION_REPORT.md` | AUTHORITY | v1.3.1 baseline conversion findings report | active |
| INDEX.md (00_authority) | `docs/00_authority/INDEX.md` | AUTHORITY | Index card for 00_authority folder | active |
| GLOSSARY.md | `docs/00_authority/GLOSSARY.md` | AUTHORITY | Plain-English glossary for Kiro execution interpretation | active |
| Source Archive INDEX | `docs/99_source_archive/INDEX.md` | AUTHORITY | Index of immutable baseline archive | active |
| SOURCE_FILE_INVENTORY.md | `docs/99_source_archive/SOURCE_FILE_INVENTORY.md` | AUTHORITY | Inventory of baseline files (uncertain — could also count as authority registry) | active |
| Knowledge Workspace SOURCING_RULE.md | `docs/knowledge/SOURCING_RULE.md` | AUTHORITY | LOCKED binding sourcing rule for clean knowledge workspace | active |
| Knowledge Workspace README | `docs/knowledge/README.md` | AUTHORITY | Knowledge workspace overview and structure | active |
| BASELINE_SOURCE_INVENTORY.md (knowledge) | `docs/knowledge/BASELINE_SOURCE_INVENTORY.md` | AUTHORITY | Verified inventory of baseline #01–#75 + masters | active |
| INDEX.md (01_product, 02_architecture, 03_data_model, 04_build_packs, 05_design_reference, 06_ui_build_reference, 08_phase_2_testing) | each `docs/<n>/INDEX.md` | AUTHORITY (boundary index) | One-line folder index cards | active |
| Pack Manifest | `PACK_MANIFEST.md` | AUTHORITY | v1.3.1 file-list manifest (370 files) | active |

---

## 2. STANDARDS & CONTRACTS — design contract, conformance, layer doctrines, coding standards, steering

| Artifact | Location | Category | What it governs (one line) | Status |
|---|---|---|---|---|
| Design System Contract Steering | `.kiro/steering/design-system-contract.md` | STANDARDS — UI build rulebook (Tabler classes, badges, spacing, gold restriction, square corners) | active |
| Page Layout Standard Steering | `.kiro/steering/page-layout-standard.md` | STANDARDS — every page renders through `PageContainer`; documented exceptions | active |
| Execution Discipline Steering | `.kiro/steering/execution-discipline.md` | STANDARDS — token architecture, testing discipline, context-limit behaviour, commit discipline | active |
| Performance Discipline Steering | `.kiro/steering/performance-discipline.md` | STANDARDS — always-on standing rules from PD-1.0 (no Red units, workload class, tier discipline) | active |
| Build Pack Discipline Steering | `.kiro/steering/build-pack-discipline.md` | STANDARDS — no-MVP, prerequisite chain, version-staged commitment | active (also see Category 6) |
| Commander Doctrine Steering | `.kiro/steering/commander-doctrine.md` | STANDARDS — eleven doctrinal assertions (closed-loop, P0, three-app boundary, etc.) | active |
| Commander v2.6 Doctrine Steering | `.kiro/steering/commander-v2-6-doctrine.md` | STANDARDS — v2.6 specs #56–#62 doctrine (Shell-as-reference, Security C2, OODA, Intelligence Layer, Attack Surface, Connector Contract, Verdict Semantics) | active |
| Product Steering | `.kiro/steering/product.md` | STANDARDS — product framing constraints (no MVP / SIEM / SOAR / dashboard reductions) | active |
| Tech Steering | `.kiro/steering/tech.md` | STANDARDS — preferred cloud, technology posture, no-code-yet rule | active |
| Structure Steering | `.kiro/steering/structure.md` | STANDARDS — folder structure rules across the repo | active |
| AWS Alignment Steering | `.kiro/steering/aws-alignment.md` | STANDARDS — AWS evaluation areas; no live resources | active |
| AI Grounding Steering | `.kiro/steering/ai-grounding.md` | STANDARDS — Commander AI grounding, traceability, no-silent-write | active |
| PERFORMANCE_DOCTRINE.md (PD-1.0) | `docs/00_authority/PERFORMANCE_DOCTRINE.md` | STANDARDS — performance constitution; tier model; scorecard; always-on discipline | active |
| APPLICATION_LAYER_STRATEGY.md (ALS-1.0) | `docs/00_authority/APPLICATION_LAYER_STRATEGY.md` | STANDARDS — Application Layer doctrine; routes/components/bundles/runtime | active |
| DATABASE_LAYER_STRATEGY.md (DBL-1.0) | `docs/00_authority/DATABASE_LAYER_STRATEGY.md` | STANDARDS — Database Layer doctrine; schema, indexing, query plans | active |
| DATA_LAYER_STRATEGY.md (DL-1.0) | `docs/00_authority/DATA_LAYER_STRATEGY.md` | STANDARDS — Data Layer doctrine; ingestion, normalisation, queues, caches | active |
| INFRASTRUCTURE_LAYER_STRATEGY.md (IL-1.0) | `docs/00_authority/INFRASTRUCTURE_LAYER_STRATEGY.md` | STANDARDS — Infrastructure Layer doctrine; AWS topology, tiered T1/T2/T3 | active |
| TEST_AND_TOLERANCE_FRAMEWORK.md (TTF-1.0) | `docs/00_authority/TEST_AND_TOLERANCE_FRAMEWORK.md` | STANDARDS — measurement methodology, tolerance bands, scorecard runner spec | active |

---

## 3. UI GOVERNANCE — design system standard, Tabler standards, UI conformance assertions

| Artifact | Location | Category | What it governs (one line) | Status |
|---|---|---|---|---|
| UI Design System Steering | `.kiro/steering/ui-design-system.md` | UI GOVERNANCE — visual direction, navy/ink/gold palette, Command Centre as landing surface (note: file-match scoped to apps/web, packages/ui, docs/06_ui_build_reference) | active |
| Design System Contract Steering | `.kiro/steering/design-system-contract.md` | UI GOVERNANCE — exact Tabler-class build rulebook for all pages (also listed in Category 2) | active |
| Page Layout Standard Steering | `.kiro/steering/page-layout-standard.md` | UI GOVERNANCE — `PageContainer` contract and exceptions (also listed in Category 2) | active |
| DESIGN_SYSTEM.md (DS-1.0) | `docs/06_ui_build_reference/DESIGN_SYSTEM.md` | UI GOVERNANCE — DS-1.0 reconciled spec; tokens, Vega-Lite/Lucide/Inter/Bebas/JetBrains decisions | active (authoritative; supersedes ad-hoc styling per its own header) |
| ROUTE_REGISTRY_BASELINE.md | `docs/06_ui_build_reference/ROUTE_REGISTRY_BASELINE.md` | UI GOVERNANCE — planning route registry (route, surface, status, version) | draft (self-marked planning only) |
| UI_PAGE_SCHEDULE.md | `docs/06_ui_build_reference/UI_PAGE_SCHEDULE.md` | UI GOVERNANCE — page-by-page schedule (page, status, version, owning spec) | active |
| MOCKUP_INDEX.md | `docs/06_ui_build_reference/MOCKUP_INDEX.md` | UI GOVERNANCE — authoritative mockup → surface → mode → spec mapping | active |
| commander-sdr-shell-v11-admin-navigation.html | `docs/06_ui_build_reference/commander-sdr-shell-v11-admin-navigation.html` | UI GOVERNANCE — operational shell HTML reference (per Spec #48) | active reference (not feature authority) |
| commander-commercial-control-plane-shell-v3-admin-navigation.html | `docs/06_ui_build_reference/commander-commercial-control-plane-shell-v3-admin-navigation.html` | UI GOVERNANCE — control plane shell HTML reference (per Spec #48) | active reference (not feature authority) |
| source_47_Application_Route_and_Navigation_Register.md | `docs/06_ui_build_reference/source_47_Application_Route_and_Navigation_Register.md` | UI GOVERNANCE — route ownership and shell assignment (source copy) | active baseline (per file header) |
| source_48_Active_Shell_UI_Authority.md | `docs/06_ui_build_reference/source_48_Active_Shell_UI_Authority.md` | UI GOVERNANCE — which shell HTML files are build-authoritative (source copy) | active baseline (per file header) |
| source_54_Pre_Build_UI_Navigation_and_Route_Baseline_v2_5.md | `docs/06_ui_build_reference/source_54_Pre_Build_UI_Navigation_and_Route_Baseline_v2_5.md` | UI GOVERNANCE — final pre-build menu/route structure (source copy) | active pre-build authority (per file header) |
| INDEX.md (06_ui_build_reference) | `docs/06_ui_build_reference/INDEX.md` | UI GOVERNANCE — folder index | active |
| source_11a_UI_UX_Design_System_Spec.md | `docs/05_design_reference/source_11a_UI_UX_Design_System_Spec.md` | UI GOVERNANCE — baseline UI/UX design system source spec (copy) | archived (immutable source); referenced as design reference |
| source_41_Commander_SDR_Military_Intelligence_UI_Doctrine_Spec.md | `docs/05_design_reference/source_41_Commander_SDR_Military_Intelligence_UI_Doctrine_Spec.md` | UI GOVERNANCE — military-intelligence UI doctrine (source copy) | archived (immutable source) |
| INDEX.md (05_design_reference) | `docs/05_design_reference/INDEX.md` | UI GOVERNANCE — passive design references; not feature authority (own statement) | active |
| ui-design-inventory.md | `docs/ui-design-inventory.md` | UI GOVERNANCE — read-only DS-1.0 design inventory of `apps/web` and `packages/ui` tokens | active (self-marked READ-ONLY) |
| Mockups directory | `docs/06_ui_build_reference/mockups/` | UI GOVERNANCE — visual targets keyed in MOCKUP_INDEX.md (uncertain — folder contents not enumerated this run) | active reference set |

---

## 4. TESTING & QUALITY — testing pipeline, gates, score register, test mandates

| Artifact | Location | Category | What it governs (one line) | Status |
|---|---|---|---|---|
| Security and Testing Steering | `.kiro/steering/security-and-testing.md` | TESTING — testing expectations (unit, contract, fixture conformance, RBAC/entitlement, lifecycle, AI grounding/refusal, audit) | active |
| Core Testing Commands Steering | `.kiro/steering/core-testing-commands.md` | TESTING — registers `run core testing`, `test my last build`, score/debt query commands | active |
| Core Testing Pipeline | `.kiro/testing/core-testing-pipeline.md` | TESTING — conveyor-belt pipeline; pre-run init; per-unit functional + conformance; auto-fix; halt rules | active |
| Conformance Registry | `.kiro/testing/conformance-registry.md` | TESTING — single source of truth for what "conformant" means (DSC-001…, etc., plus Decision Record assertions DEC-001/002) | active |
| Scorecard Template | `.kiro/testing/scorecard-template.md` | TESTING — template for missing-layer scorecards mid-run | active |
| Phase 2 Testing & Review Schedule (root) | `PHASE_2_TESTING_AND_REVIEW_SCHEDULE.md` | TESTING — Phase 2 transition workstreams T1–T8; week 1–6 schedule; entry/exit criteria | active |
| PHASE_2_TEST_CASE_CATALOGUE.md | `docs/08_phase_2_testing/PHASE_2_TEST_CASE_CATALOGUE.md` | TESTING — Phase 2 test families catalogue | active |
| PHASE_2_CONNECTOR_READINESS_MATRIX.md | `docs/08_phase_2_testing/PHASE_2_CONNECTOR_READINESS_MATRIX.md` | TESTING — connector areas × Phase 2 readiness checks | active |
| INDEX.md (08_phase_2_testing) | `docs/08_phase_2_testing/INDEX.md` | TESTING — Phase 2 testing folder index | active |
| NEXT_TESTING_SCHEDULE.md | `docs/00_authority/NEXT_TESTING_SCHEDULE.md` | TESTING — schedule of remaining code coverage; phase 1 priority list (UI package, contracts package) | active (READY) |
| score-register.md | `docs/00_authority/score-register.md` | TESTING (also Tracking) — current/history conformance scores per layer | active |
| Hook 01: Authority Preflight (.json) | `.kiro/hooks/01-authority-preflight-hook.json` | TESTING/GATE — pre-prompt authority and scope check | active (companion to .md) |
| Hook 01: Authority Preflight (.md) | `.kiro/hooks/01-authority-preflight-hook.md` | TESTING/GATE — natural-language hook recipe | active recipe |
| authority-preflight-hook.kiro.hook | `.kiro/hooks/authority-preflight-hook.kiro.hook` | TESTING/GATE — actual enabled Kiro hook (promptSubmit) | active (enabled: true) |
| Hook 02: Post Task Review (.json) | `.kiro/hooks/02-post-task-review-hook.json` | TESTING/GATE — post-task compliance checklist | active (companion to .md) |
| Hook 02: Post Task Review (.md) | `.kiro/hooks/02-post-task-review-hook.md` | TESTING/GATE — natural-language hook recipe | active recipe |
| post-task-review-hook.kiro.hook | `.kiro/hooks/post-task-review-hook.kiro.hook` | TESTING/GATE — actual enabled Kiro hook (postTaskExecution) | active (enabled: true) |
| Hook 03: Docs Change Control (.json/.md) | `.kiro/hooks/03-docs-change-control-hook.{json,md}` | TESTING/GATE — fileEdited check on docs/AGENTS/BUILD_SEQUENCE/DECISIONS/CHANGELOG/steering | active recipe |
| docs-change-control-hook.kiro.hook | `.kiro/hooks/docs-change-control-hook.kiro.hook` | TESTING/GATE — actual enabled Kiro hook (fileEdited) | active (enabled: true) |
| Hook 04: Doctrinal Assertions Check (.json/.md) | `.kiro/hooks/04-doctrinal-assertions-check-hook.{json,md}` | TESTING/GATE — postTaskExecution check against eleven assertions | active recipe |
| doctrinal-assertions-check.kiro.hook | `.kiro/hooks/doctrinal-assertions-check.kiro.hook` | TESTING/GATE — actual enabled Kiro hook (postTaskExecution) | active (enabled: true) |
| Hook 05: Performance Compliance | `.kiro/hooks/05-performance-compliance.kiro.hook` | TESTING/GATE — postTaskExecution; runs scorecard, refuses Red regressions per PD-1.0 | active (enabled: true) |
| Hooks README | `.kiro/hooks/README.md` | TESTING/GATE — explanatory doc for hook recipes | active |
| Tests README | `tests/README.md` | TESTING — directory placeholder; doctrine in `docs/08_phase_2_testing/` | draft (placeholder) |

---

## 5. DEBT & TRACKING — debt registers, tracking registers

| Artifact | Location | Category | What it governs (one line) | Status |
|---|---|---|---|---|
| debt-register.md | `docs/00_authority/debt-register.md` | DEBT — single source of tracked conformance debt; entries with scope/schedule/status | active |
| score-register.md | `docs/00_authority/score-register.md` | TRACKING — conformance scores per layer over time (also listed under Testing) | active |
| Test runs directory | `docs/00_authority/test-runs/` | TRACKING — per-run output logs (uncertain — folder enumeration not done this run) | active (referenced by pipeline) |
| Scorecards directory | `docs/00_authority/scorecards/` | TRACKING — historical layer scorecards; LATEST.json target (referenced by VERIFY_AND_CLOSE) | active (folder present; contents not enumerated) |
| SPEC_COVERAGE_MATRIX.md | `docs/00_authority/SPEC_COVERAGE_MATRIX.md` | TRACKING — baseline-spec → Kiro-spec coverage matrix (v1.3.1) | active (uncertain — also reads as build-planning artifact, see Category 6) |
| V1_2_COMPLETENESS_AUDIT.md | `docs/00_authority/V1_2_COMPLETENESS_AUDIT.md` | TRACKING — pre-v1.2 conversion-depth audit driving v1.2 remediation | active reference (audit complete; no longer the live tracker) |

---

## 6. BUILD & EXECUTION PLANNING — build sequences, schedules, plans, phase plans, roadmaps, gates, deferred-work decisions, playbooks, implied sequences

### 6a. Authoritative or candidate-authoritative build/execution plans

| Artifact | Location | Category | What it plans (one line) | Status |
|---|---|---|---|---|
| BUILD_SEQUENCE.md (root) | `BUILD_SEQUENCE.md` | BUILD — Commander SDR Kiro Programme v1.3.1 build sequence; doctrine; prerequisite chain; Gate 0 / Gate 1 (Product v1.1 Foundation Build) | active (referenced by AGENTS.md authority read order #5) |
| BUILD_VERSION_ROADMAP.md (root) | `BUILD_VERSION_ROADMAP.md` | BUILD — Commander SDR Build Version Roadmap v1.1; product v1.1 → v3.0 themes, outcomes, hard exclusions | active |
| Build Pack INDEX | `docs/04_build_packs/INDEX.md` | BUILD — BP-00 … BP-23 → Kiro spec mapping; version assignments | active |
| BP-00 … BP-23 Build Packs | `docs/04_build_packs/bp-00-…` through `bp-23-…` | BUILD — per-domain executable build packs (target version, source authority, owning Kiro specs, scope-in) | active (BP-00 self-marked "Validated — planning and tests complete"; others not opened individually this run) |
| Build Pack Discipline Steering | `.kiro/steering/build-pack-discipline.md` | BUILD — no-MVP doctrine; prerequisite-chain rule; version-staged commitment (v1.1 → v1.4+) | active |
| AI Grounding Steering | `.kiro/steering/ai-grounding.md` | BUILD/STANDARDS — Commander AI core from v1.1 | active |
| Phase 2 Testing & Review Schedule (root) | `PHASE_2_TESTING_AND_REVIEW_SCHEDULE.md` | BUILD — Phase 2 weekly schedule and review gates (also listed as TESTING) | active |
| PHASE_E_PROPOSAL.md | `docs/00_authority/PHASE_E_PROPOSAL.md` | BUILD — proposed Phase E (E1 Evidence Pack, E2 Auto-Healing, E3 Communication Thread) for spec 06 | draft (self-marked "Planning pass") |
| NEXT_TESTING_SCHEDULE.md | `docs/00_authority/NEXT_TESTING_SCHEDULE.md` | BUILD — schedule for testing remaining code (also listed as TESTING) | active |
| DAILY_OPERATING_LOOP.md | `docs/00_authority/DAILY_OPERATING_LOOP.md` | BUILD — standard session workflow: Start → Scope → Execute → End | active |
| Conversion Plan | `docs/00_authority/CONVERSION_PLAN.md` | BUILD — 10-step pack-conversion plan and validation gate | active |

### 6b. Source-pack build/execution planning (immutable archive)

| Artifact | Location | Category | What it plans (one line) | Status |
|---|---|---|---|---|
| SDR_Specification_Schedule_and_Folder_Structure_v1_9.md (active copy) | `docs/02_architecture/source_SDR_Specification_Schedule_and_Folder_Structure_v1_9.md` | BUILD — source-pack specification schedule, folder structure, work plan; v2.4 baseline addendum on top | active source copy |
| SDR_Specification_Schedule_and_Folder_Structure_v1_9.md (baseline) | `docs/99_source_archive/baseline_v2_6_2/docs/00_master/SDR_Specification_Schedule_and_Folder_Structure_v1_9.md` | BUILD — same content as above, immutable archive | archived (immutable source) |
| Commander_SDR_AI_Build_Playbooks_v1_7.md | `docs/99_source_archive/baseline_v2_6_2/docs/01_active_build/Commander_SDR_AI_Build_Playbooks_v1_7.md` | BUILD — AI build playbooks (Setup/Build/Child-Tech-Spec/Email/Closed-Loop addenda); contains "Closed Architecture Decisions — Approved Build-Ready Baseline v1.0" | archived (immutable source); "active_build" path label, but lives inside frozen archive |
| Source Release Notes v2.5 / v2.5.1 / v2.5.2 / v2.6 / v2.6.1 / v2.6.2 | `docs/99_source_archive/baseline_v2_6_2/RELEASE_NOTES_v2_5*.md` and `RELEASE_NOTES_v2_6*.md` | BUILD — release-note narratives for prior baselines; v2.6.2 self-described as "Control note only" | archived (immutable source) |

### 6c. Changelogs (build-state record)

| Artifact | Location | Category | What it records (one line) | Status |
|---|---|---|---|---|
| CHANGELOG_v1_2.md | `CHANGELOG_v1_2.md` | BUILD — v1.2 added specs and strengthened EARS coverage | active record |
| CHANGELOG_v1_3.md | `CHANGELOG_v1_3.md` | BUILD — v1.3 deepened sixteen Kiro specs in place | active record |
| CHANGELOG_v1_3_1.md | `CHANGELOG_v1_3_1.md` | BUILD — v1.3.1 lineage closure patch (added Spec #32 → spec 43, applied 13 work items) | active record |

### 6d. Implied sequence in `.kiro/specs/` translation layer (NOT authority — inventoried for contradiction surfacing)

> **Locked-rule note:** Per `docs/knowledge/SOURCING_RULE.md`, the `.kiro/specs/` translation layer (folders 00–43) is NOT authority and must not be cited as source for knowledge work. This subsection lists those artifacts only because their implied build sequence is required to surface contradictions in Run 2 (the map). They MUST NOT be promoted to source authority.

| Artifact | Location | Category | What it implies (one line) | Status |
|---|---|---|---|---|
| Kiro Spec INDEX | `.kiro/specs/INDEX.md` | BUILD (implied) — spec → domain → target version → future code owner table; implies an ordered build by spec number and version band | translation layer (NOT authority) |
| `00-programme-foundation/{requirements,design,tasks,planning}.md` | `.kiro/specs/00-programme-foundation/` | BUILD (implied) — Programme Foundation v1.1; planning.md authority artefacts catalogue | translation layer (NOT authority) |
| `01-application-shell-navigation-route-registry/{requirements,design,tasks}.md` | `.kiro/specs/01-…/` | BUILD (implied) — Shell/Nav v1.1 | translation layer (NOT authority) |
| `02-design-system-ui-component-catalogue/{…}` | `.kiro/specs/02-…/` | BUILD (implied) — Design system v1.1 | translation layer (NOT authority) |
| `03-seed-data-and-test-fixtures/{…}` | `.kiro/specs/03-…/` | BUILD (implied) — Seed data v1.1 | translation layer (NOT authority) |
| `04-data-model-canonical-entities/{…}` | `.kiro/specs/04-…/` | BUILD (implied) — Canonical data model v1.1 | translation layer (NOT authority) |
| `05-command-centre/{…}` | `.kiro/specs/05-…/` | BUILD (implied) — Command Centre v1.1 | translation layer (NOT authority) |
| `06-case-management/{requirements,design,tasks,planning}.md` | `.kiro/specs/06-…/` | BUILD (implied) — Case Management v1.1; planning.md splits into Phases A/B/C/D/E with explicit Phase E in `PHASE_E_PROPOSAL.md` | translation layer (NOT authority) |
| `07-vulnerability-management/` | `.kiro/specs/07-…/` | BUILD (implied) — Vuln Mgmt v1.2 | translation layer (NOT authority) |
| `08-exposure-management/` | `.kiro/specs/08-…/` | BUILD (implied) — Exposure Mgmt v1.2 | translation layer (NOT authority) |
| `09-asset-intelligence/` | `.kiro/specs/09-…/` | BUILD (implied) — Asset Intelligence v1.2 | translation layer (NOT authority) |
| `10-identity-intelligence/` | `.kiro/specs/10-…/` | BUILD (implied) — Identity Intelligence v1.2 | translation layer (NOT authority) |
| `11-control-coverage-editable-baselines/` | `.kiro/specs/11-…/` | BUILD (implied) — Control Coverage v1.2 | translation layer (NOT authority) |
| `12-architecture-topology/` | `.kiro/specs/12-…/` | BUILD (implied) — Architecture/Topology v1.2 | translation layer (NOT authority) |
| `13-security-c2/` | `.kiro/specs/13-…/` | BUILD (implied) — Security C2 v1.4 | translation layer (NOT authority) |
| `14-ooda-views/` | `.kiro/specs/14-…/` | BUILD (implied) — OODA Views v1.4 | translation layer (NOT authority) |
| `15-direction-boards/` | `.kiro/specs/15-…/` | BUILD (implied) — Direction Boards v1.4 | translation layer (NOT authority) |
| `16-connector-framework/` | `.kiro/specs/16-…/` | BUILD (implied) — Connector Framework v1.3 | translation layer (NOT authority) |
| `17-mock-connectors/` | `.kiro/specs/17-…/` | BUILD (implied) — Mock Connectors v1.3 | translation layer (NOT authority) |
| `18-tenant-admin/` | `.kiro/specs/18-…/` | BUILD (implied) — Tenant Admin v1.3 | translation layer (NOT authority) |
| `19-rbac-entitlement-feature-flags/` | `.kiro/specs/19-…/` | BUILD (implied) — RBAC v1.3 | translation layer (NOT authority) |
| `20-commander-ai-core/` | `.kiro/specs/20-…/` | BUILD (implied) — Commander AI core v1.1 | translation layer (NOT authority) |
| `21-aws-bedrock-agentcore-evaluation/` | `.kiro/specs/21-…/` | BUILD (implied) — AWS/Bedrock evaluation v1.5 | translation layer (NOT authority) |
| `22-governance-reporting/` | `.kiro/specs/22-…/` | BUILD (implied) — Governance/Reporting v1.2 | translation layer (NOT authority) |
| `23-ciso-dashboard/` | `.kiro/specs/23-…/` | BUILD (implied) — CISO Dashboard v1.2 | translation layer (NOT authority) |
| `24-security-c2-p0-war-room/` | `.kiro/specs/24-…/` | BUILD (implied) — P0 War Room v1.4 | translation layer (NOT authority) |
| `25-email-case-communication/` | `.kiro/specs/25-…/` | BUILD (implied) — Email Case Comms v1.3 | translation layer (NOT authority) |
| `26-security-tool-intelligence/` | `.kiro/specs/26-…/` | BUILD (implied) — Security Tool Intelligence v1.2 | translation layer (NOT authority) |
| `27-push-governance-dry-run/` | `.kiro/specs/27-…/` | BUILD (implied) — Push Governance Dry-Run v1.3 | translation layer (NOT authority) |
| `28-audit-trail/` | `.kiro/specs/28-…/` | BUILD (implied) — Audit Trail v1.3 | translation layer (NOT authority) |
| `29-phase2-testing-real-connectors/` | `.kiro/specs/29-…/` | BUILD (implied) — Phase 2 Testing v1.6 | translation layer (NOT authority) |
| `30-phase3-pilot-production-hardening/` | `.kiro/specs/30-…/` | BUILD (implied) — Phase 3 Pilot v2.0 | translation layer (NOT authority) |
| `31-devops-local-aws-alignment/` | `.kiro/specs/31-…/` | BUILD (implied) — DevOps v1.1 | translation layer (NOT authority) |
| `32-platform-security-hardening/` | `.kiro/specs/32-…/` | BUILD (implied) — Platform Security v1.3 | translation layer (NOT authority) |
| `33-observability-tool-health/` | `.kiro/specs/33-…/` | BUILD (implied) — Observability v1.3 | translation layer (NOT authority) |
| `34-drift-and-rule-engine/` | `.kiro/specs/34-…/` | BUILD (implied) — Drift/Rule Engine (added v1.2) | translation layer (NOT authority) |
| `35-platform-security-and-hardening/` | `.kiro/specs/35-…/` | BUILD (implied) — Platform Security and Hardening (added v1.2) | translation layer (NOT authority) |
| `36-rule-model-decision-governance-surface/` | `.kiro/specs/36-…/` | BUILD (implied) — Rule Model and Decision Governance Surface (v1.2) | translation layer (NOT authority) |
| `37-mission-objective-binding-model/` | `.kiro/specs/37-…/` | BUILD (implied) — Structured Mission Objective Binding Model (v1.2) | translation layer (NOT authority) |
| `38-commercial-control-plane-ui/` | `.kiro/specs/38-…/` | BUILD (implied) — Commercial Control Plane UI (v1.2) | translation layer (NOT authority) |
| `39-pre-warned-protected-novel-classification/` | `.kiro/specs/39-…/` | BUILD (implied) — Pre-Warned/Protected/Novel (v1.2) | translation layer (NOT authority) |
| `40-inverse-discovery-loop/` | `.kiro/specs/40-…/` | BUILD (implied) — Inverse Discovery Loop (v1.2) | translation layer (NOT authority) |
| `41-internal-risk-investigation-sub-lifecycle/` | `.kiro/specs/41-…/` | BUILD (implied) — Internal Risk Investigation (v1.2) | translation layer (NOT authority) |
| `42-universal-search/` | `.kiro/specs/42-…/` | BUILD (implied) — Universal Search (v1.2) | translation layer (NOT authority) |
| `43-strategy-layer-runtime-surface/` | `.kiro/specs/43-…/` | BUILD (implied) — Strategy Layer Runtime Surface (v1.3.1; build-blocking per BUILD_SEQUENCE.md doctrine #7) | translation layer (NOT authority) |
| `shell-sidebar-header-rebuild/{requirements,design,tasks}.md` | `.kiro/specs/shell-sidebar-header-rebuild/` | BUILD (implied) — out-of-numbering-band shell rebuild plan; tasks include token-layer updates with checked-off items | translation layer (NOT authority) |

### 6e. Prompt library (operational scaffolding for build/execution)

| Artifact | Location | Category | What it scaffolds (one line) | Status |
|---|---|---|---|---|
| Prompt Library INDEX | `docs/07_prompt_library/INDEX.md` | BUILD/PROMPT — listing of paste-and-go prompts | active |
| 00_FIRST_KIRO_EXECUTION_PROMPT.md | `docs/07_prompt_library/00_…` | BUILD/PROMPT — first execution prompt | active |
| 01_BUILD_PACK_EXECUTION_PROMPT.md | `docs/07_prompt_library/01_…` | BUILD/PROMPT — load spec + matching build pack | active |
| 02_SPEC_REFINEMENT_PROMPT.md | `docs/07_prompt_library/02_…` | BUILD/PROMPT — refine Kiro spec without changing doctrine | active |
| 03_COMMANDER_AI_REVIEW_PROMPT.md | `docs/07_prompt_library/03_…` | BUILD/PROMPT — Commander AI coverage review | active |
| 04_AWS_ALIGNMENT_REVIEW_PROMPT.md | `docs/07_prompt_library/04_…` | BUILD/PROMPT — AWS alignment review | active |
| 05_PHASE_2_TESTING_PROMPT.md | `docs/07_prompt_library/05_…` | BUILD/PROMPT — Phase 2 test plan generation | active |
| 06_CHANGE_CONTROL_PROMPT.md | `docs/07_prompt_library/06_…` | BUILD/PROMPT — change-control review against CHANGE_CONTROL.md | active |
| 07_UI_ROUTE_REGISTRY_PROMPT.md | `docs/07_prompt_library/07_…` | BUILD/PROMPT — UI work review against route registry | active |
| 08_CONNECTOR_READINESS_PROMPT.md | `docs/07_prompt_library/08_…` | BUILD/PROMPT — connector scope and readiness review | active |
| Operational prompts README | `docs/00_authority/prompts/README.md` | BUILD/PROMPT — paste-and-go templates explainer | active |
| SESSION_START.md | `docs/00_authority/prompts/SESSION_START.md` | BUILD/PROMPT — session orientation; reads CONVERSION_FINDINGS | active |
| PHASE_RUNNER.md | `docs/00_authority/prompts/PHASE_RUNNER.md` | BUILD/PROMPT — execute named phase of a spec; mandatory scorecard reporting | active |
| TWEAK_PASS.md | `docs/00_authority/prompts/TWEAK_PASS.md` | BUILD/PROMPT — token/layout/component polish pass | active |
| SUB_PHASING.md | `docs/00_authority/prompts/SUB_PHASING.md` | BUILD/PROMPT — propose sub-phase split for large spec | active |
| VERIFY_AND_CLOSE.md | `docs/00_authority/prompts/VERIFY_AND_CLOSE.md` | BUILD/PROMPT — end-of-session verification, full performance scorecard, CONVERSION_FINDINGS write | active |
| PERF_AUDIT.md | `docs/00_authority/prompts/PERF_AUDIT.md` | BUILD/PROMPT — full four-layer perf audit | active |
| TEMPLATE_UPDATES.md | `docs/00_authority/prompts/TEMPLATE_UPDATES.md` | BUILD/PROMPT — specification of edits to PHASE_RUNNER/TWEAK_PASS/VERIFY_AND_CLOSE for perf reporting | active |
| command-centre-build-prompt.md | `docs/05_design_reference/command-centre-build-prompt.md` | BUILD/PROMPT — Command Centre build prompt | DEFERRED (self-marked; per `DEC-command-centre-deferred`) |
| AWS_ALIGNMENT_AND_AGENTCORE_EVALUATION.md | `docs/02_architecture/AWS_ALIGNMENT_AND_AGENTCORE_EVALUATION.md` | BUILD — AWS/Bedrock/AgentCore evaluation lane setup | active |

### 6f. Deferred-work / completion-gate decision references (live in DECISIONS.md and related files)

| Reference | Location | What it defers / gates | Status |
|---|---|---|---|
| `DEC-command-centre-deferred` (referenced by command-centre-build-prompt) | `DECISIONS.md` row + `docs/05_design_reference/command-centre-build-prompt.md` | Defers Command Centre build until functional pages built; resume trigger on data-point-to-metric schedule | active deferral |
| `DEC-002: Command Centre Deferred` (assertion) | `.kiro/testing/conformance-registry.md` | Conformance assertion: no Command Centre implementation until data-point-to-metric schedule complete | active assertion |
| `DEC-001: PageContainer Exceptions` (assertion) | `.kiro/testing/conformance-registry.md` | Conformance assertion: only documented exceptions skip PageContainer | active assertion |
| `DEC-pagecontainer-shared-standard`, `DEC-pagecontainer-exceptions` (referenced by page-layout-standard) | `DECISIONS.md` referenced by `.kiro/steering/page-layout-standard.md` | Page-container standard and its exceptions | referenced (specific row not enumerated this run — uncertain whether spelled-out in DECISIONS.md vs implied) |
| `DEC-spec00-section3-blocked` | `DECISIONS.md` | Spec 00 implementation tasks 3.1/3.2/3.3 blocked pending owner approval | active block |
| `DEC-v1.3.1-Spec32-coverage-correction` | `DECISIONS.md` | Adds spec 43 strategy-layer runtime surface as build-blocking | active |
| `DEC-v1.2-Spec63-64-gap` | `DECISIONS.md` | Records baseline gap for #63 #64 | active |
| `DEC-v1.2-Spec07-register-inconsistency` | `DECISIONS.md` | Preserves both Drift/Rule Engine and Universal Search | active |
| `DEC-v1.3-register-file-mismatch-depth-pass` | `DECISIONS.md` | File content authoritative over register titles where they conflict | active |
| `DEC-performance-doctrine-pd-1-0` (referenced) | `DECISIONS.md` referenced by `docs/00_authority/CONVERSION_FINDINGS.md` | Adopts PD-1.0 performance doctrine | referenced (row not opened individually this run) |

---

## 7. SPECS GOVERNED — boundary only (NOT audited; listed as governed-by surfaces)

> Per the brief, these are listed at the boundary only — no content audit.

| Boundary surface | Location | Governed by (one line) |
|---|---|---|
| `apps/web/src/app/**` | `apps/web/src/app/` | DESIGN_SYSTEM.md (DS-1.0); design-system-contract steering; page-layout-standard steering; route registry baseline; UI page schedule; ALS-1.0 |
| `packages/ui/**` | `packages/ui/` | DS-1.0 token system; execution-discipline (no hardcoded values) |
| `packages/contracts/**`, `packages/db/**` | `packages/contracts/`, `packages/db/` | Canonical data model spec (Kiro spec 04, BP-03); DBL-1.0; DL-1.0 |
| `packages/connectors/**` | `packages/connectors/` | Connector Framework (Kiro spec 16, BP-13); baseline Spec #61; Phase 2 readiness matrix |
| `packages/rules/**` | `packages/rules/` | Drift and Rule Engine (Kiro spec 34); baseline Spec #07 |
| `apps/api/**` | `apps/api/` | Backend/API architecture (baseline Spec #03); ALS-1.0; DL-1.0 |
| `infra/terraform/**` | `infra/terraform/` | AWS_ALIGNMENT_AND_AGENTCORE_EVALUATION.md; IL-1.0; AWS Alignment Steering |
| Architecture specs (auth, RBAC, etc.) | various Kiro specs and baseline #19, #50 | RBAC and entitlement steering (security-and-testing); baseline RBAC matrix |
| Auth boundary | `apps/api/`, `packages/shared/` (planned) | security-and-testing steering; baseline Spec #19 |

---

## Inventory completeness notes

The following items were noted but not enumerated individually in this run; their roles are characterised but their internal listings are not:

- `docs/06_ui_build_reference/mockups/` — folder contents.
- `docs/00_authority/test-runs/` — per-run logs.
- `docs/00_authority/scorecards/` — historical scorecards plus `LATEST.json` (referenced by VERIFY_AND_CLOSE.md).
- BP-01 through BP-23 individual build packs — characterised by INDEX only; not opened individually.
- Individual `.kiro/specs/` `requirements.md` / `design.md` / `tasks.md` files — characterised by spec folder only, except where opened (`00`, `06`, `38`, `29`, `30`, `shell-sidebar-header-rebuild`).
- Individual rows of `DECISIONS.md` were read in bulk; some referenced row IDs above (e.g., `DEC-pagecontainer-shared-standard`, `DEC-performance-doctrine-pd-1-0`, `DEC-command-centre-deferred`) were not pinpoint-verified at row level.

These gaps are flagged here as inventory uncertainty so Run 2 (the map) can decide whether deeper inspection is needed.

---

## END OF INVENTORY (Run 1 of 3)

No mapping, conflict analysis, gap assessment, or recommendations are included in this run, by design. Those belong to Run 2 and Run 3.
