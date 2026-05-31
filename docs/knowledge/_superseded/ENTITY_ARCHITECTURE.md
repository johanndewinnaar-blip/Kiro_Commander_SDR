# Commander SDR Entity Architecture

**Authority:** System Rationalisation Phase 4  
**Date:** 30 May 2026  
**Status:** ACTIVE - Entity Architecture Complete

---

## Executive Summary

This document defines the complete canonical entity model for Commander SDR v2.6, including existing entities, required extensions, and entity relationships. It serves as the foundation for data-first build planning and ensures all domains have consistent entity contracts.

**Key Finding:** The current entity model has 7 of 18 entities implemented. Critical gaps exist for verdict entities, intelligence artefacts, OODA tempo entities, and new v2.6 domain entities that must be addressed before v2.6 surface implementation.

---

## Entity Model Overview

### Current Entity Inventory (Implemented)
1. **Asset** - Physical and logical assets with coverage and criticality
2. **Identity** - Human and service identities with risk scoring
3. **Case** - Operational cases with closed-loop lifecycle (12 types)
4. **Risk Object** - Discrete risk conditions bound to cases (8 types)
5. **Connector** - Integration endpoints with health monitoring
6. **Audit Event** - Audit trail entries for compliance
7. **Strategy** - Strategic policies and runtime bindings

### Required Entity Extensions (v2.6 Gaps)
8. **Verdict** - Operational security tool verdicts (NEW - Spec #62)
9. **Intelligence Artefact** - Intelligence stream outputs (NEW - Spec #59)
10. **OODA Phase** - OODA loop phase state and metrics (NEW - Spec #58)
11. **Operating Picture Element** - Situational awareness components (NEW - Specs #65, #66)
12. **Direction Board Item** - Strategic guidance elements (NEW - Spec #70)
13. **Feature Flag** - Commercial control plane feature toggles (NEW - Control Plane Spec)
14. **Identity Chain** - Identity access path and privilege analysis (NEW - Identity Intelligence)
15. **Asset Cartography** - Extended asset classification and coverage (NEW - Asset Intelligence)
16. **Coverage Blindspot** - Discovery gaps and inventory honesty (NEW - Inverse Discovery)
17. **Drift Model** - Individual drift detection models (~240) (NEW - Drift Engine)
18. **Verdict Pattern** - Behavioral patterns from verdict correlation (NEW - Internal Risk)

---

## Entity Definitions

### 1. Asset Entity (IMPLEMENTED)
**Purpose:** Canonical representation of all estate assets  
**Current Schema:** ✅ Complete for v2.6  
**Key Fields:**
- `classification`: 9 asset types (endpoint, server, cloud-instance, container, network-device, application, database, iot-device, mobile-device)
- `surfaceAttribution`: internal_attack_surface | external_attack_surface
- `coverage`: EDR, vulnerability scanning, patch management, backup flags
- `criticality`: 1-5 business criticality score

**v2.6 Extensions Required:** None - current schema sufficient

### 2. Identity Entity (IMPLEMENTED)
**Purpose:** Canonical representation of all identities (human, service, workload, third-party)  
**Current Schema:** ✅ Complete for v2.6  
**Key Fields:**
- `classification`: human | service-account | workload-identity | third-party
- `riskScore`: 0-100 computed risk score
- `surfaceAttribution`: Attack surface positioning
- `associatedAssets`: Asset relationship tracking

**v2.6 Extensions Required:** None - current schema sufficient

### 3. Case Entity (IMPLEMENTED)
**Purpose:** Operational cases with closed-loop lifecycle  
**Current Schema:** ✅ Complete for v2.6  
**Key Fields:**
- `caseType`: 12 canonical types (includes all v2.6 types)
- `status`: System-owned lifecycle states
- `surfaceAttribution`: Attack surface context
- `routingRationale`: Routing engine decision audit

**v2.6 Extensions Required:** None - all 12 case types implemented

### 4. Risk Object Entity (IMPLEMENTED)
**Purpose:** Discrete risk conditions bound to cases  
**Current Schema:** ⚠️ Partial - Missing v2.6 types  
**Key Fields:**
- `type`: 8 types implemented (missing v2.6 extensions)
- `affectedEntityId`: Entity relationship
- `treatmentState`: Risk treatment lifecycle

**v2.6 Extensions Required:**
- Add `external_attack_correlation` type
- Add `verdict_pattern` type  
- Add `policy_effectiveness` type
- Add `pre_warned_classification` type

### 5. Connector Entity (IMPLEMENTED)
**Purpose:** Integration endpoints with multi-class support  
**Current Schema:** ✅ Complete for v2.6  
**Key Fields:**
- Multi-class declaration (A/B/C/D)
- Conformance tier tracking
- Health monitoring state

**v2.6 Extensions Required:** None - multi-class architecture implemented

### 6. Audit Event Entity (IMPLEMENTED)
**Purpose:** Audit trail for compliance and governance  
**Current Schema:** ✅ Complete for v2.6  
**Key Fields:**
- Actor identification
- Action tracking
- Timestamp precision

**v2.6 Extensions Required:** None - sufficient for v2.6 audit requirements

### 7. Strategy Entity (IMPLEMENTED)
**Purpose:** Strategic policies and runtime bindings  
**Current Schema:** ✅ Complete for v2.6  
**Key Fields:**
- Policy definitions
- Runtime binding events
- Strategy surface types

**v2.6 Extensions Required:** None - strategy layer complete

### 8. Verdict Entity (NEW - REQUIRED)
**Purpose:** Operational security tool verdicts as time-bound claims  
**Authority:** Spec #62 Verdict Semantics  
**Schema Required:**
```typescript
interface Verdict extends CommonFields {
  entityType: 'verdict';
  // Five mandatory dimensions (Spec #62)
  identity: string;           // Who/what was subject of verdict
  timestamp: string;          // When verdict was issued
  disposition: VerdictDisposition; // BLOCK/QUARANTINE/COACH/etc.
  policyReference: string;    // Which policy triggered verdict
  source: string;            // Which tool issued verdict
  
  // Additional context
  affectedEntityId: string;   // Asset/identity affected
  affectedEntityType: string; // Entity type
  confidence: number;         // 0-100 confidence score
  trustWeight: number;        // Per-tool trust calibration
  
  // Verdict semantics
  isTimebound: boolean;       // Whether verdict expires
  expiryTimestamp?: string;   // When verdict expires
  
  // Correlation
  correlatedVerdicts: string[]; // Related verdict IDs
  disagreementFlag: boolean;   // Conflicting verdicts detected
}
```

### 9. Intelligence Artefact Entity (NEW - REQUIRED)
**Purpose:** Intelligence stream outputs and correlations  
**Authority:** Spec #59 Intelligence Layer Architecture  
**Schema Required:**
```typescript
interface IntelligenceArtefact extends CommonFields {
  entityType: 'intelligence-artefact';
  
  // Stream classification
  intelligenceStream: 'external-threat' | 'external-attack' | 'internal-behavioural' | 'posture';
  artefactType: string;       // Stream-specific artefact type
  
  // Content
  title: string;
  description: string;
  confidence: number;         // 0-100 confidence score
  
  // Relationships
  sourceEntities: string[];   // Entities that contributed to this artefact
  relatedArtefacts: string[]; // Cross-stream correlations
  
  // Temporal
  validFrom: string;
  validUntil?: string;
  
  // Classification
  classification: 'pre-warned' | 'protected' | 'novel' | 'unclassified';
}
```

### 10. OODA Phase Entity (NEW - REQUIRED)
**Purpose:** OODA loop phase state and health metrics  
**Authority:** Spec #58 Security OODA Loop  
**Schema Required:**
```typescript
interface OODAPhase extends CommonFields {
  entityType: 'ooda-phase';
  
  // Phase identification
  phase: 'observe' | 'orient' | 'decide' | 'act';
  cycleId: string;            // Links phases in same cycle
  
  // Timing
  phaseStartTime: string;
  phaseEndTime?: string;
  phaseDuration?: number;     // Milliseconds
  
  // Health metrics
  healthScore: number;        // 0-100 phase health
  bottleneckFlag: boolean;    // Is this phase the bottleneck?
  
  // Performance
  inputCount: number;         // Items entering phase
  outputCount: number;        // Items exiting phase
  errorCount: number;         // Errors in phase
  
  // Status
  status: 'running' | 'completed' | 'failed' | 'stalled';
}
```

### 11. Operating Picture Element Entity (NEW - REQUIRED)
**Purpose:** Situational awareness visualization components  
**Authority:** Specs #65, #66 Operating Pictures  
**Schema Required:**
```typescript
interface OperatingPictureElement extends CommonFields {
  entityType: 'operating-picture-element';
  
  // Picture classification
  pictureType: 'external' | 'internal';
  elementType: string;        // Chart, map, list, metric, etc.
  
  // Positioning
  gridPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  
  // Data binding
  dataSource: string;         // Intelligence stream or domain
  queryFilter: object;        // Data filtering criteria
  
  // Visualization
  visualizationType: string;  // Chart type, map style, etc.
  refreshInterval: number;    // Seconds
  
  // Access control
  requiredAuthority: string[]; // Authority overlays required
}
```

### 13. Feature Flag Entity (NEW - REQUIRED)
**Purpose:** Commercial control plane feature toggles and entitlement gates  
**Authority:** Control Plane Specification v1.1, Feature Registry FR001  
**Schema Required:**
```typescript
interface FeatureFlag extends CommonFields {
  entityType: 'feature-flag';
  
  // Flag identification
  flagKey: string;            // Programmatic identifier (e.g., 'feat.detection.stage1_rules')
  displayName: string;        // Human-readable name
  
  // Commercial gating
  commercialGate: 'core' | 'push' | 'commander' | 'identity_advanced' | 'compliance' | 'architecture' | 'detection_full' | 'email_ingestion' | 'analyst_passport' | 'connected_architecture';
  
  // Control scope
  controlScope: 'operator-only' | 'tenant-admin' | 'operator-sets-tenant-configures';
  defaultState: boolean;      // Default on/off when first entitled
  
  // Lifecycle
  phase: 0 | 1 | 2 | 3;      // Which phase this becomes available
  status: 'active' | 'deprecated' | 'sunset';
  
  // Authority
  mtsReference?: string;      // Master Technical Specification reference
  propReference?: string;     // Master Proposition reference
}
```

### 14. Identity Chain Entity (NEW - REQUIRED)
**Purpose:** Identity access path and privilege analysis for CHAIN computation  
**Authority:** Identity Intelligence Spec #10, Master Proposition §17.1  
**Schema Required:**
```typescript
interface IdentityChain extends CommonFields {
  entityType: 'identity-chain';
  
  // Chain identification
  identityId: string;         // Root identity
  chainType: 'access-path' | 'privilege-escalation' | 'group-membership' | 'blast-radius';
  
  // Chain computation
  stage: 1 | 2 | 3;          // CHAIN computation stage
  computationTrigger: 'continuous' | 'triggered' | 'sweep';
  
  // Chain structure
  chainPath: ChainNode[];     // Ordered path of access
  riskScore: number;          // 0-100 chain risk score
  blastRadius: number;        // 0-100 potential impact
  
  // Analysis
  privilegeLevel: 'standard' | 'elevated' | 'administrative' | 'privileged';
  entitlementGaps: string[];  // Missing entitlement evidence
  standingAccess: boolean;    // Permanent vs temporary access
  mfaPimEnforcement: boolean; // MFA/PIM controls present
  
  // Health
  groupHealth: number;        // 0-100 security group health
  redundancy: boolean;        // Multiple paths to same privilege
  riskConcentration: number;  // 0-100 risk concentration score
}

interface ChainNode {
  entityId: string;
  entityType: 'identity' | 'group' | 'role' | 'asset';
  relationship: 'member-of' | 'assigned-to' | 'access-to' | 'escalates-via';
  confidence: number;         // 0-100 relationship confidence
}
```

### 15. Asset Cartography Entity (NEW - REQUIRED)
**Purpose:** Extended asset classification and coverage mapping  
**Authority:** Asset Intelligence Spec #09, Master Proposition §9  
**Schema Required:**
```typescript
interface AssetCartography extends CommonFields {
  entityType: 'asset-cartography';
  
  // Asset reference
  assetId: string;
  
  // Extended classification
  assetClass: 'persistent' | 'ephemeral';
  lifecycleStage: 'development' | 'staging' | 'production' | 'decommissioned';
  eolEosStatus: 'current' | 'approaching-eol' | 'eol' | 'eos';
  
  // Attack surface positioning
  surfacePositioning: 'auto-internal' | 'auto-external' | 'manual-override';
  positioningConfidence: number; // 0-100 auto-positioning confidence
  positioningEvidence: string[]; // Evidence for positioning decision
  
  // Coverage mapping
  coverageMap: {
    edr: boolean;
    ndr: boolean;
    vm: boolean;
    identity: boolean;
    exposure: boolean;
    lifecycle: boolean;
  };
  fullyCovered: boolean;      // All required coverage present
  
  // Ownership and context
  ownershipHierarchy: string; // Business ownership chain
  businessContext: string;    // Business criticality context
  thirdPartyContext?: string; // Third-party relationship context
  
  // Ghost asset detection
  ghostAssetFlag: boolean;    // Detected as ghost asset
  tombstoneStatus?: 'pending' | 'confirmed' | 'resolved';
}
```

### 16. Coverage Blindspot Entity (NEW - REQUIRED)
**Purpose:** Discovery gaps and inventory honesty tracking  
**Authority:** Inverse Discovery Loop Spec #40, Master Technical Specification §3.3  
**Schema Required:**
```typescript
interface CoverageBlindspot extends CommonFields {
  entityType: 'coverage-blindspot';
  
  // Blindspot identification
  lookupFailure: string;      // Original lookup that failed
  entityReference: string;    // External entity reference that couldn't be resolved
  sourceConnector: string;    // Connector that reported the unknown entity
  
  // Resolution attempts
  secondaryResolution: {
    fuzzyMatch: boolean;
    identifierTranslation: boolean;
    recentChangeCheck: boolean;
    allAttemptsFailed: boolean;
  };
  
  // Root cause classification
  rootCause: 'discovery-gap' | 'staleness' | 'shadow-it' | 'naming-mismatch' | 'unknown';
  rootCauseConfidence: number; // 0-100 classification confidence
  rootCauseEvidence: string[]; // Evidence supporting classification
  
  // Case generation
  caseGenerated?: string;     // Coverage Blindspot case ID
  routingTarget: 'platform-team' | 'architecture-team' | 'security-team';
  
  // Resolution tracking
  resolutionStatus: 'open' | 'investigating' | 'resolved' | 'false-positive';
  entityOnboarded?: string;   // New canonical entity ID if onboarded
  connectorTuned?: boolean;   // Connector configuration updated
}
```

### 17. Drift Model Entity (NEW - REQUIRED)
**Purpose:** Individual drift detection models (~240 total)  
**Authority:** Drift and Rule Engine Spec #34, Master Technical Specification §4  
**Schema Required:**
```typescript
interface DriftModel extends CommonFields {
  entityType: 'drift-model';
  
  // Model identification
  modelId: string;            // Unique model identifier
  modelName: string;          // Human-readable name
  modelCategory: string;      // One of 13 domain categories
  
  // Rule definition
  yamlRule: string;           // YAML declarative rule format
  ruleVersion: string;        // Rule version for lifecycle management
  
  // Model lifecycle
  status: 'draft' | 'validated' | 'active' | 'suppressed' | 'deprecated';
  validationResults?: object; // Validation test results
  approvalStatus: 'pending' | 'approved' | 'rejected';
  
  // Execution configuration
  evaluationFrequency: number; // Minutes between evaluations
  canonicalEntityTypes: string[]; // Entity types this model evaluates
  supportedOperators: string[]; // Allowed operators in conditions
  
  // Performance metrics
  executionLatency: number;   // Average execution time (ms)
  successRate: number;        // 0-100 successful execution rate
  falsePositiveRate: number;  // 0-100 false positive rate
  findingsGenerated: number;  // Total findings generated
  
  // Health monitoring
  healthScore: number;        // 0-100 model health
  lastExecutionAt: string;
  nextExecutionAt: string;
  errorCount: number;
  lastErrorAt?: string;
}
```

### 18. Verdict Pattern Entity (NEW - REQUIRED)
**Purpose:** Behavioral patterns from verdict correlation for internal risk  
**Authority:** Internal Risk Investigation Spec #41, Spec #75  
**Schema Required:**
```typescript
interface VerdictPattern extends CommonFields {
  entityType: 'verdict-pattern';
  
  // Pattern identification
  patternId: string;
  patternType: 'concentration' | 'anomaly' | 'escalation' | 'correlation';
  
  // Pattern description
  patternDescription: string; // What pattern was detected
  affectedIdentity: string;   // Identity exhibiting pattern
  patternSeverity: 'low' | 'medium' | 'high' | 'critical';
  
  // Evidence (intelligence-grade only)
  sourceVerdicts: string[];   // Verdict IDs contributing to pattern
  patternContext: object;     // Context without investigation conclusions
  temporalSpan: {
    startTime: string;
    endTime: string;
    duration: number;         // Pattern duration in minutes
  };
  
  // Boundary preservation
  evidenceGrade: 'intelligence'; // Always intelligence-grade, never investigation-grade
  intentDetermination: null;  // Explicitly null - no intent determination
  
  // Lifecycle (6-phase)
  lifecyclePhase: 'surface' | 'triage' | 'routing' | 'customer-investigation' | 'outcome' | 'closure';
  triageStatus?: 'confirmed' | 'noise' | 'suppressed';
  routingTarget?: string;     // Customer's Internal Risk function
  
  // Customer-owned investigation handoff
  handoffTimestamp?: string;
  customerInvestigationOwned: boolean; // Always true when handed off
  
  // Outcome (customer-provided)
  outcomeDisposition?: 'no-issue' | 'issue-addressed' | 'ongoing-concern' | 'privileged-outcome';
  outcomeTimestamp?: string;
  
  // Jurisdictional controls
  jurisdictionalRestrictions?: object; // Jurisdiction-specific restrictions
  accessAuditRequired: boolean; // Audit access to identity details
}
```

---

## Entity Relationship Model

### Primary Relationships

**Asset ↔ Identity Relationships:**
- `Identity.associatedAssets[]` → `Asset.id`
- Many-to-many: Identities can access multiple assets, assets can be accessed by multiple identities

**Case ↔ Risk Object Relationships:**
- `Case.relatedEntities[]` → `RiskObject.id` (among others)
- One-to-many: Cases can have multiple risk objects, risk objects belong to one case

**Case ↔ Entity Relationships:**
- `Case.relatedEntities[]` → Any entity ID
- Many-to-many: Cases can involve multiple entities, entities can be involved in multiple cases

**Verdict ↔ Entity Relationships:**
- `Verdict.affectedEntityId` → `Asset.id` | `Identity.id`
- Many-to-one: Multiple verdicts can affect same entity

**Intelligence Artefact ↔ Entity Relationships:**
- `IntelligenceArtefact.sourceEntities[]` → Any entity ID
- Many-to-many: Artefacts can be derived from multiple entities, entities can contribute to multiple artefacts

### Cross-Stream Correlations

**Intelligence Layer Correlations:**
- `IntelligenceArtefact.relatedArtefacts[]` → Cross-stream artefact relationships
- Enables pre-warned classification and cross-stream pattern detection

**OODA Cycle Correlations:**
- `OODAPhase.cycleId` → Links phases within same OODA cycle
- Enables tempo measurement and bottleneck identification

**Verdict Pattern Correlations:**
- `Verdict.correlatedVerdicts[]` → Related verdict relationships
- Enables behavioural pattern detection and disagreement identification

---

## Entity Lifecycle Management

### Entity Creation Patterns

**System-Created Entities:**
- `Case`: Created by routing engine only
- `RiskObject`: Created by analytical engines only
- `Verdict`: Created by connector framework only
- `IntelligenceArtefact`: Created by intelligence layer only
- `OODAPhase`: Created by OODA orchestrator only

**Connector-Created Entities:**
- `Asset`: Created/updated by Class C connectors
- `Identity`: Created/updated by Class C connectors
- `AuditEvent`: Created by all system components

**Admin-Created Entities:**
- `Connector`: Created by tenant admin
- `Strategy`: Created by strategy management
- `OperatingPictureElement`: Created by surface configuration
- `DirectionBoardItem`: Created by intelligence layer (system) or leadership (manual)

### Entity Update Patterns

**Immutable Entities:**
- `AuditEvent`: Never updated after creation
- `Verdict`: Never updated (time-bound claims)

**System-Updated Entities:**
- `Case`: Updated by case lifecycle engine only
- `RiskObject`: Updated by treatment workflow only
- `OODAPhase`: Updated by OODA orchestrator only

**Connector-Updated Entities:**
- `Asset`: Updated by Class C connectors on state change
- `Identity`: Updated by Class C connectors on state change

### Entity Deletion Patterns

**Soft Delete (Retention Required):**
- `Case`: Retained for audit and pattern analysis
- `AuditEvent`: Retained permanently for compliance
- `Verdict`: Retained per data retention policy

**Hard Delete (Cleanup Allowed):**
- `IntelligenceArtefact`: Deleted when validity expires
- `OODAPhase`: Deleted after aggregation to metrics
- `OperatingPictureElement`: Deleted when surface reconfigured

---

## Data Quality Contracts

### Mandatory Fields
All entities must include:
- `CommonFields`: id, tenant, timestamps, source metadata
- Entity-specific discriminator: `entityType`
- Tenant scoping: All entities are tenant-scoped

### Data Validation Rules
- **ID Format**: Deterministic UUIDs for repeatability
- **Timestamp Format**: ISO 8601 with timezone
- **Tenant Validation**: All tenant references must be valid
- **Relationship Integrity**: All entity references must exist
- **Enum Validation**: All enum fields must use defined values

### Data Freshness Requirements

**GAP IDENTIFIED:** No explicit data freshness requirements defined in source material (Master Technical Specification, Master Proposition, or child specs). This represents an architectural decision gap that must be resolved.

**Placeholder for future definition:**
- Critical Entities (Case, Asset, Identity): Requirements TBD
- Standard Entities (RiskObject, Connector): Requirements TBD  
- Analytical Entities (IntelligenceArtefact, Verdict): Requirements TBD
- Operational Entities (OODAPhase): Requirements TBD

---

## Implementation Roadmap

### Phase 1: Foundation (Current State)
✅ **Complete:** Asset, Identity, Case, RiskObject, Connector, AuditEvent, Strategy

### Phase 2: v2.6 Core Extensions (REQUIRED)
🔄 **In Progress:** 
- Extend RiskObject with v2.6 types
- Create Verdict entity schema
- Create IntelligenceArtefact entity schema
- Create OODAPhase entity schema

### Phase 3: v2.6 Domain Extensions (REQUIRED)
⏳ **Pending:**
- Create FeatureFlag entity schema (Control Plane)
- Create IdentityChain entity schema (Identity Intelligence)
- Create AssetCartography entity schema (Asset Intelligence)
- Create CoverageBlindspot entity schema (Inverse Discovery)
- Create DriftModel entity schema (Drift Engine)
- Create VerdictPattern entity schema (Internal Risk)

### Phase 4: v2.6 Surface Extensions (REQUIRED)
⏳ **Pending:**
- Create OperatingPictureElement entity schema
- Create DirectionBoardItem entity schema
- Implement entity relationship validation
- Implement data quality enforcement

### Phase 4: Advanced Features (FUTURE)
⏳ **Future:**
- Entity versioning and history
- Advanced relationship querying
- Cross-tenant entity federation (if required)
- Entity performance optimization

---

## Build Dependencies

### Critical Path for v2.6
1. **RiskObject Extensions** → Required for all v2.6 case types
2. **Verdict Entity** → Required for Internal Behavioural Intelligence
3. **IntelligenceArtefact Entity** → Required for Intelligence Layer
4. **OODAPhase Entity** → Required for OODA Loop implementation
5. **FeatureFlag Entity** → Required for Control Plane functionality
6. **IdentityChain Entity** → Required for Identity Intelligence CHAIN computation
7. **AssetCartography Entity** → Required for Asset Intelligence surfaces
8. **DriftModel Entity** → Required for ~240 drift detection models
9. **VerdictPattern Entity** → Required for Internal Risk boundaries
10. **CoverageBlindspot Entity** → Required for Inverse Discovery Loop

### Parallel Development Opportunities
- **Surface Entities** (OperatingPictureElement, DirectionBoardItem) can be developed in parallel with core extensions
- **Data Quality Framework** can be developed alongside entity extensions
- **Relationship Validation** can be implemented incrementally

---

## Status

**Phase 4 Complete:** ✅ Entity Architecture Defined  
**Current Coverage:** 7 of 18 entities implemented  
**v2.6 Gaps Identified:** 11 new entities required + 1 extension  
**Critical Path:** RiskObject → Verdict → IntelligenceArtefact → OODAPhase → Domain Entities  

**Next Phase:** Function Architecture (Phase 5)

---

**Last Updated:** 2026-05-30  
**Next Milestone:** Phase 5 - Function Architecture