
# Tasks — Connector Framework

**Spec ID:** `16-connector-framework`  
**Target version:** v1.3

> Do not execute code-generating tasks until the owner validates the pack.

## 1. Baseline validation tasks

- [ ] 1.1 Read Specs #05, #09, #11, #19, #20, #21, #61 and #62.
- [ ] 1.2 Confirm connector classes A/B/C/D and multi-class declaration rules.
- [ ] 1.3 Confirm every signal maps to canonical Commander contracts and signal purposes.
- [ ] 1.4 Confirm SOC platform integration remains read-only.

## 2. Framework planning tasks

- [ ] 2.1 Define connector declaration metadata: class, source, purposes, conformance, permissions and unsupported behaviours.
- [ ] 2.2 Define normalisation pipeline states: raw, validated, mapped, rejected/quarantined and emitted.
- [ ] 2.3 Define verdict disposition schema and semantic preservation requirements.
- [ ] 2.4 Define mock connector fixtures for classes A, B, C and D.
- [ ] 2.5 Define freshness, failure and health events for observability.
- [ ] 2.6 Define Phase 2 promotion gates from mock to real connectors.

## 3. Acceptance planning tasks

- [ ] 3.1 Confirm BP-03 and BP-13 are prerequisites before any connector ships.
- [ ] 3.2 Confirm no connector writes to SOC platforms.
- [ ] 3.3 Confirm test fixtures include valid, invalid, stale and partial connector payloads.
- [ ] 3.4 Record connector class ambiguities in `DECISIONS.md`.
