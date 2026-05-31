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
