# Spec 06 Phase E — Proposed Implementation Plan

**Status:** Planning pass (Phase E not fully specified in repository)  
**Date:** 2026-05-28  
**Prerequisites:** D1 (transition engine), D2 (validation window), D3 (closure gates/reopening), D4 (assignment engine), D5 (lifecycle UI)

## Phase E Objective

Implement the three Phase E capabilities defined in `.kiro/specs/06-case-management/planning.md`:

1. **Evidence Pack Model & Evaluator** (E1) — Formalize the evidence pack data structure, binding evidence to cases with source signal, affected entity, and timestamp. Implement an evidence sufficiency evaluator that determines whether a case has adequate evidence for progression.

2. **Auto-Healing Condition Evaluator** (E2) — Implement logic that validates upstream state before reducing case risk or proposing closure (Domain Requirement 17). The evaluator checks whether the condition that created the case has been resolved at source.

3. **Communication Thread Model** (E3) — Define the communication record structure that preserves stakeholder communication as part of the case lifecycle (Domain Requirement 18). This is a data model and read-only display only — no live email integration (that belongs to Spec 25 / BP-16 at v1.3).

## Dependency on D1–D5

| Phase E Sub-phase | Depends on |
|-------------------|------------|
| E1 — Evidence Pack | D1 (transition records reference evidence), D3 (closure gates check evidence sufficiency) |
| E2 — Auto-Healing | D2 (validation window — auto-healing triggers validation), D3 (closure gates — auto-healing can satisfy remediation-verified gate) |
| E3 — Communication | D4 (assignment — communication thread references owner/team), D5 (lifecycle UI — communication displayed on case detail) |

## Files Likely to Be Touched

### New files (pure logic layer — E1, E2)
- `packages/contracts/src/entities/evidence-pack.ts` — Evidence pack entity type
- `packages/contracts/src/entities/communication-record.ts` — Communication record entity type
- `packages/contracts/src/resolvers/evidence-sufficiency-evaluator.ts` — Evidence sufficiency logic
- `packages/contracts/src/resolvers/auto-healing-evaluator.ts` — Auto-healing condition evaluator
- `packages/contracts/src/fixtures/seed-evidence.ts` — Seed evidence pack data
- `packages/contracts/src/fixtures/seed-communications.ts` — Seed communication records

### Modified files
- `packages/contracts/src/entities/index.ts` — Export new entities
- `packages/contracts/src/resolvers/index.ts` — Export new evaluators
- `packages/contracts/src/fixtures/index.ts` — Export new seed data
- `apps/web/src/app/cases/[id]/page.tsx` — Add evidence pack detail and communication thread sections (read-only)

### New test file
- `tests/06-case-management/phase-e1-evidence-pack.test.ts`
- `tests/06-case-management/phase-e2-auto-healing.test.ts`
- `tests/06-case-management/phase-e3-communication-ui.test.ts`

## Evaluator/Data Dependencies

| Evaluator | Strategy consumed | Input | Output |
|-----------|-------------------|-------|--------|
| Evidence Sufficiency | None (rule-based on evidence count and type coverage) | Evidence pack records for a case | `{ sufficient: boolean, missingTypes: string[], reason: string }` |
| Auto-Healing | Validation Window (D2), Closure Gate (D3) | Case record, upstream signal state | `{ healed: boolean, validatedAt: string, upstreamState: string, canReduceRisk: boolean }` |

## UI Surfaces Impacted

- `/cases/:id` — Case Detail page gains:
  - Enhanced evidence pack section (currently mock, will use real seed data)
  - Auto-healing status indicator (for cases where upstream condition resolved)
  - Communication thread timeline (read-only, system-owned records)
- No new routes created
- No new pages created

## Tests Required

### E1 — Evidence Pack
- Evidence pack entity shape validation
- Evidence binding to case, source signal, affected entity
- Evidence sufficiency evaluator: sufficient when all required types present
- Evidence sufficiency evaluator: insufficient when types missing
- Seed evidence data covers multiple cases
- No manual evidence creation path

### E2 — Auto-Healing
- Auto-healing evaluator: healed when upstream state resolved
- Auto-healing evaluator: not healed when upstream still active
- Auto-healing validates upstream before reducing risk (Domain Req 17)
- Auto-healing integrates with closure gate (remediation-verified)
- Strategy consumption proof (validation window timing)

### E3 — Communication UI
- Communication records display on case detail (read-only)
- No send/reply buttons (live email is Spec 25 scope)
- Communication thread preserves actor, timestamp, content reference
- Both Standard and Mission modes
- Token-only styling

## Risks

1. **Communication lifecycle overlap with Spec 25** — Phase E3 must define the data model only, not implement live email. Live email integration belongs to Spec 25 / BP-16 (v1.3 target). Risk: scope creep into email sending.
2. **Auto-healing requires real connector state** — In seed-data mode, auto-healing can only be demonstrated with mock upstream state. Risk: the evaluator may need redesign when real connectors arrive in Phase 2.
3. **Evidence sufficiency rules not defined in strategy layer** — Unlike D1-D4 where all values come from Spec 43 strategies, evidence sufficiency rules may need a new strategy surface or may be case-type-specific. Risk: introducing hardcoded rules. Mitigation: make evidence requirements configurable via a parameter object (injectable like strategies).

## No-Go Rules

- No live email sending or receiving
- No real connector calls for upstream state validation
- No manual evidence creation/edit/delete paths
- No manual communication creation paths (system-owned records only)
- No SOC write actions
- No hardcoded values for evidence requirements
- No authentication/user context changes
- No AWS resource creation
- No Commander AI runtime changes
- No production integrations
- Closed-loop case model must remain intact
- Surface attribution must be preserved on all records

## Recommended Execution Order

1. **E1** — Evidence Pack (pure logic + seed data) — smallest, most self-contained
2. **E2** — Auto-Healing Evaluator (pure logic, depends on E1 for evidence state)
3. **E3** — Communication Thread (data model + read-only UI display)

## Decision Required

Phase E is partially specified. The owner should confirm:
- Whether all three sub-phases (E1, E2, E3) should proceed now
- Whether evidence sufficiency rules should be strategy-driven (new strategy surface) or parameter-driven (injected config)
- Whether communication records should be displayed on the existing Case Detail page or deferred entirely to Spec 25

---

**Prepared by:** Kiro (Phase E planning pass)  
**Awaiting:** Owner confirmation before implementation
