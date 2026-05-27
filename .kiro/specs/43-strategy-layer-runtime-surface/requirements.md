# Requirements — Strategy Layer Runtime Surface

**Spec ID:** `43-strategy-layer-runtime-surface`  
**Target version:** v1.3.1  
**Status:** Planned / Kiro-ready  
**Source doctrine:** Commander SDR baseline v2.6.2; see `docs/99_source_archive/baseline_v2_6_2/`.  
**Translated from baseline:** Spec #32 Strategy Layer Runtime Surface Specification  
**v1.3.1 lineage closure:** created to correct prior false coverage of Spec #32 and provide full content-depth translation.

## Purpose

Define the mandatory build-blocking Strategy Layer Runtime Surface, Strategy Centre UI and runtime binding model for strategy-dependent recalculation.

## Scope in

- Twelve named strategy surfaces.
- Strategy Centre configuration, simulation, approval workflow, audit history and effective-policy preview.
- Runtime recalculation binding for priority, routing, validation, closure gates, reopening and Fusion Map refresh.

## Scope out

- Application code.
- Live runtime mutation.
- External orchestration outside Kiro and Git.
- Non-baseline strategy surfaces.

## User stories and EARS requirements

### Requirement 1 — Strategy Surface 1 — SLA Strategy

WHEN SLA Strategy is configured THE SYSTEM SHALL expose runtime policy for SLA profile selection, time-bound response expectations, escalation cadence and SLA-driven recalculation before strategy-dependent features ship. [Source: Spec #32 §Strategy Surfaces]

### Requirement 2 — Strategy Surface 2 — Threshold Strategy

WHEN Threshold Strategy is configured THE SYSTEM SHALL expose runtime policy for trigger thresholds used by priority, routing, validation, closure and reopening decisions. [Source: Spec #32 §Strategy Surfaces]

### Requirement 3 — Strategy Surface 3 — Automation Boundary Strategy

WHEN Automation Boundary Strategy is configured THE SYSTEM SHALL expose runtime policy defining which automated actions are permitted, approval-required, dry-run-only or forbidden. [Source: Spec #32 §Strategy Surfaces]

### Requirement 4 — Strategy Surface 4 — Routing Strategy

WHEN Routing Strategy is configured THE SYSTEM SHALL expose runtime policy for route, owner, team, approval path, escalation path and rationale calculation. [Source: Spec #32 §Strategy Surfaces]

### Requirement 5 — Strategy Surface 5 — Posture Strategy

WHEN Posture Strategy is configured THE SYSTEM SHALL expose runtime policy for posture scoring, baseline weighting, coverage expectations and posture-driven prioritisation. [Source: Spec #32 §Strategy Surfaces]

### Requirement 6 — Strategy Surface 6 — Mission Objective Strategy

WHEN Mission Objective Strategy is configured THE SYSTEM SHALL expose runtime policy binding mission context to priority, routing, validation, closure and Fusion Map overlays. [Source: Spec #32 §Strategy Surfaces]

### Requirement 7 — Strategy Surface 7 — Operational Tempo Strategy

WHEN Operational Tempo Strategy is configured THE SYSTEM SHALL expose runtime policy for OODA tempo thresholds, operational cadence and tempo degradation handling. [Source: Spec #32 §Strategy Surfaces]

### Requirement 8 — Strategy Surface 8 — Domain-Specific Strategy

WHEN Domain-Specific Strategy is configured THE SYSTEM SHALL expose runtime policy variations per domain without breaking the universal case, routing, validation or audit models. [Source: Spec #32 §Strategy Surfaces]

### Requirement 9 — Strategy Surface 9 — Prioritisation Weight Strategy

WHEN Prioritisation Weight Strategy is configured THE SYSTEM SHALL expose runtime weighting for severity, exploitability, blast radius, identity exposure, business context, coverage score, threat relevance and attack context modulation. [Source: Spec #32 §Strategy Surfaces]

### Requirement 10 — Strategy Surface 10 — Validation Window Strategy

WHEN Validation Window Strategy is configured THE SYSTEM SHALL expose runtime policy for when validation runs, how long evidence remains fresh and when validation must be refreshed. [Source: Spec #32 §Strategy Surfaces]

### Requirement 11 — Strategy Surface 11 — Closure Gate Strategy

WHEN Closure Gate Strategy is configured THE SYSTEM SHALL expose runtime policy defining the closure gates that must be satisfied before system-owned case closure. [Source: Spec #32 §Strategy Surfaces]

### Requirement 12 — Strategy Surface 12 — Reopening Trigger Strategy

WHEN Reopening Trigger Strategy is configured THE SYSTEM SHALL expose runtime policy defining the triggers that cause system-owned reopening evaluation. [Source: Spec #32 §Strategy Surfaces]

### Requirement 13 — Required UI 1 — Configuration

WHEN the Strategy Centre is displayed THE SYSTEM SHALL expose a configuration surface for strategy policies without allowing unauthorised mutation of lifecycle state. [Source: Spec #32 §Required UI]

### Requirement 14 — Required UI 2 — Simulation

WHEN strategy changes are drafted THE SYSTEM SHALL expose a simulation surface showing the projected effect before approval. [Source: Spec #32 §Required UI]

### Requirement 15 — Required UI 3 — Approval Workflow

WHEN strategy changes require approval THE SYSTEM SHALL expose an approval workflow and SHALL NOT apply the change until the configured approval condition is satisfied. [Source: Spec #32 §Required UI]

### Requirement 16 — Required UI 4 — Audit History

WHEN strategy policy is viewed THE SYSTEM SHALL expose audit history for previous strategy changes and effective policy transitions. [Source: Spec #32 §Required UI]

### Requirement 17 — Required UI 5 — Effective-Policy Preview

WHEN a strategy change is proposed THE SYSTEM SHALL expose effective-policy preview showing the resultant policy before activation. [Source: Spec #32 §Required UI]

### Requirement 18 — Runtime Binding 1 — Priority Recalculation

WHEN a strategy change is applied THE SYSTEM SHALL trigger priority recalculation for affected risk objects and cases. [Source: Spec #32 §Runtime Binding]

### Requirement 19 — Runtime Binding 2 — Route Recalculation

WHEN a strategy change is applied THE SYSTEM SHALL trigger route recalculation for affected cases and blocking sub-actions. [Source: Spec #32 §Runtime Binding]

### Requirement 20 — Runtime Binding 3 — Validation Recalculation

WHEN a strategy change is applied THE SYSTEM SHALL trigger validation recalculation for affected validation windows and evidence freshness rules. [Source: Spec #32 §Runtime Binding]

### Requirement 21 — Runtime Binding 4 — Closure-Gate Recalculation

WHEN a strategy change is applied THE SYSTEM SHALL trigger closure-gate recalculation for affected cases before closure evaluation continues. [Source: Spec #32 §Runtime Binding]

### Requirement 22 — Runtime Binding 5 — Reopening Evaluation

WHEN a strategy change is applied THE SYSTEM SHALL trigger reopening evaluation for affected closed cases and emit audit events for any reopening decision. [Source: Spec #32 §Runtime Binding]

### Requirement 23 — Runtime Binding 6 — Fusion Map Refresh

WHEN a strategy change is applied THE SYSTEM SHALL trigger Fusion Map refresh for affected mission, routing, priority and operating-picture overlays. [Source: Spec #32 §Runtime Binding]

### Requirement 24 — Build Blocking

WHEN any strategy-dependent feature is scheduled for build THE SYSTEM SHALL require Strategy Layer Runtime Surface coverage before the dependent feature ships. [Source: Spec #32 §Status; Spec #32 §Runtime Binding]
