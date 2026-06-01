# OCSF Reference Note — Commander SDR

**Date:** 2026-06-01  
**Status:** Reference input only  
**Authority:** Commander doctrine assertion #6 (reference-input boundary)  
**Source repo:** https://github.com/ocsf/ocsf-schema  
**Version:** v1.8.0 (branch `v1.8.0`, commit `6fa6499a`)

---

## Authority Status

- **OCSF is reference input only.** It is NOT Commander authority.
- **Commander canonical model remains authoritative** until a controlled baseline amendment is approved via DECISIONS.md.
- Per Commander doctrine assertion #6: "Vendor docs, API references and external material are reference inputs until converted through Commander authority."
- No OCSF schema element may be treated as binding on Commander's data model, connector contracts, or intelligence layer without an explicit decision record.
- Commander authority remains `docs/99_source_archive/baseline_v2_6_2/`.
- Never source from `.kiro/specs/`.

---

## Repository Inventory

### Top-Level Structure

```
ocsf-schema/
├── categories.json          — 8 event categories
├── dictionary.json          — attribute dictionary (all field definitions)
├── version.json             — schema version (1.8.0)
├── events/                  — 77 event class definitions
│   ├── base_event.json      — base event (all events inherit)
│   ├── application/         — Application Activity events
│   ├── discovery/           — Discovery events
│   ├── findings/            — Findings/detection events
│   ├── iam/                 — Identity & Access Management events
│   ├── network/             — Network Activity events
│   ├── remediation/         — Remediation events
│   ├── system/              — System Activity events
│   └── unmanned_systems/    — Unmanned Systems events
├── objects/                 — 177 object definitions
├── profiles/                — 12 profiles (overlay attributes)
├── extensions/              — 3 OS-specific extensions (linux, macos, windows)
├── metaschema/              — 14 JSON Schema validation files
└── templates/               — 2 templates (event_class, object)
```

### Event Categories (8)

| UID | Category | Description |
|---|---|---|
| 1 | System Activity | System-level events |
| 2 | Findings | Detections, findings, security product actions |
| 3 | Identity & Access Management | Authentication, authorisation, entity changes |
| 4 | Network Activity | Network protocol events |
| 5 | Discovery | Device, file, config, process state reporting |
| 6 | Application Activity | Application/service behaviour |
| 7 | Remediation | Remediation command results |
| 8 | Unmanned Systems | Unmanned system tracking/mission events |

### Event Classes by Category

| Category | Event classes | Key classes for Commander assessment |
|---|---|---|
| findings/ | 9 | `detection_finding`, `security_finding`, `vulnerability_finding`, `compliance_finding`, `incident_finding`, `iam_analysis_finding` |
| iam/ | 7 | `authentication`, `account_change`, `user_access`, `authorize_session`, `entity_management`, `group_management` |
| network/ | 15 | `network_activity`, `dns_activity`, `http_activity`, `email_activity`, `ssh_activity`, `rdp_activity` |
| system/ | ~20 | `process_activity`, `file_activity`, `registry_activity`, `kernel_activity`, `module_activity` |
| discovery/ | ~15 | `device_inventory`, `user_inventory`, `software_inventory`, `config_state` |
| application/ | ~8 | `api_activity`, `web_resource_access`, `datastore_activity` |
| remediation/ | ~3 | `file_remediation`, `process_remediation` |

### Objects (177 — key objects for Commander assessment)

| Object | Relevance to Commander |
|---|---|
| `device.json` | Maps to Commander Asset entity |
| `user.json` | Maps to Commander Identity entity |
| `vulnerability.json` | Maps to Commander vulnerability/drift findings |
| `finding_info.json` | Maps to Commander case/finding model |
| `policy.json` | Maps to Commander strategy/policy model |
| `attack.json` | MITRE ATT&CK mapping — Commander uses this |
| `observable.json` | IOC/observable — maps to threat intelligence stream |
| `malware.json` | Threat intelligence stream |
| `cve.json` / `cvss.json` / `epss.json` | Vulnerability scoring — Commander consumes |
| `compliance.json` | Compliance posture — Commander governance |
| `cloud.json` | Cloud entity — Commander asset model |
| `container.json` | Container entity — Commander asset model |
| `network_endpoint.json` | Network entity — Commander asset model |
| `remediation.json` | Remediation tracking — Commander case lifecycle |
| `ticket.json` | ITSM integration — Commander push/dispatch |

### Profiles (12)

| Profile | Purpose | Commander relevance |
|---|---|---|
| `cloud.json` | Cloud-specific attributes | Asset intelligence (cloud accounts) |
| `container.json` | Container-specific attributes | Asset intelligence (containers) |
| `host.json` | Host-specific attributes | Asset intelligence (endpoints/servers) |
| `data_classification.json` | Data classification overlay | Commander data classification (7 types) |
| `security_control.json` | Security control attributes | Control coverage model |
| `incident.json` | Incident-specific attributes | SOC signal consumption (Class A) |
| `osint.json` | OSINT attributes | Threat intelligence stream (Class D) |
| `ai_operation.json` | AI operation attributes | Commander AI audit |
| `network_proxy.json` | Proxy attributes | Network asset model |
| `load_balancer.json` | Load balancer attributes | Network asset model |
| `datetime.json` | Temporal attributes | Universal |
| `trace.json` | Distributed tracing | Observability |

### Extensions (3)

- `linux/` — Linux-specific event extensions
- `macos/` — macOS-specific event extensions
- `windows/` — Windows-specific event extensions

### Metaschema (14 validation schemas)

JSON Schema files defining the structure of OCSF definitions themselves (how events, objects, profiles, and dictionary entries must be structured).

---

## Counts Summary

| Artefact | Count |
|---|---|
| Event categories | 8 |
| Event classes | 77 |
| Objects | 177 |
| Profiles | 12 |
| Extensions | 3 (OS-specific) |
| Metaschema files | 14 |
| Dictionary attributes | ~800+ (in dictionary.json) |

---

## Purpose

This repository is cloned for Commander SDR OCSF impact assessment:
- Evaluate schema alignment between OCSF event taxonomy and Commander's canonical model
- Assess normalisation mapping potential (OCSF events → Commander intelligence streams)
- Identify where OCSF categories map to Commander's four connector classes (A/B/C/D)
- Inform future connector contract design for OCSF-native sources

---

## Constraints

- No application code changes made.
- No Commander master documents modified.
- No build schedule changes.
- No sourcing from `.kiro/specs/`.
- Commander authority remains `docs/99_source_archive/baseline_v2_6_2/`.
- OCSF is reference input until a controlled baseline amendment is approved.
