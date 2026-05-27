# Kiro Spec Index — Commander SDR

This index lists the Kiro specs generated for the Commander SDR full-journey build programme.

| Spec | Domain | Target | Future owners |
|---|---|---|---|
| `00-programme-foundation` | Programme Foundation | v1.1 | docs/00_authority |
| `01-application-shell-navigation-route-registry` | Application Shell, Navigation and Route Registry | v1.1 | docs/06_ui_build_reference |
| `02-design-system-ui-component-catalogue` | Design System and UI Component Catalogue | v1.1 | docs/05_design_reference |
| `03-seed-data-and-test-fixtures` | Seed Data and Test Fixtures | v1.1 | tests/fixtures |
| `04-data-model-canonical-entities` | Canonical Data Model | v1.1 | packages/contracts and packages/db |
| `05-command-centre` | Command Centre | v1.1 | apps/web |
| `06-case-management` | Case Management | v1.1 | apps/web apps/api |
| `07-vulnerability-management` | Vulnerability Management | v1.2 | apps/web apps/api |
| `08-exposure-management` | Exposure Management | v1.2 | apps/web apps/api |
| `09-asset-intelligence` | Asset Intelligence | v1.2 | apps/web apps/api |
| `10-identity-intelligence` | Identity Intelligence | v1.2 | apps/web apps/api |
| `11-control-coverage-editable-baselines` | Control Coverage and Editable Baselines | v1.2 | apps/web apps/api |
| `12-architecture-topology` | Architecture and Topology | v1.2 | apps/web apps/api |
| `13-security-c2` | Security Command and Control | v1.4 | apps/web |
| `14-ooda-views` | OODA Views | v1.4 | apps/web |
| `15-direction-boards` | Direction Boards | v1.4 | apps/web |
| `16-connector-framework` | Connector Framework | v1.3 | packages/connectors apps/api |
| `17-mock-connectors` | Mock Connectors | v1.3 | packages/connectors tests/fixtures |
| `18-tenant-admin` | Tenant Admin | v1.3 | apps/web apps/api |
| `19-rbac-entitlement-feature-flags` | RBAC, Entitlement and Feature Flags | v1.3 | packages/shared apps/api |
| `20-commander-ai-core` | Commander AI Core | v1.1 | apps/web apps/api |
| `21-aws-bedrock-agentcore-evaluation` | AWS Bedrock and AgentCore Evaluation Lane | v1.5 | infra/terraform docs/02_architecture |
| `22-governance-reporting` | Governance and Reporting | v1.2 | apps/web apps/api |
| `23-ciso-dashboard` | CISO Dashboard | v1.2 | apps/web |
| `24-security-c2-p0-war-room` | P0 Zero-Day War Room | v1.4 | apps/web |
| `25-email-case-communication` | Email Case Communication | v1.3 | apps/api apps/web |
| `26-security-tool-intelligence` | Security Tool Intelligence | v1.2 | apps/web apps/api |
| `27-push-governance-dry-run` | Push Governance Dry Run | v1.3 | apps/api packages/rules |
| `28-audit-trail` | Audit Trail | v1.3 | apps/api packages/shared |
| `29-phase2-testing-real-connectors` | Phase 2 Testing and Real Connector Readiness | v1.6 | docs/08_phase_2_testing tests |
| `30-phase3-pilot-production-hardening` | Phase 3 Pilot and Production Hardening | v2.0 | infra/terraform tests |
| `31-devops-local-aws-alignment` | DevOps Local and AWS Alignment | v1.1 | infra/terraform |
| `32-platform-security-hardening` | Platform Security and Hardening | v1.3 | apps/api packages/shared |
| `33-observability-tool-health` | Observability and Tool Health | v1.3 | apps/api apps/web |

## Execution note

Use multiple domain specs rather than one mega-spec. Every spec has `requirements.md`, `design.md` and `tasks.md`.
