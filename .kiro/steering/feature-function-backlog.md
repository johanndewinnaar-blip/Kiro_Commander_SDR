# Backlog & Architectural Debt — Trigger Phrases and Handling Rules

**Inclusion:** always-on (default).
**Authority:** owner-instructed standing rule. Establishes how Kiro handles backlog and architectural-debt trigger phrases.
**Register files:**
- `docs/knowledge/FEATURE_FUNCTION_BACKLOG.md` — absent capabilities (missed / new / unsure).
- `docs/knowledge/ARCHITECTURAL_DEBT_REGISTER.md` — broken / drifted / compromised structural conditions.
- `docs/00_authority/debt-register.md` — code/conformance debt (driven by `core-testing-commands.md` pipeline).

---

## Routing rule (binding)

> **Absent → Feature & Function Backlog. Broken (architectural / structural) → Architectural Debt Register. Broken (code-conformance) → debt-register.md.**

- A feature/function/capability that *should exist but does not yet* (missed from baseline, newly proposed, or whose status is unsure) is captured to `docs/knowledge/FEATURE_FUNCTION_BACKLOG.md`.
- A structural / governance condition that is *contradictory, drifted, dangling, miscoded in source, blocked, or otherwise compromised at the architectural level* is registered to `docs/knowledge/ARCHITECTURAL_DEBT_REGISTER.md`.
- A code/UI item that *exists and fails a conformance assertion* in `.kiro/testing/conformance-registry.md` continues to flow through `docs/00_authority/debt-register.md` per `core-testing-commands.md`.

If routing is ambiguous on a given input, Kiro asks one clarifying question (absent / architectural-broken / code-conformance) before placing the item.

---

## Trigger phrases

Kiro recognises these phrases and acts as specified. Free-text variants and reasonable paraphrases of the same intent are also accepted.

### 1. `this is a new backlog item <description>`

**Action:** capture to Stage 1 in `docs/knowledge/FEATURE_FUNCTION_BACKLOG.md`.

Steps:

1. Read the register, find the highest existing `BL-NNN`, assign the next ID (start `BL-001` if empty).
2. Append a new entry below the `<!-- BACKLOG_ITEMS_BELOW -->` marker using the Stage 1 entry shape (below). Use the user's description to populate Title and Capability statement; mark any fields not provided as `[to be confirmed]`.
3. Set `Status: CAPTURED`. Add a History line: `<YYYY-MM-DD>: CAPTURED`.
4. Reply with a short confirmation: `Captured BL-NNN — <title>. Status: CAPTURED.` and nothing more unless the user asks.

### 2. `register this backlog item <description or attached template>`

**Action:** same as Trigger 1. If the user has provided a filled Capture Template, register the item with those fields verbatim. Missing required fields are recorded as `[to be confirmed]` rather than blocking the capture.

### 3. `show backlog` or `show feature backlog`

**Action:** read `docs/knowledge/FEATURE_FUNCTION_BACKLOG.md` and reply with a compact list of all items in capture order. Format:

```
BL-NNN  <Type>   <Status>          <Title>
```

If the register is empty, reply: `Backlog is empty.`

### 4. `log architectural debt <description>`

**Action:** append to `docs/knowledge/ARCHITECTURAL_DEBT_REGISTER.md`.

Steps:

1. Read the register, find the highest existing `ARCH-DEBT-NNN`, assign the next ID.
2. Append a new entry below the `<!-- ARCHITECTURAL_DEBT_BELOW -->` marker using the entry shape defined in the register. Populate Title and Description from the user's input; mark unprovided fields as `[to be confirmed]`.
3. Set `Status: OPEN`. Add a History line: `<YYYY-MM-DD>: OPEN — seeded from owner instruction`.
4. Reply with a short confirmation: `Logged ARCH-DEBT-NNN — <title>. Status: OPEN.`

### 5. `show architectural debt`

**Action:** read `docs/knowledge/ARCHITECTURAL_DEBT_REGISTER.md` and reply with a compact list of all entries in ID order. Format:

```
ARCH-DEBT-NNN   <Debt type>   <Status>   <Title>
```

If the register is empty, reply: `Architectural debt register is empty.`

---

## Stage 1 entry shape

Append entries to the register using exactly this shape:

```markdown
### BL-NNN — <title>

- **Type:** MISSED | NEW | UNSURE
- **Capability statement:** <one or two sentences>
- **Why / outcome:** <one or two sentences>
- **Raw priority:** HIGH | MEDIUM | LOW
- **Status:** CAPTURED
- **Notes:** <optional>

**History**
- <YYYY-MM-DD>: CAPTURED
```

Any field not supplied at capture time is recorded as `[to be confirmed]` (do not block on it).

---

## Behaviour rules (binding)

1. **Capture is minimal.** Only Stage 1 fields are required. Do **not** force Stage 2 forming at capture time. Do **not** ask refinement questions beyond a single ambiguity-resolution question if absolutely needed.
2. **Forming is deferred.** Stage 2 forming projects a capture against the verified knowledge graph (`SYSTEM_KNOWLEDGE_GRAPH.md`, `DOMAIN_REGISTER.md`, `RELATIONSHIP_MAP.md`, `ARCHITECTURAL_FINDINGS.md`). Do not run Stage 2 logic until those four artefacts are verified complete and the owner instructs.
3. **Append-only.** Items are appended; nothing is deleted. Status changes are recorded as additional History lines on the existing entry. Do not rewrite prior entries.
4. **Lifecycle states.** Items progress through `CAPTURED → FORMED → SEQUENCED → IN BUILD → BUILT → CLOSED`. Each transition adds a dated History line and updates the **Status** field.
5. **ID discipline.** `BL-NNN` is monotonic and never re-used. If an item is later determined invalid, mark it `Status: WITHDRAWN` with a History line; do not re-issue the ID.
6. **Sourcing rule respected.** Knowledge work that operates on this register and on the verified knowledge graph remains bound by `docs/knowledge/SOURCING_RULE.md` — no claims drawn from the `.kiro/specs/` translation layer.
7. **Authority guardrails respected.** No application code, no live AWS resources, no real vendor APIs, no billing, no Kiro powers, no n8n. Capture and registration are documentation operations only.
8. **Confirm-and-stop.** On a capture or registration, reply with the short confirmation line and stop. Do not chain additional work, do not propose forming, do not propose builds.

---

## What this steering does NOT do

- It does **not** define forming logic (Stage 2). That is deferred.
- It does **not** define sequencing or build-pack mapping. Those happen downstream after forming.
- It does **not** override the code/conformance debt register at `docs/00_authority/debt-register.md` or its commands. Code-conformance items continue to flow through `core-testing-commands.md`.
- It does **not** authorise any code, infrastructure or vendor work. The three registers are documentation-only.

---

## Architectural Debt Register — additional notes

- The Architectural Debt Register entry shape, lifecycle states (`OPEN → SCHEDULED → IN PROGRESS → RESOLVED`, with `WITHDRAWN` retained), and append-only discipline are defined in `docs/knowledge/ARCHITECTURAL_DEBT_REGISTER.md` itself.
- `ARCHITECTURAL_FINDINGS.md` (to be created in the knowledge-graph build) is the upstream feed into this register: findings surfaced from the verified knowledge graph that are *broken / drifted / compromised* are logged here.
- All Behaviour rules above (capture-minimal, append-only, ID discipline, sourcing-rule respect, authority guardrails, confirm-and-stop) apply equally to architectural-debt commands.
