# Salvage & Rebaseline Register

**Status:** Authoritative for what survives the rebaseline.
**Date:** 30 May 2026
**Authority:** `DEC-build-plan-replacement`, `DEC-translation-layer-structural-finding`, `DEC-source-pack-schedule-v1_9-superseded` (DECISIONS.md, 2026-05-30); `docs/knowledge/GOVERNANCE_MAP.md` (Run 2).
**Scope:** Every governance, testing, code, and documentation asset is given a single explicit disposition.

---

## Disposition vocabulary

| Disposition | Meaning |
|---|---|
| **RETAINED** | Asset survives the rebaseline as-is. No edits required. |
| **RETAINED-AND-EXTENDED** | Asset survives. Specific extensions are required to close gaps surfaced in `GOVERNANCE_MAP.md`. |
| **CONSOLIDATE** | Asset survives but must be merged with named overlapping artifacts into a single binding authority. |
| **RE-SEQUENCE** | Asset (typically code) survives but its build position changes — usually because data-first / UI-last replaces the version-themed banding. |
| **RETIRED** | Asset is taken out of the active stack. Preserved for lineage only — no deletion, no edits, no citation as authority. |
| **CREATE-NEW** | Asset does not yet exist. To be created during rebaseline. |

> Per `DEC-build-plan-replacement`: RETIRED items are preserved, not deleted. Per Doctrinal Assertion 7 (baseline immutability): immutable-archive copies are never edited regardless of disposition.

---

## A. AUTHORITY layer

| Asset | Disposition | Notes |
|---|---|---|
| `AGENTS.md` (root) | **RETAINED-AND-EXTENDED** | Authority read order survives. The 9-step list to be reconciled with the consolidated precedence model below (gap O-01 / C-04). The build-sequence-related steps (currently citing `BUILD_SEQUENCE.md` at step 5 and Kiro spec files at steps 6–8) need updating once the rebaselined build sequence and its source-cited specs land. |
| `docs/00_authority/AUTHORITY_MODEL.md` | **CONSOLIDATE** | The 8-tier precedence stack to merge with the AGENTS.md read order and the authority-and-precedence steering into a single canonical precedence document. The "steering files are guidance, not independent source authority" line (rule #1) needs reconciliation with the operational reality that steering binds (C-05). |
| `.kiro/steering/authority-and-precedence.md` | **CONSOLIDATE** | The 6-tier authority order folds into the consolidated precedence document. Conflict-behaviour clauses survive in the merged document. |
| `DECISIONS.md` (root) | **RETAINED** | Every existing decision row carried forward unchanged. Three new audit-finding rows appended on 2026-05-30 are part of this register's authority. Decision IDs referenced by other artifacts but not pinpoint-verified at row level (see GOVERNANCE_MAP O-06 / C-08) to be reconciled separately as a register hygiene task. |
| `CHANGE_CONTROL.md` (root) | **RETAINED-AND-EXTENDED** | CC-0 … CC-5 change classes survive. To be extended with: (a) explicit class for "build-sequence change" once the rebaselined sequence exists; (b) the supersession procedure surfaced as missing in gap G-08. |
| `KIRO_ONBOARDING.md` (root) | **RETAINED-AND-EXTENDED** | First-read sequence survives but currently lists `BUILD_SEQUENCE.md` (RETIRED) at step 4. Update to point at the rebaselined build authority once it exists. |
| `README.md` (root) | **RETAINED-AND-EXTENDED** | Same — first-read sequence references RETIRED build artifacts; update on rebaseline. Non-negotiable constraints survive. |
| `PACK_MANIFEST.md` (root) | **RETIRED** | Stale snapshot from v1.3.1 (370 files); files have changed since. To be replaced by a regenerated manifest if needed at rebaseline. Preserved for lineage. |
| `CONVERSION_REPORT.md` (root) | **RETAINED** | v1.3.1 conversion findings; historic record of the conversion narrative. |
| `CHANGELOG_v1_2.md`, `CHANGELOG_v1_3.md`, `CHANGELOG_v1_3_1.md` (root) | **RETAINED** | Historic change records. No edits. |
| `docs/00_authority/source_*.md` (active source copies) | **RETAINED** | Active copies of v2.6 baseline authorities (Authority and Precedence, Specification Register, Baseline Manifest, AGENTS, Memory, Feature Registry FR001). Continue to be cited from baseline archive per the locked sourcing rule, but the in-folder copies are convenient working-references. |
| `docs/00_authority/CONVERSION_FINDINGS.md` | **RETAINED-AND-EXTENDED** | Header tagged v1.1 but used as a live session log by `DAILY_OPERATING_LOOP.md`, `SESSION_START.md`, and `VERIFY_AND_CLOSE.md` (GOVERNANCE_MAP C-09). Extension required: explicitly declare its dual role (historic conversion findings header + live session log appendix) inside the file, or split the two roles into separate files. |
| `docs/00_authority/CONVERSION_PLAN.md` | **RETAINED** | 10-step conversion plan; historic. |
| `docs/00_authority/INDEX.md`, `docs/01_product/INDEX.md`, `docs/02_architecture/INDEX.md`, `docs/03_data_model/INDEX.md`, `docs/04_build_packs/INDEX.md`, `docs/05_design_reference/INDEX.md`, `docs/06_ui_build_reference/INDEX.md`, `docs/07_prompt_library/INDEX.md`, `docs/08_phase_2_testing/INDEX.md`, `docs/99_source_archive/INDEX.md`, `docs/99_source_archive/SOURCE_FILE_INVENTORY.md` | **RETAINED** | Folder index cards. Update where they reference RETIRED artifacts (notably `docs/04_build_packs/INDEX.md`). |
| `docs/00_authority/GLOSSARY.md` | **RETAINED-AND-EXTENDED** | Plain-English glossary survives. To be extended with terms introduced by the rebaseline (rebaselined build unit, source-derived spec, etc). |
| `docs/00_authority/DAILY_OPERATING_LOOP.md` | **RETAINED-AND-EXTENDED** | Workflow Start → Scope → Execute → End survives. To be extended once the rebaselined build sequence lands; PHASE_RUNNER and other prompts will reference rebaselined units, not BP packs. |
| `docs/99_source_archive/baseline_v2_6_2/**` | **RETAINED** | Immutable per Assertion 7. Includes the baseline schedule v1.9, AI Build Playbooks v1.7, and all #01–#75 child specs. The schedule is also separately marked SUPERSEDED-ORPHAN by `DEC-source-pack-schedule-v1_9-superseded` for active-layer purposes; the archive copy itself is preserved unchanged. |

### Precedence model — to be COMPLETED

| Asset | Disposition | Notes |
|---|---|---|
| Consolidated Precedence Document | **CREATE-NEW** | Merge of AGENTS.md read-order, AUTHORITY_MODEL.md stack, and authority-and-precedence steering. Must additionally specify: (a) within-root-layer tie-breaker, (b) within-steering tie-breaker, (c) build-planning tier order (see DEC-build-plan-replacement: this collapses to a single rebaselined sequence so the "tier" question simplifies), (d) source-vs-translation rule promulgated programme-wide (closes G-09). Required by gaps Q3 / G-09 / O-01 / C-04. |

---

## B. STANDARDS & DOCTRINE layer

| Asset | Disposition | Notes |
|---|---|---|
| `.kiro/steering/commander-doctrine.md` | **RETAINED** | Eleven doctrinal assertions. Foundational; carried forward unchanged. |
| `.kiro/steering/commander-v2-6-doctrine.md` | **RETAINED** | v2.6 doctrine for specs #56–#62. Carries forward. May benefit from a clarifying header that frames it as additive to the eleven assertions (O-08), not competing. |
| `.kiro/steering/product.md` | **RETAINED** | Product framing constraints (no MVP / dashboard / SIEM / SOAR reductions). |
| `.kiro/steering/tech.md` | **RETAINED** | Technology posture; preferred cloud and code-yet rule. |
| `.kiro/steering/structure.md` | **RETAINED-AND-EXTENDED** | Folder structure. Currently lists `docs/04_build_packs/` as "executable build-pack layer" — that layer is RETIRED, so the entry needs updating. Also list the `docs/knowledge/` workspace explicitly. |
| `.kiro/steering/aws-alignment.md` | **RETAINED** | AWS alignment posture; no live resources rule. |
| `.kiro/steering/ai-grounding.md` | **RETAINED** | Commander AI grounding rules. |
| `.kiro/steering/execution-discipline.md` | **RETAINED-AND-EXTENDED** | Token discipline, testing discipline, context-limit, commit discipline. To be extended at rebaseline so it points at the new build sequence rather than the RETIRED `BUILD_SEQUENCE.md`. |
| `.kiro/steering/build-pack-discipline.md` | **RETIRED** | Mandates BP-00/01/02/03/13 ordering and the version-themed v1.1 → v1.4+ commitment model. Both elements are part of the retired build stack. Preserved for lineage. |
| `.kiro/steering/security-and-testing.md` | **RETAINED-AND-EXTENDED** | Testing expectations (unit, contract, fixture conformance, RBAC/entitlement, lifecycle, AI grounding/refusal, audit). Extension required: declare the secure-coding/RBAC enforcement gate (closes Q1) and the architectural debt register (closes Q2). |
| `.kiro/steering/performance-discipline.md` | **RETAINED** | Always-on standing rules from PD-1.0. |
| `docs/00_authority/PERFORMANCE_DOCTRINE.md` (PD-1.0) | **RETAINED** | Performance constitution. |
| `docs/00_authority/APPLICATION_LAYER_STRATEGY.md` (ALS-1.0) | **RETAINED** | |
| `docs/00_authority/DATABASE_LAYER_STRATEGY.md` (DBL-1.0) | **RETAINED** | |
| `docs/00_authority/DATA_LAYER_STRATEGY.md` (DL-1.0) | **RETAINED** | |
| `docs/00_authority/INFRASTRUCTURE_LAYER_STRATEGY.md` (IL-1.0) | **RETAINED** | |
| `docs/00_authority/TEST_AND_TOLERANCE_FRAMEWORK.md` (TTF-1.0) | **RETAINED** | Measurement methodology, tolerance bands, scorecard runner spec. |

---

## C. UI / DESIGN GOVERNANCE

| Asset | Disposition | Notes |
|---|---|---|
| `.kiro/steering/ui-design-system.md` | **CONSOLIDATE** | Visual direction and palette. To merge with `design-system-contract.md` and DS-1.0 (see C-07). |
| `.kiro/steering/design-system-contract.md` | **CONSOLIDATE** | Tabler-class build rulebook. Both this and DS-1.0 declare binding authority on UI build rules — exactly the C-07 dual-authority conflict the brief calls out for resolution. |
| `.kiro/steering/page-layout-standard.md` | **CONSOLIDATE** | `PageContainer` contract and exceptions. The DEC IDs it cites (`DEC-pagecontainer-shared-standard`, `DEC-pagecontainer-exceptions`) are confirmed in DECISIONS.md (verified during this run); the C-08 uncertainty is closed. Folds into the consolidated UI authority. |
| `docs/06_ui_build_reference/DESIGN_SYSTEM.md` (DS-1.0) | **CONSOLIDATE** | The pinned design system spec. Becomes the foundation of the consolidated UI authority. |
| `docs/06_ui_build_reference/MOCKUP_INDEX.md` | **RETAINED** | Mockup → surface → mode mapping. Survives as authoritative visual targets. |
| `docs/06_ui_build_reference/UI_PAGE_SCHEDULE.md` | **RE-SEQUENCE** | Page schedule mapping pages to versions and Kiro specs. Versioned banding (v1.1, v1.2, v1.3, v1.4) belongs to the retired stack. The page list itself survives but must be re-sequenced under the data-first / UI-last principle, with version-band columns replaced by data-readiness gates. |
| `docs/06_ui_build_reference/ROUTE_REGISTRY_BASELINE.md` | **RE-SEQUENCE** | Same — route list survives, version banding does not. |
| `docs/06_ui_build_reference/commander-sdr-shell-v11-admin-navigation.html` | **RETAINED** | Active operational shell HTML reference per Spec #48. |
| `docs/06_ui_build_reference/commander-commercial-control-plane-shell-v3-admin-navigation.html` | **RETAINED** | Active control plane shell HTML reference per Spec #48. |
| `docs/06_ui_build_reference/source_47_…`, `source_48_…`, `source_54_…` | **RETAINED** | Source copies of UI authority specs (Application Route and Navigation Register; Active Shell UI Authority; Pre-Build UI Navigation and Route Baseline). |
| `docs/06_ui_build_reference/mockups/` | **RETAINED** | Visual targets keyed in MOCKUP_INDEX.md. |
| `docs/05_design_reference/source_11a_UI_UX_Design_System_Spec.md` | **RETAINED** | Baseline UI/UX design system source spec. |
| `docs/05_design_reference/source_41_Commander_SDR_Military_Intelligence_UI_Doctrine_Spec.md` | **RETAINED** | Military-intelligence UI doctrine source spec. |
| `docs/05_design_reference/command-centre-build-prompt.md` | **RETIRED** | Self-marked DEFERRED with resume trigger "data-point-to-metric schedule complete" — that schedule does not exist (orphan F). The prompt is part of the RETIRED Command Centre build path; if Command Centre rebuild is required at rebaseline, a fresh prompt sourced from baseline will be authored. |
| `docs/ui-design-inventory.md` | **RETAINED** | Read-only DS-1.0 design inventory of `apps/web` and `packages/ui` tokens; helpful diagnostic. |

### Consolidated UI Governance Authority

| Asset | Disposition | Notes |
|---|---|---|
| Consolidated UI Build Authority | **CREATE-NEW** | Merger of DS-1.0 (the pinned spec), `design-system-contract.md` (the Tabler rulebook), `page-layout-standard.md` (the PageContainer contract), and `ui-design-system.md` (visual direction). One binding artifact, with the others becoming pointers or scoped detail. Resolves C-07. |

---

## D. TESTING & QUALITY

| Asset | Disposition | Notes |
|---|---|---|
| `.kiro/steering/core-testing-commands.md` | **RETAINED** | Trigger commands (`run core testing`, `test my last build`, score/debt queries). |
| `.kiro/testing/core-testing-pipeline.md` | **RETAINED** | Conveyor-belt pipeline definition. Methodology is build-sequence-independent, so survives the rebaseline. |
| `.kiro/testing/conformance-registry.md` | **RETAINED-AND-EXTENDED** | Single source of "conformant". Methodology and existing assertions (DSC-001 … etc, decision-record assertions DEC-001 / DEC-002) survive. Extensions required: (a) secure-coding / RBAC assertions per gap Q1; (b) architectural-debt assertions sourced from the new register (gap Q2); (c) reconciliation of restated decisions with DECISIONS.md primary register (O-06). |
| `.kiro/testing/scorecard-template.md` | **RETAINED** | Missing-layer scorecard template. |
| `docs/00_authority/score-register.md` | **RETAINED** | Conformance scores per layer over time. |
| `docs/00_authority/test-runs/` | **RETAINED** | Per-run output logs directory. |
| `docs/00_authority/scorecards/` | **RETAINED** | Historical scorecards directory; LATEST.json target. |

### Hooks

| Asset | Disposition | Notes |
|---|---|---|
| `.kiro/hooks/authority-preflight-hook.kiro.hook` | **RETAINED** | Active enabled (promptSubmit). |
| `.kiro/hooks/post-task-review-hook.kiro.hook` | **RETAINED** | Active enabled (postTaskExecution). |
| `.kiro/hooks/docs-change-control-hook.kiro.hook` | **RETAINED** | Active enabled (fileEdited). |
| `.kiro/hooks/doctrinal-assertions-check.kiro.hook` | **RETAINED** | Active enabled (postTaskExecution). |
| `.kiro/hooks/05-performance-compliance.kiro.hook` | **RETAINED** | Active enabled (postTaskExecution). |
| `.kiro/hooks/01-…md/.json` companions | **CONSOLIDATE** | The `.md` (recipe) and `.json` companions for hooks 01–04 should declare canonicality versus the runtime `.kiro.hook` (O-05 / Orphan-H). One canonical form per hook with explicit role labels. Hook 05 already has this — it has only the `.kiro.hook` form. |
| `.kiro/hooks/02-…md/.json` companions | **CONSOLIDATE** | Same. |
| `.kiro/hooks/03-…md/.json` companions | **CONSOLIDATE** | Same. |
| `.kiro/hooks/04-…md/.json` companions | **CONSOLIDATE** | Same. |
| `.kiro/hooks/README.md` | **RETAINED** | Explanatory doc. |

### Phase 2 testing schedule

| Asset | Disposition | Notes |
|---|---|---|
| `PHASE_2_TESTING_AND_REVIEW_SCHEDULE.md` (root) | **RETAINED** | Phase 2 transition workstreams T1–T8. Independent of build sequence. |
| `docs/08_phase_2_testing/PHASE_2_TEST_CASE_CATALOGUE.md` | **RETAINED** | |
| `docs/08_phase_2_testing/PHASE_2_CONNECTOR_READINESS_MATRIX.md` | **RETAINED** | |
| `docs/00_authority/NEXT_TESTING_SCHEDULE.md` | **RE-SEQUENCE** | "Schedule for testing remaining code" currently scopes against `apps/web/src` and `packages/*` paths from the retired stack. Test methodology survives; the scope list to be re-anchored to rebaselined units. |

### To be CREATED at rebaseline

| Asset | Disposition | Notes |
|---|---|---|
| Secure-coding / RBAC enforcement gate | **CREATE-NEW** | A Hook-05-equivalent for security: postTaskExecution check that refuses tasks introducing hardcoded secrets, missing input validation, missing auth on protected routes, RBAC bypass, or tenant-isolation breach. Closes gap Q1. May be implemented as a new hook plus matching conformance-registry assertions. |
| Commit-time enforcement | **CREATE-NEW** | Pre-commit guard (git hook or CI gate) that runs the relevant subset of conformance checks, addressing gap G-07. The five existing hooks fire pre-prompt and post-task; none fires at git commit. |

---

## E. DEBT & TRACKING

| Asset | Disposition | Notes |
|---|---|---|
| `docs/00_authority/debt-register.md` | **RETAINED** | Conformance debt. The four existing entries (DEBT-001 etc.) are scheduled / open and will be re-validated in the first run of the rebaselined pipeline. |
| `docs/00_authority/score-register.md` | **RETAINED** | (Also in Section D — single asset, single retention.) |
| `docs/00_authority/SPEC_COVERAGE_MATRIX.md` | **RETIRED** | v1.3.1 baseline-spec → Kiro-spec mapping. Built on the translation-layer dependency that DEC-translation-layer-structural-finding declared latent contamination. Replaced by the **Source-Derived Coverage Matrix** (see CREATE-NEW table below). Preserved for lineage. |
| `docs/00_authority/V1_2_COMPLETENESS_AUDIT.md` | **RETAINED** | Historic audit driving v1.2 remediation. |

### To be CREATED at rebaseline

| Asset | Disposition | Notes |
|---|---|---|
| Architectural Debt Register | **CREATE-NEW** | Closes gap Q2. To be seeded from the scattered architectural-debt items the GOVERNANCE_MAP found: PHASE_E_PROPOSAL.md (Spec 06 Phase E unspecified), DEC-spec00-section3-blocked, the Spec 32 → Kiro 43 retroactive correction record (DEC-v1.3.1-Spec32-coverage-correction), DEC-v1.2-Spec63-64-gap, DEC-v1.2-Spec07-register-inconsistency, DEC-v1.3-register-file-mismatch-depth-pass, the orphan-F deferred Command Centre prompt's missing "data-point-to-metric schedule", and any rebaseline-time additions. Distinct from the conformance/code debt register — captures structural and design-decision debt. |
| Source-Derived Coverage Matrix | **CREATE-NEW** | Replacement for the RETIRED `SPEC_COVERAGE_MATRIX.md`. Maps baseline spec #N (verified against `docs/99_source_archive/baseline_v2_6_2/`) to rebaselined build units. The clean knowledge graph's coverage table can serve this role — i.e., the graph's spec-to-unit mapping IS this matrix. To be authored under the locked sourcing-rule discipline (workspace-scoped today, programme-wide at rebaseline). Closes the contamination risk that the retired matrix carried. |

---

## F. BUILD & EXECUTION PLANNING

### Retired stack

| Asset | Disposition | Notes |
|---|---|---|
| `BUILD_SEQUENCE.md` v1.3.1 (root) | **RETIRED** | Per DEC-build-plan-replacement. Internally contradictory (C-01) and built on the translation-layer foundation. Preserved for lineage. |
| `BUILD_VERSION_ROADMAP.md` v1.1 (root) | **RETIRED** | Version-themed roadmap (v1.1 → v3.0). The themes are useful conceptual reference but the active roadmap document is part of the retired stack. Preserved for lineage. |
| `.kiro/steering/build-pack-discipline.md` | **RETIRED** | Mandates BP ordering — operates against the RETIRED BP layer. Preserved for lineage. |
| `docs/04_build_packs/INDEX.md` | **RETIRED** | BP INDEX. Preserved for lineage. |
| `docs/04_build_packs/bp-00-…` through `bp-23-…` (24 BP packs) | **RETIRED** | The 24 BP packs. Self-declared statuses ("Implemented" / "Validated" on BP-00, BP-01, BP-03, BP-04) refer to code that is RE-SEQUENCED below — the BP packs themselves are out of the active stack. Preserved for lineage. |
| `.kiro/specs/INDEX.md` | **RETIRED** | The Kiro spec → target version table. Belongs to the retired version-banded stack. The translation-layer folders themselves remain RETIRED-but-preserved (see below). |
| `.kiro/specs/00-…/` through `.kiro/specs/43-…/` and `.kiro/specs/shell-sidebar-header-rebuild/` | **RETIRED** | The translation-layer folders. Per DEC-translation-layer-structural-finding, the `.kiro/specs/` translation layer is never authority and is not the source of build depth at rebaseline. Folders preserved as working-copy reference; never cited as source. The `shell-sidebar-header-rebuild` orphan folder is preserved on the same basis. |
| `docs/02_architecture/source_SDR_Specification_Schedule_and_Folder_Structure_v1_9.md` | **RETIRED** | Per DEC-source-pack-schedule-v1_9-superseded. Preserved for lineage. The immutable archive copy at `docs/99_source_archive/baseline_v2_6_2/docs/00_master/` remains untouched (Assertion 7). |
| `docs/02_architecture/AWS_ALIGNMENT_AND_AGENTCORE_EVALUATION.md` | **RETAINED** | AWS evaluation lane setup; useful at rebaseline for AWS-touching units. |
| `docs/00_authority/PHASE_E_PROPOSAL.md` | **RETIRED** | Self-described "Planning pass; Phase E not fully specified". Phase E was a Spec 06 sub-plan within the retired stack; its three concepts (Evidence Pack, Auto-Healing, Communication Thread) become an architectural-debt entry to be considered at rebaseline. Preserved for lineage. |

### Source-pack build planning (immutable archive)

| Asset | Disposition | Notes |
|---|---|---|
| `docs/99_source_archive/baseline_v2_6_2/docs/01_active_build/Commander_SDR_AI_Build_Playbooks_v1_7.md` | **RETAINED** | Inside the immutable archive (Assertion 7). The "active_build" folder name is misleading — it's part of the frozen archive. The playbooks may be referenced as design input at rebaseline; they are not authority over the rebaselined sequence. |
| `docs/99_source_archive/baseline_v2_6_2/RELEASE_NOTES_*.md` (v2.5, v2.5.1, v2.5.2, v2.6, v2.6.1, v2.6.2) | **RETAINED** | Immutable historic record. |

### Operational scaffolding (prompt library)

| Asset | Disposition | Notes |
|---|---|---|
| `docs/07_prompt_library/INDEX.md` | **RETAINED** | |
| `docs/07_prompt_library/00_FIRST_KIRO_EXECUTION_PROMPT.md` | **RETAINED-AND-EXTENDED** | First execution prompt. Update to read the rebaselined build authority once it exists. |
| `docs/07_prompt_library/01_BUILD_PACK_EXECUTION_PROMPT.md` | **RE-SEQUENCE** | Currently keyed to "the matching docs/04_build_packs build pack" (RETIRED). To be re-keyed to the rebaselined build unit. |
| `docs/07_prompt_library/02_SPEC_REFINEMENT_PROMPT.md` | **RE-SEQUENCE** | Currently keyed to Kiro spec refinement; re-key to source-derived spec at rebaseline. |
| `docs/07_prompt_library/03_COMMANDER_AI_REVIEW_PROMPT.md` | **RETAINED** | Domain-agnostic. |
| `docs/07_prompt_library/04_AWS_ALIGNMENT_REVIEW_PROMPT.md` | **RETAINED** | |
| `docs/07_prompt_library/05_PHASE_2_TESTING_PROMPT.md` | **RETAINED** | |
| `docs/07_prompt_library/06_CHANGE_CONTROL_PROMPT.md` | **RETAINED** | |
| `docs/07_prompt_library/07_UI_ROUTE_REGISTRY_PROMPT.md` | **RETAINED** | |
| `docs/07_prompt_library/08_CONNECTOR_READINESS_PROMPT.md` | **RETAINED** | |
| `docs/00_authority/prompts/SESSION_START.md` | **RETAINED** | |
| `docs/00_authority/prompts/PHASE_RUNNER.md` | **RETAINED-AND-EXTENDED** | Currently references "the spec's requirements.md, design.md, tasks.md" — i.e., the translation-layer Kiro spec files. Re-anchor to source-derived specs at rebaseline. |
| `docs/00_authority/prompts/TWEAK_PASS.md` | **RETAINED** | |
| `docs/00_authority/prompts/SUB_PHASING.md` | **RETAINED-AND-EXTENDED** | Same — re-anchor to source-derived specs at rebaseline. |
| `docs/00_authority/prompts/VERIFY_AND_CLOSE.md` | **RETAINED** | |
| `docs/00_authority/prompts/PERF_AUDIT.md` | **RETAINED** | |
| `docs/00_authority/prompts/TEMPLATE_UPDATES.md` | **RETAINED** | |
| `docs/00_authority/prompts/README.md` | **RETAINED** | |

### Rebaseline build authority

| Asset | Disposition | Notes |
|---|---|---|
| Rebaselined Build Sequence | **CREATE-NEW** | Single authoritative build sequence derived from the clean knowledge graph (Step 2). Data-first / UI-last. Each unit cites a baseline spec #N from source authority (closes DEC-translation-layer-structural-finding mandate). Replaces BUILD_SEQUENCE.md, BUILD_VERSION_ROADMAP.md, build-pack-discipline.md steering, the BP layer, and the Kiro spec INDEX in one consolidated artifact (or a clean small set of artifacts — to be decided when the graph is built). |
| Per-Unit Source-Derived Specs | **CREATE-NEW** | Replacement for the `.kiro/specs/00–43-…/` translation layer. Each spec cites baseline spec #N at the head and is verified against the archive at write time per the locked sourcing-rule discipline, promulgated programme-wide per DEC-translation-layer-structural-finding. |
| Programme-wide Sourcing Rule | **CREATE-NEW** | Promulgation of the workspace-scoped `docs/knowledge/SOURCING_RULE.md` to the whole programme. Closes gap G-09 and underpins DEC-translation-layer-structural-finding. |

---

## G. CODE ASSETS

> All code is **RETAINED** in place. None of the rebaseline decisions delete code. Code is **RE-SEQUENCED** — its position in the build chain shifts from version-themed banding (v1.1 → v1.2 → …) to data-first / UI-last under the rebaselined sequence.

| Asset | Disposition | Notes |
|---|---|---|
| `apps/web/src/**` | **RE-SEQUENCED** | UI Next.js app. Routes, pages, layouts, components. Rebuilt component set survives. To be re-pointed at the clean data layer at rebaseline. |
| `apps/web/src/registry/**` | **RE-SEQUENCED** | Route registry. Survives; re-anchored to rebaselined route authority. |
| `apps/web/src/components/page-container.tsx` | **RETAINED** | The `PageContainer` standard. Doctrinal in DEC-pagecontainer-shared-standard. |
| `apps/api/**` | **RE-SEQUENCED** | Future API home; mostly placeholder per the steering. |
| `packages/ui/**` | **RE-SEQUENCED** | Token system (primitive → semantic → component) and shared UI primitives. The token system itself is the foundation of the consolidated UI authority and survives. |
| `packages/contracts/**` | **RE-SEQUENCED** | Canonical entity types and fixtures. Asset / Identity / Case / Connector / Strategy / RiskObject / AuditEvent contracts and seed fixtures. To be re-validated against baseline source specs (#04 Frontend Architecture, #05 Data Connector Normalisation, #29 Universal Risk Object and Case Binding, #30 Universal Validation/Closure/Reopening, #46 Canonical Terminology, #62 Verdict Semantics, etc.) at rebaseline. |
| `packages/contracts/src/resolvers/validation-window-enforcer.ts` and related resolvers | **RE-SEQUENCED** | Validation window logic. Survives; re-anchored at rebaseline. |
| `packages/db/**` | **RE-SEQUENCED** | Drizzle ORM schema. Currently no live database (DEC-spec04-no-live-db). Re-validated at rebaseline. |
| `packages/connectors/**` | **RE-SEQUENCED** | Connector framework future home. |
| `packages/rules/**` | **RE-SEQUENCED** | Rules engine future home. |
| `packages/shared/**` | **RE-SEQUENCED** | Shared libraries future home. |
| `packages/workers/**` | **RE-SEQUENCED** | Workers future home. |
| `tests/**` | **RE-SEQUENCED** | Test suite. The folder structure mirrors the retired Kiro-spec folder numbering (`tests/00-programme-foundation/`, `tests/01-application-shell/`, etc.); tests survive but the folder taxonomy will be re-anchored. |
| `tests/fixtures/**` | **RE-SEQUENCED** | Test fixtures; survive. |
| `infra/terraform/**` | **RETAINED** | AWS planning scaffold; no live resources. |
| `infra/docker/**`, `infra/github-actions/**` | **RETAINED** | |
| `analytics/README.md`, `apps/api/README.md`, `apps/web/README.md`, `tests/README.md` | **RETAINED** | Folder placeholders. |
| `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `tsconfig.json`, `vitest.config.ts` | **RETAINED** | Build configuration. |

---

## H. KNOWLEDGE WORKSPACE (active)

| Asset | Disposition | Notes |
|---|---|---|
| `docs/knowledge/SOURCING_RULE.md` | **RETAINED-AND-EXTENDED** | Locked workspace-scoped sourcing rule. To be promulgated programme-wide per DEC-translation-layer-structural-finding (the programme-wide variant is a CREATE-NEW above; this in-workspace rule remains its anchor). |
| `docs/knowledge/README.md` | **RETAINED** | |
| `docs/knowledge/BASELINE_SOURCE_INVENTORY.md` | **RETAINED** | Verified inventory of baseline #01–#75 + masters; the source map for rebaseline. |
| `docs/knowledge/GOVERNANCE_BUILD_INVENTORY.md` (Run 1) | **RETAINED** | Audit inventory; historic record. |
| `docs/knowledge/GOVERNANCE_MAP.md` (Run 2) | **RETAINED** | Audit map; historic record and the source for this register's findings. |
| `docs/knowledge/SALVAGE_AND_REBASELINE_REGISTER.md` | **RETAINED** | This file. |
| `docs/knowledge/_superseded/**` | **RETAINED** | Nine contaminated Phase 1-6 outputs preserved for lineage. Not read or cited per workspace-scoped sourcing rule. |

---

## SUMMARY COUNTS

| Disposition | Count (approx.) |
|---|---|
| RETAINED | ~70 |
| RETAINED-AND-EXTENDED | ~14 |
| CONSOLIDATE | ~9 |
| RE-SEQUENCE | ~15 (incl. all code packages) |
| RETIRED | ~37 (BP layer, build sequence/roadmap docs, build-pack-discipline steering, Kiro spec INDEX, 44 translation-layer folders, source-pack schedule v1.9, PHASE_E_PROPOSAL, command-centre-build-prompt, SPEC_COVERAGE_MATRIX, PACK_MANIFEST) |
| CREATE-NEW | 7 (Consolidated Precedence Document; Consolidated UI Authority; Architectural Debt Register; Source-Derived Coverage Matrix; Secure-coding/RBAC Gate; Commit-time Enforcement; Rebaselined Build Sequence + per-unit specs + programme-wide sourcing rule) |

---

## STOP

No restructuring performed. No code edited. No artifacts moved. Three decisions appended to `DECISIONS.md`. This register is the authority for what survives the rebaseline and what is created.

Awaiting owner review before proceeding to the clean knowledge graph (Step 2).
