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

## Journey Intelligence

Commander's capability for understanding how security work travels through the organisation from first signal to validated outcome. It is the measurement, attribution, optimisation and AI-grounding spine for Commander's security operating model. A peer capability to the Security OODA Loop (Spec #58) — OODA provides the vocabulary, Journey Intelligence provides the measurement. It is NOT a dashboard, reporting module, analyst productivity tool, click tracking, user surveillance, HR performance scoring, duplicate SIEM, or telemetry warehouse.

See: JOURNEY_INTELLIGENCE.md (JI-1.0).

## Journey

A complete lifecycle from first signal to validated outcome, anchor-agnostic. Bound to a primary entity (the journey anchor) such as a case, finding, mission, strategy, signal, push action, war room, IOC match, or exposure programme.

See: JOURNEY_INTELLIGENCE.md (JI-1.0) §4, §5.2.

## Journey Anchor

The primary entity a journey is bound to. Anchor types: case, finding, ioc_match, mission, strategy_policy, inbound_signal, push_action, war_room, exposure_programme.

See: JOURNEY_INTELLIGENCE.md (JI-1.0) §4.

## Delivery Mode

The execution mode of a journey or phase, progressing along the taxonomy: Manual → System Driven → AI Enhanced → Human Confirmed Automation → Autonomous.

See: JOURNEY_INTELLIGENCE.md (JI-1.0) §4, §11.

## Lifecycle Checkpoint

A meaningful state transition within a journey, drawn from a bounded enum (~35 values, capped at 50) grouped by OODA stage (Observe/Orient/Decide/Act).

See: JOURNEY_INTELLIGENCE.md (JI-1.0) §4, §5.1.

## Journey Template

The expected shape of a journey type — descriptive, not prescriptive. Deviation is detected and flagged, not prevented. ~33 templates across signal intake, enrichment, case lifecycle, action/execution, strategic/operational, and control/posture journeys.

See: JOURNEY_INTELLIGENCE.md (JI-1.0) §5.3, §6.

## Journey Leakage

Work that enters the lifecycle but never reaches a valid terminal outcome. Detected when a journey stalls past its template threshold.

See: JOURNEY_INTELLIGENCE.md (JI-1.0) §4, §7.9.

## Journey Tempo

Duration across a journey or per-OODA-phase, measured against template tempo thresholds.

See: JOURNEY_INTELLIGENCE.md (JI-1.0) §4, §7.4.

## Automation Friction

The resistance between decision and successful execution — derived from temporal gaps between audit events (drag, failure rate, rescue rate, retries, recovery).

See: JOURNEY_INTELLIGENCE.md (JI-1.0) §4, §7.6, §11.

## Autonomous Maturity

Delivery-mode progression over time per workflow type, tracking movement toward autonomous operation. AI must never recommend reducing human oversight based solely on maturity metrics.

See: JOURNEY_INTELLIGENCE.md (JI-1.0) §4, §7.7, §10.
