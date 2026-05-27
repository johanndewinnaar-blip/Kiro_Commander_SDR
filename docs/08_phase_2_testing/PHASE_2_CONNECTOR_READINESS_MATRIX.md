# Phase 2 Connector Readiness Matrix

| Connector area | Initial status | Phase 2 readiness check |
|---|---|---|
| Microsoft Graph / Entra ID | Source DOCX archived; mock only. | Scope, least privilege, tenant sandbox, identity data classification. |
| Microsoft Graph / Intune | Source DOCX archived; mock only. | Device inventory, compliance fields, safe read-only access. |
| CrowdStrike Falcon | Source DOCX archived; mock only. | Read-only posture, IOC/push dry-run separation, rate limits. |
| Darktrace | Source DOCX archived; mock only. | Model breach/Antigena signal mapping, no operational writes. |
| Tenable.io / Tenable One | Source DOCX archived; mock only. | Asset/vulnerability export, KEV/CVSS mapping, scan status. |
| Armis | Source DOCX archived; mock only. | Asset/IoT inventory mapping and ownership reconciliation. |
| Zscaler ZIA/ZPA | Source DOCX archived; mock only. | Policy/config read, categorisation, future controlled push review. |
| Palo Alto / Prisma / Cortex | Source DOCX archived; mock only. | Config posture and security tool intelligence mapping. |
| AWS general / Route 53 | Source DOCX archived; mock only. | AWS account sandbox, IAM read-only, asset/DNS/security signal mapping. |

No real connector implementation is authorised by this matrix. It defines readiness checks only.
