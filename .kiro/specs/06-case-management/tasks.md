# Implementation Plan: Unit 7 — Case Lifecycle Engine (Core State Machine)

**Spec ID:** `06-case-management`  
**Unit:** 7  
**Baseline spec:** #08 Case Management, #29 Universal Risk Object and Case Binding, #30 Universal Validation, Closure and Reopening Lifecycle  
**Architectural layer:** Case Layer (Layer 5)  
**Dependencies:** Unit 1 (Risk Object schema — DONE), Unit 6 (Strategy Layer — DONE)

## Overview

Upgrade the existing 6-state case lifecycle to the full 12-state closed-loop lifecycle engine with system-owned transitions, risk object binding, case reference number generation, case type assignment, and actor enforcement.

## Tasks

- [x] 1. Upgrade CaseStatus to 12-state lifecycle
  - [x] 1.1 Update CaseStatus type in case.ts to 12 states
  - [x] 1.2 Update caseStatusEnum in db schema common.ts
  - [x] 1.3 Update ALLOWED_TRANSITIONS for 12-state graph
  - [x] 1.4 Expand LifecycleActor type with engine actors

- [x] 2. Implement risk object binding engine
  - [x] 2.1 Create risk-object-binder.ts with binding function
  - [x] 2.2 Define binding request and result types
  - [x] 2.3 Implement binding logic for all outcomes

- [x] 3. Implement case reference number generation
  - [x] 3.1 Create case-ref-generator.ts
  - [x] 3.2 Implement reference format logic
  - [x] 3.3 Ensure uniqueness and determinism

- [x] 4. Implement case type assignment engine
  - [x] 4.1 Create case-type-assigner.ts
  - [x] 4.2 Define RiskObjectType to CaseType mapping
  - [x] 4.3 Ensure all 12 case types are reachable

- [x] 5. Upgrade executeTransition for 12-state lifecycle
  - [x] 5.1 Update executeTransition for new graph
  - [x] 5.2 Enforce per-transition actor validation
  - [x] 5.3 Reject unpermitted actors per transition
  - [x] 5.4 Update getNextStates and isTransitionAllowed

- [x] 6. Write comprehensive tests
  - [x] 6.1 Test all valid 12-state transitions
  - [x] 6.2 Test all 5 risk object binding outcomes
  - [x] 6.3 Test case ref generator uniqueness
  - [x] 6.4 Test all 12 case type assignments
  - [x] 6.5 Test actor enforcement per transition
  - [x] 6.6 Test system-owned enforcement
  - [x] 6.7 Update existing phase-d1 tests for 12-state model

- [x] 7. Update seed data and fixtures
  - [x] 7.1 Update seed cases for new statuses
  - [x] 7.2 Verify strategy resolvers still work

- [x] 8. Create database migration
  - [x] 8.1 Create migration SQL for 12-state enum

## Notes

- System-owned transitions ONLY — no manual case creation, closure, or reopening (Doctrinal Assertion 1)
- Actor enforcement: each transition has a permitted actor set
- All values from strategy layer — no hardcoded SLA/routing/priority values
- Workload class: all database operations declare workload class per Performance Doctrine
- The existing 6-state tests must be migrated to the 12-state model
- 12 states: detected, bound, routed, prioritised, action_decomposed, in_progress, pending_validation, validation_running, validated_pass, validated_fail, pending_closure_gates, closed_by_system, reopened_by_system
- Binding outcomes: bound_new_case, linked_existing_case, suppressed_approved, residual_risk_accepted, allocation_error
- Engine actors: system, routing-engine, binding-engine, prioritisation-engine, validation-engine, closure-engine, reopening-engine
- Case ref format: CMD-{type_abbrev}-{seq}-{tenant_code}

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "1.4", "2.1", "2.2", "3.1", "4.1"] },
    { "id": 2, "tasks": ["2.3", "3.2", "4.2", "5.1", "8.1"] },
    { "id": 3, "tasks": ["3.3", "4.3", "5.2", "5.4"] },
    { "id": 4, "tasks": ["5.3", "6.1"] },
    { "id": 5, "tasks": ["6.2", "6.3", "6.4", "6.5", "6.6", "6.7"] },
    { "id": 6, "tasks": ["7.1"] },
    { "id": 7, "tasks": ["7.2"] }
  ]
}
```
