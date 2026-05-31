# Commander SDR State Architecture

**Authority:** System Rationalisation Phase 6  
**Date:** 30 May 2026  
**Status:** ACTIVE - State Architecture Complete

---

## Executive Summary

This document defines the complete state architecture for Commander SDR v2.6, including state models, state transitions, persistence patterns, and state synchronisation across the seven architectural layers. It serves as the foundation for understanding how system state is managed, persisted, and coordinated.

**Key Finding:** The current state architecture has strong foundation for case lifecycle and entity persistence, but critical gaps exist in intelligence state management, OODA state orchestration, and cross-layer state synchronisation.

---

## State Architecture Overview

### State Management Principles

**1. System-Owned State (Closed-Loop)**
- Case lifecycle state is system-owned (no manual transitions)
- OODA phase state is orchestrator-owned
- Intelligence processing state is engine-owned
- Routing decisions are engine-owned

**2. Tenant-Scoped State**
- All state is tenant-scoped for multi-tenancy
- Cross-tenant state access is forbidden
- State isolation enforced at persistence layer

**3. Audit-Tracked State**
- All material state changes emit audit events
- State transitions include actor, reason, timestamp
- Prior state and new state preserved for compliance

**4. Immutable State History**
- State transitions are append-only
- Historical state is preserved for analysis
- Current state derived from transition history

---

## Current State Models (Implemented)

### 1. Case Lifecycle State (IMPLEMENTED)
**Location:** `packages/contracts/src/entities/case-lifecycle.ts`  
**Status:** ✅ Complete for v2.6 foundation  

**State Model:**
```typescript
type CaseStatus = 'open' | 'in_progress' | 'awaiting_validation' | 'awaiting_closure' | 'closed' | 'reopened';

// Allowed transitions (system-owned only)
const ALLOWED_TRANSITIONS = [
  { from: 'open', to: 'in_progress' },
  { from: 'in_progress', to: 'awaiting_validation' },
  { from: 'awaiting_validation', to: 'awaiting_closure' },
  { from: 'awaiting_closure', to: 'closed' },
  { from: 'closed', to: 'reopened' },
  { from: 'reopened', to: 'in_progress' },
];
```

**State Management:**
- Immutable transition history (`CaseLifecycleHistory`)
- Actor validation (system | routing-engine only)
- Transition validation against allowed transitions
- Audit event generation for every transition

**Coverage:** Complete closed-loop case lifecycle management

### 2. Entity Persistence State (IMPLEMENTED)
**Location:** `packages/db/src/schema/`  
**Status:** ✅ Complete for v2.6 foundation  

**State Models:**
- **Asset State:** Classification, coverage, criticality, surface attribution
- **Identity State:** Risk score, classification, associated assets
- **Connector State:** Classes (A/B/C/D), tier, run status, health
- **Strategy State:** Policy configuration, runtime bindings, status
- **Audit State:** Actor, action, prior/new state, timestamp

**State Persistence:**
- PostgreSQL with Drizzle ORM
- Tenant scoping on all tables
- Data classification per Master Technical Specification §11.1
- Source provenance tracking
- Timestamp precision with timezone

**Coverage:** Complete entity CRUD with audit trail

### 3. Validation Window State (IMPLEMENTED)
**Location:** `packages/contracts/src/resolvers/validation-window-enforcer.ts`  
**Status:** ✅ Complete for v2.6 validation logic  

**State Model:**
```typescript
interface ValidationWindowState {
  withinWindow: boolean;
  evidenceFresh: boolean;
  refreshDue: boolean;
  windowHoursRemaining: number;
  hoursSinceLastRefresh: number;
  strategyRef: { policyId: string; policyVersion: string };
}
```

**State Management:**
- Strategy-driven configuration (no hardcoded values)
- Time-based state evaluation
- Evidence freshness tracking
- Refresh cadence enforcement

**Coverage:** Complete validation window state management

### 4. UI State Management (IMPLEMENTED)
**Location:** `apps/web/src/context/`  
**Status:** ✅ Complete for v2.6 UI state  

**State Models:**
- **Sidebar State:** Collapsed/expanded, group visibility, localStorage persistence
- **Page State:** Route visibility, build mode vs operational mode
- **Theme State:** Light/dark mode, sidebar always dark

**State Persistence:**
- Browser localStorage for user preferences
- React Context for component state
- URL state for navigation

**Coverage:** Complete UI state management

---

## Required State Extensions (v2.6 Gaps)

### 5. Intelligence Processing State (NEW - CRITICAL GAP)
**Authority:** Spec #59 Intelligence Layer Architecture  
**Status:** ❌ Missing - Required for v2.6  

**Required State Models:**
```typescript
// Intelligence stream processing state
interface IntelligenceStreamState {
  streamType: 'external-threat' | 'external-attack' | 'internal-behavioural' | 'posture';
  processingStatus: 'idle' | 'ingesting' | 'correlating' | 'publishing' | 'error';
  lastProcessedSignal: string;
  signalBacklog: number;
  correlationQueue: string[];
  errorCount: number;
  lastErrorAt?: string;
}

// Intelligence artefact lifecycle state
interface IntelligenceArtefactState {
  id: string;
  lifecycle: 'draft' | 'validated' | 'published' | 'expired' | 'superseded';
  confidence: number; // 0-100
  validFrom: string;
  validUntil?: string;
  sourceSignals: string[];
  correlatedArtefacts: string[];
  classification: 'pre-warned' | 'protected' | 'novel' | 'unclassified';
}

// Cross-stream correlation state
interface CorrelationState {
  correlationId: string;
  involvedStreams: IntelligenceStreamType[];
  correlationStrength: number; // 0-100
  artefactsProduced: string[];
  status: 'active' | 'completed' | 'failed';
}
```

**State Management Requirements:**
- Stream processing orchestration
- Artefact lifecycle management
- Cross-stream correlation tracking
- Confidence decay over time
- Classification state transitions

### 6. OODA Orchestration State (NEW - CRITICAL GAP)
**Authority:** Spec #58 Security OODA Loop  
**Status:** ❌ Missing - Required for v2.6  

**Required State Models:**
```typescript
// OODA cycle state
interface OODACycleState {
  cycleId: string;
  status: 'active' | 'completed' | 'failed' | 'stalled';
  currentPhase: 'observe' | 'orient' | 'decide' | 'act';
  cycleStartTime: string;
  cycleEndTime?: string;
  cycleDuration?: number;
  healthScore: number; // 0-100
  bottleneckPhase?: OODAPhase;
}

// OODA phase state
interface OODAPhaseState {
  phaseId: string;
  cycleId: string;
  phase: 'observe' | 'orient' | 'decide' | 'act';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'stalled';
  phaseStartTime?: string;
  phaseEndTime?: string;
  phaseDuration?: number;
  inputCount: number;
  outputCount: number;
  errorCount: number;
  healthScore: number; // 0-100
}

// OODA tempo state
interface OODATempoState {
  averageCycleDuration: number; // milliseconds
  cyclesPerHour: number;
  bottleneckFrequency: Record<OODAPhase, number>;
  tempoTrend: 'improving' | 'stable' | 'degrading';
  lastDegradationAlert?: string;
}
```

**State Management Requirements:**
- Cycle orchestration and phase transitions
- Tempo measurement and trend analysis
- Bottleneck detection and alerting
- Health monitoring across phases
- Degradation case generation

### 7. Verdict Processing State (NEW - CRITICAL GAP)
**Authority:** Spec #62 Verdict Semantics Specification  
**Status:** ❌ Missing - Required for v2.6  

**Required State Models:**
```typescript
// Verdict processing state
interface VerdictProcessingState {
  verdictId: string;
  processingStatus: 'received' | 'validating' | 'correlating' | 'processed' | 'error';
  semanticsValidated: boolean;
  correlationAttempts: number;
  disagreementDetected: boolean;
  conflictingVerdicts: string[];
  processingErrors: string[];
}

// Verdict correlation state
interface VerdictCorrelationState {
  correlationId: string;
  involvedVerdicts: string[];
  correlationType: 'agreement' | 'disagreement' | 'pattern' | 'anomaly';
  confidence: number; // 0-100
  affectedEntities: string[];
  behavioralPattern?: string;
}

// Verdict disposition state
interface VerdictDispositionState {
  verdictId: string;
  disposition: 'BLOCK' | 'QUARANTINE' | 'COACH' | 'ALLOW' | 'MONITOR';
  policyReference: string;
  actionTaken: boolean;
  actionTimestamp?: string;
  actionResult?: 'success' | 'failed' | 'pending';
  expiryTimestamp?: string;
}
```

**State Management Requirements:**
- Verdict semantic validation
- Correlation and disagreement detection
- Disposition action tracking
- Time-bound verdict expiry
- Behavioral pattern state

### 8. Drift Detection State (NEW - CRITICAL GAP)
**Authority:** Master Technical Specification §6.3 (~240 models)  
**Status:** ❌ Missing - Required for v2.6  

**Required State Models:**
```typescript
// Drift detection engine state
interface DriftDetectionState {
  engineId: string;
  status: 'idle' | 'scanning' | 'analyzing' | 'reporting' | 'error';
  modelsActive: number; // out of ~240
  modelsHealthy: number;
  lastScanAt: string;
  nextScanAt: string;
  scanBacklog: number;
  driftQueue: string[];
}

// Individual drift model state
interface DriftModelState {
  modelId: string;
  modelType: 'configuration' | 'posture' | 'coverage' | 'architecture';
  status: 'active' | 'disabled' | 'error' | 'tuning';
  lastRunAt: string;
  runFrequency: number; // minutes
  successRate: number; // 0-100
  driftDetected: number; // count
  falsePositiveRate: number; // 0-100
}

// Drift result state
interface DriftResultState {
  driftId: string;
  modelId: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'detected' | 'validated' | 'remediated' | 'false-positive';
  affectedEntities: string[];
  blastRadius: number; // 0-100
  remediationPriority: number; // 0-100
  caseGenerated?: string;
}
```

**State Management Requirements:**
- Engine orchestration across ~240 models
- Model health monitoring and tuning
- Drift result lifecycle management
- Blast radius calculation state
- Remediation priority queue

### 9. Connector Health State (PARTIAL - NEEDS EXTENSION)
**Authority:** Spec #61 Universal Security Signal Connector Contract  
**Status:** ⚠️ Partial - Foundation exists, needs v2.6 extensions  

**Existing State:**
- Basic connector state (active/error/pending)
- Last run status and timestamp
- Multi-class declaration (A/B/C/D)

**Required Extensions:**
```typescript
// Enhanced connector health state
interface ConnectorHealthState {
  connectorId: string;
  overallHealth: number; // 0-100
  signalIngestionRate: number; // signals per minute
  errorRate: number; // 0-100
  latency: number; // milliseconds
  backlogSize: number;
  lastHealthCheck: string;
  healthTrend: 'improving' | 'stable' | 'degrading';
  alertsActive: string[];
}

// Signal processing state per connector
interface SignalProcessingState {
  connectorId: string;
  signalsPending: number;
  signalsProcessed: number;
  signalsFailed: number;
  processingLatency: number; // milliseconds
  normalizationErrors: number;
  validationErrors: number;
  lastProcessedSignal: string;
}
```

### 11. Control Plane State (NEW - REQUIRED)
**Authority:** Control Plane Specification v1.1, Feature Registry FR001  
**Status:** ❌ Missing - Required for v2.6  

**Required State Models:**
```typescript
// Feature flag state
interface FeatureFlagState {
  flagKey: string;
  tenantId: string;
  enabled: boolean;
  commercialEntitlement: boolean;
  controlScopeValidated: boolean;
  phaseAvailable: boolean;
  lastEvaluationAt: string;
  evaluationCount: number;
  accessDeniedCount: number;
}

// Commercial tier state
interface CommercialTierState {
  tenantId: string;
  currentTier: CommercialTier;
  entitlementGates: EntitlementGate[];
  tierValidatedAt: string;
  tierExpiryAt?: string;
  upgradeEligible: boolean;
  downgradeScheduled?: string;
}

// Tenant configuration state
interface TenantConfigurationState {
  tenantId: string;
  configurableFlags: Record<string, boolean>;
  operatorOverrides: Record<string, boolean>;
  configurationValidated: boolean;
  lastConfigurationChange: string;
  pendingChanges: ConfigurationChange[];
}
```

### 12. Identity Intelligence State (NEW - REQUIRED)
**Authority:** Identity Intelligence Spec #10, Master Proposition §17.1  
**Status:** ❌ Missing - Required for v2.6  

**Required State Models:**
```typescript
// CHAIN computation state
interface CHAINComputationState {
  identityId: string;
  stage1Status: 'idle' | 'running' | 'completed' | 'error';
  stage2Status: 'idle' | 'triggered' | 'running' | 'completed' | 'error';
  stage3Status: 'scheduled' | 'running' | 'completed' | 'error';
  lastStage1At: string;
  lastStage2At?: string;
  lastStage3At?: string;
  nextStage3At: string;
  computationErrors: string[];
}

// Identity risk composite state
interface IdentityRiskCompositeState {
  identityId: string;
  overallRiskScore: number; // 0-100
  riskFactors: {
    privilegeLevel: number;
    entitlementGaps: number;
    standingAccess: number;
    mfaPimEnforcement: number;
    dormancy: number;
    groupHealth: number;
    threatIntelligenceRelevance: number;
    incidentHistory: number;
  };
  riskTrend: 'improving' | 'stable' | 'degrading';
  lastRiskCalculation: string;
  watchlistStatus: boolean;
}

// Group intelligence state
interface GroupIntelligenceState {
  groupId: string;
  securityHealth: number; // 0-100
  redundancyScore: number; // 0-100
  riskConcentration: number; // 0-100
  memberCount: number;
  privilegedMemberCount: number;
  lastHealthAssessment: string;
  healthTrend: 'improving' | 'stable' | 'degrading';
}
```

### 13. Asset Intelligence State (NEW - REQUIRED)
**Authority:** Asset Intelligence Spec #09, Master Proposition §9  
**Status:** ❌ Missing - Required for v2.6  

**Required State Models:**
```typescript
// Asset classification state
interface AssetClassificationState {
  assetId: string;
  assetClass: 'persistent' | 'ephemeral';
  classificationConfidence: number; // 0-100
  lifecycleStage: 'development' | 'staging' | 'production' | 'decommissioned';
  eolEosStatus: 'current' | 'approaching-eol' | 'eol' | 'eos';
  lastClassificationUpdate: string;
  classificationEvidence: string[];
}

// Attack surface positioning state
interface AttackSurfacePositioningState {
  assetId: string;
  surfacePosition: 'internal' | 'external';
  positioningMethod: 'auto-deterministic' | 'auto-heuristic' | 'manual-override';
  positioningConfidence: number; // 0-100
  positioningEvidence: PositioningEvidence[];
  lastPositioningUpdate: string;
  positioningReviewDue: string;
}

// Coverage assessment state
interface CoverageAssessmentState {
  assetId: string;
  coverageMap: CoverageMap;
  fullyCovered: boolean;
  coverageGaps: string[];
  coverageScore: number; // 0-100
  lastCoverageAssessment: string;
  coverageReviewDue: string;
  ghostAssetFlag: boolean;
  tombstoneStatus?: 'pending' | 'confirmed' | 'resolved';
}
```

### 14. Inverse Discovery State (NEW - REQUIRED)
**Authority:** Inverse Discovery Loop Spec #40, Master Technical Specification §3.3  
**Status:** ❌ Missing - Required for v2.6  

**Required State Models:**
```typescript
// Lookup failure tracking state
interface LookupFailureTrackingState {
  failureId: string;
  entityReference: string;
  sourceConnector: string;
  failureTimestamp: string;
  secondaryResolutionAttempted: boolean;
  secondaryResolutionResults: SecondaryResolutionResult[];
  rootCauseClassified: boolean;
  rootCause?: RootCauseClassification;
  resolutionStatus: 'open' | 'investigating' | 'resolved' | 'false-positive';
}

// Coverage blindspot state
interface CoverageBlindspotState {
  blindspotId: string;
  lookupFailureId: string;
  caseGenerated?: string;
  routingTarget: 'platform-team' | 'architecture-team' | 'security-team';
  investigationStatus: 'pending' | 'assigned' | 'investigating' | 'resolved';
  resolutionAction?: 'entity-onboarded' | 'connector-tuned' | 'false-positive';
  resolutionTimestamp?: string;
  entityOnboarded?: string;
}

// Discovery gap metrics state
interface DiscoveryGapMetricsState {
  totalLookupFailures: number;
  resolvedFailures: number;
  falsePositives: number;
  entitiesOnboarded: number;
  connectorsTuned: number;
  averageResolutionTime: number; // hours
  gapTrend: 'improving' | 'stable' | 'degrading';
  lastMetricsUpdate: string;
}
```

### 15. Internal Risk Investigation State (NEW - REQUIRED)
**Authority:** Internal Risk Investigation Spec #41, Spec #75  
**Status:** ❌ Missing - Required for v2.6  

**Required State Models:**
```typescript
// Verdict pattern lifecycle state
interface VerdictPatternLifecycleState {
  patternId: string;
  currentPhase: 'surface' | 'triage' | 'routing' | 'customer-investigation' | 'outcome' | 'closure';
  phaseStartTime: string;
  phaseEndTime?: string;
  phaseDuration?: number;
  triageDecision?: 'confirmed' | 'noise' | 'suppressed';
  routingTarget?: string;
  handoffCompleted: boolean;
  customerInvestigationOwned: boolean;
  outcomeReceived: boolean;
}

// Boundary preservation state
interface BoundaryPreservationState {
  patternId: string;
  evidenceGradeValidated: boolean; // Always intelligence-grade
  intentDeterminationBlocked: boolean; // Always true
  investigationOwnershipTransferred: boolean;
  hrActionBlocked: boolean; // Always true
  disciplinaryActionBlocked: boolean; // Always true
  forensicEvidenceBlocked: boolean; // Always true
  customerOwnershipConfirmed: boolean;
}

// Jurisdictional controls state
interface JurisdictionalControlsState {
  tenantId: string;
  jurisdiction: string;
  internalRiskEnabled: boolean;
  patternRestrictions: string[];
  thresholdOverrides: Record<string, number>;
  rbacRestrictions: string[];
  transparencyExportEnabled: boolean;
  retentionRestrictions: Record<string, number>;
  lastJurisdictionalReview: string;
}
```

---

## State Synchronisation Architecture

### Cross-Layer State Dependencies

**Layer 1 (Connector) → Layer 2 (Normalisation):**
- Connector health state feeds normalisation queue state
- Signal processing state drives normalisation backlog
- Connector error state triggers normalisation alerts

**Layer 2 (Normalisation) → Layer 3 (Engine):**
- Normalised entity state feeds drift detection models
- Verdict processing state feeds behavioral analysis
- Entity relationship state drives correlation engines

**Layer 3 (Engine) → Layer 4 (Intelligence):**
- Drift detection results feed intelligence streams
- Risk scoring state drives intelligence prioritisation
- Architecture analysis state feeds posture intelligence

**Layer 4 (Intelligence) → Layer 5 (Case):**
- Intelligence artefact state triggers case creation
- Cross-stream correlation state drives case routing
- Estate intelligence state influences case prioritisation

**Layer 5 (Case) → Layer 6 (OODA):**
- Case lifecycle state feeds OODA phase metrics
- Case tempo state drives OODA tempo calculation
- Case bottlenecks contribute to OODA degradation

**Layer 6 (OODA) → Layer 7 (Surface):**
- OODA phase state drives dashboard updates
- OODA tempo state feeds Operating Picture refresh
- OODA degradation state triggers Direction Board items

### State Consistency Patterns

**Eventually Consistent State:**
- Intelligence processing across streams
- Operating Picture updates
- Dashboard metric aggregation
- Audit trail consolidation

**Strongly Consistent State:**
- Case lifecycle transitions
- Entity relationship changes
- Audit event ordering
- Tenant isolation boundaries

**Conflict Resolution:**
- Verdict disagreement detection and resolution
- Intelligence artefact supersession
- Case routing conflicts
- Strategy policy conflicts

---

## State Persistence Patterns

### Database State (PostgreSQL)
**Pattern:** Authoritative state of record
**Entities:** Cases, Assets, Identities, Connectors, Strategies, Audit Events
**Characteristics:**
- ACID transactions for consistency
- Tenant scoping enforced at schema level
- Audit trail via trigger functions
- Point-in-time recovery capability

### Cache State (Redis - Future)
**Pattern:** Performance optimization for read-heavy operations
**Entities:** Intelligence artefacts, Operating Pictures, Dashboard metrics
**Characteristics:**
- TTL-based expiry for freshness
- Tenant-scoped key namespacing
- Cache invalidation on source updates
- Fallback to database on cache miss

### Stream State (Event Store - Future)
**Pattern:** Event sourcing for complex state machines
**Entities:** OODA cycles, Intelligence processing, Verdict correlations
**Characteristics:**
- Append-only event log
- State reconstruction from events
- Temporal queries and replay
- Distributed processing support

### Memory State (Application)
**Pattern:** Transient processing state
**Entities:** Processing queues, Correlation buffers, Health metrics
**Characteristics:**
- High-performance access
- Process-local scope
- Periodic persistence checkpoints
- Graceful degradation on restart

---

## State Monitoring and Observability

### State Health Metrics
- **Entity State Health:** Consistency, completeness, freshness
- **Processing State Health:** Queue depths, error rates, latency
- **Lifecycle State Health:** Transition success rates, stuck states
- **Correlation State Health:** Cross-stream sync, conflict rates

## State Performance Requirements

**GAP IDENTIFIED:** No explicit state performance requirements defined in source material (Master Technical Specification, Master Proposition, or child specs). This represents an architectural decision gap that must be resolved.

**Categories requiring definition:**
- Read Performance: Requirements TBD
- Write Performance: Requirements TBD  
- Processing Performance: Requirements TBD
- Sync Performance: Requirements TBD

### State Alerting Thresholds
- **Critical:** State corruption, audit trail gaps, tenant isolation breaches
- **High:** Processing backlogs, correlation failures, health degradation
- **Medium:** Performance degradation, cache misses, sync delays
- **Low:** Capacity warnings, maintenance windows, optimization opportunities

---

## Implementation Roadmap

### Phase 1: Foundation State (Current State)
✅ **Complete:** Case lifecycle, entity persistence, validation windows, UI state

### Phase 2: Intelligence State (CRITICAL PATH)
🔄 **Next Priority:**
- Implement intelligence stream processing state
- Implement artefact lifecycle state management
- Implement cross-stream correlation state
- Implement confidence decay mechanisms

### Phase 3: OODA State (CRITICAL PATH)
⏳ **Depends on Phase 2:**
- Implement OODA cycle orchestration state
- Implement phase transition state machine
- Implement tempo measurement state
- Implement bottleneck detection state

### Phase 4: Verdict State (CRITICAL PATH)
⏳ **Can parallel with Phase 3:**
- Implement verdict processing state
- Implement correlation and disagreement state
- Implement disposition action state
- Implement time-bound expiry state

### Phase 5: Drift Detection State (MAJOR EFFORT)
⏳ **Depends on Phases 2-4:**
- Implement drift engine orchestration state
- Implement ~240 model health states
- Implement drift result lifecycle state
- Implement blast radius calculation state

### Phase 6: Domain-Specific State (MAJOR EFFORT)
⏳ **Can parallel with Phase 3:**
- Implement Control Plane state management
- Implement Identity Intelligence state (CHAIN computation, risk composite)
- Implement Asset Intelligence state (classification, positioning, coverage)
- Implement Inverse Discovery state (lookup failures, blindspots)
- Implement Internal Risk Investigation state (verdict patterns, boundaries)

### Phase 7: Operating Picture State (REQUIRED)
⏳ **Depends on Phases 2-6:**
- Implement External Operating Picture state management
- Implement Internal Operating Picture state management
- Implement Situational Awareness state
- Implement dashboard aggregation state

### Phase 8: Advanced State Features (FUTURE)
⏳ **Post-v2.6:**
- Implement distributed state coordination
- Implement state versioning and rollback
- Implement cross-tenant state federation
- Implement state analytics and optimization

---

## State Testing Strategy

### Unit State Testing
- State machine transition validation
- State consistency invariant checking
- State serialization/deserialization
- State conflict resolution logic

### Integration State Testing
- Cross-layer state propagation
- State synchronization timing
- State persistence durability
- State recovery procedures

### Performance State Testing
- State transition throughput
- State query performance
- State storage efficiency
- State network overhead

### Chaos State Testing
- State corruption recovery
- State partition tolerance
- State consistency under load
- State failover scenarios

---

## Status

**Phase 6 Complete:** ✅ State Architecture Defined  
**Current Coverage:** Foundation state management implemented, critical gaps identified  
**Strong Foundation:** Case lifecycle, entity persistence, validation logic, UI state  
**Critical Gaps:** Intelligence state, OODA state, verdict state, drift detection state, domain-specific state  
**Critical Path:** Intelligence State → OODA State → Verdict State → Domain State → Drift State  

**Next Phase:** Data Architecture (Phase 7)

---

**Last Updated:** 2026-05-30  
**Next Milestone:** Phase 7 - Data Architecture