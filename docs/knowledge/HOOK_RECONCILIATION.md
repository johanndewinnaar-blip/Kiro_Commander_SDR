# Hook Reconciliation — Audit and Map

**Status:** Audit-only. No hooks created, edited, or enabled. No changes made to the hooks layer.
**Date:** 30 May 2026
**Sources read in this audit:**
- `.kiro/hooks/` directory listing (full)
- All five runtime `.kiro.hook` files
- All four `.md` recipe companions (01–04)
- All four `.json` metadata companions (01–04)
- `.kiro/hooks/README.md`
- Cross-reference: `docs/knowledge/GOVERNANCE_MAP.md` (gaps Q1, G-07; overlap O-05; orphan Orphan-H)
- Cross-reference: `docs/knowledge/ARCHITECTURAL_FINDINGS.md` (F-30 hook companion canonical relationship)
- Cross-reference: `.kiro/steering/feature-function-backlog.md` (backlog and architectural-debt commands)
- Cross-reference: `.kiro/steering/core-testing-commands.md` (testing pipeline triggering)

---

## PART 1 — Inventory

### 1.1 Files present in `.kiro/hooks/`

| File | Form |
|---|---|
| `01-authority-preflight-hook.md` | recipe (brief paraphrase) |
| `01-authority-preflight-hook.json` | metadata companion |
| `02-post-task-review-hook.md` | recipe |
| `02-post-task-review-hook.json` | metadata companion |
| `03-docs-change-control-hook.md` | recipe |
| `03-docs-change-control-hook.json` | metadata companion |
| `04-doctrinal-assertions-check-hook.md` | recipe |
| `04-doctrinal-assertions-check-hook.json` | metadata companion |
| `authority-preflight-hook.kiro.hook` | **runtime** (Hook 01) |
| `post-task-review-hook.kiro.hook` | **runtime** (Hook 02) |
| `docs-change-control-hook.kiro.hook` | **runtime** (Hook 03) |
| `doctrinal-assertions-check.kiro.hook` | **runtime** (Hook 04) |
| `05-performance-compliance.kiro.hook` | **runtime** (Hook 05) |
| `README.md` | folder note |

**Five runtime hooks. All five enabled.** Hooks 01–04 each have three forms (`.md` recipe, `.json` metadata, `.kiro.hook` runtime). Hook 05 has only the runtime form — no recipe or metadata companion.

### 1.2 Per-hook detail

#### Hook 01 — Authority Preflight

- **Runtime file:** `authority-preflight-hook.kiro.hook`
- **Event:** `promptSubmit` (fires before every prompt)
- **Action type:** `askAgent`
- **Enabled:** `true`
- **Version:** `"1"` (runtime); `1.0.0` (JSON companion)
- **What it does:** Adds five preflight checks to every prompt — refuses prompts that request app code, live AWS resources, real vendor APIs, billing implementation, or custom Kiro powers / n8n unless explicit owner approval is present in the conversation. Also requires confirmation that the agent has read AGENTS.md, AUTHORITY_MODEL.md, the authority read order, and active steering files.
- **Companions:** `.md` recipe (brief paraphrase, single sentence); `.json` metadata (verbatim prompt match with the runtime).
- **Source steering:** AGENTS.md prime directive; `.kiro/steering/authority-and-precedence.md`.

#### Hook 02 — Post-Task Review

- **Runtime file:** `post-task-review-hook.kiro.hook`
- **Event:** `postTaskExecution`
- **Action type:** `askAgent`
- **Enabled:** `true`
- **Version:** `"1"` (runtime); `1.0.0` (JSON companion)
- **What it does:** Runs a 10-point compliance checklist after every task. Checks: authority precedence; no premature app code; no invented doctrine; baseline citation; route registry compliance; SOC boundary; Insider Risk boundary; C2/SDR/Commander distinction; AWS/API/billing side effects; audit trail.
- **Companions:** `.md` recipe; `.json` metadata (verbatim prompt match with the runtime).

#### Hook 03 — Docs Change Control

- **Runtime file:** `docs-change-control-hook.kiro.hook`
- **Event:** `fileEdited`
- **Action type:** `askAgent`
- **Patterns:** `docs/00_authority/**/*.md`, `docs/99_source_archive/**/*`, `AGENTS.md`, `BUILD_SEQUENCE.md`, `DECISIONS.md`, `CHANGELOG_*.md`, `.kiro/steering/**/*.md`
- **Enabled:** `true`
- **Version:** `"1"` (runtime); `1.0.0` (JSON companion)
- **What it does:** When a controlled document is edited, runs four change-control checks: baseline immutability (refuses edits to archived baseline content); doctrine change detection (requires DECISIONS.md update if doctrine changes); changelog requirement; authority source citation.
- **Companions:** `.md` recipe; `.json` metadata (verbatim prompt match with the runtime; same patterns).

#### Hook 04 — Doctrinal Assertions Check

- **Runtime file:** `doctrinal-assertions-check.kiro.hook`
- **Event:** `postTaskExecution`
- **Action type:** `askAgent`
- **Enabled:** `true`
- **Version:** `"1"` (runtime); `1.0.0` (JSON companion)
- **What it does:** Verifies the completed task does not violate any of the eleven Commander doctrinal assertions before marking complete. Refuses to mark complete on violation; requires clarification entry in spec or DECISIONS.md.
- **Companions:** `.md` recipe; `.json` metadata (verbatim prompt match with the runtime).

#### Hook 05 — Performance Compliance

- **Runtime file:** `05-performance-compliance.kiro.hook`
- **Event:** `postTaskExecution`
- **Action type:** `askAgent`
- **Enabled:** `true`
- **Version:** `1.0`
- **What it does:** Enforces PD-1.0 performance doctrine on every task. Detects affected layers, invokes the scorecard runner if it exists (or applies interim manual discipline against layer strategy documents if not), applies the four-band classification, compares to previous scorecard, makes a PASS/FLAG/FAIL decision, hard-refuses tasks introducing new Red units or regressions past tolerance.
- **Companions:** none — only the runtime form exists.

---

## PART 2 — Coverage map

For each governance area the project now requires, an explicit assessment of whether automatic hook enforcement exists.

| # | Governance area | Hook exists? | Hook | Notes |
|---:|---|:---:|---|---|
| 1 | Authority preflight (before prompts) | **Y** | Hook 01 | `promptSubmit` event; refuses unauthorised scope categories |
| 2 | Doctrinal assertions check (post-task) | **Y** | Hook 04 | All 11 assertions enumerated and verified post-task |
| 3 | Docs change control (on edit) | **Y** | Hook 03 | `fileEdited` patterns cover authority docs, archive, AGENTS, BUILD_SEQUENCE, DECISIONS, CHANGELOG, steering |
| 4 | Performance compliance (post-task) | **Y** | Hook 05 | Per `.kiro/steering/performance-discipline.md`; PASS/FLAG/FAIL decision rule |
| 5 | Post-task review (general 10-point checklist) | **Y** | Hook 02 | Authority/citation/registry/boundary/audit checks |
| 6 | Secure-coding / RBAC enforcement (post-task) | **N** | — | **GAP — flagged in `GOVERNANCE_MAP.md` Q1.** No equivalent of Hook 05 for security: no postTaskExecution hook refuses tasks introducing hardcoded secrets, missing input validation, missing auth on protected routes, or RBAC bypass. Currently soft-guidance via `.kiro/steering/security-and-testing.md` and Phase 2 transition gates only. The 11 doctrinal assertions in Hook 04 cover SOC boundary, Insider Risk, audit trail, surface attribution — but do **not** cover code-level secure-coding/RBAC enforcement. |
| 7 | Commit-time enforcement (git pre-commit) | **N** | — | **GAP — flagged in `GOVERNANCE_MAP.md` G-07.** All five hooks fire on `promptSubmit`, `postTaskExecution`, or `fileEdited`. None fires at git pre-commit. Authority and doctrine reach the agent but not the commit. |
| 8 | Architectural Debt Register auto-logging | **N** | — | **By-design manual at present.** When a task or audit surfaces structural debt, nothing auto-captures it to `docs/knowledge/ARCHITECTURAL_DEBT_REGISTER.md`. The `log architectural debt …` command (per `.kiro/steering/feature-function-backlog.md`) is owner-invoked. ARCHITECTURAL_FINDINGS.md §8.2 lists 21 proposed ARCH-DEBT-009..029 entries that require owner-invoked logging. **Worth flagging for owner decision** — see Part 4. |
| 9 | Feature/Function Backlog auto-logging | **N (by design — confirmed)** | — | Manual via `this is a new backlog item …` / `register this backlog item …` per the steering. The backlog is owner-curated for capture and forming. **Not a gap.** |
| 10 | Conformance registry / testing pipeline triggering | **N (steering-driven, command-invoked)** | — | The pipeline (per `.kiro/steering/core-testing-commands.md`) is invoked by typed commands (`run core testing [scope]`, `test my last build`, `show audit scores`, etc.). No hook fires the pipeline automatically. **By design** — the pipeline is heavyweight and sweep-based, not per-task. |
| 11 | Translation-layer authority-leak prevention | **N** | — | **Risk-vector gap.** `ARCH-DEBT-001` records that the previous build packs sourced depth from `.kiro/specs/`. No hook prevents a new artefact (BP, build pack, knowledge-workspace document) from citing the translation layer as source. Hook 02 #4 (Baseline citation) is general, not translation-layer-specific. **Worth flagging.** |
| 12 | Knowledge-workspace sourcing-rule enforcement | **N** | — | The locked `docs/knowledge/SOURCING_RULE.md` binds knowledge work to baseline source authority only. Hook 03 covers edits to `docs/00_authority/**`, archive, etc., but not `docs/knowledge/**`. Edits to the knowledge workspace are not gated. **Worth flagging.** |
| 13 | Spec-format diagnostics on `.kiro/specs/**/*.md` | **N** | — | The Kiro Spec Format diagnostics provider (per system context for spec workflows) raises diagnostics; no hook auto-fixes or enforces them. **By design — diagnostics surface in the spec workflow rather than via a hook.** Not a gap. |
| 14 | Hook companion canonical-relationship declaration | **N** | — | `ARCHITECTURAL_FINDINGS.md` F-30 / proposed `ARCH-DEBT-029`: hooks 01–04 have three forms with no canonical-relationship declaration. The `.md` recipes are brief paraphrases; the `.json` companions are runtime-equivalent. The runtime `.kiro.hook` files name themselves but no document declares them canonical. README.md doesn't say so explicitly. |

**Coverage summary.** Five governance areas have automatic enforcement (1, 2, 3, 4, 5). Three areas have **gap** with explicit governance-map authority (6 = Q1; 7 = G-07; 8 / 11 / 12 = additional risk vectors surfaced here). Two areas are **by-design manual** and not gaps (9, 10). One is **by-design surfaced via diagnostics** (13). One is the canonical-relationship declaration item (14).

---

## PART 3 — Overlaps and conflicts

### 3.1 Multiple hooks firing on the same event

#### `postTaskExecution` — three hooks fire (Hook 02, Hook 04, Hook 05)

When a task completes, three hooks fire in sequence:

| Hook | What it checks |
|---|---|
| **Hook 02 Post-Task Review** | 10-point compliance checklist (authority, citation, boundary, audit) |
| **Hook 04 Doctrinal Assertions Check** | 11 doctrinal assertions; refuses task completion on violation |
| **Hook 05 Performance Compliance** | Layer scorecards; PASS/FLAG/FAIL; refuses on Red regression |

**Overlap analysis (subject-by-subject):**

| Subject | Hook 02 | Hook 04 | Verdict |
|---|:---:|:---:|---|
| Authority precedence respect | #1 | (implicit) | Mostly Hook 02 |
| Premature app code | #2 | (implicit via assertion 1 closed-loop) | **Overlap** with Hook 01 (different event) |
| Invented doctrine / new connector classes / new streams / new disciplines | #3 | #9 four-stream integrity, #11 connector classes | **Overlap** — both flag invented doctrine in different framings |
| Baseline citation | #4 | (implicit via #7 baseline immutability) | Mostly Hook 02 |
| Route registry compliance | #5 | #5 registry-driven runtime | **Overlap** — both check registry use |
| SOC boundary | #6 | #8 | **Direct overlap** — same assertion, different framing |
| Insider Risk boundary | #7 | (covered by #9 + Spec #75) | **Partial overlap** |
| C2/SDR/Commander distinction | #8 | (covered implicitly across assertions) | Mostly Hook 02 |
| AWS / API / billing side effects | #9 | (covered by Hook 01 preflight more strongly) | Mostly Hook 02 |
| Audit trail | #10 | (covered by audit-first doctrine) | Mostly Hook 02 |
| Performance regression | — | — | Only Hook 05 |
| Closed-loop case model | — | #1 | Only Hook 04 |
| P0 priority overlay | — | #2 | Only Hook 04 |
| Three-application boundary | — | #3 | Only Hook 04 |
| Shell as reference, not inventory | — | #4 | Only Hook 04 |
| Reference-input boundary | — | #6 | Only Hook 04 |
| Baseline immutability | — | #7 (also Hook 03 #1 on edit) | Only Hook 04 at task completion |
| Surface attribution | — | #10 | Only Hook 04 |
| Verdict semantics | — | #11 | Only Hook 04 |

**Verdict on the postTaskExecution stack:** the three hooks are **layered, not redundant**. Hook 02 is the general-compliance-and-citation lens; Hook 04 is the eleven-doctrine-assertion lens; Hook 05 is the performance lens. There is some genuine duplication on SOC boundary (Hook 02 #6 ↔ Hook 04 #8), invented doctrine (Hook 02 #3 ↔ Hook 04 #9, #11), and registry compliance (Hook 02 #5 ↔ Hook 04 #5). Three askAgent prompts firing per task is also a **prompt-burden cost**: each post-task event triggers three large structured askAgent invocations.

#### `fileEdited` — single hook (Hook 03), no overlap

Only Hook 03 fires on `fileEdited`. No conflict.

#### `promptSubmit` — single hook (Hook 01), no overlap

Only Hook 01 fires on `promptSubmit`. No conflict.

### 3.2 Companion-vs-runtime drift (the GOVERNANCE_MAP O-05 finding)

The governance map flagged that hooks 01–04 each have three forms with no declaration of which is canonical. Comparing them in this audit:

| Hook | `.md` recipe vs runtime | `.json` metadata vs runtime |
|---|---|---|
| 01 | **Drift** — `.md` is a one-sentence paraphrase: *"Before acting, check whether the prompt asks for app code, live AWS resources, real vendor APIs, billing, custom Kiro powers or n8n. If yes, block or warn unless explicit owner approval is present. Always follow AGENTS.md and docs/00_authority/AUTHORITY_MODEL.md."* — runtime is the full five-point check. The `.md` is a recipe sketch, not the canonical text. | **Match** — verbatim same prompt body. Differences only: JSON `version: "1.0.0"`, runtime `version: "1"`; JSON has no `enabled` field, runtime has `enabled: true`. |
| 02 | Same pattern as 01 — `.md` is the recipe sketch, runtime is the canonical 10-point checklist. | **Match** — verbatim prompt body, same version/enabled difference. |
| 03 | Same pattern. | **Match** — verbatim prompt body, same patterns list, same version/enabled difference. |
| 04 | Same pattern. | **Match** — verbatim prompt body, same version/enabled difference. |
| 05 | n/a — no `.md` companion exists. | n/a — no `.json` companion exists. |

**Conclusion:** the `.json` companions are runtime-equivalent in prompt content (verbatim) and differ only in `version` formatting and the absence of an `enabled` flag in the JSON. The `.md` recipes are intentionally lighter "recipe sketches"; they are **not** the canonical text. There is no formal declaration that the `.kiro.hook` is canonical, the `.json` is a metadata mirror, and the `.md` is a recipe sketch — but treating them that way is internally consistent. The drift is in form (recipe lighter than runtime), not in semantic content for the JSON pair.

### 3.3 Naming inconsistency

Runtime files use two naming patterns:

| Hook | Runtime filename | Numbered prefix? |
|---|---|---|
| 01 | `authority-preflight-hook.kiro.hook` | No |
| 02 | `post-task-review-hook.kiro.hook` | No |
| 03 | `docs-change-control-hook.kiro.hook` | No |
| 04 | `doctrinal-assertions-check.kiro.hook` | No (also note: `-hook` suffix omitted) |
| 05 | `05-performance-compliance.kiro.hook` | **Yes** (with prefix) |

Hook 05 is the only runtime file with a numbered prefix and is also the only one named differently from its companions (because it has none). Cosmetic but worth noting.

### 3.4 Verdict

- No outright **conflict** (no hooks contradict each other on action).
- One real **overlap**: Hook 02 #6 ↔ Hook 04 #8 SOC boundary; Hook 02 #5 ↔ Hook 04 #5 registry compliance; Hook 02 #3 ↔ Hook 04 #9, #11 invented doctrine. These could be deduplicated if prompt-burden becomes a concern.
- The companion-vs-runtime relationship is **internally consistent in practice** but **not formally declared** anywhere. Recorded in `ARCHITECTURAL_FINDINGS.md` F-30 (proposed `ARCH-DEBT-029`).
- One **naming inconsistency** between runtime files for hooks 01–04 vs hook 05.

---

## PART 4 — Gaps and recommendations

Recommendations only — no actions taken. Each entry includes the suggested event, the suggested action, what it should do, and the priority. The owner decides whether to register, draft, enable.

### Gap 1 — Secure-coding / RBAC post-task hook (HIGH priority)

- **Authority for the gap:** `GOVERNANCE_MAP.md` Q1; eleven doctrinal assertions reference SOC boundary, Insider Risk, audit trail, tenant isolation but no hook enforces them at code-implementation time.
- **Suggested event:** `postTaskExecution`
- **Suggested action type:** `askAgent`
- **What it should do:** Refuse tasks that introduce: hardcoded secrets, credentials, or tokens; missing input validation on user-facing or API-facing inputs; missing auth on protected routes; RBAC bypass on backend/API operations; logging of secrets to console or files; insecure dependencies surfaced by the package manager. Pattern: structured PASS/FLAG/FAIL similar to Hook 05.
- **Why now (vs Phase 2):** even though Phase 0 is documentation-only, the moment any code is authorised this gap goes live. Ideally drafted now and enabled the day code authorisation begins.
- **Priority:** HIGH for any future code work; LOW for current documentation work.

### Gap 2 — Commit-time enforcement (MEDIUM priority)

- **Authority for the gap:** `GOVERNANCE_MAP.md` G-07.
- **Constraint:** Kiro hooks support `fileEdited`, `fileCreated`, `fileDeleted`, `userTriggered`, `promptSubmit`, `agentStop`, `preToolUse`, `postToolUse`, `preTaskExecution`, `postTaskExecution` (per the system hook event list). **There is no native git pre-commit event in Kiro hooks.**
- **Suggested approach:** install a git pre-commit hook (outside Kiro hooks) that runs the project's lint, type, and test gates before commit. Document in `.kiro/steering/execution-discipline.md` (already mentions "Tests before commit"). The Kiro hooks layer cannot natively gate `git commit`; this gap needs a git-side hook.
- **Priority:** MEDIUM. Useful when code work begins; not blocking now.

### Gap 3 — Architectural Debt Register auto-logging (MEDIUM priority — owner decision)

- **Authority for the gap:** `ARCHITECTURAL_FINDINGS.md` §8.2 lists 21 proposed `ARCH-DEBT-009..029` items; the existing `log architectural debt` command is owner-invoked.
- **Question for the owner:** should a `postTaskExecution` hook auto-detect when a task surfaces structural debt (a finding flagged in audit output, a GAP in source coverage, a contradiction discovered) and either propose registration or auto-register it?
- **Trade-off:** auto-registration risks register noise (every minor finding becomes an entry); manual registration risks findings being lost.
- **Suggested compromise:** a `postTaskExecution` hook that **proposes** a register entry when output contains words like "structural debt," "GAP," "supersession-uncleared," "register-file mismatch," but does not auto-write. It returns: *"This task surfaced a candidate architectural debt entry: '<title>'. Run `log architectural debt …` to register it."* The owner runs the command if appropriate.
- **Priority:** MEDIUM. Improves debt-capture discipline without forcing register noise.

### Gap 4 — Translation-layer authority-leak prevention (HIGH priority)

- **Authority for the gap:** `ARCH-DEBT-001`. The previous Phase 1–6 contamination traced to BPs sourcing from `.kiro/specs/`. The risk vector is live.
- **Suggested event:** `fileEdited`
- **Suggested action type:** `askAgent`
- **Patterns:** `docs/04_build_packs/**/*.md`, `docs/knowledge/**/*.md`, any BP authoring location
- **What it should do:** Scan the edited file for citations of the form `.kiro/specs/` or for Kiro-spec folder numbers `00`–`43` being treated as baseline spec numbers. If found, flag as a translation-layer authority leak and require either (a) re-pointing to the baseline `#N` source, or (b) explicit acknowledgement that this is a derived translation layer reference and not a citation. Refuses if the file is in `docs/knowledge/` (the locked sourcing rule).
- **Priority:** HIGH. Prevents recurrence of the contamination that necessitated this entire knowledge-graph rebuild.

### Gap 5 — Knowledge-workspace sourcing-rule enforcement (HIGH priority)

- **Authority for the gap:** `docs/knowledge/SOURCING_RULE.md` (locked).
- **Suggested event:** `fileEdited`
- **Suggested action type:** `askAgent`
- **Patterns:** `docs/knowledge/**/*.md` (excluding `_superseded/`)
- **What it should do:** When a knowledge-workspace document is edited, verify that all citations are baseline filenames and `#N §section` references. Flag any citation that points to `.kiro/specs/`, to `docs/02_architecture/`, to derived/translated sources, or to `_superseded/`. Same authority basis as Gap 4 but tighter scope.
- **Priority:** HIGH. The sourcing rule is locked and binding; an edit hook makes it enforceable rather than aspirational.

### Gap 6 — Hook companion canonical-relationship declaration (LOW priority — documentation)

- **Authority for the gap:** `ARCHITECTURAL_FINDINGS.md` F-30 (proposed `ARCH-DEBT-029`); `GOVERNANCE_MAP.md` O-05.
- **Suggested action:** add a one-paragraph note to `.kiro/hooks/README.md` declaring: *"The `.kiro.hook` file is the canonical runtime form. The `.json` companion is a metadata mirror with verbatim prompt body and is reserved for tooling. The `.md` companion is a recipe sketch — lighter than the runtime — used as documentation. If they diverge in semantic content, the `.kiro.hook` wins. Hook 05 has only the runtime form because the recipe and metadata layers were not maintained for it."*
- **Priority:** LOW. Pure documentation; resolves the orphan-companion ambiguity recorded in F-30.

### Gap 7 — Prompt-burden review on `postTaskExecution` (LOW priority — efficiency)

- **Concern:** three hooks (02, 04, 05) fire on `postTaskExecution`. Each is a large structured `askAgent`. Per-task cost is real.
- **Suggested action:** keep all three (none is redundant in coverage), but consider:
  - Consolidate the three hook prompts into a single `postTaskExecution` hook with three sections internally (Compliance / Doctrinal Assertions / Performance Compliance).
  - Or scope Hook 02 / Hook 04 to fire only when the task touched specific file patterns (avoid running them on pure-prose documentation tasks where most checks are inapplicable).
- **Priority:** LOW. Cost-efficiency, not correctness.

### Gap 8 — Naming inconsistency between runtime hook files (LOW priority — cosmetic)

- Hook 05 uses prefix `05-performance-compliance.kiro.hook`; hooks 01–04 use unprefixed names.
- **Suggested action:** rename hooks 01–04 runtime files to numbered prefix form for consistency, **OR** rename Hook 05 to drop the prefix. Either way, document the convention in `.kiro/hooks/README.md`.
- **Priority:** LOW. Cosmetic.

---

## Summary

| Category | Count | Notes |
|---|---:|---|
| Hooks present (runtime, enabled) | 5 | 01 Authority Preflight, 02 Post-Task Review, 03 Docs Change Control, 04 Doctrinal Assertions Check, 05 Performance Compliance |
| Companion forms (`.md` + `.json`) | 8 | Hooks 01–04 each have both; Hook 05 has neither |
| Governance areas covered | 5 | Items 1–5 in Part 2 |
| Confirmed gaps (governance map authority) | 3 | Q1 secure-coding/RBAC; G-07 commit-time; companion-canonical-declaration |
| Additional gaps surfaced by this audit | 4 | Translation-layer leak prevention; knowledge-workspace sourcing-rule enforcement; arch-debt auto-logging; postTaskExecution prompt burden |
| By-design manual (not gaps) | 3 | Feature/Function Backlog; Conformance pipeline; Spec-format diagnostics |
| Overlaps without conflict | 3 | SOC boundary; registry compliance; invented doctrine — Hook 02 ↔ Hook 04 |
| Conflicts | 0 | No hook contradicts another |
| Recommendations for owner decision | 8 | Gap 1 through Gap 8 in Part 4 |

**No hooks created. No hooks edited. No hooks enabled. No changes made to `.kiro/hooks/`.**

The audit and map are complete. The owner reviews before any hook is created or changed.
