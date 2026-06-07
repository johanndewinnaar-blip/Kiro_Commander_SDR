# Commander SDR — Governance Knowledge Source

**Purpose:** Single-document reference for how the entire build governance system operates. Self-auditing, linked to source files, and actionable. Living document.
**Last updated:** 2026-06-07

---

## SECTION 1 — BUILD GOVERNANCE OVERVIEW

### 1.1 Authority Chain
The precedence model determines what wins when documents conflict:
1. Baseline Source Specs (75 child specs in docs/99_source_archive/baseline_v2_6_2/) — ultimate authority
2. AGENTS.md (root) — programme-level directives
3. docs/00_authority/AUTHORITY_MODEL.md — 8-tier precedence stack
4. .kiro/steering/ files (16 files, inclusion: always) — persistent workspace guidance
5. .kiro/specs/ — translation layer (NOT authority for knowledge/build work per SOURCING_RULE.md)
6. Build packs (docs/04_build_packs/) — per-domain execution slices (historical, mostly superseded)

Links:
- .kiro/steering/authority-and-precedence.md
- docs/00_authority/AUTHORITY_MODEL.md
- AGENTS.md

### 1.2 Build Sequencing
docs/knowledge/REBASELINED_BUILD_SEQUENCE.md is a queryable readiness state machine:
- BLOCKED: unresolved dependencies or open ARCH-DEBT → not buildable
- READY: all deps DONE + all chain debt RESOLVED → buildable now
- DONE: built and committed
- PARKED: deferred to Phase 2/3

Recompute rule: when a unit flips DONE or debt flips RESOLVED, all dependents recompute status mechanically.

Links:
- docs/knowledge/REBASELINED_BUILD_SEQUENCE.md
- .kiro/steering/execution-discipline.md §Build-readiness state machine

### 1.3 Build Execution
Conveyor pattern: tight prompt → one concern per commit → commit every 3 pages.
Scoped-read discipline: large governance docs read by section/grep, never wholesale.
READY unit lifecycle: implement → test → governance check → closure review → commit → push.

Links:
- .kiro/steering/execution-discipline.md

---

## SECTION 2 — DESIGN TO SPEC TO DELIVERY CHAIN

### 2.1 The Full Traceability Chain

```
Baseline Source Specs (75 child specs — ultimate authority)
        ↓
SYSTEM_KNOWLEDGE_GRAPH.md (what Commander IS — domains, layers, relationships)
        ↓
DOMAIN_REGISTER.md (46+ domains indexed)
        ↓
RELATIONSHIP_MAP.md (cross-domain flows — drives cross-entity rendering on pages)
        ↓
USE_CASE_REGISTER.md (what users DO — UC-001 to UC-212)
        ↓
ARCHITECTURAL_DEBT_REGISTER.md [GATE — blocks if open debt]
        ↓
DATA_DICTIONARY.md [HARD GATE — entity fully registered before code]
        ↓
Entity code (packages/contracts/src/entities/)
        ↓
Engine code (packages/contracts/src/engines/)
        ↓
Page code (apps/web/src/app/) — renders ALL fields + cross-entity relationships
        ↓
PAGE_SCHEDULE.md (route registered, UC linked)
        ↓
AICAP_REGISTER.md (AI enhancement markers — Phase 2+)
```

### 2.2 Gate Points
| Gate | Type | What it blocks | Resolution |
|---|---|---|---|
| ARCH-DEBT | Blocking gate | Entity/engine with open structural debt | Resolve the debt item |
| DATA_DICTIONARY | Hard gate | No entity code without full dictionary registration | Register entity first |
| RELATIONSHIP_MAP | Rendering gate | Multi-entity pages need documented relationships | Document the relationship first |

### 2.3 Parallel Authorities
- DECISIONS.md — overrides chain direction via design decisions
- REBASELINED_BUILD_SEQUENCE.md — controls build order/sequencing

Links:
- .kiro/steering/traceability-chain.md
- docs/knowledge/ARCHITECTURAL_DEBT_REGISTER.md
- docs/knowledge/DATA_DICTIONARY.md
- docs/knowledge/RELATIONSHIP_MAP.md

---

## SECTION 3 — DATA LINEAGE (specs → entities → pages)

### 3.1 Entity Lifecycle
Spec requirement → UC registered → DATA_DICTIONARY entry → Entity .ts → Fixture seed-*.ts → Engine .ts → Page page.tsx

Current counts:
- Entities: 82+ (packages/contracts/src/entities/)
- Fixtures: 77+ (packages/contracts/src/fixtures/)
- Engines: 38+ (packages/contracts/src/engines/)
- Pages: 110+ (apps/web/src/app/**/page.tsx)

### 3.2 Page Data Rendering
Pages MUST render:
- All entity fields relevant to their use case(s)
- Cross-entity relationships from RELATIONSHIP_MAP (drill paths, linked-data panels)
- Severity/status using primitiveSignal semantic colours
- AICAP marker comment (catalogued for Phase 2 AI enhancement)

Pattern: 'use client' → PageContainer → seed import → 4 KPI tiles → Tabler table → AICAP comment

Links:
- docs/00_authority/PAGE_DATA_COVERAGE_AUDIT.md
- docs/00_authority/PAGE_SCHEDULE.md

### 3.3 System-First Doctrine (SFD-1.0)
| Mode | % | Meaning |
|---|---|---|
| SYSTEM | ~87% | Deterministic, rule-driven. No AI. |
| AI-ENHANCED | ~9% | System delivers data. AI adds explanation/recommendation. |
| AI-ONLY | ~4% | Only AI can deliver (NL summarisation, creative drafting). |

AICAP markers (77 across 55 pages) catalogue where AI wires in during Phase 2+.

Links:
- .kiro/steering/system-first-doctrine.md
- docs/00_authority/AICAP_REGISTER.md

---

## SECTION 4 — TESTING AND ADHERENCE

### 4.1 Conformance Registry
40+ assertions across 8 categories:
- DSC-001–012: Design system contract (PageContainer, Tabler, square corners, semantic colour)
- TOK-001–003: Token system (three-layer, no hex in charts, primitive immutability)
- PERF-001–005: Performance (no Red units, workload class, tier discipline)
- DOC-001–008: Commander doctrine (closed-loop, P0, three-app boundary, four-stream)
- SEC-001–006: Secure coding (no secrets, input validation, auth, parameterised queries)
- RBAC-001–004: Tenant isolation and RBAC (backend enforcement, audit-first)
- ARCH-001–009: Architecture (local-first, no vendor APIs, data dictionary, readiness machine)
- DEC-001–002: Decision records (PageContainer exceptions, Command Centre scope)

Link: .kiro/testing/conformance-registry.md

### 4.2 Core Testing Pipeline
Continuous run-through (fire-and-walk-away):
1. Pre-run: load baseline, debt closure loop, init run log + score tracking
2. Per-unit: Functional → Conformance → Debt Typing → Auto-Fix (4 attempts) → Commit/Halt
3. Post-run: finalize log, update score register, save debt register, output summary

Trigger commands:
- `run core testing [scope]` — full pipeline on scope
- `test my last build` — pipeline on last commit
- `show audit scores [layer]` — current scores
- `show score history [layer]` — trend
- `show last test run` — most recent log
- `show debt register [scope]` — query debt

Links:
- .kiro/testing/core-testing-pipeline.md
- .kiro/steering/core-testing-commands.md

### 4.3 Debt Management
| Type | Source | Auto-fix? | Blocks? |
|---|---|---|---|
| Regression | New failure (was passing) | Yes (4 attempts) | Yes — halt unit |
| Quick debt | Pre-existing, local fix | Yes (4 attempts) | No — register if fails |
| Structural debt | Pre-existing, needs larger work | No | No — register with scope |
| Architectural debt | Build-blocking structural gap | No | Yes — blocks READY status |

Registers:
- docs/00_authority/debt-register.md — conformance debt
- docs/knowledge/ARCHITECTURAL_DEBT_REGISTER.md — structural/build debt

---

## SECTION 5 — ENFORCEMENT & AUTOMATION

### 5.1 Automated (runs without human action)
| Point | Checks | Trigger |
|---|---|---|
| .githooks/pre-commit CHECK 1 | No translation-layer citations | Every commit |
| .githooks/pre-commit CHECK 2 | No derived source-copy citations | Every commit |
| .githooks/pre-commit CHECK 3 | No hardcoded secrets (SEC-001) | Every commit |
| .githooks/pre-commit CHECK 4 | UC-XXX in commit message (warning) | Every commit with new entity/engine/page |
| .githooks/pre-commit CHECK 5 | DATA_DICTIONARY co-staging (warning) | Every commit with new entity |
| Hook 01 — Authority Preflight | Scope/authority check | Every prompt |
| Hook 02 — Post-Task Review | Compliance checklist | Post every task |
| Hook 03 — Docs Change Control | Authority doc edits | On file edit |
| Hook 04 — Doctrinal Assertions | 11 doctrine checks | Post every task |
| Hook 05 — Performance Compliance | No Red regressions | Post every task |
| Governance runner | ARCH-005 through ARCH-009 | Pipeline + pre-commit |

Links:
- .githooks/pre-commit
- .kiro/hooks/ (5 enabled hooks)

### 5.2 Steering-Enforced (Kiro reads and follows)
| Rule | File |
|---|---|
| Traceability chain | .kiro/steering/traceability-chain.md |
| Chain maintenance (same-commit) | .kiro/steering/traceability-chain.md §Chain Maintenance Rules |
| System-First Doctrine | .kiro/steering/system-first-doctrine.md |
| Execution discipline | .kiro/steering/execution-discipline.md |
| Design system contract | .kiro/steering/design-system-contract.md |
| Page layout standard | .kiro/steering/page-layout-standard.md |
| Performance discipline | .kiro/steering/performance-discipline.md |
| Commander doctrine (11 assertions) | .kiro/steering/commander-doctrine.md |
| Commander v2.6 doctrine | .kiro/steering/commander-v2-6-doctrine.md |
| Security and testing | .kiro/steering/security-and-testing.md |
| AI grounding | .kiro/steering/ai-grounding.md |
| Product framing | .kiro/steering/product.md |
| Tech posture | .kiro/steering/tech.md |
| AWS alignment | .kiro/steering/aws-alignment.md |
| Build pack discipline | .kiro/steering/build-pack-discipline.md |
| UI design system | .kiro/steering/ui-design-system.md |

### 5.3 Manual Discipline (relies on prompt inclusion)
| Gap | Risk | Mitigation |
|---|---|---|
| RELATIONSHIP_MAP update | Cross-entity relationships undocumented | Chain maintenance rule (same-commit) |
| SYSTEM_KNOWLEDGE_GRAPH update | New domains not registered | Chain maintenance rule |
| Conformance sweep not triggered | Full registry not validated during dev | Run `run core testing all` before testing phase |

---

## SECTION 6 — DEBT ACCRUAL & RESOLUTION

### 6.1 Debt Types
| Type | How created | How resolved |
|---|---|---|
| Conformance (quick) | Pipeline finds violation | Auto-fix (4 attempts) or manual |
| Conformance (structural) | Pipeline finds violation in unmigrated unit | Dedicated work package |
| Architectural (build-blocking) | Missing entity, structural gap | Create entity/resolve gap → unit flips READY |
| Traceability | Artefact built without chain linkage | Register UC, add references |
| Placeholder | Page "Not Yet Implemented" | Create entity + render |
| Governance | Chain maintenance violated | Update skipped doc |

### 6.2 Debt Registers
| Register | Location | Status |
|---|---|---|
| Conformance debt | docs/00_authority/debt-register.md | Active |
| Architectural debt | docs/knowledge/ARCHITECTURAL_DEBT_REGISTER.md | Active |
| Traceability debt | docs/00_authority/TRACEABILITY_DEBT.md | ALL RESOLVED |
| Placeholder debt | docs/00_authority/PLACEHOLDER_DEBT_REGISTER.md | ALL RESOLVED |
| Chain compliance | docs/00_authority/CHAIN_COMPLIANCE_AUDIT.md | 3 resolved, 5 Phase 2 deferred |

### 6.3 Debt Automation
- Debt closure loop runs on every pipeline invocation
- Auto-resolves items when violations clear
- Resolved items stay in register (audit trail preserved)

---

## SECTION 7 — BUILD QUEUE & STATUS

### 7.1 Current State
- Pages: 110+
- Entities: 82+
- Engines: 38+
- Fixtures: 77+
- Use cases: 212 (UC-001 to UC-212)
- Domains: 46
- TSC errors: 0
- All 10 specs (34-43): RESOLVED
- All placeholder debt: RESOLVED
- All traceability debt: RESOLVED
- Full chain enforced with maintenance rules

### 7.2 PARKED Units (Phase 2/3)
| Unit | Reason |
|---|---|
| 39 | Real Connector Readiness — live vendor APIs |
| 41 | AWS Alignment — evaluation lane |
| 47 | DevOps — Local/AWS Alignment (Phase 3) |
| 48 | Platform Security Hardening (Phase 3) |
| 49 | Phase 3 Pilot & Production Hardening |

---

## SECTION 8 — RECOMMENDATIONS

### 8.1 Effectiveness
| # | Recommendation | Priority |
|---|---|---|
| 1 | Convert CHECK 4+5 warnings to FAIL after conformance sweep confirms clean state | HIGH |
| 2 | Add CHECK 6 — RELATIONSHIP_MAP co-staging for multi-entity pages | HIGH |
| 3 | Add CHECK 7 — PAGE_SCHEDULE co-staging for new pages | HIGH |
| 4 | Run full conformance sweep (`run core testing all`) to establish baseline | HIGH |

### 8.2 Efficiency
| # | Recommendation | Priority |
|---|---|---|
| 1 | Consolidate 3 authority-precedence statements into one | LOW |
| 2 | Retire superseded root-level build docs (BUILD_SEQUENCE.md, BUILD_VERSION_ROADMAP.md) — superseded by REBASELINED_BUILD_SEQUENCE | MEDIUM |
| 3 | Consolidate overlapping UI governance (DS-1.0 vs design-system-contract vs ui-design-system) | MEDIUM |

### 8.3 Completeness
| # | Recommendation | Priority |
|---|---|---|
| 1 | Within-layer precedence rule (when two steering files conflict) | LOW |
| 2 | Artifact lifecycle policy (retirement procedure for superseded docs) | LOW |
| 3 | Programme-wide sourcing rule (extend SOURCING_RULE beyond knowledge workspace) | MEDIUM |

### 8.4 Accuracy & Validity
| # | Recommendation | Priority |
|---|---|---|
| 1 | Full conformance sweep validates all assertions against all pages | HIGH |
| 2 | RELATIONSHIP_MAP completeness check (are all entity cross-refs documented?) | MEDIUM |
| 3 | DATA_DICTIONARY field-count validation vs actual TypeScript interfaces | MEDIUM |

### 8.5 Automation
| # | Recommendation | Priority |
|---|---|---|
| 1 | Convert warnings to FAIL after clean conformance sweep | HIGH |
| 2 | Add SYSTEM_KNOWLEDGE_GRAPH co-staging check for new entity domains | MEDIUM |
| 3 | Automated DATA_DICTIONARY field-count validation | MEDIUM |
| 4 | CI/CD integration (run conformance on PR) — Phase 2 | LOW |

---

## SECTION 9 — FILE & FOLDER REFERENCE

### Steering Files (.kiro/steering/) — 16+ files
| File | Purpose |
|---|---|
| traceability-chain.md | Full chain + gates + maintenance rules |
| system-first-doctrine.md | SFD-1.0 delivery mode split |
| execution-discipline.md | Build execution rules, state machine, closure review |
| core-testing-commands.md | 6 pipeline trigger commands |
| security-and-testing.md | Security expectations + testing mandates |
| commander-doctrine.md | 11 doctrinal assertions |
| commander-v2-6-doctrine.md | v2.6 spec-pinned doctrine |
| design-system-contract.md | Tabler-class build rulebook |
| page-layout-standard.md | PageContainer contract |
| performance-discipline.md | PD-1.0 standing rules |
| authority-and-precedence.md | 6-tier authority order |
| build-pack-discipline.md | No-MVP, prerequisite chain |
| ai-grounding.md | Commander AI grounding rules |
| aws-alignment.md | AWS evaluation areas |
| product.md | Product framing constraints |
| tech.md | Technology posture |
| structure.md | Folder structure rules |
| ui-design-system.md | Visual direction |

### Testing Files (.kiro/testing/)
| File | Purpose |
|---|---|
| core-testing-pipeline.md | Pipeline definition (5-stage conveyor) |
| conformance-registry.md | 40+ assertions (single truth) |
| scorecard-template.md | Layer scorecard template |

### Hooks
| Hook | Trigger | Purpose |
|---|---|---|
| .githooks/pre-commit | git commit | 5 checks (citations, secrets, UC, DATA_DICT) |
| authority-preflight-hook.kiro.hook | promptSubmit | Scope/authority gate |
| post-task-review-hook.kiro.hook | postTaskExecution | Compliance checklist |
| docs-change-control-hook.kiro.hook | fileEdited | Authority doc protection |
| doctrinal-assertions-check.kiro.hook | postTaskExecution | 11 doctrine assertions |
| 05-performance-compliance.kiro.hook | postTaskExecution | No Red regressions |

### Authority Documents (docs/00_authority/)
Key files: USE_CASE_REGISTER.md, PAGE_SCHEDULE.md, AUTHORITY_MODEL.md, debt-register.md, score-register.md, PAGE_DATA_COVERAGE_AUDIT.md, CHAIN_COMPLIANCE_AUDIT.md, AICAP_REGISTER.md, SPEC_GAP_AUDIT.md

### Knowledge Documents (docs/knowledge/)
Key files: SYSTEM_KNOWLEDGE_GRAPH.md, DOMAIN_REGISTER.md, RELATIONSHIP_MAP.md, DATA_DICTIONARY.md, ARCHITECTURAL_DEBT_REGISTER.md, REBASELINED_BUILD_SEQUENCE.md, GOVERNANCE_MAP.md, GOVERNANCE_BUILD_INVENTORY.md

### Code Locations
| Location | Contents | Count |
|---|---|---|
| packages/contracts/src/entities/ | Canonical entity interfaces | 82+ |
| packages/contracts/src/engines/ | Processing logic | 38+ |
| packages/contracts/src/fixtures/ | Seed data | 77+ |
| apps/web/src/app/ | Page components | 110+ |
| apps/api/ | Backend API (scaffold only) | 0 |

---

*End of Governance Knowledge Source.*
