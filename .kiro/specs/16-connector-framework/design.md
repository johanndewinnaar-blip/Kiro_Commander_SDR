# Design — Connector Framework

**Spec ID:** `16-connector-framework`  
**Target version:** v1.2

## Design intent

This design replaces the generic v1.0 boilerplate with baseline-derived domain architecture. It remains planning-only until the owner approves implementation.

## Baseline-derived architecture

The connector framework is contract-first. Connectors are classified by the Spec #61 four-class model and every emitted signal must resolve to canonical Commander contracts before it reaches features, cases or dashboards.

## Connector classes

| Class | Name | Primary purpose |
|---|---|---|
| A | SOC Telemetry | Read-only telemetry and case-level pull from SOC platforms where permitted. |
| B | Operational Verdict | Tool decisions such as block, allow, quarantine, coach, require-MFA, monitor or audit. |
| C | Configuration State | Policy, control, asset, identity or architecture state used for drift and coverage. |
| D | Threat Intelligence | External threat intelligence, KEV/CVE/context and permitted-use intelligence feeds. |

## Signal handling

- Every signal must declare connector class and signal purpose.
- Verdict signals must preserve Spec #62 semantics and disposition fields.
- SOC platform integration remains read-only.
- Mock connectors must preserve the future real connector contract shape.
- Connector promotion from mock to real is blocked until conformance, tenancy, security and audit checks pass.

## Future implementation placement

- `packages/connectors/` — connector contracts, mock adapters and future real adapters.
- `packages/contracts/` — normalised connector signal schemas.
- `packages/workers/` — ingestion, polling, validation and freshness jobs.
- `tests/fixtures/` — class A/B/C/D synthetic connector outputs.

## Testing strategy

- Validate source authority and translated baseline lineage.
- Validate canonical contracts and fixture shape before implementation.
- Validate tenant scope, RBAC and audit expectations.
- Validate no live AWS/resource/API side effects during initial stages.
- Validate that unresolved doctrine conflicts are recorded before implementation.

## Risks

- Generic scaffolding could conceal baseline violations.
- Kiro could treat a recommendation as implementation permission.
- Mock data could drift from real connector contracts if not tested.
- External tools could override Commander authority unless steering is read first.
