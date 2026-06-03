# Commander SDR — AI Layer Design Proposal

**Document Reference:** AIDP-1.1  
**Status:** ACCEPTED — Ready for Kiro Spec Production  
**Prepared by:** Seiertech Architecture  
**Reviewed by:** Kiro Architecture Session (2026-06-03)  
**Date:** June 2026  
**Location:** This document is a HANDOFF artefact. It is NOT part of the build repo main branch.

---

## Kiro Spec Production Instruction

> This document is the accepted AI Layer design. Your task is to produce child specifications (AIDP-S01 through AIDP-S09) from this design.
>
> **Before producing specs, read the following reference documents:**
>
> AUTHORITY:
> 1. `docs/00_authority/AUTHORITY_MODEL.md` — precedence stack
> 2. `docs/00_authority/PERFORMANCE_DOCTRINE.md` — performance constraints
> 3. `docs/01_product/source_Commander_SDR_Master_Proposition_v5_0.md` — §18 (Commander AI)
> 4. `DECISIONS.md` — existing architectural decisions
> 5. `AGENTS.md` — AI guardrails and prohibited actions
>
> COMMANDER AI GROUNDING:
> 6. `.kiro/steering/ai-grounding.md` — ALWAYS-ON grounding rules
> 7. `.kiro/specs/13-security-c2/design.md` — §"Commander AI constraints for Security C2"
> 8. `docs/99_source_archive/baseline_v2_6_2/docs/01_active_build/Commander_SDR_AI_Build_Playbooks_v1_7.md` — AI build rules
>
> EXISTING SPECS THAT TOUCH AI:
> 9. `.kiro/specs/24-security-c2-p0-war-room/requirements.md` — Requirement 5
> 10. `.kiro/specs/06-case-management/design.md` — Case Action Algorithm
>
> EXISTING IMPLEMENTATION:
> 11. `packages/contracts/src/entities/` — all canonical entity types
> 12. `packages/contracts/src/resolvers/` — all resolvers
> 13. `packages/contracts/src/engines/` — engines
> 14. `packages/contracts/src/entities/strategy.ts` — 13 strategy surfaces
>
> DESIGN SYSTEM:
> 15. `docs/06_ui_build_reference/DESIGN_SYSTEM.md` — DS-1.0
>
> **Do not begin implementation until child specs are reviewed and accepted.**

---

## Table of Contents

1. Purpose and Scope
2. Relationship to Existing Commander AI
3. Strategic Intent (Three Horizons)
4. Component Architecture
5. Persona System
6. Admin Plane Control Model
7. Dormant Telemetry — Build Specification
8. AI UI Interaction Model
9. AI Placement Model
10. Non-Negotiable Architectural Decisions
11. Resolved Design Decisions
12. Build Sequence and Spec Index
13. Proposal Summary

---

## 1. Purpose and Scope

This document is the accepted design for the Commander SDR AI Layer. It defines the AI engine architecture, its constraints, its personas, its provider model, and its admin controls.

This proposal:
- Extends the existing Commander AI framework (Master Proposition §18)
- Introduces a persona engine, provider abstraction, channel routing, and dormant telemetry
- Defines the AI admin control model (Seiertech and tenant authority boundaries)
- Establishes the AI placement model for future page-by-page wiring

This proposal does NOT:
- Specify where AI appears on specific pages (decided during page build via markers)
- Reference specific future features or banked capabilities (deltas handled at build time)
- Replace or contradict any existing Commander AI specification
- Depend on any unbuilt feature — it stands alone as the AI engine baseline

---

## 2. Relationship to Existing Commander AI

Commander AI is defined in the Master Proposition §18 with four operating modes: Estate, Engineering, Triage, Reporting.

### 2.1 Mode Supersession (DEC-AIDP-001 — Resolved)

The original 4 modes are **superseded by the persona-driven channel model**. The user's RBAC role determines their AI persona automatically. There is no manual mode selection by the user.

| Original Mode | Replaced By |
|---|---|
| Estate Mode | Persona determined by user role (RBAC) |
| Engineering Mode | Same — persona determined by role |
| Triage Mode | Same — persona determined by role |
| Reporting Mode | Same — persona determined by role |

The persona system is richer, more flexible, and role-appropriate without requiring the user to select a mode.

### 2.2 The Enhancement Model

The AI layer is an **enhancement layer** — not a feature layer. Every AI surface enhances an existing Commander feature. If AI is unavailable, disabled, or degraded, the host feature continues to operate normally.

| Commander Feature | AI Enhancement | Behaviour if AI Off |
|---|---|---|
| War Room | War Room AI — superpersona, multi-perspective crisis reasoning | War Room operates normally |
| Case Management | Case AI — role-specific case reasoning, next best action | Case management operates normally |
| Vulnerability Management | Vulnerability AI — prioritisation reasoning, exploit context | Vulnerability management operates normally |
| Threat Intelligence | IOC / Threat Intel AI — indicator enrichment, attribution | Threat intel operates normally |
| Adherence / Governance | Adherence AI — control mapping, evidence reasoning | Governance surfaces operate normally |
| Tenant Administration | Tenant Admin AI — configuration guidance | Tenant admin operates normally |
| Executive / CISO View | Executive AI — narrative briefings, risk summaries | CISO view operates normally |
| Action / Approval | Action AI — approval reasoning, impact assessment | Approval workflows operate normally |
| Global | Global AI — cross-platform assistant | Platform operates normally |

### 2.3 Existing AI Constraints Honoured (Carried Forward — Non-Negotiable)

| Constraint | Source |
|---|---|
| **Grounding rule:** Outputs MUST be grounded in Commander-held data. Label uncertainty. No invented findings. | `.kiro/steering/ai-grounding.md` |
| **SOC boundary:** Commander reads from SOC systems, never writes. Never triages SOC alerts. | Doctrinal Assertion 3 |
| **Case ownership:** Cases are system-owned. No manual creation, closure, or override via AI. AI does NOT autonomously trigger cases or mutate lifecycle state. | Doctrinal Assertion 1; Master Proposition §18 |
| **No auto-approve:** AI provides reasoning and impact assessment on approvals. AI NEVER auto-approves. Human clicks the button. Always. (DEC-AIDP-006) | Resolved in this proposal |
| **Strategy-driven:** All configurable security behaviour lives in strategy surfaces. AI platform configuration lives in admin plane (see DEC-AIDP-002). | Strategy-driven principle + accepted exception |
| **Performance doctrine:** AI outputs must not degrade application performance. | Performance Doctrine |
| **Terminology:** Use "adherence" not "compliance" throughout all Commander surfaces. | Commander terminology standard |
| **Audit logging:** ALL AI channel interactions are audit-logged. This cannot be disabled by any admin tier. (DEC-AIDP-003) | Resolved in this proposal |
| **Secure-by-Design awareness:** If AI recommends an action that would violate known Secure-by-Design standards, it must self-check and refuse or include a warning. | Persona guardrail |
| **Event correlation boundary:** Event correlation ONLY from primary system connectors. SOC feeds provide aggregate metrics only — display purpose, no asset attribution. | Hard boundary (locked) |

---

## 3. Strategic Intent (Three Horizons)

The AI layer is designed across three delivery horizons. Each is architecturally compatible with the next. Moving between horizons requires configuration change, not code restructure.

| Horizon | State | LLM Source | Seiertech Action Required |
|---|---|---|---|
| 1 — Launch | Active | Tenant brings own API key (BYOK) | Provision provider registry, enable channels per tenant |
| 2 — Scale | Future | Commander-managed AI pipe | Configure Commander provider tier, commercial arrangement in place |
| 3 — Native | Long-term | Commander fine-tuned model | Activate dormant telemetry lake, train on transaction corpus |

The provider abstraction layer makes all three horizons possible without rework. No application code calls an LLM directly. All AI channel calls route through a provider interface. The implementation behind that interface is configuration.

---

## 4. Component Architecture

The AI layer consists of five components. Each is independent and testable in isolation.

### 4.1 Provider Registry

Stores and manages LLM connection configurations. Single point of LLM provider configuration for the entire Commander platform.

- Stores provider type, endpoint, authentication credentials, model string, token limits
- Supports three provider types: commercial API (BYOK), Commander pipe, self-hosted/custom endpoint
- Supports multiple connections per tenant with per-channel assignment (single-connection UI at launch, multi-connection unlocked via Seiertech admin toggle)
- Includes a test harness — fire a known validation prompt, confirm response format and latency before activating
- Credentials encrypted at rest, never exposed to client layer
- **Timeout configuration per provider** — graceful fallback if provider is slow or unresponsive
- **Rate limiting per user, per channel, per tenant** — prevents token budget exhaustion by a single heavy user

### 4.2 Persona Engine

Loads persona definitions from the persona registry, applies persona traits, injects vendor experience and domain knowledge, and executes persona-specific reasoning.

- Supports 13 canonical personas plus the War Room superpersona
- Supports tenant-specific persona overrides with inheritance from canonical personas
- Supports persona versioning, diffing, and rollback
- Persona objects are data, not code — stored in the persona registry, read at runtime, no deployment required to update
- Persona switching is logged and explainable
- **Persona selected automatically from user's RBAC role** — no manual persona/mode selection
- **Secure-by-Design guardrail** — all personas include `sbd_check: true` preventing recommendations that violate SbD standards
- **Temperature configurable per channel** — conservative for War Room (evidence-first), standard for routine assistance

### 4.3 Persona Registry

Canonical store for all persona objects. A managed data store, not a configuration file.

- YAML as the authoring format — human-readable for Seiertech team editing
- Auto-compiled to JSON at save — machine-readable for the persona engine
- Three edit levels:
  - Level 1 — Tune: tone modifiers, guardrail additions — no approval required
  - Level 2 — Extend: vendor/domain overrides — peer confirmation required
  - Level 3 — Rewrite: base prompt, identity fields — approval gate required
- Inheritance model: tenant persona overrides inherit from canonical personas and declare only what differs
- War Room superpersona is always Level 3 edit — requires explicit approval
- **Persona drift detection** — alert Seiertech when tenant overrides significantly diverge from canonical base

### 4.4 Channel Routing and Injection Middleware

Determines which persona is active for each AI channel request and constructs the full prompt context.

- Each of the 9 AI channels maps to one or more personas
- Context-aware persona selection — active user role (RBAC), current feature context, and channel all inform selection
- Supports multi-persona blending for the War Room superpersona
- Supports persona escalation chains — L1 → L2 → L3 → DFIR
- Channel enable/disable controlled independently per tenant
- **Channels are internal routing** — users never see or select channels. They interact via the three UI patterns (§8).
- **AI NEVER auto-approves** — Action/Approval channel provides reasoning only. Human decides.

### 4.5 Dormant Telemetry Pipeline

Fully built at launch and completely inactive by default. Captures structured transaction data for future AI training and RAG augmentation. Costs nothing until activated.

- Gated by a single server-side environment variable: `ENABLE_DORMANT_TELEMETRY=false`
- The flag is Seiertech-controlled only — never exposed to tenant admins or the client layer
- When dormant: gateway interceptor performs an early abort — no serialisation, no storage write, no CPU overhead
- When active: transaction envelopes written to compressed cold storage (`.json.gz`) per tenant prefix
- Telemetry failures are fully isolated — never surface to user sessions
- Both paths — dormant abort and active capture — fully built and fully tested at launch
- **Data governance and regulatory position deferred until activation** — no pre-commitment. When Seiertech activates (Horizon 3), a separate data governance review is triggered.
- **PII filtered at gateway** before serialisation. Parameters containing PII replaced with `[PII-FILTERED]`.

---

## 5. Persona System

### 5.1 Canonical Persona Registry — 13 Personas

| Persona | Tag Group | Primary Channels | Edit Level Floor |
|---|---|---|---|
| CISO | GRC, Executive | Executive / CISO AI, Global AI | Level 2 |
| Security Architect | Engineering | Global AI, War Room AI | Level 2 |
| Security Engineer | Engineering | Case AI, Global AI | Level 1 |
| Network Security Engineer | Engineering | Case AI, Vulnerability AI | Level 1 |
| Security Operations Manager | SOC | Case AI, War Room AI | Level 2 |
| Vulnerability Manager | Risk | Vulnerability AI, Case AI | Level 1 |
| Analyst L1 | SOC | Case AI | Level 1 |
| Analyst L2 | SOC | Case AI | Level 1 |
| Analyst L3 | SOC | Case AI, War Room AI | Level 1 |
| DFIR Analyst | SOC | War Room AI, Case AI | Level 2 |
| Risk Analyst | GRC | Global AI, Adherence AI | Level 2 |
| Compliance Analyst | GRC | Adherence AI, Global AI | Level 1 |
| Auditor | GRC | Adherence AI | Level 2 |

### 5.2 War Room Superpersona

War Room is a Commander feature first. It exists and operates regardless of AI state. War Room AI enhances the War Room feature — it does not own it.

- The superpersona merges CISO, Architect, Engineer, SOC, DFIR, Risk, and Adherence reasoning
- War Room AI is enabled by default when Commander AI is licensed
- Switchable off by Seiertech admin — follows same enable/disable model as all other AI enhancements

### 5.3 War Room Grounding Model (DEC-AIDP-005 — Mandatory)

To prevent hallucination under crisis framing, War Room AI enforces the following output format. Enforced at prompt level — not advisory. Optionally available to other channels.

```
FINDING (from Commander data):       [statement grounded in a specific Commander data source]
INFERENCE (reasoned, not confirmed):  [statement derived from available data — explicitly labelled]
UNKNOWN (insufficient data):          [gap explicitly declared — no invented content]
```

**Grounding rules:**
- War Room AI may only reason from data injected into the active session context from Commander
- War Room AI may not draw on general knowledge to fill data gaps without explicit INFERENCE labelling
- No invented CVEs, hostnames, IP addresses, timelines, or attribution
- When INFERENCE statements exceed the configured confidence threshold, a low-data-confidence banner is prepended
- All War Room AI interactions are audit-logged — cannot be disabled

### 5.4 Persona Schema

Every persona is a YAML object following the canonical schema. Enforced at save time. Invalid schemas rejected.

```yaml
persona:
  meta:
    id: analyst_l2
    version: "1.2"
    status: active              # active | draft | deprecated
    created_by: team_seiertech
    last_modified: 2026-06-03
    tags: [SOC, Investigation]
    inherits_from: analyst_l1   # optional — pulls base fields down

  identity:
    role: L2 Security Analyst
    seniority: mid
    background: ""
    industry_exposure: [financial, healthcare]
    org_scale: [mid-market, enterprise]

  system_prompt:
    base: |
      You are the L2 Analyst persona...
    tone_modifiers: []
    guardrails:
      never: []
      when_uncertain: state assumptions explicitly
      conflict_handling: escalate to L3
      sbd_check: true           # Secure-by-Design awareness

  channel_assignments:
    - case_ai
    - war_room_ai

  vendor_experience:
    inherits: true
    overrides: []

  domain_knowledge:
    inherits: true
    overrides: []

  governance:
    requires_approval: false
    approved_by: ""
    rollback_version: "1.1"
```

---

## 6. Admin Plane Control Model

### 6.1 Authority Boundary

The admin plane enforces a two-tier authority model. Seiertech sets the ceiling. Tenant admins operate within it.

**Design Decision (DEC-AIDP-002 — Resolved):** AI configuration lives in the admin plane, NOT strategy surfaces. This is an accepted exception to the "all configurable behaviour in strategy surfaces" principle. Rationale: AI configuration is platform infrastructure (provider keys, persona management, telemetry flags), not security policy.

| Control | Seiertech Admin | Tenant Admin |
|---|---|---|
| Provider registry — add/edit/test connections | Full control | BYOK key only (own tenant) |
| Provider tier assignment per tenant | Full control | Not visible |
| AI channel enable/disable per tenant | Full control | Within Seiertech-enabled ceiling |
| Persona enable/disable per tenant | Full control | Within Seiertech-enabled ceiling |
| Persona edit — Level 1 (tone, guardrails) | Full control | Permitted |
| Persona edit — Level 2 (vendor/domain overrides) | Full control | Not permitted |
| Persona edit — Level 3 (base prompt, identity) | Full control — approval gate | Not permitted |
| War Room AI enable/disable | Full control | Not permitted |
| Dormant telemetry flag | Full control — Seiertech only | Not visible |
| Token budget per channel | Full control | View only |
| Rate limiting configuration | Full control | Not visible |
| War Room confidence threshold | Full control | Not visible |

### 6.2 Token Usage Monitoring

- Usage tracked per channel, per tenant, per user
- Alert on threshold approach (80% of budget consumed)
- Dashboard in Seiertech admin: consumption trends, top consumers, cost projection
- Tenant admin sees: their own usage summary (view only)

### 6.3 War Room Admin Controls

| Setting | Options | Default |
|---|---|---|
| War Room AI access | Enabled / Disabled | Enabled (if Commander AI licensed) |
| Evidence-first mode | Enforced / Advisory | Enforced |
| Confidence threshold | 20% / 40% / 60% inference ceiling | 40% |
| Escalation trigger | Auto / Manual | Manual |
| Audit logging | Always on | Cannot be disabled |

### 6.4 Degraded State UX

When AI is unavailable (provider down, rate limited, disabled):
- AI buttons show disabled state with tooltip: "Commander AI unavailable"
- No loading spinners indefinitely — timeout after configured period (default: 10s)
- Host feature continues working normally — no blocking, no error states on the page
- Banner notification (dismissible): "AI assistance temporarily unavailable. All features continue to work normally."

---

## 7. Dormant Telemetry — Build Specification

The dormant telemetry pipeline is a first-class build deliverable. Ships fully built, fully tested, fully inactive.

> **Kiro Build Instruction:**
> Do not stub this module. Build both the dormant abort path and the active capture path completely.
> Dormant state is a configuration state, not an incomplete build state.
> Acceptance criteria must validate both paths independently.

### 7.1 Gateway Interceptor Pattern

```typescript
async function handleSystemTransaction(payload: TransactionEnvelope) {
  // 1. Execute live application logic — always runs
  const executionResult = await executeLiveApplicationLogic(payload);

  // 2. Dormant gate — abort immediately if not active
  if (process.env.ENABLE_DORMANT_TELEMETRY !== 'true') {
    return executionResult;
  }

  // 3. Active path — background worker only, never blocks user session
  try {
    await dispatchToBackgroundWorkerQueue({
      ...payload,
      outcome_metrics: executionResult.metrics
    });
  } catch (telemetryError) {
    // Fail-safe: telemetry errors NEVER surface to the user session
    logSystemWarning("Telemetry capture bypassed", telemetryError);
  }

  return executionResult;
}
```

### 7.2 Transaction Envelope Schema v1.0

```json
{
  "schema_version": "1.0",
  "transaction_header": {
    "transaction_id": "tx_2026_998124",
    "parent_case_id": "case_alpha_771",
    "timestamp_utc": "2026-06-03T10:00:00Z",
    "actor": {
      "id": "user_88",
      "role": "analyst_l2",
      "tenant_id": "tenant_uk_health"
    },
    "active_persona": "analyst_l2",
    "active_ai_channel": "case_ai"
  },
  "sme_cognitive_context": {
    "perceived_urgency": "critical",
    "primary_data_focus_hash": "sha256_of_data_row_viewed"
  },
  "execution_payload": {
    "resolution_strategy_intent": "network_perimeter_isolation",
    "action_name": "revoke_egress_port",
    "parameters": {
      "target": "[PII-FILTERED]",
      "port": 443
    }
  },
  "ai_interaction": {
    "suggestion_presented": true,
    "suggestion_accepted": false,
    "suggestion_modified": true,
    "modification_delta": "analyst escalated severity from HIGH to CRITICAL"
  },
  "case_minutiae_diff": {
    "state_before_hash": "state_hash_xyz",
    "state_after_hash": "state_hash_abc",
    "was_manually_modified": true,
    "knowledge_ownership": "human_sme_override"
  },
  "outcome_metrics": {
    "case_final_resolution": "success",
    "total_execution_steps": 4,
    "latency_ms": 1420
  }
}
```

### 7.3 Cold Storage Structure

Per-tenant isolation mandatory from day one.

```
/{tenant_id}/{year}/{month}/{case_id}/{transaction_id}.json.gz
```

| Constraint | Target |
|---|---|
| Storage footprint | ≤ 15 GB/month at 200,000 transactions/month |
| Cost target | < $5.00/month cold storage at that volume |
| Retention policy | 24 months rolling per tenant |
| Access control | Dedicated ML pipeline role only — not application service accounts |
| Write gate | No transaction written without a populated `case_final_resolution` field |

---

## 8. AI UI Interaction Model

Commander AI is surfaced through THREE interaction patterns. Users never see channels, personas, or routing — these are internal. The UI is simple.

### 8.1 Commander AI Button (Global — Header Bar)

- Present in ALL application planes (Operational, Tenant Admin, Control Plane)
- "Ask anything" — general assistant
- Persona auto-selected from user's RBAC role (no manual mode/persona selection)
- Context-aware: knows what page the user is on, what they're looking at
- Available to all authenticated users
- Uses existing Commander AI button placement (header bar, per DS-1.0 and shell spec)

### 8.2 "Orient This Page For Me" (Dashboard Feature)

- Present on dashboard-type pages only
- Summarises the current page's data in plain language using the user's persona
- Explains what the data means, what's notable, what needs attention
- Grounded in the data currently rendered on screen
- Simple button/affordance — minimal UI presence
- Available to all users who have access to that dashboard

### 8.3 Inspector AI Icon (Pop-Up / Split Panel)

- Present in Inspector Pattern — pop-up cards and split panels
- Small round AI icon with tooltip: "Ask Commander AI about this"
- Click opens AI assistant pre-scoped to the inspected entity
- Minimal cognitive footprint — icon only, no text label, tooltip on hover
- Uses same persona as global button, scoped to entity context

### 8.4 Per-Page AI Actions (Future — Via Placement Markers)

- NOT built at launch
- Pages are built with AI placement markers (§9) indicating where AI COULD add value
- Activated per-marker in a later decision pass, after the system is proven functional without AI
- Examples (future): "Next best action" on case detail, "Explain focus order" on My Cases

---

## 9. AI Placement Model

AI is not wired into Commander surfaces at build time. The system is human-powered by default. AI is introduced deliberately where proven valuable.

### 9.1 The Process

1. Each page is built **fully functional WITHOUT AI**
2. AI placement markers (code comments with reference IDs) are inserted where AI COULD add value
3. An AI Placement Registry tracks all markers with status
4. Activation is a separate decision per marker, made after the host feature is proven functional
5. No page may depend on AI for its core function — AI is always enhancement, never requirement

### 9.2 Marker Format (In Code)

```tsx
{/* AI-PLACEMENT: AI-001 — Commander AI global assistant available */}
{/* AI-PLACEMENT: AI-014 — Dashboard explainer ("Orient this page") */}
{/* AI-PLACEMENT: AI-007 — Next best action recommendation */}
```

### 9.3 AI Placement Registry

| Marker | Page | AI Capability (if activated) | Status |
|---|---|---|---|
| AI-001 | Global (header) | Commander AI general assistant | BUILT (§8.1) |
| AI-002 | Dashboard pages | Orient this page for me | BUILT (§8.2) |
| AI-003 | Inspector panels | Ask about this entity | BUILT (§8.3) |
| AI-XXX | Per-page actions | To be determined during page build | PLACEHOLDER |

**Status options:** `PLACEHOLDER` → `APPROVED` → `WIRED` → `LIVE`

### 9.4 Principle

> The system is built for users first. AI is additive. Never depend on AI for core functionality. Decide AFTER seeing the working system where AI genuinely adds value versus where it would be gimmick.

---

## 10. Non-Negotiable Architectural Decisions

| # | Decision | Rule | Rationale |
|---|---|---|---|
| AD-01 | Provider abstraction | No application code calls an LLM directly. All calls route through the provider interface. | Enables provider tier switching without code changes |
| AD-02 | Personas are data | No persona logic is hardcoded. All personas stored in registry, read at runtime. | Enables team editing without deployment |
| AD-03 | Telemetry flag is server-side | `ENABLE_DORMANT_TELEMETRY` is never exposed to the client layer or tenant admins. | Seiertech retains exclusive control |
| AD-04 | Tenant ceiling rule | Tenant admin controls cannot exceed what Seiertech has provisioned for that tenant. | Authority model integrity |
| AD-05 | Graceful degradation | Every AI enhancement must degrade gracefully. Host features must never fail due to AI layer failure. | Feature stability |
| AD-06 | Both telemetry paths built | The dormant abort path and the active capture path are both fully built and tested at launch. | Dormant ≠ incomplete |
| AD-07 | Per-tenant cold storage isolation | Cold storage uses per-tenant prefix from day one. No shared cold lake. | Data isolation, regulatory adherence |
| AD-08 | War Room grounding enforced | FINDING/INFERENCE/UNKNOWN output format is enforced at prompt level — not advisory. | Hallucination prevention in crisis context |
| AD-09 | No PII in telemetry | PII filtered at gateway before serialisation. Parameters containing PII replaced with `[PII-FILTERED]`. | Data governance |
| AD-10 | All AI audit-logged | ALL AI channel interactions are audit-logged across all channels. Cannot be disabled by any admin tier. | Accountability and traceability |
| AD-11 | AI never auto-approves | AI provides reasoning and impact assessment. AI NEVER auto-approves, auto-executes, or auto-decides. Human authority preserved at all times. | Human authority preservation |
| AD-12 | Secure-by-Design guardrail | All personas include SbD awareness. If a recommendation would violate known SbD standards, AI must refuse or warn. | Prevents AI from recommending insecure actions |
| AD-13 | AI placement markers | Pages are built without AI. Markers indicate where AI COULD be wired in. Activation is a separate, later decision. | Prevents over-AIing. System is user-powered first. |

---

## 11. Resolved Design Decisions

These decisions were resolved during the architecture review session and are binding:

| Decision ID | Decision | Resolution | Rationale |
|---|---|---|---|
| DEC-AIDP-001 | Do the original 4 modes persist or are they superseded? | **Superseded.** The persona-driven channel model replaces the 4 modes. User's RBAC role determines persona. No manual mode selection. | Persona model is richer, role-appropriate, and requires no user action. |
| DEC-AIDP-002 | Does AI config live in a strategy surface or admin plane? | **Admin plane.** Accepted exception to "all config in strategy surfaces" principle. | AI configuration is platform infrastructure (keys, personas, telemetry), not security policy. |
| DEC-AIDP-003 | Should ALL AI channel interactions be audit-logged? | **YES — all channels, all interactions, cannot be disabled.** | Existing grounding steering requires traceability. Consistency across all channels. |
| DEC-AIDP-004 | Should a 10th channel (Architecture AI) be added? | **No separate channel.** Instead, the "Orient this page for me" feature (§8.2) serves all dashboard pages — including architecture dashboards — using the user's persona. One interaction pattern, not a per-domain channel. | Reduces complexity. Same capability delivered through a universal UI pattern. |
| DEC-AIDP-005 | Accept FINDING/INFERENCE/UNKNOWN grounding format? | **YES — mandatory for War Room. Optionally available to other channels where appropriate.** | Prevents hallucination under crisis framing. Optional adoption elsewhere for quality. |
| DEC-AIDP-006 | Confirm AI never auto-approves? | **STRONG CONFIRM.** AI reasons about approvals, presents impact assessment. Human clicks the button. Always. No exception. | Non-negotiable human authority preservation. |
| DEC-AIDP-007 | Accept dormant telemetry as commercial asset strategy? | **YES — but data governance and regulatory position deferred until activation.** When Seiertech activates (Horizon 3), a separate review is triggered at that point. No pre-commitment now. | Telemetry ships dormant. Governance addressed when there's something to govern. |

---

## 12. Build Sequence and Spec Index

The following child specifications will be produced from this design. Build sequence ordered by dependency.

| Spec | Name | Depends On | Build Phase |
|---|---|---|---|
| AIDP-S01 | Provider Registry | None — foundational | Phase 0 |
| AIDP-S02 | Persona Registry and Schema | None — foundational | Phase 0 |
| AIDP-S03 | Persona Engine | S01, S02 | Phase 0 |
| AIDP-S04 | Channel Routing and Injection Middleware | S02, S03 | Phase 1 |
| AIDP-S05 | War Room AI Grounding Engine | S03, S04 | Phase 1 |
| AIDP-S06 | Dormant Telemetry Pipeline | S01 | Phase 0 |
| AIDP-S07 | Admin Plane AI Controls — Seiertech | S01, S02, S03, S04 | Phase 1 |
| AIDP-S08 | Admin Plane AI Controls — Tenant | S07 | Phase 1 |
| AIDP-S09 | Persona Editor UI | S02, S07 | Phase 2 |

### 12.1 Steering File

A standalone `ai-layer.md` steering file will be produced alongside the child specs. It provides Kiro with AI-layer-specific operating rules, prohibited actions, and authority references without modifying the existing `AGENTS.md`.

### 12.2 New Entities Required

| Entity | Purpose | Location |
|---|---|---|
| `AIProvider` | LLM connection configuration | `packages/contracts/src/entities/ai-provider.ts` |
| `Persona` | Persona definition (compiled from YAML) | `packages/contracts/src/entities/persona.ts` |
| `PersonaVersion` | Versioned persona snapshots | `packages/contracts/src/entities/persona-version.ts` |
| `AIChannelConfig` | Per-tenant channel enable/disable/config | `packages/contracts/src/entities/ai-channel-config.ts` |
| `TransactionEnvelope` | Dormant telemetry record | `packages/contracts/src/entities/transaction-envelope.ts` |
| `AIInteractionLog` | Audit record per AI interaction | `packages/contracts/src/entities/ai-interaction-log.ts` |

### 12.3 New RBAC Permissions Required

| Permission | Scope | Who |
|---|---|---|
| `ai.provider.manage` | Add/edit/test provider connections | Seiertech admin |
| `ai.provider.byok` | Add own BYOK key | Tenant admin |
| `ai.channel.enable` | Enable/disable AI channels per tenant | Seiertech admin |
| `ai.persona.edit.l1` | Tune personas (tone, guardrails) | Tenant admin |
| `ai.persona.edit.l2` | Extend personas (vendor/domain) | Seiertech admin |
| `ai.persona.edit.l3` | Rewrite personas (base prompt) | Seiertech admin (approval gate) |
| `ai.telemetry.activate` | Toggle dormant telemetry flag | Seiertech admin only |
| `ai.warroom.configure` | War Room AI settings | Seiertech admin |
| `ai.usage.view` | View token usage dashboard | Seiertech admin + tenant admin (own tenant) |

---

## 13. Proposal Summary

### What this proposal delivers

- A persona-driven AI enhancement layer across 9 existing Commander features
- A three-tier provider model: BYOK at launch, Commander pipe at scale, native model long-term
- A War Room AI grounding model (FINDING/INFERENCE/UNKNOWN) that prevents hallucination
- A fully built dormant telemetry pipeline — zero cost, zero overhead until activated
- A two-tier admin control model with clear Seiertech and tenant authority boundaries
- A persona registry with schema-enforced editing, versioning, inheritance, and rollback
- Three clear UI interaction patterns: global button, orient-this-page, inspector icon
- An AI placement model that prevents over-AIing — system is user-powered first
- Universal audit logging across all AI channels
- Secure-by-Design awareness guardrail on all personas
- Graceful degradation — host features always work without AI
- Rate limiting and token budget management

### What this proposal does not do

- Does not replace or contradict any existing Commander AI specification
- Does not specify where AI appears on specific pages (decided via markers during page build)
- Does not reference specific future features (deltas handled at build time per feature)
- Does not give tenant admins authority beyond their provisioned ceiling
- Does not activate any data collection — telemetry ships dormant
- Does not introduce any direct LLM calls into application code
- Does not make any page dependent on AI for its core function
- Does not pre-commit to data governance position (deferred to Horizon 3 activation)

---

## End of Proposal

This document is accepted and ready for Kiro spec production (AIDP-S01 through AIDP-S09).
