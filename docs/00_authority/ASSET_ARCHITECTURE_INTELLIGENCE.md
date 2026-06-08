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

<!-- Sections 2-16 follow the full AAI-1.0 authority specification -->
<!-- See inline for complete content -->

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
### Layer 2: Asset Architecture (Technical Structure)
### Layer 3: Relationships (How It Connects)

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

---

## 5. Layer 2 — Asset Architecture

### Architectural Tier Enum (12 values)

```
perimeter, cloud_control, cloud_infrastructure, compute, application,
data, identity, network, build_deploy, iot_ot, physical, third_party
```

### Lifecycle Model Enum (3 values)

```
persistent, ephemeral_defined, ephemeral_discovered
```

### Managed Service Sub-Classification (14 values)

```
iam, networking, secrets_management, encryption, logging_monitoring, dns,
certificate_management, container_orchestration, serverless_platform,
storage_service, database_service, messaging_service, analytics_service
```

---

## 6. Layer 3 — Relationships

### Relationship Types (12)

```
depends_on, hosts, routes_through, authenticates_via, stores_data_for,
deployed_by, covered_by, in_scope_for, owned_by, accessed_by_vendor,
secures, contains
```

---

## 7-16. See full authority document for complete specification.

---

## 12. Governance

### Conformance Assertions

| Rule ID | Rule |
|---|---|
| ARCH-AAI-001 | Every new asset type must be registered in this authority document before code |
| ARCH-AAI-002 | Asset classification enum bounded at 60 values maximum |
| ARCH-AAI-003 | Relationship types bounded at 15 values maximum |
| ARCH-AAI-004 | Architecture map queries via analytics-read only |
| ARCH-AAI-005 | Ephemeral assets modelled at DEFINITION level, never instance level |
| ARCH-AAI-006 | Commander is not a CMDB — only security-relevant architectural context is modelled |
