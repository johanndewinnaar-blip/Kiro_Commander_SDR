---
inclusion: always
name: system-first-doctrine
description: Commander is system-powered first, AI-enhanced second. This doctrine governs all build decisions regarding capability delivery.
---
# Commander SDR — System-First Doctrine

**Version:** SFD-1.0  
**Status:** Authoritative. Governs all capability delivery decisions.  
**Date:** June 2026  
**Principle:** *Commander is a system-powered platform. AI is an enhancement layer, never a dependency.*

---

## 1. The Doctrine

When a capability CAN be delivered by a deterministic algorithm, rule engine, scoring function, or data query — it MUST be delivered by the system. AI may ENHANCE the output (explain, narrate, synthesise, recommend) but the core capability must function fully without AI.

---

## 2. The Three Delivery Tiers

### Tier 1: System Delivers (Deterministic, Algorithmic, Always Works)

Capabilities that are computed by algorithms, rule engines, scoring functions, data queries, or state machines. These are:
- **Instant** (milliseconds, not seconds)
- **Deterministic** (same input = same output, every time)
- **Always available** (no external dependency)
- **Zero marginal cost** (no token spend)
- **Fully auditable** (logic is explainable and traceable)
- **Fully testable** (expected outputs are deterministic)

Examples: case lifecycle transitions, priority scoring, SLA calculation, routing assignment, gap detection, drift detection, coverage checks, metric computation, sorting/ranking, milestone tracking, deviation detection, adherence scoring.

### Tier 2: System Delivers + AI Enhances (System Computes, AI Explains)

The system produces the correct output algorithmically. AI adds human-readable explanation, narrative context, or natural language accessibility on top. If AI is unavailable, the system output remains — the user just interprets it themselves.

Examples:
- System sorts cases by SLA risk → AI explains WHY this order
- System detects evidence gap → AI explains WHAT TO DO about it
- System identifies metric exceeding target → AI explains WHAT IT MEANS
- System detects plan deviation → AI explains the IMPLICATIONS
- System scores ownership prediction → AI explains REASONING when ambiguous

### Tier 3: AI Delivers (Synthesis, Narrative, Free-Form — Accepted as AI-Dependent)

Capabilities that require natural language synthesis, contextual reasoning across multiple data sources, or free-form question answering. These CANNOT be reduced to algorithms. They are accepted as AI-dependent and represent Commander's premium commercial tier.

What qualifies as AI-Only:
- Free-form Q&A (user asks unpredictable questions in natural language)
- Complex narrative synthesis (multiple human texts → coherent summary)
- Strategic objective formation (multiple data signals → proposed objective with scope and timeline)
- Tactical plan assembly (cases + capacity + MTTR → phased plan with milestones and risk assessment)
- Plan revision proposals (deviation + context → recommended options with reasoning)
- Exploit mechanism explanation (ATT&CK data → human-readable attack narrative)
- Lessons/recommendations synthesis (event timeline → actionable lessons)
- CISO programme narrative (multiple director reports → 30-second executive read)

---

## 3. Rules

1. If an output can be computed algorithmically (sort, score, compare, check, detect, rank, aggregate) — the **system delivers it**.
2. AI adds explanation, narrative, and natural language accessibility **ON TOP** of system-delivered outputs.
3. **No page, feature, or workflow may depend on AI for its core function.** If AI is off, every feature continues working.
4. AI calls are **OPTIONAL enhancements**, never blocking operations.
5. System-delivered outputs are: instant, deterministic, auditable, zero-cost, always available.
6. AI-delivered outputs are: additive, labelled, confidence-scored, latency-tolerant, gracefully degradable.
7. Every spec and build pack must **declare** whether each capability is Tier 1 (system), Tier 2 (system + AI enhance), or Tier 3 (AI-only). The **default assumption is Tier 1** unless proven otherwise.

---

## 4. AI-Only Capabilities — Commercial Positioning

Tier 3 (AI-Only) capabilities are not a weakness — they are Commander's **commercial differentiator** and competitive moat.

**Without AI:** Commander is a best-in-class security operations platform with correct data, correct sorting, correct metrics, correct gap detection, correct adherence tracking, and correct operational measurement. The CISO has all the data to form strategy. Analysts have correctly sorted work queues. Managers have all inputs for planning. They just do the interpretation and assembly work themselves.

**With AI:** Commander becomes a Security Programme Command & Control platform where interpretation, planning, narrative synthesis, and strategic formation are done FOR the user — in seconds, consistently, grounded in evidence. Users REVIEW and DECIDE. They don't COMPILE and WRITE.

Commander without AI is better than any competitor.  
Commander with AI is a category of one.

---

## 5. Degraded State (AI-Only Features When AI is Unavailable)

Every Tier 3 capability has a defined degraded state where the system still provides value:

| AI-Only Capability | Degraded State (AI Off) |
|---|---|
| Strategy generation | User sees raw signals (metrics exceeding targets, gaps, exposure counts). They form objectives manually. |
| Tactical plan assembly | User sees cases, capacity, MTTR, dependencies. They plan manually. |
| Plan revision proposals | User sees deviation data (missed milestone, failed dependency). They revise manually. |
| CISO programme synthesis | CISO reads each director's report individually. No condensed summary. |
| Free-form Q&A (Commander AI button) | Button disabled. User navigates to data manually. |
| Exploit deep-dive | User reads raw ATT&CK technique data + CVSS without narrative explanation. |
| Lessons/recommendations | Close-out report contains full timeline and data. No synthesised lessons section. |
| Orient this page (dashboard summary) | Dashboard shows all data. No natural language explanation. |
| Daily briefing narrative | Analyst sees sorted case list + notifications. No prose briefing. |

**The system STILL WORKS in all cases.** AI-Only features add speed, synthesis, and accessibility — they never gate core functionality.

---

## 6. Rules for AI-Only Capabilities

1. The **INPUTS** to AI are always system-delivered (metrics, case data, timelines, capacities, evidence). AI operates on system truth.
2. AI **synthesises** — it does not invent. All AI outputs are grounded in Commander-held data.
3. AI outputs are always **PROPOSALS** — human approves before activation. AI never auto-executes.
4. AI-Only outputs are always **labelled** as AI-generated.
5. AI-Only outputs carry **confidence labels** where applicable (FINDING / INFERENCE / UNKNOWN for War Room; HIGH / MEDIUM / LOW elsewhere).
6. AI outputs that would violate **Secure-by-Design** standards must be refused or include a warning.
7. **ALL** AI interactions are audit-logged. Cannot be disabled.

---

## 7. Why This Doctrine Exists

| Without this doctrine | With this doctrine |
|---|---|
| Developers default to "let AI do it" | Developers default to "can an algorithm do it?" |
| AI failures break features | AI failures degrade gracefully — features work |
| High token cost for basic operations | Zero cost for system-delivered basics; AI budget reserved for premium |
| Inconsistent outputs (AI varies) | Deterministic core; AI adds polish |
| Untestable capabilities | System tier is fully testable; AI tier has acceptance criteria |
| Vendor-locked to LLM providers | System works independently; AI tier is provider-abstracted |

---

## 8. Application to Build Decisions

When designing any new capability, ask:

```
1. Can this be computed by an algorithm?           → Tier 1 (System)
2. Can a system compute it but AI explain it?      → Tier 2 (System + AI Enhance)  
3. Does this require natural language synthesis     → Tier 3 (AI-Only — accepted)
   or free-form reasoning across multiple sources?
```

The burden of proof is on Tier 3. The default is Tier 1.

---

## 9. The Ratio (Target)

| Tier | Target Proportion | Current Assessment |
|---|---|---|
| Tier 1: System Delivers | ~80%+ | ~87% of capabilities |
| Tier 2: System + AI Enhances | ~15% | ~9% of capabilities |
| Tier 3: AI-Only | ~5% or less | ~4% of capabilities |

If Tier 3 grows beyond 10% of total capabilities, this signals over-reliance on AI and should trigger an architectural review.

---

## 10. Adherence

Every spec, build pack, and implementation task must declare which delivery tier each capability belongs to. The declaration format:

```
| Capability | Tier | System Delivers | AI Enhances | AI-Only | Justification |
```

Undeclared capabilities default to Tier 1 (System). Migration from Tier 1/2 to Tier 3 requires explicit justification and decision record.

This doctrine is authoritative. Where any other document conflicts on capability delivery approach, this doctrine wins.
