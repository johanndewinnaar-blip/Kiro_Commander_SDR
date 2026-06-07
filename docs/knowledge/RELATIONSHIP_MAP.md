# Commander SDR — Relationship Map

**Status:** First clean derivation under `SOURCING_RULE.md`. Projects from the verified `SYSTEM_KNOWLEDGE_GRAPH.md` and the 40-domain index in `DOMAIN_REGISTER.md`. Excluded: the `.kiro/specs/` translation layer.

This map records **how the domains and entities of Commander SDR are connected**: shared entities that appear across multiple domains, cross-domain relationships, upstream/downstream flows, circular dependencies, and orphan concepts. Every claim cites baseline spec `#N §section` per the locked sourcing rule.

The structural model behind the map is the canonical `RiskObject` contract and the closed-loop case lifecycle (Spec #29 v2.0 patch §3, §4) — Commander's load-bearing connector between every domain.

---

## Index

1. Shared canonical entities (entities that span multiple domains)
2. Six principal domain-level data flows
3. Domain-to-domain relationships (cross-domain edges)
4. Authority and governance flows
5. Cross-stream correlation flows (v2.6 Intelligence Layer)
6. Strategy bindings (configuration → runtime)
7. Fusion Map node/edge model — explicit projection
8. Surface drill paths
9. Circular dependencies
10. Orphan and structural anomaly concepts
11. GAPs carried forward

---

## 1. Shared canonical entities

These entities are the connective tissue of the platform. Each appears in **multiple** domains and carries a single canonical identity across all of them. Source: Spec #46 (`46_Canonical_Terminology_and_Object_Glossary.md`) base + v2.6 addendum; Spec #29 v2.0 patch §3 RiskObject contract; Spec #33 §Required Node Types.

| Shared entity | Canonical owner | Appears in (domains from `DOMAIN_REGISTER.md`) | Authority |
|---|---|---|---|
| **Asset** | D-08 Asset Intelligence | D-04 Drift/Rule · D-05 Vulnerability · D-06 Exposure · D-09 Architecture Intelligence · D-10 Coverage/Tool Health · D-13 Pre-Warned · D-14 Inverse Discovery · D-18 Case Lifecycle · D-25 Mission Control · D-27 Operating Pictures · D-29 Fusion Map · D-32 Push | Spec #46 base; Spec #69 §1–§2 (per-asset surface); Spec #33 node-type list |
| **Identity** (incl. `privileged_identity`, `service_account`) | D-07 Identity Intelligence | D-04 · D-13 · D-15 Verdict Semantics · D-16 Silent Defence · D-18 · D-19 Routing · D-25 · D-27 · D-29 · D-33 Internal Risk Investigation · D-37 RBAC | Spec #18 §3 (identity entity classes); Spec #46 base; Spec #33 node-type list; Spec #75 §3, §4 |
| **RiskObject** (17 base types + v2.6 extension `ooda_phase_degradation` + GAP-flagged additional v2.6 types) | D-18 Case Lifecycle | Every operational engine domain (D-04, D-05, D-06, D-07, D-09, D-10, D-11, D-12, D-13, D-14, D-15, D-16) emits or links to a RiskObject; D-19, D-20, D-22, D-23, D-26, D-29, D-32, D-40 consume them | Spec #29 v2.0 patch §3 (the contract); see `SYSTEM_KNOWLEDGE_GRAPH.md` §7.1 |
| **Case** (12 case types: 7 v2.5 + 5 v2.6) | D-18 Case Lifecycle | D-19 Routing · D-20 Validation/Closure · D-21 Closed-Loop Control · D-22 Strategy Layer · D-23 Priority Framework · D-24 P0 · D-26 OODA · D-27 Operating Pictures · D-29 Fusion Map · D-31 Communication · D-32 Push · D-33 Internal Risk · D-40 Audit | Spec #08 §V2.6-1 (12-type taxonomy); Spec #29 v2.0 patch §4 (12-state lifecycle) |
| **Sub-Action** | D-18 Case Lifecycle (case-bound) | D-19 Routing · D-20 Validation · D-31 Communication · D-32 Push | Spec #29 v2.0 patch §3 (`sub_action_ids[]`); Spec #30 v2.0 patch §5 (14-state sub-action lifecycle) |
| **Verdict** (with the five mandatory dimensions identity / time / disposition / policy reference / source) | D-15 Verdict Semantics | D-13 Pre-Warned (defence-worked overlay) · D-16 Silent Defence · D-27 Internal Operating Picture · D-28 Direction Boards (Policy Effectiveness) · D-29 Fusion Map · D-37 RBAC (Internal Risk authority gating) | Spec #62 §3 (five dimensions); Spec #62 §4 (eight canonical dispositions) |
| **Connector** (Class A/B/C/D + multi-class declaration) | D-02 Connector Framework | D-03 Normalisation · D-04 Drift/Rule · D-10 Coverage/Tool Health · D-15 Verdict Semantics · D-17 Intelligence Layer integration · D-26 OODA Observe phase · D-29 Fusion Map | Spec #61 §2 (four classes), §3 (eight signal purposes); Spec #09 base |
| **Mission Objective** | D-25 Mission Control | D-19 Routing (mission-impact routing input) · D-23 Priority Framework (mission-impact weighting) · D-24 P0 · D-29 Fusion Map (mission overlay) · D-30 Pulse Surfaces | Spec #34 base + v2.0 patch §11 (mission overlay); Spec #52 §Mission Impact Calculation |
| **Strategic Priority / Tactical Priority** | D-23 Priority Framework | D-19 Routing · D-22 Strategy Layer · D-26 OODA Decide phase · D-27 Operating Pictures (alignment rollups on Command Tempo Snapshot) | Spec #28 §4–§9; Spec #28 v2.6 patch (canonical priority ladder); `SYSTEM_KNOWLEDGE_GRAPH.md` §8.3 |
| **Trust Boundary** | D-11 Trust Boundary | D-09 Architecture Intelligence · D-29 Fusion Map (trust_boundary node) · D-37 RBAC (cross-boundary surface attribution) | Spec #25 §2–§3 (TrustBoundary entity); Spec #33 node-type list |
| **Tool Health Object** | D-10 Coverage/Tool Health | D-02 Connector Framework (failure → tool-health emission) · D-26 OODA Observe phase health · D-29 Fusion Map (tool-health overlay) | Spec #09 §Tool Health Rule; Spec #34 base (System Pulse) |
| **Communication Thread / Email Message** | D-31 Communication | D-18 Case Lifecycle (case-native communication) · D-20 Validation (communication-as-evidence) · D-29 Fusion Map (communication overlay) | Spec #26 §2 (Provider Models); Spec #26a §1 (closed-loop email) |

Implications captured later: any change to one shared entity has multi-domain effect. The `RiskObject`, `Case` and `Sub-Action` entities together form the **load-bearing trio** that connects every operational domain to every other.

---

## 2. Six principal domain-level data flows

These are the six end-to-end flows that traverse the platform. Each is a sequence of domains transferring well-typed data along the architectural layers (per `SYSTEM_KNOWLEDGE_GRAPH.md` §2).

### Flow 1 — Detect → Decide → Act (the SDR closed loop, programme-level OODA)

```
External signal (Connector Layer)
  → D-02 Connector Framework  [Class A/B/C/D + signal purposes]
  → D-03 Normalisation        [canonical entity match; Verdict Semantics processing]
  → Engine Layer
      D-04 Drift/Rule  ·  D-05 Vulnerability  ·  D-06 Exposure
      D-07 Identity   ·  D-09 Architecture   ·  D-10 Coverage/Tool Health
      D-11 Trust Boundary  ·  D-13 Pre-Warned (cross-stream)
  → D-17 Intelligence Layer integration (Estate Intelligence Picture)
  → RiskObject emitted (D-18 Case Lifecycle binds)
  → D-23 Priority Framework  +  D-22 Strategy Layer
  → D-19 Routing  +  D-31 Communication
  → Sub-Action generated → D-32 Push or D-15 SIEM/SOAR rule (Spec #15) or manual
  → D-20 Validation/Closure
  → Audit (D-40) + Adjustment loops back to Engine Layer + D-26 OODA tempo
```

Mapping to OODA phases per Spec #17 v2.6 OODA Integration Addendum §V2.6-1: Detection→Observe; Analysis→Orient; Control→Decide; Validation→Act (completion); Adjustment→Loop closure.

### Flow 2 — External Attack arrives in SOC stack → Commander correlates

```
SOC platform incident/case (SIEM, XDR, NDR, IR)
  → D-02 Connector Framework  [Class A SOC Telemetry, read-only]
  → External Attack Intelligence stream (per Spec #59 §3.2)
  → D-13 Pre-Warned/Protected/Novel Classification engine
       Phase 1 entity resolution → fires D-14 Inverse Discovery if unresolved
       Phase 2 posture assessment (consults D-04/D-05/D-06/D-09/D-10 active cases)
       Phase 3 classification decision + audit record
  → D-18 Case Lifecycle generates External Attack Correlation case (case type 8)
  → D-23 Priority Framework + D-74 Context-Aware Drift Prioritisation
  → D-19 Routing → Commander analyst (NOT the SOC — boundary preserved)
  → D-27 External Operating Picture renders the marker with classification ring
  → D-28 Control Weakness Direction Board correlates exploited control
```

Source: Spec #71 §3 (engine phases); Spec #08 §V2.6 (External Attack Correlation case type); Spec #65 §3.3 (ring conventions).

### Flow 3 — Internal actor verdict → Verdict Pattern case → customer Internal Risk

```
Operational tool verdict (email/DLP/web/CA/MDM/endpoint)
  → D-02 Connector Framework  [Class B Operational Verdict]
  → D-15 Verdict Semantics: identity/time/disposition/policy ref/source
       density aggregation (per-entity / per-policy / per-disposition / per-source / cross-axis)
       disagreement detection, trust calibration
  → Internal Behavioural Intelligence stream (per Spec #59 §3.3)
  → Pattern threshold crossed (peer-deviation, geo-anomaly, density spike, policy concentration)
  → D-18 Case Lifecycle generates Verdict Pattern case (case type 9)
  → D-37 RBAC: Internal Risk authority gate
  → D-33 Internal Risk Investigation Sub-Lifecycle: Surface → Triage → Routing → Customer Investigation → Outcome → Closure
  → Customer Internal Risk function owns investigation; Commander preserves audit trail
  → D-27 Internal Operating Picture renders aggregate density (default) or per-identity detail (with authority)
  → D-28 Policy Effectiveness Direction Board surfaces policy-level patterns
  → D-16 Silent Defence Reporting aggregates verdict volume (Option A: reports only, generates no cases)
```

Source: Spec #75 §3 (six-phase sub-lifecycle); Spec #59 §3.3; Spec #62 §3, §5, §6.

### Flow 4 — Inverse Discovery loop (entity unknown to Commander)

```
External signal references an entity Commander doesn't know
  (origin: Class A SOC case affected entity; Class B verdict event entity;
   Class D threat intel match; cross-reference within Commander)
  → D-14 Inverse Discovery: Trigger phase
  → Resolution Attempt phase (fuzzy match, identifier translation,
     recent-change check, cross-tenant reference, source authority hierarchy)
  → If resolved: canonical entity model updated; loop completes (no case)
  → If unresolved: D-18 Case Lifecycle generates Coverage Blindspot case (case type 10)
       root cause auto-classified: Discovery Gap | Staleness | Shadow IT | Naming Mismatch
  → D-19 Routing per root cause:
       Discovery gap → platform engineering (connector onboarding evaluation)
       Staleness    → platform engineering (connector tuning)
       Shadow IT    → security architecture (and possibly D-33 Internal Risk where shadow use suggests policy violation)
       Naming mismatch → platform engineering + security architecture jointly (entity matching tuning)
  → D-26 OODA Observe phase health: Inverse Discovery rate is a phase-health metric
  → Closure requires the trigger to no longer fire for that entity
```

Source: Spec #72 §3.

### Flow 5 — Push action lifecycle (read path → write path)

```
Sub-Action requires push
  → D-14 Push Engine: propose action → build payload preview → impact assessment
       (read path and write path are architecturally separated — Spec #14 §2)
  → Approval chain (D-37 RBAC `case.priority.zero_day.apply`/equivalent for the action class)
  → Pre-state capture
  → D-20 Coordinated Push Group (if multi-target) — Spec #20 §3, §5: rollback-first, group-level approval, per-action accountability, idempotent execution, blast radius visible
  → Execute via Connector write capability (Class A/B/C/D — write is gated separately from read)
  → Verify
  → Rollback available
  → D-20 Validation/Closure: validation event or BAS re-test (D-12) confirms the change
  → D-40 Audit closes the cycle
```

In Phase 0 the flow stops at approval/payload preview and audit placeholder. Source: Spec #14 §2, §3 (Phase 0 boundary); Spec #20 §3 (governing principles); MTS v7.0 §2.4 (read-only enforcement on Class A/B with Push gated separately).

### Flow 6 — SIEM/SOAR detection-spec generation when remediation cannot ship inside SLA

```
Drift/Exposure case with SLA pressure or unable-to-patch condition
  → D-21 Closed-Loop Control selects "Detection coverage" tier
  → Spec #15 SIEM/SOAR Rule Generation produces detection_id with platform-agnostic spec
       fields: pseudo_query, MITRE mapping, severity, FP considerations, recommended response,
               expiry/review date, validation method
  → D-19 Routing → SIEM/SOAR engineering team (separate from SOC operations boundary)
  → Implementation reference captured (SDR remains source of truth)
  → D-20 Validation: detection coverage validated (e.g. via D-12 BAS detection-coverage test)
  → Retire when underlying exposure resolved
```

Source: Spec #15 §2 (principle), §3, §4, §6.

---

## 3. Domain-to-domain relationships

This table records the explicit cross-domain edges (subject → object → kind of relationship → source). Edges are directional: A → B means "A produces / writes / governs / consumes from B in the sense indicated." Source citations point to the spec section establishing the relationship.

| From | → | To | Kind | Source |
|---|---|---|---|---|
| D-02 Connector Framework | → | D-03 Normalisation | Produces signal for normalisation | Spec #61 §3 (purposes resolve to engines); Spec #09 §Connector Lifecycle |
| D-02 Connector Framework | → | D-10 Tool Health | Emits tool-health signal on failure / staleness | Spec #09 §Tool Health Rule |
| D-02 Connector Framework | → | D-26 OODA Observe | Connector freshness is an Observe-phase health metric | Spec #58 §3.1 |
| D-03 Normalisation | → | D-04…D-12 (Engine Layer) | Provides canonical entities + normalised verdicts to engines | `SYSTEM_KNOWLEDGE_GRAPH.md` §2 strict layering |
| D-03 Normalisation | → | D-14 Inverse Discovery | When entity resolution fails, fires Inverse Discovery | Spec #72 §3.1 |
| D-04 Drift/Rule | → | D-18 Case Lifecycle | Drift findings emit RiskObjects → Drift cases | Spec #07 §1 (purpose); Spec #08 §V2.6 (Drift case type 1) |
| D-04 Drift/Rule | → | D-23 Priority (Spec #74) | Drift cases modulated by Context-Aware Drift Prioritisation Matrix | Spec #74 §3 (five dimensions) |
| D-05 Vulnerability | → | D-18 Case Lifecycle | Vulnerability findings → Vulnerability cases | Spec #08 §V2.6 (case type 3) |
| D-06 Exposure | → | D-18 Case Lifecycle | Exposure findings → Exposure cases | Spec #08 §V2.6 (case type 4) |
| D-07 Identity | → | D-15 Verdict Semantics | Identity context informs verdict pattern detection | Spec #75 §3.1 (pattern context); Spec #62 §5 (per-entity density) |
| D-07 Identity | → | D-18 Case Lifecycle | Identity findings → Identity cases | Spec #08 §V2.6 (case type 5); Spec #18 §1 |
| D-09 Architecture | → | D-18 Case Lifecycle | Architecture findings → Architecture cases | Spec #08 §V2.6 (case type 6); Spec #22 §1 |
| D-09 Architecture | → | D-11 Trust Boundary | Trust boundaries are an architecture input | Spec #22 §4 (Trust boundaries → Spec #25); Spec #25 §2–§3 |
| D-10 Coverage/Tool Health | → | D-18 Case Lifecycle | Coverage gaps + tool-health failures → Coverage cases | Spec #08 §V2.6 (case type 2); Spec #09 §Tool Health Rule |
| D-12 BAS | → | D-20 Validation | BAS results are validation evidence | Spec #21 §1, §6 |
| D-13 Pre-Warned | → | D-18 Case Lifecycle | Generates External Attack Correlation case (8) with classification | Spec #71 §3, §6; Spec #08 §V2.6 (case type 8) |
| D-13 Pre-Warned | → | D-23 Priority + D-74 | Pre-warned attacks elevate associated drift item priority | Spec #71 §6 |
| D-13 Pre-Warned | → | D-27 External Operating Picture | Ring conventions visualise classification | Spec #65 §3.3; Spec #71 §7 |
| D-13 Pre-Warned | → | D-14 Inverse Discovery | Fires when entity resolution fails in classification engine | Spec #71 §3.1 |
| D-14 Inverse Discovery | → | D-18 Case Lifecycle | Generates Coverage Blindspot case (10) | Spec #72 §3.3; Spec #08 §V2.6 (case type 10) |
| D-14 Inverse Discovery | → | D-26 OODA Observe | Inverse Discovery rate → Observe phase health metric | Spec #72 §4 |
| D-15 Verdict Semantics | → | D-18 Case Lifecycle | Persistent patterns generate Verdict Pattern case (9) | Spec #62 §6; Spec #08 §V2.6 (case type 9) |
| D-15 Verdict Semantics | → | D-13 Pre-Warned | Verdict layer informs Defence Worked overlay | Spec #71 §5; Spec #65 §3.3 |
| D-15 Verdict Semantics | → | D-16 Silent Defence | Aggregate verdict data is the substrate for Silent Defence Reporting | Spec #73 §3 |
| D-15 Verdict Semantics | → | D-28 Direction Boards | Disagreement detection drives Policy Effectiveness Direction Board | Spec #62 §6; Spec #70 §4.2 |
| D-16 Silent Defence | → | D-27 Internal Operating Picture | Same data substrate; aggregated differently | Spec #73 §6 |
| D-17 Intelligence Layer | → | D-27 Operating Pictures | EIP is composed into the battlefield view | Spec #65 §2; Spec #66 §2 |
| D-17 Intelligence Layer | → | D-29 Fusion Map | Fusion Map and EIP share canonical entity model + four-stream feed | Spec #33 §V2.6-2 |
| D-18 Case Lifecycle | → | D-19 Routing | Every case is routed deterministically | Spec #29 v2.0 patch §2 No.4 |
| D-18 Case Lifecycle | → | D-20 Validation/Closure | Closure gates govern case closure | Spec #30 v2.0 patch §7 |
| D-18 Case Lifecycle | → | D-31 Communication | Case-native communication binding | Spec #26a §1 (governing principle 1) |
| D-18 Case Lifecycle | → | D-32 Push | Push sub-actions originate as case sub-actions | Spec #14 §3 (Push Lifecycle) |
| D-19 Routing | → | D-25 Mission Control | Mission impact is a routing input | Spec #31 base §Inputs; Spec #52 §Mission Impact Calculation |
| D-22 Strategy Layer | → | D-18, D-19, D-20, D-23, D-26 | Strategy changes trigger priority + route + validation + closure-gate + reopening recalculation + Fusion Map refresh | Spec #32 §Runtime Binding |
| D-23 Priority Framework | → | D-19 Routing | Priority boost influences queue ordering (cannot bypass safety/SLA) | Spec #28 §8 |
| D-23 Priority Framework | → | D-26 OODA Decide | Strategic-priority alignment is a Decide-phase metric | Spec #67 §5 |
| D-24 P0 Override | → | D-19, D-20, D-31, D-23, D-29 | P0 overrides queue ordering, SLA profile, routing profile, communication cadence, validation cadence, dashboard prominence and Fusion Map visibility | Spec #40 §2 (doctrine point 6) |
| D-25 Mission Control | → | D-23, D-19, D-29, D-30 | Mission impact propagates to priority, routing, Fusion Map mission overlay, Mission Pulse | Spec #34 base; Spec #52 §Mission Impact Calculation |
| D-26 OODA | → | D-18 (OODA Tempo Degradation case 12) | Phase-health drop generates OODA Tempo Degradation case | Spec #58 §3 (per-phase degradation cases); Spec #08 §V2.6 case type 12 |
| D-26 OODA | → | D-27 Operating Pictures | Command Tempo Snapshot integrated into both COPs | Spec #65 §3.7; Spec #66 §3.6 |
| D-27 Operating Pictures | → | D-28 Direction Boards | Direction Boards integrated into Operating Pictures (External hosts Control Weakness; Internal hosts Policy Effectiveness) | Spec #65 §3.5; Spec #66 §3.5; Spec #70 §3, §4 |
| D-27 Operating Pictures | → | D-07/D-08 Intelligence Surfaces | Drill-down from entity pip → Identity or Asset Intelligence Surface | Spec #65 §5; Spec #66 §5 |
| D-29 Fusion Map | → | D-18 Case Lifecycle | Map opens bound case from any actionable node | Spec #33 §Interaction Rules |
| D-31 Communication | → | D-20 Validation | Communication evidence triggers validation | Spec #30 v2.0 patch §6 (validation triggers) |
| D-32 Push | → | D-20 Validation | Post-execution validation closes the push cycle | Spec #14 §3 (lifecycle ends in verify); Spec #20 §3 (idempotent execution) |
| D-33 Internal Risk Sub-Lifecycle | → | D-37 RBAC | Internal Risk authority gates identity-level access to D-15/D-27/D-07 | Spec #75 §4 |
| D-34 Commander AI | → | D-18, D-31, D-13 (e.g.) | Drafts, summarises, recommends; never decides or executes | Spec #13 §1, §2, §6 |
| D-35 Application Boundaries | → | D-36 Internal Control Plane | Authority hierarchy: Control Plane → Entitlement → Tenant Admin → Operational App → User role | Spec #39 §6 |
| D-36 Internal Control Plane | → | D-35 (publishes state to runtime) | Customer / Tenant / Instance / Licence / Entitlement Manifest / Feature Flag objects published to SDR runtime | Spec #37 §3 |
| D-37 RBAC | → | every visibility decision | Backend / API enforcement is mandatory and authoritative | Spec #50 §Backend Enforcement Rule; Spec #56 §8 |
| D-38 Configuration Governance | → | every configurable parameter | Versioned, audited, baseline-profile governed | Spec #55 base §Binding Doctrine; Spec #55 v2.6 §V2.6-12 |
| D-40 Audit | ← | every domain | Every privileged action emits an audit event; "audit-first operation" is a non-negotiable doctrine | Spec #29 v2.0 patch §2 No.10 |
| D-31 Communication (governed-compose) | → | D-18 Case Lifecycle | Produces governed outbound drafts bound to cases | Spec #25 Req 3/5 |
| D-31 Communication (notification) | → | D-18 Case Lifecycle | Notifies on case state transitions, SLA, assignments | Spec #26 |
| D-18 Case Lifecycle (case-follow) | → | D-31 Communication | Subscription triggers notification on case events | Spec #08 |
| D-09 Architecture Intelligence (cloud-security-posture) | → | D-26 OODA Observe | Cloud posture feeds Observe phase health metrics | Spec #22 |
| D-40 Audit (case-transition-audit) | ← | D-18 Case Lifecycle | Every lifecycle transition emits structured audit record | Spec #06 Req 6 |

---

## 4. Authority and governance flows

### 4.1 Three-application boundary (Spec #39 §3, §4, §6)

```
Commander Internal Control Plane (D-36)
  → publishes Customer / Tenant / Instance / Licence / Entitlement Manifest / Feature Flag (Spec #37 §3)
  → consumed by Commander SDR Operational Application + Commander SDR Tenant Admin Surface (D-35)
  → enforced at runtime via D-37 RBAC + D-50 Visibility decision rule
  → Tenant Admin Surface delegates configuration within entitlement (Spec #39 §3.2)
  → Operational App executes SDR work within entitlement (Spec #39 §3.1)
```

The boundary is binding doctrine — Operational App must NOT own licence allocation, entitlement manifest authoring, deployment-ring assignment, or internal support-access approval (Spec #39 §3.1 "Does not own"). Symmetrically, Internal Control Plane must NOT own customer remediation workflow execution, customer case-lifecycle progression, customer risk prioritisation, or customer evidence submission (Spec #39 §3.3 "Does not own").

### 4.2 SOC boundary (D-13, D-18, D-27)

```
SOC platform (SIEM / XDR / NDR / IR)
  → Class A connector (read-only with respect to SOC operations) [Spec #61 §2]
  → External Attack Intelligence stream
  → D-13 Pre-Warned classification + D-18 External Attack Correlation case
  → Routes to Commander analyst (NOT the SOC) [Spec #08 §V2.6]
  → External Operating Picture renders with binding "Commander observes · SOC owns" attribution [Spec #65 §3.4]
```

Commander never triages, closes or modifies SOC cases. SOC platform remains authority on incident response (Spec #57 §5; MP v5.0 §25; MTS v7.0 §10.1). The boundary is reinforced visually on the External Operating Picture Case Response Board.

### 4.3 Insider Risk boundary (D-15, D-33, D-37)

```
Internal actor verdict (D-02 Class B)
  → D-15 Verdict Semantics → Internal Behavioural Intelligence stream
  → Pattern threshold crossed → D-18 Verdict Pattern case (case type 9)
  → D-37 RBAC: Internal Risk authority required for identity-level access
  → D-33 Six-phase sub-lifecycle: Surface → Triage → Routing → Customer Investigation → Outcome → Closure
  → Customer Internal Risk function (organisational location varies: SOC / HR / Legal / Compliance / dedicated team) owns the investigation
  → Commander preserves audit trail and provides intelligence-grade evidence (NOT investigation-grade) [Spec #75 §6]
```

Boundary doctrine: Commander surfaces patterns; customer investigates. Commander does **not** investigate, determine intent, initiate disciplinary action, or run forensic workflow (Spec #75 §2). Jurisdictional configuration (Spec #75 §5) may disable the entire stream where local law requires.

### 4.4 RBAC + Authority overlays (D-37)

Five authority overlays per MTS v7.0 §9.2 / Spec #17 v2.6 (referenced; full enumeration GAP-flagged):

```
Administrative · Investigation · Approval · Reporting · Internal Risk (new in v2.6)
```

Internal Risk authority gates identity-level access in:
- D-07 Identity Intelligence Surface (behavioural section)
- D-15 Verdict Semantics (verdict drill-through)
- D-27 Internal Operating Picture (per-identity detail)
- D-33 Verdict Pattern case full detail

Audit-of-access is logged for every invocation (Spec #75 §4).

### 4.5 Configuration governance flow (D-38)

```
Commercial Control Plane baseline-profile authority (D-36)
  → ships system defaults (Spec #55 v2.6 §V2.6-12)
  → tenant selects baseline template (Standard Enterprise / High-Security /
       Military-Intelligence High Assurance / Observer / Demo / Cloud-First /
       Vulnerability Emergency / Identity Hardening / Ransomware Resilience)
  → tenant customises via Tenant Admin (D-35)
  → every override versioned + audited
  → baseline drift visible (drift = deviation from selected baseline)
  → drift may itself become a risk object when configured (Spec #55 §Baseline Drift)
```

---

## 5. Cross-stream correlation flows (v2.6 Intelligence Layer)

These are the v2.6-specific cross-stream correlations that the Intelligence Layer (D-17) produces from joining the four streams. Source: MTS v7.0 §5.

| Correlation | Streams joined | Output domain | Source |
|---|---|---|---|
| **Pre-Warned / Protected / Novel classification** | External Attack ↔ Posture | D-13 → External Attack Correlation case | Spec #71 §3 |
| **Inverse Discovery** | External Attack ∪ Internal Behavioural ∪ External Threat → Posture (canonical entity model) | D-14 → Coverage Blindspot case | Spec #72 §3.1 |
| **Threat Relevance Scoring** | External Threat ↔ Posture (estate-matching) | D-23 (priority context) | MTS v7.0 §5 (extended for v2.6) |
| **Silent Defence aggregation** | Internal Behavioural (verdict density) + relevant External Attack (prevented attacks) | D-16 → Reports + Dashboard | Spec #73 §3 |
| **Pattern disagreement** | Internal Behavioural × Internal Behavioural (multiple tools on same entity) | D-15 / D-28 → Policy Effectiveness case | Spec #62 §6; Spec #70 §4 |
| **Defence Worked overlay** | External Attack ↔ Internal Behavioural (verdict layer prevention) | D-13 / D-27 → Green ring overlay | Spec #71 §5; Spec #65 §3.3 |
| **Context-Aware Drift Priority** | Posture (drift) ↔ External Attack ↔ Internal Behavioural ↔ External Threat ↔ identity exposure ↔ strategic priority | D-23 → priority modulation | Spec #74 §3 (five dimensions) |

Each correlation is **directional** in the sense that it consumes from streams and produces a classification, case, or visual marker; none of them merges streams (the four-stream integrity is binding doctrine, Eleven Doctrinal Assertion #9 — Spec #59 §3).

---

## 6. Strategy bindings (configuration → runtime)

Strategy Layer (D-22) is the runtime configuration plane. A strategy change is **not** a passive setting — it triggers explicit recalculations (Spec #32 §Runtime Binding):

```
Strategy change (any of the 12 strategy surfaces — Spec #32 §1–§12)
  → priority recalculation         (D-23, D-74)
  → route recalculation            (D-19)
  → validation recalculation       (D-20)
  → closure-gate recalculation     (D-20)
  → reopening evaluation           (D-20 §reopening triggers)
  → Fusion Map refresh             (D-29)
```

The 12 strategy surfaces (Spec #32 base; reproduced in patches across #29, #30, #31, #33, #34): SLA · Threshold · Automation Boundary · Routing · Posture · Mission Objective · Operational Tempo · Domain-Specific · Prioritisation Weight · Validation Window · Closure Gate · Reopening Trigger.

---

## 7. Fusion Map node/edge model — explicit projection

Fusion Map is the single graph projection of the entire platform. From `SYSTEM_KNOWLEDGE_GRAPH.md` §13:

- **32 node types** (asset · identity · privileged_identity · service_account · application · cloud_account · cloud_workload · vulnerability · exposure · control · compensating_control · drift_object · case · sub_action · communication_thread · mailbox · tool · connector · telemetry_source · trust_boundary · third_party · business_unit · mission_objective · SLA_object · exception · suppression · security_debt_item · BAS_simulation · blast_zone · route_owner · team · approval_authority)
- **28 edge types** (owns · operates · depends_on · authenticates_to · administers · exposes · protects · lacks_control · has_vulnerability · has_drift · covered_by · not_covered_by · monitored_by · routed_to · assigned_to · approved_by · blocked_by · validated_by · failed_validation · communicates_with · escalated_to · suppresses · compensates_for · reopens · closes · impacts_mission · expands_blast_radius · reduces_blast_radius)
- **18 overlays** (risk · drift · exposure · control · coverage · identity · vulnerability · architecture · tool_health · blast_radius · mission · SLA · validation · communication · routing · reopening · closure_blocker · automation_eligibility)

Source: Spec #33 §Required Node Types, §Required Edge Types, §Required Overlays.

**Distinct from Operating Pictures** (Spec #33 §V2.6-1):

| Dimension | Multi-Domain Fusion Map | Operating Pictures (External / Internal) |
|---|---|---|
| Purpose | Cross-domain analytical surface for case investigation | Real-time operational command surface for the security programme |
| Time orientation | Investigative — focused on a case or set of cases | Operational — focused on current state of the estate |
| Update cadence | On-demand (user initiates) | Continuous (live refresh) |
| Scope | Cases under investigation | Entire estate |
| Visual language | Network graph, cross-domain relationships | Map-based, threat-surface visualisation |

Both consume from the same EIP and share canonical entity model + four-stream feed + case-binding model + verdict-semantics layer.

**Cross-surface drill paths** (Spec #33 §V2.6-5):

```
Operating Picture → click on entity → D-07/D-08 Identity or Asset Intelligence Surface
D-07/D-08 Surface → click on related case → D-29 Fusion Map (case-centric view)
D-29 Fusion Map → click on case → D-18 Case detail view
D-18 Case detail → "Show in Operating Picture" → D-27 (case foregrounded)
```

Filter and time-window state preserved across drills.

---

## 8. Surface drill paths (consolidated)

| Origin surface | Drill action | Destination surface |
|---|---|---|
| D-27 External Operating Picture | click attack marker | D-18 External Attack Correlation case detail |
| D-27 External Operating Picture | click SOC case in Case Response Board | SOC platform context view (read-only) |
| D-27 External Operating Picture | click entity pip | D-07 Identity Intelligence Surface or D-08 Asset Intelligence Surface (per entity type) |
| D-27 External Operating Picture | click zone | Zone-specific drill-down (entity list, attack activity, control state) |
| D-27 External Operating Picture | click exploited control | D-04/D-09 control detail with case correlation |
| D-27 External Operating Picture | click Command Tempo Snapshot | D-26 Command Tempo Dashboard |
| D-27 Internal Operating Picture | click identity marker (with Internal Risk auth) | D-07 Identity Intelligence Surface (behavioural section primary) |
| D-27 Internal Operating Picture | click identity marker (without auth) | Limited drill-down (aggregate behavioural indicators only) |
| D-27 Internal Operating Picture | click zone | Zone-specific verdict density detail with per-policy breakdown |
| D-27 Internal Operating Picture | click policy in Policy Effectiveness Direction Board | Policy detail with verdict history, override events, recommendation context |
| D-26 Observe Phase Dashboard | drill | per-class → per-connector → per-domain → individual entity |
| D-26 Orient Phase Dashboard | drill | per-domain → individual findings → root finding analysis |
| D-26 Decide Phase Dashboard | drill | decision type → queue depth → individual cases |
| D-26 Command Tempo Dashboard | click bottleneck phase | open that phase dashboard |
| D-26 Command Tempo Dashboard | click strategic priority | D-23 Strategic Priority detail |
| D-29 Fusion Map | click risk node | bound risk object + case |
| D-29 Fusion Map | click edge | evidence chain |

Source: Spec #65 §5; Spec #66 §5; Spec #67 §3, §4, §5, §7; Spec #33 §Interaction Rules.

---

## 9. Circular dependencies (intentional, by design)

Some loops are circular **by design** — they are the closed-loop feedback that makes Commander a control system rather than a pipeline. Recording them here so they aren't mistaken for accidental coupling.

### 9.1 Strategy ⇄ Case Engine ⇄ Routing

```
D-22 Strategy Layer  →  D-19 Routing  →  D-18 Case Lifecycle (priority/SLA/route apply)
                                            ↑
              ←  ←  Strategy threshold change requalifies case (reopening trigger)
```

Source: Spec #30 v2.0 patch §8 (reopening trigger: "strategy threshold changes and requalifies the case"); Spec #32 §Runtime Binding.

### 9.2 Intelligence Layer ⇄ OODA Loop

```
D-17 Intelligence Layer (four streams + EIP)
      → D-26 OODA (Observe consumes streams; Orient consumes EIP)
      → D-18 Case Lifecycle (Decide phase) → D-32 Push (Act phase)
      → D-20 Validation (Act completion)
      → Adjustment feeds back to D-17 (model refinement, classification recalibration)
      → next Observe cycle reads better signal
```

Source: Spec #58 §2, §3.1–§3.4; Spec #17 v2.6 OODA Integration Addendum §V2.6-3 (Adjustment phase feedback).

### 9.3 Pre-Warned ⇄ Inverse Discovery

```
D-13 Pre-Warned classification engine
      Phase 1 entity resolution fails
      →  D-14 Inverse Discovery fires
      →  Coverage Blindspot case → entity onboarding
      →  next Pre-Warned classification on similar trigger resolves the entity
```

Source: Spec #71 §3.1; Spec #72 §3.1.

### 9.4 Verdict density ⇄ Trust calibration

```
D-15 Verdict Semantics produces density and disagreement
      →  Pattern → D-18 case generation (Verdict Pattern, Policy Effectiveness)
      →  Case outcome (resolved / suppressed / addressed) feeds trust calibration
      →  Per-tool trust weight tuned over time
      →  Next density computation weighted by updated trust calibration
```

Source: Spec #62 §5, §6; Spec #59 §3.3 (trust calibration).

### 9.5 Adjustment ⇄ Observe (the SDR closed loop / OODA loop closure)

```
D-21 Closed-Loop Control: Detect → Analyse → Control → Validate → Adjust
   Adjust step updates: case status + CRS history + coverage score + posture score +
                        security debt + architecture pattern counts +
                        tactical/strategic priority progress + communication closure state
   →  feedback into next Detect cycle (next Observe phase reads richer signal)
```

Source: Spec #17 §1, §2, §6; Spec #17 v2.6 OODA Integration Addendum §V2.6-3.

These five loops are the operational essence of Commander as a control system. They are **not** to be flattened into one-way pipelines.

---

## 10. Orphan and structural anomaly concepts

These are concepts surfaced from the knowledge graph or domain register that are present in source but **structurally orphaned** at the edges of the platform — they do not have full bidirectional binding, or they are template-only, or they sit deliberately outside the active flow. Recorded here for the relationship map; carried into `ARCHITECTURAL_FINDINGS.md` for full debt tracking.

| Concept | Status | Source | Implication |
|---|---|---|---|
| **Spec #21 BAS Connector** (D-12) | Phase 2 / advanced; deferred from Phase 0 | Spec #21 §Authority note (Phase 2 strategic / advanced) | BAS validation is staged; until activation, Spec #20/§Validation depends on it but it is not online |
| **Spec #24 Connector API Reference Framework** | Template-only; per-vendor implementations not in baseline | Cited in Spec #61 header; full body not surfaced in this read | Reference framework with no concrete connector references in the v2.6 read pass — flagged GAP |
| **Spec #56 Shell Reference vs Build Authority Doctrine** | Doctrine, not inventory | Spec #56 §1 | The HTML shells are visual references; spec set + route/menu registry + feature registry is authority |
| **`shell-sidebar-header-rebuild` Kiro spec folder** | Out-of-numbering-band — translation-layer artefact | NOT cited (knowledge work excludes the translation layer per `SOURCING_RULE.md`) | Mentioned only because GOVERNANCE_MAP.md Orphan-G flagged it; structural orphan from main sequence |
| **PHASE_E_PROPOSAL.md** | Draft proposal; unincorporated into BUILD_SEQUENCE / BP-05 / DECISIONS | GOVERNANCE_MAP.md Orphan-E | Logged as ARCH-DEBT-007 |
| **Source-pack schedule v1.9** | SUPERSEDED-ORPHAN per `DEC-source-pack-schedule-v1_9-superseded` | DECISIONS.md | Logged as ARCH-DEBT-002 |
| **Specs #63 and #64** | Reserved-absent in baseline (verified gap) | `BASELINE_SOURCE_INVENTORY.md`; DECISIONS.md `DEC-v1.2-Spec63-64-gap` | Logged as ARCH-DEBT-005; references must redirect to `docs/03_api_specs/INDEX.md` |

The translation layer itself (`.kiro/specs/`) is not in scope for this map — per `SOURCING_RULE.md` it is excluded from knowledge work. The structural finding that build packs source from it (rather than from baseline) is logged separately as `ARCH-DEBT-001`.

---

## 11. GAPs carried forward

These knowledge-graph GAPs (per `SYSTEM_KNOWLEDGE_GRAPH.md` §20) materially affect relationship-mapping completeness. They are repeated here so this artefact does not silently absorb them.

| GAP | Effect on this relationship map | Resolution path |
|---|---|---|
| Behavioural Signal (signal purpose 7) body truncated (Spec #61 §3.7) | The connector → Internal Behavioural / External Threat flow for behavioural signal-class is partially mapped | Re-read Spec #61 §3.7 |
| Connector conformance tier names (Spec #61 §4.1) | Connector readiness mapping into deployment is partial | Re-read Spec #61 §4.1; cross-check with Spec #55 v2.6 §V2.6-10 parameters |
| Full v2.6 risk-object type extension list (MTS v7.0 §6.3) | Engine → Case Lifecycle edges may be missing types beyond `ooda_phase_degradation` | Re-read MTS v7.0 §6.3 |
| The four middle workspace bodies (MP v5.0 §24) — Drift Operations / Control & Architecture / Identity & Asset Intelligence / Assurance & Audit | Workspace-to-domain mapping (D-39 UI Doctrine) is partial | Re-read MP v5.0 §24 |
| Full eleven-persona enumeration (Spec #17 v2.6 Persona Expansion) | Persona-to-domain visibility (D-37 RBAC) is partial | Re-read Spec #17 v2.6 |
| Spec #08 §5–§15 (CAA, Assignment Engine, Case Pulse, Teams/Ranks, Operational Passport, Evidence Packs, Audit, Acceptance Criteria) | Case Lifecycle (D-18) internal mechanics partially mapped | Re-read Spec #08 §5–§15 |
| Act Phase Dashboard composition (Spec #67 §6) | OODA → Surface Layer drill paths partial for the Act phase | Re-read Spec #67 §6 |
| Identity Intelligence + Asset Intelligence Surface compositions (Spec #68 §3+, Spec #69 §3+) | Surface Layer composition edges partial | Re-read Spec #68 §3+, Spec #69 §3+ |
| OODA phase 4 (Act) §3.4 detail (Spec #58 §3.4) | OODA phase health metric inventory partial for Act | Re-read Spec #58 §3.4 |
| SDR Control Plane Specification v1.1 §7–§19 | Tenant Admin → Internal Control Plane runtime contract (D-36) partial | Re-read SDR Control Plane Specification §7–§19 |

---

## 12. Source map for this document

This relationship map cites only the following baseline files (all under `docs/99_source_archive/baseline_v2_6_2/docs/`):

**Masters (`00_master/`):**
- `Commander_SDR_Master_Proposition_v5_0.md` (MP v5.0)
- `Commander_SDR_Master_Technical_Specification_v7_0.md` (MTS v7.0)

**Child specs (`02_child_specs/`):** #07, #08 (+ v2.6), #09, #13, #14, #15, #17 (+ v2.6 OODA addendum), #18, #19, #20, #21, #22, #23, #25, #26, #26a, #27, #28 (+ v2.6 patch), #29 (+ v2.0 patch), #30 (+ v2.0 patch), #31 (+ v2.0 patch), #32 (+ v2.0 patch), #33 (+ v2.0 patch + v2.6 Fusion Map addendum), #34 (+ v2.0 patch), #36, #37, #38, #39, #40, #41, #46 (+ v2.6 addendum), #50, #52, #55 (+ v2.6 addendum), #56, #57–#62 (v2.6 doctrinal foundation), #65–#75 (v2.6 surfaces & capabilities).

**Excluded:** the `.kiro/specs/` translation layer (folders 00–43) was not consulted for any claim in this document, per `SOURCING_RULE.md`.

The translation layer is not authority for knowledge work; that finding itself is `ARCH-DEBT-001`.
