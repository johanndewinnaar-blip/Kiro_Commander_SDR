
# Tasks — Security C2

**Spec ID:** `13-security-c2`  
**Target version:** v1.4

> Do not execute code-generating tasks until the owner validates the pack.

## 1. Baseline validation tasks

- [ ] 1.1 Read Specs #57, #39, #45, #58, #59 and #60.
- [ ] 1.2 Confirm Security C2, SDR and Commander are represented as distinct layers.
- [ ] 1.3 Confirm SOC boundary rules prevent writes, SOAR authoring and SOC case triage.
- [ ] 1.4 Confirm Security C2 consumes OODA, intelligence streams and attack-surface attribution.

## 2. Surface planning tasks

- [ ] 2.1 Define Security C2 operating picture data needs.
- [ ] 2.2 Define boundary-safe SOC signal consumption model.
- [ ] 2.3 Define Security C2 route and page registry dependencies.
- [ ] 2.4 Define Commander AI constraints for Security C2 explanations and recommendations.
- [ ] 2.5 Define audit evidence for C2 decisions, refusals and recommendations.

## 3. Acceptance planning tasks

- [ ] 3.1 Confirm no Security C2 workflow replaces incident response or SOC triage.
- [ ] 3.2 Confirm all C2 actions are recommendation, governance or dry-run unless separately approved.
- [ ] 3.3 Confirm all C2 surfaces preserve source, stream and surface lineage.
- [ ] 3.4 Record unresolved C2 boundary questions in `DECISIONS.md`.
