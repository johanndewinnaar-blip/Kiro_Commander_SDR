---
inclusion: auto
name: security-testing
description: Use when creating tests, reviewing security, writing backend behaviour, adding connectors, changing auth, handling secrets or planning Phase 2.
---
# Security and Testing Steering

No secrets in repo. No real credentials in test fixtures. No live vendor APIs before Phase 2 approval.

Testing expectations:

- Unit tests for pure logic.
- Contract tests for connectors.
- Fixture conformance tests for data model.
- UI route coverage tests.
- RBAC/entitlement tests.
- Case lifecycle tests.
- Commander AI grounding and refusal tests.
- Audit trail tests.

All high-risk behaviours require explicit test evidence before promotion.
