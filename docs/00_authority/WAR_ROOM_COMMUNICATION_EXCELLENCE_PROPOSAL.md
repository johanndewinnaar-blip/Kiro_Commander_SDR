# Commander SDR — War Room, Communication & AI Excellence Proposal

**Version:** WRCEP-1.0  
**Status:** REVIEW — Pending owner decision.  
**Date:** 2026-06-02  
**Scope:** Architectural improvement of P0 War Room (Spec #44), Email/Teams Communication (Spec #26, #26a), and Commander AI integration across emergency operations.  
**Authority:** This document proposes extensions to Commander War Room and Communication architecture. It does not override existing authority until approved and recorded in DECISIONS.md.  
**Companion to:** CASE_MANAGEMENT_EXCELLENCE_PROPOSAL.md (CMEP-1.0)

---

## 1. Executive Summary

This proposal addresses three questions:

1. **Should the War Room follow a Case-Type structure?** — Yes, but not as a new case type. The War Room should be formalised as a **Case Overlay Entity** — a governed coordination envelope that wraps one or more P0 cases and has its own lifecycle, membership, communication cadence, and audit trail.
2. **How does Commander AI orient participants?** — Commander AI operates in a new **War Room Triage Mode** producing live orientation briefings, exploit analysis, and decision support grounded in case data.
3. **How do attendees follow and receive updates?** — A formal **War Room Subscription Model** with configurable delivery channels (Teams, email) and structured cadence options.

---

## 2. Architectural Decision: War Room as a Case Overlay Entity

### 2.1 The Problem

The current baseline (Spec #44) states: *"The P0 War Room is not a separate lifecycle. It is a UI composition."*

This is architecturally limiting because:
- A UI composition has no membership model (who is "in" this War Room?)
- A UI composition has no communication cadence (who receives updates, when?)
- A UI composition has no close-out ceremony (when does the War Room end vs when does the case close?)
- A UI composition cannot be subscribed to or followed
- A UI composition produces no close-out audit report

### 2.2 The Proposal: War Room Overlay Entity

The War Room becomes a **first-class entity** in the canonical data model — but NOT a case type. It is an **overlay** that:

- Wraps one or more P0/P1 cases (the cases retain their own type and lifecycle)
- Has its own governed lifecycle (distinct from the case lifecycle)
- Has membership (who is actively participating, observing, or subscribed)
- Has communication cadence (governed update schedule)
- Has a Commander AI orientation surface
- Produces a close-out audit report when deactivated

```
┌─────────────────────────────────────────────────────────────────────┐
│                     WAR ROOM OVERLAY ENTITY                          │
│                                                                       │
│  warRoomId: "WR-2026-0001"                                          │
│  status: activated | monitoring | winding_down | closed              │
│  activatedAt: ISO timestamp                                          │
│  activatedBy: system-actor or senior-owner                          │
│  reason: "Active exploitation of CVE-2026-9999"                     │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                       │
│  BOUND CASES: [CASE-2026-0001 (P0), CASE-2026-0042 (P1)]           │
│  MEMBERSHIP: [CISO, SOC Manager, Alice Analyst, Bob Platform]       │
│  SUBSCRIBERS: [CTO (email/daily), VP Eng (teams/hourly)]            │
│  COMMANDER AI: orientation briefing active                           │
│  COMMUNICATION CADENCE: hourly-during-active, 4h-during-monitoring  │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                       │
│  Lifecycle: activated → monitoring → winding_down → closed           │
│  Close-out: audit report generated on transition to closed           │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.3 War Room as the Primary Working Surface (Full Case Access)

A critical architectural principle: **the War Room is not a notification dashboard that links out to cases**. It is the **primary working surface** during a P0 event. Bound cases are fully accessible, drillable, and workable from within the War Room — analysts do not leave the War Room to progress their assigned cases.

#### 2.3.1 What "Full Case Access" Means

Every bound case is rendered within the War Room with complete operational capability:

| Case Capability | Available in War Room? | How |
|---|---|---|
| View case detail (lifecycle, SLA, owner, routing) | ✅ Yes | Inline case panels within War Room |
| Progress sub-actions | ✅ Yes | Sub-Action Board directly workable |
| Add/review evidence | ✅ Yes | Evidence Chain Panel with upload/link |
| Send case-bound email | ✅ Yes | Communication Panel per case |
| View/request validation | ✅ Yes | Validation Cadence Panel |
| View risk objects and COIM data | ✅ Yes | Fusion Map Slice + Evidence Chain |
| View routing rationale | ✅ Yes | Emergency Routing Panel |
| View SLA countdown | ✅ Yes | SLA Countdown Rail |
| Trigger containment/push actions | ✅ Yes | Mitigation Options Panel (via dry-run governance) |

#### 2.3.2 Dual Attribution

When an analyst performs a case action from within the War Room context, the action is recorded in **two places**:

1. **On the case** — the normal case audit trail records the action exactly as if performed from the case detail page
2. **On the War Room** — the War Room audit timeline records that this action was taken in War Room context, by which member, at which War Room state

This dual attribution means the close-out audit report (§5) can reconstruct exactly which actions were taken during the War Room's lifetime — without the case losing its own independent audit integrity.

#### 2.3.3 Case Queue Relationship

The analyst's case queue **still shows the case assigned to them**. The War Room does not "steal" cases from queues. The relationship is:

```
Analyst's Case Queue:
  └─ CASE-2026-0001 (P0) ← still assigned, still tracked, still SLA'd

War Room WR-2026-0001:
  └─ CASE-2026-0001 (P0) ← same case, elevated context, full access
  └─ CASE-2026-0042 (P1) ← related case, cross-case visibility
```

During an active War Room, the analyst's **primary working surface** is the War Room — but the case remains independently addressable. If the analyst navigates to `/cases/CASE-2026-0001` directly, they see normal case detail with a prominent banner: *"This case is part of active War Room WR-2026-0001 — [Go to War Room]"*.

#### 2.3.4 Cross-Case Coordination (What the Overlay Adds Beyond Individual Case Access)

The value of the War Room over simply working cases individually is **cross-case situational awareness**:

| Coordination Capability | Not Available on Individual Case | Available in War Room |
|---|---|---|
| See all related P0/P1 cases in one view | ❌ | ✅ |
| See what OTHER analysts are doing on related cases | ❌ | ✅ |
| See decisions made across the cluster | ❌ | ✅ (Decision Log) |
| See Commander AI orientation across all cases | ❌ | ✅ |
| See combined blast radius / Fusion Map | ❌ | ✅ (unified Fusion Map) |
| See aggregated communication state (who's been notified, who hasn't responded) | ❌ | ✅ |
| Handoff context when shift changes | ❌ | ✅ (Handoff Ceremony) |
| Subscribe to coordinated updates | ❌ | ✅ |

### 2.5 Why Not a Case Type?

A case type represents a discrete risk condition requiring treatment. The War Room is a **coordination mechanism** across one or more cases. Making it a case type would:
- Conflate coordination with risk treatment
- Force it through the 12-state lifecycle (inappropriate — a War Room doesn't get "validated" or "closed by system")
- Make it subject to routing/prioritisation/SLA engines (War Rooms aren't assigned to analysts)
- Violate the principle that cases are system-born from risk objects (War Rooms are activated by condition/rule)

### 2.6 War Room Lifecycle (4-State)

```
activated → monitoring → winding_down → closed
```

| State | Meaning | Entry Condition | Exit Condition |
|---|---|---|---|
| `activated` | Full emergency coordination. All panels live. AI briefing continuous. Maximum communication cadence. | P0 case exists OR P0 recommended + senior approval OR cluster rule triggers | Senior owner transitions to monitoring |
| `monitoring` | Active exploitation contained but not validated. Reduced cadence. Watchful posture. | Senior decision: immediate threat contained | All bound cases pass validation OR senior transitions to winding_down |
| `winding_down` | Post-incident stabilisation. Preparing close-out. Collecting evidence. | All bound cases in `validated_pass` or `pending_closure_gates` | Close-out report generated + senior approval |
| `closed` | War Room archived. Audit report published. Subscriptions terminated. | Close-out report approved | Terminal state |

**Transition actors:**
- `activated` can be triggered by: system rule (P0 detected) OR senior owner (manual activation with reason)
- All other transitions: senior owner only (SOC Manager, CISO, Deputy CISO)
- `closed`: requires close-out report generation + senior approval

### 2.7 War Room Entity Contract

```typescript
export interface WarRoom extends CommonFields {
  entityType: 'war-room';
  /** War Room reference number */
  warRoomRef: string;
  /** Current lifecycle state */
  status: WarRoomStatus;
  /** Activation reason (human-readable) */
  activationReason: string;
  /** Activation source */
  activationSource: 'system_rule' | 'senior_decision';
  /** Bound P0/P1 case IDs */
  boundCaseIds: string[];
  /** Active membership */
  membership: WarRoomMember[];
  /** Subscriber list (follow/receive updates) */
  subscribers: WarRoomSubscriber[];
  /** Communication cadence profile */
  communicationCadence: CommunicationCadenceProfile;
  /** Senior accountable owner */
  seniorOwnerId: string;
  /** Commander AI orientation state */
  aiOrientationState: 'active' | 'paused' | 'complete';
  /** Close-out report reference (populated on close) */
  closeOutReportRef: string | null;
  /** Audit trail reference */
  auditTrailRef: string;
}

export type WarRoomStatus = 'activated' | 'monitoring' | 'winding_down' | 'closed';

export interface WarRoomMember {
  userId: string;
  role: 'senior_owner' | 'coordinator' | 'analyst' | 'observer';
  joinedAt: string;
  acknowledgedAt: string | null;
  leftAt: string | null;
}

export interface WarRoomSubscriber {
  userId: string;
  channels: SubscriptionChannel[];
  cadence: SubscriptionCadence;
  subscribedAt: string;
  unsubscribedAt: string | null;
}

export type SubscriptionChannel = 'teams_adaptive_card' | 'email_structured' | 'email_summary' | 'in_app';

export type SubscriptionCadence =
  | 'live'           // every significant event
  | 'hourly'         // structured hourly digest
  | 'four_hourly'    // structured 4-hourly digest
  | 'end_of_day'     // end-of-day summary
  | 'on_state_change'; // only on war room state transitions

export interface CommunicationCadenceProfile {
  activatedCadenceMinutes: number;   // e.g., 60 (hourly updates during activated)
  monitoringCadenceMinutes: number;  // e.g., 240 (4-hourly during monitoring)
  windingDownCadenceMinutes: number; // e.g., 480 (8-hourly during wind-down)
  execUpdateCadenceMinutes: number;  // e.g., 120 (exec summary every 2h regardless)
}
```

---

## 3. Commander AI — War Room Triage Mode

### 3.1 Context

Commander AI has four existing modes: Estate Mode, Engineering Mode, Triage Mode, Reporting Mode. The v2.6 extension grounds AI in intelligence streams, OODA metrics, and Operating Pictures.

This proposal extends Commander AI with a **War Room Triage Mode** — a purpose-built orientation and analysis surface activated when a War Room is live.

### 3.2 War Room AI Orientation Briefing

When a War Room activates, Commander AI produces an **Orientation Briefing** — a structured, continuously-updated analysis that answers the questions every War Room attendee needs answered immediately:

#### 3.2.1 Initial Orientation (Generated on Activation)

```
╔══════════════════════════════════════════════════════════════════╗
║  COMMANDER AI — WAR ROOM ORIENTATION BRIEFING                    ║
║  WR-2026-0001 | Generated: 2026-01-18T06:05:00Z                 ║
║  Confidence: HIGH (grounded in 3 connector sources)              ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ┌─ WHAT HAPPENED ──────────────────────────────────────────┐    ║
║  │ Active exploitation of CVE-2026-9999 (CVSS 9.8) detected │    ║
║  │ on PROD-WEB-01 (external-facing payment gateway).         │    ║
║  │                                                            │    ║
║  │ First detection: 2026-01-14T22:30Z (79h dwell time)       │    ║
║  │ Case created: 2026-01-18T06:00Z                           │    ║
║  │ P0 activated: 2026-01-18T06:01Z (system rule)             │    ║
║  └────────────────────────────────────────────────────────────┘    ║
║                                                                    ║
║  ┌─ EXPLOIT ANALYSIS ───────────────────────────────────────┐    ║
║  │ Technique: T1190 (Exploit Public-Facing Application)      │    ║
║  │ Exploit maturity: ACTIVE (confirmed in-the-wild)          │    ║
║  │ KEV listed: YES (added 2026-01-17)                        │    ║
║  │ EPSS: 0.94 (94th percentile)                              │    ║
║  │ Automatable: YES (no user interaction required)           │    ║
║  │                                                            │    ║
║  │ Attack vector: Remote code execution via malformed HTTP    │    ║
║  │ request to /api/payment/process endpoint. Public PoC      │    ║
║  │ available since 2026-01-15. Weaponised exploit kit        │    ║
║  │ observed in Cobalt Strike framework since 2026-01-17.     │    ║
║  └────────────────────────────────────────────────────────────┘    ║
║                                                                    ║
║  ┌─ BLAST RADIUS ───────────────────────────────────────────┐    ║
║  │ Directly affected: 1 asset (PROD-WEB-01)                  │    ║
║  │ Lateral reach: 4 assets via network adjacency             │    ║
║  │ Identity exposure: 2 service accounts with DB access      │    ║
║  │ Data at risk: PCI-scope cardholder data (estimated 50K    │    ║
║  │ records reachable from compromised host)                   │    ║
║  │ Blast radius score: 10/100 (contained but critical data)  │    ║
║  └────────────────────────────────────────────────────────────┘    ║
║                                                                    ║
║  ┌─ WHAT'S BEEN DONE SO FAR ────────────────────────────────┐    ║
║  │ • 06:01 — P0 activated (system rule: KEV + CVSS ≥ 9.5)   │    ║
║  │ • 06:01 — Routed to CISO (P0 overlay routing)            │    ║
║  │ • 06:02 — War Room activated (WR-2026-0001)              │    ║
║  │ • 06:05 — This orientation briefing generated             │    ║
║  │                                                            │    ║
║  │ PENDING:                                                   │    ║
║  │ • Senior owner acknowledgement (CISO — not yet ack'd)    │    ║
║  │ • Network containment decision (awaiting approval)         │    ║
║  │ • Patch availability assessment (in progress)             │    ║
║  └────────────────────────────────────────────────────────────┘    ║
║                                                                    ║
║  ┌─ RECOMMENDED IMMEDIATE ACTIONS ──────────────────────────┐    ║
║  │ 1. CONTAIN: Isolate PROD-WEB-01 from PCI network         │    ║
║  │    segment (requires SOC Manager approval)                 │    ║
║  │ 2. ASSESS: Confirm lateral movement has not occurred      │    ║
║  │    (EDR telemetry review — assigned to SOC team)          │    ║
║  │ 3. PATCH: Vendor patch available since 2026-01-16.        │    ║
║  │    Test deployment estimated 4h.                           │    ║
║  │ 4. NOTIFY: External notifier (PCI QSA) requires update   │    ║
║  │    within 24h per contractual obligation.                  │    ║
║  └────────────────────────────────────────────────────────────┘    ║
║                                                                    ║
║  ┌─ UNCERTAINTY & GAPS ─────────────────────────────────────┐    ║
║  │ ⚠ Lateral movement assessment: NOT YET CONFIRMED          │    ║
║  │ ⚠ Data exfiltration: NO EVIDENCE but cannot be ruled out  │    ║
║  │ ⚠ Other affected hosts: scanner coverage last run 48h ago │    ║
║  │                                                            │    ║
║  │ Confidence label: HIGH for exploit analysis (3 sources)   │    ║
║  │ Confidence label: MEDIUM for blast radius (1 source)      │    ║
║  │ Confidence label: LOW for lateral movement (no telemetry) │    ║
║  └────────────────────────────────────────────────────────────┘    ║
╚══════════════════════════════════════════════════════════════════╝
```

#### 3.2.2 Continuous Orientation Updates

Commander AI updates the briefing at each significant event:

| Trigger | AI Action |
|---|---|
| New evidence arrives (scanner result, EDR telemetry) | Update blast radius section, revise confidence labels |
| Action completed (containment, patch) | Move to "done" list, update "what's been done" |
| New case bound to War Room | Expand briefing scope, correlate with existing analysis |
| Validation result (pass/fail) | Update status, revise recommended actions |
| Time elapsed without progress | Surface stalling warning, recommend escalation |
| External intelligence update (new IOC, KEV update) | Update exploit analysis section |

#### 3.2.3 AI Grounding Rules (War Room Mode)

| Rule | Constraint |
|---|---|
| Data sources | Only Commander-held data: case data, risk objects, COIM-G, asset inventory, identity graph, connector signals, audit events |
| Confidence labelling | Every analytical statement carries a confidence label (HIGH/MEDIUM/LOW) with source count |
| Uncertainty | Explicitly calls out what is NOT known, what cannot be confirmed, what requires validation |
| Recommendations | Labelled as recommendations, not decisions. Require human approval before execution. |
| No external writes | AI never triggers containment, patching, or notification. Only produces recommendations and drafts. |
| Audit | Every AI-generated briefing is versioned and stored as a case artefact |

### 3.3 Commander AI Exploit Deep-Dive

Beyond the orientation briefing, Commander AI can produce a **detailed exploit analysis** on demand:

| Analysis Section | Content |
|---|---|
| **Vulnerability Profile** | CVE description, affected products/versions, CVSS vector breakdown, CWE classification |
| **Exploit Mechanics** | How the exploit works (attack vector, preconditions, payload delivery, post-exploitation) — grounded in ATT&CK technique mapping |
| **Estate Exposure Assessment** | Which assets in the tenant's estate run affected software, how many are patched vs unpatched, external vs internal |
| **Compensating Control Assessment** | Which existing controls (WAF rules, network segmentation, EDR policies) partially mitigate this exploit |
| **Historical Pattern** | Has this CVE family been exploited before? Similar CVEs in the estate? Previous cases for same asset? |
| **Remediation Options** | Patch (with estimated effort), virtual patch (WAF rule), containment (network isolation), accept (with risk quantification) |

**Grounding:** All analysis is derived from data already in Commander (COIM source classification, ATT&CK bindings, asset inventory, control coverage model, historical cases). Commander AI does NOT search the internet or call external APIs — it reasons over its own data lake.

---

## 4. War Room Subscription Model ("Follow This War Room")

### 4.1 Concept

Any authorised user can **subscribe** to an active War Room, choosing their preferred delivery channel and update cadence. Subscriptions persist until the War Room closes or the user unsubscribes.

### 4.2 Subscription Options

| Option | Behaviour |
|---|---|
| **Channel: Teams Adaptive Card** | Structured update posted as an Adaptive Card in the subscriber's Teams chat (or a configured channel). Includes: current status, latest actions, next expected update, deep link to War Room. |
| **Channel: Email (Structured)** | Templated email with sections: Status Summary, Actions Since Last Update, Open Blockers, Next Steps, Deep Link. |
| **Channel: Email (Summary)** | Condensed plain-text summary suitable for mobile/executive reading. |
| **Channel: In-App** | Notification badge + War Room activity feed in Commander UI. |

| Cadence | When Updates Sent |
|---|---|
| **Live** | Every significant event (action completed, escalation, state change, new case bound). May produce 5-15 updates/hour during active P0. Recommended for: coordinating analysts. |
| **Hourly** | Structured digest every 60 minutes during `activated` state. Recommended for: senior stakeholders actively monitoring. |
| **Four-hourly** | Structured digest every 4 hours. Recommended for: management awareness without overload. |
| **End-of-day** | Single summary at configurable time (default: 18:00 local). Recommended for: executive awareness, next-day shift briefing. |
| **On state change** | Updates only when War Room transitions state (activated → monitoring → winding_down → closed). Recommended for: peripheral stakeholders who need to know status but not detail. |

### 4.3 Subscription Governance

| Rule | Enforcement |
|---|---|
| Only authorised roles can subscribe | RBAC-governed: L1+ analyst for in-app, L2+ for Teams/email, Manager+ for live cadence |
| Subscription creates audit record | Who subscribed, when, which channel, which cadence |
| Unsubscribe on War Room close | All subscriptions auto-terminated, final close-out report sent |
| No sensitive content in email/Teams | Updates contain case references, status, and actions — NOT raw vulnerability details, exploit code, or PII. Deep link for full detail. |
| Subscriber can escalate | If subscriber notices stalling or missing information, they can flag from within the update (button in Adaptive Card or reply-to-escalate in email) |

### 4.4 Update Content Template

Every subscription update (regardless of channel) follows this structure:

```
WAR ROOM UPDATE — WR-2026-0001
Status: ACTIVATED | Duration: 4h 12m | Bound Cases: 2
Senior Owner: CISO (acknowledged)

SINCE LAST UPDATE (1h ago):
• Network containment APPROVED and EXECUTED (PROD-WEB-01 isolated)
• Lateral movement assessment: NO EVIDENCE of lateral movement (EDR confirmed)
• Patch deployment: IN PROGRESS (estimated 2h remaining)

OPEN BLOCKERS:
• PCI QSA notification draft awaiting approval (SLA: 20h remaining)

NEXT EXPECTED:
• Patch deployment completion (~2h)
• Post-patch validation scan (~30min after patch)

COMMANDER AI CONFIDENCE: HIGH (exploit contained, no lateral movement)

[View War Room] [Escalate] [Unsubscribe]
```

---

## 5. War Room Close-Out Audit Report

### 5.1 Purpose

When a War Room transitions to `closed`, the system generates a **comprehensive close-out audit report** — a complete, structured, auditable record of everything that happened during the War Room's lifetime.

### 5.2 Report Structure

```
═══════════════════════════════════════════════════════════════════
COMMANDER SDR — WAR ROOM CLOSE-OUT AUDIT REPORT
═══════════════════════════════════════════════════════════════════

War Room: WR-2026-0001
Activation: 2026-01-18T06:01:00Z
Closure: 2026-01-19T14:30:00Z
Total Duration: 32h 29m
Senior Owner: CISO

───────────────────────────────────────────────────────────────────
1. EXECUTIVE SUMMARY
───────────────────────────────────────────────────────────────────

Trigger: Active exploitation of CVE-2026-9999 on PROD-WEB-01
Outcome: RESOLVED — vulnerability patched, no data exfiltration
confirmed, blast radius contained to single host.

Key Metrics:
• Time to containment: 1h 12m (from activation to network isolation)
• Time to remediation: 8h 45m (from activation to patch deployed)
• Time to validation: 12h 30m (from activation to validated_pass)
• Time to War Room closure: 32h 29m (includes monitoring period)
• SLA compliance: YES (4h triage SLA met, 24h resolution SLA met)
• Escalations: 1 (PCI QSA notification)
• Participants: 6 active, 4 subscribers

───────────────────────────────────────────────────────────────────
2. BOUND CASES
───────────────────────────────────────────────────────────────────

| Case | Type | Priority | Status at Close | Owner |
|------|------|----------|-----------------|-------|
| CASE-2026-0001 | external-attack-correlation | P0 | closed_by_system | CISO |
| CASE-2026-0042 | vulnerability | P1 | closed_by_system | Alice |

───────────────────────────────────────────────────────────────────
3. TIMELINE (FULL AUDIT)
───────────────────────────────────────────────────────────────────

| Timestamp | Actor | Action | Detail |
|-----------|-------|--------|--------|
| 06:00:00 | binding-engine | Case created | CASE-2026-0001 from RO-003 |
| 06:01:00 | system | P0 activated | Rule: KEV + CVSS ≥ 9.5 |
| 06:01:30 | system | War Room activated | WR-2026-0001 |
| 06:02:00 | Commander AI | Orientation briefing | v1 generated |
| 06:05:00 | CISO | Acknowledged ownership | — |
| 06:15:00 | SOC Manager | Containment approved | PROD-WEB-01 isolation |
| 06:18:00 | push-engine (dry-run) | Containment executed | Firewall rule applied |
| 07:13:00 | Commander AI | Briefing updated | Lateral movement: none detected |
| ... | ... | ... | ... |
| 14:45:00 (Day 2) | validation-engine | validated_pass | Rescan confirms CVE absent |
| 15:00:00 | CISO | War Room → monitoring | — |
| 20:00:00 | CISO | War Room → winding_down | — |
| 14:30:00 (Day 2) | CISO | War Room → closed | Close-out approved |

───────────────────────────────────────────────────────────────────
4. MEMBERSHIP & PARTICIPATION
───────────────────────────────────────────────────────────────────

| User | Role | Joined | Left | Actions Taken |
|------|------|--------|------|---------------|
| CISO | senior_owner | 06:01 | 14:30 | 8 (approvals, decisions) |
| SOC Manager | coordinator | 06:03 | 20:00 | 12 (containment, routing) |
| Alice Analyst | analyst | 06:05 | 15:00 | 23 (evidence, sub-actions) |
| Bob Platform | analyst | 06:10 | 12:00 | 7 (patch deployment) |
| Carol Intel | analyst | 06:30 | 10:00 | 4 (threat intel correlation) |
| Dave Observer | observer | 07:00 | 14:30 | 0 (observation only) |

Subscribers:
| User | Channel | Cadence | Updates Received |
|------|---------|---------|-----------------|
| CTO | email_summary | end_of_day | 2 |
| VP Engineering | teams_adaptive_card | four_hourly | 8 |
| Legal | email_structured | on_state_change | 4 |
| Compliance | in_app | hourly | 28 |

───────────────────────────────────────────────────────────────────
5. COMMANDER AI ANALYSIS RECORD
───────────────────────────────────────────────────────────────────

Briefing versions generated: 7
Exploit deep-dive requested: 1 (by SOC Manager at 06:20)
Recommendations generated: 12
Recommendations actioned: 9
Recommendations declined: 2 (with reason)
Recommendations pending at close: 1 (accepted risk)
Confidence accuracy (post-hoc): HIGH statements 100% accurate,
  MEDIUM statements 85% accurate, LOW statements: 1 revised

───────────────────────────────────────────────────────────────────
6. COMMUNICATION RECORD
───────────────────────────────────────────────────────────────────

Outbound emails: 4 (acknowledgement, 2 updates, closure)
Inbound emails: 2 (vendor confirmation, QSA acknowledgement)
Teams Command Bridge posts: 3
Teams Adaptive Card updates (subscribers): 8
In-app notifications: 28
Escalations triggered: 1

───────────────────────────────────────────────────────────────────
7. DECISIONS MADE
───────────────────────────────────────────────────────────────────

| # | Decision | Decider | Time | Outcome |
|---|----------|---------|------|---------|
| 1 | Approve network containment | SOC Manager | 06:15 | Executed successfully |
| 2 | Approve emergency patch deploy | CISO | 08:30 | Completed 14:45 |
| 3 | Accept residual risk (monitoring) | CISO | 15:00 | War Room → monitoring |
| 4 | Approve PCI QSA notification | CISO | 10:00 | Sent, acknowledged |

───────────────────────────────────────────────────────────────────
8. EVIDENCE CHAIN
───────────────────────────────────────────────────────────────────

| Evidence | Source | Timestamp | Status |
|----------|--------|-----------|--------|
| Initial scan (CVE detected) | Tenable connector | 2026-01-14 | Preserved |
| KEV listing confirmation | CISA KEV feed | 2026-01-17 | Preserved |
| EDR telemetry (no lateral) | CrowdStrike connector | 2026-01-18 | Preserved |
| Post-patch validation scan | Tenable connector | 2026-01-19 | Preserved |
| 30-day stability (pending) | Scheduled rescan | 2026-02-18 | Future |

───────────────────────────────────────────────────────────────────
9. LESSONS & RECOMMENDATIONS (AI-GENERATED, HUMAN-REVIEWED)
───────────────────────────────────────────────────────────────────

• Dwell time (79h) exceeded target (48h). Recommend: increase scan
  cadence on PCI-scope external assets from weekly to daily.
• Patch was available 48h before detection. Recommend: configure
  vendor advisory ingestion to auto-create cases on patch publication.
• Containment approval took 14 minutes. Within SLA but could be
  pre-approved for known-exploited + external-facing scenarios.

───────────────────────────────────────────────────────────────────
10. REPORT DISTRIBUTION
───────────────────────────────────────────────────────────────────

This report auto-distributed to:
• All War Room members (in-app + email)
• All War Room subscribers (via their configured channel)
• Tenant audit repository (immutable record)
• Compliance record (if PCI/SOX/NIS2 applies)

Report ID: WR-AUDIT-2026-0001-v1
Generated: 2026-01-19T14:35:00Z
Generated by: Commander system (close-out-engine actor)
═══════════════════════════════════════════════════════════════════
```

### 5.3 Report Generation Rules

| Rule | Detail |
|---|---|
| Automatic | Report is system-generated on `winding_down → closed` transition. No manual report creation. |
| Immutable | Once generated, the report is append-only (corrections add addenda, never modify). |
| Distributed | Auto-sent to all members and subscribers via their configured channels. |
| AI-assisted | §9 (Lessons & Recommendations) is AI-generated, labelled as such, and requires senior review within 7 days. Unreviewed recommendations are flagged. |
| Retention | Stored permanently in tenant audit repository. Cannot be deleted. |

---

## 6. Teams Integration — The Collaboration Bridge

### 6.1 The Two-Population Problem

The War Room has two populations:

1. **Commander users** — security team, analysts, CISO. They have Commander access. They work the War Room directly.
2. **Non-Commander participants** — infrastructure leads, application owners, DBAs, vendor support, executives. They do NOT have Commander access or security clearance. But they are critical to resolution (they own the assets, they apply the patches, they confirm the fix).

Commander cannot grant everyone security tooling access. It also cannot exclude critical participants from coordination. The solution: **Commander is the source of truth. Teams is the collaboration bridge.**

### 6.2 Architecture: One War Room, Two Surfaces

```
┌─────────────────────────────────────────┐
│         COMMANDER WAR ROOM               │
│         (Source of Truth)                 │
│                                           │
│  Security team works here.               │
│  Full case access, AI, evidence.         │
│  All decisions recorded here.            │
│                                           │
└──────────────────┬────────────────────────┘
                   │
                   │ BIDIRECTIONAL SYNC
                   │
┌──────────────────▼────────────────────────┐
│         TEAMS WAR ROOM CHANNEL            │
│         (Collaboration Bridge)            │
│                                           │
│  Everyone participates here.             │
│  Infrastructure, app owners, vendors,    │
│  executives — whoever is invited.        │
│  No Commander access needed.             │
│                                           │
└───────────────────────────────────────────┘
```

### 6.3 Teams Channel Creation Flow

When the War Room lead decides external participants are needed:

1. Lead clicks **"Create Teams War Room Channel"** from within the Commander War Room
2. Commander auto-populates channel details:

| Field | Auto-Populated Value |
|---|---|
| **Channel name** | `WR-2026-0001 — CVE-2026-9999 Active Exploitation` (War Room ref + sanitised title) |
| **Description** | `Commander SDR Emergency Coordination — P0 Active. Duration: ongoing. Lead: [Senior Owner Name]` |
| **Team** | Tenant's configured security coordination Team (set in Tenant Admin) |
| **Members (auto-added)** | All Commander War Room members (they participate in both surfaces) |
| **Pinned post** | Initial situation briefing (sanitised — appropriate detail level for non-security participants) |

3. Lead then invites external participants:
   - Picks from tenant's **Microsoft 365 directory** (via Graph API — no LDAP configuration needed for cloud tenants; LDAP/hybrid sync supported where configured)
   - Selects individuals or groups: Platform team, specific app owner, vendor contact
   - Each invitee is added to the Teams channel
4. System posts initial structured briefing to the channel
5. Channel is live — bidirectional sync active

### 6.4 Participant Model

| Participant Type | Where They Work | What They See | What They Can Do |
|---|---|---|---|
| **Commander user** (analyst, CISO, SOC Manager) | Commander War Room (full) + Teams channel | Everything in Commander. Sanitised view in Teams. | Full case access, decisions, evidence, AI briefing, actions |
| **Teams-only participant** (platform lead, DBA, vendor, exec) | Teams channel only | Structured updates, action requests, status summaries. NO raw vulnerability detail beyond what's shared. | Respond to requests, confirm actions, provide status, report blockers, ask questions |

### 6.5 Bidirectional Sync

**Commander → Teams (automatic):**

| Trigger | What Posts to Teams Channel |
|---|---|
| War Room state change | Status update card: "War Room moved to MONITORING" |
| Cadence timer fires | Structured update (same format as subscriber updates — §4.4) |
| Action needs external party | **Adaptive Card** with action buttons (see §6.6) |
| Decision made | Decision summary: "Containment approved by SOC Manager" |
| War Room closing | Close-out summary + channel archive notice |

**Teams → Commander (automatic):**

| Teams Activity | What Happens in Commander |
|---|---|
| Adaptive Card response (Confirm/Blocked/Not Yet) | Ingested as `CommunicationEvent` on the bound case. Updates sub-action status. |
| Message tagged `@Commander` or using keyword prefix `[UPDATE]` | Ingested as case communication event. Appears in case timeline. |
| File shared in channel | Flagged for analyst review. If approved → linked as case evidence. |
| Participant posts a blocker | Ingested, flagged to War Room lead, appears in "Open Blockers" section |

### 6.6 Adaptive Cards for External Participants

When Commander needs something from a non-Commander participant, it posts a structured Adaptive Card:

```
┌─────────────────────────────────────────────────────┐
│  🔴 COMMANDER SDR — ACTION REQUIRED                  │
│                                                       │
│  War Room: WR-2026-0001                              │
│  For: Bob (Platform Lead)                            │
│                                                       │
│  REQUEST:                                            │
│  Please confirm emergency patch for CVE-2026-9999    │
│  has been applied to PROD-WEB-01.                    │
│                                                       │
│  Requested by: Alice (Security Analyst)              │
│  SLA: Response needed within 2 hours                 │
│                                                       │
│  [✓ Confirmed — Patch Applied]                       │
│  [⏳ In Progress — Estimated completion: ___]        │
│  [🚫 Blocked — Reason: ___]                         │
│  [❓ Need More Information]                          │
│                                                       │
└─────────────────────────────────────────────────────┘
```

Response flows back to Commander → updates sub-action status → appears in War Room timeline → SLA clock adjusted accordingly.

### 6.7 Information Boundary (What Teams Participants Never See)

| Protected from Teams | Reason |
|---|---|
| Raw CVSS/EPSS scores and exploit details | Security clearance boundary — they don't need to know HOW bad it is, just what to DO |
| Commander AI orientation briefings | Grounded in sensitive case data not appropriate for non-security staff |
| Other cases or risk objects | Need-to-know boundary |
| Internal security decisions that don't concern them | Operational security |
| Evidence chain details (scanner data, EDR telemetry) | Security tooling output |

The War Room lead controls what additional context to share in the Teams channel. The system defaults to operational requests ("do this thing, confirm when done") without exposing the security reasoning behind them.

### 6.8 Channel Lifecycle

| Event | Teams Channel Behaviour |
|---|---|
| War Room activates | Channel created (if lead opts in). Auto-named. Members added. Pinned briefing posted. |
| War Room → monitoring | Status update posted. Cadence reduces. |
| War Room → winding_down | "Thank you" post. Final actions listed. |
| War Room → closed | Close-out summary posted. Channel **archived** (read-only, not deleted — preserves audit trail in Teams). |
| Post-close | Channel remains archived. Accessible for review but no new posts. |

### 6.9 Email Integration — Structured War Room Updates

For participants who prefer email or where Teams is not available:

| Capability | Description |
|---|---|
| **Structured update emails** | Templated, section-based emails following the update template in §4.4. Machine-parseable headers for mail rules. |
| **Reply-to-escalate** | Subscriber replies with "ESCALATE" → Commander ingests and triggers escalation pathway. |
| **Reply-to-confirm** | Subscriber replies with "CONFIRMED" or "BLOCKED: [reason]" → parsed and ingested as case communication event. |
| **Opt-in to richer updates** | Email includes link to upgrade subscription cadence (e.g., from daily to hourly if situation worsens). |
| **Close-out report delivery** | Full audit report delivered as formatted email with PDF attachment to all subscribers. |

### 6.10 Configuration (Tenant Admin)

| Setting | Where Configured | Default |
|---|---|---|
| Default Teams team for War Room channels | Tenant Admin → Communication Settings | Must be set before Teams War Room can be created |
| Auto-create Teams channel on War Room activation | Strategy policy (`war-room-cadence`) | OFF (lead opts in manually) |
| M365 directory source for participant lookup | Tenant Admin → Identity Provider Settings | Graph API (cloud) or hybrid sync |
| Channel naming template | Tenant Admin → Communication Settings | `{warRoomRef} — {sanitisedTitle}` |
| Default pinned post template | Tenant Admin → Communication Templates | System default (editable) |
| Auto-archive on War Room close | Strategy policy | ON |

---

## 7. Communication Cadence Engine

### 7.1 The Problem Solved

During a P0, communication is chaotic. Some stakeholders get too many updates, others get none. Updates are ad-hoc, inconsistent in structure, and miss recipients.

### 7.2 Cadence Profiles (Strategy-Driven)

Communication cadence is a **new strategy surface**: `surfaceType: 'war-room-cadence'`

```typescript
surfaceType: 'war-room-cadence'
configuration: {
  activatedProfile: {
    memberUpdateMinutes: 60,      // active members get hourly
    subscriberLiveMaxPerHour: 10, // live subscribers capped at 10/hr
    execSummaryMinutes: 120,      // exec summary every 2h
    stallingAlertMinutes: 15,     // if no action for 15min, alert
  },
  monitoringProfile: {
    memberUpdateMinutes: 240,     // members get 4-hourly
    subscriberDigestMinutes: 480, // subscribers get 8-hourly
    execSummaryMinutes: 480,      // exec summary every 8h
  },
  windingDownProfile: {
    memberUpdateMinutes: 480,     // daily
    subscriberDigestMinutes: 1440, // daily
  },
  closeOutDelivery: 'immediate',  // report sent immediately on close
}
```

### 7.3 Stalling Detection

If no action is recorded in the War Room for longer than `stallingAlertMinutes`:
- Commander AI generates a stalling warning
- Alert pushed to senior owner
- If unacknowledged for another cycle → auto-escalate to next in escalation path
- This prevents the "everyone assumed someone else was working on it" failure mode

---

## 8. New Entity & Strategy Surface Summary

### 8.1 New Entity

| Entity | Type | Relationship to Cases |
|---|---|---|
| `WarRoom` | `war-room` | Overlay — wraps 1+ cases without replacing their type or lifecycle |

### 8.2 New Strategy Surface

| # | Surface Type | Purpose |
|---|---|---|
| 18 | `war-room-cadence` | Communication cadence profiles for each War Room state |

### 8.3 New System Actors

| Actor | Responsibility |
|---|---|
| `war-room-activation-engine` | Detects P0 conditions → creates War Room entity |
| `war-room-communication-engine` | Manages cadence, distributes updates, handles subscriptions |
| `close-out-engine` | Generates audit report on War Room closure |
| `commander-ai-triage` | Produces orientation briefings, exploit analysis, recommendations |

---

## 9. Implementation Phases

### Phase 1 — War Room Entity & Lifecycle (v1.4)

| Task | Effort |
|---|---|
| Define `WarRoom` entity in `packages/contracts/` | Small |
| Implement 4-state lifecycle with transition rules | Medium |
| War Room activation engine (P0 detected → War Room created) | Medium |
| Bind War Room to existing P0 case seed data | Small |
| War Room UI page (extend current `/war-room/p0/`) | Medium |

### Phase 2 — Commander AI Orientation (v1.4–v1.5)

| Task | Effort |
|---|---|
| Commander AI War Room Triage Mode definition | Medium |
| Orientation Briefing generator (grounded in case + COIM data) | Large |
| Continuous update triggers | Medium |
| Exploit deep-dive on-demand generator | Large |
| AI output audit trail (versioned briefings stored as artefacts) | Medium |

### Phase 3 — Subscription & Communication (v1.5)

| Task | Effort |
|---|---|
| Subscription model (follow War Room) | Medium |
| Teams Adaptive Card updates | Medium |
| Email structured updates | Medium |
| Cadence engine (strategy-driven update scheduling) | Medium |
| Stalling detection | Small |

### Phase 4 — Close-Out & Audit (v1.5–v1.6)

| Task | Effort |
|---|---|
| Close-out report generator | Large |
| Auto-distribution to members/subscribers | Medium |
| AI-generated lessons/recommendations (with review workflow) | Medium |
| Audit repository integration (immutable storage) | Medium |

---

## 10. Doctrinal Compliance

| Assertion | Compliance |
|---|---|
| Assertion 1: Cases are system-owned | ✅ War Room does NOT create, close, or transition cases. Cases retain their own lifecycle. War Room is an overlay. |
| Assertion 2: P0 propagates reason, scope, owner, expiry, evidence | ✅ War Room entity captures all of these. AI briefing surfaces them continuously. |
| Commander AI grounding | ✅ AI operates only on Commander-held data. Confidence labelled. Uncertainty explicit. No external writes. |
| Audit requirement | ✅ Every action, decision, membership change, subscription, and communication is audit-recorded. Close-out report is immutable. |
| Strategy-driven | ✅ Cadence profiles live in strategy policy. Activation rules configurable. Subscription governance RBAC-controlled. |
| SOC boundary | ✅ War Room does not write to SOC tools. Containment actions go through push-governance/dry-run pathway. |

---

## 11. Decisions Required

**DEC-WRCEP-001:** Approve the War Room as a first-class **overlay entity** (not a case type, not merely a UI composition). Confirm 4-state lifecycle (activated → monitoring → winding_down → closed).

**DEC-WRCEP-002:** Approve Commander AI War Room Triage Mode with continuous orientation briefings, exploit analysis, and grounded recommendations.

**DEC-WRCEP-003:** Approve the War Room Subscription Model (follow with configurable channel + cadence). Confirm cadence options: live, hourly, four-hourly, end-of-day, on-state-change.

**DEC-WRCEP-004:** Approve close-out audit report generation (automatic, immutable, distributed). Confirm AI-generated lessons section with mandatory senior review.

**DEC-WRCEP-005:** Approve new strategy surface `war-room-cadence` (surface #18).

---

## 12. References

- Commander Spec #40 (P0 Zero-Day Priority Override)
- Commander Spec #44 (P0 Zero-Day War Room UI)
- Commander Spec #58 (Security OODA Loop)
- Commander Spec #26 (Case Communication & Broadcast Channel)
- Commander Spec #26a (Closed-Loop Email Case Communication Lifecycle)
- Commander Master Proposition v5.0 §18 (Commander AI — Four Modes)
- CMEP-1.0 (Case Management Excellence Proposal — companion document)
- [MIT NICS — Next-Generation Incident Command System](https://www.ll.mit.edu/partner-us/available-technologies/next-generation-incident-command-system-nics)
- [Mattermost — Governed War Room Architecture](https://mattermost.com/blog/your-last-incident-war-room-was-an-improvisation/)

Content was rephrased for compliance with licensing restrictions.
