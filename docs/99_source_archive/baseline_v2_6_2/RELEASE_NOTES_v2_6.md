# Release Notes — v2.6

**Document ID:** `RELEASE_NOTES_v2_6.md`
**Version:** v2.6.0
**Release Date:** May 2026
**Supersedes:** v2.5.2

## 1. Overview

Commander SDR Baseline v2.6 is a substantial release introducing **Security Command and Control** as Commander's category claim and adding the architectural foundations that make it credible: the Intelligence Layer, the Security OODA Loop, the dual attack surface framework, the four-class connector architecture, verdict semantics, and the surface family that operationalises all of these.

This is the largest release since v2.5 introduced the binding child spec architecture. It does not replace any v2.5.2 capability — it elevates Commander's position above the existing security stack and adds the structural capabilities that make Security C2 a distinct category.

## 2. Material Changes

### 2.1 Category Position

The v2.6 release establishes **Security Command and Control** as the category Commander occupies. Three coherent layers:

- **Security Command and Control** — the category
- **Security Drift Response (SDR)** — the patented operational discipline Commander runs within the category
- **Commander** — the platform brand that delivers both

Spec #57 establishes the doctrine. Master Proposition v5.0 carries the category claim throughout.

### 2.2 The Security OODA Loop

Programme-level OODA tempo as Commander's primary operational metric. Four phases — Observe, Orient, Decide, Act — running continuously across the entire estate. OODA tempo is now Commander's headline measurement alongside posture score and coverage score.

Spec #58 specifies the OODA Loop. Spec #67 specifies the dashboard family that surfaces it.

### 2.3 The Intelligence Layer

Four-stream intelligence integration: External Threat Intelligence, External Attack Intelligence, Internal Behavioural Intelligence, Posture Intelligence. Unified Estate Intelligence Picture consumed by all surface-layer consumers.

Spec #59 specifies the Intelligence Layer architecture.

### 2.4 Dual Attack Surface Framework

External attack surface (where external threat actors operate) and internal attack surface (where internal actors operate) treated as distinct surfaces with distinct intelligence streams, distinct case types, distinct routing, and distinct visual conventions.

Spec #60 specifies the framework. Specs #65 and #66 specify the paired Operating Pictures.

### 2.5 Four-Class Connector Architecture

Class A (SOC Telemetry), Class B (Operational Verdict), Class C (Configuration State), Class D (Threat Intelligence). Multi-class declaration allows a single connector (e.g. Microsoft Defender for Endpoint) to fulfil multiple class contracts.

Spec #61 specifies the connector contract. `docs/03_api_specs/INDEX.md` updated with class declarations.

### 2.6 Verdict Semantics

First-class treatment of operational tool verdicts as time-bound claims with confidence, density aggregation, disagreement detection, and trust calibration over time. Eight canonical disposition types.

Spec #62 specifies verdict semantics processing.

### 2.7 New Surfaces

- External Operating Picture (Spec #65) — external attack activity battlefield view
- Internal Operating Picture (Spec #66) — internal actor behavioural pattern view
- OODA Dashboard Family (Spec #67) — four phase dashboards plus Command Tempo Dashboard
- Identity Intelligence Surface (Spec #68) — per-identity intelligence picture
- Asset Intelligence Surface (Spec #69) — per-asset intelligence picture
- Direction Boards (Spec #70) — Control Weakness and Policy Effectiveness

### 2.8 New Capabilities

- Pre-Warned/Protected/Novel classification (Spec #71)
- Inverse Discovery Loop (Spec #72)
- Silent Defence Reporting (Spec #73) — Option A architecture (reporting only, no case generation)
- Context-Aware Drift Prioritisation Matrix (Spec #74)
- Internal Risk Investigation Sub-Lifecycle (Spec #75)

### 2.9 Extended Case Taxonomy

Five new case types added to existing seven, bringing total to twelve:

- External Attack Correlation case
- Verdict Pattern case
- Inverse Discovery (Coverage Blindspot) case
- Policy Effectiveness case
- OODA Tempo Degradation case

### 2.10 New Personas

Two new personas added, raising total to eleven:

- Security Analyst (cross-domain investigator operating the Intelligence Layer)
- Risk Analyst (operational risk specialist)

### 2.11 New RBAC Authority

Internal Risk authority overlay added as fifth authority overlay, governing access to Verdict Pattern cases, Internal Operating Picture identity detail, and Identity Intelligence Surface behavioural section.

### 2.12 New Connectors

Tier 1 connectors certified for v2.6 production deployment:

- Microsoft Sentinel (Class A+C extension)
- Microsoft Defender for Endpoint (Class A+B+C — canonical multi-class)
- Google SecOps / Chronicle (Class A)
- Splunk Enterprise Security (Class A)
- CrowdStrike Falcon (Class A+B+C extension)
- Rapid7 InsightIDR (Class A)
- Darktrace extended (Class A+B — Antigena Email + Network)
- Antigena Email (Class B)
- Microsoft Intune (Class B+C extension)
- Microsoft Entra Conditional Access (Class B+C)
- Microsoft Purview DLP (Class B+C)
- Zscaler ZIA (Class B+C extension)
- CISA KEV Feed (Class D)

Tier 2 connectors named in `INDEX.md` schedule.

### 2.13 Boundary Discipline Formalised

Two boundary doctrines formalised:

- **SOC Boundary** (Master Proposition v5.0 Section 25, Spec #57 Section 5) — Commander observes, SOC owns. No incident triage, no incident response, no writes to SOC platforms.
- **Insider Risk Boundary** (Master Proposition v5.0 Section 26, Spec #75) — Commander surfaces, customer investigates. No intent determination, no disciplinary action, intelligence-grade evidence only.

## 3. Carried Forward

All v2.5.2 specifications carry forward unchanged. Specs #01 through #56 remain authoritative on their subject matter. Selected v2.5.2 specs receive v2.6 addendum sections (extensions, not replacements).

All v2.5.2 doctrine carries forward:

- Closed-loop case lifecycle
- P0 priority overlay doctrine
- Application boundary doctrine
- Active shell authority
- No-manual-case-lifecycle doctrine
- Shell Reference vs Build Authority doctrine

## 4. Reserved Spec Numbers

Spec numbers #63 and #64 are reserved and not used. The original intent for these numbers was connector schedule specifications; the decision was made to implement connector schedules via updates to `docs/03_api_specs/INDEX.md` rather than as parallel binding specs. The numbers remain reserved for future use.

## 5. Architectural Decisions Embedded in v2.6

The following architectural decisions are documented for future reference:

- **Silent Defence Reporting: Option A** — dashboard and reporting only, no case generation. Future versions may revisit.
- **Spec numbering starts at #57** — v2.5.2 introduced Spec #56; v2.6 begins at #57.
- **Connector schedules via INDEX.md** — not as parallel binding specs.
- **v2.5.2 as authoritative baseline** — full carry-forward; no v2.5.2 spec invalidated by v2.6.
- **SDR identity preserved** — Commander runs SDR within Security C2 category; SDR not subsumed.
- **OODA programme-level only** — SOC keeps incident-level OODA.
- **Verdict Pattern cases route to customer Internal Risk** — not Commander investigation.

## 6. Migration Notes

Customers running v2.5.2 production tenants will receive v2.6 capability progressively:

- New surfaces (Operating Pictures, OODA dashboards, Intelligence Surfaces, Direction Boards) added without disrupting existing workflows
- New connectors deployable as Class A/B/D adds; existing Class C connectors continue unchanged
- Existing case lifecycle continues unchanged; new case types add alongside existing
- Existing routing continues unchanged; new routing rules apply only to new case types
- Existing persona model continues unchanged; new personas added with Internal Risk authority configurable per customer organisational structure
- Existing RBAC continues unchanged; Internal Risk authority overlay added

## 7. Pilot Validation

The v2.6 capabilities will be validated against the two billion-pound pilots and the UHG deployment context queued for the next quarter. Pilot data will inform tuning of:

- OODA phase health thresholds
- Pre-warned classification confidence thresholds
- Verdict density aggregation windows
- Trust calibration learning rates
- Context-aware drift prioritisation weights
- Internal Risk Investigation Sub-Lifecycle thresholds

System defaults shipped at build are conservative; pilot tuning will optimise.

## 8. Document Family at v2.6

- Master Proposition v5.0 (this release)
- Master Technical Specification v7.0 (this release)
- SDR Control Plane Specification v1.1 (carried forward)
- SDR Specification Schedule and Folder Structure v1.9 (carried forward)
- Authority and Precedence v2.6 (this release)
- Specification Register v2.6 (this release)
- Current Baseline Manifest v2.6 (this release)
- Specs #01-#75 (with #63, #64 reserved)
- Reference inputs in `docs/03_api_specs/` (INDEX.md updated)
- HTML shell references (unchanged)
- Feature Registry FR001 v1.0 (updated for v2.6)

The Next Stage Approach Pack increments to v1.6 to bind to v2.6 baseline (delivered separately).

## 9. Versioning

v2.6.0 — initial v2.6 release. Patch versions (v2.6.x) issued for bug fixes, clarifications, and minor amendments without architectural change. Next major increment will be v2.7.
