
---
inclusion: always
---

# Commander v2.6 Doctrine Steering

This steering file grounds Kiro in the v2.6 doctrine specifications before any feature-level work. It is subordinate to the archived Commander baseline and exists to keep Kiro from collapsing doctrine into generic implementation tasks.

## Spec #56 — Shell Reference vs Build Authority

The HTML shells are visual and interaction references only. They do not define the complete feature inventory, cannot remove committed routes, and cannot override the route registry, feature registry or baseline specifications. If a shell omits a committed feature, Kiro must keep the feature as scaffold, stub or registered future surface rather than deleting it.  
**Authority:** Spec #56 Shell Reference vs Build Authority Doctrine.

## Spec #57 — Security Command and Control Doctrine

Commander occupies the Security Command and Control category, runs Security Drift Response as the operational discipline, and delivers this through the Commander platform. Kiro must preserve the category/discipline/platform distinction and must not reduce Commander to a dashboard, SOC triage tool, SIEM, SOAR or ticketing system.  
**Authority:** Spec #57 Security Command and Control Doctrine.

## Spec #58 — Security OODA Loop

Commander runs continuous OODA loops at the security programme level. Observe, Orient, Decide and Act states must preserve source evidence, operating context, decision constraints and validation feedback. Kiro must not flatten OODA into a static dashboard.  
**Authority:** Spec #58 Security OODA Loop Specification.

## Spec #59 — Intelligence Layer Architecture

Commander intelligence is organised into four streams: External Threat, External Attack, Internal Behavioural and Posture. Kiro must not invent a fifth stream, merge streams or strip stream-to-surface lineage from records, views or cases.  
**Authority:** Spec #59 Intelligence Layer Architecture.

## Spec #60 — Internal and External Attack Surface Framework

Commander records must preserve whether they belong to the internal attack surface or external attack surface where applicable. Cases, signals, exposures, assets, identities and Direction Boards must surface this attribution rather than treating all risk as a single undifferentiated bucket.  
**Authority:** Spec #60 Internal and External Attack Surface Framework.

## Spec #61 — Universal Security Signal Connector Contract

Connector architecture is organised into classes A/B/C/D: SOC Telemetry, Operational Verdict, Configuration State and Threat Intelligence. Connectors may be multi-class but cannot invent classes outside this model, and all connector output must resolve to canonical Commander signal purposes and contracts.  
**Authority:** Spec #61 Universal Security Signal Connector Contract.

## Spec #62 — Verdict Semantics

Verdicts are time-bound, confidence-weighted claims made by tools. Kiro must preserve identity, time, disposition, policy reference and source, and must not reduce verdicts to binary pass/fail outcomes.  
**Authority:** Spec #62 Verdict Semantics Specification.
