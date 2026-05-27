# Phase 2 Testing and Review Schedule

## Purpose

Define the Phase 2 transition from local mocked build to validated real-connector and AWS-readiness testing.

## Entry criteria

- v1.1 through v1.5 build packs complete or accepted as sufficient for test readiness.
- Canonical data model stable enough for fixture comparison.
- Mock connectors implemented and passing contract tests.
- Commander AI local/mock path validated.
- No live AWS resources created without explicit approval.

## Phase 2 workstreams

| Workstream | Objective | Evidence |
|---|---|---|
| T1 Connector readiness | Validate each target vendor connector contract before real API use. | Scope matrix, auth model, rate-limit model, data classification. |
| T2 Real API sandbox design | Define test tenants and dummy/vendor sandboxes. | Sandbox checklist, credential plan, read-only policy. |
| T3 AWS evaluation | Review AWS architecture and Bedrock/AgentCore runtime candidates. | Architecture decision record, cost/risk assessment. |
| T4 Commander AI safety | Validate grounding, output validation, prompt governance and audit. | Prompt tests, refusal/grounding logs, Commander execution records. |
| T5 Data model conformance | Verify synthetic data and connector data map to canonical entities. | Fixture results, schema checks, drift findings. |
| T6 Case lifecycle testing | Validate case creation, dedupe, routing, SLA, closure and reopening. | Test run logs, accepted defects. |
| T7 UI route/page coverage | Ensure every committed route has a page state: scaffold/build/stub/live. | Route registry coverage report. |
| T8 Security and privacy | Validate secret handling, tenant separation, audit and data retention. | Security checklist and threat model. |

## Suggested schedule

| Week | Focus | Review gate |
|---|---|---|
| Week 1 | Test harness, fixture catalogue, connector readiness matrix. | Phase 2 readiness review. |
| Week 2 | Mock-to-real connector gap analysis; AWS/Bedrock/AgentCore evaluation. | Architecture review. |
| Week 3 | Limited sandbox pull tests for approved read-only APIs. | Data conformance review. |
| Week 4 | End-to-end case, dashboard and Commander AI testing. | Product review. |
| Week 5 | Security, privacy, resilience and observability testing. | Security review. |
| Week 6 | Pilot entry assessment and Phase 3 plan. | Go/no-go for pilot preparation. |

## Exit criteria

- Real connector readiness is documented per connector.
- No unapproved write path exists.
- AWS target architecture is costed and risk-assessed.
- Commander AI runtime path has a recommendation.
- Pilot scope and non-goals are documented.
