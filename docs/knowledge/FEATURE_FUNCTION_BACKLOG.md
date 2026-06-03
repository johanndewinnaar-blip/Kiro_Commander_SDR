# Feature & Function Backlog — Standing Register

**Status:** Standing register. Empty at creation. Append-only.
**Owner:** Johann.
**Established:** 30 May 2026.

---

## Routing rule (binding)

> **Absent → this backlog. Broken → Architectural Debt Register.**

If a feature, function or capability *should exist* but does not yet (whether missed from the baseline, newly proposed, or whose status is unsure), it goes here.

If something *exists but is broken, drifted, or non-conforming*, it does **not** go here — it goes to the Architectural Debt Register (the existing `docs/00_authority/debt-register.md` per `.kiro/steering/core-testing-commands.md`).

---

## Two-stage structure

### Stage 1 — Capture

A capture is the minimum needed to record a backlog item without forcing premature design. Required fields:

| Field | Notes |
|---|---|
| **ID** | `BL-NNN` — monotonically increasing, never re-used |
| **Title** | Short label |
| **Type** | `MISSED` (omitted from baseline / translation) · `NEW` (proposed addition) · `UNSURE` (status to be determined) |
| **Capability statement** | One or two sentences: what the thing *is* / *does* |
| **Why / outcome** | One or two sentences: why it matters / what it enables |
| **Raw priority** | `HIGH` · `MEDIUM` · `LOW` (owner's gut call at capture time; not refined here) |
| **Status** | Lifecycle state — see below |

### Stage 2 — Forming

**Deferred until the knowledge graph is verified complete.** Forming projects a Stage 1 capture against the verified knowledge graph to produce: domain placement, owning spec, prerequisite chain, affected entities/routes, dependencies, success criteria, build-pack mapping. Forming logic is **not built out now** — that work happens after the four primary knowledge artefacts (`SYSTEM_KNOWLEDGE_GRAPH.md`, `DOMAIN_REGISTER.md`, `RELATIONSHIP_MAP.md`, `ARCHITECTURAL_FINDINGS.md`) are verified.

---

## Lifecycle states

Items progress through these states. **Status changes track progress; nothing is deleted.**

```
CAPTURED  →  FORMED  →  SEQUENCED  →  IN BUILD  →  BUILT  →  CLOSED
```

| State | Meaning |
|---|---|
| `CAPTURED` | Stage 1 fields recorded. No forming yet. |
| `FORMED` | Stage 2 forming complete against verified knowledge graph. |
| `SEQUENCED` | Placed in a build sequence / version slot. |
| `IN BUILD` | Active build in progress. |
| `BUILT` | Implementation complete, awaiting close-out. |
| `CLOSED` | Verified and closed. Item remains in register for history. |

A short **History** trailer per item records date + state transition.

---

## Trigger phrases (registered in steering)

The following phrases are recognised by Kiro and routed here. Authority: `.kiro/steering/feature-function-backlog.md`.

- **"this is a new backlog item [description]"** → Stage 1 capture, next available `BL-NNN`, status `CAPTURED`, capture-confirmation reply.
- **"register this backlog item [description or attached template]"** → same as above; if a completed Capture Template is provided, register it with the filled fields verbatim.
- **"show backlog"** / **"show feature backlog"** → list current items with ID, title, type, status.

---

## Capture Template (optional — paste-and-fill)

Use this template when you want to submit a fully-formed Stage 1 entry rather than a free-text description.

```
ID:                    (leave blank — Kiro assigns next BL-NNN)
Title:
Type:                  MISSED | NEW | UNSURE
Capability statement:
Why / outcome:
Raw priority:          HIGH | MEDIUM | LOW
Notes:                 (optional)
```

If any required field is left blank, Kiro will register the item as captured with that field marked `[to be confirmed]` rather than block on capture.

---

## Register

> Empty at creation. New items are **appended** below the divider. Do not edit prior items in place — record state transitions in their **History** trailer.

---
<!-- BACKLOG_ITEMS_BELOW -->

### BL-001 — Data-Point-to-Metric Mapping Artifact

- **ID:** BL-001
- **Title:** Data-Point-to-Metric Mapping Artifact
- **Type:** MISSED
- **Capability statement:** A mapping document/schedule that maps confirmed data points from all functional pages (cases, assets, vulnerabilities, identity, control coverage, architecture/topology, governance) to the aggregate Command Centre KPI metrics (Posture Score, SLA Compliance, Coverage, etc.).
- **Why / outcome:** Unblocks Unit 16b (Aggregate/Posture Command Centre). Without this artifact, KPI rollups would be built against seeded guesses rather than confirmed data points — the exact waste `DEC-command-centre-deferred` was designed to prevent.
- **Raw priority:** HIGH
- **Status:** CAPTURED

**History**
- 2026-06-02: CAPTURED — surfaced during Phase Hanger Exception Closure. The artifact was referenced as a resume trigger for Unit 16b (`DEC-command-centre-deferred`, `DEC-command-centre-split-16a-16b`) but never created or placed in a register. Now explicitly captured. Phase: Phase 2 (requires Team 2 functional pages Units 30–33 to be complete first). Owner area: deployment. Trigger: Team 2 functional pages (Units 30–33) DONE. Boundary: must not invent metric values — summary only of confirmed data points. Does NOT block current UI work (all Foundational surface units are DONE).

---

### BL-002 — PHASE_E_PROPOSAL.md Incorporation or Retirement

- **ID:** BL-002
- **Title:** PHASE_E_PROPOSAL.md — Spec 06 Phase E incorporation
- **Type:** UNSURE
- **Capability statement:** Decide the disposition of `docs/00_authority/PHASE_E_PROPOSAL.md` (Evidence Pack Model, Auto-Healing Condition Evaluator, Communication Thread Model). Incorporate into the rebaselined build sequence as sub-deliverables of existing units (E1/E2 under Unit 43 or standalone, E3 under Unit 44), retire to `_superseded/`, or rework.
- **Why / outcome:** Closes ARCH-DEBT-007. The proposal is an unincorporated orphan that references work partially covered by Unit 44 (Email Case Communication) and Unit 43 (Audit Trail). Without a disposition decision, it remains governance noise.
- **Raw priority:** MEDIUM
- **Status:** CAPTURED

**History**
- 2026-06-02: CAPTURED — surfaced during Phase Hanger Exception Closure. Cross-ref: ARCH-DEBT-007. Phase: Phase 1 (decision only, no code). Owner area: data lake/dormant telemetry. Trigger: owner decision on E1/E2/E3 disposition. Boundary: no code until decision recorded. Does NOT block current UI work.

---

### BL-003 — USE_CASE_SCHEDULE.md + PAGE_INVENTORY.md (ARCH-006 gate artifacts)

- **ID:** BL-003
- **Title:** Team 2 Gate Artifacts — USE_CASE_SCHEDULE.md + PAGE_INVENTORY.md
- **Type:** MISSED
- **Capability statement:** Create the two mandatory gate artifacts (`USE_CASE_SCHEDULE.md` and `PAGE_INVENTORY.md`) that ARCH-006 mechanically checks before any Team 2 unit can flip to READY. These define the use-case schedule and page inventory for the Team 2 derivation stream.
- **Why / outcome:** Unblocks ALL 20 Team 2 build units (Units 23–37, 39, 41–42, 44–49). Without these artifacts, the entire Team 2 stream cannot proceed regardless of dependency resolution.
- **Raw priority:** HIGH
- **Status:** CAPTURED

**History**
- 2026-06-02: CAPTURED — surfaced during Phase Hanger Exception Closure. Phase: Phase 2 (Team 2 prerequisite). Owner area: deployment. Trigger: owner decision to begin Team 2 stream. Boundary: governance artifacts only (no code). Does NOT block current UI work (all Foundational units DONE).
