---
inclusion: always
---

# Execution Discipline Steering

Standing rules for all build execution in this programme. These apply regardless of whether a prompt template is used.

## Token architecture

- All UI work uses the three-layer token system: primitive → semantic → component.
- Zero hardcoded colour, spacing, radius, or typography values in component or page code. Ever.
- Tweak passes propagate at the token/semantic level. If a value should be global, change the token — never patch individual pages with the same literal.
- Charts use `--data-*` semantic tokens exclusively. No literal hex values in chart specifications.

## Testing

- Tests before commit. Run the full suite from repo root. Zero regressions tolerated.
- New logic requires new tests. Untested logic does not ship.

## Context-limit behaviour

- On context-limit approach: commit all complete, tested work and stop cleanly with a status report.
- Never leave half-built or uncommitted work. Partial progress that passes tests is acceptable; broken state is not.

## UI verification

- At the end of any phase or pass that changes a UI surface: run the dev server and provide the local URL (typically `http://localhost:3000`).

## Agent mode

- Main-agent execution by default. Sub-agents only when explicitly requested by the owner.
- Follow the authority read order in AGENTS.md before any change.
- If a hook or guardrail refuses an action, stop and report. Do not work around it.

## Scoped-read pre-flight discipline

For READY unit execution, Kiro MUST use scoped reads by default. The large governance state documents (`REBASELINED_BUILD_SEQUENCE.md`, `ARCHITECTURAL_DEBT_REGISTER.md`, `DATA_DICTIONARY.md`) are read by section/line-range or by targeted grep — never wholesale — unless a documented exception below applies. This reduces conveyor context loading; it does not change what is enforced.

**Scoped-read rules (default for every READY unit build):**

1. **Build sequence** — read only the target unit's `### Unit N:` section (its Status, Blocked-by, Dependencies, Deliverables, Completion gate) plus the Live Status Snapshot table. Do not read the other unit definitions or the COIM appendix unless the target unit cites them.
2. **Dependencies** — read only the Status/Verification lines of the units the target depends on (available from the snapshot table), not their full sections or their source code, unless the target unit consumes their code directly.
3. **Debt register** — read only the specific ARCH-DEBT IDs mapped to the target unit's chain (grep by ID). Do not read the full register. If no debt is mapped, a grep confirming none is sufficient.
4. **Data dictionary** — read only the entity sections (`### N. <Entity>`) the target unit consumes or modifies. Do not read unrelated entity entries.
5. **Design / UI files** — read only the design-system, route-registry, and `apps/web` files relevant to the target surface. Do not load the whole UI tree.
6. **Full-file reads** — permitted ONLY when (a) the file itself is being modified, or (b) scoped reading is demonstrably insufficient (e.g. a cross-cutting change, an index/anchor is missing, or a grep cannot isolate the needed content). When a full-file read is used, the reason is recorded in the closure report.

**Scoped reads never substitute for enforcement.** The governance runner still reads whatever it needs in full (it is unchanged), and ARCH-005–009, the scorecard, run logs, and the pre-commit gate operate exactly as before. Scoped reads govern *what the agent loads into working context to plan and implement* — not what the mechanical gates inspect.

This rule does NOT weaken: authority preflight, the governance runner, ARCH-005 through ARCH-009, scorecard updates, run-log creation, the pre-commit gate, or the closure review. Any one of those that needs a full file still gets it.

## READY unit auto-commit lifecycle

When the owner instructs execution of a READY build unit, the default lifecycle is autonomous end-to-end:

1. Implement deliverables (apply auto-fix where permitted by doctrine)
2. Run functional tests (`pnpm test`)
3. Run governance runner (`node scripts/governance-check.cjs --unit N`)
4. Update score-register.md (automatic via governance runner)
5. Create run log (automatic via governance runner)
6. Run unit closure review checklist
7. If ALL checks PASS and no stop-conditions are triggered:
   - Mark unit DONE in REBASELINED_BUILD_SEQUENCE.md
   - Recompute READY set
   - Commit (through pre-commit gate)
   - Push to origin
   - Report final state (commit hash, DONE set, READY set), including the scoped-read disclosure (see Unit closure review Step 2)

**Stop for owner review only if:**

- Functional tests fail after auto-fix attempts
- Governance runner fails (any ARCH-00x check)
- Scorecard band becomes Red
- Unresolved structural debt is created
- Authority, governance, hook, gate, or doctrine files are modified
- Build scope is ambiguous or deliverables are unclear
- Destructive git or file operation is required
- Live AWS, vendor API, credential, or billing action is requested

**What this does NOT weaken:**

- Governance runner still runs on every unit
- Pre-commit gate still fires on every commit
- Hooks still enforce (performance compliance, post-task review)
- Scorecard reporting still mandatory
- Closure review still mandatory
- All doctrinal assertions still enforced
- Authority preflight still checked

This is a workflow-friction reduction only. The governance chain is unchanged.

## Commit discipline

- Commit messages are descriptive and reference the spec/phase/pass.
- One logical change per commit where practical.
- Push at session end or when a coherent unit of work is complete.

## Unit closure review (mandatory pre-commit)

Before committing any build unit, execute the following sequence in order:

### Step 1: Run scoped Core Testing Pipeline

After implementation is complete (code written, typecheck passes, tests pass), invoke the core testing pipeline scoped to the unit's changed files:

```
node scripts/governance-check.cjs --unit N
```

Or via npm script:

```
pnpm governance -- --unit N
```

This mechanically evaluates:
- **Stage 1:** Functional checks (build, tests, types, lint)
- **Stage 2:** Conformance checks — specifically ARCH-005 (data-dictionary completeness), ARCH-006 (build-stream sequencing), ARCH-007 (blocking-debt prerequisite), ARCH-008 (readiness-machine integrity), ARCH-009 (verification-before-done), plus any layer-relevant assertions (DSC/TOK/PERF/DOC if the unit touches those layers)
- **Post-run:** Debt closure loop, score register update, run log creation

If the pipeline is not yet machine-runnable (no automated runner wired), execute the checks manually by grep/file-inspection and report the results explicitly. The checks are mechanical (grep-based) and can be performed without a runner. State which method was used (automated runner vs manual grep).

The pipeline run produces the **evidence** that the Unit Closure Review reports on. Do not skip this step.

### Step 2: Run Unit Closure Review checklist

Run the full checklist from `docs/07_prompt_library/09_UNIT_CLOSURE_REVIEW_PROMPT.md` and report each item factually. Item 7 (Tests/Conformance) must now include the pipeline outcome from Step 1.

**Mandatory scoped-read disclosure.** The closure report MUST state:
- **Scoped reads used: yes/no** — whether the scoped-read pre-flight discipline was followed for this unit.
- **Full-file reads used and why** — list any full-file reads of `REBASELINED_BUILD_SEQUENCE.md`, `ARCHITECTURAL_DEBT_REGISTER.md`, `DATA_DICTIONARY.md`, or the UI tree, each with its justification (file-being-modified, or scoped-read-insufficient with reason). State "none" if no full-file reads were used.

### Step 3: Owner review

Present the closure review report. Do not commit until the owner explicitly approves.

### Step 4: Commit through the gate

Stage only this unit's files. Commit with descriptive message. The `.githooks/pre-commit` gate runs automatically.

---

The full execution sequence for a unit build is:

```
1. Confirm unit Status = READY (readiness state machine)
2. Read unit definition + baseline spec
3. Implement deliverables
4. Run typecheck + tests (functional verification)
5. Run scoped Core Testing Pipeline (conformance verification — ARCH-005–009)
6. Run Unit Closure Review checklist (governance report)
7. Owner review + approval
8. Commit through git gate
9. Push to origin
```

If any step fails, do not proceed to the next — resolve the issue first.

## Hook outcome reporting (mandatory)

After post-task hooks fire (postTaskExecution), explicitly report the outcome of the following two hooks in the unit completion report:

1. **Hook 05 — Performance Compliance:** Report PASS / FLAG / FAIL. Include per-layer band if available, or "N/A — no measurable performance units affected" for data-layer-only changes.
2. **Post-Task Review:** Report PASS / FLAG (with list of flagged items) / FAIL (with violations).

These outcomes must appear in the unit completion report presented to the operator. If a hook's output is not visible, the governance process is incomplete. The operator must see whether the hooks passed or raised issues — silent processing is not acceptable.

## Data-layer completion

- Data-layer build units are not "done" until their DATA_DICTIONARY.md entry exists.
- An entity in `packages/contracts/src/entities` or `packages/db/src/schema` with no corresponding DATA_DICTIONARY.md entry = INCOMPLETE.
- The `data-dictionary-generation.kiro.hook` fires on contract/schema edits to maintain the dictionary mechanically.
- ARCH-005 conformance assertion enforces this via the core testing pipeline.

## Build-stream sequencing (Foundational vs Team 2)

- A unit tagged **'Team 2'** in `REBASELINED_BUILD_SEQUENCE.md` MUST NOT be built until `USE_CASE_SCHEDULE.md` and `PAGE_INVENTORY.md` exist AND `PAGE_INVENTORY.md` contains an entry for that unit.
- Only **'Foundational'** units are buildable now.
- Building a Team 2 unit early is a sequencing violation.
- ARCH-006 conformance assertion enforces this via the core testing pipeline (mechanical file-existence + grep check).

## Build-readiness state machine

`REBASELINED_BUILD_SEQUENCE.md` is a **queryable readiness state machine**, not a static list. Every unit carries a computed `Status`:

- **BLOCKED** — has unresolved OPEN ARCH-DEBT in its chain, or dependency units not yet DONE. Not buildable.
- **READY** — all chain debt RESOLVED and all dependency units DONE. Buildable now.
- **DONE** — built and committed.

**Build only from READY.** Building a BLOCKED unit is a sequencing violation, backstopped mechanically by ARCH-007 (Blocking-Debt Prerequisite) in the conformance registry.

**Status computation (mechanical):** a unit is READY iff every dependency unit is DONE and every ARCH-DEBT mapped to the unit or its dependencies is RESOLVED. Otherwise BLOCKED. A unit's own resolving debt (the debt it exists to close) does not self-block it. Team 2 units are additionally gated by ARCH-006.

**Recompute-on-resolution rule:** when an ARCH-DEBT flips to RESOLVED, or a unit flips to DONE, recompute the status of all dependent units (re-read dependency statuses + mapped debt statuses). Any dependent whose dependencies are now all DONE and chain debt now all RESOLVED flips BLOCKED→READY. The recompute is mechanical — never a guess.

### "What's next" query behaviour

When the owner asks **"what's next"** / **"what can I build"**, compute from the live `Status` values in `REBASELINED_BUILD_SEQUENCE.md` (never guess):

- **If the READY set is non-empty** → report:
  `Build packages READY: [units]. Blocked: [unit ← what blocks it].`
- **If the READY set is empty** → route to the debt:
  `No packages ready. N units BLOCKED by open debt [ARCH-DEBT-xxx]. Next action: resolve debt. Debt-resolution unit that unblocks the most: [unit].`

The query reads dependency-chain status + mapped ARCH-DEBT status; it does not infer readiness from anything else.

Authority: `DEC-build-readiness-state-machine` (DECISIONS.md); extends `DEC-build-stream-sequencing-enforced` (ARCH-006). Backstop: ARCH-007 in `.kiro/testing/conformance-registry.md`, auto-run via post-task-review.

