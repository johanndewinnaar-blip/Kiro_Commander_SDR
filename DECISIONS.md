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
