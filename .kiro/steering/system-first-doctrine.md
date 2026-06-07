---
inclusion: always
name: system-first-doctrine
description: System-First Doctrine (SFD-1.0) — governs all Commander capability delivery.
---

# System-First Doctrine (SFD-1.0) — Commander SDR

**Purpose:** Defines the delivery mode split for all Commander capabilities.

## Delivery Modes

| Mode | % of Platform | Meaning |
|---|---|---|
| SYSTEM | ~87% | Deterministic, rule-driven delivery. No AI involvement. System owns the outcome. |
| AI-ENHANCED | ~9% | System delivers the data/answer. AI adds explanation, recommendation, or prioritisation reasoning on top. System is still authoritative — AI augments. |
| AI-ONLY | ~4% | Only AI can deliver this (natural language summarisation, "explain this", draft detection rules from description). No system fallback. |

## Rules

1. **Default assumption: SYSTEM.** Every capability starts as system-delivered unless proven otherwise.
2. **AI-ENHANCED:** The system MUST deliver a correct answer without AI. AI adds value but is not required for functionality.
3. **AI-ONLY:** Reserved for capabilities where no deterministic approach exists (NL generation, open-ended explanation, creative drafting).
4. **No AI for decisions:** AI never makes security decisions. It explains, recommends, drafts — the system or analyst decides.
5. **AICAP markers:** Every page carries an AI-PLACEMENT comment cataloguing where AI enhancement will wire in (Phase 2+). These are tracked in docs/00_authority/AICAP_REGISTER.md.
6. **Customer visibility:** Customer sees "Commander AI". AWS Bedrock is invisible (internal framework). BYOK = customer adds their own key.

## Enforcement

- Every use case in USE_CASE_REGISTER.md must declare delivery mode (SYSTEM or AI-ENHANCED)
- AI-ONLY use cases are exceptional and require explicit justification
- AICAP_REGISTER.md tracks all AI placement markers with delivery mode
