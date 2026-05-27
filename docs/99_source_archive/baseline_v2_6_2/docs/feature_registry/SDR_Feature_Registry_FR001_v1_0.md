# SDR Feature Registry — Complete Feature Control Reference
## Document ID: FR-001 | Version: 1.0 | May 2026

**Purpose:** The exhaustive, canonical list of every discrete feature and capability in Commander SDR that can be independently controlled — at the operator level, at the tenant admin level, or at both. This is the single source of truth that the Control Plane Specification, the Tenant Admin Panel Specification, and AGENTS.md reference when implementing feature control logic.

**Authority:** This document is authoritative for feature flag keys, entitlement gate assignments, control scope (operator-only vs tenant-admin-configurable), and phase availability. Any implementation that controls feature availability must reference this registry.

**v2.5.1 Canonical-Source Declaration:** Per Spec #56 — Shell Reference vs Build Authority Doctrine — and `00_AUTHORITY_AND_PRECEDENCE_v2_5_2.md`, this Feature Registry is the canonical feature inventory source consumed by `BP-VIS-00 Route/Menu Registry Schema` and by `BP-VIS-01 Frontend Visibility Engine`. The active HTML shell references are not consulted for feature presence. A feature listed here shall be built, registered for build-mode visibility, and runtime-suppressed by RBAC/entitlement/feature-flag/policy state per Spec #50. A feature drawn in the HTML shell but absent from this Registry or the spec set is not authorised on the strength of that drawing alone — registry inclusion is the gate.

---

## Registry Structure

Each feature entry contains:
- **Flag key** — the programmatic identifier used in the entitlement manifest and feature flag system
- **Display name** — human-readable name shown in operator console and tenant admin panel
- **Commercial gate** — which entitlement category must be active (`core`, `push`, `commander`, `identity_advanced`, `compliance`, `architecture`, `detection_full`, `email_ingestion`, `analyst_passport`, `connected_architecture`)
- **Control scope** — who can toggle this feature: `operator-only` (only your team), `tenant-admin` (customer admin can also toggle), `operator-sets-tenant-configures` (operator enables, tenant admin fine-tunes within that)
- **Default state** — on or off when first entitled
- **Phase** — which phase this becomes available (0, 1, 2, 3)
- **MTS / Prop reference** — governing document section

---

## MODULE 1: CORE PLATFORM
*Commercial gate: `core` — included in all tiers*

### 1.1 Detection Engine

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.detection.stage1_rules` | Stage 1 Continuous Rule Evaluation | operator-only | ON | 0 | MTS 10.1 |
| `feat.detection.suppression` | Finding Suppression Engine | operator-only | ON | 0 | MTS 10.4 |
| `feat.detection.model_updates_auto` | Auto-activate New Detection Models | tenant-admin | ON | 1 | Prop 18.15 |
| `feat.detection.model_suppress_individual` | Per-model Suppression by Tenant | tenant-admin | ON | 1 | MTS 10.6 |
| `feat.detection.yaml_rule_evaluation` | YAML Rule Evaluation Engine | operator-only | ON | 0 | MTS 10.3 / OD-005 |
| `feat.detection.ghost_asset_detection` | Ghost Asset Detection | tenant-admin | ON | 1 | MTS 7.12 |
| `feat.detection.platform_health_signals` | Platform Health Signal Detection | operator-only | ON | 1 | Prop 6.1 |

### 1.2 Case Management — Core Lifecycle

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.case.creation_auto` | Automatic Case Creation from Findings | tenant-admin | ON | 0 | MTS 13.1 |
| `feat.case.lifecycle_state_machine` | Full Case Lifecycle State Machine | operator-only | ON | 0 | Spec #8 |
| `feat.case.trail_of_travel` | Immutable Trail of Travel | operator-only | ON | 0 | Prop 9.7 |
| `feat.case.sla_engine` | SLA Timer and Breach Engine | tenant-admin | ON | 1 | Prop 9.5 |
| `feat.case.approval_chain` | Case Approval Chain | tenant-admin | ON | 0 | Prop 9.6 |
| `feat.case.deduplication` | Case Deduplication and Enrichment | operator-only | ON | 0 | MTS 13.3 |
| `feat.case.audit_trail_integration` | Audit Trail Integration per Case Event | operator-only | ON | 0 | MTS 17.6 |
| `feat.case.priority_model` | P1–P4 Case Priority Model | operator-only | ON | 1 | Prop 9.19 |
| `feat.case.crs_score` | Case Risk Score (CRS) Computation | operator-only | ON | 1 | Spec #8 |
| `feat.case.next_best_action` | Next Best Action Engine | operator-only | ON | 1 | Spec #8 |
| `feat.case.phase_model` | Phase A / Phase B Case Model | operator-only | ON | 1 | Prop 9.30 |
| `feat.case.auto_resolved_detection` | AUTO-RESOLVED External Remediation Detection | operator-only | ON | 1 | MTS 13.31 |
| `feat.case.revalidation_continuous` | Continuous Case Revalidation | operator-only | ON | 1 | MTS 13.31 |
| `feat.case.focus_timer` | Case Focus Timer and Stalling Detection | tenant-admin | ON | 1 | MTS 13.32 |
| `feat.case.trajectory` | Case Trajectory Engine | operator-only | OFF | 2 | Prop 9.doc |
| `feat.case.resonance_conflict` | Case Resonance and Conflict Gate | operator-only | OFF | 2 | Prop 9.doc |
| `feat.case.association_pattern` | Case Association and Pattern Engine | operator-only | OFF | 2 | Prop 9.doc |
| `feat.case.resolution_durability` | Resolution Durability Score | operator-only | OFF | 2 | Prop 9.doc |

### 1.3 Case Types

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.case_type.security_operations` | Security Operations Cases | operator-only | ON | 0 | Prop 9.16 |
| `feat.case_type.vulnerability` | Vulnerability & Exposure Cases | operator-only | ON | 0 | Prop 9.16 |
| `feat.case_type.identity` | Identity Cases | operator-only | ON | 1 | Prop 9.16 |
| `feat.case_type.architecture` | Architecture Cases | operator-only | ON | 1 | Prop 9.16 |
| `feat.case_type.engineering_health` | Engineering Health Cases | operator-only | ON | 0 | Prop 9.16 |
| `feat.case_type.governance` | Governance Cases | operator-only | ON | 1 | Prop 9.16 |

### 1.4 Asset Registry

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.asset.registry` | Asset Registry and CMDB | operator-only | ON | 0 | MTS 7.1 |
| `feat.asset.ownership_hierarchy` | Asset Ownership Hierarchy | tenant-admin | ON | 1 | Prop 15.asset |
| `feat.asset.cartography_tags` | Asset Cartography and Tag System | tenant-admin | ON | 1 | MTS 7.15 |
| `feat.asset.lifecycle_classification` | Asset Lifecycle Classification | operator-only | ON | 1 | MTS 7.11 |
| `feat.asset.coverage_dashboard` | Asset CMDB & Control Coverage Dashboard | operator-only | ON | 1 | Prop 15.asset |
| `feat.asset.fully_covered_metric` | Fully Covered Metric | operator-only | ON | 1 | Prop 7.3 |
| `feat.asset.ghost_detection` | Ghost Asset Detection and Tombstoning | tenant-admin | ON | 1 | MTS 7.12 |
| `feat.asset.third_party_context` | Third-Party Context Fields | operator-only | ON | 1 | MTS 7.17 |
| `feat.asset.safe_view_mode` | Safe View Mode (UI masking) | operator-sets-tenant-configures | OFF | 1 | Prop 3090 |
| `feat.asset.rationalisation` | Asset Rationalisation Tracking | tenant-admin | OFF | 2 | Prop 3090 |

### 1.5 Coverage Control Model

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.coverage.scoring` | Coverage Control Scoring | operator-only | ON | 1 | Prop 7.1 |
| `feat.coverage.tag_driven_composable` | Tag-Driven Composable Coverage | tenant-admin | ON | 1 | Prop 7.7 |
| `feat.coverage.custom_stacks` | Custom Coverage Stack Definition | tenant-admin | ON | 1 | Prop 7.6 |
| `feat.coverage.threshold_config` | Coverage Score Threshold Configuration | tenant-admin | ON | 1 | MTS 7.3 |
| `feat.coverage.shared_responsibility` | Shared Responsibility Profiles | operator-sets-tenant-configures | ON | 1 | MTS 7.14 |
| `feat.coverage.trust_boundary` | Trust Boundary Entity and Detection | operator-only | ON | 1 | MTS 7.16 |

### 1.6 ITSM Integration

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.itsm.two_record_model` | ITSM Two-Record Model | tenant-admin | ON | 0 | Prop 9.3 |
| `feat.itsm.case_tracker_auto` | Auto-Create Security Case Tracker | tenant-admin | ON | 0 | MTS 13.15 |
| `feat.itsm.remediation_dispatch` | Remediation Dispatch Record | tenant-admin | ON | 0 | MTS 13.15 |
| `feat.itsm.status_sync` | ITSM Status Sync (SDR → ITSM) | tenant-admin | ON | 0 | MTS 13.15 |
| `feat.itsm.jira` | Jira Integration | operator-sets-tenant-configures | ON | 0 | Spec #8 |
| `feat.itsm.servicenow` | ServiceNow Integration | operator-sets-tenant-configures | OFF | 1 | MTS 13.15 |
| `feat.itsm.change_request` | Change Request Integration | tenant-admin | OFF | 1 | Prop 9.14 |

### 1.7 Universal Search

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.search.universal` | Universal Search | operator-only | ON | 1 | Prop 8.10 |
| `feat.search.entity_drill` | Entity Drill-Through from Search | operator-only | ON | 1 | Prop 8.10 |

### 1.8 Audit Trail

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.audit.immutable_trail` | Immutable Append-Only Audit Trail | operator-only | ON | 0 | MTS 17.6 |
| `feat.audit.hash_chain` | SHA-256 Hash Chain Tamper Evidence | operator-only | ON | 0 | MTS 17.6 |
| `feat.audit.export_regulator` | Regulator-Ready Audit Export | tenant-admin | ON | 1 | MTS 17.6a |
| `feat.audit.push_history` | Push Action History and Rollback Access | operator-only | ON | 1 | Prop 16.4 |
| `feat.audit.attestation` | Human Attestation for Regulatory Export | tenant-admin | ON | 1 | MTS 17.6a |

### 1.9 Connector Framework (Core 3 connectors)

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.connector.framework` | Connector Framework | operator-only | ON | 0 | Prop 8.1 |
| `feat.connector.health_monitoring` | Connector Health Monitoring | operator-only | ON | 1 | Prop 8.1 |
| `feat.connector.onboarding_wizard` | Connector Onboarding Wizard | operator-only | ON | 1 | Prop 8.2 |
| `feat.connector.api_scope_validation` | API Scope and Permission Validation | operator-only | ON | 1 | Prop 8.3 |
| `feat.connector.checkpoint_delta_sync` | Checkpoint-Based Delta Sync | operator-only | ON | 0 | MTS 8.5 |
| `feat.connector.admin_dashboard` | Connector Administration Dashboard | operator-only | ON | 1 | Prop 16.1 |
| `feat.connector.api_rule_registry` | API-to-Rule Mapping Registry | operator-only | ON | 1 | Prop 16.2 |

### 1.10 Notification and Escalation

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.notification.case_sla_breach` | SLA Breach Notifications | tenant-admin | ON | 1 | Prop 9.12 |
| `feat.notification.auto_escalation` | Automatic Threshold-Based Escalation | tenant-admin | ON | 1 | Prop 9.12 |
| `feat.notification.manual` | Manual Notifications from Case | tenant-admin | ON | 1 | Prop 9.12 |
| `feat.notification.maintenance_window` | Maintenance Window Notifications | operator-only | ON | 1 | MTS 18.16 |
| `feat.notification.feature_announcements` | In-App Feature Announcements | operator-only | ON | 1 | MTS 18.16 |
| `feat.notification.deprecation_notices` | Deprecation Notices | operator-only | ON | 1 | MTS 18.16 |

### 1.11 RBAC and User Management

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.rbac.persona_model` | Nine-Persona RBAC Model | operator-only | ON | 0 | Prop 17.1 |
| `feat.rbac.grade_model` | L0–L3 User Grade Model | operator-only | ON | 1 | Prop 17.2 |
| `feat.rbac.domain_scoping` | Domain Scope Filtering | operator-only | ON | 1 | Prop 17.3 |
| `feat.rbac.auto_compute` | Auto-Computed Permissions from Persona+Grade+Domain | operator-only | ON | 1 | Prop 17.4 |
| `feat.rbac.jit_group_mapping` | IdP Group to SDR Role JIT Mapping | tenant-admin | OFF | 1 | MTS 17.15 |
| `feat.rbac.auto_provision` | Auto-Provision Users on First SSO Login | tenant-admin | ON | 1 | MTS 17.15 |

### 1.12 ROI Instrumentation

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.roi.savings_tracking` | Analyst Time Savings Instrumentation | operator-only | ON | 1 | Prop 4 |
| `feat.roi.report_generation` | ROI Report Auto-Generation | tenant-admin | ON | 1 | Prop 15a |
| `feat.roi.analyst_cost_rate_config` | Configurable Analyst Cost Rate | tenant-admin | ON | 1 | Prop 15a |
| `feat.roi.scheduled_reports` | Scheduled ROI Report Delivery | tenant-admin | OFF | 1 | Prop 15a |

---

## MODULE 2: DETECTION FULL
*Commercial gate: `detection_full` — Professional tier and above*

### 2.1 Full Detection Library

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.detect_full.model_library_240` | Full ~240 Built-in Model Library | operator-only | ON | 1 | Prop 11.1 |
| `feat.detect_full.model_detail_view` | Detection Model Detail View | operator-only | ON | 1 | Prop 11.3 |
| `feat.detect_full.model_builder` | Model Builder (advanced rule authoring) | tenant-admin | ON | 1 | Prop 11.4 |
| `feat.detect_full.custom_rule_builder` | Custom Rule Builder | tenant-admin | ON | 1 | Prop 11.4 |
| `feat.detect_full.rule_staging` | Rule Test-to-Live Staging Lifecycle | tenant-admin | ON | 1 | Prop 11.4 |
| `feat.detect_full.rule_versioning` | Rule Versioning and Rollback | operator-only | ON | 1 | MTS 10.8 |
| `feat.detect_full.domain_models_cloud` | Cloud Domain Detection Models | operator-only | ON | 1 | MTS 10.domain |
| `feat.detect_full.domain_models_network` | Network Domain Detection Models | operator-only | ON | 1 | MTS 10.domain |
| `feat.detect_full.domain_models_endpoint` | Endpoint Domain Detection Models | operator-only | ON | 1 | MTS 10.domain |
| `feat.detect_full.domain_models_identity` | Identity Domain Detection Models | operator-only | ON | 1 | MTS 10.domain |
| `feat.detect_full.domain_models_vuln` | Vulnerability Domain Detection Models | operator-only | ON | 1 | MTS 10.domain |
| `feat.detect_full.domain_models_saas` | SaaS Policy Drift Detection Models | operator-only | ON | 2 | Prop 15 |
| `feat.detect_full.endpoint_saas_guardrails` | Endpoint & SaaS Policy Guardrails | operator-only | OFF | 2 | Prop 15 |
| `feat.detect_full.dynamic_detection_eng` | Dynamic Detection Engineering | operator-only | ON | 2 | Prop 15 |

### 2.2 Threat Intelligence

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.threat_intel.commander_triage` | Commander Intelligent Threat Triage | operator-only | ON | 1 | Prop 15 |
| `feat.threat_intel.threat_mailbox` | Commander Threat Mailbox | tenant-admin | ON | 1 | Prop 14.3 |
| `feat.threat_intel.ioc_correlation` | IOC-to-Estate Correlation | operator-only | ON | 1 | MTS 13.threat |
| `feat.threat_intel.kev_tracking` | CISA KEV Status Tracking | operator-only | ON | 1 | MTS 7.vuln |
| `feat.threat_intel.bas_integration` | BAS (Breach and Attack Simulation) Integration | operator-only | OFF | 2 | Prop 12 |
| `feat.threat_intel.behavioural_intel` | User & Endpoint Behavioural Intelligence | operator-only | OFF | 2 | Prop 15 |

### 2.3 SIEM/SOAR Rule Generation

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.siem_soar.rule_generation` | SIEM/SOAR Detection Specification Generation | operator-only | ON | 1 | Prop 12 |
| `feat.siem_soar.rule_handoff` | Detection Rule Handoff to SIEM/SOAR | tenant-admin | ON | 1 | Prop 12 |
| `feat.siem_soar.rule_retirement` | Auto-Retirement on Root Cause Resolution | operator-only | ON | 1 | Prop 12 |

---

## MODULE 3: PUSH EXECUTION
*Commercial gate: `push` — Professional tier and above*

### 3.1 Push Fundamentals

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.push.gate_approval_only` | Push Gate (Approval Only — No Execution) | operator-only | ON | 0 | MTS 14 / P0-12 |
| `feat.push.single_system` | Single-System Push Execution | operator-sets-tenant-configures | OFF | 1 | Prop 3 |
| `feat.push.payload_preview` | Push Payload Preview | operator-only | ON | 1 | MTS 14 |
| `feat.push.impact_assessment` | Pre-Push Impact Assessment | operator-only | ON | 1 | MTS 14 |
| `feat.push.rollback` | Push Action Rollback | operator-only | ON | 1 | MTS 14 |
| `feat.push.audit_record` | Push Action Audit Record | operator-only | ON | 1 | MTS 14 |
| `feat.push.per_connector_enable` | Per-Connector Push Enablement Toggle | operator-sets-tenant-configures | OFF | 1 | Prop 8.4 |
| `feat.push.licence_check` | Push Licence Check at Proposal | operator-only | ON | 1 | MTS 14 |

### 3.2 Advanced Push

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.push.coordinated_groups` | Coordinated Multi-System Push Groups | operator-sets-tenant-configures | OFF | 1 | Prop 8.7 |
| `feat.push.group_rollback` | Automated Group Rollback on Failure | operator-only | ON | 1 | Prop 8.7 |
| `feat.push.red_button_isolation` | Emergency Device Isolation (Red Button) | operator-sets-tenant-configures | OFF | 1 | Prop 9.9 |
| `feat.push.referral_workflow` | Push Referral Workflow | tenant-admin | ON | 1 | Prop 9.23 |
| `feat.push.dismissal_codes` | Push Dismissal Code Tracking | tenant-admin | ON | 1 | Prop 9.23 |
| `feat.push.change_control_cab` | Change Control / CAB Alignment | tenant-admin | OFF | 2 | Prop 9.14 |

### 3.3 Push Governance

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.push.risk_classification` | Push Action Risk Classification | operator-only | ON | 1 | Prop 9.23 |
| `feat.push.approval_routing` | Risk-Based Approval Routing | operator-only | ON | 1 | Prop 9.6 |
| `feat.push.monthly_budget` | Monthly Push Action Budget Enforcement | operator-sets-tenant-configures | ON | 1 | MTS 17.14 |

---

## MODULE 4: COMMANDER AI
*Commercial gate: `commander` — Professional tier and above*

### 4.1 Core Commander

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.commander.byom_framework` | BYOM AI Framework | operator-only | ON | 1 | Prop 14.1 |
| `feat.commander.model_provider_config` | Model Provider Configuration | operator-sets-tenant-configures | ON | 1 | Prop 14.4 |
| `feat.commander.validation_safety_gates` | Output Validation and Safety Gates | operator-only | ON | 1 | Prop 14.3 |
| `feat.commander.grounding_pipeline` | Deterministic Grounding Pipeline | operator-only | ON | 1 | Prop 14.3 |
| `feat.commander.prompt_templates` | SDR Prompt Template Library | operator-only | ON | 1 | Prop 14.5 |
| `feat.commander.rbac_enforcement` | Commander RBAC Domain Enforcement | operator-only | ON | 1 | Prop 14.6 |
| `feat.commander.health_monitoring` | Commander Health Monitoring | operator-only | ON | 1 | Prop 14.4 |
| `feat.commander.token_visibility` | Token Consumption Visibility Dashboard | tenant-admin | ON | 1 | Prop 14.4 |
| `feat.commander.rpm_limit` | Commander Request Rate Limiting | operator-sets-tenant-configures | ON | 1 | MTS 17.14 |

### 4.2 Commander Operating Modes

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.commander.mode_estate` | Estate Mode | operator-sets-tenant-configures | ON | 1 | Prop 14.2 |
| `feat.commander.mode_engineering` | Engineering Mode | operator-sets-tenant-configures | ON | 1 | Prop 14.2 |
| `feat.commander.mode_architecture` | Architectural Mode | operator-sets-tenant-configures | ON | 1 | Prop 14.2 |
| `feat.commander.mode_threat_triage` | Threat Triage Mode | operator-sets-tenant-configures | ON | 1 | Prop 14.2 |

### 4.3 Commander Intelligence Tiers

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.commander.tier_l1_summarisation` | L1 Deterministic Summarisation | operator-only | ON | 1 | Prop 14.8 |
| `feat.commander.tier_l2_correlation` | L2 Correlation and Advisory | operator-only | ON | 1 | Prop 14.8 |
| `feat.commander.tier_l3_architecture` | L3 Architectural Reasoning | operator-only | ON | 2 | Prop 14.8 |

### 4.4 Commander Case Integration

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.commander.auto_case_summary_p1p2` | Auto Case Summary for P1/P2 Cases | operator-only | ON | 1 | Prop 14.7 |
| `feat.commander.on_demand_analysis` | On-Demand Deep Analysis | operator-only | ON | 1 | Prop 14.7 |
| `feat.commander.conversational_followup` | Interactive Conversational Follow-Up | operator-only | ON | 1 | Prop 14.7 |
| `feat.commander.reviews` | Commander Reviews (linked case generation) | operator-only | ON | 1 | Prop 9.18 |
| `feat.commander.thematic_intelligence` | Commander Thematic Intelligence | operator-only | OFF | 2 | Prop 9.doc |
| `feat.commander.institutional_memory` | Platform Institutional Memory | operator-only | OFF | 2 | Prop 9.doc |

### 4.5 Commander Multi-Agent

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.commander.multi_agent_model` | Multi-Agent Operating Model | operator-only | OFF | 2 | Prop 14.8 |
| `feat.commander.agent_teams` | Agent Teams | operator-only | OFF | 2 | Prop 14.9 |
| `feat.commander.agent_grades` | Agent Grade Enforcement | operator-only | OFF | 2 | Prop 14.10 |

---

## MODULE 5: ADVANCED IDENTITY INTELLIGENCE
*Commercial gate: `identity_advanced` — Enterprise tier and above*

### 5.1 Identity Computation

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.identity.stage1_continuous` | Stage 1 Continuous Rule-Based Detection | operator-only | ON | 1 | Prop 13.1 |
| `feat.identity.stage2_triggered` | Stage 2 Triggered Chain Computation | operator-only | ON | 1 | Prop 13.1 |
| `feat.identity.stage3_sweep` | Stage 3 Configurable Full Estate Sweep | operator-sets-tenant-configures | ON | 1 | Prop 13.1 |
| `feat.identity.stage3_schedule` | Stage 3 Sweep Schedule Configuration | tenant-admin | ON | 1 | Prop 16.5 |
| `feat.identity.chain_14_rules` | 14 Stage 1 Identity Chain Detection Rules | operator-only | ON | 1 | Prop 11.2 |
| `feat.identity.access_path_scoring` | Access Path Risk Scoring | operator-only | ON | 1 | Prop 13.2 |
| `feat.identity.connected_chain_mgmt` | Connected Access Chain Management | operator-only | ON | 1 | Prop 13.3 |
| `feat.identity.group_intelligence` | Security Group Intelligence | operator-only | ON | 1 | Prop 13.4 |
| `feat.identity.risk_score` | Identity Risk Score (composite 10-factor) | operator-only | ON | 1 | MTS 15 |
| `feat.identity.risk_weight_config` | Identity Risk Score Weight Configuration | tenant-admin | ON | 1 | Prop 16.5 |
| `feat.identity.high_risk_watchlist` | High-Risk User Watchlist | operator-only | ON | 1 | MTS 15 |
| `feat.identity.blast_radius_identity` | Identity-Centric Blast Radius | operator-only | ON | 1 | Prop 15 |
| `feat.identity.behavioural_signals` | Behavioural Signal Aggregation per Identity | operator-only | OFF | 2 | Prop 15 |
| `feat.identity.offboarding_detection` | Offboarded Identity Access Detection | operator-only | ON | 1 | Prop 11.2 |

### 5.2 Analyst Operational Passport
*Commercial gate: `analyst_passport`*

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.passport.individual_accrual` | Individual Passport Accrual | operator-only | ON | 1 | Prop 17.6 |
| `feat.passport.specialism_designations` | Specialism Designations (9 domains × 3 tiers) | operator-only | ON | 1 | Prop 17.6 |
| `feat.passport.achievement_framework` | Achievement Framework | operator-only | ON | 1 | Prop 17.6 |
| `feat.passport.hash_chain_credentials` | Immutable Hash Chain Credentials | operator-only | ON | 1 | Prop 17.6 |
| `feat.passport.cross_tenant_portability` | Cross-Tenant Portability | operator-only | ON | 1 | Prop 17.6 |
| `feat.passport.third_party_verification` | Third-Party Credential Verification | operator-only | OFF | 2 | Prop 17.6 |
| `feat.passport.enterprise_analytics` | Enterprise Passport Analytics Dashboard | operator-only | OFF | 2 | Prop 17.7 |
| `feat.passport.team_benchmarking` | Cross-Team Benchmarking | operator-only | OFF | 2 | Prop 17.7 |
| `feat.passport.specialism_coverage_report` | Team Specialism Coverage Report | operator-only | OFF | 2 | Prop 17.7 |

---

## MODULE 6: COMPLIANCE & POSTURE INTELLIGENCE
*Commercial gate: `compliance` — Enterprise tier and above*

### 6.1 Compliance Framework

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.compliance.four_layer_model` | Four-Layer Compliance Model | operator-only | ON | 1 | Prop 10.1 |
| `feat.compliance.framework_mapping` | Compliance Framework Control Mapping | tenant-admin | ON | 1 | Prop 10.2 |
| `feat.compliance.posture_scoring` | Compliance Posture Scoring | operator-only | ON | 1 | Prop 10.1 |
| `feat.compliance.baseline_templates` | Security Configuration Baseline Templates | tenant-admin | ON | 1 | Prop 10.4 |
| `feat.compliance.baseline_mgmt` | Policy Baseline Management | tenant-admin | ON | 1 | Prop 10.3 |
| `feat.compliance.evidence_packs` | Evidence Pack Assembly | operator-only | ON | 1 | Prop 10.2 |
| `feat.compliance.evidence_export` | Evidence Pack Export | tenant-admin | ON | 1 | Prop 10.2 |
| `feat.compliance.regulatory_calendar` | Regulatory Calendar | tenant-admin | ON | 1 | Prop 10.2 |
| `feat.compliance.exception_waiver` | Exception and Waiver Management | tenant-admin | ON | 1 | Prop 15 |
| `feat.compliance.framework_version_notify` | Framework Version Update Notifications | tenant-admin | ON | 1 | MTS 18.15 |

### 6.2 Vulnerability Management

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.vuln.tracker` | Vulnerability & Exposure Case Tracker | operator-only | ON | 1 | Prop 15 |
| `feat.vuln.monitoring` | Vulnerability Monitoring | operator-only | ON | 1 | Prop 15 |
| `feat.vuln.exposure_validation` | Exposure Validation | operator-only | OFF | 2 | Prop 15 |
| `feat.vuln.external_exposure_summary` | External Exposure Summary | operator-only | ON | 1 | Prop 15 |
| `feat.vuln.kev_tracking` | CISA KEV Status Integration | operator-only | ON | 1 | MTS 7.vuln |
| `feat.vuln.playbook_library` | Vulnerability Playbook Library | tenant-admin | ON | 1 | Prop 15 |

---

## MODULE 7: ARCHITECTURE INTELLIGENCE
*Commercial gate: `architecture` — Enterprise tier and above*

### 7.1 Architecture Analysis

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.arch.design_incongruence` | Design Incongruence Detection | operator-only | ON | 1 | Prop 9.17 |
| `feat.arch.anti_pattern_library` | Architecture Anti-Pattern Library | operator-only | ON | 1 | Prop 15 |
| `feat.arch.policy_conflict_detection` | Policy Conflict Detection | operator-only | ON | 1 | Prop 15 |
| `feat.arch.live_topology` | Live Security Topology Map | operator-only | ON | 1 | Prop 15 |
| `feat.arch.coverage_map` | Architecture Coverage Map | operator-only | ON | 1 | Prop 15 |
| `feat.arch.baseline_enforcement` | Continuous Baseline Enforcement | operator-only | ON | 1 | Prop 15 |
| `feat.arch.architect_dashboard` | Security Architect Dashboard (Architect View) | operator-only | ON | 1 | Prop 15 |
| `feat.arch.architect_reporting` | Automated Architect Reports | tenant-admin | ON | 2 | Prop 15 |

### 7.2 Security Debt Register

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.debt.register` | Security Debt Register | operator-only | ON | 1 | Prop 15 |
| `feat.debt.cost_modelling` | Debt Cost Modelling (capex/opex/effort) | operator-only | ON | 1 | Prop 15 |
| `feat.debt.by_domain` | Debt View by Domain | operator-only | ON | 1 | Prop 15 |
| `feat.debt.by_business_unit` | Debt View by Business Unit | operator-only | ON | 2 | Prop 15 |
| `feat.debt.trend_tracking` | Debt Trend Tracking | operator-only | ON | 2 | Prop 15 |
| `feat.debt.accepted_exceptions` | Debt Accepted with Exception Record | tenant-admin | ON | 1 | Prop 15 |
| `feat.debt.refresh_recast_planner` | Security Refresh and Recast Planner | operator-only | ON | 2 | Prop 15 |
| `feat.debt.investment_case` | CISO Investment Case Generation | operator-only | ON | 2 | Prop 15 |
| `feat.debt.commander_resolvability` | Commander Resolvability Split | operator-only | ON | 1 | Prop 15 |

### 7.3 Attack Path and Blast Radius

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.attack.blast_radius_asset` | Asset-Centric Blast Radius | operator-only | ON | 1 | Prop 15 |
| `feat.attack.blast_radius_vuln` | Vulnerability-Centric Blast Radius | operator-only | ON | 1 | Prop 15 |
| `feat.attack.blast_radius_visualisation` | Blast Radius Interactive Visualisation | operator-only | ON | 1 | Prop 15 |
| `feat.attack.path_likelihood_engine` | Attack Path Likelihood Engine | operator-only | ON | 1 | Prop 15 |
| `feat.attack.path_simulation` | Simulate Attack Path (per case) | operator-only | ON | 1 | Prop 15 |
| `feat.attack.prebuilt_scenarios` | Pre-Built Attack Scenario Templates | operator-only | ON | 1 | Prop 15 |
| `feat.attack.bas_overlay` | BAS Exploitability Overlay | operator-only | OFF | 2 | Prop 12 |
| `feat.attack.likelihood_priority_adjust` | Likelihood-Adjusted Case Priority | operator-only | ON | 1 | Prop 15 |
| `feat.attack.likelihood_sla_adjust` | Likelihood-Adjusted SLA Policies | tenant-admin | OFF | 2 | Prop 15 |

### 7.4 Security Tool Intelligence

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.tool_intel.value_cards` | Tool Value Cards | operator-only | ON | 2 | Prop 4 |
| `feat.tool_intel.overlap_matrix` | Tool Overlap Detection Matrix | operator-only | ON | 2 | Prop 4 |
| `feat.tool_intel.removal_simulation` | Tool Removal Impact Simulation | operator-only | ON | 2 | Prop 4 |
| `feat.tool_intel.console_utilisation` | Console Utilisation Tracking | operator-only | ON | 2 | Prop 16 |

---

## MODULE 8: EMAIL INGESTION
*Commercial gate: `email_ingestion` — Add-on module*

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.email.closed_loop_mode` | Closed-Loop Email Communication Mode | operator-sets-tenant-configures | OFF | 1 | Prop 9.27A |
| `feat.email.outbound_case_email` | Outbound Case Email from Panel | tenant-admin | ON | 1 | Spec #26a |
| `feat.email.inbound_reply_correlation` | Inbound Reply Correlation to Case | operator-only | ON | 1 | Spec #26a |
| `feat.email.user_mailbox` | User Mailbox Support | tenant-admin | ON | 1 | Spec #26a |
| `feat.email.shared_mailbox` | Shared Mailbox Support | tenant-admin | ON | 1 | Spec #26a |
| `feat.email.group_mailbox` | Microsoft 365 Group Mailbox Support | tenant-admin | ON | 1 | Spec #26a |
| `feat.email.sla_reminders` | SLA-Driven Email Reminders | tenant-admin | ON | 1 | Spec #26a |
| `feat.email.no_response_escalation` | No-Response Escalation | tenant-admin | ON | 1 | Spec #26a |
| `feat.email.vuln_notification_ingestion` | Vulnerability Notification Email Ingestion | operator-sets-tenant-configures | OFF | 1 | Spec #26a |
| `feat.email.ioc_email_triage` | IOC Email Triage and Case Generation | operator-sets-tenant-configures | OFF | 1 | Spec #26a |
| `feat.email.threat_advisory_parsing` | Threat Advisory Email Parsing | operator-sets-tenant-configures | OFF | 1 | Spec #26a |
| `feat.email.approved_mailbox_config` | Approved Mailbox Configuration | tenant-admin | ON | 1 | Spec #26a |
| `feat.email.graph_conversation_tracking` | Microsoft Graph Conversation Tracking | operator-only | ON | 1 | Spec #26a |

---

## MODULE 9: CONNECTED ARCHITECTURE
*Commercial gate: `connected_architecture` — Premium add-on £50k/yr*

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.connected.multi_env_canonical_model` | Multi-Environment Canonical Entity Model | operator-only | ON | 1 | Prop 4 |
| `feat.connected.cross_cloud_correlation` | Cross-Cloud Risk Correlation | operator-only | ON | 1 | Prop 4 |
| `feat.connected.group_ciso_view` | Group CISO View Across Entities | operator-only | ON | 1 | Prop 19.1 |
| `feat.connected.subsidiary_rollup` | Subsidiary Posture Rollup | operator-only | ON | 1 | Prop 19.1 |
| `feat.connected.cross_entity_comparison` | Cross-Entity Posture Comparison | operator-only | ON | 1 | Prop 19.1 |
| `feat.connected.ma_analyst_mode` | M&A / Transformation Analyst Mode | operator-only | OFF | 2 | Prop 17.1 |
| `feat.connected.trust_boundary_cross_env` | Cross-Environment Trust Boundary Detection | operator-only | ON | 1 | Prop 4 |
| `feat.connected.third_party_visibility` | Third-Party Visibility Intelligence | operator-only | ON | 1 | Prop 4 |
| `feat.connected.unlimited_chained_envs` | Unlimited Chained Environments | operator-only | ON | 1 | Commercial model |

---

## MODULE 10: CASE COMMUNICATION
*Commercial gate: `core` — available to all tiers, channels configured by tenant*

### 10.1 Microsoft Teams Integration

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.teams.case_chat` | Teams Case Chat (start/continue) | operator-sets-tenant-configures | OFF | 1 | Prop 9.27 |
| `feat.teams.one_click_call` | One-Click Teams Call from Case | tenant-admin | ON | 1 | Prop 9.27 |
| `feat.teams.meeting_schedule` | Teams Meeting Scheduling from Case | tenant-admin | ON | 1 | Prop 9.27 |
| `feat.teams.transcript_import` | On-Demand Transcript Import | tenant-admin | ON | 1 | Prop 9.27 |
| `feat.teams.command_bridge` | Command Bridge (management channel escalation) | operator-sets-tenant-configures | OFF | 1 | Prop 9.28 |
| `feat.teams.ops_channel_broadcast` | Operations Channel Broadcast | operator-sets-tenant-configures | OFF | 1 | Prop 9.29 |

### 10.2 Slack Integration (Phase 2)

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.slack.case_chat` | Slack Case Chat | operator-sets-tenant-configures | OFF | 2 | Prop 9.27 |
| `feat.slack.command_bridge` | Slack Command Bridge | operator-sets-tenant-configures | OFF | 2 | Prop 9.28 |
| `feat.slack.ops_channel_broadcast` | Slack Operations Channel Broadcast | operator-sets-tenant-configures | OFF | 2 | Prop 9.29 |

---

## MODULE 11: SOM AND CASE PULSE
*Commercial gate: `core` — available to all tiers*

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.som.case_pulse` | Case Pulse Dashboard | operator-only | ON | 1 | Prop 9.doc |
| `feat.som.mdr_mode` | MDR Operating Mode | operator-sets-tenant-configures | OFF | 1 | Prop 9.doc |
| `feat.som.manual_mode` | Manual Operating Mode | operator-sets-tenant-configures | ON | 1 | Prop 9.doc |
| `feat.som.hybrid_mode` | Hybrid Operating Mode | operator-sets-tenant-configures | OFF | 1 | Prop 9.doc |
| `feat.som.team_intelligence` | Team Intelligence Model | operator-only | ON | 1 | Prop 17.7 |
| `feat.som.performance_dashboard` | Team Performance Dashboard | operator-only | ON | 2 | Prop 17.7 |
| `feat.som.strategic_priority` | Strategic Priority Framework | operator-sets-tenant-configures | OFF | 2 | Prop 19.2 |
| `feat.som.tactical_priority` | Tactical Priority Framework | operator-sets-tenant-configures | OFF | 2 | Prop 19.2 |
| `feat.som.bau_protection` | BAU Protection Mechanism | tenant-admin | OFF | 2 | Prop 19.2 |

---

## MODULE 12: CASE WORKFLOW ADVANCED
*Commercial gate: `core` with some `push` gates*

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.workflow.batch_processing` | Batch Case Processing | operator-only | ON | 1 | Prop 9.26 |
| `feat.workflow.case_swarm` | Case Swarm (multi-analyst) | tenant-admin | ON | 1 | Prop 9.40 |
| `feat.workflow.case_collaboration` | Case Collaboration (contributors) | tenant-admin | ON | 1 | Prop 9.21 |
| `feat.workflow.sir` | Security Incident Referral (SIR) | operator-sets-tenant-configures | ON | 1 | Prop 9.25 |
| `feat.workflow.manual_remediation` | Manual Remediation Guidance | operator-only | ON | 1 | Prop 9.24 |
| `feat.workflow.compensating_controls` | Compensating Control Recommendations | operator-only | ON | 1 | Prop 9.4 |
| `feat.workflow.case_notes_metrics` | Case Notes, Metrics, and Workload Management | tenant-admin | ON | 1 | Prop 9.20 |
| `feat.workflow.business_impact_translation` | Business Impact Translation | operator-only | ON | 1 | Prop 9.doc |

---

## MODULE 13: REPORTING AND DASHBOARDS

| Flag Key | Display Name | Control Scope | Default | Phase | Reference |
|---|---|---|---|---|---|
| `feat.report.ciso_view` | CISO View Dashboard | operator-only | ON | 1 | Prop 15 |
| `feat.report.domain_dashboards` | Domain Security Dashboards (5 domains) | operator-only | ON | 1 | Prop 19.1 |
| `feat.report.pdf_export` | PDF Report Export | tenant-admin | ON | 1 | Prop 15 |
| `feat.report.scheduled_generation` | Scheduled Report Generation | tenant-admin | OFF | 2 | Prop 15 |
| `feat.report.identity_risk_report` | Identity Risk Distribution Report | operator-only | ON | 1 | Prop 15 |
| `feat.report.access_chain_report` | Connected Access Chain Report | operator-only | ON | 1 | Prop 15 |
| `feat.report.standing_access_report` | Standing Privileged Access Report | operator-only | ON | 1 | Prop 15 |
| `feat.report.posture_compliance_report` | Posture and Compliance Framework Report | operator-only | ON | 1 | Prop 15 |
| `feat.report.vulnerability_posture` | Vulnerability Posture Report | operator-only | ON | 1 | Prop 15 |
| `feat.report.debt_register_report` | Security Debt Register Report | operator-only | ON | 2 | Prop 15 |
| `feat.report.kev_exposure_report` | KEV Exposure Report | operator-only | ON | 1 | Prop 15 |
| `feat.report.platform_health_report` | Platform Health Report | operator-only | ON | 1 | Prop 15 |
| `feat.report.coverage_control_report` | Coverage Control Score Report | operator-only | ON | 1 | Prop 15 |

---

## Registry Summary

| Module | Flag count | Operator-only | Tenant-admin | Operator-sets-tenant-configures |
|---|---|---|---|---|
| 1. Core Platform | 87 | 61 | 21 | 5 |
| 2. Detection Full | 18 | 14 | 2 | 2 |
| 3. Push Execution | 16 | 10 | 3 | 3 |
| 4. Commander AI | 22 | 16 | 3 | 3 |
| 5. Identity Advanced + Passport | 23 | 18 | 3 | 2 |
| 6. Compliance | 16 | 10 | 6 | 0 |
| 7. Architecture Intelligence | 27 | 20 | 5 | 2 |
| 8. Email Ingestion | 13 | 7 | 5 | 1 (mailboxes) |
| 9. Connected Architecture | 9 | 9 | 0 | 0 |
| 10. Case Communication | 13 | 2 | 7 | 4 |
| 11. SOM and Case Pulse | 10 | 4 | 1 | 5 |
| 12. Case Workflow Advanced | 8 | 5 | 3 | 0 |
| 13. Reporting and Dashboards | 13 | 11 | 2 | 0 |
| **TOTAL** | **275** | **187** | **61** | **27** |

275 discrete feature controls across 13 modules. 187 operator-only. 61 tenant-admin configurable. 27 operator-sets-then-tenant-configures (operator enables the capability, tenant admin fine-tunes it).


---

# DOCUMENT-SPECIFIC REVISION PATCH — SDR_Feature_Registry_FR001_v1_0.md

**Patch date:** 2026-05-13  
**Patch type:** Functional review remediation  
**Authority:** Closed-loop doctrine patch v2.0  

## Required Update Applied

This feature registry is updated with closed-loop enforcement, universal lifecycle, Fusion Map, Strategy Centre, Mission Control, and pulse features.

## Mandatory Build Interpretation

- Any previous language in this document that permits manual case creation, manual lifecycle progression, manual closure, manual reopening, optional case promotion for actionable risk, or unbound risk handling is superseded.
- Manual remediation remains permitted only as a remediation execution method, not as a case lifecycle authority.
- Manual evidence, manual acknowledgement, manual approval, and manual challenge are permitted only as audited inputs to deterministic system decisions.
- Every feature in this document SHALL define case binding, sub-action binding, validation state, closure gate, reopening trigger, routing decision, prioritisation impact, strategy dependency, UI surface, and Fusion Map binding before implementation.


---

# REVISION ADDENDUM — CLOSED-LOOP FUNCTIONAL DOCTRINE PATCH v2.0

**Status:** SUPERSEDING ADDENDUM  
**Effective date:** 2026-05-13  
**Applies to:** all Commander SDR functional, technical, UI, case, workflow, routing, strategy, communication, validation, automation, data model, and build artefacts.

## 1. Supersession Rule

Where this document previously permits or implies any of the following, this addendum supersedes that language:

- manual freeform case creation;
- manual lifecycle progression;
- manual case closure;
- manual case reopening;
- unbound findings;
- optional case promotion for risk objects;
- lifecycle decisions owned by analysts rather than deterministic system rules;
- UI controls that mutate lifecycle state directly;
- case assignment modes that prevent deterministic routing from producing an auditable route decision.

Human users may submit evidence, approve governed exceptions, approve high-risk automation, challenge a system decision, request validation refresh, request routing review, prioritise work, annotate records, and confirm business context. Human users do not directly create, close, reopen, or progress lifecycle state.

## 2. Non-Negotiable Closed-Loop Doctrine

Commander SDR SHALL enforce the following doctrine:

1. **No manual case creation.** Cases are generated only from normalised risk objects, communication-ingested risk objects, tool-health objects, exposure objects, drift objects, vulnerability objects, control objects, identity objects, coverage objects, architecture objects, blast-radius objects, or governed residual-risk/debt objects.
2. **Every risk object is case-bound.** No risk object may remain operationally actionable without a parent case or a deterministic case-linking decision.
3. **Prioritisation-only interaction.** Operators may prioritise, annotate, challenge, approve, suppress, or provide evidence. They may not directly mutate lifecycle state.
4. **Automatic routing.** The routing engine SHALL produce the route, owner, team, approval path, escalation path, and rationale for every case and blocking sub-action.
5. **Automatic sub-action generation.** The case engine SHALL generate sub-actions from risk decomposition, remediation options, validation dependencies, communication requirements, ownership boundaries, push requirements, and approval requirements.
6. **Automatic validation.** Technical validation SHALL be system-owned and evidence-driven.
7. **Automatic closure.** Closure SHALL be system-owned and SHALL occur only when all configured closure gates are satisfied.
8. **Automatic reopening.** Reopening SHALL be system-owned and SHALL occur when any configured reopening trigger fires.
9. **Automatic communication binding.** Inbound and outbound case communication SHALL bind to a case, sub-action, risk object, external notification, or allocation queue object.
10. **Audit-first operation.** Every decision SHALL emit a machine-readable rationale and immutable audit event.

## 3. Universal Risk Object Contract

Every domain SHALL emit or link to a canonical `RiskObject` with these minimum fields:

| Field | Requirement |
|---|---|
| `risk_object_id` | Required immutable identifier. |
| `risk_object_type` | Required enum: identity, architecture, vulnerability, exposure, control, drift, tool_health, coverage, blast_radius, asset, communication, trust_boundary, BAS, SIEM_SOAR, shared_responsibility, security_debt, exception. |
| `domain` | Required owning domain. |
| `source_systems[]` | Required source list. |
| `affected_entities[]` | Required canonical entity references. |
| `case_binding_status` | Required enum: bound, linked_to_existing, suppressed_by_policy, pending_allocation_error. |
| `case_id` | Required unless suppressed by approved policy. |
| `sub_action_ids[]` | Required when decomposition generates work. |
| `validation_state` | Required universal validation state. |
| `routing_state` | Required universal routing state. |
| `priority_score` | Required computed priority. |
| `closure_gate_state` | Required aggregate closure gate state. |
| `reopen_trigger_state` | Required aggregate reopening trigger state. |
| `mission_impact` | Required nullable object. |
| `fusion_map_refs[]` | Required node and edge references. |

## 4. Universal Case Lifecycle

The closed-loop case lifecycle SHALL be:

1. `DETECTED`
2. `BOUND`
3. `ROUTED`
4. `PRIORITISED`
5. `ACTION_DECOMPOSED`
6. `IN_PROGRESS`
7. `PENDING_VALIDATION`
8. `VALIDATION_RUNNING`
9. `VALIDATED_FIXED` / `VALIDATED_COMPENSATED` / `VALIDATED_SUPPRESSED` / `VALIDATED_RESIDUAL_ACCEPTED` / `VALIDATION_FAILED` / `VALIDATION_INCONCLUSIVE`
10. `PENDING_CLOSURE_GATES`
11. `CLOSED_BY_SYSTEM`
12. `REOPENED_BY_SYSTEM`

Forbidden lifecycle states or interactions:

- user-created case;
- user-closed case;
- user-reopened case;
- analyst-only lifecycle progression;
- unvalidated closure;
- closure based only on ITSM or email acknowledgement.

## 5. Universal Sub-Action Lifecycle

Every blocking sub-action SHALL use this lifecycle:

1. `GENERATED`
2. `ROUTED`
3. `OWNER_NOTIFIED`
4. `EVIDENCE_REQUIRED`
5. `IN_PROGRESS`
6. `PENDING_APPROVAL` when applicable
7. `PENDING_EXECUTION` when applicable
8. `PENDING_VALIDATION`
9. `VALIDATED`
10. `FAILED_VALIDATION`
11. `SUPPRESSED_APPROVED`
12. `RESIDUAL_ACCEPTED`
13. `CLOSED_BY_SYSTEM`
14. `REOPENED_BY_SYSTEM`

Parent cases SHALL NOT close while a blocking sub-action is unresolved unless an approved exception, approved suppression, or accepted residual-risk record exists.

## 6. Universal Validation Lifecycle

Validation SHALL use these states:

- `NOT_STARTED`
- `EVIDENCE_REQUESTED`
- `EVIDENCE_RECEIVED`
- `VALIDATION_RUNNING`
- `VALIDATED_FIXED`
- `VALIDATED_COMPENSATED`
- `VALIDATED_NOT_FIXED`
- `VALIDATION_INCONCLUSIVE`
- `VALIDATION_BLOCKED`
- `VALIDATION_EXPIRED`
- `REVALIDATION_REQUIRED`

Validation SHALL be triggered by source refresh, connector delta, owner evidence, push execution, BAS result, SIEM/SOAR deployment status, control-state change, scanner refresh, identity graph change, architecture graph change, or communication evidence.

## 7. Universal Closure Gates

A case SHALL close only when all configured gates are satisfied:

- technical validation gate;
- sub-action completion gate;
- communication gate where configured;
- external notifier gate where configured;
- SIR acknowledgement gate where configured;
- SLA/residual phase gate;
- exception/suppression expiry gate;
- evidence freshness gate;
- approval gate;
- audit completeness gate;
- mission-impact gate;
- fusion-map state refresh gate.

Closure SHALL be executed by the system after gate evaluation. User confirmation may be recorded as evidence, not as lifecycle authority.

## 8. Universal Reopening Triggers

A closed case SHALL reopen automatically when any configured trigger fires:

- original risk condition reappears;
- risk object source changes severity or exploitability;
- KEV, CVSS, EPSS, MISP, vendor, BAS, or threat-intel status changes materially;
- validation expires or fails;
- compensating control disappears or degrades;
- affected asset, identity, exposure, or dependency expands;
- blast radius expands;
- mission objective impact increases;
- routing owner rejects or cannot fulfil work;
- communication thread receives material inbound evidence;
- connector freshness drops below threshold;
- tool coverage degrades;
- suppression or exception expires;
- strategy threshold changes and requalifies the case.

## 9. Universal Routing Model

Routing SHALL consider:

- domain;
- risk object type;
- owner of affected asset, identity, application, cloud account, tool, control, or business service;
- business unit;
- tenant and organisation;
- environment;
- severity;
- priority;
- blast radius;
- mission impact;
- operational tempo;
- required skills;
- team affinity;
- workload;
- escalation path;
- approval authority;
- time zone;
- communication ownership;
- shared-responsibility profile;
- automation boundary.

The route decision SHALL be visible in the UI with route rationale and route challenge controls. Route challenge does not directly reroute the case; it requests route recalculation or approval review.

## 10. Strategy Layer Runtime Surfaces

Commander SDR SHALL expose runtime strategy surfaces for:

- SLA strategy;
- thresholds;
- automation boundaries;
- routing;
- posture objectives;
- mission objectives;
- operational tempo;
- domain-specific strategy;
- prioritisation weights;
- validation windows;
- closure gates;
- reopening triggers.

## 11. Fusion Map Binding

Every domain SHALL project into the multi-domain Fusion Map using node, edge, overlay, and case-binding rules. The Fusion Map SHALL include:

- risk overlay;
- drift overlay;
- exposure overlay;
- control overlay;
- coverage overlay;
- blast-radius overlay;
- identity overlay;
- vulnerability overlay;
- architecture overlay;
- tool-health overlay;
- mission overlay;
- validation overlay;
- SLA overlay;
- communication overlay;
- routing overlay.

Every actionable map node SHALL open a bound case, risk object, validation object, sub-action, or communication object. The map SHALL NOT create freeform cases.

## 12. Shell UI Binding

The Shell UI SHALL expose, at minimum:

- Command Centre;
- Case Management;
- Fusion Map;
- Strategy Centre;
- Mission Control;
- System Pulse;
- Team Pulse;
- Domain Pulse;
- Validation Console;
- Routing Console;
- Closure Gates;
- Reopening Queue;
- Communication Centre;
- Automation Boundaries;
- Tool Health;
- Controls;
- Drift;
- Coverage;
- Blast Radius;
- Prioritisation Console.

Any shell frame that lacks these routes is incomplete and SHALL be treated as a visual shell only, not a functional UI authority.


## Universal Domain Lifecycle Matrix

| Domain | Required case lifecycle binding | Required validation | Required reopening | Required routing | Required UI surface | Required Fusion Map layer |
|---|---|---|---|---|---|---|
| Identity | Identity risk, privilege drift, access drift, stale identity, service-account exposure SHALL bind to cases. | Access removed, privilege reduced, identity disabled, conditional access restored, or exception accepted. | Privilege returns, risk score rises, identity graph expands, stale account reappears. | IAM owner, app owner, identity platform owner, SOC/SOM escalation. | Identity Overview, Privileged Access, Risky Identities, Access Drift, Identity Coverage. | Identity nodes, admin edges, privilege edges, blast-radius overlay. |
| Architecture | Architecture drift, anti-pattern, dependency-risk, trust-boundary breach SHALL bind to cases. | Topology confirmed, control restored, design exception approved, dependency risk reduced. | Topology changes, exposure expands, dependency appears, trust boundary changes. | Architecture owner, cloud/platform owner, service owner, SOM. | Architecture Overview, Architecture Drift, Dependency Map, Cloud Posture. | Architecture nodes, dependency edges, trust-boundary overlay. |
| Vulnerability | Scanner findings, external advisories, code/supply-chain findings SHALL bind to cases. | Patch confirmed, mitigation confirmed, compensating control confirmed, not-applicable confirmed. | KEV/intel changes, asset remains vulnerable, patch rollback, new asset affected. | VM owner, asset owner, app owner, patch owner, SOM. | Vulnerability Overview, KEV, Remediation, SLA, Patch Intelligence, Code/Supply Chain. | CVE nodes, asset edges, control compensation overlay. |
| Exposure | External/internal exposure, internet-facing drift, open service risk SHALL bind to cases. | Exposure removed, firewall/WAF/DNS state confirmed, accepted exception. | Exposure reappears, DNS changes, port opens, asset becomes public. | Exposure owner, network owner, cloud owner, app owner. | Exposure & Posture, Attack Surface, Blast Zones. | Exposure overlay, internet boundary, attack path edges. |
| Controls | Missing/degraded control, failed control, weak compensating control SHALL bind to cases. | Control restored or compensating control validated. | Control degrades, coverage drops, configuration changes. | Control owner, platform owner, governance owner. | Control Coverage, Control Validation, Compliance. | Control nodes and protects/lacks_control edges. |
| Drift | Config drift, policy drift, architecture drift, access drift SHALL bind to cases. | Baseline restored, approved exception, accepted residual risk. | Drift recurs, exception expires, baseline changes. | Domain owner plus SOM threshold route. | Drift Console, Architecture Drift, Access Drift. | Drift overlay and baseline deviation edges. |
| Tool Health | Connector failure, telemetry stale, tool degradation, license/coverage failure SHALL bind to cases. | Fresh ingestion restored, connector healthy, telemetry confirmed. | Freshness expires, tool fails again, exclusive coverage disappears. | Platform/tool owner, SOC tooling owner, SOM. | Tool Health, Connectors, Platform. | Tool nodes, monitored_by, covered_by, stale edges. |
| Coverage | EDR/NDR/VM/cloud/identity coverage gaps SHALL bind to cases. | Coverage confirmed, tool state restored, exception accepted. | Asset loses coverage, connector stale, new uncovered asset appears. | Tool owner, asset owner, platform owner. | Coverage Gaps, Scanner Coverage, Identity Coverage. | Coverage overlay and not_covered_by edges. |
| Blast Radius | Blast zone expansion or high-impact path SHALL bind to cases. | Radius reduced, path broken, compensating control confirmed. | Graph expands, critical path reappears, identity privilege increases. | SOM, domain owner, mission owner, architecture owner. | Blast Zones, Mission Control, Fusion Map. | Blast-radius overlay, mission-impact overlay. |

---

# v2.1 APPLICATION BOUNDARY UPDATE — COMMANDER INTERNAL CONTROL PLANE

## Status
Superseding architectural clarification. This section is authoritative where legacy wording treats the Commander control capability as only a module, panel, or configuration page.

## Mandatory Application Boundary
Commander is now defined as a platform with three distinct application surfaces:

1. **Commander SDR Operational Application**
   - Customer-facing and internal operational surface.
   - Used for Command Centre, cases, risk objects, validation state, Fusion Map, communications, dashboards, reporting, and prioritisation-led remediation work.
   - Does not own commercial licence allocation, entitlement manifest authoring, deployment ring assignment, customer onboarding governance, or internal operator controls.

2. **Commander SDR Tenant Admin Surface**
   - Customer tenant administration surface inside the SDR tenant context.
   - Used by authorised customer administrators for users, tenant connectors, tenant-visible features, tenant policy settings, notification channels, and tenant audit/export.
   - May display licence/entitlement state as read-only unless explicitly delegated by the internal Commander Control Plane.

3. **Commander Internal Control Plane Application**
   - Separate internal application used by the Commander/Seiertech operating team.
   - Governs customers, tenants, instances, licences, entitlements, commercial feature allocation, module availability, trial state, demo/dogfood tenants, deployment rings, support access, self-hosted licence artefacts, operator audit, and emergency commercial/platform controls.
   - Controls what the SDR Operational Application and Tenant Admin Surface may expose, but is not used for day-to-day customer case operations.

## Non-Negotiable Rule
The Commander Internal Control Plane is not a customer module. It is a separate internal authority surface wired into the shared platform runtime through controlled entitlement, tenant, feature, deployment, support-access, and audit contracts.

## Runtime Authority
- The Operational Application executes SDR work.
- The Tenant Admin Surface manages customer-tenant administration within delegated boundaries.
- The Internal Control Plane governs commercial/platform authority above tenants.

## Build Consequence
Any implementation work must preserve this boundary. No operational Shell screen may become the authoritative source for licence allocation, commercial entitlement authoring, deployment ring membership, emergency kill switch control, or internal operator impersonation/support access approval.

---

# v2.1 Feature Registry Additions — Commander Internal Control Plane

| Feature ID | Feature | Surface | Authority |
|---|---|---|---|
| ICP-001 | Customer Register | Commander Control Plane | Internal Operator |
| ICP-002 | Tenant Register | Commander Control Plane | Internal Operator |
| ICP-003 | Instance Register | Commander Control Plane | Internal Operator |
| ICP-004 | Licence Allocation | Commander Control Plane | Commercial / Platform Admin |
| ICP-005 | Entitlement Manifest Editor | Commander Control Plane | Platform Admin |
| ICP-006 | Module Allocation | Commander Control Plane | Platform Admin |
| ICP-007 | Feature Flag Control | Commander Control Plane | Platform Admin |
| ICP-008 | Deployment Ring Management | Commander Control Plane | Release Manager |
| ICP-009 | Trial and Demo Tenant Management | Commander Control Plane | Commercial / Product Admin |
| ICP-010 | Dogfood Tenant Management | Commander Control Plane | Product / Platform Admin |
| ICP-011 | Support Access Governance | Commander Control Plane | Support Lead / Security Admin |
| ICP-012 | Self-Hosted Licence Artefact Management | Commander Control Plane | Platform Admin |
| ICP-013 | Operator Audit Log | Commander Control Plane | Security / Compliance Admin |
| ICP-014 | Emergency Commercial Kill Switch | Commander Control Plane | Break-Glass Admin |

Rule: these features must not be implemented as SDR Operational App case-management features.



---

# v2.2 Addendum — P0 Zero-Day Priority Override

This document is updated by the v2.2 P0 Zero-Day Priority doctrine.

Authoritative rule:

- P0 Zero-Day Priority is the highest emergency priority class in Commander SDR.
- P0 is a governed priority overlay, not a case lifecycle status.
- P0 may only be applied to an existing case-bound risk object.
- P0 may be applied automatically by deterministic risk conditions or manually by authorised senior role owners.
- P0 does not permit manual case creation, manual case closure, manual lifecycle bypass, validation bypass, or evidence bypass.
- P0 immediately drives emergency SLA, routing, escalation, validation cadence, communication cadence, dashboard prominence, Fusion Map visibility, sub-action generation, and audit.
- P0 downgrade/removal requires equal-or-higher authority, reason code, evidence reference, and audit capture.
- Where this document contains older priority, SLA, routing, RBAC, dashboard, or lifecycle wording, the v2.2 P0 doctrine supersedes it.

Required implementation reference:

- `docs/02_child_specs/40_P0_Zero_Day_Priority_Override_Spec.md`



## FR-ZD-001 — P0 Zero-Day Priority Override

Allows authorised senior role owners or deterministic rules to apply a governed P0 Zero-Day priority overlay to existing case-bound risks, triggering emergency SLA, routing, validation cadence, communication cadence, dashboard prominence, Fusion Map visibility, sub-action generation, and audit controls.

Dependencies: Case Engine, Prioritisation Model, Routing Model, SLA Strategy, RBAC, Communication Layer, Validation Engine, Fusion Map, Command Centre, CISO Dashboard, Tenant Admin, Commander Internal Control Plane, Audit Log.
## v2.3 Feature Registry Update — UI Doctrine Features
Add feature entries for: Military-Intelligence UI Doctrine, UI Component Catalogue, Graph/Gauge/Overlay System, P0 War Room UI, and Application Shell Boundary. These features depend on Frontend Architecture, UI/UX Design System, Shell Functional Surface, P0 Priority, Fusion Map, RBAC, Strategy Layer, and Control Plane boundary specs.

---

# v2.3 UI Doctrine Integration Addendum — Commander Military-Intelligence Interface

## Status
- This addendum supersedes any visual or interaction guidance that conflicts with the v2.3 UI doctrine.
- It does not alter closed-loop case doctrine, P0 Zero-Day doctrine, application-boundary doctrine, risk-object binding doctrine, validation doctrine, routing doctrine, or Fusion Map doctrine.
- It preserves existing shell geometry and navigation boundaries unless a later approved shell migration explicitly replaces them.

## Binding UI Doctrine
Commander SDR uses a fixed operational shell with a military-intelligence visual system applied at the content, dashboard, graph, gauge, overlay, map, pulse, case-detail, and control-surface layers.

The shell frame is not to be repeatedly redesigned. Visual evolution is controlled through:
- design tokens;
- typography;
- density rules;
- square component geometry;
- command-grade instrumentation;
- graph/gauge/overlay systems;
- semantic priority and domain colour rules;
- application-specific treatment for the Operational App, Tenant Admin Surface, and Commander Internal Control Plane.

## Application Surface Rule
The doctrine applies differently by surface:

| Surface | Treatment |
|---|---|
| Commander SDR Operational Application | Strongest command/intelligence treatment; risk, case, Fusion Map, pulse, P0, validation, communication, and mission surfaces. |
| Commander SDR Tenant Admin Surface | Controlled administrative treatment; same tokens and square geometry, lower visual intensity, strong form/table usability. |
| Commander Internal Control Plane Application | Secure operator-console treatment; customers, tenants, licences, entitlements, features, deployment rings, support access, emergency controls, and audit. |

## Shell Preservation Rule
Do not change without explicit approval:
- top bar placement;
- left navigation placement;
- product/brand lockup placement;
- Commander AI placement;
- search/user/notification placement;
- sidebar expansion and scroll behaviour;
- core content-canvas contract;
- distinction between Operational App, Tenant Admin Surface, and Commander Internal Control Plane.

## Visual Intensity Model
| Level | Name | Used For | Visual Behaviour |
|---|---|---|---|
| 1 | Operational Standard | normal cases, dashboards, assets, vulnerabilities, identity, architecture, reporting | dense, square, calm, readable, navy/gold/light or controlled dark surfaces |
| 2 | Tactical Analysis | Fusion Map, blast radius, exposure, threat corridor, dependency map, control overlays | dark tactical canvas, overlays, node-link views, heat grids, gauges |
| 3 | Emergency Command | P0 Zero-Day, active exploitation, surge mode, mission-critical risk | maximum contrast, P0 banner, SLA countdown, owner accountability, live pulse, escalation rails |

## Non-Negotiable Usability Guardrail
The interface must remain faster to operate than it is to admire. Visual intensity must never reduce scan speed, evidence traceability, routing clarity, validation clarity, closure-gate clarity, or senior accountability.

## P0 Zero-Day UI Rule
P0 Zero-Day is rendered as an emergency priority overlay, not a lifecycle state. It must appear consistently across:
- case list;
- case detail;
- Command Centre;
- CISO dashboard;
- Fusion Map;
- Team Pulse;
- Domain Pulse;
- Mission Pulse;
- Routing Console;
- Validation Console;
- Communication surfaces;
- Tenant Admin policy pages;
- Commander Internal Control Plane entitlement and emergency-control surfaces where applicable.

## Build Pipeline Rule
No new UI page is build-ready unless it declares:
- surface owner;
- target application;
- intensity level;
- required data objects;
- lifecycle bindings;
- routing bindings;
- validation bindings;
- strategy bindings;
- Fusion Map bindings where applicable;
- P0 behaviour where applicable;
- accessibility and density constraints.

---

# v2.5 Baseline Alignment Addendum — Admin, Navigation, Visibility and Defaults

This document is governed by `00_AUTHORITY_AND_PRECEDENCE_v2_5_2.md`.

v2.5 adds the following binding baseline rules:

1. Admin/control surfaces are first-class and split across Operational App Platform, Tenant Admin, Commander Commercial Control Plane and Build Pipeline Control.
2. Tenant Admin includes Baseline Configuration, Users & Access, Connectors & Data Sources, Strategy & Operating Model, Rules & Models, AI Configuration, Automation Boundaries, Communications, Exceptions & Suppressions, Audit/Compliance/Exports and Feature Availability.
3. Commander Commercial Control Plane is the internal application for customers, tenants, licences, entitlements, feature flags, baseline profiles, rule/model packs, deployment rings, support access, usage evidence and operator audit.
4. Menus, routes, panels and actions are generated from a registry and are visible in build mode but suppressed at runtime by RBAC, entitlement, feature flag, environment and policy state.
5. Frontend menu suppression is not security. Backend/API enforcement is mandatory.
6. Rule Engine and Model Management surfaces are mandatory and include simulation, versioning, rollback, audit and decision explainability.
7. Mission Control is driven by structured MissionObjective bindings to assets, applications, identities, cloud accounts, data stores, endpoints, tags, business services, dependency graph relationships and rules.
8. Baseline Configuration Profiles are mandatory and cover risk, SLA, routing, validation, closure/reopening, P0, automation, communications, RBAC, AI, rule packs, decision models, control frameworks, compliance mappings, CTEM, MITRE ATT&CK, ISO/NIST/CIS/AWS mappings and reporting defaults.
9. Tenant active configuration is derived from baseline templates and may be customised with audit, approval, versioning and baseline-drift visibility.
10. Shell usability corrections are binding: global search moves before Commander AI, search must not be cramped, sidebar scroll must be visible, and menu expansion must be supported structurally now and dynamically during frontend build.

Where older wording conflicts with this addendum, v2.5 authority wins.

## v2.5 Feature Registry Additions

| Feature ID | Name | Status | Description |
|---|---|---|---|
| FR-ADMIN-001 | Tenant Admin Information Architecture | Active baseline | Complete Tenant Admin control surface structure. |
| FR-PLAT-001 | Platform Control Menu | Active baseline | Tenant platform health, data, rules, models, AI, automation and audit menu. |
| FR-VIS-001 | RBAC/Entitlement/Feature Visibility Engine | Active baseline | Registry-driven menu/route/panel/action visibility. |
| FR-RULE-001 | Rule Engine Management | Active baseline | Rule packs, simulation, versioning, rollback and audit. |
| FR-MODEL-001 | Model Management | Active baseline | Decision model configuration, simulation, versioning and audit. |
| FR-EXPLAIN-001 | Decision Explainability | Active baseline | Case/risk/P0/routing/validation/closure decision rationale surfaces. |
| FR-BASE-001 | Baseline Configuration Profiles | Active baseline | Editable operational, risk, framework, model and AI defaults. |
| FR-RISKBASE-001 | Risk Baseline Profiles | Active baseline | Risk taxonomy, appetite, tolerance, residual risk, debt and scoring defaults. |
| FR-FRAME-001 | Control Framework Baseline Profiles | Active baseline | ISO/NIST/CIS/AWS/MITRE/CTEM baseline mappings and evidence defaults. |
| FR-MISSION-001 | Structured Mission Binding | Active baseline | MissionObjective structured binding to cases, risks and Fusion Map. |
| FR-SHELL-001 | Search and Sidebar Usability Correction | Active baseline | Larger search before Commander AI, visible sidebar scroll and expand behaviour. |

---

# v2.6 Extension — Feature Registry Addendum

**Extension version:** v2.6.0
**Extension date:** May 2026
**Extension scope:** Adds all v2.6 baseline features to the SDR Feature Registry. All existing feature entries above this section remain in force unchanged.

## V2.6 Feature Entries

### Foundational Doctrine Features

| Feature ID | Name | Type | Source Spec | Status | Workspace |
|---|---|---|---|---|---|
| FR001-V26-001 | Security Command and Control Doctrine | Doctrine | Spec #57 | Baseline | All workspaces |
| FR001-V26-002 | Security OODA Loop | Operational Framework | Spec #58 | Baseline | All workspaces |
| FR001-V26-003 | Intelligence Layer Architecture | Architectural Layer | Spec #59 | Baseline | All workspaces |
| FR001-V26-004 | Dual Attack Surface Framework | Architectural Layer | Spec #60 | Baseline | Executive Posture, Drift Operations |

### Connector and Signal Features

| Feature ID | Name | Type | Source Spec | Status | Workspace |
|---|---|---|---|---|---|
| FR001-V26-010 | Four-Class Connector Architecture | Connector Framework | Spec #61 | Baseline | (Platform layer) |
| FR001-V26-011 | Multi-Class Connector Declaration | Connector Framework | Spec #61 | Baseline | (Platform layer) |
| FR001-V26-012 | Verdict Semantics Processing | Signal Framework | Spec #62 | Baseline | (Platform layer) |
| FR001-V26-013 | SOC Telemetry Class A Connectors | Connector Class | Spec #61 / INDEX.md | Baseline | Drift Operations |
| FR001-V26-014 | Operational Verdict Class B Connectors | Connector Class | Spec #61 / INDEX.md | Baseline | Drift Operations |

### Surface Features

| Feature ID | Name | Type | Source Spec | Status | Workspace |
|---|---|---|---|---|---|
| FR001-V26-020 | External Operating Picture | Operational Surface | Spec #65 | Baseline | Executive Posture, Drift Operations |
| FR001-V26-021 | Internal Operating Picture | Operational Surface | Spec #66 | Baseline | Executive Posture, Drift Operations |
| FR001-V26-022 | OODA Dashboard Family | Operational Surface | Spec #67 | Baseline | Drift Operations, Executive Posture |
| FR001-V26-023 | Command Tempo Dashboard | Operational Surface | Spec #67 | Baseline | Executive Posture, Drift Operations |
| FR001-V26-024 | Identity Intelligence Surface | Intelligence Surface | Spec #68 | Baseline | Identity & Asset Intelligence |
| FR001-V26-025 | Asset Intelligence Surface | Intelligence Surface | Spec #69 | Baseline | Identity & Asset Intelligence |
| FR001-V26-026 | Control Weakness Direction Board | Direction Board | Spec #70 | Baseline | Drift Operations, Control & Architecture |
| FR001-V26-027 | Policy Effectiveness Direction Board | Direction Board | Spec #70 | Baseline | Control & Architecture |

### Classification and Discovery Features

| Feature ID | Name | Type | Source Spec | Status | Workspace |
|---|---|---|---|---|---|
| FR001-V26-030 | Pre-Warned / Protected / Novel Classification | Classification Engine | Spec #71 | Baseline | Drift Operations |
| FR001-V26-031 | Inverse Discovery Loop | Discovery Mechanism | Spec #72 | Baseline | Drift Operations |
| FR001-V26-032 | Silent Defence Reporting | Reporting Surface | Spec #73 | Baseline | Executive Posture, Assurance & Audit |

### Priority and Investigation Features

| Feature ID | Name | Type | Source Spec | Status | Workspace |
|---|---|---|---|---|---|
| FR001-V26-040 | Context-Aware Drift Prioritisation Matrix | Priority Engine | Spec #74 | Baseline | Drift Operations |
| FR001-V26-041 | Internal Risk Investigation Sub-Lifecycle | Investigation Framework | Spec #75 | Baseline | Drift Operations |

### Case Type Features

| Feature ID | Name | Type | Source Spec | Status | Workspace |
|---|---|---|---|---|---|
| FR001-V26-050 | External Attack Correlation case type | Case Type | Spec #08 v2.6 | Baseline | Drift Operations |
| FR001-V26-051 | Verdict Pattern case type | Case Type | Spec #08 v2.6 | Baseline | Drift Operations (IR auth) |
| FR001-V26-052 | Inverse Discovery (Coverage Blindspot) case type | Case Type | Spec #08 v2.6 | Baseline | Drift Operations |
| FR001-V26-053 | Policy Effectiveness case type | Case Type | Spec #08 v2.6 | Baseline | Drift Operations, Control & Architecture |
| FR001-V26-054 | OODA Tempo Degradation case type | Case Type | Spec #08 v2.6 | Baseline | Drift Operations |

### Persona Features

| Feature ID | Name | Type | Source Spec | Status | Workspace |
|---|---|---|---|---|---|
| FR001-V26-060 | Security Analyst persona | Persona | Master Proposition v5.0 Section 22 | Baseline | Drift Operations (primary) |
| FR001-V26-061 | Risk Analyst persona | Persona | Master Proposition v5.0 Section 22 | Baseline | Executive Posture (primary) |
| FR001-V26-062 | Internal Risk Lead role | Role | Spec #19 v2.6, Spec #75 | Baseline | Drift Operations |
| FR001-V26-063 | Internal Risk Analyst role | Role | Spec #19 v2.6, Spec #75 | Baseline | Drift Operations |
| FR001-V26-064 | Policy Owner role | Role | Spec #19 v2.6 / Spec #31 v2.6 | Baseline | Control & Architecture |

### Authority and Governance Features

| Feature ID | Name | Type | Source Spec | Status | Workspace |
|---|---|---|---|---|---|
| FR001-V26-070 | Internal Risk Authority Overlay | Authority Overlay | Spec #19 v2.6 | Baseline | (Cross-workspace) |
| FR001-V26-071 | v2.6 Configuration Parameters | Configuration | Spec #55 v2.6 | Baseline | (Tenant Admin) |
| FR001-V26-072 | Audit-of-Access for Internal Risk | Audit Capability | Spec #75 | Baseline | (Audit infrastructure) |

### Reporting Features

| Feature ID | Name | Type | Source Spec | Status | Workspace |
|---|---|---|---|---|---|
| FR001-V26-080 | Hourly Tactical Refresh | Reporting Cadence | Spec #58 | Baseline | Drift Operations |
| FR001-V26-081 | Daily Executive Summary | Reporting Cadence | Spec #58 | Baseline | Executive Posture |
| FR001-V26-082 | Weekly Programme Review | Reporting Cadence | Spec #58 | Baseline | Executive Posture |
| FR001-V26-083 | Monthly Board Report | Reporting Cadence | Spec #58 | Baseline | Executive Posture |

## Feature Cross-References

The v2.6 features are cross-referenced across the document family:

- **Master Proposition v5.0** establishes the proposition and category claim
- **Master Technical Specification v7.0** defines the architectural conformance criteria
- **Child Specs #57-#75** provide detailed specification per feature
- **Existing specs extended in v2.6** (#08, #17, #18, #19, #28, #29, #31, #33, #41, #46, #47, #55) integrate v2.6 features with the existing platform

## Build Pack Mapping

Build pack additions for v2.6 features will be detailed in the Next Stage Approach Pack v1.6 (delivered separately from this baseline pack). The baseline pack defines the features; the Approach Pack defines the build sequence to deliver them.

