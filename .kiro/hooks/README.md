# Kiro Hooks — Commander SDR

This folder contains the runtime hooks that automate authority, doctrine, performance, and sourcing-rule enforcement across Commander SDR work. Hooks enforce Commander authority; they do not replace it.

---

## Canonical-relationship declaration

Three file forms exist in this folder. Their relationship is binding:

| Form | Role | Authority |
|---|---|---|
| `*.kiro.hook` | **Canonical runtime form.** This is what Kiro loads and executes. The `enabled`, `when`, `then`, and full `prompt` fields are the active definition. | Authoritative. If forms diverge in semantic content, the `.kiro.hook` wins. |
| `0N-*-hook.json` | **Metadata mirror.** Verbatim copy of the runtime prompt body for tooling and inspection. Reserved for indexing, diffing, and registry tooling. | Non-authoritative. Must be kept in sync with the runtime by hand or by tooling — divergence is a finding. |
| `0N-*-hook.md` | **Recipe sketch.** Short paraphrase of the hook's intent for human readers. Lighter than the runtime; not the canonical prompt text. | Non-authoritative. Cannot define hook behaviour. |

**Rules:**

- The `.kiro.hook` runtime file is the only file Kiro reads at run time.
- If the `.json` companion drifts from the runtime, treat it as a tooling defect and re-sync; do not treat it as alternative authority.
- The `.md` recipe is documentation only. It is never the source of hook behaviour.
- Hooks created via `createHook` produce only the `.kiro.hook` runtime form. Companion `.md` and `.json` files exist for hooks 01–04 from earlier hand-authored creation. Hooks 05 and later were created via `createHook` and have the runtime form only — that is by design and not a debt.

This declaration closes governance-map finding **O-05** and architectural finding **F-30** (proposed `ARCH-DEBT-029`).

---

## Hook inventory

| File | Hook name | Event | Enabled |
|---|---|---|---|
| `authority-preflight-hook.kiro.hook` | Authority Preflight | `promptSubmit` | yes |
| `post-task-review-hook.kiro.hook` | Post-Task Review | `postTaskExecution` | yes |
| `docs-change-control-hook.kiro.hook` | Docs Change Control | `fileEdited` (authority + steering + archive patterns) | yes |
| `doctrinal-assertions-check.kiro.hook` | Doctrinal Assertions Check | `postTaskExecution` | yes |
| `05-performance-compliance.kiro.hook` | Performance Compliance | `postTaskExecution` | yes |
| `secure-coding-rbac-enforcement.kiro.hook` | Secure-Coding and RBAC Enforcement | `postTaskExecution` | yes |
| `arch-debt-auto-propose.kiro.hook` | Architectural Debt Auto-Propose | `postTaskExecution` | yes |
| `translation-layer-leak-prevention.kiro.hook` | Translation-Layer Authority-Leak Prevention | `fileEdited` (knowledge / authority / build-pack / rebaseline patterns) | yes |
| `knowledge-workspace-sourcing-rule.kiro.hook` | Knowledge-Workspace Sourcing-Rule Enforcement | `fileEdited` (`docs/knowledge/**/*.md`) | yes |

The five `postTaskExecution` hooks fire in sequence after every task: Post-Task Review (general 10-point check), Doctrinal Assertions Check (eleven assertions), Performance Compliance (PD-1.0 scorecards), Secure-Coding and RBAC Enforcement (SEC-001..006 + RBAC-001..004), and Architectural Debt Auto-Propose (propose-don't-write debt entries). They are layered, not redundant — see `docs/knowledge/HOOK_RECONCILIATION.md` for the overlap analysis.

---

## Commit-time enforcement

Kiro hooks have **no native git pre-commit event**. The repository complements the Kiro hook layer with a git pre-commit script at `.githooks/pre-commit` that performs the commit-time conformance subset:

- Detects translation-layer citations in staged knowledge / authority / build-pack / rebaseline files.
- Detects forbidden-source citations in staged `docs/knowledge/` files.
- Detects high-entropy hardcoded-secret patterns and `BEGIN PRIVATE KEY` blocks in any staged file.

The script lives outside `.git/hooks/` so it can be version-controlled. To activate it locally:

```
git config core.hooksPath .githooks
```

Once activated, `git commit` runs the script automatically. It is non-destructive — it refuses commits with violations rather than modifying files. Closes governance-map finding **G-07**.

---

## Adding new hooks

Use the `createHook` tool when working through Kiro. It produces only the canonical `.kiro.hook` form, which matches the declaration above. Do not hand-author `.md` or `.json` companions for new hooks unless you also intend to maintain them.

**Audit reference:** `docs/knowledge/HOOK_RECONCILIATION.md`.
