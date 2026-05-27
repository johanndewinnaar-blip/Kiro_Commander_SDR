# AWS Alignment and Bedrock/AgentCore Evaluation Lane

## Purpose

Define AWS as the preferred target cloud while preserving local-first development and avoiding live resource creation during initial Kiro conversion.

## Evaluation lane

The AWS AI runtime lane must compare:

- Local mock Commander AI runtime.
- Bedrock model access pattern.
- Bedrock AgentCore runtime option.
- Container/runtime obligations.
- IAM and identity model.
- Data boundary and tenant isolation.
- Cost and quota constraints.
- Observability and audit.
- Portability and rollback.

## Initial decision

No AWS services are provisioned by this pack. `infra/terraform/` contains planning only.

## Future decision record required

Before using any AWS runtime, create a decision in `DECISIONS.md` covering:

- Selected runtime.
- Security model.
- Data residency.
- Cost guardrails.
- Failure modes.
- Local fallback.
- Testing evidence.

## v1.2 AgentCore candidate-only clarification

AgentCore is an AWS evaluation candidate only. It is not the selected Commander runtime, it does not override the baseline ECS/Fargate/Terraform direction, it does not permit live AWS resources during pack remediation, and any adoption outcome must be recorded in `DECISIONS.md` before implementation.
