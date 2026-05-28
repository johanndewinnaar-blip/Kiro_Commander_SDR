# Commander SDR Kiro Conversion Findings

**Pack version:** v1.1  
**Baseline inspected:** v2.6.2  
**Conversion date:** 2026-05-27  
**Status:** v1.1 remediation applied; no application code generated.

## 1. Uploaded baseline inventory

The uploaded baseline pack contains:

| Area | Count / finding |
|---|---:|
| Total files inspected | 117 |
| Markdown documents | 96 |
| Child specification markdown files | 77 |
| Vendor/API DOCX drafts | 19 |
| HTML UI shell references | 2 |
| Feature registry | 1 |

## 2. Authoritative source findings

The baseline already contains a strong authority model:

1. `docs/00_master/00_AUTHORITY_AND_PRECEDENCE_v2_6.md` defines tiered precedence.
2. `CURRENT_BASELINE_MANIFEST_v2_6.md` declares the pack inventory and current baseline tag `v2.6.2`.
3. `AGENTS.md` gives binding agent read sequence, stale-document warnings and doctrinal constraints.
4. `MEMORY.md` is explicitly context only, not source of truth.
5. `docs/feature_registry/SDR_Feature_Registry_FR001_v1_0.md` is the feature inventory/control source.
6. The active HTML shell files are design references only, not feature-authority documents.

## 3. Product and doctrine findings

The product baseline is not a dashboard MVP. It is a full Security Command and Control programme containing:

- Security C2 category framing.
- Security Drift Response as the operational discipline.
- Commander as the platform brand.
- Security OODA loop surfaces.
- Internal and external operating pictures.
- Security signal connector contract.
- Verdict semantics.
- Direction Boards.
- Case management, email communication and lifecycle closure.
- Vulnerability and exposure management.
- Asset, identity, control coverage and architecture intelligence.
- Commander AI as a governed product capability.

## 4. Gap converted by this pack

The baseline is rich but not yet laid out as a Kiro execution repository. This conversion pack adds:

- Root Kiro onboarding, build sequence, change control and decisions files.
- Workspace steering files under `.kiro/steering/`.
- Multiple Kiro feature specs under `.kiro/specs/`, each with `requirements.md`, `design.md`, and `tasks.md`.
- Build packs under `docs/04_build_packs/`.
- Prompt library under `docs/07_prompt_library/`.
- Phase 2 testing schedule under `docs/08_phase_2_testing/`.
- Local-first / AWS-aligned skeleton folders for future code without writing code now.


## v1.1 remediation applied

### P0-0 — Repo scaffold drift corrected

Replaced v1.0 scaffold drift with baseline-aligned locations: `apps/api/`, `packages/contracts/`, `packages/db/`, `packages/rules/`, `packages/workers/`, `tests/fixtures/`, `infra/terraform/`, `infra/docker/`, `infra/github-actions/`, `scripts/python/` and `analytics/`. Removed `services/api/`, `packages/contracts and packages/db/`, `packages/rules/`, `tests/fixtures/` and `infra/terraform/`.

### P0-1 — Missing doctrinal assertions added

Added enforceable EARS requirements for closed-loop case model, SOC boundary, four-stream intelligence integrity, surface attribution and verdict semantics/disposition across relevant Kiro specs.

### P0-2 — Domain-specific requirements added

Supplemented generic process requirements with baseline-derived EARS requirements across all 34 Kiro specs. Critical-tier specs received deeper domain-specific coverage.

### P0-3 — Per-spec baseline cross-references added

Added `Translated from baseline` lineage to every Kiro `requirements.md` file.

### P1-1 — v2.6 doctrine steering added

Created `.kiro/steering/commander-v2-6-doctrine.md` covering Specs #56–#62 with `inclusion: always`.

### P1-2 — Build sequence and roadmap audited

Updated `BUILD_SEQUENCE.md` and `BUILD_VERSION_ROADMAP.md` to enforce prerequisite chains, Commander AI core status, Phase 2/Phase 3 sequencing and the distinction between pack version and product version.

### P1-3 — Critical-tier designs and tasks strengthened

Replaced generic boilerplate in the design and task files for data model, case management, connector framework and Security C2 with domain-specific architecture and planning tasks.

### P1-4 — Doctrinal assertions hook recipe added

Created `.kiro/hooks/04-doctrinal-assertions-check-hook.md` and updated the hooks README. The file is a hook recipe / guardrail prompt pending Kiro enablement.

### P1-5 — AgentCore reference softened

Updated the AWS/Bedrock/AgentCore spec to treat AgentCore as a candidate runtime only. Added a decision placeholder to `DECISIONS.md`.

### P2-1 — Glossary added

Created `docs/00_authority/GLOSSARY.md` with Commander-specific terms and baseline references.

### P2-2 — Steering files tightened

Strengthened doctrine, authority/preference and build-pack discipline steering files.

### P2-4 — Source archive integrity verified

Confirmed the archived baseline contains 117 files, includes the v2.6.2 stale document notice in `AGENTS.md`, includes `RELEASE_NOTES_v2_6_2.md`, and retains `docs/01_active_build/Commander_SDR_AI_Build_Playbooks_v1_7.md` for lineage.

### P2-5 — Pack version bumped

Bumped the corrected conversion pack to v1.1 and prepared the v1.1 zip output.

## v1.2 remediation applied

- Phase 1 completeness and validity audit created at `docs/00_authority/V1_2_COMPLETENESS_AUDIT.md`.
- Added first-class Kiro specs for missing or under-represented baseline capabilities: drift/rule engine, platform security, rule/model/decision governance, mission objective binding, Commercial Control Plane UI, Pre-Warned/Protected/Novel classification, Inverse Discovery Loop, Internal Risk Investigation Sub-Lifecycle and Universal Search.
- Added master inventory EARS enumerations for twelve case types, eight signal purposes, ten analytical engines, six workspaces, eleven personas, five authority overlays, three application boundaries, four intelligence streams, four connector classes and OODA dashboard family.
- Strengthened surface specs #65-#70 coverage with named surface/panel/view requirements.
- Added tenant, connector and detection model lifecycle requirements from Master Technical Specification §13.
- Added Phase 2 vendor/API enumeration from the archived API specification set.
- Preserved AgentCore as evaluation candidate only.
- Added `docs/00_authority/SPEC_COVERAGE_MATRIX.md` and root `CHANGELOG_v1_2.md`.
- Recorded Spec #07 register/file inconsistency in `DECISIONS.md` and preserved both Drift/Rule Engine and Universal Search coverage.

## v1.3 remediation applied

v1.3 addresses the narrow remediation brief finding that sixteen existing Kiro specs were marked `full` in v1.2 without substantive baseline-depth edits. No new Kiro specs were added and no repository restructuring was performed.

- `00-programme-foundation/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #01 AI Build Agent Workflow, Spec #18 Unified Identity Architecture / register mismatch noted, Spec #56 Shell Reference vs Build Authority Doctrine.
- `02-design-system-ui-component-catalogue/requirements.md` deepened with 24 v1.3 EARS requirements sourced from: Spec #11a UI/UX Design System, Spec #11b Workspace & Dashboard Composition, Spec #41 Military-Intelligence UI Doctrine, Spec #43 Graph/Gauge/Overlay System, Spec #53 Shell UI Usability Correction.
- `03-seed-data-and-test-fixtures/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #05 Data Connector Normalisation, Spec #12 SDR Normalisation Strategy, Spec #46 Canonical Terminology, Spec #61 Universal Security Signal Connector Contract.
- `04-data-model-canonical-entities/requirements.md` deepened with 22 v1.3 EARS requirements sourced from: Spec #03 Backend/API Architecture, Spec #05 Data Connector Normalisation, Spec #11b Workspace & Dashboard Composition, Spec #15 SIEM/SOAR Rule Generation, Spec #18 Unified Identity Architecture, Spec #20 Coordinated Push Group Schema.
- `07-vulnerability-management/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #16 Performance/Scaling source-file mismatch noted, Spec #28 Strategic and Tactical Priority Framework, Spec #29 Universal Risk Object and Case Binding, Spec #60 Internal/External Attack Surface Framework, Spec #74 Context-Aware Drift Prioritisation Matrix.
- `12-architecture-topology/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #21 BAS Connector Integration Contract, Spec #22 Architecture Intelligence Engine, Spec #33 Multi-Domain Fusion Map, Spec #43 Graph/Gauge/Overlay System, Spec #65 External Operating Picture Surface, Spec #66 Internal Operating Picture Surface.
- `17-mock-connectors/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #05 Data Connector Normalisation, Spec #09 Connector Architecture, Spec #24 Connector API Reference Framework, Spec #61 Universal Security Signal Connector Contract, Spec #62 Verdict Semantics.
- `20-commander-ai-core/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #13 Commander AI Architecture & Grounding Rules, Spec #26a Closed-Loop Email & Case Communication Lifecycle, Spec #34 Mission Control / Pulse source-file mismatch noted, Spec #59 Intelligence Layer Architecture, Spec #62 Verdict Semantics.
- `23-ciso-dashboard/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #42 Domain Security Dashboards, Spec #65 External Operating Picture Surface, Spec #66 Internal Operating Picture Surface, Spec #67 OODA Dashboard Family, Spec #73 Silent Defence Reporting, Spec #74 Context-Aware Drift Prioritisation Matrix.
- `24-security-c2-p0-war-room/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #40 P0 Zero-Day Priority Override, Spec #44 P0 Zero-Day War Room UI, Spec #58 Security OODA Loop, Spec #65 External Operating Picture Surface, Spec #66 Internal Operating Picture Surface, Spec #67 OODA Dashboard Family.
- `25-email-case-communication/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #08 Case Management Workflow, Spec #26 Case Communication and Broadcast Channel, Spec #26a Closed-Loop Email Case Communication Lifecycle, Spec #49 Admin Control Surface Information Architecture.
- `28-audit-trail/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #27 Shared Responsibility Profile & Configuration Governance, Spec #30 Universal Validation / Closure / Reopening, Spec #48 Audit Event Framework source-file mismatch noted, Spec #62 Verdict Semantics.
- `30-phase3-pilot-production-hardening/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #16 Performance/Scaling, Spec #31 Routing Model and Team Affinity, Spec #44 P0 War Room UI, Spec #55 Baseline Configuration Framework, Spec #61 Universal Security Signal Connector Contract, Spec #73 Silent Defence Reporting.
- `31-devops-local-aws-alignment/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #03 Backend/API Architecture, Spec #04 Frontend Architecture, Spec #06 Worker and Scheduling, Spec #16 Performance/Scaling and Operational.
- `32-platform-security-hardening/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #02 DevOps/Environments/CI-CD, Spec #19 Full RBAC Permission Matrix, Spec #25 Trust Boundary & Third-Party Intelligence, Spec #27 Shared Responsibility Profile & Configuration Governance, Spec #48 Audit Event Framework, Spec #50 RBAC/Entitlement/Feature Flag/Menu Visibility.
- `33-observability-tool-health/requirements.md` deepened with 20 v1.3 EARS requirements sourced from: Spec #06 Worker and Scheduling, Spec #16 Performance/Scaling/Operational, Spec #23 Security Tool Intelligence, Spec #49 Admin Control Surface Information Architecture, Spec #61 Universal Security Signal Connector Contract.

## v1.3.1 lineage closure applied

- Work Item 1 — added `.kiro/specs/43-strategy-layer-runtime-surface/` for baseline Spec #32.
- Work Item 2 — deepened `20-commander-ai-core` with Commander AI four modes and BYOM requirements.
- Work Item 3 — deepened `10-identity-intelligence` with CHAIN model, group intelligence, investigation profile and watchlist requirements.
- Work Item 4 and 8 — deepened `11-control-coverage-editable-baselines` with coverage outputs and compliance mapping requirements.
- Work Item 5 — deepened `04-data-model-canonical-entities` with data classification and residency requirements.
- Work Item 6, 12 and connector lifecycle parts of 15 — deepened `16-connector-framework` with inbound/outbound integration, ingestion tiers and connector lifecycle requirements.
- Work Item 7 — deepened `09-asset-intelligence` with ephemeral asset, attack-surface auto-positioning and extensible cartography requirements.
- Work Item 9 and 11 — deepened `13-security-c2` with CTEM stage and conformance requirements.
- Work Item 10 — deepened `29-phase2-testing-real-connectors` with Tier 1 connector schedule requirements.
- Work Item 13 — deepened `27-push-governance-dry-run` with bidirectional SIEM/SOAR flow requirements.
- Work Item 14 — deepened `06-case-management` with v2.6 risk object type requirements.
- Work Item 15 — deepened `18-tenant-admin`, `16-connector-framework` and `36-rule-model-decision-governance-surface` with lifecycle requirements.
- Work Item 16 and 17 — deepened `41-internal-risk-investigation-sub-lifecycle` with jurisdictional configuration and insider-risk boundary prohibitions.
- Updated SPEC_COVERAGE_MATRIX, DECISIONS, BUILD_SEQUENCE and pack version markers to v1.3.1.
- Execution posture confirmed as Kiro + Git only; no external orchestration layer, custom Kiro powers, app code, live AWS resources or real vendor integrations were added.


## Build session 2026-05-27 (final close-out, verified)

### 1. Specs completed end-to-end today

| Spec | Description | Key commits |
|------|-------------|-------------|
| 00 | Programme Foundation | ca7f8fd, 5893df1, ccec0e5 |
| 01 | Application Shell + Routes | 13e055b |
| 02 | Design System | 65fdb84 |
| 03 | Seed Data + Fixtures | 14b63f1 |
| 04 | Canonical Data Model | 8c47e58 |
| 05 | Command Centre | ba19877 |
| 43 | Strategy Layer Runtime Surface | 788471b |

### 2. Design Language Remediation completed in 5 phases

| Phase | Scope | Commit |
|-------|-------|--------|
| Phase 1 | 18 EARS requirements appended to Spec 02 | 16c6775 |
| Phase 2 | Fonts (Bebas Neue, Inter), tokens (#061936 navy, #ffd21f gold), 9 new components | 265607a |
| Phase 3 | Three boundary shells (Operational App, Commercial Control Plane, Tenant Admin), route boundary tags, 18 sidebar nav groups | 936fc68 |
| Phase 4 | Command Centre re-implementation against v11 shell reference | d4747d8 |
| Phase 5 | Sidebar expand/collapse interactivity with localStorage persistence | 79443d3 |

### 3. Spec 06 started in phased approach

- **Phase A complete** — Case domain model: 12 case types, closed-loop lifecycle states, 2 new risk object types (coverage_blindspot, ooda_phase_degradation), surface attribution. Commit f4d2ca2, +26 tests.
- **Phase B complete** — Strategy consumption resolvers for SLA, Routing, Prioritisation Weight, Validation Window, Closure Gate, Reopening Trigger. Commit ea3ebff, +32 tests. Verified zero hardcoded strategy values; resolvers take strategies as parameter from Spec 43's seed-strategies.ts fixture.
- **Phases C (UI), D (full state machine), E (communication/evidence) deferred to next session.**

### 4. Total test count at session close

**297 tests passing** across 15 test files.

### 5. Key decisions recorded today

- DEC-spec00-planning-complete, DEC-spec00-no-mock-data-needed, DEC-spec00-section3-blocked
- DEC-spec01 through DEC-spec05 (per-spec execution decisions)
- DEC-spec43-twelve-surfaces, DEC-spec43-runtime-binding, DEC-spec43-build-blocking, DEC-spec43-automation-boundary
- DEC-v1.3.2-design-language-remediation
- DEC-v1.3.2-tenant-admin-shell-pending-reference
- DEC-v1.3.2-sidebar-interactivity

### 6. Validation observation

Spec 06 Phase B was diagnostically verified post-implementation. Resolver code contains zero hardcoded strategy values; SLA/routing/priority values flow from Spec 43 strategy policies via dependency injection (strategies parameter). Tenant Admin → Strategy Centre → resolver runtime path confirmed.

### 7. Open items for next session

- Spec 06 Phases C, D, E.
- Responsive design scope: laptops 1280-1600px, standard monitors 1920×1080, wide monitors 2560×1440 and ultrawide. No phone or tablet. To be captured as a dedicated future spec.
- Tenant Admin reference HTML pending. Tenant Admin currently inherits Operational App visual language per DEC-v1.3.2-tenant-admin-shell-pending-reference.
- Hook file format cleanup: .md recipes, .json files from initial conversion, and runtime .kiro.hook files coexist. To be tidied in a future small task.
- Phased-execution pattern proven effective for large specs (worked for design remediation in 5 phases, for Spec 06 in 2 phases so far). Same pattern recommended for any spec with >20 tasks.

### 8. Working copy status

Working copy clean. Branch: main. HEAD matches origin/main.


## Build session — DS-1.0 implementation + Spec 06 Phase C complete

### Design System (DS-1.0)

- `DESIGN_SYSTEM.md`, `MOCKUP_INDEX.md`, and 8 high-fidelity PNG mockups committed as authoritative in `docs/06_ui_build_reference/` (commit `48e5377`). Equal in standing to the shell reference HTMLs.
- Spec 02 amended with 47 DS-1.0 EARS requirements capturing every pinned value, both workspace modes, three-layer token architecture, and all signature components (commit `70fc8e0`).
- 8 library/design decisions recorded: DEC-design-system-v1, DEC-ds1-vega-lite, DEC-ds1-lucide, DEC-ds1-shadcn-ui, DEC-ds1-jetbrains-mono, DEC-ds1-fusion-map-library-deferred, DEC-ds1-topbar-56px, DEC-ds1-sidebar-248px-collapsible.

### DS-1.0 Implementation Phases

| Phase | Commit | Scope |
|-------|--------|-------|
| Phase 1 — Tokenise | `4c1d799` | Three-layer token system (primitives, semantic, component) with exact pinned DS-1.0 values |
| Phase 2a — Foundation | `ffe6488` | Standard/Mission mode system, collapsible sidebar (248px/68px rail), shell migrated to tokens, Lucide installed |
| Phase 2b — Core data components | `fdd9f33` | KPI strip/tile, instrument gauge (Vega-Lite), ranked table with inline bar+trend, live activity feed |
| Phase 2c — Signature components | `62fa8f4` | Strategic heading compass, closed-loop lifecycle pipeline, right-rail insight/action column |
| Phase 3 — Command Centre | `a88f7d4` | Full DS-1.0 rebuild: KPI strip, gauges, live feed, Standard+Mission modes, matching command-centre-standard.png and command-centre-mission.png |

### Spec 06 Phase C (Cases UI) — COMPLETE

| Sub-phase | Commit | Surface |
|-----------|--------|---------|
| C1 — Case Queue | `170023e` | `/cases` — lifecycle pipeline, ranked table, strategy-driven SLA, priority shape+label, surface attribution |
| C2 — Case Detail | `b836326` + `99420eb` | `/cases/:id` — sticky header, metadata, timeline, evidence pack, right-rail (Phase 2c component), responsive master-detail, strategy bindings |
| C3a — P0 Zero-Day | `e848c61` | `/war-room/p0` — Emergency Command mode forced, P0 propagation (reason, scope, owner, expiry, evidence), critical glow |
| C3b — Case Analytics | `a8ed0c1` | `/cases/analytics` — 4 Vega-Lite chart specs (line, donut, gauge, bar), --data-* token colours, strategy-driven SLA compliance |

All doctrinal assertions held throughout Phase C: closed-loop case model (no manual creation/edit/closure), P0 propagation, SOC boundary (read-only), surface attribution on all surfaces, strategy-layer consumption (zero hardcoded SLA/routing/priority/validation/closure/reopening values), charts on --data-* tokens only.

### Test count at session close

**459 tests passing** across 23 test files.

### Working copy status

Working copy clean. Branch: main. HEAD `a8ed0c1` matches origin/main.

### Open items for next session

- Verify Vega-Lite charts render at runtime (vega-embed wiring) on the Analytics page.
- Spec 06 Phases D (full lifecycle state machine) and E (communication/evidence/auto-healing) still deferred.
- Deferred design tweaks (owner to specify).
- Fusion Map bespoke graph library decision still pending (DEC-ds1-fusion-map-library-deferred).
- Tenant Admin reference HTML still pending (DEC-v1.3.2-tenant-admin-shell-pending-reference).
- Next spec per BUILD_SEQUENCE.md after Spec 06 D/E completes.


## Design gaps — identified, owned, deferred

### Data-level persona-scoped case visibility

**Identified during:** Spec 06 Phase C review.  
**Gap:** Role-scoped case visibility (e.g. a Vulnerability Analyst sees only vulnerability-domain cases) was intended by doctrine but had no explicit EARS requirement and was not assigned to a specific phase. The data model supports it (caseType, team, owner, surfaceAttribution) and Spec 19 defines personas + route-level visibility, but data-level case filtering by persona was only assumed to "emerge" from the combination of specs — risking it never being built.  
**Resolution:** Now captured as an explicit EARS requirement in Spec 06 ("Persona-scoped case filtering") + cross-reference in Spec 19 + decision DEC-case-visibility-persona-scoped.  
**Prerequisites:** Authentication/user context system, Spec 19 persona model implemented, Spec 06 Phase D routing engine with team affinity.  
**Build target:** Gate 3 (v1.3).  
**Status:** Owned, deferred, explicitly tracked.


## Build session — DS-1.0 implementation, Spec 06 Phase C, persona-scoping gap, tweaks pending

### Design System (DS-1.0)

- `DESIGN_SYSTEM.md`, `MOCKUP_INDEX.md`, and 8 high-fidelity PNG mockups committed as authoritative in `docs/06_ui_build_reference/` (commit `48e5377`). Equal in standing to the shell reference HTMLs.
- Spec 02 amended with 47 DS-1.0 EARS requirements (commit `70fc8e0`).
- 8 library/design decisions recorded: DEC-design-system-v1, DEC-ds1-vega-lite, DEC-ds1-lucide, DEC-ds1-shadcn-ui, DEC-ds1-jetbrains-mono, DEC-ds1-fusion-map-library-deferred, DEC-ds1-topbar-56px, DEC-ds1-sidebar-248px-collapsible.

### DS-1.0 Implementation (all complete)

| Phase | Commit | Scope |
|-------|--------|-------|
| Phase 1 — Tokenise | `4c1d799` | Three-layer token system (primitives, semantic, component) with exact pinned DS-1.0 values |
| Phase 2a — Foundation | `ffe6488` | Standard/Mission mode system, collapsible sidebar (248px/68px rail), shell migrated to tokens, Lucide installed |
| Phase 2b — Core data components | `fdd9f33` | KPI strip/tile, instrument gauge (Vega-Lite), ranked table with inline bar+trend, live activity feed |
| Phase 2c — Signature components | `62fa8f4` | Strategic heading compass, closed-loop lifecycle pipeline, right-rail insight/action column |
| Phase 3 — Command Centre | `a88f7d4` | Full DS-1.0 rebuild: KPI strip, gauges, live feed, Standard+Mission modes, matching command-centre-standard.png and command-centre-mission.png |

### Spec 06 Phase C (Cases UI) — COMPLETE

| Sub-phase | Commit | Surface |
|-----------|--------|---------|
| C1 — Case Queue | `170023e` | `/cases` — lifecycle pipeline, ranked table, strategy-driven SLA, priority shape+label, surface attribution |
| C2 — Case Detail | `b836326` + `99420eb` | `/cases/:id` — sticky header, metadata, timeline, evidence pack, right-rail, responsive master-detail, strategy bindings |
| C3a — P0 Zero-Day | `e848c61` | `/war-room/p0` — Emergency Command mode forced, P0 propagation, critical glow |
| C3b — Case Analytics | `a8ed0c1` | `/cases/analytics` — 4 Vega-Lite chart specs (line, donut, gauge, bar), --data-* token colours, strategy-driven SLA compliance |

All doctrinal assertions held: closed-loop case model, P0 propagation, SOC boundary, surface attribution, strategy-layer consumption, charts on --data-* tokens, both modes.

### Gap captured

- **Persona-scoped case visibility** identified as unassigned design gap during Phase C review. Now captured as explicit Spec 06 EARS requirement + DEC-case-visibility-persona-scoped + Spec 19 cross-reference. Deferred to Gate 3 (v1.3). Prerequisites: auth/user context + Spec 19 persona model + Spec 06 Phase D routing engine. Commit `6b959f3`.

### Test count at session close

**459 tests passing** across 23 test files.

### Working copy status

Working copy clean. Branch: main. HEAD `6b959f3` matches origin/main.

### Open items for next session (priority order)

1. **UI Tweak Pass A (token cosmetics):** sharp corners (--radius 0/2/2), darker Standard borders, crisp white menu text, h1 font → Inter Bold.
2. **UI Tweak Pass B (layout/fixes):** logo/sidebar width alignment, breadcrumb shows path not title echo, home link (logo → Command Centre + gold home icon in collapsed rail), params.id React.use() fix, verify Vega-Lite charts render (vega-embed wiring).
3. **Deeper seed data:** more cases/assets so surfaces aren't thin.
4. **Case Queue "My Cases" expandable line-summary pattern** (Jira-style collapsed stubs → expand) — its own scoped feature.
5. **Still deferred:** Spec 06 Phase D (lifecycle state machine), Phase E (comms/evidence/auto-healing); Fusion Map bespoke graph library; Tenant Admin reference HTML; other domain specs (Vulnerability, Identity, Architecture) per BUILD_SEQUENCE.


## Design tweaks — resolved (2026-05-28)

### UI Tweak Pass A — token cosmetics

| Change | Token layer | Before | After |
|--------|-------------|--------|-------|
| Sharp corners | Primitive | sm=4px, md=8px, lg=12px | sm=0px, md=2px, lg=2px |
| Standard-mode card borders (darker) | Semantic | default=neutral-200, subtle=neutral-100 | default=neutral-300 (#c2cede), subtle=neutral-200 (#dbe3ef) |
| Crisp white nav text | Semantic (new `chrome.navText`) | rgba(220,235,255,0.82) / rgba(185,210,238,0.72) / rgba(255,255,255,0.7) | #ffffff (both modes) |
| Active nav text | Semantic (new `chrome.navTextActive`) | #fff / gold mix | gold (#ffd21f) |
| Page-title h1 font | Component usage | Bebas Neue (display) | Inter Bold 700 (body) |

Mission-mode borders unchanged. Bebas Neue retained for brand wordmarks and EMERGENCY COMMAND label only. `--radius-full` retained for avatars/pills.

**Propagation method:** All changes at primitive/semantic token level. Zero per-page patching of values. Components consuming `componentTokens.cardRadius`, `tokens.border.default`, `tokens.border.subtle`, and the new `chrome.navText`/`chrome.navTextActive` tokens inherit automatically.

**Commit:** `d3ba46d`  
**Test count:** 459 passing (23 files), zero regressions.  
**Surfaces affected:** Command Centre, Case Queue, Case Detail, Case Analytics, P0 War Room, Sidebar, Top Bar.

### Prompt library and execution-discipline steering

Added reusable prompt templates and expanded steering in the same session:

- `docs/00_authority/prompts/` — 5 templates (SESSION_START, PHASE_RUNNER, TWEAK_PASS, SUB_PHASING, VERIFY_AND_CLOSE) + README.
- `.kiro/steering/execution-discipline.md` — standing rules for tokens, testing, context-limit, UI verification, agent mode, commit discipline.
- `docs/00_authority/DAILY_OPERATING_LOOP.md` — standard session workflow with template cross-references.

**Commit:** `10468a4`

### Open items for next session (priority order)

1. **UI Tweak Pass B (layout/fixes):** logo/sidebar width alignment, breadcrumb shows path not title echo, home link (logo → Command Centre + gold home icon in collapsed rail), params.id React.use() fix, verify Vega-Lite charts render (vega-embed wiring).
2. **Deeper seed data:** more cases/assets so surfaces aren't thin.
3. **Case Queue "My Cases" expandable line-summary pattern** (Jira-style collapsed stubs → expand) — own scoped feature.
4. **Still deferred:** Spec 06 Phase D (lifecycle state machine), Phase E (comms/evidence/auto-healing); Fusion Map bespoke graph library; Tenant Admin reference HTML; other domain specs per BUILD_SEQUENCE.


## Design tweaks — resolved (2026-05-28, Pass B)

### UI Tweak Pass B — structural alignment and layout

| Change | Scope | Method |
|--------|-------|--------|
| Radius hunt | All hardcoded `borderRadius` values eliminated | Replaced with `primitiveRadii.md`, `primitiveRadii.sm`, `primitiveRadii.full`, or `componentTokens.cardRadius`. Zero hardcoded radius literals remain. |
| Logo/sidebar width alignment | Top-bar brand zone width tied to sidebar state | Brand zone uses `useSidebarCollapsed()` context; collapses to `sidebarRail` (68px) when sidebar collapses. Single vertical edge shared. |
| Sidebar collapse gap fix | Main content reflows on collapse | Shell `marginLeft` now dynamic via shared `SidebarProvider` context with CSS transition. No black gap at any screen width. |
| Home link | Brand wordmark links to `/` | Top-bar brand zone is now an `<a href="/">`. Collapsed rail shows gold ⌂ home icon. Both states link home. |
| Grid alignment | 12-column grid system | `componentTokens.gridColumns = 12` added. Content grids use `repeat(3, 1fr)` (4-col spans) with consistent `gridGap` and `contentPadding` — column edges align between KPI strip and content cards. |
| Card header consistency | Standardized card header margin | `componentTokens.cardHeaderMargin` (12px) added. All card headers use same padding, type scale, and baseline. |
| params.id Next.js 15 fix | `cases/[id]/page.tsx` | Params unwrapped with `React.use(params)` — resolves console warning. No behaviour change. |

**New shared context:** `apps/web/src/context/sidebar-context.tsx` — `SidebarProvider` wraps the app in root layout. Both sidebar and shell consume `useSidebarCollapsed()` for synchronized width.

**Commit:** `4daec15`  
**Test count:** 459 passing (23 files), zero regressions.  
**Surfaces affected:** All pages (shell reflow), Command Centre, Case Queue, Case Detail, Case Analytics, P0 War Room, Sidebar, Top Bar.

### Open items for next session (priority order)

1. **Deeper seed data:** more cases/assets so surfaces aren't thin.
2. **Case Queue "My Cases" expandable line-summary pattern** (Jira-style collapsed stubs → expand) — own scoped feature.
3. **Still deferred:** Spec 06 Phase D (lifecycle state machine), Phase E (comms/evidence/auto-healing); Fusion Map bespoke graph library; Tenant Admin reference HTML; other domain specs per BUILD_SEQUENCE.


## Design tweaks — resolved (2026-05-28, Pass C)

### UI Tweak Pass C — content, density, and type rhythm

| Change | Method | Detail |
|--------|--------|--------|
| Duplicate gauge circles removed | Command Centre page | Three large circular gauges (Posture 72, SLA 94, Coverage 87) removed — KPI strip already carries these metrics. Layout reflows naturally. |
| Type rhythm — h1 | Primitive token `h1: '24px'` | Bumped from 22px to 24px so page title dominates. |
| Type rhythm — micro | Primitive token `micro: '11px'` | Bumped from 10px to 11px for better legibility on labels/timestamps. |
| Type rhythm — KPI value | KPI tile component | 22px Inter SemiBold (was 18px Bold). Reduced visual dominance vs h1. |
| Type rhythm — KPI label | KPI tile component | 11px uppercase, --text-muted. |
| Type rhythm — KPI delta | KPI tile component | 11px, --text-muted. |
| Type rhythm — sidebar text | Sidebar component | 12px (caption) — chrome subordinated to content. |
| Type rhythm — card headers | Command Centre + live-feed | 11px uppercase, --text-muted, 0.06em tracking. |
| Live Activity row separators | Live-feed component | 1px `--border-subtle` between each item. Applied at component level. |
| Scrollable card lists | Component token `cardListMaxHeight: '360px'` | Live-feed container uses it; Recent Cases and Asset Summary cards get `maxHeight` + `overflowY: auto`. |
| Recent Cases columns | Command Centre page | Added Updated (relative timestamp, 11px caption) and Status (uppercase badge) columns. |
| Vega-Lite charts wired | `vega-embed@6.26.0` installed | New `VegaChart` component renders specs via vega-embed. Three of four charts on `/cases/analytics` now render as SVG (line, donut, bar). SLA gauge remains a numeric display. Charts were NOT rendering before — needed wiring. |

**New component:** `apps/web/src/components/vega-chart.tsx` — wraps vega-embed for declarative Vega-Lite spec rendering.

**Dependencies added:** `vega@5.30.0`, `vega-lite@5.21.0`, `vega-embed@6.26.0`.

**Commit:** `b7e3156`  
**Test count:** 460 passing (23 files), zero regressions (+1 net test from gauge→KPI replacement).  
**Surfaces affected:** Command Centre (gauges removed, type rhythm, list patterns), Case Analytics (charts now render), Sidebar (12px text), all pages (h1 24px, micro 11px via tokens).

### Open items for next session (priority order)

1. **Deeper seed data:** more cases/assets so surfaces aren't thin.
2. **Case Queue "My Cases" expandable line-summary pattern** (Jira-style collapsed stubs → expand) — own scoped feature.
3. **Still deferred:** Spec 06 Phase D (lifecycle state machine), Phase E (comms/evidence/auto-healing); Fusion Map bespoke graph library; Tenant Admin reference HTML; other domain specs per BUILD_SEQUENCE.


## Bugfix — RSC Set serialization error (2026-05-28)

**Error:** "Only plain objects can be passed to Client Components from Server Components. Set objects are not supported."

**Root cause:** `next/font/google` returns font objects with internal Set properties (used for subset tracking). When the root layout (a Server Component) imported these objects and accessed `.variable`, the RSC serializer encountered the internal Sets during payload generation.

**Fix:** In `apps/web/src/app/fonts.ts`, the `Inter()` and `Bebas_Neue()` font objects are now unwrapped to plain `{ variable: string }` objects before export. Only the CSS variable class name string crosses the RSC boundary — never the full font object.

**Verification:** All five pages (Command Centre, Cases, Case Detail, P0 War Room, Case Analytics) compiled and served with 200 status, no Set serialization errors in server output.

**Regression test:** Added 2 tests in `phase2a-foundation.test.ts` under "RSC Serialization Safety" — verifies fonts.ts exports plain objects and no Server Component layouts use `new Set`.

**Commit:** `74e8d1a`  
**Test count:** 462 passing (23 files), zero regressions (+2 new tests).


## Spec 03 Deep Seeding Pass (2026-05-28)

Expanded all seed fixture files to populate surfaces realistically.

| File | Before | After |
|------|--------|-------|
| seed-cases.ts | 3 cases | 30 cases (all 12 canonical + 5 legacy types, P0–P4, mixed statuses) |
| seed-assets.ts | 3 assets | 40 assets (9 classifications, mixed environments, 60/40 internal/external) |
| seed-identities.ts | 3 identities | 25 identities (15 human, 6 service-account, 2 workload, 2 third-party) |
| seed-events.ts (NEW) | — | 50 activity events across 24h (mixed severities and entity types) |
| seed-strategies.ts | 2 routing entries | 17 routing entries (all case types covered) |

**Routing strategy fix:** `teamAffinity` expanded from 2 case types to all 17 (12 canonical + 5 legacy). No resolver returns "unresolved" for any seed case.

**Doctrinal compliance:** All cases system-created, all carry surface attribution, all priorities use shape+colour+label, strategy values consumed from resolvers (zero hardcoded SLA/routing/priority), no SOC write paths, no insider-risk paths.

**Commit:** `cf49b7b`  
**Test count:** 462 passing (23 files), zero regressions.

### Open items for next session (priority order)

1. **Case Queue "My Cases" expandable line-summary pattern** — own scoped feature.
2. **Still deferred:** Spec 06 Phase D (lifecycle state machine), Phase E (comms/evidence/auto-healing); Fusion Map bespoke graph library; Tenant Admin reference HTML; other domain specs per BUILD_SEQUENCE.
