# Commander SDR Final Baseline Document Pack — Release Notes v2.6.1

**Release type:** Handover readiness / control update  
**Baseline relationship:** Additive to v2.6.0  
**Product scope impact:** None

## 1. Purpose

v2.6.1 is a light control update to make the baseline easier for humans and AI agents to consume during handover into the build pipeline.

This release does **not** modify the Commander SDR product proposition, master technical specification, child specifications, UI doctrine, connector model, case workflow, or security boundaries.

## 2. What changed

Added:

```text
MEMORY.md
RELEASE_NOTES_v2_6_1.md
```

Updated:

```text
AGENTS.md
CURRENT_BASELINE_MANIFEST_v2_6.md
```

## 3. Why this was added

The project is moving into dev-support handover. The baseline pack needs a concise memory layer so agents and developers understand the current state without repeatedly loading the entire document estate.

## 4. Build doctrine retained

The intended delivery path remains:

```text
Source Docs → Build Packs → Code
```

The baseline pack remains the source truth. The companion next-stage pack owns the build pipeline and handover process.

## 5. Tool-stack clarification

This release clarifies that:

- DeepSeek is removed from the required build stack.
- Ollama is not part of the required build stack.
- Zapier is not part of the required build stack.
- Microsoft Lists is not the required source of build-control truth.
- n8n remains valid as a workflow orchestrator in the next-stage build pipeline.
- GitHub, Git, VS Code, Codex/Copilot and Markdown build packs remain central to implementation.

## 6. No product baseline changes

The following are unchanged:

- Master Proposition.
- Master Technical Specification.
- Authority and Precedence.
- Specification Register.
- Child technical specs.
- UI/UX doctrine.
- Case management, email lifecycle and vulnerability-management specifications.
- Connector schedules and security boundary doctrines.
