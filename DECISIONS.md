# Decisions — Commander SDR Kiro Programme

| ID | Date | Decision | Reason | Impact |
|---|---|---|---|---|
| DEC-001 | 2026-05-27 | Create Kiro conversion repository pack from Commander SDR baseline v2.6.2. | User requested Kiro-ready, AWS-aligned, full-journey product build programme. | Establishes repo skeleton, steering, specs, build packs, roadmap and prompt library. |
| DEC-002 | 2026-05-27 | Treat Commander SDR as no-MVP versioned programme. | User doctrine and baseline scope require whole journey committed from day one. | Version roadmap starts at v1.1 and stages onward. |
| DEC-003 | 2026-05-27 | Commander AI is core from v1.1. | User explicitly directed Commander AI must not be optional later scope. | Dedicated Kiro spec, build pack and AWS/Bedrock/AgentCore evaluation lane added. |
| DEC-004 | 2026-05-27 | AWS is preferred target cloud, but local-first development remains mandatory. | User direction and cost/control constraints. | `infra/terraform/` contains planning only; no resources created. |
| DEC-005 | 2026-05-27 | Do not use n8n and do not create custom Kiro powers during initial conversion. | User hard constraints. | Steering and AGENTS explicitly block both. |
| DEC-006 | 2026-05-27 | Preserve original baseline under `docs/99_source_archive/baseline_v2_6_2/`. | Auditability and traceability. | Source docs remain available without becoming rewritten. |

## D-v1.1-AgentCore-evaluation-status — AgentCore candidate status

**Status:** Open / evaluation-only.  
**Decision:** Amazon Bedrock AgentCore is not selected as Commander runtime in this pack. It remains an AWS candidate runtime for later evaluation.  
**Rationale:** Baseline authority requires local-first development, no live AWS resources during initial conversion, and no external runtime replacing Commander authority without review.  
**Required before adoption:** Record evaluation outcome covering tenancy, security, audit, cost, latency, observability, portability and Commander AI grounding.

| DEC-v1.2-Spec07-register-inconsistency | 2026-05-27 | Preserve both Drift/Rule Engine and Universal Search coverage. | Baseline Specification Register row #07 names Universal Search Implementation, while the authoritative source file `07_Drift_and_Rule_Engine_Spec.md` contains Drift and Rule Engine doctrine. | v1.2 adds `34-drift-and-rule-engine` and `42-universal-search`; the inconsistency remains documented rather than silently resolved. |
| DEC-v1.2-AgentCore-remains-candidate | 2026-05-27 | Keep AWS Bedrock AgentCore as candidate-only. | v1.2 remediation confirms no external runtime may replace baseline architecture without owner decision. | AgentCore references are softened to evaluation-only and no AWS resources are created. |
| DEC-v1.2-Spec63-64-gap | 2026-05-27 | Record baseline gap for Specs #63 and #64. | The archived child-spec directory contains no Spec #63 or Spec #64 files, while the sequence resumes at Spec #65. The v1.2 coverage matrix therefore cannot mark them full without inventing doctrine. | Coverage matrix marks #63 and #64 as decision required; no invented Kiro specs were created. |

| DEC-v1.3-register-file-mismatch-depth-pass | 2026-05-27 | Treat actual child-spec file content as authoritative for v1.3 deepening where register titles and file titles conflict. | v1.3 brief required verification. The source archive contains several title mismatches, including Spec #01, #04, #16, #18, #26/#26a, #27, #32, #34 and #38. | v1.3 appends requirements using actual source-file content and records mismatches instead of skipping deepening or inventing replacement doctrine. |


## v1.3.1 decisions

| Decision ID | Date | Decision | Rationale | Impact |
|---|---|---|---|---|
| DEC-v1.3.1-Spec32-coverage-correction | 2026-05-27 | Correct Spec #32 coverage by adding Kiro spec `43-strategy-layer-runtime-surface`. | v1.2 and v1.3 matrices claimed coverage through governance/CISO dashboard specs, but baseline Spec #32 is a standalone mandatory build-blocking Strategy Layer Runtime Surface. | v1.3.1 adds the new Kiro spec and updates build sequence precedence before strategy-dependent features. |
| DEC-v1.3.1-audit-residuals-closed | 2026-05-27 | Close the residual lineage gaps identified by the v1.2 completeness audit and v1.3.1 lineage sweep. | Remaining partial/absent items from Master Proposition v5.0, Master Technical Specification v7.0 and V1_2_COMPLETENESS_AUDIT required explicit EARS coverage. | v1.3.1 appends source-cited lineage closure requirements to the affected Kiro specs and updates coverage evidence. |

## Spec 00 execution decisions

| Decision ID | Date | Decision | Rationale | Impact |
|---|---|---|---|---|
| DEC-spec00-planning-complete | 2026-05-27 | Spec 00 validation and planning tasks (1.1–1.4, 2.1–2.5) completed without code generation. | Tasks are documentation/planning only; no code is authorised before pack validation. Authority read order confirmed, scope-in/out aligned with BP-00, no prohibited dependencies introduced. | Planning artefact created at `.kiro/specs/00-programme-foundation/planning.md`. Implementation tasks (3.1–3.3) remain blocked. |
| DEC-spec00-no-mock-data-needed | 2026-05-27 | This domain requires no synthetic data fixtures. | Programme Foundation consumes source documents as its "data" — all already present as markdown files. | No fixture files created for this domain. |
| DEC-spec00-section3-blocked | 2026-05-27 | Tasks 3.1, 3.2, 3.3 remain blocked pending owner pack validation approval. | AGENTS.md and BP-00 both require owner approval before code generation. | No implementation code produced. |

## Spec 01 execution decisions

| Decision ID | Date | Decision | Rationale | Impact |
|---|---|---|---|---|
| DEC-spec01-owner-authorised | 2026-05-27 | Owner authorised application code for spec 01 (Application Shell, Navigation and Route Registry). | Owner explicitly directed: "Execute spec 01 end-to-end... Use the tech stack defined in tech.md (TypeScript, Next.js 15+, pnpm)." | Implementation proceeds with Next.js 15, TypeScript, pnpm. |
| DEC-spec01-registry-driven | 2026-05-27 | Route registry implemented as TypeScript data structure driving all navigation. | Spec #56 requires registry-driven runtime. Shell HTML is reference only. | All routes, menus, and visibility derive from `apps/web/src/registry/`. |
| DEC-spec01-three-boundary | 2026-05-27 | Three application boundaries implemented as separate route files. | Spec #47 and Commander doctrine require Operational App, Tenant Admin, and Commercial Control Plane as distinct surfaces. | Separate route files per boundary; no cross-boundary merging. |
| DEC-spec01-six-workspaces | 2026-05-27 | All six workspaces from Master Technical Specification §8.1 represented in route registry. | v1.2 Requirements 1-6 mandate workspace presence. | Executive Posture, Drift Operations, Control & Architecture, Identity & Asset Intelligence, Assurance & Audit, Transformation & M&A all have routes. |
| DEC-spec01-build-mode | 2026-05-27 | Build-mode visibility shows all committed routes with status badges. | Spec #56 §6 requires scaffold/build/stub routes visible in build mode. | `isRouteVisible()` function implements dual-mode logic. |
| DEC-spec01-no-code-test-updated | 2026-05-27 | Updated spec 00 no-code-before-validation test to reflect owner authorisation of apps/web/src. | Owner validated pack and authorised implementation. The test's original constraint is satisfied. | `apps/web/src` removed from blocked directories; `apps/api/src` and others remain blocked. |

## Spec 02 execution decisions

| Decision ID | Date | Decision | Rationale | Impact |
|---|---|---|---|---|
| DEC-spec02-owner-authorised | 2026-05-27 | Owner authorised application code for spec 02 (Design System and UI Component Catalogue). | Owner explicitly directed: "Execute spec 02 end-to-end... Use the tech stack defined in tech.md." | Implementation proceeds in packages/ui/. |
| DEC-spec02-token-system | 2026-05-27 | Design tokens implemented as TypeScript constants in packages/ui/src/tokens/. | Framework-agnostic approach allows tokens to be consumed by any rendering layer. Aligns with military-intelligence visual doctrine. | Colours, typography, spacing tokens all derive from Spec #11a and Spec #41. |
| DEC-spec02-accessibility | 2026-05-27 | All status and priority indicators use colour + text + shape (never colour alone). | v1.3 Requirement 24 mandates colour accessibility. | Status badges include text labels; priority indicators include shapes (◆▲●■○). |
| DEC-spec02-intensity-levels | 2026-05-27 | Three visual intensity levels implemented (Operational Standard, Tactical Analysis, Emergency Command). | Spec #41 §5 requires distinct visual intensity levels. | Emergency styling reserved for P0/zero-day only. |

## Spec 03 execution decisions

| Decision ID | Date | Decision | Rationale | Impact |
|---|---|---|---|---|
| DEC-spec03-owner-authorised | 2026-05-27 | Owner authorised seed data and canonical entity types for spec 03. | Owner explicitly directed: "Execute spec 03 end-to-end." | Canonical types in packages/contracts/, fixtures in packages/contracts/src/fixtures/. |
| DEC-spec03-canonical-entities | 2026-05-27 | Five canonical entities implemented: Asset, Identity, Case, Connector, AuditEvent. | Spec #05 §6.4 defines minimum Phase 0 entities. All include common fields, tenant context, and source provenance. | Foundation for all domain specs that consume canonical data. |
| DEC-spec03-connector-classes | 2026-05-27 | Connector fixtures use only classes A/B/C/D per Spec #61. | Doctrinal Assertion 11 prohibits inventing connector classes. | Four mock connectors cover all four classes. |
| DEC-spec03-no-credentials | 2026-05-27 | All fixtures use synthetic data with .example domains and (Mock) suffixes. | Domain Req 1 and v1.3 Req 19 prohibit real credentials. | No real customer data, secrets, or vendor identifiers in fixtures. |
| DEC-spec03-deterministic-ids | 2026-05-27 | Fixture IDs use seedId() function producing stable prefix-NNNN format. | v1.3 Req 20 requires repeatable fixture runs. | Tests are deterministic and reproducible. |

## Spec 04 execution decisions

| Decision ID | Date | Decision | Rationale | Impact |
|---|---|---|---|---|
| DEC-spec04-owner-authorised | 2026-05-27 | Owner authorised Drizzle ORM schema for spec 04 (Canonical Data Model). | Owner explicitly directed: "Execute spec 04 end-to-end... Use Drizzle ORM, Postgres 16+." | Persistence schema in packages/db/ using Drizzle ORM. |
| DEC-spec04-seven-classifications | 2026-05-27 | Data classification enum implements all 7 types from Master Technical Specification §11.1. | Configuration, State, Verdict, Detection, Case, Threat Intelligence, Audit. | Every table carries a data_classification column. |
| DEC-spec04-residency | 2026-05-27 | Data residency enum supports UK, US, EU per Master Technical Specification §11.2. | Tenant-selected residency boundary must be honoured. | Tenants table carries residency column; future enforcement at query layer. |
| DEC-spec04-builds-on-spec03 | 2026-05-27 | Drizzle schema mirrors canonical entity types from packages/contracts (spec 03). | Design.md specifies contracts and persistence are separate layers. | No duplication — schema tables match contract interfaces. |
| DEC-spec04-no-live-db | 2026-05-27 | No live database provisioned. Schema is definition-only. | Local-first development; no AWS resources during validation. | drizzle.config.ts points to localhost; no migrations run. |

## Spec 05 execution decisions

| Decision ID | Date | Decision | Rationale | Impact |
|---|---|---|---|---|
| DEC-spec05-owner-authorised | 2026-05-27 | Owner authorised Command Centre implementation for spec 05. | Owner explicitly directed: "Execute spec 05 end-to-end." | Command Centre page created at apps/web/src/app/page.tsx. |
| DEC-spec05-display-only | 2026-05-27 | Command Centre is a display surface consuming canonical seed data. No new entities invented. | Design.md and constraints specify: "consume canonical data and seed fixtures, do not invent new entities." | Page imports from packages/contracts/src/fixtures/ directly. |
| DEC-spec05-p0-prominent | 2026-05-27 | P0 zero-day banner displayed prominently at top of Command Centre. | Domain Requirement 4 requires P0 surfaced prominently without hiding normal posture. | Emergency styling (red border, glow) applied per Spec #41 P0 visual rule. |
| DEC-spec05-scaffold-labelled | 2026-05-27 | Scaffold metrics show "—" with SCAFFOLD badge. | Domain Requirement 3 requires mock/scaffold status labelled. Domain Requirement 6 requires source gaps shown. | Users see which domains are not yet populated. |

## Spec 43 execution decisions

| Decision ID | Date | Decision | Rationale | Impact |
|---|---|---|---|---|
| DEC-spec43-owner-authorised | 2026-05-27 | Owner authorised Strategy Layer Runtime Surface implementation for spec 43. | Owner explicitly directed: "Execute spec 43 end-to-end... Implement all twelve strategy surfaces." | Strategy types, fixtures, route, and tests created. |
| DEC-spec43-twelve-surfaces | 2026-05-27 | All twelve named strategy surfaces implemented as typed contracts with seed fixtures. | Spec #32 mandates exactly twelve surfaces. No non-baseline surfaces added. | SLA, Threshold, Automation Boundary, Routing, Posture, Mission Objective, Operational Tempo, Domain-Specific, Prioritisation Weight, Validation Window, Closure Gate, Reopening Trigger. |
| DEC-spec43-runtime-binding | 2026-05-27 | Six runtime binding events defined as typed contracts. | Spec #32 §Runtime Binding requires priority, route, validation, closure-gate, reopening, and Fusion Map recalculation triggers. | RuntimeBindingTrigger interface with affected scope and audit ref. Mock-data scope; real engines come later. |
| DEC-spec43-build-blocking | 2026-05-27 | Strategy Layer is now complete and unblocks case management, routing, validation/closure, reopening, and Fusion Map specs. | BUILD_SEQUENCE prerequisite chain item 7 satisfied. | Specs 06 (Case Management) and dependent features can now proceed. |
| DEC-spec43-automation-boundary | 2026-05-27 | Automation boundary strategy explicitly forbids manual-case-creation and manual-lifecycle-override. | Doctrinal Assertion 1 (closed-loop case model) requires system-owned lifecycle. | Seed fixture enforces this constraint. |

## v1.3.2 design language remediation

| Decision ID | Date | Decision | Rationale | Impact |
|---|---|---|---|---|
| DEC-v1.3.2-design-language-remediation | 2026-05-27 | v1.3.2 amendment to Spec 02 captures the authoritative visual language from the v2.6 baseline shell references. | Diagnostic comparison revealed significant divergence between current implementation and the baseline shell HTML (wrong gold, missing fonts, missing brand lockup, wrong content background, undersized chrome, missing sidebar groups). Shell references are visual authority per Spec #56 doctrine. | Spec 02 implementation, Spec 01 sidebar topology, and Spec 05 Command Centre will be re-implemented to honour these requirements. 18 new EARS requirements appended to Spec 02. |


## Phase 3 shell decisions

| Decision ID | Date | Decision | Rationale | Impact |
|---|---|---|---|---|
| DEC-v1.3.2-tenant-admin-shell-pending-reference | 2026-05-27 | Tenant Admin inherits Operational App visual language until a dedicated reference HTML is produced. | Spec #47 states Tenant Admin uses "SDR Operational App shell frame with admin-specific page navigation." No separate Tenant Admin shell HTML exists in the baseline. | Tenant Admin layout uses navy chrome, gold accent, and light content area. Brand wordmark adds "· TENANT ADMIN" suffix. Visual language is provisional. |


## Phase 5 sidebar interactivity

| Decision ID | Date | Decision | Rationale | Impact |
|---|---|---|---|---|
| DEC-v1.3.2-sidebar-interactivity | 2026-05-27 | Sidebar groups expand/collapse with localStorage persistence. Default: only active-route group expanded. User overrides persist. Control Plane sidebar remains flat single-level per v3 reference. | v11 shell reference shows expandable groups with carets. Interactivity improves navigation in a 18-group sidebar. | Operational App sidebar is interactive. Tenant Admin and Control Plane sidebars unchanged (flat). |


## DS-1.0 design system decisions

| Decision ID | Date | Decision | Rationale | Impact |
|---|---|---|---|---|
| DEC-design-system-v1 | 2026-05-28 | DESIGN_SYSTEM.md and the 8 mockups in docs/06_ui_build_reference/ are now authoritative, equal in standing to the shell reference HTMLs. DS-1.0 supersedes the v1.3.2 design remediation values where they conflict. | Owner produced a complete, pinned design system specification with high-fidelity mockups. Every value is resolved — nothing left to improvise. | All implementation must build to DS-1.0 exactly. Prior hardcoded values (14px, 18px, 26px, 28px, 68px top bar, 306px sidebar) are superseded. |
| DEC-ds1-vega-lite | 2026-05-28 | Vega-Lite is the primary charting library for Commander SDR. | Free/BSD licence, grammar-of-graphics approach suitable for heavy analytical use. Owner's considered choice. | All charts use Vega-Lite. ECharts permitted only where Vega-Lite genuinely cannot. Literal hex never in chart specs — reference --data-* tokens only. |
| DEC-ds1-lucide | 2026-05-28 | Lucide is the single icon library for Commander SDR. | Outline, monochrome, token-coloured. Consistent visual language. | No mixing icon libraries. Lucide only. Sizes: 16px inline, 20px nav, 24px feature. |
| DEC-ds1-shadcn-ui | 2026-05-28 | shadcn/ui primitives are the component base, restyled with Commander tokens. | Accessible, composable, unstyled primitives that can be fully themed. | Bespoke components reserved for signature surfaces only (Command Centre, Fusion Map, P0 War Room). |
| DEC-ds1-jetbrains-mono | 2026-05-28 | JetBrains Mono is the monospace font for telemetry, IDs, hashes, and all numeric values in Mission mode. | Tabular figures, clear distinction from body text, established developer font. | Mandatory for numeric KPI values in Mission mode. Used for CVE IDs, asset IDs, hashes throughout. |
| DEC-ds1-fusion-map-library-deferred | 2026-05-28 | Bespoke graph library for Fusion Map (Cytoscape or react-force-graph) is deferred until the Fusion Map spec is reached. | Fusion Map requires network graph capabilities that Vega-Lite cannot provide. Library selection deferred to avoid premature commitment. | Fusion Map spec will make the final library choice. |
| DEC-ds1-topbar-56px | 2026-05-28 | Top bar height is 56px (supersedes the v1.3.2 remediation's 68px from shell reference v11). | DS-1.0 §0 locked decision. Owner's new spec. | Implementation must update from 68px to 56px. |
| DEC-ds1-sidebar-248px-collapsible | 2026-05-28 | Sidebar is 248px expanded, collapsible to 68px icon rail (supersedes the v1.3.2 remediation's 306px static). | DS-1.0 §0 locked decision. Owner's new spec. Collapsible sidebar improves workspace real estate. | Implementation must update from 306px static to 248px + 68px rail with hamburger toggle. |


## Persona-scoped case visibility

| Decision ID | Date | Decision | Rationale | Impact |
|---|---|---|---|---|
| DEC-case-visibility-persona-scoped | 2026-05-28 | Case list surfaces (Case Queue, My Cases, Case Analytics) are persona/domain-scoped. A user sees only cases relevant to their persona's domain affinity and team assignment, unless they hold Administrative or CISO authority overlay. | Identified as an unassigned design gap during Phase C review. The data model supports it (caseType, team, owner) and Spec 19 defines personas, but no explicit EARS requirement existed for data-level filtering. Without explicit capture, this risks never being built. | Dependent on: auth/user context system + Spec 19 (persona model) + Spec 06 Phase D (routing engine with team affinity). Build target: Gate 3 (v1.3). Cross-referenced in both Spec 06 and Spec 19 requirements. |

## Performance Doctrine PD-1.0

| Decision ID | Date | Decision | Rationale | Impact |
|---|---|---|---|---|
| DEC-performance-doctrine-pd-1-0 | 2026-05-28 | Performance Doctrine PD-1.0 established as the third doctrinal pillar of Commander, alongside functional doctrine and design doctrine. Tier model (T1/T2/T3), four-layer separation (Application/Database/Data/Infrastructure), four-band scorecard discipline (Green/Yellow/Amber/Red) with explicit scoring formulas, workload-class separation principle, and enforcement via always-on steering, Hook 05, and updated prompt templates. Supersedes prior implicit performance assumptions. | Performance must be a first-class architectural concern from day one, not a retrofit. The doctrine ensures every layer has measurable targets, every task is evaluated against those targets, and regressions are caught before commit. | Source: docs/00_authority/PERFORMANCE_DOCTRINE.md and the four layer strategy documents (APPLICATION_LAYER_STRATEGY.md, DATABASE_LAYER_STRATEGY.md, DATA_LAYER_STRATEGY.md, INFRASTRUCTURE_LAYER_STRATEGY.md). Enforcement: .kiro/steering/performance-discipline.md (always-on), .kiro/hooks/05-performance-compliance.kiro.hook (postTaskExecution), updated PHASE_RUNNER/TWEAK_PASS/VERIFY_AND_CLOSE templates. |


## Shared page layout standard (PageContainer)

| Decision ID | Date | Decision | Rationale | Impact |
|---|---|---|---|---|
| DEC-pagecontainer-shared-standard | 2026-05-30 | Establish `apps/web/src/components/page-container.tsx` (`PageContainer`) as the single shared page-layout standard across all three application shells (Operational App, Tenant Admin, Commercial Control Plane). It encodes the Tabler `page-wrapper > page-header > container-xl` structure plus the scrollbar-gutter alignment that makes the top-nav, breadcrumb and body share one left edge. Shell `layout.tsx` files provide chrome only (sidebar + top bar + brand); they must NOT render their own page-header. Each page renders its header + body through `PageContainer`. | Owner directed that the whole app use one nav/page-spacing standard, with future pages wired in automatically and a small set of documented exceptions. Aligning the page structure removes the per-page drift that produced 6 divergent layouts. | The three-application boundary (Assertion 3) is preserved: distinct sidebars, top bars, brand lockups and route trees remain separate. ONLY the page-body structural spacing/alignment standard is shared. Enforcement via `.kiro/steering/page-layout-standard.md`. |
| DEC-pagecontainer-exceptions | 2026-05-30 | Documented exceptions that do NOT use `PageContainer`: (1) full-bleed emergency surfaces that force Mission mode (e.g. `/war-room/p0`, per DS-1.0 §9.3); (2) master-detail/right-rail views without a breadcrumb header (e.g. `/cases/:id`); (3) future authentication/onboarding screens (login, MFA, tenant-select) which render outside the operational shell entirely. | These surfaces have deliberately different chrome mandated by doctrine or UX, and forcing the standard page chrome would break them. | Exceptions are explicit and recorded so they are not treated as drift. Any new exception requires a decision record. |


## Command Centre build deferral

| Decision ID | Date | Decision | Rationale | Impact |
|---|---|---|---|---|
| DEC-command-centre-deferred | 2026-05-30 | The Command Centre full build is DEFERRED until after the functional pages are built. | The Command Centre is a summary/aggregation surface that visualises data produced by other pages and systems. Its metrics must map to real, agreed data points, which only exist once the underlying pages and data models are built. Building it now would mean matching to seeded guesses and rebuilding later. | Sequence agreed: (1) Build functional pages (cases, assets, vulnerabilities, identity, etc) — these define real data points; (2) Run a single data-point-to-metric mapping exercise across all pages (the "data point to metric schedule"); (3) Build the Command Centre last, as a summary of confirmed data points, using live-ready components. |
| DEC-command-centre-design-banked | 2026-05-30 | The full Command Centre build design is complete and saved for later execution. | The design is fully specified: live-ready component architecture, reusable component library (MetricCard, TrendArrow, ScrollableCard, TimeToggle, StatusBadge, DataTable, ProgressMeter, Gauge), vivid-semantic-colour/calm-chrome rule, two time toggles (row-1 and Remediation Performance), full widget layout matching the reference dashboard, Tabler classes + ApexCharts with --data-* tokens. When resumed, the data hook must be a thin presentation-layer adapter over the established data-access pattern, not a new data layer. | Full build prompt saved to `docs/design-system/command-centre-build-prompt.md` for retrieval when resumed. Status: DEFERRED — resume after functional pages built and data-point-to-metric schedule complete. |


## Governance audit findings (Run 2)

| Decision ID | Date | Decision | Rationale | Impact |
|---|---|---|---|---|
| DEC-source-pack-schedule-v1_9-superseded | 2026-05-30 | The source-pack specification schedule `docs/02_architecture/source_SDR_Specification_Schedule_and_Folder_Structure_v1_9.md` (and its immutable archive copy at `docs/99_source_archive/baseline_v2_6_2/docs/00_master/SDR_Specification_Schedule_and_Folder_Structure_v1_9.md`) is classified SUPERSEDED-ORPHAN within the active build layer. It is retained for lineage only and carries no authority. | The schedule cites Master Technical Specification v6.8 and Master Proposition v4.7 as sources; the active baseline is v7.0 / v5.0. Its v2.4 baseline addendum bounds it at Spec #48, which excludes the v2.6-introduced spec set (#57–#75 covering Security C2, OODA, Intelligence Layer, Attack Surface Framework, Connector Contract, Verdict Semantics, Operating Pictures, Direction Boards, Pre-Warned/Protected/Novel Classification, Inverse Discovery, Silent Defence Reporting, Drift Prioritisation, Internal Risk). No artifact in the active build layer (BUILD_SEQUENCE.md v1.3.1, BUILD_VERSION_ROADMAP.md v1.1, build-pack-discipline steering, BP-00 through BP-23) cites this schedule. Sourced from `docs/knowledge/GOVERNANCE_MAP.md` Finding 1. | The schedule must not be read or cited as build planning authority. The active copy at `docs/02_architecture/` should carry a header note pointing to this decision; the immutable archive copy is preserved unchanged per Doctrinal Assertion 7 (baseline immutability). The active build layer is defined as the v2.6-aligned stack (root roadmap, root sequence, build-pack-discipline steering, BP packs) — but per `DEC-build-plan-replacement` that stack is itself being retired, not reconciled. |
| DEC-translation-layer-structural-finding | 2026-05-30 | All 24 build packs (BP-00 through BP-23) source their implementation depth from the `.kiro/specs/` translation layer (folders 00–43). The translation layer is NOT authority and MUST NOT be cited as a source of build depth. Programme-wide MANDATE: at rebaseline, every build unit must cite the baseline spec #N from source authority at `docs/99_source_archive/baseline_v2_6_2/`. The locked sourcing-rule discipline (currently scoped to `docs/knowledge/`) is to be promulgated programme-wide. | All 24 BP packs declare "Owning Kiro specs" pointing exclusively at `.kiro/specs/00–43-…/`. None cites a specific baseline spec #N. The translation-layer contamination that triggered the System Rationalisation Phase 1-6 reset (e.g. `.kiro/specs/10-identity-intelligence/` was translated from baseline Spec #68, NOT baseline #10 = Platform Security and Hardening) is therefore still latent in the active build chain. When a build pack executes, it consumes the translation layer and inherits any misnumbering, mistranslation, or omission baked into it. Sourced from `docs/knowledge/GOVERNANCE_MAP.md` Finding 2. | At rebaseline: (1) Every build unit's "Owning specs" list must cite baseline spec #N (real filename and number, verified against the archive); the translation folder may be referenced as a working copy but is never authority. (2) A programme-wide sourcing rule must be promulgated, not just `docs/knowledge/SOURCING_RULE.md`. (3) Translation-layer governance must define when translations are regenerated, who validates, and what triggers re-translation. (4) Until those conditions are met, the active build chain is not safe to execute against — see `DEC-build-plan-replacement`. |
| DEC-build-plan-replacement | 2026-05-30 | The current build planning stack — `BUILD_SEQUENCE.md` v1.3.1, `BUILD_VERSION_ROADMAP.md` v1.1, `.kiro/steering/build-pack-discipline.md`, the BP-00–BP-23 layer at `docs/04_build_packs/`, and the implied sequence in `.kiro/specs/INDEX.md` — is RETIRED, not reconciled. A fresh build sequence will be derived from the clean knowledge graph (Step 2), data-first / UI-last, with each unit citing baseline spec #N from source authority. | The current stack is internally contradictory and structurally unsafe to execute against. Two material contradictions are documented in `docs/knowledge/GOVERNANCE_MAP.md`: (a) C-01 — BUILD_SEQUENCE doctrine #7 declares Strategy Layer Runtime Surface a build-blocking prerequisite for Case Management, yet BP-05 self-declares Case Management implemented while no BP exists for the Strategy Layer; (b) C-02 — Command Centre is simultaneously self-declared Implemented (BP-04) and DEFERRED (DEC-command-centre-deferred + DEC-002 in the conformance registry). Combined with the DEC-translation-layer-structural-finding source contamination, reconciliation would only patch a stack whose foundations are unsound. Replacement is the safer path. | The retired stack is preserved for lineage only (no edits, no deletions; an explicit RETIRED disposition is recorded in `docs/knowledge/SALVAGE_AND_REBASELINE_REGISTER.md`). Build-plan reconciliation (Run 3 / Part 2 of the audit) is cancelled as obsolete. The next step is the clean knowledge graph (Step 2), which will become the source for the rebaselined build sequence. The `.kiro/specs/` translation layer remains in place as a working-copy reference under the same RETIRED-but-preserved-for-lineage disposition; it is not the source for the rebaseline. |
