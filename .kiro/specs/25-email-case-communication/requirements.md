# Requirements — Email Case Communication

**Spec ID:** `25-email-case-communication`  
**Target version:** v1.3.1  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.
**Translated from baseline:** Spec #08 Case Management Workflow, Spec #26 Case Communication and Broadcast Channel, Spec #26a Closed-Loop Email Case Communication Lifecycle, Spec #49 Admin Control Surface Information Architecture
**v1.3 depth:** full content-depth translation applied to this spec during v1.3 remediation.

## Purpose

Case-bound inbound/outbound email lifecycle, acknowledgements, threaded updates and audit.

## Scope in

- Provide a versioned implementation plan for Email Case Communication.
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

WHEN inbound case email is ingested THE SYSTEM SHALL bind the message to the correct case thread or create a governed intake signal.

### Domain Requirement 2 — Baseline rule

WHEN outbound case email is drafted THE SYSTEM SHALL create a reviewable draft and SHALL NOT send without approval.

### Domain Requirement 3 — Baseline rule

WHEN a case message is sent THE SYSTEM SHALL preserve message body, recipients, timestamp, sender and case lifecycle context.

### Domain Requirement 4 — Baseline rule

WHEN stakeholder updates are due THE SYSTEM SHALL generate nudges from SLA and case state rather than free-form reminders.

### Domain Requirement 5 — Baseline rule

WHEN email evidence is attached THE SYSTEM SHALL preserve thread identity and evidence linkage.

### Domain Requirement 6 — Baseline rule

WHEN external notification creates vulnerability intake THE SYSTEM SHALL bind acknowledgement, investigation and update states to the case.

## v1.3 baseline-depth requirements

### v1.3 Requirement 1 — Inbound mailbox binding

WHEN an inbound email is received by a configured case mailbox THE SYSTEM SHALL bind it to an existing case, sub-action, risk object, external notification or allocation queue object. [Source: Spec #26a §Closed-Loop Email Case Communication Lifecycle]

### v1.3 Requirement 2 — New risk communication

WHEN an inbound email cannot be matched to an existing case but contains risk content THE SYSTEM SHALL create a communication-ingested risk object rather than a manual case. [Source: Spec #26a §Inbound Intake]

### v1.3 Requirement 3 — Outbound draft governance

WHEN an outbound case email is prepared THE SYSTEM SHALL create it as a governed draft with template, approval state and sender mailbox context. [Source: Spec #26a §Outbound Communication]

### v1.3 Requirement 4 — Thread capture

WHEN an outbound or inbound case email is sent or received THE SYSTEM SHALL capture the message metadata, body summary, attachments metadata and thread relationship in the case timeline. [Source: Spec #26a §Thread Binding]

### v1.3 Requirement 5 — Approval chain

WHEN case communication requires approval THE SYSTEM SHALL route the draft to the configured approval chain before sending. [Source: Spec #26a §Approval Workflow]

### v1.3 Requirement 6 — Mailbox configuration

WHEN a communication channel is configured THE SYSTEM SHALL use Tenant Admin communication settings and permitted mailboxes. [Source: Spec #49 §Admin Control Surface Information Architecture]

### v1.3 Requirement 7 — Auto-acknowledgement

WHEN a valid external vulnerability or advisory notification is received THE SYSTEM SHALL send only an approved acknowledgement template and log it to the case lifecycle. [Source: Spec #26a §Auto Acknowledgement]

### v1.3 Requirement 8 — Notifier update

WHEN a case reaches an update milestone THE SYSTEM SHALL prepare an update to the notifier according to SLA cadence and approval rules. [Source: Spec #26a §Notifier Update Lifecycle]

### v1.3 Requirement 9 — Attachment handling

WHEN an inbound message includes attachments THE SYSTEM SHALL store attachment metadata and route content through configured security handling rather than blindly trusting it. [Source: Spec #26a §Attachment Handling]

### v1.3 Requirement 10 — Communication timeline

WHEN a case detail page is displayed THE SYSTEM SHALL show inbound, outbound, draft, approval, acknowledgement and escalation messages in chronological case context. [Source: Spec #08 §Case Detail; Spec #26a §Case Timeline]

### v1.3 Requirement 11 — Broadcast channel

WHEN a broadcast or swarm communication is issued THE SYSTEM SHALL bind it to a case, audience, approval and audit trail. [Source: Spec #26 §Broadcast Channel]

### v1.3 Requirement 12 — SIR compatibility

WHEN case communication requires SIR follow-up THE SYSTEM SHALL link the SIR communication path without giving Commander incident-triage authority. [Source: Spec #26 §SIR Compatibility]

### v1.3 Requirement 13 — External contact use

WHEN a case requires vendor or third-party outreach THE SYSTEM SHALL use configured contact sources and approval chain before sending. [Source: Spec #26 §Case Communication]

### v1.3 Requirement 14 — Communication audit

WHEN any communication state changes THE SYSTEM SHALL emit audit events for draft, approval, send, receive, bind, suppress and error actions. [Source: Spec #26a §Audit Requirements]

### v1.3 Requirement 15 — Manual message restriction

WHEN an operator attempts to send freeform case email THE SYSTEM SHALL require governed compose, approval, mailbox and timeline binding. [Source: Spec #26a §Governed Compose]

### v1.3 Requirement 16 — Delivery failure

WHEN an outbound case email fails THE SYSTEM SHALL record failure, retry state, owner notification and audit event. [Source: Spec #26a §Delivery Failure Handling]

### v1.3 Requirement 17 — SLA nudging

WHEN case updates are overdue THE SYSTEM SHALL create a communication nudge or draft according to SLA and routing rules. [Source: Spec #26a §Periodic Update Nudges]

### v1.3 Requirement 18 — Template provenance

WHEN a communication template is used THE SYSTEM SHALL store template ID, version and edited fields in the case audit trail. [Source: Spec #26a §Template Governance]

### v1.3 Requirement 19 — Privacy boundary

WHEN case communication includes sensitive identity or internal-risk content THE SYSTEM SHALL apply redaction, permission and internal-risk boundary controls before display or sending. [Source: Spec #26a §Privacy and Boundary Controls]

### v1.3 Requirement 20 — No unbound communication

WHEN a case email or broadcast cannot be bound to a governed object THE SYSTEM SHALL place it in an allocation queue and prevent it from becoming hidden case evidence. [Source: Spec #26a §Allocation Queue]

## Acceptance criteria

- Requirements are traceable to source authority or generated conversion doctrine.
- Tasks can be staged without collapsing the full journey into an MVP.
- Any blocked activity is explicit in tasks and build pack references.
- The domain can be tested using synthetic fixtures before Phase 2.
