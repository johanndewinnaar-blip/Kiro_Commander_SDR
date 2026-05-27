# Commander SDR — AI Build Playbooks

**Version:** v1.7  
**Date:** May 2026  
**Purpose:** Practical operating playbooks for using Claude/ChatGPT to maintain documents and Codex to build Commander SDR in small, reviewable tasks.

---

## Version v1.2 Alignment Note

This playbook is aligned to the final baseline pack:

```text
docs/00_master/Commander_SDR_Master_Proposition_v4_7.md
docs/00_master/Commander_SDR_Master_Technical_Specification_v6_7.md
docs/00_master/SDR_Specification_Schedule_and_Folder_Structure_v1_8.md
docs/02_child_specs/05_Data_Connector_Normalisation_Implementation_Spec_v1_5.md
docs/01_active_build/Commander_SDR_AI_Build_Playbooks_v1_3.md
AGENTS.md
```

API Strategy v4, Core Data Model Baseline v1.2, Identity Matching Spec v1, Connector Specification v1, and Asset Matching & Deduplication Spec v1 are consolidated into `05_Data_Connector_Normalisation_Implementation_Spec_v1_3.md` and are not active build authorities.

---

## Current Source-of-Truth Pack

Active project documents:

```text
docs/00_master/Commander_SDR_Master_Proposition_v4_7.md
docs/00_master/Commander_SDR_Master_Technical_Specification_v6_7.md
docs/00_master/SDR_Specification_Schedule_and_Folder_Structure_v1_8.md
```

Active Phase 0 build references:

```text
docs/02_child_specs/05_Data_Connector_Normalisation_Implementation_Spec_v1_5.md
docs/02_child_specs/Spec_08_Case_Management_Workflow_v1_6.md
docs/02_child_specs/SOM_Configuration_Panel_Spec_v1_6.md
```

Operating files:

```text
README.md
AGENTS.md
Commander_SDR_AI_Build_Playbooks_v1_3.md
```

---

## Document Completion Register

This is the live document-status register for Commander SDR.  
Status values are deliberately simple: **Done**, **Done if file exists**, **Partial**, or **Not Done**.

| # | Document | Status |
|---:|---|---|
| 1 | `Commander_SDR_Master_Proposition_v4_7.md` | **Done** |
| 2 | `Commander_SDR_Master_Technical_Specification_v6_7.md` | **Done** |
| 3 | `SDR_Specification_Schedule_and_Folder_Structure_v1_8.md` | **Done** |
| 4 | `Commander_SDR_AI_Build_Playbooks_v1_3.md` | **Done** |
| 5 | `AGENTS.md` | **Done** |
| 6 | `05_Data_Connector_Normalisation_Implementation_Spec_v1_3.md` | **Done** |
| 7 | `08_Case_Management_Workflow_Spec_v1_4.md` | **Done if v1.3 file exists** |
| 8 | `08a_SOM_Configuration_Panel_Spec_v1_4.md` | **Done if v1.3 file exists** |
| 9 | `02_DevOps_Environments_CICD_Spec.md` | **Not Done** |
| 10 | `03_Backend_API_Architecture_Spec.md` | **Not Done** |
| 11 | `04_Frontend_Architecture_Spec.md` | **Not Done** |
| 12 | `06_Worker_and_Scheduling_Spec.md` | **Not Done** |
| 13 | `07_Drift_and_Rule_Engine_Spec.md` | **Not Done** |
| 14 | `10_Platform_Security_and_Hardening_Spec.md` | **Not Done** |
| 15 | `11a_UI_UX_Design_System_Spec.md` | **Not Done** |
| 16 | `11b_Workspace_Dashboard_Composition_Spec.md` | **Not Done** |
| 17 | `13_Commander_AI_Architecture_and_Grounding_Rules.md` | **Partial — covered in MTS v6.3, not standalone** |
| 18 | `14_Push_Engine_Architecture.md` | **Not Done** |
| 19 | `15_SIEM_SOAR_Rule_Generation_Templates.md` | **Not Done** |
| 20 | `16_Performance_Scaling_and_Operational_Spec.md` | **Not Done** |
| 21 | `17_Closed_Loop_Control_Architecture.md` | **Not Done** |
| 22 | `18_Unified_Identity_Architecture.md` | **Not Done** |
| 23 | `19_Full_RBAC_Permission_Matrix.md` | **Not Done** |
| 24 | `20_Coordinated_Push_Group_Schema.md` | **Not Done** |
| 25 | `21_BAS_Connector_Integration_Contract.md` | **Not Done** |
| 26 | `22_Architecture_Intelligence_Engine.md` | **Not Done** |
| 27 | `23_Security_Tool_Intelligence_Specification.md` | **Not Done** |
| 28 | `25_Trust_Boundary_and_Third_Party_Intelligence_Spec.md` | **Not Done** |
| 29 | `26_Case_Communication_and_Broadcast_Channel_Spec.md` | **Not Done** |
| 30 | `27_Shared_Responsibility_Profile_and_Configuration_Governance_Spec.md` | **Not Done** |
| 31 | `28_Strategic_and_Tactical_Priority_Framework_Spec.md` | **Not Done** |
| 32 | `_TEMPLATE_Connector_API_Reference.md` | **Not Done** |
| 33 | `First_Connector_API_Reference.md` | **Not Done** |
| 34 | `00_Master_UI_Design_Direction.md` | **Not Done** |
| 35 | `Master_Layout_Spec.md` | **Not Done** |
| 36 | `Dashboard_Page_Briefs.md` | **Not Done** |
| 37 | `TEMPLATE_REVIEW.md` | **Not Done** |

### Status Summary

```text
Confirmed done: 6
Conditionally done: 2
Partial: 1
Not done: 28
```

### Next Document Creation Rule

Do not create every missing document before build.  
Create missing documents in the order required by the active Phase 0 build task unless the human owner explicitly requests a full documentation sprint.

The next most important missing documents are:

```text
1. 02_DevOps_Environments_CICD_Spec.md
2. 03_Backend_API_Architecture_Spec.md
3. 10_Platform_Security_and_Hardening_Spec.md
4. 06_Worker_and_Scheduling_Spec.md
5. 07_Drift_and_Rule_Engine_Spec.md
6. 04_Frontend_Architecture_Spec.md
```

---

## Core Build Rule

Never ask AI to build the whole SaaS.

Use this pattern:

```text
Complete issue P0-XX only.
Use the governing docs.
Do not build outside scope.
Explain intended changes before modifying files.
```

---

## Language and Runtime Policy

```text
TypeScript = product runtime
Terraform = infrastructure
Python = support scripts and analytics only
```

Python may only live under:

```text
scripts/python/
analytics/
```

Python must not be introduced into Phase 0 backend, workers, connectors, rules, database package, contracts package, or production runtime paths unless explicitly approved.

---

# Playbook 1 — Setup Playbook

## Goal

Create the clean local/GitHub repo and prepare it for Claude checks and Codex implementation.

## Step 1 — Create local workspace

```powershell
mkdir C:\CommanderSDR
cd C:\CommanderSDR
```

## Step 2 — Clone repo

```powershell
git clone https://github.com/johanndewinnaar-blip/MySaaSApp.git
cd MySaaSApp
```

## Step 3 — Create rebuild branch

```powershell
git checkout -b rebuild/commander-sdr-baseline
```

## Step 4 — Clear current repo contents if they have no value

```powershell
Get-ChildItem -Force | Where-Object { $_.Name -ne ".git" } | Remove-Item -Recurse -Force
```

## Step 5 — Create lean folder structure

```powershell
mkdir docs
mkdir docs\00_master
mkdir docs\01_phase_0_foundation
mkdir docs\02_phase_1_capability
mkdir docs\03_phase_2_intelligence
mkdir docs\04_connector_api_references
mkdir docs\05_design_reference
mkdir docs\05_design_reference\mockup_images
mkdir docs\05_design_reference\template_reference
mkdir docs\05_design_reference\master_layout
mkdir docs\05_design_reference\use_case_page_maps
mkdir docs\90_prompts
mkdir docs\99_archive
mkdir docs\99_archive\reference_inputs
mkdir docs\99_archive\superseded

mkdir apps
mkdir apps\web
mkdir apps\api

mkdir packages
mkdir packages\db
mkdir packages\contracts
mkdir packages\connectors
mkdir packages\rules
mkdir packages\workers
mkdir packages\shared
mkdir packages\ui

mkdir infra
mkdir infra\terraform
mkdir infra\docker
mkdir infra\github-actions

mkdir scripts
mkdir scripts\python

mkdir analytics
mkdir analytics\experiments
mkdir analytics\notebooks

mkdir tests
mkdir tests\unit
mkdir tests\integration
mkdir tests\contract
mkdir tests\tenant-isolation
mkdir tests\e2e
```

## Step 6 — Add active documents

Copy into `docs/00_master/`:

```text
Commander_SDR_Master_Proposition_v4_7.md
Commander_SDR_Master_Technical_Specification_v6_7.md
SDR_Specification_Schedule_and_Folder_Structure_v1_8.md
SDR_API_Strategy_v4.md
```

Copy into `docs/02_child_specs/`:

```text
05_Data_Connector_Normalisation_Implementation_Spec_v1_3.md
08_Case_Management_Workflow_Spec_v1_4.md
08a_SOM_Configuration_Panel_Spec_v1_4.md
```

Copy older source inputs into `docs/99_archive/reference_inputs/`:

```text
SDR_Asset_Matching_Dedup_Spec_v1.docx
SDR_Connector_Specification_v1.docx
```

## Step 7 — Create README.md and AGENTS.md

Use Claude/ChatGPT to create these two files. `AGENTS.md` must tell Codex:

```text
- read the source-of-truth documents first;
- work only on the assigned issue;
- never commit to main;
- preserve tenant isolation;
- no real push execution in Phase 0;
- no Phase 1/2 capabilities during Phase 0;
- TypeScript-first runtime;
- Python support-only;
- mockups/templates are design reference only;
- use 05_Data_Connector_Normalisation_Implementation_Spec_v1_3.md for data/connector/normalisation work.
```

## Step 8 — Commit setup branch

```powershell
git status
git add .
git commit -m "Rebuild Commander SDR repository baseline"
git push -u origin rebuild/commander-sdr-baseline
```

## Step 9 — Open PR

```powershell
gh pr create --title "Rebuild Commander SDR repository baseline" --body "Creates clean Commander SDR repo structure, master docs, active Phase 0 build references, AI guardrails, and design/reference boundaries." --base main --head rebuild/commander-sdr-baseline
```

---

# Playbook 3 — Child Tech Spec Creation Playbook

## Goal

Reduce document count while ensuring Codex has enough implementation detail to build safely.

## Rule

Do not create every registered spec upfront. The schedule is a register, not a demand to author all documents immediately.

## Active Phase 0 specs now

```text
05_Data_Connector_Normalisation_Implementation_Spec_v1_3.md
08_Case_Management_Workflow_Spec_v1_4.md
08a_SOM_Configuration_Panel_Spec_v1_4.md
```

## Just-in-time specs later

Create these only when Codex is about to build the related module:

```text
02_DevOps_Environments_CICD_Spec.md
03_Backend_API_Architecture_Spec.md
04_Frontend_Architecture_Spec.md
06_Worker_Scheduling_Spec.md
07_Drift_Rule_Engine_Spec.md
10_Platform_Security_Hardening_Spec.md
11a_UI_UX_Design_System.md
11b_Workspace_Dashboard_Composition.md
```

## Standard child-spec prompt

```text
You are creating a Commander SDR implementation specification.

Read first:
- Commander_SDR_Master_Proposition_v4_7.md
- Commander_SDR_Master_Technical_Specification_v6_7.md
- SDR_Specification_Schedule_and_Folder_Structure_v1_8.md
- AGENTS.md
- existing active Phase 0 specs relevant to the task

Target document:
[INSERT DOCUMENT NAME]

Rules:
1. Do not invent product capability.
2. Keep Phase 0 scope tight.
3. Make the spec practical for Codex.
4. Include implementation boundaries, folder/file ownership, contracts, tests and acceptance criteria.
5. Preserve TypeScript-first runtime.
6. Keep Python support-only.
7. Do not introduce real push execution in Phase 0.
8. Do not contradict the active data/connector/normalisation spec.

Output markdown only.
```

## Claude final check before Codex

```text
Review this proposed spec or Codex task.

Check:
1. bounded task;
2. correct governing docs;
3. no Phase 1/2 leakage;
4. no real push execution;
5. TypeScript-first runtime;
6. Python support-only;
7. design references not treated as production code;
8. tenant isolation covered;
9. tests included;
10. human review gates included.

Output Ready / Not Ready, blockers, warnings, and corrected prompt if needed.
```

---

# Playbook 2 — Build Playbook

## Goal

Use Codex to build Commander SDR one issue at a time.

## Phase 0 build order

| Order | Issue | Build focus |
|---:|---|---|
| 1 | P0-01 | Repo, tooling and environment baseline |
| 2 | P0-02 | Database schema and migration baseline |
| 3 | P0-03 | Auth, tenant context and RBAC skeleton |
| 4 | P0-04 | Connector framework skeleton |
| 5 | P0-05 | First connector spike — AWS Config + Security Hub |
| 6 | P0-06 | Raw ingestion pipeline |
| 7 | P0-07 | Normalisation baseline |
| 8 | P0-08 | Drift rule engine skeleton |
| 9 | P0-09 | Case management baseline |
| 10 | P0-10 | Audit trail baseline |
| 11 | P0-11 | UI shell |
| 12 | P0-12 | Push approval gate only |

## Repeat for each issue

### 1. Start from baseline

```powershell
cd C:\CommanderSDR\MySaaSApp
git checkout rebuild/commander-sdr-baseline
git pull
```

### 2. Create Codex branch

```powershell
git checkout -b codex/p0-XX-short-name
```

### 3. Start Codex

```powershell
codex
```

### 4. Standard Codex prompt

```text
You are working on Commander SDR.

Read first:
- AGENTS.md
- README.md
- docs/00_master/Commander_SDR_Master_Proposition_v4_7.md
- docs/00_master/Commander_SDR_Master_Technical_Specification_v6_7.md
- docs/00_master/SDR_Specification_Schedule_and_Folder_Structure_v1_8.md
- docs/02_child_specs/05_Data_Connector_Normalisation_Implementation_Spec_v1_5.md if the task touches data, connector, ingestion, normalisation, matching, or deduplication
- [add the governing spec for this issue]

Task:
Complete issue [P0-XX title] only.

Allowed scope:
[paste from issue]

Out of scope:
[paste from issue]

Requirements:
- TypeScript-first runtime.
- No Python in production runtime.
- No real push execution in Phase 0.
- Do not implement Phase 1 or Phase 2 features.
- Do not add unnecessary dependencies.
- Do not use real secrets.
- Preserve tenant isolation.
- Include tests.
- Before making changes, explain intended file changes.
```

### 5. Human checkpoint

Check:

```text
Is it only doing this issue?
Is it adding unnecessary packages?
Is it touching files it should not?
Is it building future features?
Is it introducing Python into production runtime?
Are tests included?
Is tenant isolation preserved?
```

If wrong:

```text
Stop. You are exceeding the issue scope. Remove anything outside P0-XX and retry with only the allowed scope.
```

### 6. Run tests

```powershell
pnpm install
pnpm test
pnpm build
```

If tests fail:

```text
Fix only the failing tests/build errors. Do not add new features. Do not change issue scope.
```

### 7. Commit and PR

```powershell
git status
git add .
git commit -m "P0-XX short description"
git push -u origin codex/p0-XX-short-name

gh pr create --base rebuild/commander-sdr-baseline --head codex/p0-XX-short-name --title "P0-XX Short title" --body "Implements P0-XX according to the governing Phase 0 specs. Includes tests and remains within approved scope."
```

### 8. Review and merge

PR review checklist:

```text
Follows AGENTS.md
Only completes the issue
No Phase 1/2 scope
No real push execution
No secrets
Tenant isolation preserved
Tests included
No overbuild
No Python runtime introduced
```

Merge if clean:

```powershell
gh pr merge --squash
git checkout rebuild/commander-sdr-baseline
git pull
```

---

## Phase 0 exit criteria

```text
User can log in
Tenant context exists
AWS connector exists
Connector can pull/mock-pull data
Raw data is stored
Data normalises into canonical entities
Asset matching/deduplication works
Rules run
Findings are created
Findings become cases
Analyst can view cases in UI
Case actions create audit events
Push approval can be proposed
No real push execution happens
```

---

*End of playbook v1.2.*


---

## Playbook Amendment — Closed-Loop Email Enhancement

Closed-loop email is registered as a Phase 1 capability under Spec #26a.

Agents must not implement Microsoft Graph email ingestion, mailbox send, mailbox subscription renewal, email correlation workers, or email lifecycle tables during Phase 0 unless the human owner explicitly promotes the scope.

For any task touching case email communication, agents must read:

```text
Commander_SDR_Master_Proposition_v4_7.md
Commander_SDR_Master_Technical_Specification_v6_7.md
SDR_Specification_Schedule_and_Folder_Structure_v1_8.md
Spec_08_Case_Management_Workflow_v1_4.md
SOM_Configuration_Panel_Spec_v1_4.md
26a_Closed_Loop_Email_Case_Communication_Lifecycle_Spec_v1_0.md
AGENTS.md
```

Required boundary:

- Teams/Slack remain reference-and-import providers.
- Email is a separate tenant-configurable closed-loop provider.
- Graph failure must not block case operations.
- All email jobs and APIs must be tenant-scoped and audit-recorded.
- TypeScript-first runtime remains mandatory.


---

# Playbook Addendum v1.7 — Closed-Loop Email Baseline Build Guardrails

When working on closed-loop email, case communication, SIR or VM mailbox workflows, agents must read:

```text
Commander_SDR_Master_Proposition_v4_7.md
Commander_SDR_Master_Technical_Specification_v6_7.md
SDR_Specification_Schedule_and_Folder_Structure_v1_8.md
26a_Closed_Loop_Email_Case_Communication_Lifecycle_Spec_v1_2.md
Spec_08_Case_Management_Workflow_v1_6.md
SOM_Configuration_Panel_Spec_v1_6.md
05_Data_Connector_Normalisation_Implementation_Spec_v1_5.md
AGENTS.md
```

Phase 0 rule remains: do not implement Microsoft Graph send/receive/subscription/delta sync/SIR dispatch unless Johann explicitly promotes the work into Phase 0.

Before coding, the agent must explain:

1. which communication object is affected: parent case, sub-case/action, swarm workstream, SIR or inbound allocation item;
2. what mailbox and approval policy are involved;
3. how tenant isolation is enforced;
4. which audit events are written;
5. whether the change is Phase 1 or explicitly promoted.


---

# Closed Architecture Decisions — Approved Build-Ready Baseline v1.0

The following decisions are now closed for this baseline and SHALL govern all downstream child specifications, implementation tickets, AI-agent work and manual review activity.

| ID | Decision Area | Binding Decision |
|---|---|---|
| CAD-EMAIL-001 | Microsoft Graph permissions | SDR SHALL use least-privilege Microsoft Graph permissions with tenant administrator consent. Approved mailboxes SHALL be explicitly configured. SDR SHALL NOT assume unrestricted tenant-wide mailbox access. Where application permissions are required, access SHALL be constrained to approved mailboxes through Microsoft 365 / Exchange controls and recorded in the tenant audit trail. |
| CAD-EMAIL-002 | Email body storage | SDR SHALL default to metadata-first email storage. Full message body storage SHALL be disabled by default and enabled only through tenant retention/evidence policy, explicit analyst evidence capture, SIR generation, or regulated deployment configuration. SIR bodies generated by SDR SHALL be stored as case evidence and audit material. |
| CAD-EMAIL-003 | Mailbox rollout sequence | The initial closed-loop email implementation SHALL prioritise tenant-approved shared mailboxes as the primary operational mailbox type. Microsoft 365 group mailboxes SHALL follow after shared mailbox support. Individual user mailbox sending SHALL be supported later where required, but SHALL NOT be the baseline operational model. |
| CAD-SIR-001 | SIR acknowledgement | SIR acknowledgement SHALL be supported in Phase 1 through email reply correlation, manual acknowledgement, and optional incident reference capture. Full incident-management platform integration is deferred and SHALL NOT block SIR capability. A SIR creates a governed hand-off; it does not convert the SDR case into an incident record. |
| CAD-VM-001 | VM closure gates | VM communication closure gates SHALL be provided as a configurable policy. The default tenant posture SHALL surface advisory closure checks without hard-blocking closure unless the tenant enables enforcement. For externally notified, KEV, SIR-linked, or risk-accepted vulnerability cases, SDR SHOULD recommend enforced closure gates. |
| CAD-GOV-001 | Communication approval chain | Communication approval SHALL be resolved through the tenant-configured Communication Permission and Approval Chain Matrix. Approval routing SHALL support upward chain-of-command resolution from the originating case, sub-case, action, swarm workstream, mailbox, queue, team, and recipient class. SDR SHALL NOT hard-code grade-based approval rules, although default templates MAY be supplied. |
| CAD-SIR-002 | SIR origination from sub-case/action | Authorised users SHALL be able to raise a Security Incident Report / Referral from a parent case, sub-case, case action, or case swarm workstream. The SIR SHALL preserve linkage to the originating object and SHALL roll up to the parent case timeline, communication record, audit trail, and evidence pack. The generated SIR summary SHALL include both parent case context and originating object context. |

## Baseline Status

There are no remaining open architecture decisions for the closed-loop email, Communication Administration, SIR, sub-case/action communication, or VM mailbox workflow enhancement pack. Implementation-level choices such as exact API field names, UI component layout and test fixture contents remain subordinate specification or build-ticket matters and SHALL NOT reopen the architecture decisions above.


---

# CHANGE-ARCH-002 AI Build Rule Addendum

## Domain schema rule

Before generating backend, database, worker, repository, API, or contract code, the agent SHALL identify the target domain schema:

```text
core, asset, identity, exposure, control, case_mgmt, communication, connector, normalisation, rule_engine, push, compliance, architecture, tooling, audit, admin, ai
```

No new database table may be added without:

```text
domain schema decision
tenant_id decision
index strategy
audit/provenance decision
migration plan
```

## Stack rule

Agents SHALL use the baseline stack: React/Next.js, TypeScript, Tailwind CSS, shadcn/ui, Fastify, PostgreSQL, Drizzle, Redis/BullMQ, OpenSearch, Docker, Terraform, GitHub Actions, and OpenTelemetry-compatible observability.

## Local/cloud boundary

Agents SHALL NOT require Terraform, AWS credentials, or cloud resources for local development. Local build uses Docker Compose and pnpm/npm scripts. Terraform is for cloud infrastructure only.

## Security baseline rule

Agents SHALL not implement a custom MFA engine unless explicitly tasked. MFA is delegated to the tenant identity provider. Safe View Mode is a UI/export masking baseline, not full DLP.

## Deferred feature rule

Agents SHALL NOT implement Connector Data Flush unless explicitly tasked in a later approved change.


---

# DOCUMENT-SPECIFIC REVISION PATCH — Commander_SDR_AI_Build_Playbooks_v1_7.md

**Patch date:** 2026-05-13  
**Patch type:** Functional review remediation  
**Authority:** Closed-loop doctrine patch v2.0  

## Required Update Applied

This document is updated to align with Commander SDR closed-loop doctrine and the functional review remediation baseline.

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
## v2.3 Build Playbook Update — UI Doctrine Pipeline
The AI build pipeline must process UI work in this order: doctrine spec, token system, component catalogue, page composition, graph/gauge/overlay system, P0 War Room, Fusion Map, then shell examples. Do not generate new shell variants before confirming the page/component intent and application boundary.

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
