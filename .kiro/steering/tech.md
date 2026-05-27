---
inclusion: always
---
# Technology Steering — Commander SDR

Preferred target cloud: AWS. Local-first development is mandatory.

Initial repository technology posture:

- Frontend future home: `apps/web/`.
- Shared UI future home: `packages/ui/`.
- Canonical model future home: `packages/contracts/ and packages/db/`.
- Connectors future home: `packages/connectors/`.
- Rules engine future home: `packages/rules/`.
- Backend API future home: `apps/api/`.
- AWS planning future home: `infra/terraform/`.
- Tests future home: `tests/`.

No application code, live AWS resource, real vendor API integration or billing implementation is authorised during initial Kiro pack validation.

AWS alignment must consider Bedrock and AgentCore for Commander AI, but only through an evaluation lane until approved.
