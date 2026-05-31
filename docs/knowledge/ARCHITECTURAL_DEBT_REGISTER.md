# Architectural Debt Register

**Status:** Standing register. Append-only.
**Owner:** Johann.
**Established:** 30 May 2026.
**Distinct from:** `docs/00_authority/debt-register.md` (code/conformance debt — DSC-/DEBT- entries from `core-testing-commands.md` pipeline).

---

## Purpose

This register tracks **architectural debt** — broken, drifted, compromised, contradictory, or unresolved structural conditions in the programme that require deliberate resolution. It is the destination for findings that are *real but not yet repaired*.

It is the structural counterpart to:

- **`docs/knowledge/FEATURE_FUNCTION_BACKLOG.md`** — for things that *should exist but don't yet* (absent capabilities).
- **`docs/00_authority/debt-register.md`** — for code-level conformance debt surfaced by the core testing pipeline (broken-against-conformance-registry).

This register sits between the two: it captures *broken-or-compromised structural conditions* — contradictions between governance documents, supersession events that haven't been cleaned up, missing build-pack ownership, register-vs-file mismatches, dangling references, decision-blocked work.

---

## Routing rule (binding)

> **Absent → Feature & Function Backlog. Broken (code-conformance) → debt-register.md. Broken (architectural / structural) → this register.**

Decision criteria:

- The thing exists, but it is contradictory, drifted, miscoded in source, dangling, blocked, or otherwise compromised at the structural / governance level → **here**.
- The thing exists in code/UI but fails a conformance assertion in `.kiro/testing/conformance-registry.md` → `docs/00_authority/debt-register.md`.
- The thing does not exist at all and should → `docs/knowledge/FEATURE_FUNCTION_BACKLOG.md`.

If routing is ambiguous, ask one clarifying question before placing.

---

## Source feeds

This register is fed from:

- **`docs/knowledge/ARCHITECTURAL_FINDINGS.md`** (to be created) — findings surfaced from the verified knowledge graph.
- **`docs/knowledge/GOVERNANCE_MAP.md`** — Run 2 of the governance audit (overlaps, conflicts, gaps, precedence, orphans).
- **`DECISIONS.md`** — decisions that bank a finding without yet repairing it.
- Direct owner instruction via the `log architectural debt` command.

---

## Entry shape

Append entries below the marker using exactly this shape:

```markdown
### ARCH-DEBT-NNN — <title>

- **Source:** <where the finding was first surfaced — e.g. GOVERNANCE_MAP.md §C-01, DECISIONS.md DEC-..., ARCHITECTURAL_FINDINGS.md §X.Y, owner instruction>
- **Description:** <what is broken / drifted / compromised / contradictory>
- **Debt type:** <one of: Supersession-uncleared · Register-file mismatch · Cross-document conflict · Missing-ownership · Reference-dangling · Decision-blocked · Boundary-leak · Other>
- **Scope of fix:** <what work would resolve it>
- **Affected specs / artifacts:** <list of files, spec numbers, build packs>
- **Scheduled resolution:** <work package / version / "deferred" / "to be scheduled">
- **Status:** OPEN | SCHEDULED | IN PROGRESS | RESOLVED | WITHDRAWN
- **Date logged:** <YYYY-MM-DD>
- **Last reviewed:** <YYYY-MM-DD>

**History**
- <YYYY-MM-DD>: OPEN — seeded from <source>
```

ID discipline: `ARCH-DEBT-NNN` is monotonic and never re-used. Status changes are recorded as additional History lines on the existing entry. Append-only — nothing is deleted.

---

## Lifecycle states

```
OPEN → SCHEDULED → IN PROGRESS → RESOLVED
                                  ↓
                              WITHDRAWN  (if invalidated; still retained)
```

---

## Trigger phrases (registered in steering)

- **`log architectural debt <description>`** → append a new entry below the marker; assign next `ARCH-DEBT-NNN`; status `OPEN`; capture-confirmation reply.
- **`show architectural debt`** → list current entries with ID, title, debt type, status.

Authority: `.kiro/steering/feature-function-backlog.md` (extended in this update).

---

## Register

> Seeded with eight items below from the verified governance findings. All entries `OPEN` at creation unless their source DECISIONS.md row indicates otherwise. New items append below the marker.

---
<!-- ARCHITECTURAL_DEBT_BELOW -->

### ARCH-DEBT-001 — Translation-layer structural finding

- **Source:** `DECISIONS.md` row `DEC-translation-layer-structural-finding` (2026-05-30)
- **Description:** All 24 build packs (BP-00 through BP-23) source their implementation depth from the `.kiro/specs/` translation layer (folders 00–43). The translation layer is NOT authority and must not be cited as a source of build depth. The contamination was the structural cause of the superseded Phase 1–6 outputs.
- **Debt type:** Boundary-leak
- **Scope of fix:** Programme-wide mandate at rebaseline — every build unit must cite the baseline spec #N from source authority at `docs/99_source_archive/baseline_v2_6_2/`. Build-plan replacement (`DEC-build-plan-replacement`) addresses the build-plan layer; outstanding work is per-BP citation rewiring on the rebuilt sequence.
- **Affected specs / artifacts:** All BP-00–BP-23 in `docs/04_build_packs/`; programme-wide
- **Scheduled resolution:** Tied to build-plan replacement (`DEC-build-plan-replacement`) — build sequence rebuilt from verified knowledge graph
- **Status:** OPEN
- **Date logged:** 2026-05-30
- **Last reviewed:** 2026-05-30

**History**
- 2026-05-30: OPEN — seeded from DECISIONS.md DEC-translation-layer-structural-finding

---

### ARCH-DEBT-002 — Source-pack schedule v1.9 superseded but not retired from active layer

- **Source:** `DECISIONS.md` row `DEC-source-pack-schedule-v1_9-superseded` (2026-05-30); `GOVERNANCE_MAP.md` C-06, Orphan-A
- **Description:** `docs/02_architecture/source_SDR_Specification_Schedule_and_Folder_Structure_v1_9.md` (and its archive copy) cites superseded masters (Master Tech Spec v6.8, Master Proposition v4.7, specs #01–#48). The current baseline is v2.6.2 (MTS v7.0, MP v5.0, specs through #75). The schedule is classified SUPERSEDED-ORPHAN. The active-layer copy is not yet retired.
- **Debt type:** Supersession-uncleared
- **Scope of fix:** Retire the active-layer copy (move to `_superseded/` or remove with decision record); the immutable archive copy remains for lineage per Assertion 7. Update `.kiro/steering/structure.md` with an artifact-lifecycle policy for retiring superseded actives (closes governance gap G-08).
- **Affected specs / artifacts:** `docs/02_architecture/source_SDR_Specification_Schedule_and_Folder_Structure_v1_9.md`; `docs/99_source_archive/baseline_v2_6_2/docs/00_master/SDR_Specification_Schedule_and_Folder_Structure_v1_9.md` (archive — leave); `.kiro/steering/structure.md`
- **Scheduled resolution:** To be scheduled
- **Status:** OPEN
- **Date logged:** 2026-05-30
- **Last reviewed:** 2026-05-30

**History**
- 2026-05-30: OPEN — seeded from DECISIONS.md DEC-source-pack-schedule-v1_9-superseded

---

### ARCH-DEBT-003 — Spec 32 Strategy Layer has no build pack (BP coverage gap)

- **Source:** `GOVERNANCE_MAP.md` C-01 ("Strategy Layer ordering breach"); related to "Spec 32→Kiro 43 correction" decision lineage
- **Description:** `BUILD_SEQUENCE.md` doctrine #7 declares Strategy Layer Runtime Surface (baseline Spec #32) build-blocking and prerequisite to case management, routing, validation/closure, reopening and Fusion Map. The Kiro spec `43-strategy-layer-runtime-surface/` was added retroactively at v1.3.1, but `docs/04_build_packs/INDEX.md` has no build pack for Strategy Layer Runtime Surface (BPs end at BP-23). Net effect: BP-05 (Case Management) declares "Implemented" before its declared prerequisite is delivered.
- **Debt type:** Missing-ownership
- **Scope of fix:** Resolved by build-plan replacement — the rebuilt sequence (post-knowledge-graph) must establish Strategy Layer ownership before any case/routing/validation work. Pending replacement, the doctrine breach stands.
- **Affected specs / artifacts:** Baseline Spec #32; `BUILD_SEQUENCE.md`; `docs/04_build_packs/INDEX.md`; BP-05; `.kiro/specs/43-strategy-layer-runtime-surface/`
- **Scheduled resolution:** Subsumed by `DEC-build-plan-replacement`
- **Status:** OPEN
- **Date logged:** 2026-05-30
- **Last reviewed:** 2026-05-30

**History**
- 2026-05-30: OPEN — seeded from GOVERNANCE_MAP.md C-01

---

### ARCH-DEBT-004 — Spec #07 register-file mismatch (Universal Search vs Drift/Rule Engine)

- **Source:** `DECISIONS.md` row `DEC-v1.2-Spec07-register-inconsistency` (2026-05-27); `GOVERNANCE_MAP.md` C-03; `DEC-v1.3-register-file-mismatch-depth-pass`
- **Description:** Baseline `00_SPECIFICATION_REGISTER_v2_6.md` row #07 names "Universal Search Implementation"; the actual source file `07_Drift_and_Rule_Engine_Spec.md` is "Drift and Rule Engine" doctrine. Decision: preserve both. Kiro layer added `34-drift-and-rule-engine` and `42-universal-search`. The source-side inconsistency itself remains unrepaired. Other related title mismatches recorded in `DEC-v1.3-register-file-mismatch-depth-pass` cover Specs #01, #04, #16, #18, #26/#26a, #27, #32, #34, #38.
- **Debt type:** Register-file mismatch
- **Scope of fix:** Source-side correction is a baseline-immutability matter (Assertion 7 — must not silently rewrite). Path forward: either accept as a permanent baseline footnote with clear cross-reference, or capture as a future-version baseline correction with explicit decision record.
- **Affected specs / artifacts:** `00_SPECIFICATION_REGISTER_v2_6.md`; `07_Drift_and_Rule_Engine_Spec.md`; Specs #01, #04, #16, #18, #26/#26a, #27, #32, #34, #38 per `DEC-v1.3-register-file-mismatch-depth-pass`
- **Scheduled resolution:** To be scheduled
- **Status:** SCHEDULED (mitigated by `DEC-v1.2-Spec07-register-inconsistency` workaround; root cause remains)
- **Date logged:** 2026-05-30
- **Last reviewed:** 2026-05-30

**History**
- 2026-05-30: SCHEDULED — seeded from DECISIONS.md DEC-v1.2-Spec07-register-inconsistency / DEC-v1.3-register-file-mismatch-depth-pass

---

### ARCH-DEBT-005 — Spec #63 and #64 baseline gap

- **Source:** `DECISIONS.md` row `DEC-v1.2-Spec63-64-gap` (2026-05-27); `BASELINE_SOURCE_INVENTORY.md` numbering notes
- **Description:** The archived child-spec directory contains no Spec #63 or #64 files; the sequence resumes at Spec #65. The Specification Register v2.6 records this as reserved (connector schedules implemented via INDEX.md updates). The numbering is verified absent rather than missing-from-pack.
- **Debt type:** Reference-dangling (mitigated)
- **Scope of fix:** No source-side fix expected — the absence is by design per Specification Register v2.6. Future Kiro work that needs to refer to "Spec #63" or "Spec #64" must instead cite the connector schedule entry in `docs/03_api_specs/INDEX.md`. Programme rule: any active artifact referring to #63/#64 must be reviewed and re-pointed to INDEX.md.
- **Affected specs / artifacts:** `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/` (no #63/#64); `00_SPECIFICATION_REGISTER_v2_6.md`; `docs/03_api_specs/INDEX.md`
- **Scheduled resolution:** Standing — no action required unless an active artifact dangles a #63/#64 reference
- **Status:** OPEN (low impact; documented)
- **Date logged:** 2026-05-30
- **Last reviewed:** 2026-05-30

**History**
- 2026-05-30: OPEN — seeded from DECISIONS.md DEC-v1.2-Spec63-64-gap

---

### ARCH-DEBT-006 — DEC-spec00-section3-blocked: Spec 00 implementation tasks held pending owner approval

- **Source:** `DECISIONS.md` row `DEC-spec00-section3-blocked` (2026-05-27)
- **Description:** Tasks 3.1, 3.2, 3.3 of `.kiro/specs/00-programme-foundation/` remain blocked pending owner pack-validation approval. AGENTS.md and BP-00 both require owner approval before code generation. No implementation code has been produced. The block is in force.
- **Debt type:** Decision-blocked
- **Scope of fix:** Owner pack-validation approval (the explicit prime-directive condition in AGENTS.md). Resolution is the validation event itself; until then the block is correct.
- **Affected specs / artifacts:** `.kiro/specs/00-programme-foundation/`; BP-00; `AGENTS.md` prime directive
- **Scheduled resolution:** Pending owner approval
- **Status:** OPEN (correctly blocked; tracked here so it isn't forgotten)
- **Date logged:** 2026-05-30
- **Last reviewed:** 2026-05-30

**History**
- 2026-05-30: OPEN — seeded from DECISIONS.md DEC-spec00-section3-blocked

---

### ARCH-DEBT-007 — PHASE_E_PROPOSAL.md is a draft proposal orphan

- **Source:** `GOVERNANCE_MAP.md` Orphan-E
- **Description:** `docs/00_authority/PHASE_E_PROPOSAL.md` proposes E1/E2/E3 for Spec 06 ("Phase E not fully specified in repository"). Not referenced from `BUILD_SEQUENCE.md`, BP-05, or `DECISIONS.md`. The proposal is unincorporated into the active build chain; whether to incorporate, retire, or rework is undecided.
- **Debt type:** Decision-blocked (incorporation pending)
- **Scope of fix:** Owner decision on PHASE_E disposition: incorporate into the rebuilt build sequence, retire to `_superseded/`, or rework. The decision must be recorded in `DECISIONS.md`.
- **Affected specs / artifacts:** `docs/00_authority/PHASE_E_PROPOSAL.md`; `BUILD_SEQUENCE.md`; BP-05; Spec 06 chain
- **Scheduled resolution:** Tied to build-plan replacement (`DEC-build-plan-replacement`)
- **Status:** OPEN
- **Date logged:** 2026-05-30
- **Last reviewed:** 2026-05-30

**History**
- 2026-05-30: OPEN — seeded from GOVERNANCE_MAP.md Orphan-E

---

### ARCH-DEBT-008 — Build plan stack retired but not replaced

- **Source:** `DECISIONS.md` row `DEC-build-plan-replacement` (2026-05-30)
- **Description:** The current build-planning stack — `BUILD_SEQUENCE.md` v1.3.1, `BUILD_VERSION_ROADMAP.md` v1.1, `.kiro/steering/build-pack-discipline.md`, `BP-00`–`BP-23` at `docs/04_build_packs/`, and the implied sequence in `.kiro/specs/INDEX.md` — is RETIRED, not reconciled. The replacement build sequence is to be derived from the clean knowledge graph (Step 2 / Task 8). Until replacement is produced, the programme has retired-but-not-replaced build planning.
- **Debt type:** Supersession-uncleared
- **Scope of fix:** Complete the four primary knowledge-graph artefacts (`SYSTEM_KNOWLEDGE_GRAPH.md` ✓, `DOMAIN_REGISTER.md`, `RELATIONSHIP_MAP.md`, `ARCHITECTURAL_FINDINGS.md`), then rebuild build sequence from the verified graph. On replacement, retire the listed artifacts to `_superseded/` per the standing artifact-lifecycle gap (G-08).
- **Affected specs / artifacts:** `BUILD_SEQUENCE.md`; `BUILD_VERSION_ROADMAP.md`; `.kiro/steering/build-pack-discipline.md`; `docs/04_build_packs/BP-00…BP-23`; `.kiro/specs/INDEX.md`
- **Scheduled resolution:** Active — work in progress (Task 8: knowledge graph build)
- **Status:** IN PROGRESS
- **Date logged:** 2026-05-30
- **Last reviewed:** 2026-05-30

**History**
- 2026-05-30: IN PROGRESS — seeded from DECISIONS.md DEC-build-plan-replacement; SYSTEM_KNOWLEDGE_GRAPH.md complete; three artefacts pending
