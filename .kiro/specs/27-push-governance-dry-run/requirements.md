# Requirements — Push Governance Dry Run

**Spec ID:** `27-push-governance-dry-run`  
**Target version:** v1.3.1  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #14 Push Capability Implementation, Spec #20 Push Action Governance, Spec #25 Cross-System Coordinated Push, Spec #57 Security Command and Control Doctrine, Spec #61 Universal Security Signal Connector Contract

## Purpose

Controlled push model, approval chains, dry-run output, rollback planning and no live writes.

## Scope in

- Provide a versioned implementation plan for Push Governance Dry Run.
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

WHEN a push action is proposed against any SOC platform THE SYSTEM SHALL refuse the push and log the refusal as a governance audit event.

### Domain Requirement 2 — Baseline rule

WHEN a dry-run push is executed THE SYSTEM SHALL produce a diff report only and SHALL NOT mutate the target system under any condition.

### Domain Requirement 3 — Baseline rule

WHEN a push action targets a non-SOC platform THE SYSTEM SHALL require action type, target system, proposed change, approver and rollback condition before execution can be considered.

### Domain Requirement 4 — Baseline rule

WHEN a coordinated push group is formed THE SYSTEM SHALL preserve per-target approval state and block partial execution unless explicitly allowed by governance rules.

### Domain Requirement 5 — Baseline rule

WHEN a push action is rejected THE SYSTEM SHALL retain the rejected proposal, reason and actor in the audit trail.

### Domain Requirement 6 — Baseline rule

WHEN Phase 2 has not approved real connectors THE SYSTEM SHALL restrict all push paths to mock/dry-run behaviour only.

### Domain Requirement 7 — Baseline rule

WHEN a push diff is produced THE SYSTEM SHALL identify added, removed and changed configuration elements without applying them.

### Domain Requirement 8 — Baseline rule

WHEN push governance is displayed THE SYSTEM SHALL clearly distinguish recommendation, approval, dry-run and execution states.

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.

## v1.2 bidirectional SIEM/SOAR governance

> These requirements were added during v1.2 no-loss remediation and cite the baseline source explicitly.

### v1.2 Requirement 1 — Inbound SIEM/SOAR flow

WHEN SIEM/SOAR source content is consumed THE SYSTEM SHALL treat it as read-only input and preserve source lineage. [Source: Master Proposition §16.1; Spec #15]

### v1.2 Requirement 2 — Outbound detection specification

WHEN Commander generates SIEM/SOAR rule output THE SYSTEM SHALL generate a governed detection specification or ITSM dispatch rather than pushing directly to SOC platforms. [Source: Master Proposition §16.1; Spec #15; Spec #57]

### v1.2 Requirement 3 — Bidirectional governance

WHEN bidirectional SIEM/SOAR flow is represented THE SYSTEM SHALL separate inbound read, outbound specification, approval, audit and SOC boundary controls. [Source: Master Proposition §16.1; Spec #15]

## v1.3.1 lineage closure requirements

### Bidirectional SIEM/SOAR Outbound

WHEN Commander generates a detection specification THE SYSTEM SHALL dispatch it outbound via ITSM to SIEM/SOAR engineering teams. [Source: Master Proposition §16.1]

### Bidirectional SIEM/SOAR Inbound

WHEN SIEM/SOAR teams update or close a deployed detection THE SYSTEM SHALL consume the inbound state change and bind it to the originating detection specification record. [Source: Master Proposition §16.1]

### Bidirectional SIEM/SOAR Lineage

WHEN bidirectional rule generation flow is active THE SYSTEM SHALL preserve the originating Commander spec lineage on every iteration across the boundary. [Source: Master Proposition §16.1]

