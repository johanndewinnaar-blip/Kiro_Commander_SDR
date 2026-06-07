# Commander SDR — Domain Register

**Status:** First clean derivation under the locked `SOURCING_RULE.md`. Projects from `SYSTEM_KNOWLEDGE_GRAPH.md` (§ references in this register point to that file) and the baseline source citations beneath it.
**Sourced exclusively from:** `docs/99_source_archive/baseline_v2_6_2/` (masters + child specs #01–#75), via the verified knowledge graph.
**Excluded from sourcing:** the Kiro translation layer (spec folders 00–43) — not authority for knowledge work.

This register decomposes Commander SDR into **operational domains**. A domain is a unit of cohesive responsibility with: a purpose, owning baseline spec(s), primary and supporting entities, owned functions, upstream dependencies (what it consumes from), and downstream consumers (what consumes from it). Each domain corresponds to one or more layers/regions of the seven-layer architecture (per `SYSTEM_KNOWLEDGE_GRAPH.md` §2).

GAPs flagged in `SYSTEM_KNOWLEDGE_GRAPH.md` §20 are carried through here unchanged — they remain unresolved at this projection step and are noted per-domain where relevant.

Domain ordering follows the layer flow: foundation → connector → normalisation → engines → intelligence → case lifecycle → routing/strategy → OODA → surfaces → cross-cutting (security, governance, configuration, AI, control plane).

---

## Index of domains

| # | Domain | Owning spec(s) (primary) | Layer (KG §2) |
|---:|---|---|---|
| D-01 | Programme Foundation & Authority | Authority and Precedence v2.6; AGENTS.md (programme); Master Proposition v5.0; Master Technical Specification v7.0 | Cross-cutting |
| D-02 | Connector Framework | Spec #61 v2.6; Spec #09; Spec #05 v1.5; Spec #24 | Connector Layer |
| D-03 | Normalisation & Canonical Entity Model | Spec #12; Spec #62 v2.6 (verdict semantics processing); Spec #46 (canonical glossary) | Normalisation Layer |
| D-04 | Drift & Rule Engine | Spec #07 (file content); Spec #51 (Rule, Model and Decision Governance Surface) | Engine Layer |
| D-05 | Vulnerability Management | (See GAP note) | Engine + Case |
| D-06 | Exposure Management | (See GAP note) | Engine + Case |
| D-07 | Identity Intelligence | Spec #18; Spec #68 (surface) | Engine + Intelligence + Surface |
| D-08 | Asset Intelligence | Spec #69 (surface) | Engine + Intelligence + Surface |
| D-09 | Architecture Intelligence | Spec #22 | Engine Layer |
| D-10 | Coverage / Tool Health | Spec #09 (tool-health rule); Spec #23 (Security Tool Intelligence) | Engine Layer |
| D-11 | Trust Boundary & Third-Party Intelligence | Spec #25; Spec #27 (Shared Responsibility) | Engine Layer |
| D-12 | BAS (Breach & Attack Simulation) | Spec #21 | Engine + Validation |
| D-13 | Pre-Warned / Protected / Novel Classification (v2.6) | Spec #71 | Intelligence Layer |
| D-14 | Inverse Discovery (v2.6) | Spec #72 | Intelligence + Normalisation |
| D-15 | Verdict Semantics & Behavioural Intelligence (v2.6) | Spec #62; Spec #59 §3.3 | Intelligence Layer |
| D-16 | Silent Defence Reporting (v2.6) | Spec #73 | Intelligence + Surface |
| D-17 | Intelligence Layer integration (Estate Intelligence Picture) | Spec #59 | Intelligence Layer |
| D-18 | Case Lifecycle | Spec #08 (+ v2.6 addendum); Spec #29; Spec #30 | Case Layer |
| D-19 | Routing & Team Affinity | Spec #31 | Case Layer |
| D-20 | Validation, Closure, Reopening | Spec #30 | Case Layer |
| D-21 | Closed-Loop Control Architecture | Spec #17 (+ v2.6 OODA Integration Addendum) | Case + OODA |
| D-22 | Strategy Layer Runtime | Spec #32 | Case + Strategy |
| D-23 | Strategic & Tactical Priority Framework | Spec #28 (+ v2.6 patch); Spec #74 (Context-Aware Drift Prioritisation) | Strategy |
| D-24 | P0 Zero-Day Priority Override | Spec #40 | Strategy + Case + Surface |
| D-25 | Mission Control & Mission Objective Binding | Spec #34; Spec #52 | Strategy + Surface |
| D-26 | Programme-Level OODA Loop | Spec #58; Spec #67 (Dashboard Family) | OODA Layer |
| D-27 | Operating Pictures (External + Internal, v2.6) | Spec #65; Spec #66 | Surface |
| D-28 | Direction Boards (v2.6) | Spec #70 | Surface |
| D-29 | Multi-Domain Fusion Map | Spec #33 (+ v2.6 Fusion Map Addendum) | Surface |
| D-30 | Mission Pulse Surfaces (System / Team / Domain) | Spec #34 | Surface |
| D-31 | Communication & Broadcast | Spec #26; Spec #26a (closed-loop email) | Case + Surface |
| D-32 | Push Engine | Spec #14; Spec #20 (Coordinated Push Group); Spec #15 (SIEM/SOAR Rule Generation) | Engine + Case |
| D-33 | Internal Risk Investigation Sub-Lifecycle (v2.6) | Spec #75 | Case (sub-lifecycle) |
| D-34 | Commander AI | Spec #13 | Cross-cutting |
| D-35 | Three Application Boundaries | Spec #39; v2.1 Application Boundary Update across #29–#34, #41 | Surface (application-level) |
| D-36 | Internal Control Plane | Spec #36; Spec #37; Spec #38 | Application |
| D-37 | RBAC & Authority Overlays | Spec #19 (+ v2.6 RBAC); Spec #50 (Visibility); Spec #75 (Internal Risk authority) | Cross-cutting |
| D-38 | Configuration Governance & Baseline | Spec #55 (+ v2.6 addendum) | Cross-cutting |
| D-39 | UI Doctrine & Shell Discipline | Spec #41 (+ v2.6 addendum); Spec #56 (Shell Reference vs Build Authority); Spec #46 (Glossary) | Surface (cross-cutting) |
| D-40 | Audit & Evidence | Cross-cutting — every domain emits audit events; Spec #29 v2.0 patch §2 No.10 (audit-first); Spec #71 §3.4 (classification audit record) | Cross-cutting |

40 domains identified. The list is comprehensive at this projection level; cross-references between them are recorded in `RELATIONSHIP_MAP.md` (separate run).

---

## Domains Added from Specs 34–43 Build

| # | Domain | Owning spec(s) (primary) | Layer (KG §2) |
|---:|---|---|---|
| D-41 | Decision Governance | Spec #51 (Rule, Model and Decision Governance Surface); Spec #08 §13 | Engine + OODA |
| D-42 | Posture Accountability | Spec #71 (Pre-Warned / Protected / Novel Classification) | Engine |
| D-43 | Universal Search | Spec #42 (Universal Search); MTS v7.0 §18 | Cross-cutting |
| D-44 | Risk Scoring | Spec #08 §3 (CRS); Spec #28 (Priority Framework); MTS v7.0 §6 | Engine |
| D-45 | Entitlement Management | SDR Control Plane Specification v1.1; Spec #50 | Surface (Control Plane) + Cross-cutting |
| D-46 | Platform Security | Spec #50 (RBAC/Entitlement); Spec #19; MTS v7.0 §17 | Cross-cutting |

Existing domains extended with new code entities (no new domain number required):
- **D-04** (Drift & Rule Engine) — extended with `finding.ts`, `rule-validation-engine.ts`, `rule-execution-engine.ts`, `suppression-engine.ts`
- **D-14** (Inverse Discovery) — extended with `inverse-discovery-event.ts`
- **D-25** (Mission Control & Mission Objective Binding) — extended with `mission-binding.ts`
- **D-33** (Internal Risk Investigation Sub-Lifecycle) — extended with `verdict-pattern-case.ts`

**Total domains: 46** (40 original + 6 new).

---
