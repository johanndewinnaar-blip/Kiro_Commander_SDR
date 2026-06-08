# Commander SDR — Inception Posture Intelligence Authority Document

**Version:** IPI-1.0
**Status:** Authoritative. Companion to Asset Architecture Intelligence (AAI-1.0).
**Authority:** This document is the binding authority for Inception Posture Intelligence — the Secure by Design classification capability. Where any other document conflicts on inception posture evaluation, posture origin classification, or inception-driven case creation, this one wins.

---

## 1. Definition

Inception Posture Intelligence is Commander's capability for determining whether an architectural component entered the managed estate in the expected secure posture — and for creating distinct operational responses when it did not.

### The Three Posture States

```
Secure by Design        — object met expected secure posture at inception
Not Secure by Design    — object FAILED expected secure posture at inception
Security Drift          — object WAS secure but moved away from posture over time
```

### Why This Matters

Without this distinction, Commander incorrectly labels inception failures as drift. This causes:
- Wrong case routing (operations instead of build/platform team)
- Wrong metric (drift reduction instead of inception-quality improvement)
- Wrong remediation (fix the symptom, not the process that created it)
- Recurring cases (same build process keeps producing insecure objects)
- Invisible systemic failure (one broken pipeline creates dozens of cases, each treated as isolated drift)

---

## 2. Relationship to Other Authority

| Authority | Relationship |
|---|---|
| AAI-1.0 (Asset Architecture Intelligence) | COMPANION — AAI provides the architectural context against which inception posture is evaluated. IPI consumes AAI. |
| Spec #55 (Baseline Configuration) | EXTENDED — IPI defines inception-specific baselines (Secure Design Profiles) |
| D-04 Drift & Rule Engine | COMPLEMENTARY — Drift detects CHANGE from secure state. IPI detects ABSENCE of initial secure state. |
| Journey Intelligence (JI-1.0) | CONSUMER — JI gains rootCauseClass as a formula input and journey classifier |
| Spec #08 (Case Management) | EXTENDED — new case type #13: not-secure-by-design |

---

## 3. Core Distinction

| | Secure by Design | Not Secure by Design | Security Drift |
|---|---|---|---|
| Previous secure state | N/A (inception) | NO — never was | YES — was compliant |
| Root cause | Correct process | Build/process/provisioning failure | Operational decay, config change |
| Remediation owner | N/A | Build team / platform team | Operations team |
| Recurrence | N/A | WILL recur until source process fixed | May recur if config management fails |

---

## 4. Data Model

### PostureOrigin Enum (on Asset Entity)

secure_by_design, not_secure_by_design, unknown, accepted_not_secure_by_design

- Set ONCE at discovery/creation time. IMMUTABLE once set (governance override for acceptance only).

### RootCauseClass Enum (on Finding Entity)

not_secure_by_design, security_drift, misconfiguration, coverage_gap, control_failure, process_failure, technical_debt, third_party_dependency, accepted_risk, unknown

### New RiskObject Type: inception_posture_failure
### New Case Type #13: not-secure-by-design

---

## 5. Secure Design Profiles

Defines what "Secure by Design" MEANS for a given asset type + architectural tier + compliance scope. Hosted as strategy policies with full governance lifecycle.

---

## 6. Inception Posture Evaluator Engine

Pure-function engine that runs ONCE per asset at discovery/creation time. Evaluates against applicable Secure Design Profile.

---

## 7-18. See full authority specification for complete sections on Case Type routing, Systemic Pattern Detection, Relationship to Drift, AAI/JI integration, AI Analyst integration, Governance (ARCH-IPI-001 through ARCH-IPI-006), Performance Constraints, Impact (zero breaking changes), Build Sequencing, Onboarding Mode, and Authority Lineage.

---

## 13. Governance — Conformance Assertions

| Rule ID | Rule |
|---|---|
| ARCH-IPI-001 | Every asset type with an active Secure Design Profile must be evaluated at discovery |
| ARCH-IPI-002 | postureOrigin is immutable once set (governance override for acceptance only) |
| ARCH-IPI-003 | Inception findings must carry rootCauseClass: not_secure_by_design |
| ARCH-IPI-004 | not-secure-by-design cases route to build/platform team (never operations) |
| ARCH-IPI-005 | Secure Design Profiles require strategy policy governance (approval lifecycle) |
| ARCH-IPI-006 | Systemic pattern detection must not auto-create missions (surfaces pattern only) |
