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


---

### ARCH-DEBT-009 — Behavioural Signal (signal purpose 7) body truncated — Spec #61 §3.7

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-01; `SYSTEM_KNOWLEDGE_GRAPH.md` §3.2 GAP; Spec #61 §3.7
- **Description:** The eight-purpose enumeration (Configuration / State / Verdict / Detection / Case / Inventory / Behavioural / Threat) is complete by name. The §3.7 body for Behavioural Signal was truncated in the read pass. Connector → Internal Behavioural Intelligence / External Threat downstream binding for behavioural-class signal is therefore partially specified.
- **Debt type:** Reference-dangling (read-state GAP)
- **Scope of fix:** Targeted re-read of Spec #61 §3.7; update the knowledge graph and any downstream artefacts that depend on the full §3.7 body.
- **Affected specs / artifacts:** Spec #61 §3.7; `SYSTEM_KNOWLEDGE_GRAPH.md` §3.2
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)

---

### ARCH-DEBT-010 — Connector conformance tier names not enumerated — Spec #61 §4.1

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-02; `SYSTEM_KNOWLEDGE_GRAPH.md` §3.3 GAP; Spec #61 §4.1; Spec #55 v2.6 §V2.6-10
- **Description:** Per-class conformance tier system is referenced in the §4.1 portion read, but the full four-tier nomenclature (the actual tier labels) was not enumerated. The labels are referenced in Spec #55 v2.6 §V2.6-10 as `connector.conformance.*` parameters but the parameter names alone do not yield the tier vocabulary.
- **Debt type:** Reference-dangling (read-state GAP)
- **Scope of fix:** Re-read Spec #61 §4.1; cross-check Spec #55 v2.6 §V2.6-10; record the four-tier vocabulary in the knowledge graph and the connector-contract domain entry.
- **Affected specs / artifacts:** Spec #61 §4.1; Spec #55 v2.6 §V2.6-10; `SYSTEM_KNOWLEDGE_GRAPH.md` §3.3
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)

---

### ARCH-DEBT-011 — Full v2.6 risk-object type extension list incomplete — MTS v7.0 §6.3

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-03; `SYSTEM_KNOWLEDGE_GRAPH.md` §7.1 GAP; MTS v7.0 §6.3
- **Description:** The 17-value base RiskObject enum is verified (Spec #29 v2.0 patch §3). MTS v7.0 §6.3 confirms the v2.6 extension adds `ooda_phase_degradation` and "additional types," but the full extension list was truncated in the read pass. Engine → Case Lifecycle edges may be missing types beyond `ooda_phase_degradation`.
- **Debt type:** Reference-dangling (read-state GAP)
- **Scope of fix:** Re-read MTS v7.0 §6.3; update the RiskObject enum coverage in the knowledge graph and any case-lifecycle dependent artefact.
- **Affected specs / artifacts:** MTS v7.0 §6.3; `SYSTEM_KNOWLEDGE_GRAPH.md` §7.1
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)

---

### ARCH-DEBT-012 — Workspace bodies for the four middle workspaces not read — MP v5.0 §24

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-04; `SYSTEM_KNOWLEDGE_GRAPH.md` §14.1 GAP; MP v5.0 §24
- **Description:** Six-workspace structure is confirmed by name (Executive Posture, Drift Operations, Control & Architecture, Identity & Asset Intelligence, Assurance & Audit, Transformation & M&A). The four middle workspace bodies — primary personas, contents, jobs-to-be-done — were not read in this pass.
- **Debt type:** Reference-dangling (read-state GAP)
- **Scope of fix:** Re-read MP v5.0 §24; populate workspace persona / contents / jobs-to-be-done in the knowledge graph and surface composition artefacts.
- **Affected specs / artifacts:** MP v5.0 §24; `SYSTEM_KNOWLEDGE_GRAPH.md` §14.1
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)

---

### ARCH-DEBT-013 — Full eleven-persona enumeration not read — Spec #17 v2.6

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-05; `SYSTEM_KNOWLEDGE_GRAPH.md` §15.1 GAP; MTS v7.0 §9.1; MP v5.0 §22; Spec #17 v2.6 Persona Expansion Addendum
- **Description:** MTS v7.0 §9.1 references "eleven personas (nine existing plus Security Analyst and Risk Analyst)." The two new v2.6 personas are confirmed by name. The other nine were not enumerated as a list in the §V2.6 portions read. Persona-to-domain visibility (D-37 RBAC) is partial.
- **Debt type:** Reference-dangling (read-state GAP)
- **Scope of fix:** Re-read Spec #17 v2.6 Persona Expansion Addendum; record the full 11-persona list and their domain visibility in the knowledge graph and RBAC-relevant artefacts.
- **Affected specs / artifacts:** Spec #17 v2.6 Persona Expansion Addendum; MTS v7.0 §9.1; MP v5.0 §22; `SYSTEM_KNOWLEDGE_GRAPH.md` §15.1
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)

---

### ARCH-DEBT-014 — Spec #08 §5–§15 not read — internal CCHE mechanics partial

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-06; `SYSTEM_KNOWLEDGE_GRAPH.md` §7.8 GAP; Spec #08 §5–§15
- **Description:** Only ToC + §1–§4 + the v2.6 Extension addendum were read. Sections 5–15 (Case Action Algorithm; Assignment Engine; Case Pulse SOM Command Surface; Teams, Ranks, Specialisms; Operational Passport; Evidence Packs and Rollback Snapshots; Audit and Logging Requirements; Acceptance Criteria) are not yet sourced. Case Lifecycle (D-18) internal mechanics partially mapped.
- **Debt type:** Reference-dangling (read-state GAP)
- **Scope of fix:** Re-read Spec #08 §5–§15; populate case-lifecycle internal mechanics, assignment engine, evidence-pack semantics, and audit/logging requirements in the knowledge graph.
- **Affected specs / artifacts:** Spec #08 §5–§15; `SYSTEM_KNOWLEDGE_GRAPH.md` §7.8
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)

---

### ARCH-DEBT-015 — Act Phase Dashboard composition body partial — Spec #67 §6

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-07; `SYSTEM_KNOWLEDGE_GRAPH.md` §9 GAP; Spec #67 §6
- **Description:** Observe / Orient / Decide / Command Tempo dashboards captured. The Act Phase Dashboard composition body (Spec #67 §6) was read by reference in this pass with the full body truncated. Affects OODA → Surface Layer drill paths for the Act phase only.
- **Debt type:** Reference-dangling (read-state GAP)
- **Scope of fix:** Re-read Spec #67 §6; record Act Phase Dashboard composition and drill paths in the knowledge graph.
- **Affected specs / artifacts:** Spec #67 §6; `SYSTEM_KNOWLEDGE_GRAPH.md` §9
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Tracking)

---

### ARCH-DEBT-016 — Identity / Asset Intelligence Surface compositions partial — Spec #68 §3+ / Spec #69 §3+

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-08; `SYSTEM_KNOWLEDGE_GRAPH.md` §14.5 GAP; Spec #68 §3+; Spec #69 §3+
- **Description:** §1–§2 of both surfaces confirmed (purpose, surface statement). Sections 3+ (composition, drill paths, RBAC integration, build readiness) not read. Surface Layer composition edges are therefore partial.
- **Debt type:** Reference-dangling (read-state GAP)
- **Scope of fix:** Re-read Spec #68 §3+; re-read Spec #69 §3+; record full surface compositions, drill paths, and RBAC integration in the knowledge graph.
- **Affected specs / artifacts:** Spec #68 §3+; Spec #69 §3+; `SYSTEM_KNOWLEDGE_GRAPH.md` §14.5
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)

---

### ARCH-DEBT-017 — OODA phase 4 (Act) §3.4 detail truncated — Spec #58 §3.4

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-09; `SYSTEM_KNOWLEDGE_GRAPH.md` §9.1 GAP; Spec #58 §3.4
- **Description:** The Act phase row in §9.1 carries an explicit "(full §3.4 body truncated in this read)" annotation. Phase-health metric inventory for Act is partial.
- **Debt type:** Reference-dangling (read-state GAP)
- **Scope of fix:** Re-read Spec #58 §3.4; complete the Act-phase health metric inventory in the knowledge graph.
- **Affected specs / artifacts:** Spec #58 §3.4; `SYSTEM_KNOWLEDGE_GRAPH.md` §9.1
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Tracking)

---

### ARCH-DEBT-018 — SDR Control Plane Specification §7–§19 not read

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-10; `SYSTEM_KNOWLEDGE_GRAPH.md` §20 GAP; SDR Control Plane Specification v1.1
- **Description:** §0–§6 read in a prior session; §7–§19 not yet read in any session. Tenant Admin → Internal Control Plane runtime contract (D-36) is partially mapped.
- **Debt type:** Reference-dangling (read-state GAP)
- **Scope of fix:** Re-read SDR Control Plane Specification §7–§19; record the full Tenant Admin → Internal Control Plane runtime contract in the knowledge graph.
- **Affected specs / artifacts:** SDR Control Plane Specification v1.1 §7–§19; `SYSTEM_KNOWLEDGE_GRAPH.md` §20
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)

---

### ARCH-DEBT-019 — Insider Risk jurisdictional gate at tenant onboarding — runtime enforcement gap

- **Source:** `ARCHITECTURAL_FINDINGS.md` §3 F-15; Spec #75 §5; Spec #55 v2.6 §V2.6-11
- **Description:** Internal Behavioural Intelligence (D-15) ingestion is governed by jurisdictional regulation (GDPR Article 88, German Works Council provisions, French employee monitoring, US state-level surveillance, UK ICO). Pilot configuration recommendation (Spec #55 §V2.6-13) is `internal_risk.ingestion_enabled = false` until customer confirms readiness. Architectural risk: a customer that switches ingestion on without local-counsel guidance creates a compliance exposure that Commander cannot detect at runtime.
- **Debt type:** Boundary-leak (compliance-gating)
- **Scope of fix:** Add a tenant-onboarding gate that requires explicit jurisdictional acknowledgement (or works-council confirmation, where applicable) before `internal_risk.ingestion_enabled` may flip true. Add the corresponding configuration-governance assertion to the conformance registry.
- **Affected specs / artifacts:** Spec #75 §5; Spec #55 v2.6 §V2.6-11 / §V2.6-13; tenant-onboarding flow (future); `.kiro/testing/conformance-registry.md`
- **Scheduled resolution:** To be scheduled — runtime gate work tied to tenant-admin / control-plane build phase
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Tracking — governance is in source; runtime needs deployment-time gate)

---

### ARCH-DEBT-020 — SOC-boundary attribution propagation across all surfaces showing External Attack Correlation cases

- **Source:** `ARCHITECTURAL_FINDINGS.md` §3 F-16; Spec #57 §5; Spec #65 §3.4
- **Description:** SOC boundary is binding doctrine. Visual attribution ("Commander observes · SOC owns") is specified for the External Operating Picture Case Response Board. Other surfaces that may render External Attack Correlation cases (Fusion Map case-centric view, OODA dashboards, Identity / Asset Intelligence Surfaces) must carry equivalent attribution. Not all surfaces explicitly require the attribution in their respective specs in the read pass.
- **Debt type:** Boundary-leak (cross-surface attribution)
- **Scope of fix:** Cross-check every surface that may render an External Attack Correlation case and confirm SOC-boundary attribution is required in that spec section. Where missing, propose an addendum to the relevant spec.
- **Affected specs / artifacts:** Spec #57 §5; Spec #65 §3.4; Fusion Map spec; OODA dashboard specs; Spec #68 / Spec #69 surface specs; any other External Attack Correlation rendering surface
- **Scheduled resolution:** To be scheduled — surface-by-surface attribution audit
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)

---

### ARCH-DEBT-021 — Authority precedence stated three times with different tier counts

- **Source:** `ARCHITECTURAL_FINDINGS.md` §5 F-21; `GOVERNANCE_MAP.md` O-01, C-04
- **Description:** Three statements of authority precedence at different granularities: AGENTS.md (9-step authority read order), AUTHORITY_MODEL.md (8-tier precedence stack), `.kiro/steering/authority-and-precedence.md` (6-tier authority order). Operationally non-conflicting but inconsistent in form.
- **Debt type:** Cross-document conflict (form, not behaviour)
- **Scope of fix:** Consolidate into one canonical precedence document; the others become pointers to the canonical statement.
- **Affected specs / artifacts:** `AGENTS.md`; `docs/00_authority/AUTHORITY_MODEL.md`; `.kiro/steering/authority-and-precedence.md`
- **Scheduled resolution:** To be scheduled
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Tracking)

---

### ARCH-DEBT-022 — Steering's status — guidance or authority — formal contradiction in AUTHORITY_MODEL

- **Source:** `ARCHITECTURAL_FINDINGS.md` §5 F-22; `GOVERNANCE_MAP.md` C-05
- **Description:** AUTHORITY_MODEL.md Kiro authority rule #1 declares "Steering files are persistent workspace guidance, not independent source authority." The same AUTHORITY_MODEL.md precedence stack tier 5 places "Kiro steering and specs generated in this pack" inside the precedence ladder. Steering is also frontmatter-tagged `inclusion: always`. Operational reality is unambiguous (steering binds); documented framing is internally inconsistent.
- **Debt type:** Cross-document conflict (formal, not operational)
- **Scope of fix:** Reconcile the framing — state plainly that steering is binding workspace guidance; update AUTHORITY_MODEL.md tier #1 wording to remove the "not independent source authority" phrasing.
- **Affected specs / artifacts:** `docs/00_authority/AUTHORITY_MODEL.md`; `.kiro/steering/*` frontmatter tags
- **Scheduled resolution:** To be scheduled
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Tracking)

---

### ARCH-DEBT-023 — UI authority — DS-1.0 vs design-system-contract steering (latent conflict)

- **Source:** `ARCHITECTURAL_FINDINGS.md` §5 F-23; `GOVERNANCE_MAP.md` C-07
- **Description:** `docs/06_ui_build_reference/DESIGN_SYSTEM.md` (DS-1.0) declares itself authoritative for UI build rules. `.kiro/steering/design-system-contract.md` declares itself "the complete build rulebook for all Commander SDR pages." Both claim authority. Not yet known to contradict on a specific value, but two artefacts with overlapping scope both declaring binding authority is a structural conflict in the making.
- **Debt type:** Cross-document conflict (latent)
- **Scope of fix:** Declare precedence between DS-1.0 and the design-system-contract steering (most likely DS-1.0 → steering as scoped detail). Record the precedence in `DECISIONS.md` and in both files' headers.
- **Affected specs / artifacts:** `docs/06_ui_build_reference/DESIGN_SYSTEM.md` (DS-1.0); `.kiro/steering/design-system-contract.md`; `DECISIONS.md`
- **Scheduled resolution:** To be scheduled
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Tracking — latent)

---

### ARCH-DEBT-024 — Page-layout-standard cites unverified decision IDs

- **Source:** `ARCHITECTURAL_FINDINGS.md` §5 F-24; `GOVERNANCE_MAP.md` C-08
- **Description:** `.kiro/steering/page-layout-standard.md` cites authority `DEC-pagecontainer-shared-standard` and `DEC-pagecontainer-exceptions` (DECISIONS.md). Run-1 inventory found those decision row IDs were referenced but not pinpoint-verified in `DECISIONS.md`. If they are not formally recorded, the steering's authority basis is dangling.
- **Debt type:** Reference-dangling
- **Scope of fix:** Verify the cited decisions exist in `DECISIONS.md`; if missing, record them; if present, add a note to the steering linking to the recorded rows.
- **Affected specs / artifacts:** `.kiro/steering/page-layout-standard.md`; `DECISIONS.md`
- **Scheduled resolution:** To be scheduled
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Tracking)

---

### ARCH-DEBT-025 — CONVERSION_FINDINGS.md generation — v1.1 stamp but cited as live session log

- **Source:** `ARCHITECTURAL_FINDINGS.md` §5 F-25; `GOVERNANCE_MAP.md` C-09
- **Description:** `docs/00_authority/CONVERSION_FINDINGS.md` carries header "Pack version: v1.1; v1.1 remediation applied; no application code generated" — three pack-versions out of date (v1.1 → v1.2 → v1.3 → v1.3.1). DAILY_OPERATING_LOOP.md and SESSION_START.md / VERIFY_AND_CLOSE.md prompts treat it as a live append-only session log. Either dual-purpose with no header note, or the operating loop is referencing a log that doesn't exist.
- **Debt type:** Cross-document conflict (active prompts depend on an undeclared dual purpose)
- **Scope of fix:** Resolve the dual purpose explicitly — either rename / migrate the conversion-findings document and let the session log live elsewhere, or update the file header to declare the dual purpose and update DAILY_OPERATING_LOOP.md / SESSION_START.md / VERIFY_AND_CLOSE.md references accordingly.
- **Affected specs / artifacts:** `docs/00_authority/CONVERSION_FINDINGS.md`; `docs/00_authority/DAILY_OPERATING_LOOP.md`; `docs/07_prompt_library/SESSION_START.md`; `docs/07_prompt_library/VERIFY_AND_CLOSE.md`
- **Scheduled resolution:** To be scheduled
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)

---

### ARCH-DEBT-026 — Command Centre — "Implemented" vs "Deferred" — scope-boundary unstated

- **Source:** `ARCHITECTURAL_FINDINGS.md` §5 F-26; `GOVERNANCE_MAP.md` C-02
- **Description:** BUILD_SEQUENCE Gate 1 step 6 names "Command Centre first functional surface." BUILD_VERSION_ROADMAP includes "Command Centre" in v1.1 outcomes. BP-04 self-status declares "Implemented." `command-centre-build-prompt.md` self-status declares "DEFERRED until after functional pages are built" with `DEC-command-centre-deferred`. Conformance registry `DEC-002`: "No Command Centre implementation until data-point-to-metric schedule complete." Likely scope-boundary issue (skeleton vs full Command Centre), not real conflict, but unstated.
- **Debt type:** Cross-document conflict (scope-boundary unstated)
- **Scope of fix:** Reconcile explicitly — distinguish "first functional surface" (BP-04 scope) from "full Command Centre" (deferred scope), and record the distinction in `DECISIONS.md` and in both BP-04 and `command-centre-build-prompt.md` headers.
- **Affected specs / artifacts:** `BUILD_SEQUENCE.md` Gate 1; `BUILD_VERSION_ROADMAP.md` v1.1; `docs/04_build_packs/BP-04-*`; `docs/design-system/command-centre-build-prompt.md`; `DECISIONS.md`; `.kiro/testing/conformance-registry.md` DEC-002
- **Scheduled resolution:** To be scheduled — likely subsumed by build-plan replacement (`ARCH-DEBT-008`)
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)

---

### ARCH-DEBT-027 — Spec #21 BAS Connector is staged / Phase 2 (by design)

- **Source:** `ARCHITECTURAL_FINDINGS.md` §6 F-27; Spec #21 §Authority note (Phase 2 strategic / advanced)
- **Description:** BAS validation is staged Phase 2. Until activation, Spec #20 Coordinated Push Group / D-20 Validation depends on it for empirical validation but it is not online. By-design phasing rather than accidental orphan; tracked here so the dependency is visible.
- **Debt type:** Decision-blocked (by design — Phase 2 gate)
- **Scope of fix:** Activation tied to Phase 2 readiness gate; no source-side fix expected before then. The dependency from Spec #20 / D-20 must be tracked so that Phase 2 activation is recognised as the unblocking event.
- **Affected specs / artifacts:** Spec #21; Spec #20; D-20 Validation domain entry
- **Scheduled resolution:** Phase 2 readiness gate
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Tracking — by design, Phase 2)

---

### ARCH-DEBT-028 — Spec #24 Connector API Reference Framework is template-only

- **Source:** `ARCHITECTURAL_FINDINGS.md` §6 F-28; `RELATIONSHIP_MAP.md` §10; Spec #24 (cited in Spec #61 header)
- **Description:** Reference framework with no concrete connector references in the v2.6 read pass. Per-vendor implementations not in baseline.
- **Debt type:** Decision-blocked (Phase 2 / live-vendor activation)
- **Scope of fix:** Phase 2 / live-vendor work activates concrete references; no source-side fix expected before then.
- **Affected specs / artifacts:** Spec #24; Spec #61 header reference; `RELATIONSHIP_MAP.md` §10
- **Scheduled resolution:** Phase 2 readiness gate
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Tracking)

---

### ARCH-DEBT-029 — Hook companion files lack canonical-relationship declaration

- **Source:** `ARCHITECTURAL_FINDINGS.md` §6 F-30; `GOVERNANCE_MAP.md` O-05, Orphan-H
- **Description:** Hooks 01–04 each have three forms (`.md` recipe, `.json` metadata, `.kiro.hook` runtime). Hook 05 has only `.kiro.hook`. No declaration stated the canonical relationship — i.e. that `.kiro.hook` is canonical and the others are companions. Possible orphans relative to runtime form.
- **Debt type:** Missing-ownership (canonical-relationship declaration)
- **Scope of fix:** Add a declaration in `.kiro/hooks/README.md` stating ".kiro.hook is canonical; .md is the recipe; .json is metadata-mirror" and the rules that follow from that.
- **Affected specs / artifacts:** `.kiro/hooks/README.md`; `.kiro/hooks/01-…04-*.{md,json,kiro.hook}`; `.kiro/hooks/05-….kiro.hook`
- **Scheduled resolution:** Source-side fix shipped in commit 26ec647 (hook build commit) — `.kiro/hooks/README.md` now contains the canonical-relationship declaration. Pending review for promotion to RESOLVED.
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Tracking). Note: source-side fix already shipped in commit 26ec647; entry held OPEN pending owner review for promotion to RESOLVED.
