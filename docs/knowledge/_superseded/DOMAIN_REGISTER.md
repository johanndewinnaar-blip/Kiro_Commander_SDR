# Commander SDR Domain Register

**Authority:** System Rationalisation Phase 2  
**Date:** 30 May 2026  
**Status:** ACTIVE - Complete Domain Inventory

---

## Purpose

This register catalogs all operational domains within Commander SDR with their precise boundaries, responsibilities, and integration contracts. It serves as the authoritative reference for domain-driven architecture and build planning.

---

## Domain Definitions

### DOM-01: Security OODA Loop
**Category:** Orchestration  
**Purpose:** Programme-level continuous control loop (Observe → Orient → Decide → Act)  
**Scope:** Cross-domain operational tempo and phase health monitoring  
**Primary Metric:** OODA tempo (average time for finding to traverse full loop)  
**Input Sources:** All domains (phase completion signals)  
**Output Consumers:** All domains (orchestration commands), Executive surfaces  
**Kiro Specs:** #58 (Security OODA Loop), #67 (OODA Dashboard Family)  
**Build Priority:** HIGH (operational backbone)

### DOM-02: Intelligence Layer
**Category:** Integration  
**Purpose:** Four-stream intelligence integration and cross-stream correlation  
**Scope:** External Threat, External Attack, Internal Behavioural, Posture Intelligence streams  
**Primary Metric:** Cross-stream correlation accuracy and latency  
**Input Sources:** DOM-03 (signals), DOM-05 (drift), DOM-07 (risk), DOM-08 (verdicts)  
**Output Consumers:** DOM-10 (Operating Pictures), DOM-11/12 (Intelligence Surfaces), DOM-13 (Direction Boards)  
**Kiro Specs:** #59 (Intelligence Layer Architecture)  
**Build Priority:** CRITICAL (v2.6 foundation)

### DOM-03: Connector Framework
**Category:** Ingestion  
**Purpose:** Multi-class signal ingestion from external security tools  
**Scope:** Class A (SOC), Class B (Verdict), Class C (Config), Class D (Threat Intel) connectors  
**Primary Metric:** Signal freshness, connector health, ingestion volume  
**Input Sources:** External security tools (240+ platforms)  
**Output Consumers:** DOM-06 (normalisation), DOM-05 (drift detection), DOM-08 (verdict processing)  
**Kiro Specs:** #61 (Connector Contract), #16 (Framework), #17 (Mock Connectors)  
**Build Priority:** CRITICAL (data foundation)

### DOM-04: Case Management
**Category:** Operational  
**Purpose:** Closed-loop case lifecycle management across all domains  
**Scope:** 12 case types, routing, prioritisation, validation, closure gates  
**Primary Metric:** Case resolution time, SLA compliance, closure durability  
**Input Sources:** All analytical domains (risk objects)  
**Output Consumers:** All surface domains, DOM-01 (OODA Act phase)  
**Kiro Specs:** #08 (Case Management), #06 (Case Management Implementation)  
**Build Priority:** HIGH (operational spine)

### DOM-05: Drift Detection Engine
**Category:** Analytics  
**Purpose:** ~240 detection models across 13 security domains  
**Scope:** Configuration, vulnerability, identity, exposure, coverage, architecture drift  
**Primary Metric:** Detection accuracy, false positive rate, model coverage  
**Input Sources:** DOM-03 (configuration signals), DOM-06 (entity state)  
**Output Consumers:** DOM-02 (Posture Intelligence), DOM-04 (drift cases)  
**Kiro Specs:** #34 (Drift and Rule Engine), #36 (Rule Model Decision Governance)  
**Build Priority:** HIGH (core analytics)

### DOM-06: Entity Management
**Category:** Foundation  
**Purpose:** Canonical data model and entity lifecycle management  
**Scope:** Assets, identities, policies, verdicts, cases, risk objects, relationships  
**Primary Metric:** Entity accuracy, relationship completeness, data freshness  
**Input Sources:** DOM-03 (all connector signals)  
**Output Consumers:** All analytical and surface domains  
**Kiro Specs:** #04 (Data Model Canonical Entities)  
**Build Priority:** CRITICAL (data foundation)

### DOM-07: Risk Scoring & Blast Radius
**Category:** Analytics  
**Purpose:** Risk quantification and impact assessment across entities  
**Scope:** Cross-system attack paths, privilege escalation, blast radius computation  
**Primary Metric:** Risk score accuracy, blast radius coverage, path completeness  
**Input Sources:** DOM-06 (entity relationships), DOM-05 (drift findings)  
**Output Consumers:** DOM-02 (risk intelligence), DOM-04 (risk objects)  
**Kiro Specs:** Existing v2.5 capabilities (carried forward)  
**Build Priority:** MEDIUM (analytical enhancement)

### DOM-08: Verdict Semantics
**Category:** Analytics  
**Purpose:** Operational security tool verdict processing as time-bound claims  
**Scope:** 8 canonical dispositions, trust calibration, disagreement detection  
**Primary Metric:** Verdict processing latency, trust calibration accuracy  
**Input Sources:** DOM-03 (Class B connector signals)  
**Output Consumers:** DOM-02 (Internal Behavioural Intelligence), DOM-04 (verdict pattern cases)  
**Kiro Specs:** #62 (Verdict Semantics Specification)  
**Build Priority:** HIGH (v2.6 core capability)

### DOM-09: Pre-Warned Classification
**Category:** Analytics  
**Purpose:** Classify external attacks against prior Commander knowledge  
**Scope:** Pre-warned (known exposure), Protected (should be safe), Novel (unknown)  
**Primary Metric:** Classification accuracy, false positive/negative rates  
**Input Sources:** DOM-03 (Class A attack signals), DOM-02 (estate intelligence)  
**Output Consumers:** DOM-04 (external attack correlation cases), DOM-10 (Operating Pictures)  
**Kiro Specs:** #71 (Pre-Warned Protected Novel Classification)  
**Build Priority:** HIGH (v2.6 differentiator)

### DOM-10: Operating Pictures
**Category:** Surface  
**Purpose:** Real-time estate intelligence visualization for situational awareness  
**Scope:** External Operating Picture (SOC integration), Internal Operating Picture (insider risk)  
**Primary Metric:** Information density, update latency, user engagement  
**Input Sources:** DOM-02 (Intelligence Layer), DOM-04 (case state)  
**Output Consumers:** Security analysts, leadership, SOC teams  
**Kiro Specs:** #65 (External Operating Picture), #66 (Internal Operating Picture)  
**Build Priority:** MEDIUM (surface layer)

### DOM-11: Identity Intelligence
**Category:** Surface  
**Purpose:** Per-identity comprehensive intelligence and analysis surface  
**Scope:** Access chains, behavioural patterns, risk trajectories, case history  
**Primary Metric:** Intelligence completeness, correlation accuracy, investigation efficiency  
**Input Sources:** DOM-02 (Intelligence Layer), DOM-06 (identity entities), DOM-08 (verdicts)  
**Output Consumers:** Identity analysts, security investigators, insider risk teams  
**Kiro Specs:** #68 (Identity Intelligence Surface), #10 (Identity Intelligence Implementation)  
**Build Priority:** MEDIUM (surface layer)

### DOM-12: Asset Intelligence
**Category:** Surface  
**Purpose:** Per-asset comprehensive intelligence and analysis surface  
**Scope:** Configuration state, verdict history, vulnerability state, identity exposure  
**Primary Metric:** Intelligence completeness, correlation accuracy, investigation efficiency  
**Input Sources:** DOM-02 (Intelligence Layer), DOM-06 (asset entities), DOM-05 (drift state)  
**Output Consumers:** Security analysts, asset owners, platform engineers  
**Kiro Specs:** #69 (Asset Intelligence Surface), #09 (Asset Intelligence Implementation)  
**Build Priority:** MEDIUM (surface layer)

### DOM-13: Direction Boards
**Category:** Surface  
**Purpose:** Strategic priority surfaces and guidance for security leadership  
**Scope:** Control Weakness Direction Board, Policy Effectiveness Direction Board  
**Primary Metric:** Strategic alignment, priority accuracy, leadership engagement  
**Input Sources:** DOM-02 (Intelligence Layer), DOM-04 (case patterns)  
**Output Consumers:** CISO, Security leadership, Control owners  
**Kiro Specs:** #70 (Direction Boards), #15 (Direction Boards Implementation)  
**Build Priority:** LOW (leadership surface)

### DOM-14: Compliance & Governance
**Category:** Cross-cutting  
**Purpose:** Continuous compliance measurement and regulatory evidence generation  
**Scope:** 8+ frameworks (CIS, NIST, ISO 27001, SOC 2, PCI-DSS, DORA, NIS2, Cyber Essentials)  
**Primary Metric:** Compliance score, evidence completeness, audit readiness  
**Input Sources:** All domains (compliance evidence)  
**Output Consumers:** Risk/compliance teams, auditors, regulators  
**Kiro Specs:** #22 (Governance and Reporting)  
**Build Priority:** MEDIUM (regulatory requirement)

### DOM-15: Commander AI
**Category:** Augmentation  
**Purpose:** AI-powered security engineering, analysis, and decision support  
**Scope:** 4 modes (Estate, Engineering, Triage, Reporting), grounded in estate data  
**Primary Metric:** Response accuracy, grounding quality, user satisfaction  
**Input Sources:** All domains (grounding data)  
**Output Consumers:** All user personas, all surfaces  
**Kiro Specs:** #20 (Commander AI Core), #21 (AWS Bedrock Evaluation)  
**Build Priority:** MEDIUM (augmentation layer)

---

## Domain Interaction Matrix

| Domain | DOM-01 | DOM-02 | DOM-03 | DOM-04 | DOM-05 | DOM-06 | DOM-07 | DOM-08 | DOM-09 | DOM-10 | DOM-11 | DOM-12 | DOM-13 | DOM-14 | DOM-15 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **DOM-01** | - | Consumes | Monitors | Orchestrates | Monitors | Monitors | Monitors | Monitors | Monitors | Feeds | Feeds | Feeds | Feeds | Feeds | Feeds |
| **DOM-02** | Reports | - | Consumes | Feeds | Consumes | Consumes | Consumes | Consumes | Feeds | Feeds | Feeds | Feeds | Feeds | Feeds | Feeds |
| **DOM-03** | Reports | Feeds | - | - | Feeds | Feeds | - | Feeds | - | - | - | - | - | Feeds | Feeds |
| **DOM-04** | Reports | Consumes | - | - | Consumes | Consumes | Consumes | Consumes | Consumes | Feeds | Feeds | Feeds | Feeds | Feeds | Feeds |
| **DOM-05** | Reports | Feeds | Consumes | Feeds | - | Consumes | Feeds | - | - | - | - | Feeds | Feeds | Feeds | Feeds |
| **DOM-06** | Reports | Feeds | Consumes | Feeds | Feeds | - | Feeds | Feeds | Feeds | Feeds | Feeds | Feeds | Feeds | Feeds | Feeds |
| **DOM-07** | Reports | Feeds | - | Feeds | Consumes | Consumes | - | - | - | - | Feeds | Feeds | Feeds | Feeds | Feeds |
| **DOM-08** | Reports | Feeds | Consumes | Feeds | - | Consumes | - | - | - | - | Feeds | - | - | Feeds | Feeds |
| **DOM-09** | Reports | Feeds | Consumes | Feeds | - | Consumes | - | - | - | Feeds | - | - | - | Feeds | Feeds |
| **DOM-10** | - | Consumes | - | Consumes | - | Consumes | - | - | Consumes | - | - | - | - | - | Consumes |
| **DOM-11** | - | Consumes | - | Consumes | - | Consumes | Consumes | Consumes | - | - | - | - | - | - | Consumes |
| **DOM-12** | - | Consumes | - | Consumes | Consumes | Consumes | Consumes | - | - | - | - | - | - | - | Consumes |
| **DOM-13** | - | Consumes | - | Consumes | - | - | - | - | - | - | - | - | - | - | Consumes |
| **DOM-14** | Consumes | Consumes | Consumes | Consumes | Consumes | Consumes | Consumes | Consumes | Consumes | - | - | - | - | - | Consumes |
| **DOM-15** | Consumes | Consumes | Consumes | Consumes | Consumes | Consumes | Consumes | Consumes | Consumes | Consumes | Consumes | Consumes | Consumes | Consumes | - |

**Legend:**
- **Feeds:** Domain produces data consumed by target domain
- **Consumes:** Domain consumes data produced by target domain  
- **Monitors:** Domain monitors health/status of target domain
- **Orchestrates:** Domain controls execution flow of target domain
- **Reports:** Domain reports status/metrics to target domain

---

## Build Dependencies

### Critical Path Dependencies
1. **DOM-06 (Entity Management)** → All other domains (canonical data foundation)
2. **DOM-03 (Connector Framework)** → DOM-05, DOM-08 (signal processing)
3. **DOM-02 (Intelligence Layer)** → DOM-10, DOM-11, DOM-12, DOM-13 (v2.6 surfaces)
4. **DOM-04 (Case Management)** → All surface domains (operational workflow)

### Parallel Build Opportunities
- **DOM-05 (Drift Detection)** + **DOM-07 (Risk Analysis)** + **DOM-08 (Verdict Semantics)** (analytical engines)
- **DOM-10 (Operating Pictures)** + **DOM-11 (Identity Intelligence)** + **DOM-12 (Asset Intelligence)** (surface layer)
- **DOM-14 (Compliance)** + **DOM-15 (Commander AI)** (augmentation layer)

### Build Sequence Recommendation
1. **Foundation:** DOM-06, DOM-03
2. **Analytics:** DOM-05, DOM-07, DOM-08, DOM-09
3. **Integration:** DOM-02
4. **Operations:** DOM-04, DOM-01
5. **Surfaces:** DOM-10, DOM-11, DOM-12, DOM-13
6. **Augmentation:** DOM-14, DOM-15

---

## Domain Ownership Mapping

| Domain | Primary Kiro Spec | Target Package/App | Future Owner Team |
|---|---|---|---|
| DOM-01 | #58 | apps/web, apps/api | Security Operations |
| DOM-02 | #59 | packages/intelligence, apps/api | Security Architecture |
| DOM-03 | #61, #16, #17 | packages/connectors, apps/api | Platform Engineering |
| DOM-04 | #08, #06 | apps/web, apps/api | Security Operations |
| DOM-05 | #34, #36 | packages/rules, apps/api | Security Engineering |
| DOM-06 | #04 | packages/contracts, packages/db | Data Engineering |
| DOM-07 | v2.5 | packages/risk, apps/api | Security Engineering |
| DOM-08 | #62 | packages/verdicts, apps/api | Security Engineering |
| DOM-09 | #71 | packages/classification, apps/api | Threat Intelligence |
| DOM-10 | #65, #66 | apps/web | Security Operations |
| DOM-11 | #68, #10 | apps/web | Identity & Access |
| DOM-12 | #69, #09 | apps/web | Asset Management |
| DOM-13 | #70, #15 | apps/web | Security Leadership |
| DOM-14 | #22 | apps/web, apps/api | Governance & Risk |
| DOM-15 | #20, #21 | apps/web, apps/api | AI Engineering |

---

## Status

**Phase 2 Complete:** ✅ Domain Register Created  
**Total Domains:** 15 operational domains identified and cataloged  
**Critical Dependencies:** 4 critical path dependencies identified  
**Build Sequence:** Recommended 6-phase build sequence established  

**Next Phase:** Domain Operating Model (Phase 3)

---

**Last Updated:** 2026-05-30  
**Next Milestone:** Phase 3 - Domain Operating Model