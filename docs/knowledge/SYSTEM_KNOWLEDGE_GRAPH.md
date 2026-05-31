# Commander SDR — System Knowledge Graph

**Status:** First clean derivation under the locked `SOURCING_RULE.md`.
**Sourced exclusively from:** `docs/99_source_archive/baseline_v2_6_2/` (masters + child specs #01–#75).
**Excluded from sourcing:** the `.kiro/specs/` translation layer (folders 00–43) — not authority for knowledge work.
**Read state:** every file cited below was opened in-session for this build; section coverage is recorded in `COVERAGE.md`.

This document is a structural map of *what Commander SDR is*, derived from the baseline. It is not a build plan and not a roadmap. It is the substrate that subsequent artefacts (`DOMAIN_REGISTER.md`, `RELATIONSHIP_MAP.md`, `ARCHITECTURAL_FINDINGS.md`) project from.

Every claim is cited with baseline spec number **and** filename, per `SOURCING_RULE.md`. Where source genuinely lacks a list or count, the gap is recorded explicitly rather than invented.

---

## 1. The Three-Layer Identity — Category, Discipline, Platform

Commander operates at three coherent layers that must be distinguished in proposition, documentation and product surfaces. **All three are simultaneously true.** None contradicts the others.

| Layer | Name | Meaning | Source |
|---|---|---|---|
| 1 — Category | **Security Command and Control (Security C2)** | The platform layer that integrates intelligence, defence, engineering and active response into a unified operational framework above the customer's security stack, runs a continuous OODA loop at the security-programme level, and produces auditable evidence of the security function operating against the actual estate. | Spec #57 `57_Security_Command_and_Control_Doctrine_Spec.md` §2, §3 |
| 2 — Discipline | **Security Drift Response (SDR)** | The patented operational discipline Commander runs *within* the Security C2 category. The closed-loop control system that detects, analyses, controls, validates and adjusts security posture drift. | Spec #57 §3; Spec #17 `17_Closed_Loop_Control_Architecture.md` §2 |
| 3 — Platform | **Commander** | The platform brand. The SaaS product customers deploy, configure and operate. Commander runs SDR (the operational discipline) and occupies Security C2 (the category position). | Spec #57 §3; Spec #39 `39_Commander_Application_Boundary_and_Naming_Model_Spec.md` §2 |

**Boundary rule (binding doctrine):** Commander sits *above* operational security tools (SIEM, EDR, NDR, email security, web filtering, DLP, identity policy, MDM, posture management, exposure management, GRC, TIPs, Insider Risk Management). The position is hierarchical, not competitive. Commander integrates these categories; it does not replace them. Crossing into operational tool territory loses the altitude that makes Commander a category. Source: Spec #57 §4, §5.

---

## 2. The Seven Architectural Layers

Commander SDR is structured in seven architectural layers. The layering is **strict** — each layer consumes from the layer below and produces for the layer above; cross-layer shortcuts are prohibited.

Source: Master Technical Specification v7.0 `Commander_SDR_Master_Technical_Specification_v7_0.md` §1 (Platform Architecture Overview).

| # | Layer | Function | Owning specs |
|---:|---|---|---|
| 1 | **Connector Layer** | Four-class connector architecture (SOC Telemetry, Operational Verdict, Configuration State, Threat Intelligence). Read-only by default; push capability separately authorised. | #05, #09, #12, #23, #24, **#61** |
| 2 | **Normalisation Layer** | Canonical entity model, authority resolution, entity matching, verdict semantics processing, inverse discovery routing. | #12, **#62**, **#72** |
| 3 | **Engine Layer** | Drift detection (~240 models), identity intelligence, architecture intelligence, blast radius, attack-path likelihood, risk scoring, behavioural anomaly, pre-warned classification. | existing v2.5 + **#71** |
| 4 | **Intelligence Layer** | Four-stream integration, Estate Intelligence Picture, Identity Intelligence Surface, Asset Intelligence Surface, cross-stream correlation. | **#59**, **#68**, **#69** |
| 5 | **Case Layer** | Universal Risk Object binding, closed-loop case lifecycle, routing, validation, closure gates, reopening triggers. | #08, #29, #30, #31 |
| 6 | **OODA Layer** | Programme-level OODA tempo, phase health metrics, phase dashboards, Command Tempo Dashboard. | **#58**, **#67** |
| 7 | **Surface Layer** | Workspaces, dashboards, Operating Pictures, Entity Intelligence Surfaces, Direction Boards, reporting cadences, three application boundaries. | #41, **#65**, **#66**, **#70** |

(Bold spec numbers in the right column are introduced in v2.6.)

---

## 3. The Connector Layer — Four Classes, Eight Signal Purposes

### 3.1 Four connector classes

Source: Spec #61 `61_Universal_Security_Signal_Connector_Contract_Spec.md` §2.

| Class | Name | Purpose | Examples (Tier 1, named in source) |
|---|---|---|---|
| **A** | SOC Telemetry Connector | Case + detection signal from SIEM/SOC/XDR/NDR; read-only with respect to SOC operations | Microsoft Sentinel, Google SecOps (Chronicle), Splunk Enterprise Security, CrowdStrike Falcon, Microsoft Defender for Endpoint, Rapid7 InsightIDR, Darktrace |
| **B** | Operational Verdict Connector | Verdict signal from email security, endpoint compliance, endpoint prevention, web filtering, identity policy, DLP enforcement | Antigena Email, Defender for Office 365, Mimecast, Proofpoint; Intune, Jamf, Workspace ONE; Zscaler, Netskope; Conditional Access, Okta policies; Microsoft Purview, Forcepoint, Code42 Incydr |
| **C** | Configuration State Connector | Intended state of controls, assets, identities, policies — drives drift detection | The existing v2.5 connector universe extended |
| **D** | Threat Intelligence Connector | External threat intelligence (CVE, KEV, IOC streams, vendor advisories, attribution feeds) | Catalogued in `docs/03_api_specs/INDEX.md` v2.6 |

**Multi-class declaration is a first-class pattern.** A single connector may declare against multiple classes (e.g. Microsoft Defender for Endpoint = A+B+C; CrowdStrike Falcon = A+B+C; Microsoft Sentinel = A+C). Source: Spec #61 §2; MTS v7.0 §2.1.

**Class A and Class B are read-only with respect to source platforms.** The Push capability (Spec #14) operates *separately* with explicit authorisation, approval gates and reversibility. Source: MTS v7.0 §2.4.

### 3.2 Eight signal purposes

Every pull operation produces signal that resolves to one or more of eight canonical purposes. Source: Spec #61 §3; MTS v7.0 §2.2.

1. **Configuration Signal** — intended state of a control, asset, identity or policy → drift detection engine.
2. **State Signal** — actual operational state at a point in time → platform-health and coverage engines.
3. **Verdict Signal** — security decision a tool made (block / allow / quarantine / coach / require-MFA / require-compliant / monitor / alert) → Internal Behavioural Intelligence stream, Operating Pictures, Pre-Warned classification, Silent Defence Reporting.
4. **Detection Signal** — asserted event not yet resolved (EDR detection, NDR model breach, SIEM alert pre-case) → External Attack Intelligence stream, priority engine attack-context input.
5. **Case Signal** — managed investigation workflow with state, assignee, severity (SIEM incident, SOC platform case, XDR investigation, MDR ticket) → External Attack Intelligence stream, Operating Pictures, External Attack Correlation case type.
6. **Inventory Signal** — existence of an entity (asset, identity, application, network device, cloud resource) → canonical entity model.
7. **Behavioural Signal** — behavioural patterns observable in tool data (referenced in Spec #61 §3 enumeration; full §3.7 body truncated in this read pass).
8. **Threat Signal** — external threat intelligence (referenced in MTS v7.0 §2.2 list; resolves to External Threat Intelligence stream and the estate-matching engine).

### 3.3 Conformance tier system

Per Spec #61 §4.1 (read by reference in MTS v7.0 §2.3), every connector has a per-class conformance tier. Conformance tier per class is captured in `docs/03_api_specs/INDEX.md` and informs deployment planning. The full four-tier nomenclature appears in the v2.6 Baseline Configuration Addendum (Spec #55) as `connector.conformance.*` parameters; explicit tier names were not enumerated in the §4.1 portion read.

---

## 4. The Intelligence Layer — Four Streams + Estate Intelligence Picture

The Intelligence Layer is the architectural construct that integrates four streams into a unified Estate Intelligence Picture. It is "Commander's G2 — the military analogue of the intelligence function within command operations." Source: Spec #59 `59_Intelligence_Layer_Architecture_Spec.md` §2.

| Stream | Definition | Connector class | Sources (named in source) |
|---|---|---|---|
| **External Threat Intelligence** | Adversary activity, vulnerability disclosures, IOC feeds, advisory bulletins, attribution data — **globally**, then matched to the estate | Class D | OSINT feeds, NVD, KEV, IOC streams (commercial + OSINT), threat actor attribution, dark-web monitoring (where licensed), ISACs/ISAOs, vendor TI services |
| **External Attack Intelligence** | What external adversaries are doing **to this specific estate** — observed by the customer's SOC stack | Class A | SIEM (Sentinel, Splunk ES, QRadar), SOC platforms (Google SecOps, XSIAM), XDR (CrowdStrike Falcon, Defender XDR, SentinelOne, Elastic Security), NDR (Darktrace, Vectra AI, ExtraHop Reveal(x)) |
| **Internal Behavioural Intelligence** | What internal actors are doing — policy verdicts fired by operational tools in response to internal-actor activity | Class B | Email security verdict platforms; endpoint compliance verdict platforms; endpoint prevention verdict platforms; web filtering verdict platforms; identity policy verdict platforms; DLP enforcement verdict platforms |
| **Posture Intelligence** | The state of the estate itself — output of Commander's own engines over configuration state, drift, risk, architecture, access chains | Class C + engines | Drift detection, identity intelligence, architecture intelligence, blast radius, attack-path likelihood, risk scoring, behavioural anomaly |

The four streams join at the **Estate Intelligence Picture (EIP)** — the unified integration surface queried by all surface-layer consumers. Source: MTS v7.0 §5.

**Cross-stream correlations produced by the Intelligence Layer** (MTS v7.0 §5):
- Pre-Warned / Protected / Novel classification (Spec #71)
- Inverse Discovery (Spec #72)
- Threat Relevance Scoring (extended for v2.6 cross-stream correlation)
- Silent Defence aggregation (Spec #73)

---

## 5. The Two Attack Surfaces

Commander recognises **two distinct attack surfaces** in every estate. Both are real, both are continuously under pressure, both require dedicated intelligence and dedicated operational response. Source: Spec #60 `60_Internal_and_External_Attack_Surface_Framework_Spec.md` §2.

| Dimension | External Attack Surface | Internal Attack Surface |
|---|---|---|
| **What it is** | Everything external to the estate that external threat actors can touch (internet-facing services, exposed APIs, public DNS, partner integrations, OAuth boundaries, cloud-exposed services, federated identity boundaries, supply chain dependencies) | Everything internal to the estate that internal actors can act on (files, applications, data, identities, configurations, devices, network resources, SaaS, email channels) |
| **Threat actors** | External adversaries — nation-state, cybercriminal, hacktivist, opportunistic, automated botnet, supply-chain | Internal actors in three categories: **malicious** (intent to harm), **negligent** (convenience-driven, policy-ignorant), **compromised** (credentials/devices taken over by external actor, now operating internally) |
| **Detection layer** | The SOC stack — SIEM, EDR, NDR, email security from inbound perspective, IR platforms | The operational verdict layer — email/DLP/web filtering/conditional access/MDM/endpoint compliance verdicts |
| **Commander's intelligence stream** | External Attack Intelligence (Class A) | Internal Behavioural Intelligence (Class B) |
| **Defence thinking** | Raise the cost of attack — defence in depth, segmentation, hardening, patching | Preserve organisational trust and detect violation — policy enforcement, behavioural monitoring, access reviews, separation of duties |
| **Response pattern** | **Engineering work** — drift remediation, control restoration, detection-spec dispatch to SOC engineering, architectural improvement | **Investigation work** — surface the pattern (not determination of intent), classify, route to customer's Internal Risk function, track outcome |
| **Routing destination** | Security architecture, push operations, SOAR engineering, platform teams | Identity analysts, customer-configured Insider Risk programme, potentially HR + Legal |
| **Surface (v2.6)** | External Operating Picture (Spec #65) | Internal Operating Picture (Spec #66) |
| **Sub-lifecycle** | Standard closed-loop case lifecycle | Internal Risk Investigation Sub-Lifecycle (Spec #75) |

**Why the distinction matters:** different thinking, different response patterns, different organisational ownership, different governance frameworks (jurisdictional regulation on employee monitoring applies to the internal surface). Source: Spec #60 §5.

---

## 6. The Three Application Boundaries

Commander is a platform with **three distinct application surfaces** (binding doctrine — must not be merged casually). Source: Spec #39 `39_Commander_Application_Boundary_and_Naming_Model_Spec.md` §3, §4; reinforced as v2.1 Application Boundary Update across many specs (e.g. Spec #29, #30, #31, #32, #33, #34, #41).

| # | Application | Purpose | Owns | Does NOT own |
|---:|---|---|---|---|
| 1 | **Commander SDR Operational Application** | Operational Security Drift and Remediation product — customer-facing and internal operational surface | Command Centre, cases, risk objects, Fusion Map, vulnerability management, exposure management, identity risk, architecture drift, validation state, communication binding, dashboards, reporting | Licence allocation, entitlement manifest authoring, internal support-access approval, commercial feature allocation, deployment-ring assignment |
| 2 | **Commander SDR Tenant Admin Surface** | Customer tenant administration within granted entitlement boundaries | Tenant users, tenant RBAC within entitlement, tenant connectors, tenant notification settings, tenant policy settings, tenant audit/export, tenant-visible feature configuration | Paid entitlement expansion, commercial module allocation, licence-plan authoring, internal deployment-ring assignment, internal support-access approval |
| 3 | **Commander Internal Control Plane Application** | Internal commercial / platform / operator governance — used by the Seiertech / Commander operating team | Customer register, tenant register, licence allocation, entitlement manifests, feature/module allocation, deployment rings, trial/demo/dogfood tenant management, support-access governance, self-hosted licence artefacts, operator audit, emergency platform controls | Customer remediation workflow execution, customer case-lifecycle progression, customer risk prioritisation, customer evidence submission |

**Authority hierarchy (Spec #39 §6):** Commander Control Plane → Entitlement Manifest → Tenant Admin delegated configuration → Operational App runtime enforcement → User role permissions.

**Visual treatment (Spec #41 §4):** Operational App carries the strongest command/intelligence treatment (intensity ceiling Level 3); Tenant Admin a controlled administrative console (ceiling Level 2); Internal Control Plane a secure operator-console (Level 2, with Level 3 only for emergency controls).

---

## 7. The Closed-Loop Case Engine

The Case Layer (Architectural Layer 5) is the load-bearing operational engine of SDR. Four sub-models: Risk Object, Case lifecycle, Sub-Action lifecycle, Validation lifecycle.

### 7.1 The Universal Risk Object contract

Every domain emits or links to a canonical `RiskObject`. Source: Spec #29 `29_Universal_Risk_Object_and_Case_Binding_Spec.md` (Closed-Loop Functional Doctrine Patch v2.0 §3) — also reproduced in Specs #30, #31, #32, #33, #34 patches.

Required minimum fields: `risk_object_id`, `risk_object_type`, `domain`, `source_systems[]`, `affected_entities[]`, `case_binding_status`, `case_id`, `sub_action_ids[]`, `validation_state`, `routing_state`, `priority_score`, `closure_gate_state`, `reopen_trigger_state`, `mission_impact`, `fusion_map_refs[]`.

**Risk object types — base enum (17 values, verified in Spec #29 v2.0 patch §3):**

`identity` · `architecture` · `vulnerability` · `exposure` · `control` · `drift` · `tool_health` · `coverage` · `blast_radius` · `asset` · `communication` · `trust_boundary` · `BAS` · `SIEM_SOAR` · `shared_responsibility` · `security_debt` · `exception`

**v2.6 extension (MTS v7.0 §6.3):** the `risk_object_type` enum extends with at least `ooda_phase_degradation` (and additional types listed in MTS §6.3 — full list truncated in this read pass; recorded as **GAP** for completion in a follow-up read of MTS §6.3).

### 7.2 Case binding outcomes

Source: Spec #29 base spec.

| Outcome | Meaning | Allowed? |
|---|---|---|
| `bound_new_case` | New case created by system | Yes |
| `linked_existing_case` | Object linked to existing case | Yes |
| `suppressed_approved` | Suppressed by approved policy | Yes |
| `residual_risk_accepted` | Bound to residual-risk record | Yes |
| `allocation_error` | Binding failed; system creates allocation-error case | Yes |
| `unbound` | Actionable object without case | **No** |

**Doctrine:** No manual case creation. Every actionable risk object is case-bound. Source: Spec #29 base + v2.0 patch §2.

### 7.3 The closed-loop case lifecycle (12 states)

Source: Spec #29 v2.0 patch §4; Spec #30 `30_Universal_Validation_Closure_and_Reopening_Lifecycle_Spec.md` v2.0 patch §4.

```
DETECTED
  → BOUND
  → ROUTED
  → PRIORITISED
  → ACTION_DECOMPOSED
  → IN_PROGRESS
  → PENDING_VALIDATION
  → VALIDATION_RUNNING
  → VALIDATED_FIXED | VALIDATED_COMPENSATED | VALIDATED_SUPPRESSED |
    VALIDATED_RESIDUAL_ACCEPTED | VALIDATION_FAILED | VALIDATION_INCONCLUSIVE
  → PENDING_CLOSURE_GATES
  → CLOSED_BY_SYSTEM
  → REOPENED_BY_SYSTEM (when triggers fire)
```

Forbidden lifecycle interactions: user-created case · user-closed case · user-reopened case · analyst-only lifecycle progression · unvalidated closure · closure based only on ITSM or email acknowledgement.

### 7.4 Sub-Action lifecycle (14 states)

Source: Spec #30 v2.0 patch §5 (also in #29, #31, #32, #33, #34).

`GENERATED` → `ROUTED` → `OWNER_NOTIFIED` → `EVIDENCE_REQUIRED` → `IN_PROGRESS` → `PENDING_APPROVAL` (when applicable) → `PENDING_EXECUTION` (when applicable) → `PENDING_VALIDATION` → `VALIDATED` | `FAILED_VALIDATION` | `SUPPRESSED_APPROVED` | `RESIDUAL_ACCEPTED` → `CLOSED_BY_SYSTEM` → `REOPENED_BY_SYSTEM`.

Parent cases SHALL NOT close while a blocking sub-action is unresolved unless an approved exception, approved suppression or accepted residual-risk record exists.

### 7.5 Validation lifecycle (11 states)

Source: Spec #30 base + v2.0 patch §6.

`NOT_STARTED` · `EVIDENCE_REQUESTED` · `EVIDENCE_RECEIVED` · `VALIDATION_RUNNING` · `VALIDATED_FIXED` · `VALIDATED_COMPENSATED` · `VALIDATED_NOT_FIXED` · `VALIDATION_INCONCLUSIVE` · `VALIDATION_BLOCKED` · `VALIDATION_EXPIRED` · `REVALIDATION_REQUIRED`

Validation is triggered by: source refresh, connector delta, owner evidence, push execution, BAS result, SIEM/SOAR deployment status, control-state change, scanner refresh, identity-graph change, architecture-graph change, communication evidence.

### 7.6 Closure gates (12 gates)

A case closes only when all configured closure gates pass. Source: Spec #30 base + v2.0 patch §7.

technical validation · sub-action completion · communication (where configured) · external notifier (where configured) · SIR acknowledgement (where configured) · SLA/residual phase · exception/suppression expiry · evidence freshness · approval · audit completeness · mission-impact · fusion-map state refresh.

### 7.7 Reopening triggers (14 triggers)

A closed case reopens automatically when any configured trigger fires. Source: Spec #30 base + v2.0 patch §8.

original risk condition reappears · risk-object source severity/exploitability changes · KEV/CVSS/EPSS/MISP/vendor/BAS/threat-intel status changes materially · validation expires or fails · compensating control disappears or degrades · affected asset/identity/exposure/dependency expands · blast radius expands · mission-objective impact increases · routing owner rejects or cannot fulfil work · communication thread receives material inbound evidence · connector freshness drops below threshold · tool coverage degrades · suppression or exception expires · strategy threshold changes and requalifies the case.

### 7.8 The twelve case types (v2.5 + v2.6)

Source: Spec #08 `08_Case_Management_Workflow_Spec.md` §V2.6-1 (v2.6 Extension addendum).

**v2.5 case types (carried forward unchanged) — 7:**

1. Drift case
2. Coverage case
3. Vulnerability case
4. Exposure case
5. Identity case
6. Architecture case
7. Threat Intelligence Estate Match case

**v2.6 new case types — 5:**

8. **External Attack Correlation case** — Commander's parallel record when a SOC case binds to Commander entities. Tracks pre-warned classification, control-weakness correlation, and any drift item exposed by the attack. Routes to Commander analyst, **not** to the SOC. The SOC case in their own system remains the authority on incident response.
9. **Verdict Pattern case** — Generated when internal behavioural intelligence flags a pattern warranting attention (verdict count anomalies, peer-group deviation, geographic/temporal clustering, policy-firing concentration). Routes to the customer-configured Internal Risk function; subject to the Internal Risk Investigation Sub-Lifecycle (Spec #75).
10. **Inverse Discovery (Coverage Blindspot) case** — Generated when external signal references an entity Commander doesn't know about. Root cause auto-classified into Discovery Gap / Staleness / Shadow IT / Naming Mismatch.
11. **Policy Effectiveness case** — Generated when a security policy exhibits a pattern suggesting it isn't working as intended (override rate above threshold, zero-fire anomaly, or drift between intended and actual enforcement). Routes to policy owner.
12. **OODA Tempo Degradation case** — Generated when Commander's own OODA phase health drops below configurable threshold. Routes to SOM or platform team depending on which phase degraded.

**Default priority assignment** (Spec #08 §V2.6-4):

| Case Type | Default Priority | Promotion triggers |
|---|---|---|
| External Attack Correlation | P1 | Pre-warned classification escalates to P0 if confidence high and asset critical |
| Verdict Pattern | P2 | Severity/scope of pattern can promote to P1 |
| Inverse Discovery | P3 | Critical-asset references can promote to P2 |
| Policy Effectiveness | P3 | Override rate above critical threshold can promote to P2 |
| OODA Tempo Degradation | P2 | Sustained degradation can promote to P1 |

Priority is modulated by the Context-Aware Drift Prioritisation Matrix (Spec #74) for case types that touch drift state.

---

## 8. Routing Model and Strategy Layer

### 8.1 Routing inputs and outputs

Routing is **deterministic and system-owned**. Users may challenge a route or request recalculation; users do not directly own lifecycle routing authority. Source: Spec #31 `31_Routing_Model_and_Team_Affinity_Spec.md` base + v2.0 patch §9.

**Inputs:** domain · risk-object type · owner of affected asset/identity/application/cloud account/tool/control/business service · business unit · tenant + organisation · environment · severity · priority · blast radius · mission impact · operational tempo · required skills · team affinity · workload · escalation path · approval authority · time zone · communication ownership · shared-responsibility profile · automation boundary.

**Outputs:** route owner · route team · backup owner · approval authority · escalation path · route rationale · recalculation trigger · UI route badge.

The route decision is visible in UI with route rationale and route challenge controls. Route challenge does not directly reroute the case; it requests route recalculation or approval review.

### 8.2 The twelve Strategy Layer runtime surfaces

Source: Spec #32 `32_Strategy_Layer_Runtime_Surface_Spec.md` base; reproduced in patches across #29, #30, #31, #33, #34.

1. SLA Strategy
2. Threshold Strategy
3. Automation Boundary Strategy
4. Routing Strategy
5. Posture Strategy
6. Mission Objective Strategy
7. Operational Tempo Strategy
8. Domain-Specific Strategy
9. Prioritisation Weight Strategy
10. Validation Window Strategy
11. Closure Gate Strategy
12. Reopening Trigger Strategy

A **Strategy Centre** UI exposes configuration, simulation, approval workflow, audit history and effective-policy preview. Strategy changes trigger priority recalculation, route recalculation, validation recalculation, closure-gate recalculation, reopening evaluation and Fusion Map refresh.

### 8.3 Priority framework (Spec #28) and v2.6 modulation (Spec #74)

The Strategic and Tactical Priority Framework (Spec #28 `28_Strategic_and_Tactical_Priority_Framework_Spec.md`) connects CISO-level objectives to SOM operational execution through:

- **StrategicPriority** entity (sponsor, objective, target metrics, scope tags, time horizon, status, review cadence)
- **TacticalPriority** entity (links to a strategic priority, owner team, target case types, target metrics, boost policy, BAU protection policy)
- **Case Alignment Engine** producing explainable alignment reasons
- **Priority Boost Mechanism** that influences queue ordering but **must not** override safety gates, RBAC, approval requirements or SLA breach rules
- **BAU Workload Protection** monitoring whether strategic/tactical work is overwhelming BAU operations

The **canonical priority ladder** (post-v2.2 P0 update reproduced in Spec #28): `P0_ZERO_DAY` · `P1_CRITICAL` · `P2_HIGH` · `P3_MEDIUM` · `P4_LOW` · `P5_INFORMATIONAL`.

**v2.6 Context-Aware Drift Prioritisation Matrix** (Spec #74 `74_Context_Aware_Drift_Prioritisation_Matrix_Spec.md` §3) modulates Drift case priority across **five dimensions**:

1. **Attack Context** — direct attack on same entity (+2 bands), adjacent attack in same blast-radius zone (+1), recent attack in past 30 days (+0.5), defence-worked verdict (no modulation), no context (no modulation).
2. **Threat Intelligence** — KEV match (+1), active campaign match (+0.5), historical/legacy threat (no modulation), no match (no modulation).
3. **Verdict Layer** — defence bent (overrides, low-confidence allowances, disagreement) (+0.5), defence engaged (no modulation), no verdict context (no modulation).
4. **Identity Exposure** — privileged identity affected (+0.5), critical asset affected (+0.5).
5. **Strategic Priority** — alignment to active strategic or tactical priority modulates per Spec #28.

**Decay** (§5): attack-context decays linearly over the attack-case lifecycle then 30 days post-closure; threat-intel context decays as KEV/campaign ages; verdict-layer context decays based on verdict recency; identity-exposure and strategic-priority dimensions do not decay (recomputed continuously). **Kill switches** (§6) per-dimension and global, plus an audit-only mode. **Auto-promotion to tactical priority** (§7) when context modulation elevates a Drift case above threshold with active attack context and high identity exposure.

P0 remains reserved for explicit Zero-Day overlay per existing v2.5 doctrine; context modulation cannot create P0 — it can only modulate P1 through P4.

---

## 9. The Security OODA Loop (Programme-Level)

Source: Spec #58 `58_Security_OODA_Loop_Specification.md` §2, §3.

Commander runs a **continuous Security OODA Loop at the security-programme level**. Two altitudes:

- **Incident-level OODA** — per-incident, real-time, human-driven; the SOC's job, lives in the SOC's tooling. Commander does **not** operate at this altitude.
- **Programme-level OODA** — continuous across the estate, system-driven, security-function-level; **Commander's job**, lives in Commander.

The two are complementary, not substitutes.

### 9.1 The four phases

| Phase | Question it answers | Engines consumed | Phase health metrics |
|---|---|---|---|
| **Observe** | *How well is Commander seeing the estate right now?* | Class A/B/C/D connectors; Inverse Discovery | Connector freshness per class; signal volume by purpose and class; coverage completeness; blind-spots; aggregate Observe phase health score 0–100 |
| **Orient** | *What does the signal mean in the context of this estate?* | Drift detection (~240 models across 13 domains); risk scoring; blast radius; pre-warned classification (#71); architecture intelligence; identity-chain computation; threat relevance scoring; entity + authority resolution | Drift detection tempo; risk-model freshness; architecture-intelligence status; classification distribution (pre-warned/protected/novel); blast-radius computation tempo; aggregate Orient phase health score |
| **Decide** | *Given what we understand, what should be done?* | Remediation generation (push payloads, detection specs, compensating controls, manual recommendations); routing engine (#31); priority boost (#28); Context-Aware Drift Prioritisation Matrix (#74); tactical-objective auto-promotion; approval orchestration | Decision throughput; queue depth; approval cycle time; routing accuracy; auto-promotion activity; aggregate Decide phase health score |
| **Act** | *Was what was decided actually done?* (full §3.4 body truncated in this read) | Push execution, ITSM dispatch, detection-spec deployment, manual remediation completion, validation | Execution throughput, latency, success rate, validation pending, failed actions, closure tempo (per Spec #67 §6) |

### 9.2 OODA → SDR closed-loop mapping

Source: Spec #17 v2.6 OODA Integration Addendum §V2.6-1.

| SDR Closed-Loop Stage | OODA Phase |
|---|---|
| Detection | Observe |
| Analysis | Orient |
| Control | Decide |
| Validation | Act (completion) |
| Adjustment | Loop closure |

The mapping is not a renaming. The SDR five-stage loop remains the operational discipline at the case level. The OODA four-phase framework operates at the programme level above the case loop. Every case progresses through the five SDR stages; the programme's overall tempo across all cases is measured through the four OODA phases.

### 9.3 OODA Dashboard Family (Spec #67)

Source: Spec #67 `67_OODA_Dashboard_Family_Spec.md` §2.

Five dashboards comprise the family:

1. **Observe Phase Dashboard**
2. **Orient Phase Dashboard**
3. **Decide Phase Dashboard**
4. **Act Phase Dashboard**
5. **Command Tempo Dashboard** — unified executive view; the CISO's primary executive surface alongside the Operating Pictures.

**Four reporting cadences** against the same data substrate (Spec #67 §8):
- Hourly Tactical Refresh (SOM, ops centre, on-shift Security Analysts) — real-time interactive view
- Daily Executive Summary (CISO) — auto-generated digest
- Weekly Programme Review (security leadership team) — structured weekly report
- Monthly Board Report (Board, executive leadership) — auto-generated PDF/document with audit-grade narrative

The CISO presenting the monthly board report uses the same vocabulary the SOM uses on the operations floor.

---

## 10. Five Structural Capabilities of Security C2

Per Spec #57 §6, Security C2 as Commander implements it is defined by five structural capabilities that no other category provides:

1. **Integration of four intelligence streams** — External Threat, External Attack, Internal Behavioural, Posture; joined to the same canonical estate model, governed under the same case lifecycle, surfaced through the same Intelligence Layer. Detail in Spec #59.
2. **Programme-level OODA tempo** — OODA loop as continuous operational rhythm across the entire security function; phase-health metrics, tempo measurement, bottleneck identification, dashboards across four reporting cadences. Detail in Spec #58, Spec #67.
3. **Pre-Warned, Protected, Novel classification** — every external attack landing on the estate classified against Commander's prior knowledge of the affected entity. Detail in Spec #71.
4. **Dual Operating Pictures** — External Operating Picture for external attack activity, Internal Operating Picture for internal actor activity. Detail in Spec #60, Spec #65, Spec #66.
5. **Silent Defence Reporting** — aggregate picture of what the security stack does every day. Detail in Spec #73.

These five capabilities are the **definitional features** of the Security C2 category position and the structural reasons for the v2.6 architectural extensions.

---

## 11. Pre-Warned / Protected / Novel Classification

Source: Spec #71 `71_Pre_Warned_Protected_Novel_Classification_Spec.md` §2, §3.

Every external attack landing on the estate is classified against Commander's prior knowledge of the affected entity:

| Classification | Meaning | UI ring (Spec #65 §3.3) |
|---|---|---|
| **Pre-warned** | Active drift / coverage gap / exposure / known control weakness on the entity at SOC case open time | Amber |
| **Protected** | No active warning items on the entity, posture data current — attack landed despite Commander considering the entity protected; investigate as potential novel TTP, sophisticated adversary, or insider compromise | Blue |
| **Novel** | Posture data stale or entity unresolved — classification too ambiguous to determine yet | Grey |
| **Defence Worked (overlay)** | Verdict-layer correlation indicates defence prevented or contained the attack | Green (optional) |

**The classification engine (§3) executes in three phases:**

1. **Entity Resolution** — look up each entity referenced in the SOC case in the canonical entity model. If unresolved, fire **Inverse Discovery** (Spec #72) and pause classification pending resolution.
2. **Posture Assessment** — retrieve posture state as of SOC case open timestamp (drift findings, coverage gaps, exposure findings, control state).
3. **Classification Decision** — apply the rules above. Every classification produces an immutable audit record (Case ID, entity ID(s), classification result, posture state captured at case open, engine version, classification timestamp, subsequent reclassification events).

**Confidence values:** High (entity fully resolved, posture data current and complete) · Medium (entity resolved, posture data current with gaps) · Low (entity partially resolved or posture data stale).

**Reclassification paths** (§4) are audit-logged with rationale: Pre-warned → confirmed pre-warned · Novel → pre-warned · Protected → pre-warned (signals Inverse Discovery) · Pre-warned → protected (rare; usually false positive in original drift detection).

**Priority integration** (§6): pre-warned attacks elevate the warning drift item to P1 (or higher if already P0). Protected attacks elevate the External Attack Correlation case to P1 with highest tier reserved for protected attacks involving identity compromise or mission-critical assets.

The classification record is one of the most consequential audit artefacts Commander produces, used in board reporting, regulatory reporting, insurance claims, litigation, and investment decisions (§8).

---

## 12. Verdict Semantics

Source: Spec #62 `62_Verdict_Semantics_Specification.md` §2, §3, §4.

Verdicts are **claims, not facts**. They are time-bound, confidence-weighted, density-aggregated, disagreement-aware and trust-calibrated.

### 12.1 Five mandatory dimensions on every verdict

1. **Identity** — what the verdict was about (mailbox, identity, endpoint, file, URL, network destination, application).
2. **Time** — when the verdict was made (vendor timestamp normalised to UTC; connector pull timestamp recorded separately).
3. **Disposition** — what happened (the canonical decision).
4. **Policy reference** — what rule/model/policy fired in the source tool.
5. **Source** — connector identifier and source platform identifier.

Three optional dimensions where vendor signal supports: **Confidence**, **Severity**, **MITRE mapping**.

### 12.2 Eight canonical verdict disposition types (§4)

`BLOCK` · `QUARANTINE` · `COACH` · `REQUIRE_MFA` · `REQUIRE_COMPLIANT` · `MONITOR` · `ALLOW` · `AUDIT`

Vendor-specific verdicts that don't fit cleanly are mapped to the closest canonical disposition with vendor-specific detail preserved in metadata.

### 12.3 Density, disagreement, trust calibration

- **Verdict density** is computed at multiple aggregation levels: per-entity, per-policy, per-disposition, per-source, cross-axis. Computed continuously, denormalised aggregate tables for fast query, underlying events in tiered storage (hot 24-72h / warm 3-30d / cold 30d+ summary form). Source: §5; tier durations from Spec #55 v2.6 addendum §V2.6-2.
- **Verdict disagreement detection** (§6) — when multiple tools produce contradictory verdicts on the same entity at the same time, the disagreement is meta-signal. Patterns: Block-Allow disagreement; severity disagreement; cross-layer disagreement. Persistent pattern-disagreement across multiple events generates a candidate Policy Effectiveness case; single-event disagreements are logged but do not generate cases.
- **Trust calibration** is per-tool weighting tuned over time based on correlation with confirmed cases (Spec #59 §3.3 reference).

---

## 13. Multi-Domain Fusion Map

The Multi-Domain Fusion Map is the cross-domain analytical surface for case investigation. Source: Spec #33 `33_Multi_Domain_Fusion_Map_Spec.md` base.

**Required node types (32 types):**

`asset` · `identity` · `privileged_identity` · `service_account` · `application` · `cloud_account` · `cloud_workload` · `vulnerability` · `exposure` · `control` · `compensating_control` · `drift_object` · `case` · `sub_action` · `communication_thread` · `mailbox` · `tool` · `connector` · `telemetry_source` · `trust_boundary` · `third_party` · `business_unit` · `mission_objective` · `SLA_object` · `exception` · `suppression` · `security_debt_item` · `BAS_simulation` · `blast_zone` · `route_owner` · `team` · `approval_authority`

**Required edge types (28 types):**

`owns` · `operates` · `depends_on` · `authenticates_to` · `administers` · `exposes` · `protects` · `lacks_control` · `has_vulnerability` · `has_drift` · `covered_by` · `not_covered_by` · `monitored_by` · `routed_to` · `assigned_to` · `approved_by` · `blocked_by` · `validated_by` · `failed_validation` · `communicates_with` · `escalated_to` · `suppresses` · `compensates_for` · `reopens` · `closes` · `impacts_mission` · `expands_blast_radius` · `reduces_blast_radius`

**Required overlays (18 overlays):**

risk · drift · exposure · control · coverage · identity · vulnerability · architecture · tool_health · blast_radius · mission · SLA · validation · communication · routing · reopening · closure_blocker · automation_eligibility

**Interaction rules (binding):** clicking a risk node opens the bound risk object and case; clicking an edge opens the evidence chain; the map cannot create freeform cases; the map can prioritise, request validation refresh, request routing review, challenge closure, and open communication context.

### 13.1 Fusion Map vs Operating Pictures

Per Spec #33 v2.6 Fusion Map Addendum §V2.6-1, these are **distinct surfaces**:

| Dimension | Multi-Domain Fusion Map | Operating Pictures (External, Internal) |
|---|---|---|
| Primary purpose | Cross-domain analytical surface for case investigation | Real-time operational command surface for the security programme |
| Time orientation | Investigative — focused on a case or set of cases | Operational — focused on current state of the estate |
| Primary user | Security Architect, Security Analyst, SOM (investigation context) | CISO, SOM, Security Analyst (command context) |
| Update cadence | On-demand (user initiates) | Continuous (live refresh) |
| Scope | Cases under investigation | Entire estate |
| Visual language | Network graph, cross-domain relationships | Map-based, threat-surface visualisation |

Both consume from the same Estate Intelligence Picture and share the canonical entity model, the four-stream Intelligence Layer feed, the case-binding model, and the verdict-semantics layer. Cross-surface drill paths preserve filter and time-window state.

The Fusion Map adds visualisation support for the five v2.6 case types (Spec #33 §V2.6-4): External Attack Correlation cases (attack-overlay visualisation); Verdict Pattern cases (behavioural-pattern visualisation; heat density on affected identity); Coverage Blindspot cases (dotted-outline entities indicating reference exists but entity not yet onboarded); Policy Effectiveness cases (policy-effectiveness ring around policy object); OODA Tempo Degradation cases (platform-level annotations — Commander's own state surfaced).

---

## 14. Surface Layer

### 14.1 Six workspaces

The UI is organised around **workspaces (jobs-to-be-done)**, not job titles. Source: Master Proposition v5.0 `Commander_SDR_Master_Proposition_v5_0.md` §24; MTS v7.0 §8.1.

| Workspace | Purpose | Primary personas |
|---|---|---|
| **Executive Posture** | Enterprise risk, trend, posture, governance, compliance alignment | CISO, Risk/Compliance, Risk Analyst |
| **Drift Operations** | (Body of §24 table truncated in this read for the four middle workspaces — Drift Operations confirmed by name in §24.1 v2.6 surface additions) | (recorded as **GAP** for completion in a focused re-read of MP v5.0 §24) |
| **Control & Architecture** | (As above) | (recorded as **GAP**) |
| **Identity & Asset Intelligence** | (As above) | (recorded as **GAP**) |
| **Assurance & Audit** | (As above) | (recorded as **GAP**) |
| **Transformation & M&A** | Integration, comparative posture, inherited risk, change-programme | M&A/Transformation Analyst |

**v2.6 surface additions distributed across workspaces** (MP v5.0 §24.1):
- External Operating Picture (Spec #65) — Executive Posture, Drift Operations
- Internal Operating Picture (Spec #66)
- OODA Dashboard Family (Spec #67)
- Identity Intelligence Surface (Spec #68)
- Asset Intelligence Surface (Spec #69)
- Direction Boards (Spec #70)
- Silent Defence Reporting (Spec #73)

(MTS v7.0 §8.2 confirms the seven v2.6 surface additions.)

### 14.2 Mission Control + four pulse surfaces

Source: Spec #34 `34_Mission_Control_System_Team_Domain_Pulse_Spec.md` base.

- **Mission Control** — defines mission objectives, mission-critical assets, priority weighting, operational tempo, escalation thresholds, blast-radius sensitivity.
- **System Pulse** — connector health, validation backlog, closure blockers, reopening events, automation blockers, SLA forecast, Fusion Map freshness.
- **Team Pulse** — workload, team affinity, routed queue, escalation queue, validation queue, approval queue, communication backlog, blocked sub-actions.
- **Domain Pulse** — per-domain risk movement across identity, architecture, vulnerability, exposure, controls, drift, tool health, coverage, blast radius.

**Doctrine (binding):** Pulse surfaces are decision surfaces. They support prioritisation, challenge, evidence submission and drill-down only. They must not expose manual lifecycle mutation.

### 14.3 The two Operating Pictures (v2.6)

**External Operating Picture (Spec #65)** — Commander's command-grade dashboard for external attack activity. Composes the Estate Intelligence Picture into a battlefield view. Seven principal regions (§3): Estate Map Base Layer (six default zones — Identity, Cloud, SaaS, Endpoint, Server, Network); External Attack Overlay; Pre-Warned and Protected Classification Rings; Case Response Board (carries binding "Commander observes · SOC owns" attribution); Control Weakness Direction Board; Detection Layer Indicators; Command Tempo Snapshot. Visual language uses red emphasis for active attack activity. Intensity Level 2 (Tactical Analysis) during normal ops, Level 3 (Emergency Command) when P0 active.

**Internal Operating Picture (Spec #66)** — paired surface for internal-actor behavioural patterns. Six principal regions (§3): Estate Map Base Layer (same six zones for cross-navigation); Verdict Density Overlay (amber-through-violet gradient — deliberately distinct from External COP red); Identity Risk Pattern Visualisation (gated by Internal Risk authority for identity-level detail); Geographic Anomaly Markers; Policy Effectiveness Direction Board; Command Tempo Snapshot (internal tempo). Default mode is `aggregate_only`; per-identity unlock requires Internal Risk authority (Spec #19 v2.6); audit-of-access logged per Spec #75.

### 14.4 Direction Boards (Spec #70)

Two Direction Boards, paired with the Operating Pictures:

- **Control Weakness Direction Board** (paired with External COP) — composition: Exploited Controls panel + Unexploited Weaknesses panel + footer summary line. Data sources: Active External Attack Correlation cases, Coverage Control Model output, active Coverage and Drift cases involving controls, Pre-Warned classification engine output.
- **Policy Effectiveness Direction Board** (paired with Internal COP) — composition: High Override Rate panel + Zero-Fire Anomaly panel + Disagreement Pattern panel + footer summary line. Data sources: Internal Behavioural Intelligence stream verdict density, policy reference data from Class B connectors, verdict disagreement detection (Spec #62), override events from operational tools.

The Policy Effectiveness Direction Board generates Policy Effectiveness cases when patterns persist (Spec #70 §5); Control Weakness Direction Board does not generate a new case type — patterns surface to existing Coverage/Drift case lifecycle.

### 14.5 Identity and Asset Intelligence Surfaces

- **Identity Intelligence Surface (Spec #68)** — dedicated per-identity intelligence picture integrating access, behavioural, threat, case, and risk-trajectory data for a single identity. Behavioural section gated by Internal Risk authority (Spec #55 v2.6 §V2.6-9 default `behavioural_section_visible_to: internal_risk_authority`).
- **Asset Intelligence Surface (Spec #69)** — dedicated per-asset intelligence picture parallel to the Identity Intelligence Surface for any asset (device, server, workload, container, application). Surface that opens when an asset appears in an active attack case, when investigating "why is this server appearing in so many cases?", during M&A integration, and supports retirement / refresh / incident retrospective.

### 14.6 Silent Defence Reporting (Spec #73)

**Option A architecture — reporting and dashboard only; does not generate cases.** Source: Spec #73 §2.

Composition (§3): Daily Silent Defence Summary (auto-generated); Weekly Silent Defence Report (SOM, CISO); Monthly Board-Grade Silent Defence Report (audit-grade narrative); Silent Defence Dashboard (real-time, ambient).

**Defence Story narrative** (§4) — auto-generated narrative descriptions composed from verdict aggregates with optional Commander AI elaboration. **Cost avoidance estimation** (§5) — configurable per prevention category, multiplied by tenant analyst cost rate.

Verdict-level events that warrant case investigation are handled by **other** case types per Spec #62 Section 9 (Verdict Pattern, Policy Effectiveness, External Attack Correlation, Coverage Blindspot).

### 14.7 Inverse Discovery Loop (Spec #72)

**Capability statement (§2):** When external signal references an entity Commander doesn't know about, the lookup failure is itself a finding. The Inverse Discovery Loop converts the lookup failure into a Coverage Blindspot case that drives entity onboarding and connector tuning.

This is the **dual** of Pre-Warned Classification: Pre-Warned says *"we knew, attack landed"*; Inverse Discovery says *"we didn't know, external signal told us we should have."* Both are auditable feedback loops that make Commander's intelligence picture more honest over time.

**Loop phases (§3):** Trigger → Resolution Attempt (fuzzy match, identifier translation, recent-change check, cross-tenant reference, source authority hierarchy) → Case Generation (with one of four root-cause classifications) → Routing → Resolution.

**Four root-cause classifications:**
- **Discovery gap** — entity exists in a system not yet observed by a connector → routes to platform engineering for connector onboarding evaluation.
- **Staleness** — entity exists in an observed system but the connector hasn't pulled recently enough → routes to platform engineering for connector tuning.
- **Shadow IT** — entity exists outside the customer's known security tooling → routes to security architecture (and possibly Internal Risk where shadow IT use suggests policy violation).
- **Naming mismatch** — entity exists under a different identifier; entity-matching logic needs tuning → routes to platform engineering and security architecture jointly.

**Closed-loop property (§5):** the rate decreases over time as the inventory matures. Inverse Discovery rate is an Observe-phase health metric (Spec #58, Spec #67).

---

## 15. Personas, Authority Overlays, and RBAC

### 15.1 Eleven personas

Source: MTS v7.0 §9.1 (per Spec #17 v2.6 reference); MP v5.0 §22.

The persona model is referenced in MTS v7.0 §9.1 as **eleven personas (nine existing plus Security Analyst and Risk Analyst)**. The full enumerated list is in Spec #17 (Target Users and Persona Model) v2.6, but the v2.6 persona expansion addendum was not located in the §V2.6 portion of Spec #17 read for this build. The enumerated names confirmed in source:

- **Security Analyst** (new in v2.6) — cross-domain investigator hunting across the four intelligence streams. Sits between SOC Operations Analyst (case queue triage) and Security Architect (control design). Primary workspace: Drift Operations with extensive Intelligence Layer access. Source: MP v5.0 §22.
- **Risk Analyst** (new in v2.6) — operational risk modelling. Primary workspace: Executive Posture with cross-workspace access. Source: MP v5.0 §22.

The other nine personas (CISO, SOC Operations Analyst, Security Architect, Identity/Access Specialist, Vulnerability Analyst, M&A/Transformation Analyst, Risk/Compliance/Audit User, Tenant Admin/Security Platform Owner, SOM — names typical from prior reads but not all explicitly enumerated as a list in the §V2.6 portions read this session) are recorded as **GAP — to be confirmed by full read of Spec #17 v2.6 Persona Expansion Addendum**.

### 15.2 Authority overlays — five (v2.6)

Source: MTS v7.0 §9.2 (per Spec #17 v2.6 reference).

1. Administrative authority
2. Investigation authority
3. Approval authority
4. Reporting authority
5. **Internal Risk authority** (new in v2.6)

**Internal Risk authority** (Spec #75 §4) is granular: may be granted per-investigation (time-bounded), persistent (ongoing for the customer's Internal Risk team), or scoped (e.g. for non-executive identities only). All access under Internal Risk authority is audit-of-access logged with accessor identity, accessed identity, access timestamp, access purpose, specific surface/section accessed.

### 15.3 RBAC scope extensions (v2.6)

Per MTS v7.0 §9.3 (per Spec #19 v2.6), RBAC scopes extend with:

- **Stream scope** (Intelligence Layer access per stream — External Threat / External Attack / Internal Behavioural / Posture)
- **Surface scope** (per v2.6 surface — Operating Pictures, OODA dashboards, Direction Boards, Intelligence Surfaces)
- **OODA Phase scope** (operational metric access per phase)

Additional v2.5 scopes including domain, case type and connector class are referenced by Spec #50 `50_RBAC_Entitlement_Feature_Flag_Menu_Visibility_Spec.md` (§Visibility Inputs):
1. RBAC permissions
2. Tenant entitlement
3. Feature flag
4. Environment availability
5. Operational mode
6. Policy state
7. Surface boundary
8. Build status

Visibility decision rule (Spec #50): `can_render = user_has_required_permission AND tenant_has_required_entitlement AND feature_flag_enabled AND route_available_in_environment AND policy_state_allows AND surface_boundary_allows`.

**Frontend visibility is presentation, not security.** Backend / API enforcement is mandatory and authoritative (Spec #50 §Backend Enforcement Rule; Spec #56 §8).

---

## 16. Internal Risk Investigation Sub-Lifecycle (Spec #75)

**Governance statement (§2):** Commander operates as the **surface and routing layer** for internal-attack-surface activity. Commander does not investigate insiders, does not determine intent, does not initiate disciplinary action, does not hold investigation-grade evidence (only intelligence-grade), and does not run forensic workflow.

The customer's Internal Risk function — wherever organisationally located (SOC, HR, Legal, Compliance, dedicated Insider Risk team) — owns: the investigation, HR engagement, legal review, any disciplinary action, any law enforcement referral, the investigation outcome and disposition.

This boundary is binding doctrine.

### 16.1 Six-phase Verdict Pattern case sub-lifecycle

Source: Spec #75 §3.

1. **Surface phase** — case is surfaced with pattern description, affected identity reference (with RBAC restrictions on identity-level detail per Spec #66), pattern severity, pattern context. **No determination of intent** — the case carries the pattern, not a judgement.
2. **Triage phase** — Commander analysts with Internal Risk authority confirm pattern significance, suppress noise (auto-suppression rule for similar future patterns), or route confirmed patterns.
3. **Routing phase** — routing per Spec #31 v2.6 sends the case to the customer-configured Internal Risk function. Default routing: Internal Risk team / Insider Risk Management lead. Sub-routing by pattern type (geographic anomalies may route differently from DLP-pattern verdicts depending on customer organisational structure).
4. **Customer Investigation phase** — Commander maintains audit trail of investigation handoff and outcome notification, provides intelligence support (Identity Intelligence Surface, Commander AI in investigation mode where licensed), preserves evidence in intelligence-grade form. Commander **does not** run the investigation, interview anyone, make determinations, take action against the identity, generate disciplinary documentation, or recommend on disposition.
5. **Outcome phase** — customer's Internal Risk function provides outcome disposition: **No issue identified** · **Issue addressed** · **Ongoing concern** · **Privileged outcome** (details not shared with Commander; case closed with placeholder reference).
6. **Closure phase** — case closes when outcome disposition is received.

### 16.2 Evidence handling

Commander holds **intelligence-grade evidence**, not **investigation-grade evidence** (§6). Sufficient for pattern identification, surfacing, routing, prioritisation; **not** sufficient for legal proceedings, HR adjudication or disciplinary action. Investigation-grade evidence is retrieved by the customer's investigators from the original source platforms under their own evidence-handling procedures.

### 16.3 Jurisdictional configuration

Internal Behavioural Intelligence is subject to jurisdiction-specific regulation (§5): GDPR Article 88 · German Works Council provisions · French employee monitoring · US state-level surveillance laws · UK ICO guidance on workplace monitoring. Tenant configuration must support compliance with applicable jurisdictions: disable ingestion entirely; restrict pattern types; threshold configuration; RBAC restriction; audit transparency; retention restriction.

---

## 17. Eleven Doctrinal Assertions (Commander Doctrine)

Per the workspace `commander-doctrine.md` steering, eleven doctrinal assertions govern Commander SDR. These are restatements of the binding doctrine derived from the baseline; they bind every implementation:

1. **Closed-loop case model** — system-owned lifecycle; no manual case creation, status edit or closure unless a future authority explicitly changes this. (Spec #29 v2.0 patch §2 No.1; Spec #30 v2.0 patch §2; Spec #34 doctrine.)
2. **P0 priority overlay** — P0 and zero-day conditions propagate reason, scope, owner, expiry/review and evidence across relevant surfaces. (v2.2 P0 Zero-Day Priority Override addenda reproduced across Specs #29-#34, #41; Spec #40 implementation reference.)
3. **Three-application boundary** — Operational App, Tenant Admin and Commercial Control Plane are distinct surfaces; must not be merged casually. (Spec #39 §3, §4; v2.1 Application Boundary Update across Specs #29-#34.)
4. **Shell as reference, not inventory** — HTML shell references guide layout only and cannot delete committed features or routes. (Spec #56 §1, §3, §4.)
5. **Registry-driven runtime** — routes, menus, page status, feature visibility and build state are registry-driven. (Spec #56 §5; Spec #50 §Binding Doctrine.)
6. **Reference-input boundary** — vendor docs, API references and external material are reference inputs until converted through Commander authority. (Spec #61; `docs/03_api_specs/API_SPEC_INTAKE_RULES.md` referenced in Spec #61 header.)
7. **Baseline immutability** — archived baseline material is retained for lineage and must not be silently rewritten. (Authority and Precedence v2.6 — `00_AUTHORITY_AND_PRECEDENCE_v2_6.md`.)
8. **SOC boundary** — Commander may consume SOC signal read-only but must not write SOC detections, rules, playbooks or case-triage actions. (Spec #57 §5; MP v5.0 §25; MTS v7.0 §10.1; Spec #65 §3.4 "Commander observes · SOC owns" attribution.)
9. **Four-stream intelligence integrity** — External Threat, External Attack, Internal Behavioural and Posture streams must remain distinct. (Spec #59 §3.)
10. **Surface attribution** — relevant records must preserve `internal_attack_surface` or `external_attack_surface` attribution. (Spec #60 §2, §3, §4.)
11. **Connector and verdict doctrine** — connector classes are A/B/C/D only; verdicts must preserve semantic disposition rather than becoming binary pass/fail. (Spec #61 §2; Spec #62 §3, §4.)

---

## 18. Configuration Governance and the v2.6 Parameter Catalogue

Per Spec #55 `55_Baseline_Configuration_Framework_Model_and_Defaults_Spec.md` base + v2.6 Extension addendum, all v2.6 configurable parameters operate under the **Tenant Configuration Registry** with:

- System defaults at build (defaults shipped in source as part of the v2.6 addendum)
- Tenant-customisable via Tenant Admin surface
- Versioned per Tenant Configuration Registry
- Audited on every change
- Governed by Commercial Control Plane baseline-profile authority
- Kill switches and emergency reset paths per existing doctrine

The v2.6 parameter catalogue (Spec #55 §V2.6-1 through §V2.6-11) groups parameters by domain:

1. Verdict Pattern Detection (peer deviation, temporal clustering, geographic anomaly, policy concentration, minimum baseline)
2. Verdict Semantics (trust calibration window, density aggregation, disagreement threshold, hot/warm/cold storage tiers)
3. Pre-Warned Classification (confidence thresholds, novel default, audit retention, posture lookback)
4. Inverse Discovery (minimum reference count, deduplication window, root-cause classifier confidence)
5. OODA Phase Health (tempo degradation factor + sustained/recovery windows; per-phase health weights; baseline window)
6. Policy Effectiveness (override rate, zero-fire window, minimum baseline)
7. Context-Aware Drift Priority (master kill switch, attack/threat-intel/decay parameters)
8. Internal Operating Picture sensitivity (default mode, per-identity unlock authority, peer-deviation visualisation)
9. Identity Intelligence Surface (verdict weight in risk score, behavioural section visibility, case-history lookback)
10. Connector conformance (certified test interval, degraded alert threshold, multi-class allowance)
11. Internal Risk Investigation Sub-Lifecycle (ingestion enabled, works council notification, default visibility roles, audit-of-access enabled, evidence retention)

Pilot configuration recommendations (Spec #55 §V2.6-13): start with Internal Risk ingestion **disabled** until customer confirms jurisdictional and works-council readiness; conservative thresholds for verdict pattern detection initially (raise 25-50% above defaults during first 30 days); enable pre-warned classification audit logging and Silent Defence Reporting immediately; calibrate OODA phase-health baselines over the first 30 days before activating OODA Tempo Degradation case generation.

---

## 19. UI Doctrine — Three Visual Intensity Levels

Source: Spec #41 `41_Commander_SDR_Military_Intelligence_UI_Doctrine_Spec.md` §5; v2.3 UI Doctrine Integration Addendum (reproduced across Specs #29-#34, #39, #41).

| Level | Name | Used for | Visual behaviour |
|---|---|---|---|
| 1 | Operational Standard | Normal cases, dashboards, assets, vulnerabilities, identity, architecture, reporting | Dense, square, calm, readable, navy/gold/light or controlled dark surfaces |
| 2 | Tactical Analysis | Fusion Map, blast radius, exposure, threat corridor, dependency map, control overlays | Dark tactical canvas, overlays, node-link views, heat grids, gauges |
| 3 | Emergency Command | P0 Zero-Day, active exploitation, surge mode, mission-critical risk | Maximum contrast, P0 banner, SLA countdown, owner accountability, live pulse, escalation rails |

**Application surface intensity ceilings** (Spec #41 §4):
- Commander SDR Operational App: ceiling Level 3
- Commander SDR Tenant Admin Surface: ceiling Level 2
- Commander Internal Control Plane: Level 2 (Level 3 only for emergency controls)

**v2.6 visual conventions** (Spec #41 §V2.6-2 OODA, §V2.6-3 Dual Operating Picture, §V2.6-4 Pre-Warned/Protected/Novel rings, §V2.6-5 Direction Boards, §V2.6-6 RBAC-sensitive UI behaviour) provide consistent treatments across the new surfaces, including the deliberate amber-violet-vs-red distinction between Internal and External Operating Pictures so toggling between them is immediately legible.

**Non-Negotiable Usability Guardrail** (v2.3 addendum): The interface must remain faster to operate than it is to admire. Visual intensity must never reduce scan speed, evidence traceability, routing clarity, validation clarity, closure-gate clarity, or senior accountability.

---

## 20. Explicit GAPs Recorded This Build

Per `SOURCING_RULE.md` discipline, gaps are recorded explicitly rather than guessed. The following items are partial-read or absent in source material read this build, and require focused re-reads in a follow-up pass before deeper claims:

| GAP | Where it should resolve | Status |
|---|---|---|
| Eight-class verdict signal disposition body for `Behavioural Signal` (signal purpose 7) | Spec #61 §3.7 | Truncated in this read |
| Connector conformance tier nomenclature (the four named tiers) | Spec #61 §4.1 | Read by reference; full tier names not enumerated in §4.1 portion read; named in Spec #55 v2.6 §V2.6-10 as `connector.conformance.*` parameters but tier labels not enumerated |
| Full risk-object type extension list under v2.6 (beyond `ooda_phase_degradation`) | MTS v7.0 §6.3 | Truncated in this read |
| Workspace bodies for the four middle workspaces (Drift Operations, Control & Architecture, Identity & Asset Intelligence, Assurance & Audit) — primary personas, contents, jobs-to-be-done | MP v5.0 §24 | Header confirmed via grep; row bodies not read |
| The full eleven-persona enumeration | Spec #17 v2.6 Persona Expansion Addendum (referenced from MTS v7.0 §9.1 and MP v5.0 §22) | Located by reference; the explicit bulleted list is in the addendum portion of Spec #17 not surfaced in this build's grep |
| Spec #08 sections 5–15 (Case Action Algorithm, Assignment Engine, Case Pulse, Teams/Ranks, Operational Passport, Evidence Packs, Audit, Acceptance Criteria) | Spec #08 §5–§15 | Only ToC + §1–§4 + v2.6 Extension addendum read |
| Act Phase Dashboard composition body | Spec #67 §6 | Read by reference; full body truncated |
| Identity Intelligence Surface and Asset Intelligence Surface compositions (sections beyond §1–§2) | Spec #68 §3+, Spec #69 §3+ | §1–§2 confirmed; remainder not read |
| OODA phase 4 (Act) §3.4 detail | Spec #58 §3.4 | Truncated in this read |
| SDR Control Plane Specification v1.1 sections 7–19 | `SDR_Control_Plane_Specification_v1_1.md` | §0–§6 read in prior session; remainder not yet read |

These gaps are flagged in the relevant cells above with **GAP** notation. They do not block this graph's structural claims (which are sourced from sections that *were* read), but they bind the next read pass.

---

## 21. Source Map for This Document

Every section of this graph cites source from the following baseline files (all under `docs/99_source_archive/baseline_v2_6_2/docs/`):

**Masters (`00_master/`):**
- `Commander_SDR_Master_Proposition_v5_0.md` (MP v5.0)
- `Commander_SDR_Master_Technical_Specification_v7_0.md` (MTS v7.0)

**v2.6 Doctrinal Foundation (`02_child_specs/`):**
- `57_Security_Command_and_Control_Doctrine_Spec.md`
- `58_Security_OODA_Loop_Specification.md`
- `59_Intelligence_Layer_Architecture_Spec.md`
- `60_Internal_and_External_Attack_Surface_Framework_Spec.md`
- `61_Universal_Security_Signal_Connector_Contract_Spec.md`
- `62_Verdict_Semantics_Specification.md`

**v2.6 Surfaces and Capabilities:**
- `65_External_Operating_Picture_Surface_Spec.md`
- `66_Internal_Operating_Picture_Surface_Spec.md`
- `67_OODA_Dashboard_Family_Spec.md`
- `68_Identity_Intelligence_Surface_Spec.md` (§1–§2)
- `69_Asset_Intelligence_Surface_Spec.md` (§1–§2)
- `70_Direction_Boards_Spec.md`
- `71_Pre_Warned_Protected_Novel_Classification_Spec.md`
- `72_Inverse_Discovery_Loop_Spec.md`
- `73_Silent_Defence_Reporting_Spec.md`
- `74_Context_Aware_Drift_Prioritisation_Matrix_Spec.md`
- `75_Internal_Risk_Investigation_Sub_Lifecycle_Spec.md`

**Operational backbone:**
- `08_Case_Management_Workflow_Spec.md` (§1–§4 + v2.6 Extension addendum)
- `17_Closed_Loop_Control_Architecture.md`
- `28_Strategic_and_Tactical_Priority_Framework_Spec.md`
- `29_Universal_Risk_Object_and_Case_Binding_Spec.md`
- `30_Universal_Validation_Closure_and_Reopening_Lifecycle_Spec.md`
- `31_Routing_Model_and_Team_Affinity_Spec.md`
- `32_Strategy_Layer_Runtime_Surface_Spec.md`
- `33_Multi_Domain_Fusion_Map_Spec.md`
- `34_Mission_Control_System_Team_Domain_Pulse_Spec.md`

**Application boundary, UI doctrine, terminology, configuration:**
- `39_Commander_Application_Boundary_and_Naming_Model_Spec.md`
- `41_Commander_SDR_Military_Intelligence_UI_Doctrine_Spec.md`
- `46_Canonical_Terminology_and_Object_Glossary.md` (base + v2.6 Terminology Glossary Addendum)
- `50_RBAC_Entitlement_Feature_Flag_Menu_Visibility_Spec.md`
- `55_Baseline_Configuration_Framework_Model_and_Defaults_Spec.md` (base + v2.6 Baseline Configuration Addendum)
- `56_Shell_Reference_vs_Build_Authority_Doctrine_Spec.md`

The `.kiro/specs/` translation layer (folders `00`–`43`) was **not consulted** for any claim in this document, per `SOURCING_RULE.md`.
