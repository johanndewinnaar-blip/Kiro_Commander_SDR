# Commander SDR — Navigation Rationalisation Analysis

**Purpose:** Map all 110 pages by menu node, use case persona, and surface classification. Provide rationalisation recommendations to simplify the estate before UIAA-3.0 execution.
**Date:** 2026-06-09
**Status:** Analysis — requires owner decision before execution.

---

## 1. Current Estate by Menu Node

### BOUNDARY 1: Operational App (19 sidebar groups + top nav + orphans)

#### Top Navigation Workspaces (5 tabs — direct access)

| Tab | Route | Pages Behind It |
|-----|-------|----------------|
| Command Centre | `/` | 1 (landing) |
| Fusion Map | `/fusion-map` | 4 (/fusion-map, /blast-radius, /mission, /p0) |
| Vulnerabilities | `/vulnerabilities` | 4 (/vulnerabilities, /kev, /patches, /supply-chain) |
| Identity | `/identity` | 3 (/identity, /privileged, /drift) |
| Architecture | `/architecture` | 3 (/architecture, /drift, /dependencies) |

**Top Nav Total: 15 pages**

---

#### Group 1: Case Management (4 nav items + 1 detail)

| Nav Item | Route | Status |
|----------|-------|--------|
| My Cases | /cases/my | BUILD |
| All Cases | /cases | BUILD |
| P0 Zero-Day | /war-room/p0 | BUILD |
| Case Analytics | /cases/analytics | BUILD |
| *Case Detail* | /cases/[id] | BUILD (drill) |

**Pages: 5** | **Primary Persona: Security Analyst, SOM**

---

#### Group 2: Mission Control (3 nav items)

| Nav Item | Route | Status |
|----------|-------|--------|
| Mission Overview | /mission/overview | SCAFFOLD |
| Mission Objectives | /mission/objectives | SCAFFOLD |
| Mission Impact | /mission/impact | SCAFFOLD |

**Pages: 3** | **Primary Persona: CISO, SOM**

---

#### Group 3: Fusion Map (4 nav items)

| Nav Item | Route | Status |
|----------|-------|--------|
| Relationship Graph | /fusion-map | SCAFFOLD |
| Blast Radius | /fusion-map/blast-radius | SCAFFOLD |
| Mission Overlay | /fusion-map/mission | SCAFFOLD |
| P0 Overlay | /fusion-map/p0 | SCAFFOLD |

**Pages: 4** | **Primary Persona: Security Architect, SOM**

---

#### Group 4: Vulnerability Management (4 nav items)

| Nav Item | Route | Status |
|----------|-------|--------|
| Overview | /vulnerabilities | BUILD |
| KEV & Critical | /vulnerabilities/kev | SCAFFOLD |
| Patch Intelligence | /vulnerabilities/patches | SCAFFOLD |
| Code & Supply Chain | /vulnerabilities/supply-chain | SCAFFOLD |

**Pages: 4** | **Primary Persona: Vulnerability Analyst, Security Analyst**

---

#### Group 5: Exposure Management (3 nav items)

| Nav Item | Route | Status |
|----------|-------|--------|
| Attack Surface | /exposure | SCAFFOLD |
| Blast Zones | /exposure/blast-zones | SCAFFOLD |
| Coverage Gaps | /exposure/coverage-gaps | SCAFFOLD |

**Pages: 3** | **Primary Persona: Security Architect, Vulnerability Analyst**

---

#### Group 6: Identity & Access (3 nav items)

| Nav Item | Route | Status |
|----------|-------|--------|
| Identity Overview | /identity | BUILD |
| Privileged Access | /identity/privileged | BUILD |
| Access Drift | /identity/drift | BUILD |

**Pages: 3** | **Primary Persona: Identity/Access Specialist, Security Analyst**

---

#### Group 7: Architecture (3 nav items)

| Nav Item | Route | Status |
|----------|-------|--------|
| Architecture Overview | /architecture | SCAFFOLD |
| Architecture Drift | /architecture/drift | SCAFFOLD |
| Dependency Map | /architecture/dependencies | SCAFFOLD |

**Pages: 3** | **Primary Persona: Security Architect, SOM**

---

#### Group 8: Assets (3 nav items)

| Nav Item | Route | Status |
|----------|-------|--------|
| Inventory | /assets | BUILD |
| Ownership | /assets/ownership | BUILD |
| Classification | /assets/classification | BUILD |

**Pages: 3** | **Primary Persona: Security Analyst, Security Architect**

---

#### Group 9: Controls (3 nav items)

| Nav Item | Route | Status |
|----------|-------|--------|
| Control Coverage | /controls | BUILD |
| Control Strength | /controls/strength | SCAFFOLD |
| Framework Mapping | /controls/frameworks | SCAFFOLD |

**Pages: 3** | **Primary Persona: Risk/Compliance/Audit, Security Architect**

---

#### Group 10: Coverage (4 nav items)

| Nav Item | Route | Status |
|----------|-------|--------|
| Coverage Overview | /coverage | SCAFFOLD |
| Scanner Coverage | /coverage/scanners | SCAFFOLD |
| Telemetry Coverage | /coverage/telemetry | SCAFFOLD |
| Coverage Blindspots | /coverage/blindspots | BUILD |

**Pages: 4** | **Primary Persona: SOM, Security Architect**

---

#### Group 11: Tool Health (3 nav items)

| Nav Item | Route | Status |
|----------|-------|--------|
| Tool Health | /tool-health | BUILD |
| Connectors | /tool-health/connectors | BUILD |
| Source Freshness | /tool-health/freshness | BUILD |

**Pages: 3** | **Primary Persona: SOM, Platform Engineer**

---

#### Group 12: Team Pulse (3 nav items)

| Nav Item | Route | Status |
|----------|-------|--------|
| Workload | /team-pulse/workload | BUILD |
| SLA Pressure | /team-pulse/sla | BUILD |
| Escalation Queue | /team-pulse/escalation | BUILD |

**Pages: 3** | **Primary Persona: SOM**

---

#### Group 13: Domain Pulse (3 nav items)

| Nav Item | Route | Status |
|----------|-------|--------|
| Domain Overview | /domain-pulse | BUILD |
| Failed Validation | /domain-pulse/failed-validation | BUILD |
| Closure Blockers | /domain-pulse/closure-blockers | BUILD |

**Pages: 3** | **Primary Persona: SOM, CISO**

---

#### Group 14: System Pulse (3 nav items)

| Nav Item | Route | Status |
|----------|-------|--------|
| Engine Health | /system-pulse/engine | BUILD |
| Queue Backlog | /system-pulse/queues | BUILD |
| Data Freshness | /system-pulse/freshness | BUILD |

**Pages: 3** | **Primary Persona: SOM, Platform Engineer**

---

#### Group 15: Platform (11 nav items)

| Nav Item | Route | Status |
|----------|-------|--------|
| Platform Overview | /platform | SCAFFOLD |
| Connectors & Data Sources | /platform/connectors | BUILD |
| Data Quality | /platform/data-quality | BUILD |
| Rule Engine | /platform/rules | BUILD |
| Rule Validation | /platform/rules/validation | BUILD |
| Rule Simulation | /platform/rules/simulation | BUILD |
| Model Management | /platform/models | BUILD |
| Model Lifecycle | /platform/models/lifecycle | BUILD |
| Commander AI | /commander-ai | BUILD |
| Automation | /platform/automation | BUILD |
| Feature Availability | /platform/features | BUILD |
| Audit & Logs | /platform/audit | BUILD |

**Pages: 12** | **Primary Persona: SOM, Tenant Admin**

⚠️ **OBSERVATION: 11 sub-items — exceeds cognitive ceiling for sidebar group. Largest group in the estate.**

---

#### Group 16: Tenant Admin (6 nav items in operational sidebar)

| Nav Item | Route | Status |
|----------|-------|--------|
| Overview | /settings/tenant | SCAFFOLD |
| Baseline Configuration | /settings/baselines | SCAFFOLD |
| Users & Access | /settings/users-rbac | SCAFFOLD |
| Rules & Models | /settings/rules | SCAFFOLD |
| AI Configuration | /settings/commander-ai | BUILD |
| Audit | /settings/audit-export | SCAFFOLD |

**Pages in sidebar: 6** | **Primary Persona: Tenant Admin**

---

#### Group 17: Governance (4 nav items)

| Nav Item | Route | Status |
|----------|-------|--------|
| Compliance | /governance | BUILD |
| Policies & Standards | /governance/policies | SCAFFOLD |
| Exceptions | /governance/exceptions | SCAFFOLD |
| Decision Records | /governance/decisions | BUILD |

**Pages: 4** | **Primary Persona: Risk/Compliance/Audit, CISO**

---

#### Group 18: Reporting (3 nav items)

| Nav Item | Route | Status |
|----------|-------|--------|
| Reports | /reporting | BUILD |
| Exports | /reporting/exports | BUILD |
| CISO Pack | /reporting/ciso-pack | BUILD |

**Pages: 3** | **Primary Persona: CISO, SOM**

---

#### Group 19: SOM (5 nav items)

| Nav Item | Route | Status |
|----------|-------|--------|
| CISO Dashboard | /som/ciso | SCAFFOLD |
| Security Operations Manager | /som/security-operations | SCAFFOLD |
| Architecture Manager | /som/architecture | SCAFFOLD |
| Risk Manager | /som/risk | SCAFFOLD |
| Cloud Security Manager | /som/cloud-security | SCAFFOLD |

**Pages: 5** | **Primary Persona: CISO, SOM (role-specific dashboards)**

---

#### Orphan Pages (exist on disk, NOT in operational sidebar)

| Route | Reached Via | Notes |
|-------|-----------|-------|
| /operating-picture/external | Drill from Command Centre | Intentional drill-path |
| /operating-picture/internal | Drill from Command Centre | Intentional drill-path |
| /posture | Drill from Command Centre | Unit 16b |
| /ciso | Top nav (SCAFFOLD) | CISO entry point |
| /search | Global search bar | Intentional |
| /strategy/centre | Strategy group (added later) | ✅ In PAGE_SCHEDULE |
| /strategy/simulation | Strategy group | ✅ |
| /strategy/audit-history | Strategy group | ✅ |

**Orphan pages: 8** (most are intentional drill-paths or separate entry points)

---

### BOUNDARY 2: Tenant Admin (full settings estate — 17 pages)

| Route | Nav Context | Status |
|-------|------------|--------|
| /tenant-admin | Separate layout entry | SCAFFOLD |
| /settings/tenant | Overview | SCAFFOLD |
| /settings/baselines | Baseline Configuration | SCAFFOLD |
| /settings/users-rbac | Users & Access | SCAFFOLD |
| /settings/connectors | Connectors & Data Sources | BUILD |
| /settings/missions | Mission Configuration | BUILD |
| /settings/features | Feature Availability | SCAFFOLD |
| /settings/sla | SLA Configuration | BUILD |
| /settings/routing | Routing Configuration | BUILD |
| /settings/validation | Validation Rules | BUILD |
| /settings/closure-reopening | Closure & Reopening | BUILD |
| /settings/p0-zero-day | P0 / Zero-Day Config | SCAFFOLD |
| /settings/automation-boundaries | Automation Boundaries | BUILD |
| /settings/commander-ai | Commander AI Config | BUILD |
| /settings/security | Security | BUILD |
| /settings/audit-export | Audit & Export | SCAFFOLD |
| /settings/rules | Rules & Models | SCAFFOLD |

**Pages: 17** | **Primary Persona: Tenant Admin**

---

### BOUNDARY 3: Control Plane (13 pages)

| Route | Nav Item | Status |
|-------|---------|--------|
| /control-plane | Command Overview | BUILD |
| /control-plane/customers | Customers | SCAFFOLD |
| /control-plane/tenants | Tenants | SCAFFOLD |
| /control-plane/licences | Licences & Entitlements | SCAFFOLD |
| /control-plane/entitlements | Entitlements | BUILD |
| /control-plane/features | Product & Feature Control | SCAFFOLD |
| /control-plane/ai-models | AI & Model Control | SCAFFOLD |
| /control-plane/rule-packs | Rule & Policy Packs | SCAFFOLD |
| /control-plane/baselines | Baseline Profile Management | SCAFFOLD |
| /control-plane/deployment | Deployment & Release | SCAFFOLD |
| /control-plane/support | Support Operations | SCAFFOLD |
| /control-plane/billing | Billing / Usage Evidence | SCAFFOLD |
| /control-plane/audit | Operator Audit | SCAFFOLD |

**Pages: 13** | **Primary Persona: Seiertech Operator**

---

## 2. Persona-to-Page Mapping

### Persona: Security Analyst

**Primary workflow:** Triage → Investigate → Decide → Act

| Group | Pages Used | Frequency |
|-------|-----------|-----------|
| Case Management | /cases, /cases/my, /cases/[id], /cases/analytics | **DAILY — primary workspace** |
| Identity & Access | /identity, /identity/privileged, /identity/drift | Daily |
| Assets | /assets, /assets/ownership, /assets/classification | Daily |
| Vulnerability Mgmt | /vulnerabilities, /kev, /patches, /supply-chain | Daily |
| Command Centre | / | Daily (orientation) |
| Tool Health | /tool-health, /connectors, /freshness | Weekly |
| Operating Pictures | /operating-picture/external, /internal | Daily |

**Total pages: ~20** | **Navigation depth: mostly 1-2 clicks from sidebar**

---

### Persona: Security Operations Manager (SOM)

**Primary workflow:** Monitor → Direct → Approve → Measure

| Group | Pages Used | Frequency |
|-------|-----------|-----------|
| Command Centre | / | **DAILY — starts here** |
| SOM | /som/security-operations, /som/architecture, /som/risk | Daily |
| Team Pulse | /team-pulse/workload, /sla, /escalation | Daily |
| Domain Pulse | /domain-pulse, /failed-validation, /closure-blockers | Daily |
| System Pulse | /system-pulse/engine, /queues, /freshness | Daily |
| Case Management | /cases, /cases/analytics | Daily |
| Strategy | /strategy/centre, /strategy/simulation | Weekly |
| Platform | /platform/rules, /platform/automation, /platform/models | Weekly |
| Reporting | /reporting, /exports, /ciso-pack | Weekly |
| Governance | /governance, /governance/decisions | Weekly |
| Mission | /mission/overview, /mission/objectives | Weekly |

**Total pages: ~35** | **Observation: SOM touches the most nav groups (11+). Navigation fatigue risk.**

---

### Persona: CISO / Executive

**Primary workflow:** Orient → Assess → Decide → Direct

| Group | Pages Used | Frequency |
|-------|-----------|-----------|
| Command Centre | / | **DAILY — primary surface** |
| SOM / CISO | /som/ciso, /ciso | Daily |
| Reporting | /reporting/ciso-pack | Weekly |
| Mission | /mission/overview, /mission/impact | Weekly |
| Strategy | /strategy/centre | Monthly |
| Governance | /governance | Monthly |
| Operating Pictures | /operating-picture/external, /internal | Daily (during incidents) |
| War Room | /war-room/p0 | During P0 events |

**Total pages: ~10** | **Observation: Executive needs 4-6 pages total. Currently must navigate through 19-group sidebar to find them.**

---

### Persona: Security Architect

**Primary workflow:** Analyse → Design → Assess → Recommend

| Group | Pages Used | Frequency |
|-------|-----------|-----------|
| Architecture | /architecture, /drift, /dependencies | **DAILY** |
| Fusion Map | /fusion-map, /blast-radius, /mission | Daily |
| Exposure | /exposure, /blast-zones, /coverage-gaps | Daily |
| Assets | /assets, /ownership, /classification | Daily |
| Identity | /identity, /drift | Weekly |
| Controls | /controls, /strength, /frameworks | Weekly |
| Coverage | /coverage, /scanners, /telemetry, /blindspots | Weekly |

**Total pages: ~22** | **Observation: Architect's pages are spread across 7 nav groups.**

---

### Persona: Vulnerability Analyst

**Primary workflow:** Prioritise → Assess → Remediate → Validate

| Group | Pages Used | Frequency |
|-------|-----------|-----------|
| Vulnerability Mgmt | /vulnerabilities, /kev, /patches, /supply-chain | **DAILY — primary workspace** |
| Exposure | /exposure, /blast-zones, /coverage-gaps | Daily |
| Cases | /cases (filtered to vuln type), /cases/[id] | Daily |
| Assets | /assets | Daily (affected assets) |
| Coverage | /coverage, /scanners | Weekly |

**Total pages: ~13** | **Observation: Well-contained across 3-4 groups.**

---

### Persona: Identity/Access Specialist

**Primary workflow:** Monitor → Investigate → Remediate → Validate

| Group | Pages Used | Frequency |
|-------|-----------|-----------|
| Identity & Access | /identity, /privileged, /drift | **DAILY — primary workspace** |
| Cases | /cases (filtered to identity type), /cases/[id] | Daily |
| Operating Pictures | /operating-picture/internal | Daily |

**Total pages: ~6** | **Observation: Very focused. 1 primary group.**

---

### Persona: Tenant Admin

**Primary workflow:** Configure → Validate → Approve → Audit

| Group | Pages Used | Frequency |
|-------|-----------|-----------|
| Tenant Admin / Settings | ALL /settings/* | **PRIMARY — all 17 pages** |
| Platform | /platform/features (visibility) | Occasional |
| Strategy | /strategy/centre (policy) | Occasional |

**Total pages: ~19** | **Observation: Entirely within own boundary. Well-contained.**

---

### Persona: Seiertech Operator

**Primary workflow:** Monitor → Provision → Support → Audit

| Group | Pages Used | Frequency |
|-------|-----------|-----------|
| Control Plane | ALL /control-plane/* | **PRIMARY — all 13 pages** |

**Total pages: 13** | **Observation: Completely isolated boundary. No rationalisation needed.**

---

## 3. Rationalisation Observations

### Observation A: Sidebar Has Too Many Groups (19)

19 sidebar groups exceeds human scanning capacity. Research on navigation menus shows 5-9 top-level groups is optimal for frequent-use applications.

**Current:** 19 groups → user must scroll sidebar to find items

**Recommended structure:** Collapse to 7-9 thematic SUPER-GROUPS with expandable sub-groups:

| Super-Group | Contains Current Groups | Pages |
|------------|------------------------|-------|
| **Command** | Command Centre, Operating Pictures, Posture, War Room | 6 |
| **Cases & Lifecycle** | Case Management, Mission Control | 8 |
| **Intelligence** | Fusion Map, Vulnerability Mgmt, Exposure Mgmt | 11 |
| **Estate** | Identity & Access, Architecture, Assets, Controls, Coverage | 16 |
| **Operations** | Tool Health, Team Pulse, Domain Pulse, System Pulse | 12 |
| **Platform** | Platform (11 items → becomes workspace with tabs) | 12 |
| **Strategy & Governance** | Strategy, Governance, Reporting, SOM | 15 |
| **Administration** | Tenant Admin | 6 (sidebar) / 17 (full settings) |

**Result: 8 super-groups** (within cognitive range) with expandable sub-items.

---

### Observation B: Three Pulse Groups Should Merge

Team Pulse (3), Domain Pulse (3), System Pulse (3) = **9 pages across 3 separate groups** that all do the same thing (health monitoring) at different scopes.

**Recommendation:** Merge into single "**Pulse**" group with scope tabs:

```
Pulse
├── Team (Workload | SLA | Escalation)
├── Domain (Overview | Validation | Blockers)
└── System (Engine | Queues | Freshness)
```

Or even: **single Pulse page with scope selector** (team/domain/system) and metric selector (workload/sla/escalation/etc.) — reducing 9 pages to 1 tabbed workspace.

---

### Observation C: Platform Group Is Over-Loaded (11 items)

Platform has 11 sub-items in the sidebar. This is the densest group and exceeds readability.

**Recommendation:** Convert to **Platform Workspace** pattern — single entry point (`/platform`) with horizontal workspace tabs:

```
Platform Workspace
  Tabs: Overview | Connectors | Data Quality | Rules | Models | AI | Automation | Features | Audit
```

This replaces 11 sidebar items with 1 entry point + workspace tabs. The pages still exist but navigation becomes a workspace, not a long list.

---

### Observation D: SOM Group Overlaps with CISO and Reporting

SOM (5 pages) contains "CISO Dashboard" which overlaps with the `/ciso` route in top nav. It also contains role-specific manager views that overlap with domain-specific pages (Architecture Manager ↔ Architecture group; Risk Manager ↔ Controls/Governance).

**Recommendation:** SOM should become a **role-based workspace** rather than a separate nav group:

- `/som/ciso` → Merge with `/ciso` (one CISO surface, not two entry points)
- `/som/security-operations` → This IS the SOM landing page (keep)
- `/som/architecture` → Consider whether this is distinct from `/architecture` (if not, remove)
- `/som/risk` → Consider whether this is distinct from `/controls` + `/governance` (if not, remove)
- `/som/cloud-security` → Consider whether this is a view/filter of existing data rather than separate page

---

### Observation E: Coverage and Tool Health Overlap

Coverage (4 pages) and Tool Health (3 pages) both assess "are our tools working and covering the estate?"

- Coverage → "do we have coverage?" (gap analysis)
- Tool Health → "are tools running?" (connector health)

These are the same question from two angles.

**Recommendation:** Consider merging into single "**Signal Health**" or "**Coverage & Health**" group:

```
Coverage & Health
├── Coverage Overview (estate coverage posture)
├── Scanner Coverage → "Tool Coverage" (which scanners cover which assets)
├── Telemetry Coverage (which telemetry sources are active)
├── Blindspots (uncovered assets/domains)
├── Connector Health (connector operational state)
├── Source Freshness (data age per source)
```

6 pages, 1 group (down from 7 pages, 2 groups).

---

### Observation F: CISO Has Too Many Entry Points

A CISO currently has:
- `/` (Command Centre)
- `/ciso` (top nav tab — SCAFFOLD)
- `/som/ciso` (SOM group item — SCAFFOLD)
- `/reporting/ciso-pack` (Reporting sub-item)

Four different places a CISO might look for "their" content.

**Recommendation:** Single CISO surface with workspace tabs:

```
/ciso (CISO Workspace)
  Tabs: Command Overview | Risk Briefing | Report Pack | Strategy | Mission
```

Remove `/som/ciso` as duplicate. `/` remains as the all-role Command Centre. CISO has ONE workspace.

---

### Observation G: Strategy Group Is Scattered

Strategy content currently lives across:
- `/strategy/centre` (Strategy group)
- `/strategy/simulation` (Strategy group)
- `/strategy/audit-history` (Strategy group)
- `/settings/sla` (Tenant Admin)
- `/settings/routing` (Tenant Admin)
- `/settings/validation` (Tenant Admin)
- `/settings/closure-reopening` (Tenant Admin)

The boundary between "strategy" (what the policy says) and "configuration" (setting the policy) is unclear to the user.

**Recommendation:** Strategy Centre becomes the SINGLE entry for policy management. Settings pages handle non-strategy configuration only (users, connectors, features). The SOM uses Strategy Centre for policy work, not settings.

---

## 4. Recommended Navigation Structure (Post-Rationalisation)

### Proposed Sidebar (8 super-groups)

```
COMMAND
  ├── Command Centre (/)
  ├── Operating Pictures (drill-paths, not nav items)
  └── War Room (/war-room/p0) [conditional — only when P0 active]

CASES & LIFECYCLE
  ├── My Cases
  ├── All Cases
  ├── Case Analytics
  └── Mission (Overview | Objectives | Impact)

INTELLIGENCE
  ├── Fusion Map (Relationship | Blast Radius | Mission Overlay | P0 Overlay)
  ├── Vulnerabilities (Overview | KEV | Patches | Supply Chain)
  └── Exposure (Attack Surface | Blast Zones | Coverage Gaps)

ESTATE
  ├── Identity (Overview | Privileged | Drift)
  ├── Architecture (Overview | Drift | Dependencies)
  ├── Assets (Inventory | Ownership | Classification)
  ├── Controls (Coverage | Strength | Frameworks)
  └── Coverage & Health (Overview | Scanners | Telemetry | Blindspots | Connectors | Freshness)

OPERATIONS
  └── Pulse (Team | Domain | System) [single workspace with scope tabs]

PLATFORM [workspace with tabs]
  └── Platform (Overview | Connectors | Quality | Rules | Models | AI | Automation | Features | Audit)

STRATEGY & GOVERNANCE
  ├── Strategy (Centre | Simulation | Audit History)
  ├── Governance (Compliance | Policies | Exceptions | Decisions)
  ├── Reporting (Reports | Exports | CISO Pack)
  └── SOM (Security Ops Manager | CISO Workspace)

ADMINISTRATION
  └── Tenant Admin (all /settings/*)
```

### Impact Summary

| Metric | Current | Proposed | Change |
|--------|---------|----------|--------|
| Top-level sidebar groups | 19 | 8 | -58% |
| Sidebar items visible without scrolling | ~10 (must scroll) | ~8 super-groups (no scroll) | Better |
| Deepest navigation | 2 levels | 2 levels (unchanged) | Same |
| Pages removed | 0 | 0 (no pages deleted) | None |
| Pages merged | 0 | 0 (structure only) | None |
| Total pages | 110 | 110 (unchanged) | Same |

**Key principle: No pages are removed. The content is REGROUPED for cognitive efficiency.**

---

## 4b. Surface Classification Overlay (UIAA-3.0 §1.1)

Every page in the proposed structure classified by surface type, OODA stage, C2 role, and cognitive ceiling.

### COMMAND Super-Group

| Route | Surface Type | OODA Stage | C2 Role | Cognitive Ceiling | Persona |
|-------|-------------|-----------|---------|-------------------|---------|
| `/` | **Command** | All four (hub) | Command + Coordination | 4–6 items | CISO, SOM, All |
| `/posture` | **Command** | Observe + Orient | Command | 4–6 items | CISO, SOM |
| `/operating-picture/external` | **Intelligence** | Observe + Orient | Communication | 8–12 items | Security Analyst, SOM |
| `/operating-picture/internal` | **Intelligence** | Observe + Orient | Communication | 8–12 items | Identity Specialist, SOM |
| `/war-room/p0` | **Command** | All four (crisis) | Command + Coordination | 4–6 items | CISO, SOM, All |
| `/ciso` | **Command** | Orient + Decide | Command | 4–6 items | CISO |

### CASES & LIFECYCLE Super-Group

| Route | Surface Type | OODA Stage | C2 Role | Cognitive Ceiling | Persona |
|-------|-------------|-----------|---------|-------------------|---------|
| `/cases` | **Investigation** | Orient + Decide | Control | 12–20 items | Security Analyst |
| `/cases/my` | **Investigation** | Decide | Control | 12–20 items | Security Analyst |
| `/cases/[id]` | **Investigation** | Orient + Decide + Act | Control | 12–20 items | Security Analyst |
| `/cases/analytics` | **Governance** | All (measurement) | Outcome Measurement | 8–12 items | SOM, CISO |
| `/mission/overview` | **Strategy** | Decide | Command | 6–10 items | CISO, SOM |
| `/mission/objectives` | **Strategy** | Decide | Command | 6–10 items | CISO, SOM |
| `/mission/impact` | **Strategy** | Act (outcome) | Outcome Measurement | 6–10 items | CISO, SOM |

### INTELLIGENCE Super-Group

| Route | Surface Type | OODA Stage | C2 Role | Cognitive Ceiling | Persona |
|-------|-------------|-----------|---------|-------------------|---------|
| `/fusion-map` | **Intelligence** | Observe + Orient | Communication | 8–12 items | Security Architect, SOM |
| `/fusion-map/blast-radius` | **Intelligence** | Orient | Communication | 8–12 items | Security Architect |
| `/fusion-map/mission` | **Intelligence** | Orient + Decide | Communication | 8–12 items | CISO, SOM |
| `/fusion-map/p0` | **Intelligence** | Observe + Orient | Command + Communication | 8–12 items | CISO, SOM |
| `/vulnerabilities` | **Intelligence** | Observe + Orient | Communication | 8–12 items | Vulnerability Analyst |
| `/vulnerabilities/kev` | **Intelligence** | Orient + Decide | Control | 8–12 items | Vulnerability Analyst |
| `/vulnerabilities/patches` | **Intelligence** | Decide + Act | Control | 8–12 items | Vulnerability Analyst |
| `/vulnerabilities/supply-chain` | **Intelligence** | Observe + Orient | Communication | 8–12 items | Vulnerability Analyst |
| `/exposure` | **Intelligence** | Observe + Orient | Communication | 8–12 items | Security Architect |
| `/exposure/blast-zones` | **Intelligence** | Orient | Communication | 8–12 items | Security Architect |
| `/exposure/coverage-gaps` | **Intelligence** | Orient + Decide | Control | 8–12 items | Security Architect, SOM |

### ESTATE Super-Group

| Route | Surface Type | OODA Stage | C2 Role | Cognitive Ceiling | Persona |
|-------|-------------|-----------|---------|-------------------|---------|
| `/identity` | **Intelligence** | Observe + Orient | Communication | 8–12 items | Identity Specialist |
| `/identity/privileged` | **Investigation** | Orient + Decide | Control | 12–20 items | Identity Specialist |
| `/identity/drift` | **Investigation** | Orient + Decide | Control | 12–20 items | Identity Specialist |
| `/architecture` | **Intelligence** | Observe + Orient | Communication | 8–12 items | Security Architect |
| `/architecture/drift` | **Investigation** | Orient + Decide | Control | 12–20 items | Security Architect |
| `/architecture/dependencies` | **Intelligence** | Orient | Communication | 8–12 items | Security Architect |
| `/assets` | **Intelligence** | Observe | Communication | 8–12 items | Security Analyst |
| `/assets/ownership` | **Investigation** | Orient | Control | 12–20 items | Security Analyst |
| `/assets/classification` | **Investigation** | Orient | Control | 12–20 items | Security Analyst |
| `/controls` | **Governance** | All (measurement) | Outcome Measurement | 8–12 items | Risk/Compliance |
| `/controls/strength` | **Governance** | Orient + Decide | Outcome Measurement | 8–12 items | Risk/Compliance |
| `/controls/frameworks` | **Governance** | Orient | Outcome Measurement | 8–12 items | Risk/Compliance |
| `/coverage` | **Intelligence** | Observe | Communication | 8–12 items | SOM, Security Architect |
| `/coverage/scanners` | **Intelligence** | Observe | Communication | 8–12 items | SOM |
| `/coverage/telemetry` | **Intelligence** | Observe | Communication | 8–12 items | SOM |
| `/coverage/blindspots` | **Intelligence** | Observe + Orient | Control | 8–12 items | Security Architect |
| `/tool-health` | **Intelligence** | Observe | Communication | 8–12 items | SOM |
| `/tool-health/connectors` | **Intelligence** | Observe | Communication | 8–12 items | SOM |
| `/tool-health/freshness` | **Intelligence** | Observe | Communication | 8–12 items | SOM |

### OPERATIONS Super-Group (Pulse)

| Route | Surface Type | OODA Stage | C2 Role | Cognitive Ceiling | Persona |
|-------|-------------|-----------|---------|-------------------|---------|
| `/team-pulse/workload` | **Governance** | All (measurement) | Coordination | 6–10 items | SOM |
| `/team-pulse/sla` | **Governance** | All (measurement) | Coordination | 6–10 items | SOM, CISO |
| `/team-pulse/escalation` | **Governance** | Decide | Coordination | 6–10 items | SOM |
| `/domain-pulse` | **Governance** | All (measurement) | Outcome Measurement | 6–10 items | SOM, CISO |
| `/domain-pulse/failed-validation` | **Governance** | Act (validation) | Outcome Measurement | 6–10 items | SOM |
| `/domain-pulse/closure-blockers` | **Governance** | Act (closure) | Outcome Measurement | 6–10 items | SOM |
| `/system-pulse/engine` | **Intelligence** | Observe | Communication | 6–10 items | SOM, Platform Eng |
| `/system-pulse/queues` | **Intelligence** | Observe | Communication | 6–10 items | SOM, Platform Eng |
| `/system-pulse/freshness` | **Intelligence** | Observe | Communication | 6–10 items | SOM, Platform Eng |

### PLATFORM Super-Group

| Route | Surface Type | OODA Stage | C2 Role | Cognitive Ceiling | Persona |
|-------|-------------|-----------|---------|-------------------|---------|
| `/platform` | **Configuration** | N/A | N/A | Unlimited | SOM, Tenant Admin |
| `/platform/connectors` | **Configuration** | N/A | N/A | Unlimited | SOM, Tenant Admin |
| `/platform/data-quality` | **Intelligence** | Observe | Communication | 8–12 items | SOM |
| `/platform/rules` | **Configuration** | N/A | Control | Unlimited | SOM, Tenant Admin |
| `/platform/rules/validation` | **Execution** | Act | Control | 4–8 items | SOM |
| `/platform/rules/simulation` | **Decision** | Decide | Control | 6–10 items | SOM |
| `/platform/models` | **Configuration** | N/A | N/A | Unlimited | SOM |
| `/platform/models/lifecycle` | **Governance** | All (measurement) | Outcome Measurement | 8–12 items | SOM |
| `/commander-ai` | **Configuration** | N/A | N/A | Unlimited | SOM, Tenant Admin |
| `/platform/automation` | **Configuration** | N/A | Control | Unlimited | SOM, Tenant Admin |
| `/platform/features` | **Configuration** | N/A | N/A | Unlimited | Tenant Admin |
| `/platform/audit` | **Governance** | All (measurement) | Outcome Measurement | 8–12 items | SOM |

### STRATEGY & GOVERNANCE Super-Group

| Route | Surface Type | OODA Stage | C2 Role | Cognitive Ceiling | Persona |
|-------|-------------|-----------|---------|-------------------|---------|
| `/strategy/centre` | **Decision** | Decide | Command + Control | 6–10 items | SOM |
| `/strategy/simulation` | **Decision** | Decide | Control | 6–10 items | SOM |
| `/strategy/audit-history` | **Governance** | All (measurement) | Outcome Measurement | 8–12 items | SOM, CISO |
| `/governance` | **Governance** | All (measurement) | Outcome Measurement | 8–12 items | Risk/Compliance |
| `/governance/policies` | **Governance** | Decide | Control | 8–12 items | Risk/Compliance |
| `/governance/exceptions` | **Governance** | Decide | Control | 8–12 items | Risk/Compliance |
| `/governance/decisions` | **Governance** | Decide | Outcome Measurement | 8–12 items | SOM, CISO |
| `/reporting` | **Governance** | All (measurement) | Communication | 8–12 items | CISO, SOM |
| `/reporting/exports` | **Governance** | All (measurement) | Communication | 8–12 items | CISO, SOM |
| `/reporting/ciso-pack` | **Governance** | All (measurement) | Communication | 6–10 items | CISO |
| `/som/ciso` | **Command** | Orient + Decide | Command | 4–6 items | CISO |
| `/som/security-operations` | **Command** | All four | Command + Coordination | 6–10 items | SOM |
| `/som/architecture` | **Intelligence** | Orient | Communication | 8–12 items | Security Architect |
| `/som/risk` | **Governance** | Orient + Decide | Outcome Measurement | 8–12 items | Risk/Compliance |
| `/som/cloud-security` | **Intelligence** | Observe + Orient | Communication | 8–12 items | Security Architect |
| `/search` | **Intelligence** | Observe + Orient | Communication | 8–12 items | All |

### ADMINISTRATION Super-Group (Tenant Admin)

| Route | Surface Type | OODA Stage | C2 Role | Cognitive Ceiling | Persona |
|-------|-------------|-----------|---------|-------------------|---------|
| `/tenant-admin` | **Configuration** | N/A | N/A | Unlimited | Tenant Admin |
| `/settings/tenant` | **Configuration** | N/A | N/A | Unlimited | Tenant Admin |
| `/settings/baselines` | **Configuration** | N/A | Control | Unlimited | Tenant Admin |
| `/settings/users-rbac` | **Configuration** | N/A | Control | Unlimited | Tenant Admin |
| `/settings/connectors` | **Configuration** | N/A | N/A | Unlimited | Tenant Admin |
| `/settings/missions` | **Configuration** | N/A | Command | Unlimited | Tenant Admin |
| `/settings/features` | **Configuration** | N/A | N/A | Unlimited | Tenant Admin |
| `/settings/sla` | **Configuration** | N/A | Control | Unlimited | Tenant Admin |
| `/settings/routing` | **Configuration** | N/A | Control | Unlimited | Tenant Admin |
| `/settings/validation` | **Configuration** | N/A | Control | Unlimited | Tenant Admin |
| `/settings/closure-reopening` | **Configuration** | N/A | Control | Unlimited | Tenant Admin |
| `/settings/p0-zero-day` | **Configuration** | N/A | Command | Unlimited | Tenant Admin |
| `/settings/automation-boundaries` | **Configuration** | N/A | Control | Unlimited | Tenant Admin |
| `/settings/commander-ai` | **Configuration** | N/A | N/A | Unlimited | Tenant Admin |
| `/settings/security` | **Configuration** | N/A | Control | Unlimited | Tenant Admin |
| `/settings/audit-export` | **Governance** | All (measurement) | Outcome Measurement | 8–12 items | Tenant Admin |
| `/settings/rules` | **Configuration** | N/A | Control | Unlimited | Tenant Admin |

### CONTROL PLANE (Separate Boundary)

| Route | Surface Type | OODA Stage | C2 Role | Cognitive Ceiling | Persona |
|-------|-------------|-----------|---------|-------------------|---------|
| `/control-plane` | **Command** | All four | Command | 6–10 items | Seiertech Operator |
| `/control-plane/customers` | **Configuration** | N/A | N/A | Unlimited | Seiertech Operator |
| `/control-plane/tenants` | **Configuration** | N/A | N/A | Unlimited | Seiertech Operator |
| `/control-plane/licences` | **Configuration** | N/A | N/A | Unlimited | Seiertech Operator |
| `/control-plane/entitlements` | **Configuration** | N/A | Control | Unlimited | Seiertech Operator |
| `/control-plane/features` | **Configuration** | N/A | Control | Unlimited | Seiertech Operator |
| `/control-plane/ai-models` | **Configuration** | N/A | Control | Unlimited | Seiertech Operator |
| `/control-plane/rule-packs` | **Configuration** | N/A | Control | Unlimited | Seiertech Operator |
| `/control-plane/baselines` | **Configuration** | N/A | Control | Unlimited | Seiertech Operator |
| `/control-plane/deployment` | **Execution** | Act | Control + Coordination | 4–8 items | Seiertech Operator |
| `/control-plane/support` | **Execution** | Act | Coordination | 4–8 items | Seiertech Operator |
| `/control-plane/billing` | **Governance** | All (measurement) | Outcome Measurement | 8–12 items | Seiertech Operator |
| `/control-plane/audit` | **Governance** | All (measurement) | Outcome Measurement | 8–12 items | Seiertech Operator |

---

### Classification Distribution Summary

| Surface Type | Count | % of Estate |
|-------------|:-----:|:-----------:|
| **Command** | 9 | 8% |
| **Intelligence** | 30 | 27% |
| **Investigation** | 10 | 9% |
| **Decision** | 4 | 4% |
| **Execution** | 4 | 4% |
| **Governance** | 22 | 20% |
| **Strategy** | 3 | 3% |
| **Configuration** | 28 | 25% |
| **Total** | **110** | **100%** |

### Assessment Effort by Surface Type

| Surface Type | UIAA-3.0 Effort | Rationale |
|-------------|----------------|-----------|
| Command (9) | **HIGH** — full assessment, all dimensions | C2 platform value delivered here |
| Intelligence (30) | **HIGH** — full assessment, DDC + CDRR elevated | Data richness and relationship rendering critical |
| Investigation (10) | **MEDIUM** — full assessment, DSQ elevated | Decision support quality is key |
| Decision (4) | **MEDIUM** — full assessment, DSQ + SCC elevated | Policy management quality |
| Execution (4) | **MEDIUM** — WAR + CLC elevated | Automation readiness critical |
| Governance (22) | **STANDARD** — PTR + RBAC focus | Accountability and audit |
| Strategy (3) | **MEDIUM** — SCC + MOA elevated | Mission alignment |
| Configuration (28) | **LOW** — reduced expectations, RBAC + SFA focus | Settings pages need correctness, not SA quality |

**Result: 57 pages (52%) require HIGH or MEDIUM effort. 28 pages (25%) are Configuration (LOW effort). Remaining 25 pages (23%) are Governance (STANDARD).**

---

## 5. Build Execution Recommendation

### Sequencing for Rationalisation

| Step | Action | Effort | Blocks |
|------|--------|--------|--------|
| 1 | **Decision:** Approve super-group structure | Owner decision | Everything |
| 2 | Update `nav-groups.ts` to 8 super-groups | 1 session | Step 1 |
| 3 | Merge 3× Pulse into single Pulse workspace | 1 session | Step 2 |
| 4 | Convert Platform 11-items → workspace tabs | 1 session | Step 2 |
| 5 | Resolve CISO/SOM duplication | 1 session | Step 2 |
| 6 | Merge Coverage + Tool Health | 1 session | Step 2 |
| 7 | Update PAGE_SCHEDULE with new groupings | 30 min | Step 2 |
| 8 | Add Surface Classification column | 30 min | Step 2 |
| 9 | Begin UIAA-3.0 execution by super-group | Ongoing | Steps 2-8 |

---

## 6. How This Simplifies UIAA-3.0 Execution

| Before rationalisation | After rationalisation |
|----------------------|---------------------|
| 19 groups → 19 group reviews | 8 super-groups → 8 group reviews |
| SOM assessed separately from CISO separately from Reporting | Strategy & Governance assessed as one coherent domain |
| 9 Pulse pages assessed individually | 1 Pulse workspace assessed once |
| Platform 11 items assessed individually | 1 Platform workspace assessed once |
| Prompting requires "assess Group 12 Team Pulse" + "assess Group 13 Domain Pulse" + "assess Group 14 System Pulse" | Single prompt: "assess Operations super-group" |

**Execution becomes: 8 super-group assessments + 1 programme synthesis = 9 prompts total.**

---

**End of Document.**
