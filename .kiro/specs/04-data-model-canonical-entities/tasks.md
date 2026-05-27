
# Tasks — Canonical Data Model

**Spec ID:** `04-data-model-canonical-entities`  
**Target version:** v1.2

> Do not execute code-generating tasks until the owner validates the pack.

## 1. Baseline validation tasks

- [ ] 1.1 Read Specs #03, #05, #11, #15, #18 and #20 plus the v2.6 doctrine specs #61 and #62.
- [ ] 1.2 Confirm entity families and invariants against `docs/03_data_model/` source copies.
- [ ] 1.3 Confirm `packages/contracts/`, `packages/db/` and `tests/fixtures/` are the future implementation locations.
- [ ] 1.4 Confirm no app code, schema migration or live database is created during pack validation.

## 2. Contract planning tasks

- [ ] 2.1 Define the canonical entity index: tenant, user, asset, identity, control, coverage, exposure, vulnerability, case, risk object, security debt, connector signal, verdict, audit event and baseline configuration.
- [ ] 2.2 Define mandatory fields for tenant scope, source lineage, timestamps, ownership and audit references.
- [ ] 2.3 Define relationship edge types, directionality and evidence requirements.
- [ ] 2.4 Define fixture coverage needed for v1.1 and v1.2 surfaces.
- [ ] 2.5 Define schema-versioning and change-impact rules.

## 3. Acceptance planning tasks

- [ ] 3.1 Confirm every feature spec consumes canonical contracts rather than one-off objects.
- [ ] 3.2 Confirm seed data can represent the full journey without real vendor data.
- [ ] 3.3 Confirm Commander AI has a grounded, tenant-scoped data access contract.
- [ ] 3.4 Record unresolved entity questions in `DECISIONS.md`.
