# v2.6 Baseline Agent Authority

Agents must read `docs/00_master/00_AUTHORITY_AND_PRECEDENCE_v2_6.md` before all other documents. The v2.6 authority document overrides all historical wording and addenda.

Agents must not generate manual case creation, manual lifecycle progression, manual closure, manual reopening, duplicate active shell files, mixed Tenant Admin/Commercial Control Plane responsibilities, or any operation that violates the SOC boundary (no triage of SOC cases, no incident response workflow, no writes to SOC platforms) or the Insider Risk boundary (no investigation of insiders, no determination of intent, no disciplinary action, intelligence-grade evidence only).

---

# AGENTS.md — Commander SDR AI Agent Rules

## Purpose

This file governs all AI coding and documentation agents working in the Commander SDR repository, including Codex, Claude, ChatGPT, Copilot, and any future build agents.

Agents must follow this file before making any change.

---


## v2.6.1 Handover Memory Rule

`MEMORY.md` has been added as a context shortcut for humans and AI agents. It is not a source-of-truth document and must never override the formal baseline.

## v2.6.2 Stale Document Notice

The file `docs/01_active_build/Commander_SDR_AI_Build_Playbooks_v1_7.md` predates the v2.6 baseline. Its content references superseded master specification versions (Master Proposition v4.7, Master Technical Specification v6.7, Schedule v1.8 — the current versions are v5.0 / v7.0 / v1.9) and lists Specs #02 and #03 as "Not Done" when both are complete at v1.0 final. The file is retained in the pack only because three other baseline documents (`CURRENT_BASELINE_MANIFEST_v2_6.md`, `02_child_specs/05_Data_Connector_Normalisation_Implementation_Spec_v1_5.md`, `00_master/SDR_Specification_Schedule_and_Folder_Structure_v1_9.md`) reference it. **It is non-authoritative.** Use this `AGENTS.md` as the entry point into the baseline. Do not consume `Commander_SDR_AI_Build_Playbooks_v1_7.md` for current build work.

For baseline work, agents should use this read sequence:

```text
1. docs/00_master/00_AUTHORITY_AND_PRECEDENCE_v2_6.md
2. MEMORY.md
3. AGENTS.md
4. CURRENT_BASELINE_MANIFEST_v2_6.md
5. Relevant master or child specification
6. Relevant build pack, if supplied
```

If `MEMORY.md` conflicts with an authority document, master spec, child spec, or manifest, stop and flag the conflict. Do not silently choose the memory file.

The build doctrine remains:

```text
Source Docs → Build Packs → Code
```

## Current Authoritative Documents (v2.6)

Read these first for any build, code, or specification task:

```text
docs/00_master/Commander_SDR_Master_Proposition_v5_0.md
docs/00_master/Commander_SDR_Master_Technical_Specification_v7_0.md
docs/00_master/SDR_Control_Plane_Specification_v1_1.md
docs/00_master/SDR_Specification_Schedule_and_Folder_Structure_v1_9.md
docs/00_master/00_AUTHORITY_AND_PRECEDENCE_v2_6.md
docs/00_master/00_SPECIFICATION_REGISTER_v2_6.md
CURRENT_BASELINE_MANIFEST_v2_6.md
RELEASE_NOTES_v2_6.md
```

The v2.6 foundational doctrine specs are load-bearing for all v2.6 work:

```text
docs/02_child_specs/57_Security_Command_and_Control_Doctrine_Spec.md
docs/02_child_specs/58_Security_OODA_Loop_Specification.md
docs/02_child_specs/59_Intelligence_Layer_Architecture_Spec.md
docs/02_child_specs/60_Internal_and_External_Attack_Surface_Framework_Spec.md
docs/02_child_specs/61_Universal_Security_Signal_Connector_Contract_Spec.md
docs/02_child_specs/62_Verdict_Semantics_Specification.md
```

For any domain-specific implementation task, also read the relevant child specification from `docs/02_child_specs/`.

Do not use archived source inputs, older generated packs, Word documents, or connector API drafts as active authority unless the assigned task explicitly says it is a reconciliation task.

---

## v2.6 Doctrinal Constraints

### Three-Layer Coherence

All proposition, documentation, sales/marketing, and product surfaces must distinguish:

- **Security Command and Control (Security C2)** — the category Commander occupies
- **Security Drift Response (SDR)** — the patented operational discipline Commander runs within the category
- **Commander** — the platform brand that delivers both

Never use these terms interchangeably. Never conflate them.

### SOC Boundary

Commander does not triage individual SOC cases, run incident response workflow, contain active threats, execute write operations against SOC platforms (Sentinel, Google SecOps, Splunk, CrowdStrike, etc.), run incident-level OODA, or replace any SOC function.

Commander provides estate context (External Attack Correlation case type), pre-warned classification, and outbound detection specifications via ITSM dispatch. Commander runs programme-level OODA above the SOC's incident-level OODA.

### Insider Risk Boundary

Commander does not conduct insider risk investigations, make determinations of malicious intent, initiate disciplinary or legal action, hold investigation-grade evidence (Commander holds intelligence-grade evidence), or run forensic workflow on identified patterns.

Commander surfaces verdict patterns crossing thresholds, routes Verdict Pattern cases to customer Internal Risk function, maintains audit trail. The customer's Internal Risk function owns the investigation.

### Connector Class Discipline

All connectors declare against one or more of four classes:

- **Class A** — SOC Telemetry (case + detection signal from SOC platforms)
- **Class B** — Operational Verdict (verdict signal from operational security tools)
- **Class C** — Configuration State (intended state of controls/assets/identities)
- **Class D** — Threat Intelligence

Multi-class declaration is supported. Class A and Class B connectors are read-only with respect to source platforms.

### Verdict Semantics Discipline

Verdicts are time-bound claims, not ground truth. Eight canonical dispositions: BLOCK / QUARANTINE / COACH / REQUIRE_MFA / REQUIRE_COMPLIANT / MONITOR / ALLOW / AUDIT.

Density aggregation, disagreement detection, and trust calibration apply per Spec #62. Individual verdicts do not generate cases. Patterns may generate Verdict Pattern cases (with Internal Risk governance) or Policy Effectiveness cases.

---

## Core Working Rule

Do not build Commander SDR generally. Only complete the assigned issue or task.

Before modifying files, explain:

```text
1. files to be changed
2. reason for each change
3. expected tests
4. any risk or scope concern
5. which v2.6 binding doctrine applies
6. whether the change respects SOC boundary
7. whether the change respects Insider Risk boundary
8. whether the change preserves three-layer coherence (C2/SDR/Commander)
```

---

## Authority Conflict Resolution

1. v2.6 baseline supersedes v2.5.2
2. Child specs govern over Masters on their subject matter
3. Foundational doctrine specs (#57-#62) govern over capability specs (#65-#75)
4. Binding specs govern over implementation references
5. Authority Notice top-of-document declarations are binding for that document

Refer to `docs/00_master/00_AUTHORITY_AND_PRECEDENCE_v2_6.md` for full precedence rules.

---

## Versioning

AGENTS.md at v2.6.1 handover-control update. Supersedes prior v2.6 agent boot sequence only; all v2.6 doctrinal boundaries remain in force.
