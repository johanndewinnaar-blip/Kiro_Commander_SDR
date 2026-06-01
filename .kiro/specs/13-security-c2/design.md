# Design — Security C2

**Spec ID:** `13-security-c2`  
**Target version:** v1.2

## Design intent

This design replaces the generic v1.0 boilerplate with baseline-derived domain architecture. It remains planning-only until the owner approves implementation.

## Baseline-derived architecture

Security C2 is Commander SDR's category position. It sits above operational security tools and integrates intelligence, defence, engineering and active response into an auditable operational framework. It does not replace SOC triage, SIEM, EDR, SOAR or incident response tooling.

## Three-layer model

| Layer | Meaning | Product implication |
|---|---|---|
| Security C2 | Category | Market and operating category for Commander. |
| Security Drift Response | Discipline | Closed-loop detect, analyse, control, validate and adjust process. |
| Commander | Platform | SaaS product delivering Security C2 and running SDR. |

## Boundary rules

- Commander can read SOC platform signal where permitted.
- Commander must not write detections, rules, SOAR playbooks or incident actions to SOC platforms in this build lane.
- Commander presents recommendations, evidence, dry-runs and governance decisions rather than bypassing operational authority.
- Security C2 surfaces must preserve OODA, operating picture, intelligence stream and attack-surface lineage.

## Future implementation placement

- `apps/web/` and `packages/ui/` — Security C2 surfaces after validation.
- `packages/contracts/` — Security C2 operating picture and OODA contracts.
- `packages/rules/` — priority overlay and decision-state rules.
- `tests/fixtures/` — synthetic Security C2 operating picture inputs.

## Testing strategy

- Validate source authority and translated baseline lineage.
- Validate canonical contracts and fixture shape before implementation.
- Validate tenant scope, RBAC and audit expectations.
- Validate no live AWS/resource/API side effects during initial stages.
- Validate that unresolved doctrine conflicts are recorded before implementation.

## Security C2 operating picture data needs

This section defines the data inputs required by each Security C2 operating picture surface, the intelligence streams that feed them, the canonical entities consumed, the OODA phase metrics needed, and the attack-surface attribution required. All definitions are derived from baseline doctrine.

### 1. External Operating Picture — data requirements

**Source authority:** Spec #60 §6.1; Spec #65 §3.

| Data element | Description | Source authority |
|---|---|---|
| Estate posture base map | Six-zone estate decomposition (Identity, Cloud, SaaS, Endpoint, Server, Network) with per-entity posture state, coverage state and criticality | Spec #65 §3.1 |
| External attack overlay | Active attack markers, attack chain lines crossing zones, attack volume indicators, recent and historical attack heatmap | Spec #65 §3.2 |
| Pre-warned / protected classification rings | Amber (pre-warned), blue (protected), grey (novel), green (defence-worked) per attack marker | Spec #65 §3.3; Spec #71 |
| Case Response Board | Recent SOC cases bound to Commander entities — case ID, severity, status, assignee, affected entities, classification. Attribution: "Commander observes · SOC owns" | Spec #65 §3.4 |
| Control Weakness Direction Board | Exploited controls correlated to active attacks, unexploited weaknesses queued for attention | Spec #65 §3.5; Spec #70 |
| Detection layer verdict density | Detection count per zone, detection source coverage and freshness per zone | Spec #65 §3.6 |
| Command Tempo Snapshot | Four OODA phase health scores, current bottleneck, estate-wide tempo | Spec #65 §3.7; Spec #67 §7 |

**Intelligence streams feeding this surface:**

| Stream | Role | Source authority |
|---|---|---|
| External Attack Intelligence | SOC case and detection signal bound to canonical entities | Spec #59 §3.2 |
| Posture Intelligence | Drift findings, risk scores, coverage state, blast radius for base map | Spec #59 §3.4 |
| External Threat Intelligence | Threat relevance scoring, CVE/IOC estate matching | Spec #59 §3.1 |

**Canonical entities consumed:** Assets, identities, applications, cloud accounts, services, network devices (positioned as external-facing or boundary per Spec #60 §12).

**Attack-surface attribution:** All records on this surface carry `external_attack_surface` attribution. Pre-warned classification binds External Attack Intelligence to Posture Intelligence per Spec #71.

---

### 2. Internal Operating Picture — data requirements

**Source authority:** Spec #60 §6.2; Spec #66 §3.

| Data element | Description | Source authority |
|---|---|---|
| Estate base map | Same six-zone decomposition as External COP for consistent navigation | Spec #66 §3.1 |
| Verdict density overlay | Per-zone verdict density with amber-through-violet gradient; per-disposition decomposition (BLOCK, QUARANTINE, COACH, REQUIRE_MFA, REQUIRE_COMPLIANT, MONITOR, ALLOW, AUDIT); per-source breakdown; temporal trend | Spec #66 §3.2 |
| Identity Risk Pattern visualisation | Named identity markers with pattern indicators — elevated verdict density, peer-group divergence, geographic anomaly, concerning sequences; pre-warned identity ring | Spec #66 §3.3 |
| Geographic anomaly markers | Impossible travel, restricted geography access, unusual access pattern markers | Spec #66 §3.4 |
| Policy Effectiveness Direction Board | Policies with high override rate, zero-fire anomaly, disagreement pattern; recommendation footer | Spec #66 §3.5; Spec #70 |
| Command Tempo Snapshot (internal tempo) | Verdict Pattern case throughput, Internal Risk routing tempo, internal-surface validation throughput | Spec #66 §3.6; Spec #67 §7 |

**Intelligence streams feeding this surface:**

| Stream | Role | Source authority |
|---|---|---|
| Internal Behavioural Intelligence | Verdict events, verdict density aggregations, behavioural anomaly detection, policy effectiveness signals | Spec #59 §3.3 |
| Posture Intelligence | Identity chain computation, coverage state for base map | Spec #59 §3.4 |

**Canonical entities consumed:** Identities, assets (endpoints, devices), applications, SaaS services (positioned as internal-only or boundary per Spec #60 §12).

**Attack-surface attribution:** All records on this surface carry `internal_attack_surface` attribution. Verdict Pattern cases route to Internal Risk function per Spec #60 §8.

---

### 3. Command Tempo Dashboard — data requirements

**Source authority:** Spec #58 §6; Spec #67 §7.

| Data element | Description | Source authority |
|---|---|---|
| Four phase health scores | Observe (0-100), Orient (0-100), Decide (0-100), Act (0-100) — rendered as four-quadrant view | Spec #58 §3; Spec #67 §7 |
| OODA tempo headline metric | Average time for a finding to traverse the full cycle with trend indicator (improving / stable / degrading / failing) | Spec #58 §4 |
| Bottleneck identification | Current bottleneck phase with phase-specific context (signal blindness, model freshness, routing queue, execution failures) | Spec #58 §4 |
| OODA loop count | Concurrent loops in flight, distribution by case type, distribution by domain | Spec #67 §7 |
| Strategic priority progress | Rollup of OODA loops contributing to each active strategic priority with trajectory | Spec #58 §8; Spec #28 |
| Tactical priority progress | Rollup per active tactical priority | Spec #58 §8; Spec #28 |
| Top three bottlenecks | Current OODA Tempo Degradation cases with severity | Spec #67 §7 |
| Top three improvements | Phases recently recovered, tempo improvements achieved | Spec #67 §7 |

**Intelligence streams feeding this surface:**

| Stream | Role | Source authority |
|---|---|---|
| All four streams (External Threat, External Attack, Internal Behavioural, Posture) | Feed the Observe phase; all streams contribute to tempo measurement | Spec #59 §7 |

**Canonical entities consumed:** All entity types (tempo is measured across the full estate model).

**OODA phase metrics required:**

| Phase | Key metrics | Source authority |
|---|---|---|
| Observe | Connector freshness per class, signal volume by purpose, coverage completeness, blind spots, stream health | Spec #58 §3.1 |
| Orient | Drift detection tempo, risk model freshness, classification distribution, architecture intelligence status, blast radius computation tempo | Spec #58 §3.2 |
| Decide | Decision throughput by type, queue depth, approval cycle time, routing accuracy, auto-promotion activity | Spec #58 §3.3 |
| Act | Execution throughput, execution latency, success rate, validation pending count, failed actions | Spec #58 §3.4 |

---

### 4. Estate Intelligence Picture — integration layer

**Source authority:** Spec #59 §5.

All three operating picture surfaces consume from the unified Estate Intelligence Picture (EIP). The EIP integrates all four intelligence streams normalised against the canonical estate model. It is not a single dashboard — it is the architectural layer accessed by all surfaces above it.

**EIP integration points per surface:**

| Surface | EIP query pattern | Source authority |
|---|---|---|
| External Operating Picture | External Attack Intelligence + Posture Intelligence + External Threat Intelligence, filtered to external-facing entities | Spec #59 §5; Spec #65 |
| Internal Operating Picture | Internal Behavioural Intelligence + Posture Intelligence, filtered to internal-only entities | Spec #59 §5; Spec #66 |
| Command Tempo Dashboard | All four streams aggregated for tempo computation across the full estate | Spec #59 §5; Spec #67 |

---

### 5. Cross-stream correlations consumed by operating pictures

**Source authority:** Spec #59 §6.

| Correlation | Consuming surface | Description | Source authority |
|---|---|---|---|
| Pre-Warned Classification | External Operating Picture | Joins External Attack Intelligence with Posture Intelligence — was drift/gap known at attack time? | Spec #59 §6.1; Spec #71 |
| Verdict Disagreement Detection | Internal Operating Picture | Joins multiple Internal Behavioural Intelligence sources — contradictory verdicts on same entity | Spec #59 §6.2 |
| Behavioural Anomaly Detection | Internal Operating Picture | Joins Internal Behavioural Intelligence with identity model — peer-group divergence | Spec #59 §6.4 |
| Threat Relevance Scoring | External Operating Picture | Joins External Threat Intelligence with Posture Intelligence — estate-relevant threats elevated | Spec #59 §6.5 |
| Silent Defence Aggregation | Internal Operating Picture | Aggregate of all Internal Behavioural Intelligence without case correlation | Spec #59 §6.6; Spec #73 |

---

### 6. Summary — data flow diagram (logical)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Connector Classes (Signal)                         │
│  Class A (SOC)  │  Class B (Verdict)  │  Class C (Config)  │ Class D│
└────────┬────────┴─────────┬───────────┴─────────┬──────────┴───┬────┘
         │                  │                     │              │
         ▼                  ▼                     ▼              ▼
┌─────────────────────────────────────────────────────────────────────┐
│              Intelligence Layer — Four Streams                        │
│  External Attack │ Internal Behavioural │ Posture │ External Threat  │
└────────┬─────────┴──────────┬──────────┴────┬────┴──────────┬───────┘
         │                    │               │               │
         ▼                    ▼               ▼               ▼
┌─────────────────────────────────────────────────────────────────────┐
│           Estate Intelligence Picture (EIP)                          │
│  Normalised against canonical estate model                           │
│  Cross-stream correlations: Pre-Warned, Disagreement, Anomaly,       │
│  Threat Relevance, Silent Defence                                    │
└────────┬────────────────────┬───────────────────────┬───────────────┘
         │                    │                       │
         ▼                    ▼                       ▼
┌────────────────┐  ┌─────────────────────┐  ┌──────────────────────┐
│ External COP   │  │ Internal COP        │  │ Command Tempo        │
│ (Spec #65)     │  │ (Spec #66)          │  │ Dashboard (Spec #67) │
└────────────────┘  └─────────────────────┘  └──────────────────────┘
```

---

### 7. Constraints and boundaries

- All operating picture surfaces are read-only consumers of the EIP. They do not write back to intelligence streams. [Source: Spec #59 §5]
- External Operating Picture preserves "Commander observes · SOC owns" attribution on all SOC case data. [Source: Spec #65 §3.4; Spec #57 §5]
- Internal Operating Picture carries enhanced governance — RBAC, audit-of-access, jurisdictional disable. [Source: Spec #66 §6; Spec #75]
- No operating picture surface replaces SOC triage, incident response, or insider risk investigation. [Source: Spec #57 §5; Spec #60 §10-11]
- Mock/seed data must be used for all operating picture inputs until Phase 2 real connector approval. [Source: Spec 13-security-c2 requirements §Requirement 3]

## Boundary-safe SOC signal consumption model

This section defines what SOC signal Commander may consume, how consumption remains boundary-safe, the attribution model that governs derived intelligence, what Commander produces from SOC signal, and the explicit prohibitions that protect the SOC boundary.

### 1. Consumable SOC signal

Commander consumes the following signal types from SOC platforms via Class A SOC Telemetry Connectors:

| Signal type | Definition | Source authority |
|---|---|---|
| Case signal | Investigation workflows from SOC platforms — case ID, entities, status, severity, assignee, timestamps, MITRE mapping, disposition | Spec #59 §3.2; Spec #61 §3.5 |
| Detection signal | Unresolved detections not yet promoted to cases (e.g. CrowdStrike detections not yet in incidents, SIEM alerts before case promotion) | Spec #59 §3.2; Spec #61 §3.4 |
| Affected entity bindings | Commander canonical entities referenced in SOC cases and detections — assets, identities, applications, services, network devices | Spec #59 §3.2; Spec #59 §4 |
| Attack timeline data | Temporal sequence of detections and case activity; attack pattern correlation where cases or detections appear related (same actor, same TTP, same campaign) | Spec #59 §3.2 |

All consumable signal resolves to the External Attack Intelligence stream within the Intelligence Layer. [Source: Spec #59 §3.2; Spec #61 §4.1]

---

### 2. Boundary-safe consumption guarantees

Consumption is boundary-safe because it satisfies all of the following constraints simultaneously:

| Guarantee | Mechanism | Source authority |
|---|---|---|
| Read-only ingestion | Class A connectors are technically incapable of write operations under normal configuration. Read-only enforcement is implemented at the connector contract layer. | Spec #61 §9 |
| No write-back to SOC platforms | Commander never closes, modifies, triages, or updates a SOC case or detection in the source platform | Spec #61 §9; Spec #57 §5 |
| No triage of individual SOC cases | Commander does not perform case triage workflows on SOC content; triage is the SOC's function | Spec #57 §5 |
| No incident response execution | Commander does not run incident response workflow, contain active threats, or execute response actions against SOC platforms | Spec #57 §5 |
| Correlation metadata only | SOC platform remains the authority on case/detection content; Commander stores correlation metadata binding SOC signal to canonical entities | Spec #59 §3.2 |
| Connector audit trail | Every pull operation is logged with timestamp, status, payload size, rate-limit state | Spec #61 §4.1 |
| Read-only violation blocking | If a connector ever attempts a write operation, the attempt is blocked and logged as `CONNECTOR_READ_ONLY_VIOLATION_BLOCKED` | Spec #61 §12 |

---

### 3. Attribution model — "Commander observes · SOC owns"

All intelligence derived from SOC signal carries the attribution: **"Commander observes · SOC owns"**.

| Principle | Meaning | Source authority |
|---|---|---|
| SOC owns the case | The SOC platform is the authority on case content, status, severity, assignee, and disposition. Commander does not override or compete with SOC authority. | Spec #59 §3.2 |
| Commander observes the case | Commander binds SOC case/detection signal to canonical entities, classifies it (pre-warned / protected / novel), correlates it with posture intelligence, and surfaces it on operating pictures. | Spec #59 §3.2; Spec #65 §3.4 |
| Attribution flows through all derived intelligence | Every record on the External Operating Picture that originates from SOC signal preserves this attribution. Downstream cases, classifications, and recommendations carry lineage back to the SOC-owned source. | Spec #59 §3.2; Spec #57 §5 |
| No authority transfer | Observation does not transfer ownership. Commander's correlation, classification, and recommendation outputs do not grant Commander authority over the SOC case. | Spec #57 §5 |

---

### 4. What Commander produces FROM SOC signal

Commander transforms consumed SOC signal into the following outputs — none of which involve direct writes to SOC platforms:

| Output | Description | Delivery mechanism | Source authority |
|---|---|---|---|
| External Attack Correlation cases | Commander case type tracking the relationship between SOC case activity and estate posture (drift, gaps, coverage deficits at attack time) | Commander case lifecycle (Spec #08 v2.6) | Spec #57 §10 (test case 1); Spec #59 §6.1 |
| Pre-Warned classification | Three-way classification of each SOC case against Commander's prior knowledge of the affected entity: pre-warned (drift/gap known), protected (entity fully covered), novel (ambiguous) | Intelligence Layer cross-stream correlation | Spec #71; Spec #59 §6.1; Spec #57 §6.3 |
| Detection specifications outbound to SIEM/SOAR teams | Platform-agnostic detection specifications generated from attack pattern analysis, dispatched via ITSM to the SIEM/SOAR engineering team for translation and deployment — NOT direct writes to SIEM/SOAR | ITSM dispatch (Spec #14 push doctrine) | Spec #57 §10 (test case 3) |
| External Operating Picture overlay | SOC cases and detections rendered on the External Operating Picture with pre-warned classification rings, affected entity markers, and attack timeline | Operating picture surface (Spec #65) | Spec #65 §3.2, §3.4 |
| Attack timeline correlation | Temporal and pattern correlation across SOC cases/detections — same actor, same TTP, same campaign — surfaced as intelligence, not as SOC triage | Intelligence Layer (Spec #59 §3.2) | Spec #59 §3.2 |
| OODA Observe phase input | SOC signal freshness, volume, and coverage feed the Observe phase health metrics and stream health monitoring | OODA tempo measurement (Spec #58) | Spec #59 §10; Spec #58 §3.1 |

---

### 5. Explicit prohibitions

The following actions are forbidden under all circumstances when Commander interacts with SOC signal. These restate Spec #57 §5 boundary discipline for clarity within the SOC signal consumption context:

| Prohibition | Rationale | Source authority |
|---|---|---|
| Commander SHALL NOT triage individual SOC cases | Triaging SOC cases is the SOC's function; Commander's altitude is above operational triage | Spec #57 §5 |
| Commander SHALL NOT run incident response workflow | Incident response is owned by the SOC and IR teams; Commander recommends and correlates | Spec #57 §5 |
| Commander SHALL NOT execute write operations against SOC platforms | Read-only consumption is doctrinal; write-back would collapse Commander's hierarchical position | Spec #57 §5; Spec #61 §9 |
| Commander SHALL NOT replace any SOC function | Commander integrates SOC signal into Security C2; it does not compete with or displace SOC tooling | Spec #57 §5 |
| Commander SHALL NOT contain active threats | Containment is an operational response action owned by SOC/IR teams | Spec #57 §5 |
| Commander SHALL NOT push detection rules directly to SIEM/SOAR platforms | Detection specifications are dispatched via ITSM to engineering teams; direct writes are forbidden | Spec #57 §10 (test case 3); Spec #61 §9 |
| Commander SHALL NOT modify, close, or update SOC case status | SOC platform remains the authority on case content and lifecycle | Spec #59 §3.2; Spec #61 §9 |
| Commander SHALL NOT author or push SOAR playbooks | SOAR authoring is forbidden; Commander may recommend but not execute | Spec #57 §5; 13-security-c2 requirements §Domain Requirement 3 |

---

### 6. Summary — consumption flow diagram (logical)

```
┌─────────────────────────────────────────────────────────────────────┐
│              SOC Platforms (SIEM, XDR, NDR, SOC)                      │
│  Cases · Detections · Timelines · Entity references                  │
└────────────────────────────────┬────────────────────────────────────┘
                                 │ READ-ONLY (Class A connector)
                                 │ No write-back
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│              Class A SOC Telemetry Connector                          │
│  Pull · Normalise · Bind to canonical entities · Audit every op      │
│  Write-attempt → BLOCKED + logged                                    │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│         External Attack Intelligence Stream                          │
│  Case signal · Detection signal · Entity bindings · Timeline         │
│  Attribution: "Commander observes · SOC owns"                        │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
         ┌──────────────┐ ┌──────────┐ ┌──────────────────────┐
         │ Pre-Warned   │ │ External │ │ External Attack      │
         │ Classification│ │ Operating│ │ Correlation Cases    │
         │ (Spec #71)   │ │ Picture  │ │ (Spec #08 v2.6)     │
         └──────────────┘ │ (Spec #65)│ └──────────────────────┘
                          └──────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │ Detection Specifications │
                    │ dispatched via ITSM      │
                    │ (NOT direct SIEM write)  │
                    └─────────────────────────┘
```

---

### 7. Boundary-safe consumption — acceptance test cases

These test cases validate that the consumption model respects boundaries. They are derived from Spec #57 §10:

| Test case | Expected behaviour | Source |
|---|---|---|
| Customer asks Commander to triage a Sentinel incident | Commander refuses. Shows incident on External Operating Picture with pre-warned classification and correlated drift. Opens External Attack Correlation case. Does NOT triage. | Spec #57 §10 test case 1 |
| Customer asks Commander to push a Sentinel detection rule directly | Commander refuses. Generates platform-agnostic detection specification. Dispatches via ITSM to SIEM/SOAR engineering team. Does NOT write to Sentinel. | Spec #57 §10 test case 3 |
| SOC platform goes offline | Commander degrades gracefully. Freshness alerts fire. No signal loss from Commander's side. No write attempt to restore SOC platform. | Spec #61 §8 |
| Connector attempts write operation (defensive test) | Write is blocked at connector contract layer. `CONNECTOR_READ_ONLY_VIOLATION_BLOCKED` audit event logged. | Spec #61 §9, §12 |

## Risks

- Generic scaffolding could conceal baseline violations.
- Kiro could treat a recommendation as implementation permission.
- Mock data could drift from real connector contracts if not tested.
- External tools could override Commander authority unless steering is read first.

## Security C2 route and page registry dependencies

This section defines the routes, page registry entries, and cross-spec dependencies required by Security C2 surfaces. All entries are documented as PLANNED status for v1.4 delivery. No route files or application code are created by this section — it records what the registry will need when implementation begins.

**Source authority:** Spec #47 Application Route and Navigation Register; Spec #56 Shell Reference vs Build Authority Doctrine; Spec #67 OODA Dashboard Family; Spec #65 External Operating Picture; Spec #66 Internal Operating Picture; Commander doctrine assertion #5 (registry-driven runtime).

---

### 1. Route inventory

All Security C2 routes belong to the **Operational App** (app.commandersdr.com) boundary. Routes follow the `RouteEntry` shape defined in `apps/web/src/registry/types.ts`.

| Route path | Label | Status | Version | Owning spec | Workspaces | Notes |
|---|---|---|---|---|---|---|
| `/security-c2` | Security Command and Control | PLANNED | v1.4 | `13-security-c2` | executive-posture | Landing/overview surface for Security C2 domain. Already registered as SCAFFOLD — will promote to PLANNED then BUILD. |
| `/security-c2/external-operating-picture` | External Operating Picture | PLANNED | v1.4 | `13-security-c2` | executive-posture, drift-operations | Six-zone estate map with external attack overlay, pre-warned classification rings, Case Response Board, Control Weakness Direction Board. Spec #65. |
| `/security-c2/internal-operating-picture` | Internal Operating Picture | PLANNED | v1.4 | `13-security-c2` | executive-posture, drift-operations | Six-zone estate map with verdict density overlay, Identity Risk Pattern visualisation, Policy Effectiveness Direction Board. Spec #66. |
| `/security-c2/command-tempo` | Command Tempo Dashboard | PLANNED | v1.4 | `13-security-c2` | executive-posture | Four-quadrant OODA phase health, tempo headline, bottleneck identification, strategic/tactical priority progress. Spec #67 §7. |
| `/ooda` | OODA Views | PLANNED | v1.4 | `14-ooda-views` | executive-posture, drift-operations | Already registered. Parent route for OODA phase dashboards. Owned by spec 14. |
| `/ooda/observe` | Observe Phase | PLANNED | v1.4 | `14-ooda-views` | executive-posture, drift-operations | Connector freshness, signal volume, coverage completeness, blind spots. Spec #58 §3.1. |
| `/ooda/orient` | Orient Phase | PLANNED | v1.4 | `14-ooda-views` | executive-posture, drift-operations | Drift detection tempo, risk model freshness, classification distribution. Spec #58 §3.2. |
| `/ooda/decide` | Decide Phase | PLANNED | v1.4 | `14-ooda-views` | executive-posture, drift-operations | Decision throughput, queue depth, approval cycle time, routing accuracy. Spec #58 §3.3. |
| `/ooda/act` | Act Phase | PLANNED | v1.4 | `14-ooda-views` | executive-posture, drift-operations | Execution throughput, latency, success rate, validation pending. Spec #58 §3.4. |

**Route hierarchy:**

```
/security-c2                          ← Security C2 landing (spec 13)
├── /security-c2/external-operating-picture  ← External COP (spec 13, Spec #65)
├── /security-c2/internal-operating-picture  ← Internal COP (spec 13, Spec #66)
└── /security-c2/command-tempo               ← Command Tempo (spec 13, Spec #67)

/ooda                                 ← OODA Views landing (spec 14)
├── /ooda/observe                     ← Observe phase dashboard (spec 14)
├── /ooda/orient                      ← Orient phase dashboard (spec 14)
├── /ooda/decide                      ← Decide phase dashboard (spec 14)
└── /ooda/act                         ← Act phase dashboard (spec 14)
```

---

### 2. Application boundary assignment

| Route group | Boundary | Domain | Justification |
|---|---|---|---|
| `/security-c2/*` | Operational App | Security C2 | Security C2 is an operational domain surface consumed by security leadership and drift operations teams. Commander doctrine assertion #3 (three-application boundary). |
| `/ooda/*` | Operational App | OODA | OODA views are operational tempo surfaces. Owned by spec 14 but consumed by Security C2 Command Tempo Dashboard. |

All Security C2 surfaces render within the Operational App shell (persistent left navigation, operational top bar, `PageContainer` layout standard).

---

### 3. Page registry entries

Each route requires a page registry entry at implementation time. All entries below are status **PLANNED** until v1.4 build begins.

| Page ID | Route | Page status | RBAC | Nav group | Show in nav | Sort order | Parent |
|---|---|---|---|---|---|---|---|
| `sec-c2-landing` | `/security-c2` | PLANNED | [] (all authenticated) | security-c2 | Yes | 20 | — |
| `sec-c2-external-cop` | `/security-c2/external-operating-picture` | PLANNED | [] | security-c2 | Yes | 21 | `/security-c2` |
| `sec-c2-internal-cop` | `/security-c2/internal-operating-picture` | PLANNED | [] | security-c2 | Yes | 22 | `/security-c2` |
| `sec-c2-command-tempo` | `/security-c2/command-tempo` | PLANNED | [] | security-c2 | Yes | 23 | `/security-c2` |
| `ooda-landing` | `/ooda` | PLANNED | [] | ooda | Yes | 24 | — |
| `ooda-observe` | `/ooda/observe` | PLANNED | [] | ooda | Yes | 25 | `/ooda` |
| `ooda-orient` | `/ooda/orient` | PLANNED | [] | ooda | Yes | 26 | `/ooda` |
| `ooda-decide` | `/ooda/decide` | PLANNED | [] | ooda | Yes | 27 | `/ooda` |
| `ooda-act` | `/ooda/act` | PLANNED | [] | ooda | Yes | 28 | `/ooda` |

**Navigation group addition (sidebar):**

When v1.4 build begins, a new nav group will be added to `OPERATIONAL_NAV_GROUPS` in `apps/web/src/registry/nav-groups.ts`:

```
// Group — Security C2 [Source: Spec #67; Spec #65; Spec #66]
{
  id: 'security-c2',
  label: 'Security C2',
  badge: 'PLANNED',
  status: 'PLANNED',
  subItems: [
    { label: 'Overview', path: '/security-c2', status: 'PLANNED' },
    { label: 'External Operating Picture', path: '/security-c2/external-operating-picture', status: 'PLANNED' },
    { label: 'Internal Operating Picture', path: '/security-c2/internal-operating-picture', status: 'PLANNED' },
    { label: 'Command Tempo', path: '/security-c2/command-tempo', status: 'PLANNED' },
    { label: 'OODA Observe', path: '/ooda/observe', status: 'PLANNED' },
    { label: 'OODA Orient', path: '/ooda/orient', status: 'PLANNED' },
    { label: 'OODA Decide', path: '/ooda/decide', status: 'PLANNED' },
    { label: 'OODA Act', path: '/ooda/act', status: 'PLANNED' },
  ],
}
```

---

### 4. Dependencies on other specs and routes

| Dependency | Spec | Route(s) | Relationship | Required before Security C2 build? |
|---|---|---|---|---|
| Command Centre | `05-command-centre` | `/` | Security C2 Command Tempo Snapshot appears as a widget on Command Centre. Command Centre is the primary landing surface. | Yes — Command Centre must be BUILD or LIVE. |
| Case Management | `06-case-management` | `/cases`, `/cases/:id` | External Attack Correlation cases, OODA Tempo Degradation cases, and Pre-Warned classification cases route through case lifecycle. Case Response Board on External COP links to case detail. | Yes — case lifecycle engine must be operational. |
| OODA Views | `14-ooda-views` | `/ooda`, `/ooda/*` | Security C2 Command Tempo Dashboard aggregates OODA phase health. Individual phase dashboards are owned by spec 14 but navigable from Security C2. | Co-dependent — spec 14 and spec 13 build together in v1.4. |
| Direction Boards | `15-direction-boards` | `/direction-boards` | Control Weakness Direction Board (External COP) and Policy Effectiveness Direction Board (Internal COP) are Direction Board instances rendered inline on operating pictures. | Co-dependent — spec 15 builds in v1.4. |
| Connector Framework | `17-connector-framework` | N/A (no route) | Class A SOC Telemetry Connectors feed External Attack Intelligence stream. Connector health feeds OODA Observe phase. | Yes — connector contracts must exist (mock connectors sufficient). |
| Strategy Layer | `43-strategy-layer-runtime-surface` | `/strategy` | Strategic and tactical priority progress on Command Tempo Dashboard consumes strategy values. | Yes — strategy layer must be BUILD or LIVE. |
| P0 War Room | `24-security-c2-p0-war-room` | `/war-room/p0` | P0 conditions propagate to Command Tempo Dashboard as bottleneck indicators. War Room is a separate surface but shares OODA tempo data. | Co-dependent — builds in v1.4. |

**Data-layer dependencies (no route, but required):**

| Dependency | Package | Description |
|---|---|---|
| Estate Intelligence Picture contracts | `packages/contracts/` | EIP query interfaces consumed by all three operating picture surfaces. |
| Four-stream intelligence contracts | `packages/contracts/` | Stream-typed intelligence records with lineage metadata. |
| Canonical entity model | `packages/contracts/`, `packages/db/` | Assets, identities, applications, cloud accounts, services, network devices. |
| Risk object types | `packages/contracts/` | `ooda_phase_degradation` and `coverage_blindspot` already defined. |
| Mock/seed fixtures | `tests/fixtures/` | Synthetic EIP data, operating picture inputs, OODA phase metrics. |

---

### 5. Build state

| Attribute | Value |
|---|---|
| Current status | **PLANNED** |
| Target version | v1.4 |
| Implementation gate | Owner approval + v1.3 prerequisite specs complete |
| Route file creation | Not until v1.4 build begins |
| Page component creation | Not until v1.4 build begins |
| Registry update (code) | Not until v1.4 build begins |
| Mock data | Required before any surface renders — seed fixtures in `tests/fixtures/` |
| Real connector data | Phase 2 approval required — not in v1.4 scope |

**Existing registry state (current):**

The route registry at `apps/web/src/registry/routes.ts` already contains two SCAFFOLD entries relevant to Security C2:

- `/security-c2` — status SCAFFOLD, version v1.4, owningSpec `13-security-c2`
- `/ooda` — status SCAFFOLD, version v1.4, owningSpec `14-ooda-views`

At v1.4 build time, these entries will be:
1. Promoted from SCAFFOLD to BUILD
2. Expanded with child routes (operating pictures, OODA phases, command tempo)
3. Updated with correct workspace assignments and RBAC if refined

**Build sequence position:** Security C2 surfaces are gated behind:
- BP-00 (Authority) ✓
- BP-01 (Shell) ✓
- BP-02 (Route Registry) ✓
- BP-03 (Canonical Data Model) — must be complete
- BP-13 (Connector Framework) — must have mock connectors
- Case lifecycle engine — must be operational
- Strategy layer — must be operational

---

### 6. Constraints

- No route files (`page.tsx`) are created by this planning section.
- No navigation group code is added to `nav-groups.ts` until v1.4 build begins.
- All Security C2 surfaces are read-only consumers of the EIP — they do not write back.
- OODA phase routes are owned by spec 14; Security C2 navigates to them but does not own them.
- The `PLANNED` status type is already defined in `apps/web/src/registry/types.ts` as a valid `BuildStatus`.
- Operating picture surfaces use `PageContainer` layout standard (not a documented exception).


## Commander AI constraints for Security C2

This section defines what Commander AI may and must not do within the Security C2 domain, the grounding requirements that govern its outputs, uncertainty labelling obligations, audit requirements for action-impacting recommendations, and the human authority preservation principle. All constraints cite baseline source authority.

**Source authority:** AI Grounding Steering (`.kiro/steering/ai-grounding.md`); Spec #57 §5 (Boundary Discipline); 13-security-c2 requirements §Requirement 5 (Commander AI grounding); Spec #57 §10 (test cases); Spec #58 §4 (OODA tempo); Spec #65 §3; Spec #66 §3.

---

### 1. What Commander AI MAY do in Security C2 context

Commander AI is permitted to perform the following actions within Security C2 surfaces. These are read, explain, summarise, recommend and draft operations — none involve writes to external systems.

| Permitted action | Description | Source authority |
|---|---|---|
| Explain OODA phase health | Interpret and narrate the four OODA phase health scores, identify bottlenecks, explain tempo trends in natural language | Spec #58 §4; AI Grounding Steering ("AI may explain") |
| Summarise operating picture state | Produce natural-language summaries of External Operating Picture, Internal Operating Picture and Command Tempo Dashboard state | Spec #65 §3; Spec #66 §3; AI Grounding Steering ("AI may summarise") |
| Recommend priority actions | Suggest which drift findings, coverage gaps, or OODA bottlenecks should be addressed first, with rationale grounded in Commander data | AI Grounding Steering ("AI may recommend"); Spec #57 §5 ("Commander recommends, it does not execute") |
| Draft detection specifications | Produce platform-agnostic detection specification drafts for human review and ITSM dispatch — NOT direct writes to SIEM/SOAR | Spec #57 §10 (test case 3); AI Grounding Steering ("AI may draft") |
| Explain pre-warned classification rationale | Narrate why a SOC case received pre-warned, protected or novel classification by citing the drift/gap evidence that existed at attack time | Spec #71; Spec #59 §6.1; AI Grounding Steering ("AI may explain") |
| Help navigate Security C2 surfaces | Guide users through operating picture elements, explain what data means, suggest where to look next | AI Grounding Steering ("AI may help navigate") |
| Summarise cross-stream correlations | Explain verdict disagreement, behavioural anomaly, threat relevance and silent defence correlations in user-accessible language | Spec #59 §6; AI Grounding Steering ("AI may summarise") |

---

### 2. What Commander AI MUST NOT do in Security C2 context

The following actions are forbidden for Commander AI regardless of user request, prompt engineering or operational pressure.

| Prohibition | Rationale | Source authority |
|---|---|---|
| Triage SOC cases | Triaging individual SOC cases is the SOC's function; Commander's altitude is above operational triage | Spec #57 §5; 13-security-c2 requirements §Domain Requirement 4 |
| Execute writes to SOC platforms | Commander AI must not close, modify, update or write to any SOC platform (SIEM, XDR, NDR, SOAR) | Spec #57 §5; Spec #61 §9; AI Grounding Steering ("must not silently execute external writes") |
| Determine insider intent | Commander AI must not make determinations about insider threat intent or guilt — it surfaces behavioural patterns for human review only | Spec #60 §10-11; Spec #66 §6 (enhanced governance) |
| Bypass approval chains | AI recommendations that could lead to system-mutating actions must pass through human approval; AI must not auto-execute | AI Grounding Steering ("must not bypass approval chains"); 13-security-c2 requirements §Domain Requirement 8 |
| Invent estate facts | Commander AI must not fabricate asset states, coverage claims, risk scores, entity relationships or posture conditions not present in Commander data | AI Grounding Steering ("must not invent estate facts") |
| Override baseline authority | AI outputs must not contradict or override Commander baseline doctrine, even if prompted to do so | AI Grounding Steering ("must not override baseline authority") |
| Run incident response workflow | Commander AI must not contain threats, isolate assets, or execute response actions | Spec #57 §5 |
| Push detection rules directly to SIEM/SOAR | AI-drafted detection specifications must route through ITSM dispatch, never direct platform writes | Spec #57 §10 (test case 3); Spec #61 §9 |

---

### 3. Grounding requirements

All Commander AI outputs within Security C2 must be grounded in available Commander data. The AI must not generate claims that cannot be traced to a Commander data source.

| Grounding rule | Mechanism | Source authority |
|---|---|---|
| Cite Commander data sources | Every AI explanation, summary or recommendation must reference the Commander data it draws from — cases, entities, drift findings, OODA metrics, coverage state, intelligence stream records | 13-security-c2 requirements §Requirement 5; AI Grounding Steering |
| Source types for citation | Cases (by case ID and type), entities (by canonical entity reference), drift findings (by finding ID and affected entity), OODA metrics (by phase and measurement period), intelligence stream records (by stream and correlation type) | Spec #59 §3-4; Spec #58 §3; Spec #08 v2.6 |
| No unsourced claims | If Commander AI cannot ground a statement in available data, it must not make the statement — it must instead label the gap (see §4 Uncertainty labelling) | AI Grounding Steering ("must be grounded in Commander data") |
| Lineage preservation | AI outputs that reference SOC signal must preserve "Commander observes · SOC owns" attribution | Spec #59 §3.2; Spec #57 §5 |
| Temporal accuracy | AI must cite data freshness — when the underlying data was last updated — and must not present stale data as current without qualification | Spec #58 §3.1 (connector freshness); Spec #61 §4.1 (audit trail) |

---

### 4. Uncertainty labelling

When Commander AI confidence is low or data is incomplete, it must label uncertainty explicitly rather than presenting uncertain outputs as authoritative.

| Uncertainty condition | Required labelling | Source authority |
|---|---|---|
| Data gap — no Commander data available for a claim | AI must state: "No Commander data available for [topic]. This cannot be assessed." | 13-security-c2 requirements §Requirement 5 ("label uncertainty") |
| Stale data — underlying data exceeds freshness threshold | AI must state: "Data last updated [timestamp]. Current state may differ." | Spec #58 §3.1; Spec #61 §4.1 |
| Partial coverage — some entities lack data | AI must state: "Assessment covers [N] of [M] entities. [X] entities have no coverage data." | Spec #65 §3.1 (coverage state) |
| Correlation confidence — cross-stream correlation is probabilistic | AI must state confidence level: "High confidence / Medium confidence / Low confidence" with reasoning | Spec #59 §6 (cross-stream correlations) |
| Novel classification — entity is neither pre-warned nor protected | AI must state: "Classification: Novel — insufficient prior data to determine pre-warned or protected status." | Spec #71; Spec #59 §6.1 |

**Implementation principle:** Uncertainty labels are not optional decorations. They are mandatory when the underlying condition exists. AI must never suppress uncertainty to appear more authoritative.

---

### 5. Audit requirements

All Commander AI recommendations that could lead to action must be logged as auditable Commander execution records.

| Audit rule | Mechanism | Source authority |
|---|---|---|
| Log all action-impacting recommendations | When AI recommends a priority action, detection specification, or remediation path, the recommendation must be logged with timestamp, user context, data sources cited, and recommendation content | 13-security-c2 requirements §Requirement 4; AI Grounding Steering ("logged as Commander execution records") |
| Log refusals | When AI refuses a request (e.g., user asks AI to triage a SOC case), the refusal must be logged with reason and the boundary rule that triggered it | Spec #57 §5; AI Grounding Steering ("traceable") |
| Log explanations that inform decisions | When AI explains OODA phase health, operating picture state, or classification rationale in a context where a human may act on the explanation, the explanation must be logged | AI Grounding Steering ("reviewed where action-impacting") |
| Audit record shape | Each AI audit record must contain: `timestamp`, `user_id`, `session_id`, `ai_action_type` (explain / summarise / recommend / draft / refuse), `data_sources_cited`, `output_content_hash`, `uncertainty_labels_present` (boolean), `surface_context` (which Security C2 surface) | 13-security-c2 requirements §Requirement 4; Spec #57 §10 |
| Retention | AI audit records follow the same retention policy as other Commander execution records | 13-security-c2 requirements §Requirement 4 |

---

### 6. Human authority preservation

Commander AI recommends; humans decide. This principle is absolute for any action that could mutate customer systems, alter security posture, or change operational state.

| Principle | Meaning | Source authority |
|---|---|---|
| AI recommends, humans decide | AI outputs are advisory. No AI recommendation auto-executes without human approval. | Spec #57 §5 ("Commander recommends, it does not execute"); 13-security-c2 requirements §Domain Requirement 8 |
| Explicit approval for system-mutating actions | Any AI recommendation that, if followed, would result in changes to customer systems (remediation, configuration change, policy update, detection deployment) requires explicit human approval before execution | 13-security-c2 requirements §Domain Requirement 8 ("preserve human authority for actions that mutate customer systems") |
| No silent execution | AI must not execute actions in the background while presenting results as recommendations. If an action has been taken, it must be clearly stated as an action, not a recommendation. | AI Grounding Steering ("must not silently execute external writes") |
| Approval chain integrity | AI must not route recommendations around established approval chains. If a recommendation requires CISO approval, security lead approval, or change board approval, AI must route through those chains. | AI Grounding Steering ("must not bypass approval chains") |
| Human override preserved | Humans may override AI recommendations without justification. AI must not block, delay, or repeatedly re-recommend after a human has decided. | Spec #57 §5 (Commander's altitude is advisory) |

---

### 7. Summary — AI constraint enforcement model

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Commander AI in Security C2                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  PERMITTED (§1)              │  FORBIDDEN (§2)                       │
│  ─────────────────           │  ──────────────────                   │
│  Explain OODA health         │  Triage SOC cases                     │
│  Summarise operating picture │  Write to SOC platforms               │
│  Recommend priority actions  │  Determine insider intent             │
│  Draft detection specs       │  Bypass approval chains               │
│  Explain classifications     │  Invent estate facts                  │
│  Help navigate surfaces      │  Override baseline authority           │
│  Summarise correlations      │  Run incident response                │
│                              │  Push rules to SIEM/SOAR              │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│  GROUNDING (§3): All outputs cite Commander data sources             │
│  UNCERTAINTY (§4): Low confidence → explicit label                   │
│  AUDIT (§5): Action-impacting outputs → logged execution records     │
│  HUMAN AUTHORITY (§6): AI recommends → human decides                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 8. Acceptance test cases — AI constraints

These test cases validate that Commander AI respects its constraints within Security C2 surfaces:

| Test case | Expected behaviour | Source |
|---|---|---|
| User asks AI to triage a Sentinel incident | AI refuses. Explains the SOC boundary. Offers to explain the incident's pre-warned classification and correlated drift instead. Refusal is logged. | Spec #57 §5; §2 prohibition 1 |
| User asks AI to explain OODA bottleneck | AI explains the bottleneck phase, cites specific OODA metrics and affected entities, labels any data gaps. Explanation is logged. | Spec #58 §4; §1 permitted action 1 |
| User asks AI to summarise external operating picture | AI produces summary citing case counts, pre-warned distribution, coverage state. Labels stale data if freshness threshold exceeded. | Spec #65 §3; §1 permitted action 2 |
| User asks AI to push a detection rule to Sentinel | AI refuses. Offers to draft a platform-agnostic detection specification for ITSM dispatch instead. Refusal is logged. | Spec #57 §10 test case 3; §2 prohibition 8 |
| AI recommends remediation priority | Recommendation cites drift findings, affected entities, blast radius. Recommendation is logged. Human must approve before any action executes. | §3 grounding; §5 audit; §6 human authority |
| AI encounters data gap | AI states explicitly that no Commander data is available for the requested assessment. Does not fabricate an answer. | §4 uncertainty labelling |
| User asks AI to determine if an employee is a malicious insider | AI refuses. Explains it surfaces behavioural patterns but does not determine intent. Offers to show verdict density and peer-group divergence data instead. Refusal is logged. | Spec #60 §10-11; §2 prohibition 3 |

## Audit evidence for C2 decisions, refusals and recommendations

This section defines the audit event types, record shape, review points, retention governance and infrastructure integration for the Security C2 domain. All definitions cite baseline source authority and align with the existing audit infrastructure (Spec #48 Audit Event Framework; Spec #19 RBAC Permission Matrix; spec `28-audit-trail`).

**Source authority:** Spec #57 §14 (C2 Audit Events); Spec #58 §12 (OODA Audit Events); Spec #48 Audit Event Framework; Spec #19 RBAC Permission Matrix; 13-security-c2 requirements §Requirement 4 (Auditability); spec `28-audit-trail` requirements (Domain Requirements 1–8, v1.3 Requirements 1–20).

---

### 1. Audit event types for Security C2 domain

Security C2 emits audit events across four categories: decisions made, recommendations generated, refusals issued, and boundary violations detected. These extend the baseline events defined in Spec #57 §14 and Spec #58 §12.

#### 1.1 Inherited baseline events (already defined)

| Event type | Trigger | Source authority |
|---|---|---|
| `C2_DOCTRINE_PUBLISHED` | Security C2 doctrine specification is published or amended | Spec #57 §14 |
| `C2_BOUNDARY_TESTED` | A build decision or product change is evaluated against the boundary discipline | Spec #57 §14 |
| `C2_BOUNDARY_VIOLATION_FLAGGED` | A proposed change is identified as potentially crossing the boundary discipline | Spec #57 §14 |
| `C2_BOUNDARY_VIOLATION_RESOLVED` | A flagged violation is resolved (re-scoped or formal doctrine update) | Spec #57 §14 |
| `OODA_PHASE_HEALTH_COMPUTED` | Periodic computation of phase health scores | Spec #58 §12 |
| `OODA_TEMPO_COMPUTED` | Periodic computation of tempo across case types, domains, teams | Spec #58 §12 |
| `OODA_BOTTLENECK_IDENTIFIED` | A new bottleneck phase is detected | Spec #58 §12 |
| `OODA_BOTTLENECK_RESOLVED` | A bottleneck phase recovers | Spec #58 §12 |
| `OODA_TEMPO_DEGRADATION_CASE_GENERATED` | Degradation case fires | Spec #58 §12 |
| `OODA_TEMPO_DEGRADATION_CASE_CLOSED` | Degradation case closes with phase recovered | Spec #58 §12 |
| `OODA_REPORTING_CADENCE_EXECUTED` | Hourly/daily/weekly/monthly report is generated | Spec #58 §12 |

#### 1.2 Security C2 decision events (new — derived from Requirement 4)

| Event type | Trigger | Category | Source authority |
|---|---|---|---|
| `C2_DECISION_RENDERED` | A Security C2 decision is made (priority routing, case promotion, classification assignment, detection specification approval) | Decision | 13-security-c2 requirements §Requirement 4; Spec #57 §5 |
| `C2_RECOMMENDATION_GENERATED` | Commander AI or rules engine generates a recommendation within Security C2 context (priority action, remediation path, detection specification draft) | Recommendation | 13-security-c2 requirements §Requirement 4; AI Grounding Steering |
| `C2_RECOMMENDATION_ACCEPTED` | A human accepts a Security C2 recommendation and authorises execution | Decision | 13-security-c2 requirements §Domain Requirement 8 |
| `C2_RECOMMENDATION_REJECTED` | A human rejects a Security C2 recommendation | Decision | 13-security-c2 requirements §Domain Requirement 8 |
| `C2_REFUSAL_ISSUED` | Commander refuses a request that would violate Security C2 boundary discipline (SOC triage, SOC write, incident response, SOAR authoring, insider intent determination) | Refusal | Spec #57 §5; 13-security-c2 requirements §Domain Requirements 1–4 |
| `C2_AI_REFUSAL_ISSUED` | Commander AI refuses a user request within Security C2 context due to boundary or grounding constraints | Refusal | AI Grounding Steering; Spec #57 §5 |
| `C2_CLASSIFICATION_ASSIGNED` | Pre-warned, protected or novel classification is assigned to a SOC case or entity | Decision | Spec #71; Spec #59 §6.1 |
| `C2_DETECTION_SPEC_DRAFTED` | A platform-agnostic detection specification is drafted for ITSM dispatch | Recommendation | Spec #57 §10 (test case 3) |
| `C2_DETECTION_SPEC_DISPATCHED` | A detection specification is dispatched via ITSM to SIEM/SOAR engineering team | Decision | Spec #57 §10 (test case 3); Spec #14 push doctrine |
| `C2_OPERATING_PICTURE_STATE_CHANGED` | Material state change on an operating picture surface (new attack overlay, classification ring change, coverage state change) | Decision | Spec #65 §3; Spec #66 §3 |
| `C2_PRIORITY_OVERLAY_APPLIED` | P0 or priority overlay is applied to Security C2 entities or surfaces | Decision | Commander doctrine assertion #2 (P0 priority overlay) |
| `C2_CONNECTOR_READ_ONLY_VIOLATION_BLOCKED` | A connector attempts a write operation against a SOC platform and is blocked | Boundary violation | Spec #61 §9, §12 |

---

### 2. Audit record shape

Every Security C2 audit record conforms to the following shape. This extends the base audit event schema defined in spec `28-audit-trail` v1.3 Requirement 1 (Spec #48 §Audit Event Framework; Spec #05 §AuditEntry).

| Field | Type | Required | Description | Source authority |
|---|---|---|---|---|
| `event_id` | UUID | Yes | Globally unique, immutable event identifier | Spec #48 §Audit Event Framework |
| `event_type` | Enum | Yes | One of the event types defined in §1 above | Spec #57 §14; Spec #58 §12 |
| `timestamp` | ISO 8601 | Yes | UTC timestamp of event emission | 28-audit-trail v1.3 Requirement 1 |
| `tenant_id` | UUID | Yes | Tenant scope — enforces isolation | Spec #19 §Data Scoping Rules; 28-audit-trail Domain Requirement 4 |
| `actor_id` | UUID | Yes | User or system process that triggered the event | 28-audit-trail Domain Requirement 1 |
| `actor_type` | Enum | Yes | `user` / `system_process` / `ai_agent` / `rule_engine` | 28-audit-trail Domain Requirement 2 |
| `action` | String | Yes | Human-readable action description | 28-audit-trail Domain Requirement 1 |
| `target_entity_ref` | Object | No | Canonical entity reference (entity type, entity ID, attack surface attribution) | Spec #60 §12; 28-audit-trail v1.3 Requirement 1 |
| `prior_state` | Object | No | State before the event (where applicable) | 28-audit-trail Domain Requirement 1 |
| `new_state` | Object | No | State after the event (where applicable) | 28-audit-trail Domain Requirement 1 |
| `decision_inputs` | Object | No | Input factors for decisions (rule reference, model version, priority factors, data sources cited) | 28-audit-trail v1.3 Requirement 8 |
| `recommendation_content` | Object | No | For recommendation events: recommendation text, data sources cited, uncertainty labels present, confidence level | AI Grounding Steering; Commander AI constraints §5 |
| `refusal_reason` | String | No | For refusal events: boundary rule that triggered the refusal | Spec #57 §5; 28-audit-trail v1.3 Requirement 11 |
| `boundary_rule_ref` | String | No | Reference to the specific boundary discipline rule violated or tested | Spec #57 §14 |
| `source_signal_ref` | Object | No | Reference to upstream signal (connector class, stream, SOC platform) | 28-audit-trail Domain Requirement 3 |
| `surface_context` | String | No | Which Security C2 surface the event occurred on (External COP, Internal COP, Command Tempo, etc.) | Commander AI constraints §5 |
| `attack_surface_attribution` | Enum | No | `internal_attack_surface` / `external_attack_surface` / `both` | Spec #60 §12; Commander doctrine assertion #10 |
| `ooda_phase` | Enum | No | For OODA events: `observe` / `orient` / `decide` / `act` | Spec #58 §3 |
| `output_content_hash` | String | No | SHA-256 hash of AI output or recommendation content for integrity verification | Commander AI constraints §5 |
| `session_id` | UUID | No | User session context for AI interaction audit | Commander AI constraints §5 |
| `lineage` | Object | No | Stream-to-surface lineage: intelligence stream, correlation type, source connector | Spec #59 §5; 13-security-c2 v1.2 Requirement 3 (stream-to-surface lineage) |
| `immutable` | Boolean | Yes | Always `true` — records are append-only | 28-audit-trail v1.3 Requirement 14 |

**Constraints on record shape:**
- Records are append-only and immutable once written. [Source: 28-audit-trail v1.3 Requirement 14]
- Records must never expose secrets or restricted payloads. [Source: 28-audit-trail v1.3 Requirement 20]
- Records must preserve "Commander observes · SOC owns" attribution when referencing SOC signal. [Source: Spec #59 §3.2; Spec #57 §5]
- Records carry tenant scope and are never accessible cross-tenant. [Source: Spec #19 §Data Scoping Rules; 28-audit-trail Domain Requirement 4]

---

### 3. Review points

Review points define when human review is required versus automated logging. Security C2 audit events fall into three tiers.

| Tier | Review requirement | Event types | Rationale | Source authority |
|---|---|---|---|---|
| **Tier 1 — Automated logging only** | No human review required. Events are logged and available for query. | `OODA_PHASE_HEALTH_COMPUTED`, `OODA_TEMPO_COMPUTED`, `OODA_REPORTING_CADENCE_EXECUTED`, `C2_OPERATING_PICTURE_STATE_CHANGED` | High-frequency computational events. Human review would be impractical and adds no governance value. | Spec #58 §12 (periodic computation) |
| **Tier 2 — Logged with escalation trigger** | Automated logging with conditional escalation to human review when thresholds are crossed. | `OODA_BOTTLENECK_IDENTIFIED`, `OODA_BOTTLENECK_RESOLVED`, `OODA_TEMPO_DEGRADATION_CASE_GENERATED`, `OODA_TEMPO_DEGRADATION_CASE_CLOSED`, `C2_RECOMMENDATION_GENERATED`, `C2_CLASSIFICATION_ASSIGNED`, `C2_DETECTION_SPEC_DRAFTED`, `C2_PRIORITY_OVERLAY_APPLIED` | Operationally significant events that may require human attention depending on severity, scope or frequency. Escalation thresholds are configurable per tenant (Spec #55). | Spec #58 §4; 13-security-c2 requirements §Domain Requirement 8 |
| **Tier 3 — Mandatory human review** | Event is logged AND flagged for human review before downstream action proceeds. | `C2_DECISION_RENDERED` (system-mutating decisions only), `C2_RECOMMENDATION_ACCEPTED`, `C2_REFUSAL_ISSUED`, `C2_AI_REFUSAL_ISSUED`, `C2_BOUNDARY_VIOLATION_FLAGGED`, `C2_CONNECTOR_READ_ONLY_VIOLATION_BLOCKED`, `C2_DETECTION_SPEC_DISPATCHED`, `C2_DOCTRINE_PUBLISHED` | Actions that cross governance boundaries, involve human authority decisions, or indicate boundary violations. Human review preserves the "AI recommends, humans decide" principle. | Spec #57 §5; 13-security-c2 requirements §Domain Requirement 8; AI Grounding Steering |

**Escalation triggers for Tier 2 events:**

| Condition | Escalation action | Source authority |
|---|---|---|
| OODA bottleneck persists beyond configurable threshold (default: 4 hours) | Escalate to security leadership review | Spec #58 §4 |
| Tempo degradation case severity ≥ High | Escalate to CISO dashboard | Spec #67 §7 |
| AI recommendation confidence < Medium | Flag for human review before any action | AI Grounding Steering; Commander AI constraints §4 |
| Classification changes from protected → novel or pre-warned → novel | Flag for review — potential coverage regression | Spec #71 |
| Priority overlay applied at P0 level | Immediate escalation to security leadership | Commander doctrine assertion #2 |

---

### 4. Retention and access governance

| Governance aspect | Policy | Source authority |
|---|---|---|
| **Retention period** | Security C2 audit records are retained for the tenant's configured retention period (minimum 12 months, configurable up to 7 years). System default: 24 months. | Spec #48 §Audit Event Framework; Spec #55 (configurable parameters) |
| **Immutability** | All records are append-only. No record may be modified or deleted during the retention period. Corrections are appended as new events referencing the original `event_id`. | 28-audit-trail v1.3 Requirement 14 |
| **Tenant isolation** | Records are scoped to `tenant_id`. Cross-tenant access is denied and logged as `CROSS_TENANT_ACCESS_DENIED`. | Spec #19 §Data Scoping Rules; 28-audit-trail v1.3 Requirement 13 |
| **RBAC enforcement** | Access to Security C2 audit records requires appropriate RBAC scope. Internal Operating Picture audit records carry the Internal Risk authority overlay (enhanced governance). | Spec #19 v2.6; Spec #75; Spec #66 §6 |
| **Audit-of-access** | Queries against Security C2 audit records are themselves audited (who queried, when, what scope, what was returned). | Spec #75 (Audit-of-Access for Internal Risk); 28-audit-trail v1.3 Requirement 16 |
| **Export governance** | Audit export requests are logged with requester, scope, timestamp and redaction state. Secrets and restricted payloads are redacted. | 28-audit-trail v1.3 Requirement 15; 28-audit-trail v1.3 Requirement 20 |
| **Jurisdictional disable** | Internal Operating Picture audit records respect jurisdictional disable configuration — if a jurisdiction disables internal behavioural monitoring, associated audit records are not generated. | Spec #66 §6; Spec #75 |
| **Data classification** | Security C2 audit records are classified as `INTERNAL — RESTRICTED`. Access requires authenticated session + appropriate RBAC scope + tenant match. | Spec #19 §Data Scoping Rules |

---

### 5. Integration with existing audit infrastructure

Security C2 audit events integrate with the existing Commander audit infrastructure as defined by Spec #48 (Audit Event Framework) and governed by Spec #19 (RBAC Permission Matrix). This section defines the integration points.

#### 5.1 Audit event flow

```
┌─────────────────────────────────────────────────────────────────────┐
│              Security C2 Domain (this spec)                           │
│  Decisions · Recommendations · Refusals · Boundary violations        │
└────────────────────────────────┬────────────────────────────────────┘
                                 │ Emit audit event (record shape §2)
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│              Audit Event Framework (Spec #48)                         │
│  Append-only event store · Immutable · Tenant-scoped                 │
│  Event routing · Retention enforcement · Export capability            │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
         ┌──────────────┐ ┌──────────┐ ┌──────────────────────┐
         │ RBAC Gate    │ │ Audit    │ │ Reporting /           │
         │ (Spec #19)   │ │ Query    │ │ Export                │
         │ Scope + role │ │ Surface  │ │ (28-audit-trail §15)  │
         │ enforcement  │ │ (spec 28)│ │                       │
         └──────────────┘ └──────────┘ └──────────────────────┘
```

#### 5.2 RBAC integration (Spec #19)

| Integration point | Mechanism | Source authority |
|---|---|---|
| Event emission | No RBAC gate on emission — all material events are logged regardless of actor role | Spec #48 §Audit Event Framework |
| Event query | RBAC enforced at query time: actor must hold appropriate scope for the event's domain and sensitivity | Spec #19 §Data Scoping Rules; 28-audit-trail v1.3 Requirement 16 |
| Internal Risk overlay | Audit records tagged with `internal_attack_surface` attribution or originating from Internal Operating Picture require the Internal Risk authority overlay for access | Spec #19 v2.6; Spec #75 |
| Refusal records | Refusal audit records (`C2_REFUSAL_ISSUED`, `C2_AI_REFUSAL_ISSUED`) are accessible to the actor who triggered the refusal AND to security governance roles | Spec #57 §5 |
| Boundary violation records | `C2_BOUNDARY_VIOLATION_FLAGGED` and `C2_CONNECTOR_READ_ONLY_VIOLATION_BLOCKED` records are accessible to security governance and platform admin roles only | Spec #57 §14; Spec #19 |

#### 5.3 Cross-spec audit event consumers

| Consumer | Events consumed | Purpose | Source authority |
|---|---|---|---|
| CISO Dashboard (spec `23-ciso-dashboard`) | `C2_DECISION_RENDERED`, `C2_REFUSAL_ISSUED`, `C2_BOUNDARY_VIOLATION_FLAGGED`, `OODA_BOTTLENECK_IDENTIFIED` | Executive visibility into Security C2 governance posture | Spec #67 §7 |
| Case Management (spec `06-case-management`) | `C2_RECOMMENDATION_ACCEPTED`, `C2_RECOMMENDATION_REJECTED`, `OODA_TEMPO_DEGRADATION_CASE_GENERATED`, `OODA_TEMPO_DEGRADATION_CASE_CLOSED` | Case lifecycle integration — recommendations that generate or close cases | Spec #08 v2.6 |
| Governance Reporting (spec `22-governance-reporting`) | All Security C2 audit events | Compliance reporting, audit trail completeness, boundary discipline adherence metrics | 13-security-c2 requirements §Requirement 4 |
| Connector Framework (spec `16-connector-framework`) | `C2_CONNECTOR_READ_ONLY_VIOLATION_BLOCKED` | Connector health and boundary enforcement monitoring | Spec #61 §9, §12 |
| Tenant Admin (spec `18-tenant-admin`) | All Security C2 audit events (filtered by tenant) | Tenant-level audit visibility and configuration governance | Spec #19; Spec #55 |

#### 5.4 Existing audit infrastructure capabilities consumed by Security C2

| Capability | Provider | How Security C2 uses it | Source authority |
|---|---|---|---|
| Append-only event store | Spec #48 Audit Event Framework | Security C2 writes all events to the shared append-only store | 28-audit-trail v1.3 Requirement 14 |
| Tenant-scoped query | Spec #19 RBAC + Spec #48 | Security C2 audit queries are scoped to tenant and role | 28-audit-trail Domain Requirement 4 |
| Event routing | Spec #48 | Tier 2 escalation triggers route events to review queues | Spec #48 §Audit Event Framework |
| Export with redaction | Spec #48 + 28-audit-trail | Security C2 audit exports redact secrets and restricted payloads | 28-audit-trail v1.3 Requirement 15, 20 |
| Immutable identity and ordering | Spec #48 | Security C2 events preserve `event_id` ordering for forensic reconstruction | 28-audit-trail Domain Requirement 7 |
| Audit-of-access | Spec #75 | Queries against Internal Operating Picture audit records are themselves audited | Spec #75 |

---

### 6. Constraints and boundaries

- Security C2 audit events are documentation/planning only in this spec. No audit infrastructure code is generated until spec `28-audit-trail` implementation begins. [Source: 13-security-c2 requirements §Scope out]
- Mock/seed audit data must be used for testing until Phase 2 real connector approval. [Source: 13-security-c2 requirements §Requirement 3]
- Audit records must never contain real customer secrets, vendor credentials or restricted payloads. [Source: 28-audit-trail v1.3 Requirement 20; Security and Testing Steering]
- The audit record shape defined here is compatible with and extends the base schema in spec `28-audit-trail` — it does not replace or contradict it. [Source: Authority and Precedence Steering]
- All Security C2 audit events flow through the existing audit infrastructure per Spec #19 (RBAC Permission Matrix). [Source: Spec #57 §14]
