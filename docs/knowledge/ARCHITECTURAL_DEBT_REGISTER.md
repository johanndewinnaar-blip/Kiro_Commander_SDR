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
- **Debt class:** governance-debt
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
- **Debt class:** governance-debt
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
- **Debt class:** governance-debt
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
- **Debt class:** governance-debt
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
- **Debt class:** governance-debt
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
- **Debt class:** governance-debt
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
- **Debt class:** governance-debt
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
- **Debt class:** governance-debt
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
- **Debt class:** governance-debt
- **Scope of fix:** Targeted re-read of Spec #61 §3.7; update the knowledge graph and any downstream artefacts that depend on the full §3.7 body.
- **Affected specs / artifacts:** Spec #61 §3.7; `SYSTEM_KNOWLEDGE_GRAPH.md` §3.2
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** RESOLVED
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)
- 2026-05-31: RESOLVED — Spec #61 §3.7 read in full from `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/61_Universal_Security_Signal_Connector_Contract_Spec.md`. Behavioural Signal disposition body sourced and filled into SYSTEM_KNOWLEDGE_GRAPH.md §3.2 (signal purpose 7). COVERAGE.md updated.

---

### ARCH-DEBT-010 — Connector conformance tier names not enumerated — Spec #61 §4.1

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-02; `SYSTEM_KNOWLEDGE_GRAPH.md` §3.3 GAP; Spec #61 §4.1; Spec #55 v2.6 §V2.6-10
- **Description:** Per-class conformance tier system is referenced in the §4.1 portion read, but the full four-tier nomenclature (the actual tier labels) was not enumerated. The labels are referenced in Spec #55 v2.6 §V2.6-10 as `connector.conformance.*` parameters but the parameter names alone do not yield the tier vocabulary.
- **Debt type:** Reference-dangling (read-state GAP)
- **Debt class:** governance-debt
- **Scope of fix:** Re-read Spec #61 §4.1; cross-check Spec #55 v2.6 §V2.6-10; record the four-tier vocabulary in the knowledge graph and the connector-contract domain entry.
- **Affected specs / artifacts:** Spec #61 §4.1; Spec #55 v2.6 §V2.6-10; `SYSTEM_KNOWLEDGE_GRAPH.md` §3.3
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** RESOLVED
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)
- 2026-05-31: RESOLVED — Spec #61 §4.1 read in full. The four conformance tier names are **Certified**, **Full**, **Baseline**, **Planned** (Spec #61 §4.1 verbatim); the same four tiers govern all four connector classes (§§4.1–4.4) and test cadence (§7). Filled into SYSTEM_KNOWLEDGE_GRAPH.md §3.3. COVERAGE.md updated.

---

### ARCH-DEBT-011 — Full v2.6 risk-object type extension list incomplete — MTS v7.0 §6.3

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-03; `SYSTEM_KNOWLEDGE_GRAPH.md` §7.1 GAP; MTS v7.0 §6.3
- **Description:** The 17-value base RiskObject enum is verified (Spec #29 v2.0 patch §3). MTS v7.0 §6.3 confirms the v2.6 extension adds `ooda_phase_degradation` and "additional types," but the full extension list was truncated in the read pass. Engine → Case Lifecycle edges may be missing types beyond `ooda_phase_degradation`.
- **Debt type:** Reference-dangling (read-state GAP)
- **Debt class:** governance-debt
- **Scope of fix:** Re-read MTS v7.0 §6.3; update the RiskObject enum coverage in the knowledge graph and any case-lifecycle dependent artefact.
- **Affected specs / artifacts:** MTS v7.0 §6.3; `SYSTEM_KNOWLEDGE_GRAPH.md` §7.1
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** RESOLVED
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)
- 2026-05-31: RESOLVED — MTS v7.0 §6.3 read in full from `docs/99_source_archive/baseline_v2_6_2/docs/00_master/Commander_SDR_Master_Technical_Specification_v7_0.md`. The v2.6 extension adds five values: `external_attack_correlation`, `verdict_pattern`, `coverage_blindspot`, `policy_effectiveness`, `ooda_phase_degradation`. Combined with the 17-value v2.5 base the v2.6 RiskObject enum totals 22 values. Filled into SYSTEM_KNOWLEDGE_GRAPH.md §7.1.

---

### ARCH-DEBT-012 — Workspace bodies for the four middle workspaces not read — MP v5.0 §24

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-04; `SYSTEM_KNOWLEDGE_GRAPH.md` §14.1 GAP; MP v5.0 §24
- **Description:** Six-workspace structure is confirmed by name (Executive Posture, Drift Operations, Control & Architecture, Identity & Asset Intelligence, Assurance & Audit, Transformation & M&A). The four middle workspace bodies — primary personas, contents, jobs-to-be-done — were not read in this pass.
- **Debt type:** Reference-dangling (read-state GAP)
- **Debt class:** governance-debt
- **Scope of fix:** Re-read MP v5.0 §24; populate workspace persona / contents / jobs-to-be-done in the knowledge graph and surface composition artefacts.
- **Affected specs / artifacts:** MP v5.0 §24; `SYSTEM_KNOWLEDGE_GRAPH.md` §14.1
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** RESOLVED
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)
- 2026-05-31: RESOLVED — MP v5.0 §24 (Workspace Model) read in full. The four middle workspace rows: Drift Operations (Case queues, triage, operational oversight, escalation, SLA management — SOA, SOM, Security Analyst, Vulnerability Analyst); Control & Architecture (Control logic, architecture analysis, exception review, rule/model building — Security Architect, Control Owner); Identity & Asset Intelligence (Identity, asset, relationship, ownership analysis — Identity/Access Specialist, Security Architect, Security Analyst); Assurance & Audit (Evidence, compliance mapping, exceptions, governance, proof — Risk/Compliance/Audit User). Filled into SYSTEM_KNOWLEDGE_GRAPH.md §14.1. COVERAGE.md updated.

---

### ARCH-DEBT-013 — Full eleven-persona enumeration not read — Spec #17 v2.6

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-05; `SYSTEM_KNOWLEDGE_GRAPH.md` §15.1 GAP; MTS v7.0 §9.1; MP v5.0 §22; Spec #17 v2.6 Persona Expansion Addendum
- **Description:** MTS v7.0 §9.1 references "eleven personas (nine existing plus Security Analyst and Risk Analyst)." The two new v2.6 personas are confirmed by name. The other nine were not enumerated as a list in the §V2.6 portions read. Persona-to-domain visibility (D-37 RBAC) is partial.
- **Debt type:** Reference-dangling (read-state GAP)
- **Debt class:** governance-debt
- **Scope of fix:** Re-read Spec #17 v2.6 Persona Expansion Addendum; record the full 11-persona list and their domain visibility in the knowledge graph and RBAC-relevant artefacts.
- **Affected specs / artifacts:** Spec #17 v2.6 Persona Expansion Addendum; MTS v7.0 §9.1; MP v5.0 §22; `SYSTEM_KNOWLEDGE_GRAPH.md` §15.1
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** RESOLVED
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)
- 2026-05-31: RESOLVED — full eleven-persona enumeration found and read verbatim, but in a different source location than the original GAP claim. **Source-location finding:** the enumeration is in **MP v5.0 §22** (Target Users and Persona Model), not in Spec #17 v2.6. Spec #17's v2.6 addendum is the OODA Integration Addendum (V2.6-1..V2.6-4) — it does not contain a persona expansion. The nine v2.5 personas (SOA, SOM, Vulnerability Analyst, Security Architect, Identity/Access Specialist, Risk/Compliance/Audit User, M&A/Transformation Analyst, CISO, Control Owner) and two v2.6 additions (Security Analyst, Risk Analyst) are filled into SYSTEM_KNOWLEDGE_GRAPH.md §15.1 with the source-location correction recorded in §20.1. COVERAGE.md updated for both MP v5.0 (§22) and Spec #17 (source-location finding).

---

### ARCH-DEBT-014 — Spec #08 §5–§15 not read — internal CCHE mechanics partial

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-06; `SYSTEM_KNOWLEDGE_GRAPH.md` §7.8 GAP; Spec #08 §5–§15
- **Description:** Only ToC + §1–§4 + the v2.6 Extension addendum were read. Sections 5–15 (Case Action Algorithm; Assignment Engine; Case Pulse SOM Command Surface; Teams, Ranks, Specialisms; Operational Passport; Evidence Packs and Rollback Snapshots; Audit and Logging Requirements; Acceptance Criteria) are not yet sourced. Case Lifecycle (D-18) internal mechanics partially mapped.
- **Debt type:** Reference-dangling (read-state GAP)
- **Debt class:** governance-debt
- **Scope of fix:** Re-read Spec #08 §5–§15; populate case-lifecycle internal mechanics, assignment engine, evidence-pack semantics, and audit/logging requirements in the knowledge graph.
- **Affected specs / artifacts:** Spec #08 §5–§15; `SYSTEM_KNOWLEDGE_GRAPH.md` §7.8
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** RESOLVED
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)
- 2026-05-31: RESOLVED — Spec #08 §§5, 8, 9, 10, 11, 12, 13, 14, 14A, 15 read from `08_Case_Management_Workflow_Spec.md`. CCHE mechanics filled into SYSTEM_KNOWLEDGE_GRAPH.md §7.9 across eleven sub-sections covering: three deterministic scores (CRS / MS / WCS), Case Action Algorithm with NBA list and Push preference rule, parent and SubCase state machines, Assignment Engine with override governance and anti-hoarding TTL, Case Pulse SOM Command Surface with three operating modes, Teams/Ranks (L0–L7)/nine specialism domains, Operational Passport with SHA-256 hash chain, Evidence Packs and Rollback Snapshots, mandatory audit event types, migration notes and §14A closed-loop email communication alignment, and acceptance criteria across Epics A–G. §§16–19 (Team Builder, Team Performance Dashboard, CRS Confidence Intervals, Resolution Durability Score) remain not opened — recorded in COVERAGE.md as not-yet-read partial state.

---

### ARCH-DEBT-015 — Act Phase Dashboard composition body partial — Spec #67 §6

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-07; `SYSTEM_KNOWLEDGE_GRAPH.md` §9 GAP; Spec #67 §6
- **Description:** Observe / Orient / Decide / Command Tempo dashboards captured. The Act Phase Dashboard composition body (Spec #67 §6) was read by reference in this pass with the full body truncated. Affects OODA → Surface Layer drill paths for the Act phase only.
- **Debt type:** Reference-dangling (read-state GAP)
- **Debt class:** governance-debt
- **Scope of fix:** Re-read Spec #67 §6; record Act Phase Dashboard composition and drill paths in the knowledge graph.
- **Affected specs / artifacts:** Spec #67 §6; `SYSTEM_KNOWLEDGE_GRAPH.md` §9
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** RESOLVED
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Tracking)
- 2026-05-31: RESOLVED — Spec #67 §6 read in full. Act Phase Dashboard composition (panels: Act phase health gauge, Execution throughput, Execution latency, Execution success rate, Validation pending, Failed actions, Closure tempo) plus drill paths and primary personas (SOM, Push Operations, Platform Engineering, CISO) sourced and filled into SYSTEM_KNOWLEDGE_GRAPH.md §9.3.1. §7 Command Tempo Dashboard composition also read and added at §9.3.2 as bonus material.

---

### ARCH-DEBT-016 — Identity / Asset Intelligence Surface compositions partial — Spec #68 §3+ / Spec #69 §3+

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-08; `SYSTEM_KNOWLEDGE_GRAPH.md` §14.5 GAP; Spec #68 §3+; Spec #69 §3+
- **Description:** §1–§2 of both surfaces confirmed (purpose, surface statement). Sections 3+ (composition, drill paths, RBAC integration, build readiness) not read. Surface Layer composition edges are therefore partial.
- **Debt type:** Reference-dangling (read-state GAP)
- **Debt class:** governance-debt
- **Scope of fix:** Re-read Spec #68 §3+; re-read Spec #69 §3+; record full surface compositions, drill paths, and RBAC integration in the knowledge graph.
- **Affected specs / artifacts:** Spec #68 §3+; Spec #69 §3+; `SYSTEM_KNOWLEDGE_GRAPH.md` §14.5
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** RESOLVED
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)
- 2026-05-31: RESOLVED — Spec #68 §§3–10 and Spec #69 §§3–10 read in full. Identity Intelligence Surface six-section composition (Identity Overview · Access Intelligence · Behavioural Intelligence (Internal Risk authority gated) · Threat Intelligence · Case History · Risk Trajectory) and Asset Intelligence Surface seven-section composition (Asset Overview · Configuration State · Verdict History · Behavioural Pattern · Case History · Vulnerability State · Identity Exposure) plus visual language, interaction model, RBAC matrix, build readiness, configurability, audit events, and inter-spec relationships filled into SYSTEM_KNOWLEDGE_GRAPH.md §14.5. COVERAGE.md updated for both specs.

---

### ARCH-DEBT-017 — OODA phase 4 (Act) §3.4 detail truncated — Spec #58 §3.4

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-09; `SYSTEM_KNOWLEDGE_GRAPH.md` §9.1 GAP; Spec #58 §3.4
- **Description:** The Act phase row in §9.1 carries an explicit "(full §3.4 body truncated in this read)" annotation. Phase-health metric inventory for Act is partial.
- **Debt type:** Reference-dangling (read-state GAP)
- **Debt class:** governance-debt
- **Scope of fix:** Re-read Spec #58 §3.4; complete the Act-phase health metric inventory in the knowledge graph.
- **Affected specs / artifacts:** Spec #58 §3.4; `SYSTEM_KNOWLEDGE_GRAPH.md` §9.1
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** RESOLVED
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Tracking)
- 2026-05-31: RESOLVED — Spec #58 §3.4 (Act phase) read in full. Engines consumed (Push execution Spec #14/#20, SOAR dispatch, ITSM record creation, detection-spec handoff Spec #15, compensating-control deployment tracking, validation engine Spec #30, manual-remediation tracking), phase health metrics (execution throughput, latency, success rate, validation pending, failed actions, aggregate score), drill paths, and phase-degradation case routing all sourced. Filled into SYSTEM_KNOWLEDGE_GRAPH.md §9.1 (Act row) and §9.3.1 (Act Phase Dashboard composition).

---

### ARCH-DEBT-018 — SDR Control Plane Specification §7–§19 not read

- **Source:** `ARCHITECTURAL_FINDINGS.md` §2 F-10; `SYSTEM_KNOWLEDGE_GRAPH.md` §20 GAP; SDR Control Plane Specification v1.1
- **Description:** §0–§6 read in a prior session; §7–§19 not yet read in any session. Tenant Admin → Internal Control Plane runtime contract (D-36) is partially mapped.
- **Debt type:** Reference-dangling (read-state GAP)
- **Debt class:** governance-debt
- **Scope of fix:** Re-read SDR Control Plane Specification §7–§19; record the full Tenant Admin → Internal Control Plane runtime contract in the knowledge graph.
- **Affected specs / artifacts:** SDR Control Plane Specification v1.1 §7–§19; `SYSTEM_KNOWLEDGE_GRAPH.md` §20
- **Scheduled resolution:** Knowledge-graph completion read pass
- **Status:** RESOLVED
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Material)
- 2026-05-31: RESOLVED — SDR Control Plane Specification v1.1 §§7–19 read in full from `docs/99_source_archive/baseline_v2_6_2/docs/00_master/SDR_Control_Plane_Specification_v1_1.md`. Feature Registry FR-001 source-of-truth coupling, signed `EntitlementManifest` schema, effective feature state computation across three control scopes (`operator-only`, `tenant-admin`, `operator-sets-tenant-configures`), special tenant types (dogfood, demo, trial), usage metering boundaries, self-hosted licence model with `LicenceService` abstraction, code-update boundary (Control Plane does NOT deploy code; CI-CD owns deployment), full Control Plane API list, security/audit/tenant-isolation requirements, implementation phasing, and acceptance criteria all sourced. Filled into SYSTEM_KNOWLEDGE_GRAPH.md §6.1 (SDR Commercial Control Plane runtime contract). COVERAGE.md updated.

---

### ARCH-DEBT-019 — Insider Risk jurisdictional gate at tenant onboarding — runtime enforcement gap

- **Source:** `ARCHITECTURAL_FINDINGS.md` §3 F-15; Spec #75 §5; Spec #55 v2.6 §V2.6-11
- **Description:** Internal Behavioural Intelligence (D-15) ingestion is governed by jurisdictional regulation (GDPR Article 88, German Works Council provisions, French employee monitoring, US state-level surveillance, UK ICO). Pilot configuration recommendation (Spec #55 §V2.6-13) is `internal_risk.ingestion_enabled = false` until customer confirms readiness. Architectural risk: a customer that switches ingestion on without local-counsel guidance creates a compliance exposure that Commander cannot detect at runtime.
- **Debt type:** Boundary-leak (compliance-gating)
- **Debt class:** governance-debt
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
- **Debt class:** governance-debt
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
- **Debt class:** governance-debt
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
- **Debt class:** governance-debt
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
- **Debt class:** governance-debt
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
- **Debt class:** governance-debt
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
- **Debt class:** governance-debt
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
- **Debt class:** governance-debt
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
- **Debt class:** governance-debt
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
- **Debt class:** governance-debt
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
- **Debt class:** governance-debt
- **Scope of fix:** Add a declaration in `.kiro/hooks/README.md` stating ".kiro.hook is canonical; .md is the recipe; .json is metadata-mirror" and the rules that follow from that.
- **Affected specs / artifacts:** `.kiro/hooks/README.md`; `.kiro/hooks/01-…04-*.{md,json,kiro.hook}`; `.kiro/hooks/05-….kiro.hook`
- **Scheduled resolution:** Source-side fix shipped in commit 26ec647 (hook build commit) — `.kiro/hooks/README.md` now contains the canonical-relationship declaration. Pending review for promotion to RESOLVED.
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — bulk-registered from ARCHITECTURAL_FINDINGS.md §8.2 (severity: Tracking). Note: source-side fix already shipped in commit 26ec647; entry held OPEN pending owner review for promotion to RESOLVED.


---

### ARCH-DEBT-030 — Risk Object DB schema missing (contract + fixture exist)

- **Source:** DATA_DICTIONARY.md contract-vs-schema reconciliation (2026-05-31)
- **Description:** `packages/contracts/src/entities/risk-object.ts` contract exists with full type definitions. `packages/contracts/src/fixtures/seed-risk-objects.ts` fixture exists with seed data. BUT `packages/db/src/schema/` has NO corresponding risk-object schema file. Risk objects cannot be persisted without db schema.
- **Debt type:** Missing-ownership (data-layer incomplete)
- **Debt class:** build-debt
- **Scope of fix:** Create `packages/db/src/schema/risk-objects.ts` with Drizzle schema matching the contract. Map 8 RiskObjectType values (coverage_blindspot, ooda_phase_degradation, vulnerability_drift, configuration_drift, exposure_drift, control_gap, identity_risk, policy_gap) and 4 TreatmentState values (open, mitigated, accepted, transferred). Add to schema index exports.
- **Affected specs / artifacts:** `packages/contracts/src/entities/risk-object.ts`; `packages/contracts/src/fixtures/seed-risk-objects.ts`; `packages/db/src/schema/` (missing file); Spec #29 Universal Risk Object
- **Scheduled resolution:** Data-layer completion pass (before Phase 2)
- **Status:** RESOLVED
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31
- **Resolution date:** 2026-05-31

**Verification:** Checked against Spec #29 Universal Risk Object and Case Binding from `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/29_Universal_Risk_Object_and_Case_Binding_Spec.md`. Evidence: (1) typecheck clean (`tsc --noEmit` on schema + contract + fixtures — exit 0); (2) `vitest run tests/06-case-management/case-domain-model.test.ts` — 26/26 pass; (3) field-for-field diff confirmed: 8 RiskObjectType enum values, 4 TreatmentState enum values, all contract fields mapped to schema columns (standard tenant→tenantId FK, source→4 flattened columns per Spec #05 §11.3); (4) Drizzle migration `0000_risk_objects_unit1.sql` generated with risk_objects table (16 columns, 1 FK), risk_object_type and treatment_state enums.

**History**
- 2026-05-31: OPEN — surfaced from DATA_DICTIONARY.md contract-vs-schema reconciliation
- 2026-05-31: RESOLVED — Unit 1 created `packages/db/src/schema/risk-objects.ts` with full Drizzle schema matching contract, exported enums and table from schema index, updated DATA_DICTIONARY.md Risk Object entry to mark status AVAILABLE
- 2026-05-31: RESOLVED → RESOLVED-unverified — ARCH-009 retroactive audit: RESOLVED line lacks baseline spec #N citation and explicit evidence type (test/typecheck/grep). The schema exists and typechecks (confirmed in session), but the verification was not recorded with the required format. Re-status until a formal verification line is added.
- 2026-05-31: RESOLVED-unverified → RESOLVED — ARCH-009 verification line added with Spec #29 citation and evidence (typecheck + vitest 26/26 + field-for-field diff + migration generation).

---

### ARCH-DEBT-031 — Strategy Policy DB schema missing (contract + fixture exist)

- **Source:** DATA_DICTIONARY.md contract-vs-schema reconciliation (2026-05-31)
- **Description:** `packages/contracts/src/entities/strategy.ts` contract exists with full StrategyPolicy type, 13 StrategySurfaceType values, 6 StrategyPolicyStatus values, and RuntimeBindingTrigger types. `packages/contracts/src/fixtures/seed-strategies.ts` fixture exists with seed data. BUT `packages/db/src/schema/` has NO corresponding strategy schema file. Strategy policies cannot be persisted without db schema.
- **Debt type:** Missing-ownership (data-layer incomplete)
- **Debt class:** build-debt
- **Scope of fix:** Create `packages/db/src/schema/strategies.ts` with Drizzle schema matching the contract. Map 13 StrategySurfaceType values (sla, threshold, automation-boundary, routing, posture, mission-objective, operational-tempo, domain-specific, prioritisation-weight, validation-window, closure-gate, reopening-trigger, evidence-sufficiency) and 6 StrategyPolicyStatus values (draft, pending-approval, approved, active, superseded, rejected). Add to schema index exports.
- **Affected specs / artifacts:** `packages/contracts/src/entities/strategy.ts`; `packages/contracts/src/fixtures/seed-strategies.ts`; `packages/db/src/schema/` (missing file); Spec #32 Strategy Layer Runtime Surface
- **Scheduled resolution:** Data-layer completion pass (before Phase 2)
- **Status:** RESOLVED
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31
- **Resolution date:** 2026-05-31

**Verification:** Checked against Spec #32 Strategy Layer Runtime Surface from `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/32_Strategy_Layer_Runtime_Surface_Spec.md`. Evidence: (1) typecheck clean (`tsc --noEmit` on schema + contract — exit 0); (2) `vitest run` — 601/601 pass (0 new failures); (3) schema maps all 13 StrategySurfaceType enum values and 6 StrategyPolicyStatus enum values; (4) contract fields mapped to schema columns (surfaceType, policyVersion, status, configuration as JSONB, proposedBy, proposedAt, approval as JSONB, effectiveFrom, effectiveUntil, simulationRef, standard tenant FK + 4 source columns per Spec #05 §11.3).

**History**
- 2026-05-31: OPEN — surfaced from DATA_DICTIONARY.md contract-vs-schema reconciliation
- 2026-05-31: RESOLVED — Unit 2 created `packages/db/src/schema/strategies.ts` with full Drizzle schema matching contract. Verification recorded per ARCH-009.

---

### ARCH-DEBT-032 — Case Strategy Binding incomplete (contract exists, db schema + fixture missing)

- **Source:** DATA_DICTIONARY.md contract-vs-schema reconciliation (2026-05-31)
- **Description:** `packages/contracts/src/entities/case-strategy-binding.ts` contract exists with CaseStrategyBinding type defining 6 strategy surface bindings (routing, sla, prioritisation-weight, closure-gate, reopening-trigger, validation-window). BUT `packages/db/src/schema/` has NO corresponding schema file AND `packages/contracts/src/fixtures/` has NO fixture file. Case strategy bindings cannot be persisted or seeded.
- **Debt type:** Missing-ownership (data-layer incomplete)
- **Debt class:** build-debt
- **Scope of fix:** Create `packages/db/src/schema/case-strategy-bindings.ts` with Drizzle schema. Create `packages/contracts/src/fixtures/seed-case-strategy-bindings.ts` with seed data linking cases to strategy policies. Add both to respective index exports.
- **Affected specs / artifacts:** `packages/contracts/src/entities/case-strategy-binding.ts`; `packages/db/src/schema/` (missing file); `packages/contracts/src/fixtures/` (missing file); Spec #32 Strategy Layer Runtime Surface; Spec #08 Case Management
- **Scheduled resolution:** Data-layer completion pass (before Phase 2)
- **Status:** RESOLVED
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31
- **Resolution date:** 2026-05-31

**Verification:** Checked against Spec #32 Strategy Layer Runtime Surface from `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/32_Strategy_Layer_Runtime_Surface_Spec.md` and Spec #08 Case Management from `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/08_Case_Management_Workflow_Spec.md`. Evidence: (1) typecheck clean (`tsc --noEmit` on schema + contract + fixture — exit 0); (2) `vitest run` — 601/601 pass (0 new failures); (3) schema stores 6 JSONB strategy-ref columns matching the 6 surfaces in `CASE_STRATEGY_SURFACES` constant; (4) fixture binds all 3 seed cases to the 6 active strategy policies (strategy-0001/sla, strategy-0004/routing, strategy-0009/prioritisation-weight, strategy-0010/validation-window, strategy-0011/closure-gate, strategy-0012/reopening-trigger); (5) Drizzle migration `0002_case_strategy_bindings_unit3.sql` generated (11 columns, 1 FK).

**History**
- 2026-05-31: OPEN — surfaced from DATA_DICTIONARY.md contract-vs-schema reconciliation
- 2026-05-31: RESOLVED — Unit 3 created `packages/db/src/schema/case-strategy-bindings.ts` and `packages/contracts/src/fixtures/seed-case-strategy-bindings.ts`. All 6 strategy surfaces bound. Verification recorded per ARCH-009.

---

### ARCH-DEBT-033 — `SourceMetadata.rawPayloadRef` contract-vs-source shape drift (all canonical entities)

- **Source:** DATA_DICTIONARY.md `rawPayloadRef` disclosure work (2026-05-31); Spec #05 Data Connector & Normalisation Implementation §11.1–11.2, §11.3, §7.4
- **Description:** The canonical contract `packages/contracts/src/entities/common.ts` defines `SourceMetadata.rawPayloadRef` as a field on every canonical entity. Per Spec #05 §11.3 (Provenance Requirements), the field set a canonical field must carry from source is `source_connector_id`, `source_system`, `source_field`, `source_value_hash where sensitive`, `observed_at`, `authority_type`, `normalisation_version` — `raw_payload_ref` is NOT in that set. Spec #05 §11.2 (Raw Payload Storage) assigns `raw_payload_ref` to the raw-ingestion record held in the separate raw-payload store (object storage with DB pointer, or technical `raw_record` table per P0-06), and §7.4 (Technical Support Records) classes `raw_record_pointer` as a technical record "not a canonical product entity." The contract therefore carries a provenance field on the canonical entity that the source assigns to the raw-ingestion record — a contract-vs-source shape drift affecting all canonical entities (Asset, Identity, Risk Object, Case, Connector, Audit Event, and any future entity using `SourceMetadata`). Note: the **DB schemas are correct** — they already omit `rawPayloadRef` per §11, consistent with `assets.ts` and all sibling schemas. The drift is in the contract, not the schema.
- **Debt type:** Contract-vs-source shape drift (canonical model over-specification)
- **Debt class:** build-debt
- **Scope of fix:** Either (a) remove `rawPayloadRef` from `SourceMetadata` in `packages/contracts/src/entities/common.ts` so the canonical contract matches Spec #05 §11.3, updating any fixtures/resolvers that populate it and re-establishing the contract↔schema match; OR (b) document an explicit, source-cited decision (DECISIONS.md) for why `rawPayloadRef` is retained on the canonical contract as a convenience denormalisation, with the lineage authority remaining the raw-ingestion store via `normalised_entity_refs`. Decision required before either path ships. Cite Spec #05 §11.3.
- **Affected specs / artifacts:** `packages/contracts/src/entities/common.ts` (`SourceMetadata`); all canonical entity contracts that extend `CommonFields`; `packages/contracts/src/fixtures/seed-tenant.ts` (`SEED_SOURCE`) and all seed fixtures that populate `rawPayloadRef`; `docs/knowledge/DATA_DICTIONARY.md` Common Fields section; Spec #05 §11.1–11.3, §7.4
- **Scheduled resolution:** Canonical contract reconciliation pass (before Phase 2 connector integration, since real raw-ingestion store lands in Phase 2)
- **Status:** RESOLVED
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31
- **Resolution date:** 2026-05-31

**Verification:** Checked against Spec #05 §11.3 (Provenance Requirements) from `docs/99_source_archive/baseline_v2_6_2/docs/02_child_specs/05_Data_Connector_Normalisation_Implementation_Spec_v1_5.md`. Evidence: (1) `rawPayloadRef` removed from `SourceMetadata` in `packages/contracts/src/entities/common.ts` — grep confirms field absent; (2) `SEED_SOURCE` in `seed-tenant.ts` no longer populates it — grep confirms; (3) `vitest run` passes 601 tests with 0 new failures introduced (33 pre-existing DS-1.0/shell failures unchanged); (4) contract now carries exactly the 4 fields the DB schemas persist (connectorId, importRunId, sourceSystem, sourceTimestamp) — contract↔schema match re-established.

**History**
- 2026-05-31: OPEN — surfaced during `rawPayloadRef` non-persistence investigation. Source (Spec #05 §11) confirms DB schemas correctly omit the field; the drift is the contract over-specifying the canonical provenance set per §11.3.
- 2026-05-31: RESOLVED — Unit 0 executed path (a): removed `rawPayloadRef` from `SourceMetadata` contract and `SEED_SOURCE` fixture. Contract now matches Spec #05 §11.3 and all DB schemas. DATA_DICTIONARY.md updated. Verification recorded per ARCH-009.

---

### ARCH-DEBT-034 — Unit 41 (AWS Bedrock/AgentCore Evaluation) needs re-sourcing to baseline

- **Source:** REBASELINED_BUILD_SEQUENCE.md placeholder-citation cleanup (2026-05-31); `DEC-translation-layer-structural-finding`
- **Description:** Unit 41 carried a translation-layer placeholder citation "#21 AWS Bedrock AgentCore Evaluation (from .kiro/specs/ — to be re-sourced from baseline)". Verified against the baseline archive: baseline child spec #21 is **BAS Connector Integration Contract**, not an AWS evaluation spec. No baseline child spec covers AWS Bedrock/AgentCore evaluation. This is Kiro-pack evaluation-lane scope (per `.kiro/steering/aws-alignment.md` and `D-v1.1-AgentCore-evaluation-status` in DECISIONS.md), not a baseline child spec.
- **Debt type:** Translation-layer contamination (mis-sourced citation) / missing baseline authority
- **Debt class:** build-debt
- **Scope of fix:** Re-source Unit 41 to its true authority — either (a) cite the AWS-alignment steering + the AgentCore evaluation decision as the governing authority and re-tag the unit as evaluation-lane (no baseline child spec), or (b) record a decision that AWS evaluation has no baseline child spec and is governed by roadmap/steering. Until resolved, Unit 41 stays BLOCKED on this debt in addition to its dependency chain and ARCH-006.
- **Affected specs / artifacts:** `docs/knowledge/REBASELINED_BUILD_SEQUENCE.md` Unit 41; `.kiro/steering/aws-alignment.md`; DECISIONS.md `D-v1.1-AgentCore-evaluation-status`
- **Scheduled resolution:** Before Unit 41 can flip READY (Phase 2 evaluation lane)
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — surfaced during pre-commit gate cleanup of translation-layer citations; baseline #21 confirmed to be BAS Connector, not AWS evaluation.

---

### ARCH-DEBT-035 — Unit 43 (Audit Trail) needs re-sourcing to baseline

- **Source:** REBASELINED_BUILD_SEQUENCE.md placeholder-citation cleanup (2026-05-31); `DEC-translation-layer-structural-finding`
- **Description:** Unit 43 carried a translation-layer placeholder "#28 Audit Trail (from .kiro/specs/ — to be re-sourced from baseline)". Verified: baseline child spec #28 is **Strategic and Tactical Priority Framework**, not an audit-trail spec. No dedicated baseline audit-trail child spec exists; audit requirements are distributed across baseline #05 §6.4.5 (AuditEntry), #29 v2.0 patch §2 No.10 (audit-first operation), and the RBAC specs (#19/#50).
- **Debt type:** Translation-layer contamination (mis-sourced citation) / distributed baseline authority needing consolidation
- **Debt class:** build-debt
- **Scope of fix:** Re-source Unit 43 to the distributed baseline authority (#05 §6.4.5, #29 v2.0 patch §2 No.10, #19, #50) and record whether a consolidated audit-trail authority is needed or whether the distributed set is sufficient. Update the Unit 43 Baseline spec line with the verified citations. Until resolved, Unit 43 stays BLOCKED on this debt in addition to its dependency chain.
- **Affected specs / artifacts:** `docs/knowledge/REBASELINED_BUILD_SEQUENCE.md` Unit 43; baseline #05, #29, #19, #50
- **Scheduled resolution:** Before Unit 43 can flip READY
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — surfaced during pre-commit gate cleanup; baseline #28 confirmed to be Strategic/Tactical Priority Framework, not audit trail.

---

### ARCH-DEBT-036 — Unit 46 (Observability & Tool Health UI) needs re-sourcing to baseline

- **Source:** REBASELINED_BUILD_SEQUENCE.md placeholder-citation cleanup (2026-05-31); `DEC-translation-layer-structural-finding`
- **Description:** Unit 46 carried a translation-layer placeholder "#33 Observability Tool Health (from .kiro/specs/ — to be re-sourced from baseline)". Verified: baseline child spec #33 is **Multi-Domain Fusion Map**, not an observability/tool-health UI spec. No dedicated baseline child spec for an observability/tool-health UI exists; the surface is a UI over baseline #23 Security Tool Intelligence.
- **Debt type:** Translation-layer contamination (mis-sourced citation) / missing baseline authority for the UI surface
- **Debt class:** build-debt
- **Scope of fix:** Re-source Unit 46 to baseline #23 (Security Tool Intelligence) as the data authority and record whether a dedicated UI-surface authority is required (cf. the surface specs #65–#69 pattern). Update the Unit 46 Baseline spec line. Until resolved, Unit 46 stays BLOCKED on this debt in addition to its dependency chain and ARCH-006.
- **Affected specs / artifacts:** `docs/knowledge/REBASELINED_BUILD_SEQUENCE.md` Unit 46; baseline #23
- **Scheduled resolution:** Before Unit 46 can flip READY
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — surfaced during pre-commit gate cleanup; baseline #33 confirmed to be Multi-Domain Fusion Map, not observability UI.

---

### ARCH-DEBT-037 — Unit 47 (DevOps Local/AWS Alignment) needs re-sourcing to baseline

- **Source:** REBASELINED_BUILD_SEQUENCE.md placeholder-citation cleanup (2026-05-31); `DEC-translation-layer-structural-finding`
- **Description:** Unit 47 carried a translation-layer placeholder "#31 DevOps Local AWS Alignment (from .kiro/specs/ — to be re-sourced from baseline)". Verified: baseline child spec #31 is **Routing Model and Team Affinity**, not a DevOps/AWS-alignment spec. Partial baseline coverage exists in #02 DevOps Environments & CI/CD; the AWS-alignment scope is otherwise governed by `.kiro/steering/aws-alignment.md` and DECISIONS (DEC-004), not a single baseline child spec.
- **Debt type:** Translation-layer contamination (mis-sourced citation) / partial baseline authority
- **Debt class:** build-debt
- **Scope of fix:** Re-source Unit 47 to baseline #02 (DevOps Environments & CI/CD) plus the AWS-alignment steering and DEC-004, and record whether a consolidated authority is needed. Update the Unit 47 Baseline spec line. Until resolved, Unit 47 stays BLOCKED on this debt in addition to ARCH-006.
- **Affected specs / artifacts:** `docs/knowledge/REBASELINED_BUILD_SEQUENCE.md` Unit 47; baseline #02; `.kiro/steering/aws-alignment.md`; DECISIONS.md DEC-004
- **Scheduled resolution:** Before Unit 47 can flip READY (Phase 3)
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — surfaced during pre-commit gate cleanup; baseline #31 confirmed to be Routing Model and Team Affinity, not DevOps/AWS.

---

### ARCH-DEBT-038 — Unit 49 (Phase 3 Pilot & Production Hardening) needs re-sourcing to baseline

- **Source:** REBASELINED_BUILD_SEQUENCE.md placeholder-citation cleanup (2026-05-31); `DEC-translation-layer-structural-finding`
- **Description:** Unit 49 carried a translation-layer placeholder "#30 Phase 3 Pilot Production Hardening (from .kiro/specs/ — to be re-sourced from baseline)". Verified: baseline child spec #30 is **Universal Validation, Closure and Reopening Lifecycle**, not a pilot/production-hardening spec. No baseline child spec covers Phase 3 pilot/production hardening; it is a programme phase governed by the roadmap/phase model, not a child spec.
- **Debt type:** Translation-layer contamination (mis-sourced citation) / programme-phase scope without a baseline child spec
- **Debt class:** build-debt
- **Scope of fix:** Re-source Unit 49 to the programme phase/roadmap authority and record that it has no baseline child spec (analogous to the Phase 2/3 readiness units). Update the Unit 49 Baseline spec line. Until resolved, Unit 49 stays BLOCKED on this debt in addition to its dependency chain and ARCH-006.
- **Affected specs / artifacts:** `docs/knowledge/REBASELINED_BUILD_SEQUENCE.md` Unit 49; programme roadmap/phase model
- **Scheduled resolution:** Before Unit 49 can flip READY (Phase 3)
- **Status:** OPEN
- **Date logged:** 2026-05-31
- **Last reviewed:** 2026-05-31

**History**
- 2026-05-31: OPEN — surfaced during pre-commit gate cleanup; baseline #30 confirmed to be Universal Validation/Closure/Reopening, not Phase 3 hardening.

---

### ARCH-DEBT-039 — Risk Object source-classification gap (COIM)

- **Source:** `DECISIONS.md` `DEC-coim-ocsf-source-classification-architecture`; `docs/knowledge/ocsf_assessment/01_COIM_v1_0.md` §4.1, §6.3; `02_SOURCE_CLASSIFICATION_MODEL.md` §4; COIM/OCSF NOW-tier remediation (owner-authorised 2026-06-01)
- **Description:** The Risk Object contract (`packages/contracts/src/entities/risk-object.ts`) and schema (`packages/db/src/schema/risk-objects.ts`) carry no `sourceClassification` object (findingClass, sourceSeverity, sourceConfidence, sourceProduct, sourceFindingUid, sourceActivity, attacks[], observables[]). Per accepted COIM architecture, source classification must be captured at ingestion time as immutable provenance — it cannot be retrospectively reconstructed. Commander currently knows what it decided but not what the source reported. Risk Object also carries singular `affectedEntityId` where COIM requires plural `affectedEntities[]` (retaining the singular for back-compat).
- **Debt type:** Missing-ownership (COIM metadata layer absent on canonical entity)
- **Debt class:** build-debt
- **Scope of fix:** Additive contract + schema augmentation under build unit **COIM-A**. Add `sourceClassification` (JSONB, high-frequency fields extracted to indexed columns), `sourceFindingUid`, and pluralised `affectedEntities[]`. Additive-only migration (no drops); preserve Unit 1 tests; update DATA_DICTIONARY.md.
- **Affected specs / artifacts:** `packages/contracts/src/entities/risk-object.ts`; `packages/db/src/schema/risk-objects.ts`; `docs/knowledge/DATA_DICTIONARY.md` (Risk Object); COIM-A unit in `REBASELINED_BUILD_SEQUENCE.md`
- **Scheduled resolution:** COIM-A (NOW tier) — code/schema implementation pending separate owner authorisation
- **Status:** RESOLVED
- **Date logged:** 2026-06-01
- **Last reviewed:** 2026-06-01

**History**
- 2026-06-01: OPEN — registered under COIM/OCSF NOW-tier governance registration (owner-authorised). Resolution unit: COIM-A.
- 2026-06-01: RESOLVED — COIM-A executed (owner-authorised "EXECUTE COIM-A"). Added `SourceClassification` composed object (`packages/contracts/src/entities/coim.ts`), augmented Risk Object contract with `sourceClassification`, `sourceFindingUid`, `affectedEntities[]` (singular `affectedEntityId` retained for back-compat); augmented schema additively (migration `0005_risk_object_coim_a.sql` — new `finding_class` enum, nullable columns + extracted indexed columns `finding_class`/`severity_id`/`source_finding_uid`, no drops); enriched all 3 seed fixtures; new test suite `coim-a-source-classification.test.ts` (15 assertions) passes; Unit 7 risk-object tests preserved (130/130 in scope); typecheck clean for COIM-A files; governance Green (100%, ARCH-005 PASS).

---

### ARCH-DEBT-040 — Evidence entity absence (COIM)

- **Source:** `DECISIONS.md` `DEC-coim-ocsf-source-classification-architecture`; `docs/knowledge/ocsf_assessment/04_EVIDENCE_MODEL.md`; `01_COIM_v1_0.md` §4.4; Commander doctrine assertion #1 (closed-loop case model requires evidence-driven validation)
- **Description:** No first-class Evidence entity exists in the contract model (`packages/contracts/src/entities/`) or schema (`packages/db/src/schema/`). Closed-loop doctrine requires evidence-driven validation, evidence-gated closure, and evidence-triggered reopening — but the closure/reopening/validation engines (Units 11–13, DONE) have no queryable typed evidence artifact to bind to. Evidence is currently scattered across audit events and provenance JSONB with no type, confidence, freshness, immutability hash, or case/sub-action/validation binding.
- **Debt type:** Missing-ownership (first-class entity absent)
- **Debt class:** build-debt
- **Scope of fix:** Create Evidence as a first-class entity under build unit **COIM-B** (evidenceType, source, confidence, collectedAt, expiresAt, contentRef, immutabilityHash, caseId, subActionId, validationDecisionId). Separate table; content in object store; metadata queryable. Additive — does not modify existing engine logic. Update DATA_DICTIONARY.md.
- **Affected specs / artifacts:** `packages/contracts/src/entities/evidence.ts` (new); `packages/db/src/schema/evidence.ts` (new); `docs/knowledge/DATA_DICTIONARY.md` (new entity); COIM-B unit in `REBASELINED_BUILD_SEQUENCE.md`
- **Scheduled resolution:** COIM-B (NEXT tier)
- **Status:** RESOLVED
- **Date logged:** 2026-06-01
- **Last reviewed:** 2026-06-01

**History**
- 2026-06-01: OPEN — registered under COIM/OCSF NOW-tier governance registration (owner-authorised). Resolution unit: COIM-B.
- 2026-06-01: RESOLVED — Evidence entity delivered by COIM-B. Contract: `evidence.ts`. Schema: `evidence.ts`. Fixture: 5 seed artifacts. DATA_DICTIONARY.md entry created. Validation function: `validateEvidence()`. Tests: 37 passing (structural validation, fixture conformance, ownership model).

---

### ARCH-DEBT-041 — Observable entity absence (COIM)

- **Source:** `DECISIONS.md` `DEC-coim-ocsf-source-classification-architecture`; `docs/knowledge/ocsf_assessment/01_COIM_v1_0.md` §4.5; `03_REUSABLE_OBJECT_CATALOGUE.md` §2.5
- **Description:** No Observable entity or composed object exists for typed indicator extraction (ip/domain/hash/url/email/certificate/process/file). Threat-intelligence correlation, cross-case matching, and indicator-based search have no canonical home. The normalisation engine's inverse-discovery routing (Unit 5) matches threat indicators to estate entities at runtime but does not persist typed, deduplicated observables for downstream search/correlation.
- **Debt type:** Missing-ownership (entity / composed object absent)
- **Debt class:** build-debt
- **Scope of fix:** Create Observable under build unit **COIM-D** (observableType, value, firstSeen, lastSeen, reputation). Separate table with many-to-many binding (deduplication) per the data efficiency model; bounded JSONB array overflow on Risk Object. Additive. Update DATA_DICTIONARY.md.
- **Affected specs / artifacts:** `packages/contracts/src/entities/observable.ts` (new); `packages/db/src/schema/observables.ts` (new); `docs/knowledge/DATA_DICTIONARY.md` (new entity); COIM-D unit in `REBASELINED_BUILD_SEQUENCE.md`
- **Scheduled resolution:** COIM-D (NEXT tier)
- **Status:** RESOLVED
- **Date logged:** 2026-06-01
- **Last reviewed:** 2026-06-02

**History**
- 2026-06-01: OPEN — registered under COIM/OCSF NOW-tier governance registration (owner-authorised). Resolution unit: COIM-D.
- 2026-06-02: RESOLVED — Observable entity delivered by COIM-D. Contract at `packages/contracts/src/entities/observable.ts`; DB schema at `packages/db/src/schema/observables.ts` (main table + many-to-many binding); fixture at `packages/contracts/src/fixtures/seed-observables.ts` (8 observables, 9 bindings); migration `0006_observable_entity_coim_d.sql`; test 35/35 pass; DATA_DICTIONARY.md updated; deduplication index operational.

---

### ARCH-DEBT-042 — Analytic entity absence (COIM)

- **Source:** `DECISIONS.md` `DEC-coim-ocsf-source-classification-architecture`; `docs/knowledge/ocsf_assessment/01_COIM_v1_0.md` §4.8; `03_REUSABLE_OBJECT_CATALOGUE.md` §2.7
- **Description:** No Analytic reference entity exists. Commander cannot attribute a finding or verdict to the analytic that produced it (detection_rule / analytic_rule / sigma_rule / yara_rule / ml_model / ueba_model / vendor_model / security_control_analytic). Detection engineering metrics, false-positive tracking, analytic-to-ATT&CK binding, and model-vs-rule attribution are unsupported. Analytic is the broad reusable COIM concept; DetectionRule is a narrower specialisation (`analyticType = detection_rule`).
- **Debt type:** Missing-ownership (reference entity absent)
- **Debt class:** build-debt
- **Scope of fix:** Create Analytic under build unit **COIM-E** (analyticId, analyticName, analyticType, version, state, falsePositiveRate, attacks[]). Referenced from Risk Object/Verdict by analyticId + analyticType; full metadata in separate table (deduplication). Additive. Update DATA_DICTIONARY.md.
- **Affected specs / artifacts:** `packages/contracts/src/entities/analytic.ts` (new); `packages/db/src/schema/analytics.ts` (new); `docs/knowledge/DATA_DICTIONARY.md` (new entity); COIM-E unit in `REBASELINED_BUILD_SEQUENCE.md`
- **Scheduled resolution:** COIM-E (NEXT tier)
- **Status:** RESOLVED
- **Date logged:** 2026-06-01
- **Last reviewed:** 2026-06-02

**History**
- 2026-06-01: OPEN — registered under COIM/OCSF NOW-tier governance registration (owner-authorised). Resolution unit: COIM-E.
- 2026-06-02: RESOLVED — Analytic entity delivered by COIM-E. Contract at `packages/contracts/src/entities/analytic.ts` (8-type enum, 3-state enum, validateAnalytic, AnalyticRef); DB schema at `packages/db/src/schema/analytics.ts` (deduplication unique index on tenant+analyticId, type/state filter indexes); fixture at `packages/contracts/src/fixtures/seed-analytics.ts` (8 analytics covering all types and all states); migration `0007_analytic_entity_coim_e.sql` (additive only); vitest 41/41 COIM-E tests pass (0 regressions); DATA_DICTIONARY.md updated; ARCH-DEBT-042 RESOLVED.

---

### ARCH-DEBT-043 — Verdict not canonical (COIM)

- **Source:** `DECISIONS.md` `DEC-coim-ocsf-source-classification-architecture`; `docs/knowledge/ocsf_assessment/01_COIM_v1_0.md` §6 (Verdict entity impact); Spec #62 Verdict Semantics
- **Description:** Verdict exists only as a transient `VerdictRecord` type inside `packages/contracts/src/engines/normalisation-layer.ts` (processing-time structure), not as a canonical entity in `packages/contracts/src/entities/` with a schema and fixture. Verdicts are time-bound, confidence-weighted claims requiring preserved identity, time, disposition, policy reference, and source. Without a canonical Verdict entity, verdict provenance (sourceProduct, confidence, observedAt, targetEntityType) is not durably stored, and non-identity verdict analytics / multi-tool verdict analysis are unsupported.
- **Debt type:** Boundary-leak (entity modelled only as an engine-internal type)
- **Debt class:** build-debt
- **Scope of fix:** Promote Verdict to a canonical entity under build unit **COIM-C** (sourceProduct, confidence, observedAt, targetEntityType, extended disposition set, structured policyRef). Preserve existing disposition semantics and severity ordering — do NOT change verdict disposition meaning. Additive contract + schema + fixture. Update DATA_DICTIONARY.md.
- **Affected specs / artifacts:** `packages/contracts/src/entities/verdict.ts` (new); `packages/db/src/schema/verdicts.ts` (new); `packages/contracts/src/engines/normalisation-layer.ts` (`VerdictRecord` to reference canonical type — no logic change); `docs/knowledge/DATA_DICTIONARY.md` (new entity); COIM-C unit in `REBASELINED_BUILD_SEQUENCE.md`
- **Scheduled resolution:** COIM-C (NEXT tier)
- **Status:** RESOLVED
- **Date logged:** 2026-06-01
- **Last reviewed:** 2026-06-01

**History**
- 2026-06-01: OPEN — registered under COIM/OCSF NOW-tier governance registration (owner-authorised). Resolution unit: COIM-C. Verdict disposition semantics (Spec #62) explicitly NOT in scope of change.
- 2026-06-01: RESOLVED — Verdict entity promoted by COIM-C. Contract: `verdict.ts`. Schema: `verdicts.ts`. Fixture: 5 seed verdicts. Disposition semantics and severity ordering unchanged (Spec #62 preserved). Tests: 25 passing. DATA_DICTIONARY.md entry created.

---

### ARCH-DEBT-044 — Action/Sub-Action absence (COIM)

- **Source:** `DECISIONS.md` `DEC-coim-ocsf-source-classification-architecture`; `docs/knowledge/ocsf_assessment/01_COIM_v1_0.md` §6 (Action/Sub-Action entity impact); `COMMANDER_DATA_OCSF_OPERATIONAL_INTELLIGENCE_PROPOSAL.md` §7 (Action/Sub-Action)
- **Description:** No Action or Sub-Action canonical entity exists in the contract model or schema. The case lifecycle (Unit 7, DONE) references `action_decomposed` as a state, but there is no entity persisting sub-actions, target entity, execution method, outcome classification, effort tracking, approval reference, or remediation posture. Remediation posture analytics and value reporting are unsupported, and there is no host for D3FEND tactic classification (see ARCH-DEBT-046).
- **Debt type:** Missing-ownership (entity absent)
- **Debt class:** build-debt
- **Scope of fix:** Create Action/Sub-Action under build unit **COIM-H** (targetEntity, executionMethod, outcomeClassification, estimatedEffortHours, actualEffortHours, approvalRef). Additive — does not modify case lifecycle engine logic. Update DATA_DICTIONARY.md. Prerequisite for ARCH-DEBT-046 (D3FEND fields ride on this entity).
- **Affected specs / artifacts:** `packages/contracts/src/entities/action.ts` (new); `packages/db/src/schema/actions.ts` (new); `docs/knowledge/DATA_DICTIONARY.md` (new entity); COIM-H unit in `REBASELINED_BUILD_SEQUENCE.md`
- **Scheduled resolution:** COIM-H (LATER tier)
- **Status:** OPEN
- **Date logged:** 2026-06-01
- **Last reviewed:** 2026-06-01

**History**
- 2026-06-01: OPEN — registered under COIM/OCSF NOW-tier governance registration (owner-authorised). Resolution unit: COIM-H.

---

### ARCH-DEBT-045 — Timeline-field gap (COIM)

- **Source:** `DECISIONS.md` `DEC-coim-ocsf-source-classification-architecture`; `docs/knowledge/ocsf_assessment/01_COIM_v1_0.md` §4.12; `02_SOURCE_CLASSIFICATION_MODEL.md` §4.6; `05_ATTRIBUTE_AND_DATA_EFFICIENCY_MODEL.md` §13
- **Description:** Canonical entities carry only `createdAt`/`updatedAt` (system record timestamps) and `source.sourceTimestamp`. The COIM multi-timestamp model with distinct semantics is absent: `firstDetectedAt` (source), `lastConfirmedAt` (source), `normalisedAt` (system). Without these, dwell-time calculation, staleness detection, freshness evaluation, and SLA accuracy are degraded or impossible. Source timestamps can only be captured at ingestion time.
- **Debt type:** Missing-ownership (temporal semantics absent)
- **Debt class:** build-debt
- **Scope of fix:** Add timeline fields under build unit **COIM-A** for Risk Object (`firstDetectedAt`, `normalisedAt` required; `lastConfirmedAt` recommended) and under **COIM-F** for Asset/Identity (`lastConfirmedAt`/`lastAuthenticatedAt` recommended). Indexed timestamp columns; additive. `dwellTimeHours` computed on Case (COIM-G). Update DATA_DICTIONARY.md.
- **Affected specs / artifacts:** `packages/contracts/src/entities/risk-object.ts`, `asset.ts`, `identity.ts`; corresponding schemas; `docs/knowledge/DATA_DICTIONARY.md`; COIM-A / COIM-F / COIM-G units in `REBASELINED_BUILD_SEQUENCE.md`
- **Scheduled resolution:** COIM-A (NOW, Risk Object timeline) + COIM-F/COIM-G (NEXT, Asset/Identity/Case)
- **Status:** OPEN (partially resolved — Risk Object timeline (COIM-A) + Asset/Identity COIM-F augmentation delivered; Case `dwellTimeHours` pending COIM-G)
- **Date logged:** 2026-06-01
- **Last reviewed:** 2026-06-02

**History**
- 2026-06-01: OPEN — registered under COIM/OCSF NOW-tier governance registration (owner-authorised). Resolution units: COIM-A (Risk Object), COIM-F/COIM-G (Asset/Identity/Case).
- 2026-06-01: PARTIAL — COIM-A delivered the Risk Object timeline model (`firstDetectedAt`, `lastConfirmedAt`, `normalisedAt`) on contract + schema (migration `0005`) + seed fixtures + tests. Remains OPEN for the Asset/Identity portion (COIM-F) and Case `dwellTimeHours` (COIM-G).
- 2026-06-02: PARTIAL — COIM-F delivered Asset (`lastConfirmedAt`, `firstDiscoveredBy` + full COIM operational-intelligence augmentation) and Identity (`lastAuthenticatedAt`, `privilegeLevel`, `authenticationStrength`, `entitlementSummary`, `riskFactors[]`, `sourceClassification`) on contract + schema (migration `0008`, additive nullable columns). Asset/Identity portion RESOLVED. Remains open only for Case `dwellTimeHours` (COIM-G).

---

### ARCH-DEBT-046 — D3FEND-on-sub-action gap (COIM)

- **Source:** `DECISIONS.md` `DEC-coim-ocsf-source-classification-architecture`; `docs/knowledge/ocsf_assessment/01_COIM_v1_0.md` §4.3; `03_REUSABLE_OBJECT_CATALOGUE.md` §2.3
- **Description:** No D3FEND tactic classification (isolate/evict/restore/harden/detect) or countermeasures[] exists on remediation actions — because no Action/Sub-Action entity exists yet (ARCH-DEBT-044). Remediation posture analytics, D3FEND coverage measurement, and defence-effectiveness reporting are unsupported.
- **Debt type:** Missing-ownership (classification absent; dependent on entity absence)
- **Debt class:** build-debt
- **Scope of fix:** Add `tacticType` (D3FEND enum) and `countermeasures[]` (bounded ≤10) to the Sub-Action entity under build unit **COIM-H**, after ARCH-DEBT-044 establishes the entity. Additive. Update DATA_DICTIONARY.md.
- **Affected specs / artifacts:** `packages/contracts/src/entities/action.ts` (new, from COIM-H); `packages/db/src/schema/actions.ts` (new); `docs/knowledge/DATA_DICTIONARY.md`; COIM-H unit in `REBASELINED_BUILD_SEQUENCE.md`
- **Scheduled resolution:** COIM-H (LATER tier) — gated behind ARCH-DEBT-044
- **Status:** OPEN
- **Date logged:** 2026-06-01
- **Last reviewed:** 2026-06-01

**History**
- 2026-06-01: OPEN — registered under COIM/OCSF NOW-tier governance registration (owner-authorised). Resolution unit: COIM-H (depends on ARCH-DEBT-044).
