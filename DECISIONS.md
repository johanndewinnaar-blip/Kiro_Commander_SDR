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
