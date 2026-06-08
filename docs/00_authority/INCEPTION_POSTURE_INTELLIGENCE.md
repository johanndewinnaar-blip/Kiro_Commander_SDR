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

These are DISTINCT failure modes with different root causes, different owners, different remediation paths, and different recurrence patterns.

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
| AAI-1.0 (Asset Architecture Intelligence) | COMPANION — AAI provides the architectural context (type, tier, relationships) against which inception posture is evaluated. IPI consumes AAI. |
| Spec #55 (Baseline Configuration) | EXTENDED — IPI defines inception-specific baselines (Secure Design Profiles) that complement operational baselines |
| D-04 Drift & Rule Engine | COMPLEMENTARY — Drift detects CHANGE from secure state. IPI detects ABSENCE of initial secure state. Different engines, different triggers. |
| Journey Intelligence (JI-1.0) | CONSUMER — Journey Intelligence gains rootCauseClass as a formula input and journey classifier |
| Spec #08 (Case Management) | EXTENDED — new case type #13: not-secure-by-design |

---

## 3. Core Distinction

| | Secure by Design | Not Secure by Design | Security Drift |
|---|---|---|---|
| Previous secure state | N/A (inception) | NO — never was | YES — was compliant |
| Root cause | Correct process | Build/process/provisioning failure | Operational decay, config change |
| Remediation owner | N/A | Build team / platform team | Operations team |
| Recurrence | N/A | WILL recur until source process fixed | May recur if config management fails |
| Case priority | N/A | Potentially higher (systemic) | Standard |
| Evidence | Inception evaluation PASS | Inception evaluation FAIL (no prior secure state exists) | Before-state exists (baseline comparison) |

---

## 4. Data Model

### PostureOrigin Enum (on Asset Entity)

```
PostureOrigin:
  secure_by_design                — passed inception evaluation
  not_secure_by_design            — failed inception evaluation
  unknown                         — not yet evaluated (pre-existing assets)
  accepted_not_secure_by_design   — failed but explicitly accepted with governance
```

- Set ONCE at discovery/creation time (or when first evaluated)
- IMMUTABLE once set — unless governance override to accepted_not_secure_by_design
- Nullable on existing assets (backward-compatible)
- Lives on Asset entity as `postureOrigin?: PostureOrigin`

### RootCauseClass Enum (on Finding Entity)

```
RootCauseClass:
  not_secure_by_design
  security_drift
  misconfiguration
  coverage_gap
  control_failure
  process_failure
  technical_debt
  third_party_dependency
  accepted_risk
  unknown
```

- Set on Finding at creation time
- Enables case routing differentiation
- Enables AI Analyst root-cause explanation
- Enables Journey Intelligence root-cause classification
- Lives on Finding entity as `rootCauseClass?: RootCauseClass`

### New RiskObject Type

```
RiskObjectType (extended):
  + inception_posture_failure
```

Creates risk objects specifically for inception failures, distinct from configuration_drift risk objects.

### New Case Type

```
CaseType (extended — becomes 13 canonical types):
  + not-secure-by-design
```

Case type #13. Distinct from drift. Routes to build/platform team. Indicates inception/provisioning process failure.

---

## 5. Secure Design Profiles

### What They Are

A Secure Design Profile defines what "Secure by Design" MEANS for a given asset type + architectural tier + compliance scope combination. It specifies the EXPECTED inception posture.

### Profile Shape

```
SecureDesignProfile:
  profileId: string
  name: string
  assetType: AssetClassification (or wildcard for tier-wide)
  architecturalTier: ArchitecturalTier (or wildcard)
  complianceScopes: string[] (additional requirements when in these scopes)
  requiredControls: string[] (control IDs that must be in place at inception)
  requiredCoverage: CoverageType[] (tool coverage that must be bound at inception)
  requiredFields: string[] (asset fields that must be populated: owner, estateNodeId, etc.)
  requiredRelationships: RelationshipType[] (relationships that must exist: owned_by, contains, etc.)
  requiredBaselineProfile: string | null (baseline configuration that must pass)
  version: string
  status: active | draft | retired
  + CommonFields
```

### Hosting

Secure Design Profiles are hosted as **strategy policies** — either as a new strategy surface type (`secure-design-profile`) or as an extension of the existing `threshold` surface.

This gives them: versioning, tenant override, approval governance, audit trail, simulation capability.

### Examples

**Endpoint (compute tier):**
```
requiredControls: [edr, disk-encryption, patch-policy]
requiredCoverage: [edr, vuln-scan]
requiredFields: [owner, estateNodeId]
requiredRelationships: [owned_by]
requiredBaselineProfile: endpoint-hardened-v2
```

**Cloud Account (cloud_control tier):**
```
requiredControls: [audit-logging, iam-baseline, guardrails]
requiredCoverage: [cspm]
requiredFields: [owner, estateNodeId]
requiredRelationships: [owned_by, contains]
requiredBaselineProfile: cloud-account-baseline-v1
```

**Code Repository (build_deploy tier):**
```
requiredControls: [branch-protection, secret-scanning, sast-gate]
requiredCoverage: [sast]
requiredFields: [owner, estateNodeId]
requiredRelationships: [owned_by, deployed_by]
requiredBaselineProfile: null (no config baseline — control-based only)
```

---

## 6. Inception Posture Evaluator Engine

### What It Does

A pure-function engine that runs ONCE per asset at discovery/creation time. Evaluates the asset against its applicable Secure Design Profile.

### Logic

```
1. Lookup applicable profile(s) for asset type + tier + compliance scope
2. Evaluate: requiredControls present?
3. Evaluate: requiredCoverage bound? (via AssetCoverageBinding)
4. Evaluate: requiredFields populated?
5. Evaluate: requiredRelationships exist? (via AssetRelationship)
6. Evaluate: requiredBaselineProfile passes? (via ControlEvaluation)

IF ALL PASS:
  → asset.postureOrigin = secure_by_design
  → no finding, no case

IF ANY FAIL:
  → asset.postureOrigin = not_secure_by_design
  → Finding created (rootCauseClass: not_secure_by_design, citing failed requirements)
  → RiskObject created (type: inception_posture_failure)
  → Case created (type: not-secure-by-design, bound to risk object)
```

### When It Runs

- At asset DISCOVERY time (connector first reports this asset)
- At asset CREATION time (manually registered)
- NOT on subsequent evaluations (that's drift detection's job)
- Can be RE-RUN if the profile changes (governance decision — re-evaluate existing assets against updated profile)

---

## 7. Case Type: not-secure-by-design

### Trigger

Inception Posture Evaluator determines asset failed its Secure Design Profile.

### Routing

Routes to BUILD/PLATFORM team — the team responsible for the provisioning process that created the asset. NOT to operational security support.

Strategy routing policy differentiates on `rootCauseClass: not_secure_by_design`.

### Priority

Potentially HIGHER than standard drift cases because inception failures indicate SYSTEMIC process failure. Strategy prioritisation policy can boost for this root cause class.

### Remediation

The remediation action is typically: "Fix the provisioning process" — not "fix this one asset."

A single action ("fix pipeline X") may persist across and resolve MULTIPLE inception-failure cases simultaneously. The action remains open until the root cause process is corrected.

---

## 8. Systemic Pattern Detection

### The Problem

If one build pipeline is broken, it may produce 20 assets that all fail inception. Commander creates 20 cases. The security architect needs to see: "These 20 cases share a single root cause."

### The Model

Commander detects systemic patterns when multiple not-secure-by-design cases share:
- Same failed profile requirement(s)
- Same provisioning source (connector, pipeline, cloud account)
- Same time window

### Shared Remediation Action

A single remediation action can be LINKED across multiple cases:
- Action: "Fix build pipeline infra-deploy-prod — add EDR agent step"
- Bound to: Case-001, Case-002, ... Case-020 (all inception failures from that pipeline)
- Action persists until the pipeline is fixed
- When fixed: all 20 cases resolve through validation (new assets from that pipeline now pass inception check)

### Mission/Strategy Feed

Systemic inception failure patterns directly feed:
- **Missions:** "Secure all build pipelines by Q3" (scoped to build_deploy tier assets)
- **Strategies:** "Enforce inception posture checks on all provisioning"
- **Policies:** Secure Design Profiles as mandatory strategy policies
- **Architecture decisions:** Which pipelines/processes need redesign

Commander SURFACES the systemic pattern. A human (CISO/SOM) creates the mission in response.

---

## 9. Relationship to Drift

1. **Not Secure by Design is NOT a drift category.** It is separate from drift.
2. **Drift REQUIRES evidence of a previous secure state.** If no previous secure state exists, it cannot be drift.
3. **If an object has no previous secure state, Commander classifies it as Not Secure by Design** — not as drift.
4. **The two can coexist on the same asset over time:**
   - Day 1: Asset discovered → fails inception → postureOrigin: not_secure_by_design → case created
   - Day 30: Asset remediated → now meets profile → drift baseline established
   - Day 60: Asset config changes → NOW it's drift (prior secure state exists from Day 30)

The Inception Posture Evaluator runs ONCE (at discovery). The Drift Engine runs CONTINUOUSLY (on schedule). They are complementary engines with different triggers, different evidence requirements, and different case types.

---

## 10. Relationship to Asset Architecture Intelligence

AAI provides the CONTEXT that IPI evaluates against:

| AAI Provides | IPI Uses It For |
|---|---|
| Asset type | Lookup applicable Secure Design Profile |
| Architectural tier | Profile scoping (different tiers have different inception requirements) |
| Estate node | Compliance scope inheritance (PCI node → stricter profile) |
| AssetCoverageBinding | Check: "Is required coverage bound?" |
| AssetRelationship | Check: "Do required relationships exist?" |
| ComplianceScopeBinding | Additional profile requirements for in-scope assets |

IPI does NOT modify AAI. It CONSUMES AAI data to evaluate inception posture.

---

## 11. Relationship to Journey Intelligence

| JI Concept | IPI Impact |
|---|---|
| Journey root cause | rootCauseClass on Finding classifies the journey. AI Analyst can explain: "This is not drift. This was never secure." |
| Journey rework | Not-secure-by-design cases REWORK if build process isn't fixed (asset remediated, next asset fails again). JI rework detection identifies this. |
| Journey leakage | High leakage on inception failures may indicate no clear owner for build-process remediation. |
| Formula input | rootCauseClass becomes input to journey quality formula (inception failures = upstream quality problem). |
| Automation opportunity | Inception posture checking is HIGHLY automatable (profile evaluation at discovery = system_driven). |
| Lifecycle savings | Catching inception failures at discovery saves the full lifecycle cost of cases discovered later via drift. |
| Journey checkpoint | `inception_evaluated` could become a lifecycle checkpoint in the Observe phase. |

---

## 12. AI Analyst Integration

The AI Analyst can distinguish and explain:

```
"This is not drift. This object was Not Secure by Design at inception.

Root cause: build process failure — server provisioned from non-standard image
without EDR agent in the base image.

Evidence: Inception Posture Evaluator finding FND-2026-0847 —
requiredCoverage 'edr' not bound at discovery time.

Pattern: This is the third server this month from provisioning pipeline
'infra-deploy-prod' (asset: pipeline-0012) failing inception checks.

Recommendation: Investigate build pipeline 'infra-deploy-prod' for missing
EDR integration step. This is a systemic process failure, not an isolated
asset issue."
```

### AI Must Cite

- Finding with rootCauseClass: not_secure_by_design
- Secure Design Profile that was evaluated
- Specific requirements that failed
- Pattern data (other assets from same source that also failed)

### AI Must NOT Infer

- WHY the process failed internally (requires investigation)
- WHO is personally responsible
- Whether the failure is intentional or accidental

### AI Must Label Uncertainty

- If pattern data is insufficient: "Pattern unclear — only one failure from this source so far"
- If profile is new: "Profile recently activated — historical comparison not available"

---

## 13. Governance

### Conformance Assertions

| Rule ID | Rule |
|---|---|
| ARCH-IPI-001 | Every asset type with an active Secure Design Profile must be evaluated at discovery |
| ARCH-IPI-002 | postureOrigin is immutable once set (governance override for acceptance only) |
| ARCH-IPI-003 | Inception findings must carry rootCauseClass: not_secure_by_design |
| ARCH-IPI-004 | not-secure-by-design cases route to build/platform team (never operations) |
| ARCH-IPI-005 | Secure Design Profiles require strategy policy governance (approval lifecycle) |
| ARCH-IPI-006 | Systemic pattern detection must not auto-create missions (surfaces pattern only — human creates mission) |

### Profile Governance

Secure Design Profiles follow strategy policy lifecycle:
- draft → pending-approval → approved → active → superseded → retired
- Tenant override allowed (stricter profiles for specific estate nodes)
- Version history preserved
- Profile changes audited

---

## 14. Performance Constraints

### Evaluator Timing

- Runs ONCE per asset at discovery (not continuously)
- Must complete within the asset creation pipeline (not async — the postureOrigin must be set before the asset becomes visible in operational views)
- Profile lookup: operational-read (small reference data)
- Coverage/relationship checks: operational-read (bounded by single asset's bindings)

### Storage

- PostureOrigin on Asset: 1 byte (enum)
- RootCauseClass on Finding: 1 byte (enum)
- Secure Design Profiles: ~500 bytes per profile × ~30 profiles = ~15 KB total (reference data)
- No new high-volume tables

### Workload Class

- Profile lookup: operational-read
- Inception evaluation: operational-read (bounded — single asset context)
- Finding/Case/RiskObject creation: operational-write
- Pattern detection (systemic): analytics-read (scheduled aggregation)

---

## 15. Impact on Existing Build

### Breaking Changes: ZERO

All changes are additive:
- PostureOrigin enum: new (no existing field modified)
- RootCauseClass enum: new (no existing field modified)
- postureOrigin on Asset: new nullable field
- rootCauseClass on Finding: new nullable field
- inception_posture_failure RiskObject type: enum value addition
- not-secure-by-design case type: enum value addition (#13)
- Secure Design Profile: new strategy policy type
- Inception Posture Evaluator: new engine

### Existing Entities Unchanged

- Drift engine unchanged (still detects change from baseline)
- Case lifecycle unchanged (12-state machine applies to all case types including #13)
- Strategy layer unchanged (new surface type is additive)
- All existing fixtures remain valid

---

## 16. Build Sequencing

### Foundation Pass

1. PostureOrigin enum + RootCauseClass enum
2. Asset entity extension (postureOrigin field)
3. Finding entity extension (rootCauseClass field)
4. RiskObject type extension (inception_posture_failure)
5. Case type extension (not-secure-by-design — #13)
6. Secure Design Profile entity/strategy-policy (contract + schema + fixture)
7. Inception Posture Evaluator engine (pure function)
8. Default profiles for major asset types (~10-15 initial profiles)
9. Routing strategy differentiation on rootCauseClass
10. Pattern detection logic (analytics read model for systemic identification)

### Phase 2

- Full profile catalogue (all 52 asset types covered)
- Systemic pattern surfacing UI
- Mission/strategy feed from inception patterns
- AI Analyst inception-aware reasoning

---

## 17. Authority and Lineage

This document is the deep authority for Inception Posture Intelligence. It is referenced by:

- docs/00_authority/ASSET_ARCHITECTURE_INTELLIGENCE.md (AAI-1.0) — provides architectural context consumed by IPI
- docs/00_authority/JOURNEY_INTELLIGENCE.md (JI-1.0) — consumes rootCauseClass for journey classification
- Baseline Spec #55 (Baseline Configuration) — IPI extends baseline concept to inception
- Baseline Spec #08 (Case Management) — new case type #13
- D-04 Drift & Rule Engine — complementary (drift requires prior secure state; IPI evaluates initial state)

Where any other document conflicts on inception posture evaluation, this document wins.
