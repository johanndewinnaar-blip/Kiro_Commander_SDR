# Commander SDR Glossary

Plain-English definitions for Commander/Kiro execution. These terms do not replace baseline specifications; they help agents interpret them consistently.

## Commander

The SaaS platform brand that delivers Security Command and Control and runs Security Drift Response.

See: Spec #57.

## Security Command and Control (Security C2)

The platform category integrating intelligence, defence, engineering and active response above the security stack.

See: Spec #57.

## Security Drift Response

The operational discipline Commander runs to detect, analyse, control, validate and adjust security posture drift.

See: Spec #57.

## OODA loop

The Observe, Orient, Decide, Act control loop used to operate security programme decisions.

See: Spec #58.

## Direction Board

A decision-focused surface binding objectives, priorities, evidence, owners and action state.

See: Spec #70.

## P0 priority overlay

A priority mechanism for urgent zero-day or critical conditions that propagates scope, reason and review state.

See: Spec #40.

## internal attack surface

The internally reachable estate, dependencies, identities, controls and exposures relevant to internal compromise paths.

See: Spec #60.

## external attack surface

The internet-facing, externally visible or externally reported estate and exposure context.

See: Spec #60.

## surface attribution

The mandatory classification of relevant records as internal_attack_surface or external_attack_surface.

See: Spec #60.

## verdict semantics

The rule that tool verdicts are time-bound, confidence-weighted claims with preserved meaning.

See: Spec #62.

## disposition

The canonical action or decision represented by a verdict, such as BLOCK, QUARANTINE, COACH, REQUIRE_MFA, REQUIRE_COMPLIANT, MONITOR, ALLOW or AUDIT.

See: Spec #62.

## connector class A

SOC Telemetry connector class for read-only SOC signal consumption.

See: Spec #61.

## connector class B

Operational Verdict connector class for tool decisions and verdict signals.

See: Spec #61.

## connector class C

Configuration State connector class for policy, control, asset, identity or architecture state.

See: Spec #61.

## connector class D

Threat Intelligence connector class for external threat intelligence and permitted-use intelligence feeds.

See: Spec #61.

## intelligence stream

One of four streams: External Threat, External Attack, Internal Behavioural or Posture.

See: Spec #59.

## Operational App

The primary Commander application surface for operational security posture, cases, intelligence and control workflows.

See: Spec #45.

## Tenant Admin

The tenant configuration surface for users, settings, baselines, features and administrative controls.

See: Spec #44, Spec #50.

## Commercial Control Plane

The commercial/provider control surface distinct from tenant operational administration.

See: Spec #39.

## shell reference

An HTML/UI reference used for layout and visual direction, not feature inventory authority.

See: Spec #56.

## registry-driven runtime

The rule that routes, menus, pages and feature visibility are controlled by registries rather than ad hoc UI state.

See: Spec #47, Spec #50.

## closed-loop case model

A system-owned case lifecycle from signal to case, validation closure and reopening, with audit throughout.

See: Spec #08, Spec #30.

### Twelve v2.6 case types
The complete case taxonomy comprising drift, vulnerability, identity, exposure, coverage, tool health, threat intelligence estate match, external attack correlation, verdict pattern, inverse discovery, policy effectiveness and OODA tempo degradation cases.

See: Master Technical Specification §6.2

### Eight signal purposes
The canonical purposes for connector signals: Configuration, State, Verdict, Detection, Case, Inventory, Behavioural and Threat.

See: Master Technical Specification §2.2; Spec #61

### Ten analytical engines
The named engine set: drift detection, risk scoring, blast radius, architecture intelligence, identity chain, behavioural anomaly, attack path likelihood, BAS integration, pre-warned classification and threat relevance scoring.

See: Master Technical Specification §4

### Pre-Warned classification
External attack classification where Commander had prior evidence of drift, exposure, coverage gap or control weakness on the affected entity.

See: Spec #71

### Protected classification
External attack classification where Commander considered the affected entity protected at attack open time.

See: Spec #71

### Novel classification
External attack classification used when entity resolution or posture state is too ambiguous or stale for a stronger classification.

See: Spec #71

### Inverse Discovery Loop
The lookup-failure-as-finding loop that creates Coverage Blindspot cases when external signals reference unknown entities.

See: Spec #72

### Universal Search
Governed cross-domain search across Commander objects subject to tenant, RBAC and authority overlay filtering.

See: Master Proposition §12.8; Feature Registry feat.search.universal

### Commercial Control Plane
Internal Commander/Seiertech control application for customer, tenant, licence, entitlement, deployment, support access and baseline profile operations.

See: Spec #38; Master Technical Specification §8.3


---

## Journey Intelligence Terms

### Journey Intelligence

Commander's capability for understanding how security work travels through the organisation from first signal to validated outcome. The measurement, attribution, optimisation and AI-grounding spine for the operating model. Peer capability to Spec #58 (OODA Tempo).

See: docs/00_authority/JOURNEY_INTELLIGENCE.md; DEC-journey-intelligence-foundation

### Journey

A complete lifecycle of security work from first signal to validated outcome, anchor-agnostic. May be anchored to a case, finding, IOC match, mission, strategy policy, inbound signal, push action, war room, or exposure programme.

See: JOURNEY_INTELLIGENCE.md §5.2

### Journey Anchor

The primary entity a journey is bound to. Determines journey identity and scope. Cases are major anchors but not the only journey origin.

See: JOURNEY_INTELLIGENCE.md §5.6

### Journey Template

A reference artefact declaring the expected shape of a journey type. Descriptive, not prescriptive. Enables expectation-based leakage detection and AI grounding.

See: JOURNEY_INTELLIGENCE.md §5.3, §6

### Delivery Mode

The five-level taxonomy describing how an activity was completed: Manual, System Driven, AI Enhanced, Human Confirmed Automation, Autonomous.

See: JOURNEY_INTELLIGENCE.md §5.1

### Lifecycle Checkpoint

A bounded canonical state transition within a journey (~35 values spanning Observe, Orient, Decide and Act phases). Only system-meaningful state changes qualify. UI interactions are not checkpoints.

See: JOURNEY_INTELLIGENCE.md §5.1

### Journey Tempo

The duration a journey takes to traverse its lifecycle, measured per-phase and end-to-end. Extends Spec #58 OODA Tempo from programme-level to individual-journey-level measurement.

See: JOURNEY_INTELLIGENCE.md §8

### Journey Leakage

Work that enters the lifecycle but never reaches a valid terminal outcome. Distinct from abandonment (intentional stop) and from tempo degradation (slowness). Leakage represents invisible unactioned risk.

See: JOURNEY_INTELLIGENCE.md §4

### Journey Rework

A journey that repeats earlier phases because a previous cycle failed (validated_fail, reopening). Measured as rework count, rework cost, and rework cause.

See: JOURNEY_INTELLIGENCE.md §4

### Journey Abandonment

Work intentionally stopped without reaching a successful outcome. Terminal states include: accepted_risk, cancelled, suppressed. Distinct from leakage (unintentional stall).

See: JOURNEY_INTELLIGENCE.md §4

### Journey Outcome

How a journey ended. Independent of status. 9 values: successful, partially_successful, failed, accepted_risk, cancelled, abandoned, merged, superseded, pending. Completion does not imply success.

See: JOURNEY_INTELLIGENCE.md §5.1

### Automation Friction

Resistance between decision and successful execution in automated workflows. Includes: drag, failure rate, human rescue rate, retry burden, recovery cost, connector reliability.

See: JOURNEY_INTELLIGENCE.md §4, §7.6

### Automation Drag

The time between a decision being approved and the corresponding action being successfully executed. A component of automation friction.

See: JOURNEY_INTELLIGENCE.md §4

### Human Rescue Rate

The percentage of automated actions that require human intervention to complete. A signal that automation is unreliable for a specific workflow or connector.

See: JOURNEY_INTELLIGENCE.md §4

### Automation Maturity

The delivery mode progression of a workflow type over time, from manual toward autonomous. Measured as the distribution shift across the five delivery modes. Maturity requires both automation AND success.

See: JOURNEY_INTELLIGENCE.md §7.7

### Journey Formula

A configurable, versioned computation definition that produces journey metrics. Hosted as a strategy policy of surface type `journey-intelligence-formula`. 10 formula families with default weights, tenant-tunable.

See: JOURNEY_INTELLIGENCE.md §7

### Journey Quality

A composite metric measuring whether journeys end well, not just quickly. Inputs: validation pass rate, outcome success rate, rework rate, override rate, reopening rate. Prevents optimising tempo at the expense of correctness.

See: JOURNEY_INTELLIGENCE.md §7.1
