# GOVERNANCE & BUILD MAP (Run 2 of 3)

**Status:** Analysis only. Built on `GOVERNANCE_BUILD_INVENTORY.md` (Run 1) and the BP relationship report. No re-scanning, no rewriting, no restructuring.
**Date:** 30 May 2026
**Output:** Five maps — Overlaps, Conflicts, Gaps, Precedence, Orphans — plus formal resolution of two specific findings carried forward from the BP relationship report.

---

## 1. OVERLAPS — multiple artifacts governing the same subject

> Each entry: shared subject → artifacts that share governance of it → consolidation candidacy.

### O-01. Authority precedence — three independent statements

**Shared subject:** Which document wins when authority sources conflict.

**Artifacts:**
- `AGENTS.md` (root) — 9-step "Authority read order" (baseline → AGENTS source → manifest → AUTHORITY_MODEL → BUILD_SEQUENCE → spec requirements → spec design → spec tasks → build pack)
- `docs/00_authority/AUTHORITY_MODEL.md` — 8-tier "Precedence stack" (baseline → masters → child specs → registries → steering → build packs → shells → external)
- `.kiro/steering/authority-and-precedence.md` — 6-tier "Authority order" (baseline → root programme controls → steering → specs+build packs → prompt+hooks → external)

**Consolidation candidacy:** HIGH. Three statements of the same hierarchy at different granularities. They are non-conflicting in spirit but inconsistent in form (different tier counts, different layer groupings). One canonical precedence document with the others becoming pointers would remove ambiguity.

---

### O-02. UI governance — fragmented across seven artifacts

**Shared subject:** How UI is built (tokens, page structure, visual rules, route registry).

**Artifacts:**
- `.kiro/steering/ui-design-system.md` — visual direction, palette, file-match scoped to `apps/web`/`packages/ui`/`docs/06_ui_build_reference`
- `.kiro/steering/design-system-contract.md` — exact Tabler-class build rulebook
- `.kiro/steering/page-layout-standard.md` — `PageContainer` contract and exceptions
- `docs/06_ui_build_reference/DESIGN_SYSTEM.md` (DS-1.0) — self-described "authoritative; supersedes ad-hoc styling"
- `docs/06_ui_build_reference/ROUTE_REGISTRY_BASELINE.md` — planning route registry
- `docs/06_ui_build_reference/UI_PAGE_SCHEDULE.md` — page-by-page schedule
- `docs/06_ui_build_reference/MOCKUP_INDEX.md` — mockup → surface → mode mapping
- `docs/05_design_reference/source_11a_UI_UX_Design_System_Spec.md` (baseline source)
- `docs/05_design_reference/source_41_Commander_SDR_Military_Intelligence_UI_Doctrine_Spec.md` (baseline source)
- `docs/06_ui_build_reference/source_47_…`, `source_48_…`, `source_54_…` (baseline sources)
- `docs/ui-design-inventory.md` — read-only inventory

**Consolidation candidacy:** HIGH. Seven active governance artifacts plus several source copies all govern "how UI is built." The three steering files alone overlap heavily on subject matter (visual direction / Tabler / page structure are all "build rules"). One reconciled UI-governance authority pointing into the steering artifacts as scoped detail would clarify what wins where.

---

### O-03. Build sequencing / planning — five active artifacts plus one orphan source

**Shared subject:** What gets built, in what order, by what version.

**Artifacts:**
- `BUILD_SEQUENCE.md` v1.3.1 (root) — doctrine, prerequisite chain, Gate 0 / Gate 1
- `BUILD_VERSION_ROADMAP.md` v1.1 (root) — version-themed roadmap (v1.1 → v3.0)
- `.kiro/steering/build-pack-discipline.md` — no-MVP, prerequisite-chain rule, version-staged commitment
- `docs/04_build_packs/INDEX.md` + `BP-00`…`BP-23` — per-domain slices with version banding
- `.kiro/specs/INDEX.md` — Kiro spec → target version table
- `docs/02_architecture/source_SDR_Specification_Schedule_and_Folder_Structure_v1_9.md` — source-pack schedule (status unresolved → see Finding 1)

**Consolidation candidacy:** MEDIUM (within active artifacts) / RESOLVE (for the source-pack schedule). The BP relationship report already established that the active four work as roadmap → sequence-doctrine → discipline-steering → BP slice expansion. They are layered, not duplicate. The duplication is at the version-table level: v1.1 / v1.2 / v1.3 / v1.4 themes are restated in BUILD_VERSION_ROADMAP, the BP INDEX, build-pack-discipline steering, and `.kiro/specs/INDEX.md`. A single canonical version table referenced by the others would eliminate that overlap.

---

### O-04. Testing pipeline / commands / registry / schedules — eight artifacts

**Shared subject:** What is tested, how, and when.

**Artifacts:**
- `.kiro/steering/security-and-testing.md` — testing expectations
- `.kiro/steering/core-testing-commands.md` — registers `run core testing` etc.
- `.kiro/testing/core-testing-pipeline.md` — pipeline definition
- `.kiro/testing/conformance-registry.md` — single source of "conformant"
- `.kiro/testing/scorecard-template.md` — missing-layer scorecard template
- `PHASE_2_TESTING_AND_REVIEW_SCHEDULE.md` (root) — Phase 2 weekly schedule
- `docs/08_phase_2_testing/PHASE_2_TEST_CASE_CATALOGUE.md` — Phase 2 test families
- `docs/08_phase_2_testing/PHASE_2_CONNECTOR_READINESS_MATRIX.md` — connector readiness
- `docs/00_authority/NEXT_TESTING_SCHEDULE.md` — schedule for remaining code
- Five hooks (`.kiro/hooks/01–05`) acting as gates

**Consolidation candidacy:** MEDIUM. Two distinct timelines coexist: (a) the always-on conveyor-belt pipeline (commands → pipeline → registry → hooks) and (b) the Phase 2 transition schedule. Within (a) the four files are layered correctly (commands invoke pipeline, pipeline reads registry, hooks gate). Within (b) the three Phase 2 docs overlap on connector readiness. NEXT_TESTING_SCHEDULE may overlap with both. Worth a structural review.

---

### O-05. Hook representation — triple form for hooks 01–04

**Shared subject:** Each enabled hook's contents.

**Artifacts (per hook):**
- `.kiro/hooks/0N-name.md` — natural-language recipe
- `.kiro/hooks/0N-name.json` — JSON form (companion)
- `.kiro/hooks/name.kiro.hook` — actual enabled file (`enabled: true`)

Hook 05 (Performance Compliance) has only the `.kiro.hook` form.

**Consolidation candidacy:** LOW. The three forms appear to serve different purposes (recipe / metadata / runtime). However, the `.md` and `.json` companions are not declared as orphans-of-the-runtime-file anywhere; their canonical relationship is not stated. An explicit "the .kiro.hook is canonical; .md is the recipe; .json is reserved" note would remove ambiguity.

---

### O-06. Decision records — primary register vs. embedded restatements

**Shared subject:** Decisions affecting governance and build planning.

**Artifacts:**
- `DECISIONS.md` (root) — primary register
- `.kiro/testing/conformance-registry.md` "Decision Record Assertions" section restating DEC-001 (PageContainer Exceptions) and DEC-002 (Command Centre Deferred)
- Decision IDs referenced by other files but not pinpoint-verified in DECISIONS.md (`DEC-pagecontainer-shared-standard`, `DEC-pagecontainer-exceptions`, `DEC-command-centre-deferred`, `DEC-performance-doctrine-pd-1-0`)

**Consolidation candidacy:** MEDIUM. The conformance registry restating decisions is fine if those restatements stay in lock-step with DECISIONS.md, but no rule enforces sync. The "referenced but not pinpoint-verified" decision IDs are inventory uncertainty — possibly real DECISIONS.md rows, possibly informal IDs invented in steering files. A reconciliation pass would clarify.

---

### O-07. Performance doctrine stack — six layered artifacts

**Shared subject:** Performance discipline.

**Artifacts:**
- `.kiro/steering/performance-discipline.md` — always-on rules
- `docs/00_authority/PERFORMANCE_DOCTRINE.md` (PD-1.0) — constitution
- `docs/00_authority/APPLICATION_LAYER_STRATEGY.md` (ALS-1.0)
- `docs/00_authority/DATABASE_LAYER_STRATEGY.md` (DBL-1.0)
- `docs/00_authority/DATA_LAYER_STRATEGY.md` (DL-1.0)
- `docs/00_authority/INFRASTRUCTURE_LAYER_STRATEGY.md` (IL-1.0)
- `docs/00_authority/TEST_AND_TOLERANCE_FRAMEWORK.md` (TTF-1.0)
- `.kiro/hooks/05-performance-compliance.kiro.hook`

**Consolidation candidacy:** NONE. This is **layered overlap by design**: steering (always-on summary) → doctrine (constitution) → four layer strategies → measurement framework → enforcement hook. Listed for completeness; no consolidation needed.

---

### O-08. Commander doctrine — two steering files

**Shared subject:** Doctrinal assertions binding all work.

**Artifacts:**
- `.kiro/steering/commander-doctrine.md` — eleven doctrinal assertions
- `.kiro/steering/commander-v2-6-doctrine.md` — v2.6 specs #56–#62 doctrine

**Consolidation candidacy:** LOW–MEDIUM. The two cover different generations of doctrine (the eleven assertions are programme-wide; v2.6 doctrine adds spec-pinned assertions). They are non-redundant but a reader does not know without opening both whether they layer or compete. A "general doctrine + v2.6 addendum" framing inside the files would clarify.

---

### O-09. Conversion narrative — two documents

**Shared subject:** The Kiro pack's conversion findings.

**Artifacts:**
- `CONVERSION_REPORT.md` (root, v1.3.1)
- `docs/00_authority/CONVERSION_FINDINGS.md` (v1.1)

**Consolidation candidacy:** HIGH. CONVERSION_FINDINGS at v1.1 is now three pack-versions out of date (v1.1 → v1.2 → v1.3 → v1.3.1). CONVERSION_REPORT at root is current. Either CONVERSION_FINDINGS is being maintained as a working session log (DAILY_OPERATING_LOOP references "the latest entry in CONVERSION_FINDINGS") OR it's a stale older copy. From the inventory it appears to be **both** — referenced as a session log by the operating loop AND tagged at v1.1. That dual use needs to be made explicit.

---

## 2. CONFLICTS — direct contradictions between artifacts

### C-01. BUILD_SEQUENCE doctrine #7 vs. BP-05 implementation status — Strategy Layer ordering breach

**The contradiction:**
- `BUILD_SEQUENCE.md` v1.3.1 doctrine #7: "Strategy Layer Runtime Surface must precede case management, routing, validation/closure, reopening and Fusion Map implementation because baseline Spec #32 is mandatory and build-blocking."
- `BP-05` (Case Management Core Lifecycle) — self-status: "Implemented — case lifecycle, routing, validation, and closure tests complete" (target version v1.1).
- `.kiro/specs/43-strategy-layer-runtime-surface/` — added retroactively at v1.3.1 per `DEC-v1.3.1-Spec32-coverage-correction`.
- `docs/04_build_packs/INDEX.md` — has **no** build pack for the Strategy Layer Runtime Surface. The 24 packs end at BP-23.

**Net effect:** Case Management was implemented before its declared prerequisite (Strategy Layer Runtime Surface) was even fully written, and the prerequisite has no BP to deliver it.

**Severity:** HIGH. Build-blocking dependency defined in active doctrine but unsatisfied in the active build layer.

---

### C-02. Command Centre — implemented vs. deferred

**The contradiction:**
- `BUILD_SEQUENCE.md` Gate 1, step 6: "Command Centre first functional surface" (active).
- `BUILD_VERSION_ROADMAP.md` v1.1 row: includes "Command Centre" in v1.1 outcomes.
- `BP-04` self-status: "Implemented — Command Centre first functional surface complete".
- `docs/05_design_reference/command-centre-build-prompt.md` self-status: "**DEFERRED** until after functional pages are built. Decision: `DEC-command-centre-deferred`. Resume trigger: After functional pages built and data-point-to-metric schedule complete."
- `.kiro/testing/conformance-registry.md` `DEC-002`: "No Command Centre implementation until data-point-to-metric schedule complete."

**Reading:** The likely reconciliation is that "first functional surface" (BP-04) is a different, narrower scope than the deferred "full" Command Centre build. But neither artifact says so; the deferral and the implementation appear to refer to the same domain. This needs explicit reconciliation.

**Severity:** MEDIUM. Either a real contradiction or an unstated scope boundary.

---

### C-03. Spec #07 register vs. file content

**The contradiction:**
- Source `00_SPECIFICATION_REGISTER_v2_6.md` row #07: names "Universal Search Implementation".
- Source file `07_Drift_and_Rule_Engine_Spec.md`: actual title is "Drift and Rule Engine".

**Status:** Recorded in DECISIONS.md as `DEC-v1.2-Spec07-register-inconsistency`. Both conditions preserved: Kiro spec `34-drift-and-rule-engine` AND `42-universal-search` exist. Decision was to "preserve both"; the source-side inconsistency itself remains.

**Severity:** LOW (mitigated by decision). The conflict still exists in the source baseline; the active layer has worked around it.

---

### C-04. Authority precedence — three statements with different tier counts

**The contradiction:**
- `AGENTS.md`: 9-step authority read order.
- `AUTHORITY_MODEL.md`: 8-tier precedence stack.
- `.kiro/steering/authority-and-precedence.md`: 6-tier authority order.

**Net effect:** The three are non-contradictory in spirit (all put baseline first, external last) but they group layers differently — `AGENTS.md` separates baseline AGENTS source / manifest into distinct steps; `AUTHORITY_MODEL.md` collapses these; the steering file collapses further. A reader cannot tell which is canonical for, say, "is route/menu registry tier 4 (AUTHORITY_MODEL) or part of tier 4 (steering)".

**Severity:** LOW. Operationally the three converge; formally they don't agree on tier numbers. Worth resolving.

---

### C-05. Steering's status — guidance or authority?

**The contradiction:**
- `AUTHORITY_MODEL.md` Kiro authority rules #1: "Steering files are persistent workspace guidance, not independent source authority."
- Same `AUTHORITY_MODEL.md` precedence stack tier 5: places "Kiro steering and specs generated in this pack" inside the precedence ladder, making it authority above tier 6 build packs and tier 7 shells.
- `.kiro/steering/commander-v2-6-doctrine.md` line 1 frontmatter: "inclusion: always" — steering loaded into every prompt.

**Net effect:** Steering is simultaneously declared "not independent source authority" AND placed inside the precedence stack with binding force. In practice steering files are always loaded and Hook 01 explicitly cites them as binding. The "guidance not authority" line is the outlier.

**Severity:** LOW. The operational reality is unambiguous (steering binds); the documented framing is internally inconsistent.

---

### C-06. Source-pack schedule v1.9 vs. current root planning — masters generation mismatch

**The contradiction:**
- `source_SDR_Specification_Schedule_and_Folder_Structure_v1_9.md` cites "Master Technical Specification v6.8, Master Proposition v4.7" and "Specs #01 through #48".
- The current baseline (v2.6.2) under `docs/99_source_archive/baseline_v2_6_2/docs/00_master/` contains Master Tech Spec **v7.0** and Master Proposition **v5.0**, with specs running through #75.
- BUILD_SEQUENCE / BUILD_VERSION_ROADMAP / BP layer all cite v2.6 source authority.

**Net effect:** Two parallel build planning generations in the repo, citing different masters. → Resolved formally below in Finding 1.

**Severity:** HIGH if active; LOW once classified as superseded. See Finding 1.

---

### C-07. UI authority — DS-1.0 vs. design-system-contract steering

**The contradiction (latent):**
- `docs/06_ui_build_reference/DESIGN_SYSTEM.md` (DS-1.0) line 1: "Authoritative. Supersedes ad-hoc styling and the partial v1.3.2 design remediation values where they conflict."
- `.kiro/steering/design-system-contract.md` line 1: "Authority: This is the complete build rulebook for all Commander SDR pages. Every rule documented here with exact Tabler classes and examples. This contract is binding for all future page work."

**Both claim authority over UI build rules.** They are not yet known to contradict on a specific value, but two artifacts with overlapping scope both declaring binding authority is a structural conflict in the making.

**Severity:** LOW now, MEDIUM if unresolved. Precedence between DS-1.0 (the spec) and the design-system-contract steering (the rulebook) is undeclared.

---

### C-08. Page-layout-standard's authority citation may be unresolved

**The contradiction:**
- `.kiro/steering/page-layout-standard.md` line 3: "Authority: DEC-pagecontainer-shared-standard, DEC-pagecontainer-exceptions (DECISIONS.md)."
- Run 1 inventory found that those decision row IDs were **referenced but not pinpoint-verified** in `DECISIONS.md`.

**Net effect:** A binding steering file cites authority by decision ID; whether those decisions are formally recorded in `DECISIONS.md` is uncertain. If they are not, the steering's authority basis is dangling.

**Severity:** LOW–MEDIUM, pending verification.

---

### C-09. CONVERSION_FINDINGS.md generation — v1.1 stamp but cited as live session log

**The contradiction:**
- `docs/00_authority/CONVERSION_FINDINGS.md` line ~3: "Pack version: v1.1; v1.1 remediation applied; no application code generated."
- `docs/00_authority/DAILY_OPERATING_LOOP.md` references "the latest entry in CONVERSION_FINDINGS" (a session-log usage).
- `docs/00_authority/prompts/SESSION_START.md`: "Read the most recent entry in `docs/00_authority/CONVERSION_FINDINGS.md` and report".
- `docs/00_authority/prompts/VERIFY_AND_CLOSE.md`: "Include in CONVERSION_FINDINGS entry … scorecard summary in the canonical format".

**Net effect:** The file's header tags it as a v1.1 conversion-findings document; the operating loop and prompts treat it as a live append-only session log. Either the file has both purposes (no header notes that) or the operating loop is referencing a log that doesn't exist.

**Severity:** MEDIUM. Active prompts depend on this file's role being the latter, but the file presents as the former.

---

## 3. GAPS — governance/planning that should exist but doesn't

### Q1. Is there a secure-coding / RBAC testing gate?

**(RBAC enforced, no hardcoded secrets, input validation, auth on protected routes)**

**Verdict: PARTIAL — expectations exist as guidance; no enforced gate.**

- `.kiro/steering/security-and-testing.md` declares: "No secrets in repo. No real credentials in test fixtures." Lists "RBAC/entitlement tests" and "Audit trail tests" as testing expectations. **This is guidance, not an enforced gate.**
- `.kiro/testing/conformance-registry.md` — the registry I sampled (DSC-001…DSC-005) covers UI design contract and decision records; secure-coding/RBAC assertions were not found in the sampled rows. (Inventory note: the registry was opened to ~line 230; later sections may add such assertions but none were observed.)
- The five enabled hooks cover authority preflight, post-task review, docs change control, doctrinal assertions, and performance compliance. **None covers secure-coding or RBAC enforcement at task-completion time.**
- Phase 2 `T8 Security and privacy` is a Phase 2 transition gate, not continuous.

**Gap:** No equivalent of `Hook 05 — Performance Compliance` for security. There is no postTaskExecution hook that refuses tasks introducing hardcoded secrets, missing input validation, missing auth on protected routes, or RBAC bypass. Given the eleven doctrinal assertions include SOC boundary, Insider Risk, audit trail and tenant isolation, this gate's absence is significant.

---

### Q2. Is there an architectural debt register, distinct from the code debt register?

**Verdict: NO.**

- `docs/00_authority/debt-register.md` declared scope: "single source of truth for **tracked conformance debt**". Sample entry (DEBT-001: Control Plane Font Override) is a code/UI conformance debt item. No architectural debt items.
- No second register dedicated to architectural debt (open architectural decisions, deferred design choices, layer-strategy gaps not yet decided, structural conflicts surfaced but unresolved).
- The PHASE_E_PROPOSAL.md and various deferred decisions in DECISIONS.md represent architectural debt in practice, but they are scattered and not registered as a debt class.

**Gap:** Architectural debt is currently untracked as a class. Items like "BP-15 named Rules Engine + Push Governance but only owns push spec", "Spec 43 has no BP", "Source-pack schedule v1.9 status unresolved", "Translation-layer dependency unfixed" all qualify as architectural debt and should live in a register parallel to the code/conformance debt register.

---

### Q3. Is there a governance PRECEDENCE model — which doc wins when governance/build docs conflict?

**Verdict: PARTIAL — between layers yes; within a layer no; for build-planning tiers no.**

**What exists:**
- Document-layer precedence is stated three ways (see O-01) — they agree in spirit, differ in form.
- `AGENTS.md` and `AUTHORITY_MODEL.md` both define a layer hierarchy (baseline > root programme controls > steering > specs/build packs > prompt library/hooks > shells > external).

**What is missing:**
1. **Within-layer conflict resolution.** When two root-level docs conflict (e.g. BUILD_SEQUENCE doctrine #7 vs. BP-05 status), no rule says which wins.
2. **Within-steering conflict resolution.** When `commander-doctrine.md` and `commander-v2-6-doctrine.md` overlap (or the three UI steering files differ), no rule says which wins.
3. **Build-planning tier precedence.** When `BUILD_SEQUENCE.md` (root) and `BUILD_VERSION_ROADMAP.md` (root) both speak to version banding, no rule says which wins. Same for `build-pack-discipline.md` (steering) vs. either.
4. **DS-1.0 vs. design-system-contract steering.** Latent conflict (C-07) — no rule says which wins.
5. **Source-pack schedule vs. current planning.** No rule (this is what Finding 1 resolves).

**Gap:** A within-layer and tie-breaker precedence rule is needed alongside the existing between-layer one. The brief flags this explicitly; it is real.

---

### Other gaps surfaced during analysis

- **G-04. No completion-gate authority.** Completion gates are scattered: BUILD_SEQUENCE Gate 0 / Gate 1, conformance-registry assertions (DEC-001, DEC-002), Phase 2 entry/exit criteria, BP "stop conditions". No single document defines what "complete" means for each domain and which gate authority applies.
- **G-05. No per-BP dependency map.** BUILD_SEQUENCE names BP-00/01/02, BP-03, BP-13 as gateway packs. The 24 BP packs themselves declare zero inter-pack dependencies. The full prerequisite graph (which BP must precede which) is not declared anywhere.
- **G-06. No completion-status authority.** BP-00, BP-01, BP-03, BP-04 self-declare "Implemented"/"Validated" in their headers. There is no separate authority — registry, audit, or decision — that confirms these claims.
- **G-07. No commit-time enforcement.** Hooks fire on `promptSubmit`, `postTaskExecution`, `fileEdited`. None fires at git pre-commit. Authority and doctrine reach the agent but not the commit.
- **G-08. No artifact-lifecycle policy.** `.kiro/steering/structure.md` says "Do not move source archive files into active authority without a decision record." It does not say the inverse: when an active authority becomes superseded, what is the procedure to retire it? The Finding 1 source-pack schedule is the live example of this gap.
- **G-09. No programme-wide sourcing rule.** `docs/knowledge/SOURCING_RULE.md` locks the knowledge workspace to baseline-only sourcing. Outside the knowledge workspace, no rule prevents other artifacts (BP packs, build packs, future authority docs) from continuing to cite the translation layer as source. This connects to Finding 2.
- **G-10. No translation-layer governance.** The `.kiro/specs/` translation layer has no rule defining when it must be regenerated, how it stays in sync with baseline, or what triggers re-translation. The contamination found in the rationalisation cleanup arose precisely from this gap.
- **G-11. No build-plan provenance trace.** No artifact maps the chain `baseline spec #N → BP-X → Kiro spec folder → completion status`. SPEC_COVERAGE_MATRIX.md gives a partial mapping (baseline spec → Kiro spec), but it does not include BPs or completion status.
- **G-12. AI Build Playbooks v1.7 has no active-layer counterpart.** The source-pack `Commander_SDR_AI_Build_Playbooks_v1_7.md` defines Setup, Build, and Child-Tech-Spec playbooks. There is no derived active-layer playbook in the Kiro pack equivalent. The active equivalents (prompt library + DAILY_OPERATING_LOOP + BP packs) cover similar ground but were not stated as a translation of the playbooks.
- **G-13. No build-state dashboard or single-truth view.** Build status is split: BP self-status, score-register, debt-register, Kiro spec INDEX target version. A reader cannot see "what is the programme building right now and what has shipped" from one place.

---

## 4. PRECEDENCE — formal answer

**Defined:** Between-layer precedence is defined three times (AGENTS.md, AUTHORITY_MODEL.md, authority-and-precedence steering — see O-01 / C-04).

**Not defined:** Within-layer precedence (which steering wins, which root doc wins, which build-planning tier wins) and tie-breaker rules. See Q3 above.

**Required precedence model — minimum specification:**

1. **Layer order** (already stated; consolidate the three statements into one canonical declaration).
2. **Within-root-layer order** — when two root files (BUILD_SEQUENCE, BUILD_VERSION_ROADMAP, AGENTS, DECISIONS, CHANGE_CONTROL) speak to the same subject, which wins? Plausible canonical order: AGENTS > BUILD_SEQUENCE > BUILD_VERSION_ROADMAP > DECISIONS > CHANGE_CONTROL — but this is not stated.
3. **Within-steering order** — when two steering files conflict on a subject, which wins? Plausible answer: more specific scope wins (file-match scoped > always-included), most recent version wins, etc. Not stated.
4. **Build-planning tier order** — when BUILD_SEQUENCE, BUILD_VERSION_ROADMAP, build-pack-discipline steering, BP INDEX, and Kiro spec INDEX disagree on version banding or order: which wins? The BP relationship report established that the active four are layered (roadmap → sequence → discipline → BP); the source-pack schedule v1.9 sits outside this stack. The layered relationship is not stated as precedence.
5. **Source-vs-translation rule** — programme-wide. Currently scoped only to the knowledge workspace.

**Gap acknowledged.** A consolidated precedence document is required, covering (a) document layers, (b) within-layer ties, (c) build-planning tiers, and (d) source vs translation.

---

## 5. ORPHANS — artifacts nothing references, or that reference dead/superseded things

### Orphan-A. `source_SDR_Specification_Schedule_and_Folder_Structure_v1_9.md` (active copy + archived original)

**Form:** References superseded masters (v4.7 / v6.8). No active artifact references it. Fails to cover specs #57–#75. → Resolved formally as **superseded-orphan** in Finding 1.

### Orphan-B. `Commander_SDR_AI_Build_Playbooks_v1_7.md` (in archive's `01_active_build/`)

**Form:** Path label says "active_build" but lives inside the frozen baseline_v2_6_2 archive. No active root artifact, BP, or steering file references it. The folder name `01_active_build/` is misleading — the folder is part of the immutable archive.
**Status:** Archived (immutable per Assertion 7). Effectively orphaned from the active layer; intentionally retained for lineage.

### Orphan-C. `MEMORY.md` (baseline) and `source_MEMORY_v2_6_1.md`

**Form:** Self-described as "context only, not source of truth". Referenced by inventory documents but not consumed for decisions. → **Soft orphan by design.**

### Orphan-D. `docs/00_authority/V1_2_COMPLETENESS_AUDIT.md`

**Form:** Drove v1.2 remediation. v1.2 → v1.3 → v1.3.1 are all complete. Audit's findings are now historic. → **Historic orphan.** Retained for lineage.

### Orphan-E. `docs/00_authority/PHASE_E_PROPOSAL.md`

**Form:** "Planning pass (Phase E not fully specified in repository)". Proposes E1 / E2 / E3 for Spec 06. Not yet referenced from BUILD_SEQUENCE, BP-05, or DECISIONS. → **Draft proposal orphan** — referenced by nothing in the active build chain.

### Orphan-F. `docs/05_design_reference/command-centre-build-prompt.md`

**Form:** DEFERRED. Resume trigger: "data-point-to-metric schedule complete". A "data-point-to-metric schedule" was not found anywhere in the inventory. → **Conditional orphan referencing a non-existent prerequisite.**

### Orphan-G. `.kiro/specs/shell-sidebar-header-rebuild/`

**Form:** Out-of-numbering-band Kiro spec folder (the others are 00–43). Not in BP INDEX, not in BUILD_VERSION_ROADMAP, not in `.kiro/specs/INDEX.md`. References DS-1.0 and Spec #56. Tasks include checked-off items.
**Status:** Either an active hot-fix work item operating outside the normal sequence, or an orphan. → **Structural orphan from the main sequence.**

### Orphan-H. Hook companion files (`.md` and `.json` for hooks 01–04)

**Form:** Three forms exist for hooks 01–04 (`.md`, `.json`, `.kiro.hook`). The `.kiro.hook` is the enabled runtime artifact. The `.md` and `.json` companion files are not declared canonical or non-canonical anywhere. → **Possible orphans relative to the runtime form.**

### Orphan-I. `CHANGELOG_v1_2.md`, `CHANGELOG_v1_3.md`, `CHANGELOG_v1_3_1.md`

**Form:** Historic change records. Do not drive current action. → **Soft orphans by lifecycle.**

### Orphan-J. `CONVERSION_REPORT.md` (root, v1.3.1) vs. `CONVERSION_FINDINGS.md` (00_authority, v1.1)

**Form:** Two conversion narratives. CONVERSION_FINDINGS at v1.1 is three pack-versions out of date. CONVERSION_REPORT at root is current. CONVERSION_FINDINGS is also being used as a live session log per the daily operating loop and prompts. → **Likely overlap-by-supersession with active session-log dual-use** — see C-09.

### Orphan-K. `PACK_MANIFEST.md`

**Form:** v1.3.1 file-list manifest (370 files). Snapshot in time. Files have changed since (knowledge workspace creation post-dates this). → **Stale snapshot orphan.**

### Orphan-L. `docs/01_product/INDEX.md`, `docs/03_data_model/INDEX.md`

**Form:** Single-line index cards in folders that contain only source copies and no derived planning. → **Lightweight folder-shell orphans.**

### Orphan-M. `tests/README.md`

**Form:** Placeholder pointing to `docs/08_phase_2_testing/`. No tests organised in this folder yet relative to what BP-00 / BP-01 / BP-03 / BP-04 declared "tests complete". → **Placeholder orphan; structural mismatch with completion claims.**

### Orphan-N. `KIRO_ONBOARDING.md`

**Form:** First-read instructions. The pack is well past first load. Still active in principle but not consumed in normal session flow. → **Onboarding-only artifact; soft orphan after first onboard.**

---

## FINDING 1 — Source-pack Schedule v1.9: formal classification

**Artifact:** `docs/02_architecture/source_SDR_Specification_Schedule_and_Folder_Structure_v1_9.md` (active copy)
And immutable original: `docs/99_source_archive/baseline_v2_6_2/docs/00_master/SDR_Specification_Schedule_and_Folder_Structure_v1_9.md`

### Evidence

| Evidence point | Source |
|---|---|
| Cites `Master Technical Specification v6.8, Master Proposition v4.7` as its sources | Line ~16 of file |
| Active baseline contains Master Tech Spec **v7.0** and Master Proposition **v5.0** | `docs/99_source_archive/baseline_v2_6_2/docs/00_master/` |
| File's own v2.4 baseline addendum at top: "Active specification set now includes Specs #01 through #48 where present" | Lines 1–11 of file |
| v2.6 baseline contains specs #57–#75 (Security C2, OODA, Intelligence Layer, Attack Surface, Connector Contract, Verdict Semantics, Operating Pictures, Direction Boards, Pre-Warned, Inverse Discovery, Silent Defence Reporting, Drift Prioritisation, Internal Risk) | `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/` listing |
| BUILD_SEQUENCE.md v1.3.1 cites v2.6 source authority — does NOT cite v1.9 | Inventory + BUILD_SEQUENCE.md content |
| BUILD_VERSION_ROADMAP.md v1.1 covers v1.1 → v3.0 themes — does NOT cite v1.9 | Inventory + roadmap content |
| BP-00 through BP-23 cite AGENTS.md + AUTHORITY_MODEL.md + v2.6 source files — none cite v1.9 | Inventory + BP relationship report |
| `.kiro/steering/build-pack-discipline.md` doctrine — does NOT cite v1.9 | Inventory |
| No active artifact in the build layer references v1.9 schedule | Cross-check across the inventory's build-planning category |
| File is in `docs/02_architecture/` rather than `docs/04_build_packs/` — not in the active build layer's folder | Repo structure |

### Classification

**SUPERSEDED-ORPHAN within the active build layer. Retained for lineage per Commander Assertion 7 (Baseline immutability).**

### Reasoning

1. The schedule's authoritative basis (v6.8 / v4.7 masters) has been replaced by v7.0 / v5.0. The v2.6 baseline's whole "Security Command and Control" framing (specs #57–#62 plus surfaces #65–#75) post-dates and supersedes the schedule's scope of #01–#48.
2. The active build planning artifacts (BUILD_SEQUENCE v1.3.1, BUILD_VERSION_ROADMAP v1.1, build-pack-discipline steering, BP-00 through BP-23) cite v2.6 source authority and do not consume v1.9.
3. The schedule's v2.4 addendum explicitly bounds it at spec #48, which excludes the v2.6-introduced spec set entirely.
4. The schedule is therefore not a parallel authority. It is the prior generation's planning artifact, succeeded by the v2.6-aligned active stack.

### Required record

A decision-record entry should mark the schedule as superseded by the active stack. Plausible identifier `DEC-source-pack-schedule-v1_9-superseded`. Per `.kiro/steering/structure.md` ("Do not move source archive files into active authority without a decision record"), the inverse retirement also benefits from a decision record. The active copy at `docs/02_architecture/source_…v1_9.md` should retain a header note pointing to the supersession; the immutable archive copy at `docs/99_source_archive/baseline_v2_6_2/docs/00_master/` is preserved unchanged per Assertion 7.

(Recording the action only, not taking it. Awaiting Run 3.)

---

## FINDING 2 — Translation-layer dependency: structural finding

**Artifact pattern:** All 24 BP build packs (`docs/04_build_packs/bp-00…bp-23`) declare "Owning Kiro specs" pointing exclusively to `.kiro/specs/00…43-…/`.

### Evidence

| Evidence point | Source |
|---|---|
| BP-00 owning specs list: `.kiro/specs/00-programme-foundation` | bp-00 file |
| BP-03 owning specs list: `.kiro/specs/03-seed-data-and-test-fixtures`, `.kiro/specs/04-data-model-canonical-entities` | bp-03 file |
| BP-04 owning specs list: `.kiro/specs/05-command-centre`, `.kiro/specs/20-commander-ai-core` | bp-04 file |
| BP-09 owning specs list: `.kiro/specs/09-asset-intelligence`, `.kiro/specs/10-identity-intelligence` | bp-09 file |
| BP-13 owning specs list: `.kiro/specs/16-connector-framework`, `.kiro/specs/17-mock-connectors` | bp-13 file |
| BP-18 owning specs list: `.kiro/specs/13-security-c2` | bp-18 file |
| BP-23 owning specs list: `.kiro/specs/30-phase3-…`, `.kiro/specs/32-platform-…` | bp-23 file |
| BP packs cite source authority generally ("relevant source docs in `docs/99_source_archive/baseline_v2_6_2/`") but never cite a specific baseline spec #N | Common boilerplate in all 24 BP files |
| Knowledge-workspace sourcing rule: `.kiro/specs/` (00–43) is **not authority** for knowledge work | `docs/knowledge/SOURCING_RULE.md` |
| Translation-layer contamination already proven: `.kiro/specs/10-identity-intelligence/` was translated from baseline #68; `.kiro/specs/09-asset-intelligence/` from baseline #69; and the misnumbering caused the rationalisation reset | Conversation history (Priority-1 remediation correction) |

### Architectural implication

When the build executes, a BP-X reads its "Owning Kiro specs" list and consumes those translation-layer files for implementation depth. If a translation file misnumbers, mistranslates, or omits baseline content, the BP layer executes against the misrepresentation, not against baseline truth. This is the same failure mode the knowledge workspace was created to isolate — but the BP layer still operates inside it.

### Resolution (record only — do not fix here)

**Architectural finding registered.** Required when clean rationalisation and build rebaseline happen:

1. The BP packs' "Owning Kiro specs" list should be reframed. Either:
   - Replaced by a list of source-derived specs (a clean parallel to `.kiro/specs/` produced under SOURCING_RULE discipline), OR
   - Augmented to cite both the baseline spec #N and the translation folder, with the baseline spec being the authority and the translation being the working-copy reference.
2. A programme-wide variant of the knowledge-workspace SOURCING_RULE should be promulgated so the same discipline applies to BP packs (this also addresses gap G-09).
3. Translation-layer governance (gap G-10) should define when translation files are regenerated from baseline, who validates the regeneration, and what the trigger conditions are.
4. Until those conditions are met, every BP pack execution inherits the translation-layer contamination risk. The `.kiro/specs/` folder cannot be treated as source authority for execution any more than it can for knowledge work.

(Recording, not fixing. Resolution sits in Run 3 / Part 2 / build rebaseline.)

---

## END OF MAP (Run 2 of 3)

Build-plan reconciliation, the single-vs-multiple-schedules question, and recommendations are deferred to Part 2. This run was analysis only.
