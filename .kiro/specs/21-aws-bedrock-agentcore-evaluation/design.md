
# Design — AWS Bedrock and AgentCore Evaluation Lane

**Spec ID:** `21-aws-bedrock-agentcore-evaluation`  
**Target version:** v1.5

## Design intent

This spec defines an evaluation lane for Commander AI runtime options. It does not select Amazon Bedrock, Amazon Bedrock AgentCore or any other cloud AI runtime as production architecture.

## Evaluation-only boundary

AWS documentation describes Amazon Bedrock AgentCore as an agentic platform for building, deploying and operating agents securely at scale using modular services including Runtime, Gateway, Memory, Identity, Browser, Code Interpreter and Observability. AgentCore Runtime is described as a secure, serverless runtime environment for deploying and scaling AI agents and tools. In Commander, this remains evaluation-only until a decision is recorded.

## Baseline alignment

| Area | Commander position |
|---|---|
| Local-first development | Mandatory; no AWS dependency for initial build. |
| AWS target cloud | Preferred future alignment, not live provisioning. |
| Commander AI | Core from product v1.1 as grounded capability; runtime selection remains open. |
| AgentCore | Candidate runtime only; not selected architecture. |
| Bedrock | Candidate model/provider layer only; not selected architecture. |
| ECS/Fargate-style backend alignment | Preserved as baseline-compatible deployment direction for app/runtime services. |

## Decision criteria

- Tenant isolation and RBAC enforcement.
- Prompt, response and tool-call auditability.
- Data residency and retention controls.
- Latency and cost profile.
- Local/mock parity.
- Observability and failure handling.
- Portability away from a single provider.
- Ability to preserve Commander authority, case boundaries and no-write constraints.

## Required decision record

The evaluation outcome must be recorded in `DECISIONS.md` before any implementation commitment. Until then, AgentCore references remain non-binding evaluation notes.

## Prohibited in this pack

- Creating live AWS resources.
- Creating AgentCore runtimes, gateways, memories or identities.
- Storing AWS credentials.
- Replacing local-first Commander AI with an AWS-only runtime.
- Treating AWS examples as production implementation instructions.

## v1.2 AgentCore candidate-only clarification

AgentCore is an AWS evaluation candidate only. It is not the selected Commander runtime, it does not override the baseline ECS/Fargate/Terraform direction, it does not permit live AWS resources during pack remediation, and any adoption outcome must be recorded in `DECISIONS.md` before implementation.
