# COVERAGE — Knowledge Graph Build (Task 8)

**Purpose:** Honest log of what baseline material was opened and read in-session for the Knowledge Graph build, and what remains partial. Maintained per the `SOURCING_RULE.md` partial-read discipline.

**Source root for all entries:** `docs/99_source_archive/baseline_v2_6_2/docs/`

**Read-state values:**

- `full` — file read end-to-end in this knowledge build.
- `partial` — opened, line-1 title verified, identifiable headed sections read; the bulk of the file body was not. Used for citation only on what was actually read.
- `not opened` — the knowledge build did not open this file.

---

## Masters — `00_master/`

| File | Title verified at line 1 | Read state |
|------|---------------------------|------------|
| `Commander_SDR_Master_Proposition_v5_0.md` | Confirmed via §22, §24 grep | partial — section index, §22 full eleven-persona enumeration (read in full 2026-05-31), §24 full Workspace Model table (read in full 2026-05-31), §24.1 v2.6 surface additions, §4 Streams, §25 SOC boundary, §26 Insider Risk boundary read in prior session |
| `Commander_SDR_Master_Technical_Specification_v7_0.md` | Confirmed via §1 grep | partial — §1 Platform Architecture (seven layers), §2 Connector Layer, §3 Normalisation, §4 Engine, §5 Intelligence, §6 Case (case taxonomy + RiskObject extension — full v2.6 extension list verified at §6.3 on 2026-05-31), §7 OODA, §8 Surface (workspaces + boundaries), §9 Security Model (personas + authority overlays), §10 Governance (boundaries) read in this build |
| `SDR_Control_Plane_Specification_v1_1.md` | Confirmed via §0–§19 grep | partial — §§0–6 read in prior session; §§7–19 read in full 2026-05-31 (Feature Registry integration, entitlement manifest, effective feature state computation, demo/dogfood/trial handling, usage metering, self-hosted licence model, Feature Registry detailed amendment, operator console feature management, code-update boundary with CI/CD, control-plane APIs, security/audit/tenant isolation, implementation phasing, acceptance criteria) |
| `SDR_Specification_Schedule_and_Folder_Structure_v1_9.md` | n/a | not opened in this build |
| `00_AUTHORITY_AND_PRECEDENCE_v2_6.md` | n/a | partial — read in prior session for the precedence stack |
| `00_SPECIFICATION_REGISTER_v2_6.md` | n/a | partial — read in prior session for the spec inventory |

---

## Child specs — `02_child_specs/`

### v2.6 Doctrinal Foundation (#57–#62)

| # | File | Title verified | Read state |
|---:|------|----------------|------------|
| 57 | `57_Security_Command_and_Control_Doctrine_Spec.md` | "Spec #57 — Security Command and Control Doctrine" | full (re-verified §1–§6 this build) |
| 58 | `58_Security_OODA_Loop_Specification.md` | "Spec #58 — Security OODA Loop Specification" | full (re-verified §1–§3 incl. four phases this build; §3.4 Act phase detail read in full 2026-05-31) |
| 59 | `59_Intelligence_Layer_Architecture_Spec.md` | "Spec #59 — Intelligence Layer Architecture Specification" | full (re-verified §1–§3 incl. four streams this build) |
| 60 | `60_Internal_and_External_Attack_Surface_Framework_Spec.md` | "Spec #60 — Internal and External Attack Surface Framework Specification" | full (re-verified §1–§5 this build) |
| 61 | `61_Universal_Security_Signal_Connector_Contract_Spec.md` | "Spec #61 — Universal Security Signal Connector Contract Specification" | partial — §1–§3 (signal purposes 1–6) read previously; §3.7 Behavioural Signal disposition body read in full 2026-05-31; §3.8 Threat Signal read 2026-05-31; §4 four connector classes incl. §4.1 conformance tier names (Certified · Full · Baseline · Planned) read in full 2026-05-31; §§5–7 (multi-class declaration, INDEX.md registration, conformance test suite) read 2026-05-31 |
| 62 | `62_Verdict_Semantics_Specification.md` | "Spec #62 — Verdict Semantics Specification" | partial — §1–§6 (five mandatory dimensions, eight dispositions, density, disagreement) read; §7+ truncated |

### v2.6 Surfaces and Capabilities (#65–#75)

| # | File | Title verified | Read state |
|---:|------|----------------|------------|
| 65 | `65_External_Operating_Picture_Surface_Spec.md` | "Spec #65 — External Operating Picture Surface Specification" | partial — §1–§3.6 (seven principal regions) read this build |
| 66 | `66_Internal_Operating_Picture_Surface_Spec.md` | "Spec #66 — Internal Operating Picture Surface Specification" | partial — §1–§5 (six principal regions, visual language, interaction) read this build |
| 67 | `67_OODA_Dashboard_Family_Spec.md` | "Spec #67 — OODA Dashboard Family Specification" | partial — §1–§5 (Observe/Orient/Decide phase dashboards) read this build; §§6–7 (Act Phase Dashboard composition + Command Tempo Dashboard composition) read in full 2026-05-31 |
| 68 | `68_Identity_Intelligence_Surface_Spec.md` | "Spec #68 — Identity Intelligence Surface Specification" | partial — §1–§2 confirmed previously; §§3–10 (six-section composition, visual language, interaction model, RBAC, build readiness, configurability, audit events, relationships) read in full 2026-05-31 |
| 69 | `69_Asset_Intelligence_Surface_Spec.md` | "Spec #69 — Asset Intelligence Surface Specification" | partial — §1–§2 confirmed previously; §§3–10 (seven-section composition, visual language, interaction model, RBAC, build readiness, configurability, audit events, relationships) read in full 2026-05-31 |
| 70 | `70_Direction_Boards_Spec.md` | "Spec #70 — Direction Boards Specification (Control Weakness + Policy Effectiveness)" | partial — §1–§5 (both boards specified) read this build |
| 71 | `71_Pre_Warned_Protected_Novel_Classification_Spec.md` | "Spec #71 — Pre-Warned/Protected/Novel Classification Specification" | partial — §1–§5 (engine, classification phases, defence-worked annotation) read this build |
| 72 | `72_Inverse_Discovery_Loop_Spec.md` | "Spec #72 — Inverse Discovery Loop Specification" | partial — §1–§5 (full loop, four root-cause buckets, metric integration) read this build |
| 73 | `73_Silent_Defence_Reporting_Spec.md` | "Spec #73 — Silent Defence Reporting Specification" | partial — §1–§5 (Option A architecture, daily/weekly/monthly reports, defence story narrative) read this build |
| 74 | `74_Context_Aware_Drift_Prioritisation_Matrix_Spec.md` | "Spec #74 — Context-Aware Drift Prioritisation Matrix Specification" | partial — §1–§12 (all five dimensions, modulation, decay, kill switch, audit) read this build |
| 75 | `75_Internal_Risk_Investigation_Sub_Lifecycle_Spec.md` | "Spec #75 — Internal Risk Investigation Sub-Lifecycle Specification" | partial — §1–§3.5 (sub-lifecycle phases, customer-investigates boundary, outcome dispositions) read this build |

### Operational Backbone (closed-loop case engine)

| # | File | Title verified | Read state |
|---:|------|----------------|------------|
| 17 | `17_Closed_Loop_Control_Architecture.md` | "Spec #17 — Closed-Loop Control Architecture" | partial — base spec (control loop, control selection hierarchy, validation, adjustment) + v2.6 OODA Integration Addendum (closed loop ↔ OODA mapping, V2.6-1..V2.6-4) read this build. **Source-location finding (2026-05-31):** Spec #17's v2.6 addendum is OODA Integration only; the eleven-persona enumeration is verbatim in MP v5.0 §22, not in Spec #17 — recorded in SYSTEM_KNOWLEDGE_GRAPH.md §20.1. |
| 28 | `28_Strategic_and_Tactical_Priority_Framework_Spec.md` | "Spec #28 — Strategic and Tactical Priority Framework" | partial — §1–§8 (StrategicPriority + TacticalPriority models, target metrics, alignment engine, boost) read this build |
| 29 | `29_Universal_Risk_Object_and_Case_Binding_Spec.md` | "29. Universal Risk Object and Case Binding Specification" | partial — base spec (risk object types, binding outcomes) + Closed-Loop Functional Doctrine Patch v2.0 (RiskObject contract, twelve-state case lifecycle) read this build |
| 30 | `30_Universal_Validation_Closure_and_Reopening_Lifecycle_Spec.md` | "30. Universal Validation, Closure and Reopening Lifecycle Specification" | partial — base (validation lifecycle, closure gates, reopening triggers) + same v2.0 addendum read this build |
| 31 | `31_Routing_Model_and_Team_Affinity_Spec.md` | "31. Routing Model and Team Affinity Specification" | partial — base (routing inputs/outputs) + same v2.0 addendum (sub-action lifecycle) read this build |
| 32 | `32_Strategy_Layer_Runtime_Surface_Spec.md` | "32. Strategy Layer Runtime Surface Specification" | partial — base (twelve strategy surfaces, runtime binding) + same v2.0 addendum read this build |
| 33 | `33_Multi_Domain_Fusion_Map_Spec.md` | "33. Multi-Domain Fusion Map Specification" | partial — base (node types, edge types, overlays, interaction rules) + same v2.0 addendum read this build |
| 34 | `34_Mission_Control_System_Team_Domain_Pulse_Spec.md` | "34. Mission Control, System Pulse, Team Pulse and Domain Pulse Specification" | partial — base (four pulse surfaces) + same v2.0 addendum read this build |
| 08 | `08_Case_Management_Workflow_Spec.md` | "Spec #8 — Case Management & Workflow" | partial — table of contents (15 sections), base sections 1–4 read in prior session; v2.6 Extension §V2.6-1 to §V2.6-6 (five new case types, lifecycle, priority, RBAC, audit events) read by targeted grep. **Mechanics fill (2026-05-31):** §5 Case Action Algorithm header + worked example portion, §6 parent state machine (header), §7 sub-case state machine (header), §8 Assignment Engine (§§8.1–8.5 read), §9 Case Pulse SOM Command Surface (§§9.1–9.3 read), §10 Teams/Ranks/Specialisms (§§10.1–10.5 read), §11 Operational Passport (header), §12 Evidence Packs and Rollback Snapshots (§§12.1–12.3 read), §13 Audit and Logging Requirements read in full, §14 Migration Notes read in full, §14A Closed-Loop Email Communication Lifecycle Alignment (§§14A.1–14A.7) read in full, §15 Acceptance Criteria and Test Cases (Epics A–G) read in full. §§16–19 (Team Builder, Team Performance Dashboard, CRS Confidence Intervals, Resolution Durability Score) remain not opened. |

### Other specs (#01–#56) — initial/structural reads from prior session

These were opened in the prior session and verified by line-1 title at that time. They are sufficient for cross-cutting graph claims (status, purpose, doctrine), but not for deep section-by-section claims.

| # | File | Read state |
|---:|------|------------|
| 01 | `01_AI_Build_Agent_Workflow_Spec.md` | partial (initial portion, prior session) |
| 02 | `02_DevOps_Environments_CICD_Spec.md` | partial (initial portion, prior session) |
| 03 | `03_Backend_API_Architecture_Spec.md` | partial (initial portion, prior session) |
| 04 | `04_Frontend_Architecture_Spec.md` | partial (initial portion, prior session) |
| 05 | `05_Data_Connector_Normalisation_Implementation_Spec_v1_5.md` | partial (initial portion, prior session) |
| 06 | `06_Worker_and_Scheduling_Spec.md` | partial (initial portion, prior session) |
| 07 | `07_Drift_and_Rule_Engine_Spec.md` | partial (initial portion, prior session) |
| 09 | `09_Connector_Architecture_Spec.md` | partial (initial portion, prior session) |
| 10 | `10_Platform_Security_and_Hardening_Spec.md` | partial (initial portion, prior session) |
| 11a | `11a_UI_UX_Design_System_Spec.md` | partial (initial portion, prior session) |
| 11b | `11b_Workspace_Dashboard_Composition_Spec.md` | partial (initial portion, prior session) |
| 12 | `12_SDR_Normalisation_Strategy.md` | partial (initial portion, prior session) |
| 13 | `13_Commander_AI_Architecture_and_Grounding_Rules.md` | partial (initial portion, prior session) |
| 14 | `14_Push_Engine_Architecture.md` | partial (initial portion, prior session) |
| 15 | `15_SIEM_SOAR_Rule_Generation_Templates.md` | partial (initial portion, prior session) |
| 16 | `16_Performance_Scaling_and_Operational_Spec.md` | partial (initial portion, prior session) |
| 18 | `18_Unified_Identity_Architecture.md` | partial (initial portion, prior session) |
| 19 | `19_Full_RBAC_Permission_Matrix.md` | partial (initial portion, prior session) |
| 20 | `20_Coordinated_Push_Group_Schema.md` | partial (initial portion, prior session) |
| 21 | `21_BAS_Connector_Integration_Contract.md` | partial (initial portion, prior session) |
| 22 | `22_Architecture_Intelligence_Engine.md` | partial (initial portion, prior session) |
| 23 | `23_Security_Tool_Intelligence_Specification.md` | partial (initial portion, prior session) |
| 24 | `24_Connector_API_Reference_Framework_Spec.md` | partial (initial portion, prior session) |
| 25 | `25_Trust_Boundary_and_Third_Party_Intelligence_Spec.md` | partial (initial portion, prior session) |
| 26 | `26_Case_Communication_and_Broadcast_Channel_Spec.md` | partial (initial portion, prior session) |
| 26a | `26a_Closed_Loop_Email_Case_Communication_Lifecycle_Spec_v1_2.md` | partial (initial portion, prior session) |
| 27 | `27_Shared_Responsibility_Profile_and_Configuration_Governance_Spec.md` | partial (initial portion, prior session) |
| 35 | `35_Shell_UI_Functional_Surface_Spec.md` | partial (initial portion, prior session) |
| 36 | `36_Commander_Internal_Control_Plane_Application_Architecture_Spec.md` | partial (initial portion, prior session) |
| 37 | `37_Commander_Internal_Control_Plane_to_SDR_Runtime_Contract.md` | partial (initial portion, prior session) |
| 38 | `38_Commander_Internal_Control_Plane_UI_Surface_Spec.md` | partial (initial portion, prior session) |
| 39 | `39_Commander_Application_Boundary_and_Naming_Model_Spec.md` | partial — §1–§4 (three application surfaces) re-verified this build |
| 40 | `40_P0_Zero_Day_Priority_Override_Spec.md` | partial (initial portion, prior session) |
| 41 | `41_Commander_SDR_Military_Intelligence_UI_Doctrine_Spec.md` | partial — §1–§5 (visual intensity levels) re-verified this build |
| 42 | `42_Commander_SDR_UI_Component_Catalogue_Spec.md` | partial (initial portion, prior session) |
| 43 | `43_Commander_SDR_Graph_Gauge_and_Overlay_System_Spec.md` | partial (initial portion, prior session) |
| 44 | `44_Commander_SDR_P0_Zero_Day_War_Room_UI_Spec.md` | partial (initial portion, prior session) |
| 45 | `45_Commander_SDR_Application_Shell_Boundary_Spec.md` | partial (initial portion, prior session) |
| 46 | `46_Canonical_Terminology_and_Object_Glossary.md` | partial — base glossary + v2.6 Terminology Addendum read this build |
| 47 | `47_Application_Route_and_Navigation_Register.md` | partial (initial portion, prior session) |
| 48 | `48_Active_Shell_UI_Authority.md` | partial (initial portion, prior session) |
| 49 | `49_Admin_Control_Surface_Information_Architecture_Spec.md` | partial (initial portion, prior session) |
| 50 | `50_RBAC_Entitlement_Feature_Flag_Menu_Visibility_Spec.md` | partial — §Status, §Purpose, §Binding Doctrine, §Visibility Inputs, §Build Mode, §Runtime Mode read this build |
| 51 | `51_Rule_Model_and_Decision_Governance_Surface_Spec.md` | partial (initial portion, prior session) |
| 52 | `52_Structured_Mission_Objective_Binding_Model_Spec.md` | partial (initial portion, prior session) |
| 53 | `53_Shell_UI_Usability_Correction_Spec.md` | partial (initial portion, prior session) |
| 54 | `54_Pre_Build_UI_Navigation_and_Route_Baseline_v2_5.md` | partial (initial portion, prior session) |
| 55 | `55_Baseline_Configuration_Framework_Model_and_Defaults_Spec.md` | partial — base (binding doctrine, baseline layers, baseline templates, risk + control framework baselines) read this build |
| 56 | `56_Shell_Reference_vs_Build_Authority_Doctrine_Spec.md` | partial — §Status, §Purpose, §Binding Doctrine (8 numbered points), §Build Pack Rule, §Agent Rule read this build |

### Other files in `02_child_specs/`

| File | Read state |
|------|------------|
| `SOM_Configuration_Panel_Spec_v1_6.md` | not opened in this build |
| `TAP_Tenant_Admin_Panel_Spec_v1_0.md` | not opened in this build |

### Numbering notes carried forward

- **63 and 64 are absent** from the archive (verified). Numbering jumps 62 → 65; the Specification Register records this as reserved, with connector schedules implemented via `INDEX.md` updates.
- **11 splits** into `11a` and `11b`.
- **26** has variant `26a`.

---

## Other baseline directories

| Directory | Read state |
|-----------|------------|
| `01_active_build/` | not opened in this build |
| `03_api_specs/` | not opened in this build |
| `06_ui_build_reference/` | not opened in this build |
| `feature_registry/` | not opened in this build |

These are noted as part of the baseline archive and may be cited where relevant in future passes, subject to the verification gate.
