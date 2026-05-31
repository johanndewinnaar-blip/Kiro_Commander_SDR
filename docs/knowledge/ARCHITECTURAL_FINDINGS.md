# Commander SDR — Architectural Findings

**Status:** First clean derivation under `SOURCING_RULE.md`. Projects from the verified `SYSTEM_KNOWLEDGE_GRAPH.md`, `DOMAIN_REGISTER.md`, and `RELATIONSHIP_MAP.md`. Cross-references the existing `ARCHITECTURAL_DEBT_REGISTER.md`. Excluded: the `.kiro/specs/` translation layer.

This document collects every **structural finding** surfaced by the knowledge-graph build: GAPs flagged in the graph, conflicts, missing ownership, orphans, circular dependencies, and supersession-not-cleared conditions. Each finding is rated, sourced, and routed:

- **Existing ARCH-DEBT IDs** are referenced where the finding is already logged in `ARCHITECTURAL_DEBT_REGISTER.md`.
- **New findings** carry the proposed ARCH-DEBT ID for logging at the next register update — those IDs are marked `(proposed)` until the user runs `log architectural debt …` to register them.

The findings here are **architectural-level** (governance, structure, ownership, supersession, conformance gaps). They are distinct from:
- *Code/conformance debt* tracked in `docs/00_authority/debt-register.md` per the core-testing pipeline.
- *Absent capabilities* tracked in `docs/knowledge/FEATURE_FUNCTION_BACKLOG.md`.

---

## Index

1. Severity rubric
2. Findings — Read-state GAPs from the knowledge graph
3. Findings — Boundary and ownership
4. Findings — Supersession and reference
5. Findings — Cross-document conflicts
6. Findings — Orphans
7. Findings — Circular dependencies (BY DESIGN — no debt)
8. Routing summary (existing vs proposed ARCH-DEBT)
9. Source map

---

## 1. Severity rubric

| Severity | Meaning | Effect |
|---|---|---|
| **Blocking** | Bars further architectural work until resolved | Must be cleared before next phase |
| **Material** | Affects correctness or completeness; needs scheduled resolution | Must be addressed in the rebuilt build sequence |
| **Tracking** | Known imperfection, contained by decision or workaround | Track for review, not for immediate repair |
| **By design** | Surfaced finding is intentional, not a defect | Recorded so it isn't mistaken for accidental coupling |

---

## 2. Findings — Read-state GAPs from the knowledge graph

These are the ten GAPs explicitly recorded in `SYSTEM_KNOWLEDGE_GRAPH.md` §20. They are the partial-read items that bound the next read pass before deeper claims can be made. Each is here so the gap is visible at the architectural-findings level, not just inside the graph.

### F-01. Behavioural Signal (signal purpose 7) body truncated

- **Source:** `SYSTEM_KNOWLEDGE_GRAPH.md` §3.2 GAP; Spec #61 §3.7
- **Description:** The eight-purpose enumeration (Configuration / State / Verdict / Detection / Case / Inventory / Behavioural / Threat) is complete by name. The §3.7 body for **Behavioural Signal** was truncated in the read pass. Connector → Internal Behavioural Intelligence / External Threat downstream binding for behavioural-class signal is therefore partially specified.
- **Severity:** Material
- **Resolution path:** Targeted re-read of Spec #61 §3.7
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-009`

### F-02. Connector conformance tier names not enumerated

- **Source:** `SYSTEM_KNOWLEDGE_GRAPH.md` §3.3 GAP; Spec #61 §4.1; Spec #55 v2.6 §V2.6-10
- **Description:** Per-class conformance tier system is referenced in the §4.1 portion read, but the full four-tier nomenclature (the actual tier labels) was not enumerated. The labels are referenced in Spec #55 v2.6 §V2.6-10 as `connector.conformance.*` parameters but the parameter names alone do not yield the tier vocabulary.
- **Severity:** Material
- **Resolution path:** Re-read Spec #61 §4.1; cross-check Spec #55 v2.6 §V2.6-10
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-010`

### F-03. Full v2.6 risk-object type extension list incomplete

- **Source:** `SYSTEM_KNOWLEDGE_GRAPH.md` §7.1 GAP; MTS v7.0 §6.3
- **Description:** The 17-value base RiskObject enum is verified (Spec #29 v2.0 patch §3). MTS v7.0 §6.3 confirms the v2.6 extension adds `ooda_phase_degradation` and "additional types," but the full extension list was truncated in the read pass.
- **Severity:** Material — Engine → Case Lifecycle edges may be missing types beyond `ooda_phase_degradation`
- **Resolution path:** Re-read MTS v7.0 §6.3
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-011`

### F-04. Workspace bodies for the four middle workspaces not read

- **Source:** `SYSTEM_KNOWLEDGE_GRAPH.md` §14.1 GAP; MP v5.0 §24
- **Description:** Six-workspace structure is confirmed by name (Executive Posture, Drift Operations, Control & Architecture, Identity & Asset Intelligence, Assurance & Audit, Transformation & M&A). The four middle workspace bodies — primary personas, contents, jobs-to-be-done — were not read in this pass.
- **Severity:** Material
- **Resolution path:** Re-read MP v5.0 §24
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-012`

### F-05. Full eleven-persona enumeration not read

- **Source:** `SYSTEM_KNOWLEDGE_GRAPH.md` §15.1 GAP; MTS v7.0 §9.1; MP v5.0 §22; Spec #17 v2.6 Persona Expansion Addendum
- **Description:** MTS v7.0 §9.1 references "eleven personas (nine existing plus Security Analyst and Risk Analyst)." The two new v2.6 personas are confirmed by name (Security Analyst, Risk Analyst). The other nine were not enumerated as a list in the §V2.6 portions read.
- **Severity:** Material — Persona-to-domain visibility (D-37 RBAC) is partial
- **Resolution path:** Re-read Spec #17 v2.6 Persona Expansion Addendum
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-013`

### F-06. Spec #08 §5–§15 not read

- **Source:** `SYSTEM_KNOWLEDGE_GRAPH.md` §7.8 GAP; Spec #08 §5–§15
- **Description:** Only ToC + §1–§4 + the v2.6 Extension addendum were read. Sections 5–15 (Case Action Algorithm; Assignment Engine; Case Pulse SOM Command Surface; Teams, Ranks, Specialisms; Operational Passport; Evidence Packs and Rollback Snapshots; Audit and Logging Requirements; Acceptance Criteria) are not yet sourced.
- **Severity:** Material — Case Lifecycle (D-18) internal mechanics partially mapped
- **Resolution path:** Re-read Spec #08 §5–§15
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-014`

### F-07. Act Phase Dashboard composition body partial

- **Source:** `SYSTEM_KNOWLEDGE_GRAPH.md` §9 GAP; Spec #67 §6
- **Description:** Observe / Orient / Decide / Command Tempo dashboards captured. The Act Phase Dashboard composition body (Spec #67 §6) was read by reference in this pass with the full body truncated.
- **Severity:** Tracking — affects OODA → Surface Layer drill paths for Act phase only
- **Resolution path:** Re-read Spec #67 §6
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-015`

### F-08. Identity Intelligence + Asset Intelligence Surface compositions partial

- **Source:** `SYSTEM_KNOWLEDGE_GRAPH.md` §14.5 GAP; Spec #68 §3+; Spec #69 §3+
- **Description:** §1–§2 of both surfaces confirmed (purpose, surface statement). Sections 3+ (composition, drill paths, RBAC integration, build readiness) not read.
- **Severity:** Material — Surface Layer composition edges partial
- **Resolution path:** Re-read Spec #68 §3+; Spec #69 §3+
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-016`

### F-09. OODA phase 4 (Act) §3.4 detail truncated

- **Source:** `SYSTEM_KNOWLEDGE_GRAPH.md` §9.1 GAP; Spec #58 §3.4
- **Description:** The Act phase row in §9.1 carries an explicit "(full §3.4 body truncated in this read)" annotation. Phase-health metric inventory for Act is partial.
- **Severity:** Tracking
- **Resolution path:** Re-read Spec #58 §3.4
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-017`

### F-10. SDR Control Plane Specification v1.1 §7–§19 not read

- **Source:** `SYSTEM_KNOWLEDGE_GRAPH.md` §20 GAP; SDR Control Plane Specification v1.1
- **Description:** §0–§6 read in a prior session; §7–§19 not yet read in any session. Tenant Admin → Internal Control Plane runtime contract (D-36) is partially mapped.
- **Severity:** Material
- **Resolution path:** Re-read SDR Control Plane Specification §7–§19
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-018`

---

## 3. Findings — Boundary and ownership

### F-11. Translation-layer authority leak (build packs source from `.kiro/specs/`)

- **Source:** `DECISIONS.md` `DEC-translation-layer-structural-finding` (2026-05-30); `RELATIONSHIP_MAP.md` §10 (orphan); `GOVERNANCE_MAP.md`
- **Description:** All 24 build packs (BP-00 through BP-23) source their implementation depth from the `.kiro/specs/` translation layer. The translation layer is **not** authority and must not be cited as a source of build depth. The contamination of the prior Phase 1–6 outputs traced to this exact pattern.
- **Severity:** Material → Blocking for the build-plan replacement
- **Resolution path:** Build-plan replacement (`DEC-build-plan-replacement`); per-BP citation rewiring on the rebuilt sequence; programme-wide rule that every build unit must cite baseline `#N` from `docs/99_source_archive/baseline_v2_6_2/`
- **ARCH-DEBT routing:** **existing — `ARCH-DEBT-001`**

### F-12. Spec 32 Strategy Layer Runtime Surface has no build pack

- **Source:** `GOVERNANCE_MAP.md` C-01; BUILD_SEQUENCE doctrine #7
- **Description:** BUILD_SEQUENCE.md doctrine #7 declares Strategy Layer Runtime Surface (baseline Spec #32) build-blocking and prerequisite to case management, routing, validation/closure, reopening and Fusion Map. No build pack delivers it. BP-05 (Case Management) declared "Implemented" before its declared prerequisite was even fully written.
- **Severity:** Material — doctrine breach; subsumed by the build-plan replacement
- **Resolution path:** The rebuilt sequence (post-knowledge-graph) must establish Strategy Layer ownership before any case/routing/validation work
- **ARCH-DEBT routing:** **existing — `ARCH-DEBT-003`**

### F-13. PHASE_E_PROPOSAL.md unincorporated into active build chain

- **Source:** `GOVERNANCE_MAP.md` Orphan-E
- **Description:** `docs/00_authority/PHASE_E_PROPOSAL.md` proposes E1/E2/E3 for Spec 06. Not referenced from BUILD_SEQUENCE.md, BP-05, or DECISIONS.md. Whether to incorporate, retire, or rework is undecided.
- **Severity:** Material — decision-blocked
- **Resolution path:** Owner decision recorded in DECISIONS.md (incorporate / retire / rework). Tied to build-plan replacement
- **ARCH-DEBT routing:** **existing — `ARCH-DEBT-007`**

### F-14. DEC-spec00-section3-blocked: Spec 00 implementation tasks correctly held

- **Source:** `DECISIONS.md` `DEC-spec00-section3-blocked` (2026-05-27)
- **Description:** Tasks 3.1, 3.2, 3.3 of `.kiro/specs/00-programme-foundation/` remain blocked pending owner pack-validation approval. AGENTS.md and BP-00 both require owner approval before code generation. Block is correct; tracked here to ensure it isn't forgotten.
- **Severity:** Tracking (correctly blocked)
- **Resolution path:** Owner pack-validation approval
- **ARCH-DEBT routing:** **existing — `ARCH-DEBT-006`**

### F-15. Insider Risk boundary depends on five jurisdictional configs that are tenant-shipped only

- **Source:** Spec #75 §5; Spec #55 v2.6 §V2.6-11
- **Description:** Internal Behavioural Intelligence (D-15) ingestion is governed by jurisdictional regulation (GDPR Article 88, German Works Council provisions, French employee monitoring, US state-level surveillance, UK ICO). The pilot configuration recommendation (Spec #55 §V2.6-13) is to start with `internal_risk.ingestion_enabled = false` until customer confirms readiness. The architectural risk: a customer that switches ingestion on without local-counsel guidance creates a compliance exposure that Commander cannot detect at runtime.
- **Severity:** Tracking — governance is in source; runtime needs deployment-time gate enforcement
- **Resolution path:** Add a tenant-onboarding gate that requires explicit jurisdictional acknowledgement (or works-council confirmation, where applicable) before `internal_risk.ingestion_enabled` may flip true. This is an additional configuration-governance assertion to add to the conformance registry
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-019`

### F-16. SOC boundary attribution must propagate to every external-attack surface

- **Source:** Spec #57 §5; Spec #65 §3.4 ("Commander observes · SOC owns" attribution)
- **Description:** The SOC boundary is binding doctrine. The visual attribution is specified for the External Operating Picture Case Response Board. Other surfaces that show External Attack Correlation cases (Fusion Map case-centric view, OODA dashboards, Identity / Asset Intelligence Surfaces) must carry equivalent attribution. Not all surfaces have the attribution explicitly required in their respective specs in the read pass.
- **Severity:** Material — boundary preservation across surfaces
- **Resolution path:** Cross-check every surface that may render an External Attack Correlation case and confirm the attribution is required in that spec section. Where missing, propose an addendum
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-020`

---

## 4. Findings — Supersession and reference

### F-17. Source-pack schedule v1.9 superseded but not retired from active layer

- **Source:** `DECISIONS.md` `DEC-source-pack-schedule-v1_9-superseded`; `GOVERNANCE_MAP.md` C-06, Orphan-A
- **Description:** `docs/02_architecture/source_SDR_Specification_Schedule_and_Folder_Structure_v1_9.md` (active-layer copy) cites superseded masters (MTS v6.8, MP v4.7, specs #01–#48). Current baseline is v2.6.2 (MTS v7.0, MP v5.0, specs through #75). Schedule classified SUPERSEDED-ORPHAN. Active-layer copy still in place.
- **Severity:** Material — supersession-uncleared
- **Resolution path:** Retire active-layer copy (move to `_superseded/` or remove with decision record); archive copy remains for lineage; update `.kiro/steering/structure.md` with artifact-lifecycle policy for retiring superseded actives
- **ARCH-DEBT routing:** **existing — `ARCH-DEBT-002`**

### F-18. Build plan stack retired but not replaced

- **Source:** `DECISIONS.md` `DEC-build-plan-replacement` (2026-05-30)
- **Description:** Current build-planning stack (`BUILD_SEQUENCE.md` v1.3.1, `BUILD_VERSION_ROADMAP.md` v1.1, `.kiro/steering/build-pack-discipline.md`, BP-00–BP-23, `.kiro/specs/INDEX.md`) is **retired, not reconciled**. Replacement to be derived from clean knowledge graph. Until replacement produced, programme has retired-but-not-replaced build planning.
- **Severity:** Material → Blocking for the next build-execution phase
- **Resolution path:** Complete the four primary knowledge-graph artefacts (`SYSTEM_KNOWLEDGE_GRAPH.md` ✓, `DOMAIN_REGISTER.md` ✓, `RELATIONSHIP_MAP.md` ✓, `ARCHITECTURAL_FINDINGS.md` ✓ when this lands), then rebuild build sequence; on replacement, retire listed artifacts to `_superseded/`
- **ARCH-DEBT routing:** **existing — `ARCH-DEBT-008`** (status now reads four-of-four artefacts complete pending verification)

### F-19. Specs #63 and #64 baseline gap (mitigated)

- **Source:** `DECISIONS.md` `DEC-v1.2-Spec63-64-gap`; `BASELINE_SOURCE_INVENTORY.md` numbering notes
- **Description:** Archive contains no Spec #63 or #64. Sequence resumes at #65. Specification Register v2.6 records this as reserved (connector schedules implemented via INDEX.md updates). The numbering is verified absent rather than missing-from-pack.
- **Severity:** Tracking (low impact; documented; mitigated by decision)
- **Resolution path:** Standing — any active artifact referencing #63/#64 must redirect to `docs/03_api_specs/INDEX.md`
- **ARCH-DEBT routing:** **existing — `ARCH-DEBT-005`**

### F-20. Spec #07 register-file mismatch (mitigated)

- **Source:** `DECISIONS.md` `DEC-v1.2-Spec07-register-inconsistency`; `GOVERNANCE_MAP.md` C-03; `DEC-v1.3-register-file-mismatch-depth-pass`
- **Description:** Specification Register row #07 names "Universal Search Implementation"; source file `07_Drift_and_Rule_Engine_Spec.md` is "Drift and Rule Engine." Both conditions preserved at translation level. Source-side inconsistency itself remains. Other related title mismatches under `DEC-v1.3-register-file-mismatch-depth-pass` cover Specs #01, #04, #16, #18, #26/#26a, #27, #32, #34, #38.
- **Severity:** Tracking (mitigated by decision; root cause stands)
- **Resolution path:** Source-side correction is a baseline-immutability matter (Doctrinal Assertion 7 — must not silently rewrite). Path forward: either accept as a permanent baseline footnote with clear cross-reference, or capture as a future-version baseline correction with explicit decision record
- **ARCH-DEBT routing:** **existing — `ARCH-DEBT-004`**

---

## 5. Findings — Cross-document conflicts

### F-21. Authority precedence stated three times with different tier counts

- **Source:** `GOVERNANCE_MAP.md` O-01, C-04
- **Description:** Three statements of authority precedence at different granularities: AGENTS.md (9-step authority read order), AUTHORITY_MODEL.md (8-tier precedence stack), `.kiro/steering/authority-and-precedence.md` (6-tier authority order). Operationally non-conflicting but inconsistent in form.
- **Severity:** Tracking — operational behaviour converges
- **Resolution path:** Consolidate into one canonical precedence document; the others become pointers
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-021`

### F-22. Steering's status — guidance or authority? (formal contradiction)

- **Source:** `GOVERNANCE_MAP.md` C-05
- **Description:** AUTHORITY_MODEL.md Kiro authority rules #1 declares "Steering files are persistent workspace guidance, not independent source authority." The same AUTHORITY_MODEL.md precedence stack tier 5 places "Kiro steering and specs generated in this pack" *inside* the precedence ladder. Steering is also frontmatter-tagged `inclusion: always`. Operational reality is unambiguous (steering binds); documented framing is internally inconsistent.
- **Severity:** Tracking — formal inconsistency, not operational
- **Resolution path:** Reconcile the framing: state plainly that steering is binding workspace guidance; update AUTHORITY_MODEL.md tier #1 wording
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-022`

### F-23. UI authority — DS-1.0 vs design-system-contract steering (latent conflict)

- **Source:** `GOVERNANCE_MAP.md` C-07
- **Description:** `docs/06_ui_build_reference/DESIGN_SYSTEM.md` (DS-1.0) declares itself authoritative for UI build rules. `.kiro/steering/design-system-contract.md` declares itself "the complete build rulebook for all Commander SDR pages." Both claim authority. Not yet known to contradict on a specific value, but two artefacts with overlapping scope both declaring binding authority is a structural conflict in the making.
- **Severity:** Tracking — latent
- **Resolution path:** Declare precedence between DS-1.0 and the design-system-contract steering (most likely DS-1.0 → steering as scoped detail)
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-023`

### F-24. Page-layout-standard cites unverified decision IDs

- **Source:** `GOVERNANCE_MAP.md` C-08
- **Description:** `.kiro/steering/page-layout-standard.md` cites authority `DEC-pagecontainer-shared-standard` and `DEC-pagecontainer-exceptions` (DECISIONS.md). Run-1 inventory found those decision row IDs were referenced but not pinpoint-verified in `DECISIONS.md`. If they are not formally recorded, the steering's authority basis is dangling.
- **Severity:** Tracking — verification pending
- **Resolution path:** Verify the cited decisions exist in DECISIONS.md; if missing, record them; if present, add a note to the steering linking to the recorded rows
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-024`

### F-25. CONVERSION_FINDINGS.md generation — v1.1 stamp but cited as live session log

- **Source:** `GOVERNANCE_MAP.md` C-09
- **Description:** `docs/00_authority/CONVERSION_FINDINGS.md` carries header "Pack version: v1.1; v1.1 remediation applied; no application code generated" — three pack-versions out of date (v1.1 → v1.2 → v1.3 → v1.3.1). DAILY_OPERATING_LOOP.md and SESSION_START.md / VERIFY_AND_CLOSE.md prompts treat it as a live append-only session log. Either dual-purpose with no header note, or operating loop is referencing a log that doesn't exist.
- **Severity:** Material — active prompts depend on this file's role
- **Resolution path:** Resolve the dual purpose explicitly: either rename / migrate the conversion-findings document and let the session log live elsewhere, or update the file header to declare the dual purpose
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-025`

### F-26. Command Centre — "Implemented" vs "Deferred"

- **Source:** `GOVERNANCE_MAP.md` C-02
- **Description:** BUILD_SEQUENCE Gate 1 step 6 names "Command Centre first functional surface." BUILD_VERSION_ROADMAP includes "Command Centre" in v1.1 outcomes. BP-04 self-status declares "Implemented." `command-centre-build-prompt.md` self-status declares "DEFERRED until after functional pages are built" with `DEC-command-centre-deferred`. Conformance registry `DEC-002`: "No Command Centre implementation until data-point-to-metric schedule complete."
- **Severity:** Material — likely scope-boundary issue, not real conflict, but unstated
- **Resolution path:** Reconcile explicitly: distinguish "first functional surface" (BP-04 scope) from "full Command Centre" (deferred scope), and record the distinction in DECISIONS.md
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-026`

---

## 6. Findings — Orphans

### F-27. Spec #21 BAS Connector is staged / Phase 2

- **Source:** Spec #21 §Authority note (Phase 2 strategic / advanced)
- **Description:** BAS validation is staged Phase 2. Until activation, Spec #20 Coordinated Push Group / D-20 Validation depends on it for empirical validation but it is not online.
- **Severity:** Tracking — by design (Phase 2)
- **Resolution path:** Carries forward; activation tied to Phase 2 readiness gate
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-027`

### F-28. Spec #24 Connector API Reference Framework is template-only

- **Source:** `RELATIONSHIP_MAP.md` §10; Spec #24 (cited in Spec #61 header)
- **Description:** Reference framework with no concrete connector references in the v2.6 read pass. Per-vendor implementations not in baseline.
- **Severity:** Tracking
- **Resolution path:** Phase 2 / live-vendor work activates concrete references
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-028`

### F-29. `shell-sidebar-header-rebuild` Kiro spec folder is structurally orphaned

- **Source:** `GOVERNANCE_MAP.md` Orphan-G
- **Description:** Out-of-numbering-band Kiro spec folder. Lives in the translation layer, which is excluded from knowledge-work sourcing. Listed here for completeness because it was flagged by the governance map; not a baseline finding.
- **Severity:** Tracking — translation-layer artefact, governed by `ARCH-DEBT-001` resolution
- **Resolution path:** Resolved when the translation-layer dependency is removed (`ARCH-DEBT-001`); or re-pointed at a baseline spec by future shell decision
- **ARCH-DEBT routing:** does not warrant its own ARCH-DEBT — covered by `ARCH-DEBT-001`

### F-30. Hook companion files (`.md` and `.json`) lack canonical-relationship declaration

- **Source:** `GOVERNANCE_MAP.md` O-05, Orphan-H
- **Description:** Hooks 01–04 each have three forms (`.md` recipe, `.json` metadata, `.kiro.hook` runtime). Hook 05 has only `.kiro.hook`. No declaration states the canonical relationship — i.e. that `.kiro.hook` is canonical and the others are companions. Possible orphans relative to runtime form.
- **Severity:** Tracking
- **Resolution path:** Add a one-line README in `.kiro/hooks/` declaring "the .kiro.hook is canonical; .md is the recipe; .json is reserved" (or whatever the actual relationship is)
- **ARCH-DEBT routing:** new — proposed `ARCH-DEBT-029`

---

## 7. Findings — Circular dependencies (BY DESIGN — no debt)

These five loops are recorded in `RELATIONSHIP_MAP.md` §9 as **intentional closed-loop feedback**. They are surfaced here so they aren't mistaken for accidental coupling. **None of them is debt.**

### F-31. Strategy ⇄ Case Engine ⇄ Routing

- **Source:** Spec #30 v2.0 patch §8 (reopening trigger: "strategy threshold changes and requalifies the case"); Spec #32 §Runtime Binding
- **By design:** Strategy changes feed back into case priority/route/validation/closure/reopening; reopening of a previously closed case in turn is a strategy-change consequence
- **ARCH-DEBT routing:** none — by design

### F-32. Intelligence Layer ⇄ OODA Loop

- **Source:** Spec #58 §2, §3.1–§3.4; Spec #17 v2.6 OODA Integration Addendum §V2.6-3
- **By design:** Streams feed Observe; Adjustment phase feeds back to model refinement and classification recalibration; next Observe cycle reads richer signal
- **ARCH-DEBT routing:** none — by design

### F-33. Pre-Warned ⇄ Inverse Discovery

- **Source:** Spec #71 §3.1; Spec #72 §3.1
- **By design:** Pre-Warned classification fires Inverse Discovery on entity-resolution failure; entity onboarding feeds the next classification
- **ARCH-DEBT routing:** none — by design

### F-34. Verdict density ⇄ Trust calibration

- **Source:** Spec #62 §5, §6; Spec #59 §3.3
- **By design:** Pattern outcomes feed trust calibration; trust calibration weights the next density computation
- **ARCH-DEBT routing:** none — by design

### F-35. Adjustment ⇄ Observe (the SDR closed loop / OODA loop closure)

- **Source:** Spec #17 §1, §2, §6; Spec #17 v2.6 OODA Integration Addendum §V2.6-3
- **By design:** Adjustment outputs (case status, CRS history, coverage score, posture score, security debt, architecture pattern counts, tactical/strategic priority progress, communication closure state) feed back into the next Detect/Observe cycle
- **ARCH-DEBT routing:** none — by design

These five loops are the operational essence of Commander as a control system.

---

## 8. Routing summary

### 8.1 Findings already logged in `ARCHITECTURAL_DEBT_REGISTER.md`

| Finding | Existing ARCH-DEBT |
|---|---|
| F-11 Translation-layer authority leak | `ARCH-DEBT-001` |
| F-17 Source-pack schedule v1.9 not retired | `ARCH-DEBT-002` |
| F-12 Spec 32 Strategy Layer no BP | `ARCH-DEBT-003` |
| F-20 Spec #07 register-file mismatch | `ARCH-DEBT-004` |
| F-19 Specs #63/#64 baseline gap | `ARCH-DEBT-005` |
| F-14 DEC-spec00-section3-blocked | `ARCH-DEBT-006` |
| F-13 PHASE_E_PROPOSAL.md unincorporated | `ARCH-DEBT-007` |
| F-18 Build plan stack retired but not replaced | `ARCH-DEBT-008` |

### 8.2 New findings — proposed ARCH-DEBT IDs (to be registered via `log architectural debt …`)

| Finding | Proposed ID | Title |
|---|---|---|
| F-01 | `ARCH-DEBT-009` | Behavioural Signal (signal purpose 7) body truncated — Spec #61 §3.7 |
| F-02 | `ARCH-DEBT-010` | Connector conformance tier names not enumerated — Spec #61 §4.1 |
| F-03 | `ARCH-DEBT-011` | Full v2.6 risk-object type extension list incomplete — MTS v7.0 §6.3 |
| F-04 | `ARCH-DEBT-012` | Workspace bodies for the four middle workspaces not read — MP v5.0 §24 |
| F-05 | `ARCH-DEBT-013` | Full eleven-persona enumeration not read — Spec #17 v2.6 |
| F-06 | `ARCH-DEBT-014` | Spec #08 §5–§15 not read — internal CCHE mechanics partial |
| F-07 | `ARCH-DEBT-015` | Act Phase Dashboard composition body partial — Spec #67 §6 |
| F-08 | `ARCH-DEBT-016` | Identity / Asset Intelligence Surface compositions partial — Spec #68 §3+ / Spec #69 §3+ |
| F-09 | `ARCH-DEBT-017` | OODA phase 4 (Act) §3.4 detail truncated — Spec #58 §3.4 |
| F-10 | `ARCH-DEBT-018` | SDR Control Plane Specification §7–§19 not read |
| F-15 | `ARCH-DEBT-019` | Insider Risk jurisdictional gate at tenant onboarding — runtime enforcement gap |
| F-16 | `ARCH-DEBT-020` | SOC-boundary attribution propagation across all surfaces showing External Attack Correlation cases |
| F-21 | `ARCH-DEBT-021` | Authority precedence stated three times with different tier counts |
| F-22 | `ARCH-DEBT-022` | Steering's status — guidance or authority — formal contradiction in AUTHORITY_MODEL |
| F-23 | `ARCH-DEBT-023` | UI authority — DS-1.0 vs design-system-contract steering (latent conflict) |
| F-24 | `ARCH-DEBT-024` | Page-layout-standard cites unverified decision IDs |
| F-25 | `ARCH-DEBT-025` | CONVERSION_FINDINGS.md generation — v1.1 stamp but cited as live session log |
| F-26 | `ARCH-DEBT-026` | Command Centre — "Implemented" vs "Deferred" — scope-boundary unstated |
| F-27 | `ARCH-DEBT-027` | Spec #21 BAS Connector is staged / Phase 2 (by design) |
| F-28 | `ARCH-DEBT-028` | Spec #24 Connector API Reference Framework is template-only |
| F-30 | `ARCH-DEBT-029` | Hook companion files lack canonical-relationship declaration |

(F-29 `shell-sidebar-header-rebuild` does not warrant its own ARCH-DEBT — covered by `ARCH-DEBT-001`. F-31 through F-35 are circular-dependencies-by-design and do not generate debt.)

### 8.3 How to register the new entries

The owner runs the `log architectural debt …` command for each F-NN row in §8.2 (per `.kiro/steering/feature-function-backlog.md`). Each invocation appends one entry to `ARCHITECTURAL_DEBT_REGISTER.md` with the next sequential ID. Until then, the proposed IDs in this document are **forecasts**, not registry entries.

---

## 9. Source map

This findings document cites only the following baseline files (all under `docs/99_source_archive/baseline_v2_6_2/docs/`) and existing programme governance artefacts:

**Baseline (`02_child_specs/` and `00_master/`):** Spec #08 + v2.6 addendum; Spec #17 + v2.6 OODA addendum; Spec #21; Spec #24 (by reference); Spec #29 v2.0 patch; Spec #30 v2.0 patch; Spec #32; Spec #55 + v2.6 addendum; Spec #57; Spec #58; Spec #59; Spec #61; Spec #62; Spec #65; Spec #67; Spec #68; Spec #69; Spec #71; Spec #72; Spec #75; MP v5.0; MTS v7.0.

**Programme governance:**
- `DECISIONS.md` rows: `DEC-translation-layer-structural-finding`, `DEC-source-pack-schedule-v1_9-superseded`, `DEC-build-plan-replacement`, `DEC-v1.2-Spec07-register-inconsistency`, `DEC-v1.3-register-file-mismatch-depth-pass`, `DEC-v1.2-Spec63-64-gap`, `DEC-spec00-section3-blocked`
- `docs/knowledge/SYSTEM_KNOWLEDGE_GRAPH.md` §20 (GAP table)
- `docs/knowledge/DOMAIN_REGISTER.md` (40-domain index)
- `docs/knowledge/RELATIONSHIP_MAP.md`
- `docs/knowledge/GOVERNANCE_MAP.md` (overlaps O-01, O-05; conflicts C-01 through C-09; orphans Orphan-A, Orphan-E, Orphan-G, Orphan-H)
- `docs/knowledge/ARCHITECTURAL_DEBT_REGISTER.md` (entries `ARCH-DEBT-001` through `ARCH-DEBT-008`)

**Excluded:** the `.kiro/specs/` translation layer (folders 00–43) was not consulted for any claim in this document, per `SOURCING_RULE.md`.
