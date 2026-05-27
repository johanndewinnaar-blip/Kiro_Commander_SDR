
# Tasks — Case Management

**Spec ID:** `06-case-management`  
**Target version:** v1.2

> Do not execute code-generating tasks until the owner validates the pack.

## 1. Baseline validation tasks

- [ ] 1.1 Read Specs #08, #17, #28, #29, #30, #42 and #60.
- [ ] 1.2 Confirm case creation is system-owned and signal-to-case only.
- [ ] 1.3 Confirm manual status edit, manual closure and operator-bypass routing are forbidden.
- [ ] 1.4 Confirm all case activity emits structured audit events.

## 2. Lifecycle planning tasks

- [ ] 2.1 Define parent case and sub-case state machines.
- [ ] 2.2 Define validation closure and reopening lifecycle gates.
- [ ] 2.3 Define signal-to-case intake, risk-object binding and attack-surface attribution.
- [ ] 2.4 Define assignment, workload mix, rank, specialism and anti-hoarding rules.
- [ ] 2.5 Define Case Action Algorithm input/output contract.
- [ ] 2.6 Define evidence pack, rollback snapshot and auto-healing validation rules.
- [ ] 2.7 Define email/stakeholder communication lifecycle linkage.

## 3. Acceptance planning tasks

- [ ] 3.1 Confirm no manual case lifecycle bypass remains in requirements or design.
- [ ] 3.2 Confirm test fixtures cover open, routed, assigned, escalated, validated, closed and reopened cases.
- [ ] 3.3 Confirm Command Centre, Direction Boards, OODA and audit trail can consume case state.
- [ ] 3.4 Record unresolved workflow questions in `DECISIONS.md`.
