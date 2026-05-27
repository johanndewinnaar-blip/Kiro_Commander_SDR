---
inclusion: auto
name: aws-alignment
description: Use when discussing AWS target architecture, Bedrock, AgentCore, cloud deployment, infrastructure, environments, or production hardening.
---
# AWS Alignment Steering

AWS is preferred target cloud, but local-first development is mandatory.

Initial pack only plans AWS. It must not create live resources.

AWS areas to evaluate later:

- Bedrock foundation model access for Commander AI.
- Bedrock AgentCore runtime evaluation for agent hosting.
- IAM, KMS and Secrets Manager for identity and secret controls.
- ECS/Fargate or Lambda where appropriate for apps/api/workers.
- EventBridge/SQS for scheduling and async workflows.
- CloudWatch/OpenTelemetry for observability.
- S3/Aurora/OpenSearch options subject to architecture review.

All AWS choices must be captured in `DECISIONS.md` before implementation.
