# Commander SDR v2.5.2 — API Reference Specification Intake, Pre-Build Editorial Increment

## Status
Committed baseline update. Supersedes v2.5.1 authority, register and manifest documents. Retains all v2.5 / v2.5.1 product doctrine.

## Purpose
v2.5.2 is a focused editorial increment that registers a formal **reference-input** location for third-party API definition documents at `docs/03_api_specs/`, governed by `API_SPEC_INTAKE_RULES.md` and catalogued in `INDEX.md`. The initial intake covers 19 API definition documents across eight functional categories: identity, collaboration, endpoint management, audit/telemetry, security tools, vulnerability/exposure, network security, and cloud infrastructure.

The increment is deliberately narrow. It changes no doctrine, no precedence ordering, no binding artefact, no build-pack stream and no acceptance gate.

## Added
- `docs/03_api_specs/` — new top-level reference-input directory.
- `docs/03_api_specs/API_SPEC_INTAKE_RULES.md` — intake, versioning, retirement and Change-Intake coupling rules for reference inputs.
- `docs/03_api_specs/INDEX.md` — canonical catalogue of active API reference specifications.
- 8 active sub-folders (identity, collaboration, endpoint_management, audit_telemetry, security_tools, vulnerability_exposure, network_security, cloud_infrastructure).
- 19 API definition documents (see "Active Specifications" below).
- `00_AUTHORITY_AND_PRECEDENCE_v2_5_2.md` — supersedes v2.5.1 authority file.
- `00_SPECIFICATION_REGISTER_v2_5_2.md` — adds "Reference Inputs" section; supersedes v2.5.1 register.
- `CURRENT_BASELINE_MANIFEST_v2_5_2.md` — supersedes v2.5.1 manifest.
- `RELEASE_NOTES_v2_5_2.md` — this document.

## Active Specifications

### Identity (4)
| File | Vendor | Module |
|---|---|---|
| `microsoft_graph_entra_id_v1.docx` | Microsoft | Entra ID (Identity & Access) |
| `okta_core_v1.docx` | Okta | Identity Cloud core management, SCIM, system log |
| `okta_identity_engine_oie_v1.docx` | Okta | Identity Engine deep-dive |
| `okta_workflows_public_subset_v1.docx` | Okta | Workflows (orchestration/automation) |

### Collaboration (2)
| File | Vendor | Module |
|---|---|---|
| `microsoft_graph_core_v1.docx` | Microsoft | Graph API core |
| `microsoft_graph_collaboration_v1.docx` | Microsoft | Mail, Calendar, Teams, SharePoint, OneDrive |

### Endpoint Management (2)
| File | Vendor | Module |
|---|---|---|
| `microsoft_graph_intune_v1.docx` | Microsoft | Intune / Endpoint Manager |
| `crowdstrike_falcon_v1.docx` | CrowdStrike | Falcon platform (EDR) |

### Audit & Telemetry (1)
| File | Vendor | Module |
|---|---|---|
| `microsoft_graph_reports_audit_v1.docx` | Microsoft | Graph Reports & Audit Logs |

### Security Tools (2)
| File | Vendor | Module |
|---|---|---|
| `microsoft_graph_security_v1.docx` | Microsoft | Graph Security API |
| `darktrace_v1.docx` | Darktrace | Network detection / Antigena |

### Vulnerability & Exposure (3)
| File | Vendor | Module |
|---|---|---|
| `tenable_one_v1.docx` | Tenable | Tenable One (unified inventory + EV/XM + attack paths) |
| `tenable_io_v1.docx` | Tenable | Tenable.io (vulnerability management) |
| `armis_v1.docx` | Armis | Asset & device visibility (IT/IoT/OT/medical) |

### Network Security (3)
| File | Vendor | Module |
|---|---|---|
| `palo_alto_unified_v1.docx` | Palo Alto Networks | Unified API (PAN-OS, Prisma, Cortex) |
| `zscaler_zia_v1.docx` | Zscaler | Internet Access |
| `zscaler_zpa_v1.docx` | Zscaler | Private Access (ZTNA) |

### Cloud Infrastructure (2)
| File | Vendor | Module |
|---|---|---|
| `aws_general_v1.docx` | Amazon Web Services | General AWS API surface |
| `aws_route53_v1.docx` | Amazon Web Services | Route 53 (DNS, health checks) |

## Locked
All v2.5 / v2.5.1 lock items carry forward unchanged. v2.5.2 additionally locks:

- The reference-input tree at `docs/03_api_specs/` is **outside** the binding precedence chain.
- Reference inputs cannot override or amend any binding artefact (child specs, MTS, Master Proposition, Feature Registry, route/menu registry, approved build packs).
- A vendor API surface that does not fit the canonical model is normalised by Spec #05 and bound to the canonical `RiskObject` via Spec #29 and BP-03. It is not promoted to canonical status.
- New API spec versions create new files; existing files are not edited in place once a connector build pack has consumed them.
- Material changes to a consumed spec generate Change Intake items automatically via the `baseline_guardian_agent`.
- No connector build pack may be generated against an API spec that lacks the required front-matter (vendor, version, retrieval date, source URL, governing child specs, owning build pack).
- No connector build pack may be generated before BP-03 (Risk Object Model) and BP-13 (Connector Test Harness) have shipped.

## Not Changed
- Closed-loop case doctrine.
- P0 as priority overlay.
- No manual case creation.
- Three-application model.
- Military-intelligence UI doctrine.
- Shell vs Build Authority doctrine (Spec #56).
- Shell geometry.
- Top-navigation restraint.
- Baseline Configuration Profile coverage.
- Precedence ordering for binding artefacts.
- Master Proposition.
- Master Technical Specification.
- Any child spec (no spec changed in v2.5.2).
- The Feature Registry.
- The route/menu registry definition.
- Build-pack streams or sequencing.

## Retired in v2.5.2
- `00_AUTHORITY_AND_PRECEDENCE_v2_5_1.md` — replaced.
- `00_SPECIFICATION_REGISTER_v2_5_1.md` — replaced.
- `CURRENT_BASELINE_MANIFEST_v2_5_1.md` — replaced.

## Retired earlier (carried forward as historical)
- v2.5 authority, register and manifest — retired in v2.5.1.

## Next Stage Pack Alignment
The Next Stage Approach Pack v1.3 is updated to v1.4 to align with v2.5.2. The v1.4 update adds an additive note recognising the reference-input tree and the `baseline_guardian_agent` responsibility for Change-Intake coupling on consumed-spec changes. No build-pack stream definitions change. No sequencing changes.

## Build-Readiness Statement
The v2.5.2 baseline is build-pack-generation ready and build ready. The same readiness assessment applies as for v2.5.1:

- Authority and precedence is unambiguous.
- Spec #56 governs shell-vs-build relationship.
- Operational Consoles are route-registered.
- The Feature Registry is the canonical feature inventory.
- Reference inputs are now a formally registered, governed, but explicitly out-of-binding-chain class.
- The acceptance gate is intact and now additionally prevents connector build packs from being generated against under-specified or pre-BP-03 API references.

Build sequence remains: SETUP-01 → SETUP-02 → SETUP-03 → BP-00 → BP-01 → BP-02 → BP-VIS-00 → BP-03 onward. Connector build packs (per the API specs registered in this increment) follow BP-13.
