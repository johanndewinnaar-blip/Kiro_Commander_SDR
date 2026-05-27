# Requirements — AWS Bedrock and AgentCore Evaluation Lane

**Spec ID:** `21-aws-bedrock-agentcore-evaluation`  
**Target version:** v1.5  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #03 Backend/API Architecture, Spec #06 Worker and Scheduling, Spec #16 Performance Scaling and Operational Spec, Spec #34 Commander AI Implementation, Master Technical Specification; AWS AgentCore external documentation for evaluation only

## Purpose

Runtime evaluation path for Commander AI, local mock runtime and AWS decision criteria.

## Scope in

- Provide a versioned implementation plan for AWS Bedrock and AgentCore Evaluation Lane.
- Preserve Commander authority and no-MVP doctrine.
- Support local-first development.
- Align with AWS target architecture where relevant.
- Use seed/mock data until Phase 2 approves real connectors.
- Keep Commander AI present where the user journey requires assistance, explanation, drafting or prioritisation.

## Scope out

- Live AWS resource creation.
- Real vendor API credentials or production integrations.
- Production billing.
- n8n orchestration.
- Custom Kiro powers during initial conversion.
- Any behaviour that violates SOC or Insider Risk boundaries.

## User stories and EARS requirements

### Requirement 1 — Authority compliance

WHEN Kiro works on this domain  
THE SYSTEM SHALL read Commander authority, relevant Kiro steering, this spec and its owning build pack before proposing changes.

### Requirement 2 — Build visibility

WHEN this domain is not fully implemented  
THE SYSTEM SHALL still represent committed routes, pages, panels or data objects as scaffold, build or stub states rather than omitting them.

### Requirement 3 — Mock-first data

WHEN data is needed before Phase 2 real connector approval  
THE SYSTEM SHALL use seed/mock fixtures that preserve the canonical entity shape and avoid real customer secrets or vendor credentials.

### Requirement 4 — Auditability

WHEN this domain creates, changes, closes, suppresses, routes, scores, recommends or drafts anything material  
THE SYSTEM SHALL emit an auditable record design and define review points.

### Requirement 5 — Commander AI grounding

WHEN Commander AI is used in this domain  
THE SYSTEM SHALL ground outputs in available Commander data, label uncertainty, and avoid external writes without explicit approval.

### Requirement 6 — AWS alignment

WHEN this domain has backend, runtime, storage, queueing, AI or deployment implications  
THE SYSTEM SHALL record the local-first behaviour and the future AWS-aligned option without provisioning infrastructure.

## Domain requirements translated from baseline

### Domain Requirement 1 — Baseline rule

WHEN AWS runtime options are evaluated THE SYSTEM SHALL treat Bedrock and AgentCore as candidates only and SHALL NOT select them without a recorded decision.

### Domain Requirement 2 — Baseline rule

WHEN AgentCore is referenced THE SYSTEM SHALL describe it as an evaluation lane, not the chosen Commander runtime.

### Domain Requirement 3 — Baseline rule

WHEN local-first development is active THE SYSTEM SHALL keep Commander AI runnable with mock or local abstractions without live AWS dependencies.

### Domain Requirement 4 — Baseline rule

WHEN AWS evaluation criteria are defined THE SYSTEM SHALL include tenancy, security, auditability, cost, latency, observability and portability.

### Domain Requirement 5 — Baseline rule

WHEN an AWS candidate is rejected or selected THE SYSTEM SHALL record the reason in DECISIONS.md.

### Domain Requirement 6 — Baseline rule

WHEN infrastructure examples are documented THE SYSTEM SHALL avoid creating live AWS resources or credentials.


## AgentCore evaluation boundary

Amazon Bedrock AgentCore is an external AWS evaluation candidate only. AWS documentation describes AgentCore as an agentic platform for building, deploying and operating agents securely at scale using modular services such as Runtime, Gateway, Memory, Identity, Browser, Code Interpreter and Observability. This Kiro pack does not select AgentCore as Commander runtime, does not create AgentCore resources and does not displace local-first development.

### AgentCore Boundary Requirement 1 — Candidate-only status

WHEN AgentCore is referenced THE SYSTEM SHALL describe it as a candidate runtime for evaluation only and SHALL NOT treat it as selected architecture.

### AgentCore Boundary Requirement 2 — Decision recording

WHEN the AgentCore evaluation reaches a recommendation THE SYSTEM SHALL record the outcome and rationale in `DECISIONS.md` before any implementation commitment.

### AgentCore Boundary Requirement 3 — No live AWS resource creation

WHEN AgentCore examples, CLI flows or deployment paths are discussed THE SYSTEM SHALL keep them as documentation-only evaluation notes and SHALL NOT create live AWS resources from this pack.

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.2 AgentCore candidate-only clarification

AgentCore is an AWS evaluation candidate only. It is not the selected Commander runtime, it does not override the baseline ECS/Fargate/Terraform direction, it does not permit live AWS resources during pack remediation, and any adoption outcome must be recorded in `DECISIONS.md` before implementation.
