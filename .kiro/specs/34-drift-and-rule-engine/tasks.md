# Tasks — Drift and Rule Engine

**Spec ID:** `34-drift-and-rule-engine`  
**Target version:** v1.2

> Do not execute code-generating tasks until the owner validates the pack.

## 1. Baseline validation tasks
- [ ] 1.1 Read Spec #07 and Master Technical Specification §4.
- [ ] 1.2 Confirm YAML rule schema and supported operators.
- [ ] 1.3 Confirm rule lifecycle state list and activation gate.
- [ ] 1.4 Confirm finding model and dedupe key.
- [ ] 1.5 Confirm no-push boundary for proposed actions.
- [ ] 1.6 Confirm initial ten rule categories.
- [ ] 1.7 Confirm 240-model target is preserved as roadmap, not Phase 0 implementation.
- [ ] 1.8 Confirm rule-health telemetry events.

## 2. Planning tasks
- [ ] 2.1 Plan rule contracts and fixture shapes.
- [ ] 2.2 Plan simulation/version/rollback surfaces.
- [ ] 2.3 Plan rule-to-case handoff contract.
- [ ] 2.4 Plan tenant-safe context-builder contract.

## 3. Acceptance planning tasks
- [ ] 3.1 Confirm requirements, design and tasks cite the baseline source.
- [ ] 3.2 Confirm no live AWS, vendor or push behaviour is introduced.
- [ ] 3.3 Record unresolved questions in `DECISIONS.md`.