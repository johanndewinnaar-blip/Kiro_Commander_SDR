# Design — Seed Data and Test Fixtures

**Spec ID:** `03-seed-data-and-test-fixtures`  
**Target version:** v1.2

## Design intent

Synthetic estate, users, assets, identities, vulnerabilities, controls, cases, connectors and dashboards.

## Architecture placement

| Layer | Placement |
|---|---|
| UI | `apps/web/` and/or `packages/ui/` when implementation is approved. |
| Data model | `packages/contracts/` for canonical types/contracts and `packages/db/` for persistence planning.  |
| Backend | `apps/api/` for APIs and orchestration when required. |
| Connectors | `packages/connectors/` for mock/real connectors where applicable. |
| Rules | `packages/rules/` where detection, scoring or drift logic is required. |
| Testing | `tests/` and `tests/fixtures/`. |
| AWS | `infra/terraform/` planning only until authorised; no live AWS resources. |

## Source inputs

- `docs/00_authority/AUTHORITY_MODEL.md`
- `docs/00_authority/source_CURRENT_BASELINE_MANIFEST_v2_6.md`
- Relevant baseline documents under `docs/99_source_archive/baseline_v2_6_2/`
- Relevant build pack under `docs/04_build_packs/`

## Data and state model

The domain must bind to canonical Commander entities rather than inventing one-off state. At minimum evaluate applicability to:

- Tenant
- User / Persona
- Asset
- Identity
- Control
- Coverage
- Exposure
- Vulnerability
- Case
- Risk Object
- Security Debt
- Connector Signal
- Audit Event
- Baseline Configuration
- Commander AI Execution Record

## UI and route model

All UI work must register with the route/page schedule and indicate one of:

- `SCAFFOLD`
- `BUILD`
- `STUB`
- `LIVE`

No specified surface may disappear merely because it is not visible in an HTML shell reference.

## Testing strategy

- Validate source authority read path.
- Validate fixture coverage.
- Validate route/page registration where applicable.
- Validate RBAC/feature flag behaviour where applicable.
- Validate audit events.
- Validate Commander AI grounding where applicable.
- Validate no live AWS/resource/API side effects during initial stages.

## Risks

- Scope collapse into a thin MVP.
- Route/menu drift from feature registry.
- AI output not grounded in Commander data.
- Premature real connector or AWS work.
- Confusion between Security C2, SDR and Commander.
