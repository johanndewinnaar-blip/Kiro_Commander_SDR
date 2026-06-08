# Commander SDR — Asset Architecture Intelligence Authority Document

**Version:** AAI-1.0
**Status:** Authoritative. Peer capability to Journey Intelligence (JI-1.0) and Spec #58 (Security OODA Loop).
**Authority:** This document is the binding authority for the Asset Architecture Intelligence capability domain. Where any other document conflicts on asset taxonomy, estate topology, architectural classification, or relationship modelling, this one wins; the other must be updated.

---

## 1. Definition

Asset Architecture Intelligence is Commander's capability for giving a security architect a complete, structured, queryable, risk-overlaid view of their entire technology estate — organised architecturally, scoped by organisational structure, and connected through real dependency relationships.

This is NOT a flat asset register. It is NOT a CMDB replacement. It IS the security-relevant architectural intelligence layer that enables:

- Full estate inventory by type, tier, and organisational scope
- Dependency and blast radius computation through real relationships
- Coverage gap detection through explicit tool-to-asset bindings
- Compliance scoping through framework-to-asset bindings
- Architecture map visualisation with risk overlay
- Risk, case, and Journey Intelligence contextualised against real architecture

### Core Framing

```
Estate First (organisational structure)
Architecture Aware (tiers and types)
Relationship Driven (dependencies, coverage, scope)
Risk Overlaid (cases, vulnerabilities, drift, coverage gaps)
Journey Connected (all cases trace back to architectural components)
```

---

## 2. Relationship to Other Authority

| Authority | Relationship |
|---|---|
| Spec #22 (Architecture Intelligence) | EXTENDED — gains full asset taxonomy and dependency model |
| Spec #60 (Attack Surface Framework) | ENRICHED — surface attribution gains architectural tier precision |
| Spec #69 (Asset Intelligence Surface) | EXTENDED — UI surface gains tier/dependency/coverage views |
| Spec #33 (Multi-Domain Fusion Map) | COMPANION — Architecture Map is a sibling surface using same graph primitives |
| Spec #55 (Baseline Configuration) | ENRICHED — baselines scoped per estate node and per architectural tier |
| Journey Intelligence (JI-1.0) | COMPLEMENTARY — JI measures work ABOUT architectural components. AAI defines WHAT those components are. |
| Spec #58 (Security OODA Loop) | ENRICHED — OODA phase health gains architectural tier dimension |

None are superseded. All are enriched.

---

## 3. The Three Layers

### Layer 1: Estate Topology (Organisational Structure)

The customer's internal organisational and environmental hierarchy. Not Commander's multi-tenancy (that's Seiertech customer isolation) — this is a CUSTOMER'S OWN internal structure.

### Layer 2: Asset Architecture (Technical Structure)

Every component in the estate classified by what it IS (type) and where it SITS (architectural tier), with lifecycle handling for ephemeral components.

### Layer 3: Relationships (How It Connects)

Typed bindings between components: dependencies, coverage, compliance scope, ownership, supply chain, network topology, third-party access.

---

## 4. Layer 1 — Estate Topology

### Entity: EstateNode

```
EstateNode:
  nodeId: string
  name: string
  nodeType: enterprise | business_unit | environment | region | acquisition | shared_service
  parentNodeId: string | null (creates hierarchy)
  status: active | integrating | decommissioning | isolated
  geography: string | null
  complianceScopes: string[] (inherited downward)
  ownerTeam: string
  tags: string[]
  + CommonFields
```

### Rules

- Every asset carries estateNodeId — which part of the organisation it belongs to
- Compliance scopes inherit DOWNWARD (PCI on parent → all children are PCI-scoped)
- Risk rolls UP (child has critical vulnerability → parent posture is affected)
- Cross-node dependencies are explicitly visible
- Connectors carry default estateNodeId — discovered assets inherit
- Estate nodes are tenant-scoped (each Commander customer manages their own topology)

### Assignment Strategy

Assets are tagged to estate nodes via:
1. Connector-level default (connector belongs to a node → discovered assets inherit)
2. Cloud account mapping (AWS account 123 = UK Pharma Production)
3. Network-based inference (asset in network segment X → belongs to node Y)
4. Tag-based rules (env:production AND bu:pharma-uk → estate node)
5. Manual override / bulk assignment

---

## 5. Layer 2 — Asset Architecture

### Classification Model

Every asset carries THREE classification dimensions:

**Asset Type** (~52 values) — what it IS
**Architectural Tier** (12 values) — where it SITS
**Lifecycle Model** (3 values) — how long it exists

### Asset Types by Tier

#### Perimeter / External Surface

```
web-domain, api-endpoint, load-balancer, cdn-edge, vpn-gateway, dns-zone, tls-certificate
```

#### Cloud Control

```
cloud-account, managed-service (with serviceClassification sub-field)
```

#### Cloud Infrastructure

```
cloud-instance, cloud-storage, cloud-network, serverless-function
```

#### Compute / Hosting

```
server, endpoint, mobile-device, container, container-image, kubernetes-cluster, kubernetes-namespace
```

#### Application / Service

```
application, microservice, message-queue, data-pipeline
```

#### Data

```
database, data-warehouse, backup-system
```

#### Identity Infrastructure

```
identity-provider, directory-service, federation-trust, pam-vault, certificate-authority, sso-integration, mfa-deployment, kms-hsm
```

#### Network Architecture

```
network-device, network-segment
```

#### Build / Deploy (Supply Chain)

```
code-repository, ci-cd-pipeline, artifact-repository, container-registry, iac-template, package-dependency
```

#### IoT / OT

```
iot-device, ot-device, ot-network
```

#### Physical / Facilities

```
building, data-centre, server-room, physical-access-system
```

#### Third Party / External

```
saas-platform, third-party-integration, partner-connection
```

#### Security Infrastructure

```
security-tool, storage-appliance
```

### Architectural Tier Enum (12 values)

```
perimeter, cloud_control, cloud_infrastructure, compute, application,
data, identity, network, build_deploy, iot_ot, physical, third_party
```

### Lifecycle Model Enum (3 values)

```
persistent              — exists continuously (server, database, IdP)
ephemeral_defined       — a DEFINITION that creates instances (Lambda, auto-scaling group, Fargate task)
ephemeral_discovered    — discovered by connector, persistence assessed by threshold
```

### Managed Service Sub-Classification

The managed-service type carries a serviceClassification field:

```
iam, networking, secrets-management, encryption, logging-monitoring, dns,
certificate-management, container-orchestration, serverless-platform,
storage-service, database-service, messaging-service, analytics-service
```

### Ephemeral Asset Rules

- Model at DEFINITION level, not instance level
- "We have a Lambda function that processes payments" = one asset
- "Lambda invocation #847293" = NOT an asset (telemetry, not architecture)
- Auto-scaling groups = one asset (the definition), metadata carries peak/typical count
- Ephemeral threshold: configurable per tenant (default: component existing >4 hours becomes an asset)
- Commander is NOT a telemetry warehouse — ephemeral instance tracking is out of scope

---

## 6. Layer 3 — Relationships

### Relationship Types (12)

```
depends_on              — technical dependency (A fails → B breaks)
hosts                   — infrastructure hosting a component
routes_through          — network/traffic path
authenticates_via       — identity dependency
stores_data_for         — data flow relationship
deployed_by             — supply chain path (repo → pipeline → target)
covered_by              — explicit security tool coverage
in_scope_for            — compliance framework scope binding
owned_by                — team/person ownership
accessed_by_vendor      — third-party access path
secures                 — security component protecting another
contains                — hierarchical containment (account → VPC → subnet → instance)
```

### Entity: AssetRelationship

```
AssetRelationship:
  sourceAssetId: string
  targetAssetId: string
  relationshipType: RelationshipType (from bounded enum)
  metadata: Record<string, unknown> (type-specific: port, protocol, access level)
  confirmedAt: string
  confirmedBy: connector | manual | inference
  status: active | stale | broken
  + CommonFields
```

### Entity: AssetCoverageBinding (Explicit Coverage)

```
AssetCoverageBinding:
  assetId: string
  connectorId: string
  coverageType: string (edr, vuln-scan, cspm, sast, dast, siem, dlp, backup, etc.)
  confirmedAt: string
  status: covered | gap | stale
  + CommonFields
```

### Entity: ComplianceScopeBinding

```
ComplianceScopeBinding:
  assetId: string
  frameworkId: string
  scopeStatus: in_scope | out_of_scope | conditional
  justification: string
  reviewedAt: string
  inheritedFrom: estateNodeId | null (if inherited from parent node)
  + CommonFields
```

### Relationship Staleness

- Every relationship carries confirmedAt and status
- Relationships not re-confirmed within threshold → transition to stale
- Stale relationships flagged, not deleted (may indicate coverage gap or decommissioned dependency)
- Threshold configurable per relationship type

---

## 7. Architecture Map (Visual Capability)

### What It Is

An interactive, tier-organised visualisation of the customer's estate with risk overlay.

### Structure

- Nodes = assets (sized by criticality, coloured by risk)
- Edges = relationships (dependency, network, coverage, supply chain)
- Layout = organised by architectural tier (top-to-bottom: perimeter → data)
- Scope = filterable by estate node (one BU, one environment, or whole enterprise)

### Overlays

```
risk               — red/amber/green per node from open risk objects
coverage           — green=covered, red=gap per node from coverage bindings
cases              — badge count per node showing open cases
compliance         — highlight in-scope nodes with adherence status
blast_radius       — click node → lights up everything downstream
attack_path        — show reachable path from perimeter to selected crown jewel
drift              — highlight nodes with active baseline drift
ownership          — colour by team/owner
```

### Relationship to Fusion Map

Architecture Map is a SIBLING to Fusion Map. Same underlying graph engine. Different purpose:
- Fusion Map: investigation-centric (start from case, explore relationships)
- Architecture Map: estate-centric (start from architecture, overlay risk)

---

## 8. Asset Entity Extension

### New Fields on Existing Asset Entity (All Additive, Nullable)

```
Asset (extended):
  + architecturalTier?: ArchitecturalTier
  + lifecycleModel?: LifecycleModel
  + serviceClassification?: ServiceClassification (for managed-service type only)
  + estateNodeId?: string (which organisational unit this belongs to)
```

### Asset Classification Enum Expansion

Existing 9 values → expanded to ~52 values. All existing values remain valid. New values are additive. No breaking change.

### Existing Fields Unchanged

All current Asset fields (id, entityType, tenant, name, classification, owner, environment, sourceRefs, surfaceAttribution, coverage, criticality, tags, source, createdAt, updatedAt, lifecycleState, platform, networkPosition, assetDataClassification, lastConfirmedAt, firstDiscoveredBy, sourceClassification) remain exactly as they are.

---

## 9. Population Strategy

### How Assets Get Classified

| Field | How It's Populated |
|---|---|
| Asset type | Determined at discovery/creation from connector signal or manual input |
| Architectural tier | INFERRED from type (managed-service → cloud_control, server → compute) + manual override |
| Lifecycle model | INFERRED from type (serverless-function → ephemeral_defined, server → persistent) + manual override |
| Service classification | INFERRED from managed service name/metadata (Route53 → dns, KMS → encryption) |
| Estate node | Connector default → cloud-account mapping → tag rules → manual assignment |

### How Relationships Are Populated

| Relationship | Population Method |
|---|---|
| depends_on | Class C connector signal (reads config/IaC), manual declaration, runtime inference (Phase 2+) |
| hosts | Connector discovery (hypervisor signal, cloud API, K8s API) |
| routes_through | Network configuration signal (firewall rules, load balancer config) |
| authenticates_via | IAM/IdP configuration signal |
| stores_data_for | Application configuration signal, manual declaration |
| deployed_by | CI/CD pipeline configuration signal |
| covered_by | Connector pull success = coverage confirmed (automatic) |
| in_scope_for | Manual scoping + estate-node inheritance |
| owned_by | Connector-level default, cloud account tags, manual assignment |
| accessed_by_vendor | Manual declaration, integration configuration signal |
| secures | Configuration signal (cert→domain binding, WAF→endpoint binding) |
| contains | Cloud API hierarchy (account→VPC→subnet→instance) |

---

## 10. Performance Constraints

### Scale

- Large enterprise: 10,000+ assets, 50,000+ relationships
- Architecture map renders SCOPED views (one estate node, one tier) — never full 10,000 nodes
- Queries bounded by scope filter, not total estate size
- Indexes: (tenant_id, estate_node_id, architectural_tier, created_at DESC)

### Storage

- Asset extension: ~100 bytes per asset additional (4 nullable fields)
- EstateNode: ~500 bytes per node (small — typically 10-50 nodes per tenant)
- AssetRelationship: ~200 bytes per relationship × 50,000 = ~10 MB per tenant at scale
- AssetCoverageBinding: ~150 bytes per binding × asset count
- ComplianceScopeBinding: ~150 bytes per binding × scoped asset count

### Workload Class

- Asset queries: operational-read
- Relationship queries (for architecture map): analytics-read (complex graph traversal)
- Blast radius computation: analytics-read
- Coverage matrix: analytics-read
- EstateNode hierarchy: operational-read (small reference data)

### Database Schema

| Entity | DB Schema |
|---|---|
| Asset (extended) | asset (existing) |
| EstateNode | estate (new) |
| AssetRelationship | estate |
| AssetCoverageBinding | estate |
| ComplianceScopeBinding | estate |

---

## 11. Governance

### Conformance Assertions

| Rule ID | Rule |
|---|---|
| ARCH-AAI-001 | Every new asset type must be registered in this authority document before code |
| ARCH-AAI-002 | Asset classification enum bounded at 60 values maximum |
| ARCH-AAI-003 | Relationship types bounded at 15 values maximum |
| ARCH-AAI-004 | Architecture map queries via analytics-read only (no operational hot-path graph traversal) |
| ARCH-AAI-005 | Ephemeral assets modelled at DEFINITION level, never instance level |
| ARCH-AAI-006 | Commander is not a CMDB — only security-relevant architectural context is modelled |

### Future Feature Adoption

Every new entity or connector that produces asset-like data must declare:
- Which asset type(s) it produces or extends
- Which architectural tier those assets belong to
- Which relationships it can populate
- Which estate node assignment rules apply

---

## 12. What Commander Is NOT

- NOT a CMDB (Commander adds security overlay, consumes from CMDBs via Class C connectors)
- NOT an infrastructure monitoring tool (Commander doesn't monitor uptime/performance)
- NOT a telemetry warehouse (ephemeral instance tracking is out of scope)
- NOT an asset management tool (Commander doesn't track procurement, lifecycle cost, or vendor contracts beyond security-relevant access)

Commander adds the SECURITY INTELLIGENCE LAYER over the customer's existing asset knowledge: risk, coverage, compliance, posture, cases, blast radius, and journey measurement.

---

## 13. Impact on Existing Build

### Breaking Changes: ZERO

All changes are additive:
- New asset classification values = enum extension (non-breaking)
- New fields on Asset = nullable (backward-compatible)
- New entities (EstateNode, AssetRelationship, AssetCoverageBinding, ComplianceScopeBinding) = net-new
- Existing fixtures remain valid
- Existing pages continue working unchanged

### Superseding Impact

No existing specs or entities are superseded. All are EXTENDED or ENRICHED. Specifically:
- Existing Asset entity: EXTENDED with new nullable fields
- Existing Asset.classification enum: EXTENDED from 9 to ~52 values
- Existing Coverage entity: ENRICHED by explicit AssetCoverageBinding (precision improvement)
- Existing Topology entity: Architecture Map is a SIBLING view, not a replacement
- Existing ControlMapping: ComplianceScopeBinding is a COMPANION, not a replacement

---

## 14. Build Sequencing

### Foundation Pass

1. Asset classification enum expansion (9 → ~52)
2. New enums: ArchitecturalTier (12), LifecycleModel (3), ServiceClassification (14), RelationshipType (12)
3. Asset entity extension (4 new nullable fields)
4. EstateNode entity (contract + schema + fixture)
5. AssetRelationship entity (contract + schema + fixture)
6. AssetCoverageBinding entity (contract + schema + fixture)
7. ComplianceScopeBinding entity (contract + schema + fixture)
8. Updated asset fixtures (existing assets gain tier/lifecycle classification)
9. DATA_DICTIONARY.md entries for all new entities

### Phase 2

- Architecture Map UI surface
- Dependency population via Class C connectors
- Coverage binding auto-population from connector pull success
- Blast radius resolver upgrade (traversal-based rather than count-based)
- Estate-node-scoped reporting

### Phase 3

- Attack path computation
- Network topology inference from firewall/security-group signal
- Supply chain dependency tracking from CI/CD connectors
- Cross-estate-node impact analysis

---

## 15. Authority and Lineage

This document is the deep authority for Asset Architecture Intelligence. It is referenced by:

- docs/00_authority/JOURNEY_INTELLIGENCE.md (JI-1.0) — Journey Intelligence measures work against architectural components defined here
- Baseline Spec #22 (Architecture Intelligence) — extended by this authority
- Baseline Spec #60 (Attack Surface Framework) — enriched by this authority
- Baseline Spec #69 (Asset Intelligence Surface) — extended by this authority
- Baseline Spec #33 (Multi-Domain Fusion Map) — Architecture Map companion
- Baseline Spec #55 (Baseline Configuration) — scoped per estate node and tier
- docs/00_authority/PERFORMANCE_DOCTRINE.md (workload class discipline)
- docs/00_authority/DATABASE_LAYER_STRATEGY.md (schema placement)

Where any other document conflicts on asset taxonomy, estate topology, architectural classification, or relationship modelling, this document wins.
