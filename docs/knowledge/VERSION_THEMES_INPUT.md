# Version Themes — Conceptual Input for Rebaselined Sequence

**Status:** Conceptual input only. Not authority over the rebaselined sequence; reference material for sequencing thinking.
**Captured:** 30 May 2026
**Source:** `BUILD_VERSION_ROADMAP.md` v1.1 (root) — RETIRED per `DEC-build-plan-replacement` (DECISIONS.md, 2026-05-30).
**Purpose:** Preserve the conceptual layering that the retired roadmap encoded so it can inform — but not constrain — the rebaselined build sequence derived from the clean knowledge graph.

---

## Why this is captured here

`BUILD_VERSION_ROADMAP.md` v1.1 is RETIRED as an active build authority because it operated against the contaminated build stack. But the **conceptual sequencing it encoded** — what depends on what, what enables what, what must come before what — is independent of the contamination and useful as input when the rebaselined sequence is derived.

These themes are conceptual scaffolding, not the new sequence. The rebaselined sequence will be **data-first / UI-last**, sourced from baseline spec #N citations, and may rearrange or merge what the version-themed roadmap separated. Where the data-first / UI-last principle conflicts with the version-themed ordering below, the principle wins.

---

## Version themes (verbatim from the retired roadmap)

| Version | Theme | Primary outcomes | Hard exclusions |
|---|---|---|---|
| Product v1.1 | Foundation and first command surface | Shell, navigation, route registry, page schedule, design system, canonical contracts, seed data, Command Centre, closed-loop case lifecycle skeleton, Commander AI core grounding, local-first workspace. | No live AWS, no real vendor APIs, no billing. |
| Product v1.2 | Core domain surfaces | Vulnerability, exposure, asset, identity, control coverage, architecture/topology, CISO dashboard, governance reporting, mock data. | No real connector writes. |
| Product v1.3 | Closed-loop control and admin | Connector framework, mock connectors, rules, editable baselines, tenant admin, RBAC, audit, case communications. | Push remains dry-run. |
| Product v1.4 | Security C2 and OODA | Security C2, OODA views, Direction Boards, internal/external operating pictures, P0 war-room, silent defence reporting. | No incident-response replacement or SOC writes. |
| Product v1.5 | AWS/Bedrock/AgentCore evaluation | AWS target architecture notes, Bedrock/AgentCore candidate evaluation lane, Commander AI runtime criteria, local mock agent runtime, Phase 2 readiness. | No live AWS resources by default; AgentCore not selected by default. |
| Product v1.6 | Phase 2 connector-readiness build | Connector test harness, credential model, vendor API scope validation, synthetic-to-real data transition. | Production operations blocked. |
| Product v1.7 | Real connector pilot preparation | Limited read-only test connectors, tenant admin hardening, data governance and observability. | No broad customer pilot. |
| Product v2.0 | Pilot candidate | Pilot environment, hardening, runbooks, security controls, support process. | Billing only if separately approved. |
| Product v3.0 | Production candidate | Production readiness, scale, resilience, compliance, commercial controls. | None once approved. |

## Principle (verbatim)

> The product journey is complete from day one, but delivered through versioned capability bands. Scope is not deferred out of existence; it is committed into the repo and staged for build control.

## Commander AI commitment (verbatim)

> Commander AI is core from product v1.1 onward and is not optional later scope.

## Conceptual layering distilled

The retired roadmap encoded five sequencing arcs the rebaselined sequence will need to address (under whatever new structure):

1. **Foundation arc** — shell, navigation, design system, canonical data contracts, seed data, case lifecycle skeleton, Commander AI grounding.
2. **Core domain arc** — the operational intelligence surfaces (vulnerability, exposure, asset, identity, control coverage, architecture/topology) plus the executive surfaces (CISO dashboard, governance reporting).
3. **Closed-loop control arc** — connectors (mock first, real later), rules engine, editable baselines, tenant admin, RBAC, audit, case communications.
4. **Security C2 / OODA arc** — Security C2, OODA views, Direction Boards, internal/external operating pictures, P0 war-room, silent defence reporting.
5. **Cloud / Phase 2 / Phase 3 arc** — AWS evaluation, real-connector readiness, pilot preparation, production hardening.

These arcs are **input** to the rebaselined sequence. The new sequence may:

- Rename, merge, split, or reorder arcs.
- Replace the version-band granularity with data-readiness gates (data-first / UI-last).
- Promote, defer, or reclassify outcomes that were lumped into a single version theme.
- Drop themes that turn out to be artifacts of the version-banding rather than real dependencies.

## What this document is NOT

- **Not authority.** Replaced by the future rebaselined build sequence.
- **Not a sequence.** The rebaselined sequence has not yet been derived; this is reference material for the derivation.
- **Not a contract.** Hard exclusions listed above (no live AWS, no real APIs, no billing, push dry-run, etc.) survive as constraints regardless of this document — they live in `AGENTS.md`, the steering files, the hard stops, and forthcoming rebaselined authority.
- **Not a coverage matrix.** A separate source-derived coverage matrix is to be created at rebaseline (see `SALVAGE_AND_REBASELINE_REGISTER.md` Section E).

## Related authority

- `DEC-build-plan-replacement` — retires the active build stack including the source roadmap.
- `DEC-translation-layer-structural-finding` — mandates baseline-spec citation at rebaseline.
- `docs/knowledge/SALVAGE_AND_REBASELINE_REGISTER.md` — register of dispositions across all assets.
- `docs/knowledge/SOURCING_RULE.md` — locked workspace sourcing rule under which the rebaselined sequence will be derived.
- `BUILD_VERSION_ROADMAP.md` (root) — retired; preserved for lineage; this file captures its conceptual content.
