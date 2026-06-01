# Hook Consolidation Remediation Plan

**Date:** 2026-06-01  
**Status:** Assessment — awaiting owner approval  
**Authority:** execution-discipline.md §Hook outcome reporting; AGENTS.md §Hard stops (governance file modification)  
**Scope:** Unified Post-Task Governance hook (v2.0) vs five disabled predecessor hooks  
**Action required:** Owner review and approval before any hook file is committed

---

## Context

The previous session created `unified-post-task-governance.kiro.hook` (v2.0) and disabled five predecessor hooks. Per `execution-discipline.md`, modifying governance/hook/gate files is an explicit stop-condition requiring owner review. This document defines the minimum changes needed to make the unified hook approval-ready.

### Assumptions

- The unified hook remains the primary governance mechanism.
- The five old hooks remain on disk, disabled, as reference specifications.
- No hook files are modified by this document — it is a plan only.
- Token budget is a legitimate engineering constraint (five hooks consumed ~7,600 prompt words per task).

---

## 1. Identified Gaps

### GAP-01: SEC-001 Detection Patterns Missing

| Field | Value |
|---|---|
| **Description** | The old `secure-coding-rbac-enforcement.kiro.hook` specified exact patterns for secret detection: `AKIA…`, `BEGIN [PRIVATE] KEY`, `password=`, `secret=`, `apikey=`, Bearer tokens, high-entropy strings, OAuth client secrets, HMAC signing keys, connection strings with credentials. The unified hook says only "SEC-001 (no secrets)". |
| **Risk** | Agent may miss non-obvious secret leaks (e.g., AWS access keys, embedded connection strings) because it lacks pattern guidance. |
| **Why it matters** | SEC-001 is a hard-refusal condition. A false negative here means secrets could be committed. This is the highest-severity security control in the hook chain. |
| **Recommended remediation** | Add a 6-line detection-pattern block under §5 Secure-Coding & RBAC in the unified prompt. Patterns: `AKIA[0-9A-Z]{16}`, `BEGIN (RSA|EC|DSA|OPENSSH) [PRIVATE] KEY`, `password\s*=\s*['"][^'"]+`, `(api[_-]?key|secret|token)\s*[:=]`, Bearer tokens, connection strings with `@` or `://user:pass@`. |
| **Estimated token impact** | +80 tokens (~6 lines) |
| **Classification** | **Mandatory** — hard-refusal control without detection guidance is unreliable |

### GAP-02: Architectural Debt Proposal Template Missing

| Field | Value |
|---|---|
| **Description** | The old `arch-debt-auto-propose.kiro.hook` specified an exact proposal template (Title, Source, Description, Debt type, Scope of fix, Affected specs/artifacts, Suggested status, registration command). The unified hook says "propose in standard format" without defining it. |
| **Risk** | Proposals will be inconsistently formatted, making owner registration harder and potentially missing required fields. |
| **Why it matters** | The architectural debt register has a defined schema. Proposals that don't match the schema create friction and may be discarded or misregistered. |
| **Recommended remediation** | Add the 8-line proposal template block under §6 Architectural Debt Detection. Include: Title (≤80 chars), Source, Description, Debt type (enum), Scope of fix, Affected specs, Suggested status, registration command. |
| **Estimated token impact** | +100 tokens (~8 lines) |
| **Classification** | **Mandatory** — without the template, the hook cannot fulfil its stated purpose |

### GAP-03: Deduplication Rule Missing

| Field | Value |
|---|---|
| **Description** | The old arch-debt hook explicitly required reading `docs/knowledge/ARCHITECTURAL_DEBT_REGISTER.md` and skipping entries that already exist (compare titles and sources). The unified hook does not mention deduplication. |
| **Risk** | The hook will re-propose already-registered debt items, creating noise and wasting owner attention. |
| **Why it matters** | The register currently has 30+ entries. Without dedup, every task could re-surface known items, degrading signal-to-noise ratio. |
| **Recommended remediation** | Add one instruction line: "Before proposing, read `docs/knowledge/ARCHITECTURAL_DEBT_REGISTER.md` and skip any candidate whose Title or Source matches an existing entry." |
| **Estimated token impact** | +25 tokens (~2 lines) |
| **Classification** | **Mandatory** — without this, the hook generates noise rather than signal |

### GAP-04: ARCH-006–009 Inline Definitions Missing

| Field | Value |
|---|---|
| **Description** | The old post-task-review hook provided full inline definitions for each ARCH assertion (e.g., ARCH-007 = "confirm unit Status was READY — every dependency DONE and every chain-mapped ARCH-DEBT RESOLVED"). The unified hook says only "check ARCH-006, ARCH-007, ARCH-008, ARCH-009" without definitions. |
| **Risk** | Agent cannot reliably verify assertions it doesn't have definitions for. May produce false-pass results on build-sequencing checks. |
| **Why it matters** | ARCH-007 (blocking-debt prerequisite) and ARCH-009 (verification-before-done) are the primary guards against premature unit completion. A false pass here means units get marked DONE without proper verification. |
| **Recommended remediation** | Add 4 one-line definitions: ARCH-006 (Team 2 gate: USE_CASE_SCHEDULE + PAGE_INVENTORY must exist), ARCH-007 (unit Status must be READY: deps DONE + chain debt RESOLVED), ARCH-008 (orphan build-debt, unstatused units, built-but-blocked detection), ARCH-009 (DONE/RESOLVED requires verification line with spec# + evidence). |
| **Estimated token impact** | +60 tokens (~4 lines) |
| **Classification** | **Mandatory** — build-sequencing is a hard gate; definitions are required for enforcement |

### GAP-05: Performance Scoring Methodology Absent

| Field | Value |
|---|---|
| **Description** | The old performance hook specified exact formulas (smaller-is-better: `target ÷ measured × 100%`; bigger-is-better: `measured ÷ target × 100%`), four-band thresholds, and comparison-to-previous-scorecard procedure. The unified hook says "reason against layer strategy docs". |
| **Risk** | Without formulas, the agent applies subjective judgement rather than mechanical scoring. Band classifications may be inconsistent across tasks. |
| **Why it matters** | Performance doctrine (PD-1.0) requires mechanical, reproducible scoring. Subjective reasoning defeats the purpose of a scorecard. |
| **Recommended remediation** | Add 3 lines: the two formulas and the band thresholds (Green ≥90%, Yellow 75–89%, Amber 50–74%, Red <50%). Reference `PERFORMANCE_DOCTRINE.md §4` for full detail. |
| **Estimated token impact** | +45 tokens (~3 lines) |
| **Classification** | **Optional** — the steering file `performance-discipline.md` is always-on and contains the methodology. The agent has access to it. However, explicit inclusion improves reliability. |

### GAP-06: RBAC Spec References Missing

| Field | Value |
|---|---|
| **Description** | The old secure-coding hook cited specific specs for each RBAC assertion (Spec #50 §Backend Enforcement Rule, Spec #17 §Acceptance Criteria #1, Spec #75 §4, Spec #29 v2.0 patch §2 No.10). The unified hook lists assertion IDs without citations. |
| **Risk** | Agent may not know the precise enforcement rule for each RBAC assertion, leading to shallow checks. |
| **Why it matters** | RBAC violations (tenant isolation breach, missing backend enforcement) are hard-refusal conditions. The agent needs to know what "correct" looks like. |
| **Recommended remediation** | Add 4 parenthetical spec references after each RBAC assertion ID: RBAC-001 (Spec #50 §Backend), RBAC-002 (Spec #17 §AC1), RBAC-003 (Spec #75 §4), RBAC-004 (Spec #29 v2.0 §2.10). |
| **Estimated token impact** | +40 tokens (~4 short additions) |
| **Classification** | **Optional** — the conformance registry (`.kiro/testing/conformance-registry.md`) contains these references and is accessible to the agent. Inline inclusion improves reliability but is not strictly required. |

### GAP-07: Explicit "Do Not Write" Guardrail Weakened

| Field | Value |
|---|---|
| **Description** | The old arch-debt hook had a bold "NON-NEGOTIABLE RULE: this hook proposes only. It MUST NOT write to the register." The unified hook mentions "Do NOT write to register" once, less prominently. |
| **Risk** | In a long agent execution, the weaker phrasing may be overlooked, leading to unauthorised register writes. |
| **Why it matters** | The architectural debt register is an owner-controlled governance document. Unauthorised writes violate the authority model. |
| **Recommended remediation** | Promote the instruction to a top-level rule in §6: "RULE: This section proposes only. NEVER write to `ARCHITECTURAL_DEBT_REGISTER.md`. The owner registers via `log architectural debt` command." |
| **Estimated token impact** | +20 tokens (~2 lines) |
| **Classification** | **Mandatory** — governance document protection requires unambiguous instruction |

### GAP-08: Independent Failure Attribution

| Field | Value |
|---|---|
| **Description** | With five separate hooks, a failure in one was clearly attributable to that domain (e.g., "Performance Compliance — FAIL"). With a single unified prompt, the agent might produce an incomplete response that omits a section, making it unclear whether a check passed or was skipped. |
| **Risk** | Silent omission of a governance section could be interpreted as a pass. |
| **Why it matters** | The execution-discipline steering requires explicit hook outcome reporting. If a section is missing from the report, the operator cannot confirm compliance. |
| **Recommended remediation** | Add an instruction: "ALL 6 sections MUST appear in the report. If a section cannot be evaluated, report it as `{section}: UNABLE TO EVALUATE — [reason]`. Never omit a section." |
| **Estimated token impact** | +30 tokens (~2 lines) |
| **Classification** | **Mandatory** — ensures no silent governance gaps |

---

## 2. Summary Table

| Gap | Classification | Token cost | Cumulative |
|---|---|---|---|
| GAP-01 SEC-001 patterns | Mandatory | +80 | +80 |
| GAP-02 Arch-debt template | Mandatory | +100 | +180 |
| GAP-03 Deduplication rule | Mandatory | +25 | +205 |
| GAP-04 ARCH-006–009 definitions | Mandatory | +60 | +265 |
| GAP-07 Do-not-write guardrail | Mandatory | +20 | +285 |
| GAP-08 Section completeness rule | Mandatory | +30 | +315 |
| GAP-05 Performance formulas | Optional | +45 | +360 |
| GAP-06 RBAC spec references | Optional | +40 | +400 |

**Mandatory remediation total:** +315 tokens (~24 lines added to the unified prompt)  
**Optional remediation total:** +85 tokens (~7 additional lines)  
**Full remediation total:** +400 tokens (~31 lines)

**Net token budget comparison:**
- Old system: ~7,600 words (~10,000 tokens) per task across 5 hooks
- Current unified (v2.0): ~800 words (~1,050 tokens)
- Proposed unified (v2.1): ~1,050 words (~1,450 tokens)
- **Net savings vs old system: ~85% reduction** (even with all remediations applied)

---

## 3. Approval-Ready Changes (Mandatory — v2.1 minimum)

These six changes are required before the unified hook can be approved for commit:

1. **Add SEC-001 detection patterns** (GAP-01) — 6 lines in §5
2. **Add arch-debt proposal template** (GAP-02) — 8 lines in §6
3. **Add deduplication instruction** (GAP-03) — 2 lines in §6
4. **Add ARCH-006–009 one-line definitions** (GAP-04) — 4 lines in §2
5. **Promote do-not-write guardrail** (GAP-07) — 2 lines at top of §6
6. **Add section-completeness rule** (GAP-08) — 2 lines in report format section

**Estimated effort:** 15 minutes of prompt editing. No code changes. No structural changes to the hook architecture.

---

## 4. Optional Improvements (v2.1 enhanced)

These improve reliability but are not blocking:

1. **Add performance scoring formulas** (GAP-05) — 3 lines in §4. Improves mechanical reproducibility.
2. **Add RBAC spec references** (GAP-06) — 4 inline additions in §5. Improves check depth.

---

## 5. Proposed v2.1 Architecture

```
┌─────────────────────────────────────────────────────────┐
│  unified-post-task-governance.kiro.hook (v2.1)          │
│  enabled: true                                          │
│  event: postTaskExecution                               │
│                                                         │
│  ┌─── Fast-path (doc-only) ───────────────────────┐    │
│  │ Brief doctrine + authority + debt scan          │    │
│  │ 4-line compact report                           │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─── Full-path (code-changing) ──────────────────┐    │
│  │ §1 Authority Compliance (items 1–10, 15)       │    │
│  │ §2 Build Sequencing (ARCH-006–009 with defs)   │    │
│  │ §3 Doctrinal Assertions (11, by keyword)       │    │
│  │ §4 Performance (formulas + interim discipline) │    │
│  │ §5 Security (SEC patterns + RBAC with refs)    │    │
│  │ §6 Arch-debt (template + dedup + no-write)     │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  Section-completeness rule: all 6 must appear           │
│  Decision rollup: FAIL > FLAG > PASS                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Reference specifications (disabled, retained on disk)  │
│                                                         │
│  • post-task-review-hook.kiro.hook         (enabled: false) │
│  • 05-performance-compliance.kiro.hook     (enabled: false) │
│  • doctrinal-assertions-check.kiro.hook    (enabled: false) │
│  • secure-coding-rbac-enforcement.kiro.hook(enabled: false) │
│  • arch-debt-auto-propose.kiro.hook        (enabled: false) │
│                                                         │
│  Purpose: canonical check definitions, fallback if      │
│  unified hook produces ambiguous results, lineage.      │
└─────────────────────────────────────────────────────────┘
```

### v2.1 Design Principles

1. **Single prompt, single report** — token-efficient, operator-friendly.
2. **Fast-path preserved** — documentation-only tasks get lightweight governance.
3. **Critical detection detail restored** — patterns, templates, definitions inline where the agent cannot reliably infer them from context.
4. **Reference specs retained** — old hooks serve as the "full specification" if the compressed prompt ever needs expansion.
5. **No structural change** — same event, same action type, same decision rules. Only prompt content is enriched.

---

## 6. Approval Workflow

1. Owner reviews this plan.
2. Owner approves or amends the mandatory/optional classification.
3. Implementer applies approved changes to `unified-post-task-governance.kiro.hook` prompt text only.
4. No other hook files are modified (old hooks remain disabled).
5. Commit message: `governance(hooks): unified-post-task-governance v2.1 — remediate gaps per HOOK_CONSOLIDATION_REMEDIATION_PLAN.md`
6. Record in DECISIONS.md: `DEC-unified-governance-hook-v2.1`

---

## 7. Constraints

- No application code generated.
- No AWS resources created.
- No vendor API integrations.
- No hook files modified by this document.
- Commander authority preserved — this is governance documentation only.
- Old hooks retained for lineage per doctrinal assertion #7 (baseline immutability principle applied to governance artefacts).
