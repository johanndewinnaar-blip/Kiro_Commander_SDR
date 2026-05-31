# Commander SDR Function Architecture

**Authority:** System Rationalisation Phase 5  
**Date:** 30 May 2026  
**Status:** ACTIVE - Function Architecture Complete

---

## Executive Summary

This document defines the complete functional architecture for Commander SDR v2.6, including implemented functions, required extensions, and function relationships. It serves as the foundation for understanding what the system does operationally and how functions interact across the seven architectural layers.

**Key Finding:** The current function implementation has foundation functions in place but critical gaps exist in intelligence processing, OODA orchestration, and verdict semantics that must be addressed before v2.6 surface implementation.

---

## Function Model Overview

### Seven-Layer Function Distribution

**Layer 1: Connector Layer**
- Signal ingestion functions (4 classes: A/B/C/D)
- Normalisation functions
- Health monitoring functions

**Layer 2: Normalisation Layer**
- Canonical entity mapping functions
- Verdict semantics processing functions
- Inverse discovery functions

**Layer 3: Engine Layer**
- ~240 drift detection models (functions)
- Risk scoring functions
- Blast radius calculation functions
- Architecture intelligence functions

**Layer 4: Intelligence Layer**
- 4-stream integration functions (External Threat, External Attack, Internal Behavioural, Posture)
- Estate Intelligence Picture functions
- Cross-stream correlation functions

**Layer 5: Case Layer**
- Closed-loop case lifecycle functions
- Routing engine functions
- Validation and closure functions

**Layer 6: OODA Layer**
- Programme-level OODA tempo functions
- Phase health monitoring functions
- Bottleneck detection functions

**Layer 7: Surface Layer**
- Workspace rendering functions
- Dashboard generation functions
- Operating Picture functions
- Direction Board functions

---

## Current Function Inventory (Implemented)

### 1. Entity Management Functions (IMPLEMENTED)
**Location:** `packages/contracts/src/fixtures/`  
**Status:** ✅ Complete for v2.6 foundation  

**Functions:**
- `seedAssets()` - Asset entity creation and management
- `seedIdentities()` - Identity entity creation and management  
- `seedCases()` - Case entity creation with 12 case types
- `seedConnectors()` - Connector entity management with multi-class support
- `seedStrategies()` - Strategy entity management with 12 surfaces
- `seedRiskObjects()` - Risk object creation and binding
- `seedEvents()` - Audit event creation and tracking

**Coverage:** Foundation entity CRUD operations for 7/12 required entities

### 2. Route Registry Functions (IMPLEMENTED)
**Location:** `apps/web/src/registry/`  
**Status:** ✅ Complete for v2.6 navigation  

**Functions:**
- Route registration and visibility management
- Three-application boundary enforcement (Operational App, Tenant Admin, Commercial Control Plane)
- Six-workspace routing (Executive Posture, Drift Operations, Control & Architecture, Identity & Asset Intelligence, Assurance & Audit, Transformation & M&A)
- Build-mode vs operational-mode visibility switching

**Coverage:** Complete navigation and routing architecture

### 3. Design System Functions (IMPLEMENTED)
**Location:** `packages/ui/src/`  
**Status:** ✅ Complete for v2.6 visual language  

**Functions:**
- Token system management (primitive → semantic → component)
- Visual intensity level switching (Operational Standard, Tactical Analysis, Emergency Command)
- Accessibility compliance (colour + text + shape indicators)
- Chart rendering with semantic data tokens

**Coverage:** Complete visual language and component architecture

### 4. Page Layout Functions (IMPLEMENTED)
**Location:** `apps/web/src/components/page-container.tsx`  
**Status:** ✅ Complete for v2.6 page structure  

**Functions:**
- Shared page layout standardisation across three application boundaries
- Breadcrumb and header management
- Scrollbar-gutter alignment for consistent left edge
- Exception handling for emergency surfaces and master-detail views

**Coverage:** Complete page structure standardisation

---

## Required Function Extensions (v2.6 Gaps)

### 5. Signal Processing Functions (NEW - CRITICAL GAP)
**Authority:** Spec #61 Universal Security Signal Connector Contract  
**Status:** ❌ Missing - Required for v2.6  

**Required Functions:**
```typescript
// Signal ingestion by connector class
function ingestClassASignal(signal: SOCTelemetrySignal): Promise<void>
function ingestClassBSignal(signal: OperationalVerdictSignal): Promise<void>
function ingestClassCSignal(signal: ConfigurationStateSignal): Promise<void>
function ingestClassDSignal(signal: ThreatIntelligenceSignal): Promise<void>

// Signal purpose routing (8 purposes)
function routeConfigurationSignal(signal: Signal): Promise<void>
function routeStateSignal(signal: Signal): Promise<void>
function routeVerdictSignal(signal: Signal): Promise<void>
function routeDetectionSignal(signal: Signal): Promise<void>
function routeCaseSignal(signal: Signal): Promise<void>
function routeInventorySignal(signal: Signal): Promise<void>
function routeBehaviouralSignal(signal: Signal): Promise<void>
function routeThreatSignal(signal: Signal): Promise<void>

// Normalisation functions
function normaliseToCanonicalEntity(signal: Signal): Promise<CanonicalEntity>
function validateSignalConformance(signal: Signal, connectorClass: ConnectorClass): ValidationResult
```

### 6. Verdict Semantics Functions (NEW - CRITICAL GAP)
**Authority:** Spec #62 Verdict Semantics Specification  
**Status:** ❌ Missing - Required for v2.6  

**Required Functions:**
```typescript
// Verdict processing (5 mandatory dimensions)
function processVerdict(verdict: VerdictSignal): Promise<ProcessedVerdict>
function validateVerdictSemantics(verdict: VerdictSignal): ValidationResult
function correlateVerdicts(verdicts: VerdictSignal[]): VerdictCorrelation[]
function detectVerdictDisagreement(verdicts: VerdictSignal[]): DisagreementFlag[]

// Verdict disposition handling
function interpretDisposition(disposition: VerdictDisposition): DispositionAction
function applyVerdictPolicy(verdict: ProcessedVerdict, policy: PolicyReference): PolicyAction
function calculateVerdictConfidence(verdict: ProcessedVerdict, toolTrust: number): ConfidenceScore
```

### 7. Intelligence Layer Functions (NEW - CRITICAL GAP)
**Authority:** Spec #59 Intelligence Layer Architecture  
**Status:** ❌ Missing - Required for v2.6  

**Required Functions:**
```typescript
// Four-stream processing
function processExternalThreatIntelligence(signals: Signal[]): Promise<IntelligenceArtefact[]>
function processExternalAttackIntelligence(signals: Signal[]): Promise<IntelligenceArtefact[]>
function processInternalBehaviouralIntelligence(signals: Signal[]): Promise<IntelligenceArtefact[]>
function processPostureIntelligence(signals: Signal[]): Promise<IntelligenceArtefact[]>

// Cross-stream correlation
function correlateAcrossStreams(artefacts: IntelligenceArtefact[]): CrossStreamCorrelation[]
function generateEstateIntelligencePicture(artefacts: IntelligenceArtefact[]): EstateIntelligencePicture

// Pre-warned classification
function classifyIntelligenceArtefact(artefact: IntelligenceArtefact): 'pre-warned' | 'protected' | 'novel' | 'unclassified'
```

### 8. OODA Orchestration Functions (NEW - CRITICAL GAP)
**Authority:** Spec #58 Security OODA Loop  
**Status:** ❌ Missing - Required for v2.6  

**Required Functions:**
```typescript
// OODA cycle management
function initiateOODACycle(): Promise<OODACycle>
function transitionOODAPhase(cycle: OODACycle, fromPhase: OODAPhase, toPhase: OODAPhase): Promise<void>
function calculateOODATempo(cycles: OODACycle[]): TempoMetrics
function detectOODABottleneck(phases: OODAPhase[]): BottleneckAnalysis

// Phase-specific functions
function observeSecurityState(): Promise<ObservationResults>
function orientToSecurityContext(observations: ObservationResults): Promise<OrientationResults>
function decideSecurityActions(orientation: OrientationResults): Promise<DecisionResults>
function actOnSecurityDecisions(decisions: DecisionResults): Promise<ActionResults>

// Health monitoring
function calculatePhaseHealth(phase: OODAPhase): HealthScore
function identifyPhaseDegradation(phases: OODAPhase[]): DegradationAlert[]
```

### 9. Case Lifecycle Functions (PARTIAL - NEEDS EXTENSION)
**Authority:** Spec #08 Case Management Workflow  
**Status:** ⚠️ Partial - Foundation exists, needs v2.6 extensions  

**Existing Functions:**
- Case creation with 12 case types ✅
- Basic case entity management ✅

**Required Extensions:**
```typescript
// Closed-loop lifecycle (system-owned only)
function createCaseFromSignal(signal: Signal, routingRules: RoutingRules): Promise<Case>
function transitionCaseStatus(caseId: string, transition: StatusTransition): Promise<void>
function validateCaseClosure(caseId: string, closureGate: ClosureGate): Promise<ValidationResult>
function reopenCase(caseId: string, reopeningTrigger: ReopeningTrigger): Promise<void>

// Routing engine
function calculateCaseRouting(case: Case, strategies: Strategy[]): RoutingDecision
function assignCaseOwner(case: Case, workloadCapacity: WorkloadCapacity[]): AssignmentDecision
function calculateNextBestAction(case: Case, context: CaseContext): NextBestAction

// Risk scoring
function calculateCaseRiskScore(case: Case, riskObjects: RiskObject[]): RiskScore
function calculateMomentumScore(case: Case, lifecycle: CaseLifecycle): MomentumScore
function calculateWorkloadCapacityScore(analysts: Analyst[]): WorkloadCapacityScore
```

### 10. Drift Detection Functions (NEW - CRITICAL GAP)
**Authority:** Master Technical Specification §6.3 (~240 models)  
**Status:** ❌ Missing - Required for v2.6  

**Required Functions:**
```typescript
// Core drift detection (~240 models to implement)
function detectConfigurationDrift(intended: Configuration, actual: Configuration): DriftResult[]
function detectPostureDrift(baseline: PostureBaseline, current: PostureState): DriftResult[]
function detectCoverageDrift(expected: CoverageExpectation, actual: CoverageState): DriftResult[]

// Drift analysis
function calculateDriftSeverity(drift: DriftResult): SeverityScore
function calculateBlastRadius(drift: DriftResult, estate: EstateTopology): BlastRadiusAnalysis
function prioritiseDriftRemediation(drifts: DriftResult[], strategies: Strategy[]): PriorityQueue

// Architecture intelligence
function analyseArchitectureTopology(assets: Asset[], identities: Identity[]): TopologyAnalysis
function detectArchitectureAnomaly(topology: TopologyAnalysis, baselines: ArchitectureBaseline[]): AnomalyResult[]
```

### 11. Operating Picture Functions (NEW - REQUIRED)
**Authority:** Specs #65, #66 Operating Pictures  
**Status:** ❌ Missing - Required for v2.6  

**Required Functions:**
```typescript
// External Operating Picture
function generateExternalOperatingPicture(externalIntelligence: IntelligenceArtefact[]): ExternalOperatingPicture
function updateExternalThreatLandscape(threats: ThreatIntelligence[]): ThreatLandscape
function correlateExternalAttacks(attacks: AttackIntelligence[]): AttackCorrelation[]

// Internal Operating Picture  
function generateInternalOperatingPicture(internalIntelligence: IntelligenceArtefact[]): InternalOperatingPicture
function analyseBehaviouralPatterns(behaviours: BehaviouralIntelligence[]): BehaviouralPattern[]
function assessInternalRiskPosture(identities: Identity[], behaviours: BehaviouralPattern[]): RiskPosture

// Situational awareness
function calculateSituationalAwareness(external: ExternalOperatingPicture, internal: InternalOperatingPicture): SituationalAwareness
function identifyBlindSpots(coverage: CoverageState, topology: TopologyAnalysis): BlindSpot[]
```

### 13. Control Plane Functions (NEW - REQUIRED)
**Authority:** Control Plane Specification v1.1, Feature Registry FR001  
**Status:** ❌ Missing - Required for v2.6  

**Required Functions:**
```typescript
// Feature flag management
function evaluateFeatureFlag(flagKey: string, tenantId: string, userId: string): boolean
function validateCommercialEntitlement(flagKey: string, tenantTier: CommercialTier): boolean
function enforceControlScope(flagKey: string, actorRole: string, operation: 'read' | 'write'): boolean

// Commercial tier management
function validateTenantTier(tenantId: string): CommercialTier
function calculateEntitlementGates(tier: CommercialTier): EntitlementGate[]
function enforcePhaseAvailability(flagKey: string, currentPhase: number): boolean

// Tenant admin functions
function configureTenantFeatures(tenantId: string, configurations: FeatureConfiguration[]): Promise<void>
function validateTenantConfiguration(config: FeatureConfiguration): ValidationResult
function auditFeatureAccess(tenantId: string, flagKey: string, access: 'granted' | 'denied'): Promise<void>
```

### 14. Identity Intelligence Functions (NEW - REQUIRED)
**Authority:** Identity Intelligence Spec #10, Master Proposition §17.1  
**Status:** ❌ Missing - Required for v2.6  

**Required Functions:**
```typescript
// CHAIN computation (3 stages)
function executeCHAINStage1Continuous(identities: Identity[]): Promise<IdentityChain[]>
function executeCHAINStage2Triggered(triggeredIdentity: Identity): Promise<IdentityChain>
function executeCHAINStage3Sweep(privilegedIdentities: Identity[]): Promise<IdentityChain[]>

// Identity risk scoring (10-factor composite)
function calculateIdentityRiskScore(identity: Identity, context: IdentityContext): RiskScore
function assessPrivilegeLevel(identity: Identity, entitlements: Entitlement[]): PrivilegeLevel
function detectEntitlementGaps(identity: Identity, expectedEntitlements: Entitlement[]): EntitlementGap[]
function evaluateStandingAccess(identity: Identity, accessHistory: AccessHistory[]): StandingAccessResult
function validateMFAPIMEnforcement(identity: Identity, policies: Policy[]): MFAPIMResult

// Group intelligence
function analyseSecurityGroupHealth(groups: SecurityGroup[]): GroupHealthResult[]
function detectGroupRedundancy(groups: SecurityGroup[]): RedundancyResult[]
function calculateRiskConcentration(groups: SecurityGroup[], identities: Identity[]): RiskConcentrationResult

// High-risk watchlist
function maintainHighRiskWatchlist(identities: Identity[], riskScores: RiskScore[]): Watchlist
function evaluateWatchlistInclusion(identity: Identity, riskScore: RiskScore): boolean
function generateUserInvestigationProfile(identity: Identity, chains: IdentityChain[]): InvestigationProfile
```

### 15. Asset Intelligence Functions (NEW - REQUIRED)
**Authority:** Asset Intelligence Spec #09, Master Proposition §9  
**Status:** ❌ Missing - Required for v2.6  

**Required Functions:**
```typescript
// Asset classification and lifecycle
function classifyAssetType(asset: Asset, signals: Signal[]): 'persistent' | 'ephemeral'
function determineLifecycleStage(asset: Asset, lifecycle: LifecycleData): LifecycleStage
function assessEOLEOSStatus(asset: Asset, vendorData: VendorData): EOLEOSStatus

// Attack surface positioning
function autoPositionAttackSurface(asset: Asset, topology: NetworkTopology): 'internal' | 'external'
function calculatePositioningConfidence(asset: Asset, evidence: PositioningEvidence[]): ConfidenceScore
function validatePositioningEvidence(evidence: PositioningEvidence[]): ValidationResult

// Coverage assessment
function assessAssetCoverage(asset: Asset, controls: SecurityControl[]): CoverageMap
function calculateFullyCoveredStatus(coverageMap: CoverageMap, requirements: CoverageRequirement[]): boolean
function identifyGhostAssets(discoveredAssets: Asset[], inventoryAssets: Asset[]): GhostAsset[]

// Asset cartography
function generateAssetCartography(assets: Asset[], relationships: AssetRelationship[]): AssetCartography
function mapOwnershipHierarchy(asset: Asset, orgStructure: OrganisationStructure): OwnershipHierarchy
function assessBusinessContext(asset: Asset, businessData: BusinessData): BusinessContext
```

### 16. Inverse Discovery Functions (NEW - REQUIRED)
**Authority:** Inverse Discovery Loop Spec #40, Master Technical Specification §3.3  
**Status:** ❌ Missing - Required for v2.6  

**Required Functions:**
```typescript
// Lookup failure handling
function handleLookupFailure(entityReference: string, sourceConnector: string): Promise<InverseDiscoveryResult>
function attemptSecondaryResolution(entityReference: string): SecondaryResolutionResult
function performFuzzyMatch(entityReference: string, knownEntities: Entity[]): FuzzyMatchResult[]
function checkRecentChanges(entityReference: string, changeLog: ChangeLog[]): RecentChangeResult

// Root cause classification
function classifyRootCause(lookupFailure: LookupFailure, evidence: Evidence[]): RootCauseClassification
function calculateClassificationConfidence(classification: RootCauseClassification, evidence: Evidence[]): ConfidenceScore

// Coverage blindspot management
function generateCoverageBlindspotCase(blindspot: CoverageBlindspot): Promise<Case>
function routeBlindspotCase(case: Case, routingRules: RoutingRules): RoutingDecision
function driveEntityOnboarding(blindspot: CoverageBlindspot): EntityOnboardingAction
function tuneConnectorConfiguration(connector: Connector, blindspot: CoverageBlindspot): ConnectorTuningAction
```

### 17. Drift and Rule Engine Functions (NEW - REQUIRED)
**Authority:** Drift and Rule Engine Spec #34, Master Technical Specification §4  
**Status:** ❌ Missing - Required for v2.6  

**Required Functions:**
```typescript
// YAML rule management
function parseYAMLRule(yamlRule: string): ParsedRule
function validateRuleSchema(rule: ParsedRule): ValidationResult
function activateRule(rule: ParsedRule, approvalStatus: ApprovalStatus): Promise<void>
function deactivateRule(ruleId: string, reason: DeactivationReason): Promise<void>

// Rule execution engine
function executeActiveRules(canonicalEntities: Entity[], tenantContext: TenantContext): Promise<Finding[]>
function evaluateRuleCondition(condition: RuleCondition, entity: Entity): boolean
function generateFinding(rule: ParsedRule, entity: Entity, conditionSnapshot: ConditionSnapshot): Finding
function suppressDuplicateFinding(finding: Finding, existingFindings: Finding[]): boolean

// Ten analytical engines (Master Technical Specification §4)
function executeDriftDetectionEngine(models: DriftModel[], entities: Entity[]): Promise<DriftResult[]>
function executeRiskScoringEngine(entities: Entity[], riskFactors: RiskFactor[]): Promise<RiskScore[]>
function executeBlastRadiusEngine(entity: Entity, topology: Topology): Promise<BlastRadiusResult>
function executeArchitectureIntelligenceEngine(architecture: Architecture): Promise<ArchitectureIntelligence>
function executeIdentityChainComputationEngine(identities: Identity[]): Promise<IdentityChain[]>
function executeBehaviouralAnomalyDetectionEngine(behaviours: Behaviour[]): Promise<AnomalyResult[]>
function executeAttackPathLikelihoodEngine(paths: AttackPath[]): Promise<LikelihoodResult[]>
function executeBASIntegrationEngine(basData: BASData): Promise<BASResult[]>
function executePreWarnedClassificationEngine(intelligence: Intelligence[]): Promise<ClassificationResult[]>
function executeThreatRelevanceScoringEngine(threats: Threat[], estate: Estate): Promise<RelevanceScore[]>

// Rule health monitoring
function monitorRuleHealth(rules: ParsedRule[]): RuleHealthMetrics
function calculateRuleSuccessRate(rule: ParsedRule, executions: RuleExecution[]): SuccessRate
function detectRuleFalsePositives(rule: ParsedRule, findings: Finding[], feedback: Feedback[]): FalsePositiveRate
```

### 18. Internal Risk Investigation Functions (NEW - REQUIRED)
**Authority:** Internal Risk Investigation Spec #41, Spec #75  
**Status:** ❌ Missing - Required for v2.6  

**Required Functions:**
```typescript
// Verdict pattern detection (preserving boundaries)
function detectVerdictPatterns(verdicts: Verdict[], identity: Identity): VerdictPattern[]
function classifyPatternType(pattern: VerdictPattern): 'concentration' | 'anomaly' | 'escalation' | 'correlation'
function calculatePatternSeverity(pattern: VerdictPattern, context: PatternContext): PatternSeverity

// Six-phase lifecycle management
function surfaceVerdictPattern(pattern: VerdictPattern): Promise<Case>
function triagePattern(pattern: VerdictPattern, triageDecision: TriageDecision): Promise<void>
function routeToCustomerInvestigation(pattern: VerdictPattern, routingTarget: string): Promise<void>
function handoffToCustomer(pattern: VerdictPattern, customerFunction: string): Promise<void>
function recordCustomerOutcome(pattern: VerdictPattern, outcome: OutcomeDisposition): Promise<void>
function closurePattern(pattern: VerdictPattern, closureReason: ClosureReason): Promise<void>

// Boundary preservation functions
function validateIntelligenceGradeEvidence(evidence: Evidence): boolean
function preventIntentDetermination(pattern: VerdictPattern): void // Always returns null for intent
function enforceCustomerInvestigationOwnership(investigation: Investigation): boolean
function auditIdentityAccessRequest(identityId: string, accessor: string, reason: string): Promise<void>

// Jurisdictional controls
function applyJurisdictionalRestrictions(pattern: VerdictPattern, jurisdiction: Jurisdiction): RestrictedPattern
function enforceJurisdictionalRBAC(user: User, pattern: VerdictPattern): AccessDecision
function handleJurisdictionalConfigChange(oldConfig: JurisdictionalConfig, newConfig: JurisdictionalConfig): Promise<void>
```

---

## Function Relationship Model

### Primary Function Dependencies

**Signal Processing → Intelligence Layer:**
- Signal ingestion functions feed intelligence processing functions
- Normalisation functions prepare data for intelligence correlation
- Verdict semantics functions provide input to Internal Behavioural Intelligence

**Intelligence Layer → Case Layer:**
- Intelligence artefacts trigger case creation functions
- Cross-stream correlations inform case routing functions
- Estate Intelligence Picture provides context for case prioritisation

**Case Layer → OODA Layer:**
- Case lifecycle events feed OODA phase functions
- Case tempo affects OODA tempo calculations
- Case bottlenecks contribute to OODA bottleneck detection

**OODA Layer → Surface Layer:**
- OODA phase health feeds dashboard functions
- OODA tempo metrics drive Operating Picture updates
- OODA degradation triggers Direction Board items

### Cross-Layer Function Interactions

**Entity Management ↔ All Layers:**
- All operational functions consume and produce canonical entities
- Entity lifecycle functions support all domain operations
- Entity relationship functions enable cross-domain correlation

**Strategy Functions ↔ Operational Functions:**
- Strategy evaluation functions influence routing decisions
- Strategy binding functions trigger operational changes
- Strategy validation functions ensure policy compliance

**Audit Functions ↔ All Operations:**
- All material functions emit audit events
- Audit trail functions provide compliance evidence
- Audit analysis functions support governance reporting

---

## Function Implementation Patterns

### System-Owned Functions (Closed-Loop)
**Pattern:** Functions that execute automatically without manual intervention
**Examples:**
- Case creation from signals
- Case status transitions
- OODA phase transitions
- Drift detection execution
- Intelligence correlation

**Implementation Rule:** These functions MUST NOT allow manual override or bypass

### Approval-Gated Functions
**Pattern:** Functions that require explicit approval before execution
**Examples:**
- Push actions to external systems
- Case closure validation
- Policy effectiveness recommendations
- Strategic guidance implementation

**Implementation Rule:** These functions MUST implement approval workflow and audit trail

### Read-Only Functions (SOC Boundary)
**Pattern:** Functions that consume but never write to SOC platforms
**Examples:**
- SOC telemetry ingestion
- Detection signal processing
- External attack intelligence correlation

**Implementation Rule:** These functions MUST enforce read-only boundary

### Intelligence-Grade Functions (Insider Risk Boundary)
**Pattern:** Functions that surface patterns but avoid investigation conclusions
**Examples:**
- Behavioural pattern detection
- Internal risk posture assessment
- Identity risk scoring

**Implementation Rule:** These functions MUST avoid HR/disciplinary conclusions

---

## Function Performance Requirements

**GAP IDENTIFIED:** No explicit performance requirements defined in source material (Master Technical Specification, Master Proposition, or child specs). This represents an architectural decision gap that must be resolved.

**Categories requiring definition:**
- Critical Path Functions: Performance requirements TBD
- Standard Functions: Performance requirements TBD
- Analytical Functions: Performance requirements TBD  
- Batch Functions: Performance requirements TBD

---

## Function Data Quality Contracts

### Input Validation
All functions MUST validate:
- Entity references exist and are accessible
- Tenant scoping is enforced
- Required fields are present and valid
- Enum values are within defined ranges

### Output Guarantees
All functions MUST ensure:
- Outputs conform to canonical entity schemas
- Audit events are emitted for material operations
- Error conditions are logged and recoverable
- Tenant isolation is maintained

### Idempotency Requirements
Functions MUST be idempotent where:
- Signal processing (duplicate signals handled gracefully)
- Entity creation (duplicate entities detected and merged)
- Case lifecycle transitions (duplicate transitions ignored)
- Intelligence correlation (duplicate correlations avoided)

---

## Implementation Roadmap

### Phase 1: Foundation Functions (Current State)
✅ **Complete:** Entity management, route registry, design system, page layout

### Phase 2: Signal Processing (CRITICAL PATH)
🔄 **Next Priority:**
- Implement signal ingestion functions (4 connector classes)
- Implement signal purpose routing (8 purposes)
- Implement normalisation functions
- Implement verdict semantics functions

### Phase 3: Intelligence Layer (CRITICAL PATH)
⏳ **Depends on Phase 2:**
- Implement 4-stream processing functions
- Implement cross-stream correlation functions
- Implement Estate Intelligence Picture functions
- Implement pre-warned classification functions

### Phase 4: OODA Orchestration (CRITICAL PATH)
⏳ **Depends on Phase 3:**
- Implement OODA cycle management functions
- Implement phase transition functions
- Implement tempo calculation functions
- Implement bottleneck detection functions

### Phase 5: Case Lifecycle Extensions (PARALLEL)
⏳ **Can parallel with Phases 2-4:**
- Extend case creation with routing engine
- Implement closed-loop lifecycle functions
- Implement validation and closure functions
- Implement reopening functions

### Phase 6: Domain-Specific Functions (MAJOR EFFORT)
⏳ **Depends on Phases 2-3:**
- Implement Control Plane functions (feature flags, commercial tiers)
- Implement Identity Intelligence functions (CHAIN computation, risk scoring)
- Implement Asset Intelligence functions (classification, coverage, cartography)
- Implement Inverse Discovery functions (lookup failure handling, blindspot management)
- Implement Internal Risk Investigation functions (verdict patterns, boundary preservation)

### Phase 7: Drift Detection (MAJOR EFFORT)
⏳ **Depends on Phases 2-3:**
- Implement ~240 drift detection models
- Implement 10 analytical engines
- Implement drift analysis functions
- Implement blast radius calculation
- Implement architecture intelligence

### Phase 8: Surface Functions (FINAL)
⏳ **Depends on all previous phases:**
- Implement Operating Picture functions
- Implement Direction Board functions
- Implement dashboard generation functions
- Implement reporting functions

---

## Build Dependencies

### Critical Path for v2.6
1. **Signal Processing** → Required for all intelligence streams
2. **Verdict Semantics** → Required for Internal Behavioural Intelligence
3. **Intelligence Layer** → Required for OODA Loop and case generation
4. **OODA Orchestration** → Required for programme-level tempo
5. **Case Lifecycle Extensions** → Required for operational case management
6. **Control Plane Functions** → Required for feature flag management
7. **Identity Intelligence Functions** → Required for CHAIN computation and risk scoring
8. **Asset Intelligence Functions** → Required for asset classification and coverage
9. **Inverse Discovery Functions** → Required for lookup failure handling
10. **Internal Risk Investigation Functions** → Required for verdict pattern boundaries

### Parallel Development Opportunities
- **Entity Extensions** can be developed alongside signal processing
- **Design System Extensions** can be developed independently
- **Surface Functions** can be mocked until underlying functions are ready
- **Audit Functions** can be implemented incrementally

### Function Testing Strategy
- **Unit Tests:** Each function tested in isolation with mock data
- **Integration Tests:** Function chains tested with realistic data flows
- **Contract Tests:** Function interfaces tested for conformance
- **Performance Tests:** Critical path functions tested for latency requirements

---

## Status

**Phase 5 Complete:** ✅ Function Architecture Defined  
**Current Coverage:** Foundation functions implemented, critical gaps identified  
**Critical Gaps:** Signal processing, intelligence layer, OODA orchestration, domain-specific functions, drift detection  
**Critical Path:** Signal Processing → Intelligence Layer → OODA Orchestration → Domain Functions → Drift Detection  

**Next Phase:** State Architecture (Phase 6)

---

**Last Updated:** 2026-05-30  
**Next Milestone:** Phase 6 - State Architecture