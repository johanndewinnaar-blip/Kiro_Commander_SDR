# CHANGELOG v1.3 — Baseline-Depth Remediation

**Date:** 2026-05-27

## Summary

v1.3 performs the narrow remediation requested in the v1.2 → v1.3 brief: deepen sixteen existing Kiro `requirements.md` files in place, append substantive EARS requirements under `## v1.3 baseline-depth requirements`, update coverage evidence, and bump version markers. No new Kiro specs, no repository restructuring, no application code, no live AWS resources and no real vendor integrations were added.

## Specs deepened

- `00-programme-foundation/requirements.md` — added 20 v1.3 EARS requirements. Sources translated: Spec #01 AI Build Agent Workflow, Spec #18 Unified Identity Architecture / register mismatch noted, Spec #56 Shell Reference vs Build Authority Doctrine.
- `02-design-system-ui-component-catalogue/requirements.md` — added 24 v1.3 EARS requirements. Sources translated: Spec #11a UI/UX Design System, Spec #11b Workspace & Dashboard Composition, Spec #41 Military-Intelligence UI Doctrine, Spec #43 Graph/Gauge/Overlay System, Spec #53 Shell UI Usability Correction.
- `03-seed-data-and-test-fixtures/requirements.md` — added 20 v1.3 EARS requirements. Sources translated: Spec #05 Data Connector Normalisation, Spec #12 SDR Normalisation Strategy, Spec #46 Canonical Terminology, Spec #61 Universal Security Signal Connector Contract.
- `04-data-model-canonical-entities/requirements.md` — added 22 v1.3 EARS requirements. Sources translated: Spec #03 Backend/API Architecture, Spec #05 Data Connector Normalisation, Spec #11b Workspace & Dashboard Composition, Spec #15 SIEM/SOAR Rule Generation, Spec #18 Unified Identity Architecture, Spec #20 Coordinated Push Group Schema.
- `07-vulnerability-management/requirements.md` — added 20 v1.3 EARS requirements. Sources translated: Spec #16 Performance/Scaling source-file mismatch noted, Spec #28 Strategic and Tactical Priority Framework, Spec #29 Universal Risk Object and Case Binding, Spec #60 Internal/External Attack Surface Framework, Spec #74 Context-Aware Drift Prioritisation Matrix.
- `12-architecture-topology/requirements.md` — added 20 v1.3 EARS requirements. Sources translated: Spec #21 BAS Connector Integration Contract, Spec #22 Architecture Intelligence Engine, Spec #33 Multi-Domain Fusion Map, Spec #43 Graph/Gauge/Overlay System, Spec #65 External Operating Picture Surface, Spec #66 Internal Operating Picture Surface.
- `17-mock-connectors/requirements.md` — added 20 v1.3 EARS requirements. Sources translated: Spec #05 Data Connector Normalisation, Spec #09 Connector Architecture, Spec #24 Connector API Reference Framework, Spec #61 Universal Security Signal Connector Contract, Spec #62 Verdict Semantics.
- `20-commander-ai-core/requirements.md` — added 20 v1.3 EARS requirements. Sources translated: Spec #13 Commander AI Architecture & Grounding Rules, Spec #26a Closed-Loop Email & Case Communication Lifecycle, Spec #34 Mission Control / Pulse source-file mismatch noted, Spec #59 Intelligence Layer Architecture, Spec #62 Verdict Semantics.
- `23-ciso-dashboard/requirements.md` — added 20 v1.3 EARS requirements. Sources translated: Spec #42 Domain Security Dashboards, Spec #65 External Operating Picture Surface, Spec #66 Internal Operating Picture Surface, Spec #67 OODA Dashboard Family, Spec #73 Silent Defence Reporting, Spec #74 Context-Aware Drift Prioritisation Matrix.
- `24-security-c2-p0-war-room/requirements.md` — added 20 v1.3 EARS requirements. Sources translated: Spec #40 P0 Zero-Day Priority Override, Spec #44 P0 Zero-Day War Room UI, Spec #58 Security OODA Loop, Spec #65 External Operating Picture Surface, Spec #66 Internal Operating Picture Surface, Spec #67 OODA Dashboard Family.
- `25-email-case-communication/requirements.md` — added 20 v1.3 EARS requirements. Sources translated: Spec #08 Case Management Workflow, Spec #26 Case Communication and Broadcast Channel, Spec #26a Closed-Loop Email Case Communication Lifecycle, Spec #49 Admin Control Surface Information Architecture.
- `28-audit-trail/requirements.md` — added 20 v1.3 EARS requirements. Sources translated: Spec #27 Shared Responsibility Profile & Configuration Governance, Spec #30 Universal Validation / Closure / Reopening, Spec #48 Audit Event Framework source-file mismatch noted, Spec #62 Verdict Semantics.
- `30-phase3-pilot-production-hardening/requirements.md` — added 20 v1.3 EARS requirements. Sources translated: Spec #16 Performance/Scaling, Spec #31 Routing Model and Team Affinity, Spec #44 P0 War Room UI, Spec #55 Baseline Configuration Framework, Spec #61 Universal Security Signal Connector Contract, Spec #73 Silent Defence Reporting.
- `31-devops-local-aws-alignment/requirements.md` — added 20 v1.3 EARS requirements. Sources translated: Spec #03 Backend/API Architecture, Spec #04 Frontend Architecture, Spec #06 Worker and Scheduling, Spec #16 Performance/Scaling and Operational.
- `32-platform-security-hardening/requirements.md` — added 20 v1.3 EARS requirements. Sources translated: Spec #02 DevOps/Environments/CI-CD, Spec #19 Full RBAC Permission Matrix, Spec #25 Trust Boundary & Third-Party Intelligence, Spec #27 Shared Responsibility Profile & Configuration Governance, Spec #48 Audit Event Framework, Spec #50 RBAC/Entitlement/Feature Flag/Menu Visibility.
- `33-observability-tool-health/requirements.md` — added 20 v1.3 EARS requirements. Sources translated: Spec #06 Worker and Scheduling, Spec #16 Performance/Scaling/Operational, Spec #23 Security Tool Intelligence, Spec #49 Admin Control Surface Information Architecture, Spec #61 Universal Security Signal Connector Contract.

## Decisions

- Recorded `DEC-v1.3-register-file-mismatch-depth-pass` in `DECISIONS.md` for register/file-title inconsistencies encountered during the depth pass.

## Companion files updated

- `docs/00_authority/SPEC_COVERAGE_MATRIX.md` — added `v1.3 deepened` column.
- `docs/00_authority/CONVERSION_FINDINGS.md` — appended v1.3 remediation section.
- `README.md`, `CONVERSION_REPORT.md`, `PACK_MANIFEST.md` — version markers updated to v1.3.
