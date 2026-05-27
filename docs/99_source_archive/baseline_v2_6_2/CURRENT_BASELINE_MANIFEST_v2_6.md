# Current Baseline Manifest — v2.6

**Document ID:** `CURRENT_BASELINE_MANIFEST_v2_6.md`
**Version:** v2.6
**Status:** Authoritative
**Date:** May 2026
**Baseline Tag:** v2.6.2

## 1. Purpose

This manifest is the single authoritative inventory of all files comprising the Commander SDR Baseline Document Pack at v2.6.1. v2.6.1 is a handover/control update only; the v2.6 product and technical baseline remains unchanged. It governs what the build pipeline reads, what audit operations evaluate against, and what conformance evaluation considers part of the baseline.

Any file not in this manifest is not part of the baseline.

## 2. Baseline Tag

**Current baseline:** `v2.6.2`

**Previous baseline:** `v2.5.2` (superseded; release notes retained)

## 3. Top-Level Files

```
AGENTS.md                                [v2.6.2 — stale-document notice added]
CURRENT_BASELINE_MANIFEST_v2_6.md        [v2.6.2 — tag and listing bumped]
RELEASE_NOTES_v2_5.md                    [retained — historical]
RELEASE_NOTES_v2_5_1.md                  [retained — historical]
RELEASE_NOTES_v2_5_2.md                  [retained — historical]
RELEASE_NOTES_v2_6.md
RELEASE_NOTES_v2_6_1.md                  [v2.6.1 — handover/control update]
RELEASE_NOTES_v2_6_2.md                  [v2.6.2 — control note only; flags stale historical file]
MEMORY.md                                [v2.6.1 — working memory / context only]
docs/
```

## 4. `docs/00_master/`

Authority documents and master specifications:

```
00_AUTHORITY_AND_PRECEDENCE_v2_6.md                           [v2.6 — new]
00_SPECIFICATION_REGISTER_v2_6.md                             [v2.6 — new]
Commander_SDR_Master_Proposition_v5_0.md                      [v2.6 — supersedes v4.7]
Commander_SDR_Master_Technical_Specification_v7_0.md          [v2.6 — supersedes v6.8]
SDR_Control_Plane_Specification_v1_1.md                       [carried forward from v2.5.2]
SDR_Specification_Schedule_and_Folder_Structure_v1_9.md       [carried forward from v2.5.2]
```

## 5. `docs/01_active_build/`

Active build and AI build playbooks:

```
Commander_SDR_AI_Build_Playbooks_v1_7.md                      [carried forward from v2.5.2; non-authoritative at v2.6.2 — see AGENTS.md "Stale Document Notice"]
```

## 6. `docs/02_child_specs/`

### v2.5.2 child specs (carried forward; 12 marked carry v2.6 addendums)

```
01_AI_Build_Agent_Workflow_Spec.md
02_DevOps_Environments_CICD_Spec.md
03_Backend_API_Architecture_Spec.md
04_Frontend_Architecture_Spec.md
05_Data_Connector_Normalisation_Implementation_Spec_v1_5.md
06_Worker_and_Scheduling_Spec.md
07_Drift_and_Rule_Engine_Spec.md
08_Case_Management_Workflow_Spec.md                                   [v2.6 addendum appended]
09_Connector_Architecture_Spec.md
10_Platform_Security_and_Hardening_Spec.md
11a_UI_UX_Design_System_Spec.md
11b_Workspace_Dashboard_Composition_Spec.md
12_SDR_Normalisation_Strategy.md
13_Commander_AI_Architecture_and_Grounding_Rules.md
14_Push_Engine_Architecture.md
15_SIEM_SOAR_Rule_Generation_Templates.md
16_Performance_Scaling_and_Operational_Spec.md
17_Closed_Loop_Control_Architecture.md                                [v2.6 addendum appended]
18_Unified_Identity_Architecture.md                                   [v2.6 addendum appended]
19_Full_RBAC_Permission_Matrix.md                                     [v2.6 addendum appended]
20_Coordinated_Push_Group_Schema.md
21_BAS_Connector_Integration_Contract.md
22_Architecture_Intelligence_Engine.md
23_Security_Tool_Intelligence_Specification.md
24_Connector_API_Reference_Framework_Spec.md
25_Trust_Boundary_and_Third_Party_Intelligence_Spec.md
26_Case_Communication_and_Broadcast_Channel_Spec.md
26a_Closed_Loop_Email_Case_Communication_Lifecycle_Spec_v1_2.md
27_Shared_Responsibility_Profile_and_Configuration_Governance_Spec.md
28_Strategic_and_Tactical_Priority_Framework_Spec.md                  [v2.6 addendum appended]
29_Universal_Risk_Object_and_Case_Binding_Spec.md                     [v2.6 addendum appended]
30_Universal_Validation_Closure_and_Reopening_Lifecycle_Spec.md
31_Routing_Model_and_Team_Affinity_Spec.md                            [v2.6 addendum appended]
32_Strategy_Layer_Runtime_Surface_Spec.md
33_Multi_Domain_Fusion_Map_Spec.md                                    [v2.6 addendum appended]
34_Mission_Control_System_Team_Domain_Pulse_Spec.md
35_Shell_UI_Functional_Surface_Spec.md
36_Commander_Internal_Control_Plane_Application_Architecture_Spec.md
37_Commander_Internal_Control_Plane_to_SDR_Runtime_Contract.md
38_Commander_Internal_Control_Plane_UI_Surface_Spec.md
39_Commander_Application_Boundary_and_Naming_Model_Spec.md
40_P0_Zero_Day_Priority_Override_Spec.md
41_Commander_SDR_Military_Intelligence_UI_Doctrine_Spec.md            [v2.6 addendum appended]
42_Commander_SDR_UI_Component_Catalogue_Spec.md
43_Commander_SDR_Graph_Gauge_and_Overlay_System_Spec.md
44_Commander_SDR_P0_Zero_Day_War_Room_UI_Spec.md
45_Commander_SDR_Application_Shell_Boundary_Spec.md
46_Canonical_Terminology_and_Object_Glossary.md                       [v2.6 addendum appended]
47_Application_Route_and_Navigation_Register.md                       [v2.6 addendum appended]
48_Active_Shell_UI_Authority.md
49_Admin_Control_Surface_Information_Architecture_Spec.md
50_RBAC_Entitlement_Feature_Flag_Menu_Visibility_Spec.md
51_Rule_Model_and_Decision_Governance_Surface_Spec.md
52_Structured_Mission_Objective_Binding_Model_Spec.md
53_Shell_UI_Usability_Correction_Spec.md
54_Pre_Build_UI_Navigation_and_Route_Baseline_v2_5.md
55_Baseline_Configuration_Framework_Model_and_Defaults_Spec.md        [v2.6 addendum appended]
56_Shell_Reference_vs_Build_Authority_Doctrine_Spec.md
```

### v2.6 new child specs

```
57_Security_Command_and_Control_Doctrine_Spec.md                      [v2.6 — new]
58_Security_OODA_Loop_Specification.md                                [v2.6 — new]
59_Intelligence_Layer_Architecture_Spec.md                            [v2.6 — new]
60_Internal_and_External_Attack_Surface_Framework_Spec.md             [v2.6 — new]
61_Universal_Security_Signal_Connector_Contract_Spec.md               [v2.6 — new]
62_Verdict_Semantics_Specification.md                                 [v2.6 — new]
65_External_Operating_Picture_Surface_Spec.md                         [v2.6 — new]
66_Internal_Operating_Picture_Surface_Spec.md                         [v2.6 — new]
67_OODA_Dashboard_Family_Spec.md                                      [v2.6 — new]
68_Identity_Intelligence_Surface_Spec.md                              [v2.6 — new]
69_Asset_Intelligence_Surface_Spec.md                                 [v2.6 — new]
70_Direction_Boards_Spec.md                                           [v2.6 — new]
71_Pre_Warned_Protected_Novel_Classification_Spec.md                  [v2.6 — new]
72_Inverse_Discovery_Loop_Spec.md                                     [v2.6 — new]
73_Silent_Defence_Reporting_Spec.md                                   [v2.6 — new]
74_Context_Aware_Drift_Prioritisation_Matrix_Spec.md                  [v2.6 — new]
75_Internal_Risk_Investigation_Sub_Lifecycle_Spec.md                  [v2.6 — new]
```

**Note on spec numbers #63 and #64:** Reserved. The schedule of named SOC Telemetry and Operational Verdict platforms is implemented via updates to `docs/03_api_specs/INDEX.md` rather than as parallel binding specs. The reserved spec numbers may be used for future v2.6.x extensions if required.

### Panel specs

```
SOM_Configuration_Panel_Spec_v1_6.md                                  [carried forward from v2.5.2]
TAP_Tenant_Admin_Panel_Spec_v1_0.md                                   [carried forward from v2.5.2]
```

## 7. `docs/03_api_specs/`

Reference inputs (outside binding precedence chain per `API_SPEC_INTAKE_RULES.md`):

```
API_SPEC_INTAKE_RULES.md                                              [carried forward from v2.5.2]
INDEX.md                                                              [v2.6 addendum appended]
audit_telemetry/                                                      [carried forward]
cloud_infrastructure/                                                 [carried forward]
collaboration/                                                        [carried forward]
endpoint_management/                                                  [carried forward]
identity/                                                             [carried forward]
network_security/                                                     [carried forward]
security_tools/                                                       [carried forward; new entries for v2.6 SOC Telemetry connectors documented in INDEX.md]
vulnerability_exposure/                                               [carried forward]
```

## 8. `docs/06_ui_build_reference/`

```
commander-sdr-shell-v11-admin-navigation.html                         [carried forward from v2.5.2]
commander-commercial-control-plane-shell-v3-admin-navigation.html     [carried forward from v2.5.2]
```

## 9. `docs/feature_registry/`

```
SDR_Feature_Registry_FR001_v1_0.md                                    [v2.6 addendum appended]
```

## 10. Conformance Summary

The v2.6 baseline package contains:

- **6 master / authority documents** (in `docs/00_master/`)
- **6 top-level files** (manifest, AGENTS.md, release notes)
- **1 active build playbook** (in `docs/01_active_build/`)
- **77 child specifications** (in `docs/02_child_specs/`), comprising:
  - 58 v2.5.2 specs carried forward (12 with v2.6 addendums)
  - 17 new v2.6 specs (Spec #57-#75, with #63 and #64 reserved)
  - 2 panel specs (SOM, TAP)
- **1 API spec index plus 8 category folders** (in `docs/03_api_specs/`)
- **2 UI build references** (in `docs/06_ui_build_reference/`)
- **1 feature registry** (in `docs/feature_registry/`)

## 11. Supersession Statement

This manifest supersedes `CURRENT_BASELINE_MANIFEST_v2_5_2.md` in full. The v2.5.2 manifest is retired and no longer authoritative.

## 12. Validation Rules

Build pipelines, audit operations, and conformance evaluations validate against this manifest by:

1. Confirming every file listed exists at the expected path.
2. Confirming no files exist at expected paths that are not in this manifest (with the documented exception of generated artefacts in CI directories).
3. Confirming v2.6 addendums are present in the 12 specs marked above.
4. Confirming the binding precedence chain is honoured per `00_AUTHORITY_AND_PRECEDENCE_v2_6.md`.
5. Confirming the Feature Registry FR001 includes the v2.6 addendum block.

## 13. Pack 2 Reference

The Next Stage Approach Pack v1.7.3 binds to this baseline and is delivered separately as `Commander_SDR_Next_Stage_Approach_Pack_v1_7_3.zip`. The Approach Pack is not part of this baseline pack manifest.


## v2.6.1 Handover-Control Addendum

v2.6.1 adds `MEMORY.md`, `RELEASE_NOTES_v2_6_1.md`, and a small `AGENTS.md` boot-sequence update. No master or child specification content is changed.

This addendum supports the companion Next Stage Approach Pack v1.7, which clarifies the simplified build path:

```text
Source Docs → Build Packs → Code
```

The build stack clarification is:

- GitHub / Git / VS Code remain core.
- Codex and GitHub Copilot remain build-support tools.
- n8n remains the workflow orchestrator in the next-stage pack.
- DeepSeek, Ollama, Zapier and Microsoft Lists are not required core build-stack components.
