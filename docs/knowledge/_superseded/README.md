# Superseded Rationalisation Outputs

**Status:** SUPERSEDED — DO NOT READ OR CITE  
**Moved here:** 30 May 2026

---

## Why these are here

The documents in this folder are the previous Phase 1-6 System Rationalisation outputs. They were produced by reading the **`.kiro/specs` translation layer (folders 00–43)** and treating it as source authority. That layer is NOT authority.

This caused two confirmed defects:

1. **Misattributed citations** — Kiro folder numbers (e.g. `09`, `10`, `34`, `40`, `41`) were labelled as if they were baseline spec numbers. They map to entirely different baseline documents:
   - Kiro `10-identity-intelligence` was cited as "Spec #10", but baseline **#10 is Platform Security and Hardening**.
   - Kiro `09-asset-intelligence` was cited as "Spec #09", but baseline **#09 is Connector Architecture**.
   - Kiro `40-inverse-discovery-loop` was cited as "Spec #40", but baseline **#40 is P0 Zero-Day Priority Override**.
   - Kiro `34-drift-and-rule-engine` was cited as "Spec #34", but baseline **#34 is Mission Control / Pulse**.
   - Kiro `41-internal-risk-investigation` was cited as "Spec #41", but baseline **#41 is Military-Intelligence UI Doctrine**.
2. **Overstated coverage** — baseline specs #67, #68, #69, #72, #73, #74, #75, the Control Plane spec, and the Feature Registry were reported as "fully derived / complete integration" when they had not been read from source (or only partially).

## Rule for this folder

- These files are retained for lineage and audit only.
- They MUST NOT be read or cited as source for the clean knowledge work in `docs/knowledge/`.
- The clean work starts fresh under the binding sourcing rule in `docs/knowledge/SOURCING_RULE.md`.

## Contents moved here

- `SYSTEM_RATIONALISATION_STATUS.md`
- `SYSTEM_KNOWLEDGE_GRAPH.md`
- `DOMAIN_REGISTER.md`
- `DOMAIN_OPERATING_MODEL.md`
- `ENTITY_ARCHITECTURE.md`
- `FUNCTION_ARCHITECTURE.md`
- `STATE_ARCHITECTURE.md`
- `RECONCILIATION_LEDGER.md`
- `PRIORITY_1_REMEDIATION_COMPLETE.md`
